"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

const HEADLINE_WORDS = ["Stop", "lurking."];
const HEADLINE_WORDS_2 = ["Start", "talking."];

// Fixed offsets — deterministic so SSR and client produce identical HTML (no hydration mismatch)
const WORD_Y_OFFSETS = [22, 18, 17, 21];

export default function CTASection() {
  const [joined, setJoined] = useState(false);
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setJoined(true);
  }

  return (
    <section className="p-section p-section-cream p-cta" id="cta">
      {/* Corner labels */}
      <span className="p-cta-corner p-cta-corner-tl p-mono">/04 · waitlist open</span>
      <span className="p-cta-corner p-cta-corner-tr p-mono">peerly · 2026</span>
      <span className="p-cta-corner p-cta-corner-bl p-mono">no spam · ever</span>
      <span className="p-cta-corner p-cta-corner-br p-mono">scroll up to revisit</span>

      {/* Crop marks */}
      <span className="p-cta-crop p-cta-crop-tl" />
      <span className="p-cta-crop p-cta-crop-tr" />
      <span className="p-cta-crop p-cta-crop-bl" />
      <span className="p-cta-crop p-cta-crop-br" />

      <div className="p-container">
        <motion.div
          className="p-cta-label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="p-cta-bar" />
          <span className="p-label">The point</span>
          <span className="p-cta-bar" />
        </motion.div>

        {/* Kinetic headline */}
        <motion.h2
          className="p-display p-cta-h2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ overflow: "visible" }}
          custom={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={word + i}
              style={{ display: "inline-block", marginRight: "0.18em" }}
              variants={{
                hidden: { opacity: 0, y: WORD_Y_OFFSETS[i] },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 200, damping: 22, delay: i * 0.1 },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
          <span className="p-cta-h2-lurk" style={{ display: "block" }}>
            {HEADLINE_WORDS_2.map((word, i) => (
              <motion.span
                key={word + i}
                style={{ display: "inline-block", marginRight: "0.18em" }}
                variants={{
                  hidden: { opacity: 0, y: WORD_Y_OFFSETS[HEADLINE_WORDS.length + i] },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 22,
                      delay: (HEADLINE_WORDS.length + i) * 0.1 + 0.1,
                    },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h2>

        <motion.p
          className="p-cta-sub"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Start a real conversation with someone who actually gets it.
        </motion.p>

        <motion.form
          className="p-cta-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="p-cta-input-wrap">
            <input
              className="p-cta-input"
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              disabled={joined}
            />
            <motion.div
              className="p-cta-input-line"
              initial={{ scaleX: 0 }}
              animate={focused ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <motion.button
            className="p-cta-btn"
            type="submit"
            disabled={joined}
            whileTap={{ scale: 0.96 }}
            animate={joined ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {joined ? (
              "YOU'RE IN ✓"
            ) : (
              <>
                JOIN WAITLIST <span className="p-cta-arr">→</span>
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.p
          className="p-cta-micro"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          No noise. Just the people worth talking to.{" "}
          <Link href="/dashboard" style={{ textDecoration: "underline", opacity: 0.6 }}>
            Try the search →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
