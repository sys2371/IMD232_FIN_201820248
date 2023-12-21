let elementColors = [];
let randomColorButton;
let moveButton;
let saveImageButton;
let moveSpeed = 1;
let saveImageText;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  angleMode(DEGREES);

  let sliderX = 230;
  let sliderY = 170;

  s1 = createSlider(1, 15, 15, 1).position(sliderX, sliderY);
  p1 = createP('elements').position(sliderX, s1.y + 5);

  sliderY += 60;
  s2 = createSlider(1, 20, 5, 1).position(sliderX, sliderY);
  p2 = createP('parts').position(sliderX, s2.y + 5);

  sliderY += 60;
  s3 = createSlider(1, 15, 3, 1).position(sliderX, sliderY);
  p3 = createP('fragments').position(sliderX, s3.y + 5);

  sliderY += 60;
  s4 = createSlider(60, 300, 100, 10).position(sliderX, sliderY);
  p4 = createP('Minimum radius').position(sliderX, s4.y + 5);

  sliderY += 60;
  s5 = createSlider(90, 300, 200, 10).position(sliderX, sliderY);
  p5 = createP('Maximum radius').position(sliderX, s5.y + 5);

  sliderY += 60;
  s6 = createSlider(0.1, 1, 0.1, 0.05).position(sliderX, sliderY);
  p6 = createP('Rotation speed').position(sliderX, s6.y + 5);

  sliderY += 100;
  rSlider = createSlider(0, 255, 127).position(sliderX, sliderY);
  pR = createP('Red').position(sliderX, rSlider.y + 5);

  sliderY += 60;
  gSlider = createSlider(0, 255, 127).position(sliderX, sliderY);
  pG = createP('Green').position(sliderX, gSlider.y + 5);

  sliderY += 60;
  bSlider = createSlider(0, 255, 127).position(sliderX, sliderY);
  pB = createP('Blue').position(sliderX, bSlider.y + 5);

  randomColorButton = createButton('Random Color').position(
    sliderX,
    sliderY + 60
  );
  randomColorButton.mousePressed(assignRandomColors);

  moveButton = createButton('Change move type').position(
    sliderX,
    sliderY + 100
  );
  moveButton.mousePressed(toggleMovement);

  for (let i = 0; i < s1.value(); i++) {
    elementColors.push({
      red: rSlider.value(),
      green: gSlider.value(),
      blue: bSlider.value(),
    });
  }

  saveImageButton = createButton('Save Image').position(sliderX, sliderY + 180);
  saveImageButton.mousePressed(saveCanvasAsImage);

  saveImageButton.style('background-color', '#4CAF50');
  saveImageButton.style('color', 'white');

  saveImageText = createP('(※ press S for saving)').position(
    sliderX + 0,
    sliderY + 195
  );
  saveImageText.style('color', 'white');
}

function draw() {
  background('black');
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(3.5);

  for (let n = 0; n < s1.value(); n++) {
    stroke(elementColors[n].red, elementColors[n].green, elementColors[n].blue);

    beginShape();
    for (let i = 0; i < 360; i += s3.value()) {
      let rad = map(
        sin(i * s2.value() + frameCount * moveSpeed),
        -1,
        1,
        s4.value(),
        s5.value()
      );
      let x = rad * cos(i);
      let y = rad * sin(i);
      vertex(x, y);
    }
    endShape(CLOSE);
    rotate(frameCount * s6.value());
  }
}

function assignRandomColors() {
  for (let i = 0; i < s1.value(); i++) {
    elementColors[i] = {
      red: random(255),
      green: random(255),
      blue: random(255),
    };
  }
}

function toggleMovement() {
  moveSpeed *= -1;
}

function mouseClicked() {
  if (
    mouseX > randomColorButton.x &&
    mouseX < randomColorButton.x + randomColorButton.width &&
    mouseY > randomColorButton.y &&
    mouseY < randomColorButton.y + randomColorButton.height
  ) {
    assignRandomColors();
  } else {
    updateColors();
  }
}

function updateColors() {
  for (let i = 0; i < s1.value(); i++) {
    elementColors[i] = {
      red: rSlider.value(),
      green: gSlider.value(),
      blue: bSlider.value(),
    };
  }
}

function saveCanvasAsImage() {
  saveCanvas('myCanvas', 'png');
}

function keyPressed() {
  if (key === 'S' || key === 's') {
    saveCanvasAsImage();
  }
}

// 참고 코드 각주

// function setup() {
//   createCanvas(700, 700)
//   angleMode(DEGREES)
//   s1 = createSlider(1, 10, 5, 1).position(20, 735)
//   p1 = createP('Number of elements').position(20, 700)
//   s2 = createSlider(2, 8, 5, 1).position(200, 735)
//   p2 = createP('Number of parts').position(200, 700)
//   s3 = createSlider(3, 30, 3, 1).position(380, 735)
//   p3 = createP('Amount of fragments').position(380, 700)
//   s4 = createSlider(50, 300, 100, 10).position(20, 795)
//   p4 = createP('Minimum radius').position(20, 760)
//   s5 = createSlider(50, 300, 200, 10).position(200, 795)
//   p5 = createP('Maximum radius').position(200, 760)
//   s6 = createSlider(0.1, 1, 0.1, 0.05).position(380, 795)
//   p6 = createP('Rotation speed').position(380, 760)
// }

// function draw() {
//   background(150, 50, 20, 80)

//   translate(width / 2, height / 2)

//   noFill()

//   strokeWeight(8)

//   for (var n = 0; n < s1.value(); n++) {
//       stroke(150 + n * 20, 100 + n * 5, 50)
//       beginShape()
//       for (var i = 0; i < 360; i += s3.value()) {
//           var rad = map(sin(i * s2.value() + frameCount), -1, 1, s4.value(), s5.value())
//           var x = rad * cos(i)
//           var y = rad * sin(i)
//           vertex(x, y)
//       }
//       endShape(CLOSE)
//       rotate(frameCount * s6.value())
//   }
// }
