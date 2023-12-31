let circleSize = 120;
let circleRadius = circleSize / 2;
let bigCircleScale = 1;
let smallCircleScale = 0.6;

//for individual part (audio)
let song;
let button;
let amp;

// Apple's coordinates 
let bigcircleCenters = [
  { x: 400, y: 324 },
  { x: 300, y: 500 },
  { x: 400, y: 841 },
  { x: 500, y: 1020 },
  { x: 850, y: 1000 },
  { x: 900, y: 1314 },
  { x: 1330, y: 810 },
  { x: 1700, y: 765 },
];

let smallcircleCenters = [
  { x: 400, y: 628 },
  { x: 500, y: 694 },
  { x: 559, y: 800 },
  { x: 530, y: 1180 },
  { x: 628, y: 1250 },
  { x: 750, y: 1250 },
  { x: 750, y: 735 },
  { x: 800, y: 846 },
  { x: 850, y: 1160 },
  { x: 950, y: 870 },
  { x: 1050, y: 1250 },
  { x: 1050, y: 800 },
  { x: 1210, y: 1070 },
  { x: 1140, y: 1170 },
  { x: 1263, y: 960 },
  { x: 1450, y: 700 },
  { x: 1530, y: 610 },
  { x: 1820, y: 655 },
  { x: 1650, y: 610 },
  { x: 1910, y: 572 },
];

let canvasWidth, canvasHeight;
const canvasRatio = 2 / 3; // Make sure the canvas ratio is always 2:3

//preload music
function preload () {
  song = loadSound('assets/GRL-GVNG.ogg')
}

//add a class for circles
class Circle {
  constructor(x, y, size, scaleFactor) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.scaleFactor = scaleFactor;
  }

  display() {
    stroke(15);
    strokeWeight(scaledElement(5));
    fill(230);
    circle(scaledElement(this.x + 200), scaledElement(this.y + 200), scaledElement(this.size * this.scaleFactor*2));
    this.drawCircleGroup();
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  drawCircleGroup() {
    let numCircles = 4;
    let circleSpacing = 5;
    let strokeWidth = scaledElement(6) * this.scaleFactor;

    push();
    translate(scaledElement(this.x + 200), scaledElement(this.y + 200));
    rotate(-radians(frameCount * amp.getLevel() * 0.3));

    for (let i = 0; i < numCircles; i++) {
      let currentRadius = scaledElement(this.size * this.scaleFactor) - i * circleSpacing;
      noFill();
      stroke(15);
      strokeWeight(strokeWidth);
      arc(0, 0, currentRadius * 2, currentRadius * 2, 0, PI);
    }

    fill(15);
    noStroke();
    arc(0, 0, scaledElement(this.size * 2 * this.scaleFactor) + strokeWidth, scaledElement(this.size * 2 * this.scaleFactor) + strokeWidth, PI, TWO_PI);
    pop();
  }
}

let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateCanvasSize();

  //add button to control music play and pause
  button = createButton ('play');
  button.mousePressed(buttonforSong);

  //get the current volume from the music
  amp = new p5.Amplitude();
}

function draw() {
  let level = amp.getLevel();
  let num = map(level, 0, 1, 100, 150);
  background(num, num, 197);

  drawButton();

  drawSun();
  drawBackgroundLines();
  drawGround();
  drawTreeTrunk();
  drawRoots();

  for (let center of bigcircleCenters) {
    let circle = new Circle(center.x, center.y, circleSize, bigCircleScale);
    circles.push(circle);
    circle.display();
    circle.move();
  }

  for (let center of smallcircleCenters) {
    let circle = new Circle(center.x, center.y, circleSize, smallCircleScale);
    circles.push(circle);
    circle.display();
    circle.move();
  }

  // Remove circles that are no longer on the canvas to prevent memory consumption.
  circles = circles.filter((circle) => circle.x > -circle.size && circle.x < canvasWidth + circle.size && circle.y > -circle.size && circle.y < canvasHeight + circle.size);
}

// A function to adjust the value of an element based on the window size.
function scaledElement(inputElement) {
  return inputElement * min(canvasWidth, canvasHeight) / 2200;
}



function drawButton() {
  //draw the button and make it in wanted style
  button.size(100, 50);
  button.position(10, 10);
  button.style("font-family", "Comic Sans MS");
  button.style("font-size", "25px")
}

function buttonforSong() {
  //control the music pause or play
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}


function drawSun() {
  // Draw the sun
  noStroke();
  // get volume level from the music
  let level = amp.getLevel();

  //use the volum level to control the number of ellipse
  let numSuns = map(level, 0, 1, 3, 15);
  //use the volum level to control the size
  let size = map(level, 0.5, 1, 400, 600);
  let changeColor = map(level, 0, 1, 50, 150);

  let sunCenterX = width / 2;
  let sunCenterY = 0;

  for (let i = 0; i < numSuns; i++) {
    let sunSize = scaledElement(size + i * 50);
    let sunColor = color(245 - (changeColor/8), 135, 26 + changeColor, 40);

    fill(sunColor);
    ellipse(sunCenterX, sunCenterY, sunSize * 2);
  }
}


function drawBackgroundLines() {
  // Draw the background lines
  let numLines = 23;
  let circleCenterX = canvasWidth / 2;
  let circleCenterY = canvasHeight / 2;

  //Use song volume to control the height and number of background lines
  let level = amp.getLevel();
  let backgroundlinesize1 = map(level, 0, 1, 300, 1500);
  let backgroundlinesize2 = map(level, 0, 1, 600, 1800);
  let backgroundlinesize3 = map(level, 0, 1, 1500, 1800);

   //3 groups of lines to create the circle trend
   let radius1 = scaledElement(backgroundlinesize1);
   let radius2 = scaledElement(backgroundlinesize2);
   let radius3 = scaledElement(backgroundlinesize3);
   let gap = scaledElement(220);
   let interval = scaledElement(80); // distance between each two lines

  // Draw lines for each radius
  drawLines(numLines, gap, interval, radius1, circleCenterX, circleCenterY, scaledElement(6));
  drawLines(numLines, gap, interval, radius2, circleCenterX, circleCenterY, scaledElement(18));
  drawLines(numLines, gap, interval, radius3, circleCenterX, circleCenterY, scaledElement(30));
}


function drawLines(numLines, gap, interval, inputRadius, centerX, centerY, strokeW) {
  strokeWeight(strokeW)
  stroke(151, 183, 176)

  for (let i = 0; i < numLines; i++) {
    let x = gap + i * interval
    let y1 = canvasHeight; //Start from the bottom of canvas
    let dx = x - centerX; //length of the Xdistance between circle center and the line ends

    //Calculate Y position to draw plumb lines
    //check if the line could intersect with the circle
    if (abs(dx) <= inputRadius) {
      let dy = sqrt(inputRadius * inputRadius - dx * dx)  // Calculate the dy, Pythagorean theorem
      let y2 = centerY + dy - scaledElement(800);
      line(x, y1, x, y2)
    }
  }
}


function drawGround() {
  noStroke();
  let rectHeight = scaledElement(600);
  let baserectColor = color(54, 54, 54);
  fill(baserectColor);
  rect(0, canvasHeight - rectHeight, canvasWidth, rectHeight);
}


function drawTreeTrunk() {
  let rectHeight = scaledElement(600);
  let rectX1 = scaledElement(120);
  let rectY1 = scaledElement(450);
  let rectX2 = scaledElement(80);
  let rectY2 = scaledElement(850);
  let rectX3 = scaledElement(40);
  let rectY3 = scaledElement(1100);
  fill(1, 166, 180);
  rect(width / 2 - rectX1 / 2, height - (rectHeight + rectY1), rectX1, rectY1);
  rect(width / 2 - rectX2 / 2, height - (rectHeight + rectY2), rectX2, rectY2);
  rect(width / 2 - rectX3 / 2, height - (rectHeight + rectY3), rectX3, rectY3);
}


function drawRoots() {
  noStroke();

  //Use song volume to control the width of roots
  let level = amp.getLevel();
  let sizeY1 = map(level, 0, 1, 300, 500);
  let sizeY2 = map(level, 0, 1, 300, 1200);
  let sizeY3 = map(level, 0, 1, 300, 1600);

  let rectHeight = scaledElement(600);

  let rectRootX1 = scaledElement(sizeY1);
  let rectRootY1 = scaledElement(50);
  let rectRootX2 = scaledElement(sizeY2);
  let rectRootY2 = scaledElement(30);
  let rectRootX3 = scaledElement(sizeY3);
  let rectRootY3 = scaledElement(10);

  fill(245, 209, 17);
  for (i = 0; i < 3; i++) {
    rect(width / 2 - (rectRootX1 - i * scaledElement(50)) / 2, height - (rectHeight - (rectRootY1 + i * scaledElement(70))), rectRootX1 - (i * scaledElement(50)), rectRootY1);
    rect(width / 2 - (rectRootX2 - i * scaledElement(50)) / 2, height - (rectHeight - (rectRootY2 + i * scaledElement(70)) - scaledElement(30)), rectRootX2 - (i * scaledElement(50)), rectRootY2);
    rect(width / 2 - (rectRootX3 - i * scaledElement(50)) / 2, height - (rectHeight - (rectRootY3 + i * scaledElement(70)) - scaledElement(60)), rectRootX3 - (i * scaledElement(50)), rectRootY3);
  }
}

function calculateCanvasSize() {
  // Check if the aspect ratio of the window is greater than the canvas ratio.
  if (windowWidth / windowHeight > canvasRatio) {
    canvasHeight = windowHeight;
    canvasWidth = windowHeight * canvasRatio;
  } else {
    // If not, adjust the canvas width to fit the window width while maintaining the canvas ratio.
    canvasWidth = windowWidth;
    canvasHeight = windowWidth / canvasRatio;
  }
  resizeCanvas(canvasWidth, canvasHeight);// Resize the canvas with the calculated dimensions.
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust the canvas to match the window size.
  calculateCanvasSize(); // Recalculate and set the canvas size to maintain the desired ratio.
  }