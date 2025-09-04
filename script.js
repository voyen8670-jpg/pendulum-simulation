let originX, originY;
let length = 200;
let angle = Math.PI / 4;
let aVelocity = 0;
let aAcceleration = 0;
let gravity = 1;
let isRunning = true;

let angleHistory = []; // lưu lịch sử góc để vẽ đồ thị

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent(document.body);
  originX = width / 2;
  originY = 120;
}

function draw() {
  background(20, 20, 30);

  // Con lắc
  if (isRunning) {
    let force = (-1 * gravity / length) * sin(angle);
    aAcceleration = force;
    aVelocity += aAcceleration;
    angle += aVelocity;
    aVelocity *= 0.995; // ma sát nhẹ
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

  // Lưu lịch sử góc
  angleHistory.push(angle);
  if (angleHistory.length > width) {
    angleHistory.shift();
  }

  // Vẽ đồ thị dao động
  push();
  translate(0, height - 200);
  noFill();
  stroke(0, 255, 200);
  beginShape();
  for (let i = 0; i < angleHistory.length; i++) {
    let y = map(angleHistory[i], -PI/2, PI/2, 150, 0); 
    vertex(i, y);
  }
  endShape();
  pop();

  // Vẽ khung đồ thị
  push();
  stroke(200);
  noFill();
  rect(0, height - 200, width, 200);
  fill(255);
  textSize(14);
  text("📊 Đồ thị góc theo thời gian", 10, height - 205);
  pop();
}

function resetPendulum() {
  length = parseFloat(document.getElementById("length").value);
  angle = radians(parseFloat(document.getElementById("angle").value));
  gravity = parseFloat(document.getElementById("gravity").value);
  aVelocity = 0;
  angleHistory = [];
}

function togglePendulum() {
  isRunning = !isRunning;
}
