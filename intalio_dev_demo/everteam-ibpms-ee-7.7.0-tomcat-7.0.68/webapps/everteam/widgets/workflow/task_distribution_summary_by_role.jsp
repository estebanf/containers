<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
	<script type="text/javascript">
	/** @Function Name   : Jquery Ready Function 
	*   @Description     : jquery ready function
	*   @param           :
	*   @returns         :
	* */
	$(function() {
		var widgetStateId = $('#task_distribution_summary_by_role').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf7;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_RTDS = defaults.chart11 + widgetStateId;
		$('#task_distribution_summary_by_role').attr('id', divId_RTDS);
		$('#RTDSChartFilter').attr('id', "RTDSChartFilter"+widgetStateId);
		 /**all possible charts*/
		var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9,defaults.swf13];
		var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D", "Column chart 2D", "Pie chart 2D", "Doughnut chart 2D","Bar chart"];
		$('#RTDSChartFilter'+widgetStateId+' .chartTypes').empty();
	    $.each(possibleCharts, function (idx, value) {
	        $('#RTDSChartFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
	    });
	    $('#RTDSChartFilter'+widgetStateId+' .chartTypes').chosen();
	    $('#RTDSChartFilter'+widgetStateId+' .chartTypes').next().css('width',170);
		var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessRTDSChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
		var refreshIcon = "<a onclick=getRTDSData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
		if($("#"+divId_RTDS).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
			$("#"+divId_RTDS).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
			$("#"+divId_RTDS).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
		}
		validateList(widgetStateId,"role",getRTDSData);
		$('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
		$('#RTDSChartFilter'+widgetStateId+' .fromDate').on('change',function() {
			var fromDate = $('#RTDSChartFilter'+widgetStateId+' .fromDate').val();
			var toDate = $('#RTDSChartFilter'+widgetStateId+' .toDate').val();
			if(fromDate > toDate)
				$('#RTDSChartFilter'+widgetStateId+' .toDate').val("");
			$('#RTDSChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
		});
	});
	
	/** @Function Name   : getRTDSData
	*   @Description     : fetches the data from server
	*   @param           : query fetch / refresh
	*   @returns         :
	* */
	
	function getRTDSData(obj,widId)
	{
		clickRefresh(obj,true);
		var widgetStateId;
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
	    	if (isUserFilterAccessible){
		    	if (filterObject.role != undefined && filterObject.role != null)
		    		data.role = filterObject.role
		    }
	    }
		sendAjaxCall('dashboard/widgets/roleTaskDistributionSummary', "POST", false, true, "json", data, RTDSCErrorCall, function(responseData){
			clickRefresh(obj,false);
			if(responseData.error_message == undefined)
	    		populateRoleTaskCnt(responseData,widgetStateId);
	    	else
	    		showErrorNotification(responseData.error_message);
		});
	}
	function filterProcessRTDSChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#RTDSChartFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.fromDate != undefined && filterObject.fromDate != null){
	    		$(modalObj).find('.fromDate').val(filterObject.fromDate);
	    		$('#RTDSChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
			}
	    	else 
	    		$(modalObj).find('.fromDate').val('');
	    	if (filterObject.toDate != undefined && filterObject.toDate != null)
	    		$(modalObj).find('.toDate').val(filterObject.toDate);
	    	else 
	    		$(modalObj).find('.toDate').val('');
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
	    modalShow('RTDSChartFilter'+widgetStateId);
	    
	    if (isUserFilterAccessible){
	    	addLoading($(modalObj).find('.modal-body'));
	    	$('#loading').css('margin-top',30);
			populateRTDSFilter(widgetStateId);
		} else {
			$(modalObj).find('.RDTSUsersList').closest('tr').remove();
		}
	}
	function populateRTDSFilter(widgetStateId){
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#RTDSChartFilter'+widgetStateId);
		$(modalObj).find('.RDTSUsersList').empty();
		$(modalObj).find('.RDTSUsersList').next().remove();
		$(modalObj).find('.RDTSUsersList').removeClass('chzn-done').removeAttr('style');
		var internalRoles="<optgroup label='Internal Role(s)'>",externalRoles="<optgroup label='External Role(s)'>";
		$.each(internalRolesList,function(key,value){
			internalRoles+=("<option value="+value+">"+value+"</option>");
		});
		internalRoles+=("</optgroup>");
		$.each(externalRolesList,function(key,value){
			externalRoles+=("<option value="+value+">"+value+"</option>");
		});
		externalRoles+=("</optgroup>");
		$(modalObj).find('.RDTSUsersList').append(internalRoles).append(externalRoles);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	$(modalObj).find('.RDTSUsersList').val(filterObject.role);
	    }
		$(modalObj).find('.RDTSUsersList').chosen();
		$(modalObj).find('.RDTSUsersList').next().css('width',410);
		$(modalObj).find('.RDTSUsersList').next().find('li.search-field input').css('width',300).css('height',25);
		removeLoading($(modalObj).find('.modal-body'));
	}
	function applyRTDSFilter(obj){
		var widgetStateId = $(obj).attr("widgetId");
		var widgetObject = getWidgetObject(widgetStateId);
		var filterObject = {};
		var checkModalName = true;
		var modalObj = $(obj).closest('.modal');
	    var data = {};
	    var oldObject = JSON.parse(JSON.stringify(widgetObject.filter));
		delete oldObject.chartType;
	   if ($(modalObj).find('.fromDate').val() != undefined && $(modalObj).find('.fromDate').val() != ''){
	        data.since = $(modalObj).find('.fromDate').val();
	        filterObject.fromDate = $(modalObj).find('.fromDate').val();
	    } else 
	    	delete data.since;
	    if ($(modalObj).find('.toDate').val() != undefined  && $(modalObj).find('.toDate').val() != ''){
	        data.until = $(modalObj).find('.toDate').val();
	        filterObject.toDate = $(modalObj).find('.toDate').val();
	    } else 
	    	delete data.until;
	    if ($(modalObj).find('.chartTypes').val() != undefined && $(modalObj).find('.chartTypes').val() != null ){
	    	filterObject.chartType = $(modalObj).find('.chartTypes').val();
	    }
	    if ($(modalObj).find('.RDTSUsersList').val() != undefined  && $(modalObj).find('.RDTSUsersList').val() != ''){
	    	filterObject.role = $(modalObj).find('.RDTSUsersList').val();
	    	data.role = $(modalObj).find('.RDTSUsersList').val();
	    } else 
	    	delete data.role;
	    if ($(modalObj).find('.chartName').val() != undefined && $(modalObj).find('.chartName').val() != null && $.trim($(modalObj).find('.chartName').val()) != ''){
	            widgetObject.title = $(modalObj).find('.chartName').val();
	            $('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val()); 
	    } else {
	        checkModalName = false;
	    }
    	widgetObject.filter = filterObject;
	    persistWidget(widgetObject);
	    if (checkModalName){
		    $('#RTDSChartFilter'+widgetStateId).modal('hide');
		    var newObject = JSON.parse(JSON.stringify(filterObject));
			delete newObject.chartType;
			if(compareObjects(newObject,oldObject))
				changeChartType_RTDS(widgetStateId);
			else{
				clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/roleTaskDistributionSummary', "POST", false, true, "json", data, RTDSCErrorCall, function(responseData){
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined)
						populateRoleTaskCnt(responseData,widgetStateId);
					else
						showErrorNotification(responseData.error_message);
					$("#"+widgetStateId).find(".widgetFilterMessage").remove();
				});
			}
		}else {
			$(modalObj).find('.error-Msg').text($('#widgetChartNameErrorMsg').text());
	        $(modalObj).find('.error-Msg').removeClass('hide');
	        $(modalObj).find('.chartName').focus();
		}
	}
	
	function RTDSCErrorCall(e)
	{
		if(e.responseText!=null && e.responseText!=undefined)
			showInformation(e.responseText);
		else
			showInformation($("#widgetAjaxErrorMsg").text());
		return false;
	}
	
	/**
	 * @Function Name : populateUserTaskCnt
	 * @Description   : creates a chart data for popluating it in to chart
	 * @param         : Json object,query fetch / refresh
	 * @returns       : chartData
	 * */
	function populateRoleTaskCnt(data, widgetId) {
		var chartData = "";
		if(!isObjectEmpty(data.ready_claim_task_summary) && data.ready_claim_task_summary.length>0)
		{
			chartData = '{"chart": {"showvalues": "1","showLabels":"1","canvasBorderThickness":"0","issliced":"0","showBorder":"0","bgColor":"FFFFFF,FFFFFF","canvasBgRatio":"100,0","showlegend": "1","xAxisName":"Ready State","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9"},"data":['
			$.each(data.ready_claim_task_summary, function (idx, value) {
				var user = value.Role.replace(/\\/gi,"/");
				chartData += '{"label":"' + user + '","value":"' + value.Count + '"},';
			});
			chartData = chartData.substring(0, chartData.length - 1);
			chartData += ']}';
		}
		renderChart_RTDS(chartData,widgetId);
	}
	
	/** @Function Name   : renderChart_RTDS
	*   @Description     : renders the actual chart
	*   @param           : chart type,data to render
	*   @returns         : chart
	* */
	
	function renderChart_RTDS(data,widgetId){
		var widgetObject = getWidgetObject(widgetId);
	    var filterObject = widgetObject.filter;
	    var chartType_RTDS;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_RTDS = filterObject.chartType;
	    else
			chartType_RTDS = defaults.swf7;
	    FusionCharts.setCurrentRenderer('javascript');
	    if(FusionCharts("RTDS"+widgetId)!=undefined && FusionCharts("RTDS"+widgetId)!=null)
			FusionCharts("RTDS"+widgetId).dispose();
	    var userTaskChart = new FusionCharts("widgets/swf/"+chartType_RTDS,"RTDS"+widgetId);
		userTaskChart.setJSONData(data);
		data=userTaskChart.getJSONData();
		if(!isObjectEmpty(data)) 
		{
		if (chartType_RTDS.indexOf("Pie") != -1 || chartType_RTDS.indexOf("Doughnut") != -1){
			data.chart.showlabels =0;
			data.chart.showvalues = 0;
			data.chart.showlegend =1;
		}
		else{
			data.chart.showlabels =1;
			data.chart.showvalues =1;
			data.chart.showlegend =0;
		}
		if (chartType_RTDS.indexOf("2D") >= 0){
			if(data.chart.pieradius == null){
				data.chart.pieRadius = 80;
			}
		}
		else{
			delete data.chart.pieradius;
		}
	}	
		userTaskChart.setJSONData(data);
		userTaskChart.setTransparent(true);
		userTaskChart.render(defaults.chart11 +widgetId );		
	}
	
	function changeChartType_RTDS(widgetId){
		var chartRef = FusionCharts("RTDS" + widgetId);
		renderChart_RTDS(chartRef.getJSONData(),widgetId);
	}
	
	$('.chartName').parent().prev().text($('#widgetChartName').text());
	$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
	$('.RDTSUsersList').parent().prev().text($('#widgetFilterRoles').text());
	$('.toDate').closest('td').prev().text($('#widgetToDate').text());
	$('.chartTypes').parent().prev().text($('#widgetChartType').text());
	$('.limitValue').parent().prev().text($('#widgetFilterLimit').text());
	$('.applyButton').text($('#widgetFilterApply').text());
	</script>
</head>
<div id='task_distribution_summary_by_role' class="chart"></div>
<div id="RTDSChartFilter" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">&times;</button>
                <span class="modal_heading">Task Distribution Summary by Role</span>
            </div>
            <div class="modal-body">
                <table class="table noLines chartFilterTable">
                	<tr><td class="error-Msg text-danger hide" colspan="4"></td></tr>
                	<tr><td></td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
                	<tr><td></td><td colspan="3"><select multiple class="RDTSUsersList" data-placeholder="Select Roles"></select></td></tr>
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
                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyRTDSFilter(this);return false;"></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
