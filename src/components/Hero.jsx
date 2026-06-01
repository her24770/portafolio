import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
// motion sigue usado en stage, cards y scroll cue
import Icon from './Icon'

const PHOTO = '/assets/perfil.png'

function NavLink({ href, active, children }) {
  return (
    <a
      href={href}
      style={{
        position: 'relative',
        fontSize: 15,
        fontWeight: 500,
        color: active ? 'var(--ink)' : 'var(--ink-2)',
        padding: '4px 2px',
        transition: 'color .25s ease',
      }}
    >
      {children}
    </a>
  )
}

export default function Hero({ progress }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 70, damping: 20 })
  const smy = useSpring(my, { stiffness: 70, damping: 20 })

  const stageOpacity     = useTransform(progress, [0, 0.82], [1, 0])
  const stageX           = useTransform(progress, [0, 1], ['0%', '20%'])
  const scrollCueOpacity = useTransform(progress, [0, 0.28], [1, 0])

  const photoX = useTransform(smx, [-1, 1], [14, -14])
  const photoY = useTransform(smy, [-1, 1], [10, -10])
  const c1x    = useTransform(smx, [-1, 1], [-22, 22])
  const c1y    = useTransform(smy, [-1, 1], [-16, 16])
  const c2x    = useTransform(smx, [-1, 1], [-30, 30])
  const c2y    = useTransform(smy, [-1, 1], [14, -14])
  const c3x    = useTransform(smx, [-1, 1], [24, -24])
  const c3y    = useTransform(smy, [-1, 1], [-20, 20])

  const onMove  = (e) => {
    mx.set((e.clientX / window.innerWidth - 0.5) * 2)
    my.set((e.clientY / window.innerHeight - 0.5) * 2)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <div className="relative h-full w-full" onMouseMove={onMove} onMouseLeave={onLeave}>

      {/* ── Navbar ── */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(22px, 3vh, 40px) clamp(26px, 3.4vw, 60px)',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', gap: 'clamp(14px, 1.8vw, 30px)' }}>
          <NavLink href="#home" active>Home</NavLink>
          <NavLink href="#proyectos">Proyectos</NavLink>
          <NavLink href="#about">About</NavLink>
        </div>
      </nav>

      {/* ── Stage: foto + cards (se desvanece al scrollear) ── */}
      <motion.div style={{
        position: 'absolute', top: 0, right: 0,
        width: '56%', height: '100%',
        opacity: stageOpacity, x: stageX,
        pointerEvents: 'none', zIndex: 2,
      }}>
        <motion.img
          src={PHOTO}
          alt="Josué Hernández"
          style={{
            position: 'absolute',
            right: 'clamp(0px, 2vw, 60px)',
            bottom: 0,
            height: '86%',
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            filter: 'drop-shadow(0 40px 60px rgba(27,26,21,0.18))',
            x: photoX, y: photoY,
          }}
        />

        {/* Card 1 — stat */}
        <motion.div className="fcard" style={{
          position: 'absolute', top: '16%', right: '4%', width: 168,
          x: c1x, y: c1y, pointerEvents: 'auto',
        }}>
          <div className="fc-label">Proyectos</div>
          <div className="fc-big"><span className="accent">12</span> entregados</div>
        </motion.div>

        {/* Card 2 — role */}
        <motion.div className="fcard" style={{
          position: 'absolute', top: '44%', left: '-2%',
          x: c2x, y: c2y, pointerEvents: 'auto',
        }}>
          <div className="fc-role-row">
            <img className="fc-ava" src={PHOTO} alt="" />
            <div>
              <div className="fc-role-name">Josué Hernández</div>
              <div className="fc-role-sub">Frontend Developer</div>
            </div>
          </div>
          <div className="status">
            <span className="live" /> Disponible para proyectos
          </div>
        </motion.div>

        {/* Card 3 — skill bars */}
        <motion.div className="fcard" style={{
          position: 'absolute', bottom: '22%', right: '9%', width: 186,
          x: c3x, y: c3y, pointerEvents: 'auto',
        }}>
          <div className="fc-label">Stack favorito</div>
          <div className="bars">
            {[60, 92, 44, 78, 96, 52].map((h, i) => (
              <span key={i} style={{ height: h + '%', animationDelay: 0.15 + i * 0.08 + 's' }} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Identity block (siempre visible, queda en sidebar) ── */}
      <div style={{
        position: 'absolute',
        left: 'clamp(26px, 3.4vw, 60px)',
        bottom: 'clamp(96px, 16vh, 150px)',
        width: 'min(440px, calc(35vw - 48px))',
        zIndex: 5,
      }}>
        <p className="eyebrow"><span className="pip" /> Portafolio · 2026</p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(46px, 6.6vw, 92px)',
          lineHeight: 0.94,
          letterSpacing: '-0.025em',
          margin: 0,
          width: 'max-content',
          maxWidth: '150%',
          position: 'relative',
          zIndex: 7,
          color: 'var(--ink)',
        }}>
          Josué<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Hernández</em>
        </h1>

        <p style={{ marginTop: 20, fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>
          Frontend Developer &amp; Diseñador de interfaces
        </p>

        <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: '38ch' }}>
          Construyo experiencias web limpias, rápidas y con carácter —
          donde el movimiento tiene sentido y cada detalle suma.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 26 }}>
          <a className="chip cv" href="#" download><Icon name="doc" /> Descargar CV</a>
          <a className="chip" href="https://linkedin.com" target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a>
          <a className="chip" href="https://github.com" target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>
          <a className="chip" href="mailto:hola@josue.dev"><Icon name="mail" /> Email</a>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div className="scrollcue" style={{
        position: 'absolute',
        bottom: 'clamp(20px, 4vh, 40px)',
        left: 'clamp(26px, 3.4vw, 60px)',
        opacity: scrollCueOpacity,
        zIndex: 6,
      }}>
        <span className="mouse" /> Desliza para explorar
      </motion.div>
    </div>
  )
}
