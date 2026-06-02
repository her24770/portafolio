import Icon from '../components/Icon'

const PROJECTS = [
  {
    n: '01', title: 'Spotify Connected App',
    desc: 'Dashboard de visualización musical de alto rendimiento sobre el Web Playback SDK.',
    tags: ['React', 'Web Audio'], ph: 'Captura del proyecto',
  },
  {
    n: '02', title: 'Digital Dashboard v2',
    desc: 'Plataforma de analítica empresarial con sincronización de datos en tiempo real.',
    tags: ['Next.js', 'D3.js'], ph: 'Captura del proyecto',
  },
  {
    n: '03', title: 'Aurora Commerce',
    desc: 'Tienda headless con checkout en un solo paso y catálogo dinámico.',
    tags: ['TypeScript', 'Stripe'], ph: 'Captura del proyecto',
  },
]

export default function Projects() {
  return (
    <section
      id="proyectos"
      style={{ padding: 'clamp(40px, 8vh, 96px) clamp(30px, 5vw, 90px)', maxWidth: 1080 }}
    >
      <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 'clamp(34px, 6vh, 64px)' }}>
        <div>
          <p className="eyebrow"><span className="pip" /> 03 — Trabajo seleccionado</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 60px)', letterSpacing: '-0.025em', lineHeight: 1, margin: '12px 0 0', color: 'var(--ink)' }}>
            Proyectos<br />destacados
          </h2>
        </div>
        <a className="btn ghost" href="/projects">
          Ver todos <Icon name="arrow" className="arr" width={16} height={16} />
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(64px, 11vh, 130px)' }}>
        {PROJECTS.map((p, i) => (
          <article
            key={p.n}
            className="reveal"
            style={{ position: 'relative', minHeight: 400, '--d': i * 0.05 + 's' }}
          >
            {/* Screenshot placeholder */}
            <div style={{
              display: 'block', width: '74%', height: 400,
              borderRadius: 20, overflow: 'hidden',
              background: 'linear-gradient(135deg, var(--bg) 0%, color-mix(in oklab, var(--accent) 8%, var(--bg)) 100%)',
              boxShadow: '0 40px 80px -44px rgba(27,26,21,0.45)',
              marginLeft: i % 2 !== 0 ? 'auto' : undefined,
            }} />

            {/* Info card */}
            <div className="pcard" style={{
              position: 'absolute', bottom: 36,
              width: 'min(370px, 56%)',
              right: i % 2 === 0 ? 0 : undefined,
              left: i % 2 !== 0 ? 0 : undefined,
            }}>
              <span className="pnum">{p.n}</span>
              <h3 className="ptitle">{p.title}</h3>
              <p className="pdesc">{p.desc}</p>
              <div className="tags">
                {p.tags.map((t, j) => (
                  <span className={'tag' + (j === 0 ? ' k' : '')} key={t}>{t}</span>
                ))}
              </div>
              <a className="plink" href="/projects">
                Ver caso <Icon name="arrow" className="arr" width={15} height={15} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
