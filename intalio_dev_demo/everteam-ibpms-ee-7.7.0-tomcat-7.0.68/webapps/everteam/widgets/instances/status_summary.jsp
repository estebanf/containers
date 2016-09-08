<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>

<script type="text/javascript">
	/** IS in this script refers to Instances Summary */
	/** @Function Name   : Jquery Ready Function 
	 *   @Description     : jquery ready function
	 *   @param           :
	 *   @returns         :
	 * */

	$(function () {
		var widgetStateId = $('#status_summary').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf12;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_IS = defaults.chart5 + widgetStateId;
		$('#status_summary').attr('id', divId_IS);
		$('#instancesSummaryFilter').attr('id', "instancesSummaryFilter"+widgetStateId);
	    /**all possible charts*/
	    var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9, defaults.swf12,defaults.swf13,defaults.swf16];
	    var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D", "Column chart 2D", "Pie chart 2D", "Doughnut chart 2D","Line chart","Bar chart","Area chart"];
	    var addChartTypeIcon = "&nbsp;<a href='#' id='changeChartType' data-toggle='dropdown'><i title='Change Chart Type' class='fa fa-download'></i></a><ul class='pull-right dropdown-menu dropdown-caret dropdown-yellow header-drop'>";
	    $('#instancesSummaryFilter'+widgetStateId+' .chartTypes').empty();
	    $.each(possibleCharts, function (idx, value) {
	        $('#instancesSummaryFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
	    });
	    $('#instancesSummaryFilter'+widgetStateId+' .chartTypes').chosen();
	    $('#instancesSummaryFilter'+widgetStateId+' .chartTypes').next().css('width',170);
	    var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='instanceSummaryFilter(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>"
	    var refreshIcon = "<a onclick=getISChartData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
	    if ($("#" + divId_IS).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
	        $("#" + divId_IS).parent().parent().children(':first-child').children(':nth-child(2)').children(':nth-child(2)').replaceWith(refreshIcon);
	        $("#" + divId_IS).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
	    }
	    $('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
	    $('#instancesSummaryFilter'+widgetStateId+' .fromDate').on('change',function() {
			var fromDate = $('#instancesSummaryFilter'+widgetStateId+' .fromDate').val();
			var toDate = $('#instancesSummaryFilter'+widgetStateId+' .toDate').val();
			if(fromDate > toDate)
				$('#instancesSummaryFilter'+widgetStateId+' .toDate').val("");
			$('#instancesSummaryFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
		});
	    getISChartData($("#" + divId_IS),widgetStateId);
	});

	/** @Function Name   : getISChartData
	 *   @Description     : fetches the data from server
	 *   @param           : query fetch / refresh
	 *   @returns         :
	 * */

	function getISChartData(obj,widId) {
		clickRefresh(obj,true);
	   	var widgetStateId ;
		var data = {};
		if ($(obj).length != 0){
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
	    sendAjaxCall('dashboard/widgets/instanceStatusSummary', "POST", false, true, "json", data, ISErrorCall, function(responseData){
	    	clickRefresh(obj,false);
			if(responseData.error_message == undefined)
				populateInstanceSummaryData(responseData,widgetStateId);
			else
				showErrorNotification(responseData.error_message);
		});
	}

	function instanceSummaryFilter(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#instancesSummaryFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.fromDate != undefined && filterObject.fromDate != null){
	    		$(modalObj).find('.fromDate').val(filterObject.fromDate);
	    		$('#instancesSummaryFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
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
	    $(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
	    $(modalObj).find('.error-Msg').addClass('hide');
		modalShow('instancesSummaryFilter'+widgetStateId);
	}

	function applyInstancesSummaryFilter(obj){
		var widgetStateId = $(obj).attr("widgetId");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = {};
		var modalObj = $(obj).closest('.modal');
	    var dataISS = {};
	    var oldObject = JSON.parse( JSON.stringify( widgetObject.filter));
		delete oldObject.chartType;
	    if ($(modalObj).find('.fromDate').val() != ""){
	        dataISS.since = $(modalObj).find('.fromDate').val();
	        filterObject.fromDate = $(modalObj).find('.fromDate').val();
	    }
	    else
			delete dataISS.since;
	    if ($(modalObj).find('.toDate').val() != ""){
	        dataISS.until = $(modalObj).find('.toDate').val();
	        filterObject.toDate = $(modalObj).find('.toDate').val();
	    }
	    else
			delete dataISS.until;
	    if ($(modalObj).find('.chartTypes').val() != undefined && $(modalObj).find('.chartTypes').val() != null){
	    	filterObject.chartType = $(modalObj).find('.chartTypes').val();
	    }
	    if ($.trim($(modalObj).find('.chartName').val()) != ''){
	    	widgetObject.title = $(modalObj).find('.chartName').val();
	    	$('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val());
		    widgetObject.filter = filterObject;
		    persistWidget(widgetObject);
		    $('#instancesSummaryFilter'+widgetStateId).modal('hide');
		    var newObject = JSON.parse( JSON.stringify( filterObject ) )
			delete newObject.chartType;
			if (compareObjects(newObject,oldObject))
				changeChartTypeIS(widgetStateId);
			else{
			    clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/instanceStatusSummary', "POST", false, true, "json", dataISS, ISErrorCall, function(responseData){
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined)
						populateInstanceSummaryData(responseData,widgetStateId);
					else
						showErrorNotification(responseData.error_message);
		   		});
			}
		} 
		else 
			$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetChartNameErrorMsg').text());
	}


	function ISErrorCall(e)
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

	function populateInstanceSummaryData(data, widgetId) {
	    var chartData = "";
	    
	    if(!isObjectEmpty(data.instance_status_summary))
		{
			chartData = '{"chart": {"showvalues": "1","showLabels":"1","canvasBorderThickness":"0","issliced":"0","showBorder":"0","bgColor":"FFFFFF,FFFFFF","canvasBgRatio":"100,0","showlegend": "1","yAxisName":"Count","paletteColors":"B94A48,69AA46,FFB752,A069C3","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9","plotgradientcolor": "A069C3"},"data":['
			$.each(data.instance_status_summary, function (idx, value) {
				if (idx != "Completed"){
					idx = idx.charAt(0).toUpperCase() + idx.slice(1);
					chartData += '{"label":"' + idx + '","value":"' + value + '"},';
				}
			});
				chartData = chartData.substring(0, chartData.length - 1);
				chartData += ']}';
		}
	    renderChart_IS(chartData,widgetId);
	}

	/** @Function Name   : renderChart_IS
	 *   @Description     : renders the actual chart
	 *   @param           : chart type, data to render
	 *   @returns         : chart
	 * */

	function renderChart_IS(data,widgetId) {
		var widgetObject = getWidgetObject(widgetId);
	    var filterObject = widgetObject.filter;
	    var chartType_IS;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_IS = filterObject.chartType;
	    else
	    	chartType_IS = defaults.swf12;
	    FusionCharts.setCurrentRenderer('javascript');
	    if (FusionCharts("IS" + widgetId) != undefined && FusionCharts("IS" + widgetId) != null)
	        FusionCharts("IS" + widgetId).dispose();
	    var InstancesSummaryChart = new FusionCharts("widgets/swf/" + chartType_IS, "IS" + widgetId);
	    InstancesSummaryChart.setJSONData(data);
	    data = InstancesSummaryChart.getJSONData();
	    if(!isObjectEmpty(data)) 
		{
		    if (chartType_IS.indexOf("Pie") != -1 || chartType_IS.indexOf("Doughnut") != -1 || chartType_IS.indexOf("Doughnut") != -1) {
		        data.chart.showlabels = 0;
		        data.chart.showvalues = 0;
		        data.chart.showlegend = 1;
		    }else {
		        data.chart.showlabels = 1;
		        data.chart.showvalues = 1;
		        data.chart.showlegend = 0;
		    }
		    if (chartType_IS.indexOf("2D") >= 0) {
		        if (data.chart.pieradius == null) {
		            data.chart.pieRadius = 80;
		        }
		    } else
		        delete data.chart.pieradius;
		}
	    InstancesSummaryChart.setJSONData(data);
	    InstancesSummaryChart.setTransparent(true);
	    InstancesSummaryChart.render(defaults.chart5 + widgetId );
	}
	function changeChartTypeIS(widgetId){
		var chartRef = FusionCharts("IS" + widgetId);
		renderChart_IS(chartRef.getJSONData(),widgetId)
	}
$('.chartName').parent().prev().text($('#widgetChartName').text());
$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
$('.toDate').closest('td').prev().text($('#widgetToDate').text());
$('.chartTypes').parent().prev().text($('#widgetChartType').text());
$('.applyButton').text($('#widgetFilterApply').text());
</script>
</head>
<body>
	<div id="status_summary" class="chart"></div>
	<div id="instancesSummaryFilter" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<span class="modal_heading">Instance Status Summary</span>
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
                    	<td><select class="chartTypes"></select></td>
                    </tr>
                </table>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyInstancesSummaryFilter(this);return false;"></button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
