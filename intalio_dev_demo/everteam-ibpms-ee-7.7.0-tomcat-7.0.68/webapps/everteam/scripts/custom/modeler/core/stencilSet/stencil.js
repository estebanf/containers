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
 * Init namespace
 */
if(!WAPAMA) {var WAPAMA= {};}
if(!WAPAMA.Core) {WAPAMA.Core = {};}
if(!WAPAMA.Core.StencilSet) {WAPAMA.Core.StencilSet = {};}

/**
 * Class Stencil
 * uses Prototpye 1.5.0
 * uses Inheritance
 * 
 * This class represents one stencil of a stencil set.
 */
WAPAMA.Core.StencilSet.Stencil = {

  /**
   * Constructor
   */
  construct: function(jsonStencil, namespace, source, stencilSet, propertyPackages, defaultPosition) {
    arguments.callee.$.construct.apply(this, arguments); // super();
    
    // check arguments and set defaults.
    if(!jsonStencil) throw "Stencilset seems corrupt.";
    if(!namespace) throw "Stencil does not provide namespace.";
    if(!source) throw "Stencil does not provide SVG source.";
    if(!stencilSet) throw "Fatal internal error loading stencilset.";
    
    this._source = source;
    this._jsonStencil = jsonStencil;
    this._stencilSet = stencilSet;
    this._namespace = namespace;
    this._propertyPackages = propertyPackages;
    
    if(defaultPosition && !this._jsonStencil.position) 
      this._jsonStencil.position = defaultPosition;
    
    this._view;
    this._properties = new Hash();

    //init all JSON values
    if(!this._jsonStencil.type || !(this._jsonStencil.type === "edge" || this._jsonStencil.type === "node")) {
      throw "WAPAMA.Core.StencilSet.Stencil(construct): Type is not defined.";
    }
    if(!this._jsonStencil.id || this._jsonStencil.id === "") {
      throw "WAPAMA.Core.StencilSet.Stencil(construct): Id is not defined.";
    }
    if(!this._jsonStencil.title || this._jsonStencil.title === "") {
      throw "WAPAMA.Core.StencilSet.Stencil(construct): Title is not defined.";
    }

    if(!this._jsonStencil.description) { this._jsonStencil.description = ""; };
    if(!this._jsonStencil.groups) { this._jsonStencil.groups = []; }
    if(!this._jsonStencil.roles) { this._jsonStencil.roles = []; }
    
    //add id of stencil to its roles
    this._jsonStencil.roles.push(this._jsonStencil.id);

    //prepend namespace to each role
    this._jsonStencil.roles.each((function(role, index) {
      this._jsonStencil.roles[index] = namespace + role;
    }).bind(this));

    //delete duplicate roles
    this._jsonStencil.roles = this._jsonStencil.roles.uniq();

    //make id unique by prepending namespace of stencil set
    this._jsonStencil.id = namespace + this._jsonStencil.id;

    // removed properties related staffs. no need any more in WAPAMA
    this.postProcessProperties();
    
    // init serialize callback
    if(!this._jsonStencil.serialize) {
      this._jsonStencil.serialize = {};
      //this._jsonStencil.serialize = function(shape, data) { return data;};
    }
    
    // init deserialize callback
    if(!this._jsonStencil.deserialize) {
      this._jsonStencil.deserialize = {};
      //this._jsonStencil.deserialize = function(shape, data) { return data;};
    }
    
    // init layout callback
    if(!this._jsonStencil.layout) {
      this._jsonStencil.layout = []
      //this._jsonStencil.layout = function() {return true;}
    }

    if(this._jsonStencil.view) {
            if (this._jsonStencil.id == "io_#spring_pipe" || this._jsonStencil.id == "io_#camel_pipe" || this._jsonStencil.id == "io_#business_process") {
                this._jsonStencil.view = '<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>' +
                                         '<svg ' +
                                         '   xmlns="http://www.w3.org/2000/svg" '+
                                         '   xmlns:svg="http://www.w3.org/2000/svg" '+
                                         '   xmlns:wapama="http://www.wapama.net/diagram" ' +
                                         '   xmlns:xlink="http://www.w3.org/1999/xlink" ' +
                                         '   width="800" ' +
                                         '   height="600" ' +
                                         '   version="1.0"> ' +
                                         '   <defs></defs> ' +
                                         '   <g pointer-events="fill" > ' +
                                         '       <polygon stroke="black" fill="black" stroke-width="1" points="0,0 0,590 9,599 799,599 799,9 ' +           
                                         '           790,0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" /> ' +
                                         '       <rect id="diagramcanvas" wapama:resize="vertical horizontal" x="0" y="0" width="790" '+
                                         '           height="590" stroke="black" stroke-width="2" fill="white" />' +
                                         '       <text font-size="22" id="diagramtext" x="400" y="25" wapama:align="top center" stroke="black"></text>' +
                                         '   </g> ' +
                                         '</svg>';
            }

        if (this._jsonStencil.view.trim().match(/</)) {
            var parser  = new DOMParser();    
            var xml   = parser.parseFromString( this._jsonStencil.view ,"text/xml");
            
            var documentElement = xml.documentElement;
            
            // Under IE8+ browser, xml document element can't be regarded as a document element.
            if (WAPAMA.UI.isIE9()) {
                documentElement = WAPAMA.UI.toBeElement(xml.documentElement);
            }

            //check if result is a SVG document
            if( WAPAMA.Editor.checkClassType( documentElement, SVGSVGElement )) {

                this._view = documentElement;
                
                //updating link to images
                var imageElems = this._view.getElementsByTagNameNS("http://www.w3.org/2000/svg", "image");
                $A(imageElems).each((function(imageElem) {
                    var link = imageElem.getAttributeNodeNS("http://www.w3.org/1999/xlink", "href");
                    if(link && link.value.indexOf("://") == -1) {
                        link.textContent = this._source + "view/" + link.value;
                    }
                }).bind(this));
                    
                    // if this SVG is the last stencil which should be loaded
                    if (this._stencilSet.isLastStencil()) {
                        this._stencilSet.stencilSetLoadFinish();
                    }
            } else {
                throw "WAPAMA.Core.StencilSet.Stencil(_loadSVGOnSuccess): The response is not a SVG document."
            }
        } else {
          if (jsonStencil.view.charAt(0) == '/') { // the source is an absolute URL
              var url = jsonStencil.view;
          } else {
            // LUDWIG HACK
              var url = "/everteam/modeler/stencilsets/bpmn2.0/view/" + jsonStencil.view;//source + "view/" + jsonStencil.view;
          }

          WAPAMA.Log.debug("Send request to load SVG for stencil: " + this.title(), "url = " + url);
          new Ajax.Request(url, {
                      asynchronous:true, method:'get',
                      onSuccess:this._loadSVGOnSuccess.bind(this),
                      onFailure:this._loadSVGOnFailure.bind(this)
          });

        }
    }
  },
  postProcessProperties: function() {

    // add image path to icon
    if(this._jsonStencil.icon) {

      if (this._jsonStencil.icon.charAt(0) === '/') { 
        // then do nothing
      } else if (this._jsonStencil.icon.indexOf("://") === -1) {
        this._jsonStencil.icon = this._source + "icons/" + this._jsonStencil.icon;
      } else {//secure against xss otherwise ? not sure.
        this._jsonStencil.icon = "";
      }
    } else {
      this._jsonStencil.icon = "";
    }
  
    // init property packages
    if(this._jsonStencil.propertyPackages && this._jsonStencil.propertyPackages instanceof Array) {
      this._jsonStencil.propertyPackages.each((function(ppId) {
        var pp = this._propertyPackages[ppId];
        
        if(pp) {
          pp.each((function(prop){
            var oProp = new WAPAMA.Core.StencilSet.Property(prop, this._namespace, this);
            this._properties[oProp.prefix() + "-" + oProp.id()] = oProp; 
          }).bind(this));
        }
      }).bind(this));
    }
    
    // init properties
    if(this._jsonStencil.properties && this._jsonStencil.properties instanceof Array) {
      this._jsonStencil.properties.each((function(prop) {
        var oProp = new WAPAMA.Core.StencilSet.Property(prop, this._namespace, this);
        this._properties[oProp.prefix() + "-" + oProp.id()] = oProp; 
      }).bind(this));
    }
    

  },
  /**
   * @param {WAPAMA.Core.StencilSet.Stencil} stencil
   * @return {Boolean} True, if stencil has the same namespace and type.
   */
  equals: function(stencil) {
    return (this.id() === stencil.id());
  },

  stencilSet: function() {
    return this._stencilSet;
  },

  type: function() {
    return this._jsonStencil.type;
  },

  namespace: function() {
    return this._namespace;
  },

  id: function() {
    return this._jsonStencil.id;
  },
    
    idWithoutNs: function(){
        return this.id().replace(this.namespace(),"");
    },

  title: function() {
    return WAPAMA.Core.StencilSet.getTranslation(this._jsonStencil, "title");
  },

  description: function() {
    return WAPAMA.Core.StencilSet.getTranslation(this._jsonStencil, "description");
  },
  
  groups: function() {
    return WAPAMA.Core.StencilSet.getTranslation(this._jsonStencil, "groups");
  },
  
  position: function() {
    return (isNaN(this._jsonStencil.position) ? 0 : this._jsonStencil.position);
  },

  view: function() {
    return this._view.cloneNode(true) || this._view;
  },
  
  hidden: function() {
    return this._jsonStencil.hide;
  },
  
  icon: function() {
    return this._jsonStencil.icon;
  },
  
  fixedAspectRatio: function() {
    return this._jsonStencil.fixedAspectRatio === true;
  },
  
  hasMultipleRepositoryEntries: function() {
    return (this.getRepositoryEntries().length > 0);
  },
  
  getRepositoryEntries: function() {
    return (this._jsonStencil.repositoryEntries) ?
      $A(this._jsonStencil.repositoryEntries) : $A([]);
  },
  
  properties: function() {
    return this._properties.values();
  },

  property: function(id) {
    return this._properties[id];
  },

  roles: function() {
    return this._jsonStencil.roles;
  },
  
  defaultAlign: function() {
    if(!this._jsonStencil.defaultAlign)
      return "east";
    return this._jsonStencil.defaultAlign;
  },

  serialize: function(shape, data) {
    return this._jsonStencil.serialize;
    //return this._jsonStencil.serialize(shape, data);
  },
  
  deserialize: function(shape, data) {
    return this._jsonStencil.deserialize;
    //return this._jsonStencil.deserialize(shape, data);
  },
  
  // layout property to store events for layouting in plugins
  layout: function(shape) {
    return this._jsonStencil.layout
  },
  
  addProperty: function(property, namespace) {
    if(property && namespace) {
      var oProp = new WAPAMA.Core.StencilSet.Property(property, namespace, this);
      this._properties[oProp.prefix() + "-" + oProp.id()] = oProp;
    }
  },
  
  removeProperty: function(propertyId) {
    if(propertyId) {
      var oProp = this._properties.values().find(function(prop) {
        return (propertyId == prop.id());
      });
      if(oProp)
        delete this._properties[oProp.prefix() + "-" + oProp.id()];
    }
  },

  _loadSVGOnSuccess: function(result) {
    WAPAMA.Log.debug("Receive response of the SVG of " + this.title());
    var xml = null;
    
    /*
     * We want to get a dom object for the requested file. Unfortunately,
     * safari has some issues here. this is meant as a fallback for all
     * browsers that don't recognize the svg mimetype as XML but support
     * data: urls on Ajax calls.
     */
    
    // responseXML != undefined.
    // if(!(result.responseXML))
    
      // get the dom by data: url.
      // xml = _evenMoreEvilHack(result.responseText, 'text/xml');
    
    // else
    try
    {
      // get it the usual way.
      xml = result.responseXML;
      
      var documentElement = xml.documentElement;

      // Under IE8+ browser, xml document element can't be regarded as a document element.
      if (WAPAMA.UI.isIE9()) {
          documentElement = WAPAMA.UI.toBeElement(xml.documentElement);
      }

      //check if result is a SVG document
      if( WAPAMA.Editor.checkClassType(documentElement, SVGSVGElement)) {
          this._view = documentElement;
          
          //updating link to images
          var imageElems = this._view.getElementsByTagNameNS("http://www.w3.org/2000/svg", "image");
          $A(imageElems).each((function(imageElem) {
              var link = imageElem.getAttributeNodeNS("http://www.w3.org/1999/xlink", "href");
              if(link && link.value.indexOf("://") == -1) {
                  link.textContent = this._source + "view/" + link.value;
              }
          }).bind(this));
      } else {
          throw "WAPAMA.Core.StencilSet.Stencil(_loadSVGOnSuccess): The response is not a SVG document."
      }
    } catch (error) {
      WAPAMA.Log.error(error.message);
    } finally {
            // if this SVG is the last stencil which should be loaded
            if (this._stencilSet.isLastStencil()) {
                this._stencilSet.stencilSetLoadFinish();
            }
        }
  },

  _loadSVGOnFailure: function(result) {
      this.isLoadFailure = true;
      WAPAMA.Log.warn("WAPAMA.Core.StencilSet.Stencil(_loadSVGOnFailure): Loading SVG document failed.");
    //throw "WAPAMA.Core.StencilSet.Stencil(_loadSVGOnFailure): Loading SVG document failed."
        if (this._stencilSet.isLastStencil()) {
            this._stencilSet.stencilSetLoadFinish();
        }
  },

  toString: function() { return "Stencil " + this.title() + " (" + this.id() + ")"; }
};

WAPAMA.Core.StencilSet.Stencil = Clazz.extend(WAPAMA.Core.StencilSet.Stencil);

/**
 * Transform a string into an xml document, the Safari way, as long as
 * the nightlies are broken. Even more evil version.
 * @param {Object} str
 * @param {Object} contentType
 */
function _evenMoreEvilHack(str, contentType) {
  
  /*
   * This even more evil hack was taken from
   * http://web-graphics.com/mtarchive/001606.php#chatty004999
   */
  
  if (window.ActiveXObject) {
    var d = new ActiveXObject("MSXML.DomDocument");
    d.loadXML(str);
    return d;
  } else if (window.XMLHttpRequest) {
    var req = new XMLHttpRequest;
    req.open("GET", "data:" + (contentType || "application/xml") +
            ";charset=utf-8," + encodeURIComponent(str), false);
    if (req.overrideMimeType) {
      req.overrideMimeType(contentType);
    }
    req.send(null);
    return req.responseXML;
  }
}

/**
 * Transform a string into an xml document, the Safari way, as long as
 * the nightlies are broken.
 * @param {Object} result the xml document object.
 */
function _evilSafariHack(serializedXML) {
  
  /*
   *  The Dave way. Taken from:
   *  http://web-graphics.com/mtarchive/001606.php
   *  
   *  There is another possibility to parse XML in Safari, by implementing
   *  the DOMParser in javascript. However, in the latest nightlies of
   *  WebKit, DOMParser is already available, but still buggy. So, this is
   *  the best compromise for the time being.
   */   
  
  var xml = serializedXML;
  var url = "data:text/xml;charset=utf-8," + encodeURIComponent(xml);
  var dom = null;
  
  // your standard AJAX stuff
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.onload = function() { dom = req.responseXML; }
  req.send(null);
  
  return dom;
}