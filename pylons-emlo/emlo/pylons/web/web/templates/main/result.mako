# -*- coding: utf-8 -*-
<%!
   nav_selected = ''
   main_title = 'results'
%>
<%inherit file="/base.mako" />

<%namespace name="fields" file="/helpers/fields.mako" import="*"/>

##----------------------------------------------------------------------------------------------

<%def name="for_head()">
<script>$('table.highlight tr:nth-child(2n+1)').addClass('odd');</script> <!-- IE hack to accept even/odd rows -->
	<style>
		@media only screen and (min-width: 64.063em) {  /* min-width 1025px, large screens */
			.side {
				margin-top: 200px;
				border-top: 1px solid #efc319;
				border-bottom: 1px solid #efc319;
				padding-top: 15px;
			}
		}
		ul.pagination li {
			background-color: #ddd;
			margin-left: 4px;
		}
		.pagination-centered ul.pagination li {
			margin-bottom: 5px;
		}

		ul.pagination li a {
			color:black;
		}
		
	</style>
</%def>

<%def name="for_foot()">
</%def>

<%def name="body()">


		<div class="row">
			<div class="columns small-12 large-3 side">
             <h2>Search</h2>
               ${next.options()}
               <p></p>
             </div>

			<div class="columns small-12 large-9">
      <br>
        <!--h2>Results</h2-->
               ${next.results()}
               <p></p>
      </div>


    </div><!--id:right-->

</%def>

##----------------------------------------------------------------------------------------------

<%def name="options()">

   <%namespace name="tran" file="/helpers/translate.mako" import="*"/>
   <% decodes = [] %>


  <span class="font-normal">
  ${self.refine_search_button()}
  </span>

   <div id="current">
      <h3>Your current search</h3>
       % if len( c.query['fields'] ) > 0 :
         <table class="current">
         <% even=True %>
         % for key, details in c.query['fields'].iteritems() :
            % if key == 'letter' or key == 'browsing' or key == 'return_to_anchor' or key == 'start':
              <%continue%>
            % endif
            <%
            displaystring = details[ 'value' ]
            if key == 'object_type':
              displaystring = tran.translate( displaystring )

            if (key == 'dat_from_year' or key == 'dat_to_year') and displaystring == '9999':
              displaystring = '????'

            if key == 'cat_group' :
              displaystring = displaystring.replace("|","; ")

            if displaystring.startswith( 'http' ): #{  # We've got the URI not the displayable name
              record = h.get_item_from_uri( displaystring )
              if record:
                displaystring = record.get(h.get_main_displayable_fieldname(record['object_type']))
              else:
                displaystring = "Not found"

            elif displaystring.startswith( 'uuid' ): #{  # We've got the UUID not the displayable name
              uuids = displaystring.split( ',' )
              displaystring = ''
              object_type = ''

              ## They will all be of the same object type, so find out fieldname for decoding.
              dict = h.get_records_from_solr( uuids[0], 'object_type' )
              for keyval, datavalues in dict.items(): #{
                object_type = datavalues[ 'object_type' ]
              #}
              main_displayable_fieldname = h.get_main_displayable_fieldname( object_type )

              dict = h.get_records_from_solr( uuids, main_displayable_fieldname )
              one_decode = ''
              for keyval, datavalues in dict.items(): #{
                one_decode = datavalues[ main_displayable_fieldname ]
                decodes.append( one_decode )
              #}
            #}
            %>

            % if details.has_key('for_current') == False or details['for_current'] == True :
               % if even :
                  <tr>
               % else :
                  <tr class="odd">
               % endif

               <td width="100px">
               <% field_label = details['name'] %>
               ${tran.translate( field_label )}
               </td>

               <td width="140px">
               % if displaystring != '' :
                 ${displaystring}
               % elif len( decodes ) > 0 :
                 ## Show contents of 'shopping basket'
                 % if len( decodes ) == 1:
                   ${ decodes[ 0 ] }
                 % else:
                   <% i = 0 %>
                   % for displaystring in decodes:
                     % if i > 0:
                       <br />
                     % endif
                     ${displaystring}
                     <% i+=1 %>
                   % endfor
                 % endif
               % endif
               </td>

               <td width="50px" style="padding:0;">
               <a href="${h.query_url(c.query['baseurl'],c.query['fields'],remove=key)}"
                  title="Remove from your search criteria">
               <img class="facet" src="/img/minus-facet.png" alt="Remove from your search criteria" height="15px" width="15px"/>
               </a>
               </td>

               </tr>
               <% even = not even %>
           % endif
         % endfor
         </table>
      % else:
         <table class="current"><tr><td>None</td></tr></table>
      % endif
   </div>

   <div id="options">
	  % if c.solr['numFound'] != 0:
	      % if c.solr['facets'] :
	         <h3 style="padding-bottom:3px;">Refine your results</h3>
	         <% facet_orders = [ h.get_author_uri_fieldname(),
	                             h.get_addressee_uri_fieldname(),
	                             h.get_origin_uri_fieldname(),
	                             h.get_destination_uri_fieldname(),
	                             h.get_catalogue_fieldname() ]
	         %>
	         % for facet in facet_orders : ##c.solr['facets'].iteritems() :
	            % if c.solr['facets'].has_key( facet ) :
	               <% counts = c.solr['facets'][facet] %>
	               ${self.facet(facet, counts)}
	            % endif
	         % endfor
	         % for facet, counts in c.solr['facets'].iteritems() :
	            % if not facet in facet_orders :
	               ${self.facet(facet, counts)}
	            % endif
	         % endfor
	      % endif
		%endif
   </div>
</%def>

##----------------------------------------------------------------------------------------------

<%def name="facet( facet, counts)">
##{
  <%
  field_to_search_on = facet
  if facet == h.get_start_year_fieldname(): #{
    field_to_search_on = 'dat_sin_year'
  #}

  # If they add a facet it will reduce their number of search results.
  # In that case, put them on the start of the new list, so that they don't 'fall
  # off' the end. E.g. if they had twelve pages of results and were on the last page,
  # then they add a facet that reduces the list to six pages, you can't leave them
  # still supposedly on page 12, because there will be no results for that page.

  restart_fields = {}
  for fieldname, field_details in c.query['fields'].iteritems(): #{
    if fieldname == 'start': #{
      restart = field_details.copy()
      if restart.has_key( 'value' ): #{
        restart[ 'value' ] = '0'
      #}
      restart_fields[ 'start' ] = restart
    #}
    else: #{
      restart_fields[ fieldname ] = field_details
    #}
  #}
  %>

  % if len(counts) > 0 : 
    <h4>
    ## Heading like 'Author', 'Destination' etc.
    ${tran.translate(facet)}
    </h4>

    <%
    # Sort by counts, highest first
    sorted_tups = sorted( counts.items(), key=lambda count : count[1], reverse=True )
    even=True
    %>

    ## Show the list of highest-scoring authors, destinations etc 
    ## and allow them to be added to the query.
    <table class="facet">

    % for item, count in sorted_tups :

      <%
      if "http://" in item : #{
        # We have a relation, need to decode it.
        full_item = c.solr['facets_relations'][h.uuid_from_uri( item, True )]
        decode = full_item.get( h.get_main_displayable_fieldname( full_item['object_type'] ))
      #}
      else: #{
        decode = item
      #}

      if field_to_search_on == 'object_type':
        decode = tran.translate( decode )

      value_to_search_for = item           
      if decode == None or decode == '' : #{
        decode = "Unknown"

        if facet == h.get_addressee_uri_fieldname() \
        or facet == h.get_author_uri_fieldname() :
          value_to_search_for = ""
        else :
          value_to_search_for = "unknown"
      #}
      %>

      % if even :
        <tr>
      % else :
        <tr>
      % endif

      ##================================================
      ## Facet via a link on the name of the person, place etc
      <td width="190px">
      <a href="${h.query_url(c.query['baseurl'], \
                 restart_fields, \
                 add=[ field_to_search_on, value_to_search_for ])}" title="Add to your search criteria">
      ${decode}
      </a>
      </td>
      ##================================================
      ## Show number of letters by this person, etc.

      <td width="50px">${count}</td>

      ##================================================
      ## Facet via the 'plus' button
      <td width="50px" style="padding:0;">
      <a href="${h.query_url(c.query['baseurl'], \
                 restart_fields, \
                 add=[ field_to_search_on, value_to_search_for ])}" title="Add to your search criteria">
      <img class="facet" src="/img/plus-facet.png" alt="Add to your search criteria" height="15px" width="15px"/>
      </a>
      </td>
      ##================================================
      </tr>
      <% even = not even %>
    % endfor
    </table>
  % endif
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="results()">
##{
  <%namespace name="pag" file="/helpers/pagination.mako" import="*"/>
  <%namespace name="trans" file="/helpers/translate.mako" import="*"/>

  <%
  records_found = c.solr['numFound']
  records_per_page = c.query['rows']
  %>

  ## If your query retrieved some results...
  % if c.solr['numFound'] != 0:
    <p>
    ## Write out a message saying how many results you found
    ${self.number_of_results_msg( records_found, records_per_page )}

    <%
    ## Write out some Javascript to bring up a popup window displaying images, abstracts or transcripts.
    detail_types = [ 'abstract', 'image', 'transcript' ]
    for detail_type in detail_types:
      self.write_further_details_popup_script( detail_type )
    %>

    ## Enable sorting by a different field (though not in quick search)
    <span id="sort">
    % if c.query['type'] != 'quick' :
      ${self.choose_new_sort_order_form()}
    % endif
    ${self.change_sort_order_script()}
    </span>
      
    ## Write out pagination buttons
    % if int(records_found) > int(records_per_page):
      ${pag.pagination( c.query['baseurl'], c.query['fields'], c.solr['numFound'], \
                        c.query['start'], c.query['rows'])}
    % endif

    <% current_row = int( c.query['start'] ) %>

    ## Start a table of data
    <table id="results" class="highlight">

      ## Write out column headings
      <tr>
      % if c.query['type'] == 'quick':
        ${self.column_headings_for_quick_search()}
      % else:
        ${self.column_headings_for_advanced_search()}
      % endif
      </tr>

      ## Now write out the actual results, one row at a time
      % for item in c.solr['results']:
        <tr>
          <% current_row = current_row+1 %>
          ${self.result( item, c.query['sort'], c.solr['highlights'], current_row )}
        </tr>
      % endfor
    </table>

    ## Repeat pagination buttons at the bottom of the page
    % if int(records_found) > int(records_per_page):
      ${pag.pagination( c.query['baseurl'], c.query['fields'], c.solr['numFound'], \
                        c.query['start'], c.query['rows'] )}
    % endif

  ## Alternatively display a message saying "No results found"
  % else :
    <p>No results found. We suggest that you...
    ${self.refine_search_button()}
    </p>
  % endif
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="result( item, sort, highlights, current_row )">
##{
  <%
  #--------------- Process one result for display here ----------------
  if c.query['type'] == 'quick' :
    quick_search_result( item, sort, highlights, current_row )
  else :
    advanced_search_result( item, sort, highlights, current_row )
  %>
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="quick_search_result( item, sort, highlights, current_row )">
##{
  <%
  #--------------- Process one result from Quick Search for display here ----------------

  object_type = item['object_type'].lower().strip()
  display_object_type = tran.translate( object_type )

  # Get name of the field that provides the best summary of the record, e.g. for work, use Description
  main_displayable_fieldname = h.get_main_displayable_fieldname( object_type ) 

  # Start with one column for 'quick' search, then later get further details in another column,
  # because 'quick' search retrieves a mixture of object types so we must work out what to display.

  collist = fields.get_columns_for_result_list( object_type )  
  colvalue = ''

  further_details_fields = fields.get_additional_fields( object_type )

  #----------------------------------------------------
  # Make a URL linking to the record you are displaying
  #----------------------------------------------------
  uuid = item['uuid']
  link_to_record = '/profile/' + object_type + '/' + uuid 

  item_to_flag = item  # later we display flags showing if a letter has an abstract, images etc.
  related_item = {}
  related_object_uri = ''
  related_object_desc = ''

  # If the item is a comment or a related resource, we don't want to display a profile page for it.
  # Instead we should show the work, person or place that is being commented on or that has a resource.

  if object_type == 'comment' or object_type == 'resource' : #{

    related_object_dict = h.get_related_obj_from_comment_or_resource( item )
    if related_object_dict.has_key( 'uri' ): #{
      related_object_uri = related_object_dict[ 'uri' ]
      relationship = related_object_dict[ 'relationship' ]
    #}

    if related_object_uri != '': #{

      ## Overwrite the original 'link to record' variable
      link_to_record = h.profile_url_from_uri( related_object_uri )
      display_object_type = tran.translate( relationship )
    
      related_item = h.get_item_from_uri( related_object_uri )
      if related_item.has_key( 'object_type' ): #{
        related_object_type = related_item[ 'object_type' ]
        related_object_desc_fieldname = h.get_main_displayable_fieldname( related_object_type )
        related_object_desc = related_item[ related_object_desc_fieldname ]

        item_to_flag = related_item  # display flags for the work being commented on
      #}
    #}
  #}

  %>

  ##=================== Rowcount column  ===================
  <td class="normalcell">
  ${current_row}
  </td>

  ##=================== Object type column  ===================
  ## This is the column that contains the link through to the profile page.

  ${self.link_to_profile_column( current_row, link_to_record, display_object_type )}

  
  ## 'Quick' search returns a mixture of different object types (e.g. comments, people, works), so we 
  ## need to work out dynamically what should appear in 'Brief details' and what in 'Further details'.

  ##=================== 'Brief details' column ===================
  <td class="normalcell">
  ## MMK/MW added this first IF statement (remove later), email from James, Hartlib issue
  ##%if item['object_type']!='image': 
      % if item.has_key( main_displayable_fieldname ) :
        <% colvalue = item[ main_displayable_fieldname ] %>

        % if object_type == 'resource':
          <%
          resource_url = ''
          resource_url_fieldname = h.get_resource_url_fieldname()
          if item.has_key( resource_url_fieldname ):
            resource_url = item[ resource_url_fieldname ]
          %>
          % if resource_url != '' :
            <a target="_blank" href="${resource_url}" title="${colvalue}">
            ${ colvalue }
            </a>
          % else:
            ${ colvalue }
          % endif

        % else:  # main display field for all other object types except for related resources
          ${ colvalue }
        % endif
      % endif
  ##%else:
  ##  Temporarily unavailable due to scheduled maintenance
  ##%endif
  </td>
  ##............... end 'Brief details' column ...................

  ##================ 'Further details' column ======================
  <td class="normalcell">
  ## MMK/MW added this first IF statement (remove later), email from James, Hartlib issue
  ##%if item['object_type']!='image': 
      % for label, fieldname in further_details_fields.iteritems() :
        % if item.has_key( fieldname ) :
          <%
          colvalue = item[fieldname]
          if fieldname == h.get_shelfmark_fieldname():  #{ # value is prefixed with 'shelf:'
            shelfmark_value_prefix = h.get_shelfmark_value_prefix()
            if colvalue.startswith( shelfmark_value_prefix ): #{
              colvalue = colvalue.replace( shelfmark_value_prefix, '', 1 )
            #}
          #}
          %>
          ${label}: ${colvalue}<br>
        % endif
      % endfor
  ##%endif

  ## If we've got a comment or a related resource, show some details of the primary object
  ## (work, person or place) that is being commented on etc.

  % if object_type == 'comment' or object_type == 'resource':
    <p>${related_object_desc}</p>
  % endif
  </td>
  ##............ end 'Further details' column ......................

  ##========== Column with highlighted snippets showing where search term was found ==========
  ${self.where_found_column( item, highlights )}


  ##====== 'Flags' column: the 'has image', 'has transcript' and 'has abstract' flags appear here. ========
  ${self.moreinfo_popups_column( item_to_flag, link_to_record )}

##} # end of quick_search_result()
</%def>

##----------------------------------------------------------------------------------------------

<%def name="advanced_search_result( item, sort, highlights, current_row )">
##{
  <%
  #--------- Display one result from Advanced Search or search form on Home Page ----------
  object_type = item['object_type'].lower().strip()   # In this function, type should always be 'work'
  display_object_type = tran.translate( object_type ) # and display type should always be 'Letter'

  #--------------------------------------------------
  # Work out which fields/columns you want to display
  #--------------------------------------------------
  collist = fields.get_columns_for_result_list( object_type )  
  colvalue = ''

  #----------------------------------------------------
  # Make a URL linking to the record you are displaying
  #----------------------------------------------------
  uuid = item['uuid']
  link_to_record = '/profile/' + object_type + '/' + uuid 
  %>

  ##=================== Rowcount column  ===================
  <td class="normalcell">
  ${current_row}
  </td>

  ##=================== Object type column  ===================
  ## This is the column that contains the link through to the profile page.

  ${self.link_to_profile_column( current_row, link_to_record, display_object_type )}

  ##============ Display columns already looked up for work ===========
  % for colname in collist :
    <td class="normalcell">
    % if item.has_key( colname ):
      % if colname == 'started_date_sort' :
        <% date_str = self.make_displayable_date( item ) %>
        ${date_str}
      % else:
        <% colvalue = unicode( item[ colname ] ) %>
        ${ colvalue }
      % endif
    % endif
    </td>  
  % endfor

  ##============ Display repositories/shelfmarks (need to look these up now) ============
  <td class="normalcell">
  % if item.has_key( h.get_relations_to_manifestation_fieldname() ):
    <% repos_details = self.get_repos_and_shelfmarks_from_work( item ) %>
    % for repos_and_shelfmark in repos_details:
      % if len( repos_details ) > 1:
        &bull; 
      % endif
      ${repos_and_shelfmark}
      <br>
    % endfor
  % endif
  </td>

  ##======= Highlighted snippets showing where search term was found. ('Content' searches only.) =======
  % if c.query['fields'].has_key( 'let_con' ):
    ${self.where_found_column( item, highlights )}
  % endif


  ##====== 'Flags' column: the 'has image', 'has transcript' and 'has abstract' flags appear here. ========
  ${self.moreinfo_popups_column( item, link_to_record )}

##} # end of advanced_search_result()
</%def>

##----------------------------------------------------------------------------------------------

<%def name="make_displayable_date( item )">
  <%
  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

  start_day_fieldname   = h.get_start_day_fieldname()
  start_month_fieldname = h.get_start_month_fieldname()
  start_year_fieldname  = h.get_start_year_fieldname()

  end_day_fieldname   = h.get_end_day_fieldname()
  end_month_fieldname = h.get_end_month_fieldname()
  end_year_fieldname  = h.get_end_year_fieldname()

  start_dates = []
  end_dates   = []

  if item.has_key( start_day_fieldname ) :
    start_dates.append( str( item[ start_day_fieldname ] ) )
    
  if item.has_key( start_month_fieldname ) :
    start_dates.append( months[ int( item[ start_month_fieldname ] )-1 ] )
    
  if item.has_key( start_year_fieldname ) :
    start_dates.append( str( item[ start_year_fieldname ] ) )

  if item.has_key( end_day_fieldname ) :
    end_dates.append( str( item[ end_day_fieldname ] ) )
    
  if item.has_key( end_month_fieldname ) :
    end_dates.append( months[ int( item[ end_month_fieldname ] )-1 ] )
    
  if item.has_key( end_year_fieldname ) :
    end_dates.append( str( item[ end_year_fieldname ] ) )

  date_str = ''
  is_date_range = False
  date_range_fieldname = h.get_date_range_fieldname()

  start_date_str = ''
  if len( start_dates ) :
    start_date_str = ' '.join( start_dates )

  end_date_str = ''
  if len( end_dates ) :
    end_date_str = ' '.join( end_dates )

  if len( start_date_str ) > 0 and len( end_date_str ) == 0:
    if item.has_key( date_range_fieldname ) and item[ date_range_fieldname ]:
      is_date_range = True
    if is_date_range:
      date_str = 'On or after ' + start_date_str
    else:
      date_str = start_date_str

  elif len( start_date_str ) > 0 and len( end_date_str ) > 0:
    date_str = 'Between ' + start_date_str + ' and ' + end_date_str

  elif len( start_date_str ) == 0 and len( end_date_str ) > 0:
    date_str = 'On or before ' + end_date_str

  elif len( start_date_str + end_date_str ) == 0 :
    date_str = 'Unknown date'

  return date_str
  %>
</%def>

##----------------------------------------------------------------------------------------------

<%def name="record_is_an_index_card( item )">
  <%
  main_id_fieldname = h.get_id_fieldname( 'work' )
  if item.has_key( main_id_fieldname ):
    if 'cofk_import_ead-ead_c01_id' in item[ main_id_fieldname ]:
      return True
    #endif
  #endif
  return False
  %>
</%def>

##----------------------------------------------------------------------------------------------

<%def name="get_img_uri_from_work( item, include_index_cards = False )">
  <%
  ## Returns URI of the FIRST image for a work (sorted by a selected fieldname set in "sort_images()")

  manif_fieldname = h.get_relations_to_manifestation_fieldname()
  image_relations_fieldname = h.get_relations_to_image_fieldname()
  img_uri_fieldname = h.get_uri_fieldname()

  manif_uuids = []
  img_uuids = []
  img_dict = {}
  img_list_random = []
  img_list_sorted = []
  img_uri = ''

  if include_index_cards == True or self.record_is_an_index_card( item ) == False:

    # First see if the item has any manifestations.
    if item.has_key( manif_fieldname ):
      manif_uuids = item[ manif_fieldname ]
    #endif

    # If the item has got some manifestations, see if any of these have images by retrieving
    # full details of all the manifestations from their UUIDs.
    if len( manif_uuids ) > 0:

      # Function "get_records_from_solr()" expects a LIST of UUIDs to be passed in
      # and returns a DICTIONARY (keyed on UUID) of DICTIONARIES (keyed on fieldname)

      manif_dict = h.get_records_from_solr( manif_uuids )
      manif_key_value_pairs = manif_dict.items()

      for manif_key, manif_record in manif_key_value_pairs:
        if manif_record.has_key( image_relations_fieldname ):

          # Now for images, as you did for manifestations just previously, pass in a list of UUIDs
          # to "get_records_from_solr()" and get nested dictionaries of all image data back.

          img_uuids = manif_record[ image_relations_fieldname ]
          if len( img_uuids ) > 0:
            img_dict = h.get_records_from_solr( img_uuids ) # returns a DICTIONARY of dictionaries

            # Convert to a LIST of dictionaries, as this is what the 'sort_images()' method wants.
            img_list_random = [ datafields for keyfield, datafields in img_dict.iteritems() ]

            # Sort your list of dictionaries by the selected filename (e.g. image filename)
            img_list_sorted = self.sort_images( img_list_random )

            # Take the first entry from the sorted list.
            img_uri = img_list_sorted[ 0 ][ img_uri_fieldname ]
            break;
          #endif
        #endif
      #endfor
    #endif
  #endif

  return img_uri
  %>
</%def>

##----------------------------------------------------------------------------------------------

<%def name="get_repos_and_shelfmarks_from_work( item )">
##{
  <%
  # Returns a list of dictionaries; each dictionary contains repository/shelfmark or printed ed, plus doc type
  repos_details = []

  manif_fieldname = h.get_relations_to_manifestation_fieldname()
  if not item.has_key( manif_fieldname ):
    return repos_details

  manif_uris = item[ manif_fieldname ]
  if len( manif_uris ) > 0: #{

    # Function "get_records_from_solr()" expects a LIST of URIs or UUIDs to be passed in
    # and returns a DICTIONARY (keyed on UUID) of DICTIONARIES (keyed on fieldname)

    fields_to_get = "%s,%s,%s" % (h.get_manifestation_type_fieldname(), \
                                  h.get_repository_fieldname(), \
                                  h.get_shelfmark_fieldname())
    manif_uuid_dict = h.get_records_from_solr( manif_uris, fields_to_get )

    fields_to_get = h.get_repository_name_fieldname()

    num_printed_eds = 0

    for manif_uuid, manif_field_dict in manif_uuid_dict.items(): #{
      document_location_string = ""
      repos_name_and_location = ""
      shelfmark = ""
      document_type = ""

      if manif_field_dict.has_key( h.get_manifestation_type_fieldname() ): #{
        document_type = manif_field_dict[ h.get_manifestation_type_fieldname() ] 
      #}

      if manif_field_dict.has_key( h.get_shelfmark_fieldname() ): #{
        shelfmark = h.strip_value_prefix( manif_field_dict[ h.get_shelfmark_fieldname() ] )
      #}

      if manif_field_dict.has_key( h.get_repository_fieldname() ): #{ this is a URI, you need to get the name

        repos_uri_list = manif_field_dict[ h.get_repository_fieldname() ]

        if len( repos_uri_list ) > 0: #{ # defined as multi-valued in schema, but single-valued in practice

          repos_uuid_dict = h.get_records_from_solr( repos_uri_list, fields_to_get )

          for repos_uuid, repos_field_dict in repos_uuid_dict.items(): #{
            repos_name = ""
            repos_city = ""
            repos_country = ""
            for repos_fieldname, repos_fieldval in repos_field_dict.items(): #{
              if repos_fieldname == h.get_repository_name_fieldname():
                repos_name = repos_field_dict[ h.get_repository_name_fieldname() ]
              elif repos_fieldname == h.get_repository_city_fieldname():
                repos_city = repos_field_dict[ h.get_repository_city_fieldname() ]
              elif repos_fieldname == h.get_repository_country_fieldname():
                repos_country = repos_field_dict[ h.get_repository_country_fieldname() ]
            #}
            repos_field_list = []
            if repos_name: repos_field_list.append( repos_name )
            if repos_city: repos_field_list.append( repos_city )
            if repos_country: repos_field_list.append( repos_country )
            repos_name_and_location = ", ".join( repos_field_list )
          #}
        #}
      #}

      if repos_name_and_location and shelfmark:
        document_location_string = "%s: %s" % (repos_name_and_location, shelfmark)
      elif repos_name_and_location:
        document_location_string = repos_name_and_location
      elif shelfmark:
        document_location_string = shelfmark
      elif document_type.startswith( 'Printed' ):
        num_printed_eds += 1

      if document_location_string: #{
        repos_details.append( document_location_string )
      #}
    #}
    if num_printed_eds > 1: 
      repos_details.append( "%d printed editions" % num_printed_eds )
    elif num_printed_eds == 1: 
      repos_details.append( "1 printed edition" )
  #}

  return repos_details
  %>
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="number_of_results_msg( records_found, records_per_page )">
##{

  <h3 class="burgundy">
  <span class="font-18"> 

  % if c.solr['numFound'] == 1:
    One result found. 
  % elif c.solr['numFound'] > 1:
	<%
    multipage = False
    if int(c.query['rows']) < int(c.solr['numFound']) :
      multipage = True
	%>
		% if multipage  :
	    ${records_found} results (${records_per_page} results per page) 
		% else :
			${records_found} results 
		% endif
  % endif
 
  </span>

  <br><br><div data-alert class="alert-box secondary radius">
  EMLO is an active, collaborative project in continual development, and as such may contain errors/duplicates. We rely on feedback from the scholarly community: if you spot an error, please <a href="/about#contact">get in touch</a>.
  </div>

  </h3>
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="choose_new_sort_order_form()">
##{
  <form name="noname" id="noname">
    <label>Sort</label>
    <%
    sorts = [ ('date-a',"Date Ascending"), 
              ("date-d", "Date Descending"),
              ("author-a", "Author Ascending"),
              ("author-d", "Author Descending"),
              ("recipient-a","Recipient Ascending"),
              ("recipient-d", "Recipient Descending"),
              ("origin-a", "Origin Ascending"),
              ("origin-d", "Origin Descending"),
              ("destination-a", "Destination Ascending"),
              ("destination-d", "Destination Descending"),
            ]
    %>
    <select id="st" name="st" onchange="resort()">
    % for value, description in sorts :
      % if value == c.query['sort'] :
        <option value="${value}" selected="true">
      % else :
        <option value="${value}">
      % endif
      ${description}</option>
    %endfor
    </select>
  </form>
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="change_sort_order_script()">
##{
  <script type="text/javascript">
    function resort()
    {
      var index = document.noname.st.selectedIndex;
      if( index >= 0 )
      {
        var value = document.noname.st[index].value;
        var newval = "&sort=" + value;
        var url = "" + window.location;

        if( url.indexOf( "&sort=", 0 ) == -1 )
          url += newval;
        else
        {
          start = url.indexOf( "&sort=", 0 );
          end = url.indexOf( "&", start + 1 );
          if( end == -1 )
            end = url.length;

          url = url.replace( url.substring( start, end ), newval );
        }

        // it's not impossible that they are trying to re-order after searching for everything
        if( url.indexOf( "?", 0 ) == -1 ) {
          url = url.replace( "&sort=", "?sort=" );
        }

        window.location.href= url;
      }
    }
  </script>
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="column_headings_for_quick_search()">
##{
  ## This empty heading is for row count
  <th></th>

  <th class="textleft">Type of record</th>
  <th class="textleft">Brief details</th>
  <th class="textleft">Further details</th>
  <th class="textright">Where found</th>

  ## The following empty column is for the 'has image', 'has abstract' flags
  <th class="textleft"> 
  </th>
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="column_headings_for_advanced_search()">
##{
  ## This empty heading is for row count
  <th></th>

  ## This empty heading is for record type (always Letter in this case, so doesn't need a heading)
  <th></th>

  ## Then we can have a list of fields that are already in the results list
  <% collist = fields.get_columns_for_result_list( 'work' ) %>

  % for colname in collist :
    <%
    label = ''
    label = tran.translate( colname )
    %>
    <th class="textleft">
    ${label}
    </th>
  % endfor

  ## Look up repositories and shelfmarks as a separate step
  <th class="textleft">Repositories & Versions</th>

  ## Add highlighted snippets for Content searches
  % if c.query['fields'].has_key( 'let_con' ):
    <th class="textright">Where found</th>
  % endif

  ## The following empty column is for the 'has image', 'has abstract' flags
  <th class="textleft"> 
  </th>
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="link_to_profile_column( current_row, link_to_record, display_object_type )">
##{
  <td class="normalcell">

  <% 
  current_index = str( int( current_row ) - 1 ) 
  total_records_found = str( c.solr['numFound'] ) 
  query_string = h.remember_orig_query( c.query, current_index, total_records_found ) 
  %>

  <a href="${link_to_record}${query_string}" class="bold">
  ${display_object_type}
  </a>

  </td>
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="where_found_column( item, highlights )">
##{
  <td>
  ## MMK/MW added this first IF statement (remove later), email from James, Hartlib issue

  ##%if item['object_type']!='image': 
  
      %if highlights and highlights.has_key( item['id'] ) :
        % for highlight_field, value_list in highlights[item['id']].iteritems() :
          <%
          if highlight_field == 'object_type':
            continue
          %>
          % for value in value_list :
            <%
            if highlight_field == h.get_shelfmark_fieldname():
              value = value.replace( h.get_shelfmark_value_prefix(), '' )
            %>

            <p class="highlighter">
            Found in <strong>${tran.translate(highlight_field)}</strong>: ${value|n}
            </p>
          % endfor
        % endfor
      %endif
  
  ##%endif
  </td>
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="get_urls_for_moreinfo_popups( item_to_flag, link_to_record )">
##{
  <%
  #----------------------------------------------------------------------------
  # Prepare to show details of abstract, images or transcript in a popup window
  #----------------------------------------------------------------------------
  moreinfo_popups = []

  #---------------------------------------
  # Find out if the record has an abstract
  #---------------------------------------
  abstract_fieldname = h.get_abstract_fieldname()
  if item_to_flag.has_key( abstract_fieldname ) :
    moreinfo_popups.append(( 'abstract', link_to_record ))
  #endif

  #--------------------------------------
  # Find out if the record has any images
  #--------------------------------------
  if not self.record_is_an_index_card( item_to_flag ): #{
    img_uri = self.get_img_uri_from_work( item_to_flag )
    if img_uri != '':
      img_url = h.profile_url_from_uri( img_uri )
      moreinfo_popups.append(( 'image', img_url ))
    #endif
  #}

  #-------------------------------------------
  # Find out if the record has a transcription
  #-------------------------------------------
  transcript_url_fieldname = h.get_transcription_url_fieldname()
  if item_to_flag.has_key( transcript_url_fieldname ) :
    transcript_list = item_to_flag[ transcript_url_fieldname ]
    for transcript_url in transcript_list: #{
      moreinfo_popups.append(( 'transcript', transcript_url ))
    #}
  #endif

  return moreinfo_popups
  %>
##}
</%def>

##----------------------------------------------------------------------------------------------

<%def name="moreinfo_popups_column( item_to_flag, link_to_record )">
##{
  <% moreinfo_popups = self.get_urls_for_moreinfo_popups( item_to_flag, link_to_record ) %>

  <td class="normalcell">
  <% flagstyle = 'borders: none; margin-top: 2px;' %>

  % for detail_type, detail_url in moreinfo_popups:
    <%
    icon_file = '/img/flag' + detail_type.capitalize() + '.png' # e.g. flagImage.png
    funcname = self.get_further_details_popup_funcname( detail_type )
    if detail_type == 'image' or detail_type == 'abstract':
      anchor_name = self.get_anchor_name( detail_type )
      detail_url = detail_url + '#' + anchor_name
    #endif
    detail_desc = detail_type
    if detail_desc == 'image':
      detail_desc = 'image(s)'
    #endif
    %>
    <span onclick="${funcname}( '${detail_url}' )" title="Display ${detail_desc} in new window">
    <img src="${icon_file}" alt="Record has ${detail_desc}" style="${flagstyle}" >
    </span>
  % endfor
  </td>
##}
</%def>

##----------------------------------------------------------------------------------------------
