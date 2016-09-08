 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
<link href="style/custom/administration/logging/downloadLogFile.css?version=2676" rel="stylesheet" />
</head>
<body>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>
		<li>&nbsp;&nbsp;&nbsp;<fmt:message key='com_intalio_bpms_module_administration_logging'/></li>
		<li class="active"><a href="#" class="noDecoration" onclick="javascript:getLogFiles();"><fmt:message key='com_intalio_bpms_module_administration_logging_download_logFile'/></a></li>
	</ul>
</div>
<div class="page-content">
	 <div class="col-xs-12">
		<div class="table-responsive">
			<table id="logFileTable" class="table table-bordered dataTable">
				<thead>
					<tr>
						<th><label class="position-relative logClass"><input type="checkbox" class="ace" id="selectAll" onclick="updateCheckbox(this);"><span class="lbl"></span></label></th>
						<th class="noWrap"><fmt:message key="utilities_dowload_table_header_log_file"/></th>
						<th class="noWrap"><fmt:message key="utilities_dowload_table_header_modified_date"/></th>
					</tr>
				</thead>
				<tbody id='logFileTable_rows'>
				</tbody>
			</table>
		</div> 
	</div>
</div>
<span id="selectLogFile" class="hide"><fmt:message key="utilities_select_log_file"/></span>
<span id="downloadLogFileBtn" class="hide"><fmt:message key="utilities_download_file_header_download"/></span>
<script type="text/javascript" src="scripts/custom/administration/logging/downloadLogFile.js?version=2676"></script>
</body>
</html>
