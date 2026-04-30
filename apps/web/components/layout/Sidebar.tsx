// Left sidebar — search history list and platform filter toggles
"use client";

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-border p-4 space-y-6">
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          History
        </h2>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li className="italic">No recent searches</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Platforms
        </h2>
        <div className="space-y-2 text-sm">
          {(["Reddit", "X", "LinkedIn"] as const).map((label) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-primary" />
              {label}
            </label>
          ))}
        </div>
      </section>
    </aside>
  );
}
