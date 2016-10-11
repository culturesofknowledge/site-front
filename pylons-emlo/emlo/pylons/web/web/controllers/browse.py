import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render
from web.lib.fieldmap import *
from web.lib.helpers import escape_colons, uuid_from_uri, get_records_from_solr, \
                            get_default_year_for_browse

import solr

import sys
if '../../workspace/indexing/src' not in sys.path:
   sys.path.insert(0, '../../workspace/indexing/src') # Add workspace files into path. TODO: Fix!
   
import solrconfig

log = logging.getLogger(__name__)

class BrowseController(BaseController):

##-----------------------------------------------------------------------------

  def index(self):
    c.browse = None
    c.browsing = 'browse'
    
    self.set_object_type_stats()
    return render('/main/browse.mako')

##-----------------------------------------------------------------------------

  def get_browse_display_fields( self, browsing ): #{

    display_fields = { 'people': [ get_person_name_fieldname(),
                                   get_alias_fieldname(),
                                   get_person_titles_or_roles_fieldname(),
                                   get_gender_fieldname()],

                       'organisations': [ get_person_name_fieldname(),
                                          get_alias_fieldname(),
                                          get_person_titles_or_roles_fieldname() ],

                       'locations': [ get_location_name_fieldname(),
                                      get_location_synonyms_fieldname(),
                                      get_latitude_fieldname(),
                                      get_longitude_fieldname() ],

                       'works':     [ get_work_description_fieldname() ],

                       'institutions': [ get_repository_name_fieldname(),
                                         get_repository_alternate_name_fieldname(),
                                         get_repository_city_fieldname(),
                                         get_repository_alternate_city_fieldname(),
                                         get_repository_country_fieldname() ] }

    if display_fields.has_key( browsing ):
      return display_fields[ browsing ]
    else:
      return []
  #}

  ##-----------------------------------------------------------------------------

  def get_browse_link_details( self, browsing ): #{

    link_details = { 

      'people': [ { 'field_for_link_text': get_total_works_written_by_agent_fieldname(),
                    'search_on_fieldname': get_author_uri_fieldname() },

                  { 'field_for_link_text': get_total_works_recd_by_agent_fieldname(),
                    'search_on_fieldname': get_addressee_uri_fieldname() },

                  { 'field_for_link_text': get_total_works_mentioning_agent_fieldname(),
                    'search_on_fieldname': get_relations_to_people_mentioned_fieldname() }
                ],

      'organisations':  [ { 'field_for_link_text': get_total_works_written_by_agent_fieldname(),
                            'search_on_fieldname': get_author_uri_fieldname() },

                          { 'field_for_link_text': get_total_works_recd_by_agent_fieldname(),
                            'search_on_fieldname': get_addressee_uri_fieldname() },

                          { 'field_for_link_text': get_total_works_mentioning_agent_fieldname(),
                            'search_on_fieldname': get_relations_to_people_mentioned_fieldname() }
                        ],

      'locations': [ { 'field_for_link_text': get_total_works_sent_from_place_fieldname(),
                       'search_on_fieldname': get_origin_uri_fieldname() },

                     { 'field_for_link_text': get_total_works_sent_to_place_fieldname(),
                       'search_on_fieldname': get_destination_uri_fieldname() },

                     { 'field_for_link_text': get_total_works_mentioning_place_fieldname(),
                       'search_on_fieldname': get_relations_to_places_mentioned_fieldname() }
                   ],

      'institutions': [ { 'field_for_link_text': get_total_docs_in_repos_fieldname(),
                          'search_on_fieldname': 'repository' }
                      ],
    }

    if link_details.has_key( browsing ):
      return link_details[ browsing ]
    else:
      return []
  #}

##-----------------------------------------------------------------------------
    
  def people(self):
    
    c.current_letter = letter = request.params.get( 'letter', 'a' )
    
    is_org_field = escape_colons( get_is_organisation_fieldname())
    q = "%s:false AND browse:%s* AND (frbr\:creatorOf-work:[* TO *] OR mail\:recipientOf-work:[* TO *] OR dcterms\:isReferencedBy-work:[* TO *])"% ( is_org_field, letter )
    
    display_fields = self.get_browse_display_fields( 'people' )

    link_details = self.get_browse_link_details( 'people' )

    c.browse = self.browse( q, 'people', display_fields, link_details, 'a' )
    c.browsing = "people"
    
    self.set_object_type_stats()
    return render('/main/browse.mako')

##-----------------------------------------------------------------------------
    
  def locations(self):
    c.current_letter = letter = request.params.get( 'letter', 'a' )
    
    q = "browse:%s*"% (letter)
    
    display_fields = self.get_browse_display_fields( 'locations' )

    link_details = self.get_browse_link_details( 'locations' )

    c.browse = self.browse( q, 'locations', display_fields, link_details, 'a' )
    c.browsing = "locations"
    
    self.set_object_type_stats()
    return render('/main/browse.mako')

##-----------------------------------------------------------------------------
    
  def organisations(self):
    c.current_letter = letter = request.params.get( 'letter', 'a' )
    
    is_org_field = escape_colons( get_is_organisation_fieldname())
    q = "%s:true AND browse:%s*"% ( is_org_field, letter )
    
    display_fields = self.get_browse_display_fields( 'organisations' )

    link_details = self.get_browse_link_details( 'organisations' )

    c.browse = self.browse( q, 'people', display_fields, link_details, 'a' )
    c.browsing = "organisations"
    
    self.set_object_type_stats()
    return render('/main/browse.mako')

##-----------------------------------------------------------------------------
    
  def institutions(self):
    c.current_letter = letter = request.params.get( 'letter', 'a' )
    
    q = "browse:%s*"% (letter)
    
    display_fields = self.get_browse_display_fields( 'institutions' )

    link_details = self.get_browse_link_details( 'institutions' )

    c.browse = self.browse( q, 'institutions', display_fields, link_details, 'a' )
    c.browsing = "institutions"
    
    self.set_object_type_stats()
    return render('/main/browse.mako')

##-----------------------------------------------------------------------------
    
  def works(self):

    default_year = get_default_year_for_browse()

    c.current_year = year = request.params.get( 'year', default_year )
    
    q = '(' + escape_colons( get_start_year_fieldname()) + ':(' + year + ')' \
      + ' OR ' \
      + escape_colons( get_end_year_fieldname()) + ':(' + year + '))'
    
    display_fields = self.get_browse_display_fields( 'works' )

    link_details = self.get_browse_link_details( 'works' )

    c.browse = self.browse( q, 'works', display_fields, link_details, default_year )
    c.browsing = "works"
    
    self.set_object_type_stats()
    return render('/main/browse.mako')

##-----------------------------------------------------------------------------

  def browse(self, q, object, display_fields, link_details, letter):  #{

    # Connect to the relevant Solr core
    sol = solr.SolrConnection( solrconfig.solr_urls[object] )

    # Tell Solr to return the URI identifying the record, e.g. the person URI if you're browsing people.
    fields = []
    uri_fieldname = get_uri_fieldname()
    fields.append( uri_fieldname )

    # Tell Solr to return the fields listed in 'display fields'
    fields.extend( display_fields )

    # Tell Solr to return the fields listed in 'link details'
    if len( link_details ) > 0: #{
      for one_link_details in link_details: #{
        fields.append( one_link_details[ 'field_for_link_text' ] )
      #}
    #}

    # Tell Solr to return related resources
    fields.append( get_relations_to_resource_fieldname() )

    # What are we going to do about names that start with letters containing an accent??? -
    # e.g. Ile de France (there should be a circumflex over that I). No option for I-circumflex on list.
    # Can we strip off the accent before setting up the 'browse' field on import? Think about this one.

    # See how many rows we need to get
    sol_response = sol.query( q.encode( 'utf-8' ), score=False, fields="-", rows=0 )  
    numFound = sol_response.numFound

    # Decide what to sort on
    if object == 'works':
      sortfield = 'started_date_sort asc'
    else:
      sortfield = 'browse asc'

    # Get the data from Solr
    sol_response = sol.query( q.encode( 'utf-8' ), \
                   score=False, fields=fields, rows=numFound, start=0, sort=sortfield )  
    
    # Transfer the data from the Solr response into the results list
    results = []
    for result in sol_response.results : #{

      # Identify the main descriptive fieldname e.g. person's name, placename, repository name
      main_displayable_fieldname = display_fields[0]
      link_fields = []
      extra_fields = []
      resource_fields = []

      # Process the fields that need links, identifying the value to be displayed
      # and the field to be used in a subsequent search, e.g. the 'Author URI' fieldname 
      # to sllow you to link to all letters written by a person.
 
      field_for_link_text = ''
      search_on_fieldname = ''

      if len( link_details ) > 0: #{
        for one_link_details in link_details: #{
          field_for_link_text = one_link_details[ 'field_for_link_text' ]

          if result.has_key( field_for_link_text ):  #{
            value_of_link_text = result[ field_for_link_text ]
            search_on_fieldname = one_link_details[ 'search_on_fieldname' ]
          #}
          else: #{
            value_of_link_text = 0
            search_on_fieldname = ''
          #}

          link_fields.append( { 'fieldname': field_for_link_text,
                                'fieldvalue': value_of_link_text,
                                'search_on_fieldname': search_on_fieldname
                              } )
        #}
      #}

      # Add a list of extra details to be displayed (these are without links)
      if len( display_fields ) > 1: #{
        on_first_field = True
        for fieldname in display_fields: #{
          if on_first_field:
            on_first_field = False
          else: #{
            if result.has_key( fieldname ): #{
              fieldvalue = result[ fieldname ]

              extra_fields.append( { 'fieldname': fieldname,
                                     'fieldvalue': fieldvalue
                                   } )
            #}
          #}
        #}
      #}

      # Add a list of related resources, if any
      if result.has_key( get_relations_to_resource_fieldname() ): #{
        resource_uuids = []
        resource_dict = {}
        for resource_uri in result[ get_relations_to_resource_fieldname() ]: #{
          resource_uuids.append( uuid_from_uri( resource_uri, True ));
        #}
        resource_results = get_records_from_solr( resource_uuids, \
                                                  selected_fields=[ get_resource_title_fieldname(),
                                                                    get_resource_url_fieldname(),
                                                                    get_resource_details_fieldname() ] )
        for resource_key, resource_dict in resource_results.iteritems(): #{
          resource_fields.append( resource_dict )
        #}
      #}

      results.append( { 'main_displayable_field': result[ main_displayable_fieldname ], 
                        'main_displayable_fieldname':  main_displayable_fieldname, 
                        'main_uri': result[ uri_fieldname ],
                        'link_fields': link_fields,
                        'resource_fields': resource_fields,
                        'extra_fields': extra_fields
                      } )
    #}

    sol.close()
    return results
#}
##-----------------------------------------------------------------------------

  def set_object_type_stats( self ):  #{

    c.stats = {}

    #--------------------------------------------------------
    # Get main stats (split up person vs. organisation later)
    #--------------------------------------------------------
    sol_all = solr.SolrConnection( solrconfig.solr_urls["all"] )

    sol_response_all = sol_all.query( "*:*", rows = 0,  fl = "-", score = False, \
                                      facet = 'true', facet_field = 'object_type' )

    object_type_facets = sol_response_all.facet_counts['facet_fields']['object_type']
    sol_all.close()


    for object_type, num in object_type_facets.iteritems(): #{
      c.stats[ object_type ] = num
      #print 'object type ', object_type, ' = ', num
    #}
        

    #--------------------------------------------------------
    # Get stats for person vs. organisation
    #--------------------------------------------------------
    sol_people = solr.SolrConnection( solrconfig.solr_urls["people"] )

    sol_people_response = sol_people.query( "frbr\:creatorOf-work:[* TO *] OR mail\:recipientOf-work:[* TO *] OR dcterms\:isReferencedBy-work:[* TO *]", rows=0,  fl="-", score=False, \
                                            facet='true', facet_field=get_is_organisation_fieldname())

    is_org_facets = sol_people_response.facet_counts['facet_fields'][get_is_organisation_fieldname()]
    sol_people.close()

    person_count = 0
    org_count = 0

    for is_org, num in is_org_facets.iteritems(): #{
      if is_org == 'true' :
        org_count = num
      else:
        person_count = num
      #print 'Is organisation? ', is_org, ' = ', num
    #}
        
    c.stats[ 'person' ] = person_count
    c.stats[ 'organisation' ] = org_count

    #--------------------------------------------------------
    # Get stats for years of date of work
    #--------------------------------------------------------
    start_year_fieldname = get_start_year_fieldname()
    end_year_fieldname = get_end_year_fieldname()

    sol_works = solr.SolrConnection( solrconfig.solr_urls["works"] )

    # Facets by start year
    sol_works_response = sol_works.query( "%s:*" % escape_colons( start_year_fieldname ), \
                                          rows=0,  fl="-", score=False, \
                                          facet='true', facet_limit=-1, facet_field=start_year_fieldname )
    start_year_facets = sol_works_response.facet_counts['facet_fields'][start_year_fieldname]

    # Facets by end year
    sol_works_response = sol_works.query( "%s:*" % escape_colons( end_year_fieldname ), \
                                          rows=0,  fl="-", score=False, \
                                          facet='true', facet_limit=-1, facet_field=end_year_fieldname )
    end_year_facets = sol_works_response.facet_counts['facet_fields'][end_year_fieldname]

    sol_works.close()

    # Combine the two sets of year facets: get number of unique years
    start_year_count = len( start_year_facets )
    end_year_count = 0

    for end_year, num in end_year_facets.iteritems(): #{
      if not start_year_facets.has_key( end_year ): #{
        end_year_count += 1
      #}
    #}

    c.stats[ 'year' ] = start_year_count + end_year_count
#}
##-----------------------------------------------------------------------------
