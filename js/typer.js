var Typer = (function(){
  var scope = "[data-id=typer]";
  var textArea = "textarea";
  var button = '[data-id=button]';
  var typeMe = '[data-id=type-me]';
  var i = 0;
  var paused = true;
  var done = false;
  var latest;

  var inputs = [];

  $(document).on('keypress', 'textarea', function(event){
    inputs.push({ time: new Date().getTime(), key: event.which })
  });

  function typeLetter(){
    $(document).trigger('typer:type', i);
    if ( !done && typeof inputs[i+1] !== "undefined") {
      var delay = inputs[i+1].time - inputs[i].time;
      latest = setTimeout(typeLetter, delay);
      i++;
    } else {
      done = true;
    }
  }

  $(document).on('typer:type', function(e, i){
    if (inputs[i].key === 13) {
      $(scope + ' ' + typeMe).append('<br/>');
    } else {
      $(scope + ' ' + typeMe).append('<span>' +  String.fromCharCode(inputs[i].key) + '</span>');
    }
  });

  $(document).on('click', scope + ' ' + button, function(){
    if (paused) {
      $(this).text('Reset');
      $(scope + ' ' + 'textarea').hide().val('');
      $(scope + ' ' + typeMe).show();
      done = false;
      typeLetter();
    } else {
      $(this).text('Play');
      $(scope + ' ' + typeMe).hide().empty();
      $(scope + ' ' + 'textarea').show();
      inputs = [];
      i = 0;
      done = true;
      clearTimeout(latest);
    }
    paused = !paused;
  });

})();
