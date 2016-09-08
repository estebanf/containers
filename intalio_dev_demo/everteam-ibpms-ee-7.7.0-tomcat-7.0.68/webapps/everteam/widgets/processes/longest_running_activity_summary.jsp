<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
<script type="text/javascript">
	var packageListDashboard = {};

	/** @Function Name   : Jquery Ready Function 
	 *   @Description     : jquery ready function
	 *   @param           :
	 *   @returns         :
	 * */
	$(function () {
		$('.limitValue').chosen();
		$('.limitValue').next().css('width',170);
		var widgetStateId = $('#longest_running_activity_summary').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf3;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_LRAS = defaults.chart2 + widgetStateId;
		$('#longest_running_activity_summary').attr('id', divId_LRAS);
		$('#LRASChartFilter').attr('id', "LRASChartFilter"+widgetStateId);
		
		var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9];
		var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D", "Column chart 2D", "Pie chart 2D", "Doughnut chart 2D"];
		$.each(possibleCharts, function (idx, value) {
			$('#LRASChartFilter'+widgetStateId+' .chartType').append("<option value="+value+">"+possibleChartsNames[idx]+"</option>");
		});
		$('#LRASChartFilter'+widgetStateId+' .chartType').chosen();
		$('#LRASChartFilter'+widgetStateId+' .chartType').next().css('width',170);
		var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterLRASChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>"
		var refreshIcon = "<a onclick=javascript:getLRASChartData(this);  class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
		if ($("#" + divId_LRAS).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
			$("#" + divId_LRAS).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
			$("#" + divId_LRAS).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
		}
		$('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
		getLRASChartData($("#" + divId_LRAS), widgetStateId);
		$('#LRASChartFilter'+widgetStateId+' .startDate').on('change',function() {
			var fromDate = $('#LRASChartFilter'+widgetStateId+' .startDate').val();
			var toDate = $('#LRASChartFilter'+widgetStateId+' .endDate').val();
			if(fromDate > toDate)
				$('#LRASChartFilter'+widgetStateId+' .endDate').val("");
			$('#LRASChartFilter'+widgetStateId+' .endDate').datepicker('setStartDate',fromDate);
		});
	});

	function getLRASChartData(obj,widId){
		clickRefresh(obj,true);
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var data = {};
		if (widgetStateId != undefined && widgetStateId != null){
			
		} else if (widId != null && widId != undefined){
			widgetStateId = widId;
		}
		var widgetObject = getWidgetObject(widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
			var filterObject = widgetObject.filter;
			if (filterObject.since != undefined && filterObject.since != null && filterObject.since != "")
				data.since = filterObject.since
			if (filterObject.until != undefined && filterObject.until != null && filterObject.until != "")
				data.until = filterObject.until
			if (filterObject.limit != undefined && filterObject.limit != null && filterObject.limit != "")
				data.limit = filterObject.limit
			if (filterObject.process != undefined && filterObject.process != null)
				data.process = filterObject.process
		}
		if(!isObjectEmpty(data)){
			sendAjaxCall('dashboard/widgets/longestRunningActivitySummary', "POST", false, true, "json", data, LRASErrorCall, function(responseData){
				clickRefresh(obj,false);
				if(responseData.error_message == undefined )
		    		populateActivitySummary(responseData, widgetStateId);
		    	else
		    		showErrorNotification(responseData.error_message);
				},600000);
		}else
			filterLRASChart($('#'+widId).find('.filterIcon'));
	}
	function LRASErrorCall(e){
		if(e.responseText!=null && e.responseText!=undefined)
			showInformation(e.responseText);
		else
			showInformation($("#widgetAjaxErrorMsg").text());
		return false;
	}

	function populateActivitySummary(data, widgetStateId){
		
		var chartData = '{"chart":{"formatnumberscale": "0","bgColor":"FFFFFF,FFFFFF","showBorder":"0","yAxisName":"Seconds"},'
		var dataSet = '"data": [';
		var count = 0;
		if(!isObjectEmpty(data.longest_running_activity_summary))
		{
			$.each(data.longest_running_activity_summary, function (key, value) {
				var second = parseFloat(value.averageRunningTime / 1000)
				dataSet += '{"value" : "' + second + '"' + "," + '"label" : "' + value.activityName + '"},';
			});
		}
		dataSet = dataSet.substr(0, dataSet.length - 1);
		chartData = chartData + "" + dataSet + "]}";
		renderChart_LRAS(chartData, widgetStateId);
	}

	/** @Function Name   : renderChart_LRAS
	 *   @Description     : renders the actual chart
	 *   @param           : chart type,data to render
	 *   @returns         : chart
	 * */

	function renderChart_LRAS(data, widgetStateId) {
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = widgetObject.filter;
		var chartType_LRAS;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_LRAS = filterObject.chartType;
	    else
			chartType_LRAS = defaults.swf3;
		FusionCharts.setCurrentRenderer('javascript');
		if (FusionCharts("LongestRunningActivity" + widgetStateId) != undefined && FusionCharts("LongestRunningActivity" + widgetStateId) != null)
			FusionCharts("LongestRunningActivity" + widgetStateId).dispose();
		var AvgComplTime = new FusionCharts("widgets/swf/" + chartType_LRAS, "LongestRunningActivity" + widgetStateId);
		AvgComplTime.setJSONData(data);
		data = AvgComplTime.getJSONData();
		if(!isObjectEmpty(data)) 
		{
		if (chartType_LRAS.indexOf("Pie") != -1 || chartType_LRAS.indexOf("Doughnut") != -1) {
			data.chart.showlabels = 0;
			data.chart.showlegend = 1;
			data.chart.showvalues = 0;
		} else {
			data.chart.showlabels = 1;
			data.chart.showvalues = 1;
			data.chart.showlegend = 0;
		}
		if (chartType_LRAS.indexOf("2D") >= 0) {
			if (data.chart.pieradius == null) {
				data.chart.pieRadius = 80;
			}
		} else {
			delete data.chart.pieradius;
		}
		}
		AvgComplTime.setJSONData(data);
		AvgComplTime.setTransparent(true);
		AvgComplTime.render(defaults.chart2 + widgetStateId);
	}

	function getLongestRunActivity(obj, widgetStateId){
		clickRefresh(obj);
		var chartRef = FusionCharts("LongestRunningActivity" + widgetStateId);
		renderChart_LRAS(chartType_LRAS, chartRef.getJSONData());
	}

	/**
	 * @Function Name : updateChartType_LRAS
	 * @Description   : updates the charts 2D / 3D
	 * @param         : charttype
	 * @returns       :
	 * */

	function updateChartType_LRAS(updateChart,obj) {
		var chartRef = FusionCharts("LongestRunningActivity" + tabId);
		chartType_LRAS = updateChart;
		renderChart_LRAS(updateChart, chartRef.getJSONData());
	}

	function filterLRASChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#LRASChartFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.since != undefined && filterObject.since != null){
	    		$('#LRASChartFilter'+widgetStateId+' .startDate').val(filterObject.since);
	    		$('#LRASChartFilter'+widgetStateId+' .endDate').datepicker('setStartDate',filterObject.since);
			}
	    	else 
	    		$(modalObj).find('.startDate').val('');
	    	if (filterObject.until != undefined && filterObject.until != null)
	    		$(modalObj).find('.endDate').val(filterObject.until);
	    	else 
	    		$(modalObj).find('.endDate').val('')
	    	if (filterObject.chartType != undefined && filterObject.chartType != null){
	    		$(modalObj).find('.chartType').next().remove();
	    		$(modalObj).find('.chartType').removeAttr('style').removeClass('chzn-done');
	    		$(modalObj).find('.chartType').val(filterObject.chartType);
	    		$(modalObj).find('.chartType').chosen();
	    		$(modalObj).find('.chartType').next().css('width',170);
	    	}
	    	if (filterObject.limit != undefined && filterObject.limit != null){
	    		$(modalObj).find('.limit').val(filterObject.limit);
	    	}
	    	if (widgetObject.title != undefined && widgetObject.title != null)
	    		$(modalObj).find('.chartName').val(widgetObject.title);
	    }
		
		addLoading($('#LRASChartFilter .modal-body'));
		$('#loading').css('margin-top',30);
		var data = {
		}
		sendAjaxCall('dashboard/filters/processes', "POST", false, true, "json", data, LRASErrorCall, function(responseData){
			if(responseData.error_message == undefined)
	    		populateProcessesLRAS(responseData, widgetStateId, widgetObject)
	    	else
	    		showErrorNotification(responseData.error_message);
			});
		$(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
		$('#LRASChartFilter'+widgetStateId+' .error-msg').text('');
		modalShow('LRASChartFilter'+widgetStateId);
		
	}

	function populateProcessesLRAS(data, widgetStateId, widgetObject){
		$('#LRASChartFilter'+widgetStateId+' .pkgClass').addClass('hide');
		$("#LRASChartFilter"+widgetStateId+" .packageList").removeClass("chzn-done");
		$("#LRASChartFilter"+widgetStateId+" .packageList").removeAttr("style");
		$("#LRASChartFilter"+widgetStateId+" .packageList").next().remove();
		$("#LRASChartFilter"+widgetStateId+" .processList").removeClass("chzn-done");
		$("#LRASChartFilter"+widgetStateId+" .processList").removeAttr("style");
		$("#LRASChartFilter"+widgetStateId+" .processList").next().remove();
		$("#LRASChartFilter"+widgetStateId+" .packageList").empty();
		$('#LRASChartFilter'+widgetStateId+' .packageList').append('<option value="-1">Select Package</option>');
		packageListDashboard = {};
		var pkg;
		$.each(data.process,function(key,obj){
			if(obj.package){
				pkg = obj.id;
				$('#LRASChartFilter'+widgetStateId+' .packageList').append('<option value="'+obj.id+'">'+obj.name+' [v'+[obj.version]+']</option>');
				packageListDashboard[pkg] = [];
			}else{
				packageListDashboard[pkg].push({name:obj.name,id:obj.id});
			}
		});
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
			var filterObject = widgetObject.filter;
			if (filterObject.pkgId != undefined && filterObject.pkgId != null){
	    		$('#LRASChartFilter'+widgetStateId+' .packageList').val(filterObject.pkgId).attr('selected','selected');
	    		$("#LRASChartFilter"+widgetStateId+" .pkgClass").removeClass('hide');
	    	}else{
				$('#LRASChartFilter'+widgetStateId+' .packageList').val('-1').attr('selected','selected');
			}
			if (filterObject.process != undefined && filterObject.process != null){
				$('#LRASChartFilter'+widgetStateId+' .processList').empty();
				$('#LRASChartFilter'+widgetStateId+' .processList').append('<option value="-1">Select Process</option>');
				$.each(packageListDashboard,function(key,obj){
					if(key === filterObject.pkgId){
						$.each(obj,function(key,ob){
							if(ob.id === filterObject.process)
								$('#LRASChartFilter'+widgetStateId+' .processList').append('<option value="'+ob.id+'" selected="selected">'+ob.name+'</option>');
							else
								$('#LRASChartFilter'+widgetStateId+' .processList').append('<option value="'+ob.id+'">'+ob.name+'</option>');
						});
					}
				});	
	    		$('#LRASChartFilter'+widgetStateId+' .processList').val(filterObject.process).attr('selected','selected');
	    	}
		}
		
		$('#LRASChartFilter'+widgetStateId+' .packageList').chosen();
		$('#LRASChartFilter'+widgetStateId+' .packageList').next().css('width',410);
		$('#LRASChartFilter'+widgetStateId+' .processList').chosen();
		$('#LRASChartFilter'+widgetStateId+' .processList').next().css('width',410);
		removeLoading($('#LRASChartFilter .modal-body'));
	}
	function populateProcessesBasedOnPackage(packageId){
		var widgetStateId = $(packageId).closest('.modal').find('.applyButton').attr('widgetId');
		var widgetObject = getWidgetObject(widgetStateId);
		$("#LRASChartFilter"+widgetStateId+" .processList").removeClass("chzn-done");
		$("#LRASChartFilter"+widgetStateId+" .processList").removeAttr("style");
		$("#LRASChartFilter"+widgetStateId+" .processList").next().remove();
		if($('#LRASChartFilter'+widgetStateId+' .packageList').val() != -1)
			$("#LRASChartFilter"+widgetStateId+" .pkgClass").removeClass('hide');
		else
			$("#LRASChartFilter"+widgetStateId+" .pkgClass").addClass('hide');
		$('#LRASChartFilter'+widgetStateId+' .processList').empty();
		$('#LRASChartFilter'+widgetStateId+' .processList').append('<option value="-1">Select Process</option>');
		$.each(packageListDashboard,function(key,obj){
			if(key === $(packageId).val()){
				$.each(obj,function(key,ob){
					$('#LRASChartFilter'+widgetStateId+' .processList').append('<option value="'+ob.id+'">'+ob.name+'</option>');
				});
			}
		});
		$('#LRASChartFilter'+widgetStateId+' .processList').chosen();
		$('#LRASChartFilter'+widgetStateId+' .processList').next().css('width',410);
	}

	function applyLRASFilter(obj){
		var widgetStateId = $(obj).attr("widgetId");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = {};
	    var data = {};
	    var oldObject = JSON.parse( JSON.stringify(widgetObject.filter));
		delete oldObject.chartType;
	    var chartName = $('#LRASChartFilter'+widgetStateId+' .chartName').val();
		var pkgId = $('#LRASChartFilter'+widgetStateId+' .packageList').find('option:selected').val();
		var procId = $('#LRASChartFilter'+widgetStateId+' .processList').find('option:selected').val();
		var limit = $('#LRASChartFilter'+widgetStateId+' .limitValue').val();
		var startDate = $('#LRASChartFilter'+widgetStateId+' .startDate').val();
		var endDate = $('#LRASChartFilter'+widgetStateId+' .endDate').val();
		var chartType = $('#LRASChartFilter'+widgetStateId+' .chartType').find('option:selected').val();
		if(chartName == undefined || chartName == null || $.trim(chartName).length == 0){
			$('#LRASChartFilter'+widgetStateId+' .error-msg').text($('#widgetChartNameErrorMsg').text());
			$('#LRASChartFilter'+widgetStateId+' .chartName').focus();
		}else if(pkgId == -1){
			$('#LRASChartFilter'+widgetStateId+' .error-msg').text($('#widgetPkgErrorMsg').text());
		}else if(procId == -1){
			$('#LRASChartFilter'+widgetStateId+' .error-msg').text($('#widgetProcesErrorMsg').text());
		}else{
			filterObject.pkgId = pkgId;
			filterObject.process = procId;
			data.process = procId;
			if(startDate != undefined && startDate != null && startDate != ""){
				filterObject.since = startDate;
				data.since = startDate;
			}
			else delete data.since;
			if(endDate != undefined && endDate != null && endDate != ""){
				filterObject.until = endDate;
				data.until = endDate;
			}
			else delete data.until;
			if(chartType != undefined && chartType != null){
				filterObject.chartType = chartType;
			}
			if(limit != undefined && limit != null && limit != "" && limit != '-1'){
				filterObject.limit = limit;
				data.limit = limit;
			}
			$('#LRASChartFilter'+widgetStateId).modal('hide');
			widgetObject.title = chartName;
			$(obj).closest('.widget').find('.widget-name').text(chartName);
			widgetObject.filter = filterObject;
			persistWidget(widgetObject);
			var newObject = JSON.parse( JSON.stringify( filterObject ) )
			delete newObject.chartType;
			if (compareObjects(newObject,oldObject))
				changeChartTypeLRAS(widgetStateId);
			else{
				clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/longestRunningActivitySummary', "POST", false, true, "json", data, LRASErrorCall, function(responseData){
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined)
						populateActivitySummary(responseData, widgetStateId);
					else
						showErrorNotification(responseData.error_message);
				},600000);
			}
		}
	}

	function changeChartTypeLRAS(widgetId){
		var chartRef = FusionCharts("LongestRunningActivity" + widgetId);
		renderChart_LRAS(chartRef.getJSONData(),widgetId)
	}

	function checkFilterLRAS(obj){
		var widgetId = $(obj).closest('.modal').find('.applyButton').attr('widgetId');
		var widgetObject = getWidgetObject(widgetId);
		if(widgetObject==undefined || widgetObject.filter.process==undefined)
			$(obj).closest('.widget-body').find('.chart').text($('#widgetProcessFilterError').text());
		modalHide($(obj).closest('.modal').attr('id'));
	}

$('.chartName').parent().prev().text($('#widgetChartName').text());
$('.packageList').parent().prev().text($('#widgetPackage').text());
$('.processList').parent().prev().text($('#widgetProcess').text());
$('.startDate').closest('td').prev().text($('#widgetFromDate').text());
$('.endDate').closest('td').prev().text($('#widgetToDate').text());
$('.chartType').parent().prev().text($('#widgetChartType').text());
$('.groupBy').parent().prev().text($('#widgetFilterGroupBy').text());
$('.limitValue').parent().prev().text($('#widgetFilterLimit').text());
$('.applyButton').text($('#widgetFilterApply').text());

</script>
</head>
	<div id='longest_running_activity_summary' class="chart"></div>
	<div id="LRASChartFilter" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true" onclick='javascript:checkFilterLRAS(this);'>&times;</button>
					<span class="modal_heading">Longest Running Activity Summary</span>
				</div>
				<div class="modal-body">
					<span class="error-msg text-danger"></span>
					<table class="table noLines chartFilterTable">
						<tr><td></td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
						<tr>
							<td></td>
							<td colspan="3"><select class="packageList" onchange="populateProcessesBasedOnPackage(this)"></select></td>
						</tr>
						<tr class="pkgClass hide">
							<td></td>
							<td colspan="3"><select class="processList "></select></td>
						</tr>
						<tr>
							<td></td>
							<td>
							   <div class="input-group pull-left">
							      <input type="text" class="chartFilterDates startDate pull-left" data-date-format="yyyy-mm-dd">
							      <span class="input-group-addon">
							         <i class="fa fa-calendar bigger-110"></i>
							      </span>
							   </div>
							</td>
							<td>To</td>
							<td>
							   <div class="input-group pull-left">
							      <input type="text" class="chartFilterDates endDate pull-left" data-date-format="yyyy-mm-dd">
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
							<td><select class="chartType"></select></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary btn-sm applyButton" type="button"  aria-hidden="true" onclick="applyLRASFilter(this);return false;"></button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
