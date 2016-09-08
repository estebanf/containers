/**
 * Copyright (c) 2005-2009 Wapama Project
 * Copyright (c) 2010-2011 Intalio, Inc.
 * 
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
 *
 *
 * @author martin.czuchra
 * @author Intalio, Inc.
 */
 
if(!WAPAMA) var WAPAMA = {};

if(!WAPAMA.CONFIG) WAPAMA.CONFIG = {};

WAPAMA.PANE = {
  /*
        "Designer": {
            "selector": "#designer-pane",
            "dom": top.$("#designer-pane").size() ? top.$("#designer-pane")[0] : "",
            "obj": top.$("#designer-pane")
        },
        "Property": {
            "selector": "#property-pane",
            "dom": top.$("#property-pane").size() ? top.$("#property-pane")[0] : "",
            "obj": top.$("#property-pane")
        },
        "Record": {
            "selector": "#record-view",
            "dom": top.$("#record-view").size() ? top.$("#record-view")[0] : "",
            "obj": top.$("#record-view")
        }
        */
}

WAPAMA.CONFIG.WEB_URL = "http://localhost";

//relative path to Diagram Resources
WAPAMA.CONFIG.RESOURCES = "";

WAPAMA.CONFIG.MENU_INDEX = {"File" : 1, "Edit" : 2, "Z-Order" : 3, "Undo" : 4, "Docker" : 5, "Help" : "ZZZZZZ"};

WAPAMA.CONFIG.UUID_URL = function(uuid, profile) {
  if (uuid === undefined) {
    uuid = WAPAMA.UUID;
  }
  if (profile === undefined) {
    profile = WAPAMA.PROFILE;
  }
  return WAPAMA.PATH + "uuidRepository?uuid="+ uuid + "&profile=" + profile;
};

WAPAMA.CONFIG.UUID_AUTOSAVE_INTERVAL;
WAPAMA.CONFIG.UUID_AUTOSAVE_ENABLED;
  
WAPAMA.CONFIG.VERSION_URL =        WAPAMA.CONFIG.ROOT_PATH + "VERSION";
WAPAMA.CONFIG.LICENSE_URL =        WAPAMA.CONFIG.ROOT_PATH + "LICENSE";

WAPAMA.CONFIG.SERVER_HANDLER_ROOT =     "";

WAPAMA.CONFIG.STENCILSET_HANDLER =     WAPAMA.CONFIG.SERVER_HANDLER_ROOT + "";
    
  /* Editor-Mode */
WAPAMA.CONFIG.MODE_READONLY =        "readonly";
WAPAMA.CONFIG.MODE_FULLSCREEN =     "fullscreen";
  
    
  /* Show grid line while dragging */
WAPAMA.CONFIG.SHOW_GRIDLINE = true;
WAPAMA.CONFIG.DISABLE_GRADIENT = false;

  /* Plugins */
WAPAMA.CONFIG.PLUGINS_ENABLED =     true;
WAPAMA.CONFIG.PLUGINS_CONFIG =      WAPAMA.CONFIG.ROOT_PATH + "plugins";
WAPAMA.CONFIG.PROFILE_PATH =        WAPAMA.CONFIG.ROOT_PATH + "profiles/";
WAPAMA.CONFIG.PLUGINS_FOLDER =      "Plugins/";
WAPAMA.CONFIG.PDF_EXPORT_URL =      WAPAMA.CONFIG.ROOT_PATH + "pdf";
WAPAMA.CONFIG.PNML_EXPORT_URL =     WAPAMA.CONFIG.ROOT_PATH + "pnml";
WAPAMA.CONFIG.SIMPLE_PNML_EXPORT_URL =  WAPAMA.CONFIG.ROOT_PATH + "simplepnmlexporter";
WAPAMA.CONFIG.DESYNCHRONIZABILITY_URL = WAPAMA.CONFIG.ROOT_PATH + "desynchronizability";
WAPAMA.CONFIG.IBPMN2BPMN_URL =      WAPAMA.CONFIG.ROOT_PATH + "ibpmn2bpmn";
WAPAMA.CONFIG.BPMN2YAWL_URL =       WAPAMA.CONFIG.ROOT_PATH + "bpmn2yawl";
WAPAMA.CONFIG.QUERYEVAL_URL =             WAPAMA.CONFIG.ROOT_PATH + "query";
WAPAMA.CONFIG.SYNTAXCHECKER_URL =     WAPAMA.CONFIG.ROOT_PATH + "syntaxchecker";
WAPAMA.CONFIG.VALIDATOR_URL =       WAPAMA.CONFIG.ROOT_PATH + "validator";
WAPAMA.CONFIG.AUTO_LAYOUTER_URL =     WAPAMA.CONFIG.ROOT_PATH + "layouter";
WAPAMA.CONFIG.SS_EXTENSIONS_FOLDER =    WAPAMA.CONFIG.ROOT_PATH + "stencilsets/extensions/";
WAPAMA.CONFIG.SS_EXTENSIONS_CONFIG =    WAPAMA.CONFIG.ROOT_PATH + "stencilsets/extensions/extensions.json"; 
WAPAMA.CONFIG.WAPAMA_NEW_URL =        "/new"; 
WAPAMA.CONFIG.STEP_THROUGH =        WAPAMA.CONFIG.ROOT_PATH + "stepthrough";
WAPAMA.CONFIG.STEP_THROUGH_CHECKER =    WAPAMA.CONFIG.ROOT_PATH + "stepthroughchecker";
WAPAMA.CONFIG.XFORMS_EXPORT_URL =     WAPAMA.CONFIG.ROOT_PATH + "xformsexport";
WAPAMA.CONFIG.XFORMS_EXPORT_ORBEON_URL =  WAPAMA.CONFIG.ROOT_PATH + "xformsexport-orbeon";
WAPAMA.CONFIG.XFORMS_IMPORT_URL =     WAPAMA.CONFIG.ROOT_PATH + "xformsimport";
WAPAMA.CONFIG.BPEL_EXPORT_URL =     WAPAMA.CONFIG.ROOT_PATH + "bpelexporter";
WAPAMA.CONFIG.BPEL4CHOR_EXPORT_URL =    WAPAMA.CONFIG.ROOT_PATH + "bpel4chorexporter";
WAPAMA.CONFIG.BPEL4CHOR2BPEL_EXPORT_URL = WAPAMA.CONFIG.ROOT_PATH + "bpel4chor2bpelexporter";
WAPAMA.CONFIG.TREEGRAPH_SUPPORT =     WAPAMA.CONFIG.ROOT_PATH + "treegraphsupport";
WAPAMA.CONFIG.XPDL4CHOR2BPEL4CHOR_TRANSFORMATION_URL = WAPAMA.CONFIG.ROOT_PATH + "xpdl4chor2bpel4chor";
WAPAMA.CONFIG.RESOURCE_LIST =       WAPAMA.CONFIG.ROOT_PATH + "resourceList";
WAPAMA.CONFIG.BPMN_LAYOUTER =       WAPAMA.CONFIG.ROOT_PATH + "bpmnlayouter";
WAPAMA.CONFIG.EPC_LAYOUTER =        WAPAMA.CONFIG.ROOT_PATH + "epclayouter";
WAPAMA.CONFIG.BPMN2MIGRATION =      WAPAMA.CONFIG.ROOT_PATH + "bpmn2migration";
WAPAMA.CONFIG.BPMN20_SCHEMA_VALIDATION_ON = true;
WAPAMA.CONFIG.JPDLIMPORTURL =       WAPAMA.CONFIG.ROOT_PATH + "jpdlimporter";
WAPAMA.CONFIG.JPDLEXPORTURL =       WAPAMA.CONFIG.ROOT_PATH + "jpdlexporter";
WAPAMA.CONFIG.CPNTOOLSEXPORTER =      WAPAMA.CONFIG.ROOT_PATH + "cpntoolsexporter";
WAPAMA.CONFIG.CPNTOOLSIMPORTER =      WAPAMA.CONFIG.ROOT_PATH + "cpntoolsimporter";
WAPAMA.CONFIG.BPMN2XPDLPATH =       WAPAMA.CONFIG.ROOT_PATH + "bpmn2xpdl";
WAPAMA.CONFIG.TBPMIMPORT =        WAPAMA.CONFIG.ROOT_PATH + "tbpmimport";



  /* Namespaces */
WAPAMA.CONFIG.NAMESPACE_WAPAMA =      "http://www.wapama.net/diagram";
WAPAMA.CONFIG.NAMESPACE_SVG =       "http://www.w3.org/2000/svg";

  /* UI */
WAPAMA.CONFIG.CANVAS_WIDTH =        990;
WAPAMA.CONFIG.CANVAS_HEIGHT =       533;
WAPAMA.CONFIG.CANVAS_RESIZE_INTERVAL =  300;
WAPAMA.CONFIG.SELECTED_AREA_PADDING =   4;
WAPAMA.CONFIG.CANVAS_BACKGROUND_COLOR = "none";
WAPAMA.CONFIG.GRID_DISTANCE =       30;
WAPAMA.CONFIG.GRID_ENABLED =        true;
WAPAMA.CONFIG.ZOOM_OFFSET =       0.1;
WAPAMA.CONFIG.DEFAULT_SHAPE_MARGIN =    60;
WAPAMA.CONFIG.SCALERS_SIZE =        7;
WAPAMA.CONFIG.MINIMUM_SIZE =        20;
WAPAMA.CONFIG.MAXIMUM_SIZE =        10000;
WAPAMA.CONFIG.OFFSET_MAGNET =       15;
WAPAMA.CONFIG.OFFSET_EDGE_LABEL_TOP =   14;
WAPAMA.CONFIG.OFFSET_EDGE_LABEL_BOTTOM =  12;
WAPAMA.CONFIG.OFFSET_EDGE_BOUNDS =    5;
WAPAMA.CONFIG.COPY_MOVE_OFFSET =      30;
WAPAMA.CONFIG.SHOW_GRIDLINE =             true;

WAPAMA.CONFIG.BORDER_OFFSET =       14;

WAPAMA.CONFIG.MAX_NUM_SHAPES_NO_GROUP = 0;
WAPAMA.CONFIG.PIPE_MAX_NUM_STENCIL_BUTTONS = 1;
WAPAMA.CONFIG.BPM_MAX_NUM_STENCIL_BUTTONS = 6;

WAPAMA.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER = 30;
WAPAMA.CONFIG.SHAPEMENU_CREATE_OFFSET = 45;

  /* Shape-Menu Align */
WAPAMA.CONFIG.SHAPEMENU_RIGHT =     "Wapama_Right";
WAPAMA.CONFIG.SHAPEMENU_BOTTOM =      "Wapama_Bottom";
WAPAMA.CONFIG.SHAPEMENU_LEFT =      "Wapama_Left";
WAPAMA.CONFIG.SHAPEMENU_TOP =       "Wapama_Top";

  /* Morph-Menu Item */
WAPAMA.CONFIG.MORPHITEM_DISABLED =    "Wapama_MorphItem_disabled";

  /* Property type names */
WAPAMA.CONFIG.TYPE_STRING =       "string";
WAPAMA.CONFIG.TYPE_BOOLEAN =        "boolean";
WAPAMA.CONFIG.TYPE_INTEGER =        "integer";
WAPAMA.CONFIG.TYPE_FLOAT =        "float";
WAPAMA.CONFIG.TYPE_COLOR =        "color";
WAPAMA.CONFIG.TYPE_DATE =         "date";
WAPAMA.CONFIG.TYPE_CHOICE =       "choice";
WAPAMA.CONFIG.TYPE_DYNAMIC_CHOICE =   "dynamicchoice";
WAPAMA.CONFIG.TYPE_URL =          "url";
WAPAMA.CONFIG.TYPE_DIAGRAM_LINK =     "diagramlink";
WAPAMA.CONFIG.TYPE_COMPLEX =        "complex";
WAPAMA.CONFIG.TYPE_TEXT =         "text";
WAPAMA.CONFIG.TYPE_PASSWORD =       "password";
WAPAMA.CONFIG.TYPE_XPATH =        "xpath";
WAPAMA.CONFIG.TYPE_MAPPINGEDITOR =    "mappingeditor";
  /* Vertical line distance of multiline labels */
WAPAMA.CONFIG.LABEL_LINE_DISTANCE =   2;
WAPAMA.CONFIG.LABEL_DEFAULT_LINE_HEIGHT = 12;

WAPAMA.CONFIG.ENABLE_MORPHMENU_BY_HOVER = true;

  /* Editor constants come here */
WAPAMA.CONFIG.EDITOR_ALIGN_BOTTOM =   0x01;
WAPAMA.CONFIG.EDITOR_ALIGN_MIDDLE =   0x02;
WAPAMA.CONFIG.EDITOR_ALIGN_TOP =      0x04;
WAPAMA.CONFIG.EDITOR_ALIGN_LEFT =     0x08;
WAPAMA.CONFIG.EDITOR_ALIGN_CENTER =   0x10;
WAPAMA.CONFIG.EDITOR_ALIGN_RIGHT =    0x20;
WAPAMA.CONFIG.EDITOR_ALIGN_SIZE =     0x30;

  /* Event types */
WAPAMA.CONFIG.EVENT_MOUSEDOWN =     "mousedown";
WAPAMA.CONFIG.EVENT_MOUSEUP =       "mouseup";
WAPAMA.CONFIG.EVENT_MOUSEOVER =     "mouseover";
WAPAMA.CONFIG.EVENT_MOUSEOUT =      "mouseout";
WAPAMA.CONFIG.EVENT_MOUSEMOVE =     "mousemove";
WAPAMA.CONFIG.EVENT_DBLCLICK =      "dblclick";
WAPAMA.CONFIG.EVENT_CLICK =             'click';
WAPAMA.CONFIG.EVENT_KEYDOWN =       "keydown";
WAPAMA.CONFIG.EVENT_KEYUP =       "keyup";

WAPAMA.CONFIG.EVENT_LOADED =        "editorloaded";
WAPAMA.CONFIG.EVENT_SS_LOADED_ON_STARTUP =  "stencilSetLoadedOnStartup"
WAPAMA.CONFIG.EVENT_EXECUTE_COMMANDS =    "executeCommands";
WAPAMA.CONFIG.EVENT_TOOLBAR_REFRESH =     "toolbarRefresh";
WAPAMA.CONFIG.EVENT_STENCIL_SET_LOADED =    "stencilSetLoaded";
WAPAMA.CONFIG.EVENT_SELECTION_CHANGED =   "selectionchanged";
WAPAMA.CONFIG.EVENT_SHAPEADDED =        "shapeadded";
WAPAMA.CONFIG.EVENT_PROPERTY_CHANGED =    "propertyChanged";
WAPAMA.CONFIG.EVENT_DRAGDROP_START =      "dragdrop.start";
WAPAMA.CONFIG.EVENT_SHAPE_MENU_CLOSE =    "shape.menu.close";
WAPAMA.CONFIG.EVENT_DRAGDROP_END =      "dragdrop.end";
WAPAMA.CONFIG.EVENT_RESIZE_START =      "resize.start";
WAPAMA.CONFIG.EVENT_RESIZE_END =        "resize.end";
WAPAMA.CONFIG.EVENT_DRAGDOCKER_DOCKED =   "dragDocker.docked";
WAPAMA.CONFIG.EVENT_HIGHLIGHT_SHOW =      "highlight.showHighlight";
WAPAMA.CONFIG.EVENT_HIGHLIGHT_HIDE =      "highlight.hideHighlight";
WAPAMA.CONFIG.EVENT_LOADING_ENABLE =      "loading.enable";
WAPAMA.CONFIG.EVENT_LOADING_DISABLE =     "loading.disable";
WAPAMA.CONFIG.EVENT_LOADING_STATUS =      "loading.status";
WAPAMA.CONFIG.EVENT_OVERLAY_SHOW =      "overlay.show";
WAPAMA.CONFIG.EVENT_OVERLAY_HIDE =      "overlay.hide";
WAPAMA.CONFIG.EVENT_ARRANGEMENT_TOP =     "arrangement.setToTop";
WAPAMA.CONFIG.EVENT_ARRANGEMENT_BACK =    "arrangement.setToBack";
WAPAMA.CONFIG.EVENT_ARRANGEMENT_FORWARD =   "arrangement.setForward";
WAPAMA.CONFIG.EVENT_ARRANGEMENT_BACKWARD =  "arrangement.setBackward";
//WAPAMA.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED = "propertyWindow.propertyChanged";
WAPAMA.CONFIG.EVENT_LAYOUT_ROWS =       "layout.rows";
WAPAMA.CONFIG.EVENT_LAYOUT_BPEL =       "layout.BPEL";
WAPAMA.CONFIG.EVENT_LAYOUT_BPEL_VERTICAL =    "layout.BPEL.vertical";
WAPAMA.CONFIG.EVENT_LAYOUT_BPEL_HORIZONTAL =  "layout.BPEL.horizontal";
WAPAMA.CONFIG.EVENT_LAYOUT_BPEL_SINGLECHILD = "layout.BPEL.singlechild";
WAPAMA.CONFIG.EVENT_LAYOUT_BPEL_AUTORESIZE =  "layout.BPEL.autoresize";
WAPAMA.CONFIG.EVENT_AUTOLAYOUT_LAYOUT =   "autolayout.layout";
WAPAMA.CONFIG.EVENT_UNDO_EXECUTE =      "undo.execute";
WAPAMA.CONFIG.EVENT_UNDO_ROLLBACK =     "undo.rollback";
WAPAMA.CONFIG.EVENT_BUTTON_UPDATE =           "toolbar.button.update";
WAPAMA.CONFIG.EVENT_LAYOUT =          "layout.dolayout";
WAPAMA.CONFIG.EVENT_COLOR_CHANGE =      "color.change";
WAPAMA.CONFIG.EVENT_DOCKERDRAG =        "dragTheDocker";  
WAPAMA.CONFIG.EVENT_SHOW_PROPERTYWINDOW =   "propertywindow.show";
WAPAMA.CONFIG.EVENT_DRAG_TRACKER_DRAG =       "dragTracker.drag";
WAPAMA.CONFIG.EVENT_DRAG_TRACKER_RESIZE =     "dragTracker.resize";
WAPAMA.CONFIG.EVENT_DROP_SHAPE =        "drop.shape";
WAPAMA.CONFIG.SAVE_EVENT =                      "menu.save";
  
  /* Selection Shapes Highlights */
WAPAMA.CONFIG.SELECTION_HIGHLIGHT_SIZE =        5;
WAPAMA.CONFIG.SELECTION_HIGHLIGHT_COLOR =       "#4444FF";
WAPAMA.CONFIG.SELECTION_HIGHLIGHT_COLOR2 =      "#9999FF";
  
WAPAMA.CONFIG.SELECTION_HIGHLIGHT_STYLE_CORNER =    "corner";
WAPAMA.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE =   "rectangle";
  
WAPAMA.CONFIG.SELECTION_VALID_COLOR =         "#00FF00";
WAPAMA.CONFIG.SELECTION_INVALID_COLOR =       "#FF0000";


WAPAMA.CONFIG.DOCKER_DOCKED_COLOR =   "#00FF00";
WAPAMA.CONFIG.DOCKER_UNDOCKED_COLOR =   "#FF0000";
WAPAMA.CONFIG.DOCKER_SNAP_OFFSET =    10;
    
  /* Copy & Paste */
WAPAMA.CONFIG.EDIT_OFFSET_PASTE =     10;

  /* Key-Codes */
WAPAMA.CONFIG.KEY_CODE_X =        88;
WAPAMA.CONFIG.KEY_CODE_C =        67;
WAPAMA.CONFIG.KEY_CODE_V =        86;
WAPAMA.CONFIG.KEY_CODE_DELETE =       46;
WAPAMA.CONFIG.KEY_CODE_META =       224;
WAPAMA.CONFIG.KEY_CODE_BACKSPACE =    8;
WAPAMA.CONFIG.KEY_CODE_LEFT =       37;
WAPAMA.CONFIG.KEY_CODE_RIGHT =      39;
WAPAMA.CONFIG.KEY_CODE_UP =       38;
WAPAMA.CONFIG.KEY_CODE_DOWN =       40;

  // TODO Determine where the lowercase constants are still used and remove them from here.
WAPAMA.CONFIG.KEY_Code_enter =      12;
WAPAMA.CONFIG.KEY_Code_left =       37;
WAPAMA.CONFIG.KEY_Code_right =      39;
WAPAMA.CONFIG.KEY_Code_top =        38;
WAPAMA.CONFIG.KEY_Code_bottom =     40;

/* Supported Meta Keys */
  
WAPAMA.CONFIG.META_KEY_META_CTRL =    "metactrl";
WAPAMA.CONFIG.META_KEY_ALT =        "alt";
WAPAMA.CONFIG.META_KEY_SHIFT =      "shift";

/* Key Actions */

WAPAMA.CONFIG.KEY_ACTION_DOWN =       "down";
WAPAMA.CONFIG.KEY_ACTION_UP =       "up";

WAPAMA.CONFIG.PANEL_RIGHT_COLLAPSED = true;
WAPAMA.CONFIG.PANEL_LEFT_COLLAPSED = true;

WAPAMA.CONFIG.ROLES_NO_NEED_CHECK = "Group";
/*Constant for Permission type*/
WAPAMA.CONFIG.PERMISSION_TYPE = 1;
WAPAMA.CONFIG.PROPERTIES = ["name","documentation","department","owner","relatedTo","project","task","product","service","bgcolor", "text"];
WAPAMA.CONFIG.SHAPE_ID = "";
WAPAMA.CONFIG.FILE_SIZE_VALIDATION = 1048576;
WAPAMA.CONFIG.SUPPORTED_EXTENSIONS = ["ade", "adp", "bat", "chm", "cmd", "com", "cpl", "exe", "hta", "ins", "isp", "jse", "lib", "lnk", "mde", "msc", "msp", "mst", "pif", "scr", "sct", "shb", "sys", "vb", "vbe", "vbs", "vxd", "wsc", "wsf", "wsh","jar","as","msi","html","htm"];
