# -*- coding: utf-8 -*-
'''
Created on 22nd July 2011

@author: Sushila Burgess

This script writes out a schema.xml file for the 'resources' Solr core.
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
               comment = 'resource_id' )
  
# End of write_required_fields
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_optional_fields( called_from = 'resources' ): #{

  if called_from == 'all':
    heading_text = 'resources'
  else:
    heading_text = 'optional'
  #endif

  write_section_heading( heading_text )
  
  if called_from == 'all':
    title_required = "false"
  else:
    title_required = "true"

  write_field( name=get_resource_title_fieldname(),
               type="text", indexed="true", stored="true", required = title_required,
               comment = "resource_name" ) 

  if called_from != 'all': #{
    write_field( name="rdf:type", type="string", indexed="false", stored="true" ) 
  #}

  
  write_field( name=get_resource_details_fieldname(), 
               type="text", indexed="true", stored="true",
               comment = 'resource_details' ) 

  write_field( name=get_resource_url_fieldname(), 
               type="text", indexed="true", stored="true", 
               comment = 'resource_url' ) 

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

def write_relations( called_from = 'resources' ): #{ -- curly brace helps with jumping to matching brace!

  print ''
  print ''
  write_section_heading( 'Links from resources' )
  print ''

  write_field( name=get_related_works_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-is_related_to' )
  
  write_field( name=get_related_people_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-is_related_to' )
  
  write_field( name=get_related_places_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-is_related_to' )

  write_end_marker( 'links from resources' )
  
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
               default="resource" ) 
  
  write_field( name="default_search_field", type="text", indexed="true", stored="false", 
               multiValued="true" ) 

#}
#--------------------------------------------------------------------------------------------------

def write_copyfields( called_from = 'resources' ): #{

  if called_from == 'all':
    write_section_heading( 'resources copyFields' )
  write_section_heading( '<copyField source="SOURCE" dest="DEST"/>' )

  if called_from != 'all':
    write_copyfield( source=get_uuid_fieldname(), dest="id" )
  
  print ''

  write_copyfield( source=get_resource_title_fieldname(),   dest="default_search_field" )
  write_copyfield( source=get_resource_details_fieldname(), dest="default_search_field" )
  
  print ''
#}
#--------------------------------------------------------------------------------------------------

def write_mainfields(): #{ -- curly brace is a cheat to help with jumping to matching brace

  write_start_marker( 'resources' )

  write_required_fields()

  write_optional_fields()

  write_relations()

  write_additional()

  write_end_marker( 'resources' )

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