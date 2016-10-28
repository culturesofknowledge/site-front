# -*- coding: utf-8 -*-
'''
Created on 25th July 2011

@author: Sushila Burgess

This script writes out a schema.xml file for the 'person' Solr core.
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
               comment = 'person_id' )

  write_field( name=get_integer_id_fieldname(), 
               type="string", indexed="true", stored="true", required="true" ) 
  
# End of write_required_fields
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_optional_fields( called_from = 'people' ): #{

  if called_from == 'all':
    heading_text = 'people'
  else:
    heading_text = 'optional'
  #endif

  write_section_heading( heading_text )

  write_field( name=get_person_name_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  if called_from != 'all': #{
    write_field( name=get_person_name_first_letter_fieldname(), 
                 type="bucketFirstLetter", indexed="true", stored="true" ) 

    write_field( name="rdf:type", type="string", indexed="false", stored="true" ) 
  #}

  write_field( name=get_alias_fieldname(), 
               type="string", indexed="true", stored="true" ) 

  write_field( name=get_person_titles_or_roles_fieldname(), 
               type="string", indexed="true", stored="true", comment="person_aliases" ) 

  write_field( name=get_person_further_reading_fieldname(), 
               type="string", indexed="false", stored="true" ) 

  print ''
  print '<!-- date of birth -->'

  write_field( name=get_birth_year_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_birth_month_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_birth_day_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_birth_date_inferred_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_birth_date_uncertain_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_birth_date_approx_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name="date_of_birth_sort", 
               type="tdate", indexed="true", stored="true" ) 

  print ''
  print '<!-- date of death -->'

  write_field( name=get_death_year_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_death_month_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_death_day_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_death_date_inferred_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_death_date_uncertain_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_death_date_approx_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name="date_of_death_sort", 
               type="tdate", indexed="true", stored="true" ) 

  print ''

  write_field( name=get_gender_fieldname(), 
               type="string", indexed="true", stored="true", default="unknown" ) 

  write_field( name=get_is_organisation_fieldname(), 
               type="boolean", indexed="true", stored="true", default="false" ) 

  write_field( name=get_total_works_written_by_agent_fieldname(), 
               type="int", indexed="false", stored="true" ) 

  write_field( name=get_total_works_recd_by_agent_fieldname(), 
               type="int", indexed="false", stored="true" ) 

  write_field( name=get_total_works_mentioning_agent_fieldname(), 
               type="int", indexed="false", stored="true" ) 

  if called_from != 'all': #{
    write_field( name=get_date_added_fieldname(), 
                 type="tdate", indexed="true", stored="true" ) 

    write_field( name=get_date_created_fieldname(), 
                 type="tdate", indexed="true", stored="true", comment="creation_timestamp" ) 

    write_field( name=get_date_changed_fieldname(), 
                 type="tdate", indexed="true", stored="true", comment="change_timestamp" ) 

    write_field( name=get_changed_by_user_fieldname(), 
                 type="string", indexed="false", stored="true", 
                 comment = 'change_user' )
  #}

# End of write_optional_fields
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_relations( called_from = 'people' ): #{ -- curly brace helps with jumping to matching brace!

  print ''
  print ''
  write_section_heading( 'Links from people' )
  print ''

  write_field( name=get_works_created_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-created' )

  write_field( name=get_place_where_born_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="false", 
               comment = 'type-was_born_in_location' )

  write_field( name=get_place_where_died_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="false" )

  write_field( name=get_place_visited_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true" )

  write_field( name=get_is_parent_of_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-parent_of' )

  write_field( name=get_is_child_of_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-child_of' )

  write_field( name=get_is_spouse_of_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-spouse_of' )

  write_field( name=get_is_sibling_of_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-sibling_of' )

  write_field( name=get_is_relative_of_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-sibling_of' )

  write_field( name=get_unspecified_relationship_with_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true" )

  if called_from != 'all': #{
    write_field( name=get_relations_to_resource_fieldname(), 
                 type="string", indexed="true", stored="true", multiValued="true", 
                 comment = 'type-is_related_to' )
  #}

  write_field( name=get_orgs_of_which_member_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-member_of' )

  write_field( name=get_members_of_org_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-member_of' )

  if called_from != 'all': #{
    write_field( name=get_relations_to_comments_fieldname(), 
                 type="string", indexed="true", stored="true", multiValued="true", 
                 comment = 'type-refers_to' )
  #}

  write_field( name=get_letters_received_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-was_addressed_to' )

  write_field( name=get_works_in_which_mentioned_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-mentions' )

  write_field( name=get_handwrote_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-handwrote' )

  write_field( name=get_manifs_owned_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-formerly_owned' )

  write_end_marker( 'links from people' )

# End of 'write_relations'
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

def write_additional():  #{

  print ''
  print ''
  write_section_heading( 'additional' ) 
  print ''

  write_field( name="timestamp_indexed", type="tdate", indexed="true", stored="true", 
               multiValued="false", default="NOW" ) 

  write_field( name="object_type", type="string", indexed="false", stored="true", required="true", 
               default="person" ) 
  
  write_field( name="default_search_field", type="text", indexed="true", stored="false", 
               multiValued="true") 

  write_field( name="browse", type="alphaOnlySort", indexed="true", stored="false", 
               multiValued="false") 

  write_field( name="name-strict", type="text_ws", indexed="true", stored="true" ) 

#}
#--------------------------------------------------------------------------------------------------

def write_copyfields( called_from = 'people' ): #{

  if called_from == 'all':
    write_section_heading( 'person copyFields' )

  write_section_heading( '<copyField source="SOURCE" dest="DEST"/>' )

  if called_from != 'all':
    write_copyfield( source=get_uuid_fieldname(), dest="id" )
  
  print ''

  write_copyfield( source=get_person_name_fieldname(),            dest="default_search_field" )
  write_copyfield( source=get_alias_fieldname(),                  dest="default_search_field" )
  write_copyfield( source=get_person_titles_or_roles_fieldname(), dest="default_search_field" )
  print ''

  if called_from != 'all': #{
    write_copyfield( source=get_person_name_fieldname(), dest="browse" )
    print ''

    write_copyfield( source=get_person_name_fieldname(), dest="name-strict" )
    print ''

    write_copyfield( source=get_person_name_fieldname(), 
                     dest=get_person_name_first_letter_fieldname() )
    print ''
  #}

# End of write_copyfields
#}
#----------------------------------------------------------------------------------------------

def write_mainfields(): #{ -- curly brace is a cheat to help with jumping to matching brace

  write_start_marker( 'people' )

  write_required_fields()

  write_optional_fields()

  write_relations()

  write_additional()

  write_end_marker( 'people' )

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
