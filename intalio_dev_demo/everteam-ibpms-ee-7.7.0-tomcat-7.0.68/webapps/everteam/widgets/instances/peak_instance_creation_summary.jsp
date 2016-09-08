<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
<script type="text/javascript">
	var packageListDashboard = {},picsActiveObj,picsProcessFilter;
	/** @Function Name   : Jquery Ready Function 
	 *   @Description     : jquery ready function
	 *   @param           :
	 *   @returns         :
	 * */

	$(function () {
		var widgetStateId = $('#peak_instance_creation_summary').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf4;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_PICS = defaults.chart7 + widgetStateId;
		$('#peak_instance_creation_summary').attr('id', divId_PICS);
		$('#PICSChartFilter').attr('id', "PICSChartFilter"+widgetStateId);
		/**all possible charts*/
		var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9,defaults.swf13];
	    var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D", "Column chart 2D", "Pie chart 2D", "Doughnut chart 2D","Bar chart"];
	    $.each(possibleCharts, function (idx, value) {
			$('#PICSChartFilter'+widgetStateId+' .chartType').append("<option value="+value+">"+possibleChartsNames[idx]+"</option>");
		});
		$('#PICSChartFilter'+widgetStateId+' .chartType').chosen();
		$('#PICSChartFilter'+widgetStateId+' .chartType').next().css('width',170);
	    var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessPICSChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
	    var refreshIcon = "<a onclick=getPICSChartData(this); class='refreshChart'><i title='Refresh' class='fa fa-refresh'></i></a>";
	    if ($("#" + divId_PICS).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
	        $("#" + divId_PICS).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
	        $("#" + divId_PICS).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
	    }
	    $('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
	    $('#PICSChartFilter'+widgetStateId+' .startDate').on('change',function() {
			var fromDate = $('#PICSChartFilter'+widgetStateId+' .startDate').val();
			var toDate = $('#PICSChartFilter'+widgetStateId+' .endDate').val();
			if(fromDate > toDate)
				$('#PICSChartFilter'+widgetStateId+' .endDate').val("");
			$('#PICSChartFilter'+widgetStateId+' .endDate').datepicker('setStartDate',fromDate);
		});
		getPICSChartData($("#" + divId_PICS), widgetStateId);
	});

	/** @Function Name   : getPICSChartData
	 *   @Description     : fetches the data from server
	 *   @param           : query fetch / refresh
	 *   @returns         :
	 * */
	function getPICSChartData(obj,widId) {
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
		sendAjaxCall('dashboard/widgets/peakInstanceCreationSummary', "POST", false, true, "json", data, PICSErrorCall, function(responseData){
			clickRefresh(obj,false);
			if(responseData.error_message == undefined)
				populateInstanceCreationSummaryData(responseData, widgetStateId)
			else
				showErrorNotification(responseData.error_message);
		});
	}

	function PICSErrorCall(e){
		if(e.responseText!=null && e.responseText!=undefined)
			showInformation(e.responseText);
		else
			showInformation($("#widgetAjaxErrorMsg").text());
		return false;
	}

		/**
	 * @Function Name : populateInstanceCreationSummaryData
	 * @Description   : creates a chart data for popluating it in to chart
	 * @param         : Json object,query fetch / refresh
	 * @returns       : chartData
	 * */
	function populateInstanceCreationSummaryData(data, widgetId) {
		var chartData = "";
		var widgetObject = getWidgetObject(widgetId);
		var filterObject = widgetObject.filter;
		var axisName;
		if(filterObject.groupBy != undefined && filterObject.groupBy != null && filterObject.groupBy != ""){
			axisName = filterObject.groupBy;
		}else {
			axisName = "HourOfDay";
		}
		if(!isObjectEmpty(data.instance_creation_summary))
		{
			chartData = '{"chart": {"showvalues": "1","showLabels":"1","canvasBorderThickness":"0","issliced":"0","showBorder":"0","canvasBgRatio":"100,0","showlegend": "1","xAxisName":"'+axisName+'","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9"},"data":[';
			var sortedArray = [];
	 		$.each(data.instance_creation_summary,function(idx,value) {
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
		renderChart_PICS(chartData, widgetId);
	}

	/** @Function Name   : renderChart_PICS
	 *   @Description     : renders the actual chart
	 *   @param           : chart type, data to render
	 *   @returns         : chart
	 * */

	function renderChart_PICS(data, widgetId) {
		
		var widgetObject = getWidgetObject(widgetId);
		var filterObject = widgetObject.filter;
	    var chartType_PICS;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_PICS = filterObject.chartType;
	    else
	    	chartType_PICS = defaults.swf4;
		FusionCharts.setCurrentRenderer('javascript');
		if (FusionCharts("PICS" + widgetId) != undefined && FusionCharts("PICS" + widgetId) != null)
			FusionCharts("PICS" + widgetId).dispose();
		var InstancesSummaryChart = new FusionCharts("widgets/swf/" + chartType_PICS, "PICS" + widgetId);
		InstancesSummaryChart.setJSONData(data);
		data = InstancesSummaryChart.getJSONData();
		if(!isObjectEmpty(data)) 
		{
		if (chartType_PICS.indexOf("Pie") != -1 || chartType_PICS.indexOf("Doughnut") != -1) {
			data.chart.showlabels = 0;
			data.chart.showvalues = 0;
			data.chart.showlegend = 1;
		}
		else {
			data.chart.showlabels = 1;
			data.chart.showvalues = 1;
			data.chart.showlegend = 0;
		}
		if (chartType_PICS.indexOf("2D") >= 0) {
			if (data.chart.pieradius == null) {
				data.chart.pieRadius = 80;
			}
		} else {
			delete data.chart.pieradius;
		}
	}
		InstancesSummaryChart.setJSONData(data);
		InstancesSummaryChart.setTransparent(true);
		InstancesSummaryChart.render(defaults.chart7 + widgetId);
	}


	function filterProcessPICSChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#PICSChartFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.since != undefined && filterObject.since != null){
	    		$('#PICSChartFilter'+widgetStateId+' .startDate').val(filterObject.since);
	    		$('#PICSChartFilter'+widgetStateId+' .endDate').datepicker('setStartDate',filterObject.since);
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
		addLoading($('#PICSChartFilter .modal-body'));
		$('#loading').css('margin-top',30);
		$("#PICSChartFilter"+widgetStateId+" .groupBy").removeClass("chzn-done");
		$("#PICSChartFilter"+widgetStateId+" .groupBy").removeAttr("style");
		$("#PICSChartFilter"+widgetStateId+" .groupBy").next().remove();
		//$("#PICSChartFilter"+widgetStateId+" .groupBy option[value='-1']").attr('selected','selected');
		$('#PICSChartFilter'+widgetStateId+' .groupBy').chosen();
		$('#PICSChartFilter'+widgetStateId+' .groupBy').next().css('width',170);
		var data = {
		}
		sendAjaxCall('dashboard/filters/processes', "POST", false, true, "json", data, PICSErrorCall, function(responseData){
			if(responseData.error_message == undefined){
				picsProcessFilter = responseData.process;
				populateProcessesPICS(responseData, widgetStateId, widgetObject);
			}
			else
				showErrorNotification(responseData.error_message);
		});
		sendAjaxCall('dashboard/filters/groupBy', "POST", false, true, "json", data, PICSErrorCall, function(responseData){
			if(responseData.error_message == undefined)
				populateGroupBy(responseData, widgetStateId, widgetObject);
			else
				showErrorNotification(responseData.error_message);
		});
		$(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
		$('#PICSChartFilter'+widgetStateId+' .error-msg').text('');
		modalShow('PICSChartFilter'+widgetStateId);
	}

	function populateGroupBy(data, widgetStateId, widgetObject){
		$("#PICSChartFilter"+widgetStateId+" .groupBy").removeClass("chzn-done");
		$("#PICSChartFilter"+widgetStateId+" .groupBy").removeAttr("style");
		$("#PICSChartFilter"+widgetStateId+" .groupBy").next().remove();
		$('#PICSChartFilter'+widgetStateId+' .groupBy').empty();
		$('#PICSChartFilter'+widgetStateId+' .groupBy').append('<option value="-1">Select</option>');
		$.each(data.groupBy,function(key,obj){
			$('#PICSChartFilter'+widgetStateId+' .groupBy').append('<option value="'+obj+'">'+obj+'</option>');
		});
		if(widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
			var filterObject = widgetObject.filter;
			if (filterObject.groupBy != undefined && filterObject.groupBy != null){
	    		$("#PICSChartFilter"+widgetStateId+" .groupBy").removeClass("chzn-done");
				$("#PICSChartFilter"+widgetStateId+" .groupBy").removeAttr("style");
				$("#PICSChartFilter"+widgetStateId+" .groupBy").next().remove();
	    		$("#PICSChartFilter"+widgetStateId+" .groupBy").val(filterObject.groupBy).attr("selected","selected");
	    		$("#PICSChartFilter"+widgetStateId+" .groupBy").chosen();
	    		$("#PICSChartFilter"+widgetStateId+" .groupBy").next().css('width',170);
	    	}
		}
		$('#PICSChartFilter'+widgetStateId+' .groupBy').chosen();
		$('#PICSChartFilter'+widgetStateId+' .groupBy').next().css('width',170);
	}

	function populateProcessesPICS(data, widgetStateId, widgetObject){
		$('#PICSChartFilter'+widgetStateId+' .pkgClass').addClass('hide');
		if (widgetObject && widgetObject.filter){
			var filterObject = widgetObject.filter;
			picsActiveObj = $('#PICSChartFilter'+widgetStateId).find('.picsActiveProc');
        	if(filterObject.activeProcess)
            	picsActiveObj.prop('checked',filterObject.activeProcess);
        	else
            	picsActiveObj.prop('checked',false);
            updatePicsPackages(picsActiveObj);
		}
	}

	function updatePicsPackages(activeObj){
		var widgetStateId = $(activeObj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = widgetObject.filter,changedPackage='';
		var packObj = $("#PICSChartFilter"+widgetStateId+" .packageList");
		var procObj = $("#PICSChartFilter"+widgetStateId+" .processList");
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
		$.each(picsProcessFilter,function(key,obj){
			if(obj.package){
				if(($(activeObj).prop('checked') && obj.status==="ACTIVE") || !$(activeObj).prop('checked')){
					pkg = obj.id;
					packageListDashboard[pkg] = [];
					checkOptionAdded = false;
	        		if(filterObject.pkgId && picsActiveObj.prop('checked')){
            			if(filterObject.pkgId == obj.id || String(filterObject.pkgId).split('/')[0]==String(obj.id).split('-')[0] || String(filterObject.pkgId).split('-')[0] === String(obj.id).split('-')[0]){	
                            changedPackage=obj.id;
                            checkOptionAdded = true;
                            packObj.append('<option value="'+obj.id+'" selected=selected>'+obj.name+' ['+obj.version+']</option>');
                            $("#PICSChartFilter"+widgetStateId+" .pkgClass").removeClass('hide');
                        }
            		}else if(filterObject.pkgId && filterObject.pkgId == obj.id){
                            changedPackage=obj.id;
                            checkOptionAdded = true;
                            packObj.append('<option value="'+obj.id+'" selected=selected>'+obj.name+' ['+obj.version+']</option>');
                            $("#PICSChartFilter"+widgetStateId+" .pkgClass").removeClass('hide');
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
						if(picsActiveObj.prop('checked')){
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
		removeLoading($('#PICSChartFilter .modal-body'));
	}

	function populateProcessesBasedOnPackagePICS(packageId){
		var widgetStateId = $(packageId).closest('.modal').find('.applyButton').attr('widgetId');
		var widgetObject = getWidgetObject(widgetStateId);
		$("#PICSChartFilter"+widgetStateId+" .processList").removeClass("chzn-done");
		$("#PICSChartFilter"+widgetStateId+" .processList").removeAttr("style");
		$("#PICSChartFilter"+widgetStateId+" .processList").next().remove();
		if($('#PICSChartFilter'+widgetStateId+' .packageList').val() != -1)
			$("#PICSChartFilter"+widgetStateId+" .pkgClass").removeClass('hide');
		else
			$("#PICSChartFilter"+widgetStateId+" .pkgClass").addClass('hide');
		$('#PICSChartFilter'+widgetStateId+' .processList').empty();
		$('#PICSChartFilter'+widgetStateId+' .processList').append('<option value="-1">Select Process</option>');
		$.each(packageListDashboard,function(key,obj){
			if(key === $(packageId).val()){
				$.each(obj,function(key,ob){
					$('#PICSChartFilter'+widgetStateId+' .processList').append('<option value="'+ob.id+'">'+ob.name+'</option>');
				});
			}
		});
		$('#PICSChartFilter'+widgetStateId+' .processList').chosen();
		$('#PICSChartFilter'+widgetStateId+' .processList').next().css('width',410);
	}

	function applyPICSFilter(obj){
		var widgetStateId = $(obj).attr("widgetId");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = {};
	    var data = {};
	    var oldObject = JSON.parse( JSON.stringify( widgetObject.filter));
		delete oldObject.chartType;
	    var chartName = $('#PICSChartFilter'+widgetStateId+' .chartName').val();
		var pkgId = $('#PICSChartFilter'+widgetStateId+' .packageList').find('option:selected').val();
		var procId = $('#PICSChartFilter'+widgetStateId+' .processList').find('option:selected').val();
		var grpBy = $('#PICSChartFilter'+widgetStateId+' .groupBy').find('option:selected').val();
		var startDate = $('#PICSChartFilter'+widgetStateId+' .startDate').val();
		var endDate = $('#PICSChartFilter'+widgetStateId+' .endDate').val();
		var chartType = $('#PICSChartFilter'+widgetStateId+' .chartType').find('option:selected').val();
		if(chartName == undefined || chartName == null || $.trim(chartName).length == 0){
			$('#PICSChartFilter'+widgetStateId+' .error-msg').text($('#widgetChartNameErrorMsg').text());
			$('#PICSChartFilter'+widgetStateId+' .chartName').focus();
		}else if(pkgId != -1 && procId == -1){
			$('#PICSChartFilter'+widgetStateId+' .error-msg').text($('#widgetProcesErrorMsg').text());
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

			var activeOnly = $('#PICSChartFilter'+widgetStateId).find('.picsActiveProc').prop('checked');
    		data.activeOnly = activeOnly;
    		filterObject.activeProcess = activeOnly;

			$('#PICSChartFilter'+widgetStateId).modal('hide');
			widgetObject.title = chartName;
			widgetObject.filter = filterObject;
			persistWidget(widgetObject);
			$(obj).closest('.widget').find('.widget-name').text(chartName);
			var newObject = JSON.parse( JSON.stringify( filterObject ) )
			delete newObject.chartType;
			if (compareObjects(newObject,oldObject))
				changeChartTypePICS(widgetStateId);
			else{
				clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/peakInstanceCreationSummary', "POST", false, true, "json", data, PICSErrorCall, function(responseData){
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined)
						populateInstanceCreationSummaryData(responseData, widgetStateId);
					else
						showErrorNotification(responseData.error_message);
				});
			}
		}
	}
function changeChartTypePICS(widgetId){
	var chartRef = FusionCharts("PICS" + widgetId);
	renderChart_PICS(chartRef.getJSONData(),widgetId)
}
$('.chartName').parent().prev().text($('#widgetChartName').text());
$('.packageList').parent().prev().text($('#widgetPackage').text());
$('.processList').parent().prev().text($('#widgetProcess').text());
$('.startDate').closest('td').prev().text($('#widgetFromDate').text());
$('.endDate').closest('td').prev().text($('#widgetToDate').text());
$('.chartType').parent().prev().text($('#widgetChartType').text());
$('.groupBy').parent().prev().text($('#widgetFilterGroupBy').text());
$('.applyButton').text($('#widgetFilterApply').text());
$('.picsLabelActiveProcess').text($("#widgetActiveProcess").text());
</script>
</head>
	<div id='peak_instance_creation_summary' class="chart"></div>
	<div id="PICSChartFilter" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<span class="modal_heading">Peak Instance Creation Summary</span>
				</div>
				<div class="modal-body">
					<span class="error-msg text-danger"></span>
					<table class="table noLines chartFilterTable">
						<tr><td></td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
						<tr class='picsActiveProcess'>
	                        <td class='picsLabelActiveProcess'></td>
	                        <td colspan="3">
	                        <label class="inline">
	                        <input onchange='updatePicsPackages(this)' type="checkbox" class="picsActiveProc ace ace-switch ace-switch-5">
	                            <span class="lbl"></span>
	                        </label>
	                        </td>
                    	</tr>
						<tr>
							<td></td>
							<td colspan="3"><select class="packageList" onchange="populateProcessesBasedOnPackagePICS(this)"></select></td>
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
					<button class="btn btn-primary btn-sm applyButton" type="button"  aria-hidden="true" onclick="applyPICSFilter(this);return false;"></button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
