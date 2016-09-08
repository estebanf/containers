<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	version="2.0" 
	xmlns:Variables="http://test.com/xvar/example" 
	xmlns:formless-ytivitca="http://www.intalio.com/formless/attachments" 
	xmlns:budget_review1="http://www.intalio.com/Budgeting/Webcontents/budget_review.html" 
	xmlns:budget_review="http://www.intalio.com/Budgeting/Webcontents/budget_review.html/attachments" 
	xmlns:GetDepartments-process="http://thisproject/Processes/Integrations/GetDepartments/process" 
	xmlns:AttachmentManagement-process="http://thisproject/Processes/Integrations/AttachmentManagement/process" 
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xmlns:PDFGeneration-BudgetProcess="http://budgeting.example.everteam.com/Processes/Integrations/PDFGeneration/BudgetProcess" 
	xmlns:attachments="http://www.intalio.com/Budgeting/Webcontents/index.html/attachments" 
	xmlns:diag="http://budgeting.example.everteam.com/Processes/Budgeting" 
	xmlns:this="http://budgeting.example.everteam.com/Processes/Budgeting/Chief_financial_officer" 
	xmlns:tns="http://www.intalio.com/Budgeting/Webcontents/index.html" 
	xmlns:xs="http://www.w3.org/2001/XMLSchema" 
	xmlns:Chief_financial_officerimplicitPartner="http://budgeting.example.everteam.com/Processes/Budgeting/Chief_financial_officerimplicitPartner" 
	xmlns:Department_director="http://budgeting.example.everteam.com/Processes/Budgeting/Department_director" 
	xmlns:Business="http://budgeting.example.everteam.com/Types/Business" 
	xmlns:formless="http://www.intalio.com/formless" 
	xmlns:Technical="http://budgeting.example.everteam.com/Types/Technical">
  <!--XSL Skeleton generated on Tue Jan 19 16:24:53 EST 2016
 for F/Budgeting/Processes/Budgeting.bpm
   pool:Chief financial officer
   activity: Send budget file to CFO
 Complete doXslTransform: bpel:doXslTransform("../XSLT/transform_pdf_to_form_attachment.xsl", $pDFGeneration-BudgetProcessStartResponse1Msg.body)
 Input document as defined in the mapper: $pDFGeneration-BudgetProcessStartResponse1Msg.body-->
  <xsl:output/>
  <!--No parameters are currently passed to doXslTransform.-->
  <xsl:template match="/PDFGeneration-BudgetProcess:StartResponse">
    <formless:attachments>
      <attachment xmlns="http://www.intalio.com/BPMS/Workflow/TaskManagementServices-20051109/">
        <attachmentMetadata>
          <mimeType>application/pdf</mimeType>
          <fileName>Budget.pdf</fileName>
          <title>Budget</title>
          <description>Budget</description>
          <creationDate><xsl:value-of select="current-dateTime()" /></creationDate>
        </attachmentMetadata>
        <payloadUrl><xsl:value-of select="text()" /></payloadUrl>
      </attachment>
    </formless:attachments>
  </xsl:template>
</xsl:stylesheet>
