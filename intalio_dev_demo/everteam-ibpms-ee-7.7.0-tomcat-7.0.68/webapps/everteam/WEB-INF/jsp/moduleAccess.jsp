 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>
<!DOCTYPE html>
<html lang="en">
<head>
<script src="scripts/custom/moduleaccess/moduleaccess.js?version=2676"></script>
<link href="style/custom/moduleaccess/moduleaccess.css?version=2676" rel="stylesheet" />
<!--[if IE 8]>
<link href="style/custom/moduleaccess/moduleaccess-ie.css?version=2676" rel="stylesheet" />
<![endif]-->
<!--[if IE 9]>
<link href="style/custom/moduleaccess/moduleaccess-ie.css?version=2676" rel="stylesheet" />
<![endif]-->
</head>
<body>
	<div id="breadcrumbs" class="breadcrumbs">
		<ul class="breadcrumb">
			<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;<li><fmt:message key="com_intalio_bpms_module_administration_access_control" /></li>
			<li class="active"><a href="#" class="noDecoration" onclick="javascript:selectMenuAndChangepage(this,'module_access','moduleAccess.htm');"><fmt:message key="com_intalio_bpms_module_administration_access_control_modules" /></a></li>
		</ul>
	</div>
<div class="page-content">
	<div class="row-fluid" id="modulesPage">				 													
		<div class="dd " id="rolesComboLi" >
			<ol class="dd-list" >
				<li class="dd-item dd2-item" >
					<div class="dd2-content">		
						<select id="rolesCombo" class="chosen-select center" style="display: none;" >
							<option value="select"><fmt:message key="com_intalio_module_access_select_role" /></option>	
                            </hr>							
						</select>
						<span id="collapseButton" class="hide"><a  href="#" class="noDecoration" onclick="collapseAll();" title="Collapse All"><i class="fa fa-minus"></i></a></span>
						<span id="expandButton" class="hide"><a  href="#" class="noDecoration" onclick="expandAll();" title="Expand All"><i class="fa fa-plus"></i></a></span>  
					</div>
				</li>
			</ol></div>
		    <div class="dd">						
				<ol class="dd-list" id="module-list">							  
				</ol>
				<div class="updateButton hide"><br><center><a onclick="javascript:updateAccess();"class="btn btn-primary btn-sm ">Update</a></center></div>
		    </div>
	</div>
</div>
<div id="scroll-up-btn" class="hide" data-spy="affix">
<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
<i class="fa fa-angle-double-up fa-only bigger-110"></i></a>
</div>

<div id="noChild" class="hide">
	<li class='dd-item dd2-item'>
		<div class="dd-handle dd2-handle">
			<i class="noChildIcon"></i>
		</div>
		<div class="dd2-content">
			<span class="moduleName"></span>
			<label id="checkboxId" class="pull-right inline">
				<input type="checkbox" class="ace ace-switch ace-switch-5">
				<span class="lbl"></span>
			</label>
		</div>
	</li>
</div>

<div id="hasChild" class="hide">
	<li class='dd-item dd2-item'>
		<div class="dd-handle dd2-handle">
			<i class="hasChildIcon"></i>
		</div>
		<div class="dd2-content">
			<a style="text-decoration:none;" data-toggle="collapse" class="accordion-toggle">
				<i class="icon"></i>
			</a> &nbsp;
			<span class="moduleName"></span>
			<label id="checkboxId" class="pull-right inline">
				<input type="checkbox" class="ace ace-switch ace-switch-5">
				<span class="lbl"></span>
			</label>
		</div>
		<div class="accordion-body collapse" style="height: auto;">
			<ol class="dd-list">
			</ol>
		<div>
	</li>
</div>

</body>
</html>
