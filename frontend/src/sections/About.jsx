import Icon from '../components/Icon'

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: 'clamp(40px, 8vh, 96px) clamp(30px, 5vw, 90px)', maxWidth: 1080 }}
    >
      <div className="reveal" style={{ marginBottom: 'clamp(34px, 6vh, 64px)' }}>
        <p className="eyebrow"><span className="pip" /> 01 — Quién soy</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 60px)', letterSpacing: '-0.025em', lineHeight: 1, margin: '12px 0 0', color: 'var(--ink)' }}>
          Sobre mí
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 30 }}>
        <p className="reveal" style={{
          fontFamily: 'var(--font-display)', fontWeight: 400,
          fontSize: 'clamp(22px, 2.6vw, 32px)', lineHeight: 1.35,
          letterSpacing: '-0.01em', margin: 0, maxWidth: '22ch',
          color: 'var(--ink)',
        }}>
          Desarrollo Full Stack con foco en bases de datos y sistemas funcionales.
        </p>

        <div className="reveal" style={{ '--d': '0.08s' }}>
          <p style={{ fontSize: 16.5, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '52ch', margin: '0 0 16px' }}>
            Estudiante de Ingeniería en Ciencias de la Computación en la UVG,
            con experiencia en desarrollo Fullstack. Me especializo en bases
            de datos, diseño estructural y sistemas funcionales. Disponible
            para proyectos de medio tiempo o freelance.
          </p>
          <a className="btn ghost" href="/about">
            Saber más <Icon name="arrow" className="arr" width={16} height={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
