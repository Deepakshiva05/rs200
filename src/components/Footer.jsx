export default function Footer() {
  return (
    <footer id="footer" style={styles.footer}>
      <div style={styles.accentLine} />
      <div style={styles.container}>
        <div style={styles.top}>
          {/* Brand */}
          <div style={styles.brand}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "28px", height: "28px",
                background: "#FFD700",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }} />
              <span style={styles.logo}>
                Bajaj <span style={{ color: "#FFD700" }}>RS200</span>
              </span>
            </div>
            <p style={styles.brandText}>
              The Bajaj Pulsar RS200 — India's most track-focused street motorcycle.
              Liquid-cooled. Race-bred. Unmistakable.
            </p>
          </div>

          {/* Quick links */}
          <div style={styles.linkGroup}>
            <p style={styles.linkHeading}>Explore</p>
            {["Overview", "Specifications", "Gallery", "Colours"].map(l => (
              <a key={l} href="#" style={styles.link}>{l}</a>
            ))}
          </div>

          <div style={styles.linkGroup}>
            <p style={styles.linkHeading}>Support</p>
            {["Find a Dealer", "Book Test Ride", "Service Centers", "Contact Us"].map(l => (
              <a key={l} href="#" style={styles.link}>{l}</a>
            ))}
          </div>

          {/* CTA */}
          <div style={styles.ctaCol}>
            <p style={styles.linkHeading}>Get Started</p>
            <p style={styles.ctaText}>Ready to own the RS200?</p>
            <button style={styles.ctaBtn}>Book Now →</button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={styles.bottom}>
          <p style={styles.copy}>© {new Date().getFullYear()} Bajaj Auto Ltd. All rights reserved.</p>
          <p style={styles.copy}>Bajaj Pulsar RS200 — <span style={{ color: "#FFD700" }}>Born to Race.</span></p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#060606",
    padding: "80px 0 0",
    position: "relative",
  },
  accentLine: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "1px",
    background: "linear-gradient(90deg, transparent, #FFD700 40%, transparent)",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 2rem",
  },
  top: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1.2fr",
    gap: "3rem",
    paddingBottom: "60px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    flexWrap: "wrap",
  },
  brand: {
    maxWidth: "280px",
  },
  logo: {
    fontFamily: "'Rajdhani', 'Arial Narrow', sans-serif",
    fontWeight: 700,
    fontSize: "18px",
    color: "#fff",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  brandText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.35)",
    lineHeight: 1.8,
  },
  linkGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  linkHeading: {
    fontSize: "10px",
    letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.25)",
    textTransform: "uppercase",
    marginBottom: "6px",
  },
  link: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.55)",
    textDecoration: "none",
    transition: "color 0.2s",
    cursor: "pointer",
  },
  ctaCol: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  ctaText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.6,
  },
  ctaBtn: {
    padding: "12px 24px",
    background: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "2px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    cursor: "pointer",
    fontFamily: "'Rajdhani', sans-serif",
    alignSelf: "flex-start",
    marginTop: "4px",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    flexWrap: "wrap",
    gap: "8px",
  },
  copy: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.2)",
    letterSpacing: "0.05em",
  },
};
