import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Module-level singleton — survives unmount so audio keeps playing
// after we navigate away from /.
let netflixAudio = null

function getAudio() {
  if (!netflixAudio) {
    netflixAudio = new Audio('/netflix-sound.mp3')
    netflixAudio.volume = 0.85
    netflixAudio.preload = 'auto'
    netflixAudio.load()
  }
  return netflixAudio
}

export default function NetflixIntro() {
  const navigate = useNavigate()
  // Phases: idle (waiting for click) -> animating -> done
  const [phase, setPhase] = useState('idle')
  const startedRef = useRef(false)

  // Pre-load the audio file so it's instantly ready when the user clicks
  useEffect(() => {
    getAudio()
  }, [])

  const startIntro = () => {
    if (startedRef.current) return
    startedRef.current = true

    // Play sound (guaranteed to work — we're inside a user gesture)
    const audio = getAudio()
    try {
      audio.currentTime = 0
      audio.play().catch(() => {})
    } catch {}

    // Trigger ribbon animation
    setPhase('animating')

    // Begin fade-out near the end of the sound
    setTimeout(() => setPhase('done'), 3600)

    // Navigate after the sound has had time to play
    setTimeout(() => navigate('/profiles'), 4500)
  }

  // Keyboard accessibility — Enter or Space starts the intro
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        startIntro()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`intro-screen ${phase}`} onClick={startIntro}>
      <div className="intro-logo-container">
        <div className="intro-ribbon-wrapper">
          <svg viewBox="0 0 300 140" className="intro-svg">
            <defs>
              <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e50914" />
                <stop offset="50%" stopColor="#b20710" />
                <stop offset="100%" stopColor="#e50914" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* P letter */}
            <g className="intro-letter" filter="url(#glow)">
              <rect x="20" y="10" width="22" height="120" rx="2" fill="url(#redGrad)" className="ribbon r1" />
              <rect x="42" y="10" width="50" height="22" rx="2" fill="url(#redGrad)" className="ribbon r2" />
              <rect x="72" y="10" width="22" height="65" rx="2" fill="url(#redGrad)" className="ribbon r3" />
              <rect x="42" y="53" width="50" height="22" rx="2" fill="url(#redGrad)" className="ribbon r4" />
            </g>
            {/* G letter */}
            <g className="intro-letter" filter="url(#glow)">
              <rect x="130" y="10" width="75" height="22" rx="2" fill="url(#redGrad)" className="ribbon r5" />
              <rect x="130" y="10" width="22" height="120" rx="2" fill="url(#redGrad)" className="ribbon r6" />
              <rect x="130" y="108" width="75" height="22" rx="2" fill="url(#redGrad)" className="ribbon r7" />
              <rect x="183" y="65" width="22" height="65" rx="2" fill="url(#redGrad)" className="ribbon r8" />
              <rect x="163" y="65" width="42" height="22" rx="2" fill="url(#redGrad)" className="ribbon r9" />
            </g>
          </svg>
        </div>
        <div className="intro-subtitle">P O R T F O L I O</div>
      </div>

      {phase === 'idle' && (
        <div className="intro-enter-hint">
          <div className="intro-enter-pulse" />
          <span>CLICK ANYWHERE TO ENTER</span>
        </div>
      )}

      {phase !== 'idle' && <div className="intro-skip">Click anywhere to skip</div>}
    </div>
  )
}
