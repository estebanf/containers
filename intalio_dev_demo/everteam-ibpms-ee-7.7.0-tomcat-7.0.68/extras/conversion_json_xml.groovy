/*************************************************************
    
    This script helps to perform conversion between xml and json
    
    To run this script,
    
    On Windows:
    
    % cd \path\to\bpms\extras
    C:\path\to\bpms\extras> groovy.bat conversion_json_xml.groovy
    
    On Linux, Solaris and other Unix-like:
    
    % cd /path/to/bpms/extras
    % ./groovy.sh conversion_json_xml.groovy
    
*****************************************************************/ 

println()
println "This script helps to perform conversion between xml and json."
println "Select your option [default is JSON-to-XMLSCHEMA] :"
println "    1.JSON-to-XMLSCHEMA(xsd)"
println "    2.XML-to-JSON"

LIB_LOCATION = "../webapps/everteam/WEB-INF/lib"
console = new BufferedReader(new InputStreamReader(System.in))
conversionoption = console.readLine()
jsoncontenttype = "application/json"

    if(conversionoption.trim().equals("2")) {
        //XML-to-JSON
        converterclass = "org.apache.ode.utils.json.XmlToJsonConverter"
        input="xml"
    } else {
        //JSON-to-XML
        converterclass = "org.apache.ode.utils.json.JsonToXmlConverter"
        input="json"
    }
    print("Please provide input "+input+" file path :")
    filepath = console.readLine()

    println("Select the json content-Type [default is application/json] :")
    println "    1.application/json"
    println "    2.application/json/badgerfish"
    contenttypeoption = console.readLine()
    if (contenttypeoption.trim().equalsIgnoreCase("2")) jsoncontenttype = "application/json/badgerfish"

    boolarg=false
    if(jsoncontenttype.equalsIgnoreCase("application/json") && !(conversionoption.trim().equals("2"))) {
        println("Json can be request or response. Is the json a request? [yes/no] :")
        isrequest = console.readLine()
        if (isrequest.trim().equalsIgnoreCase("yes")) boolarg = true
    }

    doConversion(converterclass,filepath,jsoncontenttype, boolarg)


def doConversion(String converterclass,String filepath,String jsoncontenttype, boolArg) {
    
    urls = new URL[13]
    i=0
    //DEPENDENTJARS = ["ode-utils-7.0.0-SNAPSHOT.jar","axis2-json-1.6.2.jar","axis2-kernel-1.6.2.jar",
    //"commons-logging-1.1.1.jar","axiom-api-1.2.13.jar","axiom-impl-1.2.13.jar","jettison-1.2.jar",
    //"mail-1.4.1.jar","axiom-dom-1.2.13.jar" , "commons-lang-2.4.jar"]

    //DEPENDENTJARS for xsd generation : ode-utils-7.0.0-SNAPSHOT.jar, commons-logging-1.1.1.jar,
    //castor-1.2.jar, castor-xml-schema-1.2.jar, xercesImpl-2.9.1.jar

    def libdir = new File(LIB_LOCATION)
    files = libdir.listFiles()
    files.each { file ->
        if(file.name.startsWith("ode-utils") || file.name.startsWith("axis2-json") ||
                file.name.startsWith("axis2-kernel") || file.name.startsWith("axiom") ||
                file.name.startsWith("xercesImpl") ||
                file.name.startsWith("commons-lang") ||
                file.name.startsWith("jettison") || file.name.startsWith("mail")) {
            urls[i++] = new URL("file:"+file.path)
        }
    }
    def libsdir = new File("./libs")
    fileslibs = libsdir.listFiles()
    fileslibs.each { filelibs ->
    if(filelibs.name.startsWith("commons-logging") || filelibs.name.startsWith("castor"))
      urls[i++] = new URL("file:"+filelibs.path)
    }
    loader = new java.net.URLClassLoader(urls, this.class.getClassLoader())
    converter = Class.forName(converterclass, true, loader).newInstance()
    println()
    if(conversionoption.trim().equals("2")) {
        result = converter.invokeConversion(filepath,jsoncontenttype)
        println("Resultant JSON is :(Output also written to file ./output.json)")
        println(result)
        //the resultant json will be written into a file
        jsonfile = new File("./output.json")
        jsonfile.text = ''
        jsonfile << result
        println()
    } else {
        result = converter.invokeConversion(filepath,jsoncontenttype, boolArg)
        //For debugging the xml content, uncomment below 2 lines
        //println("Resultant XML is : (Output also written to file ./output.xml)")
        //println(result )
        //the resultant xml will be written into a file
        xmlfile = new File("./output.xml")
        xmlfile.text = ''
        xmlfile << result
        println()
        //xsd generation for xml
        xmlToXsdConverter = Class.forName("org.apache.ode.utils.json.XmlToXsdConverter", true, loader).newInstance()
        xsd = xmlToXsdConverter.generateXsdFromXmlString(result)
        println("Resultant XSD is : (Output also written to file ./output.xsd)")
        println()
        println(xsd)
        //the resultant xsd will be written into a file
        xsdfile = new File("./output.xsd")
        xsdfile.text = ''
        xsdfile << xsd
        println()
    }
}
