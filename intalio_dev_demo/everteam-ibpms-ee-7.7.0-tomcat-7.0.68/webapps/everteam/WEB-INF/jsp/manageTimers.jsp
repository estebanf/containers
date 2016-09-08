 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<html>
<head>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<link href="style/custom/utilities/manageTimers.css?version=2676" rel="stylesheet">
<link href="style/custom/workflow/bootstrap-datetimepicker.css" rel="stylesheet"/>
<script type="text/javascript" src="scripts/plugin/workflow/moment.min.js"></script>
<script type="text/javascript" src="scripts/plugin/workflow/bootstrap-datetimepicker.min.js"></script>
<script src="scripts/custom/utilities/manageTimers.js?version=2676"></script>
</head>
<body>
	<div id="breadcrumbs" class="breadcrumbs">
		<ul class="breadcrumb">
			<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;<li><fmt:message key="com_intalio_bpms_module_administration_utilities"/></a></li>
			<li class="active"><a herf="#" class="noDecoration" onclick="javascript:getOdeJobs();"><fmt:message key="utilities_manage_timers_module_name"/></a></li>
		</ul>
	</div>
	<div class="page-content">
		<div  class="col-xs-12" id="manageTimerTable">
			<div class="table-responsive">
				<table id="manage_timers_table" class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th><fmt:message key="utilities_manage_timers_table_header_process_name"/></th>
							<th><fmt:message key="utilities_manage_timers_table_header_instance_id"/></th>
							<th><fmt:message key="utilities_manage_timers_table_header_job_id"/></th>
							<th><fmt:message key="utilities_manage_timers_table_header_time"/></th>
							<th><fmt:message key="utilities_manage_timers_table_header_update"/></th>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>
		</div>
	</div>
<div id="updateManageTimer" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="reassignTaskModal" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<span class="modal_heading" ><fmt:message key="utilities_manage_timers_upadte_ececution_time"/></span>
			</div>
			<div class="modal-body">
				<div class="padding-8" >
					<table class="table noLines" style="width:100%" id="timeEditTable">
						<tr><td width="30%"><span class="inline"><fmt:message key="utilities_manage_timers_modal_job_id"/></span></td>
						<td width="70%" align="left"><input type="text" class="jobIdText" style="width:67%" readonly=" "></input></td></tr>
						<tr><td width="30%"><span class="inline"><fmt:message key="utilities_manage_timers_modal_time"/></span></td>
						<td width="70%">
								<div class="input-group" style="width:250px">
									<input id="DueDatePicker" type="text" class="form-control read_only_input" readonly/>
									<span class="input-group-addon iconCursor" title="Date Picker">
										<i class="cursor fa fa-calendar bigger-110"></i>
									</span>
								</div>
						</td>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<button onclick="javascript:updateTime(true);" data-dismiss="modal" aria-hidden="true"
					class="btn btn-primary btn-sm"><fmt:message key="utilities_manage_timers_modal_update"/></button>
			</div>
		</div>
	</div>
</div>
	<div class='hide'>
		<span id="searchOdeJobs"><fmt:message key="utilities_manage_timers_header_search"/></span>
		<span id="enterFromDate" class="hide"><fmt:message key="utilities_manage_timers_header_enter_from_date"/></span>
		<span id="enterToDate" class="hide"><fmt:message key="utilities_manage_timers_header_enter_to_date"/></span>
		<span id="noJobsFound" class="hide"><fmt:message key="utilities_manage_timers_no_task_found"/></span>
		<span id="noJobsFound" class="hide"><fmt:message key="utilities_manage_timers_no_task_found"/></span>
		<span id="fromManageTimer" class="hide"><fmt:message key="utilities_manage_timers_from"/></span>
		<span id="toManageTimer" class="hide"><fmt:message key="utilities_manage_timers_to"/></span>
	</div>
</body>
</html>
