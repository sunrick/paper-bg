var Proto = (function(){

  var selector = "[data-id=proto]";
  var score = 0;
  var current = 0;

  var questions = [
    { q: 'tu comer (present)' , a: 'comes' },
    { q: 'yo comer (present)' , a: 'como' },
    { q: 'el comer (present)' , a: 'come' }
  ]

  $(document).on('keyup', selector + ' ' + 'input', function(){
    var value = $(this).val();
    if( value === questions[current].a ) {
      score += 1;
      $(selector + ' ' + 'progress').attr('value', (score / questions.length) * 100)
      current += 1;
      if(current === questions.length) {
        $(this).hide();
        $(selector + ' ' + '.box .title').text("Congrats! You scored: " + (score / questions.length) * 100);
      } else {
        $(selector + ' ' + '.box .title').text(questions[current].q);
      }
      $(this).val('');
    }
  });

})();
