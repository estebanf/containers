 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
	<link href="style/custom/users/users.css?version=2676" rel="stylesheet"/>
	<script type="text/javascript" src="scripts/custom/users/users.js?version=2676"></script>
	<script>
	var propertiesArray = [];
	function validateData()
	{
		propertiesArray = [];
		var flag = true;
		if($("#fetchedRealms").val()=="select"){
			$("#errorMessage").text("<fmt:message key='accesscontrol_roles_modalCreateRole_realm_error'/>");
			return false;
		}
		else if($("#identifier").val()=="") {
			$("#errorMessage").text("<fmt:message key='accesscontrol_users_modalCreateRole_Identifier_error'/>");
			return false;
		}
		
		$("#inputProperties input").each(function(){
			if($(this).parent().hasClass('search-field')==false)
			{
					if($(this).val()=="") {
						var message = "<fmt:message key='accesscontrol_roles_modalCreateRole_property_error'/>"
						message  = message.replace("{0}",capitaliseFirstLetterUser($(this).attr('name')));
						$("#errorMessage").text(message);
						propertiesArray = [];
						flag = false;
					}
					else if($(this).attr('id').indexOf('email')>=0 && validateEmail($(this).val())==false) {
						var message = "<fmt:message key='accesscontrol_users_modalCreateUser_email_error'/>"
						$("#errorMessage").text(message);
						propertiesArray = [];
						flag = false;
					}
					else if($(this).val()!="") 
						propertiesArray[propertiesArray.length] = ""+$(this).attr('name')+":"+$(this).val()+"";
			}
		});
		
		$("#inputProperties select").each(function(){
			if($(this).val()==null || $(this).val()=="null") {
				var message = "<fmt:message key='accesscontrol_roles_modalCreateRole_property_error'/>"
				message  = message.replace("{0}",capitaliseFirstLetterUser($(this).attr('id')));
				$("#errorMessage").text(message);
				propertiesArray = [];
				flag = false;
			}
			else if($(this).val()!="") 
			{ 
				for(var k=0; k < $(this).val().length; k++)
					propertiesArray[propertiesArray.length] = ""+$(this).attr('id')+":"+$(this).val()[k]+"";
			}	
		});
				
		if(flag)
			return true;
		else 
			return false;
	}
	function usersButtonHeader(userIcon) {
		var iconButton; 
		switch(userIcon){
			case "create":
				iconButton = "<button type='button' id='createButton' onclick='javascript:openCreateUserModal();' class='btn btn-sm btn-white'><i class='icon-plus-sign'></i>&nbsp;<fmt:message key='accesscontrol_roles_table_header_button_create'/></button>&nbsp;";
				return iconButton;
				break;
			case "update":
				iconButton = "<button type='button' id='updateButton' onclick='javascript:openUpdateUserModal();' class='btn btn-sm btn-white'><i class='icon-edit'></i>&nbsp;<fmt:message key='accesscontrol_roles_table_header_button_update'/></button>&nbsp;";
				return iconButton;
				break;
			case "delete":
				iconButton = "<button type='button' id='deleteButton' onclick='javascript:openDeleteUserModal();' class='btn btn-sm btn-white'><i class='icon-trash'></i>&nbsp;<fmt:message key='accesscontrol_roles_table_header_button_delete'/></button>&nbsp;";
				return iconButton;
				break;
			case "viewAllUsers":
				iconButton = '<a title=<fmt:message key="org_intalio_uifw_tabls_refresh"/> class="btn btn-sm btn-white table_refresh_icon" onclick=getUserList("updateUserList");><i class="icon-refresh"></i></a>';
				return $(iconButton);
			break;
		}
	}
	function showSelectInformation(){
		showInformation("<fmt:message key='accesscontrol_users_select_errorMessage'/>");
		return false;
	}
	function capitaliseFirstLetterUser(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	</script>
</head>
<body>
	<div id="breadcrumbs" class="breadcrumbs">
		<ul class="breadcrumb">
			<li><i class="icon-code-fork"></i>&nbsp;&nbsp;&nbsp;<fmt:message key="accesscontrol_roles_breadcrumb"/>&nbsp;&nbsp;</li>
				<li class="active"><a href="#" class="noDecoration" onclick="javascript:getAttributes();"><fmt:message key="accesscontrol_roles_breadcrumb_users"/></a></li>
		</ul>
	</div>
	<div class="page-content">
		<div id="usersTableDiv" class="col-xs-12">
			<div class="table-responsive">
				<table id="usersTable"	class="table table-striped table-bordered table-hover">
					<thead>
						<tr id="usersHeader">
							<th></th>
							<th class="nowrap"><fmt:message key="accesscontrol_roles_table_header_Identifier_user"/></th>
							<th class="nowrap"><fmt:message key="accesscontrol_roles_table_header_realm"/></th>
						</tr>
					</thead>
					<tbody id="users_rows">
					</tbody>
				</table>
			</div> 
		</div>
	</div>
		<div id="createUserModal" class="modal fade" tabindex="-1"
			role="dialog" aria-labelledby="createUserModal" aria-hidden="true">
			<div class="modal-dialog">
			<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<span class="modal_heading" id="createUserModalHeader">
					<fmt:message key="accesscontrol_users_modalCreateUser_title"/>
				</span>
				<span class="modal_heading" id="updateUserModalHeader">
					<fmt:message key="accesscontrol_users_modalUpdateUser_title"/>
				</span>
			</div>
			<div class="modal-body">
				<span id="errorMessage" class="text-danger"></span>
				<table id="userModalBody" style="width:100%">
					<tr><td><fmt:message key="accesscontrol_roles_table_header_Identifier_user"/></td>
					<td>
						<span class="createUser">
							<input type="text" id="identifier" onkeyup="javscript:removeErrorMessage()" class="input-sm userProperties">
						</span>
					</td></tr>
					<tr><td><fmt:message key="accesscontrol_roles_table_header_realm"/></td>
					<td>
						<span class="createUser">
					 		<select id="fetchedRealms"></select>
						</span>
					</td></tr>
				</table>
			</div>
			<div class="modal-footer">
				<span class="pull-left"><select class="properties" id="property"></select></span>
				<button id="buttonCreateUser" onclick="javascript:configureUser('create')"; type="button" aria-hidden="true"
					class="btn btn-primary btn-sm pull-right"><fmt:message key="org_intalio_common_create"/></button>
				<button id="buttonUpdateUser" onclick="javascript:configureUser('update');" type="button" aria-hidden="true"
					class="btn btn-primary btn-sm pull-right"><fmt:message key="org_intalio_common_settings_update"/></button>
			</div>
			</div>
			</div>
	</div>
	<div id="deleteUser" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="accesscontrol_users_modalDeleteUser_title"/></span>
				</div>
				<div class="modal-body">
				<p class=""><fmt:message key="accesscontrol_users_modalDeleteUser_message"/></p>
				</div>
				<div class="modal-footer">
					<button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="deleteUser();"><fmt:message key='org_intalio_common_confirm'/></button>
				</div>
			</div>
		</div>
	</div>
	<span id="selecUserRealms" class="hide"><fmt:message key="accesscontrol_user_create_user_select_realm"/></span>
</body>
</html>
