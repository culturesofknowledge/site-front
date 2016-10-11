#! /bin/bash
# This script should be run in /home/dev/workspace/indexing/src

clear
echo ''
echo "Will generate a new schema.xml for all eight individual cores plus the combined 'all' core."
echo ''
echo -n 'Do you want to proceed? (y/n) '
answer=$(line)

if [ "$answer" = "y" -o "$answer" = "Y" ]
then
  for core in comment       \
              image         \
              institution   \
              location      \
              manifestation \
              person        \
              resource      \
              work          \
              all
  do
    echo ''
    echo $core
    echo ''

    ./one_schemawriter.sh $core y
  done

else
  echo 'Cancelled.'
fi
