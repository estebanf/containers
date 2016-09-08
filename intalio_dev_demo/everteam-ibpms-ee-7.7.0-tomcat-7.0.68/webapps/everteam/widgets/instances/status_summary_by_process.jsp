<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
<script type="text/javascript">
/** SSBP in this script refers to Status Summary By Process */
/** @Function Name   : Jquery Ready Function 
*   @Description     : jquery ready function
*   @param           :
*   @returns         :
* */

$(function() {
	var widgetStateId = $('#status_summary_by_process').closest('.widget').attr("id");
    var widgetObject = getWidgetObject(widgetStateId);
    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
    	var filterObject = {};
    	filterObject.chartType = defaults.swf10;
    	widgetObject.filter = filterObject;
    	persistWidget(widgetObject);
    }
    var divId_SSBP = defaults.chart4 + widgetStateId;
	$('#status_summary_by_process').attr('id', divId_SSBP);
	$('#instancesStatusFilter').attr('id', "instancesStatusFilter"+widgetStateId);
	/**all possible charts*/
	var possibleCharts=[defaults.swf1,defaults.swf2,defaults.swf10,defaults.swf11,defaults.swf14];
	var possibleChartsNames=["MSColumn 3D","Stacked Column 3D","MSColumn 2D","Stacked Column 2D","MSBar"];
	$('#instancesStatusFilter'+widgetStateId+' .chartTypes').empty();
    $.each(possibleCharts, function (idx, value) {
        $('#instancesStatusFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
    });
    $('#instancesStatusFilter'+widgetStateId+' .chartTypes').chosen();
    $('#instancesStatusFilter'+widgetStateId+' .chartTypes').next().css('width',170);
	var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='instanceStatusFilter(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>"
	var refreshIcon = "<a onclick=getSSBPData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
	if($("#"+divId_SSBP).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0)
	{
		$("#"+divId_SSBP).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
		$("#" + divId_SSBP).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
	}
	getSSBPData($("#"+divId_SSBP),widgetStateId);
	$('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
	$('#instancesStatusFilter'+widgetStateId+' .fromDate').on('change',function() {
			var fromDate = $('#instancesStatusFilter'+widgetStateId+' .fromDate').val();
			var toDate = $('#instancesStatusFilter'+widgetStateId+' .toDate').val();
			if(fromDate > toDate)
				$('#instancesStatusFilter'+widgetStateId+' .toDate').val("");
			$('#instancesStatusFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
	});
});

/** @Function Name   : getSSBPData
*   @Description     : fetches the data from server
*   @param           : query fetch / refresh
*   @returns         :
* */
function getSSBPData(obj,widId)
{
	clickRefresh(obj,true);
	var widgetStateId;
	var data = {};
	if ($(obj).length != 0 ){
		widgetStateId = $(obj).closest('.widget').attr("id");
	} else if (widId != null && widId != undefined){
		widgetStateId = widId;
	}
	var widgetObject = getWidgetObject(widgetStateId);
	if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != '' && widgetObject.filter.process != undefined){
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
		sendAjaxCall('dashboard/widgets/processInstanceStatusSummary', "POST", false, true, "json", data, SSBPErrorCall, function(responseData){
			clickRefresh(obj,false);
			if(responseData.error_message == undefined)
				populateProcessInstanceStatusCnt(responseData,widgetStateId) ;
			else
				showErrorNotification(responseData.error_message);
		});
	}
	else
		instanceStatusFilter($('#'+widId).find('.filterIcon'));
}
function instanceStatusFilter(obj){
	var widgetStateId = $(obj).closest('.widget').attr("id");
	var widgetObject = getWidgetObject(widgetStateId);
	var modalObj = $('#instancesStatusFilter'+widgetStateId);
	addLoading($(modalObj).find('.modal-body'));
	$('#loading').css('margin-top',30);
	$(modalObj).find('.chartFilterTable .error-Msg').addClass('hide');
	modalShow('instancesStatusFilter'+widgetStateId);
	var data = {}; 
	sendAjaxCall('dashboard/filters/processes', "POST", false, true, "json", data, SSBPErrorCall, function(responseData){
		if(responseData.error_message == undefined){
				iscProcessFilter = responseData.process;
				populateInstancesStatusFilterData(responseData,widgetStateId);
			}
		else
			showErrorNotification(responseData.error_message);
	});
}
var packageListDashboard = {}; //global
function populateInstancesStatusFilterData(data,widgetStateId){
	var prevPackage;
	var widgetObject = getWidgetObject(widgetStateId);
	var modalObj = $('#instancesStatusFilter'+widgetStateId);
	if (widgetObject && widgetObject.filter){
		var filterObject = widgetObject.filter;
		activeObj = $(modalObj).find('.iscActiveProc');
        if(filterObject.activeProcess)
            activeObj.prop('checked',filterObject.activeProcess);
        else
            activeObj.prop('checked',false);
        updateISCPackages(activeObj);
		if (filterObject.fromDate){
			$(modalObj).find('.fromDate').val(filterObject.fromDate);
			$('#instancesStatusFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
		}
		else 
			$(modalObj).find('.fromDate').val('');
		if (filterObject.toDate)
			$(modalObj).find('.toDate').val(filterObject.toDate);
		else 
			$(modalObj).find('.toDate').val('');
		if (filterObject.chartType){
			$(modalObj).find('.chartTypes').next().remove();
			$(modalObj).find('.chartTypes').removeAttr('style').removeClass('chzn-done');
			$(modalObj).find('.chartTypes').val(filterObject.chartType);
			$(modalObj).find('.chartTypes').chosen();
			$(modalObj).find('.chartTypes').next().css('width',170);
		}
	}
	if(widgetObject != null) {
		if (widgetObject.title != undefined && widgetObject.title != null)
			$(modalObj).find('.chartName').val(widgetObject.title);
	}

	$(modalObj).find('.ISCPackageList').attr('widgetId',widgetStateId);
	$(modalObj).find('.ISCPackageList').chosen();
	$(modalObj).find('.ISCPackageList').next().css('width',410);
	$(modalObj).find('.ISCPackageList').next().find('li.search-field input').css('width',250).css('height',25);
	removeLoading($(modalObj).find('.modal-body'));
	$(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);

}

function updateISCPackages(obj){
    var prevPackage,changedPackage=[];
    var widgetStateId = $(obj).closest('.widget').attr("id");
    var modalObj = $('#instancesStatusFilter'+widgetStateId);
    iscPackageObj = $(modalObj).find('.ISCPackageList');
    iscProcessObj = $(modalObj).find('.ISCProcessesList');
    
    iscPackageObj.removeAttr('style').removeClass('chzn-done');
    iscProcessObj.removeAttr('style').removeClass('chzn-done');
    iscProcessObj.next().remove();
    iscPackageObj.next().remove();
    
    iscProcessObj.closest('tr').addClass('hide');
    iscPackageObj.empty();
    packageListDashboard = {};
    var widgetObject = getWidgetObject(widgetStateId);
    var filterObject = widgetObject.filter;
    $.each(iscProcessFilter,function(key,value){
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
                                iscPackageObj.append('<option value="'+value.id+'" selected=selected>'+value.name+' ['+value.version+']</option>');
                            }
                        }else if(value1 == value.id){
                                addCheck = true;
                                changedPackage.push(value.id);
                                iscPackageObj.append('<option value="'+value.id+'" selected=selected>'+value.name+' ['+value.version+']</option>');
                        }
                    });
                }
                if(!addCheck)
                    iscPackageObj.append('<option value="'+value.id+'">'+value.name+' ['+value.version+']</option>')        
            }
        }
       else if(($(obj).prop('checked') && value.status==="ACTIVE") || !$(obj).prop('checked'))
            packageListDashboard[prevPackage].push({name:value.name,id:value.id});
        $(iscPackageObj).find('option').each(function() {
            $(this).prevAll('option[value="' + this.value + '"]').remove();
        });
    });
    iscPackageObj.attr('widgetId',widgetStateId);
    iscPackageObj.chosen();
    iscPackageObj.next().css('width',410);
    iscPackageObj.next().find('li.search-field input').css('width',250);
    iscPackageObj.next().find('li.search-field input').css('height',25);
    if(filterObject.package)        
        fetchFilterProcessesISP('',changedPackage,widgetStateId);
}

function applyInstancesStatusFilter(obj){
	var widgetStateId = $(obj).attr("widgetId");
	var widgetObject = getWidgetObject(widgetStateId);
	var filterObject = {};
	var modalObj = $(obj).closest('.modal');
	var data = {}
	var oldObject = JSON.parse( JSON.stringify( widgetObject.filter));
	delete oldObject.chartType;
	if($(modalObj).find('.chartName').val()=="")
	{
		$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetChartNameErrorMsg').text());
		$(modalObj).find('.chartName').focus();
		return false;
	}
	else if($(modalObj).find('.ISCPackageList').val()==null)
	{
		$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetPackageErrorMsg').text());
		return false;
	}
	else if($(modalObj).find('.ISCProcessesList').val()==null)
	{
		$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetProcessErrorMsg').text());
		return false;
	}
	if ($(modalObj).find('.fromDate').val() != ''){
		data.since = $(modalObj).find('.fromDate').val();
		filterObject.fromDate = $(modalObj).find('.fromDate').val(); 
	}
	else 
		delete data.since;
	if ($(modalObj).find('.toDate').val() != ''){
		data.until = $(modalObj).find('.toDate').val();
		filterObject.toDate = $(modalObj).find('.toDate').val();
	}
	else 
		delete data.until;
	if ($(modalObj).find('.chartTypes').val() != undefined && $(modalObj).find('.chartTypes').val() != null )
		filterObject.chartType = $(modalObj).find('.chartTypes').val();
	
	if ($(modalObj).find('.ISCPackageList').val() != undefined  && $(modalObj).find('.ISCPackageList').val() != '')
		filterObject.package = $(modalObj).find('.ISCPackageList').val();
	if ($(modalObj).find('.ISCProcessesList').val() != undefined  && $(modalObj).find('.ISCProcessesList').val() != ''){
		filterObject.process = $(modalObj).find('.ISCProcessesList').val();
		data.process = $(modalObj).find('.ISCProcessesList').val();
	}
	var activeOnly = $(modalObj).find('.iscActiveProc').prop('checked');
    data.activeOnly = activeOnly;
    filterObject.activeProcess = activeOnly;

	widgetObject.title = $(modalObj).find('.chartName').val();
	$('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val()); 
	widgetObject.filter = filterObject;
	persistWidget(widgetObject);
	$('#instancesStatusFilter'+widgetStateId).modal('hide');
	var newObject = JSON.parse( JSON.stringify( filterObject ) )
	delete newObject.chartType;
	if (compareObjects(newObject,oldObject))
		changeChartTypeSSBP(widgetStateId);
	else{
		clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
		sendAjaxCall('dashboard/widgets/processInstanceStatusSummary', "POST", false, true, "json", data, SSBPErrorCall, function(responseData){ 
			clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
			if(responseData.error_message == undefined)
				populateProcessInstanceStatusCnt(responseData,widgetStateId);
			else
				showErrorNotification(responseData.error_message);
		});
	}
}

function fetchFilterProcessesISP(obj,pkgList,widgetId){
	var processesInPackege,widgetStateId,iscProcObj;
	if ($(obj).length !=0 ){
		widgetStateId = $(obj).attr('widgetId');
		processesInPackege = $(obj).val();
	} else {
		widgetStateId = widgetId;
		processesInPackege = pkgList;
	}
	var widgetObject = getWidgetObject(widgetStateId);
	var modalObj = $('#instancesStatusFilter'+widgetStateId);
	iscProcObj = $(modalObj).find('.ISCProcessesList');
	var prevProcessList = iscProcObj.val();
	if($(obj).length == 0){
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
			var filterObject = widgetObject.filter;
			if (filterObject.process != undefined && filterObject.process != null){
				prevProcessList = filterObject.process;
			}
		}
	}
	$(modalObj).find('.error-Msg').addClass('hide');
	iscProcObj.removeAttr('style').removeClass('chzn-done');
	iscProcObj.next().remove();
	iscProcObj.empty();

	if(processesInPackege && processesInPackege.length >0){
		$.each(processesInPackege,function(key,value){
			$.each(packageListDashboard[value],function(key1,value1){
				if(prevProcessList && prevProcessList.length >0){
                    var checkFlag = false;
                    $.each(prevProcessList,function(key2,value2){
                        if($(modalObj).find('.iscActiveProc').prop('checked')){
                           if(value2==value1.id || value2.split('}')[1].split('-')[0]===String(value1.id).split('}')[1].split('-')[0]){
                                checkFlag=true;
                                iscProcObj.append('<option value="'+value1.id+'" selected>'+value1.name+'</option>');
                            }
                        }
                        else if(value2==value1.id){
                            checkFlag=true;
                            iscProcObj.append('<option value="'+value1.id+'" selected>'+value1.name+'</option>');
                        }
                    });
                    if(checkFlag==false)
                        iscProcObj.append('<option value="'+value1.id+'">'+value1.name+'</option>');
                }
                else
                    iscProcObj.append('<option value="'+value1.id+'">'+value1.name+'</option>');
            });
		});
   		$(iscProcObj).find('option').each(function() {
            $(this).prevAll('option[value="' + this.value + '"]').remove();
        });
		iscProcObj.chosen({max_selected_options: 10});
		iscProcObj.unbind("liszt:maxselected").bind("liszt:maxselected", function (){
			$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetProcessMaxErrorMsg').text());
			return false;
		});
		iscProcObj.next().css('width',410);
		iscProcObj.next().find('li.search-field input').css('width',250).css('height',25);
		iscProcObj.closest('tr').removeClass('hide');
	} else 
		iscProcObj.closest('tr').addClass('hide');
}

function removeErrorMsgISP(obj){
	$(obj).closest('table').find('.error-Msg').addClass('hide');
}

function SSBPErrorCall(e)
{
	if(e.responseText!=null && e.responseText!=undefined)
		showInformation(e.responseText);
	else
		showInformation($("#widgetAjaxErrorMsg").text());
	return false;
}

/**
 * @Function Name : populateProcessInstanceStatusCnt
 * @Description   : creates a chart data for popluating it in to chart
 * @param         : Json object,query fetch / refresh
 * @returns       : chartData
 * */
function populateProcessInstanceStatusCnt(data, widgetId) 
{
	var chartData = "";
	if (!isObjectEmpty(data.process_instance_status_summary)) 
	{
		chartData 	= '{"chart": {"formatnumberscale": "0","bgColor":"FFFFFF,FFFFFF","showBorder":"0","showvalues": "1","legendposition" : "BOTTOM","paletteColors":"69AA46,B94A48,FFB752,A069C3","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9"},'
		var categories 	= '"categories": [{"category": [';
		var dataSet 	= '"dataset": [';
		var inprogress  = '"seriesname": "In Progress","data": [';
		var failed  	= '"seriesname": "Failed","data": [';
		var suspended   = '"seriesname": "Suspended","data": [';
		var terminated  = '"seriesname": "Terminated","data": [';
		
		$.each(data.process_instance_status_summary,function(key,value) {
			categories +=  '{"label": "'+key+'"},';
			inprogress += '{"value": "'+parseInt(value.inProgressCount)+'"},';
			failed += '{"value": "'+parseInt(value.failedCount)+'"},';
			suspended += '{"value": "'+parseInt(value.suspendedCount)+'"},';
			terminated += '{"value": "'+parseInt(value.terminatedCount)+'"},';
		});
		categories = categories.slice(0,parseInt(categories.length-1));
		categories += ']}],';
		inprogress = inprogress.slice(0,parseInt(inprogress.length-1));
		inprogress += ']';
		failed = failed.slice(0,parseInt(failed.length-1));
		failed += ']';
		suspended = suspended.slice(0,parseInt(suspended.length-1));
		suspended += ']';
		terminated = terminated.slice(0,parseInt(terminated.length-1));
		terminated += ']';
		dataSet = dataSet + "{" + inprogress + "},{"+failed+"},{"+suspended+"},{"+terminated+"}]"; //dataset completed
		chartData = chartData + "" + categories + "" +dataSet + "}";
	}
	renderChart_SSBP(chartData,widgetId);
};

/** @Function Name   : renderChart_SSBP
*   @Description     : renders the actual chart
*   @param           : chart type,data to render
*   @returns         : chart
* */
function renderChart_SSBP(data,widgetId)
{
	var widgetObject = getWidgetObject(widgetId);
    var filterObject = widgetObject.filter;
    var chartType_SSBP;
    if (filterObject.chartType != undefined && filterObject.chartType != null)
    	chartType_SSBP = filterObject.chartType;
    else 
    	chartType_SSBP = defaults.swf10;
	FusionCharts.setCurrentRenderer('javascript');
	if(FusionCharts("ProcessInstance"+widgetId)!=undefined && FusionCharts("ProcessInstance"+widgetId)!=null)
			FusionCharts("ProcessInstance"+widgetId).dispose();
		var ProcessInstanceChart = new FusionCharts("swf/FusionCharts/"+chartType_SSBP,"ProcessInstance"+widgetId);
		ProcessInstanceChart.setJSONData(data);
		ProcessInstanceChart.setTransparent(true);
		ProcessInstanceChart.render(defaults.chart4 + widgetId);
}

function checkFilterSSBP(obj)
{
	if($(obj).closest('.modal-content').find('.ISCProcessesList>option:selected').length<=0)
		$(obj).closest('.widget-body').find('.chart').text($('#widgetProcessFilterErrorMsg').text());
	modalHide($(obj).closest('.modal').attr('id'));
}
function changeChartTypeSSBP(widgetId){
	var chartRef = FusionCharts("ProcessInstance" + widgetId);
	renderChart_SSBP(chartRef.getJSONData(),widgetId)
}
$('.chartName').parent().prev().text($('#widgetChartName').text());
$('.ISCPackageList').parent().prev().text($('#widgetPackages').text());
$('.ISCProcessesList').parent().prev().text($('#widgetProcesses').text());
$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
$('.toDate').closest('td').prev().text($('#widgetToDate').text());
$('.chartTypes').parent().prev().text($('#widgetChartType').text());
$('.applyButton').text($('#widgetFilterApply').text());
$('.iscLabelActiveProcess').text($("#widgetActiveProcess").text());
</script>
</head>
<div id='status_summary_by_process' class="chart"></div>
<div id="instancesStatusFilter" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" aria-hidden="true" onclick='javascript:checkFilterSSBP(this);'>&times;</button>
                <span class="modal_heading">Status Summary by Process</span>
            </div>
            <div class="modal-body">
                <table class="table noLines chartFilterTable">
                	<tr><td class="error-Msg text-danger hide" colspan="2"></td></tr>
					<tr><td></td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
					<tr class='iscActiveProcess'>
                        <td class='iscLabelActiveProcess'></td>
                        <td colspan="3">
                        <label class="inline">
                        <input onchange='updateISCPackages(this)' type="checkbox" class="iscActiveProc ace ace-switch ace-switch-5">
                            <span class="lbl"></span>
                        </label>
                        </td>
                    </tr>
					<tr>
                        <td></td>
                        <td colspan="3"><select multiple class="ISCPackageList" onchange="fetchFilterProcessesISP(this);" data-placeholder="Select Packages">/select></td>
                    </tr>
                    <tr class="hide">
                        <td></td>
                        <td colspan="3"><select multiple class="ISCProcessesList" data-placeholder="Select Processes" onchange="removeErrorMsgISP(this);"></select></td>
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
                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyInstancesStatusFilter(this);return false;"></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
