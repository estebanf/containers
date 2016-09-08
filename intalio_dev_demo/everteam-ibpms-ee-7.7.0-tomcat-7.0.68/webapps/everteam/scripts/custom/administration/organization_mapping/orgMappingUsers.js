/* 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
*/

/* Default URLs used in users page */
var defaults = {
        roles_list: "orgMapping/roles/import",
        users_list: "orgMapping/roles/users/import",
        users_url: "orgMapping/users",
        users_import_url: "orgMapping/users/import",
        update_manager: "orgMapping/users/manager",
        update_subordinate: "orgMapping/users/subordinate",
        delete_user: "orgMapping/users/delete",
        last_sync: 'orgMapping/users/last_sync',
        sync_users: 'orgMapping/users/sync',
        get_logged_user_info: 'orgMapping/users/'
    }
    /* Jquery objects for chosen select */
var orgRolesSelectObj = $("#orgRolesSelect");
var orgUsersSelectObj = $("#orgUsersSelect");
var autoManagerUsers = []
var autoManager;
var expandUsersCheck = true;
var waitNo = 0;
var managerUpdateError = [];
var managerUpdateSuccess = [];
var importOrAddSubs = false;
/* Organisation Mapping Users functions object. Contains functions related to users page */
var ou = {
        users: {},
        listUsersData: {},
        tree: [],
        /* Sends ajax call to bring users from serer */
        fetchUsers: function() {
            var data = {};
            sendAjaxCall(defaults.users_url, "GET", false, true, "json", data, ou.ajaxError, ou.listUsers);
        },
        getStatus: function() {
            var data = {
                userID: $("#userid").text()
            };
            sendAjaxCall(defaults.get_logged_user_info, "GET", false, true, "json", data, ou.ajaxError, function(response) {
                if (response != undefined && response.userInfo != undefined)
                    ou.fetchUsers();
                else if (waitNo <= 1)
                    setTimeout(function() {
                        waitNo++;
                        ou.getStatus()
                    }, 2000);
                else
                    ou.fetchUsers();
            });
        },
        /* Populate users data from ajax call and make them draggable */
        listUsers: function(data) {
            $('#draggableUsers').empty().unbind().removeData('nestable');
            if (data.users != undefined && !isObjectEmpty(data.users)) {
                ou.listUsersData = data;
                data = ou.sortUsersData(data)
                var tree = ou.getUsersObj(data);
                ou.formUsers(tree, $('#draggableUsers'));
                autoManagerUsers = []
                $('.ace-popover').popover();
                if (ou.listUsersData.predefinedHierarchy == false) {
                    $('.dd').nestable({
                        maxDepth: 15
                    });
                    ou.tree = $('.dd').nestable('serialize');
                    $('.dd').on('change', function() {
                        ou.tree = $('.dd').nestable('serialize');
                    });
                    $('.user-submit').css('display', 'block');
                } else {
                    $('.user-submit').css('display', 'none');
                    $('.collpaseExpand').addClass('hide');
                }
                if (!expandUsersCheck)
                    collapseAllUsers();
                else
                    expandAllUsers();

            } else {
                var div = $('<div/>').addClass('dd-handle').text($('#usersDefineHierachy').text());
                var li = $('<li/>').addClass('dd-item');
                var ol = $('<ol/>').addClass('dd-list');
                $('#draggableUsers').append(ol.append(li.append(div)));
                $('.user-submit').css('display', 'none');
            }
            removeLoading($('#draggableUsers'));
        },
        /* forms single row of draggable div with delete and add subordinates*/
        formUsers: function(data, obj) {
            var ol = $('<ol/>');
            ol.addClass('dd-list');
            $.each(data, function(key, value) {
                if (value != undefined && value != null && value != 'null') {
                    var li = $('<li class="dd-item"></li>');
                    var id = value.userID //.replace('\\','_')
                    li.attr({
                        'data-id': id,
                        'data-name': value.displayName
                    });
                    var handle = $('<div class="dd-handle dd2-handle"></div>');
                    handle.append($('<i/>').addClass('normal-icon fa fa-user')).append($('<i/>').addClass('drag-icon fa fa-fullscreen bigger-125'))
                    var content = $('<div class="dd2-content"></div>')
                    content.html('<span class="item-name"><a class="noDecoration" onclick="javascript:showUserProfile(this)" user='+id+'>' + value.displayName + '</span>');
                    if (autoManagerUsers.indexOf(id) > -1 && ou.listUsersData.users[autoManager] != undefined) {
                        var warning = $('<i/>').addClass('fa fa-warning-circle orange iconCursor ace-popover');
                        warning.attr({
                            'data-placement': 'right',
                            'data-content': 'System assigned ' + ou.listUsersData.users[autoManager].displayName + ' as default manager',
                            'data-trigger': 'hover'
                        })
                        content.append($('<span/>').html('&nbsp;&nbsp;&nbsp;').append(warning));
                    }
                    var btn = $('<div/>').addClass('pull-right action-buttons');
                    var ai = $('<a/>').addClass('red iconCursor ace-popover user-option-icon');
                    ai.attr({
                        'data-placement': 'left',
                        'data-content': $('#usersDelete').text()+" "+value.displayName,
                        'data-trigger': 'hover'
                    });
                    ai.append($('<i/>').addClass('fa fa-trash-o'))
                    ai.on('click', function() {
                        var parentLi = $(this).closest('.dd-item');
                        var parentId = parentLi.attr('data-id');
                        parentId = parentId.replace('\\', '_');
                        modalShow('deleteUsersModal');
                        $('#delete-hierarchy').prop('checked', false);
                        $('#deleteUsersModal').find('.modal_heading').text('Delete '+value.displayName);
                        $('#deleteUsersModal').find('.modal-footer button').attr('onclick', 'ou.deleteUser("' + parentId + '");')

                        //confirmDelete($('#usersDeleteUser').text(), $('#usersDeleteUserConfirmation').text(), 'ou.deleteUser("' + parentId + '");')
                    })
                    var au = $('<a/>').addClass('blue iconCursor ace-popover user-option-icon');
                    au.attr({
                        'data-placement': 'left',
                        'data-content': $('#usersAddSubordinates').text() + " " + value.displayName,
                        'data-trigger': 'hover'
                    });
                    au.append($('<i/>').addClass('fa fa-plus-circle'));
                    au.on('click', function() {
                        var parentLi = $(this).closest('.dd-item');
                        var parentId = parentLi.attr('data-id');
                        parentId = parentId.replace('\\', '_')
                        showAddSubordinatesModal(parentId, this);
                    });
                    if (ou.listUsersData.predefinedHierarchy == false)
                        btn.append(au).append(ai);
                    else
                        btn.append(ai);
                    content.append(btn)
                    li.append(handle);
                    li.append(content);
                    var childs = value.children
                    if (childs != undefined && childs.length > 0) {
                        ou.formUsers(childs, li)
                    }
                    ol.append(li);
                }
            });
            $(obj).append(ol);
        },
        /* Forms users data into tree structure */
        getUsersObj: function(data) {
            var root = {},
                managers = {}
            managers['ROOT'] = []
            for (var key in data) {
                var item = data[key]
                if (item != null && item.managerID == null || item.managerID == 'null') {
                    root[key] = item
                    managers['ROOT'].push(item.userID)
                } else {
                    if (managers[item.managerID] != undefined)
                        managers[item.managerID].push(item.userID)
                    else
                        managers[item.managerID] = [item.userID]
                }
            }
            ou.users = managers
            var nroot = {}
            for (var key in root) {
                var item = root[key];
                nroot[key] = ou.formJson(root[key], data);
            }
            return nroot;
        },
        /* Upadtes Manager for one or multiple users */
        updateUser: function() {
            addLoading($('#draggableUsers'));
            var managers = {};
            managers = ou.formManager(ou.tree, managers);
            managers["ROOT"] = []
            for (var i = 0; i < ou.tree.length; i++) {
                managers['ROOT'].push(ou.tree[i].id);
            }
            mngrs = getDifference(ou.users, managers);
            ou.users = managers
            var nManagers = []
            for (var key in mngrs) {
                nManagers.push({
                    manager: key,
                    users: mngrs[key]
                })
            };
            var i = 0
            managerUpdateError = []
            managerUpdateSuccess = []
            nManagers = sortManagersBasedOnRoot(nManagers)
            ou.upadteDB(i, nManagers);
        },
        upadteDB: function(i, data) {
            if (i < data.length) {
                var manager = data[i].manager
                var users = data[i].users
                if (manager == 'ROOT')
                    manager = 'null'
                if (users.length != 0) {
                    var data1 = {
                        userID: users,
                        managerID: manager
                    }
                    sendAjaxCall(defaults.update_manager, "POST", false, true, "json", data1, ou.ajaxError, function(response) {
                        if (response.success_message != undefined) {
                            //showNotification(response.success_message)
                            managerUpdateSuccess.push(response.success_message)
                        } else {
                            //showErrorNotification(response.error_message);
                            managerUpdateError.push(response.error_message)
                        }
                        i += 1
                        ou.upadteDB(i, data)
                    });
                } else {
                    i += 1
                    ou.upadteDB(i, data)
                }
            } else {
                if (managerUpdateError.length > 0) {
                    if (managerUpdateError.length == data.length) {
                        showErrorNotification($('#updateManagerFail').text());
                        ou.fetchUsers();
                    } else {
                        showNotification($('#updateManagerPartial').text());
                        ou.fetchUsers();
                    }
                } else {
                    removeLoading($('#draggableUsers'));
                    showNotification($('#updateManagerSuccess').text());
                }
            }
        },
        /* Seperates users list from managers */
        formManager: function(data, managers) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item.children != undefined) {
                    var temp = []
                    var childs = item.children
                    for (var j = 0; j < childs.length; j++) {
                        temp.push(childs[j].id);
                    }
                    managers[item.id] = temp
                    managers = ou.formManager(childs, managers);
                }
            }
            return managers
        },
        /* forms childs tree of users */
        formJson: function(item, data) {
            var elm = item.subordinates
            elm = elm.sort()
            if (elm != undefined && elm.length > 0) {
                var children = []
                for (var i = 0; i < elm.length; i++) {
                    children.push(ou.formJson(data[elm[i]], data))
                }
                item.children = children
            }
            return item
        },
        sortUsersData: function(data) {
            var users = []
            var rObj = {}
            for (var key in data.users) {
                users.push(data.users[key].displayName)
            }
            users = users.sort()
            for (var i = 0; i < users.length; i++) {
                for (var key in data.users) {
                    var item = data.users[key]
                    if (users[i] == item.displayName)
                        rObj[key] = item
                }
            }
            return rObj;

        },
        /* Deletes selected user */
        deleteUser: function(id) {
            id = id.replace('_', '\\')
            var deleteHierarchy = $('#delete-hierarchy').prop('checked');
            if (id != undefined) {
                var data = {
                    userID: id,
                    deleteHierarchy: deleteHierarchy
                }
                $('#deleteUsersModal').modal('hide');
                addLoading($('#draggableUsers'));
                sendAjaxCall(defaults.delete_user, "POST", false, true, "json", data, ou.ajaxError, function(response) {
                    if (response.success_message != undefined) {
                        if (response.success_message.subordinates != undefined) {
                            showNotification('User ' + id + ' deleted successfully.');
                            autoManagerUsers = response.success_message.subordinates
                            autoManager = response.success_message.manager
                        } else
                            showNotification(response.success_message)
                    } else
                        showErrorNotification(response.error_message);
                    ou.fetchUsers();
                });

            }
        },
        /* will be called on ajax error */
        ajaxError: function(data) {

        }
    }
    /* Ready function for users page */
$(document).ready(function() {
    removeLoading();
    initUsers();
});

function initUsers() {
    setTimeout(function() {
        addLoading($('#draggableUsers'))
    }, 500)
    $('.user-submit').css('display', 'none');
    $(".users-search").val("");
    ou.getStatus();
    getSyncTime();
}

function getSyncTime() {
    //var data = {};
    sendAjaxCall(defaults.last_sync, "GET", false, true, "json", {}, ou.ajaxError,
        function(data) {
            if (data.last_sync != undefined) {
                var dateTime = $.format.date(data.last_sync, userPreferences.dateFormat+userPreferences.hourFormat);
                var nextSync = $.format.date(data.next_sync, userPreferences.dateFormat+userPreferences.hourFormat);
                $('#syncButton').attr('data-content', 'Last Sync Date: ' + dateTime + '</br>' +'Next Sync Date: ' + nextSync);
                var currentTime = new Date().getTime();
                if(Number(currentTime)>=Number(data.next_sync))
                    $('#syncButton').removeAttr("disabled");
                else
                    $('#syncButton').attr("disabled","disabled");
            }
        });
}
/* Shows modal for importing users */
function showImportModal() {
    importOrAddSubs = false
    addLoading($('#importUsersModal .modal-body'), true)
    getRoles();
    var modal = $('#importUsersModal')
    modal.find('.modal-footer button').attr('onclick', 'importSelectedUsers();').text('Import')
    modal.find('.modal_heading').text($('#imprtUsers').text());
    modal.find('.error-msg').addClass('hide');
    modalShow('importUsersModal');
}
var parentManagers = []
    /* Shows modal for adding subordinates for a particular user */

function showAddSubordinatesModal(id, obj) {
    parentManagers = []
    importOrAddSubs = true
    getParent($(obj).closest('ol'));
    addLoading($('#importUsersModal .modal-body'), true)
    getRoles();
    var modal = $('#importUsersModal')
    modal.find('.modal-footer button').attr('onclick', 'addSelectedUsers("' + id + '");').text('Add');
    modal.find('.modal_heading').text($('#usersAddSubordinates').text() + " " + $(obj).parent().prev().text());
    modal.find('.error-msg').addClass('hide');
    modalShow('importUsersModal');
}

function getParent(obj) {
    var id = $(obj).closest('.dd-item').attr('data-id');
    if (id != undefined && id != null) {
        parentManagers.push(id);
        if ($(obj).closest('ol').length > 0)
            getParent($(obj).parent().closest('ol'))
    }


}
/**
 * @Function Name   : getRoles
 * @Description     : get the list of roles from server
 * @param           :
 * @returns         :
 * */
function getRoles() {
    var data = {};
    sendAjaxCall(defaults.roles_list, "GET", false, true, "json", data, ou.ajaxError, populateRoles);
}

/**
 * @Function Name   : populateRoles
 * @Description     : populate roles to dom object
 * @param           : response data
 * @returns         :
 * */
function populateRoles(data) {
  if(data.error_message != undefined){
	showErrorNotification(data.error_message);
	removeLoading();
	modalHide("importUsersModal");
  }else{
    populateComboData("orgRolesSelect", data.roles, orgRolesSelectObj, true);
    removeLoading();
    updateUserCombo();
  }
}
/**
 * @Function Name   : updateUserCombo
 * @Description     : Updates user select list
 * @param           :
 * @returns         :
 * */
function updateUserCombo() {
    orgUsersSelectObj.empty().removeClass('chzn-done')
    $('#orgUsersSelect_chzn').remove();
    $('.importUsersTable tr:eq(1)').addClass('hide');
    $('.importUsersTable tr:eq(2)').addClass('hide');
    //orgUsersSelectObj.chosen();
}
/**
 * @Function Name   : importSelectedRoles
 * @Description     : it will call server to import specified roles in to local DB & returns the imported data
 * @param           :
 * @returns         :
 * */
function importSelectedUsers() {
    if (orgRolesSelectObj.val() == null || orgRolesSelectObj.val() == ""){
        $('#importUsersModal .error-msg').text($('#roleErrorMessage').text()).removeClass('hide');
        return false;
    }
    addLoading($('#draggableUsers'));
    var arr = orgUsersSelectObj.val();
    if (arr != null && arr.length > 0) {
        if (arr.indexOf('All') > -1) {
            var allUsers = []
            orgUsersSelectObj.find('option:gt(0)').each(function() {
                allUsers.push($(this).val());
            })
            var data = {
                userID: allUsers
            }
        } else {
            var data = {
                userID: orgUsersSelectObj.val()
            };
        }

    } else {
        var allUsers = []
        orgUsersSelectObj.find('option').each(function() {
            if ($(this).val() != 'All')
                allUsers.push($(this).val());
        })
        var data = {userID: allUsers}
    }
    if (data.userID.length > 0) {
        $('#importUsersModal').modal('hide');
        var timeout = 60000;
        if(data.userID.length > 150 && data.userID.length < 500)
            timeout = 1200000;
        else if(data.userID.length > 500 && data.userID.length < 1000)
            timeout = 1800000;
        sendAjaxCall(defaults.users_import_url, "POST", false, true, "json", data, ou.ajaxError, function(response) {
            if (response.success_message != undefined) {
                showNotification(response.success_message);
                ou.fetchUsers();
            } else{
                showErrorNotification(response.error_message);
                removeLoading();
            }
        },timeout);
    }else{
        removeLoading();
        $('#importUsersModal .error-msg').text($('#noUsersErrorMessage').text()).removeClass('hide');
    }
}

/* Adds selected users under a manager, If users are not imported first it will import and then it will call addManger */
function addSelectedUsers(manager) {
    if (orgRolesSelectObj.val() == null || orgRolesSelectObj.val() == "")
        $('#importUsersModal .error-msg').text($('#roleErrorMessage').text()).removeClass('hide');
    else if (orgRolesSelectObj.val() != null && orgRolesSelectObj.val().length > 0) {
        addLoading($('#draggableUsers'));
        var users = orgUsersSelectObj.val();
        var unImportedUsers = []
        var importedUsers = []
        if (users != null && users.indexOf('All') > -1 || users == null || users == "") {
            users = []
            orgUsersSelectObj.find('option').each(function() {
                if ($(this).val() != 'All')
                    users.push($(this).val());
            })
        }
        for (var key in ou.listUsersData.users) {
            importedUsers.push(key);
        }
        for (var i = 0; i < users.length; i++) {
            if (importedUsers.indexOf(users[i]) == -1)
                unImportedUsers.push(users[i]);
        }
        manager = manager.replace('_', '\\')
        if(users.length==0){
            removeLoading();
            $('#importUsersModal .error-msg').text($('#noUsersErrorMessage').text()).removeClass('hide');
            return false;
        }
        else if (unImportedUsers.length > 0) {
            var data = {
                userID: unImportedUsers
            };
            sendAjaxCall(defaults.users_import_url, "POST", false, true, "json", data, ou.ajaxError, function(response) {
                if (response.success_message != undefined) {
                    //showNotification(response.success_message)
                    if (users.indexOf(manager) != -1) {
                        var index = users.indexOf(manager)
                        users.splice(index, 1);
                    }
                    if (users.length > 0)
                        addUserManager(users, manager, $('#tree-hierarchy').prop('checked'));
                    else {
                        $('#importUsersModal .error-msg').text($('#usersDifferentManager').text()).removeClass('hide');
                        removeLoading($('#draggableUsers'));
                    }
                } else
                    showErrorNotification(response.error_message);
                //ou.fetchUsers();
            });
        } else {
            if (users.indexOf(manager) != -1) {
                var index = users.indexOf(manager)
                users.splice(index, 1);
            }
            if (users.length > 0)
                addUserManager(users, manager, $('#tree-hierarchy').prop('checked'));
            else {
                $('#importUsersModal .error-msg').text($('#usersDifferentManager').text()).removeClass('hide');
                removeLoading($('#draggableUsers'));
            }
        }
        $('#importUsersModal').modal('hide');
    }
}

/* Adds manager for selected users */
function addUserManager(users, manager, flag) {
    var data = {
        userID: users,
        managerID: manager,
        hierarchy: flag
    }
    sendAjaxCall(defaults.update_subordinate, "POST", false, true, "json", data, ou.ajaxError, function(response) {
        if (response.success_message != undefined) {
            showNotification(response.success_message);
            ou.fetchUsers();
        } else
            showErrorNotification(response.error_message);

    });

}

/* filter the users from search field text */
function applySearch(obj) {
    var text = $(obj).val().toLowerCase()
    if (text.length > 0) {
        expandAllUsers();
        $('#draggableUsers').find('li').each(function() {
            $(this).css('display', 'none');
            var id = $(this).attr('data-id')
            var oName = $(this).attr('data-name')
            var name = oName.toLowerCase();
            if (name.indexOf(text) > -1) {
                var index = name.indexOf(text)
                name = oName.substring(0, index) + "<span class='highlight'>" + oName.substring(index, index + text.length) + "</span>" + oName.substring(index + text.length);
                $(this).find('.item-name').html(name)
                removeHidden(this)
            } else {
                $(this).css('display', 'none');
                $(this).find('.item-name').html(oName)
            }
        });
    } else {
        $('#draggableUsers').find('li').each(function() {
            $(this).css('display', 'block');
            var name = $(this).attr('data-name');
            $(this).find('.item-name').html(name)
        });
        if (!expandUsersCheck)
            collapseAllUsers();
        else
            expandAllUsers();
    }
    if ($('#draggableUsers').find('li').length == $('#draggableUsers').find('li:hidden').length) {
        if ($('#draggableUsers .no-results').length == 0) {
            $('#draggableUsers').append($('<div class="no-results"/>').text($('#usersNoSearchResults').text()));
            $('.user-submit').css('display', 'none');
        }
    } else {
        $('#draggableUsers .no-results').remove();
        $('.user-submit').css('display', 'block');
    }
}

/* Filter parent elements, when a child is matched with text */
function removeHidden(obj) {
    $(obj).css('display', 'block');
    if ($(obj).parent().closest('li').length > 0)
        removeHidden($(obj).parent().closest('li'))
}
/**
 * @Function Name   : populateComboData
 * @Description     : get the roles from server
 * @param           :
 * @returns         :
 * */

function populateComboData(id, data, obj, flag) {
    removeChosen(id);
    var option;
    $('#' + id + ' option:not(:first)').remove();
    option = $('<option/>');
    if(!flag && !isObjectEmpty(data)){
		option.attr('value', "All").text("All");
		obj.append(option);
	}
    if (data != undefined) {
        $.each(data, function(key, value) {
            option = $('<option/>');
            if (!flag)
                option.attr('value', key).text(value);
            else
                option.attr('value', value).text(value);
            obj.append(option);
        });
    }
    obj.chosen();
    $("#" + id + '_chzn').css("width", 225);
    $("#" + id + '_chzn').find('.search-field input').css('width', '200px');
}
/**
 * @Function Name   : getSelectedUsers
 * @Description     : Get users of selected roles
 * @param           :
 * @returns         :
 * */
function getSelectedUsers() {
    var data = {},
        allRoles = [];
    $('#importUsersModal .error-msg').text("").addClass('hide');
    if (orgRolesSelectObj.val() != null && orgRolesSelectObj.val().length > 0) {
        if ($.inArray("All", orgRolesSelectObj.val()) == -1)
            data = {
                roleID: orgRolesSelectObj.val()
            };
        else {
            orgRolesSelectObj.find('option:gt(0)').each(function() {
                allRoles.push($(this).val());
            });
            data = {
                roleID: allRoles
            };
        }
        sendAjaxCall(defaults.users_list, "GET", false, true, "json", data, ou.ajaxError, populateUsersdata);
    } else {
        removeChosen("orgUsersSelect");
        updateUserCombo();
    }
}

/**
 * @Function Name   : populateUsersdata
 * @Description     : Populates users
 * @param           :
 * @returns         :
 * */
function populateUsersdata(data) {
    var users = data.roleInfo
    if (importOrAddSubs) {
        /*var na = users
        for (var j = 0; j < parentManagers.length; j++) {
            if (users.indexOf(parentManagers[j]) != -1) {
                na.splice(users.indexOf(parentManagers[j]), 1)
            }
        }
        users = na*/
        $('#tree-hierarchy').prop('checked', false)
        $('.importUsersTable tr:eq(2)').removeClass('hide');
    }
    populateComboData("orgUsersSelect", users, orgUsersSelectObj, false);
    $('.importUsersTable tr:eq(1)').removeClass('hide');
}

function collapseAllUsers(obj) {
    var list = $('.dd')
    list.find('.collapseUser').each(function() {
        $this = $(this);
        $this.css('display', 'none');
        $this.siblings('.expandUser').css('display', 'block');
        $this.siblings('.dd-list').css('display', 'none');
    });
    $(obj).attr('onclick', 'expandAllUsers(this);').html('<i class="fa fa-plus-square"></i> ' + $('#usersExpandAll').text());
    expandUsersCheck = false
}

function expandAllUsers(obj) {
    var list = $('.dd')
    list.find('.expandUser').each(function() {
        $this = $(this);
        $this.css('display', 'none');
        $this.siblings('.collapseUser').css('display', 'block');
        $this.siblings('.dd-list').css('display', 'block');
    });
    $(obj).attr('onclick', 'collapseAllUsers(this);').html('<i class="fa fa-minus-square"></i> ' + $('#usersCollapseAll').text());
    expandUsersCheck = true
}

/**
 * @Function Name   : validateUserSelection
 * @Description     : Checks if user is selected atleast one user or not
 * @param           :
 * @returns         :
 * */
function validateUserSelection() {
    if (orgUsersSelectObj.val() != null && orgUsersSelectObj.val().length > 0)
        $('#importUsers').removeAttr("disabled");
    else
        $('#importUsers').attr("disabled", true);
}

function getDifference(json1, json2) {
    var re = {};
    for (var key in json2) {
        if (json1[key] != undefined && compareArrays(json1[key], json2[key])) {
            re[key] = []
        } else if (json1[key] != undefined) {
            var nArr = []
            for (var i = 0; i < json2[key].length; i++) {
                if ($.inArray(json2[key][i], json1[key]) == -1)
                    nArr.push(json2[key][i])
            }
            re[key] = nArr;
        } else
            re[key] = json2[key]
    }
    return re
}
// attach the .equals method to Array's prototype to call it on any array
function compareArrays(array1, array2) {
    // if the other array is a falsy value, return
    if (!array2)
        return false;

    // compare lengths - can save a lot of time 
    if (array1.length != array2.length)
        return false;

    for (var i = 0, l = array1.length; i < l; i++) {
        // Check if we have nested arrays
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!array1[i].equals(array2[i]))
                return false;
        } else if (array1[i] != array2[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

function sortManagersBasedOnRoot(arr){
    var index;
    var val;
    for (var i = 0; i < arr.length; i++){
        if (arr[i].manager == 'ROOT'){
            index = i
            val = arr[i]
            break;
        }
    }
    if (index != null && val != null){
        arr.splice(index, 1);
        arr.unshift(val);
    }
    return arr;
}



