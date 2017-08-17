$(document).ready(function() {
	$('.l-menu__item').hover(function() {
		$(this).addClass('l-menu__item-active');
		$(this).children('.l-menu__sub').stop(true, false).slideDown();
	}, function() {
		$(this).removeClass('l-menu__item-active');
		$(this).children('.l-menu__sub').stop(true, false).slideUp();
	});

	$('.mob-menu .red_bg').on('click', function() {
		$('#header-menu').slideToggle();
	});

	$('.mob-l-menu a').on('click', function() {
		$(this).toggleClass('active');
		$('.l-menu').slideToggle();
		return false;
	});

	/*popup*/
	$('.order-call a').on('click', function() {
		$('.b-popup-callback').fadeIn(700);
		$('.popup-bg').fadeIn(500);
		return false;
	});
	$('#menu-item-serviceman a').on('click', function() {
		$('.b-popup-master').fadeIn(700);
		$('.popup-bg').fadeIn(500);
		return false;
	});

	$('.b-popup__close').on('click', function() {
		$('.b-popup').fadeOut(500);
		$('.popup-bg').fadeOut(700);
	});
	$('.popup-bg').on('click', function() {
		$('.b-popup').fadeOut(500);
		$(this).fadeOut(700);
	});

	/*logo-script*/
	if ($(window).width() < 767) {

		$('#logo img').attr('src', 'img/mob-header_logo.png');
		$('#logo img').css('width', 'auto');
		$('#logo').css({
			'display': 'inline-block',
			'width': 'auto'
		});
		$('.block-logo').css('text-align', 'center');
	}
	/*logo-script END*/
});