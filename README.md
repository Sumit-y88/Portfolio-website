<div align="center">

# ✦ Portfolio — Sumit Yadav

**A modern, responsive developer portfolio built with React & Tailwind CSS**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=6366F1)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<br/>

> *"Code is not just logic — it's craftsmanship."*

<br/>

![Portfolio Preview](https://placehold.co/900x480/0f172a/6366f1?text=Sumit+Yadav+%7C+Portfolio&font=raleway)

</div>

---

## 🌐 Live Demo

🔗 **[View Portfolio →](https://your-portfolio-url.vercel.app)**

---

## ✨ Features

- 🌑 **Dark + Indigo Theme** — Sleek dark background with rich indigo accents throughout
- ⚡ **Blazing Fast** — Powered by Vite for instant HMR and optimized production builds
- 📱 **Fully Responsive** — Mobile-first design with hamburger menu for smaller screens
- 🎨 **Smooth Animations** — Typewriter effects, scroll-based reveals, and hover micro-interactions
- 🗂️ **Projects Showcase** — Project cards with tech stack, live demo & repo links
- 🛠️ **Skills Section** — Visual skill grid organized by category
- 📄 **Resume Download** — One-click resume download button
- 📬 **Contact Section** — Social links and email for getting in touch
- ⏳ **Loading Screen** — Polished loading page on initial visit

---

## 🗂️ Sections

| Section | Description |
|---|---|
| **Hero** | Intro with name, animated typewriter title, and CTA buttons |
| **About** | Bio, background, and personal summary |
| **Skills** | Tech stack organized by category |
| **Projects** | Cards with descriptions, tech used, and links |
| **Contact** | Social links and email |

---

## 🛠️ Tech Stack

- **[React](https://react.dev/)** — Component-based UI library
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling with custom dark + indigo palette
- **[Vite](https://vitejs.dev/)** — Lightning-fast frontend build tool

---

## 📁 Project Structure

```
portfolio/
├── public/                          # Static assets (favicon etc.)
├── src/
│   ├── assets/                      # Images, icons, resume PDF
│   ├── components/
│   │   ├── AboutHeading.jsx         # "About Me" section heading
│   │   ├── AboutMeHeading.jsx       # Alternate about heading variant
│   │   ├── AboutSection.jsx         # Full about section layout
│   │   ├── AboutSectionText.jsx     # About section body text
│   │   ├── Animation.jsx            # Reusable animation wrapper
│   │   ├── ContactIcons.jsx         # Social/contact icon links
│   │   ├── ContactMe.jsx            # Contact section component
│   │   ├── Footer.jsx               # Site footer
│   │   ├── HamburgerIcon.jsx        # Mobile menu toggle icon
│   │   ├── Heading.jsx              # Generic section heading
│   │   ├── Links.jsx                # Navigation links
│   │   ├── LoadingPage.jsx          # Initial loading screen
│   │   ├── Logo.jsx                 # Brand logo component
│   │   ├── MainSection.jsx          # Hero / landing section
│   │   ├── MobileMenu.jsx           # Mobile navigation drawer
│   │   ├── Navbar.jsx               # Desktop navigation bar
│   │   ├── Project.jsx              # Individual project card
│   │   ├── ResumeDownloadBtn.jsx    # Resume download button
│   │   ├── SkillsSection.jsx        # Skills grid section
│   │   ├── TypeEffect.jsx           # Typewriter text animation
│   │   └── useInView.jsx            # Scroll-based visibility hook
│   ├── utils/
│   │   └── Contact.js               # Contact helper utility
│   ├── App.jsx                      # Root component
│   ├── App.css                      # Global styles
│   ├── index.css                    # Tailwind directives
│   └── main.jsx                     # React DOM entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Sumit-y88/portfolio.git

# 2. Navigate into the project
cd portfolio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. 🎉

### Build for Production

```bash
npm run build
```

Optimized output will be in the `dist/` folder, ready to deploy.

---

## 🌍 Deployment

This portfolio can be deployed in one click:

| Platform | Guide |
|---|---|
| **[Vercel](https://vercel.com/)** | Connect GitHub repo → auto-deploys on every push |
| **[Netlify](https://netlify.com/)** | Drag & drop `dist/` or connect GitHub |
| **[GitHub Pages](https://pages.github.com/)** | Use `gh-pages` npm package |

---

## 🎨 Theme

The portfolio uses a **dark + indigo** color scheme:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      background: "#0f172a",   // Deep dark navy
      surface:    "#1e293b",   // Card / section surface
      accent:     "#6366f1",   // Indigo primary accent
      highlight:  "#818cf8",   // Lighter indigo for hovers
      muted:      "#94a3b8",   // Subtle muted text
    },
  },
},
```

---

## 📬 Contact

Have a project in mind or just want to say hi?

- 📧 **Email:** [sumit.yadav.0287@gmail.com](mailto:sumit.yadav.0287@gmail.com)
- 💼 **LinkedIn:** [Sumit Yadav](https://www.linkedin.com/in/sumit-yadav)
- 🐙 **GitHub:** [github.com/Sumit-y88](https://github.com/Sumit-y88)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Made with 💜 by **Sumit Yadav**

⭐ Star this repo if you found it helpful!

</div>
