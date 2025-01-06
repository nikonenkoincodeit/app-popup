const wrapperRouletteRef = document.querySelector(".js-wrapper-roulette");
const boxPopupBodyRef = document.querySelector(".js-box-popup-roulette");
const popupTitleRef = document.querySelector(".js-box-popup-title");
const popupBtnRef = document.querySelector(".js-box-popup-btn");
const boxPopupRouOverRef = document.querySelector(".js-box-popup-roulette-overlay");
const canvasRef = document.getElementById("canvas");

function setHeightEl() {
  const size = Math.min(boxPopupBodyRef.clientWidth, 600);
  boxPopupBodyRef.style.height = size + "px";
  const scale = (size - 2) / 612;
  boxPopupRouOverRef.style.transform = `scale(${scale})`;
}

function setAnimation() {
  console.log("circle-animation");

  wrapperRouletteRef.classList.remove("animation-roulette");
  wrapperRouletteRef.classList.add("circle-animation");
  setTimeout(() => {
    popupTitleRef.textContent = "ОГО! Вашу знижку -60% активовано!";
    Draw();
    stopAnimation();
  }, 3500);
}

popupBtnRef.addEventListener("click", setAnimation);
window.addEventListener("load", setHeightEl);
window.addEventListener("resize", setHeightEl);

let W = window.innerWidth;
let H = window.innerHeight;
let animationRunning = true;

const context = canvasRef.getContext("2d");
const maxConfettis = 200;
const particles = [];

const possibleColors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Gold", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function () {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  if (!animationRunning) return;
  const results = [];

  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 5) / 5;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

function stopAnimation() {
  setTimeout(() => {
    animationRunning = false;
    canvasRef.classList.add("opacity-0");
  }, 3000);
}

window.addEventListener(
  "resize",
  () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvasRef.width = W;
canvasRef.height = H;
