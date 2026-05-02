const STEPS = [
  {
    num: "/01",
    word: "Describe",
    sup: "01",
    desc: "Tell us what you're learning. Plain English. No keywords.",
    meta: "Input · 1 sentence",
  },
  {
    num: "/02",
    word: "Discover",
    sup: "02",
    desc: "We search Reddit, X, and LinkedIn for people who posted about it in the last 48 hours.",
    meta: "3 platforms · realtime",
  },
  {
    num: "/03",
    word: "Connect",
    sup: "03",
    desc: "Get a personalized message drafted. Copy. Send. Done.",
    meta: "No templates · context-aware",
  },
];

export default function ProcessSection() {
  return (
    <section className="p-section p-section-cream" id="process">
      <div className="p-process-top">
        <span className="p-label">/02 · The process</span>
        <p className="p-process-top-right">
          Three steps. No keyword fields. No filters. The intent is in your
          sentence — Peerly does the rest.
        </p>
      </div>

      <div className="p-process-stack">
        {STEPS.map((step) => (
          <div key={step.num} className="p-process-row">
            <div className="p-process-sup">{step.num}</div>
            <div className="p-process-word">
              {step.word}
              <sup className="p-process-sup-num">{step.sup}</sup>.
            </div>
            <div className="p-process-desc">
              {step.desc}
              <span className="p-process-desc-meta">{step.meta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-scroll-cue" style={{ color: "rgba(10,10,11,.55)" }}>
        <span className="p-scroll-ring">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 3l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </span>
        THE PEOPLE NEXT
      </div>
    </section>
  );
}
