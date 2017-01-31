Animations.explosion = (function(){

  // scope
  var scope = "[data-id=explosion]";

  // setup
  var colors = ['red', 'orange', 'yellow'];
  var currentColor = 0;
  var count = 200;

  // paperjs
  var canvas = document.getElementById('explosion');
  Papers[1].setup(canvas);

  ////////
  //code//
  ////////

  Papers[1].view.onMouseDown = function(event) {
    color = pickColor();
    for (var i = 0; i < count; i++) {
      var path = new Papers[1].Path.Circle({
        center: event.point,
        radius: 3,
        fillColor: color,
        opacity: 1
      });
      animation(path);
    }
  }

  function animation(path) {
    var randomPoint = Papers[1].Point.random().multiply(Papers[1].view.size);
    var position = { x: path.position.x, y: path.position.y };
    new TWEEN.Tween(position)
      .to({ x: randomPoint.x, y: randomPoint.y }, 300)
      .easing(TWEEN.Easing.Exponential.In)
      .onUpdate(
        function() {
          path.position.x = position.x;
          path.position.y = position.y;
        }
      ).start();
  }

  function pickColor() {
    var color = colors[currentColor];
    if (currentColor >= colors.length - 1) {
      currentColor = 0;
    } else {
      currentColor += 1;
    }
    return color;
  }

})();
