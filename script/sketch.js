let elementColors = [];
let randomColorButton;
let moveButton; // New button for movement
let saveImageButton; // New button for saving the canvas as an image
let moveSpeed = 1; // Initial movement speed

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  angleMode(DEGREES);

  let sliderX = 200;
  let sliderY = 250; // Initial y-position for the first slider

  s1 = createSlider(1, 15, 15, 1).position(sliderX, sliderY);
  p1 = createP('elements').position(sliderX, s1.y + 5);

  sliderY += 60; // Adjust y-position for the next slider
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

  // Additional sliders for the user to control RGB values
  sliderY += 100;
  rSlider = createSlider(0, 255, 127).position(sliderX, sliderY);
  pR = createP('Red').position(sliderX, rSlider.y + 5);

  sliderY += 60;
  gSlider = createSlider(0, 255, 127).position(sliderX, sliderY);
  pG = createP('Green').position(sliderX, gSlider.y + 5);

  sliderY += 60;
  bSlider = createSlider(0, 255, 127).position(sliderX, sliderY);
  pB = createP('Blue').position(sliderX, bSlider.y + 5);

  // Create Random Color button
  randomColorButton = createButton('Random Color').position(
    sliderX,
    sliderY + 60
  );
  randomColorButton.mousePressed(assignRandomColors);

  // Create Move button
  moveButton = createButton('Change move type').position(
    sliderX,
    sliderY + 100
  );
  moveButton.mousePressed(toggleMovement);

  // Initialize colors for each element
  for (let i = 0; i < s1.value(); i++) {
    elementColors.push({
      red: rSlider.value(),
      green: gSlider.value(),
      blue: bSlider.value(),
    });
  }

  // Create Save Image button
  saveImageButton = createButton('Save Image').position(sliderX, sliderY + 180);
  saveImageButton.mousePressed(saveCanvasAsImage);
  // Apply custom style to the Save Image button
  saveImageButton.style('background-color', '#4CAF50'); // Change color to green
  saveImageButton.style('color', 'white'); // Change text color to white
}

function draw() {
  background('black');
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(3.5);

  for (let n = 0; n < s1.value(); n++) {
    // Set stroke color for the current element
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
  // Assign random colors to each element
  for (let i = 0; i < s1.value(); i++) {
    elementColors[i] = {
      red: random(255),
      green: random(255),
      blue: random(255),
    };
  }
}

function toggleMovement() {
  // Toggle movement by changing the sign of moveSpeed
  moveSpeed *= -1;
}

function mouseClicked() {
  // Check if the mouse is over the Random Color button
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
  // Update colors for each element based on user sliders
  for (let i = 0; i < s1.value(); i++) {
    elementColors[i] = {
      red: rSlider.value(),
      green: gSlider.value(),
      blue: bSlider.value(),
    };
  }
}

function saveCanvasAsImage() {
  // Save the canvas as an image file
  saveCanvas('myCanvas', 'png');
}

function keyPressed() {
  // Save canvas when the 'S' key is pressed
  if (key === 'S' || key === 's') {
    saveCanvasAsImage();
  }
}
