/* ============================================================
   COURTIO CRM — vitrine : chrome partagé + interactions
   Injecte la nav et le footer, gère scroll-reveal, burger,
   nav scrolled, compteur bêta. Charge Lucide.
   Chaque page définit  window.PAGE = "accueil" | "fonctionnalites" | ...
   ============================================================ */
(function () {
  const P = window.PAGE || "";
  const NAV = [
    { href: "index.html", label: "Accueil", key: "accueil" },
    { href: "fonctionnalites.html", label: "Fonctionnalités", key: "fonctionnalites" },
    { href: "astro.html", label: "Astro", key: "astro" },
    { href: "tarifs.html", label: "Tarifs", key: "tarifs" },
    { href: "securite.html", label: "Sécurité", key: "securite" },
    { href: "a-propos.html", label: "À propos", key: "apropos" },
    { href: "contact.html", label: "Contact", key: "contact" },
  ];

  /* ---------- NAV ---------- */
  const header = document.createElement("header");
  header.className = "nav";
  header.innerHTML = `
    <div class="nav-stars" aria-hidden="true">
      <span class="star" style="top:22%;animation-duration:5.5s;animation-delay:0s"></span>
      <span class="star" style="top:58%;animation-duration:7s;animation-delay:2.4s"></span>
      <span class="star" style="top:40%;animation-duration:6.2s;animation-delay:4.1s"></span>
      <span class="star" style="top:74%;animation-duration:8s;animation-delay:5.8s"></span>
    </div>
    <div class="wrap nav-inner">
      <a href="index.html" aria-label="Courtio CRM — accueil">
        <img src="assets/logo-plain-light.svg" class="nav-logo light" alt="Courtio">
        <img src="assets/logo-plain.svg" class="nav-logo dark" alt="Courtio">
      </a>
      <nav>
        <ul class="nav-links">
          ${NAV.map(n => `<li><a href="${n.href}" ${n.key === P ? 'aria-current="page" style="color:var(--mint)"' : ""}>${n.label}</a></li>`).join("")}
        </ul>
      </nav>
      <div class="nav-cta">
        <a href="beta.html" class="btn btn-primary">Rejoindre la bêta</a>
        <button class="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>`;
  document.body.prepend(header);

  const burger = header.querySelector(".nav-burger");
  const links = header.querySelector(".nav-links");
  burger.addEventListener("click", () => links.classList.toggle("open"));

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- FOOTER ---------- */
  const footer = document.createElement("footer");
  footer.className = "footer navy-bg";
  footer.innerHTML = `
    <div class="orbs"><span class="orb a"></span><span class="orb c"></span></div>
    <div class="footer-stars" aria-hidden="true">
      <span class="fstar" style="top:16%;animation-duration:7s;animation-delay:0s"></span>
      <span class="fstar" style="top:44%;animation-duration:8.5s;animation-delay:2.6s"></span>
      <span class="fstar" style="top:30%;animation-duration:6.4s;animation-delay:4.4s"></span>
      <span class="fstar" style="top:70%;animation-duration:9s;animation-delay:6.2s"></span>
    </div>
    <div class="wrap footer-top">
      <div>
        <img src="assets/logo-plain-light.svg" class="footer-brand-logo" alt="Courtio">
        <p style="max-width:320px;line-height:1.6;margin:0 0 20px;color:rgba(255,255,255,.78)">La plateforme qui connecte les courtiers à tous leurs gestionnaires. Le courtage en plein envol.</p>
        <span class="pill pill-live"><span class="dot"></span>Bêta · octobre 2026</span>
      </div>
      <div>
        <h4>Produit</h4>
        <ul>
          <li><a href="fonctionnalites.html">Fonctionnalités</a></li>
          <li><a href="astro.html">Astro, l'IA</a></li>
          <li><a href="tarifs.html">Tarifs</a></li>
          <li><a href="beta.html">Rejoindre la bêta</a></li>
        </ul>
      </div>
      <div>
        <h4>Entreprise</h4>
        <ul>
          <li><a href="a-propos.html">À propos</a></li>
          <li><a href="securite.html">Sécurité & conformité</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:hello@courtio.fr">hello@courtio.fr</a></li>
          <li><a href="contact.html">Formulaire de contact</a></li>
        </ul>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <span>© 2026 Courtio — Le courtage en plein envol.</span>
      <span style="display:flex;gap:20px;flex-wrap:wrap">
        <a href="mentions-legales.html">Mentions légales</a>
        <a href="cgu.html">CGU</a>
        <a href="securite.html">RGPD</a>
      </span>
    </div>`;
  document.body.appendChild(footer);

  /* ---------- SCROLL REVEAL ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  const observeReveals = () => document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
  observeReveals();
  window.__observeReveals = observeReveals;

  /* ---------- LUCIDE ICONS ---------- */
  const s = document.createElement("script");
  s.src = "https://unpkg.com/lucide@latest";
  s.onload = () => window.lucide && window.lucide.createIcons();
  document.head.appendChild(s);
  window.__lucide = () => window.lucide && window.lucide.createIcons();
})();
