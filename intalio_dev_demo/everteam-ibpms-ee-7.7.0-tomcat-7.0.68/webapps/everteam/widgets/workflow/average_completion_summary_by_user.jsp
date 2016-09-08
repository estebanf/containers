<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<body>
<script type="text/javascript">
	/** ACSBU in this script refers to task completion summary by user*/
	/** @Function Name    : Jquery Ready Function 
	*   @Description      : jquery ready function
	*   @param            :
	*   @returns          :
	**/
	$(function () {
		var widgetStateId = $('#average_completion_summary_by_user').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf8;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_ACSBU = defaults.chart12 + widgetStateId;
		$('#average_completion_summary_by_user').attr('id', divId_ACSBU);
		$('#ACSBUChartFilter').attr('id', "ACSBUChartFilter"+widgetStateId);
		/**all possible charts*/
		var possibleCharts = [defaults.swf3, defaults.swf4, defaults.swf5, defaults.swf7, defaults.swf8, defaults.swf9,defaults.swf13];
		var possibleChartsNames = ["Column chart 3D", "Pie chart 3D", "Doughnut chart 3D", "Column chart 2D", "Pie chart 2D", "Doughnut chart 2D","Bar chart"];
		$('#ACSBUChartFilter'+widgetStateId+' .chartTypes').empty();
	    $.each(possibleCharts, function (idx, value) {
	        $('#ACSBUChartFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
	    });
	    $('#ACSBUChartFilter'+widgetStateId+' .chartTypes').chosen();
	    $('#ACSBUChartFilter'+widgetStateId+' .chartTypes').next().css('width',170);
		var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessACSBUChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
		var refreshIcon = "<a onclick=getACSBUChartData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
		if ($("#" + divId_ACSBU).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
			$("#" + divId_ACSBU).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
			$("#" + divId_ACSBU).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
		}
		validateList(widgetStateId,"user",getACSBUChartData);
		$('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
		$('#ACSBUChartFilter'+widgetStateId+' .fromDate').on('change',function() {
			var fromDate = $('#ACSBUChartFilter'+widgetStateId+' .fromDate').val();
			var toDate = $('#ACSBUChartFilter'+widgetStateId+' .toDate').val();
			if(fromDate > toDate)
				$('#ACSBUChartFilter'+widgetStateId+' .toDate').val("");
			$('#ACSBUChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
		});
	});

	/** @Function Name   : getACSBUChartData
	*   @Description     : fetches the data from server
	*   @param           : query fetch / refresh
	*   @returns         :
	**/

	function getACSBUChartData(obj,widId) {
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
	    	if (isUserFilterAccessible){
		    	if (filterObject.user != undefined && filterObject.user != null)
		    		data.user = filterObject.user
		    }
	    }
		sendAjaxCall('dashboard/widgets/userAverageTaskCompletionSummary', "POST", false, false, "json", data, ACSBUErrorCall, function(responseData){
			clickRefresh(obj,false);
			if(responseData.error_message == undefined)
	    		populateAverageTaskCompletionSummary(responseData,widgetStateId);
	    	else
	    		showErrorNotification(responseData.error_message);
		});
	}
	function filterProcessACSBUChart(obj){
		var widgetStateId = $(obj).closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		var modalObj = $('#ACSBUChartFilter'+widgetStateId);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	    	var filterObject = widgetObject.filter;
	    	if (filterObject.fromDate != undefined && filterObject.fromDate != null){
	    		$(modalObj).find('.fromDate').val(filterObject.fromDate);
	    		$('#ACSBUChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
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
	    if (widgetObject != null){
	    	if (widgetObject.title != undefined && widgetObject.title != null)
	    		$(modalObj).find('.chartName').val(widgetObject.title);
	    }
	    modalShow('ACSBUChartFilter'+widgetStateId);
	    if (isUserFilterAccessible){
		    addLoading($(modalObj).find('.modal-body'));
		    $('#loading').css('margin-top',30);
			populateUsers(widgetStateId);
		}
		else
        	$(modalObj).find('.UTCUsers').closest('tr').remove();
	    $(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
	    $(modalObj).find('.error-Msg').addClass('hide');
	}

	function populateUsers(widgetStateId){
		var widgetObject = getWidgetObject(widgetStateId);
	    var modalObj = $('#ACSBUChartFilter'+widgetStateId);
	    $(modalObj).find('.UTCUsers').removeAttr('style').removeClass('chzn-done');
	    $(modalObj).find('.UTCUsers').next().remove();
	    $(modalObj).find('.UTCUsers').empty();
		var subordinates =  subordinateList;
	    var peers        =  peersList;
	    var subOrdinatesGroup="<optgroup label='Subordinate(s)'>",peersGroup="<optgroup label='Peer(s)'>";
	    for (var k=0;k<subordinates.length;k++){
			$.each(peers, function(key,value){
                    if (value!=undefined && value.userID == subordinates[k].userID)
                    	peers.splice(key, 1);
                });
		}
		$.each(subordinates,function(key,value){
			subOrdinatesGroup+=("<option value="+value.userID+">"+value.userName+"</option>");
		});
		subOrdinatesGroup+=("</optgroup>");
		$.each(peers,function(key,value){
			peersGroup+=("<option value="+value.userID+">"+value.userName+"</option>");
		});
		peersGroup+=("</optgroup>");
		$(modalObj).find('.UTCUsers').append(subOrdinatesGroup).append(peersGroup);
		if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	        var filterObject = widgetObject.filter;
	        if (filterObject.user != undefined && filterObject.user != null)
	            $(modalObj).find('.UTCUsers').val(filterObject.user);
	    }
	    $(modalObj).find('.UTCUsers').attr('widgetId',widgetStateId);
	    $(modalObj).find('.UTCUsers').chosen();
	    $(modalObj).find('.UTCUsers').next().css('width',410);
	    $(modalObj).find('.UTCUsers').next().find('li.search-field input').css('width',250);
	    $(modalObj).find('.UTCUsers').next().find('li.search-field input').css('height',25);
	    removeLoading($(modalObj).find('.modal-body'));
	}

	function applyACSBUFilter(obj){
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
        if ($(modalObj).find('.UTCUsers').val() != undefined  && $(modalObj).find('.UTCUsers').val() != ''){
			filterObject.user = $(modalObj).find('.UTCUsers').val();
			data.user = $(modalObj).find('.UTCUsers').val();
	    }
	    if ($(modalObj).find('.chartName').val() != undefined && $(modalObj).find('.chartName').val() != null && $.trim($(modalObj).find('.chartName').val()) != ''){
	    	widgetObject.title = $(modalObj).find('.chartName').val();
	    	$('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val());
		    widgetObject.filter = filterObject;
		    persistWidget(widgetObject);
		    $('#ACSBUChartFilter'+widgetStateId).modal('hide');
		    var newObject = JSON.parse(JSON.stringify(filterObject));
			delete newObject.chartType;
			if(compareObjects(newObject,oldObject))
				changeChartType_ACSBU(widgetStateId);
			else{
				clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/userAverageTaskCompletionSummary', "POST", false, true, "json", data, ACSBUErrorCall, function(responseData){
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined )
						populateAverageTaskCompletionSummary(responseData,widgetStateId);
					else
						showErrorNotification(responseData.error_message);
					$("#"+widgetStateId).find(".widgetFilterMessage").remove();
				});
			}
	    }else {
	    	$(modalObj).find('.error-Msg').removeClass('hide');
	    	$(modalObj).find('.error-Msg').text($('#widgetChartNameErrorMsg').text());
	    	$(modalObj).find('.chartName').focus();
	    }
	}
	function ACSBUErrorCall(e)
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

	function populateAverageTaskCompletionSummary(data, widgetId) 
	{
		var chartData = "";
		if(!isObjectEmpty(data.average_task_completion_summary))
		{
			chartData = '{"chart": {"formatnumberscale": "0","showvalues": "1","showLabels":"1","canvasBorderThickness":"0","issliced":"0","showBorder":"0","bgColor":"FFFFFF,FFFFFF","canvasBgRatio":"100,0","showlegend": "1","yAxisName":"Seconds","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9"},"data":['
			$.each(data.average_task_completion_summary, function (key, value) {
				var user = key.replace(/\\/gi,"/");
				var userObj = $.grep(data.name, function(e){return e.userID == key});
				if(userObj.length>0)
					chartData += '{"label":"' + userObj[0].userName + '","value":"' + value + '"},';
				else
					chartData += '{"label":"' + user + '","value":"' + value + '"},';
	
			});
			chartData = chartData.substring(0, chartData.length - 1);
			chartData += ']}';
		}
		renderChart_ACSBU(chartData,widgetId);
	}
	
	/** @Function Name   : renderChart_ACSBU
	*   @Description     : renders the actual chart
	*   @param           : chart type,data to render
	*   @returns         : chart
	* */
	
	function renderChart_ACSBU(data,widgetId){
		var widgetObject = getWidgetObject(widgetId);
	    var filterObject = widgetObject.filter;
	    var chartType_ACSBU;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_ACSBU = filterObject.chartType;
	    else
			chartType_ACSBU = defaults.swf8;
	    FusionCharts.setCurrentRenderer('javascript');
	    if(FusionCharts("ACSBU"+widgetId)!=undefined && FusionCharts("ACSBU"+widgetId)!=null)
			FusionCharts("ACSBU"+widgetId).dispose();
	    var task_completion_summary_by_user = new FusionCharts("widgets/swf/"+chartType_ACSBU,"ACSBU"+widgetId);
		task_completion_summary_by_user.setJSONData(data);
		data=task_completion_summary_by_user.getJSONData();
		if(!isObjectEmpty(data)) 
		{
			if (chartType_ACSBU.indexOf("2D") >= 0){
				if(data.chart.pieradius == null){
					data.chart.pieRadius = 80;
				}
			}
			else{
				delete data.chart.pieradius;
			}
		}	
		task_completion_summary_by_user.setJSONData(data);
		task_completion_summary_by_user.setTransparent(true);
		task_completion_summary_by_user.render(defaults.chart12 + widgetId);		
	}

	function removeErrorMsgACTBU(obj){
		$(obj).closest('table').find('error-Msg').addClass('hide');
	}

	function changeChartType_ACSBU(widgetId){
		var chartRef = FusionCharts("ACSBU" + widgetId);
		renderChart_ACSBU(chartRef.getJSONData(),widgetId);
	}
	$('.chartName').parent().prev().text($('#widgetChartName').text());
	$('.UTCRoles').parent().prev().text($('#widgetFilterRoles').text());
	$('.UTCUsers').parent().prev().text($('#widgetFilterUsers').text());
	$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
	$('.toDate').closest('td').prev().text($('#widgetToDate').text());
	$('.chartTypes').parent().prev().text($('#widgetChartType').text());
	$('.groupBy').parent().prev().text($('#widgetFilterGroupBy').text());
	$('.applyButton').text($('#widgetFilterApply').text());

</script>
</head>
<div id='average_completion_summary_by_user' class="chart"></div>
<div id="ACSBUChartFilter" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">&times;</button>
                <span class="modal_heading">Average Completion Summary by User</span>
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
						<td colspan="3"><select multiple class="UTCUsers" data-placeholder="Select Users" onchange="removeErrorMsgACTBU(this);"></select></td>
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
                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyACSBUFilter(this);return false;"></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
