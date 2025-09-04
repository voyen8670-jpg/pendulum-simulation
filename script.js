let originX, originY;
let length = 200;
let angle = Math.PI / 4;
let aVelocity = 0;
let aAcceleration = 0;
let gravity = 1;
let isRunning = true;

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent(document.body);
  originX = width / 2;
  originY = 100;
}

function draw() {
  background(20, 20, 30);

  if (isRunning) {
    let force = (-1 * gravity / length) * sin(angle);
    aAcceleration = force;
    aVelocity += aAcceleration;
    angle += aVelocity;
    aVelocity *= 0.99; // ma sát nhẹ
  }

  let x = originX + length * sin(angle);
  let y = originY + length * cos(angle);

  stroke(255);
  strokeWeight(2);
  fill(255, 150, 0);
  line(originX, originY, x, y);
  ellipse(x, y, 40, 40);

  // Cập nhật thông số
  document.getElementById("info").innerText =
    `⏱ Tốc độ góc: ${aVelocity.toFixed(2)} rad/s | Góc hiện tại: ${(degrees(angle)).toFixed(2)}°`;
}

function resetPendulum() {
  length = parseFloat(document.getElementById("length").value);
  angle = radians(parseFloat(document.getElementById("angle").value));
  gravity = parseFloat(document.getElementById("gravity").value);
  aVelocity = 0;
}

function togglePendulum() {
  isRunning = !isRunning;
}
