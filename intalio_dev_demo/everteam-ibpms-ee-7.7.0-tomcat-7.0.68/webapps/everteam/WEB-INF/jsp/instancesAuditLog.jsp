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

<script type="text/javascript" src="scripts/custom/auditLog/instancesAudit.js?version=2676"></script>
<link href="style/custom/auditLog/instancesAudit.css?version=2676" rel="stylesheet"/>
</head>
<body>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;<li><fmt:message key="com_intalio_bpms_module_administration_auditing"/></a></li>
		<li class="active"><a herf="#" onclick='javascript:fetchInstancesAudit(false);' class="noDecoration"><fmt:message key="auditing_instances_module_name"/></a></li>
	</ul>
</div>
<div class="page-content">
	<div id="instancesAuditTable">
		<div class="table-responsive">
			<table id="instances_audit_table" class="table table-striped table-bordered">
				<thead>
					<tr>
						<th><fmt:message key="auditing_instances_table_header_action"/></th>
						<th><fmt:message key="auditing_instances_table_header_user_name"/></th>
						<th><fmt:message key="auditing_instances_table_header_audit_date"/></th>
						<th><fmt:message key="auditing_instances_table_header_instance_id"/></th>
						<th><fmt:message key="auditing_instances_table_header_audit_details"/></th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>
		</div>
	</div>
</div>
<div id="variableXmlDiff" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<span class="modal_heading"></span>
			</div>
			<div class="modal-body">
				<div id="varXmlDifference">
				</div>
			</div>
		</div>
	</div>
</div>
<div class='hide'>
	<span id='previousTitle'><fmt:message key="auditing_instances_info_previous_xml_title"/></span>
	<span id='updatedTitle'><fmt:message key="auditing_instances_info_updated_xml_title"/></span>
	<span id='variableXmlDiffTitle'><fmt:message key="auditing_instances_table_header_variable_details"/></span>
	<span id='entriesPerAuditPage'><fmt:message key="org_intalio_uifw_tables_entries_per_page"/></span>
	<span id='instanceAuditPageInfo'><fmt:message key="administration_monitoring_auditing_instances_msg"/></span>
</div>
</body>
</html>
