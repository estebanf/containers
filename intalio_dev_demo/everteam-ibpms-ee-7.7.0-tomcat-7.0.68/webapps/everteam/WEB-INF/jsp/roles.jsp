 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
	<link href="style/custom/roles/roles.css?version=2676" rel="stylesheet"/>
	<script type="text/javascript" src="scripts/custom/roles/roles.js?version=2676"></script>
	<script type="text/javascript">
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
			$("#errorMessage").text("<fmt:message key='accesscontrol_roles_modalCreateRole_Identifier_error'/>");
			return false;
		}
		$("#inputProperties input").each(function(){
			if($(this).parent().hasClass('search-field')==false)
			{
					if($(this).val()=="") {
						var message = "<fmt:message key='accesscontrol_roles_modalCreateRole_property_error'/>"
						if($(this).attr('id').indexOf('member')>=0)
							message  = message.replace("{0}",'Member');
						else
							message  = message.replace("{0}",capitaliseFirstLetterRole($(this).attr('id')));
						$("#errorMessage").text(message);
						propertiesArray = [];
						flag = false;
					}
					else if($(this).val()!="" && $(this).attr('id').indexOf('member')>=0)
					{
						var regex = new RegExp("dc=com,", 'g');
						var members = $(this).val().replace(regex,'dc=com ');
						var splitMembers = members.split(" ");
						for (var j=0;j<splitMembers.length;j++) {
							propertiesArray[propertiesArray.length] = "member:"+splitMembers[j]+"";
						}
					}
					else if($(this).val()!="") 
						propertiesArray[propertiesArray.length] = ""+$(this).attr('id')+":"+$(this).val()+"";
			}
		});
		
		$("#inputProperties select").each(function(){
			if($(this).val()==null || $(this).val()=="null") {
				var message = "<fmt:message key='accesscontrol_roles_modalCreateRole_property_error'/>"
				message  = message.replace("{0}",capitaliseFirstLetterRole($(this).attr('id')));
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
	
	function rolesButtonHeader(roleIcon) {
		var iconButton; 
		switch(roleIcon){
			case "create":
				iconButton = "<button type='button' id='createButton' onclick='javascript:openCreateRoleModal();' class='btn btn-sm btn-white'><i class='icon-plus-sign'></i>&nbsp;<fmt:message key='accesscontrol_roles_table_header_button_create'/></button>&nbsp;";
				return iconButton;
				break;
			case "update":
				iconButton = "<button type='button' id='updateButton' onclick='javascript:openUpdateRoleModal();' class='btn btn-sm btn-white'><i class='icon-edit'></i>&nbsp;<fmt:message key='accesscontrol_roles_table_header_button_update'/></button>&nbsp;";
				return iconButton;
				break;
			case "delete":
				iconButton = "<button type='button' id='deleteButton' onclick='javascript:openDeleteRoleModal();' class='btn btn-sm btn-white'><i class='icon-trash'></i>&nbsp;<fmt:message key='accesscontrol_roles_table_header_button_delete'/></button>&nbsp;";
				return iconButton;
				break;
			case "viewAllRoles":
				iconButton = '<a title=<fmt:message key="org_intalio_uifw_tabls_refresh"/> class="btn btn-sm btn-white table_refresh_icon" onclick=getRoleList("updateRoleList");><i class="icon-refresh"></i></a>';
				return $(iconButton);
				break;
		}
	}
	function showSelectInformation(){
		showInformation("<fmt:message key='accesscontrol_roles_select_errorMessage'/>");
		return false;
	}

	function showMemberErrorMessage(){
		var message = "<fmt:message key='accesscontrol_roles_modalUpdateRole_property_member_error'/>"
		$("#errorMessage").text(message);
	}

	function capitaliseFirstLetterRole(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	</script>
</head>
<body>
	<div id="breadcrumbs" class="breadcrumbs">
		<ul class="breadcrumb">
			<li><i class="icon-code-fork"></i>&nbsp;&nbsp;&nbsp;<fmt:message key="accesscontrol_roles_breadcrumb"/>&nbsp;&nbsp;</li>
				<li class="active"><a href="#" class="noDecoration" onclick="javascript:getAttributes();"><fmt:message key="accesscontrol_roles_breadcrumb_roles"/></a></li>
		</ul>
	</div>
	<div class="page-content">
		<div id="rolesTableDiv" class="col-xs-12">
			<div class="table-responsive">
				<table id="rolesTable"	class="table table-striped table-bordered table-hover">
					<thead>
						<tr id="rolesHeader">
							<th></th>
							<th><fmt:message key="accesscontrol_roles_table_header_Identifier"/></th>
							<th><fmt:message key="accesscontrol_roles_table_header_realm"/></th>
						</tr>
					</thead>
					<tbody id="roles_rows">
					</tbody>
				</table>
			</div> 
		</div>
	</div>
	<div id="createRoleModal" class="modal fade" tabindex="-1"
			role="dialog" aria-labelledby="createRoleModal" aria-hidden="true">
			<div class="modal-dialog">
			<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<span class="modal_heading" id="createRoleModalHeader">
					<fmt:message key="accesscontrol_roles_modalCreateRole_title"/>
				</span>
				<span class="modal_heading" id="updateRoleModalHeader">
					<fmt:message key="accesscontrol_roles_modalUpdateRole_title"/>
				</span>
			</div>
			<div class="modal-body modal-create-update-role">
				<span id="errorMessage" class="text-danger"></span>
				<table id="roleModalBody" style="width:100%">
					<tr>
						<td><fmt:message key="accesscontrol_roles_table_header_Identifier"/></td> 
						<td>
							<span class="createRole"><input type="text" id="identifier" onkeyup="javscript:removeErrorMessage()" class="input-sm roleProperties"></span>
						</td></tr>
					<tr>
						<td><fmt:message key="accesscontrol_roles_table_header_realm"/></td>
						<td>
							<span class="createRole"><select id="fetchedRealms"></select></span>
						</td>
					</tr>
				</table>
			</div>
			<div class="modal-footer">
				<span class="pull-left"><select class="properties" id="property"></select></span>
				<button id="buttonCreateRole" onclick="javascript:configureRole('create')"; type="button" aria-hidden="true"
					class="btn btn-primary btn-sm pull-right"><fmt:message key="org_intalio_common_create"/></button>
				<button id="buttonUpdateRole" onclick="javascript:configureRole('update');" type="button" aria-hidden="true"
					class="btn btn-primary btn-sm pull-right"><fmt:message key="org_intalio_common_settings_update"/></button>
			</div>
			</div>
			</div>
	</div>
	<div id="deleteRole" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="accesscontrol_roles_modalDeleteRole_title"/></span>
				</div>
				<div class="modal-body">
				<p class=""><fmt:message key="accesscontrol_roles_modalDeleteRole_message"/></p>
				</div>
				<div class="modal-footer">
					<button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="deleteRole();"><fmt:message key='org_intalio_common_confirm'/></button>
				</div>
			</div>
		</div>
	</div>
	<span id="selecRoleRealms" class="hide"><fmt:message key="accesscontrol_user_create_user_select_realm"/></span>
</body>
</html>
