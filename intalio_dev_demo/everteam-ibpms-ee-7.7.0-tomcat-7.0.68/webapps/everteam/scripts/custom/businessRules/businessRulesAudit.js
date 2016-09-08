/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


/** auditEndNumber is used to show the no of entries in table*/
var auditEndNumber;

/** auditStartNumber is used to show the no of entries in table*/
var auditStartNumber;

/** auditTotalRecords is used to calculate the pagination of audit log page*/
var auditTotalRecords;

/**pagination required data for audit log*/
var auditPaginationData = {
	start: 0,
	max: 10,
	orderBy: "-auditDate"
};

function auditBusinessRule(id, name){
	auditPaginationData.start = parseInt(0);
	auditPaginationData.orderBy = "-auditDate";
	auditID = id;
	$('#breAuditTableModal .modal_heading').text($('#auditModalHeader').text() + ': ' +name);
	$('#bre_audit_wrapper').find('.table_container').removeAttr( 'style' );
	fetchBusinessRulesAudit();
}


function fetchBusinessRulesAudit() {
	addLoading($('#bre_audit'));
	if (userCache != null && userCache != undefined && userCache.businessRulesAuditPageSize != null)
		auditPaginationData.max = parseInt(userCache.businessRulesAuditPageSize);
	else
		auditPaginationData.max = parseInt(10);
	sendAjaxCall("dtdeployment/audit/"+auditID, "GET", false, true, "json", auditPaginationData, handleBREAjaxError, fetchBusinessRulesAuditSuccess);
}

function fetchBusinessRulesAuditSuccess(data){
	businessRuleAuditTable = $("#bre_audit").dataTable(businessRulesAudit);
	customTable('bre_audit');
	$('#bre_audit .dataTables_empty').html($('#breFetchAudit').text());
	$('#bre_audit_wrapper').find('.table_container').removeAttr( 'style' );
	$('#bre_audit_wrapper').find('.table_refresh_icon').attr('onclick', 'refreshAuditLog();');
	$('#bre_audit_wrapper').find('.table_refresh_icon').attr('title', $('#refreshButton').text());
	if (data.error_message == undefined && data.error_message == null)
		formBusinessRulesAuditTable(data);
	else {
		showErrorNotification(data.error_message);
		removeLoading('', true);
		$('.dataTables_empty').text($('#auditNotFound').text())
	}
}

function formBusinessRulesAuditTable(data){
	modalShow('breAuditTableModal');
	businessRuleAuditTable.fnClearTable();
	businessRuleAuditTable.fnFilter('');
	$('#bre_audit_wrapper').find('.table_container').removeAttr( 'style' );
	$('#bre_audit_wrapper').find('.tableButtons').removeClass('col-sm-10').addClass('col-sm-9');
	if (data.total != undefined && data.total != null)
		auditTotalRecords = data.total;
	if (data.auditList != undefined) {
		$.each(data.auditList, function(key, val) {
			var items = [];
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
			businessRuleAuditTable.fnAddData(items, false);
		});
		businessRuleAuditTable.fnDraw(true);
		$('#bre_audit_filter').find('input').attr('onkeyup', 'javascript:updateAuditEntries()');
		$('#bre_audit_filter').find('input').attr('placeholder', $('#searchBRE').text());
        //this logic is to handle pagination for instances page
		var pagination = Math.ceil(auditTotalRecords / auditPaginationData.max);
		totalmax = pagination;
		if (pagination >= 1) {
			$('#bre_audit_pagination').remove();
			$('.auditPaginationRows').remove();
			if (auditPaginationData.start == parseInt(0)) {
				auditStartNumber = parseInt(auditPaginationData.start) + 1;
				if (parseInt(data.auditList.length) != parseInt(auditPaginationData.max))
					auditEndNumber = parseInt(data.auditList.length);
				else
					auditEndNumber = parseInt(auditPaginationData.max);
			} else {
				var page = parseInt(parseInt(auditPaginationData.start)-1);
				auditStartNumber = parseInt(parseInt(auditPaginationData.start) + 1);
				auditEndNumber = parseInt(parseInt(auditPaginationData.start) + data.auditList.length);
			}
			var brePageNum;
			if(parseInt(auditPaginationData.start) == 0)
				brePageNum = parseInt(parseInt(auditPaginationData.start) +1);
			else
				brePageNum = parseInt(parseInt(auditPaginationData.start)/parseInt(auditPaginationData.max) + 1);
			$("#bre_audit_wrapper .table_pagination").append("<span class='auditPaginationRows pull-left'><label>" + $('#entriesPerBREAuditPage').text() + "</label><select id='noOfBRERows' onchange=javscript:updateNoOfRows(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></span>");
			$("#bre_audit_wrapper .table_pagination").append("<div id='bre_audit_pagination' class='dataTables_paginate paging_bootstrap pull-right'></div>");
			$("#bre_audit_wrapper #bre_audit_pagination").append("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='auditFirstPage' title='First page' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getFirstPageAuditData();></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='auditPrevPage' title='Previous page' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getNextPrevPageAuditData('prev');></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'>"+$('#datatablePage').text()+" &nbsp;<input id='breAuditPageNo' type='text' role='textbox' onkeydown=javascript:getAuditPageNoData(event); value=" + brePageNum + " maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; "+$('#datatableOf').text()+" &nbsp;<span id='sp_1_grid-pager'>" + pagination + "</span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='auditNextPage' title='Next page' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPrevPageAuditData('next');></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='auditLastPage' title='Last page'class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastPageAuditData();></span></td></tr></tbody></table>");
			showAuditEntires(auditStartNumber, auditEndNumber);
			updateAuditPagintaion($('#breAuditPageNo').val(), pagination);
			$("select#noOfBRERows").val(auditPaginationData.max);
			applyNiceScroll($('#bre_audit_wrapper').find('.table_container'), 325);
        } else {
			$('#bre_audit_pagination').remove();
			$('#bre_audit_wrapper .auditPaginationRows').remove();
			$("#bre_audit_wrapper .showEntries").remove();
		}
	} else if(data.auditList != undefined && data.auditList.length == 0){
		$('#bre_audit_pagination').remove();
		$('.auditPaginationRows').remove();
		$("#bre_audit_wrapper .showEntries").remove();
	}else if (data.error_message != undefined) {
		showErrorNotification(data.error_message);
    }

    if(pagination == 1 && parseInt(data.auditList.length) <= 10){
		$('#bre_audit_wrapper').find('.table_container').attr('style', '{overflow: hidden; position: relative;}');
	}else if(pagination > 1){
		$('#bre_audit_wrapper').find('.table_container').css('height', $(window).height() - 325);
	}
    $('#bre_audit thead tr th').removeClass("sorting_asc").removeClass("sorting");
    $('.ace-popup').popover();
    $('#bre_audit .dataTables_empty').text($('#auditNotFound').text());
    removeLoading($('#breAuditTable'), true);
}

function refreshAuditLog(){
	addLoading('#bre_audit');
	auditPaginationData.start = parseInt(0);
	if (userCache != null && userCache != undefined && userCache.businessRulesAuditPageSize != null)
		auditPaginationData.max = parseInt(userCache.businessRulesAuditPageSize);
	else
		auditPaginationData.max = parseInt(10);
	sendAjaxCall("dtdeployment/audit/"+auditID, "GET", false, true, "json", auditPaginationData, handleBREAjaxError, fetchBusinessRulesAuditSuccess);
}

function showAuditEntires(startNumber, endNumber) {
    $("#bre_audit_wrapper .showEntries").remove();
    if (parseInt(endNumber) > parseInt(0)) {
        $("#bre_audit_wrapper .table_pagination").removeClass('hide');
        var message = $("#datatablePageInfo").text().replace('{0}',startNumber).replace('{1}',endNumber).replace('{2}',auditTotalRecords).replace('{3}',$("#businessRuleAuditPagination").text());
        $("#bre_audit_wrapper .table_pagination").append("<div class='showEntries'><label>"+message+"</label></div>");
    } else
        $("#bre_audit_wrapper .table_pagination").addClass('hide');
}

function updateAuditPagintaion(pageNo, totalPages) {
    if (pageNo == parseInt(1)) {
        $("#auditFirstPage").removeAttr("onclick");
        $("#auditPrevPage").removeAttr("onclick");
        $("#auditFirstPage").addClass("disabled");
        $("#auditPrevPage").addClass("disabled");
    }
    if (pageNo == totalPages) {
        $("#auditLastPage").removeAttr("onclick");
        $("#auditNextPage").removeAttr("onclick");
        $("#auditLastPage").addClass("disabled");
        $("#auditNextPage").addClass("disabled");
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
        userCache.businessRulesAuditPageSize = $('#noOfBRERows').val();
        $.jStorage.set($("#userid").text(), userCache);
    }
    auditPaginationData.max = $('#noOfBRERows').val();
    auditPaginationData.start = parseInt(0);
    fetchBusinessRulesAudit();
}

/** 
 * @Function Name   : getFirstPageAuditData
 * @Description     : This method is use to get first page data.
 * @param           :
 * @returns         :
 * */
function getFirstPageAuditData() {
    auditPaginationData.start = parseInt(0);
    fetchBusinessRulesAudit();
}

/** 
 * @Function Name   : getNextPrevPageAuditData
 * @Description     : This function is used to get the next page data for instances Audit
 * @param           :
 * @returns         :
 * */
function getNextPrevPageAuditData(action) {
    if ($('#breAuditPageNo').val() < totalmax && action == 'next') {
        auditPaginationData.start = parseInt($("#breAuditPageNo").val())*parseInt(auditPaginationData.max);
    } else if ($('#breAuditPageNo').val() > 1 && action == 'prev') {
        auditPaginationData.start = parseInt((parseInt($("#breAuditPageNo").val()) - 2)*parseInt(auditPaginationData.max));
    } else if ($('#breAuditPageNo').val() >= totalmax && action == 'next') {
        auditPaginationData.start = parseInt(totalmax);
    } else if ($('#breAuditPageNo').val() == 1 && action == 'prev') {
        auditPaginationData.start = parseInt(0);
    }
    fetchBusinessRulesAudit();
}

/** 
 * @Function Name   : getAuditPageNoData
 * @Description     : This function will get the task list of mentioned page no
 * @param           : event for enter
 * @returns         :
 * */
function getAuditPageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#breAuditPageNo").val() != "" && parseInt($("#breAuditPageNo").val()) <= Math.ceil(auditTotalRecords / auditPaginationData.max)) {
        auditPaginationData.start = (parseInt($("#breAuditPageNo").val())-1)*parseInt(auditPaginationData.max);;
        fetchBusinessRulesAudit();
    } else if ($("#breAuditPageNo").val() != "" && event.keyCode == parseInt(13) && parseInt($("#breAuditPageNo").val()) > Math.ceil(auditTotalRecords / auditPaginationData.max)) {
        auditPaginationData.start = parseInt(0);
        fetchBusinessRulesAudit();
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
    auditPaginationData.start = (Math.ceil(auditTotalRecords / auditPaginationData.max) -1)*parseInt(auditPaginationData.max);
    fetchBusinessRulesAudit();
}

/**
 * @Function Name   : updateAuditEntries
 * @Description     : This method is use to update numbers of entries.
 * @param           :
 * @returns         :
 * */
function updateAuditEntries() {
    showAuditEntires(startNumber, businessRuleAuditTable.fnSettings().fnRecordsDisplay());
}


function sortBusinessRulesAudit(obj, type){
	$('#bre_audit th span').addClass('hide');
    $('#bre_audit th span.lbl').removeClass('hide');
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
	auditPaginationData.orderBy = type;
    addLoading($('#bre_audit'));
	sendAjaxCall("dtdeployment/audit/"+auditID, "GET", false, true, "json", auditPaginationData, handleBREAjaxError, fetchBusinessRulesAuditSuccess);
}
