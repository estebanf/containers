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
	<link href="style/custom/preferences/user_preferences.css?version=2676" rel="stylesheet" />
	<link href="style/plugin/bootstrap-editable.css" rel="stylesheet" />
	<!--[if IE 8]><html class="no-js lt-ie9"><![endif]-->
	<!--[if gt IE 8]><!-->
	<html class="no-js"><!--<![endif]-->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
</head>
<body>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><a class='noDecoration' onclick=javascript:selectMenuAndChangepage(this,'profile','userPreferences.htm')><i class="fa fa-user"></i>&nbsp;&nbsp;<fmt:message key="user_preferences_profile_preferences"/></a></li>
	</ul>
</div>
<div class="page-content">
	<div class="user-profile row">
		<div class="col-xs-12 col-sm-3 center">
			<div class="profile-pic-div">
				<span class="profile-picture">
					<img id="avatar" class=" img-responsive" alt="" src=""/>
				</span>
				<div class="space-4"></div>
				<div class="width-80 label label-info label-xlg arrowed-in arrowed-in-right">
					<div class="inline position-relative">
						<a nohref class="user-title-label dropdown-toggle" data-toggle="dropdown">
							<span class="white" id="imageUserId"></span>
						</a>
					</div>
				</div>
			</div>

		</div>

		<div class="col-xs-12 col-sm-9">
			<span class='pull-right'><select style='width:325px;margin-top:12px;' id='otherUsers' onchange='javascript:updateUserProfile(this.value)' placeholder='Search User for Profile' ></select>
			</span>
			<div class="">
				<h4 class="header smaller grey">
					<fmt:message key="user_preferences_profile"/>
				</h4>
				<div class="col-xs-12 col-sm-6">
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_salutation"/></div>

						<div class="profile-info-value">
							<span class="editable-click editable-empty" id="salutation"></span>
							<select id="salutationSelect" placeholder="Choose Salutation" class='hide'></select>
						</div>
						
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_name"/> </div>

						<div class="profile-info-value">
							<span class="" id="userDisplayName"></span>
						</div>
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_user_name"/></div>

						<div class="profile-info-value">
							<span class="" id="userId"></span>
						</div>
					</div>

				<div class="additional_info">
					<div class="additional_info_head"><fmt:message key="user_prefrences_additional_info"/> &nbsp;&nbsp;&nbsp;<a class="noDecoration" href="#moreInfo" data-toggle="collapse"><i class="fa fa-angle-down"></i></a></div>
					<div id="moreInfo" class="in" style="height: auto;">
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_dob"/> </div>

						<div class="profile-info-value">
							<span class="editable-date editable-click" id="dob" ></span>
						</div>
					</div>

					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_gender"/></div>

						<div class="profile-info-value">
							<span class="editable-click editable-empty" id="gender"></span>
							<select id="genderSelect" placeholder="Choose Gender" class='hide'></select>
						</div>
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_skill_set"/> </div>

						<div class="profile-info-value">
							<span class="editable-click editable-empty" id="skills"></span>
							<select id="skillsSelect" placeholder="Add Skills" class="hide"></select>
						</div>
					</div>
					</div>
				</div>
				</div>
				<div class="col-xs-12 col-sm-6">
					<div class="profile-info-row">
						<div class="profile-info-name"><fmt:message key="user_preferences_last_login"/></div>

						<div class="profile-info-value">
							<span class="" id="lastLogin"></span>
						</div>
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name"> <fmt:message key="user_preferences_manager"/> </div>

						<div class="profile-info-value">
							<span class="" id="manager"></span>
						</div>
					</div>
					<div class="profile-info-row">
						<div class="profile-info-name verticalAlignTop"> <fmt:message key="user_preferences_roles"/> </div>

						<div class="profile-info-value">
							<span class="" id="assignedRoles"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="space-12"></div>
	<h4 class="header smaller grey contactInfo" href="#contactInfoDiv" data-toggle="collapse" onclick="updateIcon(this);">
		<fmt:message key="user_preferences_contact"/> &nbsp;&nbsp;&nbsp;<a class="noDecoration"><i class="fa fa-angle-down"></i></a>
	</h4>
	<div id="contactInfoDiv" class="in">
	<span id="contactErrorMsg" class="text-danger hide"></span>
	<div class="user-profile row">
		<div class="col-xs-12 col-sm-6">
			<div class="">
				
				<div class="profile-info-row">
					<div class="profile-info-name"> <fmt:message key="user_preferences_email"/></div>

					<div class="profile-info-value">
						<span class="editable" id="email"></span>
					</div>
				</div>

				<div class="profile-info-row">
					<div class="profile-info-name"> <fmt:message key="user_preferences_email_secondary"/> </div>

					<div class="profile-info-value">
						<span class="editable editable-click" id="secondaryEmail"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-6">
			<div class="">
				<div class="profile-info-row">
					<div class="profile-info-name"> <fmt:message key="user_preferences_phone_no"/> </div>

					<div class="profile-info-value">
						<span class="" id="phone"></span>
					</div>
				</div>

				<div class="profile-info-row">
					<div class="profile-info-name"> <fmt:message key="user_preferences_mobile_no"/> </div>

					<div class="profile-info-value">
						<span class="" id="mobile"></span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="additional_info_head" href="#addressInfo" data-toggle="collapse" onclick="updateIcon(this);"><fmt:message key="user_preferences_address"/> &nbsp;&nbsp;&nbsp;<a  class="noDecoration"><i class="fa fa-angle-down"></i></a></div>
	<div id="addressInfo" class="in">
	<div class="user-profile row">
		<div class="col-xs-12 col-sm-6">
			<div class="profile-info-row">
				<div class="profile-info-name"> <fmt:message key="user_preferences_mailing_address"/> </div>

				<div class="profile-info-value">
					<span class="editable editable-click" id="address"></span>
				</div>
			</div>

			<div class="profile-info-row">
				<div class="profile-info-name"><fmt:message key="user_preferences_address_street"/></div>

				<div class="profile-info-value">
					<span class="editable editable-click" id="street"></span>
				</div>
			</div>
			<div class="profile-info-row">
				<div class="profile-info-name"> <fmt:message key="user_preferences_address_city"/> </div>

				<div class="profile-info-value">
					<span class="editable editable-click" id="city"></span>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-6">
			<div class="profile-info-row">
				<div class="profile-info-name"> <fmt:message key="user_preferences_address_state"/> </div>

				<div class="profile-info-value">
					<span class="editable editable-click" id="state"></span>
				</div>
			</div>
			<div class="profile-info-row">
				<div class="profile-info-name"> <fmt:message key="user_preferences_address_postal_code"/> </div>

				<div class="profile-info-value">
					<span class="editable editable-click" id="zip"></span>
				</div>
			</div>
			<div class="profile-info-row">
				<div class="profile-info-name"> <fmt:message key="user_preferences_address_country"/> </div>

				<div class="profile-info-value">
					<span class="editable-click editable-empty" id="country"></span>
					<select id="countrySelect" placeholder="Choose Country" class="hide"></select>
				</div>
			</div>
		</div>
	</div>
	</div>
	</div>

	<div class="space-12"></div>
	<h4 class="header smaller grey prefInfo" href="#preferencesDiv" data-toggle="collapse" onclick="updateIcon(this);">
		<fmt:message key="user_preferences"/> &nbsp;&nbsp;&nbsp;<a class="noDecoration" ><i class="fa fa-angle-down"></i></a>
	</h4>
	<div id="preferencesDiv" class="in">
	<div class="">
		<table class="table table-borderless">
			<tr>
				<td>
					<fmt:message key="user_preferences_fixed_header"/>
				</td>
				<td>
				<label class="inline">
					<input class="ace" type="checkbox" id="ace-settings-header">
					<span class="lbl"></span>
				</label>
				</td>
				<td>
					<fmt:message key="user_preferences_top_menu"/>
				</td>
				
				<td>
				<label class="inline">
					<input class="ace" type="checkbox" id="ace-settings-sidebar" onclick="">
					<span class="lbl"></span>
				</label>
				</td>
				<td>
					<fmt:message key="user_preferences_font_style"/>
				</td>
				<td width="25%">
					<select id="font-style"></select>
				</td>
				
			</tr>
			<tr>
				<td>
					<fmt:message key="user_preferences_date_format"/>
				</td>
				<td width="20%">
					<select class="date-format-select" id="date-format-select"></select>
				</td>
				<td>
					<span>
						<fmt:message key="user_preferences_theme"/> 
					</span>
				</td>
				<td width="20%">
					<div class="ace-settings-item">
									<div class="pull-left">
										<select id="skin-color">
											<option data-skin="no-skin" value="#00ae8d">#00ae8d</option>
											<option data-skin="skin-1" value="#222A2D">#222A2D</option>
											<option data-skin="skin-2" value="#C6487E">#0B2F3A</option>
											<option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
										</select>
									</div>
								</div>

				</td>
				<td colspan="2">
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<button type="button" class="btn btn-primary btn-sm floatRight" onclick="applyPreferences();"><fmt:message key="user_preferences_save"/> </button>
				</td>
			</tr>
		</table>
		
	</div>
</div>
<div id="editablebuttons" class="editable-buttons hide"><button class="btn btn-primary btn-sm editable-submit" type="button" onclick=""><i class="fa fa-check"></i></button><button class="btn btn-default btn-sm editable-cancel" type="button"><i class="fa fa-times "></i></button></div>
<div class='hide'>
	<span id="emailError"><fmt:message key="user_preferences_email_error_msg"/></span>
	<span id="numberError"><fmt:message key="user_preferences_number_error_msg"/></span>
	<span id="imageSizeMsg"><fmt:message key="user_preferences_image_size_error_msg"/></span>
	<span id="imageTypeMsg"><fmt:message key="user_preferences_image_type_error_msg"/></span>
	<span id="saveMsg"><fmt:message key="user_preferences_save_message"/></span>
	<span id="uploadFailureMsg"><fmt:message key="user_preferences_avatar_upload_fail"/></span>

	<span class='hide' id="salutationId"></span>
	<span class='hide' id="genderId"></span>
	<span class='hide' id="countryId"></span>
</div>
<script type="text/javascript" src="scripts/plugin/x-editable/bootstrap-editable.min.js"></script>
<script type="text/javascript" src="scripts/plugin/x-editable/ace-editable.min.js"></script>
<script type="text/javascript" src="scripts/plugin/workflow/moment.min.js"></script>
<script type="text/javascript" src="scripts/custom/preferences/userProfile.js?version=2676"></script>
<script type="text/javascript" src="scripts/custom/preferences/userPreferences.js?version=2676"></script>
</body>
</html>
