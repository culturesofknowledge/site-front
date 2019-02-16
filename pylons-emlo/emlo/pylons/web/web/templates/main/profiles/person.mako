# -*- coding: utf-8 -*-
<%!
   #import web.lib.relations
   #relation_fields = web.lib.relations.object_relation_fields['person']
   
   main_title = 'Person'
%>

<%inherit file="/main/profile.mako" />
<%namespace name="trans" file="/helpers/translate.mako" import="*"/>

##---------------------------------------------------------------------------------------------

<%def name="for_head()">
	<link rel="stylesheet" href="/css/chart.css" />
</%def>

##---------------------------------------------------------------------------------------------

<%def name="for_foot()">
	<script type="text/javascript" src="/js/d3.v3.min.js"></script>
	<script type="text/javascript" src="/js/d3.lettercount.min.js"></script>
	##<script type="text/javascript" src="/js/d3.lettercount.js"></script>

	%if c.profile.has_key( 'works_created_locations' ) or c.profile.has_key( 'works_received_locations' ) :
		<script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.js'></script>
		<link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.2/mapbox.css' rel='stylesheet' />

		<script type="text/javascript">

			L.mapbox.accessToken = 'pk.eyJ1IjoibW9uaWNhbXMiLCJhIjoiNW4zbEtPRSJ9.9IfutzjZrHdm2ESZTmk8Sw';
			var map = L.mapbox.map('map', 'monicams.jpf4hpo5')
					.setView([0,0], 7);

			var greenIcon = L.icon({
				iconUrl: '/img/marker-icon-green.png',
				//iconRetinaUrl: 'my-icon@2x.png',
				iconSize: [25, 41],
				iconAnchor: [12, 39],
				popupAnchor: [-3, -76],
				//shadowUrl: 'my-icon-shadow.png',
				//shadowRetinaUrl: 'my-icon-shadow@2x.png',
				//shadowSize: [68, 95],
				//shadowAnchor: [22, 94]
			});

			var redIcon = L.icon({
				iconUrl: '/img/marker-icon-red.png',
				//iconRetinaUrl: 'my-icon@2x.png',
				iconSize: [25, 41],
				iconAnchor: [12, 39],
				popupAnchor: [-3, -76],
				//shadowUrl: 'my-icon-shadow.png',
				//shadowRetinaUrl: 'my-icon-shadow@2x.png',
				//shadowSize: [68, 95],
				//shadowAnchor: [22, 94]
			});

			var markerBounds = { height: 50, width: 50 };

			var markers = [];
				% if c.profile.has_key( 'works_created_locations' ) :
					% for location in c.profile['works_created_locations']:
						% if c.relations["uuid_" + location].has_key('geo_lat') and c.relations["uuid_" + location].has_key('geo_long') :
							var divIcon = L.divIcon({
								html:'<svg class="d3marker created" id=' + "uuid_" + location + '></svg>',
								iconSize: [markerBounds.width, markerBounds.height],
								className: "d3marker"
							});
							markers.push(
								L.marker(
									[
										${c.relations["uuid_" + location]['geo_lat']},
										${c.relations["uuid_" + location]['geo_long']}
									],
									{icon:divIcon}
								)
							);
						% endif
					% endfor
				% endif

				% if c.profile.has_key( 'works_received_locations' ) :
					% for location in c.profile['works_received_locations']:
						% if c.relations["uuid_" + location].has_key('geo_lat') and c.relations["uuid_" + location].has_key('geo_long') :
							divIcon = L.divIcon({
								html:'<svg class="received" id=' + "uuid_" + location + '></svg>',
								iconSize: [markerBounds.width, markerBounds.height],
								className: "d3marker"
							});
							markers.push(
								L.marker(
									[
										${c.relations["uuid_" + location]['geo_lat']},
										${c.relations["uuid_" + location]['geo_long']}
									],
									{icon:divIcon}
								)
							);
						% endif
					% endfor
				% endif

			var group = L.featureGroup(markers);
			var bounds = group.getBounds();
			console.log(bounds);
			map.fitBounds(group.getBounds().pad(0.1));
			group.addTo(map);


			// Set up div
			var divs = d3.selectAll(".d3marker")
					.style("background-color","none")
			;

			// set up svg
			var svgs = d3.selectAll(".d3marker svg")
					.attr("width", markerBounds.width )
					.attr("height", markerBounds.height )
			;

			var data = [2, 4, 8, 10];
			var color = d3.scale.ordinal()
					.range(["rgba(255,0,0,0.5)","rgba(0,0,230,0.5)","rgba(0,230,0,0.5)","rgba(255,0,220,0.5)","rgba(255,220,0,0.5)"])//['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c'])
					.domain(d3.range(0,5) );

			var gs =  svgs.append( "g")
					.attr("transform", "translate(" + markerBounds.width / 2 + "," + markerBounds.height / 2 + ")")
			;

			var pie = d3.layout.pie();
			var arc = d3.svg.arc().innerRadius(10).outerRadius(markerBounds.width/2 - 1);

			var arcs = gs.selectAll("arc")
							.data( pie( data ) )
							.enter()
							.append("g")
							.attr("class","arc")
			;

			arcs.append("path")
					.attr("fill", function(d, i) {
						//return d3.scale.category10(i);
						//return (i===1) ? "red" : "blue";
						return color(i);
					})
					.attr("d", arc )
			;

			//divs.selectAll("svg.created circle")
			//		.attr("fill", "green")
			//;

			//divs.selectAll("svg.received circle")
			//		.attr("fill", "red")
			//;

			/*var featureLayer = L.mapbox.featureLayer({
				// this feature is in the GeoJSON format: see geojson.org
				// for the full specification
				type: 'Feature',
				geometry: {
					type: 'Point',
					// coordinates here are in longitude, latitude order because
					// x, y is the standard for GeoJSON and many formats
					coordinates: [
						% if c.profile.has_key( 'works_created_locations' ) :
							% for location in c.profile['works_created_locations']:
								% if c.relations["uuid_" + location].has_key('geo_lat') and c.relations["uuid_" + location].has_key('geo_long') :
									${c.relations["uuid_" + location]['geo_long']},${c.relations["uuid_" + location]['geo_lat']},
								% endif
							% endfor
						% endif
						% if c.profile.has_key( 'works_received_locations' ) :
							% for location in c.profile['works_received_locations']:
								% if c.relations["uuid_" + location].has_key('geo_lat') and c.relations["uuid_" + location].has_key('geo_long') :
									${c.relations["uuid_" + location]['geo_long']},${c.relations["uuid_" + location]['geo_lat']},
								% endif
							% endfor
						% endif
					]
				}
			}).addTo(map);*/

		</script>
	% endif
</%def>

##---------------------------------------------------------------------------------------------

<%def name="profileRight()">

  ##============ Left-hand panel showing personal information =========================================
  <dl style="margin-top:5px;">

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

    ${self.relations_list( h.get_place_where_born_fieldname(), display_label = True )}
    ${self.relations_list( h.get_place_where_died_fieldname(), display_label = True )}
    ${self.relations_list( h.get_place_visited_fieldname(), display_label = True )}

    ${self.relations_list( h.get_is_child_of_fieldname(), display_label = True )}
    ${self.relations_list( h.get_is_parent_of_fieldname(), display_label = True )}
    ${self.relations_list( h.get_is_sibling_of_fieldname(), display_label = True )}
    ${self.relations_list( h.get_is_spouse_of_fieldname(), display_label = True )}
    ${self.relations_list( h.get_is_relative_of_fieldname(), display_label = True )}
    ${self.relations_list( h.get_unspecified_relationship_with_fieldname(), display_label = True )}

    ${self.relations_list( h.get_orgs_of_which_member_fieldname(), display_label = True )}
    ${self.relations_list( h.get_members_of_org_fieldname(), display_label = True )}

    ${self.def_list_item( h.get_person_further_reading_fieldname() )}
  </dl>

</%def>

<%def name="profile()">

  <%
  works_created = self.get_works_summary_sorted_by_date( h.get_works_created_fieldname())

  letters_received = self.get_works_summary_sorted_by_date( h.get_letters_received_fieldname())

  works_in_which_mentioned = self.get_works_summary_sorted_by_date( \
                                  h.get_works_in_which_mentioned_fieldname())
  %>



  ##============= Right-hand panel showing details of letters =========================================
  <div id="details">


	<div class="column profilepart">
	    <h3><img src="/img/icon-people.png" class=""/>Details</h3>
		<div class="content">
			<dl>
			${self.def_list_item( h.get_alias_fieldname() )}
			${self.def_list_item( h.get_person_titles_or_roles_fieldname())}
		    % if not c.profile.has_key( h.get_is_organisation_fieldname() ):
		      ${self.def_list_item( h.get_gender_fieldname(), capitalize=True )}
		    % endif
			</dl>
		</div>
	</div>

	% if c.profile.has_key( h.get_birth_year_fieldname() ) or \
		c.profile.has_key( h.get_birth_month_fieldname() ) or \
		c.profile.has_key( h.get_birth_day_fieldname() ) or \
		c.profile.has_key( h.get_death_year_fieldname() ) or \
		c.profile.has_key( h.get_death_month_fieldname() ) or \
		c.profile.has_key( h.get_death_day_fieldname() ) :

	  <div class="column profilepart">
	    <h3><img src="/img/icon-calendar.png" class=""/>Dates</h3>
		  <div class="content"><dl>
        ${self.write_birth_and_death_dates()}
			 </dl></div>
		  <br>
	  </div>

	% endif

	  <div class="column profilepart">

	    <h3><img src="/img/icon-statistics.png" class=""/>Catalogue Statistics</h3>

		<div class="content">
	    ##=================================================================================================
	    ## This section shows totals for letters sent, received and in which mentioned,
	    ## as simple figures linking through to Works Search Results.
	    ## See base.mako.

	        ${self.totals_linking_to_list_of_works( object_type = 'person' )}

		    ##=================================================================================================
		    ## This section produces bar-charts, in conjunction with script graph_scripts(), invoked in footer.
		    <%
		        # Visualise counters
		        counts = {}
		        self.set_year_counts_for_graphs( h.get_works_created_fieldname(), works_created, counts )
		        self.set_year_counts_for_graphs( h.get_letters_received_fieldname(), letters_received, counts )
		        self.set_year_counts_for_graphs( h.get_works_in_which_mentioned_fieldname(), \
		                                         works_in_which_mentioned, counts )

		        # Get min / max counts
		        first_and_last = self.set_first_and_last_years_for_graphs( counts )

		        # Add years with nothing
		        self.set_years_with_zero_for_graphs( first_and_last[0], first_and_last[1], counts )

		        count_keys = sorted(counts)
		    %>

		    <script type='text/javascript'>
				function toLongFormat(d,p,i,z){for(i=0,z=d.length;i<z;i++){p.push({year:d[i][0],mentioned:d[i][1],recipient:d[i][2],creator:d[i][3]});}return p;}
				var person_data = toLongFormat([
					% for year in count_keys :
[${year},${counts[year]['mentioned']},${counts[year]['recipient']},${counts[year]['creator']}],\
					% endfor
				],[]);
		    </script>

			<div id="chart">
				<div class="button-bar">
					<ul class="button-group unknown" style="display:none">
						<li><button id="show_unknown" class="button tiny">Show unknown</button></li>
					</ul>


					<ul class="button-group bars" style="display:none">
						<li><button id="bars_seperate" class="highlight button tiny">Separate charts</button></li>
						<li><button id="bars_stacked" class="button tiny">Stack bars</button></li>
						<li><button id="bars_split" class="button tiny">Split bars</button></li>
					</ul>

					<ul class="button-group screen">
						<li><button id="fullscreen" class="button tiny">Full screen</button></li>
					</ul>
				</div>
			</div>
			<br/>
		</div>
	</div>
    ##=================================================================================================

	  % if c.profile.has_key( h.get_works_created_fieldname() ):
		  <div class="column profilepart">
			  ${self.h4_works_list( h.get_works_created_fieldname(), sorted_list = works_created, img='icon-quill.png' )}
		  </div>
      % endif
	  % if c.profile.has_key( h.get_letters_received_fieldname() ):
		  <div class="column profilepart">
			  ${self.h4_works_list( h.get_letters_received_fieldname(), sorted_list = letters_received, img='icon-quill.png' )}
		  </div>
	  % endif
	  % if c.profile.has_key( h.get_works_in_which_mentioned_fieldname() ):
		  <div class="column profilepart">
			  ${self.h4_works_list( h.get_works_in_which_mentioned_fieldname(), sorted_list = works_in_which_mentioned, img='icon-quill.png' )}
		  </div>
	  % endif
	  % if c.profile.has_key( h.get_relations_to_comments_fieldname() ):
		  <div class="column profilepart">
			  ${self.h4_relations_list( h.get_relations_to_comments_fieldname(), type='simple' )}
		  </div>
	  % endif


	  %if 'works_to_people' in c.profile or 'works_from_people' in c.profile :
		  <div class="column profilepart">
			  <h3><img src="/img/icon-people.png">People communicated with</h3>

			  % if 'works_to_people' in c.profile :
                  <%
						have_person = False
						have_organisation = False
						for person in c.profile['works_to_people']:
							if c.relations["uuid_" + person]['ox_isOrganisation'] :
								have_organisation = True
							if not c.relations["uuid_" + person]['ox_isOrganisation'] :
								have_person = True
                  %>

				  % if have_person:
					  <h4>People who received letters</h4>
					  <ul>
						  % for person in c.profile['works_to_people']:
							  % if not c.relations["uuid_" + person]['ox_isOrganisation']:
							  <li><a href="/${person}">${c.relations["uuid_" + person]['foaf_name']}</a></li>
							  % endif
						  % endfor
					  </ul>
                  % endif

				  % if have_organisation:
					  <h4>Organisations who received letters</h4>
					  <ul>
						  % for person in c.profile['works_to_people']:
						     % if c.relations["uuid_" + person]['ox_isOrganisation']:
							  <li><a href="/${person}">${c.relations["uuid_" + person]['foaf_name']}</a></li>
							 % endif
						  % endfor
					  </ul>
				  % endif
			  % endif

			  % if 'works_from_people' in c.profile :
			  <%
				  have_person = False
				  have_organisation = False
				  for person in c.profile['works_to_people']:
					if c.relations["uuid_" + person]['ox_isOrganisation'] :
						have_organisation = True
					if not c.relations["uuid_" + person]['ox_isOrganisation'] :
						have_person = True
			  %>
			    % if have_person:
				  <h4>People who sent letters</h4>
				  <ul>
					  % for person in c.profile['works_from_people']:
					    % if not c.relations["uuid_" + person]['ox_isOrganisation']:
						  <li><a href="/${person}">${c.relations["uuid_" + person]['foaf_name']}</a></li>
						%  endif
					  % endfor
				  </ul>
				% endif

				  % if have_organisation:
					  <h4>Organisations who sent letters</h4>
					  <ul>
						  % for person in c.profile['works_from_people']:
							  % if c.relations["uuid_" + person]['ox_isOrganisation']:
								  <li><a href="/${person}">${c.relations["uuid_" + person]['foaf_name']}</a></li>
							  %  endif
						  % endfor
					  </ul>
				  % endif

			  % endif
		  </div>
	  %endif

	  %if c.profile.has_key( 'works_created_locations' ) or c.profile.has_key( 'works_received_locations' ) :
		  <div class="column profilepart">
			  <h3><img src="/img/icon-globe.png">Locations where letters were sent or received</h3>
			  <div id='map' style="width:100%;height:440px;"></div>
			  <p>Green markers show where letters were sent from, red markers show where letters were received.</p>

		    % if c.profile.has_key( 'works_created_locations' ) :
					<h4>Locations letters were sent from</h4>
					<ul>
					% for location in c.profile['works_created_locations']:
						<li><a href="/${location}">${c.relations["uuid_" + location]['geonames_name']}</a></li>
		            % endfor
					</ul>
			% endif

		  % if c.profile.has_key( 'works_received_locations' ) :
				  <h4>Locations letters were addressed to</h4>
				  <ul>
					  % for location in c.profile['works_received_locations']:
						  <li><a href="/${location}">${c.relations["uuid_" + location]['geonames_name']}</a></li>
					  % endfor
				  </ul>
		  % endif
		  </div>
	  %endif

	<br class="clearboth">
  </div>
</%def>

##---------------------------------------------------------------------------------------------

<%def name="body()"></%def>

##---------------------------------------------------------------------------------------------

<%def name="set_year_counts_for_graphs( relevant_works_fieldname, data, counts )">
	<%
		if relevant_works_fieldname in c.profile:

			if relevant_works_fieldname == h.get_works_created_fieldname():
				relationship_type = 'creator'
			elif relevant_works_fieldname == h.get_letters_received_fieldname():
				relationship_type = 'recipient'
			elif relevant_works_fieldname == h.get_works_in_which_mentioned_fieldname():
				relationship_type = 'mentioned'
			else: ## invalid input
				return

			year_of_work_fieldname = h.get_start_year_fieldname()

			for item in data:

				obj = item[ 'obj' ]

				year = "?"
				if year_of_work_fieldname in obj:
					year = obj[ year_of_work_fieldname ]

				if year not in counts:
					counts[ year ] = { 'creator':0, 'recipient':0, 'mentioned':0  }

				# Increment the value for the current type of work
				counts[ year ][ relationship_type ] += 1


	%></%def>
## End function set_year_counts_for_graphs()
##---------------------------------------------------------------------------------------------

<%def name="set_first_and_last_years_for_graphs( counts )">
##{
  <%
  max_year = 1
  min_year = 9999
  for year in counts: #{
    if year != '?' and year != 9999: #{
      if year > max_year: #{
        max_year = year
      #}
      if year < min_year: #{
        min_year = year
      #}
    #}
  #}

  # Todo: Add in birth and death dates
  #year_b  = c.profile.get( h.get_birth_year_fieldname(),  9999 )
  #year_d  = c.profile.get( h.get_death_year_fieldname(),  0 )
  #if min_year > year_b :
  #  min_year = year_b
  #if max_year < year_d :
  #  max_year = year_d

  first_and_last = ( min_year, max_year )
  return first_and_last
  %>
##}
</%def>
## End function set_first_and_last_years_for_graphs()
##---------------------------------------------------------------------------------------------

<%def name="set_years_with_zero_for_graphs( min_year, max_year, counts )">
##{
  <%
  year = min_year
  while year < max_year: #{
    if year not in counts.keys():
      counts[year] = { 'creator':0, 'recipient':0, 'mentioned':0 }
    year += 1
  #}
  %>
##}
</%def>
## End function set_years_with_zero_for_graphs()
##---------------------------------------------------------------------------------------------

<%def name="write_birth_and_death_dates()">
##{
  <%
  range = False

  months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December', '' ]

  ##========================
  ## Put birth date together
  year_b  = c.profile.get( h.get_birth_year_fieldname(),  '' )
  month_b = c.profile.get( h.get_birth_month_fieldname(), 13 )
  day_b   = c.profile.get( h.get_birth_day_fieldname(),   '' )

  flags_decoded = self.decode_uncertainty_flags( h.get_birth_date_flags_fieldname_root() ) 

  date_b = "%s %s %s %s" % ( day_b, months[month_b-1], year_b, flags_decoded )

  ##========================
  ## Put death date together
  year_d  = c.profile.get( h.get_death_year_fieldname(),  '' )
  month_d = c.profile.get( h.get_death_month_fieldname(), 13 )
  day_d   = c.profile.get( h.get_death_day_fieldname(),   '' )

  flags_decoded = self.decode_uncertainty_flags( h.get_death_date_flags_fieldname_root() ) 

  date_d = "%s %s %s %s" % ( day_d, months[month_d-1], year_d, flags_decoded )
  %>

  ##====================
  ## Print out the dates
  % if date_b.strip() :
    <dt>Date of birth</dt>
    <dd>${date_b}</dd>
  % endif

  % if date_d.strip() :
    <dt>Date of death</dt>
    <dd>${date_d}</dd>
  % endif
##}
</%def>
## End function write_birth_and_death_dates()
##---------------------------------------------------------------------------------------------
