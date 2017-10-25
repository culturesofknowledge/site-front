import logging
import string, base64

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render

from web.lib.helpers import get_records_from_solr, profile_url_from_uri, escape_colons, \
                            get_max_relations_for_profile
from web.lib.fieldmap import *
import web.lib.relations
from web.lib.tinyurl import Tinyurl
from web.lib.restful_lib2 import ConnectionError
from pylons import config

from collections import defaultdict

import solr

import sys
if '../../workspace/indexing/src' not in sys.path:
    sys.path.insert(0, '../../workspace/indexing/src') # Add workspace files into path. TODO: Fix!
    
import solrconfig


log = logging.getLogger(__name__)

#------------------------------------------------------------------------------------------------

class ProfileController(BaseController):

#------------------------------------------------------------------------------------------------

   def index(self):
      iworkid = request.params.get( 'iwork_id', None ) 
      profile_type = request.params.get( 'type', None )
      
			

      if iworkid: 
         sol = solr.SolrConnection( solrconfig.solr_urls['works'] )
         sol_response = sol.query( escape_colons( get_integer_id_fieldname( 'work' ))
                                   + ':' + escape_colons( get_integer_id_value_prefix()) + iworkid, \
                                   fields=['id'], score=False, rows=1, start=0)

         if sol_response.numFound > 0:
            id = sol_response.results[0]['id'].split('_')[1]
            return redirect( url(controller='profile', action='work', id=id) )
      
      emlo_edit_id = request.params.get( 'id', None )

      if profile_type and emlo_edit_id:

         if profile_type == "person" :
            
            sol = solr.SolrConnection( solrconfig.solr_urls['people'] )
            sol_response = sol.query( "dcterms_identifier-editi_:editi_"
                                       + emlo_edit_id,
                                       fields=['id'], score=False, rows=1, start=0)

            if sol_response.numFound > 0:
               id = sol_response.results[0]['id'].split('_')[1]
               return redirect( url(controller='profile', action='person', id=id) )

      c.profile = {}
      
      return render('/main/profile.mako')

   def p(self, ipersonid):
      id = '0'

      sol = solr.SolrConnection( solrconfig.solr_urls['people'] )
      sol_response = sol.query( "dcterms_identifier-editi_:editi_"
                                + ipersonid,
                                fields=['id'], score=False, rows=1, start=0)

      if sol_response.numFound > 0:
         id = sol_response.results[0]['id'].split('_')[1]


      return redirect( url(controller='profile', action='person', id=id) )


   def w(self, iworkid):
      id = '0'

      sol = solr.SolrConnection( solrconfig.solr_urls['works'] )
      sol_response = sol.query( escape_colons( get_integer_id_fieldname( 'work' ))
                                + ':' + escape_colons( get_integer_id_value_prefix()) + iworkid,
                                fields=['id'], score=False, rows=1, start=0)

      if sol_response.numFound > 0:
         id = sol_response.results[0]['id'].split('_')[1]

      return redirect( url(controller='profile', action='work', id=id) )

   def l(self, locationid):

      id = '0'

      sol = solr.SolrConnection( solrconfig.solr_urls['locations'] )
      sol_response = sol.query( "dcterms_identifier-edit_:edit_cofk_union_location-"
                                + locationid,
                                fields=['id'], score=False, rows=1, start=0)

      if sol_response.numFound > 0:
         id = sol_response.results[0]['id'].split('_')[1]

      return redirect( url(controller='profile', action='location', id=id) )

   def r(self, institutionid):

      id = '0'

      sol = solr.SolrConnection( solrconfig.solr_urls['institutions'] )
      sol_response = sol.query( "dcterms_identifier-edit_:edit_cofk_union_institution-"
                                + institutionid,
                                fields=['id'], score=False, rows=1, start=0)

      if sol_response.numFound > 0:
         id = sol_response.results[0]['id'].split('_')[1]

      return redirect( url(controller='profile', action='institution', id=id) )


   def i(self, id):

      id = self._decodeTiny(id)

      if len(id) == 36:

         sol = solr.SolrConnection( solrconfig.solr_urls['all'] )
         sol_response = sol.query( "id:uuid_" + id, fields=['object_type'], score=False, rows=1, start=0)

         if sol_response.numFound > 0:

            return redirect( url(controller='profile', action=sol_response.results[0]['object_type'], id=id) )

      c.profile = {}
      return render('/main/profile.mako')
 
#------------------------------------------------------------------------------------------------

   def comments(self, id):
      return redirect( url(controller='profile', action='comment', id=id) )

#------------------------------------------------------------------------------------------------

   def comment(self, id):

      c.profile, c.relations, c.further_relations, template = self.profile(id, 'comments', 'comment' )
      
      return render( template )

#------------------------------------------------------------------------------------------------
      
   def locations(self, id):
      return redirect( url(controller='profile', action='location', id=id) )

#------------------------------------------------------------------------------------------------

   def location(self, id):

      c.profile, c.relations, c.further_relations, template = self.profile(id, 'locations', 'location' )
      
      return render( template )

#------------------------------------------------------------------------------------------------
      
   def institutions(self, id):
      return redirect( url(controller='profile', action='institution', id=id) )

#------------------------------------------------------------------------------------------------

   def institution(self, id):

      c.profile, c.relations, c.further_relations, template = self.profile(id, 'institutions', 'institution' )
      
      return render( template )

#------------------------------------------------------------------------------------------------
      
   def images(self, id):
      return redirect( url(controller='profile', action='image', id=id) )

#------------------------------------------------------------------------------------------------

   def image(self, id):

      c.profile, c.relations, c.further_relations, template = self.profile(id, 'images', 'image' )
      
      return render( template )

#------------------------------------------------------------------------------------------------

      
   def manifestations(self, id):
      return redirect( url(controller='profile', action='manifestation', id=id) )

#------------------------------------------------------------------------------------------------

   def manifestation(self, id):

      c.profile, c.relations, c.further_relations, template = self.profile(id, 'manifestations', 'manifestation' )
      
      return render( template )
      
#------------------------------------------------------------------------------------------------
   
   def works(self, id):
      return redirect( url(controller='profile', action='work', id=id) )

#------------------------------------------------------------------------------------------------

   def work(self, id):

      c.profile, c.relations, c.further_relations, template = self.profile(id, 'works', 'work' )
      if c.relations:
          c.further_relations = self.further_relations(c.relations, 'work')

      return render( template )

#------------------------------------------------------------------------------------------------

   def resources(self, id):
      return redirect( url(controller='profile', action='resource', id=id) )

#------------------------------------------------------------------------------------------------

   def resource(self, id):

      c.profile, c.relations, c.further_relations, template = self.profile(id, 'resources', 'resource' )
      
      return render( template )

#------------------------------------------------------------------------------------------------

   def people(self, id):
      return redirect( url(controller='profile', action='person', id=id) )

#------------------------------------------------------------------------------------------------

   def persons(self, id):
      return redirect( url(controller='profile', action='person', id=id) )

#------------------------------------------------------------------------------------------------

   def person(self, id):

      c.profile, c.relations, c.further_relations, template = self.profile(id, 'people', 'person' )
     
      return render( template )

#------------------------------------------------------------------------------------------------

      
   def profile(self, id, solr_name, object ):
   #{
      sol = solr.SolrConnection( solrconfig.solr_urls[solr_name] )

      escaped_id_value = escape_colons( get_uuid_value_prefix()) + id 

      ## If there are too many works to display without timing out, don't get the data for a profile,
      ## but instead go to Works Search Results for the relevant object (currently just institutions,
      ## with the Bodleian being by far the egregious culprit! Redirect done in institution.mako.)

      check_number_of_works = False
      check_field = ''
      field_for_search_on_redirect = ''
      profile_too_big = False

      if object == 'institution': #{
         check_number_of_works = True
         check_field = get_total_docs_in_repos_fieldname()
         field_for_search_on_redirect = get_main_displayable_fieldname( object )
      #}

      
      if check_number_of_works: #{
         fields_to_get = [ 'id', 'object_type', check_field, field_for_search_on_redirect ]

         sol_response = sol.query( "id:" + escaped_id_value, fields = fields_to_get,
                                    score=False, rows=1, start=0)
         this_profile = sol_response.results[0]
 
         if this_profile[ check_field ] > get_max_relations_for_profile( object ):
            profile_too_big = True
      #}

      if profile_too_big: #{
         # Don't get any more data, as things will grind to a halt.
         relations = []
         further_relations = {}
         c.tinyurl = 'None'
      #}

      else: #{
         # Proceed to populate fields as normal

         sol_response = sol.query( "id:" + escaped_id_value, score=False, rows=1, start=0)
         if len(sol_response.results) == 0:
            c.tinyurl=''
            return None, [], {}, '/main/profiles/person.mako'

         this_profile = sol_response.results[0]
        
         relation_fields = web.lib.relations.object_relation_fields[object]
        
         relations = []
         for relation in relation_fields: #{
            uris = this_profile.get(relation,None)
            if uris: #{

               # Relations defined as multiValued in the Solr schema are returned as a list, even if
               # there is only one entry in the list. However, non-multiValued relations seem to return
               # a (Unicode) string. But the function get_records_from_solr() expects a LIST, so convert.

               if type( uris ) == unicode or type( uris ) == str: #{
                  uris = [ uris ]
                  this_profile[ relation ] = uris
               #}

               # The c.profile variable already has a list of URIs e.g. pointing at works created by person
               # Copy related URIs from c.profile into a list which will be expanded into full objects
               for uri in uris : #{
                  relations.append( uri )
               #}
            #}
         #}
        
         relations = get_records_from_solr( relations )
         further_relations = self.further_relations(relations, object)

         # Get Tinyurl
         try:
            t = Tinyurl()
            path = url(controller='profile', action=solr_name, id=id)
            path = path.lstrip('/')
            page_url = "http://%s/%s" % (config['base_url'], path)
            tinyurl = t.get(page_url)
            c.tinyurl = tinyurl
         except (ConnectionError, ServerNotFoundError):
            # Tinyurl = DEAD
            c.tinyurl = "Service not available"

         c.iidUrl = None
         if object == 'person' :
            c.iidUrl = "/p/" + this_profile['dcterms_identifier-editi_'].replace("editi_",'')
         elif object == 'work' :
            c.iidUrl = "/w/" + this_profile['dcterms_identifier-editi_'].replace("editi_",'')
         elif object == 'location' :
            c.iidUrl = "/l/" + this_profile['dcterms_identifier-edit_'].replace('edit_cofk_union_location-','')
         elif object == 'institution' :
            c.iidUrl = "/r/" + this_profile['dcterms_identifier-edit_'].replace('edit_cofk_union_institution-','')

         c.normalUrl = "/" + id
         c.miniUrl = "/" + self._encodeTiny( id )
      #}

      return this_profile, relations, further_relations, '/main/profiles/' + object + '.mako'
   #}
#------------------------------------------------------------------------------------------------

   def further_relations(self, relations, object):
      #'--------------- further relations ---------------'
      #print relations
      #further relations format = {
      #   'name_of_relation1': [link1_to_resource, link2_to_resource],
      #   'name_of_relation2': [link1_to_resource, link2_to_resource],
      #}
      
      further_relations = defaultdict(list)
 
      if relations and web.lib.relations.further_relation_fields.has_key(object):
          for first_id, relation_val in relations.iteritems():
              for relation in web.lib.relations.further_relation_fields[object]:
                  if relation in relation_val:
                      if type(relation_val[relation]).__name__ == 'list':
                          further_relations[relation] += relation_val[relation]
                      else:
                          further_relations[relation].append(relation_val[relation])
                          
          further_relations = dict(further_relations)
          further_relations_data  = {}
          for relation, uris in further_relations.iteritems():
             results = get_records_from_solr( uris )  # TODO: Take this out of the GOD DAMN FOR LOOP!!!
             further_relations_data[relation] = results
            
          #print '--------------- further relations ---------------'
          #print further_relations_data
          #print '-----------------------------------------'
          
          return further_relations_data
      
      return None


   @staticmethod
   def _decodeTiny(tinyid):

      if len(tinyid) >= 36:
         return tinyid[:36]

      if len( tinyid ) == 32:
         return ("%s-%s-%s-%s-%s") % (tinyid[:8], tinyid[8:12], tinyid[12:16], tinyid[16:20], tinyid[20:])

      if len( tinyid ) < 32:
         transtbl = string.maketrans(
            '0123456789ABCDEFGHJKMNPQRSTVWXYZ' 'OIL',
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567' 'ABB' )

         tinyid = base64.b32decode( tinyid.replace('-', '').upper().encode('ascii').translate(transtbl) + "======" ).encode('hex')

      return ("%s-%s-%s-%s-%s") % (tinyid[:8], tinyid[8:12], tinyid[12:16], tinyid[16:20], tinyid[20:])

   @staticmethod
   def _encodeTiny( id ):
      if len( id ) == 36:

         transtbl = string.maketrans(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
            '0123456789ABCDEFGHJKMNPQRSTVWXYZ' )

         id = base64.b32encode( id.replace('-', '').decode('hex') ).rstrip('=').translate(transtbl).lower()

      return id

