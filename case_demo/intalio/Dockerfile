FROM estebanf/base_java
ADD intalio-bpms-ee-7.7.0-tomcat-7.0.68.zip /intalio-bpms-ee-7.7.0-tomcat-7.0.68.zip
RUN unzip intalio-bpms-ee-7.7.0-tomcat-7.0.68.zip && \
	rm intalio-bpms-ee-7.7.0-tomcat-7.0.68.zip
ADD resources.properties /intalio-bpms-ee-7.7.0-tomcat-7.0.68/var/config/resources.properties
ADD license /intalio-bpms-ee-7.7.0-tomcat-7.0.68/var/config/license
EXPOSE 8080
ENTRYPOINT ["/intalio-bpms-ee-7.7.0-tomcat-7.0.68/bin/catalina.sh"]
CMD ["run"]