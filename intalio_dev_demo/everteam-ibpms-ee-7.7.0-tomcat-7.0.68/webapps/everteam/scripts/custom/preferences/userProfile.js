/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

var skillsOptions = [];
var countryOptions = [];
var genderOptions = [];
var salutationOptions = []; 

$(document).ready(function(){
	getMasters();
	getUserPreferences();
	getAssignedRoles();
	getSkills();
	$("#avatar").attr("src","ui-fw/user/avatar?"+new Date());
	try {//ie8 throws some harmless exceptions, so let's catch'em
		 //first let's add a fake appendChild method for Image element for browsers that have a problem with this
		 //because editable plugin calls appendChild, and it causes errors on IE at unpredicted points
		try {
				document.createElement('IMG').appendChild(document.createElement('B'));
			} 
			catch(e) {
					Image.prototype.appendChild = function(el){}
			}
	if (!($.browser.msie && $.browser.version === '8.0')) {
	$('#avatar').editable({
		mode: 'inline',
		type: 'image',
		name: 'avatar',
		value: null,
		image: {
			btn_choose: 'Upload Avatar',
			droppable: true,
			maxSize: 500000,//~500Kb
			name: 'avatar',
			on_error : function(error_type) {
				if(error_type == 1)
					showErrorNotification($("#imageTypeMsg").text());
				else if(error_type == 2) 
					showErrorNotification($("#imageSizeMsg").text());
			},
			on_success : function() {
			}
		},
		url: function(params) {
			var submit_url = 'ui-fw/user/avatar';
			var deferred;
			var value = $('#avatar').next().find('input[type=hidden]:eq(0)').val();
			if(!value || value.length == 0) {
				deferred = new $.Deferred
				deferred.resolve();
				return deferred.promise();
			}
			var $form = $('#avatar').next().find('.editableform:eq(0)')
			var file_input = $form.find('input[type=file]:eq(0)');
			var pk = $('#avatar').attr('data-pk');
			var ie_timeout = null
			if( "FormData" in window ) {
				var formData_object = new FormData();//create empty FormData object
				//serialize our form (which excludes file inputs)
				$.each($form.serializeArray(), function(i, item) {
				//add them one by one to our FormData 
				formData_object.append(item.name, item.value);							
				});
				//and then add files
				$form.find('input[type=file]').each(function(){
				var field_name = $(this).attr('name');
				var files = $(this).data('ace_input_files');
				if(files && files.length > 0) {
				formData_object.append(field_name, files[0]);
				}
				});

				//append primary key to our formData
				formData_object.append('pk', pk);

				deferred = $.ajax({
				url: submit_url,
				type: 'POST',
				processData: false,//important
				contentType: false,//important
				dataType: 'json',//server response type
				data: formData_object
				})
			}
			else {
				deferred = new $.Deferred
				var iframe_id = 'temporary-iframe-'+(new Date()).getTime()+'-'+(parseInt(Math.random()*1000));
				var temp_iframe = $('<iframe id="'+iframe_id+'" name="'+iframe_id+'" frameborder="0" width="0" height="0" src="about:blank" style="position:absolute; z-index:-1; visibility: hidden;"></iframe>').insertAfter($form);
				$form.append('<input type="hidden" name="'+iframe_id+'" value="'+iframe_id+'" />');
				$('<input type="hidden" name="pk" />').val(pk).appendTo($form);
				temp_iframe.data('deferrer' , deferred);//save the deferred object to the iframe
				$form.attr({
							action:  submit_url,
							method:  'POST',
							enctype: 'multipart/form-data',
							target:  iframe_id //important
						});
				$form.get(0).submit();
				ie_timeout = setTimeout(function(){
					ie_timeout = null;
					temp_iframe.attr('src', 'about:blank').remove();
					deferred.reject({'status':'fail', 'message':'Timeout!'});
				} , 60000);
			} 
			deferred.done(function(res){
				if(res.msg == 'success'){
					$('#avatar').attr("src","ui-fw/user/avatar?"+new Date());
					$(".bpms_user_photo").attr("src","ui-fw/user/avatar?"+new Date());
					showNotification($("#saveMsg").text());
				}
			}).fail(function(res){
				})
			  .always(function() {//called on both success and failure
					if(ie_timeout) clearTimeout(ie_timeout)
					ie_timeout = null;	
				});	
			return deferred.promise();
		},             
		success: function(response, newValue) {
			$('#avatar').attr("src","ui-fw/user/avatar?"+new Date());
			$(".bpms_user_photo").attr("src","ui-fw/user/avatar?"+new Date());
		},
		error:function(e){
			showErrorNotification($('#uploadFailureMsg').text())
		}
		});
	}
	}catch(e) {}

	var dateFormatValues = [{id:"yyyy/MM/dd",value:"yyyy/MM/dd"},{id:"yyyy-MM-dd",value:"yyyy-MM-dd"},{id:"yyyy.MM.dd",value:"yyyy.MM.dd"},{id:"dd-MM-yyyy",value:"dd-MM-yyyy"},{id:"dd.MM.yyyy",value:"dd.MM.yyyy"},{id:"dd/MM/yyyy",value:"dd/MM/yyyy"}];
	dateFormat = applySelectize($("#date-format-select"),[],[],1,false,dateFormatValues);
	
	var fontSelValues=[{id:"open sans",value:"Open Sans"},{id:"lucida grande",value:"Lucida Grande"},{id:"helvetica",value:"Helvetica"},{id:"comic sans ms",value:"Comic Sans MS"},{id:"verdana",value:"Verdana"}];
	fontSel = applySelectize($("#font-style"),[],[],1,false,fontSelValues);

	$("#gender").click(function() {
		handleSelects('gender',genderOptions,1,false);
	});
	$("#salutation").click(function() {
		handleSelects('salutation',salutationOptions,1,false);
	});
	$("#skills").click(function() {
		handleSelects('skills',skillsOptions,25,true);
	});
	$("#country").click(function() {
		handleSelects('country',countryOptions,1,false);
	});
});

function getSkills(){
	sendAjaxCall(intalio_bpms.user_preferences.skills, "GET", false, true, "json",{}, handleProfileAjaxError, function(data){
		skillsOptions = [];
		for(var k=0;k<data.skills.length;k++){
			skillsOptions.push({id:data.skills[k],value:data.skills[k]});
		}
	});
}

function getMasters(){
	sendAjaxCall(intalio_bpms.user_preferences.masters, "GET", false, true, "json",{}, handleProfileAjaxError, function(data){
		genderOptions = data.genders;
		salutationOptions = data.salutations;
		countryOptions = data.countries;
		getProfileInfo();
	});
}

function handleSelects(id,options,multi,create){
	$("#"+id).addClass('hide');
	$("#"+id+"Select").removeClass("hide").next().removeClass("hide");
	selectObj = applySelectize($("#"+id+"Select"),[],[],multi,create,options);
	if($.trim($("#"+id).text())!=""){
		selectObj.setValue($("#"+id+"Id").text().split(', '));
	}
	$("#"+id+"Select").next().find('div#editablebuttons').remove();
	$("#"+id+"Select").next().append($("#editablebuttons").clone()).find('#editablebuttons').removeClass('hide');
	$("#"+id+"Select").next().find('.editable-submit').attr("onclick","updateSelectValue('"+id+"')");
	$("#"+id+"Select").next().find('.editable-cancel').attr("onclick","cancelSelectValue('"+id+"')");
}

function initEditable(){
	sendAjaxCall(intalio_bpms.user_preferences.config, "GET", false, true, "json",{}, handleProfileAjaxError, function(data){
		$.each(data, function(key, value) {
			if(key=="salutation" || key=="gender" || key=="skills" || key=="country")
				value=="false" ? $("#"+key).removeClass("editable-click editable-empty") : $("#"+key).addClass("editable-click");
			else if(key=="dob")
				value=="false" ? $("#"+key).removeClass("editable-click editable-date") : $("#"+key).addClass("editable-click editable-date");
			else if(key=="phone" || key=="mobile")
				value=="false" ? $("#"+key).removeClass("editable-click editable") : $("#"+key).addClass("editable-no editable-click");
			else 
				value=="false" ? $("#"+key).removeClass("editable editable-click") : $("#"+key).addClass("editable editable-click");
		});

		$('.editable').editable({
			mode: 'inline',
			type: 'text',
			tpl: '<input type="text" maxlength="50"/>',
			emptytext:'Click to enter',
			success:function(response, newValue){
				updateValue($(this).attr("id"),newValue,$(this));
			},
			validate: function(value) {
				if(($(this).attr("id")=="secondaryEmail" || $(this).attr("id")=="email") && $.trim(value)!=''){
					if(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)==false)
						return $("#emailError").text();
				}
			}
		});

		$('.editable-no').editable({
			mode: 'inline',
			type: 'text',
			tpl: '<input type="text" maxlength="16"/>',
			emptytext:'Click to enter',
			success:function(response, newValue){
				updateValue($(this).attr("id"),newValue,$(this));
			},
			validate: function(value) {
				if(($(this).attr("id")=="phone" || $(this).attr("id")=="mobile") && $.trim(value)!=''){
					if(new RegExp(/^\d+$/).test(value)==false)
						return $("#numberError").text();
				}
			}
		});

		initiateDate(userPreferences.dateFormat);
	});
	removeLoading('', true);
}

function initiateDate(format){
	$('.editable-date').editable({
			mode: 'inline',
			type: 'adate',
			emptytext:'Click to select',
			date:{
				format:format.toLowerCase(),
				endDate: '0d',
				autoclose: true
			},
			success:function(response, newValue){
				if(newValue!=""){
					var dateObj = moment(newValue, userPreferences.dateFormat.toUpperCase()).format('DD/MM/YYYY');
					updateValue($(this).attr("id"),dateObj);
				}else{
					updateValue($(this).attr("id"),newValue);
				}
			}
	});
}

function beforeUpdate(id,obj){
	updateValue('gender',$("#genderSelect").val());
}


function updateValue(id,value){
	var data = {};
	data[id] = value;
	sendAjaxCall(intalio_bpms.user_preferences.profile, "POST", false, true, "json",data, handleProfileAjaxError, function(data){
		if(data.msg!=undefined && data.msg=="success"){
			if(id=="dob" && value!=""){
				dateFormat = "dd/mm/yyyy";
				$("#"+id).text(moment(value,dateFormat.toUpperCase()).format(userPreferences.dateFormat.toUpperCase()));
			}
			else	
				$("#"+id).text(value);
			showNotification($("#saveMsg").text());
			$("#"+id).removeClass("editable-unsaved");
			if($("#"+id).text()=="")
				$("#"+id).text("Click to enter");
		}
	});
}

function updateSelectValue(key){
	var value = $("#"+key+"Select").val();
	actualName = key!="skills" ? $("#"+key+"Select").next().find('div.selected').text() : value;
	if(value==null)
		value=[''];
	else if(value=="")
		value="0";
	$("#"+key+"Id").text(value);
	var data = {};
	data[key] = value;
	sendAjaxCall(intalio_bpms.user_preferences.profile, "POST", false, true, "json",data, handleProfileAjaxError, function(data){
		if(data.msg!=undefined && data.msg=="success"){
			if(actualName!=null && actualName!="")
				$("#"+key).text('').text(actualName.toString().replace(/,/g,", ")).removeClass('hide editable-empty');
			else
				$("#"+key).text("Click to select").addClass("editable-empty").removeClass('hide');
			$("#"+key).next().addClass("hide").next().addClass('hide');
			showNotification($("#saveMsg").text());
		}
	});
}

function cancelSelectValue(id,value){
	$("#"+id).removeClass("hide");
	$("#"+id).next().addClass("hide").next().addClass('hide');
}

function applyPreferences(){
	var data={};
	data.fixedHeader=$("#ace-settings-header").prop('checked');
	data.topMenu=$("#ace-settings-sidebar").prop('checked');
	if($("#font-style").val()!="")
		data.fontStyle=$("#font-style").val();
	if($("#date-format-select").val()!="")
		data.dateFormat=$("#date-format-select").val()
	if($("#skin-color").val()!="")
		data.theme = $("#skin-color").find("option:selected").attr("data-skin");
	sendAjaxCall(intalio_bpms.user_preferences.preferences, "POST", false, true, "json",data, handleProfileAjaxError, function(data){
		if(data.msg!=undefined && data.msg=="success"){
			showNotification($("#saveMsg").text());
			userPref.applyFixHeader($("#ace-settings-header").prop('checked'));
			userPref.applyTopMenu($("#ace-settings-sidebar").prop('checked'));
			userPref.applyFont($("#font-style").val());
			userPref.applyDateFormat($("#date-format-select").val());
			userPref.applyTheme($("#skin-color").find("option:selected").attr("data-skin"));
			if($("#date-format-select").val()!="")
				userPreferences.dateFormat = $("#date-format-select").val();
			selectMenuAndChangepage(this,'profile','userPreferences.htm')
		}
	});
}

function getProfileInfo(){
	sendAjaxCall(intalio_bpms.user_preferences.profile, "GET", false, true, "json",{}, handleProfileAjaxError, function(responseData){
		populateProfileInfo(responseData);
	});
}

function populateProfileInfo(data){
	if(data!=undefined && data.userProfile!=undefined){
		$("#userDisplayName").text(responseData.currentUserName);
		$("#imageUserId").text(responseData.currentUserName);
		if(data.userProfile.salutation!=undefined && data.userProfile.salutation!="0"){
			var salObj = $.grep(salutationOptions, function(e){return e.id == data.userProfile.salutation});	
			salObj.length==1 ? $("#salutation").text(salObj[0].value).removeClass('editable-empty'):$("#salutation").text('Click to select');
			$("#salutationId").text(data.userProfile.salutation);
		}
		else
			$("#salutation").text('Click to select');
		if(data.userProfile.country!=undefined && data.userProfile.country!="0"){
			var countryObj = $.grep(countryOptions, function(e){return e.id == data.userProfile.country});	
			countryObj.length==1 ? $("#country").text(countryObj[0].value).removeClass('editable-empty'):$("#country").text('Click to select');
			$("#countryId").text(data.userProfile.country);
		}
		else
			$("#country").text('Click to select');
		if(data.userProfile.gender!=undefined && data.userProfile.gender!="0"){
			var genderObj = $.grep(genderOptions, function(e){return e.id == data.userProfile.gender});	
			genderObj.length==1 ? $("#gender").text(genderObj[0].value).removeClass('editable-empty'):$("#gender").text('Click to select');
			$("#genderId").text(data.userProfile.gender);	
		}
		else
			$("#gender").text('Click to select');
		
		data.userProfile.lastLogin!=undefined ? $("#lastLogin").text(moment(data.userProfile.lastLogin,"yyyy-mm-dd HH:mm:ss.SSSSSS").format(userPreferences.dateFormat.toUpperCase()+userPreferences.hourFormat)) : $("#lastLogin").text();
		data.userProfile.userId!=undefined ? $("#userId").text(data.userProfile.userId) : $("#userId").text();
		data.userProfile.dob!=undefined ? $("#dob").text(moment(data.userProfile.dob,"yyyy-mm-dd".toUpperCase()).format(userPreferences.dateFormat.toUpperCase())) : $("#dob").text();
		data.userProfile.department!=undefined ? $("#department").text(data.userProfile.department) : $("#department").text();
		data.userProfile.email!=undefined ? $("#email").text(data.userProfile.email) : $("#email").text();
		data.userProfile.secondaryEmail!=undefined ? $("#secondaryEmail").text(data.userProfile.secondaryEmail) : $("#secondaryEmail").text();
		data.userProfile.mobile!=undefined ? $("#mobile").text(data.userProfile.mobile) : $("#mobile").text();
		data.userProfile.phone!=undefined ? $("#phone").text(data.userProfile.phone) : $("#phone").text();
		data.userProfile.address!=undefined ? $("#address").text(data.userProfile.address) : $("#address").text();
		data.userProfile.city!=undefined ? $("#city").text(data.userProfile.city) : $("#city").text();
		data.userProfile.state!=undefined ? $("#state").text(data.userProfile.state) : $("#state").text();
		data.userProfile.zip!=undefined ? $("#zip").text(data.userProfile.zip) : $("#zip").text();
		data.userProfile.skills!=undefined && data.userProfile.skills!="" ? $("#skills").text(data.userProfile.skills.replace(/,/g,", ")).removeClass("editable-empty") : $("#skills").text('Click to add');
		data.userProfile.street!=undefined ? $("#street").text(data.userProfile.street) : $("#street").text();
	}
	initEditable();
	if(data.userProfile.managerName)
	  $("#manager").html('<a class="noDecoration" user="'+data.userProfile.manager+'" onclick=javascript:showUserProfile(this)>'+data.userProfile.managerName+'</a>');
	else if(data.userProfile.manager)
	  $("#manager").html('<a class="noDecoration" user="'+data.userProfile.manager+'" onclick=javascript:showUserProfile(this)>'+data.userProfile.manager+'</a>');
	else
		$("#manager").text();
}

function getUserPreferences(){
	getOtProfileUsersList();
	sendAjaxCall(intalio_bpms.user_preferences.preferences, "GET", false, true, "json", {}, handleAjaxError, function(response){
		populateUserPrefrences(response);
	});
};

function populateUserPrefrences(data){
	if(data!=undefined && data.userPreferences!=undefined){
		data.userPreferences.fixedHeader==1 ? $("#ace-settings-header").prop('checked',true) : $("#ace-settings-header").prop('checked',false);
		data.userPreferences.topMenu==1 ? $("#ace-settings-sidebar").prop('checked',true) : $("#ace-settings-sidebar").prop('checked',false);
		data.userPreferences.fontStyle!="" ? fontSel.setValue(data.userPreferences.fontStyle) : fontSel.setValue($.trim(userPreferences.font));
		data.userPreferences.dateFormat!="" ? dateFormat.setValue(data.userPreferences.dateFormat) : dateFormat.setValue($.trim(userPreferences.dateFormat));
		data.userPreferences.theme!="" ? $("#skin-color option[data-skin="+data.userPreferences.theme +"]").attr("selected","selected") : $("#skin-color option[data-skin="+$.trim(userPreferences.theme)+"]").attr("selected","selected");
	}
	else{
		$("#ace-settings-header").prop('checked',false);
		$("#ace-settings-sidebar").prop('checked',false);
		fontSel.setValue($.trim(userPreferences.font));
		dateFormat.setValue($.trim(userPreferences.dateFormat));
		$("#skin-color option[data-skin="+$.trim(userPreferences.theme)+"]").attr("selected","selected")
	}
	$("#skin-color").ace_colorpicker();
	$("#otherUsers").next().css('margin-top','4px');
}

function getAssignedRoles(){
	sendAjaxCall(intalio_bpms.task_filter.getAssignedToRoles, "GET", false, true, "json", {}, handleAjaxError, function(response){
		if(response.roles!=undefined && response.roles.internal_roles.length>0)
			$("#assignedRoles").text(response.roles.internal_roles+""+",");
		if(response.roles!=undefined && response.roles.external_roles.length>0){
			var roles = "";
			for(var k=0; k<response.roles.external_roles.length; k++) {
				k===response.roles.external_roles.length-1 ? roles+=" "+response.roles.external_roles[k] : roles+=" "+response.roles.external_roles[k]+", ";
			};
			$("#assignedRoles").text($("#assignedRoles").text() + roles+"");
		}
	});
}

function handleProfileAjaxError(data){
	removeLoading();
	if(data.error_msg!=undefined)
		showErrorNotification(data.error_msg);
}

function updateIcon(obj){
    if($(obj).hasClass('collapsed'))
        $(obj).find('i.fa').removeClass('fa fa-angle-right').addClass('fa fa-angle-down');
    else
        $(obj).find('i.fa').removeClass('fa fa-angle-down').addClass('fa fa-angle-right');
}

function updateUserProfile(userId){
	if(userId){
		addLoading($(".page-content"));
		 $.each(userProfileFields,function(key,value){
	        $("#"+key).removeClass('editable').removeClass('editable-click').removeClass('editable-empty').text('');
	    });
	    $("#avatar").attr('src','ui-fw/user/avatar?user='+userId+'&date='+new Date());
	    var data = {
	        user:userId
	    }
	    sendAjaxCall(intalio_bpms.user_preferences.profile, "GET", false, true, "json",data, handleProfileAjaxError, function(responseData){
	        populateProfileData(responseData);
	    });
	}
}

function populateProfileData(data){
	var dataObj = data.userProfile;
	$.each(userProfileFields,function(key,value){
        if(key=="gender" && dataObj.genderObj)
            $("span#"+key).text(dataObj.genderObj.value); 
        else if(key=="country" && dataObj.countryObj)
            $("span#"+key).text(dataObj.countryObj.value); 
        else
        	$("span#"+key).text(data.userProfile[value]);
    });
	var hideArr = ['#lastLogin','#salutation','#assignedRoles']
		$.each(hideArr,function(key,value){
			$(value).closest('.profile-info-row').addClass('hide');
		});
		$("#preferencesDiv").addClass('hide').prev().addClass('hide');
		$("#userDisplayName").text(data.userProfile.name);
		$("#imageUserId").text(data.userProfile.name);
		if($("#manager").text()=="")
			$("#manager").text(data.userProfile.manager)
		if($("span#dob").text()!="")
			$("span#dob").text(moment($("span#dob").text(),"yyyy-mm-dd".toUpperCase()).format(userPreferences.dateFormat.toUpperCase()));
		removeLoading();
}

function getOtProfileUsersList(){
    var otherUsers = $('#otherUsers').selectize({
    valueField: 'userId',
    labelField: 'userName',
    searchField: ['userName'],
    create: false,
    load: function(query, callback) {
    	if (query.length && query.length >= 2){
        	data = {user:query}
        	sendAjaxCall(intalio_bpms.org_mapping_users.search_users,'GET',false,true,"json",data,callback,function(data){
        		callback(data.search);
        	});
    	}
	}
	});
	otherUsers = otherUsers[0].selectize;
}