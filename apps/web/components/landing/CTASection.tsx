"use client";

import { useState } from "react";

export default function CTASection() {
  const [joined, setJoined] = useState(false);
  const [email, setEmail] = useState("");

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

      <div className="p-cta-label">
        <span className="p-cta-bar" />
        <span className="p-label">The point</span>
        <span className="p-cta-bar" />
      </div>

      <h2 className="p-display p-cta-h2">
        Stop lurking.
        <span className="p-cta-h2-lurk">Start talking.</span>
      </h2>

      <p className="p-cta-sub">
        Start a real conversation with someone who actually gets it.
      </p>

      <form className="p-cta-form" onSubmit={handleSubmit}>
        <input
          className="p-cta-input"
          type="email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={joined}
        />
        <button className="p-cta-btn" type="submit" disabled={joined}>
          {joined ? (
            "YOU'RE IN ✓"
          ) : (
            <>
              JOIN WAITLIST <span className="p-cta-arr">→</span>
            </>
          )}
        </button>
      </form>

      <p className="p-cta-micro">No noise. Just the people worth talking to.</p>
    </section>
  );
}
