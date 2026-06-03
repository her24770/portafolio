import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon'

const CV_URL      = '/assets/CV%20Josue%20Hern%C3%A1ndez.pdf'
const CV_FILENAME = 'CV Josue Hernández.pdf'
const ease        = [0.22, 1, 0.36, 1]

export default function CVModal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="cvmodal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className="cvmodal-panel"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.32, ease }}
          >
            <div className="cvmodal-header">
              <span className="cvmodal-title">Curriculum Vitae</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <a
                  className="cvmodal-download-btn"
                  href={CV_URL}
                  download={CV_FILENAME}
                >
                  <Icon name="doc" width={14} height={14} /> Descargar
                </a>
                <button className="cvmodal-close" onClick={onClose} aria-label="Cerrar">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="cvmodal-body">
              <iframe
                src={CV_URL}
                title="CV Josue Hernández"
                className="cvmodal-iframe"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
