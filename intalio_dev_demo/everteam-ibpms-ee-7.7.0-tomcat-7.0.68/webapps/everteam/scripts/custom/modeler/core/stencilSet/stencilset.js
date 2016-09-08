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
if (!WAPAMA) {
    var WAPAMA = {};
}
if (!WAPAMA.Core) {
    WAPAMA.Core = {};
}
if (!WAPAMA.Core.StencilSet) {
    WAPAMA.Core.StencilSet = {};
}

/**
 * This class represents a stencil set. It offers methods for accessing
 *  the attributes of the stencil set description JSON file and the stencil set's
 *  stencils.
 */
WAPAMA.Core.StencilSet.StencilSet = Clazz.extend({

    /**
     * Constructor
     * @param source {URL} A reference to the stencil set specification.
     *
     */
    construct: function(wapamaEditor, source, editorId){
        arguments.callee.$.construct.apply(this, arguments);
        
        if (!source) {
            throw "WAPAMA.Core.StencilSet.StencilSet(construct): Parameter 'source' is not defined.";
        }
        if (source.endsWith("/")) {
            source = source.substr(0, source.length - 1);
        }
    
        this._extensions = new Hash();

        // save reference
        this._wapamaEditor = wapamaEditor;
        this._source = source;
        this._editorId = editorId;
        this._baseUrl = WAPAMA.PATH + "stencilset/" + source + "/"
        this._jsonObject = {};
        
        this._stencils = new Hash();
        this._availableStencils = new Hash();

        // A counter works with "totalStencilCount" to judge whether all the SVGs have finished loading.
        // To avoid that Model.json begin to load before all the SVGs are downloaded.
        this._currentStencilCount = 0;
        this._totalStencilCount = 0;

        //WAPAMA.Log.debug("Start to load the stencilset: " + source);

        this._init(gStencilSetJson);
    },
    
    /**
     * Finds a root stencil in this stencil set. There may be many of these. If
     * there are, the first one found will be used. In Firefox, this is the
     * topmost definition in the stencil set description file.
     */
    findRootStencilName: function(){
    
        // find any stencil that may be root.
        var rootStencil = this._stencils.values().find(function(stencil){
            return stencil._jsonStencil.mayBeRoot
        });
        
        // if there is none, just guess the first.
        if (!rootStencil) {
          WAPAMA.Log.warn("Did not find any stencil that may be root. Taking a guess.");
          rootStencil = this._stencils.values()[0];
        }

        // return its id.
        return rootStencil.id();
    },
    
    /**
     * @param {WAPAMA.Core.StencilSet.StencilSet} stencilSet
     * @return {Boolean} True, if stencil set has the same namespace.
     */
    equals: function(stencilSet){
        return (this.namespace() === stencilSet.namespace());
    },
    
  /**
   * 
   * @param {WAPAMA.Core.StencilSet.Stencil} rootStencil If rootStencil is defined, it only returns stencils
   *      that could be (in)direct child of that stencil.
   */
    stencils: function(rootStencil, rules, sortByGroup){
    if(rootStencil && rules) {
      var stencils = this._availableStencils.values();
      var containers = [rootStencil];
      var checkedContainers = [];
      
      var result = [];
      
      while (containers.size() > 0) {
        var container = containers.pop();
        checkedContainers.push(container);
        var children = stencils.findAll(function(stencil){
          var args = {
            containingStencil: container,
            containedStencil: stencil
          };
          return rules.canContain(args);
        });
        for(var i = 0; i < children.size(); i++) {
          if (!checkedContainers.member(children[i])) {
            containers.push(children[i]);
          }
        }
        result = result.concat(children).uniq();
      }
      
      // Sort the result to the origin order
      result = result.sortBy(function(stencil) {
        return stencils.indexOf(stencil);
      });
      
      
      if(sortByGroup) {
        result = result.sortBy(function(stencil) {
          return stencil.groups().first();
        });
      }
      
      var edges = stencils.findAll(function(stencil) {
        return stencil.type() == "edge";
      });
      result = result.concat(edges);
      
      return result;
      
    } else {
          if(sortByGroup) {
        return this._availableStencils.values().sortBy(function(stencil) {
          return stencil.groups().first();
        });
      } else {
        return this._availableStencils.values();
      }
    }
    },
    
    nodes: function(){
        return this._availableStencils.values().findAll(function(stencil){
            return (stencil.type() === 'node')
        });
    },
    
    edges: function(){
        return this._availableStencils.values().findAll(function(stencil){
            return (stencil.type() === 'edge')
        });
    },
    
    stencil: function(id){
        return this._stencils[id];
    },
    
    title: function(){
        return WAPAMA.Core.StencilSet.getTranslation(this._jsonObject, "title");
    },
    
    description: function(){
        return WAPAMA.Core.StencilSet.getTranslation(this._jsonObject, "description");
    },
    
    namespace: function(){
        return this._jsonObject ? this._jsonObject.namespace : null;
    },
    
    jsonRules: function(){
        return this._jsonObject ? this._jsonObject.rules : null;
    },
    
    source: function(){
        return this._source;
    },
  
  extensions: function() {
    return this._extensions;
  },
    
  __handleStencilset: function(responseText){
  
      try {
          // using eval instead of prototype's parsing,
          // since there are functions in this JSON.
          eval("this._jsonObject =" + responseText);
      } 
      catch (e) {
          throw "Stenciset corrupt: " + e;
      }
      
      // assert it was parsed.
      if (!this._jsonObject) {
          throw "Error evaluating stencilset. It may be corrupt.";
      }
      
      with (this._jsonObject) {
      
          // assert there is a namespace.
          if (!namespace || namespace === "") 
              throw "Namespace definition missing in stencilset.";
          
          if (!(stencils instanceof Array)) 
              throw "Stencilset corrupt.";
          
          // assert namespace ends with '#'.
          if (!namespace.endsWith("#")) 
              namespace = namespace + "#";
          
          // assert title and description are strings.
          if (!title) 
              title = "";
          if (!description) 
              description = "";
      }
  },
    
    /**
     * This method is called when the HTTP request to get the requested stencil
     * set succeeds. The response is supposed to be a JSON representation
     * according to the stencil set specification.
     * @param {Object} response The JSON representation according to the
     *      stencil set specification.
     */
    _init: function(responseText){
        WAPAMA.Log.debug("Finish loading the of stencilset: " + this._source);
        // init and check consistency.
        this.__handleStencilset(responseText);
    
    var pps = new Hash();
    
    // init property packages
    if(this._jsonObject.propertyPackages) {
      $A(this._jsonObject.propertyPackages).each((function(pp) {
        pps[pp.name] = pp.properties;
      }).bind(this));
    }
    
    var defaultPosition = 0;
    WAPAMA.Log.debug("Start to load each stencil");
    // set the total count of all the stencils except the root shape
    this._totalStencilCount = this._jsonObject.stencils.length - 1;
        // init each stencil
        $A(this._jsonObject.stencils).each((function(stencil){
          defaultPosition++;
            // instantiate normally.
          try {
              var oStencil = new WAPAMA.Core.StencilSet.Stencil(stencil, this.namespace(), this._baseUrl, this, pps, defaultPosition);
              if (oStencil.isLoadFailure) {
                  return;
              }
              this._stencils[oStencil.id()] = oStencil;
              this._availableStencils[oStencil.id()] = oStencil;
          } catch(e) {
              WAPAMA.Log.error("Problems instantiating a stencil:", e);
          }
        }).bind(this));
        

    //store stencil set
    WAPAMA.Core.StencilSet._stencilSetsByNamespace[this.namespace()] = this;

    //store stencil set by url
    WAPAMA.Core.StencilSet._stencilSetsByUrl[this._source] = this;
    
    var namespace = this.namespace();
    
    //store which editorInstance loads the stencil set
    if(WAPAMA.Core.StencilSet._StencilSetNSByEditorInstance[this._editorId]) {
      WAPAMA.Core.StencilSet._StencilSetNSByEditorInstance[this._editorId].push(namespace);
    } else {
      WAPAMA.Core.StencilSet._StencilSetNSByEditorInstance[this._editorId] = [namespace];
    }

    //store the rules for the editor instance
    if(WAPAMA.Core.StencilSet._rulesByEditorInstance[this._editorId]) {
      WAPAMA.Core.StencilSet._rulesByEditorInstance[this._editorId].initializeRules(this);
    } else {
      var rules = new WAPAMA.Core.StencilSet.Rules();
      rules.initializeRules(this);
      WAPAMA.Core.StencilSet._rulesByEditorInstance[this._editorId] = rules;
    }
    },
    
    toString: function(){
        return "StencilSet " + this.title() + " (" + this.namespace() + ")";
    },
    
    /**
     * judge whether the current stencil is the last of StencilSet
     */
    isLastStencil: function() {
        // increase _currentStencilCount after this SVG has been loaded.
        this._currentStencilCount++;
        // if this SVG is the last stencil in StencilSet
        if (this._currentStencilCount == this._totalStencilCount) {
            return true;
        } else {
            return false;
        }
    },
    
    /**
     * Callback when stencil set loading finished
     */
    stencilSetLoadFinish: function() {
        this._wapamaEditor.handleEvents( {type: WAPAMA.CONFIG.EVENT_SS_LOADED_ON_STARTUP}, { stencilType: null, canvasConfig: null });
    }
});