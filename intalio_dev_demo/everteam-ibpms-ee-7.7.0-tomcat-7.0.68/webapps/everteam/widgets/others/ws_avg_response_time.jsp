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
		var widgetStateId = $('#ws_avg_res_time').closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf6 ;
	    	widgetObject.filter = JSON.stringify(filterObject);
	    	persistWidget(widgetObject);
	    }
		var divId_WSART = defaults.chart17 + widgetStateId;
		$('#ws_avg_res_time').attr('id', divId_WSART);
		$('#WSARTChartFilter').attr('id', "WSARTChartFilter"+widgetStateId);
		/**all possible charts*/
		var possibleCharts=[defaults.swf6,defaults.swf15];
		var possibleChartsNames=["Column line chart","Multi line chart"];
		$('#WSARTChartFilter'+widgetStateId+' .chartTypes').empty();
	    $.each(possibleCharts, function (idx, value) {
	        $('#WSARTChartFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
	    });
	    $('#WSARTChartFilter'+widgetStateId+' .chartTypes').chosen();
	    $('#WSARTChartFilter'+widgetStateId+' .chartTypes').next().css('width',170);
		var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessWSARTChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
		var refreshIcon = "<a onclick=getWSARTChartData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
		if ($("#" + divId_WSART).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
			$("#" + divId_WSART).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
			$("#" + divId_WSART).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
		}
		getWSARTChartData($("#" + divId_WSART),widgetStateId);
		$('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
		$('#WSARTChartFilter'+widgetStateId+' .fromDate').on('change',function() {
			var fromDate = $('#WSARTChartFilter'+widgetStateId+' .fromDate').val();
			var toDate = $('#WSARTChartFilter'+widgetStateId+' .toDate').val();
			if(fromDate > toDate)
				$('#WSARTChartFilter'+widgetStateId+' .toDate').val("");
			$('#WSARTChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
		});
	});
	
	/** @Function Name    : getWSARTChartData
	 *   @Description     : fetches the data from server
	 *   @param           : obj,Widget Id
	 *   @returns         :
	 * */

	function getWSARTChartData(obj,widId) {
		clickRefresh(obj,true);
		var widgetStateId;
		var wsAvgdata = {};
		if($(obj).length!=0)
			widgetStateId = $(obj).closest('.widget').attr('id');
		else if (widId != null && widId != undefined)
			widgetStateId = widId;
		if (widgetStateId != undefined && widgetStateId != null){
			var widgetObject = getWidgetObject(widgetStateId);
			if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != '' && widgetObject.filter.webservice != undefined){
				var filterObject = widgetObject.filter;
				if (filterObject.fromDate != undefined && filterObject.fromDate != null)
					wsAvgdata.since = filterObject.fromDate;
				if (filterObject.toDate != undefined && filterObject.toDate != null)
					wsAvgdata.until = filterObject.toDate;
				if (filterObject.webservice != undefined && filterObject.webservice != null)
					wsAvgdata.webservice = filterObject.webservice;
				sendAjaxCall('dashboard/widgets/webserviceAverageResponseTime', "POST", false, true, "json",	wsAvgdata, WSARTErrorCall, function(responseData){
					clickRefresh(obj,false);
					if(responseData.error_message == undefined)
						populateWebserviceResponseTime(responseData,widgetStateId);
					else
						showErrorNotification(responseData.error_message);
				});
			}else
				filterProcessWSARTChart($('#'+widId).find('.filterIcon'));
		}
		
	}
	
	function filterProcessWSARTChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#WSARTChartFilter'+widgetStateId);
		var webservices;
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
			var filterObject = widgetObject.filter;
			if (filterObject.fromDate != undefined && filterObject.fromDate != null){
				$(modalObj).find('.fromDate').val(filterObject.fromDate);
				$('#WSARTChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
			}
			else 
				$(modalObj).find('.fromDate').val('');
			if (filterObject.toDate != undefined && filterObject.toDate != null)
				$(modalObj).find('.toDate').val(filterObject.toDate);
			else 
				$(modalObj).find('.toDate').val('');
			if (filterObject.webservice!=undefined && filterObject.webservice!=null)
				webservices = filterObject.webservice;
			if (filterObject.chartType != undefined && filterObject.chartType != null){
	    		$(modalObj).find('.chartTypes').next().remove();
	    		$(modalObj).find('.chartTypes').removeAttr('style').removeClass('chzn-done');
	    		$(modalObj).find('.chartTypes').val(filterObject.chartType);
	    		$(modalObj).find('.chartTypes').chosen();
	    		$(modalObj).find('.chartTypes').next().css('width',170);
	    	}
		}
		if (widgetObject!=null && widgetObject.title != undefined && widgetObject.title != null)
			$(modalObj).find('.chartName').val(widgetObject.title);
		getWebServicesList(widgetStateId,webservices);
		$(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
		$(modalObj).find('.error-Msg').addClass('hide');
	}
	
	function getWebServicesList(widgetStateId,webservices)
	{
		var wsAvgdata={};
		sendAjaxCall('dashboard/filters/webservices', "POST", false, true, "json", wsAvgdata, WSARTErrorCall, function(responseData){
			if(responseData.error_message == undefined )
	    		populateWebservicesList(responseData,widgetStateId,webservices);
	    	else
	    		showErrorNotification(responseData.error_message);
		});
	}
	
	function populateWebservicesList(data,widgetStateId,webservices)
	{
		if(!isObjectEmpty(data.web_service))
		{
			$("#WSARTChartFilter"+widgetStateId+" .webservicesList").empty();
			$("#WSARTChartFilter"+widgetStateId+" .webservicesList").removeAttr('style').removeClass('chzn-done');
			$("#WSARTChartFilter"+widgetStateId+" .webservicesList").next().remove();
			$.each(data.web_service,function (key,value){
				if(value!=null && value!=undefined)
				{
					var webserviceName  = value.substring(parseInt(value.lastIndexOf('/')+1),value.length).replace('}','/');
					var webserviceValue = value;
					if(jQuery.inArray(webserviceValue,webservices)==-1)
						$("#WSARTChartFilter"+widgetStateId+" .webservicesList").append('<option value="'+webserviceValue+'">'+webserviceName+'</option>');
					else if(jQuery.inArray(webserviceValue,webservices)>=0)
						$("#WSARTChartFilter"+widgetStateId+" .webservicesList").append('<option selected="selected" value="'+webserviceValue+'">'+webserviceName+'</option>');
				}
			});
			$("#WSARTChartFilter"+widgetStateId+" .webservicesList").chosen({max_selected_options: 10});
			$("#WSARTChartFilter"+widgetStateId+" .webservicesList").unbind("liszt:maxselected").bind("liszt:maxselected", function (){
				$('.error-Msg').removeClass('hide').text($('#widgetWebSerivesMaxErrorMsg').text());
				return false;
			});
			$("#WSARTChartFilter"+widgetStateId+" .webservicesList").next().css('width',410);
			$("#WSARTChartFilter"+widgetStateId+" .webservicesList").next().find('li.search-field input').css('width',250).css('height',25);
		}
		modalShow('WSARTChartFilter'+widgetStateId);
	}
	
	function applyWSARTFilter(obj){
		var widgetStateId = $(obj).attr("widgetId");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = {};
		var modalObj = $(obj).closest('.modal');
		var wsAvgdata = {}
		var oldObject = JSON.parse(JSON.stringify(widgetObject.filter));
		delete oldObject.chartType;
		if ($(modalObj).find('.fromDate').val() != undefined && $(modalObj).find('.fromDate').val() != ""){
			wsAvgdata.since = $(modalObj).find('.fromDate').val();
			filterObject.fromDate = $(modalObj).find('.fromDate').val();
		}
		else delete wsAvgdata.since;
		if ($(modalObj).find('.toDate').val() != undefined && $(modalObj).find('.toDate').val() != ""){
			wsAvgdata.until = $(modalObj).find('.toDate').val();
			filterObject.toDate = $(modalObj).find('.toDate').val();
		}
		else delete wsAvgdata.until;
		if ($(modalObj).find('.webservicesList').val() != undefined && $(modalObj).find('.webservicesList').val() != ""){
			wsAvgdata.webservice = $(modalObj).find('.webservicesList').val();
			filterObject.webservice = $(modalObj).find('.webservicesList').val();
		}else{
			$(modalObj).find('.error-Msg').removeClass('hide');
			$(modalObj).find('.error-Msg').text($('#widgetWebServicesErrorMsg').text());
			return false;
		}
		if ($(modalObj).find('.chartTypes').val() != undefined && $(modalObj).find('.chartTypes').val() != null)
			filterObject.chartType = $(modalObj).find('.chartTypes').val();
		if ($(modalObj).find('.chartName').val() != undefined && $(modalObj).find('.chartName').val() != null && $.trim($(modalObj).find('.chartName').val()) != ''){
			widgetObject.title = $(modalObj).find('.chartName').val();
			$('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val());
			widgetObject.filter = filterObject;
			persistWidget(widgetObject);
			$('#WSARTChartFilter'+widgetStateId).modal('hide');
			var newObject = JSON.parse(JSON.stringify(filterObject));
			delete newObject.chartType;
			if(compareObjects(newObject,oldObject))
				changeChartType_WSART(widgetStateId);
			else{
				clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/webserviceAverageResponseTime', "POST", false, true, "json", wsAvgdata, WSARTErrorCall, function(responseData){
				clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
				if(responseData.error_message == undefined )
		    		populateWebserviceResponseTime(responseData,widgetStateId);
		    	else
		    		showErrorNotification(responseData.error_message);
				});
			}
		} else
			$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetChartNameErrorMsg').text());
	}
	
	function WSARTErrorCall(e)
	{
		if(e.responseText!=null && e.responseText!=undefined)
			showInformation(e.responseText);
		else
			showInformation($("#widgetAjaxErrorMsg").text());
		return false;
	}
	
	/**
	 * @Function Name : populateWebserviceResponseTime
	 * @Description   : creates a chart data for popluating it in to chart
	 * @param         : response data,WidgetId
	 * @returns       : chartData
	 * */
	function populateWebserviceResponseTime(data, widgetId) {
		var time;
		var chartData= "";
		if(!isObjectEmpty(data.webservice_average_response_time))
		{
			chartData = '{"chart": {"showvalues": "1","pYAxisName":"Seconds","canvasBorderThickness":"0","canvasbgcolor":"#fafbf9","bgColor":"FFFFFF,FFFFFF","showBorder":"0","canvasBgRatio":"100,0","showLabels":"0"},';
			var category='"categories": [{"category": [';
			var timeTaken='{"seriesname": "Response Time","data": [';
			var numberOfCalls='{"seriesname": "Number of Calls","renderas": "Line","parentyaxis": "S","anchorsides": "4","anchorradius": "5","anchorbgcolor": "BBDA00","color": "BBDA00","anchorbordercolor": "FFFFFF","anchorborderthickness": "2","data": [';
			$.each(data.webservice_average_response_time,function (idx,value){
				time=value.avgTime/1000;
				category += '{"label":"'+value.serviceName+'"},';
				timeTaken += '{"value":"'+time+'"},';
				numberOfCalls += '{"value":"'+value.operationCount+'"},';
			});
			category=category.substring(0, category.length - 1);
			timeTaken=timeTaken.substring(0, timeTaken.length - 1);
			numberOfCalls=numberOfCalls.substring(0, numberOfCalls.length - 1);
			chartData += category+']}],"dataset": ['+numberOfCalls + ']},' + timeTaken+']}]}';
		}
		renderChart_WSART(chartData,widgetId);
	}

	function checkFilterWSART(obj){
		var widgetId = $(obj).closest('.modal').find('.applyButton').attr('widgetId');
		var widgetObject = getWidgetObject(widgetId);
		if(widgetObject==undefined || widgetObject.filter.webservice==undefined)
			$(obj).closest('.widget-body').find('.chart').text($('#widgetWebServicesErrorMsg').text());
		modalHide($(obj).closest('.modal').attr('id'));
	}

	/** @Function Name   : renderChart_WSART
	*   @Description     : renders the actual chart
	*   @param           : json data,WidgetId
	*   @returns         : chart
	* */
	
	function renderChart_WSART(data,widgetId){
		var widgetObject = getWidgetObject(widgetId);
	    var filterObject = widgetObject.filter;
	    var chartType_WSART;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_WSART = filterObject.chartType;
	    else
			chartType_WSART = defaults.swf6;
		FusionCharts.setCurrentRenderer('javascript');
		if(FusionCharts("WSART"+widgetId)!=undefined && FusionCharts("WSART"+widgetId)!=null)
			FusionCharts("WSART"+widgetId).dispose();
		var WSResponseTimeChart = new FusionCharts("widgets/swf/"+chartType_WSART,"WSART"+widgetId);
		WSResponseTimeChart.setJSONData(data);
		WSResponseTimeChart.setTransparent(true);
		WSResponseTimeChart.render(defaults.chart17 + widgetId);
	}

	function changeChartType_WSART(widgetId){
		var chartRef = FusionCharts("WSART" + widgetId);
		renderChart_WSART(chartRef.getJSONData(),widgetId)
	}

	$('.chartName').parent().prev().text($('#widgetChartName').text());
	$('.toDate').closest('td').prev().text($('#widgetToDate').text());
	$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
	$('.applyButton').text($('#widgetFilterApply').text());
	$('.webservicesList').parent().prev().text($('#widgetWebServices').text());
	$('.chartTypes').parent().prev().text($('#widgetChartType').text());
</script>
</head>
<div id='ws_avg_res_time' class="chart"></div>
<div id="WSARTChartFilter" class="modal fade" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true" onclick='javascript:checkFilterWSART(this);'>&times;</button>
				<span class="modal_heading">Average Web Service Response Time</span>
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
						<td colspan="3">
							<select multiple class="webservicesList" data-placeholder='Select Webservices'></select>
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
				<button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyWSARTFilter(this);return false;"></button>
			</div>
		</div>
	</div>
</div>
</body>
</html>
