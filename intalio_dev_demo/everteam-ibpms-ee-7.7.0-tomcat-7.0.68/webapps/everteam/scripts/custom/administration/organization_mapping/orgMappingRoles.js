/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */
/**Stores all the DOM objects */
var orgRolesSelectObj = $("#orgRolesSelect");
var orgRoleHeadersObj = $("#orgRoleHeaders");
var org_roles_tableObj = $("#org_roles_table");
var org_realm_obj = $("#orgRealm");
var orgRoleTypeObj = $("#orgRoleType");
var orgRoleDescriptionObj = $("#orgRoleDescription");
var orgRoleNameObj = $("#orgRoleName");
var orgErrorMessage = $("#orgErrorMessage");
var orgAssignUsersObj = $("#orgAssignUsers");
/**stores the selected columns data*/
var columnsData;
/**stores the reference of table*/
var orgMappingRolesTable;
/**stores the buttons display*/
var orgRolesButtonsList = ["create", "update", "delete", "import", "sync"];
/** width is used to set the width of each column in data tables*/
var width = 2000;
/**stores the options for datatable*/
var orgRoleOptions = {
    "bPaginate": false,
    "bStateSave": true,
    "bInfo": false,
    "bFilter": true,
    "bRetrieve": true,
    "oLanguage": {
        "sSearch": ""
    },
    "aoColumns": [{
        "sWidth": width * 0.006,
        "sClass": "center",
        "bSortable": false
    }, {
        "sWidth": width * 0.055,
    }, {
        "sWidth": width * 0.13,
    }, {
        "sWidth": width * 0.070,
        "aaSorting": ["asc"],
    }, {
        "bSortable": true
    },{
        "bVisible":false
    }]
}
var updateButton = 0;
/**pagination required data for instances*/
var paginationData = {
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
var waitNo = 0;
/**datatable ready function*/
$(document).ready(function() {
    orgMappingRolesTable = org_roles_tableObj.dataTable(orgRoleOptions);
    customTable('org_roles_table');
    addLoading($('#org_roles_table_wrapper'));
    getStatusOfInUser();
});

function getStatusOfInUser() {
    var data = {
        userID: $("#userid").text()
    };
    sendAjaxCall(intalio_bpms.org_mapping_roles.get_user_obj, "GET", false, true, "json", data, handleOrgRoleAjaxError, function(response) {
        if (response != undefined && response.userInfo != undefined)
            listRoles();
        else if (waitNo <= 1)
            setTimeout(function() {
                waitNo++;
                getStatusOfInUser()
            }, 2000);
        else
            listRoles();
    });
}
/**
 * @Function Name   : getOrgRolesButtons
 * @Description     : display buttons in org mapping for roles
 * @param           : Button Name
 * @returns         :
 * */
function getOrgRolesButtons(btnName) {
    var iconButton;
    switch (btnName) {
        case "create":
            iconButton = "<button type='button' onclick='javascript:openCreateRoleModal();' class='btn btn-sm btn-white'><i class='fa fa-plus-circle'></i>&nbsp;" + $('#createButton').text() + "</button>&nbsp;";
            return iconButton;
            break;
        case "update":
            iconButton = "<button id='updateButton' type='button' onclick='javascript:openUpdateRoleModal();' class='btn btn-sm btn-white'><i class='fa fa-edit'></i>&nbsp;" + $('#updateButton').text() + "</button>&nbsp;";
            return iconButton;
            break;
        case "delete":
            iconButton = "<button type='button' onclick='javascript:openDeleteRoleModal();' class='btn btn-sm btn-white'><i class='fa fa-trash-o'></i>&nbsp;" + $('#deleteButton').text() + "</button>&nbsp;";
            return iconButton;
            break;
        case "import":
            iconButton = "<button type='button' onclick='javascript:openImportRoleModal();' class='btn btn-sm btn-white'><i class='fa fa-cloud-download'></i>&nbsp;" + $('#importButton').text() + "</button>&nbsp;";
            return iconButton;
            break;
        case "sync":
            iconButton = "<button class='btn btn-white btn-sm ace-popover' id='rolesSyncButton' data-html='true' data-placement='bottom' data-content='' data-trigger='hover' type='button' onclick=javascript:modalShow('syncRoles'); class='btn btn-sm btn-white'><i class='fa fa-repeat'></i>&nbsp;" + $('#syncButton').text() + "</button>&nbsp;";
            return iconButton;
            break;
    }
}

/**
 * @Function Name   : getRoles
 * @Description     : get the roles from server
 * */
function getRoles() {
    var data = {};
    sendAjaxCall(intalio_bpms.org_mapping_roles.roles_rbac_url, "GET", false, true, "json", data, handleOrgRoleAjaxError, populateRoles);
}

/**
 * @Function Name   : populateRoles
 * @Description     : populate roles to dom object
 * @param           : response data
 * */
function populateRoles(data) {
   if(data.error_message != undefined){
	showErrorNotification(data.error_message);
	removeLoading();
	modalHide("importRoles");
   }else{
    removeChosen("orgRolesSelect");
    var option;
    $('#orgRolesSelect option:not(:first)').remove();
    option = $('<option/>');
    option.attr('value', "All").text("All");
    orgRolesSelectObj.append(option);
    $.each(data.roles, function(key, value) {
        option = $('<option/>');
        option.attr('value', value).text(value);
        orgRolesSelectObj.append(option);
    });
    orgRolesSelectObj.chosen();
    $("#orgRolesSelect_chzn").css("width", 300).find('li.search-field input').css("width", 300);
    removeLoading();
   }
}

/**
 * @Function Name   : listRoles
 * @Description     : populate roles to dom object
 * @param           : response data
 * */
function listRoles() {
    addLoading($('#org_roles_table_wrapper'));
    if (userCache != null && userCache != undefined && userCache.rolesPageSize != null)
        paginationData.pageSize = parseInt(userCache.rolesPageSize);
    else
        paginationData.pageSize = 10;
    sendAjaxCall(intalio_bpms.org_mapping_roles.list_roles, "GET", false, true, "json", paginationData, handleOrgRoleAjaxError, populateRolesData);
}

/**
 * @Function Name   : importSelectedRoles
 * @Description     : it will call server to import specified roles in to local DB & returns the imported data
 * @param           : response data
 * */
function importSelectedRoles() {
    if (orgRolesSelectObj.val() != null && orgRolesSelectObj.val().length > 0) {
        modalHide("importRoles");
        var data, allRoles = [];
        if ($.inArray("All", orgRolesSelectObj.val()) == -1)
            data = {
                roleID: orgRolesSelectObj.val()
            };
        else {
            orgRolesSelectObj.find('option:gt(0)').each(function() {
                allRoles.push($(this).val());
            });
            data = {
                roleID: allRoles
            };
        }
        sendAjaxCall(intalio_bpms.org_mapping_roles.import_roles, "POST", false, true, "json", data, handleOrgRoleAjaxError, checkPostCall);
    } else
        $("#orgErrorMessageImport").removeClass("hide").text($("#validateRoleSelect").text());
}

/**
 * @Function Name   : populateRolesData
 * @Description     : populate org roles in data table
 * @param           : response data
 * */
function populateRolesData(data) {
	orgMappingRolesTable.fnFilter('');
    orgMappingRolesTable.fnClearTable();
    $('#orgRoleHeaders th input:first').prop('checked', false);
    if (data.totalRecords != undefined && data.totalRecords != null)
        totalRecords = data.totalRecords;
    if (data.roles != undefined && data.roles.length > 0) {
        $.each(data.roles, function(key, value) {
            if (value != undefined) {
                var items = [];
                items[items.length] = "<label class='position-relative'><input type='checkbox' class='ace roleSelected' id='roleSelected' onclick='javascript:updateHeaderCheckbox(this);hideButton(this);'> <span class='lbl'></span></label>";
                items[items.length] = value.roleID;
                items[items.length] = value.description;
                items[items.length] = value.roleType;
                if (value.assignedUsers.length > 0) {
                    var usersDataHide = [];
                    tempHtml = "";
                    for (var k = 0; k < value.assignedUsers.length; k++) {
                        var userObj = [];
                        if(data.users!=undefined)
                            userObj = $.grep(data.users, function(e){return e.userID == value.assignedUsers[k]});
                        tempHtml += '&nbsp;<span class="nowrap"><a class="noDecoration" user="'+value.assignedUsers[k]+'" onclick=javascript:showUserProfile(this)>';
                            userObj.length==1 ? tempHtml+='<i class="fa fa-user" title="'+userObj[0].userID+'"></i> '+userObj[0].userName+'</a></span>' : tempHtml += '<i class="fa fa-user" title="User"></i> ' + value.assignedUsers[k] + ' </a></span>';
                        tempHtml += '<span class="wrap-line"> </span>';
                        usersDataHide[usersDataHide.length] = " " + value.assignedUsers[k];
                    }
                    items[items.length] = tempHtml;
                    items[items.length] = usersDataHide + "";
                } else{
                    items[items.length] = "";
                    items[items.length] = "";
                }
                orgMappingRolesTable.fnAddData(items, false);
            }
        });
        orgMappingRolesTable.fnDraw(true);
    }
    $("#org_roles_table_wrapper").find('.table_refresh_icon').attr("onclick", "listRoles()");
    $('#org_roles_table_wrapper .row .tableButtons').empty();
    $.each(orgRolesButtonsList, function(key, value) {
        $('#org_roles_table_wrapper .row .tableButtons').append(getOrgRolesButtons(value));
    });
    $('.dataTables_empty').html("No role(s) found.");
    orgMappingRolesTable.fnSort([
        [3, 'desc']
    ]);
    if (data.roles != undefined && data.roles.length == 0) {
        $('.dataTables_empty').html("No role(s) found.");
        $('#roles_pagination').remove();
        $('.paginationRows').remove();
        $("#org_roles_table_wrapper .showEntries").remove();
    } else
        handlePagination(data);
    if (data.error_message) {
        showErrorNotification(data.error_message);
        removeLoading();
    }
    getRolesSyncTime();
}

//this logic is to handle pagination
function handlePagination(data) {
    var paginationObj = $("#org_roles_table_wrapper .table_pagination");
    totalPageSize = Math.ceil(totalRecords / paginationData.pageSize);
    if (totalPageSize >= 1) {
        $('#roles_pagination').remove();
        $('.paginationRows').remove();
        if (paginationData.requiredPage == parseInt(1)) {
            startNumber = paginationData.requiredPage;
            if (parseInt(data.roles.length) != parseInt(paginationData.pageSize))
                endNumber = parseInt(data.roles.length);
            else
                endNumber = parseInt(paginationData.pageSize);
        } else {
            var page = parseInt(parseInt(paginationData.requiredPage) - parseInt(1));
            startNumber = parseInt(page * parseInt(paginationData.pageSize) + 1);
            endNumber = parseInt(page * parseInt(paginationData.pageSize) + data.roles.length);
        }
        var pageHtml = $(".pageSizePagination").clone();
        $(pageHtml).addClass("paginationRows");
        var pagintaionHtml = $("#paginationTable").clone();
        $(pagintaionHtml).find("#rolesPageNo").val(paginationData.requiredPage).end().find(".totalPageNo").text(totalPageSize);
        paginationObj.append(pageHtml).append("<div id='roles_pagination' class='dataTables_paginate paging_bootstrap pull-right'></div>");
        paginationObj.find("#roles_pagination").append(pagintaionHtml);
        showPaginationEntires(startNumber, endNumber, "org_roles_table_wrapper", "Role(s)");
        updatePaginationTable($('#rolesPageNo').val(), totalPageSize);
        $("select#noOfRoles").val(paginationData.pageSize);
        removeLoading();
        applyNiceScroll($('#org_roles_table_wrapper').find('.table_container'), 190);
    } else {
        $('#roles_pagination').remove();
        $('.paginationRows').remove();
        paginationObj.find(".showEntries").remove();
    }
}

function getLastFirstPageData(action) {
    if (action === 'last')
        paginationData.requiredPage = Math.ceil(totalRecords / paginationData.pageSize);
    else if (action === 'first')
        paginationData.requiredPage = parseInt(1);
    listRoles();
}

function getNextPrevPageData(action) {
    if (parseInt($('#rolesPageNo').val()) > totalPageSize || $('#rolesPageNo').val() == "")
        paginationData.requiredPage = parseInt(1);
    else if (action === 'next' && $('#rolesPageNo').val() < totalPageSize)
        paginationData.requiredPage = parseInt($("#rolesPageNo").val()) + 1;
    else if (action === 'prev' && $('#rolesPageNo').val() > 1)
        paginationData.requiredPage = parseInt($("#rolesPageNo").val()) - 1;
    listRoles();
}

function getRolesPageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#rolesPageNo").val() != "" && parseInt($("#rolesPageNo").val()) != 0 && parseInt($("#rolesPageNo").val()) <= Math.ceil(totalRecords / paginationData.pageSize)) {
        paginationData.requiredPage = parseInt($("#rolesPageNo").val());
        listRoles();
    } else if ($("#rolesPageNo").val() != "" && event.keyCode == parseInt(13) && (parseInt($("#rolesPageNo").val()) === 0 || parseInt($("#rolesPageNo").val()) > Math.ceil(totalRecords / paginationData.pageSize))) {
        paginationData.requiredPage = parseInt(1);
        listRoles();
    } else if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105))
        event.preventDefault();
}

function updateNoOfRoles() {
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.rolesPageSize = $('#noOfRoles').val();
        $.jStorage.set($("#userid").text(), userCache);
    }
    paginationData.pageSize = $('#noOfRoles').val();
    paginationData.requiredPage = parseInt(1);
    listRoles();
}
/**
 * @Function Name   : getRealms
 * @Description     : this function will get the realms
 * */
function getRealms() {
    var data = {};
    sendAjaxCall(intalio_bpms.org_mapping_roles.realms, "GET", false, true, "json", data, handleOrgRoleAjaxError, updateRealmList);
}

/**
 * @Function Name   : updateRealmList
 * @Description     : this function will populate the realms
 * @param           : data list of realms
 * */
function updateRealmList(data) {
    removeChosen("orgRealm");
    org_realm_obj.append("<option value='-1'>Choose a realm...</option>");
    $.each(data.realms, function(key, obj) {
        org_realm_obj.append("<option value='" + obj + "'>" + obj + "</option>");
    });
    org_realm_obj.chosen();
    $("#orgRealm_chzn").css("width", 200);
}

/**
 * @Function Name   : getAssignUsers
 * @Description     : this function will get the users in org mapping
 * @param           : obj DOM object & objArr existing list of users required for function updateAssignUsersList
 * */
function getAssignUsers(obj, objArr) {
    var data = {};
    sendAjaxCall(intalio_bpms.org_mapping_roles.users_list, "GET", false, true, "json", data, handleOrgRoleAjaxError,
        function(data) {
            updateAssignUsersList(data, obj, objArr);
        });
}

/**
 * @Function Name   : updateAssignUsersList
 * @Description     : this function will populate the users in assign users DOM
 * @param           : response data,DOM object & objArr existing list of users required to show
 * */
function updateAssignUsersList(data, obj, objArr) {
    removeChosen(obj);
    $.each(data.users, function(key, value) {
        if ($.inArray(" " + value.userID, objArr) == -1)
            $("#" + obj).append("<option value='" + value.userID + "'>" + value.displayName + "</option>");
        else
            $("#" + obj).append("<option value='" + value.userID + "' selected='selected'>" + value.displayName + "</option>");
    });
    $("#" + obj).chosen();
    $("#" + obj + "_chzn").css("width", 200).find("li.search-field input").css("width", 200);
    removeLoading();
}

/**
 * @Function Name   : openCreateRoleModal
 * @Description     : this function will open modal window for creation of roles
 * */
function openCreateRoleModal() {
    addLoading($("#org_create_role .modal-body"));
    orgRoleNameObj.val("");
    orgRoleDescriptionObj.val("");
    orgErrorMessage.addClass('hide');
    getRealms();
    getAssignUsers("orgAssignUsers");
    modalShow('org_create_role');
    removeTextBox($("#closeTextBox"));
}

function addTextBox(obj) {
    $(obj).prev().addClass("hide");
    $(obj).before("<span id='createRealm'><input type='text' id='newRealm' maxlength='50' onkeypress='javascript:validateRealm(event);'/>&nbsp;&nbsp;<span title='Create Realm' class='addNewRealm' onclick='javascript:createRealm(this)'><i class='fa fa-check green'></i></span>&nbsp;&nbsp;<span title='Remove' id='closeTextBox' class='addNewRealm' onclick='javascript:removeTextBox(this)'><i class='fa fa-times text-danger'></i></span></span>");
    $("#newRealm").css("width", 200).css("margin-left", '-9px');
    $(obj).addClass('hide');
}

function removeTextBox(obj) {
    $(obj).prev().remove().end().remove();
    $("#createRealm").remove();
    $("#addRealmSpan").removeClass("hide");
    $("#orgRealm_chzn").removeClass("hide");
}

function validateRealm(event){
	var key = event.keyCode || event.which;
	if(key===32){
		event.preventDefault();
		return false;
	}
}

/**
 * @Function Name   : openUpdateRoleModal
 * @Description     : this function will open modal window for updation of roles
 * */
function openUpdateRoleModal() {
    columnsData = getSelectedRows(orgMappingRolesTable, true);
    if (columnsData.length == 1) {
        addLoading($("#org_update_role .modal-body"), true);
        $("#orgUpdateRoleName").val(columnsData[0][1]);
        $("#orgUpdateRoleDescription").val(columnsData[0][2]);
        getAssignUsers("orgUpdateAssignUsers", columnsData[0][5].split(','));
        modalShow("org_update_role");
    } else if (columnsData.length == 0)
        showInformation($("#validateRoleSelect").text());
    else if (columnsData.length > 1)
        showInformation($("#validateSelect").text());
}

/**
 * @Function Name   : openDeleteRoleModal
 * @Description     : this function will open modal window for deletion of roles
 * */
function openDeleteRoleModal() {
    columnsData = getSelectedRows(orgMappingRolesTable, true);
    var message = "";
    if (columnsData.length > 0) {
        $.each(columnsData,function(key,value){
            if($.trim(columnsData[key][4])!="")
                message = $("#org_deleteRoleMsg").text()+"</br>"
        });
        message = message + $("#deleteConfirmation").text().replace("{0}", columnsData.length); 
        $("#deleteRoles").find(".modal-body p").html(message);    
        modalShow("deleteRoles");
    } else
        showInformation($("#validateRoleSelect").text());
}

/**
 * @Function Name   : openImportRoleModal
 * @Description     : this function will open modal window for import roles
 * */
function openImportRoleModal() {
    addLoading($("#importRoles .modal-body"), true);
    getRoles();
    $("#orgErrorMessageImport").addClass("hide");
    modalShow("importRoles");
}

/**
 * @Function Name   : createRole
 * @Description     : this function will create role in org mapping(Only internal roles)
 * */
function createRole() {
    if (orgRoleNameObj.val() != "" && org_realm_obj.val() != "-1" && orgRoleDescriptionObj.val() != "") {
        var data = {
            identifier: orgRoleNameObj.val(),
            realm: org_realm_obj.val(),
            description: orgRoleDescriptionObj.val(),
            roleType: orgRoleTypeObj.val(),
            userID: orgAssignUsersObj.val()
        };
        modalHide('org_create_role');
        sendAjaxCall(intalio_bpms.org_mapping_roles.create_role, "POST", false, true, "json", data, handleOrgRoleAjaxError, checkPostCall);
    } else if (orgRoleNameObj.val() == "")
        showOrgError($("#validateName").text(), orgRoleNameObj);
    else if (orgRoleDescriptionObj.val() == "")
        showOrgError($("#validateDescription").text(), orgRoleDescriptionObj);
    else if (org_realm_obj.val() == "-1")
        showOrgError($("#validateRealm").text(), org_realm_obj);
}

function createRealm() {
    if ($("#newRealm").val() != "") {
        var data = {
            realmID: $("#newRealm").val()
        };
        sendAjaxCall(intalio_bpms.org_mapping_roles.realms, "POST", false, true, "json", data, handleOrgRoleAjaxError, function(data) {
            if (data.success_message != undefined) {
                showNotification(data.success_message);
                getRealms();
                removeTextBox($("#closeTextBox"));
            } else if (data.error_message != undefined)
                showErrorNotification(data.error_message);

        });
    } else
        showOrgError($("#validateRealmName").text(), $("#newRealm"));

}
/**
 * @Function Name   : updateRole
 * @Description     : this function will update role in org mapping(Only internal roles)
 * */
function updateRole() {
    var data = {
        roleID: $("#orgUpdateRoleName").val(),
        description: $("#orgUpdateRoleDescription").val(),
        userID: $("#orgUpdateAssignUsers").val()
    };
    modalHide('org_update_role');
    sendAjaxCall(intalio_bpms.org_mapping_roles.users_update, "POST", false, true, "json", data, handleOrgRoleAjaxError, checkPostCall);
}

/**
 * @Function Name   : deleteRoles
 * @Description     : this function will delete role in org mapping(Only internal roles)
 * */
function deleteRoles() {
    var flag = false;
    for (var i = 0; i < columnsData.length; i++) {
        if (i == columnsData.length - 1)
            flag = true;
        var data = {
            roleID: columnsData[i][1],
            roleType: columnsData[i][3]
        };
        if (flag == false)
            sendAjaxCall(intalio_bpms.org_mapping_roles.delete_role, "POST", false, true, "json", data, handleOrgRoleAjaxError,
                function(data) {});
        else
            sendAjaxCall(intalio_bpms.org_mapping_roles.delete_role, "POST", false, true, "json", data, handleOrgRoleAjaxError,
                checkPostCall);
    }
}

/**
 * @Function Name   : checkPostCall
 * @Description     : this function will call after every success call to server to re populate list
 * */
function checkPostCall(data) {
    if (data.success_message != undefined) {
        showNotification(data.success_message);
        showNotification($("#syncMsg").text());
        listRoles();
    } else if (data.error_message != undefined)
        showErrorNotification(data.error_message);
}

/**
 * @Function Name   : handleOrgRoleAjaxError
 * @Description     : this function will handle all ajax error messages.
 * */
function handleOrgRoleAjaxError(data) {
    if (data.error_message != undefined)
        showErrorNotification(data.error_message);
}

/**
 * @Function Name   : showOrgError
 * @Description     : this function will show error messages while creating roles if any.
 * */
function showOrgError(message, objId) {
    orgErrorMessage.text(message);
    orgErrorMessage.removeClass('hide');
    objId.focus();
}

/**
 * @Function Name   : removeErrorMsg
 * @Description     : this function will show hide error messages while creating / updating roles if any.
 * */
function removeErrorMsg(obj, id) {
    if ($(obj).val() != null && $(obj).val().length > 0)
        $("#" + id).addClass("hide");
}

/**
 * @Function Name   : selectDeselectAll
 * @Description     : this function will select / un-select all checkboxes in table.
 * */
function selectDeselectAll(obj) {
    $(obj).closest('table').find('tr > td:first-child input:checkbox')
        .each(function() {
            if ($(obj).prop('checked') && !$(this).prop("disabled")) {
                this.checked = obj.checked;
                $(this).closest('tr').addClass('row_selected');
            } else if (!$(this).prop("disabled")) {
                this.checked = obj.checked;
                $(this).closest('tr').removeClass('row_selected');
            }
            if (!$(this).prop("disabled"))
                hideButton(this);
        });
}

function hideButton(obj) {
    if ($(obj).prop('checked') && $(obj).closest('tr').find('td').eq(3).text() == "External") {
        updateButton = parseInt(updateButton + 1);
        $('#updateButton').attr('disabled', 'disabled');
    } else if ($(obj).closest('tr').find('td').eq(3).text() == "External") {
        if (updateButton > 0)
            updateButton = parseInt(updateButton - 1);
        if (updateButton === 0)
            $('#updateButton').removeAttr('disabled');
    }
}

function getRolesSyncTime() {
    $('.ace-popover').popover();
    sendAjaxCall(intalio_bpms.org_mapping_roles.roles_last_sync, "GET", false, true, "json", {}, handleOrgRoleAjaxError,
        function(data) {
            if (data.last_sync != undefined) {
                var dateTime = $.format.date(data.last_sync, userPreferences.dateFormat+userPreferences.hourFormat);
                var nextSyncTime = $.format.date(data.next_sync, userPreferences.dateFormat+userPreferences.hourFormat);
                $('#rolesSyncButton').attr('data-content', 'Last Sync Date: ' + dateTime + '</br>' +'Next Sync Date: ' + nextSyncTime);
                var currentDateTime = new Date().getTime();
                if(Number(currentDateTime)>=Number(data.next_sync))
                    $('#rolesSyncButton').removeAttr("disabled");
                else
                    $('#rolesSyncButton').attr("disabled","disabled");
            }
        });
    removeLoading();
}
