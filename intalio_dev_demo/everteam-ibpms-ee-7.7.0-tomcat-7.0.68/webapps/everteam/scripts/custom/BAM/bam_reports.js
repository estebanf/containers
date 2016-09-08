/* 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
*/

var language = $("#reportsPageInfo").text().replace('{0}',"_MENU_");
var reportsTableOptions = {
	"sDom":"<'row'<'col-sm-6'><'col-sm-6'f>><'table_container't><'row'i<'col-sm-6'><'col-sm-6'pl>>",
	"oLanguage": { "sLengthMenu": language,"sSearch": "","sInfo": "Showing _START_ to _END_ of _TOTAL_ report(s)"
	}
}
var reportTableRef = $('#dataGridBody').dataTable(reportsTableOptions);
customTable('dataGridBody');
$("#dataGridBody_filter a").attr('onclick',"javascript:selectMenuAndChangepage(this,'reports','reports.htm')");
$("#preDefinedReportsTableDiv").css("padding","0px");
$("#dataGridBody_length").addClass('col-sm-5').addClass('pull-left');
$("#dataGridBody_info").addClass('col-sm-4').appendTo('.table_pagination');
removeLoading();

$('.dataTables_empty').html($("#NoPreRecordsMsg"));
if(reportTableRef.fnSettings().fnRecordsTotal()<=0)
	$('.table_container').next().addClass('hide');

function showReport(obj){
	$("#preDefinedReportsTableDiv").addClass("hide");
	$("#bamReports").empty();
	$("#bamReports").css("height",$(window).height()-110+"px");
	$("#bamReports").attr("src",$(obj).attr("data")).removeClass("hide");
	return false;
}
