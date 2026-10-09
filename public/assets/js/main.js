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
  setupContactLinks(); setupAvailability(); setupMenu(); setupForm();
}());
