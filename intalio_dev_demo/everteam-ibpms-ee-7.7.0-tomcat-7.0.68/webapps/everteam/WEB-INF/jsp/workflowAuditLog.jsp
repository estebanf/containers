 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<html>
<head>
<meta charset="utf-8" />
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<link rel="stylesheet" href="style/plugin/codemirror.css">
<link rel="stylesheet" href="style/plugin/merge.css">

<script type="text/javascript" src="scripts/plugin/codemirror.js"></script>
<script type="text/javascript" src="scripts/plugin/xml.js"></script>
<script type="text/javascript" src="scripts/plugin/diff_match_patch.js"></script>
<script type="text/javascript" src="scripts/plugin/merge.js"></script>

<script type="text/javascript" src="scripts/custom/auditLog/workflowAudit.js?version=2676"></script>
<link href="style/custom/auditLog/workflowAudit.css?version=2676" rel="stylesheet"/>
</head>
<body>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;<li><fmt:message key="com_intalio_bpms_module_administration_auditing"/></a></li>
		<li class="active"><a herf="#" onclick='javascript:fetchWorkflowAudit(false);' class="noDecoration"><fmt:message key="auditing_workflow_module_name"/></a></li>
	</ul>
</div>
<div class="page-content">
	<div  class="col-xs-12" id="workflowAuditTable">
		<div class="table-responsive">
			<table id="workflow_audit_table" class="table table-striped table-bordered">
				<thead>
					<tr>
						<th><fmt:message key="auditing_workflow_table_header_action"/></th>
						<th><fmt:message key="auditing_workflow_table_header_user_name"/></th>
						<th><fmt:message key="auditing_workflow_table_header_audit_date"/></th>
						<th><fmt:message key="auditing_workflow_table_header_description"/></th>
						<th><fmt:message key="auditing_workflow_table_header_instance_id"/></th>
						<th><fmt:message key="auditing_workflow_table_header_audit_details"/></th>
						<th style="display:none;"><fmt:message key="auditing_workflow_table_header_instance_id"/></th>
						<th style="display:none;"><fmt:message key="auditing_workflow_table_header_user_name"/></th>
						<th style="display:none;"><fmt:message key="auditing_workflow_table_header_asigned_users"/></th>
						<th style="display:none;"><fmt:message key="auditing_workflow_table_header_asigned_roles"/></th>
						<th style="display:none;"><fmt:message key="auditing_workflow_table_header_state"/></th>
						<th style="display:none;"><fmt:message key="auditing_workflow_table_header_description"/></th>
						<th style="display:none;"><fmt:message key="auditing_workflow_table_header_priority"/></th>
						<th style="display:none;"><fmt:message key="auditing_workflow_table_header_variable_name"/></th>
						<th style="display:none;"><fmt:message key="auditing_workflow_table_header_variable_details"/></th>
						<th style="display:none;"><fmt:message key="auditing_workflow_table_header_description"/></th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>
		</div>
	</div>
</div>
<div class="hide">
	<div id="workflowAuditDetails" class="innerDetails">
	<table class="table noLines">
		<tr><td ><fmt:message key="auditing_workflow_info_task_id"/></td><td class="auditInfo-taskId"></td></tr>
		<tr><td ><fmt:message key="auditing_workflow_info_form_url"/></td><td class="auditInfo-formUrl"></td></tr>
		<tr><td ><fmt:message key="auditing_workflow_info_created_on"/></td><td class="auditInfo-createdDate"></td></tr>
		<tr><td ><fmt:message key="auditing_workflow_table_header_description"/></td><td class="auditInfo-taskDescription"></td></tr>
		
		<tr class="thick"><td > Modified Property </td><td>New Value</td></tr>
		<tr><td ><fmt:message key="auditing_workflow_table_header_asigned_users"/></td><td class="auditInfo-asignedUser"></td></tr>
		<tr><td ><fmt:message key="auditing_workflow_table_header_asigned_roles"/></td><td class="auditInfo-asignedRole"></td></tr>
		<tr><td ><fmt:message key="auditing_workflow_table_header_state"/></td><td class="auditInfo-state"></td></tr>
		<tr><td ><fmt:message key="auditing_workflow_table_header_priority"/></td><td class="auditInfo-priority"></td></tr>
		
					</table>
</div>
</div>
<div class='hide'>
	<span id='priorityCritical'><fmt:message key="com_intalio_bpms_module_workflow_priority_critical"/></span>
	<span id='priorityImportant'><fmt:message key="com_intalio_bpms_module_workflow_priority_important"/></span>
	<span id='priorityNormal'><fmt:message key="com_intalio_bpms_module_workflow_priority_normal"/></span>
	<span id='priorityLow'><fmt:message key="com_intalio_bpms_module_workflow_priority_low"/></span>
	<span id='entriesPerAuditPage'><fmt:message key="org_intalio_uifw_tables_entries_per_page"/></span>
	<span id='worflowAuditPageInfo'><fmt:message key="administration_monitoring_auditing_workflow_msg"/></span>
	<span id='noDescriptionMsg'><fmt:message key="com_intalio_bpms_module_workflow_no_description"/></span>
</div>
</body>
</html>
