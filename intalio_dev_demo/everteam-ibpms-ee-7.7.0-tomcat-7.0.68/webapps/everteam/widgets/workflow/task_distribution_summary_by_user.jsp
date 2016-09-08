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
		var widgetStateId = $('#task_distribution_summary_by_user').closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
	    	var filterObject = {};
	    	filterObject.chartType = defaults.swf2;
	    	widgetObject.filter = filterObject;
	    	persistWidget(widgetObject);
	    }
	    var divId_UT = defaults.chart10  + widgetStateId;
		$('#task_distribution_summary_by_user').attr('id', divId_UT);
		$('#UTChartFilter').attr('id', "UTChartFilter"+widgetStateId);
		 /**all possible charts*/
		var possibleCharts=[defaults.swf1,defaults.swf2,defaults.swf10,defaults.swf11,defaults.swf14];
		var possibleChartsNames=["MSColumn 3D","Stacked Column 3D","MSColumn 2D","Stacked Column 2D","MSBar"];
		$('#UTChartFilter'+widgetStateId+' .chartTypes').empty();
	    $.each(possibleCharts, function (idx, value) {
	        $('#UTChartFilter'+widgetStateId+' .chartTypes').append('<option value="'+value+'">'+possibleChartsNames[idx]+'</option>');
	    });
	    $('#UTChartFilter'+widgetStateId+' .chartTypes').chosen();
	    $('#UTChartFilter'+widgetStateId+' .chartTypes').next().css('width',170);
		var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterProcessUTChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
		var refreshIcon = "<a onclick=getUTData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
		if($("#"+divId_UT).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
			$("#"+divId_UT).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
			$("#"+divId_UT).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
		}
		validateList(widgetStateId,"user",getUTData);
		$('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
		$('#UTChartFilter'+widgetStateId+' .fromDate').on('change',function() {
			var fromDate = $('#UTChartFilter'+widgetStateId+' .fromDate').val();
			var toDate = $('#UTChartFilter'+widgetStateId+' .toDate').val();
			if(fromDate > toDate)
				$('#UTChartFilter'+widgetStateId+' .toDate').val("");
			$('#UTChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
		});
	});
	
	/** @Function Name   : getUTData
	*   @Description     : fetches the data from server
	*   @param           : query fetch / refresh
	*   @returns         :
	* */
	
	function getUTData(obj,widId)
	{
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
	    		data.since = filterObject.fromDate;
	    	if (filterObject.toDate != undefined && filterObject.toDate != null)
	    		data.until = filterObject.toDate;
	    	if (isUserFilterAccessible){
		    	if (filterObject.user != undefined && filterObject.user != null)
		    		data.user = filterObject.user;
		    }
	    }
		sendAjaxCall('dashboard/widgets/userTaskDistributionSummary', "POST", false, true, "json", data, UTCErrorCall, function(responseData){
			clickRefresh(obj,false);
			if(responseData.error_message == undefined )
	    		populateUserTaskCnt(responseData,widgetStateId);
	    	else
	    		showErrorNotification(responseData.error_message);
		});
	}
	function filterProcessUTChart(obj){
	    var widgetStateId = $(obj).closest('.widget').attr("id");
	    var widgetObject = getWidgetObject(widgetStateId);
	    var modalObj = $('#UTChartFilter'+widgetStateId);
	    $(modalObj).find('.chartFilterTable .error-Msg').addClass('hide');
	    if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
	        var filterObject = widgetObject.filter;
	        if (filterObject.fromDate != undefined && filterObject.fromDate != null){
	            $(modalObj).find('.fromDate').val(filterObject.fromDate);
	            $('#UTChartFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);
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
	    if(widgetObject != null) {
	        if (widgetObject.title != undefined && widgetObject.title != null)
	            $(modalObj).find('.chartName').val(widgetObject.title);
	    }
	    $(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
	    modalShow('UTChartFilter'+widgetStateId);
	    if (isUserFilterAccessible){
	    	addLoading($(modalObj).find('.modal-body'));
		    $('#loading').css('margin-top',30);
			populateUTFilter(widgetStateId);
		} else {
			$(modalObj).find('.UTCRoles').closest('tr').remove();
			$(modalObj).find('.UTCUsers').closest('tr').remove();
		}
	}
	function populateUTFilter(widgetStateId){
		var widgetObject = getWidgetObject(widgetStateId);
	    var modalObj = $('#UTChartFilter'+widgetStateId);
	    $(modalObj).find('.UTCUsers').removeAttr('style').removeClass('chzn-done');
	    $(modalObj).find('.UTCUsers').next().remove();
	    $(modalObj).find('.UTCUsers').empty();
	    var subordinates =  subordinateList;
	    var peers        =  peersList;
		var subOrdinatesGroup="<optgroup label='Subordinate(s)'>",peersGroup="<optgroup label='Peer(s)'>"
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
	        if (filterObject.user != undefined && filterObject.user != null){
	            $(modalObj).find('.UTCUsers').val(filterObject.user);
	        }
	    }
	    $(modalObj).find('.UTCUsers').attr('widgetId',widgetStateId);
	    $(modalObj).find('.UTCUsers').chosen();
	    $(modalObj).find('.UTCUsers').next().css('width',410);
	    $(modalObj).find('.UTCUsers').next().find('li.search-field input').css('width',250);
	    $(modalObj).find('.UTCUsers').next().find('li.search-field input').css('height',25);
	    removeLoading($(modalObj).find('.modal-body'));
	    
	}
	
	function applyUTFilter(obj){
		var widgetStateId = $(obj).attr("widgetId");
	    var widgetObject = getWidgetObject(widgetStateId);
	    var filterObject = {};
	    var modalObj = $(obj).closest('.modal');
	    var data = {};
	    var oldObject = JSON.parse(JSON.stringify(widgetObject.filter));
		delete oldObject.chartType;
	    var checkModalName = true;
	    var checkUser = true;
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
	    if ($(modalObj).find('.chartName').val() != undefined && $(modalObj).find('.chartName').val() != null && $.trim($(modalObj).find('.chartName').val()) != ''){
	            widgetObject.title = $(modalObj).find('.chartName').val();
	            $('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val()); 
	    } else {
	        $(modalObj).find('.error-Msg').text($('#widgetChartNameErrorMsg').text());
	        $(modalObj).find('.error-Msg').removeClass('hide');
	        $(modalObj).find('.chartName').focus();
	        return false;
	    }
	    if ($(modalObj).find('.UTCUsers').val() != undefined  && $(modalObj).find('.UTCUsers').val() != ''){
	            filterObject.user = $(modalObj).find('.UTCUsers').val();
	            data.user = $(modalObj).find('.UTCUsers').val();
	    }
	    widgetObject.filter = filterObject;
	    persistWidget(widgetObject);
        $('#UTChartFilter'+widgetStateId).modal('hide');
        var newObject = JSON.parse(JSON.stringify(filterObject));
		delete newObject.chartType;
		if(compareObjects(newObject,oldObject))
			changeChartType_UT(widgetStateId);
        else{
				clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
				sendAjaxCall('dashboard/widgets/userTaskDistributionSummary', "POST", false, true, "json", data, UTCErrorCall, function(responseData){
					clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
					if(responseData.error_message == undefined )
						populateUserTaskCnt(responseData,widgetStateId);
					else
					showErrorNotification(responseData.error_message);
					$("#"+widgetStateId).find(".widgetFilterMessage").remove();
				});
			} 
	}
	function removeErrorMsgUTC(obj){
		 $(obj).closest('table').find('error-Msg').addClass('hide');
	}
	function UTCErrorCall(e)
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
	function populateUserTaskCnt(data, widgetId) {
		var dataArray=new Object();
		var chartData = "";
		if(!isObjectEmpty(data.ready_claim_task_summary) && data.ready_claim_task_summary.length>0)
		{
			chartData = '{"chart": {"showvalues": "0","canvasBorderThickness":"0","issliced":"0","bgColor":"FFFFFF,FFFFFF","showBorder":"0","canvasBgRatio":"100,0","showlegend": "1","paletteColors":"69AA46,FF892A","useroundedges": "1", "showalternatevgridcolor": "1","canvasbgcolor":"#fafbf9"},';
			var catagories = '"categories": [{"category": [';
			var readyData='{"seriesname": "Ready","data": [';
			var claimedData = '{"seriesname": "Claimed","data": [';
			$.each(data.ready_claim_task_summary,function(idx,value){
				if(dataArray[value.User] == null){
					dataArray[value.User]=new Object();
					if(value.User!=undefined){
						var userObj = [];
						if(data.name!=undefined && data.name!=null)
							userObj = $.grep(data.name, function(e){return e.userID == value.User});
						if(userObj.length>0)
							dataArray[value.User].NAME = userObj[0].userName;
						else
							dataArray[value.User].NAME=value.User.replace(/\\/gi,"/");
					}
					dataArray[value.User].READY=0;
					dataArray[value.User].CLAIMED=0;
				}
				if (value.State == "READY"){
					dataArray[value.User].READY = value.Count;
				}
				if (value.State == "CLAIMED"){
					dataArray[value.User].CLAIMED = value.Count;
				}
			});
			$.each(dataArray,function(idx,value){
				catagories += '{ "label":"'+value.NAME+'"},';
				readyData += '{ "value":"'+value.READY+'"},';
				claimedData += '{ "value":"'+value.CLAIMED+'"},';
			});
			catagories=catagories.substring(0, catagories.length - 1);
			readyData=readyData.substring(0, readyData.length - 1);
			claimedData=claimedData.substring(0, claimedData.length - 1);
			catagories += ']}],';
			readyData += ']}';
			claimedData += ']}';
			chartData += catagories+ '"dataset": ['+ readyData +','+claimedData+ ']}';
		}
		renderChart_UT(chartData,widgetId);
	}
	
	/** @Function Name   : renderChart_UT
	*   @Description     : renders the actual chart
	*   @param           : chart type,data to render
	*   @returns         : chart
	* */
	
	function renderChart_UT(data,widgetId){	
		var widgetObject = getWidgetObject(widgetId);
	    var filterObject = widgetObject.filter;
	    var chartType_UT;
	    if (filterObject.chartType != undefined && filterObject.chartType != null)
	    	chartType_UT = filterObject.chartType;
	    else
			chartType_UT = defaults.swf2;
	    FusionCharts.setCurrentRenderer('javascript');
	    if(FusionCharts("UT"+widgetId)!=undefined && FusionCharts("UT"+widgetId)!=null)
			FusionCharts("UT"+widgetId).dispose();
	    var userTaskChart = new FusionCharts("widgets/swf/"+chartType_UT,"UT"+widgetId);
		userTaskChart.setJSONData(data);
		data=userTaskChart.getJSONData();
		if(!isObjectEmpty(data)) 
		{
		if (chartType_UT.indexOf("Pie") != -1 || chartType_UT.indexOf("Doughnut") != -1){
			data.chart.showlabels =0;
			data.chart.showvalues = 0;
			data.chart.showlegend =1;
		}
		else{
			data.chart.showlabels =1;
			data.chart.showvalues =1;
			data.chart.showlegend =0;
		}
		if (chartType_UT.indexOf("2D") >= 0){
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
		userTaskChart.render(defaults.chart10 + widgetId);		
	}
	
	function changeChartType_UT(widgetId){
		var chartRef = FusionCharts("UT" + widgetId);
		renderChart_UT(chartRef.getJSONData(),widgetId);
	}
	$('.chartName').parent().prev().text($('#widgetChartName').text());
	$('.UTCUsers').parent().prev().text($('#widgetFilterUsers').text());
	$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
	$('.toDate').closest('td').prev().text($('#widgetToDate').text());
	$('.chartTypes').parent().prev().text($('#widgetChartType').text());
	$('.applyButton').text($('#widgetFilterApply').text());
	</script>
</head>
<div id='task_distribution_summary_by_user' class="chart"></div>
<div id="UTChartFilter" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                    aria-hidden="true">&times;</button>
                <span class="modal_heading">Task Distribution Summary by Users</span>
            </div>
            <div class="modal-body">
                <table class="table noLines chartFilterTable">
                	<tr><td class="error-Msg text-danger hide" colspan="4"></td></tr>
                	<tr><td></td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
                    <tr>
	                        <td></td>
	                        <td colspan="3"><select multiple class="UTCUsers" data-placeholder="Select Users" onchange="removeErrorMsgUTC(this);"></select></td>
	                    </tr>
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
                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyUTFilter(this);return false;"></button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
