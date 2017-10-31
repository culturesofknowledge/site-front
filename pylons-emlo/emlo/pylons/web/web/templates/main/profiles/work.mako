# -*- coding: utf-8 -*-
<%!
   import web.lib.relations
   relation_fields = web.lib.relations.object_relation_fields['work']
   
   main_title = 'Work'
%>

<%inherit file="/main/profile.mako" />

<%namespace name="trans" file="/helpers/translate.mako" import="*"/>
   
<%def name="for_head()">\
<style>
	h3,h4{margin-top: 0.5rem;margin-bottom: 0.2rem;}
	h3.worklegend{font-size:25px !important}
	.profilepart h4{font-size:22px !important}
	.profilepart h5 { font-size: 20px !important; }
	p{margin-bottom:0}
	span.as-marked {
		font-family: monospace;
		font-size: 17px;
	}
	.people,.locations {
		margin-bottom: 17px;
		margin-left: 10px;
	}
	.fieldlabel { color:#172854; min-width: 120px; margin-right: 10px;display:inline-block }
	.flags{font-size:smaller}
	.flags:before { content:"("}
	.flags:after { content:")"}
	.profilepart .profilepart .content { margin-left: 6px; }
	.display_details_of_one_object.True {
		border-left: 1px dashed #777;
		padding: 5px 0 5px 20px;
		margin-bottom: 10px;
	}
	.comment {
		margin-top: 10px;
	}

</style>
</%def>
<%def name="for_foot()">
		<%
			catalogue_fieldname = h.get_catalogue_fieldname()
		%>

    % if c.profile.has_key( catalogue_fieldname ) :
      <%
      #---------
      catalogue_label = trans.translate( catalogue_fieldname )
      catalogue_value = c.profile[ catalogue_fieldname ]
			%>

			<script src="/js/catalogue-blog.js"></script>
	  <script>
		  var catalogue_name = "${catalogue_value}";

		  var data = getBlogDataFromCatName( catalogue_name );

		  if( data ) {
			  var a = document.getElementById("catalogue_link_a");
			  var span = document.getElementById("catalogue_link_span");

			  span.innerText = "Collection details: ";

			  a.innerText = data.title;
			  a.title = data.title;
			  a.href = data.href;
		  }
	  </script>
		% endif

</%def>

#----------------------------------------------------------------------------------------------------

<%def name="profileRight()">

  <%
  #---------
  image_relations_fieldname = h.get_relations_to_image_fieldname()

  catalogue_fieldname = h.get_catalogue_fieldname()

  author_uri_fieldname = h.get_author_uri_fieldname()
  author_as_marked_fieldname = h.get_author_as_marked_fieldname()

  addressee_uri_fieldname = h.get_addressee_uri_fieldname()
  addressee_as_marked_fieldname = h.get_addressee_as_marked_fieldname()

  origin_uri_fieldname = h.get_origin_uri_fieldname()
  origin_as_marked_fieldname = h.get_origin_as_marked_fieldname()

  destination_uri_fieldname = h.get_destination_uri_fieldname()
  destination_as_marked_fieldname = h.get_destination_as_marked_fieldname()
  #---------
  %>

  <dl style="margin-top:25px;">
    ##---------------------- Start left-hand panel -------------------------------

		## Source
    % if c.profile.has_key( h.get_source_of_data_fieldname() ):
      <dt>Source of record</dt>
			<dd>${c.profile[ h.get_source_of_data_fieldname() ]}</dd>
    % endif



	  ##=============================== Catalogue ==================================
      % if c.profile.has_key( catalogue_fieldname ) :
  <%
	  #---------
	  catalogue_label = trans.translate( catalogue_fieldname )
	  catalogue_value = c.profile[ catalogue_fieldname ]
	  #---------
  %>
  ##<dt>${catalogue_label}</dt>
      ##<dd>
        ##<a href="/forms/advanced?col_cat=${catalogue_value}">
           ##${catalogue_value.capitalize()}
           ##${catalogue_value}
        ##</a>
        ##<br/>
        <span style="font-style:italic;"><span id="catalogue_link_span"></span><a id="catalogue_link_a" href="http://emlo.bodleian.ox.ac.uk/blog/?page_id=480#${catalogue_value.lower()}">
        ## About ${catalogue_value.capitalize()}
        ## About ${catalogue_value}
        </a></span>
  ##</dd>
	% endif

	  ##====================== Other items in left-hand bar ========================
    </dl>


    ##============================== Image(s) ===================================
    ## MMK/MW commented below, email from James, Hartlib issue - We've put back now.
    ${self.further_relations( image_relations_fieldname )} 

  ##=============================== Alternative records ===============================
  
  % if c.profile.has_key(h.get_matches_fieldname()):
	  <div class="column" style="border-top: 1px solid #efc319;">
	  <h3 class="worklegend"><!-- <img src="/img/icon-related-resources.png" class="workicon"/> -->Alternative records</h3>

		<div class="workspacing  content">
			${self.relations_list( h.get_matches_fieldname() )}
		</div><!-- class:workspacing  content -->
	  </div>
  % endif

</%def>

<%def name="profile()">

  <%
  #---------
  image_relations_fieldname = h.get_relations_to_image_fieldname()

  catalogue_fieldname = h.get_catalogue_fieldname()

  author_uri_fieldname = h.get_author_uri_fieldname()
  author_as_marked_fieldname = h.get_author_as_marked_fieldname()

  addressee_uri_fieldname = h.get_addressee_uri_fieldname()
  addressee_as_marked_fieldname = h.get_addressee_as_marked_fieldname()

  origin_uri_fieldname = h.get_origin_uri_fieldname()
  origin_as_marked_fieldname = h.get_origin_as_marked_fieldname()

  destination_uri_fieldname = h.get_destination_uri_fieldname()
  destination_as_marked_fieldname = h.get_destination_as_marked_fieldname()
  #---------
  %>


  <div class="row" id="details">

  ##---------------------- Start right-hand panel --------------------------------
  ##=============================== Dates ==================================
  <%
  months = ['January', 'February', 'March','April','May','June',
  'July','August','September','October','November','December','' ]

  day   = c.profile.get( h.get_start_day_fieldname(),   '' )
  month = c.profile.get( h.get_start_month_fieldname(), 13 )
  year  = c.profile.get( h.get_start_year_fieldname(),  '' )

  date = "%s %s %s" % (day, months[month-1], year)

  range = False
  date_range_fieldname = h.get_date_range_fieldname()
  if date_range_fieldname in c.profile and c.profile[ date_range_fieldname ] :
    range = True

  day_to   = c.profile.get( h.get_end_day_fieldname(),   '' )
  month_to = c.profile.get( h.get_end_month_fieldname(), 13 )
  year_to  = c.profile.get( h.get_end_year_fieldname(),  '' )

  date_to = "%s %s %s" % (day_to, months[month_to-1], year_to)

  date_no_spaces = date.replace( ' ', '' )
  date_to_no_spaces = date_to.replace( ' ', '' )
  if date_no_spaces + date_to_no_spaces == '':
    date = 'Unknown date'

  #---------
  %>

  % if c.profile.has_key(h.get_original_calendar_fieldname()): ## adding control to show or not show the fieldset if there is no content
		<div class="column workfieldset  profilepart">
		  <h3 class="worklegend">
			  <img src="/img/icon-calendar.png" class="workicon"/>Dates
		  </h3>
			<div class="workspacing content">

			  % if not range:
				<p>${date}</p>
			  % elif date_no_spaces > '' and date_to_no_spaces > '':
			  	<p>Between ${date} and ${date_to}</p>
			  % elif date_no_spaces > '':
			  	<p>On or after ${date}</p>
			  % else:
			  	<p>On or before ${date_to}</p>
			  % endif

			  <%
				 original_calendar_fieldname = h.get_original_calendar_fieldname()
				 date_as_marked_fieldname = h.get_date_as_marked_fieldname()
			  %>

			  % if original_calendar_fieldname in c.profile :
				  <p><span class="fieldlabel">Calendar:</span> ${c.profile[original_calendar_fieldname]}.<p/>
			  % endif   

			  % if date_as_marked_fieldname in c.profile :
				  <p><span class="fieldlabel">Marked as:</span> <span class="as-marked">${c.profile[date_as_marked_fieldname]}</span></p>
			  % endif

			  <% flags_decoded = self.decode_uncertainty_flags( h.get_date_flags_fieldname_root() ) %>
			  %if flags_decoded:
				  <p><span class="flags">Date is ${flags_decoded}</span></p>
  			  %endif


				% if c.profile.has_key( h.get_relations_to_comments_on_date_fieldname() ):
					<div class="comment">
						<p><span class="fieldlabel">Comments about the date:</span></p>
						${self.simple_relations( h.get_relations_to_comments_on_date_fieldname(), "list-style: none;")}
					</div>
				% endif
			</div><!-- class:workspacing content -->
		  </div>
	% endif

  ##=============================== Authors ======================================
  % if c.profile.has_key(author_uri_fieldname) or c.profile.has_key( addressee_uri_fieldname ) or \
		c.profile.has_key( h.get_relations_to_people_mentioned_fieldname() ): ## adding control to show or not show the fieldset if there is no content
		<div class="column workfieldset  profilepart">
		  <h3 class="worklegend">
			  <img src="/img/icon-people.png" class="workicon"/>People
		  </h3>

			<div class="workspacing content">
			  % if c.profile.has_key( author_uri_fieldname ) :   
				<h4>Author(s)</h4>
					<div class="people authors">
			    		${self.relations_list( author_uri_fieldname )}
						% if c.profile.has_key( author_as_marked_fieldname ) :
							<p><span class="fieldlabel">Marked as:</span> <span class="as-marked">${c.profile[author_as_marked_fieldname]}</span></p>
						% endif

						<% flags_decoded = self.decode_uncertainty_flags( h.get_author_flags_fieldname_root() ) %>
						%if flags_decoded:
							<p><span class="flags">Authors are ${flags_decoded}</span></p>
                        %endif

			  			% if c.profile.has_key( h.get_relations_to_comments_on_author_fieldname() ):
							<div class="comment">
								<p><span class="fieldlabel">Comments about the authors:</span></p>
								${self.simple_relations( h.get_relations_to_comments_on_author_fieldname(), "list-style: none;")}
							</div>
						%endif
					</div>
			  % endif

			  ##=============================== Addressees ==================================
			  % if c.profile.has_key( addressee_uri_fieldname ):   
				<h4>Recipient(s)</h4>
				<div class="people recipients">
					${self.relations_list( addressee_uri_fieldname )}
					% if c.profile.has_key( addressee_as_marked_fieldname ) :
						<p><span class="fieldlabel">Marked as:</span> <span class="as-marked">${c.profile[ addressee_as_marked_fieldname ]}</span></p>
					% endif

					<% flags_decoded = self.decode_uncertainty_flags( h.get_addressee_flags_fieldname_root() ) %>
					%if flags_decoded:
						<p><span class="flags">Recipients are ${flags_decoded}</span></p>
					%endif

  					% if c.profile.has_key( h.get_relations_to_comments_on_addressee_fieldname() ):
						<div class="comment">
							<p><span class="fieldlabel">Comments about the recipients:</span></p>
							${self.simple_relations( h.get_relations_to_comments_on_addressee_fieldname(), "list-style: none;" )}
						</div>
					%endif
				</div>
			  % endif

			  ##=============================== People Mentioned ==================================
				% if c.profile.has_key( h.get_relations_to_people_mentioned_fieldname() ):
					<h4>Mentions</h4>
					<div class="people mentions">
						${self.relations_list( h.get_relations_to_people_mentioned_fieldname() )}

  						% if c.profile.has_key( h.get_comments_on_people_mentioned_in_work_fieldname() ):
							<div class="comment">
								<p><span class="fieldlabel">Comments about mentioned:</span></p>
								${self.simple_relations( h.get_comments_on_people_mentioned_in_work_fieldname(), "list-style: none;" )}
							</div>
						% endif
					</div>
  				% endif
			</div><!-- class:workspacing content -->
		</div>
  % endif

  ##============================ Place of origin =================================
  % if c.profile.has_key(origin_uri_fieldname) or c.profile.has_key( destination_uri_fieldname ) or \
       c.profile.has_key( h.get_relations_to_places_mentioned_fieldname() ):  ## adding control to show or not show the fieldset if there is no content
	  <div class="column workfieldset profilepart">
	  <h3 class="worklegend"><img src="/img/icon-globe.png" class="workicon"/>Places</h3>

		<div class="workspacing content">
		  % if c.profile.has_key( origin_uri_fieldname ) :   
			<h4>Origin</h4>
		  		<div class="locations origin">

					${self.relations_list( origin_uri_fieldname )}
					% if c.profile.has_key( origin_as_marked_fieldname ) :
						<p><span class="fieldlabel">Marked as:</span> <span class="as-marked">${c.profile[ origin_as_marked_fieldname ]}</span></p>
					% endif

					<% flags_decoded = self.decode_uncertainty_flags( h.get_origin_flags_fieldname_root() ) %>
					% if flags_decoded:
						<p><span class="flags">Origin is ${flags_decoded}</span></p>
					% endif

		  			% if c.profile.has_key( h.get_relations_to_comments_on_origin_fieldname() ):
						<div class="comment">
							<p><span class="fieldlabel">Comments about the origin:</span></p>
							${self.simple_relations( h.get_relations_to_comments_on_origin_fieldname(), "list-style: none;")}
						</div>
					% endif
				</div>
		  % endif

		  ##=============================== Destination ==================================
		  % if c.profile.has_key( destination_uri_fieldname ) :   
			<h4>Destination</h4>
			<div class="locations destination">
				${self.relations_list( destination_uri_fieldname )}

				% if c.profile.has_key( destination_as_marked_fieldname ) :
					<p><span class="fieldlabel">Marked as:</span> <span class="as-marked">${c.profile[ destination_as_marked_fieldname ]}</span></p>
				% endif

				<% flags_decoded = self.decode_uncertainty_flags( h.get_destination_flags_fieldname_root() ) %>
				% if flags_decoded :
					<p><span class="flags">Destination is ${flags_decoded}</span></p>
				% endif

				% if c.profile.has_key( h.get_relations_to_comments_on_destination_fieldname() ):
					<div class="comment">
						<p><span class="fieldlabel">Comments about the destination:</span></p>
						${self.simple_relations( h.get_relations_to_comments_on_destination_fieldname(), "list-style: none;" )}
					</div>
				% endif
			</div>
		  % endif

		  ##=============================== Places mentioned ===============================
		  % if c.profile.has_key( h.get_relations_to_places_mentioned_fieldname() ) :
			<h4>Mentions</h4>
			<div class="locations mentions">
		  		${self.h4_relations_list( h.get_relations_to_places_mentioned_fieldname() )}
			</div>
		  % endif
		</div><!-- class:workspacing  content -->
	  </div>

  % endif 

  ##=============================== Content ===============================
  % if c.profile.has_key(h.get_abstract_fieldname()) or \
		c.profile.has_key(h.get_keywords_fieldname()) or \
		c.profile.has_key(h.get_language_fieldname()) or \
		c.profile.has_key(h.get_incipit_fieldname()) or \
		c.profile.has_key(h.get_excipit_fieldname()) or \
		c.profile.has_key(h.get_postscript_fieldname()) or \
		c.profile.has_key(h.get_reply_to_fieldname()) or \
		c.profile.has_key(h.get_answered_by_fieldname()) or \
		c.profile.has_key(h.get_relations_to_works_mentioned_fieldname()) or \
		c.profile.has_key(h.get_works_in_which_mentioned_fieldname()):  ## adding control to show or not show the fieldset if there is no content
	  <div class="column workfieldset  profilepart">
	  <h3 class="worklegend">
		  <img src="/img/icon-quill.png" class="workicon"/>
		  Content
	  </h3>

		<div class="workspacing content">
		  <%
		  abstract_anchorname = self.get_anchor_name( 'abstract' )
		  %>
		  <div id="${abstract_anchorname}" name="${abstract_anchorname}">
		  	${self.h4_section( h.get_abstract_fieldname())}
		  </div>

		  ${self.h4_section( h.get_keywords_fieldname() )}
		  ${self.h4_section( h.get_language_fieldname() )}

		  ${self.h4_section( h.get_incipit_fieldname())}
		  ${self.h4_section( h.get_excipit_fieldname())}
		  ${self.h4_section( h.get_postscript_fieldname())}

		  ${self.h4_relations_list( h.get_reply_to_fieldname() )}  
		  ${self.h4_relations_list( h.get_answered_by_fieldname() )}  

		  ${self.h4_relations_list( h.get_relations_to_works_mentioned_fieldname() )}  
		  ${self.h4_relations_list( h.get_works_in_which_mentioned_fieldname() )}

		</div><!-- class:workspacing  content -->
	  </div>
  % endif

  ##============================= Manifestations =======================================
  ##============including repository, enclosures, physical properties etc.==============

  % if c.profile.has_key(h.get_relations_to_manifestation_fieldname()):
	 <div class="column workfieldset profilepart">
	  <h3 class="worklegend">
		  <img src="/img/icon-repository.png" class="workicon"/>
		  Repositories and Versions
	  </h3>

		<div class="workspacing content">
			<h4>Versions (originals, copies, digital, etc.)</h4>

			${self.detailed_relations(h.get_relations_to_manifestation_fieldname())}

		</div><!-- class:workspacing  content -->
	  </div>
  % endif



  ##============================ Related resources ====================================
	% if c.profile.has_key(h.get_relations_to_resource_fieldname()):  ## adding control to show or not show the fieldset if there is no content
	 <div class="column workfieldset  profilepart">
	  <h3 class="worklegend"><img src="/img/icon-related-resources.png" class="workicon"/>Related Resources</h3>

		<div class="workspacing  content">
			${self.h4_relations_list( h.get_relations_to_resource_fieldname(), title="", type='resource' )}
		</div><!-- class:workspacing  content -->
	  </div>
	 % endif


  ##============================= Comments ============================================
	% if c.profile.has_key( h.get_relations_to_comments_fieldname()) :
		<div class="column workfieldset  profilepart">
		  <h3 class="worklegend">
			  <img src="/img/icon-comment.png" class="workicon"/>
			  Comments
		  </h3>

		  <div class="workspacing  content">

			  ${self.h4_relations_list( h.get_relations_to_comments_fieldname(),
			  							title="General", type='simple')}

			</div><!-- class:workspacing  content -->
		  </div>
	% endif


		<!--
		Added = ${c.profile[ h.get_date_added_fieldname() ] }
		Created = ${c.profile[ h.get_date_created_fieldname() ] }
		Modified = ${c.profile[ h.get_date_changed_fieldname() ] }
		-->
	</div><!-- .row -->

</%def>

#----------------------------------------------------------------------------------------------------

<%def name="body()"></%def>

#----------------------------------------------------------------------------------------------------
