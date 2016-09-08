/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


/** userCache stores the cache of user prefrences*/
var tableWidth = '100%';
var is_hash_updated = false;
//Un supported chars & key codes 34 "" 42 * 47 / 58 : 59 ; 60 < 61 = 62 > 63 ? 92 \ 124 |
var unSupportedKeyCodes = [34,42, 58, 59, 60, 61, 62, 63, 124];

function getIcons(id) {
    var icon;
    switch (id) {
        case "icon1":
            icon = "fa fa-dashboard";
            return icon;
        case "icon2":
            icon = "fa fa-user";
            return icon;
        case "icon6":
            icon = "fa fa-group";
            return icon;
        case "icon7":
            icon = "fa fa-bar-chart-o";
            return icon;
        case "icon8":
            icon = "fa fa-code-fork";
            return icon;
        case "icon39":
            icon = "fa fa-calendar";
            return icon;
        case "icon69":
            icon = "fa fa-list-alt";
            return icon;
        case "icon73":
            icon = "fa fa-sitemap";
            return icon;
        default:
            icon = "fa fa-angle-double-right";
            return icon;
    }
}
function showHideSidebar(){
    if ($('#sidebar .nav-list').is(':visible')){
        $('#sidebar .nav-list').slideUp(300);
        $('.sidebar-hide i').removeClass('fa-angle-up').addClass('fa-angle-down');
        $('.sidebar-hide a').attr('title','Show Menu')
    }
    else{
        $('#sidebar .nav-list').slideDown(300);
        $('.sidebar-hide i').removeClass('fa-angle-down').addClass('fa-angle-up')
        $('.sidebar-hide a').attr('title','Hide Menu')
    }
}
/** 
 * @Function Name : submitActionToURL
 * @Description     :
 * @param           : url,actionName example : logout.htm , logout
 * @returns         :
 * */
function submitActionToURL(url, actionName) {
    var formObj = $('#dashform');
    formObj.attr('action', url);
    document.getElementById('actionName').value = actionName;
    formObj.submit();
}

/** function for fade in and fadeout of back to top button * */
$(function() {
    $(window).scroll(function() {
        $('#scroll-up-btn').removeClass('hide');
        if ($(this).scrollTop() > 0) {
            $('#btn-scroll-up').fadeIn();
        } else {
            $('#btn-scroll-up').fadeOut();
        }
    });
    if(!is_ie8){
        window.onhashchange = function(event) {
            event.preventDefault();
        };
    }
    $('a[href="#"]').click(function(e) {
        e.preventDefault();
    });
    //toggleTopMenu()

    $(document).on("keypress", "input[type=text],textarea", function(event) {
        var key = event.keyCode || event.which;
        if ($.inArray(key, unSupportedKeyCodes) >= 0 && $(this).attr("aria-controls") == undefined && !$(this).parent().hasClass('search-field') && !$(this).parent().hasClass('chzn-search') && !$(this).parent().parent().hasClass('CodeMirror') && !$(this).hasClass('cronEdit') && !$(this).parent().hasClass('editable-input') && !$(this).parent().hasClass('input-group') && !$(this).hasClass('skipValidation') && !$(this).hasClass('.ui-pg-input')){
            event.preventDefault();
            return false;
        }
        else if(key==13)
           event.preventDefault();
        $(this).attr("autocomplete", "off");
    });

    $(document).on("paste", "input[type=text],textarea", function(e) {
        var element = this;
        if ($(this).attr("aria-controls") == undefined && !$(this).parent().hasClass('search-field') && !$(this).parent().hasClass('chzn-search') && !$(this).parent().parent().hasClass('CodeMirror') && !$(this).hasClass('skipValidation')) {
            setTimeout(function() {
                var textboxValue = $(element).val();
                $(element).val("");
                $(element).val(textboxValue.replace(/[<>?="';:]/g, ''));
            }, 100);
        }
    });
});


/** 
 * @Function Name   : modalShow
 * @Description     : opens the modal window
 * @param           : element ID
 * @returns         :
 * */
function modalShow(elemId) {
    $('#' + elemId).removeData("modal").modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#' + elemId + '').modal({
        toggle: true,
        show: true
    });
}

/** 
 * @Function Name   : modalHide
 * @Description     : hides the modal window based on element ID
 * @param           : element ID
 * @returns         :
 * */
function modalHide(elemId) {
    $('#' + elemId + '').modal('hide');
}

/**
 * @Function Name : isObjectEmpty
 * @Description : to check if the json object is empty or not
 * @param :      object
 * @returns :
 */

function isObjectEmpty(object) {
    var isEmpty = true;
    for (keys in object) {
        isEmpty = false;
        break; // exiting since we found that the object is not empty
    }
    return isEmpty;
}

/**
 * @Function Name   : getSelectedRows
 * @Description     : This function returns the selected rows data
 * @param           : Datatable reference
 * @returns         : selected row data
 * */
function getSelectedRows(oTableLocal, flag) {
    "use strict";
    var aReturn = new Array();
    if (oTableLocal != undefined) {
        var aTrs = oTableLocal.fnGetNodes();
        for (var i = 0; i < aTrs.length; i++) {
            if ($(aTrs[i]).hasClass("row_selected")) {
                var col = oTableLocal.fnGetData(aTrs[i]);
                if (flag == false)
                    aReturn.push(col[1]);
                else if(flag=="id")
					aReturn.push($(col[0]).find('input').attr('value'));
                else
                    aReturn.push(col);
            }
        }
    }
    return aReturn;
}

/**
 * @Function Name   : addLoading
 * @Description     : add the loading hover glass icon for a particular element id
 * @param           : element id
 * @returns         :
 * */
function addLoading(elm, check) {
    if ($('#loading').length == 0) {
        $(elm).addClass('shadow');
        $(elm).before('<div id="loading"><i class="fa fa-spinner fa-spin fa-2x orange"></i></div>');
        if ($(elm).height() / 2 > ($(window).height() / 2)) {
            $('#loading').css('margin-top', ($(window).height() - 150) / 2);
        } else {
            $('#loading').css('margin-top', ($(elm).height()) / 2);
        }
        if ($('#loading').closest('.modal').length == 0) {
            if ($('#sidebar').hasClass('h-sidebar') && $(elm).attr('id') == 'main-content') {
                $('#loading').css({
                    'width': '50px',
                    'margin-left': $(window).width() / 2 + 'px'
                });
            } else
                $('#loading').css('width', $(elm).css('width'));
        }

        if (check)
            $('#loading').css('margin-top', '0px')
    }
}

/**
 * @Function Name   : removeLoading
 * @Description     : removes the hover glass icon
 * @param           : element id
 * @returns         :
 * */
function removeLoading(elm, check) {
    setTimeout(function() {
        if (!check) {
            $(elm).removeClass('shadow');
            $('.shadow').removeClass('shadow');
            $('#loading').remove();
        } else {
            $('.shadow').removeClass('shadow');
            $('#loading').remove();
        }
    }, 500);
}

/**
 * @Function Name   : showInformation
 * @Description     : open the modal window with text message
 * @param           : message
 * @returns         :
 * */
function showInformation(textMsg) {
    $('#information-dialog').find('.information').html(textMsg);
    modalShow('information-dialog');
}

function customTable(tableId) {
    $('#' + tableId).css('width', tableWidth);
    if($.browser.msie && $.browser.version==='8.0'){
        $('#' + tableId + '_wrapper .row .col-sm-6:first').removeClass('col-sm-6').addClass("col-sm-9 tableButtons");
        $('#' + tableId + '_wrapper .row .col-sm-6:first').removeClass('col-sm-6').addClass("col-sm-0 searchBoxTasks");
    }else{
        $('#' + tableId + '_wrapper .row .col-sm-6:first').removeClass('col-sm-6').addClass("col-sm-10 tableButtons");
        $('#' + tableId + '_wrapper .row .col-sm-6:first').removeClass('col-sm-6').addClass("col-sm-0 searchBoxTasks");
    }

    $('#' + tableId + '_wrapper .row:first').css({
        "background-color": "#FFFFFF",
        'height': '40px'
    });
    $('#' + tableId + '_wrapper .row:last').css("background-color", "#FFFFFF").css("border-bottom", 0).css('padding-bottom', 0);
    $('#' + tableId + '_wrapper .row:first').css("padding", "0");
    $('#' + tableId + '_wrapper .row:first').css("padding-bottom", "8px");
    $('#' + tableId + '_wrapper .row:last .col-sm-6:first').remove();
    $('#' + tableId + '_wrapper .row:last .col-sm-6').removeClass('col-sm-6').addClass('col-sm-12 table_pagination');
    $('#' + tableId + '_filter').find('input').attr('placeholder', $("#dtSearchPlaceHolder").text());
    if ($('#' + tableId + '_filter').find('.table_refresh_icon').length == 0)
        $('#' + tableId + '_filter').append(getToolbarIconsCodes("viewAllTask"));
    $('.sorting_disabled').css('color', '#707070');
    $('#' + tableId + '_filter').find('label').attr({"data-content":$("#enterToApply").text(),"data-placement":"bottom","data-trigger":"hover"}).popover();
    $('#' + tableId + '_filter input').unbind();
    if(tableId!="webBasedModeler"){
        $('#' + tableId + '_filter input').bind('keyup', function(e) {
           var code = e.keyCode || e.which; 
           if (code  == 13 || this.value==""){
               e.preventDefault();
               $('#'+tableId).dataTable().fnFilter(this.value);
               return false;
           }
        });
    }
}

function updateCheckbox(obj) {
    if ($(obj).prop('checked')) {
        $(obj).closest('table').find('tr > td:first-child input:checkbox')
            .each(function() {
                this.checked = obj.checked;
                $(this).closest('tr').addClass('row_selected');
            });
    } else {
        $(obj).closest('table').find('tr > td:first-child input:checkbox')
            .each(function() {
                this.checked = obj.checked;
                $(this).closest('tr').removeClass('row_selected');
            });
    }
}

function updateHeaderCheckbox(obj) {
    if ($(obj).attr('checked')) {
        $(obj).closest('tr').addClass('row_selected');
        $(obj).prop('checked', true);
    } else {
        $(obj).closest('tr').removeClass('row_selected')
        $(obj).prop('checked', false);
    }
    var count1 = 0;
    var count2 = 0;
    $(obj).closest('table').find('tr > td:first-child input:checkbox')
        .each(function() {
            if (this.checked)
                count1 += 1;
            count2 += 1;
        });
    if (parseInt(count2) == parseInt(count1))
        $(obj).closest('table').find('tr > th:first-child input:checkbox').prop('checked', true);
    else
        $(obj).closest('table').find('tr > th:first-child input:checkbox').prop('checked', false);
}

function updateRadioButton(obj) {
    $(obj).closest('table').find('tr').each(function() {
        $(this).removeClass('row_selected');
    });
    $(obj).closest('tr').addClass('row_selected');
}

/**
 * @Function Name   : validateEmail
 * @Description     : to validate email property
 * @param           : mail id
 * @returns         :
 * */
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * @Function Name   : removeChosen
 * @Description     : removes all the child objects based on element ID & its chosen class
 * @param           : element id
 * @returns         :
 * */
function removeChosen(id) {
    $("#" + id).empty();
    $("#" + id).removeClass("chzn-done");
    $('#' + id).css('display', 'block');
    $("#" + id + "_chzn").remove();
}

function showNotification(msg, flag) {
    if (flag != undefined && flag == true && msg != undefined)
        $('#notificationMessage').append('<div class="notif-body licenceNotif"><button  class="close notifClose" type="button" onclick="javascript:removeNotification(this)" title="close">&times;</button><div class="licenceText">' + msg + '</div></div>');
    else if (msg != undefined) {
        $('#notificationMessage').append('<div class="notif-body" style="top:0"><button  class="close notifClose" type="button" onclick="javascript:removeSuccessNotification(this)" title="close">&times;</button><div>' + msg + '</div></div>');
        $('#notificationMessage .notif-body:last').animate({
            bottom: 50
        }, 1000).delay(6000).fadeOut(700, function() {
            $(this).remove();
        });
    }
}

function removeSuccessNotification(obj) {
	$(obj).closest('.notif-body').remove();
}

function removeNotification(obj) {
    $(obj).closest('.notif-body').animate({
        bottom: 50
    }, 200).fadeOut(700, function() {
        $(this).remove();
    });
}

function showErrorNotificationFade(msg) {
	$('#notificationMessage').append('<div class="Error-notif-body notif-body errorNotif"><div class="errorText">' + msg + '</div></div>');
	$('#notificationMessage .notif-body:last').animate({
			bottom: 50
		}, 1000).delay(6000).fadeOut(700, function() {
			$(this).remove();
		});
}

function showErrorNotification(msg) {
    $('#notificationMessage').append('<div class="Error-notif-body notif-body errorNotif"><button  class="close notifClose" type="button" onclick="javascript:removeNotification(this)" title="close">&times;</button><div class="errorText">' + msg + '</div></div>');
    removeLoading();
}

function setDropdownPosition(obj) {
    var elmPosition = $(obj).offset();
    $(obj).next().css('left', (elmPosition.left - $(obj).next().width() + 23)).css('top', (elmPosition.top + 18)).css('right', 'auto');
}

function adjustModal(modalId, width) {
    if (width < $(window).width() - 50) {
        $('#' + modalId + ' .modal-dialog').animate({
            width: width
        }, 500);
    } else {
        $('#' + modalId + ' .modal-dialog').animate({
            width: $(window).width() - 30
        }, 500);
    }
}

function sortFilterStatus(obj) {
    var object = [];
    var originalObj = ['Active', 'Completed', 'Failure', 'Failed', 'Suspended', 'Terminated']
    $.each(originalObj, function(i, k) {
        $.each(obj, function(key, value) {
            if (value.name == k)
                object.push(value);
        });
    });
    return object;
}

function validateIsNumeric(event) {
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105))
            event.preventDefault();
    }
}

function compareObjects(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function checkFlash() {
    var hasFlash = false;
    try {
        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (fo) {
            hasFlash = true;
        }
    } catch (e) {
        if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] != undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
            hasFlash = true;
        }
    }
    return hasFlash;
}

function loadJs(file, returnFunction) {
    //$.getScript(file, returnFunction);
    /* for debugging scripts */
    var head=document.getElementsByTagName("head")[0];
    var script=document.createElement('script');
    script.src=file;
    script.type='text/javascript';
    //real browsers
    script.onload=returnFunction;
    //Internet explorer
    script.onreadystatechange = function() {
        if (this.readyState == 'complete') {
            returnFunction();
        }
    }
    head.appendChild(script);
    /* end */
}

function loadCss(url, callback) {
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", url)
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
    if (typeof callback == 'function')
        callback();
}

function applyNiceScroll(obj, height,fixedHeight,xScroll) {
    xScroll = xScroll || false;
	$(obj).perfectScrollbar('destroy');
	height = $('#sidebar').hasClass('h-sidebar') ? height + 65 : height
	if ($(obj).height() > $(window).height() - height || $(obj).height()===0)
		$(obj).css('height', $(window).height() - height);
    if (fixedHeight){
        $(obj).css('height', fixedHeight);
    }
	$(obj).css({overflow:"hidden",position:"relative"});
	$(obj).perfectScrollbar({suppressScrollX:xScroll});
}

function updateHashUrl(vals,check) {
    var hash = window.location.hash
    is_hash_updated = true
    if (!check) {
        s = '?'
        $.each(vals,function(key,val){
            s += key+'='+val+'&'
        });
        s = s.substring(0, s.length - 1);
        $(window).unbind('hashchange');
        window.location.hash = hash.split('?')[0] + s
        setTimeout(function(){
            $(window).bind('hashchange',hashChageTrigger);
        },200);
    }
}


function confirmDelete(heading, msg, success) {
    var obj = $('#deleteModal');
    obj.find('.modal_heading').text(heading).end()
        .find('.modal-body').html(msg).end()
        .find('.modalDeleteConfirm').attr('onclick', success);
    modalShow('deleteModal');
}
/* will be called on completion of syncing users db in users page */
function syncUsersDb() {
    modalHide('syncUsersModal');
    $('#syncButton').attr('disabled', true);
    sendAjaxCall(defaults.sync_users, "POST", false, true, "json", {}, handleSyncError, function(data) {
        if (data["sync-success"] != undefined) {
            showNotification(data["sync-success"])
            if (typeof ou.getStatus != "undefined" && typeof ou.getStatus != undefined)
                ou.getStatus();
        } else
            showErrorNotification(data["sync-error"])
        $('#syncButton').attr('disabled', false);
        getSyncTime();
    });
}

function handleSyncError(response) {
    if (response["sync-error"] != undefined)
        showErrorNotification(response["sync-error"]);
}
/* this function is used in roles page for synching roles from security provider.*/
function syncRoles() {
    $('#rolesSyncButton').attr('disabled', true);
    sendAjaxCall(intalio_bpms.org_mapping_roles.roles_sync, "POST", false, true, "json", {}, handleSyncError, function(data) {
        if (data["sync-success"] != undefined) {
            showNotification(data["sync-success"])
            if (typeof getStatusOfInUser != undefined && typeof getStatusOfInUser != "undefined")
                getStatusOfInUser();
        } else
            showErrorNotification(data["sync-error"])
        $('#rolesSyncButton').attr('disabled', false);
    });
}

/**
 * @Function Name   : showPaginationEntires
 * @Description     : This method is use to show numbers of entries in a table.
 * @param           : startNumber,endNumber,Obj
 * */
function showPaginationEntires(startNumber, endNumber, obj, pageText) {
    $("#" + obj + " .showEntries").remove();
    if (parseInt(endNumber) > parseInt(0)) {
        $("#" + obj + " .table_pagination").removeClass('hide');
        var message = $("#datatablePageInfo").text().replace('{0}',startNumber).replace('{1}',endNumber).replace('{2}',totalRecords).replace('{3}',pageText);
        $("#" + obj + " .table_pagination").append("<div class='showEntries'><label>"+message+"</label></div>");
    } else
        $("#" + obj + " .table_pagination").addClass('hide');
}

/** 
 * @Function Name   : updatePaginationTable
 * @Description     : updates the pagination buttons
 * @param           : pageNo,totalPages
 * */
function updatePaginationTable(pageNo, totalPages) {
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

function testing(){
    $('#showHideColumnsData').addClass('hide')
}

function testing2(){
    $('#showHideColumnsData').removeClass('hide')
}

function applySelectize(obj,optGroup,optOrder,maxItems,create,options){
	var optionValues = [];
	if(options!=undefined && options.length>=1)
		optionValues = options;
	var selObj = obj.selectize({
		maxItems: maxItems,
		labelField: 'value',
		valueField: 'id',
		optgroupField: 'group',
		optgroupLabelField: 'name',
		optgroupValueField: 'id',
		plugins: ['remove_button'],
		optgroups: optGroup,
		optgroupOrder: optOrder,
		searchField: ['value'],
		options: optionValues,
		create: create,
		render: {
			optgroup_header: function(data, escape) {
				return '<div class="optgroup-header">' +escape(data.name)+'</span></div>';
			},
			item : function (data,escape){
				return '<div class="item" data-source="'+data.source+'" data-value="'+data.id+'">'+data.value+'</div>';
			}
		}
	});
	return selObj[0].selectize;
}
function convertDateTimeFormat(str){
    return $.format.date(str, userPreferences.dateFormat+userPreferences.hourFormat)
}

function convertHeadingTypo(str){
    str = str || ''
    if (str.indexOf('jndi') > -1 || str.indexOf('url') > -1){
        str = str.toUpperCase()
    } else {
        str = str.toLowerCase()
        str = str.replace('_',' ');
        var words = str.split(' ');
         var newWords = []
        for (var i =0; i < words.length ; i++){
            newWords.push(capitaliseFirstLetter(words[i]));
        }
        str = newWords.join(' ')
    }
    return str

}

function capitaliseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*Other user profile display*/
var userProfileFields = {
    'userDisplayName':'name',
    'userId':'userId',
    'gender':'genderObj',
    'dob':'dob',
    'skills':'skills',
    'manager':'managerName',
    'email':'email',
    'secondaryEmail':'secondaryEmail',
    'phone':'phone',
    'mobile':'mobile',
    'address':'address',
    'street':'street',
    'city':'city',
    'state':'state',
    'zip':'zip',
    'country':'countryObj'
};

/*Common function for whole BPMS UI to display user profile of any user*/
function showUserProfile(aobj){
    modalShow("userProfileModal");
    addLoading($("#userProfileModal").find('.modal-body'));    
    getUserprofileData($(aobj).attr('user'));
}

/*Fetches the user profile data based on userID*/
function getUserprofileData(userId){
    $.each(userProfileFields,function(key,value){
        $("#ot"+key).text('');
    });
    addLoading($("#userProfileModal").find('.modal-body'));
    $("#userProfileModal").find("#otavatar").attr('src','ui-fw/user/avatar?user='+userId+'&date='+new Date());
    if(userId!=""){
        var data = {
            user:userId
        }
        sendAjaxCall(intalio_bpms.user_preferences.profile, "GET", false, true, "json",data, handleProfileError, function(responseData){
            populateUserProfile(responseData);
        });
    }
}

/*Populates the user profile data in user profile modal window*/
function populateUserProfile(data){
    var dataObj = data.userProfile;
    $.each(userProfileFields,function(key,value){
        if(key=="gender" && dataObj.genderObj)
            $("span#ot"+key).text(dataObj.genderObj.value); 
        else if(key=="country" && dataObj.countryObj)
            $("span#ot"+key).text(dataObj.countryObj.value); 
        else
            $("span#ot"+key).text(dataObj[value]);
    });
    $("#userProfileModal").find('.modal_heading').text(data.userProfile.name);
    if(data.userProfile.dob)
        $("span#otDob").text(moment(data.userProfile.dob,"yyyy-mm-dd".toUpperCase()).format(userPreferences.dateFormat.toUpperCase()));
    if($("#otManager").text()=="")
        $("#otManager").text(data.userProfile.manager)
    removeLoading();
}

function handleProfileError(error){
    removeLoading();
    showErrorNotification(error);    
}

function updateProfileIcon(obj){
    if($(obj).hasClass('collapsed'))
        $(obj).find('i.fa').removeClass('fa fa-angle-right').addClass('fa fa-angle-down');
    else
        $(obj).find('i.fa').removeClass('fa fa-angle-down').addClass('fa fa-angle-right');
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
            this.checked = obj.checked;
            $(this).closest('tr').addClass('row_selected');
        });
}

function unSelectAll(obj) {
$(obj).closest('table').find('tr > td:first-child input:checkbox')
    .each(function() {
        this.checked = obj.checked;
        $(this).closest('tr').removeClass('row_selected');
    });
}