
import sys, json

import solr
if '../' not in sys.path:
	sys.path.insert(0, '../../../../pylons/web/web/lib') # Add workspace files into path. TODO: Fix!
	sys.path.insert(0, '../') # Add workspace files into path. TODO: Fix!

import solrconfig
import csvtordf

class SubsetExtract:

	def __init__(self):
		pass

	def extract( self ):

		query = 'object_type:resource AND dcterms\:relation:"www.hrionline.ac.uk"'

		print "Extracting subsets based on query:", query

		sol_all = solr.SolrConnection( solrconfig.solr_urls["all"] )

		batch = 100
		count = 0
		total = 1 # dummy first value
		first = True

		associated_work_uids = set()
		no_works = []

		while count < total:

			sol_response_all = sol_all.query( query, start=count, rows=batch,  fl="rdfs:seeAlso-work", score = False )

			if first:
				total = 5#sol_response_all.numFound # update total
				print "Total results found", total
				first = False

			for result in sol_response_all.results:
				if "rdfs:seeAlso-work" in result:
					for work_id in result["rdfs:seeAlso-work"]:
						associated_work_uids.add( work_id )
				else:
					no_works.append( result['id'] )

			count += batch

		print "Works found", len( associated_work_uids )
		print "Resources with no works", len( no_works)

		work_ids = list(associated_work_uids)[0:1]

		print work_ids
		works = self.get_records_from_solr( None, unique=work_ids )

		#print works

		# Convenient quick lookup
		conversions = {}
		for con in csvtordf.conversions:
			back_conversion = {}

			trans = con['translations']
			for key in trans.keys():
				if trans[key] is not None:
					if 'store' in trans[key] :
						back_conversion[trans[key]['store']] = key
					elif 'solr' in trans[key] :
						back_conversion[trans[key]['solr']] = key
					else:
						back_conversion[trans[key]['predicate']] = key

			conversions[con['title_singular']] = back_conversion

		#for k,v in conversions['work'].iteritems():
		#	print k,v

		# Print headers
		print "what"
		for id, work in works.iteritems():
			conversion = conversions[work['object_type']]

			if key in conversion:
				print key

		# print data
		for id, work in works.iteritems():
			conversion = conversions[work['object_type']]

			for key in work.keys():
				if key in conversion:
					# print key,conversion[key]
					pass




	def get_records_from_solr( uids, fields=None, unique=None ): # by id.

		results = {}

		if unique:
			uids_unique = unique
		else:
			uids_unique = {}.fromkeys(uids).keys() # Fast implementation to get unique list items

		total = len( uids_unique )

		if total > 0 :
			sol = solr.SolrConnection( solrconfig.solr_urls["all"] )

			batch = 200
			count = 0

			search_handler_raw = sol.raw_query
			json_loads = json.loads

			if fields == None:
				fields = '*'

			params = { 'fl':fields, 'start':0,'wt':'json','version':sol.response_version }

			while total > count:
				ids= uids_unique[count:count+batch]

				ids_safe = "uri\:" + " uri:".join(ids).replace(":","\:")
				res = json_loads(search_handler_raw( q="dcterms\:identifier-uri\::(" + ids_safe + ")", rows=len(ids), **params ) )['response']

				results.update( [result['dcterms:identifier-uri:'],result] for result in res['docs'] )
				count += batch

			sol.close()

		return results


if __name__ == "__main__" :

	se = SubsetExtract()

	se.extract()