FROM estebanf/alpine_java
COPY everteam-ibpms-ee-7.7.0-tomcat-7.0.68.zip /home
WORKDIR /home
RUN unzip everteam-ibpms-ee-7.7.0-tomcat-7.0.68.zip
COPY license /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/config
RUN rm everteam-ibpms-ee-7.7.0-tomcat-7.0.68.zip
RUN chmod -R 700 everteam-ibpms-ee-7.7.0-tomcat-7.0.68
EXPOSE 8080 9092
WORKDIR everteam-ibpms-ee-7.7.0-tomcat-7.0.68/bin
RUN chmod +x *.sh
CMD ["/home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/bin/catalina.sh","run"]
