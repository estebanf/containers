/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


var vacationTable;
var tableWidth = '100%';
var vac_id;
var dayDiff = 0;
var isSubstituteMandatory = '';
var isAbsenceManager = '';
var substituteList = new Array();
var invalidSubstituteList = new Array();
var cuser = '';
var cuserName = '';
var vcreate_btn = 'create';
var vupdate_btn = 'update';
var vdelete_btn = 'delete';
var url = 'ui-fw/vacation.htm';
var assignedToData = {};
$(document).ready(function() {
    cuser = $('#userid').text().toLowerCase();
    cuserName = $('#user_info').text().trim();
    vacationTable = $('#vacations').dataTable({
        "bFilter": true,
        "bPaginate": false,
        "bStateSave": true,
        "bInfo": false,
        "bSearchable": true,
        "bRetrieve": true,
        "oLanguage": {
            "sZeroRecords": vzerorecords_msg,
            "sInfo": vinfo_msg,
            "sInfoEmpty": vinfoempty_msg,
            "sInfoFiltered": vinfofiltered_msg,
            "sEmptyTable": vemptytable_msg,
            "sSearch": ""
        },
        "aoColumns": [{
            "bSearchable": false,
            "bSortable": false,
            "sClass": "center",
            "sWidth": "20px"
        }, {
            "bSearchable": false,
            "bSortable": false,
            "bVisible": false
        }, {
            "bSearchable": true,
            "bSortable": true,
            "sClass": "left_text"
        }, {
            "bSearchable": true,
            "bSortable": true,
            "sClass": "left_text"
        }, {
            "bSearchable": true,
            "bSortable": true,
            "sClass": "left_text"
        }, {
            "bSearchable": true,
            "bSortable": true,
            "sClass": "left_text"
        }, {
            "bSearchable": true,
            "bSortable": true,
            "sClass": "left_text"
        },{
            "bVisible": false
        }, {
            "bVisible": false
        }]

    });
    var vTable_wrapper = '#vacations_wrapper .row .col-sm-6:first';
    $(vTable_wrapper).append(vacationsButtonHeader(vcreate_btn));
    $(vTable_wrapper).append(vacationsButtonHeader(vupdate_btn));
    $(vTable_wrapper).append(vacationsButtonHeader(vdelete_btn));
    customTable('vacations');
    $('#vacations_filter').find('a').attr('onclick', 'resetVacationsFilter();');
    getVacationData();
    updateUsers();
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt /*, from*/ ) {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    /* Add a change handler to the user select */
    $('#user').change(function() {
        populateSubstitutes();
    });

    /* Add a change handler to the select all checkbox */
    $('table tr th input:checkbox').change(function() {
        updateCheckbox(this);
    });

    /* Add datepicker, onselect and change handler to from date */
    $('#fromdate').datepicker({
        autoclose: true,
        startDate: '0d',
        format: userPreferences.dateFormat.toLowerCase()
    }).next().on(ace.click_event, function() {
        $(this).prev().focus();
    });
    $('#fromdate').on('change', function() {
        var fromdate = toDateObj($('#fromdate').val());
        var todate = toDateObj($('#todate').val());
        if (!isValidDateRange(fromdate, todate)) {
            $('#todate').val($('#fromdate').val());
        }
        $('#todate').datepicker('setStartDate', $('#fromdate').val());
        getMatchedVacationData();
    });
    /* Add datepicker, onselect and change handler to to date */
    $('#todate').datepicker({
        autoclose: true,
        startDate: '0d',
        format: userPreferences.dateFormat.toLowerCase()
    }).next().on(ace.click_event, function() {
        $(this).prev().focus();
    });
    $('#todate').on('change', function() {
        getMatchedVacationData();
    });
});

/**
 * @Function Name   : vacationsButtonHeader
 * @Description     : method to generate toolbar buttons
 * @param           : button name
 * @returns         : icon Button
 **/
function vacationsButtonHeader(userIcon) {
    var iconButton;
    switch (userIcon) {
        case vcreate_btn:
            iconButton = "<button type='button' id='createButton' onclick='javascript:openCreateVacationModal();' class='btn btn-sm btn-white'><i class='fa fa-plus-circle'></i>&nbsp;" + vbutton_create_msg + "</button>&nbsp;";
            return iconButton;
            break;
        case vupdate_btn:
            iconButton = "<button type='button' id='updateButton' onclick='javascript:openUpdateVacationModal();' class='btn btn-sm btn-white'><i class='fa fa-edit'></i>&nbsp;" + vbutton_update_msg + "</button>&nbsp;";
            return iconButton;
            break;
        case vdelete_btn:
            iconButton = "<button type='button' id='deleteButton' onclick='javascript:openEndVacationModal();' class='btn btn-sm btn-white'><i class='fa fa-trash-o'></i>&nbsp;" + vbutton_end_msg + "</button>&nbsp;";
        return iconButton;
            break;
    }
}

/**
 * @Function Name   : openCreateVacationModal
 * @Description     : This function will open create vacation dailog
 **/
function openCreateVacationModal() {
    invalidSubstituteList.length = 0;
    populateSubstitutes();
    $('#vacationId').val("");
    setChosenValue('#substitute', "-1");
    setChosenValue('#user', cuser);
    $('#fromdate').val("");
    $('#todate').val("");
    $('#desc').val("");
    $("#errorMessage").text("");
    $('#vacationErrorDiv').hide();
    $("#activeVacationEnd").hide();
    modalShow('saveVacationModal');
}

/**
 * @Function Name   : openUpdateVacationModal
 * @Description     : This function will open update vacation dailog
 **/
function openUpdateVacationModal() {
    var columnsData = getSelectedRows(vacationTable, true);
    if (columnsData.length <= 0)
        showSelectVacationInformation();
    else if (columnsData.length > 1)
        showInformation(voneselect_info_msg);
    else if (columnsData.length == 1) {
        vac_id = columnsData[0][1];
        $('#vacationId').val(columnsData[0][1]);
        setChosenValue('#user', columnsData[0][7]);
        invalidSubstituteList.length = 0;
        populateSubstitutes();
        $('#fromdate').val(columnsData[0][3]);
        $('#todate').val(columnsData[0][4]);
        setChosenValue('#substitute', columnsData[0][8]);
        $('#desc').val(columnsData[0][6]);
        $("#errorMessage").text("");
        $('#vacationErrorDiv').hide();
        modalShow('saveVacationModal');
        getMatchedVacationData();
        $("#activeVacationEnd").hide();
        var fromdate = toDateObj($('#fromdate').val());
        var todate = toDateObj($('#todate').val());
        var today = toDateObj($.format.date(new Date(), "yyyy/MM/dd"));
        if (cuser == columnsData[0][7] && fromdate <= today && todate >= today) {
            $("#activeVacationEnd").show();
        }
    }
}

/**
 * @Function Name   : openEndVacationModal
 * @Description     : This function will open end vacation dailog
 **/
function openEndVacationModal() {
    var columnsData = getSelectedRows(vacationTable, true);
    if (columnsData.length <= 0)
        showSelectVacationInformation();
    else if (columnsData.length > 0) {
        $("#deleteVacationModal .modal-body p").text(vend_vacation_conf.replace("{0}", columnsData.length));
        modalShow('deleteVacationModal');
    }
}

/**
 * @Function Name   : showSelectVacationInformation
 * @Description     : This function will open information dailog
 **/
function showSelectVacationInformation() {
    showInformation(vemptyselect_msg);
    return false;
}

/**
 * @Function Name   : populateSubstitutes
 * @Description     : This function will populate substitutes
 **/
function populateSubstitutes() {
    removeChosen('#substitute');
    var userVal = $('#user').val();
    var subOrdinatesGroup = "<optgroup label='Subordinate(s)'>",
        peersGroup = "<optgroup label='Peer(s)'>";
    var selectedSubstituteVal = $('#substitute').val();
    $('#substitute').empty();
    var option = "<option value='-1' disabled>" + vselect_user_msg + "</option>";
    $("#substitute").append(option);
    $.each(substituteList, function(index, obj) {
        var userIndex = arrayObjectIndexOf(invalidSubstituteList, obj.value, "value");
        if (userVal != obj.value && userIndex < 0) {
            var option = "<option value=\"" + obj.value + "\">" + obj.name + "</option>";
            var users = $.grep(assignedToData.subordinates, function(e){return e.userID.toLowerCase() == obj.value.toLowerCase()});
            if(users.length>0)
                subOrdinatesGroup += option;
            else
                peersGroup += option;
        }
    });
    $("#substitute").append(subOrdinatesGroup).append(peersGroup);
    var subIndex = arrayObjectIndexOf(invalidSubstituteList, selectedSubstituteVal, "value");
    if (selectedSubstituteVal == userVal || subIndex >= 0) {
        selectedSubstituteVal = "";
    }
    if(selectedSubstituteVal==null)
        selectedSubstituteVal = "-1";
    $('#substitute').val(selectedSubstituteVal);
    $('#substitute').find("option:contains('" + selectedSubstituteVal + "')").prop("selected", "selected");
    setChosen('#substitute');
}

/**
 * @Function Name   : getVacationData
 * @Description     : This function will get vacation details.
 **/
function getVacationData() {
    addLoading($('#vacationsTableDiv'));
    var data = {
        action: "list"
    }
    sendAjaxCall(url, 'GET', false, false, 'json', data, function(e) {}, showVacation);
}

/** @Function Name    : showVacation
 *  @Description     : Displays the vacation sumamry to users.
 *  @param           : data : Response of AJAX call.
 **/
function showVacation(data) {
    if (data.error_message != undefined) {
        if (data.error_message == 'error_fetch_users') {
            showErrorNotification(vfetch_user_error_msg);
        }
    }
    var vacationData = [];;
    vacationTable.fnClearTable();
    var i = 0;
    var isAnyActiveVacation = false;
    $.each(data.vacs, function(key, value) {

        vacationData[i++] = "<input type='checkbox' class='ace vacationSelected' id='vacationSelected' onclick='updateHeaderCheckbox(this);' value='" + $.trim(data.vacs[key].id) + "'> <span class='lbl'></span>";
        vacationData[i++] = $.trim(data.vacs[key].id);
        vacationData[i++] = '<a class="noDecoration" user="'+$.trim(data.vacs[key].user)+'" onclick=javascript:showUserProfile(this)>'+$.trim(data.vacs[key].userName)+'</a>';
        var fromDate = $.trim($.format.date(data.vacs[key].fromDate, userPreferences.dateFormat));
        vacationData[i++] = fromDate;
        var toDate = $.trim($.format.date(data.vacs[key].toDate, userPreferences.dateFormat));
        vacationData[i++] = toDate;
        vacationData[i++] = '<a class="noDecoration" user="'+$.trim(data.vacs[key].substitute)+'" onclick=javascript:showUserProfile(this)>'+$.trim(data.vacs[key].substituteName)+'</a>';
        vacationData[i++] = $.trim(data.vacs[key].description);
        vacationData[i++] = $.trim(data.vacs[key].user);
        vacationData[i++] = $.trim(data.vacs[key].substitute);
        vacationTable.fnAddData(vacationData, false);
        var today = toDateObj($.format.date(new Date(), "yyyy/MM/dd"));
        if (cuser == data.vacs[key].user && toDateObj(fromDate) <= today && toDateObj(toDate) >= today) {
            isAnyActiveVacation = true;
        }
        i = 0;
    });
    vacationTable.fnDraw(true);
    $('table thead th input:checkbox').prop('checked', '');
    isSubstituteMandatory = data.isSubstituteMandatory;
    isAbsenceManager = data.isAbsenceManager;
    if (data.isAbsenceManager != undefined && data.isAbsenceManager != 'true') {
        $('#user').prop('disabled', true);
    }
    removeLoading($('#vacationsTableDiv'));
    var activeVacationID = $('#activeVacationID').text();
    if (activeVacationID != "" && isAnyActiveVacation == true) {
        $('#activeVacationID').text("");
        $('#vacations input[value=' + activeVacationID + ']').prop('checked', true);
        $('#vacations input[value=' + activeVacationID + ']').closest('tr').addClass('row_selected');
        setTimeout(function() {
            openUpdateVacationModal();
        }, 500);
    } else if (isAnyActiveVacation == false) {
        $('#activeVacationEndRefID').closest('.notif-body').animate({
            bottom: 50
        }, 200).fadeOut(700, function() {
            $(this).remove();
        });
    }
}

/**
 * @Function Name   : getMatchedVacationData
 * @Description     : This function will get matched vacation records.
 **/
function getMatchedVacationData() {
    invalidSubstituteList.length = 0;
    var fromdate = $('#fromdate').val();
    var todate = $('#todate').val();
    if (isValidDateFormat(fromdate) && isValidDateFormat(todate) && isValidDateRange(toDateObj(fromdate), toDateObj(todate))) {
        var fDate = $.trim($.format.date(toDateObj($('#fromdate').val()), "dd/MM/yyyy"));
        var tDate = $.trim($.format.date(toDateObj($('#todate').val()), "dd/MM/yyyy"));
        var data = {
            action: "match",
            fromDate: fDate,
            toDate: tDate
        }
        sendAjaxCall(url, 'GET', false, false, 'json', data, function(e) {}, invalidSubstitutes);
    } else {
        populateSubstitutes();
    }
}

/** @Function Name    : invalidSubstitutes
 * @Description      : populates only valid users(who are not on vacation in between selected dates) in 	*		      substitute select box.
 * @param            : data : Response of AJAX call.
 **/
function invalidSubstitutes(data) {
    $.each(data.vacs, function(key, value) {
        var inValidUser = data.vacs[key].user;
        var inValidUserName = data.vacs[key].userName;
        invalidSubstituteList.push({
            name: inValidUserName,
            value: inValidUser,
        });
    });
    populateSubstitutes();
}

/**
 * @Function Name   : saveVacation
 * @Description     : This function will save vacation
 **/
function saveVacation() {
    if ($('#substitute option:selected').val() == $('#user option:selected').val()) {
        $("#errorMessage").text(vsame_user_sub_msg);
        $('#vacationErrorDiv').show();
        return false;
    } else {
        if ($('#vacationId').val() == undefined || $.trim($('#vacationId').val()) == '') {
            insertVacation();
        } else {
            updateVacation();
        }
    }
}

/**
 * @Function Name   : insertVacation
 * @Description     : This function will make an ajax call to save the data of vacation
 **/
function insertVacation() {
    if (isValidDate("fromdate", "todate") && isValidUser("user") && isValidSubstitute("substitute") && isValidDesc("desc")) {
        var fDate = moment($('#fromdate').val(), userPreferences.dateFormat.toUpperCase()).format("DD/MM/YYYY");
        var tDate = moment($('#todate').val(), userPreferences.dateFormat.toUpperCase()).format("DD/MM/YYYY");
        var data = {
            action: "insertVacation",
            fromDate: fDate,
            toDate: tDate,
            desc: $('#desc').val(),
            substitute: $('#substitute option:selected').val(),
            user: $('#user option:selected').val()
        }
        sendAjaxCall(url, 'POST', false, true, 'json', data, function(e) {}, saveVacationSuccess);
    }
}

/**
 * @Function Name   : updateVacation
 * @Description     : This function will make an ajax call to update the data of vacation
 **/
function updateVacation() {
    if (isValidDate("fromdate", "todate") && isValidUser("user") && isValidSubstitute("substitute") && isValidDesc("desc")) {
        var fDate = moment($('#fromdate').val(), userPreferences.dateFormat.toUpperCase()).format("DD/MM/YYYY");
        var tDate = moment($('#todate').val(), userPreferences.dateFormat.toUpperCase()).format("DD/MM/YYYY");
        var data = {
            action: "editVacation",
            id: vac_id,
            fromDate: fDate,
            toDate: tDate,
            desc: $('#desc').val(),
            substitute: $('#substitute option:selected').val(),
            user: $('#user option:selected').val()
        }
        sendAjaxCall(url, 'POST', false, true, 'json', data, function(e) {}, saveVacationSuccess);
    }
}

/**
 * @Function Name   : saveVacationSuccess
 * @Description     : This function will be called after success of save vacation.
 **/
function saveVacationSuccess(data) {
    if (data.message != undefined && (data.message.indexOf("Inserted") >= 0 || data.message.indexOf("Updated") >= 0)) {
        getVacationData();
        modalHide('saveVacationModal');
        showNotification(vsave_success_msg);
    } else if (data.message != undefined && data.message.indexOf("Invalid Date Range") >= 0) {
        $("#errorMessage").text(vdaterange_warn_msg);
    } else if (data.message != undefined && data.message.indexOf("Invalid Vacation Dates") >= 0) {
        $("#errorMessage").text(vdate_conflict_msg);
    } else if (data.message != undefined && data.message.indexOf("Invalid Substitute") >= 0) {
        $("#errorMessage").text(vinvalid_sub_warn_msg);
    } else {
        $("#errorMessage").text(vsave_exception_msg);
    }
    $('#vacationErrorDiv').show();
}

/**
 * @Function Name   : endVacation
 * @Description     : This function will make an ajax call to end the vacation
 **/
function endVacation() {
    var columnsData = getSelectedRows(vacationTable, true);
    var vacIDs = '';
    for (i = 0, j = columnsData.length - 1; i <= j; i++) {
        vacIDs += columnsData[i][1];
        if (i == j) break;
        vacIDs += ',';
    }
    vac_id = vacIDs;
    var data = {
        action: "endVacation",
        id: vac_id
    }
    sendAjaxCall(url, 'POST', false, true, 'json', data, function(e) {}, endVacationSuccess);
}

function endVacationSuccess(data) {
    if (data.message != undefined && data.message.indexOf("Deleted") >= 0) {
        getVacationData();
        modalHide('deleteVacationModal');
        showNotification(vend_success_msg);
    } else
        showErrorNotification(vend_exception_msg);
}

/**
 * @Function Name   : isValidDesc
 * @Description     : checks for is description empty
 * @param           : description id
 * @returns         : boolean
 **/
function isValidDesc(desc) {
    if ($.trim(document.getElementById(desc).value) == '') {
        $("#errorMessage").text(vempty_desc_msg);
        $('#vacationErrorDiv').show();
        $('#' + desc).focus();
        return false;
    }
    return true;
}

/**
 * @Function Name   : isValidSubstitute
 * @Description     : checks for is substitute empty
 * @param           : substitute id
 * @returns         : boolean
 **/
function isValidSubstitute(substitute) {
    var substituteVal = $('#substitute').val();
    if ($.trim(substituteVal) == '' && isSubstituteMandatory == 'true') {
        $("#errorMessage").text(vempty_substitute_msg);
        $('#vacationErrorDiv').show();
        $('#' + substitute).focus();
        return false;
    }
    return true;
}

/**
 * @Function Name   : isValidUser
 * @Description     : checks for is user empty
 * @param           : user id
 * @returns         : boolean
 **/
function isValidUser(user) {
    var userVal = $('#user').val();
    if ($.trim(userVal) == '') {
        $("#errorMessage").text(vempty_user_msg);
        $('#vacationErrorDiv').show();
        return false;
    }
    return true;
}

/**
 * @Function Name   : isValidDate
 * @Description     : This function will Validate to date,from date & description
 * @param           : Refrence of fromDate , toDate,Description field of vacation
 * @returns         : boolean
 **/
function isValidDate(varFrom, varTo) {
    var fromdate, todate, dt1, dt2, mon1, mon2, yr1, yr2, date1, date2;
    var chkFrom = document.getElementById(varFrom);
    var chkTo = document.getElementById(varTo);
    if (document.getElementById(varFrom).value == '') {
        $("#errorMessage").text(vempty_fromdate_msg);
        $('#' + varFrom).focus();
        $('#vacationErrorDiv').show();
        return false;
    } else if (document.getElementById(varTo).value == '') {
        $("#errorMessage").text(vempty_todate_msg);
        $('#vacationErrorDiv').show();
        $('#' + varTo).focus();
        return false;
    }
    return true;
}

function isValidDateFormat(val) {
    var validformat = /^\d{4}\/\d{2}\/\d{2}$/ //Basic check for format validity
    return validformat.test(val)
}

/**
 * @Function Name   : checkdate
 * @Description     : This function will Validate for special characters in date field
 * @param           : Refrence of Date field
 * @returns         : boolean
 **/
function checkdate(input) {
    var returnval = false
    if (!isValidDateFormat(input.value)) {
        $("#errorMessage").text(vdateformat_warn_msg);
        $('#vacationErrorDiv').show();
    } else { //Detailed check for valid date ranges
        var monthfield = input.value.split("/")[1]
        var dayfield = input.value.split("/")[2]
        var yearfield = input.value.split("/")[0]
        var dayobj = new Date(yearfield, monthfield - 1, dayfield)
        if ((dayobj.getMonth() + 1 != monthfield) || (dayobj.getDate() != dayfield) || (dayobj.getFullYear() != yearfield)) {
            $("#errorMessage").text(vdaterange_warn_msg);
            $('#vacationErrorDiv').show();
        } else
            returnval = true;
    }
    return returnval;
}

/**
 * @Function Name   : validatedates
 * @Description     : This function will Validate for valid date range
 * @param           : from date and to date Refrences
 * @returns         : boolean
 **/
function validatedates(varFrom, varTo) {
    var returnval = false;
    var fromdate = toDateObj($('#fromdate').val());
    var todate = toDateObj($('#todate').val());
    if (isValidDateRange(fromdate, todate)) {
        returnval = true;
    } else {
        $("#errorMessage").text(vdaterange_warn_msg);
        $('#vacationErrorDiv').show();
    }
    return returnval;
}

function isValidDateRange(fromDate, toDate) {
    var returnval = false;
    var diff = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));
    if (diff >= 0) {
        returnval = true;
    }
    return returnval;
}

/**
 * @Function Name   : updateUsers
 * @Description     : This function will make an ajax call to get users
 **/
function updateUsers() {
    substituteList.length = 0;
    var data = {};
    sendAjaxCall(intalio_bpms.task_filter.getAssignedToUsers, 'GET', false, false, 'json', data, function(e) {}, populateUsers);
}

/**
 * @Function Name   : arrayObjectIndexOf
 * @Description     : This function will find index of object
 * @param           : myArray, searchTerm, property
 * @returns         : index
 **/
function arrayObjectIndexOf(myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

/**
 * @Function Name   : populateUsers
 * @Description     : This function will populate users got as ajax response.
 * @param           : users
 **/
function populateUsers(data) {
    removeChosen('#user');
    var subOrdinatesGroup = "<optgroup label='Subordinate(s)'>",
        peersGroup = "<optgroup label='Peer(s)'>";
    assignedToData["peers"] = data.users.peers;
    assignedToData["subordinates"] = data.users.subordinates;
    for (var k = 0; k < assignedToData.subordinates.length; k++) {
        var j = $.inArray(assignedToData.subordinates[k], assignedToData.peers);
        if (j >= 0)
            assignedToData.peers.splice(j, 1);
    }
    $.each(assignedToData.peers, function(key, value) {
        var user = value.userID;
        var userName = value.userName;
        var userIndex = arrayObjectIndexOf(substituteList, user, "value");
        if (userIndex == -1)
            substituteList.push({
                name: userName,
                value: user
            });
        var isExistUser = !!$('#user option').filter(function() {
            return $(this).attr('value') === user;
        }).length;
        if (!isExistUser && user != cuser)
            peersGroup += "<option value=\"" + user + "\">" + userName + "</option>";
    });
    $.each(assignedToData.subordinates, function(key, value) {
        var user = value.userID;
        var userName = value.userName;
        var userIndex = arrayObjectIndexOf(substituteList, user, "value");
        if (userIndex == -1)
            substituteList.push({
                name: userName,
                value: user
            });
        var isExistUser = !!$('#user option').filter(function() {
            return $(this).attr('value') === user;
        }).length;
        if (!isExistUser && user != cuser)
            subOrdinatesGroup += "<option value=\"" + user + "\">" + userName + "</option>";
    });
    peersGroup += "<option value=\"" + cuser + "\" selected >" + cuserName + "</option>";
    $("#user").append(subOrdinatesGroup).append(peersGroup);
    if (isAbsenceManager != undefined && isAbsenceManager != 'true') {
        $('#user').prop('disabled', true);
    }
    setChosen('#user');
    populateSubstitutes();
}

/**
 * @Function Name   : resetVacationsFilter
 * @Description     : This function to reset vacations table filter.
 **/
function resetVacationsFilter() {
    vacationTable.fnFilter('');
    getVacationData();
}

function setChosenValue(id, value) {
    removeChosen(id);
    $(id).val(value);
    setChosen(id);
}

function setChosen(id) {
    $(id).chosen({
        placeholder_text_single: vselect_user_msg
    });
    $(id + '_chzn').css('width', '215');
}

function removeChosen(id) {
    $(id).removeAttr("class");
    $(id + "_chzn").remove();
}

function toDateObj(date) {
    var parts = date.split('/');
    var dateObj = new Date(parseInt(parts[0], 10), // year
        parseInt(parts[1], 10) - 1, // month, starts with 0
        parseInt(parts[2], 10)); // day
    return dateObj;
}
