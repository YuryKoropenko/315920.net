$(document).ready(function() {
	$('.l-menu__item').hover(function() {
		$(this).addClass('l-menu__item-active');
		$(this).children('.l-menu__sub').stop(true, false).slideDown();
	}, function() {
		$(this).removeClass('l-menu__item-active');
		$(this).children('.l-menu__sub').stop(true, false).slideUp();
	});
});