import Icon from '../components/Icon'

const scrollTop = () =>
  document.querySelector('.scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' })

export default function Footer() {
  return (
    <footer style={{ background: 'var(--section-dark)', color: 'rgba(255,255,255,0.45)' }}>

      {/* Main row */}
      <div style={{
        padding: 'clamp(1.5rem, 4vh, 2.5rem) clamp(30px, 5vw, 90px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 20, borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '-0.01em' }}>
            Josue Hernández
          </p>
          <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'rgba(255,255,255,0.38)' }}>
            Ciudad de Guatemala · Remoto / Híbrido
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
          {[
            { href: 'mailto:josuehernandez.fjbg@gmail.com', icon: 'mail'     },
            { href: 'https://linkedin.com/in/josue-hernandez-gonzalez', icon: 'linkedin', blank: true },
            { href: 'https://github.com',                                icon: 'github',   blank: true },
          ].map(({ href, icon, blank }) => (
            <a key={icon} href={href}
              {...(blank ? { target: '_blank', rel: 'noreferrer' } : {})}
              style={{ color: 'rgba(255,255,255,0.45)', transition: 'color .25s ease', display: 'flex' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
            >
              <Icon name={icon} width={18} height={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{
        padding: '0.875rem clamp(30px, 5vw, 90px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 12.5, gap: 16,
      }}>
        <span>© 2026 Josue Hernández González · josuehernandez.fjbg@gmail.com</span>
        <button
          onClick={scrollTop}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600,
            color: 'rgba(255,255,255,0.45)', transition: 'color .25s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
        >
          Volver arriba <Icon name="arrowup" width={14} height={14} />
        </button>
      </div>
    </footer>
  )
}
