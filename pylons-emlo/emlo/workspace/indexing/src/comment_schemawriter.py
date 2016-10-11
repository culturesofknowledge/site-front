# -*- coding: utf-8 -*-
'''
Created on 20th July 2011

@author: Sushila Burgess

This script writes out a schema.xml file for the 'comments' Solr core.
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
               comment = 'comment_id' )
  
# End of write_required_fields
#}  -- curly brace is a cheat to help with jumping to matching brace
#--------------------------------------------------------------------------------------------------

def write_optional_fields( called_from = 'comments' ): #{

  if called_from == 'all':
    heading_text = 'comments'
  else:
    heading_text = 'optional'
  #endif

  write_section_heading( heading_text )
  
  write_field( name=get_comments_fieldname(), 
               type="text", indexed="true", stored="true" ) 

  if called_from != 'all':
    write_field( name="rdf:type", type="string", indexed="false", stored="true" ) 
  
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

def write_relations( called_from = 'comments' ): #{ -- curly brace helps with jumping to matching brace!

  print ''
  print ''
  write_section_heading( 'Links from comments' )
  print ''

  write_field( name=get_work_commented_on_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to' )

  write_field( name=get_person_commented_on_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to' )

  write_field( name=get_place_commented_on_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to' )

  write_field( name=get_manifestation_commented_on_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to' )

  write_field( name=get_work_with_comment_on_addressee_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to_addressee' )

  write_field( name=get_work_with_comment_on_author_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to_author' )

  write_field( name=get_work_with_comment_on_date_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to_date' )

  write_field( name=get_manif_with_comment_on_date_fieldname(), 
               type="string", indexed="false", stored="true", multiValued="true", 
               comment = 'type-refers_to_date' )

  write_field( name=get_works_with_comments_on_people_mentioned_fieldname(), 
               type="string", indexed="true", stored="true", multiValued="true", 
               comment = 'type-refers_to_people_mentioned_in_work' )


  write_end_marker( 'links from comments' )
  
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
               default="comment" ) 
  
  write_field( name="default_search_field", type="text", indexed="true", stored="false", 
               multiValued="true") 

#}
#--------------------------------------------------------------------------------------------------

def write_copyfields( called_from = 'comments' ): #{

  if called_from == 'all':
    write_section_heading( 'Comments copyFields' )
  write_section_heading( '<copyField source="SOURCE" dest="DEST"/>' )

  if called_from != 'all':
    write_copyfield( source=get_uuid_fieldname(), dest="id" )
  
  print ''

  write_copyfield( source=get_comments_fieldname(), dest="default_search_field" )
#}
#--------------------------------------------------------------------------------------------------

def write_mainfields(): #{ -- curly brace is a cheat to help with jumping to matching brace

  write_start_marker( 'comments' )

  write_required_fields()

  write_optional_fields()

  write_relations()

  write_additional()

  write_end_marker( 'comments' )

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
