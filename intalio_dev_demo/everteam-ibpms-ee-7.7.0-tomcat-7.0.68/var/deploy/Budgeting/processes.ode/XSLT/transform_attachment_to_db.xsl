<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:caller="http://budgeting.example.everteam.com/Processes/Integrations/AttachmentManagement/caller" xmlns:processimplicitPartner="http://budgeting.example.everteam.com/Processes/Integrations/AttachmentManagement/processimplicitPartner" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:this="http://budgeting.example.everteam.com/Processes/Integrations/AttachmentManagement/process" xmlns:tns="http://budgeting.example.everteam.com/Types/Technical" xmlns:diag="http://budgeting.example.everteam.com/Processes/Integrations/AttachmentManagement" xmlns:ns="urn:intalio.com:connectors:database:budgeting:insert_attachmentservice">
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
  <xsl:param name="pos">
    <!--Parameter defined in mapper as $attachmentCounter variable type: xs:unsignedInt-->
    <error>Parameter pos no initialized</error>
  </xsl:param>
  <xsl:template match="/tns:Attachments">
    <tns:Attachment>
      <tns:mimeType><xsl:value-of select="tns:attachment[position()=$pos]/tns:mimeType" /></tns:mimeType>
      <tns:fileName><xsl:value-of select="tns:attachment[position()=$pos]/tns:fileName" /></tns:fileName>
      <tns:title><xsl:value-of select="tns:attachment[position()=$pos]/tns:title" /></tns:title>
      <tns:description><xsl:value-of select="tns:attachment[position()=$pos]/tns:description" /></tns:description>
      <tns:creationDate><xsl:value-of select="tns:attachment[position()=$pos]/tns:creationDate" /></tns:creationDate>
      <tns:payloadUrl><xsl:value-of select="tns:attachment[position()=$pos]/tns:payloadUrl" /></tns:payloadUrl>
    </tns:Attachment>
  </xsl:template>
</xsl:stylesheet>
