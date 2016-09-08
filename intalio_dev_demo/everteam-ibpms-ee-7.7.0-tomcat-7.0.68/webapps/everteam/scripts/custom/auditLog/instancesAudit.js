/**
 * Copyright (C) 2005-2014 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


/** width is used to set the width of each column in data tables*/
var width = 2000;

/** endNumber is used to show the no of entries in table*/
var endNumber;

/** startNumber is used to show the no of entries in table*/
var startNumber;

/** totalRecords is used to calculate the pagination of audit log page*/
var totalRecords;

/**pagination required data for audit log*/
var paginationData = {
    pageSize: 10,
    requiredPage: 1,
    auditType: 'instances'
};
/** used to store row data in datatable*/
var anOpen = [];
/** dataTable options for Instance Audit table */
var instancesAuditTableOptions = {
    "bPaginate": false,
    //"sScrollY" : $(window).height()-230,
    "bStateSave": true,
    "bInfo": false,
    "bFilter": true,
    "bRetrieve": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bAutoWidth": false,
    "aaSorting": [
        [2, "desc"]
    ],
    "aoColumns": [{
        "sWidth": width * 0.15,
        "bSortable": true,
        "sClass": "alignLeft"
    }, {
        "sWidth": width * 0.20,
        "bSortable": true,
        "sClass": "alignLeft"
    }, {
        "sWidth": width * 0.20,
        "bSortable": true,
        "sClass": "alignLeft"
    }, {
        "sWidth": width * 0.20,
        "bSortable": true,
        "sClass": "center"
    }, {
        "sWidth": width * 0.20,
        "bSortable": false,
        "sClass": "center"
    }]
};

/** stores the dataTable of Instance Audit Table */
var instancesAuditTable;

/**
 * @Function Name   : ready
 * @Description     : jquery ready function for Instances Auditing
 * @param           :
 * @returns         :
 * */
$(document).ready(function() {
    fetchInstancesAudit(true);
});
/**
 * @Function Name   : fetchInstancesAudit
 * @Description     : fetches Instances Audit data from server
 * @param           :
 * @returns         :
 * */
function fetchInstancesAudit(flag) {
    addLoading($('#instancesAuditTable'));
    if (flag) {
        paginationData.requiredPage = parseInt(1);
        if (userCache != null && userCache != undefined && userCache.insAuditPageSize != null)
            paginationData.pageSize = parseInt(userCache.insAuditPageSize);
        else
            paginationData.pageSize = parseInt(10);
        sendAjaxCall("console/audits", "GET", false, true, "json", paginationData, handleAjaxError, fetchInstancesAuditSuccess);
    } else
        sendAjaxCall("console/audits", "GET", false, true, "json", paginationData, handleAjaxError, formInstancesAuditTable);
}

/**
 * @Function Name   : fetchInstancesAuditSuccess
 * @Description     : success function of  fetchInstancesAudit()
 * @param           : data
 * @returns         :
 * */
function fetchInstancesAuditSuccess(data) {
    instancesAuditTable = $('#instances_audit_table').dataTable(instancesAuditTableOptions);
    $('.dataTables_empty').html("Fetching audit(s)...");
    customTable('instances_audit_table');
    $('#instances_audit_table_wrapper').find('.table_refresh_icon').attr('onclick', 'refreshAuditData();');
    $('#instances_audit_table_wrapper').find('.table_refresh_icon').attr('title', 'Refresh');
    if (data.error_message == undefined && data.error_message == null)
        formInstancesAuditTable(data);
    else {
        showErrorNotification(data.error_message);
        removeLoading('', true);
        $('.dataTables_empty').text('No Audit details Found.')
    }
}

/**
 * @Function Name   : formInstancesAuditTable
 * @Description     : Adds data to the datatable
 * @param           : data
 * @returns         :
 * */
function formInstancesAuditTable(data) {
    instancesAuditTable.fnClearTable();
    if (data.total != undefined && data.total != null)
        totalRecords = data.total;
    if (data.workflow_audit != undefined && data.workflow_audit.length > 0) {
        $.each(data.workflow_audit, function(key, value) {
            var items = [];
            if (value.actionPerformed != null)
                items[items.length] = value.actionPerformed;
            else
                items[items.length] = "";
            if (value.user != null)
                items[items.length] = '<a class="noDecoration" user="'+value.user+'" onclick=javascript:showUserProfile(this)>'+value.user+'</a>';
            else
                items[items.length] = '';
            items[items.length] = $.format.date(value.auditDate, userPreferences.dateFormat+userPreferences.hourFormat);
            if (value.instance != null && value.instance != undefined && value.instance.id != undefined)
                items[items.length] = '<a href="#" iid="' + value.instance.id + '" class="anchortagcolor" onclick="openInstancesId(this);">' + value.instance.id + '</a>';
            else if (value.instanceID != null && value.instanceID != undefined)
                items[items.length] = value.instanceID;
            else
                items[items.length] = '';
            items[items.length] = '<span class="action-buttons"><a href="#" class="noColor" onclick=getXmlDifference("' + value.id + '","' + value.variableName + '");><i class="fa fa-info-circle"></i></a></span>';
            instancesAuditTable.fnAddData(items, false);
        });
        $('#instances_audit_table_filter').find('input').attr('onkeyup', 'javascript:updateAuditEntries()');
        //this logic is to handle pagination for instances page
        var pagination = Math.ceil(totalRecords / paginationData.pageSize);
        totalPageSize = pagination;
        if (pagination >= 1) {
            $('#instances_pagination').remove();
            $('.paginationRows').remove();
            if (paginationData.requiredPage == parseInt(1)) {
                startNumber = paginationData.requiredPage;
                if (parseInt(data.workflow_audit.length) != parseInt(paginationData.pageSize))
                    endNumber = parseInt(data.workflow_audit.length);
                else
                    endNumber = parseInt(paginationData.pageSize);
            } else {
                var page = parseInt(parseInt(paginationData.requiredPage) - parseInt(1));
                startNumber = parseInt(page * parseInt(paginationData.pageSize) + 1);
                endNumber = parseInt(page * parseInt(paginationData.pageSize) + data.workflow_audit.length);
            }
            $("#instances_audit_table_wrapper .table_pagination").append("<span class='paginationRows'><label>" + $('#entriesPerAuditPage').text() + "</label><select id='noOfInstancesRows' onchange=javscript:updateNoOfRows(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></span>");
            $("#instances_audit_table_wrapper .table_pagination").append("<div id='instances_pagination' class='dataTables_paginate paging_bootstrap pull-right'></div>");
            $("#instances_audit_table_wrapper #instances_pagination").append("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' title='First page' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getFirstPageAuditData();></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' title='Previous page' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getNextPrevPageAuditData('prev');></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'>"+$('#datatablePage').text()+"&nbsp;<input id='instancesPageNo' type='text' role='textbox' onkeydown=javascript:getAuditPageNoData(event); value=" + paginationData.requiredPage + " maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; "+$('#datatableOf').text()+" &nbsp;<span id='sp_1_grid-pager'>" + pagination + "</span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' title='Next page' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPrevPageAuditData('next');></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' title='Last page'class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastPageAuditData();></span></td></tr></tbody></table>");
            showAuditEntires(startNumber, endNumber);
            updateAuditPagintaion($('#instancesPageNo').val(), pagination);
            $("select#noOfInstancesRows").val(paginationData.pageSize);
        } else {
            $('#instances_pagination').remove();
            $('.paginationRows').remove();
            $("#instances_audit_table_wrapper .showEntries").remove();
        }
		applyNiceScroll($('#instances_audit_table_wrapper').find('.table_container'), 190);
    } else if (data.error_message != undefined) {
        showErrorNotification(data.error_message);
    }
    instancesAuditTable.fnDraw(true);
    $('#instances_audit_table thead tr th').removeClass("sorting_asc").removeClass("sorting");
    $('.ace-popup').popover();
    removeLoading($('#instancesAuditTable'), true);
}

/**
 * @Function Name   : getXmlDifference
 * @Description     : shows the difference of xml files
 * @param           :
 * @returns         :
 * */
function getXmlDifference(auditId, variableName) {
    var previousXml;
    var updatedXml;
    var data = {};
    sendAjaxCall("console/audits/" + auditId + "?xmlRequest=previousXmlData", "GET", false, true, "json", data, handleAjaxError, function(response) {
        previousXml = response.workflow_audit_xml;
    });
    sendAjaxCall("console/audits/" + auditId + "?xmlRequest=newXmlData", "GET", false, true, "json", data, handleAjaxError, function(response) {
        updatedXml = response.workflow_audit_xml;
    });
    $('#variableXmlDiff .modal_heading').text($('#variableXmlDiffTitle').text() + ": " + variableName);
    modalShow('variableXmlDiff');
    $('#varXmlDifference').css('max-height', $(window).height() - 190);
    window.setTimeout(function() {
        previousXml = previousXml.replace(new RegExp("\\><", "gm"), ">\n<");
        updatedXml = updatedXml.replace(new RegExp("\\><", "gm"), ">\n<");
        $("#varXmlDifference").empty();
        CodeMirror.MergeView(document.getElementById("varXmlDifference"), {
            value: previousXml,
            origLeft: null,
            origRight: updatedXml,
            mode: 'text/html',
            lineWrapping: true,
            readOnly: "nocursor",
            tabMode: "indent",
            indentUnit: 3,
            highlightDifferences: true
        });
        $('#varXmlDifference .CodeMirror-merge-gap').empty();
        $('#varXmlDifference .CodeMirror-merge-pane:first').prepend('<span id="previousXml">' + $('#previousTitle').text() + '</span>');
        $('#varXmlDifference .CodeMirror-merge-pane-rightmost').prepend('<span id="updatedXml">' + $('#updatedTitle').text() + '</span>');
    }, 500);
}

/**
 * @Function Name   : refreshAuditData
 * @Description     : fetches workflow audit data from server (refresh)
 * @param           : data
 * @returns         :
 * */
function refreshAuditData(data) {
    paginationData.requiredPage = parseInt(1);
    if (userCache != null && userCache != undefined && userCache.insAuditPageSize != null)
        paginationData.pageSize = parseInt(userCache.insAuditPageSize);
    else
        paginationData.pageSize = parseInt(10);
    addLoading($('#instancesAuditTable'));
    sendAjaxCall("console/audits", "GET", false, true, "json", paginationData, handleAjaxError, formInstancesAuditTable);
}
/**
 * @Function Name   : handleAjaxError
 * @Description     : Ajax call error function
 * @param           : error data
 * @returns         :
 * */
function handleAjaxError(e) {
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
    $("#instances_audit_table_wrapper .showEntries").remove();
    if (parseInt(endNumber) > parseInt(0)) {
        $("#instances_audit_table_wrapper .table_pagination").removeClass('hide');
        var message = $("#datatablePageInfo").text().replace('{0}',startNumber).replace('{1}',endNumber).replace('{2}',totalRecords).replace('{3}',$("#instanceAuditPageInfo").text());
        $("#instances_audit_table_wrapper .table_pagination").append("<div class='showEntries'><label>"+message+"</label></div>");
    } else
        $("#instances_audit_table_wrapper .table_pagination").addClass('hide');
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
        userCache.insAuditPageSize = $('#noOfInstancesRows').val();
        $.jStorage.set($("#userid").text(), userCache);
    }
    paginationData.pageSize = $('#noOfInstancesRows').val();
    paginationData.requiredPage = parseInt(1);
    fetchInstancesAudit(false);
}

/** 
 * @Function Name   : getFirstPageAuditData
 * @Description     : This method is use to get first page data.
 * @param           :
 * @returns         :
 * */
function getFirstPageAuditData() {
    paginationData.requiredPage = parseInt(1);
    fetchInstancesAudit(false);
}

/** 
 * @Function Name   : getNextPrevPageAuditData
 * @Description     : This function is used to get the next page data for instances Audit
 * @param           :
 * @returns         :
 * */
function getNextPrevPageAuditData(action) {
    if ($('#instancesPageNo').val() < totalPageSize && action == 'next') {
        paginationData.requiredPage = parseInt(parseInt($("#instancesPageNo").val()) + 1);
    } else if ($('#instancesPageNo').val() > 1 && action == 'prev') {
        paginationData.requiredPage = parseInt(parseInt($("#instancesPageNo").val()) - 1);
    } else if ($('#instancesPageNo').val() >= totalPageSize && action == 'next') {
        paginationData.requiredPage = parseInt(totalPageSize);
    } else if ($('#instancesPageNo').val() == 1 && action == 'prev') {
        paginationData.requiredPage = parseInt(1);
    }
    fetchInstancesAudit(false);
}

/** 
 * @Function Name   : getAuditPageNoData
 * @Description     : This function will get the task list of mentioned page no
 * @param           : event for enter
 * @returns         :
 * */
function getAuditPageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#instancesPageNo").val() != "" && parseInt($("#instancesPageNo").val()) <= Math.ceil(totalRecords / paginationData.pageSize)) {
        paginationData.requiredPage = parseInt($("#instancesPageNo").val());
        fetchInstancesAudit(false);
    } else if ($("#instancesPageNo").val() != "" && event.keyCode == parseInt(13) && parseInt($("#instancesPageNo").val()) > Math.ceil(totalRecords / paginationData.pageSize)) {
        paginationData.requiredPage = parseInt(1);
        fetchInstancesAudit(false);
    } else if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
}

function openInstancesId(obj) {
    $('#auditInstaceId').text($(obj).attr('iid'));
    $('#instancesMenuTabID').closest('ul').closest('li').trigger('click');
    $('#instancesMenuTabID').trigger('click');
    //searchById();
}
/** 
 * @Function Name   : getLastPageAuditData
 * @Description     : This method is use to get last page data.
 * @param           :
 * @returns         :
 * */
function getLastPageAuditData() {
    paginationData.requiredPage = Math.ceil(totalRecords / paginationData.pageSize);
    fetchInstancesAudit(false);
}

/**
 * @Function Name   : updateAuditEntries
 * @Description     : This method is use to update numbers of entries.
 * @param           :
 * @returns         :
 * */
function updateAuditEntries() {
    showAuditEntires(startNumber, instancesAuditTable.fnSettings().fnRecordsDisplay());
}