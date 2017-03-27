'''
Created on 4 Nov 2010

@author: dev
'''

# pythons
import sys
import time
import datetime
import urllib


# libraries
import solr
import uuid
#import rdfobject

import csv
import codecs

# created
import solrconfig
import csvtordf
import relationships

fieldmap_path = '../../../pylons/web/web/lib' 
sys.path.append( fieldmap_path )
import fieldmap

# These two lines are hacks. They switch the default encoding to utf8 so that the command line will convert UTF8 + Ascii to UTF8
reload(sys)
sys.setdefaultencoding("utf8")

   
def plural_to_singular( plural ):
    if plural == 'people' :
        return "person"
   
    return plural[:-1]

# def add_entity( entity, resource, predicate, object ):
#     entity.add_triple( resource, predicate, object )
#     return

def add_solr( item, key, value ):
    if key in item :
        currentitem = item[key]
        if isinstance( currentitem, list) :
            item[key].append( value )
        else :
            item[key] = [currentitem, value]
    else :
        item[key] = value
    return

def add( entity, solr_item, resource, predicate, object, prefix=None, transient=None, relationship=None ):
    
    if transient :
        solr_key = "%s-%s" % ( transient[csvtordf.predicate], predicate )
    else :
        solr_key = predicate
        
    if prefix :
        solr_key = "%s-%s" % ( solr_key, prefix )
        solr_value = "%s%s" % ( prefix, object )
    else :
        solr_value = object
        
    if relationship :
        solr_key = "%s-%s" % ( solr_key, relationship )
         
    add_solr( solr_item, solr_key, solr_value )
    
    # if entity:
    #     if transient != None:
    #         transient_uri = "%s/%s" % ( resource, transient[csvtordf.transient] )
    #
    #         add_entity( entity, resource, transient[csvtordf.predicate], transient_uri ) # this can be repeatedly created but it is safely ignored by rdfobject code
    #         add_entity( entity, transient_uri, predicate, object )
    #     else:
    #         add_entity( entity, resource, predicate, object )
        
    return


def create_uri( base, type, uid ):  # base ends with "/"
    return "%s%s/%s" % (base, type, uid)


def create_uri_quick( baseAndType, uid ):  # baseAndType ends with "/"
    return baseAndType + uid


def add_to_solr( sol, items ):
    total = len( items )
    start = 0
    batch = 1000
  
    while start < total:
        print start,
        sol.add_many( items[start:start+batch], False )
        start += batch


def GenerateIds( indexing, red_ids ):
    #
    # Create ID's for all entities.
    #
    errored = False
        
    for con in csvtordf.conversions:
 
        id_field = con[csvtordf.title_singular] + "_id"
        for csv_file in csvtordf.csv_files[con[csvtordf.title_plural]]:

            print "  - " + csv_file
            
            csv_file_location = csvtordf.common['csv_source_directory_root'] + csv_file

            csv_file = codecs.open( csv_file_location, encoding="utf-8", mode="rb")
            csv_data = csv.DictReader( csv_file, restval="" )

            if csv_file is not None:

                for csv_row in csv_data:

                    editid = csv_row[id_field].strip()

                    if not red_ids.exists( editid ) :
                        red_ids.set( editid, uuid.uuid4() )

            else:
                errored = True
                print "Error - Can't open file=" + csv_file_location

        # Rest a while, you've worked hard enough
        time.sleep(1)
    
    return errored


def ClearSolrData( indexing ):
    #
    # Clear settings
    #
    print " - Removing existing data from staging Solr cores:"
    
    for index in indexing:
        sol = solr.SolrConnection( solrconfig.solr_urls_stage[index] )
        sol.delete_query( "*:*" )
        sol.commit()
        sol.close()
        
        print "   - " + index + " emptied." 

    sol = solr.SolrConnection( solrconfig.solr_urls_stage['all'] )
    if len(indexing) == 8 :
        # We need to delete everything so do it quickly
        sol.delete_query( "*:*" )

    else :
        for index in indexing:
            sol.delete_query( "object_type:" + plural_to_singular( index ) )
        
    sol.commit()
    sol.close()
    
    print '   - "all" cleared of selected objects'

def SolrOptimize( indexing ):
    #
    # Clear settings
    #
    print " - Optimize Solr data"

    for index in indexing:
        sol = solr.SolrConnection( solrconfig.solr_urls_stage[index] )
        sol.optimize()
        sol.close()

        print "   - " + index + " optimized."

    sol = solr.SolrConnection( solrconfig.solr_urls_stage['all'] )

    sol.optimize()
    sol.close()

    print '   - all optimized.'

def StoreRelations( indexing, red_temp ):
    # 
    # open the relationship file and store the relations 
    #
    print " - Clearing old relationships."
    red_temp.flushdb()
    
    indexing_singular = []
    for index in indexing:
        indexing_singular.append( plural_to_singular( index ) )
    
    error = False
    error_rel = []
    for csv_file in csvtordf.csv_files['relationships']:
        
        print "  - " + csv_file,
        
        csv_file_location = csvtordf.common['csv_source_directory_root'] + csv_file

        csv_codec_file = codecs.open( csv_file_location, encoding="utf-8", mode="rb")
        csv_records = csv.DictReader( csv_codec_file, restval="" )

        if csv_codec_file :
            # print "("+ str(len(csv_records)) + ")",
        
            record_count = 0
            for num, record in enumerate( csv_records ):
                record_count += 1

                if record_count % 10000 == 0:
                    print str(record_count / 10000),
                    time.sleep( 0.5 )

                left_thing = record['left_table_name'].split('_')[-1]
                right_thing = record['right_table_name'].split('_')[-1]

                left_add = left_thing in indexing_singular
                right_add = right_thing in indexing_singular
                
                if left_add or right_add:
                    relationship_type = record['relationship_type'].split('_', 2 )[-1]
                       
                    try:   
                        left_to_right_rel, right_to_left_rel = relationships.getRdfRelationshipsLeftRight( left_thing, relationship_type, right_thing )
                       
                        left = record['left_id_value']
                        right = record['right_id_value']
                       
                        if left_add :
                            red_temp.sadd(left + ":rel", "%s::%s::%s" % (left_to_right_rel, right, right_thing) )
                         
                        if right_add :
                            red_temp.sadd(right + ":rel", "%s::%s::%s" % (right_to_left_rel, left, left_thing) )
    
                    except :
                        error = True
                        if relationship_type not in error_rel:
                            error_rel.append(relationship_type)
                            print "Error - Problem with relationship: " + left_thing, right_thing, relationship_type + " (Does it need adding to relationships.py?)"
                            print "Number:" + str(num) + " Record:" + str(record) 
           
            print ""
            
        else:
            error = True
            print "Error - Can't open file=" + csv_file_location

        csv_codec_file.close()

    return error


def FillRdfAndSolr( indexing, red_ids, red_temp, create_file_entities ):
    #
    # open / create the file entity store for each type
    #
    
    uri_base = csvtordf.common['file_entity_uri_base']
    sol_all = solr.SolrConnection( solrconfig.solr_urls_stage['all'] )
    
    for con in csvtordf.conversions:
    
        if con[csvtordf.title_plural] in indexing :
    
            singular = con[csvtordf.title_singular]
            plural = con[csvtordf.title_plural]
           
            print "- Converting " + plural
           
            if create_file_entities :
                print "Warning: We are NOT creating entities anymore!"
                # uri_entity_base = uri_base + singular
                # entitystore_directory = csvtordf.common['file_entity_storage_root'] + plural
           
                # fileEntity = rdfobject.FileEntityFactory(uri_base=uri_entity_base,
                #                                storage_dir = entitystore_directory,
                #                                prefix = csvtordf.common['file_entity_prefix'] )
           
            sol = solr.SolrConnection( solrconfig.solr_urls_stage[plural] )
           
            # Keep track of what is happening with these
            timeStart = time.time()
            record_count = 0
           
            id_field = singular + "_id"
            uri_base_with_type = uri_base + singular + "/"
           
            now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ" )
           
            csvs = csvtordf.csv_files[plural]  # This is more than likely to be a single csv only
           
            for csv_file in csvs:
                #
                # open each csvfile and output to entity store as rdf
                #
                csv_file_location = csvtordf.common['csv_source_directory_root'] + csv_file
                print "  - CSV file:  " + csv_file_location,

                csv_codec_file = codecs.open( csv_file_location, encoding="utf-8", mode="rb")
                csv_records = csv.DictReader( csv_codec_file, restval="" )

                csv_fields = None
               
                translation_errors = []
                solr_list = []


                for record in csv_records :
                    csv_fields = record.keys()
                    break

                for record in csv_records :

                    record_count += 1

                    if record_count % 1000 == 0:
                        print record_count,
                        # rest a while, give something else a chance!
                        time.sleep( 0.5 )
                   
                    editid = record[id_field]
                   
                    # Get ID, create uri then start editid_relnew entity
                    uid = red_ids.get( editid )
                    uri = create_uri_quick( uri_base_with_type, uid )
                    
                    entity = None
                    # if create_file_entities :
                    #     try:
                    #         entity = fileEntity.get(uri)
                    #     except Exception as ex:
                    #         print "Error - UID = " + uid + " URI = " + uri + " Exception:" + str(ex)
                   
                    #
                    # Add common object predicates
                    #
                   
                    # if entity :
                    #     entity.add_namespaces({
                    #         'dcterms' : 'http://dublincore.org/documents/dcmi-terms/',
                    #         'ox'      : 'http://vocab.ox.ac.uk/'
                    #     })

                    solr_item = {
                        "sid" : record_count,
                        "object_type" : singular
                    }

                    add( entity, solr_item, uri, fieldmap.get_core_id_fieldname(),
                         uri, fieldmap.get_uri_value_prefix() )
                    add( entity, solr_item, uri, fieldmap.get_core_id_fieldname(),
                         uid, fieldmap.get_uuid_value_prefix() )
                    add( entity, solr_item, uri, fieldmap.get_date_added_fieldname(), now )
                   
                    #
                    # Add predicates and objects from csv
                    #
                   
                    # entity.add_namespaces(con[csvtordf.namespaces])
                   
                    translations = con[csvtordf.translations]
                    for field in csv_fields: 
                       
                        if field not in translations :
                            if field not in translation_errors:
                                translation_errors.append(field)
                                print "Warning: '" + field + "' not found in csvtordf.py file. Skipping that particular field."
                        else :
                            translation = translations[field]
                          
                            if translation and ( translation[csvtordf.predicate] or translation[csvtordf.solr] ):
                                data = ''
                                if field in record :
                                    data = record[field].strip()
                                else :
                                    print "Warning: '" + str(field) + "' not found in record. Record:" + str(record) + " . Skipping that particular field."

                                if data != '' :
                                  
                                    # Convert data if a function present
                                    if csvtordf.converter in translation :
                                        converter = translation[csvtordf.converter]
                                        data = converter(data)
                                      
                                    # check to see whether we need to ignore this value
                                    if csvtordf.ignoreIfEqual not in translation or translation[csvtordf.ignoreIfEqual] != data :
                                       
                                        if translation[csvtordf.predicate] :
                                            prefix = translation.get( csvtordf.prefix, None )
                                            transient = translation.get( csvtordf.transient, None )
                                          
                                            add( entity, solr_item, uri, translation[csvtordf.predicate], data, prefix=prefix, transient=transient )    
                                      
                                        else:  # translation[csvtordf.solr]:
                                            add_solr( solr_item, translation[csvtordf.solr], data )

                   
                    #
                    # Add additional predicates not in CSV files
                    #
                    additional = con[csvtordf.additional]
                    for predicate, object in additional.iteritems():
                        add( entity, solr_item, uri, predicate, object )

                   
                    #
                    # Add relationships
                    #
                    editid_rel = editid + ":rel"
                    cardinal = red_temp.scard( editid_rel )
                   
                    if cardinal > 0 :
                        # if entity :
                        #     entity.add_namespaces( relationships.namespaces )
                       
                        for _ in range( cardinal ):
                            
                            rel = red_temp.spop( editid_rel )

                            parts = rel.split("::")
                                                 
                            uid_relationship = red_ids.get( parts[1] )
                            uri_relationship = create_uri( uri_base, parts[2], uid_relationship )
                            
                            add( entity, solr_item, uri, parts[0] , uri_relationship, relationship=parts[2] )

                  
                    # if entity:
                    #    entity.commit()
                        
                    solr_list.append(solr_item)
                   
                print ""
               
                print "    -  Adding to Solr " + plural,
                add_to_solr( sol, solr_list )
                print ""
               
                print "    -  Adding to Solr All",
                add_to_solr( sol_all, solr_list )
                print ""

                csv_codec_file.close()
                del solr_list[:]


            if len( csvs ) > 0 :
                # len(csvs) > 0 is a debugging check, we should always have at least one unless we've
                #  commented something out ( - otherwise, what's the point!)
                print "  -  Committing to Solr " + plural
                sol.commit()
                sol.close()
               
                timeEnd = time.time()
                print "- Done. Added " + str(record_count) + " records in %0.1f seconds." % ( timeEnd-timeStart)
    
    
    print '- Committing to solr "all" repository'  
    sol_all.commit()
    sol_all.close()
    

def SwitchSolrCores( indexing ) :

    print '- Switching from staging cores'

    for core_name, solr_url_stage in solrconfig.solr_urls_stage.iteritems():

        if core_name in indexing or ( core_name == 'all' and len(indexing) == 8 ) :

            # http://localhost:8983/solr/admin/cores?action=swap&core=people&other=people_stage
            swapurl = solrconfig.solr_base_url + 'admin/cores?action=swap'

            swapurl += '&core=' + solr_url_stage.replace( solrconfig.solr_base_url, '' )
            swapurl += '&other=' + solrconfig.solr_urls[core_name].replace( solrconfig.solr_base_url, '' )

            print "Switching ", core_name, ":", swapurl

            urllib.urlopen( swapurl )


    

    
    
    
    
