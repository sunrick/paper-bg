var count = 150;
var height = 100;
var waveSpeed = 1;
var horizontalSpeed = 10;
var rotation = 1;

// Get a reference to the canvas object
var canvas = document.getElementById('dog');

var myPaper = new paper.PaperScope();
// Create an empty project and a view for the canvas:
myPaper.setup(canvas);
// Create a Paper.js Path to draw a line into it:

var path = new myPaper.Path.Rectangle({
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  // radius: 10,
  fillColor: 'white',
  opacity: 0.1
});

var symbol = new myPaper.Symbol(path);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
  // The center position is a random point in the view:
  var center = myPaper.Point.random().multiply(myPaper.view.size);
  var placedSymbol = symbol.place(center);
  placedSymbol.scale(i / count);
}


myPaper.view.onFrame = function(event) {
  // Run through the active layer's children list and change
  // the position of the placed symbols:
  for (var i = 0; i < count; i++) {
    var item = myPaper.project.activeLayer.children[i];

    item.position.x += (horizontalSpeed / item.bounds.width);

    var sinus = Math.sin(event.time * waveSpeed + i);

    item.position.y = (sinus * (myPaper.view.size.height / 2) + myPaper.view.size.height / 2);

    item.rotate(rotation);

    if (horizontalSpeed > 0) {
      if (item.bounds.left > myPaper.view.size.width) {
        item.position.x = -item.bounds.width;
      }
    } else if (horizontalSpeed < 0) {
      if (item.bounds.right < 0) {
        item.position.x = view.size.width;
      }
    }

  }
}

function changeRotation() {
  rotation = horizontalSpeed * 0.1;
}

myPaper.view.onKeyDown = function(event) {
  if (event.key === 'right') {
    horizontalSpeed += 3;
    changeRotation();
  } else if (event.key === 'left') {
    horizontalSpeed -= 3;
    changeRotation();
  }
}

// Draw the view now:
myPaper.view.draw();


