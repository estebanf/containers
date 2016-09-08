set JAVA_OPTS=-XX:+DisableExplicitGC -XX:MaxPermSize=512m -Xms64m -Xmx512m -Dfile.encoding=UTF-8 -Djavax.net.ssl.trustStore="%CATALINA_HOME%\var\config\intalio-keystore.jks" -DINTALIO_CONF="%CATALINA_HOME%\var\config" -Dode.connection.isolation=2 -Dbtm.root="%CATALINA_HOME%" -Dbitronix.tm.configuration="%CATALINA_HOME%\var\config\btm-config.properties"
set JAVA_OPTS=%JAVA_OPTS% -Dh2.baseDir="%CATALINA_HOME%\var\h2"
set JAVA_OPTS=%JAVA_OPTS% -Dh2.port=9092
set JAVA_OPTS=%JAVA_OPTS% -Dh2.serverCachedObjects=2048
set JAVA_OPTS=%JAVA_OPTS% -Ddbfeed.transport.local=true
set JAVA_OPTS=%JAVA_OPTS% -Dintalio.contextPath="%CATALINA_HOME%\webapps\everteam"
