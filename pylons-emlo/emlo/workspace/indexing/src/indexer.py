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
import redis
import solr
import uuid
#import rdfobject

# created
import solrconfig
import redisconfig
import csvtordf
import relationships

fieldmap_path = '../../../pylons/web/web/lib' 
sys.path.append( fieldmap_path )
import fieldmap

import csvhelper
import AdditionalSolr

   
def plural_to_singular( plural ):
    if plural == 'people' :
        return "person"
   
    return plural[:-1]

def add_entity( entity, resource, predicate, object ):
    entity.add_triple( resource, predicate, object )
    return

def add_solr( item, key, value ):
    if item.has_key( key ) :
        currentitem = item[key]
        if isinstance( currentitem, list) :
            item[key].append( value )
        else :
            newlist = []
            newlist.append( currentitem )
            newlist.append( value )
            
            item[key] = newlist
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
    
    if entity:
        if transient != None:
            transient_uri = "%s/%s" % ( resource, transient[csvtordf.transient] ) 
            
            add_entity( entity, resource, transient[csvtordf.predicate], transient_uri ) # this can be repeatedly created but it is safely ignored by rdfobject code
            add_entity( entity, transient_uri, predicate, object )
        else:
            add_entity( entity, resource, predicate, object )
        
    return


def create_uri( base, type, uid ): # base ends with "/"
    return "%s%s/%s" % (base, type, uid)


def create_uri_quick( baseAndType, uid ):# baseAndType ends with "/"
    return baseAndType + uid


def add_to_solr( sol, items ):
    total = len( items )
    start = 0
    batch = 1000
  
    while start < total:
        print str(start/batch),
        sol.add_many( items[start:start+batch], False )
        start += batch;


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
           
            ids = csvhelper.get_csv_field_data( csv_file_location, id_field )

            if ids != None:
                for editid in ids:
                    
                    if not red_ids.exists( editid ) :
                        red_ids.set( editid, uuid.uuid4() )
                    
                del ids
            else:
                errored = True
                print "Error - Can't open file=" + csv_file_location
    
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
        
        csv_records = csvhelper.get_csv_data_via_location( csv_file_location )
    
        if csv_records :
            print "("+ str(len(csv_records)) + ")",
        
            record_count = 0
            for num, record in enumerate( csv_records ):
                record_count += 1
            
                if record_count % 10000 == 0:
                    print str(record_count / 10000),
            
                left_thing = record['left_table_name'].split('_')[-1]
                right_thing = record['right_table_name'].split('_')[-1]
                
                left_add = right_add = False
                if left_thing in indexing_singular:
                    left_add = True
                if right_thing in indexing_singular: 
                    right_add = True
                
                if left_add or right_add:
                    relationship_type = record['relationship_type'].split('_', 2 )[-1]
                       
                    try:   
                        left_to_right_rel, right_to_left_rel = relationships.getRdfRelationshipsLeftRight( left_thing, relationship_type, right_thing )
                       
                        left = record['left_id_value']
                        right = record['right_id_value']
                       
                        if left_add :
                            red_temp.sadd(left + ":rel", ("%s::%s::%s") % (left_to_right_rel, right, right_thing) )
                         
                        if right_add :
                            red_temp.sadd(right + ":rel",("%s::%s::%s") % (right_to_left_rel, left, left_thing) )
    
                    except :
                        error = True
                        if relationship_type not in error_rel:
                            error_rel.append(relationship_type)
                            print "Error - Problem with relationship: " + left_thing, right_thing, relationship_type + " (Does it need adding to relationships.py?)"
                            print "Number:" + str(num) + " Record:" + str(record) 
           
            del csv_records
            print ""
            
        else:
            error = True
            print "Error - Can't open file=" + csv_file_location

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
                uri_entity_base = uri_base + singular
                entitystore_directory = csvtordf.common['file_entity_storage_root'] + plural
           
                fileEntity = rdfobject.FileEntityFactory(uri_base=uri_entity_base, 
                                                storage_dir = entitystore_directory, 
                                                prefix = csvtordf.common['file_entity_prefix'] )
           
            sol = solr.SolrConnection( solrconfig.solr_urls_stage[plural] )
           
            # Keep track of what is happening with these
            timeStart = time.time()
            record_count = 0
            property_count = 0 
           
            id_field = singular + "_id"
            uri_base_with_type = uri_base + singular + "/"
           
            now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ" )
           
            csvs = csvtordf.csv_files[plural]
           
            for csv_file in csvs:
                #
                # open each csvfile and output to entity store as rdf
                #
                csv_file_location = csvtordf.common['csv_source_directory_root'] + csv_file
                print "  - CSV file:  " + csv_file_location,
               
                csv_records = csvhelper.get_csv_data_via_location( csv_file_location )
                
                if len( csv_records ) > 0 :
                    csv_fields = csv_records[0].keys()
               
                translation_errors = []
                solr_list = []
                record_count_per_file = 0
               
                for record in csv_records :
                   
                    record_count += 1
                    record_count_per_file += 1
                   
                    solr_item = {}
                   
                    if record_count_per_file % 1000 == 0:
                        print str(record_count_per_file/1000),
                   
                    editid = record[id_field]
                   
                    # Get ID, create uri then start editid_relnew entity
                    uid = red_ids.get( editid )
                    uri = create_uri_quick( uri_base_with_type, uid )
                    
                    entity = None
                    if create_file_entities :
                        try:
                            entity = fileEntity.get(uri)
                        except Exception as ex:
                            print "Error - UID = " + uid + " URI = " + uri + " Exception:" + str(ex)
                   
                    #
                    # Add common object predicates
                    #
                   
                    if entity :
                        entity.add_namespaces({
                            'dcterms' : 'http://dublincore.org/documents/dcmi-terms/',
                            'ox'      : 'http://vocab.ox.ac.uk/' 
                        })
                        
                    add( entity, solr_item, uri, fieldmap.get_core_id_fieldname(), \
                         uri, fieldmap.get_uri_value_prefix() )
                    add( entity, solr_item, uri, fieldmap.get_core_id_fieldname(), \
                         uid, fieldmap.get_uuid_value_prefix() )
                    add( entity, solr_item, uri, fieldmap.get_date_added_fieldname(), now )
                    property_count += 3
                        
                    add_solr( solr_item, "sid", record_count )
                    add_solr( solr_item, "object_type", singular )
                   
                    #
                    # Add predicates and objects from csv
                    #
                   
                    #entity.add_namespaces(con[csvtordf.namespaces])
                   
                    translations = con[csvtordf.translations]
                    for field in csv_fields: 
                       
                        if field not in translations :
                            if field not in translation_errors:
                                translation_errors.append(field)
                                print "Warning: '" + field + "' not found in csvtordf.py file. Skipping that particular field."
                        else :
                            translation = translations[field]
                          
                            if translation and ( translation[csvtordf.predicate] or translation[csvtordf.solr] ):
                              
                                data = record[field].strip()
                                if data != '' :
                                  
                                    # Convert data if a function present
                                    if translation.has_key( csvtordf.converter ) :
                                        converter = translation[csvtordf.converter]
                                        data = converter(data)
                                      
                                    # check to see whether we need to ignore this value
                                    if not translation.has_key( csvtordf.ignoreIfEqual ) or translation[csvtordf.ignoreIfEqual] != data :                                                                           
                                       
                                        if translation[csvtordf.predicate] :
                                            prefix = translation.get( csvtordf.prefix, None )
                                            transient = translation.get( csvtordf.transient, None )
                                          
                                            add( entity, solr_item, uri, translation[csvtordf.predicate], data, prefix=prefix, transient=transient )    
                                      
                                        else: #translation[csvtordf.solr]:
                                            add_solr( solr_item, translation[csvtordf.solr], data )
                                           
                                        property_count += 1
                   
                    #
                    # Add additional predicates not in CSV files
                    #
                    additional = con[csvtordf.additional]
                    for predicate,object in additional.iteritems():
                        add( entity, solr_item, uri, predicate, object )
                       
                    property_count += len(additional)
                   
                    #
                    # Add relationships
                    #
                    editid_rel = editid + ":rel"
                    cardinal = red_temp.scard( editid_rel )
                   
                    if cardinal > 0 :
                        if entity :
                            entity.add_namespaces( relationships.namespaces )
                       
                        for i in range( cardinal ):
                            i = i # to hide warning
                            
                            rel = red_temp.spop( editid_rel )

                            parts = rel.split("::")
                                                 
                            uid_relationship = red_ids.get( parts[1] )
                            uri_relationship = create_uri( uri_base, parts[2], uid_relationship )
                            
                            add( entity, solr_item, uri, parts[0] , uri_relationship, relationship=parts[2] )

                            property_count += 1
                  
                    if entity:
                        entity.commit()
                        
                    solr_list.append(solr_item)
                   
                print ""
               
                print "    -  Adding to Solr " + plural,
                add_to_solr( sol, solr_list )
                print ""
               
                print "    -  Adding to Solr All",
                add_to_solr( sol_all, solr_list )
                print ""
                   
                del solr_list[:]
                   
            if len( csvs ) > 0 : # This is a debugging check, we should always have at least one unless we've commented something out ( - otherwise, what's the point!)
                print "  -  Committing to Solr " + plural
                sol.commit()
                sol.close()
               
                timeEnd = time.time();
                print "- Done. Added " + str(record_count) + " records in %0.1f seconds." % ( (timeEnd-timeStart))
    
    
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

           print "Switching ", core_name,":", swapurl

           urllib.urlopen( swapurl )


    

    
    
    
    
