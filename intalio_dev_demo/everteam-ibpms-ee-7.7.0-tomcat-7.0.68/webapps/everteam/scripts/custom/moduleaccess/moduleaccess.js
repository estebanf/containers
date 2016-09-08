/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


/** insertArray stores the data of module access to which user wants to add permission*/
var insertArray = [];

/** deleteArray stores the data of module access to which user wants to remove permission*/
var deleteArray = [];

/** childParentList stores the data of all childs for a particular parent*/
var childParentList = {};

var modulesPageObj = $("#modulesPage");

var pagesParentArray = [2,7,8,9,12,15,19,23,64]
/**
 * @Function Name   : ready
 * @Description     : jquery ready function for module access
 * @param           :
 * @returns         :
 * */
$(document).ready(function() {
    addLoading($('#modulesPage'));
    $("#rolesCombo").bind("change", function() {
        if ($("#rolesCombo").val() != 'select') {
            var data = {
                role: $("#rolesCombo").val()
            }
            sendAjaxCall("console/modules/access/role", "GET", false, true, "json", data, errorCall, populateAccess);
            $('#expandButton').removeClass('hide');
            $('#collapseButton').addClass('hide');
            collapseAll();
        } else {
            $('ol#module-list').addClass('hide');
            $('.updateButton').addClass('hide');
            $('#collapseButton').addClass('hide');
            $('#expandButton').addClass('hide');
        }
    });
    getRoles();
});

/**
 * @Function Name   : getRoles
 * @Description     : get all the existing roles
 * @param           :
 * @returns         :
 * */
function getRoles() {
    var data = {};
    sendAjaxCall(intalio_bpms.module_access.role_list, "GET", false, true, "json", data, errorCall, createOptions);
}

/**
 * @Function Name   : createOptions
 * @Description     : populate the roles to combo
 * @param           : data
 * @returns         :
 * */
function createOptions(data) {
  if((data.external_roles != undefined && data.external_roles.length > 0) || (data.internal_roles != undefined && data.internal_roles.length > 0)){
    var option;
    $('#rolesCombo option:not(:first)').remove();
    option = $('<option/>');
    option.attr('value', "").text("");
    $.each(data.external_roles, function(key, value) {
        option = $('<option/>');
        option.attr('value', value).text(value);
        $('#rolesCombo').append(option);
    });
    $.each(data.internal_roles, function(key, value) {
        option = $('<option/>');
        option.attr('value', value).text(value);
        $('#rolesCombo').append(option);
    });
    $('#rolesCombo').css('display', 'block');
    $('#rolesCombo').chosen();
    $('#rolesCombo_chzn').css('width', '260');
    $('.dd').css('max-width', 1140).css("width", "100%");
    if ($('#main-content').width() <= 1300)
        $('#rolesCombo_chzn').css('margin-right', $('#main-content').width() / 2 - 160);
    else
        $('#rolesCombo_chzn').css('margin-right', 1140 / 2 - 160);
    removeLoading($('#modulesPage'));
    getModules();
  } else if(data.error_message != undefined){
		showErrorNotification(data.error_message);
		removeLoading();
  }else
     removeLoading();
}

/**
 * @Function Name   : getModules
 * @Description     : get the modules list
 * @param           : data
 * @returns         :
 * */
function getModules() {
    var data = {};
    sendAjaxCall("console/modules", "GET", false, true, "json", data, errorCall, populateModulesList);
}

/**
 * @Function Name   : populateModulesList
 * @Description     : populates all the parent modules
 * @param           : data
 * @returns         :
 * */
function populateModulesList(data) {
    $('ol#module-list li').remove();
    $('ol#module-list').addClass('hide');
    if (data.module.length > 0) {
        $.each(data.module, function(key, value1) {
            if (value1.childrens.length <= 0)
                $('ol#module-list').append(getTemplate(false, value1.id, value1.name, 0));
            else if (value1.childrens.length > 0) {
                childParentList[value1.id] = value1.childrens;
                $('ol#module-list').append(getTemplate(true, value1.id, value1.name, 0));
                updateModuleList(value1.childrens, value1.id);
            }
        });

        /* this is for moving vaction and Business Rules module on top of administration module */
        $('#7').after($('#69').detach());
        $('#69').after($('#39').detach());
        /* this is for moving organization module up in administration module */
        $('#12').after($('#64').detach());
        $('#2').after($('#73').detach());
        /* end */
    }
}

/**
 * @Function Name   : updateModuleList
 * @Description     : populates the all the children elements
 * @param           : updateArray , id
 * @returns         :
 * */
function updateModuleList(updateArray, id) {
    $.each(updateArray, function(key, value) {
        if (value.childrens.length <= 0)
            $("ol#subList" + id).append(getTemplate(false, value.id, value.name, id));
        else if (value.childrens.length > 0) {
            childParentList[value.id] = value.childrens;
            $("ol#subList" + id).append(getTemplate(true, value.id, value.name, id));
            updateModuleList(value.childrens, value.id);
        }
    });
}

/**
 * @Function Name   : populateAccess
 * @Description     : updates the module list based on selected role
 * @param           : data
 * @returns         :
 * */
function populateAccess(data) {
    $('ol#module-list').find('.ace-switch').prop('checked', false);
    if (data.module.length > 0) {
        $.each(data.module, function(key, value) {
            $("li#" + value).find('.ace-switch:first').prop('checked', true);
        });
    }
    $('ol#module-list').removeClass('hide');
    $('.updateButton').removeClass('hide');
}

/**
 * @Function Name   : getTemplate()
 * @Description     : updates the html content & returns
 * @param           : caseid, id, module name
 * @returns         : html
 * */
function getTemplate(hasChild, id, module, parentId) {
    var html;
    if (hasChild == false) {
        html = $("#noChild li").clone();
        $(html).attr("id", id);
        if (getIcons("icon" + id).indexOf('fa fa-angle-double-right') >= 0)
            $(html).find('.noChildIcon').addClass(getIcons("icon" + id));
        else
            $(html).find('.noChildIcon').addClass(getIcons("icon" + id)).addClass("bigger-150");
        $(html).find('.moduleName').attr("id", "span" + id).text(module);
        $(html).find('.ace-switch').attr("onclick", "javascript:updateArray(this.checked," + id + "," + parentId + ")");
        return html;
    } else if (hasChild) {
        html = $("#hasChild li").clone();
        $(html).attr("id", id);
        if (getIcons("icon" + id).indexOf('fa fa-angle-double-right') >= 0)
            $(html).find('.hasChildIcon').addClass(getIcons("icon" + id));
        else
            $(html).find('.hasChildIcon').addClass(getIcons("icon" + id)).addClass("bigger-150");
        $(html).find('.icon').addClass("bigger-120 fa fa-angle-right");
        $(html).find('.moduleName').attr("id", "span" + id).text(module);
        $(html).find('.ace-switch').attr("onclick", "javascript:updateArray(this.checked," + id + "," + parentId + ")").attr("parentId", parentId);
        $(html).find('.accordion-toggle').attr("href", "#a" + id);
        $(html).find('.accordion-body').attr("id", "a" + id);
        $(html).find('.dd-list').attr("id", "subList" + id);
        $(html).find('.dd-list').attr("parentId", id);
        return html;
    }

}

/**
 * @Function Name   : updateArray
 * @Description     : updates the insert array / delete arrray when check event occurs
 * @param           : checked , element id , parent id
 * @returns         :
 * */
function updateArray(checked, id, parentId) {
    if (checked) {
        insertElements(id);
        if (childParentList[id] != undefined && childParentList[id].length > 0) {
            $.each(childParentList[id], function(key, value) {
                $("li#" + value.id).find('.ace-switch:first').prop('checked', true).trigger("onclick");
            });
        }
        setTimeout(function() {
            updateParents(parentId);
        }, 500);
    } else {
        deleteElements(id);
        if (childParentList[id] != undefined && childParentList[id].length > 0) {
            $.each(childParentList[id], function(key, value) {
                $("li#" + value.id).find('.ace-switch:first').prop('checked', false).trigger("onclick");
            });
        }
        if (pagesParentArray.indexOf(parseInt(parentId)) > -1 && childParentList[parentId] != undefined && childParentList[parentId].length > 0)
            updateAllParents(parseInt(parentId), false);
    }
}

function updateParents(parentId) {
    if (parentId != 0) {
        $("li#" + parentId).find('.ace-switch:first').prop('checked', true);
        insertElements(parentId);
        var selChildParent = $("li#" + parentId).parent().attr("parentId");
        if (selChildParent != undefined && selChildParent != null)
            updateParents(selChildParent);
    }
}

/**
 * @Function Name   : updateAllParents
 * @Description     : update the parent when all the children elements are unchecked
 * @param           : parentID
 * @returns         :
 * */
function updateAllParents(parentId) {
    if (childParentList[parentId] != undefined) {
        var childLength = childParentList[parentId].length;
        var childCount = 0;
        $.each(childParentList[parentId], function(key, value) {
            if ($("li#" + value.id).find('.ace-switch:first').prop('checked') == false)
                childCount++;
        });
        if (parseInt(childCount) == parseInt(childLength)) {
            deleteElements(parentId);
            $("li#" + parentId).find('.ace-switch:first').prop('checked', false);
            if ($("li#" + parentId).find('.ace-switch:first').attr("parentId").length > 0)
                updateAllParents(parseInt($("li#" + parentId).find('.ace-switch:first').attr("parentId")));
        }
    }
}

/**
 * @Function Name   : deleteElements
 * @Description     : delete the selected id from delete array
 * @param           : id
 * @returns         :
 * */
function deleteElements(id) {
    if ($.inArray(parseInt(id), deleteArray) == -1) {
        if ($.inArray(parseInt(id), insertArray) == -1) {
            deleteArray[deleteArray.length] = parseInt(id);
        } else {
            insertArray.splice($.inArray(parseInt(id), insertArray), 1);
            deleteArray[deleteArray.length] = parseInt(id);
        }
    }
}

/**
 * @Function Name   : insertElements
 * @Description     : delete the selected id from insert array
 * @param           : id
 * @returns         :
 * */
function insertElements(id) {
    if ($.inArray(parseInt(id), insertArray) == -1) {
        if ($.inArray(parseInt(id), deleteArray) == -1) {
            insertArray[insertArray.length] = parseInt(id);
        } else {
            deleteArray.splice($.inArray(parseInt(id), deleteArray), 1);
            insertArray[insertArray.length] = parseInt(id);
        }
    }
}

/**
 * @Function Name   : updateAccess
 * @Description     : updateAccess will call the server to update module access for a selected role
 * @param           :
 * @returns         :
 * */
function updateAccess() {
    if (insertArray.length > 0) {
        $.each(insertArray, function(key, val) {
            if (val != parseInt(10) && val != parseInt(11)) {
                var flag = true;
                $.each($('li#' + val).children(':nth-child(3)').find('.ace-switch'), function(key, value) {
                    if ($(this).prop('checked') == true) {
                        flag = false;
                    }
                });
                if (flag && childParentList[val] != undefined)
                    $("li#" + val).find('.ace-switch:first').prop('checked', false).trigger('onclick');
            }
        });
    }
    var data = {
        add_access: insertArray,
        remove_access: deleteArray,
        role: $("#rolesCombo").val()
    }
    sendAjaxCall("console/modules/role", "POST", false, true, "json", data, errorCall, successUpdateAccess);
    insertArray = [];
    deleteArray = [];
}

/**
 * @Function Name   : successUpdateAccess
 * @Description     : show the message of serverl call if any
 * @param           :
 * @returns         :
 * */
function successUpdateAccess(data) {
    showNotification(data.status);
}

function collapseAll() {
    $('#collapseButton').addClass('hide');
    $('#expandButton').removeClass('hide');
    $('#modulesPage').find('.fa fa-angle-down').removeClass('fa fa-angle-down').addClass('fa fa-angle-right');
    $('#module-list').find('.in').each(function() {
        $(this).removeClass('in').addClass('collapse');
    });
}

function expandAll() {
    $('#expandButton').addClass('hide');
    $('#collapseButton').removeClass('hide');
    $('#modulesPage').find('.fa fa-angle-right').removeClass('fa fa-angle-right').addClass('fa fa-angle-down');
    $('#module-list').find('.collapse').each(function() {
        $(this).addClass('in');
        $(this).animate({
            height: '100%'
        }, 300);
    });
}
/**
 * @Function Name   : errorCall
 * @Description     : handles the exception if any for ajax call
 * @param           :
 * @returns         :
 * */
function errorCall(exception) {
    showInformation(defaults.errorInGettingJSONData + exception.responseText);
    removeLoading('', true);
    return false;
}

/**
 * @Function Name   : function
 * @Description     : used for scroll up
 * @param           :
 * @returns         :
 * */
$('#btn-scroll-up').click(function() {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
});


defaults = {
    errorInGettingJSONData: "Error occurred in getting json data ",
    saveModuleState: "Update",
    nothingChanged: "Nothing has changed to update"
}
