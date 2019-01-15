# -*- coding: utf-8 -*-
<%!
   import web.lib.relations
   relation_fields = web.lib.relations.object_relation_fields['location']
   
   main_title = 'Location'
%>

<%inherit file="/main/profile.mako" />
<%namespace name="trans" file="/helpers/translate.mako" import="*"/>

<%def name="for_head()"></%def>

<%def name="for_foot()">
	%if h.get_latitude_fieldname() in c.profile and h.get_latitude_fieldname() in c.profile :
		<script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js'></script>
		<link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css' rel='stylesheet' />

		<script type="text/javascript">

			L.mapbox.accessToken = 'pk.eyJ1IjoibW9uaWNhbXMiLCJhIjoiNW4zbEtPRSJ9.9IfutzjZrHdm2ESZTmk8Sw';
			var map = L.mapbox.map('map', 'monicams.jpf4hpo5')
			    .setView([
			        ${c.profile[ h.get_latitude_fieldname() ]},
			        ${c.profile[ h.get_longitude_fieldname() ]}], 7);

			L.mapbox.featureLayer({
			    // this feature is in the GeoJSON format: see geojson.org
			    // for the full specification
			    type: 'Feature',
			    geometry: {
			        type: 'Point',
			        // coordinates here are in longitude, latitude order because
			        // x, y is the standard for GeoJSON and many formats
			        coordinates: [
			          ${c.profile[ h.get_longitude_fieldname() ]},
			          ${c.profile[ h.get_latitude_fieldname() ]}
			        ]
			    }
			}).addTo(map);

		</script>
	% endif
</%def>

<%def name="profileRight()">

   <dl>
      <!-- short stuff here -->

      <% field = h.get_relations_to_resource_fieldname() %>
      % if c.profile.has_key( field ) :
        <% label = trans.translate(field) %>
        <dt>
        ${label}
        </dt>
        <dd>
        ${self.resource_relations( field )}
        </dd>
      % endif

      ${self.relations_list( h.get_people_born_at_place_fieldname(),     display_label = True )}
      ${self.relations_list( h.get_people_who_died_at_place_fieldname(), display_label = True )}
      ${self.relations_list( h.get_people_who_visited_place_fieldname(), display_label = True )}
	         ##=================================================================================================

   </dl>

</%def>

<%def name="profile()">

	<div class="row" id="details">

		<div class="column profilepart">
			<h3><img src="/img/icon-statistics.png">Stats</h3>
			<div class="content">
		        ##=================================================================================================
		        ## This section shows totals for letters sent, received and in which mentioned,
		        ## as simple figures linking through to Works Search Results.
		        ## See base.mako.

		        ${self.totals_linking_to_list_of_works( object_type = 'location' )}
			</div>

		</div>

		% if c.profile.has_key( h.get_location_synonyms_fieldname() ) :
			<div class="column profilepart">
				<h3>Synonyms</h3>
				<dl>
               <%
                  syn = c.profile[h.get_location_synonyms_fieldname()]
                  syn = ";  ".join( syn.split("\n") )
                %>
                ##% for s in syn :
                  <dd>${syn}</dd>
                ##% endfor
		            ## ${self.def_list_item( h.get_location_synonyms_fieldname(), False )}
         
				</dl>
			</div>
		% endif

		%if h.get_latitude_fieldname() in c.profile or \
			h.get_latitude_fieldname() in c.profile or \
			"parents" in c.profile:

			<div class="column profilepart">

				<h4><img src="/img/icon-globe.png">Position</h4>
				<div class="content">
					<dl>

						%if h.get_latitude_fieldname() in c.profile or \
							h.get_latitude_fieldname() in c.profile :
							${self.def_list_item( h.get_latitude_fieldname(), True )}
					        ${self.def_list_item( h.get_longitude_fieldname(), True )}
						% endif

						%if h.get_latitude_fieldname() in c.profile and \
									    h.get_latitude_fieldname() in c.profile :
							<dd><div id='map' style="width:100%;height: 300px;"></div></dd>
						%endif

						% if c.profile.has_key("parents") and c.profile.has_key("parents_json" ) :
							<%
								import json
								parents = json.loads( c.profile["parents_json"] )
								def sort_length(a,b):
									return len(b['geonames_name']) - len(a['geonames_name'])
								parents.sort(sort_length)
							%>
							% if parents:
								<dt>Associated locations</dt>
								<dd><ul>
									% for parent in parents :
										<li><a href="/profile/location/${parent['uuid']}">${parent['geonames_name']}</a></li>
									% endfor
								</ul></dd>
							% endif
						% endif
					</dl>

				</div>

				<br/>
			</div>
		% endif

		<div class="column profilepart">
		      ${self.h4_works_list( h.get_works_with_origin_fieldname(), img='icon-quill.png' )}
		</div>

		<div class="column profilepart">
	            ${self.h4_works_list( h.get_works_with_destination_fieldname(), img='icon-quill.png' )}
		</div>

		<div class="column profilepart">
		      ${self.h4_works_list( h.get_works_in_which_mentioned_fieldname(), img='icon-quill.png' )}
		</div>

		<div class="column profilepart">
	      ${self.h4_relations_list( h.get_relations_to_comments_fieldname(), type='simple' )}
	    </div>

	</div>
   
</%def>

<%def name="body()"></%def>
