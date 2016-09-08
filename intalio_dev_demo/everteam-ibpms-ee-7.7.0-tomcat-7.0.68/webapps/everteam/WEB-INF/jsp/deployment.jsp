 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<style type="text/css">
.text-danger{
		color: #B94A48;
	}
</style>
<script type="text/javascript">
	function validate(){
		var errormsg = "";
		var error = 0;
		var deployPath = document.form.file.value;
		var re = new RegExp(/^\s(\S*)\s*/);
		deployPath = deployPath.replace(re,"");
		if (deployPath.length == 0){
			errormsg += "Please choose Zip File. \n";
			document.getElementById("deployErrMsg").innerHTML=errormsg;
			return false;
		}else {
			var extension = deployPath.substr(deployPath.lastIndexOf('.'));
			errormsg = "";
			if(extension != ".zip"){
				errormsg += "Please choose only Zip File. \n";
				document.getElementById("deployErrMsg").innerHTML=errormsg;
				return false;
			}else {
				document.getElementById("deployErrMsg").innerHTML="";
				document.getElementById('form').action = "console/deployment/processes/deploy?browser-specific";
				document.getElementById('form').type = "submit";
				return true;
			}
		}
	}
</script>
<span id="deployErrMsg" class="text-danger"></span>
<form id="form" enctype="multipart/form-data" name="form" method="POST" style="display:inline;" action="" onsubmit="return validate()">
	<table width="600" border="0" cellspacing="0" cellpadding="4" style="margin-left: 10px; ">
		<tr>
			<td width="200" style=""><fmt:message key="com_intalio_bpms_console_processes_pathToFile"/></td>
			<td width="200"><input type="file" name="file" id ="file" value="" /></td>
			<td width="200" ><input type="submit" value='<fmt:message key="com_intalio_bpms_console_processes_deploy"/>' /></td>
		</tr>
	</table>
</form>
<br/><br/>
</html>

