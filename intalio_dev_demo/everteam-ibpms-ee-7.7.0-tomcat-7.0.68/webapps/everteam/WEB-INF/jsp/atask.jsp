 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <link rel="shortcut icon" href="/everteam/ET_icon.ico" type="image/x-icon"/>
    <script type="text/javascript" src="../scripts/plugin/jquery-1.9.1.min.js"></script>
    <script type="text/javascript">var one_task_page = true /*Flag to safeguard changes */</script>
  </head>
  <body>
   <iframe src="${taskform}" name="taskform" frameborder="0" id="taskform" width="100%"></iframe>
   <script type="text/javascript">
        $("#taskform").css('height',$(window).height()-50+'px');
    </script>
  </body>
</html>
