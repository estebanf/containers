/**
 * Copyright (C) 2005-2015 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */


var userPref = {
	applyFixHeader : function(bol){
		if(bol){
			$('body').addClass('navbar-fixed');
			$('#navbar-top').addClass('navbar-fixed-top');
		}else{
			$('body').removeClass('navbar-fixed');
			$('#navbar-top').removeClass('navbar-fixed-top');
		}
	},
	applyTopMenu : function(bol){
		if(bol){
			$('#sidebar').find('li').addClass('hover');
			$('#sidebar').addClass('h-sidebar');
			$('#navbar-top').addClass('h-navbar');
		}else {
			$('#sidebar').find('li').removeClass('hover');
			$('#sidebar').removeClass('h-sidebar');
			$('#navbar-top').removeClass('h-navbar');
		}
	},
	applyFont : function(val){
		$('body').css('font-family',val);
	},
	applyDateFormat : function(val){
		userPreferences.dateFormat = val+" ";
	},
	applyTheme : function(val){
		t = $(document.body);
		t.removeClass("no-skin skin-1 skin-2 skin-3"), t.addClass(val), ace.data.set("skin", val);
		var i = ["red", "blue", "green", ""];
		$(".ace-nav > li.grey").removeClass("dark"), $(".ace-nav > li").removeClass("no-border margin-1"), $(".ace-nav > li:not(:last-child)").removeClass("light-pink").find("> a > " + ace.vars[".icon"]).removeClass("pink").end().eq(0).find(".badge").removeClass("badge-warning"), $(".sidebar-shortcuts .btn").removeClass("btn-pink btn-white").find(ace.vars[".icon"]).removeClass("white"), $(".ace-nav > li.grey").removeClass("red").find(".badge").removeClass("badge-yellow"), $(".sidebar-shortcuts .btn").removeClass("btn-primary btn-white");
		var s = 0;
		var n = ["btn-success", "btn-info", "btn-warning", "btn-danger"];
		if ("skin-1" == val)
			$(".ace-nav > li.grey").addClass("dark");
		else if ("skin-2" == val) $(".ace-nav > li").addClass("no-border margin-1"), $(".ace-nav > li:not(:last-child)").addClass("light-pink").find("> a > " + ace.vars[".icon"]).addClass("pink").end().eq(0).find(".badge").addClass("badge-warning");
		else if ("skin-3" == val)
			$(".ace-nav > li.grey").addClass("red").find(".badge").addClass("badge-yellow");
		"sidebar_scroll" in ace.helper && ace.helper.sidebar_scroll.reset()
	}
};
