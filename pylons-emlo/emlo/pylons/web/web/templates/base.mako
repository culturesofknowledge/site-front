<!doctype html>
<html class="no-js" lang="en">
<%namespace file="header.mako" import="*"/>
<%namespace file="footer.mako" import="*"/>
<%namespace name="trans" file="/helpers/translate.mako" import="*"/>
<%!
   # These can be overwritten by parent templates (or should that be child templates...?)
   nav_selected = ''
   #main_title = ''

   from pylons import request
%>
<head><!-- MMK/JMW --><meta charset="utf-8" />
	<title>${app_globals.title + " : " + self.attr.main_title}</title><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><link rel="stylesheet" href="/css/app.css" />

	<script src="/bower_components/modernizr/modernizr.min.mat.js"></script>
	<script src="http://use.typekit.net/axz4cgy.js"></script>
	<script>try{Typekit.load();}catch(e){}</script>

	${self.for_head()}

</head><body><span id="top"></span>

	${header(self.attr.nav_selected)}
	${next.body()}
	${footer(self.attr.nav_selected)}

	<div id="back-top" style="display:block;"><a href="#top"><span>Top</span></a></div>

<span id="bottom"></span></body>

<foot style="display:none">
	<script src="/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="/bower_components/foundation/js/foundation.min.js"></script>
	<script src="/js/top.js"></script>

	<script>var bdlss = bdlss || {};bdlss.emlo = bdlss.emlo || {};bdlss.emlo.foundationSettings = {};</script>

	${self.for_foot()}

	<script>$(document).foundation( bdlss.emlo.foundationSettings );</script>

	<!-- tracker old -->
	<script>var _gaq = _gaq || [];_gaq.push(['_setAccount', 'UA-23877246-5']);_gaq.push(['_trackPageview']);</script>
	<script src="http://www.google-analytics.com/ga.js" async></script>

	<!-- tracker new -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-129021123-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'UA-129021123-1');
	</script>


</foot></html>
##
##----------------------------------------------------------------------------------------------
##------------ The following functions might be called, e.g. by result AND profile -------------
##------------ or by both Advanced search (search.mako) and Basic search (home.mako) -----------
##----------------------------------------------------------------------------------------------
##
<%def name="sort_images( raw_data_in_random_order )">
  <%
  # The parameter 'raw data in random order' needs to be a LIST of dictionaries
  # (each dictionary then being the data for one image, with fieldname as key).

  sortfield = h.get_image_display_order_fieldname()

  intermediate = []
  for one_image in raw_data_in_random_order:
    sortvalue = one_image[ sortfield ]
    intermediate.append( ( sortvalue, one_image ) )
  #endfor

  intermediate2 = sorted( intermediate, key = lambda img : img[ 0 ] )

  sorted_list = []
  for sortvalue, imgdata in intermediate2:
    sorted_list.append( imgdata )
  #endfor

  return sorted_list
  %>
</%def>
##
##----------------------------------------------------------------------------------------------
##
<%def name="get_further_details_popup_funcname( detail_type )">
  <%
  funcname = 'display' + detail_type.capitalize() + 'PopupWindow'
  return funcname
  %>
</%def>
##
##----------------------------------------------------------------------------------------------
##
<%def name="write_further_details_popup_script( detail_type, window_width=900, window_height=600 )">
  <%
  funcname = self.get_further_details_popup_funcname( detail_type )
  window_var = detail_type + 'PopupWindowVar'
  parms = "width=%d, height=%d, resizable=yes, scrollbars=1" % (window_width, window_height)
  %>
  <script type="text/javascript">
  <!--
  function ${funcname}( url ) {                                 
    ${window_var}=open( url, '${detail_type}DetailsWindow', '${parms}' );                        
    if ( ${window_var}.opener == null ) {
      ${window_var}.opener = self;               
    }
    ${window_var}.focus();                                                       
  }                                                                            
  // -->
  </script>
</%def>

##----------------------------------------------------------------------------------------------

<%def name="get_anchor_name( detail_type )">
  <%
  anchor_name = detail_type.replace( ':', '_' ) + '_anchor'
  return anchor_name
  %>
</%def>

##----------------------------------------------------------------------------------------------

<%def name="catalogue_options()">
##{
<option class="default" value="all catalogues">all catalogues</option>

  <%cats = h.get_list_of_catalogues()%>

  % for catname in cats: 
<option>${catname}</option>\
  % endfor
##}
</%def>

##------------------------------------------------------------------------------------------

<%def name="year_options( add_unknown_year = False )">
<option class="default">all years</option>
	<% years = range(1500,1841) %>
	% for year in years :
<option>${year}</option>\
	% endfor
  % if add_unknown_year:
<option value="9999">????</option>
  % endif
</%def>

##------------------------------------------------------------------------------------------

<%def name="month_options()">
##{
<option class="default" value="all months">all months</option><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option>
##}
</%def>

##------------------------------------------------------------------------------------------

<%def name="day_options()">
##{
<option class="default">all dates</option>\
	<% days = range(1,32) %>
	% for day in days :
<option>${day}</option>\
	% endfor
##}
</%def>

##------------------------------------------------------------------------------------------

<%def name="document_type_options()">
##{
<option class="default">all types</option><option>Digital copy</option><option>Draft</option><option>Extract</option><option>Letter</option><option>Manuscript copy</option><option>Printed copy</option><option>Other</option>
##}
</%def>

##------------------------------------------------------------------------------------------

<%def name="gender_options()">
<option class="default">all</option><option value="female">Female</option><option value="male">Male</option><option value="unknown">unknown</option>
</%def>

##------------------------------------------------------------------------------------------

<%def name="repository_options()">
##{
<option class="default">all repositories</option>
  <% repos=h.get_repository_name_list() %>
  % for reposname in repos: 
<option value="${reposname}">${reposname}</option>\
  % endfor
##}
</%def>

##------------------------------------------------------------------------------------------

<%def name="page_count_options()">
##{
<option class="default" value="0">any number</option>
  <% 
  page_counts = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100 ]
  %>
  % for page_count in page_counts: 
<option>${page_count}</option>\
  % endfor
##}
</%def>

##------------------------------------------------------------------------------------------

<%def name="language_options()">
##{
<option class="default">all languages</option>

  <% 
  ## Unfortunately hard-coded for now 
  ## TO DO: export this to Solr from the back end. We might need a new Solr 'languages' core???

  languages = [ 'Ancient Greek',
                'Basque',
                'Cornish',
                'Czech',
                'Danish',
                'Dutch',
                'English',
                'French',
                'German',
                'Hebrew',
                'Irish',
                'Italian',
                'Latin',
                'Old French',
                'Polish',
                'Scottish Gaelic',
                'Spanish',
                'Swedish',
                'Welsh' ]
  %>

  % for language in languages: 
<option>${language}</option>\
  % endfor
##}
</%def>

##------------------------------------------------------------------------------------------

<%def name="help_button_img( with_gap = False )">
  <%
  img_src = "img/icon-help.png" #/images/1276096842_help.png"
  img_class = ""
  if with_gap:
    img_class = "gap"
  %><img class="help ${img_class}" src="${img_src}" alt="Help"/>
</%def>

##------------------------------------------------------------------------------------------

<%def name="helptext( the_help, calling_field='', with_gap=False )"><%
		help = the_help

        #BASIC SEARCH
        #People
		if calling_field == 'people':
			help += ''#You can also browse by <a href="/browse/people">People</a> and by <a href="/browse/organisations">Organisation</a>, where you can select and search across multiple people and organisations.'

		#Locations
		if calling_field == 'locations':
			help += ''#You can also browse by <a href="/browse/locations">Place</a>, where you can select and search across multiple locations.'

		#Content
		if calling_field == 'let_con':
			help += '<br/><br/>Full-text transcriptions are currently only available for the Lhwyd and Selden catalogues.'

		#Catalogue
		if calling_field == 'col_cat':
			help += '<br/><br/>For details of our current contributing catalogues, see the Catalogue pages.'


		#INTERMEDIATE SEARCH
		#Author and Recipient
		if (calling_field == 'aut' or calling_field == 'rec' or calling_field == 'aut_roles' or calling_field == 'rec_roles'):
			help += ''#You can also browse by People and by Organisation.'

		#Dates from and to
		if (calling_field == 'dat_to_year' or calling_field == 'dat_from_year' or calling_field == 'dat_to_month' or calling_field == 'dat_to_day' or calling_field == 'dat_from_month' or calling_field == 'dat_from_day' or calling_field == 'dat_sin_year' or calling_field == 'dat_sin_month' or calling_field == 'dat_sin_day'):
			help += ''#You can also browse by Year.'


		#Places sent from and to
		if (calling_field == 'pla_ori_name') or (calling_field == 'pla_des_name'):
			help += ''#You can also browse by Place.'


		##Repository
		if calling_field == 'repository':
			help += ''#You can also browse by Repository.'


		#ADVANCED SEARCH
		#Titles, roles or occupations
		if (calling_field == 'people_roles' or calling_field == 'ment_roles'):
			help += '<br/><br/>Note that this information has not yet been captured for all people.'


		#Senders Only Organisations
		if (calling_field == 'aut_org' or calling_field == 'rec_org' or calling_field == 'ment_org'):
			help += ''#You can also browse by Organisation.'


		#People Mentioned
		if calling_field == 'ment':
			help += ''#You can also browse by People and by Organisation. '
			help += '<br/><br/>This information has not yet been captured systematically. '
			help += '<br/><br/>You can also search Content for mentions of people and organizations.'


		#Places Mentioned
		if calling_field == 'pla_ment_name':
			help += 'You can also browse by Place.'
			help += '<br/><br/>This information has not been captured systematically.'
			help += '<br/><br/>You can also search Content for mentions of places.'


		#Paper Sizes
		if calling_field == 'let_pap_siz_tex':
			help += 'Please note that search must follow this format.'

  %><span data-tooltip aria-haspopup="true" class="has-tip tip-top" title="${help}">${self.help_button_img( with_gap )}</span>
</%def>

##------------------------------------------------------------------------------------------

<%def name="context_help( the_help, with_gap = False, calling_field = '' )">

  ${self.helptext( the_help, calling_field, with_gap )}

</%def>

##------------------------------------------------------------------------------------------

<%def name="refine_search_button( add_formatting_span = True )">

  ## Create a link back to the search page, appending any existing search terms from GET 
  ## (We can access GET parameters via request.params)
  <%
  if len( request.params ) == 0: #{
    return
  #}

  next_url = unicode( ' ' )

  search_term_list = []
  search_term_dict = h.get_request_params_as_dict( request )
  search_page = ''
  search_page_desc = ''
  browsing = ''
  return_to_anchor = ''

  parms_to_ignore = [ 'sort', 'rows', 'baseurl', 'start', 'type', 'numFound' ]

  if 'browsing' in search_term_dict.keys(): #{  # Return to Browse

    browsing = search_term_dict[ 'browsing' ]

    if search_term_dict.has_key( 'return_to_anchor' ):
      return_to_anchor = '#' + search_term_dict[ 'return_to_anchor' ]

    for parm_name, parm_value in search_term_dict.iteritems(): #{
      if parm_name in [ 'letter', 'shopping_basket' ]:
        search_term_list.append( parm_name + '=' + h.minimal_urlencode( parm_value ))
    #}

    if len( search_term_list ) > 0: #{
      search_page = '/browse/' + browsing
      search_page_desc = 'Return to Browse'
      button_desc = 'Return to Browse'
      next_url = search_page + '?' + '&'.join( search_term_list ) + return_to_anchor
    #}
  #}

  else: #{  # Return to Advanced Search

    # Get a dictionary of the fieldnames on the forms that correspond to URI fieldnames.
    uri_field_to_form_field = h.get_uri_field_to_form_field()

    for parm_name, parm_value in search_term_dict.iteritems(): #{
      if parm_name in parms_to_ignore:
        continue

      if not parm_value:
        continue

      if uri_field_to_form_field.has_key( parm_name ): #{

        # Work out which field on the form corresponds to this URI fieldname
        # then decode the URI so that the decoded value can be put onto the form.

        form_field, parm_type = uri_field_to_form_field[ parm_name ]
        parm_decode_fieldname = h.get_main_displayable_fieldname( parm_type )
        parm_uuid = h.uuid_from_uri( parm_value, True )
        dict_keyed_on_uuid = h.get_records_from_solr( [parm_uuid], selected_fields = [parm_decode_fieldname] )
        if dict_keyed_on_uuid.has_key( parm_uuid ): #{
          if dict_keyed_on_uuid[ parm_uuid ].has_key( parm_decode_fieldname ): #{
            parm_name = form_field
            parm_value = dict_keyed_on_uuid[ parm_uuid ][ parm_decode_fieldname ]
          #}
        #}
      #}

      search_term_list.append( parm_name + '=' + h.minimal_urlencode( parm_value ))
    #}

    if len( search_term_list ) > 0: #{
      search_page = '/advanced'
      search_page_desc = 'Refine your search via the Advanced Search tab'
      button_desc = 'Modify your search'
      next_url = search_page + '?' + '&'.join( search_term_list )
    #}
  #}
  %>

  % if next_url.strip() != '':
    % if add_formatting_span:
      <span class="pagination">
    % endif

    <a href="${next_url}" title="${search_page_desc}" class="small button modifysearchbtn search-related">${button_desc}</a>

    % if add_formatting_span:
      </span>
    % endif
  % endif

</%def>
##------------------------------------------------------------------------------------------

<%def name="get_search_term( fieldname )">

  ## See if they are trying to refine an existing search, in which case their search terms will
  ## be in GET, which we can access via request.params
  <%
  search_term = unicode( ' ' )

  if len( request.params ) > 0: #{
    search_term = h.get_parm_value_from_request( request, required_parm = fieldname )
  #}
  else: #{
    return ''
  #}

  search_term = search_term.strip()

  if search_term != '': #{
    search_term = search_term.replace( "'", "\'" )
    search_term = search_term.replace( '"', '\"' )
  #}

  return search_term
  %>

</%def>
##------------------------------------------------------------------------------------------

<%def name="normal_text_input_field( fieldname, title='', css_class='text' )">

  <input id="${fieldname}" name="${fieldname}" type="text" class="${css_class}"
         value="${h.get_default_value_for_field( fieldname )}" 
         onfocus="${self.onfocus_script()}" onblur="${self.onblur_script()}" 
  % if title != '':
         title="${title}"
  % endif
  />

  <%
  ## See if they are trying to refine an existing search
  search_term = self.get_search_term( fieldname )
  self.set_text_field_from_search_term( fieldname, search_term )
  %>

</%def>
##------------------------------------------------------------------------------------------

<%def name="set_text_field_from_search_term( fieldname, search_term = '' )">

  % if search_term != '': 
    <script type="text/javascript">
      var theTextField = document.getElementById( '${fieldname}' );
      var newstring = "${search_term}";
      while( newstring.indexOf( '&quot;' ) != -1 ) {
        newstring = newstring.replace( '&quot;', '"' );
      }
      theTextField.value = newstring;
      theTextField.className = theTextField.className + ' somethingentered';
    </script>
  % endif

</%def>
##------------------------------------------------------------------------------------------

<%def name="normal_checkbox( fieldname, title='', css_class='checkbox', value = 'true', onclick = '' )">\
<input type="checkbox" id="${fieldname}" name="${fieldname}" value="${value}" class="${css_class}"\
	% if title != '' :
 title="${title}"\
	% endif
	% if onclick != '' :
 onclick="${onclick}"\
	% endif
/><%
  ## See if they are trying to refine an existing search
  search_term = self.get_search_term( fieldname )
  self.set_checkbox_from_search_term( fieldname, search_term )
%>
</%def>
##------------------------------------------------------------------------------------------

<%def name="set_checkbox_from_search_term( fieldname, search_term = '' )">
% if search_term != '':
<script type="text/javascript">document.getElementById( '${fieldname}' ).checked = true;</script>
% endif
</%def>
##------------------------------------------------------------------------------------------

<%def name="start_normal_select( fieldname, title='', css_class='' )">
<select id="${fieldname}" name="${fieldname}" title="${title}" class="${css_class}">
</%def>

##------------------------------------------------------------------------------------------

<%def name="end_normal_select( fieldname )">
</select><%
  ## See if they are trying to refine an existing search
  search_term = self.get_search_term( fieldname )
  self.set_select_from_search_term( fieldname, search_term )
  %>
</%def>
##------------------------------------------------------------------------------------------

<%def name="set_select_from_search_term( fieldname, search_term = '' )">

  % if search_term != '': 
    <script type="text/javascript">
      var theSelect = document.getElementById( '${fieldname}' );
      for ( var i = 0; i < theSelect.options.length; i++ ) {
        if ( theSelect.options[i].value == '${search_term}' ) {
          theSelect.options[i].selected = true;
          break;
        }
      }
    </script>
  % endif

</%def>
##------------------------------------------------------------------------------------------

<%def name="onfocus_script()">
  <%
  action="javascript:textClear(this);"
  return action
  %>
</%def>
##------------------------------------------------------------------------------------------

<%def name="onblur_script()">
  <%
  action="javascript:textFill(this);"
  return action
  %>
</%def>
##------------------------------------------------------------------------------------------

<%def name="totals_linking_to_list_of_works( object_type )">
##{
  ## This section shows totals for letters sent, received and in which mentioned, 
  ## as simple figures linking through to Works Search Results.

	  ## moved out... <h3><img src="/img/icon-statistics.png" class="workicon"/>Catalogue Statistics</h3>

	  <p class="highlight-box">
	  <%
	  uri_fieldname = h.get_uri_fieldname()
	  uri_for_search = c.profile[ uri_fieldname ]
	  uri_for_search = h.strip_value_prefix( uri_for_search, h.get_uri_value_prefix())

	  if object_type == 'person':
	    total_links = [ { 'field_for_link_text': h.get_total_works_written_by_agent_fieldname(),
	                      'search_on_fieldname': h.get_author_uri_fieldname() },

	                    { 'field_for_link_text': h.get_total_works_recd_by_agent_fieldname(),
	                      'search_on_fieldname': h.get_addressee_uri_fieldname() },

	                    { 'field_for_link_text': h.get_total_works_mentioning_agent_fieldname(),
	                      'search_on_fieldname': h.get_relations_to_people_mentioned_fieldname() } ]


	  elif object_type == 'location':

	    total_links = [ { 'field_for_link_text': h.get_total_works_sent_from_place_fieldname(),
	                      'search_on_fieldname': h.get_origin_uri_fieldname() },

	                    { 'field_for_link_text': h.get_total_works_sent_to_place_fieldname(),
	                      'search_on_fieldname': h.get_destination_uri_fieldname() },

	                    { 'field_for_link_text': h.get_total_works_mentioning_place_fieldname(),
	                      'search_on_fieldname': h.get_relations_to_places_mentioned_fieldname() } ]

	  else:  ## not an object type for which we print summary totals
	    return

	  print_divider = False
	  %>

	  % for one_total in total_links:
	    % if print_divider:
	      &diams;
	    % else:
	      <% print_divider = True %>
	    % endif

	    <%
	    field_for_link_text = one_total[ 'field_for_link_text' ]
	    total_number = c.profile[ field_for_link_text ]
	    field_label = trans.translate( field_for_link_text )
	    link_text = unicode( total_number ) + ' ' + field_label.lower()

	    search_on_fieldname = one_total[ 'search_on_fieldname' ]

	    href = '/forms/advanced?' + h.minimal_urlencode( search_on_fieldname ) \
	         + '=' + h.minimal_urlencode( uri_for_search )

	    %>

	    % if total_number > 0:
	      <a href="${href}" title="${field_label}">${link_text}</a>
	    % else:
	      ## no actual link for zero totals
	      ${link_text}
	    % endif
	  % endfor
	  </p>

##}
</%def>
##------------------------------------------------------------------------------------------
