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

WAPAMA.Plugins.DragDropResize = WAPAMA.Plugins.AbstractPlugin.extend({

  /**
   *  Constructor
   *  @param {Object} Facade: The Facade of the Editor
   */
  construct: function(facade) {
    this.facade = facade;

    // Initialize variables
    this.currentShapes    = [];     // Current selected Shapes
    //this.pluginsData    = [];     // Available Plugins
    this.toMoveShapes     = [];     // Shapes there will be moved
    this.distPoints     = [];     // Distance Points for Snap on Grid
    this.isResizing     = false;    // Flag: If there was currently resized
    this.dragEnable     = false;    // Flag: If Dragging is enabled
    this.dragIntialized   = false;    // Flag: If the Dragging is initialized
    this.edgesMovable   = true;     // Flag: If an edge is docked it is not movable
    this.offSetPosition   = {x: 0, y: 0}; // Offset of the Dragging
    this.faktorXY       = {x: 1, y: 1}; // The Current Zoom-Faktor
    this.containmentParentNode;       // the current future parent node for the dragged shapes
    this.isAddingAllowed  = false;    // flag, if adding current selected shapes to containmentParentNode is allowed
    this.isAttachingAllowed = false;    // flag, if attaching to the current shape is allowed
    
    this.callbackMouseMove  = this.handleMouseMove.bind(this);
    this.callbackMouseUp  = this.handleMouseUp.bind(this);
    // Get the SVG-Containernode 
    var containerNode = this.facade.getCanvas().getSvgContainer();
    
    // Create the Selected Rectangle in the SVG
    this.selectedRect = new WAPAMA.Plugins.SelectedRect(containerNode);
    // Show grid line if enabled
    if (WAPAMA.CONFIG.SHOW_GRIDLINE) {
      this.vLine = new WAPAMA.Plugins.GridLine(containerNode, WAPAMA.Plugins.GridLine.DIR_VERTICAL);
      this.hLine = new WAPAMA.Plugins.GridLine(containerNode, WAPAMA.Plugins.GridLine.DIR_HORIZONTAL);
    }
    
    // Get a HTML-ContainerNode
    containerNode = this.facade.getCanvas().getHTMLContainer();
    
    this.scrollNode = this.facade.getCanvas().rootNode.parentNode.parentNode;
    
    // Create the southeastern button for resizing
    this.resizerSE = new WAPAMA.Plugins.Resizer(containerNode, "southeast", this.facade);
    this.resizerSE.registerOnResize(this.onResize.bind(this)); // register the resize callback
    this.resizerSE.registerOnResizeEnd(this.onResizeEnd.bind(this)); // register the resize end callback
    this.resizerSE.registerOnResizeStart(this.onResizeStart.bind(this)); // register the resize start callback
    
    
    // Create the northwestern button for resizing
    this.resizerNW = new WAPAMA.Plugins.Resizer(containerNode, "northwest", this.facade);
    this.resizerNW.registerOnResize(this.onResize.bind(this)); // register the resize callback
    this.resizerNW.registerOnResizeEnd(this.onResizeEnd.bind(this)); // register the resize end callback
    this.resizerNW.registerOnResizeStart(this.onResizeStart.bind(this)); // register the resize start callback
    
    // For the Drag and Drop
    // Register on MouseDown-Event on a Shape
    this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_MOUSEDOWN, this.handleMouseDown.bind(this));
  },

  /**
   * On Mouse Down
   *
   */
  handleMouseDown: function(event, uiObj) {
    // If the selection Bounds not intialized and the uiObj is not member of current selectio
    // then return
    
    if(!this.dragBounds || !this.currentShapes.member(uiObj) || !this.toMoveShapes.length || WAPAMA.CONFIG.PERMISSION_TYPE <= 2) {return};
    
    // Start Dragging
    this.dragEnable = true;
    this.dragIntialized = true;
    this.edgesMovable = true;

    // Calculate the current zoom factor
    var a = this.facade.getCanvas().node.getScreenCTM();
    this.faktorXY.x = a.a;
    this.faktorXY.y = a.d;

    // Set the offset position of dragging
    var upL = this.dragBounds.upperLeft();
    this.offSetPosition =  {
      x: Event.pointerX(event) - (upL.x * this.faktorXY.x),
      y: Event.pointerY(event) - (upL.y * this.faktorXY.y)};
    
    this.offsetScroll = {x:this.scrollNode.scrollLeft,y:this.scrollNode.scrollTop};
    // Register on Global Mouse-MOVE Event
    document.documentElement.addEventListener(WAPAMA.CONFIG.EVENT_MOUSEMOVE, this.callbackMouseMove, false);  
    // Register on Global Mouse-UP Event
    document.documentElement.addEventListener(WAPAMA.CONFIG.EVENT_MOUSEUP, this.callbackMouseUp, true);     

    return;
  },

  /**
   * On Key Mouse Up
   *
   */
  handleMouseUp: function(event) {
    //disable containment highlighting
    this.facade.raiseEvent({
                  type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE,
                  highlightId:"dragdropresize.contain"
                });
                
    this.facade.raiseEvent({
                  type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE,
                  highlightId:"dragdropresize.attached"
                });

    // If Dragging is finished
    if(this.dragEnable) {
    
      // and update the current selection
      if(!this.dragIntialized) {
        
        // Do Method after Dragging
        var overlappedNodes = this.afterDrag();
        // Check if the Shape is allowed to dock to the other Shape           
        if (  this.isAttachingAllowed &&
            this.toMoveShapes.length == 1 && this.toMoveShapes[0] instanceof WAPAMA.Core.Node  &&
            this.toMoveShapes[0].dockers.length > 0) {
          
          // Get the position and the docker          
          var position  = this.facade.eventCoordinates( event );
          position = this.adjustDockPosition(position);
          var docker    = this.toMoveShapes[0].dockers[0];


      
          //Command-Pattern for dragging several Shapes
          var dockCommand = WAPAMA.Core.Command.extend({
            construct: function(docker, position, newDockedShape, facade){
              this.docker     = docker;
              this.newPosition  = position;
              this.newDockedShape = newDockedShape;
              this.newParent    = newDockedShape.parent || facade.getCanvas();
              this.oldPosition  = docker.parent.bounds.center();
              this.oldDockedShape = docker.getDockedShape();
              this.oldParent    = docker.parent.parent || facade.getCanvas();
              this.facade     = facade;
              
              if( this.oldDockedShape ){
                this.oldPosition = docker.parent.absoluteBounds().center();
              }
              
            },      
            execute: function(){
              this.dock( this.newDockedShape, this.newParent,  this.newPosition );
              
              // Raise Event for having the docked shape on top of the other shape
              this.facade.raiseEvent({type:WAPAMA.CONFIG.EVENT_ARRANGEMENT_TOP, excludeCommand: true})                  
            },
            rollback: function(){
              this.dock( this.oldDockedShape, this.oldParent, this.oldPosition );
            },
            dock:function( toDockShape, parent, pos ){
              // Add to the same parent Shape
              parent.add( this.docker.parent )
              
              
              // Set the Docker to the new Shape
              this.docker.setDockedShape( undefined );
              this.docker.bounds.centerMoveTo( pos )        
              this.docker.setDockedShape( toDockShape );  
              //this.docker.update();
              
              this.facade.setSelection( [this.docker.parent] ); 
              this.facade.getCanvas().update();
              this.facade.updateSelection();
                                                        
                      
            }
          });
      
          // Instanziate the dockCommand
          var commands = [new dockCommand(docker, position, this.containmentParentNode, this.facade)];
          this.facade.executeCommands(commands);  
            
          
        // Check if adding is allowed to the other Shape  
        } else if( this.isAddingAllowed ) {
          
        
          // Refresh all Shapes --> Set the new Bounds
          var len = overlappedNodes.length;          
          if (0 === len) {
              this.refreshSelectedShapes();
          } else {                        
              if (1 === len) {
                this.handleOverlappedShape(overlappedNodes[0], true);
              } else {
                if (this.checkMoveable(overlappedNodes, len)) {
                    for (var i = 0; i < len; i++) {
                      this.handleOverlappedShape(overlappedNodes[i], ("io_#business_pool" != overlappedNodes[i]._stencil._jsonStencil.id)); 
                   }
                } 
              }
          }         
        }
        
        this.facade.updateSelection();
              
        //this.currentShapes.each(function(shape) {shape.update()})
        // Raise Event: Dragging is finished
        this.facade.raiseEvent({type:WAPAMA.CONFIG.EVENT_DRAGDROP_END});
      } 

      if (this.vLine)
        this.vLine.hide();
      if (this.hLine)
        this.hLine.hide();
    }

    // Disable 
    this.dragEnable = false;  
    this.isAddingAllowed = false;
    

    // UnRegister on Global Mouse-UP/-Move Event
    document.documentElement.removeEventListener(WAPAMA.CONFIG.EVENT_MOUSEUP, this.callbackMouseUp, true);  
    document.documentElement.removeEventListener(WAPAMA.CONFIG.EVENT_MOUSEMOVE, this.callbackMouseMove, false);       
      
    return;
  },

  /**
  * On Key Mouse Move
  *
  */
  handleMouseMove: function(event) {
    // If dragging is not enabled, go return
    if(!this.dragEnable) { return };
    // If Dragging is initialized
    if(this.dragIntialized) {
      // Raise Event: Drag will be started
      this.facade.raiseEvent({type:WAPAMA.CONFIG.EVENT_DRAGDROP_START});
      this.dragIntialized = false;
      
      // And hide the resizers and the highlighting
      this.resizerSE.hide();
      this.resizerNW.hide();
      
      // if only edges are selected, containmentParentNode must be the canvas
      this._onlyEdges = this.currentShapes.all(function(currentShape) {
        return (currentShape instanceof WAPAMA.Core.Edge);
      });
      
//      /* If only edges are selected, check if they are movable. An Edge is
//       * movable in case it is not docked
//       */
//      if(this._onlyEdges) {
//        this.currentShapes.each(function(edge) {
//          if(edge.isDocked()) {
//            this.edgesMovable = false;
//            throw $break;
//          }
//        }.bind(this));
//      }
      
      // Do method before Drag
      this.beforeDrag();
      
      this._currentUnderlyingNodes = [];
      
    }

    
    // Calculate the new position
    var position = {
      x: Event.pointerX(event) - this.offSetPosition.x,
      y: Event.pointerY(event) - this.offSetPosition.y}

    position.x  -= this.offsetScroll.x - this.scrollNode.scrollLeft; 
    position.y  -= this.offsetScroll.y - this.scrollNode.scrollTop;
    
    // If not the Control-Key are pressed
    var modifierKeyPressed = event.shiftKey || event.ctrlKey;
    if(WAPAMA.CONFIG.GRID_ENABLED && !modifierKeyPressed) {
      // Snap the current position to the nearest Snap-Point
      position = this.snapToGrid(position);
    } else {
      if (this.vLine)
        this.vLine.hide();
      if (this.hLine)
        this.hLine.hide();
    }

    // Adjust the point by the zoom faktor 
    position.x /= this.faktorXY.x;
    position.y /= this.faktorXY.y;

    // Set that the position is not lower than zero
    position.x = Math.max( 0 , position.x)
    position.y = Math.max( 0 , position.y)

    // Set that the position is not bigger than the canvas
    var c = this.facade.getCanvas();
    position.x = Math.min( c.bounds.width() - this.dragBounds.width(),    position.x)
    position.y = Math.min( c.bounds.height() - this.dragBounds.height(),  position.y) 
            
    var offset = {x: position.x - this.dragBounds.upperLeft().x , y : position.y - this.dragBounds.upperLeft().y};
    this.dragBounds.moveBy(offset);
    
    this.facade.raiseEvent({
      type    : WAPAMA.CONFIG.EVENT_DRAG_TRACKER_DRAG,
      shapes    : this.currentShapes,
      bounds      : this.dragBounds
    });
    
    

    // Update all selected shapes and the selection rectangle
    //this.refreshSelectedShapes();
    
    this.resizeRectangle(this.dragBounds);
    this.isAttachingAllowed = false;
    
    
    var checkIfAttachable = this.toMoveShapes.length == 1 && this.toMoveShapes[0] instanceof WAPAMA.Core.Node && this.toMoveShapes[0].dockers.length > 0
        
        if (checkIfAttachable && this.tryShapeAttach(this.dragBounds.upperLeft(), this.dragBounds.lowerRight())) {
            return;
        }

    //check, if a node can be added to the underlying node
    var underlyingNodes = $A(this.facade.getCanvas().getAbstractShapesAtPosition(this.facade.eventCoordinates(event)));
    
    checkIfAttachable = checkIfAttachable && underlyingNodes.length != 1
      
    if(   !checkIfAttachable &&
        underlyingNodes.length === this._currentUnderlyingNodes.length  &&
        underlyingNodes.all(function(node, index){return this._currentUnderlyingNodes[index] === node}.bind(this))) {
          
      return
      
    } else if(this._onlyEdges) {
      
      this.isAddingAllowed = true;
      this.containmentParentNode = this.facade.getCanvas();
      
    } else {
        
        // To fix BUG-WAPAMA-000374, Group shape can't contain other shapes.
          if (underlyingNodes && !this.needCheckRules(underlyingNodes)) {
              return;
          }
    
      /* Check the containment and connection rules */
      var options = {
        event : event,
        underlyingNodes : underlyingNodes,
        checkIfAttachable : checkIfAttachable
      };
      
      this.checkRules(options);
              
    }
    
    this._currentUnderlyingNodes = underlyingNodes.reverse();
    
    //visualize the containment result
    if( this.isAttachingAllowed ) {
      
      this.facade.raiseEvent({
                  type:       WAPAMA.CONFIG.EVENT_HIGHLIGHT_SHOW,
                  highlightId:  "dragdropresize.attached",
                  elements:     [this.containmentParentNode],
                  style:      WAPAMA.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE,
                  color:      WAPAMA.CONFIG.SELECTION_VALID_COLOR
                });
                
    } else {
      
      this.facade.raiseEvent({
                  type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE,
                  highlightId:"dragdropresize.attached"
                });
    }
    
    if( !this.isAttachingAllowed ){
      if( this.isAddingAllowed ) {

        this.facade.raiseEvent({
                    type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_SHOW,
                    highlightId:"dragdropresize.contain",
                    elements:[this.containmentParentNode],
                    color: WAPAMA.CONFIG.SELECTION_VALID_COLOR
                  });

      } else {

        this.facade.raiseEvent({
                    type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_SHOW,
                    highlightId:"dragdropresize.contain",
                    elements:[this.containmentParentNode],
                    color: WAPAMA.CONFIG.SELECTION_INVALID_COLOR
                  });

      }
    } else {
      this.facade.raiseEvent({
                  type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE,
                  highlightId:"dragdropresize.contain"
                });     
    } 

    // Stop the Event
    //Event.stop(event);
    return;
  },
  
    /**
     * Check if it is necessary to check rules.
     * 
     * @param   underlyingNodes   the nodes to check
     * @return  true if it needs to check rules; false otherwise.
     */
    needCheckRules: function(underlyingNodes) {
        var needCheckRules = true;
        var containmentParentNode = underlyingNodes.reverse(false).find((function(node) {
            return (node instanceof WAPAMA.Core.Canvas) 
                        || ((node instanceof WAPAMA.Core.Node) 
                                && (!(this.currentShapes.member(node) 
                                        || this.currentShapes.any(function(shape) {
                                                return (shape.children.length > 0 && shape.getChildNodes(true).member(node));
                                            }))));
        }).bind(this));
        if (!containmentParentNode) {
            needCheckRules = false;
        }
        if (needCheckRules) {
            var namespace = containmentParentNode.getStencil().namespace();
            // Check if containment shape contains no need check role.
            var stencil = this.facade.getRules()._getStencilById(containmentParentNode.getStencil().id());
            var roles = stencil.roles() || "";
            if (roles && roles instanceof Array) {
                roles = roles.join(",");
            }
            var noNeedCheckRoles = WAPAMA.CONFIG.ROLES_NO_NEED_CHECK;
            var checkRegex = new RegExp("(^|,)" + namespace + "(" + noNeedCheckRoles.replace(/,/g, "|") + ")" + "(,|$)");
            if (!(containmentParentNode instanceof WAPAMA.Core.Canvas) && checkRegex.test(roles)) {
                needCheckRules = false;
            }
        }
        
        if (needCheckRules) {
            // Check if current selected shape contains no need check role.
            var currentShapeRoles;
            if (this.currentShapes.length === 1) {
                currentShapeRoles = this.facade.getRules()._getStencilById(this.currentShapes[0].getStencil().id()).roles() || "";
                if (currentShapeRoles && currentShapeRoles instanceof Array) {
                    currentShapeRoles = currentShapeRoles.join(",");
                }
                if (checkRegex.test(currentShapeRoles)) {
                    needCheckRules = false;
                }
            }
        }
        
        if (!needCheckRules) {
            // Doesn't need to check rules. Set attributes of this object to keep track at the next move event.
            this.isAddingAllowed = true;
            this.containmentParentNode = this.facade.getCanvas();
            this.facade.raiseEvent({
                type: WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE,
                highlightId: "dragdropresize.contain"
            });
            this._currentUnderlyingNodes = containmentParentNode;
        }
        return needCheckRules;
  },
  
  //Try if a shape can be attached to one of targets in the current dragged bound.
    tryShapeAttach: function(upperLeft, lowerRight) {
        var sourceShape = this.toMoveShapes[0];
        var targets = $A(this.getTargetNodesInBounds(upperLeft, lowerRight));
        var containerNodes = []; 
        var facade = this.facade;
        targets.each(function(value) {
            var canConnected = facade.getRules().canConnect({
                sourceShape:    value, 
                edgeShape:      sourceShape, 
                targetShape:    sourceShape
                });
            if (canConnected) {
                containerNodes.push(value);
            }
        })
        if (containerNodes.length > 0) {
            this.isAttachingAllowed = true;
            this.containmentParentNode = containerNodes[0];
            this.facade.raiseEvent({
                type:           WAPAMA.CONFIG.EVENT_HIGHLIGHT_SHOW,
                highlightId:    "dragdropresize.attached",
                elements:       containerNodes,
                style:          WAPAMA.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE,
                color:          WAPAMA.CONFIG.SELECTION_VALID_COLOR
            });
            this.facade.raiseEvent({
                type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE,
                highlightId:"dragdropresize.contain"
            });     
        } else {
            this.isAttachingAllowed = false;
            this.containmentParentNode = null;
            this.facade.raiseEvent({
                type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE,
                highlightId:"dragdropresize.attached"
            });
        }
        return containerNodes.length > 0;
    },
  
  getTargetNodesInBounds: function(upperLeft, lowerRight) {
        var scopeLen = WAPAMA.CONFIG.BORDER_OFFSET;
        var elements = this.facade.getCanvas().getChildShapes(true).findAll(function(value) {
            var absBounds = value.absoluteBounds();
            var bA = absBounds.upperLeft();
            var bB = absBounds.lowerRight();
            if ((upperLeft.x > bA.x && upperLeft.x < bB.x && upperLeft.y > bA.y && upperLeft.y < bB.y) ||
                (lowerRight.x > bA.x && lowerRight.x < bB.x && lowerRight.y > bA.y && lowerRight.y < bB.y) || 
                (lowerRight.x > bA.x && lowerRight.x < bB.x && upperLeft.y > bA.y && upperLeft.y < bB.y) || 
                (upperLeft.x > bA.x && upperLeft.x < bB.x && lowerRight.y > bA.y && lowerRight.y < bB.y)
            ) {
                var lmtUL = {
                        x: bA.x + 15,
                        y: bA.y + 15
                }
                var lmtLR = {
                        x: bB.x - 15,
                        y: bB.y - 15
                }
                if (upperLeft.x > lmtUL.x && upperLeft.x < lmtLR.x && upperLeft.y > lmtUL.y && upperLeft.y < lmtLR.y
                        && lowerRight.x > lmtUL.x && lowerRight.x < lmtLR.x && lowerRight.y > lmtUL.y && lowerRight.y < lmtLR.y) {
                    return false;
                }
                return true;
            }
            return false;
        });
        return elements;
    },
    
    adjustDockPosition: function(pos) {
        var bounds = this.containmentParentNode.absoluteBounds();
        var refUF = bounds.upperLeft();
        var refLR = bounds.lowerRight();
        if (pos.x < refUF.x) {
            pos.x = refUF.x;
        }
        if (pos.x > refLR.x) {
            pos.x = refLR.x;
        }
        if (pos.y < refUF.y) {
            pos.y = refUF.y;
        }
        if (pos.y > refLR.y) {
            pos.y = refLR.y;
        }
        
        return pos;
    },
  
//  /**
//   * Rollbacks the docked shape of an edge, if the edge is not movable.
//   */
//  redockEdges: function() {
//    this._undockedEdgesCommand.dockers.each(function(el){
//      el.docker.setDockedShape(el.dockedShape);
//      el.docker.setReferencePoint(el.refPoint);
//    })
//  },
  
  /**
   *  Checks the containment and connection rules for the selected shapes.
   */
  checkRules : function(options) {
    var event = options.event;
    var underlyingNodes = options.underlyingNodes;
    var checkIfAttachable = options.checkIfAttachable;
    var noEdges = options.noEdges;
    
    //get underlying node that is not the same than one of the currently selected shapes or
    // a child of one of the selected shapes with the highest z Order.
    // The result is a shape or the canvas
    this.containmentParentNode = underlyingNodes.reverse().find((function(node) {
      return (node instanceof WAPAMA.Core.Canvas) || 
          (((node instanceof WAPAMA.Core.Node) || ((node instanceof WAPAMA.Core.Edge) && !noEdges)) 
          && (!(this.currentShapes.member(node) || 
              this.currentShapes.any(function(shape) {
                return (shape.children.length > 0 && shape.getChildNodes(true).member(node));
              }))));
    }).bind(this));
                
    if( checkIfAttachable &&  this.containmentParentNode){
        
      this.isAttachingAllowed = this.facade.getRules().canConnect({
                        sourceShape:  this.containmentParentNode, 
                        edgeShape:    this.toMoveShapes[0], 
                        targetShape:  this.toMoveShapes[0]
                        });           
      
      if ( this.isAttachingAllowed  ) {
        var point = this.facade.eventCoordinates(event);
        this.isAttachingAllowed = this.containmentParentNode.isPointOverOffset( point.x, point.y );
      }           
    }
    
    if( !this.isAttachingAllowed ){
      //check all selected shapes, if they can be added to containmentParentNode
      var collapsedSubprocess;
      var stencilId = this.containmentParentNode.getStencil().id()
      if (stencilId == "io_#business_collapsed_subprocess" || stencilId == 'io_#business_expanded_subprocess' || stencilId.indexOf("CollapsedSubprocess") > -1 || stencilId.indexOf('Subprocess') > -1) {
        collapsedSubprocess = new WAPAMA.Plugins.CollapseSubprocess(this.facade, this.containmentParentNode);
      }
      this.isAddingAllowed = this.toMoveShapes.all((function(currentShape) {
        if (collapsedSubprocess && collapsedSubprocess.isCollapsed) {
          return false;
        }
        if(currentShape instanceof WAPAMA.Core.Edge ||
          currentShape instanceof WAPAMA.Core.Controls.Docker ||
          this.containmentParentNode === currentShape.parent) {
          return true;
        } else if(this.containmentParentNode !== currentShape) {
          
          if(!(this.containmentParentNode instanceof WAPAMA.Core.Edge) || !noEdges) {
            if(this.facade.getRules().canContain({containingShape:this.containmentParentNode,
                                containedShape:currentShape})) {      
              return true;
            }
          }
        }
        return false;
      }).bind(this));
    }
    
    if(!this.isAttachingAllowed && !this.isAddingAllowed && 
        (this.containmentParentNode instanceof WAPAMA.Core.Edge)) {
      options.noEdges = true;
      options.underlyingNodes.reverse();
      this.checkRules(options);     
    }
  },
  
  /**
   * Redraw the selected Shapes.
   *
   */
  refreshSelectedShapes: function() {
    // If the selection bounds not initialized, return
    if(!this.dragBounds) {return}

    // Calculate the offset between the bounds and the old bounds
    var upL = this.dragBounds.upperLeft();
    var oldUpL = this.oldDragBounds.upperLeft();
    var offset = {
      x: upL.x - oldUpL.x,
      y: upL.y - oldUpL.y };

    // Instanciate the dragCommand
    var commands = [new WAPAMA.Core.Command.Move(this.toMoveShapes, offset, null, this.containmentParentNode, this.currentShapes, this, true)];
    // If the undocked edges command is setted, add this command
    if( this._undockedEdgesCommand instanceof WAPAMA.Core.Command ){
      commands.unshift( this._undockedEdgesCommand );
    }
    // Execute the commands     
    this.facade.executeCommands( commands );  

    // copy the bounds to the old bounds
    if( this.dragBounds )
      this.oldDragBounds = this.dragBounds.clone();

  },
  
  /**
   * Callback for Resize
   *
   */
  onResize: function(bounds) {
    // If the selection bounds not initialized, return
    if(!this.dragBounds) {return}
    
    this.dragBounds = bounds;
    this.isResizing = true;

    // Update the rectangle 
    this.resizeRectangle(this.dragBounds);
  },
  
  onResizeStart: function() {
    this.facade.raiseEvent({type:WAPAMA.CONFIG.EVENT_RESIZE_START});
  },

  onResizeEnd: function() {
    
    if (!(this.currentShapes instanceof Array)||this.currentShapes.length<=0) {
      return;
    }
    
    // If Resizing finished, the Shapes will be resize
    if(this.isResizing) {
      
      var bounds = this.dragBounds.clone();
      // FIXME are we only resizing one element ?
      var shape = this.currentShapes[0];
      
      if(shape.parent) {
        var parentPosition = shape.parent.absoluteXY();
        if ('io_#business_lane' === shape._stencil._jsonStencil.id) {
            //ensure the shape will not be out of the parent node
            var absBounds = shape.parent.bounds.clone();
            if ('io_#business_pool' === shape.parent._stencil._jsonStencil.id) {
              (bounds.a.x < absBounds.a.x + 30) && (bounds.a.x = absBounds.a.x + 30);
            } else if ('io_#business_lane' === shape.parent._stencil._jsonStencil.id) {
              var absBounds = shape.parent.bounds.clone();
              var width = absBounds.b.x -  absBounds.a.x;
              var height = absBounds.b.y -  absBounds.a.y;
              absBounds.a.x = parentPosition.x;
              absBounds.b.x = absBounds.a.x + width;
              absBounds.a.y = parentPosition.y;
              absBounds.b.y = absBounds.a.y + height;
              (bounds.a.x < absBounds.a.x) && (bounds.a.x = absBounds.a.x);
            }
            (bounds.a.y < absBounds.a.y) && (bounds.a.y = absBounds.a.y);
            (bounds.b.x > absBounds.b.x) && (bounds.b.x = absBounds.b.x);
            (bounds.b.y > absBounds.b.y) && (bounds.b.y = absBounds.b.y);
            //ensure the shape will not overlap other shapes
            var siblings = shape.parent.nodes;
            var len = siblings.length;
            var relativeBounds = this.getRelativeBounds(absBounds, bounds);
            var isOverlapped = false;
            var siblingNode = null;
            for (var i = 0; i < len; i++) {
              siblingNode = siblings[i];
              if (siblingNode.id != shape.id
              && this.checkOverlap(siblingNode.bounds, relativeBounds)) {
                 isOverlapped = true;
                 break;
              }
            }
            if (isOverlapped) {
              var absSibling = siblingNode.absoluteXY();
              var height = siblingNode.bounds.b.y - siblingNode.bounds.a.y;
              //drag the sourtheast resizer
              if (this.dragBounds.a.x - absBounds.a.x === shape.bounds.a.x) {
                  (bounds.b.y > absSibling.y) && (bounds.b.y = absSibling.y);
              } else {
                  (bounds.a.y < absSibling.y + height) && (bounds.a.y = absSibling.y + height);
              }              
            }
        }
        bounds.moveBy(-parentPosition.x, -parentPosition.y);
      }
        
      var command = new WAPAMA.Core.Command.Resize(shape, bounds, this);
      
      this.facade.executeCommands([command]);
      
      this.isResizing = false;
      
      this.facade.raiseEvent({type:WAPAMA.CONFIG.EVENT_RESIZE_END, shapes:[shape]});
    }
  },
  

  /**
   * Prepare the Dragging
   *
   */
  beforeDrag: function(){

    var undockEdgeCommand = WAPAMA.Core.Command.extend({
      construct: function(moveShapes){
        this.dockers = moveShapes.collect(function(shape){ return shape instanceof WAPAMA.Core.Controls.Docker ? {docker:shape, dockedShape:shape.getDockedShape(), refPoint:shape.referencePoint} : undefined }).compact();
      },      
      execute: function(){
        this.dockers.each(function(el){
          el.docker.setDockedShape(undefined);
        })
      },
      rollback: function(){
        this.dockers.each(function(el){
          el.docker.setDockedShape(el.dockedShape);
          el.docker.setReferencePoint(el.refPoint);
          //el.docker.update();
        })
      }
    });
    
    this._undockedEdgesCommand = new undockEdgeCommand( this.toMoveShapes );
    this._undockedEdgesCommand.execute(); 
    
  },

  hideAllLabels: function(shape) {
      
      // Hide all labels from the shape
      shape.getLabels().each(function(label) {
        label.hide();
      });
      // Hide all labels from docked shapes
      shape.getAllDockedShapes().each(function(dockedShape) {
        var labels = dockedShape.getLabels();
        if(labels.length > 0) {
          labels.each(function(label) {
            label.hide();
          });
        }
      });

      // Do this recursive for all child shapes
      // EXP-NICO use getShapes
      shape.getChildren().each((function(value) {
        if(value instanceof WAPAMA.Core.Shape)
          this.hideAllLabels(value);
      }).bind(this));
  },

  /**
   * Check if two rectangles overlaps
   */
  checkOverlap: function(firstBounds, secondBounds) {
      return (Math.abs(secondBounds.b.x + secondBounds.a.x - firstBounds.b.x - firstBounds.a.x) < (secondBounds.b.x - secondBounds.a.x + firstBounds.b.x - firstBounds.a.x)
       &&  Math.abs(secondBounds.b.y + secondBounds.a.y - firstBounds.b.y - firstBounds.a.y) < (secondBounds.b.y - secondBounds.a.y + firstBounds.b.y - firstBounds.a.y));
  },

  /**
   * Check if inbound shape is contained in the outbound shape
   */
  checkContaiment: function(inBounds, outBounds, isPool) {
      var titleWidth = isPool ? 30 : 0;
      return (outBounds.a.x + titleWidth <= inBounds.a.x && inBounds.a.x <= outBounds.b.x
           && outBounds.a.x + titleWidth <= inBounds.b.x && inBounds.b.x <= outBounds.b.x
           && outBounds.a.y <= inBounds.a.y && inBounds.a.y <= outBounds.b.y
           && outBounds.a.y <= inBounds.b.y && inBounds.b.y <= outBounds.b.y);
  },

  /**
   * Check if there is enough space for the shape to be placed
   */
  checkMoveable: function(overlappedNodes, len) {
      var isMoveable = true;
      var overlappedNode = null;
      var laneNodes = [];
      for (var i = 0; i < len; i++) {
        overlappedNode = overlappedNodes[i];
        if ("io_#business_lane" === overlappedNode._stencil._jsonStencil.id) {
            laneNodes.push(overlappedNode);
            if ("io_#business_pool" === this.containmentParentNode._stencil._jsonStencil.id) {
                //check the if there is space on the border
                if (this.dragBounds.a.y < overlappedNode.bounds.a.y + this.containmentParentNode.bounds.a.y
                && overlappedNode.bounds.a.y <= 80) {
                    isMoveable = false;
                    break;
                } else if (this.dragBounds.b.y > overlappedNode.bounds.b.y + this.containmentParentNode.bounds.a.y
                && this.containmentParentNode.bounds.b.y - this.containmentParentNode.bounds.a.y - overlappedNode.bounds.b.y <= 80) {
                    isMoveable = false;
                    break;
                } 
            }
        }  
      }
      if (2 === laneNodes.length) {
         if (laneNodes[0].bounds.a.y - laneNodes[1].bounds.a.y > 0
          && laneNodes[0].bounds.a.y - laneNodes[1].bounds.b.y < 80) {
            isMoveable = false;
         } else if (laneNodes[1].bounds.a.y - laneNodes[0].bounds.b.y < 80) {
            isMoveable = false;
         }
      }      
      return isMoveable;
  },

  /**
   * Get the relative bounds of the target node based on the base bounds
   */
  getRelativeBounds: function(baseBounds, targetBounds) {
      var clonedBounds = targetBounds.clone();
      clonedBounds.a.x -= baseBounds.a.x;
      clonedBounds.b.x -= baseBounds.a.x;
      clonedBounds.a.y -= baseBounds.a.y;
      clonedBounds.b.y -= baseBounds.a.y;
      return clonedBounds;
  },
  
  /**
   * Move the overlapped shape to the proper position
   */
  moveOverlappedShape: function(overlappedNode) {
      //newBounds is relative position
      var newBounds = this.dragBounds.clone();
      if ("io_#business_lane" == this.containmentParentNode._stencil._jsonStencil.id) {
        this.containmentParentNode = this.containmentParentNode.parent;
      }
      var width = newBounds.b.x - newBounds.a.x;
      var height = newBounds.b.y - newBounds.a.y;
      if ("io_#business_pool" == overlappedNode._stencil._jsonStencil.id) {        
          newBounds.a.x = 30;
          newBounds.b.x = newBounds.a.x + width;          
          if (newBounds.a.y < overlappedNode.bounds.a.y) {
            newBounds.a.y = 0;
            newBounds.b.y = newBounds.a.y + height;
          } else if (newBounds.b.y > overlappedNode.bounds.b.y) {
            newBounds.b.y = this.containmentParentNode.bounds.b.y - this.containmentParentNode.bounds.a.y;
            newBounds.a.y = newBounds.b.y - height;
          } else {
            newBounds.a.y -= this.containmentParentNode.bounds.a.y;
            newBounds.b.y -= this.containmentParentNode.bounds.a.y;
          }
      } else {
          //move the shape to the top or bottom of overlappedNode
          newBounds.a.y = (this.dragBounds.a.y < overlappedNode.bounds.a.y + this.containmentParentNode.bounds.a.y) ? overlappedNode.bounds.a.y - height : overlappedNode.bounds.b.y;
          newBounds.a.x = newBounds.a.x - this.containmentParentNode.bounds.a.x;
          newBounds.b.x = newBounds.a.x + width;
          newBounds.b.y = newBounds.a.y + height;
      }
      var oldUpL = this.oldDragBounds.upperLeft();
      var offset = {
        x: newBounds.a.x + this.containmentParentNode.bounds.a.x - oldUpL.x,
        y: newBounds.a.y + this.containmentParentNode.bounds.a.y - oldUpL.y,
      };
      var commands = [new WAPAMA.Core.Command.Move(this.toMoveShapes, offset, null, this.containmentParentNode, this.currentShapes, this, true)];
      // If the undocked edges command is setted, add this command
      if( this._undockedEdgesCommand instanceof WAPAMA.Core.Command ){
        commands.unshift( this._undockedEdgesCommand );
      }
      this.facade.executeCommands(commands);
      return newBounds;
  },
  

  /**
   * Resize the overlapped shape to the proper position
   */
  resizeOverlappedShape: function(overlappedNode, newBounds) {
      //check if need to resize the shape
      var oldUpL = this.oldDragBounds.upperLeft();
      var siblingNodes = this.containmentParentNode.nodes;
      var len = siblingNodes.length;
      var siblingNode = null;
      var isOverlapped = false;
      var currentShape = this.currentShapes[0];
      for (var i = 0; i < len; i++) {
        siblingNode = siblingNodes[i];
        if (siblingNode.id != currentShape.id
        && this.checkOverlap(siblingNode.bounds, newBounds)) {
           isOverlapped = true;
           break;
        }
      }
      if (isOverlapped) {
        if (Math.abs(siblingNode.bounds.a.y - overlappedNode.bounds.b.y) < 80) {
            //rollback movement
            offset = {
              x: oldUpL.x - newBounds.a.x - this.containmentParentNode.bounds.a.x,
              y: oldUpL.y - newBounds.a.y - this.containmentParentNode.bounds.a.y,
            };
            var commands = [new WAPAMA.Core.Command.Move(this.toMoveShapes, offset, null, this.containmentParentNode, this.currentShapes, this, true)];
            this.facade.executeCommands(commands);
        } else {
            newBounds.b.x = siblingNode.bounds.b.x;
            newBounds.b.y = siblingNode.bounds.a.y;      
            var command = new WAPAMA.Core.Command.Resize(currentShape, newBounds, this);
            this.facade.executeCommands([command]);  
        }      
      }
      return newBounds;
  },
  
  handleOverlappedShape:function(overlappedNode, resize) {
      var newBounds = this.moveOverlappedShape(overlappedNode);
      if (resize) {
          this.resizeOverlappedShape(overlappedNode, newBounds); 
      }
      var parentPosition = this.containmentParentNode.absoluteXY();
      newBounds.moveBy(parentPosition.x, parentPosition.y);
      this.oldDragBounds = newBounds;
  },

  /**
   * Finished the Dragging
   *
   */
  afterDrag: function(){
      var currentShape = (this.currentShapes.length == 1) ? this.currentShapes[0] : null;
      var overlappedNodes = [];
      if (currentShape && "io_#business_lane" == currentShape._stencil._jsonStencil.id) {
          var currentId = currentShape.id;
          var siblingNodes = null;
          var relativeDragBounds = this.dragBounds.clone();
          if ("io_#business_pool" == this.containmentParentNode._stencil._jsonStencil.id) {
             siblingNodes = this.containmentParentNode.nodes;
             //check if the shape overlapped with the pool
             if (!this.checkContaiment(relativeDragBounds, this.containmentParentNode.bounds, true)) {
               overlappedNodes.push(this.containmentParentNode);
             }
             relativeDragBounds = this.getRelativeBounds(this.containmentParentNode.bounds, relativeDragBounds);             
          } else if ("io_#business_lane" == this.containmentParentNode._stencil._jsonStencil.id) {              
              relativeDragBounds = this.getRelativeBounds(this.containmentParentNode.parent.bounds, relativeDragBounds);
              if (!this.checkContaiment(relativeDragBounds, this.containmentParentNode.bounds)) {
                   var poolNode = this.containmentParentNode.parent;
                   while("io_#business_pool" != poolNode._stencil._jsonStencil.id) {
                     poolNode = poolNode.parent;
                   }
                   siblingNodes = poolNode.nodes;
                   if (this.checkOverlap(poolNode.bounds, this.dragBounds)
                   && !this.checkContaiment(this.dragBounds, poolNode.bounds)) {
                     overlappedNodes.push(poolNode);
                   }
              }              
          }
          if (siblingNodes) {
              var siblingNode = null;
              var len = siblingNodes.length;
              for (var i = 0; i < len; i++) {
                siblingNode = siblingNodes[i];
                if (siblingNode.id != currentId
                && this.checkOverlap(siblingNode.bounds, relativeDragBounds)
                && !this.checkContaiment(relativeDragBounds, siblingNode.bounds)) {
                   overlappedNodes.push(siblingNode);
                }
              }
          }          
      }
      return overlappedNodes;
  },

  /**
   * Show all Labels at these shape
   * 
   */
  showAllLabels: function(shape) {

      // Show the label of these shape
      //shape.getLabels().each(function(label) {
      for(var i=0; i<shape.length ;i++){
        var label = shape[i];
        label.show();
      }//);
      // Show all labels at docked shapes
      //shape.getAllDockedShapes().each(function(dockedShape) {
      var allDockedShapes = shape.getAllDockedShapes()
      for(var i=0; i<allDockedShapes.length ;i++){
        var dockedShape = allDockedShapes[i];       
        var labels = dockedShape.getLabels();
        if(labels.length > 0) {
          labels.each(function(label) {
            label.show();
          });
        }
      }//);

      // Do this recursive
      //shape.children.each((function(value) {
      for(var i=0; i<shape.children.length ;i++){
        var value = shape.children[i];  
        if(value instanceof WAPAMA.Core.Shape)
          this.showAllLabels(value);
      }//).bind(this));
  },

  /**
   * Intialize Method, if there are new Plugins
   *
   */
  /*registryChanged: function(pluginsData) {
    // Save all new Plugin, sorted by group and index
    this.pluginsData = pluginsData.sortBy( function(value) {
      return (value.group + "" + value.index);
    });
  },*/

  /**
   * On the Selection-Changed
   *
   */
  onSelectionChanged: function(event) {
    this.resizerSE.onSelectionChanged(event);
    this.resizerNW.onSelectionChanged(event);
    
    var elements = event.elements;
    
    // Reset the drag-variables
    this.dragEnable = false;
    this.dragIntialized = false;
    this.resizerSE.hide();
    this.resizerNW.hide();

    // If there is no elements
    if(!elements || elements.length == 0) {
      // Hide all things and reset all variables
      this.selectedRect.hide();
      this.currentShapes = [];
      this.toMoveShapes = [];
      this.dragBounds = undefined;
      this.oldDragBounds = undefined;
    } else {

      // Set the current Shapes
      this.currentShapes = elements;

      // Get all shapes with the highest parent in object hierarchy (canvas is the top most parent)
      var topLevelElements = this.facade.getCanvas().getShapesWithSharedParent(elements);
      this.toMoveShapes = topLevelElements;
      
      this.toMoveShapes = this.toMoveShapes.findAll( function(shape) { return shape instanceof WAPAMA.Core.Node && 
                                      (shape.dockers.length === 0 || !elements.member(shape.dockers.first().getDockedShape()))});   
                                      
      elements.each((function(shape){
        if(!(shape instanceof WAPAMA.Core.Edge)) {return}
        
        var dks = shape.getDockers() 
                
        var hasF = elements.member(dks.first().getDockedShape());
        var hasL = elements.member(dks.last().getDockedShape());  
            
//        if(!hasL) {
//          this.toMoveShapes.push(dks.last());
//        }
//        if(!hasF){
//          this.toMoveShapes.push(dks.first())
//        } 
        /* Enable movement of undocked edges */
        if(!hasF && !hasL) {
          var isUndocked = !dks.first().getDockedShape() && !dks.last().getDockedShape()
          if(isUndocked) {
            this.toMoveShapes = this.toMoveShapes.concat(dks);
          }
        }
        
        if( shape.dockers.length > 2 && hasF && hasL){
          this.toMoveShapes = this.toMoveShapes.concat(dks.findAll(function(el,index){ return index > 0 && index < dks.length-1}))
        }
        
      }).bind(this));
      
      // Calculate the new area-bounds of the selection
      var newBounds = undefined;
      this.toMoveShapes.each(function(value) {
        var shape = value;
        if(value instanceof WAPAMA.Core.Controls.Docker) {
          /* Get the Shape */
          shape = value.parent;
        }
        
        if(!newBounds){
          newBounds = shape.absoluteBounds();
        }
        else {
          newBounds.include(shape.absoluteBounds());
        }
      }.bind(this));
      
      if(!newBounds){
        elements.each(function(value){
          if(!newBounds) {
            newBounds = value.absoluteBounds();
          } else {
            newBounds.include(value.absoluteBounds());
          }
        });
      }
      
      // Set the new bounds
      this.dragBounds = newBounds;
      this.oldDragBounds = newBounds.clone();

      // Update and show the rectangle
      this.resizeRectangle(newBounds);
      this.selectedRect.show();
      
      // Show the resize button, if there is only one element and this is resizeable
      if(elements.length == 1 && elements[0].isResizable) {
        var aspectRatio = elements[0].getStencil().fixedAspectRatio() ? elements[0].bounds.width() / elements[0].bounds.height() : undefined;
        this.resizerSE.setBounds(this.dragBounds, elements[0].minimumSize, elements[0].maximumSize, aspectRatio);
        this.resizerSE.show();
        this.resizerNW.setBounds(this.dragBounds, elements[0].minimumSize, elements[0].maximumSize, aspectRatio);
        this.resizerNW.show();
      } else {
        this.resizerSE.setBounds(undefined);
        this.resizerNW.setBounds(undefined);
      }

      // If Snap-To-Grid is enabled, the Snap-Point will be calculate
      if(WAPAMA.CONFIG.GRID_ENABLED) {

        // Reset all points
        this.distPoints = [];

        if (this.distPointTimeout)
          window.clearTimeout(this.distPointTimeout)
        
        this.distPointTimeout = window.setTimeout(function(){
          // Get all the shapes, there will consider at snapping
          // Consider only those elements who shares the same parent element
          var distShapes = this.facade.getCanvas().getChildShapes(true).findAll(function(value){
            var parentShape = value.parent;
            while(parentShape){
              if(elements.member(parentShape)) return false;
              parentShape = parentShape.parent
            }
            return true;
          })
          
          // The current selection will delete from this array
          //elements.each(function(shape) {
          //  distShapes = distShapes.without(shape);
          //});

          // For all these shapes
          distShapes.each((function(value) {
            if(!(value instanceof WAPAMA.Core.Edge)) {
              var ul = value.absoluteXY();
              var width = value.bounds.width();
              var height = value.bounds.height();

              // Add the upperLeft, center and lowerRight - Point to the distancePoints
              this.distPoints.push({
                ul: {
                  x: ul.x,
                  y: ul.y
                },
                c: {
                  x: ul.x + (width / 2),
                  y: ul.y + (height / 2)
                },
                lr: {
                  x: ul.x + width,
                  y: ul.y + height
                }
              });
            }
          }).bind(this));
          
        }.bind(this), 10)


      }
    }
  },

  /**
   * Adjust an Point to the Snap Points
   *
   */
  snapToGrid: function(position) {

    // Get the current Bounds
    var bounds = this.dragBounds;
    
    var point = {};

    var ulThres = 6;
    var cThres = 10;
    var lrThres = 6;

    var scale = this.vLine ? this.vLine.getScale() : 1;
    
    var ul = { x: (position.x/scale), y: (position.y/scale)};
    var c = { x: (position.x/scale) + (bounds.width()/2), y: (position.y/scale) + (bounds.height()/2)};
    var lr = { x: (position.x/scale) + (bounds.width()), y: (position.y/scale) + (bounds.height())};

    var offsetX, offsetY;
    var gridX, gridY;
    
    // For each distant point
    this.distPoints.each(function(value) {

      var x, y, gx, gy;
      if (Math.abs(value.c.x-c.x) < cThres){
        x = value.c.x-c.x;
        gx = value.c.x;
      }/* else if (Math.abs(value.ul.x-ul.x) < ulThres){
        x = value.ul.x-ul.x;
        gx = value.ul.x;
      } else if (Math.abs(value.lr.x-lr.x) < lrThres){
        x = value.lr.x-lr.x;
        gx = value.lr.x;
      } */
      

      if (Math.abs(value.c.y-c.y) < cThres){
        y = value.c.y-c.y;
        gy = value.c.y;
      }/* else if (Math.abs(value.ul.y-ul.y) < ulThres){
        y = value.ul.y-ul.y;
        gy = value.ul.y;
      } else if (Math.abs(value.lr.y-lr.y) < lrThres){
        y = value.lr.y-lr.y;
        gy = value.lr.y;
      } */

      if (x !== undefined) {
        offsetX = offsetX === undefined ? x : (Math.abs(x) < Math.abs(offsetX) ? x : offsetX);
        if (offsetX === x)
          gridX = gx;
      }

      if (y !== undefined) {
        offsetY = offsetY === undefined ? y : (Math.abs(y) < Math.abs(offsetY) ? y : offsetY);
        if (offsetY === y)
          gridY = gy;
      }
    });
    
    
    if (offsetX !== undefined) {
      ul.x += offsetX;  
      ul.x *= scale;
      if (this.vLine&&gridX)
        this.vLine.update(gridX);
    } else {
      ul.x = (position.x - (position.x % (WAPAMA.CONFIG.GRID_DISTANCE/2)));
      if (this.vLine)
        this.vLine.hide()
    }
    
    if (offsetY !== undefined) {  
      ul.y += offsetY;
      ul.y *= scale;
      if (this.hLine&&gridY)
        this.hLine.update(gridY);
    } else {
      ul.y = (position.y - (position.y % (WAPAMA.CONFIG.GRID_DISTANCE/2)));
      if (this.hLine)
        this.hLine.hide();
    }
    
    return ul;
  },
  
  showGridLine: function(){
    
  },


  /**
   * Redraw of the Rectangle of the SelectedArea
   * @param {Object} bounds
   */
  resizeRectangle: function(bounds) {
    // Resize the Rectangle
    this.selectedRect.resize(bounds);
  }

});


WAPAMA.Plugins.SelectedRect = Clazz.extend({

  construct: function(parentId) {

    this.parentId = parentId;

    this.node = WAPAMA.Editor.graft("http://www.w3.org/2000/svg", $(parentId),
          ['g']);

    this.dashedArea = WAPAMA.Editor.graft("http://www.w3.org/2000/svg", this.node,
      ['rect', {x: 0, y: 0,
        'stroke-width': 1, stroke: '#777777', fill: 'none',
        'stroke-dasharray': '2,2',
        'pointer-events': 'none'}]);
    this.hide();

  },

  hide: function() {
    this.node.setAttributeNS(null, 'display', 'none');
  },

  show: function() {
    this.node.setAttributeNS(null, 'display', '');
  },

  resize: function(bounds) {
    var upL = bounds.upperLeft();

    var padding = WAPAMA.CONFIG.SELECTED_AREA_PADDING;
    
    this.dashedArea.setAttributeNS(null, 'width', bounds.width() + 2*padding);
    this.dashedArea.setAttributeNS(null, 'height', bounds.height() + 2*padding);
    this.node.setAttributeNS(null, 'transform', "translate("+ (upL.x - padding) +", "+ (upL.y - padding) +")");
    
  }


});



WAPAMA.Plugins.GridLine = Clazz.extend({
  
  construct: function(parentId, direction) {

    if (WAPAMA.Plugins.GridLine.DIR_HORIZONTAL !== direction && WAPAMA.Plugins.GridLine.DIR_VERTICAL !== direction) {
      direction = WAPAMA.Plugins.GridLine.DIR_HORIZONTAL
    }
    
  
    this.parent = $(parentId);
    this.direction = direction;
    this.node = WAPAMA.Editor.graft("http://www.w3.org/2000/svg", this.parent,
          ['g']);

    this.line = WAPAMA.Editor.graft("http://www.w3.org/2000/svg", this.node,
      ['path', {
        'stroke-width': 1, stroke: 'silver', fill: 'none',
        'stroke-dasharray': '5,5',
        'pointer-events': 'none'}]);

    this.hide();

  },

  hide: function() {
    this.node.setAttributeNS(null, 'display', 'none');
  },

  show: function() {
    this.node.setAttributeNS(null, 'display', '');
  },

  getScale: function(){
    try {
      return this.parent.parentNode.transform.baseVal.getItem(0).matrix.a;
    } catch(e) {
      return 1;
    }
  },
  
  update: function(pos) {
    
    if (this.direction === WAPAMA.Plugins.GridLine.DIR_HORIZONTAL) {
      var y = pos instanceof Object ? pos.y : pos; 
      var cWidth = this.parent.parentNode.parentNode.width.baseVal.value/this.getScale();
      this.line.setAttributeNS(null, 'd', 'M 0 '+y+ ' L '+cWidth+' '+y);
    } else {
      var x = pos instanceof Object ? pos.x : pos; 
      var cHeight = this.parent.parentNode.parentNode.height.baseVal.value/this.getScale();
      this.line.setAttributeNS(null, 'd', 'M'+x+ ' 0 L '+x+' '+cHeight);
    }
    
    this.show();
  }


});

WAPAMA.Plugins.GridLine.DIR_HORIZONTAL = "hor";
WAPAMA.Plugins.GridLine.DIR_VERTICAL = "ver";

WAPAMA.Plugins.Resizer = Clazz.extend({

  construct: function(parentId, orientation, facade) {
    this.parentId     = parentId;
    this.orientation  = orientation;
    this.facade     = facade;
    this.node = WAPAMA.Editor.graft("http://www.w3.org/1999/xhtml", $(this.parentId),
      ['div', {'class': 'resizer_'+ this.orientation, style:'left:0px; top:0px;'}]);

    this.node.addEventListener(WAPAMA.CONFIG.EVENT_MOUSEDOWN, this.handleMouseDown.bind(this), true);
    document.documentElement.addEventListener(WAPAMA.CONFIG.EVENT_MOUSEUP,  this.handleMouseUp.bind(this),    true);
    document.documentElement.addEventListener(WAPAMA.CONFIG.EVENT_MOUSEMOVE,  this.handleMouseMove.bind(this),  false);

    this.dragEnable = false;
    this.offSetPosition = {x: 0, y: 0};
    this.bounds = undefined;

    this.canvasNode = this.facade.getCanvas().node;

    this.minSize = undefined;
    this.maxSize = undefined;
    
    this.aspectRatio = undefined;

    this.resizeCallbacks    = [];
    this.resizeStartCallbacks   = [];
    this.resizeEndCallbacks   = [];
    this.hide();
    
    // Calculate the Offset
    this.scrollNode = this.node.parentNode.parentNode.parentNode;


  },
  
  /**
   * On the Selection-Changed
   *
   */
  onSelectionChanged: function(event) {
    var elements = event.elements;
    
    // If there is no elements
    if(!elements || elements.length == 0) {
      // Hide all things and reset all variables
      this.currentShapes = [];
    } else {

      // Set the current Shapes
      this.currentShapes = elements;
    }
  },

  handleMouseDown: function(event) {
    this.dragEnable = true;

    this.offsetScroll = {x:this.scrollNode.scrollLeft,y:this.scrollNode.scrollTop};
      
    this.offSetPosition =  {
      x: Event.pointerX(event) - this.position.x,
      y: Event.pointerY(event) - this.position.y};
    
    this.resizeStartCallbacks.each((function(value) {
      value(this.bounds);
    }).bind(this));

  },

  handleMouseUp: function(event) {
    this.dragEnable = false;
    this.containmentParentNode = null;
    this.resizeEndCallbacks.each((function(value) {
      value(this.bounds);
    }).bind(this));
        
  },

  handleMouseMove: function(event) {
    if(!this.dragEnable) { return }
    
    if(event.shiftKey || event.ctrlKey) {
      this.aspectRatio = this.bounds.width() / this.bounds.height();
    } else {
      this.aspectRatio = undefined;
    }

    var position = {
      x: Event.pointerX(event) - this.offSetPosition.x,
      y: Event.pointerY(event) - this.offSetPosition.y}


    position.x  -= this.offsetScroll.x - this.scrollNode.scrollLeft; 
    position.y  -= this.offsetScroll.y - this.scrollNode.scrollTop;
    
    position.x  = Math.min( position.x, this.facade.getCanvas().bounds.width())
    position.y  = Math.min( position.y, this.facade.getCanvas().bounds.height())
    
    var offset = {
      x: position.x - this.position.x,
      y: position.y - this.position.y
    };
    
    if(this.aspectRatio) {
      // fixed aspect ratio
      newAspectRatio = (this.bounds.width()+offset.x) / (this.bounds.height()+offset.y);
      if(newAspectRatio>this.aspectRatio) {
        offset.x = this.aspectRatio * (this.bounds.height()+offset.y) - this.bounds.width();
      } else if(newAspectRatio<this.aspectRatio) {
        offset.y = (this.bounds.width()+offset.x) / this.aspectRatio - this.bounds.height();
      }
    }
    
    // respect minimum and maximum sizes of stencil
    if(this.orientation==="northwest") {
      if(this.bounds.width()-offset.x > this.maxSize.width) {
        offset.x = -(this.maxSize.width - this.bounds.width());
        if(this.aspectRatio)
          offset.y = this.aspectRatio * offset.x;
      }
      if(this.bounds.width()-offset.x < this.minSize.width) {
        offset.x = -(this.minSize.width - this.bounds.width());
        if(this.aspectRatio)
          offset.y = this.aspectRatio * offset.x;
      }
      if(this.bounds.height()-offset.y > this.maxSize.height) {
        offset.y = -(this.maxSize.height - this.bounds.height());
        if(this.aspectRatio)
          offset.x = offset.y / this.aspectRatio;
      }
      if(this.bounds.height()-offset.y < this.minSize.height) {
        offset.y = -(this.minSize.height - this.bounds.height());
        if(this.aspectRatio)
          offset.x = offset.y / this.aspectRatio;
      }
    } else { // defaults to southeast
      if(this.bounds.width()+offset.x > this.maxSize.width) {
        offset.x = this.maxSize.width - this.bounds.width();
        if(this.aspectRatio)
          offset.y = this.aspectRatio * offset.x;
      }
      if(this.bounds.width()+offset.x < this.minSize.width) {
        offset.x = this.minSize.width - this.bounds.width();
        if(this.aspectRatio)
          offset.y = this.aspectRatio * offset.x;
      }
      if(this.bounds.height()+offset.y > this.maxSize.height) {
        offset.y = this.maxSize.height - this.bounds.height();
        if(this.aspectRatio)
          offset.x = offset.y / this.aspectRatio;
      }
      if(this.bounds.height()+offset.y < this.minSize.height) {
        offset.y = this.minSize.height - this.bounds.height();
        if(this.aspectRatio)
          offset.x = offset.y / this.aspectRatio;
      }
    }

    if(this.orientation==="northwest") {
      var oldLR = {x: this.bounds.lowerRight().x, y: this.bounds.lowerRight().y};
      this.bounds.extend({x:-offset.x, y:-offset.y});
      this.bounds.moveBy(offset);
    } else { // defaults to southeast
      this.bounds.extend(offset);
    }
    
    this.facade.raiseEvent({
      type    : WAPAMA.CONFIG.EVENT_DRAG_TRACKER_RESIZE,
      shapes    : this.currentShapes,
      bounds      : this.bounds
    });
    this.update();

    this.resizeCallbacks.each((function(value) {
      value(this.bounds);
    }).bind(this));

    Event.stop(event);

  },
  
  registerOnResizeStart: function(callback) {
    if(!this.resizeStartCallbacks.member(callback)) {
      this.resizeStartCallbacks.push(callback);
    }
  },
  
  unregisterOnResizeStart: function(callback) {
    if(this.resizeStartCallbacks.member(callback)) {
      this.resizeStartCallbacks = this.resizeStartCallbacks.without(callback);
    }
  },

  registerOnResizeEnd: function(callback) {
    if(!this.resizeEndCallbacks.member(callback)) {
      this.resizeEndCallbacks.push(callback);
    }
  },
  
  unregisterOnResizeEnd: function(callback) {
    if(this.resizeEndCallbacks.member(callback)) {
      this.resizeEndCallbacks = this.resizeEndCallbacks.without(callback);
    }
  },
    
  registerOnResize: function(callback) {
    if(!this.resizeCallbacks.member(callback)) {
      this.resizeCallbacks.push(callback);
    }
  },

  unregisterOnResize: function(callback) {
    if(this.resizeCallbacks.member(callback)) {
      this.resizeCallbacks = this.resizeCallbacks.without(callback);
    }
  },

  hide: function() {
    this.node.style.display = "none";
  },

  show: function() {
    if(this.bounds)
      this.node.style.display = "";
  },

  setBounds: function(bounds, min, max, aspectRatio) {
    this.bounds = bounds;

    if(!min)
      min = {width: WAPAMA.CONFIG.MINIMUM_SIZE, height: WAPAMA.CONFIG.MINIMUM_SIZE};

    if(!max)
      max = {width: WAPAMA.CONFIG.MAXIMUM_SIZE, height: WAPAMA.CONFIG.MAXIMUM_SIZE};

    this.minSize = min;
    this.maxSize = max;
    
    this.aspectRatio = aspectRatio;

    this.update();
  },

  update: function() {
    if(!this.bounds) { return; }

    var upL = this.bounds.upperLeft();

    if(this.bounds.width() < this.minSize.width)  { this.bounds.set(upL.x, upL.y, upL.x + this.minSize.width, upL.y + this.bounds.height())};
    if(this.bounds.height() < this.minSize.height)  { this.bounds.set(upL.x, upL.y, upL.x + this.bounds.width(), upL.y + this.minSize.height)};
    if(this.bounds.width() > this.maxSize.width)  { this.bounds.set(upL.x, upL.y, upL.x + this.maxSize.width, upL.y + this.bounds.height())};
    if(this.bounds.height() > this.maxSize.height)  { this.bounds.set(upL.x, upL.y, upL.x + this.bounds.width(), upL.y + this.maxSize.height)};

    var a = this.canvasNode.getScreenCTM();
    
    upL.x *= a.a;
    upL.y *= a.d;

    if(this.orientation==="northwest") {
      upL.x -= 13;
      upL.y -= 27;
    } else { // defaults to southeast
      upL.x +=  (a.a * this.bounds.width()) + 3 ;
      upL.y +=  (a.d * this.bounds.height())  + 2;
    }
    
    this.position = upL;

    this.node.style.left = this.position.x + "px";
    this.node.style.top = this.position.y + "px";
  }
});



/**
 * Implements a Command to move shapes
 * 
 */ 
WAPAMA.Core.Command.Move = WAPAMA.Core.Command.extend({
  construct: function(moveShapes, offset, newLocation, parent, selectedShapes, plugin, doLayout){
    this.moveShapes = moveShapes;
    this.selectedShapes = selectedShapes;
    this.offset   = offset;
    this.newLocation = newLocation;
    this.plugin   = plugin;
    this.doLayout = doLayout;
    // Defines the old/new parents for the particular shape
    this.newParents = moveShapes.collect(function(t){ return parent || t.parent });
    this.oldParents = moveShapes.collect(function(shape){ return shape.parent });
    this.dockedNodes= moveShapes.findAll(function(shape){ return shape instanceof WAPAMA.Core.Node && shape.dockers.length == 1}).collect(function(shape){ return {docker:shape.dockers[0], dockedShape:shape.dockers[0].getDockedShape(), refPoint:shape.dockers[0].referencePoint} });
  },      
  execute: function(){
    this.dockAllShapes()        
    // Moves by the offset
    this.move( this.offset, this.newLocation, this.doLayout);
    // Addes to the new parents
    this.addShapeToParent( this.newParents ); 
    // Set the selection to the current selection
    this.selectCurrentShapes();
    this.plugin.facade.getCanvas().update();
    this.plugin.facade.updateSelection();
  },
  rollback: function(){
    // Moves by the inverted offset
    var offset = { x:-this.offset.x, y:-this.offset.y };
    this.move( offset );
    // Addes to the old parents
    this.addShapeToParent( this.oldParents ); 
    this.dockAllShapes(true)  
    
    // Set the selection to the current selection
    this.selectCurrentShapes();
    this.plugin.facade.getCanvas().update();
    this.plugin.facade.updateSelection();
    
  },
  move:function(offset, newLocation, doLayout){
    
    // Move all Shapes by these offset
    for(var i=0; i<this.moveShapes.length ;i++){
      var value = this.moveShapes[i];   
      if (offset) {
        value.bounds.moveBy(offset);
      } else {
        value.bounds.moveTo(newLocation);
      }
      if (value instanceof WAPAMA.Core.Node) {
        
        (value.dockers||[]).each(function(d){
          if (offset) {
            d.bounds.moveBy(offset);
          }
        })
        
        // Update all Dockers of Child shapes
        /*var childShapesNodes = value.getChildShapes(true).findAll(function(shape){ return shape instanceof WAPAMA.Core.Node });             
        var childDockedShapes = childShapesNodes.collect(function(shape){ return shape.getAllDockedShapes() }).flatten().uniq();              
        var childDockedEdge = childDockedShapes.findAll(function(shape){ return shape instanceof WAPAMA.Core.Edge });             
        childDockedEdge = childDockedEdge.findAll(function(shape){ return shape.getAllDockedShapes().all(function(dsh){ return childShapesNodes.include(dsh) }) });             
        var childDockedDockers = childDockedEdge.collect(function(shape){ return shape.dockers }).flatten();
        
        for (var j = 0; j < childDockedDockers.length; j++) {
          var docker = childDockedDockers[j];
          if (!docker.getDockedShape() && !this.moveShapes.include(docker)) {
            //docker.bounds.moveBy(offset);
            //docker.update();
          }
        }*/
        
        
        var allEdges = [].concat(value.getIncomingShapes())
          .concat(value.getOutgoingShapes())
          // Remove all edges which are included in the selection from the list
          .findAll(function(r){ return  r instanceof WAPAMA.Core.Edge && !this.moveShapes.any(function(d){ return d == r || (d instanceof WAPAMA.Core.Controls.Docker && d.parent == r)}) }.bind(this))
          // Remove all edges which are between the node and a node contained in the selection from the list
          .findAll(function(r){ return  (r.dockers.first().getDockedShape() == value || !this.moveShapes.include(r.dockers.first().getDockedShape())) &&  
                          (r.dockers.last().getDockedShape() == value || !this.moveShapes.include(r.dockers.last().getDockedShape()))}.bind(this))
                          
        // Layout all outgoing/incoming edges
        this.plugin.layoutEdges(value, allEdges, offset);
        
        
        var allSameEdges = [].concat(value.getIncomingShapes())
          .concat(value.getOutgoingShapes())
          // Remove all edges which are included in the selection from the list
          .findAll(function(r){ return r instanceof WAPAMA.Core.Edge && r.dockers.first().isDocked() && r.dockers.last().isDocked() && !this.moveShapes.include(r) && !this.moveShapes.any(function(d){ return d == r || (d instanceof WAPAMA.Core.Controls.Docker && d.parent == r)}) }.bind(this))
          // Remove all edges which are included in the selection from the list
          .findAll(function(r){ return this.moveShapes.indexOf(r.dockers.first().getDockedShape()) > i ||  this.moveShapes.indexOf(r.dockers.last().getDockedShape()) > i}.bind(this))

        for (var j = 0; j < allSameEdges.length; j++) {
          for (var k = 1; k < allSameEdges[j].dockers.length-1; k++) {
            var docker = allSameEdges[j].dockers[k];
            if (!docker.getDockedShape() && !this.moveShapes.include(docker)) {
              docker.bounds.moveBy(offset);
            }
          }
        } 
        
        /*var i=-1;
        var nodes = value.getChildShapes(true);
        var allEdges = [];
        while(++i<nodes.length){
          var edges = [].concat(nodes[i].getIncomingShapes())
            .concat(nodes[i].getOutgoingShapes())
            // Remove all edges which are included in the selection from the list
            .findAll(function(r){ return r instanceof WAPAMA.Core.Edge && !allEdges.include(r) && r.dockers.any(function(d){ return !value.bounds.isIncluded(d.bounds.center)})})
          allEdges = allEdges.concat(edges);
          if (edges.length <= 0){ continue }
          //this.plugin.layoutEdges(nodes[i], edges, offset);
        }*/
      }
    }
    
    if (doLayout) {
      this.plugin.doLayout(this.moveShapes);
    }
  },
  dockAllShapes: function(shouldDocked){
    // Undock all Nodes
    for (var i = 0; i < this.dockedNodes.length; i++) {
      var docker = this.dockedNodes[i].docker;
      
      docker.setDockedShape( shouldDocked ? this.dockedNodes[i].dockedShape : undefined )
      if (docker.getDockedShape()) {
        docker.setReferencePoint(this.dockedNodes[i].refPoint);
        //docker.update();
      }
    }
  },
  
  addShapeToParent:function( parents ){
    
    // For every Shape, add this and reset the position   
    for(var i=0; i<this.moveShapes.length ;i++){
      var currentShape = this.moveShapes[i];
      if(currentShape instanceof WAPAMA.Core.Node &&
         currentShape.parent !== parents[i]) {
        
        // Calc the new position
        var unul = parents[i].absoluteXY();
        var csul = currentShape.absoluteXY();
        var x = csul.x - unul.x;
        var y = csul.y - unul.y;

        // Add the shape to the new contained shape
        parents[i].add(currentShape);
        // Add all attached shapes as well
        currentShape.getOutgoingShapes((function(shape) {
          if(shape instanceof WAPAMA.Core.Node && !this.moveShapes.member(shape)) {
            parents[i].add(shape);
          }
        }).bind(this));

        // Set the new position
        if(currentShape instanceof WAPAMA.Core.Node && currentShape.dockers.length == 1){
          var b = currentShape.bounds;
          x += b.width()/2;y += b.height()/2
          currentShape.dockers.first().bounds.centerMoveTo(x, y);
        } else {
          currentShape.bounds.moveTo(x, y);
        }
        
      } 
      
      // Update the shape
      //currentShape.update();
      
    }
  },
  selectCurrentShapes:function(){
    this.plugin.facade.setSelection( this.selectedShapes );
  }
});
WAPAMA.Core.Command.Resize = WAPAMA.Core.Command.extend({
  construct: function(shape, newBounds, plugin){
    this.shape = shape;
    this.oldBounds = shape.bounds.clone();
    this.newBounds = newBounds;
    this.plugin = plugin;
  },      
  execute: function(){
    this.shape.bounds.set(this.newBounds.a, this.newBounds.b);
    this.update(this.getOffset(this.oldBounds, this.newBounds));
    
  },
  rollback: function(){
    this.shape.bounds.set(this.oldBounds.a, this.oldBounds.b);
    this.update(this.getOffset(this.newBounds, this.oldBounds))
  },
  
  getOffset:function(b1, b2){
    return {
      x: b2.a.x - b1.a.x,
      y: b2.a.y - b1.a.y,
      xs: b2.width()/b1.width(),
      ys: b2.height()/b1.height()
    }
  },
  update:function(offset){
    this.shape.getLabels().each(function(label) {
      label.changed();
    });
    
    var allEdges = [].concat(this.shape.getIncomingShapes())
      .concat(this.shape.getOutgoingShapes())
      // Remove all edges which are included in the selection from the list
      .findAll(function(r){ return r instanceof WAPAMA.Core.Edge }.bind(this))
                  
    this.plugin.layoutEdges(this.shape, allEdges, offset);
    this.plugin.doLayout([this.shape]);
    this.plugin.facade.setSelection([this.shape]);
    this.plugin.facade.getCanvas().update();
    this.plugin.facade.updateSelection();
    
  }
});