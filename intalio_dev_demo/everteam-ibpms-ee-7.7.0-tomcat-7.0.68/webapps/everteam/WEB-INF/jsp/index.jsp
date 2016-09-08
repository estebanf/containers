 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
 
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
<link rel="shortcut icon" href="/everteam/ET_icon.ico" type="image/x-icon"/>
<meta http-equiv="X-UA-Compatible" content="IE=10"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Everteam.iBPMS</title>

<meta name="description" content="overview &amp; stats" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!--basic styles-->

<link href="style/plugin/bootstrap.min.css" rel="stylesheet" />
<link href="style/plugin/font-awesome.min.css" rel="stylesheet" />


<!--[if IE 7]>
		  <link rel="stylesheet" href="style/plugin/font-awesome-ie7.min.css" />
		<![endif]-->

<!--page specific plugin styles-->

<!--fonts-->
<link href="style/plugin/google-fonts.css" rel="stylesheet" />


<!--ace styles-->

<link rel="stylesheet" href="style/plugin/ace.min.css" />
<link rel="stylesheet" href="style/plugin/ace-skins.min.css" />

<link rel="stylesheet" href="style/plugin/ace-part2.min.css" />
<link rel="stylesheet" href="style/plugin/ace-rtl.min.css" />
<link rel="stylesheet" href="style/plugin/ace-ie.min.css" />

<link rel="stylesheet" href="style/plugin/chosen.css" />
<link href="style/plugin/selectize.css" rel="stylesheet">
<link rel="stylesheet" href="style/plugin/common/perfect-scrollbar.min.css" />
<script type="text/javascript">
	var is_ie8 = false;
</script>
<!--[if IE 8]>
		<script type="text/javascript">
			is_ie8 = true
		</script>
<![endif]-->
<!--[if lte IE 9]>
		  <link rel="stylesheet" href="style/plugin/ace-ie.min.css" />
		<![endif]-->
<!--[if IE 8]>
		<script src="scripts/plugin/html5shiv.min.js"></script>
		<script src="scripts/plugin/respond.min.js"></script>
		<script src="scripts/plugin/es5-shim.min.js"></script>
<![endif]-->

<!--inline styles if any-->
<!--date picker-->
<link rel="stylesheet" href="style/plugin/daterangepicker.css" />
<link rel="stylesheet" href="style/plugin/bootstrap-timepicker.css" />
<link rel="stylesheet" href="style/plugin/datepicker.css" />
<link href="style/custom/workflow/bootstrap-datetimepicker.css" rel="stylesheet"/>
<link rel="stylesheet" href="style/custom/common.css?version=2676" />
<link rel="stylesheet" href="style/custom/media.css?version=2676" />
<!--[if IE]>
		<link href="style/custom/common-ie.css?version=2676" rel="stylesheet" />
<![endif]-->
<script type="text/javascript" src="scripts/plugin/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="scripts/custom/common/common.js?version=2676"></script>
<script type="text/javascript" src="scripts/custom/common/ajax.js?version=2676"></script>
<script type="text/javascript" src="scripts/custom/common/url.js?version=2676"></script>
<script type="text/javascript" src="scripts/plugin/jstorage.js"></script>
<script type="text/javascript" src="scripts/custom/common/userCache.js?version=2676"></script>
<script type="text/javascript" src="scripts/plugin/workflow/moment.min.js"></script>
<script type="text/javascript" src="scripts/plugin/workflow/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="scripts/plugin/jquery-timer.js"></script>
<script type="text/javascript" src="scripts/custom/workflow/workflow.js?version=2676"></script>
<script type="text/javascript" src="scripts/plugin/jquery.form.js"></script>
<script type="text/javascript" src="scripts/plugin/chosen.jquery.min.js"></script>
<script type="text/javascript" src="scripts/custom/common/version.js?version=2676"></script>
<script type="text/javascript" src="scripts/plugin/common/perfect-scrollbar.with-mousewheel.min.js"></script>
<script type="text/javascript" src="scripts/plugin/common/perfect-scrollbar.min.js"></script>
<style>
@font-face {
font-family: "SegoeUI";
	src: url('style/custom/fonts/segoeui.ttf') format("truetype");
}
</style>
</head>

<body style="font-family:SegoeUI;">
	<input type='text' id="textFocus" style="opacity: 0; height: 0px; padding: 0px; width: 0px; display: block; border: 0px solid;" />
		<%@ include file="header.jsp"%>
		<div id="main-container" class="main-container container-fluid">
			<%@ include file="sidebar.jsp"%>
			<div id="main-content" class=" main-content clearfix"></div>
		</div>
		<input type="hidden" name="accessible" id="accessible" />
			<div id="information-dialog" class="modal fade">
				<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
						</button>
						<span class="modal_heading"><fmt:message key="org_intalio_uifw_modalDialog_information_title"/></span>
					</div>
					<div class="modal-body">
						<p class="information"></p>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary btn-sm"  type="button" data-dismiss="modal" aria-hidden="true"><fmt:message key="org_intalio_common_ok"/></button>
					</div>
				</div>
			</div>
		</div>
		<!--[if IE]>
			<script type="text/javascript" src="scripts/plugin/jquery-1.10.2.min.js"></script>
		<![endif]-->
		
		<script type="text/javascript">
			if("ontouchend" in document) document.write("<script src='scripts/plugin/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="scripts/plugin/bootstrap.min.js"></script>
		<!--page specific plugin scripts-->
		<!--[if lte IE 8]>
		  <script src="scripts/plugin/excanvas.min.js"></script>
		<![endif]-->
		
		<script src="scripts/plugin/jquery.dataTables.min.js"></script>
		<script src="scripts/plugin/jquery.dataTables.bootstrap.js"></script>
		<script src="scripts/plugin/dataTables.htmlColumnFilter.js"></script>
		<script src="scripts/plugin/bootbox.min.js"></script>
		<script src="scripts/plugin/jquery-migrate-1.2.1.min.js"></script>

		<script type="text/javascript" src="scripts/plugin/jquery-ui-1.9.2.min.js"></script>

		<!--ace scripts-->
        <script src="scripts/plugin/ace-extra.min.js"></script>
		<script src="scripts/plugin/ace-elements.min.js"></script>
		<script src="scripts/plugin/ace.min.js"></script>

		<script src="scripts/plugin/jquery-dateFormat.js"></script>
		<script type="text/javascript" src="scripts/plugin/bootstrap-datepicker.min.js"></script>
		<script type="text/javascript" src="scripts/plugin/bootstrap-timepicker.min.js"></script>
		<script type="text/javascript" src="scripts/plugin/daterangepicker.min.js"></script>
		<script type="text/javascript" src="scripts/plugin/selectize.min.js"></script>
		<script type="text/javascript">
			$(function() {
				applyNiceScroll($('.dialogs,.comments,.widget'),350);
			});
		</script>
	<div id="clearTMSCache" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="com_intalio_bpms_module_clearTMS_title"/></span>
				</div>
				<div class="modal-body">
				<p class=""><fmt:message key="com_intalio_bpms_module_clearTMS_message"/></p>
				</div>
				<div class="modal-footer">
					<button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="clearTMSCache();"><fmt:message key='org_intalio_common_confirm'/></button>
				</div>
			</div>
		</div>
	</div>
	<div id="marker" class="modal fade" tabindex="-1">
		<div id="markerModal" class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<span class="modal_heading"><fmt:message key='utilities_add_marker_in_log_file'/></span>
				</div>
				<div class="modal-body">
					<span id="emptyMarkerText" class="text-danger pull-right"></span>
					<div>
						<label for="markerText"><fmt:message key='utilities_marker_comment'/></label>
						<textarea id="markerText" class="form-control"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button id="markerButton" onclick="javascript:addMarker();" class="btn btn-sm btn-primary" type="button" aria-hidden="true"><fmt:message key='utilities_save_marker'/></button>
				</div>
			</div>
		</div>
	</div>
	
	<div id='sessionExpired' class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" onclick='javascript:submitActionToURL("login.htm", "logOut");' aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="org_intalio_common_session_expired"/></span>
				</div>
				<div class="modal-body">
				<p class=""><fmt:message key="org_intalio_common_your_session_expired"/></p>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick='javascript:submitActionToURL("login.htm", "logOut");'><fmt:message key='org_intalio_common_relogin'/></button>
				</div>
			</div>
		</div>
	</div>
	<div id='deleteModal' class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-hidden="true" data-dismiss="modal">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">

				</div>
				<div class="modal-footer">
					<button class="btn btn-danger btn-sm modalDeleteConfirm"  type="button" data-dismiss="modal" aria-hidden="true"><fmt:message key="org_intalio_common_confirm"/></button>
				</div>
			</div>
		</div>
	</div>
	<div id="notificationMessage">
	</div>
	<div id="notificationErrorMessage">
	</div>
	<div id='userProfileModal' class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-hidden="true" data-dismiss="modal">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<span class='pull-right hide'><select style='width:300px;' id='otherUserProfile' onchange='javascript:getUserprofileData(this.value)' placeholder='Other User Profile' ></select>
					</span>
					<h4 class="header smaller grey">
						<fmt:message key="org_intalio_profile_header"/>
					</h4>
					<div class="user-profile row">
						<div class="col-xs-12 col-sm-2 center">
							<div class="profile-pic">
								<span class="profile-picture">
									<img id="otavatar" alt="" width='100'/>
								</span>
							</div>
					</div>
					<div class="col-xs-12 col-sm-9 otProfile">
					<div class="">
					<div class="col-xs-12 col-sm-6">
						<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_name"/> </div>

						<div class="profile-info-value">
						<span class="" id="otuserDisplayName"></span>
						</div>
						</div>
						<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_user_name"/></div>

						<div class="profile-info-value">
						<span class="" id="otuserId"></span>
						</div>
						</div>
						<div class="profile-info-row">
							<div class="profile-info-name"> <fmt:message key="user_preferences_gender"/></div>
							<div class="profile-info-value">
								<span id="otgender"></span>
							</div>
						</div>
					</div>	
					<div class="col-xs-12 col-sm-6">
					<div class="profile-info-row">
					<div class="profile-info-name"> <fmt:message key="user_preferences_dob"/> </div>
					<div class="profile-info-value">
						<span id="otdob" ></span>
					</div>
					</div>
					<div class="profile-info-row">
					<div class="profile-info-name"> <fmt:message key="user_preferences_skill_set"/> </div>
					<div class="profile-info-value">
					<span id="otskills"></span>
					</div>
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_manager"/> </div>

						<div class="profile-info-value">
							<span class="" id="otmanager"></span>
						</div>
					</div>
					</div>
					</div>
				</div>
			</div>
				<h4 class="header smaller grey contactInfo" href="#otContactInfoDiv" data-toggle="collapse" onclick="updateProfileIcon(this);">
				<fmt:message key="user_preferences_contact"/> &nbsp;&nbsp;&nbsp;<a class="noDecoration"><i class="fa fa-angle-down"></i></a>
				</h4>
				<div id="otContactInfoDiv" class="in">
				<div class="user-profile row">
				<div class="col-xs-12 col-sm-6">
				<div class="">
				<div class="profile-info-row">
				<div class="profile-info-name"> <fmt:message key="user_preferences_email"/></div>
				<div class="profile-info-value">
				<span id="otemail"></span>
				</div>
				</div>
				<div class="profile-info-row">
				<div class="profile-info-name"> <fmt:message key="user_preferences_email_secondary"/> </div>
				<div class="profile-info-value">
				<span id="otsecondaryEmail"></span>
				</div>
				</div>
				</div>
				</div>
				<div class="col-xs-12 col-sm-6">
				<div class="">
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_phone_no"/> </div>
						<div class="profile-info-value">
							<span id="otphone"></span>
						</div>
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_mobile_no"/> </div>
						<div class="profile-info-value">
						<span id="otmobile"></span>
						</div>
					</div>
				</div>
				</div>
				</div>
				<div class="additional_info_head" href="#otAddressInfo" data-toggle="collapse" onclick="updateProfileIcon(this);"><fmt:message key="user_preferences_address"/> &nbsp;&nbsp;&nbsp;<a  class="noDecoration"><i class="fa fa-angle-down"></i></a></div>
				<div id="otAddressInfo" class="in">
				<div class="user-profile row">
				<div class="col-xs-12 col-sm-6">
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_mailing_address"/> </div>
						<div class="profile-info-value">
						<span id="otaddress"></span>
						</div>
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name"><fmt:message key="user_preferences_address_street"/></div>
						<div class="profile-info-value">
							<span id="otstreet"></span>
						</div>
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_address_city"/> </div>
						<div class="profile-info-value">
						<span id="otcity"></span>
						</div>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6">
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_address_state"/> </div>
						<div class="profile-info-value">
							<span id="otstate"></span>
						</div>
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_address_postal_code"/> </div>
						<div class="profile-info-value">
							<span id="otzip"></span>
						</div>
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_address_country"/> </div>
						<div class="profile-info-value">
							<span id="otcountry"></span>
						</div>
					</div>
				</div>
				</div>
				</div>
				</div>
		</div>
		</div>
	</div>
	</div>

	<!-- This div is a template for formless task & notification -->
	<div class='hide' id='formLessTaskTemplate'>
		<div>
			<p>
				<button type='button' onclick='javascript:workflowMetaData.startProcess()' class='shared formlessInit btn btn-white btn-sm btnStartProcess'><i class='fa fa-play'></i>&nbsp;<span class='no-mobile'><fmt:message key="bpms_user_task_button_start"/></span>
				</button>
				<button type='button' onclick='javascript:workflowMetaData.dismissNotification()' class='formlessNotif shared btn btn-white btn-sm'><i class='fa fa fa-trash-o'></i>&nbsp;<span class='no-mobile'><fmt:message key="bpms_user_task_button_dismiss"/></span>
				</button>
				<button type='button' onclick='javascript:workflowMetaData.saveTask()' class='shared formlessInit formlessTask btn btn-white btn-sm btnSaveTask'><i class='fa fa-floppy-o'></i>&nbsp;<span class='no-mobile'> <fmt:message key="bpms_user_task_button_save"/></span>
				</button>
				<button type='button' onclick='javascript:workflowMetaData.completeTask()' class='shared formlessTask btn btn-white btn-sm btnCompleteTask'><i class='fa fa-check-circle'></i>&nbsp;<span class='no-mobile'> <fmt:message key="bpms_user_task_button_complete"/></span>
				</button>
				<button type='button' onclick='workflowMetaData.claimTask()' class='shared formlessTask btn btn-white btn-sm btnClaimTask'><i class='fa fa-lock'></i>&nbsp;<span class='no-mobile'> <fmt:message key="bpms_user_task_button_claim"/></span></button>
				<button type='button' onclick='workflowMetaData.revokeTask()' class='shared formlessTask btn btn-white btn-sm btnRevokeTask'><i class='fa fa fa-check'></i>&nbsp;<span class='no-mobile'> <fmt:message key="bpms_user_task_button_release"/></span> </button>
				<button type='button' onclick='javascript:workflowMetaData.getAttachments()' class='formlessInit formlessTask formlessNotif attachment btn btn-white btn-sm ajax'><i class="fa fa-paperclip"></i>&nbsp;<span class='no-mobile'> <fmt:message key="bpms_user_task_button_attachments"/></span> &nbsp;<span class="badge badge-info attachmentCount"></span> </button>
				<button type='button' onclick='javascript:workflowMetaData.openCommentsModal()' class='formlessTask btn btn-white btn-sm ajax'><i class="fa fa-comments"></i>&nbsp;<span class='no-mobile'> <fmt:message key="bpms_user_task_button_comments"/></span> &nbsp;<span class="badge badge-info commentCount"></span></button>
				<button type='button' onclick='javascript:workflowMetaData.getHistory()' class='formlessNotif formlessTask btn btn-white btn-sm ajax'><i class="fa fa-history"></i>&nbsp;<span class='no-mobile'> <fmt:message key="bpms_user_task_button_history"/></span> </button>
				<button type='button' onclick='javascript:workflowMetaData.getProcessInfo()' class='formlessTask ajax formlessNotif btn btn-white btn-sm'><i class="fa fa-info-circle"></i>&nbsp;<span class='no-mobile'> <fmt:message key="bpms_user_task_button_process_info"/></span></button>
				<button type='button' onclick='javascript:workflowMetaData.shareTask(false);' class='shared formlessTask ajax btn btn-white btn-sm'><i class="fa fa-share-alt"></i>&nbsp;<span class='no-mobile'> <fmt:message key="bpms_user_task_share_heading"/></span></button>
				<button id="newAdhocTaskButton" type='button' onclick='javascript:workflowMetaData.openAdhocTaskDialog(false);' class='shared formlessTask ajax btn btn-white btn-sm'><i class="fa fa-bolt"></i>&nbsp;<span class='no-mobile'><fmt:message key="adhoc_task_new_task_button"/></span></button>
			</p>
		</div>
		<h3 id='taskDescription'></h3>
		<div class='taskNote col-sm-6'>
			<label for="taskNote"><fmt:message key="bpms_user_task_note_label"/></label>
			<textarea id="taskNote" class="autosize-transition form-control" style="overflow: hidden; word-wrap: break-word; resize: horizontal;"></textarea>
			<div class="space-18"></div>
		</div>
	</div>

	<!-- This div is a modal window for showing history of a task -->
	<div id="taskHistoryModal" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="taskHistoryModal" aria-hidden="true">
		<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<span class="modal_heading" id="taskAttachmentsHeader"> <fmt:message key="bpms_user_task_history_heading"/> </span>
		</div>
		<div class="modal-body">
			<div class='taskHistory'>
				<table class='table table-striped table-bordered table-hover'>
					<thead>
						<tr>
							<th><fmt:message key="bpms_user_task_history_task_name"/></th>
							<th><fmt:message key="bpms_user_task_history_task_completed_by"/></th>
							<th><fmt:message key="bpms_user_task_history_task_completed_on"/></th>
							<th class='hide'><fmt:message key="bpms_user_task_history_task_content"/></th>
							<th class="center"><fmt:message key="bpms_user_task_history_task_comments"/></th>
						</tr>
					</thead>
					<tbody id='taskHistory'>
					</tbody>
				</table>
			</div>
		</div>
		</div>
		</div>
	</div>

	 <!-- This div is a modal window for showing list of adhoc tasks -->
	<div id="adhocTaskListModal" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="adhocTaskListModal" aria-hidden="true">
		<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true" onClick="javascript:workflowMetaData.closeAdhocTasksList()">&times;</button>
			<span class="modal_heading" id="taskListHeader"> <fmt:message key="adhoc_task_list_modal_heading"/> </span>
		</div>
		<div class="modal-body">
			<div class='taskList'>
				<table class='table table-striped table-bordered table-hover'>
					<thead>
						<tr>
							<th><fmt:message key="adhoc_task_list_task_name"/></th>
							<th><fmt:message key="adhoc_task_list_task_created_date"/></th>
							<th><fmt:message key="adhoc_task_list_task_type"/></th>
							<th><fmt:message key="adhoc_task_list_form_type"/></th>
							<th><fmt:message key="adhoc_task_list_task_assignee"/></th>
						</tr>
					</thead>
					<tbody id='taskList'>
					</tbody>
				</table>
			</div>
		</div>
		</div>
		</div>
	</div>

	<!-- This div is a modal window for showing history of a task -->
	<div id="iframeTaskHistoryModal" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="iframeTaskHistoryModal" aria-hidden="true">
		<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" onclick='javascript:workflowMetaData.handleCloseHistory(this)'
				aria-hidden="true">&times;</button>
			<span class="modal_heading" id="iframeTaskHistoryHeader"> <fmt:message key="bpms_user_task_history_heading"/> </span>
		</div>
		<div class="modal-body">
			<iframe src="" name="historyTask" frameborder="0" id="historyTask" scrolling="auto" width="100%" height="100%"></iframe>
		</div>
		</div>
		</div>
	</div>

<!-- This div is modal window contains html elements for creating an Adhoc Task in workflow.-->

<div id="createAdhocTaskModal" class="modal fade" tabindex="-1"
	role="dialog" aria-labelledby="createAdhocTaskModal" aria-hidden="true">
<div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<span class="modal_heading" id="createAdhocTaskModalHeader"><fmt:message key="adhoc_task_modal_header"/></span>
		</div>
		<div class="modal-body">
			<div id="adhocSpanTask" class="text-danger"></div>
			<table id="taskFilterTable" class="table noLines" style="width:100%">
			<tbody>
				<tr>
					<td class="adhocLabel"><fmt:message key="adhoc_task_decription_label"/></td>
				<td>
					<input placeholder="Description" class="form-control"  maxlength='4000' id='adhocTaskDesc' style="width: 400px; " type="text"/>
				</td>
				</tr>
				<tr>
					<td class="adhocLabel"><fmt:message key="adhoc_task_assignto_label"/></td>
				<td>
					<select id="adhocAssignTo" data-placeholder="Choose Assign To" multiple="" ></select>
				</td>
				</tr>
				<tr>
					<td class="adhocLabel"><fmt:message key="adhoc_task_placement_label"/></td>
				<td>
					<select id="taskPlacement" name="taskPlacement" data-placeholder="Choose Task Placement" ></select>
				</td>
				</tr>
				<tr id="currentFormRow">
					<td class="adhocLabel" style="width:200px" ><fmt:message key="adhoc_task_currentfom_label"/></td>
				<td>
					<input id='useCurrentForm' name="useCurrentForm"  onclick='workflowMetaData.isAdhocFormless(this)' class="ace ace-switch ace-switch-5 btn-rotate" type="checkbox"/>
						<span class="lbl"></span>
				</td>
				</tr>
				<tr>
					<td class="adhocLabel"><fmt:message key="adhoc_task_note_label"/></td>
				<td>
					<textarea placeholder="Type your note here ..." class="form-control"  maxlength='4000' id='adhocTaskNote' style="width: 400px; height: 61px;;"></textarea>
				</td>
				</tr>
			</tbody>
			</table>
		</div>
		<div class="modal-footer">
	 		<button id="showAdhocTasksButton" onclick="javascript:workflowMetaData.getAdhocTaskList()" aria-hidden="true"
	 			class="btn btn-primary btn-sm hide" type="button"><fmt:message key="adhoc_task_show_list"/></button>
			<button onclick="createAdhocTask()" aria-hidden="true"
				class="btn btn-primary btn-sm" type="button"><fmt:message key="adhoc_task_create_button"/></button>
		</div>
	</div>
</div>
</div>
	<!-- This div is modal window contains html elements for uploading attachments in workflow.
	-->
	<div id="taskAttachmentsModal" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="taskAttachmentsModal" aria-hidden="true">
		<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<span class="modal_heading" id="taskAttachmentsHeader"> <fmt:message key="bpms_user_task_button_attachments"/> </span>
		</div>
		<div class="modal-body">
			<span class='nameError text-danger hide'></span>
			<div class='attachmentsTable'>
				<table class='table table-striped table-bordered table-hover'>
					<thead>
						<tr>
							<th><fmt:message key="bpms_user_task_attachment_name"/></th>
							<th><fmt:message key="bpms_user_task_attachment_date"/></th>
							<th><fmt:message key="org_intalio_uifw_modalDialog_description"/></th>
							<th><fmt:message key="bpms_user_task_attachment_global"/></th>
							<th class='center'><fmt:message key="bpms_user_task_attachment_action"/></th>
						</tr>
					</thead>
					<tbody id='taskAttachmentsList'>
					</tbody>
				</table>
			</div>
			<form id='taskAttachmentForm' method="POST" name='form' enctype="multipart/form-data">
				<input type="hidden" id='taskId' name="taskId"/>
				<input type="hidden" id='participantToken' name="participantToken"/>
				<div class="form-group">
					<div class="col-xs-8 fileAttachment">
						<input type="file" name='attachmentFile' id="attachmentFile" onchange='workflowMetaData.validateFile(this)'/>
					</div>
					<div>
						<label class='global'> <fmt:message key="bpms_user_task_attachment_global_label"/>
						</label>
						<label>
							<input id='globalAttachment' name="globalAttachment" onclick='workflowMetaData.setGlobalAttachment(this)' class="ace ace-switch ace-switch-5 btn-rotate" type="checkbox"/>
							<span class="lbl"></span>
						</label>
					</div>
				</div>
				<div class="form-group">
					<div class='col-xs-6 attachment hide'>
						<input size='30' maxlength='150' type="text" name='attachmentName' id="attachmentName" placeholder='Attachment Name'/>
					</div>
					<div class="form-group">
						<div class='col-xs-12'>
					  		<textarea placeholder="File description" class="form-control limited attachmentDescription" name="description" id="description" maxlength="200"></textarea>
							</div>
					</div>
					<div class='col-xs-6 globalAttachment'>
						
					</div>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<button type="button" onclick="javascript:workflowMetaData.checkTaskStatus('attachments');" aria-hidden="true"	class="btn btn-primary btn-xs"> <fmt:message key="org_intalio_common_upload"/> </button>
		</div>
		</div>
		</div>
	</div>

	<!-- This div is a modal window for showing comments of a task -->
	<div id="taskCommentsModal" class="modal fade" role="dialog" aria-labelledby="taskCommentsModal" aria-hidden="true">
		<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" onclick='javascript:workflowMetaData.handleCloseComments(this)' aria-hidden="true">&times;</button>
			<span class="modal_heading" id="taskCommentsHeader"> <fmt:message key="bpms_user_task_comments_heading"/> </span>
		</div>
		<div class="modal-body">
			<div class='widget-box transparent commentBox'>
				<div class='widget-body'>
						<span class='commentError text-danger hide'></span>
						<div class='widget-main padding-8'>
							<div id="taskComments" class="profile-feed">

																	
							</div>
							<form>
								<div class="form-actions">
								<div class="input-group">
									<textarea placeholder="Type your comment here ..." class="form-control"  maxlength='4000' id='taskComment'>
									</textarea>
								</div>
								<span class="input-group-btn commentBtn pull-right">
									<button class="btn btn-xs btn-primary" type="button" onclick='javascript:workflowMetaData.checkTaskStatus("comments")'>
										<i class="ace-icon fa fa-comment"></i>
										<fmt:message key="bpms_user_task_comment"/>
									</button>
								</span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>

	<!-- This div is a template for adding more comments-->
	<div class='hide' id='taskCommentTemplate'>
		<div class="profile-activity clearfix">
			<div>
				<img class="bpms_user_photo pull-left">
				<a class="noDecoration userName" href="#"></a>
				<span class="pull-right noDecoration commentTime"></span>
				<i class='ace-icon fa fa-clock-o pull-right commentTimeIcon'></i>
				<div class="time comment"></div>
			</div>
		</div>
	</div>

	<!-- This div is a main template for tasks-->
	<div id='taskDetailInfo' class='hide'>
		
	</div>

	<!-- This div is a modal window for showing process Info -->
	<div id="utProcessInfoModal" class="modal fade" role="dialog" aria-labelledby="utProcessInfoModal" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" data-dismiss="modal" class="close" aria-hidden="true">&times;</button>
					<span class="modal_heading"> <fmt:message key="bpms_user_task_button_process_info"/> </span>
				</div>
				<div class="modal-body">
					<div class="utProcessInfo col-sm-12">
  						<div>
							<div class="profile-info-row">
								<div class="profile-info-name"> <fmt:message key="utilities_manage_timers_table_header_process_name"/> </div>
								<div class="profile-info-value">
									<span id="utProcessName"></span>
								</div>
							</div>
							<div class="profile-info-row">
								<div class="profile-info-name"><fmt:message key="bpms_user_task_process_info_instance_started"/></div>
								<div class="profile-info-value">
									<span id="utInstanceStarted"></span>
								</div>
							</div>
							<div class="profile-info-row">
								<div class="profile-info-name"><fmt:message key="bpms_user_task_process_info_instance_diagram"/></div>
								<div class="profile-info-value">
									<span id="utInsDiagramLink"><a class='noDecoration' onclick="javascript:workflowMetaData.getProcessImage()" href="#">Click to view</a></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="utProcessImage" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<div id="utSvg_container" class="">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class='hide'>
		<span id="bcProcName"></span>
		<span id="bcProcId"></span>
		<span id="bcStatus"></span>
		<span id="activeVacationID"></span>
		<span id="auditWorkflowId"></span>
		<span id="auditInstaceId"></span>
		<span id="markerComment"><fmt:message key="com_intalio_bpms_module_administration_logging_marker_comment"/></span>
		<span id="clearTMSCacheSuccess"><fmt:message key="com_intalio_bpms_module_administration_utilities_tms_cache_cleared_successfully"/></span>
		<span id="licenseExpiryMsg"><fmt:message key="org_intalio_common_license_expiry"/></span>
		<span id="licenseExpiredMsg"><fmt:message key="org_intalio_common_license_expired"/></span>
		<span id="noLicenseFoundMsg"><fmt:message key="org_intalio_common_no_license_found"/></span>
		<span id="activeVacationMsg"><fmt:message key="org_intalio_common_active_vacation_msg"/></span>
		<span id="activeVacationMsg2"><fmt:message key="org_intalio_common_active_vacation_msg2"/></span>
		<span id="activeVacationActionMsg"><fmt:message key="org_intalio_common_active_vacation_action"/></span>
		<span id="commonErrorMsg"><fmt:message key="org_intalio_common_error_message"/></span>
		<span id="unauthorizedUser"><fmt:message key="com_intalio_bpms_module_unauthorized_user"/></span>
		<span id="othersTaskWorkflow"><fmt:message key="org_intalio_uifw_others_task_tooltip"/></span>
		<span id="ie8NotSupportSVG"><fmt:message key="org_intalio_ie8_not_support_svg"/></span>
	 	<span id="adhocTaskWorkflow"><fmt:message key="org_intalio_uifw_adhoc_task_tooltip"/></span>
	</div>
	<div class='hide'>
		<span id="widgetChartName"><fmt:message key="com_intalio_bpms_widget_chart_name"/></span>
		<span id="widgetPackages"><fmt:message key="com_intalio_bpms_widget_packages"/></span>
		<span id="widgetProcesses"><fmt:message key="com_intalio_bpms_widget_processes"/></span>
		<span id="widgetPackage"><fmt:message key="com_intalio_bpms_widget_package"/></span>
		<span id="widgetProcess"><fmt:message key="com_intalio_bpms_widget_process"/></span>
		<span id="widgetFromDate"><fmt:message key="com_intalio_bpms_widget_from"/></span>
		<span id="widgetToDate"><fmt:message key="com_intalio_bpms_widget_to"/></span>
		<span id="widgetChartType"><fmt:message key="com_intalio_bpms_widget_chartType"/></span>
		<span id="widgetAnalyticsIn"><fmt:message key="com_intalio_bpms_widget_analytics_in"/></span>
		<span id="widgetChartNameErrorMsg"><fmt:message key="com_intalio_bpms_widget_chartName_error_msg"/></span>
		<span id="widgetPackageErrorMsg"><fmt:message key="com_intalio_bpms_widget_packages_error_msg"/></span>
		<span id="widgetProcessErrorMsg"><fmt:message key="com_intalio_bpms_widget_processes_error_msg"/></span>
		<span id="widgetPkgErrorMsg"><fmt:message key="com_intalio_bpms_widget_package_error_msg"/></span>
		<span id="widgetProcesErrorMsg"><fmt:message key="com_intalio_bpms_widget_process_error_msg"/></span>
		<span id="widgetProcessFilterErrorMsg"><fmt:message key="com_intalio_bpms_widget_processes_error_msg_filter"/></span>
		<span id="widgetProcessMaxErrorMsg"><fmt:message key="com_intalio_bpms_widget_processes_max_error_msg"/></span>
		<span id="widgetWebSerivesMaxErrorMsg"><fmt:message key="com_intalio_bpms_widget_webservices_max_error_msg"/></span>
		<span id="widgetAjaxErrorMsg"><fmt:message key="com_intalio_bpms_widget_ajax_call_error"/></span>
		<span id="widgetFilterApply"><fmt:message key="com_intalio_bpms_widget_filter_button_apply"/></span>
		<span id="widgetFilterGroupBy"><fmt:message key="com_intalio_bpms_widget_groupBy"/></span>
		<span id="widgetFilterLimit"><fmt:message key="com_intalio_bpms_widget_limit"/></span>
		<span id="widgetFilterUsers"><fmt:message key="com_intalio_bpms_widget_users"/></span>
		<span id="widgetFilterRoles"><fmt:message key="com_intalio_bpms_widget_role"/></span>
		<span id="widgetUser"><fmt:message key="com_intalio_bpms_widget_user_error_msg"/></span>
		<span id="widgetWebServices"><fmt:message key="com_intalio_bpms_widget_webservices"/></span>
		<span id="widgetWebServicesErrorMsg"><fmt:message key="com_intalio_bpms_widget_webservices_error_msg_filter"/></span>
		<span id="widgetVacationUsr"><fmt:message key="com_intalio_bpms_widget_vacation_user"/></span>
		<span id="widgetVacationFrom"><fmt:message key="com_intalio_bpms_widget_vacation_from"/></span>
		<span id="widgetVacationTo"><fmt:message key="com_intalio_bpms_widget_vacation_to"/></span>
		<span id="widgetVacationSubstitute"><fmt:message key="com_intalio_bpms_widget_vacation_substitute"/></span>
		<span id="widgetVacationDescription"><fmt:message key="com_intalio_bpms_widget_vacation_description"/></span>
		<span id="widgetProcessFilterError"><fmt:message key="com_intalio_bpms_widget_process_error_msg_filter"/></span>
		<span id="businessRuleEditor"><fmt:message key="business_rule_editor" /></span>
		<span id="businessRuleViewer"><fmt:message key="business_rule_viewer" /></span>
		<span id="businessRuleEditorViewError"><fmt:message key="business_rules_decision_table_view_error" /></span>
		<span id="businessRuleEditorEditError"><fmt:message key="business_rules_decision_table_edit_error" /></span>
		<span id="datatablePageInfo"><fmt:message key="org_intalio_datatable_footer_info"/></span>
		<span id="datatablePage"><fmt:message key="org_intalio_datatable_pagination_page"/></span>
		<span id="datatableOf"><fmt:message key="org_intalio_datatable_pagination_of"/></span>
		<span id="dtSearchPlaceHolder"><fmt:message key="org_intalio_datatable_search_records"/></span>
		<span id="dtNoRecordsFound"><fmt:message key="org_intalio_no_records_found"/></span>
		<span id="enterToApply"><fmt:message key="org_intalio_common_enter_to_apply_search"/></span>
		<span id="ie8_adhoc_msg"><fmt:message key="org_intalio_ie8_drag_n_drop_not_supported"/></span>
		<span id="profileTitle"><fmt:message key="org_intalio_profile_header"/></span>
		<span id="widgetActiveProcess"><fmt:message key='com_intalio_bpms_widget_active_process'/></span>
		<span id='userTaskDismissed'><fmt:message key='bpms_user_task_notification_dismiss'/></span>
		<span id='userTaskStarted'><fmt:message key='bpms_user_task_process_started'/></span>
		<span id='userTaskRevoked'><fmt:message key='bpms_user_task_revoked'/></span>
		<span id='userTaskClaim'><fmt:message key='bpms_user_task_claimed'/></span>
		<span id='userTaskCompleted'><fmt:message key='bpms_user_task_completed'/></span>
		<span id='userTaskSaved'><fmt:message key='bpms_user_task_saved'/></span>
		<span id='uTAttachmentValidate'><fmt:message key='bpms_user_task_validate_attachment'/></span>
		<span id='uTCommentsMsg'><fmt:message key='bpms_user_task_comments_not_found'/></span>
		<span id='uTAttachmnetsMsg'><fmt:message key='bpms_user_task_attachments_not_found'/></span>
		<span id='uTHistoryMsg'><fmt:message key='bpms_user_task_history_not_found'/></span>
		<span id='utCommentMsg'><fmt:message key='bpms_user_task_comment_added'/></span>
		<span id='uTCommentValidate'><fmt:message key='bpms_user_task_comment_validate'/></span>
		<span id='uTRemoveAttachment'><fmt:message key='bpms_user_task_remove_attachment'/></span>
		<span id='uTAddAttachment'><fmt:message key='bpms_user_task_add_attachment'/></span>
		<span id='sizeValidation'><fmt:message key='bpms_user_task_validate_attachment_size'/></span>
		<span id='uTfileValidation'><fmt:message key='bpms_user_task_validate_attachment_extension'/></span>

		<span id='adhocDescError'><fmt:message key='adhoc_task_decription_error'/></span>
		<span id='adhocAssignToError'><fmt:message key='adhoc_task_assignto_error'/></span>
		<span id='adhocPlacementError'><fmt:message key='adhoc_task_placement_error'/></span>
		<span id='adhocNoteError'><fmt:message key='adhoc_task_note_error'/></span>
		<span id='adhocCreateSuccessNoti'><fmt:message key='adhoc_task_create_success_notification'/></span>
		<span id='adhocCreateErrorNoti'><fmt:message key='adhoc_task_create_error_notification'/></span>
		<span id='adhocTaskListMsg'><fmt:message key='adhoc_task_list_not_found'/></span>


	</div>
	<form id="dashform" style="display: inline;" method="POST"
		name="dashform">
		<input type="hidden" id="actionName" name="actionName"/>
	</form>
</body>
</html>
