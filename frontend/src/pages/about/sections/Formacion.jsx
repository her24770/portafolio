import { motion } from 'framer-motion'

const EDUCATION = [
  {
    period: '2024 — Hoy',
    title: 'Lic. Ingeniería en CC y TI',
    institution: 'Universidad del Valle de Guatemala',
    desc: '5.° Semestre · Cum Laude · Promedio 94 · Becario Fundación Juan Bautista Gutiérrez.',
    current: true,
  },
  {
    period: '2021 — 2023',
    title: 'Perito en Computación',
    institution: 'Centro Educativo Kinal',
    desc: 'Estudiante distinguido · Promedio 95.',
  },
]

const vp = { once: false, amount: 0.12 }
const ease = [0.22, 1, 0.36, 1]

export default function Formacion() {
  return (
    <section id="formacion" className="ab-section" style={{ paddingBottom: 'clamp(60px, 12vh, 120px)' }}>
      <motion.p className="eyebrow"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.6, ease }}
      >
        <span className="pip" /> 04 — Estudios
      </motion.p>
      <motion.h2 className="ab-section-heading"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.7, ease, delay: 0.06 }}
      >
        Formación Académica
      </motion.h2>

      <div className="ab-timeline">
        {EDUCATION.map(({ period, title, institution, desc, current }, i) => (
          <motion.div key={title} className="ab-tl-item"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} transition={{ duration: 0.65, ease, delay: i * 0.1 }}
          >
            <span className={'ab-tl-period' + (current ? ' current' : '')}>{period}</span>
            <div className={'ab-tl-dot' + (current ? ' current' : '')} />
            <div>
              <p className="ab-tl-title">{title}</p>
              <p className="ab-tl-company">{institution}</p>
              <p className="ab-tl-desc">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
