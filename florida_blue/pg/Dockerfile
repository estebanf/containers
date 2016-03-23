FROM postgres:9.2
ENV POSTGRES_PASSWORD=everteam
ADD demofloridablue.sql /demofloridablue.sql
ADD setup-database.sh /docker-entrypoint-initdb.d/setup-database.sh
RUN chmod 755 /docker-entrypoint-initdb.d/setup-database.sh
