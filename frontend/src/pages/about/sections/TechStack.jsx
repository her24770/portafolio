import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchStack } from '../../../services/api'

const STRENGTHS = [
  {
    title: 'Lógica Estructural',
    desc: 'Pensamiento lógico y resolución de problemas como base de cada solución. Planificación cuidadosa antes de escribir una sola línea.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
      </svg>
    ),
  },
  {
    title: 'Aprendizaje Ágil',
    desc: 'Abierto a aprender nuevas tecnologías según las necesidades del proyecto o el equipo, adaptándome con rapidez al contexto.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    title: 'Trabajo en Equipo',
    desc: 'Experiencia en equipos técnicos con metodologías Scrum y trabajo colaborativo orientado a resultados concretos.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
]

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
        <span className="pip" /> 02 — Herramientas
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

      <motion.h2 className="ab-section-heading"
        style={{ marginTop: 'clamp(3rem, 6vh, 5rem)' }}
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={vp} transition={{ duration: 0.7, ease }}
      >
        Fortalezas
      </motion.h2>

      <div className="ab-strengths">
        {STRENGTHS.map(({ title, desc, icon }, i) => (
          <motion.div key={title} className="ab-strength"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={vp} transition={{ duration: 0.65, ease, delay: i * 0.1 }}
          >
            <div className="ab-strength-ico">{icon}</div>
            <div>
              <p className="ab-strength-title">{title}</p>
              <p className="ab-strength-desc">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
