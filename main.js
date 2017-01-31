var Animations = {};

var Papers = [new paper.PaperScope(), new paper.PaperScope(), new paper.PaperScope()];

animate();

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}
