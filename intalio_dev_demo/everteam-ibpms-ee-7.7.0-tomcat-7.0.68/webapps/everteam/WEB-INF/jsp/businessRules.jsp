 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
<link rel="stylesheet" href="style/plugin/bootstrap-editable.css" />
<link href="style/plugin/jquery-ui.css?version=2676" rel="stylesheet" />
<link href="style/plugin/selectize.css?version=2676" rel="stylesheet" />
<link href="style/custom/businessRules/businessRules.css?version=2676" rel="stylesheet" />
<script type="text/javascript" src="scripts/plugin/x-editable/bootstrap-editable.min.js"></script>
<script type="text/javascript" src="scripts/plugin/x-editable/ace-editable.min.js"></script>
<script type="text/javascript" src="scripts/plugin/selectize.min.js"></script>
<script type="text/javascript" src="scripts/plugin/workflow/moment.min.js"></script>
</head>
<body>
<script type="text/javascript">
function breButtonHeader(taskIcon){
	var iconButton; 
	switch(taskIcon){
		case '<fmt:message key="business_rules_view_all_bre" />':
			iconButton = '<a title="<fmt:message key="business_rules_refresh" />" class="btn btn-sm btn-white table_refresh_icon" onclick=refreshBREList();><i class="fa fa-refresh"></i></a>';
			return iconButton;
			break;
		case '<fmt:message key="business_rules_share_button" />':
            iconButton = "<button type='button' id='reassignButton' onclick='javascript:breAccessPermission();' class='btn btn-sm btn-white'><i class='fa fa-share'></i>&nbsp; <fmt:message key='business_rules_share_button' /></button>&nbsp;";
            return iconButton;
            break;
        case "refreshAudit":
			iconButton = '<a title="Refresh" class="btn btn-sm btn-white table_refresh_icon" onclick=refreshAuditLog();><i class="fa fa-refresh"></i></a>';
			return iconButton;
			break;
		}
}
</script>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li class="active"><i class="fa fa-list-alt"></i>&nbsp;&nbsp;&nbsp;<a class="noDecoration iconCursor" onclick="javascript:listBRE();"><fmt:message key="com_intalio_bpms_dashboard_business_rules" /></a></li>
	</ul>
</div>
<div class="page-content">
	<div class="row">
		<div class="col-xs-12">
			<div id="processesTableButtons">
			</div>
			<div class="table-responsive">
				<table id="business_rules" class="table table-bordered ">
					<thead>
						<tr>
							<th class="nowrap"><label class="position-relative"><input type="checkbox" class="ace" id="selectAll" onclick="updateChildrenCheckBox(this);"><span class="lbl"></span></label></th>
							<th onclick="javascript:sortBREData(this,'packageName')" sort='desc' class="nowrap">
								<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
								<fmt:message key="business_rule" />
							</th>
							<th class="nowrap"><fmt:message key="business_rules_edit_access_permission" /></th>
							<th class="nowrap"><fmt:message key="business_rules_view_access_permission" /></th>
							<th onclick="javascript:sortBREData(this,'deployedDate')" sort='desc' class="nowrap">
								<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
								<fmt:message key="business_rules_deployed_date" />
							</th>
							<th onclick="javascript:sortBREData(this,'updatedDate')" sort='desc' class="nowrap">
								<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
								<fmt:message key="business_rules_updated_date" />
							</th>
							<th class="nowrap breActions"><fmt:message key="business_rules_actions" /></th>
							<th class="nowrap"><fmt:message key="business_rules_package_name" /></th>
							<th class="nowrap"><fmt:message key="business_rules_version" /></th>
							<th class="nowrap"><fmt:message key="business_rules_package_processes" /></th>
						</tr>
					</thead>
					<tbody id="business_rules_rows">
					</tbody>
				</table>
			</div> 
			</form>
		</div>
	</div>
</div>
<div id="breTableDataModal" class="modal fade" style="width:100%">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" onclick="javascript:updateBusinessRules();" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<span class="modal_heading"></span>
			</div>
			<div class="modal-body">
				<div class="slimScrollBar">
					<table id="breTable" border="1" style="width:100%" class="table table-bordered" />
				</div>
				<div class="hide" id="business_rules_warning">
					<div><fmt:message key="business_rules_warnings" /></div>
					<div id="breWarning"></div>
				</div>
			</div>
			<div class="modal-footer hide">
				<button id="unlockBRE" onclick="javascript:unlockBRETable();" class="btn btn-sm btn-primary hide"  type="button" aria-hidden="true"><fmt:message key="business_rules_unlock" /></button>
				<button id="lockBRE" onclick="javascript:lockBRETable();" class="btn btn-sm btn-primary"  type="button" aria-hidden="true"><fmt:message key="business_rules_lock" /></button>
				<button id="validateBRE" onclick="javascript:validateBRETable();" class="btn btn-sm btn-primary hide"  type="button" aria-hidden="true"><fmt:message key="business_rules_validate" /></button>
				<button id="updateBRE" onclick="javascript:updateBRETable();" class="btn btn-sm btn-primary hide"  type="button" aria-hidden="true"><fmt:message key="business_rules_update" /></button>
				<button id="restoreBRE" onclick="javascript:confirmRestore();" class="btn btn-sm btn-primary hide"  type="button" aria-hidden="true"><fmt:message key="business_rules_restore" /></button>
				<button id="deployBRE" onclick="javascript:deployConfirmation();" class="btn btn-sm btn-primary hide"  type="button" aria-hidden="true"><fmt:message key="business_rules_deploy" /></button>
			</div>
		</div>
	</div>
</div>
<div id="breAuditTableModal" class="modal fade" style="width:100%">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<span class="modal_heading"><fmt:message key="business_rules_audit" /></span>
			</div>
			<div class="modal-body">
				<div class="slimScrollBar">
					<table id="bre_audit" class="table table-bordered ">
					<thead>
						<tr>
							<th onclick="javascript:sortBusinessRulesAudit(this,'action')" sort='desc' class="nowrap">
								<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
								<fmt:message key="business_rules_audit_action" />
							</th>
							<th onclick="javascript:sortBusinessRulesAudit(this,'userName')" sort='desc' class="nowrap">
								<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
								<fmt:message key="business_rules_audit_performed_by" />
							</th>
							<th onclick="javascript:sortBusinessRulesAudit(this,'auditDate')" sort='desc' class="nowrap">
								<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
								<fmt:message key="business_rules_audit_performed_on" />
							</th>
						</tr>
					</thead>
					<tbody id="bre_audit_rows">
					</tbody>
				</table>
				</div>
			</div>
			<div class="modal-footer hide">
			</div>
		</div>
	</div>
</div>
<div id="restoreConfirmationModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="business_rules_restore_business_rule" /></span>
				</div>
				<div class="modal-body">
					<span class="restoreConfirmText" style="font-size:15px;"></span><br><br>
				</div>
				<div class="modal-footer">
					<a class="btn btn-danger btn-sm" onclick="javascript:restoreBRETable();" data-dismiss="modal" aria-hidden="true"><fmt:message key="business_rules_confirm" /></a>
				</div>
			</div>
		</div>
</div>
<div id="unlockConfirmationModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="business_rules_lock_info" /></span>
				</div>
				<div class="modal-body">
					<span class="unlockConfirmText" style="font-size:15px;"></span><br><br>
				</div>
				<div class="modal-footer">
					<a class="btn btn-sm btn-primary" onclick="javascript:unlockBusinessRule();" data-dismiss="modal" aria-hidden="true"><fmt:message key="business_rules_unlock" /></a>
					<a class="btn btn-sm btn-primary" style="background-color:#99999a !important;border-color:#99999a !important;" data-dismiss="modal" aria-hidden="true"><fmt:message key="business_rules_cancel" /></a>
				</div>
			</div>
		</div>
</div>
<div id="deployConfirmationModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="business_rules_update_business_rule" /></span>
				</div>
				<div class="modal-body">
					<span class="deployConfirmText" style="font-size:15px;"></span><br><br>
				</div>
				<div class="modal-footer">
					<a class="btn btn-danger btn-sm" onclick="javascript:deployBRETable();" data-dismiss="modal" aria-hidden="true"><fmt:message key="business_rules_confirm" /></a>
				</div>
			</div>
		</div>
</div>
<div id="breAccessPermissionModal" class="modal fade" style="width:100%" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<span class="modal_heading"><fmt:message key="business_rules_access_permission" /></span>
			</div>
			<div class="modal-body">
				<span id="selectPermissionError" class="text-danger"/>
				<table id="updatePermissionTable">
					<tr>
						<td width="20%"><fmt:message key="business_rules_view_access_permission" /></td>
						<td width="50%">
							<select id="viewBREPermission" placeholder="<fmt:message key='business_rules_choose_view_permission'/>"  tabindex="-1">
							</select>
						</td>
					</tr>
					<tr>
						<td width="20%"><fmt:message key="business_rules_edit_access_permission" /></td>
						<td width="50%">
							<select id="editBREPermission" placeholder="<fmt:message key='business_rules_choose_edit_permission'/>"  tabindex="-1">
							</select>
						</td>
					</tr>
				</table>
			</div>
			<div class="modal-footer">
				<button id="updateBREPermission" onclick="javascript:updatePermission();" aria-hidden="true" class="btn btn-sm btn-primary"  type="button"><fmt:message key="business_rules_update" /></button>
			</div>
		</div>
	</div>
</div>

</body>
<script>
	var isBRECalledFromProcess = false;
</script>
<script src="scripts/custom/businessRules/businessRules.js?version=2676"></script>
<div class='hide'>
	"<span class='pageSizePagination'><label><fmt:message key='org_intalio_uifw_tables_entries_per_page'/></label><select id='noOfBRE' onchange=javscript:updateNoOfBRE(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></span>"
	"<table id='paginationTable' cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' title='First page' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getLastFirstPageData('first');></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' title='Previous page' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getNextPrevPageData('prev');></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'><fmt:message key='org_intalio_datatable_pagination_page' /> &nbsp;<input id='brePageNo' type='text' role='textbox' onkeydown=javascript:getPageNoData(event); maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; <fmt:message key='org_intalio_datatable_pagination_of' /> &nbsp;<span id='sp_1_grid-pager' class='totalPageNo'></span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' title='Next page' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPrevPageData('next');></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' title='Last page'class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastFirstPageData('last');></span></td></tr></tbody></table>"
</div>
<div class="hide">
	<span id="businessRuleEditable"><fmt:message key="business_rule_editable" /></span>
	<span id="businessRuleReadOnly"><fmt:message key="business_rule_read_only" /></span>
	<span id="businessRulesValidatedSuccess"><fmt:message key="business_rules_validated_successfully" /></span>
	<span id="businessRulesValidatedWithWarningSuccess"><fmt:message key="business_rules_validated_with_warning_successfully" /></span>
	<span id="businessRulesValidatedError"><fmt:message key="business_rules_validatation_error" /></span>
	<span id="businessRulesAccessPermission"><fmt:message key="business_rules_access_permission" /></span>
	<span id="businessRulesShareError"><fmt:message key="business_rules_share_error" /></span>
	<span id="accessPermissionUpdateError"><fmt:message key="business_rules_access_permission_update_error" /></span>
	<span id="fetchingBusinessRules"><fmt:message key="business_rules_fetching_business_rules" /></span>
	<span id="noBusinessRulesFound"><fmt:message key="business_rules_no_business_rules_found" /></span>
	<span id="auditNotFound"><fmt:message key="business_rules_no_audit_found" /></span>
	<span id="restoreConfirmation"><fmt:message key="business_rules_restore_confirmation" /></span>
	<span id="auditModalHeader"><fmt:message key="business_rules_audit" /></span>
	<span id='entriesPerBREAuditPage'><fmt:message key="business_rules_entries_per_page"/></span>
	<span id="deployConfirmation"><fmt:message key="business_rules_deploy_confirmation" /></span>
	<span id="unlockConfirmation"><fmt:message key="business_rules_unlock_confirmation" /></span>
	<span id="shareButton"><fmt:message key="business_rules_share_button" /></span>
	<span id="refreshButton"><fmt:message key="business_rules_refresh" /></span>
	<span id="viewAllBRE"><fmt:message key="business_rules_view_all_bre" /></span>
	<span id="searchBRE"><fmt:message key="business_rules_search" /></span>
	<span id="viewChangeLog"><fmt:message key="business_rules_view_change_log" /></span>
	<span id="viewLockDetails"><fmt:message key="business_rules_lock_details_log" /></span>
	<span id="unlockBusinessRule"><fmt:message key="business_rule_unlock" /></span>
	<span id="businessRulePagination"><fmt:message key="business_rules_pagination" /></span>
	<span id="businessRuleAuditPagination"><fmt:message key="business_rules_no_business_rules_page_info" /></span>
	<span id="breFetchAudit"><fmt:message key="business_rules_fetch_audit" /></span>
	<span id="breEffectiveDate"><fmt:message key="business_rules_effective_date_popup" /></span>
	<span id="breExpirationDate"><fmt:message key="business_rules_expiration_date_popup" /></span>
	<span id="breSalience"><fmt:message key="business_rules_salience_popup" /></span>
	<span id="breXorRuleGroup"><fmt:message key="business_rules_xor_rule_group_popup" /></span>
</div>
</html>	
