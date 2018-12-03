import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render
import web.lib.fieldmap as fn
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

    return render('/main/browse.mako')

##-----------------------------------------------------------------------------

  def get_browse_display_fields( self, browsing ):

    display_fields = {
        'people': [
            fn.get_person_name_fieldname(),
            fn.get_alias_fieldname(),
            fn.get_person_titles_or_roles_fieldname(),
            fn.get_gender_fieldname()
        ],

        'organisations': [
            fn.get_person_name_fieldname(),
            fn.get_alias_fieldname(),
            fn.get_person_titles_or_roles_fieldname()
        ],

        'locations': [
            fn.get_location_name_fieldname(),
            fn.get_location_synonyms_fieldname(),
            fn.get_latitude_fieldname(),
            fn.get_longitude_fieldname()
        ],

        'works':     [
            fn.get_work_description_fieldname()
        ],

        'institutions': [
            fn.get_repository_name_fieldname(),
            fn.get_repository_alternate_name_fieldname(),
            fn.get_repository_city_fieldname(),
            fn.get_repository_alternate_city_fieldname(),
            fn.get_repository_country_fieldname()
        ]
    }

    if browsing in display_fields:
      return display_fields[ browsing ]

    return []


  ##-----------------------------------------------------------------------------

  def get_browse_link_details( self, browsing ):

    link_details = { 

      'people': [
          {
              'field_for_link_text': fn.get_total_works_written_by_agent_fieldname(),
              'search_on_fieldname': fn.get_author_uri_fieldname()
          },
          {
              'field_for_link_text': fn.get_total_works_recd_by_agent_fieldname(),
              'search_on_fieldname': fn.get_addressee_uri_fieldname()
          },
          {
              'field_for_link_text': fn.get_total_works_mentioning_agent_fieldname(),
              'search_on_fieldname': fn.get_relations_to_people_mentioned_fieldname()
          }
      ],

      'organisations': [
          {
              'field_for_link_text': fn.get_total_works_written_by_agent_fieldname(),
              'search_on_fieldname': fn.get_author_uri_fieldname()
          },

          {
              'field_for_link_text': fn.get_total_works_recd_by_agent_fieldname(),
              'search_on_fieldname': fn.get_addressee_uri_fieldname()
          },

          {
              'field_for_link_text': fn.get_total_works_mentioning_agent_fieldname(),
              'search_on_fieldname': fn.get_relations_to_people_mentioned_fieldname()
          }
      ],

      'locations': [
          {
              'field_for_link_text': fn.get_total_works_sent_from_place_fieldname(),
              'search_on_fieldname': fn.get_origin_uri_fieldname()
          },

          {
              'field_for_link_text': fn.get_total_works_sent_to_place_fieldname(),
              'search_on_fieldname': fn.get_destination_uri_fieldname()
          },

          {
              'field_for_link_text': fn.get_total_works_mentioning_place_fieldname(),
              'search_on_fieldname': fn.get_relations_to_places_mentioned_fieldname()
          }
      ],

      'institutions': [
          {
              'field_for_link_text': fn.get_total_docs_in_repos_fieldname(),
              'search_on_fieldname': 'repository'
          }
      ]
    }

    if browsing in link_details:
      return link_details[ browsing ]

    return []


  ##-----------------------------------------------------------------------------
    
  def people(self):
    
    c.current_letter = letter = request.params.get( 'letter', 'a' )
    
    is_org_field = escape_colons( fn.get_is_organisation_fieldname() )
    q = is_org_field + ":false AND browse:" + letter + "* AND (" + \
        fn.get_total_works_written_by_agent_fieldname() + ":[1 TO *] OR " + \
        fn.get_total_works_recd_by_agent_fieldname() + ":[1 TO *] OR " + \
        fn.get_total_works_mentioning_agent_fieldname() + ":[1 TO *])"

    c.browse = self.browse( q, 'people' )
    c.browsing = "people"

    return render('/main/browse.mako')

  ##-----------------------------------------------------------------------------

  def organisations(self):
    c.current_letter = letter = request.params.get( 'letter', 'a' )

    is_org_field = escape_colons( fn.get_is_organisation_fieldname())
    q = is_org_field + ":true AND browse:" + letter + "* AND (" + \
        fn.get_total_works_written_by_agent_fieldname() + ":[1 TO *] OR " + \
        fn.get_total_works_recd_by_agent_fieldname() + ":[1 TO *] OR " + \
        fn.get_total_works_mentioning_agent_fieldname() + ":[1 TO *])"

    c.browse = self.browse( q, 'people', real_object='organisations' )
    c.browsing = "organisations"

    return render('/main/browse.mako')

  ##-----------------------------------------------------------------------------
    
  def locations(self):
    c.current_letter = letter = request.params.get( 'letter', 'a' )
    
    q = "browse:" + letter + "* AND (" + \
        fn.get_total_works_sent_from_place_fieldname() + ":[1 TO *] OR " + \
        fn.get_total_works_sent_to_place_fieldname() + ":[1 TO *] OR " + \
        fn.get_total_works_mentioning_place_fieldname() + ":[1 TO *])"

    c.browse = self.browse( q, 'locations' )
    c.browsing = "locations"

    return render('/main/browse.mako')

##-----------------------------------------------------------------------------
    
  def institutions(self):
    c.current_letter = letter = request.params.get( 'letter', 'a' )

    # select stuff with no alpha letter
    # -browse:a* AND -browse:b* -browse:c* AND -browse:d* AND -browse:e* AND -browse:f* AND -browse:g* AND -browse:h* -browse:i* AND -browse:j* AND -browse:k* AND -browse:l* AND -browse:m* AND -browse:n* -browse:o* AND -browse:p* AND -browse:q* AND -browse:r* AND -browse:s* AND -browse:t* -browse:u* AND -browse:v* AND -browse:w* AND -browse:x* AND -browse:y* AND -browse:z*

    q = "browse:" + letter + "*"

    c.browse = self.browse( q, 'institutions' )
    c.browsing = "institutions"

    return render('/main/browse.mako')

##-----------------------------------------------------------------------------
    
  def works(self):

    default_year = get_default_year_for_browse()

    c.current_year = year = request.params.get( 'year', default_year )
    
    q = '(' + escape_colons( fn.get_start_year_fieldname()) + ':(' + year + ')' \
      + ' OR ' \
      + escape_colons( fn.get_end_year_fieldname()) + ':(' + year + '))'

    c.browse = self.browse( q, 'works', sortfield='started_date_sort asc' )
    c.browsing = "works"

    return render('/main/browse.mako')

##-----------------------------------------------------------------------------

  def browse(self, q, object, sortfield = 'browse asc', real_object=None):

    # Tell Solr to return the URI identifying the record, e.g. the person URI if you're browsing people.
    fields = []
    uri_fieldname = fn.get_uri_fieldname()
    fields.append( uri_fieldname )

    display_fields = self.get_browse_display_fields( real_object or object )
    link_details = self.get_browse_link_details( real_object or object )

    # Tell Solr to return the fields listed in 'display fields'
    fields.extend( display_fields )

    # Tell Solr to return the fields listed in 'link details'
    if len( link_details ) > 0: #{
      for one_link_details in link_details: #{
        fields.append( one_link_details[ 'field_for_link_text' ] )
      #}
    #}

    # Tell Solr to return related resources
    fields.append( fn.get_relations_to_resource_fieldname() )

    # TODO: What are we going to do about names that start with letters containing an accent??? -
    # e.g. Ile de France (there should be a circumflex over that I). No option for I-circumflex on list.
    # Can we strip off the accent before setting up the 'browse' field on import? Think about this one.


    sol = solr.SolrConnection( solrconfig.solr_urls[object] )
    sol_response = sol.query( q.encode( 'utf-8' ),
                   score=False, fields=fields, rows=999999999, start=0, sort=sortfield )
    sol.close()



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
 
      # field_for_link_text = ''
      # search_on_fieldname = ''

      if len( link_details ) > 0: #{
        for one_link_details in link_details: #{
          field_for_link_text = one_link_details[ 'field_for_link_text' ]

          if field_for_link_text in result:  #{
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
      if len( display_fields ) > 1:
        on_first_field = True

        for fieldname in display_fields:

          if on_first_field:
            on_first_field = False
          else:
            if result.has_key( fieldname ):
              fieldvalue = result[ fieldname ]

              extra_fields.append( { 'fieldname': fieldname,
                                     'fieldvalue': fieldvalue
                                   } )

      # Add a list of related resources, if any
      if fn.get_relations_to_resource_fieldname() in result :
        resource_uuids = []

        for resource_uri in result[ fn.get_relations_to_resource_fieldname() ]:
          resource_uuids.append( uuid_from_uri( resource_uri, True ) )

        resource_results = {}

        for resource_key, resource_dict in resource_results.iteritems():
          resource_fields.append( resource_dict )


      results.append( { 'main_displayable_field': result[ main_displayable_fieldname ], 
                        'main_displayable_fieldname':  main_displayable_fieldname, 
                        'main_uri': result[ uri_fieldname ],
                        'link_fields': link_fields,
                        'resource_fields': resource_fields,
                        'extra_fields': extra_fields
                      } )
    #}

    return results
