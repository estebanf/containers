FROM estebanf/alpine_java
ADD et-solr-5.4.1.zip /et-solr-5.4.1.zip
ADD script.sh /script.sh
RUN unzip et-solr-5.4.1.zip && \
	rm et-solr-5.4.1.zip && \
	chmod +x /script.sh
EXPOSE 8983
ENTRYPOINT ["/script.sh"]