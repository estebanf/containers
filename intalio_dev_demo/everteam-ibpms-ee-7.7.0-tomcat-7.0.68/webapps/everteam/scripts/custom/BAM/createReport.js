/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 * Author : Yoganand
 */

/* The expressions used in craeation of report */
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
    'in': {
        name: 'In',
        exp: 'in',
        fieldType: 'multiple'
    }
}
/* The default options for formating */
var columnFormatOptions = {
    operator: '',
    conValue: '',
    prop: {
        background: '#ffffff',
        color: '#393939',
        bold: false,
        italics: false,
        underline: false,
        strike: false
    }
}
var default_format_css = {
                'background-color': '#ffffff',
                color: '#393939',
                'text-decoration' : 'none',
                'font-weight':'normal',
                'font-style':'normal'
            };
/* List of Select variables used in create report */
var customColFunctionSel,customColTypeSel;
var formatCondition, modifyCondition, dataSetSelect;
var xAxisSelect, yAxisSelect, chartOrderBy, chartOrderTypeSel, chartGroupBy,chartTypeSelect,chartLegendSel;
var report_default_column_width;
/* Initialize wizard */
/**
 * @Function Name   : startReportWizard
 * @Description     : Will be called on clicking of design report button
 * @param           :
 * @returns         :
 * */
function startReportWizard() {
    $("#createReportError").addClass("hide");
    $('input[name=report-select-radio]').prop('checked', false);
    initializeCreateReport();
    goToStep();
    dragtable.init();
}
/**
 * @Function Name   : initializeCreateReport
 * @Description     : Initilizes all the fields in create report modal
 * @param           :
 * @returns         :
 * */
function initializeCreateReport() {
    $('.ace-popover').popover();
    dataSetSelect = $('#dataset-select').selectize({
        maxItems: 1,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        options: [],
        create: false
    });
    dataSetSelect = dataSetSelect[0].selectize
    /* Populate fomrat conditions */
    $('#format-condition').empty();
    var sel = $('#format-condition').selectize({
        maxItems: 1,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        options: [],
        create: false
    });
    formatCondition = sel[0].selectize
    $('#modify-condition').empty();
    sel = $('#modify-condition').selectize({
        maxItems: 1,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        options: [],
        create: false
    });
    modifyCondition = sel[0].selectize
    $.each(propConditions, function(key, val) {
        op = {
            id: key,
            title: val.name
        };
        formatCondition.addOption(op);
        modifyCondition.addOption(op);
    });
    /* set Height for  table properties div*/
    $('#column_properties').css('height', $(window).height() - 280 + 'px');
    $('#format-colorpicker-1, #format-colorpicker-2').ace_colorpicker();
    $('#design-chart-type').empty();
    var modalBodyHeight = $('#column_properties').height();
    $('#report-step1 > div , #report-step5 > div').css('margin-top', modalBodyHeight / 2 - 30 + 'px');
    $('#report-step2 .col-sm-9').css('height', '100%');
    $('#columns-tree').css('height', modalBodyHeight-160 + 'px')
    $('#custom-tree-div').addClass('hide')
    var sel = $('#design-chart-type').selectize({
        maxItems: 1,
        valueField: 'value',
        labelField: 'title',
        searchField: 'title',
        options: availableChartTypes,
        create: false
    });
    chartTypeSelect = sel[0].selectize
    xAxisSelect = applySelectize($('#design-report-x-axis'), [], [], 1, false);
    yAxisSelect = applySelectize($('#design-report-y-axis'), [], [], 1, false);
    legendSelObj = $('#legend-position-select').selectize({
        create: false,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        options: [{
            id: 'Below',
            title: 'Bottom'
        }, {
            id: 'Right',
            title: 'Right'
        }],
        maxItems: 1
    });
    chartLegendSel = legendSelObj[0].selectize
    $('#accordion1').css({
        'max-height': $(window).height() - 240 + 'px',
        'overflow': 'auto'
    })
    customColFunctionSel = $('#custom-column-function').selectize({
        create: false,
        maxItems: 1
    });
    customColFunctionSel = customColFunctionSel[0].selectize
    customColTypeSel = $('#custom-column-type').selectize({
        create: false,
        maxItems: 1
    });
    customColTypeSel = customColTypeSel[0].selectize
    chartOrderBy = applySelectize($('#design-chart-order-by'), [], [], 1, false);
    chartGroupBy = applySelectize($('#design-chart-group-by'), [], [], 1, false);
    chartOrderTypeSel = $('#design-chart-order-type').selectize({
        create: false,
        maxItems: 1
    });
    chartOrderTypeSel = chartOrderTypeSel[0].selectize
    var modalheight = $(window).height() - 175;
    //step2
    $('#dataset-select').attr('change-check','true');
    dataSetSelect.clearOptions();
    $('#dataset-select').attr('change-check','false');
    $('#columns-tree,#custom-columns-tree').empty();
    $('#custom_column_div').addClass('hide');
    $('.drop-area > table').remove();
    $('.drop-area').addClass('drop-highlight').css('height', modalheight - 245 + 'px');
    $('.drop-area .drag-empty').removeClass('hide');
    $('.getSampleData').addClass('hide');
    //step3
    $('#design-table,#design-chart').css('height', '270px')
    $('#design-report-filter .tabbable .tab-content').css({
        'height': modalheight - 270 + 'px'
    });
    // removing previous filters
    $('.row-filter .filter-condition > table tr').remove();
    //step4
    $('#table_properties .column-selector').css('height', '270px');
    $('#table_properties #column_properties .tab-content').css('height', modalheight - 270 + 'px');
    $('#chart_properties .chart-prop-preview').css('height', '270px');
    $('#chart_properties #chart-prop-tab .tab-content').css('height', modalheight - 270 + 'px');
    clearSelectOptions();
}
/**
 * @Function Name   : clearSelectOptions
 * @Description     : Step3: Clears select values
 * @param           :
 * @returns         :
 * */
function clearSelectOptions(){
    xAxisSelect.clearOptions();
    yAxisSelect.clearOptions();
    chartOrderBy.clearOptions();
    chartGroupBy.clearOptions();
    chartTypeSelect.clear();
}

/* For initilizing step on each click */
/**
 * @Function Name   : initializeStep
 * @Description     : Calls corresponding function based on step number
 * @param           : step (Step number)
 * @returns         :
 * */
function initializeStep(step) {
    switch (step) {
        case 1:
            getReportSources();
            break;
        case 2:
            getDatasets();
            break;
        case 3:
            showDesignReport();
            break;
        case 4:
            defineReportProperties();
            break;
        case 5:
            showFinalStep();
            break;
    }
}
/**
 * @Function Name   : goToStep
 * @Description     : Shows div elements according to step number
 * @param           :
 * @returns         :
 * */
function goToStep() {
    var step = adhoc.newReport.currentStep,
        last = adhoc.newReport.completedNo;
    $('#fuelux-wizard ul li .step').removeClass('active');
    $('#report-steps .report-step').addClass('hide');
    $('#report-step' + step).removeClass('hide');
    $('#createReportModal .modal_heading').text(adhoc.newReport.stepHeading[step]);
    $('#fuelux-wizard ul li:eq(' + (step - 1) + ') .step').addClass('active');
    $('#fuelux-wizard ul li:eq(' + (step - 1) + ')').addClass('active');
    controlNavButtons(step);
    initializeStep(step);
}
/**
 * @Function Name   : goToStepNo
 * @Description     : Triggers goToStep 
 * @param           : no, obj
 * @returns         :
 * */
function goToStepNo(no, obj) {
    $("#createReportError").addClass("hide");
    if ($(obj).hasClass('active')) {
        no = parseInt(no)
        adhoc.newReport.currentStep = no
        goToStep();
    }
}
/**
 * @Function Name   : nextReportStep
 * @Description     : This will be called on clicking of next button
 * @param           :
 * @returns         :
 * */
function nextReportStep() {
    step = adhoc.newReport.currentStep + 1
    adhoc.newReport.completedNo = adhoc.newReport.completedNo > step - 1 ? adhoc.newReport.completedNo : step - 1
    adhoc.newReport.currentStep = step
    goToStep();
}
/**
 * @Function Name   : prevReportStep
 * @Description     : This will be called on clicking of prev button
 * @param           :
 * @returns         :
 * */
function prevReportStep() {
    $("#createReportError").addClass("hide");
    step = adhoc.newReport.currentStep - 1
    adhoc.newReport.currentStep = step
    goToStep();
}
/**
 * @Function Name   : controlNavButtons
 * @Description     : Enabaling or Desabling nav buttons based on step number
 * @param           : i (step)
 * @returns         :
 * */
function controlNavButtons(i) {
    if (i > 1) {
        $('.prevStep').removeClass('hide');
    } else if (i == 1) {
        $('.prevStep').addClass('hide');
    } else
        $('.prevStep').addClass('hide');
    if (i == 5) {
        $('.nextStep').addClass('hide');
        $('.finalStep').removeClass('hide');
    } else {
        $('.nextStep').removeClass('hide');
        $('.finalStep').addClass('hide');
    }
}
/**
 * @Function Name   : enableNextButton
 * @Description     : It will enables next button based on step requirements
 * @param           : check (true/false)
 * @returns         :
 * */
function enableNextButton(check) {
    var step = adhoc.newReport.currentStep;
    if (check || adhoc.newReport.reportId != undefined) {
        $('#createReportModal .nextStep').removeAttr('disabled');
        //$('#fuelux-wizard ul li:eq(' + step + ')').addClass('active');
    } else {
        $('#createReportModal .nextStep').attr('disabled', 'true');
        //added by satish.
        $('#fuelux-wizard ul li:gt(' + parseInt(step-1)+ ')').removeClass('active');
    }
}

/* <-------         STEP1       ------> */
/**
 * @Function Name   : checkStep1
 * @Description     : Validates step requirements
 * @param           : This object
 * @returns         :
 * */
function checkStep1(obj) {
    var val = $('input[name=report-select-radio]:checked', '#createReportModal').val(),
        source = $('#data-definition').val();
    if (adhoc.newReport.reportId == undefined){
        adhoc.newReport.dataDefinitionId = source;
        if ($(obj).attr('id') == 'data-definition'){
            adhoc.newReport.dataSet = '';
            dataSetSelect.clearOptions();
        }
        adhoc.newReport.type = val
        if (val != undefined && source != '') {
            enableNextButton(true);
        } else
            enableNextButton(false);
    } 
}
/**
 * @Function Name   : getReportSources
 * @Description     : Get available report resources for current user
 * @param           :
 * @returns         :
 * */
function getReportSources() {
    if (adhoc.newReport.reportId == undefined){
        checkStep1();
        $('#report-step1 .ace').attr('disabled',false);
        $('#data-definition').closest('tr').removeClass('hide');
        if (adhoc.newReport.reportSource == undefined) {
            sendAjaxCall(intalio_bpms.adhoc_reporting.get_user_templates, "GET", false, true, "json", {}, handleAdhocError, function(data) {
                if (data.error_message == undefined) {
                    adhoc.newReport.reportSource = data.reports
                    showReportSources(data.reports);
                } else
                    showErrorNotification(data.error_message);
            });
        }
    } else {
        $('#report-step1 .ace').attr('disabled',true);
        $('#data-definition').closest('tr').addClass('hide');
        if (adhoc.newReport.type == 'chart'){
            $('#report-type-table').removeAttr('checked');
            $('#report-type-chart').attr('checked',true);
        } else {
            $('#report-type-table').attr('checked',true);
            $('#report-type-chart').removeAttr('checked');
        }
    }
}
/**
 * @Function Name   : showReportSources
 * @Description     : Forms select element with available list of resources
 * @param           :
 * @returns         :
 * */
function showReportSources(data) {
    $('#data-definition').empty();
    var sel = $('#data-definition').selectize({
        maxItems: 1,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        options: [],
        sortField:"sortId",
        create: false
    });
    sel = sel[0].selectize
    sel.clearOptions();
    for (var i = 0; i < data.length; i++) {
        var item = data[i],
            op = {
                id: item.id,
                title: item.name,
                sortId:i
            };
        sel.addOption(op)
    }
}
/* STEP1 ends */
/* <-------         STEP2       ------> */
/**
 * @Function Name   : checkStep2
 * @Description     : Validates second step requirements
 * @param           :
 * @returns         :
 * */
function checkStep2() {
    var val = adhoc.newReport.dataSet;
    var cols = adhoc.newReport.visual;
    if (val && val.length != 0 && cols.length != 0) {
        enableNextButton(true);
    } else
        enableNextButton(false);
}
/**
 * @Function Name   : getDatasets
 * @Description     : gets the datasets for selected report resource
 * @param           :
 * @returns         :
 * */
function getDatasets() {
    resetCustomColumn();
    if (adhoc.newReport.reportId == undefined){
        checkStep2();
        dataId = adhoc.newReport.dataDefinitionId;
        dataSetSelect.enable();
        if (adhoc.newReport.dataSet.length == 0){
            sendAjaxCall(intalio_bpms.adhoc_reporting.get_templates + '/' + dataId + '/datasets', "GET", false, true, "json", {}, handleAdhocError, function(data) {
                if (data.error_message == undefined) {
                    adhoc.newReport.dataSetSource = data.datasets
                    adhoc.newReport.dataSetObject = formDataSetObject(data.datasets);
                    formDataSetDiv(data.datasets);
                } else {
                    showErrorNotification(data.error_message);
                }
            });
        }
    } else {
        updateDatasetDiv();
    }   
}
/**
 * @Function Name   : formDataSetObject
 * @Description     : Convert data sets into required JSON format
 * @param           :
 * @returns         :
 * */
function formDataSetObject(data) {
    var obj = {}
    for (var i = 0; i < data.length; i++) {
        var item = data[i]
        obj[item.id] = item.columns;
    }
    return obj;
}
/**
 * @Function Name   : formDataSetDiv
 * @Description     : Forms data set select element
 * @param           :
 * @returns         :
 * */
function formDataSetDiv(data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i],
            op = {
                id: item.id,
                title: item.name
            }
        dataSetSelect.addOption(op);
    }
}
/**
 * @Function Name   : updateDatasetDiv
 * @Description     : Disabaling dataset select on update
 * @param           :
 * @returns         :
 * */
function updateDatasetDiv(){
    dataSetSelect.addOption({
        id : adhoc.newReport.dataSet,
        title : adhoc.newReport.dataSetName
    });
    $('#dataset-select').attr('change-check','true')
    dataSetSelect.setValue(adhoc.newReport.dataSet);
    $('#dataset-select').attr('change-check','false');
    dataSetSelect.disable();
    formColumnsTree($('#dataset-select'),true);
    formReportTable();
}
/**
 * @Function Name   : formColumnsTree
 * @Description     : Forms column list both predefined and custom
 * @param           : obj,check
 * @returns         :
 * */
function formColumnsTree(obj,check) {
    var id = $(obj).val(),
        dataSetObject = adhoc.newReport.dataSetObject;
    if (dataSetObject && dataSetObject != null && $(obj).attr('change-check') != 'true') {
        var columns = dataSetObject[id]
        var customCols = adhoc.newReport.customCols[id]
        adhoc.newReport.dataSet = id
        //Added by satish.
        if(check==false){
            adhoc.newReport.visual = [];
            adhoc.newReport.filter = [];
            adhoc.newReport.groups = [];
            adhoc.newReport.orders = [];
            adhoc.newReport.tableProp = [];
            $(".filter-condition").find('table').empty();
            $(".design-table-preview").find('table').empty();
            $("#modify-replace-value").val("");
        }
        //ended
        checkStep2();
        $('#columns-tree').empty();
        $('#custom-columns-tree').empty();
        if (id && id != '' && id.length > 0) {
            var ul = $('<ul/>').addClass('list-unstyled spaced');
            $.each(columns, function(key, val) {
                var li = $('<li/>')
                var item = $('<span/>'),
                    itemName = $('<span/>').addClass('move-elm')
                itemName.data('info', key);
                itemName.data('source', 'dataSetObject');
                itemName.attr({
                    draggable: "true",
                    ondragstart: 'dragDataset(event,this);'
                });
                var type = val.data_type.charAt(0).toUpperCase() + val.data_type.slice(1);
                item.append(itemName.append(' &nbsp; ' + val.name).append(' <span class="info-text"> ( ' + type + ' ) </span>'))
                var span = $('<span/>').addClass('column-info').append($('<i/>').addClass('fa fa-circle resizeIcon'));
                var nameHtml = getColumnDefinition(val);
                span.attr({
                    'data-placement':'bottom',
                    'data-content': nameHtml,
                    'data-trigger':'hover'
                })
                li.append(span).append(item);
                ul.append(li);
            });
            $('#columns-tree').append(ul);
            cul = $('<ul/>').addClass('list-unstyled spaced');
            if (customCols && customCols.length > 0) {
                $.each(customCols, function(key, val) {
                    var li = $('<li/>')
                    var item = $('<span/>'),
                        itemName = $('<span/>').addClass('move-elm')
                    itemName.data('info', key);
                    itemName.data('source', 'customCols');
                    itemName.data('name',val.name);
                    itemName.attr({
                        draggable: "true",
                        ondragstart: 'dragDataset(event,this);'
                    });
                    var type = val.data_type.charAt(0).toUpperCase() + val.data_type.slice(1);
                    item.append(itemName.append(' &nbsp; ' + val.name).append(' <span class="info-text"> ( ' + type + ' ) </span>'))
                    //li.append($('<i/>').addClass('fa fa-circle')).append(item)
                    var span = $('<span/>').addClass('column-info').append($('<i/>').addClass('fa fa-circle resizeIcon'));
                    //var nameHtml = getColumnDefinition(val);
                    var icons = $('<span/>').addClass('pull-right action-buttons')
                    var edit = $('<a/>').addClass('blue iconCursor editCustomCol').append($('<i/>').addClass('fa fa-pencil'))
                    var remove = $('<a/>').addClass('text-danger iconCursor').append($('<i/>').addClass('fa fa-trash-o'))
                    edit.attr('onclick','showUpdateCustomColumn(this)')
                    remove.attr('onclick','deleteCustomColumn("'+val.name+'",false)');
                    icons.append(edit).append(remove)
                    li.append(icons).append(span).append(item);
                    li.data('name', val.name)
                    cul.append(li);
                });
            }
            $('#custom-columns-tree').append(cul)
            $('#custom-tree-div').removeClass('hide');
            if ( check != true ){
                $('.drop-area > table').remove();
                $('.drop-area .drag-empty').removeClass('hide');
                $('.drop-area').addClass('drop-highlight');
                $('.getSampleData').addClass('hide');
                adhoc.newReport.visual = []
            }
        } else {
            $('#custom-tree-div').addClass('hide')
            $('.drop-area > table').remove();
            $('.drop-area .drag-empty').removeClass('hide');
            $('.drop-area').addClass('drop-highlight');
            $('.getSampleData').addClass('hide');
            adhoc.newReport.visual = []
        }
    }
}
/**
 * @Function Name   : getColumnDefinition
 * @Description     : forms quick info html about the column on hover
 * @param           : col
 * @returns         :
 * */
function getColumnDefinition(col){
    var table = $('<table/>').addClass('noLines').css('font-size','11px');
    $.each(col,function(key,val){
        var tr = $('<tr/>');
        tr.append($('<td/>').text(key));
        tr.append($('<td/>').text(': '+val));
        table.append(tr);
    });
    return $("<div />").append(table.clone()).html();
}

/* <---- Draggable functions ----> */
/**
 * @Function Name   : dragDataset
 * @Description     : This will be called on starting if dragging column
 * @param           : ev, obj
 * @returns         :
 * */
function dragDataset(ev, obj) {
    var info = $(obj).data('info')
    var source = $(obj).data('source')
    ev.dataTransfer.setData("text", info+'_'+source);
}

function allowDropDataset(ev, obj) {
    ev.preventDefault();
    var cols = adhoc.newReport.visual,
        text = ev.dataTransfer.getData("text")
    text = text.split('_')
    var id = text[0],
        source = text[1]
    $(obj).addClass('border-highlight');
    if (checkDuplicateColumn(id,source) == true)
        $(obj).addClass('already-exists');
}

function onDragLeaveDataset(ev, obj) {
    ev.preventDefault();
    $(obj).removeClass('border-highlight');
    $(obj).removeClass('already-exists');
}
/**
 * @Function Name   : dropDataset
 * @Description     : This will be called on dropping of column in the area
 * @param           : ev, obj
 * @returns         :
 * */
function dropDataset(ev, obj) {
    ev.preventDefault();
    var parent = adhoc.newReport.dataSet,
        cols = adhoc.newReport.visual,
        text = ev.dataTransfer.getData("text")
    text = text.split('_')
    var id = text[0],
        source = text[1]
    if (checkDuplicateColumn(id,source) == false){
        var vi = {
            index: parseInt(id),
            source: source,
            position: cols.length
        }
        cols.push(vi);
        if (cols.length != 0) {
            checkStep2();
        }
        formReportTable();
        adhoc.newReport.format_table_data = undefined
    }
    $(obj).removeClass('border-highlight');
    $(obj).removeClass('already-exists');
    //added by satish.
    updateDesignReport();
}
/* Dragable functions end */
/**
 * @Function Name   : checkDuplicateColumn
 * @Description     : Validates dropping of column 
 * @param           :
 * @returns         :
 * */
function checkDuplicateColumn(id,source){
    var cols = adhoc.newReport.visual ;
    for (var i = 0 ; i < cols.length; i++){
        var col = cols[i]
        if(col.index == id && col.source == source){
            return true
            break;
        }
    }
    return false
}
/**
 * @Function Name   : formReportTable
 * @Description     : Forms table element from dropped columns
 * @param           :
 * @returns         :
 * */
function formReportTable() {
    var cols = adhoc.newReport.visual
    var table = $('<table/>').addClass('table table-striped table-bordered table-hover preview-table');
    $('.drop-area > table').remove();
    $('.drop-area .drag-empty').addClass('hide');
    $('.drop-area').addClass('drop-highlight');
    $('.getSampleData').addClass('hide');
    var tr = $('<tr/>');
    columnOptions = '<a onclick="deleteReportColumn(this);" class="iconCursor ace-popover" style="color:#888888;" data-content="Remove Column" data-placement="left" data-trigger="hover"><i class="fa fa-times"></a>'
    if (cols.length == 0) {
        $('.drop-area .drag-empty').removeClass('hide');
        $('.drop-area').addClass('drop-highlight');
        $('.getSampleData').addClass('hide');
    } else {
        $('.drop-area .drag-empty').addClass('hide');
        $('.drop-area').removeClass('drop-highlight');
        $('.getSampleData').removeClass('hide');
        report_default_column_width = Math.round(100*100/cols.length)/100
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i]
            var item = adhoc.newReport[col.source][adhoc.newReport.dataSet][col.index]
            var th = $('<th/>').append(item.name)
            var sp = $('<span/>').addClass('pull-right')
            var d = $('<div/>').addClass('btn-group').append($(columnOptions).clone())
            sp.append(d);
            th.data('info', i)
            th.data('name',item.name);
            if (adhoc.newReport.tableProp[i])
                adhoc.newReport.tableProp[i].column_width = report_default_column_width
            tr.append(th.append(sp));
        }
        table.append(tr);
        $('.drop-area').append(table);
    }
    $('.ace-popover').popover();
    addLoading($('.drop-area'));
    if (cols.length > 0)
        getSampleReportData();
    else
        removeLoading();
}
/**
 * @Function Name   : getSampleReportData
 * @Description     : Gets data from server for dropped columns preview
 * @param           :
 * @returns         :
 * */
function getSampleReportData() {
    var d = getRequestData(adhoc.newReport.visual);
    sendAjaxCall(intalio_bpms.adhoc_reporting.report_preview, "POST", false, true, "json", d, handleAdhocError, function(data) {
        if (data.report_results != undefined && data.report_results.length > 0) {
            formVisualizeTable(data);
        } else {
            showErrorNotification(data.error_message)
        }
        removeLoading($('.drop-area'));
    },adhoc.preview_timeout+adhoc.grace_timeout);
}
/**
 * @Function Name   : deleteReportColumn
 * @Description     : This will be called on clicking of delete icon on column
 * @param           : obj
 * @returns         :
 * */
function deleteReportColumn(obj) {
    var colNo = $(obj).closest('th').data('info');
    var name = $(obj).closest('th').data('name');
    var cols = adhoc.newReport.visual,
        updatedCols = [],
        updatedProp = {}
    cols.splice(colNo, 1);
    for (var i = 0; i < cols.length; i++) {
        var col = cols[i]
        updatedProp[i] = adhoc.newReport.tableProp[col.position]
        col.position = i
        updatedCols.push(col);
    }
    adhoc.newReport.tableProp = updatedProp
    adhoc.newReport.visual = updatedCols
    checkStep2();
    updateFilterGroupOrder(name);
    formReportTable();
    adhoc.newReport.format_table_data = undefined
}
/**
 * @Function Name   : formVisualizeTable
 * @Description     : Adds rows to the preview table
 * @param           : data
 * @returns         :
 * */
function formVisualizeTable(data) {
    data = data.report_results[0]
    cols = adhoc.newReport.visual;
    $('.drop-area > table tr:gt(0)').remove();
    var rowLength = data.rows.length > adhoc.max_preview_rows ? adhoc.max_preview_rows : data.rows.length
    for (var i = 0; i < rowLength; i++) {
        var row = data.rows[i].data,
            tr = $('<tr/>')
        for (j = 0; j < cols.length; j++) {
            var td = $('<td/>');
            if (getColumnDataType(cols[j]) == 'date-time'){
                td.text(convertDateTimeFormat(row[j]))
            } else {
                td.text(row[j])
            }
            tr.append(td)
        }
        $('.drop-area > table').append(tr);
    }
}
/**
 * @Function Name   : getColumnDataType
 * @Description     : Gets the data type of column
 * @param           :
 * @returns         :
 * */
function getColumnDataType(col){
    var dataSet = adhoc.newReport.dataSet
    var column = adhoc.newReport[col.source][dataSet][col.index]
    if (column){
        return column.data_type
    } else
        return 'string'
}
/* <---- Custom Column Functions ----> */
/**
 * @Function Name   : showAddCustomColumn
 * @Description     : Displays add custom column div
 * @param           :
 * @returns         :
 * */
function showAddCustomColumn(){
    $('#custom-col-update').addClass('hide')
    $('#custom-col-add').removeClass('hide')
    resetCustomColumn();
    $('#custom-column-name').removeProp('disabled')
    $('#custom_column_div').removeClass('hide');
    expressionEditor.refresh()
}
function hideCustomColumn(){
    $('#custom_column_div').addClass('hide')
}
/**
 * @Function Name   : addCustomColumn
 * @Description     : This will be called on clicking of add button on custom column div
 * @param           : colName,type
 * @returns         :
 * */
function addCustomColumn(colName,type) {
    var name = $('#custom-column-name').val();
    var displayName = $('#custom-column-display-name').val();
    var colFunction = $('#custom-column-function').val();
    var colType = $('#custom-column-type').val();
    var exp = expressionEditor.getValue();
    if (name == undefined || name.length == 0) {
        $('#custom-column-error').removeClass('hide').find('td').text($("#customNameError").text())
        return false
    } else {
        if (checkColumnName(name) && type !='update') {
            $('#custom-column-error').removeClass('hide').find('td').text($("#customNameExists").text())
            return false
        }
        if(name.indexOf(' ') != -1){
            $('#custom-column-error').removeClass('hide').find('td').text('Spaces are not allowed in column name.')
            return false
        }      
    }
    if (displayName == undefined || displayName.length == 0) {
        $('#custom-column-error').removeClass('hide').find('td').text($("#customDisplayName").text())
        return false
    }
    if (colType == undefined || colType.length == 0) {
        $('#custom-column-error').removeClass('hide').find('td').text($("#customColumnType").text())
        return false
    }
    if (exp == undefined || exp.length == 0) {
        $('#custom-column-error').removeClass('hide').find('td').text($("#customExpression").text())
        return false
    } else {
        var expression = formColumnExpression(exp);
    }
    var col = {
        name: name,
        expression: expression,
        editor_exp: exp,
        display_name: displayName,
        data_type: colType,
        type: 'simple'
    }
    if (colFunction && colFunction.length > 0) {
        col.aggregate_function = colFunction
        col.type = 'aggregated'
    }
    var dataSet = adhoc.newReport.dataSet
    if (colName != undefined && colName != null) {
        var customCols = adhoc.newReport.customCols[dataSet]
        for (var i = 0; i < customCols.length; i++) {
            if (colName == customCols[i].name) {
                if (!checkColumnName(name,i)){
                    validateCustomColumn(col, dataSet, colName, i);
                } else{
                    $('#custom-column-error').removeClass('hide').find('td').text($("#customNameExists").text())
                    return false
                }
                break;
            }
        }
    } else
        validateCustomColumn(col, dataSet)
}

/**
 * @Function Name   : validateCustomColumn
 * @Description     : validates the new custom column values and show the response
 * @param           : col, dataSet, colName, colIndex
 * @returns         :
 * */
function validateCustomColumn(col, dataSet, colName, colIndex) {
    var col = JSON.parse(JSON.stringify(col));
    var report = {
        items: [{
            title: '',
            data_set_id: dataSet,
            item_type: 'TABLE',
            type: 'TABLE',
            series: [{
                title: col.display_name,
                visible: true,
                type: 'TABLE',
                column: JSON.parse(JSON.stringify(col))
            }],
            filters: [],
            groups: [],
            metadata: {
                type: 'TABLE',
                page_break: 10,
                highlights: []
            }
        }],
        custom_columns: {},
        metadata: {
            name: 'preview',
            type: 'REPORT'
        }
    }
    report.custom_columns[dataSet] = formCustomColumns(JSON.parse(JSON.stringify([col])));
    report.items[0].series[0].column.expression = 'dataSetRow["' + col.name + '"]';
    delete report.items[0].series[0].column['editor_exp'];
    var data = {
        report: JSON.stringify(report),
        report_id: adhoc.newReport.dataDefinitionId
    }
    addLoading($('#custom_column'));
    sendAjaxCall(intalio_bpms.adhoc_reporting.report_preview, "POST", false, true, "json", data, handleAdhocError, function(data) {
        if (data.success_message != undefined && data.success_message == true) {
            if (colName != undefined && colName != null) {
                showNotification(colName + ' updated successfully.')
                customCols = adhoc.newReport.customCols
                if (customCols[dataSet] != undefined) {
                    customCols[dataSet][colIndex] = JSON.parse(JSON.stringify(col));
                }
                adhoc.newReport.customCols = customCols;
                formReportTable();
                formColumnsTree($('#dataset-select'),true);
                resetCustomColumn();
                hideCustomColumn();
            } else {
                showNotification('Custom column created successfully.')
                customCols = adhoc.newReport.customCols
                if (customCols[dataSet] != undefined) {
                    var index = customCols[dataSet].length
                    customCols[dataSet].push(JSON.parse(JSON.stringify(col)));
                } else {
                    customCols[dataSet] = [];
                    var index = 0;
                    customCols[dataSet].push(JSON.parse(JSON.stringify(col)));
                }
                adhoc.newReport.customCols = customCols
                var finalCol = {
                    index: index.toString(),
                    position: adhoc.newReport.visual.length,
                    source: 'customCols'
                }
                adhoc.newReport.visual.push(finalCol);
                formReportTable();
                formColumnsTree($('#dataset-select'),true);
                resetCustomColumn();
                hideCustomColumn();
                //added by satish.
                updateDesignReport();
            }
        } else {
            showErrorNotification(data.error_message);
        }
        removeLoading($('#custom_column'));
    },adhoc.preview_timeout+adhoc.grace_timeout);
}
/**
 * @Function Name   : formCustomColumns
 * @Description     : Forms list of custom columns 
 * @param           :
 * @returns         :
 * */
function formCustomColumns(cols) {
    var name;
    for (var i = 0; i < cols.length; i++) {
        delete cols[i]['editor_exp']
        name = cols[i].name
    }
    var dataSet = adhoc.newReport.dataSet
    var custom = adhoc.newReport.customCols[dataSet];
    if (custom && custom.length !=0){
        custom = JSON.parse(JSON.stringify(custom));
        for (var i = 0 ; i < custom.length ; i++){
            if (name != custom[i].name){
                delete custom[i]['editor_exp']
                cols.push(custom[i])
            }
        }
    }
    return cols
}
/**
 * @Function Name   : resetCustomColumn
 * @Description     : Resets the fields of custom column div
 * @param           :
 * @returns         :
 * */
function resetCustomColumn() {
    $('#custom-column-name').val('');
    $('#custom-column-display-name').val('')
    $('#custom-column-function').val('')
    customColFunctionSel.clear();
    customColTypeSel.clear();
    expressionEditor.clearHistory();
    expressionEditor.setValue('');
    $('.custom-col-cancel,.custom-col-delete,.custom-col-update').addClass('hide');
    $('.custom-col-add').removeClass('hide');
    $('#custom-column-error').addClass('hide');
}
/**
 * @Function Name   : checkColumnName
 * @Description     : Validates column name duplicate entry
 * @param           : name,index
 * @returns         :
 * */
function checkColumnName(name,index) {
    var dataSet = adhoc.newReport.dataSetObject[adhoc.newReport.dataSet]
    var customCols = adhoc.newReport.customCols[adhoc.newReport.dataSet]
    check = false
    for (var i = 0; i < dataSet.length; i++) {
        var col = dataSet[i]
        var dName = col.name
        if (index != i){
            if (name == dName) {
                check = true
                break;
            }
        }
    }
    if (customCols){
        for (var i = 0; i < customCols.length; i++) {
            var col = customCols[i]
            var dName = col.name
            if (index != i){
                if (name == dName) {
                    check = true
                    break;
                }
            }
        }
    }
    return check
}
/**
 * @Function Name   : formColumnExpression
 * @Description     : replace $ in entered expression with row[]
 * @param           :
 * @returns         :
 * */
function formColumnExpression(exp) {
    var colDefs = adhoc.newReport.dataSetObject[adhoc.newReport.dataSet]
    var customCols = adhoc.newReport.customCols[adhoc.newReport.dataSet]
    var colNames = []
    for (var i = 0; i < colDefs.length; i++){
        var name = colDefs[i].name;
        colNames.push(name);
    }
    if (customCols){
        for (var i = 0; i < customCols.length; i++){
            var name = customCols[i].name;
            colNames.push(name);
        }
    }
    colNames = colNames.sort(function(a, b){
        return  b.length - a.length; // ASC -> a - b; DESC -> b - a
    });
    for (var i = 0; i < colNames.length; i++){
        exp = replaceAll('$'+colNames[i],'row["'+colNames[i]+'"]',exp)
    }
    /*var words = exp.split(' ');
    var newExp = ''
    for (var i = 0; i < words.length; i++) {
        var word = words[i]
        if (word[0] == '$'){
            word = 'row["' + word.replace('$','') + '"]'
        }
        newExp += word+' '
    } */

    return exp;
}
function replaceAll(find, replace, str) {
  return str.split(find).join(replace)
}

/**
 * @Function Name   : editExpressionOnHint
 * @Description     : Modifies expression value in field based on selection
 * @param           : obj
 * @returns         :
 * */
function editExpressionOnHint(obj) {
    var col = $(obj).data('info');
    if (col) {
        var exp = expressionEditor.getValue();
        var words = exp.split(' ');
        var last = words.pop();
        last = '$' + col.name
        words.push(last);
        words = words.join(' ')
        expressionEditor.setValue(words);
        $('#show-expression-hint').addClass('hide');
        expressionEditor.focus();
        expressionEditor.setCursor(expressionEditor.lineCount(), 0)
    }
}
/**
 * @Function Name   : getColumnHints
 * @Description     : Shows suggestions on typying of text in expression editor
 * @param           :
 * @returns         :
 * */
function getColumnHints(word) {
    word = word.toLowerCase();
    word = word.replace('$', '')
    var list = []
    var div = $('<div/>')
    var colDefs = adhoc.newReport.dataSetObject[adhoc.newReport.dataSet]
    for (var i = 0; i < colDefs.length; i++) {
        col = colDefs[i]
        name = col.name.toLowerCase()
        if (name.indexOf(word) > -1 || col.display_name.toLowerCase().indexOf(word) > -1) {
            list.push(col);
            var elm = $('<div/>').addClass('hint-highlight')
            elm.append(col.name);
            elm.data('info', col);
            elm.attr('onclick', 'editExpressionOnHint(this)')
            div.append(elm);
        }
    }
    div.data('info', list);
    return div
}
/**
 * @Function Name   : showUpdateCustomColumn
 * @Description     : Shows custom column div to update current custom column
 * @param           : obj
 * @returns         :
 * */
function showUpdateCustomColumn(obj) {
    obj = $(obj).closest('li').find('.move-elm')
    var index = $(obj).data('info');
    var source = $(obj).data('source');
    var name = obj.data('name')
    $('#custom_column_div').removeClass('hide');
    $('#columns-tree li').removeClass('active');
    $(obj).closest('li').addClass('active');
    var column = adhoc.newReport[source][adhoc.newReport.dataSet][index];
    $('#custom-column-name').val(column.name);
    $('#custom-column-display-name').val(column.display_name)
    if (column.aggregate_function)
        customColFunctionSel.setValue(column.aggregate_function)
    customColTypeSel.setValue(column.data_type)
    expressionEditor.getDoc().setValue(column.editor_exp);
    $('.custom-col-update').removeClass('hide').data('name',name);
    $('.custom-col-add').addClass('hide');
    if (column.user_defined == true)
        $('#custom-column-name').attr('disabled',true);
    else
        $('#custom-column-name').removeProp('disabled')
}
/**
 * @Function Name   : updateCustomColumn
 * @Description     : This is called on click of update button
 * @param           : obj
 * @returns         :
 * */
function updateCustomColumn(obj) {
    var name = $(obj).data('name');
    addCustomColumn(name,'update');
}
/**
 * @Function Name   : deleteCustomColumn
 * @Description     : Remove custom column from list and from table also
 * @param           : name
 * @returns         :
 * */
function deleteCustomColumn(name,flag) {
    if(flag){
        $('#confirmationDialog').find('.modal_heading').text($("#deleteDataDefOrReport").text());
        $('#confirmationDialog').find('.confirmDelete').attr('onclick','javascript:deleteReport(this)');
        modalHide('confirmationDialog');
        var customCols = adhoc.newReport.customCols[adhoc.newReport.dataSet]
        var index = null,
            vIndex = null;
        var updatedCols = [],
            updatedProp = {}
        for (var i = 0; i < customCols.length; i++) {
            if (customCols[i].name == name) {
                index = i
                break;
            }
        }
        var column = null;
        if (index != null) {
            column = customCols[index]
            customCols.splice(index, 1);
        }
        adhoc.newReport.customCols[adhoc.newReport.dataSet] = customCols
        var visual = adhoc.newReport.visual;
        for (var i = 0; i < visual.length; i++) {
            if (visual[i].index == index && visual[i].source == 'customCols') {
                vIndex = i
                break;
            }
        }
        if (vIndex != null) {
            visual.splice(vIndex, 1);
        } 
        for (var i = 0; i < visual.length; i++) {
            var col = visual[i]
            updatedProp[i] = adhoc.newReport.tableProp[col.position]
            col.position = i
            if (col.source == 'customCols' && col.index > parseInt(index)){
                col.index = col.index - 1 
            }
            updatedCols.push(col);
        }
        
        adhoc.newReport.tableProp = updatedProp
        adhoc.newReport.visual = updatedCols
        if (column != null){
            updateFilterGroupOrder(column.name);
        }
        formReportTable();
        formColumnsTree($('#dataset-select'),true);
        resetCustomColumn();
        hideCustomColumn();
    }else{
        $('#confirmationDialog').find('.modal_heading').text($("#adhocReportDeleteCustomColHeader").text().replace("{0}",name));
        $('#confirmationDialog').find('#confirmMessage').text($('#adhocReportDeleteCustomCol').text());
        $('#confirmationDialog').find('.confirmDelete').attr('onclick','javascript:deleteCustomColumn("'+name+'",true)');
        modalShow('confirmationDialog');
    }
}
/**
 * @Function Name   : updateFilterGroupOrder
 * @Description     : Checks if any custom column is used in Groups or Filters or Orders and deletes from there.
 * @param           : name of column
 * @returns         :
 * */
function updateFilterGroupOrder(name){
    var filters = adhoc.newReport.filter
    var groups = adhoc.newReport.groups
    var orders = adhoc.newReport.orders
    fIndex = []
    for (var i = 0; i < filters.length ; i++){
        var fil = filters[i]
        if (name == fil.column){
            fIndex.push(i)
        }
    }
    if (groups.length > 0){
        group = groups[0]
        if (group){
            if (group.column_bindings[0] == name)
                groups = []
        }
    }
    if (orders.key){
        var keyName = orders.key.replace('row["','').replace('"]','') 
        if (keyName == name)
            orders = {}
    }
    filters = filters.multisplice(fIndex);
    adhoc.newReport.filter = filters
    adhoc.newReport.groups = groups
    adhoc.newReport.orders = orders
    //added by satish.
    updateDesignReport();
}
/**
 * @Function Name   : cancelCustomColumn
 * @Description     : Cancel the update of custom column
 * @param           :
 * @returns         :
 * */

function cancelCustomColumn() {
    var name = $('#columns-tree li.active').data('name');
    resetCustomColumn();
    $('.custom-col-cancel, .custom-col-delete, .custom-col-update').addClass('hide');
    $('.custom-col-add').removeClass('hide');
    $('#columns-tree li').removeClass('active');
}
/* Custom Column ends */
/* <-----           STEP3     -----> */
/**
 * @Function Name   : checkStep3
 * @Description     : Chekc requirements for step3
 * @param           :
 * @returns         :
 * */
function checkStep3() {
    var type = adhoc.newReport.chart.type,
        x = adhoc.newReport.chart.xAxis,
        y = adhoc.newReport.chart.yAxis
    if (x != undefined && y != undefined && type != undefined) {
        enableNextButton(true);
        $('#define-chart-preview').addClass('hide');
        $('#design-chart-preview').removeClass('hide');
    } else {
        enableNextButton(false);
        $('#define-chart-preview').removeClass('hide');
        $('#design-chart-preview').addClass('hide');
    }
}
/**
 * @Function Name   : showDesignReport
 * @Description     : Initilizes the step3 for chart and table.
 * @param           :
 * @returns         :
 * */
function showDesignReport() {
    type = adhoc.newReport.type;
    if (type == 'table') {
        $('#design-table').removeClass('hide');
        $('#design-chart').addClass('hide');
        $('#design-report-filter .tab-content .tab-pane').removeClass('active');
        $('#design-report-filter .tab-content .tab-pane:eq(1)').addClass('active');
        $('#design-report-filter .nav-tabs li').removeClass('active');
        $('#design-report-filter .nav-tabs li:eq(0)').addClass('hide');
        $('#design-report-filter .nav-tabs li:eq(1)').addClass('active');
        $('#design-report-filter .nav-tabs li:eq(3)').removeClass('hide');
        initializeDesignTableStep();
        getDesignTablePreview();
    } else if (type == 'chart') {
        $('#design-table').addClass('hide');
        $('#design-chart').removeClass('hide');
        $('#design-report-filter .tab-content .tab-pane').removeClass('active');
        $('#design-report-filter .tab-content .tab-pane:eq(0)').addClass('active');
        $('#design-report-filter .nav-tabs li').removeClass('active');
        $('#design-report-filter .nav-tabs li:eq(0)').removeClass('hide').addClass('active');
        $('#design-report-filter .nav-tabs li:eq(3)').addClass('hide');
        showDesignChartStep();
    }
    if (adhoc.newReport.reportId != undefined){
        updateDesignReport();
    }
}
/**
 * @Function Name   : updateDesignReport
 * @Description     : Fill the values of filter on updating report
 * @param           :
 * @returns         :
 * */
function updateDesignReport(){
    var filters = adhoc.newReport.filter
    $('.filter-condition > table  tr').remove();
    if (filters && filters.length > 0){
        formReportfilters(filters);
    }
}
/**
 * @Function Name   : formReportfilters
 * @Description     : Forms the list filters and values in them
 * @param           : list of filters JSON array
 * @returns         :
 * */
function formReportfilters(filters){
    for (var i =0; i < filters.length; i++){
        var filter = filters[i]
        var tr = $('<tr/>').addClass('current')
        var colSel = $('<select/>').attr('onchange', 'filterColumnChange(this);').attr('placeholder', 'Choose Column');
        var cols = adhoc.newReport.visual;
        var dataSet = adhoc.newReport.dataSet;
        colSel.addClass('filter-column-select noChange')
        tr.append($('<td width="22%"/>').append(colSel));
        var conditionSel = $('<select/>').attr('onchange', 'filterConditionChange(this);').attr('placeholder', 'Choose Condition');
        conditionSel.addClass('filter-condition-select noChange')
        tr.append($('<td width="22%"/>').append(conditionSel));
        $('.row-filter .filter-condition > table ').append(tr)
        var currentTr = $('.filter-condition > table  tr.current');
        colSel =  currentTr.find('td:eq(0) select')
        var filterSelectize = applySelectize(colSel, [], [], 1, false);
        for (var j = 0; j < cols.length; j++) {
            var column = cols[j]
            var col = adhoc.newReport[column.source][dataSet][column.index]
            var op = {
                id: col.name,
                value: col.name
            }
            filterSelectize.addOption(op);
        }
        filterSelectize.setValue(filter.column)
        conditionSel = currentTr.find('td:eq(1) select')
        var conditionSelectize = applySelectize(conditionSel, [], [], 1, false);
        $.each(propConditions, function(key, val) {
            op = {
                id: key,
                value: val.name
            };
            conditionSelectize.addOption(op);
        });
        conditionSelectize.setValue(filter.operator)
        addReportFilterValues(filter,currentTr);
        $('.filter-condition > table  tr.current').removeClass('current');
        currentTr.find('td:eq(0) select').removeClass('noChange')
        currentTr.find('td:eq(1) select').removeClass('noChange')
    }
}
/**
 * @Function Name   : addReportFilterValues
 * @Description     : Add filters to the filter array
 * @param           : filter,tr
 * @returns         :
 * */
function addReportFilterValues(filter,tr){
    var op = filter.operator;
    var val = []
    if (op && op != null) {
        var options = propConditions[op];
        if (options.fieldType == 'multiple') {
            var sel = $('<select/>').attr('id', 'cond_' + op + '_field').attr('placeholder', 'Add values')
            var td = $('<td  width="22%"/>');
            sel.addClass('filter-condition-value')
            td.append(sel);
            tr.append(td);
            var selss = tr.find('td:eq(2) select').selectize({
                maxItems: 100,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                options: [],
                create: true
            })
            selss = selss[0].selectize
            for (var j =0;j<filter.conValue.length ;j++){
                selss.addOption({id:filter.conValue[j],title:filter.conValue[j]})
            }
            selss.setValue(filter.conValue)
            tr.append($('<td width="22%"/>'))
        } else if (options.fieldType == 'two') {
            var td = $('<td width="22%"/>').css('vertical-align', 'top')
            var input = $('<input/>').addClass('form-control filter-condition-value').attr('id', 'cond_' + op + '_field1');
            input.attr('placeholder', 'Value')
            input.val(filter.conValue.replace(/'/gi,''));
            td.append(input);
            tr.append(td);
            td = $('<td width="22%"/>').css('vertical-align', 'top')
            input = $('<input/>').addClass('form-control filter-condition-value').attr('id', 'cond_' + op + '_field2').css('width', '80%');
            input.attr('placeholder', 'Value');
            input.val(filter.conValue2.replace(/'/gi,''));
            input = $('<span/>').append(input);
            td.append("<span class='pull-left' style='margin-top:7px;'> &nbsp;AND &nbsp;&nbsp;</span>").append(input);
            tr.append(td);
        } else {
            var td = $('<td width="22%"/>').css('vertical-align', 'top')
            var input = $('<input/>').addClass('form-control filter-condition-value').attr('id', 'cond_' + op + '_field');
            input.attr('placeholder', 'Value');
            input.val(filter.conValue.replace(/'/gi,''));
            td.append(input);
            tr.append(td);
            tr.append($('<td width="22%"/>'))
        }
        tr.append($('<td width="12%"/>').append(getReportFilterActions()))
    }
    $('.ace-popover').popover();
}
/**
 * @Function Name   : chartOrderByChange
 * @Description     : This will be called on changing order 
 * @param           : obj
 * @returns         : 
 * */
function chartOrderByChange(obj) {
    var colId = $(obj).val()
    if ($(obj).hasClass('noChange') == true)
        return false
    if(colId && colId.length > 0 ){
        var source = colId.split('_')[0];
        var id = colId.split('_')[1]
        var dataSet = adhoc.newReport.dataSet
        var col = adhoc.newReport[source][dataSet][id]
        var type = adhoc.newReport.orders.direction
        orders = {
            id: id,
            source:source,
            key: 'row["' + col.name + '"]'
        }
        if (type == 'asc') {
            orders.direction = 'ascending'
        } else {
            orders.direction = 'descending'
        }
        adhoc.newReport.orders = orders
        if (adhoc.newReport.type == 'table') {
            getDesignTablePreview();
        } else {
            getDesignChartPreview();
        }
    } else {
        if (adhoc.newReport.type == 'table') {
            getDesignTablePreview();
        } else {
            getDesignChartPreview();
        }
    }
}
/**
 * @Function Name   : chartOrderType
 * @Description     : This will be called on change of order type
 * @param           : obj
 * @returns         :
 * */
function chartOrderType(obj) {
    adhoc.newReport.orders.direction = $(obj).val();
    if (adhoc.newReport.type == 'table') {
        getDesignTablePreview();
    } else {
        getDesignChartPreview();
    }
}
/**
 * @Function Name   : chartGroupByChange
 * @Description     : This will be called on change of groupings
 * @param           : obj
 * @returns         :
 * */
function chartGroupByChange(obj) {
    if ($(obj).hasClass('noChange') == true)
        return false
    var colId = $(obj).val()
    if(colId && colId.length > 0 ){
        var source = colId.split('_')[0];
        var id = colId.split('_')[1];
        var dataSet = adhoc.newReport.dataSet
        var col = adhoc.newReport[source][dataSet][id]
        groups = []
        var gr = {
            aggregate_name: 'Orders',
            aggregate_on: "row['" + col.name + "']",
            column_bindings: [col.name]
        }
        groups.push(gr);
        adhoc.newReport.groups = groups
        if (adhoc.newReport.type == 'table') {
            getDesignTablePreview();
        }
    } else {
        adhoc.newReport.groups = []
        if (adhoc.newReport.type == 'table') {
            getDesignTablePreview();
        }
    }
    
}
/**
 * @Function Name   : addFilterCondition
 * @Description     : This will create a new row to add filter 
 * @param           :
 * @returns         :
 * */
/* <----- STEP3 FILTER -----> */
function addFilterCondition() {
    var tr = $('<tr/>').addClass('current');
    var colSel = $('<select/>').attr('onchange', 'filterColumnChange(this);').attr('placeholder', 'Choose Column');
    var cols = adhoc.newReport.visual;
    var dataSet = adhoc.newReport.dataSet;
    var options = []
    colSel.addClass('filter-column-select')
    tr.append($('<td width="22%"/>').append(colSel));
    tr.append($('<td width="12%"/>').append(getFilterActionHtml()));
    tr.append($('<td width="22%"/>'));
    tr.append($('<td width="22%"/>'))
    tr.append($('<td width="22%"/>'));
    $('.row-filter .filter-condition > table ').append(tr)
    colSel = $('.filter-condition > table  tr.current td:eq(0) select')
    var filterSelectize = applySelectize(colSel, [], [], 1, false);
    for (var i = 0; i < cols.length; i++) {
        var column = cols[i]
        var col = adhoc.newReport[column.source][dataSet][column.index]
        var op = {
            id: col.name,
            value: col.name
        }
        filterSelectize.addOption(op);
    }
    $('.filter-condition > table  tr.current').removeClass('current')
    $('.ace-popover').popover();
}
/**
 * @Function Name   : getFilterActionHtml
 * @Description     : Forms html string for filter action buttons (Add , delete)
 * @param           : check (true/false)
 * @returns         :
 * */
function getFilterActionHtml(check){
    var actions = $('<span/>').addClass('actions-icons')
    var add = $('<a/>').addClass('text-success iconCursor ace-popover').css({'margin-right':'10px'})
    add.attr({
        onclick:'addReportFilterLine(this);',
        'data-content' : 'Apply Filter',
        'data-trigger' : 'hover',
        'data-placement' : 'bottom'
    });
    add.append($('<i/>').addClass('fa fa-check'))
    var cancel = $('<a/>').addClass('text-danger iconCursor ace-popover')
    cancel.append($('<i/>').addClass('fa fa-times'))
    cancel.attr({
        onclick:'removeReportFilterUnsaved(this);',
        'data-content' : 'Cancel / Remove Filter',
        'data-trigger' : 'hover',
        'data-placement' : 'bottom'
    });
    if (check == true)
        actions.append(add)
    actions.append(cancel)
    return actions
}
/**
 * @Function Name   : filterColumnChange
 * @Description     : This will be called on change of filter column and shows list of conditions to select.
 * @param           : obj
 * @returns         :
 * */
function filterColumnChange(obj) {
    if ($(obj).hasClass('noChange') == true)
        return false
    var col = $(obj).val();
    var par = $(obj).closest('tr');
    var table = $(obj).closest('table');
    var index = table.find('tr').index(par);
    var conditionSel = $('<select/>').attr('onchange', 'filterConditionChange(this);').attr('placeholder', 'Choose Condition');
    conditionSel.addClass('filter-condition-select')
    par.find('td:gt(0)').remove();
    if (col && col != null) {
        par.append($('<td width="22%"/>').append(conditionSel));
        par.append($('<td width="12%"/>').html(getFilterActionHtml()));
        par.append($('<td width="22%"/>'));
        par.append($('<td width="22%"/>'));
        conditionSel = $(par).find('td:eq(1) select');
        var conditionSelectize = applySelectize(conditionSel, [], [], 1, false);
        $.each(propConditions, function(key, val) {
            op = {
                id: key,
                value: val.name
            };
            conditionSelectize.addOption(op);
        });
    } else {
        par.append($('<td width="12%"/>').html(getFilterActionHtml()));
        par.append($('<td width="23%"/>'));
        par.append($('<td width="23%"/>'));
        par.append($('<td width="23%"/>'));
    }
    $('.ace-popover').popover();
}
function removeReportFilterUnsaved(obj){
    //added by satish.
    var tr = $(obj).closest('tr');
    var index = $(obj).closest('table').find('tr').index(tr);
    if(adhoc.newReport.filter[index]!=undefined && adhoc.newReport.filter[index]!=null)
        removeReportFilter(obj);
    $(obj).closest('tr').remove();
}
/**
 * @Function Name   : removeReportFilter
 * @Description     : Removes filter from the filter list
 * @param           :
 * @returns         :
 * */
function removeReportFilter(obj) {
    var tr = $(obj).closest('tr');
    var index = $(obj).closest('table').find('tr').index(tr);
    tr.remove();
    filters = adhoc.newReport.filter
    filters.splice(index, 1);
    adhoc.newReport.filter = filters;
    if (adhoc.newReport.type == 'table') {
        getDesignTablePreview();
    } else {
        getDesignChartPreview();
    }
}
/**
 * @Function Name   : filterConditionChange
 * @Description     : This will be triggered on change of condition select 
 * @param           :
 * @returns         :
 * */
function filterConditionChange(obj) {
    if ($(obj).hasClass('noChange') == true)
        return false
    var id = $(obj).val();
    var par = $(obj).closest('tr');
    var table = $(obj).closest('table');
    var index = table.find('tr').index(par);
    var options = propConditions[id];
    var ob = adhoc.newReport.filter[index]
    par.find('td:gt(1)').remove();
    updateFilterConditionSelect(options, ob, par, id, index);
}
/**
 * @Function Name   : updateFilterConditionSelect
 * @Description     : Based on condition this will list the input fields
 * @param           : options, formatProp, par, id, index, check
 * @returns         :
 * */
function updateFilterConditionSelect(options, formatProp, par, id, index, check) {
    if (options) {
        if (options.fieldType == 'multiple') {
            var sel = $('<select/>').attr('id', 'cond_' + id + '_field').attr('placeholder', 'Add values')
            var td = $('<td  width="22%"/>');
            sel.addClass('filter-condition-value')
            td.append(sel);
            par.append(td);
            var selss = par.find('td:eq(2) select').selectize({
                maxItems: 100,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                options: [],
                create: true
            })
            selss = selss[0].selectize
            if (check && check == true) {
                var vals = adhoc.newReport.filter[index]
                if (vals && vals.conValue != undefined){
                    for (var i = 0; i < vals.conValue.length; i++) {
                        var ob = {
                            id: vals.conValue[i],
                            title: vals.conValue[i]
                        }
                        selss.addOption(ob);
                    }
                    selss.setValue(vals.conValue);
                }
            }
            par.append($('<td width="22%"/>'))
        } else if (options.fieldType == 'two') {
            var td = $('<td width="22%"/>').css('vertical-align', 'top')
            var input = $('<input/>').addClass('form-control filter-condition-value').attr('id', 'cond_' + id + '_field1');
            input.attr('placeholder', 'Value')
            if (check && check == true) {
                if (adhoc.newReport.filter[index])
                    input.val(adhoc.newReport.filter[index].conValue);
            }
            td.append(input);
            par.append(td);
            td = $('<td width="22%"/>').css('vertical-align', 'top')
            input = $('<input/>').addClass('form-control filter-condition-value').attr('id', 'cond_' + id + '_field2').css('width', '80%');
            input.attr('placeholder', 'Value');
            if (check && check == true) {
                if (adhoc.newReport.filter[index])
                    input.val(adhoc.newReport.filter[index].conValue2);
            }
            input = $('<span/>').append(input);
            td.append("<span class='pull-left' style='margin-top:7px;'> &nbsp;AND &nbsp;&nbsp;</span>").append(input);
            par.append(td);
        } else {
            var td = $('<td width="22%"/>').css('vertical-align', 'top')
            var input = $('<input/>').addClass('form-control filter-condition-value').attr('id', 'cond_' + id + '_field');
            input.attr('placeholder', 'Value');
            if (check && check == true) {
                if (adhoc.newReport.filter[index])
                    input.val(adhoc.newReport.filter[index].conValue)
            }
            td.append(input);
            par.append(td);
            par.append($('<td width="22%"/>'))
        }
        var remove = $('<span/>').addClass('close').html('&times').attr('onclick', 'removeReportFilter(this);');
        par.append($('<td width="12%"/>').html(getFilterActionHtml(true)))
    } else {
        par.append($('<td width="12%"/>').html(getFilterActionHtml())).append($('<td width="22%"/>')).append($('<td width="22%"/>'))
    }
    $('.ace-popover').popover();
    
}
/**
 * @Function Name   : addReportFilterLine
 * @Description     : save the filter and shows the preview
 * @param           : obj,index
 * @returns         :
 * */
function addReportFilterLine(obj,index){
    var tr = $(obj).closest('tr');
    //added by satish.
    if(index==undefined)
        index = $(obj).closest('table').find('tr').index(tr);
    var column = tr.find('.filter-column-select').val();
    var condition = tr.find('.filter-condition-select').val();
    var valFields = tr.find('.filter-condition-value')
    var val;
    if (!column && column == ''){
        return false;
    }
    if (!condition && condition == ''){
        return false;
    }
    var ob = {
        column: column,
        operator: condition
    }
	//added by satish changed filter values to strings
    if (valFields.length == 1){
        ob.conValue = "'"+valFields.val()+"'";
    } else {
        var arr = []
        valFields.each(function(){
            arr.push($(this).val())
        })
        ob.conValue = "'"+arr[0]+"'";
        ob.conValue2 = "'"+arr[1]+"'";
    }
    if (index!=undefined && index != null){
        adhoc.newReport.filter[index] = ob;
    } else {
        adhoc.newReport.filter.push(ob);
    }
    formFilterLine(obj);
    if (adhoc.newReport.type == 'chart')
        getDesignChartPreview();
    else
        getDesignTablePreview();
	//added by satish.    
	tr.find('.filter-column-select').next().attr('readonly','true');
}

function formFilterLine(obj){
    var tr = $(obj).closest('tr')
    $(obj).closest('td').remove();
    tr.append($('<td/>').append(getReportFilterActions()))
    $('.ace-popover').popover();
}
/**
 * @Function Name   : getReportFilterActions
 * @Description     : forms html for filter actions (add , remove)
 * @param           :
 * @returns         : actions
 * */
function getReportFilterActions(){
    var actions = $('<span/>').addClass('actions-icons')
    var add = $('<a/>').addClass('text-success iconCursor ace-popover').css({'margin-right':'10px'})
    add.attr({
        onclick:'updateReportFilterLine(this);',
        'data-content' : 'Apply Filter',
        'data-trigger' : 'hover',
        'data-placement' : 'bottom'
    });
    add.append($('<i/>').addClass('fa fa-check'))
    var cancel = $('<a/>').addClass('text-danger iconCursor ace-popover')
    cancel.append($('<i/>').addClass('fa fa-trash-o'))
    cancel.attr({
        onclick:'removeReportFilter(this);',
        'data-content' : 'Remove Filter',
        'data-trigger' : 'hover',
        'data-placement' : 'bottom'
    });
    actions.append(add)
    actions.append(cancel)
    return actions
}
/**
 * @Function Name   : updateReportFilterLine
 * @Description     : This will be called on clicking of update filter.
 * @param           : obj
 * @returns         :
 * */
function updateReportFilterLine(obj){
    var tr = $(obj).closest('tr')
    var table = $(obj).closest('table');
    var index = table.find('tr').index(tr);
    addReportFilterLine(obj,index)
}
/* STEP3 FILTER ends */


/* <----- STEP3 TABLE -----> */
/**
 * @Function Name   : initializeDesignTableStep
 * @Description     : For table initilizes values
 * @param           :
 * @returns         :
 * */
function initializeDesignTableStep() {
    var cols = adhoc.newReport.visual
    var dataSet = adhoc.newReport.dataSet
    $('#design-chart-order-by, #design-chart-group-by, #design-chart-order-type').addClass('noChange')
    chartOrderBy.clearOptions();
    chartGroupBy.clearOptions();
    for (var i = 0; i < cols.length; i++) {
        var col = cols[i];
        var column = adhoc.newReport[col.source][dataSet][col.index]
        var ob = {
            id: col.source+'_'+col.index,
            value: column.name,
            source: col.source
        }
        chartOrderBy.addOption(ob);
        chartGroupBy.addOption(ob);
    }
    if (adhoc.newReport.reportId != undefined ){
        if(adhoc.newReport.groups.length > 0){
            var info = getReportColumnInfo(adhoc.newReport.groups[0].column_bindings[0])
            chartGroupBy.setValue(info.source+'_'+info.index)
        }
        var orders= adhoc.newReport.orders
        if (orders.key){
            var name = orders.key.replace('row["','').replace('"]','')
            chartOrderTypeSel.setValue(orders.direction)
            chartOrderBy.setValue(orders.source+'_'+orders.id)
        }

    }
    $('#design-chart-order-by, #design-chart-group-by, #design-chart-order-type').removeClass('noChange')
}
/**
 * @Function Name   : getDesignTablePreview
 * @Description     : Forms design table preview
 * @param           :
 * @returns         :
 * */
function getDesignTablePreview() {
    addLoading($('#design-table-preview'))
    var d = getRequestData(adhoc.newReport.visual);
    sendAjaxCall(intalio_bpms.adhoc_reporting.report_preview, "POST", false, true, "json", d, handleAdhocError, function(data) {
        if (data.report_results != undefined && data.report_results.length > 0) {
            formTablePreview(data);
        } else {
            showErrorNotification(data.error_message)
        }
        removeLoading($('#design-table-preview'))

    },adhoc.preview_timeout+adhoc.grace_timeout);
}
/**
 * @Function Name   : formTablePreview
 * @Description     : Add rows to the design table in step3
 * @param           : data
 * @returns         :
 * */
function formTablePreview(data) {
    data = data.report_results[0]
    cols = adhoc.newReport.visual;
    $('#design-table-preview table').remove();
    var table = $('<table/>').addClass('table table-striped draggable table-bordered table-hover preview-table').css('margin-top', '5px');
    var cols = adhoc.newReport.visual;
    var ds = adhoc.newReport.dataSet
    var tr = $('<tr/>'),
        //columnOptions = '<ul class="dropdown-menu"><li><a href="#" onclick="deleteReportColumn(this);">Delete</a></li><li><a href="#" onclick=orderByColumn(this,"asc")>Order by Ascending</a></li><li><a href="#" onclick=orderByColumn(this,"dsc")>Order by Descending</a></li><li><a href="#" onclick="groupByColumn(this)">Group by this column</a></li></ul>';
        columnOptions = '';
    var button = $('<a/>').addClass('btn dropdown-toggle btn-xs btn-white').append($('<span/>').addClass('ace-icon fa fa-caret-down icon-only'))
    button.attr('data-toggle', "dropdown")
    for (var i = 0; i < cols.length; i++) {
        var column = cols[i]
        var col = adhoc.newReport[column.source][ds][column.index],
            td = $('<th/>')
        td.text(col.name);
        var sp = $('<span/>').addClass('pull-right')
        var d = $('<div/>').addClass('btn-group').append(button.clone()).append($(columnOptions).clone())
            /* sp.append(d) */ //for adding Options 
        td.data('info', column)
        tr.append(td.append(sp));
    }
    table.append(tr);
    $('#design-table-preview').append(table);
    $('#design-table-preview > table tr:gt(0)').remove();
    var rowLength = data.rows.length > adhoc.max_preview_rows ? adhoc.max_preview_rows : data.rows.length
    for (var i = 0; i < rowLength; i++) {
        var row = data.rows[i].data,
            tr = $('<tr/>');
        for (j = 0; j < cols.length; j++) {
            var td = $('<td/>')
            if (getColumnDataType(cols[j]) == 'date-time')
                td.text(convertDateTimeFormat(row[j]))
            else
                td.text(row[j])
            tr.append(td)
        }
        $('#design-table-preview > table').append(tr);
    };
}
/**
 * @Function Name   : saveDragColumnDesignTable
 * @Description     : This will be called on rearranging of columns (From dragtable.js)
 * @param           : obj
 * @returns         :
 * */
function saveDragColumnDesignTable(obj) {
    var cols = []
    var id;
    $('#design-table-preview table th').each(function() {
        column = $(this).data('info');
        cols.push(column);
    });
    adhoc.newReport.visual = cols
}
/**
 * @Function Name   : orderByColumn
 * @Description     : This will be called on change of ordering of columns
 * @param           : obj, type
 * @returns         :
 * */
function orderByColumn(obj, type) {
    var colId = $(obj).closest('th').data('info');
    var dataSet = adhoc.newReport.dataSet
    var col = adhoc.newReport.dataSetObject[dataSet][colId]
    orders = {
        id: colId,
        key: col.expression
    }
    if (type == 'asc') {
        orders.direction = 'ascending'
    } else {
        orders.direction = 'descending'
    }
    adhoc.newReport.orders = orders
    getDesignTablePreview();
}
/**
 * @Function Name   : groupByColumn
 * @Description     : This will be called on changing of grouping
 * @param           : obj
 * @returns         :
 * */
function groupByColumn(obj) {
    var colId = $(obj).closest('th').data('info');
    var dataSet = adhoc.newReport.dataSet
    var col = adhoc.newReport.dataSetObject[dataSet][colId]
    groups = []
    var gr = {
        aggregate_name: 'Orders',
        aggregate_on: col.expression,
        column_bindings: [col.name]
    }
    groups.push(gr);
    adhoc.newReport.groups = groups
    getDesignTablePreview();
}
/* STEP3 TABLE ends */
/* <----- STEP3 CHART -----> */
/**
 * @Function Name   : showDesignChartStep
 * @Description     : Step3 chart initilization
 * @param           :
 * @returns         :
 * */
function showDesignChartStep() {
    initializeDesignChart();
    checkStep3();
}
/**
 * @Function Name   : initializeDesignChart
 * @Description     : Initilizes step3 chart fileds with available values
 * @param           :
 * @returns         :
 * */
function initializeDesignChart() {
    var cols = adhoc.newReport.visual
    var dataSet = adhoc.newReport.dataSet
    //clearSelectOptions();
    for (var i = 0; i < cols.length; i++) {
        var column = cols[i];
        var col = adhoc.newReport[column.source][dataSet][column.index]
        var ob = {
            id: column.source+'_'+column.index,
            value: col.name,
            source: column.source
        }
        xAxisSelect.addOption(ob);
        chartOrderBy.addOption(ob);
        if (validateYaxisDataType(col.data_type)){
            yAxisSelect.addOption(ob);
        }
    }
    if (adhoc.newReport.reportId != undefined){
        chartTypeSelect.setValue(adhoc.newReport.chart.chartValue);
        xAxisSelect.setValue(adhoc.newReport.chart.xAxisSource+'_'+adhoc.newReport.chart.xAxis)
        yAxisSelect.setValue(adhoc.newReport.chart.yAxisSource+'_'+adhoc.newReport.chart.yAxis)
        var orders= adhoc.newReport.orders
        if (orders.key){
            var name = orders.key.replace('row["','').replace('"]','')
            chartOrderTypeSel.setValue(orders.direction)
            chartOrderBy.setValue(orders.source+'_'+orders.id)
        }
    }
}
/**
 * @Function Name   : validateYaxisDataType
 * @Description     : Filter columns for Y axis Supports (num)
 * @param           : type
 * @returns         :
 * */
function validateYaxisDataType(type){
    var invalid = ['string','date-time']
    if (invalid.indexOf(type) > -1)
        return false
    else
        return true
}
/**
 * @Function Name   : designChartTypeChage
 * @Description     : This will be triggred on changing of chart type
 * @param           : obj
 * @returns         :
 * */
function designChartTypeChage(obj) {
    if($(obj).val()){
        var selectedChart = getDesignChartSwf($(obj).val());
        adhoc.newReport.chart.type = selectedChart.birt_name
        adhoc.newReport.chart.chartSwf = selectedChart.swf
        adhoc.newReport.chart.dimension = selectedChart.dimension
        drawDesignReportChart('design-chart-preview', 'Design');
        checkStep3();
    }
}
/**
 * @Function Name   : yAxisChange
 * @Description     : This will be triggred on change of Y axis
 * @param           : obj
 * @returns         :
 * */
function yAxisChange(obj) {
    var val = $(obj).val()
    if(val){
        adhoc.newReport.chart.yAxis = val.split('_')[1];
        var dataSet = adhoc.newReport.dataSet
        var source = $(obj).next().find('.items .item').attr('data-source');
        if(source)
            adhoc.newReport.chart.yAxisSource = source;
        try {
            adhoc.newReport.chart.yAxisName = adhoc.newReport.chart.yAxisName || adhoc.newReport[source][dataSet][adhoc.newReport.chart.yAxis].display_name
        } catch (err) {
            adhoc.newReport.chart.yAxisName = ''
        }
        getDesignChartPreview();
        checkStep3();
    }
}
/**
 * @Function Name   : xAxisChange
 * @Description     : This will be triggred on change of X axis
 * @param           : obj
 * @returns         :
 * */
function xAxisChange(obj) {
    var val = $(obj).val()
    if(val){
        adhoc.newReport.chart.xAxis = val.split('_')[1];
        var dataSet = adhoc.newReport.dataSet
        var source = $(obj).next().find('.items .item').attr('data-source');
        if(source)
            adhoc.newReport.chart.xAxisSource = source;
        try {
            adhoc.newReport.chart.xAxisName = adhoc.newReport.chart.xAxisName || adhoc.newReport[source][dataSet][adhoc.newReport.chart.xAxis].display_name
        } catch (err) {
            adhoc.newReport.chart.xAxisName = ''
        }
        getDesignChartPreview();
        checkStep3();
    }
}
/**
 * @Function Name   : getDesignChartPreview
 * @Description     : Get the data for chart based on selection
 * @param           :
 * @returns         :
 * */
function getDesignChartPreview() {
    var x = adhoc.newReport.chart.xAxis,
        y = adhoc.newReport.chart.yAxis,
        t = adhoc.newReport.chart.type
    if (x != undefined && y != undefined && t != undefined) {
        var d = getChartDataFromAdhoc();
        addLoading($('#design-chart > .col-sm-12'))
        sendAjaxCall(intalio_bpms.adhoc_reporting.report_preview, "POST", false, true, "json", d, handleAdhocError, function(data) {
            if (data.report_results != undefined && data.report_results.length > 0) {
                adhoc.newReport.chart.data = data.report_results[0]
                drawDesignReportChart('design-chart-preview', 'Design');
            } else
                showErrorNotification(data.error_message);
            removeLoading($('#design-chart > .col-sm-12'))

        },adhoc.preview_timeout+adhoc.grace_timeout);
    }
}
/**
 * @Function Name   : drawDesignReportChart
 * @Description     : Forms data for rendering chart in fusion chart format
 * @param           : id, name
 * @returns         :
 * */
function drawDesignReportChart(id, name) {
    if(adhoc.newReport.currentStep!=1){
        var chart = adhoc.newReport.chart,
            labelId = chart.xAxis,
            valueId = chart.yAxis,
            type = chart.type,
            dataSet = adhoc.newReport.dataSet,
            chartData = adhoc.newReport.chart.data
        if (FusionCharts("preview_chart" + name) != undefined && FusionCharts("preview_chart" + name) != null)
            FusionCharts("preview_chart" + name).dispose();
        if (labelId == undefined || labelId == null)
            return false
        if (valueId == undefined || valueId == null)
            return false
        if (chartData == undefined) {
            var d = getChartDataFromAdhoc();
            sendAjaxCall(intalio_bpms.adhoc_reporting.report_preview, "POST", false, true, "json", d, handleAdhocError, function(data) {
                if (data.report_results != undefined && data.report_results.length > 0) {
                    adhoc.newReport.chart.data = data.report_results[0]
                    drawDesignReportChart(id, name);
                } else
                    showErrorNotification(data.error_message);
            },adhoc.preview_timeout+adhoc.grace_timeout);
        } else {
            var data = {
                chart: {
                    canvasBorderThickness: 0,
                    showBorder: 0,
                    bgColor: '#FFFFFF',
                    canvasBgRatio: '100,0',
                    showCanvasBg: 0,
                    legendPosition: adhoc.newReport.chart.legend.position,
                    legendBorderColor:"#FFFFFF",
                    legendBgAlpha:0,
                    legendBorderAlpha:0,
                    caption: adhoc.newReport.chart.caption || ''
                },
                data: []
            }
            if(adhoc.newReport.chart.legend.visible)
                data.chart.showLegend = "1";
            else
                data.chart.showLegend = "0";
            data.chart.yaxisname = adhoc.newReport.chart.yAxisName
            data.chart.xaxisname = adhoc.newReport.chart.xAxisName
            var rowData = chartData.rows
            var xAxisColumn = adhoc.newReport[chart.xAxisSource][dataSet][chart.xAxis]
            var yAxisColumn = adhoc.newReport[chart.yAxisSource][dataSet][chart.yAxis]
            for (var i = 0; i < rowData.length; i++) {
                row = rowData[i].data
                var item = {}
                if(adhoc.newReport.chart.legend.showValue == true){
                    if (xAxisColumn && xAxisColumn.data_type =='date-time'){
                        item.label = convertDateTimeFormat(row[0])+","+row[1];
                        item.displayValue = convertDateTimeFormat(row[0])+","+row[1];
                    }
                    else{
                        item.label = row[0]+","+row[1];
                        item.displayValue = row[0]+","+row[1];
                    }
                }
                else{
                    if (xAxisColumn && xAxisColumn.data_type =='date-time')
                        item.label = convertDateTimeFormat(row[0]);
                    else
                        item.label = row[0];
                }
                if (yAxisColumn && yAxisColumn.data_type =='date-time')
                    item.value = convertDateTimeFormat(row[1])
                else
                    item.value = row[1]
                data.data.push(item);
            }
            formReportChart(data, adhoc.newReport.chart.chartSwf, id, name);
        }
    }
}
/**
 * @Function Name   : formReportChart
 * @Description     : renders chart from data
 * @param           : data, type, id, name
 * @returns         :
 * */
function formReportChart(data, type, id, name) {
    FusionCharts.setCurrentRenderer('javascript');
    var reportChart = new FusionCharts("widgets/swf/" + type, "preview_chart" + name);
    reportChart.setJSONData(data);
    reportChart.setTransparent(true);
    reportChart.render(id);
}
/**
 * @Function Name   : getDesignChartSwf
 * @Description     : get the chart swf for rendering chart
 * @param           : val
 * @returns         :
 * */
function getDesignChartSwf(val) {
    var r = {
        type: 'BAR',
        swf: 'Column3D.swf',
        dimension : 1
    }
    for (var i = 0; i < availableChartTypes.length; i++) {
        var ob = availableChartTypes[i];
        if (ob.value == val) {
            r = ob
        }
    }
    return r
}
/* STEP3 CHART ends */
/* STEP3 ends */

/* <-----           STEP4              -----> */
/**
 * @Function Name   : defineReportProperties
 * @Description     : Shows properties screen based on table or chart
 * @param           :
 * @returns         :
 * */
function defineReportProperties() {
    if (adhoc.newReport.type == 'table') {
        $('#chart_properties').addClass('hide');
        $('#table_properties').removeClass('hide');
        $('#table_properties .column-selector > table').remove();
        getAdhocTableData();
    } else if (adhoc.newReport.type == 'chart') {
        $('#table_properties').addClass('hide');
        $('#chart_properties').removeClass('hide');
        $('#design-chart-chart-name').val(adhoc.newReport.chart.caption);
        drawChartPropPreview();
    }
}

/* <-----           STEP4 TABLE             -----> */
/**
 * @Function Name   : getAdhocTableData
 * @Description     : Get data for table for step4
 * @param           : check
 * @returns         :
 * */
function getAdhocTableData(check) {
    $('#table_properties .column-selector > table').remove();
    var cols = adhoc.newReport.visual;
    var dataSet = adhoc.newReport.dataSet
    var prop = adhoc.newReport.tableProp
    var table = $('<table/>').addClass('table table-striped draggable table-bordered table-hover preview-table'),
        tr = $('<tr/>')
    for (var i = 0; i < cols.length; i++) {
        var col = cols[i]
        if (prop[col.position]){
            var td = $('<th width="'+prop[col.position].column_width+'%"/>');
            td.text(prop[col.position].display_name);
        }
        else{
            var td = $('<th width="'+report_default_column_width+'%"/>');
            td.text(adhoc.newReport[col.source][dataSet][col.index].display_name);
        }
        td.attr({
            onclick: 'selectCurrentColumn(this);'
        })
        td.data('info', col);
        tr.append(td);
    }
    table.append(tr);
    $('#table_properties .column-selector').append(table);
    if (check != true){
        selectCurrentColumn($('#table_properties .column-selector table tr th:eq(0)'));
    } else{
        selectCurrentColumn($('#table_properties .column-selector table tr th:eq('+adhoc.newReport.tableProp.currentColumn+')'));
    }
    dragtable.makeDraggable($('#table_properties .column-selector table')[0], saveDragColumnPropTable);
    //Commented by satish.
    //if (!adhoc.newReport.format_table_data){
        addLoading($('#table_properties .column-selector'));
        var d = getRequestData(adhoc.newReport.visual);
        sendAjaxCall(intalio_bpms.adhoc_reporting.report_preview, "POST", false, true, "json", d, handleAdhocError, function(data) {
            if (data.report_results != undefined && data.report_results.length > 0) {
                formPropTablePreview(data);
                adhoc.newReport.format_table_data = data
            } else {
                showErrorNotification(data.error_message);
            }
            removeLoading($('#table_properties .column-selector'));
        },adhoc.preview_timeout+adhoc.grace_timeout);
    //commented by satish.
    /*} else {
        formPropTablePreview(adhoc.newReport.format_table_data);
    }*/
}
/**
 * @Function Name   : formPropTablePreview
 * @Description     : Add rows to the step4 preview table
 * @param           : data
 * @returns         :
 * */
function formPropTablePreview(data) {
    data = data.report_results[0]
    cols = adhoc.newReport.visual;
    var dataSet = adhoc.newReport.dataSet
    $('#table_properties .column-selector table tr:gt(0)').remove();
    var rowLength = data.rows.length > adhoc.max_preview_rows ? adhoc.max_preview_rows : data.rows.length
    for (var i = 0; i < rowLength; i++) {
        var row = data.rows[i].data,
            tr = $('<tr/>');
        for (j = 0; j < cols.length; j++) {
            var td = $('<td/>')
            if (getColumnDataType(cols[j]) == 'date-time')
                td.text(convertDateTimeFormat(row[j]))
            else
                td.text(row[j])
            tr.append(td)
        }
        $('#table_properties .column-selector table').append(tr);
    }
    for (j = 0; j < cols.length; j++) {
        applyFormatter(cols[j].position);
    }
}
/**
 * @Function Name   : applyFormatter
 * @Description     : For applying formatter dynamically (This is commented because we dont need this now)
 * @param           : pos
 * @returns         :
 * */
function applyFormatter(pos){
    /* #this if for applying preview in format change 
    pos = pos || adhoc.newReport.tableProp.currentColumn
    var formatCss = {}
    if (adhoc.newReport.tableProp[col].format){
        var prop = adhoc.newReport.tableProp[col].format.prop
        if (prop){
            formatCss = {
                'background-color': prop.background,
                color: prop.color,
            }
            if (prop.strike == true) {
                formatCss['text-decoration'] = 'line-through'
            } else {
                formatCss['text-decoration'] = 'none'
            }
            if (prop.bold == true) {
                formatCss['font-weight'] = 'bold'
            } else {
                formatCss['font-weight'] = 'normal'
            }
            if (prop.italics == true) {
                formatCss['font-style'] = 'italic'
            } else {
                formatCss['font-style'] = 'normal'
            }
        } else {
            formatCss = {
                'background-color': 'white',
                color: '#393939',
                'text-decoration' : 'none',
                'font-weight':'normal',
                'font-style':'normal'
            }
        }
        $('#table_properties .column-selector table tr').each(function(){
            var td = $(this).find('td:eq('+pos+')')
            var val = td.text()
            if(validateFormatCondition(pos,val)){
                td.css(formatCss);
            } else {
                td.css({
                    'background-color': 'white',
                    color: '#393939',
                    'text-decoration' : 'none',
                    'font-weight':'normal',
                    'font-style':'normal'
                })
            }
        })
    } 
    */
}
/**
 * @Function Name   : validateFormatCondition
 * @Description     : Validates format condition and returns result
 * @param           :
 * @returns         : true/false
 * */
function validateFormatCondition(pos,val){
    var format = adhoc.newReport.tableProp[pos].format
    if (format && format.operator != ''){
        switch(format.operator){
            case 'eq':
                if (val == format.conValue)
                    return true;
                else
                    return false;
                break;
            case 'lt':
                if (val <= format.conValue)
                    return true;
                else
                    return false;
                break;
            case 'gt':
                if (val >= format.conValue)
                    return true;
                else
                    return false;
                break;
            case 'between':
                if (val >= format.conValue && val <= format.conValue2)
                    return true;
                else
                    return false;
                break;
            case 'in':
                if (format.conValue && format.conValue.indexOf(val) !=-1 )
                    return true;
                else
                    return false;
                break;
            default:
                return false;
        }
    }
}
/**
 * @Function Name   : saveDragColumnPropTable
 * @Description     : This will be triggered on rearrange of columns step4
 * @param           :
 * @returns         :
 * */
function saveDragColumnPropTable(obj) {
    var cols = []
    var id;
    $(obj.table).find('tr th').each(function() {
        id = $(this).data('info');
        cols.push(id);
    });
    adhoc.newReport.visual = cols
}
/**
 * @Function Name   : updateSelectedColumnName
 * @Description     : Updates table column name (On blur of name filed this will be trigggered)
 * @param           : obj
 * @returns         :
 * */
function updateSelectedColumnName(obj) {
    var col = adhoc.newReport.tableProp.currentColumn
    var prop = adhoc.newReport.tableProp[col]
    prop.display_name = $(obj).val();
    adhoc.newReport.tableProp[col] = prop
    getAdhocTableData(true);
}
/**
 * @Function Name   : updateSelectedColumnWidth
 * @Description     : Updates table column width (Triggered on blur of column width)
 * @param           :
 * @returns         :
 * */
function updateSelectedColumnWidth(obj) {
    var col = adhoc.newReport.tableProp.currentColumn
    var prop = adhoc.newReport.tableProp[col]
    prop.column_width = $(obj).val();
    adhoc.newReport.tableProp[col] = prop
    getAdhocTableData(true);
}
/**
 * @Function Name   : formatConditionChange
 * @Description     : This will be triggered on chage of condition and shows corresponding fields
 * @param           : obj, check
 * @returns         :
 * */
function formatConditionChange(obj, check) {
    var id = $(obj).val();
    var options = propConditions[id];
    var par = $(obj).closest('tr');
    par.find('td:gt(0)').remove();
    var formatProp = adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn].format
    if (formatProp)
        formatProp.operator = id
    else{
        formatProp = JSON.parse(JSON.stringify(columnFormatOptions));
        formatProp.operator = id
    }
    updateConditionSelect(options, formatProp, par, id, check, 'format');
}
/**
 * @Function Name   : adjustWidth
 * @Description     : This will be triggered on chage of condition and shows corresponding fields
 * @param           : obj, check
 * @returns         :
 * */
function modifyConditionChange(obj, check) {
    var id = $(obj).val();
    var options = propConditions[id];
    var par = $(obj).closest('tr');
    par.find('td:gt(0)').remove();
    var formatProp = adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn].modify
    if (formatProp)
        formatProp.operator = id
    else
        formatProp = {operator:id}
    updateConditionSelect(options, formatProp, par, id, check, 'modify');
}
/**
 * @Function Name   : updateConditionSelect
 * @Description     : Shows the input fields based on the condition select
 * @param           : options, formatProp, par, id, check, type
 * @returns         :
 * */
function updateConditionSelect(options, formatProp, par, id, check, type) {
    if (options) {
        if (options.fieldType == 'multiple') {
            var sel = $('<select/>').attr('id', 'cond_' + id + '_field').attr('placeholder', 'Add values')
            var td = $('<td  width="30%"/>');
            td.append(sel);
            par.append(td);
            var selss = par.find('td:eq(1) select').selectize({
                maxItems: 100,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                options: [],
                create: true
            }).on('change', function() {
                var vals = $(this).val();
                if (vals && vals != null)
                    formatProp.conValue = vals;
                else
                    formatProp.conValue = []
                /*
                if (type == 'format'){
                    formatProp.prop = default_format_css
                    adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn][type] = formatProp
                    applyFormatter()
                } */
                adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn][type] = formatProp
            });
            selss = selss[0].selectize
            if (check && check == true) {
                var vals = formatProp.conValue
                for (var i = 0; i < vals.length; i++) {
                    var ob = {
                        id: vals[i],
                        title: vals[i]
                    }
                    selss.addOption(ob);
                }
                selss.setValue(vals);
            }
            par.append($('<td width="30%"/>'))

        } else if (options.fieldType == 'two') {
            var td = $('<td width="30%"/>').css('padding-top', '4px')
            var input = $('<input/>').addClass('form-control').attr('id', 'cond_' + id + '_field1');
            input.attr('placeholder', 'Value').on('blur', function() {
                formatProp.conValue = $(this).val();
                if (type == 'format'){
                    formatProp.prop = default_format_css
                    adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn][type] = formatProp
                    applyFormatter()
                }
                adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn][type] = formatProp
            });
            if (check && check == true) {
                input.val(formatProp.conValue);
            }
            td.append(input);
            par.append(td);
            td = $('<td width="30%"/>').css('padding-top', '4px')
            input = $('<input/>').addClass('form-control').attr('id', 'cond_' + id + '_field2').css('width', '80%');
            input.attr('placeholder', 'Value').on('blur', function() {
                formatProp.conValue2 = $(this).val();
               /*
               if (type == 'format'){
                    formatProp.prop = default_format_css
                    adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn][type] = formatProp
                    applyFormatter()
                }
                */
                adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn][type] = formatProp
            });;
            if (check && check == true) {
                input.val(formatProp.conValue2);
            }
            input = $('<span/>').append(input);
            td.append("<span class='pull-left' style='margin-top:7px;'>&nbsp; AND &nbsp;&nbsp;</span>").append(input);
            par.append(td);
        } else {
            var td = $('<td width="30%"/>').css('padding-top', '4px')
            var input = $('<input/>').addClass('form-control').attr('id', 'cond_' + id + '_field');
            input.attr('placeholder', 'Value').on('blur', function() {
                formatProp.conValue = $(this).val();
                /*
                if (type == 'format'){
                    formatProp.prop = default_format_css
                    adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn][type] = formatProp
                    applyFormatter()
                }
                */
                adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn][type] = formatProp
                
            });;
            if (check && check == true) {
                input.val(formatProp.conValue);
            }
            td.append(input);
            par.append(td);
            par.append($('<td width="30%"/>'))
        }
    } else {
        par.append($('<td width="30%"/>')).append($('<td width="30%"/>'))
    }
    adhoc.newReport.tableProp[adhoc.newReport.tableProp.currentColumn][type] = formatProp
}
/**
 * @Function Name   : formatPropChange
 * @Description     : This will be triggred on change of property and stroes in corresponding variable
 * @param           : obj
 * @returns         :
 * */
function formatPropChange(obj) {
    var name = $(obj).attr('name');
    var col = adhoc.newReport.tableProp.currentColumn
    var val = false
    if ($(obj).is(':checked')) {
        val = true
    }
    var prop = adhoc.newReport.tableProp[col].format.prop
    if (prop)
        prop[name] = val
    else{
        prop={}
        prop[name] = val
    }
    adhoc.newReport.tableProp[col].format.prop = prop
    updateFormatTableCellPreview()
    applyFormatter()
}
/**
 * @Function Name   : formatColorChange
 * @Description     : This will be triggered on select of color
 * @param           : obj
 * @returns         :
 * */
function formatColorChange(obj) {
    var col = adhoc.newReport.tableProp.currentColumn,
        val = $(obj).val();
    //added by satish if condition
    if(adhoc.newReport.tableProp[col].format){
        var prop = adhoc.newReport.tableProp[col].format.prop
        if (prop)
            prop['color'] = val
        else{
            prop={}
            prop.color = val
        }
        adhoc.newReport.tableProp[col].format.prop = prop
        updateFormatTableCellPreview()
        applyFormatter()
    }
}
/**
 * @Function Name   : formatBackgroundChange
 * @Description     : This will be triggered on changing of background color
 * @param           : obj
 * @returns         :
 * */
function formatBackgroundChange(obj) {
    var col = adhoc.newReport.tableProp.currentColumn,
        val = $(obj).val();
    //added by satish if condition
    if(adhoc.newReport.tableProp[col].format){
        var prop = adhoc.newReport.tableProp[col].format.prop
        if (prop)
            prop['background'] = val
        else{
            prop = {}
            prop.background = val
        }
        adhoc.newReport.tableProp[col].format.prop = prop
        updateFormatTableCellPreview()
        applyFormatter()
    }
}
/**
 * @Function Name   : updateFormatTableCellPreview
 * @Description     : Apply format prop to the preview cell
 * @param           :
 * @returns         :
 * */
function updateFormatTableCellPreview() {
    if (adhoc.newReport.tableProp[col].format){
        var prop = adhoc.newReport.tableProp[col].format.prop
        if (prop){
            var css = {
                'background-color': prop.background,
                color: prop.color,
            }
            if (prop.strike == true) {
                css['text-decoration'] = 'line-through'
            } else {
                css['text-decoration'] = 'none'
            }
            if (prop.bold == true) {
                css['font-weight'] = 'bold'
            } else {
                css['font-weight'] = 'normal'
            }
            if (prop.italics == true) {
                css['font-style'] = 'italic'
            } else {
                css['font-style'] = 'normal'
            }
            $('#format-preview-div').css(css)
        }
    }
}
/**
 * @Function Name   : selectCurrentColumn
 * @Description     : Highlights selected column
 * @param           : obj
 * @returns         :
 * */
function selectCurrentColumn(obj) {
    var col = $(obj).data('info');
    adhoc.newReport.tableProp.currentColumn = col.position
    var prop = adhoc.newReport.tableProp
    var dataSet = adhoc.newReport.dataSet
    var column = adhoc.newReport[col.source][dataSet][col.index]
    $(obj).closest('tr').find('th').removeClass('active');
    $(obj).addClass('active');
    if (prop[col.position] && prop[col.position] != undefined) {
        showTableColumnProperties();
    } else {
        prop[col.position] = {
            format: JSON.parse(JSON.stringify(columnFormatOptions)),
            modify: {
                operator: '',
                conValue: '',
                replaceValue: ''
            },
            display_name :column.display_name,
            column_width : report_default_column_width
        }
        adhoc.newReport.tableProp = prop
        showTableColumnProperties();
    }
}
/**
 * @Function Name   : showTableColumnProperties
 * @Description     : FIll the table properties values based on column
 * @param           :
 * @returns         :
 * */
function showTableColumnProperties() {
    col = adhoc.newReport.tableProp.currentColumn
    var formatProp = adhoc.newReport.tableProp[col].format
    var modifyProp = adhoc.newReport.tableProp[col].modify
    $('#table-prop-column-name').val(adhoc.newReport.tableProp[col].display_name)
    $('#table-prop-column-width').val(adhoc.newReport.tableProp[col].column_width)
    if (formatProp && formatProp.operator && formatProp.operator.length > 0) {
        formatCondition.setValue(formatProp.operator);
        formatConditionChange($('#format-condition'), true)
    } else {
        formatCondition.clear();
    }
    if (formatProp && formatProp.prop) {
        $('input.format-bold').prop('checked', formatProp.prop.bold);
        $('input.format-italics').prop('checked', formatProp.prop.italics);
        $('input.format-strike').prop('checked', formatProp.prop.strike);
        $('#format-colorpicker-2').ace_colorpicker('pick', formatProp.prop.background);
        $('#format-colorpicker-1').ace_colorpicker('pick', formatProp.prop.color);
    }else{
        //added by satish.
        $('#format-colorpicker-2').ace_colorpicker('pick', '#ffffff');
        $('input.format-bold').prop('checked', false);
        $('input.format-italics').prop('checked', false);
        $('input.format-strike').prop('checked', false);
        $('#format-colorpicker-1').ace_colorpicker('pick', "#393939");
    }
    updateFormatTableCellPreview();
    if (modifyProp && modifyProp.operator && modifyProp.operator.length > 0) {
        modifyCondition.setValue(modifyProp.operator);
        modifyConditionChange($('#modify-condition'), true);
        $('#modify-replace-value').val(modifyProp.replaceValue);
    } else {
        modifyCondition.clear();
    }  

}
/**
 * @Function Name   : modifyReplaceValue
 * @Description     : This will be called on blur of modify value
 * @param           : obj
 * @returns         :
 * */
function modifyReplaceValue(obj) {
    col = adhoc.newReport.tableProp.currentColumn
    var modifyProp = adhoc.newReport.tableProp[col].modify
    modifyProp.replaceValue = $(obj).val();
    adhoc.newReport.tableProp[col].modify = modifyProp;
}
/* STEP4 TABLE ends */
/* <----- STEP4 CHART -----> */
/**
 * @Function Name   : drawChartPropPreview
 * @Description     : this will update the charts name and axis namess
 * @param           :
 * @returns         :
 * */
function drawChartPropPreview() {
    $('#design-chart-x-axis-name').val(adhoc.newReport.chart.xAxisName);
    $('#design-chart-y-axis-name').val(adhoc.newReport.chart.yAxisName);
    $('#design-chart-chart-name').val(adhoc.newReport.chart.caption);
    chartLegendSel.setValue(adhoc.newReport.chart.legend.position);
    $("#displayLegend").prop('checked', adhoc.newReport.chart.legend.visible);
    $("#displayLegendValues").prop('checked',adhoc.newReport.chart.legend.showValue);
    drawDesignReportChart('chart-prop-preview', 'prop');
}
/**
 * @Function Name   : updateChartTitleProp
 * @Description     : Updates the chart title
 * @param           :
 * @returns         :
 * */
function updateChartTitleProp(obj) {
    adhoc.newReport.chart.caption = $(obj).val();
    drawDesignReportChart('chart-prop-preview', 'prop')
}

function updateAxisLabelVisible(check, val) {
    if (val == 'x')
        adhoc.newReport.chart.xAxisVisible = check
    else
        adhoc.newReport.chart.yAxisVisible = check
}
/**
 * @Function Name   : updateChartXTitleProp
 * @Description     : updates chart x axis name
 * @param           :
 * @returns         :
 * */
function updateChartXTitleProp(obj) {
    adhoc.newReport.chart.xAxisName = $(obj).val()
    drawDesignReportChart('chart-prop-preview', 'prop')
}
/**
 * @Function Name   : updateChartYTitleProp
 * @Description     : updates chart y axis name
 * @param           :
 * @returns         :
 * */
function updateChartYTitleProp(obj) {
    adhoc.newReport.chart.yAxisName = $(obj).val()
    drawDesignReportChart('chart-prop-preview', 'prop')
}

function updateLegendvisible(check) {
    var visible = 0;
    if (check == true)
        visible = 1
    adhoc.newReport.chart.legend.visible = visible
    drawDesignReportChart('chart-prop-preview', 'prop');
}
/**
 * @Function Name   : updateLegendvaluesvisible
 * @Description     : Updates legend value
 * @param           :
 * @returns         :
 * */
function updateLegendvaluesvisible(check) {
    adhoc.newReport.chart.legend.showValue = check
    drawDesignReportChart('chart-prop-preview', 'prop');
}

function updateLegendposition(obj) {
    adhoc.newReport.chart.legend.position = $(obj).val();
    drawDesignReportChart('chart-prop-preview', 'prop');
}

/* STEP4 CHART ends */

/* STEP4 ends */

/* <------          STEP5           ------>  */
/**
 * @Function Name   : showFinalStep
 * @Description     : Shows the step5 screen
 * @param           :
 * @returns         :
 * */
function showFinalStep(){
    $('#widgetName').val(adhoc.newReport.name);
    $('#widgetDescription').val(adhoc.newReport.description);
}
/**
 * @Function Name   : updateNewReportDesc
 * @Description     : Updates report desc on blur of text area
 * @param           : obj
 * @returns         :
 * */
function updateNewReportDesc(obj) {
    wizardErorMsg("");
    adhoc.newReport.description = $(obj).val();
}

function updateNewReportname(obj) {
    wizardErorMsg("");
    var reportName = $(obj).val();
    reportName =  reportName.trim();
    adhoc.newReport.name = reportName
}
/**
 * @Function Name   : saveNewAdhocReport
 * @Description     : Save the report 
 * @param           :
 * @returns         :
 * */
function saveNewAdhocReport() {
    if (adhoc.newReport.name != "" && adhoc.newReport.description != "") {
        if (adhoc.newReport.type == 'table')
            var d = getRequestData(adhoc.newReport.visual);
        else
            var d = getChartDataFromAdhoc();
        if (adhoc.newReport.reportId != undefined && adhoc.newReport.reportId.length > 0){
            delete d.report_id;
            sendAjaxCall(intalio_bpms.adhoc_reporting.save_report+adhoc.newReport.reportId+'/update', "POST", false, true, "json", d, handleAdhocError, function(data) {
                if (data.success_message != undefined) {
                    showNotification('Widget updated successfully.');
                    fetchAdhocReports();
                    $('#createReportModal').modal('hide');
                } else
                    showErrorNotification(data.error_message);
            });
        } else {
            sendAjaxCall(intalio_bpms.adhoc_reporting.save_report, "POST", false, true, "json", d, handleAdhocError, function(data) {
                if (data.success_message != undefined) {
                    showNotification('Widget created successfully.');
                    fetchAdhocReports();
                    $('#createReportModal').modal('hide');
                } else
                    showErrorNotification(data.error_message);
            });
        }
        
    } else {
        wizardErorMsg($("#step5ErrorMsg").text());
        adhoc.newReport.name == "" ? $("#widgetName").focus() : $("#widgetDescription").focus();
    }
}
/* STEP5 ends */

/* <----- common functions -----> */
function wizardErorMsg(msg) {
    $("#createReportError").text(msg).removeClass("hide");
}
/**
 * @Function Name   : getChartDataFromAdhoc
 * @Description     : Forms request data format from adhoc.newReport for chart
 * @param           :
 * @returns         :
 * */
function getChartDataFromAdhoc() {
    var cols = adhoc.newReport.visual
    var dataSet = adhoc.newReport.dataSet
    var xAxisDefs = adhoc.newReport[adhoc.newReport.chart.xAxisSource][dataSet]
    var yAxisDefs = adhoc.newReport[adhoc.newReport.chart.yAxisSource][dataSet]
    var chart = adhoc.newReport.chart
    var data = {
        title: adhoc.newReport.chart.caption || adhoc.newReport.name,
        data_set_id: dataSet,
        item_type: '',
        type: chart.type,
        dimensions : adhoc.newReport.chart.dimension,
        category: {
            title: adhoc.newReport.chart.xAxisName || xAxisDefs[adhoc.newReport.chart.xAxis].display_name,
            type: 'CHART',
            show_label: adhoc.newReport.chart.xAxisVisible,
            column: JSON.parse(JSON.stringify(xAxisDefs[adhoc.newReport.chart.xAxis]))
        },
        value: {
            title: adhoc.newReport.chart.yAxisName || yAxisDefs[adhoc.newReport.chart.yAxis].display_name,
            type: 'CHART',
            show_label: adhoc.newReport.chart.yAxisVisible,
            column: JSON.parse(JSON.stringify(yAxisDefs[adhoc.newReport.chart.yAxis]))
        },
        filters: [],
        metadata: {
            type: 'CHART',
            legend: {
                position: adhoc.newReport.chart.legend.position,
                show_value: adhoc.newReport.chart.legend.showValue,
                visible: adhoc.newReport.chart.legend.visible
            },
            no_data_message: 'There is no data.'
        }
    }
    if (adhoc.newReport.chart.chartSwf.indexOf('Doughnut') > -1){
        data.metadata.inner_radius = '100'
    }
    data.category.column.expression = 'row["' + data.category.column.name + '"]'
    data.value.column.expression = 'row["' + data.value.column.name + '"]'
    delete data.category.column.editor_exp;
    delete data.value.column.editor_exp;
    delete data.category.column['aggregate_function']
    delete data.value.column['aggregate_function']
    data.category.column.type = 'simple'
    data.value.column.type = 'simple'
    var order = adhoc.newReport.orders
    if (order.key != undefined){
        data.category.sort = {
            key: order.key,
            direction: order.direction
        }
    }
    /* Sorting does not applicable to Y - Axis
    if (adhoc.newReport.chart.yAxis == order.id && adhoc.newReport.chart.yAxisSource == order.source) {
        data.value.sort = {
            key: order.key,
            direction: order.direction
        }
    }
    */
    data.category.column.type = 'grouped'
    data.value.column.type = 'aggregated'
    data.value.column.aggregate_function = 'Sum'
    if (data.type == 'PIE') {
        data.item_type = 'NON_AXIS_CHART'
    } else {
        data.item_type = 'AXIS_CHART'
    }
    if (adhoc.newReport.filter != null && adhoc.newReport.filter.length > 0) {
        var filter = []
        var extFilters = adhoc.newReport.filter
        for (var i = 0; i < extFilters.length; i++) {
            var fil = extFilters[i]
            var val = getValuesOfConditions(fil)
            var ob = {
                operator: fil.operator,
                values: val,
                expression: 'row["' + fil.column + '"]'
            }
            filter.push(ob);
        }
        data.filters = filter
    }
    if (adhoc.newReport.reportId !=undefined && adhoc.newReport.reportId.length > 0 ){
        data.id = adhoc.newReport.reportItemId;
    }
    var r = {
        report: JSON.stringify({
            items: [data],
            metadata: {
                type: 'REPORT',
                name: adhoc.newReport.name || 'ok',
                description: adhoc.newReport.description
            },
            custom_columns: getCustomCols(JSON.parse(JSON.stringify(adhoc.newReport.customCols)))
        }),
        report_id: adhoc.newReport.dataDefinitionId
    }
    return r
}
/**
 * @Function Name   : getRequestData
 * @Description     : Forms request data format from adhoc.newReport for table
 * @param           :
 * @returns         :
 * */

function getRequestData(cols) {
    var report = {
        items: [{
            title: '',
            data_set_id: '',
            item_type: 'TABLE',
            type: 'TABLE',
            series: [],
            filters: [],
            groups: [],
            metadata: {
                type: 'TABLE',
                page_break: 10,
                highlights: []
            }
        }],
        metadata: {
            name: '',
            type: 'REPORT'
        }
    }
    var r = JSON.parse(JSON.stringify(adhoc.newReport))
    report.items[0].title = r.name
    report.items[0].data_set_id = r.dataSet
    report.metadata.name = r.name
    report.items[0].metadata.description = r.description
    report.metadata.description = r.description
    var dataSet = adhoc.newReport.dataSet
    var colProps = r.tableProp
    var order = r.orders
    var series = []
    for (var i = 0; i < cols.length; i++) {
        var obj = {}
        var col = cols[i]
        if (order.id == col.index && order.source == col.source) {
            obj.sort = {
                key: order.key,
                direction: order.direction
            }
        }
        obj.title = r[col.source][dataSet][col.index].display_name
        obj.visible = true;
        obj.type = 'TABLE'
        delete r[col.source][dataSet][col.index]['editor_exp']
        delete r[col.source][dataSet][col.index]['aggregate_function']
        delete r[col.source][dataSet][col.index]['aggregate_name']
        delete r[col.source][dataSet][col.index]['user_defined']
        r[col.source][dataSet][col.index].type = 'simple'
        obj.column = r[col.source][dataSet][col.index]
        obj.column.expression = 'dataSetRow["' + r[col.source][dataSet][col.index].name + '"]'
        if (colProps[col.position]) {
            var format = colProps[col.position].format
            var modify = colProps[col.position].modify
            var meta = {}
            if (format && format!= undefined && format.prop){
                var vals = getValuesOfConditions(format)
                var highlights = {
                    "filter": {
                        "operator": format.operator,
                        "expression": r[col.source][dataSet][col.index].expression.replace('dataSetRow', 'row'),
                        "values": vals
                    },
                    "font": {
                        "color": format.prop.color,
                        "background_color": format.prop.background,
                        "italics": format.prop.italics,
                        "bold": format.prop.bold,
                        "underline": format.prop.underline,
                        "line_through": format.prop.strike
                    }
                }
                if (format.operator && format.operator.length != 0)
                    meta.highlights = [highlights]
            }
            if (modify && modify!= undefined){
                vals = getValuesOfConditions(modify)
                var modifiers = {
                    "filter": {
                        "operator": modify.operator,
                        "expression": r[col.source][dataSet][col.index].expression.replace('dataSetRow', 'row'),
                        "values": vals
                    },
                    "value": modify.replaceValue
                }
                if (modify.operator && modify.operator.length != 0)
                    meta.modifiers = [modifiers]
            }
            obj.metadata = meta
            if (colProps[col.position].display_name != undefined) {
                obj.title = colProps[col.position].display_name;
            }
            obj.width = convertColumnWidth(colProps[col.position].column_width)
        }
        series.push(obj);
    }
    report.items[0].series = series
    report.items[0].groups = r.groups;
    report.custom_columns = getCustomCols(JSON.parse(JSON.stringify(adhoc.newReport.customCols)));
    if (adhoc.newReport.filter != null && adhoc.newReport.filter.length > 0) {
        var filter = []
        var extFilters = adhoc.newReport.filter
        for (var i = 0; i < extFilters.length; i++) {
            var fil = extFilters[i]
            var val = getValuesOfConditions(fil)
            var ob = {
                operator: fil.operator,
                values: val,
                expression: 'row["' + fil.column + '"]'
            }
            filter.push(ob);
        }
        report.items[0].filters = filter
    }
    if (adhoc.newReport.reportId !=undefined && adhoc.newReport.reportId.length > 0 ){
        report.items[0].id = adhoc.newReport.reportItemId;
    }
    var data = {
        report: JSON.stringify(report),
        report_id: adhoc.newReport.dataDefinitionId
    }
    return data
}
function convertColumnWidth(width){
    return (width*width_of_widget)/100
}
/**
 * @Function Name   : checkInCustomColumn
 * @Description     : Check weather the filed is custom column or not
 * @param           : name (Column name)
 * @returns         :
 * */
function checkInCustomColumn(name) {
    var custom = adhoc.newReport.customCols[adhoc.newReport.dataSet]
    var check = false
    if (custom && custom.length > 0) {
        for (var i = 0; i < custom.length; i++) {
            var col = custom[i]
            if (name == col.name) {
                check = true
                break;
            }
        }
    }
    return check
}
/**
 * @Function Name   : getCustomCols
 * @Description     : get the custom column object for request
 * @param           : cols
 * @returns         :
 * */
function getCustomCols(cols) {
    var dataSet = adhoc.newReport.dataSet
    var customCols = cols[dataSet]
    newCustomCols = []
    if (customCols && customCols.length > 0) {
        for (var i = 0; i < customCols.length; i++) {
            delete customCols[i]['editor_exp']
            if (customCols[i].user_defined == true )
                continue
            else
                newCustomCols.push(customCols[i])
        }
    }
    var rObj = {}
    if (newCustomCols.length > 0)
        rObj[dataSet] = newCustomCols
    return rObj
}
/**
 * @Function Name   : getValuesOfConditions
 * @Description     : get values of conditions from adhoc.newReport
 * @param           : format
 * @returns         :
 * */
function getValuesOfConditions(format) {
    var op = format.operator;
    var val = []
    if (op && op != null) {
        var options = propConditions[op];
        if (options.fieldType == 'multiple') {
            val = format.conValue
        } else if (options.fieldType == 'two') {
            val = [format.conValue, format.conValue2]
        } else {
            val = [format.conValue]
        }
    }
    return val
}
/* common functions end */

/* update report functions */
/**
 * @Function Name   : initializeUpdateReport
 * @Description     : Initilizes Update report screen
 * @param           :
 * @returns         :
 * */
function initializeUpdateReport(id){
    adhoc.newReport = JSON.parse(JSON.stringify(adhoc.report));
    adhoc.newReport.currentStep = 1
    adhoc.newReport.completedNo = 4
    adhoc.newReport.reportId = id
    fetchReportInfo(id);
}
/**
 * @Function Name   : fetchReportInfo
 * @Description     : Gets the selected report information
 * @param           :
 * @returns         :
 * */
function fetchReportInfo(id){ 
    sendAjaxCall(intalio_bpms.adhoc_reporting.get_reports+"/"+id+"?temp_id=1", "GET", false, true, "json", {}, executeReport.handleReportAjaxError, function(data){
        parseReportData(data.report);
    });
}
/**
 * @Function Name   : parseReportData
 * @Description     : Parse the response data to required format
 * @param           : data
 * @returns         :
 * */
function parseReportData(data){
    var report = JSON.parse(JSON.stringify(adhoc.newReport));
    var item = data.items[0]
    report.dataDefinitionId = report.reportId;
    report.dataSet = item.data_set_id;
    report.dataSetName = data.data_sets[0].name;
    report.name = data.metadata.name;
    report.description = data.metadata.description;
    report.dataSetObject = formDataSetObject(data.data_sets);
    report.customCols = formReportCustomColumns(report.dataSetObject)
    report.reportItemId = item.id
    adhoc.newReport = report
    adhoc.newReport.filter = parseReportFilters(item)
    var type = item.metadata.type;
    if (type == 'CHART'){
        parseReportChartData(data);
    } else {
        parseReportTableData(data);
    }
    showUpdateReportModal();
}
/**
 * @Function Name   : parseReportFilters
 * @Description     : Parse filters from response data
 * @param           : item
 * @returns         : filters
 * */
function parseReportFilters(item){
    var filters = []
    if (item.filters && item.filters.length > 0 ){
        for (var i = 0; i < item.filters.length; i++){
            var fil = item.filters[i]
            var ob = {}
            var op = fil.operator;
            ob.operator = fil.operator
            var column = fil.expression.replace('row["','').replace('"]','')
            ob.column = column
            var val = []
            if (op && op != null) {
                var options = propConditions[op];
                if (options.fieldType == 'multiple') {
                    ob.conValue = fil.values
                } else if (options.fieldType == 'two') {
                    ob.conValue = fil.values[0]
                    ob.conValue2 = fil.values[1]
                } else {
                    ob.conValue = fil.values[0]
                }
            }
            filters.push(ob);
        }
    }
    return filters
}
/**
 * @Function Name   : showUpdateReportModal
 * @Description     : Shows udate report modal widow
 * @param           :
 * @returns         :
 * */
function showUpdateReportModal(){
    $('#createReportModal .modal-dialog').css({
        'width': $(window).width() + 'px',
        'margin-top': '0px',
        'padding': '10px'
    });
    $('#createReportModal .modal-body').css('height', $(window).height() - 165 + 'px')
    $('#createReportModal').modal('show');
    $('#fuelux-wizard ul li').addClass('active');
    $('#createReportModal .nextStep').removeAttr('disabled');
    initializeCreateReport();
    dragtable.init();
    goToStep();
}
/**
 * @Function Name   : parseReportChartData
 * @Description     : Parse chart data form request
 * @param           : data
 * @returns         :
 * */
function parseReportChartData(data){
    var report = adhoc.newReport;
    var item = data.items[0];
    var xAxis = item.category.column.name
    report.type = 'chart';
    xAxis = xAxis.replace('row[','').replace(']','');
    xAxisInfo = getReportColumnInfo(xAxis);
    xAxisVisual = {
        index : xAxisInfo.index,
        source :xAxisInfo.source,
        position : 0
    }
    report.visual.push(xAxisVisual);
    var yAxis = item.value.column.name
    yAxis = yAxis.replace('row[','').replace(']','');
    yAxisInfo = getReportColumnInfo(yAxis);
    yAxisVisual = {
        index : yAxisInfo.index,
        source :yAxisInfo.source,
        position : 1
    }
    report.visual.push(yAxisVisual);
    report.chart.legend.position = item.metadata.legend.position;
    report.chart.legend.showValue = item.metadata.legend.show_value;
    report.chart.legend.visible = item.metadata.legend.visible;
    report.chart.type = item.type;
    report.chart.dimension = item.dimensions;
    report.chart.xAxis = xAxisInfo.index; 
    report.chart.yAxis = yAxisInfo.index;
    report.chart.xAxisSource = xAxisInfo.source;
    report.chart.yAxisSource = yAxisInfo.source;
    report.chart.xAxisName = item.category.title;
    report.chart.yAxisName = item.value.title;
    report.chart.caption = item.title;
    adhoc.newReport = report;
    var chartValue;
    if (item.type == 'PIE' && item.metadata.inner_radius != 0){
        chartValue = 'doughnut-'+item.dimensions;
    } else {
        chartValue = item.type +'-'+item.dimensions;
    }
    var chart = getDesignChartSwf(chartValue);
    var filters = report.filter;
    for (var i = 0; i < filters.length ; i++){
        var fil = filters[i]
        var colInfo = getReportColumnInfo(fil.column);
        var ob = {
            index : colInfo.index,
            source : colInfo.source,
            position : adhoc.newReport.visual.length
        }
        pushIfNotExist(adhoc.newReport.visual,ob)
    }
    if (item.category.sort != null){
        var order = parseReportOrders(item.category.sort);
        var ob = {
            index : order.id,
            source : order.source,
            position : adhoc.newReport.visual.length
        }
        pushIfNotExist(adhoc.newReport.visual,ob)
        adhoc.newReport.orders = order
    }   
    report.chart.type = chart.birt_name
    report.chart.chartSwf = chart.swf
    report.chart.dimension = chart.dimension
    report.chart.chartValue = chartValue
}
/**
 * @Function Name   : pushIfNotExist
 * @Description     : Check in JSON array and pushes if not exists
 * @param           : arr, val
 * @returns         :
 * */
function pushIfNotExist(arr,val){
    var newArr = $.grep(arr, function(e){return (e.index == val.index && e.source == val.source) });
    if (newArr.length == 0 ){
        arr.push(val)
    }
}

/**
 * @Function Name   : parseReportTableData
 * @Description     : Parse table data form response
 * @param           : data
 * @returns         :
 * */
function parseReportTableData(data){
    var report = adhoc.newReport;
    var item = data.items[0];
    var order_by,order_col;
    var sort;
    report.type = 'table';
    for (var i = 0 ; i < item.series.length; i++){
        var col = item.series[i]
        var colInfo = getReportColumnInfo(col.column.name)
        var visualObj = {
            index: colInfo.index,
            source: colInfo.source,
            position: i
        }
        report.visual.push(visualObj);
        var metadata = col.metadata
        var meta = {}
        if (metadata.highlights.length > 0){
            var highlight = metadata.highlights[0]
            var prop = {}
            prop.operator = highlight.filter.operator;
            if (prop.operator == 'between'){
                prop.conValue = highlight.filter.values[0]
                prop.conValue2 = highlight.filter.values[1]
            } else if (prop.operator == 'in') {
                prop.conValue = highlight.filter.values;
            } else {
                prop.conValue = highlight.filter.values[0];
            }
            prop.prop = highlight.font
            prop.prop.strike = highlight.font.line_through
            prop.prop.background = highlight.font.background_color
            meta.format = prop
        }
        if (metadata.modifiers.length > 0){
            var modifier = metadata.modifiers[0];
            var modify = {}
            modify.operator = modifier.filter.operator;
            if (modify.operator == 'between'){
                modify.conValue = modifier.filter.values[0]
                modify.conValue2 = modifier.filter.values[1]
            } else if (modify.operator == 'in') {
                modify.conValue = modifier.filter.values
            } else {
                modify.conValue = modifier.filter.values[0];
            }
            modify.replaceValue = modifier.value;
            meta.modify = modify;
        }
        meta.display_name = col.title;
        meta.column_width = (col.width * 100)/width_of_widget;
        if (metadata.highlights.length > 0 || metadata.modifiers.length > 0 || col.title != ''){
            report.tableProp[i] = meta
        }
        if (col.sort && col.sort != null){
            sort = col.sort
        }
    }
    adhoc.newReport.groups = parseReportGroups(item)
    if (sort && sort != null)
        adhoc.newReport.orders = parseReportOrders(sort)
}
/**
 * @Function Name   : parseReportGroups
 * @Description     : Parse report groups from response
 * @param           :
 * @returns         :
 * */
function parseReportGroups(item){
    var groups = []
    if (item.groups && item.groups.length > 0){
        for (var i =0 ; i < item.groups.length ; i++){
            var grp = item.groups[i]
            var obj = {
                aggregate_name: grp.aggregate_name,
                aggregate_on: grp.aggregate_on,
                column_bindings: grp.column_bindings
            }
            groups.push(obj);
        }
    }
    return groups;
}
/**
 * @Function Name   : parseReportGroups
 * @Description     : Parse report orders
 * @param           :
 * @returns         :
 * */
function parseReportOrders(sort){
    var col = sort.key
    var orders = {}
    if (col){
        col = col.replace('row["','').replace('"]','')
        var info = getReportColumnInfo(col)

        orders = {
            id: info.index,
            source:info.source,
            key: 'row["' + col + '"]'
        }
        if (sort.direction == 'Descending'){
            orders.direction = 'desc'
        } else 
            orders.direction = 'asc'

    }
    return orders
}
/**
 * @Function Name   : getReportColumnInfo
 * @Description     : Gets column info like index and souce of column
 * @param           : name
 * @returns         :
 * */
function getReportColumnInfo(name){
    var dataSet = adhoc.newReport.dataSet;
    var colDefs = adhoc.newReport.dataSetObject[dataSet]
    var customCols = adhoc.newReport.customCols[dataSet]
    var source = ''
    var index = ''
    for (var i = 0; i < colDefs.length; i++){
        var col = colDefs[i];
        if (col.name  == name){
            index = i
            source = 'dataSetObject'
        }
    }
    if (customCols){
        for (var i = 0; i < customCols.length; i++){
            var col = customCols[i];
            if (col.name  == name){
                index = i
                source = 'customCols'
            }
        }
    }
    return {source:source,index:index};
}
/**
 * @Function Name   : formReportCustomColumns
 * @Description     : Forms list of custom columns used in that report
 * @param           :
 * @returns         :
 * */
function formReportCustomColumns(cols){
    var customCols = {}
    $.each(cols,function(key,value){
        var remove = []
        for (var i =0; i< value.length;i++){
            var col = value[i]
            if (col.user_defined == true){
                var editor_exp = replaceAll('row["', '$', col.expression)
                editor_exp = replaceAll('"]', '', editor_exp)
                col.editor_exp = editor_exp
                if (customCols[key] == undefined)
                    customCols[key] = [col];
                else
                    customCols[key].push(col);
                remove.push(i)
            }
        }
        cols[key] = cols[key].multisplice(remove)
    });
    return customCols;
}
/* update report functions  end*/

function closeCreateReportModal(){
    resetCustomColumn();
}
/**
 * @Function Name   : multisplice
 * @Description     : Prototype function for multiple splice
 * @param           :
 * @returns         :
 * */
Array.prototype.multisplice = function(){
    var args = Array.apply(null, arguments);
    var arr = []
    args = args[0]
    for (var i =0; i < this.length ; i++){
        if (args.indexOf(i) == -1)
            arr.push(this[i])
    }
    return  arr
}

function changeHeaderButton(){
    $('#confirmationDialog').find('.modal_heading').text($("#deleteDataDefOrReport").text());
    $('#confirmationDialog').find('.confirmDelete').attr('onclick','javascript:deleteReport(this)');   
}

function showSampleExp(){
    modalShow('sampleExpressionDialog');    
}
