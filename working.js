const isPrime = new Array(200000).fill(true);

function sieveOfEratosthenes() {
  isPrime[0] = false;
  isPrime[1] = false;
  const limit = Math.sqrt(isPrime.length);
  for (let num = 2; num <= limit; num++) {
    if (isPrime[num]) {
      for (let multiple = num * num; multiple < isPrime.length; multiple += num) {
        isPrime[multiple] = false;
      }
    }
  }
}

let x, y;
let num = 1;

function setup() {
  createCanvas(800, 800);
  x = width / 2;
  y = height / 2;
  background(255);
  sieveOfEratosthenes();
}

let stepSize = 2;
let direction = 0;
let turns = 0;
let numSteps = 1;
let steps = 0;

function draw() {
  if (isPrime[num]) {
    fill(100);
    stroke(100);
    ellipse(x, y, 2);
  }
//   if (num < 200000) {
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
//   } else {
//     noLoop();
//   }
}
