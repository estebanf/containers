/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * The General Interface Asynchronous Modular Platform (AMP). Classes in this package are only
 * available to applications that enable the AMP add-in.
 *
 * @since 3.7
 */
jsx3.lang.Package.definePackage("jsx3.amp", function(amp) {

  /** {String} The plug-in definition XML namespace URI. */
  amp.NS = "http://www.generalinterface.org/gi/amp";

  /** @private @jsxobf-clobber */
  amp._NS = {"http://www.tibco.com/gi/amp": true, "http://www.generalinterface.org/gi/amp": true};

  /** @package */
  amp.isNS = function(ns) {
    return amp._NS[ns];
  };

  /** @package */
  amp.getXmlNS = function(x) {
    var o = {};
    o[x.getNamespaceURI()] = "amp";
    return o;
  };

  /** {String} The name of the plug-ins registration file. */
  amp.DESCRIPTOR = "plugins.xml";

  /** {String} The name of a plug-in descriptor file. */
  amp.METAFILE = "plugin.xml";

  /** {String} The path where application plug-ins should reside. */
  amp.DIR = "plugins";

  amp.LOG = jsx3.util.Logger.getLogger("jsx3.amp");

  /** @package @jsxobf-clobber-shared */
  amp._getConstructor = function(objClass) {
    var fct = objClass;

    if (typeof(fct) == "string")
      fct = jsx3.Class.forName(fct) || jsx3.lang.getVar(fct);

    if (fct instanceof jsx3.Class)
      fct = fct.getConstructor();

    if (typeof(fct) != "function")
      fct = null;

    return fct;
  };

  /** @package @jsxobf-clobber-shared */
  amp._getBestLocaleKey = function(strLocales, objLocale) {
    var l = jsx3.$S(strLocales || "").trim();
    if (l.length > 0) {
      var available = jsx3.$A(l.split(/\s/g));
      var path = objLocale.getSearchPath();
      var loc = jsx3.$A(path).find(function(e) { return available.contains(e.toString()); });
      if (loc)
        return loc.toString();
    }

    return "";
  };

});

/**
 * The standard library of AMP application utility classes. Classes in this package are loaded via AMP plug-ins.
 * 
 * @since 3.7
 */
jsx3.lang.Package.definePackage("jsx3.amp.util", function(util) {

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber  _id _expr

/**
 *
 */
jsx3.lang.Class.defineInterface("jsx3.amp.Bindable", null, function(Bindable, Bindable_prototype) {

  /** @private @jsxobf-clobber */
  Bindable_prototype._getBindings = function() {
    if (!this._bindings)
      this._bindings = jsx3.$H();
    return this._bindings;
  };

  /**
   * Adds a bindable property to this object.
   * @param key {String} the property name.
   * @param expression {String} the binding expression.
   */
  Bindable_prototype.addBindableProp = function(key, expression) {
    var b = this._getBindings();
    b[key] = {_id:key, _expr:expression};
  };

  /**
   * Returns the list of bindable properties of this object.
   * @return {jsx3.$Array<String>}
   */
  Bindable_prototype.getBindableProps = function() {
    return this._getBindings().keys();
  };

  /**
   * Causes a bindable property to be updated when <code>publisher</code> publishes an event with subject
   * <code>subject</code>.
   * @param key {String} the property to update.
   * @param publisher {jsx3.util.EventDispatcher} the object to which to subscribe.
   * @param subject {String} the event subject to which to subscribe.
   */
  Bindable_prototype.updateBindableOn = function(key, publisher, subject) {
    publisher.subscribe(subject, jsx3.$F(this.updateBindable).bind(this, [key]));
  };

  /**
   * Causes a bindable property of this object to be recalculated. The property is set to the value of the
   * binding expression, evaluated in the context of this object. If the property value has changed then this
   * object will publish an event with subject <code>key</code>.
   * @param key {String} the property to recalculate.
   */
  Bindable_prototype.updateBindable = function(key) {
    var b = this._getBindings()[key];
    this.setBindableProp(key, this.eval(b._expr));
  };

  /**
   * Sets the current calculated value of a bindable property of this object. If the new value does not match
   * the old value, an event is published. The schema of the event is
   * <code>{subject: propName, oldValue: previousValue, value: newValue}</code>.
   * @param key {String} the property name.
   * @param newValue {Object} the next calculated value.
   */
  Bindable_prototype.setBindableProp = function(key, newValue) {
    var oldValue = this[key];
    if (oldValue !== newValue) {
      this[key] = newValue;
      if (this.publish)
        this.publish({subject:key, oldValue:oldValue, value:newValue});
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
 * An AMP extension.
 */
jsx3.lang.Class.defineClass("jsx3.amp.Ext", null, null, function(Ext, Ext_prototype) {

  var amp = jsx3.amp;
  
  /**
   * @param objPlugIn {jsx3.amp.PlugIn} the plug-in owning the extension.
   * @param objElm {jsx3.xml.Entity} the XML declaration of the extension.
   * @package
   */
  Ext_prototype.init = function(objPlugIn, objElm) {
    this._xml = new amp.XML(objElm);

    /* @jsxobf-clobber */
    this._plugin = objPlugIn;
  };

  /**
   * Returns the full ID of this extension, which is unique among all extensions in the AMP engine.
   * @return {String}
   */
  Ext_prototype.getId = function() {
    var lid = this.getLocalId();
    return this.getPlugIn() + "." + (lid || "?");
  };

  /**
   * Returns the local ID of this extension, which is defined by the <code>id</code> attribute of the XML
   * extension declaration.
   * @return {String}
   */
  Ext_prototype.getLocalId = function() {
    return this._xml.attr("id");
  };

  /**
   * Returns the name of this extension, which is defined by the <code>name</code> attribute of the XML
   * extension declaration.
   * @return {String}
   */
  Ext_prototype.getName = function() {
    return this._xml.attr("name");
  };

  /**
   * Returns the plug-in declaring this extension.
   * @return {jsx3.amp.PlugIn}
   */
  Ext_prototype.getPlugIn = function() {
    return this._plugin;
  };

  /**
   * Returns the engine owning the plug-in owning this extension.
   * @return {jsx3.amp.Engine}
   */
  Ext_prototype.getEngine = function() {
    return this._plugin.getEngine();
  };

  /**
   * Returns the ID of the extension point this this extension extends. This is equal to the <code>point</code>
   * attribute of the XML extension declaration.
   * @return {String}
   */
  Ext_prototype.getPointId = function() {
    return this._xml.attr("point");
  };

  /**
   * Returns the extension point to which this extension is registered.
   * @return {jsx3.amp.ExtPoint}
   */
  Ext_prototype.getPoint = function() {
    return this.getEngine().getExtPoint(this.getPointId());
  };

  /**
   * Returns the list of XML elements declared in the body of the extension declaration.
   * @return {jsx3.$Array<jsx3.amp.XML>}
   */
  Ext_prototype.getData = function() {
    return this._xml.children();
  };

  Ext_prototype.toString = function() {
    return this.getId();
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
 * An AMP extension point.
 */
jsx3.lang.Class.defineClass("jsx3.amp.ExtPoint", null, [jsx3.util.EventDispatcher], function(ExtPoint, ExtPoint_prototype) {

  var amp = jsx3.amp;

  /** {String} An event published by an extension point when it is extended by a new extension. */
  ExtPoint.EXTENDED = "extended";

  /**
   * @param objPlugIn {jsx3.amp.PlugIn} the plug-in owning the extension point.
   * @param objElm {jsx3.xml.Entity} the XML declaration of the extension point.
   * @package
   */
  ExtPoint_prototype.init = function(objPlugIn, objElm) {
    this._xml = new amp.XML(objElm, true);

    /* @jsxobf-clobber */
    this._plugin = objPlugIn;
  };

  /**
   * Returns the full ID of this extension, which is unique among all extension points in the AMP engine.
   * @return {String}
   */
  ExtPoint_prototype.getId = function() {
    return this._plugin.getId() + "." + this.getLocalId();
  };

  /**
   * Returns the local ID of this extension point, which is defined by the <code>id</code> attribute of the XML
   * extension point declaration.
   * @return {String}
   */
  ExtPoint_prototype.getLocalId = function() {
    return this._xml.attr("id");
  };

  /**
   * Returns the name of this extension point, which is defined by the <code>name</code> attribute of the XML
   * extension point declaration.
   * @return {String}
   */
  ExtPoint_prototype.getName = function() {
    return this._xml.attr("name");
  };

  /**
   * Returns the plug-in declaring this extension point.
   * @return {jsx3.amp.PlugIn}
   */
  ExtPoint_prototype.getPlugIn = function() {
    return this._plugin;
  };

  /**
   * Returns the engine owning the plug-in owning this extension point.
   * @return {jsx3.amp.Engine}
   */
  ExtPoint_prototype.getEngine = function() {
    return this._plugin.getEngine();
  };

  /**
   * Returns the list of extensions registered with this extension point.
   * @return {jsx3.$Array<jsx3.amp.Ext>}
   */
  ExtPoint_prototype.getExts = function() {
    return this.getEngine().getExts(this.getId());
  };
  
  /**
   * Processes each extension of this extension point using the visitor pattern.
   * @param objProcessor {jsx3.amp.ExtProc | Function} the visitor. This argument may be null if the XML declaration
   *    of this extension point specifies a processor that can be constructed with the processor factory.
   * @param arrExt {Array<jsx3.amp.Ext>} optionally, a subset of the extensions of this extension point. Only these
   *    extensions will be processed if this parameter is not empty.
   * @return {jsx3.$Array<Object>} the extensions to process, defaults to all the extensions of this extension point.
   * @see jsx3.amp.ExtProc#process()
   * @see jsx3.amp.ExtProc#getProcessor()
   */
  ExtPoint_prototype.processExts = function(objProcessor, arrExt) {
    if (!objProcessor) {
      var def = this._xml.child("processor");
      if (def)
        objProcessor = amp.ExtProc.getProcessor(def.attr("type"), def);

      if (!objProcessor)
        throw new jsx3.Exception("Parameter objProcessor must not be null.");
    }

    if (!arrExt) arrExt = this.getExts();
    return amp.ExtProc.process(arrExt, objProcessor);
  };

  /**
   * This method is called (after this extension point is instantiated) any time extensions are registered for this
   * point. Subclasses may override this method to perform custom functionality but should call <code>jsxsuper()</code>.
   *
   * @param arrExts {jsx3.$Array<jsx3.amp.Ext>}
   */
  ExtPoint_prototype.onExtension = function(arrExts) {
    this.publish({subject:ExtPoint.EXTENDED, exts:arrExts});
  };

  ExtPoint_prototype.toString = function() {
    return this.getId();
  };

});
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _getConstructor

/**
 * An extension processor utility class.
 *
 * @see #process()
 * @see jsx3.amp.ExtPoint#processExts()
 */
jsx3.lang.Class.defineClass("jsx3.amp.ExtProc", null, null, function(ExtProc, ExtProc_prototype) {

  var amp = jsx3.amp;

  /**
   * Processes a list of extensions using the visitor pattern. For each extension in <code>arrExt</code>, this
   * method iterates over each child element of the extension declaration and invokes <code>objVisitor</code> for
   * each element. At each iteration the visitor is passed as arguments the extension object and an XML object
   * representing the child element.
   *
   * @param arrExt {Array<jsx3.amp.Ext>}
   * @param objVisitor {Function | Object} an object that defines method
   *     <code>process(ext : jsx3.amp.Ext, data: jsx3.amp.XML) : Object</code> or the function itself.
   * @return {jsx3.$Array}
   */
  ExtProc.process = function(arrExt, objVisitor) {
    var o = jsx3.$A();

    for (var i = 0; i < arrExt.length; i++) {
      var ext = arrExt[i];
      var data = ext.getData();
      for (var j = 0; j < data.length; j++) {
        var elm = data[j];

        if (typeof(objVisitor) == "function") {
          o.push(objVisitor(ext, elm));
        } else {
          o.push(objVisitor.process(ext, elm));
        }
      }
    }

    return o;
  };

  /** @private @jsxobf-clobber */
  ExtProc._PROC_FACTORIES = {
    "eval": function(x) { return ExtProc.EVAL; },
    "return": function(x) { return ExtProc.RETURN; },
    "return-async": function(x) { return ExtProc.RETURN_ASYNC; },
    "instantiator": function(x) { return ExtProc.newDescrProc(x.attr("instance-class")); }
  };

  /**
   * Registers a processor factory. A processor factory is the object responsible for creating a processor when
   * a <code>&lt;processor&gt;</code> is found as a child of an <code>&lt;extension-point&gt;</code> element. Each processor element must
   * declare a type attribute. The factory that has been registered with the matching type is used to create
   * the processor. The method signature of the factory method is:
   * <code>function(xml : jsx3.amp.XML) : jsx3.amp.ExtProc</code> where <code>xml</code> is the XML representation
   * of the <code>&lt;processor&gt;</code> element.
   *
   * @param strType {String} the type of processor that the factory creates.
   * @param fctFactory {Function} the factory function.
   */
  ExtProc.addProcessorFactory = function(strType, fctFactory) {
    ExtProc._PROC_FACTORIES[strType] = fctFactory;
  };

  /**
   * Creates a processor object from a <code>&lt;processor&gt;</code> element.
   * @param strType {String} the type attribute of the <code>&lt;processor&gt;</code> element.
   * @param xml {jsx3.amp.XML} the <code>&lt;processor&gt;</code> element.
   * @see #addProcessorFactory()
   */
  ExtProc.getProcessor = function(strType, xml) {
    var factory = ExtProc._PROC_FACTORIES[strType];
    if (factory) {
      return factory(xml);
    } else {
      return null;
    }
  };

  /** @private @jsxobf-clobber */
  ExtProc._DESCRIPTOR_VISITOR = function(fctConstructor) {
    this._constructor = fctConstructor;
  };
  
  ExtProc._DESCRIPTOR_VISITOR.prototype.process = function(objExt, objData) {
    var className = objData.attr("ext-class");
    var c = this._constructor;
    if (className) {
      var customClass = amp._getConstructor(className);
      
      if (customClass)
        c = customClass
      else
        amp.LOG.error(jsx3._msg("amp.36", className));
    }

    return new c(objExt, objData);
  };
  
  /**
   * {jsx3.amp.ExtProc}
   * Processes an extension by intepreting each child element of the XML extension declaration as code to evaluate.
   * The element should be named "eval" and the text body of the element is taken as the JavaScript to evaluate.
   * The script is evaluated in the context of the extension object. So, for example, <code>this.getPlugIn()</code>
   * grants access in the script to the plug-in defining the extension.
   * <p/>
   * No value is returned from the extension processing. If the <code>load</code> attribute of the <code>eval</code>
   * element is equal to "true" then the plug-in owning the extension is loaded before the script is evaluated.
   * Therefore, the script may be evaluated either synchronously or asynchronously, but since there is no value returned
   * from the processing, there is no way of knowing which one actually occurred.
   */
  ExtProc.EVAL = {
    process: function(objExt, objData) {
      var bLoad = objData.attr("load") == "true";
      var script = objData.value();

      if (bLoad) {
        objExt.getPlugIn().load().when(function() {
          objExt.eval(script);
        });
      } else {
        objExt.eval(script);
      }
    }
  };

  /**
   * {jsx3.amp.ExtProc}
   * Processes an extension by intepreting each child element of the XML extension declaration as code to evaluate.
   * The element should be named "eval" and the text body of the element is taken as the JavaScript to evaluate.
   * The script is evaluated in the context of the extension object. So, for example, <code>this.getPlugIn()</code>
   * grants access in the script to the plug-in defining the extension.
   * <p/>
   * The value that the script evaluates to is returned from the extension processing.
   */
  ExtProc.RETURN = {
    process: function(objExt, objData) {
      var script = objData.value();
      return objExt.eval(script);
    }
  };

  /**
   * {jsx3.amp.ExtProc}
   * Processes an extension by intepreting each child element of the XML extension declaration as code to evaluate.
   * The element should be named "eval" and the text body of the element is taken as the JavaScript to evaluate.
   * The script is evaluated in the context of the extension object. So, for example, <code>this.getPlugIn()</code>
   * grants access in the script to the plug-in defining the extension.
   * <p/>
   * The value returned from the extension processing is an asynchronous return value as defined in the contract for
   * <code>jsx3.$Y()</code>. The return value may be notified either asynchronously or synchronously, depending on
   * whether the <code>load</code> attribute of the <code>eval</code> element is equal to "true". If it is, then
   * the plug-in owning the extension is loaded first and then the script is evaluated asynchronously. The asynchronous
   * return value is notified of completion with the value that the script evaluates to.
   */
  ExtProc.RETURN_ASYNC = {
    process: jsx3.$Y(function(cb) {
      var objExt = cb.args()[0];
      var objData = cb.args()[1];

      var bLoad = objData.attr("load") == "true";
      var script = objData.value();

      if (bLoad) {
        objExt.getPlugIn().load().when(function() {
          cb.done(objExt.eval(script));
        });
      } else {
        cb.done(objExt.eval(script));
      }
    })
  };

  /**
   * Creates a new extension processor that creates instances of a certain class. The only requirement of the class
   * is that is have a two-argument constructor with the signature:
   * <code>function init(ext : jsx3.amp.Ext, xml : jsx3.amp.XML)</code>.
   * <p/>
   * The processing visitor will create a new instance of <code>objClass</code> for each child element of each
   * extension. If any child element defines a <code>ext-class</code> attribute, this is interpreted as the
   * fully-qualified class name of a subclass of <code>objClass</code>. This class, if it is defined, will be used
   * instead of <code>objClass</code> to process that particular child element.
   *
   * @param objClass {String|jsx3.lang.Class|Function} a class or constructor.
   * @return {jsx3.amp.ExtProc}
   */
  ExtProc.newDescrProc = function(objClass) {
    return new ExtProc._DESCRIPTOR_VISITOR(amp._getConstructor(objClass));
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _plugin _loadPlugIn _extendInstance
// @jsxobf-clobber-shared  _getConstructor _setPlugInOnInit _addExtPoint _addExt _removeExtPoint _removeExt

/**
 * An AMP plug-in. A plug-in is a logical collection of application logic and resources. Plug-ins are loaded
 * as needed and may contain extension points and extensions.
 */
jsx3.lang.Class.defineClass("jsx3.amp.PlugIn", null, [jsx3.util.EventDispatcher, jsx3.net.URIResolver, jsx3.amp.Bindable], function(PlugIn, PlugIn_prototype) {

  var amp = jsx3.amp;
  
  /** {String} Event subject published when this plug-in has loaded completely. */
  PlugIn.READY = "ready";
  
  /** {String} Event subject published when an extension point of this plug-in has been extended. */
  PlugIn.EXTENDED = "extended";

  /**
   * @jsxobf-clobber
   * @private
   * @jsxobf-final
   */
  PlugIn.NOT_LOADED = 0;
  /**
   * @jsxobf-clobber
   * @private
   * @jsxobf-final
   */
  PlugIn.LOADING = 1;
  /**
   * @jsxobf-clobber
   * @private
   * @jsxobf-final
   */
  PlugIn.LOADED = 2;

  PlugIn_prototype.init = function() {
    /* @jsxobf-clobber */
    this._state = PlugIn.NOT_LOADED;
    
    /* @jsxobf-clobber */
    this._req = jsx3.$A();
    
    /* @jsxobf-clobber */
    this._resources = jsx3.$A();
    /* @jsxobf-clobber */
    this._resourcemap = {};

    /* @jsxobf-clobber */
    this._extpt = jsx3.$A();
    /* @jsxobf-clobber */
    this._extptmap = {};

    /* @jsxobf-clobber */
    this._ext = jsx3.$A();
    /* @jsxobf-clobber */
    this._extmap = {};

    /* @jsxobf-clobber */
    this._events = jsx3.$A();
  };
  
  /**
   * Called after this plug-in is instantiated to provide the plug-in with its XML configuration data. This method
   * is optional for objects used as plug-ins.
   *
   * @param objElm {jsx3.xml.Entity}
   */
  PlugIn_prototype.setData = function(objElm) {
    /* @jsxobf-clobber */
    this._id = objElm.getAttribute("id");
    /* @jsxobf-clobber */
    this._global = objElm.getAttribute("global") == "true";
    /* @jsxobf-clobber */
    this._name = objElm.getAttribute("name");
    /* @jsxobf-clobber */
    this._version = objElm.getAttribute("version");

    var children = objElm.getChildNodes().toArray(true);
    for (var i = 0; i < children.length; i++) {
      var node = children[i];
      var name = node.getBaseName();

      if (name == "requires") {
        for (var j = node.selectNodeIterator("amp:plugin", amp.getXmlNS(node)); j.hasNext(); )
          this._req.push(j.next().getAttribute("id"));
      } else if (name == "event") {

        this._events.push(node.getAttribute("id"));

      } else if (name == "extension-point") {

        var xpClass = null;

        var xpClassName = node.getAttribute("class");
        if (xpClassName) {
          xpClass = amp._getConstructor(xpClassName);
          if (!xpClass)
            amp.LOG.error(jsx3._msg("amp.38", xpClassName));
        }
        if (!xpClass) xpClass = amp.ExtPoint;

        var xp = new xpClass(this, node);
        var id = xp.getLocalId();
        if (this._extptmap[id]) {
          amp.LOG.error(jsx3._msg("amp.39", this, id));
        } else {
          amp.Engine._extendInstance(xp, node);
          this._extptmap[id] = xp;
          this._extpt.push(xp);
        }

      } else if (name == "extension") {
        var xClass = null;
        var xClassName = node.getAttribute("class");
        if (xClassName) {
          xClass = amp._getConstructor(xClassName);
          if (!xpClass)
            amp.LOG.error(jsx3._msg("amp.40", xClassName));
        }
        if (!xClass) xClass = amp.Ext;

        var x = new xClass(this, node);
        var id = x.getLocalId();
        if (id != null) {
          if (this._extmap[id]) {
            amp.LOG.error(jsx3._msg("amp.41", this, id));
          } else {
            this._extmap[id] = x;
          }
        }
        amp.Engine._extendInstance(x, node);
        this._ext.push(x);

      }
    }
  };
  
  /**
   * Called after this plug-in is instantiated to provide the plug-in with the engine that created it. This method
   * is optional for objects used as plug-ins.
   *
   * @param objEngine {jsx3.amp.Engine}
   */
  PlugIn_prototype.setEngine = function(objEngine) {
    /* @jsxobf-clobber */
    this._engine = objEngine;
  };
  
  /**
   * Called after this plug-in is instantiated to provide the plug-in with its path. This method
   * is optional for objects used as plug-ins.
   *
   * @param strPath {String}
   */
  PlugIn_prototype.setPath = function(strPath) {
    /* @jsxobf-clobber */
    this._path = strPath;
    /* @jsxobf-clobber */
    this._uri = new jsx3.net.URI(strPath + "/");
    /* @jsxobf-clobber */
    this._uriabs = jsx3.app.Browser.getLocation().resolve(this._uri);
  };
  
  /**
   * Called after this plug-in is instantiated to provide the plug-in with the resources defined in the 
   * configuration data. This method is optional for objects used as plug-ins.
   *
   * @param arrRsrc {Array<jsx3.amp.Resource>}
   */
  PlugIn_prototype.setResources = function(arrRsrc) {
    this._resources = jsx3.$A(arrRsrc);
    this._resourcemap = {};
    for (var i = 0; i < arrRsrc.length; i++) {
      var rsrc = arrRsrc[i];

      rsrc._setPlugInOnInit(this);
      if (!rsrc.isLoaded())
        rsrc.subscribe(amp.Resource.READY, this, "_onResourceReady");
      
      this._resourcemap[rsrc.getLocalId()] = rsrc;
    }
  };

  /**
   * Returns the id attribute from the plug-in configuration element.
   * @return {String}
   */
  PlugIn_prototype.getId = function() {
    return this._id;
  };

  /**
   * Returns whether this is a global plug-in. A global plug-in is only instantiated once for all of the
   * applications that register it.
   * @return {boolean}
   */
  PlugIn_prototype.isGlobal = function() {
    return this._global;
  };

  /**
   * Returns the name attribute from the plug-in configuration element.
   * @return {String}
   */
  PlugIn_prototype.getName = function() {
    return this._name;
  };

  /**
   * Returns the version attribute from the plug-in configuration element.
   * @return {String}
   */
  PlugIn_prototype.getVersion = function() {
    return this._version;
  };

  /**
   * Returns the resources of this plug-in that are defined in the plug-in configuration data.
   * @return {jsx3.$Array<jsx3.amp.Resource>}
   */
  PlugIn_prototype.getResources = function() {
    return this._resources;
  };

  /**
   * Returns the list of event subjects that this plug-in declares to publish.
   * @return {jsx3.$Array<String>}
   */
  PlugIn_prototype.getEvents = function() {
    return this._events;
  };

  /**
   * Returns a resource of this plug-in by its ID.
   * @param strId {String}
   * @return {jsx3.amp.Resource}
   */
  PlugIn_prototype.getResource = function(strId) {
    return this._resourcemap[strId];
  };
  
  /**
   * Returns the list of plug-in IDs that this plug-in requires. These plug-ins must be loaded before this plug-in
   * loads.
   * @return {jsx3.$Array<String>}
   */
  PlugIn_prototype.getRequires = function() {
    return this._req;
  };
  
  /**
   * Loads this plug-in asynchronously if it is not already loaded. 
   */
  PlugIn_prototype.load = jsx3.$Y(function(cb) {
    if (this._state == PlugIn.NOT_LOADED) {
      amp.LOG.debug(jsx3._msg("amp.42", this));
      this._state = PlugIn.LOADING;
      return this._engine._loadPlugIn(this);
    } else if (!this.isLoaded())
      this.subscribe(PlugIn.READY, jsx3.$F(cb.done).bind(cb));
    else
      cb.done();
  });
  
  PlugIn_prototype.loaded = jsx3.$Y(function(cb) {
    if (this.isLoaded()) {
      cb.done();
    } else {
      this.subscribe(PlugIn.READY, jsx3.$F(cb.done).bind(cb));
    }
  });

  /** @private @jsxobf-clobber */
  PlugIn_prototype._onResourceReady = function(objEvent) {
/*
    if (this._state != PlugIn.LOADED) {
      for (var i = 0; i < this._resources.length; i++) {
        var rsrc = this._resources[i];
        if (!rsrc.isLoaded() && rsrc.getLoadType() != amp.Resource.LOAD_MANUAL)
          return;
      }
      
      this._onLastResourceLoaded();
    }
*/
  };

  /** @private @jsxobf-clobber-shared */
  PlugIn_prototype._onLastResourceLoaded = function() {
    this._state = PlugIn.LOADED;

    this.onLoaded();
    this.publish({subject:PlugIn.READY});
  };
        
  /**
   * Returns true is all of the resources of this plug-in have loaded.
   * @return {boolean}
   */
  PlugIn_prototype.isLoaded = function() {
    return this._state == PlugIn.LOADED;
  };

  /**
   * Returns the engine of this plug-in.
   * @return {jsx3.amp.Engine}
   */
  PlugIn_prototype.getEngine = function() {
    return this._engine;
  };

  /**
   * Returns the server of the engine of this plug-in.
   * @return {jsx3.app.Server}
   */
  PlugIn_prototype.getServer = function() {
    return this._engine.getServer();
  };

  /**
   * Returns the extension points of this plug-in.
   * @return {jsx3.$Array<jsx3.amp.ExtPoint>}
   */
  PlugIn_prototype.getExtPoints = function() {
    return this._extpt;
  };

  /**
   * Returns an extension point of this plug-in by its ID.
   * @param strId {String} the local ID of the extension point.
   * @return {jsx3.amp.ExtPoint}
   */
  PlugIn_prototype.getExtPoint = function(strId) {
    return this._extptmap[strId];
  };

  /**
   * Adds an extension point to this plug-in programmatically. <code>xp.getPlugIn()</code> must return this plug-in.
   * @param xp {jsx3.amp.ExtPoint} the extension point to add.
   * @since 3.9
   */
  PlugIn_prototype.addExtPoint = function(xp) {
    var id = xp.getLocalId();
    this._extptmap[id] = xp;
    this._extpt.push(xp);
    this._engine._addExtPoint(xp);
  };

  /**
   * Removes an extension point from this plug-in programmatically. <code>xp</code> must be an extension point of
   * this plug-in.
   * @param xp {jsx3.amp.ExtPoint} the extension point of this plug-in to remove.
   * @since 3.9
   */
  PlugIn_prototype.removeExtPoint = function(xp) {
    var id = xp.getLocalId();
    if (xp === this._extptmap[id])
      delete this._extptmap[id];
    this._extpt.remove(xp);
    this._engine._removeExtPoint(xp);
  };

  /**
   * Adds an extension to this plug-in programmatically. <code>x.getPlugIn()</code> must return this plug-in.
   * @param x {jsx3.amp.Ext} the extension to add.
   * @since 3.9
   */
  PlugIn_prototype.addExt = function(x) {
    var id = x.getLocalId();
    if (id != null) {
      if (this._extmap[id]) {
        amp.LOG.error(jsx3._msg("amp.41", this, id));
      } else {
        this._extmap[id] = x;
      }
    }
    this._ext.push(x);
    this._engine._addExt(x, true);
  };

  /**
   * Removes an extension from this plug-in programmatically. <code>x</code> must be an extension of this plug-in.
   * @param x {jsx3.amp.Ext} the extension of this plug-in to remove.
   * @since 3.9
   */
  PlugIn_prototype.removeExt = function(x) {
    var id = x.getLocalId();
    if (x === this._extmap[id])
      delete this._extmap[id];
    this._ext.remove(x);
    this._engine._removeExt(x);
  };

  /**
   * Returns the extensions of this plug-in.
   * @return {jsx3.$Array<jsx3.amp.Ext>}
   */
  PlugIn_prototype.getExts = function() {
    return this._ext;
  };

  /**
   * Returns an extension of this plug-in by its ID.
   * @param strId {String} the local ID of the extension.
   * @return {jsx3.amp.Ext}
   */
  PlugIn_prototype.getExt = function(strId) {
    return this._extmap[strId];
  };

  /**
   * Calls when this plug-in is registered with its engine. Subclasses may override this method to provide custom
   * behavior.
   */
  PlugIn_prototype.onRegister = function() {
    ;
  };
  
  /**
   * Called when all the resources of this plug-in have loaded. Subclasses may override this method to provide custom
   * behavior.
   */
  PlugIn_prototype.onLoaded = function() {
    ;
  };
  
  /**
   * Called when the engine of this plug-in has completely registered all plug-ins. Subclasses may override this 
   * method to provide custom behavior.
   */
  PlugIn_prototype.onStartup = function() {
    ;
  };
  
  /**
   * Called (after this plug-in is instantiated) any time extensions are registered for an extension
   * point of this plug-in. Subclasses may override this method to provide custom behavior but should call
   * <code>jsxsuper</code> to ensure that the <code>EXTENDED</code> event is published.
   *
   * @param objExtPt {jsx3.amp.ExtPoint}
   * @param arrExts {Array<jsx3.amp.Ext>}
   */
  PlugIn_prototype.onExtension = function(objExtPt, arrExts) {
    this.publish({subject:PlugIn.EXTENDED, extpt:objExtPt, exts:arrExts});
  };

  /**
   * Implements <code>jsx3.net.URIResolver</code>.
   * @param strURI {String|jsx3.net.URI}
   * @return {jsx3.net.URI}
   */
  PlugIn_prototype.resolveURI = function(strURI) {
    var uri = jsx3.net.URI.valueOf(strURI);

    // Special handling of relative jsxapp:/path URIs
    if (uri.getScheme() == "jsxapp" && !uri.getHost())
      return this.getServer().resolveURI(uri.getPath().substring(1));
    
    if (!jsx3.net.URIResolver.isAbsoluteURI(uri))
      uri = this._uri.resolve(uri);

    return jsx3.net.URIResolver.DEFAULT.resolveURI(uri);
  };

  /**
   * Implements <code>jsx3.net.URIResolver</code>.
   * @return {String}
   */
  PlugIn_prototype.getUriPrefix = function() {
    return this._uri.toString();
  };

  /**
   * Implements <code>jsx3.net.URIResolver</code>.
   * @param strURI {String|jsx3.net.URI}
   * @param bRel {boolean}
   * @return {jsx3.net.URI}
   */
  PlugIn_prototype.relativizeURI = function(strURI, bRel) {
    var loc = jsx3.app.Browser.getLocation();
    var relative = this._uriabs.relativize(loc.resolve(strURI));

    if (relative.isAbsolute() || bRel)
      return relative;
    else
      return jsx3.net.URI.fromParts("jsxplugin", null, this.getId(), null, 
          "/" + relative.getPath(), relative.getQuery(), relative.getFragment());
  };

  PlugIn_prototype.toString = function() {
    return this._id;
  };

  /**
   * Returns a logger for this plug-in.
   * @return {jsx3.util.Logger}
   */
  PlugIn_prototype.getLog = function() {
    return jsx3.util.Logger.getLogger(this.getId());
  };

  /**
   * Loads the contents of a plug-in resource as a GUI component. The resource should be an XML resource whose
   * data is a GI component file. The resource must be already loaded to call this method. This method loads the
   * component with this plug-in as the URI resolver. Therefore, any relative paths in the component will be
   * resolved relative to the directory of this plug-in.
   * <p/>
   * Once the component is loaded, this method defines a <code>getPlugIn()</code> method on the root component object
   * that returns this component. In addition, if the root component object defines an <code>onRsrcLoad()</code>
   * method, that method is called.
   *
   * @param strRsrcId {String | jsx3.amp.Resource}
   * @param objParent {jsx3.app.Model} the GUI component into which to load the resource.
   * @param bPaint {boolean} whether to paint the loaded resource (default is <code>true</code>).
   * @return {jsx3.app.Model} the loaded component.
   */
  PlugIn_prototype.loadRsrcComponent = function(strRsrcId, objParent, bPaint) {
    if (!objParent)
      throw new jsx3.Exception("Parent container not specified for loading resource " + strRsrcId + ".");

    var rsrc = strRsrcId instanceof amp.Resource ? strRsrcId : this.getResource(strRsrcId);

    if (!rsrc)
      throw new jsx3.Exception("No resource " + strRsrcId + " in plug-in " + this + ".");

    var content = objParent.loadXML(rsrc.getData(), false, this);
    content.getPlugIn = jsx3.$F(function() { return this; }).bind(this);
    if (content.onRsrcLoad) {
      try {
        content.onRsrcLoad();
      } catch (e) {
        amp.LOG.error(jsx3._msg("amp.44", strRsrcId), jsx3.NativeError.wrap(e));
      }
    }

    if (bPaint !== false)
      objParent.paintChild(content);
    
    return content;
  };

  /**
   * Returns <code>true</code> if <code>e</code> is a binding expression. A binding expression starts with '{'
   * and ends with '}'.
   * @param e {String}
   */
  PlugIn.isBindExpr = function(e) {
    return e.indexOf("{") == 0 && jsx3.$S(e).endsWith("}");
  };

  /**
   * Registers a function to be called when the value of a binding expression changes.
   * <p/>
   * The binding expression should begin with a '{' and end with a '}'. The expression is parsed for any tokens that
   * match a bindable property of this object. <code>handler</code> will be invoked any time one of these
   * bindable properties changes value. This function is passed the value of the binding expression. The binding
   * expression is evaluated in the context of this object. The "this" keyword is optional in the expression
   * because the expression is evaluated inside of a <code>with</code> block.
   *
   * @param expression {String} a valid binding expression.
   * @param handler {Function}
   * @see #isExpression()
   */
  PlugIn_prototype.regBindExpr = function(expression, handler) {
    var expr = expression.substring(1, expression.length - 1);
    var index = jsx3.$H(expr.split(/[^\w\$]+/g));
    var propIds = this.getBindableProps().filter(function(e) { return index[e]; });

    var onChange = jsx3.$F(function() {
      var v = this.eval("with(this){" + expr + "}");
      handler(v);
    }).bind(this);

    if (propIds.length > 0) {
      propIds.each(jsx3.$F(function(e) {
        this.subscribe(e, onChange);
      }).bind(this));
    }

    onChange();
  };

});

/**
 * A type of plug-in that loads a JSX class. The class must be loaded by default or contained in its own JavaScript
 * class file in the <code>jsx:/js/</code> classpath. 
 *
 * @package
 */
jsx3.lang.Class.defineClass("jsx3.amp.ClassPlugIn", jsx3.amp.PlugIn, null, function(ClassPlugIn, ClassPlugIn_prototype) {

  var amp = jsx3.amp;

  ClassPlugIn_prototype.isLoaded = function() {
    return jsx3.Class.forName(this.getId()) != null;
  };

  ClassPlugIn_prototype.setResource = function(arrRsrc) {
  };

  ClassPlugIn_prototype.getResources = function() {
    if (!this._resources || this._resources.length == 0) {
      var r = new amp.Resource(this, "class",
          {"@path":"jsx:/js/" + this.getId().replace(/\./g, "/") + ".js", "name()":"script"});
      this._resources = jsx3.$A([r]);
    }

    return this._resources;
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
 * An XML wrapper that can be backed either by a real XML node or by a nested object structure.
 * <p/>
 * To wrap a nested object structure, pass an object to the constructor with the following format:
 * <ul>
 *   <li>Every element has a <code>name()</code> property equal to the base node name</li>
 *   <li>Every element has a <code>children()</code> property that is an array of nested objects</li>
 *   <li>Every attribute of an element corresponds to a property whose name is "@" prepended to the attribute name</li>
 *   <li>Every nested child element is stored in the children() property and is also referended by another
 *       property whose name is "/" prepended to the base node name of the child element.</li>
 * </ul>
 */
jsx3.lang.Class.defineClass("jsx3.amp.XML", null, null, function(XML, XML_prototype) {

/*
  XML._marshall = function(objElm) {
    var o = {"name()": objElm.getBaseName(), "children()":[]};

    var attr = objElm.getAttributeNames();
    for (var i = 0; i < attr.length; i++)
      o["@" + attr[i]] = objElm.getAttribute(attr[i]);

    for (var i = objElm.getChildIterator(); i.hasNext(); ) {
      var child = this._marshall(i.next());
      o["children()"].push(child);
      o["/" + child["name()"]] = child;
    }

    if (o["children()"].length == 0)
      o["value()"] = objElm.getValue();

    return o;
  };
*/

  /**
   * @param elm {jsx3.xml.Entity | Object}
   */
  XML_prototype.init = function(elm) {
    if (elm instanceof jsx3.xml.Entity) {
      this._native = true;
    }
    this._xml = elm;
  };

  /**
   * Returns an attribute of this element.
   * @param a {String} the name of the attribute.
   * @return {String} the value of the attribute.
   */
  XML_prototype.attr = function(a) {
    return this._native ? this._xml.getAttribute(a) : this._xml["@" + a];
  };

  /**
   * Returns the base name of this element.
   * @return {String} the base name.
   */
  XML_prototype.nname = function() {
    return this._native ? this._xml.getBaseName() : this._xml["name()"];
  };

  /**
   * Returns a child element of this element whose base name is equal to <code>name</code>.
   * @param name {String}
   * @return {jsx3.amp.XML}
   */
  XML_prototype.child = function(name) {
    if (this._native) {
      for (var i = this._xml.getChildIterator(); i.hasNext(); ) {
        var c = i.next();
        if (c.getBaseName() == name)
          return new XML(c);
      }
      return null;
    } else {
      var e = this._xml["/" + name];
      return e ? new XML(e) : null;
    }
  };

  /**
   * Returns this child elements of this element.
   * @return {jsx3.$Array<jsx3.amp.XML>}
   */
  XML_prototype.children = function() {
    if (this._native)
      return jsx3.$A(this._xml.getChildNodes().toArray()).map(function(e) { return new XML(e); });
    else
      return jsx3.$A(this._xml["children()"]).map(function(e) { return new XML(e); });
  };

  /**
   * Returns the node value of this element.
   * @return {String}
   */
  XML_prototype.value = function() {
    if (this._native)
      return this._xml.getValue();
    else
      return this._xml["value()"];
  };

  XML_prototype.toNative = function() {
    if (this._native)
      return this._xml;
  };

  XML_prototype.toString = function() {
    if (this._native)
      return this._xml.toString();
    else
      return "";
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _loadResourceShared _getBestLocaleKey

/**
 * An AMP plug-in resource, such as a JavaScript file or XML file.
 */
jsx3.lang.Class.defineClass("jsx3.amp.Resource", null, [jsx3.util.EventDispatcher], function(Resource, Resource_prototype) {

  var amp = jsx3.amp;

  /** {String} Event subject published when this resource has loaded. */
  Resource.READY = "ready";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Resource.TYPE_SCRIPT = "script";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Resource.TYPE_CSS = "css";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Resource.TYPE_XML = "xml";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Resource.TYPE_XSL = "xsl";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Resource.TYPE_JSS = "jss";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Resource.TYPE_BUNDLE = "propsbundle";

  /** {String} Loads a resource before the plug-in is instantiated and registered. */
  Resource.LOAD_EARLY = "early";
  /** {String} Loads a resource before the plug-in loads. */
  Resource.LOAD_NORMAL = "normal";
  /** {String} Waits for a resource to be loaded programatically some time after the plug-in loads. */
  Resource.LOAD_MANUAL = "manual";

  /** @private @jsxobf-clobber */
  Resource._LOAD_MAP = {early:1, normal:1, manual:1};

  /**
   * @jsxobf-clobber
   * @private
   * @jsxobf-final
   */
  Resource.NOT_LOADED = 0;
  /**
   * @jsxobf-clobber
   * @private
   * @jsxobf-final
   */
  Resource.LOADING = 1;
  /**
   * @jsxobf-clobber
   * @private
   * @jsxobf-final
   */
  Resource.LOADED = 2;

  /**
   * @private
   * @jsxobf-clobber-shared
   */
  Resource._newBeforePlugIn = function(strPlugInId, strPlugInPath, strId, elm, objEngine) {
    var rsrc = new Resource(null, strId, elm);
    /* @jsxobf-clobber-shared */
    rsrc._pluginid = strPlugInId;
    /* @jsxobf-clobber */
    rsrc._pluginpath = strPlugInPath;
    /* @jsxobf-clobber */
    rsrc._pluginengine = objEngine;
    return rsrc;
  };

  /**
   * @param objPlugIn {jsx3.amp.PlugIn} the plug-in owning the resource.
   * @param strId {String} the ID of the resource. This ID is unique among all resources of the same plug-in.
   * @param elm {jsx3.xml.Element} the XML declaration of the resource.
   */
  Resource_prototype.init = function(objPlugIn, strId, elm) {
    /* @jsxobf-clobber */
    this._xml = new amp.XML(elm || {});
    /* @jsxobf-clobber */
    this._xmlnative = elm;
    /* @jsxobf-clobber-shared */
    this._plugin = objPlugIn;
    /* @jsxobf-clobber */
    this._id = strId;
    /* @jsxobf-clobber */
    this._prereqs = jsx3.$A();
    /* @jsxobf-clobber */
    this._state = Resource.NOT_LOADED;
    /* @jsxobf-clobber */
    this._data = null;
  };

  /** @private @jsxobf-clobber-shared */
  Resource_prototype._setPlugInOnInit = function(p) {
    this._plugin = p;
    delete this._pluginid;
    delete this._pluginpath;
    delete this._pluginengine;
  };

  /**
   * Returns the value of any attribute of the XML declaration of this resource.
   * @param k {String} the attribute name.
   */
  Resource_prototype.attr = function(k) {
    return this._xml.attr(k);
  };

  /**
   * Returns the XML declaration of this resource as passed to the constructor.
   * @return {jsx3.xml.Entity}
   */
  Resource_prototype.xml = function() {
    return this._xmlnative;
  };

  /**
   * Returns the plug-in that owns this resource.
   * @return {jsx3.amp.PlugIn}
   */
  Resource_prototype.getPlugIn = function() {
    return this._plugin;
  };

  /**
   * Returns the full ID of this resource, which is unique to the entire AMP engine.
   * @return {String}
   */
  Resource_prototype.getId = function() {
    return (this._plugin ? this._plugin.getId() : this._pluginid) + "." + this._id;
  };

  /**
   * Returns the ID Of this resource, which is unique among all resources of the same plug-in.
   * @return {String}
   */
  Resource_prototype.getLocalId = function() {
    return this._id;
  };

  /**
   * Returns the path of this resource, which is relative to the directory of the plug-in owning this resource.
   * The resource type is defined by the <code>id</code> attribute of the resource XML declaration.
   * @return {String}
   */
  Resource_prototype.getPath = function() {
    return this.attr("path");
  };

  /**
   * @package
   */
  Resource_prototype.getFullPath = function(p) {
    var path = p || this.getPath();
    return this._plugin ? "" + this._plugin.resolveURI(path) : this._pluginpath + path;
  };

  /**
   * Returns the list of locale keys for which this resources is localized. This is equal to the locales
   * attribute of the resource, split by whitespace.
   * @return {Array<String>}
   */
  Resource_prototype.getLocales = function() {
    var l = this.attr("locales");
    if (l) {
      l = jsx3.$S(l).trim();
      if (l.length > 0)
        return l.split(/\s+/g);
    }
    return [];
  };

  /**
   * Returns the path of the best localized version of this resource for <code>objLocale</code>.
   * @param objLocale {jsx3.util.Locale}
   * @return {String}
   */
  Resource_prototype.getPathForLocale = function(objLocale) {
    var path = this.getPath();
    if (objLocale) {
      var key = amp._getBestLocaleKey(this.attr("locales"), objLocale);
      if (key) {
        var index = path.lastIndexOf(".");
        if (index < 0 || index < path.lastIndexOf("/"))
          index = path.length;
        path = path.substring(0, index) + "." + key + path.substring(index);
      }
    }
    return path;
  };

  /**
   * Returns the resource type, such as <code>TYPE_SCRIPT</code>. The resource type is defined by the element
   * node name of the resource XML declaration.
   *
   * @return {String}
   */
  Resource_prototype.getType = function() {
    return this._xml.nname();
  };

  /**
   * Returns the load type, such as <code>LOAD_NORMAL</code>. The load type is defined using the <code>load</code>
   * attribute of the resource XML declaration.
   *
   * @return {String}
   * @see LOAD_EARLY
   * @see LOAD_NORMAL
   * @see LOAD_MANUAL
   */
  Resource_prototype.getLoadType = function() {
    var load = this.attr("load");
    return Resource._LOAD_MAP[load] ? load : Resource.LOAD_NORMAL;
  };

  /**
   * @return {jsx3.$Array<Object>}
   * @package
   * @jsxobf-clobber-shared
   */
  Resource_prototype._getPrereqs = function() {
    return this._prereqs;
  };

  /**
   * @package
   * @jsxobf-clobber-shared
   */
  Resource_prototype._addPrereq = function(strPrereqId, type) {
    this._prereqs.push({id:strPrereqId, type:type});
  };

  /**
   * @return {boolean}
   */
  Resource_prototype.isLoaded = function() {
    return this._state == Resource.LOADED;
  };

  /**
   * Returns an asynchronous return value that completes when this resource is loaded.
   * @see #load()
   */
  Resource_prototype.loaded = jsx3.$Y(function(cb) {
    if (this.isLoaded()) {
      cb.done();
    } else {
      this.subscribe(Resource.READY, jsx3.$F(cb.done).bind(cb));
    }
  });

  /**
   * Asynchronously loads this resource if it is not already loaded.
   * @see #loaded()
   */
  Resource_prototype.load = jsx3.$Y(function(cb) {
    if (this._state == Resource.NOT_LOADED) {
      return (this._plugin ? this._plugin.getEngine() : this._pluginengine)._loadResourceShared(this);
    } else if (!this.isLoaded())
      this.subscribe(Resource.READY, jsx3.$F(cb.done).bind(cb));
    else
      cb.done();
  });

  /**
   * @package
   * @jsxobf-clobber-shared
   */
  Resource_prototype._engineStart = function(objData) {
    this._state = Resource.LOADING;
  };

  /**
   * @package
   * @jsxobf-clobber-shared
   */
  Resource_prototype._engineFinish = function(objData) {
    this._state = Resource.LOADED;
    this._data = objData;
    this.publish({subject:Resource.READY});
  };

  /**
   * Returns the data associated with this resource. Only resources of type xml, xsl, jss, and propsbundle will
   * return a defined value.
   *
   * @param bClear {boolean} if <code>true</code> then delete the reference to the data object in order to allow
   *    garbage collection.
   * @return {jsx3.xml.Document|jsx3.app.Properties|jsx3.app.PropsBundle}
   */
  Resource_prototype.getData = function(bClear) {
    var d = this._data;
    if (bClear) delete this._data;
    return d;
  };

  Resource_prototype.toString = function() {
    return this.getId();
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */


// @jsxobf-clobber-shared  _addPrereq _getPrereqs _engineStart _engineFinish _getConstructor _newBeforePlugIn
// @jsxobf-clobber-shared  _getBestLocaleKey _onLastResourceLoaded _pluginid

/**
 * An AMP engine. There is one engine instance per application that loads the AMP add-in.
 *
 * @see #getEngine()
 */
jsx3.lang.Class.defineClass("jsx3.amp.Engine", null, [jsx3.util.EventDispatcher], function(Engine, Engine_prototype) {

  var amp = jsx3.amp;
  var Document = jsx3.xml.Document;
  var Job = jsx3.util.Job;

  /** {String} Event subject published when an engine finishes loading. */
  Engine.LOAD = "load";

  /** {String} Event subject published when an error prevents the engine from loading. */
  Engine.ERROR = "error";

  /** {String} Event subject published when a plug-in is registered. */
  Engine.REGISTER = "register";

  /** {String} Event subject published when progress is made loading an engine. <code>pct</code> and <code>done</code> 
    *          fields may be defined. */
  Engine.PROGRESS = "progress";

  /** @private @jsxobf-clobber */
  Engine._ENGINES = {};

  /** @private @jsxobf-clobber */
  Engine._GLOBAL_PLUGINS = {};

  /**
   * Returns the engine for a given application.
   * 
   * @param objServer {jsx3.app.Server}
   * @return {jsx3.amp.Engine}
   */
  Engine.getEngine = function(objServer) {
    var key = objServer.getEnv("namespace");
    
    if (! Engine._ENGINES[key])
      Engine._ENGINES[key] = new Engine(objServer);
    return Engine._ENGINES[key];
  };
  
  /** @private @jsxobf-clobber-shared */
  Engine._initIfAddin = function(objServer) {
    var a = objServer.getAddins();
    for (var i = 0; i < a.length; i++)
      if (a[i] == amp.ADDIN) {
        Engine.getEngine(objServer);
        return;
      }
  };
  
  /** @private @jsxobf-clobber-shared */
  Engine._init = function() {
    var Server = jsx3.app.Server;
    var s = Server.allServers();
    for (var i = 0; i < s.length; i++)
      Engine._initIfAddin(s[i]);
    
    Server.subscribe(Server.INITED, Engine, "_onAppInit");
  };

  /** @private @jsxobf-clobber */
  Engine._onAppInit = function(onjEvent) {
    Engine._initIfAddin(onjEvent.target);
  };

  jsx3.net.URIResolver.register("jsxplugin", function(uri) {
    var pluginId = uri.getHost();
    for (var f in Engine._ENGINES) {
      var p = Engine._ENGINES[f].getPlugIn(pluginId);
      if (p) return p;
    }
    return null;
  });  

  /**
   * @param objServer {jsx3.app.Server}
   * @private
   */
  Engine_prototype.init = function(objServer) {
    /* @jsxobf-clobber */
    this._server = objServer;
    /* @jsxobf-clobber */
    this._plugins = jsx3.$A();
    /* {Object<String, jsx3.amp.PlugIn>}  Indexes plug-ins by their id. */
    /* @jsxobf-clobber */
    this._pluginmap = {};
    /* Maps plug-in id to registration index. */
    /* @jsxobf-clobber */
    this._pluginregorder = {__ct:0};
    /* {Object<String, jsx3.amp.ExtPoint>}  Indexes extension points by their id. */
    /* @jsxobf-clobber */
    this._extptmap = {};
    /* {Object<String, Array<jsx3.amp.Ext>>}  Indexes extensions by their point id. */
    /* @jsxobf-clobber */
    this._extmap = {};
    /* @jsxobf-clobber */
    this._rsrcserial = 0;
    /* @jsxobf-clobber */
    this._msgbus = jsx3.util.EventDispatcher.jsxclass.newInnerClass();
    /* @jsxobf-clobber */
    this._evtcnt = 0;
    /* Index of plug-in ID to XML data.
     * @jsxobf-clobber */
    this._pgdata = {};
    /* Index of plug-in ID to resource array.
     * @jsxobf-clobber */
    this._pgrsrc = {};
    /* @jsxobf-clobber */
    this._prog = new Prog(this);

    /* @jsxobf-clobber */
    this._loaded = false;
    this._load();
  };

  /** @private @jsxobf-clobber */
  Engine_prototype._load = jsx3.$Y(function(cb) {

    var strPath = amp.DIR + "/" + amp.DESCRIPTOR;

    var mainPluginsURI = amp.ADDIN.resolveURI(strPath);
    /* @Embed(source='../../../plugins/plugins.xml', type='xml') */
    var addinXML = new jsx3.xml.Document().load(mainPluginsURI);
    var addinXMLDone = this._loadPluginsDescriptor(addinXML, mainPluginsURI);

    addinXMLDone.when(jsx3.$F(function() {
      this._prog._start();
    }).bind(this));

    var mainXML = Engine._loadXML(this._server.resolveURI(strPath));
    var mainXMLDone = this._loadPluginsDescriptor(mainXML, addinXMLDone); // 2nd param just for temporal ordering

    var autoDone = this._checkAutoReg(mainXMLDone);   // param just for ordering
    var rv = jsx3.$Z(this._onFinished, this)(autoDone); // param just for ordering


    return rv;
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._checkAutoReg = jsx3.$Y(function(cb) {
    var autoRegPI = this.getPlugIn("jsx3.amp.autoreg");
    autoRegPI.load().when(function() {
      if (autoRegPI.hasProvider() && !autoRegPI.hasCompleted())
        autoRegPI.subscribe("done", function() { cb.done(); });
      else
        cb.done();
    });
  });
  
  /** @private @jsxobf-clobber */
  Engine_prototype._loadPluginsDescriptor = jsx3.$Y(function(cb) {
    var objXML = cb.args()[0];
    var xmlPath = cb.args()[1] || objXML.getSourceURL();

    amp.LOG.debug(jsx3._msg("amp.02", xmlPath));

    if (!objXML.hasError()) {
      var baseName = objXML.getBaseName();
      var uri = objXML.getNamespaceURI();

      if (baseName == "plugins" && amp.isNS(uri)) {
        var pathPrefix = new jsx3.net.URI(xmlPath).resolve("").toString();
        pathPrefix = pathPrefix.substring(0, pathPrefix.length - 1);
        var condRV = null;

        for (var i = objXML.getChildNodes().iterator(); i.hasNext(); ) {
          var objNode = i.next();
          if (objNode.getBaseName() == "plugin" && amp.isNS(objNode.getNamespaceURI())) {
            var c = this._registerPlugInFromRegEntry(objNode, pathPrefix);
            condRV = condRV ? condRV.and(c) : c;
          }
        }

        if (condRV) return condRV;
        cb.done();
      } else {
        amp.LOG.error(jsx3._msg("amp.04", baseName, uri));
        this.publish({subject: Engine.ERROR, xml:objXML});
        cb.done();
      }
    } else {
      amp.LOG.error(jsx3._msg("amp.03", objXML.getError()));
      this.publish({subject: Engine.ERROR, xml:objXML});
      cb.done();
    }
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._registerPlugInFromRegEntry = jsx3.$Y(function(cb) {
    var objElm = cb.args()[0], strPrefix = cb.args()[1];

    // keep track of number of plug-ins requested so we can report progress
    var id = objElm.getAttribute("id");
    this._pluginregorder[id] = this._pluginregorder.__ct++;
//    amp.LOG.debug("_registerPlugInFromRegEntry " + id);

    // Plug-in definition could be inlined in plugins.xml. For it to be inlined it either needs to declare
    // child elements or a class attribute. Normally, only an id would be specified, meaning we need to load the
    // plugin.xml file in the nested directory.
    var bInclude = objElm.getFirstChild() == null && objElm.getAttribute("class") == null;

    // Support the path="../" attribute of the <plugin> registration.
    var pathPrefix = objElm.getAttribute("path");
    if (pathPrefix)
      strPrefix = jsx3.net.URI.valueOf(strPrefix).resolve(pathPrefix).toString();

    return this._registerPlugIn(strPrefix, id, bInclude ? null : objElm);
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._registerPlugIn = jsx3.$Y(function(cb) {
    var args = cb.args();
    var strPath = args[0], strId = args[1], objXML = args[2];
    this._prog._add("p." + strId);

    if (!objXML) {
      var uri = (strPath ? strPath + "/" : "") + strId + "/" + amp.METAFILE;
      amp.LOG.debug(jsx3._msg("amp.01", uri, strId));
      objXML = Engine._loadXML(uri);
    }

    return this._onDescriptorResponse(strPath, strId, objXML);
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._onDescriptorResponse = jsx3.$Y(function(cb) {
    var args = cb.args();
    var strPath = args[0], strId = args[1], objXML = args[2];

    //    amp.LOG.debug("_onDescriptorResponse " + strId);
    this._prog._done("p." + strId);

    if (!objXML.hasError()) {
      var baseName = objXML.getBaseName();
      var uri = objXML.getNamespaceURI();

      if (baseName == "plugin" && amp.isNS(uri)) {
        return this._registerPlugInFromElm(strId, strPath, objXML);
      } else {
        amp.LOG.error(jsx3._msg("amp.05", strId, baseName, uri));
        cb.done();
      }
    } else {
      amp.LOG.error(jsx3._msg("amp.06", strId, objXML.getError()));
      cb.done();
    }
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._registerPlugInFromElm = jsx3.$Y(function(cb) {
    var args = cb.args();
    var strId = args[0], strPath = args[1], objElm = args[2];

    var id = objElm.getAttribute("id");
    if (!id || id != strId) {
      amp.LOG.error(jsx3._msg("amp.07", strId, id));
      cb.done();
    } else {
      var key = amp._getBestLocaleKey(objElm.getAttribute("locales"), this.getServer().getLocale());
      if (key) {
        this._getLocalizedDesc(strPath + "/" + strId, objElm, key).when(jsx3.$F(function() {
          cb.done(this._registerPlugInFromElm2(strId, strPath, objElm));
        }).bind(this));
      } else {
        return this._registerPlugInFromElm2(strId, strPath, objElm);
      }
    }
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._getLocalizedDesc = jsx3.$Y(function(cb) {
    var args = cb.args();
    var strPath = args[0], objElm = args[1], strKey = args[2];

    strPath += "/plugin." + strKey + ".xml";
    Engine._loadXML(strPath).when(jsx3.$F(function(xml) {
      if (xml && !xml.hasError())
        this._mergeLocalizedDoc(objElm, xml);
      else
        amp.LOG.error(jsx3._msg("amp.53", strPath, (xml ? xml.getError() : null)));
      
      cb.done();
    }).bind(this));
  });

  /** @private @jsxobf-clobber */
  Engine._MERGE_SKIP_XP = {script:1, method:1, field:1, processor:1};
  /** @private @jsxobf-clobber */
  Engine._MERGE_SKIP_X = {script:1, method:1, field:1};

  /** @private @jsxobf-clobber */
  Engine_prototype._mergeLocalizedDoc = function(xml, locData) {
    if (locData.getBaseName() != "plugin" || !amp.isNS(locData.getNamespaceURI())) {
      amp.LOG.error(jsx3._msg("amp.54", locData.getSourceURL()));
      return;
    }

    // 1. Overwrite all attributes of <plugin>
    jsx3.$A(locData.getAttributeNames()).each(function(e) {
      xml.setAttribute(e, locData.getAttribute(e));
    });

    // 2. Overwrite all contents of <extension-point> that are not script, method, field, processor
    this._mergeLocalizedDocClob(xml, locData, "extension-point", Engine._MERGE_SKIP_XP);

    // 3. Overwrite all contents of <extension> that are not script, method, field
    this._mergeLocalizedDocClob(xml, locData, "extension", Engine._MERGE_SKIP_X);
  };

  /** @private @jsxobf-clobber */
  Engine_prototype._mergeLocalizedDocClob = function(xml, locData, elmName, skipMap) {
    for (var i = locData.selectNodeIterator("amp:" + elmName + "[@id]", amp.getXmlNS(locData)); i.hasNext(); ) {
      var xpNode = i.next();
      var id = xpNode.getAttribute("id");
      var originalNode = xml.selectSingleNode('amp:' + elmName + '[@id="' + id + '"]', amp.getXmlNS(xml));

      if (originalNode) {
        jsx3.$A(xpNode.getAttributeNames()).each(function(e) {
          originalNode.setAttribute(e, xpNode.getAttribute(e));
        });

        var newChildren = xpNode.getChildNodes().toArray();
        if (newChildren.length > 0) {
          jsx3.$A(originalNode.getChildNodes().toArray().reverse()).each(function(e) {
            if (!amp.isNS(e.getNamespaceURI()) || !skipMap[e.getBaseName()]) {
              originalNode.removeChild(e);
            }
          });

          jsx3.$A(newChildren).each(function(e) {
            originalNode.appendChild(e);
          });
        }
      } else {
        amp.LOG.error(jsx3._msg("amp.55", xml.getAttribute("id"), elmName, id));
      }
    }
  };

  /** @private @jsxobf-clobber */
  Engine_prototype._registerPlugInFromElm2 = jsx3.$Y(function(cb) {
    var args = cb.args();
    var strId = args[0], strPath = args[1], objElm = args[2];

    // Save the XML metadata for each plug-in for later use.
    this._pgdata[strId] = objElm;
    var arrRsrc = this._createResources(objElm.selectSingleNode("amp:resources", amp.getXmlNS(objElm)), strId, strPath);

    var reqDone = this._requiredAreReg(strId, objElm);
    var earlyDone = this._loadEarlyRsrc(strId, arrRsrc, reqDone); // 3th param just for ordering
    return jsx3.$Z(this._createPlugIn, this)(strId, strPath, objElm, arrRsrc, earlyDone); // 5th param just for ordering
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._requiredAreReg = jsx3.$Y(function(cb) {
    var args = cb.args();
    var strId = args[0], objElm = args[1];

    // All required plug-ins will be registered/instantiated before this plug-in is.
    var reqs = this._getRequires(objElm);

    reqs = reqs.filter(jsx3.$F(function(e) {
      var isReg = this.getPlugIn(e);

      // Warn when a plug-in is registered before a plug-in that it requires. Possible typo!
      if (!isReg && !this._pluginregorder[e])
        amp.LOG.warn(jsx3._msg("amp.26", strId, e));

      return !isReg;
    }).bind(this));

    if (reqs.length > 0) {
      var evtHandler = jsx3.$F(function(e) {
        reqs.remove(e.plugin.getId());
        if (reqs.length == 0) {
          this.unsubscribe(Engine.REGISTER, evtHandler);
          cb.done();
        }
      }).bind(this);
      this.subscribe(Engine.REGISTER, evtHandler);

    } else {
      cb.done();
    }
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._loadEarlyRsrc = jsx3.$Y(function(cb) {
    var args = cb.args();
    var strId = args[0], arrRsrc = args[1];
    // We need to know the resources of the plug-in before it actually loads so that we can load any resource that
    // is load="early" before creating the plug-in instance.

    var rsrcMap = {};
    arrRsrc.each(function(e) { rsrcMap[e.getLocalId()] = e; });
    this._pgrsrc[strId] = rsrcMap;

    var condRV = null;

    arrRsrc.each(jsx3.$F(function(e) {
      if (e.getLoadType() == amp.Resource.LOAD_EARLY) {
        var c = this._loadResourcePvt(e);
        condRV = condRV ? condRV.and(c) : c;
      }
    }).bind(this));

    if (condRV) return condRV;
    cb.done();
  });
  
  /** @private @jsxobf-clobber */
  Engine_prototype._createResources = function(objElm, strPlugInId, strPath) {
//    amp.LOG.debug("_createResources " + objElm);
    var idMap = {};
    
    var r = jsx3.$A();
    if (objElm) {
      for (var i = objElm.getChildNodes().iterator(); i.hasNext(); ) {
        var e = i.next();
    
        if (amp.isNS(e.getNamespaceURI())) {
          var id = e.getAttribute("id");

          if (idMap[id]) {
            amp.LOG.error(jsx3._msg("amp.08", id, strPlugInId));
            id = null;
          }
          
          if (id == null || id == "")
            id = "_assigned_" + strPlugInId + "_" + (++this._rsrcserial);
          
          var rsrc = amp.Resource._newBeforePlugIn(strPlugInId, strPath + "/" + strPlugInId + "/", id, e, this);
          
          for (var j = e.selectNodeIterator("amp:prereq", amp.getXmlNS(e)); j.hasNext(); ) {
            var n = j.next();
            var nid = n.getAttribute("id");
            if (nid)
              rsrc._addPrereq(nid, "rsrc");
            else
              rsrc._addPrereq(n.getAttribute("plugin"), "plugin");
          }

          r.push(rsrc);
          idMap[id] = rsrc;
        }
      }
    }
    
    return r;
  };

  /** @private @jsxobf-clobber */
  Engine_prototype._getRequires = function(objElm) {
    var r = jsx3.$A();
    for (var i = objElm.selectNodeIterator("amp:requires/amp:plugin", amp.getXmlNS(objElm)); i.hasNext(); )
      r.push(i.next().getAttribute("id"));
    return r;
  };
  
  /** @private @jsxobf-clobber */
  Engine_prototype._onProgress = function() {
    var pct = this._prog.pct();

    var objEvt = {subject:Engine.PROGRESS, pct:100*pct};
    if (pct >= 1)
      objEvt.done = true;

    this.publish(objEvt);
  };
  
  /** @private @jsxobf-clobber */
  Engine_prototype._createPlugIn = function(strId, strPath, objElm, arrRsrc) {
    var bGlobal = objElm.getAttribute("global");
    if (bGlobal && Engine._GLOBAL_PLUGINS[strId]) {

    }
    
    // Jump through some hoops if a specific class is specified for the plug-in instance. The class must either
    // be defined before this engine initializes or the <plugin> element must define a classfile attribute that 
    // is the relative path to a JavaScript file that defines the class.
    var c;
    var className = objElm.getAttribute("class");
    if (className) {
      c = amp._getConstructor(className);
      if (!c)
        amp.LOG.error(jsx3._msg("amp.09", className, strId));
    } 
    if (!c) c = amp.PlugIn;

//    amp.LOG.debug("_createPlugIn " + strId);
    
    // create the plug-in
    var p = new c();
    
    if (typeof(p.setEngine) == "function")
      p.setEngine(this);
    if (typeof(p.setPath) == "function")
      p.setPath(strPath + "/" + strId);
    if (typeof(p.setData) == "function")
      p.setData(objElm);
    if (typeof(p.setResources) == "function")
      p.setResources(arrRsrc);

    this._plugins.push(p);
    this._pluginmap[strId] = p;
    amp.LOG.debug(jsx3._msg("amp.10", p));
    
    // register all extension points with this engine
    var pts = p.getExtPoints();
    for (var i = 0; i < pts.length; i++)
      this._addExtPoint(pts[i]);
    
    var ptsExtended = {};

    // register all extensions with this engine
    var exs = p.getExts();
    for (var i = 0; i < exs.length; i++) {
      var ex = exs[i];
      var pointId = ex.getPointId();

      this._addExt(ex);

      if (!ptsExtended[pointId]) ptsExtended[pointId] = jsx3.$A();
      ptsExtended[pointId].push(ex);
    }

    Engine._extendInstance(p, objElm);

    // Notify extension points that they have been extended.
    for (var pointId in ptsExtended) {
      var point = this._extptmap[pointId];
      if (point) {
        point.getPlugIn().onExtension(point, ptsExtended[pointId]);
        point.onExtension(ptsExtended[pointId]);
      }
    }

    for (var i = objElm.selectNodeIterator("amp:bindable", amp.getXmlNS(objElm)); i.hasNext(); ) {
      var node = i.next();
      var key = node.getAttribute("id");
      p.addBindableProp(key, node.getAttribute("value"));
      p[key] = null; // so that with{} block will not throw an error before prop is defined
      
      var evt = jsx3.$S(node.getAttribute("subscribe") || "").trim().split(/\s+/g);
      jsx3.$A(evt).each(jsx3.$F(function(e) {
        if (e)
          p.updateBindableOn(key, this._msgbus, e);
      }).bind(this));

      p.subscribe(key, this, "_forwardEvent");
    }

    // Wire event dispatches
    jsx3.$A(p.getEvents()).each(jsx3.$F(function (eventId) {
      p.subscribe(eventId, this, "_forwardEvent");
    }).bind(this));

    // Wire inline event subscribers
    this._regSubscriptions(p, objElm);

    p.onRegister();
    this.publish({subject:Engine.REGISTER, plugin:p});
  };

  /** @private @jsxobf-clobber */
  Engine_prototype._regSubscriptions = function(plugIn, objElm) {
    for (var i = objElm.selectNodeIterator("amp:subscribe", amp.getXmlNS(objElm)); i.hasNext(); ) {
      var n = i.next();
      var eventIds = n.getAttribute("event").split(/\s+/g);
      var handlerName = n.getAttribute("handler");
      var when = n.getAttribute("when");

      var fctBody = handlerName ? "this." + handlerName + "(evt);" : n.getValue();
      if (when == "load") {
        fctBody = "this.load().when(jsx3.$F(function(){" + fctBody + "}).bind(this));";
      } else if (when == "loaded") {
        fctBody = "if(this.isLoaded()){" + fctBody + "}";
      }

      for (var j = 0; j < eventIds.length; j++) {
        var methodName = "_evt_" + eventIds[j].replace(/\./g, "_") + "_" + (this._evtcnt++);
        var handler = jsx3.eval("var " + methodName + " = function(evt){" + fctBody + "}; " + methodName + ";");
        plugIn[methodName] = handler;
        this._msgbus.subscribe(eventIds[j], plugIn, methodName);
      }
    }
  };

  /** @private @jsxobf-clobber */
  Engine_prototype._forwardEvent = function(objEvent) {
    var e = jsx3.$O(objEvent).clone();
    e.subject = objEvent.target.getId() + "." + objEvent.subject;
    amp.LOG.debug(jsx3._msg("amp.13", e.subject));
    this._msgbus.publish(e);

    // OpenAjax Hub integration
    if (window.OpenAjax && OpenAjax.hub) {
      try {
        OpenAjax.hub.publish(e.subject, e);
      } catch (e) {
        amp.LOG.error(jsx3._msg("amp.17", e.subject), jsx3.NativeError.wrap(e));
      }
    }
  };

  /** @private @jsxobf-clobber-shared */
  Engine._extendInstance = function(obj, objElm) {
    for (var i = objElm.selectNodeIterator("amp:script | amp:field | amp:method", amp.getXmlNS(objElm)); i.hasNext(); ) {
      var n = i.next();
      var name = n.getBaseName();

      if ("script" == name) {
//        amp.LOG.debug("Eval script on " + obj);
        try {
          obj.eval(n.getValue());
        } catch (e) {
          amp.LOG.error(jsx3._msg("amp.14", obj), jsx3.NativeError.wrap(e));
        }
      } else if ("field" == name) {
        try {
//        amp.LOG.debug("Define field " + n.getAttribute("id") + " on " + obj);
          obj[n.getAttribute("id")] = obj.eval(n.getValue());
        } catch (e) {
          amp.LOG.error(jsx3._msg("amp.15", n.getAttribute("id"), obj), jsx3.NativeError.wrap(e));
        }
      } else if ("method" == name) {
//        amp.LOG.debug("Define method " + n.getAttribute("id") + " on " + obj);
        try {
          var id = n.getAttribute("id");
          if (n.getAttribute("lazy") == "true") {
            fct = this._makeLazyFct(id);
          } else {
            var p = n.getAttribute("params") || "";
            var fct = jsx3.eval("var " + id + " = function(" + p + ") {" + n.getValue() + "}; " + id + ";");
            if (n.getAttribute("async") == "true")
              fct = jsx3.$Y(fct);
          }

          obj[id] = fct;
        } catch (e) {
          amp.LOG.error(jsx3._msg("amp.16", n.getAttribute("id"), obj), jsx3.NativeError.wrap(e));
        }
      }

      // Remove the node from the XML so that extension processing is not messed up.
      n.getParent().removeChild(n);
    }
  };

  /** @private @jsxobf-clobber */
  Engine._makeLazyFct = function(strMethod) {
    return function() {
      this.load().when(jsx3.$F(function(methodName, arrArgs) {
        this[methodName].apply(this, arrArgs);
      }).bind(this, [strMethod, arguments]));
    };
  };

  /**
   * Returns true if all of the AMP and project plug-ins have been registered.
   * @return {boolean}
   */
  Engine_prototype.isLoaded = function() {
    return this._loaded;
  };

  /**
   * Returns the application associated with this engine.
   * @return {jsx3.app.Server}
   */
  Engine_prototype.getServer = function() {
    return this._server;
  };

  /**
   * Returns all registered plug-ins.
   * @return {jsx3.$Array<jsx3.amp.PlugIn>}
   */
  Engine_prototype.getPlugIns = function() {
    return this._plugins;
  };

  /**
   * Returns a registered plug-in by ID.
   * @param strId {String}
   * @return {jsx3.amp.PlugIn}
   */
  Engine_prototype.getPlugIn = function(strId) {
    return this._pluginmap[strId];
  };

  /**
   * Returns a registered extension point by ID.
   * @param strId {String} the ID of the extension point.
   * @return {jsx3.amp.ExtPoint}
   */
  Engine_prototype.getExtPoint = function(strId) {
    return this._extptmap[strId];
  };

  /**
   * Returns the extensions registered for a given extension point ID.
   * @param strId {String} the ID of the extension point.
   * @return {jsx3.$Array<jsx3.amp.Ext>}
   */
  Engine_prototype.getExts = function(strId) {
    var a = this._extmap[strId];

    if (a && a._needssort) {
      a.sort(jsx3.$F(function(a, b) {
        var i1 = this._pluginregorder[a.getPlugIn().getId()] || 0;
        var i2 = this._pluginregorder[b.getPlugIn().getId()] || 0;
        return i1 > i2 ? 1 : (i1 == i2 ? 0 : -1);
      }).bind(this));
      a._needssort = false;
    }

    return a || jsx3.$A();
  };

  /**
   * Registers a plug-in manually at runtime. Only plug-ins not referenced in the main plugins.xml file should
   * be loaded in this way.
   * @param strId {String} the plug-in ID.
   * @param strPath {String} the relative path from the application directory to the directory containing the
   *    plug-in directory.
   * @param objXML {jsx3.xml.Entity} the optional XML declaration of the plug-in. Providing this parameter prevents
   *    this method from requesting the plug-in descriptor file.
   */
  Engine_prototype.register = jsx3.$Y(function(cb) {
    var args = cb.args();
    var strId = args[0];
    var strPath = args[1];
    var objXML = args[2];

    if (this._pluginmap[strId])
      throw new jsx3.IllegalArgumentException("Already loaded plug-in " + strId + ".");

    this._pluginregorder[strId] = this._pluginregorder.__ct++;
    return this._registerPlugIn(strPath, strId, objXML);
  });

  /**
   * Deregisters a plug-in from this engine. Note that garbage collection may be incomplete if application code
   * references the plug-in or any of its extension points or extensions. Also, this method does not unload any
   * JavaScript, CSS, or XML resources from the browser page or the AMP application. Unexpecting things may happen
   * if this method is called while the plug-in is still loading.
   * 
   * @param strId {String} the ID of the plug-in to deregister.
   */
  Engine_prototype.deregister = function(strId) {
    var p = this.getPlugIn(strId);
    if (p) {
      this._plugins.remove(p);

      var xp = p.getExtPoints();
      for (var i = 0; i < xp.length; i++)
        this._removeExtPoint(xp[i]);

      var exts = p.getExts();
      for (var i = 0; i < exts.length; i++)
        this._removeExt(exts[i]);

      delete this._pluginmap[strId];
      delete this._pluginregorder[strId];
      delete this._pgdata[strId];
      delete this._pgrsrc[strId];
    }
  };

  /**
   * @param xp {jsx3.amp.ExtPoint}
   * @package @jsxobf-clobber-shared
   */
  Engine_prototype._addExtPoint = function(xp) {
    amp.LOG.debug(jsx3._msg("amp.11", xp));
    this._extptmap[xp.getId()] = xp;
  };

  /**
   * @param xp {jsx3.amp.ExtPoint}
   * @package @jsxobf-clobber-shared
   */
  Engine_prototype._removeExtPoint = function(xp) {
    var xpid = xp.getId();
    delete this._extptmap[xpid];
  };

  /**
   * @param x {jsx3.amp.Ext}
   * @package @jsxobf-clobber-shared
   */
  Engine_prototype._addExt = function(x, bPub) {
    var pointId = x.getPointId();

    if (!this._extmap[pointId])
      this._extmap[pointId] = jsx3.$A();

    this._extmap[pointId].push(x);
    /* @jsxobf-clobber */
    this._extmap[pointId]._needssort = true;

    amp.LOG.debug(jsx3._msg("amp.12", x, pointId));

    if (bPub) {
      var point = this._extptmap[pointId];
      if (point) {
        point.getPlugIn().onExtension(point, [x]);
        point.onExtension([x]);
      }
    }
  };

  /**
   * @param x {jsx3.amp.Ext}
   * @package @jsxobf-clobber-shared
   */
  Engine_prototype._removeExt = function(x) {
    var extList = this._extmap[x.getPointId()];
    if (extList)
      extList.remove(x);
  };

  /** @private @jsxobf-clobber-shared */
  Engine_prototype._loadPlugIn = jsx3.$Y(function(cb) {
    var objPlugIn = cb.args()[0];
    //    amp.LOG.debug("_loadPlugIn " + objPlugIn);

    var presDone = this._loadPrereqPlugIns(objPlugIn);


    var rsrcDone = this._loadNormalRsrcs(objPlugIn, presDone); // 2nd parameter for ordering only
    var rv = jsx3.$Z(this._onAfterPlugInLoaded, this)(objPlugIn, rsrcDone); // 2nd parameter for ordering only


    return rv;
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._loadPrereqPlugIns = jsx3.$Y(function(cb) {
    var objPlugIn = cb.args()[0];

    var condRV = null;

    var arrReqs = objPlugIn.getRequires();
    arrReqs.each(jsx3.$F(function(e) {
      var p = this.getPlugIn(e);
      if (p) {
        if (!p.isLoaded()) {
          var c = p.load();
          condRV = condRV ? condRV.and(c) : c;
        }
      } else {
        amp.LOG.error(jsx3._msg("amp.18", objPlugIn, e));
      }
    }).bind(this));

    if (condRV) return condRV;
    else cb.done();
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._loadNormalRsrcs = jsx3.$Y(function(cb) {
    var objPlugIn = cb.args()[0];
    var condRV = null;

    var arrRsrc = objPlugIn.getResources();
    arrRsrc.each(function(r) {
      if (!r.isLoaded() && r.getLoadType() == amp.Resource.LOAD_NORMAL) {
        var c = r.load();
        condRV = condRV ? condRV.and(c) : c;
      }
    });

    if (condRV) return condRV;
    else cb.done();
  });

  /** @private @jsxobf-clobber */
  Engine_prototype._onAfterPlugInLoaded = function(objPlugIn) {
//    amp.LOG.debug("_onAfterPlugInLoaded " + objPlugIn.getId() + " " + this._pgdata[objPlugIn.getId()]);

    var data = this._pgdata[objPlugIn.getId()];
    if (data) {
      // gc
      delete this._pgdata[objPlugIn.getId()];
      delete this._pgrsrc[objPlugIn.getId()];

      objPlugIn.getBindableProps().each(function(e) {
        objPlugIn.updateBindable(e);
      });

      var propName = data.getAttribute("property");
      if (propName)
        jsx3.lang.setVar(objPlugIn.isGlobal() ? propName :
                           objPlugIn.getServer().getEnv("namespace") + "." + propName, objPlugIn);
    }

    objPlugIn._onLastResourceLoaded();
    amp.LOG.debug(jsx3._msg("amp.43", objPlugIn));
  };
  
  /** @private @jsxobf-clobber-shared */
  Engine_prototype._loadResourceShared = jsx3.$Y(function(cb) {
    var objResource = cb.args()[0];
    objResource._engineStart();

    var presDone = this._loadResourcePres(objResource, objResource.getPlugIn());
    this._loadResourceReal(objResource, presDone /* for ordering only */).when(function(data) {
      objResource._engineFinish(data);
      cb.done();
    });
  });
  
  /** @private @jsxobf-clobber */
  Engine_prototype._loadResourcePvt = jsx3.$Y(function(cb) {
    var args = cb.args();
    var objResource = args[0];

    this._loadResourcePres(objResource).when(function() {
      objResource.load().when(cb);
    });
  });

  Engine_prototype._getSiblingResource = function(r, id) {
    var p = r.getPlugIn();
    return p ? p.getResource(id) : this._pgrsrc[r._pluginid][id];
  };

  /** @private @jsxobf-clobber */
  Engine_prototype._loadResourcePres = jsx3.$Y(function(cb) {
    var args = cb.args();
    var objResource = args[0];
    
    var condRV = null;

    var arrPres = objResource._getPrereqs();

    arrPres.each(jsx3.$F(function(e) {
      var c = null;
      
      if (e.type == "plugin") {
        var plugIn = this.getPlugIn(e.id);
        if (plugIn) {
          if (!plugIn.isLoaded())
            c = plugIn.load();
        } else {
          amp.LOG.error(jsx3._msg("amp.20", e.id, objResource));
        }
      } else {
        var preReq = this._getSiblingResource(objResource, e.id);

        if (preReq) {
          if (!preReq.isLoaded())
            c = preReq.load();
        } else {
          amp.LOG.error(jsx3._msg("amp.21", e.id, objResource));
        }
      }

      if (c)
        condRV = condRV ? condRV.and(c) : c;
    }).bind(this));

    if (condRV) return condRV;
    else cb.done();
  });
  
  /** @private @jsxobf-clobber */
  Engine_prototype._onFinished = function() {
    this._loaded = true;

    for (var i = 0; i < this._plugins.length; i++)
      this._plugins[i].onStartup();

    this.publish({subject: Engine.LOAD});
  };

  /** @private @jsxobf-clobber */
  Engine_prototype._getRsrcCache = function(objServer, strType) {
    if ("shared" == strType)
      return jsx3.getSharedCache();
    else if ("system" == strType)
      return jsx3.getSystemCache();
    else
      return objServer.getCache();
  };

  /** @private @jsxobf-clobber */
  Engine_prototype._loadResourceReal = jsx3.$Y(function(cb) {
    var objResource = cb.args()[0];

    var objServer = this.getServer();
    var strRsrcPath = objResource.getPathForLocale(objServer.getLocale());
    var strType = objResource.getType();

    var progId = "r." + objResource.getId();
    this._prog._add(progId);
    
    var cache = this._getRsrcCache(objServer, objResource.attr("cache"));
    var cacheid = objResource.attr("cachekey");
    if (!cacheid) {
      if (strRsrcPath && cache != objServer.getCache())
        cacheid = jsx3.resolveURI(objResource.getFullPath(strRsrcPath));
      else
        cacheid = objResource.getId();
    }

    if (strRsrcPath) {
      var strSrc = objResource.getFullPath(strRsrcPath);
      amp.LOG.debug(jsx3._msg("amp.52", objResource, strSrc));

//      amp.LOG.debug("_newResourceJob " + objResource + " " + strSrc);
      var onDone = jsx3.$F(function(rv) {
        amp.LOG.debug(jsx3._msg("amp.23", objResource, strSrc));
        this._prog._done(progId);
        cb.done(rv);
      }).bind(this);

      switch (strType) {
        case "script":
          if (objResource.attr("eval") == "true")
            Engine._loadText(strSrc).when(jsx3.$F(function(rv) {
              if (rv != null) {
                var target = objResource.getPlugIn() || jsx3;
                try {
                  target.eval(rv);
                } catch (e) {
                  amp.LOG.error(jsx3._msg("amp.32", strSrc, target), jsx3.NativeError.wrap(e));
                }
              } else {
                amp.LOG.error(jsx3._msg("amp.33", strSrc));
              }
              onDone();
            }).bind(this));
          else
            Engine._loadJS(strSrc).when(onDone);
          break;
        case "css":
          Engine._loadCSS(strSrc).when(onDone);
          break;
        case "jss":
          Engine._loadXML(strSrc).when(jsx3.$F(function(rv) {
            if (cache) cache.setDocument(cacheid, rv);
            objServer.JSS.loadXML(rv, cacheid);
            onDone(rv);
          }).bind(this));
          break;
        case "propsbundle":
          // properties bundle may not be versioned by locale
          jsx3.app.PropsBundle.getPropsAsync(objResource.getFullPath(), objServer.getLocale(), function(props) {
            objServer.LJSS.addParent(props);
            onDone(props);
          }, objServer.getCache());
          break;
        case "xml":
          Engine._loadXML(strSrc, jsx3.xml.CDF.Document.jsxclass).when(jsx3.$F(function(rv) {
            rv.convertProperties(this.getServer().getProperties());
            if (cache) cache.setDocument(cacheid, rv);
            onDone(rv);
          }).bind(this));
          break;
        case "xsl":
          Engine._loadXML(strSrc, jsx3.xml.XslDocument.jsxclass).when(jsx3.$F(function(rv) {
            if (cache) cache.setDocument(cacheid, rv);
            onDone(rv);
          }).bind(this));
          break;
        default:
          amp.LOG.error(jsx3._msg("amp.22", strType));
          onDone();
      }

    } else {
      amp.LOG.debug(jsx3._msg("amp.25", objResource));

      var xml = objResource.xml();
      var dataNode = xml.selectSingleNode("amp:data", amp.getXmlNS(xml));
      var objData = null;

      switch (strType) {
        case "script":
          if (objResource.attr("eval") == "true") {
            // Any load="early" resource will not have access to the PlugIn object, so they should not assume
            // "this" context.
            (objResource.getPlugIn() || jsx3).eval((dataNode || xml).getValue());
          } else if (!Engine._ONCE[objResource.getId()]) {
            // If eval is not true, this was probably inlined during a build process and should only be evaluated once.
            Engine._ONCE[objResource.getId()] = 1;
            jsx3.eval((dataNode || xml).getValue());
          }
          break;
        case "css":
          if (jsx3.CLASS_LOADER.IE) {
            var styleNode = document.createElement("style");
            styleNode.setAttribute("type", "text/css");
            document.getElementsByTagName("head")[0].appendChild(styleNode);
            styleNode.styleSheet.cssText = (dataNode || xml).getValue().toString();
          } else {
            jsx3.html.insertAdjacentHTML(document.getElementsByTagName("head")[0], "beforeEnd",
                    '<style type="text/css">\n' + (dataNode || xml).getValue() + "\n</style>");
          }
          break;
        case "jss":
          if (dataNode) {
            objServer.JSS.loadXML(dataNode.getFirstChild(), objResource.getId());
            objData = objServer.JSS;
          } else {
            amp.LOG.error(jsx3._msg("amp.29", objResource));
          }
          break;
        case "propsbundle":
        case "xml":
          if (dataNode) {
            objData = new jsx3.xml.CDF.Document(dataNode.getFirstChild());
            objData.convertProperties(this.getServer().getProperties());

            if (cache) cache.setDocument(cacheid, objData);

            if (strType == "propsbundle") {
              var basePath = objResource.getFullPath(dataNode.getAttribute("path"));
              if (cache) cache.setDocument(basePath, objData); // So that PropsBundle can find the document in the cache
              var props = jsx3.app.PropsBundle.getProps(basePath, objServer.getLocale(), cache);
              objServer.LJSS.addParent(props);
            }

          } else {
            amp.LOG.error(jsx3._msg("amp.29", objResource));
          }
          break;
        case "xsl":
          if (dataNode) {
            objData = new jsx3.xml.XslDocument(dataNode.getFirstChild());
            if (cache) cache.setDocument(cacheid, objData);
          } else {
            amp.LOG.error(jsx3._msg("amp.29", objResource));
          }
          break;
        default:
          amp.LOG.error(jsx3._msg("amp.22", strType));
      }

      this._prog._done(progId);
      cb.done(objData);
    }
  });

  /** @private @jsxobf-clobber */
  Engine._loadXML = jsx3.$Y(function(cb) {
    var args = cb.args();
    var path = args[0], objClass = args[1];

    var d = (objClass || jsx3.xml.Document.jsxclass).newInstance();
    d.setAsync(true);
    d.subscribe("*", function() {
      cb.done(d);
    });
    d.load(path);
  });

  /** @private @jsxobf-clobber */
  Engine._loadText = jsx3.$Y(function(cb) {
    var args = cb.args();
    var path = args[0];

    var r = jsx3.net.Request.open("GET", path, true);
    r.subscribe("*", function() {
      cb.done(r.getResponseText());
    });
    r.send();
  });

  /** @private @jsxobf-clobber */
  Engine._loadCSS = jsx3.$Y(function(cb) {
    return this._loadOnce(cb.args()[0], "_loadCSS2");
  });

  /** @private @jsxobf-clobber */
  Engine._loadCSS2 = jsx3.$Y(function(cb) {
    var path = cb.args()[0];

    // instance a new DOM element
    var element = document.createElement("link");
    element.href = path;
    element.rel = "stylesheet";
    element.type = "text/css";

    //bind the element to the browser DOM to begin loading the resource
    document.getElementsByTagName("head")[0].appendChild(element);
    cb.done();
  });

  /** @private @jsxobf-clobber */
  Engine._loadJS = jsx3.$Y(function(cb) {
    return this._loadOnce(cb.args()[0], "_loadJS2");
  });

  /** @private @jsxobf-clobber */
  Engine._loadJS2 = jsx3.$Y(function(cb) {
    var path = cb.args()[0];

    jsx3.CLASS_LOADER.loadJSFile(path, function() {
      cb.done();
    });
  });

  /** @private @jsxobf-clobber */
  Engine._ONCE = {};

  /** @private @jsxobf-clobber */
  Engine._loadOnce = jsx3.$Y(function(cb) {
    var path = cb.args()[0];

    var already = Engine._ONCE[path];
    if (already) {
      if (already instanceof jsx3.$AsyncRV)
        return already;
      else {
        cb.done();
      }
    } else {
      var fct = cb.args()[1];
      var retVal = Engine._ONCE[path] = this[fct](path);
      retVal.when(function() {
        Engine._ONCE[path] = 1;
      });
      return retVal;
    }
  });

  var Prog = function(eng) {
    // TODO: don't bother with tracking IDs when logic is confirmed correct
    this._eng = eng;
    this._ids = {};
    this._total = 0;
    this._donect = 0;
    this._on = 0;
  };

  jsx3.$O(Prog.prototype).extend({
    /* @jsxobf-clobber */
    _start: function() {
      this._on = 1;
    },

    /* @jsxobf-clobber */
    _add: function(id) {
      if (this._ids[id])
        amp.LOG.warn(jsx3._msg("amp.34", id));
      else {
        if (this._on) {
          this._ids[id] = 1;
          this._total++;
          this._eng._onProgress();
        } else {
          this._ids[id] = -1;
        }
      }
    },

    /* @jsxobf-clobber */
    _done: function(id) {
      var v = this._ids[id];

      if (v) {
        delete this._ids[id];

        if (v > 0) {
          this._donect++;
          this._eng._onProgress();
        }
      } else {
        amp.LOG.warn(jsx3._msg("amp.35", id));
      }
    },

    pct: function() {
      return this._total > 0 ? this._donect / this._total : 0;
    }
  });
  
});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _init
// @jsxobf-global-reserved  ui ide

jsx3.amp.Engine._init();