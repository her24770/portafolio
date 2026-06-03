import boto3
from botocore.config import Config
from fastapi import UploadFile, HTTPException
from app.config import get_settings


def _get_client():
    settings = get_settings()
    if not settings.r2_account_id:
        raise HTTPException(status_code=503, detail={
            "error": True,
            "code": "R2_NOT_CONFIGURED",
            "message": "El servicio de almacenamiento no está configurado",
        })
    return boto3.client(
        "s3",
        endpoint_url=f"https://{settings.r2_account_id}.r2.cloudflarestorage.com",
        aws_access_key_id=settings.r2_access_key_id,
        aws_secret_access_key=settings.r2_secret_access_key,
        config=Config(signature_version="s3v4"),
        region_name="auto",
    )


def _upload(key: str, file: UploadFile) -> str:
    settings = get_settings()
    client = _get_client()
    client.upload_fileobj(
        file.file,
        settings.r2_bucket_name,
        key,
        ExtraArgs={"ContentType": file.content_type},
    )
    return key


def upload_thumbnail(slug: str, file: UploadFile) -> str:
    ext = file.filename.rsplit(".", 1)[-1].lower()
    key = f"proyectos/{slug}/{slug}_principal.{ext}"
    return _upload(key, file)


def upload_image(slug: str, file: UploadFile, index: int) -> str:
    ext = file.filename.rsplit(".", 1)[-1].lower()
    key = f"proyectos/{slug}/{slug}_{index}.{ext}"
    return _upload(key, file)


def upload_video(slug: str, file: UploadFile) -> str:
    ext = file.filename.rsplit(".", 1)[-1].lower()
    key = f"proyectos/{slug}/{slug}_video.{ext}"
    return _upload(key, file)
