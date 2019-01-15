# -*- coding: utf-8 -*-
import sys
import json

#import solr
import pysolr
# These two lines are hacks. They switch the default encoding to utf8 so that the command line will convert UTF8 + Ascii to UTF8
reload(sys)
sys.setdefaultencoding("utf8")

import solrconfig

web_lib_path = '../../../pylons/web/web/lib'
sys.path.append( web_lib_path )

levels = [
	"level_empire",
	"level_country",
	"level_county",
	"level_city",
	"level_parish",
	"level_building",
	"level_room"
]

solr = pysolr.Solr(solrconfig.solr_urls['locations'])

start = 0
batch = 200
fields = ",".join(levels) + ",uuid,geonames_name",

places = solr.search("*:*", **{
#places = solr.search("uuid:8971752f-155c-478e-9604-3473e5a2ba16", **{
	'fl' : fields,
	'start': start,
	'rows' : batch,
	'score': False,
})

total = places.hits

# From Belgium, Flanders, Ghent
# Produce ['Belgium', 'Flanders, Belgium'] and find both
def add_parent( result, updated ):

	place_levels = []
	for level in levels :
		if level in result:
			# Some "levels" are actually more than one level *e.g. "Petty France, Westminster"
			# so let's try to split them up
			splits = result[level].split(",")
			splits.reverse()
			for split in splits:
				place_levels.append(split.strip())

	parents = []
	parent_count = len(place_levels)
	for level in range(1, parent_count ) :

		place_levels_parent = place_levels[:level]

		place_levels_parent.reverse()
		parents.append( ", ".join(place_levels_parent) )

	if parents :
		q = 'browse: ("' + '" "'.join(parents) + '")'

		parents = solr.search( q, **{
			'fl' : "uuid,geonames_name",
			'start': 0,
			'rows' : parent_count,
			'score': False,
		})

		if parents.hits > 0:

			updated['parents'] = []
			for parent_doc in parents.docs :
				updated['parents'].append( parent_doc['uuid'] )

			updated['parents_json'] = json.dumps(parents.docs)

count_down = total
while start < total :

	places_updates = []
	for result in places.docs:

		updated = {}
		changed = False

		print str(count_down), result['uuid']

		add_parent( result, updated )

		if updated:
			updated["dcterms_identifier-uuid_"] = "uuid_" + result['uuid']

			# print updated
			places_updates.append( updated )

		count_down -= 1

	print "...at " + str(start)
	start += batch

	places = solr.search("*:*", **{
		'fl' : fields,
		'start': start,
		'rows' : batch,
		'score': False,
	})

	try:
		r = solr.add(places_updates, fieldUpdates={'parents': 'set', 'parents_json': 'set'})
	except pysolr.SolrError as se:
		# catch bug, raise if something else
		if "TransactionLog" not in se.message or "java.util.UUID" not in se.message :
			raise

solr.commit()

print "done " + str(start) + "(from " + str(total) + ")"
