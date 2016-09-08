 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<html>
  <head>
	  <link href="style/plugin/chosen.css" rel="stylesheet"/>
	  <link href="style/plugin/datepicker.css" rel="stylesheet"/>
	  <link href="style/custom/vacation/vacation.css?version=2676" rel="stylesheet"/>
	  <script type="text/javascript" src="scripts/plugin/chosen.jquery.min.js"></script>
	  <script type="text/javascript" src="scripts/plugin/workflow/moment.min.js"></script>
	  <script type="text/javascript" src="scripts/plugin/bootstrap-datepicker.min.js"></script>
	  <script>
	    var vzerorecords_msg = "<fmt:message key="com_intalio_bpms_vacations_table_zerorecords"/>";
	    var vinfo_msg = "<fmt:message key="com_intalio_bpms_vacations_table_info"/>";
	    var vinfoempty_msg = "<fmt:message key="com_intalio_bpms_vacations_table_infoempty"/>";
	    var vinfofiltered_msg = "<fmt:message key="com_intalio_bpms_vacations_table_infofiltered"/>";
	    var vemptytable_msg = "<fmt:message key="com_intalio_bpms_vacations_table_emptytable"/>";
	    var vemptyselect_msg = "<fmt:message key="com_intalio_bpms_vacations_emptyselect_info_msg"/>";
	    var vend_vacation_title_msg = "<fmt:message key="com_intalio_bpms_vacations_end_vacation_title"/>";
	    var vbutton_create_msg = "<fmt:message key="com_intalio_bpms_vacations_toolbar_button_create"/>";
	    var vbutton_update_msg = "<fmt:message key="com_intalio_bpms_vacations_toolbar_button_update"/>";
	    var vbutton_end_msg = "<fmt:message key="com_intalio_bpms_vacations_toolbar_button_end"/>";
	    var vend_vacation_conf = "<fmt:message key="com_intalio_bpms_vacations_modalDialog_end_vacation_confirmation"/>";
	    var vbutton_save_msg = "<fmt:message key="com_intalio_bpms_vacations_modalDialog_button_save"/>";
	    var vmodal_end_msg = "<fmt:message key="com_intalio_bpms_vacations_modalDialog_button_end"/>";
	    var vselect_user_msg = "<fmt:message key="com_intalio_bpms_vacations_modalDialog_select_user"/>";
	    var voneselect_info_msg = "<fmt:message key="com_intalio_bpms_vacations_oneselect_info_msg"/>";
	    var vsame_user_sub_msg = "<fmt:message key="com_intalio_bpms_vacations_same_user_substitute_warn_msg"/>";
	    var vsave_success_msg = "<fmt:message key="com_intalio_bpms_vacations_save_success_msg"/>";
	    var vdate_conflict_msg = "<fmt:message key="com_intalio_bpms_vacations_date_conflict_warn_msg"/>";
	    var vinvalid_sub_warn_msg = "<fmt:message key="com_intalio_bpms_vacations_invalid_substitute_warn_msg"/>";
	    var vsave_exception_msg = "<fmt:message key="com_intalio_bpms_vacations_save_exception_msg"/>";
	    var vend_success_msg = "<fmt:message key="com_intalio_bpms_vacations_end_vacation_success_msg"/>";
	    var vend_exception_msg = "<fmt:message key="com_intalio_bpms_vacations_end_vacation_exception_msg"/>";
	    var vempty_desc_msg = "<fmt:message key="com_intalio_bpms_vacations_empty_desc"/>";
	    var vempty_substitute_msg = "<fmt:message key="com_intalio_bpms_vacations_empty_substitute"/>";
	    var vempty_user_msg = "<fmt:message key="com_intalio_bpms_vacations_empty_user"/>";
	    var vempty_fromdate_msg = "<fmt:message key="com_intalio_bpms_vacations_empty_fromdate"/>";
	    var vempty_todate_msg = "<fmt:message key="com_intalio_bpms_vacations_empty_todate"/>";
	    var vdateformat_warn_msg = "<fmt:message key="com_intalio_bpms_vacations_dateformat_warn_msg"/>";
	    var vdaterange_warn_msg = "<fmt:message key="com_intalio_bpms_vacations_daterange_warn_msg"/>";
	    var vfetch_user_error_msg = "<fmt:message key="com_intalio_bpms_vacations_fetch_user_exception_msg"/>";
	  </script>
	  <script type="text/javascript" src="scripts/custom/vacation/vacation.js?version=2676"></script>

  </head>
  <body>
    <div id="breadcrumbs" class="breadcrumbs">
	    <ul class="breadcrumb">
		    <li class="active"><i class="fa fa-calendar"></i> <a href="#" onclick="javascript:resetVacationsFilter();" class="noDecoration">&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_vacations_breadcrumb"/></a></li>
	    </ul>
    </div>
    <div class="page-content">
	    <div id="vacationsTableDiv" class="col-xs-12">
		    <div class="table-responsive">
			    <table id="vacations" class="table table-striped table-bordered table-hover">
			    <thead>
				    <tr id="rowVacationHeader">
					    <th><input type="checkbox" class="ace"><span class="lbl"></span></th>
					    <th></th>
					    <th><fmt:message key="com_intalio_bpms_vacation_user"/></th>
					    <th><fmt:message key="com_intalio_bpms_vacation_fromDate"/></th>
					    <th><fmt:message key="com_intalio_bpms_vacation_toDate"/></th>
					    <th><fmt:message key="com_intalio_bpms_vacation_substitute"/></th>
					    <th><fmt:message key="com_intalio_bpms_vacation_description"/></th>
					    <th>UserId</th>
					    <th>SubstitueId</th>
				    </tr>
			    </thead>
		    <tbody id="workflow_vacations_rows">
		    </tbody>
		    </table>
		    </div>
	    </div>
	    <div id="saveVacationModal" class="modal fade" tabindex="-1"
			    role="dialog" aria-labelledby="saveVacationModal" aria-hidden="true">
			    <div class="modal-dialog">
			    <div class="modal-content">
			    <div class="modal-header">
				    <button type="button" class="close" data-dismiss="modal"
					    aria-hidden="true">&times;</button>
				    <span class="modal_heading" id="saveVacationModalHeader"><fmt:message key="com_intalio_bpms_vacations_save_title"/></span>
			    </div>
			    <div class="modal-body">
				    <div id="vacationErrorDiv"><span id="errorMessage" class="text-danger"></span></br></br></div>
				    <div id="vacationModalBody" style="width:75%">
					<input type="hidden" name="vacationId" id="vacationId"/>
					<table id="createVacation" class="table noLines" width="100%">
					    <tr>
						    <td><fmt:message key="com_intalio_bpms_vacation_user"/></td>
						    <td class="pull-right"><select name="user" id="user"></select></td>
					    </tr>
					    <tr>
						    <td><fmt:message key="com_intalio_bpms_vacation_fromDate"/></td>
						    <td class="pull-right">
							<div class="input-group">
							  <input type="text" maxlength="10" name="fromdate" id="fromdate" class="datepicker pull-right" data-date-format="dd/mm/yyyy">
							  <span class="input-group-addon">
							    <i class="fa fa-calendar bigger-110"></i>
							  </span>
							</div>
						    </td>
					    </tr>
					    <tr>
						    <td><fmt:message key="com_intalio_bpms_vacation_toDate"/></td>
						    <td class="pull-right">
							<div class="input-group">
							  <input type="text" maxlength="10" name="todate" id="todate" class="datepicker pull-right" data-date-format="dd/mm/yyyy">
							  <span class="input-group-addon">
							    <i class="fa fa-calendar bigger-110"></i>
							  </span>
							</div>
						    </td>
					    </tr>
					    <tr>
						    <td><fmt:message key="com_intalio_bpms_vacation_substitute"/></td>
						    <td class="pull-right"><select name="substitute" id="substitute"></td>
					    </tr>
					    <tr>
						    <td><fmt:message key="com_intalio_bpms_vacation_description"/></td>
						    <td class="pull-right"><textarea style="resize: none;" rows="3" cols="27" name="desc" id="desc" maxlength="225"></textarea></td>
					    </tr>
					</table>
				    </div>
			    </div>
			    <div class="modal-footer">
				    <button id ="activeVacationEnd" class="btn btn-primary btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="endVacation();"><fmt:message key="com_intalio_bpms_vacations_modalDialog_button_delete"/></button>
				    <button onclick="javascript:saveVacation();" type="button" aria-hidden="true"
					    class="btn btn-primary btn-sm"><fmt:message key="com_intalio_bpms_vacations_modalDialog_button_save"/></button>
			    </div>
			    </div>
			    </div>
	    </div>
	    <div id="deleteVacationModal" class="modal fade">
		    <div class="modal-dialog">
			    <div class="modal-content">
				    <div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						    &times;
					    </button>
					    <span class="modal_heading"><fmt:message key="com_intalio_bpms_vacations_end_vacation_title"/></span>
				    </div>
				    <div class="modal-body">
						<p class=""></p>
				    </div>
				    <div class="modal-footer">
					    <button class="btn btn-danger btn-sm"  type="button" data-dismiss="modal" aria-hidden="true" onclick="endVacation();"><fmt:message key="com_intalio_bpms_vacations_modalDialog_button_end"/></button>
				    </div>
			    </div>
		    </div>
	    </div>
   </div>
  </body>
</html>
