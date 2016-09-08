println("****************************************************************************")
println "This script copies required files from Intalio BPMS tomcat server to a proxy server,\nThis script assumes LightHTTPD is used as proxy"
println "For running the script user should have adequate permissions to copy files."
println("****************************************************************************")


console = new BufferedReader(new InputStreamReader(System.in))
location = null
while (true) {
	print("Webcontent location of the proxyserver? [default: /var/www] ")
	answer = console.readLine()
	if (answer.length() == 0)
		location = "/var/www"
	else
		location = answer	
	if (location != null) break
	println("Invalid answer: ${answer}")
}



def createDirAsWebContent(String proxyServerWebPath) {
	// println new File("../var/deploy").list()
	new AntBuilder().copy(todir: proxyServerWebPath) {
		fileset(dir : "../var/deploy") {
			include(name:"**/*.js")
			include(name:"**/*.css")
			include(name:"**/*.gif")
			include(name:"**/*.jpg")
			include(name:"**/*.jpeg")
			include(name:"**/*.png")
			include(name:"**/*.xml")
			include(name:"**/*.xsl")
		}
	}
	
	webapp= "/xFormsManager"
	new AntBuilder().mkdir(dir : proxyServerWebPath+webapp)
	new AntBuilder().copy(todir: proxyServerWebPath+webapp) {
		fileset(dir : "../webapps"+webapp) {
			include(name:"**/*.js")
			include(name:"**/*.css")
			include(name:"**/*.gif")
			include(name:"**/*.jpeg")
			include(name:"**/*.jpg")
			include(name:"**/*.png")
			include(name:"**/*.xsl")
			include(name:"**/*.xml")
		}
	}
	
	webapp= "/bpms-console"
	new AntBuilder().mkdir(dir : proxyServerWebPath+webapp)
	new AntBuilder().copy(todir: proxyServerWebPath+webapp) {
		fileset(dir : "../webapps"+webapp) {
			include(name:"**/*.js")
			include(name:"**/*.css")
			include(name:"**/*.gif")
			include(name:"**/*.jpeg")
			include(name:"**/*.jpg")
			include(name:"**/*.png")
			include(name:"**/*.xsl")
			include(name:"**/*.xml")
		}
	}
	
	webapp= "/ui-fw"
	new AntBuilder().mkdir(dir : proxyServerWebPath+webapp)
	new AntBuilder().copy(todir: proxyServerWebPath+webapp) {
		fileset(dir : "../webapps"+webapp) {
			include(name:"**/*.js")
			include(name:"**/*.css")
			include(name:"**/*.gif")
			include(name:"**/*.jpeg")
			include(name:"**/*.jpg")
			include(name:"**/*.png")
			include(name:"**/*.xsl")
			include(name:"**/*.xml")
		}
	}
	webapp= "/gi"
	new AntBuilder().mkdir(dir : proxyServerWebPath+webapp)
	new AntBuilder().copy(todir: proxyServerWebPath+webapp) {
		fileset(dir : "../webapps"+webapp) {
			include(name:"**/*.js")
			include(name:"**/*.css")
			include(name:"**/*.gif")
			include(name:"**/*.jpeg")
			include(name:"**/*.jpg")
			include(name:"**/*.png")
			include(name:"**/*.xml")
			include(name:"**/*.xsl")
			include(name:"**/*.html")
		}
	}
	webapp= "/gi/apppath"
	new AntBuilder().mkdir(dir : proxyServerWebPath+webapp)
	new AntBuilder().copy(todir: proxyServerWebPath+webapp) {
		fileset(dir : "../var/deploy") {
			include(name:"**/*.js")
			include(name:"**/*.css")
			include(name:"**/*.gif")
			include(name:"**/*.jpeg")
			include(name:"**/*.xsl")
			include(name:"**/*.png")
			include(name:"**/*.xml")
			include(name:"**/*.html")
		}
	}
}


createDirAsWebContent location

