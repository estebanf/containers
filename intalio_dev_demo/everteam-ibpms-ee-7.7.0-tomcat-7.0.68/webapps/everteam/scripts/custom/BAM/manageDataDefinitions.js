/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 * Author : Satish Kumar Pokala
 */

var adhocTemplateTable,dataDefinitionsOptions = {
    "bPaginate": false,
    "bInfo": false,
    "bFilter": true,
    "oLanguage": {
        "sSearch": ""
    },
    "bAutoWidth": false,
    "aaSorting": [
        [2, "desc"]
    ],
    "aoColumns": [{
        "bSortable": false,
        "sClass": "center"
    }, {
        "sWidth": width * 0.20,
        "bSortable": false,
        "sClass": "left"
    }, {
        "sWidth": width * 0.20,
        "bSortable": false,
        "sClass": "left"
    }, {
        "sWidth": width * 0.20,
        "bSortable": false,
        "sClass": "left"
    }, {
        "sWidth": width * 0.20,
        "bSortable": false,
        "sClass": "left"
    }, {
        "sWidth": width * 0.40,
        "bSortable": false,
        "sClass": "left"
    }]
};


function initiateAdhocTemplateTable() {
    if (adhocTemplateTable != undefined) {
        adhocTemplateTable.fnClearTable();
        adhocTemplateTable.fnDestroy();
    }
    adhocTemplateTable = $('#adhocTemplates').dataTable(dataDefinitionsOptions);
    $('#adhocTemplates').find('.dataTables_empty').html("Fetching Data Definition(s)...");
    customTable('adhocTemplates');
    var buttonHolder = $('#adhocTemplates_wrapper .tableButtons').empty();
    var buttons = ['addTemplate', 'grantAccess','delete','update']
    for (var i = 0; i < buttons.length; i++) {
        buttonHolder.append(getAdhocButtons(buttons[i]));
    }
    $('#adhocTemplates_wrapper .table_refresh_icon').attr('onclick', 'fetchTemplateReports();');
    showTemplatesModal();
}

function showTemplatesModal() {
    $('#manageTemplatesModal .modal-dialog').css({
        'width': $(window).width() - 40 + 'px',
        'margin-top': '0px'
    })
    $('#manageTemplatesModal .modal-body').css({'height': $(window).height() - 100 + 'px','overflow':'auto'})
    modalShow('manageTemplatesModal');
    fetchTemplateReports();
}

function fetchTemplateReports() {
    addLoading($('#adhocTemplates_wrapper'));
    sendAjaxCall(intalio_bpms.adhoc_reporting.get_templates, "GET", false, true, "json", {}, handleAdhocError, function(data){
        if(data.error_message!=undefined){
            removeLoading();
            $('#adhocTemplates').find('.dataTables_empty').html("No Data Definition(s) found...");
            showErrorNotification(data.error_message);
        }
        else
            formAdhocTemplateTable(data);
    });
}

function formAdhocTemplateTable(data) {
    adhocTemplateTable.fnClearTable();
    for (var i = 0; i < data.reports.length; i++) {
        var item = data.reports[i]
        var elms = []
        if (item.id != null)
            elms[elms.length] = "<label class='position-relative'><input type='checkbox' class='ace instanceSelected' id='instanceSelected' onclick='updateHeaderCheckbox(this);' value=" + item.id + "> <span class='lbl'></span></label>";
        if (item.name != null) {
            name = item.name;
            if (name.length < 20)
                elms[elms.length] = name;
            else
                elms[elms.length] = '<span title="' + name + '">' + name.slice(0, 20) + '...</span>'
        }
        if (item.description != null)
            elms[elms.length] = item.description;
        else
            elms[elms.length] = ''
        if (item.owner != null && item.owner.length != 0){
                var nameObj = [];
                if(data.users!=undefined && data.users.length>=0)
                    nameObj = $.grep(data.users, function(e){return e.id == item.owner});
                name = nameObj.length==1 ? nameObj[0].name : item.owner;
                elms[elms.length] = '<a class="noDecoration" user="'+item.owner+'" onclick=javascript:showUserProfile(this)>'+name+'</a>';
            }
        else
            elms[elms.length] = ''
        if (item.modified_on != null)
            elms[elms.length] = $.format.date(item.modified_on, userPreferences.dateFormat+userPreferences.hourFormat);
        else
            elms[elms.length] = ''
        if (item.accessors != null && item.accessors.users != null || item.accessors.roles != null) {
            var tempHtml = "";
            if (item.accessors.users != null && item.accessors.users.length > 0) {
                $.each(item.accessors.users, function(key, value) {
                    var nameObj = [];
                    if(data.users!=undefined && data.users.length>=0)
                        nameObj = $.grep(data.users, function(e){return e.id == value});
                    tempHtml += '&nbsp;<span class="nowrap"><a class="noDecoration" user="'+value+'" onclick=javascript:showUserProfile(this)>';
                        nameObj.length==1 ? tempHtml+='<i class="fa fa-user" title="'+nameObj[0].id+'"></i> '+nameObj[0].name+'</a></span>' : tempHtml += '<i class="fa fa-user" title="User"></i> ' + value + ' <a/></span>';
                    tempHtml += '<span class="wrap-line"> </span>';
                });
            }
            if (item.accessors.roles != null && item.accessors.roles.length > 0) {
                $.each(item.accessors.roles, function(key, value) {
                    tempHtml += '&nbsp;<span class="nowrap"><i class="fa fa-group" title="Role"></i> ' + value + '  </span><span class="wrap-line"> </span>';
                });
            }
            elms[elms.length] = tempHtml;
        } else
            elms[elms.length] = '';
        adhocTemplateTable.fnAddData(elms, false);
    }
    $('#templatesHeader th input:first').prop('checked', false);
    removeLoading($('#adhocTemplates_wrapper'));
    $('#adhocTemplates_wrapper').attr('type','template');
    adhocTemplateTable.fnDraw(true);
    $('#adhocTemplates').find('.dataTables_empty').html("No Data Definition(s) Found.");
}

function showUploadTemplate() {
    //modalHide("manageTemplatesModal");
    $("#addTemplateError").addClass("hide");
    $(".ace-file-input").find(".remove").click();
    modalShow('AddTemplatesModal');
}

function uploadAdhocTemplate() {
    var file = $('#reports-template').val();
    if (file == null || $.trim(file) == '') {
        $('#addTemplateError').text('Please select .rptdesign file.').removeClass('hide');
        return false;
    }
    if ($.trim(file).lastIndexOf('.rptdesign') == -1) {
        $('#addTemplateError').text('Please select only .rptdesign file.').removeClass('hide');
        return false;
    } else {
        addLoading($('#AddTemplatesModal .modal-body'));
        $('#addTemplateError').text('');
        $('#addTemplateForm').ajaxForm({
            success: function(data) {
                removeLoading();
                data = JSON.parse(data);
                if (data.error_message != undefined && data.error_message.indexOf("validation failed")!=-1){
                    showNotification($("#uploadSuccessMsg").text());
                    $('#AddTemplatesModal').modal('hide');
                    getDataSourcesToUpdate(data.definition_id,data);
                    $('#updateDataSource .modal-dialog').css({
                        'width':  '700px',
                        'margin-top': '0px',
                        'padding': '10px'
                    });
                    showErrorNotification(data.error_message);
                    fetchTemplateReports();
                }
                else if(data.error_message != undefined){
                    showErrorNotification(data.error_message); 
                }
                else{
                    $('#AddTemplatesModal').modal('hide');
                    showNotification($("#uploadSuccessMsg").text());
                    modalShow("manageTemplatesModal");
                    fetchTemplateReports();
                }
                return true;
            },
            error: function(e) {
                removeLoading();
                showErrorNotification(e);
            },
            dataType: "text"
        }).submit();
    }
}

function getDataSourcesToUpdate(id,errorData){
    $("#dataDefName").val("");
    $("#dataDefDescription").val("");
    $("#dataSourcesList").find('ul.nav-tabs').empty();
    $("#dataSourcesList").find('div.tab-content').empty();
    modalShow("updateDataSource");
    addLoading($('#updateDataSource .modal-body'));
    var url = intalio_bpms.adhoc_reporting.get_dataDef_meta_data.replace("{id}",id);
    sendAjaxCall(url, "GET", false, true, "json", {}, handleAdhocError, function(data){
        populateDataSources(data,id,errorData);
    });
}

function populateDataSources(data,dataDefinitionId,errorData){
    if(data.definition.name!=undefined)
        $("#dataDefName").val(data.definition.name);
    if(data.definition.description!=undefined)
        $("#dataDefDescription").val(data.definition.description);
    if(data.datasources.length>0){
        var navTabsobj = $("#dataSourcesList").find('ul.nav-tabs');
        var tabContentObj = $("#dataSourcesList").find('div.tab-content');
     for(var k=0;k<data.datasources.length;k++){
        tabContentObj.attr("id",dataDefinitionId);
            k===0 ? navTabsobj.append("<li class='active'><a data-toggle='tab' href='#datasources"+k+"'>"+data.datasources[k].name+"</a></li>") : navTabsobj.append("<li><a data-toggle='tab' href='#datasources"+k+"'>"+data.datasources[k].name+"</a></li>");
            k===0 ? tabContentObj.append("<div class='tab-pane active' id='datasources"+k+"'>") : tabContentObj.append("<div class='tab-pane' id='datasources"+k+"'>");
            $("#datasources"+k).append("<table class='table' id="+data.datasources[k].id+" style='width:100%'>");
            $.each(data.datasources[k],function(key,value){
                var tableObj = $("#datasources"+k).find('table');
                if(key!="id" && value!=null){
                    if(key=="name")
                        tableObj.append("<tr class='hide'><td><input type='text' value='"+value+"' id="+key+"></input></td></tr>") 
                    else if(key!="password")
                        tableObj.append("<tr><td>"+convertHeadingTypo(key)+"</td><td><input class='skipValidation' type='text' value='"+value+"' id="+key+" size='30'></input></td></tr>");
                    else if(key=="password")
                        tableObj.append("<tr><td>"+convertHeadingTypo(key)+"</td><td><input class='skipValidation' type='password' value='"+value+"' id="+key+" size='30'></input></td></tr>");
                }
                if(key!="id" && value==null){
                    if(key=="name")
                        tableObj.append("<tr class='hide'><td><input type='text' id="+key+"></input></td></tr>")
                    else if(key!="password")
                        tableObj.append("<tr><td>"+convertHeadingTypo(key)+"</td><td><input class='skipValidation' type='text' id="+key+" size='30'></input></td></tr>");
                    else if(key=="password")
                        tableObj.append("<tr><td>"+convertHeadingTypo(key)+"</td><td><input class='skipValidation' type='password' id="+key+" size='30'></input></td></tr>");
                }
            });
                
            $("#datasources"+k).append("</table>");
            $("#dataSourcesList").find('div.tab-content').append("</div>");
        }
    }
    highlightErrorDataSources(errorData);
    removeLoading();
}

function updateDataSources(){
    if($.trim($("#dataDefName").val())==""){
        $("#updateDataSourceErrMsg").text($("#nameErrorMsg").text()).removeClass("hide");
        return false;
    }
    else if($.trim($("#dataDefDescription").val())==""){
        $("#updateDataSourceErrMsg").text($("#descErrorMsg").text()).removeClass("hide");
        return false;
    }
    removeError();
    addLoading($('#updateDataSource .modal-body'));
    var datasources = [];
    var tabContentObj = $("#dataSourcesList div.tab-content");
    tabContentObj.find('table').each(function(){
        var tempObj          = {};
        tempObj.id           = $(this).attr("id");
        tempObj.name         = $(this).find("input#name").val();
        tempObj.jndi         = $(this).find("input#jndi").val();
        tempObj.url          = $(this).find("input#url").val();
        tempObj.username     = $(this).find("input#username").val();
        tempObj.password     = $(this).find("input#password").val();
        tempObj.driver_class = $(this).find("input#driver_class").val();
        datasources.push(tempObj);
    });
    var url = intalio_bpms.adhoc_reporting.update_data_source.replace("{id}",tabContentObj.attr("id"));
    var updateData = {
        data_sources : JSON.stringify(datasources),
        name:$("#dataDefName").val(),
        description:$("#dataDefDescription").val()
    };
    sendAjaxCall(url, "POST", false, true, "json", updateData, handleAdhocError, function(data){
        removeLoading();
        if(data.error_message!=undefined){
            showErrorNotification(data.error_message);
            highlightErrorDataSources(data);
        }
        else if(data.success_message){
            modalHide("updateDataSource");
            modalShow("manageTemplatesModal");
            fetchTemplateReports();
            showNotification($("#updateDataSourceSuccessMsg").text());    
        }
    },120000);
}

function removeError(){
    $("#updateDataSourceErrMsg").text("").addClass("hide");
}

function highlightErrorDataSources(data){
    if(data!=undefined && data!=""){
        $("#dataSourcesList").find("ul li a").removeClass('red');
        $("#dataSourcesList").find("ul li").removeClass("active");
        $("#dataSourcesList").find('div.tab-content div').removeClass('active');
        var errorDataSources = data.error_message.match(/'[^']*'/g);
        $("#dataSourcesList").find("ul li").each(function(){
            if(errorDataSources.toString().indexOf($(this).find('a').text())!=-1){
                $(this).find('a').addClass('red');
                if(!$("#dataSourcesList").find("ul li").hasClass('active'))
                    $(this).addClass("active");
                var id = $(this).find('a').attr("href");
                if(!$("#dataSourcesList").find('div.tab-content div').hasClass('active'))
                    $("#dataSourcesList").find('div.tab-content div'+id).addClass('active');
            }
        });
    }
}

function updateSource(){
    var selectedRecord = getSelectedRows(adhocTemplateTable,"id");
    if(selectedRecord.length==0)
        showInformation($("#selectUpdateMsg").text());
    else if(selectedRecord.length>1)
        showInformation($("#updateMultipleMsg").text());
    else{
        //$('#manageTemplatesModal').modal('hide');
        getDataSourcesToUpdate(selectedRecord[0],"");
        $('#updateDataSource .modal-dialog').css({
            'width':  '700px',
            'margin-top': '0px',
            'padding': '10px'
        });
    }
}
