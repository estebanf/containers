/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.68
 * Generated at: 2016-05-04 10:51:29 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.widgets.instances;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class status_005fsummary_005fby_005fprocess_jsp extends org.apache.jasper.runtime.HttpJspBase
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

      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n");
      out.write("<html>\n");
      out.write("<head>\n");
      out.write("<body>\n");
      out.write("<script type=\"text/javascript\">\n");
      out.write("/** SSBP in this script refers to Status Summary By Process */\n");
      out.write("/** @Function Name   : Jquery Ready Function \n");
      out.write("*   @Description     : jquery ready function\n");
      out.write("*   @param           :\n");
      out.write("*   @returns         :\n");
      out.write("* */\n");
      out.write("\n");
      out.write("$(function() {\n");
      out.write("\tvar widgetStateId = $('#status_summary_by_process').closest('.widget').attr(\"id\");\n");
      out.write("    var widgetObject = getWidgetObject(widgetStateId);\n");
      out.write("    if (widgetObject.filter == undefined || widgetObject.filter == null || widgetObject.filter ==''){\n");
      out.write("    \tvar filterObject = {};\n");
      out.write("    \tfilterObject.chartType = defaults.swf10;\n");
      out.write("    \twidgetObject.filter = filterObject;\n");
      out.write("    \tpersistWidget(widgetObject);\n");
      out.write("    }\n");
      out.write("    var divId_SSBP = defaults.chart4 + widgetStateId;\n");
      out.write("\t$('#status_summary_by_process').attr('id', divId_SSBP);\n");
      out.write("\t$('#instancesStatusFilter').attr('id', \"instancesStatusFilter\"+widgetStateId);\n");
      out.write("\t/**all possible charts*/\n");
      out.write("\tvar possibleCharts=[defaults.swf1,defaults.swf2,defaults.swf10,defaults.swf11,defaults.swf14];\n");
      out.write("\tvar possibleChartsNames=[\"MSColumn 3D\",\"Stacked Column 3D\",\"MSColumn 2D\",\"Stacked Column 2D\",\"MSBar\"];\n");
      out.write("\t$('#instancesStatusFilter'+widgetStateId+' .chartTypes').empty();\n");
      out.write("    $.each(possibleCharts, function (idx, value) {\n");
      out.write("        $('#instancesStatusFilter'+widgetStateId+' .chartTypes').append('<option value=\"'+value+'\">'+possibleChartsNames[idx]+'</option>');\n");
      out.write("    });\n");
      out.write("    $('#instancesStatusFilter'+widgetStateId+' .chartTypes').chosen();\n");
      out.write("    $('#instancesStatusFilter'+widgetStateId+' .chartTypes').next().css('width',170);\n");
      out.write("\tvar filterIcon = \"&nbsp;<a href='#' class='filterIcon' onclick='instanceStatusFilter(this);'><i title='Filter Chart' class='fa fa-cog'></i></a>\"\n");
      out.write("\tvar refreshIcon = \"<a onclick=getSSBPData(this); class='refreshChart' data-action='reload'><i title='Refresh' class='fa fa-refresh'></i></a>\";\n");
      out.write("\tif($(\"#\"+divId_SSBP).closest('.widget-box').find('.widget-toolbar').find('.filterIcon').length == 0)\n");
      out.write("\t{\n");
      out.write("\t\t$(\"#\"+divId_SSBP).closest('.widget-box').find('.widget-toolbar').children(':nth-child(2)').replaceWith(refreshIcon);\n");
      out.write("\t\t$(\"#\" + divId_SSBP).closest('.widget-box').find('.widget-toolbar').prepend(filterIcon);\n");
      out.write("\t}\n");
      out.write("\tgetSSBPData($(\"#\"+divId_SSBP),widgetStateId);\n");
      out.write("\t$('.chartFilterDates').datepicker({autoclose:true}).next().on(ace.click_event, function(){ $(this).prev().focus(); });\n");
      out.write("\t$('#instancesStatusFilter'+widgetStateId+' .fromDate').on('change',function() {\n");
      out.write("\t\t\tvar fromDate = $('#instancesStatusFilter'+widgetStateId+' .fromDate').val();\n");
      out.write("\t\t\tvar toDate = $('#instancesStatusFilter'+widgetStateId+' .toDate').val();\n");
      out.write("\t\t\tif(fromDate > toDate)\n");
      out.write("\t\t\t\t$('#instancesStatusFilter'+widgetStateId+' .toDate').val(\"\");\n");
      out.write("\t\t\t$('#instancesStatusFilter'+widgetStateId+' .toDate').datepicker('setStartDate',fromDate);\n");
      out.write("\t});\n");
      out.write("});\n");
      out.write("\n");
      out.write("/** @Function Name   : getSSBPData\n");
      out.write("*   @Description     : fetches the data from server\n");
      out.write("*   @param           : query fetch / refresh\n");
      out.write("*   @returns         :\n");
      out.write("* */\n");
      out.write("function getSSBPData(obj,widId)\n");
      out.write("{\n");
      out.write("\tclickRefresh(obj,true);\n");
      out.write("\tvar widgetStateId;\n");
      out.write("\tvar data = {};\n");
      out.write("\tif ($(obj).length != 0 ){\n");
      out.write("\t\twidgetStateId = $(obj).closest('.widget').attr(\"id\");\n");
      out.write("\t} else if (widId != null && widId != undefined){\n");
      out.write("\t\twidgetStateId = widId;\n");
      out.write("\t}\n");
      out.write("\tvar widgetObject = getWidgetObject(widgetStateId);\n");
      out.write("\tif (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != '' && widgetObject.filter.process != undefined){\n");
      out.write("\t\tvar filterObject = widgetObject.filter;\n");
      out.write("\t\tif (filterObject.fromDate != undefined && filterObject.fromDate != null)\n");
      out.write("\t\t\t\tdata.since = filterObject.fromDate\n");
      out.write("\t\tif (filterObject.toDate != undefined && filterObject.toDate != null)\n");
      out.write("\t\t\tdata.until = filterObject.toDate\n");
      out.write("\t\tif (filterObject.process != undefined && filterObject.process != null)\n");
      out.write("\t\t\tdata.process = filterObject.process\n");
      out.write("\t\tif(filterObject.activeProcess)\n");
      out.write("            data.activeOnly = filterObject.activeProcess;\n");
      out.write("        else\n");
      out.write("            data.activeOnly = false;\n");
      out.write("\t\tsendAjaxCall('dashboard/widgets/processInstanceStatusSummary', \"POST\", false, true, \"json\", data, SSBPErrorCall, function(responseData){\n");
      out.write("\t\t\tclickRefresh(obj,false);\n");
      out.write("\t\t\tif(responseData.error_message == undefined)\n");
      out.write("\t\t\t\tpopulateProcessInstanceStatusCnt(responseData,widgetStateId) ;\n");
      out.write("\t\t\telse\n");
      out.write("\t\t\t\tshowErrorNotification(responseData.error_message);\n");
      out.write("\t\t});\n");
      out.write("\t}\n");
      out.write("\telse\n");
      out.write("\t\tinstanceStatusFilter($('#'+widId).find('.filterIcon'));\n");
      out.write("}\n");
      out.write("function instanceStatusFilter(obj){\n");
      out.write("\tvar widgetStateId = $(obj).closest('.widget').attr(\"id\");\n");
      out.write("\tvar widgetObject = getWidgetObject(widgetStateId);\n");
      out.write("\tvar modalObj = $('#instancesStatusFilter'+widgetStateId);\n");
      out.write("\taddLoading($(modalObj).find('.modal-body'));\n");
      out.write("\t$('#loading').css('margin-top',30);\n");
      out.write("\t$(modalObj).find('.chartFilterTable .error-Msg').addClass('hide');\n");
      out.write("\tmodalShow('instancesStatusFilter'+widgetStateId);\n");
      out.write("\tvar data = {}; \n");
      out.write("\tsendAjaxCall('dashboard/filters/processes', \"POST\", false, true, \"json\", data, SSBPErrorCall, function(responseData){\n");
      out.write("\t\tif(responseData.error_message == undefined){\n");
      out.write("\t\t\t\tiscProcessFilter = responseData.process;\n");
      out.write("\t\t\t\tpopulateInstancesStatusFilterData(responseData,widgetStateId);\n");
      out.write("\t\t\t}\n");
      out.write("\t\telse\n");
      out.write("\t\t\tshowErrorNotification(responseData.error_message);\n");
      out.write("\t});\n");
      out.write("}\n");
      out.write("var packageListDashboard = {}; //global\n");
      out.write("function populateInstancesStatusFilterData(data,widgetStateId){\n");
      out.write("\tvar prevPackage;\n");
      out.write("\tvar widgetObject = getWidgetObject(widgetStateId);\n");
      out.write("\tvar modalObj = $('#instancesStatusFilter'+widgetStateId);\n");
      out.write("\tif (widgetObject && widgetObject.filter){\n");
      out.write("\t\tvar filterObject = widgetObject.filter;\n");
      out.write("\t\tactiveObj = $(modalObj).find('.iscActiveProc');\n");
      out.write("        if(filterObject.activeProcess)\n");
      out.write("            activeObj.prop('checked',filterObject.activeProcess);\n");
      out.write("        else\n");
      out.write("            activeObj.prop('checked',false);\n");
      out.write("        updateISCPackages(activeObj);\n");
      out.write("\t\tif (filterObject.fromDate){\n");
      out.write("\t\t\t$(modalObj).find('.fromDate').val(filterObject.fromDate);\n");
      out.write("\t\t\t$('#instancesStatusFilter'+widgetStateId+' .toDate').datepicker('setStartDate',filterObject.fromDate);\n");
      out.write("\t\t}\n");
      out.write("\t\telse \n");
      out.write("\t\t\t$(modalObj).find('.fromDate').val('');\n");
      out.write("\t\tif (filterObject.toDate)\n");
      out.write("\t\t\t$(modalObj).find('.toDate').val(filterObject.toDate);\n");
      out.write("\t\telse \n");
      out.write("\t\t\t$(modalObj).find('.toDate').val('');\n");
      out.write("\t\tif (filterObject.chartType){\n");
      out.write("\t\t\t$(modalObj).find('.chartTypes').next().remove();\n");
      out.write("\t\t\t$(modalObj).find('.chartTypes').removeAttr('style').removeClass('chzn-done');\n");
      out.write("\t\t\t$(modalObj).find('.chartTypes').val(filterObject.chartType);\n");
      out.write("\t\t\t$(modalObj).find('.chartTypes').chosen();\n");
      out.write("\t\t\t$(modalObj).find('.chartTypes').next().css('width',170);\n");
      out.write("\t\t}\n");
      out.write("\t}\n");
      out.write("\tif(widgetObject != null) {\n");
      out.write("\t\tif (widgetObject.title != undefined && widgetObject.title != null)\n");
      out.write("\t\t\t$(modalObj).find('.chartName').val(widgetObject.title);\n");
      out.write("\t}\n");
      out.write("\n");
      out.write("\t$(modalObj).find('.ISCPackageList').attr('widgetId',widgetStateId);\n");
      out.write("\t$(modalObj).find('.ISCPackageList').chosen();\n");
      out.write("\t$(modalObj).find('.ISCPackageList').next().css('width',410);\n");
      out.write("\t$(modalObj).find('.ISCPackageList').next().find('li.search-field input').css('width',250).css('height',25);\n");
      out.write("\tremoveLoading($(modalObj).find('.modal-body'));\n");
      out.write("\t$(modalObj).find('.modal-footer .applyButton').attr('widgetId',widgetStateId);\n");
      out.write("\n");
      out.write("}\n");
      out.write("\n");
      out.write("function updateISCPackages(obj){\n");
      out.write("    var prevPackage,changedPackage=[];\n");
      out.write("    var widgetStateId = $(obj).closest('.widget').attr(\"id\");\n");
      out.write("    var modalObj = $('#instancesStatusFilter'+widgetStateId);\n");
      out.write("    iscPackageObj = $(modalObj).find('.ISCPackageList');\n");
      out.write("    iscProcessObj = $(modalObj).find('.ISCProcessesList');\n");
      out.write("    \n");
      out.write("    iscPackageObj.removeAttr('style').removeClass('chzn-done');\n");
      out.write("    iscProcessObj.removeAttr('style').removeClass('chzn-done');\n");
      out.write("    iscProcessObj.next().remove();\n");
      out.write("    iscPackageObj.next().remove();\n");
      out.write("    \n");
      out.write("    iscProcessObj.closest('tr').addClass('hide');\n");
      out.write("    iscPackageObj.empty();\n");
      out.write("    packageListDashboard = {};\n");
      out.write("    var widgetObject = getWidgetObject(widgetStateId);\n");
      out.write("    var filterObject = widgetObject.filter;\n");
      out.write("    $.each(iscProcessFilter,function(key,value){\n");
      out.write("       if(value.package){\n");
      out.write("            if(($(obj).prop('checked') && value.status===\"ACTIVE\") || !$(obj).prop('checked')) {\n");
      out.write("                prevPackage = value.id;\n");
      out.write("                packageListDashboard[prevPackage] = [];\n");
      out.write("                addCheck= false;\n");
      out.write("                if(filterObject.package){\n");
      out.write("                    $.each(filterObject.package,function(key1,value1){\n");
      out.write("                        if($(obj).prop('checked')){\n");
      out.write("                            if(value1 == value.id || String(value1).split('/')[0]===String(value.id).split('-')[0] || String(value1).split('-')[0] === String(value.id).split('-')[0]){\n");
      out.write("                                addCheck = true;\n");
      out.write("                                changedPackage.push(value.id);\n");
      out.write("                                iscPackageObj.append('<option value=\"'+value.id+'\" selected=selected>'+value.name+' ['+value.version+']</option>');\n");
      out.write("                            }\n");
      out.write("                        }else if(value1 == value.id){\n");
      out.write("                                addCheck = true;\n");
      out.write("                                changedPackage.push(value.id);\n");
      out.write("                                iscPackageObj.append('<option value=\"'+value.id+'\" selected=selected>'+value.name+' ['+value.version+']</option>');\n");
      out.write("                        }\n");
      out.write("                    });\n");
      out.write("                }\n");
      out.write("                if(!addCheck)\n");
      out.write("                    iscPackageObj.append('<option value=\"'+value.id+'\">'+value.name+' ['+value.version+']</option>')        \n");
      out.write("            }\n");
      out.write("        }\n");
      out.write("       else if(($(obj).prop('checked') && value.status===\"ACTIVE\") || !$(obj).prop('checked'))\n");
      out.write("            packageListDashboard[prevPackage].push({name:value.name,id:value.id});\n");
      out.write("        $(iscPackageObj).find('option').each(function() {\n");
      out.write("            $(this).prevAll('option[value=\"' + this.value + '\"]').remove();\n");
      out.write("        });\n");
      out.write("    });\n");
      out.write("    iscPackageObj.attr('widgetId',widgetStateId);\n");
      out.write("    iscPackageObj.chosen();\n");
      out.write("    iscPackageObj.next().css('width',410);\n");
      out.write("    iscPackageObj.next().find('li.search-field input').css('width',250);\n");
      out.write("    iscPackageObj.next().find('li.search-field input').css('height',25);\n");
      out.write("    if(filterObject.package)        \n");
      out.write("        fetchFilterProcessesISP('',changedPackage,widgetStateId);\n");
      out.write("}\n");
      out.write("\n");
      out.write("function applyInstancesStatusFilter(obj){\n");
      out.write("\tvar widgetStateId = $(obj).attr(\"widgetId\");\n");
      out.write("\tvar widgetObject = getWidgetObject(widgetStateId);\n");
      out.write("\tvar filterObject = {};\n");
      out.write("\tvar modalObj = $(obj).closest('.modal');\n");
      out.write("\tvar data = {}\n");
      out.write("\tvar oldObject = JSON.parse( JSON.stringify( widgetObject.filter));\n");
      out.write("\tdelete oldObject.chartType;\n");
      out.write("\tif($(modalObj).find('.chartName').val()==\"\")\n");
      out.write("\t{\n");
      out.write("\t\t$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetChartNameErrorMsg').text());\n");
      out.write("\t\t$(modalObj).find('.chartName').focus();\n");
      out.write("\t\treturn false;\n");
      out.write("\t}\n");
      out.write("\telse if($(modalObj).find('.ISCPackageList').val()==null)\n");
      out.write("\t{\n");
      out.write("\t\t$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetPackageErrorMsg').text());\n");
      out.write("\t\treturn false;\n");
      out.write("\t}\n");
      out.write("\telse if($(modalObj).find('.ISCProcessesList').val()==null)\n");
      out.write("\t{\n");
      out.write("\t\t$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetProcessErrorMsg').text());\n");
      out.write("\t\treturn false;\n");
      out.write("\t}\n");
      out.write("\tif ($(modalObj).find('.fromDate').val() != ''){\n");
      out.write("\t\tdata.since = $(modalObj).find('.fromDate').val();\n");
      out.write("\t\tfilterObject.fromDate = $(modalObj).find('.fromDate').val(); \n");
      out.write("\t}\n");
      out.write("\telse \n");
      out.write("\t\tdelete data.since;\n");
      out.write("\tif ($(modalObj).find('.toDate').val() != ''){\n");
      out.write("\t\tdata.until = $(modalObj).find('.toDate').val();\n");
      out.write("\t\tfilterObject.toDate = $(modalObj).find('.toDate').val();\n");
      out.write("\t}\n");
      out.write("\telse \n");
      out.write("\t\tdelete data.until;\n");
      out.write("\tif ($(modalObj).find('.chartTypes').val() != undefined && $(modalObj).find('.chartTypes').val() != null )\n");
      out.write("\t\tfilterObject.chartType = $(modalObj).find('.chartTypes').val();\n");
      out.write("\t\n");
      out.write("\tif ($(modalObj).find('.ISCPackageList').val() != undefined  && $(modalObj).find('.ISCPackageList').val() != '')\n");
      out.write("\t\tfilterObject.package = $(modalObj).find('.ISCPackageList').val();\n");
      out.write("\tif ($(modalObj).find('.ISCProcessesList').val() != undefined  && $(modalObj).find('.ISCProcessesList').val() != ''){\n");
      out.write("\t\tfilterObject.process = $(modalObj).find('.ISCProcessesList').val();\n");
      out.write("\t\tdata.process = $(modalObj).find('.ISCProcessesList').val();\n");
      out.write("\t}\n");
      out.write("\tvar activeOnly = $(modalObj).find('.iscActiveProc').prop('checked');\n");
      out.write("    data.activeOnly = activeOnly;\n");
      out.write("    filterObject.activeProcess = activeOnly;\n");
      out.write("\n");
      out.write("\twidgetObject.title = $(modalObj).find('.chartName').val();\n");
      out.write("\t$('#'+widgetStateId).find('.widget-name').text($(modalObj).find('.chartName').val()); \n");
      out.write("\twidgetObject.filter = filterObject;\n");
      out.write("\tpersistWidget(widgetObject);\n");
      out.write("\t$('#instancesStatusFilter'+widgetStateId).modal('hide');\n");
      out.write("\tvar newObject = JSON.parse( JSON.stringify( filterObject ) )\n");
      out.write("\tdelete newObject.chartType;\n");
      out.write("\tif (compareObjects(newObject,oldObject))\n");
      out.write("\t\tchangeChartTypeSSBP(widgetStateId);\n");
      out.write("\telse{\n");
      out.write("\t\tclickRefresh($('#'+widgetStateId).find('.widget-header'),true);\n");
      out.write("\t\tsendAjaxCall('dashboard/widgets/processInstanceStatusSummary', \"POST\", false, true, \"json\", data, SSBPErrorCall, function(responseData){ \n");
      out.write("\t\t\tclickRefresh($('#'+widgetStateId).find('.widget-header'),false);\n");
      out.write("\t\t\tif(responseData.error_message == undefined)\n");
      out.write("\t\t\t\tpopulateProcessInstanceStatusCnt(responseData,widgetStateId);\n");
      out.write("\t\t\telse\n");
      out.write("\t\t\t\tshowErrorNotification(responseData.error_message);\n");
      out.write("\t\t});\n");
      out.write("\t}\n");
      out.write("}\n");
      out.write("\n");
      out.write("function fetchFilterProcessesISP(obj,pkgList,widgetId){\n");
      out.write("\tvar processesInPackege,widgetStateId,iscProcObj;\n");
      out.write("\tif ($(obj).length !=0 ){\n");
      out.write("\t\twidgetStateId = $(obj).attr('widgetId');\n");
      out.write("\t\tprocessesInPackege = $(obj).val();\n");
      out.write("\t} else {\n");
      out.write("\t\twidgetStateId = widgetId;\n");
      out.write("\t\tprocessesInPackege = pkgList;\n");
      out.write("\t}\n");
      out.write("\tvar widgetObject = getWidgetObject(widgetStateId);\n");
      out.write("\tvar modalObj = $('#instancesStatusFilter'+widgetStateId);\n");
      out.write("\tiscProcObj = $(modalObj).find('.ISCProcessesList');\n");
      out.write("\tvar prevProcessList = iscProcObj.val();\n");
      out.write("\tif($(obj).length == 0){\n");
      out.write("\t\tif (widgetObject != null && widgetObject.filter != undefined && widgetObject.filter != null && widgetObject.filter != ''){\n");
      out.write("\t\t\tvar filterObject = widgetObject.filter;\n");
      out.write("\t\t\tif (filterObject.process != undefined && filterObject.process != null){\n");
      out.write("\t\t\t\tprevProcessList = filterObject.process;\n");
      out.write("\t\t\t}\n");
      out.write("\t\t}\n");
      out.write("\t}\n");
      out.write("\t$(modalObj).find('.error-Msg').addClass('hide');\n");
      out.write("\tiscProcObj.removeAttr('style').removeClass('chzn-done');\n");
      out.write("\tiscProcObj.next().remove();\n");
      out.write("\tiscProcObj.empty();\n");
      out.write("\n");
      out.write("\tif(processesInPackege && processesInPackege.length >0){\n");
      out.write("\t\t$.each(processesInPackege,function(key,value){\n");
      out.write("\t\t\t$.each(packageListDashboard[value],function(key1,value1){\n");
      out.write("\t\t\t\tif(prevProcessList && prevProcessList.length >0){\n");
      out.write("                    var checkFlag = false;\n");
      out.write("                    $.each(prevProcessList,function(key2,value2){\n");
      out.write("                        if($(modalObj).find('.iscActiveProc').prop('checked')){\n");
      out.write("                           if(value2==value1.id || value2.split('}')[1].split('-')[0]===String(value1.id).split('}')[1].split('-')[0]){\n");
      out.write("                                checkFlag=true;\n");
      out.write("                                iscProcObj.append('<option value=\"'+value1.id+'\" selected>'+value1.name+'</option>');\n");
      out.write("                            }\n");
      out.write("                        }\n");
      out.write("                        else if(value2==value1.id){\n");
      out.write("                            checkFlag=true;\n");
      out.write("                            iscProcObj.append('<option value=\"'+value1.id+'\" selected>'+value1.name+'</option>');\n");
      out.write("                        }\n");
      out.write("                    });\n");
      out.write("                    if(checkFlag==false)\n");
      out.write("                        iscProcObj.append('<option value=\"'+value1.id+'\">'+value1.name+'</option>');\n");
      out.write("                }\n");
      out.write("                else\n");
      out.write("                    iscProcObj.append('<option value=\"'+value1.id+'\">'+value1.name+'</option>');\n");
      out.write("            });\n");
      out.write("\t\t});\n");
      out.write("   \t\t$(iscProcObj).find('option').each(function() {\n");
      out.write("            $(this).prevAll('option[value=\"' + this.value + '\"]').remove();\n");
      out.write("        });\n");
      out.write("\t\tiscProcObj.chosen({max_selected_options: 10});\n");
      out.write("\t\tiscProcObj.unbind(\"liszt:maxselected\").bind(\"liszt:maxselected\", function (){\n");
      out.write("\t\t\t$(modalObj).find('.error-Msg').removeClass('hide').text($('#widgetProcessMaxErrorMsg').text());\n");
      out.write("\t\t\treturn false;\n");
      out.write("\t\t});\n");
      out.write("\t\tiscProcObj.next().css('width',410);\n");
      out.write("\t\tiscProcObj.next().find('li.search-field input').css('width',250).css('height',25);\n");
      out.write("\t\tiscProcObj.closest('tr').removeClass('hide');\n");
      out.write("\t} else \n");
      out.write("\t\tiscProcObj.closest('tr').addClass('hide');\n");
      out.write("}\n");
      out.write("\n");
      out.write("function removeErrorMsgISP(obj){\n");
      out.write("\t$(obj).closest('table').find('.error-Msg').addClass('hide');\n");
      out.write("}\n");
      out.write("\n");
      out.write("function SSBPErrorCall(e)\n");
      out.write("{\n");
      out.write("\tif(e.responseText!=null && e.responseText!=undefined)\n");
      out.write("\t\tshowInformation(e.responseText);\n");
      out.write("\telse\n");
      out.write("\t\tshowInformation($(\"#widgetAjaxErrorMsg\").text());\n");
      out.write("\treturn false;\n");
      out.write("}\n");
      out.write("\n");
      out.write("/**\n");
      out.write(" * @Function Name : populateProcessInstanceStatusCnt\n");
      out.write(" * @Description   : creates a chart data for popluating it in to chart\n");
      out.write(" * @param         : Json object,query fetch / refresh\n");
      out.write(" * @returns       : chartData\n");
      out.write(" * */\n");
      out.write("function populateProcessInstanceStatusCnt(data, widgetId) \n");
      out.write("{\n");
      out.write("\tvar chartData = \"\";\n");
      out.write("\tif (!isObjectEmpty(data.process_instance_status_summary)) \n");
      out.write("\t{\n");
      out.write("\t\tchartData \t= '{\"chart\": {\"formatnumberscale\": \"0\",\"bgColor\":\"FFFFFF,FFFFFF\",\"showBorder\":\"0\",\"showvalues\": \"1\",\"legendposition\" : \"BOTTOM\",\"paletteColors\":\"69AA46,B94A48,FFB752,A069C3\",\"useroundedges\": \"1\", \"showalternatevgridcolor\": \"1\",\"canvasbgcolor\":\"#fafbf9\"},'\n");
      out.write("\t\tvar categories \t= '\"categories\": [{\"category\": [';\n");
      out.write("\t\tvar dataSet \t= '\"dataset\": [';\n");
      out.write("\t\tvar inprogress  = '\"seriesname\": \"In Progress\",\"data\": [';\n");
      out.write("\t\tvar failed  \t= '\"seriesname\": \"Failed\",\"data\": [';\n");
      out.write("\t\tvar suspended   = '\"seriesname\": \"Suspended\",\"data\": [';\n");
      out.write("\t\tvar terminated  = '\"seriesname\": \"Terminated\",\"data\": [';\n");
      out.write("\t\t\n");
      out.write("\t\t$.each(data.process_instance_status_summary,function(key,value) {\n");
      out.write("\t\t\tcategories +=  '{\"label\": \"'+key+'\"},';\n");
      out.write("\t\t\tinprogress += '{\"value\": \"'+parseInt(value.inProgressCount)+'\"},';\n");
      out.write("\t\t\tfailed += '{\"value\": \"'+parseInt(value.failedCount)+'\"},';\n");
      out.write("\t\t\tsuspended += '{\"value\": \"'+parseInt(value.suspendedCount)+'\"},';\n");
      out.write("\t\t\tterminated += '{\"value\": \"'+parseInt(value.terminatedCount)+'\"},';\n");
      out.write("\t\t});\n");
      out.write("\t\tcategories = categories.slice(0,parseInt(categories.length-1));\n");
      out.write("\t\tcategories += ']}],';\n");
      out.write("\t\tinprogress = inprogress.slice(0,parseInt(inprogress.length-1));\n");
      out.write("\t\tinprogress += ']';\n");
      out.write("\t\tfailed = failed.slice(0,parseInt(failed.length-1));\n");
      out.write("\t\tfailed += ']';\n");
      out.write("\t\tsuspended = suspended.slice(0,parseInt(suspended.length-1));\n");
      out.write("\t\tsuspended += ']';\n");
      out.write("\t\tterminated = terminated.slice(0,parseInt(terminated.length-1));\n");
      out.write("\t\tterminated += ']';\n");
      out.write("\t\tdataSet = dataSet + \"{\" + inprogress + \"},{\"+failed+\"},{\"+suspended+\"},{\"+terminated+\"}]\"; //dataset completed\n");
      out.write("\t\tchartData = chartData + \"\" + categories + \"\" +dataSet + \"}\";\n");
      out.write("\t}\n");
      out.write("\trenderChart_SSBP(chartData,widgetId);\n");
      out.write("};\n");
      out.write("\n");
      out.write("/** @Function Name   : renderChart_SSBP\n");
      out.write("*   @Description     : renders the actual chart\n");
      out.write("*   @param           : chart type,data to render\n");
      out.write("*   @returns         : chart\n");
      out.write("* */\n");
      out.write("function renderChart_SSBP(data,widgetId)\n");
      out.write("{\n");
      out.write("\tvar widgetObject = getWidgetObject(widgetId);\n");
      out.write("    var filterObject = widgetObject.filter;\n");
      out.write("    var chartType_SSBP;\n");
      out.write("    if (filterObject.chartType != undefined && filterObject.chartType != null)\n");
      out.write("    \tchartType_SSBP = filterObject.chartType;\n");
      out.write("    else \n");
      out.write("    \tchartType_SSBP = defaults.swf10;\n");
      out.write("\tFusionCharts.setCurrentRenderer('javascript');\n");
      out.write("\tif(FusionCharts(\"ProcessInstance\"+widgetId)!=undefined && FusionCharts(\"ProcessInstance\"+widgetId)!=null)\n");
      out.write("\t\t\tFusionCharts(\"ProcessInstance\"+widgetId).dispose();\n");
      out.write("\t\tvar ProcessInstanceChart = new FusionCharts(\"swf/FusionCharts/\"+chartType_SSBP,\"ProcessInstance\"+widgetId);\n");
      out.write("\t\tProcessInstanceChart.setJSONData(data);\n");
      out.write("\t\tProcessInstanceChart.setTransparent(true);\n");
      out.write("\t\tProcessInstanceChart.render(defaults.chart4 + widgetId);\n");
      out.write("}\n");
      out.write("\n");
      out.write("function checkFilterSSBP(obj)\n");
      out.write("{\n");
      out.write("\tif($(obj).closest('.modal-content').find('.ISCProcessesList>option:selected').length<=0)\n");
      out.write("\t\t$(obj).closest('.widget-body').find('.chart').text($('#widgetProcessFilterErrorMsg').text());\n");
      out.write("\tmodalHide($(obj).closest('.modal').attr('id'));\n");
      out.write("}\n");
      out.write("function changeChartTypeSSBP(widgetId){\n");
      out.write("\tvar chartRef = FusionCharts(\"ProcessInstance\" + widgetId);\n");
      out.write("\trenderChart_SSBP(chartRef.getJSONData(),widgetId)\n");
      out.write("}\n");
      out.write("$('.chartName').parent().prev().text($('#widgetChartName').text());\n");
      out.write("$('.ISCPackageList').parent().prev().text($('#widgetPackages').text());\n");
      out.write("$('.ISCProcessesList').parent().prev().text($('#widgetProcesses').text());\n");
      out.write("$('.fromDate').closest('td').prev().text($('#widgetFromDate').text());\n");
      out.write("$('.toDate').closest('td').prev().text($('#widgetToDate').text());\n");
      out.write("$('.chartTypes').parent().prev().text($('#widgetChartType').text());\n");
      out.write("$('.applyButton').text($('#widgetFilterApply').text());\n");
      out.write("$('.iscLabelActiveProcess').text($(\"#widgetActiveProcess\").text());\n");
      out.write("</script>\n");
      out.write("</head>\n");
      out.write("<div id='status_summary_by_process' class=\"chart\"></div>\n");
      out.write("<div id=\"instancesStatusFilter\" class=\"modal fade\" tabindex=\"-1\">\n");
      out.write("    <div class=\"modal-dialog\">\n");
      out.write("        <div class=\"modal-content\">\n");
      out.write("            <div class=\"modal-header\">\n");
      out.write("                <button type=\"button\" class=\"close\" aria-hidden=\"true\" onclick='javascript:checkFilterSSBP(this);'>&times;</button>\n");
      out.write("                <span class=\"modal_heading\">Status Summary by Process</span>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"modal-body\">\n");
      out.write("                <table class=\"table noLines chartFilterTable\">\n");
      out.write("                \t<tr><td class=\"error-Msg text-danger hide\" colspan=\"2\"></td></tr>\n");
      out.write("\t\t\t\t\t<tr><td></td><td colspan=\"3\"><input type=\"text\" class=\"chartName\" maxlength=\"50\"></td></tr>\n");
      out.write("\t\t\t\t\t<tr class='iscActiveProcess'>\n");
      out.write("                        <td class='iscLabelActiveProcess'></td>\n");
      out.write("                        <td colspan=\"3\">\n");
      out.write("                        <label class=\"inline\">\n");
      out.write("                        <input onchange='updateISCPackages(this)' type=\"checkbox\" class=\"iscActiveProc ace ace-switch ace-switch-5\">\n");
      out.write("                            <span class=\"lbl\"></span>\n");
      out.write("                        </label>\n");
      out.write("                        </td>\n");
      out.write("                    </tr>\n");
      out.write("\t\t\t\t\t<tr>\n");
      out.write("                        <td></td>\n");
      out.write("                        <td colspan=\"3\"><select multiple class=\"ISCPackageList\" onchange=\"fetchFilterProcessesISP(this);\" data-placeholder=\"Select Packages\">/select></td>\n");
      out.write("                    </tr>\n");
      out.write("                    <tr class=\"hide\">\n");
      out.write("                        <td></td>\n");
      out.write("                        <td colspan=\"3\"><select multiple class=\"ISCProcessesList\" data-placeholder=\"Select Processes\" onchange=\"removeErrorMsgISP(this);\"></select></td>\n");
      out.write("                    </tr>\n");
      out.write("                    <tr>\n");
      out.write("                        <td></td>\n");
      out.write("                        <td>\n");
      out.write("                           <div class=\"input-group pull-left\">\n");
      out.write("                              <input type=\"text\" class=\"chartFilterDates fromDate pull-left\" data-date-format=\"yyyy-mm-dd\">\n");
      out.write("                              <span class=\"input-group-addon\">\n");
      out.write("                                 <i class=\"fa fa-calendar bigger-110\"></i>\n");
      out.write("                              </span>\n");
      out.write("                           </div>\n");
      out.write("                        </td>\n");
      out.write("                        <td></td>\n");
      out.write("                        <td>\n");
      out.write("                           <div class=\"input-group pull-left\">\n");
      out.write("                              <input type=\"text\" class=\"chartFilterDates toDate pull-left\" data-date-format=\"yyyy-mm-dd\">\n");
      out.write("                              <span class=\"input-group-addon\">\n");
      out.write("                                 <i class=\"fa fa-calendar bigger-110\"></i>\n");
      out.write("                              </span>\n");
      out.write("                           </div>\n");
      out.write("                        </td>\n");
      out.write("                    </tr>\n");
      out.write("                    <tr>\n");
      out.write("\t\t\t\t\t\t<td></td>\n");
      out.write("\t\t\t\t\t\t<td><select class=\"chartTypes\"></select></td>\n");
      out.write("\t\t\t\t\t</tr>\n");
      out.write("                </table>\n");
      out.write("            </div>\n");
      out.write("            <div class=\"modal-footer\">\n");
      out.write("                <button class=\"btn btn-primary btn-sm applyButton\" type=\"button\" aria-hidden=\"true\" onclick=\"applyInstancesStatusFilter(this);return false;\"></button>\n");
      out.write("            </div>\n");
      out.write("        </div>\n");
      out.write("    </div>\n");
      out.write("</div>\n");
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
}
