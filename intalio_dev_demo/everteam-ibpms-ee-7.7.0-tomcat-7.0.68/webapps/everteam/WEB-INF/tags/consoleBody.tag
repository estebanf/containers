<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="intalio" uri="http://www.intalio.com/tagfiles"%>
<%@ taglib prefix="custom" uri="http://bpms.intalio.com/jsp/tags"%>

<%@ include file="/WEB-INF/jsp/siteHeader.jsp" %>

<fmt:message key="com_intalio_bpms_webreport_pageTitle"/>

<!-- footer -->
<span>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_webreport_pageFooter_poweredByLbl" />&nbsp;&nbsp;
<a href="http://www.intalio.com"><span style="color: #3082A8"><fmt:message key="com_intalio_bpms_webreport_pageFooter_poweredByValue" /></span></a>
<fmt:message key="com_intalio_bpms_webreport_versionInfo">
<c:choose>
<c:when test="${!empty version && !empty build}" >
<fmt:param value="${version}"/>
<fmt:param value="${build}"/>
</c:when> 
<c:otherwise>
<fmt:param value="unknown"/>
<fmt:param value="unknown"/>
</c:otherwise>
</c:choose>
</fmt:message>
<a href="http://bpms.intalio.com"><span style="color: #3082A8"><fmt:message key="com_intalio_bpms_webreport_pageFooter_featureBugRequest"/></span></a>
&nbsp;&nbsp;<a href="javascript:showpopuppage(false, 'versions',null);"><fmt:message key="com_intalio_bpms_webreport_pageFooter_versionDetails"/></a>
</span>

<!-- popup b -->
<div id="divcontainer" class="messagediv">
</div>
<div id="divContent" class="messageDivContent">
	<input type="hidden" id="refreshAfterClose" value="false">
	<table cellpadding="0" cellspacing="0" border="0" style="width: 100%; height: 100%; border: 1px solid #777777;">
		<tr>
			<td align="right" style="height: 20px; background-color: #D7D7D7; padding-right: 3px;">
				<img src="images/close_black.gif" style="width: 14px; height: 14px;" onclick="closepopuppage();"/>
			</td>
		</tr>
		<tr>
			<td>
				<iframe src="#" class="messageiframe" name="iframecontainer" id="iframecontainer" frameborder="0" scrolling="auto"><html><head></head><body bgcolor="#FFFFFF">&nbsp;</body></html></iframe>
			</td>
		</tr>
	</table>
</div>
<!-- popup e -->

