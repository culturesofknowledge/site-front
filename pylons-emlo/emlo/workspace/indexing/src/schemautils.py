# -*- coding: utf-8 -*-
'''
Created on 21st July 2011

@author: Sushila Burgess

This script has functions for writing out, e.g., one line of a schema.xml file.
'''

#--------------------------------------------------------------------------------------------------

def write_field( name, type, indexed, stored, \
                 required = '', multiValued = '', default = '', comment = '' ): #{
  req = ''
  mv = ''
  df = ''
  cm = ''

  if required != '':
    req = ' required="' + required + '" '
  #endif

  if multiValued != '':
    mv = ' multiValued="' + multiValued + '" '
  #endif

  if default != '':
    df = ' default="' + default + '" '
  #endif

  if comment != '':
    cm = ' <!-- ' + comment + ' -->'
  #endif

  output_string = '  <field name="' + name + '"  type="' + type + '"  indexed="' + indexed + '" ' \
                + ' stored="' + stored + '" ' + req + mv + df + ' />' + cm
  print output_string

#}
#--------------------------------------------------------------------------------------------------

def write_copyfield( source, dest ):  #{

  print '  <copyField source="' + source + '" dest="' + dest + '"/>'

#}
#--------------------------------------------------------------------------------------------------

def write_start_marker( text_to_write ):  #{

  print ''
  print ''
  print '<!-- start CofK: ' + text_to_write + ' -->'
  print ''

#}
#--------------------------------------------------------------------------------------------------

def write_end_marker( text_to_write ):  #{

  print ''
  print '<!-- end CofK: ' + text_to_write + ' -->'
  print ''
  print ''

#}
#--------------------------------------------------------------------------------------------------

def write_section_heading( heading_text = '?' ): #{

  spaces = ' '.ljust( len(heading_text) )

  print '<!-- ' + spaces       + ' -->'
  print '<!-- ' + heading_text + ' -->'
  print '<!-- ' + spaces       + ' --> '
#}
#--------------------------------------------------------------------------------------------------
