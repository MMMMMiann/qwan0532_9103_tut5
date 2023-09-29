# qwan0532_9103_tut5

# Quiz 8
## PART 1

![ART & CODE 8](/assets/part%201.1.png "imaging technique I found.")
![ART & CODE 8](/assets/part%201.2.png "imaging technique I found.")
**ART & CODE 8**\
**link: https://artcode8.com/#side**

#### This webpage is an online exhibition introduction homepage. Viewed from a plane, this is a figure composed of multiple circles of different sizes. Viewed as a three-dimensional pattern, irregular circles become cylinders, which are cut into unique shapes. And in both modes, the graphics are constantly rotating around the center. I think this is an interesting design example of converting flat graphics into three-dimensional patterns. Because the artworks provided in the assignment are all flat, how to display these artworks in more dimensions is a direction that can be considered.

## PART 2

function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(250);

  translate(-240, -100, 0);
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  plane(70);
  pop();


  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  cylinder(70, 70);
  pop();


  translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(70, 20);
  pop();

}
