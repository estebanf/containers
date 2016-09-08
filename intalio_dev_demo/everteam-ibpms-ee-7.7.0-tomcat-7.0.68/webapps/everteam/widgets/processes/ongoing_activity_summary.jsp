<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
<script type="text/javascript">
	/** OAS in this script refers to Ongoing Activity Summary */
	var packageListDashboard = {};

	/** @Function Name   : Jquery Ready Function 
	 *   @Description     : jquery ready function
	 *   @param           :
	 *   @returns         :
	 * */
	$(function () {
		$('.limitValue').chosen();
		$('.limitValue').next().css('width',170);
		var widgetStateId = $('#ongoing_activity_summary').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf3;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_OAS = defaults.chart3 + widgetStateId;
		$('#ongoing_activity_summary').attr('id', divId_OAS);
		$('#OASChartFilter').attr('id', "OASChartFilter"+widgetStateId);
		
		var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9];
		var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D", "Column chart 2D", "Pie chart 2D", "Doughnut chart 2D"];
		$.each(possibleCharts, function (idx, value) {
			$('#OASChartFilter'+widgetStateId+' .chartType').append("<option value="+value+">"+possibleChartsNames[idx]+"</option>");
		});
		$('#OASChartFilter'+widgetStateId+' .chartType').chosen();
		$('#OASChartFilter'+widgetStateId+' .chartType').next().css('width',170);
		var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterOASChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>"
		var refreshIcon = "<a onclick=getOASChartData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
		if ($("#" + divId_OAS).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
			$("#" + divId_OAS).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
			$("#" + divId_OAS).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
		}
		$('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
		getOASChartData($("#" + divId_OAS), widgetStateId);
		$('#OASChartFilter'+widgetStateId+' .startDate').on('change',function() {
			var fromDate = $('#OASChartFilter'+widgetStateId+' .startDate').val();
			var toDate = $('#OASChartFilter'+widgetStateId+' .endDate').val();
			if(fromDate > toDate)
				$('#OASChartFilter'+widgetStateId+' .endDate').val("");
			$('#OASChartFilter'+widgetStateId+' .endDate').datepicker('setStartDate',fromDate);
		});
	});

function getOASChartData(obj,widId){
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
			sendAjaxCall('dashboard/widgets/processOngoingActivitySummary', "POST", false, true, "json", data, OASErrorCall, function(responseData){
				clickRefresh(obj,false);
				if(responseData.error_message == undefined)
		    		populateOngoingActivitySummary(responseData, widgetStateId);
		    	else
		    		showErrorNotification(responseData.error_message);
				},600000);
		}else
			filterOASChart($('#'+widId).find('.filterIcon'));
	}

	function OASErrorCall(e){
		if(e.responseText!=null && e.responseText!=undefined)
			showInformation(e.responseText);
		else
			showInformation($("#widgetAjaxErrorMsg").text());
		return false;
	}

	function populateOngoingActivitySummary(data, widgetStateId){
		var chartData = '{"chart":{"formatnumberscale": "0","bgColor":"FFFFFF,FFFFFF","showBorder":"0","yAxisName":"Instance Count"},'
		var dataSet = '"data": [';
		var count = 0;
		if(!isObjectEmpty(data.ongoing_activity_summary))
		{
			$.each(data.ongoing_activity_summary, function (key, value) {
				dataSet += '{"value" : "' + parseInt(value.instanceCount) + '"' + "," + '"label" : "' + value.activityName + '"},';
			});
		}
		dataSet = dataSet.substr(0, dataSet.length - 1);
		chartData = chartData + "" + dataSet + "]}";
		renderChart_OAS(chartData, widgetStateId);
	}

	/** @Function Name   : renderChart_AVG
	 *   @Description     : renders the actual chart
	 *   @param           : chart type,data to render
	 *   @returns         : chart
	 * */

	function renderChart_OAS(data, widgetStateId) {
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = widgetObject.filter;
		var chartType_OAS;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_OAS = filterObject.chartType;
	    else
			chartType_OAS = defaults.swf3;
		FusionCharts.setCurrentRenderer('javascript');
		if (FusionCharts("OngoingActivity" + widgetStateId) != undefined && FusionCharts("OngoingActivity" + widgetStateId) != null)
			FusionCharts("OngoingActivity" + widgetStateId).dispose();
		var AvgComplTime = new FusionCharts("widgets/swf/" + chartType_OAS, "OngoingActivity" + widgetStateId);
		AvgComplTime.setJSONData(data);
		data = AvgComplTime.getJSONData();
		if(!isObjectEmpty(data)) 
		{
		if (chartType_OAS.indexOf("Pie") != -1 || chartType_OAS.indexOf("Doughnut") != -1) {
			data.chart.showlabels = 0;
			data.chart.showlegend = 1;
			data.chart.showvalues = 0;
		} else {
			data.chart.showlabels = 1;
			data.chart.showvalues = 1;
			data.chart.showlegend = 0;
		}
		if (chartType_OAS.indexOf("2D") >= 0) {
			if (data.chart.pieradius == null) {
				data.chart.pieRadius = 80;
			}
		} else {
			delete data.chart.pieradius;
		}
		}
		AvgComplTime.setJSONData(data);
		AvgComplTime.setTransparent(true);
		AvgComplTime.render(defaults.chart3 + widgetStateId);
		clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
	}

	function getOngoingActivity(obj){
		clickRefresh(obj,true);
		var chartRef = FusionCharts("OngoingActivity" + tabId);
		renderChart_OAS(chartType_OAS, chartRef.getJSONData());
	}

	/**
	 * @Function Name : updateChartType_OAG
	 * @Description   : updates the charts 2D / 3D
	 * @param         : charttype
	 * @returns       :
	 * */

	function updateChartType_OAS(updateChart,obj) {
		var chartRef = FusionCharts("OngoingActivity" + tabId);
		chartType_OAS = updateChart;
		renderChart_OAS(updateChart, chartRef.getJSONData());
	}

	function filterOASChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#OASChartFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.since != undefined && filterObject.since != null){
	    		$('#OASChartFilter'+widgetStateId+' .startDate').val(filterObject.since);
	    		$('#OASChartFilter'+widgetStateId+' .endDate').datepicker('setStartDate',filterObject.since);
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
	    		$(modalObj).find('.limitValue').val(filterObject.limit);
	    	}
	    	if (widgetObject.title != undefined && widgetObject.title != null)
	    		$(modalObj).find('.chartName').val(widgetObject.title);
	    }
		
		addLoading($('#OASChartFilter .modal-body'));
		$('#loading').css('margin-top',30);
		var data = {
		}
		sendAjaxCall('dashboard/filters/processes', "POST", false, true, "json", data, OASErrorCall, function(responseData){
			if(responseData.error_message == undefined)
	    		populateOngoingProcesses(responseData, widgetStateId, widgetObject);
	    	else
	    		showErrorNotification(responseData.error_message);
			});
		$(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
		$('#OASChartFilter'+widgetStateId+' .error-msg').text('');
		modalShow('OASChartFilter'+widgetStateId);
	}

	function populateOngoingProcesses(data, widgetStateId, widgetObject){
		$('#OASChartFilter'+widgetStateId+' .pkgClass').addClass('hide');
		$("#OASChartFilter"+widgetStateId+" .packageList").removeClass("chzn-done");
		$("#OASChartFilter"+widgetStateId+" .packageList").removeAttr("style");
		$("#OASChartFilter"+widgetStateId+" .packageList").next().remove();
		$("#OASChartFilter"+widgetStateId+" .processList").removeClass("chzn-done");
		$("#OASChartFilter"+widgetStateId+" .processList").removeAttr("style");
		$("#OASChartFilter"+widgetStateId+" .processList").next().remove();
		$("#OASChartFilter"+widgetStateId+" .packageList").empty();
		$('#OASChartFilter'+widgetStateId+' .packageList').append('<option value="-1">Select Package</option>');
		packageListDashboard = {};
		var pkg;
		$.each(data.process,function(key,obj){
			if(obj.package){
				pkg = obj.id;
				$('#OASChartFilter'+widgetStateId+' .packageList').append('<option value="'+obj.id+'">'+obj.name+' [v'+[obj.version]+']</option>');
				packageListDashboard[pkg] = [];
			}else{
				packageListDashboard[pkg].push({name:obj.name,id:obj.id});
			}
		});
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
			var filterObject = widgetObject.filter;
			if (filterObject.pkgId != undefined && filterObject.pkgId != null){
	    		$('#OASChartFilter'+widgetStateId+' .packageList').val(filterObject.pkgId).attr('selected','selected');
	    		$("#OASChartFilter"+widgetStateId+" .pkgClass").removeClass('hide');
	    	}else{
				$('#OASChartFilter'+widgetStateId+' .packageList').val('-1').attr('selected','selected');
			}
			if (filterObject.process != undefined && filterObject.process != null){
				$('#OASChartFilter'+widgetStateId+' .processList').empty();
				$('#OASChartFilter'+widgetStateId+' .processList').append('<option value="-1">Select Process</option>');
				$.each(packageListDashboard,function(key,obj){
					if(key === filterObject.pkgId){
						$.each(obj,function(key,ob){
							if(ob.id === filterObject.process)
								$('#OASChartFilter'+widgetStateId+' .processList').append('<option value="'+ob.id+'" selected="selected">'+ob.name+'</option>');
							else
								$('#OASChartFilter'+widgetStateId+' .processList').append('<option value="'+ob.id+'">'+ob.name+'</option>');
						});
					}
				});	
	    		$('#LRASChartFilter'+widgetStateId+' .processList').val(filterObject.process).attr('selected','selected');
	    	}
		}
		
		$('#OASChartFilter'+widgetStateId+' .packageList').chosen();
		$('#OASChartFilter'+widgetStateId+' .packageList').next().css('width',410);
		$('#OASChartFilter'+widgetStateId+' .processList').chosen();
		$('#OASChartFilter'+widgetStateId+' .processList').next().css('width',410);
		removeLoading($('#OASChartFilter .modal-body'));
	}
	function populateProcessesBasedOnPackageOAS(packageId){
		var widgetStateId = $(packageId).closest('.modal').find('.applyButton').attr('widgetId');
		var widgetObject = getWidgetObject(widgetStateId);
		$("#OASChartFilter"+widgetStateId+" .processList").removeClass("chzn-done");
		$("#OASChartFilter"+widgetStateId+" .processList").removeAttr("style");
		$("#OASChartFilter"+widgetStateId+" .processList").next().remove();
		if($('#OASChartFilter'+widgetStateId+' .packageList').val() != -1)
			$("#OASChartFilter"+widgetStateId+" .pkgClass").removeClass('hide');
		else
			$("#OASChartFilter"+widgetStateId+" .pkgClass").addClass('hide');
		$('#OASChartFilter'+widgetStateId+' .processList').empty();
		$('#OASChartFilter'+widgetStateId+' .processList').append('<option value="-1">Select Process</option>');
		$.each(packageListDashboard,function(key,obj){
			if(key === $(packageId).val()){
				$.each(obj,function(key,ob){
					$('#OASChartFilter'+widgetStateId+' .processList').append('<option value="'+ob.id+'">'+ob.name+'</option>');
				});
			}
		});
		$('#OASChartFilter'+widgetStateId+' .processList').chosen();
		$('#OASChartFilter'+widgetStateId+' .processList').next().css('width',410);
	}

	function applyOASFilter(obj){
				var widgetStateId = $(obj).attr("widgetId");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = {};
	    var data = {};
		var oldObject = JSON.parse( JSON.stringify( widgetObject.filter));
		delete oldObject.chartType;
	    var chartName = $('#OASChartFilter'+widgetStateId+' .chartName').val();
		var pkgId = $('#OASChartFilter'+widgetStateId+' .packageList').find('option:selected').val();
		var procId = $('#OASChartFilter'+widgetStateId+' .processList').find('option:selected').val();
		var limit = $('#OASChartFilter'+widgetStateId+' .limitValue').val();
		var startDate = $('#OASChartFilter'+widgetStateId+' .startDate').val();
		var endDate = $('#OASChartFilter'+widgetStateId+' .endDate').val();
		var chartType = $('#OASChartFilter'+widgetStateId+' .chartType').find('option:selected').val();
		if(chartName == undefined || chartName == null || $.trim(chartName).length == 0){
			$('#OASChartFilter'+widgetStateId+' .error-msg').text($('#widgetChartNameErrorMsg').text());
			$('#OASChartFilter'+widgetStateId+' .chartName').focus();
		}else if(pkgId == -1){
			$('#OASChartFilter'+widgetStateId+' .error-msg').text($('#widgetPkgErrorMsg').text());
		}else if(procId == -1){
			$('#OASChartFilter'+widgetStateId+' .error-msg').text($('#widgetProcesErrorMsg').text());
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
			if(limit != undefined && limit != null && limit != "-1"){
				filterObject.limit = limit;
				data.limit = limit;
			}
			$('#OASChartFilter'+widgetStateId).modal('hide');
			widgetObject.title = chartName;
			$(obj).closest('.widget').find('.widget-name').text(chartName);
			widgetObject.filter = filterObject;
			persistWidget(widgetObject);
			var newObject = JSON.parse( JSON.stringify( filterObject ) )
			delete newObject.chartType;
			if (compareObjects(newObject,oldObject))
				changeChartTypeOAS(widgetStateId);
			else{
				clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/processOngoingActivitySummary', "POST", false, true, "json", data, OASErrorCall, function(responseData){	
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined)
						populateOngoingActivitySummary(responseData, widgetStateId);
					else
						showErrorNotification(responseData.error_message);
					},600000);
			}
		}
	}

	function changeChartTypeOAS(widgetId){
		var chartRef = FusionCharts("OngoingActivity" + widgetId);
		renderChart_OAS(chartRef.getJSONData(),widgetId)
	}

	function checkFilterOAS(obj){
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
	<div id='ongoing_activity_summary' class="chart"></div>
	<div id="OASChartFilter" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true" onclick='javascript:checkFilterOAS(this)';>&times;</button>
					<span class="modal_heading">Ongoing Activity Summary</span>
				</div>
				<div class="modal-body">
					<span class="error-msg text-danger"></span>
					<table class="table noLines chartFilterTable">
						<tr><td>Chart Name </td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
						<tr>
							<td>Package</td>
							<td colspan="3"><select class="packageList" onchange="populateProcessesBasedOnPackageOAS(this)"></select></td>
						</tr>
						<tr class="pkgClass hide">
							<td>Process</td>
							<td colspan="3"><select class="processList "></select></td>
						</tr>
						<tr>
							<td>From</td>
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
						<tr><td>Limit</td><td colspan="3"><select class="limitValue">
	                    	<option value="-1">Select Limit</option>
	                    	<option value="5">Top 5</option>
	                    	<option value="10">Top 10</option>
	                    	<option value="15">Top 15</option>
	                    	<option value="20">Top 20</option>
                    	</select></td></tr>
						<tr>
							<td>Chart Type</td>
							<td><select class="chartType"></select></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary btn-sm applyButton" type="button"  aria-hidden="true" onclick="applyOASFilter(this);return false;">Apply</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
