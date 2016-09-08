<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:caller="http://budgeting.example.everteam.com/Processes/Integrations/AttachmentManagement/caller" xmlns:processimplicitPartner="http://budgeting.example.everteam.com/Processes/Integrations/AttachmentManagement/processimplicitPartner" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:this="http://budgeting.example.everteam.com/Processes/Integrations/AttachmentManagement/process" xmlns:select_attachmetns="urn:intalio.com:connectors:database:budgeting:select_attachmetnsservice" xmlns:tns="http://budgeting.example.everteam.com/Types/Technical" xmlns:diag="http://budgeting.example.everteam.com/Processes/Integrations/AttachmentManagement" xmlns:ns="urn:intalio.com:connectors:database:budgeting:insert_attachmentservice">
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
  <xsl:template match="select_attachmetns:select_attachmetnsResultSet">
  	<xsl:apply-templates />
  </xsl:template>
  <xsl:template match="*[local-name()='rows']">
    <root>
    <xsl:apply-templates />
    </root>
  </xsl:template>
  <xsl:template match="*[local-name()='row']">
  <tns:attachment>
        <tns:mimeType><xsl:value-of select="*[local-name()='MIMETYPE']" /></tns:mimeType>
        <tns:fileName><xsl:value-of select="*[local-name()='FILENAME']" /></tns:fileName>
        <tns:title><xsl:value-of select="*[local-name()='TITLE']" /></tns:title>
        <tns:description><xsl:value-of select="*[local-name()='DESCRIPTION']" /></tns:description>
        <tns:creationDate><xsl:value-of select="*[local-name()='CREATIONDATE']" /></tns:creationDate>
        <tns:payloadUrl><xsl:value-of select="*[local-name()='PAYLOADURL']" /></tns:payloadUrl>
      </tns:attachment>
  
  </xsl:template>
</xsl:stylesheet>
