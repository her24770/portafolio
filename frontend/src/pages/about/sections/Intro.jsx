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
            Estudiante en Ingeniería en Computación.{' '}
            <em>Cinco años de práctica, once proyectos, varios en producción.</em>
          </motion.h2>

          <motion.p className="ab-bio"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} transition={{ duration: 0.75, ease, delay: 0.14 }}
          >
            Estudio Ingeniería en Computación y Tecnologías de la Información
            en la UVG. Graduado de un perito técnico en informática en KINAL, 5 años con
            base en programación,buscando que cada proyecto académico se convirtiera en algo funcional: sistemas
            con autenticación real, bases de datos con estructura pensada y código
            que se despliega y se mantiene en mi propio server con todos mis proyectos.
          </motion.p>

          <motion.p className="ab-bio"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} transition={{ duration: 0.75, ease, delay: 0.2 }}
            style={{ marginTop: '1rem' }}
          >
            Trabajo partiendo de la arquitectura y el modelo de datos antes de
            escribir código. Eso llevó a decisiones concretas: grafos para un
            sistema de recomendación musical, permisos a nivel de PostgreSQL en
            lugar de solo middleware, o una IA con memoria contextual y
            personalidad configurable en lugar de un wrapper genérico de API.
          </motion.p>
        </div>

        <motion.div className="ab-photo-wrap"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={vp} transition={{ duration: 0.75, ease, delay: 0.2 }}
        >
          <div className="ab-badge fcard">
            <span style={{ width: 7, height: 7, background: '#10b981', borderRadius: '50%', animation: 'pulse 2.2s infinite', flexShrink: 0, display: 'inline-block' }} />
            Disponible — Remoto / Híbrido
          </div>

          <img src={PHOTO} alt="Josue Hernández" className="ab-photo" />

          <div className="ab-location fcard">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Ciudad de Guatemala
          </div>
        </motion.div>
      </div>
    </section>
  )
}
