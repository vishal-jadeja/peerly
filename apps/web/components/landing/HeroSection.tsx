"use client";

import { motion } from "framer-motion";

const EXPO = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section className="p-section p-section-dark p-hero" id="hero">
      <div className="p-hero-grain" />
      <div className="p-hero-glow-bl" />

      <div className="p-container">
        {/* Two-column layout: left = text, right = card */}
        <div className="p-hero-layout">
          {/* LEFT: eyebrow + headline + tail */}
          <div className="p-hero-left">
            <motion.div
              className="p-hero-eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <span className="p-hero-eyebrow-bullet" />
              <span className="p-label">Find the person · not the post</span>
              <span className="p-hero-eyebrow-bar" />
              <span className="p-label p-mono" style={{ opacity: 0.6 }}>
                v0.1 · waitlist open
              </span>
            </motion.div>

            <h1 className="p-display p-hero-h1">
              <motion.span
                className="p-hero-l1"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.25, ease: EXPO }}
              >
                Find your
              </motion.span>
              <motion.span
                className="p-hero-l2"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.4, ease: EXPO }}
              >
                <b>peo</b>ple
              </motion.span>
            </h1>

            <motion.p
              className="p-hero-tail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.52, ease: "easeOut" }}
            >
              Before the thread goes cold. Peerly catches the humans behind the
              posts —{" "}
              <strong>the ones learning the same thing as you</strong>, in the
              last 48 hours.
            </motion.p>
          </div>

          {/* RIGHT: floating result card */}
          <div className="p-hero-right">
            <motion.div
              className="p-hero-card-wrap"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
            >
              <div className="p-frame p-hero-card-frame">
                <span className="p-tick p-tick-tl" />
                <span className="p-tick p-tick-tr" />
                <span className="p-tick p-tick-bl" />
                <span className="p-tick p-tick-br" />

                <div className="p-result-card">
                  <span className="p-result-stamp">Match · 0.92</span>
                  <div className="p-result-top">
                    <div className="p-result-av" />
                    <div>
                      <div className="p-result-who">@alex_builds</div>
                      <div className="p-result-src">
                        Reddit{" "}
                        <span>· r/learnmachinelearning · 2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="p-result-excerpt">
                    &ldquo;Day 4 of grokking transformer attention. Still
                    confused why the <mark>Q,K,V</mark> projections need
                    separate weight matrices — anyone else stuck here?&rdquo;
                  </p>
                  <div className="p-result-actions">
                    <div className="p-result-meta">
                      <span>
                        SIGNAL <span className="p-pct">82%</span>
                      </span>
                      <span>RECENT 2H</span>
                    </div>
                    <button className="p-btn-glow">
                      Copy message <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Corner chips — decorative, edge of section */}
      <motion.span
        className="p-hero-chip p-hero-chip-tl"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
      >
        <span className="p-hero-chip-line" />
        03 SOURCES
      </motion.span>
      <motion.span
        className="p-hero-chip p-hero-chip-br"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.95, ease: "easeOut" }}
      >
        REAL HUMANS · NO BOTS
        <span className="p-hero-chip-line" />
      </motion.span>

      {/* Scroll cue */}
      <motion.div
        className="p-scroll-cue"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
      >
        <span className="p-scroll-ring">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 3l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </span>
        SCROLL TO CONTINUE
      </motion.div>
    </section>
  );
}
