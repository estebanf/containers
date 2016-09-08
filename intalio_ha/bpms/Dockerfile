FROM estebanf/alpine_java
COPY everteam-ibpms-ee-7.7.0-tomcat-7.0.68.zip /home
WORKDIR /home
RUN unzip everteam-ibpms-ee-7.7.0-tomcat-7.0.68.zip
COPY license /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/config
COPY resources.properties /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/config
COPY server.xml /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/conf
COPY mysql-connector-java-5.0.8-bin.jar /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/lib
COPY deploy-service.xml /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/config
COPY cluster-config.xml /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/config
COPY ode-axis2.properties /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/config
COPY http-config.properties /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/config
COPY deploy.xml /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/deploy/TaskManager/TaskManager.ode
COPY base-config.properties /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/config/common
COPY catalina.sh /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/bin
COPY workflow.properties /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/config/workflow
COPY setenv.sh /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/bin
RUN rm everteam-ibpms-ee-7.7.0-tomcat-7.0.68.zip
RUN rm -rf /home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/var/deploy
RUN chmod -R 700 everteam-ibpms-ee-7.7.0-tomcat-7.0.68
EXPOSE 8080 7771
WORKDIR everteam-ibpms-ee-7.7.0-tomcat-7.0.68/bin
RUN chmod +x *.sh
CMD ["/home/everteam-ibpms-ee-7.7.0-tomcat-7.0.68/bin/catalina.sh","run"]
