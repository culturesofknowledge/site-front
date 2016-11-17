# -*- coding: utf-8 -*-
'''
Created on 25 Aug 2010

@author: Matthew Wilcoxson
'''

import sys
import time

# These two lines are hacks. They switch the default encoding to utf8 so that the command line will convert UTF8 + Ascii to UTF8
reload(sys)
sys.setdefaultencoding("utf8")

import solr
import solrconfig

# The 'fieldmap' module passes back the fieldname as a string.
# By using functions from 'fieldmap', we can restrict fieldnames to being hard-coded in only 
# ONE place, allowing much easier changes if a better ontology is found. (SB, 25 Aug 2011)

web_lib_path = '../../../pylons/web/web/lib' 
sys.path.append( web_lib_path )
import fieldmap as f
from helpers import escape_colons

# We'll need the following strings again and again, so may as well make them global, I think.
# Convert ':' to '\:' for use in a Solr query
escaped_uri_fieldname = escape_colons( f.get_uri_fieldname())
escaped_uri_prefix = escape_colons( f.get_uri_value_prefix())
join_with_or = " OR " + escaped_uri_prefix

#================================================================

# Add sort terms to works
# - Get all the works.
# - Find the authors, recipients, origins and destinations of the work
# - Add each name to the work.

def find_uri( list, uri ): #{
  uri_new = f.get_uri_value_prefix() + uri
  for item in list : #{
    if item[ f.get_uri_fieldname() ] == uri_new : #{
      return item
    #}
  #}
  return None
#}

#================================================================

def has_all_keys( dictionary, keys ): #{
  for key in keys: #{
    if not dictionary.has_key( key ) : #{
      return False
    #}
  #}
  return True
#}
#================================================================

def add_additional( dict_to_be_expanded, key, value ): #{

  #===
  # The dictionary is keyed on fieldnames such as 'author_sort'.
  # If it does not already have a particular key, e.g. 'author_sort', then when you pass in a string,
  # the STRING can become the value of that key.

  # However, if the dictionary already has that key, then you must convert the value of the key
  # into a LIST, and append your string to that list.
  #===

  if dict_to_be_expanded.has_key( key ) : #{  # the fieldname is already in the dictionary

    # Get the value for this existing key from the dictionary
    currentitem = dict_to_be_expanded[ key ]

    # If the existing value is already a list, you can simply append your new value to it.
    if isinstance( currentitem, list) :
      dict_to_be_expanded[ key ].append( value )

    # If the existing value is a single string or something, convert to a list, then append the new value.
    else : #{
      newlist = []
      newlist.append( currentitem )
      newlist.append( value )
      
      dict_to_be_expanded[ key ] = newlist
    #}
  #}

  else :
    # Fieldname is not yet in dictionary, so a simple value, e.g. a string, can become value of key.
    dict_to_be_expanded[ key ] = value
#}
#================================================================
    
def add_additional_with_check( lst_to, key_to, lst_from, key_from ): #{

  value = lst_from.get( key_from, None )
  if value and value != '' : #{
    add_additional( lst_to, key_to, value )
    return True
  #}
  return False
#}
#================================================================
    
def AdditionalWorksData() : #{

  uri_fieldname = f.get_uri_fieldname()

  people_author_additional = [ f.get_person_with_author_role_fieldname(),
                               f.get_author_gender_fieldname(),
                               f.get_author_is_org_fieldname(), 
                               f.get_author_roles_fieldname(),
                             ]

  people_recipient_additional = [ f.get_person_with_addressee_role_fieldname(),
                                  f.get_addressee_gender_fieldname(),
                                  f.get_addressee_is_org_fieldname(), 
                                  f.get_addressee_roles_fieldname(),
                                ]

  people_mentioned_additional = [ f.get_details_of_agent_mentioned_fieldname(),
                                  f.get_person_mentioned_gender_fieldname(),
                                  f.get_agent_mentioned_is_org_fieldname(), 
                                  f.get_agent_mentioned_roles_fieldname(),
                                ]

  location_origin_additional = [ f.get_placename_of_origin_fieldname(),
                                 f.get_alternate_placename_of_origin_fieldname() ]

  location_destination_additional = [ f.get_placename_of_destination_fieldname(),
                                      f.get_alternate_placename_of_destination_fieldname() ]

  location_mentioned_additional = [ f.get_placename_mentioned_fieldname(),
                                    f.get_alternate_placename_mentioned_fieldname() ]
  
  resource_additional = [ f.get_resource_url_fieldname(),
                          f.get_resource_title_fieldname() ]

  start = 0
  batch = 200
  
  solr_works = solr.SolrConnection( solrconfig.solr_urls_stage['works'], persistent=True )
  works = solr_works.query( "*:*", fields="*", start=start, rows=batch, score=False)
  
  total = works.numFound;
  
  print "Updating " + str(total) + " works with links"
  print "Working . ",
  
  updated_count = 0
  error_count = 0
  error_uris = set()
  
  solr_people         = solr.SolrConnection( solrconfig.solr_urls_stage['people'],         persistent=True )
  solr_locations      = solr.SolrConnection( solrconfig.solr_urls_stage['locations'],      persistent=True )
  solr_manifestations = solr.SolrConnection( solrconfig.solr_urls_stage['manifestations'], persistent=True )
  solr_institutions   = solr.SolrConnection( solrconfig.solr_urls_stage['institutions'],   persistent=True )
  solr_resources      = solr.SolrConnection( solrconfig.solr_urls_stage['resources'],      persistent=True )
  
  while start < total : #{
    
    print str(updated_count) + ":" + str(start),
    time.sleep(0.01)  # 0.1 * (100'000/200) = 10 seconds...
    
    people = set()
    locations = set()
    manifestations = set()
    institutions = set()
    resources = set()

    #---- Loop through details of one work skimming off the URIs of authors, destinations, etc.
    for result in works.results : #{

      if result.has_key( f.get_author_uri_fieldname() ) : #{
        
        if not has_all_keys( result, people_author_additional ) : #{
          for person in result[ f.get_author_uri_fieldname() ] : #{
            people.add( person )
          #}
        #}
      #}
        
      if result.has_key( f.get_addressee_uri_fieldname() ) : #{
        
        if not has_all_keys( result, people_recipient_additional ) : #{
          for person in result[ f.get_addressee_uri_fieldname() ] : #{
            people.add( person )
          #}
        #}
      #}
        
      if result.has_key( f.get_relations_to_people_mentioned_fieldname() ) : #{
        
        if not has_all_keys( result, people_mentioned_additional ) : #{
          for person in result[ f.get_relations_to_people_mentioned_fieldname() ] : #{
            people.add( person )
          #}
        #}
      #}
        
      if result.has_key( f.get_origin_uri_fieldname() ) : #{
        
        if not has_all_keys( result, location_origin_additional ) : #{
          for location in result[ f.get_origin_uri_fieldname() ] : #{
            locations.add( location )
          #}
        #}
        elif not result.has_key('origin_sort') : #{
          locations.add( result[ f.get_origin_uri_fieldname() ][0] )
        #}
      #}
   
      if result.has_key( f.get_destination_uri_fieldname() ) : #{
        
        if not has_all_keys( result, location_destination_additional ) : #{
          for location in result[ f.get_destination_uri_fieldname() ] : #{
            locations.add( location )
          #}
        #}
        elif not result.has_key('destination_sort') : #{
          locations.add( result[ f.get_destination_uri_fieldname() ][0] )
        #}
      #}
   
      if result.has_key( f.get_relations_to_places_mentioned_fieldname() ) : #{
        
        if not has_all_keys( result, location_mentioned_additional ) : #{
          for location in result[ f.get_relations_to_places_mentioned_fieldname() ] : #{
            locations.add( location )
          #}
        #}
      #}
   
      if result.has_key( f.get_relations_to_resource_fieldname() ) : #{
        
        if not has_all_keys( result, resource_additional ) : #{
          for resource in result[ f.get_relations_to_resource_fieldname() ] : #{
            resources.add( resource )
          #}
        #}
      #}
        
      if result.has_key( f.get_relations_to_manifestation_fieldname() ) : #{
        for man in result[ f.get_relations_to_manifestation_fieldname() ] : #{
          manifestations.add( man )
        #}
      #}
    #}  ## End loop through details of one work, skimming off URIs of authors etc.

    #------------------------------------------------------------------------------------
    # Get further details of people, places, resources, manifestations and repositories

    if len( people ) > 0 : #{

      field_list = [ uri_fieldname,
                     f.get_person_name_fieldname(),
                     f.get_alias_fieldname(),
                     f.get_person_titles_or_roles_fieldname(),
                     f.get_gender_fieldname(),
                     f.get_is_organisation_fieldname() ]

      people = get_details_from_uri_list( solr_people, people, field_list )
    #}
       
    if len( locations ) > 0 : #{

      field_list = [ uri_fieldname,
                     f.get_location_synonyms_fieldname(),
                     f.get_location_name_fieldname() ]

      locations = get_details_from_uri_list( solr_locations, locations, field_list )
    #}
       
    if len( resources ) > 0 : #{

      field_list = [ uri_fieldname,
                     f.get_resource_url_fieldname(),
                     f.get_resource_title_fieldname() ]

      resources = get_details_from_uri_list( solr_resources, resources, field_list )
    #}
       
    if len( manifestations ) > 0 : #{

      field_list = [ uri_fieldname,
                     f.get_relations_to_image_fieldname(),
                     f.get_manifestation_type_fieldname(),
                     f.get_shelfmark_fieldname(), 
                     f.get_printed_edition_details_fieldname(),
                     f.get_non_letter_enclosures_fieldname(),
                     f.get_enclosing_fieldname(), 
                     f.get_enclosed_fieldname(),
                     f.get_paper_size_fieldname(),
                     f.get_paper_type_fieldname(),
                     f.get_seal_fieldname(), 
                     f.get_number_of_pages_of_document_fieldname(),
                     f.get_postage_mark_fieldname(),
                     f.get_endorsements_fieldname(),
                     f.get_repository_fieldname(),
                     f.get_id_fieldname( object_type = 'manifestation' )
                   ]

      manifestations = get_details_from_uri_list( solr_manifestations, manifestations, field_list )
    
      for man in manifestations : #{
        if man.has_key( f.get_repository_fieldname() ) : #{
          for ins in man[ f.get_repository_fieldname() ]: #{
            institutions.add( ins )
          #}
        #}
      #}
            
      if len( institutions ) > 0 : #{

        field_list = [ uri_fieldname,
                       f.get_repository_name_fieldname(),
                       f.get_repository_alternate_name_fieldname(), 
                       f.get_repository_city_fieldname(),
                       f.get_repository_alternate_city_fieldname(),
                       f.get_repository_country_fieldname(),
                       f.get_repository_alternate_country_fieldname(), 
                     ]

        institutions = get_details_from_uri_list( solr_institutions, institutions, field_list )
      #}
    #}

    # Finished getting further details of people, places, resources, manifestations and repositories
    #------------------------------------------------------------------------------------
    # Now add the details gathered into 'works' data  
    #------------------------------------------------------------------------------------
    
    works_update = []
    for result in works.results : #{
      updated = {}
      changed = False
      
      # Add manifestation additionals
      if( result.has_key( f.get_relations_to_manifestation_fieldname() ) ) : #{
        for man_uri in result[ f.get_relations_to_manifestation_fieldname() ] : #{
          man = find_uri( manifestations.results, man_uri )

          if man == None :
            error_count += 1

          else : #{
            # Find if this has an image. N.B. Don't count scanned Selden End cards as true images.
            if man.has_key( f.get_relations_to_image_fieldname() ) : #{
              if man.has_key( f.get_id_fieldname( object_type = 'manifestation' )): #{ # it jolly well should have!
                id_from_editing_interface = man[ f.get_id_fieldname( object_type = 'manifestation' ) ]
                if not 'cofk_import_ead-ead_c01_id' in id_from_editing_interface: #{
                  add_additional( updated, f.get_manif_has_image_fieldname(), 'true' )
                  changed = True
                #}
              #}
            #}
  
            if add_additional_with_check( updated, f.get_manif_doc_type_fieldname(), man, \
                                          f.get_manifestation_type_fieldname() ) : #{
              changed = True
            #}

            if add_additional_with_check( updated, f.get_manif_shelfmark_fieldname(), man, \
                                          f.get_shelfmark_fieldname() ) : #{
              changed = True
            #}

            if add_additional_with_check( updated, f.get_manif_printed_edition_fieldname(), man, \
                                          f.get_printed_edition_details_fieldname() ) : #{
              changed = True
            #}

            if add_additional_with_check( updated, f.get_manif_non_letter_enclosures_fieldname(), man, \
                                          f.get_non_letter_enclosures_fieldname() ) : #{
              changed = True
            #}
  
            #---------------------------------------------------------------------------------
            # This maybe looks counter-intuitive but works as follows:
            # The manifestation had an enclos*ING* manifestation around it,
            # so *this* manifestation was on the INSIDE, i.e. it was itself enclosed.
            #---------------------------------------------------------------------------------
            if man.has_key( f.get_enclosing_fieldname() ) : #{
              add_additional( updated, f.get_manif_enclosed_fieldname(), 'true' )
              changed = True
            #}
  
            #---------------------------------------------------------------------------------
            # Once again, this looks counter-intuitive but works as follows:
            # The manifestation had an enclos*ED* manifestation inside it,
            # so *this* manifestation was on the OUTSIDE, i.e. it had an enclosure.
            #---------------------------------------------------------------------------------
            if man.has_key( f.get_enclosed_fieldname() ) : #{
              add_additional( updated, f.get_manif_with_enclosure_fieldname(), 'true' )
              changed = True
            #}
  
            if add_additional_with_check( updated, f.get_manif_paper_size_fieldname(), man, \
                                          f.get_paper_size_fieldname() ) : #{
              changed = True
            #}

            if add_additional_with_check( updated, f.get_manif_paper_type_fieldname(), man, \
                                          f.get_paper_type_fieldname() ) : #{
              changed = True
            #}

            if add_additional_with_check( updated, f.get_manif_seal_fieldname(), man, \
                                          f.get_seal_fieldname() ) : #{
              changed = True
            #}

            if add_additional_with_check( updated, f.get_manif_numpages_fieldname(), man, \
                                          f.get_number_of_pages_of_document_fieldname() ) : #{
              changed = True
            #}

            if add_additional_with_check( updated, f.get_manif_postage_mark_fieldname(), man, \
                                          f.get_postage_mark_fieldname() ) : #{
              changed = True
            #}

            if add_additional_with_check( updated, f.get_manif_endorsements_fieldname(), man, \
                                          f.get_endorsements_fieldname() ) : #{
              changed = True
            #}

              
            if man.has_key( f.get_repository_fieldname() ) :  #{
              for ins_uri in man[ f.get_repository_fieldname() ] : #{
                inst = find_uri( institutions.results, ins_uri )
                if inst == None :
                  error_count += 1
                else : #{
                  if add_additional_with_check( updated, f.get_manif_repository_fieldname(), inst, 
                                                f.get_repository_name_fieldname() ) : #{
                    changed = True  
                  #}

                  if add_additional_with_check( updated, f.get_manif_repository_fieldname(), inst, \
                                                f.get_repository_alternate_name_fieldname() ) : #{
                    changed = True  
                  #}

                  if add_additional_with_check( updated, f.get_manif_repository_fieldname(), inst, \
                                                f.get_repository_city_fieldname() ) : #{
                    changed = True  
                  #}

                  if add_additional_with_check( updated, f.get_manif_repository_fieldname(), inst, \
                                                f.get_repository_alternate_city_fieldname() ) : #{
                    changed = True  
                  #}

                  if add_additional_with_check( updated, f.get_manif_repository_fieldname(), inst, \
                                                f.get_repository_country_fieldname() ) : #{
                    changed = True  
                  #}

                  if add_additional_with_check( updated, f.get_manif_repository_fieldname(), inst, \
                                                f.get_repository_alternate_country_fieldname() ) : #{
                    changed = True                
                  #}
                #}
              #}
            #}
          #}
        #}
      #}  # end of manifestation additionals
      #---------------------------------------------
      
      # Add author additionals
      if( result.has_key( f.get_author_uri_fieldname() ) ) :  #{

        sortlist = []
            
        for person_uri in result[ f.get_author_uri_fieldname() ]: #{
          person = find_uri( people.results, person_uri )
          
          if person == None :
            error_count += 1
          else : #{
            if person.has_key( f.get_person_name_fieldname() ): #{
              sortlist.append( person[ f.get_person_name_fieldname() ] )
            #}

            if add_additional_with_check( updated, f.get_person_with_author_role_fieldname(), person, \
                                          f.get_person_name_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_person_with_author_role_fieldname(), person,  \
                                          f.get_alias_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_author_roles_fieldname(), person, \
                                          f.get_person_titles_or_roles_fieldname()): #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_author_gender_fieldname(), person, \
                                          f.get_gender_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_author_is_org_fieldname(), person, \
                                          f.get_is_organisation_fieldname() ) : #{
              changed = True
            #}
          #}
        #}

        if changed and len( sortlist ) > 0: #{
          sortlist.sort()
          add_additional( updated, 'author_sort', "; ".join( sortlist ) )
        #}
      #}  # end of author additionals
      #---------------------------------------------
      
      # Add recipient additionals        
      if( result.has_key( f.get_addressee_uri_fieldname() ) ) : #{

        sortlist = []
            
        for person_uri in result[ f.get_addressee_uri_fieldname() ]: #{
          person = find_uri( people.results, person_uri )
          
          if person == None :
            error_count += 1
          else : #{
            if person.has_key( f.get_person_name_fieldname() ): #{
              sortlist.append( person[ f.get_person_name_fieldname() ] )
            #}

            if add_additional_with_check( updated, f.get_person_with_addressee_role_fieldname(), person, \
                                          f.get_person_name_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_person_with_addressee_role_fieldname(), person, \
                                          f.get_alias_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_addressee_roles_fieldname(), person, \
                                          f.get_person_titles_or_roles_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_addressee_gender_fieldname(), person, \
                                          f.get_gender_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_addressee_is_org_fieldname(), person, \
                                          f.get_is_organisation_fieldname() ) : #{
              changed = True
            #}
          #}
        #}

        if changed and len( sortlist ) > 0: #{
          sortlist.sort()
          add_additional( updated, 'recipient_sort', "; ".join( sortlist ) )
        #}
      #}  # end of recipient additionals
      #---------------------------------------------
      
      # Add additionals for people mentioned
      if( result.has_key( f.get_relations_to_people_mentioned_fieldname() ) ) : #{
        person = find_uri( people.results, result[ f.get_relations_to_people_mentioned_fieldname() ][0] )
        
        if person == None :
          error_count += 1
            
        for person_uri in result[ f.get_relations_to_people_mentioned_fieldname() ]: #{
          person = find_uri( people.results, person_uri )
          
          if person == None :
            error_count += 1
          else : #{
            if add_additional_with_check( updated, f.get_details_of_agent_mentioned_fieldname(), person, \
                                          f.get_person_name_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_details_of_agent_mentioned_fieldname(), person, \
                                          f.get_alias_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_agent_mentioned_roles_fieldname(), person, \
                                          f.get_person_titles_or_roles_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_person_mentioned_gender_fieldname(), person, \
                                          f.get_gender_fieldname() ) : #{
              changed = True
            #}
            if add_additional_with_check( updated, f.get_agent_mentioned_is_org_fieldname(), person, \
                                          f.get_is_organisation_fieldname() ) : #{
              changed = True
            #}
          #}
        #}
      #}  # end of additionals for people mentioned
      #---------------------------------------------
              
        
      # Add origin additionals
      if( result.has_key( f.get_origin_uri_fieldname() ) ) : #{
        location = find_uri( locations.results, result[ f.get_origin_uri_fieldname() ][0] )
        if location == None :
          error_count += 1
        else : #{
          if add_additional_with_check(updated, 'origin_sort', location, f.get_location_name_fieldname() ): #{
            changed = True
          #}
        #}
            
        for location_uri in result[ f.get_origin_uri_fieldname() ]: #{
          location = find_uri( locations.results, location_uri )
          
          if location == None : #{
            error_count += 1
          else : 
            if add_additional_with_check( updated, f.get_placename_of_origin_fieldname(), \
                                          location, f.get_location_name_fieldname() ): #{
              changed = True  
            #}
            if add_additional_with_check( updated, f.get_placename_of_origin_fieldname(), \
                                          location, f.get_location_synonyms_fieldname() ): #{
              changed = True  
            #}
          #}
        #}
      #}  # end of origin additionals
      #---------------------------------------------
              
      # Add destination additionals           
      if( result.has_key( f.get_destination_uri_fieldname() ) ) : #{
        location = find_uri( locations.results, result[ f.get_destination_uri_fieldname() ][0] )
        if location == None :
          error_count += 1
        else : #{
          if add_additional_with_check(updated, 'destination_sort', location, f.get_location_name_fieldname() ): #{
            changed = True
          #}
        #}
            
        for location_uri in result[ f.get_destination_uri_fieldname() ]: #{
          location = find_uri( locations.results, location_uri )
          
          if location == None :
            error_count += 1
          else :  #{
            if add_additional_with_check( updated, f.get_placename_of_destination_fieldname(), location, \
                                          f.get_location_name_fieldname() ) : #{
              changed = True  
            #}
            if add_additional_with_check( updated, f.get_placename_of_destination_fieldname(), \
                                          location, f.get_location_synonyms_fieldname() ) : #{
              changed = True  
            #}
          #}
        #}
      #} # end of destination additionals
      #---------------------------------------------
              
      # Add place mentioned additionals           
      if( result.has_key( f.get_relations_to_places_mentioned_fieldname() ) ) : #{
        for location_uri in result[ f.get_relations_to_places_mentioned_fieldname() ]: #{
          location = find_uri( locations.results, location_uri )
          
          if location == None :
            error_count += 1
          else :  #{
            if add_additional_with_check( updated, f.get_placename_mentioned_fieldname(), location, \
                                          f.get_location_name_fieldname() ) : #{
              changed = True  
            #}
            if add_additional_with_check( updated, f.get_placename_mentioned_fieldname(), \
                                          location, f.get_location_synonyms_fieldname() ) : #{
              changed = True  
            #}
          #}
        #}
      #} # end of place mentioned additionals
      #---------------------------------------------
        
      # Add resource additionals
      if( result.has_key( f.get_relations_to_resource_fieldname() ) ) : #{
        for res_uri in result[ f.get_relations_to_resource_fieldname() ] : #{
          res = find_uri( resources.results, res_uri )

          if res == None :
            error_count += 1

          else : #{
            # Find if this resource is a transcript (currently just on the basis of resource title and URL)
            resource_url = ''
            resource_title = ''
            if res.has_key( f.get_resource_title_fieldname() ) : #{
              resource_title = res[ f.get_resource_title_fieldname() ]
            #}
            if res.has_key( f.get_resource_url_fieldname() ) : #{
              resource_url = res[ f.get_resource_url_fieldname() ]
            #}
            if resource_title.startswith( 'Transcript' ) and resource_url.startswith( 'http' ): #{
              add_additional( updated, f.get_transcription_url_fieldname(), resource_url )
              changed = True
            #}
          #}
        #}
      #}  # end of resource additionals
      #---------------------------------------------
    
      #=============================================
      # See if there have been changes for this work
      #=============================================
      if changed : #{
        for key, value in result.iteritems(): #{
          if key not in [ 'id', 'people', 'locations', 'comments', 'manifestations', 'resources', 
                          'default_search_field' ] : #{
            updated[key] = value
          #}
        #}
        
        works_update.append( updated )
        updated_count += 1
      #}
    #}  # end of loop through works results

    #===============================================
    # Write any changes for this work back into Solr
    #===============================================
    if len( works_update ) > 0 :
      solr_works.add_many( works_update, False )
      
    start += batch
    works = solr_works.query( "*:*", fields="*", start=start, rows=batch, score=False)
  #}
  
  print ""  
  print "Committing " + str( updated_count ) + " works..."

  solr_works.commit()
  solr_works.close()

  solr_people.close()
  solr_locations.close()
  solr_manifestations.close()
  solr_institutions.close()
  solr_resources.close()

  return error_count
#}
#================================================================

def get_details_from_uri_list( solr_instance, uri_list, field_list ): #{

  if len( uri_list ) > 0 : #{
    uri_list = [ escape_colons( one_uri ) for one_uri in uri_list ]

    query_str = escaped_uri_fieldname + ":(" + escaped_uri_prefix + join_with_or.join( uri_list ) + ")"

    field_str = ','.join( field_list )

    further_details = solr_instance.query( query_str, fields=field_str, \
                                           start=0, rows=len( uri_list ), score=False )
    return further_details      
  #}
  else:
    return uri_list
#}
#================================================================


if __name__ == '__main__':
  error_count = AdditionalWorksData()
  if error_count:
    print "Error count " + str(error_count)
  
  
#================================================================
