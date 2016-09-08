/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

function showInstanceData(iid, name, state, failuresCnt) {
    $('#scopeVariableData').find('.modal_heading').text('Data: ' + name);
    $('#scopeVariableDataBody .tab-pane').css('max-height', $(window).height() - 253)
    var data = {};
    sendAjaxCall(defaults.commonInstancesUrl + "/" + iid + "/data", "GET", false, true, "json", data, handleInstancesAjaxError, function(response) {
        populateScopeTree(response, iid, state, parseInt(failuresCnt));
    });
}


/**
 * @Function Name   : populateScopeTree
 * @Description     : This method is use to populate scope tree.
 * @param           :
 * @returns         :
 * */
function populateScopeTree(data, iid, state, failuresCnt) {
    displayVariableList();
    var parScopeId;
    $("#scopeTree").empty();
    if (data.scopeTree.length > 0) {
        formSourceTree(data.scopeTree, $('#scopeTree'), iid);
        $('#scopeTree').find('.tree-folder-content').addClass('hide');
    }
    parScopeId = data.scopeTree['0'].attr['id'];
    populateVariableList(iid, data, parScopeId, state, failuresCnt);
    populatePartnerList(data);
    populateCorrelationSets(data);
    $('#scopeVariableData').find('.modal-dialog').css('width', $(window).width() * 0.9);
    $('#scopeVariableDataBody').find('.tab-pane div').css('height', $(window).height() - 170)
    modalShow('scopeVariableData');
}

/**
 * @Function Name   : populateVariableList
 * @Description     : This method is use to populate  variable list.
 * @param           :
 * @returns         :
 * */
function populateVariableList(iid, data, scopeId, state, failuresCnt) {
    $('#scopeVariableData').find("#variableInfo").empty();
    if (!isObjectEmpty(data.variableList)) {
        var html = "<table>";
        $.each(data.variableList, function(key, value) {
            html += "<tr><td><a href='#' class='noDecoration' onclick=javascript:getVariableXmlData('" + iid + "','" + scopeId + "','" + value.varName + "','" + state + "','" + failuresCnt + "');>" + value.varName + "</a></td></tr>"
        });
        html += "</table>";
        $('#scopeVariableData').find("#variableInfo").append(html);
    } else
        $('#scopeVariableData').find("#variableInfo").append($('#noVariables').text());
    removeLoading();
}

/**
 * @Function Name   : populatePartnerList
 * @Description     : This method is use to populate partner list.
 * @param           :
 * @returns         :
 * */
function populatePartnerList(data) {
    $('#scopeVariableData').find("#partnerInfo").empty();
    if (data.partnerList.length > 0) {
        var html = "<table>";
        $.each(data.partnerList, function(key, value) {
            html += "<tr><td>" + $('#partnerLink').text() + "</td><td>&nbsp;&nbsp;" + value['partnerLink'] + "</td></tr><tr><td>" + $('#partnerRole').text() + "</td><td>&nbsp;&nbsp;" + value['partnerRole'] + "</td></tr>"
        });
        html += "</table>"
        $('#scopeVariableData').find("#partnerInfo").append(html);
    } else
        $('#scopeVariableData').find("#partnerInfo").append($('#noParterLinks').text());
}

/**
 * @Function Name   : populateCorrelationSets
 * @Description     : This method is use to populate correlation set.
 * @param           :
 * @returns         :
 * */
function populateCorrelationSets(data) {
    $('#scopeVariableData').find("#correlationInfo").empty();
    if (data.correlationList.length > 0) {
        var html = "<table>";
        $.each(data.correlationList, function(key, obj) {
            html += "<tr class='thick'><td>Name</td><td>&nbsp;&nbsp;" + obj.name.charAt(0).toUpperCase() + obj.name.slice(1) + "</td></tr>";
            $.each(obj.properties, function(key, value) {
                html += "<tr><td>Property Name</td><td>&nbsp;&nbsp;" + value.name + "</td></tr>";
                html += "<tr><td>Property Value</td><td>&nbsp;&nbsp;" + value.value + "</td></tr>";
            });
        });
        html += "</table>"
        $('#scopeVariableData').find("#correlationInfo").append(html);
    } else
        $('#scopeVariableData').find("#correlationInfo").append($('#noCorrelation').text());
}

/**
 * @Function Name   : displayVariableList
 * @Description     : This method is use to display variable list.
 * @param           :
 * @returns         :
 * */
function displayVariableList() {
    $('#leftPane').removeClass('hide');
    $('#rightPane').removeClass('hide');
    $(".CodeMirror").remove();
    $('#variableXml').text("");
    $('#xmlSpan').addClass('hide');
    $('#scopeVariableData').find('.modal-footer').addClass('hide');
    $('#updateVariableBtn').addClass('hide');
    $('#editVariableBtn').removeClass('hide');
    if (currentInstanceName != null && currentInstanceName != undefined)
        $('#scopeVariableData').find('.modal_heading').text(currentInstanceName);
}
/**
 * @Function Name   : showTreeView
 * @Description     : This method is use to show  tree view.
 * @param           :
 * @returns         :
 * */
function showTreeView(obj) {
    var treeFolder = $(obj).closest('.tree-folder');
    if ($(treeFolder).find('.tree-folder-content').length > 0) {
        $(treeFolder).find('> .tree-folder-content').toggleClass('hide');
        if ($(obj).hasClass('fa fa-folder')) {
            $(obj).removeClass('fa fa-folder');
            $(obj).addClass('fa fa-folder-open');
        } else {
            $(obj).removeClass('fa fa-folder-open');
            $(obj).addClass('fa fa-folder');
        }
    }
}

/**
 * @Function Name   : formSourceTree
 * @Description     : This method is use to form source tree.
 * @param           :
 * @returns         :
 * */
function formSourceTree(ListOfData, divElm, insId) {
    $.each(ListOfData, function(key, value) {
        var treeTemp = $('#scopeTreeTemplate').clone();
        $(treeTemp).removeAttr('id');
        $(treeTemp).find('.tree-folder-name').text(value.data).attr('onclick', 'javascript:getVariableData(' + value.attr['id'] + ',' + insId + ')');
        if (isObjectEmpty(value.children)) {
            $(treeTemp).find('.tree-folder-content').remove();
            $(treeTemp).find('.tree-folder-header i').removeClass('fa fa-folder').addClass('fa fa-file-text')
            $(divElm).append(treeTemp);
        } else {
            $(treeTemp).find('.tree-folder-content').attr('id', 'subTree' + value.attr['id']);
            $(divElm).append(treeTemp);
            formSourceTree(value.children, $('#subTree' + value.attr['id']), insId);
        }
    })
}

/**
 * @Function Name   : updateVariableData
 * @Description     : This method is use to update variable xml data.
 * @param           :
 * @returns         :
 * */
function updateVariableData(iid, scopeId, varName, state, failureCnt) {
    try {
        $.parseXML(editor.getValue());

    } catch (e) {
        $('#xmlSpan .parseXMLError').text("There is an error occurred while parsing xml data please recheck");
        return false;
    }
    var old_xml_data = editor.getTextArea().value;
    var data = {
        variableData: editor.getValue(),
        oldVariableData: old_xml_data
    };
    sendAjaxCall(defaults.commonInstancesUrl + "/" + iid + "/scopes/" + scopeId + "/variables/" + varName, "POST", false, true, "json", data, handleInstancesAjaxError, function(response) {
        if (response.success_message != undefined && response.success_message != null)
            showNotification(response.success_message);
        else if (response.error_message != undefined && response.error_message != null)
            showErrorNotification(response.error_message);
        getVariableXmlData(iid, scopeId, varName, state, failureCnt);
    });
}

/**
 * @Function Name   : editVariableData
 * @Description     : This method is use to edit variable xml data.
 * @param           :
 * @returns         :
 * */
function editVariableData() {
    $(".CodeMirror").remove();
    $('#editVariableBtn').addClass('hide');
    $('#updateVariableBtn').removeClass('hide');
    editor = new CodeMirror.fromTextArea(document.getElementById("variableXml"), {
        mode: 'text/html',
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true
    });
}
/**
 * @Function Name   : getVariableXmlData
 * @Description     : This method is use to get variable xml data.
 * @param           :
 * @returns         :
 * */
function getVariableXmlData(iid, scopeId, varName, state, failuresCnt) {
    var data = {};
    sendAjaxCall(defaults.commonInstancesUrl + "/scopes/" + scopeId + "/variables/" + varName, "GET", false, true, "json", data, handleInstancesAjaxError, function(response) {
        $('#leftPane').addClass('hide');
        $('#rightPane').addClass('hide');
        $(".CodeMirror").remove();
        $('#variableXml').text("");
        $('#variableXml').text($.trim(response.variable.replace(new RegExp("\\><", "gm"), ">\n<")));
        $('#xmlSpan').removeClass('hide');
        currentInstanceName = $('#scopeVariableData').find('.modal_heading').text();
        $('#scopeVariableData').find('.modal_heading').text('Variable: ' + varName);
        new CodeMirror.fromTextArea(document.getElementById("variableXml"), {
            mode: 'application/xml',
            lineWrapping: true,
            readOnly: true,
            tabMode: "indent",
            indentUnit: 5
        });
        applyNiceScroll($('#xmlScrolling'), 280);
        var errorOnly = response.errorOnly;
        $('#scopeVariableData').find('.modal-footer').removeClass('hide');
        $('#updateVariableBtn').addClass('hide');
        $('#editVariableBtn').addClass('hide');
        if (errorOnly != undefined && errorOnly == true && (failuresCnt > 0 || state == 'Failed')) {
            $('#editVariableBtn').removeClass('hide');
            $("#updateVariableBtn").attr('onclick', 'javascript:updateVariableData("' + iid + '","' + scopeId + '","' + varName + '","' + state + '","' + failuresCnt + '")');
        } else if (errorOnly != undefined && errorOnly == false) {
            $('#editVariableBtn').removeClass('hide');
            $("#updateVariableBtn").attr('onclick', 'javascript:updateVariableData("' + iid + '","' + scopeId + '","' + varName + '","' + state + '","' + failuresCnt + '")');
        }
    });
}

/**
 * @Function Name   : getVariableData
 * @Description     : This method is use to get variable data.
 * @param           :
 * @returns         :
 * */
function getVariableData(scopeId, iid, state, failuresCnt) {
    var data = {};
    addLoading($('#rightPane'),true)
    sendAjaxCall(defaults.commonInstancesUrl + "/" + iid + "/scopes" + "/" + scopeId + "/data", "GET", false, true, "json", data, handleInstancesAjaxError, function(response) {
        populateVariableList(iid, response, scopeId, state, failuresCnt);
        populatePartnerList(response);
        populateCorrelationSets(response);

    });
}
