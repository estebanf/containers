/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/** monitoring_process_table holds the reference of process data table*/
var monitoringProcessTable;

/** process ids for selected processes*/
var selectedProcessIds;

/** process id for the selected process*/
var proId;

/** set flag for process deployment*/
var deployFlag;

/** set the filter state for the filter */
var filterState = {};

var processData;

/** totalRecords is used to calculate the pagination of instances page*/
var totalRecords;

/** endNumber is used to display the no of entries*/
var endNumber;

/** startNumber is used to display the no of entries*/
var startNumber;

var breRelativePath;
var isBreEditable;
var brePackage;

/** currentProcessFilterId stores the selected filter id*/
var currentProcessFilterId = 0;

/** list of all filters*/
var filtersName = [];

/** totalProcessPageSize holds the total page size */
var totalProcessPageSize;

/** totalPackageCount holds the total package count */
var totalPackageCount;

/** isProcessModalOpen holds the boolean value for filter modal is open or not. */
var isProcessModalOpen;

/**pagination required data for processes*/
var processPaginationData = {
    pageSize: 10,
    requiredPage: $('#processesPageNo').val()
};

/** processResourceTable holds the reference of resources of a process*/
var processResourceTable;

/** processServicesTable holds the reference of services of a process*/
var processServicesTable;

/** breResourceTable holds the reference of resources of a bre*/
var breResourceTable;

/** buttonCount holds the count for active,retire processes*/
var buttonCount = {
    active: 0,
    retired: 0
};

/** To check if Business Rules Editor is called from Processes*/
var isBRECalledFromProcess = false;

var selectAllProcess;

var prevActivityObj;

var actInsSummary;

var prevProId;

var ajaxInsSummaryTimeOut = 180000;
/** resourceOptions stores the data table options for resource table*/
var resourceOptions = {
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
    "aoColumns": [{
        "sClass": "center",
        sWidth: '20px'
    }, {
        "sClass": "alignLeft"
    }]
};

/** breResourceOptions stores the data table options for bre table*/
var breResourceOptions = {
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
    }]
};

/** servicesOptions stores the data table options for resource table*/
var servicesOptions = {
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
    "aoColumns": [{
        "sClass": "alignLeft",
        sWidth: '130px'
    }, {
        "sClass": "alignLeft"
    }, {
        "sClass": "alignLeft"
    }]
};

/** monitoringProcessesOptions stores the data table option for processes*/
var monitoringProcessesOptions = {
    "bPaginate": false,
    "bStateSave": true,
    //"sScrollY": "200px",
    "bInfo": false,
    "bFilter": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bRetrieve": true,
    "bAutoWidth": false,
    "bSort": false,
    "aoColumns": [{
        "sClass": "center"
    }, {
        "sClass": "alignLeft"
    }, {
        "sType": "string",
        "sClass": "center",
        "sWidth": 89
    }, {
        "sType": "html",
        "sClass": "center"
    }, {
        "sClass": "center"
    }, {
        "sClass": "center"
    }, {
        "sClass": "center"
    }, {
        "sClass": "center"
    }, {
        "sClass": "center"
    }, {
        "sClass": "center"
    }, {
        "bVisible": false,
        "bSearchable": false
    }, {
        "bVisible": false,
        "bSearchable": false
    }, {
        "bVisible": false,
        "bSearchable": false
    }]
};
var defaultValue = {
    commonProcessUrl: "console/processes",
    monitoringProcessId: "monitoring_process",
    selectProcess: $('#selectProcess').text(),
    selectOnlyPackages: $('#selectOnlyPackages').text(),
    selectPackages: $('#selectPackages').text(),
    selectOnlyOneProcess: $('#selectOnlyOneProcess').text(),
    selectOnlyProcess: $('#selectOnlyProcess').text(),
    selectOneProcess: $('#selectOneProcess').text(),
    retiredProcess: $('#retiredProcess').text(),
    chooseFile: $('#chooseFile').text(),
    selectFilter: $('#selectFilter').text(),
    enterFilterName: $('#enterFilterName').text(),
    enterLifeCycle: $('#enterLifeCycle').text()
};

var mon_packagesObj;
var mon_processesObj;
/**
 * @Function Name   : starting function of jquery
 * @Description     : This function is used to initialize variables and set default values.
 * @param           : data list of processes
 * @returns         :
 * */
$(document).ready(function() {
    monitoringProcessTable = $("#" + defaultValue.monitoringProcessId).dataTable(monitoringProcessesOptions);
    customTable(defaultValue.monitoringProcessId);
    $('.paginationRows').remove();
    selectAllProcess = parseInt(Math.pow(2, 16) - 1);
    $("#" + defaultValue.monitoringProcessId + "_wrapper .table_pagination").append("<span class='paginationRows'><label>" + $('#entriesPerPageProc').text() + "</label><select id='noOfProcessesRows' onchange=javscript:updateNoOfRows(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option><option value='" + selectAllProcess + "' role='option'>All</option></select></span>");
    if ($.browser.msie && $.browser.version === '8.0') {
        $("#noOfProcessesRows option[value='" + selectAllProcess + "']").remove();
    }
    $('#deployProcessFrame').load(function() {
        var deployText = $("#deployProcessFrame").contents().find("body").html();
        deploymentMsg(deployText);
    });
    isProcessModalOpen = true;
    $('.dataTables_empty').html($('#fetchProcesses').text());
    getProcessActionsList();
    $("#processFilters").bind("change", function() {
        getProcessFilters('update');
    });
    $('#packageOrder').chosen();
    $("#packageOrder_chzn").css("width", 110);
    $('#deployedDateOrder').chosen();
    $("#deployedDateOrder_chzn").css("width", 110);
    $('#lastActiveOrder').chosen();
    $("#lastActiveOrder_chzn").css("width", 110);
    $('.deployedDates').datetimepicker({pickTime: false,icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down"
    }}).next().on(ace.click_event, function(){$(this).prev().focus()});
    $('#file').ace_file_input({
        no_file: 'Choose Zip File...',
        btn_choose: 'Choose',
        btn_change: 'Change',
        droppable: false,
        onchange: null,
        thumbnail: false
    });
    processResourceTable = $("#processResourceTable").dataTable(resourceOptions);
    processServicesTable = $("#processServicesTable").dataTable(servicesOptions);
    breResourceTable = $("#breResourceTable").dataTable(breResourceOptions);
    customTable('processResourceTable');
    customTable('processServicesTable');
    customTable('breResourceTable');
    $('#processResourceTable_wrapper .row .tableButtons').append("<button type='button' class='btn btn-sm btn-white' onclick='downloadResources();return false' title='Download Resource File'>" + $('#downloadResourceFileBtn').text() + "</button>");
    $('#processResourceTable_wrapper .row:first .col-sm-8').removeClass('col-sm-8').addClass('col-sm-6');
    $('#processResourceTable_wrapper .row:last').remove();
    $('#processServicesTable_wrapper .row:first .col-sm-8').removeClass('col-sm-8').addClass('col-sm-6');
    $('#processServicesTable_wrapper .row:last').remove();
    mon_packagesObj  = applySelectize($('#mon_filterPackages'), [], [], 20, false);
    mon_processesObj = applySelectize($('#mon_filterProcesses'), [], [], 20, false);
    mon_lifeCycleObj = applySelectize($('#filterLifeCycle'),[],[],1,false);
    mon_insStatusObj = applySelectize($('#filterStatus'),[],[],6,false);
    mon_procFilObj   = applySelectize($('#processFilters'),[],[],1,false); 
    $("#svgActInsInfo").draggable();
    var dateObj = new Date();
    var icons= {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-chevron-up",
                    down: "fa fa-chevron-down"
                }
    var dateFormat = "YYYY/MM/DD hh:mm A";
    $('#dateStart').datetimepicker({icons:icons,format: dateFormat});
});

function getProcessActionsList() {
    var data = {
        parentId: "10"
    }
    sendAjaxCall("console/modules/actions", "GET", false, true, "json", data, handleProcessesAjaxError, populateActionButtons);
}

/**
 * @Function Name   : populateActionButtons
 * @Description     : This function will populate the list of action buttons
 * @param           :
 * @returns         :
 * */
function populateActionButtons(data) {
    if (data.module != undefined) {
        var actions = data.module;
        actions["sort"] = "Sort";
        actions["filter"] = "Filter";
        actions["analytics"] = "analytics";
        $('#' + defaultValue.monitoringProcessId + '_wrapper .row .tableButtons').empty();
        $.each(actions, function(key, value) {
            var actionButton = processesButtonHeader(value);
            $('#' + defaultValue.monitoringProcessId + '_wrapper .row .tableButtons').append(actionButton);
        });
        tableWidth = "100%";
        getProccessList();
    } else if (data.error_message != undefined)
        showErrorNotification(data.error_message);
}

/**
 * @Function Name   : getProcessList
 * @Description     : This function will populate the list of process
 * @param           :
 * @returns         :
 * */
function getProccessList() {
    $('#filter_process_name').text($('#filterNameFmt').text());
    $('#breadcrumbProcessFilter').addClass('hide');
    monitoringProcessTable.fnFilter('');
    addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
    processPaginationData.requiredPage = parseInt(1);
    if (userCache != null && userCache != undefined && userCache.mProcessOrderBy != null)
        processPaginationData.orderBy = userCache.mProcessOrderBy;
    else
        processPaginationData.orderBy = "-deployed +name";
    if (userCache != null && userCache != undefined && userCache.mProcessPagesize != null)
        processPaginationData.pageSize = parseInt(userCache.mProcessPagesize);
    else
        processPaginationData.pageSize = parseInt(10);
    if (userCache != null && userCache != undefined && userCache.processFilter != null) {
        processPaginationData.filterId = parseInt(userCache.processFilter);
        currentProcessFilterId = parseInt(userCache.processFilter);
        if (userCache.processFilterName != null) {
            $('#filter_process_name').text(userCache.processFilterName);
            $('#bcProcessFilterName').text(userCache.processFilterName);
            $('#breadcrumbProcessFilter').removeClass('hide');
        }
    } else {
        processPaginationData.filterId = parseInt(-1);
        currentProcessFilterId = 0;
    }
    $('.dataTables_empty').html($('#fetchProcesses').text());
    sendAjaxCall('console/processes', "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);
}

/**
 * @Function Name   : populateProcessList
 * @Description     : This function will populate the list of process
 * @param           : data list of processes
 * @returns         :
 * */
function populateProcessList(data) {
    monitoringProcessTable.fnFilter('');
    monitoringProcessTable.fnClearTable();
    buttonCount.retired = 0;
    buttonCount.active = 0;
    $('#startButton').removeAttr('disabled');
    $('#activeButton').removeAttr('disabled');
    $('#retireButton').removeAttr('disabled');
    var charLimit;
    var contentWidth = $('#main-content').width();
    if (contentWidth > 1300)
        charLimit = 85
    else if (contentWidth > 1170 && contentWidth <= 1310)
        charLimit = 60
    else if (contentWidth > 1050 && contentWidth <= 1170)
        charLimit = 35
    else if (contentWidth <= 1050 && contentWidth > 900)
        charLimit = 25
    else if (contentWidth > 800 && contentWidth <= 900)
        charLimit = 15
    if (data.total != undefined && data.total != null)
        totalRecords = data.total;
    if (data.process && data.process.length > 0) {
        $('.dataTables_empty').text($('#fetchProcesses').text());
        var packageCount = 0;
        $.each(data.process, function(key, value) {
            var items = [];
            if (value.package == false) {
                items[items.length] = '<label class="position-relative"><input name="processSelected" class="ace" type="checkbox" onclick="updateHeaderCheckbox(this);updateButtons(this);" value="' + value.pid + '"/><span class="lbl"></span></label>';
                var processId = value.pid;
                var PName = value.name;
                if (PName.length > charLimit)
                    PName = "..." + PName.slice(PName.length - charLimit);
                var firstColumnData = '<a onclick=showProcess("' + value.pid + '"); class="pNameAlignment noDecoration iconCursor" title="" data-placement="bottom" data-original-title="' + value.name + '">' + PName + '</a>';
                firstColumnData += "<span id='bre' class='action-buttons'>";
                if (value.startEventExists)
                    firstColumnData += '<a onclick=showStartTimer("' + value.pid + '","' + value.name + '"); class="ace-popover pull-right noDecoration iconCursor" data-placement="bottom" data-content="'+$("#dataCStartTimerMsg").text()+'" data-trigger="hover" status= "Start Timer Process" ><i class="fa fa-clock-o"></i></a>';
                items[items.length] = firstColumnData;
                if (value.status == "ACTIVE")
                    items[items.length] = '<span class="action-buttons"><a class="ace-popover cursorDefault" data-placement="bottom" data-content="'+$("#dataCActiveMsg").text()+'" data-trigger="hover" status= "' + value.status + '" ><i class="fa fa-flag green"></i></a></span>';
                else
                    items[items.length] = '<span class="action-buttons"><a class="ace-popover cursorDefault" data-placement="bottom" data-content="'+$("#dataCRetireMsg").text()+'" data-trigger="hover" status= "' + value.status + '" ><i class="fa fa-flag text-danger"></i></a></span>';
                if (value.inProgressCount != 0)
                    items[items.length] = '<a class="noDecoration iconCursor" onclick=showInstanceInfo("Active","' + value.pid + '","' + value.name + '")>' + value.inProgressCount + '</a>';
                else
                    items[items.length] = "-";
                if (value.completedCount != 0)
                    items[items.length] = '<a class="noDecoration iconCursor" onclick=showInstanceInfo("Completed","' + value.pid + '","' + value.name + '")>' + value.completedCount + '</a>';
                else
                    items[items.length] = "-";
                if (value.failureCount != 0)
                    items[items.length] = '<a class="noDecoration iconCursor" onclick=showInstanceInfo("Failure","' + value.pid + '","' + value.name + '")>' + value.failureCount + '</a>';
                else
                    items[items.length] = "-";
                if (value.failedCount != 0)
                    items[items.length] = '<a class="noDecoration iconCursor" onclick=showInstanceInfo("Failed","' + value.pid + '","' + value.name + '")>' + value.failedCount + '</a>';
                else
                    items[items.length] = "-";
                if (value.suspendedCount != 0)
                    items[items.length] = '<a class="noDecoration iconCursor" onclick=showInstanceInfo("Suspended","' + value.pid + '","' + value.name + '")>' + value.suspendedCount + '</a>';
                else
                    items[items.length] = "-";
                if (value.terminatedCount != 0)
                    items[items.length] = '<a class="iconCursor" onclick=showInstanceInfo("Terminated","' + value.pid + '","' + value.name + '")>' + value.terminatedCount + '</a>';
                else
                    items[items.length] = "-";
                totalCount = parseInt(value.inProgressCount, 10) + parseInt(value.completedCount, 10) + parseInt(value.failedCount, 10) + parseInt(value.terminatedCount, 10) + parseInt(value.suspendedCount, 10);
                if (totalCount != 0)
                    items[items.length] = '<a class="noDecoration iconCursor" onclick=showInstanceInfo("Total","' + value.pid + '","' + value.name + '")>' + totalCount + '</a>';
                else
                    items[items.length] = "-";
                items[items.length] = value.packageName;
                items[items.length] = value.package;
                items[items.length] = value.version;
            } else {
                items[items.length] = '<label class="position-relative"><input name="selectedPackages" type="checkbox" class="ace" onclick="updateHeaderCheckbox(this)" value="' + value.pid + '"/><span class="lbl"></span></label>';
                var brePackageName = value.name;
                if(value.version != 1)
                    brePackageName = brePackageName + "." + value.version;
                var breIcon = "<span id='bre' class='action-buttons'><a herf='#' onclick=javascript:getBREFile('"+brePackageName+"') class='ace-popover pull-right noDecoration iconCursor' data-trigger='hover' data-placement='bottom' data-content='Business Rules'><i class='fa fa-list-alt'></i></a></span>";

                if(!value.breServiceExists || ($("#sidebar ul li#moduleID69").length == 0)){
                    breIcon = "";
                }
                if (data.users){
                    nameObj = $.grep(data.users, function(e){return e.userID == value.deployer});
                    name = nameObj.length==1 ? nameObj[0].userName : value.deployer;
                } else {
                    name = value.deployer
                }
                if (value.deployTime && value.deployer)
                    items[items.length] = "<span><span class='packNameOfProcess'>" + value.name + "  [v" + value.version + "]&nbsp;&nbsp;"+breIcon+"</span></br><span class='packageInfo'>" + $('#deployedDate').text() + ": " + $.format.date(value.deployTime, userPreferences.dateFormat+userPreferences.hourFormat) + "&nbsp;&nbsp;" + $('#deployedBy').text() + ": &nbsp;<a class='noDecoration' user='"+value.deployer+"' onclick=javascript:showUserProfile(this)>" + name + "</a></span></span>";
                else if (value.deployTime)
                    items[items.length] = "<span><span class='packNameOfProcess'>" + value.name + "  [v" + value.version + "]&nbsp;&nbsp;"+breIcon+"</span></br><span class='packageInfo'>" + $('#deployedDate').text() + ": " + $.format.date(value.deployTime, userPreferences.dateFormat+userPreferences.hourFormat) + "</span></span>";
                else if (value.deployer)
                    items[items.length] = "<span><span class='packNameOfProcess'>" + value.name + "  [v" + value.version + "]&nbsp;&nbsp;"+breIcon+"</span></br><span class='packageInfo'>" + $('#deployedBy').text() + ":&nbsp; <a class='noDecoration' user='"+value.deployer+"' onclick=javascript:showUserProfile(this)>" + name + "</a></span></span>";
                else
                    items[items.length] = "<span><span class='packNameOfProcess'>" + value.name + "  [v" + value.version + "]&nbsp;&nbsp;"+breIcon+"</span></span>";
                packageCount++;
                for (i = items.length; i < 10; i++) {
                    items[i] = " ";
                }
                items[items.length] = "THIS IS A PACKAGE";
                items[items.length] = value.package;
                items[items.length] = value.version;
            }
            var a = monitoringProcessTable.fnAddData(items, false);
            var oSettings = monitoringProcessTable.fnSettings();
            var row = oSettings.aoData[a[0]].nTr;
            if (value.package) row.className = "io-package-row";
        });
        totalPackageCount = packageCount;
        monitoringProcessTable.fnDraw(true);
        $('.ace-popover').popover();
        $("#" + defaultValue.monitoringProcessId + '_length').remove();
        $('#' + defaultValue.monitoringProcessId + ' thead tr th').removeClass("sorting_asc").removeClass("sorting");
        $('#' + defaultValue.monitoringProcessId + '_filter a').remove();
        $('#' + defaultValue.monitoringProcessId + '_filter').append(processesButtonHeader("viewAllProcess"));
        $('#' + defaultValue.monitoringProcessId + '_filter').find('input').attr('onkeyup', 'javascript:updateProcessShowEntries()');
        $('#monitoring_process tr th input:first').prop('checked', false);
        var pagination = Math.ceil(totalRecords / processPaginationData.pageSize);
        totalProcessPageSize = pagination;
        if (pagination >= 1) {
            $('#processes_pagination').remove();
            if (processPaginationData.requiredPage == parseInt(1)) {
                startNumber = processPaginationData.requiredPage;
                if (parseInt(data.process_summary.processesCount) != parseInt(processPaginationData.pageSize))
                    endNumber = parseInt(data.process_summary.processesCount);
                else
                    endNumber = parseInt(processPaginationData.pageSize);
            } else {
                var page = parseInt(parseInt(processPaginationData.requiredPage) - parseInt(1));
                startNumber = parseInt(page * parseInt(processPaginationData.pageSize) + 1);
                endNumber = parseInt(page * parseInt(processPaginationData.pageSize) + data.process_summary.processesCount);
            }
            $("#" + defaultValue.monitoringProcessId + "_wrapper .table_pagination").append("<div id='processes_pagination' class='dataTables_paginate paging_bootstrap pull-right'></div>");
            $("#" + defaultValue.monitoringProcessId + "_wrapper #processes_pagination").append("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' title='First page' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getFirstPageProcessData();></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' title='Previous page' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getNextPrevPageProcessesData('prev');></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'>"+$('#datatablePage').text()+" &nbsp;<input id='processesPageNo' type='text' role='textbox' onkeydown=javascript:getProcessesPageNoData(event); value=" + processPaginationData.requiredPage + " maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; "+$('#datatableOf').text()+" &nbsp;<span id='sp_1_grid-pager'>" + pagination + "</span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' title='Next page' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPrevPageProcessesData('next');></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' title='Last page'class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastPageProcessData();></span></td></tr></tbody></table>");
            showProcessEntires(startNumber, getProcessCount(monitoringProcessTable));
            updatePagintaion($('#processesPageNo').val(), pagination);
            $("select#noOfProcessesRows").val(processPaginationData.pageSize);
        } else
            removePagination();
        applyNiceScroll($('#monitoring_process_wrapper').find('.table_container'), 190);
    } else if (data.error_message != undefined) {
        removePagination();
        showErrorNotification(data.error_message);
    } else if (data.process != undefined && data.process.length == 0)
        removePagination();
    $('.dataTables_empty').text($('#noProcessFound').text());
    removeLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'), false);
}

function removePagination() {
    $('#processes_pagination').remove();
    $('.paginationRows').remove();
    $('.showEntries').remove();
}

function showProcessEntires(start, end) {
    $('.showEntries').remove();
    var endCount = 0;
    if (start > parseInt(10))
        endCount = parseInt(parseInt(parseInt(start) - 1) + parseInt(end))
    else
        endCount = parseInt(end);
    if (parseInt(end) > parseInt(0)) {
        $("#" + defaultValue.monitoringProcessId + "_wrapper .table_pagination").removeClass('hide');
        var message = $("#datatablePageInfo").text().replace('{0}',startNumber).replace('{1}',endNumber).replace('{2}',totalRecords).replace('{3}',$("#processessMsg").text())+ totalPackageCount +"  "+$("#packagesMsg").text();
        $("#" + defaultValue.monitoringProcessId + "_wrapper .table_pagination").append("<div class='showEntries'><label>"+message+"</label></div>");
    } else
        $("#" + defaultValue.monitoringProcessId + "_wrapper .table_pagination").addClass('hide');
}

function updateProcessShowEntries() {
    showProcessEntires(startNumber, getProcessCount(monitoringProcessTable));
}

function updateNoOfRows() {
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.mProcessPagesize = $('#noOfProcessesRows').val();
        $.jStorage.set($("#userid").text(), userCache);
    }
    monitoringProcessTable.fnFilter('');
    processPaginationData.pageSize = $('#noOfProcessesRows').val();
    processPaginationData.requiredPage = parseInt(1);
    addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
    sendAjaxCall("console/processes", "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);
}

/** 
 * @Function Name   : updatePagintaion
 * @Description     : updates the pagination buttons
 * @param           :
 * @returns         :
 * */
function updatePagintaion(pageNo, totalPages) {
    if (pageNo == parseInt(1)) {
        $("#firstPage").removeAttr("onclick").addClass("disabled");
        $("#prevPage").removeAttr("onclick").addClass("disabled");
    }
    if (pageNo == totalPages) {
        $("#lastPage").removeAttr("onclick").addClass("disabled");
        $("#nextPage").removeAttr("onclick").addClass("disabled");
    }
}

function getLastPageProcessData() {
    processPaginationData.requiredPage = Math.ceil(totalRecords / processPaginationData.pageSize);
    if (currentProcessFilterId != 0)
        processPaginationData.filterId = parseInt(currentProcessFilterId);
    else
        processPaginationData.filterId = parseInt(-1);
    addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
    sendAjaxCall("console/processes", "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);
}

function getFirstPageProcessData() {
    processPaginationData.requiredPage = parseInt(1);
    if (currentProcessFilterId != 0)
        processPaginationData.filterId = parseInt(currentProcessFilterId);
    else
        processPaginationData.filterId = parseInt(-1);
    addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
    sendAjaxCall("console/processes", "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);
}

/** 
 * @Function Name   : getNextPrevPageData
 * @Description     : This function is used to get the next page data for processes
 * @param           :
 * @returns         :
 * */
function getNextPrevPageProcessesData(action) {
    if ($('#processesPageNo').val() == "")
        processPaginationData.requiredPage = parseInt(1);
    else if ($('#processesPageNo').val() < totalProcessPageSize && action == 'next') {
        processPaginationData.requiredPage = parseInt(parseInt($("#processesPageNo").val()) + 1);
    } else if ($('#processesPageNo').val() > 1 && action == 'prev') {
        processPaginationData.requiredPage = parseInt(parseInt($("#processesPageNo").val()) - 1);
    } else if ($('#processesPageNo').val() == totalProcessPageSize && action == 'delete') {
        if ($('#processesPageNo').val() == parseInt(1))
            processPaginationData.requiredPage = parseInt(1);
        else
            processPaginationData.requiredPage = parseInt(parseInt($("#processesPageNo").val()) - 1);
    } else if ($('#processesPageNo').val() < totalProcessPageSize && action == 'delete') {
        processPaginationData.requiredPage = parseInt(parseInt($("#processesPageNo").val()));
    } else if (action == 'update') {

    } else
        processPaginationData.requiredPage = parseInt(totalProcessPageSize);
    if (currentProcessFilterId != 0)
        processPaginationData.filterId = parseInt(currentProcessFilterId);
    else
        processPaginationData.filterId = parseInt(-1);
    addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
    sendAjaxCall("console/processes", "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);
}

/** 
 * @Function Name   : getProcessesPageNoData
 * @Description     : This function will get the task list of mentioned page no
 * @param           : event for enter
 * @returns         :
 * */
function getProcessesPageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#processesPageNo").val() != "" && parseInt($("#processesPageNo").val()) != 0 && parseInt($("#processesPageNo").val()) <= Math.ceil(totalRecords / processPaginationData.pageSize)) {
        processPaginationData.requiredPage = parseInt($("#processesPageNo").val());
        if (currentProcessFilterId != 0)
            processPaginationData.filterId = parseInt(currentProcessFilterId);
        else
            processPaginationData.filterId = parseInt(-1);
        addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
        sendAjaxCall("console/processes", "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);
    } else if ($("#processesPageNo").val() != "" && event.keyCode == parseInt(13) && (parseInt($("#processesPageNo").val()) === 0 || parseInt($("#processesPageNo").val()) > Math.ceil(totalRecords / processPaginationData.pageSize))) {
        processPaginationData.requiredPage = parseInt(1);
        if (currentProcessFilterId != 0)
            processPaginationData.filterId = parseInt(currentProcessFilterId);
        else
            processPaginationData.filterId = parseInt(-1);
        addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
        sendAjaxCall("console/processes", "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);
    } else if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39))
        return;
    else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
}


/**
 * @Function Name   : activate
 * @Description     : This function is used to activate the processes.
 * @param           : data list of processes
 * @returns         :
 * */
function activate() {
    var process = getProcessDetails();
    if (process != null && process != "") {
        var data = {
            process: JSON.stringify(process)
        };
        addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
        sendAjaxCall('console/processes/activate', "POST", false, true, "json", data, handleProcessesAjaxError, populateSuccessAction);
        return true;
    }
    return false;
}

/**
 * @Function Name   : retire
 * @Description     : This function is used to retire the processes.
 * @param           :
 * @returns         :
 * */
function retire() {
    var process = getProcessDetails();
    if (process != null && process != "") {
        var data = {
            process: JSON.stringify(process)
        };
        addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
        sendAjaxCall('console/processes/retire', "POST", false, true, "json", data, handleProcessesAjaxError, populateSuccessAction);
        return true;
    }
    return false;
}

/**
 * @Function Name   : getProcessDetails
 * @Description     : This function is used to get process details.
 * @param           :
 * @returns         :
 * */
function getProcessDetails() {
    var columnsData = getSelectedRows(monitoringProcessTable, true);
    var process = new Array();
    if (columnsData.length != 0) {
        $.each(columnsData, function(key, value) {
            var processDetails = {};
            processDetails['pid'] = $(value[0]).find('input').val();
            if (value[11])
                processDetails['name'] = $(value[1]).find('.packNameOfProcess').text();
            else
                processDetails['name'] = $(value[1]).attr('data-original-title');
            processDetails['packageName'] = value[10];
            processDetails['package'] = value[11];
            processDetails['version'] = value[12];
            process.push(processDetails);
        });
        return process;
    } else {
        showInformation(defaultValue.selectProcess);
        return null;
    }
}

/**
 * @Function Name   : deploy
 * @Description     : This function is used to open process deployment modal.
 * @param           :
 * @returns         :
 * */
function deploy() {
    $('#deployProcessMessage').text('');
    $('#noProcessSelected').text('');
    if ($.browser.msie && ($.browser.version === '9.0' || $.browser.version === '8.0')) {
        $("#deployProcessFrame").attr("src", '../deployment.htm');
        modalShow("deployProcessIE");
    } else {
        modalShow("deployProcessPopup");
        deployFlag = false;
    }
    $(".ace-file-name").attr('data-title','Choose Zip File...');
    return true;
}

function deployProcessInIE() {
    $("#deployProcessFrame").attr("src", '../deployment.htm');
}

function deploymentMsg(deployText) {
    if (deployText.split(" ")[0] === 'Process(es)') {
        $('#deployProcessIE').modal('hide');
        $("#deployProcessFrame").attr("src", 'about:blank');
        getProccessList();
        showNotification(deployText);
    } else if (deployText.split(" ")[0] === 'Error') {
        $('#deployProcessIE').modal('hide');
        $("#deployProcessFrame").attr("src", 'about:blank');
        showErrorNotification(deployText);
    }
}

/**
 * @Function Name   : deployProcess
 * @Description     : This function is used to deploy the process(es).
 * @param           :
 * @returns         :
 * */
function deployProcess() {
    var file = $('#file').val();
    if (file == null || $.trim(file) == '') {
        $('#noProcessSelected').text(defaultValue.chooseFile);
        return false;
    }
    if ($.trim(file).lastIndexOf('.zip') == -1) {
        $('#noProcessSelected').text($('#chooseOnlyZip').text());
        return false;
    } else {
        addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
        $('#deployProcessPopup').modal('hide');
        $('#loading').css("margin-top", 6);
        $('#noProcessSelected').text('');
        $('#deployForm').ajaxForm({
            success: function(data) {
                deployProcessMsg($.parseJSON(data));
                return true;
            },
            dataType: "text"
        }).submit();
    }
}

/**
 * @Function Name   : deployProcessMsg
 * @Description     : This function is used deployment message.
 * @param           :
 * @returns         :
 * */
function deployProcessMsg(data) {
    $('#file').val('');
    $('#deployForm').find('.file-label').attr('data-title', 'Choose').removeClass('selected');
    $('#deployForm').find('.file-name').attr('data-title', 'Choose Zip File...');
    $('#deployForm').find('.fa fa-file').addClass('fa fa-upload').removeClass('.fa fa-file');
    $('#deployForm').find('.remove').hide();
    $('#deployProcessMessage').addClass("show");
    if (data.error_message != undefined) {
        showErrorNotification(data.error_message);
    } else {
        deployFlag = true;
        getProccessList();
        showNotification(data.success_message);
    }
    removeLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
}

/**
 * @Function Name   : closeDeployModal
 * @Description     : This function is used to refresh the process page if any process is deployed.
 * @param           :
 * @returns         :
 * */
function closeDeployModal() {
    if (deployFlag == true)
        getProccessList();
}

/**
 * @Function Name   : undeploy
 * @Description     : This function is used to undeploy the process(es).
 * @param           : data list of processes
 * @returns         :
 * */
function undeploy() {
    var columnsData = getSelectedRows(monitoringProcessTable, true);
    var processIds = new Array();
    var flag = true;
    if (columnsData.length != 0) {
        $.each(columnsData, function(key, value) {
            if (value[11] == true) {
                processIds.push($(value[0]).find('input').val());
            } else {
                flag = false;
                showInformation(defaultValue.selectOnlyPackages);
            }
        });

    } else {
        flag = false;
        showInformation(defaultValue.selectPackages);
    }
    selectedProcessIds = processIds;
    if (flag == true) {
        $('#deleteDeployModal').find(".modal_heading").text($('#undeployProc').text());
        $('#deleteDeployModal').find(".undeploymentConfirmText").text($('#undeployConfirmation').text());
        modalShow('deleteDeployModal');
        return true;
    }
    return false;
}

/**
 * @Function Name   : startOperation
 * @Description     : This function is used to start the process.
 * @param           :
 * @returns         :
 * */
function startOperation() {
    var columnsData = getSelectedRows(monitoringProcessTable, true);
    $("#startOperationFrame").attr("src", "");
    var processId;
    var processName;
    var flag = true;
    if (columnsData.length != 0) {
        $.each(columnsData, function(key, value) {
            // check for package
            if (value[11] == false) {
                // check for total selected processes
                if (columnsData.length == 1) {
                    // check for process is active
                    if ($(value[2]).find('a').attr('status') == "ACTIVE") {
                        processId = $(value[0]).find('input').val();
                        processName = $(value[1]).text();
                        if (processName.indexOf('...') > -1)
                            processName = $(value[1]).attr('data-original-title')
                    } else {
                        flag = false;
                        showInformation(defaultValue.retiredProcess);
                    }
                } else {
                    flag = false;
                    showInformation(defaultValue.selectOnlyOneProcess);
                }
            } else {
                flag = false;
                showInformation(defaultValue.selectOnlyProcess);
            }
        });
    } else {
        flag = false;
        showInformation(defaultValue.selectOneProcess);
    }
    var data = {
        id: processId
    };
    if (flag == true) {
        sendAjaxCall('console/processes/operations', "GET", false, true, "json", data, handleProcessesAjaxError, function(response) {
            populateOperationList(response, processName);
        }, 90000);
        return true;
    }
    return false;

}

/**
 * @Function Name   : populateSuccessAction
 * @Description     : This function is used to populate success or error message of process(es).
 * @param           : data list of processes
 * @returns         :
 * */
function populateSuccessAction(data) {
    if (data.success_message != undefined) {
        getNextPrevPageProcessesData('update');
        showNotification(data.success_message);
    } else if (data.error_message != undefined) {
        showErrorNotification(data.error_message);
        removeLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'), false);
    } else {
        showNotification(data.partial_success_message);
        showErrorNotification(data.partial_failure_message);
        getNextPrevPageProcessesData('update');
        removeLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'), false);
    }
}

/**
 * @Function Name   : populateOperationList
 * @Description     : This function is used to populate list of operation for the process.
 * @param           : data list of operation
 * @returns         :
 * */
var wsiURI;

function populateOperationList(response, processName) {
    var data = {}
    if (response.error_message == undefined) {
        if (response.operation != undefined && response.operation != "") {
            wsiURI = response.operation[0].wsiURI;
            $('#startOperation .modal-dialog').css('width', '800px');
            $('#startOperation').find('.modal-body').css({
                'max-height': $(window).height() - 230,
                'min-height': '100px',
                'overflow': 'auto'
            });
            $('.startProcessError').addClass('hide');
            $('.mandatoryFileds').removeClass('hide');
            $('#startOperationFrame').empty()
            $('#startOperation .modal-footer ').removeClass('hide');
            modalShow('startOperation');
            if(processName.length>65){
                var name = processName.replace(":",": </br>");
                $('#startOperation .modal_heading').html(name);
            }
            else
                $('#startOperation .modal_heading').text(processName)
            var wsdl = processName.split(':')
            wsdl = '/' + wsdl.join('-') + '.wsdl'
            var odeIndex = wsiURI.indexOf('.ode') + 4
            var portIndex = wsiURI.indexOf('&portTypeNS');
            wsiURI = [wsiURI.slice(0, odeIndex), wsdl, wsiURI.slice(portIndex)].join('');
            addLoading($('#startOperationFrame'));
            sendAjaxCall(wsiURI, "GET", false, true, "json", data, handleProcessesAjaxError, function(response) {
                //populateOperationList(response, processName);
                if (response.success_message != undefined && response.success_message != null) {
                    if (typeof seperateTags == 'undefined') {
                        loadJs('scripts/custom/administration/monitoring/soapReqParsing.js', function() {
                            seperateTags(response.success_message.wsRequestTemplate, 'startOperationFrame');
                        })
                    } else {
                        seperateTags(response.success_message.wsRequestTemplate, 'startOperationFrame');
                    }
                    removeLoading();

                } else
                    showInformation(response.error_message);
            }, 90000);
        }
    } else
        showErrorNotification(response.error_message);
}

function openProcessesFilter() {
    isProcessModalOpen = true;
    getProcessFilters('create');
}

/**
 * @Function Name   : showProcess
 * @Description     : This function is used to display the process details.
 * @param           :
 * @returns         :
 * */
function showProcess(processId) {
    proId = processId;
    $('#processInfo .modal-dialog').css('width', 600);
    $('#showDiagram').css('max-height', $(window).height() - 305);
    modalShow('processInfo');
    $(".actInsBtn").find("button").attr("disabled",false);
    $('#processInfo').find('ul.nav li').removeClass('active');
    $('#processInfo').find('ul.nav li:first').addClass('active');
    $('#processInfo').find('div.tab-content div').removeClass('active');
    $('#processInfo').find('#processInformation').addClass('active');
    getProcessInfoTab();
}

/**
 * @Function Name   : getProcessInfoTab
 * @Description     : This function is used to show process information.
 * @param           : process information
 * @returns         :
 * */
function getProcessInfoTab() {
    $('.insSummaryMessage').addClass('hide');
    $(".insSummary").addClass('hide');
    getProcessInfo();
}

/**
 * @Function Name   : getProcessInfo
 * @Description     : This function is used to fetch process information.
 * @param           : process information
 * @returns         :
 * */
function getProcessInfo() {
    var data = {
        id: proId
    };
    sendAjaxCall('console/processes', "GET", false, true, "json", data, handleProcessesAjaxError, populateProcessInfoList);
}

/**
 * @Function Name   : populateProcessInfoList
 * @Description     : This function is used to populate process information.
 * @param           : list of process information
 * @returns         :
 * */
function populateProcessInfoList(data) {
    $('#processInfoTable').empty();
    $('#processData').empty();
    if (data.process != null && data.process != "") {
        $('#processInfoTable').append('<tr><td>Name &nbsp;&nbsp;</td><td>' + data.process.name + '</td></tr>');
        $('#processInfoTable').append('<tr><td>Package &nbsp;&nbsp;</td><td>' + data.process.packageName + '</td></tr>');
        $('#processInfoTable').append('<tr><td>Namespace &nbsp;&nbsp;</td><td>' + data.process.namespace + '</td></tr>');
        $('#processInfoTable').append('<tr><td class="infoProcessId">Process Id &nbsp;&nbsp;</td><td>' + data.process.pid + '</td></tr>');
        $('#processInfoTable').append('<tr></tr>');
        $('#processInfoTable').append('<tr><td class="thick" height="50">Properties: &nbsp;&nbsp;</td></tr>');
        $("#processInfo .modal_heading").text($('#processDetails').text() + data.process.name);
        $.each(data.process.processProperties, function(key, value) {
            $('#processInfoTable').append('<tr><td>' + value.name + ' &nbsp;</td><td>' + value.value + '</td></tr>');
        });
        setTimeout(function() {
            if ($('#processInfoTable').width() > 550)
                adjustModal('processInfo', $(window).width());
        }, 400);

        if ($('#processInformation div:first').height() >= $(window).height() - 280)
            $('#processInformation div:first').css('height', $(window).height() - 270);
    }
}

/**
 * @Function Name   : getProcessResourceTab
 * @Description     : This function is used to show process resources.
 * @param           : list of process resources
 * @returns         :
 * */
function getProcessResourceTab() {
    getProcessResource();
}

/**
 * @Function Name   : getProcessResource
 * @Description     : This function is used to fetch process resources.
 * @param           : list of process resources
 * @returns         :
 * */
function getProcessResource() {
    addLoading($('#processResourceTable'));
    $("#processInfo").css("position","absolute");
    $('#processResourceSpan').text('');
    var data = {
        id: proId
    };
    sendAjaxCall('console/processes/resources', "GET", false, true, "json", data, handleProcessesAjaxError, populateProcessResourceList);
}

/**
 * @Function Name   : populateProcessResourceList
 * @Description     : This function is used to populate process resources.
 * @param           : list of process resources
 * @returns         :
 * */
function populateProcessResourceList(data) {
    processResourceTable.fnClearTable();
    if (data.resource != null && data.resource != "") {
        $.each(data.resource, function(key, value) {
            var items = [];
            items[items.length] = '<label class="position-relative logClass"><input class="ace" type="checkbox" onclick="updateHeaderCheckbox(this)" value="' + value.location + '" name="' + value.name + '" id="' + key + '" /><span class="lbl"></span></label>';
            items[items.length] = value.name;
            processResourceTable.fnAddData(items, false);
        });
        processResourceTable.fnDraw(true);
        $('#processResourceTable tr th:first input').prop('checked', false);
        $('#processResourceTable_filter').find('a').attr('onclick', 'javascript:getProcessResource()');
        removeLoading($('#processResourceTable'));
        if ($('#processResourceTable').width() > 550)
            adjustModal('processInfo', $(window).width());
        applyNiceScroll($('#processResourceTable_wrapper').find('.table_container'), 300);
    }
}

/**
 * @Function Name   : showDiagramTab
 * @Description     : This function is used to show process diagram.
 * @param           :
 * @returns         :
 * */
function showDiagramTab() {
    $("#svgActInsInfo").addClass('hide');
    if (is_ie8) {
        showInformation($('#ie8NotSupportSVG').text())
    } else {
        $('#processInfo .modal-dialog').animate({
            width: $(window).width() - 30
        }, 1000);
        getProcessDiagram();
    }
}

/**
 * @Function Name   : getProcessDiagram
 * @Description     : This function is used to get process diagram.
 * @param           :
 * @returns         :
 * */
function getProcessDiagram() {
    $('#showDiagram').empty();
    addLoading($('#showDiagram'));
    $('#loading').css('margin-top', '-15px ');
    var data = {
        id: proId
    };
    sendAjaxCall('console/processes/images/svg', "GET", false, true, "xml", data, handleProcessesAjaxError, populateProcessDiagram);
}

/**
 * @Function Name   : populateProcessDiagram
 * @Description     : This function is used to populate process diagram.
 * @param           :
 * @returns         :
 * */
function populateProcessDiagram(data) {
    if ($(data).find('svg') != undefined) {
        $('#showDiagram').append($(data).find('svg'));
        removeLoading($('#showDiagram'));
    }
}

function executeEvent(evt) {

}

/**
 * @Function Name   : DownloadDiagram
 * @Description     : This function is used to download process diagram.
 * @param           :
 * @returns         :
 * */
function DownloadDiagram(type) {
    window.location.href = 'console/processes/images/' + type + '/export?id=' + proId;
}

/**
 * @Function Name   : downloadResources
 * @Description     : This function is used to download process resources.
 * @param           :
 * @returns         :
 * */
function downloadResources() {
    var selectedRows = $('#processResourceTable .row_selected');
    if (!isObjectEmpty(selectedRows))
        $('#processResourceSpan').text('');
    var resources = "";
    $.each(selectedRows, function(key, row) {
        var resourceDetails = "&resource[]=" + $(row).find('input').attr('id');
        resources += resourceDetails;
    });
    var data = {
        id: proId,
        resource: resources
    };
    if (resources != "")
        window.location.href = 'console/files/resource/export?id=' + proId + resources;
    else
        $('#processResourceSpan').text($('#selectResourceFile').text());
}

/**
 * @Function Name   : showInstanceInfo
 * @Description     : This function is used to show instances for a particular process.
 * @param           :
 * @returns         :
 * */
function showInstanceInfo(status, processId, processName) {
    $("#bcStatus").text(status);
    $("#bcProcId").text(processId);
    $("#bcProcName").text(processName);
    $('#moduleID11 a').trigger('click');
}

/**
 * @Function Name   : confirmDeleteDeploy
 * @Description     : This function is used to confirm the delete deployment for the process.
 * @param           :
 * @returns         :
 * */
function confirmDeleteDeploy() {
    var data = {
        id: selectedProcessIds
    };
    addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
    sendAjaxCall('console/deployment/processes/undeploy', "POST", false, true, "json", data, handleProcessesAjaxError, populateDeleteSuccess);
}

function populateDeleteSuccess(response) {
    if (selectedProcessIds.length == totalPackageCount && processPaginationData.requiredPage > 1 && $("#processesPageNo").val() == totalProcessPageSize)
        processPaginationData.requiredPage = parseInt(processPaginationData.requiredPage - 1);
    if (response.success_message != undefined) {
        getNextPrevPageProcessesData('delete');
        showNotification(response.success_message);
    } else if (response.error_message != undefined) {
        showErrorNotification(response.error_message);
        removeLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'), false);
    } else {
        getNextPrevPageProcessesData('delete');
        showNotification(response.partial_success_message);
        showErrorNotification(response.partial_error_message)
    }
    
}

/**
 * @Function Name   : saveORUpdateProcessFilter
 * @Description     : save / update the process filter
 * @param           :
 * @returns         :
 * */
function saveORUpdateProcessFilter(action) {
    anyProcessValue = true;
    var filterProcessName = $.trim($('#filterProcessName').val());
    var specialCharacterOnly = /^[^\w\s]*$/gi;
    var underscoreOnly = /^[\_]*$/gi;
    var filterId = $('#processFilters').val();
    if (filterProcessName == "") {
        $('#processFilterSpan').text(defaultValue.enterFilterName);
        $('#processFilterSpan').removeClass('hide');
        $('#filterProcessName').focus();
    } else if (specialCharacterOnly.test(filterProcessName)) {
        $('#processFilterSpan').text($('#specialCharacterOnly').text());
        $('#processFilterSpan').removeClass('hide');
    } else if (underscoreOnly.test(filterProcessName)) {
        $('#processFilterSpan').text($('#underscoreOnly').text());
        $('#processFilterSpan').removeClass('hide');
    } else {
        var filterLifeCycle = $('#filterLifeCycle').val();
        var filterStatus = $('#filterStatus').val();
        $('#processFilterSpan').addClass('hide');
        var status = [];
        $('#filterStatus :selected').each(function(i, selected) {
            status[i] = $(selected).val();
        });
        filterProcesses = $('#mon_filterProcesses').val();
        filterpackages = $('#mon_filterPackages').val();
        if (filterpackages != null && filterpackages.length !=0 && (filterProcesses == null || filterProcesses.length == 0)) {
            $('#processFilterSpan').text($('#atleastOneProcessMsg').text());
            $('#processFilterSpan').removeClass('hide');
            return false;
        }
        if (filterProcesses != null && filterProcesses.length > 0)
            anyProcessValue = false;
        if (filterLifeCycle == "") {
            var data = {
                filter: JSON.stringify({
                    name: filterProcessName,
                    allProcesses: anyProcessValue,
                    isProcess: true,
                    createdBefore: $('#startedDeployedBefore').val(),
                    createdAfter: $('#startedDeployedAfter').val()
                }),
                filter_state: status,
            };
        } else {
            var data = {
                filter: JSON.stringify({
                    name: filterProcessName,
                    allProcesses: anyProcessValue,
                    processState: filterLifeCycle,
                    isProcess: true,
                    createdBefore: $('#startedDeployedBefore').val(),
                    createdAfter: $('#startedDeployedAfter').val()
                }),
                filter_state: status
            };
        }
        if (filterpackages != null && filterpackages != undefined)
            data.filter_process = filterpackages.concat(filterProcesses);
        if (filterId == "") {
            if (!isProcessFilterExist(filtersName, filterProcessName)) {
                $('#saveProcessFilter').attr('data-dismiss', 'modal');
                sendAjaxCall("console/filters", "POST", false, true, "json", data, handleProcessesAjaxError, function(response) {
                    if (response.error_message != undefined)
                        showErrorNotification(response.error_message);
                    else if (response.success_message != undefined) {
                        isProcessModalOpen = false;
                        showNotification(response.success_message);
                    }
                });
            } else {
                $('#processFilterSpan').text($('#processFilterNameExist').text());
                $('#processFilterSpan').removeClass('hide');
            }
        } else {
            if (!isUpdateFilterNameExist(filtersName, filterProcessName, mon_procFilObj.getItem(mon_procFilObj.getValue()).text())) {
                $('#saveProcessFilter').attr('data-dismiss', 'modal');
                sendAjaxCall("console/filters/" + filterId, "POST", false, true, "json", data, handleProcessesAjaxError, function(response) {
                    if (response.error_message != undefined) {
                        showErrorNotification(response.error_message);
                    } else if (response.success_message != undefined) {
                        if (mon_procFilObj.getItem(mon_procFilObj.getValue()).text() == $('#filter_process_name').text()) {
                            processPaginationData.filterId = response.filter;
                            currentProcessFilterId = response.filter;
                            processPaginationData.requiredPage = parseInt(1);
                            if (userCache != null && userCache != undefined && $("#userid").text() != "") {
                                userCache.processFilter = parseInt(response.filter);
                                userCache.processFilterName = $('#filterProcessName').val();
                                $.jStorage.set($("#userid").text(), userCache);
                            }
                            addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
                            $('#bcProcessFilterName').text($('#filterProcessName').val());
                            $('#filter_process_name').text($('#filterProcessName').val())
                            sendAjaxCall('console/processes', "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);

                        }
                        updatedFilterList();
                        updateFilter();
                        showNotification(response.success_message);
                    }
                });
            } else {
                $('#processFilterSpan').text($('#processFilterNameExist').text());
                $('#processFilterSpan').removeClass('hide');
            }
        }
    }

}

/**
 * @Function Name   : getProcessFilters
 * @Description     : This function is used to get all list of filters, update filter
 * @param           :
 * @returns         :
 * */
function getProcessFilters(action) {
    var data = {};
    if (action == "create")
        sendAjaxCall("console/filters?isProcess=true", "GET", false, true, "json", data, handleProcessesAjaxError, populateProcessFilters);
    else if ($('#processFilters').val() !="")
        sendAjaxCall("console/filters/" + $('#processFilters').val(), "GET", false, true, "json", data, handleProcessesAjaxError, populateProcessFilterData);
    else if ($('#processFilters').val() == "") {
        $('#createProcessFilter').find('.modal-footer').addClass('hide');
        clearFilterData();
        $('#filterCreateTable').removeClass('show');
    } else
        clearFilterData();
}

/**
 * @Function Name   : populateProcessFilterData
 * @Description     : This function is used to populate filters.
 * @param           :
 * @returns         :
 * */
function populateProcessFilterData(data) {
    $('#createProcessFilter').find('.modal-footer').removeClass('hide');
    $('#filterCreateTable').addClass('show');
    $('#filterProcessName').val(data.filter.name);
    $('#startedDeployedBefore').val(data.filter.createdBefore);
    $('#startedDeployedAfter').val(data.filter.createdAfter);
    mon_lifeCycleObj.setValue(data.filter.processState);
    var selStatus = [];
    $.each(sortFilterStatus(data.filter_state), function(key, value) {
        if (value.selected == true) {
            selStatus.push(value.id);
            if (value.name == "Active")
                mon_insStatusObj.addOption({id:value.id,value:"In Progress"});
            else
                mon_insStatusObj.addOption({id:value.id,value:value.name});
        } else {
            if (value.name == "Active")
                mon_insStatusObj.addOption({id:value.id,value:"In Progress"});
            else
                mon_insStatusObj.addOption({id:value.id,value:value.name});
       }
    });
    mon_insStatusObj.setValue(selStatus);
    $('#processDeleteFilter').removeClass('hide');
    populatePackagesInFilters(data);
}

/**
 * @Function Name   : clearFilterData
 * @Description     : This function is used to clear filter data.
 * @param           :
 * @returns         :
 * */
function clearFilterData() {
    mon_procFilObj.setValue("");
    $('#filterProcessName').val("");
    $('#processDeleteFilter').addClass('hide');
    $('#startedDeployedBefore').val("");
    $('#startedDeployedAfter').val("");
    fetchFilterState();
}

/**
 * @Function Name   : populateProcessFilters
 * @Description     : This function is used to populate filters.
 * @param           :
 * @returns         :
 * */
function populateProcessFilters(data) {
    if (data.filter.length > 0) {
        filtersName = [];
        mon_procFilObj.clearOptions();
        $.each(data.filter, function(key, obj) {
            filtersName[key] = obj.name;
            mon_procFilObj.addOption({id:obj.id,value:obj.name});
        });
    }
    clearFilterData();
    $('#newFilter').prop('checked', false);
    $('#updateFilters').prop('checked', false);
    $('#filterUpdateTable').removeClass('show');
    $('#filterCreateTable').removeClass('show');
    $('#createProcessFilter').find('.modal-footer').addClass('hide');
    $('#processFilterSpan').addClass('hide');
    $('#saveProcessFilter').removeAttr('data-dismiss');

    if (isProcessModalOpen){
        $('#createProcessFilter .modal-dialog').css({
            'width': $(window).width() - 760 + 'px',
            'margin-top': '0px',
            'padding': '10px'
         })
        mon_packagesObj.clearOptions();
        mon_processesObj.clearOptions();
        modalShow('createProcessFilter');
    }
}

/**
 * @Function Name   : fetchFilterState
 * @Description     : This function is used to fetch filter states.
 * @param           :
 * @returns         :
 * */
function fetchFilterState() {
    var data = {};
    sendAjaxCall("console/filters/new", "GET", false, true, "json", data, handleProcessesAjaxError, function(response) {
        if (response.filter_state != null && response.filter_state != null) {
            filterState = response.filter_state;
            mon_insStatusObj.clearOptions();
            $.each(sortFilterStatus(response.filter_state), function(key, obj) {
                if (obj.name == "Active")
                    mon_insStatusObj.addOption({id:obj.id,value:"In Progress"});
                else
                    mon_insStatusObj.addOption({id:obj.id,value:obj.name});
            });
        }
        populatePackagesInFilters(response);
        mon_lifeCycleObj.clearOptions();
        mon_lifeCycleObj.addOption({id : "Active",value : "ACTIVE"});
        mon_lifeCycleObj.addOption({id : "Retired",value : "RETIRED"});
    });
}

var mon_packageList = {};
function populatePackagesInFilters(data){
    var prevPackage;
    var processesSelectedList = [];
    var packageSelectedList = [];
    if(data.filter_process){
        mon_packagesObj.clearOptions();
        mon_processesObj.clearOptions();
        $.each(data.filter_process, function(key, object) {
            if (object.package) {
                var packName = object.name + " [v" + object.version + "]";
                prevPackage = object.id;
                mon_packageList[prevPackage] = [];
                if(object._selected){
                    mon_packagesObj.addOption({id : object.id,value : packName});
                    packageSelectedList.push(object.id);
                }
                else
                    mon_packagesObj.addOption({id : object.id,value : packName});
            } else {
                    mon_packageList[prevPackage].push({name: object.name,id: object.id});
                    if (object._selected) {
                        mon_processesObj.addOption({id:object.id,value:object.name});
                        processesSelectedList.push(object.id);
                    }
            }
        });
        if(processesSelectedList.length>0)
            mon_processesObj.setValue(processesSelectedList);
        if(packageSelectedList.length>0)
            mon_packagesObj.setValue(packageSelectedList);
    }
}

function populateProcessFromPackage(obj) {
    if(($("#mon_filterPackages").val()!=null))
        $("#mon_filterProcesses").parent().parent().removeClass("hide");
    else
        $("#mon_filterProcesses").parent().parent().addClass("hide");
    var prevProcessList    = $("#mon_filterProcesses").val();
    var processesInPackege = $(obj).val();
    var selectedProcessess = [];
    mon_processesObj.clearOptions();
    if (processesInPackege != null && processesInPackege.length > 0) {
        $.each(processesInPackege, function(key, value) {
            $.each(mon_packageList[value], function(key1, value1) {
                if (prevProcessList != null && prevProcessList.length > 0) {
                    if ($.inArray(value1.id, prevProcessList) >= 0){
                        addOptionToProcesses(value1.id,value1.name,true);
                        selectedProcessess.push(value1.id);
                    }
                    else
                        addOptionToProcesses(value1.id,value1.name);
 
                } else 
                    addOptionToProcesses(value1.id,value1.name);
            });
        });
        if(selectedProcessess.length>0)
            mon_processesObj.setValue(selectedProcessess);
    }
}

function addOptionToProcesses(id,name,setValue){
    mon_processesObj.addOption({id:id,value:name});
}

/**
 * @Function Name   : fetchProcessFilters
 * @Description     : This function is used to fetch process filter.
 * @param           :
 * @returns         :
 * */
function fetchProcessFilters() {
    var data = {};
    sendAjaxCall("console/filters?isProcess=true", "GET", false, true, "json", data, handleProcessesAjaxError, fetchProcessFiltersSuccess);
}

/**
 * @Function Name   : fetchProcessFiltersSuccess
 * @Description     : This function is used to fetch process filter.
 * @param           : list of filters
 * @returns         :
 * */
function fetchProcessFiltersSuccess(data) {
    $('#filterProcessDropdown li:gt(0)').remove();
    filtersName = [];
    if (data.filter.length > 0) {
        $('#filterProcessDropdown').append('<li class="divider"></li>');
        $.each(data.filter, function(key, value) {
            filtersName[key] = value.name;
            $('#filterProcessDropdown').append('<li><a fid="' + value.id + '" onclick="processFilterChange(this);">' + value.name + '</a></li>');
        });
    }
}

/**
 * @Function Name   : processFilterChange
 * @Description     : This function is executed when process filter is change.
 * @param           : list of filters
 * @returns         :
 * */
function processFilterChange(object) {
    addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
    $('#filter_process_name').text($(object).text());
    $('#bcProcessFilterName').text($(object).text());
    $('#breadcrumbProcessFilter').removeClass('hide');
    currentProcessFilterId = $(object).attr('fid');
    processPaginationData.filterId = $(object).attr('fid');
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.processFilter = $(object).attr('fid');
        userCache.processFilterName = $(object).text();
        $.jStorage.set($("#userid").text(), userCache);
    }
    processPaginationData.requiredPage = parseInt(1);
    if (userCache != null && userCache != undefined && userCache.mProcessPagesize != null)
        processPaginationData.pageSize = parseInt(userCache.mProcessPagesize);
    else
        processPaginationData.pageSize = parseInt(10);
    sendAjaxCall('console/processes', "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);
}

/**
 * @Function Name   : deleteProcessFilter
 * @Description     : This function is used to delete the filter.
 * @param           : list of filters
 * @returns         :
 * */
function deleteProcessFilter() {
    if ($('#processFilters').val() != -1) {
        var data = {};
        sendAjaxCall("console/filters/" + $('#processFilters').val(), "DELETE", false, true, "json", data, handleProcessesAjaxError, function(response) {
            if (response.success_message != undefined) {
                isProcessModalOpen = false;
                removeProcessBreadCrumbs();
                showNotification(response.success_message);
            } else
                showErrorNotification(response.error_message);
        });
        $('#createProcessFilter').modal('hide');
    }
}

function createNewFilter() {
    clearFilterData();
    $('#saveProcessFilter').text($('#processFilterCreateBtn').text());
    $('#createProcessFilter').find('.modal-footer').removeClass('hide');
    $('#saveFilter').addClass('show');
    $('#filterUpdateTable').removeClass('show');
    $('#filterCreateTable').addClass('show');
}

function updateFilter() {
    clearFilterData();
    $('#saveProcessFilter').text($('#processFilterUpdateBtn').text());
    $('#processFilterSpan').addClass('hide');
    $('#createProcessFilter').find('.modal-footer').addClass('hide');
    $('#saveFilter').addClass('show');
    $('#filterUpdateTable').addClass('show');
    $('#filterCreateTable').removeClass('show');

}

function confirmDeleteProcessFilter() {
    modalShow('deletefilterModal');
}

function isProcessFilterExist(filterArr, filtername) {
    var flag = false;
    $.each(filterArr, function(key, value) {
        if (value.toLowerCase() == filtername.toLowerCase())
            flag = true;
    });
    return flag;
}

function isUpdateFilterNameExist(filterArr, filtername, selectedFilter) {
    var flag = false;
    $.each(filterArr, function(key, value) {
        if (selectedFilter.toLowerCase() == filtername.toLowerCase())
            flag = false;
        else if (value.toLowerCase() == filtername.toLowerCase())
            flag = true;
    });
    return flag;
}

function getUpdatedList() {
    getNextPrevPageProcessesData('update');
    updateProcessShowEntries();
}

function getProcessCount(oTableLocal) {
    var cunt = 0;
    "use strict";
    var aTrs = oTableLocal._('tr', {
        "filter": "applied"
    });
    for (var i = 0; i < aTrs.length; i++) {
        if ((aTrs[i][11]) == false)
            cunt++;
    }
    return cunt;
}


function updatedFilterList() {
    var data = {};
    sendAjaxCall("console/filters?isProcess=true", "GET", false, true, "json", data, handleProcessesAjaxError, populateUpdatedFilters);
}

function populateUpdatedFilters(data) {
    fetchProcessFiltersSuccess(data);
    isProcessModalOpen = false;
    populateProcessFilters(data);
}

/**
 * @Function Name   : handleProcessesAjaxError
 * @Description     : handles all the error response for ajax calls in process page
 * @param           :
 * @returns         :
 * */
function handleProcessesAjaxError(e) {
    showInformation(e.responseText);
    removeLoading('', true);
    return false;
}

function openSortPopup() {
    var tmpString = processPaginationData.orderBy;
    var sortedString = $.trim(tmpString.substring(0, tmpString.lastIndexOf("+")));
    var sortedOrder = sortedString[0];
    if (sortedString.slice(1) == 'package') {
        $("#packageOrder").removeAttr("class");
        $("#packageOrder_chzn").remove();
        $("#packageOrder option[value='" + sortedOrder + "']").attr('selected', 'selected');
        $("#packageOrder").chosen();
        $("#packageOrder_chzn").css("width", 110);
        $('#sortByPackageName').prop('checked', true);
    } else if (sortedString.slice(1) == 'deployed') {
        $("#deployedDateOrder").removeAttr("class");
        $("#deployedDateOrder_chzn").remove();
        $("#deployedDateOrder option[value='" + sortedOrder + "']").attr('selected', 'selected');
        $("#deployedDateOrder").chosen();
        $("#deployedDateOrder_chzn").css("width", 110);
        $('#sortByDeployedDate').prop('checked', true);
    } else if (sortedString.slice(1) == 'lastactive') {
        $("#lastActiveOrder").removeAttr("class");
        $("#lastActiveOrder_chzn").remove();
        $("#lastActiveOrder option[value='" + sortedOrder + "']").attr('selected', 'selected');
        $("#lastActiveOrder").chosen();
        $("#lastActiveOrder_chzn").css("width", 110);
        $('#sortByLastActive').prop('checked', true);
    }
    modalShow('sortProcessModal');
}

function sortProcesses() {
    if ($('#sortByPackageName').is(':checked')) {
        processPaginationData.orderBy = $('#packageOrder').val() + 'package +name';
    } else if ($('#sortByDeployedDate').is(':checked')) {
        processPaginationData.orderBy = $('#deployedDateOrder').val() + 'deployed +name';
    } else if ($('#sortByLastActive').is(':checked')) {
        processPaginationData.orderBy = $('#lastActiveOrder').val() + 'lastactive +name';
    }
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.mProcessOrderBy = processPaginationData.orderBy;
        $.jStorage.set($("#userid").text(), userCache);
    }
    getProcessSortList();
}

/**
 * @Function Name   : getProcessSortList
 * @Description     : This function will populate the list of process
 * @param           :
 * @returns         :
 * */
function getProcessSortList() {
    monitoringProcessTable.fnFilter('');
    addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
    if (currentProcessFilterId == 0)
        processPaginationData.filterId = parseInt(-1);
    else
        processPaginationData.filterId = parseInt(currentProcessFilterId);
    processPaginationData.requiredPage = parseInt(1);
    if (userCache != null && userCache != undefined && userCache.mProcessOrderBy != null)
        processPaginationData.orderBy = userCache.mProcessOrderBy;
    else
        processPaginationData.orderBy = "-deployed +name";
    if (userCache != null && userCache != undefined && userCache.mProcessPagesize != null)
        processPaginationData.pageSize = parseInt(userCache.mProcessPagesize);
    else
        processPaginationData.pageSize = parseInt(10);
    sendAjaxCall('console/processes', "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);
}

/**
 * @Function Name   : getProcessSortList
 * @Description     : This function will populate the list of process
 * @param           :
 * @returns         :
 * */
function refreshProccessList() {
    monitoringProcessTable.fnFilter('');
    addLoading($('#' + defaultValue.monitoringProcessId + '_wrapper'));
    processPaginationData.requiredPage = parseInt(1);
    sendAjaxCall('console/processes', "GET", false, true, "json", processPaginationData, handleProcessesAjaxError, populateProcessList);
}

function showLegend(obj) {
    var pos = $(obj).offset();
    var posLeft = pos.left + ($(obj).width()) / 2 - 35;
    $('#lifeCycleLegend').removeClass('hide');
    $('#lifeCycleLegend').css('left', posLeft).css('top', (pos.top + 16)).css('right', 'auto');
}

function hideLegend(obj) {
    $('#lifeCycleLegend').addClass('hide');
}

function removeProcessBreadCrumbs() {
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.processFilter = parseInt(-1);
        userCache.processFilterName = null;
        $.jStorage.set($("#userid").text(), userCache);
    }
    getProccessList();
}

/**
 * @Function Name   : getProcessServiceTab
 * @Description     : This function is used to show process services.
 * @param           : list of process resources
 * @returns         :
 * */
function getProcessServiceTab() {
    getProcessServices();
}

/**
 * @Function Name   : getProcessServices
 * @Description     : This function is used to fetch process services.
 * @param           : list of process resources
 * @returns         :
 * */
function getProcessServices() {
    addLoading($('#processServicesTable'));
    var data = {};
    sendAjaxCall('console/processes/services?id=' + proId, "GET", false, true, "json", data, handleProcessesAjaxError, populateProcessServiceList);
}

/**
 * @Function Name   : populateProcessServiceList
 * @Description     : This function is used to populate process services.
 * @param           : list of process resources
 * @returns         :
 * */
function populateProcessServiceList(data) {
    processServicesTable.fnClearTable();
    if (data.services != null && data.services != "") {
        $.each(data.services, function(key, obj) {
            var serviceURL = obj.endpointUrl;
            var serviceName = serviceURL.split("/ode/processes/")[1];
            var items = [];
            items[items.length] = '<a class="noDecoration" href="' + obj.wsdlUrl + '" target="_blank">' + serviceName + '</a>';
            items[items.length] = obj.endpointUrl;
            items[items.length] = obj.operations;
            processServicesTable.fnAddData(items, false);
        });
        processServicesTable.fnDraw(true);
        setTimeout(function() {}, 300);
        $('#processServicesTable_filter').find('a').attr('onclick', 'javascript:getProcessServices()');
        if ($('#processServicesTable').width() > 550)
            adjustModal('processInfo', $(window).width());
        applyNiceScroll($('#processServicesTable_wrapper').find('.table_container'), 300);
    }
    $('.dataTables_empty').text($('#noServiceFound').text());
    removeLoading($('#processServicesTable'));
}

function updateButtons(obj) {
    var row = $(obj).closest('tr');
    var rowText = $(row).find('td:eq(2) span a').attr('data-content');
    if ($(obj).prop('checked')) {
        if (rowText.indexOf('ACTIVE') >= 0) {
            buttonCount.active = parseInt(buttonCount.active + 1);
            $('#activeButton').attr('disabled', 'disabled');
        } else if (rowText.indexOf('RETIRED') >= 0) {
            buttonCount.retired = parseInt(buttonCount.retired + 1);
            $('#retireButton').attr('disabled', 'disabled');
        }
    } else {
        if (rowText.indexOf('ACTIVE') >= 0) {
            buttonCount.active = parseInt(buttonCount.active - 1);
            if (buttonCount.active == 0)
                $('#activeButton').removeAttr('disabled');
        } else if (rowText.indexOf('RETIRED') >= 0) {
            buttonCount.retired = parseInt(buttonCount.retired - 1);
            if (buttonCount.retired == 0)
                $('#retireButton').removeAttr('disabled');
        }
    }
    updateStartButton();
}

function updateChildrenCheckBox(obj) {
    if ($(obj).prop('checked'))
        selectAll(obj);
    else
        unSelectAll(obj);
}

function selectAll(obj) {
    $(obj).closest('table').find('tr > td:first-child input:checkbox')
        .each(function() {
            var rowText = $(this).closest('tr').find('td:eq(2) span a').attr('data-content');
            this.checked = obj.checked;
            $(this).closest('tr').addClass('row_selected');
            if (rowText != undefined && rowText.indexOf('ACTIVE') >= 0) {
                buttonCount.active = parseInt(buttonCount.active + 1);
                $('#activeButton').attr('disabled', 'disabled');
            } else if (rowText != undefined && rowText.indexOf('RETIRED') >= 0) {
                buttonCount.retired = parseInt(buttonCount.retired + 1);
                $('#retireButton').attr('disabled', 'disabled');
            }
        });
    updateStartButton();
}

function unSelectAll(obj) {
    $(obj).closest('table').find('tr > td:first-child input:checkbox')
        .each(function() {
            var rowText = $(this).closest('tr').find('td:eq(2) span a').attr('data-content');
            this.checked = obj.checked;
            $(this).closest('tr').removeClass('row_selected');
            if (rowText != undefined && rowText.indexOf('ACTIVE') >= 0) {
                if (buttonCount.active > 0)
                    buttonCount.active = parseInt(buttonCount.active - 1);
                if (buttonCount.active === 0)
                    $('#activeButton').removeAttr('disabled');
            } else if (rowText != undefined && rowText.indexOf('RETIRED') >= 0) {
                if (buttonCount.retired > 0)
                    buttonCount.retired = parseInt(buttonCount.retired - 1);
                if (buttonCount.retired === 0)
                    $('#retireButton').removeAttr('disabled');
            }
        });
    updateStartButton();
}

function updateStartButton() {
    if (buttonCount.active > 1 || buttonCount.retired >= 1)
        $('#startButton').attr('disabled', 'disabled');
    else if (buttonCount.active == 1 || buttonCount.active == 0 && buttonCount.retired == 0)
        $('#startButton').removeAttr('disabled');
}


function showStartTimer(pid, name) {
    proId = pid;
    $('#startTimerModal').modal('show');
    if(name.length>50)
        $('#startTimerModal .modal_heading').html($('#processStartTimer').text() + ':  ' + name.replace(":",":</br>"))
    else
        $('#startTimerModal .modal_heading').text($('#processStartTimer').text() + ':  ' + name)
    if (typeof getProcessStartTimerDetails == 'undefined') {
        loadJs('scripts/custom/administration/monitoring/startTimer.js', function() {
            getProcessStartTimerDetails(pid);
        });
    } else
        getProcessStartTimerDetails(pid);
}

function getBREFile(name){
	getBREFiles(name);
}

function getBREFiles(name){
	$('#breTableModal').modal('hide');
	addLoading('#breResourceTable_wrapper');
	brePackage = name;
	var data ={
		package : name
	};
	sendAjaxCall("dtdeployment/bre/list/package", "GET", false, true, "json", data, handleProcessesAjaxError, populateBRE);
}

function populateBRE(data){
	breResourceTable.fnClearTable();
	var ownerPackage ;
    if (data.bredecisiontable != null && data.bredecisiontable != "") {
        $.each(data.bredecisiontable, function(key, value) {
            var items = [];
            var pathURL = value.relativepath;
			var relativepath = pathURL.replace(/\\/g, '\\\\');
			if(value.access === "none")
				items[items.length] = value.name;
			else
				items[items.length] = '<a href="#" class="noDecoration" onclick="getBRETableDt(\''+relativepath+'\' , \'false\', \''+value.updationSupported+'\')">'+value.name+'</a>';
            ownerPackage = value.ownerPackage;
            breResourceTable.fnAddData(items, false);
        });
        breResourceTable.fnDraw(true);
        $('#breResourceTable_filter').find('a').attr('onclick', 'javascript:refreshBRE()');
        applyNiceScroll($('#breResourceTable_wrapper').find('.table_container'), 300);
    }
	modalShow('breTableModal');
	$('#breResourceTable_wrapper').find('.table_container').removeAttr( 'style' );
	$('#breTableModal .modal_heading').text($('#readOnlyBusinessRules').text());
	removeLoading('#breResourceTable_wrapper');
}

function getBRETableDt(path, editable, isOldVersion){
	if(isOldVersion != "true"){
		showInformation($("#businessRuleEditorViewError").text());
	}else{
		loadCss('style/custom/businessRules/businessRules.css','');
		isBRECalledFromProcess = true;
		if (typeof getBRETableDataForMonitoring == 'undefined') {
			loadJs('scripts/custom/businessRules/businessRules.js', function() {
			});
			setTimeout(function() {
				getBRETableDataForMonitoring(path, editable,"true");
			}, 200);
		} else
			getBRETableDataForMonitoring(path, editable,"true");
	}
}

function refreshBRE(){
	addLoading('#breResourceTable_wrapper');
	var data ={
		package : brePackage
	};
	sendAjaxCall("dtdeployment/bre/list/package", "GET", false, true, "json", data, handleProcessesAjaxError, populateBRE);
}

function getActivityInstanceSummary(){
    $(".actInsBtn").find("button").attr("disabled",true);
    prevProId = proId;
    addLoading($('#showDiagram'));
    if(proId)
        sendAjaxCall(intalio_bpms.monitoring_processes.getActivityInsSummary+"?id="+proId, "GET", false, true, "json", {}, handleProcessesAjaxError, function(response){
            removeLoading();
            if(response && response.activity_status_summary==null)
                $('.insSummaryMessage').removeClass('hide');
            else if(response.activity_status_summary && isObjectEmpty(response.activity_status_summary.summary)){
                showNotification($("#noInstanceMsg").text());
                $(".insSummary").addClass('hide');
                $('.insSummaryMessage').addClass('hide');
            }
            else{
                showNotification($('#insSummaryGenerated').text());
                actInsSummary = response;
                $(".insSummary").addClass('hide');
                $('.insSummaryMessage').addClass('hide');
                $.each(response['activity_status_summary']['summary'],function(key,value){
                    $.each($('#showDiagram').find('svg rect'),function(key1,value1){
                        if($(this).attr('bpmn:activity-id')==key)
                            $(this).attr('fill','orange');
                    });
                });
            }
            $(".actInsBtn").find("button").attr("disabled",false);
        },ajaxInsSummaryTimeOut);
}

function executeEvent(evt){
    var object = $(evt.target);
    if ($(object).attr('oldfill')==undefined)
        $(object).attr('oldfill', $(object).attr('fill'));
    $(object).attr('fill','green');
    if (prevActivityObj)
        prevActivityObj.attr('fill', prevActivityObj.attr('oldfill'));
    prevActivityObj = object;
    if(actInsSummary && proId==prevProId && actInsSummary['activity_status_summary']){
        var insData   =   actInsSummary['activity_status_summary']['summary'][$(object).attr('bpmn:activity-id')];
        var timeStamp =   actInsSummary['activity_status_summary']['timestamp'];        
        populateInsSummary(insData,timeStamp);
    }
    else
        showInformation($("#insSummaryValidate").text());
}

function populateInsSummary(data,time){
    $('.insSummaryMessage').addClass('hide');
    removeLoading();
    if(data){
        $('.inprogress').text(data['started']);
        $('.failure').text(data['failure']);
        $('.failed').text(data['fault']);
        $('.lastUpdated').text($.format.date(time, userPreferences.dateFormat+userPreferences.hourFormat));
    }else{
        $('.inprogress').text("0");
        $('.failure').text("0");
        $('.failed').text("0");
    }
    $(".insSummary").removeClass('hide');
}

/*This function will load analaytics js file if not loaded.*/
function loadAnalyticsJS() {
    if (typeof showAnalytics == "undefined")
        loadJs("scripts/custom/administration/monitoring/analytics.js?version=2676", function() {
            showAnalytics();
        });
    else
        showAnalytics();
}