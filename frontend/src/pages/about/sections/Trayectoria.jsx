import { motion } from 'framer-motion'

const JOBS = [
  {
    period: '2024',
    title: 'Practicante Fullstack',
    company: 'Allín Software — 400 h',
    desc: 'Desarrollo de sistemas bancarios con Java, diseño de bases de datos relacionales, migración de sistemas legacy y trabajo colaborativo en equipo técnico.',
    current: false,
  },
]

const vp = { once: false, amount: 0.12 }
const ease = [0.22, 1, 0.36, 1]

export default function Trayectoria() {
  return (
    <section id="trayectoria" className="ab-section">
      <motion.p className="eyebrow"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.6, ease }}
      >
        <span className="pip" /> 03 — Experiencia
      </motion.p>
      <motion.h2 className="ab-section-heading"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.7, ease, delay: 0.06 }}
      >
        Trayectoria
      </motion.h2>

      <div className="ab-timeline">
        {JOBS.map(({ period, title, company, desc, current }, i) => (
          <motion.div key={title} className="ab-tl-item"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} transition={{ duration: 0.65, ease, delay: i * 0.1 }}
          >
            <span className={'ab-tl-period' + (current ? ' current' : '')}>{period}</span>
            <div className={'ab-tl-dot' + (current ? ' current' : '')} />
            <div>
              <p className="ab-tl-title">{title}</p>
              <p className="ab-tl-company">{company}</p>
              <p className="ab-tl-desc">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
