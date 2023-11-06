let song;
let fft;

function preload() {
  song = loadSound('assets/sample-visualisation.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fft = new p5.FFT();
}

function draw() {
  if (getAudioContext().state !== 'running') {
    background(220);
    text('tap here to play some sound!', 10, 20, width - 20);
    return;
    }

  background(225);
  stroke(0);
  strokeWeight(1);

  translate(width / 2, height / 2);

  let wave = fft.waveform();

  beginShape()
  for(let i = 0; i<= 180; i++){
    let index = floor (map(i, 0, 180, 0, wave.length - 1))

    let r = map(wave[index], -1, 1, 150, 350)

    let x = r * sin (i);
    let y = r * cos (i);
    vertex (x, y)
  }
  endShape();

  beginShape()
  for(let i = 0; i<= 180; i++){
    let index = floor (map(i, 0, 180, 0, wave.length - 1))

    let r = map(wave[index], -1, 1, 150, 350)

    let x = r * -sin (i);
    let y = r * cos (i);
    vertex (x, y)
  }
  endShape();



}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause()
    fill(0)
    noLoop();
  } else {
    song.play()
    fill(0,0,255)
    loop();
  }
}
