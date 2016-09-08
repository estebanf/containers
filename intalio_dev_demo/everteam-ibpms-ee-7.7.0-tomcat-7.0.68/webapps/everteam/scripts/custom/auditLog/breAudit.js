/**
 * Copyright (C) 2005-2014 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/** endNumber is used to show the no of entries in table*/
var endNumber;

/** startNumber is used to show the no of entries in table*/
var startNumber;

/** totalRecords is used to calculate the pagination of audit log page*/
var totalRecords;

/**pagination required data for audit log*/
var paginationData = {
    start: 0,
    max: 10,
    orderBy: "-auditDate"
};

/** dataTable options for Business Rules Audit table */
var breAuditTableOptions = {
	"bPaginate": false,
	"bStateSave": true,
	"bInfo": false,
	"bFilter": true,
	"bRetrieve": true,
	"bSort": false,
	"oLanguage": {
		"sSearch": ""
	},
	"bAutoWidth": false,
	"aoColumns": [{
		"sClass": "alignLeft"
	}, {
		"sClass": "alignLeft"
	}, {
		"sClass": "alignLeft"
	}, {
		"sClass": "alignLeft"
	}]
};

/** stores the dataTable of Instance Audit Table */
var breAuditTable;

/**
 * @Function Name   : ready
 * @Description     : jquery ready function for Instances Auditing
 * @param           :
 * @returns         :
 * */
$(document).ready(function() {
	fetchBREAudit();
});
/**
 * @Function Name   : fetchBREAudit
 * @Description     : fetches Instances Audit data from server
 * @param           :
 * @returns         :
 * */
function fetchBREAudit() {
	addLoading($('#business_rules_audit'));
	if (userCache != null && userCache != undefined && userCache.breAuditPageSize != null)
		paginationData.max = parseInt(userCache.breAuditPageSize);
	else
		paginationData.max = parseInt(10);
	sendAjaxCall("dtdeployment/audit", "GET", false, true, "json", paginationData, handleBREAuditAjaxError, fetchBREAuditSuccess);
}

/**
 * @Function Name   : fetchBREAuditSuccess
 * @Description     : success function of  fetchBREAudit()
 * @param           : data
 * @returns         :
 * */
function fetchBREAuditSuccess(data) {
    breAuditTable = $('#business_rules_audit').dataTable(breAuditTableOptions);
    $('.dataTables_empty').html("Fetching audit(s)...");
    customTable('business_rules_audit');
    $('#business_rules_audit_wrapper').find('.table_refresh_icon').attr('onclick', 'refreshAuditData();');
    $('#business_rules_audit_wrapper').find('.table_refresh_icon').attr('title', 'Refresh');
    if (data.error_message == undefined && data.error_message == null)
        formbreAuditTable(data);
    else {
        showErrorNotification(data.error_message);
        removeLoading('', true);
        $('.dataTables_empty').text('No Audit details Found.')
    }
}

function refreshAuditData(){
	paginationData.start = parseInt(0);
	if (userCache != null && userCache != undefined && userCache.breAuditPageSize != null)
		paginationData.max = parseInt(userCache.breAuditPageSize);
	else
		paginationData.max = parseInt(10);
	addLoading($('#business_rules_audit'));
	sendAjaxCall("dtdeployment/audit", "GET", false, true, "json", paginationData, handleBREAuditAjaxError, fetchBREAuditSuccess);
    
}

/**
 * @Function Name   : formbreAuditTable
 * @Description     : Adds data to the datatable
 * @param           : data
 * @returns         :
 * */
function formbreAuditTable(data) {
	breAuditTable.fnClearTable();
	breAuditTable.fnFilter('');
	if (data.total != undefined && data.total != null)
		totalRecords = data.total;
	if (data.auditList != undefined && data.auditList.length > 0) {
		$.each(data.auditList, function(key, val) {
			var items = [];
			items[items.length] = val.decisionTableName;
			items[items.length] = val.action;
			var performedBy;
			if(data.userList != undefined && data.userList.length >= 0){
				nameObj = $.grep(data.userList, function(e){
					return e.userID == val.userName;
				});
			}
			performedBy = nameObj.length==1 ? nameObj[0].userName : val.userName;
			items[items.length] = '<a class="noDecoration" user="'+val.userName+'" onclick=javascript:showUserProfile(this)>'+performedBy+'</a>';
			items[items.length] = $.format.date(val.auditDate, userPreferences.dateFormat+userPreferences.hourFormat);
			breAuditTable.fnAddData(items, false);
		});
		$('#business_rules_audit_filter').find('input').attr('onkeyup', 'javascript:updateAuditEntries()');
        //this logic is to handle pagination for instances page
		var pagination = Math.ceil(totalRecords / paginationData.max);
		totalmax = pagination;
		if (pagination >= 1) {
			$('#bre_pagination').remove();
			$('.paginationRows').remove();
			if (paginationData.start == parseInt(0)) {
				startNumber = parseInt(paginationData.start) + 1;
				if (parseInt(data.auditList.length) != parseInt(paginationData.max))
					endNumber = parseInt(data.auditList.length);
				else
					endNumber = parseInt(paginationData.max);
			} else {
				var page = parseInt(parseInt(paginationData.start)-1);
				startNumber = parseInt(parseInt(paginationData.start) + 1);
				endNumber = parseInt(parseInt(paginationData.start) + data.auditList.length);
			}
			var brePageNum;
			if(parseInt(paginationData.start) == 0)
				brePageNum = parseInt(parseInt(paginationData.start) +1);
			else
				brePageNum = parseInt(parseInt(paginationData.start)/parseInt(paginationData.max) + 1);
			$("#business_rules_audit_wrapper .table_pagination").append("<span class='paginationRows'><label>" + $('#entriesPerBREAuditPage').text() + "</label><select id='noOfBRERows' onchange=javscript:updateNoOfRows(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></span>");
			$("#business_rules_audit_wrapper .table_pagination").append("<div id='bre_pagination' class='dataTables_paginate paging_bootstrap pull-right'></div>");
			$("#business_rules_audit_wrapper #bre_pagination").append("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' title='First page' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getFirstPageAuditData();></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' title='Previous page' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getNextPrevPageAuditData('prev');></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'>"+$('#datatablePage').text()+"&nbsp;<input id='brePageNo' type='text' role='textbox' onkeydown=javascript:getAuditPageNoData(event); value=" + brePageNum + " maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; "+$('#datatableOf').text()+" &nbsp;<span id='sp_1_grid-pager'>" + pagination + "</span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' title='Next page' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPrevPageAuditData('next');></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' title='Last page'class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastPageAuditData();></span></td></tr></tbody></table>");
			showAuditEntires(startNumber, endNumber);
			updateAuditPagintaion($('#brePageNo').val(), pagination);
			$("select#noOfBRERows").val(paginationData.max);
        } else {
			$('#bre_pagination').remove();
			$('.paginationRows').remove();
			$("#business_rules_audit_wrapper .showEntries").remove();
		}
		applyNiceScroll($('#business_rules_audit_wrapper').find('.table_container'), 190);
	} else if (data.error_message != undefined) {
		showErrorNotification(data.error_message);
    }
    breAuditTable.fnDraw(true);
    $('#instances_audit_table thead tr th').removeClass("sorting_asc").removeClass("sorting");
    $('.ace-popup').popover();
    applyNiceScroll($('#business_rules_audit_wrapper').find('.table_container'), 190);
    removeLoading($('#breAuditTable'), true);
}

/**
 * @Function Name   : handleBREAuditAjaxError
 * @Description     : Ajax call error function
 * @param           : error data
 * @returns         :
 * */
function handleBREAuditAjaxError(e) {
    showInformation(e.responseText);
    removeLoading('', true);
    return false;
}
/**
 * @Function Name   : showAuditEntires
 * @Description     : This method is use to show numbers of entries.
 * @param           :
 * @returns         :
 * */
function showAuditEntires(startNumber, endNumber) {
    $("#business_rules_audit_wrapper .showEntries").remove();
    if (parseInt(endNumber) > parseInt(0)) {
        $("#business_rules_audit_wrapper .table_pagination").removeClass('hide');
        var message = $("#datatablePageInfo").text().replace('{0}',startNumber).replace('{1}',endNumber).replace('{2}',totalRecords).replace('{3}',$("#breAuditPagination").text());
        $("#business_rules_audit_wrapper .table_pagination").append("<div class='showEntries'><label>"+message+"</label></div>");
    } else
        $("#business_rules_audit_wrapper .table_pagination").addClass('hide');
}

/** 
 * @Function Name   : updateAuditPagintaion
 * @Description     : updates the pagination buttons
 * @param           :
 * @returns         :
 * */
function updateAuditPagintaion(pageNo, totalPages) {
    if (pageNo == parseInt(1)) {
        $("#firstPage").removeAttr("onclick");
        $("#prevPage").removeAttr("onclick");
        $("#firstPage").addClass("disabled");
        $("#prevPage").addClass("disabled");
    }
    if (pageNo == totalPages) {
        $("#lastPage").removeAttr("onclick");
        $("#nextPage").removeAttr("onclick");
        $("#lastPage").addClass("disabled");
        $("#nextPage").addClass("disabled");
    }
}

/**
 * @Function Name   : updateNoOfRows
 * @Description     : This method is use to update numbers of rows.
 * @param           :
 * @returns         :
 * */
function updateNoOfRows() {
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.breAuditPageSize = $('#noOfBRERows').val();
        $.jStorage.set($("#userid").text(), userCache);
    }
    paginationData.max = $('#noOfBRERows').val();
    paginationData.start = parseInt(0);
    fetchBREAudit(false);
}

/** 
 * @Function Name   : getFirstPageAuditData
 * @Description     : This method is use to get first page data.
 * @param           :
 * @returns         :
 * */
function getFirstPageAuditData() {
    paginationData.start = parseInt(0);
    fetchBREAudit();
}

/** 
 * @Function Name   : getNextPrevPageAuditData
 * @Description     : This function is used to get the next page data for instances Audit
 * @param           :
 * @returns         :
 * */
function getNextPrevPageAuditData(action) {
    if ($('#brePageNo').val() < totalmax && action == 'next') {
        paginationData.start = parseInt($("#brePageNo").val())*parseInt(paginationData.max);
    } else if ($('#brePageNo').val() > 1 && action == 'prev') {
        paginationData.start = parseInt((parseInt($("#brePageNo").val()) - 2)*parseInt(paginationData.max));
    } else if ($('#brePageNo').val() >= totalmax && action == 'next') {
        paginationData.start = parseInt(totalmax);
    } else if ($('#brePageNo').val() == 1 && action == 'prev') {
        paginationData.start = parseInt(0);
    }
    fetchBREAudit();
}

/** 
 * @Function Name   : getAuditPageNoData
 * @Description     : This function will get the task list of mentioned page no
 * @param           : event for enter
 * @returns         :
 * */
function getAuditPageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#brePageNo").val() != "" && parseInt($("#brePageNo").val()) <= Math.ceil(totalRecords / paginationData.max)) {
        paginationData.start = (parseInt($("#brePageNo").val())-1)*parseInt(paginationData.max);
        fetchBREAudit();
    } else if ($("#brePageNo").val() != "" && event.keyCode == parseInt(13) && parseInt($("#brePageNo").val()) > Math.ceil(totalRecords / paginationData.max)) {
        paginationData.start = parseInt(0);
        fetchBREAudit();
    } else if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
}

/** 
 * @Function Name   : getLastPageAuditData
 * @Description     : This method is use to get last page data.
 * @param           :
 * @returns         :
 * */
function getLastPageAuditData() {
    paginationData.start = (Math.ceil(totalRecords / paginationData.max) -1)*parseInt(paginationData.max);
    fetchBREAudit();
}

/**
 * @Function Name   : updateAuditEntries
 * @Description     : This method is use to update numbers of entries.
 * @param           :
 * @returns         :
 * */
function updateAuditEntries() {
    showAuditEntires(startNumber, breAuditTable.fnSettings().fnRecordsDisplay());
}

function sortBREAudit(obj, type){
	$('#business_rules_audit th span').addClass('hide');
    $('#business_rules_audit th span.lbl').removeClass('hide');
    $(obj).find('span').removeClass('hide');
    if ($(obj).attr('sort') == 'desc') {
        $(obj).find('span i').removeAttr('class').addClass('fa fa-sort-up blue');
        $(obj).attr('sort', 'asc');
        type = '+' + type;
    } else {
        $(obj).find('span i').removeAttr('class').addClass('fa fa-sort-down blue');
        $(obj).attr('sort', 'desc');
        type = '-' + type;
    }
	paginationData.orderBy = type;
    addLoading($('#business_rules_audit'));
	sendAjaxCall("dtdeployment/audit", "GET", false, true, "json", paginationData, handleBREAuditAjaxError, fetchBREAuditSuccess);
}
