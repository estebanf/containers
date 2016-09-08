/**
 * Copyright (C) 2005-2014 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

(function($) {
    $.fn.shapeRepository = function(stencilSetStr) {
        this.init = function(stencilSetStr) {
            this.genShapeRepositoryHTML(stencilSetStr.evalJSON());
        };
        this.genShapeRepositoryHTML = function(gStencilSetJson) {
            var shapeRepository = {};
            var categories = ["Activities", "Gateways", "Artifacts", "Events", "Connecting Objects"];
            var retHTML = "";

            
            $.each(categories, function(k, v){
                shapeRepository[v] = [];
            });

            var shapeCount = 0;

            $.each(gStencilSetJson.stencils, function(key, val){
                gShapeTypeNamesMap[val.id] = val.title;
                $.each(val.groups, function(k, v){
                    //Exclude Diagram stencilset
                    if(v != "Diagram"){
                      shapeRepository[v].push(val);
                      ++shapeCount;
                    }
                    
                });
            });
            this.shapeCount = shapeCount;
            for ( var category in shapeRepository) {
                var addCategory = '<li class="hsub" onclick="javascript:selectShapeRepositoriesChange(this);" id=""><a class="iconCursor parent-menu"><span class="menu-text">'+category+'</span><b class="arrow fa fa-angle-down"></b></a>'
                
                addCategory += '<ul class="submenu">';
                var stencils = shapeRepository[category];
                $.each(stencils, function(key, val) {
                    addCategory += '<li class=""><a class="wapama-shape-type" id="' + val.id+ '"><span class="shape-img-span"><img class="shape-img" src="/everteam/stencilset/bpmn2.0/icons/'+ val.icon + '"></img></span><span class="shape-name" data-lowercase="'+ val.title + '">'+ val.title + '</span></a></li>';
                });
                addCategory += '</ul></li>';
                $("#shape-repository").append(addCategory);
            }
        };
        this.showShapes = function(value) {
          var shownShapeCount = 0;
          var fieldId = 'shapeName';
          var args = {
              columnFilters: {},
              columnFiltersPrepared: {},
              typeInfo: {}
          };
          args.columnFilters[fieldId] = {datatype: 'io_string', numeric: false};
          //handle raw input
          value = $.trim(value);
          args.columnFiltersPrepared[fieldId] = top.Intalio.ux.utils.View.prepareFilter(value, 'io_string');
          $('span.shape-name').each(function(){
              var $this = $(this);
              var row = {};
              row[fieldId] = $this.attr("data-lowercase");
              if (top.Intalio.ux.utils.View.filterRow(row, args)) {
                var $parent = $this.parent();
                var $category = $parent.parent().prev();
                $parent.show();                
                if (!$category.is(':visible')) {
                    $category.show(); 
                }                
                ++shownShapeCount;
              }
          });
          return shownShapeCount;
        };
        this.grantDragBehavior = function(){
            $("a.wapama-shape-type").draggable({
                cursor : "move",
                helper : function() {
                    return $(this).clone().css({"white-space" : "nowrap", "z-index" : '999', "border-width" : "1px"});
                },
                opacity : "0.8",
                cursorAt : {
                    top : -10,
                    left : -10
                },
                drag : function(event, ui) {
                    var stencilId = $(this).attr("id");
                    window.beforedrop({
                        "stencilId" : stencilId
                    }, event);
                },
                containment : $("#diagram-designer"),
                appendTo : $("#diagram-designer")
            });
            $("#canvas").droppable({
                drop : function(event, ui) {
                    if (ui.draggable[0].afterdrag) {
                        ui.draggable[0].afterdrag({
                            "x" : event.clientX,
                            "y" : event.clientY
                        });
                        return;
                    }
                    var stencilId = ui.draggable.attr("id");
                    window.addshape({
                        "stencilId" : stencilId
                    }, {
                        x : event.clientX,
                        y : event.clientY
                    });
                }
            });
        }
        this.init(stencilSetStr);
        /*Added by satish to handle the drag behavior of an activity based on permission*/
        WAPAMA.CONFIG.PERMISSION_TYPE > 2 ? this.grantDragBehavior() : "";
    }
})(jQuery);