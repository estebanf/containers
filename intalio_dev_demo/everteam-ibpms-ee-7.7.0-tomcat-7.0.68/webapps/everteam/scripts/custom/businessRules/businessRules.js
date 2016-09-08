/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


var breRelativePath;
var isBreEditable;
var isLocked = false;
var brePackage;
var isBREPackageSelected = false;
var auditID;
var unlockBusinessRuleID;

/** This will hold the information about data type */
var breDataType = [];
/** This will hold the information about node type */
var breNodeType = [];

/** businessRuleTable holds the reference of resources of a bre*/
var businessRuleTable;
var businessRuleAuditTable
var businessRulePermissionTable;

var countCondition = 0;
var countAction = 0;
var xmlDoc;
var actions ;
var xmlFile;
var isRowAdded;
var breEditPermission = {};
var breViewPermission = {};
users_roles = {};
var breDecisionIDs = [];
var businessRuleID;
var isBRESaveOrUpdate = false;
var isBusinessRulesAdmin = false;

/** totalRecords is used to calculate the pagination of Business Rules page*/
var totalRecords;
var startNumber;
var endNum;

/**pagination required data for Business Rules*/
var paginationData = {
	pageSize: 10,
	requiredPage: 1,
	sortBy: "+packageName",
};

var businessRulesAudit = {
    "bPaginate": false,
    "bStateSave": true,
    "bInfo": false,
    "bFilter": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bRetrieve": true,
    "bAutoWidth": false,
    "bSort": false,
    "aoColumns": [ {
        "sClass": "alignLeft"
	}, {
        "sClass": "alignLeft"
	}, {
        "sClass": "alignLeft"
	}]
};

var businessRuleOptions = {
    "bPaginate": false,
    "bStateSave": true,
    "bInfo": false,
    "bFilter": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bAutoWidth": false,
    "bSort": false,
    "aoColumns": [ {
        "sClass": "center"
	}, {
        "sClass": "alignLeft"
	}, {
        "sClass": "alignLeft"
	}, {
        "sClass": "alignLeft"
	}, {
        "sClass": "alignLeft"
	}, {
        "sClass": "alignLeft"
	}, {
        "sClass": "center"
	}, {
        "bVisible": false,
        "bSearchable": false
    }, {
        "bVisible": false,
        "bSearchable": false
    }, {
        "bVisible": false,
        "bSearchable": false
    }]
};

/**
 * @Function Name   : starting function of jquery
 * @Description     : This function is used to initialize variables and set default values.
 * @param           : data list of processes
 * @returns         :
 * */
$(document).ready(function() {
	isRowAdded = true;
	if(!isBRECalledFromProcess){
		businessRuleTable = $("#business_rules").dataTable(businessRuleOptions);
		customTable('business_rules');
		isBREAdmin();
		breViewPermission = applySelectize($("#viewBREPermission"),[{id: 'peers', name: 'Peer(s)'}, {id: 'subordinates', name: 'Subordinate(s)'}, {id: 'internal', name: 'Internal'}, {id: 'external', name: 'External'}],["peers","subordinates","internal","external"],50,false);
		breEditPermission = applySelectize($("#editBREPermission"),[{id: 'peers', name: 'Peer(s)'}, {id: 'subordinates', name: 'Subordinate(s)'}, {id: 'internal', name: 'Internal'}, {id: 'external', name: 'External'}],["peers","subordinates","internal","external"],50,false);
	}
	if(isBreEditable == "true" && isLocked){
		$('.editable').editable({
			mode:'inline',
			type: 'text',
			toggle: 'manual',
			emptytext: '',
			success:function(response, newValue){
				var doc = $(this).closest('td').data('doc');
				$(doc).attr('expression', newValue);
			}
		}); 
		$('.editableDate').editable({
			mode:'inline',
			type: 'adate',
			emptytext: userPreferences.dateFormat,
			date: {
				format: userPreferences.dateFormat.toLowerCase(),
				viewformat: userPreferences.dateFormat.toLowerCase(),
				weekStart: 1
			},
			success:function(response, newValue){
				var doc = $(this).closest('td').data('doc');
				if(newValue != "")
					$(doc).attr('expression', moment(newValue, userPreferences.dateFormat.toUpperCase()).format('DD/MM/YYYY'));
				else
					$(doc).attr('expression', '');
			}
		});
		$('.editableNumber').editable({
			mode:'inline',
			type: 'text',
			toggle: 'manual',
			emptytext: '0',
			success:function(response, newValue){
				var doc = $(this).closest('td').data('doc');
				$(doc).attr('expression', newValue);
			}
		});
	}
	$(document).off('hover', '#breTable tr td').on('hover', '#breTable tr td', function (e) {
		if(isBreEditable == "true" && isLocked){
			if(e.type == "mouseenter") {
				$('#breTable tbody > tr td').removeClass('lightYellow');
				$('#breTable tbody > tr').removeClass('greyBackground');
				$('#breTable tbody > tr td').removeClass('greyBackground');
				$('#breTable tbody > tr td.click').find('.action-icon').addClass('hide');
				var rowspan = $(this).attr('rowspan');
				if(rowspan != undefined && rowspan != null){
					if(parseInt(rowspan) >1){
						highLightRowsBasedOnRowspan($(this).closest('tr').nextAll().slice(0,parseInt(rowspan)-1));
					}
				}
				if(isRowAdded){
					highlighRow(this);
				}
				$(this).closest('tr').find('.options').removeClass('lightGrey');
				$(this).closest('tr').addClass('greyBackground');
				if($(this).find('.editable-container').length == 0){
					if(!$(this).hasClass('xor'))
						$(this).find('span').first().removeClass('hide');
				}
			} else if (e.type == "mouseleave") {
				var tr = $(this).closest('tr');
				removeHighLightedRow(this);
				$(this).closest('tr').removeClass('greyBackground');
				$('#breTable tbody > tr').removeClass('greyBackground');
				$('#breTable tbody > tr td').removeClass('greyBackground');
				var rowspan = $(this).attr('rowspan');
				if(rowspan != undefined && rowspan != null){
					if(parseInt(rowspan) >1){
						removeRowsBasedOnRowspan($(this).closest('tr').nextAll().slice(0,parseInt(rowspan)-1));
					}
				}
				if(isRowAdded){
					$(this).closest('tr').find('.options').addClass('lightGrey');
				}
				$(this).find('.action-icon').first().addClass('hide');
			}
		}
	});
	$(document).off('click', '.editable-buttons').on('click', '.editable-buttons', function (e) {
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
	});
	$(document).off('click', '#breTable tr td.notDate').on('click', '#breTable tr td.notDate', function (e) {
		e.stopPropagation();
		if(isBreEditable == "true" && isLocked){
			if($(this).find('.editable-container').length == 0)
				$(this).find('.editable').editable('toggle');
			$(this).find('.action-icon').first().addClass('hide');
		}
	});
	$(document).off('click', '#breTable tr td.salience').on('click', '#breTable tr td.salience', function (e) {
		e.stopPropagation();
		if(isBreEditable == "true" && isLocked){
			if($(this).find('.editable-container').length == 0)
				$(this).find('.editable').editable('toggle');
			$(this).find('.action-icon').first().addClass('hide');
		}
	});
	$(document).off('click', '#breTable tr td.xor').on('click', '#breTable tr td.xor', function (e) {
		e.stopPropagation();
		if(isBreEditable == "true" && isLocked){
			var span = $(this).find('span');
			$(span).addClass('hide');
			var select = $(this).find('select');
			$(select).empty();
			appendXORGroup($(select),$(span).text());
			$('#breTable tr td.xor select.xorSelect').addClass('hide');
			$('#breTable tr td.xor input').addClass('hide');
			$('#breTable tr td.xor span').removeClass('hide');
			var input = $(this).find('input');
			$(input).val($(span).text());
			if(!$(input).hasClass('groupInput')){
				$(input).removeClass('hide');
			}else{
				$(input).addClass('hide');
				$(input).removeClass('groupInput');
			}
			if(!$(select).hasClass('groupSelect')){
				$(select).removeClass('hide');
			}else{
				$(select).addClass('hide');
				$(select).removeClass('groupSelect');
			}
			if(!$(span).hasClass('groupSpan')){
				$(span).addClass('hide');
			}else{
				$(span).removeClass('hide');
				$(span).removeClass('groupSpan');
			}
		}
	});

	$(document).off('click', '#breTable tr td.xor select.xorSelect').on('click', '#breTable tr td.xor select.xorSelect', function(e){
		e.stopPropagation();
		e.preventDefault();
	});
	$(document).off('change', '#breTable tr td.xor select.xorSelect').on('change', '#breTable tr td.xor select.xorSelect', function(e){
		var input = $(this).closest('div').find('.xorInput');
		var span = $(this).closest('div').find('span');
		var doc = $(this).closest('td').data('doc');
		$(span).addClass('groupSpan');
		$(span).removeClass('hide');
		$(doc).attr('expression', $(this).val());
		$(span).text($(this).val());
		$(input).val($(this).val());
		$(this).addClass('groupSelect hide');
		$(input).addClass('groupInput hide');
	});

	$(document).on('keydown', 'input.xorInput', function(e){
		var code = e.keyCode || e.which;
		var span;
		if (code == 13) {
			e.preventDefault();
			var xor = getXORGroup();
			var current = $(this).val();
			var doc = $(this).closest('td').data('doc');
			span = $(this).closest('div').find('span');
			var select = $(this).closest('div').find('select');
			var input = $(this).closest('div').find('input');
			$(select).addClass('hide');
			$(span).removeClass('hide');
			$(input).addClass('hide');
			$(span).text(current);
			var prev = $(doc).attr('expression');
			$(doc).attr('expression', current);
			return false;
		}else{
			$(span).text("");
		}
	});

	$(document).off('hover', '.editable-submit').on('hover', '.editable-submit', function (e) {
		$(this).attr('title','Update');
	});
	$(document).off('hover', '.editable-cancel').on('hover', '.editable-cancel', function (e) {
		$(this).attr('title','Cancel');
	});
	$(document).off('hover', '#breTable tr td.redBackground').on('hover', '#breTable tr td.redBackground', function (e) {
		if(e.type == "mouseenter")
			$(this).popover('show');
		else if (e.type == "mouseleave")
			$(this).popover('hide');
	});
});

function highLightRowsBasedOnRowspan(rows){
	$.each(rows, function(){
		$(this).find('.options').removeClass('lightGrey');
		$(this).addClass('greyBackground');
	});
}

function removeRowsBasedOnRowspan(rows, rowspan){
	$.each(rows, function(){
		$(this).removeClass('greyBackground');
		$(this).find('.options').addClass('lightGrey');
	});
}

function isBREAdmin(){
	var data = {
	}
	sendAjaxCall("dtdeployment/access/admin", "GET", false, true, "json", data, handleBREAjaxError, populateBREActionButtons);
}

function populateBREActionButtons(data){
	var buttons = [$('#shareButton').text()];
	if(data.success_message == true){
		if (data.isbreadmin == true){
			businessRuleTable.fnSetColumnVis( 0, true );
			for (var i = 0; i < buttons.length; i++) {
				var actionButton = breButtonHeader(buttons[i]);
				$('#business_rules_wrapper .row .tableButtons').append(actionButton);
			}
			isBusinessRulesAdmin = true;
		}else{
			isBusinessRulesAdmin = false;
			businessRuleTable.fnSetColumnVis( 0, false);
		}
	} 
	listBRE();
}

function handleBREAjaxError(e) {
    showInformation(e.responseText);
    removeLoading('', true);
    return false;
}

function populateBREList(data) {
	businessRuleTable.fnClearTable();
	businessRuleTable.fnFilter('');
	if (data.totalRecords != undefined && data.totalRecords != null)
		totalRecords = data.totalRecords;
	if (data.bredecisiontable != undefined && data.bredecisiontable.length > 0) {
		$('.dataTables_empty').text($('#fetchingBusinessRules').text());
		var packageCount = 0;
		$.each(data.bredecisiontable, function(key, value) {
			var items = [];
			var viewSpan = '';
			var editSpan = '';
			if (value.type != "package") {
				var title;
				items[items.length] = '<label class="position-relative"><input name="breProcessSelected" class="ace" type="checkbox" onclick="updateHeaderCheckbox(this);" value="' + value.id + '"/><span class="lbl"></span></label>';
                items[items.length] = '<span class="breAlignment">'+value.name+'</span>';
                if(value.permissions != null){
					if(value.permissions.edit != null && value.permissions.edit.role != null){
						$.each(value.permissions.edit.role, function(key, val){
							if(val != null && val != "")
								editSpan += '<span class="nowrap"><i class="fa fa-group" title="Role"></i>&nbsp;'+val+'</span><span class="wrap-line">  </span>';
						});
						$.each(value.permissions.edit.user, function(key, val){
							var nameObj = [];
							var editName;
							var editUserName;
							if(data.userList != undefined && data.userList.length >= 0){
								nameObj = $.grep(data.userList, function(e){
									return e.userID == val;
								});
							}
							editName = nameObj.length==1 ? nameObj[0].userName : val;
							editUserName = nameObj.length==1 ? val : 'User';
							if(val != null && val != "")
								editSpan += '<span class="nowrap"><a class="noDecoration" user="'+val+'" onclick=javascript:showUserProfile(this)><i class="fa fa-user" title="'+editUserName+'"></i>&nbsp;'+editName+'</a></span><span class="wrap-line">  </span>';
						});
					}
					if(value.permissions.view != null && value.permissions.view.role != null){
						$.each(value.permissions.view.role, function(key, val){
							var viewName;
							var viewUserName;
							if(val != null && val != "")
								viewSpan += '<span class="nowrap"><i class="fa fa-group" title="Role"></i>&nbsp;'+val+'</span><span class="wrap-line">  </span>';
						});
						$.each(value.permissions.view.user, function(key, val){
							if(data.userList != undefined && data.userList.length >= 0){
								nameObj = $.grep(data.userList, function(e){
									return e.userID == val;
								});
							}
							viewName = nameObj.length==1 ? nameObj[0].userName : val;
							viewUserName = nameObj.length==1 ? val : 'User';
							if(val != null && val != "")
								viewSpan += '<span class="nowrap"><a class="noDecoration" user="'+val+'" onclick=javascript:showUserProfile(this)><i class="fa fa-user" title="'+viewUserName+'"></i>&nbsp;'+viewName+'</a></span><span class="wrap-line">  </span>';
						});
					}
				}
                items[items.length] = editSpan;
                items[items.length] = viewSpan;
                if (value.deployedTime != null && value.deployedTime != 0) {
					items[items.length] = $.format.date(value.deployedTime, userPreferences.dateFormat+userPreferences.hourFormat);
				} else {
					items[items.length] = "";
				}
				if (value.updatedTime != null) {
					items[items.length] = $.format.date(value.updatedTime, userPreferences.dateFormat+userPreferences.hourFormat);
				} else {
					items[items.length] = "";
				}
				var pathURL = value.relativepath;
				var relativepath = pathURL.replace(/\\/g, '\\\\');
				var decisionTablePermission;
				var audit = "<span class='action-buttons auditAction'><a class='text-purple iconCursor'><i class='fa-zoom-in fa fa-file-text-o' onclick='auditInfo(\""+ value.id+"\" , \""+value.name+"\")' title='"+$('#viewChangeLog').text()+"'></i></a></span>";
				var lockedBusinessRule;
				 if(value.locked)
					lockedBusinessRule = "<span class='action-buttons lockAction'><a class='text-purple iconCursor'><i class='fa-zoom-in fa fa-lock' onclick='unlockConfirmation(\""+value.id+"\" , \""+value.lockedBy+"\")' title='"+$('#viewLockDetails').text()+"'></i></a></span>";
				else
					lockedBusinessRule = '';
				if(value.updationSupported){
					if(value.access === "edit"){
						title = $('#businessRuleEditable').text();
						decisionTablePermission = "<span class='action-buttons permissionAction'><a class='text-purple iconCursor'><i class='fa-zoom-in fa fa-edit' onclick='getBRETableData(\""+relativepath+"\" , \""+value.access+"\" , \""+ value.id+"\")' title='"+title+"'></i></a></span>";
						if(isBusinessRulesAdmin)
							items[items.length] = decisionTablePermission + audit + lockedBusinessRule;
						else
							items[items.length] = decisionTablePermission;
					}else if(value.access === "view"){
						title = $('#businessRuleReadOnly').text();
						decisionTablePermission = "<span class='action-buttons permissionAction'><a class='text-purple iconCursor'><i class='fa-zoom-in fa fa-building-o' onclick='getBRETableData(\""+relativepath+"\" , \""+value.access+"\" , \""+ value.id+"\")' title='"+title+"'></i></a></span>";
						if(isBusinessRulesAdmin)
							items[items.length] = decisionTablePermission + audit + lockedBusinessRule;
						else
							items[items.length] = decisionTablePermission;
					}else{
						if(isBusinessRulesAdmin)
							items[items.length] = audit;
						else
							items[items.length] = '';
					}
				} else {
					items[items.length] = "<span class='action-buttons permissionAction'><a class='text-purple iconCursor ace-popover' data-trigger='hover' data-placement='bottom' data-content='"+$("#businessRuleEditorEditError").text()+"' data-original-title='' title=''><i class='fa-zoom-in fa fa-info-circle'></i></a></span>";
				}
				items[items.length] = value.ownerPackage;
                items[items.length] = value.version;
                items[items.length] = '';
            } else {
				items[items.length] = '<label class="position-relative"><input name="selectedPackages" type="checkbox" class="ace" onclick="updateHeaderCheckbox(this)" value="' + value.ownerPackage + '"/><span class="lbl"></span></label>';
                items[items.length] = "<span><span class='packNameOfProcess'>" + value.package_name + "  [v" + value.version + "]&nbsp;&nbsp;</span></span>";
                items[items.length] = '';
                items[items.length] = '';
                for (var i = items.length; i < 7; i++) {
                    items[i] = " ";
                }
                
                items[items.length] = "THIS IS A PACKAGE";
                items[items.length] = '';
                items[items.length] = value.dtIdList;
            }
            var a = businessRuleTable.fnAddData(items, false);
            var oSettings = businessRuleTable.fnSettings();
            var row = oSettings.aoData[a[0]].nTr;
            if (value.type === "package") row.className = "bre-package-row";
        });
        businessRuleTable.fnDraw(true);
        $('.ace-popover').popover();
        $('#business_rules_length').remove();
        $('#business_rules thead tr th').removeClass("sorting_asc").removeClass("sorting");
    } else if (data.error_message != undefined) {
        showErrorNotification(data.error_message);
    }
    if (data.bredecisiontable != undefined && data.bredecisiontable.length == 0) {
        $('#roles_pagination').remove();
        $('.paginationRows').remove();
        $("#business_rules_wrapper .showEntries").remove();
    } else
        handlePagination(data);
    removeLoading($('#business_rules_wrapper'), false);
    $('#business_rules tr th input:first').prop('checked', false);
	$('#business_rules_filter a').remove();
	$('#business_rules_filter').append(breButtonHeader($('#viewAllBRE').text()));
	$('#business_rules_filter').find('input').attr('onkeyup', 'javascript:updateBREShowEntries()');
	$('#business_rules_filter').find('input').attr('placeholder', $('#searchBRE').text());
    applyNiceScroll($('#business_rules_wrapper').find('.table_container'), 190);
    $('#business_rules .dataTables_empty').html($('#noBusinessRulesFound').text());
}

function getBRETableData(path, editable, id){
	$('#breWarning').empty();
	$('#business_rules_warning').addClass('hide');
	breRelativePath = path;
	isBreEditable = editable === "edit" ? "true" : "false";
	businessRuleID = id;
	addLoading('#breTable');
	if(isBreEditable == "true")
		getLockStatus();

	var data = {
		path: path
	};
	sendAjaxCall("dtdeployment/bre/dt", "GET", false, true, "xml", data, handleBREAjaxError, populateBREData);
}

function getBRETableDataForMonitoring(path, editable, isOldVersion){
	$('#breWarning').empty();
	$('#business_rules_warning').addClass('hide');
	isBreEditable = editable === "edit" ? "true" : "false";
	addLoading('#breTable');
	if(isBreEditable == "true")
		getLockStatus();
	if(isOldVersion != "true"){
		showInformation($("#businessRuleEditorViewError").text());
	} else {
		var data = {
			path: path
		};
		sendAjaxCall("dtdeployment/bre/deployeddt", "GET", false, true, "xml", data, handleBREAjaxError, populateBREData);
	}
}

function removeTextNode(node){
	var child = node.childNodes;
	for (var i = 0; i < child.length; i++) {
		if(child[i].nodeType == 3){
			node.removeChild(child[i]);
		}
	}
	return node;
}

function populateBREData(data){
	xmlDoc = data;
	formTable();
	$('#breTableDataModal .modal-body').css('height', $(window).height() - 190).css('overflow-y','auto');
	$('#breTableDataModal .modal-dialog').css('width', $(window).width() - 20).css('margin-top', '0px');
	modalShow('breTableDataModal');
	if (isBreEditable == "true"){
		$('#breTableDataModal .modal_heading').text($('#businessRuleEditor').text());
		$('#breTableDataModal .modal-footer').removeClass('hide');
	} else {
		$('#breTableDataModal .modal_heading').text($('#businessRuleViewer').text());
		$('#breTableDataModal .modal-footer').addClass('hide');
	}
	removeLoading('#breTable');
}

function formTable(){
	$('#breTable').empty();
	$('#breWarning').empty();
	$('#business_rules_warning').addClass('hide');
	countCondition = 0;
	countAction = 0;
	getTableHeader($(xmlDoc).find('decisionheader'));
	formTableData($(xmlDoc).find('decisionnode')[0]);
	$('.ace-popover').popover({
			container: '#breTable',
		});
	if(isBreEditable == "true" && isLocked){
		$('.editable').editable({
			mode:'inline',
			type: 'text',
			toggle: 'manual',
			emptytext: '',
			success:function(response, newValue){
				var doc = $(this).closest('td').data('doc');
				$(doc).attr('expression', newValue);
			}
		});
		$('.editableDate').editable({
			mode:'inline',
			type: 'adate',
			emptytext: userPreferences.dateFormat,
			date: {
				format: userPreferences.dateFormat.toLowerCase(),
				viewformat: userPreferences.dateFormat.toLowerCase(),
				weekStart: 1
			},
			success:function(response, newValue){
				var doc = $(this).closest('td').data('doc');
				if(newValue != "")
					$(doc).attr('expression', moment(newValue, userPreferences.dateFormat.toUpperCase()).format('DD/MM/YYYY'));
				else
					$(doc).attr('expression', '');
			}
		});
		$('.editableNumber').editable({
			mode:'inline',
			type: 'text',
			toggle: 'manual',
			emptytext: '0',
			success:function(response, newValue){
				var doc = $(this).closest('td').data('doc');
				$(doc).attr('expression', newValue);
			},
			validate: function(value) {
				if (!value.toString().match(/^[-]?\d*\.?\d*$/)) {
					return 'Only numbers allowed.';
				}
			}
		});
	}
}

function deleteRow(elm){
	addLoading('#breTable');
	var doc = $(elm).closest('td').data("doc");
	var parent =  doc.parentNode;
	$(doc).remove();
	removeParent(parent);
	formTable();
	removeLoading('#breTable');
}

function addRow(elm){
	var cloneDoc;
	addLoading('#breTable');
	var doc = $(elm).closest('td').data("doc");
	var index = $(elm).closest('tr').index();
	var headerid = doc.getAttribute('headerid');
	if(getNodeType(headerid) == 'Action'){
		var parent = doc.parentNode;
		while(getNodeType(parent.getAttribute('headerid')) == 'Action'){
			parent = parent.parentNode;
		}
		cloneDoc = $(parent).clone();
		$(cloneDoc).attr('expression', '*');
		$(parent).before(cloneDoc);
	}else{
		cloneDoc = $(doc).clone();
		$(cloneDoc).attr('expression', '*');
		$(doc).before(cloneDoc);
	}
	formTable();
	isRowAdded = false;
	$('#breTable tbody > tr').removeClass('greyBackground');
	$('#breTable tbody > tr').find('td').removeClass('greyBackground');
	$('#breTable tbody > tr:eq('+index+')').find('.options').removeClass('lightGrey');
	highlightAddedRow('#breTable tbody > tr:eq('+index+')', $(elm).closest('td').index());
	$('#breTable tbody > tr:eq('+index+')').find('td').removeClass("lightGrey");
	$('#breTable tbody > tr:eq('+index+')').find('td').addClass("lightYellow");
	
	setTimeout(function() {
		isRowAdded = true;
		$('#breTable tbody > tr').removeClass('greyBackground');
		$('#breTable tbody > tr').find('td').removeClass('greyBackground');
		$('#breTable tbody > tr').removeClass("lightYellow");
		$('#breTable tbody > tr').find('td').removeClass("lightYellow");
		$('#breTable tbody > tr:eq('+index+')').removeClass("lightYellow");
		$('#breTable tbody > tr:eq('+index+')').find('.options').addClass('lightGrey');
	}, 3000);
	
	removeLoading('#breTable');
}

function highlightAddedRow(row, currentColumnIndex){
	var isStop = false;
	var isSame = true;
	var currentTotalTD = $(row).find('td').length;
	var currentRowIndex = $(row).index();
	var maxTD = $('#breTable tbody > tr:eq(2) td').length;
	var rows = $('#breTable tbody > tr:lt('+currentRowIndex+')');
	for(var i=rows.length-1; i>=0;i--){
		var tr = rows[i];
		var totalTD = $(tr).find('td').length;
		if(totalTD > currentTotalTD){
			if(!isStop){	
				$(tr).find('td:lt('+(totalTD - currentTotalTD)+')').removeClass("greyBackground");
				$(tr).find('td:lt('+(totalTD - currentTotalTD)+')').addClass("lightYellow");
			}
			if(totalTD == maxTD){
				isStop = true;
			}
			currentTotalTD++;
		}
	}
}

function removeHighLightedAddedRow(row, currentColumnIndex){
	var isStop = false;
	var currentTotalTD = $(row).find('td').length;
	var currentRowIndex = $(row).index();
	$('#breTable tbody > tr').removeClass('greyBackground');
	var maxTD = $('#breTable tbody > tr:eq(2) td').length;
	var rows = $('#breTable tbody > tr:lt('+currentRowIndex+')');
	for(var i=rows.length-1; i>=0;i--){
		var tr = rows[i];
		var totalTD = $(tr).find('td').length;
		if(totalTD > currentTotalTD){
			$(tr).find('td:lt('+currentTotalTD+')').css("background-color", "#ffffff");
		}
	}
}

function removeParent(elm){
	var parent = elm;
	while((getNodeType(parent.getAttribute('headerid')) == "Condition") || (getNodeType(parent.getAttribute('headerid')) == "Action")){
		var test = parent.parentNode;
		if(!parent.hasChildNodes()){
			$(parent).remove();
		}
		parent = test;
	}
}

function formTableData(elm){
	var buttons = $('<span/>').addClass('pull-right action-icon hide');
	var add = $('<button type="button" class="btn btn-primary btn-sm ace-popover cursorDefault modifyBre" data-trigger="hover" data-placement="bottom" data-content="Add Row" />').attr('onclick', "addRow(this)").append($('<i/>').addClass('fa fa-plus-circle'));
	var del = $('<button type="button" class="btn btn-default btn-sm ace-popover cursorDefault modifyBre" data-trigger="hover" data-placement="bottom" data-content="Delete Row" />').attr('onclick', "deleteRow(this)").append($('<i/>').addClass('fa fa-times'));
	buttons.append(add).append("  ").append(del);
	actions = buttons;
	if(elm != undefined){
		elm = removeTextNode(elm);
		$(elm).children().each(function(key,val){
			var tr = $('<tr/>');
			var td = $('<td/>').addClass('notDate').append($('<div/>'));
			var span = $('<span/>').addClass('editable inline-input');
			var hid = $(val).attr('headerid');
			if (getNodeType(hid) == "Condition"){
				len = getRowSpan(val,0)
				if(len == 0){
						td.attr('rowspan',1);
				} else{
						td.attr('rowspan',len);
				}
				td.addClass('click');
				td.find('div').append(actions.clone());
			}
			var expressionVal = $(val).attr('expression');
			
			if(expressionVal.indexOf('==') == 0){
				expressionVal = expressionVal.replace(/==/, '');
			}
			span.text(expressionVal);
			td.find('div').append(span);
			td.data('doc',val);
			tr.append(td);
			getChildren(this, tr);
		});
	}

}

function getChildren(elm, row){
	var td ;
	var len = 0;
	elm = removeTextNode(elm);
	if($(elm).children().length > 0){
		var nodes = $(elm).children();
		for(var i=0;i<nodes.length;i++){
			if(i==0){
				td = $('<td/>').addClass('notDate').append($('<div/>'));
				var hid = $(nodes[i]).attr('headerid');
				if ((getNodeType(hid) == "Condition") || (getNodeType(hid) == "Action")){
					len = getRowSpan(nodes[i],0)
					if(len == 0)
						td.attr('rowspan',1)
					else
						td.attr('rowspan',len)
					td.addClass('click');
					td.find('div').append(actions.clone());
				}
				if (getNodeType(hid) == "Action"){
					td.addClass('options lightGrey');
				}
				var expressionVal = $(nodes[i]).attr('expression');
				
				if(expressionVal.indexOf('==') == 0){
					expressionVal = expressionVal.replace(/==/, '');
				}
				td.find('div').append($('<span/>').addClass('editable').text(expressionVal));
				td.data('doc',nodes[i]);
				row.append(td);
				var headerid = elm.getAttribute('headerid');
				if(headerid < countCondition-1){
					getChildren(nodes[i], row);
				} else if(headerid == countCondition-1){
					formLinesData(nodes[i],row);
				}
			}else{
				var headerid1 = $(nodes[i]).attr('headerid');
				if(getNodeType(headerid1) == "Condition"){
					tr = $('<tr/>');
					td = $('<td/>').addClass('notDate').append($('<div/>'));
					var expressionVal = $(nodes[i]).attr('expression');
					
					if(expressionVal.indexOf('==') == 0){
						expressionVal = expressionVal.replace(/==/, '');
					}
					var span = $('<span/>').addClass('editable').text(expressionVal);
					len = getRowSpan(nodes[i],0)
					if(len == 0)
						td.attr('rowspan',1)
					else
						td.attr('rowspan',len)
					td.addClass('click');
					td.find('div').append(actions.clone()).append(span);
					td.data('doc',nodes[i]);
					tr.append(td);
					getChildren(nodes[i], tr);
				}else {
					td = $('<td/>').addClass('notDate').append($('<div/>'));
					var tr = $('<tr/>');
					var expressionVal = $(nodes[i]).attr('expression');
					
					if(expressionVal.indexOf('==') == 0){
						expressionVal = expressionVal.replace(/==/, '');
					}
					var span = $('<span/>').addClass('editable').text(expressionVal);
					var hid = $(nodes[i]).attr('headerid')
					if (parseInt(hid) < countCondition){
						len = getRowSpan(nodes[i],0)
						if(len == 0)
							td.attr('rowspan',1)
						else
							td.attr('rowspan',len)
						td.addClass('click')
						td.find('div').append(actions.clone());
					}
					td.find('div').append(span);
					td.data('doc',nodes[i])
					tr.append(td);
					formLinesData(nodes[i],tr);
				}
			}
		}
	}else{
		$('#breTable').append(row);
	}
}

function getHeaderType(headerid){
	if(headerid == undefined){
		return "";
	} else{
		var headers = $(xmlDoc).find('decisionheader');
		return headers[headerid].getAttribute('expression');
	}
}

function formLinesData(elm,row){
	elm = removeTextNode(elm);
	if($(elm).children().length > 0){
		var node = $(elm).children()[0];
		var headerid = node.getAttribute("headerid");
		var exprssionType = getHeaderType(headerid);
		if(exprssionType != "" && exprssionType != undefined){
			var td ;
			var span;
			if(exprssionType === "Effective Date" || exprssionType === "Expiration Date"){
				td = $('<td/>').addClass('options lightGrey').append($('<div/>'));
				var expressionDate = node.getAttribute('expression');
				if(expressionDate == "")
					span = $('<span/>').addClass('editableDate').text(userPreferences.dateFormat.toUpperCase().toLowerCase().replace(/mm/,'MM'));
				else{
					span = $('<span/>').addClass('editableDate').text(moment(expressionDate, 'DD/MM/YYYY').format(userPreferences.dateFormat.toUpperCase()));
				}
			}else if(exprssionType === "XOR Group" || exprssionType === "XOR Rule Group"){
				td = $('<td/>').addClass('xor options lightGrey iconCursor').append($('<div/>'));
				span = $('<span/>').text(node.getAttribute('expression'));
				var select = $('<select/>').addClass('xorSelect hide iconCursor');
				var inputType = $('<input type="text" align="middle"/>').addClass('xorInput hide iconCursor');
				td.find('div').append(select);
				td.find('div').append(inputType);
			}else if(exprssionType === "Salience"){
				td = $('<td />').addClass('salience options lightGrey iconCursor').append($('<div/>'));
				span = $('<span/>').addClass('editableNumber').text(node.getAttribute('expression'));
			} else if(getNodeType(headerid) === 'Action'){
				td = $('<td/>').addClass('notDate').append($('<div/>'));
				td.addClass('click options lightGrey');
				td.find('div').append(actions.clone());
				span = $('<span/>').addClass('editable').text(node.getAttribute('expression'));
			}
			td.find('div').append(span);
			td.data('doc',node);
			row.append(td)
		}
		formLinesData(node,row)
	} else {
		$('#breTable').append(row);
	}
}

function getRowSpan(elm,len){
	$.each(elm.childNodes,function(key,val){
		var hid = $(val).attr('headerid')
		if (parseInt(hid) < countCondition){
			if (parseInt(hid) == (countCondition -1))
				len++
			else
				len = getRowSpan(val,len)
		}
	})
	return len
}

function dragCondition(e, ob){
	var headerid = $(ob).data('headerid');
	e.dataTransfer.setData('headerid', $(ob).data('headerid'));
}

function allowDrop(e, ob) {
	e.preventDefault();
	var prevId = $(ob).closest('th').data('headerid');
	var currentId = e.dataTransfer.getData('headerid');
	if(currentId == countCondition+1){
		$(ob).removeClass('dottedBorder');
	}else if(currentId > countCondition+1){
		if(prevId > countCondition+1){
			$(ob).addClass('dottedBorder');
		}
	}else{
		if(prevId < countCondition+1){
			$(ob).addClass('dottedBorder');
		}
	}
}

function drop(e, ob) {
	e.preventDefault();
	var prevId = $(ob).closest('th').data('headerid');
	var currentId = e.dataTransfer.getData('headerid');
	if(currentId == countCondition+1){
		$(ob).removeClass('dottedBorder');
	}else if(currentId > countCondition+1){
		if(prevId > countCondition+1){
			changeHeader(currentId,prevId);
			$(ob).removeClass('dottedBorder');
		}
	}else{
		if(prevId < countCondition+1){
			changeHeader(currentId,prevId);
			$(ob).removeClass('dottedBorder');
		}
	}
}

function changeHeader(from, to){
	if(from != to){
		var data = {
			fromIndex: from-1,
			toIndex: to-1
		};
		if(is_ie8)
			data.dtcontent = xmlDoc.xml
		else
			data.dtcontent = new XMLSerializer().serializeToString(xmlDoc),
		sendAjaxCall("dtdeployment/bre/reorder", "POST", false, true, "xml", data, handleBREAjaxError, populateDataAfterColumnChange);
	}
}

function populateDataAfterColumnChange(data){
	xmlDoc = data;
	formTable();
	$('#breTableDataModal .modal-body').css('height', $(window).height() - 190).css('overflow-y','auto');
	$('#breTableDataModal .modal-dialog').css('width', $(window).width() - 20).css('margin-top', '0px');
	modalShow('breTableDataModal');
	if(isBreEditable == "true"){
		$('#breTableDataModal .modal_heading').text($('#businessRuleEditor').text());
		$('#breTableDataModal .modal-footer').removeClass('hide');
	}else{
		$('#breTableDataModal .modal_heading').text($('#businessRuleViewer').text());
		$('#breTableDataModal .modal-footer').addClass('hide');
	}
	removeLoading('#breTable');
	getHeaderType(); 
}

function leaveDrop(e, ob){
	$(ob).removeClass('dottedBorder');
}

function getTableHeader(elm){
	var tr = $('<tr/>');
	var countOption = 0;
	var count = 1;
	var headerCount=0;
	breDataType = [];
	breNodeType = [];
	$.each(elm, function(key, val){
		var type = {
		};
		var breNode = {
		};
		type[headerCount] = val.getAttribute('returntype');
		breNode[headerCount] = val.getAttribute('nodetype');
		headerCount++;
		breDataType.push(type);
		breNodeType.push(breNode);
		var td ;
		var div ;
		if(val.getAttribute('nodetype') == "Condition"){
			td = $('<th draggable="true" ondragstart="dragCondition(event, this)" />').addClass('dragableHeader conditionColor').css('width', '230px');
			div = $('<div ondrop="drop(event, this)" ondragover="allowDrop(event, this)" ondragleave="leaveDrop(event, this)" style="width:5px; height:20px;margin-left:-10px"/>').addClass('headerCondition pull-left');
			countCondition++;
		} else if(val.getAttribute('nodetype') == "Action"){
			td = $('<th draggable="true" ondragstart="dragCondition(event, this)" />').addClass('dragableHeader actionColor').css('width', '235px');
			div = $('<div ondrop="drop(event, this)" ondragover="allowDrop(event, this);" ondragleave="leaveDrop(event, this)" style="width:5px; height:20px;margin-left:-10px"/>').addClass('headerAction pull-left');
			countAction++;
		} else if(val.getAttribute('nodetype') == "Options"){
			td = $('<th  data-trigger="hover" data-placement="bottom" draggable="true" ondragstart="dragCondition(event, this)"  />').addClass('dragableHeader optionsColor ace-popover');

			if (val.getAttribute('expression') === "Effective Date"){
				td.attr('data-content', $('#breEffectiveDate').text());
			}else if (val.getAttribute('expression') === "Expiration Date"){
				td.attr('data-content', $('#breExpirationDate').text());
			}else if (val.getAttribute('expression') === "Salience"){
				td.attr('data-content', $('#breSalience').text());
			}else if(val.getAttribute('expression') === "XOR Group" || val.getAttribute('expression') === "XOR Rule Group"){
				td.addClass('xorRuleGroup');
				td.attr('data-content', $('#breXorRuleGroup').text());
			}
			div = $('<div ondrop="drop(event, this)" ondragover="allowDrop(event, this)" ondragleave="leaveDrop(event, this)" style="width:5px; height:20px;margin-left:-10px"/>').addClass('headerOptions pull-left');
			countOption++;
		}
		td.append(div);
		td.attr('dj',count);
		td.append(val.getAttribute('expression')).data('headerid', count);
		count++;
		tr.append(td);
	});
	var tr1 = $('<tr/>');
	for(var i=0; i<3 ;i++){
		var th = $('<th class="breTableHeader"/>');
		if(i == 0){
			th.attr('colspan',countCondition);
			th.text('CONDITIONS');
		} else if(i == 1){
			th.attr('colspan',countAction);
			th.text('ACTIONS');
		}else{
			th.attr('colspan',countOption);
			th.text('OPTIONS');
		}
		tr1.append(th);
	}
	$('#breTable').append(tr1);
	 
	$('#breTable').append(tr);
}

function getDataType(headerid){
	var type = '';
	if(breDataType != null && breDataType != undefined){
		$.each(breDataType, function(key, val){
			for(var id in val){
				if(id == headerid){
					type = val[id];
				}
			}
		});
	}
	return type;
}

function getNodeType(headerid){
	var breNode = '';
	if(breNodeType != null && breNodeType != undefined){
		$.each(breNodeType, function(key, val){
			for(var id in val){
				if(id == headerid){
					breNode = val[id];
				}
			}
		});
	}
	return breNode;
}

function validateBRETable(){
	addLoading('#breTable');
	var data = {
		path: breRelativePath
	}
	if(is_ie8)
		data.dtcontent = xmlDoc.xml
	else
		data.dtcontent = new XMLSerializer().serializeToString(xmlDoc)
	sendAjaxCall("dtdeployment/bre/validate", "POST", false, true, "json", data, handleBREAjaxError, validateBRERule);
}

function validateBRERule(data){
	var rows = $('#breTable tbody > tr');
	var validateMsg;
	$('#breTable tbody > tr td').removeClass('lightYellow');
	removeXORSelect();
	rows.find('td').removeClass('redBackground');
	showWarning(data.dtvalidationwarnings);
	if(data.dtvalidationwarnings.length == 0)
		validateMsg = $('#businessRulesValidatedSuccess').text();
	else
		validateMsg = $('#businessRulesValidatedWithWarningSuccess').text();
	if(!data.isdtvalid){
		highLightTableData(data.dtvalidationerrors);
		showErrorNotificationFade($('#businessRulesValidatedError').text());
	}else{
		showNotification(validateMsg);
	}
	removeLoading('#breTable');
}

function showWarning(warning){
	$('#breWarning').empty();
	if(warning != null && warning.length != 0){
		$('#business_rules_warning').removeClass('hide');
		$('#breWarning').append("<br/>");
		$.each(warning, function(key, value) {
			var warningMsg = value.errorMsg;
			$('#breWarning').append("<span><a href='#' class='noDecoration' onclick=hightLightWarnings('"+value.overlappingRowNos+"')> <i class='fa fa-exclamation-triangle'/>&nbsp;&nbsp;" + warningMsg + "</a></span><br/>");
		});
	}
}

function hightLightWarnings(warning){
	var totalRow = warning.split(':');
	var rows = $('#breTable tbody > tr');
	$('#breTable tbody > tr td').removeClass('lightYellow');
	$.each(totalRow, function(key, val){
		if(val != ""){
			var row = rows.get(parseInt(val) + 1);
			var totalTD = $(row).find('td').length;
			var maxTD = $('#breTable tbody > tr:eq(2) td').length;
			$($(row).find('td')).removeClass('lightGrey');
			$($(row).find('td')).addClass('lightYellow');
		}
	});
}

function highLightTableData(data){
	var rows = $('#breTable tbody > tr');
	if(data != null && data != undefined){
		$.each(data, function(key, value) {
			var row = rows.get(value.rowNo+1);
			var totalTD = $(row).find('td').length;
			var maxTD = $('#breTable tbody > tr:eq(2) td').length;
			var diff = maxTD - value.columnNo + 1;
			var currentTD = $(row).find('td')[totalTD - diff];
			$(currentTD).removeClass('lightGrey');
			$(currentTD).addClass('redBackground ace-popover iconCursor');
			$(currentTD).attr('data-placement', 'bottom');
			$(currentTD).attr('data-content', value.errorMsg);
		});
		$('.ace-popover').popover({
			container: '#breTable',
			trigger: 'manual',
			placement: 'bottom',
		});
	}
}

function updateBRETable(){
	addLoading('#breTable');
	$('#breWarning').empty();
	$('#business_rules_warning').addClass('hide');
	var data = {
		path : breRelativePath
	};
	if(is_ie8)
		data.dtcontent = xmlDoc.xml
	else
		data.dtcontent = new XMLSerializer().serializeToString(xmlDoc)
	sendAjaxCall("dtdeployment/bre/validate", "POST", false, true, "json", data, handleBREAjaxError, validateUpdatedBRERule);
}

function removeXORSelect(){
	$('#breTable tr td.xor select.xorSelect').addClass('hide');
	$('#breTable tr td.xor input').addClass('hide');
	$('#breTable tr td.xor span').removeClass('hide');
}

function validateUpdatedBRERule(data){
	var rows = $('#breTable tbody > tr');
	rows.find('td').removeClass('redBackground');
	removeXORSelect();
	if(!data.isdtvalid){
		highLightTableData(data.dtvalidationerrors);
		showErrorNotificationFade($('#businessRulesValidatedError').text());
		removeLoading('#breTable');
	}else{
		var data = {
			path : breRelativePath
		};
		if(is_ie8)
			data.dtcontent = xmlDoc.xml
		else
			data.dtcontent = new XMLSerializer().serializeToString(xmlDoc)
		sendAjaxCall("dtdeployment/bre/update", "POST", false, true, "json", data, handleBREAjaxError, updateBRERules);
	}
}

function updateBRERules(data){
	if(data != null && data != undefined){
		if(data.success_message != null && data.success_message != undefined){
			var rows = $('#breTable tbody > tr');
			rows.find('td').removeClass('redBackground');
			isBRESaveOrUpdate = true;
			showNotification(data.success_message);
		}else{
			showErrorNotification(data.error_message);
		}
	}
	removeLoading('#breTable');
}

function deployBRETable(){
	addLoading('#breTable');
	var data = {
		path : breRelativePath
	};
	if(is_ie8)
		data.dtcontent = xmlDoc.xml
	else
		data.dtcontent = new XMLSerializer().serializeToString(xmlDoc)
	sendAjaxCall("dtdeployment/bre/validate", "POST", false, true, "json", data, handleBREAjaxError, deployUpdatedBRERules);
}

function deployUpdatedBRERules(data){
	var rows = $('#breTable tbody > tr');
	rows.find('td').removeClass('redBackground');
	removeXORSelect();
	if(!data.isdtvalid){
		highLightTableData(data.dtvalidationerrors);
		showErrorNotificationFade($('#businessRulesValidatedError').text());
		removeLoading('#breTable');
	}else{
		var data = {
			path : breRelativePath
		};
		if(is_ie8)
			data.dtcontent = xmlDoc.xml
		else
			data.dtcontent = new XMLSerializer().serializeToString(xmlDoc)
		sendAjaxCall("dtdeployment/bre/deploy/dtcontent", "POST", false, true, "json", data, handleBREAjaxError, deployBRERules);
	}
}

function deployBRERules(data){
	if(data != null && data != undefined){
		if(data.success_message != null && data.success_message != undefined){
			$('#breWarning').empty();
			$('#business_rules_warning').addClass('hide');
			var rows = $('#breTable tbody > tr');
			rows.find('td').removeClass('redBackground');
			isBRESaveOrUpdate = true;
			showNotification(data.success_message);
		}else{
			showErrorNotification(data.error_message);
		}
	}
	removeLoading('#breTable');
}

function appendXORGroup(select, value){
	var xor = getXORGroup();
	var option;
	option = $('<option>').val("").text("");
	select.append(option);
	$.each(xor, function(val){
		if(xor[val] == value){
			option = $('<option>').val(xor[val]).text(xor[val]).attr('selected','selected');
		}else{
			option = $('<option>').val(xor[val]).text(xor[val]);
		}
		select.append(option);
	});
}

function getXORGroup(){
	var xor = xmlDoc.getElementsByTagNameNS('*', 'optionnode');
	var xorValue = [];
	var count = 0;
	var headerid ;
	for(var i=0;i< xor.length;i++){
		count++;
		headerid = xor[i].getAttribute('headerid');
		if(getHeaderType(headerid) === "XOR Group" || getHeaderType(headerid) === "XOR Rule Group"){
			var expr = xor[i].getAttribute('expression');
			if(expr != "" && expr != undefined){
				if($.inArray(expr, xorValue) == -1){
					xorValue.push(expr);
				}
			}
		}
	}
	return $.unique(xorValue);
}


function getSelectedVal(val){
	var doc = $(val).closest('td').data('doc');
	$(doc).attr('expression', $(val).val());
}

function highlighRow(td){
	var isStop = false;
	var isSame = true;
	var row = $(td).closest('tr');
	var currentTotalTD = $(row).find('td').length;
	var currentRowIndex = $(row).index();
	var currentColumnIndex = $(td).index();
	var maxTD = $('#breTable tbody > tr:eq(2) td').length;
	var rows = $('#breTable tbody > tr:lt('+currentRowIndex+')');
	for(var i=rows.length-1; i>=0;i--){
		var tr = rows[i];
		var totalTD = $(tr).find('td').length;
		if(totalTD > currentTotalTD){
			if(!isStop){
				$(tr).find('td:lt('+(totalTD - currentTotalTD)+')').addClass('greyBackground');
			}
			if(totalTD == maxTD){
				isStop = true;
			}
			currentTotalTD++;
		}
	}
}

function removeHighLightedRow(td){
	var isStop = false;
	var row = $(td).closest('tr');
	var currentTotalTD = $(row).find('td').length;
	var currentRowIndex = $(row).index();
	var currentColumnIndex = $(td).index();
	var maxTD = $('#breTable tbody > tr:eq(2) td').length;
	var rows = $('#breTable tbody > tr:lt('+currentRowIndex+')');
	for(var i=rows.length-1; i>=0;i--){
		var tr = rows[i];
		var totalTD = $(tr).find('td').length;
		if(totalTD > currentTotalTD){
			if(!isStop){
				$(tr).find('td:lt('+currentTotalTD+')').removeClass('greyBackground');
			}
			if(totalTD == maxTD){
				isStop = true;
			}
		}
	}
}

function updateChildrenCheckBox(obj) {
    if ($(obj).prop('checked'))
        selectAll(obj);
    else
        unSelectAll(obj);
}

function selectAll(obj) {
    $(obj).closest('table').find('tr > td:first-child input:checkbox')
        .each(function() {
			this.checked = obj.checked;
			$(this).closest('tr').addClass('row_selected');
        });
}

function unSelectAll(obj) {
    $(obj).closest('table').find('tr > td:first-child input:checkbox')
        .each(function() {
            this.checked = obj.checked;
            $(this).closest('tr').removeClass('row_selected');
        });
}

function breAccessPermission(){
	var breProcesses = getBREProcessDetails();
	if(breProcesses != null){
		getRolesAndUsers();
		breDecisionIDs = breProcesses;
		if(breDecisionIDs.length == 1 && !isBREPackageSelected){
			addLoading($("#breAccessPermissionModal").find('.modal-body'));
			var data = {
				dtId : breDecisionIDs[0]
			}
			setTimeout(function() {
				sendAjaxCall('dtdeployment/bre/list/dt', "GET", false, true, "json", data, handleAjaxError, populateUsersRolesData);
			},1000);
		}
		$('#selectPermissionError').text('');
		modalShow('breAccessPermissionModal');
	}
}

function populateUsersRolesData(data){
	var breView = [];
	var breEdit = [];
	if(data != null){
		if(data.bredecisiontable.permissions != null){
			if(data.bredecisiontable.permissions.edit != null && data.bredecisiontable.permissions.edit.role != null){
				$.each(data.bredecisiontable.permissions.edit.role, function(key, val){
					if(val != null && val != ""){
						breEdit.push(val + "~roles");
						breEditPermission.addOption({id:val+"~roles",value:val,group:''});
					}
				});
				$.each(data.bredecisiontable.permissions.edit.user, function(key, val){
					if(val != null && val != ""){
						breEdit.push(val + "~users");
						breEditPermission.addOption({id:val+"~users",value:val,group:''});
					}
				});
			}
			if(data.bredecisiontable.permissions.view != null && data.bredecisiontable.permissions.view.role != null){
				$.each(data.bredecisiontable.permissions.view.role, function(key, val){
					if(val != null && val != ""){
						breView.push(val+"~roles");
						breViewPermission.addOption({id:val+"~roles",value:val});
					}
				});
				$.each(data.bredecisiontable.permissions.view.user, function(key, val){
					if(val != null && val != ""){
						breView.push(val+"~users");
						breViewPermission.addOption({id:val+"~users",value:val});
					}
				});
			}
		}
		breEditPermission.setValue(breEdit);
		breViewPermission.setValue(breView);
	}
	removeLoading();
}

function getBREProcessDetails() {
    var columnsData = getSelectedRows(businessRuleTable, true);
    isBREPackageSelected = false;
    var process = new Array();
    if (columnsData.length != 0) {
        $.each(columnsData, function(key, value) {
			if($(value[1]).find('.packNameOfProcess').length != 0){
				isBREPackageSelected = true;
				var pkg = value[9];
				if(pkg != null && pkg.length != 0){
					$.each(pkg, function(key, val){
						process.push(val.toString());
					});
				}
			} else
				process.push($(value[0]).find('input').val());
        });
        return $.unique(process);
    } else {
        showInformation($('#businessRulesShareError').text());
        return null;
    }
}

function getRolesAndUsers() {
    var data = {};
    breEditPermission.clearOptions();
    breViewPermission.clearOptions();

	sendAjaxCall('orgMapping/users/peers_subordinates', "GET", false, true, "json", data, handleAjaxError, function(data) {
		for(var k=0;k<data.users.peers.length;k++){
			breEditPermission.addOption({id:data.users.peers[k].userID+"~users",value:data.users.peers[k].userName,group:'peers'});
			breViewPermission.addOption({id:data.users.peers[k].userID+"~users",value:data.users.peers[k].userName,group:'peers'});
		}
		for(var k=0;k<data.users.subordinates.length;k++){
			breEditPermission.addOption({id:data.users.subordinates[k].userID+"~users",value:data.users.subordinates[k].userName,group:'subordinates'});
			breViewPermission.addOption({id:data.users.subordinates[k].userID+"~users",value:data.users.subordinates[k].userName,group:'subordinates'});
		}
		var roleData = {};
		sendAjaxCall('orgMapping/users/loggedin_user_roles', "GET", false, true, "json", roleData, handleAjaxError, function(data) {
			for(var k=0;k<data.roles.external_roles.length;k++){
				breEditPermission.addOption({id:data.roles.external_roles[k]+"~roles",value:data.roles.external_roles[k],group:'external'});
				breViewPermission.addOption({id:data.roles.external_roles[k]+"~roles",value:data.roles.external_roles[k],group:'external'});
			}
			for(var k=0;k<data.roles.internal_roles.length;k++){
				breEditPermission.addOption({id:data.roles.internal_roles[k]+"~roles",value:data.roles.internal_roles[k],group:'internal'});
				breViewPermission.addOption({id:data.roles.internal_roles[k]+"~roles",value:data.roles.internal_roles[k],group:'internal'});
			}
        });
    });
}

function updatePermission(){
	var viewPermission = $('#viewBREPermission').val();
	var editPermission = $('#editBREPermission').val();
	if(viewPermission == null && editPermission == null){
		$('#updateBREPermission').removeAttr('data-dismiss');
		$('#selectPermissionError').text($('#accessPermissionUpdateError').text());
	}else{
		var view_roles = [];
		var edit_roles = [];
		var view_users = [];
		var edit_users = [];
		if(viewPermission != null){
			$.each(viewPermission, function(key, val){
				var splitView = val.split('~');
				if (splitView[1].indexOf('roles') >= 0)
					view_roles[view_roles.length] = splitView[0];
				else
					view_users[view_users.length] = splitView[0];
			});
		}
		if(editPermission != null){
			$.each(editPermission, function(key, val){
				var splitEdit = val.split('~');
				if (splitEdit[1].indexOf('roles') >= 0)
					edit_roles[edit_roles.length] = splitEdit[0];
				else
					edit_users[edit_users.length] = splitEdit[0];
			});
		}
		var data = {
			dtIds : breDecisionIDs,
			viewRoles : view_roles,
			viewUsers : view_users,
			editRoles : edit_roles,
			editUsers : edit_users
		};
		addLoading('updatePermissionTable');
		$('#selectPermissionError').text('');
		$('#updateBREPermission').attr('data-dismiss','modal');
		sendAjaxCall('dtdeployment/access/update', "POST", false, true, "json", data, handleAjaxError, updatedPermissionMsg);
	}
}

function updatedPermissionMsg(data){
	if(data != null){
		if(data.success_message != null){
			showNotification(data.success_message);
			listBRE();
		}else{
			showErrorNotification(data.error_message);
		}
	}
	removeLoading('updatePermissionTable');
}

function sortBREData(obj, type){
	$('#business_rules th span').addClass('hide');
    $('#business_rules th span.lbl').removeClass('hide');
    $(obj).find('span').removeClass('hide');
    if ($(obj).attr('sort') == 'desc') {
        $(obj).find('span i').removeAttr('class').addClass('fa fa-sort-up blue');
        $(obj).attr('sort', 'asc');
        type = '+' + type;
    } else {
        $(obj).find('span i').removeAttr('class').addClass('fa fa-sort-down blue');
        $(obj).attr('sort', 'desc');
        type = '-' + type;
    }
    addLoading('#business_rules_wrapper');
    paginationData.sortBy = type;
    sendAjaxCall("dtdeployment/bre/list/all", "GET", false, true, "json", paginationData, handleBREAjaxError, populateBREList);
}


//this logic is to handle pagination
function handlePagination(data) {
    var paginationObj = $("#business_rules_wrapper .table_pagination");
    totalPageSize = Math.ceil(totalRecords / paginationData.pageSize);
    if (totalPageSize >= 1) {
        $('#bre_pagination').remove();
        $('.paginationRows').remove();
        if (paginationData.requiredPage == parseInt(1)) {
            startNumber = paginationData.requiredPage;
            if (parseInt(data.bredecisiontable.length) != parseInt(paginationData.pageSize))
                endNumber = parseInt(data.bredecisiontable.length);
            else
                endNumber = parseInt(paginationData.pageSize);
        } else {
            var page = parseInt(parseInt(paginationData.requiredPage) - parseInt(1));
            startNumber = parseInt(page * parseInt(paginationData.pageSize) + 1);
            endNumber = parseInt(page * parseInt(paginationData.pageSize) + data.bredecisiontable.length);
        }
        var pageHtml = $(".pageSizePagination").clone();
        $(pageHtml).addClass("paginationRows");
        var pagintaionHtml = $("#paginationTable").clone();
        $(pagintaionHtml).find("#brePageNo").val(paginationData.requiredPage).end().find(".totalPageNo").text(totalPageSize);
        paginationObj.append(pageHtml).append("<div id='bre_pagination' class='dataTables_paginate paging_bootstrap pull-right'></div>");
        paginationObj.find("#bre_pagination").append(pagintaionHtml);
        endNum = startNumber + getBREProcessCount(businessRuleTable) -1;
        showPaginationEntires(startNumber, endNum, "business_rules_wrapper", $('#businessRulePagination').text());
        updatePaginationTable($('#brePageNo').val(), totalPageSize);
        $("select#noOfBRE").val(paginationData.pageSize);
        removeLoading();
        applyNiceScroll($('#business_rules_wrapper').find('.table_container'), 190);
    } else {
        $('#bre_pagination').remove();
        $('.paginationRows').remove();
        paginationObj.find(".showEntries").remove();
    }
}

function getLastFirstPageData(action) {
    if (action === 'last')
        paginationData.requiredPage = Math.ceil(totalRecords / paginationData.pageSize);
    else if (action === 'first')
        paginationData.requiredPage = parseInt(1);
    listBRE();
}

function getNextPrevPageData(action) {
    if (parseInt($('#brePageNo').val()) > totalPageSize || $('#brePageNo').val() == "")
        paginationData.requiredPage = parseInt(1);
    else if (action === 'next' && $('#brePageNo').val() < totalPageSize)
        paginationData.requiredPage = parseInt($("#brePageNo").val()) + 1;
    else if (action === 'prev' && $('#brePageNo').val() > 1)
        paginationData.requiredPage = parseInt($("#brePageNo").val()) - 1;
    listBRE();
}

function getPageNoData(event) {
    if (event.keyCode == parseInt(13) && $("#brePageNo").val() != "" && parseInt($("#brePageNo").val()) != 0 && parseInt($("#brePageNo").val()) <= Math.ceil(totalRecords / paginationData.pageSize)) {
        paginationData.requiredPage = parseInt($("#brePageNo").val());
        listBRE();
    } else if ($("#brePageNo").val() != "" && event.keyCode == parseInt(13) && (parseInt($("#brePageNo").val()) === 0 || parseInt($("#brePageNo").val()) > Math.ceil(totalRecords / paginationData.pageSize))) {
        paginationData.requiredPage = parseInt(1);
        listBRE();
    } else if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
    } else if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105))
        event.preventDefault();
}

function updateNoOfBRE() {
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        userCache.brePageSize = $('#noOfBRE').val();
        $.jStorage.set($("#userid").text(), userCache);
    }
    paginationData.pageSize = $('#noOfBRE').val();
    paginationData.requiredPage = parseInt(1);
    listBRE();
}

function listBRE() {
    addLoading($('#business_rules_wrapper'));
    $('#business_rules .dataTables_empty').text($('#fetchingBusinessRules').text());
    if (userCache != null && userCache != undefined && userCache.brePageSize != null)
		paginationData.pageSize = parseInt(userCache.brePageSize);
	else
		paginationData.pageSize = 10;
	sendAjaxCall("dtdeployment/bre/list/all", "GET", false, true, "json", paginationData, handleBREAjaxError, populateBREList);
}


function getBREProcessCount(oTableLocal) {
    var cunt = 0;
    "use strict";
    var aTrs = oTableLocal._('tr', {
        "filter": "applied"
    });
    for (var i = 0; i < aTrs.length; i++) {
        if ((aTrs[i][8]) != "")
            cunt++;
    }
    return cunt;
}

function refreshBREList(){
	businessRuleTable.fnFilter('');
	addLoading($('#business_rules_wrapper'));
	paginationData.requiredPage = parseInt(1);
	sendAjaxCall("dtdeployment/bre/list/all", "GET", false, true, "json", paginationData, handleBREAjaxError, populateBREList);
}

function updateBREShowEntries(){
	showPaginationEntires(startNumber, endNum);
}

function restoreBRETable(){
	addLoading('#breTable');
	var data = {
		path: breRelativePath
	}
	sendAjaxCall("dtdeployment/bre/restore", "POST", false, true, "json", data, handleBREAjaxError, restoreBRERule);
}

function restoreBRERule(data){
	if(data != null && data != undefined){
		if(data.success_message != null && data.success_message != undefined){
			showNotification(data.success_message);
			isBRESaveOrUpdate = true;
			var data = {
				path: breRelativePath
			};
			sendAjaxCall("dtdeployment/bre/dt", "GET", false, true, "xml", data, handleBREAjaxError, populateBREData);
		}else{
			showErrorNotification(data.error_message);
		}
	}
	removeLoading('#breTable');
}

function lockBRETable(){
	addLoading('#breTable');
	var data = {
		breDTId: parseInt(businessRuleID)
	}
	sendAjaxCall("dtdeployment/access/lock/dt", "GET", false, true, "json", data, handleBREAjaxError, lockBRERule);
}

function lockBRERule(data){
	if(data != null && data != undefined){
		if(data.success_message != null && data.success_message != undefined){
			showNotification(data.success_message);
			isLocked = true;
			isBRESaveOrUpdate = true;
			$('#lockBRE').addClass('hide');
			$('#validateBRE').removeClass('hide');
			$('#updateBRE').removeClass('hide');
			$('#deployBRE').removeClass('hide');
			$('#restoreBRE').removeClass('hide');
			$('#unlockBRE').removeClass('hide');
			var data = {
				path: breRelativePath
			};
			sendAjaxCall("dtdeployment/bre/dt", "GET", false, true, "xml", data, handleBREAjaxError, populateBREData);
		}else{
			showErrorNotification(data.error_message);
		}
	}
	removeLoading('#breTable');
}

function unlockBRETable(){
	addLoading('#breTable');
	var data = {
		breDTId: parseInt(businessRuleID)
	}
	sendAjaxCall("dtdeployment/access/unlock/dt", "GET", false, true, "json", data, handleBREAjaxError, unlockBRERule);
}

function unlockBRERule(data){
	if(data != null && data != undefined){
		if(data.success_message != null && data.success_message != undefined){
			showNotification(data.success_message);
			isBRESaveOrUpdate = true;
			$('#lockBRE').removeClass('hide');
			$('#validateBRE').addClass('hide');
			$('#updateBRE').addClass('hide');
			$('#deployBRE').addClass('hide');
			$('#restoreBRE').addClass('hide');
			$('#unlockBRE').addClass('hide');
			isLocked = false;
			var data = {
				path: breRelativePath
			};
			sendAjaxCall("dtdeployment/bre/dt", "GET", false, true, "xml", data, handleBREAjaxError, populateBREData);
		}else{
			showErrorNotification(data.error_message);
		}
	}
	removeLoading('#breTable');
}

function getLockStatus(){
	var data = {
		breDTId: parseInt(businessRuleID)
	}
	sendAjaxCall("dtdeployment/access/lock/status", "GET", false, true, "json", data, handleBREAjaxError, performLockAction);
}

function performLockAction(data){
	if(data != null && data != undefined){
		if(data.userlockstatus){
			isLocked = true;
			$('#lockBRE').addClass('hide');
			$('#validateBRE').removeClass('hide');
			$('#updateBRE').removeClass('hide');
			$('#deployBRE').removeClass('hide');
			$('#restoreBRE').removeClass('hide');
			$('#unlockBRE').removeClass('hide');
		}else{
			isLocked = false;
			$('#lockBRE').removeClass('hide');
			$('#validateBRE').addClass('hide');
			$('#updateBRE').addClass('hide');
			$('#deployBRE').addClass('hide');
			$('#restoreBRE').addClass('hide');
			$('#unlockBRE').addClass('hide');
		}
	}
}

function updateBusinessRules(){
	if(isBRESaveOrUpdate){
		listBRE();
		isBRESaveOrUpdate = false;
	}
}

function confirmRestore(){
	$('#restoreConfirmationModal').find('.restoreConfirmText').text($('#restoreConfirmation').text());
	modalShow('restoreConfirmationModal');
}

function auditInfo(name, id){
	if (typeof auditBusinessRule == 'undefined') {
			loadJs('scripts/custom/businessRules/businessRulesAudit.js', function() {
				auditBusinessRule(name, id);
			});
		} else
			auditBusinessRule(name, id);
}

function unlockConfirmation(id, lockedBy){
	unlockBusinessRuleID = id;
	$('#unlockConfirmationModal').find('.unlockConfirmText').text($('#unlockConfirmation').text()+ ' ' + lockedBy + '. ' + $('#unlockBusinessRule').text());
	modalShow('unlockConfirmationModal');
}

function unlockBusinessRule(){
	addLoading('#business_rules');
	var data = {
		breDTId: parseInt(unlockBusinessRuleID)
	}
	sendAjaxCall("dtdeployment/access/unlock/dt", "GET", false, true, "json", data, handleBREAjaxError, populateUnlockMsg);
}

function populateUnlockMsg(data){
	if(data != undefined && data != null){
		if(data.success_message != undefined && data.success_message != null){
			showNotification(data.success_message);
			listBRE();
		}else{
			showErrorNotification(data.error_message);
			removeLoading();
		}
	}
}

function deployConfirmation(){
	$('#deployConfirmationModal').find('.deployConfirmText').text($('#deployConfirmation').text());
	modalShow('deployConfirmationModal');
}
