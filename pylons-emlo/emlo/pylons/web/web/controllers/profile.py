import logging
import string, base64

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render

from web.lib.helpers import get_records_from_solr, profile_url_from_uri, escape_colons, \
                            get_max_relations_for_profile, uuid_from_uri, get_related_records_from_solr
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

# ------------------------------------------------------------------------------------------------

class ProfileController(BaseController):

# ------------------------------------------------------------------------------------------------

   def index(self):
      iworkid = request.params.get( 'iwork_id', None )

      if iworkid:
         return redirect( url(controller='profile', action='w', iworkid=id) )

      profile_type = request.params.get( 'type', None )
      emlo_edit_id = request.params.get( 'id', None )

      if profile_type and emlo_edit_id:

         if profile_type == "person" or profile_type == "people" or profile_type == "persons" :
            return redirect( url(controller='profile', action='p', ipersonid=emlo_edit_id) )

         if profile_type == "work" or profile_type == "works":
            return redirect( url(controller='profile', action='w', iworkid=emlo_edit_id) )

         if profile_type == "institution" or profile_type == "repository" :
            return redirect( url(controller='profile', action='r', institutionid=emlo_edit_id) )

         if profile_type == "location" or profile_type == "locations" :
            return redirect( url(controller='profile', action='l', locationid=emlo_edit_id) )

      c.profile = {}

      return render('/main/profile.mako')

   def p(self, ipersonid):
      uuid = '0'

      sol = solr.SolrConnection( solrconfig.solr_urls['people'] )
      sol_response = sol.query( "dcterms_identifier-editi_:editi_" + ipersonid,
                                fields=['uuid'], score=False, rows=1, start=0)
      sol.close()

      if sol_response.numFound > 0:
         uuid = sol_response.results[0]['uuid']

      return redirect( url(controller='profile', action='person', id=uuid), code=301 )


   def w(self, iworkid):
      uuid = '0'

      sol = solr.SolrConnection( solrconfig.solr_urls['works'] )
      sol_response = sol.query( get_integer_id_fieldname( 'work' ) + ':' + get_integer_id_value_prefix() + iworkid,
                                fields='uuid', score=False, rows=1, start=0)
      sol.close()

      if sol_response.numFound > 0:
         uuid = sol_response.results[0]['uuid']

      return redirect( url(controller='profile', action='work', id=uuid), code=301 )

   def l(self, locationid):

      uuid = '0'

      sol = solr.SolrConnection( solrconfig.solr_urls['locations'] )
      sol_response = sol.query( "dcterms_identifier-edit_:edit_cofk_union_location-" + locationid,
                                fields=['uuid'], score=False, rows=1, start=0)
      sol.close()

      if sol_response.numFound > 0:
         uuid = sol_response.results[0]['uuid']

      return redirect( url(controller='profile', action='location', id=uuid), code=301 )

   def r(self, institutionid):

      uuid = '0'

      sol = solr.SolrConnection( solrconfig.solr_urls['institutions'] )
      sol_response = sol.query( "dcterms_identifier-edit_:edit_cofk_union_institution-" + institutionid,
                                fields='uuid', score=False, rows=1, start=0)
      sol.close()

      if sol_response.numFound > 0:
         uuid = sol_response.results[0]['uuid']

      return redirect( url(controller='profile', action='institution', id=uuid), code=301 )


   def i(self, id):

      uuid = self._decodeId(id)

      if len(uuid) == 36:

         sol = solr.SolrConnection( solrconfig.solr_urls['all'] )
         sol_response = sol.query( "uuid:" + uuid, fields=['object_type'], score=False, rows=1, start=0)

         if sol_response.numFound > 0:

            return redirect( url(controller='profile', action=sol_response.results[0]['object_type'], id=uuid), code=301 )

      c.profile = {}
      return render('/main/profile.mako')
 
# ------------------------------------------------------------------------------------------------

   def comment(self, id='0'):
      c.profile, c.relations, c.further_relations, template = self.profile(id, 'comments', 'comment' )
      return render( template )

# ------------------------------------------------------------------------------------------------

   def location(self, id='0'):
      c.profile, c.relations, c.further_relations, template = self.profile(id, 'locations', 'location' )
      return render( template )

# ------------------------------------------------------------------------------------------------

   def institution(self, id='0'):
      c.profile, c.relations, c.further_relations, template = self.profile(id, 'institutions', 'institution' )
      return render( template )

# ------------------------------------------------------------------------------------------------

   def image(self, id='0'):
      c.profile, c.relations, c.further_relations, template = self.profile(id, 'images', 'image' )
      return render( template )

# ------------------------------------------------------------------------------------------------


   def manifestation(self, id='0'):
      c.profile, c.relations, c.further_relations, template = self.profile(id, 'manifestations', 'manifestation' )
      return render( template )
      
# ------------------------------------------------------------------------------------------------

   def work(self, id='0'):
      c.profile, c.relations, c.further_relations, template = self.profile(id, 'works', 'work' )
      return render( template )

# ------------------------------------------------------------------------------------------------

   def resource(self, id='0'):
      c.profile, c.relations, c.further_relations, template = self.profile(id, 'resources', 'resource' )
      return render( template )

# ------------------------------------------------------------------------------------------------

   def person(self, id='0'):
      c.profile, c.relations, c.further_relations, template = self.profile(id, 'people', 'person' )
      return render( template )

# ------------------------------------------------------------------------------------------------

   def locations(self):
      return self._handleRedirect( 'location', request )
   def comments(self):
      return self._handleRedirect( 'comment', request )
   def institutions(self):
      return self._handleRedirect( 'institution', request )
   def images(self):
      return self._handleRedirect( 'image', request )
   def manifestations(self):
      return self._handleRedirect( 'manifestation', request )
   def works(self):
      return self._handleRedirect( 'work', request )
   def resources(self):
      return self._handleRedirect( 'resource', request )
   def people(self):
      return self._handleRedirect( 'person', request )
   def persons(self):
      return self._handleRedirect( 'person', request )

   # ------------------------------------------------------------------------------------------------

   def profile(self, uid, solr_name, object ):

      uid = self._decodeId(uid)
      uid_len = len(uid)

      if uid_len != 36 :
         c.tinyurl = ''
         return {}, [], {}, '/main/profiles/person.mako'  # Return any old profile page

      #  If there are too many works to display without timing out, don't get the data for a profile,
      #  but instead go to Works Search Results for the relevant object (currently just institutions,
      #  with the Bodleian being by far the egregious culprit! Redirect done in institution.mako.)
      profile_too_big = False

      fields = '*'
      q = "uuid:" + uid

      sol = solr.SolrConnection( solrconfig.solr_urls[solr_name] )

      if object == 'institution' :

         # check number of works
         check_field = get_total_docs_in_repos_fieldname()
         sol_response = sol.query( q, fields=[check_field], score=False)

         if len(sol_response.results) != 0:
            if sol_response.results[0][ check_field ] > get_max_relations_for_profile( object ):
               profile_too_big = True
               fields = "*,ox_hasResource-manifestation:[value v=\"\"]"


      sol_response = sol.query( q, fields=fields, score=False)
      if len(sol_response.results) == 0:
         c.tinyurl = ''
         return {}, [], {}, '/main/profiles/person.mako'  # Return any old profile page

      this_profile = sol_response.results[0]
      this_profile["profile_too_big"] = profile_too_big

      sol.close()


      if profile_too_big:
         # Don't get any more data, as things will grind to a halt.
         relations = []
         further_relations = {}

      else:

         relations = get_related_records_from_solr( [uid] )

         relations_extra = []
         relations_extra.extend( this_profile.get('works_created_locations',[]) )
         relations_extra.extend( this_profile.get('works_received_locations',[]) )

         relations.update( get_records_from_solr( relations_extra, ['uuid','geonames_name','geo_lat','geo_long'] ) )
         further_relations = self.further_relations(relations, object)


      # Get Tinyurl
      # path = url(controller='profile', action=solr_name, id=uid)  # God damn directing to the wrong thing for years!
      page_url = "http://%s/profile/%s/%s" % (config['base_url'], object, uid)

      c.tinyurl = ''
      try:
         t = Tinyurl()
         c.tinyurl = t.get(page_url)
      except (ConnectionError, ServerNotFoundError):
        c.tinyurl = "Service not available"

      c.iidUrl = self._get_emlo_iid( object, this_profile )
      c.normalUrl = "/" + uid
      c.miniUrl = "/" + self._encodeId(uid)


      return this_profile, relations, further_relations, '/main/profiles/' + object + '.mako'

# ------------------------------------------------------------------------------------------------

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

          all_uris = []
          for _, uris in further_relations.iteritems():
              all_uris.extend( uris )

          results = get_records_from_solr( all_uris )

          for relation, uris in further_relations.iteritems():
              further_relations_data[relation] = {}

              for uri in uris:
                  uri_id = uuid_from_uri( uri, True )
                  further_relations_data[relation][uri_id] = results[uri_id]


          # print '--------------- further relations ---------------'
          # print further_relations_data
          # print '-----------------------------------------'
          
          return further_relations_data
      
      return None


   @staticmethod
   def _decodeId(id):
      id_len = len(id)

      if id_len >= 36:
         return id[:36]  # Possibly additional unwanted characters

      if id_len == 32:
         return ("%s-%s-%s-%s-%s") % (id[:8], id[8:12], id[12:16], id[16:20], id[20:])  # dashes removed

      if id_len <= 6 :
         return id  # Possibly an emlo "emloi" id

      if id_len < 32:
         transtbl = string.maketrans(
            '0123456789ABCDEFGHJKMNPQRSTVWXYZ' 'OIL',
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567' 'ABB' )

         id = base64.b32decode(id.replace('-', '').upper().encode('ascii').translate(transtbl) + "======").encode('hex')

      return ("%s-%s-%s-%s-%s") % (id[:8], id[8:12], id[12:16], id[16:20], id[20:])

   @staticmethod
   def _encodeId(id):
      if len( id ) == 36:

         transtbl = string.maketrans(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
            '0123456789ABCDEFGHJKMNPQRSTVWXYZ' )

         id = base64.b32encode( id.replace('-', '').decode('hex') ).rstrip('=').translate(transtbl).lower()

      return id


   @staticmethod
   def _get_emlo_iid(object, profile):

      if profile:
         if object == 'person' :
            return "/p/" + profile['dcterms_identifier-editi_'].replace("editi_", '')

         elif object == 'work' :
            return "/w/" + profile['dcterms_identifier-editi_'].replace("editi_", '')

         elif object == 'location' :
            return "/l/" + profile['dcterms_identifier-edit_'].replace('edit_cofk_union_location-', '')

         elif object == 'institution' :
            return "/r/" + profile['dcterms_identifier-edit_'].replace('edit_cofk_union_institution-', '')

      return None

   @staticmethod
   def _handleRedirect(action, request):
      #  for (mismanaged) tinyurls...
      # TODO: Figure out how to do this in the router (from /profile/locations?id=SomEthIng to /profile/location/SomEthIng )
      return redirect( url(controller='profile', action=action, id=request.params.get('id', '0')), code=301 )

