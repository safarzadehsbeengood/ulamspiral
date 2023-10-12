const isPrime = new Array(20000).fill(true);
const stepSizeSlider = document.getElementById('step_size');
const dotSizeSlider = document.getElementById('dot_size');
let isAnimating = true;

let x, y;
let num = 1;
let stepSize = 2;
let dotSize = 3;
let direction = 0;
let turns = 0;
let numSteps = 1;
let steps = 0;

function sieveOfEratosthenes() {
  isPrime[0] = false;
  isPrime[1] = true;
  const limit = Math.sqrt(isPrime.length);
  for (let num = 2; num <= limit; num++) {
    if (isPrime[num]) {
      for (let multiple = num * num; multiple < isPrime.length; multiple += num) {
        isPrime[multiple] = false;
      }
    }
  }
}

function resetSketch() {
    clear();
    num = 1;
    direction = 0;
    turns = 0;
    numSteps = 1;
    steps = 0;
  
    createCanvas(800, 800);
    x = width / 2;
    y = height / 2;
    isPrime.fill(true);
    background(255);
    sieveOfEratosthenes();
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

function setup() {
    resetSketch();
}

function draw() {
  if (isPrime[num]) {
    fill(100);
    stroke(100);
    ellipse(x, y, dotSize);
  }
  if (x < width && x > 0) {
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
