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
				var person_data = [\
% for year in count_keys :
<% 
	mem=counts[year]['mentioned']
	rec=counts[year]['recipient']
	cre=counts[year]['creator']
%>\
{y:${year},\
% if mem != 0 :
m:${mem},\
% endif 
% if rec != 0 :
r:${rec},\
% endif
% if cre != 0 :
c:${cre},\
% endif
},\
% endfor
];
				(function toLongFormat(){var i=person_data.length,d;for(;i;i--){d=person_data[i-1];d.year=d.y;d.mentioned=d.m||0;d.recipient=d.r||0;d.creator=d.c||0;delete d.y,delete d.m,delete d.c,delete d.r;}})();
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

	  <div class="column profilepart">
		  ${self.h4_works_list( h.get_works_created_fieldname(), sorted_list = works_created, img='icon-quill.png' )}
	  </div>

	  <div class="column profilepart">
		  ${self.h4_works_list( h.get_letters_received_fieldname(), sorted_list = letters_received, img='icon-quill.png' )}
	  </div>
	  <div class="column profilepart">
		  ${self.h4_works_list( h.get_works_in_which_mentioned_fieldname(), sorted_list = works_in_which_mentioned, img='icon-quill.png' )}
	  </div>
	  <div class="column profilepart">
		  ${self.h4_relations_list( h.get_relations_to_comments_fieldname(), type='simple' )}
	  </div>
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
