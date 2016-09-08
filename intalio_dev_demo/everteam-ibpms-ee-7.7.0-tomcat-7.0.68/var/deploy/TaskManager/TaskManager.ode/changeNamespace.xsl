<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml"/>
   <xsl:template match="*">
      <xsl:element name="tms:{local-name()}"
namespace="http://www.intalio.com/BPMS/Workflow/TaskManagementServices-20051109/">
         <xsl:apply-templates select="@*|*|text()"/>
      </xsl:element>
   </xsl:template>
 </xsl:stylesheet>