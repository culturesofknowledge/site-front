# -*- coding: utf-8 -*-
import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render

from web.lib.helpers import get_records_from_solr, build_advanced_query, build_quick_query, \
                            join_field_and_value_to_q, add_q, add_q_multi, \
                            get_defaults_for_advanced_search, get_default_rows_per_page, \
                            get_field_to_sort_by

from web.lib.fieldmap import *
from web.lib.helpers import escape_colons, get_content_fields, uuid_from_id

import solr

import sys
if '../../workspace/indexing/src' not in sys.path:
   sys.path.insert(0, '../../workspace/indexing/src') # Add workspace files into path. TODO: Fix!
   
import solrconfig

log = logging.getLogger(__name__)

##---------------------------------------------------------------------------------------
  
class FormsController(BaseController): #{

  # TODO Need to escape characters when passing to solr...
  # Check this: http://e-mats.org/2010/01/escaping-characters-in-a-solr-query-solr-url/

  # The above link is a useful reference in general, so we should retain the above comment permanently.
  # Colons are currently (Aug 18th 2011) escaped but we need to do loads of others.
  # Things have moved around since Mat first developed the system, so the functions to change
  # are now in ~/web/web/lib/helpers.py (the 'build query' functions). 

  base_url_quick = '/forms/quick'
  base_url_advanced = '/forms/advanced'

  queries = []

##---------------------------------------------------------------------------------------
  
  def index(self): #{

    search = request.params.get( 'search_type', None )

    stringrows = str( get_default_rows_per_page() )
    
    if search == 'advanced' or search == 'normal' or search == 'extended':
    
      default_values = get_defaults_for_advanced_search()
      
      ## Remove those with default values (i.e. with nothing set) and get the facet values
      requests = {}
      for name, value in request.params.iteritems() :
        default_value = default_values.get( name, None )
        if default_value and value != default_value :
          requests[name] = value
        #endif
      #endfor
      
      if requests.has_key( 'search_type' ) :
        del requests['search_type']
      #endif
    
      #print '------------------- request params ----------------'
      #print request.params
      #print '------------------- requests ----------------------'
      #print requests
      #print '---------------------------------------------------'
      
      return redirect( url(controller='forms', action='advanced', **requests ) )
      
    elif search == 'quick':
      return redirect( url(controller='forms', action='quick', **requests ) )
    #endif
      
    return redirect(url(controller='home', action='index') )

  #end index()
  #}
##---------------------------------------------------------------------------------------
   
  def quick(self): #{

    # only single field "everything"
    # Search in default search field in solr.
    default_values = {
      "everything" : "all data"
    }

    default_facet_fields=[ 'object_type', get_catalogue_fieldname() ]
    facet_fields=[]
    for default_facet_field in default_facet_fields: #{
      if default_facet_field in request.params: #{  # cannot drill down any further
        continue
      #}
      facet_fields.append( default_facet_field )
    #}
    
    c.query = {}    
    c.query['type'] = 'quick'
    c.query['baseurl'] = self.base_url_quick
    
    rows = request.params.get( 'rows', get_default_rows_per_page() )
    start = request.params.get( 'start', 0 )
    
    everything = request.params.get( 'everything', None )      
    object_type = request.params.get( 'object_type', None )
    catalogue = request.params.get( get_catalogue_fieldname(), None )
    
    highlight = True
    default_value = default_values.get( 'everything', None )
    if default_value and everything and everything.lower() == default_value.lower() :
      highlight = False
      everything = '*'
    #endif

    c.query['fields'] = {}
    c.query['start'] = start
    c.query['rows'] = rows
    
    query_retvals = build_quick_query( everything, object_type, catalogue )

    q = query_retvals[ 'the_query' ]
    c.query[ 'fields' ] = query_retvals[ 'fields' ]

    sort = "score desc"
    c.query['sort'] = 'score-d'  
    
    ##print q
    
    sol = solr.SolrConnection( solrconfig.solr_urls["all"] )
    sol_response = sol.query( q.encode( 'utf-8' ), start=start, sort=sort, rows=rows, \
                              facet='true', facet_mincount='1', facet_sort="count", \
                              facet_field=facet_fields, \
                              hl="true", hl_fl="*",\
                              hl_simple_pre='<span class="highlight">', hl_simple_post="</span>")

    c.solr = {}
    c.solr['numFound'] = sol_response.numFound
    c.solr['results'] = []
    for result in sol_response.results:
      uuid_fieldname = get_uuid_fieldname() 
      raw_uuid = result[ uuid_fieldname ]
      processed_uuid = uuid_from_id(raw_uuid) #raw_uuid.split("_")[1]  # strip off 'uuid:' prefix from value of field
      result['uuid'] = processed_uuid
      c.solr['results'].append(result)
    #endfor

    #c.solr['facets'] = {}
    c.solr['facets'] = sol_response.facet_counts['facet_fields']
    
    if highlight :
      c.solr['highlights'] = sol_response.highlighting
    else :
      c.solr['highlights'] = {}
    #endif
    
    return render('/main/results/quick.mako')

  #end quick()
  #}
##---------------------------------------------------------------------------------------
  def get_max_number_of_facet_entries( self ): #{
    return 8
  #}
##---------------------------------------------------------------------------------------
  
  def advanced(self): #{
    
    global queries
    queries = []

    default_facet_values = {
      get_author_uri_fieldname() : "aut",
      get_addressee_uri_fieldname(): "rec",
      get_origin_uri_fieldname(): "pla_ori_name",
      get_destination_uri_fieldname(): "pla_des_name",
      get_catalogue_fieldname(): "col_cat",
      get_start_year_fieldname(): "dat_sin_year"
    }
    
    facet_values = {}
    
    for facname, facval in default_facet_values.iteritems(): #{

      # Check if we are querying on a URI field or catalogue via facet. 
      # Don't try further faceting if so (no further drilldown is possible within this field).

      if facname in request.params.keys() : #{
        if facname == get_catalogue_fieldname(): #{
          continue
        #}

        requestval = request.params[ facname ]
        if requestval.startswith( 'http' ): #{  # we are already querying on a URI field
          continue
        #}
      #}

      # Similarly if we are querying on a year or catalogue via dropdown list, 
      # don't try further faceting (no further drilldown possible).
      elif ( facval == 'dat_sin_year' or facval == 'col_cat' ) and facval in request.params.keys(): #{
        continue
      #}

      facet_values[ facname ] = default_facet_values[ facname ]
    #}

    requests = request.params.copy()
    
    for name, value in request.params.iteritems() :
      if value and name in facet_values:
        requests[facet_values[name]] = value
        del requests[name]
      #endif
    #endfor
    
    #highlight = {}
    c.query = {}
    c.query['type'] = 'advanced'
    c.query['baseurl'] = self.base_url_advanced
    c.query['fields'] = {}       
    c.query['rows'] = str( get_default_rows_per_page() )
    c.query['start'] = '0'
    
    
    if 'rows' in requests :
      c.query['rows'] = requests['rows']
    #endif
      
    if 'start' in requests :
      c.query['start'] = requests['start']
    #endif
    
    #                
    # Build query
    #
    facet_fields=facet_values.keys()
              
    facet_queries=[]
    
    query_full = build_advanced_query( requests )
 
    ##print '-------------- query_full ----------------------'
    ##print query_full
    ##print '------------------------------------------------' 
    
    c.solr = {}  
    c.solr['numFound'] = 0
    c.solr['results'] = []
    c.solr['facets'] = {}

    sol = solr.SolrConnection( solrconfig.solr_urls["works"])
     
    c.query['sort'], sort = get_field_to_sort_by( requests.get( "sort", False ) )
    
    #Query with highlighting
    sol_response = sol.query( query_full.encode( 'utf-8' ), start=c.query['start'], rows=c.query['rows'], \
                    sort=sort, \
                    facet='true', facet_sort="count", facet_mincount='1', \
                    facet_limit=str( self.get_max_number_of_facet_entries() ), \
                    facet_query=facet_queries, facet_field=facet_fields, \
                    hl="true", \
                    hl_fl=get_content_fields(), \
                    hl_simple_pre="""<span class="highlight">""", hl_simple_post="</span>" )
        
    #print '-------------- query_response ----------------------'
    #print sol_response.highlighting
    #print '----------------------------------------------------'

    c.solr['highlights'] = sol_response.highlighting;
    
    for result in sol_response.results:
      result['uuid'] = uuid_from_id(result['id'])#result['id'].split(":")[1]
      c.solr['results'].append(result)
    #endfor
        
    c.solr['numFound'] = sol_response.numFound
  
    fields = {}
    for field, value in requests.iteritems() :
      fields[field] = { 'name' : field.capitalize(), 'value' : value }
    #endfor
    
    if requests.get( "sort", False ) :
      fields['sort'] = { 'name' : 'Sort', 'value' : requests['sort'], 'for_current' : False }
    #endif
      
    c.query['fields'] = fields

    c.solr['facets'] = {}  
    if sol_response.facet_counts.get('facet_fields', None):
      c.solr['facets'] = sol_response.facet_counts['facet_fields']
       
      # Get the objects which the facets point to.
      facets_relations = []
      for facet, counts in c.solr['facets'].iteritems() :
        for item, count in counts.iteritems() :
          if item.find("http://") != -1 :
            facets_relations.append( item )
          #endif
        #endfor
      #endfor
      
      c.solr['facets_relations'] = get_records_from_solr( facets_relations )
    #endif

    return render('/main/results/advanced.mako')

  #} end advanced()
##----------------------------------------------------------------------------------------
      
  def list(self): #{

    # helper: just print out the values passed in, just direct the forms action to forms/list
    c.query = {}
    c.query['type'] = 'normal'
    c.query['baseurl'] = self.base_url_advanced

    c.query['request'] = request.params

    return render('/main/results/list.mako')
  #}
##----------------------------------------------------------------------------------------
#}  # End of class FormsController
##----------------------------------------------------------------------------------------
