import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchStack } from '../services/api'

const ease = [0.22, 1, 0.36, 1]
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.035 } } }
const item = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease } },
}

function TechIcon({ icon }) {
  const [idx, setIdx] = useState(0)
  const [failed, setFailed] = useState(false)
  const urls = [
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`,
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-plain.svg`,
  ]
  if (!icon || failed) return <span className="glyph" />
  return (
    <img
      src={urls[idx]}
      alt=""
      style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0 }}
      onError={() => idx + 1 < urls.length ? setIdx(idx + 1) : setFailed(true)}
    />
  )
}

export default function Stack() {
  const [stack, setStack] = useState([])

  useEffect(() => {
    fetchStack().then(setStack).catch(() => {})
  }, [])

  return (
    <section
      id="stack"
      style={{ padding: 'clamp(40px, 8vh, 96px) clamp(30px, 5vw, 90px)', maxWidth: 1080 }}
    >
      <motion.div
        className="reveal"
        style={{ marginBottom: 'clamp(34px, 6vh, 64px)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
      >
        <p className="eyebrow"><span className="pip" /> 02 — Herramientas</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 60px)', letterSpacing: '-0.025em', lineHeight: 1, margin: '12px 0 0', color: 'var(--ink)' }}>
          Stack
        </h2>
      </motion.div>

      <motion.div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {stack.map((t) => (
          <motion.span
            key={t.name}
            className="stk"
            variants={item}
            style={{ display: 'flex', alignItems: 'center', gap: 7, '--stk-color': t.color ?? 'var(--accent)' }}
          >
            <TechIcon icon={t.icon} />
            {t.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
