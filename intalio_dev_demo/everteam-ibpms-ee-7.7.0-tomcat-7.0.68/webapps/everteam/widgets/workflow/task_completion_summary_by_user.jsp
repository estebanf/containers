<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
<script type="text/javascript">
	
	/** @Function Name    : Jquery Ready Function 
	*   @Description      : jquery ready function
	*   @param            :
	*   @returns         :
	**/
	$(function () {
		$('.limitValue').chosen();
		$('.limitValue').next().css('width',170);
		var widgetStateId = $('#task_completion_summary_by_user').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf3;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_TCSBU = defaults.chart9 + widgetStateId;
		$('#task_completion_summary_by_user').attr('id', divId_TCSBU);
		$('#TCSBUChartFilter').attr('id', "TCSBUChartFilter"+widgetStateId);
		/**all possible charts*/
		var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9,defaults.swf13];
		var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D", "Column chart 2D", "Pie chart 2D", "Doughnut chart 2D","Bar chart"];
		$('#TCSBUChartFilter'+widgetStateId+' .chartTypes').empty();
	    $.each(possibleCharts, function (idx, value) {
	        $('#TCSBUChartFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
	    });
	    $('#TCSBUChartFilter'+widgetStateId+' .chartTypes').chosen();
	    $('#TCSBUChartFilter'+widgetStateId+' .chartTypes').next().css('width',170);
		var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessTCSBUChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
		var refreshIcon = "<a onclick=getTCSBUChartData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
		if ($("#" + divId_TCSBU).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
			$("#" + divId_TCSBU).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
			$("#" + divId_TCSBU).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
		}
		getTCSBUChartData($("#" + divId_TCSBU),widgetStateId);
		$('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
		$('#TCSBUChartFilter'+widgetStateId+' .fromDate').on('change',function() {
			var fromDate = $('#TCSBUChartFilter'+widgetStateId+' .fromDate').val();
			var toDate = $('#TCSBUChartFilter'+widgetStateId+' .toDate').val();
			if(fromDate > toDate)
				$('#TCSBUChartFilter'+widgetStateId+' .toDate').val("");
			$('#TCSBUChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
		});
	});

	/** @Function Name   : getTCSBUChartData
	*   @Description     : fetches the data from server
	*   @param           : query fetch / refresh
	*   @returns         :
	**/

	function getTCSBUChartData(obj,widId) {
		clickRefresh(obj,true);
	    var widgetStateId ;
		var data = {};
		if ($(obj).length !=0){
			widgetStateId = $(obj).closest('.widget').attr("id");
		} else if (widId != null && widId != undefined){
			widgetStateId = widId;
		}
		var widgetObject = getWidgetObject(widgetStateId);
	    if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.fromDate != undefined && filterObject.fromDate != null)
	    		data.since = filterObject.fromDate
	    	if (filterObject.toDate != undefined && filterObject.toDate != null)
	    		data.until = filterObject.toDate
	    	if (filterObject.limit != undefined && filterObject.limit != null)
	    		data.limit = filterObject.limit
	    }
	    sendAjaxCall('dashboard/widgets/maxTaskCompletionSummary', "POST", false, true, "json", data, TCSBUErrorCall, function(responseData){
	    	clickRefresh(obj,false);
	    	if(responseData.error_message == undefined)
	    		populateTaskCompletionSummary(responseData,widgetStateId);
	    	else
	    		showErrorNotification(responseData.error_message);
	    });
	}
	function filterProcessTCSBUChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#TCSBUChartFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.fromDate != undefined && filterObject.fromDate != null){
	    		$(modalObj).find('.fromDate').val(filterObject.fromDate);
	    		$('#TCSBUChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
			}
	    	else 
	    		$(modalObj).find('.fromDate').val('');
	    	if (filterObject.toDate != undefined && filterObject.toDate != null)
	    		$(modalObj).find('.toDate').val(filterObject.toDate);
	    	else 
	    		$(modalObj).find('.toDate').val('');
	    	if (filterObject.limit != undefined && filterObject.limit != null){
	    		$(modalObj).find('.limitValue').removeAttr('style').removeClass('chzn-done');
	    		$(modalObj).find('.limitValue').next().remove();
	    		$(modalObj).find('.limitValue').val(filterObject.limit);
	    		$(modalObj).find('.limitValue').chosen();
	    		$(modalObj).find('.limitValue').next().css('width',170);
	    	}
	    	else 
	    		$(modalObj).find('.limitValue').val('');
	    	if (filterObject.chartType != undefined && filterObject.chartType != null){
	    		$(modalObj).find('.chartTypes').next().remove();
	    		$(modalObj).find('.chartTypes').removeAttr('style').removeClass('chzn-done');
	    		$(modalObj).find('.chartTypes').val(filterObject.chartType);
	    		$(modalObj).find('.chartTypes').chosen();
	    		$(modalObj).find('.chartTypes').next().css('width',170);
	    	}
	    }
	    if (widgetObject != null){
	    	if (widgetObject.title != undefined && widgetObject.title != null)
	    		$(modalObj).find('.chartName').val(widgetObject.title);
	    }
	    $(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
	    $(modalObj).find('.error-Msg').addClass('hide');
	    modalShow('TCSBUChartFilter'+widgetStateId);
	}
	function applyTCSBUFilter(obj){
		var widgetStateId = $(obj).attr("widgetId");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = {};
		var modalObj = $(obj).closest('.modal');
	    var reqData = {};
	    var oldObject = JSON.parse(JSON.stringify(widgetObject.filter));
		delete oldObject.chartType;
	    if ($(modalObj).find('.fromDate').val() != undefined && $(modalObj).find('.fromDate').val() != ''){
	        reqData.since = $(modalObj).find('.fromDate').val();
	        filterObject.fromDate = $(modalObj).find('.fromDate').val();
	    } else 
	    	delete reqData.since;
	    if ($(modalObj).find('.toDate').val() != undefined  && $(modalObj).find('.toDate').val() != ''){
	        reqData.until = $(modalObj).find('.toDate').val();
	        filterObject.toDate = $(modalObj).find('.toDate').val();
	    } else 
	    	delete reqData.until;
	    if ($(modalObj).find('.chartTypes').val() != undefined && $(modalObj).find('.chartTypes').val() != null ){
	    	filterObject.chartType = $(modalObj).find('.chartTypes').val();
	    }
	    if ($(modalObj).find('.limitValue').val() != undefined  && $(modalObj).find('.limitValue').val() != '-1'){
	    	filterObject.limit = $(modalObj).find('.limitValue').val();
	    	reqData.limit = $(modalObj).find('.limitValue').val();
	    } else 
	    	delete reqData.limit;
	    if ($(modalObj).find('.chartName').val() != undefined && $(modalObj).find('.chartName').val() != null && $.trim($(modalObj).find('.chartName').val()) != ''){
	    	widgetObject.title = $(modalObj).find('.chartName').val();
	    	$('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val());
		    widgetObject.filter = filterObject;
		    persistWidget(widgetObject);
		    $('#TCSBUChartFilter'+widgetStateId).modal('hide');
		    var newObject = JSON.parse(JSON.stringify(filterObject));
			delete newObject.chartType;
			if(compareObjects(newObject,oldObject))
				changeChartType_TCSBU(widgetStateId);
			else{
				clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/maxTaskCompletionSummary', "POST", false, true, "json", reqData, TCSBUErrorCall, function(responseData){
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined)
						populateTaskCompletionSummary(responseData,widgetStateId);
					else
						showErrorNotification(responseData.error_message);
					});
				}
	    } else {
	    	$(modalObj).find('.error-Msg').removeClass('hide');
	    	$(modalObj).find('.error-Msg').text($('#widgetChartNameErrorMsg').text());
	    	$(modalObj).find('.chartName').focus();
	    }
	}

	function TCSBUErrorCall(e)
	{
		if(e.responseText!=null && e.responseText!=undefined)
			showInformation(e.responseText);
		else
			showInformation($("#widgetAjaxErrorMsg").text());
		return false;
	}
	
	/**
	 * @Function Name : populateInstanceSummaryData
	 * @Description   : creates a chart data for popluating it in to chart
	 * @param         : Json object,query fetch / refresh
	 * @returns       : chartData
	 * */

	function populateTaskCompletionSummary(data, widgetId) 
	{
		var chartData = "";
		if(!isObjectEmpty(data.task_summary) && data.task_summary.length>0)
		{
			chartData = '{"chart": {"showvalues": "1","showLabels":"1","canvasBorderThickness":"0","issliced":"0","showBorder":"0","bgColor":"FFFFFF,FFFFFF","canvasBgRatio":"100,0","showlegend": "1","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9"},"data":['
			$.each(data.task_summary, function (idx, value) {
				var userObj = [];
				if(data.name!=undefined && data.name!=null)
					userObj = $.grep(data.name, function(e){return e.userID == value.user});
				var user = userObj.length==1 ? userObj[0].userName : value.user.replace(/\\/gi,"/");
				chartData += '{"label":"' + user + '","value":"' + value.completedTaskCountByUser + '"},';
			});
			chartData = chartData.substring(0, chartData.length - 1);
			chartData += ']}';
		}
		renderChart_TCSBU(chartData,widgetId);
	}
	
	/** @Function Name   : renderChart_TCSBU
	*   @Description     : renders the actual chart
	*   @param           : chart type,data to render
	*   @returns         : chart
	* */
	
	function renderChart_TCSBU(data,widgetId){
		var widgetObject = getWidgetObject(widgetId);
	    var filterObject = widgetObject.filter;
	    var chartType_TCSBU;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_TCSBU = filterObject.chartType;
	    else
			chartType_TCSBU = defaults.swf3;
	    FusionCharts.setCurrentRenderer('javascript');
	    if(FusionCharts("TCSBU"+widgetId)!=undefined && FusionCharts("TCSBU"+widgetId)!=null)
			FusionCharts("TCSBU"+widgetId).dispose();
	    var task_completion_summary_by_user = new FusionCharts("widgets/swf/"+chartType_TCSBU,"TCSBU"+widgetId);
		task_completion_summary_by_user.setJSONData(data);
		data=task_completion_summary_by_user.getJSONData();
		if(!isObjectEmpty(data)) 
		{
			if (chartType_TCSBU.indexOf("2D") >= 0){
				if(data.chart.pieradius == null){
					data.chart.pieRadius = 80;
				}
			}
			else{
				delete data.chart.pieradius;
			}
		}	
		task_completion_summary_by_user.setJSONData(data);
		task_completion_summary_by_user.setTransparent(true);
		task_completion_summary_by_user.render(defaults.chart9 + widgetId);		
	}

	function changeChartType_TCSBU(widgetId){
		var chartRef = FusionCharts("TCSBU" + widgetId);
		renderChart_TCSBU(chartRef.getJSONData(),widgetId);
	}
	
	$('.chartName').parent().prev().text($('#widgetChartName').text());
	$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
	$('.toDate').closest('td').prev().text($('#widgetToDate').text());
	$('.chartTypes').parent().prev().text($('#widgetChartType').text());
	$('.limitValue').parent().prev().text($('#widgetFilterLimit').text());
	$('.applyButton').text($('#widgetFilterApply').text());

</script>
</head>
<div id='task_completion_summary_by_user' class="chart"></div>
<div id="TCSBUChartFilter" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">&times;</button>
                <span class="modal_heading">Task Completion Summary by User</span>
            </div>
            <div class="modal-body">
                 <table class="table noLines chartFilterTable">
                	<tr><td class="error-Msg text-danger hide" colspan="4"></td></tr>
                	<tr><td></td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
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
                    <tr><td></td><td colspan="3"><select class="limitValue">
                    	<option value="-1">Select Limit</option>
                    	<option value="5">Top 5</option>
                    	<option value="10">Top 10</option>
                    	<option value="15">Top 15</option>
                    	<option value="20">Top 20</option>
                    </select></td></tr>
                    <tr>
                    	<td></td>
                    	<td>
                    		<select class="chartTypes"></select>
                    	</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyTCSBUFilter(this);return false;"></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
