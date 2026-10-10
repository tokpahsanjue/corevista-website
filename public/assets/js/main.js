(function () {
  "use strict";
  var config = window.COREVISTA_CONFIG || {};
  var contact = config.contact || {};
  function setText(selector, value) { document.querySelectorAll(selector).forEach(function (element) { element.textContent = value; }); }
  function setupContactLinks() {
    document.querySelectorAll("[data-contact]").forEach(function (link) {
      var type = link.getAttribute("data-contact"), value = contact[type];
      if (!value) { link.hidden = true; return; }
      link.hidden = false;
      link.href = type === "email" ? "mailto:" + value : type === "whatsapp" ? "https://wa.me/" + value.replace(/[^0-9]/g, "") : "tel:" + value.replace(/[^0-9+]/g, "");
      if (type === "whatsapp") link.target = "_blank";
      link.textContent = value;
    });
    var available = Object.keys(contact).some(function (key) { return contact[key]; });
    document.querySelectorAll("[data-contact-action]").forEach(function (element) { element.hidden = !available; });
  }
  function setupAvailability() {
    document.querySelectorAll("[data-service-status]").forEach(function (element) { element.textContent = (config.futureServices && config.futureServices[element.getAttribute("data-service-status")]) || "Planned"; });
  }
  function setupSocialLinks() {
    document.querySelectorAll("[data-social]").forEach(function (link) {
      var value = config.social && config.social[link.getAttribute("data-social")];
      if (!value) { link.hidden = true; return; }
      link.hidden = false; link.href = value; link.target = "_blank"; link.rel = "noopener noreferrer";
    });
  }
  function setupPageStyles() {
    if (document.querySelector("#corevista-page-styles")) return;
    var style = document.createElement("style");
    style.id = "corevista-page-styles";
    style.textContent = ".service-icon{display:grid;place-items:center;width:58px;height:58px;margin-bottom:1rem;border:1px solid #a8dcf3;border-radius:12px;background:#e8faff;color:#0876e8;font-size:1.55rem;font-weight:850;line-height:1}.future-card{transition:transform .22s ease,box-shadow .22s ease}.future-card:hover{transform:translateY(-5px);box-shadow:0 14px 32px rgba(8,47,91,.12)}.contact-panel form{display:grid;gap:.5rem;margin-top:1.25rem}.contact-panel label{color:#d3e4f6;font-size:.85rem;font-weight:700}.contact-panel input,.contact-panel textarea{width:100%;padding:.7rem;border:1px solid #6d8aa8;border-radius:5px;background:#102a49;color:#fff;font:inherit;resize:vertical}.contact-panel form .button{margin-top:.4rem;border-color:#08bde7;background:#08bde7;color:#071a36}.form-status{margin:.25rem 0 0!important;color:#b9d4e8!important;font-size:.82rem}.founder-portrait{margin:0 0 1.5rem;padding:.75rem;border:1px solid #cde8f7;border-radius:10px;background:#f3faff;box-shadow:0 14px 34px rgba(8,47,91,.1)}.founder-portrait img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:6px}.founder-portrait figcaption{display:grid;gap:.15rem;padding:.75rem .25rem .1rem;color:#12233d}.founder-portrait figcaption strong{font-size:1.1rem}.founder-portrait figcaption span{color:#5e6f86;font-size:.9rem}.software-install{margin-top:2.5rem;padding:1.5rem;border:1px solid #b9dff0;border-radius:10px;background:#f3faff}.software-install h2{font-size:1.8rem}.software-install p{max-width:680px;color:#5e6f86}.software-collage{display:grid;grid-template-columns:repeat(2,1fr);gap:.75rem;margin-top:1.25rem}.software-tile{display:flex;align-items:center;justify-content:flex-start;gap:.65rem;min-height:82px;padding:.75rem;border-radius:8px;background:#071a36;color:#fff;text-align:left;font-weight:800;box-shadow:0 8px 20px rgba(8,47,91,.1);transition:transform .2s ease,background .2s ease}.software-icon{display:grid;place-items:center;flex:0 0 38px;width:38px;height:38px;border:1px solid rgba(255,255,255,.55);border-radius:8px;background:rgba(255,255,255,.15);font-size:.72rem;letter-spacing:.02em}.software-logo{display:block;flex:0 0 38px;width:38px;height:38px;padding:8px;border:1px solid rgba(255,255,255,.55);border-radius:8px;background:rgba(255,255,255,.15)}.software-tile>span:last-child{min-width:0;overflow-wrap:anywhere}.software-tile:nth-child(2n){background:#0876e8}.software-tile:nth-child(3n){background:#08a8c8}.software-tile:hover{transform:translateY(-4px)}@media (min-width:700px){.software-collage{grid-template-columns:repeat(3,1fr)}}.reveal{opacity:0;transform:translateY(22px);transition:opacity .65s ease,transform .65s ease}.reveal.is-visible{opacity:1;transform:none}@media (prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}.software-tile{transition:none}}";
    document.head.appendChild(style);
  }
  function setupFounderPortrait() {
    var layout = document.querySelector(".about-layout"), firstColumn = layout && layout.firstElementChild;
    if (!firstColumn || document.querySelector(".founder-portrait")) return;
    var figure = document.createElement("figure");
    figure.className = "founder-portrait";
    figure.innerHTML = '<img src="assets/images/Tokpah V. Sanjue_passport-headshot.png" alt="Tokpah V. Sanjue, Founder and CEO of CoreVista Technologies"><figcaption><strong>Tokpah V. Sanjue</strong><span>Founder/CEO</span></figcaption>';
    firstColumn.insertBefore(figure, firstColumn.firstElementChild);
    var intro = document.createElement("p");
    intro.className = "founder-intro";
    intro.textContent = "Tokpah V. Sanjue is the Founder/CEO of CoreVista Technologies. He brings experience in IT support, network troubleshooting, computer maintenance, WordPress, digital data collection and staff training to the planned business in Monrovia.";
    figure.insertAdjacentElement("afterend", intro);
  }
  function setupSoftwareCollage() {
    var grid = document.querySelector(".service-grid"), container = grid && grid.parentElement;
    if (!grid || !container || document.querySelector(".software-install")) return;
    var section = document.createElement("section");
    section.className = "software-install reveal";
    section.innerHTML = '<h2>Software installation</h2><p>We provide any software our clients need, subject to device compatibility and valid licensing. Common software suites and tools include:</p><div class="software-collage"><div class="software-tile"><span class="software-icon" aria-hidden="true">MS</span><span>Microsoft 365</span></div><div class="software-tile"><span class="software-icon" aria-hidden="true">GW</span><span>Google Workspace</span></div><div class="software-tile"><span class="software-icon" aria-hidden="true">AC</span><span>Adobe Creative Cloud</span></div><div class="software-tile"><span class="software-icon" aria-hidden="true">AD</span><span>Autodesk</span></div><div class="software-tile"><span class="software-icon" aria-hidden="true">CD</span><span>CorelDRAW Suite</span></div><div class="software-tile"><span class="software-icon" aria-hidden="true">LO</span><span>LibreOffice</span></div><div class="software-tile"><span class="software-icon" aria-hidden="true">CA</span><span>Canva</span></div><div class="software-tile"><span class="software-icon" aria-hidden="true">ZW</span><span>Zoom Workplace</span></div><div class="software-tile"><span class="software-icon" aria-hidden="true">JB</span><span>JetBrains Toolbox</span></div><div class="software-tile"><span class="software-icon" aria-hidden="true">VS</span><span>Visual Studio Code</span></div></div>';
    grid.insertAdjacentElement("afterend", section);
    if (window.IntersectionObserver) { new IntersectionObserver(function (entries, observer) { if (entries[0].isIntersecting) { section.classList.add("is-visible"); observer.disconnect(); } }, { threshold: 0.12 }).observe(section); } else section.classList.add("is-visible");
  }
  function setupReveal() {
    var targets = document.querySelectorAll("main section, .service-card, .future-card, .faq-item, .step, .note, .contact-panel, .founder-portrait");
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) { targets.forEach(function (element) { element.classList.add("is-visible"); }); return; }
    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    targets.forEach(function (element) { element.classList.add("reveal"); observer.observe(element); });
  }
  function setupForm() {
    var form = document.querySelector("#contact-form"), status = document.querySelector("#form-status");
    if (!form || !status) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!contact.email) { status.textContent = "Email contact is not configured yet."; return; }
      var data = new FormData(form), subject = encodeURIComponent("CoreVista Technologies enquiry"), body = encodeURIComponent("Name: " + data.get("name") + "\nEmail: " + data.get("email") + "\n\n" + data.get("message"));
      window.location.href = "mailto:" + contact.email + "?subject=" + subject + "&body=" + body;
    });
  }
  function setupMenu() {
    var button = document.querySelector("[data-menu-toggle]"), menu = document.querySelector("[data-menu]");
    if (!button || !menu) return;
    button.addEventListener("click", function () { var open = menu.classList.toggle("is-open"); button.setAttribute("aria-expanded", String(open)); });
    menu.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", function () { menu.classList.remove("is-open"); button.setAttribute("aria-expanded", "false"); }); });
  }
  setText("[data-business-name]", config.businessName); setText("[data-tagline]", config.tagline); setText("[data-location]", config.location); setText("[data-launch-status]", config.launchStatus);
  setupContactLinks(); setupAvailability(); setupSocialLinks(); setupPageStyles(); setupFounderPortrait(); setupSoftwareCollage(); setupReveal(); setupMenu(); setupForm();
}());
