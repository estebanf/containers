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
<link href="style/custom/administration/monitoring/processes.css?version=2676" rel="stylesheet" />
<link href="style/plugin/jquery-ui.css?version=2676" rel="stylesheet" />
<!--[if IE 8]>
<link href="style/custom/administration/monitoring/processes-ie.css?version=2676" rel="stylesheet">
<![endif]-->
<script type="text/javascript" src="scripts/plugin/x-editable/bootstrap-editable.min.js"></script>
<script type="text/javascript" src="scripts/plugin/x-editable/ace-editable.min.js"></script>
</head>
<body>
<script type="text/javascript">
function processesButtonHeader(taskIcon){
	var iconButton; 
	switch(taskIcon){
		case "Start":
			iconButton = "<button type='button' id='startButton' class='btn btn-sm btn-white' onclick='startOperation();return false' title='Start'><i class='fa fa-arrow-right'></i><span class='no-mobile'>&nbsp;&nbsp;<fmt:message key='administration_monitoring_processes_start'/></span></button>&nbsp;";
			return iconButton;
			break;
		case "Activate":
			iconButton = "<button type='button' id='activeButton' class='btn btn-sm btn-white' onclick='activate();return false' title='Activate'><i class='fa fa-arrow-up'></i><span class='no-mobile'>&nbsp;&nbsp;<fmt:message key='administration_monitoring_processes_activate'/></span></button>&nbsp;";
			return iconButton;
			break;
		case "Retire":
			iconButton = "<button type='button' id='retireButton' class='btn btn-sm btn-white' onclick='retire();return false' title='Retire'><i class='fa fa-arrow-down'></i><span class='no-mobile'>&nbsp;&nbsp;<fmt:message key='administration_monitoring_processes_retire'/></span></button>&nbsp;";
			return iconButton;
			break;
		case "Deploy":
			iconButton = "<button type='button' id='deployButton' class='btn btn-sm btn-white' onclick='deploy();return false' title='Deploy'><i class='fa fa-plus'></i><span class='no-mobile'>&nbsp;&nbsp;<fmt:message key='administration_monitoring_processes_deploy'/></span></button>&nbsp;";;
			return iconButton;
			break;
		case "Undeploy":
			iconButton = "<button type='button' id='UndeployButton' class='btn btn-sm btn-white' onclick='undeploy();return false' title='Undeploy'><i class='fa fa-minus'></i><span class='no-mobile'>&nbsp;&nbsp;<fmt:message key='administration_monitoring_processes_undeploy'/></span></button>&nbsp;";
			return iconButton;
			break;
		case "Filter":
			iconButton = "<div class='btn-group'><button title='Filter' type='button' id='filterProcessButton' class='btn btn-sm btn-white dropdown-toggle ' data-toggle='dropdown' onclick='fetchProcessFilters();'><i class='fa fa-filter'></i><span class='no-mobile'>&nbsp;<span id='filter_process_name'>"+$('#filterNameFmt').text()+"</span>&nbsp;<span class='fa fa-caret-down fa-on-right'></span></span></button><ul class='dropdown-menu dropdown-info dropdown-caret' id='filterProcessDropdown'> <li><a class='iconCursor' onclick=javascript:openProcessesFilter();><fmt:message key='administration_monitoring_processes_manage_filter'/></a></li><li class='divider'></li></ul>";
			return iconButton;
			break;
		case "Sort":
			iconButton = "<button type='button' id='sortButton' class='btn btn-sm btn-white' onclick='openSortPopup();return false' title='Sort Processes'><i class='fa fa-sort'></i><span class='no-mobile'>&nbsp;&nbsp;<fmt:message key='administration_monitoring_sort'/></span></button>&nbsp;";
			return iconButton;
			break;
		case "viewAllProcess":
			iconButton = '<a title="Refresh" class="btn btn-sm btn-white table_refresh_icon" onclick=refreshProccessList();><i class="fa fa-refresh"></i></a>';
			return iconButton;
			break;
		case "analytics":
			iconButton = "&nbsp;<button type='button' id='analyticsBtn' class='btn btn-sm btn-white' onclick='loadAnalyticsJS();return false' title='Analytics'><i class='fa fa-bar-chart-o'></i><span class='no-mobile'>&nbsp;&nbsp;<fmt:message key='administration_monitoring_processes_table_column_analytics'/></span></button>&nbsp;";
			return iconButton;
		}
}
</script>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;
		<li><fmt:message key='administration_monitoring'/>&nbsp;&nbsp;</li>
		<li class="active"><a class="noDecoration iconCursor" onclick="javascript:getProcessActionsList();"><fmt:message key='administration_monitoring_processes_breadcrumb'/></a></li>
		<div style="display:inline-block" id="breadcrumbProcessFilter" class="hide"> <i class="fa fa-angle-right"></i>&nbsp;&nbsp; <span id="bcProcessFilterName"></span>&nbsp;&nbsp;<a class="noDecoration iconCursor" onclick="removeProcessBreadCrumbs();"><i class="fa fa-times"></i></a></div>
	</ul>
</div>
<div class="page-content">
	<div class="row">
		<div class="col-xs-12">
			<div id="processesTableButtons">
			</div>
			<div class="table-responsive">
				<table id="monitoring_process" class="table table-bordered ">
					<thead>
						<tr>
							<th class="nowrap" rowspan="2"><label class="position-relative"><input type="checkbox" class="ace" id="selectAll" onclick="updateChildrenCheckBox(this);"><span class="lbl"></span></label></th>
							<th class="nowrap" rowspan="2"><fmt:message key="administration_monitoring_processes_table_column_process"/></th>
							<th class="nowrap" rowspan="2"><fmt:message key="administration_monitoring_processes_table_column_lifecycle"/>&nbsp;<i class="fa fa-info-circle iconCursor" onmouseover="showLegend(this);" onmouseout="hideLegend(this);"></i><span class='pull-right hide'><i class="fa fa-sort-down blue"></i></span></th>
							<th colspan="7" rowspan="1" class="center"><fmt:message key="administration_monitoring_processes_instance_count_header"/></th>
						</tr>
						<tr>
							<th class="nowrap"><fmt:message key="administration_monitoring_processes_table_column_inProgress"/></th>
							<th class="nowrap"><fmt:message key="administration_monitoring_processes_table_column_completed"/></th>
							<th class="nowrap"><fmt:message key="administration_monitoring_processes_table_column_failure"/></th>
							<th class="nowrap"><fmt:message key="administration_monitoring_processes_table_column_failed"/></th>
							<th class="nowrap"><fmt:message key="administration_monitoring_processes_table_column_suspended"/></th>
							<th class="nowrap"><fmt:message key="administration_monitoring_processes_table_column_terminated"/></th>
							<th class="nowrap"><fmt:message key="administration_monitoring_processes_table_column_total"/></th>
							<th>PackageName</th>
							<th>Package</th>
							<th>Version</th>
						</tr>
					</thead>
					<tbody id="monitoring_Process_rows">
					</tbody>
				</table>
			</div> 
			</form>
		</div>
	</div>
</div>
<div id="deleteDeployModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<span class="undeploymentConfirmText" style="font-size:15px;"></span><br><br>
				</div>
				<div class="modal-footer">
					<a class="btn btn-danger btn-sm" onclick="confirmDeleteDeploy();" data-dismiss="modal" aria-hidden="true"><fmt:message key="administration_monitoring_processes_confirmation"/></a>
				</div>
			</div>
		</div>
</div>
<div id="breTableModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<div class="slimScrollBar">
						<table id="breResourceTable" class="table table-bordered dataTable">
							<thead>
								<tr>
									<th class="noWrap"><fmt:message key="business_rule"/></th>
								</tr>
							</thead>
							<tbody id='breResourceTable_rows'>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
</div>
<div id="breTableDataModal" class="modal fade" style="width:100%">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<div class="slimScrollBar">
						<table id="breTable" border="1" style="width:100%" class="table table-bordered" />
					</div>
				</div>
				<div class="modal-footer hide">
					<button id="validateBRE" onclick="javascript:validateBRETable();" class="btn btn-sm btn-primary"  type="button" aria-hidden="true">Validate</button>
					<button id="updateBRE" onclick="javascript:updateBRETable();" class="btn btn-sm btn-primary"  type="button" aria-hidden="true">Save</button>
					<button id="deployBRE" onclick="javascript:deployBRETable();" class="btn btn-sm btn-primary"  type="button" aria-hidden="true">Deploy</button>
				</div>
			</div>
		</div>
</div>
<div id="deletefilterModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="administration_monitoring_filter_delete_header"/></span>
				</div>
				<div class="modal-body">
					<span class="undeploymentConfirmText" style="font-size:15px;"><fmt:message key="administration_monitoring_processes_filter_sure_to_delete_filter"/></span><br><br>
				</div>
				<div class="modal-footer">
					<a class="btn btn-danger btn-sm" onclick="deleteProcessFilter();" data-dismiss="modal" aria-hidden="true"><fmt:message key="administration_monitoring_processes_confirmation"/></a>
				</div>
			</div>
		</div>
</div>
<div id="createProcessFilter" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<span class="modal_heading"><fmt:message key="administration_monitoring_processes_table_filter__title"/></span>
			</div>
		<div class="modal-body">
			<span id="processFilterSpan" class="text-danger pull-left"></span>
			<table class="table noLines" width="100%">
				<tr>
					<td width="50%">
						<input class="ace" type="radio" id="newFilter" name='form-field-radio' onclick="javascript:createNewFilter();">
							<span class='lbl'></span>
							<label class="manageFilter"><fmt:message key="administration_monitoring_processes_create_new_filter"/></label>
						</input>
					</td>
					<td width="50%">
						<input class="ace" type="radio" id="updateFilters" name='form-field-radio' onclick="javascript:updateFilter();"/>
							<span class='lbl'></span>
							<label class="manageFilter"><fmt:message key="administration_monitoring_processes_update_filter"/></label>
						</input>
					</td>
				</tr>
			</table>
			<table id='filterUpdateTable' class="table noLines hide" width="100%">
				<tr>
					<td width="30%"><fmt:message key="administration_monitoring_processes_table_filter_select"/></td>
					<td width="50%"><select id="processFilters" data-placeholder="Choose Filter"></select></td>
				</tr>
			</table>
			<table id="filterCreateTable" class="table noLines hide" width="100%">
				<tr>
					<td width="30%"><fmt:message key="administration_monitoring_instances_table_filter_name"/></td>
					<td width="50%"><input type="text" id="filterProcessName" maxlength="15"/></td>
				</tr>
				<tr>
					<td width="30%"><fmt:message key="com_intalio_bpms_widget_packages"/></td>
					<td width="50%"><select id="mon_filterPackages" onchange="populateProcessFromPackage(this)" data-placeholder="Choose Package(s)"></select></td>
				</tr>
				<tr class='hide'>
					<td width="30%"><fmt:message key="com_intalio_bpms_widget_processes"/></td>
					<td width="50%"><select id="mon_filterProcesses" data-placeholder="Choose Process(es)"></select></td>
				</tr>
				<tr>
					<td width="30%"><fmt:message key="administration_monitoring_processes_life_cycle"/></td>
					<td width="50%">
						<select id="filterLifeCycle" data-placeholder="Choose Life Cycle">
						</select>
					</td>
				</tr>
				<tr>
					<td width="30%"><fmt:message key="administration_monitoring_processes_status"/></td>
					<td width="50%"><select id="filterStatus" data-placeholder="Choose Status">
					</select></td>
				</tr>
				<tr>
					<td width="30%"><fmt:message key="administration_monitoring_processes_filter_deployed_before"/></td>
					<td width="50%">
					<div class="input-group" style="width:200px;">
					<input type="text" class="deployedDates" id="startedDeployedBefore" data-date-format="YYYY-MM-DD" /><span class="input-group-addon"><i class="fa fa-calendar bigger-110"></i>
					</span>
					</div>
				</td>
				</tr>
				<tr>
					<td width="30%"><fmt:message key="administration_monitoring_processes_filter_deployed_after"/></td>
					<td width="50%">
					<div class="input-group" style="width:200px;">
						<input type="text" class="deployedDates" id="startedDeployedAfter" data-date-format="YYYY-MM-DD" />
						<span class="input-group-addon"><i class="fa fa-calendar bigger-110"></i></span>
					</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="modal-footer hide">
			<button id="saveProcessFilter" onclick="javascript:saveORUpdateProcessFilter('save');" class="btn btn-sm btn-primary"  type="button" aria-hidden="true"><fmt:message key='administration_monitoring_filter_create'/></button>
			<button id="processDeleteFilter" onclick="javascript:confirmDeleteProcessFilter();" class="btn btn-sm btn-primary hide"  type="button" aria-hidden="true"><fmt:message key='administration_monitoring_instances_table_filter_delete'/></button>
		</div>
	</div>
</div>
</div>


<div id="startOperation" class="modal fade" tabindex="-1">
	<div id="startOperationModal" class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" onclick="getUpdatedList()"
					aria-hidden="true">&times;</button>
				<span class="modal_heading"></span>
			</div>
			<div class="modal-body">
				<span class="text-danger hide startProcessError" >Please fill all mandatory fields.</span>
				<div id="startOperationFrame" src="" width="100%" height="100%" frameBorder="0">
				</div>
				<span class="text-danger hide startProcessError" >Please fill all mandatory fields.</span>
			</div>
			<div class="modal-footer ">
				<button id="" onclick="submitStartProcess();" class="btn btn-sm btn-primary"  type="button" aria-hidden="true">Start</button>
			</div>
		</div>
	</div>
</div>

<div id="sortProcessModal" class="modal fade" tabindex="-1">
	<div id="startOperationModal" class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" 
					aria-hidden="true">&times;</button>
				<span class="modal_heading"><fmt:message key="administration_monitoring_processes_sort_processes"/></span>
			</div>
			<div class="modal-body">
				<table class="table noLines" width="100%">
					<tr>
						<td width="50%">
							<input class="ace" type="radio" id="sortByPackageName" name='form-field-radio'>
								<span class='lbl'></span>
								<label><fmt:message key="administration_monitoring_processes_sort_by_package_name"/></label>
							</input>
						</td>
						<td width="50%">
							<select id="packageOrder" class="form-control">
								<option value='+'><fmt:message key="administration_monitoring_processes_sort_oder_by_ascending"/></option>
								<option value='-'><fmt:message key="administration_monitoring_processes_sort_oder_by_descending"/></option>
							</select>
						</td>
					</tr>
					<tr>
						<td width="50%">
							<input class="ace" type="radio" id="sortByDeployedDate" name='form-field-radio' />
								<span class='lbl'></span>
								<label><fmt:message key="administration_monitoring_processes_sort_by_deployed_date"/></label>
							</input>
						</td>
						<td width="50%">
							<select id="deployedDateOrder" class="form-control">
								<option value='+'><fmt:message key="administration_monitoring_processes_sort_oder_by_ascending"/></option>
								<option value='-'><fmt:message key="administration_monitoring_processes_sort_oder_by_descending"/></option>
							</select>
						</td>
					</tr>
					<tr>
						<td width="50%">
							<input class="ace" type="radio" id="sortByLastActive" name='form-field-radio' />
								<span class='lbl'></span>
								<label><fmt:message key="administration_monitoring_processes_sort_by_last_active"/></label>
							</input>
						</td>
						<td width="50%">
							<select id="lastActiveOrder" class="form-control">
								<option value='+'><fmt:message key="administration_monitoring_processes_sort_oder_by_ascending"/></option>
								<option value='-'><fmt:message key="administration_monitoring_processes_sort_oder_by_descending"/></option>
							</select>
						</td>
					</tr>
				</table>
			</div>
			<div class="modal-footer">
				<button id="sortProcess" onclick="javascript:sortProcesses();" data-dismiss="modal" class="btn btn-sm btn-primary"  type="button" aria-hidden="true"><fmt:message key='administration_monitoring_sort_apply'/></button>
		</div>
		</div>
	</div>
</div>
<div id="deployProcessPopup" class="modal fade" tabindex="-1">
	<div class="modal-dialog" style="width:700px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" onclick="closeDeployModal();"
					aria-hidden="true">&times;</button>
				<span class="modal_heading"><fmt:message key="com_intalio_bpms_console_processes_deploy_process"/></span>
			</div>
			<div class="modal-body">
				<div id="noProcessSelected" class="text-danger"></div>
				<form id="deployForm" enctype="multipart/form-data" name="form" method="POST" style="display:inline;" action="console/deployment/processes/deploy?mediaType=json">
					<table width="600" border="0" cellspacing="0" cellpadding="4" style="margin-left: 10px; ">
					<tr>
						<td width="65" ><fmt:message key="com_intalio_bpms_console_processes_pathToFile"/></td>
						<td width="400"><input type="file" name="file" id ="file" value="" /></td>
						<td width="30" style="text-align: right;padding-top:7px;"><button height="28" onclick="deployProcess();"  class='btn btn-primary btn-xs' type="button"  ><fmt:message key="com_intalio_bpms_console_processes_deploy"/></button></td>
					</tr>
					<tr>
						<td></td>
						<td width="400"><span id="deployProcessMessage"></span></td>
					<tr>
					</table>
				</form>
			</div>
			<br>
		</div>
	</div>
</div>
<div id="deployProcessIE" class="modal fade" tabindex="-1">
	<div class="modal-dialog" style="width:700px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" onclick="closeDeployModal();"
					aria-hidden="true">&times;</button>
				<span class="modal_heading"><fmt:message key="com_intalio_bpms_console_processes_deploy_process"/></span>
			</div>
			<div class="modal-body">
				<div id="noProcessSelected" class="text-danger"></div>
					<iframe id="deployProcessFrame" src="" width="100%" height="100%" frameBorder="0">
					</iframe>
			</div>
		</div>
	</div>
</div>
<div id="messageDialog" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<span class="modal_heading"><fmt:message key="administration_monitoring_processes_confirmation"/></span>
			</div>
			<div class="modal-body">
				<p class="text-danger"><fmt:message key="administration_monitoring_processes_confirmation_for_undeploy_package"/></b></p>
			</div>
			<div class="modal-footer">
				<button class="btn btn-inverse btn-sm" data-dismiss="modal" aria-hidden="true">No</button>
				<button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true">Yes</button>
			</div>
		</div>
	</div>
</div>
<div id="processInfo" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="administration_monitoring_processes_processDetails_title"/></span>
				</div>
				<div class="modal-body">
					<div>
					<ul class="nav nav-tabs">
						<li class="processInfoHeader"><a data-toggle="tab" href="#processInformation" onclick="getProcessInfoTab();"><fmt:message key="administration_monitoring_processes_processDetails_tab_processInfo"/></a></li>
						<li class="processInfoHeader"><a data-toggle="tab" href="#processDiagram" onclick="showDiagramTab();"><fmt:message key="administration_monitoring_processes_processDetails_tab_processDiagram"/></a></li>
						<li class="processInfoHeader"><a data-toggle="tab" href="#processServices" onclick="getProcessServiceTab();"><fmt:message key="administration_monitoring_processes_processDetails_tab_processServices"/></a></li>
						<li class="processInfoHeader"><a data-toggle="tab" href="#processResource" onclick="getProcessResourceTab();"><fmt:message key="administration_monitoring_processes_processDetails_tab_processResources"/></a></li>
					</ul>
					<div class="tab-content">
						<div id="processInformation" class="tab-pane processInfoHeader">
							<div>
								<table id="processInfoTable">
								</table>
							</div>
						</div>
						<div id="processDiagram" class="tab-pane processInfoHeader">
								<div class='pull-left actInsBtn'>
									<button class="btn btn-sm btn-white dropdown-toggle pull-right" data-toggle="dropdown" title="Generate Instance Activity Summary" type="button" onclick='javascript:getActivityInstanceSummary()'>
										<i class="fa fa-play"></i>
									</button>
								</div>
								<div class='pull-left hide insSummaryMessage'><span class='infoIns'>
									<fmt:message key='administration_monitoring_processes_ins_summary_message'/>
								</span></div>
  								<div class='insSummary hide'>
	  								<div class="pull-left">
	                    			<label class="instanceSummaryInfo"><fmt:message key="administration_monitoring_processes_table_column_inProgress"/>:</label>  <span class='inprogress'>-</span>
	  								</div>
	  								<div class="pull-left">
	                    			<label class="instanceSummaryInfo"><fmt:message key="administration_monitoring_processes_table_column_failed"/>:</label>  <span class='failed'>-</span>
	  								</div>
	  								<div class="pull-left">
	                    			<label class="instanceSummaryInfo"><fmt:message key="administration_monitoring_processes_table_column_failure"/>:</label>  <span class='failure'>-</span>
	  								</div>
	  								<div class="pull-left">
	                    			<label class="instanceSummaryInfo"><fmt:message key="administration_monitoring_processes_ins_summary_last_updated"/>:</label>  <span class='lastUpdated'>-</span>
	  								</div>
	  							</div>
								<div class="btn-group open pull-right">
									<button id="exportButton" class="btn btn-sm btn-white dropdown-toggle pull-right" data-toggle="dropdown" title="Download" type="button">
										<i class="fa fa-download"></i><span class="fa fa-caret-down "></span>
									</button>
									<ul class="dropdown-menu pull-right">
										<li>
											<a onclick="javascript:DownloadDiagram('svg');" href="#"><fmt:message key="administration_monitoring_processes_download_svg"/></a>
										</li>
										<li>
											<a onclick="javascript:DownloadDiagram('png');" href="#"><fmt:message key="administration_monitoring_processes_download_png"/></a>
										</li>
										<li>
											<a onclick="javascript:DownloadDiagram('pdf');" href="#"><fmt:message key="administration_monitoring_processes_download_pdf"/></a>
										</li>
									</ul>
								</div>
							
							<br><br>
							<div id="showDiagram" class="">
							</div>
						</div>
						<div id="processResource" class="tab-pane processInfoHeader">
							<span id="processResourceSpan" class="text-danger"></span>
							<div class="slimScrollBar">
								<table id="processResourceTable" class="table table-bordered dataTable">
									<thead>
										<tr>
											<th><label class="position-relative logClass"><input type="checkbox" class="ace" id="selectAll" onclick="updateCheckbox(this);"><span class="lbl"></span></label></th>
											<th class="noWrap"><fmt:message key="administration_monitoring_processes_resource_file"/></th>
										</tr>
									</thead>
									<tbody id='processResourceTable_rows'>
									</tbody>
								</table>
							</div>
						</div>
						<div id="processServices" class="tab-pane processInfoHeader">
							<div class="slimScrollBar">
								<table id="processServicesTable" class="table table-bordered dataTable">
									<thead>
										<tr>
											<th><fmt:message key="administration_monitoring_processes_service_name"/></th>
											<th class="noWrap"><fmt:message key="administration_monitoring_processes_service_endpoint"/></th>
											<th><fmt:message key="administration_monitoring_processes_service_oprerations"/></th>
										</tr>
									</thead>
									<tbody id='processServicesTable_rows'>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="startTimerModal" class="modal fade" tabindex="-1">
	<div class="modal-dialog" style="width:600px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<span class="modal_heading"></span>
			</div>
			<div class="modal-body">
				<div class="slimScrollBar">
					<span class="hide text-danger" id="cronErrorMsg"></span>
					<table id="processStartTimerTable" class="table">
						<tr class="tr-expression" >
							<td width="30%"><fmt:message key="administration_monitoring_processes_start_timer_exp_type"/></td>
							<td width="70%"><select id="startTimerExpressionType" onchange="changeExpression(this.value)" class="startTimerSelect">
									<option value="timeDate"><fmt:message key="administration_monitoring_processes_start_timer_date_time"/></option>
									<option value="timeDuration"><fmt:message key="administration_monitoring_processes_start_timer_duration"/></option>
									<option value="timeCycle"><fmt:message key="administration_monitoring_processes_start_timer_cron"/></option>
								</select>
								&nbsp; <span class="timerInfoSpan" title=""><i class="fa fa-info-circle iconCursor grey"></i></span>
							</td>
						</tr>
						<tr class="tr-expression expressionParameters">

							
							
						</tr>
					</table>
					<div class="exp-time-duration hide durationExpression">			
						<table id="durationTable"class="table">
							<tr><td class="durationExp"><span class="ui-slider ui-slider-yellow" type="durationSecond">0</span></td><td><span id="durationSecond">0 <fmt:message key="administration_monitoring_processes_start_timer_time_seconds"/></span></td></tr>
							<tr><td class="durationExp"><span class="ui-slider ui-slider-dark" type="durationMinute">0</span></td><td><span id="durationMinute">0 <fmt:message key="administration_monitoring_processes_start_timer_time_minutes"/></span></td></tr>
							<tr><td class="durationExp"><span class="ui-slider ui-slider-orange" type="durationHour">0</span></td><td><span id="durationHour">0 <fmt:message key="administration_monitoring_processes_start_timer_time_hours"/></span></td></tr>
							<tr><td class="durationExp"><span class="ui-slider ui-slider-purple" type="durationDay">0</span></td><td><span id="durationDay">0 <fmt:message key="administration_monitoring_processes_start_timer_time_days"/></span></td></tr>
							<tr><td class="durationExp"><span class="ui-slider ui-slider-red" type="durationMonth">0</span></td><td><span id="durationMonth">0 <fmt:message key="administration_monitoring_processes_start_timer_time_months"/></span></td></tr>
							<tr><td class="durationExp"><span class="ui-slider ui-slider-green" type="durationYear">0</span></td><td><span id="durationYear">0 <fmt:message key="administration_monitoring_processes_start_timer_time_years"/></span></td></tr>
						</table>
					
					</div>
					<div class="exp-time-cycle hide">
						<div class="panel-group" id="accordion">
						  <div class="panel panel-default">
						    <div class="panel-heading">
						      <span class="panel-title">
						        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" class="noDecoration">
						          <i class="fa fa-angle-right"></i>&nbsp; <fmt:message key="administration_monitoring_processes_start_timer_cron_ui_sec"/> 
						        </a>
						      </span>
						    </div>
						    <div id="collapseOne" class="panel-collapse collapse">
						      <div class="panel-body">
						        <ul class="nav nav-tabs">
									<li class="active"><a data-toggle="tab" href="#cron-sec-every"><fmt:message key="administration_monitoring_processes_start_timer_every"/> n <fmt:message key="administration_monitoring_processes_start_timer_time_seconds"/></a></li>
									<li><a data-toggle="tab" href="#cron-sec-select"><fmt:message key="administration_monitoring_processes_start_timer_each_selected"/>  <fmt:message key="administration_monitoring_processes_start_timer_time_seconds"/></a></li>
								</ul>
								<div class="tab-content">
									<div id="cron-sec-every" class="tab-pane active">
										<span class="slide-text"><fmt:message key="administration_monitoring_processes_start_timer_every"/> <span class="var-text">0</span> <fmt:message key="administration_monitoring_processes_start_timer_time_seconds"/></span>
										<span class="ui-slider ui-slider-green" id="slider-sec" ></span>
									</div>
									<div id="cron-sec-select" class="tab-pane">
										<select multiple id="select-sec" data-placeholder="Choose Seconds..." class></select>
									</div>
								</div>
						      </div>
						    </div>
						  </div>
						  <div class="panel panel-default">
						    <div class="panel-heading">
						      <span class="panel-title">
						        <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" class="noDecoration">
						          <i class="fa fa-angle-right"></i>&nbsp; <fmt:message key="administration_monitoring_processes_start_timer_cron_ui_min"/>
						        </a>
						      </span>
						    </div>
						    <div id="collapseTwo" class="panel-collapse collapse">
						      <div class="panel-body">
						        <ul class="nav nav-tabs">
									<li class="active"><a data-toggle="tab" href="#cron-min-every"><fmt:message key="administration_monitoring_processes_start_timer_every"/> n <fmt:message key="administration_monitoring_processes_start_timer_time_minutes"/></a></li>
									<li><a data-toggle="tab" href="#cron-min-select"><fmt:message key="administration_monitoring_processes_start_timer_each_selected"/> <fmt:message key="administration_monitoring_processes_start_timer_time_minutes"/></a></li>
								</ul>
								<div class="tab-content">
									<div id="cron-min-every" class="tab-pane active">
										<span class="slide-text"><fmt:message key="administration_monitoring_processes_start_timer_every"/> <span class="var-text">0</span> <fmt:message key="administration_monitoring_processes_start_timer_time_minutes"/></span>
										<span class="ui-slider ui-slider-green" id="slider-min"></span>
									</div>
									<div id="cron-min-select" class="tab-pane">
										<select multiple id="select-min" data-placeholder="Choose Minutes..."></select>
									</div>
								</div>
						      </div>
						    </div>
						  </div>
						  <div class="panel panel-default">
						    <div class="panel-heading">
						      <span class="panel-title">
						        <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree" class="noDecoration">
						          <i class="fa fa-angle-right"></i>&nbsp; <fmt:message key="administration_monitoring_processes_start_timer_cron_ui_hour"/>
						        </a>
						      </span>
						    </div>
						    <div id="collapseThree" class="panel-collapse collapse">
						      <div class="panel-body">
						        <ul class="nav nav-tabs">
									<li class="active"><a data-toggle="tab" href="#cron-hour-every"><fmt:message key="administration_monitoring_processes_start_timer_every"/> n <fmt:message key="administration_monitoring_processes_start_timer_time_hours"/></a></li>
									<li><a data-toggle="tab" href="#cron-hour-select"><fmt:message key="administration_monitoring_processes_start_timer_each_selected"/> <fmt:message key="administration_monitoring_processes_start_timer_time_hours"/></a></li>
								</ul>
								<div class="tab-content">
									<div id="cron-hour-every" class="tab-pane active">
										<span class="slide-text"><fmt:message key="administration_monitoring_processes_start_timer_every"/> <span class="var-text">0</span> <fmt:message key="administration_monitoring_processes_start_timer_time_hours"/></span>
										<span class="ui-slider ui-slider-green" id="slider-hour" ></span>
									</div>
									<div id="cron-hour-select" class="tab-pane">
										<select multiple id="select-hour" data-placeholder="Choose Hours..."></select>
									</div>
								</div>
						      </div>
						    </div>
						  </div>
						  <div class="panel panel-default">
						    <div class="panel-heading">
						      <span class="panel-title">
						        <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour" class="noDecoration">
						          <i class="fa fa-angle-right"></i>&nbsp; <fmt:message key="administration_monitoring_processes_start_timer_cron_ui_day"/>
						        </a>
						      </span>
						    </div>
						    <div id="collapseFour" class="panel-collapse collapse">
						      <div class="panel-body">
						        <ul class="nav nav-tabs">
									<li class="active"><a data-toggle="tab" href="#cron-day-select"><fmt:message key="administration_monitoring_processes_start_timer_each_selected"/> <fmt:message key="administration_monitoring_processes_start_timer_time_days"/></a></li>
								</ul>
								<div class="tab-content">
									<div id="cron-day-select" class="tab-pane active">
										<select multiple id="select-day" data-placeholder="Choose Days..."></select>
									</div>
								</div>
						      </div>
						    </div>
						  </div>
						  <div class="panel panel-default">
						    <div class="panel-heading">
						      <span class="panel-title">
						        <a data-toggle="collapse" data-parent="#accordion" href="#collapseFive" class="noDecoration">
						          <i class="fa fa-angle-right"></i>&nbsp; <fmt:message key="administration_monitoring_processes_start_timer_cron_ui_month"/>
						        </a>
						      </span>
						    </div>
						    <div id="collapseFive" class="panel-collapse collapse ">
						      <div class="panel-body">
						        <ul class="nav nav-tabs">
									<li class="active"><a data-toggle="tab" href="#cron-month-select"><fmt:message key="administration_monitoring_processes_start_timer_each_selected"/> <fmt:message key="administration_monitoring_processes_start_timer_time_months"/></a></li>
								</ul>
								<div class="tab-content">
									<div id="cron-month-select" class="tab-pane active">
										<select multiple id="select-month" data-placeholder="Choose Months..."></select>
									</div>
								</div>
						      </div>
						    </div>
						  </div>
						  <div class="panel panel-default">
						    <div class="panel-heading">
						      <span class="panel-title">
						        <a data-toggle="collapse" data-parent="#accordion" href="#collapseSix" class="noDecoration">
						          <i class="fa fa-angle-right"></i>&nbsp; <fmt:message key="administration_monitoring_processes_start_timer_cron_ui_dow"/>
						        </a>
						      </span>
						    </div>
						    <div id="collapseSix" class="panel-collapse collapse">
						      <div class="panel-body">
						        <ul class="nav nav-tabs">
									<li class="active"><a data-toggle="tab" href="#cron-dow-select"><fmt:message key="administration_monitoring_processes_start_timer_each_selected"/> <fmt:message key="administration_monitoring_processes_start_timer_time_dow"/></a></li>
								</ul>
								<div class="tab-content">
									<div id="cron-dow-select" class="tab-pane active">
										<select multiple id="select-dow" data-placeholder="Choose Week Days..."></select>
									</div>
								</div>
						      </div>
						    </div>
						  </div>
						  <div class="panel panel-default">
						    <div class="panel-heading">
						      <span class="panel-title">
						        <a data-toggle="collapse" data-parent="#accordion" href="#collapseSeven" class="noDecoration">
						          <i class="fa fa-angle-right"></i>&nbsp; <fmt:message key="administration_monitoring_processes_start_timer_cron_ui_year"/>
						        </a>
						      </span>
						    </div>
						    <div id="collapseSeven" class="panel-collapse collapse">
						      <div class="panel-body">
						        <ul class="nav nav-tabs">
									<li class="active"><a data-toggle="tab" href="#cron-year-select"><fmt:message key="administration_monitoring_processes_start_timer_each_selected"/> <fmt:message key="administration_monitoring_processes_start_timer_time_years"/></a></li>
								</ul>
								<div class="tab-content">
									
									<div id="cron-year-select" class="tab-pane active">
										<select multiple id="select-year" data-placeholder="Choose Years..."></select>
									</div>
								</div>
						      </div>
						    </div>
						  </div>
						</div>
					</div>
					<table class="table nextScheduleTable">
						<tr>
							<td width="40%"><fmt:message key="administration_monitoring_processes_start_time_next_job_timing"/> </td>
							<td width="60%"><span id="nextJob"></span></td>
						</tr>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<a class="btn btn-primary btn-sm" onclick="updateStartTimer();"><fmt:message key="org_intalio_common_settings_update"/></a>
			</div>
		</div>
	</div>
</div>

<div id="lifeCycleLegend" class="hide legendTooltip">
	<div class="flags-body">
		<div class="flagLine"><i class="fa fa-flag green"></i>&nbsp;<fmt:message key="administration_monitoring_processes_lifecycle_legend_active"/></div>
		<div class="flagLine"><i class="fa fa-flag text-danger"></i>&nbsp;<fmt:message key="administration_monitoring_processes_lifecycle_legend_retire"/></div>
	</div>
</div>
<div id="analyticsModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<span class="modal_heading"><fmt:message key="administration_monitoring_processes_process_completion_time"/></span>
			</div>
			<div class="modal-body">
				<div><span id="errorMessage" class='text-danger hide'/></div>
				<div class='pull-right analyticsH hide' id='configureBtn'><span class='action-buttons'><a class='ace-popover pull-right noDecoration iconCursor' data-trigger='hover' data-content='Configure' data-placement='bottom' onclick='configureAnalytics()'><i class='fa fa-cog bigger-125'></i></a></span></div>
				<div id='procAnalytics'>
					<div class='form-group'>
						<label class='col-sm-4 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_start_stop'/></label>
						<label class="inline" id="enableAnalytics">
							<input type="checkbox" class="enableAnalytics ace ace-switch ace-switch-5" onclick="javascript:startStopAnalytics(this)"/>
							<span class="lbl"></span>
						</label>
					</div>
					<div class="form-group">
						<label class="col-sm-4 control-label no-padding-right">Show Analytics In</label>
						<ul class="wizard-steps analyticsTime">
							<li class="active seconds">
								<span onclick='javascript:changeAnalytics("seconds")' class="step">S</span>
								<span class="title">Seconds</span>
							</li>

							<li class='minutes'>
								<span onclick='javascript:changeAnalytics("minutes")' class="step">M</span>
								<span class="title">Minutes</span>
							</li>

							<li class='hours'>
								<span onclick='javascript:changeAnalytics("hours")' class="step">H</span>
								<span class="title">Hours</span>
							</li>

							<li class='days'>
								<span onclick='javascript:changeAnalytics("days")' class="step">D</span>
								<span class="title">Days</span>
							</li>
						</ul>
					</div>
					<div class='form-group'>
						<label class='col-sm-1 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_mean'/></label>
						<span class='analyticsInfo col-sm-3'><a class='ace-popover' data-content='<fmt:message key="administration_monitoring_processes_analytics_mean_info"/>' data-trigger='hover' data-placement='right'><i class='fa fa-info-circle bigger-125'/></a></span>
						<span id="mean">-</span>
					</div>
					<div class='form-group'>
						<label class='col-sm-1 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_median'/></label>
						<span class='analyticsInfo col-sm-3'><a class='ace-popover' data-content='<fmt:message key="administration_monitoring_processes_analytics_median_info"/>' data-trigger='hover' data-placement='right'><i class='fa fa-info-circle bigger-125'/></a></span>
						<span id="median">-</span>
					</div>
					<div class='form-group'>
						<label class='col-sm-1 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_mode'/></label>
						<span class='analyticsInfo col-sm-3'><a class='ace-popover' data-content='<fmt:message key="administration_monitoring_processes_analytics_mode_info"/>' data-trigger='hover' data-placement='right'><i class='fa fa-info-circle bigger-125'/></a></span>
						<span id="mode">-</span>
					</div>
					<div class='form-group'>
						<label class='col-sm-1 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_range'/></label>
						<span class='analyticsInfo col-sm-3'><a class='ace-popover' data-content='<fmt:message key="administration_monitoring_processes_analytics_range_info"/>' data-trigger='hover' data-placement='right'><i class='fa fa-info-circle bigger-125'/></a></span>
						<span id="range">-</span>
					</div>
					<div class='form-group'>
						<label class='col-sm-4 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_report_gen_time'/></label>
						<span id="reportGenTime">-</span>
					</div>
					<div class='form-group'>
						<label class='col-sm-4 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_ins_cnt'/></label>
						<span id="instanceCount">0</span>
					</div>
					<div class='form-group'>
						<span id="analyticsDescription">-</span>
					</div>
				</div>
				<div id='configureAnalytics' class='hide'>
					<div class='form-group'>
						<label class='col-sm-4 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_delay'/></label>
						<div class='col-sm-8'>
							<input type="text" id="delay" maxlength="8" onkeydown="javascript:validateIsNumeric(event)" class='statParam'></input>
						</div>
					</div>
					<div class='form-group'>
						<label class='col-sm-4 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_criteria'/></label>
						<div class='col-sm-8'>
							<select id="statCriteria" onchange="javascript:showRequiredFields()"class='statParam' placeholder='Choose Criteria'></select>
						</div>
					</div>
					<div class='form-group insLimit hide'>
						<label class='col-sm-4 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_instance_limit'/></label>
						<div class='col-sm-8'>
							<input type="text" onkeydown="javascript:validateIsNumeric(event)" class='statParam' id="instanceLimit" maxlength="8"/>
						</div>
					</div>
					<div class='form-group lastXDays hide'>
						<label class='col-sm-4 control-label no-padding-right'><fmt:message key='administration_monitoring_processes_analytics_no_of_days'/></label>
						<div class='col-sm-8'>
							<input type="text" maxlength="8" onkeydown="javascript:validateIsNumeric(event)" class='statParam' id="noOfdays"/>
						</div>
					</div>
					<div class="form-group range hide">
						<label class='col-sm-4 control-label no-padding-right'><fmt:message key='org_intalio_common_since'/></label>
						<div class="input-daterange input-group">
							<input type="text" class="input-sm form-control" id="dateStart"/>
							<span class="input-group-addon">
								<i class="cursor fa fa-calendar bigger-110"></i>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer hide">
				<a class="btn btn-primary btn-xs applyAnalytics" onclick="applyAnalytics();"><fmt:message key="com_intalio_bpms_widget_filter_button_apply"/></a>
			</div>
		</div>
	</div>
</div>
<div class='hide'>
<input type="text" id="processesPageNo" value='1'/>
<span id="entriesPerPageProc"><fmt:message key="org_intalio_uifw_tables_entries_per_page"/></span>
<span id="selectProcess"><fmt:message key="com_intalio_bpms_console_processes_select_one_or_more_processes"/></span>
<span id="selectOnlyProcess"><fmt:message key="com_intalio_bpms_console_processes_select_only_process"/></span>
<span id="selectOneProcess"><fmt:message key="com_intalio_bpms_console_processes_select_one_process"/></span>
<span id="selectPackages"><fmt:message key="com_intalio_bpms_console_processes_select_one_or_more_packages"/></span>
<span id="selectOnlyOneProcess"><fmt:message key="com_intalio_bpms_console_processes_select_only_one_process"/></span>
<span id="selectOnlyPackages"><fmt:message key="com_intalio_bpms_console_processes_select_only_packages"/></span>
<span id="retiredProcess"><fmt:message key="com_intalio_bpms_console_processes_cannot_initiate_retired_process"/></span>
<span id="filterNameFmt"><fmt:message key="administration_monitoring_instances_table_button_Filter"/></span>
<span id="chooseFile"><fmt:message key="administration_monitoring_processes_choose_file"/></span>
<span id="selectFilter"><fmt:message key="administration_monitoring_processes_select_filter"/></span>
<span id="enterFilterName"><fmt:message key="administration_monitoring_processes_enter_filter_name"/></span>
<span id="enterLifeCycle"><fmt:message key="administration_monitoring_processes_enter_life_cycle"/></span>
<span id="processFilterButton"><fmt:message key="administration_monitoring_filter"/></span>
<span id="processSortButton"><fmt:message key="administration_monitoring_sort"/></span>
<span id="processFilterNameExist"><fmt:message key="administration_monitoring_filter_name_already_exist"/></span>
<span id="specialCharacterOnly"><fmt:message key="administration_monitoring_special_character_only"/></span>
<span id="underscoreOnly"><fmt:message key="administration_monitoring_underscore_only"/></span>
<span id="deployedDate"><fmt:message key="administration_monitoring_package_deployed_date"/></span>
<span id="deployedBy"><fmt:message key="administration_monitoring_package_deployed_by"/></span>
<span id="processFilterCreateBtn"><fmt:message key="administration_monitoring_filter_create"/></span>
<span id="processFilterUpdateBtn"><fmt:message key="administration_monitoring_filter_update"/></span>
<span id="downloadResourceFileBtn"><fmt:message key="administration_monitoring_processes_download"/></span>
<span id="selectResourceFile"><fmt:message key="administration_monitoring_processes_select_resource_file"/></span>
<span id="fetchProcesses"><fmt:message key="administration_monitoring_processes_fetch_processes"/></span>
<span id="noProcessFound"><fmt:message key="administration_monitoring_processes_no_process_found"/></span>
<span id="noServiceFound"><fmt:message key="administration_monitoring_processes_no_service_found"/></span>
<span id="processDetails"><fmt:message key="administration_monitoring_processes_process_details"/></span>
<span id="undeployConfirmation"><fmt:message key="administration_monitoring_processes_confirmation_for_undeploy_package"/></span>
<span id="chooseOnlyZip"><fmt:message key="administration_monitoring_processes_choose_only_zip_file"/></span>
<span id="startTimerExpression"><fmt:message key="administration_monitoring_processes_start_timer_exp"/></span>
<span id="errorTimeDuration"><fmt:message key="administration_monitoring_processes_start_time_error_time_duration"/></span>
<span id="processStartTimer"><fmt:message key="administration_monitoring_processes_processDetails_tab_processStartTimer"/></span>
<span id="extensionSeconds"><fmt:message key="administration_monitoring_processes_start_timer_time_seconds"/></span>
<span id="extensionMinutes"><fmt:message key="administration_monitoring_processes_start_timer_time_minutes"/></span>
<span id="extensionHours"><fmt:message key="administration_monitoring_processes_start_timer_time_hours"/></span>
<span id="extensionDays"><fmt:message key="administration_monitoring_processes_start_timer_time_days"/></span>
<span id="extensionMonths"><fmt:message key="administration_monitoring_processes_start_timer_time_months"/></span>
<span id="extensionYears"><fmt:message key="administration_monitoring_processes_start_timer_time_years"/></span>
<span id="executionTime"><fmt:message key="administration_monitoring_processes_start_timer_execution_time"/></span>
<span id="oneTimeDateTime"><fmt:message key="administration_monitoring_processes_start_timer_one_time"/></span>
<span id="oneTimeDelayDuration"><fmt:message key="administration_monitoring_processes_start_timer_dalay_duartion"/></span>
<span id="recurringCron"><fmt:message key="administration_monitoring_processes_start_timer_recurring"/></span>
<span id="cronManualEntry"><fmt:message key="administration_monitoring_processes_start_timer_manual_entry"/></span>
<span id="cronCloseManual"><fmt:message key="administration_monitoring_processes_start_timer_close_manual"/></span>
<span id="enterValidCron"><fmt:message key="administration_monitoring_processes_start_timer_valid_cron"/></span>
<span id="readOnlyBusinessRules"><fmt:message key="business_rules"/></span>
<span id="dataCStartTimerMsg"><fmt:message key="administration_monitoring_processes_start_timer_data_content_msg"/></span>
<span id="dataCActiveMsg"><fmt:message key="administration_monitoring_processes_active_life_cycle"/></span>
<span id="dataCRetireMsg"><fmt:message key="administration_monitoring_processes_retire_life_cycle"/></span>
<span id="atleastOneProcessMsg"><fmt:message key="administration_monitoring_instances_filter_atleast_one_process"/></span>
<span id="undeployProc"><fmt:message key="administration_monitoring_processes_undeploy"/></span>
<span id="processessMsg"><fmt:message key="administration_monitoring_processes_msg"/></span>
<span id="packagesMsg"><fmt:message key="administration_monitoring_packages_msg"/></span>
<span id="actInsSummaryMsg"><fmt:message key="administration_monitoring_processes_activity_ins_summary"/></span>
<span id="analyticsLimitMsg"><fmt:message key="administration_monitoring_processes_analytics_ins_limit"/></span>
<span id="anaRangeMsg"><fmt:message key="administration_monitoring_processes_analytics_range_msg"/></span>
<span id="anaDaysMsg"><fmt:message key="administration_monitoring_processes_analytics_days"/></span>
<span id="noReportMsg"><fmt:message key="administration_monitoring_processes_analytics_report_not_found"/></span>
<span id="modalClassMsg"><fmt:message key="administration_monitoring_processes_analytics_modal_class_msg"/></span>
<span id="delayMsg"><fmt:message key="administration_monitoring_processes_analytics_delay_msg"/></span>
<span id='insSummaryValidate'><fmt:message key='administration_monitoring_processes_ins_summary_validation'/></span>
<span id='insSummaryGenerated'><fmt:message key='administration_monitoring_processes_ins_summary_generated_message'/></span>
<span id="noInstanceMsg"><fmt:message key='administration_monitoring_processes_ins_summary_no_instances_msg'/></span>
<span id="startTimerValidate"><fmt:message key='administration_monitoring_processes_start_timer_validation'/></span>
</div>
</body>
<script src="scripts/plugin/jquery.form.js"></script>
<script src="scripts/custom/administration/monitoring/processes.js?version=2676"></script>
</html>	
