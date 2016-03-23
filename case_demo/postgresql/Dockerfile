FROM postgres
RUN apt-get update && \
	apt-get install -y vim
ENV POSTGRES_PASSWORD=everteam
ADD BPMS.sql /BPMS.sql
ADD postgres_et_5.2.sql /postgres_et_5.2.sql
ADD casedb.sql /casedb.sql
ADD setup-intalio-database.sh /docker-entrypoint-initdb.d/setup-intalio-database.sh
RUN chmod 755 /docker-entrypoint-initdb.d/setup-intalio-database.sh
ADD setup-everteam-database.sh /docker-entrypoint-initdb.d/setup-everteam-database.sh
RUN chmod 755 /docker-entrypoint-initdb.d/setup-everteam-database.sh
ADD setup-case-database.sh /docker-entrypoint-initdb.d/setup-case-database.sh
RUN chmod 755 /docker-entrypoint-initdb.d/setup-case-database.sh
EXPOSE 5432
