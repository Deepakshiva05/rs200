import { useEffect, useRef, useState } from "react";

const specs = [
  { value: 199.5, unit: "cc", label: "Engine Displacement", suffix: "" },
  { value: 24.5, unit: "PS", label: "Maximum Power", suffix: "" },
  { value: 18.7, unit: "Nm", label: "Peak Torque", suffix: "" },
  { value: 148, unit: "kmph", label: "Top Speed", suffix: "+" },
];

const specDetails = [
  { label: "Engine Type", value: "Single Cylinder, 4 Stroke, DOHC, Liquid Cooled" },
  { label: "Bore × Stroke", value: "72.0 × 49.0 mm" },
  { label: "Compression Ratio", value: "12.8 : 1" },
  { label: "Transmission", value: "6-Speed Constant Mesh" },
  { label: "Front Suspension", value: "USD Fork — 41 mm" },
  { label: "Rear Suspension", value: "Monoshock" },
  { label: "Front Brake", value: "Disc — 300 mm, Petal type" },
  { label: "Rear Brake", value: "Disc — 230 mm" },
  { label: "Kerb Weight", value: "165 kg" },
  { label: "Fuel Tank", value: "13 Litres" },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function AnimatedNumber({ target, duration = 1800, decimals = 0 }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(+(target * ease).toFixed(decimals));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, decimals]);

  return <>{val.toFixed(decimals)}</>;
}

export default function SpecsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  return (
    <section id="specs" ref={sectionRef} style={styles.section}>

      {/* Yellow accent line */}
      <div style={styles.accentLine} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <p style={styles.eyebrow}>TECHNICAL SPECIFICATIONS</p>
          <h2 style={styles.heading}>
            Engineered for<br />
            <span style={{ color: "#FFD700" }}>precision.</span>
          </h2>
          <p style={styles.subtext}>
            The RS200 is powered by a liquid-cooled, DOHC engine — the most advanced
            powertrain ever fitted to a Bajaj motorcycle. Every number tells the story.
          </p>
        </div>

        {/* Big stat cards */}
        <div style={styles.statsGrid}>
          {specs.map((s, i) => (
            <div key={i} style={styles.statCard}>
              <div style={styles.statTop}>
                {inView && (
                  <span style={styles.statValue}>
                    <AnimatedNumber
                      target={s.value}
                      decimals={s.value % 1 !== 0 ? 1 : 0}
                      duration={1600 + i * 150}
                    />
                    {s.suffix}
                  </span>
                )}
                <span style={styles.statUnit}>{s.unit}</span>
              </div>
              <p style={styles.statLabel}>{s.label}</p>
              <div style={styles.statBar}>
                <div style={{
                  ...styles.statBarFill,
                  width: inView ? `${(s.value / [200, 30, 25, 200][i]) * 100}%` : "0%",
                  transition: `width 1.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed spec table */}
        <div style={styles.tableWrap}>
          <p style={styles.tableTitle}>Full Specification Sheet</p>
          <div style={styles.table}>
            {specDetails.map((row, i) => (
              <div key={i} style={{
                ...styles.tableRow,
                borderTop: i === 0 ? "1px solid rgba(255,215,0,0.15)" : "1px solid rgba(255,255,255,0.05)",
              }}>
                <span style={styles.tableLabel}>{row.label}</span>
                <span style={styles.tableValue}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: "#0a0a0a",
    padding: "120px 0",
    position: "relative",
    overflow: "hidden",
  },
  accentLine: {
    position: "absolute",
    top: 0, left: 0,
    width: "100%",
    height: "1px",
    background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  header: {
    marginBottom: "80px",
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.06)",
    marginBottom: "80px",
  },
  statCard: {
    background: "#0a0a0a",
    padding: "40px 28px",
  },
  statTop: {
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    marginBottom: "6px",
  },
  statValue: {
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 900,
    color: "#fff",
    fontFamily: "'Rajdhani', 'Arial Narrow', sans-serif",
    lineHeight: 1,
  },
  statUnit: {
    fontSize: "16px",
    color: "#FFD700",
    fontWeight: 700,
    letterSpacing: "0.05em",
  },
  statLabel: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "16px",
  },
  statBar: {
    height: "2px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "99px",
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    background: "#FFD700",
    borderRadius: "99px",
  },
  tableWrap: {
    border: "1px solid rgba(255,255,255,0.06)",
  },
  tableTitle: {
    fontSize: "11px",
    letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    padding: "16px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  table: {
    display: "flex",
    flexDirection: "column",
  },
  tableRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 24px",
    gap: "2rem",
  },
  tableLabel: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.35)",
    minWidth: "180px",
  },
  tableValue: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.85)",
    textAlign: "right",
  },
};
