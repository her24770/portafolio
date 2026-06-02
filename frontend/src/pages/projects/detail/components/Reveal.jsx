import { useContext } from 'react'
import { motion } from 'framer-motion'
import { DetailCtx } from '../DetailContext'

export default function Reveal({ children, delay = 0, className = '', y = 36 }) {
  const root = useContext(DetailCtx)
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ root, once: false, amount: 0.12 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
