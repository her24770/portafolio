import { motion, useTransform } from 'framer-motion'
import perfilImg from '../assets/images/perfil.png'

// Variantes para el texto — entrada inicial
const textVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

/**
 * Hero recibe `progress` (MotionValue 0→1) desde HomeLayout
 * para animar la foto y el texto durante el scroll.
 */
export default function Hero({ progress }) {
  // Foto: se desplaza a la derecha y se desvanece
  const photoX     = useTransform(progress, [0, 1], ['0%', '40%'])
  const photoOpacity = useTransform(progress, [0, 0.7], [1, 0])
  const photoScale = useTransform(progress, [0, 1], [1, 0.88])

  // Texto: se encoge sutilmente hacia la izquierda
  const textX      = useTransform(progress, [0, 1], ['0%', '-6%'])
  const textOpacity = useTransform(progress, [0, 0.6], [1, 0])

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden">

      {/* ── Texto — lado izquierdo del hero ── */}
      <motion.div
        className="relative z-10 flex flex-col justify-center px-10 py-12 flex-1"
        style={{ x: textX, opacity: textOpacity }}
      >
        {/* Saludo */}
        <motion.p
          className="text-base font-medium text-gray-400 mb-1 tracking-wide"
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Hello.
        </motion.p>

        {/* Nombre */}
        <motion.h1
          className="text-6xl font-black leading-none tracking-tight text-gray-900 mb-1"
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          I am
        </motion.h1>
        <motion.h1
          className="text-6xl font-black leading-none tracking-tight text-violet-600 mb-5"
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Josué.
        </motion.h1>

        {/* Headline */}
        <motion.p
          className="text-base font-medium text-gray-500 mb-8 max-w-xs leading-relaxed"
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Frontend Engineer &amp; Creative Developer.<br />
          Construyo interfaces que se sienten vivas.
        </motion.p>

        {/* Botones */}
        <motion.div
          className="flex gap-3 flex-wrap"
          custom={4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            className="px-6 py-3 bg-violet-600 text-white text-sm font-semibold rounded-xl cursor-pointer"
            whileHover={{ scale: 1.04, backgroundColor: '#7c3aed' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Ver proyectos →
          </motion.button>

          <motion.button
            className="px-6 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl cursor-pointer bg-white"
            whileHover={{ scale: 1.04, borderColor: '#7c3aed', color: '#7c3aed' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Contáctame
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── Foto — lado derecho del hero ── */}
      <motion.div
        className="relative z-10 h-full flex items-end justify-center flex-shrink-0"
        style={{
          x: photoX,
          opacity: photoOpacity,
          scale: photoScale,
          width: '45%',
        }}
      >
        {/* Blob decorativo detrás de la foto */}
        <motion.div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-gradient-to-br from-violet-200 to-cyan-100 blur-3xl opacity-50 pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.img
          src={perfilImg}
          alt="Josué Hernández"
          className="relative z-10 h-[85%] w-auto object-cover object-top"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxHeight: '90vh' }}
        />
      </motion.div>

      {/* Blob de fondo general */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-50 blur-3xl opacity-60 pointer-events-none" />
    </div>
  )
}
