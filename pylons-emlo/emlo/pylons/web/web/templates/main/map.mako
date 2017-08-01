# -*- coding: utf-8 -*-
<%!
	nav_selected = 'about'
	main_title = 'about'
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
			height: 600px;
			-width: 800px;
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

	</style>
</%def>

<%def name="for_foot()">
	<script src='/js/leafletSolrHeatmap.js'></script>
	<script src='/js/L.Graticule.js'></script>
	<script src='/js/mapbox.js'></script>
</%def>

<%def name="body()">

	<div class="row">
		<div class="columns small-12 large-3 side" style="border:0;margin-top:190px;">

			<!-- <h2>Navigate</h2>
			  <ul class="side-nav">
				  <li><a href="#context">Context</a></li>
				<li><a href="#citation">Citation Guidelines</a></li>
				<li><a href="#copyright">Copyright and Scholarly Responsibility</a></li>
				<li><a href="#issues">Known Issues</a></li>
				<li><a href="#credits">Credits</a></li>
				<li><a href="#technical">Technical Overview</a></li>
				<li><a href="#cookies">Cookies</a></li>
				<li><a href="#contact">Contact</a></li>
			  </ul>-->

		</div>

		<div class="columns small-12 large-9">
			<br/>

			<h2 id="about">Map</h2>

			<p>Explore the locations</p>

		</div> <!-- large-9 columns -->

	</div><!-- row -->

	<div class="row">
		<div class="columns small-12 large-12">

			<div id="colours"></div>
			<div id='map'>Loading Map</div>
		</div>
	</div>

	<div class="row">
		<div id="list" class="columns large-1">
			<label for="filter">Filter</label>
		</div>
		<div id="list" class="columns large-10">
			<input type='text' id='filter' size='45' value=""/>
		</div>
		<div id="list" class="columns large-1">
			<button id="clear">Clear</button>
		</div>
	</div>
	<div class="row">
			<div class="columns small-12 large-12">
				<select title="Places" id="placelist" size="20"></select>
			</div>

			<small>
				<span id='responseTime'></span>
				<span id='numDocs'></span>
				<span id='renderTime'></span>
			</small>
	</div>
</%def>
