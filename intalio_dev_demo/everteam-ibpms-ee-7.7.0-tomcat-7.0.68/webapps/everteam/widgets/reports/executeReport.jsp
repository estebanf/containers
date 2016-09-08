<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<script type="text/javascript">
	var dataTableRef;
	var chartProperties = {
	"chart": {
		"caption": "",
		"subcaption": "",
		"yaxisname": "",
		"xaxisname": "",
		"bgcolor": "#FFFFFF",
		"showvalues": "1",
		"plotborderthickness": "3",
		"divlinecolor": "#CCCCCC",
		"yaxisvaluespadding": "25",
		"divlinealpha": "60",
		"canvasbasecolor": "#CCCCCC",
		"showcanvasbg": "0",
		"animation": "1",
		"palettecolors": "#008ee4,#6baa01,#f8bd19,#e44a00,#33bdda",
		"showcanvasborder": "0",
		"showLegend":"1",
		"legendPosition":"BOTTOM",
		"yAxisMinValue":"",
		"yAxisMaxValue":"",
		"showLabels":"1",
		"showBorder":"0"
	},
	"data": [
	]
},tableProperties = {
	"bPaginate": true,
	"bLengthChange":false,
	"iDisplayLength": 50,
	"bInfo": false,
	"bFilter": true,
	"bRetrieve": true,
	"oLanguage": {
		"sSearch": ""
	},
	"aoColumns": []
},rowGroupingProperties = {
	iGroupingColumnIndex:"",
	sGroupBy: "name",
	bExpandableGrouping: true,
	bHideGroupingColumn: true
},availableChartTypes = [{
    swf: 'Column3D.swf',
    title: 'Column chart 3D',
    birt_name: 'BAR',
    value : 'bar-1',
    dimension: 1,
    inner_radius : false
}, {
    swf: 'Pie3D.swf',
    title: 'Pie chart 3D',
    birt_name: 'PIE',
    value : 'pie-1',
    dimension: 1,
    inner_radius : false
}, {
    swf: 'Doughnut3D.swf',
    title: 'Doughnut chart 3D',
    birt_name: 'PIE',
    value : 'doughnut-1',
    dimension: 1,
    inner_radius : true
}, {
    swf: 'Line.swf',
    title: 'Line Chart',
    birt_name: 'LINE',
    value : 'line-1',
    dimension: 1,
    inner_radius : false
}, {
    swf: 'Column2D.swf',
    title: 'Column chart 2D',
    birt_name: 'BAR',
    value : 'bar-0',
    dimension: 0,
    inner_radius : false
}, {
    swf: 'Pie2D.swf',
    title: 'Pie chart 2D',
    birt_name: 'PIE',
    value : 'pie-0',
    dimension: 0,
    inner_radius : false
}, {
    swf: 'Doughnut2D.swf',
    title: 'Doughnut chart 2D',
    birt_name: 'PIE',
    value : 'doughnut-0',
    dimension: 0,
    inner_radius : true
}];
	$(function () {
		var widgetStateId = $('#executeReport').closest('.widget').attr("id");
		var widgetObject = getWidgetObject(widgetStateId);
		if (widgetObject.reportId !=undefined && widgetObject.reportId != null){
			var div_chart_id = "adhocReportChart"+widgetStateId;
			var div_table_id = "adhocReportTable"+widgetStateId;
			$('#executeReport').attr('id', div_chart_id);
			$('#adhocTableReport').attr('id', div_table_id);
			var refreshIcon = "<a onclick=getReportData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>";
			$("#"+div_chart_id).parent().prev().find('.widgetRefresh').replaceWith(refreshIcon);
			getReportData("fetch",widgetStateId,widgetObject);
		}
	});
	
	function getReportData(obj,widgetStateId,widgetObject){
		clickRefresh(obj,true);
		if ($(obj).length !=0 )
			widgetStateId = $(obj).closest('.widget').attr("id");
		else if (widgetStateId != null && widgetStateId != undefined)
			widgetStateId = widgetStateId;
		if(widgetObject==undefined)
			widgetObject = getWidgetObject(widgetStateId);
		sendAjaxCall(intalio_bpms.adhoc_reporting.get_reports+"/"+widgetObject.reportId+"?temp_id="+widgetStateId, "GET", false, true, "json", {}, handleReportAjaxError, function(chartData){
				if(chartData.error_message!=undefined && chartData.error_message!=null){
					$("#adhocReportChart"+widgetStateId).replaceWith(chartData.error_message);
					return false;
				}
				else{
					sendAjaxCall(intalio_bpms.adhoc_reporting.get_reports+"/"+widgetObject.reportId+"/execute?temp_id="+widgetStateId, "GET", false, true, "json", {}, handleReportAjaxError,function(actData){
						if(actData.error_message!=undefined && actData.error_message!=null){
							$("#adhocReportChart"+widgetStateId).replaceWith(actData.error_message);
							return false;
						}
						else{
							if(chartData.report.items[0].type=="TABLE")
								populateTableData(chartData,actData,widgetStateId);
							else
								populateChartData(chartData,actData,widgetStateId);
						}
						clickRefresh(obj,false);
					});
				}
			});
	}
	
	function populateChartData(chartData,actData,widgetStateId){
		if(chartData.report.items.length>=1){
			chartProperties.chart.caption    = chartData.report.items[0].title || "";
			chartProperties.chart.xaxisname  = chartData.report.items[0].category.title || "";
			chartProperties.chart.yaxisname  = chartData.report.items[0].value.title || "";
			if(chartData.report.items[0].metadata.legend.visible==false)
				chartProperties.chart.showLegend = "0";
			chartProperties.chart.legendPosition = chartData.report.items[0].metadata.legend.position || "BOTTOM";
			FusionCharts.setCurrentRenderer('javascript');
			if(FusionCharts("adhocReport"+widgetStateId)!=undefined && FusionCharts("adhocReport"+widgetStateId)!=null)
				FusionCharts("adhocReport"+widgetStateId).dispose();
			var chartSwf = getReportType(chartData);
			chartReference = new FusionCharts("widgets/swf/"+chartSwf,"adhocReport");
			if (chartData.report.items[0].type == 'PIE'){
				chartProperties.chart.showLabels = 0
			}
			chartReference.configure("ChartNoDataText",chartData.report.items[0].metadata.no_data_message||"");
			var rows    = actData.report_results[0].rows || [];
			var tempObj= {label:"",value:"",toolText:"",displayValue:""};
			for(var k=0;k<rows.length;k++){
				tempObj = {};
				if(chartData.report.items[0].metadata.legend.show_value){
					tempObj.label = rows[k].data[0]+","+rows[k].data[1];
					tempObj.displayValue = rows[k].data[0]+","+rows[k].data[1];
				}else
					tempObj.label = rows[k].data[0];
				tempObj.value = rows[k].data[1];
				chartProperties.data.push(tempObj);
			}
			chartReference.setJSONData(chartProperties);
			chartReference.render("adhocReportChart"+actData.temp_id);
			chartProperties.data = [];
		}
	}
	
	 function populateTableData(chartData,actData,widgetStateId){
		if(chartData.report.items.length>=1 && actData.report_results.length>=1){
			var groupingIndex,groupingVisible;
			$("#adhocReportChart"+actData.temp_id).append($("#adhocReportTable"+actData.temp_id));
			$("#adhocReportChart"+actData.temp_id).css({"overflow-y":"auto","margin-left":"0px"});
			headersArr = [];
			$("#adhocReportTable"+actData.temp_id).find("thead tr").empty();
			for(var k=0;k<chartData.report.items[0].series.length;k++){
				if(chartData.report.items[0].series[k].visible || chartData.report.items[0].groups.length>0 && chartData.report.items[0].series[k].column.name===chartData.report.items[0].groups[0].column_bindings[0]){
					$("#adhocReportTable"+actData.temp_id).find("thead tr").append("<th>"+chartData.report.items[0].series[k].title+"</th>");
					tableProperties.aoColumns.push({"bSortable": false });
					headersArr[headersArr.length] = chartData.report.items[0].series[k].column.name;
					if(chartData.report.items[0].groups.length>0 && chartData.report.items[0].series[k].column.name===chartData.report.items[0].groups[0].column_bindings[0]){
						groupingIndex   = k;
						groupingVisible = chartData.report.items[0].series[k].visible;
					}
				}
			}
			tableProperties.iDisplayLength = chartData.report.items[0].metadata.page_break || 50;
			if(chartData.report.items[0].groups.length>0 && chartData.report.items[0].groups[0].column_bindings.length>0){
				rowGroupingProperties.iGroupingColumnIndex = groupingIndex;
				groupingVisible = false;
				groupingVisible == false ? rowGroupingProperties.bHideGroupingColumn = true : rowGroupingProperties.bHideGroupingColumn = false;
				if (dataTableRef) {
					dataTableRef.fnClearTable();
					dataTableRef.fnDestroy();
				}
				dataTableRef = $("#adhocReportTable"+actData.temp_id).dataTable(tableProperties).rowGrouping(rowGroupingProperties);
			}
			else{
				if (dataTableRef) {
					dataTableRef.fnClearTable();
					dataTableRef.fnDestroy();
				}
				dataTableRef = $("#adhocReportTable"+actData.temp_id).dataTable(tableProperties);
			}
			customTable("adhocReportTable"+actData.temp_id);
			$(".dataTables_filter").closest(".row").remove();
			dataTableRef.fnClearTable();
			if(actData.report_results[0].rows.length>0){
				$.each(actData.report_results[0].rows, function(key, value) {
					var items = [];
					for(var colDataPosition=0;colDataPosition<value.data.length;colDataPosition++){
						var colValue = value.data[colDataPosition]==null ? "null" : value.data[colDataPosition];
						if (actData.report_results[0].columns[colDataPosition] && actData.report_results[0].columns[colDataPosition].data_type == 'date-time')
							colValue = convertDateTimeFormat(colValue)
						if(groupingIndex===colDataPosition && chartData.report.items[0].groups.length>0 && chartData.report.items[0].groups[0].column_bindings.length>0)
							items[items.length] = chartData.report.items[0].groups[0].column_bindings[0]+": "+colValue;
						else
							items[items.length] = colValue;
					}
					dataTableRef.fnAddData(items, false);
				});
				dataTableRef.fnDraw(true);
				tableProperties.aoColumns=[];
				if(chartData.report.items[0].groups.length>0 && groupingVisible==false)
					headersArr.splice($.inArray(chartData.report.items[0].groups[0].column_bindings[0],headersArr),1);
				if(chartData.report.items[0].metadata.highlights.length>0)
					highLightingRows(chartData,"adhocReportTable"+actData.temp_id);
				if(chartData.report.items[0].series.length>0)
					highLightingCells(chartData,"adhocReportTable"+actData.temp_id);
			}
		}
		removeLoading();
	}
	
	function highLightingRows(chartData,div_table_id){
		for (var j=0;j<chartData.report.items[0].metadata.highlights.length;j++){
			var operator = chartData.report.items[0].metadata.highlights[j].filter.operator;
			var colPosition = $.inArray(chartData.report.items[0].metadata.highlights[j].filter.expression.replace(/.*\["|\"]/gi,''),headersArr);
			if(colPosition>=0){
				$("#"+div_table_id+" tr").each(function() {
					var tdObj = $(this).find("td:eq("+colPosition+")");
					handleOperators(operator,tdObj.text(),chartData.report.items[0].metadata.highlights[j].filter.values,chartData.report.items[0].metadata.highlights[j].font,$(this),"highlighting");
				});
			}
		}
	}
	
	function highLightingCells(chartData,div_table_id){
		for(var k=0;k<chartData.report.items[0].series.length;k++){
			if(chartData.report.items[0].series[k].metadata!=null){
				for(var l=0;l<chartData.report.items[0].series[k].metadata.highlights.length;l++){
					var operator = chartData.report.items[0].series[k].metadata.highlights[l].filter.operator;
					var colPosition = $.inArray(chartData.report.items[0].series[k].metadata.highlights[l].filter.expression.replace(/.*\["|\"]/gi,''),headersArr);
					if(colPosition>=0){
						$("#"+div_table_id+" tr").each(function() {
							var tdObj = $(this).find("td:eq("+colPosition+")");
							if(!tdObj.hasClass("group"))
								handleOperators(operator,tdObj.text(),chartData.report.items[0].series[k].metadata.highlights[l].filter.values,chartData.report.items[0].series[k].metadata.highlights[l].font,tdObj,"highlighting");
						});
					}
				}
				for(var m=0;m<chartData.report.items[0].series[k].metadata.modifiers.length;m++){
					var operator = chartData.report.items[0].series[k].metadata.modifiers[m].filter.operator;
					var colPosition = $.inArray(chartData.report.items[0].series[k].metadata.modifiers[m].filter.expression.replace(/.*\["|\"]/gi,''),headersArr);
					if(colPosition>=0 && chartData.report.items[0].series[k].metadata.modifiers[m].value!=null){
						$("#"+div_table_id+" tr").each(function() {
							var tdObj = $(this).find("td:eq("+colPosition+")");
							handleOperators(operator,tdObj.text(),chartData.report.items[0].series[k].metadata.modifiers[m].filter.values,chartData.report.items[0].series[k].metadata.modifiers[m].value,tdObj,"modifiers");
						});
					}
				}
			}
		}
	}
	
	function handleOperators(operator,actValue,valuesArr,value,htmlObj,type){
		if(operator=="eq" && actValue===valuesArr[0])
			type=="highlighting" ? applyCss(value,htmlObj) : htmlObj.text(value);
			
		else if(operator=="between" && parseInt(actValue)>=parseInt(valuesArr[0]) && parseInt(actValue)<=parseInt(valuesArr[1]))
			type=="highlighting" ? applyCss(value,htmlObj) : htmlObj.text(value);
			
		else if(operator=="in" && $.inArray(actValue,valuesArr)>=0)
			type=="highlighting" ? applyCss(value,htmlObj) : htmlObj.text(value);
			
		else if(operator=="gt" && parseInt(actValue) > parseInt(valuesArr[0]))
			type=="highlighting" ? applyCss(value,htmlObj) : htmlObj.text(value);
		
		else if(operator=="lt" && parseInt(actValue) < parseInt(valuesArr[0]))
			type=="highlighting" ? applyCss(value,htmlObj) : htmlObj.text(value);
	}
	
	function applyCss(value,htmlObj){
		htmlObj.attr("style","background-color:"+value.background_color+" !important;color:"+value.color);
		value.italics == true ?htmlObj.css({"font-style":"italic"}) : "";
		value.bold == true ? htmlObj.css({"font-weight":"bold"}) : ""
		value.line_through == true ? htmlObj.css({"text-decoration":"line-through"}) : "";
	}
	
	function handleReportAjaxError(data){
		if(data.error!=undefined)
			showErrorNotification(data.error);
	}
	
	function getReportType (chartData){
		var type = chartData.report.items[0].type;
		var dimensions = chartData.report.items[0].dimensions;
		var inner_radius = chartData.report.items[0].metadata.inner_radius != 0 ? true : false;
		var swf = 'Column3D.swf'
		for (var i = 0 ; i < availableChartTypes.length ; i++){
			var object = availableChartTypes[i]
			if (type == object.birt_name && dimensions == object.dimension && inner_radius == object.inner_radius){
				swf = object.swf
			}
		}
		return swf
	}
</script>
</head>
<body>
<div id="executeReport" class="chart"></div>
<div id="adhocTableReportDiv" class="hide">
	<div class="table-responsive">
		<table id="adhocTableReport" class="table table-striped table-bordered table-hover">
			<thead><tr></tr></thead>
			<tbody></tbody>
		</table>
	</div>
</div>
</body>
</html>
