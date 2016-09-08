 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="intalio" uri="http://www.intalio.com/tagfiles" %>
<%@ taglib prefix="local" tagdir="/WEB-INF/tags" %>
<%@ page info="Business Activity Monitoring" %>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">
<head>
<link rel="stylesheet" href="style/custom/BAM/bam_reports.css?version=2676" type="text/css"/>
</head>
<body>
<div id="breadcrumbs" class="breadcrumbs">
    <ul class="breadcrumb">
        <li><i class="menu-icon fa fa-bar-chart-o"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_bam"/></li>
        &nbsp;<li class="active"><a href="#" onclick="javascript:selectMenuAndChangepage(this,'reports','reports.htm')" class="noDecoration"><fmt:message key="com_intalio_bpms_module_bam_pre_defined_reports"/></a></li>
    </ul>
</div>
<div class="page-content">
	<div class="col-xs-12" id="preDefinedReportsTableDiv">
		<div class="table-responsive">
			<table id="dataGridBody" class="table table-striped table-bordered table-hover">
				<thead>
					<tr id="dataGridHeader">
						<th><fmt:message key="com_intalio_bpms_module_bam_pre_header_dashboard"/></th>
						<th><fmt:message key="com_intalio_bpms_module_bam_pre_header_description"/></th>
						<th><fmt:message key="com_intalio_bpms_module_bam_pre_header_project"/></th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${reports}" var="report">
					<c:set var="tmpReportId" value="${report.reportId}"/>
					<c:set var="reportId" value="${fn:substringBefore(tmpReportId, '.rptdesign')}" />
					<tr>
						<c:choose>
						<c:when test="${report.assemblyVersion == 0}">
								<td><a class="noDecoration" onclick="javascript:showReport(this);" href="#" data="webreport?report=${report.reportId}&assembly=${report.assembly}&version=0&component=${report.component}">${reportId}</a></td>
							</c:when>
							<c:otherwise>
								<td><a class="noDecoration" onclick="javascript:showReport(this);" href="#" data="webreport?report=${report.reportId}&assembly=${report.assembly}&version=${report.assemblyVersion}&component=${report.component}">${reportId}</a></td>
							</c:otherwise>
						</c:choose>
						<td>${report.description}</td>
						<c:choose>
						<c:when test="${report.span > 1}">
							<c:choose>
								<c:when test="${report.assemblyVersion == 0}">
									<td><span rowspan="${report.span}">${report.assembly} [v1]</span></td>
								</c:when>
								<c:otherwise>
									<td><span rowspan="${report.span}">${report.assembly} [v${report.assemblyVersion}]</span></td>
								</c:otherwise>
							</c:choose>
						</c:when>
						<c:otherwise>
							<c:choose>
								<c:when test="${report.assemblyVersion == 0}">
									<td>${report.assembly} [v1]</td>
								</c:when>
								<c:otherwise>
									<td>${report.assembly} [v${report.assemblyVersion}]</td>
								</c:otherwise>
							</c:choose>
						</c:otherwise>
						</c:choose>
					</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
<iframe src="" class="hide" name="bamReports" frameborder="0" id="bamReports" scrolling="auto" width="100%"/>
</div>
<div class='hide'>
<span id="NoPreRecordsMsg"><fmt:message key="bam_pre_defined_no_reocrds_found"/></span>
<span id="reportsPageInfo"><fmt:message key="bam_pre_defined_reports_page_info"/></span>

</div>
<script type="text/javascript" src="scripts/custom/BAM/bam_reports.js?version=2676"></script>
</body>
</html>

