FROM estebanf/base_java
COPY intalio-bpms-ee-7.6.1-tomcat-7.0.64.zip /opt
COPY license /opt
WORKDIR /opt
RUN unzip intalio-bpms-ee-7.6.1-tomcat-7.0.64.zip && \
	mv license intalio-bpms-ee-7.6.1-tomcat-7.0.64/var/config && \
	rm -rf intalio-bpms-ee-7.6.1-tomcat-7.0.64/var/deploy/AbsenceRequest/ && \
	rm -rf intalio-bpms-ee-7.6.1-tomcat-7.0.64/var/deploy/HelloWorld/ && \
	rm -rf intalio-bpms-ee-7.6.1-tomcat-7.0.64/webapps/apacheds/ && \
	rm intalio-bpms-ee-7.6.1-tomcat-7.0.64/conf/Catalina/localhost/apacheds.xml && \
	rm intalio-bpms-ee-7.6.1-tomcat-7.0.64.zip && \
	chmod -R 700 intalio-bpms-ee-7.6.1-tomcat-7.0.64 && \ 
	chmod +x intalio-bpms-ee-7.6.1-tomcat-7.0.64/bin/*.sh
COPY everteam.war /opt/intalio-bpms-ee-7.6.1-tomcat-7.0.64/webapps
EXPOSE 8080
CMD ["/opt/intalio-bpms-ee-7.6.1-tomcat-7.0.64/bin/catalina.sh","run"]
