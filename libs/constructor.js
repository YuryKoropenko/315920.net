(function ($) {

    jQuery.fn.tf_constructor = function (options) {
        
        container = this;
        
        config = $.extend({
            constructor: 'window', // заказываем окно или балкон? {window,balkon}
            width: 0, // ширина
            height: 0, // высота
            type: 1, // тип {1,2,3}
            profile: {}, // профиль
            profile_type: {}, // массив типов профилей
            // для окна 1-одна створка, 2-две створки, 3-три створки 
            // для балкона 1-без створок, 2-две створки 
            
            // cтандартные настройки
            default_type: {
                window: {
                    type: 1,
                    type_1: {
                        width: 683,
                        height: 1350, 
                        min_width: 450,
                        max_width: 2100, 
                        min_height: 450,
                        max_height: 1600,
                    },
                    type_2: {
                        width: 1350,
                        height: 1350, 
                        min_width: 1000,
                        max_width: 1500,
                        min_height: 1000,
                        max_height: 1500,
                    },
                    type_3: {
                        width: 2000,
                        height: 1350,
                        min_width: 1700,
                        max_width: 2300,
                        min_height: 1000,
                        max_height: 1500,
                    },
                },
                balkon: {
                    type: 2,
                    type_1: {
                        width: 1500,
                        height: 2000,
                        min_width: 1200,
                        max_width: 2300,
                        min_height: 1900,
                        max_height: 2300,
                    },
                    type_2: {
                        width: 1500,
                        height: 2000,
                        min_width: 1200,
                        max_width: 2300,
                        min_height: 1900,
                        max_height: 2300,
                    },
                },
            },      
                 
            // секции для окона и балкона                  
            section_1: {
                type: 4, // тип секции у одинарного окна {1,2,3,4}
                // 1-глухое, 2-поворотное, 3-откидное, 4-поворотно-откидное
                setka: true, // сетка на окне с одной секцией
            },
            section_2: {
                type: 4, // тип секции у одинарного окна {1,2,3,4}
                // 1-глухое, 2-поворотное, 3-откидное, 4-поворотно-откидное
                setka: true, // сетка на окне с одной секцией
            },
            section_3: {
                type: 1, // тип секции у одинарного окна {1,2,3,4}
                // 1-глухое, 2-поворотное, 3-откидное, 4-поворотно-откидное
                setka: true, // сетка на окне с одной секцией
            },
            section_4: {
                type: 2, // тип секции у одинарного окна {1,2,3,4}
                // 1-глухое, 2-поворотное, 3-откидное, 4-поворотно-откидное
                setka: true, // сетка на окне с одной секцией
            },
            section_5: {
                type: 4, // тип секции у одинарного окна {1,2,3,4}
                // 1-глухое, 2-поворотное, 3-откидное, 4-поворотно-откидное
                setka: true, // сетка на окне с одной секцией
            },
        }, options); 
        
        // устанавливаем значения по умолчанию
        if(config.profile && config.profile_type[config.profile]) {
            config.constructor = config.profile_type[config.profile];
        };
        config.type = config.default_type[config.constructor]['type'];
        config.width = config.default_type[config.constructor]['type_' + config.type]['width']; 
        config.height = config.default_type[config.constructor]['type_' + config.type]['height'];      

        // выбор конфигурации
        container.find("ul.radio-group.configuration li.radio").on("click", function() {
            switch ($(this).parents('ul').data('tfVar')) {
                // меняем констуктор
                case 'constructor':
                    config.constructor = $(this).data('tfVal');
                    config.type = config.default_type[config.constructor]['type'];
                    config.width = config.default_type[config.constructor]['type_' + config.type]['width'];
                    config.height = config.default_type[config.constructor]['type_' + config.type]['height'];
                    break;
                // меняем тип
                case 'type':
                    config.type = $(this).data('tfVal');
                    config.width = config.default_type[config.constructor]['type_' + config.type]['width'];
                    config.height = config.default_type[config.constructor]['type_' + config.type]['height'];
                    break;
                // меняем профиль
                case 'profile':
                    config.profile = $(this).data('tfVal');
                    break;
                default:
                    break;
            };
            constructor(); // перезапускаем конструктор
            return false;
        });
    
        // конфигурация секций
        container.find("ul.radio-group.section-type li.radio").on("click", function() {
            config[$(this).parents('ul').data('tfVar')]['type'] = $(this).data('tfVal');
            constructor(); // перезапускаем конструктор
            return false;
        });
        
        // сетка для секции
        container.find(".tf_checkbox").on("click", function() {
            if (config[$(this).data('tfVar')]['setka']) {
                config[$(this).data('tfVar')]['setka'] = false;
            }
            else {
                config[$(this).data('tfVar')]['setka'] = true;
            }
            constructor(); // перезапускаем конструктор
            return false;
        });
        
        constructor(); // запускаем конструктор

    }
        
    // выводим конфигурацию
    function show_config(){
        console.log('----------------------');
        console.log('constructor: ' + config.constructor);
        console.log('       type: ' + config.type);
        console.log('    profile: ' + config.profile);
        console.log('      width: ' + config.width);
        console.log('     height: ' + config.height);
        console.log('section 1 {type: ' + config.section_1.type + '; setka: ' + config.section_1.setka + '}');
        console.log('section 2 {type: ' + config.section_2.type + '; setka: ' + config.section_2.setka + '}');
        console.log('section 3 {type: ' + config.section_3.type + '; setka: ' + config.section_3.setka + '}');
        console.log('section 4 {type: ' + config.section_4.type + '; setka: ' + config.section_4.setka + '}');
        console.log('section 5 {type: ' + config.section_5.type + '; setka: ' + config.section_5.setka + '}');
    }
    
    // конструктор
    function constructor(){
        
        // устанавливаем профиль
        if(typeof(config.profile) !== "undefined") {
            if(container.find('ul.radio-group.profile-type li.' + config.constructor + '[data-tf-val="' + config.profile + '"]').length>0) {
            }
            else {
                config.profile = container.find('ul.radio-group.profile-type li.' + config.constructor).filter(":first").data('tfVal');
            }
        }
        else {
            config.profile = container.find('ul.radio-group.profile-type li.' + config.constructor).filter(":first").data('tfVal');
        }
        if(typeof(config.profile) !== "undefined") {
            window.location.hash = config.profile;
        }
        
        // изменение ширины
        width_range = {
            range: container.find('.width-range .slider-range'),
            input: container.find('.width-range input'),
            min: config.default_type[config.constructor]['type_' + config.type]['min_width'],
            max: config.default_type[config.constructor]['type_' + config.type]['max_width'],
        };
        width_range.input.val(config.width);
        width_range.range.find('.min-range').text(width_range['min']);
        width_range.range.find('.max-range').text(width_range['max']);
        width_range.range.slider({
            range: "max",
            min: width_range.min,
            max: width_range.max,
            value: width_range.input.val(),
            slide: function( event, u ) {
                width_range.input.val( u.value );
                config.width = u.value;
            },
            stop: function( event, u ) {
                constructor();
            }
        });
        width_range.input.change(function(){
            value = parseInt($(this).val());
            if((value <= width_range.max) && (value >= width_range.min)){
                width_range.range.slider({range: "max", value: value});
                config.width = value;
                $(this).val(config.width);
                constructor();
            } else {
                $(this).val(config.width);
            }
        });
        
        // изменение высоты
        height_range = {
            range: container.find('.height-range .slider-range'),
            input: container.find('.height-range input'),
            min: config.default_type[config.constructor]['type_' + config.type]['min_height'],
            max: config.default_type[config.constructor]['type_' + config.type]['max_height'],
        };
        height_range.input.val(config.height);
        height_range.range.find('.min-range').text(height_range['min']);
        height_range.range.find('.max-range').text(height_range['max']);
        height_range.range.slider({
            orientation: "vertical",
            range: "max",
            min: height_range.min,
            max: height_range.max,
            value: height_range.input.val(),
            slide: function( event, u ) {
                height_range.input.val( u.value );
                config.height = u.value;
            },
            stop: function( event, u ) {
                constructor();
            }
        });
        height_range.input.change(function(){
            value = parseInt($(this).val());
            if((value <= height_range.max) && (value >= height_range.min)){
                height_range.range.slider({range: "max", value: value});
                config.height = value;
                $(this).val(config.height);
                constructor();
            } else {
                $(this).val(config.height);
            }
        });
        
        //config.profile = container.find('ul.radio-group.profile-type li.' + config.constructor).filter(":first").data('tfVal');
        
        // выводим конфигурацию
        show_config();
        
        // формируем результат конструктора
        container.removeClass();
        container.addClass('tf-constructor');
        container.addClass(config.constructor);
        container.addClass('type-' + config.type);
        // конфигурация секции 1
        container.addClass('section_1-' + config.section_1.type);
        if(config.section_1.setka) { container.addClass('section_1_setka'); }
        // конфигурация секции 2
        container.addClass('section_2-' + config.section_2.type);
        if(config.section_2.setka) {  container.addClass('section_2_setka'); }
        // конфигурация секции 3
        container.addClass('section_3-' + config.section_3.type);
        if(config.section_3.setka) { container.addClass('section_3_setka'); }
        // конфигурация секции 4
        container.addClass('section_4-' + config.section_4.type);
        if(config.section_4.setka) { container.addClass('section_4_setka'); }
        // конфигурация секции 5
        container.addClass('section_5-' + config.section_5.type);
        if(config.section_5.setka) { container.addClass('section_5_setka'); }
        
        // устанавливаем checked
        container.find('.tf_checkbox').each(function() {
            if(config[$(this).data('tfVar')]['setka']) {
                $(this).addClass("checked");
            }
            else {
                $(this).removeClass("checked");            
            }
        });
        
        // устанавливаем radio selected для типа секции
        container.find('ul.radio-group.section-type').each(function() {
            $(this).find('li.radio').removeClass("selected");
            $(this).find('li.radio[data-tf-val='+ config[$(this).data('tfVar')]['type'] + ']').addClass("selected");
            $('ul.radio-group[data-tf-var="' + $(this).data('tfVar') + '"] li.highlighted span').removeClass("active");
            $('ul.radio-group[data-tf-var="' + $(this).data('tfVar') + '"] li.highlighted span.type-' + config[$(this).data('tfVar')]['type']).addClass("active");
            
            if(config[$(this).data('tfVar')]['type'] == 1){
                $(this).parent().find('.tf_setka').addClass("hidden");
            }
            else {
                $(this).parent().find('.tf_setka').removeClass("hidden");
            }
        });
        
        // устанавливаем radio selected для конфигурации
        container.find('ul.radio-group.configuration').each(function() {
            $(this).find('li.radio').removeClass("selected");
            $(this).find('li.radio[data-tf-val='+ config[$(this).data('tfVar')] + ']').addClass("selected");
        });
        
        // делаем выборку пунктов для конфигурации
        container.find('ul.radio-group.profile-type li').css({"display":"none"});
        container.find('ul.radio-group.profile-type li.' + config.constructor).css({"display":"inline-block"});
        
        // запрашиваем стоимость
        jQuery.ajax({
        type : "post",
        dataType : "html",
        url : '/ajax/constructor.php',
        data : {
            constructor: config.constructor,
            profile: config.profile,
            width: config.width,
            height: config.height,
            type: config.type,
            section_1_type:config.section_1.type,
            section_1_setka:config.section_1.setka,
            section_2_type:config.section_2.type,
            section_2_setka:config.section_2.setka,
            section_3_type:config.section_3.type,
            section_3_setka:config.section_3.setka,
            section_4_type:config.section_4.type,
            section_4_setka:config.section_4.setka,
            section_5_type:config.section_5.type,
            section_5_setka:config.section_5.setka,
        },
        success: function(response) {
            jQuery('.ft_constructor_price').html(response);
        }
    });
        
    }

})(jQuery);