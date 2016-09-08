/**
 * Copyright (C) 2005-2015 Intalio inc.
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

var userNameData;
/**pagination required data for audit log*/
var paginationData = {
    pageSize: 10,
    requiredPage: 1,
    auditType: 'workflow'
};
/** used to store row data in datatable*/
var anOpen = [];
/** dataTable options for workflow Audit table */
var workflowAuditTableOptions = {
    "bPaginate": false,
    "bInfo": false,
    "bFilter": true,
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

/** stores the dataTable of workflow Audit Table */
var workflowAuditTable;

/**
 * @Function Name   : ready
 * @Description     : jquery ready function for workflow Auditing
 * @param           :
 * @returns         :
 * */
$(document).ready(function() {
    fetchWorkflowAudit(true);
});

/**
 * @Function Name   : fetchWorkflowAudit
 * @Description     : fetches workflow Audit data from server
 * @param           :
 * @returns         :
 * */
function fetchWorkflowAudit(flag) {
    addLoading($('#workflowAuditTable'));
    if (flag) {
        paginationData.requiredPage = parseInt(1);
        if (userCache != null && userCache != undefined && userCache.auditPageSize != null)
            paginationData.pageSize = parseInt(userCache.auditPageSize);
        else
            paginationData.pageSize = parseInt(10);
        sendAjaxCall("console/audits", "GET", false, true, "json", paginationData, handleAjaxError, fetchWorkflowAuditSuccess);
    } else
        sendAjaxCall("console/audits", "GET", false, true, "json", paginationData, handleAjaxError, formWorkflowAuditTable);
}

/**
 * @Function Name   : fetchWorkflowAuditSuccess
 * @Description     : success function of  fetchWorkflowAudit()
 * @param           : data
 * @returns         :
 * */
function fetchWorkflowAuditSuccess(data) {
    workflowAuditTable = $('#workflow_audit_table').dataTable(workflowAuditTableOptions);
    $('.dataTables_empty').html("Fetching audit(s)...");
    customTable('workflow_audit_table');
    $('#workflow_audit_table_wrapper').find('.table_refresh_icon').attr('onclick', 'refreshAuditData();');
    $('#workflow_audit_table_wrapper').find('.table_refresh_icon').attr('title', 'Refresh');
    if (data.error_message == undefined && data.error_message == null)
        formWorkflowAuditTable(data);
    else {
        showErrorNotification(data.error_message);
        removeLoading('', true);
        $('.dataTables_empty').text('No Audit details Found.')
    }
}

/**
 * @Function Name   : formWorkflowAuditTable
 * @Description     : Adds data to the datatable
 * @param           : data
 * @returns         :
 * */
function formWorkflowAuditTable(data) {
    workflowAuditTable.fnClearTable();
    if (data.total != undefined && data.total != null)
        totalRecords = data.total;
        userNameData = data.users;
    if (data.workflow_audit != undefined && data.workflow_audit.length > 0) {
        $.each(data.workflow_audit, function(key, value) {
            var items = [];
            if (value.actionPerformed != null)
                items[items.length] = value.actionPerformed;
            else
                items[items.length] = "";
            var nameObj = [];
            if(value.user){
                if(data.users!=undefined && data.users.length>=0)
                    nameObj = $.grep(data.users, function(e){return e.userID == value.user});
                name = nameObj.length==1 ? nameObj[0].userName : value.user;
                if(name){
                    if (name != 'PROCESS')
                        items[items.length] = '<a class="anchortagcolor" user="'+value.user+'" onclick=javascript:showUserProfile(this)>'+name+'</a>';
                    else
                        items[items.length] = name;
                }else
                    items[items.length] = '';
            }else
                items[items.length] = '';
            items[items.length] = $.format.date(value.auditDate, userPreferences.dateFormat+userPreferences.hourFormat);
            if (value.task) {
                if (value.task.description)
                    items[items.length] = value.task.description;
                else
                    items[items.length] = $("#noDescriptionMsg").text();
            }
            else if(value.updatedDescription){
                items[items.length] = value.updatedDescription;
            }else
                items[items.length] = $("#noDescriptionMsg").text();
            if (value.instance != null && value.instance != undefined && value.instance.id != undefined)
                items[items.length] = '<a href="#" iid="' + value.instance.id + '" class="anchortagcolor" onclick="openWorkflowId(this);">' + value.instance.id + '</a>';
            else
                items[items.length] = '';
            items[items.length] = '<span class="action-buttons"><a onclick="fetchWorkflowInfo(this);" key=' + key + ' class="noDecoration iconCursor"><i title="Expand" class="fa fa-plus"></i></a></sapn>';
            if (value.hasOwnProperty('task')) {
                if (value.task != null && value.task != undefined) {
                    if (value.task.creationDate != null && value.task.creationDate != undefined)
                        items[items.length] = $.format.date(value.task.creationDate, userPreferences.dateFormat+userPreferences.hourFormat);
                    else
                        items[items.length] = '-';
                    if (value.task.formURL != null && value.task.formURL != undefined)
                        items[items.length] = value.task.formURL;
                    else
                        items[items.length] = '-';
                    if (value.task.taskId != null && value.task.taskId != undefined)
                        items[items.length] = value.task.taskId;
                    else
                        items[items.length] = '-';
                } else {
                    items[items.length] = '';
                    items[items.length] = '';
                    items[items.length] = '';
                }
            } else {
                items[items.length] = '';
                items[items.length] = '';
                items[items.length] = '';
            }
            var nameArray = [];
            if (value.assignedUsers != null)
                items[items.length] = value.assignedUsers;
            else
                items[items.length] = '';
            if (value.assignedRoles != null)
                items[items.length] = value.assignedRoles;
            else
                items[items.length] = '';
            if (value.updatedState == "CLAIMED")
                items[items.length] = '<span class="action-buttons"><a class="text-warning ace-popup iconCursor title="" data-placement="bottom" data-content="CLAIMED" data-trigger="hover"><i class="fa-zoom-in fa fa-lock bigger-140 orange"></i></a></span>';
            else if (value.updatedState == "READY")
                items[items.length] = '<span class="action-buttons"><a class="text-success ace-popup iconCursor" title="" data-placement="bottom" data-content="READY" data-trigger="hover"><i class="fa-zoom-in fa fa-check-circle bigger-125 green"></i></a></span>';
            else if(value.updatedState == "ESCALATED")
                items[items.length] = '<span class="action-buttons"><a class="text-success ace-popup iconCursor" title="" data-placement="bottom" data-content="ESCALATED" data-trigger="hover"><i class="fa-zoom-in fa fa-arrow-circle-up bigger-125 blue"></i></a></span>';
            else
                items[items.length] = '';

            if (value.updatedPriority != "" && value.updatedPriority != null) {
                if (parseInt(value.updatedPriority) >= parseInt(51))
                    items[items.length] = "<i class='fa fa-circle bigger-125 red redOpacity iconCursor ace-popup' value='" + value.updatedPriority + "' title='' data-placement='bottom' data-content='Critical' data-trigger='hover'></i>";
                else if (parseInt(value.updatedPriority) >= parseInt(31) && parseInt(value.updatedPriority) <= parseInt(50))
                    items[items.length] = "<i class='fa fa-circle bigger-125 orange orangeOpacity iconCursor ace-popup' value='" + value.updatedPriority + "' title='' data-placement='bottom' data-content='Important' data-trigger='hover'></i>";
                else if (parseInt(value.updatedPriority) >= parseInt(11) && parseInt(value.updatedPriority) <= parseInt(30))
                    items[items.length] = "<i class='fa fa-circle bigger-125 green greenOpacity iconCursor ace-popup' value='" + value.updatedPriority + "' title='' data-placement='bottom' data-content='Normal' data-trigger='hover'></i>";
                else if (parseInt(value.updatedPriority) <= parseInt(10))
                    items[items.length] = "<i class='fa fa-circle bigger-125 blue blueOpacity iconCursor ace-popup' value='" + value.updatedPriority + "' title='' data-placement='bottom' data-content='Low' data-trigger='hover'></span>";
            } else
                items[items.length] = "";
            if (value.task != null && value.task != undefined) {
                if (value.task.description != null && value.task.description != undefined)
                    items[items.length] = value.task.description;
                else
                    items[items.length] = '';
            } else {
                items[items.length] = '';
            }
            workflowAuditTable.fnAddData(items, false);
        });
        $('#workflow_audit_table_filter').find('input').attr('onkeyup', 'javascript:updateAuditEntries()');
        //this logic is to handle pagination for workflow page
        var pagination = Math.ceil(totalRecords / paginationData.pageSize);
        totalPageSize = pagination;
        if (pagination >= 1) {
            $('#workflow_pagination').remove();
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
            $("#workflow_audit_table_wrapper .table_pagination").append("<span class='paginationRows'><label>" + $('#entriesPerAuditPage').text() + "</label><select id='noOfWorkflowRows' onchange=javscript:updateNoOfRows(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></span>");
            $("#workflow_audit_table_wrapper .table_pagination").append("<div id='workflow_pagination' class='dataTables_paginate paging_bootstrap pull-right'></div>");
            $("#workflow_audit_table_wrapper #workflow_pagination").append("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' title='First page' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getFirstPageAuditData();></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' title='Previous page' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getNextPrevPageAuditData('prev');></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'>"+$('#datatablePage').text()+"&nbsp;<input id='workflowPageNo' type='text' role='textbox' onkeydown=javascript:getAuditPageNoData(event); value=" + paginationData.requiredPage + " maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; "+$('#datatableOf').text()+" &nbsp;<span id='sp_1_grid-pager'>" + pagination + "</span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' title='Next page' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPrevPageAuditData('next');></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' title='Last page'class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastPageAuditData();></span></td></tr></tbody></table>");
            showAuditEntires(startNumber, endNumber);
            updateAuditPagintaion($('#workflowPageNo').val(), pagination);
            $("select#noOfWorkflowRows").val(paginationData.pageSize);
        } else {
            $('#workflow_pagination').remove();
            $('.paginationRows').remove();
            $("#workflow_audit_table_wrapper .showEntries").remove();
        }
    } else if (data.error_message != undefined) {
        showErrorNotification(data.error_message);
    }
    workflowAuditTable.fnDraw(true);
    $('#workflow_audit_table thead tr th').removeClass("sorting_asc").removeClass("sorting");
    $('.ace-popup').popover();
    removeLoading($('#workflowAuditTable'));
    applyNiceScroll($('#workflow_audit_table_wrapper').find('.table_container'), 190);
}

/**
 * @Function Name   : fetchInsatnceInfo
 * @Description     : Displays the task info for selected workflow
 * @param           : object
 * @returns         :
 * */

function fetchWorkflowInfo(object) {
    var nTr = object.parentNode.parentNode.parentNode;
    var i = $.inArray(nTr, anOpen);
    if (i === -1) {
        $(object).html('<i class="fa fa-minus" title="Collapse"></i>');
        var nDetailsRow = workflowAuditTable.fnOpen(nTr, fnFormatDetailsAudit(workflowAuditTable, nTr), 'details');
        $('div.innerDetails', nDetailsRow).slideDown();
        anOpen.push(nTr);
    } else {
        $(object).html('<i class="fa fa-plus"></i>')
        $('div.innerDetails', $(nTr).next()[0]).slideUp(function() {
            workflowAuditTable.fnClose(nTr);
            anOpen.splice(i, 1);
        });
    }
    $('.ace-popup').popover();
    $(nTr).next().find('td').css('background-color', '#ffffff');
}
/**
 * @Function Name   : fnFormatDetailsAudit
 * @Description     : format the details of an workflow
 * @param           : table , row
 * @returns         :
 * */

function fnFormatDetailsAudit(oTable, nTr) {
    var oData = oTable.fnGetData(nTr);
    if (oData == null || oData == "" || oData == " ")
        return false;
    else {
        var out = $('#workflowAuditDetails').clone();
        $(out).removeAttr('id');
        if (oData[13].length > 0)
            $(out).find('.auditInfo-taskDescription').text(oData[13]);
        else
            $(out).find('.auditInfo-taskDescription').closest('tr').remove();
        if (oData[8].length > 0)
            $(out).find('.auditInfo-taskId').text(oData[8]);
        else
            $(out).find('.auditInfo-taskId').closest('tr').remove();
        if (oData[6].length > 0)
            $(out).find('.auditInfo-createdDate').text(oData[6]);
        else
            $(out).find('.auditInfo-createdDate').closest('tr').remove();
        if (oData[7].length > 0)
            $(out).find('.auditInfo-formUrl').text(oData[7]);
        else
            $(out).find('.auditInfo-formUrl').closest('tr').remove();
        if (oData[9].length > 0){
            var html= "",nameObj=[];
            var users = oData[9].split(',');
            for(var k=0;k<users.length;k++){
                if(userNameData && userNameData.length>=0)
                    nameObj = $.grep(userNameData, function(e){return e.userID == users[k]});
                    if(nameObj.length>0){
                        for(var j=0;j<nameObj.length;j++){
                            html+='<a onclick="javascript:showUserProfile(this)" class="anchortagcolor" user="'+nameObj[j].userID+'">'+nameObj[j].userName+'</a>&nbsp;&nbsp;'
                        }
                    }
                    else
                       html+='<a onclick="javascript:showUserProfile(this)" class="anchortagcolor" user="'+users[k]+'">'+users[k]+'</a>&nbsp;' 
            }
            $(out).find('.auditInfo-asignedUser').html(html);
        }
        else
            $(out).find('.auditInfo-asignedUser').closest('tr').remove();
        if (oData[10].length > 0)   
            $(out).find('.auditInfo-asignedRole').text(oData[10]);
        else
            $(out).find('.auditInfo-asignedRole').closest('tr').remove();
        if (oData[11].length > 0)
            $(out).find('.auditInfo-state').html(oData[11]);
        else
            $(out).find('.auditInfo-state').closest('tr').remove();
        if (oData[12].length > 0)
            $(out).find('.auditInfo-priority').html(oData[12]);
        else
            $(out).find('.auditInfo-priority').closest('tr').remove();
        if (oData[9].length == 0 && oData[10].length == 0 && oData[11].length == 0 && oData[12].length == 0 && oData[5].length == 0)
            $(out).find('tr:gt(3)').remove();
        return out;
    }
}


/**
 * @Function Name   : refreshAuditData
 * @Description     : fetches workflow audit data from server (refresh)
 * @param           : data
 * @returns         :
 * */
function refreshAuditData(data) {
    paginationData.requiredPage = parseInt(1);
    if (userCache != null && userCache != undefined && userCache.auditPageSize != null)
        paginationData.pageSize = parseInt(userCache.auditPageSize);
    else
        paginationData.pageSize = parseInt(10);
    addLoading($('#workflowAuditTable'));
    sendAjaxCall("console/audits", "GET", false, true, "json", paginationData, handleAjaxError, formWorkflowAuditTable);
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
    $("#workflow_audit_table_wrapper .showEntries").remove();
    if (parseInt(endNumber) > parseInt(0)) {
        $("#workflow_audit_table_wrapper .table_pagination").removeClass('hide');
        var message = $("#datatablePageInfo").text().replace('{0}',startNumber).replace('{1}',endNumber).replace('{2}',totalRecords).replace('{3}',$("#worflowAuditPageInfo").text());
        $("#workflow_audit_table_wrapper .table_pagination").append("<div class='showEntries'><label>"+message+"</label></div>");
    } else
        $("#workflow_audit_table_wrapper .table_pagination").addClass('hide');
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
        userCache.auditPageSize = $('#noOfWorkflowRows').val();
        $.jStorage.set($("#userid").text(), userCache);
    }
    paginationData.pageSize = $('#noOfWorkflowRows').val();
    paginationData.requiredPage = parseInt(1);
    fetchWorkflowAudit(false);
}

/** 
 * @Function Name   : getFirstPageAuditData
 * @Description     : This method is use to get first page data.
 * @param           :
 * @returns         :
 * */
function getFirstPageAuditData() {
    paginationData.requiredPage = parseInt(1);
    fetchWorkflowAudit(false);
}

/** 
 * @Function Name   : getNextPrevPageAuditData
 * @Description     : This function is used to get the next page data for workflow
 * @param           :
 * @returns         :
 * */
function getNextPrevPageAuditData(action) {
    if ($('#workflowPageNo').val() == "")
        paginationData.requiredPage = parseInt(1);
    else if ($('#workflowPageNo').val() < totalPageSize && action == 'next') {
        paginationData.requiredPage = parseInt(parseInt($("#workflowPageNo").val()) + 1);
    } else if ($('#workflowPageNo').val() > 1 && action == 'prev') {
        paginationData.requiredPage = parseInt(parseInt($("#workflowPageNo").val()) - 1);
    } else if ($('#workflowPageNo').val() >= totalPageSize && action == 'next') {
        paginationData.requiredPage = parseInt(totalPageSize);
    } else if ($('#workflowPageNo').val() == 1 && action == 'prev') {
        paginationData.requiredPage = parseInt(1);
    }
    fetchWorkflowAudit(false);
}

/** 
 * @Function Name   : getAuditPageNoData
 * @Description     : This function will get the task list of mentioned page no
 * @param           : event for enter
 * @returns         :
 * */
function getAuditPageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#workflowPageNo").val() != "" && parseInt($("#workflowPageNo").val()) != 0 && parseInt($("#workflowPageNo").val()) <= Math.ceil(totalRecords / paginationData.pageSize)) {
        paginationData.requiredPage = parseInt($("#workflowPageNo").val());
        fetchWorkflowAudit(false);
    } else if ($("#workflowPageNo").val() != "" && event.keyCode == parseInt(13) && (parseInt($("#workflowPageNo").val()) === 0 || parseInt($("#workflowPageNo").val()) > Math.ceil(totalRecords / paginationData.pageSize))) {
        paginationData.requiredPage = parseInt(1);
        fetchWorkflowAudit(false);
    } else if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
}

function openWorkflowId(obj) {
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
    fetchWorkflowAudit(false);
}

/**
 * @Function Name   : updateAuditEntries
 * @Description     : This method is use to update numbers of entries.
 * @param           :
 * @returns         :
 * */
function updateAuditEntries() {
    showAuditEntires(startNumber, workflowAuditTable.fnSettings().fnRecordsDisplay());
}
