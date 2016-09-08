 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="intalio" uri="http://www.intalio.com/tagfiles"%>
<!DOCTYPE html>
<html>
	<head>
		<link rel="shortcut icon" href="/everteam/ET_icon.ico" type="image/x-icon"/>
		<meta http-equiv="X-UA-Compatible" content="IE=10"/>
		<meta charset="utf-8" />
		<title>Login Page - Everteam.iBPMS</title>

		<meta name="description" content="User login page" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!--basic styles-->

		<link href="style/plugin/bootstrap.min.css" rel="stylesheet" />
		<link href="style/plugin/bootstrap-responsive.min.css" rel="stylesheet" />
		<link href="style/plugin/font-awesome.min.css" rel="stylesheet"/>
		<!--[if IE]>
		<link href="style/custom/common-ie.css?version=2676" rel="stylesheet" />
		<![endif]-->
		<!--[if IE 7]>
		  <link rel="stylesheet" href="css/font-awesome-ie7.min.css" />
		<![endif]-->

		<!--page specific plugin styles-->

		<!--fonts-->
		<link rel="stylesheet" href="style/plugin/google-fonts.css" />
		<!--ace styles-->

		<link rel="stylesheet" href="style/plugin/ace.min.css" />
		<link rel="stylesheet" href="style/plugin/ace-responsive.min.css" />
		<link rel="stylesheet" href="style/custom/login.css" />

		<!--[if lt IE 9]>
		  <link rel="stylesheet" href="css/ace-ie.min.css" />
		<![endif]-->
		<link rel="stylesheet" href="style/custom/common.css?version=2676" />
		<script type="text/javascript" src="scripts/plugin/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="scripts/plugin/jquery.jcryption.js"></script>
		<style type="text/css">
		.login-layout .widget-box .widget-main {
			border-radius: 20px;
		}
		.widget-body {
			border-radius: 20px;
		}
		@font-face {
			font-family: "SegoeUI";
			src: url('style/custom/fonts/segoeui.ttf') format("truetype");
		}
		</style>
		<script type="text/javascript">
	if($("#main-content").find('.login-container').length==parseInt(1))
			window.location = "/intalio";
		var check =0;
		var is_ie8 = false;
	var shake_box = function (id) 
	{
		if (is_ie8){
			$('#loginError').removeClass('hide');
			if($('.userNameError').text().length !=0)
				$('#loginError').text($('.userNameError').text())
			else if($('.passwordError').text().length !=0)
				$('#loginError').text($('.passwordError').text())
			else if($('.combinationError').text().length !=0)
				$('#loginError').text($('.combinationError').text())
		}else{
			var duration = 1000;
			var stepcount = 0;
			$('#username').select();
			function setTransform(el, transform) 
			{
				var bstyles = ["-webkit-transform", "-moz-transform", "-ms-transform", "transform"];
				for(var i in bstyles) {
						el.css(bstyles[i], transform);
				}
			}
			function quiver(el, x) 
			{
				deg = 0;
				if (x != 0) 
					{
						deg = Math.cos(x * duration / 100) / (x / duration * 100);
					}
						setTransform(el, "rotate(" + deg + "deg)");
			}
			$("#login-box").animate(
						// pick any unsused but iterable animation property, so the step function is triggered
						{ opacity: '1' },
						{duration: duration,
						step: function(now, fx) 
						{
							//increment the function input
							stepcount += 1;
							quiver($("#login-box"), stepcount);
						},
							complete: function() {
							//reset the rotation
							quiver($("#login-box"), 0);
							setTransform($("#login-box"), "");
						}
					}
			);
		}
		check =3;
	};
	var unSupportedKeyCodes = [34,39,42,58,59,60,61,62,63,124];
	
	function validateLoginFields(event) {
		var key = event.keyCode || event.which;
		if ($.inArray(key,unSupportedKeyCodes)>=0) {
			event.preventDefault();
			return false;
		}else if(key == 13)
			handleSubmit();
	}
	
	function validateOnPaste(obj){
		var element = obj;
		setTimeout(function(){
			var textboxValue = $(element).val();
			$(element).val("");
			$(element).val(textboxValue.replace(/[<>?="';:]/g, ''));
		},100);
	}
	
	var rand = function() {
		return Math.random().toString(36).substr(2);
	};

	function handleSubmit(){
		var generateString = rand()+$('#username').val()+rand()+$("#password").val()+rand();
		var hashObj 	  = new jsSHA(generateString,"ASCII");
		var encrypted_key = hashObj.getHash("SHA-512", "HEX");
		$.jCryption.authenticate(encrypted_key, "encrypt?generateKeyPair=true", "encrypt?handshake=true",
			function(AESKey) {
				if($("#password").val()!=""){
					var encryptedString = $.jCryption.encrypt($("#password").val(), encrypted_key);
					$("#password").val(encryptedString);
				}
				$("#form").submit();
			}
		);
	}
	
	function validatePassword(event){
		var key = event.keyCode || event.which;
		if(key == 13)
			handleSubmit();
	}
</script>
	<!--[if IE 8]>
			<script type="text/javascript">
				is_ie8 = true
			</script>
	<![endif]-->

	</head>

	<body class="login-layout"  style="font-family:SegoeUI;">
		<div class="container-fluid" id="main-container">
			<div id="main-content">
				<div class="row-fluid">
					<div class="col-sm-12">
						<div class="login-container">
							<div class="row">
								<div class="position-relative">
									<div id="login-box" class="visible widget-box no-border">
										<div class="widget-body">
											<div class="widget-main">
												<div class="io-login-box-logo">
												<img src="images/everteam-login.png">
												</div>
												<div class="space-6"></div>
												<form action="login.htm" id="form" autocomplete="off" class="login-form" method="POST">
													 <input type="hidden" id="actionName" name="actionName" value="logIn"/>
													 <span class="hide text-danger" id="loginError"></span>
													<fieldset>
														<label class="block clearfix">
															<span class="block input-icon input-icon-right">
															<spring:bind path="login.username">
																<input type="text" class="col-sm-12 input username" placeholder="Username" tabindex="1" name="username" value="${login.username}" id="username" autocomplete="off" onkeypress='javascript:validateLoginFields(event)' onpaste='javascript:validateOnPaste(this)'/>
																<span class="hide userNameError">${status.errorMessage}</span>
																<c:if test="${not empty status.errorMessage}">
																<script type="text/javascript">
																shake_box();
																</script>
																</c:if>
															</spring:bind>
															</span>
														</label>
														<label class="block clearfix">
															<span class="block input-icon input-icon-right">
															<spring:bind path="login.password">
																<input type="password" class="col-sm-12 input password" placeholder="Password" id="password" tabindex="2" name="password" value="" autocomplete="off" onkeypress='javascript:validatePassword(event)'/>
																<span class="hide passwordError">${status.errorMessage}</span>
																<c:if test="${not empty status.errorMessage}">
																<script type="text/javascript">
																shake_box();
																</script>
																</c:if>
															</spring:bind>
															</span>
														</label>
															<span> 
																<spring:bind path="login">
																<c:forEach items="${status.errorMessages}" var="errorMessage">
																	<span class="hide combinationError">${errorMessage}</span>
																	<script type="text/javascript">
																	shake_box();
																	</script>
																</c:forEach>
																</spring:bind>
															</span>
														<div class="space"></div>
														<div>
															<button type='button' onclick='javascript:handleSubmit()'tabindex="3" class="col-sm-4 btn btn-sm btn-primary pull-right" id="log_in_btn">
																<i class="icon-key"></i>
																<fmt:message key="com_intalio_bpms_console_login_loginBtn"/>
															</button>
														</div>
													</fieldset>
												</form>
											</div><!--/widget-main-->
										</div><!--/widget-body-->
									</div><!--/login-box-->
								</div><!--/position-relative-->
							</div>
						</div>
					</div><!--/span-->
				</div><!--/row-->
			</div>
		</div><!--/.fluid-container-->

		<!--basic scripts-->

 
		<!--page specific plugin scripts-->

		<!--inline scripts related to this page-->

		<script type="text/javascript">
		$(document).ready(function(){
			$.ajaxSetup({ cache: false });
			$('#username').focus();
			$('#username').select();
		});
			function show_box(id) {
			 $('.widget-box.visible').removeClass('visible');
			 $('#'+id).addClass('visible');
			}
			$('.login-container').css('margin-top',($(window).height()-360)/2);
			$('.login-container').css('margin-left',($(window).width()-360)/2);
		</script>
	</body>
</html>
