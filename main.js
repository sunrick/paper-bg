var Animations = {};

animate();

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}
