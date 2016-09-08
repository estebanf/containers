/**
 * Copyright (c) 2008
 * Willi Tscheschner
 * Copyright (c) 2009-2011 Intalio, Inc.
 * 
 **/

if(!WAPAMA){ var WAPAMA = {} }
if(!WAPAMA.Plugins){ WAPAMA.Plugins = {} }

/**
   This abstract plugin class can be used to build plugins on.
   It provides some more basic functionality like registering events (on*-handlers)...
   @example
    WAPAMA.Plugins.MyPlugin = WAPAMA.Plugins.AbstractPlugin.extend({
        construct: function() {
            // Call super class constructor
            arguments.callee.$.construct.apply(this, arguments);
            
            [...]
        },
        [...]
    });
   
   @class WAPAMA.Plugins.AbstractPlugin
   @constructor Creates a new instance
   @author Willi Tscheschner
*/
WAPAMA.Plugins.AbstractPlugin = Clazz.extend({
    /** 
     * The facade which offer editor-specific functionality
     * @type Facade
     * @memberOf WAPAMA.Plugins.AbstractPlugin.prototype
     */
  facade: null,
  
  construct: function( facade ){
    this.facade = facade;   
    this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_LOADED, this.onLoaded.bind(this));
  },
        
    /**
       Overwrite to handle load event. TODO: Document params!!!
       @methodOf WAPAMA.Plugins.AbstractPlugin.prototype
    */
  onLoaded: function(){},
  
    /**
       Overwrite to handle selection changed event. TODO: Document params!!!
       @methodOf WAPAMA.Plugins.AbstractPlugin.prototype
    */
  onSelectionChanged: function(){},    
  
  /**
   * Raises an event so that registered layouters does
   * have the posiblility to layout the given shapes 
   * For further reading, have a look into the AbstractLayouter
   * class
   * @param {Object} shapes
   */
  doLayout: function(shapes){
    // Raises a do layout event
    this.facade.raiseEvent({
      type    : WAPAMA.CONFIG.EVENT_LAYOUT,
      shapes    : shapes
    });
  },
  
  
  /**
   * Does a primitive layouting with the incoming/outgoing 
   * edges (set the dockers to the right position) and if 
   * necessary, it will be called the real layouting 
   * @param {WAPAMA.Core.Node} node
   * @param {Array} edges
   */
  layoutEdges : function(node, allEdges, offset){   
    
    // Find all edges, which are related to the node and
    // have more than two dockers
    var edges = allEdges
      // Find all edges with more than two dockers
      .findAll(function(r){ return r.dockers.length > 2 }.bind(this))
      
    if (edges.length > 0) {
                    
      // Get the new absolute center
      var center = node.absoluteXY();
      
      var ulo = {x: center.x - offset.x, y:center.y - offset.y}     
      
      center.x += node.bounds.width()/2;
      center.y += node.bounds.height()/2;
      
      // Get the old absolute center
      oldCenter = Object.clone(center);
      oldCenter.x -= offset ? offset.x : 0;
      oldCenter.y -= offset ? offset.y : 0;
      
      var ul = {x: center.x - (node.bounds.width() / 2), y: center.y - (node.bounds.height() / 2)}
      var lr = {x: center.x + (node.bounds.width() / 2), y: center.y + (node.bounds.height() / 2)}
      
      
      /**
       * Align the bounds if the center is 
       * the same than the old center
       * @params {Object} bounds
       * @params {Object} bounds2
       */
      var align = function(bounds, bounds2){
        var xdif = bounds.center().x-bounds2.center().x;
        var ydif = bounds.center().y-bounds2.center().y;
        if (Math.abs(xdif) < 3){
          bounds.moveBy({x:(offset.xs?(((offset.xs*(bounds.center().x-ulo.x))+offset.x+ulo.x)-bounds.center().x):offset.x)-xdif, y:0});   
        } else if (Math.abs(ydif) < 3){
          bounds.moveBy({x:0, y:(offset.ys?(((offset.ys*(bounds.center().y-ulo.y))+offset.y+ulo.y)-bounds.center().y):offset.y)-ydif});   
        }
      };
                  
      /**           
       * Returns a TRUE if there are bend point which overlay the shape
       */
      var isBendPointIncluded = function(edge){
        // Get absolute bounds
        var ab = edge.dockers.first().getDockedShape();
        var bb = edge.dockers.last().getDockedShape();
        
        if (ab) {
          ab = ab.absoluteBounds();
          ab.widen(5);
        }
        
        if (bb) {
          bb = bb.absoluteBounds();
          bb.widen(20); // Wide with 20 because of the arrow from the edge
        }
        
        return edge.dockers
            .any(function(docker, i){ 
              var c = docker.bounds.center();
                  // Dont count first and last
              return  i != 0 && i != edge.dockers.length-1 && 
                  // Check if the point is included to the absolute bounds
                  ((ab && ab.isIncluded(c)) || (bb && bb.isIncluded(c)))
            })
      }
      // For every edge, check second and one before last docker
      // if there are horizontal/vertical on the same level
      // and if so, align the the bounds 
      edges.each(function(edge){
        if (edge.dockers.first().getDockedShape() === node){
          var second = edge.dockers[1];
          if (align(second.bounds, edge.dockers.first().bounds)){ second.update(); }
        } else if (edge.dockers.last().getDockedShape() === node) {
          var beforeLast = edge.dockers[edge.dockers.length-2];
          if (align(beforeLast.bounds, edge.dockers.last().bounds)){ beforeLast.update(); }                 
        }
        edge._update(true);
        edge.removeUnusedDockers();
        if (isBendPointIncluded(edge)){
          this.doLayout(edge);
          return;
        }
      }.bind(this))
    } 

    // Find all edges, which have only to dockers 
    // and is located horizontal/vertical.
    // Do layout with those edges
    allEdges.each(function(edge){
        // Find all edges with two dockers
        if (edge.dockers.length == 2){
          var p1 = edge.dockers.first().bounds.center();
          var p2 = edge.dockers.last().bounds.center();
          // Find all horizontal/vertical edges
          if (Math.abs(p1.x - p2.x) < 2 || Math.abs(p1.y - p2.y) < 2){
            edge.dockers.first().update();
            edge.dockers.last().update();
            this.doLayout(edge);
          }
        }
      }.bind(this));
  }
});