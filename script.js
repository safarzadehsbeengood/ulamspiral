const stepSizeSlider = document.getElementById('step_size');
const dotSizeSlider = document.getElementById('dot_size');
let isAnimating = true;

let x, y;
let num = 1;
let stepSize = 10;
let dotSize = 3;
let direction = 0;
let turns = 0;
let numSteps = 1;
let steps = 0;

function isPrime(value) {
  if (value == 1) {
    return false;
  }
  for (i = 2; i < Math.sqrt(value); i++) {
    if (value % i == 0) {
      return false;
    }
  }
  return true;
}

function resetSketch() {
    clear();
    num = 1;
    direction = 0;
    turns = 0;
    numSteps = 1;
    steps = 0;
  
    var cnv = createCanvas(window.innerWidth / 2, window.innerHeight / 2);
    cnvWidth = (windowWidth - width) / 2;
    cnvHeight = (windowHeight - height) / 2;
    cnv.position(cnvWidth, cnvHeight);
    x = width / 2;
    y = height / 2;
    background(0);
    isAnimating = true;
    loop();
  }

stepSizeSlider.onchange = () => {
    stepSize = parseFloat(stepSizeSlider.value);
    resetSketch();
}

dotSizeSlider.onchange = () => {
    dotSize = parseFloat(dotSizeSlider.value);
    resetSketch();
}

window.onresize = () => {
  resetSketch();
}

function setup() {
    resetSketch();
}

function draw() {
  if (isPrime(num)) {
    fill(255);
    stroke(255);
    ellipse(x, y, dotSize);
  }
  if (x < width && x > 0 && y < height && y > 0) {
    stroke(100, 50);
    if (direction === 0) {
      line(x, y, x + stepSize, y);
      x += stepSize;
    } else if (direction === 1) {
      line(x, y, x, y - stepSize);
      y -= stepSize;
    } else if (direction === 2) {
      line(x, y, x - stepSize, y);
      x -= stepSize;
    } else if (direction === 3) {
      line(x, y, x, y + stepSize);
      y += stepSize;
    }
    num++;
    if (steps % numSteps === 0) {
      steps = 0;
      if (direction === 3) {
        direction = 0;
      } else {
        direction++;
      }
      turns++;
      if (turns % 2 === 0) {
        numSteps++;
      }
    }
    steps++;
    frameRate(600);
  } else {
    noLoop();
    if (isAnimating) {
        isAnimating = false; // Animation finished
      }
  }
}
