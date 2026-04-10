import {
  FaCode, FaPalette, FaServer, FaDatabase, FaCloud, FaVial,
  FaTools, FaPlug, FaBriefcase, FaGraduationCap, FaUniversity,
  FaCertificate, FaJava, FaReact, FaJsSquare, FaAws, FaDocker,
  FaNodeJs, FaGitAlt, FaJenkins, FaLinux, FaHtml5, FaCss3Alt,
  FaAngular, FaCheckDouble, FaShieldAlt, FaCubes,
} from 'react-icons/fa'

// Map skill categories (by id) to react-icons
const categoryIconMap = {
  languages: FaCode,
  frontend: FaPalette,
  backend: FaServer,
  database: FaDatabase,
  cloud: FaCloud,
  testing: FaVial,
  tools: FaTools,
  apis: FaPlug,
}

// Map individual skills (by name, lowercase) to react-icons
const skillIconMap = {
  'java': FaJava,
  'javascript': FaJsSquare,
  'typescript': FaJsSquare,
  'html5': FaHtml5,
  'html': FaHtml5,
  'css3': FaCss3Alt,
  'css': FaCss3Alt,
  'react.js': FaReact,
  'react native': FaReact,
  'react': FaReact,
  'angular': FaAngular,
  'angularjs': FaAngular,
  'node.js': FaNodeJs,
  'aws': FaAws,
  'docker': FaDocker,
  'kubernetes': FaCubes,
  'jenkins': FaJenkins,
  'git': FaGitAlt,
  'bitbucket': FaGitAlt,
  'linux': FaLinux,
}

// Map cert icon keys
const certIconMap = {
  oracle: FaServer,
  react: FaReact,
  javascript: FaJsSquare,
  aws: FaAws,
  cloud: FaCloud,
  security: FaShieldAlt,
  database: FaDatabase,
}

export function getCategoryIcon(id) {
  return categoryIconMap[id] || FaCode
}

export function getSkillIcon(name) {
  if (!name) return null
  return skillIconMap[name.toLowerCase()] || null
}

export function getCertIcon(key) {
  return certIconMap[key] || FaCertificate
}

export function getCardIcon(item) {
  if (item.category === 'skills') return getCategoryIcon(item.id)
  if (item.category === 'experience') return FaBriefcase
  if (item.category === 'education') return FaGraduationCap
  if (item.category === 'certifications') return getCertIcon(item.icon)
  return FaCode
}
