/**
 * Copyright (c) 2006
 * Martin Czuchra, Nicolas Peters, Daniel Polak, Willi Tscheschner
 * Copyright (c) 2009-2011 Intalio, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 **/


if(!WAPAMA.Plugins) {
  WAPAMA.Plugins = new Object();
}

if (!WAPAMA.FieldEditors) {
  WAPAMA.FieldEditors = {};
}

if (!WAPAMA.LabelProviders) {
    WAPAMA.LabelProviders = {};
}

inToggelGroup = false;

WAPAMA.Plugins.PropertyWindow = {

  facade: undefined,

  construct: function(facade) {
    // Reference to the Editor-Interface
    this.facade = facade;
    this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_SHOW_PROPERTYWINDOW, this.init.bind(this));
    this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_LOADED, this.selectDiagram.bind(this));
        //Amit commented
//    this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_DBLCLICK, this.showPropertyPane.bind(this));
    this.init();
  },
  
  init: function(){
    // The parent div-node of the grid
    this.node = WAPAMA.Editor.graft("http://www.w3.org/1999/xhtml",
      null,
      ['div']);
    // If the current property in focus is of type 'Date', the date format
    // is stored here.
    this.currentDateFormat;

    // the properties array
    this.popularProperties = [];
    this.properties = [];
    
    /* The currently selected shapes whos properties will shown */
    this.shapeSelection = new Hash();
    this.shapeSelection.shapes = new Array();
    this.shapeSelection.commonProperties = new Array();
    this.shapeSelection.commonPropertiesValues = new Hash();
    this.updaterFlag = false;
      if (WAPAMA.HOOK) {
          WAPAMA.HOOK.onRecordViewReady = this.onRecordViewReady;
          WAPAMA.HOOK.onShapeNameChanged = this.onShapeNameChanged.bind(this);
          WAPAMA.HOOK.toggleSaveButton = this.toggleSaveButton.bind(this);
          WAPAMA.HOOK.changeShapeAppearance = this.changeShapeAppearance.bind(this);
          var wapama = top.$('#wapama');
          // initialize wapama hook
          var intervalExecuteTimes = 0; 
          //when you open wapama directly by url, sometimes wapamaHook widget does not ready, need to wait
          var initializeWapamaHook = window.setInterval(function() {
            if(wapama){
              if (wapama.wapamaHook) {
                wapama.wapamaHook();
                clearInterval(initializeWapamaHook);
              } else if (++intervalExecuteTimes === 6) {
                clearInterval(initializeWapamaHook);
              }
            }
          }, 500);
      }
  },
  
  changeShapeAppearance: function(options) {
    if (!options.shapeUUID) return;
    var recordShapeUUID = options.shapeUUID;
    var canvas = this.facade.getCanvas();
    var selectedShape;
    // If page is refreshed, there are selected shapes in diagram.
    if (WAPAMA.HOOK.selectShapes) {
      selectedShape = WAPAMA.HOOK.selectShapes.first();
    }
    // !selectedShape happens when the browser is refreshed with an existing business process.
    if (!selectedShape || (selectedShape.targetRecord !== recordShapeUUID)) {
        selectedShape = canvas.getShapeByTargetRecord(canvas.getChildShapes(), recordShapeUUID);
    }
    if (!selectedShape) {
      return;
    }
    var shapeid = selectedShape.id;
    var refid = options.refid || "none";

    WAPAMA.UI.updateReferToView(shapeid, options.refid || "none", selectedShape.getStencil().type(), options.prop);
  },
  
  // Select the Canvas when the editor is ready
  selectDiagram: function() {
    this.shapeSelection.shapes = [this.facade.getCanvas()];

    //this.setPropertyWindowTitle();
    //this.identifyCommonProperties();
    //this.createProperties();
  },

  showPropertyPane: function() {          
     var oldState = top.$.Intalio.ClientState.get();
     var newState = {};
     newState.property = oldState.property;
     newState.property.hidden = false;
     newState.maximized = false;
     newState.focus = 'property';     
     top.$.Intalio.ClientState.set(newState);
     WAPAMA.UI.isPropertyPaneHidden = false;
  },

  grantPropertyClickFun:  function(){
    //'li' or '#shape-repository' prefix in jquery selector is to avoid invoke prototype Element.getClassName under ie9,
    //Element.getClassName can't work under ie9 if Element is an SVG Element.
    //$j("#shape-repository .wapama-shape-types:not(:first)").hide();
    /*
    $("li.shape-repository-category").click(function() {
        $(this).next().fadeToggle('fast');
    });            
    */
    $j('#hide-property-pane').click(function() {           
        $j('#shape-property').hide();
        $j('#show-shape-property').show();
        reSetDiagramHeight();
    });
    $j('#show-property-pane').click(function() {
        $j('#show-shape-property').hide();
        $j('#shape-property').show();
        reSetDiagramHeight();
    });
  },

  /**
   * Changes the title of the property window panel according to the selected shapes.
   */
  setPropertyWindowTitle: function() {
    var shapePropertyHeader = $j("span.titleMetadata");
    shapePropertyHeader.text('');
    var propertyHeaderText = "";
    if(this.shapeSelection.shapes.length == 1) {
        // add the name of the stencil of the selected shape to the title
        propertyHeaderText = this.shapeSelection.shapes.first().getStencil().title();
    } else {
        propertyHeaderText = this.shapeSelection.shapes.length + ' ' + WAPAMA.I18N.PropertyWindow.selected;
    }
    //shapePropertyHeader.attr('title', 'Hide Shape Property');
    //pane.append("<input datatype='string' real_datatype='String' type='text' class='text io-input-text' />");
    shapePropertyHeader.text(propertyHeaderText);
    
  },

  setPropertyWindowTable: function(props, type) {
      //Updated by satish for adding properties to the panel
      var propPannel = $j(".profile-user-info");
      propPannel.empty();
      var name = "";
      addLoading($j('#accordion'));
      $j.each(props, function(key, val){
        if($j.inArray(key,WAPAMA.CONFIG.PROPERTIES) >=0){
          name = key.substr(0,1).toUpperCase() + key.substr(1);
          if (key != "bgcolor")
              propPannel.append('<div class="profile-info-row"><div class="profile-info-name"> '+name+' </div><div key="'+key+'" class="profile-info-value editable editable-click"><span key="'+key+'">'+val+'</span></div></div>');
          else if (key == "bgcolor")
              propPannel.append('<div class="profile-info-row"><div class="profile-info-name"> '+name+' </div><div key="'+key+'" class="profile-info-value controlset"><input id="shape-color" type="text" name="shape-color" value="'+val+'" /></div></div>');
        }
      });
      removeLoading();
  },

  /**
   * Sets this.shapeSelection.commonPropertiesValues.
   * If the value for a common property is not equal for each shape the value
   * is left empty in the property window.
   */
  setCommonPropertiesValues: function() {
    this.shapeSelection.commonPropertiesValues = new Hash();
    this.shapeSelection.commonProperties.each(function(property){
      var key = property.prefix() + "-" + property.id();
      var emptyValue = false;
      var firstShape = this.shapeSelection.shapes.first();
      
      this.shapeSelection.shapes.each(function(shape){
        if(firstShape.properties[key] != shape.properties[key]) {
          emptyValue = true;
        }
      }.bind(this));
      
      /* Set property value */
      if(!emptyValue) {
        this.shapeSelection.commonPropertiesValues[key]
          = firstShape.properties[key];
      }
    }.bind(this));
  },

  /**
   * Identifies the common Properties of the selected shapes.
   */
  identifyCommonProperties: function() {
    this.shapeSelection.commonProperties.clear();
    
    /* 
     * A common property is a property, that is part of 
     * the stencil definition of the first and all other stencils.
     */
    var stencils = this.getStencilSetOfSelection();
    var firstStencil = stencils.values().first();
    var comparingStencils = stencils.values().without(firstStencil);
    
    
    if(comparingStencils.length == 0) {
      this.shapeSelection.commonProperties = firstStencil.properties();
    } else {
      var properties = new Hash();
      
      /* put all properties of on stencil in a Hash */
      firstStencil.properties().each(function(property){
        properties[property.namespace() + '-' + property.id() 
              + '-' + property.type()] = property;
      });
      
      /* Calculate intersection of properties. */
      
      comparingStencils.each(function(stencil){
        var intersection = new Hash();
        stencil.properties().each(function(property){
          if(properties[property.namespace() + '-' + property.id()
                  + '-' + property.type()]){
            intersection[property.namespace() + '-' + property.id()
                    + '-' + property.type()] = property;
          }
        });
        properties = intersection;  
      });
      
      this.shapeSelection.commonProperties = properties.values();
    }
  },

  /**
   * Returns the set of stencils used by the passed shapes.
   */
  getStencilSetOfSelection: function() {
    var stencils = new Hash();
    
    this.shapeSelection.shapes.each(function(shape) {
      stencils[shape.getStencil().id()] = shape.getStencil();
    })
    return stencils;
  },
    
    /**
     *Update the last Edited Shape by the JSObject of RecordView
     */
    updateDiagramJSON: function() {
        if (top.$._dataMapperManager) {
            top.$._dataMapperManager.save();
        }
        if (top.$._parameterEditorManager) {
          top.$._parameterEditorManager.save();
        }
        if (top.$._data_structure_editor) {
            top.$._data_structure_editor.save();
        }
        
        if (top.$._complexTypeEditorManager) {
            top.$._complexTypeEditorManager.save();
        }
        
        var recordShapeUUID = WAPAMA.PANE.Property.obj.find(".io-section-form.object-form").attr("wapama_shape_uuid");//TODO Comment is to be removed. var recordShapeUUID = top.$('#record-view').find(".io-section-form.object-form").attr("wapama_shape_uuid")
        if (!recordShapeUUID) {
            return;
        }
        try {
            this.updateUserInputs(recordShapeUUID);
        } catch(e) {
            WAPAMA.Log.warn("Update data import json failed.", e);
        }
        
        var jsObject = WAPAMA.UI.getCurrentFormJSON();
        var selectedShape = this.shapeSelection.shapes[0];
        var shape;
        
        if (selectedShape.targetRecord == recordShapeUUID) {
            shape = selectedShape;
        } else {
            shape = WAPAMA.UI.getShapeByTargetRecordFromCanvas(recordShapeUUID);
        }
        
        if (shape) {
            for (var entry in jsObject) {
                var key = entry;
                var value = jsObject[entry];
                shape.setProperty(key, value);
            }
            shape.refresh();
        }
        /*
        var lastEditShape = this.shapeSelection.shapes[0];
    var shapeType = lastEditShape.getStencil()._jsonStencil.id
      .replace(lastEditShape.getStencil()._namespace,'');
    var recordViewShapeType = WAPAMA.UI.getShapeTypeFromCurrentPropertyPane();
        // udpate the Diagram JSON
    if (recordViewShapeType == shapeType) {
            // update each properties from current plain JSON
          for (var entry in jsObject) {
              var key = entry;
              var value = jsObject[entry];
              lastEditShape.setProperty(key, value);
          }
    }*/
    },
    
    updateUserInputs: function(recordShapeUUID) {
        if (WAPAMA.PANE.Property.obj.find('.io-scroll-view').find(".userInputClickMark").length < 1) {//TODO Comment is to be removed. if (top.$('#io-record-view-scroll-view').find(".userInputClickMark").length < 1) {
            return;
        }
        this.facade.updateUserInputs(recordShapeUUID);
    },

    onSelectionChanged: function(event) {
        //WAPAMA.UI.serializePipeMultipleHeaders();
        // udpate the Diagram JSON
        //this.updateDiagramJSON();
        //this.grid.stopEditing();
        if (WAPAMA.HOOK) {
            WAPAMA.HOOK.selectShapes = event.elements;
        }
        // Selected shapes
        this.shapeSelection.shapes = event.elements;
        // Case: nothing selected
        if(event.elements.length == 0) {
            this.shapeSelection.shapes = [this.facade.getCanvas()];
        }
        // subselection available
        if(event.subSelection){
            this.shapeSelection.shapes = [event.subSelection];
        }
        try{
          if(this.shapeSelection.shapes.first().getStencil().title() != "BPMN-Diagram"){
            $j(".metadataPanel , .commentsPanel , .attachmentsPanel").removeClass('hide');
            var propstencilType = this.shapeSelection.shapes[0].getStencil().type();
            this.setPropertyWindowTitle();
            this.setPropertyWindowTable(this.shapeSelection.shapes[0].properties, propstencilType);
            this.grantPropertyClickFun();
            WAPAMA.CONFIG.SHAPE_ID = this.shapeSelection.shapes[0].id;
              // send the request for Record View of selected shape
              //this.showShapeRecordView();   
              //WAPAMA.UI.hideTooltips();
              //Added by satish to check the permission for editing of properties
              
                var editableShape = this;
                $j('#shape-color').colorPicker({showHexField: false});
                if(WAPAMA.CONFIG.PERMISSION_TYPE <= 2)
                    $j('#shape-color').attr("disabled",true);
                if(WAPAMA.CONFIG.PERMISSION_TYPE > 2){
                $j('#shape-color').change(function(){
                    var colorCode = $j('#shape-color').val();
                    var editableShapeProperties = editableShape.shapeSelection.shapes[0].properties;
                    var selectedElements = editableShape.shapeSelection.shapes;
                    var oldValue = editableShapeProperties[key]; 
                    var facade = editableShape.facade;
                      // Implement the specific command for property change
                      var commandClass = WAPAMA.Core.Command.extend({
                        construct: function(){
                          this.key    = 'bgcolor';
                          this.selectedElements = selectedElements;
                          this.oldValues = oldValue;
                          this.newValue  = colorCode;
                          this.facade   = facade;
                        },      
                        execute: function(){
                          this.selectedElements.each(function(shape){
                              var tmpProps = shape.properties;
                              if(tmpProps.hasOwnProperty('bgcolor')){
                                shape.setProperty(this.key, this.newValue);  
                              }
                              
                          }.bind(this));
                          
                          this.facade.setSelection(this.selectedElements);
                          this.facade.getCanvas().update();
                          this.facade.updateSelection();

                        },
                        rollback: function(){
                          this.selectedElements.each(function(shape){
                            var tmpProps = shape.properties;
                              if(tmpProps.hasOwnProperty('bgcolor')){
                                  shape.setProperty(this.key, this.oldValues[shape.getId()]);
                               }
                          }.bind(this));

                          this.facade.setSelection(this.selectedElements);
                          this.facade.getCanvas().update();
                          this.facade.updateSelection();
                        }
                      })    
                      // Instanciated the class
                      var command = new commandClass();
                      
                      // Execute the command
                      editableShape.facade.executeCommands([command]);
                });
                $j('.editable').editable({
                  mode:'inline',
                  type: 'text',
                  emptytext:'Click to enter',
                  success:function(response, newValue){
                      var key = $j(this).find('span').attr('key');
                      var editableShapeProperties = editableShape.shapeSelection.shapes[0].properties;
                      var selectedElements = editableShape.shapeSelection.shapes;
                      var oldValue = editableShapeProperties[key]; 
                      var facade = editableShape.facade;
                      // Implement the specific command for property change
                      var commandClass = WAPAMA.Core.Command.extend({
                        construct: function(){
                          this.key    = key;
                          this.selectedElements = selectedElements;
                          this.oldValues = oldValue;
                          this.newValue  = newValue;
                          this.facade   = facade;
                        },      
                        execute: function(){
                          this.selectedElements.each(function(shape){
                              shape.setProperty(this.key, this.newValue);
                          }.bind(this));
                          
                          this.facade.setSelection(this.selectedElements);
                          this.facade.getCanvas().update();
                          this.facade.updateSelection();

                        },
                        rollback: function(){
                          this.selectedElements.each(function(shape){
                            shape.setProperty(this.key, this.oldValues[shape.getId()]);
                          }.bind(this));

                          this.facade.setSelection(this.selectedElements);
                          this.facade.getCanvas().update();
                          this.facade.updateSelection();
                        }
                      })    
                      // Instanciated the class
                      var command = new commandClass();
                      
                      // Execute the command
                      editableShape.facade.executeCommands([command]);
                  }
                });
              }
            getComments();
            $j('#modellerAttachments').empty();
            $j('#modellerAttachments').html('');
            $j(".attachmentsMsg").removeClass('text-danger').addClass('hide');
			$j(".attachmentsMsg").text('');
            setTimeout(function(){
              getAttachments();
            }, 100);
            
          } else {
            $j(".metadataPanel , .commentsPanel , .attachmentsPanel").addClass('hide');
          }
        } catch(e) {}
    },



  getPropertyForLabel: function getPropertyForLabel(properties, shape, label) {
    return properties.find(function(item){ return item.refToView().any(function(toView){ return label.id == shape.id + toView })});
  },

  getEditableProperties: function getEditableProperties(shape) {
      // Get all properties which where at least one ref to view is set
    var props = shape.getStencil().properties().findAll(function(item){ 
      return (item.refToView() 
          &&  item.refToView().length > 0
          &&  item.directlyEditable()); 
    });
    
    // from these, get all properties where write access are and the type is String
      return props.findAll(function(item){ return !item.readonly() &&  item.type() == WAPAMA.CONFIG.TYPE_STRING });
  },
    
  /**
   * Show the RecordView for the selected shapes,
     * according to the shape_type and uuid
   */
    showShapeRecordView: function() {
        // get selection
        if (this.shapeSelection.shapes.length == 1) {
            // the selected shape
            var selectedShape = this.shapeSelection.shapes.first();
            // get the UUID for the sematic record
            var uuid = selectedShape.targetRecord;
            // get shape type uuid
            var shape_type_uuid = selectedShape.getStencil()._jsonStencil.shape_type_uuid;
            // get shape_type string
            var shape_type = selectedShape.getStencil()._jsonStencil.id.replace(selectedShape.getStencil()._namespace,'');

            // doesn't load recordview if shape_type is root type or record-view is hidden
            if ("business_process" != shape_type && "spring_pipe" != shape_type && "camel_pipe" != shape_type) {
                // send the request for record view
                WAPAMA.UI.showRecordView(selectedShape.isNew, shape_type_uuid, uuid);
            }
        }
    },
    
    /**
     * Update the recordView by cached complex JSON
     */
    onRecordViewReady : function(shapeuuid) {
        if (!shapeuuid) {
            return;
        }
        WAPAMA.PANE.Property.obj.find(".io-section-form.object-form").attr("wapama_shape_uuid", shapeuuid);
        if (!WAPAMA.UI.isPropertyPaneHidden
         && 'none' === WAPAMA.PANE.Property.obj.css('display')) {
            WAPAMA.PANE.Property.obj.show(); 
        }
        return WAPAMA.UI.updateCurrentRecordView(shapeuuid);
    },

    /**
     * When record view is saving, disable the save/options in wapama,
     * after record view saved, enable save/options button in wapama
     */
    toggleSaveButton: function(isSaving) {
      if (isSaving) {
        this.facade.setStatus(WAPAMA.I18N.Status.busy);
      } else {
        this.facade.setStatus(WAPAMA.I18N.Status.idle);
      }
      this.facade.raiseEvent({type : WAPAMA.CONFIG.EVENT_TOOLBAR_REFRESH, elements : this.facade.getSelection()});
    },

    /**
     * Update the label of shape when user change shape name in record view.
     */
    onShapeNameChanged: function(newValue, oldValue) {
        //var shape = this.shapeSelection.shapes[0];
        var recordShapeUUID = WAPAMA.PANE.Property.obj.find(".io-section-form.object-form").attr("wapama_shape_uuid");//TODO Comment is to be removed. var recordShapeUUID = top.$('#record-view').find(".io-section-form.object-form").attr("wapama_shape_uuid")
        if (!recordShapeUUID) {
            return;
        }
        
        var selectedShape = this.shapeSelection.shapes[0];
        var shape;
        
        if (selectedShape.targetRecord == recordShapeUUID) {
            shape = selectedShape;
        } else {
            shape = WAPAMA.UI.getShapeByTargetRecordFromCanvas(recordShapeUUID);
        }
        facade = this.facade;
        if (shape) {
            // Instanciated the specific command for name change
            var command = new WAPAMA.Plugins.RenameShapesCommond(shape, 'name', oldValue, newValue);

            // Execute the command
            this.facade.executeCommands([command]);
        }
    }
}
WAPAMA.Plugins.PropertyWindow = Clazz.extend(WAPAMA.Plugins.PropertyWindow);