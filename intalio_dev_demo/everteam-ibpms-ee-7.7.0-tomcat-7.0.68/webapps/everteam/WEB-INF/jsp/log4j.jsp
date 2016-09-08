 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
</head>
<body>
<script>

var levels ;
var configLogTable;

var logOptions = {
	"bPaginate": true,
	"bStateSave": true,
	"bInfo": true,
	"bFilter": true,
	"bLengthChange":true,
	"oLanguage": { "sSearch": "","sProcessing": "DataTables is currently busy"},
	"aLengthMenu": [[100,300,-1], [100,300,"All"]],
	"iDisplayLength": 100,
	"bRetrieve":true,
	"bAutoWidth": false,
	"sDom":"<'row'<'col-sm-6'><'col-sm-6'f>r><'table_container't><'row'<'col-sm-6'><'col-sm-6'pl>>",
	"aoColumns":
		[{"bSortable": false,"sClass": "center","sWidth":0.025},
		{"bSortable": false,"sClass": "alignLeft","sWidth":0.65},
		{"bSortable": false,"sClass": "alignLeft","sWidth":0.35}],
	"fnDrawCallback":function(o){
			addLoading($('.page-content'));
			setTimeout(function() {
				removeLoading();
			},500);
		}
	};

$(document).ready(function () {
	configLogTable = $("#configureLog").dataTable(logOptions);
	$('.dataTables_empty').html("Fetching log4j configuration record(s)...");
	var vTable_wrapper = '#configureLog_wrapper .row .col-sm-6:first';
	$(vTable_wrapper).append("<button type='button' id='updateLog' onclick='javascript:setGroupLogLevel();' class='btn btn-sm btn-white' title='<fmt:message key='utilities_configure_log4j_table_button_update_tooltip'/>'><i class='fa fa-edit'></i>&nbsp;<fmt:message key='utilities_configure_log4j_table_button_update'/></button>&nbsp;");
	$(vTable_wrapper).append("<span id='groupLevelSelectId'><fmt:message key='utilities_configure_log4j_table_select_group_level'/>: <select id='all'></select></span>");
	customTable('configureLog');
	$('.tableButtons').removeClass('col-sm-9').addClass('col-sm-7');
	$('#groupLevelSelectId').css('float','right');
	if($.browser.msie && $.browser.version==='8.0')
		$('#groupLevelSelectId').css('padding-left',150);
	getLoggerList();
	/* Add a change handler to the select all checkbox */
	$('table tr th input:checkbox').change( function() {
		updateCheckbox(this);
	});
	$('#all').change(function() {
		if($('#all').val()!=-1){
			$("#configureLog input:checkbox:checked ").map(function(){
				var index = $(this).val();
				$('#'+index).val($('#all').val());
			});
		}
	});
});

 /**
 * @Function Name   : fillGroupLogLevels
 * @Description     : This method is to populate common log level options.
 * @param           : levels array
 **/
function fillGroupLogLevels(levels){
	var selectedLevel = $("#all").val();
	$("#all").empty();
	$("#all").append("<option value='-1'>Choose Level</option>");
	$.each(levels, function(key, value){
		var option = '';
		if(selectedLevel == value)
			option = '<option value="'+value+'" selected="selected">'+value+'</option>';
		else
			option = "<option value=\""+value+"\">"+value+"</option>";
		$("#all").append(option);
	});
	$("#all").chosen();
	$("#all_chzn").css("width",150);
	$('#all_chzn .chzn-single').css('height',28);
}

 /**
 * @Function Name   : setGroupLogLevel
 * @Description     : This method is to set common log level.
 **/
function setGroupLogLevel() {
	var columnsData = getSelectedRows(configLogTable,true);
	if(columnsData.length<=0) {
		showInformation('<fmt:message key="utilities_configure_log4j_table_select_one_or_more_classes"/>');
	} else if(columnsData.length>0) {
		var loggers = [];
		$.each(columnsData, function(key, val) {
			var id = $(val[2]).attr('id');
			var logger = {name:val[1],level:$('#'+id).val()};
			loggers.push(logger);
		});
		setLogLevel(JSON.stringify(loggers));
	}
	removeChosen("all");
	fillGroupLogLevels(levels);
}

 /**
 * @Function Name   : getLoggerList 
 * @Description     : This method is use to get logger list. 
 * @param           : 
 * @returns         : 
 * */
function getLoggerList(){
	addLoading($('#configureLog'));
	var data = {
	};
	sendAjaxCall('console/files/loggers?levelSort=true', "GET", false, true, "json", data, handlelog4jAjaxError, populateLoggerList);
}

 /**
 * @Function Name   : populateLoggerList 
 * @Description     : This method is use to populate logger list. 
 * @param           : 
 * @returns         : 
 * */
function populateLoggerList(data){
	if(data != null && data !=""){
		configLogTable.fnClearTable();
		levels = data.logLevel;
		fillGroupLogLevels(levels);
		var index = 0;
		$.each(data.logger, function(key, value){
			var items = [];
			items[items.length] = "<label class='position-relative'><input type='checkbox' class='ace logSelected' id='logSelected' onclick='updateHeaderCheckbox(this);' value='"+index+"'> <span class='lbl'></span></label>";
			items[items.length] = value.name;
			items[items.length] = getSelectionObject(index, value.level);
			configLogTable.fnAddData(items, false);
			index++;
		});
	}
	configLogTable.fnDraw(true);
	configLogTable.fnSort( [ [1,'asc'] ] );
	$('#configureLog input:checkbox').removeAttr('checked');
	$('#configureLog thead tr th').removeClass("sorting_asc").removeClass("sorting");
	$('#configureLog_filter a').remove();
	$('#configureLog_filter').append(refreshButton());
	removeLoading($('#configureLog'), false);
	applyNiceScroll($('#configureLog_wrapper ').find('.table_container'),200);
}

 /**
 * @Function Name   : getSelectionObject 
 * @Description     : This method is use to get select box object. 
 * @param           : 
 * @returns         : 
 * */
function getSelectionObject(id, level){
	var obj = '<select id="'+id+'" onChange="selectCheckbox(this);">';
	$.each(levels, function(key, row){
		if(level == row)
			obj += '<option value="'+row+'" selected>'+row+'</option>';
		else
			obj += '<option value="'+row+'">'+row+'</option>';
	});
	obj += '</select>';
	return obj;
}

function selectCheckbox(obj) {
	$(obj).closest('tr').addClass('row_selected');
	$(obj).closest('tr').find('input:checkbox').prop('checked', true);
}
 /**
 * @Function Name   : setLogLevel 
 * @Description     : This method is use to set the log level. 
 * @param           : 
 * @returns         : 
 * */
function setLogLevel(loggers){
	addLoading($('#configureLog'));
	var data = {
		loggers: loggers
	};
	sendAjaxCall('console/files/loggers', "POST", false, true, "json", data, handlelog4jAjaxError, changesLogStatus);
	
}

 /**
 * @Function Name   : changesLogStatus 
 * @Description     : This method is use to change the log level. 
 * @param           : 
 * @returns         : 
 * */
function changesLogStatus(data){
	getLoggerList();
	removeLoading($('#configureLog'), false);
	showNotification(data.success_message);
}

 /**
 * @Function Name   : refreshButton 
 * @Description     : This method is use to add refresh button. 
 * @param           : 
 * @returns         : 
 * */
function refreshButton(){
	var iconButton = '<a title=<fmt:message key="org_intalio_uifw_tabls_refresh"/> class="btn btn-sm btn-white table_refresh_icon" onclick=getLoggerList();><i class="fa fa-refresh"></i></a>';
	return iconButton;
}

/**
 * @Function Name   : handlelog4jAjaxError 
 * @Description     : handles all the error response for ajax calls in Log4j page
 * @param           : 
 * @returns         : 
 * */
function handlelog4jAjaxError(e){
	showInformation("Error status="+e.status+"  " + e);
	removeLoading('', true);
	return false;
}
</script>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;<li><fmt:message key='com_intalio_bpms_module_administration_logging'/>&nbsp;&nbsp;</li>
		<li class="active"><a href="#" class="noDecoration" onclick="javascript:getLoggerList();"><fmt:message key='com_intalio_bpms_module_administration_logging_log4j'/></a></li>
	</ul>
</div>
<div class="page-content">
	<div class="row">
		<div class="col-xs-12">
			<div class="table-responsive">
				<table id="configureLog" class="table table-bordered ">
					<thead>
						<tr>
							<th><label class="position-relative"><input type="checkbox" class="ace"><span class="lbl"></span></label></th>
							<th><fmt:message key="utilities_configure_log4j_table_header_class"/></th>
							<th><fmt:message key="utilities_configure_log4j_table_header_level"/></th>
						</tr>
					</thead>
					<tbody id=''>
					</tbody>
				</table>
			</div> 
			</form>
		</div>
	</div>
</div>
</body>
</html>
