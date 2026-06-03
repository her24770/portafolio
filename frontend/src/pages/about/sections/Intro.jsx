import { motion } from 'framer-motion'

const PHOTO = '/assets/perfil.png'
const vp = { once: false, amount: 0.15 }
const ease = [0.22, 1, 0.36, 1]

export default function Intro() {
  return (
    <section id="intro" className="ab-section">
      <motion.p className="eyebrow"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.6, ease }}
      >
        <span className="pip" /> 01 — Presentación
      </motion.p>

      <div className="ab-intro-grid">
        <div className="ab-intro-left">
          <motion.h2 className="ab-tagline"
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} transition={{ duration: 0.75, ease, delay: 0.06 }}
          >
            Transformo ideas complejas en{' '}
            <em>interfaces que simplemente funcionan</em>.
          </motion.h2>

          <motion.p className="ab-bio"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} transition={{ duration: 0.75, ease, delay: 0.14 }}
          >
            Soy un ingeniero de software enfocado en crear arquitecturas escalables
            y experiencias digitales fluidas. Transformo problemas complejos en
            soluciones técnicas elegantes, manteniendo siempre la simplicidad como
            norte. Mi enfoque combina la estética visual con un rendimiento técnico
            impecable.
          </motion.p>
        </div>

        <motion.div className="ab-photo-wrap"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={vp} transition={{ duration: 0.75, ease, delay: 0.2 }}
        >
          <div className="ab-badge fcard">
            <span className="live" style={{ width: 7, height: 7, background: '#10b981', borderRadius: '50%', animation: 'pulse 2.2s infinite', flexShrink: 0 }} />
            Disponible para proyectos
          </div>

          <img src={PHOTO} alt="Josué Hernández" className="ab-photo" />

          <div className="ab-location fcard">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Guatemala
          </div>
        </motion.div>
      </div>
    </section>
  )
}
