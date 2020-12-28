(function ($) {

	"use strict";


	// Page Transitions
	initPageTransition();



	// Thumbnail Gallery
	[].forEach.call(document.querySelectorAll('.thumbnail-gallery-wrapper'), function (wrapper) {
		var thumbImgs = new Swiper('.thumbnail-gallery-wrapper .thumbnails .swiper-container', {
			slidesPerView: 'auto',
			mousewheel: true,
			freeMode: true,
			scrollbar: {
				el: '.swiper-scrollbar'
			}
		});
		function thumbnailSync() {
			thumbImgs.slideTo(this.realIndex, 300);
			$('.thumbnail-gallery-wrapper .thumbnails .swiper-slide').removeClass('is-active');
			thumbImgs.slides[this.realIndex].classList.add('is-active');
		}
		window.addEventListener('load', function() {
			var galleryImgs = new Swiper('.thumbnail-gallery-wrapper .full-images .swiper-container', {
				effect: 'fade',
				loop: true,
				keyboard: true,
				on: {
					init: thumbnailSync,
					slideChange: thumbnailSync,
				},
				autoplay: {
					delay: 5000
				}
			});
			
			[].forEach.call(thumbImgs.slides, function (item, index) {
				item.addEventListener('click', function () {
					galleryImgs.slideToLoop(index, 600);
				});
			});
		});

		$(wrapper).on('click', '.thumbs-btn', function () {
			wrapper.classList.toggle('thumbs-visible');
		});
	});



	// Horizontal Albums
	[].forEach.call(document.querySelectorAll('.horizontal-album .swiper-container'), function (swiper) {
		new Swiper(swiper, {
			slidesPerView: 'auto',
			spaceBetween: 1,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			freeMode: true,
			mousewheel: {
				forceToAxis: true,
				invert: true,
			}
		});
	});



	// Filterable Swiper
	var filterableSwiper = new Swiper('.horizontal-gallery-slider', {
		slidesPerView: 'auto',
		mousewheel: true,
		keyboard: true,
		on: {
			init: function () {
				window.addEventListener('load', startImageLoading);
			}
		}
	});
	$('.gallery-wrapper .swiper-filter').on('click', '[data-filter]', function () {
		$(this).addClass('is-active').siblings().removeClass('is-active');
		filterSwiper(filterableSwiper, this.getAttribute('data-filter'), startImageLoading);
	});
	function startImageLoading() {
		new LoadImages(document.querySelectorAll('.horizontal-gallery-slider .swiper-slide:not(.hidden) [data-src]'), function (img) {
			img.parentNode.classList.add('loaded');
			filterableSwiper.update();
		});
	}
	$('.gallery-sidebar').on('click', '.mob-sidebar-handle, [data-filter]', function () {
		document.querySelector('.gallery-sidebar').classList.toggle('is-active');
	});



	// Justified Grid Filter
	$('.justified-grid-filter').on('click', '[data-filter]', function () {
		$(this).addClass('is-active').siblings().removeClass('is-active');
		$('.justified-grid')[0].justified.filter(this.getAttribute('data-filter'));
	});



	// Horizontal Scrollbar
	imagesLoaded('.hr-scrollbar-slider', function() {
		new Swiper('.hr-scrollbar-slider', {
			slidesPerView: 'auto',
			spaceBetween: 2,
			mousewheel: true,
			keyboard: true,
			scrollbar: {
				el: document.querySelector('.hr-swiper-scrollbar'),
				draggable: true,
				dragSize: 60,
				snapOnRelease: false,
				hide: false
			}
		});
	});



	// Slideshow
	new Swiper('.swiper-slideshow', {
		effect: 'fade',
		simulateTouch: false,
		keyboard: true,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		}
	});



	// Portfolio Carousel
	var portfolioCarousel = new Swiper('.portfolio-carousel', {
		slidesPerView: 3,
		spaceBetween: 50,
		mousewheel: true,
		keyboard: true,
		breakpoints: {
			1350: {
				slidesPerView: 2
			},
			920: {
				slidesPerView: 1
			}
		}
	});
	$('.portfolio-carousel .swiper-slide .inner').each(function (i, item) {
		item.style.transitionDelay = (i*230)+'ms';
	});
	$('.portfolio-carousel-filter').on('click', '[data-filter]', function () {
		$(this).addClass('is-active').siblings().removeClass('is-active');
		filterSwiper(portfolioCarousel, this.getAttribute('data-filter'));
	});



	// Split Slider
	new Swiper('.split-slider', {
		effect: 'fade',
		loop: true,
		mousewheel: true,
		keyboard: true,
		simulateTouch: false,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		}
	});



	// Fullscreen Carousel
	new Swiper('.fullscreen-carousel', {
		slidesPerView: 3,
		spaceBetween: 5,
		mousewheel: true,
		keyboard: true,
		breakpoints: {
			1350: {
				slidesPerView: 2
			},
			920: {
				slidesPerView: 1
			}
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		}
	});



	// 3D Portfolio
	new Object3D('.object-3d');
	[].forEach.call(document.querySelectorAll('.object-3d img'), function (img) {
		var shadowImg = img.cloneNode();
		shadowImg.classList.add('item-img-shadow');
		img.parentNode.insertBefore(shadowImg, img);
	});



	window.addEventListener('load', function () {
		portfolioItemAnimation();
		swiperAutoplayProgress();
		asideAutoplay('stop');
		asideHashNav();
	});



	// Portfolio Items Appear Animation
	function portfolioItemAnimation() {
		new ScrollListener('.animate-items .portfolio-item, .animate-items .spaced-gallery-item', {
			onAppear: function () {
				this.classList.add('is-visible');
			},
			sequenceDelay: 100
		});
		// update on filtering
		$('.portfolio-filter').on('click', '[data-filter]', function () {
			$('.portfolio-item.filtered').addClass('is-visible');
		});
	};



	// Swiper Autoplay Progress
	function swiperAutoplayProgress() {
		var swiperProgress = document.querySelector('main .swiper-progress');
		var swiperEl = document.querySelector('main .swiper-container');
		if (swiperProgress && swiperEl && swiperEl.swiper) {
			var swiperProgressInner = swiperProgress.querySelector('.inner');
			if (swiperEl.swiper.params.autoplay.enabled) {
				var slideDelay = parseInt(swiperEl.swiper.slides[swiperEl.swiper.activeIndex].getAttribute('data-swiper-autoplay'));
				swiperProgressInner.style.transitionDuration = (slideDelay || swiperEl.swiper.params.autoplay.delay) + 'ms';
				swiperProgress.classList.add('autoplay-running', 'fill');
			}
			swiperEl.swiper.on('slideChange', function () {
				var slideDelay = parseInt(this.slides[this.activeIndex].getAttribute('data-swiper-autoplay'));
				swiperProgressInner.style.transitionDuration = (slideDelay || this.params.autoplay.delay) + 'ms';
				swiperProgress.classList.remove('fill');
				setTimeout(function () { swiperProgress.classList.add('fill') }, 50);
			});
			swiperEl.swiper.on('autoplayStop', function () {
				swiperProgress.classList.remove('autoplay-running');
			});
			swiperEl.swiper.on('autoplayStart', function () {
				swiperProgress.classList.add('autoplay-running');
			});
		}
		// navigation buttons
		var next = document.querySelector('.swiper-controls .next-btn');
		var prev = document.querySelector('.swiper-controls .prev-btn');
		if (next && prev) {
			next.addEventListener('click', function () { swiperEl.swiper.slideNext() });
			prev.addEventListener('click', function () { swiperEl.swiper.slidePrev() });
		}
	};



	// Aside Autoplays
	function asideAutoplay(action) {
		document.querySelectorAll('aside .swiper[data-autoplay]').forEach(function (item) {
			item.swiper.autoplay[action]();
		});
	}



	// Hash Navigation
	function asideHashNav() {
		var hash = window.location.hash;
		var navItem = document.querySelector('header [href="' + hash + '"]');
		if (navItem) navItem.click();
	}



	// Close Aside
	[].forEach.call(document.querySelectorAll('.close-aside-btn, .home-link, .background-overlay'), function (item) {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			closeAside();
		});
	});
	function closeAside() {
		document.body.classList.remove('aside-is-active');
		document.querySelector('header nav').style.paddingRight = '';
		document.querySelector('main').style.paddingRight = '';
		var home = document.querySelector('[href="#home"]');
		var active = document.querySelector('header .is-active');
		active && active.classList.remove('is-active');
		home && home.classList.add('is-active');
		history.replaceState(null, null, window.location.pathname + window.location.search);

		// stop aside autoplay
		asideAutoplay('stop');
	}



	// Aside Scroll Listener
	var scrollParent = document.querySelector('.aside-inner');
	window.asideScroll = new ScrollListener('aside section[id]', {
		// new ScrollListener('header .aside-link', {
		scrollParent: scrollParent,
		// navigation: true,
		offsetPercent: 60,
		active: function () {
			var newSection = document.querySelector('[href="#' + this.id + '"]');
			var asideIsActive = document.body.classList.contains('aside-is-active');
			if (newSection && asideIsActive) {
				var active = document.querySelector('header .is-active');
				active && active.classList.remove('is-active');
				newSection.classList.add('is-active');
				// history
				window.history.replaceState(null, null, '#' + this.id);
			}
		}
	});



	// Open Aside
	var mapLoaded = false;
	function openAside(item) {
		var sbw = window.innerWidth - document.body.offsetWidth;
		if (sbw) {
			document.querySelector('header nav').style.paddingRight = sbw + 'px';
			document.querySelector('main').style.paddingRight = sbw + 'px';
		}

		document.body.classList.add('aside-is-active');

		$('header nav .is-active').removeClass('is-active');
		item && item.classList.add('is-active');

		// start aside autoplay
		asideAutoplay('start');

		// load map
		if (!mapLoaded) {
			loadMaps();
			mapLoaded = true;
		}


		// ESC
		$(document).one('keyup', function (e) {
			if (e.keyCode == 27) closeAside();
		});

		// scroll to
		var el = item && document.querySelector(item.getAttribute('href'));
		if (!el) {
			asideScroll.activeCheck();
			return;
		}
		var top = scrollParent.scrollTop + el.getBoundingClientRect().top - scrollParent.getBoundingClientRect().top;
		$(scrollParent).animate({ scrollTop: top }, 1000, 'easeInOutExpo');
		asideScroll.activeCheck();
	}
	[].forEach.call(document.querySelectorAll('.aside-link'), item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			openAside(item);
		});
	});



	// Map Toggle
	var mapToggleBtn = document.querySelector('.map-toggle-btn');
	if (mapToggleBtn) {
		mapToggleBtn.addEventListener('click', function () {
			mapToggleBtn.classList.toggle('map-is-visible');
		});
	}



	// Responsive Header
	$('header').on('click', '.mob-menu-btn', function () {
		$('header').toggleClass('mob-menu-active');
	});
	$('body').on('click', '.mob-menu-active nav a', function () {
		$('header').removeClass('mob-menu-active');
	});

	

})(jQuery);
