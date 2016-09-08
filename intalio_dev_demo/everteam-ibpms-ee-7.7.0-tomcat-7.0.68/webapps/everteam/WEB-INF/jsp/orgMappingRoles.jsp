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
<link href="style/custom/administration/organization_mapping/orgMappingRoles.css?version=2676" rel="stylesheet"/>
</head>
<body>
	<div id="breadcrumbs" class="breadcrumbs">
		<ul class="breadcrumb">
			<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;
			<li><fmt:message key="com_intalio_bpms_module_administration_org_mapping"/></li>
			<li class="active"><a href="#" class="noDecoration" onclick="javascript:listRoles();"><fmt:message key="org_mapping_roles_breadcrump_define_roles"/></a></li>
		</ul>
	</div>
	<div class="page-content">
		<div  class="col-xs-12">
			<div class="table-responsive">
				<table id="org_roles_table" class="table table-striped table-bordered table-hover">
					<thead>
						<tr id="orgRoleHeaders">
							<th><label class="position-relative"><input type="checkbox" onclick='javascript:selectDeselectAll(this)' class="ace" onclick="updateRoleHeader(this)" class="nowrap"><span class="lbl"></span></label></th>
							<th><fmt:message key="org_mapping_role_header_role"/></th>
							<th><fmt:message key="org_mapping_role_header_description"/></th>
							<th><fmt:message key="org_mapping_role_type"/></th>
							<th><fmt:message key="org_mapping_role_header_assigned_users"/></th>
							<th>UserIDs</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div id="org_create_role" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="org_mapping_role_create_role_header"/></span>
				</div>
				<div class="modal-body">
					<span id="orgErrorMessage" class="text-danger"></span>
					<table class='table noLines'>
						<tr>
							<td><fmt:message key="org_mapping_role_header_create_role_name"/></td>
							<td><input type="text" id="orgRoleName" onkeypress="javascript:removeErrorMsg(this,'orgErrorMessage')"; maxlength="100"></td>
						</tr>
						<tr>
							<td><fmt:message key="org_mapping_role_header_description"/></td>
							<td><textarea maxlength="100" id="orgRoleDescription" onkeypress="javascript:removeErrorMsg(this,'orgErrorMessage')";/></td>
						</tr>
						<tr>
							<td><fmt:message key="org_mapping_realm"/></td>
							<td><select id='orgRealm' onchange="javascript:removeErrorMsg(this,'orgErrorMessage')";></select>&nbsp;&nbsp;&nbsp;<span title='Add Realm' id="addRealmSpan" class='addNewRealm' onclick='javascript:addTextBox(this);'><i class="fa fa-plus-circle"></i></span>
							</td>
						</tr>
						<tr>
							<td><fmt:message key="org_mapping_role_type"/></td>
							<td><input type="text" id="orgRoleType" value="Internal" readonly></td>
						</tr>
						<tr>
							<td><fmt:message key="org_mapping_role_assign_users"/></td>
							<td><select id='orgAssignUsers' multiple="" data-placeholder="Select user..." onchange="javascript:removeErrorMsg(this,'orgErrorMessage')";></select></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<a type="button" class="btn btn-primary btn-sm"  onclick="createRole();"> <fmt:message key="org_mapping_role_button_create"/></a>
				</div>
			</div>
		</div>
	</div>
	<div id="deleteRoles" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="org_mapping_role_delete_header"/></span>
				</div>
				<div class="modal-body">
					<p class=""></p>
				</div>
				<div class="modal-footer">
					<button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="deleteRoles();"><fmt:message key='org_intalio_common_confirm'/></button>
				</div>
			</div>
		</div>
	</div>
	<div id="syncRoles" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="org_mapping_roles_sync_confirm_heading"/></span>
				</div>
				<div class="modal-body">
					<p class=""><fmt:message key="org_mapping_roles_sync_confirm_message"/></p>
				</div>
				<div class="modal-footer">
					<button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="javascript:syncRoles();"><fmt:message key='org_intalio_common_confirm'/></button>
				</div>
			</div>
		</div>
	</div>
	<div id="importRoles" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key='org_mapping_role_import_header'/></span>
				</div>
				<div class="modal-body">
					<span id="orgErrorMessageImport" class="text-danger"></span>
					<table class="table noLines"><tr><td>
					<fmt:message key="org_mapping_roles_specify_external_roles"/></td><td>
					<select id="orgRolesSelect" multiple="" onchange="javascript:removeErrorMsg(this,'orgErrorMessageImport');" data-placeholder="<fmt:message key='org_mapping_choose_roles'/>" class="chosen-select">
					</select></td></tr></table>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary btn-sm"  type="button" aria-hidden="true" onclick="importSelectedRoles();"><fmt:message key='org_mapping_role_button_import'/></button>
				</div>
			</div>
		</div>
	</div>
	<div id="org_update_role" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="org_mapping_role_update_role_header"/></span>
				</div>
				<div class="modal-body">
					<span id="orgUpdateErrorMessage" class="text-danger"></span>
					<table class='table noLines'>
						<tr>
							<td><fmt:message key="org_mapping_role_header_role"/></td>
							<td><input type="text" id="orgUpdateRoleName" onkeypress="javascript:removeErrorMsg(this,'orgUpdateErrorMessage')"; readonly></td>
						</tr>
						<tr>
							<td><fmt:message key="org_mapping_role_header_description"/></td>
							<td><textarea maxlength="100" id="orgUpdateRoleDescription" onkeypress="javascript:removeErrorMsg(this,'orgUpdateErrorMessage')";/></td>
						</tr>
						<tr>
							<td><fmt:message key="org_mapping_role_assign_users"/></td>
							<td><select id='orgUpdateAssignUsers' multiple="" data-placeholder="Choose a user..." onchange="javascript:removeErrorMsg(this,'orgUpdateErrorMessage')";></select></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<a type="button" class="btn btn-primary btn-sm"  onclick="updateRole();"> <fmt:message key="org_mapping_role_button_update"/></a>
				</div>
			</div>
		</div>
	</div>
	<div class='hide'>
		"<span class='pageSizePagination'><label><fmt:message key='org_intalio_uifw_tables_entries_per_page'/></label><select id='noOfRoles' onchange=javscript:updateNoOfRoles(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></span>"
		"<table id='paginationTable' cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' title='First page' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getLastFirstPageData('first');></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' title='Previous page' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getNextPrevPageData('prev');></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'>Page &nbsp;<input id='rolesPageNo' type='text' role='textbox' onkeydown=javascript:getRolesPageNoData(event); maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; of &nbsp;<span id='sp_1_grid-pager' class='totalPageNo'></span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' title='Next page' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPrevPageData('next');></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' title='Last page'class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastFirstPageData('last');></span></td></tr></tbody></table>"
	</div>
	<div class='hide'>
		<span id="createButton"><fmt:message key="org_mapping_role_button_create"/></span>
		<span id="updateButton"><fmt:message key="org_mapping_role_button_update"/></span>
		<span id="deleteButton"><fmt:message key="org_mapping_role_button_delete"/></span>
		<span id="validateSelect"><fmt:message key="org_mapping_role_select_one"/></span>
		<span id="validateRoleSelect"><fmt:message key="org_mapping_role_select_atleast_one"/></span>
		<span id="validateName"><fmt:message key="org_mapping_role_create_name_validate"/></span>
		<span id="validateDescription"><fmt:message key="org_mapping_role_create_description_validate"/></span>
		<span id="validateRealm"><fmt:message key="org_mapping_role_create_realm_validate"/></span>
		<span id="validateRealmName"><fmt:message key="org_mapping_role_create_realm_name"/></span>
		<span id="deleteConfirmation"><fmt:message key="org_mapping_role_delete_internal_confirmation"/></span>
		<span id="importButton"><fmt:message key="org_mapping_role_button_import"/></span>
		<span id="syncButton"><fmt:message key="org_mapping_users_sync_button"/></span>
		<span id="syncMsg"><fmt:message key="org_mapping_roles_msg"/></span>
		<span id="org_deleteRoleMsg"><fmt:message key="org_mapping_roles_delete_confirmation"/></span>
	</div>
	<script src="scripts/custom/administration/organization_mapping/orgMappingRoles.js?version=2676"></script>
</body>
</html>
