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
<meta charset="utf-8"/>
<link href="style/custom/administration/organization_mapping/orgMappingUsers.css?version=2676" rel="stylesheet"/>

</head>
<body>
	<div id="breadcrumbs" class="breadcrumbs">
		<ul class="breadcrumb">
			<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;
			<li><fmt:message key="com_intalio_bpms_module_administration_org_mapping"/></li>
			<li class="active"><a href="#" class="noDecoration" onclick="javascript:selectMenuAndChangepage(this,'users','orgMappingUsers.htm');"><fmt:message key="com_intalio_bpms_module_administration_access_control_users"/></a></li>
		</ul>
	</div>
	<div class="page-content">
	<div class="col-sm-12 org-users">
	<button class="btn btn-white btn-sm" type="button" onclick="showImportModal();"><i class="fa fa-cloud-download"></i> <fmt:message key="org_mapping_role_import"/></button>
	<button class="btn btn-white btn-sm collpaseExpand" type="button" onclick="collapseAllUsers(this);"><i class="fa fa-minus-square"></i> <fmt:message key="org_mapping_users_collapse_all"/></button>
	<button class="btn btn-white btn-sm ace-popover sync-button" type="button" onclick="modalShow('syncUsersModal');" data-placement="bottom" data-content="" data-trigger="hover" data-html='true' id="syncButton"><i class="fa fa-repeat"></i> <fmt:message key="org_mapping_users_sync_button"/></button>
	<span class="pull-right users-right-buttons">
		<span class="pull-right"><button type="button" class="btn btn-white btn-sm" onclick="initUsers();" title="Refresh"><i class="fa fa-refresh"></i></button></span>
		<span class="search-users pull-left"><input class="form-control users-search" onkeyup="applySearch(this);" placeholder='<fmt:message key="org_intalio_datatable_search_records"/>'/></span>
	
	</span>
	</div>
	<div id="draggableUsers" class="dd dd-draghandle" style="width:100%">
		
	</div>
		<div class="org-users-submit">
		<button class="btn btn-primary btn-sm user-submit" type="button" onclick="ou.updateUser();"><fmt:message key="org_mapping_users_save"/></button>
		</div>
	</div>

	<div id='importUsersModal' class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-hidden="true" data-dismiss="modal">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="org_mapping_import_modal_head"/></span>
				</div>
				<div class="modal-body">
				<span class="text-danger error-msg hide"></span>
				<table class="importUsersTable" style="width:100%;">
					<tr>
						<td><fmt:message key="org_mapping_roles_specify_roles"/></td>
						<td><select id="orgRolesSelect" multiple="" data-placeholder="<fmt:message key='org_mapping_choose_roles'/>" class="chosen-select" onchange="getSelectedUsers()"></select>
						</td>
					</tr>
					<tr>
						<td><fmt:message key="org_mapping_roles_specify_users"/></td>
						<td><select id="orgUsersSelect" multiple="" data-placeholder="<fmt:message key='org_mapping_choose_users'/>" onchange="validateUserSelection()"></select>
						</td>
					</tr>
					<tr id="treeHierarchy">
						<td colspan="2">
								<input type="checkbox" class="ace" id="tree-hierarchy"  name="tree-hierarchy">
								<span class="lbl">&nbsp;&nbsp;<fmt:message key="org_mapping_users_add_subordinate_tree_msg"/></span>
						<td>
					</tr>
				</table>

				</div>
				<div class="modal-footer">
					<button id="importUsers" onclick="javascript:importSelectedUsers();" aria-hidden="true"	class="btn btn-primary btn-xs" type="button"></button>
				</div>
			</div>
		</div>
	</div>
	<div id='deleteUsersModal' class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-hidden="true" data-dismiss="modal">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<div class=""><fmt:message key="org_mapping_users_delete_user_confirmation"/></div>
					<label class="delete-user">
						<input type="checkbox" class="ace" id="delete-hierarchy"  name="delete-hierarchy">
						<span class="lbl"> Delete hierarchy</span>
					</label>
				</div>
				<div class="modal-footer">
					<button aria-hidden="true"	class="btn btn-danger btn-xs" type="button"><fmt:message key="org_mapping_users_delete"/></button>
				</div>
			</div>
		</div>
	</div>
	<div id='syncUsersModal' class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-hidden="true" data-dismiss="modal">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="org_mapping_users_sync_confirm_heading"/></span>
				</div>
				<div class="modal-body">
					<div class=""><fmt:message key="org_mapping_users_sync_confirm_message"/></div>
				</div>
				<div class="modal-footer">
					<button aria-hidden="true"	onclick='syncUsersDb()' class="btn btn-danger btn-xs" type="button"><fmt:message key="org_intalio_common_confirm"/></button>
				</div>
			</div>
		</div>
	</div>
	<span id="usersDefineHierachy" class="hide"><fmt:message key="org_mapping_users_define_hierachy"/></span>
	<span id="usersDelete" class="hide"><fmt:message key="org_mapping_users_delete"/></span>
	<span id="usersAddSubordinates" class="hide"><fmt:message key="org_mapping_users_add_subordinates"/></span>
	<span id="usersDeleteUser" class="hide"><fmt:message key="org_mapping_users_delete_user"/></span>
	<span id="usersDeleteUserConfirmation" class="hide"><fmt:message key="org_mapping_users_delete_user_confirmation"/></span>
	<span id="usersSelectOneUser" class="hide"><fmt:message key="org_mapping_users_select_one_user"/></span>
	<span id="usersDifferentManager" class="hide"><fmt:message key="org_mapping_users_different_manager"/></span>
	<span id="usersNoSearchResults" class="hide"><fmt:message key="org_mapping_users_no_search_results"/></span>
	<span id="usersExpandAll" class="hide"><fmt:message key="org_mapping_users_expand_all"/></span>
	<span id="usersCollapseAll" class="hide"><fmt:message key="org_mapping_users_collapse_all"/></span>
	<span id="updateManagerFail" class="hide"><fmt:message key="org_mapping_users_manager_update_fail"/></span>
	<span id="updateManagerPartial" class="hide"><fmt:message key="org_mapping_users_manager_update_partial"/></span>
	<span id="updateManagerSuccess" class="hide"><fmt:message key="org_mapping_users_manager_update_success"/></span>
	<span id="roleErrorMessage" class="hide"><fmt:message key="org_mapping_users_import_error_message_role"/></span>
	<span id="noUsersErrorMessage" class="hide"><fmt:message key="org_mapping_roles_no_users_found"/></span>
	<span id="imprtUsers" class="hide"><fmt:message key="org_mapping_import_modal_head"/></span>
	
	<script src="scripts/plugin/jquery.nestable.min.js"></script>
	<script src="scripts/custom/administration/organization_mapping/orgMappingUsers.js?version=2676"></script>
	

</body>
</html>
