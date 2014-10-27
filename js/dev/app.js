$(document).ready(function() {

	/**
	 * Загрузка шаблонов
	 */
		$.get('/tpl/blocksTemp.html', function(tpl) {
			$.ajax({
				url: 'js/data.json'
			}).done(function(data){

				var json = data,
					source   = tpl,
					template = Handlebars.compile(source),
					html    = template(json);

				$('.portf-item').append(html);
			
			});
		});

		$.get('/tpl/popTemp.html', function(tpl) {
			$.ajax({
				url: 'js/data.json'
			}).done(function(data){

				var json = data,
					source   = tpl,
					template = Handlebars.compile(source),
					html    = template(json);

				$('body').append(html);
				$('[data-toggle="tooltip"]').tooltip({container: 'body'});
			
			});
		});

		$.get('/tpl/skillsTemp.html', function(tpl) {
			$.ajax({
				url: 'js/data.json'
			}).done(function(data){

				var json = data,
					source   = tpl,
					template = Handlebars.compile(source),
					html    = template(json);

				$('.skills-item').append(html);
				$('[data-toggle="tooltip"]').tooltip({container: 'body'});
			
			});
		});

	/**
	 * Навигация и скролинг
	 */
		$('a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			// }, 1500, 'easeInOutBack');
			event.preventDefault();
		});

		$(document).on("scroll", onScroll);
		function onScroll(){
			var scrollPos = $(document).scrollTop();
			$('.navbar-right li a').each(function () {
				var currLink = $(this);
				var currLi = $(this).closest('li');
				var refElement = $(currLink.attr("href"));
				if (refElement.offset().top <= scrollPos) {
					$('.navbar-right li').removeClass("active");
					currLi.addClass("active");
				}
			});
		}

		$(window).scroll(function() {
			var top = $(document).scrollTop();
			if (top < 200) {
				$(".navbar ").addClass('navbar-inverse');
			} else {
				$(".navbar ").removeClass('navbar-inverse');
			}
		});

});