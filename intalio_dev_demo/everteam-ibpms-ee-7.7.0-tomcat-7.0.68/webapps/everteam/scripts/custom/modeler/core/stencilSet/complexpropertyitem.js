/**
 * Copyright (C) 2005-2014 Intalio inc.
 *
 * The program(s) herein may be used and/or copied only with
 * the written permission of Intalio Inc. or in accordance with
 * the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */

/**
 * Init namespaces
 */
if(!WAPAMA) {var WAPAMA= {};}
if(!WAPAMA.Core) {WAPAMA.Core = {};}
if(!WAPAMA.Core.StencilSet) {WAPAMA.Core.StencilSet = {};}

/**
 * Class Stencil
 * uses Prototpye 1.5.0
 * uses Inheritance
 */
WAPAMA.Core.StencilSet.ComplexPropertyItem = Clazz.extend({

  /**
   * Constructor
   */
  construct: function(jsonItem, namespace, property) {
    arguments.callee.$.construct.apply(this, arguments);

    if(!jsonItem) {
      throw "WAPAMA.Core.StencilSet.ComplexPropertyItem(construct): Parameter jsonItem is not defined.";
    }
    if(!namespace) {
      throw "WAPAMA.Core.StencilSet.ComplexPropertyItem(construct): Parameter namespace is not defined.";
    }
    if(!property) {
      throw "WAPAMA.Core.StencilSet.ComplexPropertyItem(construct): Parameter property is not defined.";
    }
    
    this._jsonItem = jsonItem;
    this._namespace = namespace;
    this._property = property;
    this._items = new Hash();
    
    //init all values
    if(!jsonItem.name) {
      throw "WAPAMA.Core.StencilSet.ComplexPropertyItem(construct): Name is not defined.";
    }
    
    if(!jsonItem.type) {
      throw "WAPAMA.Core.StencilSet.ComplexPropertyItem(construct): Type is not defined.";
    } else {
      jsonItem.type = jsonItem.type.toLowerCase();
    }
    
    if(jsonItem.type === WAPAMA.CONFIG.TYPE_CHOICE) {
      if(jsonItem.items && jsonItem.items instanceof Array) {
        jsonItem.items.each((function(item) {
          this._items[item.value] = new WAPAMA.Core.StencilSet.PropertyItem(item, namespace, this);
        }).bind(this));
      } else {
        throw "WAPAMA.Core.StencilSet.Property(construct): No property items defined."
      }
    } else if (jsonItem.type === WAPAMA.CONFIG.TYPE_DYNAMIC_CHOICE) {
      // initiate the DynamicChoice datastore using asynchronous ajax
      var item = jsonItem.items[0]
      var source = window.location.protocol + "//" + window.location.host + "/designer/integration"
      if (item.module !== undefined && item.columns !== undefined){
        var id = item.columns.id != undefined ? item.columns.id : "xid";
        var name = item.columns.name != undefined ? item.columns.name : "name";
        source += "/crmData/" + item.module + "/" + id + "," + name;
      } else {
        WAPAMA.Log.error("Configuration missing");
        WAPAMA.Log.error(pair);
        return;
      }
      new Ajax.Request(source + "?time=" +(new Date()).getTime(), {
        asynchronous: true,
        method: 'get',
        contentType: 'application/json',
        onSuccess: function(result) {
          var data = result.responseText.evalJSON();
          var counter = 0;
          var innerJsonString = "[";
          data.each(function(elt) {
            innerJsonString += "{'id':'"+ counter +"','title':'"+ elt.name +"','value':'" + elt.id +"'},";
            counter++;
          });
          innerJsonString = innerJsonString.substring(0,innerJsonString.length-1) + "]";
          // after get the dynamic choice data by asynchronous ajax,
          // change the dynamic choice type to choice type.
          jsonItem.type = WAPAMA.CONFIG.TYPE_CHOICE;
          jsonItem.items = innerJsonString.evalJSON();
          jsonItem.items.each(function(item) {
            this._items[item.value] = new WAPAMA.Core.StencilSet.PropertyItem(item, namespace, this);
          }.bind(this));
          // if jsonItem's value is null, set a default value.
          if(jsonItem.value == undefined || jsonItem.value == '') {
            if (jsonItem.items.length >0) {
              jsonItem.value = jsonItem.items[0].value;
            }
          }
        }.bind(this),
        onFailure: function(result) {
          WAPAMA.Log.error("Servlet invoking failed in %0", source);
          return null;
        }
      });
    }
  },

  /**
   * @param {WAPAMA.Core.StencilSet.PropertyItem} item
   * @return {Boolean} True, if item has the same namespace and id.
   */
  equals: function(item) {
    return (this.property().equals(item.property()) &&
      this.name() === item.name());
  },

  namespace: function() {
    return this._namespace;
  },

  property: function() {
    return this._property;
  },

  name: function() {
    return WAPAMA.Core.StencilSet.getTranslation(this._jsonItem, "name");
  },
  
  id: function() {
    return this._jsonItem.id;
  },
  
  type: function() {
    return this._jsonItem.type;
  },
  
  optional: function() {
    return this._jsonItem.optional;
  },
  
  width: function() {
    return this._jsonItem.width;
  },
  
  value: function() {
    return this._jsonItem.value;
  },
  
  items: function() {
    return this._items.values();
  },
  
  disable: function() {
    return this._jsonItem.disable;
  }
});