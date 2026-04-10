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
        <svg
          viewBox="0 0 600 240"
          preserveAspectRatio="xMidYMid meet"
          className="intro-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="netflixRed" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e50914" />
              <stop offset="50%" stopColor="#b20710" />
              <stop offset="100%" stopColor="#831010" />
            </linearGradient>
            <filter id="netflixShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>
          <text
            x="300"
            y="195"
            textAnchor="middle"
            fontFamily="'Bebas Neue', 'Oswald', 'Arial Narrow', sans-serif"
            fontSize="260"
            fontWeight="900"
            fill="url(#netflixRed)"
            filter="url(#netflixShadow)"
            letterSpacing="-12"
          >
            PG
          </text>
        </svg>
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
