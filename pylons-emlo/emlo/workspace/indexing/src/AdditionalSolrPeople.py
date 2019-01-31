# -*- coding: utf-8 -*-
import sys
import time

import solr

# These two lines are hacks. They switch the default encoding to utf8 so that the command line will convert UTF8 + Ascii to UTF8
reload(sys)
sys.setdefaultencoding("utf8")

import solrconfig

web_lib_path = '../../../pylons/web/web/lib'
sys.path.append( web_lib_path )
import fieldmap as f
from helpers import escape_colons
from helpers import get_records_from_solr, uuid_from_uri

start = 0
batch = 200

solr_people = solr.SolrConnection( solrconfig.solr_urls['people'],  persistent=True )

people = solr_people.query( "*:*", fields="*", start=start, rows=batch, score=False)
#people = solr_people.query( "uuid:83132068-65cf-4c3f-b6c9-9e7ea18abee0", fields="*", start=start, rows=batch, score=False)
#people = solr_people.query( "uuid:b6b697b2-d342-407d-b168-1cd702bda2bc", fields="*", start=start, rows=batch, score=False)
#people = solr_people.query( "uuid:6a9b17f5-e7ce-4da2-ab67-9a58cdaecfcf", fields="*", start=start, rows=batch, score=False)
#people = solr_people.query( "uuid:c442cfce-636a-480d-a959-2f3d8f7498a0", fields="*", start=start, rows=batch, score=False)

total = people.numFound
count_down = total
while start < total :

	people_updates = []
	for result in people.results:

		updated = {}
		changed = False

		print count_down, result['id']

		if 'frbr_creatorOf-work' in result:
			works_created = get_records_from_solr( result['frbr_creatorOf-work'] , [
				'mail_recipient-person', # person sent to
				'mail_origin-location', # place wrote in
			] )

			if works_created:
				# print works_created

				updated['works_created_locations'] = set()
				updated['works_to_people'] = set()

				for work in works_created.itervalues() :
					if 'mail_origin-location' in work:
						for location in work['mail_origin-location'] :
							updated['works_created_locations'].add( uuid_from_uri( location ) )

					if 'mail_recipient-person' in work:
						for person in work['mail_recipient-person'] :
							updated['works_to_people'].add( uuid_from_uri( person ) )

		if 'mail_recipientOf-work' in result:
			works_recipient = get_records_from_solr( result['mail_recipientOf-work'] , [
				'frbr_creator-person', # person received from
				'mail_destination-location' # place received from
			] )

			if works_recipient:
				# print works_recipient

				updated['works_received_locations'] = set()
				updated['works_from_people'] = set()

				for work in works_recipient.itervalues() :

					if 'mail_destination-location' in work :
						for location in work['mail_destination-location']:
							updated['works_received_locations'].add( uuid_from_uri( location ) )

					if 'frbr_creator-person' in work:
						for person in work['frbr_creator-person']:
							updated['works_from_people'].add( uuid_from_uri( person ) )


		if updated:

			# print updated
			for key, value in result.iteritems():
				if key not in ['id', 'name-strict', 'foaf_name-firstletter', '_version_' ] : # These keys are solr copy-fields and shouldn't be indexed directly.
					updated[key] = value

			# print updated
			people_updates.append( updated )


		solr_people.add_many( people_updates, False )

		count_down -= 1

	print "...at " + str(start)
	start += batch
	people = solr_people.query( "*:*", fields="*", start=start, rows=batch, score=False)

solr_people.commit()
solr_people.close()

print "done " + str(start) + "(from " + str(total) + ")"
