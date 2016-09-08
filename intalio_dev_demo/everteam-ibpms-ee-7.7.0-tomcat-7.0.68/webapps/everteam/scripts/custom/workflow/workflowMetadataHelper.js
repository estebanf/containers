/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/*Workflow meta data webservice helper javascript */

var workflowMDWSHelper = {};

/*@Description  : This function will call another function to remove attachment*/
workflowMDWSHelper.removeAttachment = function (url,global) {
	workflowMDWSHelper.tasDeleteAttachment(url);
	workflowMDWSHelper.tmsDeleteAttachment(url,global);
}

/*@Description  : This function will call server to remove link for attachment in tas*/
workflowMDWSHelper.tasDeleteAttachment = function(url){
	var soapBody = new SOAPObject("deleteRequest");
	soapBody.ns  = defaultsWorkflow.tasNameSpace;
	var authBody = new SOAPObject("authCredentials");
	authBody.appendChild(new SOAPObject("participantToken").val(participantToken));
	soapBody.appendChild(new SOAPObject("attachmentURL").val(url.replace(/&/g, "&amp;")));
	soapBody.appendChild(authBody);
	var soapRequest = new SOAPRequest(defaultsWorkflow.tasNameSpace + "/deleteRequest", soapBody);
   var data = {assembly:"formless",form:formlessTask.taskURL.split('?')[0],message:soapRequest.toString()};
   sendAjaxCall(intalio_bpms.formless_tasks.formValidation, "POST", false, true, "xml", data, handleAjaxError, function(response) {
      if($(response).find('status').text()!="success"){
         showErrorNotification($(response).find('message').text());
      }
   });
}

/*@Description  : This function will call server to remove attachment in tms*/
workflowMDWSHelper.tmsDeleteAttachment = function(url,global){
	var soapBody = new SOAPObject("removeAttachmentRequest");
	soapBody.ns  = defaultsWorkflow.tmsNameSpace;	
	soapBody.appendChild(new SOAPObject("taskId").val(formlessTask.taskId));
	soapBody.appendChild(new SOAPObject("attachmentUrl").val(url.replace(/&/g, "&amp;")));
	soapBody.appendChild(new SOAPObject("participantToken").val(participantToken));
	soapBody.appendChild(new SOAPObject("globalAttachment").val(global));
	var soapRequest = new SOAPRequest(defaultsWorkflow.tmsNameSpace + "/removeAttachmentRequest", soapBody);
   var data = {assembly:"formless",form:formlessTask.taskURL.split('?')[0],message:soapRequest.toString()};
   sendAjaxCall(intalio_bpms.formless_tasks.formValidation, "POST", false, true, "xml", data, handleAjaxError, function(response) {
      if($(response).find('status').text()=="success"){
         showNotification($('#uTRemoveAttachment').text());
         workflowMetaData.getAttachments();
      }else
         showErrorNotification($(response).find('message').text());
   });
}