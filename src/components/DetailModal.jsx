import { useEffect } from 'react'
import { FaTimes, FaPlay, FaMapMarkerAlt, FaClock, FaBuilding } from 'react-icons/fa'

export default function DetailModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const isExperience = item.category === 'experience'
  const isEducation = item.category === 'education'
  const isCertification = item.category === 'certifications'

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Hero section */}
        <div className="modal-hero" style={{ background: item.gradient }}>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
          <div className="modal-hero-content">
            <h2 className="modal-title">{item.title || item.degree}</h2>
            <p className="modal-subtitle">
              {item.company || item.institution || item.issuer}
            </p>
            <div className="modal-meta">
              <span className="modal-match">{item.matchPercent}% Match</span>
              {item.period && <span className="modal-period">{item.period}</span>}
              {item.badge && <span className="modal-badge">{item.badge}</span>}
              {item.maturity && <span className="modal-maturity">{item.maturity}</span>}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-body-grid">
            {/* Left column */}
            <div className="modal-body-left">
              {item.description && (
                <p className="modal-description">{item.description}</p>
              )}

              {isExperience && item.highlights && (
                <div className="modal-section">
                  <h3>Key Contributions</h3>
                  <ul className="modal-highlights">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {isEducation && item.courses && (
                <div className="modal-section">
                  <h3>Coursework</h3>
                  <div className="modal-courses">
                    {item.courses.map((c) => (
                      <span key={c} className="modal-course-tag">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {isEducation && item.grade && (
                <div className="modal-section">
                  <h3>Grade: {item.grade}</h3>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="modal-body-right">
              {item.location && (
                <div className="modal-detail">
                  <FaMapMarkerAlt className="modal-detail-icon" />
                  <span>{item.location}</span>
                </div>
              )}
              {item.duration && (
                <div className="modal-detail">
                  <FaClock className="modal-detail-icon" />
                  <span>{item.duration}</span>
                </div>
              )}
              {item.type && (
                <div className="modal-detail">
                  <FaBuilding className="modal-detail-icon" />
                  <span>{item.type}</span>
                </div>
              )}

              {item.skills && (
                <div className="modal-skills-section">
                  <h4>Technologies</h4>
                  <div className="modal-skills-list">
                    {(item.skills || []).map((s) => {
                      const name = typeof s === 'string' ? s : s.name
                      return <span key={name} className="modal-skill-tag">{name}</span>
                    })}
                  </div>
                </div>
              )}

              {isCertification && (
                <div className="modal-detail">
                  <FaPlay className="modal-detail-icon" />
                  <span>Issued: {item.issued}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
