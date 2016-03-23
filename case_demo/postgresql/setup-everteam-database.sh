#!/bin/bash

TEST=`psql -lqt -U postgres | cut -d \| -f 1 | grep -w everteamdb | wc -l`

echo "******CREATING DOCKER DATABASE******"
if [[ $TEST == "1" ]]; then
    # database exists
    # $? is 0
    exit 0
else
psql -U postgres <<-EOSQL
   CREATE ROLE everteamusr WITH LOGIN ENCRYPTED PASSWORD 'everteam' CREATEDB;
EOSQL

psql -U postgres <<-EOSQL
   CREATE DATABASE everteamdb WITH OWNER everteamusr TEMPLATE template0 ENCODING 'UTF8';
EOSQL

psql -U postgres <<-EOSQL
   GRANT ALL PRIVILEGES ON DATABASE everteamdb TO everteamusr;
EOSQL
export PGPASSWORD='everteam'
psql -U everteamusr -d everteamdb < /postgres_et_5.2.sql
fi
echo ""
echo "******DOCKER DATABASE CREATED******"