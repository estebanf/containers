 /*
 * Copyright (C) 2016, Ever Team Software
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Ever Team Software or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */
var $j = jQuery.noConflict();
var gStencilSetJson = null;
var modelJSON = null;
var shapeRepUl = $j('#shape-repository')
/**
 * @Function Name   : starting function of jquery
 * @Description     : This function is used to initialize variables and set default values.
 * @param           : data list of processes
 * @returns         :
 * */
$j(document).ready(function() {
    $j('.ace-popup').popover();
    var params = window.location.search.toQueryParams();
    var uuid = params.uuid ;
    addLoading($j('#webBasedEditor'));
    $j('#canvas').css('height', $j(window).height()-120);
    var canvasWidth = $j(window).width() - ($j('#sidebar').width() + 20);
    $j('#canvas').css('width', canvasWidth);
    $j('#sidebar').css('height', $j(window).height() - 50);
    openWebModeler(uuid);
    $j('#shape-color').colorPicker({showHexField: false});
    var url = window.location.href;
    $j('.uuid').text(url.split('=')[1]);
    $j('#attachmentFile').ace_file_input({
      no_file:'Choose File ...',droppable:false
    });
});


/**
 * @Function Name   : openWebModeler
 * @Description     : Open web based modeler
 * @param           : uuid
 * @returns         :
 * */
function openWebModeler(uuid){
  gStencilSetJson = null;
  modelJSON = null;

  WAPAMA.CONFIG.SSET = "bpmn2.0";
  WAPAMA.CONFIG.DEV = true;
  if (WAPAMA.CONFIG.DEV)
    WAPAMA_LOGLEVEL = 2;
  params = window.location.search.toQueryParams();

  WAPAMA.UUID = uuid;

  WAPAMA.CONFIG.ROOT_PATH = "/everteam/";
  WAPAMA.PATH = WAPAMA.CONFIG.ROOT_PATH;
  
  WAPAMA.CONFIG.UUID_AUTOSAVE_INTERVAL = 120000;
  WAPAMA.CONFIG.UUID_AUTOSAVE_DEFAULT = true;
  var permissionTypes = {
    "view":1,
    "comment":2,
    "edit":3,
    "owner":4
  }
  sendAjaxCall("webmodeler/diagram/get?uuid="+WAPAMA.UUID, "GET", false, true, "json", {}, handleWebModelerAjaxError, function(response){
    if(response.data){
      modelJSON = response.data;
      if(response.permission){
          for(var k=0;k<=response.permission.length;k++){
            if(permissionTypes[response.permission[k]]  >  WAPAMA.CONFIG.PERMISSION_TYPE)
                WAPAMA.CONFIG.PERMISSION_TYPE = permissionTypes[response.permission[k]];
          }
      }
      WAPAMA.CONFIG.UUID_AUTOSAVE_INTERVAL = response.autoSaveInterval;
      WAPAMA.CONFIG.UUID_AUTOSAVE_ENABLED = response.isAutoSaveEnabled;
      $j("#userName").text(response.user.displayName);
      $j("#userId").text(response.user.userId);
      //To check comment permission for the logged user
      WAPAMA.CONFIG.PERMISSION_TYPE <= 1 ?   $j(".modellerCommentDiv").addClass('hide')  :  $j(".modellerCommentDiv").removeClass('hide');
      //To check attachment permission for uploading new documents
      WAPAMA.CONFIG.PERMISSION_TYPE >2 ? $j("#awAttachmentForm").removeClass('hide') : $j("#awAttachmentForm").addClass('hide')
      if (gStencilSetJson != null) {
        Kickstart.load();

      }
    }else if(response.error_message)
        showErrorNotification(response.error_message);
  });

  new Ajax.Request("/everteam/stencilset/bpmn2.0", {
     asynchronous: true,
     method: "get",
     onSuccess: function(response) {
         gStencilSetJson = response.responseText;
         if (modelJSON != null) {
             // kickstart wapama
             Kickstart.load();

         }
         
     },
     onFailure: function(error) {
         console.log(error);
         throw "Loading stencil set failed.";
     }
 });
}

/**
 * @Function Name   : selectShapeRepositoriesChange
 * @Description     : Set the left, right side bar on change of shape
 * @param           : curObj
 * @returns         :
 * */
function selectShapeRepositoriesChange(curObj) {
    if($j(curObj).hasClass('changeShape'))
      $j(curObj).removeClass("changeShape").find('.submenu').css('display', 'none');
    else
        $j(curObj).addClass("changeShape").find('.submenu').css('display', 'block');
    shapeRepUl.find('li').not($j(curObj)).removeClass('changeShape');
    shapeRepUl.find('li').not($j(curObj)).find('.submenu').css('display', 'none');
}

/**
 * @Function Name   : addLoading
 * @Description     : add the loading hover glass icon for a particular element id
 * @param           : element id
 * @returns         :
 * */
function addLoading(elm, check) {
    if ($j('#loadingModeler').length == 0) {
        $j(elm).addClass('shadow');
        $j(elm).before('<div id="loadingModeler"><i class="fa fa-spinner fa-spin fa-2x orange"></i></div>');
        if ($j(elm).height() / 2 > ($j(window).height() / 2)) {
            $j('#loadingModeler').css('margin-top', ($j(window).height() - 150) / 2);
        } else {
            $j('#loadingModeler').css('margin-top', ($j(elm).height()) / 2);
        }
        if ($j('#loadingModeler').closest('.modal').length == 0) {
            if ($j('#sidebar').hasClass('h-sidebar') && $j(elm).attr('id') == 'main-content') {
                $j('#loadingModeler').css({
                    'width': '50px',
                    'margin-left': $j(window).width() / 2 + 'px'
                });
            } else
                $j('#loadingModeler').css('width', $j(elm).css('width'));
        }

        if (check)
            $j('#loadingModeler').css('margin-top', '0px')
    }
}

/**
 * @Function Name   : removeLoading
 * @Description     : removes the hover glass icon
 * @param           : element id
 * @returns         :
 * */
function removeLoading(elm, check) {
    setTimeout(function() {
        if (!check) {
            $j(elm).removeClass('shadow');
            $j('.shadow').removeClass('shadow');
            $j('#loadingModeler').remove();
        } else {
            $j('.shadow').removeClass('shadow');
            $j('#loadingModeler').remove();
        }
    }, 500);
}

function sendAjaxCall(url,type,cache,async,dataType,data,errorCallBack,successCallback,timeout) {
var ajaxTimeout;
if(timeout != null && timeout != undefined)
  ajaxTimeout = timeout;
else
  ajaxTimeout = 60000;
$j.ajax({
  url: url,
  type: type,
  cache: cache,
  async: async,
  dataType: dataType,
  data: data,
  timeout:ajaxTimeout,
  beforeSend: function(xhr) {
    xhr.setRequestHeader('ajax', 'true');
    xhr.setRequestHeader('Accept', 'application/json');
  },
  error: function (e) {
    removeLoading('',true);
    if(e.status==parseInt(401))
      submitActionToURL('login.htm','logOut');
    else if(e.status==parseInt(400))
      showInformation("Bad Request, Please check the URL.");
    else if(e.status==parseInt(503))
      showInformation("Unable to reach the server, Please Check.");
    else if(e.status==parseInt(0))
      showInformation("Unable to process your request. Either server is busy or not reachable.");
    else if(e.status==parseInt(404))
      showInformation("Bad Request, Please check the URL.");
    else if(e.status==parseInt(500)){
      if(e.responseText!=null && e.responseText!="")
        $j(".main-content").append(e.responseText);
      else
      showInformation("Internal server error occurred, Please check the error logs.");
    }
    else
      errorCallBack(e);
  },
  success: function (data) {
      successCallback(data);
    }
  });
}

/**
 * @Function Name   : handleWebModelerAjaxError
 * @Description     : Exception handle by this function
 * @param           : e
 * @returns         :
 * */
function handleWebModelerAjaxError(e) {
    showInformation(e.responseText);
    removeLoading('', true);
    return false;
}

function showNotification(msg, flag) {
    if (flag != undefined && flag == true && msg != undefined)
        $j('#notificationMessage').append('<div class="notif-body licenceNotif"><button  class="close notifClose" type="button" onclick="javascript:removeNotification(this)" title="close">&times;</button><div class="licenceText">' + msg + '</div></div>');
    else if (msg != undefined) {
        $j('#notificationMessage').append('<div class="notif-body" style="top:0"><button  class="close notifClose" type="button" onclick="javascript:removeSuccessNotification(this)" title="close">&times;</button><div>' + msg + '</div></div>');
        $j('#notificationMessage .notif-body:last').animate({
            bottom: 50
        }, 1000).delay(6000).fadeOut(700, function() {
            $(this).remove();
        });
    }
}

function showErrorNotification(msg) {
    $j('#notificationMessage').append('<div class="Error-notif-body notif-body errorNotif"><button  class="close notifClose" type="button" onclick="javascript:removeNotification(this)" title="close">&times;</button><div class="errorText">' + msg + '</div></div>');
    removeLoading();
}

function removeNotification(obj) {
    $(obj).closest('.notif-body').animate({
        bottom: 50
    }, 200).fadeOut(700, function() {
        $(this).remove();
    });
}

function showInformation(textMsg) {
    $j('#information-dialog').find('.information').html(textMsg);
    modalShow('information-dialog');
}

function modalShow(elemId) {
    $j('#' + elemId).removeData("modal").modal({
        backdrop: 'static',
        keyboard: false
    });
    $j('#' + elemId + '').modal({
        toggle: true,
        show: true
    });
}

function postModellerComment(){
  if($j.trim($j("#modellerComment").val())){
      $j('.modellercommentError').addClass('hide');
      addLoading($j('#collapseThree').find('.widget-main'));
      var data = {
          comment:$j("#modellerComment").val(),
          createdBy:$j("#userId").text(),
          refCommentTypeId:73,
          threadId:WAPAMA.CONFIG.SHAPE_ID
      }
      sendAjaxCall("social/comments/save", "POST", false, true, "json", data, handleWebModelerAjaxError, function(response) {
          $j("#modellerComment").val('');
          if(response.result=="saved"){
              getComments();
              showNotification($j("#commentAdded").text());
          }else
              showErrorNotification(response.result);
      });
    }else
      $j('.modellercommentError').text("Please enter comment").removeClass('hide');
}


function addCommentCount(count,rectObj){
    var textObj = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textObj.setAttribute("count", 'true');
    textObj.setAttribute("y", '-5');
    var textNode = document.createTextNode(count);
    textObj.appendChild(textNode);
    rectObj.next().after(textObj);  
}

function getComments() {
  var modellerCommentsRef = $j('div#modellerComments');
  modellerCommentsRef.css('max-height',$j(window).height()-325);
  var data ={moduleId:73,start:0,max:1000,threadId:WAPAMA.CONFIG.SHAPE_ID};
  sendAjaxCall("social/comments/list", "GET", false, true, "json", data,handleWebModelerAjaxError, function(response) {
      if(response.comments && response.comments.length >= 1){
          modellerCommentsRef.empty();
          $j.each(response.comments,function(key,value){
              var commentTemplate = $j("#modellerCommentTemplate .profile-activity").clone();
              commentTemplate.find('img').attr('src',"ui-fw/user/avatar?user="+value.createdBy+"&date="+new Date());
              commentTemplate.find('a.userName').attr('onclick','javascript:showUserProfile(this)').attr('user',value.createdBy);
              if(value.createdByName)
                  commentTemplate.find('a.userName').text(value.createdByName);
              else
                  commentTemplate.find('a.userName').text(value.createdBy);
              commentTemplate.find('span.commentTime').text($j.format.date(value.createdDate, "yyyy/MM/dd hh:mm:ss a"));
              commentTemplate.find('div.comment').text(value.comment);
              modellerCommentsRef.prepend(commentTemplate);
          });
          $j('span.activityCommentCount').text(response.comments.length);
      }else{
          modellerCommentsRef.html("<span>"+$j("#commentNotFound").text()+"</span>")
          $j('span.activityCommentCount').text(0);
        }
      applyNiceScroll(modellerCommentsRef);
      $j('#modellerComments').animate({
          scrollTop: $j('#modellerComments').get(0).scrollHeight
      },1000);
      removeLoading();
  });
}

function applyNiceScroll(obj, height,fixedHeight,xScroll) {
    xScroll = xScroll || false;
  $j(obj).perfectScrollbar('destroy');
  height = $j('#sidebar').hasClass('h-sidebar') ? height + 65 : height
  if ($j(obj).height() > $j(window).height() - height || $j(obj).height()===0)
    $j(obj).css('height', $j(window).height() - height);
    if (fixedHeight){
        $j(obj).css('height', fixedHeight);
    }
  $j(obj).css({overflow:"hidden",position:"relative"});
  $j(obj).perfectScrollbar({suppressScrollX:xScroll});
}

/*Common function for whole BPMS UI to display user profile of any user*/
function showUserProfile(aobj){
    modalShow("userProfileModal");
    addLoading($j("#userProfileModal").find('.modal-body'));    
    getUserprofileData($j(aobj).attr('user'));
}
/*Fetches the user profile data based on userID*/
function getUserprofileData(userId){
    $j.each(userProfileFields,function(key,value){
        $j("#ot"+key).text('');
    });
    addLoading($j("#userProfileModal").find('.modal-body'));
    $j("#userProfileModal").find("#otavatar").attr('src','ui-fw/user/avatar?user='+userId+'&date='+new Date());
    if(userId!=""){
        var data = {
            user:userId
        }
        sendAjaxCall("ui-fw/user/profile", "GET", false, true, "json",data, handleWebModelerAjaxError, function(responseData){
            populateUserProfile(responseData);
        });
    }
}

/*Populates the user profile data in user profile modal window*/
function populateUserProfile(data){
    var dataObj = data.userProfile;
    $j.each(userProfileFields,function(key,value){
        if(key=="gender" && dataObj.genderObj)
            $j("span#ot"+key).text(dataObj.genderObj.value); 
        else if(key=="country" && dataObj.countryObj)
            $j("span#ot"+key).text(dataObj.countryObj.value); 
        else
            $j("span#ot"+key).text(dataObj[value]);
    });
    if(data.userProfile.name)
      $j("#userProfileModal").find('.modal_heading').text(data.userProfile.name);
    else
      $j("#userProfileModal").find('.modal_heading').text(data.userProfile.userId);
    if(data.userProfile.dob)
        $j("span#otDob").text(moment(data.userProfile.dob,"yyyy-mm-dd".toUpperCase()).format("yyyy/MM/dd"));
    if($j("#otManager").text()=="")
        $j("#otManager").text(data.userProfile.manager)
    removeLoading();
}

/*Other user profile display*/
var userProfileFields = {
    'userDisplayName':'name',
    'userId':'userId',
    'gender':'genderObj',
    'dob':'dob',
    'skills':'skills',
    'manager':'managerName',
    'email':'email',
    'secondaryEmail':'secondaryEmail',
    'phone':'phone',
    'mobile':'mobile',
    'address':'address',
    'street':'street',
    'city':'city',
    'state':'state',
    'zip':'zip',
    'country':'countryObj'
};

function showInfo(obj) {
  setTimeout(function(){
    $j(obj).css('display','');
  }, 1);
}

function getAttachments(){
  $j(".attachmentsMsg").text('');
  $j(".attachmentsMsg").removeClass('text-danger').addClass('hide');
  var modellerAttachmentRef = $j('div#modellerAttachments');
  modellerAttachmentRef.empty();
  modellerAttachmentRef.html('');
  modellerAttachmentRef.css('max-height',$j(window).height()-325);
  sendAjaxCall(intalio_bpms.modeler.getAttachments+WAPAMA.CONFIG.SHAPE_ID, "GET", false, true, "json", {}, handleWebModelerAjaxError, function(response){
      $j('#modellerAttachments').empty();
      $j('#modellerAttachments').html('');
      if(response && response.attachments.length > 0){
        $j.each(response.attachments,function(key,value){
          $j(".activityAttachmentCount").text(response.attachments.length);
          var attachTemplate = $j("#attachmentListTemp .profile-activity").clone();
          attachTemplate.find('a:first').attr('href',intalio_bpms.modeler.getAttachment+value.accessUrl);
          attachTemplate.find('a:first').attr('target','_blank');
          attachTemplate.find('a:first').text(value.fileName);
          attachTemplate.find('a:last').attr('onclick','javascript:removeAttachment(this,"'+value.id+'")').attr('fileName',value.fileName).addClass('removeAttachment');
          attachTemplate.find('span.uploadTime').text($j.format.date(value.insertTime, "yyyy/MM/dd hh:mm:ss a"));
          modellerAttachmentRef.append(attachTemplate);
        });
          //To check attachment delete permission according to the logged in user right
          WAPAMA.CONFIG.PERMISSION_TYPE>2 ? $j(".removeAttachment").removeClass('hide'): $j(".removeAttachment").addClass('hide')
      }else{
        $j(".attachmentsMsg").text($j("#attachmentsMsg").text()).removeClass('hide');
        $j(".activityAttachmentCount").text(0);
      }
  });
  applyNiceScroll(modellerAttachmentRef);
  removeLoading();
}

function uploadAttachment(){
  var attachmentsForm = $j('#awAttachmentForm');
  attachmentsForm.attr('action',intalio_bpms.modeler.addAttachment);
  var attachment = $j('#attachmentFile').val();
  $j("#activityId").val(WAPAMA.CONFIG.SHAPE_ID);
  if(attachment){
    $j('#attachmentName').val($j("#attachmentFile")[0].files[0].name);
    fileSize = $j("#attachmentFile")[0].files[0].size;
    if(fileSize > WAPAMA.CONFIG.FILE_SIZE_VALIDATION){ //1 MB validation
      $j('.attachmentsMsg').text($j('#sizeValidation').text()).removeClass('hide').addClass('text-danger');
      return false;
    }
    addLoading($j('#accordion'));
    attachmentsForm.ajaxForm({
      success: function(response) {
        if($j.parseJSON(response) && $j.parseJSON(response).error_message){
          showErrorNotification($j.parseJSON(response).error_message);
        }else{
          $j('#attachmentName').val('');
          $j("#attachmentFile").val('');
          attachmentsForm.find('.ace-file-container').attr('data-title', 'Choose').removeClass('selected');
          attachmentsForm.find('.ace-file-name').attr('data-title', 'Choose File...');
          attachmentsForm.find('.ace-icon').addClass('fa fa-upload').removeClass('.fa fa-picture-o');
          attachmentsForm.find('.remove').hide();
          showNotification($j('#attachmentAdded').text());
          getAttachments();
        }
      },
      dataType: "text"
    }).submit();
  }else{
    $j('.attachmentsMsg').text($j('#fileRequired').text()).removeClass('hide').addClass('text-danger');
  }
}

function removeAttachment(obj,attachmentId){
  addLoading($j('#accordion'));
  sendAjaxCall(intalio_bpms.modeler.deleteAttachment+$j(obj).attr('fileName')+"&attachmentId="+attachmentId, "GET", false, true, "json", {}, handleWebModelerAjaxError, function(response){
    if(response && response.attachmentId){
        showNotification(response.success_message);
        getAttachments();
    }else{
      showErrorNotification(response.error_message);
      removeLoading();
    }
  });
}

function clearError(){
  $j('.attachmentsMsg').addClass('hide');
}

function removeSuccessNotification(obj) {
  $(obj).closest('.notif-body').remove();
}

function validateFileForAttachment(obj) {
  var ext = $j(obj).val().match(/(?:\.([^.]+))?$/)[1];
  if(WAPAMA.CONFIG.SUPPORTED_EXTENSIONS.indexOf(ext)>=0){
      $j("#attachmentFile").val('');
      $j('.attachmentsMsg').text($j('#fileNotSupported').text()).removeClass('hide').addClass('text-danger');
  } else {
    $j('.attachmentsMsg').text('');
    $j('.attachmentsMsg').addClass('hide');   
  }
}
