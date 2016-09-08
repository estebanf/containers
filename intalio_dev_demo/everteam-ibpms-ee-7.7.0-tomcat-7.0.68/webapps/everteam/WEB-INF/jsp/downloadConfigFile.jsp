 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
<link href="style/custom/utilities/downloadConfigFile.css?version=2676" rel="stylesheet" />
</head>
<body>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
	<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>
		<li>&nbsp;<fmt:message key='com_intalio_bpms_module_administration_utilities'/>&nbsp;</li>
		<li class="active">&nbsp;<a href="#" class="noDecoration" onclick="javascript:getConfigFiles();"><fmt:message key='com_intalio_bpms_module_administration_utilities_download_config_file'/></a></li>
	</ul>
</div>
<div class="page-content">
	<div class="col-xs-12">
		<div class="table-responsive" >
			<table id="configFileTable" class="table table-striped table-bordered table-hover dataTable">
				<thead>
					<tr>
						<th><label class="position-relative logClass"><input type="checkbox" class="ace" id="selectAll" onclick="updateCheckbox(this);"><span class="lbl"></span></label></th>
						<th class="noWrap"><fmt:message key="utilities_dowload_table_header_config_file"/></th>
					</tr>
				</thead>
				<tbody id='configFileTable_rows'>
				</tbody>
			</table>
		</div> 
	</div>
</div>
<span id="selectConfigFile" class="hide"><fmt:message key="utilities_select_config_file"/></span>
<span id="downloadConfigFileBtn" class="hide"><fmt:message key="utilities_download_file_header_download"/></span>
<span id="fetchConfigFile" class="hide"><fmt:message key="utilities_dowload_fetch_config_file"/></span>
<script type="text/javascript" src="scripts/custom/utilities/downloadConfigFile.js?version=2676"></script>
</body>
</html>
