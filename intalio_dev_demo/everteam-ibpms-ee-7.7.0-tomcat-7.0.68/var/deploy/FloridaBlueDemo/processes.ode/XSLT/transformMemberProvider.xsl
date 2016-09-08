<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:SchedulingimplicitPartner="http://floridabluedemo.com/Processes/Scheduling/SchedulingimplicitPartner" xmlns:select_providers="urn:intalio.com:connectors:database:floridabluedemo:select_providersservice" xmlns:tns="http://www.example.org/Demo" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:diag="http://floridabluedemo.com/Processes/Scheduling" xmlns:ns="urn:intalio.com:connectors:database:floridabluedemo:select_primaryservice" xmlns:this="http://floridabluedemo.com/Processes/Scheduling/Scheduling" xmlns:Master_process="http://floridabluedemo.com/Processes/Scheduling/Master_process">
	<xsl:output/>
	<xsl:param name="request"></xsl:param>
	<xsl:variable name="obj">
		<xsl:copy-of select="$request"></xsl:copy-of>
	</xsl:variable>  
  <xsl:template match="/ns:select_primaryResultSet">
     <tns:MemberProvider>
     <tns:CaseId />
      <tns:PrimaryCare><xsl:value-of select="$obj/this:Recieve_member_infoRequest/tns:PrimaryCare" /></tns:PrimaryCare>
      <tns:Member>
        <tns:id><xsl:value-of select="$obj/this:Recieve_member_infoRequest/tns:Member/tns:id" /></tns:id>
        <tns:name><xsl:value-of select="$obj/this:Recieve_member_infoRequest/tns:Member/tns:name" /></tns:name>
        <tns:sex><xsl:value-of select="$obj/this:Recieve_member_infoRequest/tns:Member/tns:sex" /></tns:sex>
        <tns:age><xsl:value-of select="$obj/this:Recieve_member_infoRequest/tns:Member/tns:age" /></tns:age>
        <tns:diabetes><xsl:value-of select="$obj/this:Recieve_member_infoRequest/tns:Member/tns:diabetes" /></tns:diabetes>
        <tns:heartAttack><xsl:value-of select="$obj/this:Recieve_member_infoRequest/tns:Member/tns:heartAttack" /></tns:heartAttack>
        <tns:highBloodPressure><xsl:value-of select="$obj/this:Recieve_member_infoRequest/tns:Member/tns:highBloodPressure" /></tns:highBloodPressure>
      </tns:Member>
      <xsl:apply-templates></xsl:apply-templates>
      <tns:ScheduledDate></tns:ScheduledDate>
      <tns:ScheduledTime></tns:ScheduledTime>
    </tns:MemberProvider>
  </xsl:template>
  <xsl:template match="ns:rows">
  	<xsl:apply-templates></xsl:apply-templates>
  </xsl:template>
  <xsl:template match="ns:row">
      <tns:Providers>
        <tns:id><xsl:value-of select="ns:id" /></tns:id>
        <tns:name><xsl:value-of select="ns:name" /></tns:name>
        <tns:phone><xsl:value-of select="ns:phone" /></tns:phone>
      </tns:Providers>
	</xsl:template>  
</xsl:stylesheet>
