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

var idCounter = 0;
var ID_PREFIX = "resource";

function beforedrop(dragObj, event)
{
  //console.log("perform drag x=" + dragLocation.x + " y=" + dragLocation.y);
  wapamaEditor.loadedPlugins.each(function(plugin) {
    if (plugin.type == "WAPAMA.Plugins.ShapeRepository")
    {
      plugin.beforeDragOver(dragObj, event);
    }
  });
}

function addshape(dragObj, dragLocation)
{
  wapamaEditor.loadedPlugins.each(function(plugin) {
    if (plugin.type == "WAPAMA.Plugins.ShapeRepository"){
      // BUG-WAPAMA-000528 want to show property pane when drop a new shape into canvas
      WAPAMA.UI.isPropertyPaneHidden = false;
      plugin.drop(dragObj, dragLocation);
    }
  });
}

function addTestShape() {

  var facade = wapamaEditor._getPluginFacade();
  // Hide the highlighting
  facade.raiseEvent({type: WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'shapeRepo.added'});
  facade.raiseEvent({type: WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE, highlightId:'shapeRepo.attached'});
    

    /// Check if there is a current Parent
    //if(!this._currentParent) { return }
    
    
    //var xy = event.getXY();
    //var pos = {x: xy[0], y: xy[1]};

    var pos = {x:100, y:100};
    var a = facade.getCanvas().node.getScreenCTM();
    // Correcting the UpperLeft-Offset
    pos.x -= a.e; pos.y -= a.f;
    // Correcting the Zoom-Faktor
    pos.x /= a.a; pos.y /= a.d;
    
    // Correting the ScrollOffset
    //pos.x -= document.documentElement.scrollLeft;
    //pos.y -= document.documentElement.scrollTop;
    // Correct position of parent
    //var parentAbs = this._currentParent.absoluteXY();
    //pos.x -= parentAbs.x;
    //pos.y -= parentAbs.y;
  /**
  * option = {
  *   type: string,
  *   position: {x:int, y:int},
  *   connectingType: uiObj-Class
  *   connectedShape: uiObj
  *   draggin: bool
  *   namespace: url
  *       parent: WAPAMA.Core.AbstractShape
  *   template: a template shape that the newly created inherits properties from.
  *   }
  */
    var option = {
      type: "http://www.intalio.com/intalioProcessRepository#DataObject",
      position: pos,
      connectingType: null,
      connectedShape: null,
      draggin: true,
      namespace: "http://www.intalio.com/intalioProcessRepository#",
      parent: null,
      template: null
    };
    
    var commandClass = WAPAMA.Core.Command.extend({
      construct: function(option, currentParent, canAttach, position, facade){
        this.option = option;
        this.currentParent = currentParent;
        this.canAttach = canAttach;
        this.position = position;
        this.facade = facade;
        this.selection = this.facade.getSelection();
        this.shape;
        this.parent;
      },      
      execute: function(){
        if (!this.shape) {
          this.shape  = this.facade.createShape(option);
          this.parent = this.shape.parent;
        } else {
          this.parent.add(this.shape);
        }
        
        if( this.canAttach &&  this.currentParent instanceof WAPAMA.Core.Node && this.shape.dockers.length > 0){
          
          var docker = this.shape.dockers[0];
    
          if( this.currentParent.parent instanceof WAPAMA.Core.Node ) {
            this.currentParent.parent.add( docker.parent );
          }
                        
          docker.bounds.centerMoveTo( this.position );
          docker.setDockedShape( this.currentParent );
          //docker.update();  
        }
        
        //this.currentParent.update();
        //this.shape.update();

        this.facade.setSelection([this.shape]);
        this.facade.getCanvas().update();
        
        /*
        // make the node (been hidden since created) visible after update
        if (this.shape instanceof WAPAMA.Core.Node) {
          this.shape.setVisible(true);
        }
        this.facade.updateSelection();
        
        this.facade.raiseEvent({type:WAPAMA.CONFIG.EVENT_DROP_SHAPE, shape:this.shape});
        */
              
      },
      rollback: function(){
        this.facade.deleteShape(this.shape);
        
        //this.currentParent.update();

        this.facade.setSelection(this.selection.without(this.shape));
        this.facade.getCanvas().update();
        
        // make the node (been hidden since created) visible after update
        if (this.shape instanceof WAPAMA.Core.Node) {
          this.shape.setVisible(true);
        }
        this.facade.updateSelection();
      }
    });
    
    var browserEvent = { clientX: pos.x, clientY : pos.y };
            
    var position = facade.eventCoordinates( browserEvent ); 
          
    var currentParent = null;
    var canAttach = false;
    var command = new commandClass(option, currentParent, canAttach, position, facade);
    
    facade.executeCommands([command]);
}

/**
 * Main initialization method. To be called when loading
 * of the document, including all scripts, is completed.
 */
function init() {

  WAPAMA.Log.debug("WAPAMA: init");
  WAPAMA.availablePlugins = [];

  for (var i = 0; i < gAvailablePlugins.length; i++){
    WAPAMA.availablePlugins.push(gAvailablePlugins[i]);
  }
  
//  if (WAPAMA.UI.main.setBlankImgUrl) {
//    WAPAMA.UI.main.setBlankImgUrl();
//  }
  
  WAPAMA.Log.debug("Querying editor instances");

  // Hack for WebKit to set the SVGElement-Classes
  WAPAMA.Editor.setMissingClasses();

  // use this hook to get initialized through the plugin in charge of loading the model
  window.onWapamaResourcesLoaded();

}

/**
   @namespace Global Wapama name space
   @name WAPAMA
*/
if(!WAPAMA) {var WAPAMA= {};}
if(!WAPAMA.I18N) WAPAMA.I18N = {};
if(!WAPAMA.I18N.Status) {
    WAPAMA.I18N.Status = {};
    WAPAMA.I18N.Status.idle = "Idle";
    WAPAMA.I18N.Status.busy = "Busy";
}
/**
 * The Editor class.
 * @class WAPAMA.Editor
 * @extends Clazz
 * @param {Object} config An editor object, passed to {@link WAPAMA.Editor#loadSerialized}
 * @param {String} config.id Any ID that can be used inside the editor. If fullscreen=false, any HTML node with this id must be present to render the editor to this node.
 * @param {boolean} [config.fullscreen=true] Render editor in fullscreen mode or not.
 * @param {String} config.stencilset.url Stencil set URL.
 * @param {String} [config.stencil.id] Stencil type used for creating the canvas.  
 * @param {Object} config.properties Any properties applied to the canvas.
*/
WAPAMA.Editor = {
  /** @lends WAPAMA.Editor.prototype */
  // Defines the global dom event listener 
  DOMEventListeners: new Hash(),

  // Defines the selection
  selection: [],
  
  // Defines the current zoom level
  zoomLevel:1.0,

  // If the editor is under operating like save/deploy/undeploy/initiate/retire/unretire, the status is WAPAMA.I18N.Status.busy;
  // Otherwise the status is WAPAMA.I18N.Status.idle.
  status: WAPAMA.I18N.Status.idle,
  uploading: false,

  construct: function(config) {
  

    // initialization.
    this._eventsQueue   = [];
    this.loadedPlugins  = [];
    this.pluginsData  = [];
    this.userInputs = {};
    //User permissions
    this.permissions = {"create": false, "update": false};
    //meta data about the model for the signavio warehouse
    //directory, new, name, description, revision, model (the model data)

    this.modelMetaData = config;
    
    var model = config;
    if(config.model) {
      model = config.model;
    }
    
    this.id = model.resourceId;
    /*
    if(!this.id) {
      this.id = model.id;
      if(!this.id) {
        this.id = WAPAMA.Editor.provideId();
      }
    }
    */
        
        // Defines if the editor should be fullscreen or not
    this.fullscreen = model.fullscreen || true;
    
    // Initialize the eventlistener
    this._initEventListener();

    // Load particular stencilset
    if(WAPAMA.CONFIG.BACKEND_SWITCH) {
      var ssUrl = (model.stencilset.namespace||model.stencilset.url).replace("#", "%23");
      WAPAMA.Core.StencilSet.loadStencilSet(this, WAPAMA.CONFIG.STENCILSET_HANDLER + ssUrl, this.id);
    } else {
      var ssUrl = model.stencilset.url;
      WAPAMA.Core.StencilSet.loadStencilSet(this, ssUrl, this.id);
    }

    // Register the callback of creating the canvas
    this.registerOnEvent(WAPAMA.CONFIG.EVENT_SS_LOADED_ON_STARTUP, this._stencilSetLoadFinished.bind(this));

    // disable key events when Ext modal window is active
    //WAPAMA.UI.makeExtModalWindowKeysave(this._getPluginFacade());
  },
  
  _initEventListener: function(){

    // Register on Events
    
    document.documentElement.addEventListener(WAPAMA.CONFIG.EVENT_KEYDOWN, this.catchKeyDownEvents.bind(this), true);
    document.documentElement.addEventListener(WAPAMA.CONFIG.EVENT_KEYUP, this.catchKeyUpEvents.bind(this), true);

    // Enable Key up and down Event
    this._keydownEnabled =  true;
    this._keyupEnabled =    true;

    this.DOMEventListeners[WAPAMA.CONFIG.EVENT_MOUSEDOWN] = [];
    this.DOMEventListeners[WAPAMA.CONFIG.EVENT_MOUSEUP]   = [];
    this.DOMEventListeners[WAPAMA.CONFIG.EVENT_MOUSEOVER] = [];
    this.DOMEventListeners[WAPAMA.CONFIG.EVENT_MOUSEOUT]  = [];
    this.DOMEventListeners[WAPAMA.CONFIG.EVENT_SELECTION_CHANGED] = [];
    this.DOMEventListeners[WAPAMA.CONFIG.EVENT_MOUSEMOVE] = [];
        
  },
  
  getAvailablePlugins: function(){
    var curAvailablePlugins=WAPAMA.availablePlugins.clone();
    curAvailablePlugins.each(function(plugin){
      if(this.loadedPlugins.find(function(loadedPlugin){
        return loadedPlugin.type==this.name;
      }.bind(plugin))){
        plugin.engaged=true;
      }else{
        plugin.engaged=false;
      }
      }.bind(this));
    return curAvailablePlugins;
  },

  /**
   *  Laden der Plugins
   */
  loadPlugins: function() {
    try {
    
    var me = this;
    var newPlugins = [];

    var loadedStencilSetsNamespaces = this.getStencilSets().keys();

    // Available Plugins will be initalize
    var facade = this._getPluginFacade();
    WAPAMA.HOOK = {};
    WAPAMA.HOOK.modelJSON = modelJSON;
    WAPAMA.HOOK.facade = facade;
      
    // If there is an Array where all plugins are described, than only take those
    // (that comes from the usage of wapama with a mashup api)
    if( WAPAMA.MashupAPI && WAPAMA.MashupAPI.loadablePlugins && WAPAMA.MashupAPI.loadablePlugins instanceof Array ){
        // Get the plugins from the available plugins (those who are in the plugins.xml)
        WAPAMA.availablePlugins = $A(WAPAMA.availablePlugins).findAll(function(value){
          return WAPAMA.MashupAPI.loadablePlugins.include( value.name )
        });

        // Add those plugins to the list, which are only in the loadablePlugins list
        WAPAMA.MashupAPI.loadablePlugins.each(function( className ){
          if( !(WAPAMA.availablePlugins.find(function(val){ return val.name == className }))){
            WAPAMA.availablePlugins.push( {name: className } );
          }
        });
    }

    WAPAMA.availablePlugins.each(function(value) {
      WAPAMA.Log.debug("Initializing plugin '" + value.name + "'");
        if( (!value.requires  || !value.requires.namespaces   || value.requires.namespaces.any(function(req){ return loadedStencilSetsNamespaces.indexOf(req) >= 0 }) ) &&
          (!value.notUsesIn   || !value.notUsesIn.namespaces  || !value.notUsesIn.namespaces.any(function(req){ return loadedStencilSetsNamespaces.indexOf(req) >= 0 }) )&&
          /*only load activated plugins or undefined */
          (value.engaged || (value.engaged===undefined)) ){

            try {
              var className   = eval(value.name);
              if( className ){
                var plugin    = new className(facade, value);
                plugin.type   = value.name;
                newPlugins.push( plugin );
                plugin.engaged=true;
              }
            } catch(e) {
              WAPAMA.Log.warn("Plugin " + value.name + " is not available");
            }
              
      } else {
        WAPAMA.Log.info("Plugin need a stencilset which is not loaded'", value.name);
      }
      
    });

    newPlugins.each(function(value) {
            try {
                // If there is an GUI-Plugin, they get all Plugins-Offer-Meta-Data
          if(value.registryChanged){
            value.registryChanged(me.pluginsData);
          }

                // If there have an onSelection-Method it will pushed to the Editor Event-Handler
                if(value.onSelectionChanged)
                    me.registerOnEvent(WAPAMA.CONFIG.EVENT_SELECTION_CHANGED, value.onSelectionChanged.bind(value));
            } catch (e) {
                WAPAMA.Log.warn(e);
            }
        });

    this.loadedPlugins = newPlugins;

    // Hack for the Scrollbars
    if(WAPAMA.UI.isMac()) {
      WAPAMA.Editor.resizeFix();
    }
    
    this.registerPluginsOnKeyEvents();
    
    this.setSelection();
    }
    catch (error)
    {
        WAPAMA.Log.warn(error.message);
    }
    
  },
  /**
   * Callback when stencil set loading finished
   * @param {Event} [event] The event detail
   * @param {Object] [uiObj] The context object
   */
  _stencilSetLoadFinished : function(event, uiObj) {
    this._createCanvas(uiObj.canvasConfig, uiObj.stencilType);
    WAPAMA.UI.main.generateGUI(this);

    // LOAD the plugins
    this.loadPlugins();
    
    //this.registerImportJSONTrigger();

    // LOAD the content of the current editor instance
    this.modelMetaData.contentLoadedCallback(function(model) {
      if (model != null) {
        //To load the model from the josn 
        var currentObj = this;
        setTimeout(function(){
          currentObj.loadSerialized(model);
          currentObj.getCanvas().update();
        }, 1);
      }
      
    }.bind(this));
    wapamaEditor = this;
    removeLoading($j('#webBasedEditor'));

    if(WAPAMA.CONFIG.PERMISSION_TYPE <= 2 )
      $j('.WAPAMA_Editor').find('#wapama_canvas_htmlContainer').children().remove();
    WAPAMA.UI.main.finishedLoading(this);
  },
  /**
   * Creates the Canvas
   * @param {Event} [event] The event detail
   * @param {String} [stencilType] The stencil type used for creating the canvas. If not given, a stencil with myBeRoot = true from current stencil set is taken.
   * @param {Object} [canvasConfig] Any canvas properties (like language).
   */
  _createCanvas: function(canvasConfig, stencilType) {
    if (stencilType) {
        // Add namespace to stencilType
        if (stencilType.search(/^http/) === -1) {
            stencilType = this.getStencilSets().values()[0].namespace() + stencilType;
        }
    }
    else {
        // Get any root stencil type
        stencilType = this.getStencilSets().values()[0].findRootStencilName();
    }
        
    // get the stencil associated with the type
    var canvasStencil = WAPAMA.Core.StencilSet.stencil(stencilType);
    if (!canvasStencil) 
      WAPAMA.Log.fatal("Initialisation failed, because the stencil with the type " + stencilType + " is not part of one of the loaded stencil sets.");
    
    // create all dom
    // TODO fix border, so the visible canvas has a double border and some spacing to the scrollbars
    var div = WAPAMA.Editor.graft("http://www.w3.org/1999/xhtml", null, ['div']);
    // set class for custom styling
    div.addClassName("WAPAMA_Editor");

    var screenWidth = parseInt(window.screen.availWidth) - 247 , screenHeight = parseInt(window.screen.availHeight) - 171;
    // create the canvas
    this._canvas = new WAPAMA.Core.Canvas({
      width         : WAPAMA.CONFIG.CANVAS_WIDTH > screenWidth ? WAPAMA.CONFIG.CANVAS_WIDTH : screenWidth,
      height          : WAPAMA.CONFIG.CANVAS_HEIGHT > screenHeight ? WAPAMA.CONFIG.CANVAS_HEIGHT : screenHeight,
      'eventHandlerCallback'  : this.handleEvents.bind(this),
      id            : this.id,
      parentNode        : div
    }, canvasStencil);
        
    if (canvasConfig) {
      // Migrate canvasConfig to an RDF-like structure
      //FIXME this isn't nice at all because we don't want rdf any longer
      var properties = [];
      for(field in canvasConfig){
        properties.push({
          prefix: 'wapama',
          name: field,
          value: canvasConfig[field]
        });
      }
        
      this._canvas.deserialize(properties);
    }
  },
  /**
   * Returns a per-editor singleton plugin facade.
   * To be used in plugin initialization.
   */
  _getPluginFacade: function() {

      // if there is no pluginfacade already created:

      //this._pluginFacade = undefined;
      // create it.
      this._pluginFacade = {

        getAvailablePlugins:  this.getAvailablePlugins.bind(this),
        offer:                this.offer.bind(this),
        getStencilSets:       this.getStencilSets.bind(this),
        getRules:             this.getRules.bind(this),
        loadStencilSet:       this.loadStencilSet.bind(this),
        createShape:          this.createShape.bind(this),
        deleteShape:          this.deleteShape.bind(this),
        getSelection:         this.getSelection.bind(this),
        setSelection:         this.setSelection.bind(this),
        updateSelection:      this.updateSelection.bind(this),
        getCanvas:            this.getCanvas.bind(this),
        importJSON:           this.importJSON.bind(this),
        getJSON:              this.getJSON.bind(this),
        getSerializedJSON:    this.getSerializedJSON.bind(this),
        
        executeCommands:      this.executeCommands.bind(this),
        
        registerOnEvent:      this.registerOnEvent.bind(this),
        unregisterOnEvent:    this.unregisterOnEvent.bind(this),
        raiseEvent:           this.handleEvents.bind(this),
        enableEvent:          this.enableEvent.bind(this),
        disableEvent:         this.disableEvent.bind(this),
        
        eventCoordinates:     this.eventCoordinates.bind(this),
        //addToRegion:        WAPAMA.UI.main.addToRegion.bind(this),
        
        getModelMetaData:     this.getModelMetaData.bind(this),
        updateUserInputs:     this.updateUserInputs.bind(this),
        getUserInputs:        this.getUserInputs.bind(this),
        isBusy:               this.isBusy.bind(this),
        setStatus:            this.setStatus.bind(this),
        isUploading:          this.isUploading.bind(this),
        getPlugin:            this.getPlugin.bind(this),
        cleanup:              this.cleanup.bind(this),
        setUserPermissions:   this.setUserPermissions.bind(this),
        getUserPermissions:   this.getUserPermissions.bind(this)
      };

    // return it.
    return this._pluginFacade;
  },
  
  /**
   * Get plugin object by plugin name.
   */
  getPlugin: function(pluginName) {
      var loadedPlugins = this.loadedPlugins;
      return loadedPlugins.find(function(plugin) {
          if (plugin.type == pluginName) {
              return true;
          } else {
              return false;
          }
      });
  },
  
  /**
     * Get user permissions.
     */
  getUserPermissions: function(type) {
    if (type) {
        return this.permissions[type];
    }
    return this.permissions;
  },
  
  /**
   * Set user permissions.
   */
  setUserPermissions: function(permissions) {
      var createPermission = permissions["create"];
      if (createPermission !== undefined) {
          this.permissions["create"] = createPermission;
      }
      var updatePermission = permissions["update"];
      if (updatePermission) {
          this.permissions["update"] = updatePermission;
      }
  },
  
  /**
   * Clean diagram after save.
   */
  cleanup: function() {
      this.cleanDeletedShapes();
  },
  
  /**
   * Clean those deleted shapes to ensure not affected by undo/redo operations.
   */
  cleanDeletedShapes: function() {
      this.getPlugin("WAPAMA.Plugins.Undo").cleanDeletedShapes();
  },
  
  updateUserInputs: function(recordShapeUUID) {
      var userInputs = this.userInputs;
      var inputObject = WAPAMA.UI.genUserInputObject(recordShapeUUID);
      userInputs[inputObject.id] = inputObject.object;
  },
  
  getUserInputs: function(recordShapeUUID) {
      if (recordShapeUUID) {
          return this.userInputs[recordShapeUUID];
      }
      return this.userInputs;
  },
  
  /**
   * Tests if the status of editor is busy.
   * @return True if the status is busy.
   */
  isBusy: function() {
      return this.status === WAPAMA.I18N.Status.busy;
  },
  
  isUploading: function() {
    return this.uploading;
  },

  /**
   * Sets the status of editor.
   * If the editor is under operating like save/deploy/undeploy/initiate/retire/unretire, the status is WAPAMA.I18N.Status.busy;
   * Otherwise the status is WAPAMA.I18N.Status.idle.
   * @param status   editor status to set
   */
  setStatus: function(status) {
      this.status = status;
  },

  /**
   * Implementes the command pattern
   * (The real usage of the command pattern
   * is implemented and shown in the Plugins/undo.js)
   *
   * @param <Wapama.Core.Command>[] Array of commands
   */
  executeCommands: function(commands){
    
    // Check if the argument is an array and the elements are from command-class
    if (  commands instanceof Array   && 
        commands.length > 0     && 
        commands.all(function(command){ return command instanceof WAPAMA.Core.Command }) ) {
    
      // Raise event for executing commands
      this.handleEvents({
        type    : WAPAMA.CONFIG.EVENT_EXECUTE_COMMANDS,
        commands  : commands
      });
      
      // Execute every command
      commands.each(function(command){
        command.execute();
      })
      
    }
  },
  
  /**
   * Returns JSON of underlying canvas (calls WAPAMA.Canvas#toJSON()).
   * @return {Object} Returns JSON representation as JSON object.
   */
  getJSON: function(){
      var canvas = this.getCanvas().toJSON();
      canvas.ssextensions = this.getStencilSets().values()[0].extensions().keys();
      return canvas;
  },
    
  /**
   * Serializes a call to toJSON().
   * @return {String} Returns JSON representation as string.
   */
  getSerializedJSON: function(){
      return WAPAMA.UI.encode(this.getJSON());
  },
    
  /**
  * Imports shapes in JSON as expected by {@link WAPAMA.Editor#loadSerialized}
  * @param {Object|String} jsonObject The (serialized) json object to be imported
  */
  importJSON: function(jsonObject) {
    var command = new WAPAMA.Plugins.ImportJSONCommand(jsonObject, this.createShapesFromImportedJSON.bind(this), this._getPluginFacade());
    this._getPluginFacade().executeCommands([command]);      
  },
    
  createShapesFromImportedJSON: function(jsonObject) {
    var canvas = this.getCanvas();
    var shapes = canvas.addShapeObjects(jsonObject, this.handleEvents.bind(this));
    canvas.updateSize();
    
    return shapes;
  },
  
  registerImportJSONTrigger: function() {
    if (WAPAMA.PANE.Designer.obj.find('#wapama-import-json-container').length == 0) {
      var dropContainer = top.$('<span class="dropzone-container" id="wapama-import-json-container" style="display:none;"></span>');
      WAPAMA.PANE.Designer.obj.append(dropContainer);
      dropContainer.append("<input id='import-json' name='qqfile' type='file' accept='application/json' />");
    }
    var self = this;
    top.require(['/resources/js/record-form-widgets', 'domReady!'], function() {
      var fileInput = top.$('#wapama-import-json-container').droppedfileupload({
        maxNumberOfFiles : 1,
        maxFileSize : top.$.Intalio.User.maxAttachmentSize,
        acceptFileTypes : /(\.|\/)(json)$/i,
        dataType : 'json',
        type : 'POST',
        url : '/diagramdesigner/diagram/import',
        namespace: 'diagramdesigner'
      });
      
      fileInput.droppedfileupload({
        add : function(e, data) {
          if (data.files.length > 0) {
            var fileName = data.files[0].name;
            var postfix = fileName.substring(fileName.length - 5, fileName.length);
            top.$.Intalio.UI.addLoadingIndicator(WAPAMA.PANE.Designer.obj);
            if (postfix == '.JSON' || postfix == '.json') {
              data.formData = {'shape_type_ids' : JSON.stringify(gShapeTypeNamesMap)};
              data.submit();
              self.uploading = true;
            } else {
              top.$.Intalio.UI.error("Please select a json file.");
            }
          }
        },
        submit : function(e, data) {
        },
        progress : function(e, data) {
        },
        done : function(e, data) {
          var result = data.result;
          top.$.Intalio.UI.removeLoadingIndicator(WAPAMA.PANE.Designer.obj);      
          if (result.result == false) {
            var errors = result.errors;
            jQuery(errors).each(function(){
              var type = this.type;
              var objects = this.objects;
              if (type === 'INVALID_JSON') {
                top.$.Intalio.UI.error('Import aborted, invalid JSON format.');
              } else if (type === 'OBJECT_NOT_EXIST') {
                if (objects) {
                  jQuery(objects).each(function(){
                    top.$.Intalio.UI.error('Import aborted, can not find object {0}.', this);
                  });
                }
              } else if (type === 'NOT_SUPPORT') {
                if (objects) {
                  jQuery(objects).each(function(){
                    top.$.Intalio.UI.error('Import aborted, {0} is not supported in this diagram.', this);
                  });
                }
              } else if (type === 'NO_FILE'){
                top.$.Intalio.UI.error("Please choose one JSON file.");
              } else {
                top.$.Intalio.UI.error("Failed to parse JSON file.");
              }
            });
          } else {
            self.importJSON(WAPAMA.UI.decode(JSON.stringify(result.json)));
            WAPAMA.UI.showNotification("Imported successfully.", false);
          }
          self.uploading = false;
        },
        fail : function(e, data) {
          WAPAMA.UI.showNotificationWithDetail("Failed to import shapes.", data.jqXHR.responseText);
          self.uploading = false;
        }
      });
    });
  },
    
  /**
   * This method renew all resource Ids and according references.
   * Warning: The implementation performs a substitution on the serialized object for
   * easier implementation. This results in a low performance which is acceptable if this
   * is only used when importing models.
   * @param {Object|String} jsonObject
   * @throws {SyntaxError} If the serialized json object contains syntax errors.
   * @return {Object} The jsonObject with renewed ids.
   * @private
   */
  renewResourceIds: function(jsonObject){
      // For renewing resource ids, a serialized and object version is needed
      if(typeof jsonObject == "string"){
          try {
              var serJsonObject = jsonObject;
              jsonObject = WAPAMA.UI.decode(jsonObject);
          } catch(error){
              throw new SyntaxError(error.message);
          }
      } else {
          var serJsonObject = WAPAMA.UI.encode(jsonObject);
      }        
      
      // collect all resourceIds recursively
      var collectResourceIds = function(shapes){
          if(!shapes) return [];
          
          return shapes.map(function(shape){
              return collectResourceIds(shape.childShapes).concat(shape.resourceId);
          }).flatten();
      }
      var resourceIds = collectResourceIds(jsonObject.childShapes);
      
      // Replace each resource id by a new one
      resourceIds.each(function(oldResourceId){
          var newResourceId = WAPAMA.Editor.provideId();
          serJsonObject = serJsonObject.gsub('"'+oldResourceId+'"', '"'+newResourceId+'"')
      });
      
      return WAPAMA.UI.decode(serJsonObject);
  },

  /**
   * This method renew all targetRecord Ids and according references.
   * @see renewResourceIds()
   * @param {Object|String} jsonObject
   * @throws {SyntaxError} If the serialized json object contains syntax errors.
   * @return {Object} The jsonObject with renewed ids.
   * @private
   */
  renewTargetRecords: function(jsonObject){
      // For renewing resource ids, a serialized and object version is needed
      if(typeof jsonObject == "string"){
          try {
              var serJsonObject = jsonObject;
              jsonObject = WAPAMA.UI.decode(jsonObject);
          } catch(error){
              throw new SyntaxError(error.message);
          }
      } else {
          var serJsonObject = WAPAMA.UI.encode(jsonObject);
      }

      // collect all targetRecords recursively
      var collectTargetRecords = function(shapes){
          if(!shapes) return [];

          return shapes.map(function(shape){
              return collectTargetRecords(shape.childShapes).concat(shape.targetRecord);
          }).flatten();
      }
      var targetRecords = collectTargetRecords(jsonObject.childShapes);

      // Replace each resource id by a new one
      targetRecords.each(function(oldTargetRecord){
          var newTargetRecord = WAPAMA.Editor.provideId();
          serJsonObject = serJsonObject.gsub('"'+oldTargetRecord+'"', '"'+newTargetRecord+'"')
      });

      return WAPAMA.UI.decode(serJsonObject);
  },

  /**
   * Loads serialized model to the wapama.
   * @example
   * editor.loadSerialized({
   *    resourceId: "mymodel1",
   *    childShapes: [
   *       {
   *          stencil:{ id:"Subprocess" },
   *          outgoing:[{resourceId: 'aShape'}],
   *          target: {resourceId: 'aShape'},
   *          bounds:{ lowerRight:{ y:510, x:633 }, upperLeft:{ y:146, x:210 } },
   *          resourceId: "myshape1",
   *          childShapes:[],
   *          properties:{},
   *       }
   *    ],
   *    properties:{
   *       language: "English"
   *    },
   *    stencilset:{
   *       url:"http://localhost:8080/wapama/stencilsets/bpmn1.1/bpmn1.1.json"
   *    },
   *    stencil:{
   *       id:"BPMNDiagram"
   *    }
   * });
   * @param {Object} model Description of the model to load.
   * @param {Array} [model.ssextensions] List of stenctil set extensions.
   * @param {String} model.stencilset.url
   * @param {String} model.stencil.id 
   * @param {Array} model.childShapes
   * @param {Array} [model.properties]
   * @param {String} model.resourceId
   * @return {WAPAMA.Core.Shape[]} List of created shapes
   * @methodOf WAPAMA.Editor.prototype
   */
  loadSerialized: function( model ){
      var canvas  = this.getCanvas();
      

      // Bugfix (cf. http://code.google.com/p/wapama-editor/issues/detail?id=240)
      // Deserialize the canvas' stencil set extensions properties first!
      var shapes = this.getCanvas().addShapeObjects(model.childShapes, this.handleEvents.bind(this));
      
      if(model.properties) {
          if (/pipe/.test(WAPAMA.PROFILE)) {
              var userInputsStr = model.properties["io_user_inputs"];
              var userInputsArr;
              var userInputs = {};
              if (userInputsStr) {
                  try {
                      userInputsArr = eval("(" + userInputsStr + ")");
                  } catch (e) {}
                  for (var i = 0;i < userInputsArr.length; i++) {
                      var userInput = userInputsArr[i];
                      userInputs[userInput.uuid] = userInput;
                  }
                  this.userInputs = userInputs;
              }
          }
        for(key in model.properties) {
          var prop = model.properties[key];
          //In jquery platform, no need to convert property.
          /*
          if (!(typeof prop === "string")) {
            prop = WAPAMA.UI.encode(prop);
          }*/
          
          //remove prefix in jquery platform.
            //this.getCanvas().setProperty("wapama-" + key, prop);
            this.getCanvas().setProperty(key, prop);
          }
      }

      this.getCanvas().updateSize();
      return shapes;
  },

  disableEvent: function(eventType){
    if(eventType == WAPAMA.CONFIG.EVENT_KEYDOWN) {
      this._keydownEnabled = false;
    }
    if(eventType == WAPAMA.CONFIG.EVENT_KEYUP) {
      this._keyupEnabled = false;
    }
    if(this.DOMEventListeners.keys().member(eventType)) {
      var value = this.DOMEventListeners.remove(eventType);
      this.DOMEventListeners['disable_' + eventType] = value;
    }
  },

  enableEvent: function(eventType){
    if(eventType == WAPAMA.CONFIG.EVENT_KEYDOWN) {
      this._keydownEnabled = true;
    }
    
    if(eventType == WAPAMA.CONFIG.EVENT_KEYUP) {
      this._keyupEnabled = true;
    }
    
    if(this.DOMEventListeners.keys().member("disable_" + eventType)) {
      var value = this.DOMEventListeners.remove("disable_" + eventType);
      this.DOMEventListeners[eventType] = value;
    }
  },

  /**
   *  Methods for the PluginFacade
   */
  registerOnEvent: function(eventType, callback) {
    if(!(this.DOMEventListeners.keys().member(eventType))) {
      this.DOMEventListeners[eventType] = [];
    }
    this.DOMEventListeners[eventType].push(callback);
  },

  unregisterOnEvent: function(eventType, callback) {
    if(this.DOMEventListeners.keys().member(eventType)) {
      this.DOMEventListeners[eventType] = this.DOMEventListeners[eventType].without(callback);
    } else {
      // Event is not supported
      // TODO: Error Handling
    }
  },

  getSelection: function() {
    return this.selection;
  },

  getStencilSets: function() { 
    return WAPAMA.Core.StencilSet.stencilSets(this.id); 
  },
  
  getRules: function() {
    return WAPAMA.Core.StencilSet.rules(this.id);
  },
  
  loadStencilSet: function(source) {
    try {
      WAPAMA.Core.StencilSet.loadStencilSet(this, source, this.id);
      this.handleEvents({type:WAPAMA.CONFIG.EVENT_STENCIL_SET_LOADED});
    } catch (e) {
      WAPAMA.Log.warn("Requesting stencil set file failed.", e);
    }
  },

  offer: function(pluginData) {
    if(!this.pluginsData.member(pluginData)){
      this.pluginsData.push(pluginData);
    }
  },
  
  /**
   * It creates an new event or adds the callback, if already existing,
   * for the key combination that the plugin passes in keyCodes attribute
   * of the offer method.
   * 
   * The new key down event fits the schema:
   *    key.event[.metactrl][.alt][.shift].'thekeyCode'
   */
  registerPluginsOnKeyEvents: function() {
    this.pluginsData.each(function(pluginData) {
      
      if(pluginData.keyCodes) {
        
        pluginData.keyCodes.each(function(keyComb) {
          var eventName = "key.event";
          
          /* Include key action */
          eventName += '.' + keyComb.keyAction;
          
          if(keyComb.metaKeys) {
            /* Register on ctrl or apple meta key as meta key */
            if(keyComb.metaKeys.
              indexOf(WAPAMA.CONFIG.META_KEY_META_CTRL) > -1) {
                eventName += "." + WAPAMA.CONFIG.META_KEY_META_CTRL;
            }
              
            /* Register on alt key as meta key */
            if(keyComb.metaKeys.
              indexOf(WAPAMA.CONFIG.META_KEY_ALT) > -1) {
                eventName += '.' + WAPAMA.CONFIG.META_KEY_ALT;
            }
            
            /* Register on shift key as meta key */
            if(keyComb.metaKeys.
              indexOf(WAPAMA.CONFIG.META_KEY_SHIFT) > -1) {
                eventName += '.' + WAPAMA.CONFIG.META_KEY_SHIFT;
            }   
          }
          
          /* Register on the actual key */
          if(keyComb.keyCode) {
            eventName += '.' + keyComb.keyCode;
          }
          
          /* Register the event */
          WAPAMA.Log.debug("Register Plugin on Key Event:", eventName);
          this.registerOnEvent(eventName,pluginData.functionality);
        
        }.bind(this));
      }
    }.bind(this));
  },

  setSelection: function(elements, subSelectionElement, force, from) {
    if (!elements) { elements = [] }
    elements = elements.compact().findAll(function(n){ return n instanceof WAPAMA.Core.Shape });
    
    if (elements.first() instanceof WAPAMA.Core.Canvas) {
      elements = [];
    }
    
    if (!force && elements.length === this.selection.length && this.selection.all(function(r){ return elements.include(r) })){
        if(WAPAMA.HOOK) {
            //If the selection has not changed, will activate rename feature.
            WAPAMA.HOOK.notChanged = true;
        }
      return;
    }
    this.selection = elements;
    this._subSelection = subSelectionElement;
    
    selectedShape = elements.first();
    //shapeChanged();
    WAPAMA.HOOK.notChanged = false;
    // BUG-UI-003303 Property pane is always stuck when we drag a shape to canvas
    // When drop a new shape, this function will be triggered twice by "createShape" and "updateSelection"
    // Prevent the twice trigger if the invoking is from create
    if (from === 'fromCreate') {
      return;
    }
    this.handleEvents({type:WAPAMA.CONFIG.EVENT_SELECTION_CHANGED, elements:elements, subSelection: subSelectionElement})
  },
  
  updateSelection: function(from) {
    this.setSelection(this.selection, this._subSelection, true, from);
    /*var s = this.selection;
    this.setSelection();
    this.setSelection(s);*/
  },

  getCanvas: function() {
    return this._canvas;
  },
  

  /**
  * option = {
  *   type: string,
  *   position: {x:int, y:int},
  *   connectingType: uiObj-Class
  *   connectedShape: uiObj
  *   draggin: bool
  *   namespace: url
  *       parent: WAPAMA.Core.AbstractShape
  *   template: a template shape that the newly created inherits properties from.
  *   }
  */
  createShape: function(option) {
    //console.log("createShape");
    if(option && option.serialize && option.serialize instanceof Array){
    
      var type = option.serialize.find(function(obj){return (obj.prefix+"-"+obj.name) == "wapama-type"});
      var stencil = WAPAMA.Core.StencilSet.stencil(type.value);

      if(stencil.type() == 'node'){
        var newShapeObject = new WAPAMA.Core.Node({'eventHandlerCallback':this.handleEvents.bind(this)}, stencil);  
      } else {
        var newShapeObject = new WAPAMA.Core.Edge({'eventHandlerCallback':this.handleEvents.bind(this)}, stencil);  
      }
    
      this.getCanvas().add(newShapeObject);
      newShapeObject.deserialize(option.serialize);
    
      return newShapeObject;
    }

    // If there is no argument, throw an exception
    if(!option || !option.type || !option.namespace) { throw "To create a new shape you have to give an argument with type and namespace";}
    
    var canvas = this.getCanvas();
    var newShapeObject;

    // Get the shape type
    var shapetype = option.type;

    // Get the stencil set
    var sset = WAPAMA.Core.StencilSet.stencilSet(option.namespace);
    var sset12 = WAPAMA.Core.StencilSet.stencilSet("io_#");
    var facadeStencilSets = WAPAMA.Core.StencilSet._stencilSetsByNamespace;
      var facadeStencilSet = null;
    var facadeKey = null;
    for(var k in facadeStencilSets) {
      facadeKey = k;
      facadeStencilSet = facadeStencilSets[k];
      break;
    }

    var stencil1 = facadeStencilSet._availableStencils['io_#'+ shapetype.split('#')[1]];
    sset = stencil1._jsonStencil;

    // Create an New Shape, dependents on an Edge or a Node
    
    if(sset.type == "node") {
      newShapeObject = new WAPAMA.Core.Node({'eventHandlerCallback':this.handleEvents.bind(this)}, stencil1);
    } else {
      newShapeObject = new WAPAMA.Core.Edge({'eventHandlerCallback':this.handleEvents.bind(this)}, stencil1)
    }
    
    // when there is a template, inherit the properties.
    if(option.template) {

      newShapeObject._jsonStencil.properties = option.template._jsonStencil.properties;
      newShapeObject.postProcessProperties();
    }

    // Add to the canvas
    if(option.parent && newShapeObject instanceof WAPAMA.Core.Node) {
      // make the raw SVG of the node invisible before it's updated
      // to avoid the abnormal display when drag a shape into the canvas in Firefox
      newShapeObject.setVisible(false);
      option.parent.add(newShapeObject);
    } else {
      canvas.add(newShapeObject);
    }

    // Set the position
    var point = option.position ? option.position : {x:100, y:200};
  
    
    var con;
    // If there is create a shape and in the argument there is given an ConnectingType and is instance of an edge
    if(option.connectingType && option.connectedShape && !(newShapeObject instanceof WAPAMA.Core.Edge)) {

      // there will be create a new Edge
      con = new WAPAMA.Core.Edge({'eventHandlerCallback':this.handleEvents.bind(this)}, sset12.stencil(option.connectingType));
      
      // And both endings dockers will be referenced to the both shapes
      con.dockers.first().setDockedShape(option.connectedShape);
      
      var magnet = option.connectedShape.getDefaultMagnet()
      var cPoint = magnet ? magnet.bounds.center() : option.connectedShape.bounds.midPoint();
      con.dockers.first().setReferencePoint( cPoint );
      con.dockers.last().setDockedShape(newShapeObject);
      con.dockers.last().setReferencePoint(newShapeObject.getDefaultMagnet().bounds.center());    
      
      // The Edge will be added to the canvas and be updated
      canvas.add(con);  
      //con.update();
      
    } 
    
    // Move the new Shape to the position
    if(newShapeObject instanceof WAPAMA.Core.Edge && option.connectedShape) {

      newShapeObject.dockers.first().setDockedShape(option.connectedShape);
      
      if( option.connectedShape instanceof WAPAMA.Core.Node ){
        newShapeObject.dockers.first().setReferencePoint(option.connectedShape.getDefaultMagnet().bounds.center());         
        newShapeObject.dockers.last().bounds.centerMoveTo(point);     
      } else {
        newShapeObject.dockers.first().setReferencePoint(option.connectedShape.bounds.midPoint());                
      }

    } else {
      var b = newShapeObject.bounds
      if( newShapeObject instanceof WAPAMA.Core.Node && newShapeObject.dockers.length == 1){
        b = newShapeObject.dockers.first().bounds
      }
      
      b.centerMoveTo(point);
      
      var upL = b.upperLeft();
      b.moveBy( -Math.min(upL.x, 0) , -Math.min(upL.y, 0) )
      
      var lwR = b.lowerRight();
      b.moveBy( -Math.max(lwR.x-canvas.bounds.width(), 0) , -Math.max(lwR.y-canvas.bounds.height(), 0) )
    }
    
    // Update the shape
    if (newShapeObject instanceof WAPAMA.Core.Edge) {
      newShapeObject._update(false);
    }
    
    // And refresh the selection
    if(!(newShapeObject instanceof WAPAMA.Core.Edge)) {
      this.setSelection([newShapeObject]);
    }
    
    if(con && con.alignDockers) {
      con.alignDockers();
    } 
    if(newShapeObject.alignDockers) {
      newShapeObject.alignDockers();
    }
    
    newShapeObject.adjustForCollapse();

    return newShapeObject;
  },
  
  deleteShape: function(shape) {
    
    if (!shape || !shape.parent){ return }
    
    //remove shape from parent
    // this also removes it from DOM
    shape.parent.remove(shape);
    
    //delete references to outgoing edges
    shape.getOutgoingShapes().each(function(os) {
      var docker = os.getDockers().first();
      if(docker && docker.getDockedShape() == shape) {
        docker.setDockedShape(undefined);
      }
    });
    
    //delete references to incoming edges
    shape.getIncomingShapes().each(function(is) {
      var docker = is.getDockers().last();
      if(docker && docker.getDockedShape() == shape) {
        docker.setDockedShape(undefined);
      }
    });
    
    //delete references of the shape's dockers
    shape.getDockers().each(function(docker) {
      docker.setDockedShape(undefined);
    });
  },
  
  /**
   * Returns an object with meta data about the model.
   * Like name, description, ...
   * 
   * Empty object with the current backend.
   * 
   * @return {Object} Meta data about the model
   */
  getModelMetaData: function() {
    return this.modelMetaData;
  },

  /* Event-Handler Methods */
  
  /**
  * Helper method to execute an event immediately. The event is not
  * scheduled in the _eventsQueue. Needed to handle Layout-Callbacks.
  */
  _executeEventImmediately: function(eventObj) {
    if(this.DOMEventListeners.keys().member(eventObj.event.type)) {
            try {
                this.DOMEventListeners[eventObj.event.type].each(function(value) {
                    value(eventObj.event, eventObj.arg);
                }.bind(this));
            } catch (e) {
                WAPAMA.Log.debug(e);
            }
    }
  },

  _executeEvents: function() {
    this._queueRunning = true;
    while(this._eventsQueue.length > 0) {
      var val = this._eventsQueue.shift();
      this._executeEventImmediately(val);
    }
    this._queueRunning = false;
  },
  
  /**
   * Leitet die Events an die Editor-Spezifischen Event-Methoden weiter
   * @param {Object} event Event , welches gefeuert wurde
   * @param {Object} uiObj Target-UiObj
   */
  handleEvents: function(event, uiObj) {
    WAPAMA.Log.trace("Dispatching event type " + event.type + " on", uiObj);
    switch(event.type) {
      case WAPAMA.CONFIG.EVENT_MOUSEDOWN:
        if (WAPAMA.UI.isFirefox()) {
          var tempEvent = jQuery.Event(WAPAMA.CONFIG.EVENT_MOUSEDOWN, event);
          // BUG-BPM-003115
          // use preventDefault to fix mouseup in DragDropResize not firing after mousemove
          //event.preventDefault();
          this._handleMouseDown(event, uiObj);
          event = tempEvent;
        } else {
          this._handleMouseDown(event, uiObj);
        }
        break;
      case WAPAMA.CONFIG.EVENT_MOUSEMOVE:
        this._handleMouseMove(event, uiObj);
        break;
      case WAPAMA.CONFIG.EVENT_MOUSEUP:
        this._handleMouseUp(event, uiObj);
        break;
      case WAPAMA.CONFIG.EVENT_MOUSEOVER:
        this._handleMouseHover(event, uiObj);
        break;
      case WAPAMA.CONFIG.EVENT_MOUSEOUT:
        this._handleMouseOut(event, uiObj);
        break;
    }
    /* Force execution if necessary. Used while handle Layout-Callbacks. */
    if(event.forceExecution) {
      this._executeEventImmediately({event: event, arg: uiObj});
    } else {
      this._eventsQueue.push({event: event, arg: uiObj});
    }
    if(!this._queueRunning) {
      this._executeEvents();
    }
    
    // TODO: Make this return whether no listener returned false.
    // So that, when one considers bubbling undesireable, it won't happen.
    return false;
  },

  catchKeyUpEvents: function(event) {
    if(!this._keyupEnabled) {
      return;
    }
    /* assure we have the current event. */
        if (!event) 
            event = window.event;
        
    // Checks if the event comes from some input field
    if ( ["INPUT", "TEXTAREA"].include(event.target.tagName.toUpperCase()) ){
      return;
    }
    
    /* Create key up event type */
    var keyUpEvent = this.createKeyCombEvent(event, WAPAMA.CONFIG.KEY_ACTION_UP);
    
    WAPAMA.Log.debug("Key Event to handle:", keyUpEvent);

    /* forward to dispatching. */
    this.handleEvents({type: keyUpEvent, event:event});
  },
  
  /**
   * Catches all key down events and forward the appropriated event to 
   * dispatching concerning to the pressed keys.
   * 
   * @param {Event} 
   *    The key down event to handle
   */
  catchKeyDownEvents: function(event) {
    if(!this._keydownEnabled) {
      return;
    }
    /* Assure we have the current event. */
        if (!event) 
            event = window.event;
        
    /* Fixed in FF3 */
    // This is a mac-specific fix. The mozilla event object has no knowledge
    // of meta key modifier on osx, however, it is needed for certain
    // shortcuts. This fix adds the metaKey field to the event object, so
    // that all listeners that registered per Wapama plugin facade profit from
    // this. The original bug is filed in
    // https://bugzilla.mozilla.org/show_bug.cgi?id=418334
    //if (this.__currentKey == WAPAMA.CONFIG.KEY_CODE_META) {
    //  event.appleMetaKey = true;
    //}
    //this.__currentKey = pressedKey;
    
    // Checks if the event comes from some input field
    if ( ["INPUT", "TEXTAREA"].include(event.target.tagName.toUpperCase()) ){
      return;
    }
    
    /* Create key up event type */
    var keyDownEvent = this.createKeyCombEvent(event, WAPAMA.CONFIG.KEY_ACTION_DOWN);
    
    WAPAMA.Log.debug("Key Event to handle:", keyDownEvent);
    
    /* Forward to dispatching. */
    this.handleEvents({type: keyDownEvent,event: event});
  },
  
  /**
   * Creates the event type name concerning to the pressed keys.
   * 
   * @param {Event} keyDownEvent
   *    The source keyDownEvent to build up the event name
   */
  createKeyCombEvent: function(keyEvent, keyAction) {

    /* Get the currently pressed key code. */
        var pressedKey = keyEvent.which || keyEvent.keyCode;
    //this.__currentKey = pressedKey;
    
    /* Event name */
    var eventName = "key.event";
    
    /* Key action */
    if(keyAction) {
      eventName += "." + keyAction;
    }
    
    /* Ctrl or apple meta key is pressed */
    if(keyEvent.ctrlKey || keyEvent.metaKey) {
      eventName += "." + WAPAMA.CONFIG.META_KEY_META_CTRL;
    }
    
    /* Alt key is pressed */
    if(keyEvent.altKey) {
      eventName += "." + WAPAMA.CONFIG.META_KEY_ALT;
    }
    
    /* Alt key is pressed */
    if(keyEvent.shiftKey) {
      eventName += "." + WAPAMA.CONFIG.META_KEY_SHIFT;
    }
    
    /* Return the composed event name */
    return  eventName + "." + pressedKey;
  },

  _handleMouseDown: function(event, uiObj) {
    // get canvas.
    var canvas = this.getCanvas();
    // Try to get the focus
    canvas.focus();
  
    // find the shape that is responsible for this element's id.
    var element = event.currentTarget;
    var elementController = uiObj;

    // gather information on selection.
    var currentIsSelectable = (elementController !== null) &&
      (elementController !== undefined) && (elementController.isSelectable);
    var currentIsMovable = (elementController !== null) &&
      (elementController !== undefined) && (elementController.isMovable);
    var modifierKeyPressed = event.shiftKey || event.ctrlKey;
    var noObjectsSelected = this.selection.length === 0;
    var currentIsSelected = this.selection.member(elementController);


    // Rule #1: When there is nothing selected, select the clicked object.
    if(currentIsSelectable && noObjectsSelected) {
      this.setSelection([elementController]);

      WAPAMA.Log.trace("Rule #1 applied for mouse down on", element.id);
      

    // Rule #3: When at least one element is selected, and there is no
    // control key pressed, and the clicked object is not selected, select
    // the clicked object.
    } else if(currentIsSelectable && !noObjectsSelected &&
      !modifierKeyPressed && !currentIsSelected) {
      this.setSelection([elementController]);

      //var objectType = elementController.readAttributes();
      //alert(objectType[0] + ": " + objectType[1]);
      
      WAPAMA.Log.trace("Rule #3 applied for mouse down on", element.id);

    // Rule #4: When the control key is pressed, and the current object is
    // not selected, add it to the selection.
    } else if(currentIsSelectable && modifierKeyPressed
      && !currentIsSelected) {
      var newSelection = this.selection.clone();
      newSelection.push(elementController)
      this.setSelection(newSelection)
      WAPAMA.Log.trace("Rule #4 applied for mouse down on", element.id);

    // Rule #6
    } else if(currentIsSelectable && currentIsSelected &&
      modifierKeyPressed) {
      var newSelection = this.selection.clone();
      this.setSelection(newSelection.without(elementController))
      WAPAMA.Log.trace("Rule #6 applied for mouse down on", elementController.id);

    // Rule #5: When there is at least one object selected and no control
    // key pressed, we're dragging.
    /*} else if(currentIsSelectable && !noObjectsSelected
      && !modifierKeyPressed) {

      if(this.log.isTraceEnabled())
        this.log.trace("Rule #5 applied for mouse down on "+element.id);
  */
    // Rule #2: When clicked on something that is neither
    // selectable nor movable, clear the selection, and return.
    } else if (!currentIsSelectable && !currentIsMovable) {
      this.setSelection([]);
      WAPAMA.Log.trace("Rule #2 applied for mouse down on", element.id);

      return;

    // Rule #7: When the current object is not selectable but movable,
    // it is probably a control. Leave the selection unchanged but set
    // the movedObject to the current one and enable Drag. Dockers will
    // be processed in the dragDocker plugin.
    } else if(!currentIsSelectable && currentIsMovable && !(elementController instanceof WAPAMA.Core.Controls.Docker)) {
      
      // TODO: If there is any moveable elements, do this in a plugin
      //WAPAMA.Core.UIEnableDrag(event, elementController);
      WAPAMA.Log.trace("Rule #7 applied for mouse down on", element.id);
    
    // Rule #8: When the element is selectable and is currently selected and no 
    // modifier key is pressed
    } else if(currentIsSelectable && currentIsSelected &&
      !modifierKeyPressed) {
      this._subSelection = this._subSelection != elementController ? elementController : undefined;
      this.setSelection(this.selection, this._subSelection);
      
      WAPAMA.Log.trace("Rule #8 applied for mouse down on", element.id);
    }
    
    // prevent event from bubbling, return.
    //Event.stop(event);
    return;
  },

  _handleMouseMove: function(event, uiObj) {
    return;
  },

  _handleMouseUp: function(event, uiObj) {
    // get canvas.
    var canvas = this.getCanvas();

    // find the shape that is responsible for this elemement's id.
    var elementController = uiObj;

    //get event position
    var evPos = this.eventCoordinates(event);

    //Event.stop(event);
  },

  _handleMouseHover: function(event, uiObj) {
    return;
  },

  _handleMouseOut: function(event, uiObj) {
    return;
  },

  /**
   * Calculates the event coordinates to SVG document coordinates.
   * @param {Event} event
   * @return {SVGPoint} The event coordinates in the SVG document
   */
  eventCoordinates: function(event) {

    var canvas = this.getCanvas();

    var svgPoint = canvas.node.ownerSVGElement.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;
    var matrix = canvas.node.getScreenCTM();
    return svgPoint.matrixTransform(matrix.inverse());
  }
};
WAPAMA.Editor = Clazz.extend(WAPAMA.Editor);


/**
 * Creates a new WAPAMA.Editor instance by fetching a model from given url and passing it to the constructur
 * @param {String} modelUrl The JSON URL of a model.
 * @param {Object} config Editor config passed to the constructur, merged with the response of the request to modelUrl
 */
WAPAMA.Editor.createByUrl = function(modelUrl, config){
    if(!config) config = {};
    
    new Ajax.Request(modelUrl, {
      method: 'GET',
      onSuccess: function(transport) {
        var editorConfig = WAPAMA.UI.decode(transport.responseText);
        editorConfig = WAPAMA.UI.applyIf(editorConfig, config);
        new WAPAMA.Editor(editorConfig);
      
        if ("function" == typeof(config.onSuccess)) {
        config.onSuccess(transport);
      }
      }.bind(this),
      onFailure: function(transport) {
      if ("function" == typeof(config.onFailure)) {
        config.onFailure(transport);
      }
      }.bind(this)
    });
}

// TODO Implement namespace awareness on attribute level.
/**
 * graft() function
 * Originally by Sean M. Burke from interglacial.com, altered for usage with
 * SVG and namespace (xmlns) support. Be sure you understand xmlns before
 * using this funtion, as it creates all grafted elements in the xmlns
 * provided by you and all element's attribures in default xmlns. If you
 * need to graft elements in a certain xmlns and wish to assign attributes
 * in both that and another xmlns, you will need to do stepwise grafting,
 * adding non-default attributes yourself or you'll have to enhance this
 * function. Latter, I would appreciate: martin?apfelfabrik.de
 * @param {Object} namespace The namespace in which
 *          elements should be grafted.
 * @param {Object} parent The element that should contain the grafted
 *          structure after the function returned.
 * @param {Object} t the crafting structure.
 * @param {Object} doc the document in which grafting is performed.
 */
WAPAMA.Editor.graft = function(namespace, parent, t, doc) {
    doc = (doc || (parent && parent.ownerDocument) || document);
    var e;
    if(t === undefined) {
        throw "Can't graft an undefined value";
    } else if(t.constructor == String) {
        e = doc.createTextNode( t );
    } else {
        for(var i = 0; i < t.length; i++) {
            if( i === 0 && t[i].constructor == String ) {
                var snared;
                snared = t[i].match( /^([a-z][a-z0-9]*)\.([^\s\.]+)$/i );
                if( snared ) {
                    e = doc.createElementNS(namespace, snared[1] );
                    e.setAttributeNS(null, 'class', snared[2] );
                    continue;
                }
                snared = t[i].match( /^([a-z][a-z0-9]*)$/i );
                if( snared ) {
                    e = doc.createElementNS(namespace, snared[1] );  // but no class
                    continue;
                }

                // Otherwise:
                e = doc.createElementNS(namespace, "span" );
                e.setAttribute(null, "class", "namelessFromLOL" );
            }

            if( t[i] === undefined ) {
                throw "Can't graft an undefined value in a list!";
            } else if( t[i].constructor == String || t[i].constructor == Array ) {
                this.graft(namespace, e, t[i], doc );
            } else if(  t[i].constructor == Number ) {
                this.graft(namespace, e, t[i].toString(), doc );
            } else if(  t[i].constructor == Object ) {
                // hash's properties => element's attributes
                for(var k in t[i]) { e.setAttributeNS(null, k, t[i][k] ); }
            } else {

      }
        }
    }
  if(parent) {
      parent.appendChild( e );
  } else {

  }
    return e; // return the topmost created node
};

/**
 * UUID generator
 *
 */
WAPAMA.Editor.provideId = function() {
    // lower cased
  var res = [], hex = '0123456789abcdef';

  for (var i = 0; i < 36; i++) res[i] = Math.floor(Math.random()*0x10);

  res[14] = 4;
  res[19] = (res[19] & 0x3) | 0x8;

  for (var i = 0; i < 36; i++) res[i] = hex[res[i]];

  res[8] = res[13] = res[18] = res[23] = '-';

    // Remove the "_" initialed
    return res.join('');
  //return "_" + res.join('');
};

/**
 * When working with Ext, conditionally the window needs to be resized. To do
 * so, use this class method. Resize is deferred until 100ms, and all subsequent
 * resizeBugFix calls are ignored until the initially requested resize is
 * performed.
 */
WAPAMA.Editor.resizeFix = function() {
  if (!WAPAMA.Editor._resizeFixTimeout) {
    WAPAMA.Editor._resizeFixTimeout = window.setTimeout(function() {
      window.resizeBy(1,1);
      window.resizeBy(-1,-1);
      WAPAMA.Editor._resizefixTimeout = null;
    }, 100); 
  }
};

WAPAMA.Editor.Cookie = {
  
  callbacks:[],
    
  onChange: function( callback, interval ){
  
    this.callbacks.push(callback);
    this.start( interval )
  
  },
  
  start: function( interval ){
    
    if( this.pe ){
      return;
    }
    
    var currentString = document.cookie;
    
    this.pe = new PeriodicalExecuter( function(){
      
      if( currentString != document.cookie ){
        currentString = document.cookie;
        this.callbacks.each(function(callback){ callback(this.getParams()) }.bind(this));
      }
      
    }.bind(this), ( interval || 10000 ) / 1000);  
  },
  
  stop: function(){

    if( this.pe ){
      this.pe.stop();
      this.pe = null;
    }
  },
    
  getParams: function(){
    var res = {};
    
    var p = document.cookie;
    p.split("; ").each(function(param){ res[param.split("=")[0]] = param.split("=")[1];});
    
    return res;
  },  
  
  toString: function(){
    return document.cookie;
  }
};

/**
 * Workaround for SAFARI/Webkit, because
 * when trying to check SVGSVGElement of instanceof there is 
 * raising an error
 * 
 */
WAPAMA.Editor.SVGClassElementsAreAvailable = true;
WAPAMA.Editor.setMissingClasses = function() {
  
  try {
    SVGElement;
  } catch(e) {
    WAPAMA.Editor.SVGClassElementsAreAvailable = false;
    SVGSVGElement     = document.createElementNS('http://www.w3.org/2000/svg', 'svg').toString();
    SVGGElement     = document.createElementNS('http://www.w3.org/2000/svg', 'g').toString();
    SVGPathElement    = document.createElementNS('http://www.w3.org/2000/svg', 'path').toString();
    SVGTextElement    = document.createElementNS('http://www.w3.org/2000/svg', 'text').toString();
    //SVGMarkerElement  = document.createElementNS('http://www.w3.org/2000/svg', 'marker').toString();
    SVGRectElement    = document.createElementNS('http://www.w3.org/2000/svg', 'rect').toString();
    SVGImageElement   = document.createElementNS('http://www.w3.org/2000/svg', 'image').toString();
    SVGCircleElement  = document.createElementNS('http://www.w3.org/2000/svg', 'circle').toString();
    SVGEllipseElement   = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse').toString();
    SVGLineElement    = document.createElementNS('http://www.w3.org/2000/svg', 'line').toString();
    SVGPolylineElement  = document.createElementNS('http://www.w3.org/2000/svg', 'polyline').toString();
    SVGPolygonElement   = document.createElementNS('http://www.w3.org/2000/svg', 'polygon').toString();
    
  }
  
}
WAPAMA.Editor.checkClassType = function( classInst, classType ) {
  
  if( WAPAMA.Editor.SVGClassElementsAreAvailable ){
    return classInst instanceof classType
  } else {
    return classInst == classType
  }
}