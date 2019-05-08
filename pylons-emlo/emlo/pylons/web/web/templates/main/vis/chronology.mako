# -*- coding: utf-8 -*-
<%!
	nav_selected = ''
	main_title = 'Chronology'
%>
<%inherit file="/base.mako" />

<%def name="for_head()">
	<style>
		/* Table styles */
		th { background-color: #bbb; text-align:center !important; cursor: pointer; }
		th#chart { cursor: auto}

		th:first-child {width: 300px;}
		th, td { padding: 8px 14px;}
		/*th.center, td.center { text-align: center; }*/
		/*th.num,*/ td.num { text-align: right; }

		.all { font-weight: bold; background-color: #dadada }

		label {width: 29px;display:inline-block;}
		button {height: 22px; padding: 2px; margin-top: 0;}

		.bar { stroke-width:0 }
	</style>

	<style>
		/* Chart styles */

		#intro {
			max-width: 1000px;
		}
		#intro, #timeline-controls {
			margin: 1% 3%;
		}

		button {
			padding: 3px 0;
			width: 155px;
		}


		.highlight:focus,
		.highlight {
			background-color: #EFC319;
			color: black;
		}

		/*
		.custom-years input[type='number'] {
			width: 100px;
			margin: 0 30px 0 10px;
		}

		.custom-years input[type='number'],
		.custom-years label {
			display:inline;
		}
		*/

		.order label {
			display:inline;
			margin-right: 10px;
		}
		.order input {
		}

		svg {dummyYear
		cursor: crosshair;
		}
		.data:hover text {
			fill: #2E527E !important;
			text-decoration: underline;
		}

		.data text {
			cursor: pointer;
		}
		.data text.excluded {
			fill: grey;
		}

		.chart text {
			fill: black;
			font: 10px sans-serif;
			font-size: 13px;
			text-anchor: right;
		}

		.axis path,
		.axis line {
			fill: none;
			stroke: none;
		}

		.guidelines line {
			stroke:#ccc;
			shape-rendering: crispEdges;
		}

		.tick:first-child text,
		.tick:last-child text,  /* doesnt work? */
		.tick:nth-last-child(2) text {
			font-weight: bold;
		}

		line.mouse {
			stroke: #777;
			stroke-width:1;
		}

		.mytooltip {
			position:absolute;
			background: goldenrod;
			background: rgba(209, 164, 35, 0.69);
			padding: 5px;
			border-radius: 10px;
			z-index:10;
			visibility : hidden;
			color: white;

		}
		rect {
			stroke: transparent;
			stroke-width: 10;
			/*shape-rendering: crispEdges;*/
			cursor: pointer;
		}
		rect.outside {
			fill: white;
			stroke: black;
			stroke-width: 1;
		}
		.data rect {
			stroke: white;
			stroke-width: 0.1;
		}

		.data:hover rect {
			fill: #096DCC !important;
		}
		.data rect:hover {
			fill: #EFC319 !important;
			stroke: #EFC319;
			stroke-width:10;
		}

		.custom-years {
			width:100%;
			padding-bottom: 35px;
		}

		.d3-slider {
			position: relative;
			font-family: Verdana,Arial,sans-serif;
			font-size: 1.1em;
			border: 1px solid #aaaaaa;
			z-index: 2;
		}

		.d3-slider-horizontal {
			height: .8em;
		}

		.d3-slider-range {
			background:#2980b9;
			left:0px;
			right:0px;
			height: 0.8em;
			position: absolute;
		}

		.d3-slider-range-vertical {
			background:#2980b9;
			left:0px;
			right:0px;
			position: absolute;
			top:0;
		}

		.d3-slider-vertical {
			width: .8em;
			height: 100px;
		}

		.d3-slider-handle {
			position: absolute;
			width: 1.2em;
			height: 1.2em;
			border: 1px solid #d3d3d3;
			border-radius: 4px;
			background: #eee;
			background: linear-gradient(to bottom, #eee 0%, #ddd 100%);
			z-index: 3;
		}

		.d3-slider-handle:hover {
			border: 1px solid #999999;
		}

		.d3-slider-horizontal .d3-slider-handle {
			top: -.3em;
			margin-left: -.6em;
		}

		.d3-slider-axis {
			position: relative;
			z-index: 1;
		}

		.d3-slider-axis-bottom {
			top: .8em;
		}

		.d3-slider-axis-right {
			left: .8em;
		}

		.d3-slider-axis path {
			stroke-width: 0;
			fill: none;
		}

		.d3-slider-axis line {
			fill: none;
			stroke: #aaa;
			shape-rendering: crispEdges;
		}

		.d3-slider-axis text {
			font-size: 11px;
		}

		.d3-slider-vertical .d3-slider-handle {
			left: -.25em;
			margin-left: 0;
			margin-bottom: -.6em;
		}

		.brush {
			fill:rgb(239, 195, 25);
		}

	</style>
</%def>

<%def name="for_foot()">
	<script src="/js/d3.v3.min.js"></script>
	<script src="/js/catalogues.js"></script>
	<script src="/js/catalogue-blog.js"></script>
	<script src="/js/cataloguesTable.js"></script>

	<script src="/js/d3.slider.js"></script>
	<script src="/js/cataloguesYears.js"></script>
	<script src="/js/cataloguesData.js"></script>

	<script>
		var dataPostgres = catalogueYearsCount,
				dataTemp = {},
				//dummyYear = 1490,
				i;

		//
		// Sort out data
		//
		for( i=0; i < dataPostgres.length; i++ ) {
			var yearData = dataPostgres[i],
					catalogueName = yearData["Catalogue"];

			if( ! (catalogueName in dataTemp) ) {
				dataTemp[catalogueName] = {
					"start" : 2000,
					"end" : 0,
					"id" : yearData["CatalogueId"]
				};
			}

			if( yearData.year === "" ) {
				yearData.year = timeline.noYear; //dummyYear; // A crafty cheat for entries without years. (That will no doubt come back and bite me...)
			}

			// Create an entry for each year
			dataTemp[catalogueName][yearData.year] = yearData.number;

			if( yearData.year !== timeline.noYear) {

				if (yearData.year < dataTemp[catalogueName]["start"]) {
					dataTemp[catalogueName]["start"] = yearData.year;
				}

				if (yearData.year > dataTemp[catalogueName]["end"]) {
					dataTemp[catalogueName]["end"] = yearData.year;
				}
			}
		}

		//
		// CreateChart
		//
		var config = {
			groupNameHtml: function(d) {
				var name = d.name;
				if( name.length > 25 ) {
					name = name.substr(0,22) + "...";
				}

				var blog = getBlogDataFromCatId( d.id );
				if( blog ) {
					return '<a xlink:href="' + blog.href + '">' + name + '</a>';
				}
				else {
					return name + "(?)"
				}
			},
			markerHoverHtml : function(d) {

				var year = (d.year === timeline.noYear) ? "No year" : d.year;
				return "<b>" + d.parent.name + "</b><br/>"
						+ year + " | " + d.number + " letters<br/>"
						+ '<p style="text-align:right;width:100%;margin:0"><small>(click to show these in EMLO)</small></p>';
			},
			markerClick : function(d) {
				var url;

				if( d.year === timeline.noYear) {
					url = "http://emlo.bodleian.ox.ac.uk/forms/advanced?dat_from_year=9999&col_cat=" + d.parent.name;
				}
				else {
					url = "http://emlo.bodleian.ox.ac.uk/forms/advanced?dat_sin_year=" + d.year + "&col_cat=" + d.parent.name;
				}

				window.open( url, '_blank');
			},
			pieHoverHtml : function(d) {
				var tip = d.count + " letters in total<br/>";
				if( d.noYears > 0 ) {
					tip += "(including " + d.noYears + " letters with unknown years)";
				}
				//tip += '<p style="text-align:right;width:100%;margin:0"><small>(click to show these in EMLO)</small></p>';

				return tip;
			},
			pieClick : function(d) {
				console.log(d);
				//window.location = "http://emlo.bodleian.ox.ac.uk/forms/advanced?col_cat=" + d.name;
			},
			yearChange : function( start, end ) {
				setButtonsYears(null);
				slider.value([start, end]);
			},
			scaleMarkers : 1,
			groupHeight: 50,
			groupGapHeight: 10
		};
		var control = timeline.createChart( dataTemp, config );

		//
		// Handle sorting
		//
		function orderBy( by ) {
			/* Change the order of "data". */
			if( by === "nameAsc" ) {
				return generateSort( function(o) {return o.name;}, true );
			}
			else if( by === "nameDesc" ) {
				return generateSort( function(o) {return o.name;} );
			}
			else if( by === "yearStartAsc" ) {
				return generateSort( function(o) {return o.year.start;}, true );
			}
			else if( by === "yearStartDesc" ) {
				return generateSort( function(o) {return o.year.start;} );
			}
			else if( by === "yearEndAsc" ) {
				return generateSort( function(o) {return o.year.end;}, true );
			}
			else if( by === "yearEndDesc" ) {
				return generateSort( function(o) {return o.year.end;} );
			}
			else if( by === "countAsc" ) {
				return generateSort( function(o) {return o.count;}, true );
			}
			else {
				return  generateSort( function(o) {return o.count;} );
			}

			function generateSort( memberFunction, ascending ) {
				/* Generate a sort function with particular features */
				return function(a,b) {
					var compare = ((memberFunction(a) < memberFunction(b)) ? -1 : memberFunction(a) > memberFunction(b));
					if(compare===0) {
						compare = ( (a.name < b.name) ? -1 : a.name > b.name );
					}
					return (ascending) ? compare : compare*-1;
				};
			}
		}

		function order( name ) {
			var orderFunction = orderBy( name );
			control.reorder( orderFunction );
		}
		function setButtonsOrder( button ) {
			d3.selectAll(".order button").classed("highlight",0);
			d3.select(button).classed("highlight",1);
		}

		var sort = "nameAsc";
		d3.select("#btnSortNameAsc").on("click", function() {
			if( sort === "nameAsc" ) {
				sort = "nameDesc";
			}
			else {
				sort = "nameAsc";
			}
			order( sort );
			setButtonsOrder(this);
		});
		d3.select("#btnSortCountAsc").on("click", function() {
			if( sort === "countDesc" ) {
				sort = "countAsc";
			}
			else {
				sort = "countDesc";
			}
			order( sort );
			setButtonsOrder(this);
		});
		d3.select("#btnSortYearEndAsc").on("click", function() {
			if( sort === "yearEndAsc" ) {
				sort = "yearEndDesc";
			}
			else {
				sort = "yearEndAsc";
			}
			order( sort );
			setButtonsOrder(this);
		});
		d3.select("#btnSortYearStartAsc").on("click", function() {
			if( sort === "yearStartAsc" ) {
				sort = "yearStartDesc";
			}
			else {
				sort = "yearStartAsc";
			}
			order( sort );
			setButtonsOrder(this);
		});

		//
		// Set up zoom
		//
		d3.select("#btnYearAll").on("click", function() {
			changeYears(); // all
			setButtonsYears(this);
		});

		d3.select("#btnYear1500").on("click", function() {
			changeYears( 1500, 1549 );
			setButtonsYears(this);
		});
		d3.select("#btnYear1550").on("click", function() {
			changeYears( 1550, 1599 );
			setButtonsYears(this);
		});
		d3.select("#btnYear1600").on("click", function() {
			changeYears( 1600, 1649 );
			setButtonsYears(this);
		});
		d3.select("#btnYear1650").on("click", function() {
			changeYears( 1650, 1699 );
			setButtonsYears(this);
		});
		d3.select("#btnYear1700").on("click", function() {
			changeYears( 1700, 1749 );
			setButtonsYears(this);
		});
		d3.select("#btnYear1750").on("click", function() {
			changeYears( 1750, 1799 );
			setButtonsYears(this);
		});
		d3.select("#btnYear1800").on("click", function() {
			changeYears( 1800, 1850 );
			setButtonsYears(this);
		});

		function setButtonsYears( button ) {
			d3.selectAll(".years button").classed("highlight",0);
			d3.select(button).classed("highlight",1);
		}

		function changeYears( from, to ) {
			if( !from && !to ) {
				from = control.startYear;
				to = control.endYear;
			}
			control.showYears( from, to );
			slider.value([from, to]);
		}

		var slider = d3.slider()
				.axis(true)
				.min(control.startYear)
				.max(control.endYear)
				.value([control.startYear,control.endYear])
				.on("slideend", function(evt, values) {
					control.showYears( Math.floor(values[0]), Math.ceil(values[1]) );
					setButtonsYears(null); // this is a bit of a cheat, it should really highlight the right button depending on years "slid" too
				});

		d3.select('#slider').call( slider );


	</script>
</%def>

<%def name="body()">

	<div class="row">
		<div class="columns small-12 large-3 side" style="border:0;margin-top:0px;">

			<!-- <h2>Navigate</h2>
			  <ul class="side-nav">
				  <li><a href="#context">Context</a></li
			  </ul>-->

		</div>

		<div class="columns small-12 large-9">
			<br/>
			<div class="row">
				<div class="column">
					<h2 id="about">Chronology</h2>
					<p>Explore our catalogues by years.</p>
					<br/><br/><br/><br/>
				</div>
			</div>
		</div> <!-- large-9 columns -->
	</div><!-- row -->


	<div class="row">
		<div class="columns small-12 large-12">
			<table id="cat"></table>
		</div>

		<div class="columns small-12 large-12">

			<div id="intro">
				<h1 id="title">Number of letters per year per catalogue in EMLO</h1>
				<p>This is interactive chart shows the number of letters Early Modern Letters Online has a particular catalogue and year.
					you can click on the catalogue names on the left to find more information about that catalogue, and click on the circles to see the list of letters for that year.</p>

				<p>The colour and size of each circle represents the number of letters a darker colour and larger circle indicates relatively more letters.</p>

				<p>You can use the buttons or the slider to zoom in to see more detail. Only catalogues with letters in your chosen timeframe will be shown.</p>
			</div>

			<div id="timeline-controls">
				<form>
					<div class="years button-bar">
						<ul class="button-group unknown" style="display: inline-block;">
							<li>Years: </li>
							<li><button type="button" class="highlight" id="btnYearAll">All</button></li>
							<!--<li><button type="button" id="btnYearCustom">Custom</button></li>-->
							<li><button type="button" id="btnYear1500">1500 - 1549</button></li>
							<li><button type="button" id="btnYear1550">1550 - 1599</button></li>
							<li><button type="button" id="btnYear1600">1600 - 1649</button></li>
							<li><button type="button" id="btnYear1650">1650 - 1699</button></li>
							<li><button type="button" id="btnYear1700">1700 - 1749</button></li>
							<li><button type="button" id="btnYear1750">1750 - 1799</button></li>
							<li><button type="button" id="btnYear1800">1800 - 1850</button></li>
						</ul>
					</div>

					<div class="order">
						<ul class="button-group unknown" style="display: inline-block;">
							<li>Order:</li>
							<li><button type="button" id="btnSortNameAsc" class="highlight" >Catalogue Name</button></li>
							<li><button type="button" id="btnSortCountAsc">Letter Count</button></li>
							<li><button type="button" id="btnSortYearStartAsc">Starting year</button></li>
							<li><button type="button" id="btnSortYearEndAsc">Ending year</button></li>
						</ul>
					</div>

					<div class="custom-years" style="padding-left:233px;max-width:100%">
						<div id="slider"></div>
					</div>

				</form>
			</div>

			<div class="chart" style="width:100%"></div>


			<label style="width:90px" for="catalogue-name">Filter Name</label>
			<input style="width:200px;display:inline-block" type="text" id="catalogue-name"/>

			<label style="margin-left:20px;width:90px" for="from-year">Filter Years</label>
			<input id="from-year" title="From year" style="display:inline-block;width:98px" type="number"/>
			<input id="to-year" title="To year" style="display:inline-block;width:98px" type="number"/>
			<button id="reset" style="padding: 8px 16px;height:initial">Reset years</button>

		</div>
	</div>

</%def>
