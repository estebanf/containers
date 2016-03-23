FROM estebanf/alpine_tomcat
ADD everteam.5.2.war /everteam.5.2.war
RUN mkdir everteam && \
	mv /everteam.5.2.war everteam/ && \
	cd everteam && \
	unzip everteam.5.2.war && \
	rm everteam.5.2.war
ADD params.xml /everteam/params.xml
ADD web.xml	/everteam/WEB-INF/web.xml
ADD param.xml /everteam/apps/core/conf/param.xml
ADD param_esci.xml /everteam/apps/esci/conf/param.xml
ADD everteam.xml /usr/tomcat/conf/Catalina/localhost/everteam.xml
EXPOSE 8080