import { useRef, useEffect, useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fetchProject, fetchProjects } from '../../../services/api'
import Navbar from '../../../components/Navbar'
import Icon from '../../../components/Icon'
import Reveal from './components/Reveal'
import TechGrid from './components/TechGrid'
import NextProject from './components/NextProject'
import VideoPlayer from './components/VideoPlayer'
import { DetailCtx } from './DetailContext'

function Block({ num, kicker, tag, children }) {
  const root = useContext(DetailCtx)
  return (
    <div className="det-block">
      <motion.div
        className="det-block-label"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ root, once: false, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="det-block-num">{num}</span>
        <span className="det-block-kicker">{kicker}</span>
        {tag && <span className="det-block-tag">{tag}</span>}
      </motion.div>
      <div className="det-block-body">
        <Reveal>{children}</Reveal>
      </div>
    </div>
  )
}

function Prose({ text }) {
  if (!text) return null
  return (
    <div className="det-prose">
      {text.split('\n').filter(Boolean).map((s, i) => <p key={i}>{s}</p>)}
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [p, setP] = useState(null)
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const overlayRef = useRef(null)
  const heroRef    = useRef(null)

  const { scrollYProgress } = useScroll({ container: overlayRef })
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef, container: overlayRef,
    offset: ['start start', 'end start'],
  })
  const mediaY = useTransform(heroScroll, [0, 1], ['0%', '16%'])

  const vp = { root: overlayRef, once: false, amount: 0.12 }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') navigate('/projects') }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  useEffect(() => {
    setLoading(true)
    Promise.all([fetchProject(slug), fetchProjects()])
      .then(([proj, all]) => { setP(proj); setAllProjects(all) })
      .catch(() => navigate('/projects'))
      .finally(() => setLoading(false))
  }, [slug, navigate])

  if (loading || !p) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        cargando proyecto…
      </div>
    )
  }

  const currentIndex = allProjects.findIndex(proj => proj.slug === slug)
  const nextIndex = (currentIndex + 1) % allProjects.length
  const next = allProjects[nextIndex] ?? allProjects[0]
  const total = allProjects.length

  const statusDone = p.status !== 'in_progress'
  let sn = 0
  const n = () => String(++sn).padStart(2, '0')

  return (
    <DetailCtx.Provider value={overlayRef}>
      <motion.div
        ref={overlayRef}
        className="det-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Progress rail */}
        <motion.div className="det-progress" style={{ scaleX: scrollYProgress }} />

        {/* ── Nav ── */}
        <header className="det-nav">
          <nav className="det-nav-left">
            <Navbar />
          </nav>
          <div className="det-nav-right">
            <span className="det-counter">
              <strong>{p.n}</strong> / {String(total).padStart(2, '0')}
            </span>
            <button className="det-back" onClick={() => navigate('/projects')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
              Volver
            </button>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="det-hero" ref={heroRef}>
          <div className="det-deco-blob" />

          <div className="det-hero-grid">
            <div className="det-hero-left">
              <motion.div
                initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={vp} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              >
                <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>
                  <span className="pip" /> {p.n} — proyecto · {p.category}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={vp} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
              >
                <h1 className="det-title">
                  {p.title.split('\n').map((line, i, arr) => (
                    <span key={i} className={i === arr.length - 1 && arr.length > 1 ? 'det-title-l2' : ''}>
                      {line}
                    </span>
                  ))}
                </h1>
              </motion.div>
              {p.problem_solved && (
                <motion.div
                  initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                >
                  <p className="det-lead">{p.problem_solved}</p>
                </motion.div>
              )}
            </div>

            <Reveal delay={0.28} className="det-hero-card fcard">
              <div className="det-stat-row">
                <span className="det-stat-label">Año</span>
                <span className="det-stat-val">{p.year}</span>
              </div>
              <div className="det-stat-row">
                <span className="det-stat-label">Rol</span>
                <span className="det-stat-val">{p.role}</span>
              </div>
              {p.team_size && (
                <div className="det-stat-row">
                  <span className="det-stat-label">Equipo</span>
                  <span className="det-stat-val">{p.team_size > 1 ? `${p.team_size} personas` : 'Solo dev'}</span>
                </div>
              )}
              <div className="det-stat-row">
                <span className="det-stat-label">Estado</span>
                <span className={'det-status ' + (statusDone ? 'done' : 'live')}>
                  <span className="det-pulse" />
                  {statusDone ? 'completado' : 'en progreso'}
                </span>
              </div>

              {p.repo_urls?.length > 0 && (
                <div className="det-stat-row">
                  <span className="det-stat-label">Código</span>
                  <span className="det-repo-links">
                    {p.repo_urls.map((r, i) => (
                      <a key={i} href={r} target="_blank" rel="noreferrer" className="det-repo-link">
                        <Icon name="github" width={14} height={14} />
                        {p.repo_urls.length > 1 ? (i === 0 ? 'Front' : 'Back') : 'GitHub'}
                      </a>
                    ))}
                  </span>
                </div>
              )}

              {p.demo_url && (
                <a href={p.demo_url} target="_blank" rel="noreferrer"
                  className="btn accent-btn"
                  style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center' }}>
                  Ver demo <Icon name="arrow" width={14} height={14} />
                </a>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.32} className="det-media-wrap">
            <motion.div className="det-media" style={{ y: mediaY }}>
              {p.video_url
                ? /youtube|vimeo/.test(p.video_url)
                  ? <iframe src={p.video_url} allow="autoplay; fullscreen" allowFullScreen title={p.title} />
                  : <VideoPlayer src={p.video_url} poster={p.image} />
                : <img src={p.image} alt={p.title.replace('\n', ' ')} />
              }
            </motion.div>
          </Reveal>

          <div className="det-scrollcue">
            <span>scroll</span>
            <span className="det-scrollcue-line" />
          </div>
        </section>

        {/* ── Body ── */}
        <div className="det-body">
          {p.content && (
            <Block num={n()} kicker="La idea" tag="// contexto">
              <Prose text={p.content} />
            </Block>
          )}

          {p.technologies?.length > 0 && (
            <Block num={n()} kicker="Stack" tag={`// ${p.technologies.length} tecnologías`}>
              <TechGrid technologies={p.technologies} />
            </Block>
          )}

          {p.architecture && (
            <Block num={n()} kicker="Arquitectura" tag="// decisiones técnicas">
              <div className="det-spec-card">
                <Prose text={p.architecture} />
              </div>
            </Block>
          )}

          {p.challenges && (
            <Block num={n()} kicker="El reto" tag="// qué fue difícil">
              <p className="det-statement">
                <span className="det-mark">«</span>{p.challenges}<span className="det-mark">»</span>
              </p>
            </Block>
          )}

          {p.images?.length > 0 && (
            <Block num={n()} kicker="Galería" tag="// screenshots">
              <div className="det-shots">
                {p.images.map((src, i) => (
                  <div className={'det-shot ' + (p.images.length === 1 ? 'span-12' : i === 0 ? 'span-7' : i === 1 ? 'span-5' : 'span-12')} key={i}>
                    <img src={src} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
            </Block>
          )}

          <Block num={n()} kicker="Ficha" tag="// resumen">
            <div className="det-facts">
              <div className="det-fact"><dt>Rol</dt><dd>{p.role}</dd></div>
              <div className="det-fact"><dt>Año</dt><dd>{p.year}</dd></div>
              <div className="det-fact"><dt>Categoría</dt><dd>{p.category}</dd></div>
              <div className="det-fact"><dt>Estado</dt><dd>{statusDone ? 'Completado' : 'En progreso'}</dd></div>
              {p.team_size && (
                <div className="det-fact"><dt>Equipo</dt><dd>{p.team_size > 1 ? `${p.team_size} personas` : 'Solo dev'}</dd></div>
              )}
              {p.repo_urls?.map((r, i) => (
                <div className="det-fact" key={i}>
                  <dt>{p.repo_urls.length > 1 ? (i === 0 ? 'Repo Frontend' : 'Repo Backend') : 'Repositorio'}</dt>
                  <dd>
                    <a href={r} target="_blank" rel="noreferrer" className="det-github-link">
                      <Icon name="github" width={20} height={20} />
                    </a>
                  </dd>
                </div>
              ))}
            </div>
            {p.demo_url && (
              <div className="det-links">
                <a className="btn" href={p.demo_url} target="_blank" rel="noreferrer">
                  Ver demo en vivo <Icon name="arrow" width={14} height={14} />
                </a>
              </div>
            )}
          </Block>
        </div>

        {next && (
          <NextProject
            project={next}
            onNavigate={() => navigate(`/projects/${next.slug}`)}
          />
        )}
      </motion.div>
    </DetailCtx.Provider>
  )
}
