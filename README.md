# Cybersecurity Portfolio Website

A modern, premium, hacker-style portfolio built for Cybersecurity Engineers, AI Researchers, and Python Developers.

## Tech Stack
- **Frontend Framework**: React (via Vite)
- **Styling**: Tailwind CSS v4 (with custom CSS variables and glassmorphism)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM (Ready for multi-page expansion)

## Features
- **Cyber/Hacker Theme**: Uses a dark mode palette (`var(--color-cyber-black)`) with neon green and blue accents.
- **Micro-interactions**: Smooth scroll, hover states, glassmorphism cards, and text gradients.
- **Responsive Navigation**: Full mobile support with a collapsible menu.
- **Framer Motion Elements**: Includes enter animations and scroll-based reveals.
- **Typing Effect**: A terminal-style typing animation for the Hero section.

---

## 🚀 How to Run Locally

1. **Prerequisites**: Ensure you have Node.js (v18+) installed.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
4. **View**: Open `http://localhost:5173` in your browser.

---

## 🌐 How to Deploy to Vercel

The application is built with Vite and comes completely deployment-ready for Vercel.

**Method 1: Vercel CLI (Quickest)**
1. Install the Vercel CLI globally: `npm i -g vercel`
2. Run `vercel` in the project directory.
3. Follow the prompts. It will automatically detect the Vite build settings.

**Method 2: Vercel Dashboard (GitHub Integration)**
1. Push this repository to GitHub.
2. Log into [Vercel](https://vercel.com).
3. Click **Add New** -> **Project**.
4. Import your GitHub repository.
5. Vercel will auto-detect **Vite**.
6. Click **Deploy**.

---

## 🛠 Project Structure & Placeholders

- `src/components/`: Contains all reusable UI components (Hero, About, Skills, Projects, etc.).
- `src/index.css`: Houses Tailwind v4 configuration, custom CSS variables, and utility classes like `.glass-card`.
- **Placeholder Assets**: 
  - To add real project images, modify `Projects.jsx` and replace the placeholder `div` with an `img` tag pointing to `src/assets/`.
  - To define the resume download, ensure `resume.pdf` is placed in the `public/` folder, and it will be accessible at `/resume.pdf`.

## Author
Template developed by AI Assistant for Nithish.
