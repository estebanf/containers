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
		addLoading($('#notificationTableDiv'));
		if($('#workflow_notifications_wrapper').length==0){
			if(userCache!=null && userCache!=undefined && userCache.wNotificationPageSize!=null)
				notificationData.rp = parseInt(userCache.wNotificationPageSize);
			else
				notificationData.rp = 10;
			notificationData.page = parseInt(1);
			if(notificationData.searchKeyword){
				delete notificationData.searchKeyword;
			}
			sendAjaxCall(intalio_bpms.workflow_tasks.getTaskList, "POST", false, true, "json",notificationData, handleAjaxError,populateNotificationsData);
		}
		$('#notificationform,#taskDetailInfo').attr('height',0);
		$('#taskDetailInfo').addClass('hide');
	});
	$('#notificationform').load(function(){
		loadIFrame('notificationform','notificationTableDiv');
    });
	$('table tr input:checkbox').change( function() {
		updateCheckbox(this);
	});
	function showNotificationDelete(length)	{
		$("#deleteTasks .modal_heading").text("<fmt:message key='org_intalio_uifw_modalDialog_delete_notification_title'/>");
		var message = "<fmt:message key='org_intalio_uifw_modalDialog_delete_notification_confirmation'/>"
		$("#deleteTasks .modal-body p").text(message.replace("{0}",length));
	}
	function updateEntriesHtml()
	{
		$("#workflow_notifications_wrapper .table_pagination").append("<span class='paginationRows'><label><fmt:message key='org_intalio_uifw_tables_entries_per_page'/> :</label><select id='noOfRows' onchange=javscript:updateRP(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></span>");
	}
</script>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-user"></i>&nbsp;&nbsp;<fmt:message key="org_intalio_uifw_breadcrumb_workflow"/>&nbsp;&nbsp;</li>
		<li class="active"><a href="#" class="noDecoration" onclick="javascript:getNotificationData(true);"><fmt:message key="org_intalio_uifw_breadcrumb_notifications"/></a></li>
	</ul>
</div>

<div class="page-content">
	<div class="col-xs-12 hide" id="notificationTableDiv">
		<div class="table-responsive">
		<table id="workflow_notifications" class="table table-striped table-bordered table-hover">
			<thead>
				<tr id="rowNotificationHeader">
					<th><label class="position-relative"><input type="checkbox" class="ace"><span class="lbl"></span></label></th>
					<th onclick="javascript:sortData('workflow_notifications',this,'_description')" sort='desc' class="nowrap">
						<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
						<fmt:message key="com_intalio_bpms_workflow_taskHolder_description"/>
					</th>
					<th onclick="javascript:sortData('workflow_notifications',this,'_creationDate')" sort='desc' class="nowrap">
						<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
						<i class="fa fa-clock-o"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_workflow_taskHolder_creationDateTime"/>
					</th>
					<th onclick="javascript:sortData('workflow_notifications',this,'_priority')" sort='desc' class="priorityHead nowrap">
						<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
						<fmt:message key="com_intalio_bpms_workflow_taskHolder_priority"/><i class="fa fa-info-circle iconCursor" onmouseover="displayPriorityLegend(this);" onmouseout="hideWorkflowLegend('priorityIconsList');"></i>
					</th>
					<th>Priority Value</th>
					<th class="nowrap"><fmt:message key="com_intalio_bpms_workflow_taskHolder_assigned_to"/></th>
				</tr>
			</thead>
			<tbody id="workflow_notifications_rows">
			</tbody>
		</table>
		</div> 
	</div>
	<iframe src="" name="notificationform" frameborder="0" id="notificationform" scrolling="auto" width="100%" height="100%"></iframe>
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
<div id="priorityIconsList" class="hide legendTooltip">
	<div class="flags-body">
		<div><i class="fa fa-circle bigger-125 red"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_priority_critical"/></div>
		<div><i class="fa fa-circle bigger-125 orange orangeOpacity"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_priority_important"/></div>
		<div><i class="fa fa-circle bigger-125 green greenOpacity"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_priority_normal"/></div>
		<div><i class="fa fa-circle bigger-125 blue blueOpacity"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_priority_low"/></div>
	</div>
</div>
<div class='hide'> 
<span id='deleteButton'><fmt:message key="org_intalio_uifw_toolbar_button_delete"/></span>
<span id='notificationMsg'><fmt:message key='org_intalio_uifw_modalDialog_information_msg_notification'/></span>
<span id='priorityCritical'><fmt:message key="com_intalio_bpms_module_workflow_priority_critical"/></span>
<span id='priorityImportant'><fmt:message key="com_intalio_bpms_module_workflow_priority_important"/></span>
<span id='priorityNormal'><fmt:message key="com_intalio_bpms_module_workflow_priority_normal"/></span>
<span id='priorityLow'><fmt:message key="com_intalio_bpms_module_workflow_priority_low"/></span>
<span id='noDescription'><fmt:message key="com_intalio_bpms_module_workflow_no_description"/></span>
<span id='taskRetrieveError'><fmt:message key='com_intalio_bpms_workflow_admin_notifications_retrieve_error'/></span>
<span id='notifcation_action_msg'><fmt:message key="com_intalio_bpms_module_workflow_notification_success_msg"/></span>
<span id='notifyMsg'><fmt:message key="org_intalio_notifications"/></span>
</div>
</body>
</html>	
