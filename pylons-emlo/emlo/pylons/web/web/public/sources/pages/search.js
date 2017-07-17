$("table.facet").each(function (zzz, telement) {
	var $table = $(telement);
	$table.append("<tr class='show-more'><td>Click to show more...</td></tr>");

	$table.find("tr").not(".show-more").each(function (i, element) {
		if (i > 4) {
			$(element).hide();
		}
	});

	var hidden = true;
	$table.find( "tr.show-more td" ).on( "click", function() {
		if( hidden ) {
			$(this).text( "Click to hide" );
			$table.find( "tr" ).each( function (i, element) {
				$(element).show();
			});
		}
		else {
			$table.find( "tr" ).each( function (i, element) {
				if (i > 4) {
					$(element).hide();
				}
			});
			$(this).text( "Click to show more..." );
			$table.find( "tr.show-more" ).show();
		}

		hidden = !hidden;
	})
});