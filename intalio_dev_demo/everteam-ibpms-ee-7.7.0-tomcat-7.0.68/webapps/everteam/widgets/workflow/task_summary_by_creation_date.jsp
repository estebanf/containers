<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
<script type="text/javascript">
/** TSBCD in this script refers to Task Summary by Priority */
	/** @Function Name    : Jquery Ready Function 
	 *   @Description     : jquery ready function
	 *   @param           :
	 *   @returns         :
	 * */
	$(function () {
		var widgetStateId = $('#task_summary_by_creation_date').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf3;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_TSBCD = defaults.chart15 + widgetStateId;
		$('#task_summary_by_creation_date').attr('id', divId_TSBCD);
		$('#TSCDChartFilter').attr('id', "TSCDChartFilter"+widgetStateId);

	    /**all possible charts*/
	    var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9,defaults.swf13];
	    var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D", "Column chart 2D", "Pie chart 2D", "Doughnut chart 2D","Bar chart"];
	    $('#TSCDChartFilter'+widgetStateId+' .chartTypes').empty();
	    $.each(possibleCharts, function (idx, value) {
	        $('#TSCDChartFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
	    });
	    $('#TSCDChartFilter'+widgetStateId+' .chartTypes').chosen();
	    $('#TSCDChartFilter'+widgetStateId+' .chartTypes').next().css('width',170);
	    var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessTSCDChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
	    var refreshIcon = "<a onclick=getTSBCDChartData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
	    if ($("#" + divId_TSBCD).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
	        $("#" + divId_TSBCD).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
	        $("#" + divId_TSBCD).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
	    }
	    getTSBCDChartData($("#" + divId_TSBCD),widgetStateId);
	    $('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
	    $('#TSCDChartFilter'+widgetStateId+' .fromDate').on('change',function() {
			var fromDate = $('#TSCDChartFilter'+widgetStateId+' .fromDate').val();
			var toDate = $('#TSCDChartFilter'+widgetStateId+' .toDate').val();
			if(fromDate > toDate)
				$('#TSCDChartFilter'+widgetStateId+' .toDate').val("");
			$('#TSCDChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
		});
	});

	/** @Function Name   : getTSBCDChartData
	 *   @Description     : fetches the data from server
	 *   @param           : query fetch / refresh
	 *   @returns         :
	 * */

	function getTSBCDChartData(obj,widId) {
		clickRefresh(obj,true);
	    var widgetStateId;
		var data = {};
		if ($(obj).length !=0){
			widgetStateId  = $(obj).closest('.widget').attr("id");
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
	    	if (filterObject.groupBy != undefined && filterObject.groupBy != null)
				data.groupBy = filterObject.groupBy
	    }
	    sendAjaxCall('dashboard/widgets/taskCreationSummary', "POST", false, true, "json", data, TSBCDErrorCall, function(responseData){
	    	clickRefresh(obj,false);
	    	if(responseData.error_message == undefined )
	    		populateTaskSummaryCreationDate(responseData,widgetStateId);
	    	else
	    		showErrorNotification(responseData.error_message);
	    });
	}
	function filterProcessTSCDChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#TSCDChartFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.fromDate != undefined && filterObject.fromDate != null){
	    		$(modalObj).find('.fromDate').val(filterObject.fromDate);
	    		$('#TSCDChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
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
	    if (widgetObject != null ){
	    	if (widgetObject.title != undefined && widgetObject.title != null)
	    		$(modalObj).find('.chartName').val(widgetObject.title);
	    }
	    $("#TSCDChartFilter"+widgetStateId+" .groupBy").removeAttr("style");
		$("#TSCDChartFilter"+widgetStateId+" .groupBy").next().remove();
		$('#TSCDChartFilter'+widgetStateId+' .groupBy').chosen();
		$('#TSCDChartFilter'+widgetStateId+' .groupBy').next().css('width',170);
		var data = {
		}
		sendAjaxCall('dashboard/filters/groupBy', "POST", false, true, "json", data, TSBCDErrorCall, function(responseData){
			if(responseData.error_message == undefined )
	    		populateGroupByPICMPS(responseData, widgetStateId, widgetObject);
	    	else
	    		showErrorNotification(responseData.error_message);

		});
	    $(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
	    $(modalObj).find('.error-Msg').addClass('hide');
	    modalShow('TSCDChartFilter'+widgetStateId);
	}

	function populateGroupByPICMPS(data, widgetStateId, widgetObject){
		$("#TSCDChartFilter"+widgetStateId+" .groupBy").removeClass("chzn-done");
		$("#TSCDChartFilter"+widgetStateId+" .groupBy").removeAttr("style");
		$("#TSCDChartFilter"+widgetStateId+" .groupBy").next().remove();
		$('#TSCDChartFilter'+widgetStateId+' .groupBy').empty();
		$('#TSCDChartFilter'+widgetStateId+' .groupBy').append('<option value="-1">Select</option>');
		$.each(data.groupBy,function(key,obj){
			$('#TSCDChartFilter'+widgetStateId+' .groupBy').append('<option value="'+obj+'">'+obj+'</option>');
		});
		if(widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
			var filterObject = widgetObject.filter;
			if (filterObject.groupBy != undefined && filterObject.groupBy != null){
	    		$("#TSCDChartFilter"+widgetStateId+" .groupBy").removeClass("chzn-done");
				$("#TSCDChartFilter"+widgetStateId+" .groupBy").removeAttr("style");
				$("#TSCDChartFilter"+widgetStateId+" .groupBy").next().remove();
	    		$("#TSCDChartFilter"+widgetStateId+" .groupBy").val(filterObject.groupBy).attr("selected","selected");
	    		$("#TSCDChartFilter"+widgetStateId+" .groupBy").chosen();
	    		$("#TSCDChartFilter"+widgetStateId+" .groupBy").next().css('width',170);
	    	}
		}
		$('#TSCDChartFilter'+widgetStateId+' .groupBy').chosen();
		$('#TSCDChartFilter'+widgetStateId+' .groupBy').next().css('width',170);
	}

	function applyTSCDFilter(obj){
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
	    if ($(modalObj).find('.groupBy').val() != undefined && $(modalObj).find('.groupBy').val() != null && $(modalObj).find('.groupBy').val() != '-1'){
	    	filterObject.groupBy = $(modalObj).find('.groupBy').val();
	    	data.groupBy = $(modalObj).find('.groupBy').val();
	    }
	    if ($(modalObj).find('.chartName').val() != undefined && $(modalObj).find('.chartName').val() != null && $.trim($(modalObj).find('.chartName').val()) != ''){
	    	widgetObject.title = $(modalObj).find('.chartName').val();
	    	$('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val());
		    widgetObject.filter = filterObject;
		    persistWidget(widgetObject);
		    $('#TSCDChartFilter'+widgetStateId).modal('hide');
		    var newObject = JSON.parse(JSON.stringify(filterObject));
			delete newObject.chartType;
			if(compareObjects(newObject,oldObject))
				changeChartType_TSBCD(widgetStateId);
			else{
					clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
					sendAjaxCall('dashboard/widgets/taskCreationSummary', "POST", false, true, "json", data, TSBCDErrorCall, function(responseData){
						clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
						if(responseData.error_message == undefined )
							populateTaskSummaryCreationDate(responseData,widgetStateId);
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

	function TSBCDErrorCall(e)
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

	function populateTaskSummaryCreationDate(data, widgetId) {
		var chartData = "";
		var axisName;
		var widgetObject = getWidgetObject(widgetId);
		var filterObject = widgetObject.filter;
		if(filterObject.groupBy != undefined && filterObject.groupBy != null && filterObject.groupBy != ""){
			axisName = filterObject.groupBy;
		}else {
			axisName = "HourOfDay";
		}
		var arr = [];
		$.each(data.task_summary,function(idx,value) {
			var elements = {};
			elements.id = idx;
			elements.value = value;
			arr[arr.length] = elements;
		});
		arr.sort(function(a,b) {
			return a.id-b.id;
		});

		if(!isObjectEmpty(data.task_summary))
		{
			chartData = '{"chart": {"showvalues": "1","showLabels":"1","canvasBorderThickness":"0","issliced":"0","showBorder":"0","bgColor":"FFFFFF,FFFFFF","canvasBgRatio":"100,0","showlegend": "1","xAxisName":"'+axisName+'","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9"},"data":['
			$.each(arr, function (idx, value) {
				var label;
				var nextHr = parseInt(value.id)+1
				if(filterObject.groupBy != undefined && filterObject.groupBy != null && filterObject.groupBy != ""){
					if(filterObject.groupBy == 'HourOfDay'){
						nextHr = nextHr.toString();
						if (value.id.length == 1)
							value.id = ("0" + value.id).slice(-2);
						if (nextHr.length == 1)
							nextHr = ("0" + nextHr).slice(-2);
						label = value.id+" - "+nextHr;
					}
					else if(filterObject.groupBy == 'Month')
						label = parseInt(parseInt(value.id)+1);
					else 
						label = value.id;
				}else{
					nextHr = nextHr.toString();
					if (value.id.length == 1)
						value.id = ("0" + value.id).slice(-2);
					if (nextHr.length == 1)
						nextHr = ("0" + nextHr).slice(-2);
					label = value.id+" - "+nextHr;
				}
				chartData += '{"label":"' + label + '","value":"' + value.value + '"},';
			});
				chartData = chartData.substring(0, chartData.length - 1);
				chartData += ']}';
		}
		renderChart_TSBCD(chartData,widgetId);
	}

	/** @Function Name    : renderChart_TSBCD
	 *   @Description     : renders the actual chart
	 *   @param           : chart type, data to render
	 *   @returns         : chart
	 * */

	function renderChart_TSBCD(data,widgetId) {
		var widgetObject = getWidgetObject(widgetId);
	    var filterObject = widgetObject.filter;
	    var chartType_TSBCD;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_TSBCD = filterObject.chartType;
	    else
			chartType_TSBCD = defaults.swf3;
		FusionCharts.setCurrentRenderer('javascript');
		if (FusionCharts("TSBCD" + widgetId) != undefined && FusionCharts("TSBCD" + widgetId) != null)
			FusionCharts("TSBCD" + widgetId).dispose();
		var task_summary_by_priority = new FusionCharts("widgets/swf/" + chartType_TSBCD, "TSBCD" + widgetId);
		task_summary_by_priority.setJSONData(data);
		data = task_summary_by_priority.getJSONData();
		if(!isObjectEmpty(data)) 
		{
			if (chartType_TSBCD.indexOf("Pie") != -1 || chartType_TSBCD.indexOf("Doughnut") != -1) {
				data.chart.showlabels = 0;
				data.chart.showvalues = 0;
				data.chart.showlegend = 1;
			} else {
				data.chart.showlabels = 1;
				data.chart.showvalues = 1;
				data.chart.showlegend = 0;
			}
			if (chartType_TSBCD.indexOf("2D") >= 0) {
				if (data.chart.pieradius == null) {
					data.chart.pieRadius = 80;
				}
			} else {
				delete data.chart.pieradius;
			}
		}
		task_summary_by_priority.setJSONData(data);
		task_summary_by_priority.setTransparent(true);
		task_summary_by_priority.render(defaults.chart15 + widgetId);
	}

	function changeChartType_TSBCD(widgetId){
		var chartRef = FusionCharts("TSBCD" + widgetId);
		renderChart_TSBCD(chartRef.getJSONData(),widgetId);
	}
	$('.chartName').parent().prev().text($('#widgetChartName').text());
	$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
	$('.toDate').closest('td').prev().text($('#widgetToDate').text());
	$('.chartTypes').parent().prev().text($('#widgetChartType').text());
	$('.groupBy').parent().prev().text($('#widgetFilterGroupBy').text());
	$('.applyButton').text($('#widgetFilterApply').text());
	
</script>
</head>
<div id='task_summary_by_creation_date' class="chart"></div>
<div id="TSCDChartFilter" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">&times;</button>
                <span class="modal_heading">Task Summary by Creation Date</span>
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
							<td><select class="groupBy"></select></td>
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
                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyTSCDFilter(this);return false;"></button>
            </div>
        </div>
</div>
</body>
</html>
