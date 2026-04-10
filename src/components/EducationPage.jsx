import NavBar from './NavBar'
import Footer from './Footer'
import { education } from '../data/portfolio'
import { FaGraduationCap, FaStar } from 'react-icons/fa'

export default function EducationPage() {
  return (
    <div className="page-container">
      <NavBar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Education & Learning</h1>
          <p className="page-subtitle">Academic foundation and continuous learning</p>
        </div>

        <div className="education-grid">
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className="education-card"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="education-card-header" style={{ background: edu.gradient }}>
                <FaGraduationCap size={40} />
                <h3>{edu.degree}</h3>
                {edu.grade && (
                  <div className="education-grade">
                    <FaStar /> Grade: {edu.grade}
                  </div>
                )}
              </div>
              <div className="education-card-body">
                <h4 className="education-institution">{edu.institution}</h4>
                <p className="education-period">{edu.period}</p>
                {edu.field && <p className="education-field">{edu.field}</p>}
                <p className="education-desc">{edu.description}</p>

                {edu.courses && (
                  <div className="education-courses">
                    <h5>Key Courses</h5>
                    <div className="education-course-tags">
                      {edu.courses.map((c) => (
                        <span key={c} className="education-course-tag">{c}</span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.skills && (
                  <div className="education-skills">
                    <h5>Skills Gained</h5>
                    <div className="education-skill-tags">
                      {edu.skills.map((s) => (
                        <span key={s} className="education-skill-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="education-match">
                  <span className="card-match">{edu.matchPercent}% Match</span>
                  {edu.isNew && <span className="card-badge-new">NEW</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
