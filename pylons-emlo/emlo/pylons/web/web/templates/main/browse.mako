<%!
	nav_selected = 'browse'
	main_title = 'Browse'
%>
<%inherit file="/base.mako" />
<%namespace name="tran" file="/helpers/translate.mako" import="*"/>

##=============================================================================
<%def name="for_head()">
	<style>
		.browseby {
			margin-left: 100px;
		}
		.browseby h3 {
			display: inline-block;

		}

		ul.alphabet li, ul.numbers li {
			background-color: #ddd;
			margin-left: 4px;
		}
		.pagination-centered ul.pagination li {
			margin-bottom: 5px;
		}

		ul.pagination li a {
			color:black;
		}

		@media only screen and (max-width: 40em) {
			.people th:nth-child(3), .people td:nth-child(3),
			.locations th:nth-child(3), .locations td:nth-child(3) ,
			.organisations th:nth-child(3), .organisations td:nth-child(3) {
				display:none;
			}
			.people th:nth-child(4), .people td:nth-child(4),
			.locations th:nth-child(4), .locations td:nth-child(4),
			.organisations th:nth-child(4), .organisations td:nth-child(4) {
				display:none;
			}
			.people th:nth-child(5), .people td:nth-child(5),
			.locations th:nth-child(5), .locations td:nth-child(5) ,
			.organisations th:nth-child(5), .organisations td:nth-child(5) {
				display:none;
			}
		}

		@media only screen and (max-width: 64em) {
		}

	</style>
</%def>
##=============================================================================
<%def name="for_foot()">
  <script src="/js/browse.js"></script>
</%def>
##=============================================================================

<%def name="body()">
##{
	<%
		shopping_basket_enabled = True
		max_shopping_items = 10

		shopping_querystring = ''
		shopping_items = ''
		shopping_list = []
		shopping_item_count = 0

		object_type = 'person'

		if c.browsing == 'locations' :
			object_type = 'location'
		elif c.browsing == 'institutions' :
			object_type = 'institution'
			shopping_basket_enabled = False
		elif c.browsing == 'works' :
			object_type = 'work'
			shopping_basket_enabled = False

		browse_data = [
			{ 'browse' : 'people', 'label' : 'People', 'image' : 'icon-stats-people.png' },
			{ 'browse' : 'locations', 'label' : 'Locations',  'image' : 'icon-stats-locations.png' },
			{ 'browse' : 'organisations', 'label' : 'Organizations', 'image' : 'icon-stats-organisations.png' },
			{ 'browse' : 'institutions', 'label' : 'Repositories',  'image' : 'icon-stats-repositories.png' },
			{ 'browse' : 'works', 'label' : 'Years', 'image' : 'icon-stats-calendar.png' }
		]


		if len( request.params ) > 0:
			if request.params.has_key( 'shopping_basket' ):
				shopping_items = request.params[ 'shopping_basket' ]
				shopping_querystring = '&shopping_basket=' + shopping_items

	%>

	<br><br>
	<div class="panel">
		<div class="row">
			<div class="columns hide-for-small hide-for-medium large-2"><!-- space -->
			</div>

			<div class="columns small-12 large-10 browseby">
				<ul class="small-block-grid-3 medium-block-grid-6 large-block-grid-6">

					<li><h3>Browse by</h3></li>

					% for data in browse_data :
						% if c.browsing == data['browse']:
<li class="stats-text text-center active"><a href="#">
						% else:
<li class="stats-text text-center"><a href="/browse/${data['browse']}">
						% endif
<img src="/img/${data['image']}" alt="${data['label']} icon" class="stats-icon"/><br/>${data['label']}</a></li>

					% endfor
				</ul>
	        	</div>
		</div>
	</div>

	<div class="row" >

	% if shopping_basket_enabled :


                 ##======================================================================================
                 ## Write scripts to add items to the shopping list by ticking the checkboxes beside the
                 ## main list of names for the current letter, or remove them by unticking either the
                 ## same checkboxes (providing you are browsing the right letter), or the checkboxes 
                 ## that appear next to the 'shopping list' that you have built up.
                 ##======================================================================================
                 <script type="text/javascript">

                   function remove_uuid_from_search( uuid, query_string ) {

                     if( query_string.indexOf( ',' + uuid ) > 0 ) {
                       query_string = query_string.replace( ',' + uuid, '' );
                     }
                     else if( query_string.indexOf( uuid + ',' ) > 0 ) {
                       query_string = query_string.replace( uuid + ',', '' );
                     }
                     else {
                       query_string = query_string.replace( uuid, '' );
                     }
                     return query_string;
                   }

                   function remove_item_from_basket( uuid ) { // remove uuid from current window location

                     var query_string = window.location.search;
                     query_string = query_string.toLowerCase(); // eliminate problems with %3A vs. %3a
                     var orig_query_string = query_string;

                     query_string = remove_uuid_from_search( uuid, query_string );

                     if( orig_query_string == query_string ) {  // failed to change
                       uuid = uuid.replace( ':', '%3a' );       // try again with URL-encoding
                       query_string = remove_uuid_from_search( uuid, query_string );
                     }
                     window.location.search = query_string;
                   }

                   function add_or_remove_item_from_basket( chkbox, curr_items, max_items ) {
                     if( chkbox.checked == true ) { // they are just adding it now
                       if( curr_items >= max_items ) {
                         alert( 'Sorry, you have already made the maximum number of selections.' );
                         chkbox.checked = false;
                         return;
                       }
                       else { // add the uuid to the current window location
                         var uuid = chkbox.value;
                         var query_string = window.location.search;
                         var shopping_start = 'shopping_basket='
                         if( curr_items == 0 ) {
                           if( query_string.indexOf( shopping_start ) == -1 ) {
                             query_string = query_string + '&' + shopping_start;
                             query_string = query_string + uuid;
                           }
                           else {
                             new_start = shopping_start + uuid;
                             query_string = query_string.replace( shopping_start, new_start );
                           }
                         }
                         else {
                           new_start = shopping_start + uuid + ',';
                           query_string = query_string.replace( shopping_start, new_start );
                         }
                         window.location.search = query_string;
                       }
                     }
                     else {  // remove the uuid from the current window location
                       remove_item_from_basket( chkbox.value )
                     }
                   }
                 </script>

		% if shopping_items != '' :

		##******************* On left: start menu of data types e.g. people, places ********************
		##******************* Underneath that, display 'shopping basket' selection  ********************
		<div class="small-12 large-2 columns side" style="margin-top:228px;">

		<%
			if object_type == '': # something odd going on here! Disable the shopping basket!
				shopping_basket_enabled = False
			else:
				main_displayable_fieldname = h.get_main_displayable_fieldname( object_type )
               %>

               <div class="shoppingcart">

	               % if shopping_items == '' :
	                    <p>Nothing selected</p>
	               % endif

               ##=====================================
               ## Display 'Shopping Basket' if enabled
               ##=====================================

                 <%
                 ##=======================================================================
                 ## Find out which items have already been selected at some earlier stage.
                 ##=======================================================================

                 deliver_the_shopping_href = '/forms/advanced?browsing=' + c.browsing \
                                           + '&letter=' + c.current_letter.lower() \
                                           + shopping_querystring 

                 if len( shopping_items ) > 0: #{
                   shopping_list = shopping_items.split( ',' )
                   shopping_item_count = len( shopping_list ) 
                 #}
                 %>
 
                 ##==========================================
                 ## Display up to the maximum number of items
                 ##==========================================
                 % if shopping_item_count > 0:

                   <%
                   all_labels = []
                   selection_type_desc = c.browsing
                   if shopping_item_count == 1: #{
                     if selection_type_desc == 'institutions':
                       selection_type_desc = 'repository'
                     elif selection_type_desc == 'people':
                       selection_type_desc = 'person'
                     else: # strip off the final 's'
                       selection_type_desc = selection_type_desc[  0 : -1 ]
                   #}

                   else: #{
                     if selection_type_desc == 'institutions':
                       selection_type_desc = 'repositories'
                   #}
                   %>

                   <h3 style="padding-bottom:10px;">
                   Your current selection
                   <br />
                   (${shopping_item_count} ${selection_type_desc}):
                   </h3>
                 % endif

                 <%
                 ## We add items at the start of the shopping list, because it's easier that way
                 ## to find the place to insert the values. But now reverse the order of the list
                 ## so that the items are displayed in the same order that the user chose them.
                 reversed_list = []
                 while len( shopping_list ) > 0: #{
                   elem = shopping_list.pop()
                   reversed_list.append( elem )
                 #}
                 shopping_list = reversed_list
                 %>

                 % for i in range( max_shopping_items ):
                   <%
                   results = {}
                   item_uuid = ''
                   item_label = ''
                   if shopping_item_count > i: #{

                     item_uuid = shopping_list[i]
                     results = h.get_records_from_solr( [item_uuid], [main_displayable_fieldname] )

                     # Results come back as two dictionaries nested inside each other.
                     # The outer dictionary is keyed on uuid, the inner one on fieldname
                     if results.has_key( item_uuid ): #{  # it ought to have!
                       column_dict = results[ item_uuid ]
                       if column_dict.has_key( main_displayable_fieldname ):  # again, it ought to have!
                         item_label = column_dict[ main_displayable_fieldname ]
                     #} 
                   #}
                   %>

                   % if item_label != '':
                     <% all_labels.append( item_label.replace( '"', '' ).replace( "'", "\\'" ) ) %>
                     % if i > 0:
                       <br />
                     % endif
                     <input type="checkbox" name="selection${i+1}" title="Remove item from your selection" 
                     value="${item_uuid}" CHECKED onclick="remove_item_from_basket( this.value )" />
                     ${item_label}
                   % endif
                 % endfor

                 ##=======================================================================
                 ## Display a link taking you from shopping basket through to Results List
                 ##=======================================================================
                 % if shopping_item_count > 0:
                   <br/>
                   <a name="deliver_the_shopping" id="deliver_the_shopping" title="Show Letters"
                   href="${deliver_the_shopping_href}">Show Letters</a>

                   <script type="text/javascript">
                   document.title = "${'EMLO selection: ' + '; '.join( all_labels )}"
                   </script>
                 % endif
           </div>

	</div><!--class:columns-->
    	##*************** On left: END menu of data types and shopping basket display ****************
		% endif


    	##******************* On right: START alphabet then entries for selected letter **************
		% if shopping_items != '' :
			<div class="small-12 large-10 columns">
		% else :
		  <div class="small-12 columns">
  	% endif ## shopping basket
		


	% else:
		<div class="small-12 columns">
	% endif ## shopping basket

        ## Heading for box containing entries
        %if c.browsing.capitalize() == 'Institutions':
           <h2>Repository</h2>
        %elif c.browsing.capitalize() == 'Works':
           <h2>Years</h2>
        %else:
          <h2>${c.browsing.capitalize()}</h2>
        %endif
	<br/>


           % if c.browsing == 'browse':
              ## I don't think this extra set of options will normally appear.
              ## It seems to be a sort of safety net in case the object type has not been set.
              <p>Choose which object to browse by</p>
              <ul>
                 <li><a href="/browse/people">People</a></li>
                 <li><a href="/browse/locations">Locations</a></li>
                 <li><a href="/browse/organisations">Organizations</a></li>
                 <li><a href="/browse/institutions">Repositories</a></li>
                 <li><a href="/browse/works">Years</a></li>
              </ul>

           % else :
             % if c.browsing == 'works':
<%doc>
               ##====================================
               ## Allow them to pick a year for works
               ##====================================
</%doc>
               ${self.choose_decade_and_year()}
               <br/><br/>
             % else:
               ##============================================
               ## Allow them to pick a letter of the alphabet   
               ##============================================
	            <div class="pagination-centered">
               <ul class="alphabet pagination">
                  <% 
                    alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" 
                    current_letter_upper = c.current_letter.upper()
                  %>
                  % for letter in alpha:
                    % if letter == current_letter_upper :
<li class="current"><a href="#">${letter}</a></li>\
                    % else:
<li><a href="/browse/${c.browsing}?letter=${letter.lower()}${shopping_querystring}">${letter}</a></li>\
                    % endif
                  % endfor

			   </ul>
		            </div>
                <br/>
              % endif

              % if shopping_basket_enabled and len( c.browse ) > 0:
                <%
                selection_type_desc = c.browsing
                if selection_type_desc == 'institutions':
                  selection_type_desc = 'repositories'
                %>
		  	    <div data-alert class="alert-box info radius">
				 You can select up to ${max_shopping_items} ${selection_type_desc} using the checkboxes below, and then display associated letters.
		                To save your selection for later use, bookmark this page.
				  <a href="#" class="close">&times;</a>
				</div>
                <p></p>

              % elif c.browsing == 'institutions' and len( c.browse ) > 0:
                <div data-alert class="alert-box info radius">
	                Note: every manifestation of a letter is counted, so the number of documents in a repository may be larger than the number of letters.</p>
	            <a href="#" class="close">&times;</a>
				</div>
              % endif
<%doc>
              ##====================================================
              ## Display entries for selected letter of the alphabet
              ## (Data gets retrieved in controllers/browse.py)
              ##====================================================
</%doc>
              % if len( c.browse ) > 0:
                ##<table id="browsing" width="100%" style="min-width:100% !important;">
				<table id="browsing" class="${c.browsing}">
                  ## Table headers
                  <% firstrow = c.browse[0] %>
					<thead><tr>
                  % if shopping_basket_enabled:
                    ## Selection checkbox goes in this column
                    <th></th>
                  % endif
                  <% label = tran.translate( firstrow[ 'main_displayable_fieldname' ] ) %>

                  % if label == 'Description of letter':
                    ##<th width="80%">${label} </th>
					<th>${label} </th>
                  % else:
                    <th>${label} </th>
                  % endif
                  
                  % if len( firstrow[ 'link_fields' ]) > 0:
                    % for link_field in firstrow[ 'link_fields' ]:
                      <th>
                      <% label = tran.translate( link_field[ 'fieldname' ] ) %>
                      ${label}
                      </th>
                    % endfor
                  % endif
                  <th>Further details</th>
                  </tr>
					</thead>

                  ## Table data
                  % for item in c.browse :
                    ${self.one_line_of_browse( item, shopping_basket_enabled, shopping_item_count, \
                                               max_shopping_items  )}
                  % endfor
                </table>
              % else:
                <p> None found
                % if c.browsing == 'works':
                  for the year ${c.current_year}.
                % endif
                </p>                  
              % endif
           % endif
           
           <br/>

      

    </div><!-- class="large-9 columns-->
    ##******************* On right: end alphabet then entries for selected letter ***************
    
  </div><!--class:row-->
##}  # end body()
</%def>

##=============================================================================

<%def name="one_line_of_browse( item, shopping_basket_enabled = False, shopping_item_count = 0, max_shopping_items = 0  )">
<%
  # Check we have a written, recieved or mentioned otherwise skip it.
  have_written = False
  have_received = False
  have_mentioned = False

  if len( item[ 'link_fields' ]) > 0:

    for link_field in item[ 'link_fields' ]:

      if link_field['fieldvalue'] > 0 :

        if link_field['fieldname'] == h.get_total_works_written_by_agent_fieldname() or link_field['fieldname'] == h.get_total_works_sent_from_place_fieldname():
          have_written = True
        elif link_field['fieldname'] == h.get_total_works_recd_by_agent_fieldname() or link_field['fieldname'] == h.get_total_works_sent_to_place_fieldname():
          have_received = True
        elif link_field['fieldname'] == h.get_total_works_mentioning_agent_fieldname() or link_field['fieldname'] == h.get_total_works_mentioning_place_fieldname():
          have_mentioned = True


    #if not have_written and not have_received and not have_mentioned:

    #  return

  gender = ""
  for extra in item['extra_fields']:
  
    if extra['fieldname'] == h.get_gender_fieldname() : #  'foaf_gender'
      gender = extra['fieldvalue']
		
  main_displayable_field = item['main_displayable_field']
  profile_url = h.profile_url_from_uri( item['main_uri'] )
  uuid = h.uuid_from_uri( item['main_uri'], full=True )

  # Prepare to output an 'Add to/remove from basket' checkbox
  if shopping_basket_enabled: #{
    checkbox_fieldname = 'select_' + uuid
    already_selected = False
    if request.params.has_key( 'shopping_basket' ): #{
      if uuid in request.params[ 'shopping_basket' ]:
        already_selected = True
    #}
  #}

  class_list = [gender]
  if have_written:
    class_list.append("written")
  if have_received:
    class_list.append("received")
  if have_mentioned:
    class_list.append("mentioned")
  class_list = " ".join(class_list)
%>
<tr class="${class_list}">
  % if shopping_basket_enabled:
<td>\
${self.normal_checkbox( fieldname = checkbox_fieldname, value = uuid, \
                            onclick = "add_or_remove_item_from_basket( this, " \
                                    + unicode( shopping_item_count ) + ", " \
                                    + unicode( max_shopping_items ) + " )" )}
    % if already_selected:
<script>document.getElementById( "${checkbox_fieldname}").checked=true;</script>
    % endif
</td>\
  % endif
<td><a href="${profile_url}" title="${main_displayable_field}">${main_displayable_field}</a></td>\
\
  % if len( item[ 'link_fields' ]) > 0:
\
    % for link_field in item[ 'link_fields' ]:
\
<%
      value_for_display = link_field[ 'fieldvalue' ]
      search_on_fieldname = link_field[ 'search_on_fieldname' ]

      if search_on_fieldname == 'repository':  ## for repositories, we search by name
        search_term = main_displayable_field

      else: #{ ## for most things, we search by ID
        main_uri = item['main_uri']
        main_uri = h.strip_value_prefix( main_uri, h.get_uri_value_prefix())
        search_term = main_uri
      #}

      href = '/forms/advanced?' + h.minimal_urlencode( search_on_fieldname ) \
           + '=' + h.minimal_urlencode( search_term ) \
           + '&browsing=' + c.browsing + '&letter=' + c.current_letter.lower() \
           + '&return_to_anchor=' + uuid
      title = 'View list of ' + tran.translate( link_field[ 'fieldname' ] ).lower()
%>
\
<td>\
      % if len( search_on_fieldname ) > 0 and value_for_display:
<a href="${href}" title="${title}">${value_for_display}</a>\
      % else:
		% if value_for_display > 0 :
${value_for_display}\
			% else:
-\
		%endif
      % endif
</td>\
    % endfor
  % endif
<%
  ##===================================================================================
  ## We'll put all the remaining extra fields into one table cell.
  ## If there is more than one such field, we'll put them one per line inside the cell.
  ##===================================================================================
%><td>\
<%
  extra_field_count = len( item[ 'extra_fields' ])
  resource_count = len( item[ 'resource_fields' ])
  fieldrow = 0
%>
  % if extra_field_count > 0:
    % for extra_field in item[ 'extra_fields' ]:
<%
      value_for_display = extra_field[ 'fieldvalue' ]
      label = tran.translate( extra_field[ 'fieldname' ] ) 
      fieldrow += 1
%>\
      % if fieldrow > 1:
<br/>\
      % endif
${label}: ${value_for_display}
    % endfor
  % endif

  % if resource_count > 0:
    <% first_resource = True %>
    % if fieldrow > 0:
<br/>\
    % endif

    % if resource_count == 1:
      Related resource: 
    % else:
      Related resources: 
    % endif

    % for resource_dict in item[ 'resource_fields' ]:
<%
      resource_url = resource_dict.get( h.get_resource_url_fieldname(), '' )
      resource_title = resource_dict.get( h.get_resource_title_fieldname(), '' )
      resource_details = resource_dict.get( h.get_resource_details_fieldname(), '' )

      fieldrow += 1
%>

      % if fieldrow > 1 and not first_resource:
<br/>\
      % endif

      % if resource_url and resource_title:
<a href="${resource_url}" title="${resource_title}" target="_blank" >${resource_title}</a>\
      % else:
        ${resource_title}\
      % endif

      % if resource_details:
(${resource_details})\
      % endif
      <% first_resource = False %>
    % endfor
  % endif
</td></tr>\
</%def>

##=============================================================================

<%def name="choose_decade_and_year()">
##{
  <%
  year = h.get_default_year_for_browse() ## this is a string, e.g. '1600'

  if len( request.params ) > 0: #{
    if request.params.has_key( 'year' ): #{
      year = request.params[ 'year' ]
    #}
  #}

  years_from_decade_start = int( year ) % 10
  decade = int( year ) - years_from_decade_start
  %>

<script type="text/javascript">
	function change_decade( start_of_new_decade ) { window.location.search = '?year=' + start_of_new_decade; }
</script>
<span class="pagination">
  <% fieldname='decade' %>
  <label for="${fieldname}">Decade </label><select name="decade" id="decade" onchange="change_decade( this.value )">

  <script type="text/javascript">
    for( var i = 1500; i < 1840; i = i + 10 ) {
      document.write( '<option value="' + i + '"' );
      if( i == ${decade} ) {
        document.write( ' SELECTED ' );
      }
      document.write( '>' );
      document.write( i + 's</option>' );
    }
  </script>

  </select>
  <div class="pagination-centered">
	<ul class="numbers pagination">
		<li class="arrow"><a href="/browse/works?year=${decade-10}">&laquo;</a></li>
  % for i in range( decade, decade + 10 ):

    % if i == int( year ):
      <li class="current"><a href="#">
      ${i}
      </a></li>

    % else:
      <li><a href="/browse/works?year=${i}">
      ${i}
      </li>
    % endif

  % endfor
		<li class="arrow"><a href="/browse/works?year=${decade+10}">&raquo;</a></li>
	</ul></div>
  </span>
##}
</%def>

##=============================================================================

<%def name="get_display_total_for( statistic_type )">
##{
  <%
  total = 0
  if c.stats.has_key( statistic_type ):
    total = c.stats[ statistic_type ]
  return total
  %>
##}
</%def>

##=============================================================================
