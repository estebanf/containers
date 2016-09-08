/************************************************************************

  This script updates Intalio|BPP configuration files to use a given
  RMI port.

  To run this script,

  On Windows:

      % cd \path\to\bpms\var\config
      C:\path\to\bpms\extras> groovy.bat change_rmi_port.groovy

  On Linux, Solaris and other Unix-like:

      % cd /path/to/bpms/extras
      % ./groovy.sh change_rmi_port.groovy

************************************************************************/ 

println()
println "This script updates Intalio|BPP configuration files to use a given"
println "RMI port"
println()

console = new BufferedReader(new InputStreamReader(System.in))

RMI_PORT = 2099

while (true) {
    print("New RMI port number? [default: ${RMI_PORT}] ")
    answer = console.readLine()
    if (answer.trim().equals("")) break 
    try {
        RMI_PORT = Integer.parseInt(answer)
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

find "-r", BASE+"/", "-replaceRegex", "(rmi://)([^:/]*)(:\\d*)(/jcaServer)", (String) "rmi://\$2:${RMI_PORT}\$4", "*.properties", "*.xml"
find "-r", BASE+"/", "-replaceRegex", "(jca.port=)(\\d*)", (String) "\$1${RMI_PORT}", "*.properties"

