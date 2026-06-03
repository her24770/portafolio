import smtplib
import ssl
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import get_settings

logger = logging.getLogger(__name__)


def send_contact_notification(name: str, email: str, message: str) -> None:
    settings = get_settings()
    if not settings.gmail_user or not settings.gmail_app_password:
        logger.warning("Email no configurado — mensaje guardado en BD pero no se envió notificación")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Nuevo mensaje de tu portafolio — {name}"
    recipient = settings.gmail_to or settings.gmail_user
    msg["From"] = settings.gmail_user
    msg["To"] = recipient
    msg["Reply-To"] = email

    text = (
        f"Nombre:  {name}\n"
        f"Email:   {email}\n\n"
        f"Mensaje:\n{message}"
    )
    html = f"""
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <div style="background:#7c3aed;padding:24px 28px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:20px">Nuevo mensaje de tu portafolio</h2>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;padding:24px 28px;border-radius:0 0 12px 12px">
        <p style="margin:0 0 8px"><strong>Nombre:</strong> {name}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> <a href="mailto:{email}" style="color:#7c3aed">{email}</a></p>
        <p style="margin:16px 0 8px"><strong>Mensaje:</strong></p>
        <blockquote style="margin:0;padding:12px 16px;border-left:3px solid #7c3aed;background:#f9f8ff;border-radius:0 6px 6px 0;color:#374151;line-height:1.6">
          {message.replace(chr(10), "<br>")}
        </blockquote>
        <p style="margin:24px 0 0;font-size:12px;color:#9ca3af">
          Puedes responder directamente a este email — irá a {email}
        </p>
      </div>
    </div>
    """

    msg.attach(MIMEText(text, "plain", "utf-8"))
    msg.attach(MIMEText(html, "html", "utf-8"))

    context = ssl.create_default_context()
    with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
        smtp.starttls(context=context)
        smtp.login(settings.gmail_user, settings.gmail_app_password)
        smtp.sendmail(settings.gmail_user, recipient, msg.as_string())

    logger.info(f"Notificación enviada a {recipient} por mensaje de {email}")
