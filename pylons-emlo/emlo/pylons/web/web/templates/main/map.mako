# -*- coding: utf-8 -*-
<%!
   nav_selected = 'about'
   main_title = 'about'
%>
<%inherit file="/base.mako" />

<%def name="for_head()">
	<link rel="stylesheet" href="/bower_components/leaflet/dist/leaflet.css" />
	<link rel="stylesheet" href="/bower_components/leaflet.markerclusterer/dist/MarkerCluster.Default.css" />
	<link rel="stylesheet" href="/css/mapbox.css" />
	<script src="https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js"></script>
	<link href="https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css" rel="stylesheet">

	<script src="/bower_components/leaflet.markerclusterer/dist/leaflet.markercluster.js"></script>
	<script src="/bower_components/jquery/dist/jquery.min.js"></script>
	<script src='/bower_components/geostats/lib/geostats.min.js'></script>
	<style>
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

				<div id='map'>Loading Map</div>
				<div id="colours"></div>
				<br/>
					<small><div id='responseTime'></div><div id='numDocs'></div><div id='renderTime'></div></small>

			</div> <!-- large-9 columns -->
		</div>
</%def>
