"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue } from "framer-motion";
import { fanLeft, fanBottom, fanRight, fadeUp } from "@/lib/animations";

function LiveBadge() {
  return (
    <span className="p-plat-live">
      <span className="p-pulse-dot" />
      LIVE
    </span>
  );
}

function AnimatedScore({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const steps = 30;
    const increment = value / steps;
    const timer = setInterval(() => {
      current = Math.min(current + increment, value);
      setDisplay(Math.round(current * 100) / 100);
      if (current >= value) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span className="p-post-pct">match {display.toFixed(2)}</span>;
}

function PlatColumn({
  children,
  fanVariant,
  score,
}: {
  children: React.ReactNode;
  fanVariant: typeof fanLeft;
  score: number;
}) {
  const colRef = useRef<HTMLDivElement>(null);
  const inView = useInView(colRef, { once: true, margin: "-5% 0px" });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = colRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 8);
    rotateY.set(x * 8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={colRef}
      className="p-plat-col"
      variants={fanVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      {/* inject score counter and pass inView as context via data attribute trick */}
      {/* children rendered below, score counter injected via wrapper */}
      <div data-inview={inView ? "1" : "0"} style={{ display: "contents" }}>
        {children}
      </div>
      {/* Hidden score value used by parent via render prop pattern */}
      <span style={{ display: "none" }} data-score={score} />
    </motion.div>
  );
}

export default function PlatformsSection() {
  const redditRef = useRef(null);
  const xRef = useRef(null);
  const linkedinRef = useRef(null);
  const redditInView = useInView(redditRef, { once: true });
  const xInView = useInView(xRef, { once: true });
  const linkedinInView = useInView(linkedinRef, { once: true });

  const rotateXR = useMotionValue(0);
  const rotateYR = useMotionValue(0);
  const rotateXX = useMotionValue(0);
  const rotateYX = useMotionValue(0);
  const rotateXL = useMotionValue(0);
  const rotateYL = useMotionValue(0);

  function makeTilt(
    ref: React.RefObject<HTMLDivElement | null>,
    rX: ReturnType<typeof useMotionValue<number>>,
    rY: ReturnType<typeof useMotionValue<number>>
  ) {
    return {
      onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        rX.set(-y * 8);
        rY.set(x * 8);
      },
      onMouseLeave: () => {
        rX.set(0);
        rY.set(0);
      },
    };
  }

  return (
    <section
      className="p-section p-section-dark p-platforms"
      id="platforms"
      style={{ minHeight: "auto" }}
    >
      {/* Header — constrained */}
      <div className="p-container">
        <motion.div
          className="p-platforms-head"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="p-platforms-h3 p-display">
            Three feeds. <em>One question.</em> Who&apos;s learning this right
            now?
          </h3>
          <p className="p-platforms-head-right">
            Searched in real-time. No stale data. We index as you query — your
            match list is never older than the request that made it.
          </p>
        </motion.div>
      </div>

      {/* Grid — full width */}
      <div className="p-plat-grid">
        {/* Reddit */}
        <motion.div
          ref={redditRef}
          className="p-plat-col"
          variants={fanLeft}
          initial="hidden"
          animate={redditInView ? "visible" : "hidden"}
          style={{ rotateX: rotateXR, rotateY: rotateYR, transformPerspective: 900 }}
          {...makeTilt(redditRef, rotateXR, rotateYR)}
        >
          <div className="p-plat-name">
            <strong>REDDIT</strong>
            <LiveBadge />
          </div>
          <div className="p-post-card p-post-reddit">
            <div className="p-post-head">
              <div className="p-post-av" />
              <div className="p-post-meta">
                u/alex_builds
                <small className="p-post-meta-small">
                  <span className="p-post-reddit-sub">r/learnmachinelearning</span>{" "}
                  · 2h
                </small>
              </div>
            </div>
            <div className="p-post-body">
              &ldquo;Day 4 of grokking transformer attention. Why do{" "}
              <mark>Q,K,V</mark> need separate weight matrices — anyone else
              stuck here?&rdquo;
            </div>
            <div className="p-post-foot">
              <span>↑ 24</span>
              <span>↳ 7</span>
              <AnimatedScore value={0.92} inView={redditInView} />
            </div>
          </div>
          <div className="p-plat-foot">
            <span>Searched in real-time</span>
            <span className="p-plat-foot-num">/01</span>
          </div>
        </motion.div>

        {/* X */}
        <motion.div
          ref={xRef}
          className="p-plat-col"
          variants={fanBottom}
          initial="hidden"
          animate={xInView ? "visible" : "hidden"}
          style={{ rotateX: rotateXX, rotateY: rotateYX, transformPerspective: 900 }}
          {...makeTilt(xRef, rotateXX, rotateYX)}
        >
          <div className="p-plat-name">
            <strong>X</strong>
            <LiveBadge />
          </div>
          <div className="p-post-card p-post-x">
            <div className="p-post-head">
              <div className="p-post-av" />
              <div className="p-post-meta">
                Marc — building
                <small className="p-post-meta-small p-post-x-handle">
                  @marcbuilds · 41m
                </small>
              </div>
            </div>
            <div className="p-post-body">
              shipped a tiny rust crate today.{" "}
              <mark>borrow checker</mark> finally clicked when i stopped
              fighting it. anyone else hitting that wall this week?
            </div>
            <div className="p-post-foot">
              <span>♡ 18</span>
              <span>↻ 3</span>
              <AnimatedScore value={0.88} inView={xInView} />
            </div>
          </div>
          <div className="p-plat-foot">
            <span>No stale data</span>
            <span className="p-plat-foot-num">/02</span>
          </div>
        </motion.div>

        {/* LinkedIn */}
        <motion.div
          ref={linkedinRef}
          className="p-plat-col"
          variants={fanRight}
          initial="hidden"
          animate={linkedinInView ? "visible" : "hidden"}
          style={{ rotateX: rotateXL, rotateY: rotateYL, transformPerspective: 900 }}
          {...makeTilt(linkedinRef, rotateXL, rotateYL)}
        >
          <div className="p-plat-name">
            <strong>LINKEDIN</strong>
            <LiveBadge />
          </div>
          <div className="p-post-card p-post-linkedin">
            <div className="p-post-head">
              <div className="p-post-av" />
              <div className="p-post-meta">
                Sarah Chen
                <small className="p-post-meta-small">
                  Final Year CS · Austin · 5h
                </small>
              </div>
            </div>
            <div className="p-post-body">
              Spent the weekend on{" "}
              <mark>system design fundamentals</mark>. The trade-off between
              consistency and availability finally makes sense in real systems.
              <div className="p-post-linkedin-badge">Open to chat</div>
            </div>
            <div className="p-post-foot">
              <span>👍 42</span>
              <span>💬 9</span>
              <AnimatedScore value={0.81} inView={linkedinInView} />
            </div>
          </div>
          <div className="p-plat-foot">
            <span>Indexed at query time</span>
            <span className="p-plat-foot-num">/03</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
