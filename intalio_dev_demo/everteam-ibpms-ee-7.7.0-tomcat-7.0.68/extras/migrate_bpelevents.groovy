/*************************************************************
    
    This script performs migration of bpel events from 
    BPEL_EVENT table to BPEL_EVENT_V2.
    
    To run this script,
    
    On Windows:
    
    % cd \path\to\bpms\extras
    C:\path\to\bpms\extras> groovy.bat migrate_bpelevents.groovy
    
    On Linux, Solaris and other Unix-like:
    
    % cd /path/to/bpms/extras
    % ./groovy.sh migrate_bpelevents.groovy
    
    
Also for 'hibernatedialect' you can select from below list 
	Microsoft SQL Server 2000	org.hibernate.dialect.SQLServerDialect
	Microsoft SQL Server 2005	org.hibernate.dialect.SQLServer2005Dialect
	Microsoft SQL Server 2008	org.hibernate.dialect.SQLServer2008Dialect
	MySQL	org.hibernate.dialect.MySQLDialect
	MySQL5	org.hibernate.dialect.MySQL5Dialect
	Oracle (any version)	org.hibernate.dialect.OracleDialect
	Oracle 11g	org.hibernate.dialect.Oracle10gDialect
	Oracle 10g	org.hibernate.dialect.Oracle10gDialect
	Oracle 9i	org.hibernate.dialect.Oracle9iDialect
	PostgreSQL	org.hibernate.dialect.PostgreSQLDialect
    
*****************************************************************/ 

//Configure database connection details
driver = "com.mysql.jdbc.Driver"
dburl = "jdbc:mysql://localhost:3306/bpmsdb"
uname = "root"
passwd = "root"
driverjarpath = "/full/path/to/jdbc/driver/jar"
hibernatedialect = "org.hibernate.dialect.MySQL5Dialect"
batchsize = "100"
showconsolelogs = "true"


LIB_LOCATION = "../webapps/everteam/WEB-INF/lib"
println()
println "This script performs migration of bpel events from BPEL_EVENT table to BPEL_EVENT_V2."
urls = new URL[18]
i=0
urls[i++] = new URL("file:"+driverjarpath)
def libdir = new File(LIB_LOCATION)
files = libdir.listFiles()
files.each { file ->
	if(file.name.startsWith("antlr") || file.name.startsWith("commons-collections") ||
			file.name.startsWith("dom4j") || file.name.startsWith("hibernate-commons-annotations") ||
			file.name.startsWith("hibernate-core-custom") ||
			file.name.startsWith("hibernate-jpa") ||
			file.name.startsWith("javassist") ||
			file.name.startsWith("ode-bpel-api") ||
			file.name.startsWith("ode-dao-hibernate") ||
			file.name.startsWith("ode-utils") ||
			file.name.startsWith("xercesImpl")) {
		urls[i++] = new URL("file:"+file.path)
	}
}
def libsdir = new File("./libs")
fileslibs = libsdir.listFiles()
fileslibs.each { filelibs ->
if(filelibs.name.startsWith("commons-logging") ||
			filelibs.name.startsWith("jta") ||
			filelibs.name.startsWith("slf4j-api") )
  urls[i++] = new URL("file:"+filelibs.path)
}
//println urls
loader = new java.net.URLClassLoader(urls, this.class.getClassLoader())
converter = Class.forName("org.apache.ode.daohib.bpel.hobj.BpelEventMigrator", true, loader)
args = new String[7]
args[0] = driver
args[1] = dburl
args[2] = uname
args[3] = passwd
args[4] = hibernatedialect
args[5] = batchsize
args[6] = showconsolelogs
converter.main(args)
