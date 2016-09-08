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

if(!WAPAMA.Plugins)
  WAPAMA.Plugins = new Object();

WAPAMA.Plugins.AddDocker = Clazz.extend({

  /**
   *  Constructor
   *  @param {Object} Facade: The Facade of the Editor
   */
  construct: function(facade) {
    this.facade = facade;

    var addDockerButton = {
            'name': WAPAMA.I18N.AddDocker.add,
            'functionality': this.enableAddDocker.bind(this),
            'group': WAPAMA.I18N.AddDocker.group,
            'icon': '',
            "position": {
                "x": "0px",
                "y": "-816px"
             },
             'description': WAPAMA.I18N.AddDocker.addDesc,
             'index': 1,
             'toggle': true,
             'minShape': 0,
             'maxShape': 0,
             'pressed': false
    }
    
    this.facade.offer(addDockerButton);
    
    this.addDockerButton = addDockerButton;

    var deleteDockerButton = {
            'name': WAPAMA.I18N.AddDocker.del,
            'functionality': this.enableDeleteDocker.bind(this),
            'group': WAPAMA.I18N.AddDocker.group,
            'icon': '',
            "position": {
                "x": "0px",
                "y": "-768px"
             },
             'description': WAPAMA.I18N.AddDocker.delDesc,
             'index': 2,
             'toggle': true,
             'minShape': 0,
             'maxShape': 0,
             'pressed': false
    }

    this.facade.offer(deleteDockerButton);
    
    this.deleteDockerButton = deleteDockerButton;
    
    this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_MOUSEDOWN, this.handleMouseDown.bind(this));
  },
  
  enableAddDocker: function() {
        this.handleButtonPress(this.addDockerButton);
        // Unpress deleteDockerButton
        if(this.deleteDockerButton  && this.deleteDockerButton.pressed) {
            this.setButtonUnpress(this.deleteDockerButton);
        }
    },
    
    enableDeleteDocker: function() {
        //FIXME This should be done while construct, but this isn't possible right now!
        this.handleButtonPress(this.deleteDockerButton);
        // Unpress addDockerButton
        if(this.addDockerButton && this.addDockerButton.pressed) {
            this.setButtonUnpress(this.addDockerButton);
        }
    },
    
    handleButtonPress: function(button) {
        button.pressed = !button.pressed;
    },
    
    setButtonUnpress: function(button) {
        button.domEle.style.backgroundPosition = button.position.x + " " + button.position.y;
        button.pressed = false;
    },
    
    enabledAdd: function(){
        return this.addDockerButton.pressed;
    },
    enabledDelete: function(){
        return this.deleteDockerButton.pressed;
    },
  
  /**
   * MouseDown Handler
   *
   */ 
  handleMouseDown: function(event, uiObj) {
      if (this.enabledAdd() && uiObj instanceof WAPAMA.Core.Edge) {
          this.newDockerCommand({
              edge: uiObj,
              position: this.facade.eventCoordinates(event)
          });
          this.setButtonUnpress(this.addDockerButton);
      } else if (this.enabledDelete() &&
              uiObj instanceof WAPAMA.Core.Controls.Docker &&
              uiObj.parent instanceof WAPAMA.Core.Edge) {
          this.newDockerCommand({
              edge: uiObj.parent,
              docker: uiObj
          });
          this.setButtonUnpress(this.deleteDockerButton);
      } else if ( this.enabledAdd() ){
          this.setButtonUnpress(this.addDockerButton);
      } else if ( this.enabledDelete() ) {
          this.setButtonUnpress(this.deleteDockerButton);
      }
  },
    
    // Options: edge (required), position (required if add), docker (required if delete)
    newDockerCommand: function(options){
        if(!options.edge)
            return;

        var commandClass = WAPAMA.Core.Command.extend({
            construct: function(addEnabled, deleteEnabled, edge, docker, pos, facade){
                this.addEnabled = addEnabled;
                this.deleteEnabled = deleteEnabled;
                this.edge = edge;
                this.docker = docker;
                this.pos = pos;
                this.facade = facade;
        //this.index = docker.parent.dockers.indexOf(docker);
            },
            execute: function(){
                if (this.addEnabled) {
                        this.docker = this.edge.addDocker(this.pos, this.docker);
            this.index = this.edge.dockers.indexOf(this.docker);
                }
                else if (this.deleteEnabled) {
          this.index = this.edge.dockers.indexOf(this.docker);
                    this.pos = this.docker.bounds.center();
                    this.edge.removeDocker(this.docker);
                }
                
                this.facade.getCanvas().update();
                this.facade.updateSelection();
            },
            rollback: function(){
                if (this.addEnabled) {
                    if (this.docker instanceof WAPAMA.Core.Controls.Docker) {
                        this.edge.removeDocker(this.docker);
                    }
                }
                else if (this.deleteEnabled) {
                    this.edge.add(this.docker, this.index);
                }
                
                this.facade.getCanvas().update();
                this.facade.updateSelection();
            }
        })
        
        var command = new commandClass(this.enabledAdd(), this.enabledDelete(), options.edge, options.docker, options.position, this.facade);
        
        this.facade.executeCommands([command]);
    }
});