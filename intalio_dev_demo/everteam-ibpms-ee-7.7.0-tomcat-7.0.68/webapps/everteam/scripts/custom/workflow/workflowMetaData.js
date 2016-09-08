/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */
var workflowMetaData = {},taskCommentsRef,taskCommentRef,taskHistory=false,taskList=false,attachmentsModalRef = $('#taskAttachmentsModal');
var unSupportedExtensions = ["ade", "adp", "bat", "chm", "cmd", "com", "cpl", "exe", "hta", "ins", "isp", "jse", "lib", "lnk", "mde", "msc", "msp", "mst", "pif", "scr", "sct", "shb", "sys", "vb", "vbe", "vbs", "vxd", "wsc", "wsf", "wsh","jar","as","msi","html","htm"];
/*@Description  : This function will intialize the html elements.*/
workflowMetaData.intialize = function () {
	taskCommentsRef = $('#taskCommentsModal').find('div#taskComments');
	taskCommentRef  = $('#taskCommentsModal').find('textarea#taskComment');
	$('#attachmentFile').ace_file_input({
		no_file:'Choose File ...',btn_choose:'Choose',btn_change:'Change',droppable:false
	});
	$('input#taskId').val(formlessTask.taskId);
	$('input#participantToken').val(participantToken);
	$('#taskAttachmentForm').attr('action',intalio_bpms.task_metadata.addAttachment);
	taskCommentRef.val('');
	$('#ace-settings-box').css('max-height',$(window).height()-90);
	taskCommentsRef.css('max-height',$(window).height()-345);
	$('.attachmentsTable').css('max-height',$(window).height()-350);
	$('#taskAttachmentsList').css('max-height',$(window).height()-350);
	if(currentTab=="tasks" && formlessTask.formType=="formless"){
		if(formlessTask.taskStatus==="READY"){
			$("#taskDetailInfo").find('.btnClaimTask').removeClass('hide');
			$("#taskDetailInfo").find('.btnRevokeTask').addClass('hide');
		}
		else{
			$("#taskDetailInfo").find('.btnClaimTask').addClass('hide');
			$("#taskDetailInfo").find('.btnRevokeTask').removeClass('hide');
		}
	}
	if(formlessTask.formType=="formless"){
		addLoading('.page-content');
		workflowMetaData.getTask();
	}
	workflowMetaData.handleTasks();
	workflowMetaData.getCount();
};

workflowMetaData.hideIframeHtmlElemets = function(id) {
	if(currentTab=="tasks" || currentTab=="processes"){
		var htmlObj = $('#'+id).contents().find("body");
	    htmlObj.find('img.jsx30image').css('display','none');
	    htmlObj.find("div[label='IntalioInternal_AttachmentsBlock']").css('display','none');
	    if(formlessTask.isSharedTask)
	    	htmlObj.find('span.jsx30button').css('display','none');
	}else
		$('#notificationform').contents().find("body").find('span.jsx30button').css('display','none');
    $('#'+id).removeClass('hide');
    removeLoading();
}

/*@Description  : This function hide unwanted data according to the tab & shared task filter applied.*/
workflowMetaData.handleTasks = function () {
	if(formlessTask.isSharedTask || currentTab=="notifications"){
		attachmentsModalRef.find('div.form-group').addClass('hide');
	    attachmentsModalRef.find('table th:last').addClass('hide');
	    attachmentsModalRef.find('.modal-footer').addClass('hide');
		if(formlessTask.formType=="ajax" && currentTab=="notifications")
			workflowMetaData.waitForIframeToLoad('notificationform','span.jsx30button',250,workflowMetaData.hideIframeHtmlElemets,0);
		if(formlessTask.isSharedTask)
			$("#taskDetailInfo").find('button.shared').addClass('hide');
	}else{
	    attachmentsModalRef.find('div.form-group').removeClass('hide');
	    $('#taskAttachmentsList tr').each(function() {
	        $(this).find('td:last').removeClass('hide');
	    });
	    attachmentsModalRef.find('table th:last').removeClass('hide');
	    attachmentsModalRef.find('.modal-footer').removeClass('hide');
	}
	if(currentTab=="tasks" && formlessTask.formType=="ajax")
		workflowMetaData.waitForIframeToLoad('taskform','div[label="IntalioInternal_AttachmentsBlock"]',250,workflowMetaData.hideIframeHtmlElemets,0);
    else if(currentTab=="processes" && formlessTask.formType=="ajax")
		workflowMetaData.waitForIframeToLoad('processesform','div[label="IntalioInternal_AttachmentsBlock"]',250,workflowMetaData.hideIframeHtmlElemets,0);
}

/*@Description  : This function will make an ajax request to server to get the attachments list.*/
workflowMetaData.getAttachments = function(){
	workflowMetaData.openAttachmentModal();
	addLoading(attachmentsModalRef.find('.modal-dialog'));
	$('#taskAttachmentsList').empty();
	var attachmentsURL = intalio_bpms.task_metadata.getAttachments.replace('{taskId}',formlessTask.taskId);
	sendAjaxCall(attachmentsURL, "GET", false, true, "json", {}, handleAjaxError, function(data) {
		if(isObjectEmpty(data.Attachments) && isObjectEmpty(data.GlobalAttachments)){
			$('#taskAttachmentsList').append('<tr><td colspan="5">'+$("#uTAttachmnetsMsg").text()+'</td></tr>');
			$('span.attachmentCount').text(0);
		}
		else{
			$.each(data.Attachments,function(key,value){
				$('#taskAttachmentsList').append('<tr><td><a target="_blank" class="noDecoration" href="'+value.payloadURL+'">'+value.title+'</a></td><td>'+$.format.date(value.uploadedDate, userPreferences.dateFormat+userPreferences.hourFormat)+'</td><td>'+value.description+'</td><td>No</td><td class="center"><a class="ace-popup noDecoration" title="Remove attachment" data-content="Remove Attachment" data-trigger="hover" data-placement="bottom" onclick=javascript:workflowMetaData.removeAttachment("'+value.payloadURL+'",false)><i class="fa fa-times red"></i></a></td></tr>');
			});
			$.each(data.GlobalAttachments,function(key,value){
				$('#taskAttachmentsList').append('<tr><td><a target="_blank" class="noDecoration" href="'+value.payloadURL+'">'+value.title+'</a></td><td>'+$.format.date(value.uploadedDate, userPreferences.dateFormat+userPreferences.hourFormat)+'</td><td>'+value.description+'</td><td>Yes</td><td class="center"><a class="ace-popup noDecoration" title="Remove attachment" data-content="Remove Attachment" data-trigger="hover" data-placement="bottom" onclick=javascript:workflowMetaData.removeAttachment("'+value.payloadURL+'",true)><i class="fa fa-times red"></i></a></td></tr>');
			});
			$('span.attachmentCount').text(parseInt(data.Attachments.length+data.GlobalAttachments.length));
		}
		applyNiceScroll($('.attachmentsTable'));
		if(formlessTask.isSharedTask || currentTab=="notifications") {
			$('#taskAttachmentsList tr').each(function() {
				if($(this).find('td').length > 1)
	           		$(this).find('td:last').addClass('hide');
	        });
		}
		else{
			$('#taskAttachmentsList tr').each(function() {
	           $(this).find('td:last').removeClass('hide');
	        });
		}
		removeLoading();
	});
	$('a.ace-popup').popover();
};

/*@Description  : This function will load the history data by making an ajax request to server..*/
workflowMetaData.getHistory = function(){
	workflowMetaData.openHistoryModal();
	$("#taskHistory").empty();
	var historyURL = intalio_bpms.task_metadata.getHistory.replace('{taskId}',formlessTask.taskId);
	var historyCommentCountURL = intalio_bpms.task_metadata.getHistoryCommentCount;
	sendAjaxCall(historyURL, "GET", false, true, "json", {}, handleAjaxError, function(data) {
		var taskIdArr=[];
		if(data.history && data.history.length>0){
			$.each(data.history,function (key,value) {
				taskIdArr.push(value.taskId);
			});
		}
		var requestData = {moduleId:3,threadId:taskIdArr};
	sendAjaxCall(historyCommentCountURL, "GET", false, true, "json", requestData, handleAjaxError, function(response) {
		if(data.history && data.history.length>0){
			$.each(data.history,function (key,value) {
				var nameObj = [],userName="";
				if(data.users && data.users.length >=0)
                    nameObj = $.grep(data.users, function(e){return e.userID.toLowerCase() == value.user.toLowerCase()});				
				nameObj.length==1 ? userName = nameObj[0].userName : userName=value.user;
				description = value.description!="" ? value.description : "No Description";
				adhocIcon = value.isAdhoc== "true"?'<span class="pull-right"><img src="images/adhoc_task.png" height="17" style="padding-right: 5px"></img></span>':'';
				commentsCount = response.counts[value.taskId];
				$('#taskHistory').append('<tr><td>'+description+adhocIcon+'</td><td><a class="noDecoration" onclick="javascript:showUserProfile(this)" user="'+value.user+'">'+userName+'</a></td><td>'+$.format.date(value.auditDate, userPreferences.dateFormat+userPreferences.hourFormat)+'</td><td class="hide"><a class="noDecoration" onclick="javascript:workflowMetaData.loadTask(this)" data='+value.formURL+' href="#">Link</a></td><td class="center"><a class="noDecoration" onclick="javascript:workflowMetaData.getPastComments(this)" data="'+value.taskId+'" href="#">'+commentsCount+'&nbsp;</a></td></tr>');
			});
		}else
			$("#taskHistory").append('<tr><td colspan="5">'+$('#uTHistoryMsg').text()+'</td></tr>');
		});
	});
	applyNiceScroll($('.taskHistory'));
	removeLoading();
}


/*@Description  : This function will load all the related adhoc tasks data when a new adhoc task is created by making an ajax request to server..*/
workflowMetaData.getAdhocTaskList = function(){
	workflowMetaData.openAdhocListModal();
	$("#taskList").empty();
	var adhocTaskURL = intalio_bpms.task_metadata.getAdhocTaskList.replace('{taskId}',formlessTask.taskId);
	sendAjaxCall(adhocTaskURL, "GET", false, true, "json", {}, handleAjaxError, function(data) {
		if(data.adhoctasks && data.adhoctasks.length>0){
			$.each(data.adhoctasks,function (key,value) {
				var nameObj = [],assignee=[];
				var assignedUsers=value.assignee.split(',');
				$.each(assignedUsers,function(key,value){
					if(value=="*")
					 	assignee.push("All");
					else {
						if(data.users && data.users.length >=0)
							nameObj = $.grep(data.users, function(e){return e.userID.toLowerCase() == value.toLowerCase()});
						nameObj.length==1 ? assignee.push(nameObj[0].userName) : assignee.push(value);
					}
				});
				formType=value.formType.charAt(0).toUpperCase()+value.formType.substr(1).toLowerCase();
				description = value.description;
				placement=value.placement.charAt(0).toUpperCase()+value.placement.substr(1).toLowerCase();
				$('#taskList').append('<tr><td>'+description+'</td><td>'+$.format.date(value.createdDate, userPreferences.dateFormat+userPreferences.hourFormat)+'</td><td>'+placement+'</td><td>'+
				 formType+'</td><td>'+ assignee+'</td></tr>');
			});
		}else
			$("#taskList").append('<tr><td colspan="5">'+$('#adhocTaskListMsg').text()+'</td></tr>');
		});
	applyNiceScroll($('.taskList'));
	removeLoading();
}
 

/*@Description  : This function will load the comments of the previous task(s).*/
workflowMetaData.getPastComments = function (obj) {
	$('#taskHistoryModal').removeClass('in');
	$('.commentError').addClass('hide');
	modalShow('taskCommentsModal');
	workflowMetaData.getComments(true,$(obj).attr('data'));
}

/*@Description  : This function will load the task content in history.*/
workflowMetaData.loadTask = function (obj) {
	taskHistory=true;
	$('#taskHistoryModal').removeClass('in');
	modalShow('iframeTaskHistoryModal');
	addLoading($('#iframeTaskHistoryModal').find('.modal-dialog'));
	$('#iframeTaskHistoryModal .modal-body').css('height',$(window).height()-125);
	$('#iframeTaskHistoryModal').find('#historyTask').attr('src',$(obj).attr('data'));
	setTimeout(function() {
		removeLoading();
	},750);

}

/*@Description  : This function will make a server call to add comments.*/
workflowMetaData.addComments = function(){
	if(taskCommentRef.val()){
		$('.commentError').addClass('hide');
		addLoading($('#taskCommentsModal').find('.modal-dialog'));
		var data = {
			comment:taskCommentRef.val(),
			createdBy:$('#userid').text(),
			refCommentTypeId:3,
			threadId:formlessTask.taskId
		}
		sendAjaxCall(intalio_bpms.task_metadata.addComments, "POST", false, true, "json", data, handleAjaxError, function(response) {
			taskCommentRef.val('');
			if(response.result=="saved"){
				workflowMetaData.getComments(false,formlessTask.taskId);
				showNotification($('#utCommentMsg').text());
			}
			else
				showErrorNotification(response.result);
		});
	}else{
		$('.commentError').text($('#uTCommentValidate').text()).removeClass('hide');
	}
};

/*@Description  : This function will be called while closing the modal window of comments.*/
workflowMetaData.handleCloseComments = function (obj) {
	if($('#taskCommentsModal').find('form').hasClass('hide')){
		modalHide('taskCommentsModal');
		$('#taskHistoryModal').addClass('in');
	}else
		modalHide('taskCommentsModal');
}

/*@Description  : This function will be called while closing the modal window of history.*/
workflowMetaData.handleCloseHistory = function (obj) {
	taskHistory = false;
	modalHide('iframeTaskHistoryModal');
	$('#taskHistoryModal').addClass('in');
}

/*@Description  : This function will be called while closing the modal window of show adhoc tasks. */
workflowMetaData.closeAdhocTasksList = function () {
	modalShow('createAdhocTaskModal');
}

/*@Description  : This function will make a server call to get comments.*/
workflowMetaData.getComments = function(pastTask,taskId){
	pastTask == true ? taskCommentsRef.next().addClass('hide') : taskCommentsRef.next().removeClass('hide')
	var data ={moduleId:3,start:0,max:1000,threadId:taskId};
	addLoading($('#taskCommentsModal').find('.modal-dialog'));
	sendAjaxCall(intalio_bpms.task_metadata.getComments, "GET", false, true, "json", data, handleAjaxError, function(response) {
		taskCommentsRef.empty();
		if(!pastTask)
			$('span.commentCount').text(response.comments.length);
		if(response.comments && response.comments.length >= 1){
			$.each(response.comments,function(key,value){
				var commentTemplate = $("#taskCommentTemplate .profile-activity").clone();
				commentTemplate.find('img').attr('src',intalio_bpms.user_preferences.user_image+"?user="+value.createdBy+"&date="+new Date());
				commentTemplate.find('a.userName').attr('onclick','javascript:showUserProfile(this)').attr('user',value.createdBy);
				if(value.createdByName)
					commentTemplate.find('a.userName').text(value.createdByName);
				else
					commentTemplate.find('a.userName').text(value.createdBy);
				commentTemplate.find('span.commentTime').text($.format.date(value.createdDate, userPreferences.dateFormat+userPreferences.hourFormat));
				commentTemplate.find('div.comment').text(value.comment);
				taskCommentsRef.prepend(commentTemplate);
			});
		}else{
			taskCommentsRef.html("<span>"+$('#uTCommentsMsg').text()+"</span>")
		}
		applyNiceScroll(taskCommentsRef);
		$('#taskComments').animate({
    		scrollTop: $('#taskComments').get(0).scrollHeight
		},1000);
		removeLoading();
	});
};

/*@Description  : This function will submit the form for adding an attchment.*/
workflowMetaData.addAttachment = function(){
	var attachmentsForm = $('#taskAttachmentForm');
	var attachment = $('#attachmentFile').val();
	if(attachment){
		$('#attachmentName').val($("#attachmentFile")[0].files[0].name);
		fileSize = $("#attachmentFile")[0].files[0].size;
		fileSize = fileSize / 1048576;
		if(Math.round(fileSize) > 1){ //1 MB validation
			$('.nameError').text($('#sizeValidation').text()).removeClass('hide');
			return false;
		}
		addLoading(attachmentsModalRef.find('.modal-dialog'));
		attachmentsForm.ajaxForm({
			success: function(response) {
				$('#taskAttachmentForm').find('#description').val('');
				$('#attachmentName').val('');
				$("#attachmentFile").val('');
				attachmentsForm.find('.ace-file-container').attr('data-title', 'Choose').removeClass('selected');
	    		attachmentsForm.find('.ace-file-name').attr('data-title', 'Choose File...');
	    		attachmentsForm.find('.ace-icon').addClass('fa fa-upload').removeClass('.fa fa-picture-o');
	    		attachmentsForm.find('.remove').hide();
				attachmentsForm.find('#globalAttachment').prop('checked',false);
				showNotification($('#uTAddAttachment').text());
				workflowMetaData.getAttachments();
			},
			dataType: "text"
		}).submit();
	}else{
		$('.nameError').text($('#uTAttachmentValidate').text()).removeClass('hide');
	}
}

/*@Description  : This function will set the value for global attachment.*/
workflowMetaData.setGlobalAttachment = function(obj){
	if($(obj).is(':checked'))
		$(obj).attr('value',true)
	else
		$(obj).attr('value',false);
}

/*@Description  : This function will call the webservice helper to delete an attachment*/
workflowMetaData.removeAttachment = function(url,bol){
	if (typeof workflowMDWSHelper == "undefined")
        loadJs("scripts/custom/workflow/workflowMetadataHelper.js", function() {
            workflowMDWSHelper.removeAttachment(url,bol);
        });
    else
        workflowMDWSHelper.removeAttachment(url,bol);
}

/*@Description  : This function will open the modal window for showing attachments*/
workflowMetaData.openAttachmentModal = function() {
	$('.nameError').addClass('hide');
	$('#taskAttachmentForm').find('#description').val('');
	$('#attachmentName').val('');
	$("#attachmentFile").val('');
	var attachmentsForm = $('#taskAttachmentForm');
	attachmentsForm.find('.ace-file-container').attr('data-title', 'Choose').removeClass('selected');
	attachmentsForm.find('.ace-file-name').attr('data-title', 'Choose File...');
	attachmentsForm.find('.ace-icon').addClass('fa fa-upload').removeClass('.fa fa-picture-o');
	attachmentsForm.find('.remove').hide();
	attachmentsForm.find('#globalAttachment').prop('checked',false);
	modalShow('taskAttachmentsModal');
}

/* @Description : This function will open the modal window for showing history of a task*/
 workflowMetaData.openHistoryModal = function() {
	modalShow('taskHistoryModal');	
}

/* @Description : This function will open the modal window for showing list of adhoc tasks related to a task */
workflowMetaData.openAdhocListModal = function() {
	modalHide('createAdhocTaskModal');
	modalShow('adhocTaskListModal');
}

/*@Description  : This function will open the modal window for showing comments*/
workflowMetaData.openCommentsModal = function () {
	$('.commentError').addClass('hide');
	modalShow('taskCommentsModal');	
	workflowMetaData.getComments(false,formlessTask.taskId);
}

/**
 * @Function Name   : saveTask
 * @Description     : This function will make a call to the server for saving task info.
 * */
workflowMetaData.saveTask = function () {
	addLoading('.page-content');
	var data = {assembly:"formless",form:"none",message:""};
	var soapBody = new SOAPObject("setOutputRequest");
	soapBody.ns  = defaultsWorkflow.tmsNameSpace;
   	soapBody.appendChild(new SOAPObject("taskId").val(formlessTask.taskId));
	var dataString = "<FormModel xmlns='http://www.intalio.com/formless'><notesTextAreaInput xmlns=''><notesTextArea xmlns=''>"+$('#taskNote').val().replace(/&/g, "&amp;")+"</notesTextArea></notesTextAreaInput></FormModel>";
   	soapBody.appendChild(new SOAPObject("data").val(dataString));
   	soapBody.appendChild(new SOAPObject("participantToken").val(participantToken));
   	var soapRequest = new SOAPRequest(defaultsWorkflow.tmsNameSpace + "/setOutputRequest", soapBody);
   	data.message= soapRequest.toString();
	sendAjaxCall(intalio_bpms.formless_tasks.formValidation, "POST", false, true, "xml", data, handleAjaxError, function(response) {
		if($(response).find('status').text().indexOf("success")>=0){
			removeLoading();
			showNotification($('#userTaskSaved').text());
		}
		else
			showErrorNotification($(response).find('message').text());
	});	
}

/**@Description     : This function will make a call to the server for getting task info.**/
workflowMetaData.getTask = function () {
	var data = {assembly:"formless",form:"none",message:""};
	var soapBody = new SOAPObject("getTaskRequest");
	soapBody.ns  = defaultsWorkflow.tmsNameSpace;	
   	soapBody.appendChild(new SOAPObject("taskId").val(formlessTask.taskId));
   	soapBody.appendChild(new SOAPObject("participantToken").val(participantToken));
   	var soapRequest = new SOAPRequest(defaultsWorkflow.tmsNameSpace + "/getTaskRequest", soapBody);
   	data.message = soapRequest.toString();
	sendAjaxCall(intalio_bpms.formless_tasks.formValidation, "POST", false, true, "xml", data, handleAjaxError, function(response) {
		$("#taskNote").val($(response).find('notesTextArea').last().text());
	});
	removeLoading();
}

/**@Description     : This function will make a call to the server for completing a task.**/
workflowMetaData.completeTask = function () {
	addLoading('.page-content');
	var data = {assembly:"formless",form:"none",message:""};
	var soapBody = new SOAPObject("completeTaskRequest");
	soapBody.ns  = defaultsWorkflow.tmpNameSpace;
   	var taskMetaData = new SOAPObject("taskMetaData");
   	taskMetaData.appendChild(new SOAPObject("taskId").val(formlessTask.taskId));
   	soapBody.appendChild(taskMetaData);
   	soapBody.appendChild(new SOAPObject("participantToken").val(participantToken));
   	soapBody.appendChild(new SOAPObject("user").val($("#userid").text()));
   	var outPutString = "<FormModel xmlns='http://www.intalio.com/formless'><notesTextAreaInput xmlns=''><notesTextArea xmlns=''>"+$('#taskNote').val()+"</notesTextArea></notesTextAreaInput></FormModel>";
   	soapBody.appendChild(new SOAPObject("taskOutput").val(outPutString));
   	var soapRequest = new SOAPRequest(defaultsWorkflow.tmpNameSpace + "/completeTaskRequest", soapBody);
   	data.message = soapRequest.toString();
	sendAjaxCall(intalio_bpms.formless_tasks.formValidation, "POST", false, true, "xml", data, handleAjaxError, function(response) {
		if($(response).find('status').text().indexOf("success")>=0){
			showNotification($('#userTaskCompleted').text());
			workflowMetaData.completeSuccess();
		}
		else
			showErrorNotification($(response).find('message').text());
	});	
}

/**@Description     : This function will hide unwanted html based on the page.**/
workflowMetaData.completeSuccess = function () {
	$("#taskDetailInfo").addClass("hide");
	if (currentTab == "tasks") {
		$("#taskTableDiv").removeClass("hide");
        addLoading($('#taskTableDiv'));
        getTasksData();
	}else if(currentTab == "processes"){
		$("#processesTableDiv").removeClass("hide");
		addLoading($('#processesTableDiv'));
		getProcessesData();
	}else if(currentTab == "notifications"){
		$("#notificationTableDiv").removeClass("hide");
		addLoading($('#notificationTableDiv'));
		getNotificationData();
	}
}

/**@Description     : This function will make a call to the server for claiming a task.**/
workflowMetaData.claimTask = function () {
	addLoading('.page-content');
	var data = {assembly:"formless",form:"none",message:""};
	var soapBody = new SOAPObject("claimTaskRequest");
	soapBody.ns  = defaultsWorkflow.tmpNameSpace;
	soapBody.appendChild(new SOAPObject("taskId").val(formlessTask.taskId));
	soapBody.appendChild(new SOAPObject("claimerUser").val($("#userid").text()));
   	soapBody.appendChild(new SOAPObject("participantToken").val(participantToken));
   	var soapRequest = new SOAPRequest(defaultsWorkflow.tmpNameSpace + "/claimTaskRequest", soapBody);
   	data.message = soapRequest.toString();
	sendAjaxCall(intalio_bpms.formless_tasks.formValidation, "POST", false, true, "xml", data, handleAjaxError, function(response) {
			if($(response).find('status').text().indexOf("success")>=0){
				showNotification($('#userTaskClaim').text());
				$("#taskDetailInfo").find('.btnClaimTask').addClass('hide');
				$("#taskDetailInfo").find('.btnRevokeTask').removeClass('hide');
			}
			else
				showErrorNotification($(response).find('message').text());
			removeLoading();
	});	
}

/**@Description     : This function will make a call to the server for revoking a task.**/
workflowMetaData.revokeTask = function () {
	addLoading('.page-content');
	var data = {assembly:"formless",form:"none",message:""};
	var soapBody = new SOAPObject("revokeTaskRequest");
	soapBody.ns  = defaultsWorkflow.tmpNameSpace;
	soapBody.appendChild(new SOAPObject("taskId").val(formlessTask.taskId));
   	soapBody.appendChild(new SOAPObject("participantToken").val(participantToken));
   	var soapRequest = new SOAPRequest(defaultsWorkflow.tmpNameSpace + "/revokeTaskRequest", soapBody);
   	data.message = soapRequest.toString();
	sendAjaxCall(intalio_bpms.formless_tasks.formValidation, "POST", false, true, "xml", data, handleAjaxError, function(response) {
			if($(response).find('status').text().indexOf("success")>=0){
				showNotification($('#userTaskRevoked').text());
				$("#taskDetailInfo").find('.btnClaimTask').removeClass('hide');
				$("#taskDetailInfo").find('.btnRevokeTask').addClass('hide');
			}
			else
				showErrorNotification($(response).find('message').text());
			removeLoading();
	});	
}

/**@Description     : This function will make a call to the server for starting processes(Init request)**/
workflowMetaData.startProcess = function () {
	addLoading('.page-content');
	var data = {assembly:"formless",form:formlessTask.taskURL,message:""};
	var soapBody = new SOAPObject("initRequest");
	soapBody.ns  = defaultsWorkflow.tmsNameSpace;
   	soapBody.appendChild(new SOAPObject("taskId").val(formlessTask.taskId));
	var dataString = "<FormModel xmlns='http://www.intalio.com/formless'><notesTextAreaInput xmlns=''><notesTextArea xmlns=''>"+$('#taskNote').val()+"</notesTextArea></notesTextAreaInput></FormModel>";
	soapBody.appendChild(new SOAPObject("input").val(dataString));
   	soapBody.appendChild(new SOAPObject("participantToken").val(participantToken));
   	soapBody.appendChild(new SOAPObject("formUrl").val(formlessTask.taskURL.split('?')[0]));
   	var soapRequest = new SOAPRequest(defaultsWorkflow.tmsNameSpace + "/initRequest", soapBody);
   	data.message = soapRequest.toString();
   	sendAjaxCall(intalio_bpms.formless_tasks.formValidation, "POST", false, true, "xml", data, handleAjaxError, function(response) {
			if($(response).find('status').text().indexOf("success")>=0){
				showNotification($('#userTaskStarted').text());
				workflowMetaData.completeSuccess();
			}
			else
				showErrorNotification($(response).find('message').text());
			removeLoading();
	});	
}

/**@Description   : This function will make a call to the server for dismissing notification**/
workflowMetaData.dismissNotification = function () {
	addLoading('.page-content');
	var data = {assembly:"formless",form:"none",message:""};
	var soapBody = new SOAPObject("completeRequest");
	soapBody.ns  = defaultsWorkflow.tmsNameSpace;
   	soapBody.appendChild(new SOAPObject("taskId").val(formlessTask.taskId));
   	soapBody.appendChild(new SOAPObject("participantToken").val(participantToken));
   	var soapRequest = new SOAPRequest(defaultsWorkflow.tmsNameSpace + "/completeRequest", soapBody);
   	data.message = soapRequest.toString();
   	sendAjaxCall(intalio_bpms.formless_tasks.formValidation, "POST", false, true, "xml", data, handleAjaxError, function(response) {
		if($(response).find('status').text().indexOf("success")>=0){
			if(formlessTask.formType=="ajax"){
				$('#notificationform').addClass('hide').attr('src','');
			}
			showNotification($('#userTaskDismissed').text());
			workflowMetaData.completeSuccess();
		}
		else{
			showErrorNotification($(response).find('message').text());
			removeLoading();
		}
	});
}

/**@Description   : This function will display count on atachments & comments**/
workflowMetaData.getCount = function () {
	sendAjaxCall(intalio_bpms.task_metadata.getAttachmentsCount.replace('{taskId}',formlessTask.taskId), "GET", false, true, "json", data, handleAjaxError, function(response) {
		$('span.attachmentCount').text(response.count);
	});

	var data ={moduleId:3,threadId:formlessTask.taskId};
	sendAjaxCall(intalio_bpms.task_metadata.getCommentsCount, "GET", false, true, "json", data, handleAjaxError, function(response) {
		$('span.commentCount').text(response.total);
	});	
}

/**@Description   : This function will wait until selector element is found & then calls callback function**/
workflowMetaData.waitForIframeToLoad = function(iframeId,selector,time,callback,count) {
	var htmlObj = 	$('#'+iframeId).contents().find("body");
    if(htmlObj.find(selector).length >=1 || count >=25) {
        setTimeout(function() {
        	callback(iframeId);
    	},time);
    	return false;
    }
    else {
    	setTimeout(function() {
            workflowMetaData.waitForIframeToLoad(iframeId,selector,time,callback,parseInt(count+1));
        }, time);
    }
}

workflowMetaData.validateFile = function (obj) {
	var ext = $(obj).val().match(/(?:\.([^.]+))?$/)[1];
	if(unSupportedExtensions.indexOf(ext)>=0){
		$("#attachmentFile").val('');
        showInformation($("#uTfileValidation").text());
    }
}

workflowMetaData.getProcessInfo = function () {
	addLoading(".utProcessInfo");
	modalShow("utProcessInfoModal");
	if(formlessTask.instanceId){
		sendAjaxCall(intalio_bpms.instances.getInstanceInfo.replace('{id}',formlessTask.instanceId),"GET", false, true, "json", {}, handleAjaxError, function(response){
			if(response && response.instance){
				$('#utProcessName').text(response.instance.processName);
				$('#utInstanceStarted').text($.format.date(response.instance.started, userPreferences.dateFormat+userPreferences.hourFormat));
				workflowMetaData.pid = response.instance.pid;
				$('#utProcessImage').find('.modal_heading').text('SVG: '+response.instance.processName);
			}
			removeLoading(".utProcessInfo");
		});
	}
}

workflowMetaData.getProcessImage = function () {
    $('#utSvg_container').empty();
    $('#utProcessImage .modal-dialog').css('height', $(window).height() - 20);
    modalShow('utProcessImage');
    addLoading($('#utSvg_container'));
    var data = {"id":workflowMetaData.pid};
    var url = intalio_bpms.task_metadata.getProcessImage.replace('{instanceId}',formlessTask.instanceId);
    sendAjaxCall(url,"GET", false, true, "xml", data, handleAjaxError, workflowMetaData.showProcessSVG);
}

workflowMetaData.showProcessSVG = function (data) {
   $('#utSvg_container').css('max-height', $(window).height() - 165);
   $('#utSvg_container').append($(data).find('svg'));
   removeLoading($('#utSvg_container'));
}

workflowMetaData.shareTask = function(bol, executedActionName) {
    $("#shareTaskModal .modal-footer").find("button").attr('onclick',"javascript:workflowMetaData.checkTaskStatus('shared')");
    $('#shareSpanTask').text('');
    userArray = new Array();
    if(!bol && formlessTask.taskId){
        addLoading($('#shareTaskModal .modal-body'));
        getShareTo();
    }
    else if (bol && $("#shareTo").val() == null)
        shareToError();
    else if (bol && $("#shareTo").val()) {
        addLoading($('#shareTaskModal .modal-body'));
        $('#shareSpanTask').text('');
        addPageLoading("tasks");
        responseCount = 0;
	    if (taskId)
            executeAction("share",formlessTask.taskId,"",1,executedActionName,false);
        modalHide("shareTaskModal");
    }
}

workflowMetaData.checkTaskStatus = function (type) {
	var url = intalio_bpms.task_metadata.getTaskStatus.replace('{taskId}',formlessTask.taskId);
	sendAjaxCall(url,"GET", false, true, "json", {}, handleAjaxError, function(data) {
		if(data && data.isCompleted=="true"){
			var nameObj = $.grep(data.users, function(e){return e.userID == data.completedBy});
			userName = nameObj.length==1 ? nameObj[0].userName : data.completedBy;
			showErrorNotification($("#completedMsg").text().replace('{0}',userName).replace('{1}',$.format.date(data.completedDate, userPreferences.dateFormat+userPreferences.hourFormat)));
			return false;
		}
		else if(type=="comments")
			workflowMetaData.addComments();
		else if(type=="attachments")
			workflowMetaData.addAttachment();
		else
			workflowMetaData.shareTask('true','shared');
	});
}
/** Description: Opens Adhoc Modal Dialog **/

workflowMetaData.openAdhocTaskDialog = function(bol, executedActionName) {
// alert("Hello");
var fontSelValues=[{id:"PRECEDING",value:"Before the current task"},{id:"PARALLEL",value:"In parallel with current task"},{id:"SUCCEEDING",value:"After the current task"}];
mon_lifeCycleObj = applySelectize($('#taskPlacement'),[],[],1,false, fontSelValues);

var mShareGroup = [{id: 'peers', name: 'Peers'},{id: 'subordinates',name: 'Subordinates'},{id: 'internal',name: 'Internal'},{id: 'external',name: 'External'}];
shareToObj = applySelectize($('#adhocAssignTo'),mShareGroup,["internal", "external","peers","subordinates"], 50, false,[]);
workflowMetaData.getAssignToData();

mon_lifeCycleObj.setValue('PRECEDING');
$('#adhocSpanTask').text("");
$('#adhocTaskDesc').val(formlessTask.description);
$("#adhocTaskNote").val("");
$("#useCurrentForm").prop('checked', false);
$("#useCurrentForm").val(false);
$('#createAdhocTaskModal').modal('show');
if(formlessTask.formType=="formless"){
	$("#currentFormRow").addClass("hide");
}else{
	$("#currentFormRow").removeClass('hide');
}
}


workflowMetaData.getAssignToData = function(){
var data = {},assignToData = {},roleData = {};
sendAjaxCall(intalio_bpms.task_filter.getAssignedToUsers, "GET", false, true, "json", data,handleAjaxError,function(data) {
assignToData["peers"] = data.users.peers;
assignToData["subordinates"] = data.users.subordinates;
sendAjaxCall(intalio_bpms.task_filter.getAssignedToRoles, "GET", false, true, "json", roleData, handleAjaxError, function(data) {
	if(data.roles){
    	assignToData["externalRoles"] = data.roles.external_roles;
    	assignToData["internalRoles"] = data.roles.internal_roles;
    	for (var k = 0; k < assignToData.subordinates.length; k++) {
        	$.each(assignToData.peers, function(key,value){
            	if (value!=undefined && value.userID == assignToData.subordinates[k].userID)
                	assignToData.peers.splice(key, 1);
        	});
    	}
	}
	workflowMetaData.populateAssignToData(assignToData);
});
});
}
workflowMetaData.populateAssignToData = function(data){
shareToObj.clearOptions();
if(data){
	workflowMetaData.assignToHelper(data.externalRoles,shareToObj,'external','roles');
	workflowMetaData.assignToHelper(data.internalRoles,shareToObj,'internal','roles');
	workflowMetaData.assignToHelper(data.subordinates,shareToObj,'subordinates','users');
	workflowMetaData.assignToHelper(data.peers,shareToObj,'peers','users');
	removeLoading();
}
}
workflowMetaData.assignToHelper = function(data,objRef,group,category){
for(var k=0;k<data.length;k++){
		var selectId = data[k].userID ? data[k].userID+"~"+category : data[k]+"~"+category;
	objRef.addOption({
    	id: selectId,
    	value: data[k].userName || data[k],
    	group: group
	});
}
}

workflowMetaData.isAdhocFormless = function(obj){
	if($(obj).is(':checked'))
		$(obj).attr('value',true)
	else
		$(obj).attr('value',false);
}
