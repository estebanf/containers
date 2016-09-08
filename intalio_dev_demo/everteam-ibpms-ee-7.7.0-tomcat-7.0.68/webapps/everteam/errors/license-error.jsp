<%@ page contentType="text/html; charset=utf-8" %>
<html>
  <head>
    <title>Everteam.iBPMS Error Report</title>
    <style><!--H2 {font-family:Tahoma,Arial,sans-serif;font-size:17px;} BODY {font-family:Tahoma,Arial,sans-serif;color:black;background-color:white;} P {font-family:Tahoma,Arial,sans-serif;font-size:15px;} HR {color : #525D76;}--></style>
  </head>
  <body>
    <h2><%= request.getParameter("name") %> feature is available only with Enterprise Edition license.</h2>
    <HR size="1" noshade="noshade" />
    <p>Everteam.iBPMS license is not found or invalid. Enterprise Edition features are disabled. Please contact support@intalio.com for assistance, or sign up for <a href="http://www.intalio.com/try-intaliobpms-enterprise-edition-free-for-45-days/">Enterprise Edition trial</a>.</p>
    <HR size="1" noshade="noshade" />
  </body>
</html>