/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/** 
 * @Function Name   : sendAjaxCall
 * @Description     : Each & every call to server will go through this function
 * @param           : url,datatype,data,callback functions.
 * @returns         :
 * */
function sendAjaxCall(url,type,cache,async,dataType,data,errorCallBack,successCallback,timeout) {
var ajaxTimeout;
if(timeout != null && timeout != undefined)
	ajaxTimeout = timeout;
else
	ajaxTimeout = 60000;
$.ajax({
	url: url,
	type: type,
	cache: cache,
	async: async,
	dataType: dataType,
	data: data,
	timeout:ajaxTimeout,
	beforeSend: function(xhr) {
		xhr.setRequestHeader('ajax', 'true');
		xhr.setRequestHeader('Accept', 'application/json');
	},
	error: function (e)	{
		removeLoading('',true);
		if(e.status==parseInt(401))
			submitActionToURL('login.htm','logOut');
		else if(e.status==parseInt(400))
			showInformation("Bad Request, Please check the URL.");
		else if(e.status==parseInt(503))
			showInformation("Unable to reach the server, Please Check.");
		else if(e.status==parseInt(0)){
			showInformation("Unable to process your request. Either server is busy or not reachable.");
			if($(".actInsBtn"))
				$(".actInsBtn").find("button").attr("disabled",false);
		}
		else if(e.status==parseInt(404))
			showInformation("Bad Request, Please check the URL.");
		else if(e.status==parseInt(500)){
			if(e.responseText!=null && e.responseText!="")
				$(".main-content").append(e.responseText);
			else
			showInformation("Internal server error occurred, Please check the error logs.");
		}
		else
			errorCallBack(e);
	},
	success: function (data) {
			successCallback(data);
		}
	});
}

