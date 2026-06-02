import Icon from '../components/Icon'
import { useIsMobile } from '../hooks/useIsMobile'

const PROJECTS = [
  {
    n: '01', title: 'Spotify Connected App',
    desc: 'Dashboard de visualización musical de alto rendimiento sobre el Web Playback SDK.',
    tags: ['React', 'Web Audio'],
  },
  {
    n: '02', title: 'Digital Dashboard v2',
    desc: 'Plataforma de analítica empresarial con sincronización de datos en tiempo real.',
    tags: ['Next.js', 'D3.js'],
  },
  {
    n: '03', title: 'Aurora Commerce',
    desc: 'Tienda headless con checkout en un solo paso y catálogo dinámico.',
    tags: ['TypeScript', 'Stripe'],
  },
]

export default function Projects() {
  const isMobile = useIsMobile()

  return (
    <section
      id="proyectos"
      style={{ padding: 'clamp(40px, 8vh, 96px) clamp(20px, 5vw, 90px)', maxWidth: 1080 }}
    >
      <div className="reveal" style={{
        display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', gap: 16,
        marginBottom: 'clamp(34px, 6vh, 64px)',
      }}>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 32 : 'clamp(64px, 11vh, 130px)' }}>
        {PROJECTS.map((p, i) => (
          isMobile ? (
            <article key={p.n} className="reveal" style={{ '--d': i * 0.05 + 's' }}>
              <div style={{
                width: '100%', height: 200, borderRadius: 16, overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--bg) 0%, color-mix(in oklab, var(--accent) 8%, var(--bg)) 100%)',
              }} />
              <div className="pcard" style={{ marginTop: 12 }}>
                <span className="pnum">{p.n}</span>
                <h3 className="ptitle" style={{ fontSize: 20 }}>{p.title}</h3>
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
          ) : (
            <article key={p.n} className="reveal" style={{ position: 'relative', minHeight: 400, '--d': i * 0.05 + 's' }}>
              <div style={{
                display: 'block', width: '74%', height: 400,
                borderRadius: 20, overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--bg) 0%, color-mix(in oklab, var(--accent) 8%, var(--bg)) 100%)',
                boxShadow: '0 40px 80px -44px rgba(27,26,21,0.45)',
                marginLeft: i % 2 !== 0 ? 'auto' : undefined,
              }} />
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
          )
        ))}
      </div>
    </section>
  )
}
