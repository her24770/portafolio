import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchStack } from '../../../services/api'

const STRENGTHS = [
  {
    title: 'Diseño desde los datos',
    desc: 'Antes de escribir código, modela entidades, relaciones y límites del sistema. Eso define la arquitectura, no al revés. Algunos proyectos usan grafos, otros roles reales de PostgreSQL, otros Redis para estado efímero — según lo que el dominio pide.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
  },
  {
    title: 'Proyectos que se usan',
    desc: 'Varios proyectos están en producción con usuarios reales: estudiantes que gestionan sus horas de beca, administradores que mantienen datos universitarios, una comunidad que reporta emergencias. No solo demos de portafolio.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Criterio sobre herramientas',
    desc: 'No fuerza un stack conocido en cada problema. Usa Neo4j cuando el dominio es un grafo, lleva seguridad al nivel de base de datos cuando la lógica lo exige, separa memoria persistente de memoria activa cuando la IA lo necesita.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
  },
  {
    title: 'IA con memoria y contexto',
    desc: 'No usa la IA como decoración. En SKY Chat diseñó un system prompt dinámico con personalidad, roles y perfil relacional entre usuarios. En SalesAI implementó compresión de historial para mantener contexto sin disparar el costo de tokens.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 1 8 8c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 8-8z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Equipo y trabajo autónomo',
    desc: 'SWAP fue un proyecto de equipo de seis personas con metodología Scrum en Ingeniería de Software. El resto de proyectos los construyó solo, desde el modelo de datos hasta el despliegue. Funciona bien en ambos modos.',
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
