 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="scripts/custom/common/sidebar.js?version=2676"></script>
<link href="style/custom/sidebar.css?version=2676" rel="stylesheet"/>
</head>
<body>
	<div class="sidebar-hide pull-right hide">
		<a class="btn btn-success btn-xs" onclick="showHideSidebar();" style="font-size:20px;" title="Hide Menu">
			<i class="fa fa-angle-up"></i>
		</a>
	</div>
	<div id="sidebar" class="sidebar responsive">
		<ul class="nav nav-list">
			<li class="active hide" id="moduleID1"><a href='#' onclick="javascript:selectMenuAndChangepage(this,'dashboard','dashboard.htm');">
					<i class="menu-icon fa fa-dashboard"></i> <span class="menu-text"><fmt:message
								key="com_intalio_bpms_module_dashboard" /></span></a>
			</li>
			<li class="hide" id="moduleID2"><a class="dropdown-toggle iconCursor parent-menu"> <i
					class="menu-icon fa fa-user"></i> <span class="menu-text"><fmt:message key="com_intalio_bpms_module_workflow" /></span><b
					class="arrow fa fa-angle-down"></b></a>
				<b class="arrow"></b>
				<ul class="submenu">
					<li class="hide" id="moduleID3"><a href='#' onclick="javascript:selectMenuAndChangepage(this,'workflow','tasks.htm');"> 
					<i class="menu-icon fa fa-caret-right"></i>
						<fmt:message key="com_intalio_bpms_module_workflow_tasks" /></a></li>
					<li class="hide" id="moduleID4"><a href='#' onclick="javascript:selectMenuAndChangepage(this,'workflow','notifications.htm');"> 
					<i class="menu-icon fa fa-caret-right"></i>
						<fmt:message key="com_intalio_bpms_module_workflow_notifications" /></a></li>
					<li class="hide" id="moduleID5"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'processes','workflowProcesses.htm');"> <i class="menu-icon fa fa-caret-right"></i>
						<fmt:message key="com_intalio_bpms_module_workflow_processes" /></a></li>
				</ul>
			</li>
			<li class="active hide" id="moduleID73"><a href='#' onclick="javascript:selectMenuAndChangepage(this,'Modeler','modeler.htm');">
					<i class="fa fa-sitemap menu-icon"></i> <span class="menu-text">Modeler</span></a>
			</li>
			<li class="hide" id="moduleID6"><a href="" onclick="javascript:selectMenuAndChangepage(this,'collaboration','collab.htm');"> <i class="menu-icon fa fa-group"></i> <span class="menu-text">
			     <fmt:message key="com_intalio_bpms_module_collaboration" /></span></a></li>
			<li class="hide" id="moduleID7"><a class="dropdown-toggle iconCursor parent-menu"> <i
					class="menu-icon fa fa-bar-chart-o"></i> <span class="menu-text"><fmt:message key="com_intalio_bpms_module_bam" /></span><b
					class="arrow fa fa-angle-down"></b></a>
				<b class="arrow"></b>
				<ul class="submenu">
					<li class="hide" id="moduleID67"><a href='#' onclick="javascript:selectMenuAndChangepage(this,'reports','reports.htm');"> 
					<i class="menu-icon fa fa-caret-right"></i>
						<fmt:message key="com_intalio_bpms_module_bam_pre_defined_reports"/></a></li>
					<li class="hide" id="moduleID68"><a href='#' onclick="javascript:selectMenuAndChangepage(this,'adhoc','adhocReport.htm');"> 
					<i class="menu-icon fa fa-caret-right"></i>
						<fmt:message key="com_intalio_bpms_module_bam_adhoc_reports"/></a></li>
				</ul>
			</li>
			<li class="hide" id="moduleID69"><a href="" onclick="javascript:selectMenuAndChangepage(this,'Business Rules','businessRules.htm');"> <i class="menu-icon fa fa-list-alt"></i> <span class="menu-text">
			     <fmt:message key="com_intalio_bpms_dashboard_business_rules" /></span></a></li>
			<li class="hide" id="moduleID39"><a id="vacationsMenuTabID" href="#" onclick="javascript:selectMenuAndChangepage(this,'vacations','vacations.htm');"> <i class="menu-icon fa fa-calendar"></i>
				<span class="menu-text" ><fmt:message key="com_intalio_bpms_module_vacations" /></span></a></li>
			<li class="hide" id="moduleID8"><a class="dropdown-toggle iconCursor parent-menu"> <i
					class="menu-icon fa fa-code-fork"></i> <span class="menu-text"><fmt:message key="com_intalio_bpms_module_administration"/></span><b
					class="arrow fa fa-angle-down"></b></a>
					<b class="arrow"></b>
					<ul class="submenu">
						<li class="hide" id="moduleID9"><a class="dropdown-toggle iconCursor parent-menu"><i class="menu-icon fa fa-caret-right"></i> <span class="menu-text"><fmt:message key="com_intalio_bpms_module_administration_monitoring"/></span>
							<b class="arrow fa fa-angle-down"></b></a>
							<b class="arrow"></b>
							<ul class="submenu">
								<li class="hide" id="moduleID10"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'processes','monitoringProcesses.htm');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_monitoring_processes"/>
								</a></li>
								<li class="hide" id="moduleID11"><a id="instancesMenuTabID" href="#" onclick="javascript:selectMenuAndChangepage(this,'instances','monitoringInstances.htm');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_monitoring_instances"/>
								</a></li>
							</ul>
						</li>
						<li class="hide" id="moduleID12"><a class="dropdown-toggle iconCursor parent-menu"><i class="menu-icon fa fa-caret-right"></i> <span class="menu-text"><fmt:message key="com_intalio_bpms_module_administration_auditing"/></span>
							<b class="arrow fa fa-angle-down"></b></a>
							<b class="arrow"></b>
							<ul class="submenu">
								<li class="hide" id="moduleID14"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'workflowAudit','workflowAuditLog.htm');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_auditing_workflow"/>
								</a></li>
								<li class="hide" id="moduleID13"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'instancesAudit','instancesAuditLog.htm');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_auditing_instances"/>
								</a></li>
								<li class="hide" id="moduleID72"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'breAudit','breAudit.htm');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="business_rules"/>
								</a></li>
							</ul>
						</li>
						<li class="hide" id="moduleID64"><a class="dropdown-toggle iconCursor parent-menu"><i class="menu-icon fa fa-caret-right"></i> <span class="menu-text"><fmt:message key="com_intalio_bpms_module_administration_org_mapping"/></span>
								<b class="arrow fa fa-angle-down"></b></a>
								<b class="arrow"></b>
								<ul class="submenu">
									<li class="hide" id="moduleID65"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'roles','orgMappingRoles.htm');"> <i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_access_control_roles"/>
									</a></li>
									<li class="hide" id="moduleID66"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'users','orgMappingUsers.htm');"> <i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_access_control_users"/>
									</a>
									</li>
								</ul>
						</li>
						<li class="hide" id="moduleID15"><a class="dropdown-toggle iconCursor parent-menu"><i class="menu-icon fa fa-caret-right"></i> <span class="menu-text"><fmt:message key="com_intalio_bpms_module_administration_access_control"/></span>
							<b class="arrow fa fa-angle-down"></b></a>
							<b class="arrow"></b>
							<ul class="submenu">
								<li class="hide" id="moduleID16"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'roles','roles.htm');"> <i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_access_control_roles"/>
									</a></li>
								<li class="hide" id="moduleID17"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'users','monitoringUsers.htm');"> <i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_access_control_users"/>
									</a></li>
								<li class="hide" id="moduleID18"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'moduleaccess','moduleAccess.htm');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_access_control_modules"/>
								</a></li>
							</ul>
						</li>
						<li class="hide" id="moduleID19"><a class="dropdown-toggle iconCursor parent-menu"><i class="menu-icon fa fa-caret-right"></i> <span class="menu-text"><fmt:message key="com_intalio_bpms_module_administration_logging"/></span>
							<b class="arrow fa fa-angle-down"></b></a>
						<b class="arrow"></b>
						<ul class="submenu">
								<li class="hide" id="moduleID20"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'configureLogFile','log4j.htm');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_logging_log4j"/>
									</a></li>
								<li class="hide" id="moduleID21"><a href="#" onclick="javascript:openMarkerModel();"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_logging_marker"/>
									</a></li>
								<li class="hide" id="moduleID22"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'logFile','logFile.htm');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_logging_download_logFile"/>
									</a></li>
							</ul>
						</li>
						<li class="hide" id="moduleID23"><a class="dropdown-toggle iconCursor parent-menu"><i class="menu-icon fa fa-caret-right"></i> <span class="menu-text"><fmt:message key="com_intalio_bpms_module_administration_utilities"/></span>
							<b class="arrow fa fa-angle-down"></b></a>
							<b class="arrow"></b>
							<ul class="submenu">
								<li class="hide" id="moduleID24"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'configFile','configFile.htm');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_utilities_download_config_file"/>
									</a></li>
								<li class="hide" id="moduleID25"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'manageTimers','manageTimers.htm');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_utilities_manage_timers"/>
									</a></li>
								<li class="hide" id="moduleID26"><a  href="#" onclick="modalShow('clearTMSCache');"><i class="menu-icon fa fa-caret-right"></i> <fmt:message key="com_intalio_bpms_module_administration_utilities_clear_tms_cache"/>
									</a></li>
							</ul>
						</li>
						<li class="hide" id="moduleID71"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'Product Info','productInfo.htm');"> <i class="menu-icon fa fa-caret-right"></i> <span class="menu-text">
							<fmt:message key="product_info" /></span></a></li>
					</ul>
				</li>
		</ul>
		<div id="sidebar-collapse" class="sidebar-toggle sidebar-collapse hide" onclick='upadteSidebarCollapsed()'>
			<i class="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right" data-icon1="ace-icon fa fa-angle-double-left"></i>
		</div>
</div>
</body>
</html>
