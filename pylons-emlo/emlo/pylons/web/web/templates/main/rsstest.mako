# -*- coding: utf-8 -*-
<%!
   nav_selected = ''
   main_title = ''
%>
<%inherit file="/base.mako" />

<%def name="for_head()">

</%def>

<%def name="for_foot()">
</%def>

<%def name="body()">

	<div id="main">
		<div id="left">

			<div class="box">
				<h2>Navigate</h2>
				<div class="content">
				  <ul>
				  </ul>

              <br/>
				</div><!--class:content-->
			</div><!--class:box-->

		</div><!--id:left-->
      
		<div id="right">

	<style>
	#news-output .item { float: left; width: 300px; height: 258px; margin: 5px; background-color: #ffe203; }
	#news-output .item .title { text-align: center; padding: 5px 40px;}
	#news-output .item .content { padding: 5px; height: 220px; }
	#news-output .item .image { max-width: 300px;max-height: 200px;overflow:hidden;display:block;}
  #news-output .item .image img { width: 300px; }
	#news-output .item .overflow { overflow: hidden; }
</style>	
<div id="news-output" style="display:none">
	<div class="item">
		<a class="link">
			<div class="image"></div>
			<p class="content"></p>
			<div class="overflow">
				<h3 class="title"></h3>
			</div>
		</a>
	</div>
	<div class="item"><a class="link"><span class="image"></span><p class="content"></p><h3 class="title"></h3></a></div>
	<div class="item"><a class="link"><span class="image"></span><p class="content"></p><h3 class="title"></h3></a></div>
</div>


<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript">

	$(document).ready(function(){

		function stripHTML(dirtyString) {
    		var container = document.createElement('div');
  		  container.innerHTML = dirtyString;
	  	  return container.textContent || container.innerText;
		}

		$.ajax({
			type: 'GET',
	        url: '/blog/?json_route=/pages',
	        dataType: 'json'
		}).done( function(response){
	      //console.log( "Done: ",response);
				var $divs = $("#news-output .item");
				var count = 0;

				while( count < $divs.length && count < response.length ) {
					var $div = $($divs[count]),
							$title = $div.find(".title"),
							$content = $div.find(".content"),
							$image = $div.find(".image"),
							$link = $div.find(".link"),
							item = response[count];

					if( item.featured_image !== null ) {
						$image.html( '<img src="' + item.featured_image.source + '"/>' );
						$content.hide();
					}
					else {
						$content.text(stripHTML(item.content));
						$image.hide();
					}

					var title = item.title;
					if( item.title.length > 65 ) {
						title = title.substring(0,60) + "...";
					}
					$title.text(title);

					$link.attr("href",item.link);

					count++;	
					
				}		

				$("#news-output").slideDown();
					
		}).fail( function (fault1,fault2,fault3 ) {
			console.log("Fail: ", fault1,fault2,fault3);
		});
	});


</script>

			
		</div><!--id:right-->
		
		<br class="clearboth"/><!-- important for id:main size -->
		
	</div><!--id:main-->
</%def>
