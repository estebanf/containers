#test
FROM ubuntu:14.04
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get install -y python-software-properties software-properties-common
RUN add-apt-repository -y ppa:webupd8team/java
RUN apt-get update
RUN echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | sudo /usr/bin/debconf-set-selections
RUN apt-get install -y vim unzip oracle-java7-installer oracle-java7-set-default
COPY intalio-bpms-ee-7.6.1-tomcat-7.0.64.zip /opt
COPY license /opt
WORKDIR /opt
RUN unzip intalio-bpms-ee-7.6.1-tomcat-7.0.64.zip
RUN mv license intalio-bpms-ee-7.6.1-tomcat-7.0.64/var/config
RUN rm intalio-bpms-ee-7.6.1-tomcat-7.0.64.zip
RUN chmod -R 700 intalio-bpms-ee-7.6.1-tomcat-7.0.64
EXPOSE 8080 9092
WORKDIR intalio-bpms-ee-7.6.1-tomcat-7.0.64/bin
RUN chmod +x *.sh
CMD ["/opt/intalio-bpms-ee-7.6.1-tomcat-7.0.64/bin/catalina.sh","run"]
