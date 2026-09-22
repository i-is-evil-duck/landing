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

// Custom image cursor that smoothly follows the mouse
(function initCustomCursor() {
  const cursor = document.getElementById("customCursor");
  if (!cursor) return;

  const HALF = 32;
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0, raf = null;
  const ease = 0.3;

  const follow = () => {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    cursor.style.transform = `translate(${currentX - HALF}px, ${currentY - HALF}px)`;
    raf = requestAnimationFrame(follow);
  };

  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.style.opacity = "1";
    if (!raf) raf = requestAnimationFrame(follow);
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });
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

// Reveal on scroll — reusable for seamless swaps
let __revealObserver = null;
function initReveal() {
  const targets = document.querySelectorAll(".section-title, .section-subtitle, .card, .feature-card, .link-card");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("visible"));
    return;
  }
  if (!__revealObserver) {
    __revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            __revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }
  targets.forEach((el) => {
    if (el.classList.contains("visible") || el.classList.contains("reveal")) {
      // already handled; still ensure observer if not visible yet
      if (!el.classList.contains("visible")) __revealObserver.observe(el);
      return;
    }
    el.classList.add("reveal");
    __revealObserver.observe(el);
  });
}
function refreshReveal() {
  const newTargets = document.querySelectorAll(".section-title, .section-subtitle, .card, .feature-card, .link-card");
  newTargets.forEach((el) => {
    if (el.classList.contains("visible")) return;
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
    if (__revealObserver) __revealObserver.observe(el);
    else el.classList.add("visible");
  });
}
(function () { initReveal(); })();

// Smooth scroll for in-page anchors — delegated so new content works
(function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    // only handle same-page hash links (ignore cross-page hashes handled by seamless nav)
    const target = document.querySelector(href);
    if (target) {
      // check if link is purely hash (no .html)
      if (link.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", href);
      }
    }
  });
})();

// Light / dark theme toggle (replaces Discord CTA)
(function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const icon = btn.querySelector("i");
  const text = btn.querySelector(".theme-toggle__text");
  const STORAGE_KEY = "theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    if (icon && text) {
      if (theme === "dark") {
        icon.className = "fa-solid fa-sun";
        text.textContent = "Light";
        btn.setAttribute("aria-label", "Switch to light theme");
      } else {
        icon.className = "fa-solid fa-moon";
        text.textContent = "Dark";
        btn.setAttribute("aria-label", "Switch to dark theme");
      }
    }
  }

  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else {
    // default to light mode as requested — ignore system preference
    applyTheme("light");
  }

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
})();

// Cute tilt on link cards — reusable
function initTilt() {
  const cards = document.querySelectorAll(".link-card");
  cards.forEach((card) => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = "1";
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
}
(function () { initTilt(); })();

// Seamless subpage navigation — fetch + View Transition (no full reload), clean URLs (/links not /links.html, / not /index.html)
(function initSeamlessNav() {
  const cache = new Map();
  const mainSelector = "main";
  const CLEAN_MAP = {
    "/index.html": "/",
    "/links.html": "/links",
    "/links/index.html": "/links"
  };
  const FETCH_MAP = {
    "/links": "/links",
    "/links/": "/links/",
    "/": "/",
    "/index.html": "/index.html",
    "/links.html": "/links.html"
  };
  function toClean(pathname) {
    return CLEAN_MAP[pathname] || pathname;
  }
  function normalizePath(pathname) {
    // handle clean <-> html mapping for fetch
    if (pathname === "/links" || pathname === "/links/") return pathname;
    return pathname;
  }
  const isInternalPage = (url) => {
    if (url.origin !== location.origin) return false;
    const p = url.pathname;
    return p === "/" || p === "/index.html" || p === "/links" || p === "/links/" || p === "/links.html" || p === "/links/index.html" || p.endsWith(".html");
  };
  function toFetchPath(pathname) {
    // For clean URLs, fetch the same clean path — server serves directory index for /links
    // For /links.html keep as is; for / keep as /
    return pathname;
  }

  async function fetchPage(path) {
    if (cache.has(path)) return cache.get(path);
    const res = await fetch(path, { headers: { "X-Requested-With": "fetch" } });
    if (!res.ok) throw new Error("fetch failed");
    const text = await res.text();
    cache.set(path, text);
    return text;
  }

  function parseMain(htmlText) {
    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    const main = doc.querySelector(mainSelector);
    const title = doc.querySelector("title")?.textContent || document.title;
    return { main, title, doc };
  }

  function getCleanUrl(url) {
    const cleanPath = toClean(url.pathname);
    return cleanPath + url.search + url.hash;
  }

  function isSamePage(url) {
    const curClean = toClean(location.pathname);
    const nextClean = toClean(url.pathname);
    return curClean === nextClean;
  }

  async function navigate(urlStr, push = true) {
    let url;
    try { url = new URL(urlStr, location.href); } catch { location.href = urlStr; return; }

    const cleanHref = getCleanUrl(url);

    // same-page hash -> just scroll
    if (isSamePage(url) && url.hash) {
      const target = document.querySelector(url.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (push) history.pushState(null, "", cleanHref);
      }
      return;
    }

    if (!isInternalPage(url)) { location.href = urlStr; return; }
    if (isSamePage(url) && !url.hash) return; // same page no hash

    document.documentElement.classList.add("is-navigating");
    try {
      const fetchPath = toFetchPath(url.pathname) + url.search;
      const htmlText = await fetchPage(fetchPath);
      const { main: newMain, title } = parseMain(htmlText);
      if (!newMain) { location.href = cleanHref; return; }

      const doSwap = () => {
        const curMain = document.querySelector(mainSelector);
        if (curMain) curMain.innerHTML = newMain.innerHTML;
        if (title) document.title = title;
        refreshReveal();
        initTilt();
        if (url.hash) {
          requestAnimationFrame(() => {
            const target = document.querySelector(url.hash);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      };

      if (document.startViewTransition) {
        await document.startViewTransition(doSwap).finished;
      } else {
        doSwap();
        const curMain = document.querySelector(mainSelector);
        if (curMain) {
          curMain.style.opacity = "0";
          curMain.style.transform = "translateY(8px)";
          curMain.style.transition = "opacity 0.25s, transform 0.25s";
          requestAnimationFrame(() => {
            curMain.style.opacity = "1";
            curMain.style.transform = "translateY(0)";
          });
        }
      }

      if (push) history.pushState(null, "", cleanHref);
    } catch (e) {
      location.href = getCleanUrl(url);
    } finally {
      setTimeout(() => document.documentElement.classList.remove("is-navigating"), 300);
    }
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || a.target === "_blank" || a.hasAttribute("download")) return;
    if (href.startsWith("#")) return;
    let url;
    try { url = new URL(href, location.href); } catch { return; }
    if (url.origin !== location.origin) return;
    const p = url.pathname;
    const isHtmlNav = p === "/" || p === "/index.html" || p === "/links" || p === "/links/" || p === "/links.html" || p.endsWith(".html");
    if (!isHtmlNav) return;
    e.preventDefault();
    navigate(url.href, true);
  });

  window.addEventListener("popstate", () => {
    navigate(location.href, false);
  });

  // normalize current URL on load: hide .html if present
  (function normalizeCurrentUrl() {
    const cur = new URL(location.href);
    const clean = toClean(cur.pathname);
    if (clean !== cur.pathname) {
      history.replaceState(null, "", clean + cur.search + cur.hash);
    }
  })();

  // prefetch the other page on idle for instant first navigation
  const prefetch = () => {
    const curClean = toClean(location.pathname);
    const url = curClean === "/links" ? "/" : "/links";
    fetchPage(url).catch(() => {});
    // also prefetch legacy html for fallback
    fetchPage(curClean === "/links" ? "/index.html" : "/links.html").catch(() => {});
  };
  if ("requestIdleCallback" in window) requestIdleCallback(prefetch, { timeout: 2000 });
  else setTimeout(prefetch, 1500);
})();
