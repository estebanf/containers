/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/** instancesTable holds the reference of instances data table*/
var instancesTable;

/** filterStateProcessesData holds the data of instances states & list of processes*/
var filterStateProcessesData;

/** This variable define an empty array*/
var anOpen = [];

/** filterPropertyLength stores the no of properties for a selected filter*/
var filterPropertyLength = 0;

/** actvityLableMap stores the activity id & bpel-activity id*/
var actvityLableMap = {};

/** svg_InstanceId stores the instance Id used for svg diagram*/
var svg_InstanceId;

/** svg_processId stores the process Id used for svg diagram*/
var svg_processId;

/** currentFilterId stores the selected filter id*/
var currentFilterId = 0;

/** totalRecords is used to calculate the pagination of instances page*/
var totalRecords;

/** endNumber is used to show the no of entries in table*/
var endNumber;

/** startNumber is used to show the no of entries in table*/
var startNumber;

/** filtersName holds the list of filters name*/
var filtersName = [];

/** totalPageSize holds the tolal page size*/
var totalPageSize;


var editor;
var currentInstanceName;
/**pagination required data for instances*/
var paginationData = {
    orderBy: "-last-active",
    pageSize: 50,
    requiredPage: 1
};

/** buttonCount holds the count for resume, invoke, terminated, suspended*/
var buttonCount = {
    resume: 0,
    invoke: 0,
    terminate: 0,
    suspended: 0
};

/** instancesOptions stores the data table options for instances table*/
var instancesOptions = {
    "bPaginate": false,
    "bStateSave": true,
    "bInfo": false,
    "bFilter": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bRetrieve": true,
    "bAutoWidth": false,
    "bDestroy": true,
    "bSort": false,
    "aoColumns": [{
        "sClass": "center"
    }, {
        "sClass": "center"
    }, {
        "sClass": "alignLeft",
        "sType": "string"
    }, {
        "sType": "string",
        "sClass": "center"
    }, {
        "sClass": "alignLeft"
    }, {
        "sClass": "alignLeft"
    }, {
        "sClass": "center"
    }, {
        "sClass": "center"
    }, {
        "sClass": "center"
    }]
}

/** instanceEventsOptions stores the data table options for event table*/
var instanceEventsOptions = {
    "bPaginate": false,
    "bStateSave": true,
    "bInfo": false,
    "bFilter": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bRetrieve": true,
    "bAutoWidth": false,
    "aaSorting": [
        [1, "desc"]
    ],
    "aoColumns": [{
        "bSortable": false,
        "sClass": "center"
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
        "bSortable": true,
        "sClass": "alignLeft"
    }]
}

var instanceEventsTable;

var actionButtons;

/** defaults stores the object of all the messages used in this js file*/
var defaults = {
    commonInstancesUrl: "console/instances",
    instancesTableId: "instances"
}

/**
 * @Function Name   : jquery ready function
 * @Description     : starting function of jquery used to initialize any variable / call the server to get the data
 * @param           :
 * @returns         :
 * */
$(document).ready(function() {
    addLoading($('.page-content'));
    $('#loading').css('margin-top', 100);
    getActionsList();
    $("#filters").bind("change", function() {
        fetchCurrentFilter();
    });
    $("#svgEventInfo").draggable();
    $('#searchInstanceById').bind("keypress", function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            searchById();
            return false;
        }
    });
    instanceEventsTable = $('#instanceEventsTableId').dataTable(instanceEventsOptions);
    customTable('instanceEventsTableId');
    $('.dataTables_empty').html("Fetching event(s)...");
    $('#instanceEventsTableId_wrapper').find('.table_refresh_icon').attr('onclick', 'refreshInstanceEvents();').attr('title', 'Refresh');
    applyNiceScroll($('#eventsTableScroll').find('.table_container'), 230);
});
/**
 * @Function Name   : instancesButtonHeader
 * @Description     : This method is use to add header buttons.
 * @param           :
 * @returns         :
 * */
function instancesButtonHeader(instanceIcon) {
    var iconButton;
    switch (instanceIcon) {
        case "Delete":
            iconButton = "<button title='Delete' type='button' id='deleteButton' onclick='javascript:deleteInstance();'class='btn btn-sm btn-white'><i class='fa fa-trash-o'></i><span class='no-mobile'>&nbsp;" + $('#deleteNameFmt').text() + "</span></button>&nbsp;";
            return iconButton;
            break;
        case "Resume":
            iconButton = "<button title='Resume' type='button' id='resumeButton' onclick='javascript:resumeInstance();'class='btn btn-sm btn-white'><i class='fa fa-step-forward bigger-90'></i><span class='no-mobile'>&nbsp;" + $('#resumeNameFmt').text() + "</span></button>&nbsp;";
            return iconButton;
            break;
        case "Suspend":
            iconButton = "<button title='Suspend' type='button' id='suspendButton' onclick='javascript:suspendInstance();'class='btn btn-sm btn-white'><i class='fa fa-pause bigger-80'></i><span class='no-mobile'>&nbsp;" + $('#suspendNameFmt').text() + "</span></button>&nbsp;";
            return iconButton;
            break;
        case "Terminate":
            iconButton = "<button title='Terminate' type='button' id='terminateButton' onclick='javascript:terminateInstance();'class='btn btn-sm btn-white'><i class='fa fa-stop bigger-60'></i><span class='no-mobile'>&nbsp;" + $('#terminateNameFmt').text() + "</span></button>&nbsp;";
            return iconButton;
            break;
        case "Invoke":
            iconButton = "<button title='Invoke' type='button' id='invokeButton' onclick='javascript:invokeInstance();'class='btn btn-sm btn-white'><i class='fa fa-play'></i><span class='no-mobile'>&nbsp;" + $('#invokeNameFmt').text() + "</span></button>&nbsp;";
            return iconButton;
            break;
        case "Filter":
            iconButton = "<div class='btn-group'><button title='Filter' type='button' id='filterButton' class='btn btn-sm btn-white dropdown-toggle ' data-toggle='dropdown' onclick='fetchFilters();'><i class='fa fa-filter'></i><span class='no-mobile'>&nbsp;<span id='filter_name'>" + $('#filterNameFmt').text() + "</span></span>&nbsp;<span class='fa fa-caret-down fa-on-right'></span></button>&nbsp;<ul class='dropdown-menu dropdown-info dropdown-caret' id='filterDropdown'> <li><a class='iconCursor' onclick=javascript:showManageFilters();>" + $('#managefilterFmt').text() + "</a></li><li class='divider'></a></li></ul>";
            return iconButton;
            break;
        case "viewAllInstances":
            iconButton = '<a title="' + $('#refreshNameFmt').text() + '" class="btn btn-sm btn-white table_refresh_icon" onclick=refreshInstancesList();><i class="fa fa-refresh"></i></a>';
            return $(iconButton);
            break;
        case "SearchById":
            iconButton = "<button title='Search by Instance ID' type='button' id='searchByIdButton' onclick='javascript:openSearchInstanceModal()'class='btn btn-sm btn-white'><i class='fa fa-search'></i> <span class='no-mobile'>" + $('#searchInstanceByIdFmt').text() + "</span></button>&nbsp;";
            return iconButton;
            break;
    }
}

/**
 * @Function Name   : sortInstanceData
 * @Description     : call the server for sorting the data on any column
 * @param           : th obj,name to which sorting is required
 * @returns         :
 * */
function sortInstanceData(obj, name) {
    $('#instances th span:gt(1)').addClass('hide');
    var sortHeaderName;
    $(obj).find('span').removeClass('hide');
    if ($(obj).attr('sort') == 'desc') {
        sortHeaderName = "+" + name;
        $(obj).find('span i').removeAttr('class').addClass('fa fa-sort-up blue');
        $(obj).attr('sort', 'asc');
    } else {
        sortHeaderName = "-" + name;
        $(obj).find('span i').removeAttr('class').addClass('fa fa-sort-down blue');
        $(obj).attr('sort', 'desc');
    }
    paginationData.orderBy = sortHeaderName;
    if (currentFilterId != 0)
        paginationData.filterId = currentFilterId;
    else
        paginationData.filterId = -1;
    if (userCache != null && userCache != undefined && userCache.mInstancesPageSize != null)
        paginationData.pageSize = userCache.mInstancesPageSize;
    else
        paginationData.pageSize = 10;
    
    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    if($("#searchedId").text()!="")
        sendAjaxCall("console/instances/"+parseInt($("#searchedId").text()), "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateParticularInstance);
    else if ($('#bcProcId').text()!=""){
        paginationData.id = $('#bcProcId').text();
        if ($('#bcStatus').text()!="" && $('#bcStatus').text()!="Total")
            paginationData.status = $('#bcStatus').text();
        sendAjaxCall("console/processes/instances", "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);
    }
    else
        sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);
}

/**
 * @Function Name   : getActionsList
 * @Description     : get the actions list for the logged in user
 * @param           :
 * @returns         :
 * */
function getActionsList() {
    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    var data = {
        parentId: "11"
    }
    sendAjaxCall("console/modules/actions", "GET", false, true, "json", data, handleInstancesAjaxError, populateActions);
}

/**
 * @Function Name   : populateActions
 * @Description     : populates the actions(buttons) which user has access
 * @param           :
 * @returns         :
 * */
function populateActions(data) {
    if (data.module != undefined) {
        var actions = data.module;
        actions[actions.length] = "SearchById";
        actions[actions.length + 1] = "Filter";
        actionButtons = actions;
    } else if (data.error_message != undefined)
        showErrorNotification(data.error_message);
    if ($('#auditInstaceId').text() != null && $('#auditInstaceId').text() != undefined && $('#auditInstaceId').text().length != 0)
        openAuditInstaceId($('#auditInstaceId').text());
    else
        getInstancesList(false, false, false);
}

function openAuditInstaceId(IID) {
    instancesTable = $("#" + defaults.instancesTableId).dataTable(instancesOptions);
    customTable(defaults.instancesTableId);
    $('.dataTables_empty').html("Fetching instance(s)...");
    $.each(actionButtons, function(key, value) {
        var actionButton = instancesButtonHeader(value);
        $('#' + defaults.instancesTableId + '_wrapper .row .tableButtons').append(actionButton);
    });
    searchById(IID);
}
/**
 * @Function Name   : getInstancesList
 * @Description     : get the instances list from server
 * @param           :
 * @returns         :
 * */
function getInstancesList(bol, removeStatus, removeProcName) {
    $('#breadcrumbInstanceId').addClass('hide');
    $('#breadcrumbFilter').addClass('hide');
    $('#breadcrumbLinkedInstance').addClass('hide');
    $('#searchedId').text("");
    $("#instancesHeader th:gt(8)").remove();
    instancesOptions.aoColumns = instancesOptions.aoColumns.slice(0, 9);
    if (instancesTable != undefined) {
        instancesTable.fnClearTable();
        instancesTable.fnDestroy();
    }
    instancesTable = $("#" + defaults.instancesTableId).dataTable(instancesOptions);
    customTable(defaults.instancesTableId);
    $('.dataTables_empty').html("Fetching instance(s)...");
    $.each(actionButtons, function(key, value) {
        var actionButton = instancesButtonHeader(value);
        $('#' + defaults.instancesTableId + '_wrapper .row .tableButtons').append(actionButton);
    });
    if (bol)
        addLoading($('#' + defaults.instancesTableId + '_wrapper'));

    if (removeStatus) {
        $('#bcStatus').text("");
        $('#breadcrumbStatus').empty();
    }
    if (removeProcName) {
        $('#bcProcId').text("");
        $('#bcProcName').text("");
        $('#breadcrumbProcessName').empty();
        $('#breadcrumbStatus').empty();
    }
    if ($('#bcProcId').text() != "") {
        if ($('#bcStatus').text() != "" && $('#bcStatus').text() != "Total") {
            var satusData = {
                id: $('#bcProcId').text(),
                status: $('#bcStatus').text()
            }
            if (userCache != null && userCache != undefined && userCache.mInstancesPageSize != null)
                satusData.pageSize = userCache.mInstancesPageSize;
            else
                satusData.pageSize = 10;
            paginationData.pageSize = satusData.pageSize;
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            $('#instanceStatus').text($('#bcStatus').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        } else {
            var satusData = {
                id: $('#bcProcId').text(),
            }
            if (userCache != null && userCache != undefined && userCache.mInstancesPageSize != null)
                satusData.pageSize = userCache.mInstancesPageSize;
            else
                satusData.pageSize = 10;
            paginationData.pageSize = satusData.pageSize;
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        }
    } else if (userCache != null && userCache != undefined && userCache.linkedInstance != null){
        var link = userCache.linkedInstance;
        $('#breadcrumbLinkedInstance span').text(link.name);
        $('#breadcrumbLinkedInstance').removeClass('hide');
        paginationData.ids = link.ids;
        paginationData.pageSize = 10;
        sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);
    } else {
        if (userCache != null && userCache != undefined && userCache.instanceFilter != null) {
            paginationData.filterId = parseInt(userCache.instanceFilter);
            currentFilterId = parseInt(userCache.instanceFilter);
            if (userCache.instanceFilterName != null) {
                $('#bcFilterName').text(userCache.instanceFilterName);
                $('#filter_name').text(userCache.instanceFilterName);
                $('#breadcrumbFilter').removeClass('hide');
            }
        } else {
            paginationData.filterId = parseInt(-1);
            currentFilterId = 0;
        }
        paginationData.requiredPage = parseInt(1);
        if (userCache != null && userCache != undefined && userCache.mInstancesPageSize != null)
            paginationData.pageSize = parseInt(userCache.mInstancesPageSize);
        else
            paginationData.pageSize = 10;
        sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, checkFilterProperties);
    }
}

function checkFilterProperties(data) {
    if (data.filter != undefined && data.filter.filterProperties != undefined && data.filter.filterProperties.length > 0) {
        $("#instancesHeader th:gt(8)").remove();
        instancesOptions.aoColumns = instancesOptions.aoColumns.slice(0, 9);
        if (instancesTable != undefined) {
            instancesTable.fnClearTable();
            instancesTable.fnDestroy();
        }
        if (data.filter.filterProperties.length > 0) {
            var filterProperties = new Array();
            $.each(data.filter.filterProperties, function(key, obj) {
                $("#instancesHeader").append("<th>" + obj.name + "</th>");
                instancesOptions.aoColumns[instancesOptions.aoColumns.length] = {
                    "sClass": "alignLeft"
                };
                filterProperties.push(obj.name);
            });
        }
        instancesTable = $("#" + defaults.instancesTableId).dataTable(instancesOptions);
        customTable(defaults.instancesTableId);
        $.each(actionButtons, function(key, value) {
            var actionButton = instancesButtonHeader(value);
            $('#' + defaults.instancesTableId + '_wrapper .row .tableButtons').append(actionButton);
        });
    }
    populateInstanceList(data);
}

/**
 * @Function Name   : populateInstanceList
 * @Description     : populate the instances list to the instances table & will do some required changes for the columns based on data
 * @param           : data list of instances
 * @returns         :
 * */
function populateInstanceList(data) {
    var temp_arr = [];
    instancesTable.fnFilter('');
    instancesTable.fnClearTable();
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
    buttonCount.resume = 0;
    buttonCount.invoke = 0;
    buttonCount.suspended = 0;
    buttonCount.terminate = 0;

    $('#resumeButton').removeAttr('disabled');
    $('#invokeButton').removeAttr('disabled');
    $('#terminateButton').removeAttr('disabled');
    $('#suspendButton').removeAttr('disabled');

    if (data.total != undefined && data.total != null)
        totalRecords = data.total;
    if (data.instance != undefined && data.instance.length > 0) {
        intancesData = data;
        $.each(data.instance, function(key, value) {
            var items = [];
            var html = "";
            var IName;
            var newName;
            var bpmName;
            var nameHtml;
            items[items.length] = "<label class='position-relative'><input type='checkbox' class='ace instanceSelected' id='instanceSelected' onclick='updateHeaderCheckbox(this);updateButtons(this);' value=" + value.pid + "> <span class='lbl'></span></label>";
            items[items.length] = '<span class="instanceId">' + value.iid + '</span>';
            if (value.processBpmName != null) {
                nameHtml = '<table class="table noLines popoverTable"><tr><td>Package:</td><td>' + value.processPackage + '</td></tr><tr><td>Version:</td><td>' + value.processVersion + '</td></tr><tr><td>Process:</td><td>' + value.processName + '</td></tr><tr><td>BPM Name:</td><td>' + value.processBpmName + '</td></tr></table>';
                bpmName = value.processBpmName
            } else {
                nameHtml = '<table class="table noLines popoverTable"><tr><td>Package:</td><td>' + value.processPackage + '</td></tr><tr><td>Version:</td><td>' + value.processVersion + '</td></tr><tr><td>Process:</td><td>' + value.processName + '</td></tr></table>';
                bpmName = 'null'
            }
            if (value.status.indexOf("COMPLETED") >= 0) {
                IName = value.processName + ' - ' + value.processVersion;
                if (IName.length > charLimit) {
                    newName = "..." + IName.slice(IName.length - charLimit);
                    nameHtml = "<span class='instanceName ace-popover' data-placement='bottom' data-content='" + nameHtml + "' data-trigger='hover' full='" + IName + "' bpmName='" + bpmName + "'>" + newName + "</span>";
                } else {
                    newName = IName;
                    nameHtml = "<span class='instanceName ace-popover' data-placement='bottom' data-content='" + nameHtml + "'  data-trigger='hover' full='" + IName + "' bpmName='" + bpmName + "'>" + newName + "</span>";
                }
            } else {
                IName = value.processName + ' - ' + value.processVersion;
                if (IName.length > charLimit) {
                    newName = "..." + IName.slice(IName.length - charLimit);
                    nameHtml = "<a class='instanceName ace-popover iconCursor' data-placement='bottom' data-content='" + nameHtml + "' data-trigger='hover' full='" + IName + "' onclick=javascript:getActivityInfo(" + value.iid + "); bpmName='" + bpmName + "'>" + newName + "</a>";
                } else {
                    newName = IName;
                    nameHtml = "<a class='instanceName ace-popover iconCursor' data-placement='bottom' data-trigger='hover' data-content='" + nameHtml + "' full='" + IName + "' onclick=javascript:getActivityInfo(" + value.iid + "); bpmName='" + bpmName + "'>" + newName + "</a>";
                }
            }
            nameHtml += '<a onclick="showLinkedInstances(' + value.iid + ',this);" data-name="'+IName+'" class="ace-popover pull-right noDecoration iconCursor" data-placement="bottom" data-content="View Linked Instances" data-trigger="hover" status= "View linked instances" ><i class="fa fa-link"></i></a>'
            if(value.status=="ACTIVE" && value.waitingStatus){
                if(value.waitingStatus=="WAITING_ON_SERVICE")
                    nameHtml+="<a class='ace-popover pull-right cursorDefault' data-placement='bottom' data-trigger='hover' data-content='"+$("#waitingOnServiceMsg").text()+"'><i class='fa fa-cloud instanceWaitingForService'></i></a>";
                else if(value.waitingStatus=="WAITING_ON_TASK")
                    nameHtml+="<a class='ace-popover pull-right cursorDefault' data-placement='bottom' data-trigger='hover' data-content='"+$("#waitingOnTaskMsg").text()+"'><i class='fa fa-user instanceWaitingForUser'></i></a>";
                else
                    nameHtml+="<a class='ace-popover pull-right cursorDefault' data-placement='bottom' data-trigger='hover' data-content='"+$("#waitingOnServiceMsg").text()+"'><i class='fa fa-cloud instanceWaitingFor'></i></a><a class='ace-popover pull-right cursorDefault' data-placement='bottom' data-trigger='hover' data-content='"+$("#waitingOnTaskMsg").text()+"'><i class='fa fa-user instanceWaitingForService'></i></a>";
            }
            items[items.length] = nameHtml;
            if (value.state == "Completed")
                items[items.length] = '<span class="action-buttons"><a class="ace-popover cursorDefault" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag grey"></i></a></spa>';
            else if (value.state == "In Progress") {
                if (value.failures != null && value.failures != undefined)
                    items[items.length] = '<span class="action-buttons failure_failed_cnt"><a class="ace-popover cursorDefault" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag text-success"></i></a></span><span class="badge badge-warning ace-popover cursorDefault" data-content="Failure count" data-placement="bottom" data-trigger="hover">' + value.failures + '</span>';
                else
                    items[items.length] = '<span class="action-buttons "><a class="ace-popover cursorDefault" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag text-success"></i></a></span>';
            } else if (value.state == "Failed") {
                if (value.failures != null && value.failures != undefined)
                    items[items.length] = '<span class="action-buttons failure_failed_cnt"><a  class="ace-popover cursorDefault" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag text-danger" ></i></a></span><span class="badge badge-danger ace-popover cursorDefault" data-content="Fault count" data-placement="bottom" data-trigger="hover">' + value.failures + '</span>';
                else
                    items[items.length] = '<span class="action-buttons "><a class="ace-popover cursorDefault" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag text-danger"></i></a></span>';
            } else if (value.state == "Terminated")
                items[items.length] = '<span class="action-buttons "><a class="ace-popover cursorDefault" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag purple"></i></a></span>';
            else if (value.state == "Suspended")
                items[items.length] = '<span class="action-buttons "><a class="ace-popover cursorDefault" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag yellow-color"></i></a></span>';
            else if (value.state == "Failure")
                items[items.length] = '<span class="action-buttons "><a class="ace-popover cursorDefault" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag orange"></i></a></spa>';
            else
                items[items.length] = '<span class="action-buttons "><a class="ace-popover cursorDefault" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag"></i></a></spa>';
            items[items.length] = $.format.date(value.started, userPreferences.dateFormat+userPreferences.hourFormat);
            items[items.length] = $.format.date(value.lastActive, userPreferences.dateFormat+userPreferences.hourFormat);
            if (true) {
                html += "<span id='images' class='action-buttons'><a class='iconCursor' title='Display SVG'><i class='fa fa-info-circle' onclick=javascript:getProcessImage('" + value.iid + "','" + value.pid + "','" + value.processName + "&nbsp;&nbsp;[v" + value.version + "]','showSvg');></i></a></span>&nbsp;&nbsp;&nbsp;"
                html += "<div id='imageDownload' class='btn-group'><a class='dropdown-toggle iconCursor' title='Download' data-toggle='dropdown' onclick='setDropdownPosition(this);'><i class='fa-zoom-in fa fa-download fa-only bigger-120 '></i></a><ul class='dropdown-menu dropdown-menu-right dropdown-yellow dropdown-caret dropdown-closer positionFixed'>";
                html += "<li><a href=" + defaults.commonInstancesUrl + "/" + value.iid + "/images/svg/export?id=" + value.pid + ">" + $('#downloadSVG').text() + "</a></li>";
                html += "<li><a href=" + defaults.commonInstancesUrl + "/" + value.iid + "/images/pdf/export?id=" + value.pid + ">" + $('#downloadPDF').text() + "</a></li>";
                html += "<li><a href=" + defaults.commonInstancesUrl + "/" + value.iid + "/images/png/export?id=" + value.pid + ">" + $('#downloadPNG').text() + "</a></li>";
                items[items.length] = html;
            }
            items[items.length] = "<span id='images' class='action-buttons'> <a class='iconCursor' title='View Process and Instance Data'><i class='fa fa-info-circle' onclick=javascript:getScopeTree('" + value.iid + "','" + value.processName + "&nbsp;&nbsp;[v" + value.version + "]','" + value.iState + "','" + value.failures + "');></i></a></span>";
            items[items.length] = '<span class="action-buttons"><a class="iconCursor" title="View Events" onclick=fetchInstanceEvents(this);><i class="fa fa-list"></i></a></span>';
            if (data.filter != undefined && data.filter.filterProperties != undefined) {
                $.each(data.filter.filterProperties, function(key, obj) {
                    if (!isObjectEmpty(value.correlationProperties)) {
                        var nameValue = value.correlationProperties[obj.name];
                        if(nameValue)
                            items[items.length] = nameValue;
                        else
                            items[items.length] = "";    
                    } else
                        items[items.length] = "";
                });
            }
            temp_arr.push(items);
        });
        instancesTable.fnAddData(temp_arr, true);
        $('.ace-popover').popover({
            html: true
        });
        $('#' + defaults.instancesTableId + " tr th").addClass("datatable_header");
        $('#' + defaults.instancesTableId + '_filter a').remove();
        $('#' + defaults.instancesTableId + '_filter').append(instancesButtonHeader("viewAllInstances"));
        $('#' + defaults.instancesTableId + '_filter').find('input').attr('onkeyup', 'javascript:updateInstanceEntries()');
        $('#instancesHeader th input:first').prop('checked', false);
        //this logic is to handle pagination for instances page
        var pagination = Math.ceil(totalRecords / paginationData.pageSize);
        totalPageSize = pagination;
        if (pagination >= 1) {
            $('#instances_pagination').remove();
            $('.paginationRows').remove();
            if (paginationData.requiredPage == parseInt(1)) {
                startNumber = paginationData.requiredPage;
                if (parseInt(data.instance.length) != parseInt(paginationData.pageSize))
                    endNumber = parseInt(data.instance.length);
                else
                    endNumber = parseInt(paginationData.pageSize);
            } else {
                var page = parseInt(parseInt(paginationData.requiredPage) - parseInt(1));
                startNumber = parseInt(page * parseInt(paginationData.pageSize) + 1);
                endNumber = parseInt(page * parseInt(paginationData.pageSize) + data.instance.length);
            }
            $("#" + defaults.instancesTableId + "_wrapper .table_pagination").append("<span class='paginationRows'><label>" + $('#entriesPerPage').text() + "</label><select id='noOfInstancesRows' onchange=javscript:updateNoOfRows(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></span>");
            $("#" + defaults.instancesTableId + "_wrapper .table_pagination").append("<div id='instances_pagination' class='dataTables_paginate paging_bootstrap pull-right'></div>");
            $("#" + defaults.instancesTableId + "_wrapper #instances_pagination").append("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' title='First page' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getFirstPageData();></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' title='Previous page' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getNextPrevPageData('prev');></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'>"+$('#datatablePage').text()+"&nbsp;<input id='instancesPageNo' type='text' role='textbox' onkeydown=javascript:getInstancePageNoData(event); value=" + paginationData.requiredPage + " maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; "+$('#datatableOf').text()+" &nbsp;<span id='sp_1_grid-pager'>" + pagination + "</span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' title='Next page' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPrevPageData('next');></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' title='Last page'class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastPageData();></span></td></tr></tbody></table>");
            showInstancesEntires(startNumber, endNumber);
            updatePagintaion($('#instancesPageNo').val(), pagination);
            $("select#noOfInstancesRows").val(paginationData.pageSize);
        } else {
            $('#instances_pagination').remove();
            $('.paginationRows').remove();
            $("#" + defaults.instancesTableId + "_wrapper .showEntries").remove();
        }
		applyNiceScroll($('#instances_wrapper').find('.table_container'), 190);
    } else if (data.error_message != undefined) {
        $('.dataTables_empty').html("No Instance(s) found.");
        $('#instances_pagination').remove();
        $('.paginationRows').remove();
        $("#" + defaults.instancesTableId + "_wrapper .showEntries").remove();
        showErrorNotification(data.error_message);
    } else if (data.instance != undefined && data.instance.length == 0) {
        $('.dataTables_empty').html("No instance(s) found.");
        $('#instances_pagination').remove();
        $('.paginationRows').remove();
        $("#" + defaults.instancesTableId + "_wrapper .showEntries").remove();
    }
    removeLoading('', true);
}

/**
 * @Function Name   : showInstancesEntires
 * @Description     : This method is use to show numbers of entries.
 * @param           :
 * @returns         :
 * */
function showInstancesEntires(startNumber, endNumber) {
    $("#" + defaults.instancesTableId + "_wrapper .showEntries").remove();
    if (parseInt(endNumber) > parseInt(0)) {
        $("#" + defaults.instancesTableId + "_wrapper .table_pagination").removeClass('hide');
        var message = $("#datatablePageInfo").text().replace('{0}',startNumber).replace('{1}',endNumber).replace('{2}',totalRecords).replace('{3}',$("#instancesMsg").text());
        $("#" + defaults.instancesTableId + "_wrapper .table_pagination").append("<div class='showEntries'><label>"+message+"</label></div>");
    } else
        $("#" + defaults.instancesTableId + "_wrapper .table_pagination").addClass('hide');
}

/**
 * @Function Name   : updateNoOfRows
 * @Description     : This method is use to update numbers of rows.
 * @param           :
 * @returns         :
 * */
function updateNoOfRows() {
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.mInstancesPageSize = $('#noOfInstancesRows').val();
        $.jStorage.set($("#userid").text(), userCache);
    }
    paginationData.pageSize = $('#noOfInstancesRows').val();
    paginationData.requiredPage = parseInt(1);
    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    if ($('#bcProcId').text() != "") {
        if ($('#bcStatus').text() != "" && $('#bcStatus').text() != "Total") {
            var satusData = {
                id: $('#bcProcId').text(),
                status: $('#bcStatus').text(),
                requiredPage: paginationData.requiredPage,
                pageSize: paginationData.pageSize
            }
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            $('#instanceStatus').text($('#bcStatus').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        } else {
            var satusData = {
                id: $('#bcProcId').text(),
                requiredPage: paginationData.requiredPage,
                pageSize: paginationData.pageSize
            }
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        }
    } else {
        sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);
    }
}

/** 
 * @Function Name   : updatePagintaion
 * @Description     : updates the pagination buttons
 * @param           :
 * @returns         :
 * */
function updatePagintaion(pageNo, totalPages) {
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
 * @Function Name   : getLastPageData
 * @Description     : This method is use to get last page data.
 * @param           :
 * @returns         :
 * */
function getLastPageData() {
    paginationData.requiredPage = Math.ceil(totalRecords / paginationData.pageSize);
    if (currentFilterId != 0)
        paginationData.filterId = parseInt(currentFilterId);
    else
        paginationData.filterId = parseInt(-1);

    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    if ($('#bcProcId').text() != "") {
        if ($('#bcStatus').text() != "" && $('#bcStatus').text() != "Total") {
            var satusData = {
                id: $('#bcProcId').text(),
                status: $('#bcStatus').text(),
                requiredPage: paginationData.requiredPage,
                pageSize: paginationData.pageSize
            }
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            $('#instanceStatus').text($('#bcStatus').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        } else {
            var satusData = {
                id: $('#bcProcId').text(),
                requiredPage: paginationData.requiredPage,
                pageSize: paginationData.pageSize
            }
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        }
    } else {
        sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);
    }
}

/** 
 * @Function Name   : getFirstPageData
 * @Description     : This method is use to get first page data.
 * @param           :
 * @returns         :
 * */
function getFirstPageData() {
    paginationData.requiredPage = parseInt(1);
    if (currentFilterId != 0)
        paginationData.filterId = parseInt(currentFilterId);
    else
        paginationData.filterId = parseInt(-1);
    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    if ($('#bcProcId').text() != "") {
        if ($('#bcStatus').text() != "" && $('#bcStatus').text() != "Total") {
            var satusData = {
                id: $('#bcProcId').text(),
                status: $('#bcStatus').text(),
                requiredPage: paginationData.requiredPage,
                pageSize: paginationData.pageSize
            }
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            $('#instanceStatus').text($('#bcStatus').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        } else {
            var satusData = {
                id: $('#bcProcId').text(),
                requiredPage: paginationData.requiredPage,
                pageSize: paginationData.pageSize
            }
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        }
    } else {
        sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);
    }
}

/** 
 * @Function Name   : getNextPrevPageData
 * @Description     : This function is used to get the next page data for instances
 * @param           :
 * @returns         :
 * */
function getNextPrevPageData(action) {
    if ($('#instancesPageNo').val() == "")
        paginationData.requiredPage = parseInt(1);
    else if ($('#instancesPageNo').val() < totalPageSize && action == 'next') {
        paginationData.requiredPage = parseInt(parseInt($("#instancesPageNo").val()) + 1);
    } else if ($('#instancesPageNo').val() > 1 && action == 'prev') {
        paginationData.requiredPage = parseInt(parseInt($("#instancesPageNo").val()) - 1);
    } else if ($('#instancesPageNo').val() == totalPageSize && action == 'delete') {
        if ($('#instancesPageNo').val() == parseInt(1))
            paginationData.requiredPage = parseInt(1);
        else
            paginationData.requiredPage = parseInt(parseInt($("#instancesPageNo").val()) - 1);
    } else if (action != 'update' && action != 'delete')
        paginationData.requiredPage = parseInt(totalPageSize);
    if (currentFilterId != 0)
        paginationData.filterId = parseInt(currentFilterId);
    else
        paginationData.filterId = parseInt(-1);

    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    if ($('#bcProcId').text() != "") {
        if ($('#bcStatus').text() != "" && $('#bcStatus').text() != "Total") {
            var satusData = {
                id: $('#bcProcId').text(),
                status: $('#bcStatus').text(),
                requiredPage: paginationData.requiredPage,
                pageSize: paginationData.pageSize
            }
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            $('#instanceStatus').text($('#bcStatus').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        } else {
            var satusData = {
                id: $('#bcProcId').text(),
                requiredPage: paginationData.requiredPage,
                pageSize: paginationData.pageSize
            }
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        }
    } else {
        sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);
    }

}
/** 
 * @Function Name   : getInstancePageNoData
 * @Description     : This function will get the task list of mentioned page no
 * @param           : event for enter
 * @returns         :
 * */
function getInstancePageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#instancesPageNo").val() != "" && parseInt($("#instancesPageNo").val()) != 0 && parseInt($("#instancesPageNo").val()) <= Math.ceil(totalRecords / paginationData.pageSize)) {
        paginationData.requiredPage = parseInt($("#instancesPageNo").val());
        if (currentFilterId != 0)
            paginationData.filterId = parseInt(currentFilterId);
        else
            paginationData.filterId = parseInt(-1);
        addLoading($('#' + defaults.instancesTableId + '_wrapper'));
        if ($('#bcProcId').text() != "") {
            if ($('#bcStatus').text() != "" && $('#bcStatus').text() != "Total") {
                var satusData = {
                    id: $('#bcProcId').text(),
                    status: $('#bcStatus').text(),
                    requiredPage: paginationData.requiredPage,
                    pageSize: paginationData.pageSize
                }
                $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
                $('#instanceStatus').text($('#bcStatus').text()).parent().removeClass('hide');
                sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
            } else {
                var satusData = {
                    id: $('#bcProcId').text(),
                    requiredPage: paginationData.requiredPage,
                    pageSize: paginationData.pageSize
                }
                $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
                sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
            }
        } else
            sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);
    } else if ($("#instancesPageNo").val() != "" && event.keyCode == parseInt(13) && (parseInt($("#instancesPageNo").val()) === 0 || parseInt($("#instancesPageNo").val()) > Math.ceil(totalRecords / paginationData.pageSize))) {
        paginationData.requiredPage = parseInt(1);
        if (currentFilterId != 0)
            paginationData.filterId = parseInt(currentFilterId);
        else
            paginationData.filterId = parseInt(-1);
        addLoading($('#' + defaults.instancesTableId + '_wrapper'));
        sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);
    } else if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
}

/**
 * @Function Name   : updateInstanceEntries
 * @Description     : This method is use to update numbers of entries.
 * @param           :
 * @returns         :
 * */
function updateInstanceEntries() {
    showInstancesEntires(startNumber, instancesTable.fnSettings().fnRecordsDisplay());
}

/**
 * @Function Name   : getScopeTree
 * @Description     : This method is use to get scope tree.
 * @param           :
 * @returns         :
 * */
function getScopeTree(iid, name, state, failuresCnt) {
    if (typeof showInstanceData == 'undefined') {
        loadJs('scripts/custom/administration/monitoring/instanceData.js', function() {
            showInstanceData(iid, name, state, failuresCnt);
        })
    } else {
        showInstanceData(iid, name, state, failuresCnt);
    }
}

/**
 * @Function Name   : fetchFilters
 * @Description     : This method is use to fetch filters.
 * @param           :
 * @returns         :
 * */
function fetchFilters() {
    var data = {};
    sendAjaxCall("console/filters", "GET", false, true, "json", data, handleInstancesAjaxError, fetchFiltersSuccess);
}

/**
 * @Function Name   : fetchFiltersSuccess
 * @Description     : This method is use to populate filters.
 * @param           :
 * @returns         :
 * */
function fetchFiltersSuccess(data) {
    $('#filterDropdown li:gt(0)').remove();
    filtersName = [];
    if (data.filter.length > 0) {
        $('#filterDropdown').append('<li class="divider"></li>');
        $.each(data.filter, function(key, value) {
            filtersName[key] = value.name;
            $('#filterDropdown').append('<li><a fid="' + value.id + '" class="iconCursor" onclick="FilterChange(this);">' + value.name + '</a></li>');
        });
    }

}
/**
 * @Function Name   : openFilterModal
 * @Description     : opens the modal window for creating a filter
 * @param           :
 * @returns         :
 * */
function showManageFilters() {
    $('#filterConfig').addClass('hide').css('height', 0);
    $('#selectFilterCombo').addClass('hide');
    $('#filterNameField').addClass('hide');
    $('#createFilter').find('.modal-footer').addClass('hide');
    $('#createFilter hr').addClass('hide');
    $('#createNewFilterId').prop('checked', false);
    $('#updateExistingFilterId').prop('checked', false);
    $('#instanceFilterSpan').addClass('hide');
    modalShow('createFilter');
}

function getFilters(action) {
    var data = {};
    if (action == "create")
        sendAjaxCall("console/filters", "GET", false, true, "json", data, handleInstancesAjaxError, populateFilters);
    else if ($('#filters').val() != -1)
        sendAjaxCall("console/filters/" + $('#filters').val(), "GET", false, true, "json", data, handleInstancesAjaxError, populateFilterData);
    else
        clearFilterData();
}

function FilterChange(object) {
    $('#filter_name').text($(object).text());
    currentFilterId = $(object).attr('fid');
    paginationData.filterId = $(object).attr('fid');
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.instanceFilter = $(object).attr('fid');
        userCache.instanceFilterName = $(object).text();
        $.jStorage.set($("#userid").text(), userCache);
    }
    $('#searchedId').text('').parent().addClass('hide');
    $('#breadcrumbLinkedInstance').addClass('hide');
    $('#auditInstaceId').text('');
    $('#bcFilterName').text($(object).text());
    $('#breadcrumbFilter').removeClass('hide');
    $('#bcStatus').text("");
    $('#bcProcId').text("");
    $('#bcProcName').text("");
    $('#breadcrumbProcessName').empty();
    $('#breadcrumbStatus').empty();
    paginationData.requiredPage = parseInt(1);
    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, function(response) {
        $("#instancesHeader th:gt(8)").remove();
        instancesOptions.aoColumns = instancesOptions.aoColumns.slice(0, 9);
        instancesTable.fnClearTable();
        instancesTable.fnDestroy();
        if (response.filter.filterProperties.length > 0) {
            var filterProperties = new Array();
            $.each(response.filter.filterProperties, function(key, obj) {
                $("#instancesHeader").append("<th>" + obj.name + "</th>");
                instancesOptions.aoColumns[instancesOptions.aoColumns.length] = {
                    "sClass": "alignLeft"
                };
                filterProperties.push(obj.name);
            });
        }
        instancesTable = $("#" + defaults.instancesTableId).dataTable(instancesOptions);
        $('.dataTables_empty').html("Fetching instance(s)...");
        customTable(defaults.instancesTableId);
        $('#' + defaults.instancesTableId + '_filter a').attr('onclick', "refreshInstancesList()");
        $.each(actionButtons, function(key, value) {
            var actionButton = instancesButtonHeader(value);
            $('#' + defaults.instancesTableId + '_wrapper .row .tableButtons').append(actionButton);
        });
        $('#filter_name').text($(object).text());
        currentFilterId = $(object).attr('fid');
        populateInstanceList(response);
    });
}
/**
 * @Function Name   : showLinkedInstances
 * @Description     : Shows linked instances of selected instance 
 * @param           : instance id, this object
 * @returns         :
 * */
function showLinkedInstances(id,obj){
    var name = $(obj).attr('data-name');
    var obj = {
        id : id,
        name : name
    }
    sendAjaxCall(defaults.commonInstancesUrl+'/'+id+'/links', "GET", false, true, "json", {}, handleInstancesAjaxError, function(data){
        if (data.linked_instances != undefined){
            if (data.linked_instances.length > 0){
                obj.ids = data.linked_instances
                if (userCache != null && userCache != undefined){
                    userCache.linkedInstance = obj;
                    $.jStorage.set($("#userid").text(), userCache);
                }
                clearInstancesBreadcrumb();
                getInstancesList()
            } else {
                showInformation($('#noLinkedInstances').text());
            }
            
        }
    });
}
/**
 * @Function Name   : clearInstancesBreadcrumb
 * @Description     : Clears the filters applied on breadcrumb
 * @param           : 
 * @returns         :
 * */
function clearInstancesBreadcrumb(){
    $('#processName').text('').parent().addClass('hide');
    $('#instanceStatus').text('').parent().addClass('hide');
    $('#bcProcId').text("");
    $('#bcProcName').text("");
    $('#breadcrumbProcessName').empty();
    $('#breadcrumbStatus').empty();
    $('#bcStatus').text("");
    $('#breadcrumbStatus').empty();
}
/**
 * @Function Name   : removeLinkedInstance
 * @Description     : removes linked instance from breadcrumb
 * @param           : 
 * @returns         :
 * */
function removeLinkedInstance(){
    $('#breadcrumbLinkedInstance').addClass('hide');
    $('#breadcrumbLinkedInstance span').text('');
    if (userCache != null && userCache != undefined){
        userCache.linkedInstance = null;
        $.jStorage.set($("#userid").text(), userCache);
    }
    delete paginationData.ids;
    getInstancesList()
}

function removeAppliedFilter() {
    $('#breadcrumbFilter').addClass('hide');
    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    $('#filter_name').text($('#filterNameFmt').text());
    $('#correlationButton').remove();
    $("#instancesHeader th:gt(8)").remove();
    instancesOptions.aoColumns = instancesOptions.aoColumns.slice(0, 9);
    instancesTable.fnClearTable();
    instancesTable.fnDestroy();
    instancesTable = $("#" + defaults.instancesTableId).dataTable(instancesOptions);
    customTable(defaults.instancesTableId);
    $('.dataTables_empty').html("Fetching instance(s)...");
    $('#' + defaults.instancesTableId + '_filter a').attr('onclick', "refreshInstancesList()");
    $.each(actionButtons, function(key, value) {
        var actionButton = instancesButtonHeader(value);
        $('#' + defaults.instancesTableId + '_wrapper .row .tableButtons').append(actionButton);
    });
    paginationData.orderBy = "-last-active";
    paginationData.requiredPage = 1;
    paginationData.filterId = -1;
    currentFilterId = -1;
    if (userCache != null && userCache != undefined && userCache.mInstancesPageSize != null)
        paginationData.pageSize = userCache.mInstancesPageSize;
    else
        paginationData.pageSize = 10;
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.instanceFilter = parseInt(-1);
        userCache.instanceFilterName = null;
        $.jStorage.set($("#userid").text(), userCache);
    }
    sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);

}

function populateFilters(data) {
    $("#filters").empty();
    $("#filters").removeClass("chzn-done");
    $("#filters").removeAttr("style");
    $("#filters_chzn").remove();
    $("#filters").append("<option value='-1'>" + $('#selectInstanceFilter').text() + "</option>");
    if (data.filter.length > 0) {
        filtersName = [];
        $.each(data.filter, function(key, obj) {
            filtersName[key] = obj.name;
            $("#filters").append("<option value=" + obj.id + ">" + obj.name + "</option>");
        });
        $("#filters").chosen();
        $("#filters_chzn").css("width", 160);
    }
    clearFilterData();
}

function clearFilterData() {
    $('#anyProcesses').prop('checked', true);
    $('#anyState').prop('checked', true);
    $('#filterPackageList').removeClass('chzn-done').removeAttr('style');
    $('#filterPackageList_chzn').remove();
    $('#filterPackageList').val('-1');
    $('#filterPackageList').chosen();
    $('#filterPackageList_chzn').css('width', 531);
    $('#filterProcessList').removeClass('chzn-done').removeAttr('style');
    $('#filterProcessList_chzn').remove();
    $('#filterProcessList').val('-1');
    $('#filterProcessList').chosen();
    $('#filterProcessList_chzn').css('width', 531);
    $('#listStates').removeClass('chzn-done').removeAttr('style');
    $('#listStates_chzn').remove();
    $('#listStates').val('-1');
    $('#listStates').chosen();
    $('#listStates_chzn').css('width', 160);
    $("#filters").chosen();
    $("#filters_chzn").css("width", 160);
    $("#filterTableProperties tr").remove();
    $('.filterDates').datetimepicker({pickTime: false,icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down"
    }}).next().on(ace.click_event, function(){$(this).prev().focus()});
    $('#filterName').val("");
    $('#startedAfter').val("");
    $('#startedBefore').val("");
    $('#lastActiveAfter').val("");
    $('#lastActiveBefore').val("");
    $('#btnDeleteFilter').addClass('hide');
}

function fetchCurrentFilter() {
    if($("#filters").val()>=1){
        $('#filterConfig').animate({
            height: 320
        }, 1000, function() {
            $('#filterConfig').removeAttr('style');
        })
        $('#filterConfig').removeClass('hide');
        $('#filterNameField').removeClass('hide');
        getFilters('update');
        $('#createFilter').find('.modal-footer').removeClass('hide');
    }else{
        $('#filterConfig').addClass('hide').css('height', 0);
        $('#filterNameField').addClass('hide');
        $('#createFilter').find('.modal-footer').addClass('hide');
    }
}
/**
 * @Function Name   : getFilterStateProcesses
 * @Description     : populate the filter states & processes
 * @param           : data list of processes & states
 * @returns         :
 * */
function getFilterStateProcesses() {
    var data = {};
    sendAjaxCall("console/filters/new", "GET", false, true, "json", data, handleInstancesAjaxError, populateFilterStateProcesses);
}

/**
 * @Function Name   : populateFilterStateProcesses
 * @Description     : populate the filter states & processes
 * @param           : data list of processes & states
 * @returns         :
 * */
function populateFilterStateProcesses(data) {
    filterStateProcessesData = data;
    updateFilterStates(data);
    updateFilterProcesses(data);
}

function updateFilterStates(data) {
    var html = "";
    var selectedList = [];
    $('#listOfStates').empty();
    $('#listOfStates').removeClass('hide');
    $('#listOfStates').append('<select id="listStates" multiple data-placeholder="Choose Status  "></select>');
    if (data.filter_state != undefined) {
        $.each(sortFilterStatus(data.filter_state), function(key, object) {
            if (object.selected) {
                if (object.name == "Active")
                    html += "<option value=" + object.id + " selected=selected>In Progress</option>";
                else
                    html += "<option value=" + object.id + " selected=selected>" + object.name + "</option>";
            } else {
                if (object.name == "Active")
                    html += "<option value=" + object.id + ">In Progress</option>";
                else
                    html += "<option value=" + object.id + ">" + object.name + "</option>";
            }
        });
    } else if (data.error_message != undefined)
        showErrorNotification(data.error_message);
    $('#listOfStates select').append(html);
    $('#listStates').chosen();
    $("#listStates_chzn").css("width", 160);
    $("#customState").prop('checked', true);
}

var packageList = {};

function updateFilterProcesses(data) {
    var prevPackage;
    var processesSelectedList = [];
    var html = "";
    var proName;
    $('#listOfProcesses').empty();
    $('#listOfProcesses').removeClass('hide').parent().removeClass('hide');
    $('#listOfProcesses').append('<table class="table noLines"><tr><td><div class="tdSpan"><span>' + $('#filterPackageLabel').text() + '</span></div> <span class="pull-right"><select multiple id="filterPackageList" onchange="getFilterPrcoessesList(this);" data-placeholder="Choose Package(s)"></select></span></td></tr><tr><td><span id="filterProcessListSpan" class="hide"><div class="tdSpan"><span> ' + $('#filterProcessLabel').text() + '</span> </div><span class="pull-right"><select multiple id="filterProcessList" data-placeholder="Choose Process(es)"></select></span></span></td></tr></table>');
    if (data.filter_process) {
        $.each(data.filter_process, function(key, object) {
            proName = object.name;
            if (proName.length > 100)
                proName = "..." + proName.slice(proName.length - 100);
            if (object.package) {
                var packName = object.name + " [v" + object.version + "]";
                prevPackage = object.id;
                packageList[prevPackage] = [];
                if (object._selected)
                    $('#filterPackageList').append('<option value="' + object.id + '" selected> ' + packName + '</option>');
                else
                    $('#filterPackageList').append('<option value="' + object.id + '"> ' + packName + '</option>');
            } else {
                packageList[prevPackage].push({
                    name: object.name,
                    id: object.id
                });
                if (object._selected) {
                    $('#filterProcessList').append('<option value="' + object.id + '" selected>' + object.name + '</option>');
                    processesSelectedList.push(object.id);
                }
            }
        });
    } else if (data.error_message != undefined)
        showErrorNotification(data.error_message);
    if (processesSelectedList != null && processesSelectedList.length > 0) {
        $.each(data.filter_process, function(key, object) {
            if (object.package) {
                if (object._selected) {
                    $.each(packageList[object.id], function(key1, value1) {
                        if ($.inArray(value1.id, processesSelectedList) == -1)
                            $('#filterProcessList').append('<option value="' + value1.id + '">' + value1.name + '</option>');
                    });
                }
            }
        });
        $('#filterProcessList').chosen();
        $('#filterProcessListSpan').removeClass('hide');
        $('#filterProcessList_chzn').css('width', 531);
        $('#filterProcessList_chzn li.search-field input').css('width', 250);
    } else
        $('#filterProcessListSpan').addClass('hide');
    $('#filterPackageList').chosen();
    $('#filterPackageList_chzn').css('width', 531);
    $("#customProcesses").prop('checked', true);
}

function getFilterPrcoessesList(obj) {
    var prevProcessList = $('#filterProcessList').val();
    removeChosen('filterProcessList');
    $('#filterProcessList_chzn').remove();
    var processesInPackege = $(obj).val();
    $('#filterProcessList').empty();
    if (processesInPackege != null && processesInPackege.length > 0) {
        $.each(processesInPackege, function(key, value) {
            $.each(packageList[value], function(key1, value1) {
                if (prevProcessList != null && prevProcessList.length > 0) {
                    if ($.inArray(value1.id, prevProcessList) >= 0)
                        $('#filterProcessList').append('<option value="' + value1.id + '" selected>' + value1.name + '</option>');
                    else
                        $('#filterProcessList').append('<option value="' + value1.id + '">' + value1.name + '</option>');
                } else {
                    $('#filterProcessList').append('<option value="' + value1.id + '">' + value1.name + '</option>');
                }
            });
        });
        $('#filterProcessList').chosen();
        $('#filterProcessList_chzn').css('width', 531);
        $('#filterProcessList_chzn li.search-field input').css('width', 250);
        $('#filterProcessListSpan').removeClass('hide');
    } else {
        removeChosen('filterProcessList');
        $('#filterProcessListSpan').addClass('hide')
    }
}

function addNewProperty(propertyName, propertyValue, action) {
    filterPropertyLength++;
    if (action == 'create')
        $("#filterTableProperties").append("<tr><td width='20%'>Name</td><td id='propertyInput' width='30%'><input type='text' id=propertyNames" + filterPropertyLength + " name=propertyNames" + filterPropertyLength + "></td><td width='20%'>Value</td><td id='propertyInput' width='30%'><input type='text' id=propertyValues" + filterPropertyLength + " name=propertyValues" + filterPropertyLength + ">&nbsp;&nbsp;&nbsp&nbsp;&nbsp;<button type='button' class='close' onclick='javascript:deleteProperties(this);'>&times;</button></td></tr>");
    else
        $("#filterTableProperties").append("<tr><td width='20%'>Name</td><td id='propertyInput' width='30%'><input type='text' value=" + propertyName + " id=propertyNames" + filterPropertyLength + " name=propertyNames" + filterPropertyLength + "></td><td width='20%'>Value</td><td id='propertyInput' width='30%'><input type='text' value='" + propertyValue + "' id=propertyValues" + filterPropertyLength + " name=propertyValues" + filterPropertyLength + ">&nbsp;&nbsp;&nbsp&nbsp;&nbsp;<button type='button' class='close' onclick='javascript:deleteProperties(this);'>&times;</button></td></tr>");
}

/**
 * @Function Name   : deleteProperties
 * @Description     : gets the selected process image svg
 * @param           : instance id , process id,type of image
 * @returns         :
 * */
function deleteProperties(obj) {
    $(obj).parent().parent().remove();
}

function populateFilterData(data) {
    filterPropertyLength = 0;
    clearFilterData();
    if (!isObjectEmpty(data.filter)) {
        $('#filterName').val(data.filter['name']);
        $('#startedBefore').val(data.filter['createdBefore']);
        $('#startedAfter').val(data.filter['createdAfter']);
        $('#lastActiveAfter').val(data.filter['lastActiveAfter']);
        $('#lastActiveBefore').val(data.filter['lastActiveBefore']);
        $.each(data.filter['filterProperties'], function(key, value) {
            addNewProperty(value.name, value.value, "update");
        });
    }
    updateFilterStates(data);
    updateFilterProcesses(data);
    $('#btnDeleteFilter').removeClass('hide');
}

function deleteFilterConfirm() {
    $('#deleteInstanceModal').find('.modal_heading').text($('#deleteFilterHead').text());
    $('#deleteInstanceModal').find('.terminateConfirmText').text($('#sureToDeleteFilter').text());
    $('#deleteInstanceModal').find('.modal-footer a').attr('onclick', 'deleteFilter()');
    modalShow('deleteInstanceModal');
}

function deleteFilter() {

    if ($('#filters').val() != -1) {
        var data = {};
        sendAjaxCall("console/filters/" + $('#filters').val(), "DELETE", false, true, "json", data, handleInstancesAjaxError, function(response) {
            if (response.success_message.indexOf('success') > 0) {
                getFilters('create');
                if ($('#filters').find('option:selected').text() == $('#filter_name').text()) {
                    paginationData.filterId = parseInt(-1);
                    paginationData.requiredPage = parseInt(1);
                    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
                        userCache.instanceFilter = parseInt(-1);
                        userCache.instanceFilterName = null;
                        $.jStorage.set($("#userid").text(), userCache);
                    }
                    $('#breadcrumbFilter').addClass('hide');
                    $('#filter_name').text($('#filterNameFmt').text());
                    getInstancesList(true, true, true);
                }
                showNotification(response.success_message);
                $('#filterConfig').animate({
                    height: 0
                }, 700, function() {
                    $('#filterConfig').removeAttr('style');
                });
                setTimeout(function() {
                    $('#filterConfig').addClass('hide').css('height', 0);
                }, 500);
                $('#createFilter').find('.modal-footer').addClass('hide');
                $('#filterNameField').addClass('hide');
                $('#createFilter hr').addClass('hide');
            } else
                showErrorNotification(response.error_message);
            $('#createFilter').modal('hide');
        });
    }
}

/**
 * @Function Name   : saveORUpdateFilter
 * @Description     : save / update the filter along with its properties
 * @param           :
 * @returns         :
 * */
function saveORUpdateFilter(action) {
    var anyStateValue = true;
    var anyProcessValue = true;
    var filterStates = [];
    var filterProcesses = [];
    var filterProperties = [];
    var filterInstanceName = $.trim($('#filterName').val());
    var specialCharacterOnly = /^[^\w\s]*$/gi;
    var underscoreOnly = /^[\_]*$/gi;
    var filterId = $('#filters').find('option:selected').val();
    filterProcesses = $('#filterProcessList').val();
    filterpackages = $('#filterPackageList').val();
    if (filterInstanceName == "") {
        $('#instanceFilterSpan').text($('#enterFilterName').text());
        $('#instanceFilterSpan').removeClass('hide');
        $('#filterName').focus();
    } else if (specialCharacterOnly.test(filterInstanceName)) {
        $('#instanceFilterSpan').text($('#specialCharacterOnly').text());
        $('#instanceFilterSpan').removeClass('hide');
    } else if (underscoreOnly.test(filterInstanceName)) {
        $('#instanceFilterSpan').text($('#underscoreOnly').text());
        $('#instanceFilterSpan').removeClass('hide');
    } else if (filterpackages != null && filterpackages.length != 0 && (filterProcesses == null || filterProcesses.length == 0)) {
        $('#instanceFilterSpan').text($('#atleastOneProcessFilter').text());
        $('#instanceFilterSpan').removeClass('hide');
    } else {
        filterStates = $('#listStates').val();
        $('#instanceFilterSpan').addClass('hide');
        for (var k = 1; k <= filterPropertyLength; k++) {
            if ($("#propertyNames" + k).val() != undefined && $("#propertyNames" + k).val() != "")
                filterProperties[filterProperties.length] = {
                    name: $("input[name=propertyNames" + k + "]").val(),
                    value: $("input[name=propertyValues" + k + "]").val()
                };
        }
        if (filterStates != null && filterStates.length > 0)
            anyStateValue = false;
        if (filterProcesses != null && filterProcesses.length > 0)
            anyProcessValue = false;
        var data = {
            filter: JSON.stringify({
                name: $('#filterName').val(),
                allProcesses: anyProcessValue,
                allStates: anyStateValue,
                createdBefore: $('#startedBefore').val(),
                createdAfter: $('#startedAfter').val(),
                lastActiveBefore: $('#lastActiveBefore').val(),
                lastActiveAfter: $('#lastActiveAfter').val(),
                isProcess: false,
                filterProperties: filterProperties
            }),
            filter_state: filterStates,
        };
        if (filterpackages != null && filterpackages != undefined)
            data.filter_process = filterpackages.concat(filterProcesses);
        else
            data.filter_process = '';
        if (filterId == -1 || filterId == undefined) {
            if (!isInstanceFilterExist(filtersName, $.trim($('#filterName').val()))) {
                sendAjaxCall("console/filters", "POST", false, true, "json", data, handleInstancesAjaxError, function(response) {
                    if (response.error_message != undefined)
                        showErrorNotification(response.error_message);
                    else if (response.success_message != undefined) {
                        showNotification(response.success_message);
                        getFilters('create');
                        $('#filterConfig').animate({
                            height: 0
                        }, 700, function() {
                            $('#filterConfig').removeAttr('style');
                        });
                        setTimeout(function() {
                            $('#filterConfig').addClass('hide').css('height', 0);
                        }, 500);
                        $('#createFilter').find('.modal-footer').addClass('hide');
                        $('#filterNameField').addClass('hide');
                        $('#createFilter hr').addClass('hide');
                        $('#filterName').prop('checked', false);
                        $('#createNewFilterId').prop('checked', false);
                        $('#createFilter').modal('hide');
                    }
                });
            } else {
                //showInformation($('#instanceFilterNameExist').text());
                $('#instanceFilterSpan').text($('#instanceFilterNameExist').text());
                $('#instanceFilterSpan').removeClass('hide');
            }
        } else {
            if (!isInstanceUpdateFilterNameExist(filtersName, $.trim($('#filterName').val()), $('#filters').find('option:selected').text())) {
                sendAjaxCall("console/filters/" + filterId, "POST", false, true, "json", data, handleInstancesAjaxError, function(response) {
                    if (response.error_message != undefined)
                        showErrorNotification(response.error_message);
                    else if (response.success_message != undefined) {
                        showNotification(response.success_message);
                        if ($('#filters').find('option:selected').text() == $('#filter_name').text()) {
                            paginationData.filterId = response.filter;
                            currentFilterId = response.filter;
                            paginationData.requiredPage = parseInt(1);
                            if (userCache != null && userCache != undefined && $("#userid").text() != "") {
                                userCache.instanceFilter = parseInt(response.filter);
                                userCache.instanceFilterName = $('#filterName').val();
                                $.jStorage.set($("#userid").text(), userCache);
                            }
                            $('#bcFilterName').text($('#filterName').val());
                            $('#filter_name').text($('#filterName').val());
                            addLoading($('#' + defaults.instancesTableId + '_wrapper'));
                            sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, checkFilterProperties);
                        }
                        updatedInstanceFilterList();
                        $('#filterConfig').animate({
                            height: 0
                        }, 700, function() {
                            $('#filterConfig').removeAttr('style');
                        });
                        setTimeout(function() {
                            $('#filterConfig').addClass('hide').css('height', 0);
                        }, 500);
                        $('#createFilter').find('.modal-footer').addClass('hide');
                        $('#filterNameField').addClass('hide');
                        $('#createFilter hr').addClass('hide');
                        $('#filterName').prop('checked', false);
                        $('#createFilter').modal('hide');
                    }
                });
            } else {
                $('#instanceFilterSpan').text($('#instanceFilterNameExist').text());
                $('#instanceFilterSpan').removeClass('hide');
            }
        }
    }
}

function createNewFilter(obj) {
    $('#selectFilterCombo').addClass('hide');
    $('#filterNameField').removeClass('hide');
    $('#createFilter hr').removeClass('hide');
    $('#filterConfig').removeClass('hide');
    $('#saveFilter').text($('#instanceFilterCreateBtn').text());
    $('#filterConfig').animate({
        height: 280
    }, 1000, function() {
        $('#filterConfig').removeAttr('style');
    });
    $('#createFilter').find('.modal-footer').removeClass('hide');
    $('#btnDeleteFilter').addClass('hide');
    clearFilterData();
    getFilterStateProcesses();
}

function updateExistingFilter(obj) {
    $('#selectFilterCombo').removeClass('hide');
    $('#filterNameField').addClass('hide');
    $('#saveFilter').text($('#instanceFilterUpdateBtn').text());
    $('#createFilter').find('.modal-footer').addClass('hide');
    $('#instanceFilterSpan').addClass('hide');
    getFilters('create');
    $('#filterConfig').animate({
        height: 0
    }, 1000);
    setTimeout(function() {
        $('#filterConfig').addClass('hide');
    }, 900);
}
/**
 * @Function Name   : getProcessImage
 * @Description     : gets the selected process image svg
 * @param           : instance id , process id,type of image
 * @returns         :
 * */
function getProcessImage(id, pid, name, type) {
    if (is_ie8) {
        showInformation($('#ie8NotSupportSVG').text());
        return false;
    } else {
        $('#processImage').find('.modal_heading').text('SVG: ' + name);
        $('#svg_container').empty();
        $("#svgEventInfo").addClass('hide');
        $('#processImage .modal-dialog').css('height', $(window).height() - 20);
        $('#showPathDiv span').html('<a class="noDecoration iconCursor" title="' + $("#showExePath").text() + '" onclick="showSVGPath(true);"><i class="fa fa-cogs bigger-150"></i></a>');
        modalShow('processImage');
        addLoading($('#svg_container'));
        var data = {
            id: pid
        };
        svg_InstanceId = id;
        svg_processId = pid;
        sendAjaxCall(defaults.commonInstancesUrl + "/" + id + "/images/svg", "GET", false, true, "xml", data, handleInstancesAjaxError, openProcessImage);
    }
}

/**
 * @Function Name   : -body
 * @Description     : opens the selected process image svg
 * @param           : svg data
 * @returns         :
 * */
function openProcessImage(data) {
    $('#svg_container').css('max-height', $(window).height() - 165);
    $('#svg_container').append($(data).find('svg'));
    removeLoading($('#svg_container'), false);
    var svgFile = $('#svg_container').html();
    $.each($(svgFile).find('defs#activityDefs activity'), function(key, value) {
        actvityLableMap[$(this).attr('label')] = $(this).attr('id');
    });
}

var adhocsvgCount=1;
function getAdhocSVG(taskId){
    
        adhocsvgCount++;
    	var $temp_AdhocDialog_ID = $('#ADHOCInstanceModal').clone();
    	$temp_AdhocDialog_ID.attr('id','adhocdialog'+adhocsvgCount);
    	var $temp_SvgContainer_ID = $temp_AdhocDialog_ID.find('#adhoc_svg_container').attr('id','adhoc_svg_container'+adhocsvgCount);
    	$temp_SvgContainer_ID.empty();
    	$('#AdhocEmpty').append($temp_AdhocDialog_ID);
        addLoading();
        (($temp_AdhocDialog_ID).find('.modal-body')).css({'padding-top':'5px','height':'315px'});
        (($temp_AdhocDialog_ID).find('.modal-dialog')).css({'padding-left':'20px','padding-right':'20px','padding-bottom':'20px','margin-top':'14px','width':'100%'});
    	modalShow($temp_AdhocDialog_ID.attr('id'));	
    	getInnerAdhocSVG($temp_SvgContainer_ID.attr('id'),taskId);
}

function getInnerAdhocSVG(svgContainerID,taskId){
	sendAjaxCall(intalio_bpms.instances.createAdhocSVG+taskId, "GET", false, true, "xml", {}, handleInstancesAjaxError,function(data){
		displayInnerAdhocSVG(data,svgContainerID)
	})
}

function displayInnerAdhocSVG(data,svgContainerID){
    $('#'+svgContainerID).append($(data).find('svg'));
    removeLoading($(svgContainerID), false);
}

var prevSVGActivity;

function executeEvent(evt) {
    $("#svgInfoBodyError").addClass('hide');
    $("#svgEventInfo").addClass('hide');
    $('#activityEventsList').empty();
    $('#activityEventsTabs').empty();
    var object = $(evt.target);
    var aiid = actvityLableMap[$(evt.target).attr('bpmn:activity-id')];
    $("#svgEventInfo").css('position', 'absolute')
    var activityName = $(evt.target).attr('bpmn:activity-label');
    activityName = activityName.charAt(0).toUpperCase() + activityName.slice(1);
    if ($(object).attr('oldfill') == null || $(object).attr('oldfill') == undefined)
        $(object).attr('oldfill', $(object).attr('fill'));
    object.css('fill', '#87B87F');
    if (prevSVGActivity != null && prevSVGActivity != '') {
        prevSVGActivity.css('fill', prevSVGActivity.attr('oldfill'));
    }
    prevSVGActivity = object;
    if (activityName != null && activityName != undefined) {
        if (activityName.length != 0)
            $('#svgEventInfo .svgActivityName').text(activityName + ': Events');
        else
            $('#svgEventInfo .svgActivityName').text('');
        if (aiid != null & aiid != undefined) {
            var data = {
                id: svg_processId
            };
            sendAjaxCall(defaults.commonInstancesUrl + "/" + svg_InstanceId + "/activities/" + aiid + "/events", "GET", false, true, "json", data, handleInstancesAjaxError, executeEventSuccess);
        } else {
            $('#svgEventInfo').removeClass('hide');
            $("#svgInfoBodyError").removeClass('hide');
            $('#svgInfoBodyError').text($('#eventNotExecuted').text());
            $('#svgInfoBody').addClass('hide');
        }
    }
}

function executeEventSuccess(data) {
    $("#svgEventInfo").removeClass('hide');
    $('#svgInfoBody').removeClass('hide');
    $("#svgInfoBodyError").addClass('hide');
    $.each(data.events, function(key, value) {
        if (parseInt(key) == 0) {
            $('#activityEventsList').append('<li class="active"><a href="#' + value.activityId + value.name + '" data-toggle="tab">' + value.name + '</a></li>');
            $('#activityEventsTabs').append('<div id="' + value.activityId + value.name + '" class="tab-pane active"><table class="table noLines closerLines"></table></div>');
        } else {
            $('#activityEventsList').append('<li><a href="#' + value.activityId + value.name + '" data-toggle="tab">' + value.name + '</a></li>');
            $('#activityEventsTabs').append('<div id="' + value.activityId + value.name + '" class="tab-pane"><table class="table noLines closerLines"></table></div>');
        }
        $.each(value.details, function(key1, value1) {
            $('#' + value.activityId + value.name + ' table').append('<tr><td>' + key1 + '</td><td>' + value1 + '</td></tr>');
        });
    });
    applyNiceScroll($('#activityEventsTabs'), '',210);
}

function closeSVGInfo() {
    $('#svgEventInfo').addClass('hide');
    $('#activityEventsList').empty();
    $('#activityEventsTabs').empty();
    prevSVGActivity.css('fill', prevSVGActivity.attr('oldfill'));
    prevSVGActivity = '';
}
/**
 * @Function Name   : getActivityInfo
 * @Description     : get the activity info for a particular instance
 * @param           : instance id
 * @returns         :
 * */
function getActivityInfo(instanceId, flag) {
    addLoading($('#taskInfo'));
    var data = {};
    sendAjaxCall(defaults.commonInstancesUrl + "/" + instanceId + "/info", "GET", false, true, "json", data, handleInstancesAjaxError, function(response) {
        populateActivityInfo(response, instanceId, flag);
    });
}

/**
 * @Function Name   : populateActivityInfo
 * @Description     : populate activity task & fault info for a particular instance id
 * @param           : data of task & fault info
 * @returns         :
 * */
function populateActivityInfo(data, instanceId, flag) {
    $('li.faultInfoLink').removeClass('hide');
    var taskInfo;
    var faultInfo;
    $("#taskInfo").empty().append('<div></div>');
    $("#faultInfo").empty().append('<div></div>');
    $('#activityInfo .modal-body').find('.active').removeClass('active');
    $("#taskInfo").addClass('active');
    $('#activityInfo .nav li a:first').parent().addClass('active');
    if (data.task.length > 0) {
        $.each(data.task, function(key, value) {
            taskInfo = $("#taskData").clone();
            $(taskInfo).removeAttr('id');
            $(taskInfo).find('.taskDataTitle').text("Activity Name: " + value.name);
            $(taskInfo).find('.taskInfoActivityID').text(value.aiid);
            $(taskInfo).find('.taskInfoStatus').text(value.status);
            $(taskInfo).find('.taskInfoStarted').text($.format.date(value.started, userPreferences.dateFormat+userPreferences.hourFormat));
            $(taskInfo).find('.taskInfoScope').text(value.scope);
            $(taskInfo).find('.taskInfoEnabled').text($.format.date(value.enabled, userPreferences.dateFormat+userPreferences.hourFormat));
            if (value.status == "FAILURE" || value.status == "FAILED") {
                $(taskInfo).find('.taskInfoType').text(value.type);
                $(taskInfo).find('.taskInfoReason').text(value.reason);
                $(taskInfo).find('.taskInfoRetry').text(value.retry);
                $(taskInfo).find('.taskInfoFailure').text($.format.date(value.failure, userPreferences.dateFormat+userPreferences.hourFormat));
                var actionsData = "";
                var taskActions = value.actions.split(' ');
                $.each(taskActions, function(key, value1) {
                    if (value1 == 'cancel')
                        actionsData += "<button type='button' class='btn btn-minier btn-primary' title='Skip current activity' onclick=javascript:recoverActivity(" + instanceId + "," + value.aiid + ",'" + value1 + "')>Skip</button>&nbsp;&nbsp;"
                    else if (value1 == 'fault')
                        actionsData += "<button type='button' class='btn btn-minier btn-primary' title='Move to failed state' onclick=javascript:recoverActivity(" + instanceId + "," + value.aiid + ",'" + value1 + "')>" + value1.charAt(0).toUpperCase() + value1.slice(1) + "</button>&nbsp;&nbsp;"
                    else if (value1 == 'retry')
                        actionsData += "<button type='button' class='btn btn-minier btn-primary' title='Retry current activity' onclick=javascript:recoverActivity(" + instanceId + "," + value.aiid + ",'" + value1 + "')>" + value1.charAt(0).toUpperCase() + value1.slice(1) + "</button>&nbsp;&nbsp;"
                    else
                        actionsData += "<button type='button' class='btn btn-minier btn-primary' title='Recover current activity' onclick=javascript:recoverActivity(" + instanceId + "," + value.aiid + ",'" + value1 + "')>" + value1.charAt(0).toUpperCase() + value1.slice(1) + "</button>&nbsp;&nbsp;"
                });
                $(taskInfo).find('.taskInfoActions').html(actionsData);
            } else {
                $(taskInfo).find('.taskInfoType').parent().remove();
                $(taskInfo).find('.taskInfoReason').parent().remove();
                $(taskInfo).find('.taskInfoRetry').parent().remove();
                $(taskInfo).find('.taskInfoFailure').parent().remove();
                $(taskInfo).find('.taskInfoActions').parent().remove();
            }
            $("#taskInfo div:first").append(taskInfo);
        });
    }
    
    if (!isObjectEmpty(data.fault)) {
        faultInfo = $("#faultData").clone();
        $(faultInfo).removeAttr('id');
        $(faultInfo).find('.faultInfoName').text(data.fault['name']);
        $(faultInfo).find('.faultInfoLineNumber').text(data.fault['lineNumber']);
        $(faultInfo).find('.faultInfoExplanation').text(data.fault['explanation']);
        $(faultInfo).find('.faultInfoNameSpace').text(data.fault['namespace']);
        $(faultInfo).find('.faultInfoAiid').text(data.fault['aiid']);
        $("#faultInfo div:first").append(faultInfo);
    }
    if (isObjectEmpty(data.fault))
        $('li.faultInfoLink').addClass('hide');
    removeLoading($('#taskInfo'));
    $("#activityInfo").find(".modal-dialog").css("width",800);
    modalShow("activityInfo");
    if (flag != undefined && !flag)
        $('#activityInfo').find('.close').attr('onclick', 'javascript:refreshInstancesList()');
    else
        $('#activityInfo').find('.close').removeAttr('onclick');
    if (data.task.length == 0)
        $("#taskInfo").append($('#notaskInfoRecords').text());
    else
        applyNiceScroll($('#taskInfo div:first'),270);
        applyNiceScroll($('#faultInfo div:first'),270);
}

/**
 * @Function Name   : recoverActivity
 * @Description     : recover the instance from failure / failed to active
 * @param           :
 * @returns         :
 * */
function recoverActivity(instanceId, aiid, action) {
    var data = {};
    sendAjaxCall(defaults.commonInstancesUrl + "/" + instanceId + "/activities/" + aiid + "/recover/" + action, "POST", false, true, "json", data, handleInstancesAjaxError, function(response) {
        getActivityInfo(instanceId, false);
    });
}

/**
 * @Function Name   : invokeInstance
 * @Description     : invoke the selected instance
 * @param           :
 * @returns         :
 * */
function invokeInstance() {
    var columnsData = getSelectedRows(instancesTable, true);
    if (columnsData.length == 0) {
        showInformation($('#selectInfo').text());
    } else {
        var pid = $(columnsData[0][0]).find('input').val();
        var iid = $(columnsData[0][1]).text();
        $('#invokeInstanceModal').find('.modal_heading').text($(columnsData[0][2]).attr('full'));
        $('#invokeInstanceModal .close').attr('onclick', '');
        if (columnsData.length != 1)
            showInformation($('#invokeSelectInfo').text());
        else {
            addLoading($('#' + defaults.instancesTableId + '_wrapper'));
            var data = {
                id: pid
            };
            sendAjaxCall(defaults.commonInstancesUrl + "/" + iid + "/operations", "GET", false, true, "json", data, handleInstancesAjaxError, function(response) {
                listOperations(response, $(columnsData[0][2]).attr('data-content'));
            }, 90000);
        }
    }
}

/**
 * @Function Name   : listOperations
 * @Description     : populates the operations list
 * @param           : data list of operations
 * @returns         :
 * */
var invokeWsiURI;

function listOperations(data, bpmContent) {
    var content = $(bpmContent);
    content.find('td:eq(2)')
    var bpmName = content.find('tr:eq(3) td:eq(1)').text() + '-' + content.find('tr:eq(2) td:eq(1)').text()
    $('#invoke_values').empty();
    $('#select-operation-error').addClass('hide');
    if (data.operations.length > 0) {
        $.each(data.operations, function(key, value) {
            var wsiURI = value.wsiURI
            var odeIndex = wsiURI.indexOf('.ode');
            odeIndex = odeIndex + 4
            wsiURI = [wsiURI.slice(0, odeIndex), '/' + bpmName + '.wsdl', wsiURI.slice(odeIndex)].join('');
            $('#invoke_values').append('<div class"radio"><label><input class="ace" type="radio" value="' + wsiURI + '" name="invoke-task-select"><span class="lbl">&nbsp;&nbsp;' + value.name + '</span></label></div>');
        });
        $('#invoke_values').removeClass('hide');
        $('#invokeIFrame').addClass('hide');
        $("#invokeInstanceModal .modal-dialog").css('width', 400);
        $("#invokeInstanceModal").find('.modal-body').css('height', 'auto');
        $('#invokeInstanceModal').find('.modal-footer').removeClass('hide');
        $('.start-invoke-instance, .mandatoryFileds, .invokeInstanceError').addClass('hide');
        $('.submit-invoke-operation').removeClass('hide');
        modalShow('invokeInstanceModal');
    } else {
        showInformation($('#noOperationsInstance').text())
    }
    removeLoading($('#' + defaults.instancesTableId + '_wrapper'), false);
}

function submitToIFrame() {
    invokeWsiURI = $('input[name=invoke-task-select]:checked', '#invoke_values').val();
    if (invokeWsiURI != undefined && invokeWsiURI.length != 0) {
        $('#select-operation-error').addClass('hide');
        $('#invokeIFrame').removeClass('hide');
        $('#invoke_values').addClass('hide');
        $("#invokeInstanceModal .modal-dialog").animate({
            width: $(window).width() * 0.8
        }, 1000);
        $('#invokeInstanceModal').find('.submit-invoke-operation').addClass('hide');
        addLoading($('#invokeInstanceModal').find('.modal-body'));
        sendAjaxCall(invokeWsiURI, "GET", false, true, "json", {}, handleInstancesAjaxError, function(response) {
            if (response.success_message != undefined && response.success_message != null) {
                $('#invokeInstanceModal').find('.start-invoke-instance').removeClass('hide');
                $('.mandatoryFileds').removeClass('hide');
                if (typeof seperateTags == 'undefined') {
                    loadJs('scripts/custom/administration/monitoring/soapReqParsing.js', function() {
                        seperateTags(response.success_message.wsRequestTemplate, 'invokeIFrame');
                    })
                } else {
                    seperateTags(response.success_message.wsRequestTemplate, 'invokeIFrame');
                }
                removeLoading();

            } else
                showInformation(response.error_message);

        }, 90000);
    } else {
        $('#select-operation-error').removeClass('hide');
    }
}
/**
 * @Function Name   : executeOperation
 * @Description     : execute the selected operation
 * @param           : operation
 * @returns         :
 * */
function executeOperation(operation) {
    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
}
/**
 * @Function Name   : resumeInstance
 * @Description     : resume the selected instances(i.e changing the state of an instance) from suspended to active
 * @param           :
 * @returns         :
 * */
function resumeInstance() {
    var columnsData = getSelectedRows(instancesTable, false);
    selectedId = [];
    $.each(columnsData, function(key, value) {
        selectedId[selectedId.length] = $(value).text();
    });
    if (columnsData.length <= 0)
        showInformation($('#selectInfo').text());
    else {
        addLoading($('#' + defaults.instancesTableId + '_wrapper'));
        var data = {
            id: selectedId
        };
        sendAjaxCall(defaults.commonInstancesUrl + "/resume", "POST", false, true, "json", data, handleInstancesAjaxError, actionSuccess);
    }
}

/**
 * @Function Name   : suspendInstance
 * @Description     : suspend the selected instances(i.e changing the state of an instance) from active to suspend
 * @param           :
 * @returns         :
 * */
function suspendInstance() {
    var columnsData = getSelectedRows(instancesTable, false);
    selectedId = [];
    $.each(columnsData, function(key, value) {
        selectedId[selectedId.length] = $(value).text();
    });
    if (columnsData.length <= 0)
        showInformation($('#selectInfo').text());
    else {
        addLoading($('#' + defaults.instancesTableId + '_wrapper'));
        var data = {
            id: selectedId
        };
        sendAjaxCall(defaults.commonInstancesUrl + "/suspend", "POST", false, true, "json", data, handleInstancesAjaxError, actionSuccess);
    }
}

/**
 * @Function Name   : terminateInstance
 * @Description     : terminates the selected instances(i.e changing the state of an instance) from suspend to terminate
 * @param           :
 * @returns         :
 * */
var selectedId = [];

function terminateInstance() {
    var columnsData = getSelectedRows(instancesTable, false);
    selectedId = [];
    $.each(columnsData, function(key, value) {
        selectedId[selectedId.length] = $(value).text();
    });
    if (columnsData.length <= 0)
        showInformation($('#selectInfo').text());
    else {
        $('#terminateInstanceModal').find('.modal_heading').text($('#terminateTitle').text());
        var errorMessage = $('#terminateConfirm').text();
        $('#terminateInstanceModal').find('.terminateConfirmText').text(errorMessage.replace('{0}', selectedId.length));
        modalShow('terminateInstanceModal');
    }
}

function confirmTermination() {
    var check = $('#terminateChild').prop('checked');
    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    var data = {
        id: selectedId
    }
    if (check) {
        sendAjaxCall(defaults.commonInstancesUrl + "/terminate/child", "POST", false, true, "json", data, handleInstancesAjaxError, actionSuccess);
    } else {
        sendAjaxCall(defaults.commonInstancesUrl + "/terminate", "POST", false, true, "json", data, handleInstancesAjaxError, actionSuccess);
    }
}

/**
 * @Function Name   : deleteInstance
 * @Description     : deletes the selected instances
 * @param           :
 * @returns         :
 * */
function deleteInstance() {
    var columnsData = getSelectedRows(instancesTable, false);
    selectedId = [];
    $.each(columnsData, function(key, value) {
        selectedId[selectedId.length] = $(value).text();
    });
    if (columnsData.length <= 0)
        showInformation($('#selectInfo').text());
    else {
        $('#deleteInstanceModal').find('.modal_heading').text($('#deleteTitle').text());
        var errorMessage = $('#deleteConfirm').text();
        $('#deleteInstanceModal').find('.terminateConfirmText').text(errorMessage.replace('{0}', selectedId.length));
        modalShow('deleteInstanceModal');
    }
}

function confirmDeleteInstance() {
    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    var data = {
        id: selectedId
    };
    sendAjaxCall(defaults.commonInstancesUrl + "/delete", "POST", false, true, "json", data, handleInstancesAjaxError, function(response) {
        deleteActionSuccess(response, selectedId)
    });
}
/**
 * @Function Name   : actionSuccess
 * @Description     : show the information if failure occurs while executing an action / gets the instace list if success
 * @param           :
 * @returns         :
 * */
function actionSuccess(response) {
    if (response.success_message != undefined) {
        showNotification(response.success_message);
        getNextPrevPageData('update');
    } else if (response.error_message != undefined) {
        showErrorNotification(response.error_message);
		removeLoading($('#' + defaults.instancesTableId + '_wrapper'), false);
    } else {
        getNextPrevPageData('update');
        showNotification(response.partial_success_message);
        showErrorNotification(response.partial_error_message)
    }
}

/**
 * @Function Name   : actionSuccess
 * @Description     : show the information if failure occurs while executing an action / gets the instace list if success
 * @param           :
 * @returns         :
 * */
function deleteActionSuccess(response, totalSelectedIds) {
    if (totalSelectedIds.length == totalRecords && paginationData.requiredPage > 1 && $("#instancesPageNo").val() == totalPageSize)
        paginationData.requiredPage = parseInt(paginationData.requiredPage - parseInt(1));
    if (response.success_message != undefined) {
        getNextPrevPageData('delete');
        showNotification(response.success_message);
    } else if (response.error_message != undefined) {
        removeLoading($('#' + defaults.instancesTableId + '_wrapper'), false);
        showErrorNotification(response.error_message);
    } else {
        getNextPrevPageData('delete');
        showNotification(response.partial_success_message);
        showErrorNotification(response.partial_error_message)
    }
}

var currentInstanceId;

function fetchInstanceEvents(object) {
    var tempRow = $(object).closest('tr');
    $('#instanceEvents').find('.modal_heading').text('Events: ' + $(tempRow).find('.instanceName').attr('full'));
    $('#instanceEvents .modal-dialog').css('width', $(window).width() * 0.8);
    $('#instanceEvents .modal-dialog').css('height', $(window).height() * 0.8);
    addLoading($('#eventsTableScroll'));
    $('#loading').css('margin-top', 10);
    currentInstanceId = parseInt($(tempRow).find('.instanceId').text());
    var data = {};
    sendAjaxCall(defaults.commonInstancesUrl + "/" + currentInstanceId + "/events", "GET", false, true, "json", data, handleInstancesAjaxError, fetchInstanceEventsSuccess);
    modalShow('instanceEvents');

}

var eventsInfoList = {};

function fetchInstanceEventsSuccess(data) {
    instanceEventsTable.fnClearTable();
    $.each(data.events, function(key, value) {
        var items = [];
        items[items.length] = '<span class="action-buttons"><a onclick="openEventInfo(this);" title="Expand" class="iconCursor"><i class="fa fa-plus"></i></a></span>';
        if (value.timestamp != null && value.timestamp != undefined){
            var time = $.format.date(value.timestamp, userPreferences.dateFormat+userPreferences.hourFormat);
            time = time.split(' ')
            time = time[0]+' '+time[2]+'.'+value.timestamp.toString().slice(- 3)+' '+time[3]
            items[items.length] = time
        }
        else
            items[items.length] = '-';

        if (value.name != null && value.name != undefined)
            items[items.length] = value.name;
        else
            items[items.length] = '-';
        if (value.eventType != null && value.eventType != undefined)
            items[items.length] = value.eventType;
        else
            items[items.length] = '-';
        if (value.activityName != null && value.activityName != undefined)
            items[items.length] = value.activityName;
        else
            items[items.length] = '-';
        if (value.activityId != null && value.activityId != undefined)
            items[items.length] = value.activityId;
        else
            items[items.length] = '-';
        if (value.details['process-id'] != null && value.details['process-id'] != undefined)
            items[items.length] = value.details['process-id'];
        else
            items[items.length] = '-';

        if (value.details['line-number'] != null && value.details['line-number'] != undefined)
            items[items.length] = value.details['line-number'];
        else
            items[items.length] = '-';
        if (value.details['scope-definition-id'] != null && value.details['scope-definition-id'] != undefined)
            items[items.length] = value.details['scope-definition-id'];
        else
            items[items.length] = '-';
        if (value.details['activity-type'] != null && value.details['activity-type'] != undefined)
            items[items.length] = value.details['activity-type'];
        else
            items[items.length] = '-';
        if (value.details.type != null && value.details.type != undefined)
            items[items.length] = value.details.type;
        else
            items[items.length] = '-';
        if (value.details['activity-id'] != null && value.details['activity-id'] != undefined)
            items[items.length] = value.details['activity-id'];
        else
            items[items.length] = '-';
        if (value.details['process-type'] != null && value.details['process-type'] != undefined)
            items[items.length] = value.details['process-type'];
        else
            items[items.length] = '-';
        if (value.details['instance-id'] != null && value.details['instance-id'] != undefined)
            items[items.length] = value.details['instance-id'];
        else
            items[items.length] = '-';
        if (value.details['scope-name'] != null && value.details['scope-name'] != undefined)
            items[items.length] = value.details['scope-name'];
        else
            items[items.length] = '-';
        if (value.details['activity-definition-id'] != null && value.details['activity-definition-id'] != undefined)
            items[items.length] = value.details['activity-definition-id'];
        else
            items[items.length] = '-';
        if (value.details.name != null && value.details.name != undefined)
            items[items.length] = value.details.name;
        else
            items[items.length] = '-';
        if (value.details['scope-id'] != null && value.details['scope-id'] != undefined)
            items[items.length] = value.details['scope-id'];
        else
            items[items.length] = '-';
	    if(value.details['new-value'] != null && value.details['new-value'] != undefined)
			items[items.length] = value.details['new-value']+"";
		else 
			items[items.length] = '-';

        instanceEventsTable.fnAddData(items, false);
    });
    instanceEventsTable.fnDraw(true);
    removeLoading($('#eventsTableScroll'), false);
}

function openEventInfo(object) {
    var nTr = object.parentNode.parentNode.parentNode;
    var i = $.inArray(nTr, anOpen);

    if (i === -1) {
        $(object).html('<i class="fa fa-minus" title="Collapse"></i>');
        var nDetailsRow = instanceEventsTable.fnOpen(nTr, fnFormatDetails(instanceEventsTable, nTr), 'details');
        $('div.innerDetails', nDetailsRow).slideDown();
        anOpen.push(nTr);

    } else {
        $(object).html('<i class="fa fa-plus"></i>')
        $('div.innerDetails', $(nTr).next()[0]).slideUp(function() {
            instanceEventsTable.fnClose(nTr);
            anOpen.splice(i, 1);
        });
    }
    $(nTr).next().find('td').css('background-color', '#ffffff');
}

function fnFormatDetails(oTable, nTr) {
    var oData = oTable.fnGetData(nTr);
    if (oData == null || oData == "" || oData == " ")
        return false;
    else {
        var out = $('#eventDetails').clone();
        $(out).removeAttr('id');
        oData[5]!=null && oData[5]!=0 ? $(out).find('.event-activityId').text(oData[5])  : $(out).find('.event-activityId').parent().addClass('hide');
        oData[6]!=null && oData[6]!=0 ? $(out).find('.event-processId').text(oData[6])   : $(out).find('.event-processId').parent().addClass('hide'); 
        oData[7]!=null && oData[7]!=-1 ? $(out).find('.event-line-number').text(oData[7]) : $(out).find('.event-line-number').parent().addClass('hide');
        oData[8]!=null && oData[8]!=0 ? $(out).find('.event-scope-defination-id').text(oData[8]) : $(out).find('.event-scope-defination-id').parent().addClass('hide');
        oData[9]!=null && oData[9]!=0 && oData[9]!="-" ? $(out).find('.event-activityType').text(oData[9]) : $(out).find('.event-activityType').parent().addClass('hide');
        oData[10]!=null && oData[10]!=0 ? $(out).find('.event-type').text(oData[10]) : $(out).find('.event-type').parent().addClass("hide");
        oData[11]!=null && oData[11]!=0 && oData[11]!="-" ? $(out).find('.event-activity-id').text(oData[11]) : $(out).find('.event-activity-id').parent().addClass("hide");
        oData[12]!=null && oData[12]!=0 ? $(out).find('.event-process-type').text(oData[12]) : $(out).find('.event-process-type').parent().addClass("hide");
        oData[13]!=null && oData[13]!=0 ? $(out).find('.event-instance-id').text(oData[13]) : $(out).find('.event-instance-id').parent().addClass("hide");
        oData[14]!=null && oData[14]!=0 && oData[14]!="-" ? $(out).find('.event-scope-name').text(oData[14]) : $(out).find('.event-scope-name').parent().addClass("hide");
        oData[15]!=null && oData[15]!=0 && oData[15]!="-" ? $(out).find('.event-activity-defination-id').text(oData[15]) : $(out).find('.event-activity-defination-id').parent().addClass("hide");
        oData[16]!=null && oData[16]!=0 && oData[16]!="-" ? $(out).find('.event-name').text(oData[16]) : $(out).find('.event-name').parent().addClass("hide");
        oData[17]!=null && oData[17]!=0 && oData[17]!="-" ? $(out).find('.event-acope-id').text(oData[17]) : $(out).find('.event-acope-id').parent().addClass("hide");
	    oData[18]!=null && oData[18]!=0 && oData[18]!="-" ? $(out).find('.event-new-value').text(oData[18]) : $(out).find('.event-new-value').parent().addClass("hide");
        return out;
    }
}

function refreshInstanceEvents() {
    addLoading($('#eventsTableScroll'));
    $('#loading').css('margin-top', $('#instanceEvents .modal-dialog').height() / 2);
    var data = {};
    sendAjaxCall(defaults.commonInstancesUrl + "/" + currentInstanceId + "/events", "GET", false, true, "json", data, handleInstancesAjaxError, fetchInstanceEventsSuccess);
}

function updateButtons(checkboxObj) {
    var row = $(checkboxObj).closest('tr');
    var rowText = $(row).find('td:eq(3) span a').attr('data-content');
    if ($(checkboxObj).prop('checked')) {
        if (rowText.indexOf('Progress') >= 0) {
            buttonCount.resume = parseInt(buttonCount.resume + 1);
            $('#resumeButton').attr('disabled', 'disabled');
        } else if (rowText.indexOf('Failed') >= 0 || rowText.indexOf('Terminated') >= 0 || rowText.indexOf('Completed') >= 0) {
            buttonCount.resume = parseInt(buttonCount.resume + 1);
            buttonCount.invoke = parseInt(buttonCount.invoke + 1);
            buttonCount.terminate = parseInt(buttonCount.terminate + 1);
            buttonCount.suspended = parseInt(buttonCount.suspended + 1);
            $('#resumeButton').attr('disabled', 'disabled');
            $('#invokeButton').attr('disabled', 'disabled');
            $('#terminateButton').attr('disabled', 'disabled');
            $('#suspendButton').attr('disabled', 'disabled');
        } else if (rowText.indexOf('Suspended') >= 0) {
            buttonCount.invoke = parseInt(buttonCount.invoke + 1);
            buttonCount.suspended = parseInt(buttonCount.suspended + 1);
            $('#invokeButton').attr('disabled', 'disabled');
            $('#suspendButton').attr('disabled', 'disabled');
        }
    } else {
        if (rowText.indexOf('Progress') >= 0) {
            buttonCount.resume = parseInt(buttonCount.resume - 1);
            if (buttonCount.resume == 0)
                $('#resumeButton').removeAttr('disabled');
        } else if (rowText.indexOf('Failed') >= 0 || rowText.indexOf('Terminated') >= 0 || rowText.indexOf('Completed') >= 0) {
            if (buttonCount.resume > 0)
                buttonCount.resume = parseInt(buttonCount.resume - 1);
            if (buttonCount.invoke > 0)
                buttonCount.invoke = parseInt(buttonCount.invoke - 1);
            if (buttonCount.terminate > 0)
                buttonCount.terminate = parseInt(buttonCount.terminate - 1);
            if (buttonCount.suspended > 0)
                buttonCount.suspended = parseInt(buttonCount.suspended - 1);

            if (buttonCount.resume == 0)
                $('#resumeButton').removeAttr('disabled');
            if (buttonCount.invoke == 0)
                $('#invokeButton').removeAttr('disabled');
            if (buttonCount.terminate == 0)
                $('#terminateButton').removeAttr('disabled');
            if (buttonCount.suspended == 0)
                $('#suspendButton').removeAttr('disabled');
        } else if (rowText.indexOf('Suspended') >= 0) {
            if (buttonCount.invoke > 0)
                buttonCount.invoke = parseInt(buttonCount.invoke - 1);
            if (buttonCount.suspended > 0)
                buttonCount.suspended = parseInt(buttonCount.suspended - 1);

            if (buttonCount.invoke == 0)
                $('#invokeButton').removeAttr('disabled');
            if (buttonCount.suspended == 0)
                $('#suspendButton').removeAttr('disabled');
        }
    }
}

function updateHeaderButtons(obj) {
    if ($(obj).prop('checked')) {
        unSelectAll(obj);
        selectAll(obj);
    } else {
        unSelectAll(obj);
    }
}

function unSelectAll(obj) {
    $(obj).closest('table').find('tr > td:first-child input:checkbox')
        .each(function() {
            var rowText = $(this).closest('tr').find('td:eq(3) span a').attr('data-content');
            this.checked = obj.checked;
            $(this).closest('tr').removeClass('row_selected');
            if (rowText.indexOf('Progress') >= 0) {
                if (buttonCount.resume > 0)
                    buttonCount.resume = parseInt(buttonCount.resume - 1);
                if (buttonCount.resume == 0)
                    $('#resumeButton').removeAttr('disabled');
            } else if (rowText.indexOf('Failed') >= 0 || rowText.indexOf('Terminated') >= 0 || rowText.indexOf('Completed') >= 0) {
                if (buttonCount.resume > 0)
                    buttonCount.resume = parseInt(buttonCount.resume - 1);
                if (buttonCount.invoke > 0)
                    buttonCount.invoke = parseInt(buttonCount.invoke - 1);
                if (buttonCount.terminate > 0)
                    buttonCount.terminate = parseInt(buttonCount.terminate - 1);
                if (buttonCount.suspended > 0)
                    buttonCount.suspended = parseInt(buttonCount.suspended - 1);

                if (buttonCount.resume == 0)
                    $('#resumeButton').removeAttr('disabled');
                if (buttonCount.invoke == 0)
                    $('#invokeButton').removeAttr('disabled');
                if (buttonCount.terminate == 0)
                    $('#terminateButton').removeAttr('disabled');
                if (buttonCount.suspended == 0)
                    $('#suspendButton').removeAttr('disabled');
            } else if (rowText.indexOf('Suspended') >= 0) {
                if (buttonCount.invoke > 0)
                    buttonCount.invoke = parseInt(buttonCount.invoke - 1);
                if (buttonCount.suspended > 0)
                    buttonCount.suspended = parseInt(buttonCount.suspended - 1);
                if (buttonCount.invoke == 0)
                    $('#invokeButton').removeAttr('disabled');
                if (buttonCount.suspended == 0)
                    $('#suspendButton').removeAttr('disabled');
            }
        });
}

function selectAll(obj) {
    $(obj).closest('table').find('tr > td:first-child input:checkbox')
        .each(function() {
            var rowText = $(this).closest('tr').find('td:eq(3) span a').attr('data-content');
            this.checked = obj.checked;
            $(this).closest('tr').addClass('row_selected');
            if (rowText.indexOf('Progress') >= 0) {
                buttonCount.resume = parseInt(buttonCount.resume + 1);
                $('#resumeButton').attr('disabled', 'disabled');
            } else if (rowText.indexOf('Failed') >= 0 || rowText.indexOf('Terminated') >= 0 || rowText.indexOf('Completed') >= 0) {
                buttonCount.resume = parseInt(buttonCount.resume + 1);
                buttonCount.invoke = parseInt(buttonCount.invoke + 1);
                buttonCount.terminate = parseInt(buttonCount.terminate + 1);
                buttonCount.suspended = parseInt(buttonCount.suspended + 1);
                $('#resumeButton').attr('disabled', 'disabled');
                $('#invokeButton').attr('disabled', 'disabled');
                $('#terminateButton').attr('disabled', 'disabled');
                $('#suspendButton').attr('disabled', 'disabled');
            } else if (rowText.indexOf('Suspended') >= 0) {
                buttonCount.invoke = parseInt(buttonCount.invoke + 1);
                buttonCount.suspended = parseInt(buttonCount.suspended + 1);
                $('#invokeButton').attr('disabled', 'disabled');
                $('#suspendButton').attr('disabled', 'disabled');
            }
        });
}

function openSearchInstanceModal() {
    $('#searchInstanceById').val("");
    $('#searchError').addClass('hide');
    modalShow('searchInstanceByIdPopup');
    setTimeout(function() {
        $('#searchInstanceById').focus().select();
    }, 500);


}

function searchById(ID) {
    $('#breadcrumbProcessName').empty();
    $('#breadcrumbStatus').empty();
    $('#breadcrumbFilter').addClass('hide');
    $('#breadcrumbLinkedInstance').addClass('hide');
    $('#bcProcId').text("");
    $('#bcProcName').text("");
    var instanceId;
    if (ID == null && ID == undefined)
        instanceId = $('#searchInstanceById').val();
    else
        instanceId = parseInt(ID);

    if (instanceId == null || instanceId == "") {
        $('#searchError').text($('#enterInstanceID').text());
        $('#searchError').removeClass('hide');
        $('#searchInstanceById').focus();
        return false;
    } else {
        var data = {};
        $('#searchedId').text(instanceId).parent().removeClass('hide');
        addLoading($('#' + defaults.instancesTableId + '_wrapper'));
        $('#searchInstanceByIdPopup').modal('hide');
        sendAjaxCall("console/instances/" + instanceId, "GET", false, true, "json", data, handleInstancesAjaxError, populateParticularInstance);
    }

}

function populateParticularInstance(data) {
    instancesTable.fnClearTable();
    $('#instances_pagination').remove();
    $('.paginationRows').remove();
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
    if (data != null && data != "") {
        if (data.error_message != undefined) {
            $('.dataTables_empty').text('No instance found.');
            showErrorNotification(data.error_message);
        } else {
            var value = data.instance;
            var items = [];
            var html = "";
            var newName;
            items[items.length] = "<input type='checkbox' class='ace instanceSelected' id='instanceSelected' onclick='updateHeaderCheckbox(this);updateButtons(this);' value=" + value.pid + "> <span class='lbl'></span>";
            items[items.length] = '<span class="instanceId">' + value.iid + '</span>';
            if (value.processBpmName != null)
                nameHtml = '<table class="table noLines popoverTable"><tr><td>Package:</td><td>' + value.processPackage + '</td></tr><tr><td>Version:</td><td>' + value.processVersion + '</td></tr><tr><td>Process:</td><td>' + value.processName + '</td></tr><tr><td>BPM Name:</td><td>' + value.processBpmName + '</td></tr></table>';
            else
                nameHtml = '<table class="table noLines popoverTable"><tr><td>Package:</td><td>' + value.processPackage + '</td></tr><tr><td>Version:</td><td>' + value.processVersion + '</td></tr><tr><td>Process:</td><td>' + value.processName + '</td></tr></table>';
            if (value.status.indexOf("COMPLETED") >= 0) {
                IName = value.processName + ' - ' + value.processVersion;
                if (IName.length > charLimit) {
                    newName = "..." + IName.slice(IName.length - charLimit);
                    nameHtml = "<span class='instanceName ace-popover' data-placement='bottom' data-content='" + nameHtml + "' data-trigger='hover' full='" + IName + "' bpmName='" + value.processBpmName + "'>" + newName + "</span>";
                } else {
                    newName = IName;
                    nameHtml = "<span class='instanceName ace-popover' data-placement='bottom' data-content='" + nameHtml + "'  data-trigger='hover' full='" + IName + "' bpmName='" + value.processBpmName + "'>" + newName + "</span>";
                }
            } else {
                IName = value.processName + ' - ' + value.processVersion;
                if (IName.length > charLimit) {
                    newName = "..." + IName.slice(IName.length - charLimit);
                    nameHtml = "<a class='instanceName ace-popover iconCursor' data-placement='bottom' data-content='" + nameHtml + "' data-trigger='hover' full='" + IName + "' onclick=javascript:getActivityInfo(" + value.iid + "); bpmName='" + value.processBpmName + "'>" + newName + "</a>";
                } else {
                    newName = IName;
                    nameHtml = "<a class='instanceName ace-popover iconCursor' data-placement='bottom' data-trigger='hover' data-content='" + nameHtml + "' full='" + IName + "' onclick=javascript:getActivityInfo(" + value.iid + "); bpmName='" + value.processBpmName + "'>" + newName + "</a>";
                }
            }
            nameHtml += '<a onclick="showLinkedInstances(' + value.iid + ',this);" data-name="'+IName+'" class="ace-popover pull-right noDecoration iconCursor" data-placement="bottom" data-content="View Linked Instances" data-trigger="hover" status= "View linked instances" ><i class="fa fa-link"></i></a>'
            if(value.status=="ACTIVE" && value.waitingStatus){
                if(value.waitingStatus=="WAITING_ON_SERVICE")
                    nameHtml+="<a class='ace-popover pull-right cursorDefault' data-placement='bottom' data-trigger='hover' data-content='"+$("#waitingOnServiceMsg").text()+"'><i class='fa fa-cloud instanceWaitingForService'></i></a>";
                else if(value.waitingStatus=="WAITING_ON_TASK")
                    nameHtml+="<a class='ace-popover pull-right cursorDefault' data-placement='bottom' data-trigger='hover' data-content='"+$("#waitingOnTaskMsg").text()+"'><i class='fa fa-user instanceWaitingForUser'></i></a>";
                else
                    nameHtml+="<a class='ace-popover pull-right cursorDefault' data-placement='bottom' data-trigger='hover' data-content='"+$("#waitingOnServiceMsg").text()+"'><i class='fa fa-cloud instanceWaitingFor'></i></a><a class='ace-popover pull-right cursorDefault' data-placement='bottom' data-trigger='hover' data-content='"+$("#waitingOnTaskMsg").text()+"'><i class='fa fa-user instanceWaitingForService'></i></a>";
            }
            items[items.length] = nameHtml;
            if (value.state == "Completed")
                items[items.length] = '<span class="action-buttons"><a class="ace-popover iconCursor" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag grey"></i></a></spa>';
            else if (value.state == "In Progress") {
                if (value.failures != null && value.failures != undefined)
                    items[items.length] = '<span class="action-buttons failure_failed_cnt"><a class="ace-popover iconCursor" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag text-success"></i></a></spa><span class="badge badge-warning ace-popover cursorPointer" data-content="Failure count" data-placement="bottom" data-trigger="hover">' + value.failures + '</span>';
                else
                    items[items.length] = '<span class="action-buttons "><a class="ace-popover iconCursor" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag green"></i></a></spa>';
            } else if (value.state == "Failed") {
                if (value.failures != null && value.failures != undefined)
                    items[items.length] = '<span class="action-buttons failure_failed_cnt"><a class="ace-popover iconCursor" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag text-danger" ></i></a></span><span class="badge badge-danger ace-popover cursorPointer" data-content="Fault count" data-placement="bottom" data-trigger="hover">' + value.failures + '</span>';
                else
                    items[items.length] = '<span class="action-buttons "><a class="ace-popover iconCursor" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag red"></i></a></spa>';
            } else if (value.state == "Terminated")
                items[items.length] = '<span class="action-buttons "><a class="ace-popover iconCursor" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag purple"></i></a></spa>';
            else if (value.state == "Suspended")
                items[items.length] = '<span class="action-buttons "><a class="ace-popover iconCursor" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag yellow-color"></i></a></spa>';
            else if (value.state == "Failure")
                items[items.length] = '<span class="action-buttons "><a class="ace-popover iconCursor" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag orange"></i></a></spa>';
            else
                items[items.length] = '<span class="action-buttons "><a class="ace-popover iconCursor" data-content="' + value.state + '" data-placement="bottom" data-trigger="hover"><i class="fa fa-flag"></i></a></spa>';
            items[items.length] = $.format.date(value.started, userPreferences.dateFormat+userPreferences.hourFormat);
            items[items.length] = $.format.date(value.lastActive, userPreferences.dateFormat+userPreferences.hourFormat);
            if (true) {
                html += "<span id='images' class='action-buttons'><a class='iconCursor' title='Display SVG'><i class='fa fa-info-circle' onclick=javascript:getProcessImage('" + value.iid + "','" + value.pid + "','" + value.processName + "&nbsp;&nbsp;[v" + value.version + "]','showSvg');></i></a></span>&nbsp;&nbsp;&nbsp;"
                html += "<div id='imageDownload' class='btn-group'><a class='dropdown-toggle iconCursor' title='Download' data-toggle='dropdown' onclick='setDropdownPosition(this);'><i class='fa-zoom-in fa fa-download fa-only bigger-120 '></i></a><ul class='dropdown-menu dropdown-yellow dropdown-menu-right dropdown-caret dropdown-closer positionFixed'>";
                html += "<li><a href=" + defaults.commonInstancesUrl + "/" + value.iid + "/images/svg/export?id=" + value.pid + ">" + $('#downloadSVG').text() + "</a></li>";
                html += "<li><a href=" + defaults.commonInstancesUrl + "/" + value.iid + "/images/pdf/export?id=" + value.pid + ">" + $('#downloadPDF').text() + "</a></li>";
                html += "<li><a href=" + defaults.commonInstancesUrl + "/" + value.iid + "/images/png/export?id=" + value.pid + ">" + $('#downloadPNG').text() + "</a></li>";
                items[items.length] = html;
            }
            items[items.length] = "<span id='images' class='action-buttons'> <a class='iconCursor' title='View Process and Instance Data'><i class='fa fa-info-circle' onclick=javascript:getScopeTree('" + value.iid + "','" + value.processName + "&nbsp;&nbsp;[v" + value.version + "]','" + value.iState + "','" + value.failures + "');></i></a></span>";
            items[items.length] = '<span class="action-buttons"><a class="iconCursor" title="View Events" onclick=fetchInstanceEvents(this);><i class="fa fa-list"></i></a></span>';
            instancesTable.fnAddData(items, false);
            instancesTable.fnDraw(true);
            $('.ace-popover').popover({
                html: true
            });
        }
    }
    removeLoading($('#' + defaults.instancesTableId + '_wrapper'), false);
    $("#" + defaults.instancesTableId + "_wrapper .showEntries").remove();
}


function ValidateId(event) {
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }
}

function isInstanceFilterExist(filterArr, filtername) {
    var flag = false;
    $.each(filterArr, function(key, value) {
        if (value.toLowerCase() == filtername.toLowerCase())
            flag = true;
    });
    return flag;
}

function updatedInstanceFilterList() {
    var data = {};
    sendAjaxCall("console/filters", "GET", false, true, "json", data, handleInstancesAjaxError, populateUpdatedInstanceFilterList);
}

function populateUpdatedInstanceFilterList(data) {
    populateFilters(data);
    fetchFiltersSuccess(data);
}

function isInstanceUpdateFilterNameExist(filterArr, filtername, selectedFilter) {
    var flag = false;
    $.each(filterArr, function(key, value) {
        if (selectedFilter.toLowerCase() == filtername.toLowerCase())
            flag = false;
        else if (value.toLowerCase() == filtername.toLowerCase())
            flag = true;
    });
    return flag;
}

function displayFlagsList(obj) {
    var pos = $(obj).offset();
    var posLeft = pos.left + ($(obj).width()) / 2 - 50;
    $('#flagsList').removeClass('hide');
    $('#flagsList').css('left', posLeft).css('top', (pos.top + 16)).css('right', 'auto');
}

function hideFlagsList(obj) {
    $('#flagsList').addClass('hide');
}
/**
 * @Function Name   : showSVGPath
 * @Description     : Shows the path in svg for an instance
 * @param           : boolean
 * @returns         :
 * */
function showSVGPath(bol) {
    var svgFile = $('#svg_container svg').clone();
    var pathList = $(svgFile).find('#activityDefs');
    $.each($(pathList).find('activity'), function(key, value) {
        var labelName = $(this).attr('label');
        $('#svg_container').find('rect').each(function() {
            if ($(this).attr('bpmn:activity-id') == labelName) {
                if (bol) {
                    //if ($(this).attr('oldfill') == null || $(this).attr('oldfill') == undefined)
                    //$(this).attr('oldfill',$(this).attr('fill'));
                    if ($(this).attr('oldstroke') == null || $(this).attr('oldstroke') == undefined) {
                        if ($(this).attr('stroke') != null && $(this).attr('stroke') != undefined)
                            $(this).attr('oldstroke', $(this).attr('stroke'));
                        else
                            $(this).attr('oldstroke', 'black');
                    }
                    $(this).attr('stroke-width', 1);
                    //$(this).attr('fill','#F7BE81');
                    $(this).attr('stroke', 'green');
                } else {
                    //$(this).attr('fill',$(this).attr('oldfill'));
                    $(this).attr('stroke', $(this).attr('oldstroke'));
                }
            }
        });
    });
    if (!bol)
        $('#showPathDiv span').html('<a class="noDecoration iconCursor" title="' + $("#showExePath").text() + '" onclick="showSVGPath(true);"><i class="fa fa-cogs bigger-150"></i></a>')
    else
        $('#showPathDiv span').html('<a class="noDecoration iconCursor" title="' + $("#hideExePath").text() + '" onclick="showSVGPath(false);"><i class="fa fa-cogs bigger-150"></i></a>')
}
/**
 * @Function Name   : handleProcessesAjaxError
 * @Description     : handles all the error response for ajax calls in instance page
 * @param           :
 * @returns         :
 * */
function handleInstancesAjaxError(e) {
    if(e.error_message)
        showErrorNotification(e.error_message)
    else
        showInformation(e.responseText);
    removeLoading('', true);
    return false;
}

function removeSelectedStatus() {
    paginationData.requiredPage = parseInt(1);
    getInstancesList(true, true, false);
}

function removeSelectedProcessInstances() {
    paginationData.requiredPage = parseInt(1);
    paginationData.filterId = -1;
    currentFilterId = -1;
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.instanceFilter = parseInt(-1);
        userCache.instanceFilterName = null;
        $.jStorage.set($("#userid").text(), userCache);
    }
    getInstancesList(true, false, true);
    $('#auditInstaceId').text('')
}

/** 
 * @Function Name   : refreshInstancesList
 * @Description     : This method is use to refresh the page data.
 * @param           :
 * @returns         :
 * */
function refreshInstancesList() {
    paginationData.requiredPage = parseInt(1);
    if (currentFilterId != 0)
        paginationData.filterId = parseInt(currentFilterId);
    else
        paginationData.filterId = parseInt(-1);
    addLoading($('#' + defaults.instancesTableId + '_wrapper'));
    $('#searchedId').text('').parent().addClass('hide');
    $('#auditInstaceId').text('');
    if ($('#bcProcId').text() != "") {
        if ($('#bcStatus').text() != "" && $('#bcStatus').text() != "Total") {
            var satusData = {
                id: $('#bcProcId').text(),
                status: $('#bcStatus').text(),
                requiredPage: paginationData.requiredPage,
                pageSize: paginationData.pageSize
            }
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            $('#instanceStatus').text($('#bcStatus').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        } else {
            var satusData = {
                id: $('#bcProcId').text(),
                requiredPage: paginationData.requiredPage,
                pageSize: paginationData.pageSize
            }
            $('#processName').text($('#bcProcName').text()).parent().removeClass('hide');
            sendAjaxCall("console/processes/instances", "GET", false, true, "json", satusData, handleInstancesAjaxError, populateInstanceList);
        }
    } else
        sendAjaxCall(defaults.commonInstancesUrl, "GET", false, true, "json", paginationData, handleInstancesAjaxError, populateInstanceList);
}

function removeStatusBreadCrumb() {
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.instanceFilter = parseInt(-1);
        userCache.instanceFilterName = null;
        $.jStorage.set($("#userid").text(), userCache);
    }
    getInstancesList(true, false, true);
}
