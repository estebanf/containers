 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
</head>
<body>
	<div class="navbar navbar-default" id="navbar-top">
		<div class="navbar-inner">
			<button id="menu-toggler" class="navbar-toggle menu-toggler pull-left" type="button">
				<span class="sr-only">Toggle sidebar</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<div class="navbar-header pull-left">
				<a href="#" class="navbar-brand">
				<small>
				<img src="images/everteam.png"/>
				</small>
				</a>
			</div>
			<div class="navbar-buttons navbar-header pull-right" role="navigation">
				<ul class="nav ace-nav pull-right">
					<li><a id="user_menu_dropdown" data-toggle="dropdown"
						href="#" class="dropdown-toggle"> 
						<img alt="" src="ui-fw/user/avatar" class="bpms_user_photo">
						<span id="user_info"> </span> <span
							id="userid" class="hide"> </span><i class="fa fa-caret-down"></i>
					</a>

						<ul
							class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close"
							id="user_menu">
							<li id="moduleUserProfile"><a href="#" onclick="selectMenuAndChangepage(this,'profile','userPreferences.htm')">
									<i class="fa fa-user"></i> <fmt:message key="user_preferences_profile_preferences"/>
							</a></li>
							<li><a href="#"
							onclick="window.open('http://support.intalio.com', '_blank');">
									<i class="fa fa-question-circle"></i> <fmt:message key="org_intalio_common_header_wiki"/>
							</a></li>
							
							<li><a href="#" onclick="getServerVersions();return false;"> <i class="fa fa-info-circle"></i>
									<fmt:message key="org_intalio_common_header_version"/>
							</a></li>

							<li class="divider"></li>

							<li><a href="#"
								onclick="submitActionToURL('login.htm', 'logOut');"> <i
									class="fa fa-power-off"></i> <fmt:message key="org_intalio_common_header_logout"/>
							</a></li>
						</ul></li>
				</ul>
				<span id="inActiveTimer" class="pull-right"></span>
				<!--/.ace-nav-->
			</div>
			<!--/.container-fluid-->
		</div>
		<!--/.navbar-inner-->
	</div>
	<div id="serverVersionsID" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="label" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
					<span class="modal_heading"id="label"><fmt:message key="org_intalio_common_header_version"/></span>
				</div>
				<div class="modal-body ">
					<div id="versionInfo">
						<table id="serverVersionTable"  class="table table-striped table-bordered table-hover" style="width:100%">
							<thead>
								<th><fmt:message key="org_intalio_server_component"/></th>
								<th><fmt:message key="org_intalio_server_version"/></th>
							</thead>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
<%@ include file="comment.jsp"%>
</body>
</html>
