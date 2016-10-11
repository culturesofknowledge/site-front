# -*- coding: utf-8 -*-
'''
Created on 22nd July 2011

@author: Sushila Burgess

This script writes out a schema.xml file for the 'manifestations' Solr core.
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
               comment = 'manifestation_id' )

  write_field( name=get_manifestation_type_fieldname(), 
               type="string", indexed="true", stored="true", required="true", 
               comment = 'manifestation_type e.g. Draft, Scribal Copy' )
  
# End of write_required_fields
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_optional_fields( called_from = 'manifestations' ): #{

  if called_from == 'all':
    heading_text = 'manifestations'
  else:
    heading_text = 'optional'
  #endif

  write_section_heading( heading_text )
  
  if called_from != 'all':
    write_field( name="rdf:type", type="string", indexed="false", stored="true" ) 

  if called_from == 'all':
    write_field( name=get_manifestation_type_fieldname(), 
                 type="string", indexed="true", stored="true", required="false", 
                 comment = 'manifestation_type e.g. Draft, Scribal Copy' )
  
  write_field( name=get_shelfmark_fieldname(), 
               type="textTight", indexed="true", stored="true" ) 

  write_field( name=get_paper_size_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name=get_paper_type_fieldname(), 
               type="string", indexed="true", stored="true" ) 

  write_field( name=get_number_of_pages_of_document_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_number_of_pages_of_text_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_seal_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name=get_endorsements_fieldname(), 
               type="string", indexed="true", stored="true" ) 

  write_field( name=get_non_letter_enclosures_fieldname(), 
               type="string", indexed="true", stored="true" ) 

  write_field( name=get_postage_mark_fieldname(), 
               type="textTight", indexed="true", stored="true" ) 

  if called_from != 'all': #{
    write_field( name=get_original_calendar_fieldname(), 
                 type="string", indexed="true", stored="true" ) 
  #}

  write_field( name='creation_date_sort',
               type="tdate", indexed="true", stored="true" ) 

  write_field( name='creation_date_gregorian_sort',
               type="tdate", indexed="true", stored="true" ) 

  write_field( name=get_creation_date_year_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_creation_date_month_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_creation_date_day_fieldname(), 
               type="tint", indexed="true", stored="true" ) 

  write_field( name=get_creation_date_inferred_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_creation_date_uncertain_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  write_field( name=get_creation_date_approx_fieldname(), 
               type="boolean", indexed="true", stored="true" ) 

  if called_from != 'all': #{
    write_field( name=get_is_translation_fieldname(), 
                 type="boolean", indexed="true", stored="true" ) 

    write_field( name=get_language_fieldname(), 
                 type="text", indexed="true", stored="true", multiValued="true" ) 
  #}

  write_field( name=get_manifestation_address_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  write_field( name=get_printed_edition_details_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  if called_from != 'all': #{
    write_field( name=get_incipit_fieldname(), 
                 type="text", indexed="true", stored="true" ) 

    write_field( name=get_excipit_fieldname(), 
                 type="text", indexed="true", stored="true" ) 

    write_field( name=get_postscript_fieldname(), 
                 type="text", indexed="true", stored="true" ) 

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

def write_relations( called_from = 'manifestations' ): #{ -- curly brace helps with jumping to matching brace!

  print ''
  print ''
  write_section_heading( 'Links from manifestations' )
  print ''

  write_field( name=get_enclosing_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-enclosed_in' )
  
  write_field( name=get_enclosed_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-enclosed_in' )
  
  write_field( name=get_relations_to_image_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-image_of' )

  write_field( name=get_relations_to_work_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-is_manifestation_of' )

  write_field( name=get_repository_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-stored_in' )

  write_field( name=get_handwritten_by_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-handwrote' )

  if called_from != 'all': #{
    write_field( name=get_relations_to_comments_fieldname(), 
                 type="string", indexed="true", stored="true", multiValued="true", 
                 comment = 'type-refers_to' )

    write_field( name=get_relations_to_comments_on_date_fieldname(), 
                 type="string", indexed="true", stored="true", multiValued="true", 
                 comment = 'type-refers_to_date' )

  #}

  write_field( name=get_former_owner_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-formerly_owned' )

  write_end_marker( 'links from manifestations' )

# End of 'write_relations'
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_additional():  #{

  print ''
  print ''
  write_section_heading( 'additional' ) 
  print ''

  write_field( name="timestamp_indexed", type="tdate", indexed="true", stored="true", 
               multiValued="false", default="NOW" ) 

  write_field( name="object_type", type="string", indexed="true", stored="true", required="true", 
               default="manifestation" ) 

  write_field( name="default_search_field", type="text", indexed="true", stored="false", 
               multiValued="true" ) 

#}
#--------------------------------------------------------------------------------------------------

def write_copyfields( called_from = 'manifestations' ): #{

  if called_from == 'all':
    write_section_heading( 'manifestations copyFields' )
  write_section_heading( '<copyField source="SOURCE" dest="DEST"/>' )

  if called_from != 'all':
    write_copyfield( source=get_uuid_fieldname(), dest="id" )
  
  print ''

  write_copyfield( source=get_manifestation_type_fieldname(),    dest="default_search_field" )
  write_copyfield( source=get_seal_fieldname(),                  dest="default_search_field" )
  write_copyfield( source=get_postage_mark_fieldname(),          dest="default_search_field" )
  write_copyfield( source=get_manifestation_address_fieldname(), dest="default_search_field" )
  write_copyfield( source=get_incipit_fieldname(),               dest="default_search_field" )
  write_copyfield( source=get_excipit_fieldname(),               dest="default_search_field" )
  write_copyfield( source=get_postscript_fieldname(),            dest="default_search_field" )
  write_copyfield( source=get_shelfmark_fieldname(),             dest="default_search_field" )
#}
#--------------------------------------------------------------------------------------------------

def write_mainfields(): #{ -- curly brace is a cheat to help with jumping to matching brace

  write_start_marker( 'manifestations' )

  write_required_fields()

  write_optional_fields()

  write_relations()

  write_additional()

  write_end_marker( 'manifestations' )

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
