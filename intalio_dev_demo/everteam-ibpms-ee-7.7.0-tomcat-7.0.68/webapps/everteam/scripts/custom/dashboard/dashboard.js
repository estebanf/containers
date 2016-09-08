/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

var tabCounter = 1;
var currentTab;
var startId = 100;
var currentDashboard;
var istabExist = false;
var isFirstTab = false;
var firstTabId;
var currentTabName;
var isConsoleAccessible;
var bamAccess;
var dashboardStateUrl = 'dashboard/dsState.json';
var dsState;
var widgetArr = [];
var dashboardData;
var tabs;
var widgetObj;
var defaultData = {
    "result": {
        "layout": "layout2",
        "data": []
    }
};
var aObject;
var columnId = ".second";

//dashboard global variables
var subordinateList = [];
var peersList = [];
var internalRolesList = [];
var externalRolesList = [];
var adhocWidgetObj = {};

/** 
 * @Function Name   : jquery ready function
 * @Description     : This function will initialize all the required elements
 * @param           : 
 * @returns         :
 * */
$(document).ready(function() {
    $('*').click(function() {
        $(document).find('#tablist li').removeClass('open');
    });
    $('.ace-popover').popover();
    addLoading($('#page-content'));
	getSubordinatesPeers();
	getStateWidgetData();
    $('body').append('<div id="templates"></div>');
    $("#templates").hide();
    $("#templates").load("templates.html", initDashboard);

    /**@Function Name   : initDashboard 
     * @Description     : init method for dashboard to initliaze the all the events
     * @param           :
     * @returns         :
     * */

    function initDashboard() {
        $("#tabs").tabs({
            cache: true
        });
        $('#tabs').removeClass('ui-tabs ui-widget ui-widget-content ui-corner-all');

        $(document).on('widgetDropped', '.span6', function() {
            if (currentDashboard != null) {
                setTimeout(function() {
                    persistLayoutChange(currentDashboard.serialize(), false);
                }, 500);
            }
            return false;
        });

        $(document).on('click', '.layoutchoice', function() {
            if (currentDashboard != null) {
                persistLayoutChange(currentDashboard.serialize(), false);
            }
            return false;
        });

        $(document).on('click', '.deleteWidget', function() {
            if (currentDashboard != null) {
                setTimeout(function() {
                    persistLayoutChange(currentDashboard.serialize(), false);
                }, 500);
            }
        });

        $(document).off('click', '#tabs ul li a .fa-caret-down').on('click', '#tabs ul li a .fa-caret-down', function() {
            $(document).find('#tabs ul.dropdown-menu li').removeClass('active');
            if ($(document).find('#tabs ul.nav li.dropdown').hasClass('active')) {
                var id = $(this).parent().parent().attr('id');
                if (id == 'openId') {
                    $(this).parent().parent().removeAttr('id');
                    $(this).parent().parent().removeClass("open");
                } else {
                    $(this).parent().parent().addClass("open");
                    $(this).parent().parent().attr('id', 'openId');
                }
            }
        });

        $(document).on('click', '.dmopenaddwidgetdialog', function() {
            if (currentDashboard != null) {
                currentDashboard.element.trigger("dashboardOpenWidgetDialog");
				modalShow('addwidgetdialog');
				$('#addwidgetdialog .panel-body').css('max-height',$(window).height()-200);
            }
            return false;
        });
        $(document).on('click', '.addwidget', function() {
            modalHide("addwidgetdialog");
            if (currentDashboard != null) {
                currentDashboard.element.on('dashboardAddWidget', function(e, obj) {
                    widgetObj = obj;
                    $('#widgetName').val(obj.widget.title);
                    modalShow('provideWidgetName');
                });
            }
        });
        
        $('#widgetName').bind("keypress", function(e) {
            var code = e.keyCode || e.which;
            if (code == 13) {
                e.preventDefault();
                addNewWidget(widgetObj);
                return false;
            }
        });
        $('#newWidgetName').bind('click', function() {
            if ($('#widgetName').val() == "" || $('#widgetName').val() == undefined) {
                $("#widgetNameErrorMsg").text($('#emptyWidgetNameMsg').text());
                $("#widgetNameErrorMsg").removeClass('hide');
                return false;
            } else {
                addNewWidget(widgetObj);
                return false;
            }
        });
    }
    tabTemplate = "<li class='dropdown' name='#{label}'><a class='dropdown-toggle' data-toggle='dropdown' href='#{href}'>#{label} <i class='fa fa-caret-down'></i></a><ul id='user_menu' class='dropdown-menu dropdown-info dropdown-yellow'><li><a class='dmopenaddwidgetdialog headerlink' href='#' data-toggle='tab'> <i class='fa fa-plus-circle'></i>&nbsp;"+$("#addTab").text()+"</a></li><li><a href='#' onclick=javascript:renameTab() class='renametab' data-toggle='tab'> <i class='fa fa-edit'></i>&nbsp;"+$("#renameTab").text()+"</a></li><li><a href='#' onclick=javascript:modalShow('removeTabModal') class='removetab' data-toggle='tab'> <i class='fa fa-trash-o'></i>&nbsp;"+$("#removeTab").text()+"</a></li></ul></li>";

    tabs = $("#tabs").tabs();
    $("#tabs").css("border-bottom", "#ffffff");

    $(document).on('click', '#addTabButton', function() {
        addTab(defaultData, $("#tab_title").val(), istabExist, isFirstTab, false, true);
    });

    $('#tab_title').bind("keyup keypress", function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            addTab(defaultData, $("#tab_title").val(), istabExist, isFirstTab, false, true);
            return false;
        }
    });

    $('#rename_tab_title').bind("keyup keypress", function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            updateTabName();
            return false;
        }
    });

    function addTab(jsonData, tabName, istabExist, isFirstTab, isLoading, isCreateTab) {
        var tabNameCheck = true;
        var emptyTabName = true;
        if (tabName == "" || tabName == undefined) {
            $('#createTabErrMsg').text($('#emptyTabTitle').text());
            $('#createTabErrMsg').removeClass('hide');
            $('#tab_title').focus();
            emptyTabName = false;
        } else {
            var stateDataInJson = dsState;
            if (stateDataInJson != null && stateDataInJson != 'undefined') {
                var tabsArray = stateDataInJson.tabs;
                var isAlreadyPresent = false;
                for (var i = 0; i < tabsArray.length; i++) {
                    if (tabsArray[i] != null && tabsArray[i].tabName == tabName && !isLoading) {
                        $('#createTabErrMsg').text($('#tabNameExists').text());
                        $('#createTabErrMsg').removeClass('hide');
                        tabNameCheck = false;
                    }
                }
            }
        }

        if (emptyTabName && tabNameCheck) {
            $('#addTabModal').modal('hide');
            var label = tabName || "Tab " + tabCounter;
            id = "dashboard" + tabCounter;
            li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label));
            tabs.find("#tablist").append(li);
            tabs.append("<div id='" + id + "' class='dashboard' name='" + label + "'><div class='layout'><div class='column first column-first span6'></div><div class='column second column-second span6'></div><div class='third column-third span6'></div></div></div>");
            tabs.tabs("refresh");
            if (isCreateTab) {
                addNewDashboard(id, jsonData);
                $('#tabs').tabs('select', '#' + id + '');
            }
            tabCounter++;
            if (isFirstTab) {
                addNewDashboard(id, jsonData);
                firstTabId = id;
            }
            if (!istabExist) {
                persistTab(label);
            }
        }
        if ($('#'+id+' .first .emptycolumn').attr('class') != undefined && $('.second .emptycolumn').attr('class') != undefined) {
            $('#'+id+' .first .emptycolumn').text($("#noWidgetsMsg").text());
            $('#'+id+' .layout-aa .column').css('width', "100%");
        }
        if (parseInt($('#tablist').children().length - 1) == 5)
            $('.addtab').attr('disabled', 'disabled');
    }

    $('.addtab').click(function() {
        $("#tab_title").val("");
        $('#createTabErrMsg').addClass('hide');
        modalShow('addTabModal');
        setTimeout(function() {
            $('#tab_title').focus().select();
        }, 500);
        return false;
    });

    getDashboardStateData();

    /**@Function Name   : persistLayoutChange 
     * @Description     : persists the current dashboard object
     * @param           : tabinfo,message
     * @returns         :
     * */

    function persistLayoutChange(tabInfoResult, showMessage) {
        var stateDataInJson = dsState;
        var tabsArray = stateDataInJson.tabs;
        for (var i = 0; i < tabsArray.length; i++) {
            if (tabsArray[i] != null && tabsArray[i].tabName == currentTabName) {
                var tabInfoResultInJson = jQuery.parseJSON(tabInfoResult);
                checkLayoutColumns(tabInfoResultInJson);
                tabsArray[i].info.result = tabInfoResultInJson;
                if (tabsArray[i].info.result.data.length == 0) {
                    $('.first .emptycolumn').text($("#noWidgetsMsg").text());
                    $('.layout-aa .column').css('width', "100%");
                }
                dsState = stateDataInJson;
                saveDashboardStateData(JSON.stringify(dsState), showMessage);
                break;
            }
        }
    }

    /**@Function Name   : persistTab 
     * @Description     : persists the newly aaded tab
     * @param           : tabName to persist
     * @returns         :
     * */

    function persistTab(tabName) {
        var newTab = {
            "tabName": tabName,
            "info": {
                "result": {
                    "layout": "layout2",
                    "data": []
                }
            }
        };
        var stateDataInString = JSON.stringify(dsState);
        if (typeof stateDataInString != "undefined" && stateDataInString != "" && stateDataInString != null) {
            var stateDataInJson = jQuery.parseJSON(stateDataInString);
            var tabsArray = stateDataInJson.tabs;
            tabsArray.push(newTab);
            dsState = stateDataInJson;
        } else {
            dsState = {
                "tabs": [newTab]
            }
        }
        saveDashboardStateData(JSON.stringify(dsState), false);
    }

    JSON.stringify = JSON.stringify || function(obj) {
        var t = typeof(obj);
        if (t != "object" || obj === null) {
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            var n, v, json = [],
                arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (t == "string") v = '"' + v + '"';
                else if (t == "object" && v !== null) v = JSON.stringify(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };

    /**@Function Name   : getDashboardStateData  
     * @Description     : will get the widget data of current state
     * @param           :
     * @returns         :
     * */


    function getDashboardStateData() {
        $.getJSON(dashboardStateUrl + '?action=getState&ignore_cache=' + new Date().getTime(), function(data) {
            var stateDataInString = data.dsState.ds_state;
            if (typeof stateDataInString != "undefined" && stateDataInString != "" && stateDataInString != null) {
                var stateDataInJson = jQuery.parseJSON(stateDataInString);
                dsState = stateDataInJson;
                var tabsArray = stateDataInJson.tabs;
                var j = 0;
                for (var i = 0; i < tabsArray.length; i++) {
                    if (tabsArray[i] != null) {
                        if (j == 0) {
                            j++;
                            addTab(tabsArray[i].info, tabsArray[i].tabName, true, true, true);
                        } else {
                            addTab(tabsArray[i].info, tabsArray[i].tabName, true, false, true);
                        }
                        var widgetsData = tabsArray[i].info.result.data;
                        for (var k = 0; k < widgetsData.length; k++) {
                            if (widgetsData != null && widgetsData[k].id >= startId) {
                                startId = widgetsData[k].id;
                                startId++;
                            }
                        }
                    }
                }
                $('#tabs').tabs('select', '#' + firstTabId + '');

            }
            removeLoading($('#page-content'));
        });
    }
});

/**@Function Name   : removeTab 
 * @Description     : removes the tab & persists the current state
 * @param           : tabName to remove
 * @returns         :
 * */

function removeTab(tabName) {
    var stateDataInJson = dsState;
    var tabsArray = stateDataInJson.tabs;
    for (var i = 0; i < tabsArray.length; i++) {
        if (tabsArray[i] != null && tabsArray[i].tabName == tabName) {
            var tabData = tabsArray[i].info.result.data;
            for (var j = 0; j < tabData.length; j++) {
                widgetArr.splice($.inArray(tabData[j].url, widgetArr), 1);
            }
            tabsArray.splice($.inArray(tabsArray[i], tabsArray), 1);
            dsState = stateDataInJson;
            saveDashboardStateData(JSON.stringify(dsState), false);
            break;
        }
    }
}

function removeSelectedTab() {
    var tabName = $('#tabs ul li.active').attr('name');
    if (tabName != null && tabName != undefined) {
        removeTab(tabName);
        var panelId = $('#tabs ul li.active').remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
        if ((parseInt($('#tablist').children().length) - 1) <= 5)
            $('.addtab').removeAttr('disabled');
    }
}



/**@Function Name   : saveDashboardStateData 
 * @Description     : saves the current state of the dashboard
 * @param           : jsonString to save , message
 * @returns         :
 * */
function saveDashboardStateData(jsonString, showMessage) {
    $.ajax({
        url: dashboardStateUrl,
        cache: false,
        type: "POST",
        async: true,
        dataType: 'json',
        data: {
            action: "saveState",
            jsonString: jsonString
        },
        error: function(e) {
            showInformation($('#errorMessageOnSavingState').text());
        },
        success: function(data) {
            if (data.response != undefined && data.response != "" && data.response != "OK")
                showInformation($('#errorMessageOnSavingState').text());
            else if (showMessage)
                showInformation($('#errorMessageOnSavingState').text());
        }
    });
}

/**@Function Name   : clickRefresh  
 * @Description: Refresh Icon will display
 * @param           :
 * @returns         :
 * */

function clickRefresh(obj, flag) {
    var w = $(obj).closest(".widget");
    var e = w.find('.widget-header');
    if (flag) {
        if (!e.hasClass("position-relative"))
            e.addClass("position-relative")
        if ($('#ref-icon').length == 0)
            e.find('.widget-title').after('<span id="ref-icon">&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-spinner fa-spin blue"></i></span>');
    } else {
        setTimeout(function() {
            e.find("#ref-icon").remove();
            e.removeClass("position-relative")
        }, 500);
    }
}

/**@Function Name   : getStateWidgetData  
 * @Description     : will get the widget data of current state
 * @param           :
 * @returns         :
 * */

function getStateWidgetData() {
    var data = {
        action: "getStateWidgetData"
    }
    var url = 'dashboard/data.json';
    $.ajax({
        url: url,
        cache: false,
        async: false,
        dataType: 'json',
        data: data,
        error: function(e) {},
        success: function(data) {
            if (data.currentUser == undefined || data.currentUser == null)
                submitActionToURL('login.htm', 'logOut');
            else {
                dashboardData = data;
                if ($('#moduleID8').find('.dropdown-toggle').text().length != 0)
                    isConsoleAccessible = "true";
                else
                    isConsoleAccessible = "false";
                bamAccess = data.bamAccess;
                $("#user_info").text(data.currentUserName);
                $("#accessible").val(isConsoleAccessible);
            }
        }

    });
}
/**@Function Name   : addNewDashboard 
 * @Description     : creates a new dashboard object with the help of jquery.dashboard.min.js
 * @param           : dashboardid,jsonData
 * @returns         :
 * */

function addNewDashboard(id, jsonData) {
    var dashboard1 = $('#' + id).dashboard({
        layoutClass: 'layout',
        json_data: jsonData,
        addWidgetSettings: {
            widgetDirectoryUrl: "jsonfeed/Widget_categories"
        },
        layouts: [{
            title: "Layout1",
            id: "layout1",
            image: "layouts/layout1.png",
            classname: 'layout-a'
        }, {
            title: "Layout2",
            id: "layout2",
            image: "layouts/layout2.png",
            classname: 'layout-aa row-fluid'
        }, {
            title: "Layout3",
            id: "layout3",
            image: "layouts/layout3.png",
            classname: 'layout-ba'
        }, {
            title: "Layout4",
            id: "layout4",
            image: "layouts/layout4.png",
            classname: 'layout-ab'
        }, {
            title: "Layout5",
            id: "layout5",
            image: "layouts/layout5.png",
            classname: 'layout-aaa'
        }]
    }); // end dashboard call


    dashboard1.init();
    dashboardManager.addDashboard(dashboard1);
}

var dashboardManager = function() {
    var dashboards = new Array();

    function addDashboard(d) {
        dashboards.push(d);
    }

    function getDashboard(id) {
        var r;
        for (i = 0; i < dashboards.length; i++) {
            if (dashboards[i].element.attr("id") == id) {
                r = dashboards[i];
            }
        }
        return r;
    }
    return {
        addDashboard: addDashboard,
        getDashboard: getDashboard,
    }

}();

/**@Function Name       : persistWidget 
 * @Description     : persists the current widget added
 * @param           : widgetData
 * @returns         :
 * */

function persistWidget(widgetData) {
    var stateDataInJson = dsState;
    var tabsArray = stateDataInJson.tabs;
    var url = widgetData.url;
    var widgetExist = false;
    for (var i = 0; i < tabsArray.length; i++) {
        if (tabsArray[i] != null && tabsArray[i].tabName == currentTabName) {
            var widgets = tabsArray[i].info.result.data;
            for (var j = 0; j < widgets.length; j++) {
                if (widgets[j].id == widgetData.id) {
                    widgetExist = true;
                    tabsArray[i].info.result.data[j] = widgetData;
                }
            }
            if (!widgetExist)
                tabsArray[i].info.result.data.push(widgetData);
            dsState = stateDataInJson;
            saveDashboardStateData(JSON.stringify(dsState));
            break;
        }
    }
}
/**
 * @Function Name : checkLayoutColumns
 * @Description   : will check for columns for the selected layout
 * @param         : data of columns
 * @returns :
 */

function checkLayoutColumns(data) {
    var layout = data.layout;
    var data = data.data;
    if (layout == 'layout1') {
        for (var i = 0; i < data.length; i++) {
            if (data[i].column != 'first') {
                data[i].column = 'first';

            }
        }
    } else if (layout == 'layout2' || layout == 'layout3' || layout == 'layout4') {
        for (var i = 0; i < data.length; i++) {
            if (data[i].column == 'third') {
                data[i].column = 'first';

            }
        }
    }
}
/**
 * @Function Name : reDrawTabsData
 * @Description   : it will redraw the selected tab widgets
 * @param         : currentdashboard,tabNo to redraw
 * @returns :
 */

function reDrawTabsData(tabNo) {
    $('#tabs ul li').each(function(index) {
        $(this).removeClass('active');
    });
    $(document).find("#tabs ul li:nth-child(" + parseInt(tabNo + 1) + ").dropdown").addClass('active');
}

/**
 * @Function Name : disableWidget
 * @Description : disable to add the widget if not accessible by the logged in user
 * @param :
 * @returns :
 */

function disableWidget(obj, value) {
    obj.attr('value', value);
    obj.attr('disabled', 'disabled');
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
 * @Function Name : debouncer @Description : debouncing guarantees that the
 * function will only ever be executed a single time (given a specified
 * threshhold) @param : func, timeout @returns :
 */

function debouncer(func, timeout) {
    var timeoutID, timeout = timeout || 200;
    return function() {
        var scope = this,
            args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() {
            func.apply(scope, Array.prototype.slice.call(args));
        }, timeout);
    }
}

/**
 * @Function Name : getWidgetObject
 * @Description   : this function will get widget filter objecct from the dashboard state
 * @param         : widget id     
 * @returns       : returns the widget object
 */
function getWidgetObject(id) {
    var tabsArray = dsState.tabs;
    for (var i = 0; i < tabsArray.length; i++) {
        if (tabsArray[i] != null) {
            var widgets = tabsArray[i].info.result.data;
            for (var j = 0; j < widgets.length; j++) {
                if (widgets[j].id == id && currentTabName == tabsArray[i].tabName) {
                    return widgets[j];
                    break;
                }
            }
        }
    }
}

/**
 * @Function Name : adhocData
 * @Description   : this function will be used for creating a list of adhoc reports in widget category
 * @param         : obj     
 * @returns       : 
 */
function adhocData(obj){
	modalHide("addwidgetdialog");
	$('#widgetName').val($(obj).attr('data-name'));
	modalShow('provideWidgetName');
	var widget = {};
	widget.title = $(obj).attr('data-name');
	widget.desc = $(obj).attr('data-desc');
	widget.reportId = $(obj).attr('data-id');
	widget.url = "widgets/reports/executeReport.jsp";
	widget.accessible= "true";
	widget.creator = "Intalio Inc";
	widget.filter = "";
	adhocWidgetObj.widget = widget;
	widgetObj = adhocWidgetObj;
}


function addNewWidget(widgetObj) {
    $(".first .emptycolumn").text("");
    $('.layout-aa .column').css('width', "49.55%");
    $("#widgetNameErrorMsg").addClass('hide');
    var eventCount = 0;
    if (widgetObj != undefined && widgetObj != null) {
        if (eventCount == 0) {
            eventCount++;
            var widget = widgetObj.widget;
            var accessible;
            if (widget.accessible != null && widget.accessible != undefined) {
                accessible = widget.accessible;
            } else {
                accessible = "false";
            }
            var widgetData;
            if (accessible == "true") {
                widgetData = {
                    "id": startId++,
                    "title": $('#widgetName').val(),
                    "url": widget.url,
                    "column": "first",
                    "open": true,
                    "accessible": "true",
                    "filter": widget.filter,
                    "metadata": widget.metadata
                }
            } else {
                widgetData = {
                    "id": startId++,
                    "title": $('#widgetName').val(),
                    "url": widget.url,
                    "column": "first",
                    "open": true,
                    "filter": widget.filter,
                    "metadata": widget.metadata
                }
            }
            if (columnId == ".second") {
                currentDashboard.addWidget(widgetData, currentDashboard.element.find('.first'), accessible);
                columnId = ".first";
                widgetData.column = "first";
            } else {
                currentDashboard.addWidget(widgetData, currentDashboard.element.find('.second'), accessible);
                columnId = ".second";
                widgetData.column = "second";
            }
            if(widget.reportId!=null && widget.reportId!=undefined)
				widgetData.reportId = widget.reportId;
            persistWidget(widgetData);
            modalHide("provideWidgetName");
        }
        return false;
    }
}

/**
 * @Function Name : renameTab
 * @Description   : this function will be used for openning modal window for renaming
 * @param         : 
 * @returns       : 
 */
function renameTab() {
    $('#rename_tab_title').val(currentTabName);
    $('#renameTabErrMsg').addClass('hide');
    modalShow('renameTabModal');
}

/**
 * @Function Name : renameTab
 * @Description   : this function will call server to update tab name
 * @param         : 
 * @returns       : 
 */

function updateTabName() {
    var updatedTabName = $('#rename_tab_title').val();
    if (updatedTabName == "" || updatedTabName == undefined) {
        $('#renameTabErrMsg').text($('#emptyTabTitle').text());
        $('#renameTabErrMsg').removeClass('hide');
    } else {
        var tabsArray = dsState.tabs;
        var isTabName = true;
        for (var i = 0; i < tabsArray.length; i++) {
            if (updatedTabName == tabsArray[i].tabName) {
                if (currentTabName != tabsArray[i].tabName) {
                    $('#renameTabErrMsg').text($('#tabNameExists').text());
                    $('#renameTabErrMsg').removeClass('hide');
                    isTabName = false;
                }
            }
        }
        for (var i = 0; i < tabsArray.length; i++) {
            if (currentTabName === tabsArray[i].tabName && isTabName) {
                tabsArray[i].tabName = updatedTabName;
                dsState.tabs = tabsArray;
                currentTabName = updatedTabName;
                $('.ui-tabs-active').find('.dropdown-toggle').html(updatedTabName + '<i class="fa fa-caret-down"></i>');
                saveDashboardStateData(JSON.stringify(dsState));
                $('#renameTabModal').modal('hide');
            }

        }
    }
}

/**populate logged in user subordinates & peers in global variable*/
function getSubordinatesPeers() {
    subordinateList = [];
    peersList = [];
    var data = {};
    sendAjaxCall(intalio_bpms.task_filter.getAssignedToUsers, "GET", false, true, "json", data, function(e) {
        if (e.responseText != null && e.responseText != undefined)
            showInformation(e.responseText);
    }, function(response) {
        if (response.users != undefined) {
            subordinateList = response.users.subordinates;
            peersList = response.users.peers;
        }
    });
    var roleData = {};
    sendAjaxCall(intalio_bpms.task_filter.getAssignedToRoles, "GET", false, true, "json", roleData, function(e) {
        if (e.responseText != null && e.responseText != undefined)
            showInformation(e.responseText);
    }, function(response) {
        internalRolesList = response.roles.internal_roles;
        externalRolesList = response.roles.external_roles;
    });
}

function validateList(widgetStateId, validateOn,successFunction) {
    var widgetObject = getWidgetObject(widgetStateId);
    if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != '') {
        if (validateOn == "user" && widgetObject.filter.user != undefined && widgetObject.filter.user != null) {
            var filterUsers = widgetObject.filter.user;
            var updated = false;
            if(subordinateList.length>1 || peersList.length>1){
				for (var k = 0; k < filterUsers.length; k++) {
                    subObj = $.grep(subordinateList, function(e){return e.userID == filterUsers[k]});
                    peerObj= $.grep(peersList, function(e){return e.userID == filterUsers[k]});
                    if(subObj.length==0 && peerObj.length==0){
					   filterUsers.splice(k, 1);
					   updated = true;
					}
				}
				widgetObject.filter.user = filterUsers;
				if (updated){
					persistWidget(widgetObject);
					showFilterUsersChange(widgetStateId, $("#chartModified").text());
				}
			}
        } else if (widgetObject.filter.role != undefined && widgetObject.filter.role != null) {
            var filterRoles = widgetObject.filter.role;
            var updated = false;
            for (var k = 0; k < filterRoles.length; k++) {
                if ($.inArray(filterRoles[k], internalRolesList) == -1 && $.inArray(filterRoles[k], externalRolesList) == -1) {
                    filterRoles.splice(k, 1);
                    updated = true;
                }
            }
            widgetObject.filter.role = filterRoles;
            if (updated){
                persistWidget(widgetObject);
                showFilterUsersChange(widgetStateId, $("#chartModifiedRoles").text());
		   }
        }
    }
    successFunction("fetch",widgetStateId);
}

function showFilterUsersChange(id, msg) {
    var obj = $('#' + id + ' .widget-header h5')
    var span = $('<span/>').addClass("widgetFilterMessage");
    var i = $('<i/>').addClass('fa fa-warning orange iconCursor');
    span.css('margin-left', '10px').append(i);
    span.attr({
        'data-placement': 'bottom',
        'data-content': msg,
        'data-trigger': 'hover'
    })
    var app = span.popover();
    obj.after(app)
}

/** all defaults messages to be declared here which are used more than once*/
defaults = {
    dashboardSaveMessage: $("#dashboardSaveMsg").text(),
    infoDialogTitle: "Info",
    warningDialogTitle: "Warning",
    loaderDiv: "loaderDiv",
    chart1: "avg_comp_time",
    chart2: "longest_running_activity_summary",
    chart3: "ongoing_activity_summary",
    chart4: "status_summary_by_process",
    chart5: "status_summary",
    chart6: "peak_instance_completed_summary",
    chart7: "peak_instance_creation_summary",
    chart8: "peak_instance_failure_summary",
    chart9: "task_completion_summary_by_user",
    chart10: "task_distribution_summary_by_user",
    chart11: "task_distribution_summary_by_role",
    chart12: "average_completion_summary_by_user",
    chart13: "task_summary_status",
    chart14: "task_summary_by_priority",
    chart15: "task_summary_by_creation_date",
    chart16: "vacation_summary",
    chart17: "average_web_service_response_time",
    chart18: "process_analytics",
    swf1: "MSColumn3D.swf",
    swf2: "StackedColumn3D.swf",
    swf3: "Column3D.swf",
    swf4: "Pie3D.swf",
    swf5: "Doughnut3D.swf",
    swf6: "MSColumn3DLineDY.swf",
    swf7: "Column2D.swf",
    swf8: "Pie2D.swf",
    swf9: "Doughnut2D.swf",
    swf10: "MSColumn2D.swf",
    swf11: "StackedColumn2D.swf",
    swf12: "Line.swf",
    swf13: "Bar2D.swf",
    swf14: "MSBar3D.swf",
    swf15: "MSLine.swf",
    swf16: "Area2D.swf"
}
