# Portfolio - Scrollytelling

A modern portfolio website built with React + Vite, featuring smooth scrolling animations and a responsive design.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page will auto-update as you edit the files.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ScrollyCanvas.jsx    # Canvas-based scrolling animation
│   ├── Overlay.jsx          # Text overlay component
│   ├── Experience.jsx       # Career timeline section
│   └── Projects.jsx         # Portfolio projects showcase
├── App.jsx                  # Main application component
├── main.jsx                 # Entry point
└── index.css               # Global styles with Tailwind
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **JavaScript (JSX)** - No TypeScript

## Features

- Smooth scroll-triggered animations
- Canvas-based sequence animation
- Responsive design
- Dark theme
- Performance optimized

## License

MIT

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
