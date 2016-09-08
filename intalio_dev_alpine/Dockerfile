FROM estebanf/alpine_java
COPY everteam-ibpms-ee-8.0.0-tomcat-8.0.36.zip /home
WORKDIR /home
RUN unzip everteam-ibpms-ee-8.0.0-tomcat-8.0.36.zip
COPY license /home/everteam-ibpms-ee-8.0.0-tomcat-8.0.36/var/config
COPY EmailWS.properties /home/everteam-ibpms-ee-8.0.0-tomcat-8.0.36/var/config
COPY mysql-connector-java-5.1.39-bin.jar /home/everteam-ibpms-ee-8.0.0-tomcat-8.0.36/lib
RUN rm everteam-ibpms-ee-8.0.0-tomcat-8.0.36.zip
RUN chmod -R 700 everteam-ibpms-ee-8.0.0-tomcat-8.0.36
EXPOSE 8080 9092
WORKDIR everteam-ibpms-ee-8.0.0-tomcat-8.0.36/bin
RUN chmod +x *.sh
CMD ["/home/everteam-ibpms-ee-8.0.0-tomcat-8.0.36/bin/catalina.sh","run"]
