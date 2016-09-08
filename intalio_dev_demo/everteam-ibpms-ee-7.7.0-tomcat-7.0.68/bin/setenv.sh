#!/bin/sh
JAVA_OPTS="-server -XX:MaxPermSize=4096m -Xms1024m -Xmx4096m -Dfile.encoding=UTF-8"
#this is needed as Intalio uses reserve keyword while parsing
JAVA_OPTS="$JAVA_OPTS -Dorg.apache.el.parser.SKIP_IDENTIFIER_CHECK=true"
JAVA_OPTS="$JAVA_OPTS -DINTALIO_CONF=$CATALINA_HOME/var/config"
JAVA_OPTS="$JAVA_OPTS -Dode.connection.isolation=2"
JAVA_OPTS="$JAVA_OPTS -Dh2.baseDir=$CATALINA_HOME/var/h2"
JAVA_OPTS="$JAVA_OPTS -Dh2.port=9092"
JAVA_OPTS="$JAVA_OPTS -Dh2.serverCachedObjects=2048"
JAVA_OPTS="$JAVA_OPTS -Ddbfeed.transport.local=true"
JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$CATALINA_HOME/var/config/intalio-keystore.jks"
JAVA_OPTS="$JAVA_OPTS -Dbtm.root=$CATALINA_HOME -Dbitronix.tm.configuration=$CATALINA_HOME/var/config/btm-config.properties"
JAVA_OPTS="$JAVA_OPTS -Dbtm.root=$CATALINA_HOME -Dcom.sun.management.jmxremote"
JAVA_OPTS="$JAVA_OPTS -Dlog4j.configuration=file://$CATALINA_HOME/var/config/log4j.xml"
JAVA_OPTS="$JAVA_OPTS -Dintalio.contextPath=$CATALINA_HOME/webapps/everteam"

export JAVA_OPTS
