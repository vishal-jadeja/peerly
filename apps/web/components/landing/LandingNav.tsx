export default function LandingNav() {
  return (
    <nav className="p-nav">
      <div className="p-nav-logo">
        <span className="p-nav-dot" />
        PEERLY
      </div>
      <ul className="p-nav-links">
        <li>
          <a href="#hero">
            <span>01</span>INTRO
          </a>
        </li>
        <li>
          <a href="#process">
            <span>02</span>HOW IT WORKS
          </a>
        </li>
        <li>
          <a href="#proof">
            <span>03</span>WHO
          </a>
        </li>
        <li>
          <a href="#cta">
            <span>04</span>WAITLIST
          </a>
        </li>
      </ul>
    </nav>
  );
}
