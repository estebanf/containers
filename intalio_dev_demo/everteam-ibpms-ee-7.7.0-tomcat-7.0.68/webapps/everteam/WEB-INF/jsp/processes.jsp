 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
<link href="style/custom/workflow/workflow.css?version=2676" rel="stylesheet" />
<script type="text/javascript" src="scripts/plugin/workflow/jqSoapClient.min.js"></script>
</head>
<body>
<script type="text/javascript">
	$(document).ready(function () {
		addLoading($('#processesTableDiv'));
		if($('#workflow_processes_wrapper').length==0){
			if(userCache!=null && userCache!=undefined && userCache.wProcessPageSize!=null)
				processesData.rp = parseInt(userCache.wProcessPageSize);
			else
				processesData.rp = 10;
			processesData.page = parseInt(1);
			if(processesData.searchKeyword){
				delete processesData.searchKeyword;
			}
			sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json",processesData, handleAjaxError, updateProcesses);
		}
		$('#processesform').attr('height',0);
	});
	$('#processesform').load(function(){
		loadIFrame('processesform','processesTableDiv');
	});
	$('table tr input:checkbox').change( function() {
		updateCheckbox(this);
	});
	function showProcessDelete(length)	{
		$("#deleteTasks .modal_heading").text("<fmt:message key='org_intalio_uifw_modalDialog_delete_processes_title'/>");
		var message = "<fmt:message key='org_intalio_uifw_modalDialog_delete_processes_confirmation'/>"
		$("#deleteTasks .modal-body p").text(message.replace("{0}",length));
	}
	function updateEntriesHtml()
	{
		$("#workflow_processes_wrapper .table_pagination").append("<span class='paginationRows'><label><fmt:message key='org_intalio_uifw_tables_entries_per_page'/> :</label><select id='noOfRows' onchange=javscript:updateRP(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></span>");
	}
</script>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-user"></i>&nbsp;&nbsp;<fmt:message key="org_intalio_uifw_breadcrumb_workflow"/>&nbsp;&nbsp;</li>
		<li class="active"><a href="#" class="noDecoration" onclick="javascript:getProcessesData(true);"><fmt:message key="org_intalio_uifw_breadcrumb_processes"/></a></li>
	</ul>
</div>
<div class="page-content">
	<div class="col-xs-12" id="processesTableDiv">
	<div class="table-responsive">
	<table id="workflow_processes" class="table table-striped table-bordered table-hover">
		<thead>
			<tr id="rowProcessesHeader">
				<th><label class="position-relative"><input type="checkbox" class="ace"><span class="lbl"></label></span></th>
				<th onclick="javascript:sortData('workflow_processes',this,'_description')" sort='desc' class="nowrap">
					<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
					<fmt:message key="com_intalio_bpms_workflow_taskHolder_description"/>
				</th>
				<th onclick="javascript:sortData('workflow_processes',this,'_creationDate')" sort='desc' class="nowrap">
					<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
					<i class="fa fa-clock-o"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_workflow_taskHolder_creationDateTime"/>
				</th>
				<th class="nowrap"><fmt:message key="com_intalio_bpms_workflow_taskHolder_assigned_to"/></th>
				<th class="nowrap"><fmt:message key="com_intalio_bpms_workflow_taskHolder_view_process_tasks"/></th>
			</tr>
		</thead>
		<tbody id="workflow_processes_rows">
		</tbody>
	</table>
</div> 
</div>
<iframe src="" name="processesform" frameborder="0" id="processesform" scrolling="auto" width="100%" height="100%"></iframe>
</div>
<div id="deleteTasks" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
				<p class=""></p>
				</div>
				<div class="modal-footer">
					<button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="deleteTask(true, 'deleted');return false;"><fmt:message key='org_intalio_common_confirm'/></button>
				</div>
			</div>
		</div>
</div>
<div id="reassignTaskModal" class="modal fade" tabindex="-1"
			role="dialog" aria-labelledby="reassignTaskModal" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<span class="modal_heading" id="reassignTaskModalHeader"><fmt:message key="org_intalio_uifw_modalDialog_reassign_title"/> </span>
				</div>
				<div class="modal-body">
					<div id="reassignSpanTask" class="text-danger"></div>
					<table id="reassign-table" class="table noLines" style="width:100%">
						<tr><td><fmt:message key="org_intalio_uifw_modalDialog_filter_assignTo"/></td><td><select id="reassignAssignTo" data-placeholder="<fmt:message key='org_intalio_reassing_choose_msg'/>" class="width-80 chosen-select" multiple="" style="width:200px;height:25px;"></select></td></tr>
					</table>
				</div>
				<div class="modal-footer">
					<button onclick="javascript:reassignProcess(true, 'reassigned');" aria-hidden="true"
						class="btn btn-primary btn-sm" type="button"><fmt:message key="org_intalio_uifw_modalDialog_reassign_btn"/></button>
				</div>
			</div>
		</div>
</div>
<div class='hide'>
<span id='deleteButton' class='hide'><fmt:message key="org_intalio_uifw_toolbar_button_delete"/></span>
<span id='processMsg'><fmt:message key='org_intalio_uifw_modalDialog_information_msg_process'/></span>
<span id='taskRetrieveError'><fmt:message key='com_intalio_bpms_workflow_admin_processes_retrieve_error'/></span>
<span id='reassignButton'><fmt:message key="org_intalio_uifw_toolbar_button_reassign"/></span>
<span id='workflowInformationMsg'><fmt:message key="org_intalio_uifw_modalDialog_information_msg_process"/></span>
<span id='reassignError'><fmt:message key="org_intalio_uifw_reassign_error_msg"/></span>
<span id='processes_action_msg'><fmt:message key="com_intalio_bpms_module_workflow_processes_success_msg"/></span>
<span id='processesMsg'><fmt:message key="org_intalio_processes"/></span>
<span id='procFeedMsg'><fmt:message key="org_intalio_uifw_toolbar_button_process_feed"/></span>
</div>
</body>
</html>	
