#!/bin/bash

TEST=`psql -lqt -U postgres | cut -d \| -f 1 | grep -w bpmsdb | wc -l`


echo "******CREATING DOCKER DATABASE******"
if [[ $TEST == "1" ]]; then
    # database exists
    # $? is 0
    exit 0
else
psql -U postgres <<-EOSQL
   CREATE ROLE bpmsusr WITH LOGIN ENCRYPTED PASSWORD 'bpms' CREATEDB;
EOSQL

psql -U postgres <<-EOSQL
   CREATE DATABASE bpmsdb WITH OWNER bpmsusr TEMPLATE template0 ENCODING 'UTF8';
EOSQL

psql -U postgres <<-EOSQL
   GRANT ALL PRIVILEGES ON DATABASE bpmsdb TO bpmsusr;
EOSQL
export PGPASSWORD='bpms'
psql -U bpmsusr -d bpmsdb -a -f /BPMS.sql
fi
echo ""
echo "******DOCKER DATABASE CREATED******"