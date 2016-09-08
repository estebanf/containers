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


if (!WAPAMA.Plugins) {
  WAPAMA.Plugins = new Object();
}

WAPAMA.Plugins.ShapeRepository = {

  facade: undefined,

  construct: function(facade) {
    this.facade = facade;
    this._currentParent;
    this._canContain = undefined;
    this._canAttach  = undefined;
  },
  
  afterDrop: function(dragObj, pos) {
    var newPos = pos;
    
    if ('business_lane' === dragObj.stencilId
    && ('io_#business_pool' === this._currentParent._stencil._jsonStencil.id
    ||  'io_#business_lane' === this._currentParent._stencil._jsonStencil.id)) {        
        //305 is half width plus pool title width, 62.5 is the default half height of the lane
        newPos = {x: 305, y: 62.5};
        if ('io_#business_lane' === this._currentParent._stencil._jsonStencil.id) {
          this._currentParent = this._currentParent.parent;
        }
        var nodes = this._currentParent.nodes;
        var bottomYs = [];
        var topYs = [];
        var bottomY = 0;
        var topY = 0;
        var len = nodes.length;
        var bounds = null;
        for (var i = 0; i < len; i++) {
          bounds = nodes[i].bounds;
          bottomYs.push(bounds.b.y);
          topYs.push(bounds.a.y);
        }
        if (bottomYs.length > 0) {
          bottomY = Math.max.apply(null, bottomYs);
          topY = Math.min.apply(null, topYs);
          newPos.y = (topY >= 125) ? 62.5 : bottomY + 62.5;
        }
    }
    return newPos;
  },
  
  drop: function(dragObj, draggingLocation) {
    try
    {
      this._lastOverElement = undefined;
      var facade = this.facade;

      // Hide the highlighting
      facade.raiseEvent({type: WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'shapeRepo.added'});
      facade.raiseEvent({type: WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'shapeRepo.attached'});
      if(!this._currentParent) {
          return;
      }
      
      // Check if there is a current Parent
      //if(!this._currentParent) { return }

      var pos = { x: draggingLocation.x, y: draggingLocation.y };
      var a = facade.getCanvas().node.getScreenCTM();
      // Correcting the UpperLeft-Offset
      pos.x -= a.e; pos.y -= a.f;
      // Correcting the Zoom-Faktor
      pos.x /= a.a; pos.y /= a.d;
            // Correting the ScrollOffset
      pos.x -= document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft;
      pos.y -= document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
      /**
      * option = {
      *   type: string,
      *   position: {x:int, y:int},
      *   connectingType: uiObj-Class
      *   connectedShape: uiObj
      *   draggin: bool
      *   namespace: url
      *       parent: WAPAMA.Core.AbstractShape
      *   template: a template shape that the newly created inherits properties from.
      *   }
      */
         // Correct position of parent
      if (this._currentParent && this._canContain) {
        var parentAbs = this._currentParent.absoluteXY();
        pos.x -= parentAbs.x;
        pos.y -= parentAbs.y;
      }
      
      pos = this.afterDrop(dragObj, pos);
      var option = {
        type: "io_#" + dragObj.stencilId,
        position: pos,
        connectingType: null,
        connectedShape: null,
        draggin: false,
        namespace: "io_#",
        parent: null,
        template: null,
        isShapeWithNoNeedCheckRole: this._isShapeWithNoNeedCheckRole
      };

      // Set parent
      if( this._canAttach && this._currentParent instanceof WAPAMA.Core.Node ){
        option['parent'] = undefined;
      } else {
        option['parent'] = this._currentParent;
      }

      var commandClass = WAPAMA.Core.Command.extend({
        construct: function(option, currentParent, canAttach, position, facade){
          this.option = option;
          this.currentParent = currentParent;
          this.canAttach = canAttach;
          this.position = position;
          this.facade = facade;
          this.selection = this.facade.getSelection();
          this.shape;
          this.parent;
        },  
        execute: function(){
          if (!this.shape) {
            this.shape  = this.facade.createShape(option);
            this.parent = this.shape.parent;
          } else {
            this.parent.add(this.shape);
          }

          if( this.canAttach &&  this.currentParent instanceof WAPAMA.Core.Node && this.shape.dockers.length > 0){

            var docker = this.shape.dockers[0];

            if( this.currentParent.parent instanceof WAPAMA.Core.Node ) {
              this.currentParent.parent.add( docker.parent );
            }

            docker.bounds.centerMoveTo( this.position );
            docker.setDockedShape( this.currentParent );
            //docker.update();  
          }

          //this.currentParent.update();
          //this.shape.update();

          this.facade.setSelection([this.shape]);
          this.facade.getCanvas().update();
          // make the node (been hidden since created) visible after update
          if (this.shape instanceof WAPAMA.Core.Node) {
            this.shape.setVisible(true);
          }
          // BUG-UI-003303 Property pane is always stuck when we drag a shape to canvas
          this.facade.updateSelection('fromCreate');

          this.facade.raiseEvent({type:WAPAMA.CONFIG.EVENT_DROP_SHAPE, shape:this.shape});
          
          if (this.option.isShapeWithNoNeedCheckRole) {
              var shapeNodeParent = this.shape.node.parentNode;
              shapeNodeParent.insertBefore(this.shape.node, shapeNodeParent.firstChild);
          }

          //this.currentParent.update();
          //this.shape.update();

          this.facade.setSelection([this.shape]);
          this.facade.getCanvas().update();

        },
        rollback: function(){
          this.facade.deleteShape(this.shape);

          //this.currentParent.update();

          this.facade.setSelection(this.selection.without(this.shape));
          this.facade.getCanvas().update();

          // make the node (been hidden since created) visible after update
          if (this.shape instanceof WAPAMA.Core.Node) {
            this.shape.setVisible(true);
          }
          this.facade.updateSelection();
        }
      });

      var position = {x: pos.x, y: pos.y};

//      var currentParent = null;
//      var canAttach = false;
      var command = new commandClass(option, this._currentParent, this._canAttach, position, this.facade);

      facade.executeCommands([command]);
    
      this._currentParent = undefined;
    }
    catch (err)
    {
        WAPAMA.Log.warn(err);
    }
  },
  beforeDragOver: function(dragObj, event){
    try {
        var coord = {
                x: event.clientX, 
                y : event.clientY
        };
        
        var a = this.facade.getCanvas().node.getScreenCTM();
            
            // Correcting the UpperLeft-Offset
        coord.x -= a.e; coord.y -= a.f;
            // Correcting the Zoom-Faktor
        coord.x /= a.a; coord.y /= a.d;
      var aShapes = this.facade.getCanvas().getAbstractShapesAtPosition( coord );
      if(aShapes.length <= 0) {
                /*
          var pr = dragZone.getProxy();
          pr.setStatus(pr.dropNotAllowed);
          pr.sync();
        */
        return false;
      } 
    
      var el = aShapes.last();
      // check containment rules
      // Ludwig

      //var stencilSet = this.facade.getStencilSets()[option.namespace];
      var facadeStencilSets = this.facade.getStencilSets();
      var facadeStencilSet = null;
      var facadeKey = null;
      for(var k in facadeStencilSets) {
        facadeKey = k;
        facadeStencilSet = facadeStencilSets[k];
        break;
      }
      var stencilSet = this.facade.getStencilSets()["io_#"];
      //var stencil = stencilSet.stencil("io_#" + dragObj.stencilId);//option.type);
      var stencil = facadeStencilSet._availableStencils[facadeKey + dragObj.stencilId]._jsonStencil;

      if(stencil.type === "node") {
          var parentCandidate = aShapes.reverse().find(function(candidate) {
          return (candidate instanceof WAPAMA.Core.Canvas 
              || candidate instanceof WAPAMA.Core.Node
              || candidate instanceof WAPAMA.Core.Edge);
        });
      
      
        if(  parentCandidate !== this._lastOverElement){
        
          this._canAttach  = undefined;
          this._canContain = undefined;
        
        }
        if( parentCandidate ) {
            // To fix BUG-WAPAMA-000374, Group shape can't contain other shapes.
            if (!this.needCheckRules(parentCandidate, stencil)) {
                return;
            }
          //check containment rule          
        
          if (!(parentCandidate instanceof WAPAMA.Core.Canvas) && parentCandidate.isPointOverOffset(coord.x, coord.y) && this._canAttach == undefined) {
            this._canAttach = this.facade.getRules().canConnect({
                        sourceShape: parentCandidate,
                        edgeStencil: stencil,
                        targetStencil: stencil
                      });
          
            if( this._canAttach ){
              // Show Highlight
              this.facade.raiseEvent({
                type: WAPAMA.CONFIG.EVENT_HIGHLIGHT_SHOW,
                highlightId: "shapeRepo.attached",
                elements: [parentCandidate],
                style: WAPAMA.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE,
                color: WAPAMA.CONFIG.SELECTION_VALID_COLOR
              });
            
              this.facade.raiseEvent({
                type: WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE,
                highlightId: "shapeRepo.added"
              });
            
              this._canContain  = undefined;
            }           
          
          }
        
          if(!(parentCandidate instanceof WAPAMA.Core.Canvas) && !parentCandidate.isPointOverOffset(coord.x, coord.y)){
            this._canAttach   = this._canAttach == false ? this._canAttach : undefined;
          }

          if( this._canContain == undefined && !this._canAttach) {
            var collapseSubprocess;
            var stencilId = parentCandidate.getStencil().id();
            if (stencilId == "io_#business_collapsed_subprocess" || stencilId == 'io_#business_expanded_subprocess' || stencilId.indexOf("CollapsedSubprocess") > -1 || stencilId.indexOf('Subprocess') > -1) {
              collapseSubprocess = new WAPAMA.Plugins.CollapseSubprocess(this.facade ,parentCandidate);
            }
            if (collapseSubprocess && collapseSubprocess.isCollapsed) {
              //When collapsed subprocess is collpased, should not allow to add any shapes.
              this._canContain = false;
            } else {
              this._canContain = this.facade.getRules().canContain({
                  containingShape:parentCandidate, 
                  containedStencil:stencil
                  });
            }
                            
            // Show Highlight
            this.facade.raiseEvent({
                              type:   WAPAMA.CONFIG.EVENT_HIGHLIGHT_SHOW, 
                              highlightId:'shapeRepo.added',
                              elements: [parentCandidate],
                              color:    this._canContain ? WAPAMA.CONFIG.SELECTION_VALID_COLOR : WAPAMA.CONFIG.SELECTION_INVALID_COLOR
                            }); 
            this.facade.raiseEvent({
                              type:     WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE,
                              highlightId:"shapeRepo.attached"
                            });           
          }
          
      
        
          this._currentParent = this._canContain || this._canAttach ? parentCandidate : undefined;
          this._lastOverElement = parentCandidate;
          //var pr = dragZone.getProxy();
          //pr.setStatus(this._currentParent ? pr.dropAllowed : pr.dropNotAllowed );
          //pr.sync();

        } 
      } else { //Edge
        this._currentParent = this.facade.getCanvas();
        //var pr = dragZone.getProxy();
        //pr.setStatus(pr.dropAllowed);
        //pr.sync();
      }   
      return false;
    }
    catch (err) 
    {
        WAPAMA.Log.warn(err);
    }
  },
  /**
     * Check if it is necessary to check rules.
     * 
     * @param   targetShape    the candidate shape to contain new dragged shape
     * @param   shapeStencil   the new dragged shape stencil
     * @return  true if it needs to check rules; false otherwise.
     */
    needCheckRules: function(targetShape, shapeStencil) {
        var needCheckRules = true;
        var namespace = shapeStencil.namespace;
        this._isShapeWithNoNeedCheckRole = false;

        // Check if current dragged shape contains no need check role.
        var draggedShapeRoles = this.facade.getRules()._getStencilById(shapeStencil.id).roles() || "";;
        if (draggedShapeRoles && draggedShapeRoles instanceof Array) {
            draggedShapeRoles = draggedShapeRoles.join(",");
        }
        var noNeedCheckRoles = WAPAMA.CONFIG.ROLES_NO_NEED_CHECK;
        var checkRegex = new RegExp("(^|,)" + namespace + "(" + noNeedCheckRoles.replace(/,/g, "|") + ")" + "(,|$)");
        if (checkRegex.test(draggedShapeRoles)) {
            this._isShapeWithNoNeedCheckRole = true;
            needCheckRules = false;
        }
        
        if (needCheckRules) {
            // Check if target shape contains no need check role.
            var stencil = this.facade.getRules()._getStencilById(targetShape.getStencil().id());
            var roles = stencil.roles() || "";
            if (roles && roles instanceof Array) {
                roles = roles.join(",");
            }
            if (!(targetShape instanceof WAPAMA.Core.Canvas) && checkRegex.test(roles)) {
                needCheckRules = false;
            }
        }
        
        if (!needCheckRules) {
            // Doesn't need to check rules. Set attributes of this object to keep track at the next move event.
            this._canContain = true;
            this._currentParent = this.facade.getCanvas();
        }
        return needCheckRules;
    }
}

WAPAMA.Plugins.ShapeRepository = Clazz.extend(WAPAMA.Plugins.ShapeRepository);
