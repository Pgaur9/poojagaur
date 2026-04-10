import NavBar from './NavBar'
import Footer from './Footer'
import { skillCategories } from '../data/portfolio'

export default function SkillsPage() {
  return (
    <div className="page-container">
      <NavBar />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Technical Arsenal</h1>
          <p className="page-subtitle">Technologies and tools powering my solutions</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.id}
              className="skills-category"
              style={{ animationDelay: `${ci * 0.12}s` }}
            >
              <div className="skills-category-header" style={{ background: cat.gradient }}>
                <h3>{cat.title}</h3>
                <span className="skills-count">{cat.skills.length} skills</span>
              </div>
              <div className="skills-list">
                {cat.skills.map((skill, si) => (
                  <div
                    key={skill.name}
                    className="skill-item"
                    style={{ animationDelay: `${ci * 0.12 + si * 0.05}s` }}
                  >
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.proficiency}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: `${skill.proficiency}%`,
                          background: cat.gradient,
                          animationDelay: `${ci * 0.12 + si * 0.05 + 0.3}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
