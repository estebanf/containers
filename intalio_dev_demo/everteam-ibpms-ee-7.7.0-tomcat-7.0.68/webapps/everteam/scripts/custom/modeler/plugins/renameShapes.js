/**
 * Copyright (c) 2008
 * Willi Tscheschner
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

if (!WAPAMA.Plugins) 
    WAPAMA.Plugins = new Object();


WAPAMA.Plugins.RenameShapes = Clazz.extend({

    facade: undefined,
    
    construct: function(facade){

        this.facade = facade;
        this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_DBLCLICK, this.actOnDBLClick.bind(this));
        this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_DBLCLICK, this.actOnClick.bind(this));

        this.facade.offer({
           keyCodes: [{
              keyCode: 113, // F2-Key
              keyAction: WAPAMA.CONFIG.KEY_ACTION_DOWN 
            }
           ],
          functionality: this.renamePerF2.bind(this)
        });
    
    
    document.documentElement.addEventListener(WAPAMA.CONFIG.EVENT_MOUSEDOWN, this.hide.bind(this), true ) 
    },
  
  /**
   * This method handles the "F2" key down event. The selected shape are looked
   * up and the editing of title/name of it gets started.
   */
  renamePerF2 : function renamePerF2() {
    var selectedShapes = this.facade.getSelection();
    this.actOnClick(undefined, selectedShapes.first());
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
  
  getPropertyForLabel: function getPropertyForLabel(properties, shape, label) {
      return properties.find(function(item){ return item.refToView().any(function(toView){ return label.id == shape.id + toView })});
  },
  
  //If user clicks one shape twice, we assume he/she wants to rename the shape.
  actOnClick: function actOnClick(event, shape) {
      if (!(shape instanceof WAPAMA.Core.Shape)) {
          return;
      }
      //If the selection is changed, will not active the rename feature.
      //This flag set in main.js -> setSelection
      if (!WAPAMA.HOOK.notChanged || !wapamaEditor.selection.include(shape)) {
          return;
      }
      //If there's already a rename shape textfield, no need to show another one.
      if ($j('#shapeName').length > 0) {
          return;
      }
        var evtCoord    = this.facade.eventCoordinates(event);
        var trans       = this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
        evtCoord.x      *= trans.a;
        evtCoord.y      *= trans.d;
        var labels = shape.getLabels();
        var nearestLabel = labels.length == 1 ? labels[0] : null;
        if( !nearestLabel ){
            nearestLabel = labels.find(function(label){ return label.node == event.target || label.node == event.target.parentNode })
            if( !nearestLabel ){
                var evtCoord    = this.facade.eventCoordinates(event);

                var trans       = this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
                evtCoord.x      *= trans.a;
                evtCoord.y      *= trans.d;
                if (!shape instanceof WAPAMA.Core.Node) {

                    var diff = labels.collect(function(label){

                                var center  = this.getCenterPosition( label.node ); 
                                var len     = Math.sqrt( Math.pow(center.x - evtCoord.x, 2) + Math.pow(center.y - evtCoord.y, 2));
                                return {diff: len, label: label} 
                            }.bind(this));

                    diff.sort(function(a, b){ return a.diff > b.diff }) 

                    nearestLabel =  diff[0].label;
                } else {

                    var diff = labels.collect(function(label){

                                var center  = this.getDifferenceCenterForNode( label.node ); 
                                var len     = Math.sqrt( Math.pow(center.x - evtCoord.x, 2) + Math.pow(center.y - evtCoord.y, 2));
                                return {diff: len, label: label} 
                            }.bind(this));

                    diff.sort(function(a, b){ return a.diff > b.diff }) 

                    nearestLabel =  diff[0].label;
                }
            }
        }

        this.showTextField(shape, null, nearestLabel);
  },
  
  actOnDBLClick: function actOnDBLClick(evt, shape){
    if( !(shape instanceof WAPAMA.Core.Shape) ){ return }
    
    // Destroys the old input, if there is one
    this.destroy();
    var props = this.getEditableProperties(shape);
    
    // Get all ref ids
    var allRefToViews = props.collect(function(prop){ return prop.refToView() }).flatten().compact();
    // Get all labels from the shape with the ref ids
    var labels      = shape.getLabels().findAll(function(label){ return allRefToViews.any(function(toView){ return label.id.endsWith(toView) }); })
    
    // If there are no referenced labels --> return
    if( labels.length == 0 ){ return } 
    
    // Define the nearest label
    var nearestLabel  = labels.length == 1 ? labels[0] : null;  
    if( !nearestLabel ){
        nearestLabel = labels.find(function(label){ return label.node == evt.target || label.node == evt.target.parentNode })
          if( !nearestLabel ){
            var evtCoord  = this.facade.eventCoordinates(evt);

            var trans   = this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
            evtCoord.x    *= trans.a;
            evtCoord.y    *= trans.d;
          if (!shape instanceof WAPAMA.Core.Node) {

              var diff = labels.collect(function(label){

                    var center  = this.getCenterPosition( label.node ); 
                    var len   = Math.sqrt( Math.pow(center.x - evtCoord.x, 2) + Math.pow(center.y - evtCoord.y, 2));
                    return {diff: len, label: label} 
                  }.bind(this));
      
              diff.sort(function(a, b){ return a.diff > b.diff }) 
      
              nearestLabel =  diff[0].label;
                } else {

              var diff = labels.collect(function(label){

                    var center  = this.getDifferenceCenterForNode( label.node ); 
                    var len   = Math.sqrt( Math.pow(center.x - evtCoord.x, 2) + Math.pow(center.y - evtCoord.y, 2));
                    return {diff: len, label: label} 
                  }.bind(this));
      
              diff.sort(function(a, b){ return a.diff > b.diff }) 
      
              nearestLabel =  diff[0].label;
                }
            }
    }

    // Get the particular property for the label
    var prop = this.getPropertyForLabel(props, shape, nearestLabel);

    this.showTextField(shape, prop, nearestLabel);
  },
  
  showTextField: function showTextField(shape, prop, label) {
    var screenCTM = this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
    // Set all particular config values
    var htmlCont  = this.facade.getCanvas().getHTMLContainer().id;
      
      // Get the center position from the nearest label
    var width;
    if(!(shape instanceof WAPAMA.Core.Node)) {
        var bounds = label.node.getBoundingClientRect();
        width = Math.max(150, bounds.width);
    } else {
        width = shape.bounds.width();
    }
    if (!shape instanceof WAPAMA.Core.Node) {
        var center    = this.getCenterPosition( label.node );
        center.x = center.x * screenCTM.a;
        center.x    -= (width/2);
        } else {
            var center = shape.absoluteBounds().center();
            center.x = center.x * screenCTM.a; 
        center.x    -= (width/2);
        }
    center.y = center.y * screenCTM.d;
    //var propId    = prop.prefix() + "-" + prop.id();
    var propId = prop.id();
    // Set the config values for the TextField/Area
    var config    =   {
                renderTo  : htmlCont,
                value   : shape.properties[propId],
                x     : (center.x < 10) ? 10 : center.x,
                y     : center.y,
                width   : Math.max(100, width),
                allowBlank  : false, 
                maxLength : 16,
                emptyText : '',
                                listeners   : {specialkey: this._specialKeyPressed.bind(this)}
              };
    
    // Depending on the property, generate 
    // ether an TextArea or TextField
    if(false) {
      config.y    -= 30;
      config['grow']  = true;
    } else {
      config.y -= 16;
    }
    this.shownTextField = WAPAMA.UI.createShapeNameText(config);
    this.shownTextField.keypress(this._specialKeyPressed.bind(this));
    
    // Define event handler
    //  Blur  -> Destroy
    //  Change  -> Set new values   
    this.shownTextField.bind('blur', this.destroy.bind(this));
    this.shownTextField.focus();
    this.shownTextField.change(function(){
      var value = this.shownTextField.val();
      var currentEl   = shape;
      var oldValue  = shapeName;
      var newValue  = value;
      var facade    = this.facade;
      if (oldValue != newValue) {
          // Instanciated the specific command for name change
          var command = new WAPAMA.Plugins.RenameShapesCommond(currentEl, propId, oldValue, newValue, facade);
        
          // Execute the command
          this.facade.executeCommands([command]);
      }
    }.bind(this));

    // Diable the keydown in the editor (that when hitting the delete button, the shapes not get deleted)
    this.facade.disableEvent(WAPAMA.CONFIG.EVENT_KEYDOWN);
  },
    
    _specialKeyPressed: function _specialKeyPressed(e) {
        // Enter or Ctrl+Enter pressed
        var keyCode = e.keyCode;
        if (keyCode == 13) {
            this.shownTextField.triggerHandler('change');
            //this.shownTextField.triggerHandler('blur');
            this.destroy();
        } else if (keyCode == e.ESC) {
            this.shownTextField.triggerHandler('blur');
        }
    },
  
  getCenterPosition: function(svgNode){
    
    var center    = {x: 0, y:0 };
    // transformation to the coordinate origin of the canvas
    var trans     = svgNode.getTransformToElement(this.facade.getCanvas().rootNode.lastChild);
    var scale     = this.facade.getCanvas().rootNode.lastChild.getScreenCTM();
    var transLocal  = svgNode.getTransformToElement(svgNode.parentNode);
    var bounds = undefined;
    
    center.x  = trans.e - transLocal.e;
    center.y  = trans.f - transLocal.f;
    
    
    try {
      bounds = svgNode.getBBox();
    } catch (e) {}

    // Firefox often fails to calculate the correct bounding box
    // in this case we fall back to the upper left corner of the shape
    if (bounds === null || typeof bounds === "undefined" || bounds.width == 0 || bounds.height == 0) {
      bounds = {
        x: Number(svgNode.getAttribute('x')),
        y: Number(svgNode.getAttribute('y')),
        width: 0,
        height: 0
      };
    }
    
    center.x += bounds.x;
    center.y += bounds.y;
    
    center.x += bounds.width/2;
    center.y += bounds.height/2;
    
    center.x *= scale.a;
    center.y *= scale.d;    
    return center;
    
  },

  getDifferenceCenterForNode: function getDifferenceCenterForNode(svgNode){
        //for shapes that do not have multiple lables on the x-line, only the vertical difference matters
        var center  = this.getCenterPosition(svgNode);
        center.x = 0;
        center.y = center.y + 10;
        return center;
    },
  
  hide: function(e){
    if (this.shownTextField && (!e || !this.shownTextField || e.target !== this.shownTextField[0])) {
      this.shownTextField.triggerHandler('change');
      this.shownTextField.triggerHandler('blur');
    }
  },
  
  destroy: function(e){
    if( this.shownTextField ){
//      this.shownTextField.destroy();
        this.shownTextField.remove();
      delete this.shownTextField; 
      
      this.facade.enableEvent(WAPAMA.CONFIG.EVENT_KEYDOWN);
    }
  }
});

WAPAMA.Plugins.RenameShapesCommond = WAPAMA.Core.Command.extend({
    construct: function(shape, propId, oldValue, newValue, facade){
        this.el = shape;
        this.propId = propId;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.facade = facade;
        this.uuid = this.el ? this.el.targetRecord : null;
    },
    execute: function(){
        this.el.setProperty(this.propId, this.newValue);
        //WAPAMA.UI.updateCurrentRecordViewWithNewValue(this.propId, this.newValue, this.uuid);
        this.el.refresh();
        this.facade.setSelection([this.el]);
        this.facade.getCanvas().update();
        this.facade.updateSelection();
    },
    rollback: function(){
        this.el.setProperty(this.propId, this.oldValue);
        //WAPAMA.UI.updateCurrentRecordViewWithNewValue(this.propId, this.oldValue, this.uuid);
        this.el.refresh();
        this.facade.setSelection([this.el]);
        this.facade.getCanvas().update();
        this.facade.updateSelection();
    }
});