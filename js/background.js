Animations.background = (function(){

  // intialize variables
  var scope = "[data-id=background]";
  var count = 100;
  var height = 100;
  var waveSpeed = 1;
  var horizontalSpeed = 10;
  var rotation = 1;
  var paused = true;
  var canvas = document.getElementById('background');
  var viewWidth;
  var viewHeight;
  Papers[0].setup(canvas);

  function init() {
    addSymbols();
    viewWidth = Papers[0].view.size.width;
    viewHeight = Papers[0].view.size.height;
    Papers[0].view.onKeyDown = onKeyDownHandler;
    Papers[0].view.onFrame = onFrameHandler;
    Papers[0].view.pause();
    $(document).on('click', scope + " " + "[data-id=play-toggle]", playToggleHandler);
    $(document).on('click', scope + " " + "[data-id=left]", leftHandler)
    $(document).on('click', scope + " " + "[data-id=right]", rightHandler)
    $(window).on('resize', resizeHandler);
  }

  function addSymbols() {
    var path = new Papers[0].Path.Rectangle({
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      fillColor: 'white',
      opacity: 0.1
    });
    var symbol = new Papers[0].Symbol(path);
    for (var i = 0; i < count; i++) {
      var center = Papers[0].Point.random().multiply(Papers[0].view.size);
      var placedSymbol = symbol.place(center);
      placedSymbol.scale(i / count);
    }
  }

  function onFrameHandler(event) {
     for (var i = 0; i < count; i++) {

      var item = Papers[0].project.activeLayer.children[i];
      var sinus = Math.sin(event.time * waveSpeed + i);

      item.position.x += (horizontalSpeed / item.bounds.width);
      item.position.y = (sinus * viewHeight / 2) + (viewHeight / 2);
      item.rotate(rotation);

      if (horizontalSpeed > 0) {
        if (item.bounds.left > viewWidth) {
          item.position.x = -item.bounds.width;
        }
      } else if (horizontalSpeed < 0) {
        if (item.bounds.right < 0) {
          item.position.x = viewWidth;
        }
      }

    }
  }

  function onKeyDownHandler(event) {
    if (event.key === 'right') {
      horizontalSpeed += 3;
    } else if (event.key === 'left') {
      horizontalSpeed -= 3;
    }
  }

  function resizeHandler() {
    viewWidth = Papers[0].view.size.width;
    viewHeight = Papers[0].view.size.height;
  }

  function playToggleHandler() {
    $(this).blur();
    if(paused) {
      Papers[0].view.play();
      $(this).text('Pause');
    } else {
      Papers[0].view.pause();
      $(this).text('Play');
    }
    paused = !paused;
  }

  function leftHandler() {
    $(this).blur();
    horizontalSpeed -= 10;
    rotation = horizontalSpeed * 0.1;
  }

  function rightHandler() {
    $(this).blur();
    horizontalSpeed += 10;
    rotation = horizontalSpeed * 0.1;
  }

  return {
    init: init
  }

})();

Animations.background.init();

