/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.68
 * Generated at: 2016-05-04 11:29:39 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class moduleAccess_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody;

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
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.release();
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write(' ');
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<html lang=\"en\">\n");
      out.write("<head>\n");
      out.write("<script src=\"scripts/custom/moduleaccess/moduleaccess.js?version=2676\"></script>\n");
      out.write("<link href=\"style/custom/moduleaccess/moduleaccess.css?version=2676\" rel=\"stylesheet\" />\n");
      out.write("<!--[if IE 8]>\n");
      out.write("<link href=\"style/custom/moduleaccess/moduleaccess-ie.css?version=2676\" rel=\"stylesheet\" />\n");
      out.write("<![endif]-->\n");
      out.write("<!--[if IE 9]>\n");
      out.write("<link href=\"style/custom/moduleaccess/moduleaccess-ie.css?version=2676\" rel=\"stylesheet\" />\n");
      out.write("<![endif]-->\n");
      out.write("</head>\n");
      out.write("<body>\n");
      out.write("\t<div id=\"breadcrumbs\" class=\"breadcrumbs\">\n");
      out.write("\t\t<ul class=\"breadcrumb\">\n");
      out.write("\t\t\t<li><i class=\"fa fa-code-fork\"></i>&nbsp;&nbsp;");
      if (_jspx_meth_fmt_005fmessage_005f0(_jspx_page_context))
        return;
      out.write("</li>&nbsp;<li>");
      if (_jspx_meth_fmt_005fmessage_005f1(_jspx_page_context))
        return;
      out.write("</li>\n");
      out.write("\t\t\t<li class=\"active\"><a href=\"#\" class=\"noDecoration\" onclick=\"javascript:selectMenuAndChangepage(this,'module_access','moduleAccess.htm');\">");
      if (_jspx_meth_fmt_005fmessage_005f2(_jspx_page_context))
        return;
      out.write("</a></li>\n");
      out.write("\t\t</ul>\n");
      out.write("\t</div>\n");
      out.write("<div class=\"page-content\">\n");
      out.write("\t<div class=\"row-fluid\" id=\"modulesPage\">\t\t\t\t \t\t\t\t\t\t\t\t\t\t\t\t\t\n");
      out.write("\t\t<div class=\"dd \" id=\"rolesComboLi\" >\n");
      out.write("\t\t\t<ol class=\"dd-list\" >\n");
      out.write("\t\t\t\t<li class=\"dd-item dd2-item\" >\n");
      out.write("\t\t\t\t\t<div class=\"dd2-content\">\t\t\n");
      out.write("\t\t\t\t\t\t<select id=\"rolesCombo\" class=\"chosen-select center\" style=\"display: none;\" >\n");
      out.write("\t\t\t\t\t\t\t<option value=\"select\">");
      if (_jspx_meth_fmt_005fmessage_005f3(_jspx_page_context))
        return;
      out.write("</option>\t\n");
      out.write("                            </hr>\t\t\t\t\t\t\t\n");
      out.write("\t\t\t\t\t\t</select>\n");
      out.write("\t\t\t\t\t\t<span id=\"collapseButton\" class=\"hide\"><a  href=\"#\" class=\"noDecoration\" onclick=\"collapseAll();\" title=\"Collapse All\"><i class=\"fa fa-minus\"></i></a></span>\n");
      out.write("\t\t\t\t\t\t<span id=\"expandButton\" class=\"hide\"><a  href=\"#\" class=\"noDecoration\" onclick=\"expandAll();\" title=\"Expand All\"><i class=\"fa fa-plus\"></i></a></span>  \n");
      out.write("\t\t\t\t\t</div>\n");
      out.write("\t\t\t\t</li>\n");
      out.write("\t\t\t</ol></div>\n");
      out.write("\t\t    <div class=\"dd\">\t\t\t\t\t\t\n");
      out.write("\t\t\t\t<ol class=\"dd-list\" id=\"module-list\">\t\t\t\t\t\t\t  \n");
      out.write("\t\t\t\t</ol>\n");
      out.write("\t\t\t\t<div class=\"updateButton hide\"><br><center><a onclick=\"javascript:updateAccess();\"class=\"btn btn-primary btn-sm \">Update</a></center></div>\n");
      out.write("\t\t    </div>\n");
      out.write("\t</div>\n");
      out.write("</div>\n");
      out.write("<div id=\"scroll-up-btn\" class=\"hide\" data-spy=\"affix\">\n");
      out.write("<a href=\"#\" id=\"btn-scroll-up\" class=\"btn-scroll-up btn btn-sm btn-inverse\">\n");
      out.write("<i class=\"fa fa-angle-double-up fa-only bigger-110\"></i></a>\n");
      out.write("</div>\n");
      out.write("\n");
      out.write("<div id=\"noChild\" class=\"hide\">\n");
      out.write("\t<li class='dd-item dd2-item'>\n");
      out.write("\t\t<div class=\"dd-handle dd2-handle\">\n");
      out.write("\t\t\t<i class=\"noChildIcon\"></i>\n");
      out.write("\t\t</div>\n");
      out.write("\t\t<div class=\"dd2-content\">\n");
      out.write("\t\t\t<span class=\"moduleName\"></span>\n");
      out.write("\t\t\t<label id=\"checkboxId\" class=\"pull-right inline\">\n");
      out.write("\t\t\t\t<input type=\"checkbox\" class=\"ace ace-switch ace-switch-5\">\n");
      out.write("\t\t\t\t<span class=\"lbl\"></span>\n");
      out.write("\t\t\t</label>\n");
      out.write("\t\t</div>\n");
      out.write("\t</li>\n");
      out.write("</div>\n");
      out.write("\n");
      out.write("<div id=\"hasChild\" class=\"hide\">\n");
      out.write("\t<li class='dd-item dd2-item'>\n");
      out.write("\t\t<div class=\"dd-handle dd2-handle\">\n");
      out.write("\t\t\t<i class=\"hasChildIcon\"></i>\n");
      out.write("\t\t</div>\n");
      out.write("\t\t<div class=\"dd2-content\">\n");
      out.write("\t\t\t<a style=\"text-decoration:none;\" data-toggle=\"collapse\" class=\"accordion-toggle\">\n");
      out.write("\t\t\t\t<i class=\"icon\"></i>\n");
      out.write("\t\t\t</a> &nbsp;\n");
      out.write("\t\t\t<span class=\"moduleName\"></span>\n");
      out.write("\t\t\t<label id=\"checkboxId\" class=\"pull-right inline\">\n");
      out.write("\t\t\t\t<input type=\"checkbox\" class=\"ace ace-switch ace-switch-5\">\n");
      out.write("\t\t\t\t<span class=\"lbl\"></span>\n");
      out.write("\t\t\t</label>\n");
      out.write("\t\t</div>\n");
      out.write("\t\t<div class=\"accordion-body collapse\" style=\"height: auto;\">\n");
      out.write("\t\t\t<ol class=\"dd-list\">\n");
      out.write("\t\t\t</ol>\n");
      out.write("\t\t<div>\n");
      out.write("\t</li>\n");
      out.write("</div>\n");
      out.write("\n");
      out.write("</body>\n");
      out.write("</html>\n");
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

  private boolean _jspx_meth_fmt_005fmessage_005f0(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f0 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_005fmessage_005f0.setPageContext(_jspx_page_context);
    _jspx_th_fmt_005fmessage_005f0.setParent(null);
    // /WEB-INF/jsp/moduleAccess.jsp(25,50) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_fmt_005fmessage_005f0.setKey("com_intalio_bpms_module_administration");
    int _jspx_eval_fmt_005fmessage_005f0 = _jspx_th_fmt_005fmessage_005f0.doStartTag();
    if (_jspx_th_fmt_005fmessage_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f0);
      return true;
    }
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f0);
    return false;
  }

  private boolean _jspx_meth_fmt_005fmessage_005f1(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f1 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_005fmessage_005f1.setPageContext(_jspx_page_context);
    _jspx_th_fmt_005fmessage_005f1.setParent(null);
    // /WEB-INF/jsp/moduleAccess.jsp(25,124) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_fmt_005fmessage_005f1.setKey("com_intalio_bpms_module_administration_access_control");
    int _jspx_eval_fmt_005fmessage_005f1 = _jspx_th_fmt_005fmessage_005f1.doStartTag();
    if (_jspx_th_fmt_005fmessage_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f1);
      return true;
    }
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f1);
    return false;
  }

  private boolean _jspx_meth_fmt_005fmessage_005f2(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f2 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_005fmessage_005f2.setPageContext(_jspx_page_context);
    _jspx_th_fmt_005fmessage_005f2.setParent(null);
    // /WEB-INF/jsp/moduleAccess.jsp(26,142) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_fmt_005fmessage_005f2.setKey("com_intalio_bpms_module_administration_access_control_modules");
    int _jspx_eval_fmt_005fmessage_005f2 = _jspx_th_fmt_005fmessage_005f2.doStartTag();
    if (_jspx_th_fmt_005fmessage_005f2.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f2);
      return true;
    }
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f2);
    return false;
  }

  private boolean _jspx_meth_fmt_005fmessage_005f3(javax.servlet.jsp.PageContext _jspx_page_context)
          throws java.lang.Throwable {
    javax.servlet.jsp.PageContext pageContext = _jspx_page_context;
    javax.servlet.jsp.JspWriter out = _jspx_page_context.getOut();
    //  fmt:message
    org.apache.taglibs.standard.tag.rt.fmt.MessageTag _jspx_th_fmt_005fmessage_005f3 = (org.apache.taglibs.standard.tag.rt.fmt.MessageTag) _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.get(org.apache.taglibs.standard.tag.rt.fmt.MessageTag.class);
    _jspx_th_fmt_005fmessage_005f3.setPageContext(_jspx_page_context);
    _jspx_th_fmt_005fmessage_005f3.setParent(null);
    // /WEB-INF/jsp/moduleAccess.jsp(36,30) name = key type = null reqTime = true required = false fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
    _jspx_th_fmt_005fmessage_005f3.setKey("com_intalio_module_access_select_role");
    int _jspx_eval_fmt_005fmessage_005f3 = _jspx_th_fmt_005fmessage_005f3.doStartTag();
    if (_jspx_th_fmt_005fmessage_005f3.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f3);
      return true;
    }
    _005fjspx_005ftagPool_005ffmt_005fmessage_0026_005fkey_005fnobody.reuse(_jspx_th_fmt_005fmessage_005f3);
    return false;
  }
}