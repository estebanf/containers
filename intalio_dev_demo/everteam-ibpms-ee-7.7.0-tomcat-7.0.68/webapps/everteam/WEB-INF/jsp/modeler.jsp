 <!-- 
 * Copyright (C) 2016, Ever Team Software
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Ever Team Software or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 -->
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
	<link rel="stylesheet" type="text/css" href="style/custom/modeler/modeler.css?version=2476">
	<script type="text/javascript" src="scripts/plugin/workflow/moment.min.js"></script>
</head>
<body>
	<div id="breadcrumbs" class="breadcrumbs">
		<ul class="breadcrumb">
			<li class="active"><i class="fa fa-sitemap bigger-120"></i>&nbsp;&nbsp;&nbsp;<a class="noDecoration iconCursor" onclick="javascript:modelerApp.list.getDiagrams();"><fmt:message key="web_modeler"/></a></li>
		</ul>
	</div>
	<div class="page-content">
		<div class="row">
			<div class="col-xs-12">
				<div class="table-responsive">
					<table id="webBasedModeler" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th class="nowrap"><label class="position-relative"><input type="checkbox" class="ace" id="selectAll" onclick="updateChildrenCheckBox(this);modelerApp.buttons.disableForAllDiagrams();"><span class="lbl"></span></label></th>
								<th class="nowrap"><fmt:message key="web_modeler_name"/></th>
								<th class="nowrap"><fmt:message key="web_modeler_owner" /></th>
								<th class="nowrap"><fmt:message key="web_modeler_description" /></th>
								<th class="nowrap"><fmt:message key="web_modeler_comments"/></th>
								<th class="nowrap"><fmt:message key="web_modeler_right"/></th>
							</tr>
						</thead>
						<tbody id="webBasedModeler_rows">
						</tbody>
					</table>
				</div> 
			</div>
		</div>
	</div>
	<div id="modelerModal" class="modal fade" style="width:100%" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="web_modeler_create_modal" /></span>
				</div>
				<div class="modal-body">
					<span id="modelerNameError" class="text-danger"/>
					<form class="form-horizontal formCreateModeler" role="form">
						<div class="form-group">
							<label class="col-sm-3" for="form-field-1"> <fmt:message key="web_modeler_diagram_name" /></label>
							<div class="col-sm-8">
								<input id="modelerName" class="col-xs-8 col-sm-11" type="text" placeholder="Diagram Name" maxlength='100'/>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3" for="form-field-1"> <fmt:message key="web_modeler_diagram_description" /></label>
							<div class="col-sm-8">
								<textarea id="modelerDescription" class="col-xs-8 col-sm-11" type="text" placeholder="Description" maxlength='225'/>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" onclick="modelerApp.create.saveModeler();" aria-hidden="true" class="btn btn-sm btn-primary"><fmt:message key="web_modeler_create" /></button>
				</div>
			</div>
		</div>
	</div>
	<div id='deleteModelersModal' class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-hidden="true" data-dismiss="modal">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="web_modeler_delete_diagram" /></span>
				</div>
				<div class="modal-body">
					<p><fmt:message key="web_modeler_delete_diagram_confirmation" /></p>
				</div>
				<div class="modal-footer">
					<button class="btn btn-danger btn-sm modalDeleteConfirm" onclick="modelerApp.delete.deleteModelers()" type="button" data-dismiss="modal" aria-hidden="true"><fmt:message key="org_intalio_common_confirm"/></button>
				</div>
			</div>
		</div>
	</div>
	<!-- This div is a modal window for showing comments of a diagram -->
	<div id="mDiagramCommentsModal" class="modal fade" role="dialog" aria-labelledby="mDiagramCommentsModal" aria-hidden="true">
		<div class="modal-dialog">
		<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" onclick='javascript:modalHide("mDiagramCommentsModal")' aria-hidden="true">&times;</button>
			<span class="modal_heading" id="mDiagramCommentsHeader"> <fmt:message key="bpms_user_task_comments_heading"/> </span>
		</div>
		<div class="modal-body">
			<div class='widget-box transparent commentBox'>
				<div class='widget-body'>
					<span class='commentError text-danger hide'></span>
					<div class='widget-main padding-4'>
						<div id="mDiagramComments" class="profile-feed">
						</div>
						<div>
							<textarea autofocus maxlength="4000" id="mDComment" class="form-control limited" placeholder="Type your comment here..."></textarea>
							<button onclick='javascript:modelerApp.comment.addComment()'class="pull-right btn btn-xs btn-primary" type="button">
								<i class="ace-icon fa fa-comment"></i>
								<fmt:message key="bpms_user_task_comment"/>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
		</div>
	</div>
	<div id="shareDiagramModal" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="shareDiagramModal" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<span class="modal_heading"><fmt:message key="web_modeler_diagram_share_modal_heading"/> </span>
			</div>
			<div class="modal-body">
				<div id="shareDiagramError" class="text-danger"></div>
				<table class='table noLines shareModalTable'>
					<tbody>
						<tr>
							<td class='shareMdlLabel'><fmt:message key="web_modeler_diagram_permission"/></td>
							<td><select id="diagramPermission" data-placeholder="Choose Permission" multiple="" onchange="javascript:modelerApp.share.populateExistingPermission()"></select></td>
						</tr>
						<tr>
							<td class='shareMdlLabel'><fmt:message key="bpms_user_task_share_to"/></td>
							<td><select id="shareDiagramTo" data-placeholder="Choose Username" multiple=""></select></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button onclick="javascript:modelerApp.share.shareModeler();" aria-hidden="true"
					class="btn btn-primary btn-sm" type="button"><fmt:message key="bpms_user_task_button_share"/></button>
			</div>
		</div>
	</div>
	</div>

	<div class="hide">
		<span id="shareButton"><fmt:message key='web_modeler_header_share'/></span>
		<span id="DeleteButton"><fmt:message key='web_modeler_header_delete'/></span>
		<span id="createButton"><fmt:message key='web_modeler_create'/></span>
		<span id="deleteDiagramError"><fmt:message key="web_modeler_select_atleast_one_diagram" /></span>
		<span id="selectOneDiagramError"><fmt:message key="web_modeler_select_one_diagram" /></span>
		<span id="diagramNameError"><fmt:message key="web_modeler_diagram_name_error"/></span>
		<span id="alphanumericError"><fmt:message key="web_modeler_alphanumeric_characters_error"/></span>
		<span id="selectInfoMsg"><fmt:message key="web_modeler_information_message"/></span>
		<span id="commentValidate"></span>
		<span id="importButton"><fmt:message key='web_modeler_header_import'/></span>
		<span id="shareError"><fmt:message key='web_modeler_diagram_share_error'/></span>
		<span id="commentError"><fmt:message key='web_modeler_diagram_comment_error'/></span>
		<span id="entriesInfo"><fmt:message key="web_modeler_diagram_page_info"/></span>
	</div>
	<script type="text/javascript" src="scripts/custom/modeler/modeler.js?version=2676"></script>
</body>
</html>	
