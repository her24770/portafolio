import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendChat } from '../services/api'

const WELCOME = {
  id: 0,
  role: 'ai',
  text: '¡Hola! Soy Sky, el asistente virtual de Josue. ¿En qué puedo ayudarte?',
}

const ease = [0.22, 1, 0.36, 1]

function ChatIcon() {
  return (
    <motion.svg key="chat" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      initial={{ opacity: 0, rotate: -20, scale: 0.7 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      exit={{ opacity: 0, rotate: 20, scale: 0.7 }}
      transition={{ duration: 0.22, ease }}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </motion.svg>
  )
}

function CloseIcon() {
  return (
    <motion.svg key="close" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
      initial={{ opacity: 0, rotate: 20, scale: 0.7 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      exit={{ opacity: 0, rotate: -20, scale: 0.7 }}
      transition={{ duration: 0.22, ease }}
    >
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </motion.svg>
  )
}

export default function ChatWidget() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    const userMsg = { id: Date.now(), role: 'user', text }
    setMessages(m => [...m, userMsg])
    setTyping(true)
    try {
      const history = messages.filter(m => m.id !== 0)
      const data = await sendChat(text, history)
      setMessages(m => [...m, { id: Date.now() + 1, role: 'ai', text: data.response }])
    } catch {
      setMessages(m => [...m, {
        id: Date.now() + 1,
        role: 'ai',
        text: 'Hubo un error al conectar con el servidor. Intenta de nuevo.',
      }])
    } finally {
      setTyping(false)
    }
  }

  return (
    <>
      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <span className="chat-header-dot" />
                <div>
                  <p className="chat-header-title">Sky</p>
                  <p className="chat-header-sub">Josue Hernández · Portfolio</p>
                </div>
              </div>
              <button className="chat-close-btn" onClick={() => setOpen(false)} aria-label="Cerrar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`chat-bubble ${msg.role}`}>
                  {msg.text}
                </div>
              ))}
              {typing && (
                <div className="chat-bubble ai chat-typing">
                  <span /><span /><span />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="chat-input-row">
              <input
                className="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Escribe un mensaje…"
                disabled={typing}
              />
              <button className="chat-send-btn" onClick={send} disabled={typing || !input.trim()} aria-label="Enviar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <motion.button
        className="chat-fab"
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
      >
        <AnimatePresence mode="wait">
          {open ? <CloseIcon /> : <ChatIcon />}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
