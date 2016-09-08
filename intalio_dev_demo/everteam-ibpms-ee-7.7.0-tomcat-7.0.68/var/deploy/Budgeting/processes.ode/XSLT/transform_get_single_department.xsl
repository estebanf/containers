<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:ProcessimplicitPartner="http://budgeting.example.everteam.com/Processes/Integrations/GetSingleDepartment/ProcessimplicitPartner" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="http://budgeting.example.everteam.com/Types/Business" xmlns:Technical="http://budgeting.example.everteam.com/Types/Technical" xmlns:this="http://budgeting.example.everteam.com/Processes/Integrations/GetSingleDepartment/Process" xmlns:diag="http://budgeting.example.everteam.com/Processes/Integrations/GetSingleDepartment" xmlns:Caller="http://budgeting.example.everteam.com/Processes/Integrations/GetSingleDepartment/Caller" xmlns:ns="urn:intalio.com:connectors:database:budgeting:select_single_departmentservice">
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
  <xsl:template match="/ns:select_single_departmentResultSet">
    <this:Recieve__requestResponse>
    	<xsl:apply-templates />
    </this:Recieve__requestResponse>
  </xsl:template>
  <xsl:template match="ns:rows/ns:row">
	  <tns:DepartmentId><xsl:value-of select="ns:DEPARTMENT_ID" /></tns:DepartmentId>
	  <tns:DeparmentName><xsl:value-of select="ns:DEPARTMENT_NAME" /></tns:DeparmentName>
	  <tns:DepartmentDirector><xsl:value-of select="ns:DIRECTOR" /></tns:DepartmentDirector>
  </xsl:template>
</xsl:stylesheet>
