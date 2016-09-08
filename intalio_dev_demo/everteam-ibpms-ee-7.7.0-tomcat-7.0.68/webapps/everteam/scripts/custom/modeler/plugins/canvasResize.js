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

if (!WAPAMA.Plugins) {
    WAPAMA.Plugins = new Object();
}

/**
 * This plugin is responsible for resizing the canvas.
 * @param {Object} facade The editor plugin facade to register enhancements with.
 */
WAPAMA.Plugins.CanvasResize = Clazz.extend({

    construct: function(facade){
    
        this.facade = facade;

    new WAPAMA.Plugins.CanvasResizeButton( this.facade.getCanvas(), "N", this.resize.bind(this));
    new WAPAMA.Plugins.CanvasResizeButton( this.facade.getCanvas(), "W", this.resize.bind(this));
    new WAPAMA.Plugins.CanvasResizeButton( this.facade.getCanvas(), "E", this.resize.bind(this));
    new WAPAMA.Plugins.CanvasResizeButton( this.facade.getCanvas(), "S", this.resize.bind(this));

    },
    
    resize: function( position, shrink ){
      
      resizeCanvas = function(position, extentionSize, facade) {
          var canvas    = facade.getCanvas();
        var b       = canvas.bounds;
        var scrollNode  = facade.getCanvas().getHTMLContainer().parentNode.parentNode;
        //console.log("CanvasResize - ", position)
        if( position == "E" || position == "W"){
          canvas.setSize({width: (b.width() + extentionSize)*canvas.zoomLevel, height: (b.height())*canvas.zoomLevel})

        } else if( position == "S" || position == "N"){
          canvas.setSize({width: (b.width())*canvas.zoomLevel, height: (b.height() + extentionSize)*canvas.zoomLevel})
        }

        if( position == "N" || position == "W"){
          
          var move = position == "N" ? {x: 0, y: extentionSize}: {x: extentionSize, y: 0 };

          // Move all children
          canvas.getChildNodes(false, function(shape){ shape.bounds.moveBy(move) })
          // Move all dockers, when the edge has at least one docked shape
          var edges = canvas.getChildEdges().findAll(function(edge){ return edge.getAllDockedShapes().length > 0})
          var dockers = edges.collect(function(edge){ return edge.dockers.findAll(function(docker){ return !docker.getDockedShape() })}).flatten();
          dockers.each(function(docker){ docker.bounds.moveBy(move)})
        } else if( position == "S" ){
          scrollNode.scrollTop += extentionSize;
        } else if( position == "E" ){
          scrollNode.scrollLeft += extentionSize;
        }
        
        canvas.update();
        facade.updateSelection();
        }
    
    var commandClass = WAPAMA.Core.Command.extend({
      construct: function(position, extentionSize, facade){
        this.position = position;
        this.extentionSize = extentionSize;
        this.facade = facade;
      },      
      execute: function(){
        resizeCanvas(this.position, this.extentionSize, this.facade);
      },
      rollback: function(){
        resizeCanvas(this.position, -this.extentionSize, this.facade);
      },
      update:function(){
      }
    });
    
    var extentionSize = WAPAMA.CONFIG.CANVAS_RESIZE_INTERVAL;
    if(shrink) extentionSize = -extentionSize;
    var command = new commandClass(position, extentionSize, this.facade);
    
    this.facade.executeCommands([command]);
      
    }
    
});


WAPAMA.Plugins.CanvasResizeButton = Clazz.extend({
  
  construct: function(canvas, position, callback){

    this.canvas = canvas;
    var parentNode = canvas.getHTMLContainer().parentNode.parentNode.parentNode;
    
    window.myParent=parentNode
    var scrollNode   = parentNode;
        var svgRootNode = canvas.getHTMLContainer().parentNode;
    // The buttons
    var buttonGrow  = WAPAMA.Editor.graft("http://www.w3.org/1999/xhtml", parentNode, ['div', { 'class': 'canvas_resize_indicator canvas_resize_indicator_grow' + ' ' + position ,'title':WAPAMA.I18N.RESIZE.tipGrow+WAPAMA.I18N.RESIZE[position]}]);
    var buttonShrink  = WAPAMA.Editor.graft("http://www.w3.org/1999/xhtml", parentNode, ['div', { 'class': 'canvas_resize_indicator canvas_resize_indicator_shrink' + ' ' + position ,'title':WAPAMA.I18N.RESIZE.tipShrink+WAPAMA.I18N.RESIZE[position]}]);
    
    // Defines a callback which gives back
    // a boolean if the current mouse event 
    // is over the particular button area
    var offSetWidth = 60;
    var isOverOffset = function(event){
      
      if(event.target!=parentNode && event.target!=scrollNode&& event.target!=scrollNode.firstChild&& event.target!=svgRootNode&& event.target!=scrollNode)
        return false;
      
      //if(inCanvas){offSetWidth=30}else{offSetWidth=30*2}
      //Safari work around
      var X=event.layerX
      var Y=event.layerY
      if((X - scrollNode.scrollLeft)<0 ||WAPAMA.UI.isSafari()){ X+=scrollNode.scrollLeft;}
      if((Y - scrollNode.scrollTop )<0 ||WAPAMA.UI.isSafari()){ Y+=scrollNode.scrollTop ;}

      if(position == "N"){
        return  Y < offSetWidth+scrollNode.firstChild.offsetTop;
      } else if(position == "W"){
        return X < offSetWidth + scrollNode.firstChild.offsetLeft;
      } else if(position == "E"){
        //other offset
        var offsetRight=(scrollNode.offsetWidth-(scrollNode.firstChild.offsetLeft + scrollNode.firstChild.offsetWidth));
        if(offsetRight<0)offsetRight=0;
        return X > scrollNode.scrollWidth-offsetRight-offSetWidth;
      } else if(position == "S"){
        //other offset
        var offsetDown=(scrollNode.offsetHeight-(scrollNode.firstChild.offsetTop  + scrollNode.firstChild.offsetHeight));
        if(offsetDown<0)offsetDown=0;

        return Y > scrollNode.scrollHeight -offsetDown- offSetWidth;
      }
      
      return false;
    }
    
    var showButtons = (function() {
      buttonGrow.show(); 
      
      var x1, y1, x2, y2;
      try {
        var bb = this.canvas.getRootNode().childNodes[1].getBBox();
        x1 = bb.x;
        y1 = bb.y;
        x2 = bb.x + bb.width;
        y2 = bb.y + bb.height;
      } catch(e) {
        this.canvas.getChildShapes(true).each(function(shape) {
          var absBounds = shape.absoluteBounds();
          var ul = absBounds.upperLeft();
          var lr = absBounds.lowerRight();
          if(x1 == undefined) {
            x1 = ul.x;
            y1 = ul.y;
            x2 = lr.x;
            y2 = lr.y;
          } else {
            x1 = Math.min(x1, ul.x);
            y1 = Math.min(y1, ul.y);
            x2 = Math.max(x2, lr.x);
            y2 = Math.max(y2, lr.y);
          }
        });
      }
      
      var w = canvas.bounds.width();
      var h = canvas.bounds.height();
      
      var isEmpty = canvas.getChildNodes().size()==0;
    
      if(position=="N" && (y1>WAPAMA.CONFIG.CANVAS_RESIZE_INTERVAL || (isEmpty && h>WAPAMA.CONFIG.CANVAS_RESIZE_INTERVAL))) buttonShrink.show();
      else if(position=="E" && (w-x2)>WAPAMA.CONFIG.CANVAS_RESIZE_INTERVAL) buttonShrink.show();
      else if(position=="S" && (h-y2)>WAPAMA.CONFIG.CANVAS_RESIZE_INTERVAL) buttonShrink.show();
      else if(position=="W" && (x1>WAPAMA.CONFIG.CANVAS_RESIZE_INTERVAL || (isEmpty && w>WAPAMA.CONFIG.CANVAS_RESIZE_INTERVAL))) buttonShrink.show();
      else buttonShrink.hide();
    }).bind(this);
    

    var hideButtons = function() {
      //buttonGrow.hide(); 
      //buttonShrink.hide();
      $(buttonGrow).style.display = 'none';
      $(buttonShrink).style.display = 'none';
    } 
    
    // If the mouse move is over the button area, show the button
    scrollNode.addEventListener(  WAPAMA.CONFIG.EVENT_MOUSEMOVE,  function(event){ if( isOverOffset(event) ){showButtons();} else {hideButtons()}} , false );
    // If the mouse is over the button, show them
    buttonGrow.addEventListener(    WAPAMA.CONFIG.EVENT_MOUSEOVER,  function(event){showButtons();}, true );
    buttonShrink.addEventListener(    WAPAMA.CONFIG.EVENT_MOUSEOVER,  function(event){showButtons();}, true );
    // If the mouse is out, hide the button
    //scrollNode.addEventListener(    WAPAMA.CONFIG.EVENT_MOUSEOUT,   function(event){button.hide()}, true )
    parentNode.addEventListener(  WAPAMA.CONFIG.EVENT_MOUSEOUT,   function(event){hideButtons()} , true );
    //svgRootNode.addEventListener( WAPAMA.CONFIG.EVENT_MOUSEOUT,   function(event){ inCanvas = false } , true );
    
    // Hide the button initialy
    hideButtons();
    
    // Add the callbacks
    buttonGrow.addEventListener('click', function(){callback( position ); showButtons();}, true);
    buttonShrink.addEventListener('click', function(){callback( position, true ); showButtons();}, true);
  }
  

});