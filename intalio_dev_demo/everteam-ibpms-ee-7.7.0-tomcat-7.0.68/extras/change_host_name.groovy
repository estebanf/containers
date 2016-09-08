/************************************************************************

  This script updates Intalio|BPP configuration and deployment files
  when you change your application server's host name (DNS) or IP address

  To run this script,

  On Windows:

      % cd \path\to\bpms\var\config
      C:\path\to\bpms\extras> groovy.bat change_host_name.groovy

  On Linux, Solaris and other Unix-like:

      % cd /path/to/bpms/extras
      % ./groovy.sh change_host_name.groovy

************************************************************************/ 

println()
println "This script updates Intalio|BPP configuration and deployment files"
println "to change your application server's host name (DNS) or IP address."
println()

console = new BufferedReader(new InputStreamReader(System.in))

HOST = "localhost"
print("Please provide new host name (DNS) or IP address for server [default: ${HOST}] : ")
answer = console.readLine()
if (!answer.trim().equals("")) HOST = answer

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

def replaceURL(String baseURL) {
    EXTENSIONS = [ "*.pipa", "*.properties", "*.xml", "*.bpel", "*.wsdl" ]
    URL_PREFIX = "(https?://)([^:/]*)(:\\d*)"
    REPLACE    = (String) "\$1${HOST}\$3\$4"
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
replaceURL "/ode/"
replaceURL "/xFormsManager/"
replaceURL "/wds/"
replaceURL "/wsi/"
replaceURL "/gi/"
replaceURL "/sling"

def replaceURLAjaxPIPA(String baseURL) {
    EXTENSIONS = ["*.pipa"]
    URL_PREFIX = "(https?\\\\{1}://)([^:/]*)(\\\\{1}:\\d*)"
    REPLACE    = (String) "\$1${HOST}\$3\$4"
    EXTENSIONS.each { ext ->
        find("-r", BASE, "-replaceRegex", URL_PREFIX+"("+baseURL+")", REPLACE, ext)
    }
}

replaceURLAjaxPIPA "/gi/"
replaceURLAjaxPIPA "/ode/"

def replaceURLRMI(String baseURL) {
    EXTENSIONS = [ "*.properties", "*.xml"]
    URL_PREFIX = "(rmi://)([^:/]*)(:\\d*)"
    REPLACE    = (String) "rmi://${HOST}\$3\$4"
    EXTENSIONS.each { ext ->
        find("-r", BASE, "-replaceRegex", URL_PREFIX+"("+baseURL+")", REPLACE, ext)
    }
}

def replaceHostnameBaseConfig(String baseURL) {
    EXTENSIONS = ["base-config.properties"]
    URL_PREFIX = "(com.intalio.bpms.server.baseUrl=)(.*)(:\\d*)"
    REPLACE    = (String) "com.intalio.bpms.server.baseUrl=${HOST}\$3\$4"
    EXTENSIONS.each { ext ->
        find("-r", BASE, "-replaceRegex", URL_PREFIX+"("+baseURL+")", REPLACE, ext)
    }
}
replaceURLRMI "/jcaServer"
replaceHostnameBaseConfig ""
