"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
const WORD = "3DGEN";

function useScramble(target: string, duration = 1000) {
  const [display, setDisplay] = useState("?????".slice(0, target.length));
  const frame = useRef(0);
  const raf = useRef<number>(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    const totalFrames = duration / 16; // ~60fps

    const tick = (ts: number) => {
      if (!start.current) start.current = ts;
      const elapsed = ts - start.current;
      const progress = Math.min(elapsed / duration, 1);

      frame.current++;
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            // Reveal each character progressively left-to-right
            const revealAt = i / target.length;
            if (progress >= revealAt + 0.15) return char;
            // Scramble phase
            return frame.current % 3 === 0
              ? CHARS[Math.floor(Math.random() * CHARS.length)]
              : CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return display;
}

export default function LoadingScreen() {
  const [exit, setExit] = useState(false);
  const [hidden, setHidden] = useState(false);
  const logo = useScramble(WORD, 900);

  useEffect(() => {
    // Start exit curtain after scramble settles + brief pause
    const t1 = setTimeout(() => setExit(true), 1600);
    // Fully unmount after animation
    const t2 = setTimeout(() => setHidden(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Top curtain panel */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          bottom: "50%",
          zIndex: 9999,
          background: "var(--bg)",
          transform: exit ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
        }}
      />
      {/* Bottom curtain panel */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          top: "50%",
          zIndex: 9999,
          background: "var(--bg)",
          transform: exit ? "translateY(100%)" : "translateY(0)",
          transition: "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
        }}
      />

      {/* Center logo — sits above both panels */}
      <div
        role="status"
        aria-label="Ładowanie"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          pointerEvents: "none",
          opacity: exit ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: "clamp(3rem, 8vw, 6rem)",
            letterSpacing: "0.08em",
            background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}
        >
          {logo}
        </span>

        {/* Thin progress line */}
        <div
          style={{
            width: "clamp(160px, 20vw, 240px)",
            height: "1px",
            background: "var(--border-light)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
              animation: "ls2-fill 1.4s cubic-bezier(0.76, 0, 0.24, 1) forwards",
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* Sub-label */}
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Platforma wyceny druku 3D
        </span>
      </div>

      <style>{`
        @keyframes ls2-fill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </>
  );
}
