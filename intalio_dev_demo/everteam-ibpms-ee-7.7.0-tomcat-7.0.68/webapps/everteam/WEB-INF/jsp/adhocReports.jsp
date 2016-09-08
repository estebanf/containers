 <%-- 
 Copyright (C) 2005-2015 Intalio inc.

 The program(s) herein may be used and/or copied only with
 the written permission of Intalio Inc. or in accordance with
 the terms and conditions stipulated in the agreement/contract
 under which the program(s) have been supplied. 
--%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<head>
<meta charset="utf-8" />
<title><fmt:message key="intalio.collaboration" /></title>
<link href="style/custom/BAM/adhocReports.css?version=2676" rel="stylesheet">
<link href="style/plugin/selectize.css" rel="stylesheet">
<link rel="stylesheet" href="style/plugin/codemirror.css">
</head>
<body>
	<div id="breadcrumbs" class="breadcrumbs">
		<ul class="breadcrumb">
			<li><i class="fa fa-bar-chart-o"></i>&nbsp;&nbsp;<fmt:message key="com_intalio_bpms_module_bam"/></a></li>
			<li class="active"><a herf="#" onclick="selectMenuAndChangepage(this,'adhoc','adhocReport.htm');" class="noDecoration"><fmt:message key="bam_adhoc_reports_header"/></a></li>
		</ul>
	</div>
	<div class="page-content">
		<div id="adhoc_reports_div">
			<div class="table-responsive">
				<table id="adhoc_reports_list" class="table table-striped table-bordered table-hover">
					<thead>
						<tr id="reportsListHeader">
							<th><label class="position-relative"><input type="checkbox" onclick="updateCheckbox(this)" class="ace"><span class="lbl"></label></span></th>
							<th><fmt:message key="bam_adhoc_reports_listing_header_name"/></th>
							<th><fmt:message key="bam_adhoc_reports_listing_header_desc"/></th>
							<th><fmt:message key="bam_adhoc_reports_listing_header_owner"/></th>
							<th><fmt:message key="bam_adhoc_reports_listing_header_modified"/></th>
							<th><fmt:message key="bam_adhoc_reports_listing_header_users_roles"/></th>
						</tr>
					</thead>
					<tbody >
					</tbody>
				</table>
			</div>
		</div>
		<div class="hide">
			<span class="pull-right"><a class="btn btn-white btn-xs" id="execute_refresh_button" title="Refresh"><i class="fa fa-refresh"></i></a></span>
			<label><fmt:message key='bam_adhoc_reports_description'/></label>
			<span id="reportDescription"></span>
		</div>
		<div id="executeReport" style="height:350px;" class="hide">
			
		</div>
	</div>
	<div id="adhocTableReportDiv" class="hide">
		<div class="table-responsive">
			<table id="adhocTableReport" class="table table-striped table-bordered table-hover">
				<thead><tr></tr></thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
	<div id="manageTemplatesModal" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="bam_adhoc_templates_listing_header"/></span>
				</div>
				<div class="modal-body">
					<div id="listOfTemplates">
					<table class="table table-striped table-bordered table-hover" id="adhocTemplates">
						<thead>
							<tr id="templatesHeader">
								<th width="20px"><label class="position-relative"><input type="checkbox" onclick="javascript:updateCheckbox(this)" class="ace"><span class="lbl"></label></span></th>
								<th class="nowrap">
								<fmt:message key="bam_adhoc_reports_listing_header_name"/>
								</th>
								<th class="nowrap">
								<fmt:message key="bam_adhoc_reports_listing_header_desc"/>
								</th>
							<th class="nowrap">
								<fmt:message key="bam_adhoc_reports_listing_header_owner"/>
							</th>
							<th class="nowrap"><fmt:message key="bam_adhoc_reports_listing_header_modified"/></th>
							<th class="nowrap"><fmt:message key="bam_adhoc_reports_listing_header_users_roles"/></th>
							</tr>
						</thead>
						<tbody >
						</tbody>
					</table>

					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="AddTemplatesModal" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" 
						aria-hidden="true">&times;</button>
					<span class="modal_heading"><fmt:message key="bam_adhoc_add_template"/></span>
				</div>
				<div class="modal-body">
					<div id="addTemplateError" class="text-danger"></div>
					<form id="addTemplateForm" enctype="multipart/form-data" method="POST" style="display:inline;" action="adhocreport/definitions">
						<table width="525" border="0" cellspacing="0" cellpadding="4" style="margin-left: 10px; ">
						<tr>
							<td width="60" ><fmt:message key="bam_adhoc_upload_path"/></td>
							<td width="300"><input type="file" name="file" id ="reports-template" value="" /></td>
							<td width="30" style="text-align: right;"><button height="28" onclick="uploadAdhocTemplate();"  class='btn btn-primary btn-minier' type="button" ><fmt:message key="bam_adhoc_template_add"/></button></td>
						</tr>
						<tr>
							<td></td>
							<td width="300"><span id="addReportTemplateMessage"></span></td>
						<tr>
						</table>
					</form>
				</div>
				<br>
			</div>
		</div>
	</div>
	<div id="updateDataSource" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" 
						aria-hidden="true">&times;</button>
					<span class="modal_heading"><fmt:message key="bam_adhoc_update_data_source_header"/></span>
				</div>
				<div class="modal-body">
					<span id="updateDataSourceErrMsg" class="hide text-danger"></span>
					<table class="table">
						<tr>
							<td><fmt:message key='bam_adhoc_update_template_name'/></td><td><input onkeypress="javascript:removeError()" id="dataDefName" maxlength="100" type="text" size="22"/></td>
						</tr>
						<tr>
							<td><fmt:message key='bam_adhoc_update_template_description'/></td><td><textarea onkyepress="removeError()" maxlength="200" id="dataDefDescription" style="margin: 0px; height: 53px; width: 194px;"/></td>
						</tr>
					</table>
					<div id="dataSourcesList">
						<div class="tabbable tabs-left">
							<ul class="nav nav-tabs">
							</ul>
							<div class="tab-content" style="overflow: auto;">
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary btn-sm"  type="button" onclick="javascript:updateDataSources()" aria-hidden="true"><fmt:message key="org_intalio_common_settings_update"/></button>
				</div>
			</div>
		</div>
	</div>
	<div id="createReportModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" 
						aria-hidden="true" onclick="closeCreateReportModal();">&times;</button>
					<span class="modal_heading"><fmt:message key="bam_adhoc_create_step1_heading"/></span>
				</div>
				<div class="modal-body" style="min-height:200px;">
					<div id="createReportError" class="text-danger"></div>
					<div id="report-steps">
						<div id="report-step1" class="report-step">
							<div style="width:500px;margin-left:auto;margin-right:auto;">
								<table style="width:100%">
									<tr>
										<td><fmt:message key="bam_adhoc_create_step1_widget_type"/></td>
																				<td width="25%">
											<label>
												<input type="radio" class="ace" value="table" id="report-type-table" name="report-select-radio" onchange="checkStep1(this)">
												<span class="lbl"> <fmt:message key="bam_adhoc_create_step1_table"/></span>
											</label>
										</td>
										<td>
											<label>
												<input type="radio" class="ace" value="chart" id="report-type-chart" name="report-select-radio" onchange="checkStep1(this)">
												<span class="lbl"> <fmt:message key="bam_adhoc_create_step1_chart"/></span>
											</label>
										</td>
										<td width="10%"></td>
									</tr>
									<tr style="margin-top:10px;">
										<td><fmt:message key="bam_adhoc_create_step1_select_data_definition"/></td>
										<td colspan="3">
											<select id="data-definition" style="width:250px;" placeholder='Choose Data Definition' onchange="checkStep1(this)">
											</select>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div id="report-step2" class="report-step hide">
							<div class="row">
								<div class="col-sm-3">
									<div class="">
										<select id="dataset-select" placeholder='<fmt:message key="bam_adhoc_create_step2_select_a_dataset"/>' onchange="formColumnsTree(this,false)">
											
										</select>
									</div>
									<div id="columns-tree" style="overflow:auto;">
										 
									</div>
									<div id="custom-tree-div" class="hide">
									<div>
										<span class="pull-right iconCursor ace-popover" data-placement="right" data-content='<fmt:message key="bam_adhoc_create_step2_add_custom_column"/>' data-trigger="hover" onclick="showAddCustomColumn();">
											<i class="fa fa-plus-circle bigger-130"></i>
										</span>
										<h5>Custom Columns</h5>
									</div>
									<hr style="margin-top:5px;margin-bottom:3px;">
									<div id="custom-columns-tree" style="overflow:auto;height:180px;">
										
									</div>
									</div>
								</div>
								<div class="col-sm-9" style="overflow:visible;">
									<div class="drop-area drop-highlight" ondrop="dropDataset(event,this)" ondragover="allowDropDataset(event,this)" ondragleave="onDragLeaveDataset(event,this);"style="min-height:200px;" >
										<div class="drag-empty" style="font-size:16px;">
											<i class="fa fa-crosshairs"></i>
											<fmt:message key="bam_adhoc_create_step2_drag_and_drop"/>
										</div>
									</div>
									<div id="custom_column_div" style="overflow:visible;">
										<div class="" >
											<div class="custom-column-title">
												<button type="button" class="close" aria-hidden="true" onclick="hideCustomColumn();">
													&times;
												</button>
												<fmt:message key="bam_adhoc_create_step2_add_custom_column"/>
											</div>	
											<div class="custom-column">
												<table style="width:100%" class="two_column_table">
													<tr class="hide text-danger" id="custom-column-error">
														<td colspan="3"></td>
													</tr>
													<tr>
														<td width="20%"><fmt:message key="bam_adhoc_create_step2_column_name"/></td>
														<td width="30%">
															<input class="form-control"  id="custom-column-name" placeholder='<fmt:message key="bam_adhoc_create_step2_column_name"/>'/>
														</td>
														<td width="20%"><fmt:message key="bam_adhoc_create_step2_column_display_name"/></td>
														<td width="30%">
															<input class="form-control"  id="custom-column-display-name" placeholder='<fmt:message key="bam_adhoc_create_step2_column_display_name"/>'/>
														</td>
														
													</tr>
													<tr>
														<td  rowspan="2"><fmt:message key="bam_adhoc_create_step2_expression"/>
														&nbsp;&nbsp;<i class='fa fa-info-circle iconCursor ace-popover' data-placement='bottom' data-content='Sample Expressions' data-trigger='hover' onclick='javascript:showSampleExp();'></i>	
														</td>
														<td rowspan="2" class="expression-editor">
															<textarea class="form-control"  id="custom-column-expression" placeholder='<fmt:message key="bam_adhoc_create_step2_expression"/>' style="height:60px" value=" "></textarea>
															<div class="hide" id="show-expression-hint">
																
															</div>
														</td>
														<td ><fmt:message key="bam_adhoc_create_step2_aggregation"/></td>
														<td >
															<select id="custom-column-function" placeholder='Choose Aggregation'>
																<option value="">None</option>
																<option value="SUM">Sum</option>
																<option value="AVE">Average</option>
																<option value="COUNT">Count</option>
																<option value="COUNTDISTINCT">Distinct Count</option>
																<option value="MIN">Minimum</option>
																<option value="MAX">Maximum</option>
																<option value="MEDIAN">Median</option>
																<option value="MODE">Mode</option>
																<option value="VARIANCE">Variance</option>
																<option value="STDDEV">Standard Deviation</option>
															</select>
														</td>
													</tr>
													<tr>
														<td style="padding-left:15px"><fmt:message key="bam_adhoc_create_step2_data_type"/></td>
														<td style="padding-right:3px;margin-top:3px;" class="customColumnTypeClass">
															<select id="custom-column-type" placeholder="Choose Data Type">
																<option value="integer"><fmt:message key="bam_adhoc_create_step2_integer"/></option>
																<option value="string"><fmt:message key="bam_adhoc_create_step2_string"/></option>
																<option value="float"><fmt:message key="bam_adhoc_create_step2_float"/></option>
																<option value="date-time">Date-time</option>
																<option value="time">Time</option>
																<option value="date">Date</option>
																<option value="boolean">Boolean</option>
															</select>
														</td>
													</tr>
													<tr>
														<td colspan="4">
															<a class="btn btn-white btn-sm pull-right custom-col-update hide" onclick="updateCustomColumn(this);"><fmt:message key="bam_adhoc_create_step2_custom_update"/></a>&nbsp;&nbsp;
															<a class="btn btn-white btn-sm pull-right custom-col-add" onclick="addCustomColumn();"><fmt:message key="bam_adhoc_create_step2_custom_add"/></a>&nbsp;&nbsp;
														</td>
													</tr>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>	
						</div>
						<div id="report-step3" class="report-step hide">
							<div id="design-chart" class="hide">
								<div class="col-sm-12">
									<div id="define-chart-preview" style="width:300px;margin-left:auto;margin-right:auto;text-align:center;">
										<i class="fa fa-bar-chart-o grey" style="font-size:200px;"></i>
										<br><fmt:message key="bam_adhoc_create_step3_define_chart_prop_to_prev"/>
									</div>
									<div id="design-chart-preview" class="hide" style="height:250px;width:600px;margin-left:auto;margin-right:auto;">
										
									</div>
								</div>
							</div>
							<div id="design-table" class="hide">
								<div class="row">
									<div class="col-sm-12">
										<div class="preview" id="design-table-preview">
										</div>
									</div>
								</div>
							</div>
							<div class="auto-overflow" id="design-report-filter">
								<div id="" class="tabbable tabs-left">
									<ul class="nav nav-tabs" >
										<li class="active"><a id="report-design-define-chart-li" data-toggle="tab" href="#report-design-define-chart"> <fmt:message key="bam_adhoc_create_step3_define_chart"/></a></li>
										<li><a data-toggle="tab" href="#report-filter-div"> <fmt:message key="bam_adhoc_create_step3_filter"/></a></li>
										<li><a data-toggle="tab" href="#report-design-ordering"> <fmt:message key="bam_adhoc_create_step3_ordering"/></a></li>
										<li><a data-toggle="tab" href="#report-design-grouping"> <fmt:message key="bam_adhoc_create_step3_grouping"/></a></li>
									</ul>
									<div class="tab-content" style="overflow: auto;">
										<div class="tab-pane active row-filter" id="report-design-define-chart" style="min-height:100px;">
											<table style="width:100%" class="two_column_table">
												<tr>
													<td width="20%"> <fmt:message key="bam_adhoc_create_step3_chart_type"/></td>
													<td width="30%" colspan="2">
														<select id="design-chart-type" placeholder='<fmt:message key="bam_adhoc_create_step3_define_chart_prop"/>' onchange="designChartTypeChage(this);">
															
														</select>
													</td>
													<td width="20%"></td>
													<td width="30%"></td>
												</tr>
												<tr>
													<td>
														  <fmt:message key="bam_adhoc_create_step3_x_axis"/>
													</td>
													<td colspan="2">
														<select id="design-report-x-axis" placeholder="Select Value" onchange="xAxisChange(this);">
															
														</select>
													</td>
													
												</tr>
												<tr>
													<td>
														 <fmt:message key="bam_adhoc_create_step3_y_axis"/>
													</td>
													<td colspan="2">
														<select id="design-report-y-axis" placeholder="Select Value" onchange="yAxisChange(this);">
															
														</select>
													</td>
												</tr>
											</table>
										</div>
										<div class="tab-pane row-filter" id="report-filter-div" style="min-height:100px;">
											<div style="margin-bottom:10px;">
												<a class="ace-popover iconCursor" onclick="addFilterCondition();" data-content="Add Filter" data-trigger="hover" data-placement="right"><i class="fa fa-plus-circle bigger-130"></i></a>
											</div>
											<div class="filter-condition">
												<table style="width:100%;">
													
												</table>
											</div>
										</div>
										<div class="tab-pane row-filter" id="report-design-ordering" style="min-height:100px;">
											<table style="width:500px;">
												<tr>
													<td width="33%">
														<fmt:message key="bam_adhoc_create_step3_order_by"/>
													</td>
													<td width="33%">
														<select id="design-chart-order-by" placeholder="Select Value" onchange="chartOrderByChange(this);">
															
														</select>
													</td>
													<td width="33%">
														<select id="design-chart-order-type" placeholder="Select Value" onchange="chartOrderType(this);">
															<option value="asc" selected="true"> <fmt:message key="bam_adhoc_create_step3_ascending"/></option>
															<option value="desc"> <fmt:message key="bam_adhoc_create_step3_descending"/></option>
														</select>
													</td>
												</tr>
											</table>
										</div>
										<div class="tab-pane row-filter" id="report-design-grouping" style="min-height:100px;">
											<table style="width:300px;">
												<tr>
													<td width="40%">
														 <fmt:message key="bam_adhoc_create_step3_group_by"/>
													</td>
													<td width="60%">
														<select id="design-chart-group-by" placeholder="Select Value" onchange="chartGroupByChange(this);">
															
														</select>
													</td>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id="report-step4" class="report-step hide">
							<div id="table_properties">
								<div class="column-selector">

								</div>
								<div id="column_properties" class="tabbable tabs-left">
									<ul class="nav nav-tabs" >
										<li class="active"><a data-toggle="tab" href="#column_prop"><fmt:message key="bam_adhoc_create_step4_properties"/></a></li>
										<li class=""><a data-toggle="tab" href="#format_prop"><fmt:message key="bam_adhoc_create_step4_formatter"/></a></li>
										<li class=""><a data-toggle="tab" href="#modify_prop"><fmt:message key="bam_adhoc_create_step4_modifier"/></a></li>
									</ul>
									<div class="tab-content" style="overflow: auto;">
										<div class="tab-pane active row-filter" id="column_prop" style="min-height:100px;">
											<div style="margin-top:8px;margin-bottom:8px;" id="column_basic_prop_table">
												<table style="width:400px;">
													<tr>
														<td><fmt:message key="bam_adhoc_create_step4_column_name"/></td>
														<td>
															<input class="form-control" id="table-prop-column-name" placeholder="" onblur="updateSelectedColumnName(this);" />
														</td>
													</tr>
													<tr>
														<td><fmt:message key="bam_adhoc_create_step4_column_width"/></td>
														<td>
															<div class="input-group">
																<input type="number" id="table-prop-column-width" class="form-control" onblur="updateSelectedColumnWidth(this);">
																<span class="input-group-addon">
																	%
																</span>
															</div>
														</td>
													</tr>
												</table>
											</div>
										</div>
										<div class="tab-pane row-filter" id="format_prop" style="">
											<div class="condition">
												<div class="" style="font-size:14px; color:#393939;">
												<fmt:message key="bam_adhoc_create_step4_condition"/>
												</div>
												<table style="width:100%;" id="format_cond_table">
													<tr>
														<td width="30%">
															<select id="format-condition" placeholder="Choose condition..." onchange="formatConditionChange(this);">
																
															</select>
														</td>
														<td width="30%"></td>
														<td width="30%"></td>
													</tr>
												</table>
											</div>
											<div class="format">
												<div class="" style="font-size:14px; color:#393939;margin-bottom:15px;">
												<fmt:message key="bam_adhoc_create_step4_format_properties"/>
												</div>
												<div class="col-sm-9">
													<table style="width:100%">
														<tr>
															<td width="5%">
																<select id="format-colorpicker-1" onchange="formatColorChange(this);">
																	<option value="#ffffff">#ffffff</option>
																	<option value="#d06b64">#d06b64</option>
																	<option value="#f83a22">#f83a22</option>
																	<option value="#393939" selected="">#393939</option>
																	<option value="#ff7537">#ff7537</option>
																	<option value="#ffad46">#ffad46</option>
																	<option value="#42d692">#42d692</option>
																	<option value="#16a765">#16a765</option>
																	<option value="#7bd148">#7bd148</option>
																	<option value="#b3dc6c">#b3dc6c</option>
																	<option value="#fbe983">#fbe983</option>
																	<option value="#fad165">#fad165</option>
																	<option value="#92e1c0">#92e1c0</option>
																	<option value="#9fe1e7">#9fe1e7</option>
																	<option value="#9fc6e7">#9fc6e7</option>
																	<option value="#4986e7">#4986e7</option>
																	<option value="#9a9cff">#9a9cff</option>
																	<option value="#b99aff">#b99aff</option>
																	<option value="#c2c2c2">#c2c2c2</option>
																	<option value="#cabdbf">#cabdbf</option>
																	<option value="#cca6ac">#cca6ac</option>
																	<option value="#f691b2">#f691b2</option>
																	<option value="#cd74e6">#cd74e6</option>
																	<option value="#a47ae2">#a47ae2</option>
																	<option value="#555">#555</option>
																</select>
															</td>
															<td width="45%"><fmt:message key="bam_adhoc_create_step4_color"/></td>
															<td width="5%">
																<select id="format-colorpicker-2" onchange="formatBackgroundChange(this)">
																	<option value="#ffffff" selected="">#ffffff</option>
																	<option value="#d06b64">#d06b64</option>
																	<option value="#f83a22">#f83a22</option>
																	<option value="#393939">#393939</option>
																	<option value="#ff7537">#ff7537</option>
																	<option value="#ffad46">#ffad46</option>
																	<option value="#42d692">#42d692</option>
																	<option value="#16a765">#16a765</option>
																	<option value="#7bd148">#7bd148</option>
																	<option value="#b3dc6c">#b3dc6c</option>
																	<option value="#fbe983">#fbe983</option>
																	<option value="#fad165">#fad165</option>
																	<option value="#92e1c0">#92e1c0</option>
																	<option value="#9fe1e7">#9fe1e7</option>
																	<option value="#9fc6e7">#9fc6e7</option>
																	<option value="#4986e7">#4986e7</option>
																	<option value="#9a9cff">#9a9cff</option>
																	<option value="#b99aff">#b99aff</option>
																	<option value="#c2c2c2">#c2c2c2</option>
																	<option value="#cabdbf">#cabdbf</option>
																	<option value="#cca6ac">#cca6ac</option>
																	<option value="#f691b2">#f691b2</option>
																	<option value="#cd74e6">#cd74e6</option>
																	<option value="#a47ae2">#a47ae2</option>
																	<option value="#555">#555</option>
																</select>
															</td>
															<td width="40%">
																<fmt:message key="bam_adhoc_create_step4_background_color"/>
															</td>
														</tr>
														<tr>
															<td width="5%">
																<label class='position-relative'>
																	<input type='checkbox' class='ace format-bold' onclick='formatPropChange(this)' value="" name="bold"> 
																	<span class='lbl'></span>
																</label>
															</td>
															<td width="45%">
																<fmt:message key="bam_adhoc_create_step4_bold"/>
															</td>
															<td width="5%">
																<label class='position-relative'>
																	<input type='checkbox' class='ace format-italics' onclick='formatPropChange(this)' value="" name="italics"> 
																	<span class='lbl'></span>
																</label>
															</td>
															<td width="45%">
																<fmt:message key="bam_adhoc_create_step4_italics"/>
															</td>
														</tr>
														<tr>
															<td width="5%">
																<label class='position-relative'>
																	<input type='checkbox' class='ace format-strike' onclick='formatPropChange(this)' value="" name="strike"> 
																	<span class='lbl'></span>
																</label>
															</td>
															<td width="45%">
																<fmt:message key="bam_adhoc_create_step4_strike"/>
															</td>
															<td width="5%">
																<label class='position-relative hide'>
																	<input type='checkbox' class='ace format-underline' onclick='formatPropChange(this)' value="" name="underline"> 
																	<span class='lbl'></span>
																</label>
															</td>
															<td width="45%">
																<span class="hide"><fmt:message key="bam_adhoc_create_step4_underline"/></span>
															</td>
															
														</tr>
													</table>
												</div>
												<div class="col-sm-3">
													<div id="format-preview-div">
														aAbBcCyYzZ
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane row-filter" id="modify_prop" style="min-height:100px;">
											<div class="condition">
												<div class="" style="font-size:14px; color:#393939;">
												<fmt:message key="bam_adhoc_create_step4_condition"/>
												</div>
												<table style="width:100%;" id="format_cond_table">
													<tr>
														<td width="30%">
															<select id="modify-condition" placeholder="Choose condition..." onchange="modifyConditionChange(this);">
																
															</select>
														</td>
														<td width="30%"></td>
														<td width="30%"></td>
													</tr>
												</table>
											</div>
											<div>
												<div class="" style="font-size:14px; color:#393939;">
												<fmt:message key="bam_adhoc_create_step4_replace_with"/>
												</div>
												<table style="width:100%;" id="format_cond_table">
													<tr>
														<td width="30%">
															<input class="form-control" id="modify-replace-value" placeholder="" onblur="modifyReplaceValue(this);"/>
														</td>
														<td width="30%"></td>
														<td width="30%"></td>
													</tr>
												</table>
												
											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="chart_properties" class="hide">
								<div class="chart-prop-preview">
									<div id="chart-prop-preview" style="height:250px;width:600px;margin-left:auto;margin-right:auto;">
										
									</div>
								</div>
								<div id="chart-prop-tab" class="tabbable tabs-left">
									<ul class="nav nav-tabs" >
										<li class="active"><a data-toggle="tab" href="#design_chart_prop"><fmt:message key="bam_adhoc_create_step4_chart"/></a></li>
										<li class=""><a data-toggle="tab" href="#design_legend_prop"><fmt:message key="bam_adhoc_create_step4_legend"/></a></li>
									</ul>
									<div class="tab-content" style="overflow: auto;">
										<div class="tab-pane active row-filter" id="design_chart_prop" style="min-height:100px;">
											<table width="100%">
												<tr>
													<td width="15%"><fmt:message key="bam_adhoc_create_step4_chart_title"/></td>
													<td width="35%">
														<input class="form-control" id="design-chart-chart-name" onblur="updateChartTitleProp(this);" placeholder=""/>
													</td>
													<td width="15%"></td>
													<td width="10%"></td>
												</tr>
												<tr>
													<td width="15%">
														<fmt:message key="bam_adhoc_create_step4_x_axis_title"/>
													</td>
													<td width="35%">
														<input class="form-control" id="design-chart-x-axis-name" onblur="updateChartXTitleProp(this);" placeholder=""/>
													</td>
													<td width="15%"></td>
													<td width="10%"></td>
												</tr>
												<tr>
													<td width="15%">
														<fmt:message key="bam_adhoc_create_step4_y_axis_title"/>
													</td>
													<td width="35%">
														<input class="form-control" id="design-chart-y-axis-name" onblur="updateChartYTitleProp(this);" placeholder=""/>
													</td>
													<td width="15%"></td>
													<td width="10%"></td>
												</tr>
											</table>
										</div>
										<div class="tab-pane row-filter" id="design_legend_prop" style="min-height:100px;">
											<table width="100%">
												<tr>
													<td width="35%"><fmt:message key="bam_adhoc_create_step4_show_legend"/></td>
													<td width="35%">
														<label>
															<input type="checkbox" id="displayLegend" class="ace ace-switch ace-switch-5" onclick="javascript:updateLegendvisible(this.checked)" checked>
															<span class="lbl"></span>
														</label>
													</td>
													<td width="20%"></td>
													<td width="10%"></td>
												</tr>
												<tr>
													<td width="35%"><fmt:message key="bam_adhoc_create_step4_position"/></td>
													<td width="35%">
														<select id="legend-position-select" onchange="updateLegendposition(this)">
															
														</select>
													</td>
													<td width="20%"></td>
													<td width="10%"></td>
												</tr>
												<tr>
													<td width="35%"><fmt:message key="bam_adhoc_create_step4_show_values"/></td>
													<td width="35%">
														<label>
															<input type="checkbox" id="displayLegendValues" class="ace ace-switch ace-switch-5" onclick="javascript:updateLegendvaluesvisible(this.checked)">
															<span class="lbl"></span>
														</label>
													</td>
													<td width="20%"></td>
													<td width="10%"></td>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id="report-step5" class=" report-step hide">
							<div style="width:500px;margin-left:auto;margin-right:auto;">
							<table style="width:100%">
								<tr>
									<td> <fmt:message key="bam_adhoc_create_step5_widget_name"/></td>
									<td>
										<input class="form-control" id="widgetName" placeholder='' onkeyup="updateNewReportname(this);" />
									</td>
								</tr>
								<tr>
									<td> <fmt:message key="bam_adhoc_create_step5_widget_description"/></td>
									<td>
										<textarea class="form-control" id="widgetDescription" placeholder='' onkeyup="updateNewReportDesc(this)"></textarea>
									</td>
								</tr>
							</table>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div data-target="#step-container" id="fuelux-wizard" style="width:60%;" class="pull-left">
						<ul class="wizard-steps">
							<li class="active" onclick="goToStepNo(1,this);">
								<span class="step" onclick="">1</span>
								<span class="title"><fmt:message key="bam_adhoc_create_step1_heading"/></span>
							</li>

							<li onclick="goToStepNo(2,this);">
								<span class="step ">2</span>
								<span class="title"><fmt:message key="bam_adhoc_create_step2_heading"/></span>
							</li>

							<li onclick="goToStepNo(3,this);">
								<span class="step">3</span>
								<span class="title"><fmt:message key="bam_adhoc_create_step3_heading"/></span>
							</li>

							<li onclick="goToStepNo(4,this);">
								<span class="step">4</span>
								<span class="title"><fmt:message key="bam_adhoc_create_step4_heading"/></span>
							</li>
							<li onclick="goToStepNo(5,this);">
								<span class="step">5</span>
								<span class="title"><fmt:message key="bam_adhoc_create_step5_heading"/></span>
							</li>
						</ul>
					</div>
					<button class="btn btn-primary btn-sm hide prevStep"  type="button" onclick="prevReportStep();"><i class="fa fa-arrow-left"></i> &nbsp;<fmt:message key="bam_adhoc_create_prev"/></button>
					<button class="btn btn-primary btn-sm nextStep" disabled type="button" onclick="nextReportStep();"><fmt:message key="bam_adhoc_create_next"/> &nbsp; <i class="fa fa-arrow-right"></i></button>
					<button class="btn btn-primary btn-sm finalStep hide"  type="button" onclick="saveNewAdhocReport()" 
						aria-hidden="true"><fmt:message key="bam_adhoc_create_finish"/></i></button>
				</div>
			</div>
		</div>
	</div>
	<div id="shareAccessmodal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-hidden="true" data-dismiss="modal">
						&times;
					</button>
					<span class="modal_heading"></span>
				</div>
				<div class="modal-body">
					<span class="text-danger" id="errorMessage"></span>
					<table>
						<tr><td width="30%"><fmt:message key="bam_adhoc_share_role"/></td>
							<td><select id="share-roles" style="width:250px;" placeholder="Choose roles..."/></td>
						</tr>
						<tr>
							<td width="30%"><fmt:message key="bam_adhoc_share_user"/></td>
							<td><select id="share-users" style="width:250px;" placeholder="Choose users..."/></td>
						</tr>
					</table>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary btn-sm"  type="button" onclick="handleShareORGrantAccess.execute(this);"aria-hidden="true"><fmt:message key="bam_adhoc_share_button"/></button>
				</div>
			</div>
		</div>
	</div>
	<div id="confirmationDialog" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" onclick='javascript:changeHeaderButton();' aria-hidden="true" data-dismiss="modal">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="bam_adhoc_report_delete_header"/></span>
				</div>
				<div class="modal-body">
					<span id="confirmMessage"></span>
				</div>
				<div class="modal-footer">
					<button class="btn btn-danger btn-sm confirmDelete"  type="button" onclick="deleteReport(this);"aria-hidden="true"><fmt:message key="bam_adhoc_delete_button"/></button>
				</div>
			</div>
		</div>
	</div>
	<div id="sampleExpressionDialog" class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-hidden="true" data-dismiss="modal">
						&times;
					</button>
					<span class="modal_heading"><fmt:message key="bam_adhoc_create_step2_custom_expression_samples"/></span>
				</div>
				<div class="modal-body">
					<table class='table noLines expTable'>
						<tr><th>Description</th><th>Expression</th></tr>
						<tr><td>Constant Expression</td><td>5 * (4 - 1) / 3</td></tr>	
						<tr><td>Variable &nbsp;&nbsp;Expression</td><td>$TOTALPRICE - ($TOTALPRICE * $DISCOUNT / 100)</td></tr>
						<tr><td>Function Expression</td>
							<td>
								function calculateFinalPrice&nbsp; ( totalprice , discount ) {
									</br>
								  	&nbsp;&nbsp;&nbsp;&nbsp;var discountValue = totalprice * discount / 100</br>
								  	&nbsp;&nbsp;&nbsp;&nbsp;return Math.ceil(totalprice - discountValue)</br>
								}
								</br>
								calculateFinalPrice($TOTALPRICE, $DISCOUNT);
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class='hide'>
		"<span class='pageSizePagination'><label><fmt:message key='org_intalio_uifw_tables_entries_per_page'/></label><select id='noOfReports' onchange=javscript:updateNoOfReports(); role='listbox' class='ui-pg-selbox'><option value='10' role='option'>10</option><option value='50' role='option'>50</option><option value='100' role='option'>100</option><option value='200' role='option'>200</option><option value='300' role='option'>300</option></select></span>"
		"<table id='paginationTable' cellspacing='0' cellpadding='0' border='0' class='ui-pg-table' style='table-layout:auto;'><tbody><tr><td class='ui-pg-button ui-corner-all ' id='first_grid-pager' style='cursor: default;'><span id='firstPage' title='First page' class='ui-icon fa fa-angle-double-left bigger-140' onclick=javascript:getLastFirstPageData('first');></span></td><td class='ui-pg-button ui-corner-all ' id='prev_grid-pager' style='cursor: default;'><span id='prevPage' title='Previous page' class='ui-icon fa fa-angle-left bigger-140' onclick=javascript:getNextPrevPageData('prev');></span></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td dir='ltr'><form onsubmit='return false'><fmt:message key="org_intalio_datatable_pagination_page"/> &nbsp;<input id='reportsPageNo' type='text' role='textbox' onkeydown=javascript:getPageNoData(event); maxlength='7' size='2' class='ui-pg-input pageInput'>&nbsp; <fmt:message key="org_intalio_datatable_pagination_of"/> &nbsp;<span id='sp_1_grid-pager' class='totalPageNo'></span></form></td><td style='width: 4px; cursor: default;' class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td><td class='ui-pg-button ui-corner-all' id='next_grid-pager' style='cursor: default;'><span id='nextPage' title='Next page' class='ui-icon fa fa-angle-right bigger-140' onclick=javascript:getNextPrevPageData('next');></span></td><td class='ui-pg-button ui-corner-all' id='last_grid-pager' style='cursor: default;'><span id='lastPage' title='Last page'class='ui-icon fa fa-angle-double-right bigger-140' onclick=javascript:getLastFirstPageData('last');></span></td></tr></tbody></table>"
	</div>
	<div class="hide">
		<span id="shareReportsHeader"><fmt:message key="bam_adhoc_share_reports"/></span>
		<span id="shareReportsUser"><fmt:message key="bam_adhoc_share_user"/></span>
		<span id="shareReportsRole"><fmt:message key="bam_adhoc_share_role"/></span>
		<span id="shareButton"><fmt:message key="bam_adhoc_share_button"/></span>
		<span id="shareReports"><fmt:message key="bam_adhoc_share_reports"/></span>
		<span id="shareReportsMsg"><fmt:message key="bam_adhoc_share_reports_msg"/></span>
		<span id="grantAccess"><fmt:message key="bam_adhoc_template_grant_access"/></span>
		<span id="grantAccessMsg"><fmt:message key="bam_adhoc_template_grant_access_msg"/></span>
		<span id="grantAccessBtn"><fmt:message key="bam_adhoc_template_grant_access_btn"/></span>
		<span id="shareAccessMsg"><fmt:message key="bam_adhoc_share_template_msg"/></span>
		<span id="successMessage"><fmt:message key="bam_adhoc_share_access_success_msg"/></span>
		<span id="deleteButton"><fmt:message key="bam_adhoc_delete_button"/></span>
		<span id="adhocUpdateButton"><fmt:message key="bam_adhoc_update_button"/></span>
		<span id="deleteConfirmation"><fmt:message key="bam_adhoc_report_delete_confirmation"/></span>
		<span id="step5ErrorMsg"><fmt:message key="bam_adhoc_step5_error_mesage"/></span>
		<span id="createStep1Heading"><fmt:message key="bam_adhoc_create_step1_heading"/></span>
		<span id="createStep2Heading"><fmt:message key="bam_adhoc_create_step2_heading"/></span>
		<span id="createStep3Heading"><fmt:message key="bam_adhoc_create_step3_heading"/></span>
		<span id="createStep4Heading"><fmt:message key="bam_adhoc_create_step4_heading"/></span>
		<span id="createStep5Heading"><fmt:message key="bam_adhoc_create_step5_heading"/></span>
		<span id="customNameError"><fmt:message key="bam_adhoc_create_custom_name_error"/></span>
		<span id="customNameExists"><fmt:message key="bam_adhoc_create_custom_name_exists"/></span>
		<span id="customDisplayName"><fmt:message key="bam_adhoc_create_custom_dis_name"/></span>
		<span id="customColumnType"><fmt:message key="bam_adhoc_create_custom_col_type"/></span>
		<span id="customExpression"><fmt:message key="bam_adhoc_create_custom_expression"/></span>
		<span id="buttonDesignReport"><fmt:message key="bam_adhoc_button_design_report"/></span>
		<span id="buttonManageDataDef"><fmt:message key="bam_adhoc_button_manage_data_definitions"/></span>
		<span id="buttonGrantAccess"><fmt:message key="bam_adhoc_button_grant_access"/></span>
		<span id="buttonAddTemplate"><fmt:message key="bam_adhoc_button_add_template"/></span>
		<span id="deleteUnauthorizedMsg"><fmt:message key="bam_adhoc_delete_report_msg"/></span>
		<span id="uploadSuccessMsg"><fmt:message key="bam_adhoc_uploaded_success_message"/></span>
		<span id="updateDataSourceSuccessMsg"><fmt:message key="bam_adhoc_data_source_update_success_message"/></span>
		<span id="nameErrorMsg"><fmt:message key="bam_adhoc_data_source_name_error_msg"/></span>
		<span id="descErrorMsg"><fmt:message key="bam_adhoc_data_source_desc_error_msg"/></span>
		<span id="updateDataSrcBtn"><fmt:message key="bam_adhoc_data_source_update_button"/></span>
		<span id="updateMultipleMsg"><fmt:message key="bam_adhoc_data_source_update_multiple_msg"/></span>
		<span id="selectUpdateMsg"><fmt:message key="bam_adhoc_data_source_update_no_msg"/></span>
		<span id='entriesPage'><fmt:message key="bam_adhoc_data_max_row"/></span>
		<span id="NoAdhocReportsMsg"><fmt:message key="bam_pre_defined_no_reocrds_found"/></span>
		<span id="adhocReportsPageInfo"><fmt:message key="bam_adhoc_reports_page_info"/></span>
		<span id="adhocReportDeleteCustomCol"><fmt:message key="bam_adhoc_create_step2_remove_custom_column"/></span>
		<span id="adhocReportDeleteCustomColHeader"><fmt:message key="bam_adhoc_create_step2_remove_custom_column_header"/></span>
		<span id="deleteDataDefOrReport"><fmt:message key="bam_adhoc_report_delete_header"/></span>
	</div>
</body>
<script type="text/javascript" src="scripts/plugin/codemirror.js"></script>
<script type="text/javascript" src="scripts/plugin/javascript.js"></script>
<script type="text/javascript" src="scripts/plugin/dashboard/FusionCharts.js"></script>
<script type="text/javascript" src="scripts/plugin/selectize.min.js"></script>
<script type="text/javascript" src="scripts/plugin/dragTable.js"></script>
<script type="text/javascript" src="scripts/custom/BAM/executeReport.js?version=2676"></script>
<script type="text/javascript" src="scripts/plugin/BAM/jquery.datatables.grouping.js"></script>
<script type="text/javascript" src="scripts/custom/BAM/adhocReports.js?version=2676"></script> 
