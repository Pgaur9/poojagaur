import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import ContentRow from './ContentRow'
import DetailModal from './DetailModal'
import Footer from './Footer'
import {
  profile, experience, education, certifications,
  skillCategories, profileRowConfig
} from '../data/portfolio'
import { FaPlay, FaInfoCircle, FaChevronDown } from 'react-icons/fa'

export default function Browse() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const profileName = params.get('profile') || 'Recruiter'
  const [selectedItem, setSelectedItem] = useState(null)
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  const fullTitle = `${profile.title} | ${profile.currentCompany}`

  // Profile-specific animated GIF backgrounds (same source as the example portfolio)
  const profileBackgrounds = {
    Recruiter: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZ5eWwwbjRpdWM1amxyd3VueHhteTVzajVjeGZtZGJ1dDc4MXMyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/16u7Ifl2T4zYfQ932F/giphy.gif",
    Developer: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGNidDl5emZpejY2eGFxa2I4NW0zZGNpbWRlbnBrZ3N2dWhhbzM1MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TFPdmm3rdzeZ0kP3zG/giphy.gif",
    Collaborator: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExc28yMjMyZmJ6eWtxbmNwdDV6cXk4dWZmcjFhZms2cXBjN2h5ZDJjeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QjZXUBUr89CkiWLPjL/giphy.gif",
    Explorer: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmxib24ycWo2cjlmazh0NGV5NTZ2Mzd2YWY0M2tvam9oYXBwYW1ocCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ERKMnDK6tkzJe8YVa3/giphy-downsized-large.gif",
  }
  const heroBgUrl = profileBackgrounds[profileName] || profileBackgrounds.Recruiter

  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      if (i <= fullTitle.length) {
        setTypedText(fullTitle.slice(0, i))
        i++
      } else {
        clearInterval(typing)
        setTimeout(() => setShowCursor(false), 1000)
      }
    }, 60)
    return () => clearInterval(typing)
  }, [fullTitle])

  const rowConfig = profileRowConfig[profileName] || profileRowConfig.Recruiter

  const getRowData = (type) => {
    switch (type) {
      case 'experience': return experience.map(e => ({ ...e, category: 'experience', title: e.role, subtitle: e.company, badge: e.duration }))
      case 'skills': return skillCategories.map(s => ({ ...s, category: 'skills', subtitle: `${s.skills.length} skills`, badge: `${s.skills.length}+` }))
      case 'education': return education.map(e => ({ ...e, category: 'education', title: e.degree, subtitle: e.institution, badge: e.period }))
      case 'certifications': return certifications.map(c => ({ ...c, category: 'certifications', subtitle: c.issuer, badge: c.issued }))
      default: return []
    }
  }

  const handleCardClick = (item) => {
    if (item.category === 'skills') {
      navigate('/skills')
    } else {
      setSelectedItem(item)
    }
  }

  return (
    <div className="browse-page">
      <NavBar />

      {/* Hero Banner */}
      <section className="hero-banner">
        <div
          className="hero-bg-image"
          style={{ backgroundImage: `url(${heroBgUrl})` }}
        />
        <div className="hero-bg-animation" />
        <div className="hero-gradient" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-icon">N</span>
            <span className="hero-badge-text">P O R T F O L I O</span>
          </div>
          <h1 className="hero-name">{profile.name}</h1>
          <div className="hero-title-typed">
            {typedText}
            {showCursor && <span className="typing-cursor">|</span>}
          </div>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-meta">
            <span className="hero-match">98% Match</span>
            <span className="hero-year">2024</span>
            <span className="hero-rating">HD</span>
            <span className="hero-seasons">{profile.yearsOfExperience} Years Experience</span>
          </div>
          <div className="hero-buttons">
            <button className="hero-btn hero-btn-primary" onClick={() => navigate('/experience')}>
              <FaPlay /> View Resume
            </button>
            <button className="hero-btn hero-btn-secondary" onClick={() => navigate('/contact')}>
              <FaInfoCircle /> Contact Me
            </button>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <FaChevronDown className="bounce" />
        </div>
      </section>

      {/* Top 10 Skills Banner */}
      <section className="top10-section">
        <h2 className="row-title">My Top 10 Skills</h2>
        <div className="top10-row">
          {['Java', 'Spring Boot', 'React.js', 'AWS', 'PostgreSQL', 'Docker', 'REST APIs', 'JavaScript', 'Git', 'Jenkins'].map((skill, i) => (
            <div key={skill} className="top10-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="top10-number">{i + 1}</span>
              <div className="top10-content">
                <span className="top10-skill">{skill}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Content Rows */}
      {rowConfig.map((row, i) => (
        <ContentRow
          key={row.type}
          title={row.title}
          items={getRowData(row.type)}
          onCardClick={handleCardClick}
          delay={i * 0.1}
        />
      ))}

      <Footer />

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}
