# -*- coding: utf-8 -*-
<%!
   import web.lib.relations
   relation_fields = web.lib.relations.object_relation_fields['image']
   
   main_title = 'Image'
%>

<%inherit file="/main/profile.mako" />

##-----------------------------------------------------------------------------------------------------

<%def name="for_head()"></%def>

##-----------------------------------------------------------------------------------------------------

<%def name="for_foot()"></%def>

##-----------------------------------------------------------------------------------------------------

<%def name="profileRight()">

  <%namespace name="trans" file="/helpers/translate.mako" import="*"/>

  <%
  relations_to_image_fieldname = h.get_relations_to_image_fieldname()
  relations_to_manifestation_fieldname = h.get_relations_to_manifestation_fieldname()
  image_source_fieldname = h.get_image_source_fieldname()

  manifestation_obj = {}

  ##============================================================
  ## Get full details of manifestation of which this is an image
  ##============================================================
  if c.profile.has_key( relations_to_manifestation_fieldname ): #{ # it really should have!
    manifestation_uri = c.profile[ relations_to_manifestation_fieldname ][0]
    manifestation_uuid = h.uuid_from_uri( manifestation_uri, full=True )
    if c.relations.has_key( manifestation_uuid ): #{ # once again, it really should have!
      manifestation_obj = c.relations[ manifestation_uuid ]
    #}
  #}
  
  #===============================
  # Get copyright info for display
  #===============================
  repository_details = []
  copyright_info = ''
  generated_copyright_info = False

  if c.profile.has_key( h.get_image_credits_fieldname() ): #{
    copyright_info = c.profile[ h.get_image_credits_fieldname() ]
  #}
  else: # {# Generate copyright info from repository name
    if manifestation_obj.has_key( h.get_repository_fieldname() ): #{
      repository_uri = manifestation_obj[ h.get_repository_fieldname() ][0]
      repository_uuid = h.uuid_from_uri( repository_uri, full=True )
      fields_to_get = [ h.get_repository_name_fieldname(),
                        h.get_repository_city_fieldname(),
                        h.get_repository_country_fieldname() ]
      response  = h.get_records_from_solr( repository_uuid, fields_to_get )
      if response.has_key( repository_uuid ): #{
        solr_record = response[ repository_uuid ]
        for repository_field in fields_to_get: #{
          if repository_field == 'id': ## this gets automatically added by get_records_from_solr()
            continue
          if solr_record.has_key( repository_field ): #{
            repository_details.append( solr_record[ repository_field ] )
          #}
        #}
      #}
      copyright_info = ", ".join( repository_details )
      generated_copyright_info = True
    #}
  #}
  %>

	<% image_anchorname = self.get_anchor_name( 'image' )%>
	<a name="${image_anchorname}" > </a>

	##==========================================================
	## Output all images for this manifestation.
	## These are small images down the left-hand side.
	## The function "display_images()" is also called by *work*
	## profile, so see "profile.mako" for this shared function.
	##==========================================================
	${self.display_images( relations_to_image_fieldname, list_all_for_one_manif=True )}


</%def>

<%def name="profile()">

  <%
  relations_to_image_fieldname = h.get_relations_to_image_fieldname()
  relations_to_manifestation_fieldname = h.get_relations_to_manifestation_fieldname()
  image_source_fieldname = h.get_image_source_fieldname()

  manifestation_obj = {}

  ##============================================================
  ## Get full details of manifestation of which this is an image
  ##============================================================
  if c.profile.has_key( relations_to_manifestation_fieldname ): #{ # it really should have!
    manifestation_uri = c.profile[ relations_to_manifestation_fieldname ][0]
    manifestation_uuid = h.uuid_from_uri( manifestation_uri, full=True )
    if c.relations.has_key( manifestation_uuid ): #{ # once again, it really should have!
      manifestation_obj = c.relations[ manifestation_uuid ]
    #}
  #}
  
  #===============================
  # Get copyright info for display
  #===============================
  repository_details = []
  copyright_info = ''
  generated_copyright_info = False

  if c.profile.has_key( h.get_image_credits_fieldname() ): #{
    copyright_info = "Special Collections <a href=\"#\">Centre</a>, University of Aberdeen"  # c.profile[ h.get_image_credits_fieldname() ]
  #}
  else: # {# Generate copyright info from repository name
    if manifestation_obj.has_key( h.get_repository_fieldname() ): #{
      repository_uri = manifestation_obj[ h.get_repository_fieldname() ][0]
      repository_uuid = h.uuid_from_uri( repository_uri, full=True )
      fields_to_get = [ h.get_repository_name_fieldname(),
                        h.get_repository_city_fieldname(),
                        h.get_repository_country_fieldname() ]
      response  = h.get_records_from_solr( repository_uuid, fields_to_get )
      if response.has_key( repository_uuid ): #{
        solr_record = response[ repository_uuid ]
        for repository_field in fields_to_get: #{
          if repository_field == 'id': ## this gets automatically added by get_records_from_solr()
            continue
          if solr_record.has_key( repository_field ): #{
            repository_details.append( solr_record[ repository_field ] )
          #}
        #}
      #}
      copyright_info = ", ".join( repository_details )
      generated_copyright_info = True
    #}
  #}
  %>

	<div id="details">

		% if image_source_fieldname in c.profile :
			<%
				unprocessed_image_filename = c.profile[ image_source_fieldname ]
				url = h.image_url( unprocessed_image_filename )
				is_displayable_image = self.is_displayable_image_type( url )
			%>

			<div class="column profilepart">
				<h3>Image</h3>
				<div class="content">

					<a href="${url}">
						% if is_displayable_image:
							<img src="${url}" class="specialthumb" />
						% else:
							${self.link_text_for_non_displayable_image( url )}
						% endif
					</a>


					##========================================
					## Display copyright info, shelfmark, etc.
					##========================================
					% if copyright_info:
						<br/>

						% if generated_copyright_info:
							Image &copy;
						% endif
						${copyright_info|n}

						<br/><br/>
					% endif
				</div>
			</div>

			<div class="column profilepart">
				<h3><img src="/img/icon-quill.png"/>Details</h3>
				<div class="content">
					Document type: ${self.display_details_of_one_object( manifestation_obj, nested = True )}
				</div>
			</div>

		% endif

	</div>

</%def>

##-----------------------------------------------------------------------------------------------------

<%def name="body()"></%def>

##-----------------------------------------------------------------------------------------------------
