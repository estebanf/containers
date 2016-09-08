/************************************************************************

  This script updates Intalio|BPP configuration and deployment files
  when you change your application server's HTTP or HTTPS port

  To run this script,

  On Windows:

      % cd \path\to\bpms\var\config
      C:\path\to\bpms\extras> groovy.bat change_http_port.groovy

  On Linux, Solaris and other Unix-like:

      % cd /path/to/bpms/extras
      % ./groovy.sh change_http_port.groovy

************************************************************************/ 

println()
println "This script updates Intalio|BPP configuration and deployment files"
println "when you change your application server's HTTP or HTTPS port"
println()

console = new BufferedReader(new InputStreamReader(System.in))
while (true) {
    print("Do you want to use HTTP or HTTPS? [default: HTTP] ")
    answer = console.readLine()
    if (answer.trim().equals("")) { answer = "http"; break }
    if (answer.equalsIgnoreCase("http") || answer.equalsIgnoreCase("https")) break
    println("Invalid answer: ${answer}")
}

HTTPS = answer.equalsIgnoreCase("https")
PORT = HTTPS ? 8443 : 8080
OLD_PORT = HTTPS ? 8443 : 8080

while (true) {
    print("Current ${HTTPS ? "HTTPS" : "HTTP"} port number? [default: ${PORT}] ")
    answer = console.readLine()
    if (answer.trim().equals("")) break
    try {
        OLD_PORT = Integer.parseInt(answer)
        break
    } catch (Exception e) {
        println("Invalid port number: ${answer}")
    }
}

while (true) {
    print("New ${HTTPS ? "HTTPS" : "HTTP"} port number? [default: ${PORT}] ")
    answer = console.readLine()
    if (answer.trim().equals("")) break 
    try {
        PORT = Integer.parseInt(answer)
        break
    } catch (Exception e) {
        println("Invalid port number: ${answer}")
    }
}

println()
print("Press [ENTER] to start.")
console.readLine()

def find(... args) {
  urls = new URL[1]
  urls[0] = new URL("file:./libs/FindReplace.jar")
  loader = new java.net.URLClassLoader(urls, this.class.getClassLoader())
  find = Class.forName("FindReplace", true, loader).newInstance()
  find.main(args)
}

BASE=".."
EXTENSIONS = [ "*.pipa", "*.properties", "*.xml", "*.bpel", "*.wsdl" ]
URL_PREFIX = "(https?://)([^:/]*)(:\\d*)"
REPLACE    = (String) "${HTTPS ? "https" : "http"}://\$2:${PORT}\$4"

def replaceURL(String baseURL) {
    EXTENSIONS.each { ext -> 
        find("-r", BASE, "-replaceRegex", URL_PREFIX+"("+baseURL+")", REPLACE, ext)
    }
}

replaceURL "/everteam/ode/processes/DeployService"
replaceURL "/everteam/ode/processes/TokenService"
replaceURL "/everteam/ode/processes/tas"
replaceURL "/everteam/ode/processes/TaskManagementServices"
replaceURL "/bam/"
replaceURL "/bpms-console/"
replaceURL "/fds/"
replaceURL "/everteam/ode/"
replaceURL "/xFormsManager/"
replaceURL "/wds/"
replaceURL "/wsi/"
replaceURL "/gi/"
replaceURL "/sling"
replaceURL "/everteam/ode/processes/RBACQueryService"
replaceURL "/everteam/ode/processes/RBACAdminService"

BASE_EXTENSIONS = [ "tempo-tms.xml", "fds-config.xml", "tempo-ui-fw.xml" ]

def replaceBaseURL(String baseURL) {
	BASE_EXTENSIONS.each { ext ->
        find("-r", BASE, "-replaceRegex", URL_PREFIX+"("+baseURL+")", REPLACE, ext)
	}
}

replaceBaseURL "/"
replaceBaseURL ""

def replaceURLAjaxPIPA(String baseURL) {
    EXTENSIONS = ["*.pipa"]
    URL_PREFIX = "(https?\\\\{1}://)([^:/]*)(\\\\{1}:\\d*)"
    REPLACE    = (String) "${HTTPS ? "https" : "http\\\\"}://\$2\\\\:${PORT}\$4"
    EXTENSIONS.each { ext ->
        find("-r", BASE, "-replaceRegex", URL_PREFIX+"("+baseURL+")", REPLACE, ext)
    }
}

replaceURLAjaxPIPA "/gi/"
replaceURLAjaxPIPA "/everteam/ode/"

SUBMISSIONS = [ "console-entry", "generate-form", "invoke-service", "load-wsdl" ]
SUBMISSIONS.each { submission ->
  find("-replaceRegex", "name=\"endpoint\">https?:", (String) "name=\"endpoint\">${HTTPS ? "https" : "http"}:", submission, (String) "webapps/wsi/WEB-INF/wsi/models/${submission}.xpl")
}

def replacePortAxis2(String baseURL) {
    EXTENSIONS = ["axis2.xml"]
    O_PORT    = (String) "${OLD_PORT}"
    REPLACE    = (String) "${PORT}"
    EXTENSIONS.each { ext ->
        find("-r", BASE, "-replaceRegex", O_PORT, REPLACE, ext)
    }
}

def replacePortBaseConfig(String baseURL) {
    EXTENSIONS = ["base-config.properties"]
    URL_PREFIX    = "(com.intalio.bpms.server.baseUrl=.*:)(\\d+)"
    REPLACE    = (String) "\$1${PORT}"
    EXTENSIONS.each { ext ->
        find("-r", BASE, "-replaceRegex", URL_PREFIX, REPLACE, ext)
    }
}

replacePortAxis2 ""
replacePortBaseConfig ""

def replacePort(String tmp) {
    EXTENSIONS = ["*.xml"]
    URL_PREFIX = "(https?://)(.\\{com.intalio.bpms.server.baseUrl})(.*)"
    REPLACE    = (String) "${HTTPS ? "https" : "http"}://\$2\$3"
    EXTENSIONS.each { ext ->
        find("-r", BASE, "-replaceRegex", URL_PREFIX, REPLACE, ext)
    }
}

replacePort ""
