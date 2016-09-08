 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<html>
<head>
<link rel="stylesheet" href="style/plugin/codemirror.css">
<link rel="stylesheet" href="style/custom/administration/monitoring/instances.css?version=2676">
<!--[if IE 8]>
<link rel="stylesheet" href="style/custom/administration/monitoring/instances-ie.css?version=2676">
<![endif]-->
</head>
<body>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;<li><fmt:message key="administration_monitoring_instances_breadcrumb_monitoring"/>&nbsp;&nbsp;</li>
		<li class="active"><a href="#" onclick="javascript:getActionsList()" class="noDecoration"><fmt:message key="administration_monitoring_instances_breadcrumb_instances"/></a></li>
	</ul>
	<div style="display:inline-block" id="breadcrumbProcessName" class="hide"> <i class="fa fa-angle-right"></i>&nbsp;&nbsp;<span id="processName"></span>&nbsp;&nbsp;<a class="noDecoration iconCursor" onclick="removeStatusBreadCrumb();"><i class="fa fa-times"></i></a>&nbsp;&nbsp;&nbsp;</div>
	<div style="display:inline-block" id="breadcrumbStatus" class="hide"> <i class="fa fa-angle-right"></i>&nbsp;&nbsp; <span id="instanceStatus"></span>&nbsp;&nbsp;<a class="noDecoration iconCursor" onclick="removeSelectedStatus();"><i class="fa fa-times"></i></a></div>
	<div style="display:inline-block" id="breadcrumbInstanceId" class="hide"> <i class="fa fa-angle-right"></i>&nbsp;&nbsp;<span id="searchedId"></span>&nbsp;&nbsp;<a class="noDecoration cursorPointer" onclick="removeSelectedProcessInstances();"><i class="fa fa-times"></i></a>&nbsp;&nbsp;&nbsp;</div>	
	<div style="display:inline-block" id="breadcrumbFilter" class="hide"> <i class="fa fa-angle-right"></i>&nbsp;&nbsp; <span id="bcFilterName"></span>&nbsp;&nbsp;<a href="#" class="noDecoration" onclick="removeAppliedFilter();"><i class="fa fa-times"></i></a></div>
	<div style="display:inline-block" id="breadcrumbLinkedInstance" class="hide"> <i class="fa fa-angle-right"></i>&nbsp;&nbsp; <i class="fa fa-link"></i> <span></span>&nbsp;&nbsp;<a href="#" class="noDecoration" onclick="removeLinkedInstance();"><i class="fa fa-times"></i></a></div>
</div>
<div class="page-content">
	<div id="instancesTableDiv" class="col-xs-12">
		<div class="table-responsive">
			<table id="instances" class="table table-striped table-bordered table-hover tableHeaders">
				<thead>
					<tr id="instancesHeader">
						<th><label class="position-relative"><input type="checkbox" class="ace" onclick="updateHeaderButtons(this);"><span class="lbl"></span></label></th>
						<th onclick="javascript:sortInstanceData(this,'iid')" sort='desc' class="nowrap">
							<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
							<fmt:message key="administration_monitoring_instances_table_column_instanceId"/>
						</th>
						<th onclick="javascript:sortInstanceData(this,'name')" sort='desc' class="nowrap">
							<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
							<fmt:message key="administration_monitoring_instances_table_column_process"/>
						</th>					
						<th onclick="javascript:sortInstanceData(this,'status')" sort='desc' class="nowrap">
							<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
							<fmt:message key="administration_monitoring_instances_table_column_status"/>&nbsp;<i class="fa fa-info-circle iconCursor" onmouseover="displayFlagsList(this);" onmouseout="hideFlagsList(this);"></i>
						</th>
						<th onclick="javascript:sortInstanceData(this,'started')" sort='desc' class="nowrap">
							<span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span>
							<i class="fa fa-clock-o hidden-phone"></i>&nbsp;&nbsp;<fmt:message key="administration_monitoring_instances_table_column_started"/>
						</th>
						<th onclick="javascript:sortInstanceData(this,'last-active')" sort='desc' class="nowrap">
							<span class='pull-right'><i class="fa fa-sort-down blue"></i></span>
							<i class="fa fa-clock-o hidden-phone"></i>&nbsp;&nbsp;<fmt:message key="administration_monitoring_instances_table_column_last_active"/>
						</th>
						<th class="nowrap"><fmt:message key="administration_monitoring_instances_table_column_diagram"/></th>
						<th class="nowrap"><fmt:message key="administration_monitoring_instances_table_column_data"/></th>
						<th class="nowrap"><fmt:message key="administration_monitoring_instances_table_column_event"/></th>
					</tr>
				</thead>
				<tbody id="instances_rows">
				</tbody>
			</table>
		</div>
	</div>
</div> 
<div id="activityInfo" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="administration_monitoring_instances_activityinfo_title"/></span>
				</div>
				<div class="modal-body">
					<ul class="nav nav-tabs">
						<li class="active"><a data-toggle="tab" href="#taskInfo"><fmt:message key="administration_monitoring_instances_activityinfo_tab_taskInfo"/></a></li>
						<li class="faultInfoLink"><a data-toggle="tab" href="#faultInfo"><fmt:message key="administration_monitoring_instances_activityinfo_tab_faultInfo"/></a></li>
					</ul>
					<div class="tab-content">
						<div id="taskInfo" class="tab-pane active"><div></div></div>
						<div id="faultInfo" class="tab-pane"><div></div></div>
					</div>
				</div>
			</div>
		</div>
</div>
<div class="hide">
	<table id="taskData" class="table noLines">
		<tr><td class="taskDataTitle thick" colspan="2"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_aiid"/></td><td class="taskInfoActivityID"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_status"/></td><td class="taskInfoStatus"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_started"/></td><td class="taskInfoStarted"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_scope"/></td><td class="taskInfoScope"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_enabled"/></td><td class="taskInfoEnabled"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_type"/></td><td class="taskInfoType"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_reason"/></td><td class="taskInfoReason"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_retry"/></td><td class="taskInfoRetry"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_failure"/></td><td class="taskInfoFailure"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_actions"/></td><td class="taskInfoActions"></td></tr>
	</table>
	<table id="faultData" class="table noLines">
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_name"/></td><td class="faultInfoName"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_lineNumber"/></td><td class="faultInfoLineNumber"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_explanation"/></td><td class="faultInfoExplanation"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_nameSpace"/></td><td class="faultInfoNameSpace"></td></tr>
		<tr><td><fmt:message key="administration_monitoring_instances_activityinfo_tab_aiid"/></td><td class="faultInfoAiid"></td></tr>
	</table>
</div>
<div id="processImage" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<div class="showPathDiv" id="showPathDiv">
						<span class="action-butttons"><a href="#" class="noDecoration" onclick="showSVGPath(true);"><i class="fa fa-angle-double-right bigger-150"></i></a></span>
					</div>
					<div id="svg_container" class="">
					</div>
					<div id="svgEventInfo" class="hide">
						<div id="svgInfoHead">
							<button class="pull-right close" id="svgInfoClose" onclick="closeSVGInfo();" type="button">&times</button> 
							<span class="svgActivityName"></span>
						</div>
							<div class="hr">
						</div>
						<div class="tabbable tabs-left" id="svgInfoBody">
							<ul id="activityEventsList" class="nav nav-tabs">
								
							</ul>
							<div class="tab-content" id="activityEventsTabs">
								
							</div>
						</div>
					<div id="svgInfoBodyError" class="hide">

					</div>
				</div>
					
				</div>
			</div>
		</div>
</div>
<div id="terminateInstanceModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<span class="terminateConfirmText" style="font-size:15px;"></span><br><br>
					<input class="ace" type="checkbox" id="terminateChild"/><span class="lbl"></span>
					<label class="checkboxLabel">&nbsp; &nbsp;&nbsp;<fmt:message key="administration_monitoring_instances_table_terminate_child"/></label>
				</div>
				<div class="modal-footer">
					<a class="btn btn-danger btn-sm" onclick="confirmTermination();" data-dismiss="modal" aria-hidden="true"><fmt:message key="administration_monitoring_processes_confirmation"/></a>
				</div>
			</div>
		</div>
</div>
<div id="ADHOCInstanceModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<div id="adhoc_svg_container" class="">
					</div>
				</div>			
			</div>
		</div>
</div>
<div id="deleteInstanceModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<span class="terminateConfirmText" style="font-size:15px;"></span><br><br>
				</div>
				<div class="modal-footer">
					<a class="btn btn-danger btn-sm" onclick="confirmDeleteInstance();" data-dismiss="modal" aria-hidden="true"><fmt:message key="administration_monitoring_processes_confirmation"/></a>
				</div>
			</div>
		</div>
</div>
<div id="invokeInstanceModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"> </span>
				</div>
				<div class="modal-body">
					<span class="hide text-danger" id="select-operation-error"><fmt:message key="administration_monitoring_instances_select_operation_error"/></span>
					<div class="operations" id="invoke_values">

					</div>
					<span class="text-danger hide invokeInstanceError" ><fmt:message key="administration_monitoring_instances_fill_mandatory_fileds"/></span>
					<div  id="invokeIFrame" ></div>
					<span class="pull-right mandatoryFileds" id=""><fmt:message key="administration_monitoring_instances_indicates_mandatory_filed"/></span>
					<span class="text-danger hide invokeInstanceError" ><fmt:message key="administration_monitoring_instances_fill_mandatory_fileds"/></span>
				</div>
				<div class="modal-footer">
					<a type="button" class="btn btn-primary btn-sm submit-invoke-operation hide" onclick="submitToIFrame();"> <fmt:message key="administration_monitoring_instances_submit_operation"/></a>
					<a type="button" class="btn btn-primary btn-sm start-invoke-instance hide" onclick="startInvokeInstance();"><fmt:message key="administration_monitoring_instances_invoke_instance"/></a>
				</div>
			</div>
		</div>
</div>
<div id="createFilter" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<span class="modal_heading"><fmt:message key="administration_monitoring_instances_table_filter__title"/></span>
			</div>
		<div class="modal-body">
				<span id="instanceFilterSpan" class="text-danger pull-left"></span>
				<table class="table noLines filterChoiceTable" width="100%">
					<tr>
						<td width="50%">
							<input class="ace" type="radio"  name='manageFilterSelect' id="createNewFilterId" onclick="createNewFilter(this);"/>
							<span class='lbl'></span>
							<label><fmt:message key="administration_monitoring_instances_table_filter_create"/></lable>
						</td>
						<td width="50%">
							<input class="ace" type="radio"  name='manageFilterSelect' id="updateExistingFilterId" onclick="updateExistingFilter(this);"/>
							<span class='lbl'></span>
							<label><fmt:message key="administration_monitoring_instances_table_filter_update"/></lable>
						</td>
					</tr>
				</table>
				<hr class="hr hide"></hr>
				<table class="table noLines" width="100%">
					<tr id="selectFilterCombo" class="hide">
						<td width="20%"><fmt:message key="administration_monitoring_instances_table_filter_select"/></td>
						<td width="30%"><select id="filters"></select></td><td width="20%"></td><td width="30%"></td>
					</tr>
					<tr id="filterNameField" class="hide">
						<td width="20%"><fmt:message key="administration_monitoring_instances_table_filter_name"/></td>
						<td width="30%"><input type="text" id="filterName" maxlength="15" placeholder='<fmt:message key="administration_monitoring_instances_table_filter_name"/>' /></td><td width="20%"></td><td width="30%"></td>
					</tr>
				</table>
				<div id="filterConfig" class="hide" style="height:0">
				<span class="thick"><fmt:message key="administration_monitoring_instances_table_filter_process"/></span>
				<div id="filterProcesses">
					<table class="table noLines" width="100%">
						<tr>
							<td >
								<div id="listOfProcesses" class="hide">
								</div>
							</td>
						</tr>
					</table>
				</div>
				<span class="thick"><fmt:message key="administration_monitoring_instances_table_filter_States"/></span>
				<div id="filterStates">
					<table class="table noLines" width="100%">
						<tr>
							<td width="20%">
								<fmt:message key="administration_monitoring_instances_table_filter_customStatus"/>
							</td>
							<td width="30%">
								<div id="listOfStates" class="hide">
								
								</div>
							</td><td width="20%"></td><td width="30%"></td>
						</tr>
					</table>
				</div>
				<span class="thick"><fmt:message key="administration_monitoring_instances_table_filter_time"/></span>
					<div id="dateTimeForFilter">
						<table class="table noLines" width="100%">
							<tr>
								<td width="20%">
								<fmt:message key="administration_monitoring_instances_table_filter_started_before"/></td>
								<td width="30%">
								<div class="input-group">
									<input type="text" class="filterDates" id="startedBefore" data-date-format="YYYY-MM-DD">
									<span class="input-group-addon"><i class="fa fa-calendar bigger-110"></i>
									</span>
								</div>
								</td>
								<td width="20%">
								<fmt:message key="administration_monitoring_instances_table_filter_started_after"/></td>
								<td width="30%">
								<div class="input-group">	
									<input type="text" class="filterDates" id="startedAfter" data-date-format="YYYY-MM-DD">
									<span class="input-group-addon"><i class="fa fa-calendar bigger-110"></i></span>
								</div>
								</td>
							</tr>
							<tr>
								<td><fmt:message key="administration_monitoring_instances_table_filter_lastActive_before"/></td>
								<td>
								<div class="input-group">
									<input type="text" class="filterDates" id="lastActiveBefore" data-date-format="YYYY-MM-DD">
									<span class="input-group-addon"><i class="fa fa-calendar bigger-110"></i></span>
								</div>
								</td>
								<td><fmt:message key="administration_monitoring_instances_table_filter_lastActive_after"/></td>
								<td>
								<div class="input-group">
									<input type="text" class="filterDates" id="lastActiveAfter" data-date-format="YYYY-MM-DD">
									<span class="input-group-addon"><i class="fa fa-calendar bigger-110"></i></span>
								</div>	
								</td>
							</tr>
						</table>
					</div>
				<span class="thick"><fmt:message key="administration_monitoring_instances_table_filter_properties"/> </span>
				<span class="action-buttons" id="addNewProperty"><a href="#" title="Add new property" onclick="javascript:addNewProperty('','','create');"><i class="fa fa-plus-circle"> </i ></a></span> 
				<div id="filterProperties">
					<table id="filterTableProperties" class="table noLines" width="100%">
						
					</table>
				</div>
			</div>
			</div>
			<div class="modal-footer hide">
				<button id="resetFilter" class="btn btn-sm btn-primary" style="background-color: #99999d !important;border-color: #99999d !important;"  type="button" onclick="javascript:getFilters('create');" aria-hidden="true"><fmt:message key='administration_monitoring_instances_table_filter_reset'/></button>
				<button id="btnDeleteFilter" onclick="javascript:deleteFilterConfirm();" class="btn btn-sm btn-primary hide"  type="button" aria-hidden="true"><fmt:message key='administration_monitoring_instances_table_filter_delete'/></button>
				<button id="saveFilter" onclick="javascript:saveORUpdateFilter('save');" class="btn btn-sm btn-primary"  type="button" aria-hidden="true"><fmt:message key='administration_monitoring_filter_create'/></button>
			</div>
		</div>
	</div>
</div>
<div id="instanceData" class="modal fade" tabindex="-1"
role="dialog" aria-labelledby="instanceEvents" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
				<span class="modal_heading" ></span>
			</div>
			<div class="modal-body">
				<div id="iData">

				</div>
			</div>
		</div>
	</div>
</div>
<div id="correlationModal" class="modal fade" tabindex="-1"
role="dialog" aria-labelledby="" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
				<span class="modal_heading" ></span>
			</div>
			<div class="modal-body">
				
			</div>
			<div class="modal-footer">
					<a class="btn btn-primary btn-sm" onclick="filterCorrelationData(this);">Find</a>
			</div>
		</div>
	</div>
</div>
<div id="instanceEvents" class="modal fade" tabindex="-1"
role="dialog" aria-labelledby="instanceEvents" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
				<span class="modal_heading" ></span>
			</div>
			<div class="modal-body">
				<div class="" id="eventsTableScroll">
				<table id="instanceEventsTableId" class="table table-striped table-bordered  noLines">
					<thead>
						<tr>
							<th><fmt:message key="administration_monitoring_instances_events_table_head_view"/></th>
							<th><fmt:message key="administration_monitoring_instances_events_table_head_time"/></th>
							<th><fmt:message key="administration_monitoring_instances_events_table_head_event"/></th>
							<th><fmt:message key="administration_monitoring_instances_events_table_head_type"/></th>
							<th><fmt:message key="administration_monitoring_instances_events_table_head_activity"/></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>
							<th style="display:none;"></th>

					</thead>
					<tbody id="instanceEventList">

					</tbody>
				</table>	
			</div>
			</div>

		</div>
	</div>
</div>
<div class="hide">
	<div id="eventDetails" class="innerDetails">
	<table class="table">
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_activityid"/></td><td class="event-activityId"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_process_id"/></td><td class="event-processId"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_line_number"/></td><td class="event-line-number"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_scope_def_id"/></td><td class="event-scope-defination-id"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_activity_type"/></td><td class="event-activityType"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_type"/></td><td class="event-type"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_activity_id"/></td><td class="event-activity-id"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_process_type"/></td><td class="event-process-type"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_instnace_id"/></td><td class="event-instance-id"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_scope_name"/></td><td class="event-scope-name"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_activity_def_id"/></td><td class="event-activity-defination-id"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_name"/></td><td class="event-name"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_scope_id"/></td><td class="event-acope-id"></td></tr>
		<tr><td ><fmt:message key="administration_monitoring_instances_events_table_new_value"/></td><td class="event-new-value"></td></tr>
	</table>
	</div>
</div>

<div id='scopeVariableData' class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div id='scopeVariableDataBody' class="modal-body">
					<div id='leftPane'>
						<div id='scopeTree' class='tree tree-unselectable'>
						</div>
					</div>
					<div id='rightPane'>
						<ul class="nav nav-tabs">
							<li class="active"><a data-toggle="tab" href="#variableInfo"><fmt:message key="administration_monitoring_instances_data_variable"/></a></li>
							<li><a data-toggle="tab" href="#partnerInfo"><fmt:message key="administration_monitoring_instances_data_partners"/></a></li>
							<li><a data-toggle="tab" href="#correlationInfo"><fmt:message key="administration_monitoring_instances_data_correlation"/></a></li>
						</ul>
						<div class="tab-content">
							<div id="variableInfo" class="tab-pane active"></div>
							<div id="partnerInfo" class="tab-pane"></div>
							<div id="correlationInfo" class="tab-pane"></div>
						</div>
					</div>
					
					<div id='xmlSpan' class='hide'>
						<div style="height:30px;width:100%;">
							<span class="text-danger parseXMLError">
							</span>
						</div>
						<div id="xmlScrolling">
							<textarea align="left" id="variableXml" name="variableXml"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<a href="#" class="btn btn-primary btn-xs" onclick='javascript:displayVariableList();' title="Return" >Return</a>
					<button id="editVariableBtn" class="btn btn-xs btn-primary"  type="button" onclick="javascript:editVariableData()" aria-hidden="true"><fmt:message key='administration_monitoring_instances_data_xml_edit'/></button>
					<button id="updateVariableBtn" class="btn btn-xs btn-primary hide"  type="button" aria-hidden="true"><fmt:message key='org_intalio_common_settings_update'/></button>
				</div>
			</div>
		</div>
</div>

<div class="hide">
	<div class="tree-folder" id="scopeTreeTemplate">
	    <div class="tree-folder-header"><i class="blue fa fa-folder"  onclick="showTreeView(this);"></i>	
	        <div class="tree-folder-name"></div>
	    </div>
	    <div class="tree-folder-content">
	        
	    </div>
	</div>
    <div style="display: none;" class="tree-loader">
        <div class="tree-loading"><i class="fa fa-refresh fa-spin blue"></i>
        </div>
    </div>
</div>
<div style='display:none' id='loadTree' class="tree-loader">
	<div class="tree-loading">
		<i class="fa fa-refresh fa-spin blue"></i>
	</div>
</div>
<div id="searchInstanceByIdPopup" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<span class="modal_heading"><fmt:message key='administration_monitoring_instances_search_instance_by_id'/></span>
			</div>
			<div class="modal-body">
				<div>
					<span class="hide text-danger" id="searchError"></span><br>

					<input type="text" id="searchInstanceById" class="form-control pull-right" onkeydown="javascript:ValidateId(event);"></input>
					<label for="searchInstanceById"><fmt:message key='administration_monitoring_instances_instance_id'/></label>
				</div>
			</div>
			<div class="modal-footer">
				<button onclick="javascript:searchById();return false" class="btn btn-sm btn-primary" type="button" aria-hidden="true"><fmt:message key='administration_monitoring_instances_search_instance_button'/></button>
			</div>
		</div>
	</div>
</div>
<div id="flagsList" class="hide legendTooltip">
	<div class="flags-body">
		<div class="flagLine"><i class="fa fa-flag green"></i>&nbsp;<fmt:message key='administration_monitoring_processes_table_column_inProgress'/></div>
		<div class="flagLine"><i class="fa fa-flag grey"></i>&nbsp;<fmt:message key='administration_monitoring_processes_table_column_completed'/></div>
		<div class="flagLine"><i class="fa fa-flag orange"></i>&nbsp;<fmt:message key='administration_monitoring_processes_table_column_failure'/></div>
		<div class="flagLine"><i class="fa fa-flag text-danger"></i>&nbsp;<fmt:message key='administration_monitoring_processes_table_column_failed'/></div>
		<div class="flagLine"><i class="fa fa-flag yellow-color"></i>&nbsp;<fmt:message key='administration_monitoring_processes_table_column_suspended'/></div>
		<div class="flagLine"><i class="fa fa-flag purple"></i>&nbsp;<fmt:message key='administration_monitoring_processes_table_column_terminated'/></div>
	</div>
</div>
<div id="AdhocEmpty">

</div>

<div class='hide'>
<span id="selectInfo"><fmt:message key="administration_monitoring_instances_table_select_info"/></span>
<span id="invokeSelectInfo"><fmt:message key="administration_monitoring_instances_table_invoke_message"/></span>
<span id="nofaultInfoRecords"><fmt:message key="administration_monitoring_instances_activityinfo_tab_fault_norecords"/></span>
<span id="notaskInfoRecords"><fmt:message key="administration_monitoring_instances_activityinfo_tab_task_norecords"/></span>
<span id="downloadSVG"><fmt:message key="administration_monitoring_instances_table_downloadSVG"/></span>
<span id="downloadPNG"><fmt:message key="administration_monitoring_instances_table_downloadPNG"/></span>
<span id="downloadPDF"><fmt:message key="administration_monitoring_instances_table_downloadPDF"/></span>
<span id="filterNameFmt"><fmt:message key="administration_monitoring_instances_table_button_Filter"/></span>
<span id="entriesPerPage"><fmt:message key="org_intalio_uifw_tables_entries_per_page"/></span>
<span id="terminateTitle"><fmt:message key="administration_monitoring_instances_table_terminate_Instance"/></span>
<span id="terminateConfirm"><fmt:message key="administration_monitoring_instances_table_terminate_confirm"/></span>
<span id="deleteTitle"><fmt:message key="administration_monitoring_instances_table_delete_Instance"/></span>
<span id="deleteConfirm"><fmt:message key="administration_monitoring_instances_table_delete_confirm"/></span>
<span id="deleteNameFmt"><fmt:message key="administration_monitoring_instances_table_button_delete"/></span>
<span id="terminateNameFmt"><fmt:message key="administration_monitoring_instances_table_button_terminate"/></span>
<span id="suspendNameFmt"><fmt:message key="administration_monitoring_instances_table_button_suspend"/></span>
<span id="invokeNameFmt"><fmt:message key="administration_monitoring_instances_table_button_invoke"/></span>
<span id="resumeNameFmt"><fmt:message key="administration_monitoring_instances_table_button_resume"/></span>
<span id="refreshNameFmt"><fmt:message key="org_intalio_uifw_tabls_refresh"/></span>
<span id="managefilterFmt"><fmt:message key="administration_monitoring_instances_table_filter__title"/></span>
<span id="enterFilterName"><fmt:message key="administration_monitoring_instances_filter_enter_filter_name"/></span>
<span id="selectInstanceFilter"><fmt:message key="administration_monitoring_instances_filter_select_filter"/></span>
<span id="chooseFilterState"><fmt:message key="administration_monitoring_instances_filter_choose_state"/></span>
<span id="deleteFilterHead"><fmt:message key="administration_monitoring_filter_delete_header"/></span>
<span id="sureToDeleteFilter"><fmt:message key="administration_monitoring_instances_filter_sure_to_delete_filter"/></span>
<span id="partnerLink"><fmt:message key="administration_monitoring_instances_data_partner_link"/></span>
<span id="partnerRole"><fmt:message key="administration_monitoring_instances_data_partner_role"/></span>
<span id="searchInstanceByIdFmt"><fmt:message key="administration_monitoring_instances_table_button_search_instance_by_id"/></span>
<span id="noVariables"><fmt:message key="org_intalio_common_no_variables_found"/></span>
<span id="noParterLinks"><fmt:message key="org_intalio_common_no_partnerLinks_found"/></span>
<span id="noCorrelation"><fmt:message key="org_intalio_common_no_correlation_found"/></span>
<span id="instanceFilterButton"><fmt:message key="administration_monitoring_filter"/></span>
<span id="searchInstanceByIdButton"><fmt:message key="administration_monitoring_search_by_instance_id"/></span>
<span id="instanceFilterNameExist"><fmt:message key="administration_monitoring_filter_name_already_exist"/></span>
<span id="specialCharacterOnly"><fmt:message key="administration_monitoring_special_character_only"/></span>
<span id="underscoreOnly"><fmt:message key="administration_monitoring_underscore_only"/></span>
<span id="enterInstanceID"><fmt:message key="administration_monitoring_enter_instance_id"/></span>
<span id="noOperationsInstance"><fmt:message key="administration_monitoring_instances_no_operations_for_instance"/></span>
<span id="atleastOneProcessFilter"><fmt:message key="administration_monitoring_instances_filter_atleast_one_process"/></span>
<span id="filterPackageLabel"><fmt:message key="administration_monitoring_instances_filter_package_label"/></span>
<span id="filterProcessLabel"><fmt:message key="administration_monitoring_instances_filter_process_label"/></span>
<span id="eventNotExecuted"><fmt:message key="administration_monitoring_instances_svg_event_not_executed"/></span>
<span id="instanceFilterCreateBtn"><fmt:message key="administration_monitoring_filter_create"/></span>
<span id="instanceFilterUpdateBtn"><fmt:message key="administration_monitoring_filter_update"/></span>
<span id="showExePath"><fmt:message key="administration_monitoring_instances_svg_show_path"/></span>
<span id="hideExePath"><fmt:message key="administration_monitoring_instances_svg_hide_path"/></span>
<span id="textCopiedSuccessfully"><fmt:message key="administration_monitoring_instances_copied_successfully"/></span>
<span id="updateFalshPlayer"><fmt:message key="org_intalio_swf_not_support"/></span>
<span id="noLinkedInstances"><fmt:message key="administration_monitoring_instances_no_linked_instances"/></span>
<span id="waitingOnTaskMsg"><fmt:message key="administration_monitoring_instances_waiting_on_task"/></span>
<span id="waitingOnServiceMsg"><fmt:message key="administration_monitoring_instances_waiting_on_service"/></span>
<span id="instancesMsg"><fmt:message key="administration_monitoring_instances_msg"/></span>
</div>
<script type="text/javascript" src="scripts/plugin/codemirror.js"></script>
<script type="text/javascript" src="scripts/plugin/closetag.js"></script>
<script type="text/javascript" src="scripts/plugin/xml.js"></script>
<script type="text/javascript" src="scripts/plugin/administration/monitoring/fuelux.tree.min.js"></script>
<script type="text/javascript" src="scripts/custom/administration/monitoring/instances.js?version=2676"></script>
</body>
</html>
