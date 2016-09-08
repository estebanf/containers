 /*
 * Copyright (C) 2016, Ever Team Software
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Ever Team Software or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

(function ($) {
    $.fn.toolbar = function (plugs) {

        var state = {};
        var currentGroupsName;

        var baseElementRight = '<a class="actionButtons btn btn-sm btn-white io-content-pane-header-button-left" type="button" />';
        var baseElementRightImg = "<i class=''></i>";
        var leftPosition = 97;
        

        var rightPosition = 10;
        this.init = function(plugs) {
            $("#breadcrumbs").find('span.toolbar').addClass('io-content-pane-header');
            for (var i = 0; i < plugs.length; i++) {
                if (plugs[i] == undefined) {
                    continue;
                }
                var plugName = plugs[i].name;
                if (plugName) {
                    //Amit comment WAPAMA.UI.I18NTranslate(plugName)
                    plugs[i].I18NDes = plugName;
                    plugs[i].id = plugs[i].id || plugName.toLowerCase().replace(/\s/g, "-");
                }

                this.addToolbarItem(plugs[i]);
            }
        }

        //Add toolbar item
        this.addToolbarItem = function(plug) {
          if(plug.id == "save"){
            var baseElement = $(baseElementRight);
            baseElement.attr('id', plug.id);
            var baseElementImgDiv = $(baseElementRightImg);
            baseElementImgDiv.attr('class', plug.icon);
            baseElement.attr('title', plug.I18NDes);
            baseElement.css("cursor", "pointer");
            /*Added by satish to handle the actions of a diagram based on permission*/
            if(WAPAMA.CONFIG.PERMISSION_TYPE <= 2)
                baseElement.attr('disabled', 'disabled');
            plug.disabled = false;
            
            var imgPosition = plug.position;
            if (imgPosition) {
                if (plug.minShape || plug.minNode) {
                    plug.disabled = true;
                }
                
                plug.disabled = plug.disabled || (!plug.isEnabled ? false : (plug.isEnabled && plug.isEnabled()) ? false : true);
                var x = imgPosition.x;
                var y = imgPosition.y;
                var disabledY = (parseInt(imgPosition.y) - 16) + "px";
                var mouseOverY = (parseInt(imgPosition.y) - 32) + "px";
                
                baseElementImgDiv.css("background-position", imgPosition.x + " " + imgPosition.y);
                
                baseElementImgDiv.mouseover(function() {
                    //plugDisabled = plug.shapeLimit || (!plug.isEnabled ? false : (plug.isEnabled && plug.isEnabled()) ? false : true);
                    if (!plug.disabled) {
                        $(this).css("background-position", imgPosition.x + " " + mouseOverY);
                    }
                })
                
                baseElementImgDiv.mouseout(function() {
                    if (!plug.disabled && !plug.pressed) {
                        $(this).css("background-position", imgPosition.x + " " + imgPosition.y);
                    }
                })
                
                if (plug.disabled) {
                    baseElementImgDiv.css({"cursor": "default", "background-position": imgPosition.x + " " + disabledY});
                }
            }

            if (plug && plug.icon) {
                baseElement.appendTo($('span.toolbar'));
                $('span.toolbar').delegate("a#" + plug.id, "click", function(event) {
                    event.stopPropagation();
                    if (plug.disabled) {
                        plug.functionality();
                    }
                });
                if (!plug.disabled && plug.updateTitle && plug.updateTitle instanceof Function) {
                    plug.updateTitle(baseElement[0]);
                }

                switch (plug.name) {
                    
                case WAPAMA.I18N.Save.save:
                    break;
                case WAPAMA.I18N.Save.close:
                    baseElement.removeClass('io-content-pane-header-button-left');
                    baseElement.addClass('io-content-pane-header-button-right');
                    break;
                default:
                    if (plug.group) {
                        if (!currentGroupsName) {
                            currentGroupsName = plug.group;
                        }
                        if (plug.group != currentGroupsName) {
                            leftPosition += 16;
                            currentGroupsName = plug.group;
                        }
                    }
                    baseElement.css({ 'left':leftPosition });
                    leftPosition += 25;
                    break;
                }
                baseElementImgDiv.appendTo(baseElement);
                baseElement.append("&nbsp;&nbsp;" + plug.I18NDes);
                plug.domEle = baseElement.find(".button-img:last")[0];
            }
        
          }
        }

        this.init(plugs);
        return this; 

    };

})(jQuery);