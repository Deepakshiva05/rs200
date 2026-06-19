import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 300;
const FRAME_PREFIX = "/frames/ezgif-frame-";
const FRAME_EXT = ".jpg";
const FRAME_W = 1456;
const FRAME_H = 816;
const BATCH_SIZE = 10; // load 10 frames at a time — prevents browser throttling

function pad(n) {
  return String(n).padStart(3, "0");
}

export default function HeroSection() {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const frameIndexRef = useRef(0);
  const animDoneRef = useRef(false);

  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // ── Safety net: ALWAYS release body scroll on unmount ──────────────────
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // ── Batched frame preloader ─────────────────────────────────────────────
  useEffect(() => {
    const images = new Array(TOTAL_FRAMES).fill(null);
    framesRef.current = images;
    let loadedTotal = 0;
    let errorTotal = 0;

    const checkDone = () => {
      if (loadedTotal + errorTotal === TOTAL_FRAMES) {
        if (errorTotal > TOTAL_FRAMES * 0.5) {
          // More than 50% failed — likely a path issue
          setLoadError(true);
          document.body.style.overflow = ""; // release scroll no matter what
        } else {
          setAllLoaded(true);
          const canvas = canvasRef.current;
          const first = framesRef.current[0];
          if (canvas && first?.complete) {
            canvas.getContext("2d").drawImage(first, 0, 0, FRAME_W, FRAME_H);
          }
        }
      }
    };

    const loadBatch = (startIndex) => {
      const end = Math.min(startIndex + BATCH_SIZE, TOTAL_FRAMES);
      for (let i = startIndex; i < end; i++) {
        const img = new Image();
        // Use index starting at 1 (ezgif naming: 001..300)
        img.src = `${FRAME_PREFIX}${pad(i + 1)}${FRAME_EXT}`;
        img.onload = () => {
          framesRef.current[i] = img;
          loadedTotal++;
          setLoadedCount(loadedTotal);
          checkDone();
        };
        img.onerror = () => {
          errorTotal++;
          setLoadedCount(loadedTotal);
          checkDone();
        };
        images[i] = img;
      }
      // Queue next batch after a small delay to prevent browser throttle
      if (end < TOTAL_FRAMES) {
        setTimeout(() => loadBatch(end), 50);
      }
    };

    loadBatch(0);

    // Fallback: if loading stalls for 30s, release scroll anyway
    const fallbackTimer = setTimeout(() => {
      document.body.style.overflow = "";
      setAllLoaded(true); // attempt to proceed with whatever loaded
    }, 30000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // ── Draw a specific frame ───────────────────────────────────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    canvas.getContext("2d").drawImage(img, 0, 0, FRAME_W, FRAME_H);
  }, []);

  // ── Wheel + touch → drive frame index ──────────────────────────────────
  useEffect(() => {
    if (!allLoaded) return;

    const SPEED = 1.5;
    let touchStartY = 0;

    const advance = (delta) => {
      if (animDoneRef.current) return;

      frameIndexRef.current = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, frameIndexRef.current + delta * SPEED)
      );

      const idx = Math.round(frameIndexRef.current);
      drawFrame(idx);
      setDisplayIndex(idx);
      setHeroVisible(idx < 20);

      if (idx >= TOTAL_FRAMES - 1) {
        animDoneRef.current = true;
        document.body.style.overflow = "";
      }
    };

    const onWheel = (e) => {
      if (animDoneRef.current) return;
      e.preventDefault();
      advance(e.deltaY > 0 ? 1 : -1);
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (animDoneRef.current) return;
      e.preventDefault();
      const dy = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      advance(dy > 0 ? 1 : -1);
    };

    // Lock scroll and attach listeners
    document.body.style.overflow = "hidden";
    animDoneRef.current = false;

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      document.body.style.overflow = "";
    };
  }, [allLoaded, drawFrame]);

  const pct = Math.round((displayIndex / (TOTAL_FRAMES - 1)) * 100);
  const loadPct = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <section id="hero" style={{ height: "100vh", position: "relative" }}>
      <div style={styles.sticky}>
        <div style={styles.canvasOuter}>
          <canvas
            ref={canvasRef}
            width={FRAME_W}
            height={FRAME_H}
            style={styles.canvas}
          />

          <div style={styles.vignette} />

          {/* Loading overlay */}
          {!allLoaded && !loadError && (
            <div style={styles.loadOverlay}>
              <p style={styles.loadEyebrow}>BAJAJ RS200</p>
              <p style={styles.loadTitle}>LOADING</p>
              <div style={styles.loadBarTrack}>
                <div style={{ ...styles.loadBarFill, width: `${loadPct}%` }} />
              </div>
              <p style={styles.loadCount}>{loadedCount} / {TOTAL_FRAMES} frames</p>
            </div>
          )}

          {/* Error state */}
          {loadError && (
            <div style={styles.loadOverlay}>
              <p style={styles.loadEyebrow}>⚠ ERROR</p>
              <p style={{ ...styles.loadTitle, fontSize: "32px" }}>Frames not found</p>
              <p style={styles.loadCount}>
                Make sure your frames are in <code style={{ color: "#FFD700" }}>/public/frames/</code>
                <br />named <code style={{ color: "#FFD700" }}>ezgif-frame-001.jpg</code> → <code style={{ color: "#FFD700" }}>ezgif-frame-300.jpg</code>
              </p>
            </div>
          )}

          {/* Hero text */}
          {allLoaded && (
            <div style={{
              ...styles.heroText,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(-24px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}>
              <p style={styles.eyebrow}>BAJAJ PULSAR</p>
              <h1 style={styles.heading}>RS<span style={{ color: "#FFD700" }}>200</span></h1>
              <p style={styles.subheading}>Born to Race. Built to Dominate.</p>
              <div style={styles.scrollHint}>
                <div style={styles.scrollDot} />
                <span style={styles.scrollLabel}>Scroll to explore</span>
              </div>
            </div>
          )}

          {/* Progress bar */}
          {allLoaded && (
            <div style={styles.progressWrap}>
              <div style={styles.progressTrack}>
                <div style={{ ...styles.progressFill, width: `${pct}%` }} />
              </div>
              <span style={styles.progressLabel}>
                {pct < 5
                  ? "Side Profile"
                  : pct < 95
                  ? "Exploding..."
                  : "Full Detail — scroll to continue ↓"}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const styles = {
  sticky: {
    position: "sticky",
    top: 0,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#080808",
    overflow: "hidden",
  },
  canvasOuter: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  canvas: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  vignette: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
    pointerEvents: "none",
  },
  loadOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    background: "#080808",
  },
  loadEyebrow: {
    fontSize: "11px",
    letterSpacing: "0.3em",
    color: "#FFD700",
    fontFamily: "'Rajdhani', sans-serif",
  },
  loadTitle: {
    fontSize: "clamp(40px, 8vw, 96px)",
    fontWeight: 900,
    color: "#fff",
    letterSpacing: "0.2em",
    fontFamily: "'Rajdhani', 'Arial Narrow', sans-serif",
    lineHeight: 1,
  },
  loadBarTrack: {
    width: "240px",
    height: "2px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "99px",
    overflow: "hidden",
    marginTop: "8px",
  },
  loadBarFill: {
    height: "100%",
    background: "#FFD700",
    borderRadius: "99px",
    transition: "width 0.15s ease",
  },
  loadCount: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.05em",
    textAlign: "center",
    lineHeight: 1.8,
  },
  heroText: {
    position: "absolute",
    bottom: "12%",
    left: "6%",
    pointerEvents: "none",
  },
  eyebrow: {
    fontSize: "11px",
    letterSpacing: "0.3em",
    color: "#FFD700",
    fontFamily: "'Rajdhani', sans-serif",
    marginBottom: "8px",
  },
  heading: {
    fontSize: "clamp(64px, 12vw, 140px)",
    fontWeight: 900,
    color: "#fff",
    fontFamily: "'Rajdhani', 'Arial Narrow', sans-serif",
    lineHeight: 0.9,
    letterSpacing: "-0.02em",
    margin: 0,
  },
  subheading: {
    fontSize: "clamp(14px, 2vw, 18px)",
    color: "rgba(255,255,255,0.55)",
    marginTop: "12px",
    letterSpacing: "0.05em",
    fontStyle: "italic",
  },
  scrollHint: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "28px",
  },
  scrollDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#FFD700",
    animation: "pulse 1.6s ease-in-out infinite",
  },
  scrollLabel: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  progressWrap: {
    position: "absolute",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    width: "280px",
  },
  progressTrack: {
    width: "100%",
    height: "1px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "99px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#FFD700",
    borderRadius: "99px",
    transition: "width 0.05s linear",
  },
  progressLabel: {
    fontSize: "10px",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
};