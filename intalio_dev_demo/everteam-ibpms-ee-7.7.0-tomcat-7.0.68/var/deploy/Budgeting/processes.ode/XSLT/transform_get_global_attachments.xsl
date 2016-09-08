<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="2.0" 
	xmlns:tns="http://budgeting.example.everteam.com/Types/Technical"
	xmlns:tms="http://www.intalio.com/BPMS/Workflow/TaskManagementServices-20051109/">
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
	<xsl:template match="/*[local-name()='attachments']">
		<tns:Attachments>
			<xsl:apply-templates />
		</tns:Attachments>
	</xsl:template>
	<xsl:template match="tms:attachment">
		<tns:attachment>
			<tns:mimeType>
				<xsl:value-of select="tms:attachmentMetadata/tms:mimeType" />
			</tns:mimeType>
			<tns:fileName>
				<xsl:value-of select="tms:attachmentMetadata/tms:fileName" />
			</tns:fileName>
			<tns:title>
				<xsl:value-of select="tms:attachmentMetadata/tms:title" />
			</tns:title>
			<tns:description>
				<xsl:value-of select="tms:attachmentMetadata/tms:description" />
			</tns:description>
			<tns:creationDate>
				<xsl:value-of select="tms:attachmentMetadata/tms:creationDate" />
			</tns:creationDate>
			<tns:payloadUrl>
				<xsl:value-of select="tms:payloadUrl" />
			</tns:payloadUrl>
		</tns:attachment>
	</xsl:template>
</xsl:stylesheet>
