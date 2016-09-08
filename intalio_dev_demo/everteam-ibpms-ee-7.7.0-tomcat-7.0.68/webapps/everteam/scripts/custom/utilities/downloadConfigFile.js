/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


/** configFileTable holds the reference of log file table*/
var configFileTable;

/** logFileOptions stores the data table options for log file table*/
var configFileOptions = {
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
			{"sClass": "alignLeft"}]
}

$(document).ready(function () {
	configFileTable = $("#configFileTable").dataTable(configFileOptions);
	customTable('configFileTable');
	//$('#configFileTable_filter').hide();
	$('#configFileTable_wrapper .row .tableButtons').append("<button type='button' class='btn btn-sm btn-white' onclick='downloadConfigFiles();return false' title='Download Log File'>"+$('#downloadConfigFileBtn').text()+"</button>");
	$('.dataTables_empty').html($('#fetchConfigFile').text());
	$('.logClass').css('margin-top',-6);
	addLoading($('#configFileTable'));
	getConfigFiles();
});

function getConfigFiles(){
	addLoading($('#configFileTable'));
	var data = {};
	sendAjaxCall('console/files/config', "GET", false, true, "json", data, handleConfigAjaxError, populateConfigFileList);
}
 /**
 * @Function Name   : downloadConfigFiles 
 * @Description     : This method is use download the select config files.
 * @param           : 
 * @returns         : 
 * */
function downloadConfigFiles(){
	var selectedRows = $('#configFileTable .row_selected');
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
		window.location.href = 'console/files/configuration/export?'+resources;
	else
		showInformation($('#selectConfigFile').text());
}

 /**
 * @Function Name   : populateConfigFileList 
 * @Description     : populate list of config files. 
 * @param           : 
 * @returns         : 
 * */
function populateConfigFileList(data){
	configFileTable.fnClearTable();
	if(data.configuration != null && data.configuration !=""){
		var index = 0;
		$.each(data.configuration, function(key, value){
			var items = [];
			items[items.length] = '<label class="position-relative logClass"><input class="ace" type="checkbox" onclick="updateHeaderCheckbox(this)" value="' + value + '" name="'+key+'" id="'+index+'" /><span class="lbl"></span></label>';
			items[items.length] = key;
			index++;
			configFileTable.fnAddData(items, false);
		});
		configFileTable.fnDraw(true);
		$('#configFileTable_filter').find('a').attr('onclick','javascript:getConfigFiles()');
	}
	$('.logClass').css({'margin-top':'-7px'});
	removeLoading($('#configFileTable'));
	applyNiceScroll($('#configFileTable_wrapper').find('.table_container'),170);
}

/**
 * @Function Name   : handleConfigAjaxError 
 * @Description     : handles all the error response for ajax calls in Download config file page
 * @param           : 
 * @returns         : 
 * */
function handleConfigAjaxError(e){
	showInformation(e.responseText);
	removeLoading('', true);
	return false;
}