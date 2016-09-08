/**
 * Copyright (C) 2005-2015 Intalio inc.
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/** This variables contains all the icons that are visible to the logged in user for task page*/
var taskIconSet=[],notiIconSet=[],processIconSet=[];

/**Super admin action button access to workflow*/
var iconsSetTasks_SA = ["reassign","claim","release","escalate","filter","delete","share","skip","export","feed","update","updateDueDate"];
var iconsSet_Process_SA = ["reassign","delete","feed"];
var iconsSet_Notifications_SA = ["delete"];

/** tmsService,tmpService holds the endpoint reference to TaskManagementService & processes*/
var tmsService,tmpService;

/** useToolBarIcon holds the boolean value whether to display action buttons in task page*/
var useToolBarIcon;

/** participantToken holds the participantToken to interact with the server*/
var participantToken;

/** currentUser holds the logged in user name*/
var currentUser;

/** taskTable holds the reference of task data table*/
var taskTable;

/** processTable holds the reference of process data table*/
var processTable;

/** notificationTable holds the reference of notification data table*/
var notificationTable;

/** tempWorkflowTable holds the reference of current active data table*/
var tempWorkflowTable;

/** currentTab holds the reference of current active tab*/
var currentTab;

/** formURL holds the url of a processes to open particular process tasks */
var formURL;

/** tableWidth is used to set the width of the table dynamically*/
var tableWidth;

/** updateTaskData is used to store the name of a task*/
var updateTaskData;

/** processTasks will be true if tasks of particular process in called from workflow processes.*/
var processTasks = false;

/** width is used to set the width of each column in data tables*/
var width = 2000;

/** height is used to set the height of the IFrame for opening forms*/
var height = $(window).height() * 0.8;

/** speed is used to set the speed for opening forms in IFrame*/
var speed = 500;

/** proxy is used to set the proxy for soap actions to execute*/
var proxy = "scripts/plugin/workflow/proxy.jsp";

/** userArray stores all the users of logged in roles*/
var userArray;

/** totalRecords is used to calculate the pagination*/
var totalRecords;

/** endNumber is used to display the no of entries*/
var endNumber;

/** startNumber is used to display the no of entries*/
var startNumber;

/** totalTaskPageSize hold the total page size for Task page*/
var totalTaskPageSize;

/** totalProcessesPageSize hold the total page size for Processes page*/
var totalProcessesPageSize;

/** totalProcessesPageSize hold the total page size for Processes page*/
var totalNotificationPageSize;

/** errorString stores all the error after calling webservice*/
var errorString;

/** escalateData will contain all the tasks that are to be escalated */
var escalateData = [];

/** this variable stores all the response count to refresh the list */
var responseCount = 1;

/** this variable contains button's list */
var taskBtnArr = ["reassignButton","claimButton","releaseButton","skipButton","escalateButton","shareButton"];

/*this variable will arrange buttons position*/
var arrangeButtons = ["reassign","claim","release","escalate", "skip","filter","share"];

var taskStateFlag = false;

var packageData = "";

/** default namespaces */
var defaultsWorkflow = {
    tmsNameSpace: "http://www.intalio.com/BPMS/Workflow/TaskManagementServices-20051109/",
    tmpNameSpace: "http://www.intalio.com/bpms/workflow/ib4p_20051115",
    rbacNameSpace: "http://tempo.intalio.org/security/RBACQueryService/",
    tasNameSpace: "http://www.intalio.com/BPMS/Workflow/TaskAttachmentService/"
}

/** buttonsCount for claim and release*/
var buttonsCount = {
    claim: 0,
    release: 0
};

/** taskOptions is used set the datatable options for task page*/
var taskOptions = {
    "bPaginate": false,
    "bStateSave": true,
    "bInfo": false,
    "bFilter": true,
    "bRetrieve": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bAutoWidth": false,
    "bSort": false,
    "aoColumns": [{
        "sWidth": width * 0.025,
        "sClass": "center"
    }, {
        "sType": "html",
        "sClass": "alignLeft description",
        "sWidth": width * 0.28
    }, {
        "sWidth": width * 0.050,
        "sClass": "center status"
    }, {
        "sClass": "alignLeft created",
        "sWidth": width * 0.17
    }, {
        "sClass": "alignLeft dueDate",
        "sWidth": width * 0.17
    }, {
        "sType": "string",
        "sClass": "center priority",
        "sWidth": 195,
        "iDataSort": 6
    }, {
        "bVisible": false,
        "bSearchable": false,
        "sWidth": width * 0.03
    }, {
        "sClass": "alignLeft assigned",
        "sWidth": width * 0.15
    }, {
        "sClass": "alignLeft shared",
        "sWidth": width * 0.15
    }, {
        "sClass": "center action",
        "sWidth": width * 0.05
    }, {
        "bVisible": false,
        "bSearchable": false
    },{
        "bVisible": false,
        "bSearchable": false
    }],
    "fnDrawCallback": function(oSettings) {
        markAsOthersTask(oSettings, 10);
        markAsAdhocTask(oSettings,11);
    }
}

/** processesOptions is used set the datatable options for processes page*/
var processesOptions = {
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
        "sWidth": width * 0.025,
        "sClass": "center"
    }, {
        "sClass": "alignLeft",
        "sWidth": width * 0.3
    }, {
        "sClass": "alignLeft",
        "sWidth": width * 0.13
    }, {
        "sClass": "alignLeft",
        "sWidth": width * 0.13
    }, {
        "sClass": "center",
        "sWidth": width * 0.13
    }, {
        "bVisible": false,
        "bSearchable": false
    }],
    "fnDrawCallback": function(oSettings) {
        markAsOthersTask(oSettings, 5);
    }
}

/** notificationOptions is used set the datatable options for notifications page*/
var notificationOptions = {
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
        "sWidth": width * 0.025,
        "sClass": "center"
    }, {
        "sClass": "alignLeft",
        "sWidth": width * 0.3
    }, {
        "sWidth": width * 0.13,
        "sClass": "alignLeft"
    }, {
        "sType": "string",
        "sWidth": 195,
        "sClass": "center",
        "iDataSort": 3
    }, {
        "bVisible": false,
        "bSearchable": false,
        "sWidth": width * 0.03
    }, {
        "sWidth": width * 0.15,
        "sClass": "alignLeft"
    }, {
        "bVisible": false,
        "bSearchable": false
    }],
    "fnDrawCallback": function(oSettings) {
        markAsOthersTask(oSettings, 6);
    }
}

/** function to mark task as others.*/
function markAsOthersTask(oSettings, pos) {
    for (var i = 0, iLen = oSettings.aoData.length; i < iLen; i++) {
        var isOthersTask = $.trim(oSettings.aoData[i]._aData[pos]);
        if (isOthersTask == 'true') {
            oSettings.aoData[i].nTr.className += " othersTask";
        }
    }
}

function markAsAdhocTask(oSettings, pos) {
    for (var i = 0, iLen = oSettings.aoData.length; i < iLen; i++) {
        var isAdhocTask = $.trim(oSettings.aoData[i]._aData[pos]);
        if (isAdhocTask == 'true') {
            oSettings.aoData[i].nTr.className += " adhocTask";
        }
    }
}

/** taskData is used for sending the request data to get the list of tasks to server*/
var taskData = {
    page: "1",
    qtype: "_description",
    query: "",
    rp: "10",
    sortname: "undefined",
    sortorder: "undefined",
    updateData: "true",
    type: "PATask",
    taskType: "PATask",
    priorities: "",
    states: "",
    users: "",
    roles: "",
    projectName:"",
    deadline:"",
    processId:[],
    sharedTasks:false,
    sharedTo:""
}

/** processesData is used for sending the request data to get the list of processes to server*/
var processesData = {
    page: "1",
    qtype: "_description",
    query: "",
    rp: "10",
    sortname: "undefined",
    sortorder: "undefined",
    updateData: "true",
    type: "PIPATask"
}

/** notificationData is used for sending the request data to get the list of notifications to server*/
var notificationData = {
    page: "1",
    qtype: "_description",
    query: "",
    rp: "10",
    sortname: "undefined",
    sortorder: "undefined",
    type: "Notification",
    updateData: "true"
}
var filterArray = ["priorities","states","users","roles","projectName","deadline","sortname","sortorder","creationDate","page","processId","sharedTo","sharedTasks"];
/*this variable is used for formless task.*/
var formlessTask = {};
/*stores the list of actions available & enables based on the permission*/
var moreBtnList = {
    btnArr:["delete","skip","share","export","feed"]
};


var actionClickEvents = {
    "escalate":"javascript:escalateTask(false)",
    "claim":"javascript:claimORRevokeTask(\"CLAIMED\", \"claimed\")",
    "release":"javascript:claimORRevokeTask(\"READY\", \"released\")",
    "delete":"javascript:deleteTask(false, \"Delete\")",
    "skip":"javascript:skipTask(false, \"Skip\")",
    "reassign":"javascript:reassignTask(false, \"Reassign\")",
    "share":"javascript:shareTask(false);"
};

/**@Description     : display buttons in task notification & processes page**/
function getToolbarIconsCodes(btnName) {
    var iconButton;
    switch (btnName) {
        case "delete":
            iconButton = "<li id='deleteButton'><a class='noDecoration' onclick='javascript:deleteTask(false, \"Delete\");'><i class='fa fa-trash-o'></i><span>" + $('#deleteButton').text() + "</span></a></li>";
            return iconButton;
            break;
        case "claim":
            iconButton = "<button type='button' id='claimButton' onclick='javascript:claimORRevokeTask(\"CLAIMED\", \"claimed\")' class='btn btn-sm btn-white'><i class='fa fa-lock'></i><span class='no-mobile'>&nbsp;" + $('#claimButton').text() + "</span></button>&nbsp;"
            return iconButton;
            break;
        case "release":
            iconButton = "<button type='button' id='releaseButton' onclick='javascript:claimORRevokeTask(\"READY\", \"released\")' class='btn btn-sm btn-white'><i class='fa fa-check'></i><span class='no-mobile'>&nbsp;" + $('#releaseButton').text() + "</span></button>&nbsp;"
            return iconButton;
            break;
        case "reassign":
            iconButton = "<button type='button' id='reassignButton' onclick='javascript:reassignTask(false, \"Reassign\");' class='btn btn-sm btn-white'><i class='fa fa-share'></i><span class='no-mobile'>&nbsp;" + $('#reassignButton').text() + "</span></button>&nbsp;"
            return iconButton;
            break;
        case "update":
            iconButton = "";
            return iconButton;
            break;
        case "skip":
            iconButton = "<li id='skipButton'><a class='noDecoration' onclick='javascript:skipTask(false, \"Skip\");'><i class='fa fa-cut'></i><span>" + $('#skipButton').text() + "</span></a></li>";
            return iconButton;
            break;
        case "export":
            iconButton = "<li id='exportButton'><a class='noDecoration' onclick='exportTask();'><i class='fa fa-external-link'></i><span>" + $('#exportButton').text() + "</span></a></li>";
            return iconButton;
            break;
        case "viewAllTask":
            iconButton = '<a title="' + $('#refreshButton').text() + '" class="btn btn-sm btn-white table_refresh_icon" onclick="viewAllTasks();"><i class="fa fa-refresh"></i></a>';
            return $(iconButton);
            break;
        case "filter":
            iconButton = "<div class='btn-group'><button type='button' id='filterTasksButton' class='btn btn-sm btn-white dropdown-toggle ' data-toggle='dropdown' onclick='loadFilterJS()'><i class='fa fa-filter'></i>&nbsp;<span id='filter_tasks_name' class='no-mobile'>" + $('#taskFilterButton').text() + "</span>&nbsp;<span class='fa fa-caret-down fa-on-right'></span></button><ul class='dropdown-menu dropdown-info dropdown-caret' id='filterTasksDropdown'><li><a href='#' onclick=javascript:manageTaskFilter.openFilterModal()>" + $('#manageTasksFilters').text() + "</a></li><li class='divider'></li><li><a href='#' onclick=javascript:manageTaskFilter.showEscalatedTasks()>" + $('#escalatedTasks').text() + "</a></li><li><a href='#' onclick=javascript:manageTaskFilter.showSubordinateTasks()>" + $('#subordinatesTasks').text() + "</a></li><li><a href='#' onclick=javascript:manageTaskFilter.showExpiredTasks()>" + $('#expiredTasks').text() + "</a></li><li><a href='#' onclick=javascript:manageTaskFilter.showSharedTasks()>Shared Task(s)</a></li></ul>&nbsp;";
            return iconButton;
            break;
        case "moreButtons":
            iconButton = "<div class='btn-group'><button type='button' id='moreButtonsList' class='btn btn-sm btn-white dropdown-toggle ' data-toggle='dropdown'><i class='fa fa-list'></i>&nbsp;<span id='task_more_btn' class='no-mobile'>More</span>&nbsp;<span class='fa fa-caret-down fa-on-right'></span></button><ul class='dropdown-menu dropdown-info dropdown-caret' id='taskMoreBtnDropdown'></ul>&nbsp;";
            return iconButton;
            break;
        case "escalate":
            iconButton = "<button type='button' id='escalateButton' onclick='javascript:escalateTask(false);' class='btn btn-sm btn-white'><i class='fa fa-arrow-circle-up'></i><span class='no-mobile'>&nbsp;" + $('#escalateTasks').text() + "</span></button>&nbsp;"
            return iconButton;
            break;
        case "share":
            iconButton = "<li id='shareButton'><a class='noDecoration' onclick='javascript:shareTask(false);'><i class='fa fa-share-alt'></i><span>"+ $('#shareButton').text() +"</span></a></li>"
            return iconButton;
            break;    
        case "feed":
            iconButton = "<li id='feedButton'><a target='_blank' class='noDecoration'><i class='fa fa-rss'></i><span class='feed'></span></a></li>"
            return iconButton;
            break;
        case "columns":
            iconButton = "<a class='btn btn-sm btn-white' title='Hide Column(s)' id='columnsHide' onclick='javascript:showHideColumns(this)'><i class='fa fa-eye-slash'></i>&nbsp;</a>";
            return iconButton;
            break;
    }
}

function getToolbarProcesses(btnName){
    var iconButton;
    switch (btnName) {
        case "delete":
            iconButton = "<button type='button' onclick='javascript:deleteTask(false, \"Delete\");'class='btn btn-sm btn-white'><i class='fa fa-trash-o'></i><span class='no-mobile'>&nbsp;" + $('#deleteButton').text() + "</span></button>&nbsp;"
            return iconButton;
            break;
        case "reassign":
            iconButton = "<button type='button' id='reassignButton' onclick='javascript:reassignTask(false, \"Reassign\");' class='btn btn-sm btn-white'><i class='fa fa-share'></i><span class='no-mobile'>&nbsp;" + $('#reassignButton').text() + "</span></button>&nbsp;"
            return iconButton;
            break;
        case "feed":
            iconButton = "<a target='_blank' id='feedButton' class='btn btn-sm btn-white'><i class='fa fa-rss'></i> <span class='no-mobile feed'>&nbsp;</span></a>&nbsp;"
            return iconButton;
            break;
    }
}
/**@Description     : This function will call the server to get the list of tasks**/
function getTasksData(isTask) {
    addPageLoading("tasks");
    $('.page-content').find('#taskDetailInfo').remove();
    if (!processTasks)
        $('#breadcrumbName').addClass('hide');
    if (userCache != null && userCache != undefined && userCache.wTaskPageSize != null)
        taskData.rp = parseInt(userCache.wTaskPageSize);
    else
        taskData.rp = 10;
    if(isTask && taskData.searchKeyword){
        taskData.page = parseInt(1);
        delete taskData.searchKeyword;
    }
    sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", taskData, handleAjaxError, updateTasksData);
}

/**@Description     : This function will add processing in the UI**/
function addPageLoading(id) {
    if ($('#workflow_'+id+'_wrapper').is(':visible'))
        addLoading($('#workflow_'+id+'_wrapper'));
    else
        addLoading($('.page-content'))
}

/**@Description     : This function will call the server to get the list of processes**/
function getProcessesData(isProcess) {
    addPageLoading("processes");
    $('.page-content').find('#taskDetailInfo').remove();
    if (userCache != null && userCache != undefined && userCache.wProcessPageSize != null)
        processesData.rp = parseInt(userCache.wProcessPageSize);
    else
        processesData.rp = 10;
    if(isProcess && processesData.searchKeyword){
        processesData.page = parseInt(1);
        delete processesData.searchKeyword;
    }
    sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", processesData, handleAjaxError, updateProcessesData);
}

/**@Description     : This function will call the server to get the list of notifications**/
function getNotificationData(isNotification) {
    addPageLoading("notifications");
    $('.page-content').find('#taskDetailInfo').remove();
    if (userCache != null && userCache != undefined && userCache.wNotificationPageSize != null)
        notificationData.rp = parseInt(userCache.wNotificationPageSize);
    else
        notificationData.rp = 10;

    if(isNotification && notificationData.searchKeyword){
        notificationData.page = parseInt(1);
        delete notificationData.searchKeyword;
    }
    sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", notificationData, handleAjaxError, updateNotifData);
}

/**@Description     : This function will populate the custom columns if any in task page**/
function updateCustomColumnTasks(data) {
    participantToken = data.participantToken;
    currentUser = data.currentUser;
    useToolBarIcon = data.toolbarIcons;
    tmsService = data.tmsService;
    tmpService = data.tmpEndPoint;
    taskIconSet = [];
    if (!isObjectEmpty(data.taskIconSet)) {
        $.each(data.taskIconSet, function(key, value) {
            taskIconSet.push(value);
        });
    }
    $("#rowTaskHeader th:gt(10)").remove();
    taskOptions.aoColumns = taskOptions.aoColumns.slice(0, 11);
    if (data.newColumnList.length == 0)
        tableWidth = '100%'
    else {
        tableWidth = $(window).width() - 224;
        if (userCache != null && userCache != undefined && $("#userid").text() != "" && userCache.wTaskFilter != null)
			var taskFilter = userCache.wTaskFilter;
        if(data.newColumnList.length>0 && taskFilter.showCustomColumns==="true"){
			$.each(data.newColumnList, function(key, obj) {
				var sortName = obj + "_customMetadata";
				$("#rowTaskHeader").append("<th onclick=javascript:sortData('workflow_tasks',this,'" + sortName + "'); sort='desc'>" + obj + "<span class='pull-right hide'><i class='fa fa-sort-down blue'></i></span></th>");
				taskOptions.aoColumns[taskOptions.aoColumns.length] = {
					"bSortable": true,
					"sWidth": width * 0.20
				}
				tableWidth = tableWidth + 150;
			});
		}
    }
    loadTaskButtons(data);
}

/**@Description     : This function will populate the roles used for reassigning**/
function populateRoles(data) {
    $("#fetchedRolesCombo").empty();
    $("#fetchedRolesCombo").removeAttr("class");
    $("#fetchedRolesCombo_chzn").remove();
    if (data.role instanceof Array) {
        $.each(data.role, function(key, obj) {
            $("#fetchedRolesCombo").append("<option value='" + obj + "'>" + obj + "</option>");
        });
        $("#fetchedRolesCombo").append("<option value='*'>All</option>");
    } else {
        $("#fetchedRolesCombo").append("<option value='" + data.role + "'>" + data.role + "</option>");
        $("#fetchedRolesCombo").append("<option value='*'>All</option>");
    }
    $("#fetchedRolesCombo").chosen();
    $("#fetchedRolesCombo_chzn").css("width", 240);
    $('#fetchedRolesCombo_chzn li.search-field input').css('width', 200);
    removeLoading($('#reassignTaskModal .modal-body'));
}

/**@Description     : This function will populate the existing data task description & priority to update**/
function updateTask(obj, bol, executedActionName) {
    if (bol == false) {
        updateTaskData = $(obj).closest('tr').find('.task_name');
        var vall = $(obj).closest('tr').find('.taskPriority').attr('value');
        if (vall >= parseInt(51)) /* priority checkbox checked according to the task priority */
            $('#priority_form').find('input:eq(0)').prop('checked', 'checked');
        else if (parseInt(vall) >= parseInt(31) && parseInt(vall) <= parseInt(50))
            $('#priority_form').find('input:eq(1)').prop('checked', 'checked');
        else if (parseInt(vall) >= parseInt(11) && parseInt(vall) <= parseInt(30))
            $('#priority_form').find('input:eq(2)').prop('checked', 'checked');
        else if (parseInt(vall) <= parseInt(10))
            $('#priority_form').find('input:eq(3)').prop('checked', 'checked');
        $("#updateDescription").val("");
        $("#updateErrorMsg").text("");
        $("#updateDescription").val($(updateTaskData).text());
        $('#updateDescription').height('60');
        $('#updateDescription').width('420');
        modalShow('updateTaskModal');
    } else{
		if($("#updateDescription").val().trim()!=""){
            responseCount = 0;
			executeAction("update", $(updateTaskData).attr('tid'), "", 1, executedActionName);
			modalHide('updateTaskModal');
		}
		else
			$("#updateErrorMsg").text($("#updateDescMessage").text());
			return false;
	}
}

/**@Description     : This function will populate the roles used for reassigning a task**/
function reassignTask(bol, executedActionName) {
    userArray = new Array();
    $('#loading').css('margin-top', 70);
    var columnsData = getSelectedRows(tempWorkflowTable, false);
    if (columnsData.length <= 0)
        showSelectInformation();
    else if (bol == false && columnsData.length > 0) {
        getAssignTo();
        $('#reassignSpanTask').text('');
    } else if (bol && $("#reassignAssignTo").val() == null)
        reassignError();
    else if (columnsData.length > 0 && bol && $("#reassignAssignTo").val() != "") {
        $('#reassignSpanTask').text('');
        addPageLoading("tasks");
        responseCount = 0;
        $.each(columnsData, function(key, obj) {
            if ($(obj).attr('tid') != undefined && $(obj).attr('tid') != null)
                executeAction("reassign", $(obj).attr('tid'), "", columnsData.length, executedActionName);
        });
        modalHide("reassignTaskModal");
    }
}

/**@Description     : Just Calls Helper Function**/
function getAssignTo() {
    reassignShareTaskHelper("reassignAssignTo","reassignTaskModal");
}

/**@Description     : Just Calls Helper Function**/
function getShareTo() {
    reassignShareTaskHelper("shareTo","shareTaskModal");
}

/**@Description : This function will call server to get data for reassign i.e user & roles**/
function reassignShareTaskHelper (id,modalId) {
    modalShow(modalId);
    var data = {},
        assignToData = {};
    sendAjaxCall(intalio_bpms.task_filter.getAssignedToUsers, "GET", false, true, "json", data, handleAjaxError, function(data) {
        assignToData["peers"] = data.users.peers;
        assignToData["subordinates"] = data.users.subordinates;
        var roleData = {};
        sendAjaxCall(intalio_bpms.task_filter.getAssignedToRoles, "GET", false, true, "json", roleData, handleAjaxError, function(data) {
            assignToData["externalRoles"] = data.roles.external_roles;
            assignToData["internalRoles"] = data.roles.internal_roles;
            for (var k = 0; k < assignToData.subordinates.length; k++) {
                $.each(assignToData.peers, function(key,value){
                    if (value!=undefined && value.userID == assignToData.subordinates[k].userID)
                        assignToData.peers.splice(key, 1);
                });
            }
            populateReassignShareData(assignToData,id,modalId);
        });
    });
}

/**@Description     : This function will populate data for reassign in select box**/
function populateReassignShareData(data,id,modalId) {
    removeChosen(id);
    var users, roles, subOrdinatesGroup = "<optgroup label='Subordinate(s)'>",
        peersGroup = "<optgroup label='Peer(s)'>",
        internalRoles = "<optgroup label='Internal Role(s)'>",
        externalRoles = "<optgroup label='External Role(s)'>";
    $("#"+id).append("<option value='*~roles'>ALL</option>");
    $.each(data.peers, function(key, value) {
        peersGroup += ("<option value='" + value.userID + "~users'>" + value.userName + "</option>");
    });
    peersGroup += ("</optgroup>");
    $.each(data.subordinates, function(key, value) {
        subOrdinatesGroup += ("<option value='" + value.userID + "~users'>" + value.userName + "</option>");
    });
    subOrdinatesGroup += ("</optgroup>");
    $.each(data.internalRoles, function(key, value) {
        internalRoles += ("<option value='" + value + "~roles'>" + value + "</option>");
    });
    internalRoles += ("</optgroup>");
    $.each(data.externalRoles, function(key, value) {
        externalRoles += ("<option value='" + value + "~roles'>" + value + "</option>");
    });
    externalRoles += ("</optgroup>");
    $("#"+id).append(subOrdinatesGroup).append(peersGroup).append(internalRoles).append(externalRoles);
    $("#"+id).chosen();
    $("#"+id+"_chzn").css("width", 230);
    $('#'+id+'_chzn li.search-field input').css('width', 200);
    removeLoading();
}

/**@Description     : This function will populate the roles used for reassigning a task**/
function reassignProcess(bol, executedActionName) {
    userArray = new Array();
    $('#loading').css('margin-top', 70);
    var columnsData = getSelectedRows(tempWorkflowTable, false);
    if (columnsData.length <= 0)
        showSelectInformation();
    else if (bol == false && columnsData.length > 0) {
        getAssignTo();
        $('#reassignSpanTask').text('');
    } else if (bol && $("#reassignAssignTo").val() == null)
        reassignError();
    else if (columnsData.length > 0 && bol && $("#reassignAssignTo").val() != "") {
        addLoading($('#reassignTaskModal .modal-body'));
        $('#reassignSpanTask').text('');
        responseCount = 0;
        $.each(columnsData, function(key, obj) {
            if ($(obj).attr('tid') != undefined && $(obj).attr('tid') != null)
                executeAction("reassignProcess", $(obj).attr('tid'), "", columnsData.length, executedActionName);
        });
        modalHide("reassignTaskModal");
    }
}


/**@Description     : This function will delete a task based on selected checkbox**/
function deleteTask(bol, executedActionName) {
    var columnsData = getSelectedRows(tempWorkflowTable, false);
    if (columnsData.length <= 0 && currentTab == "tasks")
        showInformation($('#deleteMessageTask').text());
    else if (columnsData.length <= 0 && currentTab == "notifications")
        showInformation($('#notificationMsg').text());
    else if (columnsData.length <= 0)
        showInformation($('#processMsg').text());
    else if (bol == "false" || bol == false) {
        if (currentTab == "tasks")
            showTaskDelete(columnsData.length);
        else if (currentTab == "notifications")
            showNotificationDelete(columnsData.length);
        else if (currentTab == "processes")
            showProcessDelete(columnsData.length);
        modalShow("deleteTasks");
    } else if (bol) {
        if (currentTab == "tasks" && columnsData.length == taskTable.fnSettings().fnRecordsTotal() && taskData.page > 1 && $("#paginationText").val() == totalTaskPageSize)
            taskData.page = parseInt(taskData.page - parseInt(1));
        else if (currentTab == "notifications" && columnsData.length == notificationTable.fnSettings().fnRecordsTotal() && notificationData.page > 1 && $("#paginationText").val() == totalNotificationPageSize)
            notificationData.page = parseInt(notificationData.page - parseInt(1));
        else if (currentTab == "processes" && columnsData.length == processTable.fnSettings().fnRecordsTotal() && processesData.page > 1 && $("#paginationText").val() == totalProcessesPageSize)
            processesData.page = parseInt(processesData.page - parseInt(1));
        addPageLoading("tasks");
        responseCount = 0;
        $.each(columnsData, function(key, obj) {
            if ($(obj).attr('tid') != undefined && $(obj).attr('tid') != null)
                executeAction("delete", $(obj).attr('tid'), "", columnsData.length, executedActionName);
        });
    }
}

/**@Description     : This function will execute claim / revoke action**/
function claimORRevokeTask(action, executedActionName) {
    var count = 0,flag = false,keyCount = 0,trueLength = 0,columnsData = getSelectedRows(tempWorkflowTable, false);
    var claimCount = 0,releaseCount = 0,keyClaimed = 0,keyReleased = 0;
    if (columnsData.length <= 0)
        showSelectInformation();
    else {
        $.each(columnsData, function(key, obj) {
            if ($(obj).attr('state') == 'CLAIMED' || $(obj).attr('state') == 'ESCALATED')
                claimCount++;
            if ($(obj).attr('state') == 'READY' || $(obj).attr('state') == 'ESCALATED')
                releaseCount++;
            if ($(obj).attr('istaskowner') != "true")
                count = count + 1;
        });
        addPageLoading("tasks");
        responseCount = 0;
        $.each(columnsData, function(key, obj) {
            if ($(obj).attr('istaskowner') == "true") {
                if ($(obj).attr('state') == 'CLAIMED' || $(obj).attr('state') == 'ESCALATED')
                    keyClaimed++;
                else if ($(obj).attr('state') == 'READY' || $(obj).attr('state') == 'ESCALATED')
                    keyReleased++;
                if ($(obj).attr('tid') != undefined && $(obj).attr('tid') != null && action == "CLAIMED" && $(obj).attr('state') != 'CLAIMED')
                    executeAction("claim/revoke", $(obj).attr('tid'), $(obj).attr('state'), columnsData.length, executedActionName);
                else if ($(obj).attr('tid') != undefined && $(obj).attr('tid') != null && action == "READY" && $(obj).attr('state') != 'READY')
                    executeAction("claim/revoke", $(obj).attr('tid'), $(obj).attr('state'), columnsData.length, executedActionName);
            }
        });
        if (count != 0)
            claimError(count);
    }
}

/**@Description     : This function will execute skip task action**/
function skipTask(bol, executedActionName) {
    var count = 0,flag = false,keyCount = 0,trueLength = 0;
    var columnsData = getSelectedRows(tempWorkflowTable, false);
    if (columnsData.length <= 0)
        showSelectInformation();
    else {
        if (bol == "false" || bol == false) {
            showTaskSkip(columnsData.length);
            modalShow("skipTasks");
        } else if (bol) {
            $.each(columnsData, function(key, obj) {
                if ($(obj).attr('istaskowner') == "true")
                    trueLength++;
                else
                    count = count + 1;
            });
            addPageLoading("tasks");
            responseCount=0;
            $.each(columnsData, function(key, obj) {
                if ($(obj).attr('istaskowner') == "true") {
                    keyCount++;
                    if ($(obj).attr('tid') != undefined && $(obj).attr('tid') != null)
                        executeAction("skipTask", $(obj).attr('tid'), "", columnsData.length, executedActionName);
                }
            });
            if (count != 0)
                skipError(count);
        }
    }
}

/**@Description     : This function is used for exporting task(s)**/
function exportTask() {
    if (parseInt(taskTable.fnSettings().fnRecordsTotal()) > 0) {
       $('#exportTaskError').text('');
       $("#export_start_id").val('0');
       $("#export_count_id").val('100');
       modalShow('exportTaskModal')
    } else
        showInformation($("#exportMessageTask").text());
    
}
/**@Description     : This function is used for exporting task(s)**/
function exportSelectedTasks() {
    $('#exportTaskError').text('')
    var start = $('#export_start_id').val(),
        count = $('#export_count_id').val(),
        column = $('#export_column_select').val(),
        sort = $('#export_sort_select').val(),
        type = $('#export_type_select').val();
    if (!start || start == ''){
        $('#exportTaskError').text($('#export_start_msg').text());
        return false
    }
    if(start > parseInt(totalRecords-1)){
        $('#exportTaskError').text($("#exportStartMsg").text());
        return false;   
    }
    if (!count || count == ''){
        $('#exportTaskError').text($('#export_count_msg').text());
        return false
    }
    if(count==0){
        $('#exportTaskError').text($('#expNumTasCntMsg').text());
        return false;
    }
    if (!column || column == ''){
        $('#exportTaskError').text($('#export_column_msg').text());
        return false
    }
    if (!sort || sort == ''){
        $('#exportTaskError').text($('#export_sort_msg').text());
        return false
    }
    if (!type || type == ''){
        $('#exportTaskError').text($('#export_type_msg').text());
        return false
    }
    var export_url = 'ui-fw/'
    export_url += type +'?type=PATask'
    export_url += '&rp='+count
    export_url += '&firstResult='+start
    export_url += '&sortname='+column
    export_url += '&sortorder='+sort
    window.open(export_url, "_new");
    $('#exportTaskModal').modal('hide');
}

/**@Description   : This function is used for viewing all the task(s) of a logged in user**/
function viewAllTasks() {
    if (currentTab == "tasks") {
        addLoading($('#taskTableDiv'));
        if (userCache != null && userCache != undefined && userCache.wTaskPageSize != null)
            taskData.rp = parseInt(userCache.wTaskPageSize);
        else
            taskData.rp = 10;
        if (!processTasks){
			delete taskData.formURL;
			$('#taskName').text("");
			$('#breadcrumbName').addClass('hide');
		}

        if(taskData.searchKeyword){
            taskData.page = parseInt(1);
            delete taskData.searchKeyword;
        }
        sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", taskData, handleAjaxError, updateTasksData);
    } else if (currentTab == "notifications") {
        addLoading($('#notificationTableDiv'));
        if (userCache != null && userCache != undefined && userCache.wNotificationPageSize != null)
            notificationData.rp = parseInt(userCache.wNotificationPageSize);
        else
            notificationData.rp = 10;

        if(notificationData.searchKeyword){
            notificationData.page = parseInt(1);
            delete notificationData.searchKeyword;
        }
        sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", notificationData, handleAjaxError, updateNotifData);
    } else if (currentTab == "processes") {
        addLoading($('#processesTableDiv'));
        if (userCache != null && userCache != undefined && userCache.wProcessPageSize != null)
            processesData.rp = parseInt(userCache.wProcessPageSize);
        else
            processesData.rp = 10;

        if(processesData.searchKeyword){
            processesData.page = parseInt(1);
            delete processesData.searchKeyword;
        }
        sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", processesData, handleAjaxError, updateProcessesData);
    }
}

/**@Description     : This function is used for updating taskOptions based on custom columns.**/
function updateTasksData(data) {
    $("#taskTableDiv").removeClass("hide");
    $("#taskform").contents().find("body").html('');
    if (taskTable != undefined) {
        taskTable.fnClearTable();
        taskTable.fnDestroy();
    }
    $("#rowTaskHeader th:gt(10)").remove();
    taskOptions.aoColumns = taskOptions.aoColumns.slice(0, 11);
    if (data.newColumnList.length === 0)
        tableWidth = '100%';
    else {
        tableWidth = $(window).width() - 224;
        if (userCache != null && userCache != undefined && $("#userid").text() != "" && userCache.wTaskFilter != null)
			var taskFilter = userCache.wTaskFilter;
        if (data.newColumnList != undefined && taskFilter.showCustomColumns==="true" || taskFilter.showCustomColumns) {
            $.each(data.newColumnList, function(key, obj) {
                var sortName = obj + "_customMetadata";
                $("#rowTaskHeader").append("<th onclick=javascript:sortData('workflow_tasks',this,'" + sortName + "'); sort='desc'>" + obj + "<span class='pull-right hide'><i class='fa fa-sort-down blue'></i></span></th>");
                taskOptions.aoColumns[taskOptions.aoColumns.length] = {
                    "bSortable": true,
                    "sWidth": width * 0.20
                }
                tableWidth = tableWidth + 150;
            });
        }
    }
    loadTaskButtons(data);
}

/**@Description     : This function is used for validating is task owner / not**/
function isTaskOwnerCheck(data, obj) {
    var isTaskOwner = true;
    var showAnchorTag = true;
    if (data.isWorkflowAdmin == "true" && obj.task.roleOwners.toString().indexOf("*") == -1) {
        $.each(data.userRoles, function(key, value) {
            if ($.inArray(value, obj.task.roleOwners) >= 0)
                showAnchorTag = false;
        });
        if (showAnchorTag && $.inArray(currentUser, obj.task.userOwners) == -1)
            isTaskOwner = false;
    }
    return isTaskOwner;
}

/**@Description     : This function is used for validating is this task from others**/
function isOthersTask(userRoles, userOwners, roleOwners, isTaskAvailable) {
    var isOthers = 'false';
    var cuser = $('#userid').text();
    var isTaskAssignedToMyRoles = 'false';
    $.each(userRoles, function(key, value) {
        if ($.inArray(value, roleOwners) >= 0)
            isTaskAssignedToMyRoles = 'true';
    });
    if ($.inArray(cuser, userOwners) < 0 && isTaskAssignedToMyRoles == 'false' && $.inArray('*', roleOwners) < 0 && isTaskAvailable == 'true')
        isOthers = 'true';
    return isOthers;
}

/**@Description     : This function will populate the list of task(s)**/
function updateData(data, taskTable) {
   $("#taskTableDiv").removeClass('hide');
   var arr = [];
   if (data.participantToken) {
        $("#feedButton").find('span').text($("#taskFeedMsg").text());
        $("#feedButton a").attr("href",'atom/tasks?token=' + data.participantToken);
    }
    $('#releaseButton').removeAttr('disabled').find('a').attr('onclick', actionClickEvents["release"]);
    $('#claimButton').removeAttr('disabled').find('a').attr('onclick', actionClickEvents["claim"]);
    currentTab = "tasks";
    buttonsCount.claim = 0;
    buttonsCount.release = 0;
    totalRecords = data.totalRecords;
    var oSettings = taskTable.fnSettings();
    taskTable.fnClearTable();
    if(!taskData.searchKeyword){
        taskTable.fnFilter('');
    }
    formlessTask.isWorkflowAdmin = data.isWorkflowAdmin;
    formlessTask.isSuperAdmin=data.isSuperAdmin;
    var check = 1;var oSettings = taskTable.fnSettings();
    if (data.tasks && data.tasks.length > 0) {
        var items = [],html,isTaskOwner,tempHtml,priority,actionHtml,obj,dataObj,othersMessage = $('#othersTaskWorkflow').text(),noDescription = $("#noDescription").text(),claimText = $("#claimedTaskDesc").text(),readyText = $('#readyTaskDesc').text(),priNormal=$("#priorityNormal").text(),priImp = $("#priorityImportant").text(),editMsg=$("#editTaskMsg").text(),claimedNameObj,adhocMsg=$("#adhocTaskWorkflow").text();
        if(data.tasks[0].task.state.stateName=="FAILED")
            taskStateFlag = true;
        else
            taskStateFlag = false;
        for(var i=0;i<data.tasks.length;i++){
            items = [],html = "",tempHtml="",actionHtml="",sharedHtml="";
            obj = data.tasks[i];
            dataObj = obj.task;
            priority= dataObj.priority;
            state   = dataObj.state.stateName;
            if(dataObj.isTaskAvailable=='true' || dataObj.isTaskShared=='true')
                 isTaskOwner='true';
            else
                isTaskOwner='false';
           items[items.length] = "<label class='position-relative'><input type='checkbox' class='ace taskSelected' id='taskSelected' onclick='updateHeaderCheckbox(this);updateTaskButtons(this);'> <span class='lbl'></span></label>";
            if (dataObj.description) {
                if(state == "FAILED")
                    items[items.length] = "<span tid="+dataObj.iD+">"+dataObj.description + "</span><span class='pull-right othersTaskIcon' title='" + othersMessage + "'><img src='images/others_task.png' height='17'></img></span><span class='pull-right adhocTaskIcon' title='" + adhocMsg + "'><img src='images/adhoc_task.png' height='17' style='padding-right: 5px'></img></span>";
                else if (isTaskOwner == 'true')
                    items[items.length] = "<a class='task_name' instanceId='"+dataObj.instanceId+"' available='"+dataObj.isTaskAvailable+"' shared='"+dataObj.isTaskShared+"' taskURL="+obj.formManagerURL+" onclick=javascript:openTask(this,"+dataObj.isAllowAdhoc+","+dataObj.adhocIndex+") istaskowner=" + isTaskOwner + " description='" + dataObj.description + "' priority=" + dataObj.priority + " tid=" + dataObj.iD + " state=" + state + ">" + dataObj.description + "</a><span class='pull-right othersTaskIcon' title='" + othersMessage + "'><img src='images/others_task.png' height='17'></img></span><span class='pull-right adhocTaskIcon' title='" + adhocMsg + "'><img src='images/adhoc_task.png' style='padding-right: 5px' height='17'></img></span>";
                else
                    items[items.length] = "<a class='task_name' onclick=javascript:showAlert(); istaskowner=" + isTaskOwner + " description='" + dataObj.description + "' priority=" + dataObj.priority + " target='taskform' tid=" + dataObj.iD + " state=" + state + ">" + dataObj.description + "</a><span class='pull-right othersTaskIcon' title='" + othersMessage + "'><img src='images/others_task.png' height='17'></img></span><span class='pull-right adhocTaskIcon' title='" + adhocMsg + "'><img src='images/adhoc_task.png' height='17' style='padding-right: 5px'></img></span>";
            } else {
                if(state == "FAILED")
                    items[items.length] = "<span tid="+dataObj.iD+">"+noDescription + "</span><span class='pull-right othersTaskIcon' title='" + othersMessage + "'><img src='images/others_task.png' height='17'></img></span><span class='pull-right adhocTaskIcon' title='" + adhocMsg + "'><img src='images/adhoc_task.png' height='17' style='padding-right: 5px'></img></span>";
                else if (isTaskOwner == 'true')
                    items[items.length] = "<a class='task_name' instanceId='"+dataObj.instanceId+"' available='"+dataObj.isTaskAvailable+"' shared='"+dataObj.isTaskShared+"' taskURL="+obj.formManagerURL+" onclick=javascript:openTask(this,"+dataObj.isAllowAdhoc+","+dataObj.adhocIndex+") istaskowner=" + isTaskOwner + " description='' priority=" + dataObj.priority + " tid=" + dataObj.iD + " state=" + state + ">" + noDescription + "</a><span class='pull-right othersTaskIcon' title='" + othersMessage + "'><img src='images/others_task.png' height='17'></img></span><span class='pull-right adhocTaskIcon' title='" + adhocMsg + "'><img src='images/adhoc_task.png' height='17' style='padding-right: 5px'></img></span>";
                else
                    items[items.length] = "<a class='task_name' onclick=javascript:showAlert(); istaskowner=" + isTaskOwner + " description='" + dataObj.description + "' priority=" + dataObj.priority + " target='taskform' tid=" + dataObj.iD + " state=" + state + ">" + noDescription + "</a><span class='pull-right othersTaskIcon' title='" + othersMessage + "'><img src='images/others_task.png' height='17'></img></span><span class='pull-right adhocTaskIcon' title='" + adhocMsg + "'><img src='images/adhoc_task.png' height='17' style='padding-right: 5px'></img></span>";
            }
            if (state == "CLAIMED") {
                claimedNameObj = $.grep(data.users, function(e){return e.userID.toLowerCase() == dataObj.userOwners[0].toLowerCase()});
                items[items.length] = '<span class="action-buttons"><a class="text-warning ace-popup cursorDefault title="" data-placement="bottom" data-content="' + claimText +' '+ claimedNameObj[0].userName+ '." data-trigger="hover"><i class="fa-zoom-in fa fa-lock bigger-140 orange"></i></a></span>';
            } else if (state == "READY")
                items[items.length] = '<span class="action-buttons"><a class="text-success ace-popup cursorDefault" title="" data-placement="bottom" data-content="' + readyText + '" data-trigger="hover"><i class="fa-zoom-in fa fa-check-circle bigger-125 green" ></i></a></span>';
            else if(state == "FAILED")
                items[items.length] = '<span class="action-buttons"><a class="ace-popup cursorDefault" title="" data-placement="bottom" data-content="' + $('#taskExpiredMsg').text() + '" data-trigger="hover"><i class="fa-zoom-in fa fa-circle bigger-125 red"></i></a></span>';
            else 
                items[items.length] = '<span class="action-buttons"><a class="ace-popup cursorDefault" title="" data-placement="bottom" data-content="' + $('#escalatedTaskDesc').text() + '" data-trigger="hover"><i class="fa-zoom-in fa fa-arrow-circle-up bigger-125 blue"></i></a></span>';
            if (dataObj.creationDate)
                items[items.length] = $.format.date(dataObj.creationDate, userPreferences.dateFormat+userPreferences.hourFormat);
            else
                items[items.length] = " ";
            if (dataObj.deadline){
                if (((data.isSuperAdmin=="true" || data.isWorkflowAdmin=="true") && state != "FAILED") || ($.inArray('updateDueDate', taskIconSet) >= 0 && state != "FAILED" && (dataObj.isTaskAvailable=="true" || dataObj.isTaskShared=="false")))
                    items[items.length] = "<a href='#' class='noDecoration task_due_date' taskId='"+dataObj.iD+"' onclick='javascript:openDueDateModal(this)'>"+$.format.date(dataObj.deadline, userPreferences.dateFormat+userPreferences.hourFormat)+"</a>";
                else
                    items[items.length] = $.format.date(dataObj.deadline, userPreferences.dateFormat+userPreferences.hourFormat)
            }
            else
                items[items.length] = "";
            if (priority) {
                if (parseInt(priority) >= parseInt(51))
                    items[items.length] = "<i class='fa fa-circle bigger-125 red redOpacity cursorDefault taskPriority ace-popup' value='" + priority + "' title='' data-placement='bottom' data-content='" + $("#priorityCritical").text() + "' data-trigger='hover'></i>";
                else if (parseInt(priority) >= parseInt(31) && parseInt(priority) <= parseInt(50))
                    items[items.length] = "<i class='fa fa-circle bigger-125 orange orangeOpacity cursorDefault taskPriority ace-popup' value='" + priority + "' title='' data-placement='bottom' data-content='" + priImp + "' data-trigger='hover'></i>";
                else if (parseInt(priority) >= parseInt(11) && parseInt(priority) <= parseInt(30))
                    items[items.length] = "<i class='fa fa-circle bigger-125 green greenOpacity cursorDefault taskPriority ace-popup' value='" + priority + "' title='' data-placement='bottom' data-content='" + priNormal + "' data-trigger='hover'></i>";
                else if (parseInt(priority) <= parseInt(10))
                    items[items.length] = "<i class='fa fa-circle bigger-125 blue blueOpacity cursorDefault taskPriority ace-popup' value='" + priority + "' title='' data-placement='bottom' data-content='" + $("#priorityLow").text() + "' data-trigger='hover'></span>";
            } else
                items[items.length] = "<i class='fa fa-circle bigger-125 green taskPriority' value='15' title='' data-placement='bottom' data-content='" + priNormal + "'></i>";
            if (priority)
                items[items.length] = parseInt(priority);
            else
                items[items.length] = parseInt(15);
            if (dataObj.userOwners != null || dataObj.roleOwners != null) {
                if (dataObj.userOwners && dataObj.userOwners.length > 0) {
                    var nameObj = [];
                    for(var j=0;j<dataObj.userOwners.length;j++){
                        nameObj = [];
                        if(data.users!=undefined && data.users.length>=0)
                            nameObj = $.grep(data.users, function(e){return e.userID.toLowerCase() == dataObj.userOwners[j].toLowerCase()});
                        if (dataObj.userOwners[j] != "string"){
                            tempHtml += '<span class="nowrap"><a class="task_user" user="'+dataObj.userOwners[j]+'" onclick=javascript:showUserProfile(this)>';
                            nameObj.length==1 ? tempHtml+='<i class="fa fa-user" title="'+nameObj[0].userID+'"></i> '+nameObj[0].userName+'</a></span>' : tempHtml += '<i class="fa fa-user" title="User"></i> ' + dataObj.userOwners[j] + '</a></span>';
                            tempHtml += '<span class="wrap-line"> </span>';
                        }
                    };
                }
                if (dataObj.roleOwners != null && dataObj.roleOwners.length > 0) {
                    $.each(dataObj.roleOwners, function(key, value) {
                        value = value.replace('*', 'All');
                        tempHtml += '<span class="nowrap"><i class="fa fa-group" title="Role"></i> ' + value + ' </span><span class="wrap-line"> </span>';
                    });
                }
                items[items.length] = tempHtml;
            } else
                items[items.length] = '';
            if (dataObj.sharedUsers.length > 0 || dataObj.sharedRoles.length > 0) {
                if (dataObj.sharedUsers.length > 0) {
                    var nameObj = [];
                    for(var j=0;j<dataObj.sharedUsers.length;j++){
                        nameObj = [];
                        if(data.users!=undefined && data.users.length>=0)
                            nameObj = $.grep(data.users, function(e){return e.userID.toLowerCase() == dataObj.sharedUsers[j].toLowerCase()});
                        if (dataObj.sharedUsers[j] != "string"){
                            sharedHtml += '<span class="nowrap"><a class="task_user" user="'+dataObj.sharedUsers[j]+'" onclick=javascript:showUserProfile(this)>';
                            nameObj.length==1 ? sharedHtml+='<i class="fa fa-user" title="'+nameObj[0].userID+'"></i> '+nameObj[0].userName+'</a></span>' : sharedHtml += '<i class="fa fa-user" title="User"></i> ' + dataObj.sharedUsers[j] + '</a></span>';
                            sharedHtml += '<span class="wrap-line"> </span>';
                        }
                    };
                }
                if (dataObj.sharedRoles.length > 0) {
                    $.each(dataObj.sharedRoles, function(key, value) {
                        value = value.replace('*', 'All');
                        sharedHtml += '<span class="nowrap"><i class="fa fa-group" title="Role"></i> ' + value + ' </span><span class="wrap-line"> </span>';
                    });
                }
                items[items.length] = sharedHtml;
            } else
                items[items.length] = '';
            if(dataObj.hasAttachment=="true")
                actionHtml = "<span class='action-buttons attachmentsExist'>";
            else
                actionHtml = "<span class='action-buttons'>";
            if (!isObjectEmpty(dataObj.state)) {
                if (((data.isSuperAdmin=="true" || data.isWorkflowAdmin=="true") && state != "FAILED") || ($.inArray('update', taskIconSet) >= 0 && state != "FAILED" && (dataObj.isTaskAvailable=="true" || dataObj.isTaskShared=="false")))
                    actionHtml += "<a class='text-purple iconCursor'><i class='fa-zoom-in fa fa-edit bigger-120' title='"+editMsg+"' onclick='updateTask(this,false);return false;'></i></a></span>";            
                else
                    actionHtml += "<i class='fa-zoom-in fa fa-edit bigger-120' title='"+editMsg+"' return false;'></i></span>";
                if(dataObj.hasAttachment=="true"){
                    actionHtml += "<div id='attachments_div' class='btn-group'><a taskId='"+dataObj.iD+"' class='dropdown-toggle iconCursor' data-toggle='dropdown' onclick='loadAttachments(this);'><i class='fa-zoom-in fa fa-paperclip fa-only bigger-120'></i></a><ul id='attachments_list' class='dropdown-menu dropdown-yellow dropdown-caret dropdown-closer dropdown-menu-right positionFixed'>";
                    actionHtml += '</ul></div>'
                    items[items.length] = actionHtml;
                }else
                    items[items.length] = actionHtml;
            } else
                items[items.length] = " ";
            items[items.length] = isOthersTask(data.userRoles, dataObj.userOwners, dataObj.roleOwners, dataObj.isTaskAvailable);
	    items[items.length] =dataObj.isAdhoc;
            if (data.newColumnList != undefined) {
                $.each(data.newColumnList, function(columnKey, columnObj) {
                    if (dataObj.customMetadata[columnObj] != null && dataObj.customMetadata[columnObj] != undefined)
                        items[items.length] = dataObj.customMetadata[columnObj];
                    else
                        items[items.length] = "";
                });
            }
            arr.push(items);
        }
        taskTable.fnAddData(arr,true);
        $('#workflow_tasks').find('thead tr th').removeClass("sorting_asc").removeClass("sorting");
        tempWorkflowTable = taskTable;
        var pagination = Math.ceil(totalRecords / taskData.rp);
        totalTaskPageSize = pagination;
        $("#workflow_tasks_pagination").remove();
        $(".paginationRows").remove();
        updateEntriesHtml();
        if (taskData.page == parseInt(1)) {
            startNumber = taskData.page
            if (parseInt(data.tasks.length) != parseInt(taskData.rp))
                endNumber = parseInt(data.tasks.length);
            else
                endNumber = parseInt(taskData.rp);
        } else {
            var page = parseInt(parseInt(taskData.page) - parseInt(1));
            startNumber = parseInt(page * parseInt(taskData.rp) + 1);
            endNumber = parseInt(page * parseInt(taskData.rp) + data.tasks.length);
        }
        var task_Wrapperobj = $("#workflow_tasks_wrapper");
        task_Wrapperobj.find(".table_pagination").append("<div id='workflow_tasks_pagination' class='dataTables_paginate paging_bootstrap'></div>");
        task_Wrapperobj.find("#workflow_tasks_pagination").append("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getFirstPageTasksData();></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getPrevPageData();></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'> "+$("#datatablePage").text()+" &nbsp; <input id='paginationText' onkeydown=javscript:getWorkflowPageNoData(event); type='text' role='textbox' value=" + taskData.page + " maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; "+$("#datatableOf").text()+" &nbsp;<span id='sp_1_grid-pager'>" + pagination + "</span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPageData();></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastPageTasksData();></span></td></tr></tbody></table>");
        showEntires("workflow_tasks_wrapper", startNumber, endNumber);
        updatePagination(taskData.page, pagination);
        $("select#noOfRows").val(taskData.rp);
        applyNiceScroll(task_Wrapperobj.find(".table_container"), 210);
    } else {
        $('.dataTables_empty').html($("#dtNoRecordsFound").text().replace('{0}',$("#taskMsg").text()));
        taskStateFlag = false;
        $("#rowTaskHeader").find("th:gt(10)").remove();
        $("#workflow_tasks_wrapper").find(".table_pagination").remove();
    }
    handleTaskButtons();
    $('#workflow_tasks').find('th input:first').prop('checked', false);
    removeLoading();
    $('.ace-popup').popover();
}

/**@Description     : This function will get the task list of mentioned page no**/
function getWorkflowPageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#paginationText").val() != "" && parseInt($("#paginationText").val()) != 0 && parseInt($("#paginationText").val()) <= Math.ceil(totalRecords / taskData.rp)) {
        if (currentTab == "tasks") {
            taskData.page = parseInt($("#paginationText").val());
            getTasksData();
        } else if (currentTab == "processes") {
            processesData.page = parseInt($("#paginationText").val());
            getProcessesData();
        } else if (currentTab == "notifications") {
            notificationData.page = parseInt($("#paginationText").val());
            getNotificationData();
        }
    } else if ($("#paginationText").val() != "" && (parseInt($("#paginationText").val()) === 0 || parseInt($("#paginationText").val()) > Math.ceil(totalRecords / taskData.rp)) && event.keyCode == parseInt(13)) {
        if (currentTab == "tasks") {
            taskData.page = parseInt(1);
            getTasksData();
        } else if (currentTab == "processes") {
            processesData.page = parseInt(1);
            getProcessesData();
        } else if (currentTab == "notifications") {
            notificationData.page = parseInt(1);
            getNotificationData();
        }
    } else if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105))
            event.preventDefault();
    }
}

/**@Description     : This function is used to update pagination for every task list call**/
function updatePagination(pageNo, totalPages) {
    if (pageNo == 1) {
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
    return false;
}

/**@Description     : This function is used to get the next page data**/
function getNextPageData() {
    if (currentTab == "tasks") {
        if ($('#paginationText').val() == "")
            taskData.page = parseInt(1);
        else if ($('#paginationText').val() < totalTaskPageSize)
            taskData.page = parseInt(parseInt($("#paginationText").val()) + parseInt(1));
        else
            taskData.page = parseInt(totalTaskPageSize);
        getTasksData();
    } else if (currentTab == "processes") {
        if ($('#paginationText').val() == "")
            processesData.page = parseInt(1);
        else if ($('#paginationText').val() < totalProcessesPageSize)
            processesData.page = parseInt(parseInt($("#paginationText").val()) + parseInt(1));
        else
            processesData.page = parseInt(totalProcessesPageSize);
        getProcessesData();
    } else if (currentTab == "notifications") {
        if ($('#paginationText').val() == "")
            notificationData.page = parseInt(1);
        else if ($('#paginationText').val() < totalNotificationPageSize)
            notificationData.page = parseInt(parseInt($("#paginationText").val()) + parseInt(1));
        else
            notificationData.page = parseInt(totalNotificationPageSize);
        getNotificationData();
    }
}

/**@Description     : This function is used to get the last page data**/
function getLastPageTasksData() {
    if (currentTab == "tasks") {
        taskData.page = Math.ceil(totalRecords / taskData.rp);
        getTasksData();
    } else if (currentTab == "processes") {
        processesData.page = Math.ceil(totalRecords / processesData.rp);
        getProcessesData();
    } else if (currentTab == "notifications") {
        notificationData.page = Math.ceil(totalRecords / notificationData.rp);
        getNotificationData();
    }
}

/**@Description     : This function is used to get the first page data**/
function getFirstPageTasksData() {
    if (currentTab == "tasks") {
        taskData.page = parseInt(1);
        getTasksData();
    } else if (currentTab == "processes") {
        processesData.page = parseInt(1);
        getProcessesData();
    } else if (currentTab == "notifications") {
        notificationData.page = parseInt(1);
        getNotificationData();
    }
}

/**@Description     : This function is used to get the previous page data**/
function getPrevPageData() {
    if (currentTab == "tasks") {
        if ($('#paginationText').val() > 1)
            taskData.page = parseInt(parseInt($("#paginationText").val()) - parseInt(1));
        else
            taskData.page = parseInt(1);
        getTasksData();
    } else if (currentTab == "processes") {
        if ($('#paginationText').val() > 1)
            processesData.page = parseInt(parseInt($("#paginationText").val()) - parseInt(1));
        else
            processesData.page = parseInt(1);
        getProcessesData();
    } else if (currentTab == "notifications") {
        if ($('#paginationText').val() > 1)
            notificationData.page = parseInt(parseInt($("#paginationText").val()) - parseInt(1));
        else
            notificationData.page = parseInt(1);
        getNotificationData();
    }
}

/**@Description     : This function is used to update the taskOptions rp request attribute for fetching no of records per page**/
function updateRP() {
    if (currentTab == "tasks") {
        if (userCache != null && userCache != undefined && $("#userid").text() != "") {
            userCache.wTaskPageSize = parseInt($('#noOfRows').val());
            $.jStorage.set($("#userid").text(), userCache);
        }
        taskData.rp = $("#noOfRows").val();
        taskData.page = parseInt(1);
        getTasksData();
    } else if (currentTab == "notifications") {
        if (userCache != null && userCache != undefined && $("#userid").text() != "") {
            userCache.wNotificationPageSize = $('#noOfRows').val();
            $.jStorage.set($("#userid").text(), userCache);
        }
        notificationData.rp = $("#noOfRows").val();
        notificationData.page = parseInt(1);
        getNotificationData();
    } else if (currentTab == "processes") {
        if (userCache != null && userCache != undefined && $("#userid").text() != "") {
            userCache.wProcessPageSize = $('#noOfRows').val();
            $.jStorage.set($("#userid").text(), userCache);
        }
        processesData.rp = $("#noOfRows").val();
        processesData.page = parseInt(1);
        getProcessesData();
    }
}

/**@Description     : call the server for sorting the data on any column**/
function sortData(tableName, obj, name) {
    $('#' + tableName + ' th span').addClass('hide');
    $('#' + tableName + ' th span.lbl').removeClass('hide');
    $(obj).find('span').removeClass('hide');
    var sortOrder;
    if ($(obj).attr('sort') == 'desc') {
        $(obj).find('span i').removeAttr('class').addClass('fa fa-sort-up blue');
        $(obj).attr('sort', 'asc');
        sortOrder = 'asc';
    } else {
        $(obj).find('span i').removeAttr('class').addClass('fa fa-sort-down blue');
        $(obj).attr('sort', 'desc');
        sortOrder = 'desc';
    }
    if (currentTab == 'tasks') {
        taskData.sortname = name;
        taskData.sortorder = sortOrder;
        getSortedTasksData();
    } else if (currentTab == 'notifications') {
        notificationData.sortname = name;
        notificationData.sortorder = sortOrder;
        getNotificationData();
    } else if (currentTab == 'processes') {
        processesData.sortname = name;
        processesData.sortorder = sortOrder;
        getProcessesData();
    }
}

/**@Description     : This function will call the server to get the list of tasks sorted**/
function getSortedTasksData() {
    addPageLoading("tasks");
    if (userCache != null && userCache != undefined && userCache.wTaskPageSize != null)
        taskData.rp = parseInt(userCache.wTaskPageSize);
    else
        taskData.rp = 10;
    sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", taskData, handleAjaxError, function(response) {
        updateData(response, taskTable);
    });
}

/**@Description     : This function will call server based on actions**/
function executeAction(actionName, taskid, state, reqLength, executedActionName,reload) {
    var soapBody,metaElement,taskId,sr,reload;
    if(reload==undefined)
        reload=true;
    if(actionName == "updateDueDate"){
        soapBody = new SOAPObject(actionName);
        soapBody.ns = defaultsWorkflow.tmsNameSpace;
        soapBody.appendChild(new SOAPObject("taskId")).val(taskid);
        soapBody.appendChild(new SOAPObject("dueDate")).val(state);
        soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
    }
    else if (actionName == "update") {
        soapBody = new SOAPObject(actionName);
        soapBody.ns = defaultsWorkflow.tmsNameSpace;
        metaElement = soapBody.appendChild(new SOAPObject("taskMetadata"));
        metaElement.appendChild(new SOAPObject("taskId")).val(taskid);
        metaElement.appendChild(new SOAPObject("description")).val($('#updateDescription').val());
        metaElement.appendChild(new SOAPObject("priority")).val($('input[name=form-field-radio]:checked', '#priority_form').val());
        soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
    } else if (actionName == "reassign") {
        soapBody = new SOAPObject(actionName);
        soapBody.ns = defaultsWorkflow.tmsNameSpace;
        soapBody.appendChild(new SOAPObject("taskId")).val(taskid);
        var assignTo = $("#reassignAssignTo").val(),roles = [],users = [];
        for (var k = 0; k < assignTo.length; k++) {
            var splitData = assignTo[k].split('~');
            if (splitData[1].indexOf('roles') >= 0)
                roles[roles.length] = splitData[0];
            else
                users[users.length] = splitData[0];
        }
        soapBody.appendChild(new SOAPObject("userOwner")).val(users);
        soapBody.appendChild(new SOAPObject("roleOwner")).val(roles);
        soapBody.appendChild(new SOAPObject("taskState")).val('READY');
        soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
        soapBody.appendChild(new SOAPObject("userAction")).val('REASSIGN');
    }else if (actionName == "share") {
        soapBody = new SOAPObject(actionName);
        soapBody.ns = defaultsWorkflow.tmsNameSpace;
        soapBody.appendChild(new SOAPObject("taskId")).val(taskid);
        var assignTo = $("#shareTo").val(),roles = [],users = [];
        for (var k = 0; k < assignTo.length; k++) {
            var splitData = assignTo[k].split('~');
            if (splitData[1].indexOf('roles') >= 0)
                roles[roles.length] = splitData[0];
            else
                users[users.length] = splitData[0];
        }
        soapBody.appendChild(new SOAPObject("sharedUser")).val(users);
        soapBody.appendChild(new SOAPObject("sharedRole")).val(roles);
        soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
    } else if (actionName == "reassignProcess") {
        soapBody = new SOAPObject(actionName);
        soapBody.ns = defaultsWorkflow.tmsNameSpace;
        soapBody.appendChild(new SOAPObject("taskId")).val(taskid);
        var assignTo = $("#reassignAssignTo").val(),roles = [],users = [];
        for (var k = 0; k < assignTo.length; k++) {
            var splitData = assignTo[k].split('~');
            if (splitData[1].indexOf('roles') >= 0)
                roles[roles.length] = splitData[0];
            else
                users[users.length] = splitData[0];
        }
        soapBody.appendChild(new SOAPObject("userOwner")).val(users);
        soapBody.appendChild(new SOAPObject("roleOwner")).val(roles);
        soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
    } else if (actionName == "delete") {
        soapBody = new SOAPObject(actionName);
        soapBody.ns = defaultsWorkflow.tmsNameSpace;
        soapBody.appendChild(new SOAPObject("taskId")).val(taskid);
        soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
    } else if (actionName == "claim/revoke") {
        soapBody = new SOAPObject("reassign");
        soapBody.ns = defaultsWorkflow.tmsNameSpace;
        soapBody.appendChild(new SOAPObject("taskId")).val(taskid);
        soapBody.appendChild(new SOAPObject("userOwner")).val(currentUser);
        if (state == "READY" || state == "ESCALATED")
            soapBody.appendChild(new SOAPObject("taskState")).val('CLAIMED');
        else
            soapBody.appendChild(new SOAPObject("taskState")).val('READY');
        soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
        if (state == "READY" || state == "ESCALATED")
            soapBody.appendChild(new SOAPObject("userAction")).val('CLAIMED');
        else
            soapBody.appendChild(new SOAPObject("userAction")).val('REVOKE');
    } else if (actionName == "skipTask") {
        var soapBody = new SOAPObject(actionName + "Request");
        soapBody.ns = defaultsWorkflow.tmpNameSpace;
        soapBody.appendChild(new SOAPObject("taskId")).val(taskid);
        soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
    } else if (actionName == "escalate") {
        soapBody = new SOAPObject(actionName);
        soapBody.ns = defaultsWorkflow.tmsNameSpace;
        soapBody.appendChild(new SOAPObject("taskId")).val(taskid);
        soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
    }
    if (actionName == "claim/revoke")
        sr = new SOAPRequest(defaultsWorkflow.tmsNameSpace + "/reassign", soapBody);
    else
        sr = new SOAPRequest(defaultsWorkflow.tmsNameSpace + "/" + actionName, soapBody);
    var soapHeader = new SOAPObject("soapenv:IntalioToken").val(participantToken);
    sr.addHeader(soapHeader);
    SOAPClient.Proxy = proxy;
    if (actionName == "skipTask")
        SOAPClient.SOAPServer = tmpService;
    else
        SOAPClient.SOAPServer = tmsService;
    SOAPClient.SendRequest(sr, function(response) {
        responseCount  = responseCount+parseInt(1);
        var resonseXML = $.parseXML(response.responseText);
        errorString = $.trim($(resonseXML).find('faultstring').text());
        if (errorString == "") {
            if (currentTab == "tasks" && parseInt(reqLength)===parseInt(responseCount)) {
                if(reload)
                    getTasksData();
                var message = $('#task_action_msg').text();
                showNotification(message.replace("{0}",executedActionName));
            } else if (currentTab == "notifications") {
                getNotificationData();
                var message = $('#notifcation_action_msg').text();
                showNotification(message.replace("{0}",executedActionName));
            } else if (currentTab == "processes") {
                getProcessesData();
                var message = $('#processes_action_msg').text();
                showNotification(message.replace("{0}",executedActionName));
            }
        } else if (errorString != "" && (actionName == "claim/revoke" || actionName == "updateDueDate")) {
            getTasksData();
            showErrorNotification(errorString);
        } else if (errorString != "") {
            removeLoading();
            showErrorNotification($("#commonErrorMsg").text());
        }
    });
}

/**@Description     : This function will create an Adhoc Task by passing SOAP request **/
function createAdhocTask(){
// console.log(formlessTask.taskId);
$('#adhocSpanTask').text("");
if($.trim($('#adhocTaskDesc').val()) == ''){
$('#adhocSpanTask').text($('#adhocDescError').text());
return false;
}
if($.trim($('#adhocAssignTo').val()) == ''){
$('#adhocSpanTask').text($('#adhocAssignToError').text());
return false;
}
if($.trim($('#taskPlacement').val()) == ''){
$('#adhocSpanTask').text($('#adhocPlacementError').text());
return false;
}
if($.trim($('#adhocTaskNote').val()) == ''){
$('#adhocSpanTask').text($('#adhocNoteError').text());
return false;
}

soapBody = new SOAPObject("createTaskRequest");
var assignTo = $("#adhocAssignTo").val(),roles = [],users = [];
for (var k = 0; k < assignTo.length; k++) {
    var splitData = assignTo[k].split('~');
    if (splitData[1].indexOf('roles') >= 0)
        roles[roles.length] = splitData[0];
    else
        users[users.length] = splitData[0];
}
var formTypeString;
if(($("#useCurrentForm").val()) == "true"){
formTypeString = "CURRENTFORM";
}else{
formTypeString = "FORMLESS";
}

soapBody.ns = defaultsWorkflow.tmpNameSpace;
metaElement = soapBody.appendChild(new SOAPObject("taskMetaData"));
metaElement.appendChild(new SOAPObject("description")).val($('#adhocTaskDesc').val());
metaElement.appendChild(new SOAPObject("instanceId")).val(formlessTask.instanceId);
metaElement.appendChild(new SOAPObject("userOwner")).val(users);
metaElement.appendChild(new SOAPObject("roleOwner")).val(roles);
metaElement.appendChild(new SOAPObject("formUrl")).val("");
metaElement.appendChild(new SOAPObject("isAdhocTask")).val("true");
metaElement.appendChild(new SOAPObject("allowAdhocTask")).val("true");
metaElement.appendChild(new SOAPObject("adhocIndex")).val("0");
metaElement.appendChild(new SOAPObject("associatedTaskID")).val(formlessTask.taskId);
metaElement.appendChild(new SOAPObject("adhocformType")).val(formTypeString);
metaElement.appendChild(new SOAPObject("adhocPlacement")).val($("#taskPlacement").val());
metaElement.appendChild(new SOAPObject("adhocNote")).val($('#adhocTaskNote').val());
soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
metaElement = soapBody.appendChild(new SOAPObject("taskInput"));
metaElement.appendChild(new SOAPObject("FormModel"));

sr = new SOAPRequest(defaultsWorkflow.tmpNameSpace + "/createTask", soapBody);
SOAPClient.Proxy = proxy;
if(tmpService.endsWith("ode/processes/completeTask")){
SOAPClient.SOAPServer = tmpService.substring(0,tmpService.indexOf("/completeTask"))+"/workflow/ib4p";
}
SOAPClient.SendRequest(sr, function(response) {
var resonseXML = $.parseXML(response.responseText);
errorString = $.trim($(resonseXML).find('faultstring').text());
if (errorString == "") {
    showNotification($('#adhocCreateSuccessNoti').text());
    $('#createAdhocTaskModal').modal('hide');
    $('#showAdhocTasksButton').removeClass('hide');
    var genTaskid = $.trim($(resonseXML).find('taskId').text());
    var data = {
		comment:$('#adhocTaskNote').val(),
		createdBy:$('#userid').text(),
		refCommentTypeId:3,
		threadId:genTaskid
    }
    sendAjaxCall(intalio_bpms.task_metadata.addComments, "POST", false, true, "json", data, handleAjaxError, function(response) { });
}else{
    showErrorNotification($('#adhocCreateErrorNoti').text());
}

});
}

/**@Description     : This function will open the forms in Iframe**/
function loadIFrame(id, div) {
    var htmlContent = $("#" + id).contents().find("body").html();
    var hei = $(window).height()-150;
    if (htmlContent.length > 0) {
        if ($("#" + div).hasClass("hide") == false) {
            $("#" + div).addClass("hide");
            $('.page-content').find('#taskDetailInfo').removeClass('hide');
            $('#' + id).animate({height: hei}, speed);
        } else if (htmlContent.indexOf('Kindly close the window') >= 0 || htmlContent.indexOf('The process successfully started') >= 0 || htmlContent.indexOf('Task completed') >= 0 || htmlContent.indexOf('Dismissed') >= 0) {
            $("#" + div).removeClass("hide");
            $("#" + id).addClass('hide');
            $("#" + id).contents().find("body").html('');
            $('.page-content').find('#taskDetailInfo').remove();
            if (currentTab == "tasks") {
                addLoading($('#taskTableDiv'));
                if (userCache != null && userCache != undefined && userCache.wTaskPageSize != null)
                    taskData.rp = parseInt(userCache.wTaskPageSize);
                else
                    taskData.rp = 10;
                sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", taskData, handleAjaxError, updateTasksData);
            } else if (currentTab == "notifications") {
                addLoading($('#notificationTableDiv'));
                if (userCache != null && userCache != undefined && userCache.wNotificationPageSize != null)
                    notificationData.rp = parseInt(userCache.wNotificationPageSize);
                else
                    notificationData.rp = 10;
                sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", notificationData, handleAjaxError, updateNotifData);
            } else if (currentTab == "processes") {
                addLoading($('#processesTableDiv'));
                if (userCache != null && userCache != undefined && userCache.wProcessPageSize != null)
                    processesData.rp = parseInt(userCache.wProcessPageSize);
                else
                    processesData.rp = 10;
                sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", processesData, handleAjaxError, updateProcessesData);
            }
        }
    }
}

/**@Description     : This function will update the processes table buttons**/
function updateProcesses(data) {
    participantToken = data.participantToken;
    currentUser = data.currentUser;
    processIconSet = [];
    if (!isObjectEmpty(data.processIconSet)) {
        $.each(data.processIconSet, function(key, value) {
            processIconSet[key] = value;
        });
        processIconSet[processIconSet.length] = "feed"; 
    }
    useToolBarIcon = data.toolbarIcons;
    tmsService = data.tmsService;
    tmpService = data.tmpEndPoint;
    processTable = $('#workflow_processes').dataTable(processesOptions);
    $('#workflow_processes_wrapper').find('.dataTables_empty').html("Fetching processes(s)...");
    $('#workflow_processes_length').remove();
    $('#taskActionsDropdown').empty();
    var processesButtons = data.isSuperAdmin=="true" ? iconsSet_Process_SA : processIconSet;
    if (data.isSuperAdmin || useToolBarIcon == "true") {
        for (var i = 0; i < processesButtons.length; i++) {
            if (processesButtons[i]) {
                var processButton = getToolbarProcesses(processesButtons[i]);
                $('#workflow_processes_wrapper .row .col-sm-6:first').append(processButton);
            }
        }
    }else{
        $('#workflow_processes_wrapper .row .col-sm-6:first').empty();
    }
    tableWidth = '100%';
    customTable('workflow_processes');
    $('#workflow_processes_filter').find('input').bind('keyup', function(e) {
       var code = e.keyCode || e.which; 
       if (code  == 13 && $.trim(this.value)!=""){
           e.preventDefault();
           searchTasks(this.value);
           return false;
       }else if($.trim(this.value)==""){
            e.preventDefault();
            viewAllTasks();
            return false;
       }
    });
    $('#workflow_processes_filter').find('input').attr('onkeyup', 'javascript:updateShowEntries()');
    updateProcessesData(data);
}

function searchTasks(search){
    search = search.replace(/\\/g, "\\\\\\");
    if (currentTab == "tasks") {
        addLoading($('#taskTableDiv'));
        if (!processTasks){
            delete taskData.formURL;
            $('#taskName').text("");
            $('#breadcrumbName').addClass('hide');
        }
        taskData.page = parseInt(1);
        taskData.searchKeyword = search;
        sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", taskData, handleAjaxError, updateTasksData);
    } else if (currentTab == "notifications") {
        addLoading($('#notificationTableDiv'));
        notificationData.searchKeyword = search;
        notificationData.page = parseInt(1);
        sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", notificationData, handleAjaxError, updateNotifData);
    } else if (currentTab == "processes") {
        addLoading($('#processesTableDiv'));
        processesData.searchKeyword = search;
        processesData.page = parseInt(1);
        sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", processesData, handleAjaxError, updateProcessesData);
    }
}

/**@Description     : This function will update the processes data table list**/
function updateProcessesData(data) {
    if ($("#processesTableDiv").hasClass("hide")) {
        $("#processesTableDiv").removeClass("hide");
        $("#processesform").contents().find("body").html('');
    }
    if(data.participantToken){
        $("#feedButton").find('span').text($("#procFeedMsg").text());
        $("#feedButton").attr("href",'atom/processes?token=' + data.participantToken);
    }
    totalRecords = data.totalRecords;
    currentTab = "processes";
    var oSettings = processTable.fnSettings();
    processTable.fnClearTable();
    if(!processesData.searchKeyword){
        processTable.fnFilter('');
    }
    if (data.tasks != undefined && data.tasks.length > 0) {
        $.each(data.tasks, function(key, obj) {
            var items = [];
            items[items.length] = "<label class='position-relative'><input type='checkbox' class='ace taskSelected' id='taskSelected' onclick='updateHeaderCheckbox(this)';> <span class='lbl'></span></label>";
            var isTaskOwner = obj.task.isTaskAvailable;
            var isAttachmentType = obj.task.isAttachmentType;
            var action = "taskURL=" + obj.formManagerURL;
            if (isTaskOwner != 'true') {
                action = "onclick='javascript:showAlert();return false;'";
            }
            if (obj.task.description != "" && obj.task.description != null)
                items[items.length] = "<a class='task_name' " + action + " onclick=javascript:openTask(this) istaskowner='" + isTaskOwner + "' isAttachmentType='"+isAttachmentType+"' description=" + obj.task.description + " target='processesform' tid=" + obj.task.iD + ">" + obj.task.description + "</a><span class='pull-right othersTaskIcon' title='" + $('#othersTaskWorkflow').text() + "'><img src='images/others_task.png' height='17'></img></span>";
            else
                items[items.length] = "<a class='task_name' " + action + " onclick=javascript:openTask(this) istaskowner='" + isTaskOwner + "' isAttachmentType='"+isAttachmentType+"' description='' target='processesform' tid=" + obj.task.iD + ">" + $("#noDescription").text() + "</a><span class='pull-right othersTaskIcon' title='" + $('#othersTaskWorkflow').text() + "'><img src='images/others_task.png' height='17'></img></span>";
            if (obj.task.creationDate != "" && obj.task.creationDate != null)
                items[items.length] = $.format.date(obj.task.creationDate, userPreferences.dateFormat+userPreferences.hourFormat);
            else
                items[items.length] = " ";
            var tempHtml = '';
            if (obj.task.userOwners != null || obj.task.roleOwners != null) {
                if (obj.task.userOwners != null && obj.task.userOwners.length > 0) {
                    $.each(obj.task.userOwners, function(key, value) {
                        var nameObj = [];
                        if(data.users!=undefined && data.users.length>=0)
                            nameObj = $.grep(data.users, function(e){return e.userID.toLowerCase() == value.toLowerCase()});
                        if (value != "string"){
                            tempHtml += '&nbsp;<span class="nowrap"><a class="task_user" user="'+value+'" onclick=javascript:showUserProfile(this)>';
                            nameObj.length==1 ? tempHtml+='<i class="fa fa-user" title="'+nameObj[0].userID+'"></i> '+nameObj[0].userName+'</a></span>' : tempHtml += '<i class="fa fa-user" title="User"></i> ' + value + ' </a></span>';
                            tempHtml += '<span class="wrap-line"> </span>';
                        }
                    });
                }
                if (obj.task.roleOwners != null && obj.task.roleOwners.length > 0) {
                    $.each(obj.task.roleOwners, function(key, value) {
                        value = value.replace('*', 'All');
                        tempHtml += '&nbsp;<span class="nowrap" title="role"><i class="fa fa-group"></i> ' + value + ' </span><span class="wrap-line"> </span>';
                    });
                }
                items[items.length] = tempHtml;
            } else
                items[items.length] = '';

            items[items.length] = '<span class="action-buttons"><a class="text-purple iconCursor" onclick="setFormURL(\'' + obj.task._formURL + '\',\'' + obj.task.description + '\');" title="'+$("#viewProcessTaskTitle").text()+'"><i class="fa fa-search"></i></a></span>';
            items[items.length] = isOthersTask(data.userRoles, obj.task.userOwners, obj.task.roleOwners, obj.task.isTaskAvailable);
            processTable.fnAddData(items, false);
        });
        processTable.fnDraw(true);
        $('#workflow_processes thead tr th').removeClass("sorting_asc").removeClass("sorting");
        processTable.fnAdjustColumnSizing();
        tempWorkflowTable = processTable;
        if(!processesData.searchKeyword){
            processTable.fnFilter('');
        }
        var pagination = Math.ceil(totalRecords / processesData.rp);
        totalProcessesPageSize = pagination;
        $("#workflow_processes_pagination").remove();
        $(".paginationRows").remove();
        updateEntriesHtml();
        if (processesData.page == parseInt(1)) {
            startNumber = processesData.page
            if (parseInt(data.tasks.length) != parseInt(processesData.rp))
                endNumber = parseInt(data.tasks.length);
            else
                endNumber = parseInt(processesData.rp);
        } else {
            var page = parseInt(parseInt(processesData.page) - parseInt(1));
            startNumber = parseInt(page * parseInt(processesData.rp) + 1);
            endNumber = parseInt(page * parseInt(processesData.rp) + data.tasks.length);
        }
        $("#workflow_processes_wrapper .table_pagination").append("<div id='workflow_processes_pagination' class='dataTables_paginate paging_bootstrap'></div>");
        $("#workflow_processes_wrapper #workflow_processes_pagination").append("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getFirstPageTasksData();></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getPrevPageData();></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'>"+$("#datatablePage").text()+" &nbsp; <input id='paginationText' type='text' role='textbox' value=" + processesData.page + " onkeydown=javascript:getWorkflowPageNoData(event); maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; "+$("#datatableOf").text()+" &nbsp;<span id='sp_1_grid-pager'>" + pagination + "</span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPageData();></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastPageTasksData();></span></td></tr></tbody></table>");
        showEntires("workflow_processes_wrapper", startNumber, endNumber);
        updatePagination(processesData.page, pagination);
        $("select#noOfRows").val(processesData.rp);
        applyNiceScroll($("#workflow_processes_wrapper").find(".table_container"), 210);
    } else {
        $('.dataTables_empty').html($("#dtNoRecordsFound").text().replace('{0}',$("#processesMsg").text()));
        $("#workflow_processes_wrapper .table_pagination").remove();
    }
    $('#workflow_processes thead tr th').removeClass("sorting");
    $('table thead th input:checkbox').prop('checked', '');
    $('#workflow_processes tr th input:first').prop('checked', false);
    removeLoading($('#processesTableDiv'));
}

/**@Description     : This function will update the notifications data table buttons**/
function populateNotificationsData(data) {
    participantToken = data.participantToken;
    if (!isObjectEmpty(data.notificationIconSet)) {
        $.each(data.notificationIconSet, function(key, value) {
            notiIconSet[key] = value;
        });
    }
    useToolBarIcon = data.toolbarIcons;
    tmsService = data.tmsService;
    tmpService = data.tmpEndPoint;
    notificationTable = $('#workflow_notifications').dataTable(notificationOptions);
    $('#workflow_notifications_wrapper').find('.dataTables_empty').html("Fetching notification(s)...");
    $('#workflow_notifications_length').remove();
    $('#taskActionsDropdown').empty();
    var notificationButtons = data.isSuperAdmin=="true" ? iconsSet_Notifications_SA : notiIconSet;
    if (data.isSuperAdmin || useToolBarIcon == "true") {
        for (var i = 0; i < notificationButtons.length; i++) {
            if (notificationButtons[i]) {
                var notifButton = getToolbarProcesses(notificationButtons[i]);
                    $('#workflow_notifications_wrapper .row .col-sm-6:first').append(notifButton);
            }
        }
    }else{
        $('#workflow_notifications_wrapper .row .col-sm-6:first').empty();
    }
    tableWidth = '100%';
    customTable('workflow_notifications');
    $('#workflow_notifications_filter').find('input').attr('onkeyup', 'javascript:updateShowEntries()');
    $('#workflow_notifications_filter').find('input').bind('keyup', function(e) {
       var code = e.keyCode || e.which; 
       if (code  == 13 && $.trim(this.value)!=""){
           e.preventDefault();
           searchTasks(this.value);
           return false;
       }else if($.trim(this.value)==""){
            e.preventDefault();
            viewAllTasks();
            return false;
       }
    });
    /*
    if(notificationData.searchKeyword)
        delete notificationData.searchKeyword;*/
    updateNotifData(data);
}

/**@Description     : This function will update the notifications data table list**/
function updateNotifData(data) {
    if ($("#notificationTableDiv").hasClass("hide")) {
        $("#notificationTableDiv").removeClass("hide");
        $("#notificationform").contents().find("body").html('');
    }
    totalRecords = data.totalRecords;
    currentTab = "notifications";
    notificationTable.fnClearTable();
    if(!notificationData.searchKeyword){
        notificationTable.fnFilter('');
    }
    if (data.tasks != undefined && data.tasks.length > 0) {
        $.each(data.tasks, function(key, obj) {
            var items = [];
            items[items.length] = "<label class='position-relative'><input type='checkbox' class='ace taskSelected' id='taskSelected' onclick='updateHeaderCheckbox(this)';> <span class='lbl'></span></label>";
            var isTaskOwner = obj.task.isTaskAvailable;
            var action = "taskURL=" + obj.formManagerURL;
            if (isTaskOwner != 'true') {
                action = "onclick='javascript:showAlert();return false;'";
            }
            if (obj.task.description != "" && obj.task.description != null)
                items[items.length] = "<a class='task_name' " + action + " instanceId='"+obj.task.instanceId+"' onclick=javascript:openTask(this) istaskowner='" + isTaskOwner + "' description='" + obj.task.description + "' priority=" + obj.task.priority + " tid=" + obj.task.iD + " state=" + obj.task.state.stateName + ">" + obj.task.description + "</a><span class='pull-right othersTaskIcon' title='" + $('#othersTaskWorkflow').text() + "'><img src='images/others_task.png' height='17'></img></span>";
            else
                items[items.length] = "<a class='task_name' " + action + " instanceId='"+obj.task.instanceId+"' onclick=javascript:openTask(this) istaskowner='" + isTaskOwner + "' description='' priority=" + obj.task.priority + " tid=" + obj.task.iD + " state=" + obj.task.state.stateName + ">" + $("#noDescription").text() + "</a><span class='pull-right othersTaskIcon' title='" + $('#othersTaskWorkflow').text() + "'><img src='images/others_task.png' height='17'></img></span>";
            if (obj.task.creationDate != "" && obj.task.creationDate != null)
                items[items.length] = $.format.date(obj.task.creationDate, userPreferences.dateFormat+userPreferences.hourFormat);
            else
                items[items.length] = " ";
            if (obj.task.priority != "" && obj.task.priority != null) {
                if (parseInt(obj.task.priority) >= parseInt(51))
                    items[items.length] = "<i class='fa fa-circle bigger-125 red redOpacity cursorDefault priority ace-popup' value='" + obj.task.priority + "' title='' data-placement='bottom' data-content='" + $("#priorityCritical").text() + "' data-trigger='hover'></i>";
                else if (parseInt(obj.task.priority) >= parseInt(31) && parseInt(obj.task.priority) <= parseInt(50))
                    items[items.length] = "<i class='fa fa-circle bigger-125 orange orangeOpacity cursorDefault priority ace-popup' value='" + obj.task.priority + "' title='' data-placement='bottom' data-content='" + $("#priorityImportant").text() + "' data-trigger='hover'></i>";
                else if (parseInt(obj.task.priority) >= parseInt(11) && parseInt(obj.task.priority) <= parseInt(30))
                    items[items.length] = "<i class='fa fa-circle bigger-125 green greenOpacity cursorDefault priority ace-popup' value='" + obj.task.priority + "' title='' data-placement='bottom' data-content='" + $("#priorityNormal").text() + "' data-trigger='hover'></i>";
                else if (parseInt(obj.task.priority) <= parseInt(10))
                    items[items.length] = "<i class='fa fa-circle bigger-125 blue blueOpacity cursorDefault priority ace-popup' value='" + obj.task.priority + "' title='' data-placement='bottom' data-content='" + $("#priorityLow").text() + "' data-trigger='hover'></span>";
            } else
                items[items.length] = "<i class='fa fa-circle bigger-125 green priority' value='15' title='' data-placement='bottom' data-content='" + $("#priorityNormal").text() + "'></i>";
            if (obj.task.priority != "" && obj.task.priority != null)
                items[items.length] = parseInt(obj.task.priority);
            else
                items[items.length] = parseInt(15);
            var tempHtml = '';
            if (obj.task.userOwners != null || obj.task.roleOwners != null) {
                if (obj.task.userOwners != null && obj.task.userOwners.length > 0) {
                    $.each(obj.task.userOwners, function(key, value) {
                        var nameObj = [];
                        if(data.users!=undefined && data.users.length>=0)
                            nameObj = $.grep(data.users, function(e){return e.userID.toLowerCase() == value.toLowerCase()});
                        if (value != "string"){
                            tempHtml += '&nbsp;<span class="nowrap"><a class="task_user" user="'+value+'" onclick=javascript:showUserProfile(this)>';
                            nameObj.length==1 ? tempHtml+='<i class="fa fa-user" title="'+nameObj[0].userID+'"></i> '+nameObj[0].userName+'</a></span>' : tempHtml += '<i class="fa fa-user" title="User"></i> ' + value + ' </a></span>';
                            tempHtml += '<span class="wrap-line"> </span>';
                        }
                    })
                }
                if (obj.task.roleOwners != null && obj.task.roleOwners.length > 0) {
                    $.each(obj.task.roleOwners, function(key, value) {
                        value = value.replace('*', 'All');
                        tempHtml += '&nbsp;<span class="nowrap" title="role"><i class="fa fa-group"></i> ' + value + ' </span><span class="wrap-line"> </span>';
                    });
                }
                items[items.length] = tempHtml;
            } else
                items[items.length] = '';

            items[items.length] = isOthersTask(data.userRoles, obj.task.userOwners, obj.task.roleOwners, obj.task.isTaskAvailable);
            notificationTable.fnAddData(items, false);
        });
        notificationTable.fnDraw(true);
        $('#workflow_notifications thead tr th').removeClass("sorting_asc").removeClass("sorting");
        $('.ace-popup').popover();
        notificationTable.fnAdjustColumnSizing();
        tempWorkflowTable = notificationTable;
        if(!notificationData.searchKeyword){
            notificationTable.fnFilter('');
        }
        var pagination = Math.ceil(totalRecords / notificationData.rp);
        totalNotificationPageSize = pagination;
        $("#workflow_notifications_pagination").remove();
        $(".paginationRows").remove();
        updateEntriesHtml();
        if (notificationData.page == parseInt(1)) {
            startNumber = notificationData.page
            if (parseInt(data.tasks.length) != parseInt(notificationData.rp))
                endNumber = parseInt(data.tasks.length);
            else
                endNumber = parseInt(notificationData.rp);
        } else {
            var page = parseInt(parseInt(notificationData.page) - parseInt(1));
            startNumber = parseInt(page * parseInt(notificationData.rp) + 1);
            endNumber = parseInt(page * parseInt(notificationData.rp) + data.tasks.length);
        }
        $("#workflow_notifications_wrapper .table_pagination").append("<div id='workflow_notifications_pagination' class='dataTables_paginate paging_bootstrap'></div>");
        $("#workflow_notifications_wrapper #workflow_notifications_pagination").append("<table cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getFirstPageTasksData();></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getPrevPageData();></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'>"+$("#datatablePage").text()+" &nbsp;<input id='paginationText' type='text' role='textbox' onkeydown=javascript:getWorkflowPageNoData(event); value=" + notificationData.page + " maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; "+$("#datatableOf").text()+" &nbsp;<span id='sp_1_grid-pager'>" + pagination + "</span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPageData();></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastPageTasksData();></span></td></tr></tbody></table>");
        showEntires("workflow_notifications_wrapper", startNumber, endNumber);
        updatePagination(notificationData.page, pagination);
        $("select#noOfRows").val(notificationData.rp);
        applyNiceScroll($("#workflow_notifications_wrapper").find(".table_container"), 210);
    } else {
        $('.dataTables_empty').html($("#dtNoRecordsFound").text().replace('{0}',$("#notifyMsg").text()));
        $("#workflow_notifications_wrapper .table_pagination").remove();
    }
    $('#workflow_notifications tr th input:first').prop('checked', false);
    $('#workflow_notifications thead tr th').removeClass("sorting");
    removeLoading($('#notificationTableDiv'));
}

/**@Description     : This function will delete the notifications selected**/
function executeActionNotif(columnValues, actionName, successCallBack) {
    $.each(columnValues, function(key, obj) {
        var soapBody = null;
        var sr;
        if ($(obj).attr('tid') != undefined && $(obj).attr('tid') != null && actionName == "delete") {
            soapBody = new SOAPObject(actionName);
            soapBody.ns = defaultsWorkflow.tmsNameSpace;
            soapBody.appendChild(new SOAPObject("taskId")).val($(obj).attr('tid'));
            soapBody.appendChild(new SOAPObject("participantToken")).val(participantToken);
        }
        if (soapBody != null) {
            sr = new SOAPRequest(defaultsWorkflow.tmsNameSpace + "/" + actionName, soapBody);
            SOAPClient.Proxy = proxy;
            SOAPClient.SOAPServer = tmsService;
            SOAPClient.SendRequest(sr, successCallBack);
        }
    });
}

/**@Description     : This function sets the form url for filter a process task(s)**/
function setFormURL(url, name) {
    var k = url.indexOf("/gi/apppath/");
    if (k >= 0) {
        var length = "/gi/apppath/".length;
        length = k + length;
        url = url.substring(length, length + url.substring(length).indexOf("/"));
    } else {
        url = url.substring(url.indexOf(":") + 1, url.length);
        url = url.substring(0, url.indexOf(".xform"));
        var values = url.split("/");
        var temp = "";
        for (var i = 0; i < values.length; i++) {
            if (values[i] != "") {
                temp = temp + values[i];
                break;
            }
        }
        url = temp;
    }
    formURL = name;
    processTasks = true;
    taskData.formURL = url;
    taskData.taskType = "PATask";
    $('#moduleID3 a').trigger('click');
    $('#processes').removeClass('active');
    $('#tasks').addClass('active');
}

function showEntires(tableID, startNumber, endNumber) {
    $("#" + tableID + " .showEntries").remove();
    if (parseInt(endNumber) > parseInt(0)) {
        $("#" + tableID + " .table_pagination").removeClass('hide');
        if (tableID == 'workflow_tasks_wrapper'){
            var message = $("#datatablePageInfo").text().replace('{0}',startNumber).replace('{1}',endNumber).replace('{2}',totalRecords).replace('{3}',$("#taskMsg").text());
            $("#" + tableID + " .table_pagination").append("<div class='showEntries'><label>"+message+"</label></div>");
        }
        else if (tableID == 'workflow_notifications_wrapper'){
            var message = $("#datatablePageInfo").text().replace('{0}',startNumber).replace('{1}',endNumber).replace('{2}',totalRecords).replace('{3}',$("#notifyMsg").text());
            $("#" + tableID + " .table_pagination").append("<div class='showEntries'><label>"+message+"</label></div>");
        }
        else if (tableID == 'workflow_processes_wrapper'){
            var message = $("#datatablePageInfo").text().replace('{0}',startNumber).replace('{1}',endNumber).replace('{2}',totalRecords).replace('{3}',$("#processesMsg").text());
            $("#" + tableID + " .table_pagination").append("<div class='showEntries'>"+message+"</label></div>");
        }
    } else
        $("#" + tableID + " .table_pagination").addClass('hide');
}

function updateShowEntries() {
    if (currentTab == 'tasks')
        showEntires("workflow_tasks_wrapper", startNumber, taskTable.fnSettings().fnRecordsDisplay());
    else if (currentTab == 'notifications')
        showEntires("workflow_notifications_wrapper", startNumber, notificationTable.fnSettings().fnRecordsDisplay());
    else
        showEntires("workflow_processes_wrapper", startNumber, processTable.fnSettings().fnRecordsDisplay());
}

/**@Description     : This function handles the all the ajax error(s)**/
function handleAjaxError(exception) {
    showInformation(exception.responseText);
    removeLoading('', true);
    return false;
}

function updateTaskButtons(checkboxObj) {
    var row = $(checkboxObj).closest('tr');
    var rowText = $(row).find('span a').attr('data-content');
    var isTaskAvailable = $(row).find('td:nth-child(2) a').attr('available');
    if ($(checkboxObj).prop('checked')) {
        if (rowText != undefined && rowText.split(":")[0].indexOf('CLAIMED') >= 0) {
            buttonsCount.claim = parseInt(buttonsCount.claim + 1);
            $('#claimButton').addClass('disabled').find('a').removeAttr('onclick');
        } else if (rowText != undefined && rowText.split(":")[0].indexOf('READY') >= 0 || rowText.split(":")[0].indexOf('Escalated')>=0) {
            buttonsCount.release = parseInt(buttonsCount.release + 1);
            $('#releaseButton').addClass('disabled').find('a').removeAttr('onclick');
        }
        if(isTaskAvailable=="false" && formlessTask.isSuperAdmin=="false" && formlessTask.isWorkflowAdmin=="false"){
            taskStateFlag=true;
            handleTaskButtons();
        }
    } else {
        if (rowText && rowText.split(":")[0].indexOf('CLAIMED') >= 0) {
            buttonsCount.claim = parseInt(buttonsCount.claim - 1);
            if (buttonsCount.claim == 0)
                $('#claimButton').removeClass('disabled').find('a').attr("onclick",actionClickEvents["claim"]);
        } else if (rowText && rowText.split(":")[0].indexOf('READY') >= 0 || rowText.split(":")[0].indexOf('Escalated')>=0) {
            buttonsCount.release = parseInt(buttonsCount.release - 1);
            if (buttonsCount.release == 0)
                $('#releaseButton').removeClass('disabled').find('a').attr("onclick",actionClickEvents["release"]);
        }
        if(isTaskAvailable=="false" && formlessTask.isSuperAdmin=="false" && formlessTask.isWorkflowAdmin=="false"){
            taskStateFlag=false;
            handleTaskButtons();
        }
    }
}

function updateTaskHeaderButtons(obj) {
    if ($(obj).prop('checked')) {
        buttonsCount.claim = 0;
        buttonsCount.release = 0;
        selectAllWorkflow(obj);
    } else
        unSelectAllWorkflow(obj);
}

/**@Description     : This function will unselect all the checkboxes**/
function unSelectAllWorkflow(obj) {
    $(obj).closest('table').find('tr > td:first-child input:checkbox')
        .each(function() {
            var rowText = $($(this).closest('tr')).find('span a').attr('data-content');
            var isTaskAvailable = $($(this).closest('tr')).find('td:nth-child(2) a').attr('available');
            this.checked = obj.checked;
            $(this).closest('tr').removeClass('row_selected');
            if (rowText != undefined && rowText.split(":")[0].indexOf('CLAIMED') >= 0) {
                buttonsCount.claim = parseInt(buttonsCount.claim - 1);
                if (buttonsCount.claim == 0)
                    $('#claimButton').removeClass('disabled').find('a').attr("onclick",actionClickEvents["claim"]);
            } else if (rowText != undefined && rowText.split(":")[0].indexOf('READY') >= 0 || rowText.split(":")[0].indexOf('Escalated')>=0) {
                buttonsCount.release = parseInt(buttonsCount.release - 1);
                if (buttonsCount.release == 0)
                    $('#releaseButton').removeClass('disabled').find('a').attr("onclick",actionClickEvents["release"]);
            }
            if(isTaskAvailable=="false" && formlessTask.isSuperAdmin=="false" && formlessTask.isWorkflowAdmin=="false"){
                taskStateFlag=false;
                handleTaskButtons();
            }
        });
}

/**@Description     : This function will select all the checkboxes**/
function selectAllWorkflow(obj) {
    $(obj).closest('table').find('tr > td:first-child input:checkbox')
        .each(function() {
            var rowText = $($(this).closest('tr')).find('span a').attr('data-content');
            var isTaskAvailable = $($(this).closest('tr')).find('td:nth-child(2) a').attr('available');
            this.checked = obj.checked;
            $(this).closest('tr').addClass('row_selected');
            if (rowText != undefined && rowText.split(":")[0].indexOf('CLAIMED') >= 0) {
                buttonsCount.claim = parseInt(buttonsCount.claim + 1);
                $('#claimButton').addClass('disabled').find('a').removeAttr('onclick');
            } else if (rowText != undefined && rowText.split(":")[0].indexOf('READY') >= 0 || rowText.split(":")[0].indexOf('Escalated')>=0) {
                buttonsCount.release = parseInt(buttonsCount.release + 1);
                $('#releaseButton').addClass('disabled').find('a').removeAttr('onclick');
            }
            if(isTaskAvailable=="false" && formlessTask.isSuperAdmin=="false" && formlessTask.isWorkflowAdmin=="false"){
                taskStateFlag=true;
                handleTaskButtons();
            }
        });
}

/**@Description     : This function will show the legend when hovering on (i) icon in status header**/
function displayStatusLegend(obj) {
    var pos = $(obj).offset();
    var posLeft = pos.left + ($(obj).width()) / 2 - 50;
    $('#statusIconsList').removeClass('hide');
    $('#statusIconsList').css('left', posLeft).css('top', (pos.top + 16)).css('right', 'auto');
}

function hideWorkflowLegend(id) {
    $('#' + id).addClass('hide');
}

/**@Description     : This function will show the legend when hovering on (i) icon in priority header**/
function displayPriorityLegend(obj) {
    var pos = $(obj).offset();
    var posLeft = pos.left + ($(obj).width()) / 2 - 50;
    $('#priorityIconsList').removeClass('hide');
    $('#priorityIconsList').css('left', posLeft).css('top', (pos.top + 16)).css('right', 'auto');
}

/**@Description     : This function will remove the breadcrump if any**/
function removeBreadCrumbName() {
    if (currentTab == "tasks") {
        addLoading($('#taskTableDiv'));
        processTasks = false;
        delete taskData.formURL;
        if (userCache != null && userCache != undefined && userCache.wTaskPageSize != null)
            taskData.rp = parseInt(userCache.wTaskPageSize);
        else
            taskData.rp = 10;
        taskData.page = parseInt(1);
        sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json", taskData, handleAjaxError, updateTasksData);
        $('#breadcrumbName').addClass('hide');
        removeLoading($('#taskTableDiv'));
    }
}

/**@Description     : This function will handle all reassign errors**/
function reassignError() {
    $('#reassignSpanTask').text($("#reassignError").text());
    $('#fetchedRolesCombo_chzn .default').focus();
    removeLoading();
    return false;
}

/**@Description     : This function will handle all share errors**/
function shareToError() {
    $('#shareSpanTask').text($('#shareToMsg').text());
    $('#fetchedRolesCombo_chzn .default').focus();
    removeLoading();
    return false;
}

/**@Description : This function will handle all skip errors**/
function skipError(count) {
    var errorMessage = $("#skipError").text();
    showInformation(errorMessage.replace("{0}", count));
    removeLoading();
    return false;
}

/**@Description: This function will handle all claim errors**/
function claimError(count) {
    var errorMessage = $("#claimError").text();
    showInformation(errorMessage.replace("{0}", count));
    removeLoading();
    return false;
}

/**@Description  : This function will handle all escalation errors**/
function escalateError(count) {
    var errorMessage = $("#escalateError").text();
    showInformation(errorMessage.replace("{0}", count));
    removeLoading();
    return false;
}

function showAlert() {
    showInformation($("#taskRetrieveError").text());
    return false;
}

/**@Description: This function will validate atleast one record is selected/not.**/
function showSelectInformation() {
    showInformation($("#workflowInformationMsg").text());
    return false;
}


function showTaskDelete(length) {
    $("#deleteTasks .modal_heading").text($("#deleteTaskTitle").text());
    var message = $("#deleteTaskConfirmation").text();
    $("#deleteTasks .modal-body p").text(message.replace("{0}", length));
    $("#deleteTasks .modal-footer btn-danger").attr("onclick", "javascript:deleteTask(true, 'Delete')");
}

function showTaskSkip(length) {
    $("#skipTasks .modal_heading").text($("#skipTaskTitle").text());
    var message = $("#skipTaskConfirmation").text();
    $("#skipTasks .modal-body p").text(message.replace("{0}", length));
}

/**@Description     : This function will load filter js if not loaded already.**/
function loadFilterJS() {
    if (typeof manageTaskFilter == "undefined")
        loadJs("scripts/custom/workflow/taskFilter.js", function() {
            manageTaskFilter.fetchTasksFilters();
        });
    else
        manageTaskFilter.fetchTasksFilters();
}

function arrangeIconButtons(buttonNames, data) {
    for (var k = 0; k < buttonNames.length; k++) {
        if ($.inArray(buttonNames[k], data.taskIconSet) >= 0) {
            if ($.inArray(buttonNames[k], taskIconSet) == -1)
                taskIconSet[taskIconSet.length] = buttonNames[k];
        }
    }
    taskIconSet.push("feed");
}

function removeTaskAppliedFilter() {
    clearTaskData();
    $("#filter_tasks_name").text($("#taskFilterButton").text());
    $('#bcTaskFilterName').text("");
    $('#breadcrumbTaskFilter').addClass('hide');
    $('#taskDetailInfo').addClass('hide');
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.wTaskFilter = null;
        $.jStorage.set($("#userid").text(), userCache);
    }
    handleTaskButtons();
    viewAllTasks();
    $("#taskform").css('height',0);
}

/**@Description : This function will do actuall escalation of task to his manager**/
function escalateTask(bol) {
    var count = 0;
    var columnsData = getSelectedRows(tempWorkflowTable, false);
    if (columnsData.length == 0)
        showSelectInformation();
    else if (bol == false) {
        escalateData = [];
        $.each(columnsData, function(key, obj) {
            if ($(obj).attr('istaskowner') != "true")
                count = count + 1;
            else
                escalateData[escalateData.length] = columnsData[key];
        });
        $("#escalateTasksModal .modal_heading").text($("#escalateTaskTitle").text());
        var message = $("#escalateTaskConfirmation").text();
        var errorMessage = $("#escalateError").text();
        if (columnsData.length == count)
            showInformation(errorMessage.replace("{0}", count));
        else if (count != 0 && columnsData.length != count) {
            $("#escalateTasksModal .modal-body p").text(errorMessage.replace("{0}", count) + "        " + message.replace("{0}", columnsData.length - count));
            modalShow("escalateTasksModal");
        } else {
            $("#escalateTasksModal .modal-body p").text(message.replace("{0}", columnsData.length));
            modalShow("escalateTasksModal");
        }
    } else if (bol) {
        addPageLoading("tasks");
        responseCount = 0;
        $.each(escalateData, function(key, obj) {
                executeAction("escalate", $(obj).attr('tid'), "", escalateData.length, "escalated");
        });
    }
}

/**@Description : This function will get whether logged in user has manager / not & then disables manager button accordingly.**/
function managerCheck(){
    sendAjaxCall("dashboard/data.json", "GET", false, true, "json", {}, handleAjaxError, function(data){
        if (data.manager != undefined && data.manager != null){
            hasManager = true;
            $("#escalateButton").removeClass('disabled').find('a').attr("onclick",actionClickEvents["escalate"]);
        }else
        $("#escalateButton").addClass('disabled').find('a').removeAttr('onclick');
    });
}

/**@Description: This function will open modal window to update due date of a particular task.**/
function openDueDateModal(obj){
    if($(obj).attr('taskId')!="" && $(obj).attr('taskId')!=null){
        $("#updateDueDatetaskId").val($(obj).attr('taskId'));
        if($(obj).text()!="")
            $("#updateDueDatePicker").val($(obj).text());
        else
            $("#updateDueDatePicker").val("");
        $("#dueDateError").addClass("hide");
        modalShow("updateDueDate");
    }
}

/**@Description : This function will call server to update due date of selected task**/
function updateDueDate(){
    if($("#updateDueDatePicker").val()!=""){
        modalHide("updateDueDate");
        addLoading($("#updateDueDate .modal-body"));
        var duedate = $.format.date(moment($("#updateDueDatePicker").val()).unix()*1000,"yyyy-MM-ddTHH:mm:ss");
        responseCount = 0;
        executeAction("updateDueDate",$("#updateDueDatetaskId").val(),duedate,1,"due date updated");
    }else
        $("#dueDateError").text($("#dueDateErrorMsg").text()).removeClass("hide");
}

function removeDueErrorMsg(){
    $("#dueDateError").addClass("hide");
}

function handleTaskButtons(){
    if(taskStateFlag)
        $.each(taskBtnArr,function(key,value){$("#"+value).addClass('disabled').find('a').removeAttr('onclick');});
    else{
        $.each(taskBtnArr,function(key,value){$("#"+value).removeClass("disabled").find('a').attr('onclick', actionClickEvents[value.split('Button')[0]]);});
        $("#deleteButton").removeClass('disabled').find('a').attr('onclick', actionClickEvents["delete"]);
        managerCheck();
    }
    return false;
}

function clearDate(obj){
    $(obj).parent().find('input').val('');
}

function getPackagesData(){
    sendAjaxCall(intalio_bpms.task_filter.getPackages, "GET", false, true, "json",{}, handleAjaxError, function(data){
        packageData = data.process;
        if($('#workflow_tasks_wrapper').length==0){
            if(userCache!=null && userCache!=undefined){
                taskData.page = parseInt(1);
                if(userCache.wTaskPageSize!=null)
                    taskData.rp = parseInt(userCache.wTaskPageSize);
                else
                    taskData.rp = 10;
                if(userCache.wTaskFilter!=null && !processTasks){
                    taskData.priorities=userCache.wTaskFilter.priorities;
                    taskData.states=userCache.wTaskFilter.states;
                    taskData.users=userCache.wTaskFilter.users;
                    taskData.roles=userCache.wTaskFilter.roles;
                    if(userCache.wTaskFilter.projectName!=null && userCache.wTaskFilter.projectName!=undefined){
                        var packageObj = $.grep(packageData, function(e){return e.name == userCache.wTaskFilter.projectName && e.package==true && e.status=="ACTIVE"});
                        taskData.projectName=packageObj.length==1 ? userCache.wTaskFilter.projectName+"."+packageObj[0].version : userCache.wTaskFilter.projectName;
                    }
                    taskData.creationDate=userCache.wTaskFilter.creationDate;
                    taskData.sharedTasks=userCache.wTaskFilter.sharedTasks;
                    taskData.sharedTo=userCache.wTaskFilter.sharedTo;
                    $('#bcTaskFilterName').text(userCache.wTaskFilter.name);
                    $('#breadcrumbTaskFilter').removeClass('hide');
                } else {
					clearTaskData();
					$('#bcTaskFilterName').text("");
					$('#breadcrumbTaskFilter').addClass('hide');
					userCache.wTaskFilter = null;
					$.jStorage.set($("#userid").text(), userCache);
				}
            }
            sendAjaxCall("ui-fw/updates.htm", "POST", false, true, "json",taskData, handleAjaxError, updateCustomColumnTasks);
        }
    });
}
/**@Description  : this function will clear all the data required to get task list**/
function clearTaskData(){
    $.each(filterArray,function(key,value){
        taskData[value]="";
    });
    taskData.page = 1;
    taskData.processId=[];
    taskData.sharedTasks=false;
}

/**@Description     : This function will be called by task,notifications & processes page to open the task of any type(formless / ajax) & loads the content accordingly.**/
function openTask(obj,isAdhocTask,adhocIndex){
    var iframeId,tableDiv,pageContentTaskDetail;
    if(currentTab == "tasks"){
        iframeId=$("#taskform");
        tableDiv=$("#taskTableDiv");
    }else if(currentTab == "notifications"){
        iframeId=$("#notificationform");
        tableDiv=$("#notificationTableDiv");
    }else{
        iframeId=$("#processesform");
        tableDiv=$("#processesTableDiv");
    }
    if($(obj)){
        addLoading($('.page-content'));
        formlessTask.taskId = $(obj).attr('tid');
        formlessTask.taskStatus = $(obj).attr('state');
        formlessTask.taskURL = $(obj).attr('taskURL');
		formlessTask.description = $(obj).attr('description');
        formlessTask.taskURL.indexOf('formless:') >=0 ? formlessTask.formType = "formless" : formlessTask.formType = "ajax";
        formlessTask.instanceId = $(obj).attr('instanceId');
        attachmentType = $(obj).attr('isAttachmentType');
        if($(obj).attr('available')=='true')
            formlessTask.isSharedTask = false;
        else if($(obj).attr('shared')=='true')
            formlessTask.isSharedTask = true;
        $('.page-content').find('#taskDetailInfo').remove();
        $('#taskDetailInfo').clone().insertAfter(tableDiv);
        pageContentTaskDetail = $('.page-content').find('#taskDetailInfo');
        if(formlessTask.formType=="ajax"){
            iframeId.addClass('hide');
            iframeId.attr('src',formlessTask.taskURL);
        }else{
            $('h3#taskDescription').text($(obj).attr('description'));
            tableDiv.addClass("hide");iframeId.addClass("hide");
            pageContentTaskDetail.removeClass('hide').animate({height: $(window.width)-140}, speed);
        }
        populateHtml(pageContentTaskDetail,attachmentType,iframeId);
        if (typeof workflowMetaData == "undefined")
            loadJs("scripts/custom/workflow/workflowMetaData.js", function() {
                workflowMetaData.intialize();
            });
        else
            workflowMetaData.intialize();
        if(isAdhocTask){
            $("#newAdhocTaskButton").removeClass("hide");
        }else{
            $("#newAdhocTaskButton").addClass('hide');
        }
       if(parseInt(adhocIndex)>0){
            $("#showAdhocTasksButton").removeClass("hide");
        }else{
            $("#showAdhocTasksButton").addClass("hide");
        }
    }
}

/**@Description     : This function append the formless html to the page content div.**/
function populateHtml (obj,type,iframeId) {
    var htmlElement = $("#formLessTaskTemplate").clone();htmlElement.removeClass('hide');
    obj.append(htmlElement);
    handleFormTypeButtons(type);
    if(formlessTask.formType=="ajax"){
        $(obj).find('#taskDescription').remove();
        $(obj).find('div.taskNote').remove();
    }else
        removeLoading();
}

/**@Description     : This function will hide unwanted buttons according to the currentTab page.**/
function handleFormTypeButtons (type) {
    $('#taskDetailInfo').find('button').addClass('hide');
    if(currentTab=="processes"){
        if(formlessTask.formType=="formless")
            $('#taskDetailInfo').find('button.formlessInit').removeClass('hide');
        if(type=="true")
            $('#taskDetailInfo').find('button.attachment').removeClass('hide');
    }
    else if(currentTab=="tasks"){
        if(formlessTask.formType=="ajax")
            $('#taskDetailInfo').find('button.ajax').removeClass('hide');
        else    
            $('#taskDetailInfo').find('button.formlessTask').removeClass('hide');
    }
    else
        $('#taskDetailInfo').find('button.formlessNotif').removeClass('hide');
}

/**@Description     : This function will populate the roles used for sharing a task**/
function shareTask(bol, executedActionName) {
    $("#shareTaskModal .modal-footer").find("button").attr('onclick',"javascript:shareTask('true','shared')");
    userArray = new Array();
    $('#loading').css('margin-top', 70);
    var columnsData = getSelectedRows(tempWorkflowTable, false);
    if (columnsData.length <= 0)
        showSelectInformation();
    else if (bol == false && columnsData.length > 0) {
        getShareTo();
        $('#shareSpanTask').text('');
    } else if (bol && $("#shareTo").val() == null)
        shareToError();
    else if (columnsData.length > 0 && bol && $("#shareTo").val()) {
        $('#shareSpanTask').text('');
        addPageLoading("tasks");
        responseCount = 0;
        $.each(columnsData, function(key, obj) {
            if ($(obj).attr('tid') != undefined && $(obj).attr('tid') != null)
                executeAction("share", $(obj).attr('tid'), "", columnsData.length, executedActionName);
        });
        modalHide("shareTaskModal");
    }
}

function loadAttachments(obj){
    addLoading($('.page-content'));
    $(obj).next().empty();
    if($(obj).attr('taskId')){
        var attachmentsURL = intalio_bpms.task_metadata.getAttachments.replace('{taskId}',$(obj).attr('taskId'));
        sendAjaxCall(attachmentsURL, "GET", false, true, "json", {}, handleAjaxError, function(data) {
            $.each(data.Attachments, function(key, value) {
                $(obj).next().append('<li><a href="' + value.payloadURL + '" target="_blank">' + value.title + '</a></li>');
            });
            if(data.GlobalAttachments){
                $(obj).next().append('<li class="dropdown-header">Global</li>');
                $.each(data.GlobalAttachments, function(key, value) {
                    $(obj).next().append('<li><a href="' + value.payloadURL + '" target="_blank">' + value.title + '</a></li>');
                });
                setDropdownPosition(obj);
            }else
                setDropdownPosition(obj);
        });
    }
    removeLoading();
}

var loadTaskButtons = function(data){
    var finalButtonList=[];
    taskTable = $('#workflow_tasks').dataTable(taskOptions);
    $('#workflow_tasks_wrapper').find('.dataTables_empty').html("Fetching task(s)...");
    $('#workflow_tasks_length').remove();
    taskIconSet.push("feed");
    var taskButtons = data.isSuperAdmin=="true" ? iconsSetTasks_SA : taskIconSet;
    $.each(iconsSetTasks_SA,function(key,value){
        if($.inArray(value,taskButtons)>=0){
            finalButtonList.push(value);
        }
    });
    if (data.isSuperAdmin || useToolBarIcon == "true") {
        $('#workflow_tasks_wrapper .row .col-sm-6:first').append(getToolbarIconsCodes("moreButtons"));
        for (var i = finalButtonList.length; i >= 0; i--) {
            if (finalButtonList[i]) {
                var taskButton = getToolbarIconsCodes(finalButtonList[i]);
                if($.inArray(finalButtonList[i], moreBtnList.btnArr)>=0){
                    $('#taskMoreBtnDropdown').prepend(taskButton);
                }else{
                    $('#workflow_tasks_wrapper .row .col-sm-6:first').prepend(taskButton);
                }
            }
        }
        if (!hasManager)
            $("#escalateButton").addClass("disabled").find('a').removeAttr('onclick');
    } else
        $('#workflow_tasks_wrapper .row .col-sm-6:first').empty();
    customTable('workflow_tasks');
    $('#workflow_tasks_filter').find('input').attr('onkeyup', 'javascript:updateShowEntries()');
    $('#workflow_tasks_filter').find('input').bind('keyup', function(e) {
       var code = e.keyCode || e.which; 
       if (code  == 13 && $.trim(this.value)!=""){
           e.preventDefault();
           searchTasks(this.value);
           return false;
       }else if($.trim(this.value)==""){
            e.preventDefault();
            viewAllTasks();
            return false;
       }
    });
    if (userCache != null && userCache != undefined && $("#userid").text() != "" && userCache.wTaskFilter != null && !processTasks)
        $('#filter_tasks_name').text(userCache.wTaskFilter.name);
    else
        $('#filter_tasks_name').text($("#taskFilterButton").text());
    updateData(data, taskTable);
}
