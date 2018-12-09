import logging

from pylons import config, request, response, session, tmpl_context as c, url

from web.lib.base import BaseController, render
from web.lib.helpers import *
import web.lib.fieldmap as fn

import solr

import sys
if '../../workspace/indexing/src' not in sys.path:
    sys.path.insert(0, '../../workspace/indexing/src') # Add workspace files into path. TODO: Fix!
    
import solrconfig

log = logging.getLogger(__name__)

##-----------------------------------------------------------------------------------------------
class StatusController(BaseController):

##-----------------------------------------------------------------------------------------------

    def index(self):
    
       #
       # Get main stats
       #
       sol_all = solr.SolrConnection( solrconfig.solr_urls["all"] )
       
       catalogue_fn = fn.get_catalogue_fieldname()
       organisation_fn = fn.get_is_organisation_fieldname()

       facet_fields = ['object_type', catalogue_fn, organisation_fn]

       sol_response_all = sol_all.query( "*:*", rows=0,  fl="-", score=False, facet='true', facet_limit=1000, facet_field=facet_fields)
       sol_all.close()

       c.stats = {
          'works' : 0,
          'people and organisations' : 0,
          'people' : 0,
          'locations' : 0,
          'organisations' : 0,
          'repositories' : 0,
          'manifestations' : 0,
          'images' : 0,
          'comments' : 0,
          'related resources' : 0,
          'catalogues' : 0
       }

       for stat, num in sol_response_all.facet_counts['facet_fields']['object_type'].iteritems():

         if stat == 'institution' :
            c.stats['repositories'] = num
         elif stat == 'comment':
             c.stats['comments'] = num
         elif stat == 'image':
             c.stats['images'] = num
         elif stat == 'location':
             c.stats['locations'] = num
         elif stat == 'manifestation':
             c.stats['manifestations'] = num
         elif stat == 'resource':
             c.stats['related resources'] = num
         elif stat == 'work':
             c.stats['works'] = num
         elif stat == 'person':
             c.stats['people and organisations'] = num


       c.stats['all'] = sol_response_all.numFound

       if "true" in sol_response_all.facet_counts['facet_fields'][organisation_fn] :
          c.stats['organisations'] = sol_response_all.facet_counts['facet_fields'][organisation_fn]['true']
       else:
           c.stats['organisations'] = 0

       if 'person' in sol_response_all.facet_counts['facet_fields']['object_type'] :
          c.stats['people'] = sol_response_all.facet_counts['facet_fields']['object_type']['person'] - c.stats['organisations']

       catalogue_dict = sol_response_all.facet_counts[ 'facet_fields' ][catalogue_fn]
       c.stats['catalogues'] = len( catalogue_dict )




       sol_all = solr.SolrConnection( solrconfig.solr_urls["works"] )

       sol_response = sol_all.query( "*:*", rows=20,  fl="*", score=False, sort='ox_internalModified desc')
       sol_all.close()

       c.indexedTime = 'unknown'
       c.changedLast = []
       if sol_response.numFound :
           c.indexedTime = sol_response.results[0]['ox_internalAdded']
           for result in sol_response.results:
               c.changedLast.append({
                   'changed' : result['ox_internalModified'],
                   'description' : result['dcterms_description'],
                   'url' : result['uri']
               })

       return render( '/main/status.mako' )
