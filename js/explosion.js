Animations.explosion = (function(){

  // scope
   var scope = "[data-id=explosion]";

  // setup
  var colors = ['red', 'orange', 'yellow'];
  var currentColor = 0;
  var count = 200;

  // paperjs
  var canvas = document.getElementById('explosion');
  var myPaper = new paper.PaperScope();
  myPaper.setup(canvas);
  viewWidth = myPaper.view.size.width;
  viewHeight = myPaper.view.size.height;

  ////////
  //code//
  ////////

  myPaper.view.onMouseDown = function(event) {
    color = pickColor();
    for (var i = 0; i < count; i++) {
      var path = new myPaper.Path.Circle({
        center: event.point,
        radius: 3,
        fillColor: color,
        opacity: 1
      });
      animation(path);
    }
  }

  function animation(path) {
    var randomPoint = myPaper.Point.random().multiply(myPaper.view.size);
    var position = { x: path.position.x, y: path.position.y };
    new TWEEN.Tween(position)
      .to({ x: randomPoint.x, y: randomPoint.y }, 300)
      .easing(TWEEN.Easing.Exponential.In)
      .onUpdate(
        function() {
          path.position.x = position.x;
          path.position.y = position.y;
        }
      )
      .start();
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
