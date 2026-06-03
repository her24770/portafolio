import { useState } from 'react'
import { motion } from 'framer-motion'

function TechIcon({ icon }) {
  const [idx, setIdx] = useState(0)
  const [failed, setFailed] = useState(false)
  const urls = [
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`,
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-plain.svg`,
  ]
  if (failed) return <span className="det-tech-dot" />
  return (
    <img
      src={urls[idx]} alt=""
      onError={() => idx + 1 < urls.length ? setIdx(idx + 1) : setFailed(true)}
    />
  )
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
}
const item = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function TechGrid({ technologies }) {
  return (
    <motion.div
      className="det-tech-grid"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={container}
    >
      {technologies.map(t => (
        <motion.div className="det-tech" key={t.name} variants={item}
          style={{ '--tech-color': t.color ?? 'var(--accent)' }}
        >
          <span className="det-tech-ico"><TechIcon icon={t.icon} /></span>
          <span className="det-tech-meta">
            <span className="det-tech-name">{t.name}</span>
            <span className="det-tech-cat">{t.category}</span>
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
