#!/bin/bash
docker exec -ti case_demo_db pg_dump -b -c -f everteamdb_backup.sql -F plain -O -v -x --column-inserts --quote-all-identifiers -U everteamusr -d everteamdb
docker exec -ti case_demo_db pg_dump -b -c -f casedb_backup.sql -F plain -O -v -x --column-inserts --quote-all-identifiers -U caseusr -d casedb
docker cp case_demo_db:/everteamdb_backup.sql ./everteamdb_backup.sql
docker cp case_demo_db:/casedb_backup.sql ./casedb_backup.sql

