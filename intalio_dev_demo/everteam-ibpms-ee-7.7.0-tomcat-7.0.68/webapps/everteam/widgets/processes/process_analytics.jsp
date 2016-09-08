<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<script type="text/javascript">
var filterobjID,packageListDashboard = {};
/*PA in this file stands for Process Analytics*/
/*ready function for analtics*/
$(function () {
    var widgetStateId = $('#processAnalytics').closest('.widget').attr("id");
    var widgetObject  = getWidgetObject(widgetStateId);
    if (widgetObject.filter ==''){
        var filterObject = {};
        filterObject.chartType = defaults.swf1;
        widgetObject.filter = filterObject;
        persistWidget(widgetObject);
    }
    var divId_PA = defaults.chart18 + widgetStateId;
    $('#processAnalytics').attr('id', divId_PA);
    $('#procAnalyticsFilter').attr('id', "procAnalyticsFilter"+widgetStateId);
    filterobjID = $("#procAnalyticsFilter"+widgetStateId);
    var possibleCharts=[defaults.swf1,defaults.swf2,defaults.swf10,defaults.swf11,defaults.swf14];
    var possibleChartsNames=["MSColumn 3D","Stacked Column 3D","MSColumn 2D","Stacked Column 2D","MSBar"];
    filterobjID.find('.chartTypes').empty();
    $.each(possibleCharts, function (idx, value) {
        filterobjID.find('.chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
    });
    filterobjID.find('.chartTypes').chosen();
    filterobjID.find('.chartTypes').next().css('width',170);
    var showAnalyticsIn = '<option value="seconds">Seconds</option><option value="minutes">Minutes</option><option value="hours">Hours</option><option value="days">Days</option>';
    filterobjID.find('.showAnalyticsIn').append(showAnalyticsIn);
    filterobjID.find('.showAnalyticsIn').chosen();
    filterobjID.find('.showAnalyticsIn').next().css('width',170);
    var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessPAChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
    var refreshIcon = "<a onclick=getPAData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
    if ($("#" + divId_PA).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
        $("#" + divId_PA).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
        $("#" + divId_PA).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
    }
    getPAData($("#" + divId_PA),widgetStateId);
});//ready function end

/*This function will get the data for analytics*/
function getPAData(obj,widId){
    clickRefresh(obj,true);
    var widgetStateId;
    var data = {};
    if ($(obj).length !=0)
        widgetStateId = $(obj).closest('.widget').attr("id");
    else if (widId)
        widgetStateId = widId;
    var widgetObject = getWidgetObject(widgetStateId);
    if (widgetObject && widgetObject.filter && widgetObject.filter.process){
        var filterObject = widgetObject.filter;
        data.processid = filterObject.process;
        if(filterObject.activeProcess)
            data.activeOnly = filterObject.activeProcess;
        else
            data.activeOnly = false;
        sendAjaxCall('analytics/report', "GET", false, true, "json", data, PAErrorCall, function(responseData){
            clickRefresh(obj,false);
            if(responseData.error_message)
                showErrorNotification(responseData.error_message);
            else
                populatePAData(responseData,widgetStateId);
        });
    }else
        filterProcessPAChart($('#'+widId).find('.filterIcon'));
}

/*This function will get the processes & packages list for filtering analytics*/
function filterProcessPAChart(obj){
    var widgetStateId = $(obj).closest('.widget').attr("id");
    var widgetObject = getWidgetObject(widgetStateId);
    addLoading(filterobjID.find('.modal-body'));
    $('#loading').css('margin-top',30);
    filterobjID.find('.chartFilterTable .error-Msg').addClass('hide');
    modalShow('procAnalyticsFilter'+widgetStateId);
    $('#procAnalyticsFilter'+widgetStateId).find('.modal-dialog').css('width',675);
    var data = {};
    sendAjaxCall('dashboard/filters/processes', "POST", false, true, "json", data, PAErrorCall, function(responseData){
        if(responseData.error_message == undefined){
            paProcessFilter = responseData.process;
            populatePAFilterData(responseData,widgetStateId);
        }
        else
            showErrorNotification(responseData.error_message);
    });
}

function populatePAFilterData(data,widgetStateId){
    var prevPackage;
    var widgetObject = getWidgetObject(widgetStateId);
    
    if (widgetObject && widgetObject.filter){
        var filterObject = widgetObject.filter;
        paActiveObj = filterobjID.find('.paActiveProc');
        if(filterObject.activeProcess)
            paActiveObj.prop('checked',filterObject.activeProcess);
        else
            paActiveObj.prop('checked',false);
        updatePAPackages(paActiveObj);
        if (filterObject.chartType){
            filterobjID.find('.chartTypes').next().remove();
            filterobjID.find('.chartTypes').removeAttr('style').removeClass('chzn-done');
            filterobjID.find('.chartTypes').val(filterObject.chartType);
            filterobjID.find('.chartTypes').chosen();
            filterobjID.find('.chartTypes').next().css('width',170);
        }
        if (filterObject.showAnalyticsIn){
            filterobjID.find('.showAnalyticsIn').next().remove();
            filterobjID.find('.showAnalyticsIn').removeAttr('style').removeClass('chzn-done');
            filterobjID.find('.showAnalyticsIn').val(filterObject.showAnalyticsIn);
            filterobjID.find('.showAnalyticsIn').chosen();
            filterobjID.find('.showAnalyticsIn').next().css('width',170);
        }        
    }
    if(widgetObject != null) {
        if (widgetObject.title)
            filterobjID.find('.chartName').val(widgetObject.title);
    }
    filterobjID.find('.analyticsPackageList').attr('widgetId',widgetStateId);
    filterobjID.find('.analyticsPackageList').chosen();
    filterobjID.find('.analyticsPackageList').next().css('width',410);
    filterobjID.find('.analyticsPackageList').next().find('li.search-field input').css('width',250);
    filterobjID.find('.analyticsPackageList').next().find('li.search-field input').css('height',25);
    removeLoading(filterobjID.find('.modal-body'));
    filterobjID.find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
}

function updatePAPackages(obj){
    var prevPackage,changedPackage=[];
    var widgetStateId = $(obj).closest('.widget').attr("id");
    paPackageObj = filterobjID.find('.analyticsPackageList');
    paProcessObj = filterobjID.find('.analyticsProcessesList');
    
    paPackageObj.removeAttr('style').removeClass('chzn-done');
    paProcessObj.removeAttr('style').removeClass('chzn-done');
    paProcessObj.next().remove();
    paPackageObj.next().remove();
    
    paProcessObj.closest('tr').addClass('hide');
    paPackageObj.empty();
    packageListDashboard = {};
    var widgetObject = getWidgetObject(widgetStateId);
    var filterObject = widgetObject.filter;
    $.each(paProcessFilter,function(key,value){
       if(value.package){
            if(($(obj).prop('checked') && value.status==="ACTIVE") || !$(obj).prop('checked')) {
                prevPackage = value.id;
                packageListDashboard[prevPackage] = [];
                addCheck= false;
                if(filterObject.package){
                    $.each(filterObject.package,function(key1,value1){
                        if($(obj).prop('checked')){
                            if(value1 == value.id || String(value1).split('/')[0]===String(value.id).split('-')[0] || String(value1).split('-')[0] === String(value.id).split('-')[0]){
                                addCheck = true;
                                changedPackage.push(value.id);
                                paPackageObj.append('<option value="'+value.id+'" selected=selected>'+value.name+' ['+value.version+']</option>');
                            }
                        }else if(value1 == value.id){
                                addCheck = true;
                                changedPackage.push(value.id);
                                paPackageObj.append('<option value="'+value.id+'" selected=selected>'+value.name+' ['+value.version+']</option>');
                        }
                    });
                }
                if(!addCheck)
                    paPackageObj.append('<option value="'+value.id+'">'+value.name+' ['+value.version+']</option>')        
            }
        }else if(($(obj).prop('checked') && value.status==="ACTIVE") || !$(obj).prop('checked'))
            packageListDashboard[prevPackage].push({name:value.name,id:value.id});
        $(paPackageObj).find('option').each(function() {
            $(this).prevAll('option[value="' + this.value + '"]').remove();
        });
    });
    paPackageObj.attr('widgetId',widgetStateId);
    paPackageObj.chosen();
    paPackageObj.next().css('width',410);
    paPackageObj.next().find('li.search-field input').css('width',250);
    paPackageObj.next().find('li.search-field input').css('height',25);
    if(filterObject.package)        
        fetchFilterProcessesPA('',changedPackage,widgetStateId);
}

function applyPAFilter(obj){
    var widgetStateId = $(obj).attr("widgetId");
    var widgetObject = getWidgetObject(widgetStateId);
    var filterObject = {};
    var modalObj = $(obj).closest('.modal');
    var data = {}
    var oldObject = JSON.parse( JSON.stringify( widgetObject.filter));
        delete oldObject.chartType;
    if($(modalObj).find('.chartName').val()==""){
        $(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetChartNameErrorMsg').text());
        $(modalObj).find('.chartName').focus();
        return false;
    }
    else if($(modalObj).find('.analyticsPackageList').val()==null){
        $(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetPackageErrorMsg').text());
        return false;
    }
    else if($(modalObj).find('.analyticsProcessesList').val()==null){
        $(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetProcessErrorMsg').text());
        return false;
    }
    if ($(modalObj).find('.chartTypes').val())
        filterObject.chartType = $(modalObj).find('.chartTypes').val();
    if ($(modalObj).find('.showAnalyticsIn').val())
        filterObject.showAnalyticsIn = $(modalObj).find('.showAnalyticsIn').val();
    if ($(modalObj).find('.chartName').val()){
            widgetObject.title =  $(modalObj).find('.chartName').val();
            $('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val()); 
    }
    if ($(modalObj).find('.analyticsPackageList').val()){
        filterObject.package = $(modalObj).find('.analyticsPackageList').val();
        if ($(modalObj).find('.analyticsProcessesList').val()){
            filterObject.process = $(modalObj).find('.analyticsProcessesList').val();
            data.processid = $(modalObj).find('.analyticsProcessesList').val();
        }
    }
    var activeOnly = filterobjID.find('.paActiveProc').prop('checked');
    data.activeOnly = activeOnly;
    filterObject.activeProcess = activeOnly;

    widgetObject.filter = filterObject;
    persistWidget(widgetObject);
    var newObject = JSON.parse( JSON.stringify( filterObject ) )
    delete newObject.chartType;
    delete newObject.showAnalyticsIn;
    if (compareObjects(newObject,oldObject)){
        filterobjID.modal('hide');
        changeChartType_PA(widgetStateId);
    }
    else{
        filterobjID.modal('hide');
        clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
        sendAjaxCall('analytics/report', "GET", false, true, "json", data, PAErrorCall, function(data1){ 
            clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
            if(responseData.error_message == undefined)
                populatePAData(data1,widgetStateId) ;
            else
                showErrorNotification(responseData.error_message);
        });
    }
}

function fetchFilterProcessesPA(obj,pkgList,widgetId){
    var processesInPackage,widgetStateId,processesObj = filterobjID.find('.analyticsProcessesList')
    if ($(obj).length !=0 ){
        widgetStateId = $(obj).attr('widgetId');
        processesInPackage = $(obj).val();
    } else {
        widgetStateId = widgetId;
        processesInPackage = pkgList;
    }
    var widgetObject = getWidgetObject(widgetStateId);
    var prevProcessList = processesObj.val();
    if($(obj).length == 0){
        if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
            var filterObject = widgetObject.filter;
            if (filterObject.process != undefined && filterObject.process != null){
                prevProcessList = filterObject.process;
            }
        }
    }
    filterobjID.find('.error-Msg').addClass('hide');
    processesObj.removeAttr('style').removeClass('chzn-done');
    processesObj.next().remove();
    processesObj.empty();
    if(processesInPackage  && processesInPackage.length >0){
        $.each(processesInPackage,function(key,value){
            $.each(packageListDashboard[value],function(key1,value1){
                if(prevProcessList && prevProcessList.length >0){
                    var checkFlag = false;
                    $.each(prevProcessList,function(key2,value2){
                        if(filterobjID.find('.paActiveProc').prop('checked')){
                           if(value2==value1.id || value2.split('}')[1].split('-')[0]===String(value1.id).split('}')[1].split('-')[0]){
                                checkFlag=true;
                                processesObj.append('<option value="'+value1.id+'" selected>'+value1.name+'</option>');
                            }
                        }
                        else if(value2==value1.id){
                            checkFlag=true;
                            processesObj.append('<option value="'+value1.id+'" selected>'+value1.name+'</option>');
                        }
                    });
                    if(checkFlag==false)
                        processesObj.append('<option value="'+value1.id+'">'+value1.name+'</option>');
                }
                else
                    processesObj.append('<option value="'+value1.id+'">'+value1.name+'</option>');
            });
        });
        $(processesObj).find('option').each(function() {
            $(this).prevAll('option[value="' + this.value + '"]').remove();
        });
        processesObj.chosen({max_selected_options: 10});
        processesObj.unbind("liszt:maxselected").bind("liszt:maxselected", function (){
            filterobjID.find('.error-Msg').removeClass('hide').text($('#widgetProcessMaxErrorMsg').text());
            return false;
        });
        processesObj.next().css('width',410);
        processesObj.next().find('li.search-field input').css('width',250).css('height',25);
        processesObj.closest('tr').removeClass('hide');
    } else
        processesObj.closest('tr').addClass('hide');
}

/*This function helps to populate the process analytics data*/
function populatePAData(data, widgetId) {
    var widgetObject = getWidgetObject(widgetId);
    var filterObject = widgetObject.filter;
    var dataArray=new Object();
    var chartData = "";
    var yaxisName = "Completion time in"+" "+filterObject.showAnalyticsIn.charAt(0).toUpperCase()+filterObject.showAnalyticsIn.slice(1);
    if(!isObjectEmpty(data.reports) && data.reports.length>0){
        chartData = '{"chart": {"yaxisname":"'+yaxisName+'","showvalues": "1","labeldisplay": "WRAP","canvasBorderThickness":"0","issliced":"0","bgColor":"FFFFFF,FFFFFF","showBorder":"0","canvasBgRatio":"100,0","showlegend": "1","showlabels":"1","paletteColors":"69AA46,FF892A","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9"},';
        var categories = '"categories": [{"category": [';
        var meanData='{"seriesname": "Mean","data": [';
        var medianData = '{"seriesname": "Median","data": [';
        var formula = 60000;
        if(filterObject.showAnalyticsIn=="seconds")
            formula = 1000;    
        else if(filterObject.showAnalyticsIn=="minutes")
            formula = 60000;
        else if(filterObject.showAnalyticsIn=="hours")
            formula = 3600000;
        else if(filterObject.showAnalyticsIn="days")
            formula = 86400000;
        $.each(data.reports,function(idx,value){
            if(value){
                if(dataArray[value.processId]==null){
                    dataArray[value.processId]=new Object();
                    if(value.processId){
                         dataArray[value.processId].NAME = value.processId.split('}')[1]
                    }   
                    dataArray[value.processId].MEAN=(Math.round(value.mean)/formula).toFixed(1);
                    dataArray[value.processId].MEDIAN=(Math.round(value.median)/formula).toFixed(1);
                }
            }
        });
        $.each(dataArray,function(idx,value){
            categories += '{ "label":"'+value.NAME+'"},';
            meanData += '{ "value":"'+value.MEAN+'"},';
            medianData += '{ "value":"'+value.MEDIAN+'"},';
        });
        categories=categories.substring(0, categories.length - 1);
        meanData  =meanData.substring(0, meanData.length - 1);
        medianData=medianData.substring(0, medianData.length - 1);
        categories += ']}],';
        meanData += ']}';
        medianData += ']}';
        chartData += categories+ '"dataset": ['+ meanData +','+medianData+ ']}';
    }
    renderChart_PA(chartData,widgetId);
}

function renderChart_PA(data,widgetId){ 
    var widgetObject = getWidgetObject(widgetId);
    var filterObject = widgetObject.filter;
    var chartType_PA;
    if (filterObject.chartType)
        chartType_PA = filterObject.chartType;
    else
        chartType_PA = defaults.swf1;
    FusionCharts.setCurrentRenderer('javascript');
    if(FusionCharts("PA"+widgetId))
        FusionCharts("PA"+widgetId).dispose();
    var procAnalytics = new FusionCharts("widgets/swf/"+chartType_PA,"PA"+widgetId);
    procAnalytics.setJSONData(data);
    data=procAnalytics.getJSONData();
    procAnalytics.setJSONData(data);
    procAnalytics.setTransparent(true);
    procAnalytics.render(defaults.chart18 + widgetId);      
}
    
function changeChartType_PA(widgetId){
    var chartRef = FusionCharts("PA" + widgetId);
    renderChart_PA(chartRef.getJSONData(),widgetId);
}

function PAErrorCall(error){
    showErrorNotification(error);
}

function checkFilterPA(obj){
    var widgetId = $(obj).closest('.modal').find('.applyButton').attr('widgetId');
    clickRefresh($('#'+widgetId).find('.widget-header'),false);
    var widgetObject = getWidgetObject(widgetId);
    if(widgetObject==undefined || widgetObject.filter.process==undefined)
        $(obj).closest('.widget-body').find('.chart').text($('#widgetProcessFilterErrorMsg').text());
    modalHide($(obj).closest('.modal').attr('id'));
}

$('.chartName').parent().prev().text($('#widgetChartName').text());
$('.analyticsPackageList').parent().prev().text($('#widgetPackages').text());
$('.analyticsProcessesList').parent().prev().text($('#widgetProcesses').text());
$('.chartTypes').parent().prev().text($('#widgetChartType').text());
$('.showAnalyticsIn').parent().prev().text($('#widgetAnalyticsIn').text());
$('.applyButton').text($('#widgetFilterApply').text());
$('.paLabelActiveProcess').text($("#widgetActiveProcess").text());
</script>
</head>
<body>
<div id='processAnalytics' class="chart"></div>
<div id="procAnalyticsFilter" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true" onclick='javascript:checkFilterPA(this)'>&times;</button>
                <span class="modal_heading">Process Analytics</span>
            </div>
             <div class="modal-body">
                <table class="table noLines chartFilterTable">
                    <tr><td class="error-Msg text-danger hide" colspan="2"></td></tr>
                    <tr><td></td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
                    <tr class='paActiveProcess'>
                        <td class='paLabelActiveProcess'></td>
                        <td colspan="3">
                        <label class="inline">
                        <input onchange='updatePAPackages(this)' type="checkbox" class="paActiveProc ace ace-switch ace-switch-5">
                            <span class="lbl"></span>
                        </label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colspan="3"><select multiple class="analyticsPackageList" id='analyticsPackageList' onchange="fetchFilterProcessesPA(this);" data-placeholder="Select Packages"><option value="-1">Select Package</option></select></td>
                    </tr>
                    <tr class="hide">
                        <td></td>
                        <td colspan="3"><select multiple class="analyticsProcessesList" id="analyticsProcessesList" data-placeholder="Select Processes"><option value="-1">Select Process</option></select></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <select class="chartTypes"></select>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <select class="showAnalyticsIn"></select>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyPAFilter(this);return false;"></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
