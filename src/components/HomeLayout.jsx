import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import Hero from './Hero'

/**
 * HomeLayout
 *
 * Flujo:
 * - Hero ocupa 100% de la pantalla al inicio.
 * - Al hacer scroll hacia abajo, el hero se desliza suavemente a la derecha
 *   ocupando ~35% del viewport, y el panel de contenido aparece a la izquierda.
 * - Solo el panel izquierdo (contenido) hace scroll; el hero queda fijo a la derecha.
 * - Al volver arriba, el hero regresa a pantalla completa.
 */
export default function HomeLayout({ children }) {
  // progress: 0 = hero full screen, 1 = hero en sidebar derecha
  const rawProgress = useMotionValue(0)
  const progress = useSpring(rawProgress, {
    stiffness: 60,
    damping: 18,
    mass: 1,
  })

  const contentRef = useRef(null)
  const [transitioned, setTransitioned] = useState(false)

  // Fase 1: scroll en window dispara la transición hero → sidebar
  useEffect(() => {
    if (transitioned) return

    const onWheel = (e) => {
      if (e.deltaY > 0) {
        rawProgress.set(1)
        setTransitioned(true)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [transitioned, rawProgress])

  // Fase 2: una vez en sidebar, el panel izquierdo scrollea normalmente
  useEffect(() => {
    if (!transitioned) return
    const el = contentRef.current
    if (!el) return

    const onWheel = (e) => {
      if (e.deltaY < 0 && el.scrollTop === 0) {
        rawProgress.set(0)
        setTransitioned(false)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [transitioned, rawProgress])

  // ── Valores derivados (todos los useTransform al nivel del componente) ──

  // Hero: width va de 100% → 35%
  const heroWidth = useTransform(progress, [0, 1], ['100%', '35%'])

  // Panel izquierdo: width va de 0% → 65%
  const contentWidth = useTransform(progress, [0, 1], ['0%', '65%'])

  // Contenido derecho: aparece conforme el hero se encoge
  const contentOpacity = useTransform(progress, [0, 0.5], [0, 1])
  const contentX = useTransform(progress, [0, 1], ['24px', '0px'])

  // Fondo del hero
  const heroBg = useTransform(
    progress,
    [0, 1],
    [
      'linear-gradient(135deg, #f8f6ff 0%, #eef2ff 50%, #f0fdfa 100%)',
      'linear-gradient(180deg, #f8f6ff 0%, #eef2ff 100%)',
    ]
  )

  // Línea separadora
  const dividerOpacity = useTransform(progress, [0.5, 1], [0, 1])

  // Indicador de scroll
  const scrollHintOpacity = useTransform(progress, [0, 0.3], [1, 0])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white flex">

      {/* ── Panel izquierdo: Hero (sidebar estático) ── */}
      <motion.div
        className="relative z-20 h-full flex-shrink-0 overflow-hidden"
        style={{ width: heroWidth }}
      >
        {/* Fondo del hero */}
        <motion.div
          className="absolute inset-0"
          style={{ background: heroBg }}
        />

        {/* Línea separadora — aparece cuando el hero está en sidebar */}
        <motion.div
          className="absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-violet-300 to-transparent"
          style={{ opacity: dividerOpacity }}
        />

        {/* Contenido del Hero — recibe progress para animar foto y texto */}
        <div className="relative z-10 h-full">
          <Hero progress={progress} />
        </div>
      </motion.div>

      {/* ── Panel derecho: contenido scrolleable ── */}
      <motion.div
        ref={contentRef}
        className="scroll-container relative z-10 h-full overflow-y-auto flex-shrink-0"
        style={{
          width: contentWidth,
          opacity: contentOpacity,
          x: contentX,
        }}
      >
        {children}
      </motion.div>

      {/* ── Indicador de scroll (solo visible cuando hero está expandido) ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: scrollHintOpacity }}
      >
        <span className="text-xs text-gray-400 tracking-widest uppercase">scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}
