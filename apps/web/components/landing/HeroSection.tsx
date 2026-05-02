export default function HeroSection() {
  return (
    <section className="p-section p-section-dark p-hero" id="hero">
      <div className="p-hero-grain" />
      <div className="p-hero-glow-bl" />

      {/* Eyebrow */}
      <div className="p-hero-eyebrow">
        <span className="p-hero-eyebrow-bullet" />
        <span className="p-label">Find the person · not the post</span>
        <span className="p-hero-eyebrow-bar" />
        <span className="p-label p-mono" style={{ opacity: 0.6 }}>
          v0.1 · waitlist open
        </span>
      </div>

      {/* Headline */}
      <h1 className="p-display p-hero-h1">
        <span className="p-hero-l1">Find your</span>
        <span className="p-hero-l2">
          <b>peo</b>ple
        </span>
      </h1>

      <p className="p-hero-tail">
        Before the thread goes cold. Peerly catches the humans behind the
        posts —{" "}
        <strong>the ones learning the same thing as you</strong>, in the last
        48 hours.
      </p>

      {/* Floating result card */}
      <div className="p-hero-card-wrap">
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
                <div className="p-result-who">@kavya_builds</div>
                <div className="p-result-src">
                  Reddit{" "}
                  <span>· r/learnmachinelearning · 2 hours ago</span>
                </div>
              </div>
            </div>
            <p className="p-result-excerpt">
              &ldquo;Day 4 of grokking transformer attention. Still confused
              why the <mark>Q,K,V</mark> projections need separate weight
              matrices — anyone else stuck here?&rdquo;
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
      </div>

      {/* Corner chips */}
      <span className="p-hero-chip p-hero-chip-tl">
        <span className="p-hero-chip-line" />
        03 SOURCES
      </span>
      <span className="p-hero-chip p-hero-chip-br">
        REAL HUMANS · NO BOTS
        <span className="p-hero-chip-line" />
      </span>

      {/* Scroll cue */}
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
        SCROLL TO CONTINUE
      </div>
    </section>
  );
}
