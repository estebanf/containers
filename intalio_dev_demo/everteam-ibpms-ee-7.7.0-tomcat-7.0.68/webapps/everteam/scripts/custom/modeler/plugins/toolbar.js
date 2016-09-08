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

WAPAMA.Plugins.Toolbar = Clazz.extend({

  facade: undefined,
  plugs:  [],

  construct: function(facade, ownPluginData) {
    this.facade = facade;
    
    this.groupIndex = new Hash();
    
    
    if (WAPAMA.CONFIG.MENU_INDEX) {
      this.groupIndex = WAPAMA.CONFIG.MENU_INDEX;
    } else {
      ownPluginData.properties.each((function(value){
        if(value.group && value.index != undefined) {
        this.groupIndex[value.group] = value.index;
      }
      }).bind(this));
    }

    this.buttons = [];
        this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_BUTTON_UPDATE, this.onButtonUpdate.bind(this));
        this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_STENCIL_SET_LOADED, this.onSelectionChanged.bind(this));
        this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_TOOLBAR_REFRESH, this.onSelectionChanged.bind(this));
  },
    
    /**
     * Can be used to manipulate the state of a button.
     * @example
     * this.facade.raiseEvent({
     *   type: WAPAMA.CONFIG.EVENT_BUTTON_UPDATE,
     *   id: this.buttonId, // have to be generated before and set in the offer method
     *   pressed: true
     * });
     * @param {Object} event
     */
    onButtonUpdate: function(event){
        var button = this.buttons.find(function(button){
            return button.id === event.id;
        });
        
        if(event.pressed !== undefined){
            button.buttonInstance.toggle(event.pressed);
        }
    },

  registryChanged: function(pluginsData) {

    // Sort plugins by group and index
    var newPlugs =  pluginsData.sortBy((function(value) {
      return ((this.groupIndex[value.group] != undefined ? this.groupIndex[value.group] : "" ) + value.group + "" + value.index).toLowerCase();
    }).bind(this));
    var plugs = $A(newPlugs).findAll(function(value){
                    return !this.plugs.include( value )
                  }.bind(this));
    if(plugs.length<1)
      return;

    this.buttons = [];
    var buttonCopy = [];

    WAPAMA.Log.trace("Creating a toolbar.");

    var tmpPlugs = [];
    var tmpPlugs1 = [];
    $j.each(plugs, function(index, value) {
        if ($j.inArray(value.name, tmpPlugs) === -1) {
            tmpPlugs.push(value.name);
            tmpPlugs1.push(value);
        }
    });

    tmpPlugs1.each((function(value) {
        if(!value.name) {return};
        buttonCopy.push(value);
    }));
   
    this.buttons = buttonCopy;
    WAPAMA.UI.showToolbar(tmpPlugs1);

  },
  
  onSelectionChanged: function(event) {
    if(!event.elements){
      this.enableButtons([]);
    }else{
      this.enableButtons(event.elements);
    }
  },

  enableButtons: function(elements) {
    // Show the Buttons
        this.buttons.each((function(plug){
            var ele = plug.domEle;
            if (!ele) {
                return;
            }
            var imgPosition = plug.position;
            var x;
            var y;
            var disabledY;
            
            ele.parentNode.title = plug.I18NDes || plug.name;
            if (plug.updateTitle && plug.updateTitle instanceof Function) {
                plug.updateTitle(ele.parentNode);
            }
            
            if (imgPosition) {
                x = imgPosition.x;
                y = imgPosition.y;
                disabledY = (parseInt(y) -16) + "px";
            }
            if (imgPosition) {
                ele.style.backgroundPosition = x + " " + y;
            }
            //$('#' + plug.name).button( "option", "disabled", false );
            ele.style.cursor = "pointer";
            plug.disabled = false;
            // If there is less elements than minShapes
            if (plug.minShape && plug.minShape > elements.length) {
                ele.style.backgroundPosition = x + " " + disabledY;
                ele.style.cursor = "default";
                plug.disabled = true;
            }
            
            if (plug.minNode) {
                var shapeElementCount = 0;
                var selectedEle;
                for (var i=0; i< elements.length; i++) {
                    selectedEle = elements[i];
                    if (selectedEle._stencil && selectedEle._stencil._jsonStencil && selectedEle._stencil._jsonStencil.type == 'node') {
                        shapeElementCount ++;
                    }
                }
                if (plug.minShape > shapeElementCount) {
                    ele.style.backgroundPosition = x + " " + disabledY;
                    ele.style.cursor = "default";
                    plug.disabled = true;
                }
            }
            // If there is more elements than minShapes
            if(plug.maxShape && plug.maxShape < elements.length) {
                plug.disabled = true;
                ele.style.backgroundPosition = x + " " + disabledY;
                ele.style.cursor = "default";
            }
            // If the plug is not enabled 
            if(plug.isEnabled && !plug.isEnabled()) {
                plug.disabled = true;
                ele.style.backgroundPosition = x + " " + disabledY;
                ele.style.cursor = "default";
            }

        }).bind(this)); 
  }
});