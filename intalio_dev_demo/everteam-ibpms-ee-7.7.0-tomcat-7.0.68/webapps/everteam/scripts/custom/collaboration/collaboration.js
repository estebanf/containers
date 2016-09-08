/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


/** aday is a constant of total seconds in a day. */
var aday = 24 * 60 * 60;

/** ahour is constant of total seconds in an hour. */
var ahour = 60 * 60;

/** width is the current window width. */
var width = $(window).width();

/** currentPage specifies page currently on the window. */
var currentPage;

/** specifies the currently opened repository name. */
var currentRepoName;

/** specifies the currently opened project. */
var currentProject;

/** Specifies the currently opened Branch */
var currentBranch;

/** specifies index of path */
var pathIndex;

/**  List of complete paths that are opened */
var pathArray;

/**  List of paths that are opened  */
var folderArray = [];

/** previous SVG block object which is clicked before */
var previousSVGevt;

/** maximun number of commits to fetch each time */
var maxCommits = 6;

/** specifies the logged in user is Collaboration Admin or not */
var isCollabAdmin;

/** stores lock table datatable */
var lockTable;

/** stores branch table datatable */
var branchTable;

/** stores tag table datatable */
var tagTable;

var collabURLSeperator = '~'

/** stores the div of current document (or) comments */
var currentDocumentation;
var commitsCacheCheck;
var is_collab_module_clicked = true;
/** lock table default options */
var lockTableOptions = {
        "bPaginate": false,
        "bInfo": false,
        "bFilter": true,
        "oLanguage": {
            "sSearch": ""
        },
        "aoColumns": [{
            "bSortable": false,
            "sClass": "center",
            "sWidth": width * 0.025
        }, {
            "bSortable": true,
            "sClass": "alignLeft"
        }, {
            "bSortable": true,
            "sClass": "alignLeft"
        }, {
            "bSortable": true,
            "sClass": "alignLeft"
        }]
    }
    /** tag table default options */
var tagTableOptions = {
        "bPaginate": false,
        "bInfo": false,
        "bFilter": true,
        "oLanguage": {
            "sSearch": ""
        },
        "aoColumns": [{
            "bSortable": false,
            "sClass": "center",
            "sWidth": width * 0.025
        }, {
            "bSortable": true,
            "sClass": "alignLeft"
        }, {
            "bSortable": true,
            "sClass": "alignLeft"
        }, {
            "bSortable": true,
            "sClass": "alignLeft"
        }, {
            "bSortable": true,
            "sClass": "alignLeft"
        }, {
            "bSortable": false,
            "sClass": "center",
            "sWidth": width * 0.035
        }]
    }
    /**
     * @Function Name   : ready
     * @Description     : jquery ready function for collaboration page.
     * @param           :
     * @returns         :
     * */
$(document).ready(function() {
    var data = {};
    //adjustWidth();
    currentPage = "collaboration";
    addLoading($('#collab-container'));
    sendAjaxCall('collaboration/getCollabRoles', "GET", false, true, "json", data, errorCallCollaboration, function(data) {
        isCollabAdmin = data.collabAdmin;
        if (!data.collabAdmin)
            $('#ace-settings-container').remove();
    });
    var hash = window.location.hash
    if (hash != undefined && hash.split('?').length > 1) {
        var tempCache = getCollabParams();
        openProjectsPage(tempCache[0], tempCache);
        removeLoading($(), true);
    } else if (userCache != null && userCache != undefined && userCache.collaborationPage != null) {
        var tempCache = userCache.collaborationPage;
        tempCache = tempCache.split(collabURLSeperator);
        openProjectsPage(tempCache[0], tempCache,true);
        removeLoading($(), true);
    } else {
        setTimeout(function() {
            fetchCommits(0);
            fetchRepos();
        }, 500);
    }
    is_collab_module_clicked = true
    $('#repoName').unbind("keyup keypress").bind("keyup keypress", function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            createRepo();
            return false;
        }
    });
});
function getCollabParams(){
    var arr = []
    if (getParameterByName('repo') != null)
        arr.push(getParameterByName('repo'))
    if (getParameterByName('proj') != null)
        arr.push(getParameterByName('proj'))
    if (getParameterByName('branch') != null)
        arr.push(getParameterByName('branch'))
    return arr
}

function refreshCollaboration() {
    userCache.collaborationPage = null;
    $.jStorage.set($("#userid").text(), userCache);
    //$('#moduleID6 a').trigger('click');
    window.location.hash = '#'+getHashId('moduleID6');
}
/**
 * @Function Name   : adjustWidth
 * @Description     : adjusts the width of repositories according to window width
 * @param           :
 * @returns         :
 * */
function adjustWidth() {
    if ($('#sidebar').hasClass('h-sidebar'))
        var availableWidth = $(window).width()-20;
    else
        var availableWidth = $(window).width() - 220;
    var activitiesWidth = availableWidth * 0.35;
    if ($.browser.msie)
        var repositoriesWidth = availableWidth - activitiesWidth - 35;
    else
        var repositoriesWidth = availableWidth - activitiesWidth - 10;
    var repoWidth = (repositoriesWidth - 40) / 2;
    var infoboxWidth = (repoWidth - 20) / 2;
    $('#repositories').css('width', repositoriesWidth);
    $('#activitiesList').css('width', activitiesWidth);
    if (repositoriesWidth < 580) {
        $('.repository').css('width', 420);
        $('.infobox').css('width', 198);
    } else {
        $('.repository').css('width', repoWidth);
        $('.infobox').css('width', infoboxWidth);
    }
}
/**
 * @Function Name   : fetchCommits
 * @Description     : Fetches all the commits in all repositories.
 * @param           : staring value(number)
 * @returns         :
 * */
function fetchCommits(start) {
    var data = {
        start: start,
        max: maxCommits
    }
    sendAjaxCall('collaboration/fetchCommitsBasedOnTS', "POST", false, true, "json", data, errorCallCollaboration, function(data) {
        if (data.commitActivities.length == maxCommits)
            fetchCommitsSuccess(data, start + maxCommits);
        else
            fetchCommitsSuccess(data);
    });
}

/**
 * @Function Name   : fetchCommitsSuccess
 * @Description     : Sends the commits list to display accordingly.
 * @param           : success data
 * @returns         :
 * */
function fetchCommitsSuccess(data, endingNo) {
    if (data.commitActivities != undefined) {
        buildCommits(data.commitActivities, endingNo,data.user);
    } else if (data.error != undefined)
        showErrorNotification(data.error);
}

/**
 * @Function Name   : buildCommits
 * @Description     : Renders the commits to display in browser.
 * @param           : commits list
 * @returns         :
 * */
function buildCommits(commits, endingNo,users) {
    if (commitsCacheCheck)
        $('#commitsList').empty();
    if (commits.length > 0) {
        var now = new Date();
        $.each(commits, function(idx, commit) {
            var tempCommit = $('#commitTemplate').clone();
            $(tempCommit).removeAttr('id');
            var cDate = new Date(commit.commitedOn);
            //var repProject = '<a>' + commit.repoName + '</a>&nbsp;<i class="icon-angle-right"></i>&nbsp;' + commit.projectName ;
            var nameObj=[];
            if(users!=undefined && users!=null)
                nameObj = $.grep(users, function(e){return e.userID == commit.commitedBy});
            name = nameObj.length==1 ? nameObj[0].userName : commit.commitedBy;
            $(tempCommit).find('.commitUser').html('<a class="noDecoration" user="'+commit.commitedBy+'" onclick=javascript:showUserProfile(this)>'+name+'</a>');
            $(tempCommit).find('.commitTime').html('<i class="fa fa-time"></i> ' + differDates(now - cDate, 4));
            $(tempCommit).find('.commitMsg').text(commit.commitMessage);
            $(tempCommit).find('.repoNameCommit').html(commit.repoName);
            $(tempCommit).find('.repoNameCommit').attr('onclick', 'openProjectsPage("' + commit.repoName + '");');
            $(tempCommit).find('.projectNameCommit').html(commit.projectName);
            $(tempCommit).find('.projectNameCommit').attr('onclick', 'openCommitProjectPage("' + commit.repoName + '","' + commit.projectName + '");');
            $(tempCommit).find('.commentsId').attr('href', '#' + commit.commitId);
            $(tempCommit).find('.commentsId').attr('onclick', 'openFile("' + commit.commitId + '","projectComments");');
            $(tempCommit).find('.accordion-body').attr('id', commit.commitId);
            $('#commitsList').append(tempCommit);
        });
        if (endingNo != null && endingNo != undefined) {
            $('#commitsList').append('<div class="center" id="loadMoreCommits" ><a style="width:auto;" class="btn btn-primary btn-xs" onclick="refreshCommits(' + endingNo + ');return false;" href="#">' + $('#fmtloadMoreCommits').text() + '</a></div>');
        }
        applyNiceScroll($('#commitsList'), 165,false,true);
    } else {
        if (endingNo == null && endingNo == undefined && $('#commitsList').length == 0)
            $('#commitsList').append($('#fmtnoRecentActivities').text());
    }
    removeLoading($('#commitsList'));
}
/** 
 * @Function Name   : refreshCommits
 * @Description     : reload the commits from server.
 * @param           : starting value
 * @returns         :
 * */
function refreshCommits(start) {
    addLoading($('#commitsList'));
    commitsCacheCheck = false;
    if (start == 0)
        $('#commitsList').empty();
    else
        $('#loadMoreCommits').remove();
    if (currentPage == "collaboration") {
        fetchCommits(start);
    } else if (currentPage == "repository") {
        fetchRepoCommits(start);
    } else if (currentPage == "project") {
        fetchProjectCommits(start);
    } else if (currentPage == "branch") {
        fetchBranchCommits(start);
    }

}

function openCommitProjectPage(repName, proName) {
    currentRepoName = repName;
    openProject(proName);

}
/** 
 * @Function Name   : differDates
 * @Description     : Calculating the time difference for commits.
 * @param           : difference of present time and commit created time
 * @returns         : string indicating the time difference
 * */

function differDates(diff, check) {
    var dstring = '';
    var secs = Math.round(diff / 1000);
    if (secs > aday & check > 0) {
        var ndays = Math.round(secs / aday);
        dstring += ndays + ' day(s) ';
        secs = secs - aday * ndays;
    } else if (secs > ahour & check > 0) {
        var nhour = Math.round(secs / ahour);
        dstring += nhour + ' hour(s) ';
        secs = secs - ahour * nhour;
    } else if (secs > 60 & check > 0) {
        var nmins = Math.round(secs / 60)
        dstring += nmins + ' min(s) ';
        secs = secs - nmins * 60;
    }

    if (dstring.length != 0) {
        dstring += ' ago';
    } else {
        dstring += $('#justNow').text();
    }
    return dstring;
}

/**
 * @Function Name   : fetchRepos
 * @Description     : Fetches the repos from server.
 * @param           :
 * @returns         :
 * */
function fetchRepos() {
    var data = {};
    sendAjaxCall('collaboration/fetchRepositories', "POST", false, true, "json", data, errorCallCollaboration, fetchReposSuccess);
}

/**
 * @Function Name   : fetchReposSuccess
 * @Description     : Success function of fetchRepos.
 * @param           : success data
 * @returns         :
 * */
function fetchReposSuccess(data) {

    var now = new Date();
    $('#reposList').empty();
    $.each(data.repositories, function(idx, value) {
        var cDate = new Date(value.createdOn);
        //var repoName = idx.charAt(0).toUpperCase() + idx.slice(1);
        var repoName = value.repoName;
        var tempRepo = $('#repoTemplate').clone();
        $(tempRepo).removeAttr('id');
        $(tempRepo).attr('onclick', 'openProjectsPage("' + value.repoName + '");')
        $(tempRepo).find('.repoName').text(repoName);
        $(tempRepo).find('.totalProjects').text(value.projectCount);
        $(tempRepo).find('.createdDate').text(differDates(now - cDate, 2));
        var nameObj=[];
        if(data.user!=undefined && data.user!=null)
            nameObj = $.grep(data.user, function(e){return e.userID == value.createdBy});
        name = nameObj.length==1 ? nameObj[0].userName : value.createdBy;
        $(tempRepo).find('.totalCommits').text(name);
        $(tempRepo).find('.totalCollaborators').text(value.contributorCount);
        $('#reposList').append(tempRepo);
    });
    removeLoading($('#collab-container'));
}

function createRepoModalShow() {
    $("#repoName").val('');
    $('#empty_field').addClass('hide');
    modalShow('createRepo');
    setTimeout(function() {
        $('#repoName').focus();
        $('#repoName').select();
    }, 500);

}
/** 
 * @Function Name   : createRepo
 * @Description     : Creates a repo in the server.
 * @param           :
 * @returns         :
 * */

function createRepo() {
    var repoName = $("#repoName").val();
    repoName = $.trim(repoName);
    var data = {
        repoName: repoName
    }
    if (repoName != '') {
        if (/^[^\w\s]*$/gi.test(repoName)) {
            $('#empty_field').text('Only specical characters are not allowed');
            $('#empty_field').removeClass('hide');

        } else if (/^[\_]*$/gi.test(repoName)) {
            $('#empty_field').text('Please write valid name');
            $('#empty_field').removeClass('hide');
        } else {
            sendAjaxCall('collaboration/createRepository', "POST", false, true, "json", data, errorCallCollaboration, function(data1) {
                createRepoSuccess(data1, repoName);
            });
        }
    } else {
        $('#empty_field').text($('#fmtpleaseEnterRepository').text());
        $('#empty_field').removeClass('hide');
        $('#repoName').focus();
    }
}

/** 
 * @Function Name   : createRepoSuccess
 * @Description     : fetches the repo list.
 * @param           : success data , repository name
 * @returns         :
 * */

function createRepoSuccess(data, repo) {
    if (data.message != undefined) {
        showNotification(data.message);
        $("#repoName").val('');
        fetchRepos();
        $('#createRepo').modal('hide');
        $('#empty_field').addClass('hide');
    } else if (data.error != undefined) {
        $('#empty_field').text(data.error);
        $('#empty_field').removeClass('hide');
    }
}

/** 
 * @Function Name   : openProjectsPage
 * @Description     : Opens the list of projects in a repository page.
 * @param           : repoName(Repository Name)
 * @returns         :
 * */
function openProjectsPage(repoName, cacheData, hashCheck) {
    if (userCache != null && userCache != undefined && $("#userid").text() != "") {
        if (cacheData == undefined || cacheData == null) {
            userCache.collaborationPage = repoName;
            $.jStorage.set($("#userid").text(), userCache);
            updateHashUrl({repo:repoName}, false);
        } else if (hashCheck == true){ 
            updateHashUrl({repo:repoName}, false);
        }
    }
    is_collab_module_clicked = true
    currentPage = "repository";
    currentRepoName = repoName;
    addLoading($('#container1'));
    $('#reposList').empty();
    $('#commitsList').empty();
    $('#breadcrumbs ul.breadcrumb li:gt(0)').remove();
    $('#breadcrumbs ul.breadcrumb').append('<li><a class="noDecoration noUnderLine">' + repoName + '</a></li>'); //updates Breadcrumb
    $('#ace-settings-box').empty();
    var settingTemp = $('#ace_settings_template .ace_settings_list').clone();
    $(settingTemp).find('span.settingName').text($('#fmtdeleteCurrentRepository').text());
    $(settingTemp).find('a[data-toggle="modal"]').attr('href', '#collabDeleteConfirm');
    $(settingTemp).find('a[data-toggle="modal"]').attr('onclick', 'deleteFunction();');
    $('#ace-settings-box').append(settingTemp);
    fetchRepoCommits(0);
    if (cacheData != null && cacheData != undefined) {
        if (cacheData.length > 1) {
            commitsCacheCheck = true;
            openProject(cacheData[1], cacheData,hashCheck);
        } else {
            fetchProjects();
        }
    } else
        fetchProjects();
}
/** 
 * @Function Name   : deleteFunction
 * @Description     : deletes the current repository.
 * @param           :
 * @returns         :
 * */

function deleteFunction() {
    if (currentPage == "repository") {
        $('#collabDeleteConfirm').find('.modal_heading').text($('#fmtdeleteRepository').text());
        $('#collabDeleteConfirm').find('.deleteMessage').text($('#fmtsureToDeleteRepository').text());
        $('#collabDeleteConfirm').find('.deleteMessage').append('<br>' + $('#fmtDoUWantToContinue').text());
        $('#collabDeleteConfirm').find('.modal-footer button').attr('onclick', 'deleteRepo();');
    } else if (currentPage == "project") {
        $('#collabDeleteConfirm').find('.modal_heading').text($('#fmtdeleteProjects').text());
        $('#collabDeleteConfirm').find('.deleteMessage').text($('#fmtsureToDeleteProject').text());
        $('#collabDeleteConfirm').find('.modal-footer button').attr('onclick', 'deleteProject();');
    } else if (currentPage == "branch") {
        $('#collabDeleteConfirm').find('.modal_heading').text($('#fmtdeleteBranchHead').text());
        $('#collabDeleteConfirm').find('.deleteMessage').text($('#fmtsureToDeleteBranchCurrent').text());
        $('#collabDeleteConfirm').find('.modal-footer button').attr('onclick', 'deleteBranch();');
    }
}
/** 
 * @Function Name   : deleteRepo
 * @Description     : deletes the current repository.
 * @param           :
 * @returns         :
 * */
function deleteRepo() {
    var data = {
        repoName: currentRepoName
    }
    if (currentRepoName != '') {
        $('#collabDeleteConfirm').modal('hide');
        sendAjaxCall('collaboration/deleteRepository', "POST", false, true, "json", data, errorCallCollaboration, function(data) {
            if (data.message != undefined) {

                currentRepoName = '';
                if (userCache != null && userCache != undefined && $("#userid").text() != "") {
                    userCache.collaborationPage = null;
                    $.jStorage.set($("#userid").text(), userCache);
                }
                setTimeout(function() {
                    refreshCollaboration();
                }, 200);
                showNotification(data.message);
            } else if (data.error != undefined)
                showErrorNotification(data.error);
        });
    }
}
/** 
 * @Function Name   : deleteProject
 * @Description     : deletes the current Project.
 * @param           :
 * @returns         :
 * */
function deleteProject() {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject
    }
    sendAjaxCall('collaboration/deleteProject', "POST", false, true, "json", data, errorCallCollaboration, function(data) {
        if (data.message != undefined) {
            openProjectsPage(currentRepoName);
            showNotification(data.message);
        } else if (data.error != undefined)
            showErrorNotification(data.error);
    });
}

function deleteBranches(bol) {
    var branches = getSelectedRows(branchTable);
    if (!bol) {
        if (branches.length > 0) {
            $('#collabDeleteConfirm').find('.modal_heading').text($('#fmtdeleteBranchs').text());
            $('#collabDeleteConfirm').find('.deleteMessage').text($('#fmtsureToDeleteBranch').text());
            $('#collabDeleteConfirm').find('.modal-footer button').attr('onclick', 'deleteBranches(true);');
            modalShow('collabDeleteConfirm');
        } else {
            showInformation($('#collabSelectOneBranch').text());
        }
    } else {
        var branchArray = [];
        $.each(branches, function(idx, value) {
            branchArray[branchArray.length] = $(value[1]).text();
        });
        deleteBranch(branchArray)
    }
}
/** 
 * @Function Name   : deleteBranch
 * @Description     : deletes the current Branch.
 * @param           :
 * @returns         :
 * */
function deleteBranch(branch) {
    var branchArray = [currentBranch];
    var data = {
        repoName: currentRepoName,
        projectName: currentProject,
        branches: branchArray
    }
    if (branch != null & branch != undefined)
        data.branches = branch;
    sendAjaxCall('collaboration/deleteBranches', "POST", false, true, "json", data, errorCallCollaboration, function(data) {
        if (data.error == null) {
            if (branch != null & branch != undefined)
                fetchBranchs();
            else
                openProject(currentProject);
            showNotification(data.message);
        } else {
            showErrorNotification(data.error);
        }
    });
}

/** 
 * @Function Name   : fetchRepoCommits
 * @Description     : fetches commits for the currently opened repository.
 * @param           : starting value(number)
 * @returns         :
 * */
function fetchRepoCommits(start) {
    var data = {
        repoName: currentRepoName,
        projectName: "",
        commitedBy: "",
        start: start,
        max: maxCommits
    }
    sendAjaxCall('collaboration/searchCommit', "POST", false, true, "json", data, errorCallCollaboration, function(data) {
        if (data.searchCommits.length == maxCommits)
            buildCommits(data.searchCommits, start + maxCommits,data.user);
        else
            buildCommits(data.searchCommits,null,data.user);
    });
}

/** 
 * @Function Name   : fetchProjects
 * @Description     : fetches projects from currently opened repository.
 * @param           :
 * @returns         :
 * */
function fetchProjects() {
    var data = {
        repoName: currentRepoName
    }
    sendAjaxCall('collaboration/fetchProjects', "POST", false, true, "json", data, errorCallCollaboration, fetchProjectsSuccess);
}
/** 
 * @Function Name   : fetchProjectsSuccess
 * @Description     : fetchProjects success function.
 * @param           : success data
 * @returns         :
 * */
function fetchProjectsSuccess(data) {
    if (!isObjectEmpty(data.projects)) {
        var now = new Date();
        $.each(data.projects, function(idx, value) {
            var cDate = new Date(value.createdOn);
            var tempRepo = $('#repoTemplate').clone();
            $(tempRepo).removeAttr('id');
            $(tempRepo).attr('onclick', 'openProject("' + value.projectName + '");')
            $(tempRepo).find('.repoName').text(value.projectName);
            $(tempRepo).find('.totalProjects').text(value.branchCount);
            $(tempRepo).find('.totalProjects').next().text($('#collabBranches').text());
            $(tempRepo).find('.createdDate').text(differDates(now - cDate, 2));
            var nameObj=[];
            if(data.user!=undefined && data.user!=null)
                nameObj = $.grep(data.user, function(e){return e.userID == value.createdBy});
            name = nameObj.length==1 ? nameObj[0].userName : value.createdBy;
            $(tempRepo).find('.totalCommits').text(name)
            $(tempRepo).find('.totalCollaborators').text(value.contributorCount);
            $('#reposList').append(tempRepo);
        });
        removeLoading($('#container1'));
    } else {
        $('#reposList').append($('#fmtnoProjectIsSharedIntoRepository').text());
        removeLoading($('#container1'));
    }
}

/** 
 * @Function Name   : openProject
 * @Description     : Opens current project page.
 * @param           : current project
 * @returns         :
 * */
function openProject(project, cacheData,hashCheck) {
    if (userCache != null && userCache != undefined && $("#userid").text() != "" && userCache.collaborationPage != undefined) {
        if (cacheData == undefined || cacheData == null) {
            var tempCache = userCache.collaborationPage;
            tempCache = tempCache.split(collabURLSeperator).slice(0, 1);
            tempCache = tempCache.join(collabURLSeperator);
            userCache.collaborationPage = tempCache + collabURLSeperator + project;
            $.jStorage.set($("#userid").text(), userCache);
            updateHashUrl({repo:currentRepoName,proj:project}, false);
        } else if (hashCheck == true){
            updateHashUrl({repo:currentRepoName,proj:project}, false);
        }
    }
    is_collab_module_clicked = true
    
    currentPage = "project";
    currentProject = project;
    addLoading($('#container1'));
    $('#breadcrumbs ul.breadcrumb li:gt(0)').remove();
    $('#breadcrumbs ul.breadcrumb').append('<li><a class="noUnderLine " onclick=openProjectsPage("' + currentRepoName + '"); >' + currentRepoName + '</a></li>');
    $('#breadcrumbs ul.breadcrumb').append('<li><a class="noDecoration noUnderLine">' + project + '</a></li>');
    $('#ace-settings-box').empty();
    var settingTemp = $('#ace_settings_template .ace_settings_list').clone();
    $(settingTemp).find('span.settingName').text($('#fmtdeleteProject').text());
    $(settingTemp).find('a[data-toggle="modal"]').attr('href', '#collabDeleteConfirm');
    $('#ace-settings-box').append(settingTemp);
    $('#reposList').empty();
    $('#reposList').append($('#projectPage_Template').clone());
    $('#commitsList').empty();
    fetchProjectCommits(0);
    branchTable = $('#collabProjectBranch').dataTable(lockTableOptions);
    $('.dataTables_empty').html("Fetching branch(es)...");
    customTable('collabProjectBranch');
    adjustCollabTable('collabProjectBranch');
    $('#collabProjectBranch_filter').find('.table_refresh_icon').attr('onclick', 'fetchBranchs()').attr('title', 'Refresh');
    $('table#collabProjectBranch thead tr th').removeClass('sorting');
    tagTable = $('#collabProjectTags').dataTable(tagTableOptions);
    $('.dataTables_empty').html("Fetching tag(s)...");
    customTable('collabProjectTags');
    adjustCollabTable('collabProjectTags')
    $('#collabProjectTags_filter').find('.table_refresh_icon').attr('onclick', 'fetchTags()').attr('title', 'refresh');
    $('table#collabProjectTags thead tr th').removeClass('sorting');
    setTimeout(function() {
        if (isCollabAdmin) {
            $('#collabProjectTags_wrapper').find('.tableButtons').append('<a class="btn btn-sm btn-white" onclick="deleteTags();" href="#"><i class="fa fa-trash"></i>' + $("#fmtdeleteButton").text() + '</a>');
            $('#collabProjectBranch_wrapper').find('.tableButtons').append('<a class="btn btn-sm btn-white" onclick="deleteBranches();" href="#"><i class="fa fa-trash"></i>' + $('#fmtdeleteButton').text() + '</a>');
        }
    }, 2500);
    if (cacheData != null && cacheData != undefined) {
        if (cacheData.length > 2) {
            commitsCacheCheck = true;
            openBranchPage(cacheData[2], cacheData,hashCheck);
        } else
            fetchInfo();
    } else {
        fetchInfo();
    }
}
/** 
 * @Function Name   : adjustCollabTable
 * @Description     : Sets table alighment proper
 * @param           : table id
 * @returns         :
 * */
 function adjustCollabTable(id){
    var wrapper = $('#'+id).closest('.dataTables_wrapper')
    wrapper.find('.tableButtons').removeClass('col-sm-9').addClass('col-sm-8')
    wrapper.find('.searchBoxTasks').removeClass('col-sm-0').addClass('col-sm-4').css({'padding-right':'0px'})
 }

/** 
 * @Function Name   : fetchProjectCommits
 * @Description     : fetches from commits on the current project.
 * @param           : starting value(number)
 * @returns         :
 * */
function fetchProjectCommits(start) {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject,
        commitedBy: "",
        start: start,
        max: maxCommits
    }
    sendAjaxCall('collaboration/searchCommit', "POST", false, true, "json", data, errorCallCollaboration, function(data) {
        
         if (data.searchCommits.length == maxCommits)
            buildCommits(data.searchCommits,start + maxCommits,data.user);
        else
            buildCommits(data.searchCommits,null,data.user);
    });
}
/** 
 * @Function Name   : fetchInfo
 * @Description     : fetches information of current Project.
 * @param           :
 * @returns         :
 * */
function fetchInfo() {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject
    }
    sendAjaxCall('collaboration/fetchProjectInfo', "POST", false, true, "json", data, errorCallCollaboration, fetchInfoSuccess);
}

/** 
 * @Function Name   : fetchInfoSuccess
 * @Description     : fetches information of current Project.
 * @param           :
 * @returns         :
 * */
function fetchInfoSuccess(data) {
    if (data.description != null) {
        $('#description').empty();
        $('#description').append('<p>' + data.description + '</p>');
    }
    $('#contributors-list').empty();
    $.each(data.contributors, function(idx, value) {
        var div = $('<div/>').addClass('itemdiv memberdiv');
        var img = $('<img/>').attr('src',intalio_bpms.user_preferences.user_image+'?user='+value).attr({'height':'30','width':'30'});
        div.append($('<div/>').addClass('user').append(img));
        var nameObj=[];
        if(data.user!=undefined && data.user!=null)
            nameObj = $.grep(data.user, function(e){return e.userID == value});
        name = nameObj.length==1 ? nameObj[0].userName : value;
        div.append($('<div/>').addClass('body').append($('<div/>').append('<a class="noDecoration" user="'+value+'" onclick=javascript:showUserProfile(this)>'+name+'</a>')));
        //$('#contributors-list').append('<div class="itemdiv memberdiv"><div class="user"><img src="images/avatar2.png"></img></div><div class="body"><div>' + value + '</div></div></div>');
        $('#contributors-list').append(div)
    });
    removeLoading($('#container1'));
}

/** 
 * @Function Name   : fetchTags
 * @Description     : fetches list tags of current Project.
 * @param           :
 * @returns         :
 * */
function fetchTags() {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject
    }
    sendAjaxCall('collaboration/fetchTags', "POST", false, true, "json", data, errorCallCollaboration, fetchTagsSuccess);
}

/** 
 * @Function Name   : fetchTagsSuccess
 * @Description     : fetches list tags of current Project.
 * @param           :
 * @returns         :
 * */
function fetchTagsSuccess(data) {
    var now = new Date();
    tagTable.fnClearTable();
    $.each(data.tags, function(idx, source) {
        var cDate = new Date(source.createdOn);
        var items = [];
        items[items.length] = "<label class='position-relative'><input type='checkbox' class='ace taskSelected' onclick='updateHeaderCheckbox(this)';> <span class='lbl'></span></label>";
        items[items.length] = source.tagName;
        var nameObj=[];
        if(data.user!=undefined && data.user!=null)
            nameObj = $.grep(data.user, function(e){return e.userID == source.createdBy});
        name = nameObj.length==1 ? nameObj[0].userName : source.createdBy;
        items[items.length] = '<a class="noDecoration" user="'+source.createdBy+'" onclick=javascript:showUserProfile(this)>'+name+'</a>';
        items[items.length] = differDates(now - cDate, 2);
        items[items.length] = source.description;
        items[items.length] = '<span class="pull-right action-buttons"><a onclick=openFile("' + source.tagName + '","zipDownload"); href="#" title="Download tag files"><i class="fa fa-download"></i></a></span>';
        tagTable.fnAddData(items, false);
    });
    tagTable.fnDraw(true);
    $('#collabProjectTags thead tr th').removeClass("sorting_asc").removeClass("sorting");
    $('.dataTables_empty').html($('#noTagCreated').text());
}

function deleteTags(bol) {
    var tags = getSelectedRows(tagTable);
    if (!bol) {
        if (tags.length > 0) {
            $('#collabDeleteConfirm').find('.modal_heading').text($('#fmtdeleteTag').text());
            $('#collabDeleteConfirm').find('.deleteMessage').text($('#fmtsureToDeletetag').text());
            $('#collabDeleteConfirm').find('.modal-footer button').attr('onclick', 'deleteTags(true);');
            modalShow('collabDeleteConfirm');
        } else {
            showInformation($('#fmtpleaseSelectTag').text());
        }
    } else {
        var tagArray = [];
        $.each(tags, function(idx, value) {
            tagArray[tagArray.length] = value[1];
        });
        tagDelete(tagArray);
    }
}
/** 
 * @Function Name   : tagDelete
 * @Description     : Deletes the selected tag.
 * @param           : tagName
 * @returns         :
 * */
function tagDelete(tagName) {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject,
        tagNames: tagName
    }
    sendAjaxCall('collaboration/deleteTags', "POST", false, true, "json", data, errorCallCollaboration, function(data) {
        if (data.error == null) {
            fetchTags();
            showNotification(data.message)
        } else
            showInformation(data.error)
    });
}

/** 
 * @Function Name   : fetchBranchs
 * @Description     : fetches the list of branches in currently opened project.
 * @param           :
 * @returns         :
 * */
function fetchBranchs() {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject
    }
    sendAjaxCall('collaboration/fetchBranches', "POST", false, true, "json", data, errorCallCollaboration, fetchBranchsSuccess);
}
/** 
 * @Function Name   : fetchBranchsSuccess
 * @Description     : fetches the list of branches in currently opened project.
 * @param           :
 * @returns         :
 * */
function fetchBranchsSuccess(data) {
    var now = new Date();
    branchTable.fnClearTable();
    $.each(data.branches, function(idx, source) {
        var cDate = new Date(source.createdOn);
        var items = [];
        items[items.length] = "<label class='position-relative'><input type='checkbox' class='ace taskSelected' onclick='updateHeaderCheckbox(this)';> <span class='lbl'></span></label>";
        items[items.length] = '<a onclick=openBranchPage("' + idx + '"); class="noDecoration cursorPointer">' + idx + '</a>';
        var nameObj=[];
        if(data.user!=undefined && data.user!=null)
            nameObj = $.grep(data.user, function(e){return e.userID == source.createdBy});
        name = nameObj.length==1 ? nameObj[0].userName : source.createdBy;
        items[items.length] = '<a class="noDecoration" user="'+source.createdBy+'" onclick=javascript:showUserProfile(this)>'+name+'</a>';
        items[items.length] = differDates(now - cDate, 2);
        branchTable.fnAddData(items, false);
    });
    branchTable.fnDraw(true);
    $('#collabProjectBranch thead tr th').removeClass("sorting_asc").removeClass("sorting");

}

/** 
 * @Function Name   : editDescription
 * @Description     : Edits the description  of a project
 * @param           :
 * @returns         :
 * */
function editDescription() {
    var description = $("#description p").text();
    $("#description p").remove();
    if ($("#description textarea")[0] == undefined)
        $("#description").append("<textarea id='descriptionText' maxlength='400' id='form-field-8' class='form-control'>" + description + "</textarea><button onclick='javascript:updateDescription()'class='pull-right btn btn-primary btn-xs' type='button'>"+$('#updateBtn').text()+"</button>")
}

/** 
 * @Function Name   : updateDescription
 * @Description     : Updates the description  of a project
 * @param           :
 * @returns         :
 * */
function updateDescription() {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject,
        description: $("#descriptionText").val()
    }
    sendAjaxCall('collaboration/updateDescription', "POST", false, true, "json", data, errorCallCollaboration, updateDescriptionSuccess);
}
/** 
 * @Function Name   : updateDescriptionSuccess
 * @Description     : Updates the description  of a project
 * @param           :
 * @returns         :
 * */
function updateDescriptionSuccess(data) {
    if (data.error_message == null && data.error_message == undefined) {
        showNotification(data.message);
        fetchInfo();
    } else {
        showErrorNotification(data.error_message);
    }
}
/** 
 * @Function Name   : openBranchPage
 * @Description     : Opens the branch page containing sources & locks
 * @param           : branch(Branch Name)
 * @returns         :
 * */
function openBranchPage(branch, cacheData,hashCheck) {
    if (userCache != null && userCache != undefined && $("#userid").text() != "" && userCache.collaborationPage != undefined) {
        if (cacheData == undefined || cacheData == null) {
            var tempCache = userCache.collaborationPage;
            tempCache = tempCache.split(collabURLSeperator).slice(0, 2);
            tempCache = tempCache.join(collabURLSeperator);
            userCache.collaborationPage = tempCache + collabURLSeperator + branch;
            $.jStorage.set($("#userid").text(), userCache);
            updateHashUrl({repo:currentRepoName,proj:currentProject,branch:branch}, false, 2);
        } else if (hashCheck == true){
            updateHashUrl({repo:currentRepoName,proj:currentProject,branch:branch}, false, 2);
        }
    }
    is_collab_module_clicked = true
    currentPage = "branch";
    currentBranch = branch;
    addLoading($('#container1'));
    $('#breadcrumbs ul.breadcrumb li:gt(0)').remove();
    $('#breadcrumbs ul.breadcrumb').append('<li><a class="noUnderLine " onclick=openProjectsPage("' + currentRepoName + '"); >' + currentRepoName + '</a></li>');
    $('#breadcrumbs ul.breadcrumb').append('<li><a class="noUnderLine " onclick=openProject("' + currentProject + '"); >' + currentProject + '</a></li>');
    $('#breadcrumbs ul.breadcrumb').append('<li><a class="noDecoration noUnderLine">' + branch + '</a></li>');
    $('#ace-settings-box').empty();
    var settingTemp = $('#ace_settings_template .ace_settings_list').clone();
    $(settingTemp).find('span.settingName').text($('#fmtdeleteBranch').text());
    $(settingTemp).find('a[data-toggle="modal"]').attr('href', '#collabDeleteConfirm');
    $('#ace-settings-box').append(settingTemp);
    $('#reposList').empty();
    $('#reposList').append($('#branchPage_Template').clone());
    $('#commitsList').empty();
    fetchBranchCommits(0);
    fetchSourceFiles();
    lockTable = $('#lockFiles').dataTable(lockTableOptions);
    customTable('lockFiles');
    adjustCollabTable('lockFiles')
    $('#lockFiles_filter').find('.table_refresh_icon').attr('onclick', 'fetchLocks()').attr('title', 'Refresh');
    $('table#lockFiles thead tr th').removeClass('sorting');
    setTimeout(function() {
        if (isCollabAdmin)
            $('#lockFiles_wrapper').find('.tableButtons').append('<a class="btn btn-sm btn-white" onclick="unlockResources();" href="#"><i class="fa fa-unlock"></i>' + $('#fmtunlockButton').text() + '</a>');
    }, 2500);
}
/** 
 * @Function Name   : fetchSourceFiles
 * @Description     : Initialises the fetch sources function
 * @param           :
 * @returns         :
 * */
function fetchSourceFiles() {
    pathArray = [];
    pathIndex = 0;
    folderArray = [];
    fetchSources();
}
/** 
 * @Function Name   : fetchSources
 * @Description     : Fetches the source files of a project from server
 * @param           : path
 * @returns         :
 * */
function fetchSources(path) {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject,
        branch: currentBranch,
        path: path
    }
    sendAjaxCall('collaboration/fetchResources', "POST", false, true, "json", data, errorCallCollaboration, fetchSourcesSuccess);
}
/** 
 * @Function Name   : fetchSourcesSuccess
 * @Description     : Fetches the source files of a project from server
 * @param           :
 * @returns         :
 * */
function fetchSourcesSuccess(response) {
    var templateHtml;
    var newpath;
    $('#source-table').empty();
    if (pathIndex != 0) {
        templateHtml = $('#sources_template').clone();
        templateHtml.find('.source_row').empty().html('<a href="#" ><i class="fa fa-reply"></i></a>');
        templateHtml.find('.source_row').attr('onclick', 'backFolder();');
        templateHtml.find('.source_row').css('cursor', 'pointer');
        templateHtml.find('a[title="Documentation"]').parent().remove();
        templateHtml.find('.documentation').parent().remove();
        templateHtml.find('.comments').parent().remove();
        templateHtml.removeAttr('id');
        $('#source-table').append(templateHtml);
    }
    $.each(response.resources, function(idx, source) {
        if (source.hasChild == "yes") {
            var newpath = source.path;
            var nn = newpath.replace(/\\/g, '\\\\');
            templateHtml = $('#sources_template').clone();
            templateHtml.find('.source_row span:first-child').html('<i class="fa fa-folder-close"></i>&nbsp;' + idx);
            templateHtml.find('.source_row').attr('onclick', 'tempFolder("' + nn + '","' + idx + '");');
            templateHtml.find('.source_row').css('cursor', 'pointer');
            templateHtml.find('a[title="Documentation"]').parent().remove();
            templateHtml.find('.documentation').parent().remove();
            templateHtml.find('.comments').parent().remove();
            templateHtml.find('.noDecorationFile').removeClass('noDecorationFile');
            templateHtml.removeAttr('id');
            $('#source-table').append(templateHtml);
        } else {
            if (idx.indexOf(".bpm") > 0) {
                templateHtml = $('#sources_template').clone();
                templateHtml.find('.source_row span:first-child').append(idx);
                templateHtml.find('a[title="Documentation"]').attr('href', '#documentation' + idx.replace(/\./gi, ""));
                templateHtml.find('a[title="Documentation"]').attr('onclick', 'openFile("' + idx + '","SVG");');
                templateHtml.find('a[title="Comments"]').attr('href', '#comments' + idx.replace(/\./gi, ""));
                templateHtml.find('a[title="Comments"]').attr('onclick', 'openFile("' + idx + '","comments",this);');
                templateHtml.find('a[title="Download"]').empty();
                templateHtml.find('.documentation').parent().remove();
                templateHtml.find('.comments').parent().attr('id', 'comments' + idx.replace(/\./gi, ""));
                templateHtml.removeAttr('id');
                $('#source-table').append(templateHtml);
            } else if (idx.indexOf(".gi") > 0 || idx.indexOf(".bre") > 0 || idx.indexOf(".rest") > 0 || idx.indexOf(".xvar") > 0 || idx.indexOf(".rptdesign") > 0) {
                templateHtml = $('#sources_template').clone();
                templateHtml.find('.source_row span:first-child').append(idx);
                templateHtml.find('a[title="Documentation"]').attr('href', '#documentation' + idx.replace(/\./gi, ""));
                templateHtml.find('a[title="Documentation"]').attr('onclick', 'openFile("' + idx + '","documentation",this);');
                templateHtml.find('a[title="Comments"]').attr('href', '#comments' + idx.replace(/\./gi, ""));
                templateHtml.find('a[title="Comments"]').attr('onclick', 'openFile("' + idx + '","comments",this);');
                templateHtml.find('a[title="Download"]').empty();
                templateHtml.find('.documentation').parent().attr('id', 'documentation' + idx.replace(/\./gi, ""));
                templateHtml.find('.comments').parent().attr('id', 'comments' + idx.replace(/\./gi, ""));
                templateHtml.removeAttr('id');
                $('#source-table').append(templateHtml);
            } else if (idx.indexOf(".xsd") > 0 || idx.indexOf(".sql") > 0 || idx.indexOf(".wsdl") > 0 || idx.indexOf(".gi") > 0 || idx.indexOf(".xsl") > 0) {
                templateHtml = $('#sources_template').clone();
                templateHtml.find('.source_row span:first-child').append(idx);
                templateHtml.find('a[title="Documentation"]').attr('href', '#documentation' + idx.replace(/\./gi, ""));
                templateHtml.find('a[title="Documentation"]').attr('onclick', 'openFile("' + idx + '","documentation",this);');
                templateHtml.find('a[title="Comments"]').attr('href', '#comments' + idx.replace(/\./gi, ""));
                templateHtml.find('a[title="Comments"]').attr('onclick', 'openFile("' + idx + '","comments",this);');
                templateHtml.find('a[title="Download"]').attr('onclick', 'openFile("' + idx + '","download");');
                templateHtml.find('.documentation').parent().attr('id', 'documentation' + idx.replace(/\./gi, ""));
                templateHtml.find('.comments').parent().attr('id', 'comments' + idx.replace(/\./gi, ""));
                templateHtml.removeAttr('id');
                $('#source-table').append(templateHtml);
            } else if (idx.indexOf(".xml") > 0) {
                templateHtml = $('#sources_template').clone();
                templateHtml.find('.source_row span:first-child').append(idx);
                templateHtml.find('a[title="Documentation"]').empty();
                templateHtml.find('a[title="Comments"]').attr('href', '#comments' + idx.replace(/\./gi, ""));
                templateHtml.find('a[title="Comments"]').attr('onclick', 'openFile("' + idx + '","comments",this);');
                templateHtml.find('a[title="Download"]').attr('onclick', 'openFile("' + idx + '","download");');
                templateHtml.find('.documentation').parent().remove();
                templateHtml.find('.comments').parent().attr('id', 'comments' + idx.replace(/\./gi, ""));
                templateHtml.removeAttr('id');
                $('#source-table').append(templateHtml);
            } else {
                templateHtml = $('#sources_template').clone();
                templateHtml.find('.source_row span:first-child').html('<i class="fa fa-file"></i>&nbsp;' + idx);
                templateHtml.find('a[title="Documentation"]').parent().remove();
                templateHtml.find('.documentation').parent().remove();
                templateHtml.find('.comments').parent().remove();
                templateHtml.removeAttr('id');
                $('#source-table').append(templateHtml);
            }
        }
    });
    removeLoading($('#container1'));
}
/** 
 * @Function Name   : tempFolder
 * @Description     : save the opened path of file structure
 * @param           : path, name
 * @returns         :
 * */
function tempFolder(path, name) {
    pathIndex++;
    fetchSources(path);
    pathArray.push(path);
    folderArray.push(name);
}
/** 
 * @Function Name   : backFolder
 * @Description     : call back to previous folder
 * @param           :
 * @returns         :
 * */
function backFolder() {
    if (pathIndex <= 0) {
        fetchResources();
    } else {
        pathIndex--;
        fetchSources(pathArray[pathIndex - 1]);
        pathArray.pop();
        folderArray.pop();
    }
}
/** 
 * @Function Name   : folderPath
 * @Description     : appends all the folderNames and forms a path
 * @param           :
 * @returns         : newPath (current total path)
 * */
function folderPath() {
    var newPath = '';
    if (folderArray.length != 0) {
        $.each(folderArray, function(idx, value) {
            newPath += value + '/';
        });
    }
    return newPath;
}

/** 
 * @Function Name   : fetchLocks
 * @Description     : fetches lock resources from server
 * @param           :
 * @returns         :
 * */
function fetchLocks() {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject,
        branch: currentBranch
    }
    sendAjaxCall('collaboration/fetchLocks', "POST", false, true, "json", data, errorCallCollaboration, fetchLocksSuccess);
}
/** 
 * @Function Name   : fetchLocksSuccess
 * @Description     : fetches lock resources from server
 * @param           :
 * @returns         :
 * */
function fetchLocksSuccess(data) {
    var now = new Date();
    lockTable.fnClearTable();
    $('#lockFiles').find('input:first').prop('checked', false);
    $.each(data.lockResources, function(idx, source) {
        var cDate = new Date(source.lockedDate);
        var items = [];
        items[items.length] = "<label class='position-relative'><input type='checkbox' class='ace' onclick='javascript:updateHeaderCheckbox(this)';> <span class='lbl'></span></label>";
        items[items.length] = source.resourceName;
        var nameObj=[];
        if(data.user!=undefined && data.user!=null)
                nameObj = $.grep(data.user, function(e){return e.userID == source.lockedBy});
            name = nameObj.length==1 ? nameObj[0].userName : source.lockedBy;
        items[items.length] = '<a class="noDecoration" user="'+source.lockedBy+'" onclick=javascript:showUserProfile(this)>'+name+'</a>';
        items[items.length] = differDates(now - cDate, 2);
        lockTable.fnAddData(items, false);
    });
    lockTable.fnDraw(true);
    $('#lockFiles thead tr th').removeClass("sorting_asc").removeClass("sorting");
    $('.dataTables_empty').html($('#noFileLocked').text());
}
/** 
 * @Function Name   : fetchBranchCommits
 * @Description     : Fetches commits on the currently opened branch
 * @param           : start
 * @returns         :
 * */
function fetchBranchCommits(start) {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject,
        branch: currentBranch,
        start: start,
        max: maxCommits
    }
    sendAjaxCall('collaboration/fetchCommits', "POST", false, true, "json", data, errorCallCollaboration, function(data) {
        if (data.commits.length == 0)
            refreshCollaboration();
        else if (data.commits.length == maxCommits)
            buildCommits(data.commits, start + maxCommits,data.user);
        else
            buildCommits(data.commits,null,data.user);
    });
}
/** 
 * @Function Name   : openFile
 * @Description     : Opens documentation (or) comments (or) download (or) svg depending on the flag
 * @param           : path, flag,obj
 * @returns         :
 * */
function openFile(path, flag, obj) {
    var resourceId;
    var data = {
        repoName: currentRepoName,
        projectName: currentProject,
        branch: currentBranch,
        resourceName: path
    }
    if (flag == "documentation") {
        data.resourceName = folderPath() + path;
        if (!$(obj).attr('resourceid')) {
            sendAjaxCall('collaboration/fetchResource', "POST", false, true, "json", data, errorCallCollaboration, function(response) {
                if (response.error == null) {
                    resourceId = response.resource;
                    $(obj).attr('resourceid', resourceId);
                    $('#documentation' + path.replace(/\./gi, '')).attr('id', 'documentation' + resourceId);
                    $('a[href=#documentation' + path.replace(/\./gi, '') + ']').attr('href', '#documentation' + resourceId);
                    currentDocumentation = $('#documentation' + resourceId).find('.accordion-inner');
                } else {
                    showInformation(response.error);
                }
            });
            setTimeout(function() {
                $('#comments' + $(obj).attr('resourceid')).removeClass('in').addClass('collapse');
                $('#comments' + $(obj).attr('resourceid')).css('height', '0');
                sendAjaxCall('collaboration/showDocumentation', "POST", false, true, "json", data, errorCallCollaboration, showDocumentation);
            }, 1000);
        } else {
            currentDocumentation = $('#documentation' + $(obj).attr('resourceid')).find('.accordion-inner');
            sendAjaxCall('collaboration/showDocumentation', "POST", false, true, "json", data, errorCallCollaboration, showDocumentation);
            $('#comments' + $(obj).attr('resourceid')).removeClass('in').addClass('collapse');
            $('#comments' + $(obj).attr('resourceid')).css('height', '0');
        }


    } else if (flag == "comments") {
        data.resourceName = folderPath() + path;
        if (!$(obj).attr('resourceid')) {
            sendAjaxCall('collaboration/fetchResource', "POST", false, true, "json", data, errorCallCollaboration, function(response) {
                if (response.error == null) {
                    resourceId = response.resource;
                    $(obj).attr('resourceid', resourceId);
                    $('#comments' + path.replace(/\./gi, '')).attr('id', 'comments' + resourceId);
                    $('a[href=#comments' + path.replace(/\./gi, '') + ']').attr('href', '#comments' + resourceId);
                    currentDocumentation = $('#comments' + resourceId).find('.accordion-inner');
                } else {
                    showInformation(response.error);
                }
            });
            setTimeout(function() {
                $('#documentation' + $(obj).attr('resourceid')).removeClass('in').addClass('collapse');
                $('#documentation' + $(obj).attr('resourceid')).css('height', '0');
                currentDocumentation.empty();
                currentDocumentation.append(showCommentsHtml("333", "comments" + $(obj).attr('resourceId')).show());
            }, 1000);
        } else {
            currentDocumentation = $('#comments' + $(obj).attr('resourceid')).find('.accordion-inner');
            currentDocumentation.empty();
            currentDocumentation.append(showCommentsHtml("333", "comments" + $(obj).attr('resourceId')).show());
            $('#documentation' + $(obj).attr('resourceid')).removeClass('in').addClass('collapse');
            $('#documentation' + $(obj).attr('resourceid')).css('height', '0');
        }
    } else if (flag == "projectComments") {
        currentDocumentation = $('#' + path);
        currentDocumentation.empty();
        currentDocumentation.append(showCommentsHtml("333", path).show());
    } else if (flag == "zipDownload") {
        window.location.href = "collaboration/fileDownload?repoName=" + currentRepoName + "&projectName=" + currentProject + "&tagName=" + path.replace(/\_/g, " ") + ".zip";
    } else if (flag == "download") {
        path = folderPath() + path;
        window.location.href = "collaboration/fileDownload?repoName=" + currentRepoName + "&projectName=" + currentProject + "&branchName=" + currentBranch + "&resourceName=" + path + "";
    } else if (flag == "SVG") {
        if (is_ie8) {
            showInformation($('#ie8NotSupportSVG').text())
        } else {
            data.resourceName = folderPath() + path;
            modalShow('showSVG');
            addLoading($('#svg_container'));
            $('#showSVG .modal-dialog').css('width', $(window).width() - 30);
            $('#showSVG .modal-footer').css('padding-left', 15);
            $('#showSVG').find('#fileName').html(path);
            $('#svgInfo').empty();
            $('#svg_container').empty();
            sendAjaxCall('collaboration/showSVG', "POST", false, true, "xml", data, errorCallCollaboration, function(response) {
                if (response.error == null) {
                    showSVG(response);
                    sendAjaxCall('collaboration/showDocumentation', "POST", false, true, "json", data, errorCallCollaboration, function(response) {
                        if (response.documentation != undefined && response.documentation != null)
                            $('#svgInfo').text(response.documentation.Content);
                        else
                            $('#svgInfo').text($('#noDocumentationFound').text());
                    });
                } else {
                    showInformation(response.error);
                }
            });
        }
    }

}
/** 
 * @Function Name   : showDocumentation
 * @Description     : Shows the documentation of a file
 * @param           : response data
 * @returns         :
 * */
function showDocumentation(data) {
    currentDocumentation.empty();
    currentDocumentation.append('<span class="orange">' + $('#fmtdocumentation').text() + '</span><br>');
    if (data.documentation != undefined && data.documentation.Content != undefined)
        currentDocumentation.append(data.documentation.Content);
    else if (data.documentation != undefined && data.documentation.length > 0)
        currentDocumentation.append(data.documentation);
    else
        currentDocumentation.append($('#noDocumentationFound').text());
}
/** 
 * @Function Name   : showSVGDocumentation
 * @Description     : Shows documentation of a BPM file
 * @param           :
 * @returns         :
 * */
function showSVGDocumentation() {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject,
        branch: currentBranch,
        resourceName: $('#fileName').text()
    }
    sendAjaxCall('collaboration/showDocumentation', "POST", false, true, "json", data, errorCallCollaboration, function(response) {
        if (response.documentation != undefined && response.documentation != null)
            $('#svgInfo').text(response.documentation.Content);
        else
            $('#svgInfo').text($('#noDocumentationFound').text());
    });
}
/** 
 * @Function Name   : showSVG
 * @Description     : Shows SVG of a BPM file
 * @param           : data, fileName
 * @returns         :
 * */
function showSVG(data) {
    $('#svg_container').css('max-height', $(window).height() - 210);
    if ($(data).find('svg').length != 0)
        $('#svg_container').append($(data).find('svg'));
    else if ($(data).find('message').length != 0)
        $('#svg_container').append($(data).find('message').text());
    removeLoading($('#svg_container'));
}


/** for zooming in of a svg file */
$('#zoom-in').click(function() {
    $("#testing svg").attr('width', $("#testing svg").attr('width') * 1.2);
    $("#testing svg").attr('height', $("#testing svg").attr('height') * 1.2);
});
/** for zooming out of a svg file */
$('#zoom-out').click(function() {
    $("#testing svg").attr('width', $("#testing svg").attr('width') * 0.85);
    $("#testing svg").attr('height', $("#testing svg").attr('height') * 0.85);
});

/** 
 * @Function Name   : executeEvent
 * @Description     : displays the documentation of selected area in svg diagram
 * @param           : evt
 * @returns         :
 * */
var prevColor

function executeEvent(evt) {
    $('#svgInfo').empty();
    var object = $(evt.target);
    if (previousSVGevt != null) {
        if (prevColor != null)
            previousSVGevt.css('fill', prevColor);
        else
            previousSVGevt.css('fill', 'white');
    }
    if (object.attr('bpmn:activity-documentation') == null && object.attr('bpmn:activity-documentation') == undefined) {
        if (object.attr('bpmn:process-documentation').length > 0)
            $('#svgInfo').append(object.attr('bpmn:process-documentation'));
        else
            $('#svgInfo').append($('#noDocumentationFound').text());
        previousSVGevt = object;
        prevColor = $(evt.target).attr('fill');
    } else if (object.attr('bpmn:activity-documentation') != null && object.attr('bpmn:activity-documentation') != undefined) {
        if (object.attr('bpmn:activity-documentation').length > 0)
            $('#svgInfo').append(object.attr('bpmn:activity-documentation'));
        else
            $('#svgInfo').append($('#noDocumentationFound').text());
        object.css('fill', '#87B87F');
        previousSVGevt = object;
        prevColor = $(evt.target).attr('fill');
    }
}
/** 
 * @Function Name   : unlockResources
 * @Description     : Unlocks the selected files.
 * @param           : bol(true/false)
 * @returns         :
 * */
function unlockResources(bol) {
    var lockFiles = getSelectedRows(lockTable);
    if (!bol) {
        if (lockFiles.length > 0) {
            $('#collabDeleteConfirm').find('.modal_heading').text($('#fmtunlockFile').text());
            $('#collabDeleteConfirm').find('.deleteMessage').text($('#fmtsureToUnlockFile').text());
            $('#collabDeleteConfirm').find('.modal-footer button').attr('onclick', 'unlockResources(true);');
            modalShow('collabDeleteConfirm');
        } else {
            showInformation($('#fmtpleaseSelectFile').text());
        }
    } else {
        var unlockArray = [];
        $.each(lockFiles, function(idx, value) {
            unlockArray[unlockArray.length] = value[1];
        });
        unlockFile(unlockArray);
    }
}
/** 
 * @Function Name   : unlockFile
 * @Description     : Unlocks the selected file and sends server call.
 * @param           : name
 * @returns         :
 * */
function unlockFile(name) {
    var data = {
        repoName: currentRepoName,
        projectName: currentProject,
        branch: currentBranch,
        resourceNames: name
    }
    sendAjaxCall('collaboration/unlockResources', "POST", false, true, "json", data, errorCallCollaboration, unlockfileSuccess);
}
/** 
 * @Function Name   : unlockfileSuccess
 * @Description     : Unlocks the selected file
 * @param           : response data
 * @returns         :
 * */
function unlockfileSuccess(data) {
    if (data.error == null & data.message != null) {
        fetchLocks();
        showNotification(data.message);
    }
}
/** 
 * @Function Name   : aceSettingButton
 * @Description     : Opens and closes ace settings menu from right top corner.
 * @param           :
 * @returns         :
 * */
function aceSettingButton() {
    $('#ace-settings-box').toggleClass('open');
}

/** 
 * @Function Name   : errorCallCollaboration
 * @Description     : error function for all JSON calls.
 * @param           : error message
 * @returns         :
 * */
function errorCallCollaboration(e) {
    if (e != null && e.status != null && e.status != "")
        showInformation(defaults.errorInGettingJSONData);
    else
        showInformation(defaults.errorInGettingJSONData);
    removeLoading('', true);
}
/** 
 * @Function Name   : gotoCollaborationHistory
 * @Description     : this function will be called when url changes and url contains collaboration
 * @param           : url after hash
 * @returns         :
 * */
function gotoCollaborationHistory(hash){
    var hashId = hash.split('?')[1]
    if (hashId && is_collab_module_clicked != true){
        var tempCache = getCollabParams();
        if (tempCache.length == 1 )
            openProjectsPage(tempCache[0],tempCache)
        else if (tempCache.length == 2 )
            openProject(tempCache[1],tempCache)
        else if (tempCache.length == 3 )
            openBranchPage(tempCache[2],tempCache)
    }
    is_collab_module_clicked = false;  
}
/** default messages */
var defaults = {
    deleteTags: $('#fmtdeleteTag').text(),
    errorInGettingJSONData: "Error occurred while getting data, Please see log for further details.",
}
