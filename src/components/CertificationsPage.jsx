import NavBar from './NavBar'
import Footer from './Footer'
import { certifications } from '../data/portfolio'
import {
  FaCertificate, FaAws, FaReact, FaJsSquare, FaCloud,
  FaShieldAlt, FaDatabase, FaServer
} from 'react-icons/fa'

const iconMap = {
  oracle: FaServer,
  react: FaReact,
  javascript: FaJsSquare,
  aws: FaAws,
  cloud: FaCloud,
  security: FaShieldAlt,
  database: FaDatabase,
}

export default function CertificationsPage() {
  return (
    <div className="page-container">
      <NavBar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Certifications & Achievements</h1>
          <p className="page-subtitle">Validated expertise and continuous professional development</p>
        </div>

        <div className="certs-grid">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.icon] || FaCertificate
            return (
              <div
                key={cert.id}
                className="cert-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="cert-card-icon" style={{ background: cert.gradient }}>
                  <Icon size={36} />
                </div>
                <div className="cert-card-body">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-date">Issued {cert.issued}</p>
                  <div className="cert-footer">
                    <span className="card-match">{cert.matchPercent}% Match</span>
                    {cert.isNew && <span className="card-badge-new">NEW</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}
