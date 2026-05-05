"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const MARQUEE_ITEMS = [
  { text: "YOU FOUND THE THREAD", ghost: false },
  { dot: true },
  { text: "BUT NOT THE PERSON", ghost: true },
  { dot: true },
  { text: "WHO'S ACTUALLY LEARNING THIS", ghost: false },
  { dot: true },
  { text: "RIGHT NOW", ghost: true },
  { dot: true },
  { text: "LIKE YOU", ghost: false },
  { dot: true },
];

const PROBLEM_LINES = [
  <>Most people post about what they&apos;re learning</>,
  <>
    <span className="p-accent">once</span>, get no replies, and disappear.
  </>,
  <>Peerly catches them in that window.</>,
];

export default function ProblemSection() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const marqueeRef = useRef(null);
  const marqueeInView = useInView(marqueeRef, { once: true, margin: "-10% 0px" });

  return (
    <section className="p-section p-section-dark p-problem" id="problem">
      {/* Marquee strip — full width, outside container */}
      <motion.div
        ref={marqueeRef}
        className="p-marquee"
        initial={{ opacity: 0 }}
        animate={marqueeInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="p-mq-track">
          {items.map((item, i) =>
            "dot" in item ? (
              <span key={i} className="p-mq-dot" />
            ) : (
              <span key={i} className={item.ghost ? "p-mq-ghost" : undefined}>
                {item.text}
              </span>
            )
          )}
        </div>
      </motion.div>

      {/* Problem statement */}
      <div className="p-container">
        <div className="p-problem-grid">
          <motion.div
            className="p-ghost-num"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            01
          </motion.div>
          <div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15% 0px" }}
            >
              {PROBLEM_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  className="p-problem-text"
                  variants={fadeUp}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
            <motion.div
              className="p-problem-meta"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="p-problem-meta-num">/01</span>
              <span
                style={{
                  flexShrink: 0,
                  width: 56,
                  height: 1,
                  background: "var(--line)",
                  display: "block",
                }}
              />
              <span>The 48-hour window</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
