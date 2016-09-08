<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:ProcessimplicitPartner="http://budgeting.example.everteam.com/Processes/Integrations/GetTeamMembers/ProcessimplicitPartner" xmlns:ns="http://tempo.intalio.org/security/OrganizationInfoService" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="http://tempo.intalio.org/security/tokenService/" xmlns:Business="http://budgeting.example.everteam.com/Types/Business" xmlns:this="http://budgeting.example.everteam.com/Processes/Integrations/GetTeamMembers/Process" xmlns:diag="http://budgeting.example.everteam.com/Processes/Integrations/GetTeamMembers" xmlns:Caller="http://budgeting.example.everteam.com/Processes/Integrations/GetTeamMembers/Caller">
  <!--XSL Skeleton generated on Tue Dec 08 15:16:15 EST 2015
 for F/Budgeting/Processes/Integrations/GetTeamMembers.bpm
   pool:Process
   activity: Reply
 Complete doXslTransform: bpel:doXslTransform("../../XSLT/transform_team_members.xsl", $nsGetSubordinatesResponse1Msg.parameters)
 Input document as defined in the mapper: $nsGetSubordinatesResponse1Msg.parameters-->
  <xsl:output/>
  <!--No parameters are currently passed to doXslTransform.-->
  <xsl:template match="/ns:getSubordinatesResponse">
    <this:Recieve_requestResponse>
    	<xsl:apply-templates />
    </this:Recieve_requestResponse>
  </xsl:template>
  <xsl:template match="ns:return" >
      <Business:Member>
        <Business:DisplayName><xsl:value-of select="ns:displayName" /></Business:DisplayName>
        <Business:username><xsl:value-of select="concat(ns:realm,'\',ns:name)" /></Business:username>
      </Business:Member>
  </xsl:template>
</xsl:stylesheet>
