/************************************************************************

  This script can be used to cleanup Intalio Database records which are no longer in use.
  By cleaning up Database records, this scripts frees up space and improves performance of the server.

  Please provide details of Database connection in the next section for which the cleanup is required.

  To run this script,

  On Windows:
      C:\...> groovy.bat -cp ..\lib\<Database_JAR_path> cleanup_mysql.groovy -b 60 -p 8 -s 30 -t 1

  On Linux, Solaris and other Unix-like:
      % ./groovy.sh -cp ../lib/<Database_JAR_path> cleanup_mysql.groovy -b 60 -p 8 -s 30 -t 1

  Options:
  -b	Batch size (default 60). Instance IDs eligible for deletion will be divided into batches based on this value.
	Provided value is optimum value for server with similar or better configuration as compared to following:
	CPU:		Intel(R) Core(TM) i3-2120 CPU @ 3.30GHz
	Memory:		8 GB
	The performance for the default Batch size scales as the server hardware scales.

  -p	Parallel threads (default 8). Number of threads among which total number of eligible instance IDs would be divided.
	Change the value of the variable maxThreads if you are having large amount of data to delete.
	If you are changing this value, please also increase the memory allocated to groovy.
	Edit groovy.bat and increase the value of JAVA_OPTS="-Xmx128m"

  -s	Instance status (default 30). Vales are as following:
	30  = COMPLETED OK
	40  = COMPLETED WITH FAULT
	60  = TERMINATED
	90  = COMPLETED & TERMINATED
	100 = COMPLETED OK && COMPLETED WITH FAULT && TERMINATED

  -t	Delete tempo tasks or not (default 1).
	1 = Delete
	2 = Don't delete

************************************************************************/

import groovy.sql.Sql

//Configure your database connection
dburl = "jdbc:mysql://localhost:3306/bpmsdb?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true"
uname = "root"
passwd = "root"
driver = "com.mysql.jdbc.Driver"

// Batch size for instance IDs
BATCH = 60

/*Log levels
 * 0 = TRACE
 * 1 = DEBUG
 * 2 = INFO
 * 3 = ERROR
 */
TRACE = 0
DEBUG = 1
INFO = 2
ERROR = 3

LOG_LEVEL = INFO

/*change the value of variable event to delete the data from BPEL_EVENT accordingly
 *    30  = COMPLETED OK
 *    40  = COMPLETED WITH FAULT
 *    60  = TERMINATED
 *    90  = COMPLETED & TERMINATED
 *    100 = COMPLETED OK && COMPLETED WITH FAULT && TERMINATED
 */
String event = "30"

/* change the value of variable tempo to delete the data from TEMPO_TASK and TEMPO_PA
 *    1 = Delete
 *    2 = Don't delete
 */
String tempo = "1"

def maxThreads = 8

if (args.length > 0) {
  for(int i=0; i<args.length; i=i+2) {
    if(args[i] == "-b") {
	BATCH = Integer.parseInt(args[i+1])
    } else if(args[i] == "-p") {
	maxThreads = Integer.parseInt(args[i+1])
    } else if(args[i] == "-s") {
	event = args[i+1]
    } else if(args[i] == "-t") {
	tempo = args[i+1]
    }
  }
}

def procedureToClean(event,tempo,maxThreads)
{
  int startRow
  int finalRow
  int numberOfThreads

  //println "Connecting to DB...."
  def db = Sql.newInstance(dburl, uname, passwd, driver)
  db.connection.autoCommit = false

  Date now = new Date()

  println "Clean-up script started at "+now

  println "Configured batch size: " + BATCH
  println "Configured number of threads for Parallel execution: " + maxThreads
  println "Configured status to capture instances for deletion: " + event
  println "Configured tempo deletion: " + tempo

  def instanceID = []
  if(event == "30" || event == "40" || event == "60")
  {
    if(LOG_LEVEL <= INFO) {
      println "Capturing instance ids with state = "+event
    }

    db.eachRow( 'select ID from BPEL_INSTANCE where STATE = '+event)
    {
      instanceID << it.id
    }
  }
  else if(event == "90")
  {
    if(LOG_LEVEL <= INFO) {
      println "Capturing all instance ids for which state = 30 or 60 "
    }

    db.eachRow( 'select ID from BPEL_INSTANCE where STATE in (30,60)' )
    {
      instanceID << it.id
    }
  }
  else if(event == "100")
  {
    if(LOG_LEVEL <= INFO) {
      println "Capturing all instance ids for which state = 30 or 40 or 60 "
    }

    db.eachRow( 'select ID from BPEL_INSTANCE where STATE in (30,40,60)' )
    {
      instanceID << it.id
    }
  }
  else
  {
    if(LOG_LEVEL <= ERROR) {
      println "Wrong choice for instance state..."
      println "Terminating the execution !!"
    }
    return
  }
  db.close()

  if(LOG_LEVEL <= INFO) {
    println "Instances collected in "+(new Date().time - now.time)+" ms"
  }

  int totalInstances = instanceID.size

  if(LOG_LEVEL <= INFO) {
    println "Total Instances found : "+totalInstances
  }

  if(totalInstances < maxThreads) {
    maxThreads = 1
  }

  int threadDeleteAmount = totalInstances / maxThreads

  if (threadDeleteAmount == 0)
  {
    if(LOG_LEVEL <= INFO) {
      println "Not enough instances to delete, quitting"
    }

    return
  }

  if(LOG_LEVEL <= INFO) {
    println "So we will create " + maxThreads + " threads which will delete " + threadDeleteAmount + " instances each"
  }

  def threads = []
  def threadID
  for(def i=1; i<=maxThreads; i++)
  {
    startRow = (i-1)*threadDeleteAmount
    finalRow = i*threadDeleteAmount-1

    // make sure every instance is treated
    if (i==maxThreads)
      finalRow = totalInstances-1

      def rows = []
      for(def j=startRow; j<=finalRow; j++) {
	rows[j-startRow] = instanceID[j]
      }
      threadID = "Thread"+i

      if(LOG_LEVEL <= INFO) {
	println "Starting Thread "+threadID+" at " + new Date()
      }

      threads[i] = Thread.start
      {
	if(LOG_LEVEL <= INFO) {
	  println "For thread- "+threadID + "  startRow == "+startRow+"  finalRow == "+finalRow
	}

	CleaningDBRecords(rows,threadID,tempo)
      }
      sleep(60);
  }

  // wait for all threads to terminate
  for(def i=1; i<=maxThreads; i++)
  {
    threads[i].join()
  }
  return totalInstances
}

def CleaningDBRecords(def rowsToWork,threadID,tempo)
{
  def dbThread = null
  try
  {
    def counter = 0
    dbThread = Sql.newInstance(dburl, uname, passwd ,driver)
    dbThread.connection.autoCommit = false

    def i=0;
    for (i=0; i<rowsToWork.size; i=i+BATCH)
    {
      try {
	def last = i+BATCH-1
	if(last >= rowsToWork.size) {
	  last = rowsToWork.size-1
	}

	def rows = rowsToWork[i..last]
	def inputParam = "";
	for(j in rows) {
	  inputParam += j +",";
	}
	inputParam = inputParam.substring(0, inputParam.length()-1);

	if(LOG_LEVEL <= DEBUG) {
	  println "Thread: "+threadID+" is working on Instance IDs: "+inputParam
	}

	if(tempo == "1")
	{
	  def taskIDs = []
	  dbThread.eachRow("select TEMPO_TASK.ID from TEMPO_TASK, TEMPO_PA where TEMPO_TASK.ID = TEMPO_PA.ID and TEMPO_PA.INSTANCE_ID in ("+inputParam+")")
	  {
	    taskIDs << it.id
	  }

      dbThread.eachRow("select TEMPO_TASK.ID from TEMPO_TASK, TEMPO_NOTIFICATION where TEMPO_TASK.ID = TEMPO_NOTIFICATION.ID and TEMPO_NOTIFICATION.INSTANCEID in ("+inputParam+")")
      {
        taskIDs << it.id
      }

	  def taskIDParam = "";
	  for(taskID in taskIDs) {
	    taskIDParam += taskID + ",";
	  }

	  if(taskIDParam.size() > 0) {
	    if(LOG_LEVEL <= TRACE) {
	      println "threadID: "+threadID+" tasks: "+taskIDs.size()
	    }

	    taskIDParam = taskIDParam.substring(0, taskIDParam.length()-1);

        def prevOwnersTaskIds = []
		dbThread.eachRow("select TEMPO_PREV_OWNERS.TASK_ID from TEMPO_PREV_OWNERS, TEMPO_TASK where TEMPO_PREV_OWNERS.TASK_ID = TEMPO_TASK.TASKID and TEMPO_TASK.ID in ("+taskIDParam+")")
        {
          prevOwnersTaskIds << it.task_id
        }

        def prevOwnersTaskIdParam = "";
        for(prevOwnersTaskId in prevOwnersTaskIds) {
          prevOwnersTaskIdParam += "'" + prevOwnersTaskId + "',";
        }

        if(prevOwnersTaskIdParam.size() > 0) {
          prevOwnersTaskIdParam = prevOwnersTaskIdParam.substring(0, prevOwnersTaskIdParam.length()-1);
        }

	    dbThread.execute( "delete from TEMPO_TASK where TEMPO_TASK.ID in ("+taskIDParam+")")
	    dbThread.execute( "delete from TEMPO_USER where TEMPO_USER.TASK_ID in ("+taskIDParam+")")
	    dbThread.execute( "delete from TEMPO_ROLE where TEMPO_ROLE.TASK_ID in ("+taskIDParam+")")
	    dbThread.execute( "delete from TEMPO_GENERIC where TEMPO_GENERIC.PATASK_ID in ("+taskIDParam+")")
	    dbThread.execute( "delete from TEMPO_PA where TEMPO_PA.ID in ("+taskIDParam+")")
	    dbThread.execute( "delete from TEMPO_NOTIFICATION where TEMPO_NOTIFICATION.instanceId in ("+inputParam+")")
        dbThread.execute( "delete from TEMPO_PREV_OWNERS where TEMPO_PREV_OWNERS.TASK_ID in ("+prevOwnersTaskIdParam+")")

	    dbThread.commit()
	  }
	}

	def LDATA_IDs = []
	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_MESSAGE_EXCHANGE where LARGE_DATA.ID = BPEL_MESSAGE_EXCHANGE.LDATA_EPR_ID and BPEL_MESSAGE_EXCHANGE.PIID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_MESSAGE_EXCHANGE where LARGE_DATA.ID = BPEL_MESSAGE_EXCHANGE.LDATA_CEPR_ID and BPEL_MESSAGE_EXCHANGE.PIID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_MESSAGE, BPEL_MESSAGE_EXCHANGE where LARGE_DATA.ID = BPEL_MESSAGE.DATA and BPEL_MESSAGE.ID = BPEL_MESSAGE_EXCHANGE.REQUEST and BPEL_MESSAGE_EXCHANGE.PIID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_MESSAGE, BPEL_MESSAGE_EXCHANGE where LARGE_DATA.ID = BPEL_MESSAGE.DATA and BPEL_MESSAGE.ID = BPEL_MESSAGE_EXCHANGE.RESPONSE and BPEL_MESSAGE_EXCHANGE.PIID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_MESSAGE, BPEL_MESSAGE_EXCHANGE where LARGE_DATA.ID = BPEL_MESSAGE.HEADER and BPEL_MESSAGE.ID = BPEL_MESSAGE_EXCHANGE.REQUEST and BPEL_MESSAGE_EXCHANGE.PIID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_MESSAGE, BPEL_MESSAGE_EXCHANGE where LARGE_DATA.ID = BPEL_MESSAGE.HEADER and BPEL_MESSAGE.ID = BPEL_MESSAGE_EXCHANGE.RESPONSE and BPEL_MESSAGE_EXCHANGE.PIID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_FAULT where LARGE_DATA.ID = BPEL_FAULT.LDATA_ID and BPEL_FAULT.ID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_XML_DATA where LARGE_DATA.ID = BPEL_XML_DATA.ldata_id and BPEL_XML_DATA.PIID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_PLINK_VAL, BPEL_SCOPE where LARGE_DATA.ID = BPEL_PLINK_VAL.MYROLE_EPR and BPEL_PLINK_VAL.SCOPE = BPEL_SCOPE.ID and BPEL_SCOPE.PIID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_PLINK_VAL, BPEL_SCOPE where LARGE_DATA.ID = BPEL_PLINK_VAL.PARTNERROLE_EPR and BPEL_PLINK_VAL.SCOPE = BPEL_SCOPE.ID and BPEL_SCOPE.PIID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_EVENT where LARGE_DATA.ID = BPEL_EVENT.LDATA_ID and BPEL_EVENT.IID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

	dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_INSTANCE where LARGE_DATA.ID = BPEL_INSTANCE.JACOB_STATE and BPEL_INSTANCE.ID in ("+inputParam+")")
	{
	  LDATA_IDs << it.id
	}

    dbThread.eachRow("select LARGE_DATA.ID from LARGE_DATA, BPEL_ACTIVITY_RECOVERY, BPEL_INSTANCE where LARGE_DATA.ID = BPEL_ACTIVITY_RECOVERY.LDATA_ID and BPEL_INSTANCE.ID in ("+inputParam+")")
    {
      LDATA_IDs << it.id
    }

	def LDATA_IDParam = "";
	for(LDATA_ID in LDATA_IDs) {
	  LDATA_IDParam += LDATA_ID +",";
	}

	if(LDATA_IDParam.size() > 0) {
	  if(LOG_LEVEL <= TRACE) {
	    println "threadID: "+threadID+" LDATA: "+LDATA_IDs.size()
	  }

	  LDATA_IDParam = LDATA_IDParam.substring(0, LDATA_IDParam.length()-1);
	  dbThread.execute( "delete from LARGE_DATA where LARGE_DATA.ID in ("+LDATA_IDParam+")")
	  dbThread.commit()
	}

	boolean deletionPerformed = false;

	def RECOVERY_IDs = []
	dbThread.eachRow("select BPEL_ACTIVITY_RECOVERY.ID from BPEL_ACTIVITY_RECOVERY where BPEL_ACTIVITY_RECOVERY.PIID in ("+inputParam+")")
	{
	  RECOVERY_IDs << it.id
	}
	def RECOVERY_IDParam = "";
	for(RECOVERY_ID in RECOVERY_IDs) {
	  RECOVERY_IDParam += RECOVERY_ID + ",";
	}

	if(RECOVERY_IDParam.size() > 0) {
	  if(LOG_LEVEL <= TRACE) {
	    println "threadID: "+threadID+" RECOV: "+RECOVERY_IDs.size()
	  }

	  RECOVERY_IDParam = RECOVERY_IDParam.substring(0, RECOVERY_IDParam.length()-1);
	  dbThread.execute( "delete from BPEL_ACTIVITY_RECOVERY where BPEL_ACTIVITY_RECOVERY.ID in ("+RECOVERY_IDParam+")")
	  deletionPerformed = true;
	}

	def CORR_SET_IDs = []
	dbThread.eachRow("select BPEL_CORRELATION_SET.ID from BPEL_CORRELATION_SET where BPEL_CORRELATION_SET.PIID in ("+inputParam+")")
	{
	  CORR_SET_IDs << it.id
	}
	def CORR_SET_IDParam = "";
	for(CORR_SET_ID in CORR_SET_IDs) {
	  CORR_SET_IDParam += CORR_SET_ID + ",";
	}

	if(CORR_SET_IDParam.size() > 0) {
	  CORR_SET_IDParam = CORR_SET_IDParam.substring(0, CORR_SET_IDParam.length()-1);

	  def CORR_PROP_IDs = []
	  dbThread.eachRow("select BPEL_CORRELATION_PROP.ID from BPEL_CORRELATION_PROP where BPEL_CORRELATION_PROP.CORR_SET_ID in ("+CORR_SET_IDParam+")")
	  {
	    CORR_PROP_IDs << it.id
	  }
	  def CORR_PROP_IDParam = "";
	  for(CORR_PROP_ID in CORR_PROP_IDs) {
	    CORR_PROP_IDParam += CORR_PROP_ID + ",";
	  }

	  if(CORR_PROP_IDParam.size() > 0) {
	    if(LOG_LEVEL <= TRACE) {
	      println "threadID: "+threadID+" CORR_PROP: "+CORR_PROP_IDs.size()
	      println "threadID: "+threadID+" CORR_SET: "+CORR_SET_IDs.size()
	    }

	    CORR_PROP_IDParam = CORR_PROP_IDParam.substring(0, CORR_PROP_IDParam.length()-1);
	    dbThread.execute( "delete from BPEL_CORRELATION_PROP where BPEL_CORRELATION_PROP.ID in ("+CORR_PROP_IDParam+")")
	    dbThread.execute( "delete from BPEL_CORRELATION_SET where BPEL_CORRELATION_SET.ID in ("+CORR_SET_IDParam+")")
	    deletionPerformed = true;
	  }
	}

	def MEX_IDs = []
	dbThread.eachRow("select BPEL_MESSAGE_EXCHANGE.ID from BPEL_MESSAGE_EXCHANGE where BPEL_MESSAGE_EXCHANGE.PIID in ("+inputParam+")")
	{
	  MEX_IDs << it.id
	}
	def MEX_IDParam = "";
	for(MEX_ID in MEX_IDs) {
	  MEX_IDParam += MEX_ID + ",";
	}

	if(MEX_IDParam.size() > 0) {
	  MEX_IDParam = MEX_IDParam.substring(0, MEX_IDParam.length()-1);

	  def BPEL_MSG_IDs = []
	  dbThread.eachRow("select BPEL_MESSAGE.ID from BPEL_MESSAGE, BPEL_MESSAGE_EXCHANGE where (BPEL_MESSAGE.ID = BPEL_MESSAGE_EXCHANGE.REQUEST or BPEL_MESSAGE.ID = BPEL_MESSAGE_EXCHANGE.RESPONSE) and BPEL_MESSAGE_EXCHANGE.ID in ("+MEX_IDParam+")")
	  {
	    BPEL_MSG_IDs << it.id
	  }
	  def BPEL_MSG_IDParam = "";
	  for(BPEL_MSG_ID in BPEL_MSG_IDs) {
	    BPEL_MSG_IDParam += BPEL_MSG_ID + ",";
	  }

	  if(BPEL_MSG_IDParam.size() > 0) {
	    if(LOG_LEVEL <= TRACE) {
	      println "threadID: "+threadID+" BPEL_MSG: "+BPEL_MSG_IDs.size()
	    }

	    BPEL_MSG_IDParam = BPEL_MSG_IDParam.substring(0, BPEL_MSG_IDParam.length()-1);
	    dbThread.execute( "delete from BPEL_MESSAGE where BPEL_MESSAGE.ID in ("+BPEL_MSG_IDParam+")")
	    deletionPerformed = true;
	  }

	  def UNMATCHED_IDs = []
	  dbThread.eachRow("select BPEL_UNMATCHED.ID from BPEL_UNMATCHED where BPEL_UNMATCHED.MEX in ("+MEX_IDParam+")")
	  {
	    UNMATCHED_IDs << it.id
	  }
	  def UNMATCHED_IDParam = "";
	  for(UNMATCHED_ID in UNMATCHED_IDs) {
	    UNMATCHED_IDParam += UNMATCHED_ID + ",";
	  }

	  if(UNMATCHED_IDParam.size() > 0) {
	    UNMATCHED_IDParam = UNMATCHED_IDParam.substring(0, UNMATCHED_IDParam.length()-1);

	    def CORR_MSG_IDs = []
	    dbThread.eachRow("select BPEL_CORRELATOR_MESSAGE_CKEY.ID from BPEL_CORRELATOR_MESSAGE_CKEY where BPEL_CORRELATOR_MESSAGE_CKEY.CORRELATOR_MESSAGE_ID in ("+UNMATCHED_IDParam+")")
	    {
	      CORR_MSG_IDs << it.id
	    }
	    def CORR_MSG_IDParam = "";
	    for(CORR_MSG_ID in CORR_MSG_IDs) {
	      CORR_MSG_IDParam += CORR_MSG_ID + ",";
	    }

	    if(CORR_MSG_IDParam.size() > 0) {
	      if(LOG_LEVEL <= TRACE) {
		println "threadID: "+threadID+" CORR_MSG: "+CORR_MSG_IDs.size()
	      }

	      CORR_MSG_IDParam = CORR_MSG_IDParam.substring(0, CORR_MSG_IDParam.length()-1);
	      dbThread.execute( "delete from BPEL_CORRELATOR_MESSAGE_CKEY where BPEL_CORRELATOR_MESSAGE_CKEY.CORRELATOR_MESSAGE_ID in ("+CORR_MSG_IDParam+")")
	      deletionPerformed = true;
	    }

	    if(UNMATCHED_IDParam.size() > 0) {
	      if(LOG_LEVEL <= TRACE) {
		println "threadID: "+threadID+" UNMATCHED: "+UNMATCHED_IDs.size()
	      }

	      dbThread.execute( "delete from BPEL_UNMATCHED where BPEL_UNMATCHED.ID in ("+UNMATCHED_IDParam+")")
	      deletionPerformed = true;
	    }
	  }

	  if(MEX_IDParam.size() > 0) {
	    if(LOG_LEVEL <= TRACE) {
	      println "threadID: "+threadID+" MEX: "+MEX_IDs.size()
	    }

	    dbThread.execute( "delete from BPEL_MEX_PROPS where BPEL_MEX_PROPS.MEX in ("+MEX_IDParam+")")
	    dbThread.execute( "delete from BPEL_MESSAGE_EXCHANGE where BPEL_MESSAGE_EXCHANGE.ID in ("+MEX_IDParam+")")
	    deletionPerformed = true;
	  }
	}

	if(deletionPerformed) {
	  dbThread.commit()
	  deletionPerformed = false;
	}

	def FAULT_IDs = []
	dbThread.eachRow("select BPEL_FAULT.ID from BPEL_FAULT, BPEL_INSTANCE where BPEL_FAULT.ID = BPEL_INSTANCE.FAULT and BPEL_INSTANCE.ID in ("+inputParam+")")
	{
	  FAULT_IDs << it.id
	}
	def FAULT_IDParam = "";
	for(FAULT_ID in FAULT_IDs) {
	  FAULT_IDParam += FAULT_ID + ",";
	}

	if(FAULT_IDParam.size() > 0) {
	  if(LOG_LEVEL <= TRACE) {
	    println "threadID: "+threadID+" FAULT: "+FAULT_IDs.size()
	  }

	  FAULT_IDParam = FAULT_IDParam.substring(0, FAULT_IDParam.length()-1);
	  dbThread.execute( "delete from BPEL_FAULT where BPEL_FAULT.ID in ("+FAULT_IDParam+")")
	  deletionPerformed = true;
	}

	def XDATA_IDs = []
	dbThread.eachRow("select BPEL_XML_DATA.ID from BPEL_XML_DATA where BPEL_XML_DATA.PIID in ("+inputParam+")")
	{
	  XDATA_IDs << it.id
	}
	def XDATA_IDParam = "";
	for(XDATA_ID in XDATA_IDs) {
	  XDATA_IDParam += XDATA_ID + ",";
	}

	if(XDATA_IDParam.size() > 0) {
	  XDATA_IDParam = XDATA_IDParam.substring(0, XDATA_IDParam.length()-1);

	  def VAR_IDs = []
	  dbThread.eachRow("select VAR_PROPERTY.ID from VAR_PROPERTY, BPEL_XML_DATA where VAR_PROPERTY.XML_DATA_ID = BPEL_XML_DATA.ID and BPEL_XML_DATA.PIID in ("+inputParam+")")
	  {
	    VAR_IDs << it.id
	  }
	  def VAR_IDParam = "";
	  for(VAR_ID in VAR_IDs) {
	    VAR_IDParam += VAR_ID + ",";
	  }

	  if(VAR_IDParam.size() > 0) {
	    if(LOG_LEVEL <= TRACE) {
	      println "threadID: "+threadID+" VAR: "+VAR_IDs.size()
	    }

	    VAR_IDParam = VAR_IDParam.substring(0, VAR_IDParam.length()-1);
	    dbThread.execute( "delete from VAR_PROPERTY where VAR_PROPERTY.ID in ("+VAR_IDParam+")")
	    deletionPerformed = true;
	  }

	  if(XDATA_IDParam.size() > 0) {
	    if(LOG_LEVEL <= TRACE) {
	      println "threadID: "+threadID+" XDATA: "+XDATA_IDs.size()
	    }

	    dbThread.execute( "delete from BPEL_XML_DATA where BPEL_XML_DATA.ID in ("+XDATA_IDParam+")")
	    deletionPerformed = true;
	  }
	}

	def SEL_IDs = []
	dbThread.eachRow("select BPEL_SELECTORS.ID from BPEL_SELECTORS where BPEL_SELECTORS.PIID in ("+inputParam+")")
	{
	  SEL_IDs << it.id
	}
	def SEL_IDParam = "";
	for(SEL_ID in SEL_IDs) {
	  SEL_IDParam += SEL_ID + ",";
	}

	if(SEL_IDParam.size() > 0) {
	  if(LOG_LEVEL <= TRACE) {
	    println "threadID: "+threadID+" SEL: "+SEL_IDs.size()
	  }

	  SEL_IDParam = SEL_IDParam.substring(0, SEL_IDParam.length()-1);
	  dbThread.execute( "delete from BPEL_SELECTORS where BPEL_SELECTORS.ID in ("+SEL_IDParam+")")
	  deletionPerformed = true;
	}

	if(deletionPerformed) {
	  dbThread.commit()
	  deletionPerformed = false;
	}

	def SCOPE_IDs = []
	dbThread.eachRow("select BPEL_SCOPE.ID from BPEL_SCOPE where BPEL_SCOPE.PIID in ("+inputParam+")")
	{
	  SCOPE_IDs << it.id
	}
	def SCOPE_IDParam = "";
	for(SCOPE_ID in SCOPE_IDs) {
	  SCOPE_IDParam += SCOPE_ID + ",";
	}

	if(SCOPE_IDParam.size() > 0) {
	  if(LOG_LEVEL <= TRACE) {
	    println "threadID: "+threadID+" SCOPE: "+SCOPE_IDs.size()
	  }

	  SCOPE_IDParam = SCOPE_IDParam.substring(0, SCOPE_IDParam.length()-1);

	  def PLINK_IDs = []
	  dbThread.eachRow("select BPEL_PLINK_VAL.ID from BPEL_PLINK_VAL where BPEL_PLINK_VAL.SCOPE in ("+SCOPE_IDParam+")")
	  {
	    PLINK_IDs << it.id
	  }
	  def PLINK_IDParam = "";
	  for(PLINK_ID in PLINK_IDs) {
	    PLINK_IDParam += PLINK_ID + ",";
	  }

	  if(PLINK_IDParam.size() > 0) {
	    if(LOG_LEVEL <= TRACE) {
	      println "threadID: "+threadID+" PLINK: "+PLINK_IDs.size()
	    }

	    PLINK_IDParam = PLINK_IDParam.substring(0, PLINK_IDParam.length()-1);
	    dbThread.execute( "delete from BPEL_PLINK_VAL where BPEL_PLINK_VAL.ID in ("+PLINK_IDParam+")")
	  }

	  if(SCOPE_IDParam.size() > 0) {
	    if(LOG_LEVEL <= TRACE) {
	      println "threadID: "+threadID+" SCOPE: "+SCOPE_IDs.size()
	    }

	    dbThread.execute( "delete from BPEL_SCOPE where BPEL_SCOPE.ID in ("+SCOPE_IDParam+")")
	  }
	}

	def EVENT_IDs = []
	dbThread.eachRow("select BPEL_EVENT.ID from BPEL_EVENT where BPEL_EVENT.IID in ("+inputParam+")")
	{
	  EVENT_IDs << it.id
	}

	def EVENT_IDParam = "";
	for(EVENT_ID in EVENT_IDs) {
	  EVENT_IDParam += EVENT_ID +",";
	}

	if(EVENT_IDParam.size() > 0) {
	  if(LOG_LEVEL <= TRACE) {
	    println "threadID: "+threadID+" EVENT: "+EVENT_IDs.size()
	  }

	  EVENT_IDParam = EVENT_IDParam.substring(0, EVENT_IDParam.length()-1);
	  dbThread.execute( "delete from BPEL_EVENT where BPEL_EVENT.ID in ("+EVENT_IDParam+")")
	  dbThread.commit()
	}

	dbThread.execute( "delete from BPEL_INSTANCE where ID in ("+inputParam+")")
	dbThread.commit()

	counter = counter + BATCH
	if (counter > 1000)
	{
	  if(LOG_LEVEL <= INFO) {
	    println "" +(new Date())+ ": "+threadID+" deleted 1000 entries"
	  }

	  counter = counter - 1000;
	}
      } catch(e) {
	if(LOG_LEVEL <= ERROR) {
	  println "Error is : "+e.printStackTrace()
	  println "Rolling back to maintain integrity"
	  println "Deletion of current batch was unsuccessful. Moving to the next batch."
	}

	if(dbThread != null) {
	  dbThread.rollback()
	}
      }
    } // end of for

    if(LOG_LEVEL <= INFO) {
      println "Thread-"+threadID+" : - Thread completed successfully"
    }

    return
  }
  catch(e)
  {
    if(LOG_LEVEL <= ERROR) {
      println "Delete statements couldn't run successfully..."
      println "Error is : "+e.printStackTrace()
      println "Rolling back to maintain integrity"
    }

    if(dbThread != null) {
      dbThread.rollback()
    }
  }
  finally
  {
    if(dbThread != null) {
      dbThread.close()
    }
  }
}

println "Script Started  .. .. .."
Date now = new Date()
henInstances = procedureToClean(event,tempo,maxThreads)
println "Script finished in "+(new Date().time-now.time)+" ms"

hendauer = ((new Date().time-now.time)/60000)
println "Summary  Instances : " +henInstances +" " +hendauer +" min"
