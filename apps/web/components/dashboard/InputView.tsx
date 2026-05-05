"use client";

import { useSearchContext } from "@/contexts/SearchContext";

export function InputView() {
  const { goal, setGoal, submit } = useSearchContext();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit();
  }

  return (
    <div className="d-input-view">
      <p className="d-input-eyebrow">/ PEERLY RESEARCH TERMINAL</p>
      <h1 className="d-input-heading">WHO&apos;S LEARNING THIS<br />RIGHT NOW?</h1>
      <p className="d-input-sub">
        Describe what you&apos;re learning or building — we&apos;ll find people posting
        about it right now across Reddit, X, and LinkedIn.
      </p>
      <form className="d-input-wrap" onSubmit={handleSubmit}>
        <input
          className="d-input-field"
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. transformer attention mechanisms, Rust borrow checker..."
          autoFocus
        />
        <button
          className="d-input-submit"
          type="submit"
          disabled={!goal.trim()}
        >
          SEARCH ↗
        </button>
      </form>
      <p className="d-input-hint">
        Searched in real-time · No stale data · Three platforms at once
      </p>
    </div>
  );
}
