 /*
 * Copyright (C) 2016, Ever Team Software
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Ever Team Software or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 * @author : Satish Pokala
 */

/*modeler app is a global namespace*/
var modelerApp      = {};
/*all below objects are the sub namespaces for modeler app divided as functionality*/
modelerApp.constant = {};
modelerApp.init     = {};
modelerApp.buttons  = {};
modelerApp.ajaxError= {};
modelerApp.list     = {};
modelerApp.filter   = {};
modelerApp.create   = {};
modelerApp.share    = {};
modelerApp.delete   = {};
modelerApp.comment  = {};
modelerApp.rImport  = {};

modelerApp.constant= {
	mWidth            : 2000,
	mButtons          : ['Create','Share','Delete','Import'],
	mTableObj         : $("#webBasedModeler"),
	mShareTo          : $("#shareDiagramTo"),
	mShareModal       : $("#shareDiagramModal"),
	mPermission       : $("#diagramPermission"),
	mPopover          : ".ace-popover",
	mPopup            : ".ace-popup",
	mTableRows        : $("#webBasedModeler_rows"),
	mModelerName	  : $('#modelerName'),
	mModelerNameError : $("#modelerNameError"),
	mModelerDesc      : $('#modelerDescription'),
	mShareGroup       : [{id: 'peers', name: 'Peers'},{id: 'subordinates',name: 'Subordinates'},{id: 'internal',name: 'Internal'},{id: 'external',name: 'External'}],
	mPermissionOptions: [{id:"edit",value:"Edit"},{id:"comment",value:"Comment"},{id:"view",value:"View"}],
	mPriorityTypes    : {"view":1,"comment":2,"edit":3,"owner":4},
	mDiagramPriority  : 0,
	mShare            : [],
	mRight            :{
		1   : "<a class='cursorDefault ace-popup' data-trigger='hover' data-content='View' data-placement='bottom'><i class='fa fa-eye bigger-120 blue'></i></a>",
	    2   : "<a class='cursorDefault ace-popup' data-trigger='hover' data-content='Comment' data-placement='bottom'><i class='fa fa-comment bigger-120 black'></i></a>",
	    3   : "<a class='cursorDefault ace-popup' data-trigger='hover' data-content='Edit' data-placement='bottom'><i class='fa fa-pencil-square bigger-120 orange'></i></a>",
	    4   : "<a class='cursorDefault ace-popup' data-trigger='hover' data-content='Owner' data-placement='bottom'><i class='fa fa-user bigger-120 green'></i></a>"
	},
	mButtonObj        :{
		"shareDiagram":"javascript:modelerApp.share.preShare()",
		"deleteButton":"javascript:modelerApp.delete.preDeleteModelers();",
		"exportButton":"javascript:modelerApp.rImport.markUnmarkImport()"
	},
 	mTableOptions     : {
 		"sDom":"<'row'<'col-sm-6'><'col-sm-6'f>><'table_container't><'row'i<'col-sm-6'><'col-sm-6'pl>>",
	    "bInfo": true,
	    "bRetrieve": true,
	    "bAutoWidth": false,
	    "bDestroy": true,
	    "bSort": false,
	    "oLanguage": {"sLengthMenu": $("#entriesInfo").text().replace('{0}',"<select><option value='10'>10</option><option value='50'>50</option><option value='100'>100</option><option value='200'>200</option><option value='500'>500</option><option value='-1'>All</option></select>"),"sSearch": "","sInfo": "Showing _START_ to _END_ of _TOTAL_ diagram(s)"},
	    "aoColumns": [ {
	    	"sWidth":  "3%",
	        "sClass": "center"
		}, {
	        "sWidth":  "28%",
	        "sClass": "alignLeft"
		}, {
			"sWidth":  "12%",
	        "sClass": "alignLeft"
		}, {
			"sWidth":  "25%",
	        "sClass": "alignLeft"
		}, {
			"sWidth":  "5%",
	        "sClass": "center"
		}, {
			"sWidth":  "5%",
	        "sClass": "center"
		}]
	},
	mTableWrapperObj  : "",
	mTableLenObj      : "",
	mTableFilter      : ""
};

modelerApp.init  = {
	intializeModeler : function(){
		modelerApp.mTableRef = modelerApp.constant.mTableObj.dataTable(modelerApp.constant.mTableOptions);
  		customTable('webBasedModeler');
    	modelerApp.shareToObj = applySelectize(modelerApp.constant.mShareTo,modelerApp.constant.mShareGroup,["internal", "external","peers","subordinates"], 50, false,[]);
    	modelerApp.permissionObj = applySelectize(modelerApp.constant.mPermission,[],[],1,false,modelerApp.constant.mPermissionOptions);
    	modelerApp.constant.mTableWrapperObj = $("#webBasedModeler_wrapper");
		modelerApp.constant.mTableLenObj = $('#webBasedModeler_length');
		modelerApp.constant.mTableFilter = $('#webBasedModeler_filter');
    	modelerApp.buttons.loadButtons();
    	modelerApp.list.getDiagrams();
    	modelerApp.constant.mTableFilter.find('input').bind('keyup', function(e) {
           var code = e.keyCode || e.which; 
           if (code  == 13 && $.trim(this.value)!=""){
               e.preventDefault();
               modelerApp.filter.filterDiagrams(this.value);
               return false;
           }else if($.trim(this.value)==""){
           		e.preventDefault();
           		modelerApp.list.getDiagrams();
           		return false;
           }
        });
    }
}

modelerApp.buttons = {
	mButtons : function (name) {
		var iconButton;
	    switch(name){
		    case 'Create':
		        iconButton = "<button type='button' onclick='javascript:modelerApp.create.preSave();' class='btn btn-sm btn-white'><i class='fa fa-plus-circle'></i>&nbsp; "+$("#createButton").text()+"</button>&nbsp;";
		        return iconButton;
		        break;
		    case 'Delete':
		        iconButton = "<button type='button' id='deleteButton' onclick='javascript:modelerApp.delete.preDeleteModelers();' class='btn btn-sm btn-white'><i class='fa fa-trash-o'></i>&nbsp; "+$("#DeleteButton").text()+"</button>&nbsp;";
		        return iconButton;
		        break;
		    case 'Share':
		        iconButton = "<button type='button' onclick='javascript:modelerApp.share.preShare()' id='shareDiagram' class='btn btn-sm btn-white'><i class='fa fa-share-alt'></i>&nbsp;"+$("#shareButton").text()+"</button>&nbsp;";
		        return iconButton;
		        break;
		    case 'Import':
		        iconButton = "<button type='button' id='exportButton' onclick='javascript:modelerApp.rImport.markUnmarkImport()' class='btn btn-sm btn-white'><i class='fa fa-check-circle'></i>&nbsp;"+$("#importButton").text()+"</button>&nbsp;";
		        return iconButton;
		        break;
		}
	},
	loadButtons : function (){
		var btnRef = modelerApp.constant.mButtons;
		for (var i = 0; i < btnRef.length; i++) {
			var button = this.mButtons(btnRef[i]);
			modelerApp.constant.mTableWrapperObj.find('.row .tableButtons').append(button);
		}
	},
	disableButtons : function(obj){
		if(!isSuperAdmin){
			var data = $(obj).closest('tr').find('td:last a').attr('data-content');
			if ($.inArray(data,modelerApp.constant.mShare)==-1 && $(obj).prop('checked'))
					modelerApp.constant.mShare.push(data);
			else if($.inArray(data,modelerApp.constant.mShare)>=0 && !$(obj).prop('checked'))
					modelerApp.constant.mShare.splice($.inArray(data,modelerApp.constant.mShare), 1);
			if(modelerApp.constant.mShare.length==0 || (modelerApp.constant.mShare.length===1 &&  modelerApp.constant.mShare[0]=="Owner")){
				$.each(modelerApp.constant.mButtonObj,function(key,value){
					$("#"+key).removeClass('disabled').find('a').attr('onclick',value);
				});
			}			
			else{
				$.each(modelerApp.constant.mButtonObj,function(key,value){
					$("#"+key).addClass('disabled').find('a').removeAttr('onclick');
				});
			}
		}
	},
	disableForAllDiagrams : function(){
		$("#webBasedModeler_rows").find('tr').each(function(){
			modelerApp.buttons.disableButtons($(this).find('td:first').find('input'));
		});
	}
}

modelerApp.ajaxError = {
	handleAE : function(error){
		showInformation(error.responseText);
    	removeLoading();
	}
}

modelerApp.list = {
	getDiagrams : function(){
		$.each(modelerApp.constant.mButtonObj,function(key,value){
			$("#"+key).removeClass('disabled').find('a').attr('onclick',value);
		});
		addLoading(modelerApp.constant.mTableWrapperObj);
    	sendAjaxCall(intalio_bpms.modeler.getDiagrams, "GET", false, true, "json", {}, modelerApp.ajaxError.handleAE, function(data){
    		if(data.diagrams && data.diagrams.length>0){
	    		var uuidArr=[],k=0;
	    		for(k;k<data.diagrams.length;k++){
	    			uuidArr.push(data.diagrams[k].diagramID);
	    		}
	 	  		modelerApp.comment.getAllCommentCount(uuidArr);
	 	  		modelerApp.diagramData = data;
 	  		}else{
 	  			modelerApp.mTableRef.fnClearTable();
  				modelerApp.mTableRef.fnFilter('');
  				$("#webBasedModeler_wrapper").find("div:last-child").addClass('hide');
 	  			modelerApp.list.postPopulate();
 	  		}
    	});
	},
	populateDiagrams : function(data){
		modelerApp.constant.mShareCount=[];
		modelerApp.mTableRef.fnClearTable();
  		modelerApp.mTableRef.fnFilter('');
  		if (data.diagrams && data.diagrams.length > 0) {
  			$(".dataTables_wrapper div:last-child").removeClass('hide');
    		modelerApp.constant.mTableRows.find('td.dataTables_empty').text('Fetching Diagram(s)...');
    		$.each(data.diagrams, function(key, value) {
        		var items = [],sharedHtml="",readyImportIcon,sharedList,createdBy="",updatedBy="",userRoleHtml="",countOfShared=0;
        		items[items.length] = '<label class="position-relative"><input name="mDiagramSelected" class="ace checkbox" type="checkbox" onclick="updateHeaderCheckbox(this);modelerApp.buttons.disableButtons(this);" value="' + value.uuid + '"/><span class="lbl"></span></label>';
        		readyImportIcon=value.readyToImport ? "<a data-trigger='hover' data-content='Ready to be exported' data-placement='bottom' class='text-success ace-popup cursorDefault pull-right'><i class='fa-zoom-in fa fa-check-circle bigger-125 green'></i></a>" : "";
        		if(value.createdBy){
					if(data.userList){
						obj = $.grep(data.userList, function(e){return e.userID.toLowerCase() === value.createdBy.toLowerCase()});
						createdBy = obj.length ? '<a class="noDecoration" href="#" onclick="javascript:showUserProfile(this)" user="'+obj[0].userID+'">'+obj[0].userName+'</a>' : '<a class="noDecoration" href="#" onclick="javascript:showUserProfile(this)" user="'+value.createdBy+'">'+value.createdBy+'</a>';
					}
					else
						createdBy = '<a class="noDecoration" href="#" onclick="javascript:showUserProfile(this)" user="'+value.createdBy+'">'+value.createdBy+'</a>';
				}if(value.updatedBy){
					if(data.userList){
						obj = $.grep(data.userList, function(e){return e.userID.toLowerCase() === value.updatedBy.toLowerCase()});
						updatedBy = obj.length ? '<a class="noDecoration" href="#" onclick="javascript:showUserProfile(this)" user="'+obj[0].userID+'">'+obj[0].userName+'</a>' : '<a class="noDecoration" href="#" onclick="javascript:showUserProfile(this)" user="'+value.updatedBy+'">'+value.updatedBy+'</a>';
					}
					else
						updatedBy = '<a class="noDecoration" href="#" onclick="javascript:showUserProfile(this)" user="'+value.updatedBy+'">'+value.updatedBy+'</a>';
				}
        		items[items.length] = value.updatedOn ? '<span><span><a class="noDecoration" href="modelling.htm?uuid='+value.uuid+'" target="_blank">'+value.uuid+'</a>'+readyImportIcon+'</span></br><span class="modellerInfo">Created On&nbsp;&nbsp;:&nbsp;'+ $.format.date(value.createdOn, userPreferences.dateFormat+userPreferences.hourFormat)+'&nbsp; By &nbsp;'+createdBy+'</span></br><span class="modellerInfo">Updated On&nbsp;:&nbsp;'+$.format.date(value.updatedOn, userPreferences.dateFormat+userPreferences.hourFormat)+'&nbsp; By &nbsp;'+updatedBy+'</span>' : '<span><span><a class="noDecoration" href="modelling.htm?uuid='+value.uuid+'" target="_blank">'+value.uuid+'</a>'+readyImportIcon+'</span></br><span class="modellerInfo">Created On&nbsp;&nbsp;:&nbsp;'+ $.format.date(value.createdOn, userPreferences.dateFormat+userPreferences.hourFormat)+'&nbsp; By &nbsp;'+createdBy+'</span></span>';
        		if(value.shared){
            		sharedList = "<table class='table noLines sharedUsers'>";
            		$.each(value.shared,function(key1,value1){
            			modelerApp.constant.mDiagramPriority = 0;
            			var userRoleHtml="";
            			if(value1["users"].length > 0 || value1["roles"].length > 0){
            				if(value1["users"].length){
            					for(var k=0;k<value1["users"].length;k++){
            						if(userRoleHtml)
            							userRoleHtml+=",";
            						if(data.userList){
	            						obj = $.grep(data.userList, function(e){return e.userID.toLowerCase() === value1["users"][k].toLowerCase()});
	            						userRoleHtml+= obj.length ? obj[0].userName : value1["users"][k];
	            					}
	            					else
	            						userRoleHtml+=value1["users"][k]
            					}
            				}
            				if(value1["roles"].length)
            					userRoleHtml = userRoleHtml ? userRoleHtml+","+value1["roles"] : value1["roles"];
	                		userRoleHtml = userRoleHtml.toString().replace(/\,/g , ', ');
	                		if(key1!="owner"){
	                    		countOfShared+=parseInt(value1["roles"].length+value1["users"].length);
	                    		sharedList+="<tr><td>"+userRoleHtml+"</td><td class='sharedIcon'><span>"+modelerApp.constant.mRight[modelerApp.constant.mPriorityTypes[key1]]+"</span></td></tr>";
	                		}
	                    }
            		});
            		sharedList+='</table>';
            		sharedHtml = '<span><a href="#" class="ace-popover noDecoration iconCursor" data-trigger="hover" data-placement="bottom" data-content="'+sharedList+'">'+countOfShared+' person(s)</a></span>';
        		}
		        items[items.length] = countOfShared > 0 ? '<span>'+createdBy+'</br><span class="modellerInfo">Shared with ' +sharedHtml+ '</span></span>' : '<span>'+createdBy+'</span>';
        		items[items.length] = value.description;
        		if(value.permissionTypes.length>=0){
	        		for(var k=0;k<=value.permissionTypes.length;k++){
						modelerApp.constant.mDiagramPriority = modelerApp.constant.mDiagramPriority<=modelerApp.constant.mPriorityTypes[value.permissionTypes[k]] ? modelerApp.constant.mPriorityTypes[value.permissionTypes[k]] : modelerApp.constant.mDiagramPriority;
					}
					permissionType = modelerApp.constant.mRight[modelerApp.constant.mDiagramPriority];
	        	}else
	        		permissionType="";
        		items[items.length] = '<a href="#" onclick=javascript:modelerApp.comment.preComment(this,"'+value.diagramID+'","'+modelerApp.constant.mDiagramPriority+'")><i class="ace-icon fa fa-comment bigger-80">&nbsp;&nbsp;<span>'+modelerApp.commentCount[value.diagramID]+'</span></i></a>';
        		items[items.length] = permissionType;
	        	var a = modelerApp.mTableRef.fnAddData(items, false);
    		});
    		modelerApp.mTableRef.fnDraw(true);
    		modelerApp.constant.mTableRows.find("tr:last td:eq(2)").find('span.dropdown').addClass('dropup');
    		$(modelerApp.constant.mPopover).popover({html: true});
    		$(modelerApp.constant.mPopup).popover();
    		modelerApp.constant.mTableLenObj.addClass('pull-left col-sm-5');
    		modelerApp.constant.mTableLenObj.after($("#webBasedModeler_info").detach());
    		
	    }else if (data.error_message)
        	showErrorNotification(data.error_message);
        modelerApp.list.postPopulate();
	},
	postPopulate : function(){
    	modelerApp.constant.mTableObj.find('thead tr th').removeClass("sorting_asc").removeClass("sorting");
    	modelerApp.constant.mTableObj.find('tr th input:first').prop('checked', false);
    	modelerApp.constant.mTableFilter.find('a').attr('onclick', 'javascript:modelerApp.list.getDiagrams()');
    	applyNiceScroll(modelerApp.constant.mTableWrapperObj.find('.table_container'), 215);
    	modelerApp.constant.mTableRows.find('td.dataTables_empty').text("No Diagram's found.");
    	removeLoading();
	}
}

modelerApp.filter = {
	filterDiagrams : function(value){
		addLoading(modelerApp.constant.mTableWrapperObj);
		value = value.replace(/\\/g, "\\\\\\");
		var data = {
			keyword: value
		};
		sendAjaxCall(intalio_bpms.modeler.filterDiagrams, "GET", false, true, "json", data, modelerApp.ajaxError.handleAE, function(data){
			if(data.diagrams && data.diagrams.length>0){
	    		var uuidArr=[],k=0;
	    		for(k;k<data.diagrams.length;k++){
	    			uuidArr.push(data.diagrams[k].diagramID);
	    		}
	 	  		modelerApp.comment.getAllCommentCount(uuidArr);
	 	  		modelerApp.diagramData = data;
 	  		}else{
 	  			modelerApp.mTableRef.fnClearTable();
  				modelerApp.mTableRef.fnFilter('');
  				$("#webBasedModeler_length").parent().addClass('hide');
 	  			modelerApp.list.postPopulate();
 	  		}
		});
	}
}

modelerApp.create = {
	preSave  : function(){
		modelerApp.constant.mModelerNameError.text('');
  		modelerApp.constant.mModelerName.val('');
  		modelerApp.constant.mModelerDesc.val('');
  		modalShow("modelerModal");
	},
	saveModeler : function(){
		var mName = modelerApp.constant.mModelerName.val(),
		mDesc = modelerApp.constant.mModelerDesc.val();
	  	modelerApp.constant.mModelerNameError.text('');
	  	if(mName){
	    	var regex = /^[A-Za-z0-9\-\_]+$/;
	    	if(!regex.test(mName))
	        	modelerApp.constant.mModelerNameError.text($('#alphanumericError').text());
	    	else{
	    		addLoading($('#modelerModal').find('.modal-body'));
	      		var saveData = {
	        		uuid: mName,
	        		description:mDesc,
	        		json: '{"resourceId":"'+mName+'","targetRecord":"e0b6cb54-b5cc-48c4-addd-23d6f02df082","properties":{"name":"","documentation":"","id":"","version":"","author":"","language":"English","namespaces":"","targetnamespace":"http://www.omg.org/bpmn20","expressionlanguage":"http://www.w3.org/1999/XPath","typelanguage":"http://www.w3.org/2001/XMLSchema","creationdate":"","modificationdate":""},"stencil":{"id":"BPMNDiagram"},"childShapes":[{"resourceId":"9382fffb-bb12-45cd-9fe9-d05fa3bf58f2","targetRecord":"e61e6411-8db8-45f4-828b-0ac72603ed30","properties":{"name":"","documentation":"","multiinstance":"","boundaryvisible":true,"processname":"","status":"None","adhoc":"","adhocordering":"Parallel","adhoccompletioncondition":"","suppressjoinfailure":"","enableinstancecompensation":"","processcategories":"","processdocumentation":"","processtype":"None","isclosed":"","department":"","owner":"","relatedto":"","project":"","task":"","product":"","service":""},"stencil":{"id":"Pool"},"childShapes":[],"outgoing":[],"bounds":{"lowerRight":{"x":945,"y":316},"upperLeft":{"x":15,"y":15}},"dockers":[]}],"bounds":{"lowerRight":{"x":1033,"y":549},"upperLeft":{"x":0,"y":0}},"stencilset":{"url":"bpmn2.0","namespace":"io_#"},"ssextensions":[]}',
	        		svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:wapama="http://www.wapama.net/diagram" id="d17309af-347d-4d61-b6be-583dcae661bf" width="988" height="359" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svg="http://www.w3.org/2000/svg" xmlns:x="http://ns.adobe.com/Extensibility/1.0" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0" xmlns:graph="http://ns.adobe.com/Graphs/1.0" viewBox="0 0 988 359"><defs/><g stroke="none" font-family="Verdana, sans-serif" font-size-adjust="none" font-style="normal" font-variant="normal" font-weight="normal" line-height="normal" font-size="12"><g class="stencils" transform="translate(14, 14)"><g class="me"/><g class="children"><g id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2" display="inherit"><g class="stencils" transform="translate(15, 15)"><g class="me"><g pointer-events="painted" id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2" title="Pool"><defs id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2_9382fffb-bb12-45cd-9fe9-d05fa3bf58f2_9"><radialGradient id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2background" cx="0%" cy="10%" r="100%" fx="20%" fy="10%"><stop offset="0%" stop-color="#ffffff" stop-opacity="1" id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2_9382fffb-bb12-45cd-9fe9-d05fa3bf58f2_10"/><stop id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2fill_el" offset="100%" stop-color="#ffffff" stop-opacity="1"/></radialGradient></defs><rect id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2c" wapama:resize="vertical horizontal" x="0" y="0" width="930" height="301" stroke="black" fill="none" display="inherit"/><rect id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2caption" wapama:anchors="left top bottom" x="0" y="0" width="30" height="301" stroke="black" stroke-width="1" fill="white" display="inherit"/><rect id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2captionDisableAntialiasing" wapama:anchors="left top bottom" x="0" y="0" width="30" height="301" stroke="black" stroke-width="1" fill="url(#9382fffb-bb12-45cd-9fe9-d05fa3bf58f2background) white" display="inherit"/><text x="10" y="150.5" font-size="12" id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2text_name" wapama:fittoelem="caption" wapama:align="middle center" wapama:anchors="left" wapama:rotate="270" fill="black" stroke="black" stroke-width="0pt" letter-spacing="-0.01px" text-anchor="middle" transform="rotate(270 10 150.5)" style="visibility: visible;" wapama:fontSize="12"/><g id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2multiInstance" display="none"><path wapama:anchors="bottom" fill="none" stroke="black" d=" M461.00000000000006 291  v8  M465.00000000000006 291  v8  M469.00000000000006 291  v8 " stroke-width="2" id="9382fffb-bb12-45cd-9fe9-d05fa3bf58f2_9382fffb-bb12-45cd-9fe9-d05fa3bf58f2_11"/></g></g></g><g class="children" style="overflow:hidden"/><g class="edge"/></g><g class="controls"><g class="dockers"/><g class="magnets" transform="translate(15, 15)"><g pointer-events="all" display="none" transform="translate(-8, 141.296)"><circle cx="8" cy="8" r="4" stroke="none" fill="red" fill-opacity="0.3"/></g><g pointer-events="all" display="none" transform="translate(455.45, 292)"><circle cx="8" cy="8" r="4" stroke="none" fill="red" fill-opacity="0.3"/></g><g pointer-events="all" display="none" transform="translate(921, 141.296)"><circle cx="8" cy="8" r="4" stroke="none" fill="red" fill-opacity="0.3"/></g><g pointer-events="all" display="none" transform="translate(455.45, -8)"><circle cx="8" cy="8" r="4" stroke="none" fill="red" fill-opacity="0.3"/></g><g pointer-events="all" display="none" transform="translate(455.45, 141.296)"><circle cx="8" cy="8" r="4" stroke="none" fill="red" fill-opacity="0.3"/></g></g></g></g></g><g class="edge"/></g></g></svg>',
	        		action: 'new'
	      		};
	      		sendAjaxCall(intalio_bpms.modeler.createModeler, "POST", false, true, "json", saveData, modelerApp.ajaxError.handleAE, this.postSave);
	    	}
	  	}else
	    modelerApp.constant.mModelerNameError.text($('#diagramNameError').text());
	},
	postSave : function(data){
		if(data.success_message)
        	showNotification(data.success_message);
    	else
        	showErrorNotification(data.error_message);
    	modalHide("modelerModal");
    	modelerApp.list.getDiagrams();
	}
}

modelerApp.share = {
	preShare : function(){
		modelerApp.permissionObj.clear();
		var columnsData = getSelectedRows(modelerApp.mTableRef, false);
    	if (columnsData.length <= 0)
        	showInformation($("#selectInfoMsg").text());
    	else{
    		$("#shareDiagramError").addClass('hide');
        	modalShow("shareDiagramModal");
        	addLoading(modelerApp.constant.mShareModal.find('.modal-body'));
        	this.getShareToData();
    	}
	},
	getShareToData : function(){
		var data = {},assignToData = {},roleData = {};
    	sendAjaxCall(intalio_bpms.task_filter.getAssignedToUsers, "GET", false, true, "json", data,modelerApp.ajaxError.handleAE,function(data) {
        	assignToData["peers"] = data.users.peers;
        	assignToData["subordinates"] = data.users.subordinates;
	        sendAjaxCall(intalio_bpms.task_filter.getAssignedToRoles, "GET", false, true, "json", roleData, modelerApp.ajaxError.handleAE, function(data) {
            	if(data.roles){
                	assignToData["externalRoles"] = data.roles.external_roles;
                	assignToData["internalRoles"] = data.roles.internal_roles;
                	for (var k = 0; k < assignToData.subordinates.length; k++) {
                    	$.each(assignToData.peers, function(key,value){
                        	if (value!=undefined && value.userID == assignToData.subordinates[k].userID)
                            	assignToData.peers.splice(key, 1);
                    	});
                	}
            	}
            	modelerApp.share.populateShareToData(assignToData);
        	});
    	});
	},
	populateShareToData : function(data){
		modelerApp.shareToObj.clearOptions();
		if(data){
	    	this.sharedToHelper(data.externalRoles,modelerApp.shareToObj,'external','roles');
	    	this.sharedToHelper(data.internalRoles,modelerApp.shareToObj,'internal','roles');
	    	this.sharedToHelper(data.subordinates,modelerApp.shareToObj,'subordinates','users');
	    	this.sharedToHelper(data.peers,modelerApp.shareToObj,'peers','users');
	    	removeLoading();
    	}
	},
	sharedToHelper : function(data,objRef,group,category){
    	for(var k=0;k<data.length;k++){
       		var selectId = data[k].userID ? data[k].userID+"~"+category : data[k]+"~"+category;
        	objRef.addOption({
            	id: selectId,
            	value: data[k].userName || data[k],
            	group: group
        	});
    	}
	},
	shareModeler : function(){
		var users=[],roles=[],i,shareTo=modelerApp.constant.mShareTo.val();
		if(shareTo && modelerApp.constant.mPermission.val()){
			var columnsData = getSelectedRows(modelerApp.mTableRef, "id");
			for(i=0;i<shareTo.length;i++){
				var splitData = shareTo[i].split('~');
				splitData[1].indexOf('roles') >= 0 ? roles[roles.length] = splitData[0] : users[users.length] = splitData[0];
			}
			var data = {
				action:modelerApp.constant.mPermission.val()[0],
				uuid:columnsData,
				users:users,
				roles:roles
			};
			addLoading($("#shareDiagramModal").find('.modal-body'));
			sendAjaxCall(intalio_bpms.modeler.shareModeler, "POST", false, true, "json", data,modelerApp.ajaxError.handleAE,function(data) {
				if(data.success_message){
					modalHide('shareDiagramModal');
					modelerApp.list.getDiagrams();
					showNotification(data.success_message);
				}
				else
					showErrorNotification(data.error_message);
				
			});
		}else
			$('#shareDiagramError').text($('#shareError').text()).removeClass('hide');
	},
	populateExistingPermission : function(){
		modelerApp.shareToObj.clear();
		if(getSelectedRows(modelerApp.mTableRef, "id").length===1 && modelerApp.constant.mPermission.val()){
			var selectedDiagram = getSelectedRows(modelerApp.mTableRef, "id");
			$.each(modelerApp.diagramData.diagrams,function(key,value){
				if(value["uuid"]===selectedDiagram[0]){
					var usersList = value["shared"][modelerApp.constant.mPermission.val()[0]]["users"];
					var rolesList = value["shared"][modelerApp.constant.mPermission.val()[0]]["roles"];
					$.each(usersList,function(key1,value1){
						console.log(value1.indexOf('~'));
						if(value1.indexOf('~')==-1)
							usersList[key1] =  value1+"~users";
					});
					$.each(rolesList,function(key2,value2){
						if(value2.indexOf('roles')==-1)
							rolesList[key2] =  value2+"~roles";
					});
					modelerApp.shareToObj.setValue($.merge(usersList,rolesList));
				}
			});
		}
	}
}

modelerApp.delete = {
	preDeleteModelers : function (){
		var columnsData = getSelectedRows(modelerApp.mTableRef, "id");
		if (columnsData.length <= 0)
        	showInformation($("#selectInfoMsg").text());
        else{
			  	modelerApp.diagramUUIDs = columnsData;
		        modalShow("deleteModelersModal");  
	        }
	},
	deleteModelers : function(){
		var data = {'uuid': modelerApp.diagramUUIDs};
    	sendAjaxCall(intalio_bpms.modeler.deleteModeler, "POST", false, true, "json", data, modelerApp.ajaxError.handleAE, this.postDelete);
	},
	postDelete : function(data){
		if (data.success_message)
        	showNotification(data.success_message);
     	else
        	showErrorNotification(data.error_message);
	    modalHide("deleteModelersModal");
	    modelerApp.list.getDiagrams();
	}
}

modelerApp.comment = {
	commentCountObj : "",
	preComment : function(obj,id,type){
		commentCountObj = $(obj).find('span');
		modelerApp.uuid=id;
    	modalShow("mDiagramCommentsModal");
    	$("#mDComment").focus().val("");
    	$('.commentError').addClass('hide');
    	addLoading($("#mDiagramCommentsModal").find('.modal-body'));
    	this.getComments();
    	parseInt(type)>1 || isSuperAdmin ? $("#mDiagramComments").next().removeClass('hide') : $("#mDiagramComments").next().addClass('hide');
	},
	addComment : function(){
		if($.trim($("#mDComment").val())){
        	$('.commentError').addClass('hide');
        	addLoading($('#mDiagramCommentsModal').find('.modal-dialog'));
        	var data = {
	            comment:$("#mDComment").val(),
	            createdBy:$('#userid').text(),
	            refCommentTypeId:73,
	            threadId:modelerApp.uuid
        	}
        	sendAjaxCall(intalio_bpms.task_metadata.addComments, "POST", false, true, "json", data, modelerApp.ajaxError.handleAE, function(response) {
            	$("#mDComment").val('');
            	if(response.result=="saved"){
                	modelerApp.comment.getComments();
                	showNotification($('#utCommentMsg').text());
                	commentCountObj.text(parseInt(commentCountObj.text())+1);
            	}else
                	showErrorNotification(response.result);
        	});
        }else
        	$('.commentError').text($('#commentError').text()).removeClass('hide');
	},
	getComments : function(){
		var mDCommentsRef = $('#mDiagramCommentsModal').find('div#mDiagramComments');
	    mDCommentsRef.css('max-height',$(window).height()-345);
	    var data ={moduleId:73,start:0,threadId:modelerApp.uuid};
	    sendAjaxCall(intalio_bpms.task_metadata.getComments, "GET", false, true, "json", data,modelerApp.ajaxError.handleAE, function(response) {
	        if(response.comments && response.comments.length >= 1){
	            mDCommentsRef.empty();
	            $.each(response.comments,function(key,value){
	                var commentTemplate = $("#taskCommentTemplate .profile-activity").clone();
	                commentTemplate.find('img').attr('src',intalio_bpms.user_preferences.user_image+"?user="+value.createdBy+"&date="+new Date());
	                commentTemplate.find('a.userName').attr('onclick','javascript:showUserProfile(this)').attr('user',value.createdBy);
	                if(value.createdByName)
	                    commentTemplate.find('a.userName').text(value.createdByName);
	                else
	                    commentTemplate.find('a.userName').text(value.createdBy);
	                commentTemplate.find('span.commentTime').text($.format.date(value.createdDate, userPreferences.dateFormat+userPreferences.hourFormat));
	                commentTemplate.find('div.comment').text(value.comment);
	                mDCommentsRef.prepend(commentTemplate);
	            });
	        }else
	            mDCommentsRef.html("<span>"+$('#uTCommentsMsg').text()+"</span>")
	        applyNiceScroll(mDCommentsRef);
	        $('#mDiagramComments').animate({
	            scrollTop: $('#mDiagramComments').get(0).scrollHeight
	        },1000);
	        removeLoading();
	    });
	},
	getAllCommentCount : function(ids){
		var data = {
			moduleId:73,
			threadId:ids
		}
		sendAjaxCall(intalio_bpms.social.getCommentsCount, "GET", false, true, "json", data, modelerApp.ajaxError.handleAE, function(data){
			modelerApp.commentCount  = data.counts;
			modelerApp.list.populateDiagrams(modelerApp.diagramData);
		});
	}
}

modelerApp.rImport = {
	markUnmarkImport : function(){
		var columnsData = getSelectedRows(modelerApp.mTableRef, "id");
		if (columnsData.length <= 0)
        	showInformation($("#selectInfoMsg").text());
        else		
			sendAjaxCall(intalio_bpms.modeler.markForImport, "POST", false, true, "json", {uuid:columnsData}, modelerApp.ajaxError.handleAE, function(data){
				if(data.success_message){
					showNotification(data.success_message);
					modelerApp.list.getDiagrams();
				}
				else if(data.error_message)
					showErrorNotification(data.error_message);
			});		
	}
};
modelerApp.init.intializeModeler();
modelerApp.constant.mTableObj.on('draw.dt', function() {
	$("#selectAll").prop("checked",false);	
	$(".checkbox").each(function(){
		$(this).prop("checked",false);
	});
});
		