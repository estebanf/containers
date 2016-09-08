 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@ page isErrorPage="true" import="java.io.*"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
<link rel="shortcut icon" href="/everteam/ET_icon.ico" type="image/x-icon"/>
<meta http-equiv="X-UA-Compatible" content="IE=10"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Everteam.iBPMS</title>
<link rel="stylesheet" href="style/plugin/ace.min.css"/>
<link href="style/plugin/bootstrap.min.css" rel="stylesheet"/>
<link href="style/plugin/font-awesome.min.css" rel="stylesheet" />
<script type="text/javascript" src="scripts/plugin/jquery-1.9.1.min.js"></script>
<style type="text/css">
.navbar{
	background:none repeat scroll 0 0 #336699;
}
.cursor{
	cursor: pointer;
	text-decoration:none;
	outline:medium none;
}
pre,div.well{
	background-color:#ffffff !important;	
	border:0px !important;
	box-shadow: 0 0 0 rgba(0, 0, 0, 0.05) inset !important;
}
.error-container,.well{
	margin-top: 0px;
	padding-top: 0px;
}
@font-face {
	font-family: "SegoeUI";
	src: url('style/custom/fonts/segoeui.ttf') format("truetype");
}
</style>
</head>
<body style="font-family:SegoeUI;">
	<div class="error-container">
		<div class="well">
			<h1 class="grey lighter smaller">
				<span class="blue bigger-125">
					<i class="fa fa-random"></i>
					500	</span>	Something Went Wrong
				</h1>
				<div>
					<p><% out.println(exception.getMessage());%></p>
					<div id="stackTrace">
					    <pre><%
							StringWriter stringWriter = new StringWriter();
							PrintWriter printWriter = new PrintWriter(stringWriter);
							exception.printStackTrace(printWriter);
							out.println(stringWriter);
							printWriter.close();
							stringWriter.close();
					%></pre>
					</div>
				</div>
		</div>
	</div>
</body>
</html>