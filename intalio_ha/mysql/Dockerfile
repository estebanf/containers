FROM mysql:5.5
COPY BPMS.sql /docker-entrypoint-initdb.d/BPMS.sql
ENV MYSQL_ROOT_PASSWORD="ibpms" \
	MYSQL_DATABASE="ibpms" \
	MYSQL_USER="ibpms" \
	MYSQL_PASSWORD="ibpms"
