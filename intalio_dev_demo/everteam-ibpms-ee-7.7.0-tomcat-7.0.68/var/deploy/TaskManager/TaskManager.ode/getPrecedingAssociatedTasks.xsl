<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="2.0"
	xmlns:ns0="http://www.intalio.com/BPMS/Workflow/TaskManagementServices-20051109/" 
	xmlns:b4p="http://www.intalio.com/bpms/workflow/ib4p_20051115"
	exclude-result-prefixes="ns0">

	<xsl:output method="xml" omit-xml-declaration="yes" />

	<xsl:template match="ns0:getAssociatedTasksResponse">
		<b4p:tasks>
			<xsl:for-each select="ns0:task">
				<xsl:if test="(ns0:taskState='READY') and (ns0:adhocPlacement='PRECEDING')">
					<b4p:task>
						<xsl:value-of select="ns0:taskId" />
					</b4p:task>
				</xsl:if>
			</xsl:for-each>
		</b4p:tasks>
	</xsl:template>
</xsl:stylesheet>

