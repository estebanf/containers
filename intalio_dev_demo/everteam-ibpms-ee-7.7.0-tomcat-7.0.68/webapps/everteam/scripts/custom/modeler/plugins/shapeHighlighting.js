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

WAPAMA.Plugins.ShapeHighlighting = Clazz.extend({

  construct: function(facade) {
    this.parentNode = facade.getCanvas().getSvgContainer();
    
    // The parent Node
    this.node = WAPAMA.Editor.graft("http://www.w3.org/2000/svg", this.parentNode,
          ['g']);

    this.highlightNodes = {};
    
    facade.registerOnEvent(WAPAMA.CONFIG.EVENT_HIGHLIGHT_SHOW, this.setHighlight.bind(this));
    facade.registerOnEvent(WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE, this.hideHighlight.bind(this));    

  },

  setHighlight: function(options) {
    if(options && options.highlightId){
        var highlightingPlugin = this;
      var nodes = this.highlightNodes[options.highlightId];
      
      var elements = options.elements;
      
      if(!nodes || !(nodes instanceof Array) || nodes.length < 1){
        nodes = [];
        elements.each(function() {
            var newNode = WAPAMA.Editor.graft("http://www.w3.org/2000/svg", highlightingPlugin.node,
                        ['path', {
                            "stroke-width": 2.0, "fill":"none"
                            }]);
            nodes.push(newNode);
        })
        this.highlightNodes[options.highlightId] = nodes;
      } else if (nodes.length > 0 && nodes.length < elements.length) {
          var count = elements.length - nodes.length;
          for (var i = 0;i < count; i++) {
              var newNode = WAPAMA.Editor.graft("http://www.w3.org/2000/svg", highlightingPlugin.node,
                            ['path', {
                                "stroke-width": 2.0, "fill":"none"
                                }]);
                    nodes.push(newNode);
          }
      }
      
      
      if(options.elements && options.elements.length > 0) {
        this.setAttributesByStyle( nodes, options );
        this.show(nodes, options);
      
      } else {
      
        this.hide(nodes);     
      
      }
      
    }
  },
  
  hideHighlight: function(options) {
    if(options && options.highlightId && this.highlightNodes[options.highlightId]){
      this.hide(this.highlightNodes[options.highlightId]);
    }   
  },
  
  hide: function(nodes) {
      nodes.each(function(ele) {
            ele.setAttributeNS(null, 'display', 'none');
      })
  },

  show: function(nodes, options) {
      var targets = $A(options.elements);
      nodes.each(function(ele, idx) {
          var display = "none";
          if (idx < targets.length) {
              display = "";
          }
          ele.setAttributeNS(null, 'display', display);
        })
  },
  
  setAttributesByStyle: function( nodes, options ){
      var node = nodes[0];
    
    // If the style say, that it should look like a rectangle
    if( options.style && options.style == WAPAMA.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE ){
      
      // Set like this
        var targets = $A(options.elements);
        var strWidth = options.strokewidth ? options.strokewidth    : WAPAMA.CONFIG.BORDER_OFFSET;
        var highlightingPlugin = this;
            nodes.each(function(ele, idx) {
                if (idx < targets.length) {
                    var bo = targets[idx].absoluteBounds();
                    ele.setAttributeNS(null, "d", highlightingPlugin.getPathRectangle( bo.a, bo.b , strWidth ) );
                    ele.setAttributeNS(null, "stroke",         options.color       ? options.color         : WAPAMA.CONFIG.SELECTION_HIGHLIGHT_COLOR);
                    ele.setAttributeNS(null, "stroke-opacity", options.opacity     ? options.opacity       : 0.2);
                    ele.setAttributeNS(null, "stroke-width",   strWidth);
                }
            })
    } else if(options.elements.length == 1 
          && options.elements[0] instanceof WAPAMA.Core.Edge &&
          options.highlightId != "selection") {
      
      /* Highlight containment of edge's childs */
      node.setAttributeNS(null, "d", this.getPathEdge(options.elements[0].dockers));
      node.setAttributeNS(null, "stroke", options.color ? options.color : WAPAMA.CONFIG.SELECTION_HIGHLIGHT_COLOR);
      node.setAttributeNS(null, "stroke-opacity", options.opacity ? options.opacity : 0.2);
      node.setAttributeNS(null, "stroke-width",   WAPAMA.CONFIG.OFFSET_EDGE_BOUNDS);
      
    } else {
      // If not, set just the corners
      node.setAttributeNS(null, "d", this.getPathByElements(options.elements));
      node.setAttributeNS(null, "stroke", options.color ? options.color : WAPAMA.CONFIG.SELECTION_HIGHLIGHT_COLOR);
      node.setAttributeNS(null, "stroke-opacity", options.opacity ? options.opacity : 1.0);
      node.setAttributeNS(null, "stroke-width",   options.strokewidth ? options.strokewidth   : 2.0);
            
    }
  },
  
  getPathByElements: function(elements){
    if(!elements || elements.length <= 0) {return undefined}
    
    // Get the padding and the size
    var padding = WAPAMA.CONFIG.SELECTED_AREA_PADDING;
    
    var path = ""
    
    // Get thru all Elements
    elements.each((function(element) {
      if(!element) {return}
      // Get the absolute Bounds and the two Points
      var bounds = element.absoluteBounds();
      bounds.widen(padding)
      var a = bounds.upperLeft();
      var b = bounds.lowerRight();
      
      path = path + this.getPath(a ,b);
                        
    }).bind(this));

    return path;
    
  },

  getPath: function(a, b){
        
    return this.getPathCorners(a, b);
  
  },
      
  getPathCorners: function(a, b){

    var size = WAPAMA.CONFIG.SELECTION_HIGHLIGHT_SIZE;
        
    var path = ""

    // Set: Upper left 
    path = path + "M" + a.x + " " + (a.y + size) + " l0 -" + size + " l" + size + " 0 ";
    // Set: Lower left
    path = path + "M" + a.x + " " + (b.y - size) + " l0 " + size + " l" + size + " 0 ";
    // Set: Lower right
    path = path + "M" + b.x + " " + (b.y - size) + " l0 " + size + " l-" + size + " 0 ";
    // Set: Upper right
    path = path + "M" + b.x + " " + (a.y + size) + " l0 -" + size + " l-" + size + " 0 ";
    
    return path;
  },
  
  getPathRectangle: function(a, b, strokeWidth){

    var size = WAPAMA.CONFIG.SELECTION_HIGHLIGHT_SIZE;

    var path  = ""
    var offset  = strokeWidth / 2.0;
     
    // Set: Upper left 
    path = path + "M" + (a.x + offset) + " " + (a.y);
    path = path + " L" + (a.x + offset) + " " + (b.y - offset);
    path = path + " L" + (b.x - offset) + " " + (b.y - offset);
    path = path + " L" + (b.x - offset) + " " + (a.y + offset);
    path = path + " L" + (a.x + offset) + " " + (a.y + offset);

    return path;
  },
  
  getPathEdge: function(edgeDockers) {
    var length = edgeDockers.length;
    var path = "M" + edgeDockers[0].bounds.center().x + " " 
          +  edgeDockers[0].bounds.center().y;
    
    for(i=1; i<length; i++) {
      var dockerPoint = edgeDockers[i].bounds.center();
      path = path + " L" + dockerPoint.x + " " +  dockerPoint.y;
    }
    
    return path;
  }
  
});

 
WAPAMA.Plugins.HighlightingSelectedShapes = Clazz.extend({

  construct: function(facade) {
    this.facade = facade;
    this.opacityFull = 0.9;
    this.opacityLow = 0.4;

    // Register on Dragging-Events for show/hide of ShapeMenu
    //this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_DRAGDROP_START, this.hide.bind(this));
    //this.facade.registerOnEvent(WAPAMA.CONFIG.EVENT_DRAGDROP_END,  this.show.bind(this));   
  },

  /**
   * @Deprecated
   * On the Selection-Changed
   *
   */
  onSelectionChanged: function(event) {
    if(event.elements && event.elements.length > 1) {
      this.facade.raiseEvent({
                    type:   WAPAMA.CONFIG.EVENT_HIGHLIGHT_SHOW, 
                    highlightId:'selection',
                    elements: event.elements.without(event.subSelection),
                    color:    WAPAMA.CONFIG.SELECTION_HIGHLIGHT_COLOR,
                    opacity:  !event.subSelection ? this.opacityFull : this.opacityLow
                  });

      if(event.subSelection){
        this.facade.raiseEvent({
                      type:   WAPAMA.CONFIG.EVENT_HIGHLIGHT_SHOW, 
                      highlightId:'subselection',
                      elements: [event.subSelection],
                      color:    WAPAMA.CONFIG.SELECTION_HIGHLIGHT_COLOR,
                      opacity:  this.opacityFull
                    }); 
      } else {
        this.facade.raiseEvent({type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'subselection'});        
      }           
      
    } else {
      this.facade.raiseEvent({type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'selection'});
      this.facade.raiseEvent({type:WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'subselection'});
    }   
  }
});