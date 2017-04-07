__author__ = 'sers0034'

import sys, time, subprocess
import codecs, os, tempfile

import redis

import redisconfig
import csvtordf

import AdditionalSolr

# For remote debug inside Dockers
#import pydevd
#pydevd.settrace('129.67.193.177', port=55157, stdoutToServer=True, stderrToServer=True)

fieldmap_path = '../../../pylons/web/web/lib'
sys.path.append( fieldmap_path )
import fieldmap

import indexer

def GetSelection():
	print "CSV conversion to RDF and Solr"
	print "------------------------------"
	print ""
	print "This process needs Solr and Redis to be running. Some Solr data will be deleted then replaced."
	print "It will not create any RDF data in the entitystore only replace the Solr data."
	print "If you've updated a Solr schema remember to restart Solr before starting this process."
	print ""
	print "Which do you want to re-index?"
	print "    1. comments"
	print "    2. images"
	print "    3. institutions"
	print "    4. locations  "
	print "    5. manifestations"
	print "    6. people "
	print "    7. resources "
	print "    8. works"
	#print "    9. (skip id creation)"
	print "    x. exit"
	print ""

	response = raw_input( "Enter your combination here (e.g. 247) : ")
	if response == 'x' or response == 'X' :
		return [], False, "Exiting"

	try:
		int( response )
	except:
		return [], False, "No numbers selected, exiting."

	indexing = []
	if "1" in response:
		indexing.append("comments")
	if "2" in response:
		indexing.append("images")
	if "3" in response:
		indexing.append("institutions")
	if "4" in response:
		indexing.append("locations")
	if "5" in response:
		indexing.append("manifestations")
	if "6" in response:
		indexing.append("people")
	if "7" in response:
		indexing.append("resources")
	if "8" in response:
		indexing.append("works")

	if len( indexing ) <= 0:
		return [], False, "Incorrect numbers selected, exiting."

	skip_id_gen = False
	#if '9' in response:
	#	skip_id_gen = True

	return indexing, skip_id_gen, ""


def RunIndexing( indexing=None, skip_id_generation=False, skip_store_relations=False, skip_clean=False ) :

	if indexing is None :
		indexing, __skip_id_generation, message = GetSelection()

	if not len( indexing ) :
		sys.exit( message )

	# Start
	timeBegin = time.time()


	if not skip_clean :
		#
		# Clean CSVs of control characters
		#
		# A vertical tabulation character has found it's way into EMLO - this breaks pythons CSV reading ability (newlines where there shouldn't be newlines)
		# so I'm stripping them out.

		print "- Cleaning CSVs of rogue characters"
		timeStart = time.time()

		for csv_file_name in csvtordf.csv_files:

			csv_file_location = csvtordf.common['csv_source_directory_root'] + csvtordf.csv_files[csv_file_name][0]
			new_csv_file_location = csv_file_location + ".new"

			print "   -", csv_file_location

			with codecs.open( new_csv_file_location, encoding="utf-8", mode="w") as csv_file:

				with codecs.open( csv_file_location, encoding="utf-8", mode="r") as csv_file_original :

					for line in csv_file_original:

						line = line.replace( u'\u000B', '' )  # U+000B : <control-000B> (LINE TABULATION) {VERTICAL TABULATION [VT]}
						csv_file.write(line)

			os.rename( csv_file_location, csv_file_location + '.bak' )
			os.rename( csv_file_location + '.new', csv_file_location )

		timeEnd = time.time()
		print "  - Done (in %0.1f seconds)." % ( (timeEnd-timeStart))


	#
	# Create ID's
	#
	if not skip_id_generation:

		print "- Creating all IDs where needed:"
		timeStart = time.time()

		errored = subprocess.call( ["python index_generate_ids.py"], shell=True )

		if errored:
			sys.exit( "Sorry couldnt generate ids - there may be errors with the csv files which will need to be fixed. (It could be unicode problems, try removing the invalid lines)")
		else :
			timeEnd = time.time()
			print "  - Done (in %0.1f seconds)." % ( (timeEnd-timeStart))

	#
	# Clear Settings
	#
	indexer.ClearSolrData( indexing )

	#
	# open redis relations database
	#
	red_temp = redis.Redis(host=redisconfig.host, db=redisconfig.db_temp_cofk_create)

	#
	# Store relationships
	#
	if not skip_store_relations:

		red_temp.flushdb()

		timeStart = time.time()
		print "- Storing relationships in temp Redis database:"

		# errored = indexer.StoreRelations( indexing, red_temp )
		errored = subprocess.call( ["python index_store_relations.py"], shell=True )

		if errored:
			sys.exit( "Sorry, relations problem. There maybe errors with the csv files which will need to be fixed. (It could be unicode problems, try removing the invalid lines)")
		else:
			timeEnd = time.time()
			print "  - Done (in %0.1f seconds)." % (timeEnd-timeStart)


	#
	# Open Redis ID database
	#
	red_ids = redis.Redis(host=redisconfig.host, db=redisconfig.db_object_ids)

	#
	# Save the RDF and output to Solr
	#
	indexer.FillRdfAndSolr( indexing, red_ids, red_temp, False )


	#
	# Update Works if needed
	#
	if 'works' in indexing :
		AdditionalSolr.AdditionalWorksData()

	#
	# Switch from the staging cores to real ones.
	#
	indexer.SolrOptimize( indexing )
	indexer.SwitchSolrCores( indexing )

	#
	# We don't need to keep the old data so clear it out.
	#
	indexer.ClearSolrData( indexing )

	#
	# Done!
	#
	timeFinished = time.time()
	print "Conversion completed in %0.1f seconds." % ( (timeFinished-timeBegin))


if __name__ == '__main__':

	# These two lines are hacks. They switch the default encoding to utf8 so that the command line will convert UTF8 + Ascii to UTF8
	reload(sys)
	sys.setdefaultencoding("utf8")

	sys.path.append( fieldmap_path )

	# debug = True
	debug = False

	if debug :
		print "Using test csv data..."
		print
		csvtordf.csv_files = csvtordf.test_csv_files

	index_all = [
		"comments",
		"images",
		"institutions",
		"locations",
		"manifestations",
		"people",
		"resources",
		"works"
	]

	if len( sys.argv ) == 0 :
		RunIndexing( index_all, False, False, False )

	else :

		index = index_all
		if "ask" in sys.argv :
			index = None
		elif "locations" in sys.argv :
			index = ["locations"]
		elif "comments" in sys.argv :
			index = ["comments"]
		elif "people" in sys.argv :
			index = ["people"]
		elif "manifestations" in sys.argv :
			index = ["manifestations"]

		RunIndexing( index, "skipid" in sys.argv, "skiprel" in sys.argv, "skipclean" in sys.argv )

