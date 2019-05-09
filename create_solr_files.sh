#!/usr/bin/env bash

# if the solr instances have already been flipped you may need to switch variable stage1 with stage2 so it is points to the right cores
# alternatively you could run the switch script in pylons-emlo/emlo/workspace/indexing/src/switch-solr-cores.py
stage1=""
stage2="_stage"

for name in all comments images institutions locations manifestations people resources works
do
	echo "#Written by CorePropertiesLocator
#`date`
name=${name}${stage1}" > solr-emlo/solr/home/${name}/core.properties

	echo "#Written by CorePropertiesLocator
#`date`
name=${name}${stage2}" > solr-emlo/solr/home/${name}_stage/core.properties

done
