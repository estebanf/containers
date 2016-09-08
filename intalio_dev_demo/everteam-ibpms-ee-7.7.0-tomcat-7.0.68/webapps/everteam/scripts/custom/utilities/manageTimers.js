/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


/** dataTable options for manage timers table */
var manageTimerTableOptions = {
    "bPaginate": false,
    "bStateSave": true,
    "bInfo": false,
    "bFilter": true,
    "bRetrieve": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bAutoWidth": false,
    "aoColumns": [{
        "bSortable": true,
        "sClass": "alignLeft"
    }, {
        "bSortable": true,
        "sClass": "alignLeft"
    }, {
        "bSortable": true,
        "sClass": "alignLeft"
    }, {
        "bSortable": true,
        "sClass": "alignLeft"
    }, {
        "bSortable": false,
        "sClass": "center"
    }]
};
/** stores manage timers datatable */
var manageTimerTable;

/** set default value */
var defaultTimerValue = {
    searchOdeJobs: $('#searchOdeJobs').text(),
    enterFromDate: $('#enterFromDate').text(),
    enterToDate: $('#enterToDate').text()
}

/**
 * @Function Name   : ready
 * @Description     : jquery ready function for siderbar
 * @param           :
 * @returns         :
 * */
$(document).ready(function() {
    manageTimerTable = $('#manage_timers_table').dataTable(manageTimerTableOptions);
    customTable('manage_timers_table');
    getOdeJobs();
    findODEJobs();
    var dateObj = new Date();
    $('#DueDatePicker').datetimepicker({
        minDate:dateObj.getMonth()+1+"/"+dateObj.getDate()+"/"+dateObj.getFullYear(),
        format: userPreferences.dateFormat.toUpperCase()+" hh:mm:ss A",
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down"
    }}).next().on(ace.click_event, function(){$(this).prev().focus()});
    $('#fromTimer').on('change', function() {
        if ($('#fromTimer').val() > $('#toTimer').val())
            $('#toTimer').val("");
        $('#toTimer').datepicker('setStartDate', $('#fromTimer').val());
    });
});

/**
 * @Function Name   : getOdeJobs
 * @Description     : sends server call to get ode jobs
 * @param           :
 * @returns         :
 * */
function getOdeJobs() {
    var data = {
        action: "getAllJobs"
    }
    addLoading($('#manageTimerTable'));
    sendAjaxCall("console/odeJobs", "GET", false, true, "json", data, handleErrorCall, getOdeJobsSuccess);
}

function handleErrorCall(e) {
    showInformation(e.responseText);
    removeLoading('', true);
    return false;
}

/**
 * @Function Name   : getOdeJobsSuccess
 * @Description     : success function of getOdeJobs()
 * @param           : response data
 * @returns         :
 * */
function getOdeJobsSuccess(data) {

    $('#manage_timers_table_wrapper').find('.table_refresh_icon').attr('onclick', 'refreshOdeJobs();');
    formManageTimersTable(data);
}

/**
 * @Function Name   : formManageTimersTable
 * @Description     : forms the ode jobs table from data
 * @param           : data
 * @returns         :
 * */
function formManageTimersTable(data) {
    manageTimerTable.fnClearTable();
    if (data.odejobs != undefined && data.odejobs.length > 0) {
        $.each(data.odejobs, function(key, value) {
            var items = [];
            var infoObject;
            items[items.length] = '<span class="instanceId">' + value.processId + '</span>';
            items[items.length] = '<span class="instanceId">' + value.iid + '</span>';
            items[items.length] = '<span class="jobid">' + value.jobid + '</span>';
            items[items.length] = '<span class="timeStamp">' + $.format.date(Number(value.ts), userPreferences.dateFormat+userPreferences.hourFormat) + '</span>';
            items[items.length] = '<a href="#" onclick=changeTime(this); class="noColor"><i class="fa fa-calendar"></i></a>';
            manageTimerTable.fnAddData(items, false);
        });
        manageTimerTable.fnDraw(true);
    } else if (data.error_message != undefined)
        showErrorNotification(data.error_message);
    else
        $('.dataTables_empty').text($('#noJobsFound').text());
    removeLoading($('#manageTimerTable'));
}

/**
 * @Function Name   : changeTime
 * @Description     : displays modal for changing time of a task
 * @param           : object
 * @returns         :
 * */
function changeTime(obj) {
    $('#updateManageTimer').find('.jobIdText').val($(obj).closest('tr').find('.jobid').text());
    var timeStampVal = $(obj).closest('tr').find('.timeStamp').text();
    var dateArray = timeStampVal.split(" ");
    $('#DueDatePicker').val(timeStampVal);
    modalShow('updateManageTimer');
}

/**
 * @Function Name   : updateTime
 * @Description     : updates user specified time for a task to server
 * @param           :
 * @returns         :
 * */
function updateTime() {
    var data = {
        jobid: $('#updateManageTimer').find('.jobIdText').val(),
        ts: moment($('#DueDatePicker').val(),userPreferences.dateFormat.toUpperCase()+"hh:mm:ss A").unix()*1000
    }
    sendAjaxCall("console/odeJobs", "POST", false, true, "json", data, handleAjaxError, updateTimeSuccess);
}

/**
 * @Function Name   : updateTimeSuccess
 * @Description     : success function of updateTime
 * @param           : data1
 * @returns         :
 * */
function updateTimeSuccess(response) {
    if (response.success_message != undefined && response.success_message != null) {
        showNotification(response.success_message);
        var data = {
            action: "getAllJobs"
        }
        addLoading($('#manageTimerTable'));
        sendAjaxCall("console/odeJobs", "GET", false, true, "json", data, handleAjaxError, formManageTimersTable);
    } else if (response.error_message != undefined)
        showErrorNotification(response.error_message);
}

/**
 * @Function Name   : refreshOdeJobs
 * @Description     : sends ajax call to refresh data
 * @param           :
 * @returns         :
 * */
function refreshOdeJobs() {
    $('#fromTimer').val("");
    $('#toTimer').val("");
    var data = {
        action: "getAllJobs",
    }
    addLoading($('#manageTimerTable'));
    sendAjaxCall("console/odeJobs", "GET", false, true, "json", data, handleAjaxError, formManageTimersTable);
}

function getParticularJobs() {
    if ($('#fromTimer').val() == null || $('#fromTimer').val() == "") {
        showInformation(defaultTimerValue.enterFromDate);
    } else if ($('#toTimer').val() == null || $('#toTimer').val() == "") {
        showInformation(defaultTimerValue.enterToDate);
    } else {
        var data = {
            action: "getParticularJobs",
            fromDate: $('#fromTimer').val(),
            toDate: $('#toTimer').val()
        };
        addLoading($('#manageTimerTable'));
        sendAjaxCall("console/odeJobs", "GET", false, true, "json", data, handleAjaxError, formManageTimersTable);
    }
}

/**
 * @Function Name   : findODEJobs
 * @Description     : find all ODE jobs in between from and to dates
 * @param           :
 * @returns         :
 * */
function findODEJobs() {
    var findTimer = '<label for="fromTimer">'+$('#fromManageTimer').text()+'</label>';
    findTimer += '<input type="text" class="filterDates" id="fromTimer" data-date-format="dd-mm-yyyy">';
    findTimer += '<label for="toTimer">'+$('#toManageTimer').text()+'</label>';
    findTimer += '<input type="text" class="filterDates" id="toTimer" data-date-format="dd-mm-yyyy">';
    findTimer += '<button type="button" class="btn btn-primary btn-sm btn-white" id="findTimer" title="Search Jobs" onclick="javascript:getParticularJobs();" ><i class="fa fa-search"></i>&nbsp;&nbsp;' + defaultTimerValue.searchOdeJobs + '</button>';
    $('#manage_timers_table_wrapper .row .col-sm-9:first').append(findTimer);
    $('.filterDates').datepicker({
        autoclose: true
    });
}