/**
 * Copyright (c) 2009-2011 Intalio, Inc.
 * @author martin.czuchra
 */

/*
 * Save and triple generation behaviour. Use this area to configure
 * data management to your needs.
 */
var USE_ASYNCHRONOUS_REQUESTS =   true;
var DISCARD_UNUSED_TRIPLES =      true;
var PREFER_SPANS_OVER_DIVS =      true;
var PREFER_TITLE_OVER_TEXTNODE =    false;
var RESOURCE_ID_PREFIX =        'resource';

var SHOW_DEBUG_ALERTS_WHEN_SAVING = false;
var SHOW_EXTENDED_DEBUG_INFORMATION = false;

/*
 * Back end specific workarounds.
 */

var USE_ARESS_WORKAROUNDS =   true;

/*
 * Data management constants. Do not change these, as they are used
 * both internally and externally to communicate on events and to identify
 * command object actions in triple production and embedding rules.
 */

// Resource constants
var RESOURCE_CREATED =      0x01;
var RESOURCE_REMOVED =      0x02;
var RESOURCE_SAVED =        0x04;
var RESOURCE_RELOADED =     0x08;
var RESOURCE_SYNCHRONIZED =     0x10;

// Triple constants
var TRIPLE_REMOVE = 0x01;
var TRIPLE_ADD =    0x02;
var TRIPLE_RELOAD = 0x04;
var TRIPLE_SAVE =   0x08;

var PROCESSDATA_REF = 'processdata';
/**
 * The Data Management object. Use this one when interacting with page internal
 * data. Initialize data management by DataManager.init();
 * @class DataManager
 */
var DataManager = {
  
  /**
   * The init method should be called once in the DataManagers lifetime.
   * It causes the DataManager to initialize itself, the erdf parser, do all
   * neccessary registrations and configurations, to run the parser and
   * from then on deliver all resulting triples.
   * No parameters needed are needed in a call to this method.
   */
  init: function() {
//    ERDF.init(DataManager._registerTriple);
//    DataManager.__synclocal();
  },  
  /**
   * This method serializes a single div into a string that satisfies the
   * client/server communication protocol. It ingnores all elements that have
   * an attribute named class that includes 'transient'.
   * @param {Object} node the element to serialize.
   * @param {Object} preserveNamespace whether to preserve the parent's
   *                 namespace. If you are not sure about namespaces, provide
   *                 just the element to be serialized.
   */
  serialize: function(node, preserveNamespace) {

    if (node.nodeType == node.ELEMENT_NODE) {
      // serialize an element node.
      
      var children = $A(node.childNodes);
      var attributes = $A(node.attributes);
      var clazz = new String(node.getAttribute('class'));
      var ignore = clazz.split(' ').member('transient');

      // ignore transients.

      if(ignore)
        return '';

      // start serialization.
      
      var result = '<' + node.nodeName;
      
      // preserve namespace?
      if(!preserveNamespace) 
        result += ' xmlns="' + (node.namespaceURI ? node.namespaceURI : XMLNS.XHTML) + '" xmlns:wapama="http://www.wapama.net/diagram"';
      
      // add all attributes.
      
      // Value format of attributes that marker-end, marker-mid, marker-start is different in IE8+ compared to Chrome/Firefox.
            // E.g., Chrome: marker-end="url(#end)"; IE9: marker-end="url("#end")".
            // We need to remove all double quote in attribute value, if not, saved svg can't be displayed correctly.
      if ((WAPAMA.UI.isIEGt8() || WAPAMA.UI.isIE11()) && /^(path|line|polyline|polygon)$/.test(node.nodeName)) {
          attributes.each(function(attribute) {
              var attrName = attribute.nodeName;
              var attrValue = attribute.nodeValue;
              result += ' ' + attrName + '="';
              if (/^(marker-start|marker-mid|marker-end)$/.test(attrName)) {
                  attrValue = attrValue.replace(/"/g, "");
              }
                    result += attrValue + '"';
                });
      } else {
          attributes.each(function(attribute) {
              result += ' ' + attribute.nodeName + '="' +
              attribute.nodeValue + '"';});
      }
      
      // close if no children.
      
      if(children.length == 0)
        result += '/>';
        
      else {
        
        // serialize all children.
        
        result += '>';
        children.each(function(_node) {
          result += DataManager.serialize(_node, true)});
        result += '</' + node.nodeName + '>'
      }

      return result;
      
    } else if (node.nodeType == node.TEXT_NODE) {
      
      // serialize a text node.
      return  node.nodeValue;
    }
    
    //TODO serialize cdata areas also.
    //TODO work on namespace awareness.
  }//,

}

Kickstart.register(DataManager.init);