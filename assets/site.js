/*
  Ramirez Mobile Detailing demo
  Real Square Appointments URLs supplied from the business's current booking flow.
  Each service CTA opens the matching Square service directly.
*/
const BOOKING_LINKS = {
  all: "https://book.squareup.com/appointments/lp3tsnwxxeqqa2/location/L4RYMN0M32JNJ/services",
  express: "https://book.squareup.com/appointments/lp3tsnwxxeqqa2/location/L4RYMN0M32JNJ/services/QRIG4WQFSRD322G7QLNCF4QP",
  deluxe: "https://book.squareup.com/appointments/lp3tsnwxxeqqa2/location/L4RYMN0M32JNJ/services/LJTUBXSWVV677IQ3WLCXRWMX",
  expressInterior: "https://book.squareup.com/appointments/lp3tsnwxxeqqa2/location/L4RYMN0M32JNJ/services/NRYWK5A5WVLCTM4GPMLIF7PC",
  deluxeInterior: "https://book.squareup.com/appointments/lp3tsnwxxeqqa2/location/L4RYMN0M32JNJ/services/664YLDRZ6LZLNNAIEHJ5P7SS",
  exterior: "https://book.squareup.com/appointments/lp3tsnwxxeqqa2/location/L4RYMN0M32JNJ/services/M224S3OVEOJNNHPXUYFWZDAW"
};

document.querySelectorAll(".booking-link").forEach((link) => {
  const key = link.dataset.bookingKey || "all";
  link.href = BOOKING_LINKS[key] || BOOKING_LINKS.all;
  link.target = "_blank";
  link.rel = "noopener";
});

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

document.getElementById("year").textContent = new Date().getFullYear();

function sendEvent(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

document.querySelectorAll(".track-call").forEach((link) => {
  link.addEventListener("click", () => {
    sendEvent("click_to_call", {
      link_location: link.dataset.linkLocation || "unknown",
      link_url: link.href
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

document.querySelectorAll(".booking-link").forEach((link) => {
  link.addEventListener("click", () => {
    sendEvent("click_to_book", {
      link_location: link.dataset.linkLocation || "unknown",
      link_url: link.href,
      booking_platform: "square",
      booking_service: link.dataset.bookingKey || "all"
    });
  });
});

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  if (link.classList.contains("booking-link")) return;
  link.addEventListener("click", () => {
    sendEvent("outbound_link_click", {
      link_location: link.dataset.linkLocation || "unknown",
      link_url: link.href
    });
  });
});
