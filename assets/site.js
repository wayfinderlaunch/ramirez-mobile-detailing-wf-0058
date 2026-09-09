/* Ramirez Mobile Detailing demo — Wayfinder Launch
   Temporary demo tracking. Remove the GA block in index.html and this event
   instrumentation before final customer handoff.
*/

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function sendEvent(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/* Highest-value conversion: click from the marketing site into Square. */
document.querySelectorAll(".booking-link").forEach((link) => {
  link.addEventListener("click", () => {
    sendEvent("click_to_book", {
      link_location: link.dataset.linkLocation || "unknown",
      link_url: link.href,
      booking_platform: "square",
      booking_service: link.dataset.bookingService || "all",
      market: "carolinas"
    });
  });
});

document.querySelectorAll(".track-call").forEach((link) => {
  link.addEventListener("click", () => {
    sendEvent("click_to_call", {
      link_location: link.dataset.linkLocation || "unknown",
      link_url: link.href,
      market: "carolinas"
    });
  });
});

document.querySelectorAll(".track-email").forEach((link) => {
  link.addEventListener("click", () => {
    sendEvent("click_to_email", {
      link_location: link.dataset.linkLocation || "unknown",
      link_url: link.href
    });
  });
});

document.querySelectorAll(".external-track").forEach((link) => {
  link.addEventListener("click", () => {
    sendEvent("outbound_link_click", {
      link_location: link.dataset.linkLocation || "unknown",
      link_url: link.href
    });
  });
});

/* Expansion promo banner is intentionally editable/dismissible. */
const promo = document.querySelector("#expansion-banner");
const promoClose = document.querySelector(".banner-close");
if (promo && promoClose) {
  promoClose.addEventListener("click", () => {
    promo.hidden = true;
    sendEvent("promo_banner_dismiss", {
      promotion: "oregon_expansion"
    });
  });
}

/* Demo-only Oregon waitlist interaction. No personal data is sent anywhere. */
const oregonForm = document.querySelector("#oregon-demo-form");
const oregonSuccess = document.querySelector("#oregon-form-success");
if (oregonForm) {
  oregonForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendEvent("oregon_launch_interest", {
      market: "oregon",
      form_mode: "demo_only"
    });
    if (oregonSuccess) oregonSuccess.hidden = false;
    oregonForm.reset();
  });
}
