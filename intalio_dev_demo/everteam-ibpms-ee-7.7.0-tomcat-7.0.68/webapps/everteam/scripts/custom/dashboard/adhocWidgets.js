/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


//Add Adhoc Reports to the widgets list
var adhocWidgetsTable;
/**pagination required data for reports*/
var widgetPageData = {
    pageSize: 10,
    requiredPage: 1
};
/** totalPageSize holds the tolal page size*/
var totalPageSize;
/** totalRecords is used to calculate the pagination of instances page*/
var totalRecords;
/** endNumber is used to show the no of entries in table*/
var endNumber;
/** startNumber is used to show the no of entries in table*/
var startNumber;
var widgetsOptions = {
    "bPaginate": false,
    "bInfo": false,
    "bStateSave": true,
    "bFilter": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bAutoWidth": false,
    "aaSorting": [
        [0, "desc"]
    ],
    "aoColumns": [{
        "sWidth": width * 0.40,
        "bSortable": true,
        "sClass": "left"
    },{
        "sWidth": width * 0.40,
        "bSortable": true,
        "sClass": "left"
    },{
        "sWidth": width * 0.40,
        "bSortable": true,
        "sClass": "left"
    },{
		"sWidth": width * 0.20,
        "bSortable": false,
        "sClass": "left"
    }]
};

function getAdhocWidgets(flag){
	if(flag)
		widgetPageData.pageSize = 1;
	else
		widgetPageData.pageSize = 10;
	getAdhocWidgetsData(flag);
}

function getAdhocWidgetsData(flag){
	sendAjaxCall(intalio_bpms.adhoc_reporting.get_reports, "GET", false, true, "json", widgetPageData, adhocWidgetsError, function(data){
		if (data.total != undefined && data.total>0 && flag){
			$("#addwidgetdialog ul.nav").find("li#6 a span").text(data.total);
		}else
			populateWidgets(data);
	});
}

function adhocWidgetsError(data){
	if(data.error_message!=undefined)
		showErrorNotification(data.error_message);
}

function populateWidgets(data){
	if (data.total != undefined && data.total>0){
		totalRecords = data.total;
		$("#addwidgetdialog").find("ol#category-all").empty();
		$("#addwidgetdialog").find("ol#category-all").append("<li></li>");
		tableClone = $("#adhocReports").clone();
		$("#addwidgetdialog").find("ol#category-all li").append(tableClone);
		adhocWidgetsTable = $("#addwidgetdialog").find("#adhocReports").dataTable(widgetsOptions);
		$('.dataTables_empty').html("Fetching Report(s)...");
		customTable('adhocReports');
		if(data.reports.length>0){
			for (var i = 0; i < data.reports.length; i++) {
				var item = data.reports[i]
				var elms = []
				if (item.name != null)
					elms[elms.length] = item.name;
				else
					elms[elms.length] = "";
				if (item.description != null)
					elms[elms.length] = item.description;
				else
					elms[elms.length] = "";
				if (item.owner != null && item.owner.length != 0)
					elms[elms.length] = item.owner
				else
					elms[elms.length] = ''
				var btn = "<button type='button' data-id='"+item.id+"' data-name='"+item.name+"' data-desc='"+item.description+"' class='btn btn-primary btn-xs' onclick=javascript:adhocData(this)>"+$("#addButton").text()+"</button>";
				elms[elms.length] = btn;
				adhocWidgetsTable.fnAddData(elms, false);
			}
			adhocWidgetsTable.fnDraw(true);
			handlePagination(data);
		}
		$("#adhocReports_filter a").remove();
	}else{
		$('.dataTables_empty').html("No reports(s) found.");
		$('#reportsPagination').remove();
		$('.pageRows').remove();
		$("#adhocReports_wrapper .showEntries").remove();
	}
}

//this logic is to handle pagination for reports
function handlePagination(data) {
	var paginationObj = $("#addwidgetdialog").find("#adhocReports_wrapper .table_pagination");
	totalPageSize = Math.ceil(totalRecords / widgetPageData.pageSize);
	if (totalPageSize >= 1) {
		$('#reportsPagination').remove();
		$('.pageRows').remove();
		if (widgetPageData.requiredPage == parseInt(1)) {
			startNumber = widgetPageData.requiredPage;
			if (parseInt(data.reports.length) != parseInt(widgetPageData.pageSize))
				endNumber = parseInt(data.reports.length);
			else
				endNumber = parseInt(widgetPageData.pageSize);
		} else {
			var page = parseInt(parseInt(widgetPageData.requiredPage) - parseInt(1));
			startNumber = parseInt(page * parseInt(widgetPageData.pageSize) + 1);
			endNumber = parseInt(page * parseInt(widgetPageData.pageSize) + data.reports.length);
		}
		var pageHtml = $(".reportsPagination").clone();
		$(pageHtml).addClass("pageRows");
		var pagintaionHtml = $("#reportsPaginationTable").clone();
		$(pagintaionHtml).find("#pageNo").val(widgetPageData.requiredPage).end().find(".totalPageNo").text(totalPageSize);
		paginationObj.append(pageHtml).append("<div id='reportsPagination' class='dataTables_paginate paging_bootstrap pull-right'></div>");
		paginationObj.find("#reportsPagination").append(pagintaionHtml);
		showPaginationEntires(startNumber, endNumber, "adhocReports_wrapper", "Report(s)");
		updatePaginationTable($('#pageNo').val(), totalPageSize);
		$("select#totalReports").val(widgetPageData.pageSize);
		removeLoading();
		//applyNiceScroll($('#adhocReports_wrapper').find('.table_container'), 190);
	}
}

function getLastFirstPageData(action) {
    if (action === 'last')
        widgetPageData.requiredPage = Math.ceil(totalRecords / widgetPageData.pageSize);
    else if (action === 'first')
        widgetPageData.requiredPage = parseInt(1);
    getAdhocWidgetsData(false);
}

function getNextPrevPageData(action) {
    if (parseInt($('#pageNo').val()) > totalPageSize || $('#pageNo').val() == "")
        widgetPageData.requiredPage = parseInt(1);
    else if (action === 'next' && $('#pageNo').val() < totalPageSize)
        widgetPageData.requiredPage = parseInt($("#pageNo").val()) + 1;
    else if (action === 'prev' && $('#pageNo').val() > 1)
        widgetPageData.requiredPage = parseInt($("#pageNo").val()) - 1;
    getAdhocWidgetsData(false);
}

function getPageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#pageNo").val() != "" && parseInt($("#pageNo").val()) != 0 && parseInt($("#pageNo").val()) <= Math.ceil(totalRecords / widgetPageData.pageSize)) {
        widgetPageData.requiredPage = parseInt($("#pageNo").val());
        getAdhocWidgetsData(false);
    } else if ($("#pageNo").val() != "" && event.keyCode == parseInt(13) && (parseInt($("#pageNo").val()) === 0 || parseInt($("#pageNo").val()) > Math.ceil(totalRecords / widgetPageData.pageSize))) {
        widgetPageData.requiredPage = parseInt(1);
        getAdhocWidgetsData(false);
    } else if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105))
        event.preventDefault();
}

function updateTotalReports() {
    widgetPageData.pageSize = $('#totalReports').val();
    widgetPageData.requiredPage = parseInt(1);
    getAdhocWidgetsData(false);
}
