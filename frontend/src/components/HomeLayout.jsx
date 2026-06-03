import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import Hero from './Hero'
import { useIsMobile } from '../hooks/useIsMobile'

export default function HomeLayout({ children, activeSection, navItems, startCollapsed = false }) {
  const isMobile = useIsMobile()

  const rawProgress = useMotionValue(startCollapsed ? 1 : 0)
  const progress    = useSpring(rawProgress, { stiffness: 55, damping: 18, mass: 1 })
  const contentRef  = useRef(null)
  const heroRef     = useRef(null)
  const [transitioned, setTransitioned] = useState(startCollapsed)

  useEffect(() => {
    if (isMobile || transitioned) return
    const onWheel = (e) => {
      if (e.deltaY > 0) { rawProgress.set(1); setTransitioned(true) }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [isMobile, transitioned, rawProgress])

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

  const contentScroll = useMotionValue(0)
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const onScroll = () => contentScroll.set(el.scrollTop)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [contentScroll])

  useEffect(() => {
    if (isMobile || !transitioned) return
    const heroEl    = heroRef.current
    const contentEl = contentRef.current
    if (!heroEl || !contentEl) return
    const onWheel = (e) => { contentEl.scrollTop += e.deltaY }
    heroEl.addEventListener('wheel', onWheel, { passive: true })
    return () => heroEl.removeEventListener('wheel', onWheel)
  }, [isMobile, transitioned])

  const heroWidth      = useTransform(progress, [0, 1], ['100%', '35%'])
  const contentWidth   = useTransform(progress, [0, 1], ['0%', '65%'])
  const contentOpacity = useTransform(progress, [0, 0.5], [0, 1])
  const contentX       = useTransform(progress, [0, 1], ['24px', '0px'])

  if (isMobile) {
    return (
      <div style={{ background: 'var(--bg)', overflowY: 'auto', minHeight: '100svh' }}
        className="scroll-container"
      >
        <Hero isMobile activeSection={activeSection} navItems={navItems} />
        {children}
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
        <Hero progress={progress} activeSection={activeSection} contentScroll={contentScroll} navItems={navItems} />
      </motion.div>
      <motion.div
        ref={contentRef}
        className="scroll-container relative z-10 h-full overflow-y-auto flex-shrink-0"
        style={{ width: contentWidth, opacity: contentOpacity, x: contentX, background: 'var(--bg)' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
