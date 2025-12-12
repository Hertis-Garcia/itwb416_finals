const carouselImages = document.querySelectorAll(".carousel-images img");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");

let currentIndex = 0;

function showImage(index) {
  carouselImages.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + carouselImages.length) % carouselImages.length;
  showImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselImages.length;
  showImage(currentIndex);
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % carouselImages.length;
  showImage(currentIndex);
}, 5000);

// Accordion Functionality

document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".accordion-header");
  headers.forEach((h) => {
    h.addEventListener("click", () => {
      const targetId = h.getAttribute("data-target");
      const body = document.getElementById(targetId);
      const isOpen = body.style.display === "block";
      document
        .querySelectorAll(".accordion-body")
        .forEach((b) => (b.style.display = "none"));
      if (!isOpen) body.style.display = "block";
    });
  });
});

(function () {
  const carousel = document.querySelector(".leadership-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".car-track");
  const slides = Array.from(track.querySelectorAll(".car-slide"));
  const dotsWrap = carousel.querySelector(".car-dots");

  // build dots
  slides.forEach((s, i) => {
    const d = document.createElement("button");
    d.className = "car-dot";
    d.setAttribute("aria-label", `Go to slide ${i + 1}`);
    d.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  let index = 0;
  let autoPlayId = null;

  // center the target slide in the viewport
  function centerSlide(i) {
    const viewport = carousel.querySelector(".car-viewport");
    const viewportW = viewport.clientWidth;
    const slide = slides[i];
    // slide.offsetLeft gives position inside track
    const offset = slide.offsetLeft - (viewportW - slide.offsetWidth) / 2;
    track.style.transform = `translateX(${-offset}px)`;
  }

  function update() {
    // guard for responsive changes
    if (!slides[0]) return;
    centerSlide(index);
    dots.forEach((d) => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function goTo(i) {
    index = ((i % slides.length) + slides.length) % slides.length;
    update();
  }

  function next() {
    goTo(index + 1);
  }
  function prev() {
    goTo(index - 1);
  }

  // autoplay
  function startAuto() {
    stopAuto();
    autoPlayId = setInterval(next, 4000);
  }
  function stopAuto() {
    if (autoPlayId) {
      clearInterval(autoPlayId);
      autoPlayId = null;
    }
  }

  // pause on hover
  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);

  // responsive: recalc when images load or window resizes
  window.addEventListener("resize", update);
  // wait for images to load to get correct offsets
  const imgs = carousel.querySelectorAll("img");
  let imgCount = imgs.length,
    loaded = 0;
  if (imgCount === 0) {
    update();
    startAuto();
  }
  imgs.forEach((img) => {
    if (img.complete) {
      loaded++;
    } else
      img.addEventListener("load", () => {
        loaded++;
        if (loaded === imgCount) {
          update();
          startAuto();
        }
      });
  });
  // fallback if images already complete
  if (loaded === imgCount) {
    update();
    startAuto();
  }

  // initial
  update();
  startAuto();
})();
