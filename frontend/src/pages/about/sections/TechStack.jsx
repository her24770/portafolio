import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchStack } from '../../../services/api'

function TechIcon({ icon }) {
  const [idx, setIdx] = useState(0)
  const [failed, setFailed] = useState(false)
  const urls = [
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`,
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-plain.svg`,
  ]
  if (!icon || failed) return <span className="ab-tech-dot" />
  return (
    <img src={urls[idx]} alt="" className="ab-tech-icon"
      onError={() => idx + 1 < urls.length ? setIdx(idx + 1) : setFailed(true)}
    />
  )
}

const CATEGORY_LABEL = {
  backend:  'Backend',
  frontend: 'Frontend',
  database: 'Base de datos',
  language: 'Lenguaje',
  devops:   'DevOps',
  tool:     'Herramienta',
  ai:       'IA / ML',
}

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }
const item = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }
const vp = { once: false, amount: 0.12 }
const ease = [0.22, 1, 0.36, 1]

export default function TechStack() {
  const [stack, setStack] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStack()
      .then(setStack)
      .catch(() => setStack([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="stack-ab" className="ab-section">
      <motion.p className="eyebrow"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.6, ease }}
      >
        <span className="pip" /> 05 — Stack
      </motion.p>
      <motion.h2 className="ab-section-heading"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.7, ease, delay: 0.06 }}
      >
        Stack Tecnológico
      </motion.h2>

      {loading ? (
        <p style={{ color: 'var(--ink-3)', fontSize: 13, marginTop: '2rem', fontFamily: 'var(--font-mono, monospace)' }}>
          cargando stack…
        </p>
      ) : stack.length > 0 ? (
        <motion.div
          className="ab-tech-grid"
          variants={container} initial="hidden" whileInView="visible"
          viewport={vp}
        >
          {stack.map((t) => (
            <motion.div
              key={t.name} className="ab-tech-item"
              variants={item}
              style={{ '--ab-color': t.color ?? 'var(--accent)' }}
            >
              <TechIcon icon={t.icon} />
              <span className="ab-tech-name">{t.name}</span>
              <span className="ab-tech-cat">{CATEGORY_LABEL[t.category] ?? t.category}</span>
              <span className="ab-tech-level">{t.level}</span>
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </section>
  )
}
