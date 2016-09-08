<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:tns="http://www.example.org/Demo" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ns="urn:intalio.com:connectors:database:floridabluedemo:memberservice" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:this="http://floridabluedemo.com/Processes/Monitor/process" xmlns:diag="http://floridabluedemo.com/Processes/Monitor" xmlns:business_database="http://floridabluedemo.com/Processes/Monitor/business_database">
  <!--XSL Skeleton generated on Mon Mar 21 09:13:57 EDT 2016
 for F/FloridaBlueDemo/Processes/Monitor.bpm
   pool:process 
   activity: Transform Member data
 Complete doXslTransform: bpel:doXslTransform("../XSLT/transformMember.xsl", $nsStart2Msg.parameters)
 Input document as defined in the mapper: $nsStart2Msg.parameters-->
  <xsl:output/>
  <!--No parameters are currently passed to doXslTransform.-->
  <xsl:template match="/ns:memberResultSet/ns:rows/ns:row[1]">
    <tns:Member>
      <tns:id><xsl:value-of select="ns:id" /></tns:id>
      <tns:name><xsl:value-of select="ns:name" /></tns:name>
      <tns:sex><xsl:choose><xsl:when test="upper-case(ns:sex) = 'M'">Male</xsl:when><xsl:otherwise>Female</xsl:otherwise></xsl:choose></tns:sex>
      <tns:age><xsl:value-of select="ns:age" /></tns:age>
      <tns:diabetes><xsl:value-of select="ns:diabetes" /></tns:diabetes>
      <tns:heartAttack><xsl:value-of select="ns:heartattack" /></tns:heartAttack>
      <tns:highBloodPressure><xsl:value-of select="ns:highbloodpressure" /></tns:highBloodPressure>
      <tns:pid></tns:pid>
    </tns:Member>
  </xsl:template>
</xsl:stylesheet>
