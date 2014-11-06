$(document).ready(function() {
	/**
	 * Функции для дальнейшего подключения
	 */
	var tooltipFunction = function() {
		$('[data-toggle="tooltip"]').tooltip({container: 'body'});
	};

	var popoverFunction = function() {
		$('[data-toggle="popover"]').popover();
		$('body').on('click', function (e) {
			if ($(e.target).data('toggle') !== 'popover'
				&& $(e.target).parents('.popover.in').length === 0) {
				$('[data-toggle="popover"]').popover('hide');
			}
		});
	};

	var copyFunction = function() {
		if ($('.copy').length) {
			var client = new ZeroClipboard($('.copy'));
			client.on('ready', function(readyEvent) {
				client.on('aftercopy', function(event) {
					this === client;
					$('#contModal .modal-body').html(event.data['text/plain'] + ' скопировано в буфер');
					$('#contModal').modal('show');
				});
			});
		};
	};

	/**
	 * Загрузка шаблонов
	 */
		$.get('/tpl/blocksTpl.html', function(tpl) {
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

		$.get('/tpl/popTpl.html', function(tpl) {
			$.ajax({
				url: 'js/data.json'
			}).done(function(data){

				var json = data,
					source   = tpl,
					template = Handlebars.compile(source),
					html    = template(json);

				$('body').append(html);
				tooltipFunction();
				popoverFunction();
			
			});
		});

		$.get('/tpl/skillsTpl.html', function(tpl) {
			$.ajax({
				url: 'js/data.json'
			}).done(function(data){

				var json = data,
					source   = tpl,
					template = Handlebars.compile(source),
					html    = template(json);

				$('.skills-item').append(html);
				tooltipFunction();
			
			});
		});

		$.get('/tpl/contTpl.html', function(tpl) {
			$.ajax({
				url: 'js/data.json'
			}).done(function(data){

				var json = data,
					source   = tpl,
					template = Handlebars.compile(source),
					html    = template(json);

				$('.cont').append(html);
				tooltipFunction();
				AniJS.run();
				copyFunction();
	
			});
		});

	/**
	 * Навигация и скролинг
	 */
		$('nav a, .scroll-down a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 30
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
				if (refElement.offset().top - 30 <= scrollPos) {
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