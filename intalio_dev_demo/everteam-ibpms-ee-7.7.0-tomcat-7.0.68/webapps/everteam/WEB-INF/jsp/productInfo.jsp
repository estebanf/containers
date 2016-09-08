 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
</head>
<body>
<script type="text/javascript">
function productInfoButtonHeader(taskIcon){
	var iconButton; 
	switch(taskIcon){
		case "refreshProductInfo":
			iconButton = '<a title="Refresh" class="btn btn-sm btn-white table_refresh_icon" onclick=productInfo();><i class="fa fa-refresh"></i></a>';
			return iconButton;
			break;
		case "downloadProductInfo":
			iconButton = '<a title="Download" class="btn btn-sm btn-white " onclick=downlaodProductInfo();><i class="fa fa-download"></i>&nbsp;&nbsp;<fmt:message key="product_info_download"/></a>';
			return iconButton;
			break
		}
}
</script>
<div id="breadcrumbs" class="breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-code-fork"></i>&nbsp;&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_administration"/></li>&nbsp;
		<li class="active">&nbsp;&nbsp;&nbsp;<a class="noDecoration iconCursor" onclick="javascript:productInfo();"><fmt:message key="product_info" /></a></li>
	</ul>
</div>
<div class="page-content">
	<div class="row">
		<div class="col-xs-12">
			<div class="table-responsive">
				<table id="product_info" class="table table-bordered ">
					<thead>
						<tr>
							<th class="nowrap" width="130px"><fmt:message key="product_info_system" /></th>
							<th class="nowrap"><fmt:message key="product_info_details" /></th>
						</tr>
					</thead>
					<tbody id="product_info_rows">
					</tbody>
				</table>
			</div> 
			</form>
		</div>
	</div>
</div
</body>
<script src="scripts/custom/administration/product_info/productInfo.js?version=2676"></script>
<div class="hide">
	<span id="fetchProductInfo"><fmt:message key="product_info_fetch_product_info" /></span>
	<span id="NoProductInfoFound"><fmt:message key="product_info_no_product_info" /></span>
</div>
</html>	
