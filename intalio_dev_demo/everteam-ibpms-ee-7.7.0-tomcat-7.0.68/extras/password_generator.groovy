/************************************************************************

  This script allows encoding an input word using Password Based Encryption.
  This can be used to generate passwords required for creation of new user in
  Intalio Database Security Provider table.

  To run this script,

  For Tomcat version:
    On Windows:
      C:\...> groovy.bat -cp "..\webapps\everteam\WEB-INF\lib\*;" password_generator.groovy -v word

    On Linux, Solaris and other Unix-like:
      % ./groovy.sh -cp "../webapps/everteam/WEB-INF/lib/*" password_generator.groovy -v word

  For JBoss version:
    On Windows:
      C:\...> groovy.bat -cp "..\standalone\deployments\everteam.war\WEB-INF\lib\*;" password_generator.groovy -v word

    On Linux, Solaris and other Unix-like:
      % ./groovy.sh -cp "../standalone/deployments/everteam.war/WEB-INF/lib/*" password_generator.groovy -v word
************************************************************************/
import org.jasypt.util.text.BasicTextEncryptor;
import org.intalio.tempo.security.database.util.DatabaseHelperUtil;

if (args.length < 2) {
  println "Usage:"
  println "   -v word                Enter a value to be encoded using Password Based Encryption"
  return
}

for (i=0; i<args.length; i++) {
    // Encode input word using Password Based Encryption
    if (args[i] == "-v") {
	word = args[i+1]
	BasicTextEncryptor encryptor = new BasicTextEncryptor();
        encryptor.setPassword(DatabaseHelperUtil.ENCRYPTED_PASSWORD);
        println encryptor.encrypt(word);
	i++
  }
}
