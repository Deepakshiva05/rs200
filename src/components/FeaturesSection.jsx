import { useEffect, useRef, useState } from "react";

const features = [
  {
    tag: "AERODYNAMICS",
    title: "Full-Fairing Race Body",
    desc: "Inspired by MotoGP bodywork, the RS200's full fairing isn't just cosmetic. Wind-tunnel optimised panels reduce drag and direct airflow over the engine for superior cooling at high speed.",
    stat: "Cd 0.28",
    statLabel: "drag coefficient",
    icon: "💨",
  },
  {
    tag: "BRAKING",
    title: "Dual Disc ABS",
    desc: "A 300 mm petal-cut front disc paired with a 230 mm rear disc and Bosch 2-channel ABS. Maximum stopping power with full stability — in all conditions, at all speeds.",
    stat: "300 mm",
    statLabel: "front disc diameter",
    icon: "⬟",
  },
  {
    tag: "SUSPENSION",
    title: "USD Front Fork",
    desc: "The upside-down front fork — borrowed from superbikes — delivers class-leading rigidity and feedback. Paired with a rear monoshock, the RS200 corners with surgical precision.",
    stat: "41 mm",
    statLabel: "USD fork diameter",
    icon: "⟁",
  },
  {
    tag: "POWERTRAIN",
    title: "Liquid-Cooled DOHC",
    desc: "The 199.5 cc, 4-valve, liquid-cooled DOHC engine is the heart of the RS200. It produces 24.5 PS at 9,750 rpm and revs with a sharpness no air-cooled engine can match.",
    stat: "9,750",
    statLabel: "rpm at peak power",
    icon: "◈",
  },
];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      style={{
        ...styles.card,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
      }}
    >
      {/* Top row */}
      <div style={styles.cardTop}>
        <span style={styles.cardTag}>{feature.tag}</span>
        <span style={styles.cardIcon}>{feature.icon}</span>
      </div>

      {/* Title */}
      <h3 style={styles.cardTitle}>{feature.title}</h3>

      {/* Divider */}
      <div style={styles.cardDivider} />

      {/* Description */}
      <p style={styles.cardDesc}>{feature.desc}</p>

      {/* Stat */}
      <div style={styles.cardStatRow}>
        <span style={styles.cardStat}>{feature.stat}</span>
        <span style={styles.cardStatLabel}>{feature.statLabel}</span>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef);

  return (
    <section id="features" style={styles.section}>
      {/* Diagonal yellow stripe */}
      <div style={styles.stripe} />

      <div style={styles.container}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            ...styles.header,
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "none" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p style={styles.eyebrow}>WHY RS200</p>
          <h2 style={styles.heading}>
            Race DNA.<br />
            <span style={{ color: "#FFD700" }}>Street ready.</span>
          </h2>
          <p style={styles.subtext}>
            Every component of the RS200 is engineered with a single obsession — performance.
            Here's what puts it in a class of its own.
          </p>
        </div>

        {/* Feature grid */}
        <div style={styles.grid}>
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>

        {/* CTA Banner */}
        <div style={styles.ctaBanner}>
          <div>
            <p style={styles.ctaEyebrow}>READY TO RIDE?</p>
            <h3 style={styles.ctaTitle}>Experience the RS200 at your nearest showroom.</h3>
          </div>
          <button
            style={styles.ctaBtn}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#FFD700";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#FFD700";
            }}
          >
            Book a Test Ride →
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#080808",
    padding: "120px 0",
    position: "relative",
    overflow: "hidden",
  },
  stripe: {
    position: "absolute",
    top: "-60px",
    right: "-100px",
    width: "400px",
    height: "800px",
    background: "rgba(255,215,0,0.03)",
    transform: "rotate(15deg)",
    pointerEvents: "none",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  header: {
    marginBottom: "72px",
  },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "0.3em",
    color: "#FFD700",
    fontFamily: "'Rajdhani', sans-serif",
    marginBottom: "16px",
  },
  heading: {
    fontSize: "clamp(36px, 6vw, 72px)",
    fontWeight: 900,
    color: "#fff",
    fontFamily: "'Rajdhani', 'Arial Narrow', sans-serif",
    lineHeight: 1.05,
    margin: "0 0 20px",
  },
  subtext: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.8,
    maxWidth: "480px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.05)",
    marginBottom: "80px",
  },
  card: {
    background: "#080808",
    padding: "40px 28px",
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  cardTag: {
    fontSize: "10px",
    letterSpacing: "0.18em",
    color: "#FFD700",
    fontWeight: 700,
  },
  cardIcon: {
    fontSize: "20px",
    opacity: 0.4,
  },
  cardTitle: {
    fontSize: "clamp(18px, 2.5vw, 24px)",
    fontWeight: 700,
    color: "#fff",
    fontFamily: "'Rajdhani', sans-serif",
    margin: "0 0 20px",
    lineHeight: 1.2,
  },
  cardDivider: {
    height: "1px",
    background: "rgba(255,215,0,0.2)",
    marginBottom: "20px",
  },
  cardDesc: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.85,
    flex: 1,
    marginBottom: "28px",
  },
  cardStatRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
  },
  cardStat: {
    fontSize: "22px",
    fontWeight: 900,
    color: "#FFD700",
    fontFamily: "'Rajdhani', sans-serif",
  },
  cardStatLabel: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.08em",
  },
  ctaBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
    padding: "48px",
    border: "1px solid rgba(255,215,0,0.2)",
    flexWrap: "wrap",
  },
  ctaEyebrow: {
    fontSize: "10px",
    letterSpacing: "0.25em",
    color: "#FFD700",
    marginBottom: "8px",
  },
  ctaTitle: {
    fontSize: "clamp(18px, 3vw, 26px)",
    fontWeight: 700,
    color: "#fff",
    fontFamily: "'Rajdhani', sans-serif",
    margin: 0,
  },
  ctaBtn: {
    padding: "14px 36px",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#FFD700",
    background: "transparent",
    border: "1px solid #FFD700",
    borderRadius: "2px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.25s, color 0.25s",
    fontFamily: "'Rajdhani', sans-serif",
  },
};
