/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */
var productInfoTable;

var productInfoOptions = {
    "bPaginate": false,
    "bStateSave": true,
    "bInfo": false,
    "bFilter": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bRetrieve": true,
    "bAutoWidth": false,
    "bSort": false,
    "aoColumns": [ {
        "sClass": "alignLeft"
	}, {
        "sClass": "alignLeft"
	}]
};

var ProductInfos = {
	"serverId" : "Server ID",
	"macAddress" : "MAC Address",
	"clusterInfo" : "Cluster Mode",
	"startTime" : "Start Time",
	"numOfCpu" : "CPU Count",
	"osInfo" : "Operating System",
	"dbInfo" : "Database",
	"secuirtyProviderInfo" : "Security Provider",
	"licenseInfo" : "License"
}
/**
 * @Function Name   : starting function of jquery
 * @Description     : This function is used to initialize variables and set default values.
 * @param           : data list of processes
 * @returns         :
 * */
$(document).ready(function() {
	productInfoTable = $("#product_info").dataTable(productInfoOptions);
	customTable('product_info');
	$('#product_info_wrapper .row .tableButtons').append(productInfoButtonHeader("downloadProductInfo"));
	productInfo();
});

function productInfo(){
	addLoading($('#product_info_wrapper'));
	var data = {
	};
	sendAjaxCall("console/systemaudit", "GET", false, true, "json", data, handleProductInfoAjaxError, populateProductInfo);
}

function populateProductInfo(data){
	productInfoTable.fnClearTable();
	productInfoTable.fnFilter('');
	if(data.systemAudit != null && data.systemAudit != undefined){
		$('.dataTables_empty').text($('#fetchProductInfo').text());
		$.each(ProductInfos, function(key, val){
			var items = [];
			var value = data.systemAudit[key];
			if(typeof value == "string")
					value = value.replace(/[{}]/g, '');

			if(key === "secuirtyProviderInfo")
				value = value.replace(/provider_/g, '<br/>provider_').substring(5);

			items[items.length] = '<span>'+val+'</span>';
			if(key === 'startTime')
				items[items.length] = '<span>' + $.format.date(value, userPreferences.dateFormat+userPreferences.hourFormat) + '</span>';
			else
				items[items.length] = '<span>' + value + '</span>';
			productInfoTable.fnAddData(items, false);
		});
		productInfoTable.fnDraw(true);
	}
	$('#product_info_filter a').remove();
	$('#product_info_filter').append(productInfoButtonHeader("refreshProductInfo"));
	$('.dataTables_empty').text($('#NoProductInfoFound').text());
	removeLoading($('#product_info_wrapper'), false);
}

function handleProductInfoAjaxError(e) {
    showInformation(e.responseText);
    removeLoading('', true);
    return false;
}

function downlaodProductInfo(){
	window.location.href = 'console/systemaudit/download';
}
