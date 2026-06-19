# Bajaj RS200 — Scroll Animation Website

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Put your frames inside /public/frames/
#    Files must be named: ezgif-frame-001.jpg → ezgif-frame-300.jpg
#    Run rename_frames.js if they need renaming

# 3. Start dev server
npm run dev
```

## Project Structure

```
rs200-site/
├── public/
│   └── frames/              ← PUT YOUR 300 .jpg FRAMES HERE
│       ├── ezgif-frame-001.jpg
│       ├── ezgif-frame-002.jpg
│       └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       ← Fixed top nav with scroll effect
│   │   ├── HeroSection.jsx  ← Scroll-driven frame animation
│   │   ├── SpecsSection.jsx ← Animated specs + full spec table
│   │   ├── FeaturesSection.jsx ← 4 feature cards + CTA banner
│   │   └── Footer.jsx       ← Footer with links
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Frame Animation Config

In `HeroSection.jsx`, adjust these constants if needed:

```js
const TOTAL_FRAMES = 300;          // number of frames
const FRAME_PREFIX = "/frames/ezgif-frame-";  // filename prefix
const FRAME_EXT = ".jpg";          // file extension
const SCROLL_HEIGHT = "600vh";     // scroll distance (more = slower)
const FRAME_W = 1456;              // your frame width
const FRAME_H = 816;               // your frame height
```

## Build for Production

```bash
npm run build
```
