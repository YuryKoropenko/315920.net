var topMenuHeight;
var topSticky;
var scrollspyOffset;

$(function(){

    $("#header").sticky({topSpacing:0});
    
    $("#banner").modal("show");
    
    $("a[href='#call-request']").on("click", function(event) {
        $("#call-request").modal("show");
        return false;
    });
	
	$("a[href='#call-raschet']").on("click", function(event) {
        $("#call-raschet").modal("show");
        return false;
    });
    
    $("a[href='#call-serviceman']").on("click", function(event) {
        $("#call-serviceman").modal("show");
        return false;
    });
    
    $("input.phonebox").phonebox({
          showLocation: false,
          forceSeven: true
    });
    
    // фиксированное меню
    FixedMenu();
    
    // липкое меню
    StickyMenu();
    
    // следящее меню
    scrollspyOffset =  $('#blacktop').outerHeight() + $('#stickyMenu .navbar').outerHeight( );
    scrollspyOffset =  $('#blacktop').outerHeight() + ($('#blacktop').offset().top - $(window).scrollTop())  + $('#stickyMenu .navbar').outerHeight() + 50;
    $('body').scrollspy({ target: '.navbar', offset: scrollspyOffset });
    
    // прокрутка страницы
    $(window).scroll(function () {
        StickyMenu();
    });
    
    $('#myModal').modal();
    
});

// липкое меню
function StickyMenu() {

	if ( window.pageYOffset > 86 ) {
		$('#first-nav').addClass('fixed-menu1');
	}else{
		$('#first-nav').removeClass('fixed-menu1');
	}

	if ( window.pageYOffset > 130 ) {
		$('#stickyMenu .navbar').addClass('fixed-menu2');
	}else{
		$('#stickyMenu .navbar').removeClass('fixed-menu2');
	}	
			
}


// фиксированное меню            
function FixedMenu() {
    $('#blacktop').css({"position":"fixed"});
    if ($('#adminHeader').size()) {
        blacktopTop = $('#adminHeader').outerHeight() + $('#adminHeader').offset().top;
        $('#blacktop').offset({top:blacktopTop})
    }
}


// клик по меню с концигурациями окон на главной
$(function(){
    $("#stickyMenu a").click(function(){
        var sticky = $('#stickyMenu .navbar');
        var stickyTop = $('#blacktop').outerHeight() + $('#blacktop').offset().top;
        sticky.css({"position":"fixed"});
        //sticky.offset({top:stickyTop});
        sticky.offset({"top":"130px"});
		
        topSticky = $('#stickyMenu .navbar').outerHeight() + $('#stickyMenu .navbar').offset().top - $(window).scrollTop();
        topBlock = $($(this).attr("href")).offset().top - topSticky;
        $('html, body').stop().animate({ scrollTop: topBlock }, 1000);
        return false;
    });
});

// colorbox
$(document).ready(function(){
    $(".group").colorbox({rel:"group", maxWidth:"100%", maxHeight:"100%"});
    $(".colorbox").colorbox({iframe:true, rel:"group", maxWidth:"100%", maxHeight:"100%"});
    $(".colorbox_thumb").colorbox({maxWidth:"100%", maxHeight:"100%"});
}); 

$(function(){
  $('a[href*="vimeo.com"]').each(function() {
    $this = $(this);
    var href = 'http://player.vimeo.com/video/' + $this.attr('href').split('/').pop() + '?autoplay=1';
    $this.attr('href',href);
    $this.colorbox({
      iframe:true, 
      href: href,
      innerWidth:800, 
      innerHeight:450
    });
  });
});

// Функции для работы с Cookie
function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getCookie(name) {
  var cookie = " " + document.cookie;
  var search = " " + name + "=";
  var setStr = null;
  var offset = 0;
  var end = 0;
  if (cookie.length > 0) {
    offset = cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      end = cookie.indexOf(";", offset)
      if (end == -1) {
        end = cookie.length;
      }
      setStr = unescape(cookie.substring(offset, end));
    }
  }
  return(setStr);
}

// Title в полях
$(function(){ 
    // find all the input elements with title attributes
	$('input[title!=""]').hint();
    $('textarea[title!=""]').hint();
});
jQuery.fn.hint = function (blurClass) {
  if (!blurClass) { 
    blurClass = 'blur';
  }

  return this.each(function () {
    // get jQuery version of 'this'
    var $input = jQuery(this),

    // capture the rest of the variable to allow for reuse
      title = $input.attr('title'),
      $form = jQuery(this.form),
      $win = jQuery(window);

    function remove() {
      if ($input.val() === title && $input.hasClass(blurClass)) {
        $input.val('').removeClass(blurClass);
      }
    }

    // only apply logic if the element has the attribute
    if (title) { 
      // on blur, set value to title attr if text is blank
      $input.blur(function () {
        if (this.value === '') {
          $input.val(title).addClass(blurClass);
        }
      }).focus(remove).blur(); // now change all inputs to title

      // clear the pre-defined text when form is submitted
      $form.submit(remove);
      $win.unload(remove); // handles Firefox's autocomplete
    }
  });
};

// растягивание iframe для галереи
$(function(){
    $('iframe.galleria').load(function() {
        this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
        this.style.width  = this.contentWindow.document.body.offsetWidth + 'px';
        if(this.contentWindow.document.body.offsetHeight == 0) this.css("display", "none"); 
    });
});

// разворачивание и сворачивание спойлера
jQuery(document).ready(function(){
	jQuery('.spoiler-text').hide()
	jQuery('.spoiler-caption').click(function(){
		jQuery(this).toggleClass("folded").toggleClass("unfolded").next().slideToggle()
	})
})


// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function (event) {
    var that = $(this);
    that.on('click', onMapClickHandler);
    that.off('mouseleave', onMapMouseleaveHandler);
    that.find('iframe').css("pointer-events", "none");
}
var onMapClickHandler = function (event) {
    var that = $(this);
    // Disable the click handler until the user leaves the map area
    that.off('click', onMapClickHandler);
    // Enable scrolling zoom
    that.find('iframe').css("pointer-events", "auto");
    // Handle the mouse leave event
    that.on('mouseleave', onMapMouseleaveHandler);
}
$(function(){
    // Enable map zooming with mouse scroll when the user clicks the map
    $('.embed-container').find('iframe').css("pointer-events", "none");
    $('.embed-container').on('click', onMapClickHandler);
});