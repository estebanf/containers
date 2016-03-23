#!/bin/bash

TEST=`psql -lqt -U postgres | cut -d \| -f 1 | grep -w casedb | wc -l`


echo "******CREATING DOCKER DATABASE******"
if [[ $TEST == "1" ]]; then
    # database exists
    # $? is 0
    exit 0
else
psql -U postgres <<-EOSQL
   CREATE ROLE caseusr WITH LOGIN ENCRYPTED PASSWORD 'case' CREATEDB;
EOSQL

psql -U postgres <<-EOSQL
   CREATE DATABASE casedb WITH OWNER caseusr TEMPLATE template0 ENCODING 'UTF8';
EOSQL

psql -U postgres <<-EOSQL
   GRANT ALL PRIVILEGES ON DATABASE casedb TO caseusr;
EOSQL
export PGPASSWORD='case'
psql -U caseusr -d casedb -a -f /casedb.sql
fi
echo ""
echo "******DOCKER DATABASE CREATED******"