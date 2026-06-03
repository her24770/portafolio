import { useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Icon from './Icon'
import Navbar from './Navbar'
import CVModal from './CVModal'
import { useTheme } from '../contexts/ThemeContext'

const PHOTO = '/assets/perfil.png'

const NAV_ITEMS = [
  { id: 'about',     label: 'Sobre mí'   },
  { id: 'stack',     label: 'Stack'      },
  { id: 'proyectos', label: 'Proyectos'  },
  { id: 'contacto',  label: 'Contacto'   },
]

function SideNav({ items, activeSection }) {
  const nav = items || NAV_ITEMS
  const handleClick = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {nav.map(({ id, label }) => {
        const isActive = activeSection === id
        return (
          <a key={id} href={`#${id}`} onClick={(e) => handleClick(e, id)} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            textDecoration: 'none',
          }}>
            <span style={{
              display: 'block', height: '1.5px',
              width: isActive ? '2rem' : '0.875rem',
              background: isActive ? 'var(--ink)' : 'var(--ink-3)',
              transition: 'width 0.35s ease, background 0.35s ease',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: isActive ? 'var(--ink)' : 'var(--ink-3)',
              transition: 'color 0.35s ease',
            }}>
              {label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}

function MobileHero({ onOpenCV }) {
  return (
    <div style={{
      minHeight: '100svh', display: 'flex', flexDirection: 'column',
      padding: 'clamp(1.25rem, 3vh, 2rem) clamp(1.25rem, 5vw, 1.75rem)',
      background: 'var(--bg)', position: 'relative', overflow: 'hidden',
    }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: 'auto' }}>
        <Navbar />
      </nav>

      {/* Foto — derecha, anclada abajo */}
      <img
        src={PHOTO} alt="Josué Hernández"
        style={{
          position: 'absolute', right: 0, bottom: 0,
          height: '72%', width: 'auto',
          objectFit: 'contain', objectPosition: 'bottom center',
          filter: 'drop-shadow(0 1.5rem 2.5rem rgba(27,26,21,0.15))',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '0.75rem', paddingTop: 'clamp(1.5rem, 5vh, 3rem)', paddingBottom: 'clamp(1rem, 3vh, 2rem)', position: 'relative', zIndex: 1, maxWidth: '58%' }}>
        <p className="eyebrow" style={{ margin: 0 }}>
          <span className="pip" /> Portafolio · 2026
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(2.5rem, 11vw, 4rem)',
          lineHeight: 1, letterSpacing: '-0.03em', margin: 0, color: 'var(--ink)',
        }}>
          Josué <span style={{ color: 'var(--accent)' }}>Hernández</span>
        </h1>
        <p style={{ fontSize: 'clamp(0.8rem, 3vw, 1rem)', fontWeight: 600, color: 'var(--ink-2)', margin: 0 }}>
          Fullstack Developer &amp; Estudiante de Ingeniería CC
        </p>
        <p style={{ fontSize: 'clamp(0.75rem, 2.8vw, 0.9rem)', lineHeight: 1.6, color: 'var(--ink-3)', margin: 0 }}>
          Desarrollo Full Stack con foco en bases de datos y sistemas funcionales.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
          <a className="chip" href="https://linkedin.com/in/josue-hernandez-gonzalez" target="_blank" rel="noreferrer">
            <Icon name="linkedin" /> LinkedIn
          </a>
          <a className="chip" href="https://github.com/her24770" target="_blank" rel="noreferrer">
            <Icon name="github" /> GitHub
          </a>
          <a className="chip" href="mailto:josuehernandez.fjbg@gmail.com">
            <Icon name="mail" /> Email
          </a>
          <button className="chip cv" onClick={onOpenCV}>
            <Icon name="doc" /> CV
          </button>
        </div>
      </div>

      <div className="scrollcue" style={{ paddingTop: '2rem' }}>
        <span className="mouse" /> Desliza para explorar
      </div>
    </div>
  )
}

export default function Hero({ progress, activeSection, contentScroll, isMobile, navItems }) {
  const { theme } = useTheme()
  const [showCV, setShowCV] = useState(false)
  if (isMobile) return (
    <>
      <MobileHero onOpenCV={() => setShowCV(true)} />
      <CVModal open={showCV} onClose={() => setShowCV(false)} />
    </>
  )
  const mx  = useMotionValue(0)
  const my  = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 70, damping: 20 })
  const smy = useSpring(my, { stiffness: 70, damping: 20 })

  // Stage
  const stageOpacity     = useTransform(progress, [0, 0.82], [1, 0])
  const stageX           = useTransform(progress, [0, 1], ['0%', '20%'])
  const scrollCueOpacity = useTransform(progress, [0, 0.28], [1, 0])

  // Parallax
  const photoX = useTransform(smx, [-1, 1], [14, -14])
  const photoY = useTransform(smy, [-1, 1], [10, -10])
  const c1x    = useTransform(smx, [-1, 1], [-22, 22])
  const c1y    = useTransform(smy, [-1, 1], [-16, 16])
  const c2x    = useTransform(smx, [-1, 1], [-30, 30])
  const c2y    = useTransform(smy, [-1, 1], [14, -14])
  const c3x    = useTransform(smx, [-1, 1], [24, -24])
  const c3y    = useTransform(smy, [-1, 1], [-20, 20])

  const eyebrowX = useTransform(progress, [0, 1], ['0vw',  '0vw'])
  const eyebrowY = useTransform(progress, [0, 1], ['2vh',  '0vh'])

  const nameX    = useTransform(progress, [0, 1], ['10vw', '0vw'])
  const nameY    = useTransform(progress, [0, 1], ['8vh',  '0vh'])

  const roleX    = useTransform(progress, [0, 1], ['2vw',  '0vw'])
  const roleY    = useTransform(progress, [0, 1], ['22vh', '0vh'])

  const descX    = useTransform(progress, [0, 1], ['2vw',  '0vw'])
  const descY    = useTransform(progress, [0, 1], ['22vh', '0vh'])

  const chipsX   = useTransform(progress, [0, 1], ['4vw',  '0vw'])
  const chipsY   = useTransform(progress, [0, 1], ['24vh', '0vh'])

  // Descripción se va, nav aparece
  const descTextOpacity = useTransform(progress, [0, 0.45], [1, 0])
  const sideNavOpacity  = useTransform(progress, [0.55, 1], [0, 1])

  const onMove  = (e) => {
    mx.set((e.clientX / window.innerWidth  - 0.5) * 2)
    my.set((e.clientY / window.innerHeight - 0.5) * 2)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <div className="relative h-full w-full" onMouseMove={onMove} onMouseLeave={onLeave}>

      {/* ── Navbar ── */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        display: 'flex', alignItems: 'center',
        gap: 'clamp(0.875rem, 1.8vw, 2rem)',
        padding: 'clamp(1.25rem, 3vh, 2.5rem) clamp(1.5rem, 3.4vw, 3.75rem)',
      }}>
        <Navbar />
      </nav>

      {/* ── Stage: foto + cards flotantes ── */}
      <motion.div style={{
        position: 'absolute', top: 0, right: 0,
        width: '56%', height: '100%',
        opacity: stageOpacity, x: stageX,
        pointerEvents: 'none', zIndex: 2,
      }}>
        <motion.img
          src={PHOTO} alt="Josué Hernández"
          style={{
            position: 'absolute', right: '12vw', bottom: 0,
            height: '86%', width: 'auto',
            objectFit: 'contain', objectPosition: 'bottom center',
            filter: 'drop-shadow(0 2.5rem 3.75rem rgba(27,26,21,0.18))',
            x: photoX, y: photoY,
          }}
        />

        <motion.div className="fcard" style={{
          position: 'absolute', top: '16%', right: '4%', width: '10.5rem',
          x: c1x, y: c1y, pointerEvents: 'auto',
        }}>
          <div className="fc-label">Promedio académico</div>
          <div className="fc-big"><span className="accent">94</span> / 100</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 4, fontWeight: 600 }}>Cum Laude · UVG</div>
        </motion.div>

        <motion.div className="fcard" style={{
          position: 'absolute', top: '44%', left: '-2%',
          x: c2x, y: c2y, pointerEvents: 'auto',
        }}>
          <div className="fc-role-row">
            <img className="fc-ava" src={PHOTO} alt="" />
            <div>
              <div className="fc-role-name">Josue Hernández</div>
              <div className="fc-role-sub">Fullstack Developer</div>
            </div>
          </div>
          <div className="status"><span className="live" /> Buscando trabajo · Freelance</div>
        </motion.div>

        <motion.div className="fcard" style={{
          position: 'absolute', bottom: '22%', right: '9%', width: '11.625rem',
          x: c3x, y: c3y, pointerEvents: 'auto',
        }}>
          <div className="fc-label">Ubicación</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginTop: 4, letterSpacing: '-0.01em' }}>Guatemala 🇬🇹</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 6, fontWeight: 600 }}>Remoto / Híbrido</div>
        </motion.div>
      </motion.div>

      {/* ── Identity block ── */}
      <motion.div style={{
        position: 'absolute',
        left: 'clamp(2rem, 4vw, 5rem)',
        top: 'clamp(5rem, 10vh, 8rem)',
        width: '62%',
        zIndex: 5,
      }}>

        {/* Eyebrow */}
        <motion.div style={{ x: eyebrowX, y: eyebrowY }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
            <span className="pip" /> Portafolio · 2026
          </p>
        </motion.div>

        {/* Nombre */}
        <motion.div style={{ x: nameX, y: nameY }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            margin: 0,
            color: 'var(--ink)',
          }}>
            Josue <span style={{ color: 'var(--accent)' }}>Hernández</span>
          </h1>
        </motion.div>

        {/* Rol */}
        <motion.div style={{ x: roleX, y: roleY }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.32, duration: 0.7 }}
        >
          <p style={{
            marginTop: '1rem',
            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
            fontWeight: 600,
            color: 'var(--ink-2)',
            letterSpacing: '0.01em',
          }}>
            Fullstack Developer &amp; Estudiante de Ingeniería CC
          </p>
        </motion.div>

        {/* Desc ↔ SideNav — mismo slot, altura fija para evitar gaps */}
        <motion.div
          style={{ x: descX, y: descY }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.44, duration: 0.7 }}
        >
          <div style={{ position: 'relative', height: '7rem', marginTop: '0.5rem' }}>
            <motion.p style={{
              position: 'absolute', top: 0, left: 0, margin: 0,
              opacity: descTextOpacity,
              fontSize: 'clamp(0.825rem, 1vw, 0.95rem)',
              lineHeight: 1.6, color: 'var(--ink-3)', maxWidth: '34ch',
              pointerEvents: 'none',
            }}>
              Busco trabajo fijo de medio tiempo y hago freelance.
              Desarrollo Full Stack · Remoto / Híbrido · Guatemala.
            </motion.p>
            <motion.div style={{ position: 'absolute', top: 0, left: 0, opacity: sideNavOpacity }}>
              <SideNav items={navItems} activeSection={activeSection} />
            </motion.div>
          </div>
        </motion.div>

        {/* Chips — todas juntas, wrap natural en sidebar */}
        <motion.div style={{ x: chipsX, y: chipsY }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.56, duration: 0.7 }}
        >
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            gap: '0.5rem', marginTop: '5rem',
          }}>
            <a className="chip" href="https://linkedin.com/in/josue-hernandez-gonzalez" target="_blank" rel="noreferrer">
              <Icon name="linkedin" /> LinkedIn
            </a>
            <a className="chip" href="https://github.com/her24770" target="_blank" rel="noreferrer">
              <Icon name="github" /> GitHub
            </a>
            <a className="chip" href="mailto:josuehernandez.fjbg@gmail.com">
              <Icon name="mail" /> Email
            </a>
            <button className="chip cv" onClick={() => setShowCV(true)}>
              <Icon name="doc" /> CV
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div className="scrollcue" style={{
        position: 'absolute',
        bottom: 'clamp(1.25rem, 4vh, 2.5rem)',
        left: 'clamp(1.5rem, 3.4vw, 3.75rem)',
        opacity: scrollCueOpacity,
        zIndex: 6,
      }}>
        <span className="mouse" /> Desliza para explorar
      </motion.div>

      <CVModal open={showCV} onClose={() => setShowCV(false)} />
    </div>
  )
}
