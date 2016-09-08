/************************************************************************

  This script displays Intalio Server pending jobs 
  (e.g. timers and continuations)

  To run this script,

  On Windows:
      C:\...> groovy.bat -cp path\to\jdbc-driver.jar displayOdeJobs.groovy

  On Linux, Solaris and other Unix-like:
      % ./groovy.sh -cp path/to-jdbc/driver.jar displayOdeJobs.groovy

************************************************************************/ 

import groovy.sql.Sql
import java.text.DateFormat
import java.text.SimpleDateFormat

// Change this settings according to your database configuration
def db = Sql.newInstance("jdbc:h2:tcp://localhost:9092/BPMSDB;SCHEMA=bpms;MODE=MYSQL;DATABASE_TO_UPPER=FALSE;MVCC=TRUE", "sa", "",
                         "org.h2.Driver")


// Change these dates according to the time window you are considering
DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
start = "2009-01-01 00:00:00"
stop  = "2009-12-31 23:59:59"

// You can specify specific instances to display; 
// if array is left empty, all instances will be displayed 
// instances = ["622598", "623661"]
instances = []

println()
println "Jobs from ${start} to ${stop}"
println()

db.eachRow("select * from ODE_JOB where ts >= ${df.parse(start).getTime()} and ts <= ${df.parse(stop).getTime()} order by ts") { row ->
  // deserialize details java object
  if (row.details instanceof java.sql.Blob) {
    details = new ObjectInputStream(row.details.getBinaryStream()).readObject()
    timestamp = df.format(new Date(new BigDecimal(row.ts).longValue()))
  }

  else {
    details = new ObjectInputStream(new ByteArrayInputStream(row.details)).readObject()
    timestamp = df.format(new Date(row.ts))
  }
  
  iid = details["iid"].toString()
  // print each row
  if (instances.size() == 0 || instances.contains(iid)) { 
    println "jobid= ${row.jobid.trim()} timestamp= ${timestamp} details= ${details}"
  }
}

