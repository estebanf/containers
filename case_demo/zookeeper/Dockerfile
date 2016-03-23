FROM estebanf/alpine_java
ADD zookeeper-3.4.6.zip /zookeeper-3.4.6.zip
RUN unzip  /zookeeper-3.4.6.zip && \
	rm /zookeeper-3.4.6.zip
EXPOSE 2181
ENTRYPOINT ["/zookeeper-3.4.6/bin/zkServer.sh"]
CMD ["start-foreground"]
