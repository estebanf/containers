/* 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
*/
var chartProperties = {
        "chart": {
            "caption": "",
            "subcaption": "",
            "yaxisname": "",
            "xaxisname": "",
            "bgcolor": "#FFFFFF",
            "showvalues": "1",
            "showkeys":"0",
            "plotborderthickness": "3",
            "divlinecolor": "#CCCCCC",
            "yaxisvaluespadding": "25",
            "divlinealpha": "60",
            "canvasbasecolor": "#CCCCCC",
            "showcanvasbg": "0",
            "animation": "1",
            "palettecolors": "#008ee4,#6baa01,#f8bd19,#e44a00,#33bdda",
            "showcanvasborder": "0",
            "showBorder": "0",
            "legendBorderColor":"#FFFFFF",
            "legendBgAlpha":"0",
            "legendBorderAlpha":"0",
            "showLegend": "1",
            "legendPosition": "BOTTOM",
            "yAxisMinValue": "",
            "yAxisMaxValue": "",
            "showLabels": "1"
        },
        "data": []
    },
    tableProperties = {
        "bPaginate": true,
        "bLengthChange": false,
        "iDisplayLength": 50,
        "bInfo": false,
        "bSort" : false,
        "bFilter": true,
        "bAutoWidth":false,
        "oLanguage": {
            "sSearch": ""
        },
        "aoColumns": [],
        "fnDrawCallback": function(oSettings) {
            executeReport.highLightingCells();
        }
    },
    rowGroupingProperties = {
        iGroupingColumnIndex: "",
        sGroupBy: "name",
        bExpandableGrouping: true,
        bHideGroupingColumn: true
    },
    adhoc = {}
adhoc.report = {
    currentStep: 0,
    completedNo: 0,
    stepHeading: {
        '1': $('#createStep1Heading').text(),
        '2': $('#createStep2Heading').text(),
        '3': $('#createStep3Heading').text(),
        '4': $('#createStep4Heading').text(),
        '5': $('#createStep5Heading').text()
    },
    dataDefinitionId: '',
    dataSet: '',
    type: '',
    name: '',
    description: '',
    customCols: {},
    visual: [],
    table: {
        column: []
    },
    chart: {
        legend: {
            position: 'Below',
            showValue: false,
            visible: 1
        },
        xAxisVisible: true,
        yAxisVisible: true
    },
    groups: [],
    orders: {
        direction: 'asc'
    },
    filter: [],
    tableProp: {}
}
adhoc.grace_timeout = 30000; /* time out  adjustment for Ajax req */
adhoc.execution_timeout = 300000
adhoc.max_preview_rows = 5
adhoc.preview_timeout = 60000
var propConditions = {
        eq: {
            name: 'Equal to',
            exp: '==',
            fieldType: 'single'
        },
        lt: {
            name: 'Less than',
            exp: '<',
            fieldType: 'single'
        },
        gt: {
            name: 'Greater than',
            exp: '>',
            fieldType: 'single'
        },
        between: {
            name: 'Between',
            exp: 'between',
            fieldType: 'two'
        },
        in_: {
            name: 'In',
            exp: 'in',
            fieldType: 'multiple'
        }
    },
    adhocTable,
    share_roles_obj,
    share_users_obj;
var availableChartTypes = [{
    swf: 'Column3D.swf',
    title: 'Column Chart 3D',
    birt_name: 'BAR',
    value : 'BAR-1',
    dimension: 1,
    inner_radius : false
}, {
    swf: 'Pie3D.swf',
    title: 'Pie Chart 3D',
    birt_name: 'PIE',
    value : 'PIE-1',
    dimension: 1,
    inner_radius : false
}, {
    swf: 'Doughnut3D.swf',
    title: 'Doughnut Chart 3D',
    birt_name: 'PIE',
    value : 'doughnut-1',
    dimension: 1,
    inner_radius : true
}, {
    swf: 'Line.swf',
    title: 'Line Chart',
    birt_name: 'LINE',
    value : 'LINE-1',
    dimension: 1,
    inner_radius : false
}, {
    swf: 'Column2D.swf',
    title: 'Column Chart 2D',
    birt_name: 'BAR',
    value : 'BAR-0',
    dimension: 0,
    inner_radius : false
}, {
    swf: 'Pie2D.swf',
    title: 'Pie Chart 2D',
    birt_name: 'PIE',
    value : 'PIE-0',
    dimension: 0,
    inner_radius : false
}, {
    swf: 'Doughnut2D.swf',
    title: 'Doughnut Chart 2D',
    birt_name: 'PIE',
    value : 'doughnut-0',
    dimension: 0,
    inner_radius : true
}]
var reportsListOptions = {
    "bPaginate": false,
    "bInfo": false,
    "bStateSave": true,
    "bRetrieve":true,
    "bFilter": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bAutoWidth": false,
    "aaSorting": [
        [4, "desc"]
    ],
    "aoColumns": [{
        "bSortable": false,
        "sClass": "center"
    }, {
        "sWidth": width * 0.20,
        "bSortable": true,
        "sClass": "left"
    }, {
        "sWidth": width * 0.20,
        "bSortable": true,
        "sClass": "left"
    }, {
        "sWidth": width * 0.20,
        "bSortable": true,
        "sClass": "left"
    }, {
        "sWidth": width * 0.20,
        "bSortable": true,
        "sClass": "left"
    }, {
        "sWidth": width * 0.40,
        "bSortable": false,
        "sClass": "left"
    }]
};

/**pagination required data for reports*/
var reportPaginationData = {
    pageSize: 10,
    requiredPage: 1
};
var expressionEditor;
/** totalPageSize holds the tolal page size*/
var totalPageSize;
/** totalRecords is used to calculate the pagination of instances page*/
var totalRecords;
/** endNumber is used to show the no of entries in table*/
var endNumber;
/** startNumber is used to show the no of entries in table*/
var startNumber;

var width_of_widget = 8; /* In birt default width of a report */

var isReportAdmin = false;
$(document).ready(function() {
    getReportConfiguration();
    sendAjaxCall(intalio_bpms.adhoc_reporting.get_report_admin, "GET", false, true, "json", {}, handleAdhocError, function(data) {
        removeLoading();
        if(data.is_report_admin!=undefined)
            isReportAdmin = data.is_report_admin;
        initiateAdhocTable();
        fetchAdhocReports();
    });
    $('#reports-template').ace_file_input({
        no_file: 'Choose .rptdesign File...',
        btn_choose: 'Choose',
        btn_change: 'Change',
        droppable: false,
        onchange: null,
        thumbnail: false
    });
    share_roles_obj = applySelectize($("#share-roles"), [{
        id: 'internal',
        name: 'Internal'
    }, {
        id: 'external',
        name: 'External'
    }], ["internal", "external"], 50, false);
    share_users_obj = applySelectize($("#share-users"), [{
        id: 'peers',
        name: 'Peers'
    }, {
        id: 'subordinates',
        name: 'Subordinates'
    }], ["peers", "subordinates"], 50, false);
    $('.CodeMirror').remove();;
    expressionEditor = new CodeMirror.fromTextArea(document.getElementById("custom-column-expression"), {
        mode: 'text/javascript',
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true
    });
});
function getReportConfiguration(){
    sendAjaxCall(intalio_bpms.adhoc_reporting.configuration, "GET", false, true, "json", {}, handleAdhocError, function(data) {
        if (data.error_message == undefined){
            if (data.preview_timeout && data.preview_timeout != null )
                adhoc.preview_timeout = data.preview_timeout
            if (data.max_preview_rows && data.max_preview_rows != null )
                adhoc.max_preview_rows = data.max_preview_rows
            if (data.execution_timeout && data.execution_timeout != null )
                adhoc.execution_timeout = data.execution_timeout
        } else {
            showErrorNotification(data.error_message);
        }
    });
}
function initiateAdhocTable() {
    adhocTable = $('#adhoc_reports_list').dataTable(reportsListOptions);
    $('.dataTables_empty').html("Fetching Report(s)...");
    customTable('adhoc_reports_list');
    var buttonHolder = $('#adhoc_reports_list_wrapper .tableButtons').empty();
    var buttons = isReportAdmin == true ? ['manageTemplates','create', 'updateReport', 'share', 'delete'] : ['create','updateReport', 'share', 'delete']
    for (var i = 0; i < buttons.length; i++) {
        buttonHolder.append(getAdhocButtons(buttons[i]));
    }
    $('#adhoc_reports_list_wrapper .table_refresh_icon').attr('onclick', 'fetchAdhocReports();');
}

function fetchAdhocReports() {
    addLoading($('#adhoc_reports_list_wrapper'));
    if (userCache != null && userCache != undefined && userCache.reportsPageSize != null)
        reportPaginationData.pageSize = parseInt(userCache.reportsPageSize);
    else
        reportPaginationData.pageSize = 10;
    sendAjaxCall(intalio_bpms.adhoc_reporting.get_reports, "GET", false, true, "json", reportPaginationData, handleAdhocError, function(data) {
        if (data.error_message != undefined) {
            showErrorNotification(data.error_message);
        } else {
            formAdhocReportsTable(data)
        }
    });
}

function formAdhocReportsTable(data) {
    adhocTable.fnClearTable();
    adhocTable.fnFilter('');
    $('#reportsListHeader th input:first').prop('checked', false);
    if (data.total != undefined && data.total != null)
        totalRecords = data.total;
    if (data.reports.length > 0) {
        for (var i = 0; i < data.reports.length; i++) {
            var item = data.reports[i]
            var elms = []
            if (item.id != null)
                elms[elms.length] = "<label class='position-relative'><input type='checkbox' class='ace instanceSelected' id='instanceSelected' onclick='updateHeaderCheckbox(this);' value=" + item.id + "> <span class='lbl'></span></label>";
            else
                elms[elms.length] = "";
            if (item.name != null)
                elms[elms.length] = "<a class='noDecoration iconCursor' data='+item.id+'onclick='javascript:executeReport.getReportTypeData(" + item.id + ",this);'>" + item.name + "</a>";
            else
                elms[elms.length] = "";
            if (item.description != null)
                elms[elms.length] = item.description;
            else
                elms[elms.length] = ''
            if (item.owner != null && item.owner.length != 0){
                var nameObj = [];
                if(data.users!=undefined && data.users.length>=0)
                    nameObj = $.grep(data.users, function(e){return e.id == item.owner});
                    name = nameObj.length==1 ? nameObj[0].name : item.owner
                elms[elms.length] = '<a class="noDecoration" user="'+item.owner+'" onclick=javascript:showUserProfile(this)>'+name+'</a>';
            }
            else
                elms[elms.length] = ''
            if (item.modified_on != null)
                elms[elms.length] = $.format.date(item.modified_on, userPreferences.dateFormat+userPreferences.hourFormat);
            else
                elms[elms.length] = ''
            if (item.accessors != null && item.accessors.users != null || item.accessors.roles != null) {
                var tempHtml = "";
                if (item.accessors.users != null && item.accessors.users.length > 0) {
                    $.each(item.accessors.users, function(key, value) {
                        var nameObj = [];
                        if(data.users!=undefined && data.users.length>=0)
                            nameObj = $.grep(data.users, function(e){return e.id == value});
                        tempHtml += '&nbsp;<span class="nowrap"><a class="noDecoration" user="'+value+'" onclick=javascript:showUserProfile(this)>';
                        nameObj.length==1 ? tempHtml+='<i class="fa fa-user" title="'+nameObj[0].id+'"></i> '+nameObj[0].name+'</a></span>' : tempHtml += '<i class="fa fa-user" title="User"></i> ' + value + ' </a></span>';
                        tempHtml += '<span class="wrap-line"> </span>';
                    });
                }
                if (item.accessors.roles != null && item.accessors.roles.length > 0) {
                    $.each(item.accessors.roles, function(key, value) {
                        tempHtml += '&nbsp;<span class="nowrap"><i class="fa fa-group" title="Role"></i> ' + value + '  </span><span class="wrap-line"> </span>';
                    });
                }
                elms[elms.length] = tempHtml;
            } else elms[elms.length] = ''
            adhocTable.fnAddData(elms, false);
        }
        adhocTable.fnDraw(true);
        handlePagination(data);
    } else {
        $('.dataTables_empty').html($("#NoAdhocReportsMsg").text());
        $('#reports_pagination').remove();
        $('.paginationRows').remove();
        $("#adhoc_reports_list_wrapper .showEntries").remove();
    }
    $('#adhoc_reports_list_wrapper').attr('type','report');
    removeLoading($('#adhoc_reports_list_wrapper'));
}

//this logic is to handle pagination for reports
function handlePagination(data) {
    var paginationObj = $("#adhoc_reports_list_wrapper .table_pagination");
    totalPageSize = Math.ceil(totalRecords / reportPaginationData.pageSize);
    if (totalPageSize >= 1) {
        $('#reports_pagination').remove();
        $('.paginationRows').remove();
        if (reportPaginationData.requiredPage == parseInt(1)) {
            startNumber = reportPaginationData.requiredPage;
            if (parseInt(data.reports.length) != parseInt(reportPaginationData.pageSize))
                endNumber = parseInt(data.reports.length);
            else
                endNumber = parseInt(reportPaginationData.pageSize);
        } else {
            var page = parseInt(parseInt(reportPaginationData.requiredPage) - parseInt(1));
            startNumber = parseInt(page * parseInt(reportPaginationData.pageSize) + 1);
            endNumber = parseInt(page * parseInt(reportPaginationData.pageSize) + data.reports.length);
        }
        var pageHtml = $(".pageSizePagination").clone();
        $(pageHtml).addClass("paginationRows");
        var pagintaionHtml = $("#paginationTable").clone();
        $(pagintaionHtml).find("#reportsPageNo").val(reportPaginationData.requiredPage).end().find(".totalPageNo").text(totalPageSize);
        paginationObj.append(pageHtml).append("<div id='reports_pagination' class='dataTables_paginate paging_bootstrap pull-right'></div>");
        paginationObj.find("#reports_pagination").append(pagintaionHtml);
        showPaginationEntires(startNumber, endNumber, "adhoc_reports_list_wrapper", $("#adhocReportsPageInfo").text());
        updatePaginationTable($('#reportsPageNo').val(), totalPageSize);
        $("select#noOfReports").val(reportPaginationData.pageSize);
        removeLoading();
        applyNiceScroll($('#adhoc_reports_list_wrapper').find('.table_container'), 190);
    }
}

function getLastFirstPageData(action) {
    if (action === 'last')
        reportPaginationData.requiredPage = Math.ceil(totalRecords / reportPaginationData.pageSize);
    else if (action === 'first')
        reportPaginationData.requiredPage = parseInt(1);
    fetchAdhocReports();
}

function getNextPrevPageData(action) {
    if (parseInt($('#reportsPageNo').val()) > totalPageSize || $('#reportsPageNo').val() == "")
        reportPaginationData.requiredPage = parseInt(1);
    else if (action === 'next' && $('#reportsPageNo').val() < totalPageSize)
        reportPaginationData.requiredPage = parseInt($("#reportsPageNo").val()) + 1;
    else if (action === 'prev' && $('#reportsPageNo').val() > 1)
        reportPaginationData.requiredPage = parseInt($("#reportsPageNo").val()) - 1;
    fetchAdhocReports();
}

function getPageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#reportsPageNo").val() != "" && parseInt($("#reportsPageNo").val()) != 0 && parseInt($("#reportsPageNo").val()) <= Math.ceil(totalRecords / reportPaginationData.pageSize)) {
        reportPaginationData.requiredPage = parseInt($("#reportsPageNo").val());
        fetchAdhocReports();
    } else if ($("#reportsPageNo").val() != "" && event.keyCode == parseInt(13) && (parseInt($("#reportsPageNo").val()) === 0 || parseInt($("#reportsPageNo").val()) > Math.ceil(totalRecords / reportPaginationData.pageSize))) {
        reportPaginationData.requiredPage = parseInt(1);
        fetchAdhocReports();
    } else if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105))
        event.preventDefault();
}

function updateNoOfReports() {
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.reportsPageSize = $('#noOfReports').val();
        $.jStorage.set($("#userid").text(), userCache);
    }
    reportPaginationData.pageSize = $('#noOfReports').val();
    reportPaginationData.requiredPage = parseInt(1);
    fetchAdhocReports();
}

function showCreateReportModal() {
    adhoc.newReport = JSON.parse(JSON.stringify(adhoc.report))
    adhoc.newReport.currentStep = 1
    $('#createReportModal .modal-dialog').css({
        'width': $(window).width() + 'px',
        'margin-top': '0px',
        'padding': '10px'
    })
    $('#createReportModal .modal-body').css('height', $(window).height() - 165 + 'px')
    $('#createReportModal').modal('show');
    $('#fuelux-wizard ul li').removeClass('active');
    if (typeof startReportWizard == 'undefined') {
        addLoading($('#createReportModal .modal-body'))
        loadJs('scripts/custom/BAM/createReport.js', function() {
            startReportWizard();
            removeLoading($('#createReportModal .modal-body'));
        })
    } else {
        startReportWizard();
    }

}

function updateAdhocReport(obj){
    var selected = getSelectedRows(adhocTable, "id")
    
    if (selected.length ==1){

        if (typeof startReportWizard == 'undefined') {
            addLoading($('#createReportModal .modal-body'))
            loadJs('scripts/custom/BAM/createReport.js', function() {
                //startReportWizard();
                initializeUpdateReport(selected[0]);
                removeLoading($('#createReportModal .modal-body'));
            })
        } else {
            //startReportWizard();
            initializeUpdateReport(selected[0]);
        }
    } else if (selected.length == 0) {
        showInformation('Please select atleast one report.')
    } else {
        showInformation('Please select only one report.');
    }
}

function loadDataDefinitionsJs(){
  if (typeof initiateAdhocTemplateTable == 'undefined')
      loadJs('scripts/custom/BAM/manageDataDefinitions.js', function() {initiateAdhocTemplateTable()});
  else
      initiateAdhocTemplateTable();
}

function getAdhocButtons(id) {
    var btn;
    switch (id) {
        case 'create':
            btn = '<button type="button" class="btn btn-white btn-sm iconCursor" onclick=showCreateReportModal();><i class="fa fa-plus-circle"></i>&nbsp;'+$("#buttonDesignReport").text()+'</button>&nbsp;';
            break;
        case 'manageTemplates':
            btn = '<button type="button"  class="btn btn-white btn-sm iconCursor" onclick="loadDataDefinitionsJs();"><i class="fa fa-suitcase"></i>&nbsp;'+$("#buttonManageDataDef").text()+'</button>&nbsp;'
            break;
        case 'addTemplate':
            btn = '<button type="button" class="btn btn-white btn-sm iconCursor" onclick="showUploadTemplate();"><i class="fa fa-plus-circle"></i> '+$("#buttonAddTemplate").text()+'</button>&nbsp;';
            break;
        case 'grantAccess':
            btn = "<button type='button'  class='btn btn-white btn-sm iconCursor' onclick='handleShareORGrantAccess.prepareData(this);'><i class='fa fa-code-fork'></i> "+$("#buttonGrantAccess").text()+"</button>&nbsp;";
            break;
        case 'share':
            btn = "<button type='button'  class='btn btn-white btn-sm share iconCursor' onclick='handleShareORGrantAccess.prepareData(this);'><i class='fa fa-share'></i>  " + $('#shareButton').text() + "</button>&nbsp;";
            break;
        case 'delete':
            btn = "<button type='button' class='btn btn-white btn-sm iconCursor' onclick='deleteConfirmation(this)'><i class='fa fa-trash-o'></i>  " + $('#deleteButton').text() + "</button>&nbsp;";
            break;
        case 'update':
            btn = "<button type='button' class='btn btn-white btn-sm iconCursor' onclick='updateSource()'><i class='fa fa-edit'></i>  " + $('#updateDataSrcBtn').text() + "</button>&nbsp;"
            break; 
        case 'updateReport':
            btn = "<button type='button' class='btn btn-white btn-sm iconCursor' onclick='updateAdhocReport(this)'><i class='fa fa-edit'></i>  " + $('#adhocUpdateButton').text() + "</button>&nbsp;";
            break;           
    }
    return btn
}

function handleAdhocError(data) {
    if (data.error_message != undefined)
        showErrorNotification(data.error_message);
}

var handleShareORGrantAccess = {
    prepareData: function(obj) {
        if (handleShareORGrantAccess.validate(obj)) {
            modalShow("shareAccessmodal");
            addLoading($("#shareAccessmodal").find('.modal-body'));
            sendAjaxCall(intalio_bpms.module_access.role_list, "GET", false, true, "json", {}, handleAdhocError, function(data) {
                share_roles_obj.clearOptions();
                for (var k = 0; k < data.external_roles.length; k++) {
                    share_roles_obj.addOption({
                        id: data.external_roles[k],
                        value: data.external_roles[k],
                        group: 'external'
                    });
                }
                for (var k = 0; k < data.internal_roles.length; k++) {
                    share_roles_obj.addOption({
                        id: data.internal_roles[k],
                        value: data.internal_roles[k],
                        group: 'internal'
                    });
                }
                sendAjaxCall(intalio_bpms.task_filter.getAssignedToUsers, "GET", false, true, "json", {}, handleAdhocError, function(data) {
                    share_users_obj.clearOptions();
                    if ($(obj).hasClass("share")) {
                        $("#shareAccessmodal").find("span.modal_heading").text($("#shareReports").text());
                        $("#shareAccessmodal").find(".modal-footer > button").text($("#shareButton").text());
                        $("#shareAccessmodal").find(".modal-footer > button").addClass('share').removeClass('access');
                    } else {
                        $("#shareAccessmodal").find(".modal-body #errorMessage").text("");
                        $("#shareAccessmodal").find("span.modal_heading").text($("#grantAccess").text());
                        $("#shareAccessmodal").find(".modal-footer > button").text($("#grantAccessBtn").text());
                        $("#shareAccessmodal").find(".modal-footer > button").addClass('access').removeClass('share');
                    }
                    var peers = data.users.peers;
                    var subordinates = data.users.subordinates;
                    for (var k = 0; k < subordinates.length; k++) {
                        $.each(peers, function(key,value){
                            if (value!=undefined && value.userID == subordinates[k].userID)
                                peers.splice(key, 1);
                        });
                    }
                    for (var k = 0; k < peers.length; k++) {
                        share_users_obj.addOption({
                            id: peers[k].userID,
                            value: peers[k].userName,
                            group: 'peers'
                        });
                    }
                    for (var k = 0; k < subordinates.length; k++) {
                        share_users_obj.addOption({
                            id: subordinates[k].userID,
                            value: subordinates[k].userName,
                            group: 'subordinates'
                        });
                    }
                    $(obj).hasClass("share") == true ? columnsData = getSelectedRows(adhocTable, "id") : columnsData = getSelectedRows(adhocTemplateTable, "id");
                    if (columnsData.length == 1) {
                        sendAjaxCall(intalio_bpms.adhoc_reporting.get_report_accessors + "/" + columnsData[0], "GET", false, true, "json", {}, handleAdhocError, function(data) {
                            share_roles_obj.setValue(data.accessors.roles);
                            share_users_obj.setValue(data.accessors.users);
                            removeLoading();
                        });
                    } else
                        removeLoading();
                });
            });
        } else
            $(obj).hasClass("share") == true ? showInformation($("#shareReportsMsg").text()) : showInformation($("#grantAccessMsg").text());
    },
    validate: function(obj) {
        $(obj).hasClass("share") == true ? columnsData = getSelectedRows(adhocTable, "id") : columnsData = getSelectedRows(adhocTemplateTable, "id");
        return columnsData.length > 0 ? true : false;
    },
    execute: function(obj) {
        var columnsData, url, data = {};
        if ($("#share-users").val() == null && $("#share-roles").val() == null) {
            $("#shareAccessmodal").find(".modal-body #errorMessage").text($("#shareAccessMsg").text());
            return false;
        }
        if ($("#share-users").val() != null && $("#share-users").val() != undefined)
            data.users = $("#share-users").val();
        if ($("#share-roles").val() != null && $("#share-roles").val() != undefined)
            data.roles = $("#share-roles").val();
        if ($(obj).hasClass("share")) {
            columnsData = getSelectedRows(adhocTable, "id");
            url = intalio_bpms.adhoc_reporting.share_reports;
        } else {
            columnsData = getSelectedRows(adhocTemplateTable, "id");
            url = intalio_bpms.adhoc_reporting.grant_access;
        }
        data.report_ids = columnsData;
        modalHide("shareAccessmodal");
        sendAjaxCall(url, "POST", false, true, "json", data, handleAdhocError, function(data) {
            if (data.success_message != undefined && data.success_message) {
                showNotification($("#successMessage").text());
                if ($(obj).hasClass("access")) {
                    modalShow("manageTemplatesModal");
                    $('#templatesHeader th input:first').prop('checked', false);
                    $('#adhocTemplates tbody td').each(function() {
                        $(this).find('input:first').prop('checked', false);
                    });
                    fetchTemplateReports();
                } else {
                    fetchAdhocReports();
                    $('#adhoc_reports_list tbody td').each(function() {
                        $(this).find('input:first').prop('checked', false);
                    });
                }
            } else if (data.error_message != undefined)
                showErrorNotification(data.error_message);
        });
    }
}

function deleteConfirmation(obj){
    var length = 0;
    var type = $(obj).closest('.dataTables_wrapper').attr('type');
    $('#confirmationDialog .confirmDelete').attr('reporttype',type);
    length = type == 'report' ? getSelectedRows(adhocTable, "id").length : getSelectedRows(adhocTemplateTable, "id").length;
    if(length==0 && type == 'report')
        showInformation($("#shareReportsMsg").text());
    else if(length==0 && type == 'template')
        showInformation($("#grantAccessMsg").text());
    else{
        $("#confirmationDialog").find(".modal-body #confirmMessage").text($("#deleteConfirmation").text().replace("{0}",length));
        modalShow("confirmationDialog");
    }
}

function deleteReport(obj){
    modalHide("confirmationDialog");
    var type = $(obj).attr('reporttype');
    var data,url;

    url = type == 'report' ? intalio_bpms.adhoc_reporting.delete_report : intalio_bpms.adhoc_reporting.delete_template;
    data = type == 'report' ? {report_ids : getSelectedRows(adhocTable,"id")} : {definition_ids : getSelectedRows(adhocTemplateTable,"id")};
    addLoading($('#adhoc_reports_list_wrapper'));
    sendAjaxCall(url, "POST", false, true,"json",data,handleAdhocError,function(data){
		if(data.unauthorized_reports!=undefined && data.unauthorized_reports.length>0)
			showErrorNotification($("#deleteUnauthorizedMsg").text());
        else if(data.success_message!=undefined && data.success_message){
            type == 'report' ? fetchAdhocReports() : fetchTemplateReports();
            showNotification($("#successMessage").text());
        }else if(data.error_message!=undefined)
            showErrorNotification(data.error_message);
    });
}

function showExpressionHint() {
    var exp = expressionEditor.getValue();
    var words = exp.split(' ');
    var last = words.pop();
    if (last.charAt(0) == '$') {
        var rect = $('.expression-editor .CodeMirror-cursor')[0].getBoundingClientRect();
        if (rect) {
            $('#show-expression-hint').removeClass('hide').css({
                top: rect.top - 70,
                right: rect.right + 50,
                position: 'absolute'
            });
            $('#show-expression-hint').empty().append(getColumnHints(last))
        }

    } else {
        $('#show-expression-hint').addClass('hide');
    }
}
