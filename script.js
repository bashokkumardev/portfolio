const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    });
  });
}

const revealEls = document.querySelectorAll(
  ".section, .timeline-item, .project-card, .skill-group, .edu-card, .contact-card"
);

revealEls.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute("id") || "";
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.style.color =
      anchor.getAttribute("href") === `#${current}` ? "var(--text)" : "";
  });
});
