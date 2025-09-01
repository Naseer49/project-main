// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Close behavior =====
// Web cannot exit to phone home. We try close (if popup) then redirect to your home page.
const HOME_URL = "index.html"; // change to your landing page or domain root

function closeOrExit() {
  window.open("", "_self"); // required by some browsers before close()
  window.close();           // works only for script-opened windows

  // Always fallback to your home/landing page
  location.replace(HOME_URL);
}
document.getElementById("closeBtn").addEventListener("click", closeOrExit);

// ===== Slider logic (vanilla, autoplay, arrows, dots, swipe) =====
const slider = document.getElementById("slider");
const slides = Array.from(slider.querySelectorAll(".slide"));
const dotsWrap = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;
const INTERVAL_MS = 5000;
let timer = null;

function renderDots() {
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => {
      index = i;
      update();
      restart();
    });
    dotsWrap.appendChild(b);
  });
}

function update() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  const dotBtns = dotsWrap.querySelectorAll("button");
  dotBtns.forEach((b, i) => b.setAttribute("aria-current", String(i === index)));
}

function next() {
  index = (index + 1) % slides.length;
  update();
}
function prev() {
  index = (index - 1 + slides.length) % slides.length;
  update();
}

function start() {
  stop();
  timer = setInterval(next, INTERVAL_MS);
}
function stop() {
  if (timer) clearInterval(timer);
  timer = null;
}
function restart() { if (timer) start(); }

prevBtn.addEventListener("click", () => { prev(); restart(); });
nextBtn.addEventListener("click", () => { next(); restart(); });

// Pause on hover (desktop)
slider.addEventListener("mouseenter", stop);
slider.addEventListener("mouseleave", start);

// Keyboard arrows
slider.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { next(); restart(); }
  if (e.key === "ArrowLeft")  { prev(); restart(); }
});

// Touch swipe (mobile)
let startX = 0, dx = 0, swiping = false;
slider.addEventListener("touchstart", (e) => {
  if (e.target.closest("button")) return;
  startX = e.touches[0].clientX;
  swiping = true;
  stop();
}, { passive: true });

slider.addEventListener("touchmove", (e) => {
  if (!swiping) return;
  dx = e.touches[0].clientX - startX;
}, { passive: true });

slider.addEventListener("touchend", () => {
  if (!swiping) return;
  if (dx < -40) next();
  if (dx >  40) prev();
  swiping = false;
  dx = 0;
  start();
});

// Init
renderDots();
update();
start();
