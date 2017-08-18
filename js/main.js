Number.prototype.format =function(n, x, s, c){
	var re ='\\d(?=(\\d{'+(x ||3)+'})+'+(n >0?'\\D':'$')+')',
        num =this.toFixed(Math.max(0,~~n));
	return(c ? num.replace('.', c): num).replace(new RegExp(re,'g'),'$&'+(s ||','));
};

$( window ).resize(function(){
	/*logo-script*/
	if ($(window).width() < 767) {
		$('#logo img').attr('src', '/img/mob-header_logo.png');
		$('#logo img').css('width', 'auto');
		$('#logo').css({
			'display': 'inline-block',
			'width': 'auto'
		});
		$('.block-logo').css('text-align', 'center');
	}
	/*logo-script END*/
})


$(document).ready(function() {
   $('.l-menu__link').on('click', function() {
       $(this).parent('.l-menu__item').toggleClass('l-menu__item-active');
       $(this).parent('.l-menu__item').children('.l-menu__sub').stop(true, false).slideToggle();
       return false;
   })
	$('.mob-menu .red_bg').on('click', function() {
		$('.mob-menu__list').slideToggle();
	});
	$('.mob-l-menu a').on('click', function() {
		$(this).toggleClass('active');
		$('.l-menu').slideToggle();
		return false;
	});
	
	/*popup*/
	$('.order-call a,.callback').on('click', function() {
		$('.b-popup-callback').fadeIn(700);
		$('.popup-bg').fadeIn(500);
		return false;
	});
	$('#menu-item-serviceman a,#free_zam').on('click', function() {
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
	
});

$(document).ready(function() {
	$('.t-slider').slick({
		asNavFor: '.b-slider'
	});
	$('.b-slider').slick({
		slidesToShow: 5,
		arrows: false,
		focusOnSelect: true,
		asNavFor: '.t-slider'
	});

	$('.single_image').fancybox();
});

function showMessage(mess){
	$('.message #text_message').text(mess);
	$('.message').fadeIn(700);
	$('.b-popup:not(.message)').fadeOut(500);
	return false;
}

//	Test

function nextStep(currentStep){
	var newStep = ++currentStep;
	if($("#step_" + newStep).length)
		showNumStep(newStep);	
	return false;
}

function prevStep(currentStep){
	var newStep = --currentStep;
	if($("#step_" + newStep).length)
		showNumStep(newStep);
	return false;
}

function showNumStep(num){
	$("div[id ^= step_]").each(function(i, e){
		$(e).addClass('hidden');
	})
	
	if($("#step_" + num).hasClass('price_result'))
		getPrice();
	
	$("#step_" + num).removeClass('hidden');
	return false;
}

function getPrice(){
	var form = $('#test_form'),
		all_price = Number(form.find("input[name = base_price]:checked").val()),
		added_price = 3200;

	form.find("input[name ^= koef_]:checked").each(function(i, e){
		val = Number($(e).val());
		if(!isNaN(val)){
			all_price *= val;
		}
			
	})
	price_format = all_price.format(2,3,' ','.');
	split = price_format.toString().split('.');
	if(split[1] == '00')
		price_format = split[0];
	$('#all_price_text').text(price_format);
	
	all_price += added_price;
	price_format = all_price.format(2,3,' ','.');
	split = price_format.toString().split('.');
	if(split[1] == '00')
		price_format = split[0];
	$('#price_with_typ_work_text').text(price_format);
}

function showCallEngineer(){
	$('#container').addClass('hidden');
	$('#call_engineer').removeClass('hidden');
	return false;
}
function hideCallEngineer(){
	showNumStep(1);
	$('#call_engineer').addClass('hidden');
	$('#container').removeClass('hidden');
	return false;
}
function showTypWork(){
	hideCallEngineer();
	$('#container').addClass('hidden');
	$('#price_with_typ_work').removeClass('hidden');
	return false;
}
function hideTypWork(){
	showNumStep(1);
	hideCallEngineer()
	$('#price_with_typ_work').addClass('hidden');
	$('#container').removeClass('hidden');
	return false;
}

$(document).ready(function(){
	$.each(['#price_with_typ_work_form', '#call_engineer_form', '#without_install_form'], function(ind, f_id){
		$(f_id).submit(function(){
			var form = $(this);
			if(form.find('[name = agree]').prop('checked')){
				var questions = '';
				
				$('#test_form div[id ^= step_]').each(function(i, e){
					step = $(e);
					num = step.attr('step');
					title = step.find("[id ^= step_question_]").val();
					
					if(step.find('input[name ^= koef_]:checked').length){
						val = '';
						step.find('input[name ^= koef_]:checked').each(function(ind, el){
							val += $(el).next().text().trim() + ', ';
						})
						val = val.slice(0, -2);
						//val = step.find('input[name ^= koef_]:checked').next().text().trim();
					} else {
						val = step.find('input[name = base_price]:checked').next().text().trim();
					}
					if(val)
						questions += title + ': ' + val + "|";
				})
				if(questions.length){
					price = f_id == '#price_with_typ_work_form' ? $('#price_with_typ_work_text').text() : $('#all_price_text').text();
					questions += '||Стоимость: ' + price;
				}
				$.post(form.attr('action'), form.serialize() + '&QUESTIONS=' + questions, function(resplonse){
					if(resplonse.type == 'ok')
						showMessage(resplonse.mess)
				})
			}
			return false;
		})
	})
	
	//	Callback
	$.each(['#callback', '#free__measure'], function(ind, f_id){
		$(f_id).submit(function(){
			var form = $(this);
			$.post(form.attr('action'), form.serialize(), function(resplonse){
				if(resplonse.type == 'ok')
					showMessage(resplonse.mess)
			})
			return false;
		})
	})
	
})












