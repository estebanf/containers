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
import org.eclipse.birt.report.resource.ResourceConstants;
import org.eclipse.birt.report.resource.BirtResources;

public final class ExceptionDialogFragment_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("\n");
      out.write("<TABLE CELLSPACING=\"2\" CELLPADDING=\"2\" CLASS=\"birtviewer_dialog_body\">\n");
      out.write("\t<TR>\n");
      out.write("\t\t<TD CLASS=\"birtviewer_exception_dialog\">\n");
      out.write("\t\t\t<TABLE CELLSPACING=\"2\" CELLPADDING=\"2\">\n");
      out.write("\t\t\t\t<TR>\n");
      out.write("\t\t\t\t\t<TD VALIGN=\"top\"><IMG SRC=\"birt/images/Error.gif\" /></TD>\n");
      out.write("\t\t\t\t\t\n");
      out.write("\t\t\t\t\t<TD>\n");
      out.write("\t\t\t\t\t\n");
      out.write("\t\t\t\t\t\t<TABLE CELLSPACING=\"2\" CELLPADDING=\"4\" CLASS=\"birtviewer_exception_dialog_container\" >\n");
      out.write("\t\t\t\t\t\t\t<TR>\n");
      out.write("\t\t\t\t\t\t\t\t<TD>\n");
      out.write("\t\t\t\t\t\t\t\t<DIV ID=\"faultStringContainer\" CLASS=\"birtviewer_exception_dialog_message\">\n");
      out.write("\t\t\t\t\t\t\t\t\t<B><SPAN ID='faultstring'></SPAN><B>\n");
      out.write("\t\t\t\t\t\t\t\t</DIV>\n");
      out.write("\t\t\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t\t\t</TR>\n");
      out.write("\t\t\t\t\t\t\t<TR>\n");
      out.write("\t\t\t\t\t\t\t\t<TD>\n");
      out.write("\t\t\t\t\t\t\t\t\t<DIV ID=\"showTraceLabel\" CLASS=\"birtviewer_exception_dialog_label\">\n");
      out.write("\t\t\t\t\t\t\t\t\t\t");
      out.print( BirtResources.getMessage( ResourceConstants.EXCEPTION_DIALOG_SHOW_STACK_TRACE ) );
      out.write(" \n");
      out.write("\t\t\t\t\t\t\t\t\t</DIV>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n");
      out.write("\t\t\t\t\t\t\t\t\t<DIV ID=\"hideTraceLabel\" CLASS=\"birtviewer_exception_dialog_label\" STYLE=\"display:none\">\n");
      out.write("\t\t\t\t\t\t\t\t\t\t");
      out.print( BirtResources.getMessage( ResourceConstants.EXCEPTION_DIALOG_HIDE_STACK_TRACE ) );
      out.write(" \n");
      out.write("\t\t\t\t\t\t\t\t\t</DIV>\t\t\t\t\t\t\t\t\t\n");
      out.write("\t\t\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t\t\t</TR>\n");
      out.write("\t\t\t\t\t\t\t<TR>\n");
      out.write("\t\t\t\t\t\t\t\t<TD>\n");
      out.write("\t\t\t\t\t\t\t\t\t<DIV ID=\"exceptionTraceContainer\" STYLE=\"display:none\">\n");
      out.write("\t\t\t\t\t\t\t\t\t\t<TABLE WIDTH=\"100%\">\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t<TR>\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t<TD>\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t\t");
      out.print( 
														BirtResources.getMessage( ResourceConstants.EXCEPTION_DIALOG_STACK_TRACE )
													);
      out.write("<BR>\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t</TR>\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t<TR>\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t<TD>\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t\t<DIV CLASS=\"birtviewer_exception_dialog_detail\">\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t\t\t<SPAN ID='faultdetail'></SPAN>\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t\t</DIV>\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t\t\t\t\t\t\t</TR>\t\t\t\t\t\t\t\t\t\t\t\n");
      out.write("\t\t\t\t\t\t\t\t\t\t</TABLE>\n");
      out.write("\t\t\t\t\t\t\t\t\t</DIV>\n");
      out.write("\t\t\t\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t\t\t</TR>\t\n");
      out.write("\t\t\t\t\t\t</TABLE>\n");
      out.write("\t\t\t\t\t\n");
      out.write("\t\t\t\t\t</TD>\n");
      out.write("\t\t\t\t\t\n");
      out.write("\t\t\t\t</TR>\n");
      out.write("\t\t\t</TABLE>\n");
      out.write("\t\t</TD>\n");
      out.write("\t</TR>\n");
      out.write("</TABLE>");
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
