import { useState } from 'react'
import { motion } from 'framer-motion'

const STACK = [
  { name: 'React',       icon: 'react',               level: 'Avanzado', color: '#61dafb' },
  { name: 'TypeScript',  icon: 'typescript',           level: 'Avanzado', color: '#3178c6' },
  { name: 'Node.js',     icon: 'nodejs',               level: 'Avanzado', color: '#68a063' },
  { name: 'PostgreSQL',  icon: 'postgresql',           level: 'Avanzado', color: '#336791' },
  { name: 'Next.js',     icon: 'nextjs',               level: 'Avanzado', color: '#888888' },
  { name: 'Docker',      icon: 'docker',               level: 'Medio',    color: '#2496ed' },
  { name: 'AWS',         icon: 'amazonwebservices',    level: 'Medio',    color: '#ff9900' },
  { name: 'Figma',       icon: 'figma',                level: 'Avanzado', color: '#f24e1e' },
  { name: 'Tailwind',    icon: 'tailwindcss',          level: 'Avanzado', color: '#38bdf8' },
  { name: 'Python',      icon: 'python',               level: 'Medio',    color: '#3776ab' },
  { name: 'Git',         icon: 'git',                  level: 'Avanzado', color: '#f05032' },
  { name: 'Redis',       icon: 'redis',                level: 'Básico',   color: '#dc382d' },
]

const STRENGTHS = [
  {
    title: 'Mentalidad de Producto',
    desc: 'No solo escribo código; entiendo los objetivos de negocio y la experiencia del usuario para construir soluciones integrales.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
      </svg>
    ),
  },
  {
    title: 'Arquitectura Limpia',
    desc: 'Comprometido con el código mantenible, patrones de diseño sólidos y una documentación impecable.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="5" rx="1.5"/><rect x="2" y="10" width="20" height="5" rx="1.5"/><rect x="2" y="17" width="20" height="5" rx="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Liderazgo Colaborativo',
    desc: 'Experiencia guiando equipos ágiles, fomentando un ambiente de aprendizaje continuo y mentoría.',
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
  if (failed) return <span className="ab-tech-dot" />
  return (
    <img src={urls[idx]} alt="" className="ab-tech-icon"
      onError={() => idx + 1 < urls.length ? setIdx(idx + 1) : setFailed(true)}
    />
  )
}

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }
const item = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }
const vp = { once: false, amount: 0.12 }
const ease = [0.22, 1, 0.36, 1]

export default function TechStack() {
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

      <motion.div
        className="ab-tech-grid"
        variants={container} initial="hidden" whileInView="visible"
        viewport={vp}
      >
        {STACK.map(({ name, icon, level, color }) => (
          <motion.div
            key={name} className="ab-tech-item"
            variants={item}
            style={{ '--ab-color': color }}
          >
            <TechIcon icon={icon} />
            <span className="ab-tech-name">{name}</span>
            <span className="ab-tech-level">{level}</span>
          </motion.div>
        ))}
      </motion.div>

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
