/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


 
/** usersTable will store the refrence of user table*/
var usersTable;

/** columnNames will store column names of a user table used for security / LDAP*/
var columnNames = [];

/** securityType will store the type of security default is XML if server is connected to LDAP then it will update to LDAP*/
var securityType ;

/** propertiesData will contain list of properties for users*/
var propertiesData = new Array();

/** userOptions stores the data table options for user table*/
var userOptions = {
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
 * @Description     : This function is the starting function for user page we have initialize if anything is required here
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
			if($("#userModalBody span input#"+$("#property").val()).length>0 || $("#userModalBody span select#"+$("#property").val()).length>0)
				$("#errorMessage").text("Property "+$("#property").val().charAt(0).toUpperCase()+$("#property").val().slice(1)+" already added");
			
			else if($("#property").val().indexOf('Role')<0)
			{
				$("#userModalBody").append("<tr><td>"+$("#property").val().charAt(0).toUpperCase()+$("#property").val().slice(1)+"</td><td><span id='inputProperties'><input type='text' class='input-sm userProperties' id="+$("#property").val()+" name="+$("#property").val()+" onkeyup=javscript:removeErrorMessage();>&nbsp;&nbsp;<button aria-hidden='true' onclick=javascript:removeProperty(this,'"+$("#property").val()+"'); class='close propertyDelete' type='button'>×</button></span></td></tr>");
			}
			else if($("#property").val().indexOf('Role')>0) {
				$("#userModalBody").append("<tr><td>"+$("#property").val().charAt(0).toUpperCase()+$("#property").val().slice(1)+"</td><td><span class='' id='inputProperties'><select class='userProperties' id="+$("#property").val()+" data-placeholder='Choose a role..' multiple></select><button aria-hidden='true' onclick=javascript:removeProperty(this,'"+$("#property").val()+"'); class='close propertyDeleteSelect' type='button'>×</button></span></td></tr>");
				getRoleList($("#property").val(),"","onchange");
			}
			
			var propertyValue = $("#property").val();
			var indexValue = parseInt(jQuery.inArray(propertyValue,propertiesData));
			propertiesData.splice(indexValue,1);
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
 * @Function Name   : removeErrorMessage
 * @Description     : this will remove the error message text if any
 * @param           : 
 * @returns         : 
 * */
function removeErrorMessage(){
	$('#errorMessage').text("");
}


/**
 * @Function Name   : getAttributes
 * @Description     : this will get the attributes for user
 * @param           : 
 * @returns         : 
 * */
function getAttributes()
{
	var data = {};
		sendAjaxCall("console/users/attributes", "GET", false, true, "json",data, handleAjaxError, updateHeaderColumnData);
}

/**
 * @Function Name   : updateHeaderColumnData
 * @Description     : this function will update the user options columns based on LDAP / Security xml
 * @param           : data list of columns
 * @returns         : 
 * */
function updateHeaderColumnData(data)
{
	$("#usersHeader th:gt(2)").remove();
	var isObject = false;
	var isLastName = false;
	$.each(data.attributes, function(key, value) {
		if(value.indexOf("object")>=0){
			isObject = true;
		}
		if(value.indexOf("lastname")>=0){
			isLastName = true;
		}
		if (data.attributes[key].indexOf('assword') < 0) {
			columnNames[columnNames.length] = value;
			$("#usersHeader").append("<th>"+value.charAt(0).toUpperCase()+value.slice(1)+"</th>");
			userOptions.aoColumns[userOptions.aoColumns.length] = {"bSortable": true};
		}
	});
	if(isObject){
		securityType = "LDAP";
	}else if(!isObject && isLastName){
		securityType = "DATABASE";
	}else{
		securityType = "XML";
	}
	usersTable = $('#usersTable').dataTable(userOptions);
	$('.dataTables_empty').html("Fetching user(s)...");
	$('#usersTable_wrapper .row .col-sm-6:first').append(usersButtonHeader("create"));
	$('#usersTable_wrapper .row .col-sm-6:first').append(usersButtonHeader("update"));
	$('#usersTable_wrapper .row .col-sm-6:first').append(usersButtonHeader("delete"));
	customTable('usersTable');
	getUserList();
}

/**
 * @Function Name   : getUserList
 * @Description     : this function will call the server to get the list of users 
 * @param           : 
 * @returns         : 
 * */
function getUserList()
{
	var userData = {};
	addLoading($('#usersTable_wrapper'));
	sendAjaxCall("console/users", "GET", false, true, "json",userData, handleAjaxError, updateUserList);
}

/**
 * @Function Name   : updateUserList
 * @Description     : this function will populate the users
 * @param           : data list of users
 * @returns         : 
 * */
function updateUserList(data) {
	if(data.error_message != undefined){
			showErrorNotification(data.error_message);
	}
	usersTable.fnClearTable();
	if (data.properties!=undefined) {
		$.each(data.properties,function(key,value){
			var items = [];
			var realmIdentifier = key.split("\\");
			items[items.length]="<input type='radio' class='ace userSelected' id='userSelected' name='form-field-radio' onclick='updateRadioButton(this);'> <span class='lbl'></span>"
			items[items.length]=realmIdentifier[1];
			items[items.length]=realmIdentifier[0];
			for(var j=0;j<columnNames.length;j++) 
			{
				var flag = false;
				for (var k=0;k<value.length;k++) {
					if(value[k]!=undefined && value[k].name == columnNames[j] && value[k].value!="") {
						flag = true;
						if(columnNames[j]=='assignRole')
							items[items.length]=value[k].value.replace(/,/g, ' , ');
						else
							items[items.length]=value[k].value;
					}
				}
				if(flag==false)
					items[items.length]="";
			}
			usersTable.fnAddData(items, false);
		});
		usersTable.fnDraw(true);
		usersTable.fnFilter('');
		usersTable.fnAdjustColumnSizing();
	}
	else
		$('.dataTables_empty').html("No user(s) found.");
		
		$('#usersTable_length').remove();
		$('#usersTable thead tr th').removeClass("sorting_asc").removeClass("sorting");
		$('#usersTable_filter a').remove();
		$('#usersTable_filter').append(usersButtonHeader("viewAllUsers"));
		removeLoading($('#usersTable_wrapper'));
}

/**
 * @Function Name   : removeProperty
 * @Description     : this will remove the particular property
 * @param           : obj of the property to remove
 * @returns         : 
 * */
function removeProperty(obj,property)
{
	$(obj).closest('tr').remove();
	if(parseInt(jQuery.inArray(property,propertiesData))==-1)
	{
		propertiesData[propertiesData.length] = property;
	}
	updatePropertiesListFlag();
}

/**
 * @Function Name   : openCreateUserModal
 * @Description     : this function will get the realms
 * @param           : 
 * @returns         : 
 * */
function openCreateUserModal()
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
	$("#fetchedRealms").append("<option value='select'>"+$('#selecUserRealms').text()+"</option>");
	$.each(data.realms,function(key,obj) 
	{
		$("#fetchedRealms").append("<option value='"+obj+"'>"+obj+"</option>");
	});
	$('#fetchedRealms').removeAttr('disabled');
	$('#fetchedRealms').chosen();
	$('#fetchedRealms_chzn').css('width', '215');
	
	$('#identifier').attr('readonly',false);
	$('#identifier').val("");
	displayBasedOnAction('create');
	getProperties(true);
}


/**
 * @Function Name   : getProperties
 * @Description     : this function will gets the attributes for a user
 * @param           : 
 * @returns         : 
 * */
function getProperties(flag)
{
	var property = {};
	sendAjaxCall("console/users/attributes", "GET", false, true, "json",property, handleAjaxError, function(response) {
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
			if(obj.indexOf('password')>=0 || obj.indexOf('Password')>=0) 
			{
				$("#userModalBody").append("<tr><td>"+obj.charAt(0).toUpperCase()+obj.slice(1)+"</td><td><span class='createUser' id='inputProperties'><input type='password' class='input-sm userProperties' id="+obj+" name="+obj+" onkeyup=javscript:removeErrorMessage();></span></td></tr>");
			}
			else if(obj.indexOf('assignRole')>=0 && securityType==defaults.security_XML) {
				$("#userModalBody").append("<tr><td>"+obj.charAt(0).toUpperCase()+obj.slice(1)+"</td><td><span class='' id='inputProperties'><select class='userProperties' id="+obj+" data-placeholder='Choose Role...' multiple></select></span></td></tr>");
				getRoleList(obj,"","properties");
			}
			else if(securityType==defaults.security_LDAP && (obj.indexOf('ou')>=0 || obj.indexOf('lastname')>=0 || obj.indexOf('firstname')>=0)) 
			{
				$("#userModalBody").append("<tr><td>"+obj.charAt(0).toUpperCase()+obj.slice(1)+"</td><td><span class='createUser' id='inputProperties'><input type='text' class='input-sm userProperties' id="+obj+" name="+obj+" onkeyup=javscript:removeErrorMessage();></span></td></tr>");
			}
			else if(securityType == defaults.security_DATABASE && obj.indexOf('assignRole')>=0)
			{
				$("#userModalBody").append("<tr><td>"+obj.charAt(0).toUpperCase()+obj.slice(1)+"</td><td><span class='' id='inputProperties'><select class='userProperties' id="+obj+" data-placeholder='Choose Role...' multiple></select></span></td></tr>");
				getRoleList(obj,"","properties");
			}
			else if(securityType == defaults.security_DATABASE && (obj.indexOf('lastname')>=0 || obj.indexOf('firstname')>=0))
			{
				$("#userModalBody").append("<tr><td>"+obj.charAt(0).toUpperCase()+obj.slice(1)+"</td><td><span id='inputProperties'><input type='text' class='input-sm userProperties' id="+obj+" name="+obj+" onkeyup=javscript:removeErrorMessage();>&nbsp;&nbsp;</span></td></tr>");
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
	modalShow('createUserModal');
}

/**
 * @Function Name   : getRoleList
 * @Description     : this will get all the existing roles 
 * @param           : 
 * @returns         : 
 * */
function getRoleList(id,values,action) {
	var roleData = {};
	if(action!="update") 
	{
		sendAjaxCall("console/users/roles", "GET", false, true, "json",roleData, handleAjaxError, function(response) {
			populateRoles(response,id);
		});
	}else if(action=="update")
		sendAjaxCall("console/users/roles", "GET", false, true, "json",roleData, handleAjaxError, function(response) {
			updateRoles(response,id,values);
		});
}

/**
 * @Function Name   : populateRoles
 * @Description     : this will populate roles
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
 * @Description     : this will populate all the existing roles, will be used in udate user mode for assign role
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
 * @Function Name   : displayBasedOnAction
 * @Description     : this function will display titles & buttons based on actions
 * @param           : action
 * @returns         : 
 * */
function displayBasedOnAction(action) {
	if(action=="create") {
		$("#buttonCreateUser").css('display','block');
		$("#buttonUpdateUser").css('display','none');
		$("#createUserModalHeader").css('display','block');
		$("#updateUserModalHeader").css('display','none');
	}else {
		$("#buttonCreateUser").css('display','none');
		$("#buttonUpdateUser").css('display','block');
		$("#createUserModalHeader").css('display','none');
		$("#updateUserModalHeader").css('display','block');
	}
	$("#errorMessage").text("");
	$('#userModalBody tr:gt(1)').remove();
}

/**
 * @Function Name   : configureUser
 * @Description     : this function will call server to create / update a user
 * @param           : action create / update
 * @returns         : 
 * */
function configureUser(action) {
	if(validateData()) 
	{
		if(securityType==defaults.security_LDAP) {
			propertiesArray[propertiesArray.length] = "objectclass:organizationalPerson" ;
			propertiesArray[propertiesArray.length] = "objectclass:person";
			propertiesArray[propertiesArray.length] = "objectclass:inetOrgPerson";
		}
		var paramData = {
			realm: $('#fetchedRealms').val(),
			user: $('#identifier').val(),
			properties: propertiesArray
		}
		if(action=='create')
			sendAjaxCall("console/users", "POST", false, true, "json",paramData, handleAjaxError, showMessage);
		else if(action=='update')
			sendAjaxCall("console/users/edit", "POST", false, true, "json",paramData, handleAjaxError, showMessage);
		
	}
}


/**
 * @Function Name   : openUpdateUserModal
 * @Description     : this function will get the properties for the selected row to update
 * @param           : 
 * @returns         : 
 * */
function openUpdateUserModal(){
	var columnsData = getSelectedRows(usersTable,true);
	if(columnsData.length<=0)
		showSelectInformation();
	else if(columnsData.length>0) 
	{
		var paramData = {
			realm: columnsData[0][2],
			user: columnsData[0][1]
		}
		sendAjaxCall("console/users/properties", "GET", false, true, "json",paramData, handleAjaxError, function(response){
			getProperties(false);
			updateUserModal(response);
		});
	}
}

/**
 * @Function Name   : updateUserModal
 * @Description     : this function will populate the existing data to update & opens the modal
 * @param           : data to populate existing data
 * @returns         : 
 * */
function updateUserModal(data) 
{
	var columnsData = getSelectedRows(usersTable,true);
	removeChosen("fetchedRealms");
	$("#fetchedRealms").append("<option value='"+columnsData[0][2]+"' selected='selected'>"+columnsData[0][2]+"</option>");
	$('#fetchedRealms').attr('disabled','disabled');
	$('#fetchedRealms').chosen();
	$('#fetchedRealms_chzn').css('width', '215');
	$('#identifier').val(columnsData[0][1]);
	$('#identifier').attr('readonly',true);
	displayBasedOnAction('update');
	setTimeout(function()
	{
		$.each(data.properties,function(key,value) 
		{
			if(data.properties[key].name.indexOf('Role')<0 && data.properties[key].name.indexOf('objectclass')!=0)
			{
				$("#userModalBody").append("<tr><td>"+data.properties[key].name.charAt(0).toUpperCase()+data.properties[key].name.slice(1)+"</td><td><span class='createUser' id='inputProperties'><input type='text' class='input-sm userProperties' id="+data.properties[key].name+"updateUser"+" name="+data.properties[key].name+"></span></td></tr>");
				$("#"+data.properties[key].name+"updateUser").val(data.properties[key].value);
			}
			else if(data.properties[key].name.indexOf('Role')>0) 
			{
				$("#userModalBody").append("<tr><td>"+data.properties[key].name.charAt(0).toUpperCase()+data.properties[key].name.slice(1)+"</td><td><span class='' id='inputProperties'><select class='userProperties' id="+data.properties[key].name+" multiple></select></span></td></tr>");
				var properties = data.properties[key].value.split(',');
				for (var k=0;k<properties.length;k++)
					$("#"+data.properties[key].name).append("<option value='"+properties[k]+"' selected='selected'>"+properties[k]+"</option>");
				setTimeout(function()
				{
					getRoleList(data.properties[key].name,properties,"update");
				},250);
			}
			var indexValue = parseInt(jQuery.inArray(data.properties[key].name,propertiesData));
			propertiesData.splice(indexValue,1);
		});
		var indexValue = parseInt(jQuery.inArray("password",propertiesData));
		propertiesData.splice(indexValue,1);
		updatePropertiesListFlag();
	},500);
}

/**
 * @Function Name   : deleteUser
 * @Description     : this function is used to delete a user 
 * @param           : 
 * @returns         : 
 * */
function deleteUser(){
	var columnsData = getSelectedRows(usersTable,true);
	if(columnsData.length>0) 
	{
		var paramData = {};
		sendAjaxCall("console/users/"+columnsData[0][2]+"/"+columnsData[0][1], "DELETE", false, true, "json",paramData, handleAjaxError, showMessage);
	}
}

/**
 * @Function Name   : openDeleteRoleModal
 * @Description     : this function is used to show the confirmation modal for delete role
 * @param           : data message
 * @returns         : 
 * */
function openDeleteUserModal()
{
	var columnsData = getSelectedRows(usersTable,true);
	if(columnsData.length<=0)
		showSelectInformation();
	else
		modalShow('deleteUser');
}
/**
 * @Function Name   : showMessage
 * @Description     : this function is used to show the information of any action executed
 * @param           : data message
 * @returns         : 
 * */
function showMessage(data) {
	if(data.success_message!=undefined && data.success_message!=""){
		getUserList();
		modalHide('createUserModal');
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
