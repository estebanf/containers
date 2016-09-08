/**
 * Copyright (c) 2010-2011
 * Intalio, Inc.
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
*/
wapamaEditor=null;
if (!WAPAMA.Plugins) {
    WAPAMA.Plugins = {};
}  

if (!WAPAMA.Config) {
    WAPAMA.Config = {};
} 

WAPAMA.UI.overrideButton();

WAPAMA.Plugins.UUIDRepositorySave = WAPAMA.Plugins.AbstractPlugin.extend({
    
    facade: undefined,

    // Get from iframe parent page.
    currentUserId: "",

    construct: function(facade){
        this.facade = facade;

        var savecfg = {
            'name': WAPAMA.I18N.Save.save,
            'group': WAPAMA.I18N.Save.group,
            'functionality': function() {
                this._save(false);
            }.bind(this),
            'icon' : 'fa fa-floppy-o',
            'position': {
                "x": "0px",
                "y": "-1251px"
            },
            'isEnabled' : function () {
                var facade = this.facade;
                var permissions = facade.getUserPermissions();
                if (!profileUUID) {
                    return !facade.isBusy() && permissions["create"];
                }
                return !facade.isBusy() && permissions["update"];
            }.bind(this),
            'description': WAPAMA.I18N.Save.save,
            'index': 1,
            'minShape': 0,
            'maxShape': 0
        };              
        
        var validatecfg = {
           'name': WAPAMA.I18N.Save.validate,
           'group': WAPAMA.I18N.Save.group,
           'functionality': function() {
               this._validateDiagram();
           }.bind(this),
           'icon': 'fa fa-eraser',
           'position': {
               "x": "0px",
               "y": "-1908px"
           },
           'description': WAPAMA.I18N.Save.validate,
           'index':8
       };

        // offer the button config
        this.facade.offer(savecfg);
        this.autosaveFunction = function() { 
            setInterval(function(){
                this._save(true, false); 
            }, 3000);
        }.bind(this);
        this.facade.registerOnEvent(WAPAMA.CONFIG.SAVE_EVENT, function(event) {
            this._save(false, event.onClose);
        }.bind(this));

        if(WAPAMA.CONFIG.UUID_AUTOSAVE_ENABLED && WAPAMA.CONFIG.UUID_AUTOSAVE_INTERVAL > 0){
            var autosaveThis = this;
            setInterval(function(){
                autosaveThis._save(true, false, true); 
            }, parseInt(WAPAMA.CONFIG.UUID_AUTOSAVE_INTERVAL) * 1000);
        }
    },

    /**
     * Saves data by calling the backend.
     * @param asave determine whether the function is invoked by autosave
     *              True: by autosave | False: by save
     * @param onClose true if it needs to close the window after save success
     */
    _save: function(asave, onClose, isAutoSave) {

        if(!isAutoSave)
            addLoading($j('#canvas'));
        var svgDOM = DataManager.serialize(this.facade.getCanvas().getSVGRepresentation(true));
        // get the json and add properties label into
        var json = this.facade.getJSON();
        if (json.childShapes.length > 0 && json.stencil && json.stencil.id == "PipeDiagram") {
            var namespace = json.stencilset.namespace;
            var stencils = this.facade.getStencilSets()[namespace]._stencils;
            //json.stencil.name=stencils[json.stencilset.namespace+json.stencil.id]._jsonStencil.title
            json.childShapes.each(function(shape) {
                var stencil = stencils[namespace + shape.stencil.id];
                if (shape.stencil)
                    shape.stencil.name = stencil._jsonStencil.title;
                shape.propertyNames = new Object();
                stencil._properties.each(function(property) {
                    property = property[1];
                    shape.propertyNames[property._jsonProp.id] = property._jsonProp.title
                });

                for (var property in shape.properties) {
                    shape.properties[property] = String(shape.properties[property]).gsub("<", "&lt;");
                    shape.properties[property] = String(shape.properties[property]).gsub(">", "&gt;");
                    shape.properties[property] = String(shape.properties[property]).gsub("\"", "&quot;");
                    shape.properties[property] = String(shape.properties[property]).gsub("'", "&apos;");
                    shape.properties[property] = String(shape.properties[property]).gsub("%", "&#37;");
                }
            });
        }
        var serializedDOM = WAPAMA.UI.encode(json);

        //var rdf = this.getRDFFromDOM();
        // Send the request to the server.
        var saveData = {
            json: serializedDOM,
            svg: svgDOM,
            uuid: WAPAMA.UUID,
            action: 'edit'
        };
        sendAjaxCall("webmodeler/diagram/save", "POST", false, true, "json", saveData, handleWebModelerAjaxError, function(response) {
            if(!isAutoSave){
                if (response.error_message)
                    showErrorNotification(response.error_message);
                else
                    showNotification(response.success_message);
                removeLoading($j('#webBasedEditor'));
            }
    });

    return true;
  }

});

/**
 * Method to load model or create new one
 * (moved from editor handler)
 */
window.onWapamaResourcesLoaded = function() {
    var stencilset = WAPAMA.Utils.getParamFromUrl('stencilset') || WAPAMA.CONFIG.SSET;
    var editor_parameters = {
        id: WAPAMA.UUID,
        stencilset: {
            url: stencilset
        }
    };
    if(!(WAPAMA.UUID === undefined)) {
        
        editor_parameters.contentLoadedCallback = function(editorCallback) {
            // if empty diagram returned
            if (modelJSON === "") {
                modelJSON = "{}";
            }
            // set editor params
            WAPAMA.Log.debug('=============load diagram=============');
            editor_parameters.model = modelJSON.evalJSON();

            editorCallback(editor_parameters.model);
        };
        
        if (modelJSON === "") {
            modelJSON = "{}";
        }
        editor_parameters.model = modelJSON.evalJSON();
    }
    // finally open the editor:
    if(window.wapamaEditor != undefined){
        //delete window.wapamaEditor;
    }
    if(wapamaEditor){
        delete wapamaEditor;
        wapamaEditor = null;
    }
    wapamaEditor = new WAPAMA.Editor(editor_parameters);
};