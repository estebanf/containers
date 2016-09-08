<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:Variables="http://test.com/xvar/example" xmlns:AttachmentManagement-process="http://thisproject/Processes/Integrations/AttachmentManagement/process" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:GetTeamMembers-Process="http://thisproject/Processes/Integrations/GetTeamMembers/Process" xmlns:Department_directorimplicitPartner="http://budgeting.example.everteam.com/Processes/Budgeting/Department_directorimplicitPartner" xmlns:diag="http://budgeting.example.everteam.com/Processes/Budgeting" xmlns:requirements="http://www.intalio.com/Budgeting/Webcontents/requirements.html" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:this="http://budgeting.example.everteam.com/Processes/Budgeting/Department_director" xmlns:attachments="http://www.intalio.com/Budgeting/Webcontents/requirements.html/attachments" xmlns:Business="http://budgeting.example.everteam.com/Types/Business" xmlns:tns="http://budgeting.example.everteam.com/Types/Technical" xmlns:Departments="http://budgeting.example.everteam.com/Processes/Budgeting/Departments" xmlns:GetSingleDepartment-Process="http://thisproject/Processes/Integrations/GetSingleDepartment/Process">
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
  <xsl:param name="pos">
    <!--Parameter defined in mapper as $emptyCounter variable type: xs:unsignedInt-->
    <error>Parameter pos no initialized</error>
  </xsl:param>
  <xsl:template match="/Business:RequirementDefinisionOutput">
  	<xsl:apply-templates />
  </xsl:template>
  <xsl:template match="Business:Projects[position()!=$pos]" />
  <xsl:template match="Business:Projects[position()=$pos]" >
  	<xsl:copy-of select="." />
  </xsl:template>
</xsl:stylesheet>
