
var colours = [
	//'#ff00ff','#ff0000','#ffff00','#00ff00','#0000ff', // purple, red, yellow, green, blue
	//'#5d6d7e','#34495e','#2e4053','#283747','#212f3c','#17202a' // greys
	//'#145a32','#186a3b','#7d6608','#7e5109','#784212','#6e2c00' // green to red
	'#31eef6', '#57b5d8', '#df65b0', '#dd1c77', '#980043' // defualt
];
var solrUrl = 'http://127.0.0.1/solr/locations';

L.mapbox.accessToken = 'pk.eyJ1IjoibW9uaWNhbXMiLCJhIjoiNW4zbEtPRSJ9.9IfutzjZrHdm2ESZTmk8Sw';
var map = L.mapbox.map('map', 'monicams.jpf4hpo5')
	.setView([
		0,
		0], 2);

function onEachFeature(feature, layer) {
  var count = feature.properties.count.toLocaleString();
  layer.bindPopup(count);
}

/*L.graticule({
	interval: 15,
	style: {
		color: '#000',
		weight: 0.5
	}
}).addTo(map);*/


// Create and add a solrHeatmap layer to the map
var solr = L.solrHeatmap( solrUrl, {
  // Solr field with geospatial data (should be type Spatial Recursive Prefix Tree)
  field: 'geo_rpt',

  // Set type of visualization. Allowed types: 'geojsonGrid', 'clusters' Note: 'clusters' requires LeafletMarkerClusterer
	type: 'geojsonGrid',
  //type: 'clusters',

	colors: colours,

  // Inherited from L.GeoJSON
  onEachFeature: onEachFeature
}).addTo(map);

// Create and add a solrHeatmap layer to the map
var solr2 = L.solrHeatmap( solrUrl, {
	// Solr field with geospatial data (should be type Spatial Recursive Prefix Tree)
	field: 'geo_rpt',

	// Set type of visualization. Allowed types: 'geojsonGrid', 'clusters' Note: 'clusters' requires LeafletMarkerClusterer
	//type: 'geojsonGrid',
	type: 'clusters',

	// Inherited from L.GeoJSON
	onEachFeature: onEachFeature
}).addTo(map);

var coloursDiv = document.getElementById("colours");
//coloursDiv.appendChild(document.createTextNode("Key: "));
coloursDiv.appendChild(document.createTextNode(" Least "));
for( var colour=0, end=colours.length; colour<end;colour++ ) {
	var div = document.createElement("div");
	div.setAttribute("style", "display:inline-block;width:20px;height:20px;background-color:"+colours[colour]);
	coloursDiv.appendChild(div)
}
coloursDiv.appendChild(document.createTextNode(" Most "));
