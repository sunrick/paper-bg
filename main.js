var Background = (function(){

  // intialize variables
  var count = 50;
  var height = 100;
  var waveSpeed = 1;
  var horizontalSpeed = 10;
  var rotation = 1;
  var paused = true;
  var canvas = document.getElementById('dog');
  var myPaper = new paper.PaperScope();
  myPaper.setup(canvas);

  function init() {
    addSymbols();
    myPaper.view.onKeyDown = onKeyDownHandler;
    myPaper.view.onFrame = onFrameHandler;
    myPaper.view.pause();
    $(document).on('click', "[data-id=play-toggle]", playToggleHandler);
  }

  function addSymbols() {
    var path = new myPaper.Path.Rectangle({
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      fillColor: 'white',
      opacity: 0.1
    });
    var symbol = new myPaper.Symbol(path);
    for (var i = 0; i < count; i++) {
      var center = myPaper.Point.random().multiply(myPaper.view.size);
      var placedSymbol = symbol.place(center);
      placedSymbol.scale(i / count);
    }
  }

  function onFrameHandler(event) {
     for (var i = 0; i < count; i++) {

      var item = myPaper.project.activeLayer.children[i];
      var sinus = Math.sin(event.time * waveSpeed + i);

      item.position.x += (horizontalSpeed / item.bounds.width);
      item.position.y = (sinus * (myPaper.view.size.height / 2) + myPaper.view.size.height / 2);
      item.rotate(rotation);

      if (horizontalSpeed > 0) {
        if (item.bounds.left > myPaper.view.size.width) {
          item.position.x = -item.bounds.width;
        }
      } else if (horizontalSpeed < 0) {
        if (item.bounds.right < 0) {
          item.position.x = myPaper.view.size.width;
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
    rotation = horizontalSpeed * 0.1;
  }

  function playToggleHandler() {
    $(this).blur();
    if(paused) {
      myPaper.view.play();
      $(this).text('Pause');
    } else {
      myPaper.view.pause();
      $(this).text('Play');
    }
    paused = !paused;
  }

  return {
    init: init
  }

})();

Background.init();

