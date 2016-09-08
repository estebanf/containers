/**
 * @author martin.czuchra
 */


XMLNS = {
    ATOM:    "http://www.w3.org/2005/Atom",
    XHTML:    "http://www.w3.org/1999/xhtml",
    ERDF:    "http://purl.org/NET/erdf/profile",
    RDFS:    "http://www.w3.org/2000/01/rdf-schema#",
    RDF:    "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    RAZIEL: "http://b3mn.org/Raziel",

    SCHEMA: ""
};
//var $ = jQuery.noConflict();
//TODO kann kickstart sich vielleicht auch um die erzeugung von paketen/
// namespaces kmmern? z.b. requireNamespace("WAPAMA.Core.SVG");
var Kickstart = {
    started: false,
    callbacks: [],
    alreadyLoaded: [],
    PATH: '',

    load: function() { 
        Kickstart.started = false;
        Kickstart.kick(); 

    },

    kick: function() {
        
        WAPAMA.UI.initBrowserSupport();
        profileUUID = "022e1a0e-446a-4e30-8b1f-f5e799a6aa0b";
      /*  
        var diagramType = "io_business_process";
        if (WAPAMA.PROFILE === "io_spring_pipe" || WAPAMA.PROFILE === "io_camel_pipe") {
            diagramType = WAPAMA.PROFILE;
        }
        var formId = "#" + WAPAMA.PROFILE + "-form";
        if (!WAPAMA.RECORD || WAPAMA.RECORD === "") {
          profileUUID = top.$(formId).find("#io_uuid").text() || top.$(formId).find("#io_uuid").val() || "";
        } else {
          profileUUID = WAPAMA.RECORD;
        }
        
        //Get the status of pipe or process.
        try{
            if (profileUUID && profileUUID != '') {
                var statusURL = '/status_process/get_current_status?object='
                    + diagramType + '&field=io_status&recordUUID=' + profileUUID;
                jQuery.ajax({
                    async: false,
                    url: statusURL,
                    cache: false,
                    dataType: "json",
                    success: function(data){
                        //If the status of pipe is null, it will return an empty string.
                        if (data.current_status && data.current_status != '') {
                            WAPAMA.UI.setDiagramStatus(data.current_status);
                        }
                    }
                });
            }
        } catch (e) {
            WAPAMA.Log.error(e);
        }
        */
        
        //rootJSObject = WAPAMA.UI.getCurrentFormJSON();
        //var formId = WAPAMA.UI.getCurrentPropertyPaneFormId();
        //rootJSObjectOriginal = top.$.fn.get_form_original_json(formId).evalJSON();
        //rootJSObjectOriginal = WAPAMA.UI.getCurrentFormOriginalJSON();

        gAvailablePlugins = [];
        gShapeTypeNamesMap = {}; //A hashmap, key is stencil id of shape type, value is its name
     
        //gStencilSetJson = response.responseText;
        var allPlugins = {};
        var pluginArray = [{"name":"WAPAMA.Plugins.DragTracker.PoolDragTracker","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.ShapeHighlighting","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.PropertyWindow","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.KeysMove","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.DragDropResize","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.ContainerLayouter","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.ShapeRepository","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.SelectionFrame","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.Undo","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.View","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.AddDocker","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.DragTracker.LaneDragTracker","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.UUIDRepositorySave","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.CanvasResize","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.Toolbar","core":true,"properties":[]},
                           {"name":"WAPAMA.Plugins.Layouter.EdgeLayouter","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.Arrangement","core":false,"properties":[]},
                           {"name":"WAPAMA.Plugins.ShapeMenuPlugin","core":true,"properties":[]},
                           {"name":"WAPAMA.Plugins.CollapseSubprocess","core":true,"properties":[]}];
        /*
        * Edit for deleting an editing an diagram
        * DragDocker to block pointers editing
        * Renameshapes for renaming
        * Added by satish to handle view of diagram based on permission
        */
        if(WAPAMA.CONFIG.PERMISSION_TYPE > 2){
            pluginArray.push({"name":"WAPAMA.Plugins.Edit","core":false,"properties":[]});
            pluginArray.push({"name":"WAPAMA.Plugins.DragDocker","core":false,"properties":[]});
            pluginArray.push({"name":"WAPAMA.Plugins.RenameShapes","core":false,"properties":[]});
        }
        for (var i = 0; i < pluginArray.length; i++){
            var plugin = pluginArray[i];
            allPlugins[plugin.name] = plugin;
        }

        var availablePluginArray = ["WAPAMA.Plugins.Toolbar","WAPAMA.Plugins.UUIDRepositorySave","WAPAMA.Plugins.PropertyWindow","WAPAMA.Plugins.ShapeMenuPlugin","WAPAMA.Plugins.ShapeRepository","WAPAMA.Plugins.CanvasResize","WAPAMA.Plugins.View","WAPAMA.Plugins.DragDropResize","WAPAMA.Plugins.RenameShapes","WAPAMA.Plugins.Edit","WAPAMA.Plugins.Undo","WAPAMA.Plugins.Arrangement","WAPAMA.Plugins.DragDocker","WAPAMA.Plugins.AddDocker","WAPAMA.Plugins.SelectionFrame","WAPAMA.Plugins.ShapeHighlighting","WAPAMA.Plugins.KeysMove","WAPAMA.Plugins.Layouter.EdgeLayouter","WAPAMA.Plugins.ContainerLayouter","WAPAMA.Plugins.DragTracker.LaneDragTracker","WAPAMA.Plugins.DragTracker.PoolDragTracker","WAPAMA.Plugins.CollapseSubprocess"];
        for (var i = 0; i < availablePluginArray.length; i++)
        {
            var pluginName = availablePluginArray[i];
            var plugin = allPlugins[pluginName];
            if (plugin)
            {
                gAvailablePlugins.push(plugin);
            }
            else
            {
                WAPAMA.Log.warn("missing plugin " + pluginName);
            }
        }
           
        
        //console.profile("loading");
        if(!Kickstart.started) {
            // removecomment
            Kickstart.started = true;
            Kickstart.callbacks.each(function(callback){
                // call the registered callback asynchronously.
                window.setTimeout(callback, 1);
            });
        }
    },

    register: function(callback) {
        //TODO Add some mutual exclusion between kick and register calls.
        
        with(Kickstart) {
            if(started) window.setTimeout(callback, 1);
            else Kickstart.callbacks.push(callback)
        }
    },

    /**
     * Loads a js, assuring that it has only been downloaded once.
     * @param {String} url the script to load.
     */
    require: function(url) {
        // if not already loaded, include it.
        if(Kickstart.alreadyLoaded.member(url))
            return false;
        return Kickstart.include(url);
    },

    /**
     * Loads a js, regardless of whether it has only been already downloaded.
     * @param {String} url the script to load.
     */
    include: function(url) {

        // prepare a script tag and place it in html head.
        var head = document.getElementsByTagNameNS(XMLNS.XHTML, 'head')[0];
        var s = document.createElementNS(XMLNS.XHTML, "script");
        s.setAttributeNS(XMLNS.XHTML, 'type', 'text/javascript');
           s.src = Kickstart.PATH + url;

        //TODO macht es sinn, dass neue skript als letztes kind in den head
        // einzubinden (stichwort reihenfolge der skript tags)?
           head.appendChild(s);

        // remember this url.
        Kickstart.alreadyLoaded.push(url);

        return true;
    }
}

/*
$(document).ready(function() {    
    var topJQuery = top.$;
    topJQuery('#property-pane').delegate('input[type="checkbox"], input[type="file"]', 'change', function(){
       WAPAMA.UI.isSaved = false;
    });
    topJQuery('#property-pane').delegate('input, select, textarea', 'focusout', function(){
       WAPAMA.UI.isSaved = false;
    });
});
*/

// register kickstart as the new onload event listener on current window.
// previous listener(s) are triggered to launch with kickstart.
//Event.observe(window, 'load', Kickstart.load);