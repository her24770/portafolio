import { useState, useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import { useIsMobile } from '../hooks/useIsMobile'
import { fetchFeaturedProjects } from '../services/api'

export default function Projects() {
  const isMobile = useIsMobile()
  const [projects, setProjects] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    fetchFeaturedProjects().then(setProjects).catch(() => {})
  }, [])

  useEffect(() => {
    if (!projects.length || !sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add('in')
        else en.target.classList.remove('in')
      }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [projects])

  return (
    <section
      id="proyectos"
      ref={sectionRef}
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

      <div className="reveal" style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: 'color-mix(in oklab, var(--accent) 8%, var(--surface))',
        border: '1px solid color-mix(in oklab, var(--accent) 22%, var(--line))',
        borderRadius: 999, padding: '8px 16px 8px 12px',
        marginBottom: 'clamp(28px, 5vh, 52px)',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--accent)', flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-2)' }}>
          Todos los proyectos están desplegados en producción — puedes ver la demo en vivo desde{' '}
          <a href="/projects" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
            Ver todos
          </a>
          .
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 32 : 'clamp(64px, 11vh, 130px)' }}>
        {projects.map((p, i) => (
          isMobile ? (
            <article key={p.id} className="reveal" style={{ '--d': i * 0.05 + 's' }}>
              <div style={{
                width: '100%', height: 200, borderRadius: 16, overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--bg) 0%, color-mix(in oklab, var(--accent) 8%, var(--bg)) 100%)',
              }}>
                {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div className="pcard" style={{ marginTop: 12 }}>
                <span className="pnum">{p.n}</span>
                <h3 className="ptitle" style={{ fontSize: 20 }}>{p.title}</h3>
                <p className="pdesc">{p.desc}</p>
                <div className="tags">
                  {p.tags.map((t, j) => (
                    <span className="tag" key={t.name} style={{ '--tag-color': t.color ?? 'var(--accent)' }}>{t.name}</span>
                  ))}
                </div>
                <a className="plink" href={`/projects/${p.slug}`}>
                  Ver proyecto <Icon name="arrow" className="arr" width={15} height={15} />
                </a>
              </div>
            </article>
          ) : (
            <article key={p.id} className="reveal" style={{ position: 'relative', minHeight: 400, '--d': i * 0.05 + 's' }}>
              <div style={{
                display: 'block', width: '74%', height: 400,
                borderRadius: 20, overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--bg) 0%, color-mix(in oklab, var(--accent) 8%, var(--bg)) 100%)',
                boxShadow: '0 40px 80px -44px rgba(27,26,21,0.45)',
                marginLeft: i % 2 !== 0 ? 'auto' : undefined,
              }}>
                {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
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
                    <span className="tag" key={t.name} style={{ '--tag-color': t.color ?? 'var(--accent)' }}>{t.name}</span>
                  ))}
                </div>
                <a className="plink" href={`/projects/${p.slug}`}>
                  Ver proyecto <Icon name="arrow" className="arr" width={15} height={15} />
                </a>
              </div>
            </article>
          )
        ))}
      </div>
    </section>
  )
}
