#!/usr/bin/env bash

# if the solr instances have already been flipped you may need to flip them back... see indexer.py

for name in all comments images institutions locations manifestations people resources works
do
	echo "#Written by CorePropertiesLocator
#`date`
name=${name}${stage1}" > solr-emlo/solr/home/${name}/core.properties
done

for name in all_stage comments_stage images_stage institutions_stage locations_stage manifestations_stage people_stage resources_stage works_stage
do
	echo "#Written by CorePropertiesLocator
#`date`
name=${name}${stage2}" > solr-emlo/solr/home/${name}/core.properties
done