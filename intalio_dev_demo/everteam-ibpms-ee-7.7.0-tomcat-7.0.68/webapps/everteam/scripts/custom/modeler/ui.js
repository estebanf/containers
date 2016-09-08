/**
 * Copyright (C) 1999-2011, Intalio Inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

if(!WAPAMA) var WAPAMA = {};
WAPAMA.UI = {
    last_storage_key_for_load : "",
    storage : {},
    _status: "Draft",
    isPropertyPaneHidden: true,
    isSaved: true,
    _browserSupport: null,
    code_field_notshow_confirm: {},
    
    /**
     * Initialize _browserSupport object.
     */
    initBrowserSupport: function() {
        var ua = navigator.userAgent;
        // IE8+
        var isIEGt8 = /MSIE (\d+\.\d+);/.test(ua) && new Number(RegExp.$1) > 8;
        //IE9
        var isIE9 = /MSIE (\d+\.\d+);/.test(ua) && document.documentMode == 9;
        //IE10
        var isIE10 = /MSIE (\d+\.\d+);/.test(ua) && document.documentMode == 10;
        //IE11
        var isIE11 = (/Trident\/7\./).test(ua) && document.documentMode == 11;
        // IE
        var isIE = /MSIE (\d+\.\d+);/.test(ua) && document.all;
        // Chrome
        var isChrome = /Chrome[\/\s](\d+\.\d+)/.test(ua);
        // Chrome17+
        var isChromeGt17 = /Chrome[\/\s](\d+\.\d+)/.test(ua) && new Number(RegExp.$1) > 17;
        // Chrome 20+
        var isChromeGt20 = /Chrome[\/\s](\d+\.\d+)/.test(ua) && new Number(RegExp.$1) > 20;
        // FireFox
        var isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(ua);
        // Safari
        var isSafari = !/\bchrome\b/.test(ua.toLowerCase()) && /safari/.test(ua.toLowerCase());
        // Mac
        var isMac = /macintosh|mac os x/.test(ua.toLowerCase());
        this._browserSupport = {
            isIEGt8: isIEGt8,
            isIE9: isIE9,
            isIE10: isIE10,
            isIE11: isIE11,
            isIE: isIE,
            isChrome: isChrome,
            isChromeGt17: isChromeGt17,
            isChromeGt20: isChromeGt20,
            isSafari: isSafari,
            isFirefox: isFirefox,
            isMac: isMac
        }
    },
    
    /**
     * Restrict popover max height
     */
    restrictPopover: function() {
        var popover = jQuery('#io-designer-pane-popover');
        if (popover.length !== 0) {
            var top = parseInt(popover.css('top').match(/\d+/));
            var maxHeight = document.body.clientHeight - popover.find('div.header').height() - top - 16;
            popover.find('div.content ul').css('max-height', maxHeight + 'px'); 
        }        
    },
    
    /**
     * Serialize pipe multiple headers field after click wapama save
     */
    serializePipeMultipleHeaders: function() {
       var button = top.frames.$("#io-code-editor-restore-icon");
       if (button != null || button != undefined) {
          button.click();
       }
       var text_array = top.frames.$("input[name=multiple-headers-input]");
       if (text_array) {
          top.$(text_array[0]).trigger("focusout");
       }
    },
    
    /**
     * hide all the visible tooltips
     */
    hideTooltips: function() {
      //BUG-WAPAMA-000449
      window.top.$('.tooltip:visible').hide();
    },
    
    /**
     * Under IE8+ browser, turn xml document element into document element
     */
    toBeElement: function(xmlDocumentElement) {
        return $j(xmlDocumentElement.xml)[0];
    },
    
    /**
     * Do I18N by platform translation function.
     */
    I18NTranslate: function() {
        if (!top.t) {
          return "";
        };
        //return top.t.apply(top, arguments);
        return "";
    },
    
    /**
     * Set current diagram status. Pipe: draft, deploy, undeploy. BPM: draft, deploy, undeploy, initiate.
     */
    setDiagramStatus: function(status) {
        this._status = status;
    },
    
    /**
     * Return current diagram status. Pipe: draft, deploy, undeploy. BPM: draft, deploy, undeploy, initiate.
     */
    getDiagramStatus: function() {
        return this._status;
    },
    
    /**
     * If user permission is not allowed to update diagram then disable relative buttons.
     */
    checkUserPermissions: function() {
        var designerData = top.$("#designer-pane").data();
        var facade = WAPAMA.HOOK.facade;
        var createPermis = false;
        var updatePermis = false;
        createPermis = top.$.Intalio.AccessControl.checkPermission({templateType: "create", objectUUID: designerData.objectuuid});
        if (designerData.recorduuid) {
            updatePermis = top.$.Intalio.AccessControl.checkPermission({templateType: "update", objectUUID: designerData.objectuuid, recordUUID: designerData.recorduuid});
        }
        
        if ((designerData.recorduuid && updatePermis) || (!designerData.recorduuid && createPermis)) {
            $j("#io-designer-pane-popover").find("#deploy, #retire, #start").parent().show();
        } else {
            $j("#io-designer-pane-popover").find("#deploy, #retire, #start").parent().hide();
        }
        WAPAMA.UI.checkAllowedTransitions(designerData.recorduuid);
        facade.setUserPermissions({"create": createPermis, "update": updatePermis});
        facade.raiseEvent({type : WAPAMA.CONFIG.EVENT_TOOLBAR_REFRESH});
    },

    /**
     * Check allowed transitions
     */
    checkAllowedTransitions: function(profileUUID) {
        ///status_process/get_allowed_transitions?namespace=io&identifier=business_process&fieldNamespace=io&fieldIdentifier=status&recordUUID=01752e64-39c5-4f09-974e-2548cc3f14bc
        jQuery('a.transition').parent().hide();
        if (WAPAMA.PROFILE == 'io_spring_pipe' || WAPAMA.PROFILE == 'io_camel_pipe') {
            !profileUUID && jQuery('#deploy').parent().hide();
        }
        if (WAPAMA.PROFILE == 'io_business_process' && profileUUID) {
            var url = "/status_process/get_allowed_transitions?namespace=io&identifier=business_process"
                + "&fieldNamespace=io&fieldIdentifier=status&recordUUID="
                + profileUUID;
            var allowedTransitions;
            jQuery.ajax({
                url: url,
                async: false,
                type: "GET",
                success: function(response) {
                    response = WAPAMA.UI.decode(response);
                    if (response.length == 0 && WAPAMA.UI.getDiagramStatus() == 'Draft') {
                        /*
                         * Sometimes newly created process hasn't finished the initiate status operation
                         * when get allowed transitions, so it will return empty array.
                         * But for new process, the status is "Draft", so only "Deploy"&"Retire" are allowed.
                         */
                         response = ['Deploy', 'Retire'];
                    }
                    jQuery.each(response, function(){
                      var transition = this.toLowerCase();
                      jQuery('a.transition#' + transition).parent().show();
                    });
                },
                error: function(response) {
                    console.error("Unable to get allowed transitions for ", WAPAMA.PROFILE, profileUUID);
                }
            });
        }
        WAPAMA.UI.checkInitiateAllowable();
    },

    /**
     * Check whether user can initiate a process
     */
    checkInitiateAllowable: function() {
        //If a process is not deployed, or is status process, should hide the start button.
        if (WAPAMA.UI.getDiagramStatus() != 'Deployed' || WAPAMA.PROCESS_LEVEL == '48ddf494-d89d-4a0a-8060-7334414d638e') {
            jQuery('#start').parent().hide();
        } else {
            jQuery('#start').parent().show();
        }
    },
    
    /**
     * Create a text for shape name
     * 
     * @param {Object} config
     * @return {TextField}
     */ 
    createShapeNameText: function(config) {
        var shownTextField = jQuery("<input type='text' id='shapeName'/>");
         shownTextField.css({
             'position':'absolute',
             'width':config.width,
             'left':config.x,
             'top':(parseInt(config.y)),
             'z-index': 1000,
             'font-size': 12,
         });
         shownTextField.val(config.value);
         //shownTextField.attr('maxLength', config.maxLength);
         if (config.value && config.value != '') {
             shownTextField.attr('value', config.value);
         }
         shownTextField.appendTo(jQuery('#' + config.renderTo));
         return shownTextField;
    },
    
    /**
     * Try to focus the specified component
     * 
     * @see Ext.Component.focus
     * @param {Object} component
     * @param {Boolean} selectText
     * @param {Boolean/Number} delay
     */
    setFocus: function(component, selectText, delay) {
//        if (component instanceof Ext.Component) {
//            // invoke focus( [Boolean selectText] ,
//            //[Boolean/Number delay] ) : Ext.Component
//            component.focus(selectText, delay);
//        }
    },
    
    /**
     * Add listener to the specified component
     * 
     * @see Ext.util.Observable.on
     * @param {Object} component
     * @param {String} eventName
     * @param {Function} handler
     * @param {Object} scope
     * @param {Object} options
     */
    addListner: function(component, eventName, handler, scope, options) {
//        if (component instanceof Ext.util.Observable) {
//            // invoke on( String eventName , Function handler ,
//            // [Object scope] , Object options ) : void
//            component.on(eventName, handler, scope, options);
//        }
    },
    
    /**
     * Adds a list of functions to the prototype of an existing class,
     * overwriting any existing methods with the same name.
     * 
     * @param {Object} origclass
     * @param {Object} overrides
     */
    overrideButton: function() {
//        Ext.override(Ext.Button, {
//            // needed to change icons dynamically
//            setIcon: function(url, obj) {
//                if (this.rendered) {
//                    var btnEl = obj.getEl().child(obj.buttonSelector);
//                    btnEl.setStyle('background-image', 'url(' +url+')');
//                }
//            },
//            // needed to change tooltips dynamically
//            setTooltip: function(qtipText, obj) {
//                var btnEl = obj.getEl().child(obj.buttonSelector)
//                WAPAMA.UI.setQuickTips(btnEl.id, qtipText);
//            }
//        });
    },
    
//    /**
//     * Ext.QuickTips.register
//     * 
//     * @param {String} targetId
//     * @param {String} qtipText
//     */
//    setQuickTips : function(targetId, qtipText) {
//        Ext.QuickTips.register({
//            target: targetId,
//            text: qtipText
//        })
//    },
    
    /**
     * Ext.encode
     * 
     * @param {Object} obj
     */
    encode: function(obj) {
        return $j.toJSON(obj);
        //return JSON.stringify(obj);
    },
    
    /**
     * Ext.decode
     * 
     * @param {Object} obj
     */
    decode: function(obj) {
        return eval("(" + obj + ")");
    },
    
    /**
     * pack the functions for main.js.
     */
    main: {
        /** When the blank image url is not set programatically to a local
         * representation, a spacer gif on the site of ext is loaded from the
         * internet. This causes problems when internet or the ext site are not
         * available. 
         */
//        setBlankImgUrl : function() {
//            Ext.BLANK_IMAGE_URL = WAPAMA.PATH + 'lib/ext-2.0.2/resources/images/default/s.gif';
//        },
        
        finishedLoading: function(obj) {
            
            //WAPAMA.UI.checkUserPermissions();
            //WAPAMA.UI.updateDiagramRootJSON();
            WAPAMA.UI.showShapeRepository(window.gStencilSetJson);            
            this.finishLoadingCallback && 'function' === typeof(this.finishLoadingCallback) && this.finishLoadingCallback();
            top.$.Intalio.UI.removeLoadingIndicator(top.$('#content-main'));
            // Raise Loaded Event
            obj.handleEvents( {type:WAPAMA.CONFIG.EVENT_LOADED} )

            WAPAMA.Log.debug("finished loading WAPAMA");
            reSetDiagramHeight();
            
            // Add animation event listeners to diagram designer
            $j("div.diagram-designer").designerEventsHelper();
            
            window.setTimeout(function() {
              $.ajax({
                  url: "/diagramdesigner/stencilset/update/" + WAPAMA.PROFILE + '?process_level=' + WAPAMA.PROCESS_LEVEL,
                  type: "PUT",
                  success: function() {
                  }
              });
            }, 1000);
        },
        
        /**
         * adds a component to the specified region
         * 
         * @param {Object} facade
         * @param {String} region
         * @param {Ext.Component} component
         * @param {String} title, optional
         * @return {Ext.Component} dom reference to the current region or null if specified region is unknown
         */
//        addToRegion: function(facade, region, component, title) {
//            
//            // for plugins, use this instead of facade
//            if (facade == null) {
//                facade = this;
//            }
//            if (region.toLowerCase && facade.layout_regions[region.toLowerCase()]) {
//                var current_region = facade.layout_regions[region.toLowerCase()];
//
//                current_region.add(component);
//
//                WAPAMA.Log.debug("original dimensions of region %0: %1 x %2", current_region.region, current_region.width, current_region.height)
//                // update dimensions of region if required.
//                if  (!current_region.width && component.initialConfig && component.initialConfig.width) {
//                    WAPAMA.Log.debug("resizing width of region %0: %1", current_region.region, component.initialConfig.width)   
//                    current_region.setWidth(component.initialConfig.width)
//                }
//                if  (component.initialConfig && component.initialConfig.height) {
//                    WAPAMA.Log.debug("resizing height of region %0: %1", current_region.region, component.initialConfig.height)
//                    var current_height = current_region.height || 0;
//                    current_region.height = component.initialConfig.height + current_height;
//                    current_region.setHeight(component.initialConfig.height + current_height)
//                }
//                
//                // set title if provided as parameter.
//                if (typeof title == "string") {
//                    current_region.setTitle(title); 
//                }
//                            
//                // trigger doLayout() and show the pane
//                current_region.ownerCt.doLayout();
//                current_region.show();
//    
//                if(Ext.isMac)
//                    WAPAMA.Editor.resizeFix();
//                
//                return current_region;
//            }
//            return null;
//        },
        
        /**
         * Generate the whole viewport of the
         * Editor and initialized the Ext-Framework
         * 
         */
        generateGUI: function(facade) {
    
            //TODO make the height be read from eRDF data from the canvas.
            // default, a non-fullscreen editor shall define its height by layout.setHeight(int) 

            // Defines the layout hight if it's NOT fullscreen
            var layoutHeight    = 400;
        
            var canvasParent    = facade.getCanvas().rootNode.parentNode;
            $j("#canvas").append(canvasParent);
            return;
        }
    },
    
    /**
     * WAPAMA.Editor.makeExtModalWindowKeysave
     */
    makeExtModalWindowKeysave: function(facade) {
    },

    /**
     * Restore the RecordView when first select on canvas
     */
    restoreRecordView: function() {
        var wapamaDiv = WAPAMA.PANE.Designer.obj; //TODO Comment is to be removed. var wapamaDiv = top.$('#object-view');
        wapamaDiv.siblings(WAPAMA.PANE.Property.selector).show(); //TODO Comment is to be removed. wapamaDiv.siblings('#record-view').show();
        wapamaDiv.animate({
            height: '50%'
        },
        {
            step: function(now, fx) {
                $j(fx.elem).siblings('.io-content-pane').height((100 - now) + '%');
                top.$(document).trigger('objectViewResized');
                top.$(document).trigger('searchViewResized');
            }
        });
        // mark the flag as false, no use any longer.
        WAPAMA.UI.FULLSCREEN = false;
        // enable the maximize button
        var maximizeObj = $j('#maximize');
        var position = maximizeObj[0].position;
        maximizeObj.css("background-position", position.x + " " + position.y);
        maximizeObj[0].disEnabled = false;
        maximizeObj.css("cursor", "pointer");
    },
    
    /**
     * Show Toolbar.
     * 
     * @param plugs the toolbar plugin list
     */
    showToolbar: function(plugs) {
        $j('div.toolbar').toolbar(plugs);
    },

    confirmCodeLanguage: function(callback) {
      var formEl = WAPAMA.PANE.Property.obj.find(".io-section-form.object-form"),
          codeEls = formEl.find('[datatype="code"]');
      // not show again?
      var shapeUUID = formEl.attr("wapama_shape_uuid");      
      if (WAPAMA.UI.code_field_notshow_confirm[shapeUUID]) {
          callback();
          return;
      }

      if (codeEls.length == 0) {
        // the code editor maybe in full screen mode.
        var editorContainer = formEl.find('.code_editor_container');
        if (editorContainer.length == 0) {
          callback();
          return;          
        }
        // find the code els by the container
        codeEls = [];
        for (var i = 0; i < editorContainer.length; i++) {
          var containerId = editorContainer[i].id,
              editorId = containerId.substring(0, containerId.length - "_container".length);
          codeEls.push({"id": editorId});
        }
      }
      var codeFields = {},
          self = this;
      var object = top.$.Intalio.Metamodel.getObject(formEl.recordform("option", "object"));
      for (var i = 0; i < codeEls.length; i++) {
        var id = codeEls[i].id,
            codeEl = top.$("#" + id);
        if (codeEl.length == 0) continue;

        var langs = codeEl.codeFormField("getSupportedLang");
        if (langs == null || Object.keys(langs).length == 1) continue;
        if (codeEl.codeFormField("isCodeChanged")) {
          var fieldId = codeEl.attr("name"),
              fieldName = object.getField(fieldId).getName(),
              langId = codeEl.codeFormField("value")[0],
              code = codeEl.codeFormField("value")[1];

          codeFields[fieldId] = {el: codeEl, fieldName: fieldName, langId: langId, code: code, langs: langs};
         }
       }
       if (top.$.isEmptyObject(codeFields)) {
         callback();
         return; 
       }

        var container = top.$('<div class="io-record-view" style="background-color: white;overflow-y: scroll;position: absolute;top: 0px;bottom: 0px;left: 0px;right: 0px;line-height: 25px;"></div>');
        var msgSection = top.$("<p style='margin-left: 6px;margin-bottom: 20px;'><label class='io-input-label'></label></p>").text(WAPAMA.UI.I18NTranslate("Please confirm the language of the content in the following code field(s)" + ":"));
        container.append(msgSection);
        for (var fieldId in codeFields) {
          var tField = WAPAMA.UI.I18NTranslate(codeFields[fieldId].fieldName),
              el = top.$("<div style='margin-bottom: 20px;'></div>"),
              codeSection = top.$("<p style='margin-bottom: 0px;'><label class='io-input-label' style='width: 130px;margin-top: -4px;'></label><textarea rows='5' style='resize: none;width: 460px;background-color:#eeeeee' readonly></textarea></p>").find("label").text(tField).end().find("textarea").val(codeFields[fieldId].code).end(),
              langSection = top.$("<p><label class='io-input-label' style='width: 130px;margin-top: 1px;;'></label><select class='io-select'>").find("label").text(WAPAMA.UI.I18NTranslate("Language")).end().find("select").attr("name", fieldId).end(),
              langEl = langSection.find("select"),
              langs = codeFields[fieldId].langs;
              
          for (var lang in langs) {
            top.$("<option></option>").attr("value", lang).text(langs[lang]).appendTo(langEl);
          }
          langEl.val(codeFields[fieldId].langId);

          el.append(codeSection).append(langSection);
          container.append(el);
        }

        setTimeout(function(){
          top.$.Intalio.UI.initializeDialog({
            title: WAPAMA.UI.I18NTranslate("Confirm Language"),
            message: container,
            dialogClass: "noclosebtn",
            height: 400,
            buttons: [{
              text: WAPAMA.UI.I18NTranslate('Confirm'),
              click: function() {
                // update the language
                container.find("select").each(function(){
                  var el = top.$(this),
                      fieldId = el.attr("name"),
                      lang = el.val();
                  var codeEl = codeFields[fieldId].el;
                  codeEl.codeFormField("updateLanguage", lang);
                })

                for (var fieldId in codeFields) {
                  codeFields[fieldId].el.codeFormField("resetLastCode");
                }
                top.$(this).dialog("destroy");
                callback();                
              }
            }]
          }, function(contentEl){
            var dialogEl = contentEl.parent(),
                buttonPane = dialogEl.find("div.ui-dialog-buttonpane"),
                dontShowContainer = top.$('<div style="float:left;"><p style="margin: .5em .4em .5em 0;"></p></div>'),
                dontShowCheckbox = top.$('<input id="dont-show-again" name="dont-show-again" type="checkbox" style="display: none;">'),
                dontShowLbl = top.$('<label for="dont-show-again" style="white-space: nowrap;font-size: 14px;"></label>').text(WAPAMA.UI.I18NTranslate('Do not show this again'));
              
            dontShowContainer.append(dontShowCheckbox).append(dontShowLbl);
            dontShowContainer.prependTo(buttonPane);
                
            dontShowCheckbox.on("click", function(){
               var dontshow = top.$(this).attr('checked') ? true : false;                  
               WAPAMA.UI.code_field_notshow_confirm[shapeUUID] = dontshow;
            })
          });          
        }, 300);
    },
    
    /**
     * Show RecordView.
     * 
     * @param {Boolean} isNew, determine that it's a new dragged shape
     * @param {uuid} shape_type_uuid, the shape_type_uuid of current shape 
     * @param {uuid} uuid  the uuid, of current shape 
     */
    showRecordView: function(isNew, shape_type_uuid, uuid) {
        // Set the controler to prevent call the method twice.
        var storage_key = uuid;//shape_type_uuid + uuid;

        if ((this.last_storage_key_for_load != "" && storage_key == this.last_storage_key_for_load) ||
          uuid == top.$.Intalio.ClientState.get("property.shapeuuid")){
          if (!WAPAMA.UI.isPropertyPaneHidden) {
            // BUG-UI-004642 dont set ClientState here, or property pane will load twice for new shape
            var $breadcrumb = top.$('#io-breadcrumb');
            $breadcrumb.breadcrumb('selectItem', $breadcrumb.breadcrumb('getItemsByType', 'property').attr('uuid'));

            jQuery('#restore').hide();
            jQuery('#maximize').show();
          }
          return;
        }

        var executeRecordSwitch = function() {
          var shapeuuid = WAPAMA.PANE.Property.obj.find(".io-section-form.object-form").attr("wapama_shape_uuid");
          var recorduuid = "";
          if (!isNew) {
              recorduuid = uuid;
          }
          var state = {
            "property": {
                "type":  "designer",
                "object": {
                    "uuid": shape_type_uuid
                 },
                 "uuid": recorduuid,
                 "shapeuuid": uuid
             }
          }
  
          if (WAPAMA.UI.isPropertyPaneHidden) {
              state.property.hidden = true;
          } else {
              state.property.hidden = false;
              state.maximized = false;
              state.focus = "property";
              state.property.from = "designer"
          }
          
          WAPAMA.UI.storeShapeRecordJSON(top.$.Intalio.ClientState.get("property.shapeuuid"));
          // If call this method for the first time, create storage_uuid and storage,
          // and must not save the data of old record view.
          if (this.last_storage_key_for_load == "" || (storage_key != this.last_storage_key_for_load)) {
              this.last_storage_key_for_load = storage_key;
              top.$.Intalio.ClientState.set(state);
          }
  
          if (!this.isPropertyPaneHidden) {
            jQuery('#restore').hide();
            jQuery('#maximize').show();
          }
        }
        WAPAMA.UI.confirmCodeLanguage(executeRecordSwitch);
    },
    
    convertProperties: function(stencil, properties) {
      var namespace = stencil.namespace;
      var id = stencil.id;
      var fullIdentifier = namespace + '_' + id;
      var objectModel = top.$.Intalio.Metamodel.getObject(fullIdentifier);
      for (var fieldFullIdentifier in properties) {
        var field = objectModel.getField(fieldFullIdentifier);
        if (field != null) {
          var datatype = field.getDatatype().getFullIdentifier();
          var value = properties[fieldFullIdentifier];
          if (value != undefined) {
            switch(datatype) {
              case "io_relationship":
                value = value.uuid;
                break;
              case "io_option_list":
                value = JSON.parse(value);
                break;
              case "io_dynamic_relationship":
                value = [value.uuid, value.target];
                break;
            }
            properties[fieldFullIdentifier] = value;
          }
        }
      }
      
      return properties;
    },
    
    /**
     * updateCurrentRecordView.
     * 
     * @param {uuid} shape_type_uuid, the shape_type_uuid of current shape 
     * @param {uuid} uuid, the uuid of current shape 
     */
    updateCurrentRecordView: function(shapeuuid, isRootShape) {
        var retValue;
        var shape = wapamaEditor.selection[0];
        if (!shape || shape.targetRecord != shapeuuid) {
            var childShapes = wapamaEditor._getPluginFacade().getJSON().getChildShapes(true);
            shape = childShapes.detect(function(childShape){
                if (childShape.targetRecord == shapeuuid) {
                    return true;
                }
                return false;
            });
        }
        var shapeName = null;
        if (shape) {
            shapeName = shape.properties.name;
        }
        // If have no json saved of the current record view.
        // determine that it's a new dragged shape, no need to update
        var isSerializedValue = false;
        if (null != this.storage[shapeuuid]) {
            currentComplexJSON = this.storage[shapeuuid];
            retValue = currentComplexJSON;
        } else if (shape && shape.isNew && shape.form_data != null) {
          currentComplexJSON = shape.form_data;
          isSerializedValue = true;
        } else if (shape && shape.isDeleted) {
            //BUG-WAPAMA-000453 The field values will disappear after delete-save-undo
            var shape_Stencil = shape.getStencil();
            var shapeObject = shape_Stencil._jsonStencil.namespace + '_' + shape_Stencil._jsonStencil.id.split(shape_Stencil._namespace)[1];
            var shapeUUID = shape.targetRecord;
            $j.ajax({
              url: '/ui/' + shapeObject + '/' + shapeUUID,
              dataype: 'json',
              type: 'GET',
              async: false,
              success: function(data) {
                  currentComplexJSON = top.$.Intalio.UI.flatAsFormData(data);
                  currentComplexJSON.io_deleted = false;
                  isSerializedValue = true;
              },
              error: function(response) {
                  currentComplexJSON = new Object();
              }
           });
         } else {
            currentComplexJSON = new Object();
        }
        if (shapeName) {
            currentComplexJSON.name = shapeName;
        }
        // Update recordView with current complex JSON
        //top.$.fn.set_original_json_to_form(currentComplexJSON.evalJSON());
        WAPAMA.UI.setCurrentFormOriginalJSON(currentComplexJSON, isSerializedValue);
        return retValue;
    },
    
    updateDiagramRootJSON: function() {
        var recordView = top.$('#record-view');
        var recordForm = top.$('#record-view').find(".io-section-form.object-form");
        var propertyPane = WAPAMA.PANE.Property.obj;
        var propertyForm = propertyPane.find(".io-section-form.object-form");
        
        var diagramRootForm = undefined;
        
        if ((recordForm.size() < 1 || !recordForm.data("recordform")) && (propertyForm.size() < 1 || !propertyForm.data("recordform"))) {
            return;
        }
        
        var recordFormId = recordForm.attr("id");
        var recorduuid = recordForm.find("#io_uuid").text() || recordForm.find("#io_uuid").val();
        
        if (!recordFormId || recordFormId.replace('-form', '') != WAPAMA.PROFILE || recorduuid != profileUUID) {
          var propertyFormId = propertyForm.attr("id");
          var propertyuuid = propertyForm.find("#io_uuid").text() || propertyForm.find("#io_uuid").val();
          if (!propertyFormId || propertyFormId.replace('-form', '') != WAPAMA.PROFILE || propertyuuid != profileUUID) {
            return;
          } else {
            diagramRootForm = propertyForm;
            recorduuid = propertyuuid;
          }
        } else {
          diagramRootForm = recordForm;
        }

        var rootDiagramNode = WAPAMA.HOOK.facade.getCanvas();
        var value;
        var recordFormSerializedValue = diagramRootForm.recordform('serializedValue');
        for (var entry in recordFormSerializedValue) {
            value = recordFormSerializedValue[entry];
            rootDiagramNode.setProperty(entry, value);
        }
        if (profileUUID) {
            rootDiagramNode.targetRecord = profileUUID;
        } else if (recorduuid) {
            rootDiagramNode.targetRecord = recorduuid;
        }
    },
    
    genUserInputObject: function(recordShapeUUID) {
        var recordView = WAPAMA.PANE.Property.obj.find(".io-scroll-view"); //TODO Comment is to be removed. var recordView = top.$("#io-record-view-scroll-view");
        if (recordView.length < 1) {
            return;
        }
        var name = recordView.find(".io-object-name").text();
        var id = recordView.find(".io-section-form.object-form").attr("id");
        var shapeObject;
        var fields;
        var retObj;
        if (id) {
            id = /io_(.*)-form/.exec(id)[1];
        }
        
        fields = recordView.find(".userInputClickMark > input:checked").map(function() {
            var span = $j(this).parent();
            var id = span.next().next().attr("id");
            var name;
            id = /io_(.*)/.exec(id)[1] || id;
            name = span.next().text() || id;
            return {"id":id, "name": name};
            }).get();
        
        shapeObject = {
                "uuid": recordShapeUUID,
                "name": name,
                "id": id,
                "fields": fields
        }
        
        retObj = {
                "id": recordShapeUUID,
                "object": shapeObject
        }
        return retObj;
    },

    updateReferToView: function(shapeid, refid, shapeType, prop) {
        var referViews = [];
        var fullRefid = shapeid + refid;
        if (shapeType == 'edge') {
          // to support multiple markers, 
          // which should be grouped by pid(usually field identifier)
          if (prop) {
            // search with pid firstly
            referViews = $j("#" + shapeid + "end, #" + shapeid + "start").children('[pid=' + prop + ']');
          }
          // fallback to get all incase markers for certain shape dont have attribute pid
          if (referViews.length == 0) {
            referViews = $j("#" + shapeid + "end, #" + shapeid + "start").children('[id]');
          }
        } else {
          // node shape
          referViews = $j("#" + shapeid + " .refViews").children();
        }
        
        // hide all found firstly, then show the marker with spicific id
        if (referViews.length > 0) {
          referViews.hide();
          referViews.filter('[id=' + fullRefid + ']').show();
          // need to show arrow on flow end
          if (shapeType == 'edge') {
            referViews.filter('[id=' + shapeid + '_' + shapeid + '_1' + ']').show();
          }
        }
    },

    /**
     * Update the value in record view
     */
    updateCurrentRecordViewWithNewValue: function(key, value, shapeuuid) {
        var recordShapeUUID = WAPAMA.PANE.Property.obj.find(".io-section-form.object-form").attr("wapama_shape_uuid");//TODO Comment is to be removed. var recordShapeUUID = top.$('#record-view').find(".io-section-form.object-form").attr("wapama_shape_uuid")
        if (!recordShapeUUID || shapeuuid != recordShapeUUID) {
            return;
        }
        currentComplexJSON = new Object();
        currentComplexJSON[key] = value;
        WAPAMA.UI.setCurrentFormOriginalJSON(currentComplexJSON);
        
        if (WAPAMA.PANE.Property.obj.find('#' + key).formField('hasPlaceholder')) {
            WAPAMA.PANE.Property.obj.find('#' + key).placeholderDecorator('refresh');
        }
    },

    /**
     * get id from current property-pane.
     *
     * @return id from current property-pane.
     */
    getCurrentPropertyPaneFormId: function() {
        // record-View Id
        return WAPAMA.PANE.Property.obj.find(".io-section-form.object-form").attr("id");//TODO Comment is to be removed. return top.$('#record-view').find(".io-section-form.object-form").attr("id");
    },
    
    /**
     * get the plain JSON (like a Map<K,V>) from current record-view.
     * 
     * @return plain JSON
     */
    getCurrentFormJSON: function() {
        var form = WAPAMA.PANE.Property.obj.find('.object-form').recordform();//TODO Comment is to be removed. var form = top.$('#record-view').recordform();
        return form.recordform('serializedValue');
    },
    
    /**
     * get the complex JSON (which can update back to the form) from current property-pane.
     *
     * @return original JSON
     */
    getCurrentFormOriginalJSON: function() {
        var form = WAPAMA.PANE.Property.obj.find('.object-form').recordform();//TODO Comment is to be removed. var form = top.$('#record-view').recordform();
        return form.recordform('value');
    },
    
    /**
     * Store shape record JSON.
     */
    storeShapeRecordJSON: function(shapeuuid) {
        var lastComplexJSON = WAPAMA.UI.getCurrentFormOriginalJSON();
        this.storage[shapeuuid] = lastComplexJSON;
    },
    
    /**
     * Save shape properties.
     */
    saveShapeProperties: function(shapeuuid) {
        var propertyWindowPlugin = WAPAMA.HOOK.facade.getPlugin("WAPAMA.Plugins.PropertyWindow");
        if (propertyWindowPlugin) {
            propertyWindowPlugin.updateDiagramJSON();
        }
    },

    /**
     * set the complex JSON to the record-view.
     *
     * @param original JSON
     */
    setCurrentFormOriginalJSON: function(originalJson, isSerializedValue) {
        var propertyPane = WAPAMA.PANE.Property.obj;
        var form = propertyPane.find('.object-form').recordform();//TODO Comment is to be removed. var form = top.$('#record-view').recordform();
        if (isSerializedValue) {
          form.recordform('bind_serialized_data', originalJson);
        } else {
          form.recordform('value', originalJson);
        }
        var primaryNameId = propertyPane.find('.io-record-name').attr('primarynamefield');
        if (primaryNameId) {
            primaryName = originalJson[primaryNameId];
            if (primaryName && primaryName != ''){
                propertyPane.find('.io-record-name').removeClass('io-record-name-none').text(primaryName);
            } else {
                propertyPane.find('.io-record-name').addClass('io-record-name-none').text('No Name');
            }
        }
        if (WAPAMA.UI.doValidationAfterBindData) {
            propertyPane.find('.object-form').recordform("validate_form_from_server", true);
            WAPAMA.UI.doValidationAfterBindData = false;
        }
    },

    /**
     * getShapeTypeFromCurrentPropertyPane
     *
     * @return current PropertyPane's Id
     */
    getShapeTypeFromCurrentPropertyPane: function() {
        // record-View Id
        var formId = WAPAMA.UI.getCurrentPropertyPaneFormId();
        if (!formId) {
            return null;
        }
        // shape_type of current record
        var shape_type = formId.replace('io_','').replace('-form','');
        return shape_type;
    },

    /**
     * Show ShapeRepository.
     * 
     * @param plugs the toolbar plugin list
     */
    showShapeRepository: function(gStencilSetStr) {
        //jqueryShapeRepository.initShapeRepository(gStencilSetStr);
        $j("#shape-repository").shapeRepository(gStencilSetStr);
    },
    
    grantShapeMenuButtonDraggableBehavior: function(shapeMenu, button, option){
        $j(button).draggable({
            cursor: "move",
            helper: function() {
                this.afterdrag = shapeMenu.afterDragging.bind(shapeMenu, {
                    "stencilId": option.type,
                    "connectingType": option.connectingType
                    });
                return $j(this).clone();
            },
            opacity: "0.8",
            cursorAt: {
                left: 5,
                top: -10
            },
            drag: function(event, ui) {
                shapeMenu.beforeDragOver({
                    "stencilId": option.type
                }, event);
            },
            appendTo: '#canvas'
        });
    },

    /**
     * Change the click action of deploy/undeploy button.
     * After successfully deploy/undeploy a pipe, need to change the button action to undeploy/deploy.
     */
    changeDeployAction: function(cfg) {
        $j('#deploy').unbind('click');
        $j('#deploy').text(this.I18NTranslate(cfg.name));
        $j('#deploy').click(cfg.functionality);
    },
    /**
     * Get shape from canvas by the shape_uuid in record view
     *
     * @param {recordShapeUUID} the uuid
     */
    getShapeByTargetRecordFromCanvas: function(recordShapeUUID) {
        var canvas = wapamaEditor._getPluginFacade().getCanvas();
        return canvas.getShapeByTargetRecord(canvas.getChildShapes(), recordShapeUUID);
    },

    removePendingNotice: function(notice_identifier) {
        if (notice_identifier) {
            jQuery.each(top.jQuery('div#' + notice_identifier), function(){
                jQuery(this).parent().remove();
            });
        }
    },

    /**
     * Ext.apply
     * Copies all the properties of config to obj.
     * 
     * @param {Object} obj The receiver of the properties
     * @param {Object} config The source of the properties
     * @param {Object} defaults A different object that will also be applied for default values
     * @return {Object} returns obj
     */
    apply: function(obj, config, defaults) {
        if(defaults){
            WAPAMA.UI.apply(obj, defaults);
        }
        if(obj && config && typeof config == 'object'){
            for(var p in config){
                obj[p] = config[p];
            }
        }
        return obj;
        //var object = Ext.apply(obj, config, defaults);
        //return object;
    },
    
    /**
     * Ext.applyIf
     * Copies all the properties of config to obj if they don't already exist.
     * 
     * @param {Object} obj The receiver of the properties
     * @param {Object} config The source of the properties
     * @return {Object} returns obj
     */
    applyIf: function(obj, config) {
        if(obj){
            for(var p in config){
                if(typeof obj[p] === 'undefined'){
                    obj[p] = config[p];
                }
            }
        }
        return obj;
        //var object = Ext.applyIf(obj, config);
        //return object;
    },
    
    /**
     * True if the detected browser is Chrome.
     * @return {Boolean}
     */
    isSafari: function() {
        return this._browserSupport.isSafari;
        //return Ext.isSafari;
    },
    
    /**
     * True if the detected platform is Mac OS.
     * @return {Boolean}
     */
    isMac : function() {
        return this._browserSupport.isMac;
        //return Ext.isMac;
    },
    
    /**
     * Return true if the browser is IE.
     * @return {Boolean}
     */
    isIE: function() {
        return this._browserSupport.isIE;
    },
    
    /**
     * Return true if the browser is IE and its version is greater than 8.
     * @return {Boolean}
     */
    isIEGt8: function() {
        return this._browserSupport.isIEGt8;
    },
    
    /**
     * Return true if the browser is IE and its version is 9.
     * @return {Boolean}
     */
    isIE9: function() {
        return this._browserSupport.isIE9;
    },
    
    /**
     * Return true if the browser is IE and its version is 10.
     * @return {Boolean}
     */
    isIE10: function() {
        return this._browserSupport.isIE10;
    },
    
    /**
     * Return true if the browser is IE and its version is 10.
     * @return {Boolean}
     */
    isIE11: function() {
        return this._browserSupport.isIE11;
    },
    
    /**
     * Return true if the browser is Chrome.
     * @return {Boolean}
     */
    isChrome: function() {
        return this._browserSupport.isChrome;
    },
    
    /**
     * Return true if the browser is Chrome and its version is greater than 17.
     * @return {Boolean}
     */
    isChromeGt17: function() {
        return this._browserSupport.isChromeGt17;
    },
    
    /**
     * Return true if the browser is Chrome and its version is 21
     */
    isChromeGt20: function() {
        return this._browserSupport.isChromeGt20;
    },

    /**
     * Return true if the browser is firefox.
     * @return {Boolean}
     */
    isFirefox: function() {
        return this._browserSupport.isFirefox;
    },

    showNotification: function(message, stay) {
        jQuery.detailNoticeAdd({
            text: message,
            stay: stay
        });
    },
    showNativeNotification: function(message, stay) {
        jQuery.detailNoticeAdd({
            I18NText: message,
            stay: stay
        });
    },
    notifyUpdated: function(object, record, newRecord) {
      WAPAMA.PANE.Record.obj.recordView('refresh', record);
      var objectGrid = top.$('#objectGrid');
      if (objectGrid.length == 1 && objectGrid.data("listview")) {
        // add or update row in object view incase record is added or updated
        if (newRecord) {
          objectGrid.listview('addRowByIds', object, record);
        } else {
          objectGrid.listview('updateRowByIds', object, record);
        }
        return;
      }  
      // update calendar view
      var calendarView = top.$("#io-temporal-perspective");
      if (calendarView.length == 1 && calendarView.data("calendarView")) {
        if (newRecord) {
          calendarView.calendarView("addEvent");
        } else {
          calendarView.calendarView("updateEvent");
        }
      }
    },

    /**
     * Show the Notification when operation failed
     * A Detail link will show below, allow user click and see detail info
     */
    showNotificationWithDetail: function(message, responseText) {
        jQuery.detailNoticeAdd({
            text: message,
            stay: true,
            responseText: responseText != undefined ? '<pre>' + responseText + '</pre>' : ''
        });
    },

    /**
     * Show the error message of validation
     * @param errorMarkers The error markers of validation. The errorMarkers has
     * four attributes:
     * 1. uuid: UUID of the shape
     * 2. name: Name of the shape record.
     * 3. shape_type: Shape type name of the shape record.
     * 4. message: Error message.
     */
    showValidationError: function(errorMarkers, context, from) {
      if (typeof(errorMarkers) == 'string'){
           top.$.IntalioUI('error',errorMarkers);
           return;
        }
    
        jQuery.each(errorMarkers, function(){

            jQuery.detailNoticeAdd({
                I18NText: (this.name || WAPAMA.UI.I18NTranslate(this.shape_type)) + ": " + this.message,
                stay: true,
                relatedShapeId: this.uuid,
                context: context,
                from: from
            });
            if (this.shape_type == gShapeTypeNamesMap[WAPAMA.PROFILE.substr(WAPAMA.PROFILE.indexOf('_') + 1)]) {
                //If the notice is for diagram level validation, do not show the look into icon.
                top.jQuery('div.notice-item-show-error-shape').last().hide();
            }
        });
        /*
        var header = "<div class='validation-header'>" + "Validation Error" + "</div>";
        var errorContent = "<div class='validation-error-content'>";
        var errorTable = "<div class='scroll-table'><table class='error-content'>"
        var errorHeader = "<table class='error-header-table'><tr>"
            + "<td class='validation-shape-type'>" + "Shape Type" + "</td>"
            + "<td class='validation-shape-name'>" + "Shape Name" + "</td>"
            + "<td class='validation-error-message'>" + "Error Message" + "</td>"
            + "</tr></table>"
        var scrollBox = "<div class='scrollBox'>";
        for(var i = 0; i < errorMarkers.length; i++) {
            var errorMarker = errorMarkers[i];
            errorTable = errorTable.concat("<tr><td class='validation-shape-type'>"
                    + errorMarker.shape_type + "</td><td class='validation-shape-name'>"
                    + errorMarker.name + "</td><td class='validation-error-message'>"
                    + errorMarker.message
                    + "</td></tr>");
        }
        errorContent += (errorHeader + "</div>");
        scrollBox += (errorTable + "</table></div>");
        scrollBox += "</div>";
        jQuery.validationNoticeAdd({
            content: header + errorContent + scrollBox,
            stay: true,
            responseText: responseText != undefined ? responseText : ''
        });
        jQuery(".scroll-table").scrollbar({
            autohide: false,
            overlay: true
        });*/
    },

    // Ext.Msg.alert
    alert : function(title, msg, fn, scope) {
        //Ext.Msg.alert(title, msg, fn, scope);
        WAPAMA.Log.error(alert);
    }
}

function reSetDiagramHeight() {
    var center = $j(".diagram-designer .center");
    // div prefix is to avoid invoke prototype Element.hasClassName under ie9,
    // Element.hasClassName can't work under ie9 if Element is an SVG Element.
    var centerLeft = center.find("div.right");
    var centerMiddle = center.find("div.left");
    var centerRight = center.find("div.middle");
    
    center.height($j("div.diagram-designer").height() - $j(".diagram-designer .toolbar").outerHeight());
    WAPAMA.UI.restrictPopover();

    if (($j('#show-repository').css('display') == 'block') && ($j('#show-shape-property').css('display') == 'block')) {
      centerLeft.width(26);
      centerRight.width(26);
      var centerLeftWidth = center.width() - centerLeft.outerWidth() - centerRight.outerWidth();
      if (parseInt(centerMiddle.position().top) !== parseInt(centerLeft.position().top) ) {
          centerLeftWidth = centerLeftWidth - 1;
      }
      centerMiddle.width(centerLeftWidth);
      $j('#show-repository').find("#show-repository-pane").height(center.height() - 20);
    } else if ($j('#show-repository').css('display') == 'block') {
      centerLeft.width(26);
      var centerLeftWidth = center.width() - centerLeft.outerWidth() - centerRight.outerWidth();
      if (parseInt(centerMiddle.position().top) !== parseInt(centerLeft.position().top) ) {
          centerLeftWidth = centerLeftWidth - 1;
      }
      if ($j('#shape-property').css('display') == 'block') {
          centerRight.width(parseInt(center.width() * 0.22));
          
      }
      //centerMiddle.width(parseInt(centerLeftWidth) - 80);
      centerMiddle.width(parseInt(center.width() * 0.75));
      $j('#show-repository').find("#show-repository-pane").height(center.height() - 20);
    } else if ($j('#show-shape-property').css('display') == 'block') {
      centerRight.width(24);
      if ($j('#shape-repository').css('display') == 'block'){
          centerLeft.width(parseInt(center.width() * 0.16));
      }
      var centerLeftWidth = center.width() - centerLeft.outerWidth() - centerRight.outerWidth();
      if (parseInt(centerMiddle.position().top) !== parseInt(centerLeft.position().top) ) {
          centerLeftWidth = centerLeftWidth - 1;
      }
      centerMiddle.width(centerLeftWidth - 10);
      $j('#show-repository').find("#show-repository-pane").height(center.height() - 20);
    } else {
      centerLeft.width(parseInt(center.width() * 0.16));
      centerMiddle.width(parseInt(center.width() * 0.60));
      centerRight.width(parseInt(center.width() * 0.23));
      // to ensure width is an int value rather than float value. To fix WAPAMA-186.
      var centerRightWidth =  center.width() - centerMiddle.outerWidth() - Math.round(parseFloat(centerLeft.css("border-left-width")) + 0.5);
      if (parseInt(centerMiddle.position().top) !== parseInt(centerLeft.position().top) ) {
          centerRightWidth = centerRightWidth - 1;
      }
      //centerLeft.width(centerRightWidth);
    }
}

(function($) {
    /** jQuery.toJSON( json-serializble )
        Converts the given argument into a JSON respresentation.

        If an object has a "toJSON" function, that will be used to get the representation.
        Non-integer/string keys are skipped in the object, as are keys that point to a function.

        json-serializble:
            The *thing* to be converted.
     **/
    var useHasOwn = {}.hasOwnProperty ? true : false;
    $j.toJSON = function(o)
    {
        var type = typeof(o);
    
        if (o === null)
            return "null";
    
        if (type == "undefined")
            return "null";
        
        if (type == "number")
            return isFinite(o) ? String(o) : "null";
        
        if (type == "boolean")
            return String(o);
    
        if (type == "string")
            return $j.quoteString(o);
    
        if (type == 'object')
        {
            if (o.constructor === Date)
            {
                var month = o.getMonth() + 1;
                if (month < 10) month = '0' + month;

                var day = o.getDate();
                if (day < 10) day = '0' + day;

                var year = o.getFullYear();
                
                var hours = o.getHours();
                if (hours < 10) hours = '0' + hours;
                
                var minutes = o.getMinutes();
                if (minutes < 10) minutes = '0' + minutes;
                
                var seconds = o.getSeconds();
                if (seconds < 10) seconds = '0' + seconds;
                
                var milli = o.getMilliseconds();
                if (milli < 100) milli = '0' + milli;
                if (milli < 10) milli = '0' + milli;

                return '"' + year + '-' + month + '-' + day + 'T' +
                             hours + ':' + minutes + ':' + seconds + 
                             '.' + milli + 'Z"'; 
            }

            if (o.constructor === Array) 
            {
                var a = ["["], b, i, l = o.length, v;
                for (i = 0; i < l; i += 1) {
                    v = o[i];
                    switch (typeof v) {
                        case "undefined":
                        case "function":
                        case "unknown":
                            break;
                        default:
                            if (b) {
                                a.push(',');
                            }
                            a.push(v === null ? "null" : $j.toJSON(v));
                            b = true;
                    }
                }
                a.push("]");
                return a.join("");
            }
            var a = ["{"], b, i, v;
            for (i in o) {
                if(!useHasOwn || o.hasOwnProperty(i)) {
                    v = o[i];
                    switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if(b){
                            a.push(',');
                        }
                        a.push($j.toJSON(i), ":",
                                v === null ? "null" : $j.toJSON(v));
                        b = true;
                    }
                }
            }
            a.push("}");
            return a.join("");
        }
    };

    /** jQuery.quoteString(string)
        Returns a string-repr of a string, escaping quotes intelligently.  
        Mostly a support function for toJSON.
    
        Examples:
            >>> jQuery.quoteString("apple")
            "apple"
        
            >>> jQuery.quoteString('"Where are we going?", she asked.')
            "\"Where are we going?\", she asked."
     **/
    $j.quoteString = function(s)
    {
        if (/["\\\x00-\x1f]/.test(s))
        {
            return '"' + s.replace(/([\x00-\x1f\\"])/g, function (a, b) 
            {
                var c = _meta[b];
                if(c){
                    return c;
                }
                c = b.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + s + '"';
    };
    
    var _meta = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };
})($);

/**
*  jQuery.noticeAdd() and jQuery.noticeRemove()
*  These functions create and remove growl-like notices
*
*  Copyright (c) 2009 Tim Benniks
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the "Software"), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*
*  @author     Tim Benniks <tim@timbenniks.com>
*  @copyright  2009 timbenniks.com
*  @version    $Id: jquery.notice.js 1 2009-01-24 12:24:18Z timbenniks $
**/

(function(jQuery)
{
  var I18NDetail = WAPAMA.UI.I18NTranslate("Details");
  jQuery.extend({
    validationNoticeAdd: function(options)
    {
      var defaults =
      {
        inEffect:         {opacity: 'show'}, // in effect
        inEffectDuration: 600,               // in effect duration in miliseconds
        stayTime:         3000,              // time in miliseconds before the item has to disappear
        content:          '',                // content of the item
        stay:             false,             // should the notice item stay or not?
        type:             'notice'           // could also be error, success
      }

      var options, noticeWrapAll, noticeItemOuter, noticeItemInner, noticeItemClose;

      options         = jQuery.extend({}, defaults, options);
      noticeWrapAll   = (!jQuery('.validation-notice-wrap').length) ? jQuery('<div></div>').addClass('validation-notice-wrap').appendTo('body') : jQuery('.validation-notice-wrap');
      noticeItemOuter = jQuery('<div></div>').addClass('validation-notice-item-wrapper');
      noticeItemInner = jQuery('<div></div>').hide().addClass('validation-notice-item ' + options.type).appendTo(noticeWrapAll).html(options.content).animate(options.inEffect, options.inEffectDuration).wrap(noticeItemOuter);
      noticeItemClose = jQuery('<div></div>').addClass('validation-notice-item-close').prependTo(noticeItemInner).html('&nbsp;').click(function() { jQuery.validationNoticeRemove(noticeItemInner) });

      if(navigator.userAgent.match(/MSIE 6/i))
      {
          noticeWrapAll.css({top: document.documentElement.scrollTop});
      }

      if(!options.stay)
      {
        setTimeout(function()
        {
          jQuery.validationNoticeRemove(noticeItemInner);
        },
        options.stayTime);
      }
    },

    detailNoticeAdd: function(options)
    {
      var defaults =
      {
        inEffect:         {opacity: 'show'}, // in effect
        inEffectDuration: 600,               // in effect duration in miliseconds
        stayTime:         3000,              // time in miliseconds before the item has to disappear
        text:             '',                // content of the item
        stay:             false,             // should the notice item stay or not?
        type:             'notice',          // could also be error, success
        responseText:     '',                // content of HTTP response
        relatedShapeId:   null,              // uuid of notice related shape
        context:          null,              // context of callee
        detailErrors:     null               // detail error messages
      }
      var noticeWrapAll, noticeItemOuter, noticeItemInner, noticeItemClose, noticeInnerHtml;
      options         = jQuery.extend({}, defaults, options);
      noticeWrapAll   = (!top.jQuery('.notice-wrap').length) ? top.jQuery('<div></div>').addClass('notice-wrap').appendTo('body') : top.jQuery('.notice-wrap');
      noticeItemOuter = top.jQuery('<div></div>').addClass('notice-item-wrapper');
      var displayText = "";
      if (options.text) {
          displayText = WAPAMA.UI.I18NTranslate(options.text);
      }
      if (options.I18NText) {
          displayText = options.I18NText;
      }
      noticeInnerHtml = options.responseText != '' ? '<p>' + displayText + '</p>' + '<a class="detail-button" href="#" style="color:#EEE">' + I18NDetail +'</a>'
          : '<p>'+ displayText +'</p>';
      noticeItemInner = top.jQuery('<div></div>').hide().addClass('notice-item ' + options.type).appendTo(noticeWrapAll).html(jQuery(noticeInnerHtml).css('width', '90%')).animate(options.inEffect, options.inEffectDuration).wrap(noticeItemOuter);
      noticeItemClose = top.jQuery('<div></div>').addClass('notice-item-close').prependTo(noticeItemInner).html('&nbsp;').click(function() { jQuery.validationNoticeRemove(noticeItemInner) });
      !options.stay && noticeItemClose.hide().unbind();
      if (options.relatedShapeId && options.context) {
          //Add a icon, when clicked, select the related shape and show its record view
          jQuery('<div title="' + WAPAMA.UI.I18NTranslate("Quick look") + '"></div>').addClass('notice-item-show-error-shape').insertAfter(noticeItemClose).html('&nbsp;').click(
              function() {
                  WAPAMA.UI.doValidationAfterBindData = true;
                  var targetShape = WAPAMA.UI.getShapeByTargetRecordFromCanvas(options.relatedShapeId);
                  // want to show property pane
                  WAPAMA.UI.isPropertyPaneHidden = false;
                  if (targetShape) {
                      //Select the validation failed shape
                      options.context.facade.setSelection([targetShape]);
                      shape_type_uuid = targetShape.getStencil()._jsonStencil.shape_type_uuid;
                      //If record view is not shown, restore it.
                      if (jQuery('#restore').css('display') == 'block') {
                          jQuery('#restore').triggerHandler('click');
                      }
                      jQuery('#maximize').trigger('mouseout');
                      WAPAMA.UI.last_storage_key_for_load = "";
                      if (options.from == 'deploy') {
                        WAPAMA.UI.doValidationAfterBindData = false;
                        //Show record view of validation failed shape
                        if (options.relatedShapeId == top.$.Intalio.ClientState.get("property.shapeuuid") && 'designer' == top.$.Intalio.ClientState.get("focus")) {
                          // BUG-WAPAMA-000529 in case property pane is already there, just show the pane
                          top.$.Intalio.ClientState.set({ "focus": "property", "maximized": false});
                        } else {
                          //facade.setSelection can load property pane, so dont do it again
                          //WAPAMA.UI.showRecordView(targetShape.isNew, shape_type_uuid, options.relatedShapeId); 
                        }
                      } else {
                        var objectForm = WAPAMA.PANE.Property.obj.find(".io-section-form.object-form");
                        var uuidField = objectForm.find('#io_uuid');
                        var uuid = uuidField.text() || uuidField.val();
                        if (uuid == options.relatedShapeId) {
                          objectForm.recordform("validate_form_from_server", true);
                          WAPAMA.UI.doValidationAfterBindData = false;
                        } else {
                          //Show record view of validation failed shape
                          WAPAMA.UI.showRecordView(targetShape.isNew, shape_type_uuid, options.relatedShapeId); 
                        }
                      }
                  } else if (options.relatedShapeId == wapamaEditor.getJSON().targetRecord) {
                      options.context.facade.setSelection([]);
                      //Show record view of process/pipe
                      var focused = top.$.Intalio.ClientState.get("focus");
                      if (focused === 'designer') {
                          top.$.Intalio.UI.restoreContentPanes();
                      } else if (focused === 'property') {
                          top.$.Intalio.ClientState.set({
                              "focus": "designer",
                              "maximized": false
                          });
                      }
                      WAPAMA.UI.last_storage_key_for_load = "";
                      top.$('#io-breadcrumb').breadcrumb('setItemAttributes', profileUUID, { 'wapama-loaded' : false } );
                      jQuery('#restore').hide();
                      jQuery('#maximize').show();
                      //options.context._showTranPerspective(true);
                  }
                  return false;
              }
          );
          if (options.detailErrors) {
              var errorContainer = jQuery('<div class="error-message-container"></div>').html(options.detailErrors);
              jQuery('<div class="notice-item-details">' + WAPAMA.UI.I18NTranslate('Details...') + '</div>').appendTo(noticeItemInner).click(function(){
                  top.$.Intalio.UI.initializeDialog({
                    title: WAPAMA.UI.I18NTranslate('Details'),
                    dialogClass: "ui-dialog-details",
                    message: errorContainer,
                    width: 600,
                    height: 300      
                  });
              }); 
          }
      }

      if(navigator.userAgent.match(/MSIE 6/i))
      {
          noticeWrapAll.css({top: document.documentElement.scrollTop});
      }

      if(options.responseText != '')
      {
        top.jQuery('.detail-button').last().click(function(){
          var errWin=window.open('about:blank','_blank','menubar=no,toolbar=no,location=no,scrollbars=yes,resizable=yes,top=0,left=0,width='+
            (screen.availWidth-10)+',height='+(screen.availHeight-100));
          errWin.document.write('<h3>' + 'There was a problem processing your request:' + '</h3>' + options.responseText);
          return false;
        });
      }

      if(!options.stay)
      {
        setTimeout(function()
        {
          jQuery.validationNoticeRemove(noticeItemInner);
        },
        options.stayTime);
      }
    },

    validationNoticeRemove: function(obj)
    {
      obj.animate({opacity: '0'}, 600, function()
      {
        obj.parent().animate({height: '0px'}, 300, function()
        {
          obj.parent().remove();
        });
      });
    }
  });
})(jQuery);

/*
 * jQuery switchButton
 *
 * Copyright 2011, L.STEVENIN
 * Released under the MIT license.
 *
 * Depends:
 *  jquery.ui.widget.js
 */

(function($, scrollbar){

    $.widget('scrollbar.scrollbar', {

        options: {
            classes: '',        // Extra classes for css styling
            wheel: 30,          // Scroll offset on mousewheel
            scroll: true,       // Allow / disallow mouse scrolling
            overlay: true,      // Scrollbars are overlaid
            autohide: true,     // Scrollbars are automatically hidden
            animate: {          // Scroll wheel animation - set to false to disable
                duration: 300,
                easing: 'swing'
            }
        },

        _create: function() {
            this.isMouseDown = false;
            this.settings = {
                viewport: {},
                overview: {},
                scrollbarX: {
                    thumb: {},
                    track: {}
                },
                scrollbarY: {
                    thumb: {},
                    track: {}
                },
                move: {
                    axis: null,
                    mouse: {},
                    position: {}
                }
            }
            this._wrapInContainer();
            this.refresh();
            this._attachEvents();
        },

        /* Wrap element in container - creates elements */
        _wrapInContainer: function() {
            this._id = $[scrollbar].count++;
            this._overflowX = this.element.css("overflow-x");
            this._overflowY = this.element.css("overflow-y");
            this._scrollX = this._overflowX in { auto:1, scroll:1 } ? true : false;
            this._scrollY = this._overflowY in { auto:1, scroll:1 } ? true : false;
            this._outerHeight = this.element.outerHeight();
            this._outerWidth = this.element.outerWidth();

            this.$overview = this.element.addClass("ui-scrollbar-overview");
            this.$container = $("<div class='ui-scrollbar ui-scrollbar-default "+this.options.classes+"' id='scrollbar-"+this._id+"' />").toggleClass("ui-scrollbar-overlay", this.options.overlay);
            this.$viewport = $("<div class='ui-scrollbar-viewport' />");
            this.$scrollbarX = $("<div class='ui-scrollbar-scrollbarX'><div class='ui-scrollbar-track'><div class='ui-scrollbar-thumb'></div></div></div>");
            this.$scrollbarY = $("<div class='ui-scrollbar-scrollbarY'><div class='ui-scrollbar-track'><div class='ui-scrollbar-thumb'></div></div></div>");

            this.$overview.after(this.$container);
            this.$overview.remove();
            this.$container.append(this.$viewport);
            this.$viewport.append(this.$overview);
            if(this._scrollY) { this.$container.append(this.$scrollbarY); }
            if(this._scrollX) { this.$container.append(this.$scrollbarX); }
            this._trackXWidth = this.$scrollbarX.find(".ui-scrollbar-track").width();
            this._trackYHeight = this.$scrollbarY.find(".ui-scrollbar-track").height();
            this._thumbXWidth = this.$scrollbarX.find(".ui-scrollbar-thumb").width();
            this._thumbYHeight = this.$scrollbarY.find(".ui-scrollbar-thumb").height();

        },

        _setSize: function() {

            if(this._scrollY) {
                this.$overview.css("top", -this.settings.scrollbarY.pos);
                this.$scrollbarY.css("height", this.settings.scrollbarY.track.height);
                this.$scrollbarY.find(".ui-scrollbar-track").css("height", this.settings.scrollbarY.track.height);
                this.$scrollbarY.find(".ui-scrollbar-thumb").css({
                    "top": this.settings.scrollbarY.pos / this.settings.scrollbarY.ratio,
                    "height": this.settings.scrollbarY.thumb.height
                });
            }

            if(this._scrollX) {
                this.$overview.css("left", -this.settings.scrollbarX.pos);
                this.$scrollbarX.css("width", this.settings.scrollbarX.track.width);
                this.$scrollbarX.find(".ui-scrollbar-track").css("width", this.settings.scrollbarX.track.width);
                this.$scrollbarX.find(".ui-scrollbar-thumb").css({
                    "left": this.settings.scrollbarX.pos / this.settings.scrollbarX.ratio,
                    "width": this.settings.scrollbarX.thumb.width
                });
            }

        },

        _attachEvents: function() {

            if(this._scrollY) {
                this.$scrollbarY.find(".ui-scrollbar-thumb").bind("mousedown", { axis: "y", obj: this }, this._onStart);
                this.$scrollbarY.find(".ui-scrollbar-track").bind("mouseup", { axis: "y", obj: this }, this._onEnd);
                if(this.options.scroll) {
                    this.$container.bind("DOMMouseScroll mousewheel", { axis: "y", obj: this }, this._onWheel);
                }
            }

            if(this._scrollX) {
                this.$scrollbarX.find(".ui-scrollbar-thumb").bind("mousedown", { axis: "x", obj: this }, this._onStart);
                this.$scrollbarX.find(".ui-scrollbar-track").bind("mouseup", { axis: "x", obj: this }, this._onEnd);
                if(this.options.scroll) {
                    this.$container.bind("DOMMouseScroll mousewheel", { axis: "x", obj: this }, this._onWheel);
                }
            }

        },

        _onStart: function(event) {
            this.isMouseDown = true;
            var obj = event.data.obj;
            obj.settings.move.axis = event.data.axis;

            if(obj.settings.move.axis == "y") {
                obj.settings.move.mouse.start = event.pageY;
                var thumbTop = parseInt(obj.$scrollbarY.find(".ui-scrollbar-thumb").css("top"));
                obj.settings.move.position.start = thumbTop == "auto" ? 0 : thumbTop;
                $(document).bind("mousemove touchmove", { axis: "y", obj: obj }, obj._onDrag);
                $(document).bind("mouseup touchend", { axis: "y", obj: obj }, obj._onEnd);
                obj.$scrollbarY.find(".ui-scrollbar-thumb").bind("mouseup touchend", { axis: "y", obj: obj }, obj._onEnd);
            }

            if(obj.settings.move.axis == "x") {
                obj.settings.move.mouse.start = event.pageX;
                var thumbLeft = parseInt(obj.$scrollbarX.find(".ui-scrollbar-thumb").css("left"));
                obj.settings.move.position.start = thumbLeft == "auto" ? 0 : thumbLeft;
                $(document).bind("mousemove touchmove", { axis: "x", obj: obj }, obj._onDrag);
                $(document).bind("mouseup touchend", { axis: "x", obj: obj }, obj._onEnd);
                obj.$scrollbarX.find(".ui-scrollbar-thumb").bind("mouseup touchend", { axis: "x", obj: obj }, obj._onEnd);
            }

            return false;
        },

        _onEnd: function(event) {

            var obj = event.data.obj;

            if(obj.settings.move.axis == "y") {
                $(document).unbind('mousemove touchmove', obj._onDrag);
                $(document).unbind('mouseup touchend', obj._onEnd);
                obj.$scrollbarY.find(".ui-scrollbar-thumb").unbind('mouseup touchend', obj._onEnd);
            }

            if(obj.settings.move.axis == "x") {
                $(document).unbind('mousemove touchmove', obj._onDrag);
                $(document).unbind('mouseup touchend', obj._onEnd);
                obj.$scrollbarX.find(".ui-scrollbar-thumb").unbind('mouseup touchend', obj._onEnd);
            }

            return false;

        },

        _onDrag: function(event) {

            var obj = event.data.obj;
            if(!obj.settings.move.axis)
                obj.settings.move.axis = event.data.axis;

            if(obj.settings.move.axis == "y") {
                if(!(obj.settings.overview.ratioY >= 1)) {
                    obj.settings.move.position.current = Math.min(
                        obj.settings.scrollbarY.track.height - obj.settings.scrollbarY.thumb.height,
                        Math.max(0, (obj.settings.move.position.start + (event.pageY - obj.settings.move.mouse.start)))
                    );
                    obj.settings.scrollbarY.pos = obj.settings.move.position.current * obj.settings.scrollbarY.ratio;
                    obj.$overview.css("top", -obj.settings.scrollbarY.pos);
                    obj.$scrollbarY.find(".ui-scrollbar-thumb").css("top", obj.settings.move.position.current);
                }
            }

            if(obj.settings.move.axis == "x") {
                if(!(obj.settings.overview.ratioX >= 1)) {
                    obj.settings.move.position.current = Math.min(
                        obj.settings.scrollbarX.track.width - obj.settings.scrollbarX.thumb.width,
                        Math.max(0, (obj.settings.move.position.start + (event.pageX - obj.settings.move.mouse.start)))
                    );
                    obj.settings.scrollbarX.pos = obj.settings.move.position.current * obj.settings.scrollbarX.ratio;
                    obj.$overview.css("left", -obj.settings.scrollbarX.pos);
                    obj.$scrollbarX.find(".ui-scrollbar-thumb").css("left", obj.settings.move.position.current);
                }
            }

            return false;
        },

        _onWheel: function(event) {

            var obj = event.data.obj;
            if(event.originalEvent.wheelDeltaX)
                obj.settings.move.axis = 'x';
            else if(event.originalEvent.wheelDeltaY)
                obj.settings.move.axis = 'y';
            else if(!obj.settings.move.axis)
                obj.settings.move.axis = event.data.axis;

            if(obj.settings.move.axis == "y") {
                if(!(obj.settings.overview.ratioY >= 1)) {
                    event = $.event.fix(event || window.event);
                    var delta = event.wheelDelta ? event.wheelDelta/120 : -event.detail/3;
                    obj.settings.scrollbarY.pos -= delta * obj.options.wheel;
                    obj.settings.scrollbarY.pos = Math.min(
                        obj.settings.overview.height - obj.settings.viewport.height,
                        Math.max(0, obj.settings.scrollbarY.pos)
                    );

                    if(obj.options.animate) {
                        obj.$scrollbarY.find(".ui-scrollbar-thumb").stop().animate({ "top": obj.settings.scrollbarY.pos / obj.settings.scrollbarY.ratio }, obj.options.animate.duration, obj.options.animate.easing);
                        obj.$overview.stop().animate({ "top": -obj.settings.scrollbarY.pos }, obj.options.animate.duration, obj.options.animate.easing);
                    }
                    else {
                        obj.$scrollbarY.find(".ui-scrollbar-thumb").css("top", obj.settings.scrollbarY.pos / obj.settings.scrollbarY.ratio);
                        obj.$overview.css("top", -obj.settings.scrollbarY.pos);
                    }
                    if(obj.settings.scrollbarY.pos > 0 && obj.settings.scrollbarY.pos < (obj.settings.overview.height - obj.settings.viewport.height))
                        event.preventDefault();
                }
            }

            if(obj.settings.move.axis == "x") {
                if(!(obj.settings.overview.ratioX >= 1)) {
                    event = $.event.fix(event || window.event);
                    var delta = event.wheelDelta ? event.wheelDelta/120 : -event.detail/3;
                    obj.settings.scrollbarX.pos -= delta * obj.options.wheel;
                    obj.settings.scrollbarX.pos = Math.min(
                        obj.settings.overview.width - obj.settings.viewport.width,
                        Math.max(0, obj.settings.scrollbarX.pos)
                    );
                    if(obj.options.animate) {
                        obj.$scrollbarX.find(".ui-scrollbar-thumb").stop().animate({ "left": obj.settings.scrollbarX.pos / obj.settings.scrollbarX.ratio }, obj.options.animate.duration, obj.options.animate.easing);
                        obj.$overview.stop().animate({ "left": -obj.settings.scrollbarX.pos }, obj.options.animate.duration, obj.options.animate.easing);
                    }
                    else {
                        obj.$scrollbarX.find(".ui-scrollbar-thumb").css("left", obj.settings.scrollbarX.pos / obj.settings.scrollbarX.ratio);
                        obj.$overview.css("left", -obj.settings.scrollbarX.pos);
                    }
                    if(obj.settings.scrollbarX.pos > 0 && obj.settings.scrollbarX.pos < (obj.settings.overview.width - obj.settings.viewport.width))
                        event.preventDefault();
                }
            }
        },

        _scrollTo: function(y, x) {

            y = y || typeof y == "number" ? y : null;
            x = x || typeof x == "number" ? x : null;

            if(y || y === 0) {
                var posY = Math.min(
                    this.settings.scrollbarY.track.height - this.settings.scrollbarY.thumb.height,
                    Math.max(0, y / this.settings.scrollbarY.ratio)
                );
                this.settings.scrollbarY.pos = posY * this.settings.scrollbarY.ratio;
                this.$overview.css("top", -this.settings.scrollbarY.pos);
                this.$scrollbarY.find(".ui-scrollbar-thumb").css("top", posY);
            }

            if(x || x === 0) {
                var posX = Math.min(
                    this.settings.scrollbarX.track.width - this.settings.scrollbarX.thumb.width,
                    Math.max(0, x / this.settings.scrollbarX.ratio)
                );
                this.settings.scrollbarX.pos = posX * this.settings.scrollbarX.ratio;
                this.$overview.css("left", -this.settings.scrollbarX.pos);
                this.$scrollbarX.find(".ui-scrollbar-thumb").css("left", posX);
            }

        },

        /* PUBLIC METHODS */

        /**
         * Refresh state, call this on content change
         *
         * refresh()
         *   -> Only refresh
         *
         * refresh(offsetX[, offsetY])
         *   -> Refresh and scroll to [x,y] coordinates
         *
         * refresh(selector)
         *   -> Refresh and scroll to selector first element position
         *
         * refresh(jQuery object)
         *   -> Refresh and scroll to jQuery object position
         */
        refresh: function(scrollToX, scrollToY) {

            this.$container.width(this._outerWidth);
            this.$container.height(this._outerHeight);
            this.$viewport.width(this.options.overlay ? this._outerWidth : this._outerWidth - this.$scrollbarY.outerWidth());
            this.$viewport.height(this.options.overlay ? this._outerHeight : this._outerHeight - this.$scrollbarX.outerHeight());

            if(this._scrollY) {
                this.$overview.css({ height: 'auto' });
                this.settings.viewport.height = this.$viewport.outerHeight();
                this.settings.overview.height = this.$overview.outerHeight();
                if(this._scrollX) {
                    this.$overview.css({ width: 'auto' });
                    this.settings.viewport.width = this.$viewport.outerWidth();
                    this.settings.overview.width = this.$overview.outerWidth();
                    this.settings.overview.ratioX = this.settings.viewport.width / this.settings.overview.width;
                }
                this.settings.overview.ratioY = this.settings.viewport.height / this.settings.overview.height;
                this.settings.scrollbarY.offsetHeight = this.$scrollbarY.outerHeight() - this.$scrollbarY.height();
                this.settings.scrollbarY.track.height = this._trackYHeight == 0 ?
                    this.settings.viewport.height - this.settings.scrollbarY.offsetHeight - (this._scrollX && this.options.overlay && this.settings.overview.ratioX < 1 ? this.$scrollbarX.outerHeight() : 0) :
                    this.$scrollbarY.find(".ui-scrollbar-track").height();
                this.settings.scrollbarY.thumb.height = this._thumbYHeight == 0 ?
                    Math.min(this.settings.scrollbarY.track.height, Math.max(0, (this.settings.scrollbarY.track.height * this.settings.overview.ratioY))) :
                    this.$scrollbarY.find(".ui-scrollbar-thumb").height();
                this.settings.scrollbarY.ratio = (this.settings.overview.height - this._trackYHeight) / this.settings.scrollbarY.track.height;

                this.settings.scrollbarY.pos = 0;

                this.$scrollbarY.toggleClass("disabled ui-scrollbar-disabled", this.settings.overview.ratioY >= 1);
            }

            if(this._scrollX) {
                this.$overview.css({ width: 'auto' });
                this.settings.viewport.width = this.$viewport.outerWidth();
                this.settings.overview.width = this.$overview.outerWidth();
                if(this._scrollY && !this.settings.overview.ratioY) {
                    this.$overview.css({ height: 'auto' });
                    this.settings.viewport.height = this.$viewport.outerHeight();
                    this.settings.overview.height = this.$overview.outerHeight();
                    this.settings.overview.ratioY = this.settings.viewport.height / this.settings.overview.height;
                }
                this.settings.overview.ratioX = this.settings.viewport.width / this.settings.overview.width;
                this.settings.scrollbarX.offsetWidth = this.$scrollbarX.outerWidth() - this.$scrollbarX.width();
                this.settings.scrollbarX.track.width = this._trackXWidth == 0 ?
                    this.settings.viewport.width - this.settings.scrollbarX.offsetWidth - (this._scrollY && this.options.overlay && this.settings.overview.ratioY < 1 ? this.$scrollbarY.outerWidth() : 0) :
                    this.$scrollbarX.find(".ui-scrollbar-track").width();
                this.settings.scrollbarX.thumb.width = this._thumbXWidth == 0 ?
                    Math.min(this.settings.scrollbarX.track.width, Math.max(0, (this.settings.scrollbarX.track.width * this.settings.overview.ratioX))) :
                    this.$scrollbarX.find(".ui-scrollbar-thumb").width();
                this.settings.scrollbarX.ratio = (this.settings.overview.width - this._trackXWidth) / this.settings.scrollbarX.track.width;
                this.settings.scrollbarX.pos = 0;

                this.$scrollbarX.toggleClass("disabled ui-scrollbar-disabled", this.settings.overview.ratioX >= 1);
            }

            this._setSize();

            if(this.options.autohide) {
                this.$container.unbind('mouseenter touchstart mouseleave touchend');
                if(this._scrollY && !this.$scrollbarY.hasClass("ui-scrollbar-disabled")) {
                    this.$scrollbarY.hide();
                    var $scrollbarY = this.$scrollbarY;
                    this.$container
                        .bind('mouseenter touchstart', function(){ $scrollbarY.stop(true, true).fadeIn(400); })
                        .bind('mouseleave touchend', function(){ $scrollbarY.stop(true, true).delay(500).fadeOut(600); });
                }
                if(this._scrollX && !this.$scrollbarX.hasClass("ui-scrollbar-disabled")) {
                    this.$scrollbarX.hide();
                    var $scrollbarX = this.$scrollbarX;
                    this.$container.hover(
                        function(){ $scrollbarX.stop(true, true).fadeIn(400); },
                        function(){ $scrollbarX.stop(true, true).delay(500).fadeOut(600); }
                    );
                }
            }

            if((scrollToY || typeof scrollToY == "number") || (scrollToX || typeof scrollToX == "number"))
                this.scrollTo(scrollToY, scrollToX);

        },

        /**
         * Scroll to coordinates or element
         *
         * scrollTo(offsetX[, offsetY])
         *   -> Scroll to [x,y] coordinates
         *
         * scrollTo(selector)
         *   -> Scroll to selector first element position
         *
         * scrollTo(jQuery object)
         *   -> Scroll to jQuery object position
         */
        scrollTo: function(to, x) {

            switch(typeof to) {
                case "number":
                    this._scrollTo(to, x);
                    break;
                case "string":
                    var $elem = this.$overview.find(to);
                    if(!$elem.length)
                        return false;
                    var pos = $elem.first().position();
                    this._scrollTo(pos.top, pos.left);
                    break;
                case "object":
                    var $elem = this.$overview.find(to[0]);
                    if(!$elem.length)
                        return false;
                    var pos = $elem.first().position();
                    this._scrollTo(pos.top, pos.left);
                    break;
            }
        }
    });

    $[scrollbar].count = 0;

})(jQuery, 'scrollbar');


(function($){
/**
 * Widget: designerEventsHelper. 
 * Use this widget to listen animation event and resize event of diagram designer.
 */
$.widget("io.designerEventsHelper", {
    options: {
        "canvasScoll": {},
        "paletteScoll": {}
    },
    /**
     * Listen "maximized" path of state object, this event will be triggered before "" path listener.
     * 
     * @param oState    old value
     * @param nState    new value
     */
    _listenDesignerPaneAnimation: function(oState, nState) {
        var clientState = top.$.Intalio.ClientState;
        var designerType = clientState.get("designer.type");
        var focused = clientState.get("focus");
        // BUG-WAPAMA-000528 want to show property pane for dblclick.
        if (nState && focused == 'designer') {
          WAPAMA.UI.isPropertyPaneHidden = true;
        }
        if (designerType == 'designer' && /^property|designer$/.test(focused)) {
            if (!nState) {
                $j('#restore').hide();
                $j('#maximize').show();
            } else {
                $j('#maximize').hide();
                $j('#restore').show();
            }
            // BUG-WAPAMA-000522
            // shift canvas automatically to make newly dropped shape visible in top half of the canvas
            if (!nState && wapamaEditor.selection.length == 1) {
              var shape = wapamaEditor.selection[0];
              if (shape && shape.targetRecord) {
                var oldScrollTop = $j("#canvas").scrollTop();
                var canvasHeight = $j("#canvas").height() / 2; // get half height since canvas is under maximized state
                var shapePos = shape.bounds.b;
                if (shapePos.y - oldScrollTop > canvasHeight) {
                  $j("#canvas").scrollTop(Math.round(shapePos.y - canvasHeight / 2 + 50));
                }
              }
            }
        }
        if (WAPAMA.UI.isFirefox()) {
            var self = this;
            window.setTimeout(function() {
                self.listenDesignerPaneResize();
            }, 10)
        }
    },
    /**
     * Listen resize event of designer pane to set back scroll top of canvas and palette on Firefox.
     */
    listenDesignerPaneResize: function() {
        $j("#canvas").scrollTop(this.options.canvasScoll.top);
        $j("#canvas").scrollLeft(this.options.canvasScoll.left);
        $j("#shape-repository").scrollTop(this.options.paletteScoll.top);
        
    },
    _create: function() {
        alert("_create");
        // Bind Widget context to two listeners
        this._listenDesignerPaneAnimation = $.proxy(this._listenDesignerPaneAnimation, this);
        
        top.$.Intalio.ClientState.registerListener("maximized", this._listenDesignerPaneAnimation);
        
        $j(window).unload($.proxy(this.destroy, this));
        
        if (WAPAMA.UI.isFirefox()) {
            this.listenDesignerPaneResize = $.proxy(this.listenDesignerPaneResize, this);
            top.$j("#designer-pane").resize(this.listenDesignerPaneResize);
            
            var options = this.options;
            $j("#canvas").scroll(function(event) {
                options.canvasScoll = {
                        "top": $j(this).scrollTop(),
                        "left": $j(this).scrollLeft()
                }
            })
            $j("#shape-repository").scroll(function(event) {
                options.paletteScoll = {
                        "top": $j(this).scrollTop(),
                        "left": $j(this).scrollLeft()
                }
            })
        }
    },
    destroy: function() {
        top.$.Intalio.ClientState.unregisterListener("maximized", this._listenDesignerPaneAnimation);
        top.$j("#designer-pane").unbind("resize", this.listenDesignerPaneResize);
    }
  });
})(jQuery);