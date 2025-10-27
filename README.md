# Nikhil Agarwal - Portfolio Website

A modern, responsive portfolio website showcasing professional experience, skills, projects, and achievements.

## Features

- **Modern Design**: Clean, professional design with teal/cyan color scheme
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Hover effects, scroll animations, and transitions
- **Multiple Sections**:
  - Hero section with call-to-action
  - About section with skills progress bars
  - Skills & Expertise showcase
  - Work Experience timeline
  - Featured Projects
  - Education & Certifications
  - Contact form with social links
  - Professional footer

## Tech Stack

- React 19
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- React Router

## Local Development

### Installation

```bash
cd frontend
yarn install
```

### Start Development Server

```bash
yarn start
```

The website will open at `http://localhost:3000`

### Build for Production

```bash
yarn build
```

This creates a `build` folder with optimized static files.

## Deployment to GitHub Pages

### Step 1: Install gh-pages

```bash
yarn add -D gh-pages
```

### Step 2: Update package.json

Add these fields to your `package.json`:

```json
{
  "homepage": "https://your-username.github.io/repository-name",
  "scripts": {
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
  }
}
```

Replace `your-username` with your GitHub username and `repository-name` with your repo name.

### Step 3: Deploy

```bash
yarn deploy
```

### Step 4: Configure GitHub Repository

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select `gh-pages` branch
4. Click **Save**

Your portfolio will be live at the URL specified in `homepage`!

## Customization

### Update Personal Information

- **Contact Details**: Edit `src/components/Contact.jsx` and `src/components/Footer.jsx`
- **Social Links**: Update in `src/components/Hero.jsx` and `src/components/Footer.jsx`
- **About Content**: Modify `src/components/About.jsx`

### Update Projects

Edit the `projects` array in `src/components/Projects.jsx`

### Update Experience

Edit the `experiences` array in `src/components/Experience.jsx`

### Update Skills

Edit the `skillCategories` array in `src/components/Skills.jsx`

### Change Colors

The color scheme uses Tailwind CSS classes. Main colors:
- Primary: `teal-400`, `teal-500`, `teal-600`
- Secondary: `cyan-400`, `cyan-500`, `cyan-600`

Find and replace these classes to change the color scheme.

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Hero.jsx         # Hero section
│   │   ├── About.jsx        # About section
│   │   ├── Skills.jsx       # Skills section
│   │   ├── Experience.jsx   # Work experience
│   │   ├── Projects.jsx     # Featured projects
│   │   ├── Education.jsx    # Education & certs
│   │   ├── Contact.jsx      # Contact form
│   │   └── Footer.jsx       # Footer
│   ├── pages/
│   │   └── HomePage.jsx     # Main page
│   ├── hooks/
│   │   └── use-toast.js     # Toast notifications
│   ├── App.js
│   ├── App.css
│   └── index.css
├── package.json
└── README.md
```

## Contact

**Nikhil Agarwal**
- Email: nikhilagarwal.20.na@gmail.com
- Phone: +91 98047 70368
- Location: Kolkata, India

---

Built with React & Tailwind CSS
