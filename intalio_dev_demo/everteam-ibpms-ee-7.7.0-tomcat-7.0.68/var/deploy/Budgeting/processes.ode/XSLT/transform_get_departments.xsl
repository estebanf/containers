<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:processimplicitPartner="http://budgeting.example.everteam.com/Processes/Integrations/GetDepartments/processimplicitPartner" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns="urn:intalio.com:connectors:database:budgeting:select_departmentsservice" xmlns:tns="http://budgeting.example.everteam.com/Types/Business" xmlns:this="http://budgeting.example.everteam.com/Processes/Integrations/GetDepartments/process" xmlns:Technical="http://budgeting.example.everteam.com/Types/Technical" xmlns:diag="http://budgeting.example.everteam.com/Processes/Integrations/GetDepartments" xmlns:Caller="http://budgeting.example.everteam.com/Processes/Integrations/GetDepartments/Caller">
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
  <xsl:template match="/ns:select_departmentsResultSet">
    <this:Recieve_requestResponse>
    	<xsl:apply-templates />
    </this:Recieve_requestResponse>
  </xsl:template>
  <xsl:template match="ns:rows">
    <xsl:apply-templates />
  </xsl:template>
  <xsl:template match="ns:row">
	<tns:Department>
	  <tns:DepartmentId><xsl:value-of select="ns:DEPARTMENT_ID" /></tns:DepartmentId>
	  <tns:DeparmentName><xsl:value-of select="ns:DEPARTMENT_NAME" /></tns:DeparmentName>
	  <tns:DepartmentDirector><xsl:value-of select="ns:DIRECTOR" /></tns:DepartmentDirector>
	</tns:Department>
  </xsl:template>
</xsl:stylesheet>
