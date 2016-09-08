 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
<link href="style/plugin/jquery-ui.css?version=2676" rel="stylesheet" />
<link href="style/custom/businessRules/businessRules.css?version=2676" rel="stylesheet" />
</head>
<body>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;<li><fmt:message key="com_intalio_bpms_module_administration_auditing"/></a></li>
		<li class="active">&nbsp;&nbsp;&nbsp;<a class="noDecoration iconCursor" onclick="javascript:fetchBREAudit();"><fmt:message key="com_intalio_bpms_dashboard_business_rules" /></a></li>
	</ul>
</div>
<div class="page-content">
	<div class="row">
		<div class="col-xs-12">
			<div class="table-responsive">
				<table id="business_rules_audit" class="table table-bordered ">
					<thead>
						<tr>
							<th onclick="javascript:sortBREAudit(this,'decisionTableName')" sort='desc' class="nowrap">
								<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
								<fmt:message key="business_rules_audit_business_rule" />
							</th>
							<th onclick="javascript:sortBREAudit(this,'action')" sort='desc' class="nowrap">
								<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
								<fmt:message key="business_rules_audit_action" />
							</th>
							<th onclick="javascript:sortBREAudit(this,'userName')" sort='desc' class="nowrap">
								<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
								<fmt:message key="business_rules_audit_performed_by" />
							</th>
							<th onclick="javascript:sortBREAudit(this,'auditDate')" sort='desc' class="nowrap">
								<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
								<fmt:message key="business_rules_audit_performed_on" />
							</th>
						</tr>
					</thead>
					<tbody id="business_rules_audit_rows">
					</tbody>
				</table>
			</div> 
			</form>
		</div>
	</div>
</div>
</body>
<script src="scripts/custom/auditLog/breAudit.js?version=2676"></script>
<div class="hide">
	<span id="businessRuleEditable"><fmt:message key="business_rule_editable" /></span>
	<span id='entriesPerBREAuditPage'><fmt:message key="business_rules_entries_per_page"/></span>
	<span id="breAuditPagination"><fmt:message key="business_rules_no_business_rules_page_info" /></span>
</div>
</html>	
