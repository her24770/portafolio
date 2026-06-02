import Icon from '../components/Icon'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)', color: 'rgba(255,255,255,0.5)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{
        padding: '26px clamp(30px, 5vw, 90px)',
        maxWidth: 1080,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 20, fontSize: 13.5,
      }}>
        <span>© 2026 Josué Hernández — Hecho con cuidado.</span>
        <a
          href="#home"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontWeight: 600, transition: 'color .25s ease',
            color: 'rgba(255,255,255,0.5)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >
          Volver arriba <Icon name="arrowup" width={15} height={15} />
        </a>
      </div>
    </footer>
  )
}
