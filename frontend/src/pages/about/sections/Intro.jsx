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
            Desde 2021 convirtiendo problemas reales{' '}
            <em>en software que la gente usa</em>.
          </motion.h2>

          <motion.p className="ab-bio"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} transition={{ duration: 0.75, ease, delay: 0.14 }}
          >
            Empecé con informática en el colegio, donde entendí que los
            computadores son herramientas, no magia. Desde 2021 estudio
            Ingeniería en Computación y Tecnologías de la Información en la UVG,
            y convertí ese interés en algo más concreto: sistemas con lógica
            real, bases de datos con estructura pensada y código que funciona
            más allá de la entrega académica.
          </motion.p>

          <motion.p className="ab-bio"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} transition={{ duration: 0.75, ease, delay: 0.2 }}
            style={{ marginTop: '1rem' }}
          >
            Me importa entender el problema antes de elegir la tecnología. Por
            eso algunos proyectos usan grafos, otros llevan los permisos hasta
            el nivel de PostgreSQL, y alguno tiene una IA que recuerda el
            contexto de una conversación en lugar de responder siempre igual.
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
