/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.68
 * Generated at: 2016-05-04 11:57:34 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.webcontent.birt.pages.dialog;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import org.eclipse.birt.report.presentation.aggregation.IFragment;
import org.eclipse.birt.report.utility.ParameterAccessor;
import org.eclipse.birt.report.resource.BirtResources;

public final class ExportReportDialogFragment_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public javax.el.ExpressionFactory _jsp_getExpressionFactory() {
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=utf-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, false, 0, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write('\n');
      org.eclipse.birt.report.presentation.aggregation.IFragment fragment = null;
      fragment = (org.eclipse.birt.report.presentation.aggregation.IFragment) _jspx_page_context.getAttribute("fragment", javax.servlet.jsp.PageContext.REQUEST_SCOPE);
      if (fragment == null){
        throw new java.lang.InstantiationException("bean fragment not found within scope");
      }
      out.write('\n');
      out.write('\n');

	String[] supportedFormats = ParameterAccessor.supportedFormats;

      out.write('\n');
      out.write("\n");
      out.write("<TABLE CELLSPACING=\"2\" CELLPADDING=\"2\" CLASS=\"birtviewer_dialog_body\">\n");
      out.write("\t<TR HEIGHT=\"5px\"><TD></TD></TR>\n");
      out.write("\t<TR>\n");
      out.write("\t\t<TD>\n");
      out.write("\t\t<label for=\"exportFormat\">");
      out.print(BirtResources.getMessage( "birt.viewer.dialog.export.format" ));
      out.write("</label>\n");
      out.write("\t\t<SELECT\tID=\"exportFormat\" NAME=\"format\" CLASS=\"birtviewer_exportreport_dialog_select\">\n");
      out.write("\t\t\t");

				ParameterAccessor.sortSupportedFormatsByDisplayName(supportedFormats);
				
				for ( int i = 0; i < supportedFormats.length; i++ )
				{
					if ( !ParameterAccessor.PARAM_FORMAT_HTML.equalsIgnoreCase( supportedFormats[i] ) )
					{
			
      out.write("\n");
      out.write("\t\t\t\t\t\t<OPTION VALUE=\"");
      out.print( supportedFormats[i] );
      out.write('"');
      out.write('>');
      out.print( ParameterAccessor.getOutputFormatLabel( supportedFormats[i] ) );
      out.write("</OPTION>\n");
      out.write("\t\t\t");

					}
				}
			
      out.write("\n");
      out.write("\t\t</SELECT>\n");
      out.write("\t\t</TD>\n");
      out.write("\t</TR>\n");
      out.write("\t<TR HEIGHT=\"5px\"><TD></TD></TR>\n");
      out.write("\t<TR HEIGHT=\"5px\"><TD><HR/></TD></TR>\n");
      out.write("\t<TR>\n");
      out.write("\t\t<TD>\n");
      out.write("\t\t<label for=\"exportPages\">");
      out.print(BirtResources.getMessage( "birt.viewer.dialog.page" ));
      out.write("</label>\n");
      out.write("\t\t</TD>\n");
      out.write("\t</TR>\n");
      out.write("\t<TR>\n");
      out.write("\t\t<TD>\n");
      out.write("\t\t\t<DIV ID=\"exportPageSetting\">\n");
      out.write("\t\t\t\t<TABLE>\n");
      out.write("\t\t\t\t\t<TR>\n");
      out.write("\t\t\t\t\t\t<TD>\n");
      out.write("\t\t\t\t\t\t\t<INPUT TYPE=\"radio\" ID=\"exportPageAll\" NAME=\"exportPages\" CHECKED/>\n");
      out.write("\t\t\t\t\t\t\t<label for=\"exportPageAll\">");
      out.print(BirtResources.getHtmlMessage( "birt.viewer.dialog.page.all" ));
      out.write("</label>\n");
      out.write("\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t\t<TD STYLE=\"padding-left:5px\">\t\n");
      out.write("\t\t\t\t\t\t\t<INPUT TYPE=\"radio\" ID=\"exportPageCurrent\" NAME=\"exportPages\"/>\n");
      out.write("\t\t\t\t\t\t\t<label for=\"exportPageCurrent\">");
      out.print(BirtResources.getHtmlMessage( "birt.viewer.dialog.page.current" ));
      out.write("</label>\n");
      out.write("\t\t\t\t\t\t</TD>\t\n");
      out.write("\t\t\t\t\t\t<TD STYLE=\"padding-left:5px\">\n");
      out.write("\t\t\t\t\t\t\t<INPUT TYPE=\"radio\" ID=\"exportPageRange\" NAME=\"exportPages\"/>\n");
      out.write("\t\t\t\t\t\t\t<label for=\"exportPageRange\">");
      out.print(BirtResources.getHtmlMessage( "birt.viewer.dialog.page.range" ));
      out.write("</label>\n");
      out.write("\t\t\t\t\t\t\t<INPUT TYPE=\"text\" CLASS=\"birtviewer_exportreport_dialog_input\" ID=\"exportPageRange_input\" DISABLED=\"true\"/>\n");
      out.write("\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t</TR>\t\t\n");
      out.write("\t\t\t\t</TABLE>\n");
      out.write("\t\t\t</DIV>\n");
      out.write("\t\t</TD>\n");
      out.write("\t</TR>\n");
      out.write("\t<TR>\n");
      out.write("\t\t<TD>&nbsp;&nbsp;");
      out.print(BirtResources.getHtmlMessage( "birt.viewer.dialog.page.range.description" ));
      out.write("</TD>\n");
      out.write("\t</TR>\n");
      out.write("\t<TR HEIGHT=\"5px\"><TD><HR/></TD></TR>\n");
      out.write("\t<TR>\n");
      out.write("\t\t<TD>\n");
      out.write("\t\t\t<DIV ID=\"exportFitSetting\">\n");
      out.write("\t\t\t\t<TABLE>\n");
      out.write("\t\t\t\t\t<TR>\n");
      out.write("\t\t\t\t\t\t<TD>\n");
      out.write("\t\t\t\t\t\t\t<label for=\"exportFitToAuto\">");
      out.print(BirtResources.getHtmlMessage( "birt.viewer.dialog.export.pdf.fitto" ));
      out.write("</label>\n");
      out.write("\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t</TR>\n");
      out.write("\t\t\t\t\t<TR>\n");
      out.write("\t\t\t\t\t\t<TD>\n");
      out.write("\t\t\t\t\t\t\t<INPUT TYPE=\"radio\" ID=\"exportFitToAuto\" NAME=\"exportFit\" CHECKED/>\n");
      out.write("\t\t\t\t\t\t\t<label for=\"exportFitToAuto\">");
      out.print(BirtResources.getHtmlMessage( "birt.viewer.dialog.export.pdf.fittoauto" ));
      out.write("</label>\n");
      out.write("\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t\t<TD>\n");
      out.write("\t\t\t\t\t\t\t<INPUT TYPE=\"radio\" ID=\"exportFitToActual\" NAME=\"exportFit\"/>\n");
      out.write("\t\t\t\t\t\t\t<label for=\"exportFitToActual\">");
      out.print(BirtResources.getHtmlMessage( "birt.viewer.dialog.export.pdf.fittoactual" ));
      out.write("</label>\n");
      out.write("\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t\t<TD STYLE=\"padding-left:5px\">\t\n");
      out.write("\t\t\t\t\t\t\t<INPUT TYPE=\"radio\" ID=\"exportFitToWhole\" NAME=\"exportFit\"/>\n");
      out.write("\t\t\t\t\t\t\t<label for=\"exportFitToWhole\">");
      out.print(BirtResources.getHtmlMessage( "birt.viewer.dialog.export.pdf.fittowhole" ));
      out.write("</label>\n");
      out.write("\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t</TR>\n");
      out.write("\t\t\t\t</TABLE>\t\t\t\n");
      out.write("\t\t\t</DIV>\t\t\t\n");
      out.write("\t\t</TD>\n");
      out.write("\t</TR>\n");
      out.write("\t<TR HEIGHT=\"5px\"><TD></TD></TR>\n");
      out.write("</TABLE>\n");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
