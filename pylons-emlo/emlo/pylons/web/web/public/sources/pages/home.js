$(document).ready( function(){

	var dat_from_year = $('#dat_from_year'),
		dat_to_year = $('#dat_to_year');

	$('.year_from').change(function() {

		var from = dat_from_year.val(),
			to = dat_to_year.val();

		if (to == "all years") {
			dat_to_year.val(from);
		}
		else if (to < from) {
			dat_to_year.val(from);
		}
	});

	$('.year_to').change(function() {
		var from = dat_from_year.val(),
			to = dat_to_year.val();

		if( from > to  ) {
			dat_from_year.val(to);
		}
	});

	var $divs = $("#news-output .item");

	if( $divs.length !== 0 ) {

		var newsUrl = 'http://emlo-portal.bodleian.ox.ac.uk/collections/?json_route=/posts&' +
			'type[]=catalogue&type[]=post&filter[orderby]=data&filter[order]=DESC&filter[posts_per_page]='+$divs.length;

		//if (window.location.hostname !== 'emlo.bodleian.ox.ac.uk') {
		//	newsUrl = '/js/news.json'; // Testing purposes.
		//}

		$.ajax({
			type: 'GET',
			url: newsUrl,
			dataType: 'json'
		}).done(function (response) {

			var count = 0;

			while (count < $divs.length && count < response.length) {

				var $div = $($divs[count]),
					$title = $div.find(".title"),
					$image = $div.find(".image"),
					$link = $div.find(".link"),
					item = response[count];

				// Choose an image
				if (item.hasOwnProperty("acf") && item.acf.hasOwnProperty("catalogue_main_image") && item.acf.catalogue_main_image.length !== 0) {
					$image.html('<img src="' + item.acf.catalogue_main_image[0].catalogue_images + '"/>');
				}
				else if (item.hasOwnProperty("featured_image") && item.featured_image !== null) {
					$image.html('<img src="' + item.featured_image.source + '"/>');
				}
				else {
					var img_src = "/img/news/KMS3059_crop_2.jpg";
					$image.html('<img src="' + img_src + '"/>');
				}

				var title = item.title;
				if (item.title.length > 65) {
					title = title.substring(0, 60) + "...";
				}
				$title.text(title);

				$link.attr("href", item.link);

				count++;
			}

			$("#news-output").slideDown();

		})/*.fail(function (fault1, fault2, fault3) {
			// If there's some error we dont show the news section
		})*/;
	}

});