 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<html>
<head>
<script type="text/javascript" src="scripts/custom/common/comment.js?version=2676"></script>
</head>
<body>
<div class="tabbable hide" id="commentsContainerId">
  <ul  class="nav nav-tabs">
    
    <li class="active">
      <a id="listCommentsHead" href="#listComments" data-toggle="tab">
        <fmt:message key="collaboration.comments.comments" /> 
        <span class="badge badge-primary">
          
        </span>
       </a>
    </li>
	<li >
      <a id="addCommentHead" href="#addComment" data-toggle="tab">
        <fmt:message key="collaboration.comments.add.comment" />
      </a>
    </li >
	<span class="blue hide pull-right" id ="successMsg"><fmt:message key="collaboration.comments.comment.success" /></span>
  </ul>
  <div class="tab-content">
    <div id="addComment" class="tab-pane ">
      <textarea placeholder="<fmt:message key='collaboration.add.comment.here' />" id="newcomment" class="form-control limited" maxlength="4000" onfocus="if ($(this).val().indexOf('Add comment here.') > -1){$(this).val('')}"></textarea>
      	<input type="hidden" id="newthreadid" value="1234"/>
	<input type="hidden" id="newmoduleid" value="333"/>
	<input type="hidden" id="newuser" value="leo1"/>
	<span class="blue hide" ><fmt:message key="collaboration.comments.comment.success" /></span>
	<span class="red hide" id ="errorid"><fmt:message key="collaboration.comments.comment.empty" /></span>
      <div id = "savebutton" class="pull-right btn btn-primary btn-xs" onclick="saveComments(this);return false;">
        <fmt:message key="collaboration.comments.comment" /> 
      </div>
    </div>
    <div id="listComments" class="tab-pane active">
      <div class="commentsScroll">
        <div id="itemtempletid" class="itemdiv commentdiv">
          <div class="body">
            <div class="name">
              <span href="#" id="name"></span>
            </div>
            <div class="time">
              <i class="fa fa-clock-o">
              </i>
              <span id ="time"></span>
            </div>
            <div class="text">
              <i class="fa fa-quote-left">
              </i>
              <span id="comment"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="hide">
	<div id="loadMoreComments" class="center">

	<a href="#" onclick="loadMoreComments(this);return false;" class="btn btn-primary btn-xs" style="width:20%;"><fmt:message key="collaboration.comments.load.more" /></a>
	</div>
</div>
</body>
</html>
