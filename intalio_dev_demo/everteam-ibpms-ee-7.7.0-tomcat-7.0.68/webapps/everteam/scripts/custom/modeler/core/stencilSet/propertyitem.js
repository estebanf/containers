/**
 * Copyright (C) 2005-2014 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/**
 * Init namespace
 */
if(!WAPAMA) {var WAPAMA= {};}
if(!WAPAMA.Core) {WAPAMA.Core = {};}
if(!WAPAMA.Core.StencilSet) {WAPAMA.Core.StencilSet = {};}

/**
 * Class Stencil
 * uses Prototpye 1.5.0
 * uses Inheritance
 */
WAPAMA.Core.StencilSet.PropertyItem = Clazz.extend({

  /**
   * Constructor
   */
  construct: function(jsonItem, namespace, property) {
    arguments.callee.$.construct.apply(this, arguments);

    if(!jsonItem) {
      throw "WAPAMA.Core.StencilSet.PropertyItem(construct): Parameter jsonItem is not defined.";
    }
    if(!namespace) {
      throw "WAPAMA.Core.StencilSet.PropertyItem(construct): Parameter namespace is not defined.";
    }
    if(!property) {
      throw "WAPAMA.Core.StencilSet.PropertyItem(construct): Parameter property is not defined.";
    }
    
    this._jsonItem = jsonItem;
    this._namespace = namespace;
    this._property = property;
    
    //init all values
    if(!jsonItem.value) {
      throw "WAPAMA.Core.StencilSet.PropertyItem(construct): Value is not defined.";
    }
    
    if(this._jsonItem.refToView) {
      if(!(this._jsonItem.refToView instanceof Array)) {
        this._jsonItem.refToView = [this._jsonItem.refToView];
      }
    } else {
      this._jsonItem.refToView = [];
    }
  },

  /**
   * @param {WAPAMA.Core.StencilSet.PropertyItem} item
   * @return {Boolean} True, if item has the same namespace and id.
   */
  equals: function(item) {
    return (this.property().equals(item.property()) &&
      this.value() === item.value());
  },

  namespace: function() {
    return this._namespace;
  },

  property: function() {
    return this._property;
  },

  value: function() {
    return this._jsonItem.value;
  },
  
  title: function() {
    return WAPAMA.Core.StencilSet.getTranslation(this._jsonItem, "title");
  },

  refToView: function() {
    return this._jsonItem.refToView;
  },
  
  icon: function() {
    return (this._jsonItem.icon) ? this.property().stencil()._source + "icons/" + this._jsonItem.icon : "";
  },

  toString: function() { return "PropertyItem " + this.property() + " (" + this.value() + ")"; }
});