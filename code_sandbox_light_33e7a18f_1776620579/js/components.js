/* ============================================================
   SPARKLING FACILITY SOLUTIONS — Shared Components
   Injects Nav + Footer + AI Widget into every page
   ============================================================ */

const NAV_HTML = `
<nav class="nav" id="main-nav" role="navigation" aria-label="Main navigation">
  <div class="nav__inner">
    <a href="index.html" class="nav__logo" aria-label="Sparkling Facility Solutions Home">
      <div class="nav__logo-icon" aria-hidden="true">✦</div>
      <div class="nav__logo-text">
        <span class="nav__logo-name">Sparkling Facility Solutions</span>
        <span class="nav__logo-tag">Commercial Cleaning · Florida</span>
      </div>
    </a>

    <div class="nav__links" role="menubar">
      <a href="index.html" class="nav__link" role="menuitem">Home</a>

      <div class="nav__dropdown" role="menuitem">
        <a href="services.html" class="nav__link" aria-haspopup="true" aria-expanded="false">Services ▾</a>
        <div class="nav__dropdown-menu" role="menu" aria-label="Services submenu">
          <a href="services.html#post-construction" class="nav__dropdown-item" role="menuitem">Post-Construction Cleaning</a>
          <a href="services.html#janitorial" class="nav__dropdown-item" role="menuitem">Facility Janitorial</a>
          <a href="services.html#turnover" class="nav__dropdown-item" role="menuitem">Turnover Cleaning</a>
          <a href="services.html#floor-care" class="nav__dropdown-item" role="menuitem">Floor Care & Polishing</a>
          <a href="services.html#day-porter" class="nav__dropdown-item" role="menuitem">Day Porter Services</a>
          <a href="services.html#pressure-washing" class="nav__dropdown-item" role="menuitem">Pressure Washing</a>
          <a href="services.html#specialty" class="nav__dropdown-item" role="menuitem">Specialty Cleaning</a>
        </div>
      </div>

      <div class="nav__dropdown" role="menuitem">
        <a href="industries.html" class="nav__link" aria-haspopup="true">Industries ▾</a>
        <div class="nav__dropdown-menu" role="menu" aria-label="Industries submenu">
          <a href="industries.html#contractors" class="nav__dropdown-item" role="menuitem">General Contractors</a>
          <a href="industries.html#property-managers" class="nav__dropdown-item" role="menuitem">Property Managers</a>
          <a href="industries.html#offices" class="nav__dropdown-item" role="menuitem">Office & Corporate</a>
          <a href="industries.html#medical" class="nav__dropdown-item" role="menuitem">Medical & Healthcare</a>
          <a href="industries.html#retail" class="nav__dropdown-item" role="menuitem">Retail & Mixed-Use</a>
          <a href="industries.html#industrial" class="nav__dropdown-item" role="menuitem">Industrial & Warehouse</a>
        </div>
      </div>

      <a href="areas.html" class="nav__link" role="menuitem">Service Areas</a>
      <a href="about.html" class="nav__link" role="menuitem">About</a>
      <a href="contact.html" class="nav__link" role="menuitem">Contact</a>
    </div>

    <div class="nav__cta">
      <a href="tel:3054346070" class="btn btn--ghost btn--sm">
        <i class="fa-solid fa-phone" aria-hidden="true"></i>
        (305) 434-6070
      </a>
      <a href="quote.html" class="btn btn--primary btn--sm">
        Get a Free Quote
        <i class="fa-solid fa-arrow-right btn-icon" aria-hidden="true"></i>
      </a>
    </div>

    <button class="nav__hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-nav">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<nav class="nav__mobile" id="mobile-nav" aria-label="Mobile navigation">
  <a href="index.html" class="nav__mobile-link">Home</a>
  <a href="services.html" class="nav__mobile-link">Services</a>
  <a href="industries.html" class="nav__mobile-link">Industries</a>
  <a href="areas.html" class="nav__mobile-link">Service Areas</a>
  <a href="about.html" class="nav__mobile-link">About</a>
  <a href="contact.html" class="nav__mobile-link">Contact</a>
  <a href="quote.html" class="btn btn--primary" style="margin-top:0.5rem;justify-content:center;">Get a Free Quote</a>
  <a href="tel:3054346070" class="btn btn--ghost" style="justify-content:center;">
    <i class="fa-solid fa-phone" aria-hidden="true"></i> (305) 434-6070
  </a>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <div class="flex items-center gap-sm mb-md">
          <div class="nav__logo-icon" aria-hidden="true">✦</div>
          <span class="footer__brand-name">Sparkling Facility Solutions</span>
        </div>
        <p class="footer__brand-desc">
          Florida's premier commercial cleaning partner for post-construction, facility maintenance, 
          and janitorial programs. Serving contractors, property managers, and corporate facilities statewide.
        </p>
        <div class="footer__contact-info">
          <div class="footer__contact-item">
            <i class="fa-solid fa-phone" aria-hidden="true"></i>
            <a href="tel:3054346070">(305) 434-6070</a>
          </div>
          <div class="footer__contact-item">
            <i class="fa-solid fa-envelope" aria-hidden="true"></i>
            <a href="mailto:info@sparklingfacilitysolutions.com">info@sparklingfacilitysolutions.com</a>
          </div>
          <div class="footer__contact-item">
            <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
            <span>Key West, FL — Serving All Florida</span>
          </div>
        </div>
      </div>

      <div class="footer__col">
        <h3 class="footer__col-title">Services</h3>
        <nav class="footer__links" aria-label="Services links">
          <a href="services.html#post-construction" class="footer__link">Post-Construction Cleaning</a>
          <a href="services.html#janitorial" class="footer__link">Facility Janitorial</a>
          <a href="services.html#turnover" class="footer__link">Turnover Cleaning</a>
          <a href="services.html#floor-care" class="footer__link">Floor Care & Polishing</a>
          <a href="services.html#day-porter" class="footer__link">Day Porter Services</a>
          <a href="services.html#pressure-washing" class="footer__link">Pressure Washing</a>
          <a href="services.html#specialty" class="footer__link">Specialty Services</a>
        </nav>
      </div>

      <div class="footer__col">
        <h3 class="footer__col-title">Company</h3>
        <nav class="footer__links" aria-label="Company links">
          <a href="about.html" class="footer__link">About Us</a>
          <a href="industries.html" class="footer__link">Industries Served</a>
          <a href="areas.html" class="footer__link">Service Areas</a>
          <a href="quote.html" class="footer__link">Request a Quote</a>
          <a href="contact.html" class="footer__link">Contact Us</a>
        </nav>
      </div>

      <div class="footer__col">
        <h3 class="footer__col-title">Credentials</h3>
        <div class="footer__certifications" aria-label="Certifications and credentials">
          <div class="footer__cert">
            <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
            Licensed & Fully Insured
          </div>
          <div class="footer__cert">
            <i class="fa-solid fa-hard-hat" aria-hidden="true"></i>
            OSHA Safety Trained
          </div>
          <div class="footer__cert">
            <i class="fa-solid fa-users-gear" aria-hidden="true"></i>
            Background-Checked Crews
          </div>
          <div class="footer__cert">
            <i class="fa-solid fa-file-contract" aria-hidden="true"></i>
            Workers' Comp Covered
          </div>
          <div class="footer__cert">
            <i class="fa-solid fa-star" aria-hidden="true"></i>
            Satisfaction Guaranteed
          </div>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <p class="footer__copyright">
        © 2025 Sparkling Facility Solutions LLC. All rights reserved. | Florida Commercial Cleaning Specialists
      </p>
      <div class="footer__legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
`;

const AI_WIDGET_HTML = `
<div class="ai-intake" role="complementary" aria-label="AI Quote Assistant">
  <button class="ai-intake__toggle" id="ai-toggle" aria-label="Open AI quote assistant" aria-expanded="false">
    <i class="fa-solid fa-robot" aria-hidden="true"></i>
  </button>

  <div class="ai-intake__panel glass-card" id="ai-panel" role="dialog" aria-modal="true" aria-label="SPARK AI Assistant">
    <div class="ai-intake__header">
      <div class="ai-intake__avatar" aria-hidden="true">⚡</div>
      <div>
        <div class="ai-intake__header-title">SPARK AI Assistant</div>
        <div class="ai-intake__header-sub">Sparkling Facility Solutions</div>
      </div>
      <div class="ai-intake__status" aria-live="polite">
        <span class="ai-intake__status-dot" aria-hidden="true"></span>
        Online
      </div>
    </div>

    <div class="ai-intake__messages" id="ai-messages" role="log" aria-live="polite" aria-label="Chat messages"></div>
    <div class="ai-intake__options" id="ai-options" role="group" aria-label="Quick reply options"></div>

    <div class="ai-intake__input-row">
      <label for="ai-input" class="sr-only">Type your message</label>
      <input
        type="text"
        class="ai-intake__input"
        id="ai-input"
        placeholder="Type a message..."
        autocomplete="off"
        aria-label="Chat input"
      />
      <button class="ai-intake__send" id="ai-send" aria-label="Send message">
        <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
`;

// ── Inject Components ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Nav
  const navContainer = document.getElementById('nav-placeholder');
  if (navContainer) navContainer.innerHTML = NAV_HTML;

  // Footer
  const footerContainer = document.getElementById('footer-placeholder');
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

  // AI Widget
  const aiContainer = document.getElementById('ai-widget-placeholder');
  if (aiContainer) aiContainer.innerHTML = AI_WIDGET_HTML;
});
