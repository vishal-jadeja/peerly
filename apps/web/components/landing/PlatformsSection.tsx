function LiveBadge() {
  return (
    <span className="p-plat-live">
      <span className="p-pulse-dot" />
      LIVE
    </span>
  );
}

export default function PlatformsSection() {
  return (
    <section
      className="p-section p-section-dark p-platforms"
      id="platforms"
      style={{ minHeight: "auto" }}
    >
      <div className="p-platforms-head">
        <h3 className="p-platforms-h3 p-display">
          Three feeds. <em>One question.</em> Who&apos;s learning this right
          now?
        </h3>
        <p className="p-platforms-head-right">
          Searched in real-time. No stale data. We index as you query — your
          match list is never older than the request that made it.
        </p>
      </div>

      <div className="p-plat-grid">
        {/* Reddit */}
        <div className="p-plat-col">
          <div className="p-plat-name">
            <strong>REDDIT</strong>
            <LiveBadge />
          </div>
          <div className="p-post-card p-post-reddit">
            <div className="p-post-head">
              <div className="p-post-av" />
              <div className="p-post-meta">
                u/kavya_builds
                <small className="p-post-meta-small">
                  <span className="p-post-reddit-sub">
                    r/learnmachinelearning
                  </span>{" "}
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
              <span className="p-post-pct">match 0.92</span>
            </div>
          </div>
          <div className="p-plat-foot">
            <span>Searched in real-time</span>
            <span className="p-plat-foot-num">/01</span>
          </div>
        </div>

        {/* X */}
        <div className="p-plat-col">
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
              <span className="p-post-pct">match 0.88</span>
            </div>
          </div>
          <div className="p-plat-foot">
            <span>No stale data</span>
            <span className="p-plat-foot-num">/02</span>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="p-plat-col">
          <div className="p-plat-name">
            <strong>LINKEDIN</strong>
            <LiveBadge />
          </div>
          <div className="p-post-card p-post-linkedin">
            <div className="p-post-head">
              <div className="p-post-av" />
              <div className="p-post-meta">
                Priya Sharma
                <small className="p-post-meta-small">
                  Final Year CS · Pune · 5h
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
              <span className="p-post-pct">match 0.81</span>
            </div>
          </div>
          <div className="p-plat-foot">
            <span>Indexed at query time</span>
            <span className="p-plat-foot-num">/03</span>
          </div>
        </div>
      </div>
    </section>
  );
}
