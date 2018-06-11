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
class HomeController(BaseController):

##-----------------------------------------------------------------------------------------------

    def index(self):
    
       #
       # Get main stats
       #
       sol_all = solr.SolrConnection( solrconfig.solr_urls["all"] )
       
       catalogue_fn = fn.get_catalogue_fieldname()
       organisation_fn = fn.get_is_organisation_fieldname()

       facet_fields = ['object_type', catalogue_fn, organisation_fn]

       sol_response_all = sol_all.query( "*:*", rows=0,  fl="-", score=False, facet='true', facet_field=facet_fields)
       sol_all.close()

       c.stats = {
          'works' : {
              'number': 0
          },
          'people' : {
              'number': 0,
              'url' : '/browse/people'
          },
          'locations' : {
              'number': 0,
              'url' : '/browse/locations'
          },
          'organisations' : {
              'number': 0,
              'url' : '/browse/organisations'
          },
          'repositories' : {
              'number': 0,
              'url' : '/browse/institutions'
          },
          'manifestations' : {
              'number': 0
          },
          'images' : {
              'number': 0
          },
          'comments'  : {
              'number': 0
          },
          'related resources'  : {
              'number': 0
          },
          'catalogues' : {
              'number' : 0,
              'url' : 'http://emlo-portal.bodleian.ox.ac.uk/collections/?page_id=480'
          }
       }

       for stat, num in sol_response_all.facet_counts['facet_fields']['object_type'].iteritems():

         if stat == 'institution' :
            c.stats['repositories']['number'] = max(0,num)
         elif stat == 'comment':
             c.stats['comments']['number'] = num
         elif stat == 'image':
             c.stats['images']['number'] = num
         elif stat == 'location':
             c.stats['locations']['number'] = num
         elif stat == 'manifestation':
             c.stats['manifestations']['number'] = num
         elif stat == 'resource':
             c.stats['related resources']['number'] = num
         elif stat == 'work':
             c.stats['works']['number'] = num


       if "true" in sol_response_all.facet_counts['facet_fields'][organisation_fn] :
          c.stats['organisations']['number'] = sol_response_all.facet_counts['facet_fields'][organisation_fn]['true']
       else:
           c.stats['organisations']['number'] = 0

       c.stats['people']['number'] = sol_response_all.facet_counts['facet_fields']['object_type']['person'] - c.stats['organisations']['number']


       catalogue_dict = sol_response_all.facet_counts[ 'facet_fields' ][catalogue_fn]
       if 'No catalogue specified' not in catalogue_dict.keys() :
           c.stats['catalogues']['number'] = len( catalogue_dict )
       else :
           c.stats['catalogues']['number'] = len( catalogue_dict ) - 1


       # tweak numbers - none of these numbers will change frequently, if ever. ("Number of everything" minus "Number of ones we want")

       if config['project'] == "EMLO" :
           if c.stats['people']['number'] >= 21985 :
               c.stats['people']['number'] -= (21985-20097)  # Remove people who have no connection to a letter
           if c.stats['organisations']['number'] >= 948 :
               c.stats['organisations']['number'] -= (948-806)  # Remove orginisations who have no connection to a letter
           if c.stats['images']['number']  >= 48661 :
               c.stats['images']['number'] -= (48661)    # Remove images of the bodleian card catalogue
           if c.stats['locations']['number']  > 5931 :
               c.stats['locations']['number'] -= (5931-5190)    # Remove locations which have no connection to a letter
        
       return render( '/main/home.mako' )

##-----------------------------------------------------------------------------------------------
       
    def updating(self):
       return "<html><body><h1>The website is currently being updated.</h1>" \
              + " <p>It will be back up as soon as possible. Thanks for waiting.</p></body></html>"

##-----------------------------------------------------------------------------------------------
