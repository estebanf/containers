<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
<script type="text/javascript">
	/** @Function Name    : Jquery Ready Function 
	 *   @Description     : jquery ready function
	 *   @param           :
	 *   @returns         :
	 * */
	$(function () {
	    var widgetStateId = $('#task_summary_by_priority').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf3;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_TSBP = defaults.chart14 + widgetStateId;
		$('#task_summary_by_priority').attr('id', divId_TSBP);
		$('#TSPChartFilter').attr('id', "TSPChartFilter"+widgetStateId);
		/**all possible charts*/
	    var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9,defaults.swf12,defaults.swf13,defaults.swf16];
	    var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D", "Column chart 2D", "Pie chart 2D", "Doughnut chart 2D","Line chart","Bar chart","Area chart"];
	    $('#TSPChartFilter'+widgetStateId+' .chartTypes').empty();
	    $.each(possibleCharts, function (idx, value) {
	        $('#TSPChartFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
	    });
	    $('#TSPChartFilter'+widgetStateId+' .chartTypes').chosen();
	    $('#TSPChartFilter'+widgetStateId+' .chartTypes').next().css('width',170);
	    var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessTSPChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
	    var refreshIcon = "<a onclick=getTSBPChartData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
	    if ($("#" + divId_TSBP).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
	        $("#" + divId_TSBP).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
	        $("#" + divId_TSBP).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
	    }
	    getTSBPChartData($("#" + divId_TSBP),widgetStateId);
	    $('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
	    $('#TSPChartFilter'+widgetStateId+' .fromDate').on('change',function() {
			var fromDate = $('#TSPChartFilter'+widgetStateId+' .fromDate').val();
			var toDate = $('#TSPChartFilter'+widgetStateId+' .toDate').val();
			if(fromDate > toDate)
				$('#TSPChartFilter'+widgetStateId+' .toDate').val("");
			$('#TSPChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
		});
	});

	/** @Function Name   : getTSBPChartData
	 *   @Description     : fetches the data from server
	 *   @param           : query fetch / refresh
	 *   @returns         :
	 * */

	function getTSBPChartData(obj,widId) {
		clickRefresh(obj,true);
		var widgetStateId;
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
	    }
	    sendAjaxCall('dashboard/widgets/taskPrioritySummary', "POST", false, true, "json", data, TSBPErrorCall, function(responseData){
	    	clickRefresh(obj,false);
	    	if(responseData.error_message == undefined)
	    		populateTaskSummaryPriority(responseData,widgetStateId)
	    	else
	    		showErrorNotification(responseData.error_message);
	    });
	}
	function filterProcessTSPChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#TSPChartFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.fromDate != undefined && filterObject.fromDate != null){
	    		$(modalObj).find('.fromDate').val(filterObject.fromDate);
	    		$('#TSPChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
			}
	    	else 
	    		$(modalObj).find('.fromDate').val('');
	    	if (filterObject.toDate != undefined && filterObject.toDate != null)
	    		$(modalObj).find('.toDate').val(filterObject.toDate);
	    	else 
	    		$(modalObj).find('.toDate').val('')
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
	    modalShow('TSPChartFilter'+widgetStateId);
	}
	function applyTSPFilter(obj){
		var widgetStateId = $(obj).attr("widgetId");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = {};
		var modalObj = $(obj).closest('.modal');
	    var data = {};
	    var oldObject = JSON.parse(JSON.stringify(widgetObject.filter));
		delete oldObject.chartType;
	    if ($(modalObj).find('.fromDate').val() != undefined && $(modalObj).find('.fromDate').val() != ''){
	        data.since = $(modalObj).find('.fromDate').val();
	        filterObject.fromDate = $(modalObj).find('.fromDate').val();
	    }
	    else delete data.since;
	    if ($(modalObj).find('.toDate').val() != undefined && $(modalObj).find('.toDate').val() != ''){
	        data.until = $(modalObj).find('.toDate').val();
	        filterObject.toDate = $(modalObj).find('.toDate').val();
	    }
	    else delete data.until;
	    if ($(modalObj).find('.chartTypes').val() != undefined && $(modalObj).find('.chartTypes').val() != null){
	    	filterObject.chartType = $(modalObj).find('.chartTypes').val();
	    }
	    if ($(modalObj).find('.chartName').val() != undefined && $(modalObj).find('.chartName').val() != null && $.trim($(modalObj).find('.chartName').val()) != ''){
	    	widgetObject.title = $(modalObj).find('.chartName').val();
	    	$('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val());
		    widgetObject.filter = filterObject;
		    persistWidget(widgetObject);
		    $('#TSPChartFilter'+widgetStateId).modal('hide');
		    var newObject = JSON.parse(JSON.stringify(filterObject));
			delete newObject.chartType;
			if(compareObjects(newObject,oldObject))
				changeChartType_TSBP(widgetStateId);
			else{
					clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
					sendAjaxCall('dashboard/widgets/taskPrioritySummary', "POST", false, true, "json", data, TSBPErrorCall, function(responseData){
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined)
						populateTaskSummaryPriority(responseData,widgetStateId);
					else
						showErrorNotification(responseData.error_message);
					});
				}
	    }else {
			$(modalObj).find('.error-Msg').text($('#widgetChartNameErrorMsg').text());
	    	$(modalObj).find('.error-Msg').removeClass('hide');
	    	$(modalObj).find('.chartName').focus();
	    }
	}
	function TSBPErrorCall(e)
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

	function populateTaskSummaryPriority(data, widgetId) {
		var chartData = "";
		var count = {
			'critical':0,
			'normal':0,
			'important':0,
			'low':0
		}
		if(!isObjectEmpty(data.task_summary))
		{
			chartData = '{"chart": {"showvalues": "1","showLabels":"1","canvasBorderThickness":"0","issliced":"0","showBorder":"0","bgColor":"FFFFFF,FFFFFF","canvasBgRatio":"100,0","showlegend": "1","paletteColors":"6FB3E0,69AA46,FFB752,D15B47","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9",  "plotgradientcolor": "69AA46"},"data":['
			$.each(data.task_summary, function (idx, value) {
				if(parseInt(value.Priority)>=parseInt(51))
					count.critical = parseInt(count.critical) + parseInt(value.Count);
				else if(parseInt(value.Priority)>=parseInt(31) && parseInt(value.Priority)<=parseInt(50))
					count.important = count.important + parseInt(value.Count);
				else if(parseInt(value.Priority)>=parseInt(11) && parseInt(value.Priority)<=parseInt(30))
					count.normal = count.normal + parseInt(value.Count);
				else if(parseInt(value.Priority)<=parseInt(10))
					count.low = count.low + parseInt(value.Count);
			});
			chartData += '{"label":"Low","value":"' + count.low + '"},';
			chartData += '{"label":"Normal","value":"' + count.normal + '"},';
			chartData += '{"label":"Important","value":"' + count.important + '"},';
			chartData += '{"label":"Critical","value":"' + count.critical + '"}';
			//chartData = chartData.substring(0, chartData.length - 1);
			chartData += ']}';
		}
		renderChart_TSBP(chartData,widgetId);
	}

	/** @Function Name    : renderChart_TSBP
	 *   @Description     : renders the actual chart
	 *   @param           : chart type, data to render
	 *   @returns         : chart
	 * */
	function renderChart_TSBP(data,widgetId) {
		var widgetObject = getWidgetObject(widgetId);
	    var filterObject = widgetObject.filter;
	    var chartType_TSBP;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_TSBP = filterObject.chartType;
	    else
			chartType_TSBP = defaults.swf3;
		FusionCharts.setCurrentRenderer('javascript');
		if (FusionCharts("TSBP" + widgetId) != undefined && FusionCharts("TSBP" + widgetId) != null)
			FusionCharts("TSBP" + widgetId).dispose();
		var task_summary_by_priority = new FusionCharts("widgets/swf/" + chartType_TSBP, "TSBP" + widgetId);
		task_summary_by_priority.setJSONData(data);
		data = task_summary_by_priority.getJSONData();
		if(!isObjectEmpty(data)) 
		{
			if (chartType_TSBP.indexOf("Pie") != -1 || chartType_TSBP.indexOf("Doughnut") != -1) {
				data.chart.showlabels = 0;
				data.chart.showvalues = 0;
				data.chart.showlegend = 1;
			}else {
				data.chart.showlabels = 1;
				data.chart.showvalues = 1;
				data.chart.showlegend = 0;
			}
			if (chartType_TSBP.indexOf("2D") >= 0) {
				if (data.chart.pieradius == null) {
					data.chart.pieRadius = 80;
				}
			} else {
				delete data.chart.pieradius;
			}
		}
		task_summary_by_priority.setJSONData(data);
		task_summary_by_priority.setTransparent(true);
		task_summary_by_priority.render(defaults.chart14 + widgetId);
	}

function changeChartType_TSBP(widgetId){
	var chartRef = FusionCharts("TSBP" + widgetId);
	renderChart_TSBP(chartRef.getJSONData(),widgetId);
}
	
	$('.chartName').parent().prev().text($('#widgetChartName').text());
	$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
	$('.toDate').closest('td').prev().text($('#widgetToDate').text());
	$('.chartTypes').parent().prev().text($('#widgetChartType').text());
	$('.applyButton').text($('#widgetFilterApply').text());
</script>
</head>
<div id='task_summary_by_priority' class="chart"></div>
<div id="TSPChartFilter" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">&times;</button>
                <span class="modal_heading">Task Summary by Priority</span>
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
                    <tr>
                    	<td></td>
                    	<td>
                    		<select class="chartTypes"></select>
                    	</td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyTSPFilter(this);return false;"></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
