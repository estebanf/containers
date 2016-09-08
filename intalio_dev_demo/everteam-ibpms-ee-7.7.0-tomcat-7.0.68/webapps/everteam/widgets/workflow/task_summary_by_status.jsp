<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
	<script type="text/javascript">
	/** TS in this script refers to Task Summary */
	/** @Function Name   : Jquery Ready Function 
	*   @Description     : jquery ready function
	*   @param           :
	*   @returns         :
	* */
	$(function() {
		var widgetStateId = $('#task_summary').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf16;
	    	widgetObject.filter = JSON.stringify(filterObject);
	    	persistWidget(widgetObject);
	    }
	    var divId_TS = defaults.chart6 + widgetStateId;
		$('#task_summary').attr('id', divId_TS);
		$('#TSSChartFilter').attr('id', "TSSChartFilter"+widgetStateId);
		/**all possible charts*/
		var possibleCharts=[defaults.swf3,defaults.swf4,defaults.swf5,defaults.swf7,defaults.swf8,defaults.swf9,defaults.swf12,defaults.swf13,defaults.swf16];
		var possibleChartsNames=["Column chart 3D","Pie chart 3D","Doughnut chart 3D","Column chart 2D","Pie chart 2D","Doughnut chart 2D","Line chart","Bar chart","Area chart"];
		$('#TSSChartFilter'+widgetStateId+' .chartTypes').empty();
	    $.each(possibleCharts, function (idx, value) {
	        $('#TSSChartFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
	    });
	    $('#TSSChartFilter'+widgetStateId+' .chartTypes').chosen();
	    $('#TSSChartFilter'+widgetStateId+' .chartTypes').next().css('width',170);
		var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessTSSChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
		var refreshIcon = "<a onclick=getTSData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
		if($("#"+divId_TS).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
			$("#"+divId_TS).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
			$("#"+divId_TS).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
		}
		getTSData($("#"+divId_TS),widgetStateId);
		$('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
		$('#TSSChartFilter'+widgetStateId+' .fromDate').on('change',function() {
			var fromDate = $('#TSSChartFilter'+widgetStateId+' .fromDate').val();
			var toDate = $('#TSSChartFilter'+widgetStateId+' .toDate').val();
			if(fromDate > toDate)
				$('#TSSChartFilter'+widgetStateId+' .toDate').val("");
			$('#TSSChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
		});
	});
	
	/** @Function Name   : getTSData
	*   @Description     : fetches the data from server
	*   @param           : query fetch / refresh
	*   @returns         :
	* */
	function getTSData(obj,widId) 
	{
		clickRefresh(obj,true);
		var widgetStateId ;
		var data = {};
		if ($(obj).length !=0 ){
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
		sendAjaxCall('dashboard/widgets/userTaskSummary', "POST", false, true, "json", data, TSErrorCall, function(data1){
			clickRefresh(obj,false);
			if(responseData.error_message == undefined)
	    		populateTaskSummary(data1,widgetStateId);
	    	else
	    		showErrorNotification(responseData.error_message);
		});
	}
	function filterProcessTSSChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#TSSChartFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.fromDate != undefined && filterObject.fromDate != null){
	    		$(modalObj).find('.fromDate').val(filterObject.fromDate);
	    		$('#TSSChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
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
	    if (widgetObject != null) {
	    	if (widgetObject.title != undefined && widgetObject.title != null)
	    		$(modalObj).find('.chartName').val(widgetObject.title);
	    }
	    $(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
	    $(modalObj).find('.error-Msg').addClass('hide');
	    modalShow('TSSChartFilter'+widgetStateId);
	}
	function applyTSSFilter(obj){
		var widgetStateId = $(obj).attr("widgetId");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = {};
		var modalObj = $(obj).closest('.modal');
		var data = {}
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
		if ($(modalObj).find('.chartTypes').val() != undefined && $(modalObj).find('.chartTypes').val() != null)
			filterObject.chartType = $(modalObj).find('.chartTypes').val();
		if ($(modalObj).find('.chartName').val() != undefined && $(modalObj).find('.chartName').val() != null && $.trim($(modalObj).find('.chartName').val()) != ''){
			widgetObject.title = $(modalObj).find('.chartName').val();
			$('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val());
			widgetObject.filter = filterObject;
			persistWidget(widgetObject);
			$('#TSSChartFilter'+widgetStateId).modal('hide');
			var newObject = JSON.parse(JSON.stringify(filterObject));
			delete newObject.chartType;
			if(compareObjects(newObject,oldObject))
				changeChartType_TS(widgetStateId);
			else{
					clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
					sendAjaxCall('dashboard/widgets/userTaskSummary', "POST", false, true, "json", data, TSErrorCall, function(data1){
						clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined )
						populateTaskSummary(data1,widgetStateId);
					else
						showErrorNotification(responseData.error_message);
					});
				}
			} else {
			$(modalObj).find('.error-Msg').text($('#widgetChartNameErrorMsg').text());
	    	$(modalObj).find('.error-Msg').removeClass('hide');
	    	$(modalObj).find('.chartName').focus();
	    }
	}
	function TSErrorCall(e)
	{
		if(e.responseText!=null && e.responseText!=undefined)
			showInformation(e.responseText);
		else
			showInformation($("#widgetAjaxErrorMsg").text());
		return false;
	}
	
	/**
	 * @Function Name : populateTaskSummary
	 * @Description   : creates a chart data for popluating it in to chart
	 * @param         : Json object,query fetch / refresh
	 * @returns       : chartData
	 * */
	 
	function populateTaskSummary(data,widgetId) {

		var taskName = [ "Completed by User","Notifications","completed by  Roles","Claimed","Ready"];
		var chartData= "";
		if(!isObjectEmpty(data.task_summary))
		{
			var flag = false;
			chartData= '{"chart":{"showvalues":"0","yAxisName":"Count","showLabels":"1","showlegend": "1","canvasBorderThickness":"0","bgColor":"FFFFFF,FFFFFF","showBorder":"0","canvasBgRatio":"100,0","issliced": "0","useroundedges": "1", "paletteColors":"6FB3E0,69AA46,FFB752,D15B47","showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9","plotgradientcolor": "69AA46"},"data":[';
			$.each(data.task_summary,function(idx,value){
				if(parseInt(value)>parseInt(0))
				{
					flag = true;
					idx=idx.split(/(?=[A-Z])/); 
					idx[0] = idx[0].charAt(0).toUpperCase()+idx[0].slice(1);
					idx=idx.join(' ');
					idx=idx.replace(" Count", "");
					chartData += '{"label":"'+idx+'","value":"'+value+'"},';
				}
			});
			if(flag)
			{
				chartData=chartData.substring(0, chartData.length - 1);
				chartData +=']}';
				var widgetObject = getWidgetObject(widgetId);
				if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
			    	var filterObject = widgetObject.filter;
					if (filterObject.chartType == "Pie3D.swf"){
						chartData = chartData.replace('"showLabels":"1"','"showLabels":"0"');
					}
				}
			}
			else
				chartData = "";
		}
		renderChart_TS(chartData,widgetId);
	}
	
	/** @Function Name   : renderChart_TS
	*   @Description     : renders the actual chart
	*   @param           : chart type, data to render
	*   @returns         : chart
	* */
	
	function renderChart_TS(data,widgetId){
		var widgetObject = getWidgetObject(widgetId);
	    var filterObject = widgetObject.filter;
	    var chartType_TS;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_TS = filterObject.chartType;
	    else
			chartType_TS = defaults.swf16;
		FusionCharts.setCurrentRenderer('javascript');
		if(FusionCharts("TS"+widgetId)!=undefined && FusionCharts("TS"+widgetId)!=null)
			FusionCharts("TS"+widgetId).dispose();
		var taskSummaryChart = new FusionCharts("widgets/swf/"+chartType_TS,"TS"+widgetId);
		taskSummaryChart.setJSONData(data);
		data=taskSummaryChart.getJSONData();
		if(!isObjectEmpty(data)) 
		{
		if (chartType_TS.indexOf("Pie") != -1 || chartType_TS.indexOf("Doughnut") != -1){
			data.chart.showlabels =0;
			data.chart.showvalues = 0;
			data.chart.showlegend =1;
		}
		else{
			data.chart.showlabels =1;
			data.chart.showvalues =1;
			data.chart.showlegend =0;
		}
		if (chartType_TS.indexOf("2D") >= 0){
			if(data.chart.pieradius == null){
				data.chart.pieRadius = 80;
			}
		}
		else{
			delete data.chart.pieradius;
		}
	}
		taskSummaryChart.setJSONData(data);
		taskSummaryChart.setTransparent(true);
		taskSummaryChart.render(defaults.chart6 + widgetId);		
	}
	
	function changeChartType_TS(widgetId){
		var chartRef = FusionCharts("TS" + widgetId);
		renderChart_TS(chartRef.getJSONData(),widgetId)
	}
	$('.chartName').parent().prev().text($('#widgetChartName').text());
	$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
	$('.toDate').closest('td').prev().text($('#widgetToDate').text());
	$('.chartTypes').parent().prev().text($('#widgetChartType').text());
	$('.applyButton').text($('#widgetFilterApply').text());
    
	</script>
</head>
	<div id='task_summary' class="chart"></div>
	<div id="TSSChartFilter" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">&times;</button>
                <span class="modal_heading">Task Summary by Status</span>
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
                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyTSSFilter(this);"></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
