<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Intalio</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
<link rel="stylesheet" type="text/css" href="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.min.css" />
<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.core.min.js"></script>
<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.calbox.min.js"></script>
<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/i18n/jquery.mobile.datebox.i18n.en_US.utf8.js"></script>
<script type="text/javascript" src="../mobile/js/messages.js"></script>
</head>
<style>
.content_div {
	display: none;
}
.content_div:first-child {
	display: block;
}
.ui-content {
    padding: 5px;
}
.ui-listview-filter {
    margin: -15px 0px 15px;
}
.ui-content .ui-listview {
    margin: -15px 0px -15px;
}
.io-header-logo
{
  position:relative;
  float : left;
  margin-top:12px;
  margin-left:10px;
  margin-right:35px;
  margin-bottom:5px;
  height:30px;
}
.ui-input-datebox {
    background-color: #EEEEEF;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2) inset;
}
</style>
<body>
<div id="taskListPage" data-role="page" align="center" data-theme="d">
		<div data-role="header" data-theme="d">
			<div><img src="../images/logo.png" alt="Intalio" class="ui-btn-left io-header-logo"></div>
			<h1></h1>
			<div data-role="controlgroup" data-type="horizontal" class="ui-btn-right">
				<a href="#" onclick="getTaskList();return false;" data-role="button" data-icon="refresh"  data-iconpos="notext"></a>
				<a href="#" onclick="logout();return false;" data-role="button" data-icon="delete" data-iconpos="notext"></a>
			</div>
		</div>
		<div data-role="content" role="main">
				<div data-role="navbar">
					<ul>
						<li><a id="firstTab" href="#" data-href="a">Tasks</a></li>
						<li><a id="secondTab" href="#" data-href="b">Notification</a></li>
						<li><a id="thirdTab" href="#" data-href="c">Process</a></li>
					</ul>
				</div>
				<br />
				<div id="a" class="content_div" >
					<ul id="tasks" data-role="listview" data-filter="true" data-filter-placeholder="Search PA tasks...">
					</ul>
				</div>
				<div id="b" class="content_div" >
					<ul id="notification" data-role="listview" data-filter="true" data-filter-placeholder="Search Notifications tasks...">
					</ul>
				</div>
				<div id="c" class="content_div" >
					<ul id="process" data-role="listview" data-filter="true" data-filter-placeholder="Search PIPA tasks...">
					</ul>
				</div>
				<br />
				<div>
					<a id="More" href="#" onclick="older();return false;" data-role="button" data-mini="true" >More</a>
				</div>
				<div data-role="popup" id="errPopup" class="ui-content">
					<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
					<b id="err"></b>
				</div>
		</div>
	</div>

	<div id="formPage" data-role="page" align="center" data-theme="d">
	<div data-role="header" data-theme="d">
			<div><img src="../images/logo.png" alt="Intalio" class="ui-btn-left io-header-logo"></div>
			<h1></h1>
			<div data-role="controlgroup" data-type="horizontal" class="ui-btn-right">
				<a href="#" onclick="getTaskList();return false;" data-role="button" data-icon="home" data-iconpos="notext"></a>
				<a href="#" onclick="logout();return false;" data-role="button" data-icon="delete" data-iconpos="notext"></a>
			</div>
		</div>
		<br />
		<br />
		<div data-role="content" role="main">
			<div id="formDiv"></div>
		</div>
		<div data-role="popup" id="taskpopup" class="ui-content">
				<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right" onclick="getTaskList();return false;">Close</a>
				<b id="msg"></b>
		</div>
		<div data-role="popup" id="datapopup" class="ui-content">
				<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
				<b id="datamsg"></b>
		</div>
	</div>
</body>
<script type="text/javascript">
var page = 0;
var renderedTasks =0;

function logout() {
	document.location.href = 'logout';
}

function older() {
	++page;
	$.post('getTaskList',{ page: page }, function(responseData) {
		if(responseData.error == null) {
			var availableTasks = responseData.totalAvailableTasks;
			renderTaskList(responseData.tasklist, availableTasks);
		} else {
			displayError(responseData.error)
		}
	});
}

function getTaskList() {
	page = 0;
	renderedTasks =0;
	$('#More').show();
	$.post('getTaskList',{ page: 0 }, function(responseData) {
		if(responseData.error == null) {

			$.mobile.changePage( $("#taskListPage"), { transition: "slideup"} );
			$('#tasks li').remove();
			$('#notification li').remove();
			$('#process li').remove();
			$('#firstTab').addClass('ui-btn-active');
            $('#a').show();
            $('#b').hide();
            $('#c').hide();
            $('#secondTab').removeClass('ui-btn-active');
            $('#thirdTab').removeClass('ui-btn-active');

			$(document).delegate('[data-role="navbar"] a', 'click', function () {
				$(this).addClass('ui-btn-active');
				$('.content_div').hide();
				$('#' + $(this).attr('data-href')).show();
				return true;//stop default behavior of link return false
			});
			var availableTasks = responseData.totalAvailableTasks;
			renderTaskList(responseData.tasklist, availableTasks);
		} else {
			displayError(responseData.error)
		}
	});
}

function renderTaskList(responseData, availableTasks) {
	renderedTasks += responseData.length;
	if(responseData.length>0) {
		if(availableTasks == renderedTasks){
		      $('#More').hide();
		}
		//responseData.forEach( function(task) {
		$.each(responseData, function(index,task) { //Fix for BPMOBI-25, IE doesn't support forEach function, used jquery's each
			if(task.description == '') task.description = '<i>No Description</i>';
			if (task.taskType == 'pa' ) {
				$('#tasks').append('<li><a class="taskItem" id="'+task.id+'">'+task.description+'</a></li>').listview('refresh');
			} else if (task.taskType == 'pipa') {
				$('#process').append('<li><a class="taskItem" id="'+task.id+'">'+task.description+'</a></li>').listview('refresh');
			} else if (task.taskType == 'notification') {
				$('#notification').append('<li><a class="taskItem" id="'+task.id+'">'+task.description+'</a></li>').listview('refresh');
			}
		} );
	} else {
		$('#More').hide();
	}
	$(".taskItem").click(function(){
		var taskId = this.id;
		renderForm(taskId);
		});
}

function addCheckbox(checkbox,form) {
	if(checkbox.value == 'true'){
		form[checkbox.section] += '<label><input type="checkbox" name="'+checkbox.label+'" id="'+checkbox.id+'" class="custom" checked="checked"/> '+checkbox.label+'</label>';
	} else {
		form[checkbox.section] += '<label><input type="checkbox" name="'+checkbox.label+'" id="'+checkbox.id+'" class="custom" /> '+checkbox.label+'</label>';
	}

	return form;
}

function addRadioButton(radioButton,form) {
	var label = radioButton.label;
	if(radioButton.required){
		label = '* '+label;
	}
	form[radioButton.section] += '<fieldset data-role="controlgroup"> <legend>'+label+'</legend>';
	for(var key in radioButton.values) {
		if(radioButton.value == radioButton.values[key]) {
			form[radioButton.section] += '<label><input type="radio" id="'+radioButton.id+'" name="'+label+'" class="custom" value="'+radioButton.values[key]+'" checked="checked" '+requiredText(radioButton)+'/> '+key+'</label>';
		} else {
			form[radioButton.section] += '<label><input type="radio" id="'+radioButton.id+'" name="'+label+'" class="custom" value="'+radioButton.values[key]+'" '+requiredText(radioButton)+'/> '+key+'</label>';
		}
	}
	form[radioButton.section] += '</fieldset>';
	return form;
}

function addTextbox(textbox,form,password) {

	var regex = '';
	var type = '';
	var read = '';
	var required = '';
	var validate = '';

	if(textbox.validationExpression != null && textbox.validationExpression != ''){
		regex = textbox.validationExpression;
		var expression = new RegExp(regex);
		validate = 'onchange="validate('+expression+',\''+textbox.id+'\',\''+textbox.label+'\');return false;"';
	}

	if(password) {
		type='password';
	} else if(textbox.type == 'textarea'){
		type = 'textarea';
	} else{
		type = 'text';
	}

	if(textbox.readOnly) {
		read='readonly="readonly"';
	}

	var label = textbox.label;
	if(textbox.required){
		label = '* '+label;
	}
	if(type == 'textarea'){
		form[textbox.section] +=' <label for="'+textbox.id+'">'+label+'</label><textarea type="'+type+'" name="'+label+'" id="'+textbox.id+'" data-mini="true" pattern="'+regex+'" '+requiredText(textbox)+' '+read+' '+validate+' >'+textbox.value+'</textarea><br />';
	}else{
		form[textbox.section] +=' <label for="'+textbox.id+'">'+label+'</label><input type="'+type+'" name="'+label+'" id="'+textbox.id+'" data-mini="true" pattern="'+regex+'"  value="'+textbox.value+'" '+requiredText(textbox)+' '+read+' '+validate+' /><br />';
	}

	return form;
}

function validate(regex, id, label){

	if($('#'+id).val() != null && $('#'+id).val() != ''){
		if(!regex.test($('#'+id).val())){
			displayDataPopup(validatemsg+' for field '+label);
			return  false;
		}
	}
	return true;
}

function addOutputBox(outbox,form){
	form[outbox.section] += '<label >'+outbox.label+' &nbsp '+outbox.value+'</label> <br /><br />';
	return form;
}

function addSelect(select, form, multiple) {
	var label = select.label;
	if(select.required){
		label = '* '+label;
	}
	form[select.section] += '<label for="'+select.id+'" class="select">'+label+'</label>';
	if(multiple) {
		form[select.section] += '<select name="'+label+'" data-native-menu="false" data-mini="true" id="'+select.id+'" multiple="multiple" '+requiredText(select)+'>';
	} else {
		form[select.section] += '<select name="'+label+'" id="'+select.id+'" '+requiredText(select)+' >';
	}
	var selected = select.value.split(',');
	for(var key in select.values) {
		if($.inArray(key, selected) != -1) {
			form[select.section] += '<option value="'+key+'" selected="selected" >"'+select.values[key]+'"</option>'
		} else {
			form[select.section] += '<option value="'+key+'" >"'+select.values[key]+'"</option>'
		}
	}
	form[select.section] += '</select>'
	return form;
}

function addDatePicker(date,form) {
	var label = date.label;
	if(date.required){
		label = '* '+label;
	}
	form[date.section] +='<label for="'+date.id+'">'+label+'</label><input type="date" name="'+label+'" id="'+date.id+'" value="'+date.value+'" '+requiredText(date)+' data-role="datebox" data-options= \'{"mode": "calbox","overrideDateFormat": "%Y-%m-%d"}\'/><br />';
	return form;
}

function addButton(tasktype) {
	var button = '';
	if(tasktype == 'pipa') {
		button += '<div  style ="width:40%;"><input type="button" value="Start" id="startbutton" /></div>';
	} else if(tasktype == 'pa') {
		button += '<div data-role="controlgroup" >'
								+'<input type="button" value="Save" id="savebutton" />'
								+'<input type="button" value="Claim" id="claimbutton" />'
								+'<input type="button" value="Revoke" id="revokebutton" />'
								+'<input type="button" value="Complete" id="completebutton" /></div>';
	} else if(tasktype == 'notify') {
		button += '<div  style ="width:20%;"><input type="button" value="Dismiss" id="dismissbutton" /></div>';
	}
	return button;
}

function disableButtons(tasktype, taskstate) {
	if(tasktype == 'pipa') {
		if(taskstate != 'READY')
			$('#startbutton').button('disable');
	} if(tasktype == 'pa') {
		if(taskstate == 'READY') {
			$('#revokebutton').button('disable')
		} else if(taskstate == 'CLAIMED') {
			$('#claimbutton').button('disable');
		} else {
			$('#savebutton').button('disable');
			$('#claimbutton').button('disable');
			$('#completebutton').button('disable');
			$('#revokebutton').button('disable');
		} ;
	}
}

function getFormData() {
	var formData = {};
	var valid = true;
	var forms = $('.intalioform');
	forms.each(function(){
		if(!valid) return;
		var section = this.id;
		if (!(section == '' || section == null)) {
			var inputs = $('#'+section+' :input');
			inputs.each(function() {
				var key = '';
				if(forms.length>1) {
					key = section+':'+this.id;
				} else {
					key = this.id;
				}
				if(this.type == 'checkbox'){
					formData[key] = $(this).is(":checked");
				} else if(this.type == 'radio'){
					if($(this).is(":checked"))
						formData[key] = $(this).val();
				} else {
					formData[key] = (!$(this).val()) ? 'null' : $(this).val();
				}
			});
			if(!validateFormData(inputs, section, formData))
				valid =false;
		}
	});

	if (valid) {
		return JSON.stringify(formData);
	} else {
		return null;
	}
}

function validateFormData(inputs, section, formData) {
	var valid = true;
	var validation = true;
	inputs.each(function() {
		if(this.required && valid) {
			if(formData[this.id] == 'null' || formData[section+':'+this.id] == 'null') {
				displayDataPopup(mandatorymsg+this.name);
				valid = false;
			} else if(!formData[this.id] && !formData[section+':'+this.id]) {
				displayDataPopup(mandatorymsg+this.name);
				valid = false;
			}
		}

		var validatePattern = true;
		if(this.pattern != null && this.pattern != ''){
			var regex = new RegExp(this.pattern);
			validatePattern = validate(regex, this.id, this.name);

		}
		if(!(valid && validatePattern))
			validation = false;
	});
	return validation;
}

function displayPopup(msg) {
	$('#msg').text(msg);
	$('#taskpopup').popup("open");
}

function displayError(msg) {
	$('#err').text(msg);
	$('#errPopup').popup("open");
}

function displayDataPopup(msg) {
	$('#datamsg').text(msg);
	$('#datapopup').popup("open");
}
function renderForm(taskId) {
		$.post("renderForm", { taskId: taskId}, function(responseData) {
			if(responseData.error == null) {
				var form = {};
				$.mobile.changePage( $("#formPage"), { transition: "slideup"} );
				$('#formDiv').text('');
				responseData.sections.forEach(function(element){
					form[element]='';
				});
					responseData.formElements.forEach( function(element) {
						if(element.type == "checkbox") {
							form = addCheckbox(element,form);
						} else if (element.type == "select") {
							form = addSelect(element,form,false);
						} else if (element.type == "radiobutton") {
							form = addRadioButton(element,form);
						} else if (element.type == "multiselect") {
							form = addSelect(element,form,true);
						} else if (element.type == "datepicker") {
							form = addDatePicker(element,form,true);
						} else if (element.type == "textbox" && element.passwordType ) {
							form = addTextbox(element,form,true);
						} else if (element.type == "textbox") {
							form = addTextbox(element,form,false);
						} else if (element.type == "textarea") {
							form = addTextbox(element,form,false);
						}else if (element.type == "outputbox"){
						    form = addOutputBox(element,form);
						}
					});
					responseData.sections.forEach(function(element){
						$('#formDiv').append('<form id="'+element+'" method="post" data-ajax="false" class="intalioform"></form>');
						$('#'+element).append(form[element]);
					});
				$('#formDiv').append(addButton(responseData.tasktype));
				$("#formPage").trigger( "create" );
				disableButtons(responseData.tasktype, responseData.taskstate)
				registerFormButtons(taskId);
		} else {
			displayError(responseData.error);
		}
		});
}

function registerFormButtons(taskId) {
	$("#startbutton").click(function(){
		formData = getFormData();
		if( formData != null ) {
			 $.mobile.loading( 'show' );
			$.post("initProcess", { taskId: taskId, formData: formData },
					function(responseData) {
					$.mobile.loading( 'hide' );
						if(responseData.error == null) {
							if(responseData.status == 'OK') {
									if(responseData.nextTaskId != undefined) {
										renderForm(responseData.nextTaskId);
									} else {
										displayPopup(startedmsg);
									}
								} else {
									displayPopup("Error Code: "+responseData.errorCode +" Error reason: "+responseData.errorReason);
								}
						} else {
							displayPopup(responseData.error);
						}
					});
			}
		});

	$("#savebutton").click(function(){
		formData = getFormData();
		if( formData != null ) {
			$.mobile.loading( 'show' );
			$.post("saveProcess", { taskId: taskId, formData: formData },
					function(responseData) {
						$.mobile.loading( 'hide' );
						if(responseData.error == null) {
							displayPopup(savedmsg);
						} else {
							displayPopup(responseData.error);
						}
				});
			}
		});

	$("#claimbutton").click(function(){
		$.mobile.loading( 'show' );
		$.post("claimProcess", { taskId: taskId },
				function(responseData) {
				$.mobile.loading( 'hide' );
				if(responseData.error == null) {
					displayDataPopup(claimedmsg);
					$('#claimbutton').button('disable');
					$('#revokebutton').button('enable');
				} else {
					displayPopup(responseData.error);
				}
			});
		});

	$("#revokebutton").click(function(){
		$.mobile.loading( 'show' );
		$.post("revokeProcess", { taskId: taskId },
				function(responseData) {
				$.mobile.loading( 'hide' );
				if(responseData.error == null) {
					displayDataPopup(revokedmsg);
					$('#revokebutton').button('disable');
					$('#claimbutton').button('enable');
				} else {
					displayPopup(responseData.error);
				}
			});
		});

	$("#completebutton").click(function(){
		formData = getFormData();
		if( formData != null ) {
			$.mobile.loading( 'show' );
			$.post("completeProcess", { taskId: taskId, formData: formData },
					function(responseData) {
				$.mobile.loading( 'hide' );
				if(responseData.error == null) {
					if(responseData.response.status == 'OK') {
						if(responseData.response.taskMetaData.nextTaskId != undefined && responseData.response.taskMetaData.nextTaskId != '') {
							renderForm( responseData.response.taskMetaData.nextTaskId );
						} else {
							displayPopup(completedmsg);
						}
					} else {
						displayPopup("Error Code: "+responseData.response.errorCode +" Error reason: "+responseData.response.errorReason);
					}
				} else {
					displayPopup(responseData.error);
				}
				});
			}
		});

	$("#dismissbutton").click(function(){
		$.mobile.loading( 'show' );
		$.post("dismissProcess", { taskId: taskId },
				function(responseData) {
			$.mobile.loading( 'hide' );
			displayPopup(responseData);
			});
		});
}
function requiredText(element) {
	var text = '';
	if(element.required){
		text = 'required="1"'
	}
	return text;
}
getTaskList();
$('#a').show();
$('#b').hide();
$('#c').hide();
</script>
</html>