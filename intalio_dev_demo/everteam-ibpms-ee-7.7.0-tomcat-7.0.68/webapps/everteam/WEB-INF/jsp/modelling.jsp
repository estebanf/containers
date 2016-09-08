 <!-- 
 * Copyright (C) 2016, Ever Team Software
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Ever Team Software or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 -->
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
<link rel="shortcut icon" href="/everteam/ET_icon.ico" type="image/x-icon"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Everteam.iBPMS</title>
<meta name="description" content="overview &amp; stats" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<link href="style/plugin/bootstrap.min.css" rel="stylesheet" />
<link href="style/plugin/font-awesome.min.css" rel="stylesheet" />
<link href="style/plugin/google-fonts.css" rel="stylesheet" />

<link rel="stylesheet" href="style/plugin/ace.min.css" />
<link rel="stylesheet" href="style/plugin/ace-skins.min.css" />
<link rel="stylesheet" href="style/plugin/ace-part2.min.css" />
<link rel="stylesheet" href="style/plugin/ace-ie.min.css" />
<link rel="stylesheet" href="style/plugin/bootstrap-editable.css" rel="stylesheet" />
<link rel="stylesheet" href="style/plugin/common/perfect-scrollbar.min.css" />
<link rel="stylesheet" href="style/custom/common.css?version=2676" />
<link href="style/custom/sidebar.css?version=2676" rel="stylesheet"/>	
<link rel="stylesheet" type="text/css" href="style/custom/modeler/modelling.css?version=2676">
<style>
@font-face {
	font-family: "SegoeUI";
	src: url('style/custom/fonts/segoeui.ttf') format("truetype");
}
</style>
<script type="text/javascript" src="scripts/custom/modeler/prototype-1.5.1.js"></script>
<script type="text/javascript" src="scripts/plugin/jquery-1.9.1.min.js"></script>
<script src="scripts/plugin/bootstrap.min.js"></script>
<script type="text/javascript" src="scripts/plugin/jquery-ui-1.9.2.min.js"></script>
<script src="scripts/plugin/ace-extra.min.js"></script>
<script src="scripts/plugin/ace-elements.min.js"></script>
<script src="scripts/plugin/ace.min.js"></script>
<script type="text/javascript" src="scripts/plugin/jquery.colorPicker.js"></script>
<script type="text/javascript">
	var $j = jQuery.noConflict();
</script>
</head>
<body class='no-skin'  style="font-family:SegoeUI;">
	<input type='text' id="textFocus" style="opacity: 0; height: 0px; padding: 0px; width: 0px; display: block; border: 0px solid;" />
		<div class="navbar navbar-default" id="navbar-top">
			<div class="navbar-inner">
				<div class="navbar-header pull-left">
					<a class="navbar-brand">
					<small>
					<img src="images/everteam.png"/>
					</small>
					</a>
					<a onclick="javascript:resetSidebar()" class="toggleMenu hide">
						<i class="fa fa-bars bigger-125 toggleMenuIcon"></i>
					</a>
				</div>
				<div role="navigation" class="navbar-buttons navbar-header pull-right">
					<ul class="nav ace-nav pull-right">
						<li>
							<img class="bpms_user_photo" src="ui-fw/user/avatar">
							<span id="userName"></span>
							<span class='hide' id="userId"></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="main-container" class="main-container container-fluid">
			<div class="sidebar-hide pull-right hide">
				<a class="btn btn-success btn-xs" onclick="showHideSidebar();" style="font-size:20px;" title="Hide Menu">
				<i class="fa fa-angle-up"></i>
				</a>
			</div>
			<div id="sidebar" class="sidebar responsive">
				<div id="accordion" class="accordion-style1 panel-group">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a aria-expanded="true" class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
									<i class="bigger-110 ace-icon fa fa-angle-down" data-icon-hide="ace-icon fa fa-angle-down" data-icon-show="ace-icon fa fa-angle-right"></i>
									&nbsp;<fmt:message key="web_modeler_accordion_palette"/>
								</a>
							</h4>
						</div>
						<div style="height: auto" aria-expanded="true" class="panel-collapse in" id="collapseOne">
							<div class="panel-body">
								<ul id='shape-repository' class="nav nav-list">
		        				</ul>
		        			</div>
		        		</div>
		        	</div>
		        	<div class="panel panel-default metadataPanel hide">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a aria-expanded="true" class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
									<i class="bigger-110 ace-icon fa fa-angle-right" data-icon-hide="ace-icon fa fa-angle-down" data-icon-show="ace-icon fa fa-angle-right"></i>
									&nbsp;<fmt:message key='web_modeler_diagram_settings_metadata_info'/> - 
									<span class='titleMetadata'></span>&nbsp;&nbsp;
									<span onmouseout='javascript:showInfo(this);' data-placement="bottom" data-content="Click enter to save" data-trigger="hover" class="cursorDefault ace-popup"><i class="fa fa-info-circle bigger-80"></i></span>
								</a>
							</h4>
						</div>
						<div style="height: auto" aria-expanded="false" class="panel-collapse collapse" id="collapseTwo">
							<div class="panel-body">
								<div class="profile-user-info profile-user-info-striped">
									
								</div>
							</div>
						</div>
					</div>
					<div class="panel panel-default commentsPanel hide">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a aria-expanded="false" class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
									<i class="bigger-110 ace-icon fa fa-angle-right" data-icon-hide="ace-icon fa fa-angle-down" data-icon-show="ace-icon fa fa-angle-right"></i>
									&nbsp;<fmt:message key='web_modeler_diagram_settings_comments_info'/>
									<span class='pull-right badge badge-info activityCommentCount'></span>
								</a>
							</h4>
						</div>
						<div style="height: 0px; display: none;" aria-expanded="false" class="panel-collapse collapse" id="collapseThree">
							<div class="panel-body">
								<div class="widget-body">
									<span class="modellercommentError text-danger hide"></span>
									<div class="widget-main padding-4">
										<div class="profile-feed ps-container" id="modellerComments" style="max-height: 141px; overflow: hidden; position: relative;"><span>
											<fmt:message key="bpms_user_task_comments_not_found"/>
										</span><div class="ps-scrollbar-x-rail" style="width: 440px; display: none; left: 0px; bottom: 3px;"><div class="ps-scrollbar-x" style="left: 0px; width: 0px;"></div></div><div class="ps-scrollbar-y-rail" style="top: 0px; height: 50px; display: none; right: 3px;"><div class="ps-scrollbar-y" style="top: 0px; height: 0px;"></div></div></div>
										
										<div class='modellerCommentDiv'>
											<textarea placeholder="Type your comment here..." class="form-control limited" id="modellerComment" maxlength="4000" autofocus=""></textarea>
											<button type="button" class="pull-right btn btn-xs btn-primary" onclick="javascript:postModellerComment();">
												<i class="ace-icon fa fa-comment"></i>
												<fmt:message key="collaboration.comments.comment"/>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="panel panel-default attachmentsPanel hide">
							<div class="panel-heading">
								<h4 class="panel-title">
									<a aria-expanded="false" class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour">
										<i class="bigger-110 ace-icon fa fa-angle-right" data-icon-hide="ace-icon fa fa-angle-down" data-icon-show="ace-icon fa fa-angle-right"></i>
										&nbsp;<fmt:message key='web_modeler_accordion_attachments'/>
										<span class='pull-right badge badge-info activityAttachmentCount'></span>
									</a>
								</h4>
							</div>
							<div style="height: 0px; display: none;" aria-expanded="false" class="panel-collapse collapse" id="collapseFour">
								<div class="panel-body">
									<div class="widget-body">
										<span class='attachmentsMsg hide'></span>
										<div class="profile-feed ps-container" id="modellerAttachments">
										</div>
										<form id='awAttachmentForm' method="POST" name='awAttachmentForm' enctype="multipart/form-data">
											<input type='hidden' name='activityId' id='activityId'/>
											<div class="form-group">
												<div class="col-xs-12 fileAttachment">
													<input type="file" name='attachmentFile' id="attachmentFile" onchange='javascript:validateFileForAttachment(this)'/>
												</div>
											</div>
											<div class="form-group">
												<button type='button' class="uploadBtn btn btn-primary btn-xs pull-right" onclick='javascript:uploadAttachment()'><fmt:message key='org_intalio_common_upload'/>
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
					</div>
				</div>
			</div>
			<div id="main-content" class="main-content clearfix">
				<div class="breadcrumbs" id="breadcrumbs">
					<span class="toolbar width-50"></span>
					<span class="noDecoration uuidName pull-right"><i class="fa fa-sitemap bigger-120"></i>&nbsp;<span class='uuid'></span>
					</span>
				</div>
				
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<div class="canvas" id="canvas"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
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
	<div id="notificationMessage">
	</div>
	<div id="notificationErrorMessage">
	</div>
	<!-- This div is a template for adding more comments-->
	<div class='hide' id='modellerCommentTemplate'>
		<div class="profile-activity clearfix">
			<div>
				<div>
					<img class="bpms_user_photo pull-left">
					<a class="noDecoration userName"></a>
				</div>
				<div>
					<span class="noDecoration commentTime"></span>
				</div>
				<div class="time comment"></div>
			</div>
		</div>
	</div>
	<div id='attachmentListTemp' class="hide">
		<div class="profile-activity clearfix listAttachments">
			<div>
				<a class="noDecoration"></a>
				<a class="pull-right iconCursor"><i class="fa fa-times-circle red bigger-110"></i></a>
			</div>
			<div>
				<span class="noDecoration uploadTime"></span>
			</div>
			<div>
				<span class="noDecoration uploadedBy"></span>
			</div>
		</div>
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
	<div class="hide">
		<span id="commentNotFound"><fmt:message key="bpms_user_task_comments_not_found"/></span>
		<span id='attachmentsMsg'><fmt:message key='bpms_user_task_attachments_not_found'/></span>
		<span id='removeAttachment'><fmt:message key='bpms_user_task_remove_attachment'/></span>
		<span id='addAttachment'><fmt:message key='bpms_user_task_add_attachment'/></span>
		<span id='sizeValidation'><fmt:message key='bpms_user_task_validate_attachment_size'/></span>
		<span id='fileValidation'><fmt:message key='bpms_user_task_validate_attachment_extension'/></span>
		<span id='fileRequired'><fmt:message key='bpms_user_task_validate_attachment'/></span>
		<span id='fileNotSupported'><fmt:message key='bpms_user_task_validate_attachment_extension'/></span>
		<span id='commentAdded'><fmt:message key='bpms_user_task_comment_added'/></span>
		<span id='attachmentAdded'><fmt:message key='bpms_user_task_add_attachment'/></span>

	</div>
	<script type="text/javascript" src="scripts/custom/modeler/path_parser.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/kickstart.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/config.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/wapama.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/clazz.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/main.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/ui.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/utils.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/erdfparser.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/datamanager.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/SVG/editpathhandler.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/SVG/minmaxpathhandler.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/SVG/pointspathhandler.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/SVG/svgmarker.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/SVG/svgmarker.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/SVG/svgshape.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/SVG/label.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/math/math.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/stencilSet/stencil.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/stencilSet/property.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/stencilSet/propertyitem.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/stencilSet/complexpropertyitem.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/stencilSet/rules.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/stencilSet/stencilset.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/stencilSet/stencilsets.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/command.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/bounds.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/uiobject.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/abstractshape.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/canvas.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/svgDrag.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/shape.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/controls/control.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/controls/magnet.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/controls/docker.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/node.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/edge.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/abstractPlugin.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/abstractLayouter.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/core/abstractDragTracker.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/translation_en_us.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/uuidRepository.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/toolbar.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/shapemenu.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/shaperepository.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/propertywindow.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/canvasResize.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/view.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/dragdropresize.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/renameShapes.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/undo.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/arrangement.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/grouping.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/dragDocker.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/addDocker.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/selectionframe.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/shapeHighlighting.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/edit.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/keysMove.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/layouter/edgeLayouter.js?version=2676"></script>
	<script type="text/javascript" src="scripts/plugin/x-editable/bootstrap-editable.min.js"></script>
	<script type="text/javascript" src="scripts/plugin/x-editable/ace-editable.min.js"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/layouter/containerLayouter.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/dragTracker/laneDragTracker.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/plugins/dragTracker/poolDragTracker.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/jquery-shapeRepository.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/jquery-toolbar.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/collapseSubprocess.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/modeler/importjsoncommand.js?version=2676"></script>	
	<script type="text/javascript" src="scripts/custom/modeler/less.min.js?version=2676"></script>
	<script type="text/javascript" src="scripts/plugin/workflow/moment.min.js"></script>
	<script src="scripts/plugin/jquery-dateFormat.js"></script>
	<script type="text/javascript" src="scripts/plugin/common/perfect-scrollbar.with-mousewheel.min.js"></script>
	<script type="text/javascript" src="scripts/plugin/common/perfect-scrollbar.min.js"></script>
	<script type="text/javascript" src="scripts/custom/modeler/modelling.js?version=2676"></script>
	<script type="text/javascript" src="scripts/custom/common/url.js?version=2676"></script>
	<script type="text/javascript" src="scripts/plugin/jquery.form.js"></script>
</body>
</html>
