"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const TESTIMONIALS = [
  {
    name: "ALEX M.",
    role: "Backend Engineer · Prep Mode",
    location: "/01 · Berlin",
    via: "via Reddit match",
    quote: [
      "I found 3 people grinding LLD the same week as me. ",
      "We still do mock rounds.",
    ],
  },
  {
    name: "SARAH K.",
    role: "Final Year · CS",
    location: "/02 · London",
    via: "via LinkedIn match",
    quote: ["Sent 4 messages. Got 2 replies. ", "One became my referral."],
  },
  {
    name: "NOAH R.",
    role: "Self-taught · Rust",
    location: "/03 · Remote",
    via: "via X match",
    quote: ["My DMs used to be void. ", "Now they're a study group."],
  },
];

const GLASS_CARDS = [
  { label: "FIG.A · MATCH STATE", size: "1024×640", className: "" },
  { label: "FIG.B · DRAFT VIEW", size: "1024×640", className: "p-glass-card-b" },
  { label: "FIG.C · INBOX", size: "1024×640", className: "p-glass-card-c" },
];

function GlassCard({ card }: { card: (typeof GLASS_CARDS)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 12);
    rotateY.set(x * 12);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      className={`p-glass-card ${card.className}`}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={fadeUp}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      <div className="p-glass-blob" />
      <span className="p-tick p-tick-tl" />
      <span className="p-tick p-tick-tr" />
      <span className="p-tick p-tick-bl" />
      <span className="p-tick p-tick-br" />
      <div className="p-glass-meta-row">
        <span>{card.label}</span>
        <span>{card.size}</span>
      </div>
    </motion.div>
  );
}

export default function ProofSection() {
  return (
    <section className="p-section p-section-dark" id="proof">
      <div className="p-proof-glow-tr" />

      <div className="p-container">
        <motion.div
          className="p-proof-head"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="p-proof-h2">
            Real people <em>actually</em> talking.
          </h2>
          <p className="p-proof-head-right">
            Peerly&apos;s beta started with 40 learners. They found each other
            across three platforms — and they kept the conversations going.
          </p>
        </motion.div>

        <div className="p-proof-grid">
          {/* Testimonials */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} className="p-testimonial" variants={fadeUp}>
                <div className="p-testimonial-who-row">
                  <div className="p-testimonial-who">
                    {t.name}
                    <span className="p-testimonial-role">{t.role}</span>
                  </div>
                  <div className="p-testimonial-stars">★ ★ ★ ★ ★</div>
                </div>
                <blockquote>
                  &ldquo;{t.quote[0]}
                  <em>{t.quote[1]}</em>&rdquo;
                </blockquote>
                <div className="p-testimonial-cite">
                  <span>{t.location}</span>
                  <span>{t.via}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Glass cards with 3D tilt */}
          <motion.div
            className="p-glass-stack"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {GLASS_CARDS.map((card) => (
              <GlassCard key={card.label} card={card} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
