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
<link class="include" rel="stylesheet" type="text/css"
	href="style/custom/dashboard/dashboardui.css?version=2676">
</head>
<body>
	<!-- This div is used for showing breadcrumbs-->
	<div id="breadcrumbs" class="breadcrumbs">
		<ul class="breadcrumb">
			<li class="active"><i class="fa fa-dashboard"></i><a href="#" class="noDecoration" onclick="javascript:selectMenuAndChangepage(this,'dashboard','dashboard.htm');">&nbsp;<fmt:message key='com_intalio_bpms_module_dashboard'/></a></li>
		</ul>
	</div>
	<!-- This div is main div for dashboard page -->
	<div id="page-content" class="page-content clearfix">
		<div class="row-fluid">
		<!-- This div is modal a window contains html elements for adding a tab-->
			<div id="addTabModal" class="modal fade" tabindex="-1"
				role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
							<span class="modal_heading"><fmt:message key="com_intalio_bpms_add_tab_modal_heading"/></span>
						</div>
						<div class="modal-body">
						<span id="createTabErrMsg"class="text-danger hide pull-right"></span>
						<form>
							<fieldset>
								<input type="text" name="tab_title" id="tab_title" placeholder="Tab Title" maxlength="25"/>
							</fieldset>
						</form>
						</div>
						<div class="modal-footer">
							<button id="addTabButton" aria-hidden="true" class="btn btn-primary btn-sm" type="button">
								<fmt:message key="com_intalio_bpms_add_tab_button"/>
							</button>
						</div>
					</div>
				</div>	
			</div>
		<!-- This div is modal a window contains html elements for removing a tab-->
			<div id="renameTabModal" class="modal fade" tabindex="-1"
				role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
							<span class="modal_heading"><fmt:message key="com_intalio_bpms_rename_tab_modal_heading"/></span>
						</div>
						<div class="modal-body">
						<span id="renameTabErrMsg"class="text-danger hide pull-right"></span>
						<form>
							<fieldset>
								<input type="text" name="rename_tab_title" id="rename_tab_title" maxlength="25"/>
							</fieldset>
						</form>
						</div>
						<div class="modal-footer">
							<button id="renameTabButton" onclick="javascript:updateTabName();" aria-hidden="true" class="btn btn-primary btn-sm" type="button">
								<fmt:message key="com_intalio_bpms_rename_tab_button"/>
							</button>
						</div>
					</div>
				</div>	
			</div>
		<!-- This div contains all the tabs-->
			<div id="tabs" class="tabbable">
				<ul id="tablist" class="nav nav-tabs">
					<button class="addtab btn btn-small ace-popover"
						data-trigger="hover" data-placement="right"
						data-content= "<fmt:message key='com_intalio_bpms_dashboard_add_tab'/>">
						<i class="fa fa-plus-circle bigger-110 fa-only"></i>
					</button>
				</ul>
			</div>
		<!-- This div act's as a template for widget-->
			<div id="templates"></div>

		<!-- This div is modal a window contains tabs with different widgets in it-->
		<div id="addwidgetdialog" class="modal fade" tabindex="-1"
				role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
							<span class="modal_heading" id="modalLabel"><fmt:message key="com_intalio_bpms_widgets_dialog_heading"/></span>
						</div>
						<div class="modal-body">
							<ul class="nav nav-tabs"></ul>
							<div class="panel-body">
								<ol class="widgets" id="category-all"></ol>
							</div>
						</div>
					</div>
				</div>
		</div>
		</div>
	</div><!-- end of page-content-->

	<!-- This div is used to remove tab-->
	<div id="removeTabModal" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<span class="modal_heading"><fmt:message key='com_intalio_bpms_sure_to_delete_tab_title'/></span>
			</div>
			<div class="modal-body">
				<div>
					<label><fmt:message key='com_intalio_bpms_sure_to_delete_tab'/></label>
				</div>
			</div>
			<div class="modal-footer">
				<button onclick="javascript:removeSelectedTab();" class="btn btn-sm btn-danger" data-dismiss="modal" type="button" aria-hidden="true"><fmt:message key='org_intalio_common_confirm'/></button>
			</div>
			</div>
		</div>
	</div>

	<!-- This div is used give a name to a widget & this is a modal window-->
	<div id="provideWidgetName" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<span class="modal_heading"><fmt:message key="com_intalio_bpms_dashboard_widget_name"/></span>
				</div>
				<div class="modal-body">
					<div>
						<span id="widgetNameErrorMsg" class="text-danger hide pull-right"></span>
						<input type="text" name="widgetName" id="widgetName" placeholder="Widget Name" maxlength="50" size="40"/>
					</div>
				</div>
				<div class="modal-footer">
					<button id='newWidgetName'class="btn btn-primary btn-sm" type="button" aria-hidden="true"><fmt:message key='com_intalio_bpms_add_tab_button'/></button>
				</div>
			</div>
		</div>
	</div>

	<div class='hide'>
		"<div class='reportsPagination col-sm-3'><label><fmt:message key='org_intalio_uifw_tables_entries_per_page'/></label><select id='totalReports' onchange=javscript:updateTotalReports(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></div>"
		"<table id='reportsPaginationTable' cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' title='First page' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getLastFirstPageData('first');></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' title='Previous page' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getNextPrevPageData('prev');></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'>Page &nbsp;<input id='pageNo' type='text' role='textbox' onkeydown=javascript:getPageNoData(event); maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; of &nbsp;<span id='sp_1_grid-pager' class='totalPageNo'></span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' title='Next page' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPrevPageData('next');></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' title='Last page'class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastFirstPageData('last');></span></td></tr></tbody></table>"
	</div>

	<div class="hide">
		<table id="adhocReports" class="table table-striped table-bordered table-hover">
			<thead>
				<tr id="widgetsListHeader">
					<th><fmt:message key="bam_adhoc_reports_listing_header_name"/></th>
					<th><fmt:message key="bam_adhoc_reports_listing_header_desc"/></th>
					<th><fmt:message key="bam_adhoc_reports_listing_header_owner"/></th>
					<th><fmt:message key="com_intalio_bpms_widget_adhoc_action"/></th>
				</tr>
			</thead>
			<tbody >
			</tbody>
		</table>
	</div>

    <script type="text/javascript" src="scripts/plugin/dashboard/jquery.dashboard.min.js"></script>
	<script type="text/javascript" src="scripts/plugin/dashboard/FusionCharts.js"></script>
	<script type="text/javascript" src="scripts/custom/dashboard/dashboard.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/dashboard/adhocWidgets.js"></script>
	<script type="text/javascript" src="scripts/plugin/BAM/jquery.datatables.grouping.js"></script>
	
	<!-- This div contains all the meesages used in dashboard page gets from properties file -->
	<div class="hide">
		<span id="emptyTabTitle"><fmt:message key="com_intalio_bpms_empty_tab_title"/></span>
		<span id="tabNameExists"><fmt:message key="com_intalio_bpms_tab_name_already_exists"/></span>
		<span id="deleteTabConfirmMessage"><fmt:message key="com_intalio_bpms_sure_to_delete_tab"/></span>
		<span id="errorMessageOnSavingState"><fmt:message key="com_intalio_bpms_unable_to_save_dashboard_state"/></span>
		<span id="chartNotAccessibleMessage"><fmt:message key="com_intalio_bpms_chart_not_accessible"/></span>
		<span id="dashboardSaveMessage"><fmt:message key="com_intalio_bpms_dashboard_save_message"/></span>
		<span id="warningDialogTitle"><fmt:message key="com_intalio_bpms_warning_headind"/></span>
		<span id="emptyWidgetNameMsg"><fmt:message key="com_intalio_bpms_widget_name_dialog_error_msg"/></span>
		<span id="addButton"><fmt:message key="com_intalio_bpms_add_tab_button"/></span>
		<span id="addTab"><fmt:message key="com_intalio_bpms_dashboard_add_widget"/></span>
		<span id="renameTab"><fmt:message key="com_intalio_bpms_rename_tab_modal_heading"/></span>
		<span id="removeTab"><fmt:message key="com_intalio_bpms_remove_tab_modal_heading"/></span>
		<span id="noWidgetsMsg"><fmt:message key="com_intalio_bpms_dashboard_no_widgets"/></span>
		<span id="chartModified"><fmt:message key="com_intalio_bpms_dashboard_chart_modified"/></span>
		<span id="chartModifiedRoles"><fmt:message key="com_intalio_bpms_dashboard_chart_modified_roles"/></span>
		<span id="dashboardSaveMsg"><fmt:message key="com_intalio_bpms_dashboard_save_msg"/></span>
		
	</div>

	</body>
</html>
