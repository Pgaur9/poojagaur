import { useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { experience } from '../data/portfolio'
import {
  FaBriefcase, FaMapMarkerAlt, FaClock, FaChevronDown, FaChevronUp
} from 'react-icons/fa'

export default function ExperiencePage() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className="page-container">
      <NavBar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Career Journey</h1>
          <p className="page-subtitle">8+ years of building enterprise software solutions</p>
        </div>

        <div className="timeline">
          {experience.map((exp, i) => (
            <div
              key={exp.id}
              className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="timeline-dot" style={{ background: '#e50914' }}>
                <FaBriefcase />
              </div>
              <div className="timeline-card">
                <div className="timeline-card-header" style={{ background: exp.gradient }}>
                  <div className="timeline-card-header-content">
                    <h3>{exp.role}</h3>
                    <h4>{exp.company}</h4>
                  </div>
                  {exp.isNew && <span className="card-badge-new">CURRENT</span>}
                </div>
                <div className="timeline-card-body">
                  <div className="timeline-card-meta">
                    <span><FaClock /> {exp.period}</span>
                    <span><FaMapMarkerAlt /> {exp.location}</span>
                    <span className="card-match">{exp.matchPercent}% Match</span>
                  </div>

                  <button
                    className="timeline-expand-btn"
                    onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  >
                    {expandedId === exp.id ? 'Show Less' : 'Show More'}
                    {expandedId === exp.id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>

                  <div className={`timeline-details ${expandedId === exp.id ? 'expanded' : ''}`}>
                    <ul className="timeline-highlights">
                      {exp.highlights.map((h, j) => (
                        <li key={j}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="timeline-skills">
                    {exp.skills.slice(0, 6).map((s) => (
                      <span key={s} className="timeline-skill-tag">{s}</span>
                    ))}
                    {exp.skills.length > 6 && (
                      <span className="timeline-skill-tag more">+{exp.skills.length - 6}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="timeline-end">
            <div className="timeline-dot timeline-dot-end">
              <span>★</span>
            </div>
            <p>The journey continues...</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
