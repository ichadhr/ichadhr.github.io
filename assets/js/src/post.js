jQuery(document).ready(function ($) {

  var $headings = $('#content h2, #content h3');

  $headings.each(function() {
    var $el = $(this);
    var id = $el.attr('id');
    if (id) {
      $el.prepend(
        $('<a />')
        .addClass('anchor')
        .attr('href', '#' + id)
        .html('#')
      );
    }
  });

  $('#top').on('click', function(e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: 0
      }, 700
    );
  });

  // keyboard shortcut previous (left) and next (right) navigation
  document.onkeydown = checkShortcuts;

  function checkShortcuts(event) {
    switch(event.keyCode){
        case 37:
            leftKeyPressed();
            break;
        case 39:
            rightKeyPressed();
            break;
        default:
            break;
    }
  }

  function leftKeyPressed(){
    document.getElementById("pgprev").click();
  }

  function rightKeyPressed(){
    document.getElementById("pgnext").click();
  }

});