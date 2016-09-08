<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
<script type="text/javascript">
	var packageListDashboard = {},pifsActiveObj,pifsProcessFilter;
	/** @Function Name   : Jquery Ready Function 
	 *   @Description     : jquery ready function
	 *   @param           :
	 *   @returns         :
	 * */

	$(function () {
		var widgetStateId = $('#peak_instance_failure_summary').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf5;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_PIFS = defaults.chart8 + widgetStateId;
		$('#peak_instance_failure_summary').attr('id', divId_PIFS);
		$('#PIFSChartFilter').attr('id', "PIFSChartFilter"+widgetStateId);
		/**all possible charts*/
		var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9,defaults.swf13];
	    var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D", "Column chart 2D", "Pie chart 2D", "Doughnut chart 2D","Bar chart"];
	    $.each(possibleCharts, function (idx, value) {
			$('#PIFSChartFilter'+widgetStateId+' .chartType').append("<option value="+value+">"+possibleChartsNames[idx]+"</option>");
		});
		$('#PIFSChartFilter'+widgetStateId+' .chartType').chosen();
		$('#PIFSChartFilter'+widgetStateId+' .chartType').next().css('width',170);
	    var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessPIFSChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
	    var refreshIcon = "<a onclick=getPIFSChartData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
	    if ($("#" + divId_PIFS).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
	        $("#" + divId_PIFS).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
	        $("#" + divId_PIFS).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
	    }
	    $('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
		$('#PIFSChartFilter'+widgetStateId+' .startDate').on('change',function() {
			var fromDate = $('#PIFSChartFilter'+widgetStateId+' .startDate').val();
			var toDate = $('#PIFSChartFilter'+widgetStateId+' .endDate').val();
			if(fromDate > toDate)
				$('#PIFSChartFilter'+widgetStateId+' .endDate').val("");
			$('#PIFSChartFilter'+widgetStateId+' .endDate').datepicker('setStartDate',fromDate);
		});
		getPIFSChartData($("#" + divId_PIFS),widgetStateId);
	});

	/** @Function Name   : getPIFSChartData
	 *   @Description     : fetches the data from server
	 *   @param           : query fetch / refresh
	 *   @returns         :
	 * */
	function getPIFSChartData(obj, widId) {
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
			if (filterObject.since != undefined && filterObject.since != null)
				data.since = filterObject.since
			if (filterObject.until != undefined && filterObject.until != null)
				data.until = filterObject.until
			if (filterObject.groupBy != undefined && filterObject.groupBy != null)
				data.groupBy = filterObject.groupBy
			if (filterObject.process != undefined && filterObject.process != null)
				data.process = filterObject.process
			if(filterObject.activeProcess)
            	data.activeOnly = filterObject.activeProcess;
        	else
            	data.activeOnly = false;
		}
		sendAjaxCall('dashboard/widgets/peakInstanceFailureSummary', "POST", false, true, "json", data, PIFSErrorCall, function(responseData){
			clickRefresh(obj,false);
			if(responseData.error_message == undefined)
				populateInstanceFailureSummaryData(responseData, widgetStateId)
			else
				showErrorNotification(responseData.error_message);
		});
	}

	function PIFSErrorCall(e){
		if(e.responseText!=null && e.responseText!=undefined)
			showInformation(e.responseText);
		else
			showInformation($("#widgetAjaxErrorMsg").text());
		return false;
	}

	/**
	 * @Function Name : populateInstanceFailureSummaryData
	 * @Description   : creates a chart data for popluating it in to chart
	 * @param         : Json object,query fetch / refresh
	 * @returns       : chartData
	 * */
	function populateInstanceFailureSummaryData(data, widgetId) {
		var chartData = "";
		var widgetObject = getWidgetObject(widgetId);
		var filterObject = widgetObject.filter;
		var axisName;
		if(filterObject.groupBy != undefined && filterObject.groupBy != null && filterObject.groupBy != ""){
			axisName = filterObject.groupBy;
		}else {
			axisName = "HourOfDay";
		}
		if(!isObjectEmpty(data.instance_failure_summary))
		{
			chartData = '{"chart": {"showvalues": "1","showLabels":"1","canvasBorderThickness":"0","issliced":"0","bgColor":"FFFFFF,FFFFFF","showBorder":"0","canvasBgRatio":"100,0","showlegend": "1","xAxisName":"'+axisName+'","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9"},"data":[';
			var sortedArray = [];
	 		$.each(data.instance_failure_summary,function(idx,value) {
	 			var elements = {};
	 			elements.id = idx;
	 			elements.value = value;
	 			sortedArray[sortedArray.length] = elements;
	 		});
	 		sortedArray.sort(function(a,b) {
	 			return a.id-b.id;
	 		});
			$.each(sortedArray, function (idx, value) {
				var label;
				var nextHr = parseInt(value.id)+1
				if(filterObject.groupBy != undefined && filterObject.groupBy != null && filterObject.groupBy != ""){
					if(filterObject.groupBy == 'HourOfDay'){
						nextHr = nextHr.toString();
						if (value.id.length == 1)
							value.id = ("0" + value.id).slice(-2);
						if (nextHr.length == 1)
							nextHr = ("0" + nextHr).slice(-2);
						label = value.id+"-"+nextHr;
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
					label = value.id+"-"+nextHr;
				}
				chartData += '{"label":"' + label + '","value":"' + value.value + '"},';
			});
				chartData = chartData.substring(0, chartData.length - 1);
				chartData += ']}';
		}
		renderChart_PIFS(chartData, widgetId);
	}

		/** @Function Name   : renderChart_PIFS
	 *   @Description     : renders the actual chart
	 *   @param           : chart type, data to render
	 *   @returns         : chart
	 * */
	function renderChart_PIFS(data, widgetId) {
		var widgetObject = getWidgetObject(widgetId);
		var filterObject = widgetObject.filter;
	    var chartType_PIFS;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_PIFS = filterObject.chartType;
	    else 
	    	chartType_PIFS = defaults.swf5;
		FusionCharts.setCurrentRenderer('javascript');
		if (FusionCharts("PIFS" + widgetId) != undefined && FusionCharts("PIFS" + widgetId) != null)
			FusionCharts("PIFS" + widgetId).dispose();
		var InstancesSummaryChart = new FusionCharts("widgets/swf/" + chartType_PIFS, "PIFS" + widgetId);
		InstancesSummaryChart.setJSONData(data);
		data = InstancesSummaryChart.getJSONData();
		if(!isObjectEmpty(data)) 
		{

		if (chartType_PIFS.indexOf("Pie") != -1 || chartType_PIFS.indexOf("Doughnut") != -1) {
			data.chart.showlabels = 0;
			data.chart.showvalues = 0;
			data.chart.showlegend = 1;
		} else {
			data.chart.showlabels = 1;
			data.chart.showvalues = 1;
			data.chart.showlegend = 0;
		}
		if (chartType_PIFS.indexOf("2D") >= 0) {
			if (data.chart.pieradius == null) {
				data.chart.pieRadius = 60;
			}
		} else {
			delete data.chart.pieradius;
		}
	}
		InstancesSummaryChart.setJSONData(data);
		InstancesSummaryChart.setTransparent(true);
		InstancesSummaryChart.render(defaults.chart8 + widgetId);
	}

	/**
	 * @Function Name : updateData_PIFS
	 * @Description   : updates the data of chart
	 * @param         : chartdata
	 * @returns       : chart
	 * */
	function updateData_PIFS(chartData) {
		var chartRef = FusionCharts("PIFS" + tabId);
		chartRef.setJSONData(chartData);
	}

	function filterProcessPIFSChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#PIFSChartFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.since != undefined && filterObject.since != null){
	    		$('#PIFSChartFilter'+widgetStateId+' .startDate').val(filterObject.since);
	    		$('#PIFSChartFilter'+widgetStateId+' .endDate').datepicker('setStartDate',filterObject.since);
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
	    }
	    if(widgetObject != null){
			if (widgetObject.title != undefined && widgetObject.title != null)
	    		$(modalObj).find('.chartName').val(widgetObject.title);
		}
		addLoading($('#PIFSChartFilter .modal-body'));
		$("#PIFSChartFilter"+widgetStateId+" .groupBy").removeClass("chzn-done");
		$("#PIFSChartFilter"+widgetStateId+" .groupBy").removeAttr("style");
		$("#PIFSChartFilter"+widgetStateId+" .groupBy").next().remove();
		//$("#PICSChartFilter"+widgetStateId+" .groupBy option[value='-1']").attr('selected','selected');
		$('#PIFSChartFilter'+widgetStateId+' .groupBy').chosen();
		$('#PIFSChartFilter'+widgetStateId+' .groupBy').next().css('width',170);
		var data = {
		}
		sendAjaxCall('dashboard/filters/groupBy', "POST", false, true, "json", data, PIFSErrorCall, function(responseData){
			if(responseData.error_message == undefined)
				populateGroupByPIFS(responseData, widgetStateId, widgetObject);
			else
				showErrorNotification(responseData.error_message);
		});
		sendAjaxCall('dashboard/filters/processes', "POST", false, true, "json", data, PIFSErrorCall,
		function(responseData){
			if(responseData.error_message == undefined){
				pifsProcessFilter = responseData.process;
				populateProcessesPIFS(responseData, widgetStateId,widgetObject);
			}
			else
				showErrorNotification(responseData.error_message);
		});
		$(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
		$('#PIFSChartFilter'+widgetStateId+' .error-msg').text('');
		modalShow('PIFSChartFilter'+widgetStateId);
	}

	function populateGroupByPIFS(data, widgetStateId, widgetObject){
		$("#PIFSChartFilter"+widgetStateId+" .groupBy").removeClass("chzn-done");
		$("#PIFSChartFilter"+widgetStateId+" .groupBy").removeAttr("style");
		$("#PIFSChartFilter"+widgetStateId+" .groupBy").next().remove();
		$('#PIFSChartFilter'+widgetStateId+' .groupBy').empty();
		$('#PIFSChartFilter'+widgetStateId+' .groupBy').append('<option value="-1">Select</option>');
		$.each(data.groupBy,function(key,obj){
			$('#PIFSChartFilter'+widgetStateId+' .groupBy').append('<option value="'+obj+'">'+obj+'</option>');
		});
		if(widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
			var filterObject = widgetObject.filter;
			if (filterObject.groupBy != undefined && filterObject.groupBy != null){
	    		$("#PIFSChartFilter"+widgetStateId+" .groupBy").removeClass("chzn-done");
				$("#PIFSChartFilter"+widgetStateId+" .groupBy").removeAttr("style");
				$("#PIFSChartFilter"+widgetStateId+" .groupBy").next().remove();
	    		$("#PIFSChartFilter"+widgetStateId+" .groupBy").val(filterObject.groupBy).attr("selected","selected");
	    		$("#PIFSChartFilter"+widgetStateId+" .groupBy").chosen();
	    		$("#PIFSChartFilter"+widgetStateId+" .groupBy").next().css('width',170);
	    	}
		}
		$('#PIFSChartFilter'+widgetStateId+' .groupBy').chosen();
		$('#PIFSChartFilter'+widgetStateId+' .groupBy').next().css('width',170);
	}

	function populateProcessesPIFS(data,widgetStateId,widgetObject){
		$('#PIFSChartFilter'+widgetStateId+' .pkgClass').addClass('hide');
		if (widgetObject && widgetObject.filter){
			var filterObject = widgetObject.filter;
			pifsActiveObj = $('#PIFSChartFilter'+widgetStateId).find('.pifsActiveProc');
        	if(filterObject.activeProcess)
            	pifsActiveObj.prop('checked',filterObject.activeProcess);
        	else
            	pifsActiveObj.prop('checked',false);
            updatePifsPackages(pifsActiveObj);
		}
	}

	function updatePifsPackages(activeObj){
		var widgetStateId = $(activeObj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = widgetObject.filter,changedPackage='';
		var packObj = $("#PIFSChartFilter"+widgetStateId+" .packageList");
		var procObj = $("#PIFSChartFilter"+widgetStateId+" .processList");
		var pkg;
		packObj.removeClass("chzn-done");
		packObj.removeAttr("style");
		packObj.next().remove();
		procObj.removeClass("chzn-done");
		procObj.removeAttr("style");
		procObj.next().remove();
		packObj.empty();
		packObj.append('<option value="-1">Select Package</option>');
		packageListDashboard = {};
		$.each(pifsProcessFilter,function(key,obj){
			if(obj.package){
				if(($(activeObj).prop('checked') && obj.status==="ACTIVE") || !$(activeObj).prop('checked')){
					pkg = obj.id;
					packageListDashboard[pkg] = [];
					checkOptionAdded = false;
	        		if(filterObject.pkgId && pifsActiveObj.prop('checked')){
            			if(filterObject.pkgId == obj.id || String(filterObject.pkgId).split('/')[0]==String(obj.id).split('-')[0] || String(filterObject.pkgId).split('-')[0] === String(obj.id).split('-')[0]){
                            changedPackage=obj.id;
                            checkOptionAdded = true;
                            packObj.append('<option value="'+obj.id+'" selected=selected>'+obj.name+' ['+obj.version+']</option>');
                            $("#PIFSChartFilter"+widgetStateId+" .pkgClass").removeClass('hide');
                        }
            		}else if(filterObject.pkgId && filterObject.pkgId == obj.id){
                            changedPackage=obj.id;
                            checkOptionAdded = true;
                            packObj.append('<option value="'+obj.id+'" selected=selected>'+obj.name+' ['+obj.version+']</option>');
                            $("#PIFSChartFilter"+widgetStateId+" .pkgClass").removeClass('hide');
                    }
                    if(checkOptionAdded==false)
                    	packObj.append('<option value="'+obj.id+'">'+obj.name+' ['+obj.version+']</option>');
				}
			}else if(($(activeObj).prop('checked') && obj.status==="ACTIVE") || !$(activeObj).prop('checked'))
			packageListDashboard[pkg].push({name:obj.name,id:obj.id});
		});
		if(!filterObject.pkgId)
			packObj.val('-1').attr('selected','selected');
		if (filterObject.process){
			procObj.empty();
			$.each(packageListDashboard,function(key,obj){
				if(key === changedPackage){
					$.each(obj,function(key,ob){
						if(pifsActiveObj.prop('checked')){
                           if(ob.id==filterObject.process || filterObject.process.split('}')[1].split('-')[0]===String(ob.id).split('}')[1].split('-')[0]){
                                procObj.append('<option value="'+ob.id+'" selected>'+ob.name+'</option>');
                            }
                        }
                        else if(filterObject.process==ob.id){
                           procObj.append('<option value="'+ob.id+'" selected>'+ob.name+'</option>');
                        }
                        else{
                        	procObj.append('<option value="'+ob.id+'">'+ob.name+'</option>');
                        }
					});
				}
			});
	    }
	    packObj.chosen();
		packObj.next().css('width',410);
		procObj.chosen();
		procObj.next().css('width',410);
		removeLoading($('#PIFSChartFilter .modal-body'));
	}

	function populateProcessesBasedOnPackagePIFS(packageId){
		var widgetStateId = $(packageId).closest('.modal').find('.applyButton').attr('widgetId');
		var widgetObject = getWidgetObject(widgetStateId);
		var procObj = $("#PIFSChartFilter"+widgetStateId+" .processList");
		procObj.removeClass("chzn-done");
		procObj.removeAttr("style");
		procObj.next().remove();
		if($('#PIFSChartFilter'+widgetStateId+' .packageList').val() != -1)
			$("#PIFSChartFilter"+widgetStateId+" .pkgClass").removeClass('hide');
		else
			$("#PIFSChartFilter"+widgetStateId+" .pkgClass").addClass('hide');
		procObj.empty();
		procObj.append('<option value="-1">Select Process</option>');
		$.each(packageListDashboard,function(key,obj){
			if(key === $(packageId).val()){
				$.each(obj,function(key,ob){
					procObj.append('<option value="'+ob.id+'">'+ob.name+'</option>');
				});
			}
		});
		procObj.chosen();
		procObj.next().css('width',410);
	}

	function applyPIFSFilter(obj){
		var widgetStateId = $(obj).attr("widgetId");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = {};
	    var data = {};
	    var oldObject = JSON.parse( JSON.stringify( widgetObject.filter));
		delete oldObject.chartType;
	    var chartName = $('#PIFSChartFilter'+widgetStateId+' .chartName').val();
		var pkgId = $('#PIFSChartFilter'+widgetStateId+' .packageList').find('option:selected').val();
		var procId = $('#PIFSChartFilter'+widgetStateId+' .processList').find('option:selected').val();
		var grpBy = $('#PIFSChartFilter'+widgetStateId+' .groupBy').find('option:selected').val();
		var startDate = $('#PIFSChartFilter'+widgetStateId+' .startDate').val();
		var endDate = $('#PIFSChartFilter'+widgetStateId+' .endDate').val();
		var chartType = $('#PIFSChartFilter'+widgetStateId+' .chartType').find('option:selected').val();
		if(chartName == undefined || chartName == null || $.trim(chartName).length == 0){
			$('#PIFSChartFilter'+widgetStateId+' .error-msg').text($('#widgetChartNameErrorMsg').text());
			$('#PIFSChartFilter'+widgetStateId+' .chartName').focus();
		}else if(pkgId != -1 && procId == -1){
			$('#PIFSChartFilter'+widgetStateId+' .error-msg').text($('#widgetProcesErrorMsg').text());
		}else{
			if(pkgId != -1){
				filterObject.pkgId = pkgId;
			}
			if(procId != -1){
				filterObject.process = procId;
				data.process = procId;
			}
			if(startDate != undefined && startDate != ''){
				filterObject.since = startDate;
				data.since = startDate;
			}
			else delete data.since;
			if(endDate != undefined && endDate != ''){
				filterObject.until = endDate;
				data.until = endDate;
			}
			else delete data.until;
			if(chartType != undefined && chartType != null){
				filterObject.chartType = chartType;
			}
			if(grpBy != -1){
				filterObject.groupBy = grpBy;
				data.groupBy = grpBy;
			}
			
			var activeOnly = $('#PIFSChartFilter'+widgetStateId).find('.pifsActiveProc').prop('checked');
    		data.activeOnly = activeOnly;
    		filterObject.activeProcess = activeOnly;

			widgetObject.title = chartName;
			widgetObject.filter = filterObject;
			persistWidget(widgetObject);
			$('#PIFSChartFilter'+widgetStateId).modal('hide');
			$(obj).closest('.widget').find('.widget-name').text(chartName);
			var newObject = JSON.parse( JSON.stringify( filterObject ) )
			delete newObject.chartType;
			if (compareObjects(newObject,oldObject))
				changeChartTypePIFS(widgetStateId);
			else{
				clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/peakInstanceFailureSummary', "POST", false, true, "json", data, PIFSErrorCall, function(responseData){
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined)
						populateInstanceFailureSummaryData(responseData, widgetStateId)
					else
						showErrorNotification(responseData.error_message);
				});
			}
		}
	}
	function changeChartTypePIFS(widgetId){
		var chartRef = FusionCharts("PIFS" + widgetId);
		renderChart_PIFS(chartRef.getJSONData(),widgetId)
	}
$('.chartName').parent().prev().text($('#widgetChartName').text());
$('.packageList').parent().prev().text($('#widgetPackage').text());
$('.processList').parent().prev().text($('#widgetProcess').text());
$('.startDate').closest('td').prev().text($('#widgetFromDate').text());
$('.endDate').closest('td').prev().text($('#widgetToDate').text());
$('.chartType').parent().prev().text($('#widgetChartType').text());
$('.groupBy').parent().prev().text($('#widgetFilterGroupBy').text());
$('.applyButton').text($('#widgetFilterApply').text());
$('.pifsLabelActiveProcess').text($("#widgetActiveProcess").text());
</script>
</head>
	<div id='peak_instance_failure_summary' class="chart"></div>
	<div id="PIFSChartFilter" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<span class="modal_heading">Peak Instance Failure Summary</span>
				</div>
				<div class="modal-body">
					<span class="error-msg text-danger"></span>
					<table class="table noLines chartFilterTable">
						<tr><td></td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
						<tr class='pifsActiveProcess'>
	                        <td class='pifsLabelActiveProcess'></td>
	                        <td colspan="3">
	                        <label class="inline">
	                        <input onchange='updatePifsPackages(this)' type="checkbox" class="pifsActiveProc ace ace-switch ace-switch-5">
	                            <span class="lbl"></span>
	                        </label>
	                        </td>
                    	</tr>
						<tr>
							<td></td>
							<td colspan="3"><select class="packageList" onchange="populateProcessesBasedOnPackagePIFS(this)"></select></td>
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
							<td></td>
							<td>
							   <div class="input-group pull-left">
							   <input type="text" class="chartFilterDates endDate pull-left" data-date-format="yyyy-mm-dd">
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
							<td><select class="chartType"></select></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary btn-sm applyButton" type="button"  aria-hidden="true" onclick="applyPIFSFilter(this);return false;"></button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
