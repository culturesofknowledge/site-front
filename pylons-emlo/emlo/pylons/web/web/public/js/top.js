$(document).ready(function(){

	// hide #back-top first
	var $backtop = $("#back-top").hide();
    
	if( $backtop ) {
		// fade in #back-top
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$backtop.fadeIn();
			} else {
				$backtop.fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	}		

});
