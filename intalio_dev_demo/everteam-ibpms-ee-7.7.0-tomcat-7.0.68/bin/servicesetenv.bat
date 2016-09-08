set "PR_JVMOPTIONS=-XX:MaxPermSize=512m;-Dfile.encoding=UTF-8;-Djavax.net.ssl.trustStore=%CATALINA_HOME%\var\config\intalio-keystore.jks;-Dode.connection.isolation=2;-Dbtm.root=%CATALINA_HOME%;-DINTALIO_CONF=%CATALINA_HOME%\var\config;-Dbitronix.tm.configuration=%CATALINA_HOME%\var\config\btm-config.properties;-Djava.io.tmpdir=%CATALINA_BASE%\temp;"

set "PR_JVMOPTIONS=%PR_JVMOPTIONS%-Dh2.baseDir=%CATALINA_HOME%\var\h2;"
set "PR_JVMOPTIONS=%PR_JVMOPTIONS%-Dh2.port=9092;"
set "PR_JVMOPTIONS=%PR_JVMOPTIONS%-Dh2.serverCachedObjects=2048;"
set "PR_JVMOPTIONS=%PR_JVMOPTIONS%-Ddbfeed.transport.local=true;"
set "PR_JVMOPTIONS=%PR_JVMOPTIONS%-Dintalio.contextPath=%CATALINA_HOME%\webapps\everteam;"

rem Comment for dbs other than the default h2 and mysql5
set "PR_JVMOPTIONS=%PR_JVMOPTIONS%-Dintalio.hibernate.dialect=org.hibernate.dialect.MySQL5Dialect"

rem Uncomment for Oracle 11g
rem set "PR_JVMOPTIONS=%PR_JVMOPTIONS%-Dintalio.hibernate.dialect=org.hibernate.dialect.Oracle10gDialect"
rem Uncomment for SQLServer
rem set "PR_JVMOPTIONS=%PR_JVMOPTIONS%-Dintalio.hibernate.dialect=org.hibernate.dialect.SQLServerDialect"
rem Uncomment for PostgreSQL
rem set "PR_JVMOPTIONS=%PR_JVMOPTIONS%-Dintalio.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect"


set "PR_CLASSPATH=%CATALINA_HOME%\bin\bootstrap.jar;%CATALINA_BASE%\bin\tomcat-juli.jar;%CATALINA_HOME%\bin\tomcat-juli.jar;%CATALINA_HOME%\bin\jcl-over-slf4j-1.7.6.jar;%CATALINA_HOME%\bin\slf4j-api-1.7.6.jar;%CATALINA_HOME%\bin\slf4j-log4j12-1.7.6.jar;%CATALINA_HOME%\bin\log4j-1.2.17.jar;%CATALINA_HOME%\var\config;"

set "PR_LOGPATH=%CATALINA_HOME%\var\log"
set "PR_LOGPREFIX=%SERVICE_NAME%"
set "PR_STDOUTPUT=auto"
set "PR_STDERROR=auto"
set "PR_STARTUP=auto"
set "PR_JVMMS=128"
set "PR_JVMMX=512"
