import { useState } from 'react'
import Icon from '../components/Icon'
import { useIsMobile } from '../hooks/useIsMobile'

const SOCIALS = [
  { icon: 'linkedin', label: 'LinkedIn',             href: 'https://linkedin.com/in/josue-hernandez-gonzalez', blank: true },
  { icon: 'github',   label: 'GitHub',               href: 'https://github.com/her24770',                      blank: true },
  { icon: 'mail',     label: 'josuehernandez.fjbg@gmail.com', href: 'mailto:josuehernandez.fjbg@gmail.com' },
  { icon: 'doc',      label: 'Descargar CV',         href: '/assets/CV%20Josue%20Hern%C3%A1ndez.pdf', download: 'CV Josue Hernández.pdf' },
]

export default function Contact() {
  const isMobile = useIsMobile()
  const [form, setForm]     = useState({ nombre: '', email: '', mensaje: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: '' }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const er = {}
    if (!form.nombre.trim()) er.nombre = '¿Cómo te llamas?'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'Email no válido'
    if (form.mensaje.trim().length < 8) er.mensaje = 'Cuéntame un poco más'
    setErrors(er)
    if (Object.keys(er).length > 0) return

    setLoading(true)
    try {
      await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:8000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.nombre, email: form.email, message: form.mensaje }),
      })
    } catch (_) {}
    setLoading(false)
    setSent(true)
  }

  return (
    <section
      id="contacto"
      style={{
        background: 'var(--section-dark)', color: '#fff',
        padding: 'clamp(56px, 11vh, 120px) clamp(30px, 5vw, 90px)',
      }}
    >
      <div style={{ maxWidth: 1080 }}>

        {/* ── Dos columnas: info + formulario ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1fr',
          gap: 'clamp(32px, 6vw, 90px)',
          alignItems: 'start',
        }}>

        {/* ── Left: info ── */}
        <div className="reveal">

          {/* Badge de disponibilidad */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 999, marginBottom: '1.5rem',
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.05)',
            fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.82)',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 6px #4ade80',
              display: 'inline-block', flexShrink: 0,
            }} />
            Disponible · Trabajo fijo &amp; Freelance
          </div>

          <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '0.75rem' }}>
            <span className="pip" /> 04 — Hablemos
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(40px, 5.4vw, 78px)', lineHeight: 0.98,
            letterSpacing: '-0.025em', margin: '0 0 22px',
          }}>
            ¿Tienes algo<br />
            <em style={{ fontStyle: 'italic', color: 'color-mix(in oklab, var(--accent) 78%, white)' }}>en mente?</em>
          </h2>

          <p style={{ margin: '0 0 10px', color: 'rgba(255,255,255,0.72)', fontSize: 15.5, lineHeight: 1.6, maxWidth: '38ch', fontWeight: 500 }}>
            Busco trabajo de medio tiempo mientras termino mis estudios — posición fija o por proyecto.
          </p>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.6, maxWidth: '38ch' }}>
            También hago freelance. Si tienes una vacante, un proyecto o simplemente quieres conectar, escríbeme. Respondo en menos de 24 horas.
          </p>
        </div>

        {/* ── Right: form ── */}
        <div className="reveal" style={{ '--d': '0.08s' }}>
          {sent ? (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 12,
              padding: '32px 30px',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 16, background: 'rgba(255,255,255,0.04)',
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                display: 'grid', placeItems: 'center',
                background: 'var(--accent)', color: '#fff',
              }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m4 12 5 5L20 6" />
                </svg>
              </div>
              <h4 style={{ margin: '4px 0 0', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 24 }}>
                ¡Mensaje enviado!
              </h4>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>
                Gracias, {form.nombre.split(' ')[0] || 'crack'}. Te escribo muy pronto.
              </p>
            </div>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              <div className={'field' + (errors.nombre ? ' err' : '')}>
                <label htmlFor="f-nombre">Nombre</label>
                <input id="f-nombre" value={form.nombre} onChange={set('nombre')} placeholder="Tu nombre" />
                <span className="msg">{errors.nombre}</span>
              </div>
              <div className={'field' + (errors.email ? ' err' : '')}>
                <label htmlFor="f-email">Email</label>
                <input id="f-email" type="email" value={form.email} onChange={set('email')} placeholder="tu@correo.com" />
                <span className="msg">{errors.email}</span>
              </div>
              <div className={'field' + (errors.mensaje ? ' err' : '')}>
                <label htmlFor="f-msg">Mensaje</label>
                <textarea id="f-msg" rows="4" value={form.mensaje} onChange={set('mensaje')} placeholder="Cuéntame en qué estás pensando…" />
                <span className="msg">{errors.mensaje}</span>
              </div>
              <button className="btn accent-btn submit" type="submit" disabled={loading}>
                {loading ? 'Enviando…' : 'Enviar mensaje'} <Icon name="arrow" width={16} height={16} />
              </button>
            </form>
          )}
        </div>
        </div>{/* fin grid dos columnas */}

        {/* ── Links — ancho completo debajo de las dos columnas ── */}
        <div className="reveal" style={{ marginTop: 'clamp(2rem, 4vh, 3rem)', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              {...(s.blank ? { target: '_blank', rel: 'noreferrer' } : {})}
              {...(s.download ? { download: s.download } : {})}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                padding: '11px 16px',
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: 999,
                fontSize: 14, fontWeight: 600,
                color: 'rgba(255,255,255,0.82)',
                transition: 'transform .25s ease, background .25s ease, border-color .25s ease, color .25s ease',
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.background = ''
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.82)'
              }}
            >
              <Icon name={s.icon} width={16} height={16} /> {s.label}
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
