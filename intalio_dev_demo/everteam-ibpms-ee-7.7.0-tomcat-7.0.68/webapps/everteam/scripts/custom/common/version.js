/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


var versionTable = '';
$(document).ready(function () {
	versionTable = $('#serverVersionTable').dataTable({
			"sDom": "<'table_container't>",
			"bPaginate": false,
		    "aoColumns": [{
		        "bSortable": false,
				"sWidth": "60px"
		    }, {
		        "bSortable": false,
				"sWidth": "40px"
		    }]

		});
	});

function getServerVersions() {
	var url = 'console/files/buildInfo';
	sendAjaxCall(url,'GET',false,true,'json',null,function (e) {},buildVersionsTable);
}
// Builds the HTML Table out of json data from buildInfo service.
 function buildVersionsTable(data) {
		if(data.error_message != undefined){
			showErrorNotification(data.error_message);
			return;
		}
		var component = [];
		versionTable.fnClearTable();
		var i = 0;
		 $.each(data.properties, function (key, value) {
				component[i++] = key;
				component[i++] = value;
				versionTable.fnAddData(component, false);
				i = 0;
			});
	    versionTable.fnDraw(true);
	    applyNiceScroll($('#versionInfo'),230);
	    modalShow('serverVersionsID');
	    $('#serverVersionTable').css('width','100%')
 }
