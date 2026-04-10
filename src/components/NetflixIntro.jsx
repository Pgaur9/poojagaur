import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Module-level singleton — survives component unmount so the audio
// keeps playing even after we navigate to /profiles.
let netflixAudio = null
let audioUnlocked = false

function getAudio() {
  if (!netflixAudio) {
    netflixAudio = new Audio('/netflix-sound.mp3')
    netflixAudio.volume = 0.85
    netflixAudio.preload = 'auto'
    // Force the browser to start downloading immediately
    netflixAudio.load()
  }
  return netflixAudio
}

function playFromStart() {
  const a = getAudio()
  try {
    a.pause()
    a.currentTime = 0
  } catch {}
  return a.play()
}

// Try to "unlock" the audio system by attempting muted autoplay.
// Browsers allow muted autoplay; once it's running, we unmute.
function attemptUnlockAndPlay() {
  if (audioUnlocked) {
    return playFromStart()
  }
  const a = getAudio()
  a.muted = true
  return a.play()
    .then(() => {
      // Muted play succeeded — quickly unmute and restart
      a.pause()
      a.muted = false
      a.currentTime = 0
      audioUnlocked = true
      return a.play()
    })
    .catch(() => {
      // Muted autoplay also blocked — wait for user gesture
      a.muted = false
      throw new Error('autoplay-blocked')
    })
}

// Install one-time gesture listeners that will play on first interaction.
function armGestureFallback() {
  const handler = () => {
    if (audioUnlocked) return
    audioUnlocked = true
    playFromStart().catch(() => {})
    cleanup()
  }
  const cleanup = () => {
    window.removeEventListener('pointerdown', handler, true)
    window.removeEventListener('keydown', handler, true)
    window.removeEventListener('touchstart', handler, true)
  }
  window.addEventListener('pointerdown', handler, true)
  window.addEventListener('keydown', handler, true)
  window.addEventListener('touchstart', handler, true)
  return cleanup
}

export default function NetflixIntro() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('initial')

  useEffect(() => {
    // Pre-create and warm up audio
    getAudio()

    // Animation timeline
    const t1 = setTimeout(() => setPhase('animating'), 200)
    const t2 = setTimeout(() => setPhase('done'), 3600)
    const t3 = setTimeout(() => navigate('/profiles'), 4500)

    // Try to play right at animation start
    const t4 = setTimeout(() => {
      attemptUnlockAndPlay().catch(() => {
        // Silent — gesture fallback will catch it
      })
    }, 250)

    // Arm fallback for first user gesture
    const removeListeners = armGestureFallback()

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      removeListeners()
      // IMPORTANT: do not pause/destroy the module-level audio.
      // It needs to keep playing after the component unmounts.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = () => {
    // User clicked — guaranteed user gesture, audio will play
    playFromStart().catch(() => {})
    audioUnlocked = true
    // Slight delay so the sound has time to start before navigation
    setTimeout(() => navigate('/profiles'), 100)
  }

  return (
    <div className={`intro-screen ${phase}`} onClick={handleClick}>
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
      <div className="intro-skip">Click anywhere to skip</div>
    </div>
  )
}
