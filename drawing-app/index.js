const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let size = 20;

const drawCircle = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.stroke();
};

canvas.addEventListener("mousedown", () => {
  console.log(`test`);
});

const init = () => {
  drawCircle(100, 75);
};

init();
