#!/bin/bash
echo "ZOO is..."
echo $ZOO
echo "Doing security json"
sh et-solr-5.4.1/server/scripts/cloud-scripts/zkcli.sh -zkhost "$ZOO":2181 -cmd putfile /security.json et-solr-5.4.1/server/solr/security.json
echo "Doing solr.xml"
sh et-solr-5.4.1/server/scripts/cloud-scripts/zkcli.sh -zkhost "$ZOO":2181 -cmd putfile /solr.xml et-solr-5.4.1/server/solr/solr.xml
echo "Starting..."
et-solr-5.4.1/bin/solr start -f -c -p 8983 -z "$ZOO":2181