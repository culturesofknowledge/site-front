# -*- coding: utf-8 -*-
#--------------------------------------------------------------------------------------------------
## Functions relating to which data appears on which page.
## For functions that return the name of the Solr equivalent for an SQL database column name,
## see fieldmap.py in web/web/lib.
#--------------------------------------------------------------------------------------------------

<%def name="get_all_extra_fields_for_results_list()">
  <%
  # These are the extra details shown in the Results List for the 'quick' search function,
  # i.e. the little Google-like single search box near the top of the screen.

  additional = {

      "work"          : { "Author as marked" : h.get_author_as_marked_fieldname(), 
                          "Year"             : h.get_start_year_fieldname() },

      "manifestation" : { "Address"          : h.get_manifestation_address_fieldname(), 
                          "Language"         : h.get_language_fieldname(), 
                          "Shelfmark"        : h.get_shelfmark_fieldname() },

      "person"        : { "Alternative names": h.get_alias_fieldname(), 
                          "Roles or titles"  : h.get_person_titles_or_roles_fieldname(),
                          "Year born"        : h.get_birth_year_fieldname(), 
                          "Year died"        : h.get_death_year_fieldname() },

      "location"      : { "Latitude"         : h.get_latitude_fieldname(), 
                          "Longitude"        : h.get_longitude_fieldname() },

      "institution"   : { "City"             : h.get_repository_city_fieldname(), 
                          "Country"          : h.get_repository_country_fieldname() },

      "resource"      : { "Details"          : h.get_resource_details_fieldname() }, 

      "comment"       : {},

      "image"         : { "Thumbnail"        : h.get_thumbnail_fieldname() }
  }
  return additional
  %>
</%def>
#--------------------------------------------------------------------------------------------------

<%def name="get_columns_for_result_list( object_type )">
  <%
  cols = []
  if object_type == "work" :
    cols.append( 'started_date_sort' )
    cols.append( 'author_sort' )
    cols.append( 'origin_sort' )
    cols.append( 'recipient_sort' )
    cols.append( 'destination_sort' )
  else :
    cols.append( h.get_main_displayable_fieldname( object_type ))
  return cols
  %>
</%def>
#--------------------------------------------------------------------------------------------------

<%def name="get_additional_fields(object_type)">
   <%
     additional = self.get_all_extra_fields_for_results_list()
     return additional[object_type]
   %>
</%def>
#--------------------------------------------------------------------------------------------------

<%def name="get_fields_to_display_in_profile( object_type, nested = True )">
##{
  ##======================================================================================================
  ## N.B. KEEP NESTED DETAILS BRIEF.
  ## NEVER include links to the same object type as the top-level object type when in 'nested' mode,
  ## because you could go into an infinite loop. E.g. if you have a manifestation with an enclosure,
  ## then when you try to show details of that enclosure, you mustn't ask it in turn to show which
  ## manifestation it was enclosed in, because it will all end in tears (or an Internal Server Error).
  ##======================================================================================================
  <%

  fields_to_display = []

  if object_type == 'manifestation': #{
    if nested: #{ # Show brief details including work details. Never include other manifestations if
                  # you are in 'nested' mode, because you don't want to go into an infinite loop.

      fields_to_display = [ h.get_relations_to_work_fieldname(),
                            h.get_repository_fieldname(),
                            h.get_shelfmark_fieldname(),
                            h.get_printed_edition_details_fieldname(),
                            h.get_relations_to_comments_fieldname() ]

    else: #{ # full details, apart from no need to repeat work details (will be in heading of profile page)
             # or document type (will be in heading of list of manifestation details)

        fields_to_display = [ h.get_repository_fieldname(),
                            h.get_shelfmark_fieldname(),
                            h.get_printed_edition_details_fieldname(),
                            h.get_relations_to_comments_fieldname(),
                            h.get_handwritten_by_fieldname(),
                            h.get_manifestation_address_fieldname(),
							h.get_incipit_fieldname(),
							h.get_excipit_fieldname() ,
                            h.get_postage_mark_fieldname(),
                            h.get_endorsements_fieldname(),
                            h.get_enclosing_fieldname(),
                            h.get_enclosed_fieldname(),
                            h.get_non_letter_enclosures_fieldname(),
                            h.get_seal_fieldname(),
                            h.get_paper_type_fieldname(),
                            h.get_paper_size_fieldname(),
                            h.get_number_of_pages_of_document_fieldname(),
                            h.get_number_of_pages_of_text_fieldname(),
                            h.get_language_fieldname(),
                            h.get_is_translation_fieldname(),
                            h.get_former_owner_fieldname(),
                            h.get_opened_fn(),
                            h.get_routing_mark_ms_fn(),
                            h.get_routing_mark_stamp_fn(),
                            h.get_handling_instructions_fn(),
                            h.get_stored_folded_fn(),
                            h.get_postage_costs_as_marked_fn(),
                            h.get_postage_costs_fn(),
                            h.get_non_delivery_reason_fn(),
                            h.get_date_of_receipt_as_marked_fn(),
                            h.get_manifestation_receipt_calendar_fn(),
                            h.get_manifestation_receipt_date_fn(),
                            h.get_manifestation_receipt_date_gregorian_fn(),
                            h.get_manifestation_receipt_date_inferred_fn(),
                            h.get_manifestation_receipt_date_uncertain_fn(),
                            h.get_manifestation_receipt_date_approx_fn()]
    #}
  #}

  return fields_to_display
  %>
##}
</%def>

#----------------------------------------------------------------------------------------------------



