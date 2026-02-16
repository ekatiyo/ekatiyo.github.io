const waMessage =
  "Halo Arsana Printing, saya ingin pesan layanan percetakan";
const waLink = `https://wa.me/6285134761461?text=${encodeURIComponent(waMessage)}`;

const setWhatsAppLinks = () => {
  document.querySelectorAll("[data-wa-link]").forEach((link) => {
    link.setAttribute("href", waLink);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
};

const initFadeIn = () => {
  const items = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  items.forEach((item) => observer.observe(item));
};

const initSlider = () => {
  const slider = document.querySelector("[data-slider]");
  if (!slider) return;

  const track = slider.querySelector(".slider-track");
  const slides = Array.from(track.children);
  const prev = slider.querySelector('[data-slide="prev"]');
  const next = slider.querySelector('[data-slide="next"]');

  let index = 0;

  const getSlideWidth = () => slides[0].getBoundingClientRect().width + 20;

  const clampIndex = (value) => Math.max(0, Math.min(value, slides.length - 1));

  const update = () => {
    const slideWidth = getSlideWidth();
    track.scrollTo({ left: index * slideWidth, behavior: "smooth" });
  };

  prev.addEventListener("click", () => {
    index = clampIndex(index - 1);
    update();
  });

  next.addEventListener("click", () => {
    index = clampIndex(index + 1);
    update();
  });

  track.addEventListener("scroll", () => {
    const slideWidth = getSlideWidth();
    index = clampIndex(Math.round(track.scrollLeft / slideWidth));
  });
};

const initParallax = () => {
  const section = document.querySelector(".parallax");
  if (!section) return;

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const offset = Math.max(0, rect.top * -0.2);
    section.style.backgroundPosition = `center ${offset}px`;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
};

const hideLoader = () => {
  const loader = document.querySelector(".page-loader");
  if (!loader) return;
  window.setTimeout(() => loader.classList.add("hidden"), 300);
};

document.addEventListener("DOMContentLoaded", () => {
  setWhatsAppLinks();
  initFadeIn();
  initSlider();
  initParallax();
});

window.addEventListener("load", hideLoader);

