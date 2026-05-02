const TESTIMONIALS = [
  {
    name: "ARJUN M.",
    role: "Backend Engineer · Prep Mode",
    location: "/01 · Bangalore",
    via: "via Reddit match",
    quote: [
      "I found 3 people grinding LLD the same week as me. ",
      "We still do mock rounds.",
    ],
  },
  {
    name: "PRIYA S.",
    role: "Final Year · CS",
    location: "/02 · Pune",
    via: "via LinkedIn match",
    quote: ["Sent 4 messages. Got 2 replies. ", "One became my referral."],
  },
  {
    name: "NIKHIL R.",
    role: "Self-taught · Rust",
    location: "/03 · Remote",
    via: "via X match",
    quote: ["My DMs used to be void. ", "Now they’re a study group."],
  },
];

const GLASS_CARDS = [
  { label: "FIG.A · MATCH STATE", size: "1024×640", className: "" },
  { label: "FIG.B · DRAFT VIEW", size: "1024×640", className: "p-glass-card-b" },
  { label: "FIG.C · INBOX", size: "1024×640", className: "p-glass-card-c" },
];

export default function ProofSection() {
  return (
    <section className="p-section p-section-dark" id="proof">
      <div className="p-proof-glow-tr" />

      <div className="p-proof-head">
        <h2 className="p-proof-h2">
          Real people <em>actually</em> talking.
        </h2>
        <p className="p-proof-head-right">
          Peerly&apos;s beta started with 40 learners. They found each other
          across three platforms — and they kept the conversations going.
        </p>
      </div>

      <div className="p-proof-grid">
        {/* Testimonials */}
        <div>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="p-testimonial">
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
            </div>
          ))}
        </div>

        {/* Glass cards */}
        <div className="p-glass-stack">
          {GLASS_CARDS.map((card) => (
            <div
              key={card.label}
              className={`p-glass-card ${card.className}`}
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
            </div>
          ))}
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
        THREE PLATFORMS
      </div>
    </section>
  );
}
