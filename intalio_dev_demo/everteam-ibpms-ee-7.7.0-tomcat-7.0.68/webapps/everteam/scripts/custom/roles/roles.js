/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


/** rolesTable will store the refrence of role table*/
var rolesTable;

/** columnNames will store column names of a role table used for security / LDAP*/
var columnNames = [];

/** securityType will store the type of security default is XML if server is connected to LDAP then it will update to LDAP*/
var securityType ;

/** propertiesData will contain list of properties for roles*/
var propertiesData = new Array();
 
/** roleOptions stores the data table options for role table*/
var roleOptions = {
	"bPaginate": false,
	"bStateSave": true,
	"bInfo": false,
	"bFilter": true,
	"bRetrieve":true,
	"oLanguage": { "sSearch": "" },
	"bAutoWidth": false,
	"aoColumns" : [ {"bSortable": true,"sClass": "center","sWidth":0.025},{"bSortable": true}, {"bSortable": true} ]
 }

/**
 * @Function Name   : jquery ready function
 * @Description     : This function is the starting function for role page we have initialize if anything is required here
 * @param           : 
 * @returns         : 
 * */
$(document).ready(function () {
	$("#property").bind("change", function () {
		removeErrorMessage();
		propertyOnChange();
	});
	$("#fetchedRealms").bind("change", function () {
		removeErrorMessage();
	});
	getAttributes();
});

/**
 * @Function Name   : propertyOnChange
 * @Description     : this will add the property selected in the modal window
 * @param           : 
 * @returns         : 
 * */
function propertyOnChange() {
	if($("#property").val() != 'select')
	{
		if(($("#roleModalBody span input#"+$("#property").val()).length>0 || $("#roleModalBody span select#"+$("#property").val()).length>0) && $("#property").val().indexOf("member")!=0)
			$("#errorMessage").text("Property "+$("#property").val().charAt(0).toUpperCase()+$("#property").val().slice(1)+" already added");
		else if($("#property").val().indexOf('Role')<=0)
		{
			$("#roleModalBody").append("<tr><td>"+$("#property").val().charAt(0).toUpperCase()+$("#property").val().slice(1)+"</td><td><span id='inputProperties'><input type='text' class='input-sm roleProperties' id="+$("#property").val()+" name="+$("#property").val()+" onkeyup=javscript:removeErrorMessage();>&nbsp;&nbsp;<button aria-hidden='true' onclick=javascript:removeProperty(this,'"+$("#property").val()+"'); class='close propertyDelete' type='button'>×</button></span></td></tr>");
		}
		else if($("#property").val().indexOf('Role')>=0) 
		{
			$("#roleModalBody").append("<tr><td>"+$("#property").val().charAt(0).toUpperCase()+$("#property").val().slice(1)+"</td><td><span id='inputProperties'><select class='roleProperties' id="+$("#property").val()+" data-placeholder='Choose Role...' multiple></select><button aria-hidden='true' onclick=javascript:removeProperty(this,'"+$("#property").val()+"'); class='close propertyDeleteSelect' type='button'>×</button></span></td></tr>");
			getRoleList("populateRoles",$("#property").val());
		}
		var propertyValue = $("#property").val();
		if(propertyValue != 'member') {
			var indexValue = parseInt(jQuery.inArray(propertyValue,propertiesData));
			propertiesData.splice(indexValue,1);
		}
		updatePropertiesListFlag();
	}
}

/**
 * @Function Name   : updatePropertiesListFlag
 * @Description     : this updates the properties of user
 * @param           : 
 * @returns         : 
 * */
function updatePropertiesListFlag()
{
	if(propertiesData.length>0)
	{
		$('#property').removeClass('hide');
		removeChosen("property");
		$("#property").append("<option value='select'>Select Property</option>");
		$.each(propertiesData,function(key,obj)
		{
			$("#property").append("<option value='"+obj+"'>"+obj.charAt(0).toUpperCase()+obj.slice(1)+"</option>");
		});	
		$('#property').chosen();
		$('#property_chzn').css('width', '215');
	}
	else
	{
		removeChosen("property");
		$('#property').addClass('hide');
	}
}

/**
 * @Function Name   : getAttributes
 * @Description     : this will get the attributes for role based on LDAP / security xml
 * @param           : 
 * @returns         : 
 * */
function getAttributes()
{
	var data = {};
	sendAjaxCall("console/users/roles/attributes", "GET", false, true, "json",data, handleAjaxError, updateHeaderColumnData);
}

/**
 * @Function Name   : updateHeaderColumnData
 * @Description     : this function will update the role options columns based on LDAP / Security xml
 * @param           : data list of columns
 * @returns         : 
 * */
function updateHeaderColumnData(data)
{
	$("#rolesHeader th:gt(2)").remove();
	var isObject = false;
	var isLastName = false;
	$.each(data.attributes, function(key, value) {
		columnNames[columnNames.length] = value;
		$("#rolesHeader").append("<th>"+value.charAt(0).toUpperCase()+value.slice(1)+"</th>");
		if(value.indexOf("object")>=0){
			isObject = true;
		}
		if(value.indexOf("lastname")>=0){
			isLastName = true;
		}
		if(value.indexOf("member")>=0) 
			roleOptions.aoColumns[roleOptions.aoColumns.length] = {"bSortable": true,"sClass": "alignLeft","sWidth":"100px"};
		else
			roleOptions.aoColumns[roleOptions.aoColumns.length] = {"bSortable": true};
	});
	rolesTable = $('#rolesTable').dataTable(roleOptions);
	if(isObject){
		securityType = "LDAP";
	}else if(!isObject && isLastName){
		securityType = "DATABASE";
	}else{
		securityType = "XML";
	}
	$('.dataTables_empty').html("Fetching role(s)...");
	$('#rolesTable_wrapper .row .col-sm-6:first').append(rolesButtonHeader("create")).append(rolesButtonHeader("update")).append(rolesButtonHeader("delete"));
	customTable('rolesTable');
	getRoleList("updateRoleList","");
}

/**
 * @Function Name   : getRoleList
 * @Description     : this function will call the server to get the list of roles 
 * @param           : str1 string, str2 string
 * @returns         : 
 * */
function getRoleList(str1,str2)
{
	var roleData = {};
	if(str1=="updateRoleList") {
		addLoading($('#rolesTable_wrapper'));
		sendAjaxCall("console/users/roles", "GET", false, true, "json",roleData, handleAjaxError, updateRoleList);
	}
	else if(str1=="populateRoles") {
			sendAjaxCall("console/users/roles", "GET", false, true, "json",roleData, handleAjaxError, function(response) {
				populateRoles(response,str2);
			});
		}
	else {
			sendAjaxCall("console/users/roles", "GET", false, true, "json",roleData, handleAjaxError, function(response) {
				updateRoles(response,str1,str2);
			});
	}
}

/**
 * @Function Name   : updateRoleList
 * @Description     : this function will populate the list of role(s) to datatable
 * @param           : data list of roles
 * @returns         : 
 * */
function updateRoleList(data) {
	if(data.error_message != undefined){
			showErrorNotification(data.error_message);
	}
	rolesTable.fnClearTable();
	if (data.properties!=undefined) {
		$.each(data.properties,function(key,value){
			var items = [];
			var realmIdentifier = key.split("\\");
			items[items.length]="<input type='radio' class='ace roleSelected' id='roleSelected' name='form-field-radio' onclick='updateRadioButton(this);'> <span class='lbl'></span>"
			items[items.length]=realmIdentifier[1];
			items[items.length]=realmIdentifier[0];
			for(var j=0;j<columnNames.length;j++) 
			{
				var flag = false;
				for (var k=0;k<value.length;k++) {
					if(value[k]!=undefined && value[k].name == columnNames[j] && value[k].value!="") {
						flag = true;
						if(columnNames[j] == 'descendantRole')
							items[items.length]=value[k].value.replace(/,/g, ' , ');
						else
							items[items.length]=value[k].value;
					}
				}
				if(flag==false)
					items[items.length]="";
			}
			rolesTable.fnAddData(items, false);
		});
		rolesTable.fnDraw(true);
		rolesTable.fnFilter('');
		rolesTable.fnAdjustColumnSizing();
	}
	else
		$('.dataTables_empty').html("No roles(s) found.");
		
		$('#rolesTable_length').remove();
		$('#rolesTable thead tr th').removeClass("sorting_asc").removeClass("sorting");
		$('#rolesTable_filter a').remove();
		$('#rolesTable_filter').append(rolesButtonHeader("viewAllRoles"));
		removeLoading($('#rolesTable_wrapper'));
}

/**
 * @Function Name   : populateRoles
 * @Description     : this will populate all the existing roles
 * @param           : 
 * @returns         : 
 * */
function populateRoles(data,id) {
	if (data.properties!=undefined) {
		removeChosen(id);
		$.each(data.properties,function(key,obj) 
		{
			$("#"+id).append("<option value='"+key+"'>"+key+"</option>");
		});
		$("#"+id).chosen();
		$("#"+id+"_chzn").css('width', '215');
		$("#"+id+"_chzn").addClass('multipleRoles');
	}
}

/**
 * @Function Name   : updateRoles
 * @Description     : this will populate all the existing roles will be used in update role
 * @param           : 
 * @returns         : 
 * */
function updateRoles(data,id1,id2) {
	
	if (data.properties!=undefined) {
		$.each(data.properties,function(key,obj) 
		{
			if($.inArray(key,id2)==-1)
				$("#"+id1).append("<option value='"+key+"'>"+key+"</option>");
		});
		$("#"+id1).chosen();
		$("#"+id1+"_chzn").css('width', '215');
		$("#"+id1+"_chzn").addClass('multipleRoles');
	}
}

/**
 * @Function Name   : removeErrorMessage
 * @Description     : this will remove the error message text if any
 * @param           : 
 * @returns         : 
 * */
function removeErrorMessage(){
	$('#errorMessage').text("");
}


/**
 * @Function Name   : openCreateRoleModal
 * @Description     : this function will get the realms
 * @param           : 
 * @returns         : 
 * */
function openCreateRoleModal()
{
	var realms = {};
	sendAjaxCall("console/users/realms", "GET", false, true, "json",realms, handleAjaxError, updateRealmList);
	
}

/**
 * @Function Name   : updateRealmList
 * @Description     : this function will populate the realms
 * @param           : data list of realms
 * @returns         : 
 * */
function updateRealmList(data)
{
	removeChosen("fetchedRealms");
	$("#fetchedRealms").append("<option value='select'>"+$('#selecRoleRealms').text()+"</option>");
	$.each(data.realms,function(key,obj) 
	{
		$("#fetchedRealms").append("<option value='"+obj+"'>"+obj+"</option>");
	});
	$('#fetchedRealms').removeAttr('disabled').chosen();
	$('#fetchedRealms_chzn').css('width', '215');
	$('#identifier').attr('readonly',false).val("");
	displayBasedOnAction("create");
	getProperties(true);
}

/**
 * @Function Name   : displayBasedOnAction
 * @Description     : this function will display titles & buttons based on actions
 * @param           : action
 * @returns         : 
 * */
function displayBasedOnAction(action) {
	if(action=="create") {
		$("#buttonCreateRole").css('display','block');
		$("#buttonUpdateRole").css('display','none');
		$("#createRoleModalHeader").css('display','block');
		$("#updateRoleModalHeader").css('display','none');
	}else {
		$("#buttonCreateRole").css('display','none');
		$("#buttonUpdateRole").css('display','block');
		$("#createRoleModalHeader").css('display','none');
		$("#updateRoleModalHeader").css('display','block');
	}
	$("#errorMessage").text("");
	$('#roleModalBody tr:gt(1)').remove();
}

/**
 * @Function Name   : getProperties
 * @Description     : this function will gets the attributes for a role
 * @param           : flag boolean
 * @returns         : 
 * */
function getProperties(flag)
{
	var property = {};
	sendAjaxCall("console/users/roles/attributes", "GET", false, true, "json",property, handleAjaxError, function(response) {
		updatePropertiesList(response,flag);
	});
}

/**
 * @Function Name   : updatePropertiesList
 * @Description     : this function will populate the properties
 * @param           : data list of properties
 * @returns         : 
 * */
function updatePropertiesList(data,flag)
{
	propertiesData = [];
	removeChosen("property");
	$("#property").append("<option value='select'>Select Property</option>");
	$.each(data.attributes,function(key,obj) 
	{
		if(flag) 
		{
			if(parseInt(key)==parseInt(0) && (securityType==defaults.security_XML || securityType==defaults.security_DATABASE))
			{
				$("#roleModalBody").append("<tr><td><label>"+obj.charAt(0).toUpperCase()+obj.slice(1)+"</label></td><td><span class='createRole' id='inputProperties'><input type='text' class='input-sm roleProperties' id="+obj+" name="+obj+" onkeyup=javscript:removeErrorMessage();></span></td></tr>");
			}
			else if(securityType==defaults.security_LDAP && (obj.indexOf('member')>=0 || obj.indexOf('objectclass')>=0))
			{
				propertiesData[propertiesData.length] = obj;
				$("#property").append("<option value='"+obj+"'>"+obj.charAt(0).toUpperCase()+obj.slice(1)+"</option>");
				$("#roleModalBody").append("<tr><td><label>"+obj.charAt(0).toUpperCase()+obj.slice(1)+"</label></td><td><span class='createRole' id='inputProperties'><input type='text' class='input-sm roleProperties' id="+obj+" name="+obj+" onkeyup=javscript:removeErrorMessage();></span></td></tr>");
			}
			else
			{
				propertiesData[propertiesData.length] = obj;
				$("#property").append("<option value='"+obj+"'>"+obj.charAt(0).toUpperCase()+obj.slice(1)+"</option>");
			}
		}
		else
			propertiesData[propertiesData.length] = obj;
	});
	$('#property').chosen();
	$('#property_chzn').css('width', '215');
	modalShow('createRoleModal');
}

/**
 * @Function Name   : configureRole
 * @Description     : this function will call server to create / update a role
 * @param           : action create / update
 * @returns         : 
 * */
function configureRole(action) {
	if(validateData()) 
	{
		if(securityType==defaults.security_LDAP) {
			var indexOfMember = jQuery.inArray(true, jQuery.map(propertiesArray, function(s) {
				return s.indexOf('member') > -1;
			}));
			if(indexOfMember == -1 ) {
				showMemberErrorMessage();
				return false;
			}
		}
		var paramData = {
			realm: $('#fetchedRealms').val(),
			role: $('#identifier').val(),
			properties: propertiesArray
		}
		if(action=='create')
			sendAjaxCall("console/users/role", "POST", false, true, "json",paramData, handleAjaxError, showMessage);
		else if(action=='update')
			sendAjaxCall("console/users/role/edit", "POST", false, true, "json",paramData, handleAjaxError, showMessage);
		
	}
}

/**
 * @Function Name   : openUpdateRoleModal
 * @Description     : this function will get the properties for the selected row to update
 * @param           : 
 * @returns         : 
 * */
function openUpdateRoleModal(){
	var columnsData = getSelectedRows(rolesTable,true);
	if(columnsData.length<=0)
		showSelectInformation();
	else if(columnsData.length>0) 
	{
		var paramData = {
			realm: columnsData[0][2],
			role: columnsData[0][1]
		}
		sendAjaxCall("console/users/roles/properties", "GET", false, true, "json",paramData, handleAjaxError, function(response){
			getProperties(false);
			updateRoleModal(response);
		});
	}
}

/**
 * @Function Name   : updateRoleModal
 * @Description     : this function will populate the existing data to update & opens the modal
 * @param           : data to populate existing data
 * @returns         : 
 * */
function updateRoleModal(data) {
	var columnsData = getSelectedRows(rolesTable,true);
	removeChosen("fetchedRealms");
	$("#fetchedRealms").append("<option value='"+columnsData[0][2]+"' selected='selected'>"+columnsData[0][2]+"</option>");
	$('#fetchedRealms').attr('disabled','disabled').chosen();
	$('#fetchedRealms_chzn').css('width', '215');
	$('#identifier').val(columnsData[0][1]).attr('readonly',true);
	displayBasedOnAction("update");
	setTimeout(function()
	{
		$.each(data.properties,function(key,value) 
		{
			if(data.properties[key].name.indexOf('Role')<=0 && data.properties[key].name.indexOf('objectclass')!=0 ) {
				if(data.properties[key].name.indexOf('member')>=0)
				{
					var regex = new RegExp("=com,", 'gi');
					var members = data.properties[key].value.replace(regex,'=com ');
					var splitMembers = members.split(" ");
					for (var j=0;j<splitMembers.length;j++) {
						$("#roleModalBody").append("<tr><td>"+data.properties[key].name.charAt(0).toUpperCase()+data.properties[key].name.slice(1)+"</td><td><span class='createRole' id='inputProperties'><input type='text' class='input-sm roleProperties' id="+data.properties[key].name+""+j+" name="+data.properties[key].name+""+j+">&nbsp;&nbsp;<button aria-hidden='true' onclick=javascript:removeProperty(this,'"+data.properties[key].name+"'); class='close propertyDeleteSelect' type='button'>×</button></span></td></tr>");
						$("#"+data.properties[key].name+""+j).val(splitMembers[j]);
					}
				}
				else 
				{
					$("#roleModalBody").append("<tr><td>"+data.properties[key].name.charAt(0).toUpperCase()+data.properties[key].name.slice(1)+"</td><td><span class='createRole' id='inputProperties'><input type='text' class='input-sm roleProperties' id="+data.properties[key].name+" name="+data.properties[key].name+"></td></tr>");
					$("#"+data.properties[key].name).val(data.properties[key].value);
				}
			}
			else if(data.properties[key].name.indexOf('Role')>=0) {
				$("#roleModalBody").append("<tr><td>"+data.properties[key].name.charAt(0).toUpperCase()+data.properties[key].name.slice(1)+"</td><td><span class='' id='inputProperties'><select class='roleProperties' id="+data.properties[key].name+" multiple></select><button aria-hidden='true' onclick=javascript:removeProperty(this,'"+data.properties[key].name+"'); class='close propertyDeleteSelect' type='button'>×</button></span></span></td></tr>");
				var properties = data.properties[key].value.split(',');
				for (var k=0;k<properties.length;k++)
					$("#"+data.properties[key].name).append("<option value='"+properties[k]+"' selected='selected'>"+properties[k]+"</option>");
				getRoleList(data.properties[key].name,properties);
			}
			if(data.properties[key].name != 'member') {
				var indexValue = parseInt(jQuery.inArray(data.properties[key].name,propertiesData));
				propertiesData.splice(indexValue,1);
			}
		});
		updatePropertiesListFlag();
	},500);
}

/**
 * @Function Name   : deleteRole
 * @Description     : this function is used to delete a role 
 * @param           : 
 * @returns         : 
 * */
function deleteRole(){
	var columnsData = getSelectedRows(rolesTable,true);
	if(columnsData.length>0) 
	{
		var paramData = {};
		sendAjaxCall("console/users/role/"+columnsData[0][2]+"/"+columnsData[0][1], "DELETE", false, true, "json",paramData, handleAjaxError, showMessage);
	}
}

/**
 * @Function Name   : openDeleteRoleModal
 * @Description     : this function is used to show the confirmation modal for delete role
 * @param           : data message
 * @returns         : 
 * */
function openDeleteRoleModal()
{
	var columnsData = getSelectedRows(rolesTable,true);
	if(columnsData.length<=0)
		showSelectInformation();
	else
		modalShow('deleteRole');
}

/**
 * @Function Name   : showMessage
 * @Description     : this function is used to show the information of any action executed
 * @param           : data message
 * @returns         : 
 * */
function showMessage(data) {
	if(data.success_message!=undefined && data.success_message!=""){
		getRoleList("updateRoleList","");
		modalHide('createRoleModal');
		showNotification(data.success_message);
	}
	else
	showErrorNotification(data.error_message);
}

/** 
 * @Function Name   : handleAjaxError 
 * @Description     : This function handles the all the ajax error(s)
 * @param           : execption
 * @returns         : 
 * */
function handleAjaxError(exception)
{
	showInformation(exception.responseText);
	removeLoading('', true);
	return false;
}

defaults = {
	security_XML :"XML",
	security_LDAP :"LDAP",
	security_DATABASE :"DATABASE"
}

/**
 * @Function Name   : removeProperty
 * @Description     : this will remove the particular property
 * @param           : obj of the property to remove
 * @returns         : 
 * */
function removeProperty(obj,property){
	$(obj).closest('tr').remove();
	if(parseInt(jQuery.inArray(property,propertiesData))==-1)
	{
		propertiesData[propertiesData.length] = property;
	}
	updatePropertiesListFlag();
}
