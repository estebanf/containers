<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<script type="text/javascript">
var roleUsersList;

$(function() 
{
	var widgetStateId = $('#vacationSummary').closest('.widget').attr("id");
    var widgetObject = getWidgetObject(widgetStateId);
    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){
        var filterObject = {};
        filterObject.chartType = defaults.swf3;
        widgetObject.filter = filterObject;
        persistWidget(widgetObject);
    }
    divId_vacation = 'vacationSummary' + widgetStateId;
    $('#vacationFilter').attr('id', "vacationFilter"+widgetStateId);
    $('#vacationSummary').attr('id',divId_vacation);
    
	var filterIcon = "&nbsp;<a href='#' class='filterIcon' onclick='filterVactionsChart(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>";
    var refreshIcon = "<a onclick=getVacationData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
    if ($("#" + divId_vacation).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0) {
        $("#" + divId_vacation).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);
        $("#" + divId_vacation).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);
    }
    //getAVGCompData("fetch",widgetStateId);
    $('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });
    validateList(widgetStateId,"user",getVacationData);
	$('#vacationFilter'+widgetStateId+' .fromDate').on('change',function() {
		var fromDate = $('#vacationFilter'+widgetStateId+' .fromDate').val();
		var toDate = $('#vacationFilter'+widgetStateId+' .toDate').val();
		if(fromDate > toDate)
			$('#vacationFilter'+widgetStateId+' .toDate').val("");
		$('#vacationFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);
	});
});

function getVacationData(obj,widId)
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
            data.startSince = filterObject.fromDate
        if (filterObject.toDate != undefined && filterObject.toDate != null)
            data.startUntil = filterObject.toDate
        if (isUserFilterAccessible){
            if (filterObject.user != undefined && filterObject.user != null)
                data.user = filterObject.user
        }
    }
	sendAjaxCall('dashboard/widgets/vacationSummary', "POST", false, false, "json", data, VSErrorCall, function(responseData){
        clickRefresh(obj,false);
        if(responseData.error_message == undefined)
            populateVacationData(responseData,widgetStateId);
        else
            showErrorNotification(responseData.error_message);
	});
}
function filterVactionsChart(obj){
	var widgetStateId = $(obj).closest('.widget').attr("id");
    var widgetObject = getWidgetObject(widgetStateId);
    var modalObj = $('#vacationFilter'+widgetStateId);
    $(modalObj).find('.chartFilterTable .error-Msg').addClass('hide');
    var data = {}; 
    if (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){
        var filterObject = widgetObject.filter;
        if (filterObject.fromDate != undefined && filterObject.fromDate != null)
            $(modalObj).find('.fromDate').val(filterObject.fromDate);
        else 
            $(modalObj).find('.fromDate').val('');
        if (filterObject.toDate != undefined && filterObject.toDate != null)
            $(modalObj).find('.toDate').val(filterObject.toDate);
        else 
            $(modalObj).find('.toDate').val('');
    } 
    if(widgetObject != null) {
        if (widgetObject.title != undefined && widgetObject.title != null)
            $(modalObj).find('.chartName').val(widgetObject.title);
    }
    $(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);
    modalShow('vacationFilter'+widgetStateId);
    if (isUserFilterAccessible){
        addLoading($(modalObj).find('.modal-body'));
        $('#loading').css('margin-top',30);
		populateVacationFilterData(widgetStateId);
    }
    else{
        $(modalObj).find('.vactionsRoles').closest('tr').remove();
        $(modalObj).find('.vactionsUsers').closest('tr').remove();
    }
}

function populateVacationFilterData(widgetStateId){
	var widgetObject = getWidgetObject(widgetStateId);
    var modalObj = $('#vacationFilter'+widgetStateId);
    $(modalObj).find('.vactionsUsers').removeAttr('style').removeClass('chzn-done');
    $(modalObj).find('.vactionsUsers').next().remove();
    $(modalObj).find('.vactionsUsers').empty();
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
	$(modalObj).find('.vactionsUsers').append(subOrdinatesGroup).append(peersGroup);
	if(widgetObject != null){
		var filterObject = widgetObject.filter;
		if (filterObject.user != undefined && filterObject.user != null)
			$(modalObj).find('.vactionsUsers').val(filterObject.user);
	}
    $(modalObj).find('.vactionsUsers').attr('widgetId',widgetStateId);
    $(modalObj).find('.vactionsUsers').chosen();
    $(modalObj).find('.vactionsUsers').next().css('width',410);
    $(modalObj).find('.vactionsUsers').next().find('li.search-field input').css('width',250);
    $(modalObj).find('.vactionsUsers').next().find('li.search-field input').css('height',25);
    removeLoading($(modalObj).find('.modal-body')); 
}

function applyVactionFilter(obj){
	var widgetStateId = $(obj).attr("widgetId");
    var widgetObject = getWidgetObject(widgetStateId);
    var filterObject = {};
    var modalObj = $(obj).closest('.modal');
    var data = {}
    var checkModalName = true;
    var checkUser = true;
   if ($(modalObj).find('.fromDate').val() != undefined && $(modalObj).find('.fromDate').val() != ''){
        data.startSince = $(modalObj).find('.fromDate').val();
        filterObject.fromDate = $(modalObj).find('.fromDate').val();
    } else 
        delete data.startSince;
    if ($(modalObj).find('.toDate').val() != undefined  && $(modalObj).find('.toDate').val() != ''){
        data.startUntil = $(modalObj).find('.toDate').val();
        filterObject.toDate = $(modalObj).find('.toDate').val();
    } else 
        delete data.startUntil;
    if ($(modalObj).find('.chartName').val() != undefined && $(modalObj).find('.chartName').val() != null && $.trim($(modalObj).find('.chartName').val()) != ''){
            widgetObject.title = $(modalObj).find('.chartName').val();
            $('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val()); 
    } else {
        $(modalObj).find('.error-Msg td').text($('#widgetChartNameErrorMsg').text());
        $(modalObj).find('.error-Msg').removeClass('hide');
        return false;
    }
    if ($(modalObj).find('.vactionsUsers').val() != undefined  && $(modalObj).find('.vactionsUsers').val() != ''){
		filterObject.user = $(modalObj).find('.vactionsUsers').val();
		data.user = $(modalObj).find('.vactionsUsers').val();
    }
    widgetObject.filter = filterObject;
    persistWidget(widgetObject);
    $('#vacationFilter'+widgetStateId).modal('hide');
    clickRefresh($('#'+widgetStateId).find('.widget-header'),true);
    sendAjaxCall('dashboard/widgets/vacationSummary', "POST", false, true, "json", data, VSErrorCall, function(responseData){ 
        clickRefresh($('#'+widgetStateId).find('.widget-header'),false);
        if(responseData.error_message == undefined)
            populateVacationData(responseData,widgetStateId) ;
        else
            showErrorNotification(responseData.error_message);
        $("#"+widgetStateId).find(".widgetFilterMessage").remove();
    });
      
}
function removeErrorMsgVacation(obj){
	 $(obj).closest('table').find('error-Msg').addClass('hide');
}

function VSErrorCall(e)
{
	if(e.responseText!=null && e.responseText!=undefined)
			showInformation(e.responseText);
	else
		showInformation($("#widgetAjaxErrorMsg").text());
	return false;
}

/**@Function Name : populateVacationData 
 * @Description     : Displays the vacation sumamry of all users.
 * @param           : data : Response of AJAX call.
 * @returns         : jquery datatable 
 * */
function populateVacationData(data,widgetId)
{
        var oTable;
        var i=0;
        var j=1;
        var showData = new Array(5);
        $('#vacationDashlet'+widgetId).remove();
        $('#vacationSummary'+widgetId).empty();
        var tempTable = $('#vacationDashlet').clone();
        $(tempTable).attr('id','vacationDashlet'+widgetId).removeClass('hide');
        $(tempTable).find('table').attr('id','vacationTable'+widgetId)
        $('#vacationSummary'+widgetId).append(tempTable);
        oTable = $('#vacationTable'+widgetId).dataTable({
                "sDom": "<'table_container't>",
                "bPaginate": false,
                "bStateSave": false,
                "bProcessing": false,
                "bFilter": false,
                "bSort":false,
                "aaSorting": [],
                "bInfo": false,
                "bDestroy":true,
                "aaData": [],
                "oLanguage": {
                               "sEmptyTable": "No vacation(s) found."
                             },
                "aoColumns": [
				{"sClass": "vacationHeader"},{"sClass": "vacationHeader"},{"sClass": "vacationHeader"},{"sClass": "vacationHeader"},{"sClass": "vacationHeader"}
                ]
        });
        if(!isObjectEmpty(data.vacation_summary))
		{
			$.each(data.vacation_summary, function(key, value) 
			{
					var i=0;
                    var userObj = $.grep(data.name, function(e){return e.userID == value.user});
                    if(userObj.length>0){
                       showData[i] = '<a class="noDecoration" user="'+value.user+'" onclick=javascript:showUserProfile(this)>'+userObj[0].userName+'</a>';
                       i++; 
                    }
                    else{
					   showData[i] = '<a class="noDecoration" user="'+data.vacation_summary[key].user+' "onclick=javascript:showUserProfile(this)>'+data.vacation_summary[key].user+'</a>';
                       i++;
                    }
					showData[i] = $.trim($.format.date(data.vacation_summary[key].fromDate, userPreferences.dateFormat));
                    i++;
                    showData[i] = $.trim($.format.date(data.vacation_summary[key].toDate, userPreferences.dateFormat));i++;
                    var userObj = $.grep(data.name, function(e){return e.userID == value.substitute});
                    if(userObj.length>0){
                        showData[i] = '<a class="noDecoration" user="'+value.substitute+' "onclick=javascript:showUserProfile(this)>'+userObj[0].userName+'</a>';i++;
                    }
					else{
                        showData[i] = '<a class="noDecoration" user="'+data.vacation_summary[key].substitute+'" onclick=javascript:showUserProfile(this)>'+data.vacation_summary[key].substitute+'</a>';i++;
                    }
					showData[i] = data.vacation_summary[key].description;i++;
					oTable.fnAddData(showData, true);   
			});
			oTable.fnDraw(true);
			oTable.fnAdjustColumnSizing();
			$('.dataTable').css('width','100%');
			$('#vacationSummary'+widgetId+' .row-fluid').remove();
		}
		$('.usr').text($('#widgetVacationUsr').text());
		$('.frm').text($('#widgetVacationFrom').text());
		$('.to').text($('#widgetVacationTo').text());
		$('.subs').text($('#widgetVacationSubstitute').text());
		$('.des').text($('#widgetVacationDescription').text());
		$('.chartName').parent().prev().text($('#widgetChartName').text());
		$('.vactionsRoles').parent().prev().text($('#widgetFilterRoles').text());
		$('.vactionsUsers').parent().prev().text($('#widgetFilterUsers').text());
		$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());
		$('.toDate').closest('td').prev().text($('#widgetToDate').text());
		$('.applyButton').text($('#widgetFilterApply').text());
} 
</script>
</head>	
<body>
	<div id="vacationSummary">
		
	</div>
    <div id="vacationDashlet" class="chart hide" style="overflow-y:auto;margin-left:0px;">
            <table id="vacationTable" class="table table-striped table-bordered table-hover vacationTable">
                <thead>
                 <tr>
                    <th class="usr"></th>
                    <th class="frm"></th>
                    <th class="to"></th>
                    <th class="subs"></th>
                    <th class="des"></th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

	<div id="vacationFilter" class="modal fade" tabindex="-1">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <button type="button" class="close" data-dismiss="modal"
	                    aria-hidden="true">&times;</button>
	                <span class="modal_heading">Vacation Summary</span>
	            </div>
	             <div class="modal-body">
	                <table class="table noLines chartFilterTable">
	                    <tr><td class="error-Msg text-danger hide" colspan="4"></td></tr>
	                    <tr><td></td><td colspan="3"><input type="text" class="chartName" maxlength="50"></td></tr>
	                    <tr>
	                        <td></td>
	                        <td colspan="3"><select multiple class="vactionsUsers" data-placeholder="Select Users" onchange="removeErrorMsgVacation(this);"></select></td>
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
	                </table>
	            </div>
	            <div class="modal-footer">
	                <button class="btn btn-primary btn-sm applyButton" type="button" aria-hidden="true" onclick="applyVactionFilter(this);return false;"></button>
	            </div>
	        </div>
	    </div>
	</div>
</body>
</html>
