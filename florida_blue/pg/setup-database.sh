#!/bin/bash

TEST=`psql -lqt -U postgres | cut -d \| -f 1 | grep -w demofloridablue | wc -l`


echo "******CREATING DOCKER DATABASE******"
if [[ $TEST == "1" ]]; then
    # database exists
    # $? is 0
    exit 0
else
psql -U postgres <<-EOSQL
   CREATE ROLE bpms WITH LOGIN ENCRYPTED PASSWORD 'bpms' CREATEDB;
EOSQL

psql -U postgres <<-EOSQL
   CREATE DATABASE demofloridablue WITH OWNER bpms TEMPLATE template0 ENCODING 'UTF8';
EOSQL

psql -U postgres <<-EOSQL
   GRANT ALL PRIVILEGES ON DATABASE demofloridablue TO bpms;
EOSQL
export PGPASSWORD='bpms'
psql -U bpms -d demofloridablue -a -f /demofloridablue.sql
fi
echo ""
echo "******DOCKER DATABASE CREATED******"