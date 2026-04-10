# Pooja Gaur — Netflix-Style Portfolio

A cinematic, Netflix-inspired portfolio for **Pooja Gaur**, Full Stack Engineer at XTec Incorporated. Built with React + Vite, featuring an animated intro, profile-based browsing, and rich interactive content rows.

🌐 **Live:** [poojagaur.com](https://poojagaur.com) • [poojagaur.vercel.app](https://poojagaur.vercel.app)

---

## Features

- **Animated Netflix Intro** — Custom "PG" ribbon logo with the iconic ta-dum sound effect on click
- **"Who's Watching?" Profile Selection** — Four viewer profiles (Recruiter, Developer, Collaborator, Explorer), each with its own background mood and personalized content ordering
- **Hero Banner** — Full-bleed animated GIF backgrounds, Ken Burns zoom, typing effect, and call-to-action buttons
- **My Top 10 Skills** — Netflix-style numbered card row with the most prominent technologies
- **Horizontal Scrolling Content Rows** — Profile-aware sections for Experience, Skills, Education, and Certifications
- **Detail Modals** — Click any card for a Netflix-style overlay with full information
- **Experience Timeline Page** — Vertical timeline with expandable highlights for each role
- **Skills Showcase** — Seven categories with animated proficiency bars and tech-specific icons
- **Education & Certifications Pages** — Cards with course details, issuer info, and "match" scores
- **Contact Page** — LinkedIn integration, direct email, and a stats dashboard
- **Responsive Navbar** — Search, profile dropdown, and mobile-friendly hamburger menu
- **HD Polish** — Anti-aliased fonts, GPU-accelerated animations, retina support, custom scrollbar, `prefers-reduced-motion` honored

---

## Tech Stack

- **React 18** with hooks
- **Vite** for lightning-fast dev/build
- **React Router v6** for client-side routing
- **React Icons** for vector tech logos and UI icons
- **Pure CSS** with custom animations (no UI library)
- **Web Audio API** + HTML5 Audio for the ta-dum sound

---

## Project Structure

```
PoojaGaurPortfolio/
├── public/
│   ├── netflix-sound.mp3      # Ta-dum sound effect
│   ├── bg-recruiter.gif       # Profile-specific hero backgrounds
│   ├── bg-developer.gif
│   ├── bg-collaborator.gif
│   └── bg-explorer.gif
├── src/
│   ├── main.jsx               # App entry point
│   ├── App.jsx                # Router setup
│   ├── styles.css             # All styles
│   ├── data/
│   │   └── portfolio.js       # All portfolio content (experience, skills, etc.)
│   └── components/
│       ├── NetflixIntro.jsx   # Animated splash screen
│       ├── ProfileSelect.jsx  # "Who's Watching?" page
│       ├── NavBar.jsx         # Top navigation
│       ├── Browse.jsx         # Main browse page (hero + rows)
│       ├── ContentRow.jsx     # Horizontal scrolling card row
│       ├── DetailModal.jsx    # Card detail overlay
│       ├── ExperiencePage.jsx # Timeline view
│       ├── SkillsPage.jsx     # Skills with proficiency bars
│       ├── EducationPage.jsx  # Education cards
│       ├── CertificationsPage.jsx
│       ├── ContactPage.jsx
│       ├── Footer.jsx
│       └── iconMap.jsx        # Icon lookup helpers
├── index.html
├── package.json
├── vite.config.js
└── vercel.json                # SPA routing rewrites
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/Pgaur9/poojagaur.git
cd poojagaur
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

The build output goes to `dist/`. Preview it with:

```bash
npm run preview
```

---

## Deployment

The site is deployed on **Vercel** with auto-deploy on every push to `main`.

The custom domain `poojagaur.com` is connected via DNS A record (`@` → `216.198.79.1`) and CNAME (`www` → `cname.vercel-dns.com`) configured at GoDaddy.

`vercel.json` rewrites all routes to `/` so React Router can handle client-side navigation without 404s.

---

## Customization

All portfolio content lives in **`src/data/portfolio.js`** — update it to change:

- Personal info (name, title, summary, LinkedIn, email)
- Experience entries (company, role, highlights, skills)
- Education entries (institution, degree, courses)
- Certifications (issuer, date, icons)
- Skill categories and proficiency levels
- Profile-specific row ordering

No component changes are needed for typical content updates.

---

## Contact

**Pooja Gaur** — Full Stack Engineer
- 💼 [LinkedIn](https://www.linkedin.com/in/pooja-gaur-4aa0a31ab)
- 📧 pooja.gaur179@gmail.com

---

## Credits

- Inspired by the Netflix viewing experience and the original [Netflix-style portfolio template](https://github.com/) concept
- Background GIFs from [Giphy](https://giphy.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Built with [Vite](https://vitejs.dev) and [React](https://react.dev)
