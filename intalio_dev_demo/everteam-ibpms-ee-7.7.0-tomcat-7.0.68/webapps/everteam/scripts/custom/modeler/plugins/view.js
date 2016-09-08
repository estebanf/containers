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

/**
 * @namespace Wapama name space for plugins
 * @name WAPAMA.Plugins
*/
if(!WAPAMA.Plugins)
  WAPAMA.Plugins = new Object();

/**
 * The view plugin offers all of zooming functionality accessible over the 
 * tool bar. This are zoom in, zoom out, zoom to standard, zoom fit to model.
 * 
 * @class WAPAMA.Plugins.View
 * @extends Clazz
 * @param {Object} facade The editor facade for plugins.
*/
WAPAMA.Plugins.View = {
  /** @lends WAPAMA.Plugins.View.prototype */
  facade: undefined,

  construct: function(facade, ownPluginData) {
    this.facade = facade;
    //Standard Values
    this.zoomLevel = 1.0;
    
    //Deprecated attributes
    this.maxFitToScreenLevel=1.5;
    this.minZoomLevel = 0.1;
    this.maxZoomLevel = 2.5;
    
    this.ratios = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2];
    this.defaultRatioIndex = 5;
    var canvas    = this.facade.getCanvas();
    this.defaultCanvasWidth = canvas.bounds.width();
    this.defaultCanvasHeight = canvas.bounds.height();
    this.ratioIndex = this.defaultRatioIndex;
    
    this.diff=5; //difference between canvas and view port, s.th. like toolbar
    
    //Read properties
    if (ownPluginData.properties && ownPluginData.properties.length > 0) {
      ownPluginData.properties.each( function(property) {     
        if (property.zoomLevel) {this.zoomLevel = Number(1.0);}   
        if (property.maxFitToScreenLevel) {this.maxFitToScreenLevel=Number(property.maxFitToScreenLevel);}
        if (property.minZoomLevel) {this.minZoomLevel = Number(property.minZoomLevel);}
        if (property.maxZoomLevel) {this.maxZoomLevel = Number(property.maxZoomLevel);}
      }.bind(this));
    }
    
    var zoomInTitle = WAPAMA.UI.I18NTranslate(WAPAMA.I18N.View.zoomIn);
    
    var zoomOutTitle = WAPAMA.UI.I18NTranslate(WAPAMA.I18N.View.zoomOut);
    
    this.nextToI18NDes = WAPAMA.UI.I18NTranslate("Next to");
    
    /* Register zoom in */
    this.facade.offer({
      'name':WAPAMA.I18N.View.zoomIn,
      'functionality': function() {
          this.zoom(this.ratioIndex + 1);
      }.bind(this),
      "updateTitle": function(ele) {
          this.updateTitle(ele, zoomInTitle, this.ratioIndex + 1);
      }.bind(this),
      'group': WAPAMA.I18N.View.group,
      'icon': 'fa fa-eraser',
      'description': WAPAMA.I18N.View.zoomInDesc,
      'position': {
          "x": "0px",
          "y": "-192px"
      },
      'index': 1,
      'minShape': 0,
      'maxShape': 0,
      'isEnabled': function() {
          return this.ratioIndex < this.ratios.length - 1;
      }.bind(this)
    });
    
    /* Register zoom out */
    this.facade.offer({
      'name':WAPAMA.I18N.View.zoomOut,
      'functionality': function() {
                this.zoom(this.ratioIndex - 1);
            }.bind(this),
            "updateTitle": function(ele) {
                this.updateTitle(ele, zoomOutTitle, this.ratioIndex - 1);
            }.bind(this),
      'group': WAPAMA.I18N.View.group,
      'icon': 'fa fa-eraser',
      'position': {
          "x": "0px",
          "y": "-144px"
      },
      'description': WAPAMA.I18N.View.zoomOutDesc,
      'index': 2,
      'minShape': 0,
      'maxShape': 0,
      'isEnabled': function() {
          return this._checkSize() && this.ratioIndex > 0;
      }.bind(this)
    });
    
    /* Register zoom standard */
        this.facade.offer({
            'name':WAPAMA.I18N.View.zoomStandard,
            'functionality': function() {
                this.zoom(this.defaultRatioIndex);
            }.bind(this),
            'group': WAPAMA.I18N.View.group,
            'icon': 'fa fa-eraser',
            'position': {
                "x": "-52px",
                "y": "0px"
            },
            'description': WAPAMA.I18N.View.zoomStandardDesc,
            'index': 3,
            'minShape': 0,
            'maxShape': 0,
            'isEnabled': function() {
                return this.ratios[this.ratioIndex] != 1;
            }.bind(this)
        });
    
  },
  
  /**@Deprecated
   * It sets the zoom level to a fix value and call the zooming function.
   * 
   * @param {Number} zoomLevel
   *      the zoom level
   */
  setAFixZoomLevel : function(zoomLevel) {
    this.zoomLevel = zoomLevel;
    this._checkZoomLevelRange();
    this.zoom(1);
  },
  
  /**
   * Update button title by next ratio number.
   */
  updateTitle: function(ele, prefix, nextIdx) {
      if (!this.ratios[nextIdx]) {
          return;
      }
      var title = prefix + " (" + this.nextToI18NDes + " " + Math.floor(this.ratios[nextIdx] * 100) + "%)";
      //ele.title = prefix + " (Next to " + Math.floor(this.ratios[nextIdx] * 100) + "%)";
      ele.setAttribute("title",  title);
  },
  
  /**
   * It does the actual zooming. It changes the viewable size of the canvas 
   * and all to its child elements.
   * 
   * @param {Number} index
   *    the index in ratios to adjust the zoom level
   */
  zoom: function(index) {
    // TODO: Zoomen auf allen Objekten im SVG-DOM
    
      this.ratioIndex = index;
    this.zoomLevel = this.ratios[index];
    var scrollNode  = this.facade.getCanvas().getHTMLContainer().parentNode.parentNode;
    var canvas    = this.facade.getCanvas();
    var newWidth  = this.defaultCanvasWidth  * this.zoomLevel;
    var newHeight   = this.defaultCanvasWidth * this.zoomLevel;
    
    /* Set new top offset */
    //var offsetTop = (canvas.node.parentNode.parentNode.parentNode.offsetHeight - newHeight) / 2.0;  
    //offsetTop = offsetTop > 20 ? offsetTop - 20 : 0;
    //canvas.node.parentNode.parentNode.style.marginTop = offsetTop + "px";
    //offsetTop += 5;
    //canvas.getHTMLContainer().style.top = offsetTop + "px";
    
    /*readjust scrollbar
    var newScrollTop= scrollNode.scrollTop - Math.round((canvas.getHTMLContainer().parentNode.getHeight()-newHeight) / 2);
    var newScrollLeft=  scrollNode.scrollLeft - Math.round((canvas.getHTMLContainer().parentNode.getWidth()-newWidth) / 2);
    
    if (!scrollNode.scrollTop && this.zoomLevel <= 1) {
        newScrollTop = 0;
    }
    
    if (!scrollNode.scrollLeft && this.zoomLevel <= 1) {
        newScrollLeft = 0;
        }
        */
    
    /* Set new Zoom-Level */
    //console.log("view zoom")
    canvas.setSize({width: newWidth, height: newHeight}, true);
    
    /* Set Scale-Factor */
    canvas.node.setAttributeNS(null, "transform", "scale(" +this.zoomLevel+ ")"); 

    /* Refresh the Selection */
    this.facade.updateSelection();
    //scrollNode.scrollTop=newScrollTop;
    //scrollNode.scrollLeft=newScrollLeft;
    
    /* Update the zoom-level*/
    canvas.zoomLevel = this.zoomLevel;
  },
  
  
  /**
   * @Deprecated
   * It calculates the zoom level to fit whole model into the visible area
   * of the canvas. Than the model gets zoomed and the position of the 
   * scroll bars are adjusted.
   * 
   */
  zoomFitToModel: function() {
    
    /* Get the size of the visible area of the canvas */
    var scrollNode  = this.facade.getCanvas().getHTMLContainer().parentNode.parentNode;
    var visibleHeight = scrollNode.getHeight() - 30;
    var visibleWidth = scrollNode.getWidth() - 30;
    
    var nodes = this.facade.getCanvas().getChildShapes();
    
    if(!nodes || nodes.length < 1) {
      return false;     
    }
      
    /* Calculate size of canvas to fit the model */
    var bounds = nodes[0].absoluteBounds().clone();
    nodes.each(function(node) {
      bounds.include(node.absoluteBounds().clone());
    });
    
    
    /* Set new Zoom Level */
    var scaleFactorWidth =  visibleWidth / bounds.width();
    var scaleFactorHeight = visibleHeight / bounds.height();
    
    /* Choose the smaller zoom level to fit the whole model */
    var zoomFactor = scaleFactorHeight < scaleFactorWidth ? scaleFactorHeight : scaleFactorWidth;
    
    /*Test if maximum zoom is reached*/
    if(zoomFactor>this.maxFitToScreenLevel){zoomFactor=this.maxFitToScreenLevel}
    /* Do zooming */
    this.setAFixZoomLevel(zoomFactor);
    
    /* Set scroll bar position */
    scrollNode.scrollTop = Math.round(bounds.upperLeft().y * this.zoomLevel) - 5;
    scrollNode.scrollLeft = Math.round(bounds.upperLeft().x * this.zoomLevel) - 5;
    
  },
  
  /**
   * It checks if the zoom level is less or equal to the level, which is required
   * to schow the whole canvas.
   * 
   * @private
   */
  _checkSize:function(){
    //var canvasParent=this.facade.getCanvas().getHTMLContainer().parentNode;
    //var minForCanvas= Math.min((canvasParent.parentNode.getWidth()/canvasParent.getWidth()),(canvasParent.parentNode.getHeight()/canvasParent.getHeight()));
    //return 1.05 > minForCanvas;
      return true;
    
  },
  /**
   * @Deprecated
   * It checks if the zoom level is included in the defined zoom
   * level range.
   * 
   * @private
   */
  _checkZoomLevelRange: function() {
    /*var canvasParent=this.facade.getCanvas().getHTMLContainer().parentNode;
    var maxForCanvas= Math.max((canvasParent.parentNode.getWidth()/canvasParent.getWidth()),(canvasParent.parentNode.getHeight()/canvasParent.getHeight()));
    if(this.zoomLevel > maxForCanvas) {
      this.zoomLevel = maxForCanvas;      
    }*/
    if(this.zoomLevel < this.minZoomLevel) {
      this.zoomLevel = this.minZoomLevel;     
    }
    
    if(this.zoomLevel > this.maxZoomLevel) {
      this.zoomLevel = this.maxZoomLevel;     
    }
  }
};

WAPAMA.Plugins.View = Clazz.extend(WAPAMA.Plugins.View);