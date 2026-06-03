import { useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '../../../components/Icon'
import CVModal from '../../../components/CVModal'

const DATA = [
  { label: 'Ubicación',      value: 'Ciudad de Guatemala, Z.3' },
  { label: 'Modalidad',      value: 'Remoto / Híbrido'         },
  { label: 'Disponibilidad', value: 'Medio tiempo · Freelance' },
  { label: 'Horario',        value: 'Matutino (negociable)'    },
  { label: 'Enfoque',        value: 'Desarrollo de Software'   },
  { label: 'Teléfono',       value: '3653-4283'                },
]

const vp = { once: false, amount: 0.12 }
const ease = [0.22, 1, 0.36, 1]

export default function Ficha() {
  const [showCV, setShowCV] = useState(false)
  return (
    <section id="ficha" className="ab-section" style={{ paddingBottom: 'clamp(60px, 12vh, 120px)' }}>
      <motion.p className="eyebrow"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.6, ease }}
      >
        <span className="pip" /> 05 — Datos
      </motion.p>
      <motion.h2 className="ab-section-heading"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.7, ease, delay: 0.06 }}
      >
        Ficha
      </motion.h2>

      <motion.div
        className="det-facts"
        style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)' }}
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.7, ease, delay: 0.08 }}
      >
        {DATA.map(({ label, value }) => (
          <div className="det-fact" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="det-links"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.65, ease, delay: 0.18 }}
      >
        <a className="btn" href="mailto:josuehernandez.fjbg@gmail.com">
          <Icon name="mail" width={15} height={15} /> josuehernandez.fjbg@gmail.com
        </a>
        <a className="btn ghost" href="https://linkedin.com/in/josue-hernandez-gonzalez" target="_blank" rel="noreferrer">
          <Icon name="linkedin" width={15} height={15} /> LinkedIn
        </a>
        <button className="btn ghost" onClick={() => setShowCV(true)}>
          <Icon name="doc" width={15} height={15} /> Ver CV
        </button>
      </motion.div>

      <CVModal open={showCV} onClose={() => setShowCV(false)} />
    </section>
  )
}
