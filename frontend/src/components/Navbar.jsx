import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { useTheme } from '../contexts/ThemeContext'

function NavItem({ to, children }) {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link to={to} style={{
      fontSize: '0.9rem', fontWeight: 500,
      color: active ? 'var(--ink)' : 'var(--ink-2)',
      transition: 'color .25s ease',
      textDecoration: 'none',
    }}>
      {children}
    </Link>
  )
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  return (
    <>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/projects">Proyectos</NavItem>
      <NavItem to="/about">About</NavItem>
      <button onClick={toggleTheme} style={{
        marginLeft: 'auto', background: 'none', border: 'none',
        cursor: 'pointer', padding: '0.375rem', color: 'var(--ink-3)',
        display: 'flex', alignItems: 'center', borderRadius: '0.5rem',
        transition: 'color .25s ease',
      }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-3)'}
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} width={17} height={17} />
      </button>
    </>
  )
}
