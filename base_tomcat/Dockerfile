FROM estebanf/base_java
RUN apt-get update && \
	apt-get install -y vim unzip curl && \
	mkdir -p /everteam/everteam_5.2.0
WORKDIR /opt
RUN curl -O http://mirror.metrocast.net/apache/tomcat/tomcat-7/v7.0.68/bin/apache-tomcat-7.0.68.tar.gz && \
	tar -xvzf apache-tomcat-7.0.68.tar.gz && \
	rm apache-tomcat-7.0.68.tar.gz
WORKDIR apache-tomcat-7.0.68/bin
CMD ["./catalina.sh","run"]
