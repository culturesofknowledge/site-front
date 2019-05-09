# EMLO Server
A server to build emlo.bodleian.ox.ac.uk

## Prerequisites
You'll need Docker and Docker-compose installed. 

A copy of this git repository needs to be cloned.

## Build
Run the file create_solr_files.sh to generate needed auto conf files

    ./create_solr_files.sh

Run docker-compose to download, build and run as a daemon everything needed:

    docker-compose up -d --build
    
or just call the "start.sh" script

## Indexing
You'll need some data to index, drop the data in to the  "data" folder defined in the docker-compose file:
- comment.csv
- institution.csv
- manifestation.csv
- relationship.csv     
- work.csv
- image.csv 
- location.csv 
- person.csv
- relationship_type.csv
- resource.csv

then to run the indexer:

    docker-compose exec pylons /emlo/workspace/indexing/src/index.sh

(if docker-compose doesn't have exec use "docker exec" instead but you'll need the name of the container (docker ps) )
 
## Auto index
Install the crontab_sudo file to crontab, (you may need to update the file positions)

## Summary
- Install _docker_, _docker-compose_
- Run `docker-compose up -d --build`
- Put data in _data_ folder
- Run `docker-compose exec pylons /emlo/workspace/indexing/src/index.sh`
- Setup crontab
