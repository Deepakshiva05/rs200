import { useState, useEffect } from "react";

const links = ["Home", "Specs", "Features", "Book Now"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (link) => {
    const map = {
      Home: "hero",
      Specs: "specs",
      Features: "features",
      "Book Now": "footer",
    };
    document.getElementById(map[link])?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 3rem",
      height: "64px",
      background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,215,0,0.08)" : "none",
      transition: "background 0.4s, border 0.4s",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "32px", height: "32px",
          background: "#FFD700",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }} />
        <span style={{
          fontFamily: "'Rajdhani', 'Arial Narrow', sans-serif",
          fontWeight: 700,
          fontSize: "20px",
          color: "#fff",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          Bajaj <span style={{ color: "#FFD700" }}>RS200</span>
        </span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {links.map((l) => (
          <button
            key={l}
            onClick={() => handleNav(l)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: l === "Book Now" ? "#FFD700" : "rgba(255,255,255,0.7)",
              fontSize: "13px",
              fontWeight: l === "Book Now" ? 700 : 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: l === "Book Now" ? "6px 18px" : "0",
              border: l === "Book Now" ? "1px solid #FFD700" : "none",
              borderRadius: l === "Book Now" ? "2px" : "0",
              transition: "color 0.2s, opacity 0.2s",
            }}
            onMouseEnter={e => { if (l !== "Book Now") e.target.style.color = "#FFD700"; }}
            onMouseLeave={e => { if (l !== "Book Now") e.target.style.color = "rgba(255,255,255,0.7)"; }}
          >
            {l}
          </button>
        ))}
      </div>
    </nav>
  );
}
