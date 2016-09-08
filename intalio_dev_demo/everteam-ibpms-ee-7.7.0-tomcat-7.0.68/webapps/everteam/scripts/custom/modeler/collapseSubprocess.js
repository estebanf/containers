/**
 * Copyright (C) 2005-2014 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

if (!WAPAMA.Plugins) 
    WAPAMA.Plugins = new Object();


WAPAMA.Plugins.CollapseSubprocess = Clazz.extend({

    facade: undefined,
    shapes: {},
    collapseShape: undefined,
    svgNode: undefined,
    
    construct: function(facade, collapseShape){
      this.facade = facade;
      this.collapseShape = collapseShape;
      if (!this.collapseShape || !(this.collapseShape instanceof WAPAMA.Core.Shape)) {
        return;
      }
      this.svgNode = this.collapseShape.svgNode;
      this.id = this.collapseShape.id;
      this.findCollapseButton();
      this.locateExpandCollapsePath();
      this.initCollapsedFlag();
    },
    
    findCollapseButton: function() {
      var hrefElems = this.svgNode.getElementsByTagName('a');
      var nodeId = this.svgNode.id;
      if (hrefElems.length > 0) {
        $j(hrefElems).each(function(index, elem) {
          if (elem.getAttribute('id') == nodeId + 'collapse') {
            this.collapseElem = elem;
            return false;
          }
        }.bind(this));
      }
      if (!this.collapseElem) {
        throw "Can not find the element to collapse a subprocess.";
      }
    },
    
    /**
     * Find the expand(plus symbol) and collapse(minus symbol) path,
     * need to show the related path depends on the state of this subprocess
     */
    locateExpandCollapsePath: function() {
      if (!this.collapseElem) {
        return;
      }
      var paths = this.collapseElem.getElementsByTagName('path');
      $j(paths).each(function(index, path){
        if ($j.inArray(path.getAttribute('id'), [this.id + 'expand', this.id + 'collapse']) >= 0) {
          var pathId = path.getAttributeNS(null, 'id');
          if (path.getAttributeNS(null, 'display') == 'inherit') {
            this.currentPath = path;
          }
          if (pathId == this.id + "expand") {
            this.expandPath = path;
          } else {
            this.collapsePath = path;
          }
        }
      }.bind(this));
    },
    
    initCollapsedFlag: function() {
      if (!this.collapseElem) {
        return;
      }
      var currentState = "expanded";
      
      var paths = this.collapseElem.getElementsByTagName('path');
      $j(paths).each(function(index, path){
        if ($j.inArray(path.getAttribute('id'), [this.id + 'expand', this.id + 'collapse']) >= 0) {
          var pathId = path.getAttributeNS(null, 'id');
          if (path.getAttributeNS(null, 'display') == 'inherit') {
            //If current shown path is expand, it means user can click expand to expand subprocess, current state should be collapsed.
            if (pathId == this.id + "expand") {
              currentState = "collapsed";
            }
          }
        }
      }.bind(this));
      
      this.isCollapsed = currentState == "collapsed" ? true : false;
    },
    
    setCollapsed: function(collapse, force) {
      if (!force && this.isCollapsed == collapse) {
        return;
      }
      if (collapse) {
        //If set to collapsed, need to hide collapse path, and show expand path
        //this.expandPath.setAttributeNS(null, 'display', 'inherit');
        this.expandPath.setAttributeNS(null, 'display', 'none');
        this.collapsePath.setAttributeNS(null, 'display', 'none');
      } else {
        this.expandPath.setAttributeNS(null, 'display', 'none');
        this.collapsePath.setAttributeNS(null, 'display', 'none');
        //this.collapsePath.setAttributeNS(null, 'display', 'inherit');
      }
      
      this.isCollapsed = collapse;
      
      this.toggleChildrenShapesVisiblity();
    },
    
    /**
     * Change the children shapes visibility, if the subprocess is collapsed,
     * need to hide all children shapes
     */
    toggleChildrenShapesVisiblity: function() {
      var isCollapsed = this.isCollapsed;
      //Find out all nodes
      var childShapes = this.collapseShape.getChildShapes(true);
      $j(childShapes).each(function(index, shape){
        if (isCollapsed) {
          shape.setVisible(false);
        } else {
          shape.setVisible(true);
        }
      }.bind(this));
      
      //Find out all edges
      var layoutPlugin = this.facade.getPlugin('WAPAMA.Plugins.Layouter.EdgeLayouter');
      var edges = layoutPlugin.findRelatedEdges(this.collapseShape, []);
      edges.each(function(edge) {
        if (isCollapsed) {
          edge.setVisible(false);
        } else {
          edge.setVisible(true);
        }
      });
    },
    
    /**
     * Get the original size stored in the svg attribute, we use this to expand/collapse subprocess to correct size
     * @returns The original size
     */
    getOriginalSize: function() {
      var originalSize = this.svgNode.getAttribute("originalSize");
      originalSize = originalSize.split(' ');
      return {
        width : originalSize[0],
        height : originalSize[1]
      };
    },
    
    /**
     * The the value of original size attribute of the svg
     */
    setOriginalSize: function(originalSize) {
      if (originalSize && originalSize.width && originalSize.height) {
        this.svgNode.setAttribute("originalSize", originalSize.width + ' ' + originalSize.height);
      }
    },

    registerClickEvent: function() {
      if (this.collapseElem) {
        //When mouse over, show pointer mouse
        this.collapseElem.onmouseover = function() {
          this.collapseElem.setAttributeNS(null, "cursor", "pointer");
        }.bind(this);
        //When mouse out, show normal mouse
        this.collapseElem.onmouseout = function() {
          this.collapseElem.setAttributeNS(null, "cursor", "");
        }.bind(this);
        this.collapseElem.onclick = function(e) {
          var shapes = this.getShapesAffected();
          var command = new WAPAMA.Plugins.CollapseExpandSubprocessCommand(this.facade, this.collapseShape, shapes, this.collapseElem, this);
          this.facade.executeCommands([ command ]);
          return false;
        }.bind(this);
      }
    },
    
    /**
     * Get all the shapes this subprocess collapse/expand will affect, 
     * split to 8 categories: top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight
     */
    getShapesAffected: function() {
      var currentBounds = this.collapseShape.bounds;
      var canvas = this.facade.getCanvas();
      var elements = canvas.getChildShapes(false);
      var shapes = {
          top : [],
          bottom : [],
          left : [],
          right : [],
          topLeft : [],
          topRight : [],
          bottomLeft : [],
          bottomRight : []
      };
      var baseLeft = currentBounds.upperLeft().x;
      var baseTop = currentBounds.upperLeft().y;
      var baseRight = currentBounds.lowerRight().x;
      var baseBottom = currentBounds.lowerRight().y;
      // Get only nodes
      elements = elements.findAll(function(value) {
        return (value instanceof WAPAMA.Core.Node && value.id != this.collapseShape.id);
      }.bind(this));
      elements.each(function(shape){
        var bound = shape.absoluteBounds().clone();
        var left = bound.upperLeft().x;
        var top = bound.upperLeft().y;
        var right = bound.lowerRight().x;
        var bottom = bound.lowerRight().y;
        if ((left >= baseLeft && right <= baseRight) || (left < baseLeft && right > baseRight)) {
          if (top >= baseBottom) {
            shapes.bottom.push(shape);
          } else if (bottom <= baseTop) {
            shapes.top.push(shape);
          }
        } else if ((top >= baseTop && bottom <= baseBottom) || (top < baseTop && bottom > baseBottom)) {
          if (right <= baseLeft) {
            shapes.left.push(shape);
          } else if (left >= baseRight) {
            shapes.right.push(shape);
          }
        } else if (left < baseLeft) {
          if (top > baseBottom) {
            shapes.bottomLeft.push(shape);
          } else if (bottom < baseTop) {
            shapes.topLeft.push(shape);
          }
        } else if (right > baseRight) {
          if (top > baseBottom) {
            shapes.bottomRight.push(shape);
          } else if (bottom < baseTop) {
            shapes.topRight.push(shape);
          }
        }
      });
      return shapes;
    }
});

WAPAMA.Plugins.CollapseExpandSubprocessCommand = WAPAMA.Core.Command.extend({
  construct: function(facade, collapseShape, shapesAffected, element, plugin){
    this.facade = facade;
    this.collapseShape = collapseShape;
    this.plugin = plugin;
    
    this.shapes = shapesAffected;
    
    this.allShapes = [].concat(shapesAffected.right).concat(shapesAffected.bottom)
      .concat(shapesAffected.bottomRight).concat(shapesAffected.left)
      .concat(shapesAffected.top).concat(shapesAffected.bottomLeft)
      .concat(shapesAffected.topLeft).concat(shapesAffected.topRight).concat(this.collapseShape);
    
    this.bounds = this.collapseShape.absoluteBounds().clone();
    this.currentSize = {
        width : this.bounds.width(),
        height : this.bounds.height()
    };
    this.originalSize = this.plugin.getOriginalSize();
    
    this.originalCollapsed = this.plugin.isCollapsed;
    this.resizeCommand = null;
  },
  execute: function() {
    //If after expand subprocess, some shapes are out of canvas, need to move all the shapes
    this.minAdjustmentOffset = {
        x : 0,
        y : 0
    };
    this.bounds = this.collapseShape.bounds;  
    
    this.centerPos = {};
    this.centerPos.x = (this.bounds.upperLeft().x + this.bounds.lowerRight().x) / 2;
    this.centerPos.y = (this.bounds.upperLeft().y + this.bounds.lowerRight().y) / 2;
    
    var selectedShapes = this.facade.getSelection();
    
    var offset = {
        x : (this.originalSize.width - this.currentSize.width) / 2,
        y : (this.originalSize.height - this.currentSize.height) / 2
    };
    
    var dragDropResizePlugin = this.facade.getPlugin("WAPAMA.Plugins.DragDropResize");
    this.moveCommands = [];
    
    var leftShapesOffset = {
        x : 0 - offset.x,
        y : 0
    };
    
    var moveLeftCommands = new WAPAMA.Core.Command.Move(this.shapes.left, 
        leftShapesOffset, null, this.facade.getCanvas(), selectedShapes, dragDropResizePlugin, true);
    
    this.moveCommands.push(moveLeftCommands);
    
    var rightShapesOffset = {
        x : offset.x,
        y : 0
    };
    var moveRightCommands = new WAPAMA.Core.Command.Move(this.shapes.right, 
        rightShapesOffset, null, this.facade.getCanvas(), selectedShapes, dragDropResizePlugin, true);
    
    this.moveCommands.push(moveRightCommands);
    
    var topShapesOffset = {
        x : 0,
        y : 0 - offset.y
    };
    
    var moveTopCommands = new WAPAMA.Core.Command.Move(this.shapes.top, 
        topShapesOffset, null, this.facade.getCanvas(), selectedShapes, dragDropResizePlugin, true);
    
    this.moveCommands.push(moveTopCommands);
    
    var bottomShapesOffset = {
        x : 0,
        y : offset.y
    };
    var moveBottomCommands = new WAPAMA.Core.Command.Move(this.shapes.bottom, 
        bottomShapesOffset, null, this.facade.getCanvas(), selectedShapes, dragDropResizePlugin, true);
    
    this.moveCommands.push(moveBottomCommands);

    var topLeftShapesOffset = {
        x : 0 - offset.x,
        y : 0 - offset.y
    };
    var moveTopLeftCommands = new WAPAMA.Core.Command.Move(this.shapes.topLeft, 
        topLeftShapesOffset, null, this.facade.getCanvas(), selectedShapes, dragDropResizePlugin, true);
    
    this.moveCommands.push(moveTopLeftCommands);
    
    var bottomLeftShapesOffset = {
        x : 0 - offset.x,
        y : offset.y
    };
    var moveBottomLeftCommands = new WAPAMA.Core.Command.Move(this.shapes.bottomLeft, 
        bottomLeftShapesOffset, null, this.facade.getCanvas(), selectedShapes, dragDropResizePlugin, true);
    
    this.moveCommands.push(moveBottomLeftCommands);
    
    var topRightShapesOffset = {
        x : offset.x,
        y : 0 - offset.y
    };
    var moveTopRightCommands = new WAPAMA.Core.Command.Move(this.shapes.topRight, 
        topRightShapesOffset, null, this.facade.getCanvas(), selectedShapes, dragDropResizePlugin, true);
    
    this.moveCommands.push(moveTopRightCommands);
    
    var bottomRightShapesOffset = {
        x : offset.x,
        y : offset.y
    };
    var moveBottomRightCommands = new WAPAMA.Core.Command.Move(this.shapes.bottomRight, 
        bottomRightShapesOffset, null, this.facade.getCanvas(), selectedShapes, dragDropResizePlugin, true);
    
    this.moveCommands.push(moveBottomRightCommands);
    
    this.plugin.setCollapsed(!this.originalCollapsed);

    var newCollapseBounds = new WAPAMA.Core.Bounds({
        a : {
          x : this.centerPos.x - this.originalSize.width / 2,
          y : this.centerPos.y - this.originalSize.height / 2
        },
        b : {
          x : this.centerPos.x + this.originalSize.width / 2,
          y : this.centerPos.y + this.originalSize.height / 2
        }
    });
    
    this.resizeCommand = new WAPAMA.Core.Command.Resize(this.collapseShape, newCollapseBounds, dragDropResizePlugin);
    this.resizeCommand.execute();
    
    this.moveCommands.each(function(command) {
      command.execute();
    });
    
    var boundries = [];
    $j(this.allShapes).each(function(index, shape) {
      //Find the boundry
      var dockedNodes = shape.getAllDockedShapes().findAll(function(s) {return s instanceof WAPAMA.Core.Node});
      boundries = boundries.concat(dockedNodes);
    }.bind(this));
    
    //Move all the shapes if the shape out of canvas at left or top side.
    this.allShapes.each(function(shape) {
      var bounds = shape.absoluteBounds().clone();
      var x = bounds.upperLeft().x;
      var y = bounds.upperLeft().y;
      if (y < 0 && this.minAdjustmentOffset.y < Math.abs(y)) {
         this.minAdjustmentOffset.y = Math.abs(y);
      }
      if (x < 0 && this.minAdjustmentOffset.x < Math.abs(x)) {
         this.minAdjustmentOffset.x = Math.abs(x);
      }
    }.bind(this));
    
    if (this.minAdjustmentOffset.x > 0 || this.minAdjustmentOffset.y > 0) {
      this.adjustCommand = new WAPAMA.Core.Command.Move(this.allShapes, 
        this.minAdjustmentOffset, null, this.facade.getCanvas(), selectedShapes, dragDropResizePlugin, true);
      this.adjustCommand.execute();
    }
    //Resize the canvas if the shapes out of the canvas at the right or bottom position.
    var canvas = this.facade.getCanvas();
    this.originalCanvasSize = {
      width: canvas.bounds.width(),
      height: canvas.bounds.height()
    };
    var resize = {
      width: 0,
      height: 0
    };
    this.allShapes.each(function(shape) {
      var bounds = shape.absoluteBounds().clone();
      var x = bounds.lowerRight().x;
      var y = bounds.lowerRight().y;
      if (x > this.originalCanvasSize.width && resize.width < x - this.originalCanvasSize.width) {
        resize.width = x - this.originalCanvasSize.width;
      }
      if (y > this.originalCanvasSize.height && resize.width < y - this.originalCanvasSize.height) {
        resize.height = y - this.originalCanvasSize.height;
      }
    }.bind(this));
    this.resizeCanvas(resize);
    
    //Layout the edges of all the boundries.
    this.adjustBoundryCommand = new WAPAMA.Core.AdjustDockerCommand(boundries, dragDropResizePlugin);
    this.adjustBoundryCommand.execute();
    this.facade.updateSelection();
    this.facade.getCanvas().update();
    
    this.plugin.setOriginalSize(this.currentSize);
  },
  rollback: function() {
    this.resizeCanvas({width: 0, height: 0});
    if (this.adjustCommand) {
      this.adjustCommand.rollback();
    }
    this.moveCommands.each(function(command) {
      command.rollback();
    });

    this.plugin.setCollapsed(this.originalCollapsed);
    
    this.resizeCommand.rollback();
    this.plugin.setOriginalSize(this.originalSize);
  },
  
  resizeCanvas: function(newSize) {
    var canvas = this.facade.getCanvas();
    var newWidth = (this.originalCanvasSize.width + newSize.width) * canvas.zoomLevel;
    var newHeight = (this.originalCanvasSize.height + newSize.height) * canvas.zoomLevel;
    canvas.setSize({width: newWidth, height: newHeight}, true);
    this.facade.updateSelection();
  }
});

WAPAMA.Core.AdjustDockerCommand = WAPAMA.Core.Command.extend({
  construct: function(boundries, resizePlugin){
    this.shapes = boundries;
    this.dockers = {};
    this.resizePlugin = resizePlugin;
  },      
  execute: function() {
    this.shapes.each(function(shape) {
      // Find all the edges, incomings are the subprocess, no need them.
      var allEdges = [].concat(shape.getOutgoingShapes()).findAll(function(r){
        return (r instanceof WAPAMA.Core.Edge);
      });
      allEdges.each(function(edge) {
        var dockers = edge.getDockers();
        var length = dockers.length;
        if (length > 2) {
          $j(dockers).each(function(index) {
            if (index != 0 && index != length - 1) {
              edge.removeDocker(dockers[index]);
            }
          });
        }
        edge.refresh();
      });
      this.resizePlugin.doLayout([shape]);
    }.bind(this));
    
  },
  rollback: function(){
  }
});