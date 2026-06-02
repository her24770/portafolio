const STACK = [
  'React', 'TypeScript', 'Next.js', 'Node.js',
  'Tailwind', 'Figma', 'PostgreSQL', 'Framer Motion', 'Git',
]

export default function Stack() {
  return (
    <section
      id="stack"
      style={{ padding: 'clamp(40px, 8vh, 96px) clamp(30px, 5vw, 90px)', maxWidth: 1080 }}
    >
      <div className="reveal" style={{ marginBottom: 'clamp(34px, 6vh, 64px)' }}>
        <p className="eyebrow"><span className="pip" /> 02 — Herramientas</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 60px)', letterSpacing: '-0.025em', lineHeight: 1, margin: '12px 0 0', color: 'var(--ink)' }}>
          Stack
        </h2>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {STACK.map((s, i) => (
          <span className="stk reveal" key={s} style={{ '--d': i * 0.04 + 's' }}>
            <span className="glyph" /> {s}
          </span>
        ))}
      </div>
    </section>
  )
}
