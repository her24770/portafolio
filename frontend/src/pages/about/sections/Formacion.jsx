import { motion } from 'framer-motion'

const EDUCATION = [
  {
    period: '2015 — 2020',
    title: 'Ingeniería en Sistemas',
    institution: 'Universidad del Valle de Guatemala',
    desc: 'Especialización en desarrollo de software y arquitectura de sistemas distribuidos.',
    current: false,
  },
  {
    period: '2023',
    title: 'AWS Solutions Architect',
    institution: 'Amazon Web Services',
    desc: 'Certificación profesional en diseño de arquitecturas cloud escalables y seguras.',
  },
  {
    period: '2022',
    title: 'Meta Frontend Developer',
    institution: 'Coursera / Meta',
    desc: 'Programa intensivo de desarrollo frontend avanzado con React y diseño de interfaces.',
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
