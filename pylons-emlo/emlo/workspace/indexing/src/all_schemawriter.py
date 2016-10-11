# -*- coding: utf-8 -*-
'''
Created on 21st July 2011

@author: Sushila Burgess

This script writes out a schema.xml file for the 'all' Solr core.
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

import work_schemawriter        as wk
import comment_schemawriter     as cm
import image_schemawriter       as img
import institution_schemawriter as inst
import location_schemawriter    as loc
import resource_schemawriter    as rsc
import person_schemawriter      as per
import manifestation_schemawriter as mf

#--------------------------------------------------------------------------------------------------

def write_required_fields(): #{ -- curly brace is a cheat to help with jumping to matching brace

  print ''
  write_section_heading( 'required  (across all objects)' ) 
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
               type="string", indexed="true", stored="true", required="true" )

  print ''
  write_field( name="object_type", type="string", indexed="true", stored="true", required="true" ) 
  print ''
  
# End of write_required_fields
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_additional():  #{

  print ''
  print ''
  write_section_heading( 'additional' ) 
  print ''

  write_field( name=get_date_added_fieldname(), 
               type="tdate", indexed="true", stored="true" ) 

  write_field( name=get_date_created_fieldname(), 
               type="tdate", indexed="true", stored="true", comment = 'creation_timestamp' )

  write_field( name=get_date_changed_fieldname(), 
               type="tdate", indexed="true", stored="true", comment = 'change_timestamp' )

  write_field( name=get_changed_by_user_fieldname(), 
               type="string", indexed="false", stored="true", 
               comment = 'change_user' )

  write_field( name="timestamp_indexed", type="date", indexed="true", stored="true", 
               multiValued="false", default="NOW" ) 

  write_field( name="default_search_field", type="text", indexed="true", stored="false", 
               multiValued="true") 
#}
#--------------------------------------------------------------------------------------------------

def write_copyfields(): #{ -- curly brace is a cheat to help with jumping to matching brace

  wk.write_copyfields( called_from = 'all' )
  cm.write_copyfields( called_from = 'all' )
  img.write_copyfields( called_from = 'all' )
  inst.write_copyfields( called_from = 'all' )
  loc.write_copyfields( called_from = 'all' )
  mf.write_copyfields( called_from = 'all' )
  per.write_copyfields( called_from = 'all' )
  rsc.write_copyfields( called_from = 'all' )

# End of write_copyfields
#}  -- curly brace is a cheat to help with jumping to matching brace
#----------------------------------------------------------------------------------------------

def write_mainfields(): #{ -- curly brace is a cheat to help with jumping to matching brace

  write_start_marker( 'Everything' )

  write_required_fields()

  wk.write_optional_fields( called_from = 'all' )
  wk.write_relations( called_from = 'all' )

  cm.write_optional_fields( called_from = 'all' )
  cm.write_relations( called_from = 'all' )

  img.write_optional_fields( called_from = 'all' )
  img.write_relations( called_from = 'all' )

  inst.write_optional_fields( called_from = 'all' )
  inst.write_relations( called_from = 'all' )

  loc.write_optional_fields( called_from = 'all' )
  loc.write_relations( called_from = 'all' )

  mf.write_optional_fields( called_from = 'all' )
  mf.write_relations( called_from = 'all' )

  per.write_optional_fields( called_from = 'all' )
  per.write_relations( called_from = 'all' )

  rsc.write_optional_fields( called_from = 'all' )
  rsc.write_relations( called_from = 'all' )

  write_additional()

  write_end_marker( 'all' )

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
