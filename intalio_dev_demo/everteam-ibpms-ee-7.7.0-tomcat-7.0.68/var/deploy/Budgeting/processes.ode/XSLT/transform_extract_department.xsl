<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="2.0"
	xmlns:Department="http://budgeting.example.everteam.com/Processes/Phases/DepartmentsRequirements/Department"
	xmlns:Master-budgeting_management="http://thisproject/Processes/Core/Master/budgeting_management"
	xmlns:GetDepartments-process="http://thisproject/Processes/Integrations/GetDepartments/process"
	xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:DepartmentRequirementCollection-Depa="http://thisproject/Processes/Scenarios/DepartmentRequirementCollection/Department"
	xmlns:Business="http://budgeting.example.everteam.com/Types/Business"
	xmlns:tns="http://budgeting.example.everteam.com/Types/Technical"
	xmlns:diag="http://budgeting.example.everteam.com/Processes/Phases/DepartmentsRequirements"
	xmlns:this="http://budgeting.example.everteam.com/Processes/Phases/DepartmentsRequirements/Departments"
	xmlns:DepartmentsimplicitPartner="http://budgeting.example.everteam.com/Processes/Phases/DepartmentsRequirements/DepartmentsimplicitPartner"
	xmlns:Master_process="http://budgeting.example.everteam.com/Processes/Phases/DepartmentsRequirements/Master_process">
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
	<xsl:param name="counter">
		<error>Parameter counter no initialized</error>
	</xsl:param>
	<xsl:template match="/GetDepartments-process:Recieve_requestResponse">
		<xsl:apply-templates />
	</xsl:template>
	<xsl:template match="Business:Department[position()!=$counter]">
	</xsl:template>
	<xsl:template match="Business:Department[position()=$counter]">
		<department>
			<Business:DepartmentId><xsl:value-of select="Business:DepartmentId" /></Business:DepartmentId>
			<Business:DeparmentName><xsl:value-of select="Business:DeparmentName" /></Business:DeparmentName>
			<Business:DepartmentDirector><xsl:value-of select="Business:DepartmentDirector" /></Business:DepartmentDirector>	
		</department>
	</xsl:template>
</xsl:stylesheet>
