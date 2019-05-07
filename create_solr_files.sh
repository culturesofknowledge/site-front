#!/usr/bin/env bash

# if the solr instances have already been flipped you may need to switch stage1 with stage2 so it is pointing to the right core
stage1="_stage"
stage2=""

for name in all comments images institutions locations manifestations people resources works
do
	echo "#Written by CorePropertiesLocator
#`date`
name=${name}${stage1}" > solr-emlo/solr/home/${name}/core.properties

	echo "#Written by CorePropertiesLocator
#`date`
name=${name}${stage2}" > solr-emlo/solr/home/${name}_stage/core.properties

done
