<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" 
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
xmlns:xs="http://www.w3.org/2001/XMLSchema" 
xmlns:tns="http://budgeting.example.everteam.com/Types/Technical" 
>
  <xsl:output method="xml" omit-xml-declaration="yes"/>
  <xsl:template match="/*[local-name()='Get_attachmentsResponse']">
    <root>
    	<xsl:apply-templates />
    </root>
  </xsl:template>
  <xsl:template match="*[local-name()='attachment']">
      <attachment xmlns="">
        <attachmentMetadata>
          <mimeType><xsl:value-of select="tns:mimeType" /></mimeType>
          <fileName><xsl:value-of select="tns:fileName" /></fileName>
          <title><xsl:value-of select="tns:title" /></title>
          <description><xsl:value-of select="tns:description" /></description>
          <creationDate><xsl:value-of select="tns:creationDate" /></creationDate>
        </attachmentMetadata>
        <payloadUrl><xsl:value-of select="tns:payloadUrl" /></payloadUrl>
      </attachment>
  </xsl:template>
</xsl:stylesheet>
