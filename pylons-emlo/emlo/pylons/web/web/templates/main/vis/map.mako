# -*- coding: utf-8 -*-
<%!
	nav_selected = ''
	main_title = 'Geography'
%>
<%inherit file="/base.mako" />

<%def name="for_head()">
	<link rel="stylesheet" href="/bower_components/leaflet/dist/leaflet.css"/>
	<link rel="stylesheet" href="/bower_components/leaflet.markerclusterer/dist/MarkerCluster.Default.css"/>
	<link rel="stylesheet" href="/css/mapbox.css"/>
	<script src="https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js"></script>
	<link href="https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css" rel="stylesheet">

	<script src="/bower_components/leaflet.markerclusterer/dist/leaflet.markercluster.js"></script>
	<script src="/bower_components/jquery/dist/jquery.min.js"></script>
	<script src='/bower_components/geostats/lib/geostats.min.js'></script>
	<style>
		#map {
			display: inline-block;
			height: 540px;
			width: 1000px;
		}
		@media only screen and (max-width: 64.063em) {
			#map {
				width: 100%;
			}
		}
		#list {
			display: inline-block;
		}

		#placelist {
			height: 300px;
		}

		.leaflet-popup-content {
			max-height: 250px;
			overflow: auto;
		}

		#clear { height: 35px; padding: 9px 20px; }

		path.leaflet-clickable:hover {
			stroke: white;
			stroke-width: 2px;
		}
	</style>
</%def>

<%def name="for_foot()">
	<script src='/js/leafletSolrHeatmap.js'></script>
	<script src='/js/L.Graticule.js'></script>
	<script src='/js/mapbox.js'></script>
</%def>

<%def name="body()">

	<div class="row">
		<div class="columns small-12 large-3 side" style="border:0;margin-top:0px;">
		</div>

		<div class="columns small-12 large-9">
			<br/>
			<div class="row">
				<div class="column">
					<h2 id="about">Geography</h2>
					<p>Explore the locations in EMLO.</p>
					<br/><br/><br/>
				</div>
			</div>

		</div> <!-- large-9 columns -->
	</div><!-- row -->

	<div class="row">

		<div class="column small-12 large-9">
			<div id='map'>Loading Map</div>
		</div>

		<div class="columns small-12 large-3">
			<div class="row">
				<div class="column">
					<h4>Letter count in view</h4>
					<div id="colours"></div>
				</div>

			</div>
			<div class="row">
				<div class="column large-12">
					<h4><label for="filter" style="display:inline-block;vertical-align:middle;width:100%;font-size:16px">Filter</label></h4>
				</div>
			</div>
			<div class="row">
				<div  class="column large-8">
					<input type='text' id='filter' value=""/>
				</div>
				<div  class="column large-4">
					<button id="clear">Reset</button>
				</div>

			</div>
			<div class="row">
				<div class="column">
					<h4>Places in view</h4>
					<select title="Places" id="placelist" size="20"></select>
					<!-- small>
						<span id='responseTime'></span>
						<span id='numDocs'></span>
						<span id='renderTime'></span>
					</small -->
				</div>

			</div>
		</div>
	</div>
</%def>
