/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 * Author : Satish Pokala
 */

/*This variable will store the selected process id*/
var analyticsProcessId;

/*This variable will store the response data of analytics report*/
var reportData;

/*This variable will store the types of criteria*/
var analyticsCriteria = [{id:"all",value:"All Instances"},{id:"lastXCompletedInstances",value:"Limit Instances"},{id:"completedInLastXDays",value:"Completed in last x days"},{id:"completedSinceADate",value:"Completed Since"}];

/*This variable will store class names of dom to replace accordingly*/
var criteria_type = {
  lastXCompletedInstances:"insLimit",
  completedInLastXDays:"lastXDays",
  completedSinceADate:'range'
};

/*This variable will store descriptons of analytics based on type of criteria*/
var analyticsDescription = {
    "all" : ["Calculated on all instances.",""],
    "completedInLastXDays" : ["Calculated on instances completed in last {0} days.","days"],
    "completedSinceADate" : ["Calculated on instances completed since {0}.","since"],
    "lastXCompletedInstances" : ["Calculated on last {0} completed instances.","limit"]
}

/*This variable will store constants objects used multiple times in this file*/
var constants = {
    analyticsModal :$("#analyticsModal"),
    applyAnalytics :$('.applyAnalytics'),
    criteria_Obj   :$("#statCriteria"),
    enableAnalytics:$(".enableAnalytics"),
    procAnalytics  :$("#procAnalytics"),
    errorMessage   :$("#errorMessage")
}

/*This function will get analytics data & will display it in modal window*/
function showAnalytics(){
    var columnsData = getSelectedRows(monitoringProcessTable, true);
    if(columnsData.length==0){
        showInformation(defaultValue.selectProcess);       
        return false;
    }else if(columnsData.length==2){
        showInformation($("#selectOnlyOneProcess").text());       
        return false;
    }
    else if(columnsData[0][11]){
        showInformation($('#selectOnlyProcess').text());
        return false;
    }
    if(columnsData[0][0]){
        analyticsProcessId = $(columnsData[0][0]).find('input').attr('value'); 
        addLoading(constants.procAnalytics);
        analyticsHelper();
        sendAjaxCall(intalio_bpms.monitoring_processes.getAnalytics+"?processid="+analyticsProcessId, "GET", false, true, "json", {}, handleAnalyticsError, function(response){
            if(response.report=="null" || response.report==null){
                modalHide("analyticsModal");
                showInformation($("#noReportMsg").text());
                return false;
            }
            else if(response.report){
                modalShow("analyticsModal");
                getConfigureData(columnsData);
                reportData = response.report;
                constants.errorMessage.addClass('hide');
                changeAnalytics("minutes");
                var descriptionObj = response.report.reportDescription
                $("#reportGenTime").text($.format.date(response.report.reportGeneratedTime,userPreferences.dateFormat+userPreferences.hourFormat))
                $("#instanceCount").text(response.report.instanceCount);
                if(descriptionObj.criteria_type=="completedSinceADate")
                    $('#analyticsDescription').text("* "+analyticsDescription[descriptionObj.criteria_type][0].replace('{0}',$.format.date(Number(descriptionObj[analyticsDescription[descriptionObj.criteria_type][1]]),userPreferences.dateFormat+userPreferences.hourFormat)));
                else
                    $('#analyticsDescription').text("* "+analyticsDescription[descriptionObj.criteria_type][0].replace('{0}',descriptionObj[analyticsDescription[descriptionObj.criteria_type][1]]));
                if(response.is_ps_calculation_on)
                    constants.enableAnalytics.prop('checked',true);
                else
                    constants.enableAnalytics.prop('checked',false);
                $("#configureBtn").removeClass('hide');
            }
        });
    }
}

/*This function will called before showing analytics data*/
function analyticsHelper(){
    $(".analyticsH").addClass('hide');
    $(".labelModalClass").removeClass('col-sm-3').addClass('col-sm-4');
    constants.analyticsModal.find('.modal-footer').addClass('hide');
}

/*This function will get configuration data & will display it in modal window*/
function getConfigureData(columnsData){
    var statCriteria = applySelectize($('#statCriteria'), [], [], 1, false,analyticsCriteria);
    constants.analyticsModal.find('.modal-body').css('height','355px');
    $("#configureAnalytics").addClass("hide");
    sendAjaxCall(intalio_bpms.monitoring_processes.getAnalyticsConfig+"?processid="+analyticsProcessId, "GET", false, true, "json", {}, handleAnalyticsError, function(response){
        if(response.error_message){
            removeLoading();
            showErrorNotification(response.error_message);
            return false;
        }
        else if(response.psConfig){
            $("#modeInterval").val(response.psConfig.mode_interval);
            $("#delay").val(response.psConfig.delay);
            statCriteria.setValue(response.psConfig.criteria_type);
            $("#instanceLimit").val(response.psConfig.limit);
            if(response.psConfig.criteria_type=="completedSinceADate")
                $("#dateStart").val($.format.date(response.psConfig.since,"yyyy/MM/dd hh:mm a"));
            $("#noOfdays").val(response.psConfig.days);
            removeLoading();
        }
    });
}

/*This function will enable / disable the analytics based on process id*/
function startStopAnalytics(obj){
    addLoading(constants.analyticsModal.find('.modal-body'));
    if(obj.checked)
        url = intalio_bpms.monitoring_processes.startAnalytics;
    else
        url = intalio_bpms.monitoring_processes.stopAnalytics;       
    sendAjaxCall(url+"?processid="+analyticsProcessId, "GET", false, true, "json", {}, handleAnalyticsError, function(response){
        showMessages(response);
    });
}

/*This function will show messages after making ajax calls*/
function showMessages(response){
    if(response.success_message){
        showNotification(response.success_message);
        if(constants.enableAnalytics.prop('checked'))
            constants.applyAnalytics.removeAttr('disabled');
        else
            constants.applyAnalytics.attr('disabled',true)
    }
    else
        showErrorNotification(response.error_message);
    removeLoading();
}

/*This function will show / hide the configuration & analytics data accordingly*/
function configureAnalytics(){
    if($("#configureAnalytics").hasClass('hide')){
        constants.analyticsModal.find('.modal-body').css('height','500px');
        constants.analyticsModal.find('.modal-footer').removeClass('hide');
    }
    else{
        constants.analyticsModal.find('.modal-body').css('height','355px');
        constants.analyticsModal.find('.modal-footer').addClass('hide');
    }
    $("#configureAnalytics").toggleClass("hide");
    if(constants.enableAnalytics.prop('checked'))
        constants.applyAnalytics.removeAttr('disabled');
    else
        constants.applyAnalytics.attr('disabled',true)
    showRequiredFields();
    $("#configureAnalytics").css('width','721px');
}

/*This function will apply analytics based on the configuration changed*/
function applyAnalytics(){
    var dataObj = {};
    dataObj.criteria_type=constants.criteria_Obj.val();
    if($("#delay").val()==""){
        constants.errorMessage.text($('#delayMsg').text()).removeClass('hide');
        return false;
    }
    else
        dataObj.delay=$("#delay").val();
    if(constants.criteria_Obj.val()=="lastXCompletedInstances"){
        if($("#instanceLimit").val())
            dataObj.limit=$("#instanceLimit").val();
        else{
                constants.errorMessage.text($("#analyticsLimitMsg").text()).removeClass('hide');
                return false;
            }
    }
    else if(constants.criteria_Obj.val()=="completedSinceADate"){
        if($("input[id=dateStart]").val())
            dataObj.since = moment($("input[id=dateStart]").val()).format('YYYY-MM-DD HH:mm:ss');
        else{
                constants.errorMessage.text($("#anaRangeMsg").text()).removeClass('hide');
                return false;
            }
    }
    else if(constants.criteria_Obj.val()=="completedInLastXDays"){
        if($("#noOfdays").val())
            dataObj.days = $("#noOfdays").val()
        else{
            constants.errorMessage.text($("#anaDaysMsg").text()).removeClass('hide');
            return false;
        }
    }
    
    addLoading(constants.analyticsModal.find('.modal-body'));
    sendAjaxCall(intalio_bpms.monitoring_processes.getAnalyticsConfig+"?configParam="+JSON.stringify(dataObj)+"&processid="+analyticsProcessId, "POST", false, true, "json", {}, handleAnalyticsError, function(response){
        removeLoading();
        if(response.success_message){
            modalHide("analyticsModal");
            var columnsData = getSelectedRows(monitoringProcessTable, true);
            showNotification(response.success_message);
            $("#monitoring_process").find('tr.row_selected > td input:first').trigger('click');
        }
        else
            showErrorNotification(response.error_message);
    });
}

/*This function will show / hide the required fields based on criteria selected*/
function showRequiredFields(){
    var id = constants.criteria_Obj.val();
    hideAnalyticsConfigure();
    if(id!="all")
        $("."+criteria_type[id]).removeClass('hide');
}

/*This function will hide all the configuration fields*/
function hideAnalyticsConfigure(){
    $(".insLimit").addClass('hide');
    $(".range").addClass('hide');
    $(".lastXDays").addClass('hide');
}

/*This function will calculate analytics based on the param[seconds,minutes,hours,days]*/
function changeAnalytics(time){
    var formula;
    $('.analyticsTime').find('li').removeClass('active').end().find('li.'+time).addClass('active');
    if(time=="seconds")
        formula = 1000;    
    else if(time=="minutes")
        formula = 60000;
    else if(time=="hours")
        formula = 3600000;
    else if(time="days")
        formula = 86400000;
    if (formula){
        $("#mean").text((Math.round(reportData.mean)/formula).toFixed(1));
        $("#median").text((Math.round(reportData.median)/formula).toFixed(1));
        var modeValues = [];
        var rangeValues= [];  
        if(reportData.mode){
            var mode  = reportData.mode.split(',');
            $.each(mode,function(key,value){
                if(key<=5)
                    modeValues.push((Math.round(value)/formula).toFixed(1));
         });
        }
        var range  = reportData.range.split('-');
        $.each(range,function(key,value){
            rangeValues.push((Math.round(value)/formula).toFixed(1));
        });
        if(modeValues.length>0)
            $('#mode').text(modeValues.toString().replace(/\,/g, ' , '));
        $("#range").text(rangeValues[0]+" - "+rangeValues[1]);
    }
}

/*This function will handle all the ajax call errors made in analytics*/
function handleAnalyticsError(error){
    if(error){
        removeLoading();
        showErrorNotification(error);
    }
}