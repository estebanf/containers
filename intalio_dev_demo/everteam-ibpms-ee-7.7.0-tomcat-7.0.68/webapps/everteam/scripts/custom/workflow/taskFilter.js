/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

var filterObjects={},priorities = "<option value='Critical'>Critical</option><option value='Important'>Important</option><option value='Normal'>Normal</option><option value='low'>Low</option>",states = "<option value='ready'>Ready</option><option value='claimed'>Claimed<i class='fa fa-check'></i></option><option value='escalated'>Escalated</option>",packageProcess={},assignedToData={};
$(document).ready(function(){
	if($("link[href='style/custom/workflow/taskFilter.css']").length<=0)
		loadCss('style/custom/workflow/taskFilter.css',"");
});

var manageTaskFilter = {
	fetchTasksFilters   : function(){
		var data={};
		sendAjaxCall(intalio_bpms.task_filter.list_filter, "GET", false, true, "json",data, manageTaskFilter.taskFilterAjaxError, manageTaskFilter.populateTasksFilters);
	},
	populateTasksFilters: function(data){
		filterObjects = {};
		$('#filterTasksDropdown li:gt(5)').remove();
		if(data.filters.length > 0){
			$('#filterTasksDropdown').append("<li class='divider'></li>");
			$.each(data.filters,function(key,value){
				filterObjects[value.id] = value;
				$('#filterTasksDropdown').append('<li><a filterId='+value.id+' class="filters" onclick="manageTaskFilter.applyFilter(this)">'+value.name+'</a></li>');
			});
		}
		
	},
	applyFilter : function(obj){
		$('#bcTaskFilterName').text($(obj).text());
		$('#breadcrumbTaskFilter').removeClass('hide');
		var filterId  = $(obj).attr('filterId');
		processTasks = false;
		packageObj = $.grep(packageData, function(e){return e.name == filterObjects[filterId].projectName && e.package==true && e.status=="ACTIVE"});
		taskData.projectName=packageObj.length==1 ? filterObjects[filterId].projectName+"."+packageObj[0].version : filterObjects[filterId].projectName;
		taskData.priorities=filterObjects[filterId].priorities;
		taskData.states=filterObjects[filterId].states;
		taskData.users=filterObjects[filterId].users;
		taskData.roles=filterObjects[filterId].roles;
		taskData.deadline = filterObjects[filterId].deadline;
		taskData.creationDate = filterObjects[filterId].creationDate;
		taskData.sharedTo=filterObjects[filterId].sharedTo;
		taskData.page = 1;
		taskData.processId = [];
		var processFlag = false;
		$.each(packageData,function(key,value){
			if(value.package && value.status=="ACTIVE" && value.name===filterObjects[filterId].projectName){
				processFlag = true;
			}
			else if(processFlag && value.package){
				processFlag = false;
			}
			if(processFlag && !value.package)
				taskData.processId.push(value.id);
		});
		if(userCache!=null && userCache!=undefined && $("#userid").text()!=""){
			userCache.wTaskFilter = filterObjects[filterId];
			$.jStorage.set($("#userid").text(), userCache);
		}
		viewAllTasks();
	},
	openFilterModal : function(){
		$("#filterSpanTask").addClass("hide");
		$("#taskFilterTable").addClass("hide");
		$("#taskFilterUpdateTable").addClass("hide");
		$("#filterTaskModal").find('.modal-footer').addClass('hide');
		$("#newTaskFilter").prop('checked',false);
		$("#updateTaskFilters").prop('checked',false);
		manageTaskFilter.getAssignedTo('create');
		manageTaskFilter.getPackageFilter('create');
		$("#FilterCreationDatePicker").val('');
		modalShow('filterTaskModal');
	},
	prepareCreateFilter : function(){
		$("#taskFilterName").val("");
		$("#FilterDueDatePicker").val("");
		$("#FilterCreationDatePicker").val("");
		manageTaskFilter.populateStatesPriorities(true);
		manageTaskFilter.hideUnreqData('create');
		manageTaskFilter.getPackageFilter('create');
		if(assignedToData)
			manageTaskFilter.populateAssignedTo(assignedToData,'create');
	},
	populateStatesPriorities : function(chosen){
		removeChosen("tasksPriorityFilter");
		removeChosen("tasksStatusFilter");
		$("#tasksPriorityFilter").append(priorities);
		$("#tasksStatusFilter").append(states);
		if(chosen)
			manageTaskFilter.applyChosen(false);
	},
	getPackageFilter : function(type){
		var data={},filterObj={},packageProcess = {},packages="";
		if(type=="update")
			filterObj = filterObjects[$("#tasksFilters").val()];
		removeChosen("tasksPackageFilter");
		$("#taskFilterTable").find("tr:last").addClass("hide");
			if(packageData!=undefined){
				$('#tasksPackageFilter').append('<option value="">'+$("#filterChoosePackMsg").text()+'</option>');
				$.each(packageData,function(key,value){
					if(value.package){
						maxVersion = 1;
						$.each(packageData,function(key1,value1){
							if(value1.package){
								if(value1.name ==value.name && value1.version>maxVersion)
									maxVersion = value1.version;
							}
						});
						if(value.version==maxVersion){
							if(type==="update" && filterObj.projectName && filterObj.projectName==value.name){
								packages+="<option selected='selected' value="+value.name+">"+value.name+"</option>";
							}
							else
								packages+="<option value="+value.name+">"+value.name+"</option>";
						}
					}
				});
				$('#tasksPackageFilter').append(packages);
				if(type==='update' && filterObj.showCustomColumns==="true")
					$('#showCustomMetadata').prop('checked',true);
				else
					$('#showCustomMetadata').prop('checked',false);
				manageTaskFilter.applyChosenHelper("tasksPackageFilter");
				$('#tasksPackageFilter_chzn .chzn-single').css('height',30);
			}
	},
	prepareUpdateFilter : function(){
		manageTaskFilter.populateFiltersForUpdate();
		manageTaskFilter.hideUnreqData('update');
	},
	populateFiltersForUpdate : function(){
		removeChosen('tasksFilters');
		if(!isObjectEmpty(filterObjects)){
			$("#tasksFilters").append("<option value='-1'>Choose filter...</option>");
			$.each(filterObjects,function(key,obj){
				$("#tasksFilters").append("<option value="+key+">"+obj.name+"</option>");
			});
		}
		$("#tasksFilters").chosen();
		$("#tasksFilters_chzn").css("width",304);
	},
	populateFilterData : function(){
		if($("#tasksFilters").val()=="-1"){
			manageTaskFilter.hideUnreqData('update');
			$("#FilterDueDatePicker").val("");
			$("#FilterCreationDatePicker").val("");
		}
		else{
			$("#FilterDueDatePicker").val("");
			$("#FilterCreationDatePicker").val("");
			manageTaskFilter.hideUnreqData('');
			var filterObj = filterObjects[$("#tasksFilters").val()];
			if(filterObj){
				manageTaskFilter.populateStatesPriorities(false);
				manageTaskFilter.getAssignedTo("update");
				manageTaskFilter.getPackageFilter('update');
				$("#taskFilterName").val(filterObj.name);
				//For oracle with Jboss default fields are not coming for UI 
				if(filterObj.deadline){
					var dueDate = filterObj.deadline.split(';');
					$("#dueDateOperator option[value='"+dueDate[0]+"']").attr('selected','selected');
					$("#FilterDueDatePicker").val(dueDate[1].replace("T"," "));
				}
				//For oracle with Jboss default fields are not coming for UI 
				if(filterObj.creationDate){
					var creDateOperator = filterObj.creationDate.split(';');
					$("#creationDateOperator option[value='"+creDateOperator[0]+"']").attr('selected','selected');
					$("#FilterCreationDatePicker").val(creDateOperator[1].replace("T"," "));
				}
				//For oracle with Jboss default fields are not coming for UI 
				if(filterObj.priorities){
					var priorities = filterObj.priorities.split(',');
					if(priorities.length>0){
						for (var k=0;k<filterObj.priorities.split(',').length;k++){
							$("#tasksPriorityFilter option[value="+priorities[k]+"]").attr('selected','selected');
						}
					}
				}
				//For oracle with Jboss default fields are not coming for UI 
				if(filterObj.states){
					var states = filterObj.states.split(',');
					if(states.length>0){
						for (var l=0;l<filterObj.states.split(',').length;l++){
							$("#tasksStatusFilter option[value="+states[l]+"]").attr('selected','selected');
						}
					}
				}
				manageTaskFilter.applyChosen(false);
			}
		}
	},
	getAssignedTo : function(type){
		var data={};
		assignedToData= {};
		sendAjaxCall(intalio_bpms.task_filter.getAssignedToUsers, "GET", false, true, "json",data, manageTaskFilter.taskFilterAjaxError, function(data){
			assignedToData["peers"] = data.users.peers;
			assignedToData["subordinates"] = data.users.subordinates;
			var newData={};
			sendAjaxCall(intalio_bpms.task_filter.getAssignedToRoles, "GET", false, true, "json",newData, manageTaskFilter.taskFilterAjaxError, function(data){
				assignedToData["externalRoles"] = data.roles.external_roles;
				assignedToData["internalRoles"] = data.roles.internal_roles;
				for (var k = 0; k < assignedToData.subordinates.length; k++) {
                	$.each(assignedToData.peers, function(key,value){
                    	if (value!=undefined && value.userID == assignedToData.subordinates[k].userID)
                        	assignedToData.peers.splice(key, 1);
                	});
            	}
				manageTaskFilter.populateAssignedTo(assignedToData,type);
				manageTaskFilter.populateSharedTo(assignedToData,type);
			});
		});
	},
	populateAssignedTo : function(data,type){
		removeChosen("assignedToFilter");
		var filterObj,users,roles,subOrdinatesGroup="<optgroup label='Subordinate(s)'>",peersGroup="<optgroup label='Peer(s)'>",internalRoles="<optgroup label='Internal Role(s)'>",externalRoles="<optgroup label='External Role(s)'>";
		if(type=="update"){
			filterObj = filterObjects[$("#tasksFilters").val()];
			if(filterObj.users)
				users = filterObj.users.split(',');
			if(filterObj.roles)
				roles = filterObj.roles.split(',');
		}
		$.each(data.peers,function(key,value){
			if(type=="update" && $.inArray(value.userID,users)>=0)
				peersGroup+=("<option selected='selected' value='"+value.userID+"~users'>"+value.userName+"</option>");
			else
				peersGroup+=("<option value='"+value.userID+"~users'>"+value.userName+"</option>");
		});
		peersGroup+=("</optgroup>");
		$.each(data.subordinates,function(key,value){
			if(type=="update" && $.inArray(value.userID,users)>=0)
				subOrdinatesGroup+=("<option selected='selected' value='"+value.userID+"~users'>"+value.userName+"</option>");
			else
			subOrdinatesGroup+=("<option value='"+value.userID+"~users'>"+value.userName+"</option>");
		});
		subOrdinatesGroup+=("</optgroup>");
		$.each(data.internalRoles,function(key,value){
			if(type=="update" && $.inArray(value,roles)>=0)
				internalRoles+=("<option selected='selected' value='"+value+"~roles'>"+value+"</option>");
			else
				internalRoles+=("<option value='"+value+"~roles'>"+value+"</option>");
		});
		internalRoles+=("</optgroup>");
		$.each(data.externalRoles,function(key,value){
			if(type=="update" && $.inArray(value,roles)>=0)
				externalRoles+=("<option selected='selected' value='"+value+"~roles'>"+value+"</option>");
			else
				externalRoles+=("<option value='"+value+"~roles'>"+value+"</option>");
		});
		externalRoles+=("</optgroup>");
		$("#assignedToFilter").append(subOrdinatesGroup).append(peersGroup).append(internalRoles).append(externalRoles);
		manageTaskFilter.applyChosen(true);
	},
	populateSharedTo : function(data,type){
		removeChosen("sharedToFilter");
		var filterObj,sharedTo,subOrdinatesGroup="<optgroup label='Subordinate(s)'>",peersGroup="<optgroup label='Peer(s)'>",internalRoles="<optgroup label='Internal Role(s)'>",externalRoles="<optgroup label='External Role(s)'>";
		if(type=="update"){
			filterObj = filterObjects[$("#tasksFilters").val()];
			if(filterObj.sharedTo)
				sharedTo = filterObj.sharedTo.split(',');
		}
		$.each(data.peers,function(key,value){
			if(type=="update" && $.inArray(value.userID,sharedTo)>=0)
				peersGroup+=("<option selected='selected' value='"+value.userID+"'>"+value.userName+"</option>");
			else
				peersGroup+=("<option value='"+value.userID+"'>"+value.userName+"</option>");
		});
		peersGroup+=("</optgroup>");
		$.each(data.subordinates,function(key,value){
			if(type=="update" && $.inArray(value.userID,sharedTo)>=0)
				subOrdinatesGroup+=("<option selected='selected' value='"+value.userID+"'>"+value.userName+"</option>");
			else
			subOrdinatesGroup+=("<option value='"+value.userID+"'>"+value.userName+"</option>");
		});
		subOrdinatesGroup+=("</optgroup>");
		$.each(data.internalRoles,function(key,value){
			if(type=="update" && $.inArray(value,sharedTo)>=0)
				internalRoles+=("<option selected='selected' value='"+value+"'>"+value+"</option>");
			else
				internalRoles+=("<option value='"+value+"'>"+value+"</option>");
		});
		internalRoles+=("</optgroup>");
		$.each(data.externalRoles,function(key,value){
			if(type=="update" && $.inArray(value,sharedTo)>=0)
				externalRoles+=("<option selected='selected' value='"+value+"'>"+value+"</option>");
			else
				externalRoles+=("<option value='"+value+"'>"+value+"</option>");
		});
		externalRoles+=("</optgroup>");
		$("#sharedToFilter").append(subOrdinatesGroup).append(peersGroup).append(internalRoles).append(externalRoles);
		manageTaskFilter.applyChosen(true);
	},
	applyChosen : function(filter){
		if(filter){
			manageTaskFilter.applyChosenHelper("assignedToFilter");
			manageTaskFilter.applyChosenHelper("sharedToFilter");
		}
		else{
			manageTaskFilter.applyChosenHelper("tasksPriorityFilter");
			manageTaskFilter.applyChosenHelper("tasksStatusFilter");
		}
	},
	applyChosenHelper : function(id){
		$("#"+id).chosen();
		$("#"+id+"_chzn").css("width",304); 
		$("#"+id+"_chzn li.search-field input").css('width',250);
	},
	hideUnreqData : function(type){
		if(type=='create'){
			$("#taskFilterTable").removeClass("hide");
			$("#taskFilterUpdateTable").addClass("hide");
			$("#filterTaskModal").find('.modal-footer button#update').addClass("hide").end().find('.modal-footer button#delete').addClass("hide").end().find('.modal-footer button#create').removeClass('hide').end().find('.modal-footer').removeClass('hide');
		}else if(type=='update'){
			$("#taskFilterTable").addClass("hide");
			$("#taskFilterUpdateTable").removeClass("hide");
			$("#filterTaskModal").find('.modal-footer').addClass('hide');
		}else{
			$("#filterTaskModal").find('.modal-footer button#create').addClass("hide").end().find('.modal-footer button#update').removeClass("hide").end().find('.modal-footer button#delete').removeClass("hide").end().find('.modal-footer').removeClass('hide');
			$("#taskFilterTable").removeClass("hide");
		}
	},
	createOrUpdateTaskFilter : function(type){
		var users=[],roles=[],states=[],priorities=[],url = "",assignedTo = $("#assignedToFilter").val(),sharedTo=[];
		$("#filterSpanTask").text("");
		if($("#taskFilterName").val()===""){
			$("#filterSpanTask").text($("#nameValidation").text()).removeClass('hide');
			$("#taskFilterName").focus();
		}
		else{
			if(assignedTo!=null && assignedTo.length>0){
				for (var k=0;k<assignedTo.length;k++){
					var splitData = assignedTo[k].split('~');
					if(splitData[1].indexOf('roles')>=0)
						roles[roles.length] = splitData[0];
					else
						users[users.length] = splitData[0];
				}
			}
			if($('#sharedToFilter').val() && $('#sharedToFilter').val().length>0){
				sharedTo.push($('#sharedToFilter').val());
			}
			if($("#tasksStatusFilter").val()!=null)
				states  = $("#tasksStatusFilter").val();
			if($("#tasksPriorityFilter").val()!=null)
				priorities  = $("#tasksPriorityFilter").val();
			var data={
				name:$("#taskFilterName").val(),
				states:states+"",
				priorities:priorities+"",
				users:users+"",
				roles:roles+"",
				projectName:$("#tasksPackageFilter").val(),
				showCustomColumns:true,
				sharedTo:sharedTo+"",
				creationDate:"",
				deadline:""
			};
			if($("#FilterDueDatePicker").val())
				data.deadline = $("#dueDateOperator").val()+";"+$.format.date(moment($("#FilterDueDatePicker").val()).unix()*1000,"yyyy-MM-ddTHH:mm:ss");
			if($("#FilterCreationDatePicker").val())
				data.creationDate = $("#creationDateOperator").val()+";"+$.format.date(moment($("#FilterCreationDatePicker").val()).unix()*1000,"yyyy-MM-ddTHH:mm:ss");
			if(type!='create')
				data.id=$("#tasksFilters").val();
			url=intalio_bpms.task_filter.create_delete_filter;
			sendAjaxCall(url, "POST", false, true, "json",data, manageTaskFilter.taskFilterAjaxError,function(responseData){
			manageTaskFilter.showSuccessErrorMsg(responseData,type,data)});
		}
	},
	deleteTaskFilter : function(){
		var data={};
		sendAjaxCall(intalio_bpms.task_filter.create_delete_filter+"?id="+$("#tasksFilters").val(), "DELETE", false, true, "json",data, manageTaskFilter.taskFilterAjaxError,function(data){manageTaskFilter.showSuccessErrorMsg(data,"delete")});
	},
	showEscalatedTasks : function(){
		$.each(filterArray,function(key,value){
			taskData[value]="";
		});
		taskData.states="escalated";
		taskData.page=1;
		processTasks = false;
		taskData.processId=[];
		taskData.sharedTasks=false;
		var filObj = {name:"Escalated Task(s)",priorities:"",states:"escalated",users:"",roles:"",deadline:""};
		if(userCache!=null && userCache!=undefined && $("#userid").text()!=""){
			userCache.wTaskFilter = filObj;
			$.jStorage.set($("#userid").text(),userCache);
		}
		$('#bcTaskFilterName').text("Escalated Task(s)");
		$('#breadcrumbTaskFilter').removeClass('hide');
		viewAllTasks();
	},
	showExpiredTasks : function(){
		$.each(filterArray,function(key,value){
			taskData[value]="";
		});
		taskData.page=1;
		taskData.states="failed";
		taskData.sharedTasks=false;
		var dateObj = new Date();
		var curTime = dateObj.getFullYear()+"-"+("0"+parseInt(dateObj.getMonth()+1)).slice(-2)+"-"+("0"+dateObj.getDate()).slice(-2)+"T"+dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds();
		taskData.deadline = curTime;
		taskData.processId=[];
		var filObj = {name:"Expired Task(s)",priorities:"",states:"failed",users:"",roles:"",deadline:curTime};
		if(userCache!=null && userCache!=undefined && $("#userid").text()!=""){
			userCache.wTaskFilter = filObj;
			$.jStorage.set($("#userid").text(),userCache);
		}
		$('#bcTaskFilterName').text("Expired Task(s)");
		$('#breadcrumbTaskFilter').removeClass('hide');
		processTasks = false;
		viewAllTasks();
	},
	showSubordinateTasks : function(){
		var data={},assignedToData= {},
		filObj = {name:"Subordinates Task(s)",priorities:"",states:"",users:"",roles:"",deadline:""};
		sendAjaxCall(intalio_bpms.task_filter.getAssignedToUsers, "GET", false, true, "json",data, manageTaskFilter.taskFilterAjaxError, function(data){
			if(data.users!=undefined && data.users.subordinates!=undefined && data.users.subordinates.length==0)
				showInformation($("#subordinatesTasksError").text());
			else{
				var subordinates = []; 
				for(var i=0;i<data.users.subordinates.length;i++){
					subordinates[subordinates.length] = data.users.subordinates[i].userID;
				}
				$.each(filterArray,function(key,value){
					taskData[value]="";
				});
				taskData.page=1;
				taskData.users = subordinates+"";
				taskData.sharedTasks=false;
				taskData.processId=[];
				filObj.users = subordinates+"";
				if(userCache!=null && userCache!=undefined && $("#userid").text()!=""){
					userCache.wTaskFilter = filObj;
					$.jStorage.set($("#userid").text(),userCache);
				}
				processTasks = false;
				$('#bcTaskFilterName').text("Subordinate Task(s)");
				$('#breadcrumbTaskFilter').removeClass('hide');
				viewAllTasks();
			}
		});
	},
	showSharedTasks : function () {
		var filObj = {name:"Shared Task(s)",priorities:"",states:"",users:"",roles:"",deadline:"",sharedTasks:"true"};
		handleTaskButtons();
		if(userCache && $("#userid").text()!=""){
			userCache.wTaskFilter = filObj;
			$.jStorage.set($("#userid").text(),userCache);
		}
		$('#bcTaskFilterName').text("Shared Task(s)");
		$('#breadcrumbTaskFilter').removeClass('hide');
		$.each(filterArray,function(key,value){
			taskData[value]="";
		});
		taskData.page=1;
		processTasks = false;
		taskData.processId=[];
		taskData.sharedTasks = true;
		viewAllTasks();
	},

	removeErrorMsg : function(){
		$("#filterSpanTask").text("");
	},
	taskFilterAjaxError : function(data){
		if(data.error!=undefined)
			showInformation(data.error);
		return false;
	},
	showSuccessErrorMsg : function(data,type,actData){
		if(data.msg!=undefined && data.msg=='success'){
			if(type=="create")
				showNotification("Filter Created Successfully.");
			else if(type=="update")
				showNotification("Filter Updated Successfully.");
			else if(type=="delete")
				showNotification("Filter Deleted Successfully.");
			modalHide("filterTaskModal");
			if(type=="update" && $("#bcTaskFilterName").text()===$("#taskFilterName").val()){
				$.each(filterArray,function(key,value){
					taskData[value]=actData[value];
				});
				taskData.page=1;
				var filObj = filterObjects[$("#tasksFilters").val()];
				filObj.priorities = actData.priorities;
				filObj.roles = actData.roles;
				filObj.states = actData.states;
				filObj.users = actData.users;
				filObj.projectName = actData.projectName;
				filObj.showCustomColumns = actData.showCustomColumns;
				filObj.deadline=actData.deadline;
				filObj.creationDate=actData.creationDate;
				filObj.processId=actData.processId;
				filObj.sharedTo=actData.sharedTo;
				if(userCache!=null && userCache!=undefined && $("#userid").text()!=""){
					userCache.wTaskFilter = filObj;
					$.jStorage.set($("#userid").text(), userCache);
				}
				viewAllTasks();
			}else if(type=="delete")
				$("#bcTaskFilterName").next().click();
		}
		else if(data.msg!=undefined)
			showErrorNotification(data.msg);
	}
};
