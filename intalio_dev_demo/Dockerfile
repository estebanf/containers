FROM estebanf/alpine_java
COPY everteam.tar.gz /home
WORKDIR /home
RUN tar -xvzf everteam.tar.gz
RUN rm everteam.tar.gz
RUN chmod -R 700 everteam-ibpms-ee-7.7.0-tomcat-7.0.68
EXPOSE 8080 9092
WORKDIR everteam-ibpms-ee-7.7.0-tomcat-7.0.68/bin
RUN chmod +x *.sh
CMD ["/home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/bin/catalina.sh","run"]
