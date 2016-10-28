#! /bin/bash
# This script should be run in /home/dev/workspace/indexing/src

core=$1
proceed=$2

if [ "$core" = "" ]
then
  echo ''
  echo 'Pass in core name as parameter 1, e.g. all, work, comment.'
  echo 'Please use the singular version of the core name, e.g. person not people.'
  echo ''
  exit
fi

if [ "$core" = "person" ]
then
  plural=people
elif [ "$core" = "all" ]
then
  plural=all
else
  plural=${core}s
fi

if [ "$proceed" = "" ]
then
  clear  # creating one file at a time, so clear screen because we don't need to see previous output
fi

echo "Creating a new schema.xml for core '$plural' in the current directory..."
echo

live_schema=/home/dev/solr/home/${plural}/conf/schema.xml

sed '1,$s/ChangeTheSchemaNameHere/'${plural}'/g' < startschema.txt > schema.xml

python ${core}_schemawriter.py 'M' >> schema.xml  # main fields
cat midschema.txt                  >> schema.xml
python ${core}_schemawriter.py 'C' >> schema.xml  # copy fields
cat endschema.txt                  >> schema.xml

if [ -f schema.xml ]
then
  echo ''
  date
  echo ''
  echo "****** '$plural' schema.xml has now been created ******"
  echo ''

  if [ "$proceed" = "" ]
  then
    echo 'Please review the current output file: schema.xml in the current directory.'
    echo 'If you are happy with it, it will overwrite the live version in: '
    echo $live_schema
    echo ''
    echo -n 'Are you happy to make the new schema file live? (y/n) '
    proceed=$(line)
  fi

  if [ "$proceed" = "y" -o "$proceed" = "Y" ]
  then
    \mv schema.xml $live_schema 
    echo ''
    echo "Moved new schema to live directory: $live_schema"
    echo ''
  else
    echo 'Cancelled.'
  fi

else
  echo 'An error seems to have occurred: failed to create schema.xml'
fi

