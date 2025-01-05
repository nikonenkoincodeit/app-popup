const boxPopupBodyRef = document.querySelector(".js-box-popup-roulette");
const boxPopupRouOverRef = document.querySelector(".js-box-popup-roulette-overlay");

function setHeightEl() {
  const size = Math.min(boxPopupBodyRef.clientWidth, 600);
  boxPopupBodyRef.style.height = size + "px";
  const scale = (size - 15) / 612;
  console.log(scale);
  boxPopupRouOverRef.style.transform = `scale(${scale})`;
}

window.addEventListener("load", setHeightEl);
window.addEventListener("resize", setHeightEl);
