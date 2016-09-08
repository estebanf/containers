 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<html>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
	<link href="style/custom/workflow/workflow.css?version=2676" rel="stylesheet"/>
	<script type="text/javascript" src="scripts/plugin/workflow/jqSoapClient.min.js"></script>
</head>

<body>

<!-- jquery ready function for intializing html elements-->
<script type="text/javascript">
	$(document).ready(function () {
	isSharedTask = false;
	addLoading($('#taskTableDiv'));
		if (!processTasks)
			delete taskData.formURL;
		else {
			$('#taskName').text(formURL);
			$('#breadcrumbName').removeClass('hide');
		}
		if(taskData.searchKeyword){
			delete taskData.searchKeyword;
		}
	    getPackagesData();
	    $('#taskform').attr('height',0);
		$('#taskDetailInfo').addClass('hide');
		var dateObj = new Date();
		$('#updateDueDatePicker').datetimepicker({
		minDate:dateObj.getMonth()+1+"/"+dateObj.getDate()+"/"+dateObj.getFullYear(),
		icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down"
                }
		}).next().on(ace.click_event, function(){$(this).prev().focus()});
		$('#FilterDueDatePicker').datetimepicker({icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down"
        }}).next().on(ace.click_event, function(){$(this).prev().focus()});
		$('#FilterCreationDatePicker').datetimepicker({icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down"
        }}).next().on(ace.click_event, function(){$(this).prev().focus()});
	});
	$('#taskform').load(function(){
		loadIFrame('taskform','taskTableDiv');
	});
	$('table tr th input:checkbox').change( function() {
		updateCheckbox(this);
	});

	function updateEntriesHtml() {
		$("#workflow_tasks_wrapper .table_pagination").append("<span class='paginationRows'><label>"+$("#entriesPerPage").text()+" :</label><select id='noOfRows' onchange=javscript:updateRP(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option><option value='500' role='option'>500</option></select></span>");
	}
	$('#export_column_select,#export_type_select,#export_sort_select').chosen()
	$("#export_column_select_chzn,#export_type_select_chzn,#export_sort_select_chzn").css("width", 240);
</script>

<!-- This div is used for showing breadcrumbs-->
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-user"></i>&nbsp;&nbsp;<fmt:message key="org_intalio_uifw_breadcrumb_workflow"/>&nbsp;</li>
		<li class="active"><a href="#" class="noDecoration" onclick="javascript:getTasksData(true);"><fmt:message key="org_intalio_uifw_breadcrumb_tasks"/></a></li>
		<div style="display:inline-block" id="breadcrumbTaskFilter" class="hide"> <i class="fa fa-angle-right"></i>&nbsp;&nbsp; <span id="bcTaskFilterName"></span>&nbsp;&nbsp;<a href="#" class="noDecoration" onclick="removeTaskAppliedFilter();"><i class="fa fa-times"></i></a></div>
	</ul>
	<div style="display:inline-block" id="breadcrumbName" class="hide"> <i class="fa fa-angle-right"></i>&nbsp;&nbsp; <span id="taskName"></span>&nbsp;&nbsp;<a href="#" class="noDecoration" onclick="removeBreadCrumbName();"><i class="fa fa-times"></i></a></div>
</div>

<!-- This div is main div for task page -->
<div class="page-content">
	<!-- This div contains table for showing tasks -->
	<div id="taskTableDiv" class="col-xs-12 hide">
		<div class="table-responsive">
			<table id="workflow_tasks" class="table table-striped table-bordered table-hover">
			<thead>
				<tr id="rowTaskHeader">
					<th><label class="position-relative"><input type="checkbox" class="ace" onclick="updateTaskHeaderButtons(this)" class="nowrap"><span class="lbl"></span></label></th>
					<th onclick="javascript:sortData('workflow_tasks',this,'_description')" sort='desc' class="nowrap">
						<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
						<fmt:message key="com_intalio_bpms_workflow_taskHolder_description"/></th>
					<th onclick="javascript:sortData('workflow_tasks',this,'_state')" sort='desc' class="priorityHead nowrap">
						<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
						<fmt:message key="com_intalio_bpms_workflow_taskHolder_task_status"/><i class="fa fa-info-circle iconCursor" onmouseover="displayStatusLegend(this);" onmouseout="hideWorkflowLegend('statusIconsList');"></i>
					</th>					
					<th onclick="javascript:sortData('workflow_tasks',this,'_creationDate')" sort='desc' class="nowrap">
						<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
						<i class="fa fa-clock-o" style="margin-left:0px"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_workflow_taskHolder_creationDateTime"/>
					</th>
					<th onclick="javascript:sortData('workflow_tasks',this,'_deadline')" sort='desc' class="nowrap">
						<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
						<i class="fa fa-clock-o" style="margin-left:0px"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_workflow_taskHolder_dueDate"/>
					</th>
					<th onclick="javascript:sortData('workflow_tasks',this,'_priority')" sort='desc' class="priorityHead nowrap">
						<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
						<fmt:message key="com_intalio_bpms_workflow_taskHolder_priority"/><i class="fa fa-info-circle iconCursor" onmouseover="displayPriorityLegend(this);" onmouseout="hideWorkflowLegend('priorityIconsList');"></i>
					</th>
					<th>Priority Value</th>
					<th class="nowrap"><fmt:message key="com_intalio_bpms_workflow_taskHolder_assigned_to"/></th>
					<th class="nowrap"><fmt:message key="bpms_user_task_shared_to"/></th>
					<th class="nowrap"><fmt:message key="com_intalio_bpms_workflow_taskHolder_Actions"/></th>
					<th class="nowrap hide">isOthersTask</th>
				</tr>
			</thead>
		<tbody id="workflow_Tasks_rows">
		</tbody>
		</table>
		</div> 
	</div>
	<iframe src="" name="taskform" frameborder="0" id="taskform" scrolling="auto" width="100%" height="100%"></iframe>
</div>

<!-- This div is modal a window contains html elements for updating a task -->
<div id="updateTaskModal" class="modal fade" tabindex="-1"
	role="dialog" aria-labelledby="updateTaskModal" aria-hidden="true">
	<div class="modal-dialog">
	<div class="modal-content">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">&times;</button>
		<span class="modal_heading" id="updateTaskModalHeader"> <fmt:message key="org_intalio_uifw_modalDialog_description_title"/> </span>
	</div>
	<div class="modal-body">
	<div style="width:100%">
	<span class="text-danger" id="updateErrorMsg"></span>
		<div style="height:70px;margin-bottom:5px;">
		<span class="description"><fmt:message key="org_intalio_uifw_modalDialog_description"/></span> <textarea type="text" name="description"
			id="updateDescription" value=""	class="pull-right" /></div>
		<div>
		<label class="pull-left"><fmt:message key="org_intalio_uifw_modalDialog_priority"/></label> 
			<form id="priority_form">
			<div class="radio">
				<label>
				<input class="ace" type="radio" name="form-field-radio" value="55">
				<span class="lbl"> <fmt:message key="org_intalio_uifw_modalDialog_priority_critical"/></span>
				</label>
			</div>
			<div class="radio">
				<label>
				<input class="ace" type="radio" name="form-field-radio" value="35">
				<span class="lbl"> <fmt:message key="org_intalio_uifw_modalDialog_priority_important"/></span>
				</label>
			</div>
			<div class="radio">
				<label>
				<input class="ace" type="radio" name="form-field-radio" value="15">
				<span class="lbl"> <fmt:message key="org_intalio_uifw_modalDialog_priority_normal"/></span>
				</label>
			</div>
			<div class="radio">
				<label>
				<input class="ace" type="radio" name="form-field-radio" value="5">
				<span class="lbl"> <fmt:message key="org_intalio_uifw_modalDialog_priority_low"/></span>
				</label>
			</div>
			</form>
		</div>
	</div>
	</div>
	<div class="modal-footer">
		<button type="button" id="editDescBtn" onclick="javascript:updateTask(this,true,'updated');" aria-hidden="true"
			class="btn btn-primary btn-sm"><fmt:message key="org_intalio_common_settings_update"/></button>
	</div>
	</div>
	</div>
</div>

<!-- This div is modal a window contains html elements for reassigning a task -->
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
				<button onclick="javascript:reassignTask(true, 'reassigned');" aria-hidden="true"
					class="btn btn-primary btn-sm" type="button"><fmt:message key="org_intalio_uifw_modalDialog_reassign_btn"/></button>
			</div>
		</div>
	</div>
</div>

<!-- This div is modal a window contains html elements for reassigning a task -->
<div id="shareTaskModal" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="shareTaskModal" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<span class="modal_heading" id="shareTaskModalHeader"><fmt:message key="bpms_user_task_share_heading"/> </span>
			</div>
			<div class="modal-body">
				<div id="shareSpanTask" class="text-danger"></div>
				<div class='form-group col-xm-6'>
					<span><fmt:message key="bpms_user_task_share_to"/></span>
					<select id="shareTo" data-placeholder="Choose Share To" class="width-80 chosen-select" multiple="" style="width:200px;height:25px;"></select>
				</div>
			</div>
			<div class="modal-footer">
				<button onclick="javascript:workflowMetaData.checkTaskStatus('share')" aria-hidden="true"
					class="btn btn-primary btn-sm" type="button"><fmt:message key="bpms_user_task_button_share"/></button>
			</div>
		</div>
	</div>
</div>
<!-- This div is modal a window contains html elements to delete a task -->
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

<!-- This div is modal a window contains html elements to skip a task -->
<div id="skipTasks" class="modal fade">
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
				<button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="skipTask(true, 'skipped');return false;"><fmt:message key='org_intalio_common_confirm'/></button>
			</div>
		</div>
	</div>
</div>

<!-- This div is modal a window contains html elements to escalate a task -->
<div id="escalateTasksModal" class="modal fade">
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
				<button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="escalateTask(true);return false;"><fmt:message key='org_intalio_common_confirm'/></button>
			</div>
		</div>
	</div>
</div>

<!-- This div is modal a window contains html elements to escalate a task -->
<div id="statusIconsList" class="hide legendTooltip">
	<div class="flags-body">
		<div><i class="fa fa-check-circle bigger-125 green"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_task_ready"/></div>
		<div><i class="fa fa-lock bigger-140 orange"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_task_claimed"/></div>
		<div><i class="fa fa-arrow-circle-up bigger-120 blue"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_task_escalated"/></div>
		<div><i class="fa fa-circle bigger-120 red"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_task_expired_status"/></div>
	</div>
</div>

<!-- This div is used for showing priority icons list in tasks list-->
<div id="priorityIconsList" class="hide legendTooltip">
	<div class="flags-body">
		<div><i class="fa fa-circle bigger-125 red"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_priority_critical"/></div>
		<div><i class="fa fa-circle bigger-125 orange orangeOpacity"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_priority_important"/></div>
		<div><i class="fa fa-circle bigger-125 green greenOpacity"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_priority_normal"/></div>
		<div><i class="fa fa-circle bigger-125 blue blueOpacity"></i>&nbsp; <fmt:message key="com_intalio_bpms_module_workflow_priority_low"/></div>
	</div>
</div>
	
<!-- This div is modal a window contains html elements to filtering a task -->
<div id="filterTaskModal" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="filterTaskModal" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<span class="modal_heading" id="FilterTaskModalHeader"><fmt:message key="org_intalio_uifw_modalDialog_filter_title"/> </span>
			</div>
			<div class="modal-body">
				<div id="filterSpanTask" class="text-danger"></div>
				<table class="table noLines" width="100%">
					<tr>
						<td width="50%">
							<input class="ace" type="radio" id="newTaskFilter" name='form-field-radio' onclick="javascript:manageTaskFilter.prepareCreateFilter();">
								<span class='lbl'></span>
								<label class="manageFilter"><fmt:message key="administration_monitoring_processes_create_new_filter"/></label>
							</input>
						</td>
						<td width="50%">
							<input class="ace" type="radio" id="updateTaskFilters" name='form-field-radio' onclick="javascript:manageTaskFilter.prepareUpdateFilter();"/>
								<span class='lbl'></span>
								<label class="manageFilter"><fmt:message key="administration_monitoring_processes_update_filter"/></label>
							</input>
						</td>
					</tr>
				</table>
				<table id='taskFilterUpdateTable' class="table noLines hide" width="100%">
					<tr>
						<td><fmt:message key="administration_monitoring_processes_table_filter_select"/></td>
						<td><select id="tasksFilters" onchange='manageTaskFilter.populateFilterData()' data-placeholder="Choose a filter..."></select></td>
					</tr>
				</table>
				<table id="taskFilterTable" class="table noLines hide" style="width:100%">
					<tr><td><fmt:message key="administration_monitoring_instances_table_filter_name"/></td>
					<td><input type="text" id="taskFilterName" maxlength="50" onkeypress='javascript:manageTaskFilter.removeErrorMsg()'/></td></tr>
					<tr><td><fmt:message key="org_intalio_uifw_modalDialog_filter_assignedTo"/></td> <td><select id="assignedToFilter" data-placeholder="<fmt:message key='org_intalio_task_filter_choose_assigned'/>" multiple="" onchange='javascript:manageTaskFilter.removeErrorMsg()'>
					</select></td></tr>
					<tr><td><fmt:message key="bpms_user_task_shared_to"/></td> <td><select id="sharedToFilter" data-placeholder="<fmt:message key='bpms_user_task_choose_share_to'/>" multiple="" onchange='javascript:manageTaskFilter.removeErrorMsg()'>
					</select></td></tr>
					<tr><td><fmt:message key="org_intalio_uifw_modalDialog_filter_priority"/></td><td><select id='tasksPriorityFilter' class="form-control" multiple="" data-placeholder="<fmt:message key='org_intalio_task_filter_choose_priority'/>"></td></tr>
					<tr><td><fmt:message key="org_intalio_uifw_modalDialog_filter_status"/></td><td><select id='tasksStatusFilter' class="form-control" multiple="" data-placeholder="<fmt:message key='org_intalio_task_filter_choose_status'/>"></td></tr>
					<tr><td><fmt:message key="org_intalio_uifw_modalDialog_filter_package"/></td><td><select id='tasksPackageFilter'></td></td></tr>
					<tr>
						<td> <fmt:message key="com_intalio_bpms_module_workflow_update_due_date"/></td>
						<td>
							<select id="dueDateOperator" class="form-control pull-left">
								<option value="<"> < </option>
								<option value=">"> > </option>
							</select>
							<div class="input-group" style="width: 216px; left: 9px;">
								<input id="FilterDueDatePicker" type="text" class="form-control" readonly/>
								<span class="input-group-addon iconCursor" title="Date Picker">
									<i class="cursor fa fa-calendar bigger-110"></i>
								</span>
								<span class="input-group-addon iconCursor" onclick="javascript:clearDate(this);" title="Clear Date">
									<i class="cursor fa fa-ban bigger-110"></i>
								</span>
							</div>
						</td>
					</tr>
					<tr>
						<td><fmt:message key="com_intalio_bpms_module_workflow_filter_creation_date"/></td>
						<td>
						<select id="creationDateOperator" class="form-control pull-left">
							<option value="<"> < </option>
							<option value=">"> > </option>
						</select>
						<div class="input-group" style="width: 216px; left: 9px;">
							<input id="FilterCreationDatePicker" type="text" class="form-control" readonly/>
							<span class="input-group-addon iconCursor" title="Date Picker">
							<i class="cursor fa fa-calendar bigger-110"></i>
							</span>
							<span class="input-group-addon iconCursor" onclick="javascript:clearDate(this);" title="Clear Date">
									<i class="cursor fa fa-ban bigger-110"></i>
							</span>
						</div>
						</td>
					</tr>
					<tr class="hide"><td><fmt:message key="org_intalio_uifw_modalDialog_filter_custom_column"/></td>
					<td>
					<input type="checkbox" class="ace" id="showCustomMetadata" name="showCustomMetadata"><span class="lbl"></span></td></tr>
				</table>
				
			</div>
			<div class="modal-footer">
				<button id="create" onclick="javascript:manageTaskFilter.createOrUpdateTaskFilter('create');" aria-hidden="true"
					class="btn btn-primary btn-sm" type="button"><fmt:message key="org_intalio_common_create"/></button>
				<button id="update" onclick="javascript:manageTaskFilter.createOrUpdateTaskFilter('update');" aria-hidden="true"
					class="btn btn-primary btn-sm hide" type="button"><fmt:message key="org_intalio_common_update"/></button>
				<button id="delete" onclick="javascript:manageTaskFilter.deleteTaskFilter();" aria-hidden="true"
					class="btn btn-primary btn-sm hide" type="button"><fmt:message key="org_intalio_common_delete"/></button>
			</div>
		</div>
	</div>
</div>

<!-- This div is modal a window contains html elements for updating due of a task -->
<div id="updateDueDate" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<span class="modal_heading"><fmt:message key="com_intalio_bpms_module_workflow_update_due_date_header"/></span>
			</div>
			<div class="modal-body">
			<span id="dueDateError" class="text-danger hide"></span>
			<table style="width:100%">
			<tr>
				<td width="30%"> <fmt:message key="com_intalio_bpms_module_workflow_update_due_date"/></td>
				<td width="70%">
					<div class="input-group" style="width:250px">
						<input id="updateDueDatePicker" type="text" class="form-control read_only_input" onchange="javascript:removeDueErrorMsg()" readonly/>
						<span class="input-group-addon iconCursor">
							<i class="cursor fa fa-clock-o bigger-110"></i>
						</span>
					</div>
				</td>
				<td class="hide"><input type="text" id="updateDueDatetaskId"></td>
			</tr>
			</table>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary btn-sm"  type="button" aria-hidden="true" onclick="updateDueDate();return false;"><fmt:message key='org_intalio_common_confirm'/></button>
			</div>
		</div>
	</div>
</div>

<!-- This div is modal a window contains html elements for exporting tasks -->
<div id="exportTaskModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<span class="modal_heading"><fmt:message key="org_intalio_uifw_export_tasks"/></span>
			</div>
			<div class="modal-body">
			<span id="exportTaskError" class="text-danger"></span>
			<table class="table noLines">
				<tr>
					<td><fmt:message key="org_intalio_uifw_export_tasks_start"/></td>
					<td>
						<input type="number" class="form-control" value="0" id="export_start_id" style="width:240px;" />
					</td>
				</tr>
				<tr>
					<td><fmt:message key="org_intalio_uifw_export_tasks_count"/></td>
					<td>
						<input type="number" class="form-control" value="100" id="export_count_id" style="width:240px;"/>
					</td>
				</tr>
				<tr>
					<td><fmt:message key="org_intalio_uifw_export_tasks_column"/></td>
					<td>
						<select id="export_column_select">
							<option value="_description"><fmt:message key="com_intalio_bpms_workflow_taskHolder_description"/></option>
							<option value="_creationDate" selected><fmt:message key="com_intalio_bpms_workflow_taskHolder_creationDateTime"/></option>
							<option value="_deadline"><fmt:message key="com_intalio_bpms_workflow_taskHolder_dueDate"/></option>
							<option value="_priority"><fmt:message key="com_intalio_bpms_workflow_taskHolder_priority"/></option>
						</select>
					</td>
				</tr>
				<tr>
					<td><fmt:message key="org_intalio_uifw_export_tasks_sort"/></td>
					<td>
						<select id="export_sort_select">
							<option value="asc" selected="true"> <fmt:message key="org_intalio_uifw_export_tasks_ascending"/></option>
							<option value="desc"> <fmt:message key="org_intalio_uifw_export_tasks_descending"/></option>
						</select>
					</td>
				</tr>
				<tr>
					<td><fmt:message key="org_intalio_uifw_export_tasks_type"/></td>
					<td>
						<select id="export_type_select">
							<option value="pdf">PDF</option>
							<option value="csv">CSV</option>
							<option value="ical">ICAL</option>
						</select>
					</td>
				</tr>
			</table>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary btn-sm"  type="button" aria-hidden="true" onclick="exportSelectedTasks();return false;"><fmt:message key="org_intalio_uifw_toolbar_button_export"/></button>
			</div>
		</div>
	</div>
</div>

<!-- This div contains all the meesages used in tasks page gets from properties file -->
<div class='hide'>
	<span id='reassignButton'><fmt:message key="org_intalio_uifw_toolbar_button_reassign"/></span>
	<span id='deleteButton'><fmt:message key="org_intalio_uifw_toolbar_button_delete"/></span>
	<span id='claimButton'><fmt:message key="org_intalio_uifw_toolbar_button_claim"/></span>
	<span id='releaseButton'><fmt:message key="org_intalio_uifw_toolbar_button_release"/></span>
	<span id='skipButton'><fmt:message key="org_intalio_uifw_toolbar_button_skip"/></span>
	<span id='exportButton'><fmt:message key="org_intalio_uifw_toolbar_button_export"/></span>
	<span id='dismissButton'><fmt:message key="org_intalio_uifw_toolbar_button_dismiss"/></span>
	<span id='refreshButton'><fmt:message key="org_intalio_uifw_tabls_refresh"/></span>
	<span id='deleteMessageTask'><fmt:message key="org_intalio_uifw_modalDialog_information_msg"/></span>
	<span id='shareButton'><fmt:message key="bpms_user_task_button_share"/></span>
	<span id='exportMessageTask'><fmt:message key="org_intalio_uifw_modalDialog_export_information_msg"/></span>
	<span id='priorityCritical'><fmt:message key="com_intalio_bpms_module_workflow_priority_critical"/></span>
	<span id='priorityImportant'><fmt:message key="com_intalio_bpms_module_workflow_priority_important"/></span>
	<span id='priorityNormal'><fmt:message key="com_intalio_bpms_module_workflow_priority_normal"/></span>
	<span id='priorityLow'><fmt:message key="com_intalio_bpms_module_workflow_priority_low"/></span>
	<span id='claimedTaskDesc'><fmt:message key="com_intalio_bpms_module_workflow_claimed_status_desc"/></span>
	<span id='readyTaskDesc'><fmt:message key="com_intalio_bpms_module_workflow_ready_status_desc"/></span>
	<span id='escalatedTaskDesc'><fmt:message key="com_intalio_bpms_module_workflow_escalated_status_desc"/></span>
	<span id='noDescription'><fmt:message key="com_intalio_bpms_module_workflow_no_description"/></span>
	<span id='reassignError'><fmt:message key="org_intalio_uifw_reassign_error_msg"/></span>
	<span id='skipError'><fmt:message key="org_intalio_uifw_toolbar_button_skip_error"/></span>
	<span id='claimError'><fmt:message key="org_intalio_uifw_toolbar_button_claim_error"/></span>
	<span id='escalateError'><fmt:message key="org_intalio_uifw_toolbar_button_escalated_error"/></span>
	<span id='claimInfo'><fmt:message key="org_intalio_uifw_claim_info"/></span>
	<span id='releaseInfo'><fmt:message key="org_intalio_uifw_release_info"/></span>
	<span id='taskRetrieveError'><fmt:message key="com_intalio_bpms_workflow_admin_tasks_retrieve_error"/></span>
	<span id='workflowInformationMsg'><fmt:message key="org_intalio_uifw_modalDialog_information_msg"/></span>
	<span id='deleteTaskTitle'><fmt:message key="org_intalio_uifw_modalDialog_delete_task_title"/></span>
	<span id='deleteTaskConfirmation'><fmt:message key="org_intalio_uifw_modalDialog_delete_task_confirmation"/></span>
	<span id='skipTaskTitle'><fmt:message key="org_intalio_uifw_modalDialog_delete_skipTask_title"/></span>
	<span id='skipTaskConfirmation'><fmt:message key="org_intalio_uifw_modalDialog_delete_skipTask_confirmation"/></span>
	<span id='escalateTaskTitle'><fmt:message key="org_intalio_uifw_modalDialog_delete_escalateTask_title"/></span>
	<span id='escalateTaskConfirmation'><fmt:message key="org_intalio_uifw_modalDialog_delete_escalateTask_confirmation"/></span>
	<span id='updateDescMessage'><fmt:message key="org_intalio_uifw_modalDialog_update_description_message"/></span>
	<span id='entriesPerPage'><fmt:message key="org_intalio_uifw_tables_entries_per_page"/></span>
	<span id='taskFilterButton'><fmt:message key="org_intalio_uifw_toolbar_button_filter_tasks"/></span>
	<span id='manageTasksFilters'><fmt:message key="administration_monitoring_processes_manage_filter"/></span>
	<span id='escalateTasks'><fmt:message key="org_intalio_uifw_toolbar_button_escalate"/></span>
	<span id='showHideColumns'><fmt:message key="org_intalio_uifw_toolbar_button_show_hide_columns"/></span>
	<span id='nameValidation'><fmt:message key="org_intalio_uifw_modalDialog_filter_name_validate"/></span>
	<span id='assignToValidation'><fmt:message key="org_intalio_uifw_modalDialog_filter_assign_validate"/></span>
	<span id='escalatedTasks'><fmt:message key="org_intalio_uifw_show_escalated_tasks"/></span>
	<span id='subordinatesTasks'><fmt:message key="org_intalio_uifw_show_subordinates_tasks"/></span>
	<span id='expiredTasks'><fmt:message key="org_intalio_uifw_show_expired_tasks"/></span>
	<span id='subordinatesTasksError'><fmt:message key="org_intalio_uifw_show_subordinates_no_tasks"/></span>
	<span id='dueDateErrorMsg'><fmt:message key="com_intalio_bpms_module_workflow_update_due_date_error"/></span>
	<span id='taskExpiredMsg'><fmt:message key="com_intalio_bpms_module_workflow_task_expired_msg"/></span>
	<span id='export_start_msg'><fmt:message key="org_intalio_uifw_export_tasks_error_start"/></span>
	<span id='export_count_msg'><fmt:message key="org_intalio_uifw_export_tasks_error_count"/></span>
	<span id='export_column_msg'><fmt:message key="org_intalio_uifw_export_tasks_error_column"/></span>
	<span id='export_sort_msg'><fmt:message key="org_intalio_uifw_export_tasks_error_sort"/></span>
	<span id='export_type_msg'><fmt:message key="org_intalio_uifw_export_tasks_error_type"/></span>
	<span id='task_action_msg'><fmt:message key="com_intalio_bpms_module_workflow_task_success_msg"/></span>
	<span id='taskMsg'><fmt:message key="org_intalio_tasks"/></span>
	<span id='editTaskMsg'><fmt:message key="org_intalio_task_edit_msg"/></span>
	<span id='filterChoosePackMsg'><fmt:message key="org_intalio_task_filter_choose_package"/></span>
	<span id='viewProcessTaskTitle'><fmt:message key="org_intalio_processes_view_task"/></span>
	<span id='exportStartMsg'><fmt:message key="org_intalio_export_tasks_start_msg"/></span>
	<span id='expNumTasCntMsg'><fmt:message key="org_intalio_export_tasks_number_of_tasks_msg"/></span>
	<span id='taskFeedMsg'><fmt:message key="org_intalio_uifw_toolbar_button_task_feed"/></span>
	<span id='shareToMsg'><fmt:message key='bpms_user_task_validate_share_to'/></span>
	<span id="completedMsg"><fmt:message key='bpms_user_task_validate_completed_task'/></span>
</div>

</body>
</html>
