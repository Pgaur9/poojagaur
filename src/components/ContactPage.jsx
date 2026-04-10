import NavBar from './NavBar'
import Footer from './Footer'
import { profile } from '../data/portfolio'
import {
  FaLinkedin, FaMapMarkerAlt, FaBriefcase,
  FaCode, FaEnvelope
} from 'react-icons/fa'

export default function ContactPage() {
  return (
    <div className="page-container">
      <NavBar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Let's Connect</h1>
          <p className="page-subtitle">Open to opportunities and collaboration</p>
        </div>

        <div className="contact-container">
          <div className="contact-card">
            <div className="contact-card-hero">
              <div className="contact-avatar">
                <span>PG</span>
              </div>
              <h2>{profile.name}</h2>
              <p className="contact-role">{profile.title}</p>
              <p className="contact-company">
                <FaBriefcase /> {profile.currentCompany}
              </p>
            </div>

            <div className="contact-card-body">
              <p className="contact-summary">{profile.summary}</p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <FaMapMarkerAlt />
                  <span>{profile.location}</span>
                </div>
                <div className="contact-detail-item">
                  <FaCode />
                  <span>{profile.yearsOfExperience} Years of Experience</span>
                </div>
              </div>

              <div className="contact-actions">
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn contact-btn-linkedin"
                >
                  <FaLinkedin /> Connect on LinkedIn
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="contact-btn contact-btn-email"
                >
                  <FaEnvelope /> Send Email
                </a>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="contact-stats">
            <div className="contact-stat">
              <span className="contact-stat-number">8+</span>
              <span className="contact-stat-label">Years Experience</span>
            </div>
            <div className="contact-stat">
              <span className="contact-stat-number">4</span>
              <span className="contact-stat-label">Companies</span>
            </div>
            <div className="contact-stat">
              <span className="contact-stat-number">50+</span>
              <span className="contact-stat-label">Technologies</span>
            </div>
            <div className="contact-stat">
              <span className="contact-stat-number">9</span>
              <span className="contact-stat-label">Certifications</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
