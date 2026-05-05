"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { slideLeft, wipeReveal, fadeUp } from "@/lib/animations";

const STEPS = [
  {
    num: "/01",
    numVal: 1,
    word: "Describe",
    sup: "01",
    desc: "Tell us what you're learning. Plain English. No keywords.",
    meta: "Input · 1 sentence",
  },
  {
    num: "/02",
    numVal: 2,
    word: "Discover",
    sup: "02",
    desc: "Reddit, X, and LinkedIn — people who posted in the last 48 hours.",
    meta: "3 platforms · realtime",
  },
  {
    num: "/03",
    numVal: 3,
    word: "Connect",
    sup: "03",
    desc: "A personalized message drafted for you. Copy. Send. Done.",
    meta: "No templates · context-aware",
  },
];

function AnimatedStepNum({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setDisplay(current);
      if (current >= value) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <>{`/${String(display).padStart(2, "0")}`}</>;
}

function ProcessRow({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={rowRef}
      className="p-process-row"
      custom={index}
      variants={slideLeft}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="p-process-sup">
        <AnimatedStepNum value={step.numVal} inView={inView} />
      </div>
      <motion.div
        className="p-process-word"
        custom={index * 0.15 + 0.2}
        variants={wipeReveal}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {step.word}
        <sup className="p-process-sup-num">{step.sup}</sup>.
      </motion.div>
      <div className="p-process-desc">
        {step.desc}
        <span className="p-process-desc-meta">{step.meta}</span>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section className="p-section p-section-cream" id="process">
      <div className="p-container">
        <motion.div
          className="p-process-top"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="p-label">/02 · The process</span>
          <p className="p-process-top-right">
            Three steps. No keyword fields. No filters. The intent is in your
            sentence — Peerly does the rest.
          </p>
        </motion.div>

        <div className="p-process-stack">
          {STEPS.map((step, index) => (
            <ProcessRow key={step.num} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
