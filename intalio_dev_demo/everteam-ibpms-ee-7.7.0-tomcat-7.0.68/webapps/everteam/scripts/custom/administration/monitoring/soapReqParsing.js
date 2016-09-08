/**
 * Copyright (C) 2005-2015 Intalio inc.
 * Author : Yoganand
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/* checks weather filed is optional or not */
var xmlOptionalCheck = false;
/* stores XMl Document created from xml */
var xmlDoc;
/* JSON object containig  xml structure */
var xmlStructure = {};
/* Extra comment for field if any */
var prevCaption ;
/* defined spacing for fileds */
var indent = '&nbsp;&nbsp;&nbsp;&nbsp;'
/* stores path array of a variable */
var inputFiledId;
/* Checks all mandatory fields are filled or not. */
var inputFiledCheck = true;
/**
 * @Function Name   : seperateTags
 * @Description     : Reds Xml string and forms UI for ? fileds
 * @param           : xml,id
 * @returns         : 
 * */
function seperateTags(xml,id){
	xmlOptionalCheck = false;
	xmlStructure = {};
	prevCaption = null;
	xmlDoc = parseXmls(xml)
	getChilds(xmlDoc.getElementsByTagNameNS('*', 'Body')[0],xmlStructure)
	formUIFileds(id);
	$('#'+id+' .soapReqTable tr td input').bind("keyup keypress", function(e) {
		var code = e.keyCode || e.which; 
		if (code  == 13) 
		{
			e.preventDefault();
			return false;
		}	
	});
}
/**
 * @Function Name   : parseXmls
 * @Description     : Creates XML document to parse in js
 * @param           : xml
 * @returns         : xmlDoc
 * */
function parseXmls(xml){
	var xmlD;
	if (window.DOMParser)
	  {
	  parser=new DOMParser();
	  xmlD=parser.parseFromString(xml,"text/xml");
	  }
	else /* for IE */
	  {
	  xmlD=new ActiveXObject("Microsoft.XMLDOM");
	  xmlD.async=false;
	  xmlD.loadXML(xml); 
	  }
	 return xmlD
}
/**
 * @Function Name   : getChilds
 * @Description     : Get children and tree structure of xml and stores it in `xmlStructure`
 * @param           : elm,str
 * @returns         : 
 * */
function getChilds(elm,str){
	if (elm.hasChildNodes()){
		str[elm.tagName] = {};
		$.each(elm.childNodes,function(){
			getChilds(this,str[elm.tagName])
		})
	}
	else{
		if (elm.tagName != undefined)
			str[elm.tagName] = elm.tagName
		if(elm.nodeValue == '?'){
			if (xmlOptionalCheck){
				xmlOptionalCheck = false
				str.option = true
				str.elm = elm.parentNode
			}
			else{
				str.option = false
				str.elm = elm.parentNode
			}
			if (prevCaption != null){
				str.caption = prevCaption
			}
		}
		else if (elm.nodeType == 8 ){
			prevCaption = null
			if (elm.nodeValue == 'Optional:'){
				xmlOptionalCheck = true;
			}
			else
				prevCaption = elm.nodeValue
		}
	}
	
}
/**
 * @Function Name   : formUIFileds
 * @Description     : Forms UI fileds from `xmlStructure` and appends to given ID.
 * @param           : id
 * @returns         : 
 * */
function formUIFileds(id){
	$('#'+id).empty()
	inputFiledId = ['soap']
	str = '<table class="soapReqTable" style="width:100%;padding:7px;">'
	var xmlBody = xmlStructure['soapenv:Body']
	try{
		var x = Object.keys(xmlBody)
		str = formFieldRow(sortKeys(xmlBody,{}),str);	
	}
	catch(err){
		
	}

	str += '</table>';
	$('#'+id).append(str);
}
/**
 * @Function Name   : sortKeys
 * @Description     : Sorts xml json object based on mandatory or optional. Mandatory will be first.
 * @param           : obj,outObj
 * @returns         : outObj
 * */
function sortKeys(obj,outObj){
	var keys = Object.keys(obj)
	var mandatory  = []
	var temp = []
	var value;
	for(var i = 0; i <keys.length ; i++ ){
		value = obj[keys[i]]
		if (typeof value.option != 'undefined'){
			if (value.option){
				temp.push(keys[i])
			}
			else{
				mandatory.push(keys[i])
			}
		}
	}
	outObj = formKeyDict(obj,outObj,mandatory,temp);
	for(var i = 0; i < keys.length ; i++ ){
		value = obj[keys[i]]
		if (typeof value.option == 'undefined'){
			outObj[keys[i]] = sortKeys(obj[keys[i]],{})
		}
	}
	return outObj;
}
/**
 * @Function Name   : formKeyDict
 * @Description     : forms json object with mandatory first and optional next.
 * @param           : obj,outObj,mandatory,temp
 * @returns         : outObj
 * */
function formKeyDict(obj,outObj,mandatory,temp){
	for (var i = 0; i< mandatory.length ; i++){
		outObj[mandatory[i]] = obj[mandatory[i]]
	}
	for (var i = 0; i< temp.length ; i++){
		outObj[temp[i]] = obj[temp[i]]
	}
	return outObj;

}
/**
 * @Function Name   : formFieldRow
 * @Description     : Forms html row string from given xml tag.
 * @param           : xml,str
 * @returns         : str
 * */
function formFieldRow(xml,str){
	$.each(xml,function(key,value){
		if (typeof value.elm != 'undefined'){
			var prop = $(value.elm).prop('tagName')
			if (prop.indexOf(':')>-1)
				prop = prop.split(':')[1]
			var id = inputFiledId.join('-')+'-'+prop
			if (!value.option){
				str += '<tr><td style="width:50%">'+indent+prop+'</td><td style="width:50%"><input class="form-control" style="width:250px;" id="'+id+'"/></td></tr>'
			}
			else
				str += '<tr><td style="width:50%">'+indent+prop+' &nbsp; </td><td style="width:50%"><input class="form-control" style="width:250px;" id="'+id+'"/></td></tr>'
		}
		else{
			var propKey = key.split(':').pop()
			str += '<tr><td colspan="2"><table style="border:1px solid #E5E5E5;width:100%"><tr><td colspan="2" class="thick">'+indent+propKey+' </td></tr>'
			inputFiledId.push(propKey)
			str = formFieldRow(value,str);
			inputFiledId.pop()
			str += '</td></tr></table>'
		}
	});
	return str
}
/**
 * @Function Name   : submitStartProcess
 * @Description     : This function will be called when user clicks on start process and starts process with user given values.
 * @param           : 
 * @returns         : 
 * */
function submitStartProcess(){
	inputFiledId = ['soap']
	var xmlBody = xmlStructure['soapenv:Body']
	inputFiledCheck = true;
	readFieldValues(xmlBody);
	/*if(!readFieldValues(xmlBody)){
		$('.startProcessError').removeClass('hide');
		return false;
	}*/
	addLoading($('#startOperation').find('.modal-body'));
	var xmlText = new XMLSerializer().serializeToString(xmlDoc);
	var data = {
		wsRequest : xmlText
	}
	var newWsiURI = wsiURI
	sendAjaxCall(newWsiURI, "POST", false, true, "json", data, handleProcessesAjaxError, function(response){
		if(response.success_message != undefined && response.success_message != null){
			var responseXml = response.success_message.wsResponseContent
			if (responseXml != null && responseXml.length > 0){
			 	var parser = new DOMParser(); 
				var xml = parser.parseFromString(responseXml, "text/xml"); 

				$('#startOperationFrame').empty();
				var body = xml.getElementsByTagNameNS('*', 'Body')[0]
				var str = formResponseUI(body);
				$('#startOperationFrame').append(str);
				$('#startOperation .modal-footer ').addClass('hide');
			}else{
				if (response.success_message.status != 'ERROR'){
					$('#startOperationFrame').empty();
					str = '<table class="soapReqTable" >';
					str += '<tr><td class="thick">Status: </td><td>'+response.success_message.status+'</td></tr>';
					str += '</table>';
					$('#startOperationFrame').append(str);
					$('#startOperation .modal-footer ').addClass('hide');
				}else{
					showErrors(response.success_message.errorContent)
				}
			}
			$('.mandatoryFileds').addClass('hide');
			$('.startProcessError').addClass('hide');
			
		}
		else 
			showInformation(response.error_message)
		removeLoading()
	}, 90000);
}
function showErrors(error){
	if (error.length >0 ){
		for (var i = 0; i<error.length ; i++){
			var errorContent = error[i].split('::')
			var errorMsg = errorContent[1]
			var errorPath = errorContent.slice(2);
			errorPath = errorPath.reverse();
			var erroId = errorPath.join('-');
			erroId = erroId.replace('Type','')
			$('[id$='+erroId+']').css({'border':'1px solid #F09784'}).attr('title',errorMsg);
		}
	}
	showErrorNotification('Some of the field values are not valid.')
}
/**
 * @Function Name   : startInvokeInstance
 * @Description     : This function will be called when user clicks on Invoke instance and Invokes instance with user given values.
 * @param           : 
 * @returns         : 
 * */
function startInvokeInstance(){
	inputFiledId = ['soap']
	var xmlBody = xmlStructure['soapenv:Body']
	inputFiledCheck = true;
	if(!readFieldValues(xmlBody)){
		$('.invokeInstanceError').removeClass('hide');
		return false;
	}
	addLoading($('#invokeInstanceModal').find('.modal-body'));
	var xmlText = new XMLSerializer().serializeToString(xmlDoc);
	var data = {
		wsRequest : xmlText
	}
	var newWsiURI = invokeWsiURI
	sendAjaxCall(newWsiURI, "POST", false, true, "json", data, handleInstancesAjaxError, function(response){
		removeLoading();
		if(response.success_message != undefined && response.success_message != null){
			var responseXml = response.success_message.wsResponseContent
			if (responseXml != null && responseXml.length > 0){
			 	var parser = new DOMParser(); 
				var xml = parser.parseFromString(responseXml, "text/xml"); 
				formResponseUI(xml);
				$('#invokeInstanceModal .modal-footer ').addClass('hide');
			}else{
				if (response.success_message.status != 'ERROR'){
					$('#invokeIFrame').empty();
					str = '<table class="soapReqTable" >';
					str += '<tr><td class="thick">Status: </td><td>'+response.success_message.status+'</td></tr>';
					str += '</table>';
					$('#invokeIFrame').append(str);
					$('#invokeInstanceModal .modal-footer ').addClass('hide');
				}
				else{
					showErrors(response.success_message.errorContent)
				}
			}
			$('.mandatoryFileds').addClass('hide');
			$('.invokeInstanceError').addClass('hide');
		}
		else 
			showInformation(response.error_message);
		$('#invokeInstanceModal .close').attr('onclick','refreshInstancesList()');
	});	
}
/**
 * @Function Name   : readFieldValues
 * @Description     : Read input fields in the form and updates XMlDoc file
 * @param           : xml
 * @returns         : returns true if all mandatory fields are filled and false if not.
 * */
function readFieldValues(xml){
	try{
		var x = Object.keys(xml)
		$.each(xml,function(key,value){
			if (typeof value.elm != 'undefined'){
				var prop = $(value.elm).prop('tagName')
				if (prop.indexOf(':')>-1)
					prop = prop.split(':')[1]
				var id = inputFiledId.join('-')+'-'+prop
				var val = $('#'+id).val()
				if (!value.option){
					if (val != undefined && val.length >0)
						$(value.elm).text(val);
					else{
						$(value.elm).text("");
						inputFiledCheck = false;
						//return false;
					}
				}
				else
					$(value.elm).text(val);
			}
			else{
				var propKey = key.split(':').pop()
				inputFiledId.push(propKey)
				readFieldValues(value);
				inputFiledId.pop()
			}
		});
		if (inputFiledCheck)
			return true;
		else
			return false;
	}
	catch(err){
		return false
	}
}

/**
 * @Function Name   : formResponseUI
 * @Description     : It will show response XML fields in UI.
 * @param           : doc
 * @returns         : 
 * */
function formResponseUI(body){
	if (body.childNodes.length > 1){
		var str = '<table class="soapReqTable" style="padding:5px;border:1px solid #E5E5E5;width:100%;">'
		$.each(body.childNodes,function(){
			if (this.hasChildNodes()){
				if (this.childNodes.length > 1){
					str+= '<tr><td colspan="2">'+this.tagName+'</td></tr>'
					str+= '<tr><td colspan="2">'+formResponseUI(this)+'</td></tr>'
				}
				else
					str+= '<tr><td colspan="2">'+formResponseUI(this)+'</td></tr>'
			}
			else if (this.nodeType == 1)
					str += '<tr><td class="thick">'+this.tagName+': </td><td>'+$(this).text()+'</td></tr>'

		});
		str += '</table>';
		return str;
	}
	else
	{
		str = '<table style="padding:5px;"><tr><td class="thick">'+body.tagName+': </td><td>'+$(body).text()+'</td></tr></table>'
		return str
	}
}

