let angle = Math.PI / 4;  
let angleVel = 0;         
let angleAcc = 0;         
let length = 200;         
let gravity = 0.4;        

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("sketch-holder");
}

function draw() {
  background(240);

  let originX = width / 2;
  let originY = 50;

  angleAcc = (-1 * gravity / length) * sin(angle);
  angleVel += angleAcc;
  angleVel *= 0.99;  
  angle += angleVel;

  let x = originX + length * sin(angle);
  let y = originY + length * cos(angle);

  stroke(0);
  strokeWeight(2);
  line(originX, originY, x, y);
  fill(127);
  ellipse(x, y, 40, 40);
}
