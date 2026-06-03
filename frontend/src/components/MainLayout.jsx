import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import Hero from './Hero'
import { useIsMobile } from '../hooks/useIsMobile'

const HOME_NAV = [
  { id: 'about',     label: 'Sobre mí'   },
  { id: 'stack',     label: 'Stack'      },
  { id: 'proyectos', label: 'Proyectos'  },
  { id: 'contacto',  label: 'Contacto'   },
]

const ABOUT_NAV = [
  { id: 'intro',        label: 'Sobre mí'    },
  { id: 'formacion',    label: 'Formación'   },
  { id: 'fortalezas',   label: 'Fortalezas'  },
  { id: 'trayectoria',  label: 'Trayectoria' },
  { id: 'stack-ab',     label: 'Stack'       },
  { id: 'ficha',        label: 'Contacto'    },
]

export default function MainLayout() {
  const { pathname } = useLocation()
  const isMobile     = useIsMobile()
  const isAbout      = pathname === '/about'

  // startCollapsed is fixed at mount — direct landing on /about starts collapsed
  const [startCollapsed] = useState(isAbout)
  const rawProgress = useMotionValue(startCollapsed ? 1 : 0)
  const progress    = useSpring(rawProgress, { stiffness: 55, damping: 18, mass: 1 })
  const contentRef  = useRef(null)
  const heroRef     = useRef(null)
  const [transitioned, setTransitioned] = useState(startCollapsed)
  const [activeSection, setActiveSection] = useState(isAbout ? 'intro' : 'about')

  const navItems = isAbout ? ABOUT_NAV : HOME_NAV

  // On route change: reset scroll, update active section, auto-collapse for /about
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
    setActiveSection(isAbout ? 'intro' : 'about')
    if (isAbout && !transitioned) {
      rawProgress.set(1)
      setTransitioned(true)
    }
  }, [pathname]) // eslint-disable-line

  // Scroll down on home → collapse hero
  useEffect(() => {
    if (isMobile || transitioned) return
    const onWheel = (e) => {
      if (e.deltaY > 0) { rawProgress.set(1); setTransitioned(true) }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [isMobile, transitioned, rawProgress])

  // Scroll up at top of content → expand hero
  useEffect(() => {
    if (isMobile || !transitioned) return
    const el = contentRef.current
    if (!el) return
    const onWheel = (e) => {
      if (e.deltaY < 0 && el.scrollTop === 0) { rawProgress.set(0); setTransitioned(false) }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [isMobile, transitioned, rawProgress])

  // Wheel on hero area → forward to content scroll
  useEffect(() => {
    if (isMobile || !transitioned) return
    const heroEl    = heroRef.current
    const contentEl = contentRef.current
    if (!heroEl || !contentEl) return
    const onWheel = (e) => { contentEl.scrollTop += e.deltaY }
    heroEl.addEventListener('wheel', onWheel, { passive: true })
    return () => heroEl.removeEventListener('wheel', onWheel)
  }, [isMobile, transitioned])

  const contentScroll = useMotionValue(0)
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const onScroll = () => contentScroll.set(el.scrollTop)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [contentScroll])

  const heroWidth      = useTransform(progress, [0, 1], ['100%', '35%'])
  const contentWidth   = useTransform(progress, [0, 1], ['0%',  '65%'])
  const contentOpacity = useTransform(progress, [0, 0.5], [0, 1])
  const contentX       = useTransform(progress, [0, 1], ['24px', '0px'])

  const ctx = { onSectionChange: setActiveSection }

  if (isMobile) {
    return (
      <div style={{ background: 'var(--bg)', overflowY: 'auto', minHeight: '100svh' }}
        className="scroll-container"
      >
        <Hero isMobile activeSection={activeSection} navItems={navItems} />
        <Outlet context={ctx} />
      </div>
    )
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden flex" style={{ background: 'var(--bg)' }}>
      <motion.div
        ref={heroRef}
        className="relative z-20 h-full flex-shrink-0 overflow-hidden"
        style={{ width: heroWidth, background: 'var(--bg)' }}
      >
        <Hero
          progress={progress}
          activeSection={activeSection}
          contentScroll={contentScroll}
          navItems={navItems}
        />
      </motion.div>
      <motion.div
        ref={contentRef}
        className="scroll-container relative z-10 h-full overflow-y-auto flex-shrink-0"
        style={{ width: contentWidth, opacity: contentOpacity, x: contentX, background: 'var(--bg)' }}
      >
        <Outlet context={ctx} />
      </motion.div>
    </div>
  )
}
