<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
<script type="text/javascript">
var packageListDashboard = {};
/** AVG in this Script refers to Average Completion Time */
/** @Function Name   : Jquery Ready Function 
 *   @Description     : jquery ready function
 *   @param           :
 *   @returns         :
 * */
$(function () {
    var widgetStateId = $('#average_completion_time').closest('.widget').attr("id");
    var widgetObject = getWidgetObject(widgetStateId);
    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
        var filterObject = {};
        filterObject.chartType = defaults.swf3;
        widgetObject.filter = filterObject;
        persistWidget(widgetObject);
    }
    var divId_AVG = defaults.chart1 + widgetStateId;
    $('#average_completion_time').attr('id', divId_AVG);
    $('#avgChartFilter').attr('id', "avgChartFilter"+widgetStateId);
    /**all possible charts*/
    var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9,defaults.swf13];
    var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D","Column chart 2D", "Pie chart 2D", "Doughnut chart 2D","Bar chart"];
    $('#avgChartFilter'+widgetStateId+' .chartTypes').empty();
    $.each(possibleCharts, function (idx, value) {
        $('#avgChartFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
    });
    $('#avgChartFilter'+widgetStateId+' .chartTypes').chosen();
    $('#avgChartFilter'+widgetStateId+' .chartTypes').next().css('width',170);
    var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessAVGChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
    var refreshIcon = "<a onclick=getAVGCompData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
    if ($("#" + divId_AVG).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
        $("#" + divId_AVG).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
        $("#" + divId_AVG).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
    }
    getAVGCompData($("#" + divId_AVG),widgetStateId);
    $('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
    $('#avgChartFilter'+widgetStateId+' .fromDate').on('change',function() {
		var fromDate = $('#avgChartFilter'+widgetStateId+' .fromDate').val();
		var toDate = $('#avgChartFilter'+widgetStateId+' .toDate').val();
		if(fromDate > toDate)
			$('#avgChartFilter'+widgetStateId+' .toDate').val("");
		$('#avgChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
	});
});

/** @Function Name   : getAVGCompData
 *   @Description     : fetches the data from server
 *   @param           : query fetch / refresh
 *   @returns         :
 * */

function getAVGCompData(obj,widId) {
	clickRefresh(obj,true);
    var widgetStateId;
    var data = {};
    if ($(obj).length != 0){
        widgetStateId = $(obj).closest('.widget').attr("id");
    } else if (widId != null && widId != undefined){
        widgetStateId = widId;
    }
    var widgetObject = getWidgetObject(widgetStateId);
    if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter.process!=undefined && widgetObject.filter != ''){
        var filterObject = widgetObject.filter;
        if (filterObject.fromDate != undefined && filterObject.fromDate != null)
            data.since = filterObject.fromDate
        if (filterObject.toDate != undefined && filterObject.toDate != null)
            data.until = filterObject.toDate
        if (filterObject.process != undefined && filterObject.process != null)
            data.process = filterObject.process
        if(filterObject.activeProcess)
            data.activeOnly = filterObject.activeProcess;
        else
            data.activeOnly = false;
        sendAjaxCall('dashboard/widgets/processAverageCompletionTime', "POST", false, true, "json", data, avgComErrorCall, function(responseData){
            clickRefresh(obj,false);
				if(responseData.error_message == undefined)
					populateAvgCompTimeData(responseData,widgetStateId);
				else
					showErrorNotification(responseData.error_message);
		});
    }else
		filterProcessAVGChart($('#'+widId).find('.filterIcon'));
}

function filterProcessAVGChart(obj){
    var widgetStateId = $(obj).closest('.widget').attr("id");
    var widgetObject = getWidgetObject(widgetStateId);
    var modalObj = $('#avgChartFilter'+widgetStateId);
    addLoading($(modalObj).find('.modal-body'));
    $('#loading').css('margin-top',30);
    $(modalObj).find('.chartFilterTable .error-Msg').addClass('hide');
    modalShow('avgChartFilter'+widgetStateId);
    var data = {}; 
    sendAjaxCall('dashboard/filters/processes', "POST", false, true, "json", data, avgComErrorCall, function(responseData){
        if(responseData.error_message == undefined){
            avgProcessFilter = responseData.process;
            populateAVGFilterData(responseData,widgetStateId);
        }
        else
            showErrorNotification(responseData.error_message);
    });
}

function populateAVGFilterData(data,widgetStateId){
    var widgetObject = getWidgetObject(widgetStateId);
    var modalObj = $('#avgChartFilter'+widgetStateId);
    var chartObj = $(modalObj).find('.chartTypes');
    if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
        var filterObject = widgetObject.filter;
        activeObj = $(modalObj).find('.AVGActiveProc');
        if(filterObject.activeProcess)
            activeObj.prop('checked',filterObject.activeProcess);
        else
            activeObj.prop('checked',false);
        updateAVGPackages(activeObj);
        if (filterObject.fromDate != undefined && filterObject.fromDate != null){
            $(modalObj).find('.fromDate').val(filterObject.fromDate);
            $('#avgChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
		}
        else 
            $(modalObj).find('.fromDate').val('');
        if (filterObject.toDate != undefined && filterObject.toDate != null)
            $(modalObj).find('.toDate').val(filterObject.toDate);
        else 
            $(modalObj).find('.toDate').val('');
        if (filterObject.chartType != undefined && filterObject.chartType != null){
            chartObj.next().remove();
            chartObj.removeAttr('style').removeClass('chzn-done');
            chartObj.val(filterObject.chartType);
            chartObj.chosen();
            chartObj.next().css('width',170);
        }
    } 
    if(widgetObject != null) {
        if (widgetObject.title != undefined && widgetObject.title != null)
            $(modalObj).find('.chartName').val(widgetObject.title);
    }
    removeLoading($(modalObj).find('.modal-body'));
    $(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
}

function updateAVGPackages(obj){
    var prevPackage,changedPackage=[];
    var widgetStateId = $(obj).closest('.widget').attr("id");
    var modalObj = $('#avgChartFilter'+widgetStateId);
    avgPackageObj = $(modalObj).find('.AVGPackageList');
    avgProcessObj = $(modalObj).find('.AVGProcessesList');
    
    avgPackageObj.removeAttr('style').removeClass('chzn-done');
    avgProcessObj.removeAttr('style').removeClass('chzn-done');
    avgProcessObj.next().remove();
    avgPackageObj.next().remove();
    
    avgProcessObj.closest('tr').addClass('hide');
    avgPackageObj.empty();
    packageListDashboard = {};
    var widgetObject = getWidgetObject(widgetStateId);
    var filterObject = widgetObject.filter;
    $.each(avgProcessFilter,function(key,value){
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
                                avgPackageObj.append('<option value="'+value.id+'" selected=selected>'+value.name+' ['+value.version+']</option>');
                            }
                        }else if(value1 == value.id){
                                addCheck = true;
                                changedPackage.push(value.id);
                                avgPackageObj.append('<option value="'+value.id+'" selected=selected>'+value.name+' ['+value.version+']</option>');
                        }
                    });
                }
                if(!addCheck)
                    avgPackageObj.append('<option value="'+value.id+'">'+value.name+' ['+value.version+']</option>')        
            }
        }
       else if(($(obj).prop('checked') && value.status==="ACTIVE") || !$(obj).prop('checked'))
            packageListDashboard[prevPackage].push({name:value.name,id:value.id});
        $(avgPackageObj).find('option').each(function() {
            $(this).prevAll('option[value="' + this.value + '"]').remove();
        });
    });
    avgPackageObj.attr('widgetId',widgetStateId);
    avgPackageObj.chosen();
    avgPackageObj.next().css('width',410);
    avgPackageObj.next().find('li.search-field input').css('width',250);
    avgPackageObj.next().find('li.search-field input').css('height',25);
    if(filterObject.package)        
        fetchFilterProcessesAVG('',changedPackage,widgetStateId);
}

function applyAVGFilter(obj){
    var widgetStateId = $(obj).attr("widgetId");
    var widgetObject = getWidgetObject(widgetStateId);
    var filterObject = {};
    var modalObj = $(obj).closest('.modal');
    var data = {}
    var oldObject = JSON.parse( JSON.stringify( widgetObject.filter));
		delete oldObject.chartType;
    var checkModalName = true;
    var checkProcess = true;

	if($(modalObj).find('.chartName').val()==""){
		$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetChartNameErrorMsg').text());
		$(modalObj).find('.chartName').focus();
		return false;
	}
	else if($(modalObj).find('.AVGPackageList').val()==null){
		$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetPackageErrorMsg').text());
		return false;
	}
	else if($(modalObj).find('.AVGProcessesList').val()==null){
		$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetProcessErrorMsg').text());
		return false;
	}
    
	if ($(modalObj).find('.fromDate').val() != undefined && $(modalObj).find('.fromDate').val() != ''){
        data.since = $(modalObj).find('.fromDate').val();
        filterObject.fromDate = $(modalObj).find('.fromDate').val();
    } else 
        delete data.since;
    if ($(modalObj).find('.toDate').val() != undefined  && $(modalObj).find('.toDate').val() != ''){
        data.until = $(modalObj).find('.toDate').val();
        filterObject.toDate = $(modalObj).find('.toDate').val();
    } else 
        delete data.until;
    if ($(modalObj).find('.chartTypes').val() != undefined && $(modalObj).find('.chartTypes').val() != null ){
        filterObject.chartType = $(modalObj).find('.chartTypes').val();
    }
    if ($(modalObj).find('.chartName').val() != undefined && $(modalObj).find('.chartName').val() != null && $.trim($(modalObj).find('.chartName').val()) != ''){
            widgetObject.title = $(modalObj).find('.chartName').val();
            $('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val()); 
    } else {
        checkModalName = false;
    }
    if ($(modalObj).find('.AVGPackageList').val() != undefined  && $(modalObj).find('.AVGPackageList').val() != ''){
        filterObject.package = $(modalObj).find('.AVGPackageList').val();
        //data.role = $(modalObj).find('.AVGPackageList').val();
        if ($(modalObj).find('.AVGProcessesList').val() != undefined  && $(modalObj).find('.AVGProcessesList').val() != ''){
            filterObject.process = $(modalObj).find('.AVGProcessesList').val();
            data.process = $(modalObj).find('.AVGProcessesList').val();
        } else {
            checkProcess = false;
            $(modalObj).find('.error-Msg td').text($('#widgetProcessErrorMsg').text());
        }
    }
    var activeOnly = $(modalObj).find('.AVGActiveProc').prop('checked');
    data.activeOnly = activeOnly;
    filterObject.activeProcess = activeOnly;
    widgetObject.filter = filterObject;
    persistWidget(widgetObject);
    var newObject = JSON.parse( JSON.stringify( filterObject ) )
	delete newObject.chartType;
	if (compareObjects(newObject,oldObject)){
		$('#avgChartFilter'+widgetStateId).modal('hide');
		changeChartTypeAVG(widgetStateId);
	}
	else{
		if (checkModalName){
			if (checkProcess){
				$('#avgChartFilter'+widgetStateId).modal('hide');
				clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/processAverageCompletionTime', "POST", false, true, "json", data, avgComErrorCall, function(data1){ 
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined)
						populateAvgCompTimeData(data1,widgetStateId) ;
					else
						showErrorNotification(responseData.error_message);
				});
			} else {
				$(modalObj).find('.error-Msg').removeClass('hide');
			}
		} else{
			$(modalObj).find('.error-Msg td').text($('#widgetChartNameErrorMsg').text());
			$(modalObj).find('.error-Msg').removeClass('hide');
		}
	}
}

function changeChartTypeAVG(widgetId){
	var chartRef = FusionCharts("AvgCompletionTime" + widgetId);
	renderChart_AVG(chartRef.getJSONData(),widgetId)
}

function checkFilterAVG(obj){
	var widgetId = $(obj).closest('.modal').find('.applyButton').attr('widgetId');
	var widgetObject = getWidgetObject(widgetId);
    clickRefresh($('#'+widgetId).find('.widget-header'),false);
	if(widgetObject==undefined || widgetObject.filter.process==undefined)
		$(obj).closest('.widget-body').find('.chart').text($('#widgetProcessFilterErrorMsg').text());
	modalHide($(obj).closest('.modal').attr('id'));
}

function fetchFilterProcessesAVG(obj,pkgList,widgetId){
    var processesInPackege,widgetStateId,avgProcObj;
    if ($(obj).length !=0 ){
        widgetStateId = $(obj).attr('widgetId');
        processesInPackege = $(obj).val();
    } else {
        widgetStateId = widgetId;
        processesInPackege = pkgList;
    }
    var widgetObject = getWidgetObject(widgetStateId);
    var modalObj = $('#avgChartFilter'+widgetStateId);
    avgProcObj = $(modalObj).find('.AVGProcessesList');
    var prevProcessList = avgProcObj.val();
    if($(obj).length == 0){
        if (widgetObject && widgetObject.filter){
            var filterObject = widgetObject.filter;
            if (filterObject.process)
                prevProcessList = filterObject.process;
        }
    }
    $(modalObj).find('.error-Msg').addClass('hide');
    avgProcObj.removeAttr('style').removeClass('chzn-done');
    avgProcObj.next().remove();
    avgProcObj.empty();

    if(processesInPackege && processesInPackege.length >0){
        $.each(processesInPackege,function(key,value){
            $.each(packageListDashboard[value],function(key1,value1){
                if(prevProcessList && prevProcessList.length >0){
                    var checkFlag = false;
                    $.each(prevProcessList,function(key2,value2){
                        if($(modalObj).find('.AVGActiveProc').prop('checked')){
                           if(value2==value1.id || value2.split('}')[1].split('-')[0]===String(value1.id).split('}')[1].split('-')[0]){
                                checkFlag=true;
                                avgProcObj.append('<option value="'+value1.id+'" selected>'+value1.name+'</option>');
                            }
                        }
                        else if(value2==value1.id){
                            checkFlag=true;
                            avgProcObj.append('<option value="'+value1.id+'" selected>'+value1.name+'</option>');
                        }
                    });
                    if(checkFlag==false)
                        avgProcObj.append('<option value="'+value1.id+'">'+value1.name+'</option>');
                }
                else
                    avgProcObj.append('<option value="'+value1.id+'">'+value1.name+'</option>');
            });
        });
        $(avgProcObj).find('option').each(function() {
            $(this).prevAll('option[value="' + this.value + '"]').remove();
        });
        avgProcObj.chosen({max_selected_options: 10});
		avgProcObj.unbind("liszt:maxselected").bind("liszt:maxselected", function (){
			$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetProcessMaxErrorMsg').text());
			return false;
		});
        avgProcObj.next().css('width',410);
        avgProcObj.next().find('li.search-field input').css('width',250).css('height',25);
        avgProcObj.closest('tr').removeClass('hide');
    } else 
        avgProcObj.closest('tr').addClass('hide');
}

function removeErrorMsgAVG(obj){
    $(obj).closest('table').find('error-Msg').addClass('hide');
}

function avgComErrorCall(e){
	if(e.responseText!=null && e.responseText!=undefined)
			showInformation(e.responseText);
	else
		showInformation($("#widgetAjaxErrorMsg").text());
	return false;
}

/**
 * @Function Name : populateAvgCompTimeData
 * @Description   : creates a chart data for popluating it in to chart
 * @param         : Json object,query fetch / refresh
 * @returns       : chartData
 * */

function populateAvgCompTimeData(data, widgetId) {
    var chartData = '{"chart":{"formatnumberscale": "0","bgColor":"FFFFFF,FFFFFF","showBorder":"0","yAxisName":"Seconds", "useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9"},'
    var dataSet = '"data": [';
    var count = 0;
	if(!isObjectEmpty(data.average_completion_time))
	{
        $.each(data.average_completion_time, function (key, value) {
            var seconds = (parseInt(value) / 1000);
            key = key.substr(parseInt(key.indexOf("}") + 1), parseInt(key.indexOf(")")));
            key = key.replace('-', ' - ').replace(')','');
            dataSet += '{"value" : "' + parseInt(seconds) + '"' + "," + '"label" : "' + key + '"},';
        });
    }
    dataSet = dataSet.substr(0, dataSet.length - 1);
    chartData = chartData + "" + dataSet + "]}";
    renderChart_AVG(chartData,widgetId);
}

/** @Function Name   : renderChart_AVG
 *   @Description     : renders the actual chart
 *   @param           : chart type,data to render
 *   @returns         : chart
 * */

function renderChart_AVG(data,widgetId){
    var widgetObject = getWidgetObject(widgetId);
    var filterObject = widgetObject.filter;
    var chartType_AVG;
    if (filterObject.chartType != undefined && filterObject.chartType != null)
        chartType_AVG = filterObject.chartType;
    else
		chartType_AVG = defaults.swf3;

    FusionCharts.setCurrentRenderer('javascript');
    if (FusionCharts("AvgCompletionTime" + widgetId) != undefined && FusionCharts("AvgCompletionTime" + widgetId) != null)
        FusionCharts("AvgCompletionTime" + widgetId).dispose();
    var AvgComplTime = new FusionCharts("widgets/swf/" + chartType_AVG, "AvgCompletionTime" + widgetId);
    AvgComplTime.setJSONData(data);
    data = AvgComplTime.getJSONData();
	if(!isObjectEmpty(data)) 
	{
    if (chartType_AVG.indexOf("Pie") != -1 || chartType_AVG.indexOf("Doughnut") != -1) {
        data.chart.showlabels = 0;
        data.chart.showlegend = 1;
        data.chart.showvalues = 0;
    } else {
        data.chart.showlabels = 1;
        data.chart.showvalues = 1;
        data.chart.showlegend = 0;
    }
    if (chartType_AVG.indexOf("2D") >= 0) {
        if (data.chart.pieradius == null) {
            data.chart.pieRadius = 80;
        }
    } else {
        delete data.chart.pieradius;
    }
	}
    AvgComplTime.setJSONData(data);
    AvgComplTime.setTransparent(true);
    AvgComplTime.render(defaults.chart1 + widgetId);
}

$('.chartName').parent().prev().text($('#widgetChartName').text());
$('.AVGPackageList').parent().prev().text($('#widgetPackages').text());
$('.AVGProcessesList').parent().prev().text($('#widgetProcesses').text());
$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
$('.toDate').closest('td').prev().text($('#widgetToDate').text());
$('.chartTypes').parent().prev().text($('#widgetChartType').text());
$('.groupBy').parent().prev().text($('#widgetFilterGroupBy').text());
$('.applyButton').text($('#widgetFilterApply').text());
$('.avgLabelActiveProcess').text($("#widgetActiveProcess").text());
</script>
</head>
<div id='average_completion_time' class="chart"></div>
<div id="avgChartFilter" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true" onclick='javascript:checkFilterAVG(this);'>&times;</button>
                <span class="modal_heading">Average Instance Completion Time</span>
            </div>
             <div class="modal-body">
                <table class="table noLines chartFilterTable">
                    <tr><td class="error-Msg text-danger hide" colspan="2"></td></tr>
                    <tr><td></td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
                    <tr class='avgActiveProcess'>
                        <td class='avgLabelActiveProcess'></td>
                        <td colspan="3">
                        <label class="inline">
                        <input onchange='updateAVGPackages(this)' type="checkbox" class="AVGActiveProc ace ace-switch ace-switch-5">
                            <span class="lbl"></span>
                        </label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colspan="3"><select multiple class="AVGPackageList" onchange="fetchFilterProcessesAVG(this);" data-placeholder="Select Packages"><option value="-1">Select Package</option></select></td>
                    </tr>
                    <tr class="hide">
                        <td></td>
                        <td colspan="3"><select multiple class="AVGProcessesList" data-placeholder="Select Processes" onchange="removeErrorMsgAVG(this);"><option value="-1">Select Process</option></select></td>
                    </tr>
                    
                    <tr>
                        <td></td>
                        <td>
                           <div class="input-group pull-left">
                              <input type="text" class="chartFilterDates fromDate pull-left" data-date-format="yyyy-mm-dd">
                              <span class="input-group-addon">
                                 <i class="fa fa-calendar bigger-110"></i>
                              </span>
                           </div>
                        </td>
                        <td></td>
                        <td>
                           <div class="input-group pull-left">
                              <input type="text" class="chartFilterDates toDate pull-left" data-date-format="yyyy-mm-dd">
                              <span class="input-group-addon">
                                 <i class="fa fa-calendar bigger-110"></i>
                              </span>
                           </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><select class="chartTypes"></select></td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyAVGFilter(this);return false;"></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
