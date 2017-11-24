# -*- coding: utf-8 -*-
<%!
   import logging
   from pylons import request
   nav_selected = 'profile'
   main_title = 'Profile Missing'
%>

<%inherit file="/base.mako" />

<%namespace name="trans" file="/helpers/translate.mako" import="*"/>
<%namespace name="fields" file="/helpers/fields.mako" import="*"/>

#------------------------------------------------------------------------------------------------------

<%def name="for_head()">
## See body - includes don't work here as child overrides them 
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="for_foot()"></%def>

#------------------------------------------------------------------------------------------------------

<%def name="body()">

	<%
		#----------
		if c.profile :
			object_type = c.profile.get( 'object_type', False )

			# Only Work and Person have two separate unique ID columns in the editing interface (a primary
			# ID column which is a text string of up to 100 chars, plus a secondary integer ID for display).
			# For other object types, same fieldname will be returned by both the following 'fields' methods.

			main_id_fieldname = h.get_id_fieldname( object_type )
			integer_id_fieldname = h.get_integer_id_fieldname( object_type )

			# For most object types there should also be a text field that sums up main details of object,
			# e.g. for works this should be the description field, for people it is their personal name, etc.

			main_decode_fieldname = h.get_main_displayable_fieldname( object_type )

			# If e.g. current object is a manifestation, we'd want to display the work it is a manifestation of.
			work_decode_fieldname = h.get_main_displayable_fieldname( 'work' )

			# Get the fieldname for the unique URI that Solr uses as a sort of ID field.
			uri_fieldname = h.get_uri_fieldname()

			# And the field that gives you access to the work that an image or manifestation etc is related to
			relations_to_work_fieldname = h.get_relations_to_work_fieldname()
			#----------
		else:
			object_type = None
	%>

##{
	<style>
		.change {
			background-color: #e0e0e0;
			padding: 5px;
			text-align: center;
			font-size: smaller;
		}
	</style>

	<div class="row" id="main">

		% if object_type :

			<div class="columns large-9 large-push-3">

				% if len( request.params ) > 0:
					${self.navigate_profiles()}
				% else:
					<br/>
				% endif

				## Get the default field and use as a title.
				% if object_type == 'image':
					<%
						#----------
						imgrels = c.further_relations[ relations_to_work_fieldname ]
						work_obj = imgrels.values()[0]
						work_uri = work_obj.get( uri_fieldname, '' )
						work_profile_url = h.profile_url_from_uri( work_uri )
						work_decode_value = work_obj.get( work_decode_fieldname, '' )
						#----------
					%>

					<h2><a href="${work_profile_url}">${work_decode_value}</a></h2>

				% elif c.profile['object_type'] == 'manifestation':
					<%
						#----------
						work_uri = c.profile[ relations_to_work_fieldname ][0]
						work_uuid = h.uuid_from_uri( work_uri, True )
						if c.relations.has_key( work_uuid ): #{
						  work_obj = c.relations[ work_uuid ]
						  work_decode_value = work_obj.get( work_decode_fieldname, main_decode_fieldname )
						#}
						#----------
					%>
					<h2>${work_decode_value}</h2>

				% elif c.profile.has_key( main_decode_fieldname ):
					<h2>${c.profile[ main_decode_fieldname ]}</h2>

				% else :
					<h2>${object_type}</h2>
				% endif

				<br/>

				${next.profile()}

				<br/>

				##=====================================================
				## Provide a link to the editing interface for
				## works, people/organisations, places and repositories
				##=====================================================
				<%
					url_edit_base = 'https://emlo-edit.bodleian.ox.ac.uk/interface'
					url_edit = ''

					obj_type_lower = object_type.lower()

					if obj_type_lower == 'work' or obj_type_lower == 'person': #{
						edit_id_value = c.profile.get( integer_id_fieldname, None )
						edit_id_value_long = c.profile.get( main_id_fieldname, '' )
					#}
					else:
						edit_id_value = c.profile.get( main_id_fieldname, None )

					if edit_id_value is not None: #{

						# For some reason the value of the ID is prefixed with 'editi:', e.g. 'editi:123456'
						# Strip that off by splitting on colon, and get the simple integer ID, e.g. 123456.
						edit_id_value = h.strip_value_prefix( edit_id_value )

						if obj_type_lower == 'work': #{
							#----------
							# Create a link to one of the two editing interfaces: the main 'Union' interface or card index.
							# To decide whether you want the main Union catalogue or Bodleian card index, you can use the
							# fact that card index data has an ID in a format showing it was imported from an EAD file.
							# I say you 'can' use that fact; am far from sure it's a very good method. But will do for now.

							if 'cofk_import_ead-ead_c01_id' in edit_id_value_long:
								url_edit = '%s/cardindex.php?iwork_id=%s' % (url_edit_base, edit_id_value)
							else:
								url_edit = '%s/union.php?iwork_id=%s' % (url_edit_base, edit_id_value)
							#----------
						#}

						elif obj_type_lower == 'person': #{
							url_edit = '%s/union.php?iperson_id=%s' % (url_edit_base, edit_id_value)
						#}

						elif obj_type_lower == 'location': #{
							# yet more prefixes have been added to this field
							edit_id_value = h.strip_value_prefix( edit_id_value, 'cofk_union_location-' )
							url_edit = '%s/union.php?location_id=%s' % (url_edit_base, edit_id_value)
						#}

						elif obj_type_lower == 'institution': #{
							# yet more prefixes have been added to this field
							edit_id_value = h.strip_value_prefix( edit_id_value, 'cofk_union_institution-' )
							url_edit = '%s/union.php?institution_id=%s' % (url_edit_base, edit_id_value)
						#}

						else:
							edit_id_value = ''
					#}
				%>

				<div class="column">

					<br/><br/><br/><br/>

					% if url_edit:
						<a class="headerbutton button tiny" href="${url_edit}" target="_blank" rel="nofollow">Edit Record</a>
					% endif

					<br/>

					<div class="change">

						% if c.profile.has_key( h.get_source_of_data_fieldname() ):
							<span class="provenance">Source of data: ${c.profile[ h.get_source_of_data_fieldname() ]}</span><br/>
						% endif

						% if c.profile.has_key( h.get_changed_by_user_fieldname() ):
							<%
								change_user = c.profile[ h.get_changed_by_user_fieldname() ]
								if change_user == 'Initial import': change_user = 'initial import'
							%>

							% if edit_id_value:
								Record ID ${edit_id_value}, last  altered <!-- not changed --> by ${change_user}
							% else:
								Record last altered <!-- not changed --> by ${change_user}
							% endif

							% if c.profile.has_key( h.get_date_changed_fieldname() ):
								<%
									change_timestamp = unicode( c.profile[ h.get_date_changed_fieldname() ] )
									change_year = change_timestamp[ 0:4 ]
									change_month = change_timestamp[ 5:7 ]
									change_day = change_timestamp[ 8:10 ]
								%>
								on ${change_day}/${change_month}/${ change_year }.
							% endif

								<br/><br/>Alternative urls for this record:<ul>
								<li style="list-style:none;font-size:smaller"><a href="${c.normalUrl}">emlo.bodleian.ox.ac.uk${c.normalUrl}</a></li>
								<li style="list-style:none;font-size:smaller"><a href="${c.miniUrl}">emlo.bodleian.ox.ac.uk${c.miniUrl}</a></li>
								% if c.iidUrl:
									<li style="list-style:none;font-size:smaller"><a href="${c.iidUrl}">emlo.bodleian.ox.ac.uk${c.iidUrl}</a></li>
                                % endif
								<li style="list-style:none;font-size:smaller"><a href="${c.tinyurl}">${c.tinyurl}</a></li>
							</ul>
						% endif
					</div>

					<br/>

				</div><!-- class:column-->

			</div><!-- class:column-->

			<div class="columns large-3 large-pull-9 side">

				## <h3 class="record-tools">Record Tools</h3>
				<%
					tinyer_url = c.tinyurl[7:]
				%>
				<!-- Get short URL code, now using tinyURL -->
				<p><img src="/img/icon-short-url.png" class="opacity50 icon-tweak" /> Short URL:  <span class="showLink"><a href="${c.tinyurl}">${tinyer_url}</a></span> </p>
				<!-- end of short URL code -->

				<!-- Report this page link    -->
				<p><img src="/img/icon-send-comment.png" class="opacity50 icon-tweak"  /> <a href="/comment/index?id=${c.profile['id'].replace('uuid:','')}">Send Comment</a></p>

				<!-- AddThis Button BEGIN - sharing-->
				<div class="addthis_toolbox addthis_default_style " style="border-bottom:1px solid #efc319; padding-bottom: 10px; padding-top:5px">
					<span style="text-align:center;"><a class="addthis_button_preferred_1" style="border-bottom:none;"></a>
					<a class="addthis_button_preferred_2" style="border-bottom:none;"></a>
					<a class="addthis_button_preferred_3" style="border-bottom:none;"></a>
					<a class="addthis_button_preferred_4" style="border-bottom:none;"></a>
					<a class="addthis_button_compact" style="border-bottom:none;"></a>
					<a class="addthis_counter addthis_bubble_style" style="border-bottom:none;"></a></span>
				</div>

				<!-- script moved to end of body function -->
				<!-- AddThis Button END -->
				<br/>

				<%
					object_type_desc = trans.translate( object_type )

					## Select the correct image to show on each profile accordingly
					theTitle = object_type_desc
					if object_type_desc == "Person or organisation":
						is_organisation = False

						if c.profile.has_key( h.get_is_organisation_fieldname() ):
							is_organisation = c.profile[ h.get_is_organisation_fieldname() ]

						if is_organisation:
							imageSrc = "/images/people_icon.png"
							theTitle = "Organisation"
						else:
							imageSrc = "/images/person_icon.png"
							theTitle = "Person"

					elif object_type_desc == "Institution":
						imageSrc = "/images/repository_icon.png"
					elif object_type_desc == "Location":
						imageSrc = "/images/places_icon.png"
					elif object_type_desc == "Letter":
						imageSrc = "/images/letter_icon.png"
					elif object_type_desc == "Image":
						imageSrc = "/images/images_icon.png"
					else:
						imageSrc = "/images/resources_icon.png"
				%>
				<div>
					<img src="${imageSrc}" id="profile-icon" style="float:left;height:25px;width:25px;margin-right:5px;"><div>Record type: ${theTitle}</div>
				</div>

				${next.profileRight()}

			</div><!-- class:column -->
			<br/>

		% else:

			<div class="column large-9 large-push-3">
				<br/>
				<h2>Missing</h2>
				<p>Sorry, that record has not been found, it may have been merged with another record. Sorry about that.</p>
				<br/>
				<br/>
				<br/>
			</div>

		% endif


	</div><!-- class:row -->

	<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4e64d35216f8536b"></script>

##}  # end body()
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="def_list_item( field, capitalize=False, link='' )">
  % if c.profile.has_key( field ) :
    <% label = trans.translate(field) %>
    <dt>${label}</dt>
    <%
		value = c.profile[field]
		if capitalize:
		  value = value.capitalize()
    %>
    % if link != '' :
      <%
		  # Link needs completing by adding the ID value to the end
		  full_link = link + value
      %>
      <dd><a href="${full_link}">${value}</a></dd>
    % else :
      <dd>${value}</dd>
    % endif 
  % endif
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="h4_section( field, icon=None )">
	% if c.profile.has_key( field ) :
	    <%
	    label = trans.translate(field)
	    value = c.profile[field]
	    %>
		<div class="profilepart">

			% if icon :
				<h4><img src="${icon}">${label}</h4>
			% else:
				<h4>${label}</h4>
			% endif

			<div class="content section">
				${value}
			</div>

		</div>

  % endif
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="h4_url_section( field )">
  % if c.profile.has_key( field ) :
    <%
    label = trans.translate(field)
    value = c.profile[field]
    %>
    <h4>${label}</h4>
    <a href="${value}">${value}</a>
  % endif
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="h4_relations_list(field, title=None, type=None, icon=None)">
	% if c.profile.has_key( field ) :

		<%
			## Unfortunately we currently (Oct 2011) seem to have a few orphaned relationships in the data:
			## 'Comments about the Author' and 'Comments about the Recipient' where the comment
			## itself appears to have been deleted but the relationship still somehow remains.
			## So avoid printing a heading with nothing underneath it.

			entries_exist = False
			for relation in c.profile[field]:
				relkey = h.uuid_from_uri( relation, True )
				if c.relations.has_key( relkey ):
					entries_exist = True
					break

			if not entries_exist:
				return

			if title is None:
				title = trans.translate( field )
		%>
		<div class="profilepart">
			% if icon :
				<h3><img src="${icon}">${title}</h3>
			% else:
				<h3>${title}</h3>
			% endif

			<div class="content">
				% if type and type in ['image','detailed','simple','resource']:

					% if type=='image':
						${self.image_relations(field)}

					% elif type=='detailed':
						${self.detailed_relations(field)}

					% elif type=='simple':
						${self.simple_relations(field)}

					% else : # type=='resource':
						${self.resource_relations(field)}

					% endif

			    % else :
			        ${self.relations_list(field)}

			    % endif
			</div>
		</div>
	% endif
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="relations_list( field, display_label = False )">
<div class="relations">
  % if field in c.profile :
    <%
    # Normally we will sort the data by the 'main displayable fieldname' (e.g. person's name)
    sort_list = []
    item = { 'rel': None, 'display': None, 'obj': None, 'type': None }
    label = ''
    if display_label:
      label = trans.translate( field )

    for relation in c.profile[field]:

      relkey = h.uuid_from_uri( relation, True ) 
      if c.relations.has_key( relkey ):
        obj = c.relations[ relkey ]
        if obj.has_key( 'object_type' ): 
          obj_type = obj['object_type']

          default_sort_field = obj.get( h.get_main_displayable_fieldname( obj_type ) )

          item = {
            'rel': relation,
            'display': default_sort_field,
            'label': label,
            'obj': obj,
            'type': obj_type,
            'sort': default_sort_field
          }

          sort_list.append( item )

        #endif
      #endif
    #endfor

    sorted_list = sorted( sort_list, key=lambda item : item['sort'], reverse=False )
    %>

    % if display_label and len(sorted_list) > 0:
      <dt>${sorted_list[0]['label']}</dt><dd>
    % endif

    % for item in sorted_list :
      <%
		  url = h.profile_url_from_uri( item[ 'rel' ] )
		  display = item['display']
		  role = item[ 'obj' ].get( h.get_person_titles_or_roles_fieldname(), None)
      %>

      % if role:
	  	<p><a href="${url}">${display}</a> - ${role}</p>
	  % else :
	  	<p><a href="${url}">${display}</a></p>
	  % endif

    % endfor

    % if display_label:
      </dd>
    % endif
  % endif
</div>

</%def>

#------------------------------------------------------------------------------------------------------

<%def name="simple_relations(field,style='')">
  ## Display a simple bit of text with no link. (Use this for comments.)
  % if field in c.profile :
    <ul>
    % for relation in c.profile[field]:
      <%
		  uuid = h.uuid_from_uri( relation, True )
		  if not c.relations.has_key( uuid ):
			continue
		  obj = c.relations[ uuid ]
		  object_type = obj['object_type']
		  main_displayable_fieldname = h.get_main_displayable_fieldname( object_type )
		  main_display_value = obj.get( main_displayable_fieldname )
      %>
      <li style="${style}"><pre>${main_display_value}</pre></li>
    % endfor
    </ul>
  % endif
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="resource_relations(field)">  

  ## Link to the resource URL itself, if there is one, not to our own internal resource profile page
  % if field in c.profile :
    % for relation in c.profile[field]:
      <%
      uuid = h.uuid_from_uri( relation, True )
      if not c.relations.has_key( uuid ):
        continue
      obj = c.relations[ uuid ]

      resource_title = ''
      resource_url = ''
      resource_further_details = ''

      if obj.has_key( h.get_resource_title_fieldname()):
        resource_title = obj[ h.get_resource_title_fieldname() ]

      if obj.has_key( h.get_resource_url_fieldname()):
        resource_url = obj[ h.get_resource_url_fieldname() ]

      if obj.has_key( h.get_resource_details_fieldname()):
        resource_further_details = obj[ h.get_resource_details_fieldname() ]

      if resource_url != '' and resource_title == '':
        resource_title = resource_url
      %>
      <p>

      % if resource_url != '':
        <a href="${resource_url}" title="${resource_title}" target="_blank">
        ${resource_title}
        </a>
      % elif resource_title != '':
        ${resource_title}
      % endif

      % if resource_further_details != '':
        <br />
        ${resource_further_details}
      % endif
      </p>
    % endfor
  % endif
</%def>

#------------------------------------------------------------------------------------------------------

## This function does not *seem* to get used any more.
## Originally was called by manifestation.mako, which itself is obsolete.
## (Except that manifestation.mako occasionally does still get rendered if
## an orphaned manifestation has managed to survive its parent work being 
## marked as a duplicate and suppressed.)

<%def name="image_relations(field)">
  % if field in c.profile :
    % for relation in c.profile[field]:
      <div class="thumbnail specialthumb">
      <%
      url = h.profile_url_from_uri( relation )
      uuid = h.uuid_from_uri( relation, True )
      if not c.relations.has_key( uuid ):
        continue
      obj = c.relations[ uuid ]
      object_type = obj['object_type']
      main_displayable_fieldname = h.get_main_displayable_fieldname( object_type )
      image_filename = obj.get( main_displayable_fieldname )
      if not image_filename.startswith( 'http' ):
        image_filename = '/scans' + image_filename
      %>
      <a href="${url}"><img src="${image_filename}" /></a>
      </div>
    % endfor
  % endif
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="detailed_relations(field)">
  % if field in c.profile :
    <%

    relations_list = c.profile[ field ]

    if field == h.get_relations_to_manifestation_fieldname(): #{ # they're a random mess, sort them!
      sorted_relations = h.sort_manifs_by_type( relations_list )
      relations_list = []
      for manif_tuple in sorted_relations: #{  # consists of URI, manif type, manif type for sorting
        manif_uri = manif_tuple[0]
        relations_list.append( manif_uri )
    %>

	<div class="detailed_relations">
	 <%
		for relation in relations_list:
		  uuid = h.uuid_from_uri( relation, True )
		  if not c.relations.has_key( uuid ):
			  continue

		  self.display_details_of_one_object( c.relations[ uuid ], nested=False )
	  %>
	</div>
  % endif
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="display_details_of_one_object( obj, nested )">
##{
  <div class="display_details_of_one_object ${nested}">
  <%
  uri_fieldname = h.get_uri_fieldname()

  if obj.has_key( uri_fieldname ) and obj.has_key( 'object_type' ): #{
    uri = obj[ uri_fieldname ]
    url = h.profile_url_from_uri( uri )
    object_type = obj['object_type']
    main_displayable_fieldname = h.get_main_displayable_fieldname( object_type )
    main_display_value = obj.get( main_displayable_fieldname )
  #}
  else: #{  #dodgy record!
    return
  #}

  fields_to_display = [] 
  details_to_display = [] 
  label = ''
  display_value = ''
  related_uri = ''
  related_obj = {}
  link = ''

  if object_type == 'manifestation':
    fields_to_display = fields.get_fields_to_display_in_profile( object_type, nested )

    # Filter out some which shouldn't be shown
    if obj.has_key( h.get_manifestation_receipt_calendar_fn() ) :
      if obj[h.get_manifestation_receipt_calendar_fn()] in ['U','u', 'Unknown', 'unknown']:
        if h.get_manifestation_receipt_calendar_fn() in fields_to_display:
          fields_to_display.remove( h.get_manifestation_receipt_calendar_fn() )
      elif obj[h.get_manifestation_receipt_calendar_fn()] == 'G' :
        obj[h.get_manifestation_receipt_calendar_fn()] = "Gregorian"
      elif obj[h.get_manifestation_receipt_calendar_fn()] == 'J' or \
            obj[h.get_manifestation_receipt_calendar_fn()] == 'JJ' or \
            obj[h.get_manifestation_receipt_calendar_fn()] == 'JM':
        obj[h.get_manifestation_receipt_calendar_fn()] = "Julian"


    if obj.has_key( h.get_creation_date_year_fieldname() ) or \
                   ( obj.has_key( h.get_creation_date_month_fieldname() ) and obj[h.get_creation_date_month_fieldname()] != 0 ) or \
                   ( obj.has_key( h.get_creation_date_day_fieldname() ) and obj[h.get_creation_date_day_fieldname()] != 0 ):

       date = date_full( obj.get( h.get_creation_date_year_fieldname() ),
                               obj.get( h.get_creation_date_month_fieldname() ),
                               obj.get( h.get_creation_date_day_fieldname() )  )

       obj[h.get_creation_date_fieldname()] = date


    # Tweak display of these
    if obj.has_key( h.get_manifestation_receipt_date_fn() ) :

      # obj[h.get_manifestation_receipt_date_fn()] = obj[h.get_manifestation_receipt_date_fn()].isoformat()[:10]#strftime("%d %B") + obj[h.get_manifestation_receipt_date_fn()].year
      date = date_full( obj.get( h.get_fieldname_manifestation_receipt_date_year() ),
                              obj.get( h.get_fieldname_manifestation_receipt_date_month() ),
                              obj.get( h.get_fieldname_manifestation_receipt_date_day() )  )

      if obj.has_key(h.get_fieldname_manifestation_receipt_date_year()) :
        del obj[h.get_fieldname_manifestation_receipt_date_year()]
      if obj.has_key(h.get_fieldname_manifestation_receipt_date_month()) :
        del obj[h.get_fieldname_manifestation_receipt_date_month()]
      if obj.has_key(h.get_fieldname_manifestation_receipt_date_day()) :
        del obj[h.get_fieldname_manifestation_receipt_date_day()]

      obj[h.get_manifestation_receipt_date_fn()] = date

      if obj.has_key( h.get_manifestation_receipt_date_inferred_fn() ) or obj.has_key( h.get_manifestation_receipt_date_uncertain_fn() ) or obj.has_key( h.get_manifestation_receipt_date_approx_fn() ):
        obj[h.get_manifestation_receipt_date_fn()] += "  ("
        if obj.has_key( h.get_manifestation_receipt_date_inferred_fn() ) :
          obj[h.get_manifestation_receipt_date_fn()] += "inferred "
        if obj.has_key( h.get_manifestation_receipt_date_uncertain_fn() ) :
          obj[h.get_manifestation_receipt_date_fn()] += "uncertain "
        if obj.has_key( h.get_manifestation_receipt_date_approx_fn() ) :
          obj[h.get_manifestation_receipt_date_fn()] += "approx "
        obj[h.get_manifestation_receipt_date_fn()] += ")"
        if h.get_manifestation_receipt_date_inferred_fn() in fields_to_display:
          fields_to_display.remove( h.get_manifestation_receipt_date_inferred_fn() )
        if h.get_manifestation_receipt_date_uncertain_fn() in fields_to_display:
          fields_to_display.remove( h.get_manifestation_receipt_date_uncertain_fn() )
        if h.get_manifestation_receipt_date_approx_fn() in fields_to_display:
          fields_to_display.remove( h.get_manifestation_receipt_date_approx_fn() )

    if obj.has_key( h.get_manifestation_receipt_date_gregorian_fn() ) :
      obj[h.get_manifestation_receipt_date_gregorian_fn()] = obj[h.get_manifestation_receipt_date_gregorian_fn()].isoformat()[:10]#strftime("%d %B") + obj[h.get_manifestation_receipt_date_fn()].year


  if len( fields_to_display ) > 0: #{
    for field_to_display in fields_to_display: #{
      if obj.has_key( field_to_display ): #{

        label = trans.translate( field_to_display )

        raw_values = obj[ field_to_display ]
        if type( raw_values ) != list: #{  ## we could have, e.g., multiple enclosures in a manifestation
          raw_values = [ raw_values ]
        #}

        for field_value in raw_values: #{
          display_value = ''
          related_uri = ''
          related_obj = {}
          link = ''

          if field_to_display == h.get_opened_fn() :
            if field_value == "Opened":
              continue

          elif type( field_value ) == unicode or type( field_value ) == str: #{
            if field_value.startswith( 'http' ): #{
              related_uri = field_value
              related_obj = h.get_item_from_uri( related_uri )
            #}
            elif field_to_display == h.get_shelfmark_fieldname(): #{ # strip off 'shelf:' prefix
              field_value = h.strip_value_prefix( field_value, h.get_shelfmark_value_prefix())
            #}
          #}
          elif field_to_display == h.get_is_translation_fieldname():
            if not field_value:
              continue

          if related_uri == '': #{
            display_value = field_value
          #}

          details_dict = { 'fieldname'    : field_to_display,
                           'label'        : label,
                           'display_value': display_value,
                           'related_obj'  : related_obj,
                           'link'         : link }
          details_to_display.append( details_dict )
        #}
      #}
    #}
  #}
  %>

  ##===========================================================
  ## By default link through to profile page for related object
  ## (except for comments - their profile page is useless),
  ## and display any additional fields specified in fields.mako
  ##===========================================================
  % if len( details_to_display ) == 0:
    
    % if object_type == 'comment':
      <pre>${main_display_value}</pre>
    % else:
      <a href="${url}">${main_display_value}</a><br/>
    % endif

    <%
    additional = fields.get_additional_fields( object_type )
    %>

    % if additional :

      % for label in additional:
        <%
        val = obj.get( additional[ label ], "" )
        %>
        % if val:
          % if type( val ) == unicode or type( val ) == str:
            % if val.startswith("http"):
              <span style="color:#172854;">${label}</span>:<br/>&nbsp;&nbsp;&nbsp; <a href="${val}" target="_blank">${val}</a><br/>
            % else:
			<span style="color:#172854;">${label}</span>:<br/>&nbsp;&nbsp;&nbsp; ${val}<br/>
            % endif
          % else:
		  <span style="color:#172854;">${label}</span>:<br/>&nbsp;&nbsp;&nbsp; ${val}<br/>
          % endif
        % endif
      % endfor
    % endif

  ##===============================================================================
  ## Handle nested relationships in manifestations by showing non-default details.
  ## Other object types may also be displayed in a non-default way if wished: 
  ## see get_fields_to_display_in_profile() in ../helpers/fields.mako.
  ##===============================================================================
  % else:

	<h5>Version: ${main_display_value}</h5>

    % for details_dict in details_to_display:

      <%
		  field_to_display = details_dict[ 'fieldname' ]
		  label            = details_dict[ 'label' ]
		  display_value    = details_dict[ 'display_value' ]
		  related_obj      = details_dict[ 'related_obj' ]
      %>

      % if obj.has_key( field_to_display ):

        % if len( related_obj ) > 0:

			% if label :
				<p><span class="fieldlabel">${label}:</span></p>
			% endif
		 	${self.display_details_of_one_object( related_obj, nested=True )}
\
        % else:
\
			% if label :
				<p><span class="fieldlabel">${label}:</span>${display_value}</p>
			% else:
				<p>${display_value}</p>
			% endif

        % endif


      % endif

    % endfor

  % endif

	</div>
</%def>
#------------------------------------------------------------------------------------------------------
<%def name="date_full( year, month, day )">
<%
	date = ''
	if year :
		date += str(year)
	else :
		date += '????'

	if month and month != 0:
		if month < 10 :
			date += " - 0" + str(month)
		else :
			date += " - " + str(month)
	else :
		date += ' - ??'

	if day and day != 0:
		if day < 10 :
			date += " - 0" + str(day)
		else :
			date += " - " + str(day)
	else :
		date += ' - ??'

	return date
%>
</%def>

<%def name="further_relations( field, listall=False, style='', link=True )">

  <%
  if not c.further_relations or len( c.further_relations ) == 0:
    return
  %>

  % if field in c.further_relations :
    % if 'image' in field :
      <%
        self.display_images( field, listall )
      %>

    % else :
      <ul>
      % for obj in c.further_relations[field].values():
        <%
        object_type = obj[ 'object_type' ]
        display_fieldname = h.get_main_displayable_fieldname( object_type )
        display = obj.get( display_fieldname )

        uri_fieldname = h.get_uri_fieldname()
        uri = obj[ uri_fieldname ]
        url = h.profile_url_from_uri( uri )
        %>
        <li style="${style}">
			%if link:
			    <a href="${url}">${display}</a>
			% else :
				${display}
			% endif
		</li>
      % endfor
      </ul>
    % endif
  % endif
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="display_images( field, list_all_for_one_manif=False )">
##{
  <%
	  ## Double-check that 'further relations' dictionary contains images
	  if not c.further_relations or len( c.further_relations ) == 0 or field not in c.further_relations:
		return

	  ## Initalise fieldnames
	  image_source_fieldname = h.get_image_source_fieldname()
	  image_thumnbnail_fn = h.get_thumbnail_fieldname()
	  uri_fieldname = h.get_uri_fieldname()

	  ## Get image data such as filename and order in which images should be displayed
	  raw_img_data_in_random_order = c.further_relations[ field ].values()
	  sorted_img_data = self.sort_images( raw_img_data_in_random_order )
  %>

	<!-- DEBUG
	 ${image_source_fieldname}
	 ${uri_fieldname}
     ${raw_img_data_in_random_order}
	 ${sorted_img_data}

	 -->

  % if list_all_for_one_manif :
    ##------------------------------------------------------------------------------------------
    ## IMAGE profile page: all images are shown down left-hand side, with one enlarged on right.
    ## Here we just do the left-hand set of images. The big enlarged one is done in image.mako.
    ##------------------------------------------------------------------------------------------
    <% img_count=0 %>
		<div class="profilepart"><br/>
    <ul class="small-block-grid-2 medium-block-grid-4 large-block-grid-2">
    % for one_img_dict in sorted_img_data:
      <%
		image_source = one_img_dict.get( image_thumnbnail_fn, None )
		if not image_source :
			image_source = one_img_dict.get( image_source_fieldname, '' )


		image_source_url = h.image_url( image_source )
		is_displayable_image = self.is_displayable_image_type( image_source_url )
		selected_image_style="border:6px solid #800000"
		img_count += 1
      %>


      ##-----------------------------------------------------------------------------
      ## The currently-selected image (also shown full-size on right. See image.mako)
      ##-----------------------------------------------------------------------------
      % if one_img_dict[ uri_fieldname ] == c.profile[ uri_fieldname ] :

        % if is_displayable_image:
         <li><img style="width:100%;${selected_image_style}" src="${image_source_url}" /></li>
        % endif
        
      ##-------------------------------------------------------------------------------
      ## The rest of the thumbnail-sized images, linking to profile page for that image
      ##-------------------------------------------------------------------------------
      % else :
        <%
        profile_page_uri = one_img_dict[ uri_fieldname ]
        profile_page_url = h.profile_url_from_uri( profile_page_uri )
        %>
	<li>
        % if is_displayable_image:

          <a href="${profile_page_url}">
          	<img style="width:100%;" src="${image_source_url}" />
          </a>

        % else:
          <a href="${image_source_url}">
          ${self.link_text_for_non_displayable_image( image_source_url )} ${str( img_count )}
          </a>
        % endif
	</li>
      % endif
    % endfor
	</ul></div>

  % else :
    ##----------------------------------------------------------------
    ## WORK profile page: just the *first image per manifestation* is
    ## displayed (as a thumbnail on the left).
    ##----------------------------------------------------------------
    <%
    ## Find out how many manifestations we've got, 
    ## get the manifestations into a sensible order, 
    ## and loop through displaying images.
    manifs_fieldname = h.get_relations_to_manifestation_fieldname()
    if not c.profile.has_key( manifs_fieldname ):  ## whoops, something must have gone very wrong!
      return
    manif_uri_list = c.profile[ manifs_fieldname ]

    # Get a list of tuples, i.e. (manifestion URI, manifestion type, sort column)
    # The sort column is same as manifestation type, except that 'Letter' comes at the very start.
    sorted_manifs = h.sort_manifs_by_type( manif_uri_list )
    %>

    % for (manif_uri, manif_type, sort_column) in sorted_manifs:
      <%
      num_images_for_manif = 0
      first_img_dict = {}

      for one_img_dict in sorted_img_data: #{
        if one_img_dict.has_key( manifs_fieldname ): #{ #it jolly well should have!
          manif_of_image = one_img_dict[ manifs_fieldname ][0]
          if manif_of_image == manif_uri: #{
            if num_images_for_manif == 0: # first image for this manifestation
              first_img_dict = one_img_dict
            num_images_for_manif += 1
          #}
        #}
      #}

      if num_images_for_manif > 0: #{
        image_source = one_img_dict.get( image_thumnbnail_fn, None )
        if not image_source :
            image_source = first_img_dict.get( image_source_fieldname, '' )

        image_source_url = h.image_url( image_source )
        is_displayable_image = self.is_displayable_image_type( image_source_url )

        profile_page_uri = first_img_dict[ uri_fieldname ]
        profile_page_url = h.profile_url_from_uri( profile_page_uri )
      #}
      %>

      % if num_images_for_manif > 0:
        <div class="profilepart thumbnail specialthumb">

          <p style="text-align:center">
          ## Possibly link to the image profile page via manifestation type? (check with users)
          ##<a href="${profile_page_url}">
          ${manif_type}
          ##</a>
          </p>

          <p style="text-align:center">

          ## Link to the image profile page via thumbnail
          <a href="${profile_page_url}">

          % if is_displayable_image:
            <img style="max-width: 100%;min-width: 100px;" src="${image_source_url}" />
          % else:
            ${self.link_text_for_non_displayable_image( image_source_url )} 
          % endif

          </a>
          </p>

          <% further_img_count = num_images_for_manif - 1 %>

          % if further_img_count == 0 :
            <% msg = 'No further images' %>
          % elif further_img_count == 1 :
            <% msg = '1 further image' %>
          % else :
            <% msg = str( further_img_count ) + ' further images' %>
          % endif

          <p style="text-align:center">

          ## Link to the image profile page
          (<a href="${profile_page_url}">${msg}</a>)

          </p>
        </div>
      % endif
    % endfor
  % endif
</%def>
##}

#------------------------------------------------------------------------------------------------------

<%def name="decode_uncertainty_flags( fieldname_root )" >
<%
  flags = []
  flagstring = ''

  endings = [ 'inferred', 'uncertain', 'approximate' ]
  fieldnames = [fieldname_root + ending for ending in endings]

  for index, fieldname in enumerate(fieldnames):
    if fieldname in c.profile:
      flags.append( endings[index] )

  if len( flags ) == 1 :
    flagstring  = flags[0]
  elif len( flags ) == 2 :
    flagstring  = flags[0] + " and " + flags[1]
  elif len( flags ) == 3 :
    flagstring  = flags[0] + ", " + flags[1] + " and " + flags[2]

  return flagstring
%>
</%def>

#----------------------------------------------------------------------------------------------------

<%def name="navigate_profiles()" >
##{
  <%
  if len( request.params ) == 0:
    return

  str_total_records_found = h.get_parm_value_from_request( request, 'numFound' )
  str_current_index       = h.get_parm_value_from_request( request, 'start' )

  if not str_total_records_found.isdigit():
    return

  if not str_current_index.isdigit():
    return

  link_to_next = ''
  link_to_prev = ''
  link_to_first = ''
  link_to_last = ''

  total_records_found = int( str_total_records_found )
  current_index       = int( str_current_index )

  current_rownum = current_index + 1

  if current_rownum < total_records_found: #{
    link_to_next = h.link_to_another_record( request, jump = 1 )
    link_to_last = h.link_to_another_record( request, jump = total_records_found - current_rownum )
  #}

  if current_rownum > 1:
    link_to_prev  = h.link_to_another_record( request, jump = -1 )
    link_to_first = h.link_to_another_record( request, jump = 0 - current_index )

  back_to_results = h.get_parm_value_from_request( request, 'baseurl' )
  if back_to_results != '': #{
    parm_list = []
    parm_dict = h.get_request_params_as_dict( request )
    parms_to_drop = [ 'baseurl', 'rows', 'numFound', 'type' ]
    for parm_name, parm_value in parm_dict.iteritems(): #{
      if parm_name in parms_to_drop:
        continue
      elif parm_name == 'start' and parm_value != '0': #{
        int_start = int( parm_value )
        remainder = int_start % h.get_default_rows_per_page()
        if remainder > 0: #{
          int_start = int_start - remainder
          parm_value = unicode( int_start )
        #}
      #}
      parm_list.append( parm_name + '=' + h.minimal_urlencode( parm_value ))
    #}
    if len( parm_list ) > 0:
      back_to_results = back_to_results + '?' + '&'.join( parm_list )
  #}
  %>

  <h4>Result ${current_rownum} of ${total_records_found}</h4>

  <div class="pagination">

  ${self.refine_search_button( add_formatting_span = False )}
  ${self.separate_nav_buttons()} 

  %if total_records_found > 1:

    <a href="${back_to_results}" title="Back to results list" class="button search-related modifysearchbtn small">Back to results</a>
    ${self.separate_nav_buttons()} 

    ## Add a 'Refine Search' button here in due course.

    % if link_to_prev == '':
      <a href="" title="Disabled" class="button small disabled">|&lt;</a>
      ${self.separate_nav_buttons()}
      <a href="" title="Disabled" class="button small disabled">&lt;</a>
    % else:
      <a role="button" href="${link_to_first}" title="First record in results list" class="button small">&lt;&lt;</a>
      ${self.separate_nav_buttons()} 
      <a role="button" href="${link_to_prev}" title="Previous record in results list" class="button small">&lt;</a>
    % endif

      ${self.separate_nav_buttons()} 

    % if link_to_next == '':
      <a href="" title="Disabled" class="button small">&gt;</a>
      ${self.separate_nav_buttons()}
      <a href="" title="Disabled" class="button small">&gt;|</a>
    % else:
      <a role="button" href="${link_to_next}" title="Next record in results list" class="button small">&gt;</a>
      ${self.separate_nav_buttons()} 
      <a role="button" href="${link_to_last}" title="Last record in results list" class="button small">&gt;&gt;</a>
    % endif
  % endif

  </div>
##}
</%def>

#----------------------------------------------------------------------------------------------------

<%def name="separate_nav_buttons()" >
  &nbsp;
</%def>

#----------------------------------------------------------------------------------------------------

<%def name="h4_works_list( field, title = None, sorted_list = None, img = None )">
##{ IT AINT A H4 ANYMORE! - so swallow that!!
	<%
		if not sorted_list:
			sorted_list = self.get_works_summary_sorted_by_date( field )

		if title is None:
			title = trans.translate( field )
	%>

	% if len( sorted_list ) > 0:

		<h3><img src="/img/${img}"/>${title}</h3>
		<div class="content">
			${self.works_list( field, sorted_list )}
		</div>
	% endif
##}
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="works_list( field, sorted_list = None )">
##{
  <%
  if not sorted_list:
    sorted_list = self.get_works_summary_sorted_by_date( field )

  if len( sorted_list ) == 0:
    return

  show_every_row = self.is_short_enough_to_show_every_row( sorted_list )
  %>

  % if show_every_row:
    ${self.works_list_with_description( sorted_list )}
  % else:
    ${self.works_summary_by_year( sorted_list, field )}
  % endif
##}
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="works_list_with_description( sorted_list )">
##{
  ## Display a table of works, one line per work, with a link from the work description to the profile.
  ## 'Sorted list' will have been produced by function 'works_list()'.
  ## Each item in 'sorted list' should be a dictionary, one of the keys of which is 'obj':
  ## item = { 'rel': link, 'obj': obj, 'sort': sortval }
  ## In turn, 'obj' is itself a dictionary with fieldname keys, e.g. h.get_start_year_fieldname().

  ## When outputting a list of works, we display a separate column for the year.
  ## Just show the year when it changes, rather than repeating the same year again and again.
  ## When the year does change, draw a thin dotted line across the row to emphasise.

  <% 
  yearlast = 0 
  space = ' '
  dotted_top_border1 = 'border-top: #999 dashed 1px; padding-left:10px;'
  dotted_top_border2 = 'border-top: #999 dashed 1px; padding: 5px 0px 5px 10px;'
  no_top_border = 'padding:5px 0px 10px 10px;'
  %>

  <table>
  % for item in sorted_list :
    <%
    url = item[ 'rel' ] 
    obj = item['obj'] 
    year = obj.get( h.get_start_year_fieldname(), '????' )
    display = obj.get( h.get_main_displayable_fieldname( 'work' ), '????' )
    %>

    <tr>

    % if yearlast != year :
      <td style="${dotted_top_border1}">
      % if year == 9999:
        ????
      % else:
        ${year}
      % endif
      </td>

      <td style="${dotted_top_border2}">
   
    % else :
      <td style="${no_top_border}">
      ${space}
      </td>

      <td style="${no_top_border}">
    % endif

    <a href="${url}">
    ${display}
    </a>
    </td>

    <% yearlast = year %>
    </tr>
  % endfor
  </table>
##}
</%def>
#------------------------------------------------------------------------------------------------------

<%def name="works_summary_by_year( sorted_list, field )">
##{
  ##====================================================================
  ## Display a summary table of works, one row per decade.
  ## Link through to the Works Search Results from each total.
  ## ('Sorted list' will have been produced by function 'works_list()')
  ##====================================================================
  <%
	  ## Count up the letters that we have retrieved in a dictionary, e.g. { 1670: 5, 1660: 2 }
	  ## and also get a list of all the separate years in numerical order.

	  ##====================================================================================
	  ## N.B. TODO!!! STILL NEED TO CHECK FOR LETTERS WITH AN 'END DATE' BUT NO 'START DATE'
	  ##====================================================================================

	  ( distinct_years, year_counts ) = self.count_works_per_year( sorted_list )

	  # Prepare to link through to Works Search Results: work out which field to search on.
	  fields_crossref = {
		'person': {
		  h.get_works_created_fieldname():            h.get_author_uri_fieldname(),
		  h.get_letters_received_fieldname():         h.get_addressee_uri_fieldname(),
		  h.get_works_in_which_mentioned_fieldname(): h.get_relations_to_people_mentioned_fieldname()
		},

		'location': {
		  h.get_works_with_origin_fieldname():        h.get_origin_uri_fieldname(),
		  h.get_works_with_destination_fieldname():   h.get_destination_uri_fieldname(),
		  h.get_works_in_which_mentioned_fieldname(): h.get_relations_to_places_mentioned_fieldname()
		},

		'institution': {
		  h.get_repository_contents_fieldname():      'repository', ## use the form field and repository name
		},
	  }

	  search_field = ''
	  core_href = ''
	  href = ''

	  object_type = c.profile[ 'object_type' ]
	  if fields_crossref.has_key( object_type ): #{
		search_fields = fields_crossref[ object_type ]
		if search_fields.has_key( field ): #{
		  search_field = search_fields[ field ]
		#}
	  #}

	  if search_field != '': #{
		if object_type == 'institution': #{
		  repository_name = c.profile[ h.get_main_displayable_fieldname( object_type ) ]
		  core_href='/forms/advanced?' + search_field + '=' + repository_name
		#}
		else: #{
		  uri_value = h.strip_value_prefix( c.profile[ h.get_uri_fieldname() ], h.get_uri_value_prefix() )
		  core_href='/forms/advanced?' + search_field + '=' + uri_value
		#}
	  #}
  %>

  <% prev_decade = 0 %>
  <table><tr><th>Decade</th><th>Letters per year</th></tr>
  <tr><td>
  % for year in distinct_years:
    <%
		# Put unknown year at the end
		if year == 9999:
		  continue

		letter_count = year_counts[ year ]
		decade = year - (year % 10)
    %>

    % if decade != prev_decade and prev_decade > 0: 
      </td></tr><tr><td>
    % endif

    % if decade != prev_decade: 
      ${decade}s
      </td><td>
    % else:
      &diams; 
    % endif

    ##=====================================
    ## Display link to Works Search Results
    ##=====================================
    % if core_href != '': 
      <% href = core_href + '&dat_sin_year=' + str( year ) %>
      <a href="${href}">
    % endif

    ${year}:&nbsp;${letter_count}

    % if core_href != '': 
      </a>
    % endif

    <% prev_decade = decade %>
  % endfor
  </td></tr>

  % if year_counts.has_key( 9999 ):
    <tr><td>????</td><td>

    % if core_href != '': 
      <% href = core_href + '&dat_from_year=9999&dat_from_month=1&dat_from_day=1' %>
      <a href="${href}">
    % endif

    Unknown year: ${year_counts[9999]}

    % if core_href != '': 
      </a>
    % endif
    </td></tr>
  % endif
  </table>
##}
</%def>
#------------------------------------------------------------------------------------------------------

<%def name="get_max_works_per_section_of_profile()">
  <%
  	return 25
  %>
</%def>
#----------------------------------------------------------------------------------------------------

<%def name="is_short_enough_to_show_every_row( list_of_data )">
  <%
	  ## Depending on how long a list of data you have got,
	  ## decide whether to show a detailed list or just a summary by year.

	  row_count = len( list_of_data )

	  if row_count <= self.get_max_works_per_section_of_profile(): # can show every work, with description
		show_every_row = True

	  else: # must show just a summary with totals by year
		show_every_row = False

	  return show_every_row
  %>
</%def>
#----------------------------------------------------------------------------------------------------

<%def name="get_works_summary_sorted_by_date( field )">
##{
  <%
	  if not field in c.profile :
		return []

	  if field == h.get_repository_contents_fieldname(): ## this has manifestation IDs, need to look up works
		work_uris = self.get_works_in_repository()
	  else:
		work_uris = c.profile[ field ]

	  show_every_row = self.is_short_enough_to_show_every_row( work_uris )

	  if show_every_row: #{ # get year, full date and description
		fields_to_get = [ h.get_start_year_fieldname(),
						  'started_date_sort',
						  h.get_main_displayable_fieldname( 'work' ) ]
	  #}
	  else:  #{ # get year only
		fields_to_get = [ h.get_end_year_fieldname(),
						  h.get_start_year_fieldname() ]
	  #}
	  work_details = h.get_records_from_solr( work_uris, fields_to_get )


	  # Sort works by date.
	  to_be_sorted = []
	  item = { 'rel': None, 'obj': None, 'sort': None }

	  for uuid, obj in work_details.iteritems(): #{
		stripped_uuid = h.strip_value_prefix( uuid, h.get_uuid_value_prefix() )
		uri = 'http://localhost/work/' + stripped_uuid
		link = h.profile_url_from_uri( uri )

		if not obj.has_key( h.get_start_year_fieldname() ): #{
		  ## If the main date field is missing (i.e. *start* year of range), check for the *end* of the range:
		  ## we may have a record dated something like 'On or before 15 Sep 1659'.
		  if obj.has_key( h.get_end_year_fieldname() ): #{
			obj[ h.get_start_year_fieldname() ] = obj[ h.get_end_year_fieldname() ]
		  #}
		  else: #{
			obj[ h.get_start_year_fieldname() ] = 9999
		  #}
		#}

		if show_every_row:
		  sortval = obj[ 'started_date_sort' ]
		else:
		  sortval = obj[ h.get_start_year_fieldname() ]

		item = { 'rel'    : link, \
				 'obj'    : obj, \
				 'sort'   : sortval
			   }
		to_be_sorted.append( item )
	  #}

	  sorted_list = sorted( to_be_sorted, key=lambda item : item['sort'], reverse=False )
  %>

  <%
  	return sorted_list
  %>
##}
</%def>
#----------------------------------------------------------------------------------------------------

<%def name="count_works_per_year( sorted_list )">
##{
  ##==============================================================================================
  ## Count up the letters that we have retrieved. Also return a list of distinct years in order.
  ##==============================================================================================
  ## Each item in 'sorted list' should be a dictionary, one of the keys of which is 'obj':
  ## item = { 'rel': link, 'obj': obj, 'sort': sortval }
  ## In turn, 'obj' is itself a dictionary with fieldname keys, e.g. h.get_start_year_fieldname().
  ##==============================================================================================
  <%
	  year_counts = {}
	  distinct_years = []
	  prev_year = 0

	  for item in sorted_list: #{
		obj = item['obj']
		year = obj.get( h.get_start_year_fieldname(), 9999 )

		if year_counts.has_key( year ):
		  year_counts[ year ] += 1
		else:
		  year_counts[ year ] = 1

		if year != prev_year:
		  distinct_years.append( year )

		prev_year = year
	  #}

	  return ( distinct_years, year_counts )
  %>
##}
</%def>

#------------------------------------------------------------------------------------------------------

<%def name="get_works_in_repository()">
  <%
	  ## Repository contents is a list of manifestation IDs.
	  ## Convert these to a list of work IDs and return the list.

	  work_uris = []

	  if c.profile.has_key( h.get_repository_contents_fieldname() ): #{
		manifs = c.profile[ h.get_repository_contents_fieldname() ]
		fields_to_get = [ h.get_relations_to_work_fieldname() ]

		response  = h.get_records_from_solr( manifs, fields_to_get )

		for manif_id in manifs: #{
		  manif_id = h.uuid_from_uri( manif_id, full=True )
		  solr_record = response[ manif_id ]
		  if solr_record.has_key( h.get_relations_to_work_fieldname() ): #{
			work_uri = solr_record[ h.get_relations_to_work_fieldname() ][0]
			work_uris.append( work_uri )
		  #}
		#}
	  #}

	  return work_uris
  %>
</%def>
#----------------------------------------------------------------------------------------------------

<%def name="get_displayable_image_types()">
  <%
  	displayable_types = [ 'jpg', 'png', 'gif' ]
  	return displayable_types
  %>
</%def>
#----------------------------------------------------------------------------------------------------

<%def name="is_displayable_image_type( image_source_url )">
  <%
	  is_displayable_image = False
	  displayable_image_types = self.get_displayable_image_types()
	  for displayable_image_type in displayable_image_types: #{
		if image_source_url.lower().endswith( displayable_image_type ): #{
		  is_displayable_image = True
		  break
		#}
	  #}
	  return is_displayable_image
  %>
</%def>
#----------------------------------------------------------------------------------------------------

<%def name="link_text_for_non_displayable_image( image_source_url )">
  <%
	  file_type = 'Image file'
	  if image_source_url.lower().endswith( 'pdf' ):
		file_type = 'PDF'
	  elif image_source_url.lower().endswith( 'tif' ) or image_source_url.lower().endswith( 'tiff' ):
		file_type = 'TIFF'
	  return file_type
  %>
</%def>
#----------------------------------------------------------------------------------------------------
