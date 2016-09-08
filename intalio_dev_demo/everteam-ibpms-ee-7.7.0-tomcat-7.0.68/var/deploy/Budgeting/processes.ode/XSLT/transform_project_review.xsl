<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="2.0" xmlns:Variables="http://test.com/xvar/example"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:diag="http://budgeting.example.everteam.com/Processes/Integrations/ProjectReviewAPI"
	xmlns:caller="http://budgeting.example.everteam.com/Processes/Integrations/ProjectReviewAPI/caller"
	xmlns:processimplicitPartner="http://budgeting.example.everteam.com/Processes/Integrations/ProjectReviewAPI/processimplicitPartner"
	xmlns:ns="urn:intalio.com:connectors:database:budgeting:select_projectsservice"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:this="http://budgeting.example.everteam.com/Processes/Integrations/ProjectReviewAPI/process"
	xmlns:tns="http://budgeting.example.everteam.com/Types/Business"
	xmlns:Technical="http://budgeting.example.everteam.com/Types/Technical"
	xmlns:GetSingleDepartment-Process="http://thisproject/Processes/Integrations/GetSingleDepartment/Process"
	xmlns:pa="urn:intalio.com:connectors:database:budgeting:select_project_attachmentsservice">
	<xsl:output />
	<xsl:param name="attachments">
		<!--Parameter defined in mapper as $select_project_attachmentsSelect_project_attachmentsResponse1Msg.parameters 
			variable type: select_project_attachments:select_project_attachmentsOutput -->
		<error>Parameter attachments no initialized</error>
	</xsl:param>
	<xsl:variable name="project_attachments">
		<xsl:copy-of select="$attachments"></xsl:copy-of>
	</xsl:variable>
	<xsl:template match="/ns:select_projectsResultSet">
		<this:EventStartMessageResponse>
			<Technical:Dapartment>
				<tns:DepartmentId></tns:DepartmentId>
				<tns:DeparmentName></tns:DeparmentName>
				<tns:DepartmentDirector></tns:DepartmentDirector>
			</Technical:Dapartment>
			<Technical:Variables>
				<tns:fiscal_year></tns:fiscal_year>
				<tns:target_expenses></tns:target_expenses>
				<tns:ExpectedIncrease></tns:ExpectedIncrease>
				<tns:new_investements></tns:new_investements>
				<tns:TargetSubmision></tns:TargetSubmision>
				<tns:TargetApproval></tns:TargetApproval>
			</Technical:Variables>
			<xsl:apply-templates />
		</this:EventStartMessageResponse>
	</xsl:template>
	<xsl:template match="ns:rows/ns:row">
		<xsl:variable name="reference" select="concat('P',ns:EXCERCISE_ID,'-',ns:DEPARTMENTID,'-',ns:PROJECT_ID)" />
		<Technical:ReviewProjects>
			<Technical:ProjectId>
				<xsl:value-of select="ns:PROJECT_ID" />
			</Technical:ProjectId>
			<Technical:Project>
				<tns:ProjectName>
					<xsl:value-of select="ns:NAME" />
				</tns:ProjectName>
				<tns:ProjectResponsible>
					<xsl:value-of select="ns:RESPONSIBLE" />
				</tns:ProjectResponsible>
				<tns:TargetBudget>
					<xsl:value-of select="ns:TARGET_BUDGET" />
				</tns:TargetBudget>
				<tns:Notes>NOTES</tns:Notes>
			</Technical:Project>
			<Technical:Requirements>
				<tns:LastYearBudget>
					<xsl:value-of select="ns:LASTYEARBUDGET" />
				</tns:LastYearBudget>
				<tns:Budget>
					<xsl:value-of select="ns:BUDGET" />
				</tns:Budget>
				<tns:Priority>
					<xsl:value-of select="ns:PRIORITY" />
				</tns:Priority>
				<tns:StartExecution>
					<xsl:value-of select="ns:STARTEXECUTION" />
				</tns:StartExecution>
				<tns:EndExecution>
					<xsl:value-of select="ns:ENDEXECUTION" />
				</tns:EndExecution>
				<tns:NewProject>
					<xsl:value-of select="ns:NEWPROJECT" />
				</tns:NewProject>
				<tns:Description>
					<xsl:value-of select="ns:DESCRIPTION" />
				</tns:Description>
				<tns:Justification>
					<xsl:value-of select="ns:JUSTIFICATION" />
				</tns:Justification>
			</Technical:Requirements>
			<Technical:ProjectAttachments>
				<xsl:for-each
					select="$project_attachments/pa:select_project_attachmentsResultSet/pa:rows/pa:row[pa:REFERENCE=$reference]">
				<Technical:attachment>
					<Technical:mimeType><xsl:value-of select="pa:MIMETYPE" /></Technical:mimeType>
					<Technical:fileName><xsl:value-of select="pa:FILENAME" /></Technical:fileName>
					<Technical:title><xsl:value-of select="pa:TITLE" /></Technical:title>
					<Technical:description><xsl:value-of select="pa:DESCRIPTION" /></Technical:description>
					<Technical:creationDate><xsl:value-of select="pa:CREATIONDATE" /></Technical:creationDate>
					<Technical:payloadUrl><xsl:value-of select="pa:PAYLOADURL" /></Technical:payloadUrl>
				</Technical:attachment>

				</xsl:for-each>
			</Technical:ProjectAttachments>
		</Technical:ReviewProjects>
	</xsl:template>
</xsl:stylesheet>
