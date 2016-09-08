/* 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
*/

var width_of_widget = 8;
var chartReference,divObj = $("#adhoc_reports_div"),reportDivObj = $("#executeReport"),reportTypeData,reportParametersData,dataTableRef,groupingIndex,groupingVisible,headersArr = [],reportData,modifierObj={},
executeReport = {
	getReportTypeData : function(reportId,obj){
		if(reportId!=null){
			addLoading(".page-content");
			$('.breadcrumb li:gt(1)').remove()
			$('.breadcrumb li').removeClass('active')
			$('.breadcrumb').append($('<li/>').append($(obj).text()));
			sendAjaxCall(intalio_bpms.adhoc_reporting.get_reports+"/"+reportId+"?temp_id=1", "GET", false, true, "json", {}, executeReport.handleReportAjaxError,function(data){
				if(data.report!=undefined){
					reportData = data.report;
					reportTypeData = data.report.items[0] || [];
					if(data.report.parameters[0]!=undefined)
						reportParametersData = data.report.parameters[0].values || [];
					reportDivObj.empty();
					if(reportTypeData!=undefined)
						reportTypeData.type =="TABLE" ? executeReport.prepareTableData(data,reportId) : executeReport.prepareChartData(data,reportId);
				}
				else if(data.error_message!=undefined){
					showErrorNotification(data.error_message);
					removeLoading();
				}
			});
		}
	},
	prepareChartData : function(data,reportId){
		chartProperties.chart.caption    = reportTypeData.title || "";
		chartProperties.chart.xaxisname  = reportTypeData.category.title || "";
		chartProperties.chart.yaxisname  = reportTypeData.value.title || "";
		if(reportTypeData.category.show_label==false)
			chartProperties.chart.xaxisname = "";
		if(reportTypeData.value.show_label==false)
			chartProperties.chart.yaxisname = "";
		if(reportTypeData.metadata.legend.visible==false)
			chartProperties.chart.showLegend = "0";
		chartProperties.chart.legendPosition = reportTypeData.metadata.legend.position || "BOTTOM";
		FusionCharts.setCurrentRenderer('javascript');
		
		if(FusionCharts("adhocReport")!=undefined && FusionCharts("adhocReport")!=null)
			FusionCharts("adhocReport").dispose();
		var chartSwf = executeReport.getChartType();
		chartReference = new FusionCharts("widgets/swf/"+chartSwf,"adhocReport");
		if (reportTypeData.type == 'PIE'){
			chartProperties.chart.showLabels = 0
		}
		chartReference.configure("ChartNoDataText",reportTypeData.metadata.no_data_message||"");
		divObj.addClass("hide");
		$('#execute_refresh_button').attr('onclick','executeReport.getReportData("'+reportId+'");');
		$('#execute_refresh_button').removeClass('hide')
		executeReport.getReportData(reportId);
	},
	getChartType : function(){
		var type = reportTypeData.type;
		var dimensions = reportTypeData.dimensions;
		var inner_radius = reportTypeData.metadata.inner_radius != 0 ? true : false;
		var swf = 'Column3D.swf'
		for (var i = 0 ; i < availableChartTypes.length ; i++){
			var object = availableChartTypes[i]
			if (type == object.birt_name && dimensions == object.dimension && inner_radius == object.inner_radius){
				swf = object.swf
			}
		}
		return swf
	},
	prepareTableData : function(data,reportId){
		reportDivObj.append($("#adhocTableReport").clone());
		headersArr = [];
		for(var k=0;k<reportTypeData.series.length;k++){
			if(reportTypeData.series[k].visible || reportTypeData.groups.length>0 && reportTypeData.series[k].column.name===reportTypeData.groups[0].column_bindings[0]){
				var width = reportTypeData.series[k].width * 100/width_of_widget;
				var flag = false;
				for(var j=0;j<reportParametersData.length;j++){
					if(reportParametersData[j].value===reportTypeData.series[k].column.name){
						reportDivObj.find("table thead tr").append("<th sort='asc' width='"+width+"%' onclick=javascript:executeReport.sortColumnData(this,'"+reportTypeData.series[k].column.name+"','"+reportId+"')><span class='pull-right hide'><i class='fa fa-sort-down blue'></i></span>"+reportTypeData.series[k].title+"</th>");
						flag = true;
					}
				}
				if(flag==false)
					reportDivObj.find("table thead tr").append("<th width='"+width+"%'><span class='pull-right hide'><i class='fa fa-sort-down blue'></i></span>"+reportTypeData.series[k].title+"</th>");							
				tableProperties.aoColumns.push({"bSortable": false ,"sWidth":width+"%"});
				headersArr[headersArr.length] = reportTypeData.series[k].column.name;
				if(reportTypeData.groups.length>0 && reportTypeData.series[k].column.name===reportTypeData.groups[0].column_bindings[0]){
					groupingIndex   = k;
					groupingVisible = reportTypeData.series[k].visible;
				}
				if(reportTypeData.series[k].metadata.modifiers.length>0){
					modifierObj[k] = reportTypeData.series[k].metadata.modifiers[0];
				}
			}
		}
		tableProperties.iDisplayLength = reportTypeData.metadata.page_break || 50;
		if(reportTypeData.groups.length>0 && reportTypeData.groups[0].column_bindings.length>0){
			rowGroupingProperties.iGroupingColumnIndex = groupingIndex;
			groupingVisible = false;
			groupingVisible == false ? rowGroupingProperties.bHideGroupingColumn = true : rowGroupingProperties.bHideGroupingColumn = false;
			dataTableRef = reportDivObj.find("table").dataTable(tableProperties).rowGrouping(rowGroupingProperties);
		}
		else
			dataTableRef = reportDivObj.find("table").dataTable(tableProperties);
		customTable(reportDivObj.find("table").attr("id").toString());
		var refresh_icon = $('#adhocTableReport_filter').find('.table_refresh_icon')
		refresh_icon = $(refresh_icon).removeClass('hide');
		refresh_icon.attr('onclick','executeReport.getReportData("'+reportId+'");')
		$('#execute_refresh_button').addClass('hide')
		divObj.addClass("hide");
		executeReport.getReportData(reportId);
	},
	getReportData : function(reportId){
		addLoading(".page-content");
		sendAjaxCall(intalio_bpms.adhoc_reporting.get_reports+"/"+reportId+"/execute?temp_id=1", "GET", false, true, "json", {}, executeReport.handleReportAjaxError,function(data){
			if(data.report_results!=undefined)
				reportTypeData.type =="TABLE" ? executeReport.populateTableData(data,reportId,true) : executeReport.populateChartData(data);
			else if(data.error_message!=undefined)
				showErrorNotification(data.error_message);
				removeLoading();
			},adhoc.execution_timeout+adhoc.grace_timeout);
	},
	populateChartData : function(data){
		var columns = data.report_results[0].columns || [];
		var rows    = data.report_results[0].rows || [];
		var tempObj= {label:"",value:"",toolText:"",displayValue:""};
		var xDateTimeFlag = false;
		for(var j=0;j<reportData.data_sets[0].columns.length;j++){
			if(reportData.data_sets[0].columns[j].expression == reportTypeData.category.column.expression && reportData.data_sets[0].columns[j].data_type=="date-time")
				xDateTimeFlag = true;
		}
		chartProperties.data = []
		for(var k=0;k<rows.length;k++){
			tempObj = {};
			if(reportTypeData.metadata.legend.show_value == true){
				if(xDateTimeFlag)
					tempObj.label = convertDateTimeFormat(rows[k].data[0])+","+rows[k].data[1];
				else
					tempObj.label = rows[k].data[0]+","+rows[k].data[1];
				tempObj.displayValue = rows[k].data[0]+","+rows[k].data[1];
			}else if(xDateTimeFlag)
				tempObj.label = convertDateTimeFormat(rows[k].data[0]);
			else
				tempObj.label = rows[k].data[0];
			tempObj.value = rows[k].data[1];
			chartProperties.data.push(tempObj);
		}
		reportDivObj.removeClass("hide");
		chartReference.setJSONData(chartProperties);
		chartReference.render("executeReport");
		$("#reportDescription").text(reportData.metadata.description).parent().removeClass("hide");
		removeLoading();
	},
	populateTableData : function(data,reportId,flag){
		dataTableRef.fnClearTable();
		if(data.report_results[0].rows.length>0){
			$.each(data.report_results[0].rows, function(key, value) {
				var items = [];
				for(var colDataPosition=0;colDataPosition<value.data.length;colDataPosition++){
					var colValue = value.data[colDataPosition]
					if(modifierObj[colDataPosition]){
						var filterObj = modifierObj[colDataPosition].filter;
						if(filterObj.operator=="eq" && colValue==null)
							colValue = "null";
						if(filterObj.operator=="eq" && colValue==filterObj.values[0])
							colValue = modifierObj[colDataPosition].value;
						else if(filterObj.operator=="between" && parseInt(colValue)>=parseInt(filterObj.values[0]) && parseInt(colValue)<=parseInt(filterObj.values[1]))
							colValue = modifierObj[colDataPosition].value;
						else if(filterObj.operator && $.inArray(colValue,filterObj.values)>=0)
							colValue = modifierObj[colDataPosition].value;
						else if(filterObj.operator=="gt" && parseInt(colValue) > parseInt(filterObj.values[0]))
							colValue = modifierObj[colDataPosition].value;
						else if(filterObj.operator=="lt" && parseInt(colValue) < parseInt(filterObj.values[0]))
							colValue = modifierObj[colDataPosition].value;
					}
					if(data.report_results[0].columns[colDataPosition] && data.report_results[0].columns[colDataPosition].data_type == 'date-time')
						colValue = convertDateTimeFormat(colValue)
					if(groupingIndex===colDataPosition && reportTypeData.groups.length>0 && reportTypeData.groups[0].column_bindings.length>0)
						items[items.length] = reportTypeData.groups[0].column_bindings[0]+": "+colValue;
					else
						items[items.length] = colValue;
				}
				dataTableRef.fnAddData(items, false);
			});
			dataTableRef.fnDraw(true);
			if(reportTypeData.groups.length>0 && groupingVisible==false)
				headersArr.splice($.inArray(reportTypeData.groups[0].column_bindings[0],headersArr),1);
			if(reportTypeData.metadata.highlights.length>0)
				executeReport.highLightingRows();
		}
		reportDivObj.removeClass("hide");
		$("#reportDescription").text(reportData.metadata.description).parent().removeClass("hide");
		applyNiceScroll($('#adhocTableReport_wrapper').find('.table_container'),205);
		if(flag)
		executeReport.updateEntriesHtml(reportId);
		removeLoading();
	},
	highLightingRows : function(){
		for (var j=0;j<reportTypeData.metadata.highlights.length;j++){
			var operator = reportTypeData.metadata.highlights[j].filter.operator;
			var colPosition = $.inArray(reportTypeData.metadata.highlights[j].filter.expression.replace(/.*\["|\"]/gi,''),headersArr);
			if(colPosition>=0){
				$("#adhocTableReport tr").each(function() {
					var tdObj = $(this).find("td:eq("+colPosition+")");
					executeReport.handleOperators(operator,tdObj.text(),reportTypeData.metadata.highlights[j].filter.values,reportTypeData.metadata.highlights[j].font,$(this),"highlighting");
				});
			}
		}
	},
	highLightingCells: function(){
		for(var k=0;k<reportTypeData.series.length;k++){
			if(reportTypeData.series[k].metadata!=null){
				for(var l=0;l<reportTypeData.series[k].metadata.highlights.length;l++){
					var operator = reportTypeData.series[k].metadata.highlights[l].filter.operator;
					var colPosition = $.inArray(reportTypeData.series[k].metadata.highlights[l].filter.expression.replace(/.*\["|\"]/gi,''),headersArr);
					if(colPosition>=0){
						$("#adhocTableReport tr").each(function() {
							var tdObj = $(this).find("td:eq("+colPosition+")");
							if(!tdObj.hasClass("group"))
								executeReport.handleOperators(operator,tdObj.text(),reportTypeData.series[k].metadata.highlights[l].filter.values,reportTypeData.series[k].metadata.highlights[l].font,tdObj,"highlighting");
						});
					}
				}
			}
		}
	},
	handleOperators : function(operator,actValue,valuesArr,value,htmlObj,type){
		if(operator=="eq" && actValue==valuesArr[0])
			executeReport.applyCss(value,htmlObj);
		else if(operator=="between" && parseInt(actValue)>=parseInt(valuesArr[0]) && parseInt(actValue)<=parseInt(valuesArr[1]))
			executeReport.applyCss(value,htmlObj);
		else if(operator=="in" && $.inArray(actValue,valuesArr)>=0)
			executeReport.applyCss(value,htmlObj);
		else if(operator=="gt" && parseInt(actValue) > parseInt(valuesArr[0]))
			executeReport.applyCss(value,htmlObj);
		else if(operator=="lt" && parseInt(actValue) < parseInt(valuesArr[0]))
			executeReport.applyCss(value,htmlObj);
	},
	applyCss : function(value,htmlObj){
		htmlObj.attr("style","background-color:"+value.background_color+" !important;color:"+value.color);
		value.italics == true ?htmlObj.css({"font-style":"italic"}) : "";
		value.bold == true ? htmlObj.css({"font-weight":"bold"}) : ""
		value.line_through == true ? htmlObj.css({"text-decoration":"line-through"}) : "";
	},
	handleReportAjaxError : function(data){
		if(data.error!=undefined)
			showErrorNotification(data.error);
	},
	sortColumnData : function(obj,title,reportId){
		addLoading(".page-content");
		$('#adhocTableReport th span').addClass('hide');
    	$(obj).find('span').removeClass('hide');
    	var sortOrder;
    	if ($(obj).attr('sort') == 'desc') {
        	$(obj).find('span i').removeAttr('class').addClass('fa fa-sort-up blue');
        	$(obj).attr('sort', 'asc');
        	sortOrder = 'asc';
    	} else {
       	 	$(obj).find('span i').removeAttr('class').addClass('fa fa-sort-down blue');
        	$(obj).attr('sort', 'desc');
        	sortOrder = 'desc';
    	}
   		parametersObj= {"sortColumns1":title,"sortDirection1":sortOrder},
    	sendAjaxCall(intalio_bpms.adhoc_reporting.get_reports+"/"+reportId+"/execute?parameters="+JSON.stringify(parametersObj)+"&temp_id=1&limit="+$("#noOfRows_report").val(), "GET", false, true, "json", {}, executeReport.handleReportAjaxError,function(data){
    		executeReport.handleReportDataResponse(data,reportId);
	    });
	},
	handleReportDataResponse : function(data,reportId){
		if(data.report_results!=undefined)
				reportTypeData.type =="TABLE" ? executeReport.populateTableData(data,reportId,false) : executeReport.populateChartData(data);
			else if(data.error_message!=undefined){
				showErrorNotification(data.error_message);
				removeLoading();
			}
	},
	updateEntriesHtml :function(reportId) {
		$("#adhocTableReport_wrapper .table_pagination").find('.paginationRows').empty();
		$("#adhocTableReport_wrapper .table_pagination").append("<span class='paginationRows'><label>"+$("#entriesPage").text()+" :</label><select id='noOfRows_report' onchange=javscript:executeReport.updateReportRows('"+reportId+"'); role='listbox' class='ui-pg-selbox'><option value='100' role='option'>100</option><option value='500' role='option'>500</option><option value='1000' role='option'>1000</option><option value='5000' role='option'>5000</option><option value='10000' role='option'>10000</option></select></span>");
	},
	updateReportRows : function(reportId){
		addLoading(".page-content");
		sendAjaxCall(intalio_bpms.adhoc_reporting.get_reports+"/"+reportId+"/execute?temp_id=1&limit="+$("#noOfRows_report").val(), "GET", false, true, "json", {}, executeReport.handleReportAjaxError,function(data){
    		executeReport.handleReportDataResponse(data,reportId);
	    });
	}
};
