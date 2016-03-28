#!/bin/bash
docker cp ./casedb_backup.sql /casedb_backup.sql
docker exec -ti case_demo_db psql -U caseusr -d casedb -a -f /casedb_backup.sql
docker cp ./everteamdb_backup.sql /everteamdb_backup.sql
docker exec -ti case_demo_db psql -U everteamusr -d everteamdb -a -f /everteamdb_backup.sql 

