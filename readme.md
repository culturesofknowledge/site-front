# EMLO Server
A server to build emlo.bodleian.ox.ac.uk

## Prerequists
You'll need Docker and Docker-compose installed. 

A copy of this git repository needs to be cloned.

## Build
Run docker-compose to download, build and run as a daemon everything needed:

`docker-compose up -d --build`

## Indexing
You'll need some data to index, drop the data in to the  "data" folder:
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

`docker-compose exec pylons /emlo/workspace/indexing/src/index.sh`

(if docker-compose doesn't have exec use "docker exec" instead but you'll need the name of the container (docker ps) )
 
## Summary
- Install _docker_, _docker-compose_
- Run `docker-compose up -d --build`
- Put data in _data_ folder
- Run `docker-compose exec pylons /emlo/workspace/indexing/src/index.sh`
