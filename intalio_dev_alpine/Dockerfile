FROM estebanf/alpine_java
COPY intalio-bpms-ee-7.7.0-tomcat-7.0.68.zip /home
WORKDIR /home
RUN unzip intalio-bpms-ee-7.7.0-tomcat-7.0.68.zip
COPY license /home/intalio-bpms-ee-7.7.0-tomcat-7.0.68/var/config
RUN rm intalio-bpms-ee-7.7.0-tomcat-7.0.68.zip
RUN chmod -R 700 intalio-bpms-ee-7.7.0-tomcat-7.0.68
EXPOSE 8080 9092
WORKDIR intalio-bpms-ee-7.7.0-tomcat-7.0.68/bin
RUN chmod +x *.sh
CMD ["/home/intalio-bpms-ee-7.7.0-tomcat-7.0.68/bin/catalina.sh","run"]
