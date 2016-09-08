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
 * Init namespaces
 */
if(!WAPAMA) {var WAPAMA= {};}
if(!WAPAMA.Core) {WAPAMA.Core = {};}


WAPAMA.Core.UIEnableDrag = function(event, uiObj, option) {
  var dragObj = WAPAMA.Core.currentDragObject = {};
  dragObj.uiObj = uiObj;
  var upL = uiObj.bounds.upperLeft();

  var a = uiObj.node.getScreenCTM();
  dragObj.faktorXY= {x: a.a, y: a.d};
  
  dragObj.scrollNode = uiObj.node.ownerSVGElement.parentNode.parentNode;
  
  dragObj.offSetPosition =  {
    x: Event.pointerX(event) - (upL.x * dragObj.faktorXY.x),
    y: Event.pointerY(event) - (upL.y * dragObj.faktorXY.y)};

  dragObj.offsetScroll = {x:dragObj.scrollNode.scrollLeft,y:dragObj.scrollNode.scrollTop};
    
  dragObj.dragCallback = WAPAMA.Core.UIDragCallback;
  dragObj.disableCallback = WAPAMA.Core.UIDisableDrag;

  dragObj.movedCallback = option ? option.movedCallback : undefined;
  dragObj.upCallback = option ? option.upCallback : undefined;
  
  document.documentElement.addEventListener(WAPAMA.CONFIG.EVENT_MOUSEUP, dragObj.disableCallback, true);
  document.documentElement.addEventListener(WAPAMA.CONFIG.EVENT_MOUSEMOVE,  dragObj.dragCallback , false);

};

WAPAMA.Core.UIDragCallback = function(event) {
  var dragObj = WAPAMA.Core.currentDragObject;
  var position = {
    x: Event.pointerX(event) - dragObj.offSetPosition.x,
    y: Event.pointerY(event) - dragObj.offSetPosition.y}

  position.x  -= dragObj.offsetScroll.x - dragObj.scrollNode.scrollLeft; 
  position.y  -= dragObj.offsetScroll.y - dragObj.scrollNode.scrollTop;

  position.x /= dragObj.faktorXY.x;
  position.y /= dragObj.faktorXY.y;

  dragObj.uiObj.bounds.moveTo(position);
  //dragObj.uiObj.update();

  if(dragObj.movedCallback)
    dragObj.movedCallback(event);
  
  Event.stop(event);

};

WAPAMA.Core.UIDisableDrag = function(event) {
  var dragObj = WAPAMA.Core.currentDragObject;
  document.documentElement.removeEventListener(WAPAMA.CONFIG.EVENT_MOUSEMOVE, dragObj.dragCallback, false);
  document.documentElement.removeEventListener(WAPAMA.CONFIG.EVENT_MOUSEUP, dragObj.disableCallback, true);
  
  if(dragObj.upCallback)
    dragObj.upCallback(event);
    
  dragObj.upCallback = undefined;
  dragObj.movedCallback = undefined;   
  WAPAMA.Core.currentDragObject = null;
  
  Event.stop(event);  
};