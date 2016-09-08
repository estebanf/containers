 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<head>
<meta charset="utf-8" />
<%@taglib uri="http://www.springframework.org/tags" prefix="fmt"%>
<title><fmt:message code="intalio.collaboration" /></title>
<link href="style/custom/collaboration/collaboration.css?version=2676" rel="stylesheet">
<link rel="stylesheet" href="style/plugin/jquery-ui.css" />
<!--[if IE]>
<link href="style/custom/collaboration/collaboration-ie.css?version=2676" rel="stylesheet" />
<![endif]-->
</head>
<body>
<div id="breadcrumbs" class="breadcrumbs">
	<div id="ace-settings-container" class="ace-settings-container" >
		<div id="ace-settings-btn" class="btn btn-app btn-xs btn-warning ace-settings-btn" onclick="aceSettingButton();return false;">
			<i class="fa fa-cog bigger-150"></i>
		</div>
		<div id="ace-settings-box" class="ace-settings-box">
			<div><i class="fa fa-angle-right bigger-110"></i>
				<label class="lbl" >&nbsp;<a href="#" onclick="createRepoModalShow();" data-toggle="modal" ><fmt:message code="create.repository.heading"/></a></label>
			</div>

			
		</div>
	</div>
	<ul class="breadcrumb">
		<li ><i class="fa fa-group"></i> &nbsp;&nbsp;<a onclick="javascript:refreshCollaboration();" class="noUnderLine"><fmt:message code="com_intalio_bpms_module_collaboration" /></a></li>
	</ul>

</div>
<div  id="container1" class="container">
	<div class="row" id="collab-container">
		<div class="col-sm-4" id="activitiesList">
			<div class="widget-box transparent">
				<div class="widget-header widget-header-small">
					<span class="collab-rss">
						<i class="fa fa-rss"></i>
						<fmt:message code="collaboration.recent.activities"/>
					</span>
					<div class="widget-toolbar action-buttons no-border">
						<a href="#" onclick="refreshCommits(0);" title="Refresh"><i class="fa fa-refresh"></i></a>
					</div>
				</div>
				<div class="widget-body">
					<div class="widget-main padding-0">
						<div class="comments" id="commitsList">
						
						</div>						
					</div>
				</div>
			</div>
		</div>
		<div class="col-sm-8" id="repositories">
			<div class="clearfix" id="reposList">
				
			</div>
		</div>
		
	</div>	
</div>
<br>
<div class="hide">
	<div class="widget-box repository" id="repoTemplate">
		<div class="widget-header">
			<h4 class="smaller">
				<span class="repoName"></span>							
			</h4>
		</div>
		<div class="widget-body">
			<div class="widget-main infobox-container">
				<div class="infobox infobox-blue ">
					<div class="icon_repo">
						<i class="fa fa-folder"></i>
					</div>
					<div class="infobox-data">
						<span class="infobox-data-number totalProjects center"></span>
						<div class="infobox-content"><fmt:message code="collaboration.name.projects"/></div>
					</div>
				</div>
				<div class="infobox infobox-orange ">
					<div class="icon_repo">
						<i class="fa fa-group"></i>
					</div>
					<div class="infobox-data">
						<span class="infobox-data-number totalCollaborators center"></span>
						<div class="infobox-content"><fmt:message code="collaboration.name.collaborators"/></div>
					</div>
				</div>
				<div class="infobox infobox-red ">
					<div class="icon_repo">
						<i class="fa fa-user"></i>
					</div>
					<div class="infobox-data username_filed">
						<span class="infobox-data-number totalCommits"></span>
						<div class="infobox-content"><fmt:message code="collaboration.name.created.by"/></div>
					</div>
				</div>
				<div class="infobox infobox-green ">
					<div class="icon_repo">
						<i class="fa fa-clock-o"></i>
					</div>
					<div class="infobox-data">
						<span class="infobox-data-number createdDate"></span>
						<div class="infobox-content"><fmt:message code="collaboration.name.created.on"/></div>
					</div>
				</div>					
			</div>
		</div>
	</div>
						
	<div class="itemdiv commentdiv" id="commitTemplate">
		<div class="commitBody body">
			
			<div class="commitText text">
				<i class="fa fa-quote-left"></i>
				<span class="commitMsg"></span>
			</div>
			<div class="" >
				by <span class="commitUser"></span> 
			</div>
			<div class="commitRepo" >
				<span class="commitProject"><a href="#"class="noDecoration repoNameCommit"></a>&nbsp;<i class="fa fa-angle-right"></i>&nbsp;<a href="#" class="noDecoration projectNameCommit"></a></span>
				<span class="commitTime" style="float:right;"><i class="fa fa-time"></i></span> 
			</div>
		</div>
	</div>
	
	<div id="ace_settings_template">
		<div class="ace_settings_list">
			<i class="fa fa-angle-right bigger-110"></i>
				<a data-toggle="modal" href="#" onclick="deleteFunction();"><span class="settingName"></span></a>
		</div>	
	</div>
	
	<div id="projectPage_Template" class="widget-box transparent">
		<div class="widget-header">
			<div class="widget-toolbar no-border">
				<ul class="nav nav-tabs">
					<li class="active"><a id="infoHead" href="#info-tab" data-toggle="tab" onclick="fetchInfo();"><fmt:message code="project.page.tab.info"/></a></li>
					<li><a id="tagsHead" href="#tags-tab" data-toggle="tab" onclick="fetchTags();"><fmt:message code="project.page.tab.tag"/></a></li>
					<li><a id="branchsHead" href="#branch-tab" data-toggle="tab" onclick="fetchBranchs();"><fmt:message code="project.page.tab.branch"/></a></li>
				</ul>
			</div>
		</div>
		<div class="widget-body">
			<div class="widget-main padding-4">
				<div class="tab-content padding-8 ">
					<div id="info-tab" class="tab-pane active">
						<div>
							<a href="#" class="projectDescription noDecoration" onclick="javascript:editDescription()" title="Edit Description"><fmt:message code="project.page.info.descriprtion"/><div class="pull-right"><i class="projectDescriptionIcon fa fa-edit blue"></i></div></a>
								<div id="description"></div>
						</div><br>
						<br>
						<h4><fmt:message code="project.page.info.contributors"/></h4>
						<hr>
						<div class="clearfix" id="contributors-list">
						</div>
					</div>
					<div id="tags-tab" class="tab-pane">
						<div id="tags">
							<table id="collabProjectTags" class="table table-striped table-bordered table-hover">
								<thead>
									<tr>
										<th><label class="position-relative"><input type="checkbox" class="ace" onclick="updateCheckbox(this);"><span class="lbl"></span></label></th>
										<th><fmt:message code="project.page.info.tags.tagname"/></th>
										<th><fmt:message code="project.page.info.tags.createdby"/></th>
										<th><fmt:message code="project.page.info.tags.createdtime"/></th>
										<th><fmt:message code="project.page.info.tags.description"/></th>
										<th><fmt:message code="project.page.info.tags.actions"/></th>
									</tr>
								</thead>
								<tbody id="collabProjectTagsBody">
								</tbody>
							</table>
						</div>
					</div>
					<div id="branch-tab" class="tab-pane">
						<table id="collabProjectBranch" class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th><label class="position-relative"><input type="checkbox" class="ace" onclick="updateCheckbox(this);"><span class="lbl"></span></label></th>
									<th><fmt:message code="collaboration.branch.table.branch"/></th>
									<th><fmt:message code="collaboration.name.created.by"/></th>
									<th><fmt:message code="collaboration.name.created.on"/></th>					
								</tr>
							</thead>
							<tbody id="collabProjectBranchBody">
							</tbody>
						</table>
					</div>
				</div/>
			</div>
		</div>
	</div>
<div id="branchPage_Template" class="widget-box transparent">
	<div class="widget-header">
		<div class="widget-toolbar no-border">
			<ul class="nav nav-tabs">
				<li class="active"><a id="sourcesHead" href="#sources-tab" data-toggle="tab" onclick="fetchSourceFiles();"><fmt:message code="project.page.tab.sources"/></a></li>
				<li><a id="locksHead" href="#locks-tab" data-toggle="tab" onclick="fetchLocks();"><fmt:message code="project.page.tab.locks"/></a></li>
			</ul>
		</div>
	</div>
	<div class="widget-body">
		<div class="widget-main padding-4">
			<div class="tab-content padding-4 ">
				<div id="sources-tab" class="tab-pane active">
					<div  id="source-table">

					</div>
				</div>
				<div id="locks-tab" class="tab-pane">
					<div class="table-responsive">
					<table id="lockFiles" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th><label class="position-relative"><input type="checkbox" class="ace" onclick="javascript:updateCheckbox(this);"><span class="lbl"></span></label></th>
								<th><fmt:message code="collaboration.name.resource.name"/></th>
								<th><fmt:message code="collaboration.name.locked.by"/></th>
								<th><fmt:message code="collaboration.name.locked.on"/></th>
							</tr>
						</thead>
						<tbody id="lockFilesBody">
						</tbody>
					</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="sources_template">
	<div  class="text-info source_row">
		<span class="noDecorationFile"><i class="fa fa-file"></i>&nbsp;</span>
		<span class="pull-right visible-md visible-lg hidden-sm hidden-xs action-buttons">
			<a title="Documentation" class="tooltip-error" data-toggle="collapse"  href="#" ><i class="fa fa-info-circle orange"></i></a>
			<a title="Comments" data-toggle="collapse"  href="#" ><i class="fa fa-comments blue"></i></a>
			<a title="Download" href="#" ><i class="fa fa-download green"></i></a>
		</span>
	</div>
	<div  class="accordion-body collapse">
		<div class="accordion-inner documentation">
		</div>
	</div>
	<div  class="accordion-body collapse">
		<div class="accordion-inner comments">
		</div>
	</div>
</div>	
<span id="fmtloadMoreCommits"><fmt:message code='load.more.commits'/></span>
<span id="fmtdeleteButton"	><fmt:message code='collaboration.delete.button'/></span>
<span id="fmtunlockButton"	><fmt:message code='collaboration.unlock.button'/></span>
<span id="fmtdocumentation"	><fmt:message code='project.page.documentation'/></span>
<span id="fmtpleaseEnterRepository"><fmt:message code='collaboration.enter.repository.name'/></span>
<span id="fmtpleaseSelectTag"><fmt:message code='collaboration.select.atleast.one.tag'/></span>
<span id="fmtpleaseSelectBranch"><fmt:message code='collaboration.select.atleast.one.branch'/></span>
<span id="fmtpleaseSelectFile"	><fmt:message code='collaboration.select.atleast.one.file'/></span>
<span id="fmtdeleteRepository"	><fmt:message code='delete.repository'/></span>
<span id="fmtdeleteCurrentRepository"	><fmt:message code='delete.current.repository'/></span>
<span id="fmtdeleteProjects"	><fmt:message code='collaboration.delete.projects'/></span>
<span id="fmtdeleteBranchs"><fmt:message code='collaboration.delete.branchs'/></span>
<span id="fmtdeleteProject"><fmt:message code='collaboration.delete.project'/></span>
<span id="fmtdeleteBranch"	><fmt:message code='collaboration.delete.branch'/></span>
<span id="fmtdeleteBranchHead"	><fmt:message code='collaboration.delete.branch.head'/></span>
<span id="fmtdeleteTag"	><fmt:message code='collaboration.delete.tag'/></span>
<span id="fmtunlockFile"	><fmt:message code='collaboration.delete.file'/></span>
<span id="fmtsureToDeleteRepository"	><fmt:message code='delete.repository.confirmation.message'/></span>
<span id="fmtsureToDeleteProject"	><fmt:message code='delete.project.confirmation.message'/></span>
<span id="fmtsureToDeleteBranch"	><fmt:message code='collaboration.sure.delete.branch'/></span>
<span id="fmtsureToDeleteBranchCurrent"	><fmt:message code='collaboration.sure.delete.current.branch'/></span>
<span id="fmtsureToDeletetag"	><fmt:message code='collaboration.sure.delete.tag'/></span>
<span id="fmtsureToUnlockFile"	><fmt:message code='collaboration.sure.unlock.file'/></span>
<span id="fmtnoRecentActivities"	><fmt:message code='collaboration.no.recent.activities'/></span>
<span id="fmtnoProjectIsSharedIntoRepository"	><fmt:message code='collaboration.no.project.shared.repository'/></span>
<span id="fmtDoUWantToContinue"	><fmt:message code='sure.delete.repository'/></span>
<span id="noDocumentationFound"	><fmt:message code='collaboration.no.documentation.found'/></span>
<span id="noFileLocked"	><fmt:message code='collaboartion.no.file.locked'/></span>
<span id="noTagCreated"	><fmt:message code='collaboration.no.tags.found'/></span>
<span id="justNow"	><fmt:message code='collaboration.just.now'/></span>
<span id="collabBranches"><fmt:message code='collaboration.name.branches'/></span>
<span id="updateBtn"><fmt:message code='collaboration.button.update'/></span>
<span id="collabSelectOneBranch"><fmt:message code='collaboration.select.atleast.one.branch'/></span>

</div>

<div id="createRepo" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<span class="modal_heading"><fmt:message code="create.repository.heading"/></span>
				</div>
				<div class="modal-body">
					<span id="empty_field"class="text-danger hide pull-right"><fmt:message code="collaboration.enter.repository.name"/></span>
					<form>
						<fieldset>
							<input type="text" id="repoName" maxlength="30"
								placeholder="Repository Name" />
						</fieldset>
					</form>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary btn-sm" type="button" aria-hidden="true" onclick="createRepo();return false;"><fmt:message code="button.create.repo"/></button>
				</div>
			</div>
		</div>
	</div>
	<div id="collabDeleteConfirm" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message code="delete.repository"/></span>
				</div>
				<div class="modal-body">
				<p class="deleteMessage"><b></b></p>
				</div>
				<div class="modal-footer">
					<button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="deleteRepo();return false;"><fmt:message code="delete.yes.button"/></button>
				</div>
			</div>
		</div>
	</div>
<div id="showSVG" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
			&times;
		</button>
		<div class="action-buttons hide">
			<a class="blue" href="#" id="zoom-in">
				<i class="fa-zoom-in bigger-130"></i>
			</a>
			<a class="blue" href="#" id="zoom-out">
				<i class="fa-zoom-out bigger-130"></i>
			</a>			
		</div>
		<span id="fileName" class="modal_heading"></span>
		<span class="action-buttons">
			<a href="#" onclick="showSVGDocumentation()" title='<fmt:message code="collaboration.show.svg.documentation"/>' >
				<i class="fa fa-info-circle orange"></i>
			</a>
		</span>
	</div>
	<div class="modal-body " id="test-body">
		<div id="svg_container" class="">
	</div>					
				<div class="svgDocumentation">
				<span class="thick" id="svg-description"><fmt:message code="project.page.documentation"/>:&nbsp;</span>
				<span id="svgInfo"> </span>
				</div>				
			</div>
		</div>
	</div>
</div>
</body>
<script src="scripts/custom/collaboration/collaboration.js?version=2676"></script>
</html>
