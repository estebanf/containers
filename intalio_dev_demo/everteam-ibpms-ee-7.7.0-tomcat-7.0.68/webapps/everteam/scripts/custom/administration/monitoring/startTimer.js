/**
 * Copyright (C) 2005-2015 Intalio inc.
 * Author : Yoganand
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

var startTimerUrl = 'console/processes/startevent'
var startEventId;
var aMin = 60
var anHour = 60 * 60
var aDay = 60 * 60 * 24
var aMonth = 60 * 60 * 24 * 31
var aYear = 60 * 60 * 24 * 365.25
var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var timeZoneValue = '-12'
var dateFormat = "yyyy-MM-dd";
    // constants for cron expression UI
var cronValues = {
        "sec": {
            sliderId: 'slider-sec',
            selectId: 'select-sec',
            minValue: 0,
            maxValue: 59,
            spanId: 'sec-out',
            everyId: 'every-sec',
            value: '*'
        },
        "min": {
            sliderId: 'slider-min',
            selectId: 'select-min',
            minValue: 0,
            maxValue: 59,
            spanId: 'min-out',
            everyId: 'every-min',
            value: '*'
        },
        "hour": {
            sliderId: 'slider-hour',
            selectId: 'select-hour',
            minValue: 0,
            maxValue: 23,
            spanId: 'hour-out',
            everyId: 'every-hour',
            value: '*'
        },
        "day": {
            sliderId: '',
            selectId: 'select-day',
            minValue: 1,
            maxValue: 31,
            spanId: 'day-out',
            everyId: 'every-day',
            value: '*'
        },
        "month": {
            sliderId: '',
            selectId: 'select-month',
            minValue: 1,
            maxValue: 12,
            spanId: 'mon-out',
            everyId: 'every-month',
            value: '*'
        },
        "dow": {
            sliderId: '',
            selectId: 'select-dow',
            minValue: 1,
            maxValue: 7,
            spanId: 'dow-out',
            everyId: 'every-dow',
            value: '?'
        },
        "year": {
            sliderId: '',
            selectId: 'select-year',
            minValue: 2014,
            maxValue: 2030,
            spanId: 'year-out',
            everyId: 'every-year',
            value: '*'
        }
    }
    // Constants for duration cycle.
var durationVaues = {
        "durationSecond": {
            min: 0,
            max: 59,
            extension: $('#extensionSeconds').text(),
            value: 0
        },
        "durationMinute": {
            min: 0,
            max: 59,
            extension: $('#extensionMinutes').text(),
            value: 0
        },
        "durationHour": {
            min: 0,
            max: 23,
            extension: $('#extensionHours').text(),
            value: 0
        },
        "durationDay": {
            min: 0,
            max: 30,
            extension: $('#extensionDays').text(),
            value: 0
        },
        "durationMonth": {
            min: 0,
            max: 11,
            extension: $('#extensionMonths').text(),
            value: 0
        },
        "durationYear": {
            min: 0,
            max: 10,
            extension: $('#extensionYears').text(),
            value: 0
        }
    }
    /**
     * @Function Name   : initilizeValues
     * @Description     : Initilizes the cron UI with default values
     * @param           :
     * @returns         :
     * */

function initilizeValues() {
    $.each(cronValues, function(key, value) {
        $('#' + value.selectId).empty();
        $('#' + value.selectId).append('<option value="-1">Any</option>');
        for (var i = value.minValue; i <= value.maxValue; i++) {
            if (key == 'dow')
                $('#' + value.selectId).append('<option value=' + i + '>' + weekDays[i - 1] + '</option>');
            else
                $('#' + value.selectId).append('<option value=' + i + '>' + i + '</option>');
        }
        $('#' + value.selectId).change(function() {
            dayAnddow(key);
            selectedVals = $(this).val();
            clearSlide(value.sliderId);
            if (selectedVals != null) {
                if ($.inArray('-1', selectedVals) > -1) {
                    if (key != 'dow')
                        $('#' + value.spanId).text('*')
                    else {
                        if ($('#' + cronValues['day'].spanId).text() != '?')
                            $('#' + value.spanId).text('?')
                        else
                            $('#' + value.spanId).text('*')
                    }
                    clearSelect(value.selectId);
                } else {
                    selectedVals = compressHyphen(selectedVals);
                    $('#' + value.spanId).text(selectedVals.toString());
                }
            } else {
                if (key != 'dow')
                    $('#' + value.spanId).text('*')
                else {
                    if ($('#' + cronValues['day'].spanId).text() != '?')
                        $('#' + value.spanId).text('?')
                    else
                        $('#' + value.spanId).text('*')
                }
            }
        });
        clearSelect(value.selectId);
        $('#' + value.selectId).val(value.selectvalues);
        $('#' + value.selectId).chosen();
        $('#' + value.selectId).trigger("liszt:updated");
        chznId = value.selectId.replace('-', '_') + '_chzn'
        $('#' + chznId).css('width', '400px').find('.search-field input').css("width", 300);
        if (value.sliderId != null && value.sliderId.length != 0) {
            sliderVal = value.sliderValue || 0
            $('#' + value.sliderId).prev().find('.var-text').text(sliderVal)
            if ($('#' + value.sliderId + ' div').length != 0) {
                $('#' + value.sliderId).slider('value', sliderVal);
            } else {
                $('#' + value.sliderId).css({
                    width: '300px',
                    'float': 'left',
                    margin: '6px'
                }).slider({
                    min: value.minValue,
                    max: value.maxValue,
                    value: sliderVal,
                    range: 'min',
                    animate: true,
                    slide: function(event, ui) {
                        $(this).prev().find('.var-text').text(ui.value);
                        if (ui.value == 0)
                            $('#' + value.spanId).text('*');
                        else
                            $('#' + value.spanId).text('*/' + ui.value);
                        clearSelect(value.selectId);
                        dayAnddow(key)
                    }
                });
            }
        }
    });
}
/**
 * @Function Name   : initilizeDuration
 * @Description     : Initilizes time duration UI with default values
 * @param           :
 * @returns         :
 * */
function initilizeDuration() {
    $("#startTimerModal .durationExpression > table tbody tr td span.ui-slider").css({
        width: '80%',
        'float': 'left',
        margin: '6px'
    }).each(function() {
        var value = parseInt($(this).text(), 10);
        var sliderId = $(this).attr('type');
        var defs = durationVaues[sliderId];
        $("#" + sliderId).text(defs.value + " " + defs.extension);
        $(this).empty().slider({
            min: defs.min,
            max: defs.max,
            value: defs.value,
            range: "min",
            animate: true,
            slide: function(event, ui) {
                $("#" + sliderId).text(ui.value + " " + defs.extension);
            }
        });
    });
}
/**
 * @Function Name   : dayAnddow
 * @Description     : Places '?'  for days and day of week accordingly ( only one value is exists otherone shuold be '?')
 * @param           : key
 * @returns         :
 * */
function dayAnddow(key) {
    if (key == 'day') {
        $('#' + cronValues['dow'].spanId).text('?')
        clearSelect(cronValues['dow'].selectId);
        $('#' + cronValues['dow'].sliderId).val(0).slider('refresh');
    }
    if (key == 'dow') {
        $('#' + cronValues['day'].spanId).text('?');
        clearSelect(cronValues['day'].selectId);
        $('#' + cronValues['day'].sliderId).val(0).slider('refresh');
    }
}
/**
 * @Function Name   : clearSelect
 * @Description     : Clears the select element selected values.
 * @param           : id
 * @returns         :
 * */
function clearSelect(id) {
    clearId = id.replace('-', '_') + '_chzn'
    $('#' + clearId).find('.search-choice').each(function() {
        $(this).remove();
    });
    $('#' + id).val('').trigger("liszt:updated");
}
/**
 * @Function Name   : clearSlide
 * @Description     : Clears the slider value.
 * @param           : id
 * @returns         :
 * */
function clearSlide(id) {
    $('#' + id).slider({
        value: 0
    });
    $("#" + id).prev().find('.var-text').text(0);
}
/**
 * @Function Name   : updateStartTimer
 * @Description     : Updates timer with user modified expression type and expression value
 * @param           :
 * @returns         :
 * */
function updateStartTimer() {
    var timerType = $("#startTimerExpressionType").val()
    if (timerType == 'timeDuration') {
        var expStr = 'P'
        expStr += $("#durationYear").text().replace(/[^0-9]/g, '') + 'Y';
        expStr += $("#durationMonth").text().replace(/[^0-9]/g, '') + 'M';
        expStr += $("#durationDay").text().replace(/[^0-9]/g, '') + 'D';
        expStr += 'T'
        expStr += $("#durationHour").text().replace(/[^0-9]/g, '') + 'H';
        expStr += $("#durationMinute").text().replace(/[^0-9]/g, '') + 'M';
        expStr += $("#durationSecond").text().replace(/[^0-9]/g, '') + 'S';
        var expStrlength = expStr.length;
        var zeroCount = (expStr.match(/0/g) || []).length
        if (expStrlength === 14 && zeroCount === 6){
            $('#cronErrorMsg').text($('#startTimerValidate').text());
            $('#cronErrorMsg').removeClass('hide');
            return false
        }
        var data = {
            pid: proId,
            expression: expStr,
            expressionType: timerType
        }
        sendAjaxCall(startTimerUrl + '/' + startEventId + '/expression', "POST", false, true, "json", data, handleProcessesAjaxError, function(response) {
            if (response.success_message != undefined) {
                showNotification(response.success_message)
                clearCronValues();
                $('#startTimerModal').modal('hide');
            } else
                showErrorNotification(response.error_message)
        });
    } else if (timerType == 'timeCycle') {
        if ($('#output-crontab').is(':visible')) {
            var cronExp = []
            $('#output-crontab  span').each(function() {
                cronExp.push($(this).text());
            });
            cronExp = cronExp.join(' ')
        } else {
            var cronExp = $('#output-crontab').parent().find('input').val();
            if (!validCronExp(cronExp)) {
                $('#cronErrorMsg').text($('#enterValidCron').text()).removeClass('hide')
                return false
            }
        }
        var data = {
            pid: proId,
            expression: cronExp,
            expressionType: timerType
        }
        sendAjaxCall(startTimerUrl + '/' + startEventId + '/expression', "POST", false, true, "json", data, handleProcessesAjaxError, function(response) {
            if (response.success_message != undefined) {
                showNotification(response.success_message)
                $('#startTimerModal').modal('hide');
            } else
                showErrorNotification(response.error_message)
        });
    } else if (timerType == 'timeDate') {
        var date = $('#expressionDate').val();
        var time = $('#expressionTime').val();
        var dateTime = date + 'T' + time  //toTimeZoneDIff($('#timezone').val())
        timeZoneValue = $('#timezone').val();
        var area = $('#timezone option:selected').text();
        area = area.split(' ')
        var zone = area[0].replace('UTC','')
        dateTime += zone +' '+ area[area.length-1]
        var data = {
            pid: proId,
            expression: dateTime,
            expressionType: timerType
        }
        sendAjaxCall(startTimerUrl + '/' + startEventId + '/expression', "POST", false, true, "json", data, handleProcessesAjaxError, function(response) {
            if (response.success_message != undefined) {
                showNotification(response.success_message)
                $('#startTimerModal').modal('hide');
            } else
                showErrorNotification(response.error_message)
        });
    }
}
/**
 * @Function Name   : getProcessStartTimerDetails
 * @Description     : Get starttimer details from server
 * @param           : pid
 * @returns         :
 * */
function getProcessStartTimerDetails(pid) {
    $('.timerInfoSpan').popover({trigger:'hover',placement:'bottom'});
    $("#nextJobTiming").css("width", 160);
    $('#processInfo .modal-footer').removeClass('hide');
    $('#nextJobDate').datepicker({
        autoclose: true,
        startDate: '0d',
        setDate: new Date()
    });
    $('#cronErrorMsg').addClass('hide');
    var expression;
    var data = {}
    sendAjaxCall(startTimerUrl + '?pid=' + pid, "GET", false, true, "json", data, handleStartTimerAjaxError, function(response) {
        if (response.error_message == undefined) {
            startEventId = response['start_event'].startEventId
            if ($('#startTimerExpressionType_chzn').length > 0) {
                $('#startTimerExpressionType_chzn').find('.search-choice').each(function() {
                    $(this).remove();
                });
                $('#startTimerExpressionType').val(response['start_event'].expressionType).trigger("liszt:updated");
            } else {
                $("#startTimerExpressionType").val(response['start_event'].expressionType).chosen();
                $("#startTimerExpressionType_chzn").css("width", 171);
            }
            if (response['start_event'].nextJobTime != undefined && response['start_event'].nextJobTime != null && response['start_event'].nextJobTime!=0) {
                $('#nextJob').text($.format.date(response['start_event'].nextJobTime, userPreferences.dateFormat+userPreferences.hourFormat));
            } else
                $('#nextJob').text('Not scheduled.')
            if (response['start_event'].expressionType == 'timeDuration') {
                var dateTime = getDateTime(response['start_event'].expression)
                durationVaues["durationYear"].value = dateTime.years
                durationVaues["durationMonth"].value = dateTime.months
                durationVaues["durationDay"].value = dateTime.days
                durationVaues["durationHour"].value = dateTime.hours
                durationVaues["durationMinute"].value = dateTime.mins
                durationVaues["durationSecond"].value = dateTime.secs == 0 ? 0 : dateTime.secs
                changeExpression(response['start_event'].expressionType);
            } else if (response['start_event'].expressionType == 'timeCycle') {
                expression = response['start_event'].expression.split(' ');
                updateCronValues(expression[0], 'sec');
                updateCronValues(expression[1], 'min');
                updateCronValues(expression[2], 'hour');
                updateCronValues(expression[3], 'day');
                updateCronValues(expression[4], 'month');
                updateCronValues(expression[5], 'dow');
                if (expression[6])
                    updateCronValues(expression[6], 'year');
                changeExpression(response['start_event'].expressionType);
            } else if (response['start_event'].expressionType == 'timeDate') {
                var exp = response['start_event'].expression.split(' ');
                var expression = exp[0].split('T');
                var timeAndZone = splitTimeZone(expression[1])
                timeZoneValue = exp[1].replace('(','').replace(')','')
                changeExpression(response['start_event'].expressionType);
                $('#expressionDate').val(expression[0]);
                $('#expressionTime').val(timeAndZone[0]);
            }
        }
    });
}

function splitTimeZone(exp) {
    if (exp.indexOf('+') > -1) {
        var vals = exp.split('+')
        return [vals[0], '+' + vals[1]]
    } else if (exp.indexOf('-') > -1) {
        var vals = exp.split('-')
        return [vals[0], '-' + vals[1]]
    }
}

function toTimeZoneDIff(time) {
    var n = Math.abs(time);
    var decimal = n - Math.floor(n);
    var hour = Math.floor(n)
    hour = ("0" + hour).slice(-2);
    var mins = decimal * 60
    mins = ("0" + mins).slice(-2);
    if (time >= 0)
        return '+' + hour + ':' + mins
    else
        return '-' + hour + ':' + mins
}

function toTimeZoneDIffVal(zone) {
    var vals = zone.split(':');
    return parseInt(vals[0]) + parseInt(vals[1]) * 5 / 300
}
/**
 * @Function Name   : updateCronValues
 * @Description     : Updates cron default values to the current timer values
 * @param           : str,name
 * @returns         :
 * */
function updateCronValues(str, name) {
    cronValues[name].value = str
    if (str.indexOf('*/') > -1) {
        var val = parseInt(str.replace('*/', ''))
        cronValues[name].sliderValue = val;
    } else if (str.indexOf(',') > -1) {
        if (str.indexOf('-') > -1) {
            var vals = str.split(',')
            var newVals = []
            for (var i = 0; i < vals.length; i++) {
                if (vals[i].indexOf('-') > -1) {
                    newVals = arrayUnique(newVals.concat(expandHyphen(vals[i])));
                } else
                    newVals.push(parseInt(vals[i]));
            }
            cronValues[name].selectvalues = newVals;
        } else
            cronValues[name].selectvalues = str.split(',');
    } else if (str.indexOf('-') > -1) {
        cronValues[name].selectvalues = expandHyphen(str)
    } else {
        cronValues[name].selectvalues = str
    }

}
/**
 * @Function Name   : changeExpression
 * @Description     : calls when user changes the expression type
 * @param           : value
 * @returns         :
 * */
function changeExpression(value) {
    $("#startTimerModal .expressionParameters").removeClass("hide");
    $('.exp-time-duration, .exp-time-cycle').addClass('hide');
    $('#timezone').closest('tr').remove();
    if (value == 'timeDate') {
        $("#startTimerModal .expressionParameters").html("<td>" + $('#executionTime').text() + "</td><td><div class='inline timerDateTime'><input id='expressionDate' class='form-control date-picker read_only_input' type='text' data-date-format='yyyy-mm-dd' readonly style='background-color:#ffffff !important;'></div>&nbsp;&nbsp;<div class='timerDateTime bootstrap-timepicker inline'><input type='text' class='form-control read_only_input' id='expressionTime' readonly style='background-color:#ffffff !important;'></div></td>");
        if (typeof timezones == 'undefined') {
            loadJs('scripts/custom/administration/monitoring/timeZone.js', function() {
                $("#startTimerModal .expressionParameters").after('<tr><td>Time Zone</td><td colsapn="2">' + timezones + '</td></tr>')
                $('#timezone').val(timeZoneValue).chosen();
                $('#timezone_chzn').css('width', '350px');
            });
        } else {
            $("#startTimerModal .expressionParameters").after('<tr><td>Time Zone</td><td colsapn="2">' + timezones + '</td></tr>')
            $('#timezone').val(timeZoneValue).chosen();
            $('#timezone_chzn').css('width', '350px')
        }
        $('#expressionDate').datepicker({
            autoclose: true,
            startDate: '0d'
        }).val($.format.date(+new Date(), dateFormat));
        $('#expressionTime').timepicker({
            minuteStep: 1,
            showSeconds: true,
            showMeridian: false
        });
        $('.timerInfoSpan').attr('data-content', $('#oneTimeDateTime').text());

    } else if (value == 'timeDuration') {
        $("#startTimerModal .expressionParameters").addClass('hide');
        $('#durationTable').empty();
        var html = '';
        $.each(durationVaues, function(key, value) {
            html += '<tr><td class="durationExp"><span class="ui-slider ui-slider-yellow" type="' + key + '"></span></td><td><span id="' + key + '">0 ' + $('#extensionSeconds').text() + '</span></td></tr>';
        });
        $('#durationTable').append(html);
        $('.exp-time-duration').removeClass('hide');
        initilizeDuration();
        $('.timerInfoSpan').attr('data-content', $('#oneTimeDelayDuration').text())
    } else if (value == 'timeCycle') {
        var cronSpan = '<span class="pull-right iconCursor" title="' + $('#cronManualEntry').text() + '" onclick="manualCronExp(this);" style="font-size:17px;"><i class="fa fa-edit blue"></i></span><p class="no-margin" id="output-crontab">';
        $.each(cronValues, function(key, value) {
            cronSpan += '<span id="' + value.spanId + '" class="cron-val">' + value.value + '</span>'
        });
        cronSpan += '</p>'
        $("#startTimerModal .expressionParameters").html("<td>Cron Expression</td><td>" + cronSpan + "</td>");
        $("#expressionTimeDuration, #expressionTimeCycle").css("width", 171);
        $('.exp-time-cycle').removeClass('hide');
        initilizeValues();
        $('.timerInfoSpan').attr('data-content', $('#recurringCron').text());
    }
}
/**
 * @Function Name   : clearCronValues
 * @Description     : Restore cron expression to default
 * @param           :
 * @returns         :
 * */
function clearCronValues() {
    $.each(cronValues, function(key, value) {
        if (key != 'dow')
            cronValues[key].value = '*'
        else
            cronValues[key].value = '?'
    });
}
/**
 * @Function Name   : manualCronExp
 * @Description     : Toggles between cron UI and manual entry
 * @param           : obj
 * @returns         :
 * */
function manualCronExp(obj) {
    $('#cronErrorMsg').addClass('hide');
    if ($('#output-crontab').is(':visible')) {
        $(obj).html('<i class="fa fa-mail-reply grey"></i>')
        $('#output-crontab').addClass('hide');
        var cronExp = []
        $('#output-crontab  span').each(function() {
            cronExp.push($(this).text());
        });
        cronExp = cronExp.join(' ')
        $(obj).after('<input class="input cronEdit" type="text" style="width:171px;" value="' + cronExp + '"></input>');
        $('.exp-time-cycle').addClass('hide');
        $(obj).attr('title', $('#cronCloseManual').text())
    } else {
        $(obj).html('<i class="fa fa-edit blue"></i>')
        $('#output-crontab').removeClass('hide');
        $(obj).parent().find('input').remove();
        $('.exp-time-cycle').removeClass('hide')
        $(obj).attr('title', $('#cronManualEntry').text())
    }
}
/**
 * @Function Name   : validateTimeDuration
 * @Description     : validates the time duration expression
 * @param           : value of time duration expression textbox
 * @returns         :
 * */

function validateTimeDuration(object) {
    $("#" + object.id).next().remove();
    $("#" + object.id).next().remove();
    if (object.value != "") {
        var timeDurationRegExp = new RegExp("P(\\d+Y)?(\\d+M)?(\\d+D)?(T(\\d+H)?(\\d+M)?((\\d+\\.?\\d*|.d+)S)?)?");
        if (!timeDurationRegExp.test(object.value)) {
            $("#" + object.id).after("<br><span class='text-danger'>" + $("#errorTimeDuration").text() + "</span>");
        }
    }
}
/**
 * @Function Name   : getDateTime
 * @Description     : Convert millie seconds to time format(hours, mins ,days etc..)
 * @param           : seconds
 * @returns         : date object
 * */
function getDateTime(exp) {
    var returnObj = {
        secs: 0,
        mins: 0,
        hours: 0,
        days: 0,
        months: 0,
        years: 0
    }
    var vals = exp.split(/[A-Za-z]/)
    var timeIndex = exp.indexOf("T")
    var monthIndex = -1
    if (timeIndex > exp.indexOf("M"))
        monthIndex = exp.indexOf("M");
    var minIndex = -1
    if (timeIndex > 0) {
        for (var i = timeIndex; i < exp.length; i++) {
            if (exp[i] == 'M')
                minIndex = i;
        }
    }
    if (exp.indexOf("Y") > 0)
        returnObj.years = getExpValue(exp, exp.indexOf("Y"))
    if (monthIndex > 0)
        returnObj.months = getExpValue(exp, monthIndex)
    if (exp.indexOf("D") > 0)
        returnObj.days = getExpValue(exp, exp.indexOf("D"))
    if (exp.indexOf("H") > 0)
        returnObj.hours = getExpValue(exp, exp.indexOf("H"))
    if (minIndex > 0)
        returnObj.mins = getExpValue(exp, minIndex)
    if (exp.indexOf("S") > 0)
        returnObj.secs = getExpValue(exp, exp.indexOf("S"))
    return returnObj;
}

function getExpValue(exp, index) {
    var val1 = exp[index - 1]
    var val2 = exp[index - 2]
    if (!isNaN(val2))
        return parseInt(exp[index - 2] + exp[index - 1])
    else
        return parseInt(exp[index - 1])
}
/**
 * @Function Name   : validCronExp
 * @Description     : Validates the User entered cron expression
 * @param           : exp
 * @returns         : returns true if valid,
 * */
function validCronExp(exp) {
    if (exp.length == 0 )
        return false
    else
        return true
    //var vals = exp.split(' ');
    //var regex = new RegExp("^[0-9?*/-]+$");
    /*if (/[a-zA-Z()]+$/.test(exp))
        return false;
    else if (vals.length != 7)
        return false;
    else if (regex.test(exp))
        return true
    else
        return true;*/
}
/**
 * @Function Name   : expandHyphen
 * @Description     : Convert hyphen values to array
 * @param           : str
 * @returns         : array
 * */
function expandHyphen(str) {
    var vals = str.split('-')
    var start = parseInt(vals[0]);
    var end = parseInt(vals[1]);
    var arr = []
    for (var i = start; i <= end; i++)
        arr.push(i);
    return arr
}
/**
 * @Function Name   : compressHyphen
 * @Description     : convert array to hyphen string
 * @param           : str
 * @returns         : hyphen string
 * */
function compressHyphen(str) {
    if (str.length != 0) {
        var arr = [];
        var finalArr = [];
        var returnArr = []
        for (var i = 0; i < str.length; i++) {
            elm = parseInt(str[i]);
            if (i + 1 < str.length) {
                nextElm = parseInt(str[i + 1])
                if (elm + 1 == nextElm) {
                    if (arr.indexOf(elm) == -1)
                        arr.push(elm);
                    arr.push(nextElm);
                } else {
                    if (arr.length != 0)
                        finalArr.push(arr);
                    if (arr.indexOf(elm) == -1)
                        finalArr.push(elm)
                    arr = []
                }
            } else {
                if (arr.length != 0)
                    finalArr.push(arr);
                if (arr.indexOf(elm) == -1)
                    finalArr.push(elm);
                arr = []
            }
        }
        for (var i = 0; i < finalArr.length; i++) {
            if ($.isArray(finalArr[i])) {
                var temp = finalArr[i]
                if (temp.length > 2)
                    returnArr.push(temp[0] + '-' + temp[temp.length - 1])
                else
                    returnArr = arrayUnique(returnArr.concat(temp));
            } else {
                returnArr.push(finalArr[i])
            }
        }
        return returnArr;
    } else
        return str;
}
/**
 * @Function Name   : arrayUnique
 * @Description     : Deletes duplicate entries in array
 * @param           : array
 * @returns         : array
 * */
function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};
/**
 * @Function Name   : handleStartTimerAjaxError
 * @Description     : called when ajax error occurs
 * @param           : data
 * @returns         :
 * */
function handleStartTimerAjaxError(data) {
	showInformation(data.responseText);
	removeLoading('', true);    
}
