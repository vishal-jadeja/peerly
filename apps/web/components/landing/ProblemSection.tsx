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

export default function ProblemSection() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="p-section p-section-dark p-problem" id="problem">
      {/* Marquee strip */}
      <div className="p-marquee">
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
      </div>

      {/* Problem statement */}
      <div className="p-problem-grid">
        <div className="p-ghost-num">01</div>
        <div>
          <p className="p-problem-text">
            Most people post about what they&apos;re learning{" "}
            <span className="p-accent">once</span>, get no replies, and
            disappear. Peerly catches them in that window — when they actually
            want someone to talk to.
          </p>
          <div className="p-problem-meta">
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
          </div>
        </div>
      </div>

      <div className="p-scroll-cue">
        <span className="p-scroll-ring">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 3l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </span>
        KEEP GOING
      </div>
    </section>
  );
}
