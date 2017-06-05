jQuery(document).ready(function ($) {

  // Contact

  function R(s) {
    return R13(R5(s));
  }

  function R5(s) {
    var b = [], c, i = s.length, a = '0'.charCodeAt(), z = a + 10;
    while (i--) {
      c = s.charCodeAt(i);
      if (c >= a && c < z) { b[i] = String.fromCharCode(((c - a + 5) % (10)) + a); }
      else { b[i] = s.charAt(i); }
    }
    return b.join('');
  }

  function R13(s) {
    var b = [], c, i = s.length, a = 'a'.charCodeAt(), z = a + 26, A = 'A'.charCodeAt(), Z = A + 26;
    while (i--) {
      c = s.charCodeAt(i);
      if (c >= a && c < z) { b[i] = String.fromCharCode(((c - a + 13) % (26)) + a); }
      else if (c >= A && c < Z) { b[i] = String.fromCharCode(((c - A + 13) % (26)) + A); }
      else { b[i] = s.charAt(i); }
    }
    return b.join('');
  }

  var $c = $('#contact a');
  var t = 'znvygb:'
  var m = 'ookqrfvta@tznvy.pbz';
  $c.attr('href', R(t+m));

  // Tooltips

  $('.icons a').tooltip();

  // Dates

  var todayDate = new Date();
  var todayYear = todayDate.getFullYear();
  $('.today-year').text(todayYear);
  $('.css-years').text(todayYear - 2007);

  // Filters

  var $posts = $('.list article');
  var $filters = $('.filters li a');
  var $categories = $('.categories li a');
  var $introductions = $('.introductions li a');
  var displayed = ['.post', ''];
  var animating = false;

  function Sort(target) {
    animating = true;
    $posts.not(displayed.join('')).slideUp(250, 'easeOutExpo');;
    $posts.filter(displayed.join('')).slideDown(250, 'easeOutExpo');
    target.parent().siblings().find('a').removeClass('on');
    target.addClass('on');
    setTimeout(function(){ animating = false; }, 300);
  }

  $introductions.click(function() {
    $posts.toggleClass('compact');
    $(this).toggleClass('on');
  });

  $filters.click(function() {
    if (animating) {
      return;
    }
    displayed[0] = '.' + $(this).data('view');
    Sort($(this));
  });

  $categories.click(function() {
    if (animating) {
      return;
    }
    var view = ($(this).data('view')) ? '.' + $(this).data('view') : '';
    displayed[1] = view;
    Sort($(this));
  });

  // Periods

  $('.year, .season').each(function() {
    $(this).affix({
      offset: {
        top: $(this).offset().top
      }
    });
  });

  // Favorites

  var $favorites_controls = $('#favorites-controls ul a');
  var $favorites_lists = $('.favorites-list');
  var current_favorites_list = Cookies.get('favorites_list') ? Cookies.get('favorites_list') : 'gameboy';

  function View(list) {
    $favorites_lists.hide();
    $favorites_controls.removeClass('on');
    current_favorites_list = list;
    Cookies.set('favorites_list', current_favorites_list, { expires: 30, path: '/' });
    $favorites_lists.filter('[data-name='+current_favorites_list+']').show();
    $favorites_controls.filter('[data-list='+current_favorites_list+']').addClass('on');
  }

  View(current_favorites_list);

  $favorites_controls.click(function() {
    var list = $(this).data('list');
    View(list);
    return false;
  });

});
