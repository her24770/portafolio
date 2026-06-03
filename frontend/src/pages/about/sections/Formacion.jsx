import { motion } from 'framer-motion'

const EDUCATION = [
  {
    period: '2024 — Hoy',
    title: 'Lic. Ingeniería en CC y TI',
    institution: 'Universidad del Valle de Guatemala',
    desc: '5.° Semestre · Cum Laude · Promedio 94.',
    logo: '/assets/logo_uvg.png',
    current: true,
  },
  {
    period: '2024 — Hoy',
    title: 'Becario',
    institution: 'Fundación Juan Bautista Gutiérrez',
    desc: 'Beca completa para estudios universitarios en UVG. Reconocimiento al rendimiento académico y potencial profesional.',
    logo: '/assets/logo_fjbg.png',
    current: true,
  },
  {
    period: '2021 — 2023',
    title: 'Perito en Informática',
    institution: 'Centro Educativo Kinal',
    desc: 'Estudiante distinguido · Promedio 95.',
    logo: '/assets/logo_kinal.png',
    current: false,
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
        {EDUCATION.map(({ period, title, institution, desc, logo, current }, i) => (
          <motion.div key={title} className="ab-tl-item"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} transition={{ duration: 0.65, ease, delay: i * 0.1 }}
          >
            {/* Columna izquierda: año + logo */}
            <div className="ab-tl-period-col">
              <span className={'ab-tl-period' + (current ? ' current' : '')}>{period}</span>
              {logo && (
                <div className="ab-tl-logo">
                  <img src={logo} alt={institution} />
                </div>
              )}
            </div>

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
