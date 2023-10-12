const isPrime = (num) => {
  if (num == 1) {
    return true;
  }
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

let x, y;
let num = 1;

function setup() {
  var cnv = createCanvas(800, 800);
  cnvX = (windowWidth - width) / 2;
  cnvY = (windowHeight - height) / 2;
  x = width / 2;
  y = height / 2;
  cnv.position(cnvX, cnvY);
  background(255);
}

// direction: 0 = right, 1 = up, 2 = left, down = 3
let stepSize = 2;
let direction = 0;
let turns = 0;
let steps = 0;
let numSteps = 1;

function draw() {
//   textSize(16);
//   textAlign(CENTER, CENTER);
//   fill(255);
  if (isPrime(num)) {
    // text("x", x, y);
    fill(color("black"));
    // stroke(0, 100);
    ellipse(x, y, 2);
  }
  if (num < 200000) {
    // console.log(
    //   "Direction: " + direction + " Steps: " + steps + " numSteps: " + numSteps
    // );
    // which direction to step
    if (direction == 0) {
      stroke(0, 30);
      line(x, y, x+stepSize, y);
      x += stepSize;
    } else if (direction == 1) {
      stroke(0, 30);
      line(x, y, x, y-stepSize);
      y -= stepSize;
    } else if (direction == 2) {
      stroke(0, 30);
      line(x, y, x-stepSize, y);
      x -= stepSize;
    } else if (direction == 3) {
      stroke(0, 30);
      line(x, y, x, y+stepSize);
      y += stepSize;
    }
    num++;
    // check if steps is divisible by number of steps
    if (steps % numSteps == 0) {
      // if number of steps have been taken,
      steps = 0; // reset the count

      if (direction == 3) {
        // increment direction
        direction = 0;
      } else {
        direction++;
      }
      turns++;
      if (turns % 2 == 0) {
        // if second turn,
        numSteps++; // number of steps go up
      }
    }
    steps++;
    frameRate(600);
  } else {
    noLoop();
    return;
  }
}
