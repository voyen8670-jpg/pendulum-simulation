let originX, originY;
let bobX, bobY;
let angle, angleVel = 0, angleAcc = 0;
let r = 150;   // length
let g = 1;     // gravity
let running = false;

let chart, time = 0;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("sketch-holder");
  originX = width / 2;
  originY = 50;
  angle = radians(30); // default 30°

  setupChart();
}

function draw() {
  background(240);

  if (running) {
    angleAcc = (-g / r) * sin(angle);
    angleVel += angleAcc;
    angle += angleVel;
    angleVel *= 0.99; // damping
    time += deltaTime / 1000;

    addData(chart, time.toFixed(2), degrees(angle).toFixed(2));
  }

  bobX = originX + r * sin(angle);
  bobY = originY + r * cos(angle);

  stroke(0);
  line(originX, originY, bobX, bobY);
  fill(50);
  circle(bobX, bobY, 30);
}

function mousePressed() {
  if (dist(mouseX, mouseY, bobX, bobY) < 15) {
    running = false;
    angleVel = 0;
  }
}

function mouseDragged() {
  if (dist(mouseX, mouseY, bobX, bobY) < 50) {
    angle = atan2(mouseX - originX, mouseY - originY) * -1;
  }
}

function mouseReleased() {
  running = true;
}

// Control buttons
function startPendulum() { running = true; }
function stopPendulum() { running = false; }
function resetPendulum() {
  running = false;
  angle = radians(document.getElementById("angleSlider").value);
  angleVel = 0;
  time = 0;
  resetChart();
}

// Sliders
document.getElementById("lenSlider").oninput = function () {
  r = this.value;
  document.getElementById("lenVal").innerText = r;
};
document.getElementById("gravSlider").oninput = function () {
  g = this.value;
  document.getElementById("gravVal").innerText = g;
};
document.getElementById("angleSlider").oninput = function () {
  document.getElementById("angleVal").innerText = this.value;
};

// Chart.js setup
function setupChart() {
  let ctx = document.getElementById("angleChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Angle (°)",
        data: [],
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Time (s)" } },
        y: { title: { display: true, text: "Angle (°)" } }
      }
    }
  });
}

function addData(chart, label, data) {
  if (chart.data.labels.length > 50) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(data);
  chart.update();
}

function resetChart() {
  chart.data.labels = [];
  chart.data.datasets[0].data = [];
  chart.update();
      }
