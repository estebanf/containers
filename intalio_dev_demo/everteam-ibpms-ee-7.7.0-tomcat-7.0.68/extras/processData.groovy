/************************************************************************

  This script allows displaying and updating process data in Intalio 
  server database 

  To run this script,

  On Windows:
      C:\...> groovy.bat -cp path\to\jdbc-driver.jar processData.groovy

  On Linux, Solaris and other Unix-like:
      % ./groovy.sh -cp path/to-jdbc/driver.jar processData.groovy

************************************************************************/ 

import groovy.sql.Sql
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.zip.GZIPInputStream


if (args.length == 0) {
  println "Usage:"
  println "   -i 12345                Display process instance variables for instance 12345"
  println "   -v 12345                Display variable content for variable id 12345"
  println "   -U 12345 variable.xml   Update variable 12345 with content of file variable.xml"
  return
}  
    
// Change these settings according to your database configuration

def db = Sql.newInstance("jdbc:h2:tcp://localhost:9092/BPMSDB;SCHEMA=bpms;MODE=MYSQL;DATABASE_TO_UPPER=FALSE;MVCC=TRUE", "sa", "",
                         "org.h2.Driver")

for (i=0; i<args.length; i++) {

  // Display process instance variable
  if (args[i] == "-i") { 
    instance = args[i+1]
    i++
    db.eachRow("SELECT * FROM BPEL_XML_DATA WHERE PIID = ${instance}") { row ->  
      println "Variable ${row.ldata_id} ${row.name}"
    }
  }
  
  // Display variable content
  if (args[i] == "-v") { 
	result = null
    ldata_id = args[i+1]
    i++
    db.eachRow("SELECT * FROM LARGE_DATA WHERE ID = ${ldata_id}") { row ->
		try {
			result = "${new GZIPInputStream(new ByteArrayInputStream(row.getBytes(2),8,row.getBytes(2).length))}"
			println "${result}"
		} catch(e) {}
		if(null == result)
			println "${new ByteArrayInputStream(row.getBytes(2),8,row.getBytes(2).length)}"
    }
  }

  // Update variable content
  if (args[i] == "-U") { 
    ldata_id = args[i+1]
    i++
    file = args[i+1]
    i++

    fis = new FileInputStream(file)
    byte[] data = new byte[fis.available()]
    fis.read(data)
    fis.close()

    con = db.connection
    con.autoCommit = false
    stmt = con.prepareStatement("UPDATE LARGE_DATA SET BIN_DATA = ? WHERE ID = ${ldata_id}".toString())
    stmt.setBytes(1, data)
    stmt.executeUpdate()
    con.commit()
  }
  
}


