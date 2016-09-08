/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/** logFileTable holds the reference of log file table*/
var logFileTable;

/** logFileOptions stores the data table options for log file table*/
var logFileOptions = {
		"bPaginate": false,
		"bStateSave": true,
		"bInfo": false,
		"bFilter": true,
		"oLanguage": { "sSearch": "" },
		"bRetrieve":true,
		"bAutoWidth": false,
		"bSort":false,
		"aoColumns":
			[{"sClass": "center", sWidth: '20px'},
			{"sClass": "alignLeft"},{"sClass": "alignLeft"}]
}

$(document).ready(function () {
	logFileTable = $("#logFileTable").dataTable(logFileOptions);
	customTable('logFileTable');
	$('#logFileTable_filter').hide();
	$('#logFileTable_wrapper .row .tableButtons').append("<button type='button' class='btn btn-sm btn-white' onclick='downloadLogFile();return false' title='Download Log File'>"+$('#downloadLogFileBtn').text()+"</button>");
	$('.dataTables_empty').html("Fetching log file(s)...");
	addLoading($('#logFileTable'));
	getLogFiles();
});

/**
 * @Function Name   : getLogFiles 
 * @Description     : This method is use to get all log files. 
 * @param           : 
 * @returns         : 
 * */
function getLogFiles(){
	addLoading($('#logFileTable'));
	var data = {
	};
	sendAjaxCall('console/files/logs', "GET", false, true, "json", data, handleLogAjaxError, populateLogFile);
}

 /**
 * @Function Name   : downloadLogFile 
 * @Description     : Download the selected log file. 
 * @param           : 
 * @returns         : 
 * */
function downloadLogFile(){
	var selectedRows = $('#logFileTable .row_selected');
	var resources = "";
	$.each(selectedRows, function(key, row){
		var resourceDetails;
		if(resources == "")
			resourceDetails = "resource[]="+$(row).find('input').attr('id');
		else
			resourceDetails = "&resource[]="+$(row).find('input').attr('id');
		resources += resourceDetails;
	});
	
	if(resources != "")
		window.location.href = 'console/files/log/export?'+resources;
	else
		showInformation($('#selectLogFile').text());
}

 /**
 * @Function Name   : populateLogFile 
 * @Description     : populate list of log files. 
 * @param           : 
 * @returns         : 
 * */
function populateLogFile(data){
	logFileTable.fnClearTable();
	if(data != null && data !=""){
		var index = 0;
		$.each(data, function(key, value){
			var items = [];
			items[items.length] = '<label class="position-relative logClass"><input class="ace" type="checkbox" onclick="updateHeaderCheckbox(this)" value="' + value.path + '" name="'+key+'" id="'+index+'" /><span class="lbl"></span></label>';
			items[items.length] = key;
			items[items.length] = $.format.date(value.lastModified, userPreferences.dateFormat+userPreferences.hourFormat);
			index++;
			logFileTable.fnAddData(items, false);
		});
		
		logFileTable.fnDraw(true);
	}
	$('.logClass').css({'margin-top':'-7px'});
	removeLoading($('#logFileTable'));
}

/**
 * @Function Name   : handleLogAjaxError 
 * @Description     : handles all the error response for ajax calls in Download Log file page
 * @param           : 
 * @returns         : 
 * */
function handleLogAjaxError(e){
	showInformation(e.responseText);
	removeLoading('', true);
	return false;
}
