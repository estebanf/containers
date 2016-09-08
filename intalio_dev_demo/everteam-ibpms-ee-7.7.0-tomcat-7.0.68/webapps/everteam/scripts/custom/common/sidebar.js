/**
 * Copyright (C) 2005-2014 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/** response data stores the data from moduleAccess.json server call .*/
var responseData;
/** userCache stores user preferences. */
var userCache;
/**
 * Following variable is used to calculate idle time of logged in user.
 **/
var time = 0;
/**
 * Following timeCount variable is used as a standard time.If the idle time of logged in user goes beyond this,will show idle message.
 **/
var timeCount = 60000; // 1 minute 
/**
 * Following sessionTimeout variable is used as a standard time.If the idle time of logged in user goes beyond sessionTimeout then will show popup to logout.
 **/
var sessionTimeout;
var isSuperAdmin=false;
var BPMSCurrentPage;
var moduleIdsHavingHistory = ['moduleID6'];
/** widgetAccessArray data stores the data of widgets id's which has access to logged in user.*/
var widgetAccessArray = new Array();
var isUserFilterAccessible = false;
var userFilterModuleId = 41;//used for dashboard filter's
var hasManager = false;//used for org mapping
var userPreferences = {//used for user preferences
	fixedHeader  : false,
	topMenu    : false,
	font       : "SegoeUI",
	dateFormat : "yyyy/MM/dd",
	hourFormat : " hh:mm:ss a",//don't remove space before hh
	theme      : "no-skin"
}
var moduleIds = {
        '/dashboard': 'moduleID1',
        '/workflow': 'moduleID2',
        '/workflow/tasks': 'moduleID3',
        '/workflow/notifications': 'moduleID4',
        '/workflow/processes': 'moduleID5',
        '/collaboration': 'moduleID6',
        '/reports': 'moduleID7',
        '/reports/preDefinedReports' : 'moduleID67',
        '/reports/adhocReports' : 'moduleID68',
        '/businessRules': 'moduleID69',
        '/vacations': 'moduleID39',
        '/administration': 'moduleID8',
        '/administration/monitoring': 'moduleID9',
        '/administration/monitoring/processes': 'moduleID10',
        '/administration/monitoring/instances': 'moduleID11',
        '/administration/auditing': 'moduleID12',
        '/administration/auditing/workflow': 'moduleID14',
        '/administration/auditing/instances': 'moduleID13',
        '/administration/accessControl': 'moduleID15',
        '/administration/accessControl/roles': 'moduleID16',
        '/administration/accessControl/users': 'moduleID17',
        '/administration/accessControl/modules': 'moduleID18',
        '/administration/logging': 'moduleID19',
        '/administration/logging/log4j': 'moduleID20',
        '/administration/logging/markerInLogFile': 'moduleID21',
        '/administration/logging/downloadLogFile': 'moduleID22',
        '/administration/utilities': 'moduleID23',
        '/administration/utilities/downloadConfigFiles': 'moduleID24',
        '/administration/utilities/manageTimers': 'moduleID25',
        '/administration/utilities/clearTmsCache': 'moduleID26',
        '/administration/organization': 'moduleID64',
        '/administration/organization/roles': 'moduleID65',
        '/administration/organization/hierarchies': 'moduleID66',
        '/administration/productInfo': 'moduleID71',
        '/user/profile': 'moduleUserProfile',
        '/administration/auditing/businessRules': 'moduleID72',
        '/modeler': 'moduleID73'
    }
    /**
     * @Function Name   : ready
     * @Description     : jquery ready function for siderbar
     * @param           :
     * @returns         :
     * */

//Jquery ready function for sidebar
$(document).ready(function() {
    $.timer(timeCount, function(timer) {
        time = time + 1;
        if (time >= sessionTimeout) {
            timer.stop();
            log_me_out();
        }
    });
    $("html").mousemove(function(e) {
        resetTimer();
    });
    $(this).click(function() {
        resetTimer();
    });
    var data = {};
    
    sendAjaxCall(intalio_bpms.sidebar.license_validate, "GET", false, true, "json", data, handleAjaxError, updateResponseData);
    
    sendAjaxCall(intalio_bpms.sidebar.get_avatar+new Date(), "GET", false, true, "",{}, handleAjaxError, function(data){
		if(!$.isEmptyObject(data) && data.msg!="error")
			$(".bpms_user_photo").attr("src","ui-fw/user/avatar?"+new Date());
	});
    getPreferences();
    $(window).bind('hashchange',hashChageTrigger);
    $('#sidebar ul li a,#moduleUserProfile a').click(function(event) {
        if (!($(this).hasClass('parent-menu'))) {
            var id = $(this).closest('li').attr('id');
            event.preventDefault();
            var hash = window.location.hash.replace('#', '')
            hash = hash.split('?')
            var mid = hash[0]
            if (!(hash.length > 1 && getHashId(id) == mid)) {
                $(window).unbind('hashchange');
                window.location.hash = '#' + getHashId(id);
                setTimeout(function(){
                    $(window).bind('hashchange',hashChageTrigger);
                },1000);
             }
         }
    });
});

/**
 * @Function Name   : hashChageTrigger 
 * @Description     : This will be called on change of hash in URL.
 * @param           : 
 * @returns         : 
/**/
function hashChageTrigger(){
    var hashId = null
    if (window.location.hash) {
        var hash = window.location.hash.replace('#', '')
        hashId = hash.split('?')[0]
    }
    if (hashId != null && hashId!="/user/profile"){
        var moduleId = moduleIds[hashId]
        if (!moduleId)
            return false
        if (moduleIdsHavingHistory.indexOf(BPMSCurrentPage) > -1 && hash.indexOf('?') > -1){
            gotoModuleHistory(BPMSCurrentPage,hash);
        }
        else {
            userCache.collaborationPage = null
            $.jStorage.set($("#userid").text(), userCache);
            $("#sidebar ul li#" + moduleId).find('a[onclick]:first').click();
        }
    } else if (hashId=="/user/profile"){
        $("#moduleUserProfile a").click();
    }
     else {
        return false;
    }
}

function stripTrailingSlash(str) {
    if(str.substr(-1) == '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}

function gotoModuleHistory(id,hash){
    switch (id) {
        case "moduleID6": 
            gotoCollaborationHistory(hash);
            break;
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.hash);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * @Function Name   : resetTimer 
 * @Description     : Method to reset the timer, and the timer notice text
 * @param           : 
 * @returns         : 
/**/
function resetTimer() {
    time = 0;
    $("#inActiveTimer").text("");
}


/**
 * @Function Name   : log_me_out() 
 * @Description     : clear the session, call logout on the server
 * @param           : 
 * @returns         : 
/**/
function log_me_out() {
    modalShow('sessionExpired');
}

/**
 * @Function Name   : updateResponseData
 * @Description     : Updates the response data with varibale responseData
 * @param           : data bam acces & user name
 * @returns         :
 * */
function updateResponseData(data) {
    if (data.currentUser == undefined || data.currentUser == null || $.trim(data.currentUser) == '')
        submitActionToURL('login.htm', 'logOut');
    else {
        responseData = data;
        if (data.manager)
            hasManager = true;
        if(data.isSuperAdmin=="true")
            isSuperAdmin = true;
        updateDOM(data);
        sessionTimeout = data.sessionTimeout;
        $('body').find("#user_info").text(data.currentUserName);
        $('body').find("#userid").text(data.currentUser);
        if(data.license)
            cur_date = new Date(data.license);
        if (data.licenseStatus == "EXPIRED") {
            var licenseMessage = $('#licenseExpiredMsg').text();
            if(cur_date){
                cur_date.setDate(cur_date.getDate() + 30);
                licenseMessage = licenseMessage.replace('{0}', data.license);
                licenseMessage = licenseMessage.replace('{1}', cur_date.getFullYear()+"-"+("0"+parseInt(cur_date.getMonth()+1)).slice(-2)+"-"+("0"+cur_date.getDate()).slice(-2));
                licenseMessage = licenseMessage.replace('{2}', "<a class='blue noDecoration' href='mailto:sales@intalio.com'>sales@intalio.com</a>");
            }
            showNotification(licenseMessage, true);
        } else if (data.isAdmin && data.licenseStatus=="EXPIRING") {
            var licenseMessage = $('#licenseExpiryMsg').text();
            if(cur_date){
                licenseMessage = licenseMessage.replace('{0}', cur_date.getFullYear()+"-"+("0"+parseInt(cur_date.getMonth()+1)).slice(-2)+"-"+("0"+cur_date.getDate()).slice(-2));
                licenseMessage = licenseMessage.replace('{1}', "<a class='blue noDecoration' href='mailto:sales@intalio.com'>sales@intalio.com</a>");
            }
            showNotification(licenseMessage, true);
        }
        if (data.activeVacation != undefined && data.activeVacation != null) {
            var vacationMessage = "<div class='nowrap' style='padding-right:30px'>" + $('#activeVacationMsg').text() + "</div>";
            vacationMessage += $('#activeVacationMsg2').text();
            vacationMessage = vacationMessage.replace('{0}', "<a class='blue noDecoration' id ='activeVacationEndRefID' href='#' onClick='showActiveVacation(" + data.activeVacation.id + ");'>" + $('#activeVacationActionMsg').text() + "</a>");
            showNotification(vacationMessage, true);
        }
        sendAjaxCall(intalio_bpms.sidebar.module_access, "GET", false, true, "json", {}, handleAjaxError, displayHtmlModules);
    }
}

/**
 * @Function Name   : showActiveVacation
 * @Description     : shows Active Vacation for user on notification action
 * @param           : active vacation ID
 **/
function showActiveVacation(vacID) {
    $("#vacationsMenuTabID").trigger("click");
    $('#activeVacationID').text(vacID);
}

/**
 * @Function Name   : updateDOM
 * @Description     : Updates the dom elements according to user data.
 * @param           : user data
 * @returns         :
 * */
function updateDOM(data) {
    if (data.currentUser != undefined)
        userCache = $.jStorage.get(data.currentUser);
    if (userCache != null && userCache != undefined) {
        if (userCache.sidebarCollapsed) {
            $('body').find('#sidebar').addClass('menu-min');
            $('#sidebar-collapse').html('<i class="fa fa-angle-double-right null"></i>');
        }
        if (userCache.navBarFixed) {
            $('body').find('#ace-settings-header').prop('checked', true);
            $('body').addClass('navbar-fixed');
            $('body').find('#navbar-top').addClass('navbar-fixed navbar-fixed-top');
        }
        if (userCache.sidebarFixed) {
            $('#ace-settings-sidebar').prop('checked', true);
            $('body').find('#sidebar').addClass('fixed');
        }
        if (userCache.topMenuLayout) {
            toggleTopMenu(userCache.topMenuLayout)
        }
    } else {
        userCache = new UserCache(false, false, false, null, null, null, null, null, null, null, null, null, null, null, null);
        $.jStorage.set(data.currentUser, userCache);
    }
}

/**
 * @Function Name   : displayHtmlModules
 * @Description     : validates user and shows menu elements accordingly
 * @param           : data list of modules which logged in user roles has access
 * @returns         :
 * */

function displayHtmlModules(data) {
    var hashId = null
    if (data.module != undefined && data.module.length > 0) {
        $.each(data.module, function(key, value) {
            if (parseInt(value) > parseInt(40))
                widgetAccessArray[widgetAccessArray.length] = value;
            if (value != 7 && value!=69)
                $("#sidebar ul li#moduleID" + value).removeClass('hide');
            else if (value == 7 && responseData.bamAccess == "true")
                $("#sidebar ul li#moduleID" + value).removeClass('hide');
            else if(value==69 && responseData.breAccess=="true")
                $("#sidebar ul li#moduleID" + value).removeClass('hide');
        });
    } else if (data.error_message != undefined)
        showErrorNotification(data.error_message);
    else{
        $("#sidebar").addClass("hide");
        $("#main-content").addClass("noAccessToAnyModule");
        $("#main-content").text($('#unauthorizedUser').text());
    }
    $("#sidebar ul li.hide").remove();
    if (window.location.hash) {
        var hash = window.location.hash.replace('#', '')
        hashId = hash.split('?')[0]
    }
    if (hashId != null && hashId!="/user/profile")
        $("#sidebar ul li#" + moduleIds[hashId]).find('a[onclick]:first').click();
    else if(hashId=="/user/profile")
		$("#user_menu li#"+moduleIds[hashId]).find('a[onclick]:first').click();
    else if (userCache != null && userCache.lastPageOpened != null){
        if($("#sidebar ul li#" + userCache.lastPageOpened).length > 0)
			$("#sidebar ul li#" + userCache.lastPageOpened).find('a[onclick]:first').click();
		else
			$("#user_menu li#"+userCache.lastPageOpened).find('a[onclick]:first').click();
    }
    else
        $("#sidebar ul li#moduleID" + data.module[0]).find('a[onclick]:first').click();
    if (jQuery.inArray(parseInt(userFilterModuleId), data.module) == -1)
        isUserFilterAccessible = false;
    else
        isUserFilterAccessible = true;
	$("#sidebar-collapse").removeClass("hide");
}

/**
 * @Function Name   : getPreferences
 * @Description     : get the logged in user preferences & applies it accordingly.
 * */
function getPreferences(){
	sendAjaxCall(intalio_bpms.user_preferences.preferences, "GET", false, true, "json", {}, handleAjaxError, function(response){
		if(response!=undefined ){
			if (typeof userPref == "undefined"){
				loadJs("scripts/custom/preferences/userPreferences.js", function() {
					applyPreferences(response);
            
			     });
            }
		    else
			 applyPreferences(response);
		}
	});
}

function applyPreferences(response){
    var pref;
    if (response.userPreferences)
        pref = response.userPreferences
    else
        pref = userPreferences
	pref.fixedHeader == "1" ? userPref.applyFixHeader(true) : userPref.applyFixHeader(userPreferences.fixedHeader);
	pref.topMenu   == "1" ? userPref.applyTopMenu(true) : userPref.applyTopMenu(userPreferences.topMenu);
	pref.fontStyle != undefined ? userPref.applyFont(pref.fontStyle) : userPref.applyFont(userPreferences.font); 
	pref.dateFormat !=undefined ? userPref.applyDateFormat(pref.dateFormat) : userPref.applyDateFormat(userPreferences.dateFormat);
	pref.theme != undefined ? userPref.applyTheme(pref.theme) : userPref.applyTheme(userPreferences.theme);
}

/**
 * @Function Name   : selectMenuAndChangepage
 * @Description     : loads the page 
 * @param           : current object, menu Id, url
 * @returns         :
 * */
function selectMenuAndChangepage(curObj, menuId, url) {
    pingServer();
    if ($(curObj).parent().attr('id') != "sidebar-shortcuts-large") {
        var iconObject = "";
        var iconEvent;
        $('#sidebar ul li').removeClass('active');
        $('#sidebar ul li').removeClass('open');
        if ($(curObj).closest("ul").hasClass('submenu')) {
            $(curObj).closest("ul").parent().addClass('active open');
            if ($(curObj).closest("ul").parent().closest("ul").hasClass('submenu'))
                $(curObj).closest("ul").parent().closest("ul").parent().addClass('active open');
            if ($(curObj).closest("ul").parent().closest("ul").parent().closest("ul").hasClass('submenu'))
                $(curObj).closest("ul").parent().closest("ul").parent().closest("ul").parent().addClass('active open');
            $(curObj).closest("li").addClass('active');
        } else {
            $('#sidebar ul li').removeClass('open');
            $('.submenu').css('display', 'none');
            $(curObj).closest("li").addClass('active');
        }
        $("#menu-toggler").removeClass('display');
        $("#sidebar").removeClass('display');
        if (responseData.currentUser != undefined && responseData.currentUser != null)
            userCache = $.jStorage.get(responseData.currentUser);
        var id = $(curObj).parent().attr('id');
        var lastPageOpened = id;
        if (id != null && id != undefined && userCache != null && userCache != undefined) {
            userCache.lastPageOpened = lastPageOpened;
            $.jStorage.set(responseData.currentUser, userCache);
        }
    }
    if (is_ie8 && id=='moduleID68'){
        showInformation($("#ie8_adhoc_msg").text());
        return false;
    }
    changePage(id, url);
    return false;
}

/**
 * @Function Name   : changePage
 * @Description     : loads the particular jsp file into main content div.
 * @param           : Menu Id , url
 * @returns         :
 * */
function changePage(id, url) {
    BPMSCurrentPage = id
    $('.page-content iframe').remove();
    setTimeout(function(){
        $('#textFocus').focus();
    },1000)
    
    //this line will load actual jsp file into main content div
    $("#main-content").load(url);
    
    addLoading($("#main-content"));
    if ($('#sidebar').hasClass('h-sidebar'))
        $('#loading').css('margin-left', $(window).width() / 2 - 20 + 'px');
    else if ($('#sidebar').hasClass('menu-min'))
        $('#loading').css('margin-left', 100);
    else
        $('#loading').css({
            'margin-left': 190,
            width: $('#main-content').width() - 200 + 'px'
        });
    $('#loading').css('margin-top', 200);
}

function getHashId(id) {
    for (var key in moduleIds) {
        if (id == moduleIds[key])
            return key
    }
}
/**
 * @Function Name   : clearTMSCache
 * @Description     : clears the TMS cache
 * @param           :
 * @returns         :
 * */
function clearTMSCache() {
    var data = {};
    sendAjaxCall("ode/processes/TaskManagementServices/clearCache", "GET", false, true, "json", data, handleClearTMSError, function(response) {
        showNotification($('#clearTMSCacheSuccess').text());
    });
}

/**
 * @Function Name   : handleClearTMSError
 * @Description     : handles the ajax error for clear TMS cache
 * @param           :
 * @returns         :
 * */
function handleClearTMSError() {
    showInformation("Error occurred while executing clear TMS cache");
}

/**
 * @Function Name   : errorCall
 * @Description     : handles all the error response for ajax calls
 * @param           :
 * @returns         :
 * */
function handleAjaxError(e) {
    removeLoading('', true);
    showInformation(e.responseText);
    return false;
}

function openMarkerModel() {
    $('#markerText').val("");
    $('#emptyMarkerText').addClass('hide');
    modalShow('marker');
}

function addMarker() {
    if ($('#markerText').val() == null || $.trim($('#markerText').val()) == "") {
        $('#markerButton').removeAttr('data-dismiss');
        $('#emptyMarkerText').text($('#markerComment').text());
        $('#emptyMarkerText').removeClass('hide');
        return false;
    } else {
        $('#markerButton').attr('data-dismiss', 'modal');
        var data = {
            comment: $('#markerText').val()
        };
        sendAjaxCall('console/files/marker', "POST", false, true, "json", data, handleAjaxError, populateMarker);
    }
    return true;
}

function populateMarker(data) {
    if (data.success_message != undefined)
        showNotification(data.success_message);
    else
        showErrorNotification(data.error_message);
}

function upadteSidebarCollapsed() {
    if (userCache != null && userCache != undefined) {
        setTimeout(function() {
            if ($('#sidebar').hasClass('menu-min'))
                userCache.sidebarCollapsed = true;
            else
                userCache.sidebarCollapsed = false;
            $.jStorage.set(responseData.currentUser, userCache);
        }, 500);
    }
}


/**
 * @Function Name   : pingServer
 * @Description     : Dummy call to server to check it is running / not.
 * @param           :
 * @returns         : boolean
 * */
function pingServer() {
    var data = {};
    sendAjaxCall("images/logo.png", "HEAD", false, true, "json", data, function(e) {
        return false;
    }, function(data) {
        return true;
    });
}