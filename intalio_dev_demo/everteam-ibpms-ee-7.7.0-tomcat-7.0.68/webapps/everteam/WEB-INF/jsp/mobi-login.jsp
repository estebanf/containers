<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Intalio</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
</head>
<style>
.content_div {
    display: none;
}
.content_div:first-child {
    display: block;
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
</style>
<body>
<script type="text/javascript">
//bind an event handler to the submit event for your login form
$('#loginForm').live('submit', function (e) {
    var $this = $(this);
    e.preventDefault();
    var $inputs = $('#loginForm :input');
	var complete = true;
    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    $inputs.each(function() {
	if(!$(this).val()) {
		displayPopup(this.name+" is empty")
		complete = false;
		return;
	}
    });

    if(complete) {
	    $.post($this.attr('action'), $this.serialize(), function (responseData) {
		if(responseData.error == null) {
			document.location.href = 'task';
		} else {
			displayPopup(responseData.error)
		}
	    });
    }
});

function displayPopup(msg) {
	$('#error').text(msg);
	$('#loginpopup').popup("open");
}

</script>

	<div id="loginPage" data-role="page" align="center" data-theme="d">
		<div data-role="header" data-theme="d">
			<div><img src="../images/logo.png" alt="Intalio" class="ui-btn-left io-header-logo"></div>
			<h1></h1>
		</div>
		<div data-role="content" role="main">
		<br />
		<br />
			<div style ="width:80%;">
				<form id="loginForm" action="login" method="post" data-ajax="false">
						<input type="text" name="username" id="username" data-mini="true"  placeholder="Username"/>
						<input type="password" name="password" id="password" data-mini="true"  placeholder="Password"/>
						<input type="submit" value="Login"/>
				</form>
			</div>

			<div data-role="popup" id="loginpopup" class="ui-content">
				<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>
				<b id="error"></b>
			</div>
		</div>
	</div>
</body>
</html>
