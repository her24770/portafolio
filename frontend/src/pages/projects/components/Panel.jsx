import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/Navbar'
import Icon from '../../../components/Icon'

export default function Panel({ index, dir, total, projects, panelRef }) {
  const p = projects[index]
  const [anim, setAnim] = useState('')
  const first = useRef(true)

  useEffect(() => {
    if (first.current) { first.current = false; return }
    setAnim(dir >= 0 ? 'pg-swap-up' : 'pg-swap-down')
    const t = setTimeout(() => setAnim(''), 520)
    return () => clearTimeout(t)
  }, [index, dir])

  return (
    <aside className="pg-panel" ref={panelRef}>
      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center',
        gap: 'clamp(0.875rem, 1.8vw, 2rem)',
        marginBottom: '2rem',
      }}>
        <Navbar />
      </nav>

      {/* Project info */}
      <div className="pg-panel-body">
        <div className={`pg-swap ${anim}`} key={index}>
          <p className="eyebrow" style={{ marginBottom: '1.375rem' }}>
            <span className="pip" /> {p.n} — Proyecto
          </p>
          <h1 className="pg-title">
            {p.title.split('\n').map((line, i) => (
              <span key={i} className="pg-title-line">{line}</span>
            ))}
          </h1>
          <p className="pg-desc">{p.desc}</p>
          <div className="pg-meta">
            <span>{p.year}</span>
            <span className="pg-meta-sep" />
            <span>{p.role}</span>
          </div>
          <div className="tags" style={{ marginBottom: '2rem' }}>
            {p.tags.map((t, j) => (
              <span className={'tag' + (j === 0 ? ' k' : '')} key={t}>{t}</span>
            ))}
          </div>
          <a href={p.url} className="btn" style={{ alignSelf: 'flex-start' }}>
            Ver proyecto <Icon name="arrow" width={15} height={15} />
          </a>
        </div>
      </div>

      {/* Footer: counter + progress */}
      <div className="pg-panel-foot">
        <div className="pg-counter">
          <span className="pg-counter-cur">{p.n}</span>
          <span className="pg-counter-tot">/ {String(total).padStart(2, '0')}</span>
        </div>
        <div className="pg-progress">
          <div className="pg-progress-bar" style={{ height: `${((index + 1) / total) * 100}%` }} />
        </div>
        <div className="pg-scroll-hint">
          <span>scroll</span>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="1" y="1" width="10" height="18" rx="5" />
            <line className="pg-scroll-dot" x1="6" y1="5" x2="6" y2="9" />
          </svg>
        </div>
      </div>
    </aside>
  )
}
