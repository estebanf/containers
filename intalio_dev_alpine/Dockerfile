FROM estebanf/alpine_java
COPY everteam-bpms-ee-7.7.0-tomcat-7.0.68.zip /home
WORKDIR /home
RUN unzip everteam-bpms-ee-7.7.0-tomcat-7.0.68.zip
COPY license /home/everteam-bpms-ee-7.7.0-tomcat-7.0.68/var/config
RUN rm everteam-bpms-ee-7.7.0-tomcat-7.0.68.zip
RUN chmod -R 700 everteam-bpms-ee-7.7.0-tomcat-7.0.68
EXPOSE 8080 9092
WORKDIR everteam-bpms-ee-7.7.0-tomcat-7.0.68/bin
RUN chmod +x *.sh
CMD ["/home/everteam-bpms-ee-7.7.0-tomcat-7.0.68/bin/catalina.sh","run"]
