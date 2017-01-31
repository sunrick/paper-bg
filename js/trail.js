Animations.trail = (function(){

  // scope
  var scope = "[data-id=trail]";

  //setup
  var lastPoint;

  // paperjs
  var canvas = document.getElementById('trail');
  // var myPaper = Papers[2];
  Papers[2].setup(canvas);

  ////////
  //code//
  ////////

  Papers[2].view.onMouseMove = function(event) {
    var vector = event.point.subtract(lastPoint);
    if (vector.length > 10) {
      var path = new Papers[2].Path.Circle({
        center: event.point,
        radius: 3,
        fillColor: 'red'
      });
      animation(path);
      lastPoint = event.point;
    }
  }

  function animation(path) {
    var state = { opacity: 1 };
    new TWEEN.Tween(state)
      .to({ opacity: 0 }, 300)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(
        function() {
          path.opacity = state.opacity;
        }
      ).onComplete(function(){
        path.remove();
      }).start();
  }

})();
