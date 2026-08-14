// Sparkle background
(function makeSparkles() {
  const field = document.querySelector(".sparkle-field");
  if (!field) return;

  const sparkles = ["✦", "✧", "⋆", "☆", "♡", "❀"];
  const count = Math.min(28, Math.floor(window.innerWidth / 45));

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "sparkle";
    el.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.top = Math.random() * 100 + "%";
    el.style.fontSize = 12 + Math.random() * 14 + "px";
    el.style.animationDelay = Math.random() * 4 + "s";
    el.style.animationDuration = 3 + Math.random() * 4 + "s";
    field.appendChild(el);
  }
})();

// Disable right-click context menu
(function initContextLock() {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
})();

// Page load wave cleanup
(function initWaves() {
  const waves = document.querySelectorAll(".wave");
  if (!waves.length) return;
  setTimeout(() => {
    waves.forEach((el) => el.remove());
  }, 3200);
})();

// Sparkle cursor trail
(function initCursorSparkles() {
  let lastSparkle = 0;
  const sparkleChars = [
    "nf-fa-star",
    "nf-oct-star",
    "nf-cod-star_empty",
    "nf-weather-stars",
    "nf-fa-heart_o",
    "nf-fa-heart",
    "nf-cod-sparkle",
    "nf-cod-sparkle_filled",
  ];

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastSparkle < 90) return;
    lastSparkle = now;
    const sparkle = document.createElement("i");
    sparkle.className =
      "sparkle-trail nf " + sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 900);
  });
})();

// Reveal on scroll
(function initReveal() {
  const targets = document.querySelectorAll(".section-title, .section-subtitle, .card, .feature-card, .link-card");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();

// Smooth scroll for in-page anchors
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();

// Cute tilt on link cards
(function initTilt() {
  const cards = document.querySelectorAll(".link-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateX(8px) perspective(600px) rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();
