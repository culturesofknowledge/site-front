# -*- coding: utf-8 -*-
'''
Created on 20th July 2011

@author: Sushila Burgess

This script writes out a schema.xml file for the 'work' Solr core.
'''

# The 'fieldmap' module passes back the fieldname as a string.
# By using functions from 'fieldmap', we can restrict fieldnames to being hard-coded in only 
# ONE place, allowing much easier changes if a better ontology is found. (SB, 13 July 2011)

import sys
fieldmap_path = '/home/dev/subversion/trunk/pylons/web/web/lib' 
sys.path.append( fieldmap_path )
from fieldmap import *

from schemautils import write_field, write_copyfield, write_start_marker, write_end_marker, \
                        write_section_heading

#--------------------------------------------------------------------------------------------------

def write_required_fields(): #{ -- curly brace is a cheat to help with jumping to matching brace

  print ''
  write_section_heading( 'required' )
  print ''

  write_field( name="id", type="string", indexed="true", stored="true", required="true" ) 

  write_field( name="sid", type="tint", indexed="true", stored="true", required="true", \
               comment = 'short id' )

  print ''

  write_field( name=get_uuid_fieldname(), 
               type="string", indexed="true", stored="true", required="true" ) 

  write_field( name=get_uri_fieldname(), 
               type="string", indexed="true", stored="true", required="true" ) 

  write_field( name=get_id_fieldname(), 
               type="string", indexed="true", stored="true", required="true", 
               comment = 'work_id' )

  write_field( name=get_integer_id_fieldname(), 
               type="string", indexed="true", stored="true", required="true" ) 
  
# End of write_required_fields
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_optional_fields( called_from = 'works' ): #{

  if called_from == 'all':
    heading_text = 'works'
  else:
    heading_text = 'optional'
  #endif

  write_section_heading( heading_text )

  if called_from == 'all':  # integer ID is not a required field in 'all'; add to optional section
    write_field( name=get_integer_id_fieldname(), 
                 type="string", indexed="true", stored="true", required="false" ) 
  #endif

  write_field( name="rdf:type", type="string", indexed="false", stored="true" ) 
  
  write_field( name=get_original_calendar_fieldname(), 
               type="text", indexed="true", stored="true" ) 
  
  write_field( name=get_date_as_marked_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name="started_date_sort", type="date", indexed="true", stored="true" ) 

  write_field( name="started_date_gregorian_sort", type="date", indexed="true", stored="true" ) 
  
  write_field( name=get_start_year_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_start_month_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_start_day_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_date_inferred_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_date_uncertain_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_date_approx_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 
  
  write_field( name=get_end_year_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_end_month_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_end_day_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_date_range_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 
  
  write_field( name=get_author_as_marked_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name=get_author_inferred_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_author_uncertain_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 
  
  write_field( name=get_addressee_as_marked_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name=get_addressee_inferred_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_addressee_uncertain_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 
  
  write_field( name=get_destination_as_marked_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name=get_destination_inferred_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_destination_uncertain_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 
  
  write_field( name=get_origin_as_marked_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name=get_origin_inferred_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_origin_uncertain_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 
  
  write_field( name=get_work_description_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name=get_abstract_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name=get_keywords_fieldname(), 
               type="text", indexed="true", stored="true" ) 
  
  write_field( name=get_incipit_fieldname(), 
               type="text", indexed="true", stored="true" ) #    

  write_field( name=get_excipit_fieldname(), 
               type="text", indexed="true", stored="true" ) #    

  write_field( name=get_postscript_fieldname(), 
               type="text", indexed="true", stored="true" ) 
  
  write_field( name=get_language_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name=get_is_translation_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_catalogue_fieldname(), 
               type="string", indexed="true", stored="true", required="false" ) 

  write_field( name=get_source_of_data_fieldname(), 
               type="string", indexed="false", stored="true", 
               comment = 'accession_code' )

  if called_from != 'all': #{
    write_field( name=get_date_added_fieldname(), 
                 type="tdate", indexed="true", stored="true" ) 

    write_field( name=get_date_created_fieldname(), 
                 type="tdate", indexed="true", stored="true", 
                 comment = 'creation_timestamp' )

    write_field( name=get_date_changed_fieldname(), 
                 type="tdate", indexed="true", stored="true", 
                 comment = 'change_timestamp' )

    write_field( name=get_changed_by_user_fieldname(), 
                 type="string", indexed="false", stored="true", 
                 comment = 'change_user' )
  #}

# End of write_optional_fields
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_relations( called_from = 'works' ): #{ -- curly brace helps with jumping to matching brace!

  print ''
  print ''
  write_section_heading( 'Links from works' )
  print ''

  write_field( name=get_author_uri_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-created' )

  write_field( name=get_relations_to_manifestation_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-is_manifestation_of' )

  write_field( name=get_relations_to_resource_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-is_related_to' )

  write_field( name=get_relations_to_comments_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to' )

  write_field( name=get_relations_to_comments_on_addressee_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to_addressee' )

  write_field( name=get_relations_to_comments_on_author_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to_author' )

  write_field( name=get_relations_to_comments_on_date_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to_date' )

  write_field( name=get_comments_on_people_mentioned_in_work_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to_people_mentioned_in_work' )

  write_field( name=get_addressee_uri_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-was_addressed_to' )

  write_field( name=get_origin_uri_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-was_sent_from' )

  write_field( name=get_destination_uri_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-was_sent_to' )

  write_field( name=get_reply_to_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-is_reply_to' )

  write_field( name=get_answered_by_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-is_reply_to' )

  write_field( name=get_matches_fieldname(),
               type="string", indexed="true", stored="true", multiValued="true",
               comment = 'type-matches' )

  write_field( name=get_relations_to_people_mentioned_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-mentions' )

  write_field( name=get_relations_to_places_mentioned_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-mentions_place' )

  write_field( name=get_relations_to_works_mentioned_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-mentions_work' )

  if called_from != 'all': #{
    write_field( name=get_works_in_which_mentioned_fieldname(), 
                 type="string", indexed="true", stored="true", multiValued="true", 
                 comment = ' type-mentions_work ' )
  #}
  
  write_end_marker( 'links from works' )

# End of 'write_relations'
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_copies_of_relations(): #{ -- curly brace is there to help with jumping to matching brace

  print ''
  print ''
  write_section_heading( 'relations copies' )
  print ''

  write_field( name="people", type="string", indexed="true", stored="true", multiValued="true") 
  write_field( name="locations", type="string", indexed="true", stored="true", multiValued="true") 
  write_field( name="comments", type="string", indexed="true", stored="true", multiValued="true") 
  write_field( name="manifestations", type="string", indexed="true", stored="true", multiValued="true") 
  write_field( name="resources", type="string", indexed="true", stored="true", multiValued="true") 
  
# End of write_copies_of_relations
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_sortfields():  #{

  print ''
  print ''
  write_section_heading( 'relations - key fields for sort' )
  print ''
  write_field( name="author_sort", type="string", indexed="true", stored="true" ) 
  write_field( name="recipient_sort", type="string", indexed="true", stored="true") 
  write_field( name="origin_sort", type="string", indexed="true", stored="true") 
  write_field( name="destination_sort", type="string", indexed="true", stored="true") 

#}
#--------------------------------------------------------------------------------------------------

def write_fields_from_other_objs():  #{

  print ''
  print ''
  write_section_heading( 'Additional properties from other objects' )
  write_section_heading( 'Note that "stored" is "false" for most of these.' )
  print ''

  write_field( name=get_manif_has_image_fieldname(), 
               type="boolean", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_manif_doc_type_fieldname(), 
               type="string", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_manif_shelfmark_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_printed_edition_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_non_letter_enclosures_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_enclosed_fieldname(), 
               type="boolean", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_with_enclosure_fieldname(), 
               type="boolean", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_seal_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_paper_size_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_paper_type_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_numpages_fieldname(), 
               type="tint", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_postage_mark_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_endorsements_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_manif_repository_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true" ) 

  write_field( name=get_person_with_author_role_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_person_with_addressee_role_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true") #    

  write_field( name=get_details_of_agent_mentioned_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true") #    

  write_field( name=get_author_gender_fieldname(), 
               type="string", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_addressee_gender_fieldname(), 
               type="string", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_person_mentioned_gender_fieldname(), 
               type="string", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_author_is_org_fieldname(), 
               type="boolean", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_addressee_is_org_fieldname(), 
               type="boolean", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_agent_mentioned_is_org_fieldname(), 
               type="boolean", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_author_roles_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_addressee_roles_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_agent_mentioned_roles_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_placename_of_origin_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true") 

  write_field( name=get_placename_of_destination_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true")    

  write_field( name=get_placename_mentioned_fieldname(), 
               type="text", indexed="true", stored="false", multiValued="true")    

  write_field( name=get_transcription_url_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true") 

#}
#--------------------------------------------------------------------------------------------------

def write_additional():  #{

  print ''
  print ''
  write_section_heading( 'additional' ) 
  print ''

  write_field( name="timestamp_indexed", type="date", indexed="true", stored="true", 
               multiValued="false", default="NOW" ) 

  write_field( name="object_type", type="string", indexed="true", stored="true", required="true", 
               default="work" ) 
  
  write_field( name="default_search_field", type="text", indexed="true", stored="false", 
               multiValued="true") 

#}
#--------------------------------------------------------------------------------------------------

def write_basic_copyfields():  #{

  write_section_heading( '<copyField source="SOURCE" dest="DEST"/>' )

  write_copyfield( source=get_uuid_fieldname(), dest="id" )
  
  print ''

  write_copyfield( source=get_date_as_marked_fieldname(),        dest="default_search_field" )
  write_copyfield( source=get_author_as_marked_fieldname(),      dest="default_search_field" )
  write_copyfield( source=get_addressee_as_marked_fieldname(),   dest="default_search_field" )
  write_copyfield( source=get_destination_as_marked_fieldname(), dest="default_search_field" )
  write_copyfield( source=get_origin_as_marked_fieldname(),      dest="default_search_field" )
  write_copyfield( source=get_work_description_fieldname(),      dest="default_search_field" )
  write_copyfield( source=get_abstract_fieldname(),              dest="default_search_field" )
  write_copyfield( source=get_keywords_fieldname(),              dest="default_search_field" )
  write_copyfield( source=get_incipit_fieldname(),               dest="default_search_field" )
  write_copyfield( source=get_excipit_fieldname(),               dest="default_search_field" )
  write_copyfield( source=get_postscript_fieldname(),            dest="default_search_field" )
#}
#--------------------------------------------------------------------------------------------------

def write_copyfields_for_facets(): #{

  print ''
  print ''
  write_section_heading( 'copy relations so we can facet them together' )
  print ''

  write_copyfield( source=get_author_uri_fieldname(),    dest="people"  )
  write_copyfield( source=get_addressee_uri_fieldname(), dest="people"  )
  print ''

  write_copyfield( source=get_relations_to_manifestation_fieldname(), dest="manifestations"  )

  write_copyfield( source=get_relations_to_resource_fieldname(), dest="resources"  )

  write_copyfield( source=get_relations_to_comments_fieldname(),              dest="comments"  )
  write_copyfield( source=get_relations_to_comments_on_addressee_fieldname(), dest="comments"  )
  write_copyfield( source=get_relations_to_comments_on_author_fieldname(),    dest="comments"  )
  write_copyfield( source=get_relations_to_comments_on_date_fieldname(),      dest="comments"  )
 
  write_copyfield( source=get_origin_uri_fieldname(),      dest="locations"  )
  write_copyfield( source=get_destination_uri_fieldname(), dest="locations"  )
  
  print ''

# End of write_copyfields_for_facets
#}
#----------------------------------------------------------------------------------------------

def write_copyfields( called_from = 'works' ): #{

  if called_from == 'all':
    write_section_heading( 'Work copyFields' )
  write_basic_copyfields()

  if called_from != 'all':  #{
    write_copyfields_for_facets()
  #}

# End of write_copyfields
#}
#----------------------------------------------------------------------------------------------

def write_mainfields(): #{ -- curly brace is a cheat to help with jumping to matching brace

  write_start_marker( 'works' )

  write_required_fields()

  write_optional_fields()

  write_relations()

  write_copies_of_relations()

  write_sortfields()
  
  write_fields_from_other_objs()

  write_additional()

  write_end_marker( 'works' )

# End of write_mainfields
#}  -- curly brace is a cheat to help with jumping to matching brace
#----------------------------------------------------------------------------------------------

if __name__ == '__main__':

  myself = sys.argv[0]
  print '<!-- Auto-generated by ' + myself + ' -->'
  if len( sys.argv ) > 1:
    parm = sys.argv[1]
    if parm.upper() == 'M':
      write_mainfields()
    elif parm.upper() == 'C':
      write_copyfields()
    else:
      print 'Unknown argument: "' + parm + '". Expected M for main fields or C for copy fields.'
  else:
    write_mainfields()
    write_copyfields()
#endif

#----------------------------------------------------------------------------------------------
