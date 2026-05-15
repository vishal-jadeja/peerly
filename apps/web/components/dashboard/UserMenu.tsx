"use client";

import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export function UserMenu() {
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (isLoading || !isLoggedIn || !user) return null;

  const displayName = (() => {
    const name = user.name ?? user.email?.split("@")[0] ?? "";
    return name.length > 14 ? name.slice(0, 14) + "…" : name;
  })();

  const initial = (user.name ?? user.email ?? "?")[0].toUpperCase();

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Chip trigger */}
      <button
        className={`d-user-chip${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name ?? ""}
            className="d-user-chip-avatar d-user-chip-avatar-img"
          />
        ) : (
          <span className="d-user-chip-avatar">{initial}</span>
        )}
        <span className="d-user-chip-name">{displayName}</span>
        <span className={`d-user-chip-caret${open ? " open" : ""}`}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="d-user-menu" role="menu">
          <span className="d-user-menu-crop d-user-menu-crop-tl" />
          <span className="d-user-menu-crop d-user-menu-crop-tr" />
          <span className="d-user-menu-crop d-user-menu-crop-bl" />
          <span className="d-user-menu-crop d-user-menu-crop-br" />

          <div className="d-user-menu-header">
            <span className="d-user-menu-name">{user.name ?? displayName}</span>
            {user.email && (
              <span className="d-user-menu-email">{user.email}</span>
            )}
          </div>

          <div className="d-user-menu-divider" />

          <button
            className="d-user-menu-signout"
            onClick={logout}
            role="menuitem"
          >
            SIGN OUT <span className="d-menu-arr">↗</span>
          </button>
        </div>
      )}
    </div>
  );
}
