/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-global-rename-pattern  _jsx(\w+) _jsx$1

/**
 * Various Charting related constants and utility functions.
 *
 * @author Jesse Costello-Good
 * @version 1.1
 */
jsx3.Package.definePackage("jsx3.chart", function(chart){

  chart.VERSION = chart.ADDIN.getVersion();

  chart.LOG = jsx3.util.Logger.getLogger(chart.jsxpackage.getName());
  chart.LOG_BENCH = jsx3.util.Logger.getLogger(chart.jsxpackage.getName() + ".benchmark");

  /** @private @jsxobf-clobber */
  chart._BAD_REFERENCE = {};

  /**
   * {String} top/north quadrant
   * @final @jsxobf-final
   */
  chart.QTOP = "top";
  
  /**
   * {String} right/east quadrant
   * @final @jsxobf-final
   */
  chart.QRIGHT = "right";
  
  /**
   * {String} bottom/south quadrant
   * @final @jsxobf-final
   */
  chart.QBOTTOM = "bottom";
  
  /**
   * {String} left/west quadrant
   * @final @jsxobf-final
   */
  chart.QLEFT = "left";
  
  /**
   * Splits a rectangular box in two pieces.
   *
   * @param left {int} the left value of the box to split
   * @param top {int} the top value of the box to split
   * @param width {int} the width value of the box to split
   * @param height {int} the height value of the box to split
   * @param placement {String} {top,left,right,bottom} where to place the first sub-box
   * @param w {int} the desired width of the first sub-box
   * @param h {int} the desired height of the first sub-box
   * @return {Array} [[l1,t1,w1,h1],[l2,t2,w2,h2]]
   */
  chart.splitBox = function( left, top, width, height, placement, w, h ) {
    var box1 = null, box2 = null;
    if (placement == chart.QTOP) {
      box1 = [left, top, width, Math.min(h, height-1)];
      box2 = [left, top + box1[3], width, height - box1[3]];
    } else if (placement == chart.QRIGHT) {
      var w1 = Math.min(w, width-1);
      box1 = [left + width - w1, top, w1, height];
      box2 = [left, top, width - w1, height];
    } else if (placement == chart.QBOTTOM) {
      var h1 = Math.min(h, height-1);
      box1 = [left, top + height - h1, width, h1];
      box2 = [left, top, width, height - h1];
    } else if (placement == chart.QLEFT) {
      box1 = [left, top, Math.min(w, width-1), height];
      box2 = [left + box1[2], top, width - box1[2], height];
    }
    return [box1, box2];
  };
  
  /**
   * Tests whether an object is an Axis that displays a range of number values
   * @param obj {Object}
   * @return {boolean}
   */
  chart.isValueAxis = function( obj ) {
    return (chart.LinearAxis && obj instanceof chart.LinearAxis) || 
        (chart.LogarithmicAxis && obj instanceof chart.LogarithmicAxis);
  };
  
  /**
   * Tests whether an object is an Axis that displays set of discreet categories
   * @param obj {Object}
   * @return {boolean}
   */
  chart.isCategoryAxis = function( obj ) {
    return chart.CategoryAxis && obj instanceof chart.CategoryAxis;
  };
  
  /**
   * Utility function, splits a property value on comma or semicolon separators
   * @return {Array} the tokens
   * @package
   */
  chart.splitInputArray = function( s ) {
    if (s == null) return null;
    var tokens = s.split(/\s*[,;]\s*/);
    if (tokens[0] === "") tokens.shift();
    if (tokens.length > 0 && tokens[tokens.length-1] === "") tokens.pop();
    return tokens;
  };
  
  /**
   * Utility function, converts a value to a Number
   * @param v {Object}
   * @return {Number}
   */
  chart.asNumber = function( v ) {
    if (v == null) return null;
    if (typeof(v) == "number") return v;
    return new Number(v);
  };
  
  /**
   * Utility function, parses the property editor string format of a gradient into its constituent parts
   * @param value {String} the gradient in the form "color [angle [alpha [colors ...]]]"
   * @return {Array} [color,angle,alpha,colors]
   */
  chart.parseGradient = function( value ) {
    if (! value) return null;
    var tokens = value.split(/\s+/);
    if (tokens[0] === "") tokens.shift();
    if (tokens.length > 0 && tokens[tokens.length-1] === "") tokens.pop();
  
    if (tokens.length == 0) return null;
    if (tokens.length > 4) 
      return [tokens[0], tokens[1], tokens[2], tokens.slice(3).join(" ")];
    return tokens;
  };
  
  /**
   * Utility function, combines a vector fill and the property editor string format of a gradient
   * @param fill {jsx3.vector.Fill} the base fill
   * @param value {String} the gradient in the form "color [angle [alpha [colors ...]]]"
   * @return {jsx3.vector.Fill}
   */
  chart.addGradient = function( fill, value ) {
    var gradient = chart.parseGradient(value);
    if (fill != null && gradient != null) {
      var clone = new jsx3.vector.Fill(fill.getColor(), fill.getAlpha());
      clone.setType("gradient");
      clone.setColor2(gradient[0]);
      clone.setAngle(gradient[1]);
      clone.setAlpha2(gradient[2]);
      clone.setColors(gradient[3]);
      return clone;
    } else {
      return fill;
    }
  };

  /**
   * Sets the value of a reference field; a reference field is a string field that evals to some sort of object.
   * @param fieldName {String} the name of the reference field, this method will set this[fieldName]
   * @param asString {String} the value of the field as a string (before it's eval'ed)
   * @package
   */
  chart.setReferenceField = function( obj, fieldName, asString ) {
    obj[fieldName] = asString;
    // clear the cached result so that the next call to getReferenceField() will eval again
    obj["_" + fieldName + "_eval"] = null;
  };

  /**
   * fetches the eval'ed result of a reference field; caches the result (ok or invalid)
   * @param fieldName {String} the name of the reference field
   * @param type {String} the eval'ed result will be constrained to this javascript type, defaults to 'object'
   * @package
   */
  chart.getReferenceField = function( obj, fieldName, type ) {
    if (type == null) type = "object";
    // we store the cached results in this field
    var exField = "_" + fieldName + "_eval";

    // only eval if not cached
    if (! obj[exField] && obj[fieldName]) {
      try {
        // eval it
        var localFunct = obj.eval("var f = " + obj[fieldName] + "; f;");
        obj[exField] = localFunct;
        // constrain to type
        if (typeof(obj[exField]) != type) {
          chart.LOG.error("error evaluating '" + fieldName + "', " + obj[exField] + " is not of type " + type);
          obj[exField] = chart._BAD_REFERENCE;
        }
      } catch (e) {
        e = jsx3.NativeError.wrap(e);
        // remember that eval fails
        obj[exField] = chart._BAD_REFERENCE;
        chart.LOG.error("error evaluating " + type + " field '" + fieldName, e);
      }
    }

    // previous eval may have failed ... return null in this case
    return obj[exField] != chart._BAD_REFERENCE ? obj[exField] : null;
  };

  /**
   * calls getReferenceField() with the type parameter of 'function'
   * @param fieldName {String} the name of the reference field
   * @package
   */
  chart.getFunctionField = function( obj, fieldName ) {
    if (typeof(obj[fieldName]) == "function")
      return obj[fieldName];
    return chart.getReferenceField(obj, fieldName, "function");
  };

  /**
   * copies this instance's values of getBackgroundColor() and getAlpha() into a vector fill for the vector parameter
   * @param objShape {jsx3.vector.Shape} the vector whose fill to set
   * @package
   */
  chart.copyBackgroundToFill = function(obj, objShape) {
    var color = obj.getBackgroundColor();

    if (color != null && color.match(/\S/)) {
      var fill = objShape.getFirstChildOfType(jsx3.vector.Fill);
      if (fill == null) {
        fill = new jsx3.vector.Fill();
        objShape.setFill(fill);
      }
      fill.setColor(color);

      // this class does not define getAlpha()
      if (typeof(obj.getAlpha) == 'function')
        fill.setAlpha(obj.getAlpha());
    } else {
      objShape.setFill(null);
    }
  };

  /**
   * copies this instance's values of getBorderColor(), getBorderAlpha(), and getBorderWidth() into a VectorStroke for the vector parameter
   * @param objShape {jsx3.vector.Shape} the vector whose stroke to set
   * @package
   */
  chart.copyBorderToStroke = function(obj, objShape) {
    var color = obj.getBorderColor();

    if (color != null && color.match(/\S/)) {
      var stroke = objShape.getFirstChildOfType(jsx3.vector.Stroke);
      if (stroke == null) {
        stroke = new jsx3.vector.Stroke();
        objShape.setStroke(stroke);
      }
      stroke.setColor(color);

      // this class does not define getBorderAlpha() or getBorderWidth()
      if (typeof(obj.getBorderAlpha) == 'function')
        stroke.setAlpha(obj.getBorderAlpha());
      if (typeof(obj.getBorderWidth) == 'function')
        stroke.setWidth(obj.getBorderWidth());
    } else {
      objShape.setStroke(null);
    }
  };

  /**
   * @package
   */
  chart.setEventProperties = function(obj, objTag) {
    var Interactive = jsx3.gui.Interactive;
    var Event = jsx3.gui.Event;

    if (objTag == null)
      objTag = obj.getCanvas();

    var events = {};
    if (obj.getMenu() != null)
      events[Event.MOUSEUP] = true;
    if (obj.hasEvent(Interactive.SELECT))
      events[Event.CLICK] = true;
    if (obj.hasEvent(Interactive.EXECUTE))
      events[Event.DOUBLECLICK] = true;
    if (obj.hasEvent(Interactive.SPYGLASS)) {
      events[Event.MOUSEOVER] = "doSpyOver";
      events[Event.MOUSEOUT] = "doSpyOut";
    }

    for (var eventType in events) {
      var strMethod = events[eventType];
      if (typeof(strMethod) != "string")
        strMethod = Interactive.BRIDGE_EVENTS_MAP[eventType];
      jsx3.vector.paintEventHandler(obj, eventType, strMethod, objTag);
    }
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _bridge

/**
 * This package and all contained classes are available only when the Charting add-in is enabled.
 */
jsx3.Package.definePackage("jsx3.vector", function(vector){

  /* @jsxobf-final */
  vector.DEFAULT_UNIT = "px";

  /* @jsxobf-clobber */
  vector._BRIDGE = "_bridge";


  vector.TAGNS = "http://www.w3.org/2000/svg";
  /* @jsxobf-clobber */
  vector._EVT = "evt";


  /**
   * Converts an integer color to a CSS hex string color. If the color parameter is not a number, this function
   * returns the argument as a string.
   * @param color {int|String} The number to convert to hex.
   * @return {String} The CSS hex string.
   */
  vector.colorAsHtml = function( color ) {
    return typeof(color) == "number" ?
      "#" + (color + 0x1000000).toString(16).substring(1):
      "" + color;
  };
  
  /**
   * Converts a number value to a CSS unit.
   * @param value {int|String} The number value as a number or string, defaults to 0
   * @param unit {String} The unit to append to the number, defaults to vector.DEFAULT_UNIT
   * @param killUnit {boolean} If true, remove any unit that may have been included with the param value. Otherwise,
   *    the unit will only be appended if no unit was included.
   * @return {String} The CSS value.
   * @package
   */
  vector.toUnit = function(value, unit, killUnit) {
    if (value == null) value = 0;
    if (unit == null) unit = vector.DEFAULT_UNIT;
    
    if (typeof(value) == "number") {
      return value + "" + unit;
    } else {
      value = value.toString();
      value = value.replace(/^\s*(.*?)\s*$/, "$1");
      if (killUnit) 
        value = value.replace(/[^\d\.]/g, "");
      return value.match(/[^\d\.]/) ? value : (value + "" + unit);
    }
  };


  /**
   * Returns alpha constrained between 0 and 1.
   * @param alpha {number} an alpha value (usually a user input)
   * @return {float} [0.0, 1.0]
   * @package
   */
  vector.constrainAlpha = function( alpha ) {
    return Math.max(0, Math.min(1, alpha));
  };
  
  /**
   * Converts degrees (0 at North, clockwise) to radians (0 at East, counterclockwise).
   * @param degrees {Number} a degree value; 0 points North, increasing values go clockwise.
   * @return {Number} a radian value, between 0 and 2*pi; 0 points East, increasing values go counterclockwise.
   */
  vector.degreesToRadians = function(degrees) {
    return jsx3.util.numMod((2 * Math.PI / 360 * (-1 * degrees + 90)), (2 * Math.PI));
  };  

  /**
   * Renders a cross-platform vector event handler.
   * 
   * @param obj {jsx3.app.Model}
   * @param strEvtType {String} the event type, one of <code>jsx3.gui.Event.CLICK</code>, etc.
   * @param strMethod {String} the instance method to call on <code>obj</code> when the event is received.
   * @param objElm {jsx3.vector.Tag} the HTML element to which to add the event handler.
   */
  vector.paintEventHandler = function(obj, strEvtType, strMethod, objElm) {
    var eventHandler = "on" + strEvtType;
    var strEvent = "";


    // Note: this code allows SVG to support the dblclick event. It causes the onclick HTML attribute to be
    // clobbered.
    if (strEvtType == jsx3.gui.Event.DOUBLECLICK || strEvtType == jsx3.gui.Event.CLICK) {
      objElm.setProperty("_" + strEvtType, strMethod);

      var onclick = objElm.getProperty("onclick");
      if (onclick) {

      }

      objElm.setProperty("onclick", "if(evt.detail%2==0){if(this.getAttribute('_dblclick'))" +
                 "jsx3.GO('" + obj.getId() + "')."+vector._BRIDGE+"(evt,this,this.getAttribute('_dblclick'));}" +
                 "else{if(this.getAttribute('_click'))" +
                 "jsx3.GO('" + obj.getId() + "')."+vector._BRIDGE+"(evt,this,this.getAttribute('_click'));}");

      return;
    }


    var attrEvent = objElm.getProperty(eventHandler);
    if (attrEvent) {
      strEvent = attrEvent.replace(/"/g, "&quot;");
      if (! attrEvent.match(/;\s*$/))
        strEvent += ";";
    }

    strEvent += "jsx3.GO('" + obj.getId() + "')." + vector._BRIDGE + "(" + vector._EVT + ",this,'" + strMethod + "');";

    if (strEvent.length > 0)
      objElm.setProperty(eventHandler, strEvent);
  };

  /**
   * Updates a rendered vector HTML element, <code>objExisting</code>, with an in-memory vector tag,
   * <code>objNew</code>. For example,
   * <pre>
   * var objElm = document.getElementById("vectorId");
   * var objVector = new jsx3.vector.Oval(0, 0, 100, 100);
   * objVector.setFill(new jsx3.vector.Fill(0xFFFF00));
   * jsx3.vector.updateVector(objVector, objElm);
   * </pre>
   *
   * @param objNew {jsx3.html.Tag}
   * @param objExisting {HTMLElement}
   */
  vector.updateVector = function(objNew, objExisting) {
    var newVector = objNew.paintDom();
    if (newVector != objExisting && objExisting.parentNode)
      objExisting.parentNode.replaceChild(newVector, objExisting);
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _parent _native _children
/**
 * Represents an HTML element. Provides an object oriented way of painting to screen.
 * <p/>
 * This class is available only when the Charting add-in is enabled.
 */
jsx3.Class.defineClass("jsx3.html.Tag", null, null, function(Tag, Tag_prototype) {

  var Exception = jsx3.Exception;
  
  /** @private @jsxobf-clobber */
  Tag._NO_CHILDREN = [];

  /** @private @jsxobf-clobber */
  Tag_prototype._tagname = null;
  /** @private @jsxobf-clobber */
  Tag_prototype._tagns = null;

/* @JSC */ if (jsx3.CLASS_LOADER.VML) {

  /**
   * The instance initializer.
   * @param strTagNS {String}
   * @param strTagName {String}
   */
  Tag_prototype.init = function(strTagNS, strTagName) {
    this._tagname = strTagName;
    this._tagns = strTagNS;

    this._native = document.createElement(strTagNS ? strTagNS + ":" + strTagName : strTagName);
    this._parent = null;
    this._children = null;
  };

  /**
   * Sdds a child to the list of this tag's children; may be vetoed by <code>onAppendChild().</code>
   * @param child {jsx3.html.Tag} the child to add, must not already have a parent
   */
  Tag_prototype.appendChild = function( child ) {
    if (this.onAppendChild(child)) {
      if (child instanceof Tag && child.getParent() != null) {
        throw new Exception("can't append " + child + " to " + this +
            ", already has parent " + child._parent);
      }

      if (this._children == null)
        this._children = [];

      this._children.push(child);
      child._parent = this;
    } else {
      throw new Exception("Illegal to append child " + child + " to parent " + this + ".");
    }
  };

  /**
   * Removes a child from the list of this tag's children; may be vetoed by <code>onRemoveChild()</code>.
   * @param child {jsx3.html.Tag} the child to remove, must exist in the list of children
   */
  Tag_prototype.removeChild = function( child ) {
    if (this._children) {
      var indexOf = jsx3.util.arrIndexOf(this._children, child);
      if (indexOf >= 0) {
        this._children[indexOf]._parent = null;
        this._children.splice(indexOf, 1);
      }
    }
  };

  /**
   * Replaces a child of this tag.
   * @param child {jsx3.html.Tag} the new child.
   * @param oldChild {jsx3.html.Tag} the child to replace.
   */
  Tag_prototype.replaceChild = function( child, oldChild ) {
    if (this._children) {
      var indexOf = jsx3.util.arrIndexOf(this._children, oldChild);
      if (indexOf >= 0) {
        this._children[indexOf]._parent = null;
        this._children[indexOf] = child;
        child._parent = this;
      }
    }
  };


  /**
   * Removes all the children of this tag.
   */
  Tag_prototype.removeChildren = function() {
    if (this._children)
      this._children.splice(0, this._children.length);
  };

  /**
   * Returns the cssClass field.
   * @return {String} cssClass
   */
  Tag_prototype.getClassName = function() {
    return this._native.className;
  };

  /**
   * Sets the cssClass field, the HTML 'class' attribute.
   * @param cssClass {String} the new value for cssClass
   */
  Tag_prototype.setClassName = function( cssClass ) {
    this._native.className = cssClass;
  };

/* @JSC */ } else if (jsx3.CLASS_LOADER.SVG) {

  Tag_prototype.init = function(strTagNS, strTagName) {
    this._tagname = strTagName;
    this._tagns = strTagNS;

    if (strTagName)
      this._native = strTagNS ? document.createElementNS(strTagNS, strTagName) : document.createElement(strTagName);
    this._parent = null;
    this._children = null;
  };

  Tag_prototype.appendChild = function( child ) {
    if (this.onAppendChild(child)) {
      if (child instanceof Tag && child.getParent() != null) {
        throw new Exception("can't append " + child + " to " + this +
            ", already has parent " + child._parent);
      }

      if (this._children == null)
        this._children = [];

      this._children.push(child);
      child._parent = this;

      this._native.appendChild(child._native);
    } else {
      throw new Exception("Illegal to append child " + child + " to parent " + this + ".");
    }
  };

  Tag_prototype.removeChild = function( child ) {
    if (this._children) {
      var indexOf = jsx3.util.arrIndexOf(this._children, child);
      if (indexOf >= 0) {
        this._children[indexOf]._parent = null;
        this._children.splice(indexOf, 1);
      }
    }

    this._native.removeChild(child._native);
  };

  Tag_prototype.replaceChild = function( child, oldChild ) {
    if (this._children) {
      var indexOf = jsx3.util.arrIndexOf(this._children, oldChild);
      if (indexOf >= 0) {
        this._children[indexOf]._parent = null;
        this._children[indexOf] = child;
        child._parent = this;
      }
    }

    this._native.replaceChild(child._native, oldChild._native);
  };

  Tag_prototype.removeChildren = function() {
    if (this._children)
      this._children.splice(0, this._children.length);

    var nodes = this._native.childNodes;
    for (var i = nodes.length - 1; i >= 0; i--)
      this._native.removeChild(nodes[i]);
  };

  /**
   * Returns the cssClass field.
   * @return {String} cssClass
   */
  Tag_prototype.getClassName = function() {
    return this.getProperty("class");
  };

  /**
   * Sets the cssClass field, the HTML 'class' attribute.
   * @param cssClass {String} the new value for cssClass
   */
  Tag_prototype.setClassName = function( cssClass ) {
    this.setProperty("class", cssClass);
  };

/* @JSC */ }

  /**
   * Returns the parent tag.
   * @return {jsx3.html.Tag} parent
   */
  Tag_prototype.getParent = function() {
    return this._parent;
  };

  /**
   * Returns the children tags.
   * @return {Array<jsx3.html.Tag>} children
   */
  Tag_prototype.getChildren = function() {
    return this._children == null ? Tag._NO_CHILDREN : this._children;
  };

  /**
   * Returns the id field.
   * @return {String} id
   */
  Tag_prototype.getId = function() {
    return this._native.id;
  };

  /**
   * Sets the id field.
   * @param id {String} the new value for id
   */
  Tag_prototype.setId = function( id ) {
    this.setProperty("id", id);
  };

  /**
   * Sets the extraStyles field, this string is prepended as-is to the generated value for the style attribute of the tag.
   * @param extraStyles {String} the new value for extraStyles
   */
  Tag_prototype.setExtraStyles = function( extraStyles ) {
    try {
      this._native.style.cssText += ";" + extraStyles;
    } catch (e) {
      throw new Exception("Error appending '" + extraStyles + "' to 'cssText': " + jsx3.NativeError.wrap(e));
    }
  };

  /**
   * Releases all bi-directional references between this instance and its children.
   */
  Tag_prototype.release = function() {
    delete this._parent;
    if (this._children) {
      for (var i = this._children.length - 1; i >= 0; i--)
        if (this._children[i].release)
          this._children[i].release();
//      delete this._native;
      delete this._children;
    }
  };

  /**
   * Called before appending a child.
   * @return {boolean} <code>true</code> to allow the append, <code>false</code> to veto.
   * @param child {jsx3.html.Tag}
   * @protected
   */
  Tag_prototype.onAppendChild = function( child ) {
    return true;
  };

  /**
   * Called before removing a child.
   * @return {boolean} <code>true</code> to allow the removal, <code>false</code> to veto.
   * @param child {jsx3.html.Tag}
   * @protected
   */
  Tag_prototype.onRemoveChild = function( child ) {
    return true;
  };

  /**
   * Sets an attribute of this HTML element. This method may be called with a variable number of arguments, which are
   * interpreted as name/value pairs, i.e.: <code>tag.setProperty(n1, p1, n2, p2);</code>.
   * @param strName {String} the name of the attribute.
   * @param strValue {String} the value of the attribute. If <code>null</code>, the attribute is removed.
   */
  Tag_prototype.setProperty = function( strName, strValue ) {
    var a = arguments;
    for (var i = 0; i < a.length; i+=2) {
      strName = a[i]; strValue = a[i+1];
      if (strValue != null)
        this._native.setAttribute(strName, strValue);
      else
        this._native.removeAttribute(strName);
    }
  };

/* @JSC */ if (jsx3.CLASS_LOADER.SVG) {

  Tag_prototype.setPropertyNS = function( strNS, strName, strValue ) {
    if (strValue != null)
      this._native.setAttributeNS(strNS, strName, strValue);
    else
      this._native.removeAttributeNS(strNS, strName);
  };

/* @JSC */ }

  /**
   * Returns an attribute of this HTML element.
   * @param strName {String} the name of the attribute.
   * @return {String} the value of the attribute.
   */
  Tag_prototype.getProperty = function( strName ) {
    return this._native.getAttribute(strName);
  };

  /**
   * Removes any number of properties from this HTML element.
   * @param strName {String...} the names of the attributes.
   */
  Tag_prototype.removeProperty = function( strName ) {
    var a = arguments;
    for (var i = 0; i < a.length; i++)
      this._native.removeAttribute(a[i]);
  };

  /**
   * Sets a style of this HTML element. This method may be called with a variable number of arguments, which are
   * interpreted as name/value pairs, i.e.: <code>tag.setStyle(n1, s1, n2, s2);</code>.
   *
   * @param strName {String} the name of the style.
   * @param strValue {String} the value of the style.
   */
  Tag_prototype.setStyle = function( strName, strValue ) {
    var a = arguments;
    for (var i = 0; i < a.length; i+=2) {
      strName = a[i]; strValue = a[i+1];
      try {
        this._native.style[strName] = strValue == null ? "" : strValue;
      } catch (e) {
        throw new Exception("Error setting style '" + strName + "' to '" + strValue + "': " + jsx3.NativeError.wrap(e));
      }
    }
  };

  /**
   * Returns a style of this HTML element.
   * @param strName {String} the name of the style.
   * @return {String} the value of the style.
   */
  Tag_prototype.getStyle = function( strName ) {
    return this._native.style[strName];
  };

  /**
   * Removes any number of styles from this HTML element.
   * @param strName {String...} the names of the styles.
   */
  Tag_prototype.removeStyle = function( strName ) {
    var a = arguments;
    for (var i = 0; i < a.length; i++)
      this._native.style[a[i]] = "";
  };

  /**
   * Returns the name of this HTML element, such as "table" or "div".
   * @return {String} the tag name
   */
  Tag_prototype.getTagName = function() {
    return this._tagname;
  };

  /**
   * Returns the namespace of this HTML element.
   * @return {String} the tag name
   */
  Tag_prototype.getTagNS = function() {
    return this._tagns;
  };

/* @JSC */ if (jsx3.CLASS_LOADER.VML) {

  /**
   * Serializes this HTML element to an HTML string using various overridable methods in this class.
   * <b>This method is only available in the VML version of this class.</b>
   *
   * @return {String} this tag serialized to HTML.
   */
  Tag_prototype.paint = function() {
    this.paintUpdate();
    var buffer = [];
    var index = this.paintToBuffer(buffer, 0);
    return buffer.slice(0, index).join("");
  };

  /**
   * @package
   */
  Tag_prototype.paintToBuffer = function(buffer, index) {
    var children = this._children;
    var outer = jsx3.html.getOuterHTML(this._native);
    var nodeName = "";
    
    if (jsx3.vector._IE8) {
      outer = outer.replace(/^<\?import .*?\/>/, "");
      nodeName = jsx3.vector.TAGNS + ":" + this._native.nodeName;
    } else {
      outer = outer.replace(/^<(\w+(\:\w+)?)\b/, function(m, $1) { nodeName = $1; return "<" + nodeName.toLowerCase(); });
      // BUG: this may mess up some attributes with "=" characters in them
      outer = outer.replace(/\b([_a-zA-Z]\w*)=([^\s"]+) /g, '$1="$2" '); // put quotes around all attributes!
    }

    var closeIndex = outer.lastIndexOf("</");
    if (closeIndex >= 0 && outer.substring(closeIndex).indexOf(nodeName) != 2)
      closeIndex = -1;

    if (children != null && children.length > 0) {
      var open = null, close = null;
      if (closeIndex >= 0) {
        open = outer.substring(0, closeIndex);
        close = outer.substring(closeIndex);
      } else {
        open = outer;
        close = "</" + nodeName.toLowerCase() + ">";
      }

      buffer[index++] = open;

      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (typeof(child) == "string")
          buffer[index++] = child;
        else
          index = child.paintToBuffer(buffer, index);
      }

      buffer[index++] = close;
    } else {
      if (closeIndex >= 0)
        buffer[index++] = outer.substring(0, closeIndex-1);
      else
        buffer[index++] = outer.substring(0, outer.length - 1);
      buffer[index++] = "/>";
    }

    return index;
  };

/* @JSC */ } else if (jsx3.CLASS_LOADER.SVG) {

  /**
   * Prepares this HTML element for insertion into the live browser DOM and returns the underlying native HTML element.
   * <b>This method is only available in the SVG version of this class.</b>
   *
   * @return {HTMLElement} the native browser html element.
   */
  Tag_prototype.paintDom = function() {
    this.paintUpdate();
    return this._native;
  };

/* @JSC */ }

  /**
   * This method is called on each HTML tag before it is painted to screen. Methods in subclasses of this class that
   * override this method should begin with a call to <code>jsxsuper()</code>.
   * @protected
   */
  Tag_prototype.paintUpdate = function() {
    var children = this._children;
    if (children) {
      for (var i = 0; i < children.length; i++)
        children[i].paintUpdate();
    }
  };

  /**
   * @return {String}
   */
  Tag_prototype.toString = function() {
    return "<" + this.getTagName() + "#" + this.getId() + "/>";
  };

  /**
   * Returns the first child tag of type <code>type</code>.
   * @param type {String|Function} the fully-qualified class name or the class constructor function.
   * @return {jsx3.html.Tag}
   */
  Tag_prototype.getFirstChildOfType = function( type ) {
    if (typeof(type) == "string")
      type = jsx3.Class.forName(type).getConstructor();

    if (this._children) {
      var children = this._children;
      for (var i = 0; i < children.length; i++) {
        if (children[i] instanceof type)
          return children[i];
      }
    }

    return null;
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Represents an HTML text node.
 * <p/>
 * This class is available only when the Charting add-in is enabled.
 */
jsx3.Class.defineClass("jsx3.html.Text", jsx3.html.Tag, null, function(Text, Text_prototype) {

/* @JSC */ if (jsx3.CLASS_LOADER.VML) {

  /**
   * The instance initializer.
   * @param strText {String}
   */
  Text_prototype.init = function(strText) {
    /* @jsxobf-clobber */
    this._text = strText;
  };

  Text_prototype.paintToBuffer = function(buffer, index) {
    buffer[index] = this._text;
    return index + 1;
  };

  Text_prototype.getText = function() {
    return this._text;
  };

  Text_prototype.setText = function(strText) {
    this._text = strText;
  };

  Text_prototype.paint = function() {
    return this._text;
  };

/* @JSC */ } else if (jsx3.CLASS_LOADER.SVG) {

  Text_prototype.init = function(strText) {
    /* @jsxobf-clobber-shared */
    this._native = document.createTextNode(strText != null ? strText : "");
  };

  Text_prototype.getText = function() {
    return this._native.nodeValue;
  };

  Text_prototype.setText = function(strText) {
    this._native.nodeValue = strText;
  };

/* @JSC */ }

  Text_prototype.onAppendChild = function( child ) {
    return false;
  };

  Text_prototype.toString = function() {
    return "[jsx3.html.Text \"" + this.getText() + "\"]";
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Represents an HTML element that occupies a rectangle of the screen.
 * <p/>
 * This class is available only when the Charting add-in is enabled.
 */
jsx3.Class.defineClass("jsx3.html.BlockTag", jsx3.html.Tag, null, function(BlockTag, BlockTag_prototype) {

  /**
   * The instance initializer.
   * @param strTagNS {String}
   * @param strTagName {String}
   * @param left {int} left position (in pixels) of the object relative to its parent container
   * @param top {int} top position (in pixels) of the object relative to its parent container
   * @param width {int} width (in pixels) of the object
   * @param height {int} height (in pixels) of the object
   */
  BlockTag_prototype.init = function(strTagNS, strTagName, left, top, width, height) {
    this.jsxsuper(strTagNS, strTagName);
    this.setDimensions(left, top, width, height);
  };

  /**
   * Returns the left field.
   * @return {int} left
   */
  BlockTag_prototype.getLeft = function() {
    var s = this.getStyle("left");
    return s != null ? parseInt(s) : null;
  };

  /** @private @jsxobf-clobber */
  BlockTag_prototype._setADimension = function( dim, value ) {
    if (value == null) {
      this.setStyle(dim, null);
    } else {
      var intValue = parseInt(value);
      if (isNaN(intValue))
        jsx3.chart.LOG.debug("trying to set " + dim + " of " + this + " to " + value);
      else
        this.setStyle(dim, intValue + "px");
    }
  };

  /**
   * Sets the left field.
   * @param left {int} the new value for left
   */
  BlockTag_prototype.setLeft = function( left ) {
    this._setADimension("left", left);
  };

  /**
   * Returns the top field.
   * @return {int} top
   */
  BlockTag_prototype.getTop = function() {
    var s = this.getStyle("top");
    return s != null ? parseInt(s) : null;
  };

  /**
   * Sets the top field.
   * @param top {int} the new value for top
   */
  BlockTag_prototype.setTop = function( top ) {
    this._setADimension("top", top);
  };

  /**
   * Returns the width field.
   * @return {int} width
   */
  BlockTag_prototype.getWidth = function() {
    var s = this.getStyle("width");
    return s != null ? parseInt(s) : null;
  };

  /**
   * Sets the width field.
   * @param width {int} the new value for width
   */
  BlockTag_prototype.setWidth = function( width ) {
    this._setADimension("width", width);
  };

  /**
   * Returns the height field.
   * @return {int} height
   */
  BlockTag_prototype.getHeight = function() {
    var s = this.getStyle("height");
    return s != null ? parseInt(s) : null;
  };

  /**
   * Sets the height field.
   * @param height {int} the new value for height
   */
  BlockTag_prototype.setHeight = function( height ) {
    this._setADimension("height", height);
  };

  /**
   * Returns the margin field, as set by setMargin().
   * @return {String} margin
   */
  BlockTag_prototype.getMargin = function() {
    return this.getStyle("margin");
  };

  /**
   * Sets the margin field, can be a single value or four values separated by space that correspond to top, right, bottom, and left.
   * @param margin {String} the new value for margin
   */
  BlockTag_prototype.setMargin = function( margin ) {
    this.setStyle("margin", margin);
  };

  /**
   * Returns the padding field, as set by setPadding().
   * @return {String} padding
   */
  BlockTag_prototype.getPadding = function() {
    return this.getStyle("padding");
  };

  /**
   * Sets the padding field, can be a single value or four values separated by space that correspond to top, right, bottom, and left.
   * @param padding {String} the new value for padding
   */
  BlockTag_prototype.setPadding = function( padding ) {
    this.setStyle("padding", padding);
  };

  /**
   * Returns the position field.
   * @return {String} position
   */
  BlockTag_prototype.getPosition = function() {
    return this.getStyle("position");
  };

  /**
   * Sets the position field, can be 'absolute' or 'relative'.
   * @param position {String} the new value for position
   */
  BlockTag_prototype.setPosition = function( position ) {
    this.setStyle("position", position);
  };

  /**
   * Returns the zIndex field.
   * @return {int} zIndex
   */
  BlockTag_prototype.getZIndex = function() {
    return this.getStyle("zIndex");
  };

  /**
   * Sets the zIndex field.
   * @param zIndex {int} the new value for zIndex
   */
  BlockTag_prototype.setZIndex = function( zIndex ) {
    this.setStyle("zIndex", zIndex);
  };

  /**
   * Returns the bgcolor field.
   * @return {String} bgcolor
   */
  BlockTag_prototype.getBackgroundColor = function() {
    return this.getStyle("backgroundColor");
  };

  /**
   * Sets the bgcolor field.
   * @param bgcolor {String} the new value for bgcolor
   */
  BlockTag_prototype.setBackgroundColor = function( bgcolor ) {
    this.setStyle("backgroundColor", bgcolor);
  };

  /**
   * parses the margin field into an array of four int values 
   * @return {Array} [top,right,bottom,left]
   */
  BlockTag_prototype.getMarginDimensions = function() {
    return BlockTag.getDimensionsFromCss(this.getMargin());
  };
  
  /**
   * parses the padding field into an array of four int values 
   * @return {Array} [top,right,bottom,left]
   */
  BlockTag_prototype.getPaddingDimensions = function() {
    return BlockTag.getDimensionsFromCss(this.getPadding());
  };

  /**
   * parses any CSS value into an array of four int values 
   * @return {Array} [top,right,bottom,left]
   * @package
   */
  BlockTag.getDimensionsFromCss = function(css) {
    if (css) {
      if (typeof(css) == "number") {
        return [css,css,css,css];
      } else {
        var tokens = ("" + css).split(/[^\d\-]+/);
        if (tokens[0] === "") tokens.shift();
        if (tokens.length > 0 && tokens[tokens.length] === "") tokens.pop();
        if (tokens.length >= 4) {
          return [parseInt(tokens[0]),parseInt(tokens[1]),parseInt(tokens[2]),parseInt(tokens[3])];
        } else if (tokens.length >= 1) {
          var p = parseInt(tokens[0]);
          return [p,p,p,p];
        }
      }
    }
    
    return [0,0,0,0];  
  };

  /**
   * Returns the dimensions in an array of four int values
   * @return {Array<int>} [left,top,width,height]
   */
  BlockTag_prototype.getDimensions = function() {
    return [this.getLeft(), this.getTop(), this.getWidth(), this.getHeight()];
  };

  /**
   * Sets all four dimensions at once.
   * @param left {int/Array<int>} the new left value or an array containing all four new values
   * @param top {int} the new top value
   * @param width {int} the new width value
   * @param height {int} the new height value
   */
  BlockTag_prototype.setDimensions = function(left, top, width, height) {
    if (jsx3.$A.is(left)) {
      this.setLeft(left[0]);
      this.setTop(left[1]);
      this.setWidth(left[2]);
      this.setHeight(left[3]);
    } else {
      this.setLeft(left);
      this.setTop(top);
      this.setWidth(width);
      this.setHeight(height);
    }
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Represents an HTML element that defines font styles.
 * <p/>
 * This class is available only when the Charting add-in is enabled.
 */
jsx3.Class.defineInterface("jsx3.html.FontTag", null, function(FontTag, FontTag_prototype) {

  /**
   * Returns the fontFamily field.
   * @return {String} fontFamily
   */
  FontTag_prototype.getFontFamily = function() {
    return this.getStyle("fontFamily");
  };

  /**
   * Sets the fontFamily field.
   * @param fontFamily {String} the new value for fontFamily
   */
  FontTag_prototype.setFontFamily = function( fontFamily ) {
    this.setStyle("fontFamily", fontFamily);
  };

  /**
   * Returns the fontsize field.
   * @return {String} fontsize
   */
  FontTag_prototype.getFontSize = function() {
    return this.getStyle("fontSize");
  };

  /**
   * Sets the fontsize field.
   * @param fontSize {int|String} the new value for fontsize
   */
  FontTag_prototype.setFontSize = function( fontSize ) {
    this.setStyle("fontSize", isNaN(fontSize) ? fontSize : fontSize + "px");
  };

  /**
   * Returns the fontStyle field.
   * @return {String} fontStyle
   */
  FontTag_prototype.getFontStyle = function() {
    return this.getStyle("fontStyle");
  };

  /**
   * Sets the fontStyle field.
   * @param fontStyle {String} the new value for fontStyle
   */
  FontTag_prototype.setFontStyle = function( fontStyle ) {
    this.setStyle("fontStyle", fontStyle);
  };

  /**
   * Returns the fontWeight field.
   * @return {String} fontWeight
   */
  FontTag_prototype.getFontWeight = function() {
    return this.getStyle("fontWeight");
  };

  /**
   * Sets the fontWeight field.
   * @param fontWeight {String} the new value for fontWeight
   */
  FontTag_prototype.setFontWeight = function( fontWeight ) {
    this.setStyle("fontWeight", fontWeight);
  };

  /**
   * Returns the textAlign field.
   * @return {String} textAlign
   */
  FontTag_prototype.getTextAlign = function() {
    return this.getStyle("textAlign");
  };

  /**
   * Sets the textAlign field.
   * @param textAlign {String} the new value for textAlign
   */
  FontTag_prototype.setTextAlign = function( textAlign ) {
    this.setStyle("textAlign", textAlign);
  };

  /**
   * Returns the textDecoration field.
   * @return {String} textDecoration
   */
  FontTag_prototype.getTextDecoration = function() {
    return this.getStyle("textDecoration");
  };

  /**
   * Sets the textDecoration field.
   * @param textDecoration {String} the new value for textDecoration
   */
  FontTag_prototype.setTextDecoration = function( textDecoration ) {
    this.setStyle("textDecoration", textDecoration);
  };

  /**
   * Returns the color field.
   * @return {String} color
   */
  FontTag_prototype.getColor = function() {
    return this.getStyle("color");
  };

  /**
   * Sets the color field.
   * @param color {String} the new value for color
   */
  FontTag_prototype.setColor = function( color ) {
    this.setStyle("color", color);
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Represents a vector canvas in which vector shapes are painted.
 */
jsx3.Class.defineClass("jsx3.vector.Canvas", jsx3.html.BlockTag, null, function(Canvas, Canvas_prototype) {


  Canvas_prototype.init = function(left, top, width, height) {
    this.jsxsuper(jsx3.vector.TAGNS, "svg", left, top, width, height);
    this.setProperty("version", "1.1",
                     "baseProfile", "full",
                     "xmlns:xlink", "http://www.w3.org/1999/xlink");
  };

  Canvas_prototype.paintUpdate = function() {
    this.jsxsuper();    
    
    if (this._defs != null && this._defs.getParent() == null)
      this.appendChild(this._defs);

    // NOTE: this is not to the HTML spec, rather the GI spec
    if (this.getPosition() != "absolute") {
      this.setLeft(null);
      this.setTop(null);
    }
  };

  Canvas_prototype.getDefs = function() {
    if (this._defs == null) {
      /* @jsxobf-clobber */
      this._defs = new jsx3.html.Tag(jsx3.vector.TAGNS, "defs");
      this.appendChild(this._defs);
    }
    return this._defs;
  };

  Canvas_prototype.setWidth = function( width ) {
    this.jsxsuper(width);
    this.setProperty("width", typeof(width) == "number" ? width + "px" : width);
  };

  Canvas_prototype.setHeight = function( height ) {
    this.jsxsuper(height);
    this.setProperty("height", typeof(height) == "number" ? height + "px" : height);
  };


});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _native _children _parent
/**
 * The base class for jsx3.vector.Group and jsx3.vector.Shape. Defines getters and setters for the shared vector
 * tag attributes and CSS style extensions.
 */
jsx3.Class.defineClass("jsx3.vector.Tag", jsx3.html.BlockTag, null, function(Tag, Tag_prototype) {

  /**
   * The instance initializer.
   * @param strTagName {String}
   * @param left {int} left position (in pixels) of the object relative to its parent container
   * @param top {int} top position (in pixels) of the object relative to its parent container
   * @param width {int} width (in pixels) of the object
   * @param height {int} height (in pixels) of the object
   */
  Tag_prototype.init = function(strTagName, left, top, width, height) {
    this.jsxsuper(jsx3.vector.TAGNS, strTagName, left, top, width, height);
  };

  /**
   * Returns the tooltip, the text that is displayed on mouse over.
   */
  Tag_prototype.getToolTip = function() {
    return this.getProperty("title");
  };

  /**
   * Sets the tooltip, the text that is displayed on mouse over.
   * @param title {String}
   */
  Tag_prototype.setToolTip = function( title ) {
    this.setProperty("title", title);
  };

  
  Tag_prototype.setRotation = function( rotation ) {
    /* @jsxobf-clobber */
    this._rotation = rotation;
  };  

  Tag_prototype.setLeft = function(left) { 
    /* @jsxobf-clobber */
    this._left = left; 
  };

  Tag_prototype.setTop = function(top) { 
    /* @jsxobf-clobber */
    this._top = top; 
  };
  
  Tag_prototype.setWidth = function(width) { 
    /* @jsxobf-clobber */
    this._width = width; 
  };
  
  Tag_prototype.setHeight = function(height) { 
    /* @jsxobf-clobber */ 
    this._height = height;
  };
  
  Tag_prototype.setPosition = function(position) { 
    /* @jsxobf-clobber */
    this._position = position; 
  };
  
  Tag_prototype.getRotation = function() { return this._rotation; };
  Tag_prototype.getLeft = function() { return this._left; };
  Tag_prototype.getTop = function() { return this._top; };
  Tag_prototype.getWidth = function() { return this._width; };
  Tag_prototype.getHeight = function() { return this._height; };
  Tag_prototype.getPosition = function() { return this._position; };
  
  Tag_prototype.setZIndex = function(zIndex) {
    this.jsxsuper(zIndex);
    var parent = this.getParent();
    if (parent) {
      var children = parent.getChildren();
      
      for (var i = 0; i < children.length; i++) {
        var sibling = children[i];
        if (sibling instanceof Tag) {
          var sibZIndex = parseInt(sibling.getZIndex());
          if (zIndex < sibZIndex) {
            if (sibling != this) {
//              jsx3.log("moving " + this + "(" + zIndex + ") before " + sibling + "(" + sibZIndex + ")");
              parent._native.removeChild(this._native);
              parent._native.insertBefore(this._native, sibling._native);
            }
            break;
          }
        }
      }
    }
  };
  
  Tag_prototype.appendChild = function(child) {
    if (this.onAppendChild(child)) {
      if (child instanceof Tag && child.getParent() != null) {
        throw new jsx3.Exception("can't append " + child + " to " + this + 
            ", already has parent " + child._parent);
      }

      if (this._children == null) 
        this._children = [];
      
      if (child instanceof Tag) {
        var zIndex = parseInt(child.getZIndex());
        if (! isNaN(zIndex)) {
          for (var i = 0; i < this._children.length; i++) {
            var sibling = this._children[i];
            var sibZIndex = parseInt(sibling.getZIndex());
            if (zIndex < sibZIndex) {
//              jsx3.log("inserting " + child + "(" + zIndex + ") before " + sibling + "(" + sibZIndex + ")");
              this._native.insertBefore(child._native, sibling._native);
            }
          }
        }
      }
      
      if (child._native.parentNode == null)
        this._native.appendChild(child._native);
      
      this._children.push(child);
      child._parent = this;
    } else {
      throw new jsx3.Exception("Illegal to append child " + child + " to parent " + this + ".");
    }
  };
  
  Tag_prototype.getDefs = function() {
    var parent = this.getParent();
    return parent != null ? parent.getDefs() : null;
  };

  
});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Represents a vector line style.
 */
jsx3.Class.defineClass("jsx3.vector.Stroke", jsx3.html.Tag, null, function(Stroke, Stroke_prototype) {

  var vector = jsx3.vector;

  Stroke._TAGNAME = null;

  /**
   * The instance initializer.
   * @param color {int|String} the color value, as a hex String or 24-bit integer value, defaults to 0x000000
   * @param width {int} the width of the stroke, in pixels, defaults to 1
   * @param alpha {float} the opacity value, valid values are between 0 and 1, defaults to 1
   */
  Stroke_prototype.init = function(color, width, alpha) {
    // call constructor for super class
    this.jsxsuper(vector.TAGNS, Stroke._TAGNAME);
    
    /* @jsxobf-clobber-shared */
    this._on = null;
    /* @jsxobf-clobber */
    this._color = color != null ? color : 0x000000;
    /* @jsxobf-clobber */
    this._width = width != null ? width : 1;
    /* @jsxobf-clobber */
    this._alpha = alpha != null ? vector.constrainAlpha(alpha) : 1;
  };

  /**
   * Returns the color field.
   * @return {int | String} color
   */
  Stroke_prototype.getColor = function() {
    return this._color;
  };

  /**
   * Returns the color field, as a CSS hex string.
   * @return {String}
   */
  Stroke_prototype.getColorHtml = function() {
    return vector.colorAsHtml(this._color);
  };
  
  /**
   * Sets the color field.
   * @param color {int | String} the new value for color
   */
  Stroke_prototype.setColor = function( color ) {
    this._color = color;
  };

  /**
   * Returns the width field.
   * @return {int} width
   */
  Stroke_prototype.getWidth = function() {
    return this._width;
  };

  /**
   * Sets the width field.
   * @param width {int} the new value for width
   */
  Stroke_prototype.setWidth = function( width ) {
    this._width = width;
  };

  /**
   * Returns the alpha field.
   * @return {float} alpha
   */
  Stroke_prototype.getAlpha = function() {
    return this._alpha;
  };

  /**
   * Sets the alpha field.
   * @param alpha {float} the new value for alpha
   */
  Stroke_prototype.setAlpha = function( alpha ) {
    this._alpha = alpha != null ? vector.constrainAlpha(alpha) : null;
  };

  /**
   * vetoes all child appends
   * @package
   */
  Stroke_prototype.onAppendChild = function( child ) {
    return false;
  };

  Stroke_prototype.toString = function() {
    return "<stroke " + this.getColorHtml() + " " + this._width + " " + this._alpha + "/>";
  };

  /**
   * override method in Tag base class for efficiency
   * @package
   */
  Stroke_prototype.paint = function() {
    var html = "<" + vector.TAGNS + ":" + this.getTagName();
    if (this.getId() != null) html += " id='" + this.getId() + "'";
    var color = this.getColorHtml();
    if (this._on != null) html += " on='" + this._on + "'";
    if (color != null) html += " color='" + color + "'";
    if (this._alpha != null && this._alpha < 1) html += " opacity='" + this._alpha + "'";
    if (this._width != null) html += " weight='" + vector.toUnit(this._width) + "'";
    html += "/>";
    return html;
  };  


  /**
   * true if all the information contained in this class can be reprented in VML by attributes of the parent <v:shape> tag. if false, a child <v:stroke> tag must be created in the parent's paint routine
   * @return {boolean} true if alpha is null or 1 (the default value) and there is no dashstyle
   * @package
   */
  Stroke_prototype.canInline = function() {
    return (this._alpha == 1 || this._alpha == null);
  };

  /**
   * parses a VectorStroke from a string representation, that format is "color width alpha"
   * @param v {String} the string representation
   * @return {VectorStroke} null if v is empty, v if v is already a VectorStroke, or otherwise a new VectorStroke created by parsing the string according to the format specified above
   */
  Stroke.valueOf = function( v ) {
    if (jsx3.util.strEmpty(v)) return null;
    if (v instanceof Stroke) return v;
    var tokens = v.toString().split(/\s+/);
    return new Stroke(tokens[0], tokens[1], tokens[2]);
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Represents a vector fill, the color and gradient that fills a solid vector shape.
 */
jsx3.Class.defineClass("jsx3.vector.Fill", jsx3.html.Tag, null, function(Fill, Fill_prototype) {

  var vector = jsx3.vector;

  Fill._TAGNAME = null;

  /**
   * The instance initializer.
   * @param color {int|String} the color value, as a hex String or 24-bit integer value, defaults to 0x000000
   * @param alpha {float} the opacity value, valid values are between 0 and 1, defaults to 1
   */
  Fill_prototype.init = function(color, alpha) {
    //call constructor for super class
    this.jsxsuper(vector.TAGNS, Fill._TAGNAME);
    
    /* @jsxobf-clobber-shared */
    this._on = null;
    /* @jsxobf-clobber */
    this._color = color != null ? color : 0x000000;
    /* @jsxobf-clobber */
    this._alpha = alpha != null ? vector.constrainAlpha(alpha) : 1;
    /* @jsxobf-clobber */
    this._type = null;
    // all these are ignored unless type is 'gradient' or 'gradientradial'
    /* @jsxobf-clobber */
    this._color2 = null;
    /* @jsxobf-clobber */
    this._alpha2 = null;
    /* @jsxobf-clobber */
    this._angle = null;
    /* @jsxobf-clobber */
    this._colors = null;
  };

  /**
   * Returns the color field, as previously set in the constructor or with setColor().
   */
  Fill_prototype.getColor = function() {
    return this._color;
  };

  /**
   * Returns the color field, as a CSS hex string.
   * @return {String}
   */
  Fill_prototype.getColorHtml = function() {
    return vector.colorAsHtml(this._color);
  };
  
  /**
   * Sets the color field.
   * @param color {string/number} the new value for color
   */
  Fill_prototype.setColor = function( color ) {
    this._color = color;
  };

  /**
   * Returns the alpha field, as previously set in the constructor or with setAlpha().
   * @return {float} alpha
   */
  Fill_prototype.getAlpha = function() {
    return this._alpha;
  };

  /**
   * Sets the alpha field, valid values are between 0 (transparent) and 1 (opaque)..
   * @param alpha {float} the new value for alpha
   */
  Fill_prototype.setAlpha = function( alpha ) {
    this._alpha = alpha != null ? vector.constrainAlpha(alpha) : null;
  };

  /**
   * Returns the type field, as set with setType().
   * @return {String} type
   */
  Fill_prototype.getType = function() {
    return this._type;
  };

  /**
   * Sets the type field, valid values are enumerated in the VML specification, though only 'solid', 'gradient', and 'gradientradial' are truly supported by this class.
   * @param type {String} the new value for type
   */
  Fill_prototype.setType = function( type ) {
    this._type = type;
  };

  /**
   * Returns the color2 field, as set with setColor2().
   */
  Fill_prototype.getColor2 = function() {
    return this._color2;
  };

  /**
   * ? getColor2Html() {String} gets the color2 field, as a CSS hex string
   */
  Fill_prototype.getColor2Html = function() {
    return vector.colorAsHtml(this._color2);
  };
  
  /**
   * Sets the color2 field.
   * @param color2 {string/number} the new value for color2
   */
  Fill_prototype.setColor2 = function( color2 ) {
    this._color2 = color2;
  };

  /**
   * Returns the alpha2 field, as set with setAlpha2().
   * @return {float} alpha2
   */
  Fill_prototype.getAlpha2 = function() {
    return this._alpha2;
  };

  /**
   * Sets the alpha2 field, valid values are between 0 (transparent) and 1 (opaque)..
   * @param alpha2 {float} the new value for alpha2
   */
  Fill_prototype.setAlpha2 = function( alpha2 ) {
    this._alpha2 = alpha2;
  };

  /**
   * Returns the angle field (the angle along which the gradient goes), as set with setAngle().
   * @return {int} angle
   */
  Fill_prototype.getAngle = function() {
    return this._angle;
  };

  /**
   * Sets the angle field, valid values are between 0 and 360. 0 is the vector pointing rightward.
   * @param angle {int} the new value for angle
   */
  Fill_prototype.setAngle = function( angle ) {
    this._angle = angle;
  };

  /**
   * Returns the colors field, as set with setColors().
   * @return {String} colors
   */
  Fill_prototype.getColors = function() {
    return this._colors;
  };

  /**
   * Sets the colors field, see the documentation for &lt;fill&gt; in the VML documentation.
   * @param colors {String} the new value for colors
   */
  Fill_prototype.setColors = function( colors ) {
    this._colors = colors;
  };

  Fill_prototype.toString = function() {
    return "<fill " + this.getColorHtml() + " " + this.getAlpha() + "/>";
  };

  
  Fill_prototype.hasGradient = function() {
    return this._type && this._type != "solid";
  };
  
  Fill_prototype.canInline = function() {
    return (this._alpha == 1 || this._alpha == null) && ! this.hasGradient();
  };
    

  /**
   * Parses a vector fill from its string representation. The format is <code>"color alpha"</code>.
   * @param v {String|jsx3.vector.Fill} the string representation of a fill.
   * @return {jsx3.vector.Fill} <code>null</code> if <code>v</code> is empty, <code>v</code> if <code>v</code>
   *     is already a vector fill, or otherwise a new vector fill created by parsing the string according to the
   *     format specified above.
   */
  Fill.valueOf = function( v ) {
    if (jsx3.util.strEmpty(v)) return null;
    if (v instanceof Fill) return v;
    var tokens = v.toString().split(/\s+/);
    return new Fill(tokens[0], tokens[1]);
  };
    
  /**
   * vetoes all child appends
   * @package
   */
  Fill_prototype.onAppendChild = function( child ) {
    return false;
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Represents a grouping of vector shapes.
 */
jsx3.Class.defineClass("jsx3.vector.Group", jsx3.vector.Tag, null, function(Group, Group_prototype) {

  /**
   * The instance initializer.
   * @param left {int} left position (in pixels) of the object relative to its parent container
   * @param top {int} top position (in pixels) of the object relative to its parent container
   * @param width {int} width (in pixels) of the object
   * @param height {int} height (in pixels) of the object
   */
  Group_prototype.init = function(left, top, width, height) {
    //call constructor for super class
    this.jsxsuper(Group._TAGNAME, left, top, width, height);
  };
  
  
  Group._TAGNAME = "g";

  Group_prototype.paintUpdate = function() {    
    this.jsxsuper();
    
    var l = this.getLeft() || Number(0);
    var t = this.getTop() || Number(0);
    if (l || t)
      this.setProperty("transform", "translate(" + l + "," + t + ")");
  };
  

  /**
   * veto anything that is not a valid vector group child
   * @package
   */
  Group_prototype.onAppendChild = function( child ) {
    return child instanceof Group || child instanceof jsx3.vector.BaseShape;
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _on
/**
 * A vector tag that can have fill and stroke. The base class for several other vector classes.
 *
 * @abstract
 */
jsx3.Class.defineClass("jsx3.vector.BaseShape", jsx3.vector.Tag, null, function(Shape, Shape_prototype) {

  var Tag = jsx3.html.Tag;
  var vector = jsx3.vector;
  
  /**
   * The instance initializer.
   * @param strTagName {String}
   * @param left {int} left position (in pixels) of the object relative to its parent container
   * @param top {int} top position (in pixels) of the object relative to its parent container
   * @param width {int} width (in pixels) of the object
   * @param height {int} height (in pixels) of the object
   */
  Shape_prototype.init = function(strTagName, left, top, width, height) {
    //call constructor for super class
    this.jsxsuper(strTagName != null ? strTagName : Shape._TAGNAME, left, top, width, height);

    // not quite children, we'll store these as properties so that rendering can be as efficient
    // as possible
    /* @jsxobf-clobber-shared */
    this._fill = null;
    /* @jsxobf-clobber-shared */
    this._stroke = null;
  };


  Shape._TAGNAME = "path";

  Shape_prototype.paintUpdate = function() {
    this.jsxsuper();

    if (this._fill != null) {
      if (this._fill.hasGradient()) {
        // get the first explicit id
        var node = this;
        var id;
        while (!(id = node.getId()))
          node = node.getParent();
        var gradientId = "grad_" + id;

        // remove gradient from DOM if already part of it
        if (this._gradient != null && this._gradient.getParent() != null)
          this._gradient.getParent().removeChild(this._gradient);

        this.setProperty("fill", "url(#" + gradientId + ")");
        this.removeProperty("fill-opacity");

        /* @jsxobf-clobber */
        this._gradient = new Tag(vector.TAGNS, "linearGradient");
        this._gradient.setId(gradientId);

        // figure out gradient vector according to VML angle
        var degrees = this._fill.getAngle() || Number(0);
        var radians = jsx3.util.numMod((2 * Math.PI / 360 * (-1 * degrees - 90)), (2 * Math.PI));
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var max = Math.max(Math.abs(cos), Math.abs(sin));
        sin /= max; cos /= max; // normalize so larger one is 1 or -1
        this._gradient.setProperty("x1", jsx3.util.numRound(0.5 - cos/2, 0.0001),
                                   "y1", jsx3.util.numRound(0.5 - sin/2, 0.0001),
                                   "x2", jsx3.util.numRound(0.5 + cos/2, 0.0001),
                                   "y2", jsx3.util.numRound(0.5 + sin/2, 0.0001));
        // reverse rotation transform to be compatible with VML
        var rotation = this.getRotation();
        if (rotation)
          this._gradient.setProperty("gradientTransform", "rotate(" + (-rotation) + ")");

        var c1 = new Tag(vector.TAGNS, "stop");
        c1.setProperty("offset", "0%",
                       "stop-color", this._fill.getColorHtml(),
                       "stop-opacity", this._fill.getAlpha());
        this._gradient.appendChild(c1);

        var colors = this._fill.getColors();
        if (colors) {
          var stops = colors.split(/\s*,\s*/);
          for (var i = 0; i < stops.length; i++) {
            var tokens = jsx3.util.strTrim(stops[i]).split(/\s+/, 2);
            if (tokens.length == 2) {
              var percent = parseInt(tokens[0]);
              if (! isNaN(percent)) {
                var cn = new Tag(vector.TAGNS, "stop");
                cn.setProperty("offset", percent + "%",
                               "stop-color", tokens[1]);
                this._gradient.appendChild(cn);
              }
            }
          }
        }
        var cx = new Tag(vector.TAGNS, "stop");
        cx.setProperty("offset", "100%",
                       "stop-color", this._fill.getColor2Html(),
                       "stop-opacity", this._fill.getAlpha2() != null ? this._fill.getAlpha2() : 1);
        this._gradient.appendChild(cx);

        this.getDefs().appendChild(this._gradient);
      } else {
        this.setProperty("fill", this._fill.getColorHtml(),
                         "fill-opacity", this._fill.getAlpha());
      }
    } else {
      this.setProperty("fill", "none");
      this.removeProperty("fill-opacity");

      if (this._gradient != null && this._gradient.getParent() != null)
        this._gradient.getParent().removeChild(this._gradient);
    }

    if (this._stroke != null) {
      var width = this._stroke.getWidth();
      this.setProperty("stroke", this._stroke.getColorHtml(),
                       "stroke-width", width || Number(1),
                       "stroke-opacity", this._stroke.getAlpha());
    } else {
      this.setProperty("stroke", "none");
      this.removeProperty("stroke-width", "stroke-opacity");
    }

    var transform = [];
    var l = this.getLeft() || Number(0);
    var t = this.getTop() || Number(0);
    if (l || t) transform.push("translate(" + l + "," + t + ")");
    var rotation = this.getRotation();
    if (rotation) transform.push("rotate(" + rotation + "," + Math.round(this.getWidth()/2) + "," +
        Math.round(this.getHeight()/2)  + ")");

    this.setProperty("transform", transform.length > 0 ? transform.join(" ") : null);
  };


  // veto invalid children of this tag
  Shape_prototype.onAppendChild = function( child ) {
    return child instanceof vector.TextLine ||
           child instanceof vector.Fill ||
           child instanceof vector.Stroke || typeof(child) == "string";
  };

  /**
   * Sets the fill of this shape, other fills may be present as children of this instance.
   * @param fill {jsx3.vector.Fill} the fill value.
   */
  Shape_prototype.setFill = function( fill ) {
    this._fill = fill;
  };

  /**
   * Sets the stroke of this shape, other strokes may be present as children of this instance.
   * @param stroke {jsx3.vector.Stroke} the stroke value.
   */
  Shape_prototype.setStroke = function( stroke ) {
    this._stroke = stroke;
  };

  /**
   * Returns the fill of this shape.
   */
  Shape_prototype.getFill = function() {
    return this._fill;
  };

  /**
   * Returns the stroke of this shape.
   */
  Shape_prototype.getStroke = function() {
    return this._stroke;
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * A vector shape element. The path field can contain an EPS-like path defining a complex vector shape.
 */
jsx3.Class.defineClass("jsx3.vector.Shape", jsx3.vector.BaseShape, null, function(Shape, Shape_prototype) {

  var vector = jsx3.vector;


  Shape_prototype.getPath = function() {
    this._savePath();
    return this.getProperty("d");
  };

  Shape_prototype.setPath = function( path ) {
    this._pathtokens = [path];
    this.setProperty("d", path);
  };

  Shape_prototype.pathMoveTo = function(x, y, bRel) {
    this._appendPath((bRel ? "m" : "M") + " " + x + " " + y);
    return this;
  };
  
  Shape_prototype.pathLineTo = function(x, y, bRel) {
    this._appendPath((bRel ? "l" : "L") + " " + x + " " + y);
    return this;
  };
  
  Shape_prototype.pathArcTo = function(cx, cy, rx, ry, x1, y1, x2, y2, bCW) {
    var h1 = Math.sqrt(Math.pow((x1-cx), 2) + Math.pow((y1-cy), 2));
    var h2 = Math.sqrt(Math.pow((x2-cx), 2) + Math.pow((y2-cy), 2));
    var th1 = Math.asin((cy-y1) / h1); // y dimension is reversed compared with standard math diagram
    if (x1 - cx < 0) th1 = (th1 > 0 ? Math.PI : -Math.PI) - th1;
    var th2 = Math.asin((cy-y2) / h2);
    if (x2 - cx < 0) th2 = (th2 > 0 ? Math.PI : -Math.PI) - th2;
    
    var thDelta = bCW ? th1 - th2 : th2 - th1;
    var gt180 = (thDelta > -1 * Math.PI && thDelta < 0) || thDelta > Math.PI;
//    jsx3.log("circle {" + cx + "," + cy + "," + rx + "} from {" + x1 + "," + y1 + "} to {" + x2 + "," + y2 + "} " + 
//        "bCW:" + bCW + " th1:" + th1 + " th2:" + th2 + " gt180:" + gt180);
    
    this.pathLineTo(x1, y1)._appendPath(
        "A " + rx + " " + ry + " 0 " + (gt180 ? "1" : "0") + " " + (bCW ? "1" : "0") + " " + x2 + " " + y2);
    return this;    
  };
  
  Shape_prototype.pathClose = function() {
    this._appendPath("z");
    return this;
  };
  
  
  /**
   * appends text to the end of the current path field
   * @param pathSegment {String} the text to append
   * @private 
   * @jsxobf-clobber
   */
  Shape_prototype._appendPath = function( pathSegment ) {
    if (!this._pathtokens)
      /* @jsxobf-clobber */
      this._pathtokens = [];
    this._pathtokens.push(pathSegment);
  };

  /**
   * @private
   * @jsxobf-clobber
   */
  Shape_prototype._savePath = function() {
    if (this._pathtokens && this._pathtokens.length > 1) {
      var path = this._pathtokens.join(" ");
      this.setPath(path);
    }
  };

  /** 
   * custom paint logic needed to render a vector shape
   * @package
   */
  Shape_prototype.paintUpdate = function() {
    this._savePath();
    this.jsxsuper();
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Paints a vector line defined by two end points.
 */
jsx3.Class.defineClass("jsx3.vector.Line", jsx3.vector.BaseShape, null, function(Line, Line_prototype) {

  
  Line_prototype.init = function(left, top, x1, y1, x2, y2) {
    this.jsxsuper("line", left, top);
    this.setPoints(x1, y1, x2, y2);
  };
  
  Line_prototype.setPoints = function( x1, y1, x2, y2 ) {
    this.setX1(x1);
    this.setY1(y1);
    this.setX2(x2);
    this.setY2(y2);
  };

  Line_prototype.getX1 = function() { return this.getProperty("x1"); };
  Line_prototype.setX1 = function(x1) { this.setProperty("x1", x1); };
  Line_prototype.getY1 = function() { return this.getProperty("y1"); };
  Line_prototype.setY1 = function(y1) { this.setProperty("y1", y1); };
  Line_prototype.getX2 = function() { return this.getProperty("x2"); };
  Line_prototype.setX2 = function( x2 ) {this.setProperty("x2", x2); };
  Line_prototype.getY2 = function() { return this.getProperty("y2"); };
  Line_prototype.setY2 = function( y2 ) { this.setProperty("y2", y2); };
  
  
  Line_prototype.toString = function() {
    return "<line " + this.getId() + " {" + this.getX1() + "," + this.getY1() +
        "} {" + this.getX2() + "," + this.getY2() + "}/>";
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Paints a vector rectangle.
 */
jsx3.Class.defineClass("jsx3.vector.Rectangle", jsx3.vector.BaseShape, null, function(Rectangle, Rectangle_prototype) {

  /**
   * The instance initializer.
   * @param left {int} left position (in pixels) of the object relative to its parent container
   * @param top {int} top position (in pixels) of the object relative to its parent container
   * @param width {int} width (in pixels) of the object
   * @param height {int} height (in pixels) of the object
   */
  Rectangle_prototype.init = function(left, top, width, height) {
    //call constructor for super class
    this.jsxsuper("rect", left, top, width, height);
  };

  /**
   * Clips this rectangle to the bounds of <code>obj</code>.
   * @param obj {jsx3.gui.Block|jsx3.html.BlockTag} any object that has <code>getLeft()</code>, etc methods.
   */
  Rectangle_prototype.clipToBox = function( obj ) {
    this.clipTo(obj.getLeft(), obj.getTop(), obj.getWidth(), obj.getHeight());
  };
  
  /**
   * Clips this rectangle to the bounds of {l1, t1, w1, h1}.
   * @param l1 {int}
   * @param t1 {int}
   * @param w1 {int}
   * @param h1 {int}
   */
  Rectangle_prototype.clipTo = function( l1, t1, w1, h1 ) {
    var l = Math.max(this.getLeft(), l1);
    var t = Math.max(this.getTop(), t1);
    var w = Math.min(this.getWidth() - (l-this.getLeft()), l1 + w1 - l);
    var h = Math.min(this.getHeight() - (t-this.getTop()), t1 + h1 - t);
    
    // TODO: rectangle's stroke will not clip correctly
    this.setDimensions(l, t, w, h);
  };


  Rectangle_prototype.getWidth = function() {
    var s = this.getProperty("width");
    return s != null ? parseInt(s) : null;
  };

  Rectangle_prototype.setWidth = function( width ) {
    this.setProperty("width", typeof(width) == "number" ? width + "px" : width);
  };

  Rectangle_prototype.getHeight = function() {
    var s = this.getProperty("height");
    return s != null ? parseInt(s) : null;
  };

  Rectangle_prototype.setHeight = function( height ) {
    this.setProperty("height", typeof(height) == "number" ? height + "px" : height);
  };
  
  
});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Paints a vector oval bounded by the box defined by its left, top, width, and height.
 */
jsx3.Class.defineClass("jsx3.vector.Oval", jsx3.vector.BaseShape, null, function(Oval, Oval_prototype) {

  /**
   * The instance initializer.
   * @param left {int} left position (in pixels) of the object relative to its parent container
   * @param top {int} top position (in pixels) of the object relative to its parent container
   * @param width {int} width (in pixels) of the object
   * @param height {int} height (in pixels) of the object
   */
  Oval_prototype.init = function(left, top, width, height) {
    //call constructor for super class
    this.jsxsuper(Oval._TAGNAME, left, top, width, height);
  };


  Oval._TAGNAME = "ellipse";

  Oval_prototype.getLeft = function() {
    var s = this.getProperty("cx");
    return s != null ? parseInt(s) : null;
  };

  Oval_prototype.setLeft = function( left ) {
    this.setProperty("cx", typeof(left) == "number" ? left + "px" : left);
  };

  Oval_prototype.getTop = function() {
    var s = this.getProperty("cy");
    return s != null ? parseInt(s) : null;
  };

  Oval_prototype.setTop = function( top ) {
    this.setProperty("cy", typeof(top) == "number" ? top + "px" : top);
  };

  Oval_prototype.getWidth = function() {
    var s = this.getProperty("rx");
    return s != null ? 2 * parseInt(s) : null;
  };

  Oval_prototype.setWidth = function( width ) {
    this.setProperty("rx", width != null ? (parseFloat(width) / 2) + "px" : null);
  };

  Oval_prototype.getHeight = function() {
    var s = this.getProperty("ry");
    return s != null ? 2 * parseInt(s) : null;
  };

  Oval_prototype.setHeight = function( height ) {
    this.setProperty("ry", height != null ? (parseFloat(height) / 2) + "px" : null);
  };

  Oval_prototype.paintUpdate = function() {    
    this.jsxsuper();
    
    this.setProperty("transform", "translate(" + (this.getWidth()/2) + "," + (this.getHeight()/2) + ")");
  };
  
  
});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Paints a vector polygon defined by a set of points.
 */
jsx3.Class.defineClass("jsx3.vector.Polygon", jsx3.vector.BaseShape, null, function(Polygon, Polygon_prototype) {

  /**
   * The instance initializer.
   * @param left {int} left position (in pixels) of the object relative to its parent container
   * @param top {int} top position (in pixels) of the object relative to its parent container
   * @param points {string/array} the list of points comprising the polygon
   */
  Polygon_prototype.init = function(left, top, points) {
    //call constructor for super class
    this.jsxsuper("polyline", left, top);
    this.setPoints(points);
  };

  /**
   * Sets the polygon points as an array of point objects or strings.
   * @param points {Array<String>} an array of strings or objects that stringify as <code>"x y"</code>.
   */
  Polygon_prototype.setPoints = function( points ) {
    this.setProperty("points", points ? points.join(" ") : null);
  };
  
  /**
   * Sets the polygon points as an array of coordinates.
   * @param points {Array<int>} an array of alternating x and y coordinates.
   */
  Polygon_prototype.setPointsAsNumberArray = function( points ) {
    this.setProperty("points", points ? points.join(" ") : null);
  };
  
  /**
   * Sets the points as a string.
   * @param points {String} a string in the form "x1 y1 x2 y2 ..."
   */
  Polygon_prototype.setPointsAsString = function( points ) {
    this.setProperty("points", points);
  };
  
});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _fill _stroke
/**
 * Renders text along an arbitrary line.
 */
jsx3.Class.defineClass("jsx3.vector.TextLine", jsx3.vector.BaseShape, [jsx3.html.FontTag], function(TextLine, TextLine_prototype) {

  var Tag = jsx3.html.Tag;
  var Browser = jsx3.app.Browser;
  var vector = jsx3.vector;
  

  TextLine_prototype.init = function(x1, y1, x2, y2, text) {
    /* @jsxobf-clobber */
    this._x1 = x1;
    /* @jsxobf-clobber */
    this._y1 = y1;
    /* @jsxobf-clobber */
    this._x2 = x2;
    /* @jsxobf-clobber */
    this._y2 = y2;
    
    var w = Math.max(1, Math.max(x1, x2) - Math.min(x1, x2));
    var h = Math.max(1, Math.max(y1, y2) - Math.min(y1, y2));
    //call constructor for super class
    this.jsxsuper("text", null, null, w, h);
    
    var angle = 0;
    var hypo = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
    if (y1 >= y2) {
      angle = 360 - Math.round(Math.acos((x2-x1)/hypo) * 180 / Math.PI);
    } else {
      angle = Math.round(Math.acos((x2-x1)/hypo) * 180 / Math.PI);
    }
    /* @jsxobf-clobber */
    this._angle = angle % 360;
    
    /* @jsxobf-clobber */
    this._text = new jsx3.html.Text(text);
  };

  TextLine_prototype.getText = function() {
    return this._text.getText();
  };

  TextLine_prototype.setText = function( text ) {
    this._text.setText(text);
  };
  
  TextLine_prototype.paintUpdate = function() {
    if (! this.getProperty("fill")) {
      if (this._fill) {
        this.setProperty("fill", this._fill.getColorHtml(),
                         "fill-opacity", this._fill.getAlpha());
      } else {
        var style = Browser.getStyleClass("." + this.getClassName()) || Number(0);
        if (style && style.color != null) {
          this.setProperty("fill", style.color);
        } else {
          this.removeProperty("fill", "fill-opacity");
        }
      }
    }

    if (this._stroke != null) {
      var width = this._stroke.getWidth();
      this.setProperty("stroke", this._stroke.getColorHtml(),
                       "stroke-width", width || Number(1));
    } else {
      this.removeProperty("stroke", "stroke-width");
    }
    
    // fix offset from line to match the VML implementation
    var fontSize = this.getFontSize();
    if (fontSize == null) {
      var style = Browser.getStyleClass("." + this.getClassName());
      if (style != null)
        fontSize = style.fontSize;
    }
    this.setProperty("dy", fontSize ? Math.floor(parseInt(fontSize)/2.5) : 0);
    
    // fix text alignment
    var textAlign = this.getTextAlign();
    if (! textAlign) {
      var style = Browser.getStyleClass("." + this.getClassName());
      if (style != null)
        textAlign = style.textAlign;
    }
    
    var x = null, y = null, anchor = null;
    if (textAlign == "left") {
      anchor = "start";
      x = this._x1;
      y = this._y1;
    } else if (textAlign == "right") {
      anchor = "end";
      x = this._x2;
      y = this._y2;      
    } else {
      anchor = "middle";
      x = Math.round((this._x2+this._x1)/2);
      y = Math.round((this._y2+this._y1)/2);
    } 
    this.setProperty("text-anchor", anchor,
                     "x", x,
                     "y", y);
    
    if (this._angle > 0)
      this.setProperty("transform", "rotate(" + this._angle + "," + x + "," + y + ")");
    else
      this.removeProperty("transform");
    
    if (this._text.getParent() == null)
      this.appendChild(this._text);
  };  
  
  TextLine_prototype.getFontFamily = function() { return this.getProperty("font-family"); };
  TextLine_prototype.setFontFamily = function( fontFamily ) { this.setProperty("font-family", fontFamily); };
  TextLine_prototype.getFontStyle = function() { return this.getProperty("font-style"); };
  TextLine_prototype.setFontStyle = function( fontStyle ) { this.setProperty("font-style", fontStyle); };
  TextLine_prototype.getFontWeight = function() { return this.getProperty("font-weight"); };
  TextLine_prototype.setFontWeight = function( fontWeight ) { this.setProperty("font-weight", fontWeight); };
  TextLine_prototype.getTextDecoration = function() { return this.getProperty("text-decoration"); };
  TextLine_prototype.setTextDecoration = function( textDecoration ) { this.setProperty("text-decoration", textDecoration); };
  TextLine_prototype.getColor = function() { return this.getProperty("fill"); };
  TextLine_prototype.setColor = function( color ) { this.setProperty("fill", color); };
  
  TextLine_prototype.onAppendChild = function( child ) {
    return child instanceof jsx3.html.Text;
  };
    

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * A more efficient way of painting many vector lines of the same color and thickness.
 */
jsx3.Class.defineClass("jsx3.vector.LineGroup", jsx3.vector.Shape, null, function(LineGroup, LineGroup_prototype) {

  /**
   * The instance initializer.
   * @param left {int} left position (in pixels) of the object relative to its parent container
   * @param top {int} top position (in pixels) of the object relative to its parent container
   * @param width {int} width (in pixels) of the object
   * @param height {int} height (in pixels) of the object
   */
  LineGroup_prototype.init = function(left, top, width, height) {
    //call constructor for super class
    this.jsxsuper(null, left, top, width, height);
  };

  /**
   * add a line to the group
   * @param x1 {int} the x-coordinate of the start point of the line
   * @param y1 {int} the y-coordinate of the start point of the line
   * @param x2 {int} the x-coordinate of the end point of the line
   * @param y2 {int} the y-coordinate of the end point of the line
   */
  LineGroup_prototype.addLine = function( x1, y1, x2, y2 ) {
    this.pathMoveTo(x1, y1).pathLineTo(x2, y2);
  };

  /**
   * add a line to the group
   * @param x1 {int} the x-coordinate of the start point of the line
   * @param y1 {int} the y-coordinate of the start point of the line
   * @param dx {int} the horizontal change from the start to the end point of the line
   * @param dy {int} the vertical change from the start to the end point of the line
   */
  LineGroup_prototype.addRelativeLine = function( x1, y1, dx, dy ) {
    this.pathMoveTo(x1, y1).pathLineTo(dx, dy, true);
  };

  /**
   * clear all lines out of the group
   */
  LineGroup_prototype.clearLines = function() {
    this.setPath("");
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * A more efficient way of painting many vector rectangles of the same fill and stroke.
 */
jsx3.Class.defineClass("jsx3.vector.RectangleGroup", jsx3.vector.Shape, null, function(RectangleGroup, RectangleGroup_prototype) {

  /**
   * The instance initializer.
   * @param left {int} left position (in pixels) of the object relative to its parent container
   * @param top {int} top position (in pixels) of the object relative to its parent container
   * @param width {int} width (in pixels) of the object
   * @param height {int} height (in pixels) of the object
   */
  RectangleGroup_prototype.init = function(left, top, width, height) {
    //call constructor for super class
    this.jsxsuper(null, left, top, width, height);
  };

  /**
   * add a rectangle to this group
   * @param x1 {int} the x-coordinate of the left edge of the rectangle
   * @param y1 {int} the y-coordinate of the top edge of the rectangle
   * @param x2 {int} the x-coordinate of the right edge of the rectangle
   * @param y2 {int} the y-coordinate of the bottom edge of the rectangle
   */
  RectangleGroup_prototype.addRectangle = function( x1, y1, x2, y2 ) {
    this.pathMoveTo(x1, y1).pathLineTo(x2, y1).pathLineTo(x2, y2).pathLineTo(x1, y2).pathClose();
  };

  /**
   * add a rectangle to this group
   * @param x1 {int} the x-coordinate of the left edge of the rectangle
   * @param y1 {int} the y-coordinate of the top edge of the rectangle
   * @param w {int} the width of the rectangle
   * @param h {int} the height of the rectangle
   */
  RectangleGroup_prototype.addRelativeRectangle = function( x1, y1, w, h ) {
    this.pathMoveTo(x1, y1).pathLineTo(w, 0, true).pathLineTo(0, h, true).pathLineTo((-1 * w), 0, true).pathClose();
  };

  /**
   * clear all rectangles out of the group
   */
  RectangleGroup_prototype.clearRectangles = function() {
    this.setPath("");
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

jsx3.require("jsx3.gui.Block");

/**
 * Defines a base class for GUI controls that implement both the cross-platform box profile painting introduced in
 * 3.2 and the cross-platform (VML/SVG) vector painting, also introduced in 3.2.
 * <p/>
 * This class should be extended by custom GUI classes that will display vector elements.
 *
 * @since 3.5
 */
jsx3.Class.defineClass("jsx3.vector.Block", jsx3.gui.Block, null, function(Block, Block_prototype) {

  /**
   * Returns the vector canvas on which this control paints itself. If no canvas has already been created, then
   * <code>createVector()</code> is called to create it.
   * @return {jsx3.vector.Tag}
   */
  Block_prototype.getCanvas = function() {
    if (this._canvas == null)
      this.createVector();
    return this._canvas;
  };

  /**
   * Creates the vector tag tree that will render this GUI control. Subclasses of this class should override this
   * method to specify the manner in which they render.
   * <p/>
   * The basic template for a method overriding this method is:
   * <pre>
   * CustomVector.prototype.createVector = function() {
   *   var objCanvas = this.jsxsuper();
   *   // modify objCanvas, add children, etc.
   *   return objCanvas;
   * };
   * </pre>
   * This method should do the work of creating and updating the vector tree to the state when it is ready to be
   * rendered on screen, but without calling <code>updateVector()</code> directly.
   *
   * @return {jsx3.vector.Tag}
   * @see #updateVector()
   */
  Block_prototype.createVector = function() {
    this.applyDynamicProperties();

    // refresh the render root by release the old one
    var oldroot = this._canvas;

    // create the new render root
    var objVector = this.createCanvas();
    objVector.setId(this.getId());
    objVector.setZIndex(this.getZIndex());
    objVector.setPosition(this.getRelativePosition() ? "relative" : "absolute");

    this._updateVector(objVector);

    // set attributes from jsx3.gui.Painted interface
    var attr = this.getAttributes();
    for (var f in attr)
      objVector.setProperty(f, attr[f]);

    if (oldroot != null)
      oldroot.release();

    /* @jsxobf-clobber */
    this._canvas = objVector;
    return objVector;
  };

  /**
   * Updates the pre-existing vector tree of this control on, for example, a resize or repaint event. Methods
   * overriding this method should return <code>true</code> if the update is successful or <code>false</code> to
   * force the vector tree to be completely recreated with <code>createVector()</code>.
   * <p/>
   * The basic template for a method overriding this method is:
   * <pre>
   * CustomVector.prototype.updateVector = function(objVector) {
   *   this.jsxsuper(objVector);
   *   // modify objCanvas, modify children, etc.
   *   return true;
   * };
   * </pre>
   *
   * @param objVector {jsx3.vector.Tag} the root of the vector render tree.
   * @return {boolean} <code>true</code> if the tree could be updated inline or <code>false</code> if it must be
   *    recreated by calling <code>createVector()</code>.
   * @see #createVector()
   */
  Block_prototype.updateVector = function(objVector) {
    this.applyDynamicProperties();
    this._updateVector(objVector);
    return true;
  };

  /** @private @jsxobf-clobber */
  Block_prototype._updateVector = function(objVector) {
    var box = this.getBoxProfile(true);
    objVector.setLeft(box.getPaintedLeft());
    objVector.setTop(box.getPaintedTop());
    objVector.setWidth(box.getPaintedWidth());
    objVector.setHeight(box.getPaintedHeight());
  };

  /**
   * Instantiates and returns a new instance of <code>jsx3.vector.Canvas</code>. The implementation of
   * <code>createVector()</code> in this class calls this method to create the base vector tag. This method may be
   * overridden to provide a base tag of another type that <code>Canvas</code>.
   * @return {jsx3.vector.Tag}
   */
  Block_prototype.createCanvas = function() {
    return new jsx3.vector.Canvas();
  };


  /** @package */
  Block_prototype.isDomPaint = function() {
    return true;
  };

  /** @package */
  Block_prototype.paint = function() {
    throw new jsx3.Exception();
  };

  /** @package */
  Block_prototype.paintDom = function() {
    if (this._canvas == null)
      this.createVector();
    return this._canvas.paintDom();
  };


/** @package */
  Block_prototype.repaint = function() {
    if (!this._canvas || !this.updateVector(this._canvas))
      this.createVector();
    return this.jsxsuper();
  };

  /**
   * Renders a cross-platform vector event handler. When an event of type <code>strEvtType</code> bubbles up to the
   * HTML element rendered by <code>objElm</code>, the instance method of this object whose name is
   * <code>strMethod</code> will be called with two parameters: the browser event wrapped in an instance of
   * <code>jsx3.gui.Event</code>, and the native <code>HTMLElement</code> that defined the event handler.
   *
   * @param strEvtType {String} the event type, one of <code>jsx3.gui.Event.CLICK</code>, etc.
   * @param strMethod {String} the instance method to call on this object when the event is received.
   * @param objElm {jsx3.vector.Tag} the HTML element to which to add the event handler.
   *
   * @see jsx3.vector#paintEventHandler()
   */
  Block_prototype.paintEventHandler = function(strEvtType, strMethod, objElm) {
    if (objElm == null) objElm = this.getCanvas();
    jsx3.vector.paintEventHandler(this, strEvtType, strMethod, objElm);
  };

  /** @package */
  Block_prototype.createBoxProfile = function(objImplicit) {
    //the implicit object must either provide a canvas dimension to live within (parentwidth/parentheight) or must explicitly define the size (width/height)
    if (this.getParent() && (objImplicit == null || ((isNaN(objImplicit.parentwidth) || isNaN(objImplicit.parentheight))))) {
      objImplicit = this.getParent().getClientDimensions(this);
    } else if (objImplicit == null) {
      objImplicit = {};
    }

    var bRelative = this.getRelativePosition() != jsx3.gui.Block.ABSOLUTE;
    var myLeft = (bRelative) ? null : this.getLeft();
    var myTop = (bRelative) ? null : this.getTop();

    if (!objImplicit.boxtype) objImplicit.boxtype = (bRelative) ? "relativebox" : "box";
    objImplicit.tagname = "span";
    if (objImplicit.left == null && myLeft != null) objImplicit.left = myLeft;
    if (objImplicit.top == null && myTop != null) objImplicit.top = myTop;
    objImplicit.width = this.getWidth();
    objImplicit.height = this.getHeight();

    return new jsx3.gui.Painted.Box(objImplicit);
  };

  /** @package */
  Block_prototype.updateBoxProfile = function(objImplicit, objGUI, objQueue) {
    if (objGUI) {
      var b1 = this.getBoxProfile(true, objImplicit);
      var val = b1.recalculate(objImplicit, objGUI, objQueue);
      if (val.w || val.h) this.repaint();
    }
  };

  /** @package */
  Block_prototype.doClone = function(objCloneParent) {
    this._canvas = null;
    return this.jsxsuper(objCloneParent);
  };

  /** @package */
  Block_prototype.getCanSpy = function() {
    return true;
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Objects that implement this interface may be used in Line/Area/Point/Bubble charts to render the points that appear
 * at each datapoint.
 * <p/>
 * Additionally, this interface contains several static fields that are implementors of this interface.
 */
jsx3.Class.defineInterface("jsx3.chart.PointRenderer", null, function(PointRenderer, PointRenderer_prototype) {
  
  var vector = jsx3.vector;
  
  /**
   * Renders the point in the bounds specified by {x1,y1} {x2,y2}.
   * @param x1 {int} 
   * @param y1 {int} 
   * @param x2 {int} 
   * @param y2 {int} 
   * @param fill {jsx3.vector.Fill} 
   * @param stroke {jsx3.vector.Stroke} 
   * @return {jsx3.vector.Tag}
   */
  PointRenderer_prototype.render = jsx3.Method.newAbstract('x1', 'y1', 'x2', 'y2', 'fill', 'stroke');
  
  /**
   * Converts the area of the point to display to the radius of the box that it should fill. Required
   *    if the point renderer will be used in a plot chart.
   * @param area {Number} 
   * @return {Number}
   */
  PointRenderer_prototype.areaToRadius = jsx3.Method.newAbstract('area');

  
  /**
   * {jsx3.chart.PointRenderer} Creates a circular point.
   */
  PointRenderer.CIRCLE = PointRenderer.jsxclass.newInnerClass();
  PointRenderer.CIRCLE.areaToRadius = function(area) {
    return Math.sqrt(area/Math.PI);
  };

  PointRenderer.CIRCLE.render = function(x1, y1, x2, y2, fill, stroke) {
    var shape = new vector.Oval(x1, y1, x2-x1, y2-y1);
    shape.setFill(fill);
    shape.setStroke(stroke);
    return shape;
  };

  /**
   * {jsx3.chart.PointRenderer} Creates a x-shaped cross point.
   */
  PointRenderer.CROSS = PointRenderer.jsxclass.newInnerClass();
  
  /* @jsxobf-clobber */
  PointRenderer.CROSS.INNER_RATIO = 0.60; //Math.SQRT1_2;
  
  PointRenderer.CROSS.areaToRadius = function(area) {
    return Math.sqrt(area/(1-this.INNER_RATIO/Math.SQRT2))/2;
  };

  PointRenderer.CROSS.render = function(x1, y1, x2, y2, fill, stroke) {
    var d = x2 - x1;
    var innerRatio = this.INNER_RATIO;
    var p1 = Math.round(d * (1 - innerRatio) / 2);
    var p2 = Math.round(d * innerRatio / 2);
    var p3 = Math.round(d - d * (1 - innerRatio) / 2);
    var p4 = Math.round(d / 2);
    var shape = new vector.Polygon(0, 0, 
      [x1, y1,   x1 + p1, y1,   x1 + p4, y1 + p2,   x1 + p3, y1,   x2, y1,
                 x2, y1 + p1,   x2 - p2, y1 + p4,   x2, y1 + p3,   x2, y2,
                 x2 - p1, y2,   x2 - p4, y2 - p2,   x2 - p3, y2,   x1, y2,
                 x1, y2 - p1,   x1 + p2, y2 - p4,   x1, y2 - p3,   x1, y1]);
    shape.setFill(fill);
    shape.setStroke(stroke);
    return shape;  
  };

  /**
   * {jsx3.chart.PointRenderer} Creates a diamond shaped point.
   */
  PointRenderer.DIAMOND = PointRenderer.jsxclass.newInnerClass();
  
  /* @jsxobf-clobber */
  PointRenderer.DIAMOND.FACTOR = 1.2;

  PointRenderer.DIAMOND.areaToRadius = function(area) {
    return Math.sqrt(area)/2;
  };

  PointRenderer.DIAMOND.render = function(x1, y1, x2, y2, fill, stroke) {
    var cx = (x1 + x2) / 2;
    var cy = (y1 + y2) / 2;
    var w = (x2-x1) / this.FACTOR;
    var h = (y2-y1) / this.FACTOR;
    var shape = new vector.Rectangle(Math.round(cx - w/2), Math.round(cy - h/2), 
        Math.round(w), Math.round(h));
    shape.setRotation(45);
    shape.setFill(fill);
    shape.setStroke(stroke);
    return shape;  
  };

  /**
   * {jsx3.chart.PointRenderer} Creates a square point.
   */
  PointRenderer.BOX = PointRenderer.jsxclass.newInnerClass();

  PointRenderer.BOX.areaToRadius = function(area) {
    return Math.sqrt(PointRenderer.DIAMOND.FACTOR * PointRenderer.DIAMOND.FACTOR * area)/2;
  };

  PointRenderer.BOX.render = function(x1, y1, x2, y2, fill, stroke) {
    var shape = new vector.Rectangle(x1, y1, x2-x1, y2-y1);
    shape.setFill(fill);
    shape.setStroke(stroke);
    return shape;  
  };

  /**
   * {jsx3.chart.PointRenderer} Creates an upward-pointing triangular point.
   */
  PointRenderer.TRIANGLE = PointRenderer.jsxclass.newInnerClass();

  PointRenderer.TRIANGLE.areaToRadius = function(area) {
    return Math.sqrt(2*area)/2;
  };

  PointRenderer.TRIANGLE.render = function(x1, y1, x2, y2, fill, stroke) {
    var xmid = Math.round((x1+x2)/2);
    var shape = new vector.Polygon(0, 0, [xmid, y1, x2, y2, x1, y2, xmid, y1]);
    shape.setFill(fill);
    shape.setStroke(stroke);
    return shape;  
  };
  
});


// DEPRECATED: remove in next version
jsx3.chart.Renderers = jsx3.chart.PointRenderer;
jsx3.chart.Renderers.Circle = jsx3.chart.PointRenderer.CIRCLE;
jsx3.chart.Renderers.Cross = jsx3.chart.PointRenderer.CROSS;
jsx3.chart.Renderers.Diamond = jsx3.chart.PointRenderer.DIAMOND;
jsx3.chart.Renderers.Box = jsx3.chart.PointRenderer.BOX;
jsx3.chart.Renderers.Triangle = jsx3.chart.PointRenderer.TRIANGLE;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

jsx3.require("jsx3.gui.Block");

/**
 * A base class for every logical component of a chart. A chart component exists in the DOM tree and 
 * is selectable with ctrl-click in a component editor in General Interface Builder.
 */
jsx3.Class.defineClass("jsx3.chart.ChartComponent", jsx3.gui.Block, null, function(ChartComponent, ChartComponent_prototype) {

  var Event = jsx3.gui.Event;
  var Interactive = jsx3.gui.Interactive;
  var vector = jsx3.vector;
  var chart = jsx3.chart;
  
  ChartComponent.MASK_PROPS_NOEDIT = {NN: false, SS: false, EE: false, WW: false, MM: false};

  /**
   * The instance initializer.
   * @param name {String} the GI name of the instance
   */
  ChartComponent_prototype.init = function(name) {
    //call constructor for super class
    this.jsxsuper(name);
    
    /* @jsxobf-clobber */
    this.trans = null;
  };
  
  /**
   * Returns the chart of which this component is a part.
   * @return {jsx3.chart.Chart} this if this is a chart, or the first ancestor that is a chart
   */
  ChartComponent_prototype.getChart = function() {
    return this.findAncestor(function(x){return chart.Chart && x instanceof chart.Chart;}, true);
  };
  
  /**
   * Override to clear out transient object references.
   * @package
   */
  ChartComponent_prototype.doClone = function(objCloneParent) {
    this.trans = null;
    return this.jsxsuper(objCloneParent);
  };

  /**
   * This class defines the idiom in which all chart components are painted. Each component has a render
   * root, which is a VectorGroup. During the updateView() method, the component should add to the root
   * the vector paint helpers that are necessary to render the component. The component should assume that
   * the render root has been cleared before each call to updateView(). updateView() must always call its
   * super method.
   * <p/>
   * refreshes the render root and copies some basic HTML attributes and CSS styles from the component into the render root
   * @package
   */
  ChartComponent_prototype.updateView = function() {
    this.applyDynamicProperties();

    var parent = null, oldroot = this._canvas;
    
    // refresh the render root by release the old one
    if (oldroot != null) {
      // if this render root is attached to a parent, we'll keep track of that and attach the
      // new render root to the old parent
      parent = oldroot.getParent();
    }

    // create the new render root
    /* @jsxobf-clobber */
    var canvas = new vector.Group();

    // copy attributes set in the component into the render root
    canvas.setId(this.getId());
    canvas.setDimensions(this.getDimensions());
    canvas.setZIndex(this.getZIndex());
    canvas.setPosition(this.getRelativePosition() ? "relative" : "absolute");

    // set attributes from jsx3.gui.Painted interface
    var attr = this.getAttributes();
    for (var f in attr)
      canvas.setProperty(f, attr[f]);

    if (oldroot != null)
      oldroot.release();

    // attach new root to old parent
    if (parent != null)
      parent.replaceChild(canvas, oldroot);

    this._canvas = canvas;
  };

  /**
   * Gets the current render root. The current render root is thrown away after each call to updateView() so it is not safe to hold onto it across calls to updateView()
   * @return {jsx3.vector.Group}
   * @package
   */
  ChartComponent_prototype.getCanvas = function() {
    if (this._canvas == null)
      this.updateView();
    return this._canvas;
  };
  
  ChartComponent_prototype.setEventProperties = function(objTag) {
    jsx3.chart.setEventProperties(this, objTag);
  };

/* @JSC */ if (jsx3.CLASS_LOADER.VML) {

  ChartComponent_prototype.paint = function() {
    if (this._canvas == null)
      this.updateView();
    return this._canvas.paint();
  };

/* @JSC */ } else if (jsx3.CLASS_LOADER.SVG) {

  ChartComponent_prototype.isDomPaint = function() {
    return true;
  };

  ChartComponent_prototype.paint = function() {
    throw new jsx3.Exception();
  };

  ChartComponent_prototype.paintDom = function() {
    if (this._canvas == null)
      this.updateView();
    return this._canvas.paintDom();
  };

/* @JSC */ }

  ChartComponent_prototype.repaint = function() {
    this.updateView();
    return this.jsxsuper();
  };

  /**
   * store a local field that will never be serialized; uses a separate namespace than normal instance fields
   * @param name {String} the name of the field
   * @param value {Object} the value of the field
   * @package
   */
  ChartComponent_prototype.storeTransient = function( name, value ) {
    // since this.trans is regular javascript object, it won't be serialized
    if (this.trans == null) this.trans = {};
    this.trans[name] = value;
  };

  /**
   * fetches the value of a field set with storeTransient()
   * @param name {String} the name of the field
   * @return {Object} the value of the field
   * @package
   */
  ChartComponent_prototype.fetchTransient = function( name ) {
    return (this.trans != null) ? this.trans[name] : null;
  };

  /**
   * removes a field set with storeTransient()
   * @param name {String} the name of the field
   * @package
   */
  ChartComponent_prototype.clearTransient = function( name ) {
    if (this.trans != null)
      delete this.trans[name];
  };

  ChartComponent_prototype.getMaskProperties = function() {
    return ChartComponent.MASK_PROPS_NOEDIT;
  };

  /**
   * parses the padding field into an array of four int values 
   * @return {Array<int>} [top,right,bottom,left]
   * @package
   */
  ChartComponent_prototype.getPaddingDimensions = function() {
    return jsx3.html.BlockTag.getDimensionsFromCss(this.getPadding());
  };

  ChartComponent_prototype.getCanSpy = function() {
    return true;
  };
  

  /**
   * Returns the release/build for the class (i.e., "2.2.00").
   * @return {String}
   * @deprecated
   */
  ChartComponent.getVersion = function() {
    return chart.VERSION;
  };


});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

jsx3.require("jsx3.chart.ChartComponent");

/**
 * A chart component to render a text box. Used to render the titles of charts, legends, axes, and series.
 * Encapsulates all the font settings of the label so that the parent container does not experience 
 * property bloat.
 */
jsx3.Class.defineClass("jsx3.chart.ChartLabel", jsx3.chart.ChartComponent, null, function(ChartLabel, ChartLabel_prototype) {
  
  var vector = jsx3.vector;
  
  /**
   * {int} the default preferred width
   */
  ChartLabel.DEFAULT_WIDTH = 100;

  /**
   * {int} non-rotated angle
   * @final @jsxobf-final
   */
  ChartLabel.ROTATION_NORMAL = 0;

  /**
   * {int} angle for one-quarter clockwise rotation
   * @final @jsxobf-final
   */
  ChartLabel.ROTATION_CW = 90;

  /**
   * {int} angle for one-quarter counter-clockwise rotation
   * @final @jsxobf-final
   */
  ChartLabel.ROTATION_CCW = 270;

  /**
   * The instance initializer.
   * @param name {String} the GI name of the instance
   * @param text {String} text to display in the label
   */
  ChartLabel_prototype.init = function(name, text) {
    //call constructor for super class
    this.jsxsuper(name);

    this.jsxtext = text;
    this.alpha = null;
    this.borderStroke = null;
    this.preferredWidth = null;
    this.preferredHeight = null;
    this.labelRotation = ChartLabel.ROTATION_NORMAL;
  };

  /**
   * Returns the text field.
   * @return {String} text
   */
  ChartLabel_prototype.getText = function() {
    return this.jsxtext;
  };

  /**
   * Sets the text field.
   * @param text {String} the new value for text
   */
  ChartLabel_prototype.setText = function( text ) {
    this.jsxtext = text;
  };

  /**
   * Returns the preferredWidth field.
   * @return {int} preferredWidth
   */
  ChartLabel_prototype.getPreferredWidth = function() {
    if (this.preferredWidth != null) {
      return this.preferredWidth;
    } else if (this.isRotated()) {
      return this._getNormalDimension();
    } else {
      var padding = this.getPaddingDimensions();
      return ChartLabel.DEFAULT_WIDTH + padding[0] + padding[2];
    }
  };

  /**
   * Sets the preferredWidth field.
   * @param preferredWidth {int} the new value for preferredWidth
   */
  ChartLabel_prototype.setPreferredWidth = function( preferredWidth ) {
    this.preferredWidth = preferredWidth;
  };

  /**
   * Returns the preferredHeight field.
   * @return {int} preferredHeight
   */
  ChartLabel_prototype.getPreferredHeight = function() {
    if (this.preferredHeight != null) {
      return this.preferredHeight;
    } else if (this.isRotated()) {
      var padding = this.getPaddingDimensions();
      return ChartLabel.DEFAULT_WIDTH + padding[1] + padding[3];
    } else {
      return this._getNormalDimension();
    }
  };

  /**
   * Sets the preferredHeight field.
   * @param preferredHeight {int} the new value for preferredHeight
   */
  ChartLabel_prototype.setPreferredHeight = function( preferredHeight ) {
    this.preferredHeight = preferredHeight;
  };

  /**
   * crude estimate of the height of the font, plus padding above and below
   * @private
   * @jsxobf-clobber
   */
  ChartLabel_prototype._getNormalDimension = function() {
    var padding = this.getPaddingDimensions();
    var fontsize = this.getFontSize() != null ? this.getFontSize() : 10;
    return Math.round(fontsize * 1.5) + 
        (this.isRotated() ? padding[1] + padding[3] : padding[0] + padding[2]);
  };

  /**
   * Returns the alpha field, the opacity of the background fill.
   * @return {float} alpha
   */
  ChartLabel_prototype.getAlpha = function() {
    return this.alpha;
  };

  /**
   * Sets the alpha field.
   * @param alpha {float} the new value for alpha
   */
  ChartLabel_prototype.setAlpha = function( alpha ) {
    this.alpha = alpha != null ? vector.constrainAlpha(alpha) : null;
  };

  /**
   * Returns the borderStroke field, string representation of the VectorStroke used to outline the background.
   * @return {String} borderStroke
   */
  ChartLabel_prototype.getBorderStroke = function() {
    return this.borderStroke;
  };

  /**
   * Sets the borderStroke field.
   * @param borderStroke {String} the new value for borderStroke
   */
  ChartLabel_prototype.setBorderStroke = function( borderStroke ) {
    this.borderStroke = borderStroke;
  };

  /**
   * Returns the labelRotation field.
   * @return {int} labelRotation
   */
  ChartLabel_prototype.getLabelRotation = function() {
    return this.labelRotation;
  };

  /**
   * Sets the labelRotation field.
   * @param labelRotation {int} the new value for labelRotation, one of {0, 90, 270}
   */
  ChartLabel_prototype.setLabelRotation = function( labelRotation ) {
    this.labelRotation = labelRotation;
  };

  /**
   * whether this label is display at 90 or -90 degrees
   * @return {boolean}
   */
  ChartLabel_prototype.isRotated = function() {
    return this.labelRotation == ChartLabel.ROTATION_CW ||
        this.labelRotation == ChartLabel.ROTATION_CCW;
  };
  
  /**
   * Renders all vector elements and appends them to the render root.
   * @package
   */
  ChartLabel_prototype.updateView = function() {
    this.jsxsuper();
    var root = this.getCanvas();

    var w = this.getWidth();
    var h = this.getHeight();
    var padding = this.getPaddingDimensions();
    
    // model event hooks:
    this.setEventProperties();
            
    // background
    var bg = new vector.Rectangle(0, 0, w, h);
    root.appendChild(bg);

    jsx3.chart.copyBackgroundToFill(this, bg);
    var fill = bg.getFill();
    
    // bg stroke
    var stroke = vector.Stroke.valueOf(this.borderStroke);
    if (stroke != null) {
      bg.setStroke(stroke);
    } else if (fill != null && (this.alpha == null || this.alpha == 1)) {
      bg.setStroke(new vector.Stroke(fill.getColor()));
    }

    
    var y1 = 0, y2 = 0, x1 = 0, x2 = 0;
    if (this.isRotated()) {
      x1 = x2 = Math.round(padding[3] + (w-padding[1]-padding[3])/2);
      if (this.labelRotation == ChartLabel.ROTATION_CW) {
        y2 = h;
      } else {
        y1 = h;
      }
    } else {
      y1 = y2 = Math.round(h/2);
      x1 = 0;
      x2 = w;
    }
    
    var textElement = new vector.TextLine(x1, y1, x2, y2, this.jsxtext);
    textElement.setColor(this.getColor());
    textElement.setClassName(this.getClassName());
    textElement.setFontFamily(this.jsxfontname);
    textElement.setFontWeight(this.jsxfontweight);
    textElement.setFontSize(this.jsxfontsize);
    textElement.setTextAlign(this.jsxtextalign);

    root.appendChild(textElement);    
  };
  
  /**
   * No children allowed.
   * @package
   */
  ChartLabel_prototype.onSetChild = function() {
    return false;
  };
  
  ChartLabel_prototype.onSetParent = function(objParent) {
    return objParent instanceof jsx3.chart.ChartComponent || objParent instanceof jsx3.chart.Chart;
  };


  /**
   * Returns the release/build for the class (i.e., "2.2.00").
   * @return {String}
   * @deprecated
   */
  ChartLabel.getVersion = function() {
    return jsx3.chart.VERSION;
  };


});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

jsx3.require("jsx3.chart.ChartComponent");

/**
 * A base class for all types of axis. Provides all the common properties as well as all rendering
 * logic. Rendering relies on template methods implemented in concrete subclasses.
 * <p/>
 * An axis renders in the following location based on its horizontal and primary properties:
 * <pre>
 *   horizontal x primary   -> bottom
 *   vertical x primary     -> left
 *   horizontal x secondary -> top
 *   vertical x secondary   -> right</pre>
 */
jsx3.Class.defineClass("jsx3.chart.Axis", jsx3.chart.ChartComponent, null, function(Axis, Axis_prototype) {
  
  var vector = jsx3.vector;
  var Stroke = vector.Stroke;
  var chart = jsx3.chart;
  
  /**
   * {String}
   * @final @jsxobf-final
   */
  Axis.TICK_INSIDE = "inside";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Axis.TICK_OUTSIDE = "outside";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Axis.TICK_CROSS = "cross";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Axis.TICK_NONE = "none";


  /**
   * {String}
   * @final @jsxobf-final
   */
  Axis.LABEL_HIGH = "high";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Axis.LABEL_LOW = "low";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Axis.LABEL_AXIS = "axis";

  /**
   * Values for the 'tickPlacement' and 'minorTickPlacement' fields that result in tick display.
   * @private
   * @jsxobf-clobber
   */
  Axis._TICK_ALIGNMENTS = {inside: 1, outside: 1, cross: 1};

  /**
   * Valid values for the 'labelPlacement' field.
   * @private
   * @jsxobf-clobber
   */
  Axis._LABEL_PLACEMENTS = {axis: 1, high: 1, low: 1};

  // label placement enumeration
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._LP_TOP = 1;
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._LP_RIGHT = 2;
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._LP_BOTTOM = 4;
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._LP_LEFT = 3;
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._LP_LEFTOFAXIS = 7;
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._LP_RIGHTOFAXIS = 8;
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._LP_ABOVEAXIS = 6;
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._LP_BELOWAXIS = 5;

  // figured this out with boolean decision matrix
  /** @private @jsxobf-clobber */
  Axis._PLACEMENT_MATRIX = [
    Axis._LP_LEFT, Axis._LP_BOTTOM, Axis._LP_RIGHT, Axis._LP_TOP,
    Axis._LP_RIGHT, Axis._LP_TOP, Axis._LP_LEFT, Axis._LP_BOTTOM,
    Axis._LP_RIGHTOFAXIS, Axis._LP_ABOVEAXIS, Axis._LP_LEFTOFAXIS, Axis._LP_BELOWAXIS
  ];
  
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._LABEL_LINEHEIGHT = 10;
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._DEFAULT_VERTICAL_WIDTH = 50;
  /** @private @jsxobf-clobber @jsxobf-final */
  Axis._DEFAULT_HORIZONTAL_WIDTH = 12;

  /**
   * formats labels as a percent, ie "50%"
   * @param v {Number}
   * @return {String}
   */
  Axis.percent = function(v) {
    return v + "%";
  };

  /**
   * formats labels in scientific notation, ie "5e2"
   * @param v {Number}
   * @param signif {int}
   * @return {String}
   */
  Axis.scientific = function(v, signif) {
    if (v == 0) return "0";
    if (signif == null) signif = 2;
    var neg = v < 0;
    v = Math.abs(v);
    var log = Math.floor(Math.log(v) / Math.LN10);
    var c = log != 0 ? v/Math.pow(10,log) : v;
    c = c.toString();
    var point = c.indexOf(".");
    if (point >= 0)
      if (c.length - point - 1 > signif) c = c.substring(0, point + 1 + signif);
    return (neg ? "-" : "") + c + "e" + log;
  };

  /**
   * The instance initializer.
   * @param name {String} the GI name of the instance
   * @param horizontal {boolean} whether this axis is horizontal (x), otherwise it's vertical (y)
   * @param primary {boolean} whether this axis is primary, otherwise it's secondary
   */
  Axis_prototype.init = function(name, horizontal, primary) {
    //call constructor for super class
    this.jsxsuper(name);

    this.horizontal = horizontal != null ? jsx3.Boolean.valueOf(horizontal) : null;
    this.primary = primary != null ? jsx3.Boolean.valueOf(primary) : null;

    this.length = 100;
    this.showAxis = jsx3.Boolean.TRUE;
    this.axisStroke = "#000000";
    this.showLabels = jsx3.Boolean.TRUE;
    this.labelGap = 3;
    this.labelRotation = 0;
    this.labelPlacement = Axis.LABEL_AXIS;
    this.tickLength = 3;
    this.tickPlacement = Axis.TICK_OUTSIDE;
    this.tickStroke = "#000000";
    this.minorTickDivisions = 4;
    this.minorTickLength = 3;
    this.minorTickPlacement = Axis.TICK_NONE;
    this.minorTickStroke = null;
    this.labelFunction = null;
    
    this.labelClass = null;
    this.labelStyle = null;
    this.labelColor = null;
    
    this.displayWidth = null;
  };
  
  /**
   * determine the value that should be displayed at a major tick, either the number value or the string category name
   * @param index {int} the index of the tick in the array returned by getMajorTicks()
   * @return {Number|String}
   * @package
   */
  Axis_prototype.getValueForTick = jsx3.Method.newAbstract('index');

  /**
   * Returns the coordinates of the major ticks.
   * @return {Array} an array of the coordinates (in order, between 0 and this.length) of the major ticks of this axis
   * @package
   */
  Axis_prototype.getMajorTicks = jsx3.Method.newAbstract();

  /**
   * whether or not the value of 0 is displayed between (non-inclusive) the minimum and maximum value of this axis
   * @return {boolean}
   * @package
   */
  Axis_prototype.isZeroInRange = jsx3.Method.newAbstract();

  /**
   * rendering an axis is 2-pass, this is the first pass called before updateView()
   * @package
   */
  Axis_prototype.prePaintUpdate = jsx3.Method.newAbstract();

  /**
   * Returns the horizontal field, whether this is an x axis, otherwise it is a y axis.
   * @return {boolean} horizontal
   */
  Axis_prototype.getHorizontal = function() {
    return this.horizontal;
  };

  /**
   * Sets the horizontal field.
   * @param horizontal {boolean} the new value for horizontal
   */
  Axis_prototype.setHorizontal = function( horizontal ) {
    this.horizontal = horizontal;
  };

  /**
   * Returns the primary field, whether this is a primary axis, otherwise it is a secondary axis.
   * @return {boolean} primary
   * @package
   */
  Axis_prototype.getPrimary = function() {
    return this.primary;
  };

  /**
   * Sets the primary field.
   * @param primary {boolean} the new value for primary
   * @package
   */
  Axis_prototype.setPrimary = function( primary ) {
    this.primary = primary;
  };

  /**
   * Returns the length field, the length of the axis in the coordinates space of this component; note that the axis should not rely on its actual dimensions for this information.
   * @return {int} length
   * @package
   */
  Axis_prototype.getLength = function() {
    return this.length;
  };

  /**
   * Sets the length field, an axis must know its length before it can render properly.
   * @param length {int} the new value for length
   * @package
   */
  Axis_prototype.setLength = function( length ) {
    this.length = length;
  };

  /**
   * Returns the showAxis field, whether to show the line along the axis.
   * @return {boolean} showAxis
   */
  Axis_prototype.getShowAxis = function() {
    return this.showAxis;
  };

  /**
   * Sets the showAxis field.
   * @param showAxis {boolean} the new value for showAxis
   */
  Axis_prototype.setShowAxis = function( showAxis ) {
    this.showAxis = showAxis;
  };

  /**
   * Returns the labelFunction field.
   * @return {Function} labelFunction
   */
  Axis_prototype.getLabelFunction = function() {
    return chart.getFunctionField(this, "labelFunction");
  };

  /**
   * Sets the labelFunction field, allows for formatting and transformation of a major tick label.
   * The function will be applied to this object when called. 
   * Note that passing a function reference to this method will prevent the value from being persisted if this
   * object is serialized.
   * @param labelFunction {String | Function} the new value for labelFunction, a function with the signature
   *     <code>function(value : Number|String, index : int) : String</code>.
   */
  Axis_prototype.setLabelFunction = function( labelFunction ) {
    chart.setReferenceField(this, "labelFunction", labelFunction);
  };

  /**
   * Returns the axisStroke field, string representation of the VectorStroke used to draw the line of the axis.
   * @return {String} axisStroke
   */
  Axis_prototype.getAxisStroke = function() {
    return this.axisStroke;
  };

  /**
   * Sets the axisStroke field.
   * @param axisStroke {String} the new value for axisStroke
   */
  Axis_prototype.setAxisStroke = function( axisStroke ) {
    this.axisStroke = axisStroke;
  };

  /**
   * Returns the showLabels field, whether to show major tick labels.
   * @return {boolean} showLabels
   */
  Axis_prototype.getShowLabels = function() {
    return this.showLabels;
  };

  /**
   * Sets the showLabels field.
   * @param showLabels {boolean} the new value for showLabels
   */
  Axis_prototype.setShowLabels = function( showLabels ) {
    this.showLabels = showLabels;
  };

  /**
   * Returns the labelGap field, the pixel gap between the tick lines and the labels.
   * @return {int} labelGap
   */
  Axis_prototype.getLabelGap = function() {
    return this.labelGap;
  };

  /**
   * Sets the labelGap field.
   * @param labelGap {int} the new value for labelGap
   */
  Axis_prototype.setLabelGap = function( labelGap ) {
    this.labelGap = labelGap;
  };

  /**
   * Returns the labelRotation field, the rotation angle of each label.
   * @return {int} labelRotation
   * @package  Not yet implemented.
   */
  Axis_prototype.getLabelRotation = function() {
    return this.labelRotation;
  };

  /**
   * Sets the labelRotation field.
   * @param labelRotation {int} the new value for labelRotation
   * @package  Not yet implemented.
   */
  Axis_prototype.setLabelRotation = function( labelRotation ) {
    this.labelRotation = labelRotation;
  };

  /**
   * Returns the labelPlacement field, where to place the labels relative to the axis and chart.
   * @return {String} labelPlacement, one of {'axis','high','low'}
   * @package  Not yet implemented.
   */
  Axis_prototype.getLabelPlacement = function() {
    return this.labelPlacement;
  };

  /**
   * Sets the labelPlacement field, checks for invalid values.
   * @param labelPlacement {String} the new value for labelPlacement, one of {'axis','high','low'}
   */
  Axis_prototype.setLabelPlacement = function( labelPlacement ) {
    if (Axis._LABEL_PLACEMENTS[labelPlacement]) {
      this.labelPlacement = labelPlacement;
    } else {
      throw new jsx3.IllegalArgumentException("labelPlacement", labelPlacement);
    }
  };

  /**
   * Returns the tickLength field, the length in pixels of the major tick (if tickPlacement is "cross" the length will actually be twice this.
   * @return {int} tickLength
   */
  Axis_prototype.getTickLength = function() {
    return this.tickLength;
  };

  /**
   * Sets the tickLength field.
   * @param tickLength {int} the new value for tickLength
   */
  Axis_prototype.setTickLength = function( tickLength ) {
    this.tickLength = tickLength;
  };

  /**
   * Returns the tickPlacement field, where to place the major ticks.
   * @return {String} tickPlacement, one of {'none','inside','outside','cross'}
   */
  Axis_prototype.getTickPlacement = function() {
    return this.tickPlacement;
  };

  /**
   * Sets the tickPlacement field.
   * @param tickPlacement {String} the new value for tickPlacement, one of {'none','inside','outside','cross'}
   */
  Axis_prototype.setTickPlacement = function( tickPlacement ) {
    if (Axis._TICK_ALIGNMENTS[tickPlacement] || tickPlacement == Axis.TICK_NONE) {
      this.tickPlacement = tickPlacement;
    } else {
      throw new jsx3.IllegalArgumentException("tickPlacement", tickPlacement);
    }
  };

  /**
   * Returns the tickStroke field, string representation of VectorStroke used to draw major ticks.
   * @return {String} tickStroke
   */
  Axis_prototype.getTickStroke = function() {
    return this.tickStroke;
  };

  /**
   * Sets the tickStroke field.
   * @param tickStroke {String} the new value for tickStroke
   */
  Axis_prototype.setTickStroke = function( tickStroke ) {
    this.tickStroke = tickStroke;
  };

  /**
   * Returns the minorTickDivisions field, number of minor tick divisions between major ticks; the number of minor ticks drawn will be this number minus 1.
   * @return {int} minorTickDivisions
   */
  Axis_prototype.getMinorTickDivisions = function() {
    return this.minorTickDivisions;
  };

  /**
   * Sets the minorTickDivisions field.
   * @param minorTickDivisions {int} the new value for minorTickDivisions
   */
  Axis_prototype.setMinorTickDivisions = function( minorTickDivisions ) {
    this.minorTickDivisions = minorTickDivisions;
  };

  /**
   * Returns the minorTickLength field, the length in pixels of the minor tick (if tickPlacement is "cross" the length will actually be twice this.
   * @return {int} minorTickLength
   */
  Axis_prototype.getMinorTickLength = function() {
    return this.minorTickLength;
  };

  /**
   * Sets the minorTickLength field.
   * @param minorTickLength {int} the new value for minorTickLength
   */
  Axis_prototype.setMinorTickLength = function( minorTickLength ) {
    this.minorTickLength = minorTickLength;
  };

  /**
   * Returns the minorTickPlacement field, where to place the minor ticks.
   * @return {String} minorTickPlacement, one of {'none','inside','outside','cross'}
   */
  Axis_prototype.getMinorTickPlacement = function() {
    return this.minorTickPlacement;
  };

  /**
   * Sets the minorTickPlacement field.
   * @param minorTickPlacement {String} the new value for minorTickPlacement, one of {'none','inside','outside','cross'}
   */
  Axis_prototype.setMinorTickPlacement = function( minorTickPlacement ) {
    if (Axis._TICK_ALIGNMENTS[minorTickPlacement] || minorTickPlacement == Axis.TICK_NONE) {
      this.minorTickPlacement = minorTickPlacement;
    } else {
      throw new jsx3.IllegalArgumentException("minorTickPlacement", minorTickPlacement);
    }
  };

  /**
   * Returns the minorTickStroke field, string representation of VectorStroke used to draw minor ticks.
   * @return {String} minorTickStroke
   */
  Axis_prototype.getMinorTickStroke = function() {
    return this.minorTickStroke;
  };

  /**
   * Sets the minorTickStroke field.
   * @param minorTickStroke {String} the new value for minorTickStroke
   */
  Axis_prototype.setMinorTickStroke = function( minorTickStroke ) {
    this.minorTickStroke = minorTickStroke;
  };

  /**
   * Returns the labelClass field, the CSS class used to render major tick labels.
   * @return {String} labelClass
   */
  Axis_prototype.getLabelClass = function() {
    return this.labelClass;
  };

  /**
   * Sets the labelClass field.
   * @param labelClass {String} the new value for labelClass
   */
  Axis_prototype.setLabelClass = function( labelClass ) {
    this.labelClass = labelClass;
  };

  /**
   * Returns the labelStyle field, the CSS style attribute used to render major tick labels.
   * @return {String} labelStyle
   */
  Axis_prototype.getLabelStyle = function() {
    return this.labelStyle;
  };

  /**
   * Sets the labelStyle field.
   * @param labelStyle {String} the new value for labelStyle
   */
  Axis_prototype.setLabelStyle = function( labelStyle ) {
    this.labelStyle = labelStyle;
  };

  /**
   * Returns the labelColor field, the RGB color value of the label font; note that this is the only way to set the color of the text, using a CSS style attribute will have no effect.
   * @return {string/number} labelColor
   */
  Axis_prototype.getLabelColor = function() {
    return this.labelColor;
  };

  /**
   * Sets the labelColor field.
   * @param labelColor {string/number} the new value for labelColor
   */
  Axis_prototype.setLabelColor = function( labelColor ) {
    this.labelColor = labelColor;
  };

  /**
   * Returns the display width, the maximum amount of space perpendicular to the axis and outside of the data area that the ticks and labels may occupy (doesn't include area given to axis title).
   * @return {int} displayWidth
   */
  Axis_prototype.getDisplayWidth = function() {
    if (this.displayWidth != null) {
      return this.displayWidth;
    } else {
      return this.horizontal ? Axis._DEFAULT_HORIZONTAL_WIDTH : Axis._DEFAULT_VERTICAL_WIDTH;
    }
  };

  /**
   * Sets the displayWidth field.
   * @param displayWidth {int} the new value for displayWidth
   */
  Axis_prototype.setDisplayWidth = function( displayWidth ) {
    this.displayWidth = displayWidth;
  };

  /**
   * Renders all vector elements and appends them to the render root.
   * @package
   */
  Axis_prototype.updateView = function() {
    this.jsxsuper();
    var root = this.getCanvas();

    // this is a monster sized method
    
    var w = this.getWidth();
    var h = this.getHeight();
    
    var oAxis = this.getOpposingAxis();
    if (oAxis == null) return; // can't render without it!
    
    // coordinate along the length of this axis where the opposing axis crosses
    var axisAt = this._getAxisCrossPoint(oAxis);
    
    // model event hooks:
    this.setEventProperties();
            
    // draw axis
    if (this.showAxis) {
      var axisLineView = new vector.Line(0, 0, 0, 0, 0, 0);
      root.appendChild(axisLineView);
      
      var stroke = Stroke.valueOf(this.axisStroke);
      if (stroke == null) stroke = new Stroke();
      axisLineView.setStroke(stroke);
      
      if (this.horizontal)
        axisLineView.setPoints(0, axisAt, this.length, axisAt);
      else
        axisLineView.setPoints(axisAt, 0, axisAt, this.length);
    }
    
    // draw major ticks
    var ticks = this.getMajorTicks();
    if (Axis._TICK_ALIGNMENTS[this.tickPlacement] && this.tickLength > 0) {
      // use a LineGroup to reduce VML tag and object count
      var majorTicksView = new vector.LineGroup(0, 0, w, h);
      root.appendChild(majorTicksView);
      
      var stroke = Stroke.valueOf(this.tickStroke);
      majorTicksView.setStroke(stroke);
      
      var metrics = this._getTickMetrics(this.tickPlacement, this.tickLength);
      var length = metrics[0];
      var start = axisAt + metrics[1];
      
      this._attachTicks(majorTicksView, ticks, start, length);
    }
    
    // draw minor ticks
    if (Axis._TICK_ALIGNMENTS[this.minorTickPlacement] && this.minorTickLength > 0) {
      // use a LineGroup to reduce VML tag and object count
      var minorTicksView = new vector.LineGroup(0, 0, w, h);
      root.appendChild(minorTicksView);

      var stroke = Stroke.valueOf(this.minorTickStroke);
      minorTicksView.setStroke(stroke);
      
      var metrics = this._getTickMetrics(this.minorTickPlacement, this.minorTickLength);
      var length = metrics[0];
      var start = axisAt + metrics[1];
      
      var last = 0;
      for (var i = 0; i < ticks.length; i++) {
        var minorTicks = this._getMinorTicks(ticks, i);
        this._attachTicks(minorTicksView, minorTicks, start, length);
        last = ticks[i];
      }
      
      // display minor ticks between the last major tick and the end of the axis
      // only relevant if the min/max/interval are set manually since otherwise the axis is always
      // a multiple of the interval
      if (last < this.length) {
        var minorTicks = this._getMinorTicks(ticks, ticks.length);
        this._attachTicks(minorTicksView, minorTicks, start, length);
      }
    }
    
    var labelMetrics = this._getLabelMetrics(axisAt);
    
    // draw title
    var title = this.getAxisTitle();
    if (title != null && title.getDisplay() != jsx3.gui.Block.DISPLAYNONE) {
      var titleEdge = labelMetrics[5];
      var transform = (this.horizontal && this.primary) || (!this.horizontal && !this.primary) ?
        0 : -1;

      if (this.horizontal) {
        var t = titleEdge + transform * title.getPreferredHeight();
        title.setDimensions(0, t, this.length, title.getPreferredHeight());
      } else {
        var l = titleEdge + transform * title.getPreferredWidth();
        title.setDimensions(l, 0, title.getPreferredWidth(), this.length);
      }
      
      title.updateView();
      root.appendChild(title.getCanvas());
    }

    // draw labels
    if (this.showLabels) {
      var labelTicks = this._getLabelTicks();
      var labelsView = new vector.Group(0, 0, w, h);
      root.appendChild(labelsView);
      
      var placement = labelMetrics[0];
      var edge = labelMetrics[1];
      var transform = labelMetrics[2];
      
      /* @jsxobf-clobber */
      this._jsxlabelfill = null;
      
      for (var i = 0; i < labelTicks.length; i++) {
        var midpoint = labelTicks[i]; // the parallel point of the center of the label
        
        var width = null; // the horizontal width of the label
        if (this.horizontal) {
          var min = i > 0 ? (labelTicks[i-1] + labelTicks[i])/2 : null;
          var max = i < labelTicks.length-1 ? (labelTicks[i+1] + labelTicks[i])/2 : null;
          if (max == null && min != null) max = 2 * labelTicks[i] - min;
          else if (min == null && max != null) min = 2 * labelTicks[i] - max;
          if (max == null) {
            min = labelTicks[i] - 50;
            max = labelTicks[i] + 50;
          }
          width = Math.round(max - min);
        } else {
          width = this.getDisplayWidth() - this._getTickWidth() - this.labelGap;
        }
        
        if (this.horizontal) {
          var x1 = Math.round(midpoint-(width/2));
          var y = edge + transform * Math.round(Axis._LABEL_LINEHEIGHT/2);
          this._attachLabel(labelsView, x1, y, x1+width, y, this._getLabelForTick(i));
        } else {
          var x1 = (transform == 1) ? edge : edge - width;
          this._attachLabel(labelsView, x1, midpoint, x1+width, midpoint, this._getLabelForTick(i));
        }
      }
    }
  };
  
  /**
   * paint helper to attach a major tick label
   * @param group {jsx3.vector.Group} parent group
   * @param x1 {int} x coordinate of the start of the line forming the text path
   * @param y1 {int} y coordinate of the start of the line forming the text path
   * @param x2 {int} x coordinate of the end of the line forming the text path
   * @param y2 {int} y coordinate of the end of the line forming the text path
   * @param label {String} the text of the label
   * @private
   * @jsxobf-clobber
   */
  Axis_prototype._attachLabel = function(group, x1, y1, x2, y2, label) {
    if (!(label && label.toString().match(/\S/))) return;
    
    var text = new vector.TextLine(x1, y1, x2, y2, label);
    text.setClassName(this.labelClass);
    text.setExtraStyles(this.labelStyle);
    text.setColor(this.labelColor);
    
    // TODO: figure out math to support label rotation
//    var angle = this.getLabelRotation();
//    if (angle)
//      text.setRotation(angle);
    
    group.appendChild(text);
  };

  /**
   * determine the label that should be displayed at a major tick, simply applies the value of getValueForTick(index) to the label function, if any
   * @param index {int} the index of the tick in the array returned by getMajorTicks()
   * @return {String}
   * @private
   * @jsxobf-clobber
   */
  Axis_prototype._getLabelForTick = function(index) {
    var value = this.getValueForTick(index);
    var funct = this.getLabelFunction();
    return funct != null ? funct.apply(this, [value, index]) : (value != null ? value.toString() : "");
  };

  /**
   * the total distance that the major and minor ticks extrude from the axis
   * @return (int)
   * @private
   * @jsxobf-clobber
   */
  Axis_prototype._getTickWidth = function() {
    var major = (this.tickPlacement == Axis.TICK_OUTSIDE || this.tickPlacement == Axis.TICK_CROSS)
        ? this.tickLength : 0;
    var minor = (this.minorTickPlacement == Axis.TICK_OUTSIDE || this.minorTickPlacement == Axis.TICK_CROSS)
        ? this.minorTickLength : 0;
    return Math.max(major, minor);
  };
  
  /**
   * Returns the coordinate along the length of this axis where the opposing axis crosses.
   * @param oAxis {jsx3.chart.Axis} the opposing axis
   * @return {int}
   * @private
   * @jsxobf-clobber
   */
  Axis_prototype._getAxisCrossPoint = function(oAxis) {
    if (oAxis == null) {
      oAxis = this.getOpposingAxis();
      if (oAxis == null) return 0;
    }
    
    if (oAxis.isZeroInRange())
      return oAxis.getCoordinateFor(0);
    else if (this.primary)
      return this.horizontal ? oAxis.getLength() : 0;
    else
      return this.horizontal ? 0 : oAxis.getLength();
  };
  
  /**
   * paint helper to determine metrics related to drawing ticks
   * @param placement {String} one of {'inside','outside','cross'}
   * @param length {int} the length of the tick
   * @return {Array} [length, offset], length is the total length of the tick to draw, offset is the offset from the line of the axis where the tick should begin
   * @private
   * @jsxobf-clobber
   */
  Axis_prototype._getTickMetrics = function(placement, length) {
    var offset = 0;
    if (placement == Axis.TICK_CROSS) {
      offset = -1 * length;
      length *= 2;
    } else {
      // offset may be -length or 0 depending on which quadrant the axis is rendered in
      // figured this out with boolean decision matrix
      var condMet = 0;
      if (this.horizontal) condMet++;
      if (this.primary) condMet++;
      if (placement == Axis.TICK_INSIDE) condMet++;
      
      if (condMet % 2 == 1)
        offset = -1 * length;
    }
    return [length,offset];
  };
  
  /**
   * paint helper to determine metrics related to drawing labels
   * @param axisAt {int} value of this._getAxisCrossPoint()
   * @return {Array} :
   *      placement {int} one of jsx3.chart.Axis._LP_... depending on where the labels should be placed
   *      edge {int} inside edge of the label box, as pixels away from the line of the axis
   *      transform {int} 1 if labels are placed to the right or below something (increasing coordinate values), -1 otherwise
   *      outsideTickWidth {int} the width of the ticks extending on the outside of the axis
   *      insideTickWidth {int} the width of the ticks extending on the inside of the axis
   *      titleEdge {int} inside edge of the title box, as pixels away from the line of the axis
   * @private
   * @jsxobf-clobber
   */
  Axis_prototype._getLabelMetrics = function(axisAt) {
    var oAxis = this.getOpposingAxis();
    if (axisAt == null) axisAt = this._getAxisCrossPoint(oAxis);
    
    // crazy boolean decision matrix logic to avoid a gigantic if-else statement
    // determine row number in my decision matrix
    var placementIndex = 0;
    if (this.horizontal) placementIndex |= 1;
    if (this.primary) placementIndex |= 2;
    if (this.labelPlacement == Axis.LABEL_LOW) placementIndex |= 4;
    else if (this.labelPlacement == Axis.LABEL_AXIS) placementIndex |= 8;
    // lookup placement value by row number
    var placement = Axis._PLACEMENT_MATRIX[placementIndex];
    
    // determine inside and outside tick lengths
    var outsideTickWidth = 0;
    var insideTickWidth = 0;
    if (this.tickPlacement == Axis.TICK_OUTSIDE || this.tickPlacement == Axis.TICK_CROSS)
      outsideTickWidth = this.tickLength;
    if (this.tickPlacement == Axis.TICK_INSIDE || this.tickPlacement == Axis.TICK_CROSS)
      insideTickWidth = this.tickLength;
    if (this.minorTickPlacement == Axis.TICK_OUTSIDE || this.minorTickPlacement == Axis.TICK_CROSS)
      outsideTickWidth = Math.max(outsideTickWidth, this.minorTickLength);
    if (this.minorTickPlacement == Axis.TICK_INSIDE || this.minorTickPlacement == Axis.TICK_CROSS)
      insideTickWidth = Math.max(insideTickWidth, this.minorTickLength);

    var edge = null, transform = null, titleEdge = null;
    
    // determine edge and transform according to placement
    switch (placement) {
      case Axis._LP_TOP :
      case Axis._LP_LEFT :
        transform = -1;
        edge = 0 - this.labelGap;
        edge -= Math.max(0, outsideTickWidth - axisAt);
        break;
      case Axis._LP_RIGHT :
      case Axis._LP_BOTTOM :
        transform = 1;
        edge = oAxis.getLength() + this.labelGap;
        edge += Math.max(0, outsideTickWidth + axisAt - oAxis.getLength());
        break;
      case Axis._LP_LEFTOFAXIS :
      case Axis._LP_ABOVEAXIS :
        transform = -1;
        edge = axisAt - this.labelGap - outsideTickWidth;
        break;
      case Axis._LP_RIGHTOFAXIS :
      case Axis._LP_BELOWAXIS :
        transform = 1;
        edge = axisAt + this.labelGap + outsideTickWidth;
        break;
      default :
        chart.LOG.error("bad placement value: " + placement);
    }
    
    // do titleEdge, unlike label placement, titles are always displayed in the quadrant according
    // to the axis' horizontal and primary properties
    if (this.showLabels) {
      if (this.horizontal)
        titleEdge = edge + transform * Axis._LABEL_LINEHEIGHT;
      else
        titleEdge = edge + transform * this.getDisplayWidth();
    } else {
      titleEdge = edge;
    }
    
    if ((this.horizontal && this.primary) || (!this.horizontal && !this.primary)) {
      titleEdge = Math.max(titleEdge, oAxis.getLength());
    } else {
      titleEdge = Math.min(titleEdge, 0);
    }
    
    return [placement, edge, transform, outsideTickWidth, insideTickWidth, titleEdge];
  };
  
  /**
   * determine the high and low gutter widths, this is the amount of space that the axis occupies outside of the data area
   * @return {Array} :
   *      low {int} the gutter width in the quadrant of the axis
   *      high {int} the gutter width in the quadrant opposite the quadrant of the axis
   * @private
   */
  Axis_prototype._getGutterWidths = function() {
    var low = 0, high = 0;
    var oAxis = this.getOpposingAxis();
    if (oAxis == null) return [0,0];
    var axisAt = this._getAxisCrossPoint(oAxis);
    var metrics = this._getLabelMetrics(axisAt);
    var title = this.getAxisTitle();
    
    var edge = metrics[1];
    var transform = metrics[2];
    var outsideTickWidth = metrics[3];
    var insideTickWidth = metrics[4];
    
    // add the label line height to the label edge
    if (this.showLabels) {
      if (this.horizontal)
        edge += (transform * Axis._LABEL_LINEHEIGHT);
      else
        edge += (transform * this.getDisplayWidth());
    }
    
    // only count the outside edge of the label if it falls outside of the bounds of the data area
    if (edge < 0) {
      low = 0 - edge;
    } else if (edge > oAxis.getLength()) {
      high = edge - oAxis.getLength();
    }

    // determine whether the ticks extrude from the data area
    if (insideTickWidth > this.length - axisAt) 
      high = Math.max(high, insideTickWidth + this.length - axisAt);
    if (outsideTickWidth > 0 - axisAt) 
      low = Math.max(low, outsideTickWidth - axisAt);
    
    // add on the space needed for the title, if any
    if (title != null && title.getDisplay() != jsx3.gui.Block.DISPLAYNONE) {
      if (this.horizontal)
        high += title.getPreferredHeight();
      else
        low += title.getPreferredWidth();
    }

    return [low, high];
  };

  /**
   * paint helper, draws some ticks
   * @param group {jsx3.vector.Group} parent
   * @param ticks {Array} coordinates of the ticks
   * @param start {int} offset of the start of the tick from the axis
   * @param length {int} length of the ticks
   * @private
   * @jsxobf-clobber
   */
  Axis_prototype._attachTicks = function(group, ticks, start, length) {
    if (this.horizontal) {
      for (var i = 0; i < ticks.length; i++)
        group.addRelativeLine(ticks[i], start, 0, length);
    } else {
      for (var i = 0; i < ticks.length; i++)
        group.addRelativeLine(start, ticks[i], length, 0);      
    }
  };
  
  /**
   * Returns coordinates of the midpoints of major tick labels, defaults to exactly where the major tick lines are, but can be overridden in subclasses (CategoryAxis).
   * @return {Array}
   * @private
   */
  Axis_prototype._getLabelTicks = function() {
    return this.getMajorTicks();
  };

  /**
   * Returns the coordinates of minor tick lines for one span between major ticks.
   * @param majorTicks {Array} result of this.getMajorTicks()
   * @param index {int} the index of the major tick that is the end of the segment for which to determine minor ticks, between 0 and majorTicks.length (inclusive!)
   * @return {Array}
   * @private
   */
  Axis_prototype._getMinorTicks = function(majorTicks, index) {
    var ticks = [];
    if (index == 0) {
      // TODO: minor tick lines before the first major tick
      return [];
    } else if (index == majorTicks.length) {
      // TODO: minor tick lines after the last major tick
      return [];
    } else {
      var start = majorTicks[index-1];
      var end = majorTicks[index];
      for (var i = 1; i < this.minorTickDivisions; i++) {
        ticks.push(Math.round(start + (i/this.minorTickDivisions) * (end-start)));
      }
    }
    return ticks;
  };

  /**
   * Returns the optional jsx3.chart.ChartLabel child.
   * @return {jsx3.chart.ChartLabel}
   */
  Axis_prototype.getAxisTitle = function() {
    return chart.ChartLabel ? this.getFirstChildOfType(chart.ChartLabel) : null;
  };

  /**
   * Returns the opposing axis.
   * @return {jsx3.chart.Axis}
   */
  Axis_prototype.getOpposingAxis = function() {
    var myChart = this.getChart();
    if (myChart == null) return null;
    if (this.horizontal) {
      if (this.primary) {
        return myChart.getPrimaryYAxis();
      } else {
        return myChart.getSecondaryYAxis();
      }
    } else {
      if (this.primary) {
        return myChart.getPrimaryXAxis();
      } else {
        return myChart.getSecondaryXAxis();
      }
    }
  };
  
  /**
   * No children allowed except one title.
   * @package
   */
  Axis_prototype.onSetChild = function(child) {
    if ((chart.ChartLabel && child instanceof chart.ChartLabel) && this.getAxisTitle() == null) {
      child.setLabelRotation(this.horizontal ? chart.ChartLabel.ROTATION_NORMAL : chart.ChartLabel.ROTATION_CCW);
      return true;
    }
    return false;
  };

  Axis_prototype.onSetParent = function(objParent) {
    return chart.Chart && objParent instanceof chart.Chart;
  };


  /**
   * Returns the release/build for the class (i.e., "2.2.00").
   * @return {String}
   * @deprecated
   */
  Axis.getVersion = function() {
    return chart.VERSION;
  };


});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

jsx3.require("jsx3.chart.ChartComponent", "jsx3.chart.PointRenderer");

/**
 * Chart component that renders a simple legend. A legend may contain a list of series or a list of
 * categories, depending on the type of chart. 
 */
jsx3.Class.defineClass("jsx3.chart.Legend", jsx3.chart.ChartComponent, null, function(Legend, Legend_prototype) {
  
  var vector = jsx3.vector;
  var chart = jsx3.chart;
  
  /**
   * {int} the default width
   */
  Legend.DEFAULT_WIDTH = 100;

  /**
   * {int} the default height
   */
  Legend.DEFAULT_HEIGHT = 100;

  /** @private @jsxobf-clobber @jsxobf-final */
  Legend._ZINDEX_BG = 1;
  /** @private @jsxobf-clobber @jsxobf-final */
  Legend._ZINDEX_TITLE = 3;
  /** @private @jsxobf-clobber @jsxobf-final */
  Legend._ZINDEX_CONTENT = 2;

  /**
   * Value that jsx3.chart.Chart.getLegendEntryType() may return to indicate that series should be displayed in the legend.
   * @package
   * @final @jsxobf-final
   */
  Legend.SHOW_SERIES = 1;

  /**
   * Value that jsx3.chart.Chart.getLegendEntryType() may return to indicate that categories should be displayed in the legend. Chart must implement these methods if it returns this value: getSeriesStroke(), getFillForIndex(), getCategoryField()
   * @package
   * @final @jsxobf-final
   */
  Legend.SHOW_CATEGORIES = 2;

  /** @private @jsxobf-clobber @jsxobf-final */
  Legend._TITLE_SPACE = 8;
  /** @private @jsxobf-clobber @jsxobf-final */
  Legend._BOX_SPACE = 6;
  
  /**
   * The instance initializer.
   * @param name {String} the GI name of the instance
   */
  Legend_prototype.init = function(name) {
    //call constructor for super class
    this.jsxsuper(name);

    this.boxHeight = 10; // the diameter of a color box
    this.lineHeight = 22; // the line height of each entry
    
    this.labelClass = null;
    this.labelStyle = null;
    this.backgroundFill = null;
    this.backgroundStroke = null;
    this.preferredWidth = null;
    this.preferredHeight = null;
  
    // margin is the space between the container and the border
    this.setMargin("10 10 10 4");
    // padding is the space between the border and the content
    this.setPadding("4 4 0 4");
  };
  
  /**
   * Returns the boxHeight field, the diameter of the box that shows the fill of each series or category.
   * @return {int} boxHeight
   */
  Legend_prototype.getBoxHeight = function() {
    return this.boxHeight;
  };

  /**
   * Sets the boxHeight field.
   * @param boxHeight {int} the new value for boxHeight
   */
  Legend_prototype.setBoxHeight = function( boxHeight ) {
    this.boxHeight = boxHeight;
  };

  /**
   * Returns the lineHeight field, the vertical space taken for each legend entry.
   * @return {int} lineHeight
   */
  Legend_prototype.getLineHeight = function() {
    return this.lineHeight;
  };

  /**
   * Sets the lineHeight field.
   * @param lineHeight {int} the new value for lineHeight
   */
  Legend_prototype.setLineHeight = function( lineHeight ) {
    this.lineHeight = lineHeight;
  };

  /**
   * Returns the labelClass field, the CSS class name applied to the name of each series or category.
   * @return {String} labelClass
   */
  Legend_prototype.getLabelClass = function() {
    return this.labelClass;
  };

  /**
   * Sets the labelClass field.
   * @param labelClass {String} the new value for labelClass
   */
  Legend_prototype.setLabelClass = function( labelClass ) {
    this.labelClass = labelClass;
  };

  /**
   * Returns the labelStyle field, a CSS style attribute applied to the name of each series or category, ie "font-family: Arial; font-size: 10px;".
   * @return {String} labelStyle
   */
  Legend_prototype.getLabelStyle = function() {
    return this.labelStyle;
  };

  /**
   * Sets the labelStyle field.
   * @param labelStyle {String} the new value for labelStyle
   */
  Legend_prototype.setLabelStyle = function( labelStyle ) {
    this.labelStyle = labelStyle;
  };

  /**
   * Returns the backgroundFill field, a string representation of the vector fill used to color in the background of the legend.
   * @return {String} backgroundFill
   */
  Legend_prototype.getBackgroundFill = function() {
    return this.backgroundFill;
  };

  /**
   * Sets the backgroundFill field.
   * @param backgroundFill {String} the new value for backgroundFill
   */
  Legend_prototype.setBackgroundFill = function( backgroundFill ) {
    this.backgroundFill = backgroundFill;
  };

  /**
   * Returns the backgroundStroke field, a string representation of the VectorStroke used to outline the legend.
   * @return {String} backgroundStroke
   */
  Legend_prototype.getBackgroundStroke = function() {
    return this.backgroundStroke;
  };

  /**
   * Sets the backgroundStroke field.
   * @param backgroundStroke {String} the new value for backgroundStroke
   */
  Legend_prototype.setBackgroundStroke = function( backgroundStroke ) {
    this.backgroundStroke = backgroundStroke;
  };

  /**
   * Returns the preferredWidth field, the width that this component would like to have, though its true size is dictated by the container component.
   * @return {int} preferredWidth
   */
  Legend_prototype.getPreferredWidth = function() {
    return this.preferredWidth != null ? this.preferredWidth : Legend.DEFAULT_WIDTH;
  };

  /**
   * Sets the preferredWidth field.
   * @param preferredWidth {int} the new value for preferredWidth
   */
  Legend_prototype.setPreferredWidth = function( preferredWidth ) {
    this.preferredWidth = preferredWidth;
  };

  /**
   * Returns the preferredHeight field, the height that this component would like to have, though its true size is dictated by the container component.
   * @return {int} preferredHeight
   */
  Legend_prototype.getPreferredHeight = function() {
    return this.preferredHeight != null ? this.preferredHeight : Legend.DEFAULT_HEIGHT;
  };

  /**
   * Sets the preferredHeight field.
   * @param preferredHeight {int} the new value for preferredHeight
   */
  Legend_prototype.setPreferredHeight = function( preferredHeight ) {
    this.preferredHeight = preferredHeight;
  };

  /**
   * Renders all vector elements and appends them to the render root.
   * @package
   */
  Legend_prototype.updateView = function() {
    this.jsxsuper();
    var root = this.getCanvas();
    
    // model event hooks:
    this.setEventProperties();
            
    var myChart = this.getChart();
    var entryType = myChart.getLegendEntryType();
    
    // determine the number of entries, either series or categories
    var numEntries = 0;
    if (entryType == Legend.SHOW_SERIES) {
      numEntries = myChart.getDisplayedSeries().length;
    } else if (entryType == Legend.SHOW_CATEGORIES) {
      var dp = myChart.getDataProvider();
      if (dp != null)
        numEntries = dp.length;
    }
    
    var title = this.getLegendTitle();
    var titleHeight = (title != null && title.getDisplay() != jsx3.gui.Block.DISPLAYNONE) ?
        title.getPreferredHeight() + Legend._TITLE_SPACE : 0;
    
    // figure out main padding and margins
    var margins = jsx3.html.BlockTag.getDimensionsFromCss(this.getMargin());
    var padding = jsx3.html.BlockTag.getDimensionsFromCss(this.getPadding());
    var w = this.getWidth() - margins[1] - margins[3];
    var h = Math.min(this.getHeight() - margins[0] - margins[2], 
        titleHeight + this.lineHeight * numEntries + padding[0] + padding[2]);
    var l = margins[3];
    var t = Math.max(margins[0], Math.round((this.getHeight() - h)/2));

    var contentsView = new vector.Group(l, t, w, h);
    root.appendChild(contentsView);
    contentsView.setZIndex(Legend._ZINDEX_CONTENT);
    
    // paint the background
    if (this.backgroundFill || this.backgroundStroke) {
      // only if entries or title to display
      if (numEntries > 0 || (title != null && title.getDisplay() != jsx3.gui.Block.DISPLAYNONE)) {
        var bgRect = new vector.Rectangle(l, t, w, h);
        bgRect.setZIndex(Legend._ZINDEX_BG);
        root.appendChild(bgRect);
  
        var fill = vector.Fill.valueOf(this.backgroundFill);
        var stroke = vector.Stroke.valueOf(this.backgroundStroke);
        bgRect.setFill(fill);
        bgRect.setStroke(stroke);
      }
    }
    
    var top = t + padding[0];
    var insideW = w - padding[1] - padding[3];
    
    // paint the title
    if (title != null && title.getDisplay() != jsx3.gui.Block.DISPLAYNONE) {
      title.setDimensions(l + padding[3], top, insideW, title.getPreferredHeight());
      title.setZIndex(Legend._ZINDEX_TITLE);
      
      title.updateView();
      root.appendChild(title.getCanvas());
      
      top += titleHeight;
    }
    
    top -= t;
    
    var labelL = l + padding[3] + this.boxHeight + Legend._BOX_SPACE;
    var labelW = insideW - this.boxHeight - Legend._BOX_SPACE;
    
    // paint the entries
    if (entryType == Legend.SHOW_SERIES && numEntries > 0) {
      // the entries are series
      var series = myChart.getDisplayedSeries();
      
      for (var i = 0; i < series.length; i++) {
        series[i].applyDynamicProperties();
        var renderer = series[i].getLegendRenderer();
            
        var x1 = l + padding[3];
        var fill = series[i].getDisplayedFill();
        var stroke = series[i].getDisplayedStroke(fill);
        var shape = renderer.render(x1, top, x1 + this.boxHeight, top + this.boxHeight, 
            fill, stroke);
        shape.setId(this.getId() + "_b" + i);
        contentsView.appendChild(shape);
        
        var box = this._attachTextBox(contentsView, series[i].getSeriesName(), this.labelClass, this.labelStyle,
            labelL, Math.round(top + this.boxHeight/2), labelW);
        top += this.lineHeight;
        
        this.setEventProperties(shape, series[i], null);
        this.setEventProperties(box, series[i], null);
      }
    } else if (entryType == Legend.SHOW_CATEGORIES && numEntries > 0) {
      // the entries are categories
      var dp = myChart.getDataProvider();
      var renderer = chart.PointRenderer.BOX;
      var stroke = vector.Stroke.valueOf(myChart.getSeriesStroke());
      
      for (var i = 0; i < dp.length; i++) {
        var x1 = l + padding[3];
        var fill = myChart.getFillForIndex(dp[i], i);
        var thisStroke = (stroke == null && fill.canInline()) ?
            new vector.Stroke(fill.getColor()) : stroke;
        var shape = renderer.render(x1, top, x1 + this.boxHeight, top + this.boxHeight, 
            fill, thisStroke);
        shape.setId(this.getId() + "_b" + i);
        contentsView.appendChild(shape);
        
        var nameField = myChart.getCategoryField();
        var name = nameField ? dp[i].getAttribute(nameField) : "";
        
        var box = this._attachTextBox(contentsView, name, this.labelClass, this.labelStyle,
            labelL, Math.round(top + this.boxHeight/2), labelW);
        top += this.lineHeight;

        this.setEventProperties(shape, null, i);
        this.setEventProperties(box, null, i);
      }      
    }
  };
  
  /**
   * updateView helper, renders a text box
   * @param group {jsx3.vector.Group} 
   * @param text {String} 
   * @param cssClass {String} 
   * @param cssStyle {String} 
   * @param left {int} 
   * @param top {int} 
   * @param width {int} 
   * @private
   * @jsxobf-clobber
   */
  Legend_prototype._attachTextBox = function( group, text, cssClass, cssStyle, left, top, width) {
    var textBox = new vector.TextLine(left, top, width, top, text);
    
    textBox.setClassName(cssClass);
    textBox.setExtraStyles(cssStyle);
    if (!textBox.getTextAlign())
      textBox.setTextAlign("left");
    
    group.appendChild(textBox);
    return textBox;
  };

  /**
   * Find the first jsx3.chart.ChartLabel child
   * @return {jsx3.chart.ChartLabel}
   */
  Legend_prototype.getLegendTitle = function() {
    return chart.ChartLabel ? this.getFirstChildOfType(chart.ChartLabel) : null;
  };

  /**
   * Allow one jsx3.chart.ChartLabel child.
   * @package
   */
  Legend_prototype.onSetChild = function(child) {
    return (chart.ChartLabel && child instanceof chart.ChartLabel) && this.getLegendTitle() == null;
  };

  Legend_prototype.onSetParent = function(objParent) {
    return chart.Chart && objParent instanceof chart.Chart;
  };


  /**
   * Returns the release/build for the class (i.e., "2.2.00").
   * @return {String}
   * @deprecated
   */
  Legend.getVersion = function() {
    return chart.VERSION;
  };


  Legend_prototype.setEventProperties = function(objTag, objSeries, intIndex) {
    if (objTag == null) 
      objTag = this.getCanvas();
    
    if (objSeries != null)
      objTag.setProperty("seriesId", objSeries.getId());
    if (intIndex != null)
      objTag.setProperty("recordIndex", intIndex);
    
    this.jsxsuper(objTag);
  };

  Legend_prototype._ebClick = function(objEvent, objGUI) {
    var strSeriesId = objGUI.getAttribute("seriesId");
    var intRecordIndex = objGUI.getAttribute("recordIndex");    
    this.doEvent(jsx3.gui.Interactive.SELECT, this._getEventContext(objEvent, strSeriesId, intRecordIndex));
  };
    
  Legend_prototype._ebDoubleClick = function(objEvent, objGUI) {
    var strSeriesId = objGUI.getAttribute("seriesId");
    var intRecordIndex = objGUI.getAttribute("recordIndex");    
    this.doEvent(jsx3.gui.Interactive.EXECUTE, this._getEventContext(objEvent, strSeriesId, intRecordIndex));
  };

  Legend_prototype.doSpyOver = function(objEvent, objGUI) {
    var strSeriesId = objGUI.getAttribute("seriesId");
    var intRecordIndex = objGUI.getAttribute("recordIndex");    
    // this calls doSpyOver in Event
    this.jsxsupermix(objEvent, objGUI, this._getEventContext(objEvent, strSeriesId, intRecordIndex));
  };

  Legend_prototype._ebMouseUp = function(objEvent, objGUI) {
    var strSeriesId = objGUI.getAttribute("seriesId");
    var intRecordIndex = objGUI.getAttribute("recordIndex");
    var strMenu;
    if (objEvent.rightButton() && (strMenu = this.getMenu()) != null) {
      var objMenu = this.getServer().getJSXByName(strMenu);
      if (objMenu != null) {
        var objContext = this._getEventContext(objEvent, strSeriesId, intRecordIndex);
        objContext.objMENU = objMenu;
        var vntResult = this.doEvent(jsx3.gui.Interactive.MENU, objContext);
        if (vntResult !== false) {
          if (vntResult instanceof Object && vntResult.objMENU instanceof jsx3.gui.Menu)
            objMenu = vntResult.objMENU;
          objMenu.showContextMenu(objEvent, this);
        }
      }
    }
  };

  /** @private @jsxobf-clobber */
  Legend_prototype._getEventContext = function(objEvent, strSeriesId, intRecordIndex) {
    var context = {objEVENT:objEvent};
    context.objSERIES = strSeriesId != null ? 
        this.getServer().getJSXById(strSeriesId) : null;
        
    if (intRecordIndex != null) {
      context.intINDEX = intRecordIndex;
      var node = this.getChart().getDataProvider()[intRecordIndex];
      context.strRECORDID = node ? node.getAttribute('jsxid') : null;
    } else {
      context.intINDEX = context.strRECORDID = null;
    }
    
    return context;
  };
  
});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

jsx3.require("jsx3.chart.ChartComponent");

/**
 * The base class for all data series classes. In general, a chart is made up of a fixed number of 
 * configured series and a variable number of categories. A series is essentially an addressing scheme
 * that defines how to get information out of each category. 
 */
jsx3.Class.defineClass("jsx3.chart.Series", jsx3.chart.ChartComponent, null, function(Series, Series_prototype) {

  var Interactive = jsx3.gui.Interactive;
  var vector = jsx3.vector;
  var chart = jsx3.chart;
  
  /**
   * The instance initializer.
   * @param name {String} the GI name of the instance
   * @param seriesName {String} the name of the Series, will be displayed in the Legend for most chart types
   */
  Series_prototype.init = function(name,seriesName) {
    //call constructor for super class
    this.jsxsuper(name);

    this.seriesName = seriesName;
    this.usePrimaryX = jsx3.Boolean.TRUE;
    this.usePrimaryY = jsx3.Boolean.TRUE;
  
    this.stroke = null;
    this.fill = null;
    this.fillGradient = null;  
    this.tooltipFunction = null;
  };

  /**
   * Returns the seriesName field.
   * @return {String} seriesName
   */
  Series_prototype.getSeriesName = function() {
    return this.seriesName;
  };

  /**
   * Sets the seriesName field, this name is usually displayed in a legend or as a label.
   * @param seriesName {String} the new value for seriesName
   */
  Series_prototype.setSeriesName = function( seriesName ) {
    this.seriesName = seriesName;
  };

  /**
   * Returns the usePrimaryX field.
   * @return {boolean} usePrimaryX
   * @package
   */
  Series_prototype.getUsePrimaryX = function() {
    return this.usePrimaryX;
  };

  /**
   * Sets the usePrimaryX field, whether this series uses the primary x axis or the secondary one (not yet supported).
   * @param usePrimaryX {boolean} the new value for usePrimaryX
   * @package
   */
  Series_prototype.setUsePrimaryX = function( usePrimaryX ) {
    this.usePrimaryX = usePrimaryX;
  };

  /**
   * Returns the usePrimaryY field.
   * @return {boolean} usePrimaryY
   * @package
   */
  Series_prototype.getUsePrimaryY = function() {
    return this.usePrimaryY;
  };

  /**
   * Sets the usePrimaryY field, whether this series uses the primary y axis or the secondary one (not yet supported).
   * @param usePrimaryY {boolean} the new value for usePrimaryY
   * @package
   */
  Series_prototype.setUsePrimaryY = function( usePrimaryY ) {
    this.usePrimaryY = usePrimaryY;
  };
  
  /**
   * Sets the function used to render tooltips for each area drawn by this series.
   * The function will be applied to this object when called.
   * Note that passing a function reference to this method will prevent the color
   * function from persisting if this object is serialized.
   * @param tooltipFunction {String | Function} a function with the signature
   *    <code>function(s : jsx3.chart.Series, record : jsx3.xml.Entity) : String</code>
   */
  Series_prototype.setTooltipFunction = function( tooltipFunction ) {
    chart.setReferenceField(this, "tooltipFunction", tooltipFunction);
  };
  
  /**
   * Returns the function used to render tooltips for each area drawn by this series.
   * @return {Function} function(series,record) : string
   */
  Series_prototype.getTooltipFunction = function() {
    return chart.getFunctionField(this, "tooltipFunction");
  };

  /**
   * Returns the index of this series in the list of chart's series.
   * @return {int} index, -1 if not found
   */
  Series_prototype.getIndex = function() {
    var myChart = this.getChart();
    return myChart != null ? myChart.getSeriesIndex(this) : -1;
  };

  /**
   * Returns the stroke field.
   * @return {String} stroke
   */
  Series_prototype.getStroke = function() {
    return this.stroke;
  };

  /**
   * Sets the stroke field, string representation of a VectorStroke.
   * @param stroke {String} the new value for stroke
   */
  Series_prototype.setStroke = function( stroke ) {
    this.stroke = stroke;
  };

  /**
   * Returns the fill field.
   * @return {String} fill
   */
  Series_prototype.getFill = function() {
    return this.fill;
  };

  /**
   * Sets the fill field, string representation of a vector fill.
   * @param fill {String} the new value for fill
   */
  Series_prototype.setFill = function( fill ) {
    this.fill = fill;
  };

  /**
   * Returns the fillGradient field.
   * @return {String} fillGradient
   */
  Series_prototype.getFillGradient = function() {
    return this.fillGradient;
  };

  /**
   * Sets the fillGradient field, string representation of a vector fill gradient.
   * @param fillGradient {String} the new value for fillGradient
   */
  Series_prototype.setFillGradient = function( fillGradient ) {
    this.fillGradient = fillGradient;
  };

  /**
   * Returns the x axis that this series is plotted against.
   * @return {jsx3.chart.Axis} the x axis
   */
  Series_prototype.getXAxis = function() {
    var myChart = this.getChart();
    if (myChart != null) {
      return this.usePrimaryX ? myChart.getPrimaryXAxis() : myChart.getSecondaryXAxis();
    }
    return null;
  };

  /**
   * Returns the y axis that this series is plotted against.
   * @return {jsx3.chart.Axis} the y axis
   */
  Series_prototype.getYAxis = function() {
    var myChart = this.getChart();
    if (myChart != null) {
      return this.usePrimaryY ? myChart.getPrimaryYAxis() : myChart.getSecondaryYAxis();
    }
    return null;
  };
  
  /**
   * Returns the fill for this series when no fill is explicitly set; looks in the global list of default fills, jsx3.chart.Chart.DEFAULT_FILLS.
   * @return {jsx3.vector.Fill}
   * @package
   */
  Series_prototype.getDefaultFill = function() {
    var index = Math.max(this.getIndex(), 0) % chart.Chart.DEFAULT_FILLS.length;
    return chart.Chart.DEFAULT_FILLS[index];
  };

  /**
   * Returns the stroke for this series when no fill or stroke is explicitly set; looks in the global list of default strokes, jsx3.chart.Chart.DEFAULT_STROKES, or creates a stroke with the same color as the default fill for this series.
   * @return {jsx3.vector.Stroke}
   * @package
   */
  Series_prototype.getDefaultStroke = function() {
    var index = Math.max(this.getIndex(), 0) % chart.Chart.DEFAULT_FILLS.length;
    // cache default strokes here
    if (chart.Chart.DEFAULT_STROKES[index] == null) {
      var fill = this.getDefaultFill();
      // create a stroke with the same hue as the default fill
      chart.Chart.DEFAULT_STROKES[index] = new vector.Stroke(fill.getColor(), 1, fill.getAlpha());
    }
    return chart.Chart.DEFAULT_STROKES[index];
  };
  
  /**
   * Returns the fill that this series should be painted with, using the values of the 'fill' and 'fillGradient' fields or the default fill if those are empty.
   * @return {jsx3.vector.Fill}
   * @package
   */
  Series_prototype.getDisplayedFill = function() {
    var fill = this.fill ? vector.Fill.valueOf(this.fill) : this.getDefaultFill();
    if (fill != null) {
      fill = chart.addGradient(fill, this.fillGradient);
    }
    return fill;
  };

  /**
   * Returns the stroke that this series should be painted with, using the value of the 'stroke' field, the fill parameter, or the default stroke if those are empty.
   * @param fill {jsx3.vector.Fill} the fill that this series will be painted with, if this.stroke is empty and fill is a solid hue, this method will return a new vector stroke with the same hue as fill (in order to avoid annoying anti-aliasing fuzziness
   * @return {jsx3.vector.Stroke}
   * @package
   */
  Series_prototype.getDisplayedStroke = function(fill) {
    if (this.stroke) {
      return vector.Stroke.valueOf(this.stroke);
    } else if (this.getColorFunction() != null) {
      return null;
    } else if (fill != null && fill.canInline()) {
      return new vector.Stroke(fill.getColor());
    } else {
      if (! this.fill)
        return this.getDefaultStroke(fill);
      else 
        return null;
    }
  };
  
  /**
   * Returns the colorFunction field.
   * @return {Function} colorFunction
   * @since 3.1
   */
  Series_prototype.getColorFunction = function() {
    return chart.getFunctionField(this, "colorFunction");
  };

  /**
   * Sets the colorFunction field. The function will be applied to this object when called.
   * Note that passing a function reference to this method will prevent the color
   * function from persisting if this object is serialized.
   * @param colorFunction {String | Function} the new value for colorFunction, a function with the signature
   *     <code>function(record : jsx3.xml.Entity, index : Number) : jsx3.vector.Fill</code>.
   * @since 3.1
   */
  Series_prototype.setColorFunction = function( colorFunction ) {
    chart.setReferenceField(this, "colorFunction", colorFunction);
  };

  /**
   * the renderer that will control how the legend will render the colored point next to the the series name
   * @return {jsx3.chart.PointRenderer} jsx3.chart.PointRenderer.BOX, can be overridden
   * @package
   */
  Series_prototype.getLegendRenderer = function() {
    return chart.PointRenderer.BOX;
  };

  /**
   * Returns the optional jsx3.chart.ChartLabel child of this series.
   * @return {jsx3.chart.ChartLabel}
   */
  Series_prototype.getLabel = function() {
    return chart.ChartLabel ? this.getFirstChildOfType(chart.ChartLabel) : null;
  };
  
  /**
   * Allows one jsx3.chart.ChartLabel child, which may or may not be rendered.
   * @package
   */
  Series_prototype.onSetChild = function(child) {
    return (chart.ChartLabel && child instanceof chart.ChartLabel) && this.getLabel() == null;
  };
  
  Series_prototype.onSetParent = function(objParent) {
    return chart.Chart && objParent instanceof chart.Chart;
  };

  Series_prototype.setEventProperties = function(objTag, intIndex, strRecordId) {
    if (objTag == null) 
      objTag = this.getCanvas();
    
    if (strRecordId != null)
      objTag.setProperty("strRecordId", strRecordId);
    if (intIndex != null)
      objTag.setProperty("recordIndex", intIndex);
    
    this.jsxsuper(objTag);
  };

  Series_prototype._ebClick = function(objEvent, objGUI) {
    var intIndex = objGUI.getAttribute("recordIndex");
    var strRecordId = objGUI.getAttribute("strRecordId");    
    this.doEvent(jsx3.gui.Interactive.SELECT, {objEVENT:objEvent, intINDEX:intIndex, strRECORDID:strRecordId});
  };
    
  Series_prototype._ebDoubleClick = function(objEvent, objGUI) {
    var intIndex = objGUI.getAttribute("recordIndex");
    var strRecordId = objGUI.getAttribute("strRecordId");    
    this.doEvent(jsx3.gui.Interactive.EXECUTE, {objEVENT:objEvent, intINDEX:intIndex, strRECORDID:strRecordId});
  };

  Series_prototype.doSpyOver = function(objEvent, objGUI) {
    var intIndex = objGUI.getAttribute("recordIndex");
    var strRecordId = objGUI.getAttribute("strRecordId");    
    // this calls doSpyOver in Event
    this.jsxsupermix(objEvent, objGUI, {objEVENT:objEvent, intINDEX:intIndex, strRECORDID:strRecordId});
  };

  Series_prototype._ebMouseUp = function(objEvent, objGUI) {
    var intIndex = objGUI.getAttribute("recordIndex");
    var strRecordId = objGUI.getAttribute("strRecordId");
    var strMenu;
    if (objEvent.rightButton() && (strMenu = this.getMenu()) != null) {
      var objMenu = this.getServer().getJSXByName(strMenu);
      if (objMenu != null) {
        var objContext = {objEVENT:objEvent, objMENU:objMenu, intINDEX:intIndex, strRECORDID:strRecordId};
        var vntResult = this.doEvent(Interactive.MENU, objContext);
        if (vntResult !== false) {
          if (vntResult instanceof Object && vntResult.objMENU instanceof jsx3.gui.Menu)
            objMenu = vntResult.objMENU;
          objMenu.showContextMenu(objEvent, this, intIndex);
        }
      }
    }
  };


  /**
   * Returns the release/build for the class (i.e., "2.2.00").
   * @return {String}
   * @deprecated
   */
  Series.getVersion = function() {
    return chart.VERSION;
  };


});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

jsx3.require("jsx3.vector.Block", "jsx3.xml.Cacheable", "jsx3.chart.Series");

/**
 * The base class for all charts in this package. Encapsulates common functionality shared by all charts.
 * <p/>
 * In general, a chart is responsible for managing its children components and handling any coordination
 * between them. A chart always manages the layout of its children.
 * <p/>
 * All charts can have the following children:
 * <ul>
 *   <li>{0,1} jsx3.chart.ChartLabel, will render as the chart's title</li>
 *   <li>{0,1} Legend, will render as the chart's legend</li>
 *   <li>{0,n} Series, will render the chart's data series; in general a subclass of Chart will only allow a certain subclass of Series</li>
 * </ul>
 */
jsx3.Class.defineClass("jsx3.chart.Chart", jsx3.vector.Block, [jsx3.xml.Cacheable, jsx3.xml.CDF], function(Chart, Chart_prototype) {

  var vector = jsx3.vector;
  var Fill = vector.Fill;
  var chart = jsx3.chart;
  
  /** @private @jsxobf-clobber @jsxobf-final */
  Chart.ZINDEX_BACKGROUND = 1;
  /** @private @jsxobf-clobber @jsxobf-final */
  Chart.ZINDEX_CONTENT = 2;
  /** @private */
  Chart.ZINDEX_DATA = 10;
  /** @private @jsxobf-clobber @jsxobf-final */
  Chart.ZINDEX_LEGEND = 990;
  /** @private @jsxobf-clobber @jsxobf-final */
  Chart.ZINDEX_TITLE = 1000;
  /** @private @jsxobf-clobber @jsxobf-final */
  Chart.ZINDEX_SERIES = 20;

  /**
   * {Array<jsx3.vector.Fill>} The default fill colors for series and categories whose fills are not specified.
   */
  Chart.DEFAULT_FILLS = [
    new Fill(0x3399CC, 1),
    new Fill(0xFFCC00, 1),
    new Fill(0x99CC66, 1),
    new Fill(0xCC9933, 1),
    new Fill(0xCCCCCC, 1),
    new Fill(0xCC3366, 1),
    new Fill(0xFF99FF, 1),
    new Fill(0x666666, 1)
  ];

  /**
   * Default stroke cache.
   * @package
   */
  Chart.DEFAULT_STROKES = [];

  Chart.PART_LEGEND = 1 << 0;

  /** @private @jsxobf-clobber */
  Chart._QUADRANTS = {top: 1, right: 1, bottom: 1, left: 1};
  
  /**
   * The instance initializer.
   * @param name {String} the GI name of the instance
   * @param left {int} left position (in pixels) of the chart relative to its parent container
   * @param top {int} top position (in pixels) of the chart relative to its parent container
   * @param width {int} width (in pixels) of the chart
   * @param height {int} height (in pixels) of the chart
   */
  Chart_prototype.init = function(name, left, top, width, height) {
    //call constructor for super class
    this.jsxsuper(name);
    this.setDimensions(left, top, width, height);

    this.titlePlacement = chart.QTOP;
    this.legendPlacement = chart.QRIGHT;
  
    // style properties
    this.dataPadding = 10;
    this.borderColor = "#999999";
    this.borderWidth = 1;
    this.borderAlpha = 1;
    this.alpha = 1;
    this.setRelativePosition(jsx3.gui.Block.RELATIVE);
  };
  
  /**
   * Returns the titlePlacement field, the quadrant in which to place the title.
   * @return {String} titlePlacement, one of {'top','right','bottom','left'}
   */
  Chart_prototype.getTitlePlacement = function() {
    return this.titlePlacement;
  };

  /**
   * Sets the titlePlacement field.
   * @param titlePlacement {String} the new value for titlePlacement, one of {'top','right','bottom','left'}
   */
  Chart_prototype.setTitlePlacement = function( titlePlacement ) {
    if (Chart._QUADRANTS[titlePlacement]) {
      this.titlePlacement = titlePlacement;
    } else {
      throw new jsx3.IllegalArgumentException("titlePlacement", titlePlacement);
    }
  };

  /**
   * Returns the legendPlacement field, the quadrant in which to place the legend.
   * @return {String} legendPlacement, one of {'top','right','bottom','left'}
   */
  Chart_prototype.getLegendPlacement = function() {
    return this.legendPlacement;
  };

  /**
   * Sets the legendPlacement field.
   * @param legendPlacement {String} the new value for legendPlacement, one of {'top','right','bottom','left'}
   */
  Chart_prototype.setLegendPlacement = function( legendPlacement ) {
    if (Chart._QUADRANTS[legendPlacement]) {
      this.legendPlacement = legendPlacement;
    } else {
      throw new jsx3.IllegalArgumentException("legendPlacement", legendPlacement);
    }
  };

  /**
   * Returns the dataPadding field, the CSS padding value that determines the padding around the data area, ie "10" or "5 0 5 0".
   * @return {String} dataPadding
   */
  Chart_prototype.getDataPadding = function() {
    return this.dataPadding;
  };

  /**
   * Sets the dataPadding field.
   * @param dataPadding {String} the new value for dataPadding
   */
  Chart_prototype.setDataPadding = function( dataPadding ) {
    this.dataPadding = dataPadding;
  };

  /**
   * Returns the borderColor field, the RGB color to render the chart's border.
   * @return {string/number} borderColor
   */
  Chart_prototype.getBorderColor = function() {
    return this.borderColor;
  };

  /**
   * Sets the borderColor field.
   * @param borderColor {string/number} the new value for borderColor
   */
  Chart_prototype.setBorderColor = function( borderColor ) {
    this.borderColor = borderColor;
  };

  /**
   * Returns the borderWidth field, the pixel width of the chart's border.
   * @return {int} borderWidth
   */
  Chart_prototype.getBorderWidth = function() {
    return this.borderWidth;
  };

  /**
   * Sets the borderWidth field.
   * @param borderWidth {int} the new value for borderWidth
   */
  Chart_prototype.setBorderWidth = function( borderWidth ) {
    this.borderWidth = borderWidth;
  };

  /**
   * Returns the borderAlpha field, the opacity to render the chart's border.
   * @return {float} borderAlpha
   */
  Chart_prototype.getBorderAlpha = function() {
    return this.borderAlpha;
  };

  /**
   * Sets the borderAlpha field.
   * @param borderAlpha {float} the new value for borderAlpha
   */
  Chart_prototype.setBorderAlpha = function( borderAlpha ) {
    this.borderAlpha = borderAlpha;
  };

  /**
   * Returns the alpha field, the opacity to render the chart's background.
   * @return {float} alpha
   */
  Chart_prototype.getAlpha = function() {
    return this.alpha;
  };

  /**
   * Sets the alpha field.
   * @param alpha {float} the new value for alpha
   */
  Chart_prototype.setAlpha = function( alpha ) {
    this.alpha = alpha != null ? vector.constrainAlpha(alpha) : null;
  };

  /**
   * This class determines the layout of title, legend, and data area of the chart during updateView(). At the end it creates a VectorGroup that should form the render root for subclass of Chart since they are only charged with rendering the data area of the chart. 
   * @return {jsx3.vector.Group}
   * @package
   */
  Chart_prototype.getDataCanvas = function() {
    return this._jsxdc;
  };
  
  /**
   * Returns the dataProvider field, an array of <record> XML nodes.
   * @return {Array<jsx3.xml.Entity>} dataProvider
   * @package
   */
  Chart_prototype.getDataProvider = function() {
    return this._jsxdp;
  };
  
  /**
   * update the cached data provider from an XML document
   * @param xml {jsx3.xml.Entity} the <records> document
   * @private
   * @jsxobf-clobber
   */
  Chart_prototype._updateDataProvider = function(xml) {
    if (xml != null) {
      this._jsxdp = xml.selectNodes("/data/record").toArray();
    } else {
      delete this._jsxdp;
    }
  };

  /**
   * Returns the list of Series children.
   * @return {Array<jsx3.chart.Series>}
   */
  Chart_prototype.getSeries = function() {
    return this.getDescendantsOfType(chart.Series);
  };

  /**
   * Returns the list of Series children whose display is not 'none'.
   * @return {Array<jsx3.chart.Series>}
   * @package
   */
  Chart_prototype.getDisplayedSeries = function() {
    return this.findDescendants(function(x){ 
        return (x instanceof chart.Series) && x.getDisplay() != jsx3.gui.Block.DISPLAYNONE; }, 
        false, true, false, false);
  };
  
  /**
   * Returns the index of a series in the list of series children.
   * @param s {jsx3.chart.Series} 
   * @return {int} the index or -1 if not found
   */
  Chart_prototype.getSeriesIndex = function( s ) {
    var series = this.getSeries();
    for (var i = 0; i < series.length; i++) {
      if (s == series[i]) 
        return i;
    }
    return -1;
  };

  /**
   * Find the first jsx3.chart.ChartLabel child
   * @return {jsx3.chart.ChartLabel}
   */
  Chart_prototype.getChartTitle = function() {
    return chart.ChartLabel ? this.getFirstChildOfType(chart.ChartLabel) : null;
  };

  /**
   * Find the first Legend child
   * @return {jsx3.chart.Legend}
   */
  Chart_prototype.getLegend = function() {
    return chart.Legend ? this.getFirstChildOfType(chart.Legend) : null;
  };

  /**
   * in general series are rendered in order and have increasing z-index values; this method may be overridden to render series in reverse order to have decreasing z-index values
   * @return {boolean} false
   * @package
   */
  Chart_prototype.seriesZOrderReversed = function() {
    return false;
  };

  /**
   * whether series is allowed to be a series in this type of chart
   * @param series {jsx3.chart.Series} candidate series
   * @return {boolean}
   * @package
   */
  Chart_prototype.isValidSeries = jsx3.Method.newAbstract('series');
  
  /**
   * in general the chart legend renders one entry for every series in the chart, override this method to show categories in the legend
   * @return {int} <code>jsx3.chart.Legend.SHOW_SERIES</code>
   */
  Chart_prototype.getLegendEntryType = function() {
    jsx3.require("jsx3.chart.Legend");
    return chart.Legend.SHOW_SERIES;
  };
  
  /**
   * calculates the sum of values for each category over all series; sum is actually the sum of the absolute value of each value since that is what is useful to stacked100 charts
   * @param series {Array<jsx3.chart.Series>} all series
   * @param functName {String} the function on each series that returns the value to sum
   * @return {Array} an array with length equal to the length of the data provider
   * @package
   */
  Chart_prototype.getCategoryTotals = function(series, functName) {
    var dp = this.getDataProvider();
    if (dp == null) return null;
    
    var totals = new Array(dp.length);
    
    for (var i = 0; i < dp.length; i++) {
      totals[i] = 0;
      for (var j = 0; j < series.length; j++) {
        var value = series[j][functName](dp[i]);
        if (value != null)
          totals[i] += Math.abs(value);
      }
    }
    
    return totals;
  };
  
  /**
   * calculates the sum of values for each series over all categories; sum is actually the sum of the absolute value of each value since that is what is useful to stacked100 charts
   * @param series {Array<jsx3.chart.Series>} all series
   * @param functName {String} the function on each series that returns the value to sum
   * @param positiveOnly {boolean} if true then ignore any values less that 0; useful for pie charts
   * @return {Array} an array with length equal to the number of series
   * @package
   */
  Chart_prototype.getSeriesTotals = function(series, functName, positiveOnly) {
    var dp = this.getDataProvider();
    if (dp == null) return null;
    
    var totals = new Array(series.length);
    
    for (var i = 0; i < series.length; i++) {
      totals[i] = 0;
      for (var j = 0; j < dp.length; j++) {
        var value = series[i][functName](dp[j]);
        if (value != null && (value >= 0 || !positiveOnly))
          totals[i] += Math.abs(value);
      }
    }
    
    return totals;
  };
  
  Chart_prototype.createCanvas = function() {
    return new jsx3.vector.Canvas();
  };
    
  /**
   * Renders all vector elements and appends them to the render root, prepares the dataCanvas for subclasses of Chart.
   * @package
   */
  Chart_prototype.createVector = function() {
    var root = this.jsxsuper();

    var left = root.getLeft();
    var top = root.getTop();
    var width = root.getWidth();
    var height = root.getHeight();
    
    // update the data provider from the xml
    var xml = this.getXML();
    this._updateDataProvider(xml);
    
    // update background size and stroke/fill
    var bg = new vector.Rectangle(0, 0, width, height);
    root.appendChild(bg);
    bg.setZIndex(Chart.ZINDEX_BACKGROUND);
    chart.copyBackgroundToFill(this, bg);
    chart.copyBorderToStroke(this, bg);
    
    // update content size (the total size minus the border and padding size)
    var padding = jsx3.html.BlockTag.getDimensionsFromCss(this.getPadding());
    var borderWidth = this.borderWidth != null ? this.borderWidth : 1;
    width = width - padding[1] - padding[3] - 2 * borderWidth;
    height = height - padding[0] - padding[2] - 2 * borderWidth;
    
    // create root for legend, title, and dataCanvas
    var contentCanvas = new vector.Group(padding[3]+borderWidth, padding[0]+borderWidth, width, height);
    root.appendChild(contentCanvas);
    contentCanvas.setZIndex(Chart.ZINDEX_CONTENT);

    // render title
    var chartTitle = this.getChartTitle();
    if (chartTitle != null && chartTitle.getDisplay() != jsx3.gui.Block.DISPLAYNONE) {
      var boxes = chart.splitBox(0, 0, width, height, this.titlePlacement,
        chartTitle.getPreferredWidth(), chartTitle.getPreferredHeight());
      chartTitle.setDimensions(boxes[0][0], boxes[0][1], boxes[0][2], boxes[0][3]);
      chartTitle.setZIndex(Chart.ZINDEX_TITLE);

      chartTitle.updateView();
      contentCanvas.appendChild(chartTitle.getCanvas());
      
      top = boxes[1][0];
      left = boxes[1][1];
      width = boxes[1][2];
      height = boxes[1][3];
    } else {
      top = 0;
      left = 0;
    }
    
    // create the data canvas for subclasses of Chart to use as their root
    var dataCanvas = new vector.Group();
    this._jsxdc = dataCanvas;
    contentCanvas.appendChild(dataCanvas);
    
    // render legend
    var legend = this.getLegend();
    if (legend != null && legend.getDisplay() != jsx3.gui.Block.DISPLAYNONE) {
      var boxes = chart.splitBox(top, left, width, height, this.legendPlacement,
        legend.getPreferredWidth(), legend.getPreferredHeight());
      legend.setDimensions(boxes[0][0], boxes[0][1], boxes[0][2], boxes[0][3]);
      legend.setZIndex(Chart.ZINDEX_LEGEND);
      
      legend.updateView();
      contentCanvas.appendChild(legend.getCanvas());
    
      dataCanvas.setDimensions(boxes[1][0], boxes[1][1], boxes[1][2], boxes[1][3]);
    } else {
      dataCanvas.setDimensions(top, left, width, height);
    }
    
    var canPad = jsx3.html.BlockTag.getDimensionsFromCss(this.dataPadding);
    var dim = dataCanvas.getDimensions();
    dataCanvas.setDimensions(dim[0] + canPad[3], dim[1] + canPad[0], 
        dim[2] - canPad[1] - canPad[3], dim[3] - canPad[0] - canPad[2]);

    // model event hooks:
    chart.setEventProperties(this);
        
    // set z-index of each series
    var series = this.getDisplayedSeries();
    for (var i = 0; i < series.length; i++) {
      var offset = this.seriesZOrderReversed() ? series.length - i : i;
      series[i].setZIndex(Chart.ZINDEX_SERIES + offset);
    }

    return root;
  };

  Chart_prototype.updateVector = function(objVector) {
    return false;
  };

  /**
   * the beginning of a more efficient repaint method
   * @param mask {int} a bit mask that determines which sub parts of the chart are repainted
   * @package
   */
  Chart_prototype.repaintParts = function( mask ) {
    if (mask & Chart.PART_LEGEND) {
      var legend = this.getLegend();
      if (legend != null) legend.repaint();
    }
  };
  
  /**
   * enforce only one Legend, only one jsx3.chart.ChartLabel, and only allowed Series
   * @package
   */
  Chart_prototype.onSetChild = function( child ) {
    if (chart.Legend && child instanceof chart.Legend) {
      if (this.getLegend() != null) {
        chart.LOG.info("can't add legend " + child + " because chart already has a legend");
        return false;
      }
    } else if (chart.ChartLabel && child instanceof chart.ChartLabel) {
      if (this.getChartTitle() != null) {
        chart.LOG.info("can't add title " + child + " because chart already has a title");
        return false;
      }
    } else if (chart.Series && child instanceof chart.Series) {
      if (! this.isValidSeries(child)) {
        chart.LOG.info("can't add series " + child + " because it isn't of valid type for " + this);
        return false;
      }
    } else {
      return false;
    }
    
    return true;
  };
  
  /**
   * Note that this method is very expensive because it causes the entire chart to be redrawn. It is recommended that
   * the methods in the CDF interface which cause this method to be called, be passed bRedraw=false to prevent this
   * method from being called.
   */
  Chart_prototype.redrawRecord = function() {
    this.repaint();
  };

  Chart_prototype.onXmlBinding = function(objEvent) {
    this.jsxsupermix(objEvent);
    this.repaint();
  };


  /**
   * Returns the release/build for the class (i.e., "2.2.00").
   * @return {String}
   * @deprecated
   */
  Chart.getVersion = function() {
    return chart.VERSION;
  };


});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

jsx3.require("jsx3.chart.Chart", "jsx3.chart.Axis", "jsx3.chart.GridLines");

/**
 * Base chart class for charts that render on a cartesian plane with x and y axes. Currently only supports
 * primary x and y axes, even though there are methods pertaining to secondary axes.
 * <p/>
 * Cartesian charts can have the following additional children:
 * <ol>
 *   <li>{0,n} GridLines, will render lines aligned with the axes below or above the data series</li>
 *   <li>{2,n} Axis, required to define the coordinate space of the cartesian plane</li>
 * </ol>
 */
jsx3.Class.defineClass("jsx3.chart.CartesianChart", jsx3.chart.Chart, null, function(CartesianChart, CartesianChart_prototype) {
  
  var chart = jsx3.chart;
  var Chart = chart.Chart;
  var GridLines = chart.GridLines;
  var Axis = chart.Axis;
  
  /**
   * Filter function finds primary x axis.
   * @private
   * @jsxobf-clobber
   */
  CartesianChart._XPRIMARY_FILTER = function(c) {
    return (c instanceof Axis) && c.getPrimary() && c.getHorizontal(); 
  };

  /**
   * Filter function finds secondary x axis.
   * @private
   * @jsxobf-clobber
   */
  CartesianChart._XSECONDARY_FILTER = function(c) {
    return (c instanceof Axis) && !c.getPrimary() && c.getHorizontal(); 
  };

  /**
   * Filter function finds primary y axis.
   * @private
   * @jsxobf-clobber
   */
  CartesianChart._YPRIMARY_FILTER = function(c) {
    return (c instanceof Axis) && c.getPrimary() && !c.getHorizontal(); 
  };

  /**
   * Filter function finds secondary y axis.
   * @private
   * @jsxobf-clobber
   */
  CartesianChart._YSECONDARY_FILTER = function(c) {
    return (c instanceof Axis) && !c.getPrimary() && !c.getHorizontal(); 
  };

  // Z-Index values for the various components.
  /** @private @jsxobf-clobber */
  CartesianChart._ZINDEX_GRIDLINES = Chart.ZINDEX_DATA + 1;
  /** @private @jsxobf-clobber */
  CartesianChart._ZINDEX_GRIDLINES_FOREGROUND = Chart.ZINDEX_DATA + 90;
  /** @private @jsxobf-clobber */
  CartesianChart._ZINDEX_AXIS = Chart.ZINDEX_DATA + 100;

  CartesianChart.PART_GRIDLINES = 1 << 8;
  
  /**
   * The instance initializer.
   * @param name {String} the GI name of the instance
   * @param left {int} left position (in pixels) of the chart relative to its parent container
   * @param top {int} top position (in pixels) of the chart relative to its parent container
   * @param width {int} width (in pixels) of the chart
   * @param height {int} height (in pixels) of the chart
   */
  CartesianChart_prototype.init = function(name, left, top, width, height) {
    //call constructor for super class
    this.jsxsuper(name, left, top, width, height);
  };

  /**
   * Returns the array of children GridLines instances.
   * @return {Array<jsx3.chart.GridLines>} gridLines
   */
  CartesianChart_prototype.getGridLines = function() {
    return GridLines ? this.getDescendantsOfType(GridLines) : [];
  };

  /**
   * Returns a list of series children that should be drawn against axis.
   * @param axis {jsx3.chart.Axis} 
   * @return {Array<jsx3.chart.Series>}
   * @package
   */
  CartesianChart_prototype.getSeriesForAxis = function( axis, bDisplayedOnly ) {
    var matches = [];
    var series = bDisplayedOnly ? this.getDisplayedSeries() : this.getSeries();
    for (var i = 0; i < series.length; i++) {
      if ((axis.getHorizontal() && axis.getPrimary() == series[i].getUsePrimaryX()) ||
          (!axis.getHorizontal() && axis.getPrimary() == series[i].getUsePrimaryY()))
        matches.push(series[i]);
    }
    return matches;
  };
  
  /**
   * Returns the primary x axis, if any.
   * @return {jsx3.chart.Axis} primaryXAxis
   */
  CartesianChart_prototype.getPrimaryXAxis = function() {
    return this.findDescendants(CartesianChart._XPRIMARY_FILTER, false, false, true);
  };

  /**
   * Returns the secondary x axis, if any.
   * @return {jsx3.chart.Axis} secondaryXAxis
   * @package
   */
  CartesianChart_prototype.getSecondaryXAxis = function() {
    return this.findDescendants(CartesianChart._XSECONDARY_FILTER, false, false, true);
  };

  /**
   * Returns the primary y axis, if any.
   * @return {jsx3.chart.Axis} primaryYAxis
   */
  CartesianChart_prototype.getPrimaryYAxis = function() {
    return this.findDescendants(CartesianChart._YPRIMARY_FILTER, false, false, true);
  };

  /**
   * Returns the secondary y axis, if any.
   * @return {jsx3.chart.Axis} secondaryYAxis
   * @package
   */
  CartesianChart_prototype.getSecondaryYAxis = function() {
    return this.findDescendants(CartesianChart._YSECONDARY_FILTER, false, false, true);
  };

  /**
   * Returns the range for axis, delegates to getXRange() or getYRange().
   * @param axis {jsx3.chart.Axis} 
   * @return {Array<Number>} [min,max] or null if no range can be found
   */
  CartesianChart_prototype.getRangeForAxis = function( axis ) {
    var series = this.getSeriesForAxis(axis, true);
    return axis.getHorizontal() ? this.getXRange(series) : this.getYRange(series);
  };
  
  /**
   * Returns the range of x values in the data provider, subclasses must implement.
   * @param series {Array<jsx3.chart.Series>} the series to consider
   * @return {Array<Number>} [min,max] or null if no range can be found
   */
  CartesianChart_prototype.getXRange = jsx3.Method.newAbstract('series');
  
  /**
   * Returns the range of y values in the data provider, subclasses must implement.
   * @param series {Array<jsx3.chart.Series>} the series to consider
   * @return {Array<Number>} [min,max] or null if no range can be found
   */
  CartesianChart_prototype.getYRange = jsx3.Method.newAbstract('series');
  
  /**
   * Returns the range of the return values of a function when applied over a number of series and all the categories.
   * @param series {Array<jsx3.chart.Series>} the series to consider
   * @param functName {String} the name of the value function to call on each series
   * @return {Array<Number>} [min,max] or null if no range can be found
   * @package
   */
  CartesianChart_prototype.getRangeForField = function(series, functName) {
    var dp = this.getDataProvider();
    if (dp == null) {
      chart.LOG.debug("no data provider for chart: " + this);
      return null;
    }
    
    var max = Number.NEGATIVE_INFINITY;
    var min = Number.POSITIVE_INFINITY;
    
    for (var i = 0; i < dp.length; i++) {
      var record = dp[i];
      
      for (var j = 0; j < series.length; j++) {
        var ser = series[j];
        var value = ser[functName](record);
        if (value != null) {
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      }
    }
    
    if (max == Number.NEGATIVE_INFINITY || min == Number.POSITIVE_INFINITY) return null;
    return [min, max];
  };

  /**
   * calculates the stack of the return values of a function applied to every series for each category, and then returns the range of the stacks; a stack is like a sum but divided into negative and positive sums
   * @param series {Array<jsx3.chart.Series>} the series to consider
   * @param functName {String} the name of the value function to call on each series
   * @return {Array<Number>} [min,max] or null if no range can be found
   * @package
   */
  CartesianChart_prototype.getStackedRangeForField = function(series, functName) {
    var dp = this.getDataProvider();
    if (dp == null) {
      chart.LOG.debug("no data provider for chart: " + this);
      return null;
    }

    var max = Number.NEGATIVE_INFINITY;
    var min = Number.POSITIVE_INFINITY;
    
    for (var i = 0; i < dp.length; i++) {
      var record = dp[i];
      
      // calculate the stack for this record
      var pos = 0, neg = 0;
      
      for (var j = 0; j < series.length; j++) {
        var ser = series[j];
        var value = ser[functName](record);
        if (value == null) continue;
        
        if (value >= 0) pos += value;
        else neg += value;
      }
      
      // expand range to this stack's range
      min = Math.min(min, neg);
      max = Math.max(max, pos);
    } 
    
    if (max == Number.NEGATIVE_INFINITY || min == Number.POSITIVE_INFINITY) return null;
    return [min, max];
  };

  /**
   * like getStackedRangeForField() but each stack is normalized to 100%; will always return [0,100] if all values are positive, otherwise [n,n+100] where -100 <= n < 0
   * @param series {Array<jsx3.chart.Series>} the series to consider
   * @param functName {String} the name of the value function to call on each series
   * @return {Array<Number>} [min,max] or null if no range can be found
   * @package
   */
  CartesianChart_prototype.getStacked100RangeForField = function(series, functName) {
    var dp = this.getDataProvider();
    if (dp == null) {
      chart.LOG.debug("no data provider for chart: " + this);
      return null;
    }

    var max = Number.NEGATIVE_INFINITY;
    var min = Number.POSITIVE_INFINITY;
    
    for (var i = 0; i < dp.length; i++) {
      var record = dp[i];
      
      var pos = 0, neg = 0, tot = 0;
      
      for (var j = 0; j < series.length; j++) {
        var ser = series[j];
        var value = ser[functName](record);
        if (value == null) continue;
        
        tot += Math.abs(value);
        if (value >= 0) pos += value;
        else neg += value;
      }
      
      var x1 = tot == 0 ? 0 : (100 * neg / tot);
      var x2 = tot == 0 ? 0 : (100 * pos / tot);
      min = Math.min(min, x1);
      max = Math.max(max, x2);
    } 
    
    if (max == Number.NEGATIVE_INFINITY || min == Number.POSITIVE_INFINITY) return null;
    return [min, max];
  };

  /**
   * combine two or more ranges into one union
   * @param ranges {Array<Array<Number>>} the ranges to combine, may contain null values
   * @return {Array<Number>} [min,max]
   * @package
   */
  CartesianChart_prototype.getCombinedRange = function(ranges) {
    var max = Number.NEGATIVE_INFINITY;
    var min = Number.POSITIVE_INFINITY;
    
    for (var i = 0; i < ranges.length; i++) {
      if (ranges[i] != null) {
        min = Math.min(min, ranges[i][0]);
        max = Math.max(max, ranges[i][1]);
      }
    }
    
    if (max == Number.NEGATIVE_INFINITY || min == Number.POSITIVE_INFINITY) return null;
    return [min, max];
  };
  
  /**
   * Renders all vector elements and appends them to the render root.
   * @package
   */
  CartesianChart_prototype.createVector = function() {
    this.jsxsuper();
    var root = this.getDataCanvas();
    
    var pxAxis = this.getPrimaryXAxis();
    var pyAxis = this.getPrimaryYAxis();
    var sxAxis = this.getSecondaryXAxis();
    var syAxis = this.getSecondaryYAxis();
    
    var w = root.getWidth();
    var h = root.getHeight();
    var padding = root.getPaddingDimensions();
    
    var dataDim = null;
    
    // two passes on the axes, i suppose that this could actually be insufficient to render well in
    // all cases but it seems to work well in general. basically an axis needs to know where it and its
    // opposing axis will render before it know how much room the axis and the labels/ticks/title will
    // take up, but then adjusting for that changes the inputs that went into the adjustments ...
    for (var i = 1; i <= 2; i++) {
      var axisWidth = null;
      if (i == 1) {
        // first pass uses rough estimate of axis gutter based on default or user supplied value
        // of getDisplayWidth()
        axisWidth = [
          sxAxis != null ? sxAxis.getDisplayWidth() : 0,
          syAxis != null ? syAxis.getDisplayWidth() : 0,
          pxAxis != null ? pxAxis.getDisplayWidth() : 0,
          pyAxis != null ? pyAxis.getDisplayWidth() : 0
        ];
      } else {
        // second pass refines values set in first pass but trying to calculate how much the 
        // label/ticks/title extrude from the data area
        axisWidth = this._getAxisMetrics(sxAxis, syAxis, pxAxis, pyAxis);
      }

      dataDim = [padding[3]+axisWidth[3], padding[0]+axisWidth[0], 
        w-(padding[3]+axisWidth[3]+padding[1]+axisWidth[1]), 
        h-(padding[0]+axisWidth[0]+padding[2]+axisWidth[2])];
    
      this._prepareAxis(pxAxis, dataDim[2]);
      this._prepareAxis(pyAxis, dataDim[3]);
      this._prepareAxis(sxAxis, dataDim[2]);
      this._prepareAxis(syAxis, dataDim[3]);
    }
    
    // render grid lines
    var grids = this.getGridLines();
    for (var i = 0; i < grids.length; i++) {
      var gridLines = grids[i];
      if (gridLines.getDisplay() == jsx3.gui.Block.DISPLAYNONE) continue;

      gridLines.setDimensions(dataDim);
      gridLines.setZIndex(gridLines.getInForeground() ? 
          CartesianChart._ZINDEX_GRIDLINES_FOREGROUND : CartesianChart._ZINDEX_GRIDLINES);
          
      gridLines.updateView();
      root.appendChild(gridLines.getCanvas());
    }
    
    this._updateAxisView(pxAxis, dataDim[0], dataDim[1]);
    this._updateAxisView(pyAxis, dataDim[0], dataDim[1]);
    this._updateAxisView(sxAxis, dataDim[0], dataDim[1]);
    this._updateAxisView(syAxis, dataDim[0], dataDim[1]);
    
    // define bounds of each series
    var series = this.getDisplayedSeries();
    for (var i = 0; i < series.length; i++) {
      series[i].setDimensions(dataDim);
    }
  };

  /**
   * updates axis length and calls prePaintUpdate()
   * @private
   * @jsxobf-clobber
   */
  CartesianChart_prototype._prepareAxis = function( axis, length ) {
    if (axis != null) {
      axis.setLength(length);
      axis.prePaintUpdate();
    }
  };
  
  /**
   * Renders the axis, appends it to the render root.
   * @param axis {jsx3.chart.Axis} the axis
   * @param offsetX {int} horizontal offset of the upper-left corner of the axis from the upper-left corner of the data canvas
   * @param offsetY {int} vertical offset of the upper-left corner of the axis from the upper-left corner of the data canvas
   * @private
   * @jsxobf-clobber
   */
  CartesianChart_prototype._updateAxisView = function( axis, offsetX, offsetY ) {
    var root = this.getDataCanvas();
    if (axis != null) {
      // not sure if we couldn't just make the axis dimensions smaller and cut the offset since
      // VML tags never clip
      axis.setDimensions(offsetX, offsetY, root.getWidth(), root.getHeight());
      axis.setZIndex(CartesianChart._ZINDEX_AXIS);
      
      axis.updateView();
      root.appendChild(axis.getCanvas());
    }
  };

  /**
   * calculate the total gutter space needed for all the axes
   * @return {Array<int>} [top,right,bottom,left]
   * @private
   * @jsxobf-clobber
   */
  CartesianChart_prototype._getAxisMetrics = function( sxAxis, syAxis, pxAxis, pyAxis ) {
    var l = 0, t = 0, r = 0, b = 0;
    
    if (sxAxis != null) {
      var gutter = sxAxis._getGutterWidths();
      t = gutter[1];
      b = gutter[0];
    }
    if (syAxis != null) {
      var gutter = syAxis._getGutterWidths();
      r += gutter[0];
      l += gutter[1];
    }
    if (pxAxis != null) {
      var gutter = pxAxis._getGutterWidths();
      b = Math.max(b, gutter[1]);
      t = Math.max(t, gutter[0]);
    }
    if (pyAxis != null) {
      var gutter = pyAxis._getGutterWidths();
      l = Math.max(l, gutter[0]);
      r = Math.max(r, gutter[1]);
    }
    
    return [t,r,b,l];
  };
  
  /**
   * the beginning of a more efficient repaint method
   * @param mask {int} a bit mask that determines which sub parts of the chart are repainted
   * @package
   */
  CartesianChart_prototype.repaintParts = function( mask ) {
    if (mask & CartesianChart.PART_GRIDLINES) {
      var grids = this.getGridLines();
      for (var i = 0; i < grids.length; i++) {
        var gridLines = grids[i];
        if (gridLines.getDisplay() == jsx3.gui.Block.DISPLAYNONE) continue;
        
        gridLines.setZIndex(gridLines.getInForeground() ? 
            CartesianChart._ZINDEX_GRIDLINES_FOREGROUND : CartesianChart._ZINDEX_GRIDLINES);
        gridLines.repaint();
      }
    }
    
    this.jsxsuper(mask);
  };
  
  /**
   * allow children of type GridLines and Axis
   * @return {boolean}
   * @package
   */
  CartesianChart_prototype.onSetChild = function( child ) {
    if (GridLines && child instanceof GridLines) {
      return true;
    } else if (Axis && child instanceof Axis) {
      return true;
    } else {
      return this.jsxsuper(child);
    }
  };


  /**
   * Returns the release/build for the class (i.e., "2.2.00").
   * @return {String}
   * @deprecated
   */
  CartesianChart.getVersion = function() {
    return chart.VERSION;
  };


});