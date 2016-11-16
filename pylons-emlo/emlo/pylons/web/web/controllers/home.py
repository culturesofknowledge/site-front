import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render
from web.lib.helpers import *

import solr
import random

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
       
       catalogue_fieldname = get_catalogue_fieldname()
       facet_fields = ['object_type',catalogue_fieldname]
       sol_response_all = sol_all.query( "*:*", rows=0,  fl="-", score=False, \
                                          facet='true', facet_field=facet_fields)

       sol_all.close()
       
       c.stats = {}
       for stat, num in sol_response_all.facet_counts['facet_fields']['object_type'].iteritems():
         if stat == 'institution' :
            stat = 'repositories'
            url = '/browse/institutions'
         elif stat == 'comment':
            stat = 'comments'
            url = ''
         elif stat == 'image':
            stat = 'images'
            url = ''
         elif stat == 'location':
            stat = 'locations'
            url = '/browse/locations'
         elif stat == 'manifestation':
            stat = 'manifestations'
            url = ''
         elif stat == 'resource':
            stat = 'related resources'
            url = ''
         elif stat == 'work':
            stat = 'works'
            url = ''
         elif stat == 'person':
            stat = '' # skip
            url = ''
         
         if stat != '' :
            c.stats[stat] = {}
            c.stats[stat]['number'] = num
            
            if url != '' :
               c.stats[stat]['url'] = url
            
      

       catalogue_dict = sol_response_all.facet_counts[ 'facet_fields' ][catalogue_fieldname]
       num_catalogues = len( catalogue_dict )

       if 'No catalogue specified' in catalogue_dict.keys():
          num_catalogues -= 1
       c.stats['Catalogues'] = { 'number': num_catalogues }


 
       work_total = c.stats['works']['number']
       
       sol_people = solr.SolrConnection( solrconfig.solr_urls["people"] )
       
       facet_fields = get_is_organisation_fieldname()
       sol_people_response = sol_people.query( get_works_created_fieldname() + ":[* TO *] " +
                                               "OR " + get_letters_received_fieldname() + ":[* TO *] " +
                                               "OR " + get_works_in_which_mentioned_fieldname() + ":[* TO *]",
                                               rows=0,  fl="-", score=False,
                                          facet='true', facet_field=facet_fields)
       sol_people.close()
       
       for stat, num in sol_people_response.facet_counts['facet_fields'][get_is_organisation_fieldname()].iteritems():
         if stat == 'true' :
            stat = 'organisations'
            url = '/browse/organisations'
         else :
            stat = 'people'
            url = '/browse/people'
            
         c.stats[stat] = {}
         c.stats[stat]['number'] = num
         c.stats[stat]['url'] = url   
       
       # Only count non-Selden End images, i.e. not scans of index cards (as opposed to manuscripts).
       # TODO: This doesn;'t seem to do anything, possibly because the photo positions have moved? (It does make an unnecessary call to the database though!)
       #card_index_total = 0
       #img_query = escape_colons( get_image_source_fieldname() ) + ':/selden_end*'
       #sol_img = solr.SolrConnection( solrconfig.solr_urls["images"] )
       #sol_img_response = sol_img.query( img_query, rows=0,  fl="-", score=False, facet='false' )
       #card_index_total = sol_img_response.numFound
       #sol_img.close()
       #c.stats[ 'images' ]['number'] -= card_index_total

       #
       # Get news feed (I'd like to move this to client side so there is no wait for page to load)
       #
       c.news_feed = {}
       c.news_feed['link'] = ''
       c.news_feed['image'] = ''
       c.news_feed['title'] = 'None'
       c.news_feed['date'] = ''
       c.news_feed = get_news_feed()   
       
       #
       # Get Record of the Week (ROTW)
       #
       c.rotw_feed = {}
       c.rotw_feed['link'] = ''
       c.rotw_feed['image'] = ''
       c.rotw_feed['title'] = 'None'
       c.rotw_feed['date'] = ''
       c.rotw_feed = get_rotw()   
       
       
       #
       # Get random works and catalogs number
       #
       
       sol_work = solr.SolrConnection( solrconfig.solr_urls["works"] )

       catalogue_fieldname = get_catalogue_fieldname()
       sol_response = sol_work.query( "*:*", start=0, rows=1, fields="", score=False, \
                                       facet='true', facet_field=catalogue_fieldname)

       sol_work.close()
       
       catalogue_dict = sol_response.facet_counts[ 'facet_fields' ][catalogue_fieldname]
       num_catalogues = len( catalogue_dict )

       if 'No catalogue specified' in catalogue_dict.keys():
          num_catalogues -= 1
       c.stats['Catalogues'] = { 'number': num_catalogues }

       
       return render('/main/home.mako')

##-----------------------------------------------------------------------------------------------
       
    def updating(self):
       return "<html><body><h1>The website is currently being updated.</h1>" \
              + " <p>It will be back up as soon as possible. Thanks for waiting.</p></body></html>"

##-----------------------------------------------------------------------------------------------
