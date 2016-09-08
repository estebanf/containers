/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Top-Level properties and functions. Members in this package are accessed either without a namespace prefix or with
 * the <code>window.</code> prefix.
 *
 * @native
 * @jsxdoc-definition  jsx3.Package.definePackage("window", null, function(){});
 */

/**
 * @native
 * @jsxdoc-definition  window.eval = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  window.isNaN = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  window.isFinite = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  window.escape = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  window.unescape = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  window.parseFloat = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  window.parseInt = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  window.NaN = null;
 */

/**
 * @native
 * @jsxdoc-definition  window.Infinity = null;
 */

/**
 * @native
 * @jsxdoc-definition  window.undefined = null;
 */

/**
 * Transfers prototype methods from one class to another; establishes @superClass as the super for @subClass.
 *
 * @param subClass {String} named subclass to transfer prototypes to
 * @param superClass {String} named superclass to transfer prototypes from
 * @param bImplement {boolean} if true, @superClass is an interface
 * @return  the eval value of the script
 * @deprecated  Create classes using <code>jsx3.Class</code>.
 * @see jsx3.lang.Class
 *
 * @jsxdoc-definition  window.doInherit = function(subClass, superClass, bImplement){};
 */

/**
 * Transfers prototype methods from one class to another.
 * @param subClass {String} named subclass to transfer prototypes to
 * @param superClass {String} named superclass to transfer prototypes from
 * @return  the eval value of the script
 * @deprecated  Create classes using <code>jsx3.Class</code>.
 * @see jsx3.lang.Class
 *
 * @jsxdoc-definition  window.doImplement = function(subClass, superClass){};
 */

/**
 * Transfers the methods of a class to a object instance.
 * @param objInstance {object} any JavaScript object
 * @param strClassName {String} the name of a class
 * @deprecated  Use <code>jsx3.Class.mixin()</code>.
 * @see jsx3.lang.Class#mixin()
 *
 * @jsxdoc-definition  window.doMixin = function(objInstance, strClassName){};
 */

/**
 * Registers all prototype functions and properties, contained by the inner function @anonymousFunction; used by jsx3.Object
 * @param strClassName {String} named class containing the anonymous function to call
 * @param anonymousFunction {String} inner function containing named prototypes to bind
 * @deprecated  Create classes using <code>jsx3.Class</code>.
 * @see jsx3.lang.Class
 *
 * @jsxdoc-definition  window.doDefine = function(strClassName, anonymousFunction){};
 */




/**
 * Native JavaScript class Object.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("Object", null, null, function(){});
 */

/**
 * @native
 * @jsxdoc-definition  Object.prototype.Object = function(){};
 */

/* turn this off for now
 * {Function} 
 *
 * @native
 * @jsxdoc-definition  Object.prototype.constructor = null;
 */

/**
 * @return {String}
 *
 * @native
 * @jsxdoc-definition  Object.prototype.toString = function(){};
 */




/**
 * Native JavaScript class Function.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("Function", Object, null, function(){});
 */

/**
 * @native
 * @jsxdoc-definition  Function.prototype.Function = function(){};
 */

/**
 * @param thisArg {Object}
 * @param args {Object...}
 * @return {Object}
 *
 * @native
 * @jsxdoc-definition  Function.prototype.apply = function(thisArg, args){};
 */

/**
 * @param args {Object...}
 * @return {Object}
 *
 * @native
 * @jsxdoc-definition  Function.prototype.call = function(args){};
 */




/**
 * Native JavaScript class Array. Includes GI extensions.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("Array", Object, null, function(){});
 */

/**
 * @native
 * @jsxdoc-definition  Array.prototype.Array = function(){};
 */

/**
 * Joins two or more arrays and returns a new array.
 * @param array {Array...}
 * @return {Array}
 *
 * @native
 * @jsxdoc-definition  Array.prototype.concat = function(array){};
 */

/**
 * Joins all elements of an array into a string.
 * @param separator {String}
 * @return {String}
 *
 * @native
 * @jsxdoc-definition  Array.prototype.join = function(separator){};
 */

/**
 * {int} An unsigned, 32-bit integer that specifies the number of elements in an array.
 *
 * @native
 * @jsxdoc-definition  Array.prototype.length = null;
 */

/**
 * Removes the last element from an array and returns that element. This method  changes the length of the array.
 * @return {Object}
 *
 * @native
 * @jsxdoc-definition  Array.prototype.pop = function(){};
 */

/**
 * Adds one or more elements to the end of an array and returns the new length of the array. This method changes 
 * the length of the array.
 * @param element {Object...}
 * @return {int} the new length of the array
 *
 * @native
 * @jsxdoc-definition  Array.prototype.push = function(element){};
 */

/**
 * Transposes the elements of an array: the first array element becomes the last and the last becomes the first.
 *
 * @native
 * @jsxdoc-definition  Array.prototype.reverse = function(){};
 */

/**
 * Removes the first element from an array and returns that element. This method changes the length of the array.
 * @return {Object}
 *
 * @native
 * @jsxdoc-definition  Array.prototype.shift = function(){};
 */

/**
 * Extracts a section of an array and returns a new array.
 * <ul>
 * <li> slice extracts up to but not including end. slice(1,4) extracts the second element through the fourth element (elements indexed 1, 2, and 3)</li>
 * <li> As a negative index, end indicates an offset from the end of the sequence. slice(2,-1) extracts the third element through the second to last element in the sequence.</li>
 * <li> If end is omitted, slice extracts to the end of the sequence.</li>
 * </ul>
 *
 * @param begin {int} Zero-based index at which to begin extraction.
 * @param end {int} Zero-based index at which to end extraction.
 * @return {Array}
 *
 * @native
 * @jsxdoc-definition  Array.prototype.slice = function(begin, end){};
 */

/**
 * Sorts the elements of an array.
 * <p/>
 * If compareFunction is supplied, the array elements are sorted according to the return value of the compare 
 * function. If a and b are two elements being compared, then:
 * <ul>
 * <li>If compareFunction(a, b) is less than 0, sort b to a lower index than a.</li>
 * <li>If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with respect to all different elements.</li>
 * <li>If compareFunction(a, b) is greater than 0, sort b to a higher index than a.</li>
 * </ul>
 *
 * @param compareFunction {Function} Specifies a function that defines the sort order. If omitted, the array
 *    is sorted lexicographically (in dictionary order) according to the string conversion of each element.
 *
 * @native
 * @jsxdoc-definition  Array.prototype.sort = function(compareFunction){};
 */

/**
 * Changes the content of an array, adding new elements while removing old elements.
 * @param index {int} Index at which to start changing the array.
 * @param howMany {int} An integer indicating the number of old array elements to remove. If howMany is 0, no
 *    elements are removed. In this case, you should specify at least one new element.
 * @param element {Object...} The elements to add to the array. If you don't specify any elements, splice simply
 *    removes elements from the array.
 * @return {Array} an array containing the removed elements
 *
 * @native
 * @jsxdoc-definition  Array.prototype.splice = function(index, howMany, element){};
 */

/**
 * Returns a string representing the specified array and its elements.
 * @return {String}
 *
 * @native
 * @jsxdoc-definition  Array.prototype.toString = function(){};
 */

/**
 * Adds one or more elements to the beginning of an array and returns the new length of the array.
 * @param element {Object...}
 * @return {int} the new length of the array
 *
 * @native
 * @jsxdoc-definition  Array.prototype.unshift = function(element){};
 */


/**
 * Returns the index of the first occurrence of <code>objElement</code> in this array.
 * @param objElement {Object} the item to find
 * @param intStartAt {int}
 * @return {int} the index of the found object or -1 if not found
 * @deprecated Use the <code>jsx3.util.List</code> class.
 */
Array.prototype.indexOf = function(objElement, intStartAt) {
  if (intStartAt == null) intStartAt = 0;
  for (var i = intStartAt; i < this.length; i++) {
    if (this[i] == objElement)
      return i;
  }
  return -1;
};

/**
 * Returns the index of the last occurrence of <code>objElement</code> in this array.
 * @param objElement {Object} the item to find
 * @param intStartAt {int}
 * @return {int} the index of the found object or -1 if not found
 * @deprecated Use the <code>jsx3.util.List</code> class.
 */
Array.prototype.lastIndexOf = function(objElement, intStartAt) {
  if (intStartAt == null) intStartAt = this.length - 1;
  for (var i = intStartAt; i >= 0; i--) {
    if (this[i] == objElement)
      return i;
  }
  return -1;
};

/**
 * @deprecated Use the <code>jsx3.util.List</code> class.
 */
Array.prototype.contains = function(objElement) {
  return this.indexOf(objElement) >= 0;
};

/**
 * removes the first occurrence of <code>objElement</code> in this array
 * @param objElement  the object to remove
 * @return  the removed object or null if no object was removed
 * @deprecated Use the <code>jsx3.util.List</code> class.
 */
Array.prototype.remove = function(objElement) {
  var index = this.indexOf(objElement);
  if (index >= 0)
    return this.splice(index, 1)[0];
  return null;
};

/**
 * creates a copy of this array
 * @return {Array}
 * @deprecated Use the <code>jsx3.util.List</code> class.
 */
Array.prototype.clone = function() {
  return this.concat();
};

/**
 * pushes the contents of an Array onto this Array.
 * @param a {Array}
 * @deprecated Use the <code>jsx3.util.List</code> class.
 */
Array.prototype.pushAll = function(a) {
  this.push.apply(this, a);
};

/**
 * Returns true if this array and <code>a</code> have the same length and this[n] = a[n] for all n.
 * @param a {Array}
 * @return {boolean}
 * @deprecated Use the <code>jsx3.util.List</code> class.
 */
Array.prototype.contentsEqual = function(a) {
  if (a == null) return false;
  if (this.length != a.length) return false;
  for (var i = 0; i < a.length; i++) {
    if (this[i] != a[i]) return false;
  }
  return true;
};

/**
 * Creates a new array with the filtered contents of this array. The <code>fctFilter</code> parameter defines
 * the filtering function.
 * @param fctFilter {Function} a function that is called once for each item in this array and returns true if the item
 *    should be included in the filtered list. The signature of this function is
 *    <code>function(item : Object) : boolean</code>.
 * @return {Array}
 * @since 3.1
 * @deprecated Use the <code>jsx3.util.List</code> class.
 */
Array.prototype.filter = function(fctFilter) {
  var filtered = [];
  for (var i = 0; i < this.length; i++) {
    if (fctFilter(this[i]))
      filtered.push(this[i]);
  }
  return filtered;
};

/**
 * Creates a new array with the mapped contents of this array. The <code>fctMapper</code> parameter defines
 * the mapping function.
 * <p/>
 * This method has four modes corresponding to the four possible values for <code>{bExpand, bObject}</code>:
 * <ul>
 * <li><code>{false, false}</code> (default) &#8211; the filtering function takes an item in this list and returns
 *    a single object value which will take the place of the item in the mapped result.</li>
 * <li><code>{true, false}</code> &#8211; the filtering function takes an item in this list and returns
 *    a single object value or an array of values, all of which will be inserted into the mapped result at the index
 *    of the item.</li>
 * <li><code>{false, true}</code> &#8211; the filtering function takes an item in this list and returns an array with
 *    exactly two values, which become a name/value pair in the mapped result.</li>
 * <li><code>{true, true}</code> &#8211; the filtering function takes an item in this list and returns an array with
 *    zero or an even number of items, which become name/value pairs in the mapped result.</li>
 * </ul>
 *
 * @param fctMapper {Function} a function that is called once for each item in this array and returns the mapped
 *    value. The signature of this function depends on the values for the <code>bExpand</code> and
 *    <code>bObject</code> parameters.
 * @param bExpand {boolean} if <code>true</code>, the resulting mapped array or object may any number of values
 *    corresponding to each item in this list. Otherwise, it will have exactly one value for each item in this list.
 * @param bObject {boolean} if <code>true</code>, this array is mapped to an object with property name/value pairs.
 *    Otherwise this array is mapped to another array.
 * @return {Array|Object} an <code>Array</code> if the <code>bObject</code> parameter is <code>null</code> or
 *    <code>false</code>, otherwise an <code>Object</code>.
 * @since 3.1
 * @deprecated Use the <code>jsx3.util.List</code> class.
 */
Array.prototype.map = function(fctMapper, bExpand, bObject) {
  var mapped = null;
  if (bExpand) {
    if (bObject) {
      mapped = {};
      for (var i = 0; i < this.length; i++) {
        var pairs = fctMapper(this[i]);
        for (var j = 0; j < pairs.length; j+=2)
          mapped[pairs[i]] = pairs[i+1];
      }
    } else {
      mapped = [];
      for (var i = 0; i < this.length; i++) {
        var val = fctMapper(this[i]);
        if (val instanceof Array)
          mapped.pushAll(val);
        else
          mapped.push(val);
      }
    }
  } else {
    if (bObject) {
      mapped = {};
      for (var i = 0; i < this.length; i++) {
        var pair = fctMapper(this[i]);
        mapped[pair[0]] = pair[1];
      }
    } else {
      mapped = new Array(this.length);
      for (var i = 0; i < this.length; i++)
        mapped[i] = fctMapper(this[i]);
    }
  }
  return mapped;
};




/**
 * Native JavaScript class Math. Includes GI extensions.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("Math", Object, null, function(){});
 */

/**
 * @native
 * @jsxdoc-definition  Math.abs = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.acos = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.asin = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.atan = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.atan2 = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.ceil = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.cos = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.exp = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.floor = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.log = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.max = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.min = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.pow = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.random = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.round = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.sin = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.sqrt = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Math.tan = function(){};
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Math.E = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Math.LN10 = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Math.LN2 = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Math.LOG10E = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Math.LOG2E = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Math.PI = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Math.SQRT1_2 = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Math.SQRT2 = null;
 */


/**
 * calculates a mod b, but the result is not allowed to be negative
 * @param v {Number} a
 * @param mod {Number} b
 * @return {Number} a mod b if a >= 0, b + a mod b, if a < 0
 * @deprecated Use <code>jsx3.util.numMod()</code> instead.
 */
Math.modpos = function(v, mod) {
  return jsx3.util.numMod(v, mod);
};

/**
 * value == null || isNaN(value)
 * @param value {Object} any value
 * @return {boolean}
 * @deprecated Use <code>jsx3.util.numIsNaN()</code> instead.
 */
Math.isNaN = function(value) {
  return jsx3.util.numIsNaN(value);
};




/**
 * Native JavaScript class Boolean.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("Boolean", Object, null, function(){});
 */




/**
 * Native JavaScript class Number. Includes GI extensions.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("Number", Object, null, function(){});
 */

/**
 * @native
 * @jsxdoc-definition  Number.prototype.Number = function(){};
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Number.MAX_VALUE = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Number.MIN_VALUE = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Number.NaN = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Number.NEGATIVE_INFINITY = null;
 */

/**
 * {Number}
 *
 * @native
 * @jsxdoc-definition  Number.POSITIVE_INFINITY = null;
 */

/**
 * @native
 * @jsxdoc-definition  Number.prototype.toFixed = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Number.prototype.toPrecision = function(){};
 */


/**
 * Rounds the number (this) to the nearest value that can be divided by @intUnit.
 * @param intUnit {int} unit to use
 * @return {Number}
 * @deprecated Use <code>jsx3.util.numRound()</code> instead.
 */
Number.prototype.roundTo = function(intUnit) {
  return jsx3.util.numRound(this, intUnit);
};

/**
 * Left pads this number with zeros to return a string of length <code>intDigits</code>.
 * @param intDigits {int} the length of the string to return
 * @return {String}
 * @deprecated Use the <code>jsx3.util.NumberFormat</code> class.
 */
Number.prototype.zeroPad = function(intDigits) {
  var s = "" + this;
  while (s.length < intDigits)
    s = "0" + s;
  return s;
};




/**
 * Native JavaScript class Date. Includes GI extensions.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("Date", Object, null, function(){});
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.Date = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getDate = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getDay = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getFullYear = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getHours = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getMilliseconds = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getMinutes = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getMonth = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getSeconds = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getTime = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getTimezoneOffset = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getUTCDate = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getUTCDay = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getUTCFullYear = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getUTCHours = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getUTCMilliseconds = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getUTCMinutes = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getUTCMonth = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getUTCSeconds = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.getYear = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.parse = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setDate = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setFullYear = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setHours = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setMilliseconds = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setMinutes = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setMonth = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setSeconds = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setTime = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setUTCDate = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setUTCFullYear = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setUTCHours = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setUTCMilliseconds = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setUTCMinutes = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setUTCMonth = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.setUTCSeconds = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.toGMTString = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.toLocaleString = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  Date.prototype.toUTCString = function(){};
 */


/**
 * Returns the date of the last day of the month of this Date object, ie will return 31 for any Date with a January month value (any year and any date)
 * @return {int}
 * @deprecated
 */
Date.prototype.getLastDateOfMonth = function() {
  var month = this.getMonth();

  return Date._LAST_DATE_ARRAY[month] ||
      ((new Date(this.getYear(), month, 29)).getMonth() == month ? 29 : 28);
};

/**
 * whether two Date objects represent the same date
 * @param o {Date} the date to compare this date against
 * @deprecated
 */
Date.prototype.equals = function(o) {
  return o != null && o instanceof Date && o.valueOf() == this.valueOf();
};

/**
 * compare this date instance to argument <code>d</code>
 * @param d {Date} the date to compare this date against
 * @return {int} 1 if this date is later than d, 0 if equal, and -1 otherwise
 * @deprecated
 */
Date.prototype.compareTo = function(d) {
  var a = this.valueOf();
  var b = d.valueOf();
  return a == b ? 0 : a > b ? 1 : -1;
};

/** @private @jsxobf-clobber */
Date._LAST_DATE_ARRAY = [31,null,31,30,31,30,31,31,30,31,30,31];





/**
 * Native JavaScript class String. Includes GI extensions.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("String", Object, null, function(){});
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.String = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.charAt = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.charCodeAt = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.concat = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.fromCharCode = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.indexOf = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.length = null;
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.match = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.replace = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.search = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.slice = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.split = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.substring = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.toLowerCase = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  String.prototype.toUpperCase = function(){};
 */


/**
 * trims trailing and leading spaces (anything matching  the regexp, \s) from a string
 * @return {String}
 * @deprecated Use <code>jsx3.util.strTrim()</code> instead.
 */
String.prototype.trim = function() {
  return jsx3.util.strTrim(this);
};

/**
 * performs a global, case-sensitive replace of all instances of @strReplace with @strReplaceWith
 * @param strReplace {String} string to replace
 * @param strReplaceWith {String} string to replace with
 * @return {String}
 * @deprecated  Use <code>String.replace()</code> with regular expression syntax.
 */
String.prototype.doReplace = function(strReplace,strReplaceWith) {
  var re = new RegExp(strReplace,["g"]);
  return this.replace(re, strReplaceWith);
};

/**
 * replaces the following four characters with their escaped equivalent: &amp; &lt; &gt; "
 * @return {String}
 * @deprecated Use <code>jsx3.util.strEscapeHTML()</code> instead.
 */
String.prototype.escapeHTML = function() {
  return jsx3.util.strEscapeHTML(this);
};

/**
 * truncates a string to @intLength and appends "..." to the end if the string is is actually truncated
 * @param intLength {int} length of the string (including the trailing ..., if necessary)
 * @return {String}
 * @deprecated Use <code>jsx3.util.strTruncate()</code> instead.
 */
String.prototype.doTruncate = function(intLength) {
  return jsx3.util.strTruncate(this, intLength, "...", 1);
};

/**
 * takes any string (assumed to be a valid URL) and prepends that string with the appropriate path information. This function
 *          is used by the JSX framework to resolve file locations at runtime, and is always used by system methods that need to resolve
 *          the location of a resource.  For example, if the application is located at "/system/JSXAPPS/app1/" and a resource is requested
 *          at "JSXAPPS/app1/components/appCanval.xml", this method would return "/system/JSXAPPS/app1/components/appCanval.xml"
 * @return {String} URL
 * @deprecated  Use <code>jsx3.resolveURI()</code>.
 * @see jsx3#resolveURI()
 */
String.prototype.toAbsolute = function() {
  var s;
  //given portal implementations, any string instance that represents a URI can call this method to add a prepend of the absolute path
  if (this.substring(0,1) == "/" || this.substring(0,7).toUpperCase() == "HTTP://" || this.substring(0,8).toUpperCase() == "HTTPS://") {
    s = this.toString();
  } else if (this.substring(0,4) == "JSX/") {
    s = jsx3.getEnv("jsxabspath") + this;
  } else {
    s = jsx3.getEnv("jsxhomepath") + this;
  }
  return s;
};

/**
 * Returns a url, strRelative, relative to the URL represented by this string. For example, if 'this' String is equal to "/perforce/DEV/gi/gi-dev/index.html" and @strRelative is equal to "JSXAPPS/app1/config.xml", then the result of this function would be: "/perforce/DEV/gi/gi-dev/JSXAPPS/app1/config.xml"
 * @param strRelative {String} URL to base relativity from
 * @return {String}
 * @deprecated  Create instances of <code>jsx3.net.URI</code> and use <code>URI.resolve()</code>.
 * @see jsx3.net.URI
 */
String.prototype.urlTo = function(strRelative) {
  var concat = null;

  var index = this.lastIndexOf('/');
  if (index == this.length - 1)
    concat = this + strRelative;
  else if (index < 0)
    concat = strRelative;
  else
    concat = this.substring(0, index+1) + strRelative;

  concat = concat.replace(/\\/g,"/");
  var tokens = concat.split("/");

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token == ".") {
      tokens.splice(i--, 1);
    } else if (token == "..") {
      if (i > 0 && tokens[i-1] != "..") {
        tokens.splice(i--, 1);
        tokens.splice(i--, 1);
      }
    }
  }

  return tokens.join("/");
};

/**
 * Returns whether or not the string ends with @token
 * @param token {String} item to match on the String instance
 * @return {boolean}
 * @deprecated Use <code>jsx3.util.strEndsWith()</code> instead.
 */
String.prototype.endsWith = function(token) {
  return jsx3.util.strEndsWith(this, token);
};

/**
 * trim a string down to a maximum length, put an ellipsis in the middle of the string if the string is too long, showing the beginning and ending of the string.
 * @return {String}
 * @deprecated Use <code>jsx3.util.strTruncate()</code> instead.
 */
String.prototype.constrainLength = function(intMax, ellipsis) {
  return jsx3.util.strTruncate(this, intMax, ellipsis, 2/3);
};

/**
 * Encodes this string to its base64 equivalent.
 * @return {String}
 * @deprecated Use <code>jsx3.util.strEncodeBase64()</code> instead.
 */
String.prototype.toBase64 = function() {
  return jsx3.util.strEncodeBase64(this);
};

/**
 * Decodes this string from its base64 equivalent.
 * @return {String}
 * @deprecated Use <code>jsx3.util.strDecodeBase64()</code> instead.
 */
String.prototype.fromBase64 = function() {
  return jsx3.util.strDecodeBase64(this);
};





/**
 * Native JavaScript class RegExp.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("RegExp", Object, null, function(){});
 */

/**
 * @native
 * @jsxdoc-definition  RegExp.prototype.RegExp = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  RegExp.prototype.compile = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  RegExp.prototype.exec = function(){};
 */

/**
 * @native
 * @jsxdoc-definition  RegExp.prototype.test = function(){};
 */

/**
 * {boolean}
 *
 * @native
 * @jsxdoc-definition  RegExp.prototype.global = null;
 */

/**
 * {boolean}
 *
 * @native
 * @jsxdoc-definition  RegExp.prototype.ignoreCase = null;
 */

/**
 * {int}
 *
 * @native
 * @jsxdoc-definition  RegExp.prototype.lastIndex = null;
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  RegExp.prototype.source = null;
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  RegExp.input = null;
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  RegExp.lastMatch = null;
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  RegExp.lastParen = null;
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  RegExp.leftContext = null;
 */

/**
 * {boolean}
 *
 * @native
 * @jsxdoc-definition  RegExp.multiline = null;
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  RegExp.rightContext = null;
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  RegExp.$1 = null;
 */




/**
 * Native browser DOM class <code>HTMLElement</code>. Mozilla browsers call this <code>HTMLElement</code>, while
 * Microsoft Internet Explorer usually reports it as a plain <code>Object</code>.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("HTMLElement", Object, null, function(){});
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.innerHTML = null;
 */

/**
 * {Object}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.style = null;
 */

/**
 * {Array<HTMLElement>}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.childNodes = null;
 */

/**
 * {HTMLElement}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.parentNode = null;
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.id = null;
 */

/**
 * {HTMLDocument}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.ownerDocument = null;
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.tagName = null;
 */

/**
 * {String}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.className = null;
 */

/**
 * @param strName {String}
 * @return {String}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.getAttribute = function(strName) {};
 */

/**
 * @param strName {String}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.removeAttribute = function(strName) {};
 */

/**
 * @param strName {String}
 * @param strValue {String}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.setAttribute = function(strName, strValue) {};
 */

/**
 * {HTMLElement}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.previousSibling = null;
 */

/**
 * {HTMLElement}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.nextSibling = null;
 */

/**
 * {HTMLElement}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.firstChild = null;
 */

/**
 * {HTMLElement}
 *
 * @native
 * @jsxdoc-definition  HTMLElement.prototype.lastChild = null;
 */



/**
 * Native browser DOM class <code>HTMLDocument</code>. Mozilla browsers call this <code>HTMLDocument</code>, while
 * Microsoft Internet Explorer usually reports it as a plain <code>Object</code>.
 *
 * @native
 * @jsxdoc-definition  jsx3.Class.defineClass("HTMLDocument", HTMLElement, null, function(){});
 */

/**
 * @param strId {String}
 * @return {HTMLElement}
 *
 * @native
 * @jsxdoc-definition  HTMLDocument.prototype.getElementById = function(strId) {};
 *//*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

(function(jsx3) {

  var extend = function(target, source) {
    for (var f in source)
      target[f] = source[f];
    return target;
  };

  var json = function(o, recurse) {
    if (typeof(recurse) == "undefined") recurse = true;
    var j;

    if (o == null)
      j = "null";
    else if (jsx3.$A.is(o)) {
      var s = [];
      for (var i = 0; i < o.length; i++)
        s.push(recurse ? json(o[i]) : o[i]);
      j = "[" + s.join(",") + "]";
    } else if (typeof(o) == "object") {
      var s = [];
      for (var f in o)
        if (!o.hasOwnProperty || o.hasOwnProperty(f))
          s.push(f + ":" + (recurse ? json(o[f]) : o[f]));
      j = "{" + s.join(",") + "}";
    } else if (typeof(o) == "string") {
      j = jsx3.util.strEscapeJSON(o);
    } else {
      j = o.toString();
    }
    
    return j;
  };

  /**
   * Useful extensions to the JavaScript <code>Object</code> class.
   * @since 3.7
   * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.$Object", Object, null, function() {});
   */
  jsx3.$Object = {

    /**
     * Copies all properties of <code>o</code> into this object.
     * @param o {Object}
     */
    extend: function(o) {
      return extend(this, o);
    },

    /**
     * Creates a new objects with all the same properties as this object.
     * @return {jsx3.$Object}
     */
    clone: function() {
      var c = jsx3.$O();
      c.extend(this);
      return c;
    }
  };

  /** @jsxdoc-category  jsx3 */

  /**
   * Injects class <code>jsx3.$Object</code> into object instance <code>o</code>.
   * @param o {Object}
   * @since 3.7
   */
  jsx3.$O = function(o) {
    return extend(o || {}, jsx3.$Object);
  };

  jsx3.$O.json = json;

  /**
   * Useful extensions to the JavaScript <code>Array</code> class.
   * @since 3.7
   * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.$Array", Array, null, function() {});
   */
  jsx3.$Array = {

    /**
     * Calls <code>fct</code> for each element in this array. <code>fct</code> is passed each element as the
     * sole parameter.
     * @param fct {Function}
     */
    each: function(fct) {
      for (var i = 0; i < this.length; i++)
        fct(this[i]);
    },

    /**
     * Creates a new array using the mapped values of each element in this array. <code>fct</code> is called for
     * each element in this array and the element is passed as the sole argument. The new array is constructed with
     * the return values of each call to <code>fct</code>.
     * sole parameter.
     * @param fct {Function}
     * @return {jsx3.$Array}
     */
    map: function(fct) {
      var a = jsx3.$A();
      for (var i = 0; i < this.length; i++)
        a[i] = fct(this[i]);
      return a;
    },

    /**
     * Creates a new array with the filtered contents of this array. <code>fct</code> is called for
     * each element in this array and the element is passed as the sole argument. The new array is constructed with
     * only the elements of this array for which <code>fct</code> returns <code>true</code>.
     * @param fct {Function}
     * @return {jsx3.$Array}
     */
    filter: function(fct) {
      var a = jsx3.$A();
      for (var i = 0; i < this.length; i++)
        if (fct(this[i]))
          a.push(this[i]);
      return a;
    },

    /**
     * Returns the first index of <code>o</code> in this array. This method uses strict equality for comparing objects
     * (<code>===</code>).
     * @param o {Object}
     * @return {int}
     */
    indexOf: function(o) {
      for (var i = 0; i < this.length; i++)
        if (this[i] === o)
          return i;
      return -1;
    },

    /**
     * Returns true if <code>o</code> is in this array. This method uses strict equality for comparing objects
     * (<code>===</code>).
     * @param o {Object}
     * @return {boolean}
     */
    contains: function(o) {
      return this.indexOf(o) >= 0;
    },

    /**
     * Removes the first occurrence of <code>o</code> in this array. This method uses strict equality for comparing objects
     * (<code>===</code>).
     * @param o {Object}
     * @return {Object} the removed object or <code>undefined</code> if <code>o</code> is not in this array.
     */
    remove: function(o) {
      var index = this.indexOf(o);
      if (index >= 0)
        return this.splice(index, 1)[0];
    },

    /**
     * Returns the first element in this array for which <code>fct</code> returns true when passed the element as
     * the sole parameter.
     * @param fct {Function}
     * @return {Object}
     */
    find: function(fct) {
      for (var i = 0; i < this.length; i++)
        if (fct(this[i]))
          return this[i];
    },

    /**
     * Returns a list containing only the unique elements in this list.
     * @return {jsx3.$Array}
     */
    unique: function() {
      var a = this.concat();
      for (var i = a.length - 1; i >= 1; i--) {
        for (var j = i - 1; j >= 0; j--) {
          if (a[i] === a[j]) {
            a.splice(i, 1);
            break;
          }
        }
      }
      return jsx3.$A(a);
    },

    /**
     * Appends the contents of <code>a</code> to this array.
     * @param a {Array}
     */
    addAll: function(a) {
      this.push.apply(this, a);
    },

    /**
     * Returns true if the contents of this array equal the contents of <code>a</code>.
     * @param a {Array}
     * @return {boolean}
     * @since 3.9
     */
    eq: function(a) {
      if (this.length != a.length) return false;
      for (var i = 0; i < this.length; i++)
        if (this[i] !== a[i]) return false;
      return true;
    },

    clone: function() {
      return jsx3.$A(this.concat());
    }
  };

  /**
   * Useful extensions to the JavaScript <code>Object</code> class for emulating a hashtable.
   * @since 3.7
   * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.$Hash", jsx3.$Object, null, function() {});
   */
  jsx3.$Hash = jsx3.$Object.clone().extend({

    /**
     * Iterates over all the key-value pairs of this hashtable. <code>fct</code> is called for each pair; the pair key
     * is the first parameter and the pair value is the second parameter.
     * @param fct {Function} <code>function(key : String, value: Object} : void</code>
     */
    each: function(fct) {
      for (var f in this) {
        if (this[f] != this.constructor.prototype[f] && this[f] != jsx3.$Hash[f])
          fct(f, this[f]);
      }
    },

    /**
     * Returns the list of keys of this hashtable.
     * @return {jsx3.$Array}
     */
    keys: function() {
      var a = [];
      for (var f in this) {
        if (this[f] != this.constructor.prototype[f] && this[f] != jsx3.$Hash[f])
          a.push(f);
      }
      return jsx3.$A(a);
    },

    /**
     * Returns the list of values of this hashtable.
     * @return {jsx3.$Array}
     */
    values: function() {
      var a = [];
      for (var f in this) {
        if (this[f] != this.constructor.prototype[f] && this[f] != jsx3.$Hash[f])
          a.push(this[f]);
      }
      return jsx3.$A(a);
    }
  });

  /**
   * Useful extensions to the JavaScript <code>Function</code> class.
   * @since 3.7
   * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.$Function", Object, null, function() {});
   */
  jsx3.$Function = {

    /**
     * Returns a method that is this function applied to <code>thisObj</code> with arguments <code>argsArr</code>.
     * @param thisObj {Object}
     * @param argsArr {Array}
     * @return {jsx3.$Function}
     */
    bind: function(thisObj, argsArr) {
      var fct = this;

      if (argsArr == null || argsArr.length == 0) {
        return jsx3.$F(function() {
          return fct.apply(thisObj, arguments);
        });
      } else {
        return function() {
          var myArgs;

          if (arguments.length > 0) {
            myArgs = [];
            for (var i = 0; i < argsArr.length; i++)
              myArgs.push(argsArr[i]);
            for (var i = 0; i < arguments.length; i++)
              myArgs.push(arguments[i]);
          } else {
            myArgs = argsArr;
          }

          return fct.apply(thisObj, myArgs);
        };
      }
    },

    /**
     * @return {jsx3.$Function}
     * @package
     */
    throttled: function() {
      var fct = this;
      return jsx3.$F(function() {
        if (fct._thlto)
          window.clearTimeout(fct._thlto);
        fct._thlto = window.setTimeout(jsx3.$F(fct).bind(this, arguments));
      });
    },

    /**
     * @return {jsx3.$Function}
     * @package
     */
    slept: function() {
      var fct = this;
      return jsx3.$F(function() {
        window.setTimeout(fct.bind(this, arguments));
      });
    }
  };

  /**
   * Useful extensions to the JavaScript <code>String</code> class.
   * @since 3.7
   * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.$String", jsx3.$Object, null, function() {});
   */
  jsx3.$String = jsx3.$Object.clone().extend({

    /**
     * Returns true if this string ends with string <code>s</code>.
     * @param s {String}
     * @return {boolean}
     */
    endsWith: function(s) {
      return this.lastIndexOf(s) == this.length - s.length;
    },

    /**
     * Returns this string with all leading and trailing space removed.
     * @return {jsx3.$String}
     */
    trim: function() {
      return jsx3.$S(this.replace(/(^\s*)|(\s*$)/g, ""));
    }
  });

  /** @jsxdoc-category  jsx3 */
  
  /**
   * Injects class <code>jsx3.$Function</code> into function instance <code>f</code>.
   * @param f {Function}
   * @since 3.7
   */
  jsx3.$F = function(f) {
    return extend(f, jsx3.$Function);
  };

  var fixAsyncArg = jsx3.$F(function(args, n, arg) { args[n] = arg.rv(); });
  var handleAsyncArgs = function(args) {
    var c = null;

    for (var i = 0; i < args.length; i++) {
      var a = args[i];
      if (a instanceof AsyncRV) {
        if (a._done) {
          args[i] = a.rv();
        } else {
          a.when(fixAsyncArg.bind(null, [args, i, a]));
          c = c ? c.and(a) : a;
        }
      }
    }

    return c;
  };

  /**
   * The callback object passed as the single argument to an asynchronous method.
   *
   * @see jsx3#$Y()
   * @since 3.7
   *
   * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.$AsyncCB", Object, null, function() {});
   */
  jsx3.$AsyncCB = function(objThis, arrArgs) {
    /* @jsxobf-clobber */
    this._this = objThis;
    /* @jsxobf-clobber */
    this._args = arrArgs;
    /* @jsxobf-clobber */
    this._condition = handleAsyncArgs(arrArgs);
  };
  extend(jsx3.$AsyncCB.prototype, {

    /** @private @jsxobf-clobber */
    _whenArg: jsx3.$F(function(n, arg) { this._args[n] = arg.rv(); }),
    
    /**
     * Signals the callback object that the asynchronous method is done and passes the asynchronous return value.
     * @param rv {Object} the return value.
     */
    done: function(rv) {
      this._done = true;
      this._rv = rv;
      if (this._ondone)
        this._ondone(rv);
    },

    /**
     * Returns the arguments that were passed to the asynchronous method wrapper.
     * @return {Array<Object>}
     */
    args: function() {
      return this._args;
    }

  });

  /**
   * The return value from an asynchronous method.
   *
   * @see jsx3#$Y()
   * @since 3.7
   *
   * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.$AsyncRV", Object, null, function() {});
   */
  var AsyncRV = jsx3.$AsyncRV = function() {
  };
  extend(AsyncRV.prototype, {
    /* @jsxobf-clobber */
    _trigger: function(rv) {
      /* @jsxobf-clobber */
      this._done = true;
      /* @jsxobf-clobber */
      this._rv = rv;
      if (this._sub) {
        this._sub.each(function(e) { e(rv); });
        delete this._sub;
      }
    },

    /**
     * Returns the return value from the asynchronous method.
     * @return {Object}
     * @throws {Error} if called before <code>done()</code> is called on corresponding callback object.
     */
    rv: function() {
      if (!this._done)
        throw new Error("May not call $AsyncRV.rv() before the return value is set.");
      return this._rv;
    },

    /**
     * Registers code to be called when the asynchronous method completes.
     * <p/>
     * If argument <code>cb</code> is a function, then that function will be called when the asynchronous method
     * completes. This function will be called synchronously is the function has already completed. The
     * asynchronous method return value will be passed as the only argument to the function.
     * <p/>
     * If argument <code>cb</code> is an instance of <code>jsx3.$AsyncCB</code>, then its <code>done()</code> method
     * will be called when the asynchronous method completes. The done method will be passed the <code>rv</code>
     * argument it is is provided. Otherwise, it will be passed the return value of <code>cb</code>.
     *
     * @param cb {Function | jsx3.$AsyncCB} 
     * @param rv {Object}
     */
    when: function(cb, rv) {
      var fct = null;

      if (typeof(cb) == "function")
        fct = cb;
      else if (cb instanceof jsx3.$AsyncCB) {
        if (arguments.length > 1)
          fct = function() {cb.done(rv);};
        else
          fct = function(chainedRV) {cb.done(chainedRV);};
      } else
        throw new Error();

      if (this._done) {
        fct(this._rv);
      } else {
        if (!this._sub)
          /* @jsxobf-clobber */
          this._sub = jsx3.$A();
        this._sub.push(fct);
      }
    },

    /**
     * Creates and returns an asynchronous return value that completes when this and <code>rv</code> have completed.
     * @param rv {jsx3.$AsyncRV...}
     * @return {jsx3.$AsyncRV}
     */
    and: function(rv) {
      var a = [this];
      for (var i = 0; i < arguments.length; i++)
        a.push(arguments[i]);
      return new AndRV(a);
    },

    /**
     * Creates and returns an asynchronous return value that completes when this or <code>rv</code> have completed.
     * @param rv {jsx3.$AsyncRV...}
     * @return {jsx3.$AsyncRV}
     */
    or: function(rv) {
      var a = [this];
      for (var i = 0; i < arguments.length; i++)
        a.push(arguments[i]);
      return new OrRV(a);
    }
  });

  var MethodRV = function(cb) {
    /* @jsxobf-clobber */
    this._cb = cb;
    /* @jsxobf-clobber */
    cb._ondone = this._cbdone.bind(this);
  };
  MethodRV.prototype = new AsyncRV();
  extend(MethodRV.prototype, {
    /* @jsxobf-clobber */
    _cbdone: jsx3.$F(function(rv) {
      delete this._cb._ondone;
      this._trigger(rv);
    })
  });

  var AndRV = function(rvs) {
    /* @jsxobf-clobber */
    this._ct = rvs.length;
    /* @jsxobf-clobber */
    this._donect = 0;
    jsx3.$A(rvs).each(jsx3.$F(function(e) {
      if (e._done)
        this._donect++;
      else
        e.when(this._inc.bind(this));
    }).bind(this));

    if (this._ct == this._donect)
      this._trigger();
  };
  AndRV.prototype = new AsyncRV();
  extend(AndRV.prototype, {
    /* @jsxobf-clobber */
    _inc: jsx3.$F(function() {
      this._donect++;
      if (this._donect == this._ct)
        this._trigger();
    })
  });

  var OrRV = function(rvs) {
    jsx3.$A(rvs).each(jsx3.$F(function(e) {
      if (e._done)
        this._inc();
      else
        e.when(this._inc.bind(this));
    }).bind(this));
  };
  OrRV.prototype = new AsyncRV();
  extend(OrRV.prototype, {
    /* @jsxobf-clobber */
    _inc: jsx3.$F(function() {
      if (!this._done)
        this._trigger();
    })
  });

  /** @jsxdoc-category  jsx3 */

  /**
   * Injects class <code>jsx3.$Array</code> into array instance <code>a</code>.
   * @param a {Array | Object}
   * @since 3.7
   */
  jsx3.$A = function(a) {
    if (a == null) {
      a = [];
    } else if (a instanceof Array) {

    } else if (jsx3.$A.is(a)) {
      // works on arguments array
      var t = [];
      for (var i = 0; i < a.length; i++)
        t[i] = a[i];
      a = t;
    } else {
      a = [a];
    }

    return extend(a, jsx3.$Array);
  };

  jsx3.$A.is = function(a) {
    return a && typeof(a) == "object" && (a instanceof Array || typeof(a.length) == "number");
  };

  /**
   * Injects class <code>jsx3.$Hash</code> into object instance <code>o</code>. If <code>o</code> is an array, it
   * is first converted into an object by setting a property equal to <code>1</code> for each item in the array.
   *
   * @param o {Object | Array}
   * @since 3.7
   */
  jsx3.$H = function(o) {
    if (jsx3.$A.is(o)) {
      var h = {};
      for (var i = 0; i < o.length; i++)
        h[o[i]] = 1;
      return extend(h, jsx3.$Hash)
    } else {
      return extend(o || {}, jsx3.$Hash);
    }
  };

  /**
   * Injects class <code>jsx3.$String</code> into string instance <code>s</code>.
   * @param s {String}
   * @since 3.7
   */
  jsx3.$S = function(s) {
    if (s == null) return s;
    return extend(new String(s), jsx3.$String);
  };

  /**
   * Wraps an asynchronous method. An asynchronous method follows a very strict contract. It can be called
   * with any number of parameters but the wrapped method sees only a single parameter, an instance of
   * <code>jsx3.$AsyncCB</code>. The wrapped method must call <code>done()</code> on this
   * method parameter, either synchronously or asynchronously. The <code>done()</code> method takes a single
   * parameter, which is the return value of the method.
   * <p/>
   * The wrapped method should not itself return anything. The only exception to this is that the method may return
   * and instance of <code>jsx3.$AsyncRV</code>. In this case, the method will return when and with the same return
   * value as the returned instance of <code>jsx3.$AsyncRV</code>. 
   * <p/>
   * Client code that calls the asynchronous method will see a synchronous return value of type
   * <code>jsx3.$AsyncRV</code>. Client code should use the <code>when()</code> method of this return value to
   * continue execution when the asynchronous method has completed. Or this return value may be used in conjuction
   * with other asynchronous methods (such as by passing is as a parameter to an asynchronous method).
   * <p/>
   * Another feature of asynchronous methods is that you can pass instances of <code>jsx3.$AsyncRV</code> as
   * parameters to the method and the method is only invoked once all of those parameters have returned. The parameters
   * that the wrapped method sees are automatically converted into the return values of the <code>jsx3.$AsyncRV</code>
   * instances.
   *
   * @see jsx3.$AsyncCB
   * @see jsx3.$AsyncCB#done()
   * @see jsx3.$AsyncRV
   * @see jsx3.$AsyncRV#when()
   * @since 3.7
   *
   * @param f {Function} the function to wrap.
   * @return {Function} the wrapped function.
   */
  jsx3.$Y = function(f) {
    return function() {
      var cb = new jsx3.$AsyncCB(this, arguments);
      var rv = new MethodRV(cb);

//      var stack = (jsx3.lang && jsx3.lang.getStack) ? jsx3.lang.getStack() : [];
//      window.setTimeout(jsx3.$F(function() {
//        if (!cb._done) {
//          jsx3.log("Never finished: " + this + " " + f + "\nargs:" + jsx3.Method.argsAsArray(cb.args()) + "\n" +
//                   jsx3.Exception.formatStack(stack));
//        }
//      }).bind(this), 10000);

      if (cb._condition) {
        var objThis = this;
        cb._condition.when(function() {
          var r = f.apply(objThis, [cb]);
          if (r instanceof AsyncRV)
            r.when(cb);
        });
      } else {
        var r = f.apply(this, [cb]);
        if (r instanceof AsyncRV)
          r.when(cb);
      }

      return rv;
    };
  };

  /**
   * Returns an asynchronous wrapper of a synchronous method. The returned method is method <code>strMethod</code>
   * bound to object <code>objThis</code>. <code>objThis</code> is optional and may be an object or an instance of
   * <code>jsx3.$AsyncRV</code>. If the latter, then the wrapped method is only called on the return value of
   * <code>objThis</code> after <code>objThis</code> returns.
   * <p/>
   * The wrapper takes the same parameters as the wrapped method. However, instead of returning the return value of the
   * wrapped method, it returns an instance of <code>jsx3.$AsyncRV</code>.
   * <p/>
   * The returned method may be passed parameters that are actually instances of <code>jsx3.$AsyncRV</code>. In this
   * case, the wrapped method is only actually called when all the parameters have returned.
   *
   * @param strMethod {String | Function} the function to wrap or the name of a method of <code>objThis</code> to wrap.
   * @param objThis {Object | jsx3.$AsyncRV} optionally, the object to which to bind the wrapper.
   * @return {Function} the wrapper function.
   * @since 3.7
   */
  jsx3.$Z = function(strMethod, objThis) {
    if (objThis instanceof AsyncRV)
      objThis.when(function(rv) { objThis = rv; });

    return function() {
      var rv = new AsyncRV();
      var a = jsx3.Method.argsAsArray(arguments);

      if (objThis instanceof AsyncRV) {
        objThis.when(function() {
          onceDone(objThis, strMethod, a, rv);
        });
      } else {
        onceDone(objThis || this, strMethod, a, rv);
      }

      return rv;
    }
  };

  var onceDone = function(objThis, strMethod, args, rv) {
    var fct = typeof(strMethod) == "function" ? strMethod : objThis[strMethod];
    var c = handleAsyncArgs(args);
    if (c) {
      c.when(function() {
        rv._trigger(fct.apply(objThis, args))
      });
    } else {
      rv._trigger(fct.apply(objThis, args));
    }
  };

})(jsx3);/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/** @jsxdoc-category  jsx3.lang */

if (jsx3.lang == null) jsx3.lang = {};

(function(lang) {
  
  lang.STACK_MAX = 50;

  /**
   * @param intUp {int}
   * @return {Function}
   */
  lang.getCaller = function(intUp) {
    var skip = (intUp != null ? intUp : 0) + 1;
    var a = arguments;
    
    if (a.callee) {
      for (a = a.callee; a != null; a = a.caller) {
        if (--skip >= 0) continue;
        return a.caller;
      }      
    } else {
      for (a = a.caller; a != null; a = a.caller) {
        if (--skip >= 0) continue;
        return a.callee;
      }
    }
    
    return null;
  };
  
  /**
   * @param intUp {int}
   * @return {Array<Function>}
   */
  lang.getStack = function(intUp) {
    var stack = [];
    var skip = (intUp != null ? intUp : 0) + 1;
    var a = arguments;
    
    if (a.callee) {
      for (a = a.callee; a && a.caller && stack.length < jsx3.lang.STACK_MAX; a = a.caller) {
        if (--skip >= 0) continue;
        stack[stack.length] = a.caller;
      }
    } else {
      for (a = a.caller; a && a.callee; a = a.caller) {
        if (--skip >= 0) continue;
        stack[stack.length] = a.callee;
      }
    }
    
    return stack;
  };
  
  lang.setVar = function(strPath, objValue) {
    var tokens = strPath.split(".");
    var parent = window;
    for (var i = 0; i < tokens.length - 1; i++) {
      var token = tokens[i];
      if (!parent[token]) parent[token] = {};
      parent = parent[token];
    }    
    parent[tokens[tokens.length-1]] = objValue;
  };
  
  lang.getVar = function(strPath) {
    var tokens = strPath.split(".");
    var parent = window;
    for (var i = 0; i < tokens.length; i++) {
      if (parent == null) return;
      parent = parent[tokens[i]];
    }
    return parent;
  };
  
})(jsx3.lang);/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

if (window["jsx3"] == null) window["jsx3"] = {};
if (jsx3.lang == null) jsx3.lang = {};

jsx3.lang._NEW_FORCE = new window.Object();
jsx3.lang._NEW_NO_INIT = new window.Object();

jsx3.lang.newPrivateConstructor = function() {
  return function() {
    if (arguments[0] != jsx3.lang._NEW_FORCE) {
      var clazz = this.getClass ? this.getClass() : null;
      throw new jsx3.Exception(jsx3._msg("obj.no_inst", clazz || this));
    }
  };
};

jsx3.lang.newConstructor = function() {
  return function() {
    if (arguments[0] !== jsx3.lang._NEW_NO_INIT) {
      if (this.init) {
        this.init.apply(this, arguments);
      } else {
        var objConstr = jsx3.lang.getCaller(-1);
        throw new jsx3.Exception(jsx3._msg("obj.no_init", objConstr.jsxclass));
      }
    }
  };
};

/**
 * Base class for all classes defined with <code>jsx3.lang.Class</code>.
 *
 * <h4>Determining the Class of an Object</h4>
 * <p/>
 * The class of an object can be determined in one of several ways. 
 * <ol>
 * <li> <code>jsx3.lang.Object</code> defines the method 
 *   <code>getClass()</code>, which returns an instance of <code>jsx3.lang.Class</code>. This method is useful for 
 *   testing whether an object is an instance of exactly (not a superclass of) a class.</li>
 * <li>To test whether an object is an instance of a class or one of its superclasses, use the JavaScript operator
 *   <code>instanceof</code>: <code>obj instanceof jsx3.lang.Object</code>. <i>Note that the right hand argument of this
 *   expression must be the constructor function of a class and not of an interface defined with 
 *   <code>jsx3.Class.defineInterface()</code>)</i>.</li>
 * <li>To test whether an object implements an interface, use the method <code>instanceOf()</code> defined in 
 *   <code>jsx3.lang.Object</code>. This method will check against all classes and interfaces but is probably slower
 *   than the <code>instanceof</code> operator.</li>
 * </ol>
 * Examples:
 * <pre>
 * var doc = new jsx3.gui.Block();
 * doc.getClass().equals(jsx3.gui.Block.jsxclass);  // true
 * doc.getClass().equals(jsx3.app.Model.jsxclass);  // false, even though Block extends Model
 *
 * doc instanceof jsx3.gui.Block;  // true
 * doc instanceof jsx3.app.Model;  // true
 * doc instanceof jsx3.util.EventDispatcher;  // false, EventDispatcher is an interface
 * doc instanceof Object;          // true, works on non-jsx3.Class class constructors
 * 
 * doc.instanceOf(jsx3.gui.Block);            // true
 * doc.instanceOf(jsx3.app.Model.jsxclass);   // true, accepts arguments of type jsx3.Class
 * doc.instanceOf('jsx3.lang.Object');        // true, accepts arguments of type String
 * doc.instanceOf(jsx3.util.EventDispatcher); // true, works on interfaces
 * doc.instanceOf(Object);                    // true, works on non-jsx3.Class class constructors
 * </pre>
 *
 * @since 3.1
 *
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.lang.Object", null, null, function(){});
 */
jsx3.lang.Object = function() {
  this.init();
};

/* @jsxobf-clobber */
window._jsxtmp = function(Object, Object_prototype) {

  /**
   * Instance initializer.
   */
  Object_prototype.init = function() {
  };
  
  /**
   * Returns the class of this object.
   * @return {jsx3.lang.Class}
   */
  Object_prototype.getClass = function() {
    return this.__jsxclass__.jsxclass;
  };
  
  /**
   * Returns true if this object is equals to the <code>obj</code> parameter.
   * @param obj {Object} 
   * @return {boolean}
   */
  Object_prototype.equals = function(obj) {
    return this === obj;
  };
  
  /**
   * Returns a shallow copy of this object.
   * @return {jsx3.Object}
   */
  Object_prototype.clone = function() {
    return this.getClass().bless(this);
  };
  
  /**
   * Determines whether this object is an instance of <code>objClass</code>, that is, whether 
   *    <code>objClass</code> is equal to or a superclass or superinterface of this object's class.
   * @param objClass {Function|jsx3.lang.Class|String} the class to test, may be either the class constructor, and instance 
   *    of jsx3.lang.Class, or the fully-qualified class name
   * @return {boolean}
   * @throws {jsx3.IllegalArgumentException}  if <code>objClass</code> is a string that is not the name of a registered class
   */
  Object_prototype.instanceOf = function(objClass) {
    if (objClass instanceof jsx3.lang.Class) {
      return objClass.isInstance(this);
    } else if (typeof(objClass) == "function" && objClass.prototype != null) {
      return (this instanceof objClass) || (objClass.jsxclass != null && objClass.jsxclass.isInstance(this));
    } else if (typeof(objClass) == "string") {
      objClass = jsx3.lang.Class.forName(objClass);
      if (objClass != null)
        return objClass.isInstance(this);
    }  
    throw new jsx3.IllegalArgumentException("objClass", objClass);
  };

   /**
   * Alternate way of checking type instead of using instanceOf()
   * which requires the class that is passed as the argument 
   * to be loaded before the instanceOf() method is called
   * 
   * @param {String} strClass - Fully qualified class name as string 
   */
  Object_prototype.isType = function(strClassName){
   var classObj = this.getClass();
    if(strClassName == classObj.getName()){
        return true;
    } 
    else {
        classObjArr = classObj.getInheritance();
        if(classObjArr.length > 0){
            for(i=0; i < classObjArr.length ; i++){
                parentClassObj = classObjArr[i];
                if(strClassName == parentClassObj.getName()){
                    return true;
                }
            }
        }
    }
    return false;
  }

  /**
   * @return {String} a string representation of this object
   */
  Object_prototype.toString = function() {
    return "@" + this.getClass().getName();
  };
  
  /**
   * Calls the supermethod overridden by the method that calls jsxsuper(). The following example shows a chained instance
   * initializer method:
   * <pre>
   * Subclass.prototype.init = function(a, b, c) {
   *   this.jsxsuper(a, b);  // calls the init() method in the superclass of Subclass
   *   this.c = c;
   * };
   * </pre>
   * 
   * @param arg {Object...} the variable number of arguments passed to the supermethod
   * @return {Object|undefined} returns the result of the supermethod
   * @throws {jsx3.Exception} if called by a static method, if called by a method not defined in a call to 
   *    <code>jsx3.lang.Class.defineClass()</code>/<code>defineInterface()</code>, or if no suitable super method exists
   * @protected
   */
  Object_prototype.jsxsuper = function(arg) {
    var Exception = jsx3.Exception;
    var fctCaller = jsx3.lang.getCaller();
    var objMethod = fctCaller != null ? fctCaller.jsxmethod : null;
      
    if (objMethod == null || !(objMethod instanceof jsx3.lang.Method))
      throw new Exception(jsx3._msg("obj.super_funct", fctCaller));
    if (objMethod.isStatic())
      throw new Exception(jsx3._msg("obj.super_static", objMethod));
    
    var objClass = objMethod.getDeclaringClass();
    var objSuperMethod = objClass._getSuperMethodFor(objMethod);
    
    if (objSuperMethod == null)
      throw new Exception(jsx3._msg("obj.super_none", objMethod));
  
    var result = objSuperMethod.apply(this, arguments);
    if (typeof(result) != "undefined")
      return result;
  };
  
  /**
   * Like jsxsuper() but traverses up through all the interfaces implemented by this class and its super classes. This 
   * method facilitates modifying the functionality of a mixin interface for a particular class that implements the 
   * interface, as the following example shows:
   * <pre>
   * // imagine that the jsx3.Testable mixin interface defines a method test() that provides basic testing functionality
   * jsx3.Class.defineClass('eg.Test', null, [jsx3.Testable], function(Test){
   *
   *   Test.prototype.test = function() {
   *     this.setUpTest();      // do something before running the test
   *     this.jsxsupermix();    // calls test() in jsx3.Testable
   *     this.tearDownTest();   // do something after running the test
   *   };
   *
   * });
   * </pre>
   *
   * @param arg {Object...} the variable number of arguments passed to the supermethod
   * @return {Object/undefined} returns the result of the supermethod
   * @throws {jsx3.Exception} if called by a static method, if called by a method not defined in a call to 
   *    <code>jsx3.lang.Class.defineClass()</code>/<code>defineInterface()</code>, or if no suitable super method exists
   * @protected
   */
  Object_prototype.jsxsupermix = function(arg) {
    var Exception = jsx3.Exception;
    var fctCaller = jsx3.lang.getCaller();
    var objMethod = fctCaller != null ? fctCaller.jsxmethod : null;
      
    if (objMethod == null || !(objMethod instanceof jsx3.lang.Method))
      throw new Exception(jsx3._msg("obj.supmx_funct", fctCaller));
    if (objMethod.isStatic())
      throw new Exception(jsx3._msg("obj.supmx_static", objMethod));
    
    var objClass = objMethod.getDeclaringClass();
    var objSuperMethod = objClass._getSuperMixinMethodFor(objMethod);
    
    if (objSuperMethod == null)
      throw new Exception(jsx3._msg("obj.supmx_none", objMethod));
  
    var result = objSuperMethod.apply(this, arguments);
    if (typeof(result) != "undefined")
      return result;
  };


  /**
   * No-op.
   *
   * @param arg {Object...} the variable number of arguments passed to the method mixins.
   * @since 3.5
   * @deprecated  No-op, replaced with <code>jsx3.lang.AOP</code>.
   * @see jsx3.lang.AOP
   */
  Object_prototype.jsxmix = function(arg) {
  };



  /* DEPRECATED: Remove in 4.0? */
    
  /**
   * returns whether or not this object is an instance of @strClassName
   * @param strClassName {String} named class
   * @param strPropName {String} default is INTERFACES; one of the strings: INTERFACES or SUPERS
   * @param-private bIsRecurse {boolean} BRIDGE CODE; remove when old names fully deprecated/unsupported (release 4.0)
   * @return {boolean}
   * @deprecated  use <code>instanceof</code> or Object.instanceOf()
   */
  Object_prototype.isInstanceOf = function(strClassName,strPropName,bIsRecurse) {
    if (this.getClass() && 
        (typeof(strClassName) != "string" || jsx3.lang.Class.forName(strClassName) != null)) 
      return this.instanceOf(strClassName);
    
    //returns true if the instance is an instance of strClassName
    var f = jsx3.getClass(this.getInstanceOf());
  
    //default so that it's not necessary to call setInstanceOf()
    if(f == null) f = this.constructor;
    
    if(typeof(f) == "function") {
      var o = f[(strPropName) ? strPropName : "INTERFACES"];
      var e = (o) ? o[strClassName] : null;
  
  //BRIDGE: Remove this in 4.0
  //start
      if(e == 1) {
        return true;
      } else if(bIsRecurse) {
        return false;
      } else {
        return this.isInstanceOf(strClassName.replace(/jsx3/g,"jsx3.gui"),strPropName,true);
      }
  //end
  
  //BRIDGE: Replace with this
  //      return (e == 1);
  
    }
    return false;
  };
  
  /**
   * Returns whether or not this object is an instance of a subclass of @strClassName
   * @param strClassName {String} named superclass
   * @return {boolean}
   * @deprecated  no direct replacement
   */
  Object_prototype.isSubclassOf = function(strClassName) {
    return this.isInstanceOf(strClassName,"SUPERS");
  };
  
  /** 
   * gets the class name for the object (the function that was instanced via 'new' to create the object).  For example, jsx3.gui.Block, jsx3.gui.Tree, etc.
   * @return {String} class name of object
   * @deprecated  use Object.getClass()
   */
  Object_prototype.getInstanceOf = function() {
    if (this.getClass()) return this.getClass().getName();
    
    return this._jsxinstanceof ? this._jsxinstanceof : this.constructor.className;
  };
  
  /** 
   * sets the JSX object type (only set during object initialization; although custom code can be written to 'cast' an object type to another object type)
   * @param strInstanceOf {String} type of JSX object, such as jsx3.gui.Tree, jsx3.gui.Button, etc.
   * @deprecated  no direct replacement
   */
  Object_prototype.setInstanceOf = function(strInstanceOf) {
    this._jsxinstanceof = strInstanceOf;
    return this;
  };
  
  /**
   * returns the name of the package that this class belongs to; returns empty string if no package found
   * @return {String}
   * @deprecated  use <code>Object.getClass().getPackageName()</code>
   */
  Object_prototype.getInstanceOfPackage = function() {
    if (this.getClass()) return this.getClass().getPackageName();
    
    var fullName = this.getInstanceOf();
    if (fullName == null) return "";
    var index = fullName.lastIndexOf('.');
    if (index >= 0)
      return fullName.substring(0, index);
    else
      return "";
  };
  
  /** 
   * gets the class name (less the package prefix) that this object is an instance of
   * @return {String}
   * @deprecated  use <code>Object.getClass().getName()</code> and parse out final token
   */
  Object_prototype.getInstanceOfClass = function() {
    if (this.getClass()) {
      var name = this.getClass().getName();
      return name.substring(name.lastIndexOf(".") + 1);
    }
    
    var fullName = this.getInstanceOf();
    if (fullName == null) return "";
    var index = fullName.lastIndexOf('.');
    if (index >= 0)
      return fullName.substring(index+1);
    else
      return fullName;
  };


  /**
   * Evaluates a JavaScript expression in the context of this object with a controlled local variable context. 
   * Every name-value pair in <code>objContext</code> will be exposed as a local variable to the evaluated script. 
   * All names must be valid JavaScript names in order to be exposed as local variables. Any invalid names will be 
   * ignored.
   * 
   * @param strScript {String} the JavaScript to evaluate.
   * @param objContext {Object} a map containing the local variable context.
   * @return {Object} the results of evaluating <code>strScript</code>.
   * @see jsx3#eval()
   */
  Object_prototype.eval = function(strScript, objContext) {
    return jsx3.eval.call(this, strScript, objContext);
  };
  
};

window._jsxtmp(jsx3.lang.Object, jsx3.lang.Object.prototype);
window._jsxtmp = null;

/**
 * Throws an intelligible exception in Firefox when a call is made to a non-existent method.
 * @private
 */
jsx3.lang.Object.prototype.__noSuchMethod__ = function(strMethod, args) {
  throw new jsx3.Exception(jsx3._msg("class.nsm", this.getClass().getName() + "#" + strMethod + "()"));
};


/**
 * @deprecated  Renamed to jsx3.lang.Object
 * @see jsx3.lang.Object
 * @jsxdoc-definition  jsx3.Class.defineClass("inheritance", -, null, function(){});
 */
window.inheritance = jsx3.lang.Object;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber  _params
// @jsxobf-clobber-shared  _name _class _static _abstract

if (window["jsx3"] == null) window["jsx3"] = {};
if (jsx3.lang == null) jsx3.lang = {};

/**
 * JSX Class extends the build in JavaScript class Function. Provides reflection capabilities.
 *
 * @since 3.1
 *
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.lang.Method", null, null, function(){});
 */
jsx3.lang.Method = jsx3.lang.newPrivateConstructor();

jsx3.lang.Method.prototype = new jsx3.lang.Object;
jsx3.lang.Method.prototype.constructor = jsx3.lang.Method;

/* @jsxobf-clobber */
window._jsxtmp = function(Method, Method_prototype) {

  /** @private @jsxobf-clobber */
  Method._PARAMS = /^\s*function(\s+\w+)?\s*\(\s*([^\)]*?)\s*\)/;

  /** @private @jsxobf-clobber */
  Method_prototype._initParams = function() {
    if (Method._PARAMS.exec(this.getFunction().toString())) {
      var params = RegExp.$2;
      this._params = params ? params.split(/\s*,\s*/) : [];
    } else {
      this._params = [];
    }
  };

  /**
   * Returns the name of the method. The name of the method is determined when the class is defined.
   * @return {String}
   */
  Method_prototype.getName = function() {
    return this._name;
  };

  /**
   * Returns the number of parameters that this method takes (as declared in the JavaScript source).
   * @return {int}
   */
  Method_prototype.getArity = function() {
    if (this._params == null) this._initParams();
    return this._params.length;
  };

  /**
   * Returns the names of parameters that this method takes (as declared in the JavaScript source).
   * @return {Array<String>}
   */
  Method_prototype.getParameterNames = function() {
    if (this._params == null) this._initParams();
    return this._params.concat();
  };

  /**
   * Returns the name of a parameter that this method takes (as declared in the JavaScript source).
   * @param intIndex {int} the index of the parameter name to return
   * @return {String}
   */
  Method_prototype.getParameterName = function(intIndex) {
    if (this._params == null) this._initParams();
    return this._params[intIndex];
  };

  /**
   * Returns the class that defined this method.
   * @return {jsx3.lang.Class|jsx3.lang.Package}
   */
  Method_prototype.getDeclaringClass = function() {
    return this._class;
  };

  /**
   * Returns whether the definer of this class (returned by <code>getDeclaringClass()</code>) is in fact
   *    a package.
   * @return {boolean}
   */
  Method_prototype.isPackageMethod = function() {
    return this._class instanceof jsx3.lang.Package;
  };

  /**
   * Returns true if this method is static (is a class method).
   * @return {boolean}
   */
  Method_prototype.isStatic = function() {
    return this._static;
  };

  /**
   * Returns true if this method is abstract. Abstract methods will throw an Exception if they are
   *    invoked.
   * @return {boolean}
   */
  Method_prototype.isAbstract = function() {
    return this._abstract;
  };

  /**
   * Returns the native JavaScript function of this method.
   * @return {Function}
   */
  Method_prototype.getFunction = function() {
    if (this.isPackageMethod()) {
      return this._class.getNamespace()[this._name];
    } else {
      if (this._static) {
        return this._class.getConstructor()[this._name];
      } else {
        return this._class.getConstructor().prototype[this._name];
      }
    }
  };

  /**
   * Calls apply on the native function.
   * @param thisArg {Object} this argument to pass to <code>Function.apply()</code>
   * @param argArray {Array} argument array to pass to <code>Function.apply()</code>
   * @return {Object/undefined}
   */
  Method_prototype.apply = function(thisArg, argArray) {
    return this.getFunction().apply(thisArg, argArray);
  };

  /**
   * Calls call on the native function.
   * @param arg {Object...} arguments to pass to <code>Function.call()</code>, supports up to 11 arguments (this+10)
   * @return {Object/undefined}
   */
  Method_prototype.call = function(arg) {
    var a = arguments;
    if (a.length > 11)
      throw new jsx3.Exception(jsx3._msg("method.call", + a.length));
    return this.getFunction().call(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10]);
  };

  Method_prototype.toString = function() {
    return this._class.getName() + "." + this._name;
  };

  /**
   * Creates a new abstract method.
   * @param paramNames {String...} the names of the parameters that the abtract method will take
   * @return {Function}
   * @throws {jsx3.IllegalArgumentException}  if any element in paramNames is not a valid JavaScript identifier.
   */
  Method.newAbstract = function(paramNames) {
    var paramString = "";
    for (var i = 0; i < arguments.length; i++) {
      if (! arguments[i].match(/^[a-zA-Z_]\w*$/))
        throw new jsx3.IllegalArgumentException("paramNames[" + i + "]", arguments[i]);

      paramString += "'" + arguments[i] + "', ";
    }

    var functBody =
        'var method = arguments.callee.jsxmethod;' +
        'if (method instanceof jsx3.lang.Method) {' +
        '  throw new jsx3.Exception("method " + method.getName() + " in class " + method.getDeclaringClass() +' +
        '    " is abstract and may not be invoked");' +
        '} else {' +
        '  throw new jsx3.Exception("invoked abstract method improperly initialized");' +
        '}';

    var fnct = jsx3.eval("new Function(" + paramString + "'" + functBody + "');");

    fnct._abstract = true;
    return fnct;
  };

  Method.newDelegate = function(strMethod, strField) {
    var functBody = 'return this.' + strField + '.' + strMethod + '.apply(this.' + strField + ', arguments);';
    return new Function(functBody);
  };

  /** @package */
  Method.argsAsArray = function(args, from, to) {
    if (from == null)
      from = 0;

    if (to == null)
      to = args.length;
    else
      to = Math.min(to, args.length);

    var length = to - from;
    if (length <= 0) return [];

    var a = new Array(length);
    for (var i = 0; i < length; i++)
      a[i] = args[i+from];

    return a;
  };
};

window._jsxtmp(jsx3.lang.Method, jsx3.lang.Method.prototype);
window._jsxtmp = null;/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

if (window["jsx3"] == null) window["jsx3"] = new window.Object();
if (jsx3.lang == null) jsx3.lang = new window.Object();

// @jsxobf-clobber  _constructor _super _interface _implements _staticMethods _instanceMethods _instanceMethodIndex _staticFields _instanceFields _superMap _superMixinMap _ancestors
// @jsxobf-clobber-shared  _name _class _static _abstract _classDidLoad

/**
 * JavaScript class that allows introspection of the JSX class hierarchy.
 * <p/>
 * You may obtain an instance of <code>jsx3.lang.Class</code> in one of the following ways:
 * <ul>
 *   <li>var c = jsx3.Class.forName("jsx3.Object");</li>
 *   <li>var c = jsx3.Object.jsxclass;</li>
 * </ul>
 * This class is also used for defining classes. Use one of <code>defineClass</code> and
 * <code>defineInterface</code> to define a class in the JSX class hierarchy. <i>Note that any class defined
 * in the package <code>jsx3.lang</code> is aliased into the <code>jsx3</code> package. Therefore 
 * <code>jsx3.lang.Object</code> may also be referenced as <code>jsx3.Object</code>.</i>
 * <p/>
 * The following are class nomenclature definitions using jsx3.lang.Object as an example:
 * <ul>
 *   <li>jsx3.lang &#8212; the package, an instance of (JavaScript, not JSX) <code>Object</code></li>
 *   <li>jsx3.lang.Object &#8212; the class constructor, instance of <code>Function</code></li>
 *   <li>jsx3.lang.Object.jsxclass &#8212; the class, instance of <code>jsx3.lang.Class</code></li>
 *   <li>jsx3.lang.Object.prototype &#8212; the class prototype, instance of <code>Object</code></li>
 * </ul>
 * <p/>
 * The following is an example of how to define a new class called Example in package eg:
 * <pre>
 * jsx3.lang.Class.defineClass(
 *   "eg.Example",                   // the full name of the class to create
 *   eg.Base,                        // the class extends eg.Base
 *   [eg.Comparable, eg.Testable],   // the class implements interfaces eg.Comparable and eg.Testable
 *   function(Example) {             // name the argument of this function "Example"
 *     
 *     // every class must define an init method since it is called automatically by the constructor
 *     Example.prototype.init = function(arg1) {
 *       this.arg1 = arg1;
 *     };
 *
 *     // define an instance method like this:
 *     Example.prototype.instanceMethod = function() {
 *       ...
 *     };
 *
 *     // define an abstract method like this:
 *     Example.prototype.abstractMethod = jsx3.Method.newAbstract();
 *
 *     // define a static method like this:
 *     Example.staticMethod = function() {
 *       ...
 *     };
 *
 *     // define a static field like this:
 *     Example.STATIC_FIELD = "...";
 *
 *     // define an instance field like this:
 *     Example.prototype.instanceField = "...";
 *   }
 * );
 * </pre>
 *
 * @see jsx3.lang.Object
 * @see jsx3.lang.Method
 * @see jsx3.lang.Package
 *
 * @since 3.1
 *
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.lang.Class", null, null, function(){});
 */
jsx3.lang.Class = jsx3.lang.newPrivateConstructor();

// bootstrap Class superclass
jsx3.lang.Class.prototype = new jsx3.lang.Object;
jsx3.lang.Class.prototype.__jsxclass__ = jsx3.lang.Class;

/* @jsxobf-clobber */
window._jsxtmp = function(Class, Class_prototype) {
  
  /** @private @jsxobf-clobber */
  Class._SPECIAL = {"jsx3.lang.Object":1, "jsx3.lang.Method":1, "jsx3.lang.ClassLoader": 1, "jsx3.lang.Class": 2};
  
  /** @private @jsxobf-clobber */
  Class._NON_ITERATED = ["toString", "valueOf"];
  
  /** @private @jsxobf-clobber */
  Class._SKIP_ITERATED = {prototype:1, constructor:1, jsxclass:1, __jsxclass__:1}; // Mozilla browser likes to iterate over the first two

  /** @private @jsxobf-clobber */
  Class._LOG = null;

  /**
   * Defines a new class in the JSX hierarchy. After executing this method, an instance of 
   * jsx3.lang.Class representing the new class will be available for introspection.
   *
   * @param strName {String} the full name of the class to create, including the package prefix
   * @param objExtends {Function|jsx3.Class} the super class of the class to create; either the class constructor
   *     or the jsx3.Class instance itself. If no super class is provided, jsx3.Object will be used. May be
   *     null. If provided and representing an introspectable class, must be a class rather than an interface.
   * @param arrImplements {Array<jsx3.Class|Function|String>} the array of interfaces that the class to create will implement. Each item in
   *     the array may be either a class constructor, an instance of jsx3.Class, or a string but must represent an 
   *     interface (a class created with <code>defineInterface</code>). May also be null or empty.
   * @param fctBody {Function} a function that defines the body of the class. This function takes two arguments,
   *     the constructor of the newly created interface, and its prototype. See class summary for more information.
   */
  Class.defineClass = function(strName, objExtends, arrImplements, fctBody) {
    this._define(strName, objExtends, arrImplements, fctBody, false);
  };
  
  /**
   * Defines a new interface in the JSX hierarchy. After executing this method, an 
   * instance of jsx3.lang.Class representing the new interface will be available for introspection.
   *
   * @param strName {String} the full name of the interface to create, including the package prefix
   * @param objExtends {Function|jsx3.Class} the super interface of the interface to create; either the class 
   *     constructor or the jsx3.Class instance itself. If no super interface is provided, Object will be used. 
   *     May be <code>null</code>. If provided and representing an introspectable class, must be an interface rather
   *     than a class.
   * @param fctBody {Function} a function that defines the body of the interface. This function takes two arguments,
   *     the constructor of the newly created interface, and its prototype. See class summary for more information.
   */
  Class.defineInterface = function(strName, objExtends, fctBody) {
    this._define(strName, objExtends, null, fctBody, true);
  };

  /**
  * static method used to check if a class/interface is defined or not
  * 
  * @param {String} strType - Fully qualified name of a class/interface
  */
  Class.isDefined = function(strType){
    var objClass = jsx3.Class.forName(strType);
    // DEPRECATED: check for un-registered class
    if (objClass == null)
      objClass = jsx3.getClass(strType);

      if(objClass == null){
        return false;
      }
    return objClass;
  };

  //array of callbacks that need to be invoked after loading each and every class/interface
  Class._jsxClassLoadedListeners = jsx3.$A([]);

  /**
  * used to add a function to the list of listeners that will
  * be notified when any class/interface is loaded
  * 
  * @param {Function} toAdd
  */
  Class.addClassLoadedListener = function(toAdd){
    var registry = Class._jsxClassLoadedListeners;
    registry.push(toAdd);
  };

  /**
  * Helper function used to notify the listeners
  * 
  * @param {String} strType - the name of the class/interface that was loaded
  */
  Class._execListenersFromRegistry = function(strType){
    var registry = Class._jsxClassLoadedListeners;
    for (var i = 0; i < registry.length; i++) {
      var cb = registry[i];
      cb(strType);
    }
  };

  /**
  * Used to remove a function form the list of listeners that will be
  * notified when any class/interface is loaded
  * 
  * @param {Function} toRem 
  */
  Class.removeClassLoadedListener = function(toRem){
    var i = Class._jsxClassLoadedListeners.indexOf(toRem);
    if(i >= 0){
      Class._jsxClassLoadedListeners.splice(i,1);
    }
  };

  /** @private @jsxobf-clobber */
  Class._define = function(strName, objExtends, arrImplements, fctBody, bInterface) {
    if (Class._LOG == null && Class.forName && Class.forName("jsx3.util.Logger.Manager")
        && jsx3.util.Logger.Manager.getManager())
      Class._LOG = jsx3.util.Logger.getLogger("jsx3.lang.Class");

    // parse name into package and class name
    var pathTokens = strName.split(".");
    var className = pathTokens.pop();
    var myPackage = this._getOrCreatePackage(pathTokens);
    var bSpecial = this._SPECIAL[strName] != null;
    
    // resolve the super class
    var fctSuperConstructor = null;
    if (objExtends == null) {
      fctSuperConstructor = (bInterface || strName == "jsx3.lang.Object") ? window.Object : jsx3.lang.Object;
    } else if (objExtends instanceof Class) {
      fctSuperConstructor = objExtends.getConstructor();
    } else if (typeof(objExtends) == "function" && objExtends.prototype != null) {
      fctSuperConstructor = objExtends;
    } else {
      Class._throw(jsx3._msg("class.bad_super", objExtends));
    }
    
    if (myPackage[className] && myPackage[className].jsxclass) {
      Class._throw(jsx3._msg("class.redefine", strName, myPackage[className].jsxclass), null, 2);
    } else {
      var bConstructorExists = false;
      if (!bSpecial) {
        // check inheritance rules
        if (fctSuperConstructor.jsxclass != null) {
          if (bInterface && ! fctSuperConstructor.jsxclass.isInterface())
            Class._throw(jsx3._msg("class.int_ext_class", strName, fctSuperConstructor.jsxclass));
          if (! bInterface && fctSuperConstructor.jsxclass.isInterface())
            Class._throw(jsx3._msg("class.class_ext_int", strName, fctSuperConstructor.jsxclass));
        }

        // create the constructor, which calls init()
        if (typeof(myPackage[className]) == "function") {
          bConstructorExists = true;
        } else if (bInterface) {
          // will this work with JavaScript prototype inheritance?
          myPackage[className] = jsx3.lang.newPrivateConstructor();
        } else if (typeof(myPackage[className]) == "object") {
          // support a class being defined previously as a package ...
          var tmp = myPackage[className];
          myPackage[className] = jsx3.lang.newConstructor();
          for (var f in tmp)
            myPackage[className][f] = tmp[f];
        } else {
          myPackage[className] = jsx3.lang.newConstructor();
        }

        // set up JavaScript inheritance
        myPackage[className].prototype = this._newInstanceNoInit(fctSuperConstructor, bInterface);
      }

      // create a reference from constructor to jsx3.lang.Class
      myPackage[className].prototype.__jsxclass__ = myPackage[className];

      var fctConstructor = myPackage[className];

      // alias jsx3.lang to jsx3
      if (pathTokens.join(".") == "jsx3.lang")
        jsx3[className] = fctConstructor;

      // create the jsx3.lang.Class instance, bootstrap since we use this method to create Class as well
      var objClass = Class._newInstanceForce(Class);
      objClass._name = strName;
      /* this reference seems to be OK */
      objClass._constructor = fctConstructor; // create 2-way reference, if removed will still work
      if (fctSuperConstructor != null)
        objClass._super = fctSuperConstructor.jsxclass; // may be null, ok
      objClass._interface = bInterface;
      objClass._implements = [];
      objClass._staticMethods = [];
      objClass._instanceMethods = [];
      var staticFields = objClass._staticFields = [];
      var instanceFields = objClass._instanceFields = [];
      objClass._superMap = {};
      objClass._superMixinMap = {};

      fctConstructor.jsxclass = objClass;

      // define the body of the class
      try {
        fctBody(fctConstructor, fctConstructor.prototype);
      } catch (e) {
        var ex = jsx3.NativeError ? jsx3.NativeError.wrap(e) : null;
        Class._throw(jsx3._msg("class.def_error", strName, ex || e.description), ex);
      }

      // define static methods
      for (var f in fctConstructor) {
        if (Class._SKIP_ITERATED[f]) continue;

        if (typeof(fctConstructor[f]) == "function") {
          this._blessMethod(fctConstructor[f], objClass, f, true);
        } else {
          staticFields[staticFields.length] = f;
        }
      }
      // static methods that don't show up in a for loop
      for (var i = 0; i < Class._NON_ITERATED.length; i++) {
        var name = Class._NON_ITERATED[i];
        if (fctConstructor[name] != null && fctConstructor[name] != window.Function.prototype[name] &&
            fctConstructor[name].jsxmethod == null)
          this._blessMethod(fctConstructor[name], objClass, name, true);
      }

      // define instance methods and fields
      for (var f in fctConstructor.prototype) {
        if (Class._SKIP_ITERATED[f]) continue;

        var funct = fctConstructor.prototype[f];
        if (typeof(funct) == "function") {
          if (fctSuperConstructor == null || funct != fctSuperConstructor.prototype[f])
            this._blessMethod(funct, objClass, f, false);
        } else {
          instanceFields[instanceFields.length] = f;
        }
      }
      // instance methods that don't show up in a for loop
      for (var i = 0; i < Class._NON_ITERATED.length; i++) {
        var name = Class._NON_ITERATED[i];
        if (fctConstructor.prototype[name] != null && fctConstructor.prototype[name] != window.Object.prototype[name] &&
            fctConstructor.prototype[name].jsxmethod == null)
          this._blessMethod(fctConstructor.prototype[name], objClass, name, false);
      }

      // ensure init() method defined
      if (!bConstructorExists && !bInterface && !(typeof(fctConstructor.prototype.init) == "function"))
        Class._throw(jsx3._msg("class.no_init", strName));

      // import mixin interface methods
      if (jsx3.$A.is(arrImplements)) {
        // go backwards through interfaces because we clobber and first defined interface has precedence
        for (var i = arrImplements.length-1; i >= 0; i--)
          Class._defineImplements(objClass, fctConstructor, arrImplements[i]);
      }

      if (Class._LOG)
        Class._LOG.trace("loaded " + strName);

  // Enables Class.require(), which is commented out below.
  //    Class._checkWaiting();
      jsx3.CLASS_LOADER._classDidLoad(objClass);
      //Invokes the callback functions that need to be called after a class or interface is loaded
      //Note : Event handling mechanism using the Event Class should not be used here 
      //as Class is higher up in the heirarchy compared to Event
      this._execListenersFromRegistry(strName);
    }
  };
  
  /** @private @jsxobf-clobber */
  Class._defineImplements = function(objClass, fctConstructor, anInterface) {
    if (typeof(anInterface) == "function" && anInterface.jsxclass != null)
      anInterface = anInterface.jsxclass;
    else if (!(anInterface instanceof Class))
      Class._throw(jsx3._msg("class.bad_int", objClass, anInterface));
        
    if (! anInterface.isInterface())
      Class._throw(jsx3._msg("class.class_imp_class", objClass, anInterface));

    // import interface methods into this class
    var interfacePrototype =  anInterface.getConstructor().prototype;
    for (var f in interfacePrototype) {
      var interfaceFunction = interfacePrototype[f];
      var interfaceMethod = typeof(interfaceFunction) == "function" ? interfaceFunction.jsxmethod : null;
      if (interfaceMethod == null) continue;
      var existingFunction = fctConstructor.prototype[f];
          
      // import method if no existing method by that name ...
      if (existingFunction == null) {
        fctConstructor.prototype[f] = interfaceFunction;
      } 
      // ... or if there is existing method but it wasn't defined in this class
      else if (! existingFunction.jsxmethod.getDeclaringClass().equals(objClass)) {
        fctConstructor.prototype[f] = interfaceFunction;
      }
    }
  
    // add interface to list of interfaces
    objClass._implements.unshift(anInterface);
  };
  
  /**
   * @private
   */
  Class._getOrCreatePackage = function(arrTokens) {
    var node = window;
    for (var i = 0; i < arrTokens.length; i++) {
      var token = arrTokens[i];
      if (node[token] == null) node[token] = new window.Object();
      node = node[token];
    }
    return node;
  };
  
  /** @private @jsxobf-clobber */
  Class._blessMethod = function(fctMethod, objClass, strName, bStatic) {
    if (fctMethod.jsxmethod instanceof jsx3.lang.Method) {
      if (fctMethod.jsxmethod.getDeclaringClass().equals(objClass))   
        Class._throw(jsx3._msg("class.redef_method", fctMethod.jsxmethod, objClass + "." + strName));
      else
        return;
    }
    
    var objMethod = Class._newInstanceForce(jsx3.lang.Method);
    /* this reference seems to be OK */
    objMethod._class = objClass;
    objMethod._name = strName;
    objMethod._static = bStatic;
    objMethod._abstract = Boolean(fctMethod._abstract);

    fctMethod.jsxmethod = objMethod;

    var collection = bStatic ? objClass._staticMethods : objClass._instanceMethods;
    collection[collection.length] = objMethod;
  };
  
  /** @private @jsxobf-clobber */
  Class._newInstanceNoInit = function(fctConstructor, bInterface) {
    if (fctConstructor == Object) return {};
    return new fctConstructor(bInterface ? jsx3.lang._NEW_FORCE : jsx3.lang._NEW_NO_INIT);
  };
  
  /**
   * @private
   */
  Class._newInstanceForce = function(fctConstructor) {
    return new fctConstructor(jsx3.lang._NEW_FORCE);
  };
  
  /** @private @jsxobf-clobber */
  Class._throw = function(strMessage, objCause, intLevel) {
    if (Class._LOG) {
      Class._LOG.log(intLevel || jsx3.util.Logger.FATAL, strMessage, objCause);
    } else if (jsx3.Exception) {
      var e = new jsx3.Exception(strMessage, objCause);
      window.alert(e.printStackTrace());
    } else {
      window.alert(strMessage);
    }
  };
};

window._jsxtmp(jsx3.lang.Class, jsx3.lang.Class.prototype);
window._jsxtmp = null;

jsx3.lang.Class.defineClass("jsx3.lang.Class", null, null, function(Class, Class_prototype) {
  
  /**
   * Retrieve an instance of jsx3.Class for a fully-qualified class name. This method will also return aliased 
   * classes such as <code>jsx3.Object</code>. Thus the name of the class returned by this method may not always equal the value
   * of the <code>strName</code> parameter.
   * 
   * @param strName {String} the fully-qualified (including package prefix) class name
   * @return {jsx3.Class}
   */
  Class.forName = function(strName) {
    var c = jsx3.lang.getVar(strName);
    return c ? c.jsxclass : null;
  };

// JCG: Wrote this and now I don't use it anymore. Maybe it will come in handy in the future.
//
//  /* @private @--jsxobf-clobber */
//  Class._WAITING = [];
//  
//  /*
//   * Invokes a callback function once all prerequisite classes are loaded.
//   * @param arrPrereq {Array<String>} a list of fully-qualified class names.
//   * @param fctCallback {Function} the callback function. This method will be called synchronously if all 
//   *    prerequisites are already loaded.
//   * @package
//   */
//  Class.require = function(arrPrereq, fctCallback) {
//    for (var i = 0; i < arrPrereq.length; i++) {
//      if (! Class.forName(arrPrereq[i])) {
//        Class._WAITING.push([arrPrereq, fctCallback]);
//        return;
//      }
//    }
//    fctCallback();
//  };
//  
//  /* @private @--jsxobf-clobber */
//  Class._checkWaiting = function() {
//    WAITING: for (var i = 0; i < Class._WAITING.length; i++) {
//      var arrPrereq = Class._WAITING[i][0];
//      PREREQ: for (var j = 0; j < arrPrereq.length; j++) {
//        if (! Class.forName(arrPrereq[j]))
//          continue WAITING;
//      }
//      
//      var fctCallback = Class._WAITING[i][1];
//      Class._WAITING.splice(i--, 1);
//      fctCallback();
//    }
//  };
  
  /**
   * Returns the fully-qualified name of this class.
   * @return {String}
   */
  Class_prototype.getName = function() {
    return this._name;
  };
  
  /**
   * Returns the package of this class. This may be null if the namespace that this class was 
   *    defined in was never initialized with <code>jsx3.lang.Package.definePackage</code>.
   * @return {jsx3.Package}
   */
  Class_prototype.getPackage = function() {
    var path = this._name;
    while (true) {
      // get the fully-qualified name less the last token
      var index = path.lastIndexOf(".");
      if (index < 0) break;
      path = path.substring(0, index);
      // check for a package
      var pkg = jsx3.lang.Package.forName(path);
      if (pkg != null) return pkg;
      // OR, this could be an inner class
      if (Class.forName(path) == null) break;
    }
    return null;
  };
  
  /**
   * Returns the package name of this class, e.g. <code>jsx3.lang</code>. If the package containing this class has
   * been defined, then this method returns the name of the package. Otherwise, it returns the fully-qualified name
   * of this class less the final token.
   * @return {String}
   */
  Class_prototype.getPackageName = function() {
    var pkg = this.getPackage();
    if (pkg) {
      return pkg.getName();
    } else {
      var index = this._name.lastIndexOf(".") + 1;
      return index >= 0 ? this._name.substring(0, index-1) : "";
    }
  };
  
  /**
   * Returns the constructor function of this class.
   * @return {Function}
   */
  Class_prototype.getConstructor = function() {
    if (this._constructor != null) return this._constructor;
    
    var c = jsx3.lang.getVar(this._name);
    return c || null;
  };
  
  /**
   * Returns the super class of this class. This will be null for an interface without a super interface or 
   * <code>jsx3.lang.Object</code>.
   * @return {jsx3.Class} null if no super class is defined
   */
  Class_prototype.getSuperClass = function() {
    return this._super;
  };
  
  /**
   * Returns whether this class was defined as an interface.
   * @return {boolean}
   */
  Class_prototype.isInterface = function() {
    return this._interface;
  };
  
  /**
   * @return {String}
   */
  Class_prototype.toString = function() {
    return this._name;
  };
  
  /**
   * Creates a new instance of this class by invoking the class constructor. This is equivalent to calling 
   * <code>new()</code> on this class's constructor function and will call the class's <code>init()</code> method.
   * @param arg {Object...} the variable number of arguments to send to the constructor
   * @return {Object}
   */
  Class_prototype.newInstance = function(arg) {
    if (arguments.length > 10)
      throw new jsx3.Exception(jsx3._msg("class.new_inst"));
    var a = arguments;
    var c = this.getConstructor();
    return new c(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]);
  };
  
  /**
   * Determines whether an object is an instance of this class.
   * @param obj {Object} the object to test
   * @return {boolean}
   * @throws {Error} if <code>obj</code> is <code>null</code>.
   */
  Class_prototype.isInstance = function(obj) {
    var objClass = obj.__jsxclass__ ? obj.__jsxclass__.jsxclass : null;
    return objClass != null && this.isAssignableFrom(objClass);
  };
  
  /**
   * Determines whether this class is the same as or is a superclass or superinterface
   *    of parameter <code>objClass</code>.
   * @param objClass {jsx3.Class} the class to test
   * @return {boolean}
   */
  Class_prototype.isAssignableFrom = function(objClass) {
    if (this.equals(objClass)) return true;
    
    // lazily create ancestor hash
    if (objClass._ancestors == null)
      objClass._cacheAncestors();
    
    return objClass._ancestors[this.getName()] == true;
  };

  /** @private @jsxobf-clobber */
  Class_prototype._cacheAncestors = function() {
    this._ancestors = {};
    for (var i = 0; i < this._implements.length; i++) {
      var anInterface = this._implements[i];
      this._ancestors[anInterface.getName()] = true;
      
      if (anInterface._ancestors == null)
        anInterface._cacheAncestors();
      for (var f in anInterface._ancestors)
        this._ancestors[f] = true;
    }
    
    if (this._super != null) {
      this._ancestors[this._super.getName()] = true;
      if (this._super._ancestors == null)
        this._super._cacheAncestors();
      for (var f in this._super._ancestors)
        this._ancestors[f] = true;
    }
  };
  
  /**
   * Copies all the instance methods in this class into an instance (of another class).
   * @param obj {Object} the target of the method transfer
   * @param bNoClobber {boolean} if true, then do not transfer any methods already existing in <code>obj</code>
   * @param arrNames {Array<String>}
   */
  Class_prototype.mixin = function(obj, bNoClobber, arrNames) {
    if (arrNames) {
      for (var i = 0; i < arrNames.length; i++) {
        var method = this.getInstanceMethod(arrNames[i]);
        if (method && obj[method.getName()] == null || !bNoClobber)
          obj[method.getName()] = method.getFunction();
      }
    } else {
      for (var i = 0; i < this._instanceMethods.length; i++) {
        var method = this._instanceMethods[i];
        if (obj[method.getName()] == null || !bNoClobber)
          obj[method.getName()] = method.getFunction();
      }
    }
  };
  
  /**
   * Creates a new instance of this class and populates its properties with the properties of the 
   *    <code>obj</code> parameter. <b>Does not call <code>init()</code> when instantiating the class.</b>
   * @param obj {Object} Optional parameter. If provided, this method will copy all the properties of <code>obj</code>
   *    into the newly created object.
   * @return {jsx3.Object} a new instance of this class
   * @throws {jsx3.Exception} if called on an instance of <code>jsx3.lang.Class</code> that represents an interface
   */
  Class_prototype.bless = function(obj) {
    if (this.isInterface())
      throw new jsx3.Exception(jsx3._msg("class.bless_int", this));
    
    var instance = Class._newInstanceNoInit(this.getConstructor());
    if (obj != null) {
      for (var f in obj) {
        if (!(typeof(obj[f]) == "function"))
          instance[f] = obj[f];
      }
    }
    return instance;
  };
  
  /**
   * Creates a new instance of this class so that it can be used to create a java-style inner
   * class extending this class. This method will instantiate an interface or a class, in which case the 
   * <code>init()</code> method will be called. In this way you can accomplish the following:
   * <pre>
   * var aClass = eg.Testable.jsxclass;       // get jsx3.lang.Class instance
   * var innerClass = aClass.newInnerClass(); // create inner class instance
   * innerClass.test = function() {};         // implement the eg.Testable interface
   * innerClass instanceof eg.Testable;       // evaluates to true
   * </pre>
   *
   * @param arg {Object...} arguments to pass to the constructor, supports up to 10 arguments
   * @return {jsx3.Object} a new instance of this class
   */
  Class_prototype.newInnerClass = function(arg) {
    if (this.isInterface()) {
      return Class._newInstanceForce(this.getConstructor());
    } else {
      return this.newInstance.apply(this, arguments);
    }
  };
  
  /**
   * Returns the array of static methods defined for this class.
   * @return {Array<jsx3.Method>} an array of jsx3.lang.Method instances
   */
  Class_prototype.getStaticMethods = function() {
    return this._staticMethods.concat();
  };
  
  /**
   * Returns the array of instance methods defined for this class.
   * @return {Array<jsx3.Method>} an array of jsx3.lang.Method instances
   */
  Class_prototype.getInstanceMethods = function() {
    return this._instanceMethods.concat();
  };
  
  /**
   * Returns the static method defined in this class with name <code>strMethodName</code>.
   * @param strMethodName {String} the name of the method to find
   * @return {jsx3.Method} the method or null if none found matching <code>strMethodName</code>
   */
  Class_prototype.getStaticMethod = function(strMethodName) {
    for (var i = 0; i < this._staticMethods.length; i++) {
      if (strMethodName == this._staticMethods[i].getName())
        return this._staticMethods[i];
    }
    return null;
  };
  
  /**
   * Returns the instance method defined in this class with name <code>strMethodName</code>.
   * @param strMethodName {String} the name of the method to find
   * @return {jsx3.Method} the method or null if none found matching <code>strMethodName</code>
   */
  Class_prototype.getInstanceMethod = function(strMethodName) {
    if (!this._instanceMethodIndex) {
      this._instanceMethodIndex = {};
      for (var i = 0; i < this._instanceMethods.length; i++)
        this._instanceMethodIndex[this._instanceMethods[i].getName()] = this._instanceMethods[i];
    }
    return this._instanceMethodIndex[strMethodName] || null;
  };
  
  /**
   * Returns the accessor (getter) method of this class's bean property <code>strProp</code>. Searches this class and
   * the classes that it inherits method from
   * for an instance method named "getStrProp" or "isStrProp" using the <code>strProp</code> parameter with the first
   * letter made uppercase.
   * @param strProp {String} the name of the bean property whose getter to return
   * @return {jsx3.Method} the method or null if none found
   */
  Class_prototype.getGetter = function(strProp) {
    strProp = strProp.charAt(0).toUpperCase() + strProp.substring(1);
    return this._findMethod("get" + strProp) || this._findMethod("is" + strProp);
  };
  
  /**
   * Returns the mutator (setter) method of this class's bean property <code>strProp</code>. Searches this class and
   * the classes that it inherits method from
   * for an instance method named "setStrProp" using the <code>strProp</code> parameter with the first
   * letter made uppercase.
   * @param strProp {String} the name of the bean property whose setter to return
   * @return {jsx3.Method} the method or null if none found
   */
  Class_prototype.getSetter = function(strProp) {
    strProp = strProp.charAt(0).toUpperCase() + strProp.substring(1);
    return this._findMethod("set" + strProp);
  };
  
  /**
   * Returns the array of static fields defined for this class.
   * @return {Array<String>} an array of String instances
   */
  Class_prototype.getStaticFieldNames = function() {
    return this._staticFields.concat();
  };
  
  /**
   * Returns the array of instance fields defined for this class.
   * @return {Array<String>} an array of String instances
   */
  Class_prototype.getInstanceFieldNames = function() {
    return this._instanceFields.concat();
  };
  
  /**
   * Returns the array of interfaces that this class was defined to implement. This method does not return the 
   * interfaces that this class implements by way of its superclass.
   * @return {Array<jsx3.Class>} an array of jsx3.Class instances
   */
  Class_prototype.getInterfaces = function() {
    return this._implements.concat();
  };
  
  /**
   * Causes this class to implement interface <b>objInterface</b>. This method is called after this class is
   * defined so it can be used to have this class implement an interface that is defined after it.
   * @param objInterface {jsx3.lang.Class}
   * @package  -> for now
   */
  Class_prototype.addInterface = function(objInterface) {
    var errmsg = null;
    if (this.isInterface())
      errmsg = "class.int_imp_int";
    else if (! objInterface.isInterface())
      errmsg = "class.class_imp_class";
    else if (objInterface.isAssignableFrom(this))
      errmsg = "class.already_imp";
    if (errmsg) throw new jsx3.Exception(jsx3._msg(errmsg, this, objInterface));

    Class._defineImplements(this, this.getConstructor(), objInterface);
    delete this._ancestors;
  };
  
  /**
   * Returns the array of classes and interfaces that this class inherits from, ordered by
   * precedence from highest to lowest. This is the same order the defines where an inherited method will come from.
   * <p/>
   * The order is: 
   * <ol><li>this class (not included in the returned array of this method)</li>
   * <li>the interfaces that this class implements in the order that they were passed to the defineClass() function</li>
   * <li>the superclass of this class ... recursively</li>
   * </ol>
   * @return {Array<jsx3.Class>} an array of jsx3.Class instances
   */
  Class_prototype.getInheritance = function() {
    var inherit = this._implements.concat();
    if (this._super != null) {
      inherit[inherit.length] = this._super;
      inherit.push.apply(inherit, this._super.getInheritance());
    }
    return inherit;
  };
  
  /**
   * Returns an array of all the classes defined in this class. This method returns the JSX equivalent of Java's 
   * public static inner classes. 
   * <p/>
   * To be returned by this method, a static inner class should be defined after the containing class is defined, 
   * like this:
   * <pre>
   * jsx3.Class.defineClass("eg.ContainingClass", null, null, function(){});
   * jsx3.Class.defineClass("eg.ContainingClass.InnerClass", null, null, function(){});
   * </pre>
   *
   * @return {Array<jsx3.Class>}
   */
  Class_prototype.getClasses = function() {
    var constructor = this.getConstructor();
    var classes = [];
    for (var f in constructor) {
      if (typeof(constructor[f]) == "function" && constructor[f].jsxclass instanceof Class) {
        classes[classes.length] = constructor[f].jsxclass;
        classes.push.apply(classes, constructor[f].jsxclass.getClasses());
      }
    }
    return classes;
  };

  /**
   * Adds an after advice function to a method of this class via AOP. The pointcut is only active for instances of
   * <code>objClass</code>.
   *
   * @param strMethod {String} the name of the method of this class to which to add the advice.
   * @param objClass {jsx3.lang.Class} the type condition for the pointcut.
   * @param strMixin {String} the name of the method to call from the advice function. This method is called on the
   *   the same instance of this class on which <code>strMethod</code> is called. 
   * @since 3.5
   * @see jsx3.lang.AOP
   */
  Class_prototype.addMethodMixin = function(strMethod, objClass, strMixin) {
    var objMethod = this.getInstanceMethod(strMethod);
    if (!objMethod) Class._throw(jsx3._msg("class.mmix_bad", this, strMethod));
    
    var AOP = jsx3.AOP;
    if (!AOP) Class._throw(jsx3._msg("class.no_aop", this, strMethod));
    
    var pointName = this.getName() + "." + strMethod + "." + objClass.getName();
    AOP.pc(pointName, {classes:this, methods:strMethod, type:objClass}).after(pointName, function() {
      this[strMixin].apply(this, jsx3.Method.argsAsArray(arguments, 1));
    });
  };
  
  /**
   * Looks in the inheritance list of this class for a method. This should always match what is actually in the
   * class prototype.
   * @return {jsx3.Method}
   * @private
   * @jsxobf-clobber
   */
  Class_prototype._findMethod = function(strMethodName, bExcludeSelf) {
    var objMethod = null;
    
    // look in self
    if (! bExcludeSelf)
      objMethod = this.getInstanceMethod(strMethodName);
    
    var inheritance = this.getInheritance();
    for (var i = 0; objMethod == null && i < inheritance.length; i++) {
      objMethod = inheritance[i].getInstanceMethod(strMethodName);
    }

    return objMethod;
  };
  
  /**
   * Looks in the superclasses of this class for a method.
   * @return {jsx3.Method}
   * @private
   * @jsxobf-clobber
   */
  Class_prototype._findSuperMethod = function(strMethodName, bExcludeSelf) {
    var objMethod = null;
    
    // look in self
    if (! bExcludeSelf)
      objMethod = this.getInstanceMethod(strMethodName);

    // look in superclass
    if (objMethod == null && this._super != null)
      objMethod = this._super._findSuperMethod(strMethodName);
    
    return objMethod;
  };
  
  /**
   * Looks in the super interfaces of this class for a method.
   * @return {jsx3.Method}
   * @private
   * @jsxobf-clobber
   */
  Class_prototype._findMixinMethod = function(strMethodName) {
    var objMethod = null;

    for (var i = 0; i < this._implements.length && objMethod == null; i++)
      objMethod = this._implements[i].getInstanceMethod(strMethodName);

    if (objMethod == null && this._super != null)
      objMethod = this._super._findMixinMethod(strMethodName);
    
    return objMethod;
  };
  
  /**
   * @return {jsx3.Method}
   * @package
   */
  Class_prototype._getSuperMethodFor = function(objMethod) {
    var methodName = objMethod.getName();
    var superMethod = this._superMap["m:" + methodName];
    
    // will be null if already queried and not found, if undefined need to query still
    if (typeof(superMethod) == "undefined") {
      this._superMap["m:" + methodName] = superMethod = this._findSuperMethod(methodName, true);
    }
    
    return superMethod;
  };
  
  /**
   * @return {jsx3.Method}
   * @package
   */
  Class_prototype._getSuperMixinMethodFor = function(objMethod) {
    var methodName = objMethod.getName();
    var superMethod = this._superMixinMap["m:" + methodName];
    
    // will be null if already queried and not found, if undefined need to query still
    if (typeof(superMethod) == "undefined") {
      this._superMixinMap["m:" + methodName] = superMethod = this._findMixinMethod(methodName);
    }
    
    return superMethod;
  };
  
});

// define Object
jsx3.lang.Class.defineClass("jsx3.lang.Object", null, null, function(){});
// define Method 
jsx3.lang.Class.defineClass("jsx3.lang.Method", null, null, function(){});

// set up super class of Class
jsx3.lang.Class.jsxclass._super = jsx3.lang.Object.jsxclass;/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber  _before _after _around _name _cond _methodkeys _pc _method

/**
 * Simple aspect oriented programming for General Interface.
 * <p/>
 * Advice can be added before, after, and around any call to an instance method of a GI class. 
 * <p/>
 * <b>Note that only the exact class and subclasses loaded after a pointcut is defined are affected.</b> 
 * <p/>
 * <b>Note that only instance methods and not static methods can define pointcuts.</b>
 * <p/>
 * The second argument to the before, after, and around methods is the advice function, examples of which are 
 * provided here:
 * <pre>
 * jsx3.AOP.pc("myPointcut", {classes:"jsx3.xml.Document", methods:"load"});
 *
 * jsx3.AOP.before("myPointcut", function(strURL, intTimeout) {
 *   jsx3.log("load() called on " + this + " with URL " + strURL + ".");
 * });
 *
 * jsx3.AOP.after("myPointcut", function(rv, strURL, intTimeout) {
 *   jsx3.log("load() called on " + this + " with URL " + strURL + " returned " + rv + ".");
 * });
 *
 * jsx3.AOP.around("myPointcut", function(aop, strURL, intTimeout) {
 *   var t1 = new Date().getTime();
 *   var rv = aop.proceed(strURL, intTimeout);
 *   var tTotal = new Date().getTime() - t1;
 *   jsx3.log("load() called on " + this + " with URL " + strURL + " took " + tTotal + " ms and returned " + rv + ".");
 *   return rv;
 * });
 * </pre>
 * Note that after advice receives the method return value as the first method parameter. Note also that around
 * advice must manage the AOP chain by calling <code>proceed()</code> on the first method parameter and by returning
 * the return value of this call. 
 *
 * @since 3.6
 */
jsx3.Class.defineClass("jsx3.lang.AOP", null, null, function(AOP, AOP_prototype) {

  var IllegalArgumentException = jsx3.IllegalArgumentException;
  
  /** 
   * {Object<String,Object>} 
   * @private @jsxobf-clobber 
   */
  AOP._nameToPC = {};
  
  /** 
   * {Object<String,Object>} 
   * @private @jsxobf-clobber 
   */
  AOP._methodToPC = {};
  
  /**
   * Creates a new pointcut. The supported conditions are as follows:
   * <ul>
   *   <li>classes {String|Function|jsx3.Class|Array&lt;String|Function|jsx3.Class&gt;}: 
   *         the classes for which to look for methods.</li>
   *   <li>methods {String|Array&lt;String&gt;}: the names of the methods for which to add pointcuts. Any name can be a 
   *         regular expression with "*" expanded to <code>\w+</code>.</li>
   *   <li>type: {String|Function|jsx3.Class}: the pointcut will only affect objects that are 
   *         <code>instanceOf(type)</code>.</li>
   * </ul>
   * @param strName {String} the name of the pointcut to create.
   * @param objConditions {Object} the pointcut conditions. 
   */
  AOP.pc = function(strName, objConditions) {
    if (AOP._nameToPC[strName]) 
      throw new IllegalArgumentException();
    
    var pointcut = AOP._nameToPC[strName] = 
        {_name:strName, _before:[], _after:[], _around:[], _cond:objConditions, _methodkeys:[]};

    var methods = AOP._getMethods(objConditions);
    for (var i = 0; i < methods.length; i++) {
      var method = methods[i];
      var key = AOP._initMethod(method);
      AOP._methodToPC[key]._pc.push(pointcut);
      pointcut._methodkeys.push(key);
    }
    
    return AOP;
  };
  
  /**
   * Removes a pointcut.
   * @param strName {String} the name of the pointcut to remove.
   */
  AOP.pcrem = function(strName) {
    var pointcut = AOP._nameToPC[strName];
    if (pointcut) {
      var methodKeys = pointcut._methodkeys;
      for (var i = 0; i < methodKeys.length; i++) {
        var mObj = AOP._methodToPC[methodKeys[i]];
        mObj._pc.splice(jsx3.util.arrIndexOf(mObj._pc, pointcut), 1);
        if (mObj._pc.length == 0)
          AOP._restoreMethod(methodKeys[i]);
      }
      delete AOP._nameToPC[strName];
    }
  };
    
  /** @private @jsxobf-clobber */
  AOP._initMethod = function(objArr) {
    var c = objArr[0], mName = objArr[1];
    var key = c.getName() + "$" + mName;
      
    if (!AOP._methodToPC[key]) {
      var proto = c.getConstructor().prototype;

      // make sure not to add a pointcut around another pointcut
      if (!proto[mName]._aoppc) {
        AOP._methodToPC[key] = {_method:proto[mName], _pc:[]};

        var oldMethod = proto[mName].jsxmethod;

        proto[mName] = AOP._newCutPoint(key);

        // So that prototype[methodName].jsxmethod is still defined...
        proto[mName].jsxmethod = oldMethod;
      } else {
        AOP._methodToPC[key] = {_method:AOP._methodToPC[proto[mName]._aopkey]._method, _pc:[]};
      }
    }

    return key;
  };
   
  /** @private @jsxobf-clobber */
  AOP._restoreMethod = function(strKey) {
    var mObj = AOP._methodToPC[strKey];
    var fctMethod = mObj._method;
    var objMethod = fctMethod.jsxmethod;
    objMethod.getDeclaringClass().getConstructor().prototype[objMethod.getName()] = fctMethod;
    delete AOP._methodToPC[strKey];
  };
   
  /**
   * @param strPName {String} the pointcut name.
   * @param fctAdvice {Function} the advice function.
   * @param bRemove {boolean} if <code>true</code>, remove this advice.
   */
  AOP.before = function(strPName, fctAdvice, bRemove) {
    AOP[bRemove ? "_remove" : "_add"](strPName, fctAdvice, "_before");
  };
  
  /**
   * @param strPName {String} the pointcut name.
   * @param fctAdvice {Function} the advice function.
   * @param bRemove {boolean} if <code>true</code>, remove this advice.
   */
  AOP.after = function(strPName, fctAdvice, bRemove) {
    AOP[bRemove ? "_remove" : "_add"](strPName, fctAdvice, "_after");
  };
  
  /**
   * @param strPName {String} the pointcut name.
   * @param fctAdvice {Function} the advice function.
   * @param bRemove {boolean} if <code>true</code>, remove this advice.
   */
  AOP.around = function(strPName, fctAdvice, bRemove) {
    AOP[bRemove ? "_remove" : "_add"](strPName, fctAdvice, "_around");
  };
  
  /** @private @jsxobf-clobber */
  AOP._add = function(strPName, fctAdvice, strType) {
    AOP._nameToPC[strPName][strType].push(fctAdvice);
  };
  
  /** @private @jsxobf-clobber */
  AOP._remove = function(strPName, fctAdvice, strType) {
    var list = AOP._nameToPC[strPName][strType];
    for (var i = list.length - 1; i >= 0; i--)
      if (list[j] === fctAdvice)
        list.splice(i, 1);
  };
  
  /** @private @jsxobf-clobber */
  AOP._newCutPoint = function(strKey) {
    var f = function() {
      return AOP._cutPoint(strKey, this, arguments);
    };
    f._aoppc = 1;
    f._aopkey = strKey;
    return f;
  };
  
  /** @private @jsxobf-clobber */
  AOP._cutPoint = function(strKey, objThis, arrArgs) {
    var cp = AOP._filterCP(objThis, AOP._methodToPC[strKey]._pc);
    var around = AOP._getAllOf(cp, "_around");
    
    if (around.length > 0) {
      return (new AOP._AroundStack(strKey, around, objThis, arrArgs))._start();
    } else {
      return AOP._cutPointNoAround(strKey, objThis, arrArgs, cp);
    }
  };
  
  /** @private @jsxobf-clobber */
  AOP._cutPointNoAround = function(strKey, objThis, arrArgs, arrPC) {
    if (!arrPC)
      arrPC = AOP._filterCP(objThis, AOP._methodToPC[strKey]._pc);
    
    var before = AOP._getAllOf(arrPC, "_before");
    for (var i = 0; i < before.length; i++)
      before[i].apply(objThis, arrArgs);
    
    var returnVal = AOP._methodToPC[strKey]._method.apply(objThis, arrArgs);
    
    var after = AOP._getAllOf(arrPC, "_after");
    if (after.length > 0) {
      var args = jsx3.Method.argsAsArray(arrArgs);
      args.unshift(returnVal);
      for (var i = 0; i < after.length; i++)
        after[i].apply(objThis, args);
    }
    
    return returnVal;
  };
  
  /** @private @jsxobf-clobber */
  AOP._filterCP = function(objThis, arrPC) {
    var pc = [];
    for (var i = 0; i < arrPC.length; i++) {
      var obj = arrPC[i];
      var conditions = obj._cond;
      if (!conditions || !conditions.type || objThis.instanceOf(conditions.type))
        pc.push(obj);
    }
    return pc;
  };
  
  /** @private @jsxobf-clobber */
  AOP._getAllOf = function(a, f) {
    var rv = [];
    for (var i = 0; i < a.length; i++)
      rv.push.apply(rv, a[i][f]);
    return rv;
  };
  
  /** @private @jsxobf-clobber */
  AOP._getMethods = function(objConditions) {
    var m = [];
    var classes = AOP._getClasses(objConditions.classes);
    for (var i = 0; i < classes.length; i++)
      m.push.apply(m, AOP._getMethodsForClass(classes[i], objConditions.methods));
    return m;
  };
  
  /** @private @jsxobf-clobber */
  AOP._getClasses = function(strClasses) {
    if (!jsx3.$A.is(strClasses))
      strClasses = [strClasses];
    
    var a = [];
    for (var i = 0; i < strClasses.length; i++)
      a[i] = AOP._getClass(strClasses[i]);
    return a;
  };
  
  /** @private @jsxobf-clobber */
  AOP._getMethodsForClass = function(objClass, strMethods) {
    var m = [];
    var proto = objClass.getConstructor().prototype;
    
    if (!jsx3.$A.is(strMethods))
      strMethods = [strMethods];
    
    for (var i = 0; i < strMethods.length; i++) {
      var name = strMethods[i];
      if (name.match(/^\w+$/)) {
        var aFunct = proto[name];
        if (aFunct)
          m.push([objClass, name]);
      } else {
        var re = new RegExp("^" + name.replace("*", "\\w*") + "$");
        for (var f in proto)
          if (f.match(re))
            m.push([objClass, f]);
      }
    }
    
    return m;
  };
  
  /** @private @jsxobf-clobber */
  AOP._getClass = function(strClass) {
    if (typeof(strClass) == "string")
      return jsx3.Class.forName(strClass);
    else if (typeof(strClass) == "function")
      return strClass.jsxclass;
    else if (strClass instanceof jsx3.Class)
      return strClass;
    else
      throw new IllegalArgumentException("strClass", strClass);
  };
  
  /** @private @jsxobf-clobber */
  AOP._AroundStack = function(strKey, arrArounds, objThis, arrArgs) {
    /* @jsxobf-clobber */
    this._key = strKey;
    /* @jsxobf-clobber */
    this._arounds = arrArounds;
    /* @jsxobf-clobber */
    this._this = objThis;
    /* @jsxobf-clobber */
    this._args = arrArgs;
  };
  
  /** @private @jsxobf-clobber */
  AOP._AroundStack.prototype._start = function() {
    return this.proceed.apply(this, this._args);
  };
  
  AOP._AroundStack.prototype.proceed = function() {
    var around = this._arounds.shift();
    if (around) {
      var args = jsx3.Method.argsAsArray(arguments);
      args.unshift(this);
      return around.apply(this._this, args);
    } else {
      return AOP._cutPointNoAround(this._key, this._this, arguments);
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
 * The base GI exception class.
 *
 * <h4>Throwing an Exception</h4>
 * <pre>
 * // throwing a simple exception:
 * throw new jsx3.Exception("an error occurred");
 * 
 * // throwing a nested exception:
 * try {
 *   ...
 * } catch (e) {
 *   throw new jsx3.Exception("an error occurred while ...", 
 *       jsx3.NativeError.wrap(e));
 * }</pre>
 *
 * <h4>Catching an Exception</h4>
 * <pre>
 * // catching an exception and logging it
 * try {
 *   ...
 * } catch (e) {
 *   jsx3.util.Logger.GLOBAL.error("an error occurred while ...", 
 *       jsx3.NativeError.wrap(e));
 * }</pre>
 *
 * @since 3.1
 */
jsx3.Class.defineClass("jsx3.lang.Exception", null, null, function(Exception, Exception_prototype) {
  
  var Method = jsx3.lang.Method;

  /** @private @jsxobf-clobber */
  Exception._ALERT_BEFORE_ONERROR = false;
  
  /**
   * @package
   */
  Exception._LAST_THROWN = null;
  
  /**
   * The instance initializer. A subclass of this class should always chain its <code>init()</code> method.
   *
   * @param strMessage {String}  the description of the exception.
   * @param objCause {jsx3.Exception}  an optional argument. A caught exception that caused this exception to be raised.
   */
  Exception_prototype.init = function(strMessage, objCause) {
    // always store the last exception created, this will help with IE uncaught exceptions
    Exception._LAST_THROWN = this;
    
    /* @jsxobf-clobber */
    this._message = strMessage;
    /* @jsxobf-clobber */
    this._cause = objCause;
    /* @jsxobf-clobber-shared */
    this._stack = [];
    this._storeStackTrace();
    
    if (Exception._ALERT_BEFORE_ONERROR && window.onerror == null)
      window.alert(strMessage + this.printStackTrace());
    
    var Logger = jsx3.util.Logger;
    if (Logger) {
      var l = Logger.getLogger(Exception.jsxclass.getName());
      if (l.isLoggable(Logger.TRACE))
        l.trace(strMessage, this);
    }
  };

  /**
   * Returns a string representation of this exception.
   * @return {String}
   */
  Exception_prototype.toString = function() {
    return this._message;
  };
  
  /**
   * Returns the description of this exception, as specified when the constructor was called.
   * @return {String}
   */
  Exception_prototype.getMessage = function() {
    return this._message;
  };
  
  /**
   * Returns the cause of this exception, if one was specified in the constructor.
   * @return {jsx3.Exception}
   */
  Exception_prototype.getCause = function() {
    return this._cause;
  };
  
  /**
   * Returns the complete call stack from when this exception was instantiated as an array of functions.
   * @return {Array<Function>}
   */
  Exception_prototype.getStack = function() {
    return this._stack;
  };
  
  /**
   * A list of methods that do not get printed by <code>printStackTrace()</code>.
   * @private
   * @jsxobf-clobber
   */
  Exception._NOSTACK_METHODS = [
      jsx3.Object.jsxclass.getInstanceMethod('jsxsuper'),
      jsx3.Object.jsxclass.getInstanceMethod('jsxsupermix'),
      jsx3.Object.jsxclass.getInstanceMethod('__noSuchMethod__') // may be null (in IE)
  ];

  /**
   * @param stack {Array<Function>}
   * @return {String}
   * @package
   */
  Exception.formatStack = function(stack) {
    var s = "";
    if (!jsx3.util || !jsx3.util.jsxpackage) return s;
    
    for (var i = 0; i < stack.length; i++) {
      var funct = stack[i];
      if (funct == null) continue; // BUG: this was cropping up in Firefox, not sure why
      
      if (funct.jsxmethod instanceof Method) {
        var next = stack[i+1];
        
        if (next != null && jsx3.util.arrIndexOf(Exception._NOSTACK_METHODS, next.jsxmethod) >= 0)
          if (funct == Method.prototype.apply) continue;
//        if (funct.jsxmethod == Method.getInstanceMethod("apply")) continue; // BUG: not sure why this wasn't working
        
        if (jsx3.util.arrIndexOf(Exception._NOSTACK_METHODS, funct.jsxmethod) >= 0) continue;

        if (s.length > 0) s += "\n";
        
        s += "    at ";
        s += funct.jsxmethod.getDeclaringClass().getName();
        s += funct.jsxmethod.isStatic() ? "#" : ".";
        s += funct.jsxmethod.getName() + "()";
      } else {
        if (s.length > 0) s += "\n";
        s += "    at ";
        
        if (funct.jsxclass instanceof jsx3.lang.Class) {
          s += funct.jsxclass.getName() + "()";
        } else {
          var source = funct.toString();
          if (source.match(new RegExp("^function(\\s+\\w+)?\\s*\\(([^\\)]*)\\)\\s*{"))) {
            var name = RegExp.$1 || "anonymous";
            var params = RegExp.$2;
            var fctbody = RegExp.rightContext;
            fctbody = jsx3.util.strTruncate(jsx3.util.strTrim(fctbody).replace(/\s+/g, " "), 70);
            s += jsx3.util.strTrim(name) + "(" + jsx3.util.strTrim(params).split(/\s*,\s*/).join(", ") + ")" + (fctbody ? " { " + fctbody : "");
          } else {
            s += "anonymous()";
          }
        }
      }
    }
    
    return s;
  };
  
  /**
   * Returns a string representation of the call stack for when this exception was instantiated. This stack trace
   * is delimited by new line characters (\n) but is not terminated with one.
   * @return {String}
   */
  Exception_prototype.printStackTrace = function() {
    var s = this.getClass().getName() + ": " + this + "\n" + Exception.formatStack(this._stack);

    if (this._cause != null)
      s += "\nCaused By:\n" + this._cause.printStackTrace();
    
    return s;
  };
  
  /** @private @jsxobf-clobber */
  Exception_prototype._storeStackTrace = function() {
    var stack = jsx3.lang.getStack(1);
    // trim off everything until (and including the last constructor method)
    var index = -1;
    for (var i = 0; i < stack.length; i++) {
      if (stack[i].jsxclass != null) {
        index = i;
        break;
      }
    }
    if (index >= 0)
      stack.splice(0, index + 1);
    
    this._stack = stack;
  };
  
});

/**
 * A special exception type to throw when the caller of a function does not pass arguments according to the method's
 * contract.
 */
jsx3.Class.defineClass("jsx3.lang.IllegalArgumentException", jsx3.lang.Exception, null, function(IllegalArgumentException, IllegalArgumentException_prototype) {
  
  /**
   * The instance initializer.
   * @param strArg {String}  the name of the argument 
   * @param objValue {Object}  the (illegal) value passed to the method
   */
  IllegalArgumentException_prototype.init = function(strArg, objValue) {
    this.jsxsuper(jsx3._msg("exc.ill_arg", strArg, objValue));
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

// @jsxobf-clobber-shared  _stack

/**
 * Wraps the browser-native exception object (what might be caught in a typical try/catch/finally block).
 * <p/>
 * The following sample code shows how to use try/catch blocks in JavaScript and ensure that a caught 
 * exception is always an instance of <code>jsx3.lang.Exception</code>:
 * <pre>
 * try {
 *   tryIt(); // code that may throw a native error (null-pointer, etc)
 *            // or an instance of jsx3.Exception
 * } catch (e) {
 *   e = jsx3.NativeError.wrap(e);
 *   // now e is guaranteed to be an instance of jsx3.Exception
 *   window.alert(e.printStackTrace());
 * }
 * </pre>
 *
 * @since 3.1
 */
jsx3.Class.defineClass("jsx3.lang.NativeError", jsx3.lang.Exception, null, function(NativeError, NativeError_prototype) {

  var Exception = jsx3.Exception;

  /** @private @jsxobf-clobber */
  NativeError.ALWAYS_ALERT_UNCAUGHT = false;
  /** @private @jsxobf-clobber */
  NativeError.ALERT_UNCAUGHT = true;
  
  /**
   * Wraps a native browser exception in an instance of <code>NativeError</code>. This method also accepts 
   * an argument of type <code>jsx3.Exception</code>, in which case it will just return the argument. This method wraps 
   * any other type of argument by converting it to a string and and creating a new <code>jsx3.Exception</code> with that message.
   *
   * @param objError {jsx3.Exception|Object} 
   * @return {jsx3.Exception}
   */
  NativeError.wrap = function(objError) {
    // this branch is IE-specific
    if (objError instanceof Error)
      return new NativeError(objError);
    else if (objError instanceof Exception)
      return objError;
    else 
      return new Exception("" + objError);
  };
  
  /**
   * Initializes the error trapping mechanism. Once this methor is called, all uncaught exceptions will be routed
   * through this class to the logging system.
   * @param-package fctTrap {Function}
   */
  NativeError.initErrorCapture = function(fctTrap) {
    window.onerror = arguments.length > 0 ? fctTrap : NativeError.errorTrap;
  };
  
  NativeError.stopErrorCapture = function(fctTrap) {
    window.onerror = null;
  };

  /** @private @jsxobf-clobber */
  NativeError._UNCAUGHT_MATCH = "uncaught exception:";
  
  /**
   * The error trap for Internet Explorer. Accepts the standard IE arguments and routes the error to the logging
   * system. If the error message indicates that the erro was caused by an uncaught exception, will try to find the
   * actual jsx3.Exception instance.
   *
   * @param msg {String}
   * @param url {String}
   * @param line {int}
   * @private
   * @jsxobf-clobber
   */
  NativeError.errorTrap = function(msg, url, line) {
    try {
      if (!NativeError.ALWAYS_ALERT_UNCAUGHT && 
          jsx3.Class.forName("jsx3.util.Logger") != null && jsx3.util.Logger.GLOBAL != null) {
        if (typeof(msg) == "string" && msg.indexOf(NativeError._UNCAUGHT_MATCH) >= 0) {
          if (Exception._LAST_THROWN != null) {
            var stack = jsx3.lang.getStack(0);
            if (stack.length < 2 || stack.contentsEqual(Exception._LAST_THROWN.getStack())) {
              if (stack.length < 2)
                jsx3.util.Logger.GLOBAL.logStack(jsx3.util.Logger.ERROR,
                    jsx3._msg("error.trap", msg, NativeError._convertLineNumber(line), url), 1);
              jsx3.util.Logger.GLOBAL.error(jsx3._msg("error.uncaught"), Exception._LAST_THROWN);
              Exception._LAST_THROWN = true;
              return true;
            }
          }
        }
        // IE interprets line numbers incorrectly (one off)
        jsx3.util.Logger.GLOBAL.logStack(jsx3.util.Logger.ERROR,
            jsx3._msg("error.trap", msg, NativeError._convertLineNumber(line), url), 1);
        return true;
      } else if (NativeError.ALERT_UNCAUGHT) {
        if (typeof(msg) == "string" && msg.indexOf(NativeError._UNCAUGHT_MATCH) >= 0) {
          if (Exception._LAST_THROWN != null) {
            var stack = jsx3.lang.getStack(0);
            if (stack.contentsEqual(Exception._LAST_THROWN.getStack())) {
              window.alert(jsx3._msg("error.uncaught") + "\n" + Exception._LAST_THROWN.printStackTrace());
              return true;
            }
          }
        }
        
        var stack = jsx3.lang.getStack(0);
        window.alert(jsx3._msg("error.trap", msg, NativeError._convertLineNumber(line), url) +
            "\n" + Exception.formatStack(stack));
        return true;
      } else {
        return false;
      }
    } catch (e) {
      window.alert(jsx3._msg("error.trap_err", NativeError.wrap(e), msg, NativeError._convertLineNumber(line), url));
    }
  };
  
  /** @private @jsxobf-clobber */
  NativeError_prototype._error = null;
    
  /**
   * The instance initializer.
   * @param objError {Object} browser-native exception object (what would be thrown by a try/catch block)
   * @throws {jsx3.IllegalArgumentException} if <code>objException</code> is not a native browser error. Use 
   *    <code>NativeError.wrap()</code> if the type of caught object is unknown.
   * @see #wrap()
   */
  NativeError_prototype.init = function(objError) {
    if (!(objError instanceof Error))
      throw new jsx3.IllegalArgumentException("objError", objError);
    
    this._error = objError;
    this.jsxsuper();
  };

  /**
   * Returns the native message for this error.
   * @return {String}
   */
  NativeError_prototype.getMessage = function() {
    return (this._error.message || this._error.toString()).replace(/\s*$/,"");
  };

  /**
   * Returns the URL of the JavaScript include where this error was raised.
   * @return {String}
   */
  NativeError_prototype.getFileName = function() {
    return this._error.fileName;
  };

  /**
   * Returns the line number in the JavaScript include where this error was raised.
   * @return {int}
   */
  NativeError_prototype.getLineNumber = function() {
    return NativeError._convertLineNumber(this._error.lineNumber);
  };

  /** @private @jsxobf-clobber */
  NativeError._convertLineNumber = function(line) {
    if (jsx3.util.numIsNaN(line)) return null;
    return line;
  };

  /**
   * Returns the native browser name for this error.
   * @return {String}
   */
  NativeError_prototype.getName = function() {
    return this._error.name;
  };


  /**
   * Returns true if this error was due to poorly-formatted JavaScript (lexical/structural as opposed to logical).
   * @return {boolean}
   * @deprecated
   */
  NativeError_prototype.isStructural = function() {
    return false;
  };

  
  NativeError_prototype.getType = function() {
    if (this._error instanceof EvalError) return "EvalError";
    if (this._error instanceof RangeError) return "RangeError";
    if (this._error instanceof ReferenceError) return "ReferenceError";
    if (this._error instanceof SyntaxError) return "SyntaxError";
    if (this._error instanceof TypeError) return "TypeError";
    return "Error";
  };

  NativeError_prototype.printStackTrace = function() {
    var s = this.getClass().getName() + ": " + this + "\n" + Exception.formatStack(this._stack);

    if (this._error.stack) {
      var lines = String(this._error.stack).split(/\n/g);
      s += "\nCaused By:\n";
      for (var i = 0; i < lines.length; i++) {
        if (/^([^\(]*)\((.*)\)@(.*):(\d+)$/.exec(lines[i])) {
          s += "    at " + (RegExp.$1 ? RegExp.$1 : "anonymous") + "(), line:" + RegExp.$4 + ", file:" + RegExp.$3 + "\n"; 
        } else {
          s += lines[i] + "\n";
        }
      }
    }

    if (this._cause != null)
      s += "\nCaused By:\n" + this._cause.printStackTrace();

    return s;
  };

  /**
   * Returns the native error as a human-readable string.
   * @return {String}
   */
  NativeError_prototype.toString = function() {
    var line = this.getLineNumber();
    var file = this.getFileName();
    var s = this.getMessage();
    if (line || file) {
      s += " (type:" + this.getType() + ", ";
      if (line) s += "line:" + line;
      if (file) {
        if (line) s += ", ";
        s += "file:" + file;
      }
      s += ")";
    }
    return s;
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

// @jsxobf-clobber-shared  _name _class _static _packageDidLoad

jsx3.lang.Package = jsx3.lang.newPrivateConstructor();

/**
 * The Package class provides an introspectable API for JavaScript/JSX packages. It also provides a way of defining 
 * new packages.
 * <p/>
 * An instance of this class may be obtained in one of the following ways (<b>this class may not be instantiated 
 * directly</b>):
 * <ul>
 * <li>jsx3.lang.jsxpackage</li>
 * <li>jsx3.Package.forName('jsx3.lang')</li>
 * </ul>
 * In this example, the JavaScript object <code>jsx3.lang</code> is known as the package "namespace," which is a plain
 * JavaScript object and is analogous to the constructor property of a jsx3.Class.
 * <p/>
 * The following is an example of how to define a new package called eg.tests:
 * <pre>
 * jsx3.lang.Package.definePackage(
 *   "eg.tests",                           // the full name of the package to create
 *   function(tests) {                  // name the argument of this function "eg"
 *     
 *     // define a static method like this:
 *     tests.staticMethod = function() {
 *       ...
 *     };
 *
 *     // define a static field like this:
 *     tests.STATIC_FIELD = "...";
 *   }
 * );
 * </pre>
 *
 * @since 3.1
 */
jsx3.lang.Class.defineClass("jsx3.lang.Package", null, null, function(Package, Package_prototype) {
  
  // imports
  var Class = jsx3.lang.Class;
  var Method = jsx3.lang.Method;
  
  /** @private @jsxobf-clobber */
  Package._PACKAGES = [];
  
  /**
   * Defines a new package so that it is available for introspection.
   * <p/>
   * It is not an error if the namespace object already exists prior to calling this method. Any members defined
   * by <code>fctBody</code> are simply added to the pre-existing namespace. Then, all members, whether defined
   * before the call to this method or with the call to this method, are made introspectable.
   * <p/>
   * This method may be called more than once with the same <code>strName</code> without causing an error. The
   * package is simply redefined. Only the members that are defined in the namespace object after the last call to
   * this method will be available for introspection.
   * <p/>
   * It is an error if, after <code>fctBody</code> is executed, any two members of the namespace object equal the
   * same function object. This is know as method aliasing, which can be a useful technique in JavaScript. Any
   * method aliasing within the namespace object must occur after the call to this method. Therefore, method aliasing
   * will cause an error if this package is redefined later.
   * 
   * @param strName {String} the full package name
   * @param fctBody {Function} the function that defines the body of the package. This function takes one argument 
   *    which is the package "namespace".
   */
  Package.definePackage = function(strName, fctBody) {
    var objOwner = Class._getOrCreatePackage(strName.split("."));

    var bRedefinition = false;
    var objPackage = null;
    if (objOwner.jsxpackage != null) {
      if (jsx3.Class.forName("jsx3.util.Logger"))
        jsx3.util.Logger.getLogger("jsx3.lang").info(jsx3._msg("pkg.redefine", strName));

      objPackage = objOwner.jsxpackage;
      bRedefinition = true;
      objPackage._staticFields = [];
      objPackage._staticMethods = [];
    } else {
      objPackage = Class._newInstanceForce(Package);
      objPackage._pname = strName;
      /* has been observed to cause memory leaks in IE
      objPackage._owner = objOwner; // create 2-way reference, if removed will still work */
      objPackage._staticFields = [];
      objPackage._staticMethods = [];
      objOwner.jsxpackage = objPackage;    
    }
    
    try {
      fctBody(objOwner);
    } catch (e) {
      var ex = jsx3.NativeError.wrap(e);
      throw new jsx3.Exception(jsx3._msg("pkg.def_error", strName, ex), ex);
    }
    
    // define static methods
    for (var f in objOwner) {
      if (f == "jsxpackage") continue;
      if (typeof(objOwner[f]) == "function") {
        // don't define classes as static methods
        if (objOwner[f].jsxclass == null)
          this._blessMethod(objOwner[f], objPackage, f);
      } else {
        // don't define packages as static fields
        if (objOwner[f] == null || typeof(objOwner[f]) != "object" || objOwner[f].jsxpackage == null)
          objPackage._staticFields.push(f);
      }
    }
    
    // define no such method catch-all for Mozilla
    if (objOwner.__noSuchMethod__ == null)
      objOwner.__noSuchMethod__ = function(strMethod, args) {
        throw new jsx3.Exception(jsx3._msg("class.nsm", strName + "#" + strMethod + "()"));
      };
    
    Package._PACKAGES.push(objPackage);
    
    jsx3.CLASS_LOADER._packageDidLoad(objPackage);
  };
  
  /** @private @jsxobf-clobber */
  Package._blessMethod = function(fctMethod, objPackage, strName) {
    if (fctMethod.jsxmethod instanceof Method) {
      // renaming a method in this package is an error
      if (fctMethod.jsxmethod.getDeclaringClass().equals(objPackage) && fctMethod.jsxmethod.getName() != strName) {
        throw new jsx3.Exception(jsx3._msg("class.redef_method", fctMethod.jsxmethod, objPackage + "." + strName));
      } else {
        if (fctMethod.jsxmethod.getDeclaringClass().equals(objPackage) && 
            jsx3.util.arrIndexOf(objPackage._staticMethods, fctMethod.jsxmethod) < 0)
          objPackage._staticMethods.push(fctMethod.jsxmethod);
        return;
      }
    }
    
    var objMethod = Class._newInstanceForce(Method);
    /* has been observed to cause memory leaks in IE
    objMethod._function = fctMethod; // create 2-way reference, if removed will still work */
    objMethod._class = objPackage;
    objMethod._name = strName;
    objMethod._static = true;

    fctMethod.jsxmethod = objMethod;
  
    objPackage._staticMethods.push(objMethod);
  };
  
  /**
   * Returns the defined package with name equal to <code>strName</code>.
   * @param strName {String} the full name of the package to retrieve
   * @return {jsx3.lang.Package} the package or <code>null</code> if none matches
   */
  Package.forName = function(strName) {
    var c = jsx3.lang.getVar(strName);
    return c ? c.jsxpackage : null;
  };
  
  /**
   * Returns a list of all defined packages.
   * @return {Array<jsx3.Package>}
   */
  Package.getPackages = function() {
    return Package._PACKAGES.concat();
  };
  
  /** @private @jsxobf-clobber */
  Package_prototype._pname = null;
  /** @private @jsxobf-clobber */
  Package_prototype._owner = null;
  /** @private @jsxobf-clobber */
  Package_prototype._staticMethods = null;
  /** @private @jsxobf-clobber */
  Package_prototype._staticFields = null;
  
  /**
   * Returns the fully-qualified name of this class.
   * @return {String}
   */
  Package_prototype.getName = function() {
    return this._pname;
  };
  
  /**
   * Returns the namespace of this package. The namespace is the JavaScript object, descending from
   *    window, that references this package by its property <code>jsxpackage</code>.
   * @return {Object}
   */
  Package_prototype.getNamespace = function() {
    if (this._owner != null) return this._owner;
    var c = jsx3.lang.getVar(this._pname);
    return c || null;
  };
  
  /**
   * Returns an array of all the classes defined in this package.
   * @return {Array<jsx3.Class>}
   */
  Package_prototype.getClasses = function() {
    var classes = [];
    var owner = this.getNamespace();
    for (var f in owner) {
      if (typeof(owner[f]) == "function" && owner[f].jsxclass instanceof Class) {
        if (owner[f].jsxclass.getPackage() == this && 
            (this.getName() + "." + f) == owner[f].jsxclass.getName()) {
          classes[classes.length] = owner[f].jsxclass;
          classes.push.apply(classes, owner[f].jsxclass.getClasses());
        }
      }
    }
    return classes;
  };
  
  /**
   * Returns the array of static methods defined for this package.
   * @return {Array<jsx3.Method>} an array of jsx3.Method instances
   */
  Package_prototype.getStaticMethods = function() {
    return this._staticMethods.concat();
  };
  
  /**
   * Returns the static method defined in this package with name <code>strMethodName</code>.
   * @param strMethodName {String} the name of the method to find
   * @return {jsx3.Method} the method or null if none found matching <code>strMethodName</code>
   */
  Package_prototype.getStaticMethod = function(strMethodName) {
    for (var i = 0; i < this._staticMethods.length; i++) {
      if (strMethodName == this._staticMethods[i].getName())
        return this._staticMethods[i];
    }
    return null;
  };
  
  /**
   * Returns the array of static fields defined for this package.
   * @return {Array<String>} an array of String names
   */
  Package_prototype.getStaticFieldNames = function() {
    return this._staticFields.concat();
  };
  
  /**
   * @return {String}
   */
  Package_prototype.toString = function() {
    return this._pname;
  };
  
});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber  _jsxshaking
/**
 * Global GI static methods and constants.
 */
jsx3.Package.definePackage("jsx3", function() {

  /**
   * {String} location for addin resources.
   */
  jsx3.ADDINSPATH = "JSX/addins/";
  

  /**
   * {String} Default ActiveX XML object key.
   * @deprecated
   */
  jsx3.XMLREGKEY = "Msxml2.FreeThreadedDOMDocument.3.0";

  /**
   * {String} Default ActiveX XSL object key.
   * @deprecated
   */
  jsx3.XSLREGKEY = "Msxml2.XSLTemplate.3.0";

  /**
   * {String} Default ActiveX HTTP object key.
   * @deprecated
   */
  jsx3.HTTPREGKEY = "Msxml2.XMLHTTP.3.0";


  
  jsx3.getXmlVersion = function() {
    return 6;
  };
  


  /**
   * @deprecated  The new <code>jsx3.lang.Class</code> framework does not use this constant for instantiating objects.
   */
  jsx3.DESERIALIZE = "JSX30DESERIALIZE";

  /**
   * @deprecated  The new <code>jsx3.lang.Class</code> framework does not use this constant for instantiating objects.
   */
  jsx3.INITIALIZE = "JSX30INITIALIZE";


  // See: http://bugs.webkit.org/show_bug.cgi?id=15631
  jsx3.LOG10E = Math.LOG10E;
  
  /**
   * {jsx3.gui.Event}
   * @package
   */
  jsx3.STARTUP_EVENT = null;
  
  /**
   * {jsx3.app.Cache} The <code>jsx3.app.Cache</code> instance used by the JSX system to store XML and XSL documents.
   * @deprecated  Use <code>getSharedCache()</code> instead.
   * @see #getSharedCache()
   */
  jsx3.CACHE = null;
  

  /**
   * {jsx3.EVT} wrapped static access to the current JavaScript event
   * @deprecated Static access to the event object is deprecated as it is not cross-platform. Access to the current
   *   event object, where available, is granted via a method parameter or model event context variable.
   * @see jsx3.gui.Event
   */
  jsx3.EVENT = null;


  /**
   * Returns the global JSX XML/XSL cache. This cache is shared by all applications in the JSX runtime. Every
   * server cache instance consults this cache when <code>getDocument()</code> is called on the server cache with
   * a cache id that does not correspond to a document in the server cache.
   * @return {jsx3.app.Cache}
   */
  jsx3.getSharedCache = function() {
    if (jsx3.CACHE == null) jsx3.CACHE = new jsx3.app.Cache();
    return jsx3.CACHE;
  };
  
  /**
   * @return {jsx3.app.Cache}
   * @package
   */
  jsx3.getSystemCache = function() {
    if (jsx3._SYSCACHE == null)
      /* @jsxobf-clobber */
      jsx3._SYSCACHE = new jsx3.app.Cache();
    return jsx3._SYSCACHE;
  };
  
  /**
   * Evaluates a JavaScript expression in a controlled local variable context. Every name-value pair in 
   * <code>objContext</code> will be exposed as a local variable to the evaluated script. All names must be valid
   * JavaScript names in order to be exposed as local variables. Any invalid names will be ignored.
   *
   * @param strScript {String} the JavaScript to evaluate.
   * @param objContext {Object<String, Object>} a map containing the local variable context. Each key is the name
   *    of a variable to expose and each value is the value of that variable. 
   * @return  the results of evaluating <code>strScript</code>.
   * 
   * @see jsx3.util#isName()
   */
  jsx3.eval = function(strScript, objContext) {
    // name of parameter will be obfuscated so ...
    if (strScript != null && strScript !== "") {
      var vars = "";
      if (objContext) {
        /* @jsxobf-bless */
        var _ec = objContext;
        var a = [];

        for (var f in _ec)
          if (jsx3.util.isName(f))
            a[a.length] = "var " + f + " = _ec." + f + ";";

        vars = a.join("");
      }
      return eval(vars + strScript);
    }
  };
  
  /**
   * Returns a URI resolved against the default URI resolver, <code>URIResolver.DEFAULT</code>.
   * @param strURI {String|jsx3.net.URI} the URI to resolve.
   * @return {String}
   * @see jsx3.net.URIResolver#DEFAULT
   */
  jsx3.resolveURI = function(strURI) {
    return jsx3.net.URIResolver.DEFAULT.resolveURI(strURI).toString();
  };
  
  jsx3.makeCallback = function(fctBody, objThis, varArgs) {
    var argsAsArray = jsx3.Method.argsAsArray;
    var args = argsAsArray(arguments, 2);

    if (typeof(fctBody) == "string")
      fctBody = objThis[fctBody];
      
    return function() {
      var myArgs = arguments;
      // make arguments to this function available
      var a = myArgs.length > 0 ? args.concat(argsAsArray(myArgs)) : args;
      return fctBody.apply(objThis, a);
    };
  };

  jsx3.clone = function(obj) {
    if (typeof(obj) != "object") return obj;
    
    var c = {};
    for (var f in obj)
      c[f] = obj[f];
    return c;
  };

  /** @private @jsxobf-clobber */
  jsx3._REQUIRE_MAP = {};
  jsx3._REQUIRE_MAP["jsx3.gui.MatrixColumn"] = "jsx3.gui.Matrix.Column"; // DEPRECATED: only way to make bridge work with lazy loading

  /**
   * Ensures that one or more classes is available before this method returns. Any class that fails to load will
   * throw an error. Only classes that can be found by the system class loader may be loaded in this manner.
   *
   * @param strClass {String...} the fully-qualified names of the classes to load.
   * @since 3.2
   */
  jsx3.require = function(strClass) {
    for (var i = 0; i < arguments.length; i++) {
      var className = arguments[i];
      className = jsx3._REQUIRE_MAP[className] || className;
      if (jsx3.Class.forName(className) == null)
        jsx3.CLASS_LOADER.loadClass(className);
    }
  };

  /**
   * Loads a class or classes asynchronously. If multiple classes are specified they are loaded serially rather
   * than in parallel. This method does not resolve dependencies, i.e. if the class to load contains a call to
   * <code>jsx3.require</code> that class will be loaded synchronously.
   * <p/>
   * Note that if <code>strClass</code> does not correspond to an file on the classpath or if the
   * corresponding file does not actualy define a class whose name is <code>strClass</code>, this async function
   * will never complete and no callbacks will be executed.
   *
   * @param strClass {String...} the fully-qualified names of the classes to load.
   * @throws {jsx3.Exception} if the package of <code>strClass</code> is not registered as a system, add-in or application classpath.
   * @since 3.9
   */
  jsx3.requireAsync = jsx3.$Y(function(cb) {
    var a = cb.args();
    var className = a[0];

    jsx3.CLASS_LOADER.loadClassAsync(className, function() {
      if (a.length >= 2) {
        jsx3.requireAsync.apply(jsx3, jsx3.Method.argsAsArray(a, 1)).when(
            function() { cb.done(); }
        );
      } else {
        cb.done();
      }
    });
  });

  jsx3.requireAsyncNew = function(objClasses,cb){
    jsx3.CLASS_LOADER.loadClassGroupAsync(objClasses,cb);
  }

  /** @private @jsxobf-clobber */
  jsx3._SLEEP_QUEUE = [];
  /** @private @jsxobf-clobber */
  jsx3._SLEEP_MAP = [];
  /** @private @jsxobf-clobber */
  jsx3._SLEEP_TO = null;

  /**
   * A replacement for peppering code with <code>window.setTimeout(fnct, 0)</code> statements. This method places
   * all jobs in a queue. Each job gets its own stack.
   * @param objFunction {Function} an anonymous function to call after a timeout.
   * @param strId {String} the id of this job. If this parameter is not <code>null</code> and a job already
   *    exists in the queue with this id, then this job is not added to the queue.
   * @param objThis {Object} if provided, this object is the "this" context for the anonymous function
        <code>objFunction</code> when it is called.
   * @param bClobber {boolean} if <code>true</code> and a job already exists, this new job clobbers the old job.
   * @since 3.2
   */
  jsx3.sleep = function(objFunction, strId, objThis, bClobber) {
    if (strId && jsx3._SLEEP_MAP[strId]) {
      if (bClobber)
        jsx3._SLEEP_MAP[strId][0] = null;
      else
        return;
    }

    var record = [objFunction, strId, objThis];
    var queue = jsx3._SLEEP_QUEUE;

    queue[queue.length] = record;
    if (strId != null)
      jsx3._SLEEP_MAP[strId] = record;

    if (!jsx3._SLEEP_TO)
      jsx3._SLEEP_TO = window.setTimeout(jsx3._sleepChunk, 0);
  };

  jsx3.QUEUE_DONE = "queueDone";

  /** @private @jsxobf-clobber */
  jsx3._sleepChunk = function() {



    try {
      // Sync XHR may cause timeouts to fire in Firefox 3.0, fixed in 3.1
      // https://bugzilla.mozilla.org/show_bug.cgi?id=340345
      if (jsx3.lang.getVar("jsx3.net.Request.INSYNC"))
        return;

      var q = jsx3._SLEEP_QUEUE;
      jsx3._SLEEP_QUEUE = [];

      for (var i = 0; i < q.length; i++) {
        var item = q[i];
        if (item && item[0]) { // necessary because of clobber option in sleep()
          try {
            if (item[1] != null)
              delete jsx3._SLEEP_MAP[item[1]];
            item[0].apply(item[2]);
          } catch (e) {
            var l = jsx3.util.Logger;
            if (l) {
              var ex = jsx3.NativeError.wrap(e);
              l.GLOBAL.error(ex, ex);
            }
          }
        }
      }
    } finally {
      if (jsx3._SLEEP_QUEUE.length > 0) // more items could have been put in the queue while processing the last queue
        jsx3._SLEEP_TO = window.setTimeout(jsx3._sleepChunk, 0);
      else {
        jsx3._SLEEP_TO = null;
        jsx3.publish({subject:jsx3.QUEUE_DONE});
      }
    }


  };

  /**
   * @package
   */
  jsx3.startup = function() {
    if (window.OpenAjax) {
      try {
        OpenAjax.hub.registerLibrary("gi", "http://www.tibco.com/gi", jsx3.getVersion());
      } catch (e) {
        var l = jsx3.util.Logger;
        if (l) l.GLOBAL.error(jsx3._msg("boot.oah"), jsx3.NativeError.wrap(e));
      }
    }
  };

  /**
   * Called when the page hosting the JSX application is about to unload.
   * @package
   */
  jsx3.destroy = function() {
    if (jsx3.app && jsx3.app.Server) {
      var servers = jsx3.app.Server.allServers();
      for (var i = 0; i < servers.length; i++) {
        try {
          servers[i].destroy();
        } catch (e) {
          ;
        }
      }
    }

    if (jsx3.gui && jsx3.gui.Event) {
      var eTypes = ("BEFOREUNLOAD BLUR CHANGE CLICK DOUBLECLICK ERROR FOCUS KEYDOWN KEYPRESS KEYUP LOAD MOUSEDOWN " +
                    "MOUSEMOVE MOUSEOUT MOUSEOVER MOUSEUP MOUSEWHEEL UNLOAD RESIZE").split(/\s+/);
      for (var i = 0; i < eTypes.length; i++)
        jsx3.gui.Event.unsubscribeAll(jsx3.gui.Event[eTypes[i]]);
    }

    jsx3.NativeError.stopErrorCapture();

    var allScripts = document.getElementsByTagName("script");
    for (var i = 0; i < allScripts.length; i++) {
      var oneScript = allScripts.item(i);
      oneScript.parentNode.removeChild(oneScript);
    }
    

    jsx3.CLASS_LOADER.destroy();

    window.jsx3 = null;
  };
  

  // DEPRECATED: remove in next version

  /**
   * Returns item as class if a type of function, not object (used by inheritance when transferring prototype methods)
   * @param strClassName {String} name of class
   * @return {Object}
   * @deprecated use <code>jsx3.lang.Class</code>
   * @private
   */
  jsx3.getClass = function(strClassName) {
    try {
      var c = eval(strClassName);
      return typeof(c) == "function" ? c : null;
    } catch (e) {
      return null;
    }
  };

  /**
   * Returns prototype object (a collection) belonging to class named, @strClassName
   * @param strClassName {String} name of class
   * @return {Object}
   * @deprecated use <code>jsx3.lang.Class</code>
   * @private
   */
  jsx3.getClassPrototype = function(strClassName) {
    try {
      var p = eval(strClassName + ".prototype");
      return (typeof(p) == "object" && typeof(p.constructor) == "function") ? p : null;
    } catch (e) {
      return null;
    }
  };

  /**
   * Returns a JavaScript array of all named constants for this class; these names (strings) can then be used by the developer to
   *            lookup/evaluate/modify applicable constants; To derive the value for the first named constant for the
   *            jsx3.gui.Block class, a method such as the following would work: var myFirstConstantValue = eval(jsx3.getClassConstants("jsx3.gui.Block")[0]);
   *            NOTE: passing an invalid class name results in a null value being returned.  If no constants exist for the given class, an empty array will be returned
   * @param strClassName {String} name of the class to get the constants for. For example: jsx3.gui.Block, jsx3.gui.Select, etc.
   * @return {Object} JavaScript array
   * @deprecated use <code>jsx3.lang.Class</code>
   * @see jsx3.lang.Class
   */
  jsx3.getClassConstants = function(strClassName) {
    var o = jsx3.getClass(strClassName);
    if (o != null) {
      var a = [];
      for (var p in o) {
        if (p.toUpperCase() == p) a[a.length] = strClassName + "." + p;
      }
      return a;
    }
  };

  /**
   * Returns a new-line-delimited (e.g., \n) list of all instance methods for the particular class
   * @param strClassName {String} name of the class to get the constants for. For example: jsx3.gui.Block, jsx3.gui.Select, etc.
   * @return {String}
   * @deprecated use <code>jsx3.lang.Class</code>
   * @see jsx3.lang.Class
   */
  jsx3.getInstanceMethods = function(strClassName) {
    var o = jsx3.getClassPrototype(strClassName);
    var a = [];
    for (var p in o) {
      if (typeof(o[p]) == "function") {
        var t = o[p].toString();
        a[a.length] = t.substring(9,t.indexOf(')')+1);
      }
    }
    return a;
  };

  /**
   * Returns a new-line-delimited (e.g., \n) list of all instance methods for the particular class
   * @param strClassName {String} name of the class to get the constants for. For example: jsx3.gui.Block, jsx3.gui.Select, etc.
   * @return {String}
   * @deprecated use <code>jsx3.lang.Class</code>
   * @see jsx3.lang.Class
   */
  jsx3.getClassMethods = function(strClassName) {
    var o = jsx3.getClass(strClassName);
    var s = "";
    for (var p in o) {
      if (typeof(o[p]) == "function") {
        var t = o[p].toString();
        s+= p + t.substring(8,t.indexOf(')')+1) + '\n';
      }
    }
    return s;
  };

  /**
   * transfers prototype methods from one class to another; establishes @superClass as the super for @subClass
   * @param subClass {String} named subclass to transfer prototypes to
   * @param superClass {String} named superclass to transfer prototypes from
   * @param bImplement {boolean} if true, @superClass is an interface
   * @return  the eval value of the script
   * @deprecated  create classes using <code>jsx3.Class</code>
   * @see jsx3.lang.Class
   */
  jsx3.doInherit = function(subClass, superClass,bImplement) {
    var objClass = jsx3.getClass(subClass);
    var objSuper = jsx3.getClass(superClass);

    if (objSuper == null) {
      jsx3.util.Logger.doLog("INHR01","Super class '" + superClass + "' of '" + subClass +
          "' not properly defined", 1, false);
      return;
    }

    if (objClass.isInherited == null || (bImplement != null && bImplement)) {
      if (!bImplement) {
        objClass.SUPER = superClass;
        objClass.SUPERS = {};
        for (var p in objSuper.SUPERS) {
          objClass.SUPERS[p] = objSuper.SUPERS[p];
          objClass.SUPERS[subClass] = 1;
        }
      }
      objClass.className = subClass;

      // keep track of the order in which to seach classes for overridden members
      if (objClass.INHERITANCE == null) objClass.INHERITANCE = [subClass];
      if (objSuper.INHERITANCE)
        for (var i = objSuper.INHERITANCE.length - 1; i >= 0; i--)
          objClass.INHERITANCE.splice(1, 0, objSuper.INHERITANCE[i]);
      else
        objClass.INHERITANCE.splice(1, 0, superClass);

      if (objClass.INTERFACES == null) objClass.INTERFACES = {};
      if (objSuper.INTERFACES) {
        for (var p in objSuper.INTERFACES) objClass.INTERFACES[p] = objSuper.INTERFACES[p];
      } else {
        objClass.INTERFACES[superClass] = "1";
      }
      objClass.INTERFACES[subClass] = "1";

      if (!(bImplement != null && bImplement)) objClass.isInherited = true;
      var objParentPrototype = jsx3.getClassPrototype(superClass);

      var objChildPrototype = jsx3.getClassPrototype(subClass);
      for (var p in objParentPrototype) {
        if (typeof(objChildPrototype[p]) != "function") {
          objChildPrototype[p] = objParentPrototype[p];
        }
      }
    }
  };

  /**
   * transfers prototype methods from one class to another
   * @param subClass {String} named subclass to transfer prototypes to
   * @param superClass {String} named superclass to transfer prototypes from
   * @return  the eval value of the script
   * @deprecated  create classes using <code>jsx3.Class</code>
   * @see jsx3.lang.Class
   */
  jsx3.doImplement = function(subClass, superClass) {
    jsx3.doInherit(subClass, superClass,true);
  };

  /**
   * transfer the methods of a class to a object instance
   * @param objInstance {object} any JavaScript object
   * @param strClassName {String} the name of a class
   * @deprecated  use <code>jsx3.Class.mixin()</code>
   * @see jsx3.lang.Class#mixin()
   */
  jsx3.doMixin = function(objInstance, strClassName) {
    var objClass = jsx3.getClassPrototype(strClassName);
    for (var f in objClass) {
      if (typeof(objClass[f]) == 'function') objInstance[f] = objClass[f];
    }
  };

  /**
   * Registers all prototype functions and properties, contained by the inner function @anonymousFunction; used by jsx3.Object
   * @param strClassName {String} named class containing the anonymous function to call
   * @param anonymousFunction {String} inner function containing named prototypes to bind
   * @deprecated  create classes using <code>jsx3.Class</code>
   * @see jsx3.lang.Class
   */
  jsx3.doDefine = function(strClassName, anonymousFunction) {
    var objClass = jsx3.getClass(strClassName);
    if (objClass.isDefined == null) {
      objClass.isDefined = true;
      anonymousFunction();
    }
  };

  /**
   * global call to get a handle to a specific JSX GUI Object; NOTE: This is a significant modification used to support
   *            multi-instance servers. It is equivalently the same as calling 'getJO' in all builds prior to 3.0; returns null
   *            if object cannot be found. The specific app (a jsx3.app.Server instance) can also be queried for objects using its own
   *            DOM APIs.
   * @param strIdName {String} JSX 'id' or 'name' property for the object to get a handle to
   * @param strNS {String/jsx3.app.Server} namespace for the server to get the object from; when a 'name' is passed as @strNameId
   *            (as opposed to the object's 'id'), this allows the global JSX controller to more-quickly find the
   *            server that owns the given object. As this parameter is optional, the JSX controller will try to locate
   *            the named object by iterating through all server instances running in the browser in load order if no
   *            namespace is passed. When an 'id' is passed, the namespaces is not required as it explicitly contains
   *            this namespace.
   * @return {jsx3.app.Model} handle to given JSX GUI object or null if none found
   *
   * @jsxdoc-definition  jsx3.GO = function(strIdName, strNS){}
   */

  /**
   * Alias for <code>jsx3.util.Logger.doLog()</code> (formerly <code>jsx3.Error.doLog()</code>).
   *
   * @param strErrorNumber {String} arbitrary identifier passed by the calling function to track the specific location of the error
   * @param strMessage {String} message to describe the error
   * @param PRIORITY {int} one of 1, 2 or 3, with 1 being most serious (red..orange..yellow)
   * @param bTrace {boolean} true if null; if true, the stack trace is printed, displaying the order of the call stack
   * @deprecated  use <code>jsx3.log()</code> or the <code>jsx3.util.Logger</code> interface
   * @see #log()
   * @see jsx3.util.Logger
   */
  jsx3.out = function(strErrorNumber, strMessage, PRIORITY, bTrace) {
    if (jsx3.Class.forName("jsx3.util.Logger"))
      jsx3.util.Logger.doLog(strErrorNumber, strMessage, PRIORITY, bTrace);
  };

  window.doInherit = jsx3.doInherit;
  window.doImplement = jsx3.doImplement;
  window.doMixin = jsx3.doMixin;
  window.doDefine = jsx3.doDefine;
  
  
  /**
   * Sends a message to the logging system. This method is an alias for <code>jsx3.util.Logger.GLOBAL.info()</code>.
   * <p/>
   * Since this method is defined before the logging system, any messages passed to this method before the logging 
   * system is defined are cached and sent with the first message passed after the logging system is defined.
   *
   * @param strMessage {String} the message to send to the logging system.
   * @see jsx3.util.Logger#GLOBAL
   */
  jsx3.log = function(strMessage) {
    if (jsx3.Class.forName("jsx3.util.Logger") && jsx3.util.Logger.GLOBAL) {
      // check for cached messages
      if (jsx3._logcache) {
        for (var i = 0; i < jsx3._logcache.length; i++)
          jsx3.util.Logger.GLOBAL.info(jsx3._logcache[i]);
        delete jsx3._logcache;
      }
      jsx3.util.Logger.GLOBAL.info(strMessage);
    } else {
      var cache = jsx3._logcache;
      if (!cache)
      /* @jsxobf-clobber */
        jsx3._logcache = cache = [];
      cache[cache.length] = strMessage;
    }
  };

  /**
   * Returns the version of General Interface.
   *
   * @jsxdoc-definition  jsx3.getVersion = function(){}
   */
});

/**
 * Application layer classes.
 */
jsx3.Package.definePackage("jsx3.app", function(){

});


/** 
 * Boolean class encapsulates GI's XML boolean values (0 and 1 rather than true and false).
 *
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.Boolean", -, null, function(){});
 */
jsx3.Boolean = {};

/**
 * {int} 1
 * @final @jsxobf-final
 */
jsx3.Boolean.TRUE = 1;

/**
 * {int} 0
 * @final @jsxobf-final
 */
jsx3.Boolean.FALSE = 0;

/**
 * Returns <code>jsx3.Boolean.TRUE</code> or <code>jsx3.Boolean.FALSE</code>.
 * @param v {Object} boolean (or similar) that when evaluated via an 'if' would result in a true false; For example, null, 0 (numeric zero), and false all return  jsx3.Boolean.FALSE
 * @return {int} <code>jsx3.Boolean.TRUE</code> or <code>jsx3.Boolean.FALSE</code>
 */
jsx3.Boolean.valueOf = function(v) {
  return v ? jsx3.Boolean.TRUE : jsx3.Boolean.FALSE;
};


/**
 * GUI classes.
 */
jsx3.Package.definePackage("jsx3.gui", function(gui){

  /**
   * generic handler that toggles the className or style property for an HTML element; can receive multiple parameter pairs
   * @param objGUI {HTMLElement} on-screen element (HTML element)
   * @param styleProps {Object} JavaScript object, supporting the named property, className, or one or more valid CSS styles. For example: {className:"myClass"} or {color:"#ff0000",fontWeight:"bold"}
   * @package
   */
  gui.shakeStyles = function(objGUI, styleProps) {
    var args = [];
    for (var i = 0; i < arguments.length - 1; i+=2) {
      objGUI = arguments[i];
      
      if (objGUI._jsxshaking) continue;
      objGUI._jsxshaking = true;
      
      styleProps = arguments[i+1];
      var origProps = {};
      for (var f in styleProps) {
        origProps[f] = f == 'className' ? objGUI.className : objGUI.style[f];
      }
      
      args.push(objGUI, origProps, styleProps);
    }
    
    gui._shakeStyles(args, 0, 6);
  };

  /** 
   * called by shakeStyles; toggles the actual CSS class and/or style property
   * @param args {Object} JavaScript array
   * @param thisTime {int} incrementer to toggle n-number of times
   * @param maxTimes {int} max number of times to toggle
   * @private
   * @jsxobf-clobber
   */
  gui._shakeStyles = function(args, thisTime, maxTimes) {
    if (thisTime == maxTimes) { 
      for (var i = 0; i < args.length - 2; i+=3) {
        var objGUI = args[i];
        objGUI._jsxshaking = null;
      }
      return;
    }
    
    for (var i = 0; i < args.length - 2; i+=3) {
      var objGUI = args[i];
      var styleProps = (thisTime % 2 == 0) ? args[i+2] : args[i+1];

      for (var f in styleProps) {
        if (f == 'className')
          objGUI.className = styleProps[f];
        else 
          objGUI.style[f] = styleProps[f];
      }
    }
    
    window.setTimeout(function() {gui._shakeStyles(args, thisTime+1, maxTimes);}, 75);
  };

  gui.isMouseEventModKey = function(objEvent) {
    if (jsx3.app.Browser.macosx)
      return objEvent.metaKey();
    else
      return objEvent.ctrlKey();
  };

});


/**
 * Base classes and the GI introspection framework. 
 * <p/>
 * Note that all classes in this package are also accessible under the <code>jsx3</code> namespace.
 */
jsx3.Package.definePackage("jsx3.lang", function(lang){

});


/**
 * Networking related classes.
 */
jsx3.Package.definePackage("jsx3.net", function(net){

});

/**
 * An interface specifying the methods necessary to define a context against which URIs are resolved.
 *
 * @since 3.2
 */
jsx3.Class.defineInterface("jsx3.net.URIResolver", null, function(URIResolver, URIResolver_prototype) {
  
  /** @private @jsxobf-clobber */
  URIResolver._SCHEME_REG = {};
  
  /**
   * @param strScheme {String}
   * @param objResolver {jsx3.net.URIResolver|Function}
   */
  URIResolver.register = function(strScheme, objResolver) {
    URIResolver._SCHEME_REG[strScheme] = objResolver;
  };
  
  /** @private @jsxobf-clobber */
  URIResolver._getAbsPathUri = function() {
    if (this._ABS_PATH_URI == null)
      /* @jsxobf-clobber */
      this._ABS_PATH_URI = new jsx3.net.URI(jsx3.getEnv("jsxabspath"));
    return this._ABS_PATH_URI;
  };
  
  /** @private @jsxobf-clobber */
  URIResolver._getHomePathUri = function() {
    var env = jsx3.getEnv("jsxhomepath");
    if (env == null) {
      // If we are running under Builder, and a jsxuser: URI is resolved before the project server loads,
      // then the URI will be resolved against the GI installation directory.
      return new jsx3.net.URI(jsx3.getEnv("jsxscriptapppath"));
    }
    
    if (this._HOME_PATH_URI == null)
      /* @jsxobf-clobber */
      this._HOME_PATH_URI = new jsx3.net.URI(env);
    return this._HOME_PATH_URI;
  };
  
  /**
   * {jsx3.net.URIResolver} The default URI resolver. This resolver can resolve any of the absolute URI formats
   * supported by the system. Other absolute URIs and all relative URIs are unmodified. The absolute URI formats are:
   * <ul>
   *   <li><code>JSX/...</code> &#8211;</li>
   *   <li><code>JSXAPPS/...</code> &#8211;</li>
   *   <li><code>GI_Builder/...</code> &#8211;</li>
   *   <li><code>jsx:/...</code> &#8211;</li>
   *   <li><code>jsxapp://appPath/...</code> &#8211;</li>
   *   <li><code>jsxaddin://addinKey/...</code> &#8211;</li>
   *   <li><code>jsxuser:/...</code> &#8211;</li>
   * </ul>
   */
  URIResolver.DEFAULT = URIResolver.jsxclass.newInnerClass();
  
  URIResolver.DEFAULT.resolveURI = function(strURI) {
    var uri = jsx3.net.URI.valueOf(strURI);
    var scheme = uri.getScheme();
    var path = uri.getPath();
    var resolver = URIResolver.getResolver(uri);

    var resolved = uri;
    
    if (resolver && resolver != URIResolver.DEFAULT) {
      if (uri.isAbsolute())
        uri = jsx3.net.URI.fromParts(null, null, null, null, path.substring(1), uri.getQuery(), uri.getFragment());
      resolved = resolver.resolveURI(uri);
    } else if (resolver) {
      resolved = URIResolver._getAbsPathUri().resolve(uri);
    } else if (uri.toString().indexOf(jsx3.APP_DIR_NAME + "/") == 0) {
      resolved = URIResolver.USER.resolveURI(uri);
    } else if (!scheme && path.indexOf("..") >= 0) {
      var loc = jsx3.app.Browser.getLocation();
      resolved = loc.relativize(loc.resolve(uri));
    }
    
    return resolved;    
  };
  
  URIResolver.DEFAULT.getUriPrefix = function() {
    return URIResolver._getAbsPathUri().toString();
  };
  
  URIResolver.DEFAULT.relativizeURI = function(strURI, bRel) {
    return jsx3.net.URI.valueOf(strURI);
  };
  
  /** 
   * {jsx3.net.URIResolver} Resolves URIs according to the default resolver except that all relative URIs are 
   * resolved relative to the <code>JSX/</code> directory. This resolver resolves the following URIs to the same value:
   * <ul>
   *   <li><code>JSX/file.xml</code></li>
   *   <li><code>jsx:/file.xml</code></li>
   *   <li><code>file.xml</code></li>
   * </ul>
   */
  URIResolver.JSX = URIResolver.jsxclass.newInnerClass();
  URIResolver.register("jsx", URIResolver.JSX);
  
  URIResolver.JSX.getURI = function() {
    if (this._uri == null)
      this._uri = URIResolver._getAbsPathUri().resolve(jsx3.SYSTEM_ROOT + "/");
    return this._uri;
  };
  
  URIResolver.JSX.resolveURI = function(strURI) {
    var uri = jsx3.net.URI.valueOf(strURI);
    
    if (!URIResolver.isAbsoluteURI(uri))
      uri = this.getURI().resolve(uri);

    return URIResolver.DEFAULT.resolveURI(uri);
  };
  
  URIResolver.JSX.getUriPrefix = function() {
    return URIResolver._getAbsPathUri() + jsx3.SYSTEM_ROOT + "/";
  };  
  
  URIResolver.JSX.relativizeURI = function(strURI, bRel) {
    var relative = this.getURI().relativize(strURI);
    if (relative.isAbsolute() || bRel)
      return relative;
    else
      return jsx3.net.URI.fromParts("jsx", null, null, null, 
          "/" + relative.getPath(), relative.getQuery(), relative.getFragment());
  };
  
  /** 
   * {jsx3.net.URIResolver} Resolves URIs according to the default resolver except that all relative URIs are 
   * resolved relative to the user directory (or <code>JSXAPPS/../</code>). This resolver resolves the following 
   * URIs to the same value:
   * <ul>
   *   <li><code>JSXAPPS/../file.xml</code></li>
   *   <li><code>jsxuser:/file.xml</code></li>
   *   <li><code>file.xml</code></li>
   * </ul>
   */
  URIResolver.USER = URIResolver.jsxclass.newInnerClass();
  URIResolver.register("jsxuser", URIResolver.USER);
  
  URIResolver.USER.resolveURI = function(strURI) {
    var uri = jsx3.net.URI.valueOf(strURI);

    if (uri.getPath().indexOf(jsx3.APP_DIR_NAME + "/") == 0 || !URIResolver.isAbsoluteURI(uri))
      return URIResolver._getHomePathUri().resolve(uri);
  
    return URIResolver.DEFAULT.resolveURI(uri);
  };
  
  URIResolver.USER.getUriPrefix = function() {
    return URIResolver._getHomePathUri().toString();
  };  
  
  URIResolver.USER.relativizeURI = function(strURI, bRel) {
    var loc = jsx3.app.Browser.getLocation();

    var relative = loc.resolve(jsx3.getEnv("jsxhomepath")).relativize(loc.resolve(strURI));
    if (relative.isAbsolute() || bRel)
      return relative;
    else
      return jsx3.net.URI.fromParts("jsxuser", null, null, null, 
          "/" + relative.getPath(), relative.getQuery(), relative.getFragment());
  };
    
  /**
   * Returns whether the URI <code>strURI</code> is considered absolute in the JSX system. Implementors of the
   * <code>URIResolver</code> interface should always delegate resolution of absolute URIs to the default resolver.
   * This method is not equivalent to <code>URI.isAbsolute()</code> because, for example, URIs beginning with 
   * <code>"JSX/"</code> are considered absolute in the JSX system.
   *
   * @param strURI {String|jsx3.net.URI}
   * @return {boolean}
   */
  URIResolver.isAbsoluteURI = function(strURI) {
    var uri = jsx3.net.URI.valueOf(strURI);
    if (uri.getScheme() != null) return true;
    var path = uri.getPath();
    return path.indexOf("/") == 0 || 
           path.indexOf(jsx3.SYSTEM_ROOT + "/") == 0 || 
           path.indexOf(jsx3.APP_DIR_NAME + "/") == 0 || 
           path.indexOf("GI_Builder/") == 0;    
  };
  
  /**
   * Returns the resolver explicitly referenced in the scheme, host, and path parts of the URI <code>strURI</code>. 
   * This method returns the the following values depending URI:
   * <ul>
   *   <li>jsx: &#8211; <code>URIResolver.JSX</code>.</li>
   *   <li>jsxapp: &#8211; and instance of <code>URIResolver</code> capable of resolving URIs relative to the base
   *     directory of the application corresponding to the host part of the URI.</li>
   *   <li>jsxaddin: &#8211; the instance of <code>jsx3.app.AddIn</code> corresponding to the host part of the URI. If
   *     the addin is not loaded then <code>null</code> is returned.</li>
   *   <li>jsxuser: &#8211; <code>URIResolver.USER</code>.</li>
   *   <li>JSX/ &#8211; <code>URIResolver.DEFAULT</code>.</li>
   *   <li>JSXAPPS/ &#8211; <code>URIResolver.USER</code>.</li>
   *   <li>GI_Builder/ &#8211; <code>URIResolver.DEFAULT</code>.</li>
   *   <li>otherwise <code>null</code>.</li>
   * </ul>
   *
   * @param strURI {String|jsx3.net.URI}
   * @return {jsx3.net.URIResolver}
   */
  URIResolver.getResolver = function(strURI) {    
    var uri = jsx3.net.URI.valueOf(strURI);
    var scheme = uri.getScheme();
    var resolver = null;
    
    if (scheme) {
      resolver = URIResolver._SCHEME_REG[scheme];
      
      if (typeof(resolver) == "function")
        resolver = resolver(uri);
    } else {
      var path = uri.getPath();

      if (path.indexOf(jsx3.SYSTEM_ROOT + "/") == 0 || path.indexOf("GI_Builder/") == 0)
        resolver = URIResolver.DEFAULT;
      else if (jsx3.getEnv('jsxurirslv') == '3.6' && path.indexOf(jsx3.APP_DIR_NAME + "/") == 0)
        resolver = URIResolver.USER;
    }
    
    return resolver;
  };
  
  /**
   * Resolves the URI <code>strURI</code> against the base context of this resolver. Converts a URI relative to this
   * resolver into a URI relative to the URL of the HTML page containing the JSX system. Implementations of this
   * method should delegate to the default resolver any URIs that are judged to be absolute by the method
   * <code>URIResolver.isAbsoluteURI()</code>.
   *
   * @param strURI {String|jsx3.net.URI}
   * @return {jsx3.net.URI}
   * @see #isAbsoluteURI()
   */
  URIResolver_prototype.resolveURI = jsx3.Method.newAbstract("strURI");
  
  /**
   * Returns the URI prefix that when prepended to relative URIs resolves them. This prefix may include 
   * <code>"../"</code> path segments. 
   *
   * @return {String}
   */
  URIResolver_prototype.getUriPrefix = jsx3.Method.newAbstract();
  
  /**
   * Transforms a URI relative to the URL of the HTML page containing the JSX system into an absolute URI defined
   * in relation to this resolver. When resolved against any resolver, the returned URI resolves to <code>strURI</code>.
   *
   * @param strURI {String|jsx3.net.URI}
   * @param bRel {boolean}
   * @return {jsx3.net.URI}
   */
  URIResolver_prototype.relativizeURI = jsx3.Method.newAbstract("strURI", "bRel");
  
});

/**
 * XML related classes.
 */
jsx3.Package.definePackage("jsx3.xml", function(xml){

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Utility classes.
 */
jsx3.Package.definePackage("jsx3.util", function(util) {

  /** @package */
  util.RESERVED = jsx3.$H("abstract,boolean,break,byte,case,catch,char,class,const,continue,debugger,default,delete,do,double,else,enum,export,extends,false,final,finally,float,for,function,goto,if,implements,import,in,instanceof,int,interface,long,native,new,null,package,private,protected,public,return,short,static,super,switch,synchronized,this,throw,throws,transient,true,try,typeof,var,void,volatile,while,with".split(","));

  /** 
   * Returns <code>true</code> if <code>n</code> is a valid JavaScript name and not a JavaScript reserved word.
   * 
   * @param n {String} the candidate name.
   * @return {boolean}
   */
  util.isName = function(n) {
    return Boolean(!util.RESERVED[n] && n.match(/^[\\$_a-zA-Z][\w\\$]*$/));
  };

  /**
   * Compares two version strings. A version string is list of arbitrary length of numbers separated by '.'. The
   * first number is the most significant.
   *
   * @param v1 {String} the first version string.
   * @param v2 {String} the second version string.
   * @return {int} <code>1</code> if <code>v1</code> is greater than <code>v2</code>, <code>-1</code> if
   *   <code>v2</code> is greater than <code>v1</code>, or <code>0</code> if <code>v1</code> and <code>v2</code> are equal.
   * @package
   */
  util.compareVersions = function(v1, v2) {
    var regex = /^(\d+)?([a-zA-Z_]\w*)?$/;

    var v1t = v1.split(/[\._]/);
    var v2t = v2.split(/[\._]/);
    var maxLength = Math.max(v1t.length, v2t.length);

    var ad, al, bd, bl;

    for (var i = 0; i < maxLength; i++) {
      if (v1t.length > i && regex.test(v1t[i])) {
        ad = parseInt(RegExp.$1) || Number(0);
        al = RegExp.$2;
      } else {
        ad = 0;
        al = "";
      }

      if (v2t.length > i && regex.test(v2t[i])) {
        bd = parseInt(RegExp.$1) || Number(0);
        bl = RegExp.$2;
      } else {
        bd = 0;
        bl = "";
      }

      if (ad > bd) return 1;
      if (ad < bd) return -1;
      if (al > bl) return 1;
      if (al < bl) return -1;
    }

    return 0;
  };

  /**
   * Calculates <code>a mod b</code>, but the result is not allowed to be negative.
   * @param v {Number} a
   * @param mod {Number} b
   * @return {Number} <code>a mod b</code> if <code>a >= 0</code>, <code>b + a mod b</code>, if <code>a < 0</code>.
   * @since 3.2
   */
  util.numMod = function(v, mod) {
    var result = v % mod;
    return result < 0 ? result + mod : result;
  };

  /**
   * Returns <code>v == null || isNaN(v)</code>.
   * @param v {Object} any value.
   * @return {boolean}
   * @since 3.2
   */
  util.numIsNaN = function(v) {
    return v == null || v === "" || isNaN(v);
  };

  /**
   * Rounds <code>v</code> to the nearest value that can be divided by <code>intUnit</code>.
   * @param v {Number}
   * @param intUnit {int}
   * @return {Number}
   * @since 3.2
   */
  util.numRound = function(v, intUnit) {
    return Math.round(v/intUnit) * intUnit;
  };

  /**
   * Returns whether <code>s</code> is <code>null</code> or an empty string.
   * @param s {String}
   * @return {boolean}
   * @since 3.2
   */
  util.strEmpty = function(s) {
    return s == null || s === "";
  };

  /** @private @jsxobf-clobber */
  util._jsxescapemap = {};
  util._jsxescapemap['\b'] = '\\b';
  util._jsxescapemap['\t'] = '\\t';
  util._jsxescapemap['\n'] = '\\n';
  util._jsxescapemap['\f'] = '\\f';
  util._jsxescapemap['\r'] = '\\r';
  util._jsxescapemap['"'] = '\\"';
  util._jsxescapemap['\\'] = '\\\\';

  /**
   * Returns <code>str</code> appropriately formatted and escaped for use as a JSON string.  If evaluated via
   * <code>window.eval</code>, the return from this method will be an exact match of the input.
   * @param str {String}
   * @return {String}
   * @since 3.6
   */
  util.strEscapeJSON = function (str) {
    if (/["\\\x00-\x1f]/.test(str)) {
      return '"' + str.replace(/[\x00-\x1f\\"]/g, function (a) {
        var c = util._jsxescapemap[a];
        if (c)
          return c;
        c = a.charCodeAt();
        return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
      }) + '"';
    }
    return '"' + str + '"';
  };

  /**
   * Returns the array index of <code>o</code> in <code>a</code>. Comparisons are performed with strict equals (===).
   * @param a {Array}
   * @param o {Object}
   * @return {int}
   */
  util.arrIndexOf = function(a, o) {
    for (var i = 0; i < a.length; i++)
      if (a[i] === o) return i;
    return -1;
  };

  /** @private @jsxobf-clobber */
  util._TRIM_REGEX = /(^\s*)|(\s*$)/g;

  /**
   * Returns <code>s</code> trimmed of trailing and leading spaces (anything matching the regexp <code>/\s/</code>).
   * @param s {String}
   * @return {String}
   * @since 3.2
   */
  util.strTrim = function(s) {
    return s.replace(util._TRIM_REGEX, "");
  };

  /**
   * Returns <code>s</code> with the following four characters replaced by their escaped equivalent:
   * <code>&amp; &lt; &gt; "</code>. This method also replaces any character that is not a valid XML character
   * (valid character codes are: 0x09, 0x0A, 0x0D, 0x20-0xD7FF, 0xE000-0xFFFD, 0x10000-0x10FFFF) with "&#92;uXX" where XX
   * is the unicode hex value of the character.
   *
   * @param s {String}
   * @return {String}
   * @since 3.2
   */
  util.strEscapeHTML = function(s) {
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(
        // NOTE: the XML spec would be [^\x09\x0A\x0D\x20-\xD7FF\xE000-\xFFFD\x10000-\x10FFFF] but Firefox won't
        // compile that regex, see http://www.w3.org/TR/REC-xml/
        /[^\x09\x0A\x0D\x20-\x7F]/g,
        function(m) {
          var c = m.charCodeAt(0);
          if (c < 0x20 || (c > 0xD7FF && c < 0xE000) || (c > 0xFFFD && c < 0x10000) || c > 0x10FFFF)
            return "\\u" + c.toString(16);
          else
            return m;
        } );
  };

  /**
   * Limits <code>s</code> to length <code>intMax</code> by placing an ellipsis in values that are too long.
   * @param s {String}
   * @param intMax {int} the maximum length of the string returned by this method.
   * @param strEllipsis {String} the ellipsis to use. <code>"..."</code> is used by default.
   * @param fltPos {Number} the placement of the ellipsis as a value between 0 and 1. 1, the default, means that the
   *   ellipsis comes at the end of the truncated string. Other values mean that the head and tail of the string
   *   will be returned with the ellipsis somewhere in the middle.
   * @return {String}
   * @since 3.2
   */
  util.strTruncate = function(s, intMax, strEllipsis, fltPos) {
    if (strEllipsis == null) strEllipsis = "...";
    if (fltPos == null) fltPos = 1.0;

    if (s.length > intMax && strEllipsis.length < intMax) {
      var l = intMax - strEllipsis.length;
      var beforeLength = Math.round(l * fltPos);
      var before = s.substring(0, beforeLength);
      var after = s.substring(s.length - (l - beforeLength));
      return before + strEllipsis + after;
    } else {
      return s;
    }
  };

  /**
   * Returns whether <code>s</code> ends with <code>strTest</code>.
   * @param s {String}
   * @param strTest {String}
   * @return {boolean}
   * @since 3.2
   */
  util.strEndsWith = function(s, strTest) {
    var index = s.lastIndexOf(strTest);
    return index >= 0 && index == s.length - strTest.length;
  };

  /** @private @jsxobf-clobber */
  util._BASE64S = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  /**
   * Returns the result of encoding <code>s</code> to its base-64 equivalent.
   * @param s {String}
   * @return {String}
   * @since 3.2
   */
  util.strEncodeBase64 = function(s) {
    var base64s = util._BASE64S;
    var buffer = new Array(Math.ceil(s.length * 4 / 3));

    var i = 0, c = 0, length = s.length;
    for (; i <= length - 3; i += 3) {
      var bits = (s.charCodeAt(i)   & 0xff) << 16 |
                 (s.charCodeAt(i+1) & 0xff) << 8  |
                 (s.charCodeAt(i+2) & 0xff);

      buffer[c++] = base64s.charAt((bits & 0xfc0000) >> 18);
      buffer[c++] = base64s.charAt((bits & 0x03f000) >> 12);
      buffer[c++] = base64s.charAt((bits & 0x000fc0) >> 6);
      buffer[c++] = base64s.charAt((bits & 0x00003f));
    }

    if (i < length) {
      var dual = i < length - 1;

      var bits = (s.charCodeAt(i) & 0xff) << 16;
      if (dual)
        bits |= (s.charCodeAt(i+1) & 0xff) << 8;

      buffer[c++] =   base64s.charAt((bits & 0xfc0000) >> 18);
      buffer[c++] =   base64s.charAt((bits & 0x03f000) >> 12);
      if (dual)
        buffer[c++] = base64s.charAt((bits & 0x000fc0) >> 6);
      else
        buffer[c++] = "=";
      buffer[c++] = "=";
    }

    return buffer.join("");
  };

  /**
   * Returns the result of decoding <code>s</code> from its base-64 equivalent.
   * @param s {String}
   * @return {String}
   * @since 3.2
   */
  util.strDecodeBase64 = function(s) {
    var base64s = util._BASE64S;
    var buffer = new Array(Math.ceil(s.length / 4));

    //declare variables
    var i = 0, c = 0, length = s.length;
    for (; i < length; i += 4) {
      var bits = (base64s.indexOf(s.charAt(i))   & 0xff) << 18 |
                 (base64s.indexOf(s.charAt(i+1)) & 0xff) << 12 |
                 (base64s.indexOf(s.charAt(i+2)) & 0xff) <<  6 |
                 (base64s.indexOf(s.charAt(i+3)) & 0xff);

      buffer[c++] = String.fromCharCode((bits & 0xff0000) >> 16, (bits & 0xff00) >> 8, bits & 0xff);
    }

    if (s.charCodeAt(i-2) == 61)
      buffer[c-1] = buffer[c-1].substring(0,1);
    else if (s.charCodeAt(i-1) == 61)
      buffer[c-1] = buffer[c-1].substring(0,2);

    return buffer.join("");
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

/**
 * An object-oriented version of the built-in JavaScript <code>Array</code> class.
 * <p/>
 * Note that methods such as <code>indexOf</code> and <code>remove</code> compare objects
 * with the strict equality operators (<code>===</code> and <code>!==</code>). Therefore, for the purposes of this
 * class <code>1</code> and <code>"1"</code> are not equal.
 *
 * @since 3.2
 */
jsx3.Class.defineClass('jsx3.util.List', null, null, function(List, List_prototype) {

  /**
   * If <code>a</code> is already an instance of this class, this method returns <code>a</code>.
   * If <code>a</code> is an array, this method returns a new List instance backed by <code>a</code>.
   * @param a {Array|jsx3.util.List}
   * @return {jsx3.util.List}
   * @throws {jsx3.IllegalArgumentException} if <code>a</code> is not a list or array.
   */
  List.wrap = function(a) {
    if (a instanceof List) {
      return a;
    } else if (a instanceof Array) {
      return new List(a, true);
    } else {
      throw new jsx3.IllegalArgumentException("a", a);
    }
  };

  /**
   * The instance initializer. Creates a new list. If <code>a</code> is a number, the list is initialized with
   * that size. If <code>a</code> is an array or list, the contents of <code>a</code> are copied into the new list.
   * @param a {int|Array|jsx3.util.List}
   * @param-private bLive {boolean}
   */
  List_prototype.init = function(a, bLive) {
    if (typeof(a) == "number") {
      this._src = new Array(a);
    } else if (a instanceof List) {
      this._src = a._src.concat();
    } else {
      a = List._convertArrayLikeToArray(a);
      if (a instanceof Array) {
        this._src = bLive ? a : a.concat();
      } else {
        /* @jsxobf-clobber-shared */
        this._src = [];
      }
    }

    /* @jsxobf-clobber */
    this._iterator = -1;
  };

  /**
   * @return {int}
   */
  List_prototype.size = function() {
    return this._src.length;
  };

  /**
   * @param intIndex {int}
   * @return {Object}
   */
  List_prototype.get = function(intIndex) {
    return this._src[intIndex];
  };

  /**
   * @param intIndex {int}
   * @param objElm {Object}
   */
  List_prototype.set = function(intIndex, objElm) {
    this._src[intIndex] = objElm;
  };

  /**
   * @return {jsx3.util.Iterator}
   */
  List_prototype.iterator = function() {
    return new List.Iterator(this);
  };

  /**
   * Removes all elements from this list.
   */
  List_prototype.clear = function() {
    this._src.splice(0, this._src.length);
  };

  /**
   * Returns the index of the first occurrence of <code>objElm</code> in this list. Comparisons are performed with
   * strict equals (===).
   * @param objElm {Object} the item to find
   * @param intStartAt {int}
   * @return {int} the index of the found object or <code>-1</code> if not found.
   */
  List_prototype.indexOf = function(objElm, intStartAt) {
    if (intStartAt == null) intStartAt = 0;
    var size = this.size();
    for (var i = intStartAt; i < size; i++) {
      if (this.get(i) === objElm)
        return i;
    }
    return -1;
  };

  /**
   * Returns the index of the last occurrence of <code>objElm</code> in this list. Comparisons are performed with
   * strict equals (===).
   * @param objElm {Object} the item to find
   * @param intStartAt {int}
   * @return {int} the index of the found object or -1 if not found
   */
  List_prototype.lastIndexOf = function(objElm, intStartAt) {
    if (intStartAt == null) intStartAt = this.size() - 1;
    for (var i = intStartAt; i >= 0; i--) {
      if (this.get(i) === objElm)
        return i;
    }
    return -1;
  };

  /**
   * @param objElm {Object} the item to find
   * @return {boolean}
   */
  List_prototype.contains = function(objElm) {
    return this.indexOf(objElm) >= 0;
  };

  /**
   * Removes the first occurrence of <code>objElm</code> in this list.
   * @param objElm {Object} the object to remove
   * @return  the removed object or null if no object was removed
   */
  List_prototype.remove = function(objElm) {
    var index = this.indexOf(objElm);
    if (index >= 0)
      return this._src.splice(index, 1)[0];
    return null;
  };

  /**
   * Removes a single or a range of elements from this list.
   * @param intStart {int}
   * @param intEnd {int}
   * @return {Object|jsx3.util.List<Object>} the removed object or null if no object was removed
   */
  List_prototype.removeAt = function(intStart, intEnd) {
    if (arguments.length == 2) {
      return List.wrap(this._src.splice(intStart, (intEnd - intStart)));
    } else {
      return this._src.splice(intStart, 1)[0];
    }
  };

  /**
   * Returns a copy of this list.
   * @return {jsx3.util.List}
   */
  List_prototype.clone = function() {
    return new List(this);
  };

  /**
   * @param objElm {Object}
   * @param intAt {int}
   */
  List_prototype.add = function(objElm, intAt) {
    var src = this._src;
    if (intAt == null)
      src[src.length] = objElm;
    else
      src.splice(intAt, 0, objElm);
  };

  /**
   * @param a {Array|jsx3.util.List}
   * @param intAt {int}
   * @throws {jsx3.IllegalArgumentException} if <code>a</code> is not a list or array.
   */
  List_prototype.addAll = function(a, intAt) {
    if (a instanceof List)
      a = a.toArray(true);
    else
      a = List._convertArrayLikeToArray(a);

    if (jsx3.$A.is(a)) {
      if (intAt == null)
        this._src.push.apply(this._src, a);
      else
        this._src = this._src.slice(0, intAt).concat(a, this._src.slice(intAt));
    } else {
      throw new jsx3.IllegalArgumentException("a", a);
    }
  };

  /** @private @jsxobf-clobber */
  List._convertArrayLikeToArray = function(a) {
    if (a == null || a instanceof Array) {
      return a;
    } else if (typeof(a.length) == "number") {
      var c = new Array(a.length);
      for (var i = 0; i < a.length; i++)
        c[i] = a[i];
      return c;
    } else {
      return a;
    }
  };

  /**
   * Returns a section of this list as another list. The returned section is a copy of this list and is not affected
   * by subsequent changes to this list.
   * @param intStart {int}
   * @param intEnd {int}
   * @return {List}
   */
  List_prototype.slice = function(intStart, intEnd) {
    // NOTE: Fx and IE behave differently even if null is sent as the second parameter
    return List.wrap(arguments.length > 1 ? this._src.slice(intStart, intEnd) : this._src.slice(intStart));
  };

  /**
   * Sorts this list.
   * @param fctComparator {Function}
   */
  List_prototype.sort = function(fctComparator) {
    // NOTE: Fx and IE behave differently even if null is sent as the first parameter
    if (fctComparator) this._src.sort(fctComparator);
    else this._src.sort();
  };

  /**
   * Returns a copy of this list as an array.
   * @param bLive {boolean} if true, then the returned array is the actual backing array of this list.
   * @return {Array}
   */
  List_prototype.toArray = function(bLive) {
    return bLive ? this._src : this._src.concat();
  };

  /**
   * Returns true if this list and <code>l</code> have the same length and <code>this.get(n) = l.get(n)</code>
   * for all n.
   * @param l {Object}
   * @return {boolean}
   */
  List_prototype.equals = function(l) {
    if (this === l) return true;
    if (!(l instanceof List)) return false;
    var size = this.size();
    if (size != l.size()) return false;
    for (var i = 0; i < size; i++) {
      if (this.get(i) !== l.get(i)) return false;
    }
    return true;
  };

  /**
   * Creates a new list with the filtered contents of this list. The <code>fctFilter</code> parameter defines
   * the filtering function.
   * @param fctFilter {Function} a function that is called once for each item in this array and returns true if the item
   *    should be included in the filtered list. The signature of this function is
   *    <code>function(item : Object) : boolean</code>.
   * @return {jsx3.util.List}
   */
  List_prototype.filter = function(fctFilter) {
    var filtered = [];
    var size = this.size();
    for (var i = 0; i < size; i++) {
      var item = this.get(i);
      if (fctFilter(item))
        filtered[filtered.length] = item;
    }
    return List.wrap(filtered);
  };

  /**
   * Creates a new list with the mapped contents of this array. The <code>fctMapper</code> parameter defines
   * the mapping function.
   * <p/>
   * This method has four modes corresponding to the four possible values for <code>{bExpand, bObject}</code>:
   * <ul>
   * <li><code>{false, false}</code> (default) &#8211; the filtering function takes an item in this list and returns
   *    a single object value which will take the place of the item in the mapped result.</li>
   * <li><code>{true, false}</code> &#8211; the filtering function takes an item in this list and returns
   *    a single object value or an array of values, all of which will be inserted into the mapped result at the index
   *    of the item.</li>
   * <li><code>{false, true}</code> &#8211; the filtering function takes an item in this list and returns an array with
   *    exactly two values, which become a name/value pair in the mapped result.</li>
   * <li><code>{true, true}</code> &#8211; the filtering function takes an item in this list and returns an array with
   *    zero or an even number of items, which become name/value pairs in the mapped result.</li>
   * </ul>
   *
   * @param fctMapper {Function} a function that is called once for each item in this array and returns the mapped
   *    value. The signature of this function depends on the values for the <code>bExpand</code> and
   *    <code>bObject</code> parameters.
   * @param bExpand {boolean} if <code>true</code>, the resulting mapped array or object may any number of values
   *    corresponding to each item in this list. Otherwise, it will have exactly one value for each item in this list.
   * @param bObject {boolean} if <code>true</code>, this array is mapped to an object with property name/value pairs.
   *    Otherwise this array is mapped to another array.
   * @return {jsx3.util.List|Object} a list if the <code>bObject</code> parameter is <code>null</code> or
   *    <code>false</code>, otherwise an <code>Object</code>.
   */
  List_prototype.map = function(fctMapper, bExpand, bObject) {
    var size = this.size();
    if (bExpand) {
      if (bObject) {
        var mapped = {};
        for (var i = 0; i < size; i++) {
          var pairs = fctMapper(this.get(i));
          for (var j = 0; j < pairs.length; j+=2)
            mapped[pairs[j]] = pairs[j+1];
        }
        return mapped;
      } else {
        var mapped = [];
        for (var i = 0; i < size; i++) {
          var val = fctMapper(this.get(i));
          if (val instanceof Array)
            mapped.push.apply(mapped, val);
          else
            mapped[mapped.length] = val;
        }
        return List.wrap(mapped);
      }
    } else {
      if (bObject) {
        var mapped = {};
        for (var i = 0; i < size; i++) {
          var pair = fctMapper(this.get(i));
          mapped[pair[0]] = pair[1];
        }
        return mapped;
      } else {
        var mapped = new Array(size);
        for (var i = 0; i < size; i++)
          mapped[i] = fctMapper(this.get(i));
        return List.wrap(mapped);
      }
    }
  };

  List_prototype.toString = function() {
    return "[" + this._src + "]";
  };


  /**
   * @deprecated  Use the <code>jsx3.util.Iterator</code> interface instead.
   */
  List_prototype.reset = function() {
    this._iterator = -1;
    return this;
  };

  /**
   * @deprecated  Use the <code>jsx3.util.Iterator</code> interface instead.
   */
  List_prototype.next = function() {
    return this.get(++this._iterator);
  };

  /**
   * @deprecated  Use the <code>jsx3.util.Iterator</code> interface instead.
   */
  List_prototype.move = function(intIndex) {
    this._iterator = intIndex;
    return this;
  };

  /**
   * @deprecated  Use the <code>jsx3.util.Iterator</code> interface instead.
   */
  List_prototype.hasNext = function() {
    return this._iterator < (this.size() - 1);
  };

  /**
   * @deprecated  Use the <code>jsx3.util.Iterator</code> interface instead.
   */
  List_prototype.getIndex = function() {
    return this._iterator;
  };

  /**
   * @deprecated  Use <code>get()</code> instead.
   */
  List_prototype.getItem = function(intIndex) {
    return this.get(intIndex);
  };

  /**
   * @deprecated  Use <code>size()</code> instead.
   */
  List_prototype.getLength = function() {
    return this.size();
  };


});

/**
 * An interface that defines an object that can be iterated over.
 *
 * @since 3.2
 */
jsx3.Class.defineInterface('jsx3.util.Iterator', null, function(Iterator, Iterator_prototype) {

  /**
   * Returns the next element in this iterator.
   * @return {Object}
   */
  Iterator_prototype.next = jsx3.Method.newAbstract();

  /**
   * Returns whether there are more elements remaining in this iterator.
   * @return {boolean}
   */
  Iterator_prototype.hasNext = jsx3.Method.newAbstract();

  /**
   * Removes the last object returned by next() from the source backing this iterator.
   */
  Iterator_prototype.remove = jsx3.Method.newAbstract();

});

// @jsxobf-clobber-shared  _list _index _size

/**
 * @private
 */
jsx3.Class.defineClass('jsx3.util.List.Iterator', null, [jsx3.util.Iterator], function(Iterator, Iterator_prototype) {

  Iterator_prototype.init = function(objList) {
    this._list = objList;
    this._size = objList ? objList.size() : 0;
    this._index = 0;
  };

  Iterator_prototype.next = function() {
    return this._list.get(this._index++);
  };

  Iterator_prototype.hasNext = function() {
    return this._index < this._size;
  };

  Iterator_prototype.remove = function() {
    if (this._index > 0) {
      this._list.removeAt(--this._index);
      this._size--;
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
 * A class that represents a JSX add-in. The JSX system creates an instance of this class for every add-in that 
 * is loaded.
 *
 * @since 3.2
 */
jsx3.Class.defineClass("jsx3.app.AddIn", null, [jsx3.net.URIResolver], function(AddIn, AddIn_prototype) {

  var URIResolver = jsx3.net.URIResolver;
  
  /**
   * {String}
   * @final @jsxobf-final
   */
  AddIn.PROTOTYPES_DIR = "prototypes/";

  /**
   * @param strKey {String}
   * @package
   */
  AddIn_prototype.init = function(strKey) {
    /* @jsxobf-clobber-shared */
    this._key = strKey;
    /* @jsxobf-clobber-shared */
    this._path = strKey.indexOf("user:") == 0 ?  
                 jsx3.resolveURI("jsxuser:/addins/" + strKey.substring(5) + "/") :
                 jsx3.resolveURI(jsx3.ADDINSPATH + strKey + "/");
    /* @jsxobf-clobber-shared */
    this._uri = new jsx3.net.URI(this._path);
    /* @jsxobf-clobber-shared */
    this._uriabs = jsx3.app.Browser.getLocation().resolve(this._uri);
    /* @jsxobf-clobber */
    this._settings = null;
  };
  
  /**
   * @return {String}
   */
  AddIn_prototype.getId = function() {
    return this.getSettings().get("id");
  };
  
  /**
   * @return {String}
   */
  AddIn_prototype.getName = function() {
    return this.getSettings().get("name");
  };
  
  /**
   * @return {String}
   */
  AddIn_prototype.getDescription = function() {
    return this.getSettings().get("description");
  };
  
  /**
   * @return {String}
   */
  AddIn_prototype.getVersion = function() {
    return this.getSettings().get("version");
  };
  
  /**
   * @return {String}
   * @package
   */
  AddIn_prototype.getJsxVersion = function() {
    return this.getSettings().get("jsxversion") || "3.1";
  };
  
  /**
   * @return {String}
   */
  AddIn_prototype.getKey = function() {
    return this._key;
  };
  
  /**
   * @return {String}
   * @package
   */
  AddIn_prototype.getPath = function() {
    return this._path;
  };
  
  /**
   * @return {jsx3.app.Settings}
   */
  AddIn_prototype.getSettings = function() {
    if (this._settings == null) {
      var objXML = jsx3.getSystemCache().getOrOpenDocument(this._uri.resolve(jsx3.CONFIG_FILE), "JSX_SETTINGS::" + this.getKey());
      /* @jsxobf-clobber */
      this._settings = new jsx3.app.Settings(objXML);
    }
    return this._settings;
  };
  
  AddIn_prototype.setSettings = function(objSettings) {
    this._settings = objSettings;
  };
  
  /**
   * @param strURI {String|jsx3.net.URI}
   * @return {jsx3.net.URI}
   */
  AddIn_prototype.resolveURI = function(strURI) {
    var uri = jsx3.net.URI.valueOf(strURI);
    
    if (jsx3.util.compareVersions(this.getJsxVersion(), "3.2") >= 0 && !URIResolver.isAbsoluteURI(uri))
      uri = this._uri.resolve(uri);

    return URIResolver.DEFAULT.resolveURI(uri);
  };
  
  /**
   * @return {String}
   */
  AddIn_prototype.getUriPrefix = function() {
    return this._uri.toString();
  };    

  /**
   * @param strURI {String|jsx3.net.URI}
   * @return {jsx3.net.URI}
   */
  AddIn_prototype.relativizeURI = function(strURI, bRel) {
    var loc = jsx3.app.Browser.getLocation();
    var relative = this._uriabs.relativize(loc.resolve(strURI));

    if (relative.isAbsolute() || bRel)
      return relative;
    else
      return jsx3.net.URI.fromParts("jsxaddin", null, this.getKey().replace(/:/, "!"), null, 
          "/" + relative.getPath(), relative.getQuery(), relative.getFragment());
  };    

  /**
   * @return {String}
   */
  AddIn_prototype.toString = function() {
    return this._key;
  };
  
  URIResolver.register("jsxaddin", function(uri) {
    var addinKey = uri.getHost().split("!", 2).join(":");
    return jsx3.System.getAddin(addinKey);
  });
  
});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * An Event Dispatcher mixin interface, adds the ability to register event listeners and dispatch events
 * to those listeners.
 * <p/>
 * (Deprecated) Classes that implement this mixin must also implement a method getServer(), which returns the server in
 * which to look for JSX ids.
 *
 * @since 3.0
 */
jsx3.Class.defineInterface("jsx3.util.EventDispatcher", null, function(EventDispatcher, EventDispatcher_prototype) {
  
  /** @private @jsxobf-clobber */
  EventDispatcher._OBJ_FUNCT = 1;

  /** @private @jsxobf-clobber */
  EventDispatcher._OBJ_STRING = 2;

  /** @private @jsxobf-clobber */
  EventDispatcher._STRING_FUNCT = 3;

  /** @private @jsxobf-clobber */
  EventDispatcher._STRING_STRING = 4;

  /** @private @jsxobf-clobber */
  EventDispatcher._FUNCT = 5;
  
  /** @final @jsxobf-final */
  EventDispatcher.SUBJECT_ALL = "*";

  /**
   * Subscribes an object or function to a type of event published by this object.
   * <p/>
   * As of version 3.4 a string value for <code>objHandler</code> is deprecated.
   *
   * @param strEventId {String|Array<String>} the event type(s).
   * @param objHandler {object/string/function} if an object, the instance to notify of events (objFunction is required); if a string, the JSX id of the instance to notify of events (objFunction is required), must exist in the same Server; if a function, the function to call to notify of events (objFunction ignored)
   * @param objFunction {function/string} if objHandler is a string or object then the function to call on that instance. either a function or a string that is the name of a method of the instance
   * @throws {jsx3.IllegalArgumentException} if objHandler/objFunction are not a valid combination of types
   */
  EventDispatcher_prototype.subscribe = function(strEventId, objHandler, objFunction) {
    var type1 = typeof(objHandler);
    var type2 = typeof(objFunction);
    
    var toAdd = null;
    if (type1 == "object" || type1 == "function") {
      if (type2 == "function") {
        toAdd = [EventDispatcher._OBJ_FUNCT, objHandler, objFunction];
      } else if (type2 == "string") {
        toAdd = [EventDispatcher._OBJ_STRING, objHandler, objFunction];
      } else if (type1 == "function") {
        toAdd = [EventDispatcher._FUNCT, objHandler];
      }
    } else if (type1 == "string") {
      if (type2 == "function") {
        toAdd = [EventDispatcher._STRING_FUNCT, objHandler, objFunction];
      } else if (type2 == "string") {
        toAdd = [EventDispatcher._STRING_STRING, objHandler, objFunction];
      }
    }
    
    // HACK: function subscriptions coming from other browser windows will be reported as type "object" in IE
    if (toAdd == null && (type1 == "object" && objHandler.call && objHandler.apply))
      toAdd = [EventDispatcher._FUNCT, objHandler];
    
    if (toAdd == null) {
      throw new jsx3.IllegalArgumentException("objHandler, objFunction",
          "{" + typeof(objHandler) + "}, {" + typeof(objFunction) + "}");
    }
    
    if (!jsx3.$A.is(strEventId)) strEventId = [strEventId];
    
    for (var i = 0; i < strEventId.length; i++) {
      var registry = this._getEventRegistry();
      var eventId = strEventId[i];
      
      if (!registry[eventId])
        registry[eventId] = [toAdd];
      else
        registry[eventId].push(toAdd);
    }
  };

  /**
   * Unsubscribe an object or function from an event published by this object.
   * <p/>
   * As of version 3.4 a string value for <code>objHandler</code> is deprecated.
   *
   * @param strEventId {String|Array<String>} the event type(s).
   * @param objHandler {object|string|function} the value of objHandler passed to subscribe
   */
  EventDispatcher_prototype.unsubscribe = function(strEventId, objHandler) {
    if (!jsx3.$A.is(strEventId)) strEventId = [strEventId];
    
    for (var i = 0; i < strEventId.length; i++) {
      var queue = this._getEventRegistry()[strEventId[i]];
      if (queue) {
        for (var j = 0; j < queue.length; j++) {
          if (queue[j][1] === objHandler)
            queue.splice(j--, 1);
        }
      }
    }
  };

  /**
   * Unsubscribes all subscribed objects to a type of event published by this object.
   * @param strEventId {String} the event type
   */
  EventDispatcher_prototype.unsubscribeAll = function(strEventId) {
    if (this._jsxeventreg)
      delete this._jsxeventreg[strEventId];
  };

  EventDispatcher_prototype.unsubscribeAllFromAll = function() {
    this._jsxeventreg = {};
  };
  
  /**
   * Publishes an event to all subscribed objects.
   * @param objEvent {object} the event, should have at least a field 'subject' that is the event id, another common field is 'target' (target will default to this instance)
   * @return {int} the number of listeners to which the event was broadcast
   * @throws {jsx3.IllegalArgumentException} objEvent is not an object with a <code>subject</code> property
   */
  EventDispatcher_prototype.publish = function(objEvent) {
    // always set the event target
    if (objEvent.target == null)
      objEvent.target = this;
    
    var strEventId = objEvent.subject;
    if (strEventId == null)
      throw new jsx3.IllegalArgumentException("objEvent", objEvent);
    
    var reg = this._jsxeventreg;

    if (!reg) return;

    var q1 = reg[strEventId];
    var q2 = reg[EventDispatcher.SUBJECT_ALL];

    if (!q1 && !q2) return;

    // defensive copy: subscribers may unsubscribe themselves
    var queue = [];
    if (q1) queue.push.apply(queue, q1);
    if (q2) queue.push.apply(queue, q2);

    for (var i = 0; i < queue.length; i++) {
      var item = queue[i];
      var type = item[0];
      var target = item[1];
      var method = item[2];

      if (type == EventDispatcher._OBJ_FUNCT) {
        method.call(target, objEvent);
      } else if (type == EventDispatcher._OBJ_STRING) {
        target[method](objEvent);
      } else if (type == EventDispatcher._STRING_FUNCT) {
        var objJSX = this.getServer().getJSX(target);
        if (objJSX)
          method.call(objJSX, objEvent);
      } else if (type == EventDispatcher._STRING_STRING) {
        var objJSX = this.getServer().getJSX(target);
        if (objJSX)
          objJSX[method](objEvent);
      } else if (type == EventDispatcher._FUNCT) {
        target.call(null, objEvent);
      } else {
        // assert false
      }
    }
    
    return queue.length;
  };
  
  EventDispatcher_prototype.getSubscriberCount = function(strEventId) {
    var list = this._getEventRegistry()[strEventId];
    return list ? list.length : 0;
  };
  
  /** @private @jsxobf-clobber */
  EventDispatcher_prototype._getEventRegistry = function() {
    if (this._jsxeventreg == null)
      this._jsxeventreg = {};
    return this._jsxeventreg;
  };

});

jsx3.util.EventDispatcher.jsxclass.mixin(jsx3);


/**
 * @deprecated  Renamed to jsx3.util.EventDispatcher
 * @see jsx3.util.EventDispatcher
 * @jsxdoc-definition  jsx3.Class.defineInterface("jsx3.EventDispatcher", -, function(){});
 */
jsx3.EventDispatcher = jsx3.util.EventDispatcher;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Represents a Uniform Resource Identifier (URI) reference. Modeled on the Java class <code>java.net.URI</code>.
 *
 * @since 3.1
 */
jsx3.Class.defineClass("jsx3.net.URI", null, null, function(URI, URI_prototype) {

  /** @private @jsxobf-clobber */
  URI.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  /** @private @jsxobf-clobber */
  URI.DIGIT = "0123456789";
  /** @private @jsxobf-clobber */
  URI.ALPHANUM = URI.ALPHA + URI.DIGIT;
  /** @private @jsxobf-clobber */
  URI.UNRESERVED = URI.ALPHANUM + "_-!.~'()*";
  /** @private @jsxobf-clobber */
  URI.PUNCT = ",;:$&+=";
  /** @private @jsxobf-clobber */
  URI.RESERVED = URI.PUNCT + "?/[]@";
  /** @private @jsxobf-clobber */
  URI.ESCAPED = "%";

  /** @private @jsxobf-clobber */
  URI._SCHEME_REGEX = new RegExp("^[" + URI.ALPHA + "][\\-\\.\\+" + URI.ALPHA + "]*\\:");

  /** @private @jsxobf-clobber */
  URI_prototype._source = null;
  /** @private @jsxobf-clobber */
  URI_prototype._scheme = null;
  /** @private @jsxobf-clobber */
  URI_prototype._ssp = null;
  /** @private @jsxobf-clobber */
  URI_prototype._fragment = null;
  /** @private @jsxobf-clobber */
  URI_prototype._authority = null;
  /** @private @jsxobf-clobber */
  URI_prototype._path = null;
  /** @private @jsxobf-clobber */
  URI_prototype._query = null;
  /** @private @jsxobf-clobber */
  URI_prototype._userinfo = null;
  /** @private @jsxobf-clobber */
  URI_prototype._host = null;
  /** @private @jsxobf-clobber */
  URI_prototype._port = null;
  
  /**
   * This method can be called with either 3 or 7 arguments. If it is called with 3 arguments, the signature is
   * <code>URI.fromParts(scheme, schemeSpecificPath, fragment)</code>.
   * 
   * @param scheme {String} the URI scheme, may be <code>null</code>
   * @param userInfo {String} the URI user-information, may be <code>null</code>; <b>or the scheme-specific part if called with 3 arguments</b>
   * @param host {String} the URI host, may be <code>null</code>; <b>or the URI fragment if called with 3 arguments</b>, may be <code>null</code>
   * @param port {int} the URI port, may be <code>null</code>
   * @param path {String} the URI path
   * @param query {String} the URI query, may be <code>null</code>
   * @param fragment {String} the URI fragment, may be <code>null</code>
   * @return {jsx3.net.URI}
   */
  URI.fromParts = function(scheme, userInfo, host, port, path, query, fragment) {
    var uri = URI.jsxclass.bless();
    var a = arguments;
    
    var authorityraw = null, sspraw = null;
    
    // RFC 2396 allows escaped octets to appear in the user-info, path, query, and fragment components.
    if (a.length == 3) {
      uri._scheme = a[0];
      sspraw = URI.encode(a[1], URI.UNRESERVED + URI.RESERVED + URI.ESCAPED);
      uri._ssp = URI.decode(a[1]);
      uri._fragment = URI.decode(a[2]);
    } else if (a.length == 7) {
      uri._scheme = a[0];
      uri._userinfo = URI.decode(a[1]);
      uri._host = a[2];
      uri._port = a[3];
      uri._path = URI.decode(a[4]);
      uri._query = URI.decode(a[5]);
      uri._fragment = URI.decode(a[6]);
    } else {
      throw new jsx3.IllegalArgumentException("arguments", jsx3.Method.argsAsArray(a));
    }    
    
    if (uri._authority == null && uri._host != null) {
      uri._authority = authorityraw = uri._host;
      if (uri._userinfo) {
        uri._authority = uri._userinfo + "@" + uri._authority;
        authorityraw = URI.encode(uri._userinfo, URI.UNRESERVED + URI.PUNCT + URI.ESCAPED) + "@" + authorityraw;
      }
      if (uri._port) {
        uri._authority = uri._authority + ":" + uri._port;
        authorityraw = authorityraw + ":" + uri._port;
      }
    }

    if (uri._ssp == null) {
      uri._ssp = sspraw = "";
      if (uri._path) {
        uri._ssp = uri._path;
        sspraw = URI.encode(uri._path, URI.UNRESERVED + URI.PUNCT + URI.ESCAPED + "/@");
      }
      if (uri._authority != null) {
        uri._ssp = "//" + uri._authority + uri._ssp;
        sspraw = "//" + authorityraw + sspraw;
      }
      if (uri._query) {
        uri._ssp = uri._ssp + "?" + uri._query;
        sspraw = sspraw + "?" + URI.encode(uri._query, URI.UNRESERVED + URI.PUNCT + URI.ESCAPED);
      }
    }

    if (uri._source == null) {
      uri._source = sspraw;
      if (uri._scheme)
        uri._source = uri._scheme + ":" + uri._source;
      if (uri._fragment != null)
        uri._source = uri._source + "#" + URI.encode(uri._fragment, URI.UNRESERVED + URI.RESERVED + URI.ESCAPED);
    }
    
    return uri;
  };
  
  /**
   * Instance initializer.
   * @param strURI {String} uri
   */
  URI_prototype.init = function(strURI) {
    if (strURI == null) strURI = "";
    if (typeof(strURI) != "string") strURI = strURI.toString();
    
    this._source = strURI;
    
    // PARSE [scheme:]scheme-specific-part[#fragment]
    var ssp = strURI;
    var index;
    if (URI._SCHEME_REGEX.test(ssp)) {
      var match = RegExp.lastMatch;
      this._scheme = ssp.substring(0, match.length - 1);
      ssp = ssp.substring(match.length);
    }
    if ((index = ssp.indexOf("#")) >= 0) {
      this._fragment = URI.decode(ssp.substring(index+1));
      ssp = ssp.substring(0, index);
    }
    this._ssp = ssp;
    
    // we know whether it's absolute/relative and opaque/hierarchical
    var bAbsolute = this._scheme != null;
    var bOpaque = bAbsolute && ssp.indexOf("/") != 0;
    
    if (!bOpaque) {
      // PARSE [scheme:][//authority][path][?query][#fragment]
      if (ssp.indexOf("//") == 0) {
        index = ssp.indexOf("/", 2);
        this._authority = ssp.substring(2, index >= 0 ? index : ssp.length);
        ssp = index >= 0 ? ssp.substring(index) : "";
      }
      if ((index = ssp.indexOf("?")) >= 0) {
        this._query = URI.decode(ssp.substring(index+1));
        ssp = ssp.substring(0, index);
      }
      this._path = URI.decode(ssp);
      
      // PARSE [user-info@]host[:port]
      var host = this._authority;
      if (host) {
        if ((index = host.indexOf("@")) >= 0) {
          this._userinfo = URI.decode(host.substring(0, index));
          host = host.substring(index+1);
        }
        if ((index = host.lastIndexOf(":")) >= 0) {
          this._port = parseInt(host.substring(index+1));
          host = host.substring(0, index);
        }
      }
      
      this._host = host;
    }
  };

  /**
   * Normalizes this URI's path.
   * @return {jsx3.net.URI}
   */
  URI_prototype.normalize = function() {
    if (jsx3.util.strEmpty(this._path)) return this;
    
    var tokens = this._path.split("/");
    URI.normalizeTokens(tokens);
    
    var path = tokens.join("/");
    
    return path == this._path ? this :
        URI.fromParts(this._scheme, this._userinfo, this._host, this._port, path, this._query, this._fragment);
  };

  /**
   * @private 
   * @jsxobf-clobber 
   */
  URI.normalizeTokens = function(tokens) {
    var bRel = tokens[0] !== "";

    //  1. All "." segments are removed.
    for (var i = tokens.length -1; i >= 0; i--)
      if (tokens[i] == ".")
        tokens.splice(i, 1);
      
    //  2. If a ".." segment is preceded by a non-".."  segment then both of these segments are removed. 
    //     This step is repeated until it is no longer applicable.
    for (var i = 0; i < tokens.length; i++) {
      if (i > 0 && tokens[i] == ".." && tokens[i-1] != "..") {
        tokens.splice(i-1, 2);
        i -= 2;
      }
    }
    
    //  3. If the path is relative, and if its first segment contains a colon character (':'), then a "." segment is 
    //     prepended. This prevents a relative URI with a path such as "a:b/c/d" from later being re-parsed as an 
    //     opaque URI with a scheme of "a" and a scheme-specific part of "b/c/d".
    if (bRel && tokens[0] != null && tokens[0].indexOf(":") >= 0)
      tokens.unshift(".");
  };
  
  /**
   * Resolves the given URI against this URI.
   *
   * @param uri {String|jsx3.net.URI}
   * @return {jsx3.net.URI}
   */
  URI_prototype.resolve = function(uri) {
    uri = URI.valueOf(uri);

    // efficiency 
    if (this._source == "") return uri;
    
    // I. If the given URI is already absolute, or if this URI is opaque, then the given URI is returned.
    if (uri.isAbsolute() || this.isOpaque()) return uri;
        
    // II. If the given URI's fragment component is defined, its path component is empty, and its scheme, authority, and 
    // query components are undefined, then a URI with the given fragment but with all other components equal to those 
    // of this URI is returned. 
    if (uri._fragment && !uri._path && !uri._scheme && !uri._authority && !uri._query)
      return URI.fromParts(this._scheme, this._userinfo, this._host, this._port, this._path, this._query, uri._fragment);
    
    // 1. A new URI is constructed with this URI's scheme and the given URI's query and fragment components.
    var scheme = this._scheme;
    var query = uri._query;
    var fragment = uri._fragment;
    
    var userInfo = null, host = null, port = null, path = null;
    // 2. If the given URI has an authority component then the new URI's authority and path are taken from the given URI.
    if (uri._authority != null) {
      userInfo = uri._userinfo;
      host = uri._host;
      port = uri._port;
      path = uri._path;
    }
    // 3. Otherwise the new URI's authority component is copied from this URI, and its path is computed as follows:
    else {
      userInfo = this._userinfo;
      host = this._host;
      port = this._port;
      // 1. If the given URI's path is absolute then the new URI's path is taken from the given URI.
      if (uri._path.indexOf("/") == 0) {
        path = uri._path;
      }
      // 2. Otherwise the given URI's path is relative, and so the new URI's path is computed by resolving the path 
      //    of the given URI against the path of this URI. This is done by concatenating all but the last segment of 
      //    this URI's path, if any, with the given URI's path and then normalizing the result as if by invoking the 
      //    normalize method.
      else {
        var tokens = this._path.split("/");
        tokens.pop(); // remove last segment
        tokens.push.apply(tokens, uri._path.split("/"));
        URI.normalizeTokens(tokens);
        path = tokens.join("/");
      }
    }
    
    return URI.fromParts(scheme, userInfo, host, port, path, query, fragment);
  };
  
  /**
   * Relativizes the given URI against this URI.
   * <p/>
   * The returned URI is computed as follows:
   * <ol>
   *  <li>If this URI or <code>uri</code> is opaque, or their schemes are not equal or their authorities are not
   *    equal, <code>uri</code> is returned.</li>
   *  <li>Otherwise, a new URI is constructed with the query and fragment of <code>uri</code> and a path equal to:
   *    <ol>
   *      <li>If the common path prefix of this URI and <code>uri</code> is just <code>""</code> or
   *         <code>"/"</code>, the path of <code>uri</code></li>
   *      <li>Otherwise, the last segment of this path is removed and the path is computed by removing any common
   *         path prefix between the two paths, prepending a ".." for every segment remaining in this path, and
   *         appending the remaining path of <code>uri</code>.</li>
   *    </ol>
   *  </li>
   * </ol>
   *
   * @param uri {String|jsx3.net.URI}
   * @return {jsx3.net.URI}
   */
  URI_prototype.relativize = function(uri) {
    uri = URI.valueOf(uri);
    
    // efficiency 
    if (this._source == "") return uri;
    
    // 1. If either this URI or the given URI are opaque, or if the scheme and authority components of the two URIs 
    //    are not identical, or if the path of this URI is not a prefix of the path of the given URI, then the given URI 
    //    is returned.
    if (this.isOpaque() || uri.isOpaque()) return uri;
    if (this._scheme != uri._scheme) return uri;
    var a1 = this._authority != null ? this._authority : "";
    var a2 = uri._authority != null ? uri._authority : "";
    if (a1 != a2) return uri;

    // 2. Otherwise a new relative hierarchical URI is constructed with query and fragment components taken from the 
    //    given URI and with a path component computed by removing this URI's path from the beginning of the given 
    //    URI's path.
    var thisPath = this._path || "";
    var thatPath = uri._path || "";
    
    var thisTokens = thisPath.split("/");
    thisTokens.pop();
    var thatTokens = thatPath.split("/");
    var newTokens = [];
    
    var i = 0;
    while (i < thisTokens.length && i < thatTokens.length) {
      if (thisTokens[i] != thatTokens[i]) break;
      i++;
    }

    var newPath = null;

    if (i < 2 && thisPath.indexOf("/") == 0) {
      newPath = thatPath;
    } else {
      for (var j = i; j < thisTokens.length; j++)
        newTokens[newTokens.length] = "..";

      for (var j = i; j < thatTokens.length; j++)
        newTokens[newTokens.length] = thatTokens[j];

      newPath = newTokens.join("/");
    }

    return URI.fromParts(null, null, null, null, newPath, uri._query, uri._fragment);
  };

  /**
   * @return {String}
   */
  URI_prototype.getAuthority = function() {
    return this._authority;
  };

  /**
   * @return {String}
   */
  URI_prototype.getFragment = function() {
    return this._fragment;
  };

  /**
   * @return {String}
   */
  URI_prototype.getHost = function() {
    return this._host;
  };

  /**
   * @return {String}
   */
  URI_prototype.getPath = function() {
    return this._path;
  };

  /**
   * @return {int}
   */
  URI_prototype.getPort = function() {
    return this._port;
  };

  /**
   * @return {String}
   */
  URI_prototype.getQuery = function() {
    return this._query;
  };
  
  /**
   * Searches the query part for the value of a parameter. Parameters are specified as name value pairs delimited by
   * '&amp;' like: <code>name1=value1&amp;name2=value2&amp;...</code> If a parameter is specified without a following '='
   * this method will return boolean <code>true</code>.
   *
   * @param strParam {String}
   * @return {String|boolean}
   */
  URI_prototype.getQueryParam = function(strParam) {
    var query = this._query;
    if (query) {
      var from = 0;
      var nameLength = strParam.length;

      var index = null;      
      while ((index = query.indexOf(strParam, from)) >= 0) {
        if (index == 0 || query.charAt(index-1) == "&") {
          var followingChar = query.charAt(index + nameLength);
          if (followingChar == "&" || jsx3.util.strEmpty(followingChar)) {
            return true;
          } else if (followingChar == "=") {
            var nextIndex = query.indexOf("&", index + nameLength + 1);
            return nextIndex >= 0 ? query.substring(index + nameLength + 1, nextIndex) : 
                query.substring(index + nameLength + 1);
          }
        }
        from = index + nameLength;
      }
    }
    return null;
  };

  /**
   * @return {Object<String, String>}
   */
  URI_prototype.getQueryParams = function() {
    var map = {};
    if (this._query) {
      var tokens = this._query.split("&");
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var equalsIndex = token.indexOf("=");
        if (equalsIndex >= 0) {
          map[token.substring(0, equalsIndex)] = token.substring(equalsIndex + 1);
        } else {
          map[token] = true;
        }
      }
    }
    return map;
  };

  /**
   * @return {String}
   */
  URI_prototype.getScheme = function() {
    return this._scheme;
  };

  /**
   * @return {String}
   */
  URI_prototype.getSchemeSpecificPart = function() {
    return this._ssp;
  };

  /**
   * @return {String}
   */
  URI_prototype.getUserInfo = function() {
    return this._userinfo;
  };

  /**
   * @return {boolean}
   */
  URI_prototype.isAbsolute = function() {
    return this._scheme != null;
  };

  /**
   * @return {boolean}
   */
  URI_prototype.isOpaque = function() {
    return this._scheme != null && this._ssp.indexOf("/") != 0;
  };

  /**
   * @return {boolean}
   */
  URI_prototype.equals = function(obj) {
    if (this === obj) return true;
    if (!(obj instanceof jsx3.net.URI)) return false;

    // For two URIs to be considered equal requires that either both are opaque or both are hierarchical.
    // Their schemes must either both be undefined or else be equal without regard to case. Their fragments must
    // either both be undefined or else be equal.
    var s1 = this._scheme;
    var s2 = obj._scheme;
    if ((s1 == null && s2 != null) || (s1 != null && s2 == null)) return false;
    if (s1 != null && s1.toLowerCase() != s2.toLowerCase()) return false;
    if (this._fragment != obj._fragment) return false;

    // When testing the user-information, path, query, fragment, authority, or scheme-specific parts of two
    // URIs for equality, the raw forms rather than the encoded forms of these components are compared and the
    // hexadecimal digits of escaped octets are compared without regard to case.

    if (this.isOpaque()) {
      // For two opaque URIs to be considered equal, their scheme-specific parts must be equal.
      if (! obj.isOpaque()) return false;
      return this._ssp == obj._ssp;
    } else {
      // For two hierarchical URIs to be considered equal, their paths must be equal and their queries must either
      // both be undefined or else be equal. Their authorities must either both be undefined, or both be registry-based,
      // or both be server-based. If their authorities are defined and are registry-based, then they must be equal.
      // If their authorities are defined and are server-based, then their hosts must be equal without regard to case,
      // their port numbers must be equal, and their user-information components must be equal.
      return this._path == obj._path &&
          this._query == obj._query &&
          this._authority == obj._authority;
    }
  };
  
  /**
   * @return {String}
   */
  URI_prototype.toString = function() {
    return this._source;
  };
  
  /**
   * @param strText {String}
   * @param-private strChars {String} the characters <b>not</b> to escape.
   * @return {String}
   * @package
   */
  URI.encode = function(strText, strChars) {    
    if (strText == null) return null;
    if (strChars == null) strChars = URI.UNRESERVED;

    var regex = new RegExp("^[" + strChars.replace(/(\W)/g, "\\$1") + "]*$");
    if (strText.match(regex)) return strText;
    
    var length = strText.length;
    var encoded = new Array(length);
    
    for (var i = 0; i < length; i++) {
      var chr = strText.charAt(i);
      
      if (strChars.indexOf(chr) < 0) {
        var code = chr.charCodeAt(0);
        
        if (code < 16) {
          encoded[i] = "%" + "0" + code.toString(16).toUpperCase();
        } else if (code < 256) {
          encoded[i] = "%" + code.toString(16).toUpperCase();
        } else {
          encoded[i] = chr;
        }
      } else {
        encoded[i] = chr;
      }
    }
    
    return encoded.join("");    
  };
  
  /** @package */
  URI.decode = function(strText) {
    if (strText == null) return null;
    if (strText.indexOf("%") < 0) return strText;
    
    var length = strText.length;
    var decoded = new Array(length);
    var j = 0;
    
    for (var i = 0; i < strText.length; i++) {
      var chr = strText.charAt(i);
      if (chr == "%") {
        var octet = strText.substring(i+1, i+3);
        if (octet.match(/[^a-fA-F0-9]/)) {
          decoded[j++] = chr;
        } else {
          decoded[j++] = String.fromCharCode(parseInt(octet, 16));
          i += 2;
        }
      } else {
        decoded[j++] = chr;
      }
    }
    
    return decoded.join("");
  };
  
  /**
   * @param strURI {String|jsx3.net.URI}
   * @return {jsx3.net.URI}
   */
  URI.valueOf = function(strURI) {
    if (jsx3.util.strEmpty(strURI)) return URI.EMPTY_URI;
    return strURI instanceof URI ? strURI : new URI(strURI);
  };
  
  /** @private @jsxobf-clobber */
  URI.EMPTY_URI = new URI();
  
});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber  _jsxfxcb _jsxclone

/**
 * Native browser event wrapper.
 *
 * @since 3.1
 */
jsx3.Class.defineClass("jsx3.gui.Event", null, null, function(Event, Event_prototype) {

  // the following are JavaScript native event types
  /** {String} The browser native event type <code>beforeunload</code>.
   * @final @jsxobf-final */
  Event.BEFOREUNLOAD = "beforeunload";
  /** {String} The browser native event type <code>blur</code>.
   * @final @jsxobf-final */
  Event.BLUR = "blur";
  /** {String} The browser native event type <code>change</code>.
   * @final @jsxobf-final */
  Event.CHANGE = "change";
  /** {String} The browser native event type <code>click</code>.
   * @final @jsxobf-final */
  Event.CLICK = "click";
  /** {String} The browser native event type <code>dblclick</code>.
   * @final @jsxobf-final */
  Event.DOUBLECLICK = "dblclick";
  /** {String} The browser native event type <code>error</code>.
   * @final @jsxobf-final */
  Event.ERROR = "error";
  /** {String} The browser native event type <code>focus</code>.
   * @final @jsxobf-final */
  Event.FOCUS = "focus";
  /** {String} The browser native event type <code>keydown</code>.
   * @final @jsxobf-final */
  Event.KEYDOWN = "keydown";
  /** {String} The browser native event type <code>keypress</code>.
   * @final @jsxobf-final */
  Event.KEYPRESS = "keypress";
  /** {String} The browser native event type <code>keyup</code>.
   * @final @jsxobf-final */
  Event.KEYUP = "keyup";
  /** {String} The browser native event type <code>load</code>.
   * @final @jsxobf-final */
  Event.LOAD = "load";
  /** {String} The browser native event type <code>mousedown</code>.
   * @final @jsxobf-final */
  Event.MOUSEDOWN = "mousedown";
  /** {String} The browser native event type <code>mousemove</code>.
   * @final @jsxobf-final */
  Event.MOUSEMOVE = "mousemove";
  /** {String} The browser native event type <code>mouseout</code>.
   * @final @jsxobf-final */
  Event.MOUSEOUT = "mouseout";
  /** {String} The browser native event type <code>mouseover</code>.
   * @final @jsxobf-final */
  Event.MOUSEOVER = "mouseover";
  /** {String} The browser native event type <code>mouseup</code>.
   * @final @jsxobf-final */
  Event.MOUSEUP = "mouseup";
  /** {String} The browser native event type <code>mousewheel</code>.
   * @final @jsxobf-final */
  Event.MOUSEWHEEL = "mousewheel";
  /** {String} The browser native event type <code>unload</code>.
   * @final @jsxobf-final */
  Event.UNLOAD = "unload";
  /** {String} The browser native event type <code>resize</code>.
   * @final @jsxobf-final */
  Event.RESIZE = "resize";

  /** {int} The browser native key code for the Alt key.
   * @final @jsxobf-final */
  Event.KEY_ALT = 18;
  /** {int} The browser native key code for the down arrow key.
   * @final @jsxobf-final */
  Event.KEY_ARROW_DOWN = 40;
  /** {int} The browser native key code for the left arrow key.
   * @final @jsxobf-final */
  Event.KEY_ARROW_LEFT = 37;
  /** {int} The browser native key code for the right arrow key.
   * @final @jsxobf-final */
  Event.KEY_ARROW_RIGHT = 39;
  /** {int} The browser native key code for the up arrow key.
   * @final @jsxobf-final */
  Event.KEY_ARROW_UP = 38;
  /** {int} The browser native key code for the Backspace key.
   * @final @jsxobf-final */
  Event.KEY_BACKSPACE = 8;
  /** {int} The browser native key code for the Ctrl key.
   * @final @jsxobf-final */
  Event.KEY_CONTROL = 17;
  /** {int} The browser native key code for the Delete key.
   * @final @jsxobf-final */
  Event.KEY_DELETE = 46;
  /** {int} The browser native key code for the End key.
   * @final @jsxobf-final */
  Event.KEY_END = 35;
  /** {int} The browser native key code for the Enter key.
   * @final @jsxobf-final */
  Event.KEY_ENTER = 13;
  /** {int} The browser native key code for the Esc key.
   * @final @jsxobf-final */
  Event.KEY_ESCAPE = 27;
  /** {int} The browser native key code for the Home key.
   * @final @jsxobf-final */
  Event.KEY_HOME = 36;
  /** {int} The browser native key code for the Insert key.
   * @final @jsxobf-final */
  Event.KEY_INSERT = 45;
  /** {int} The browser native key code for the Meta key.
   * @final @jsxobf-final */
  Event.KEY_META = 224;
  /** {int} The browser native key code for the Page Down key.
   * @final @jsxobf-final */
  Event.KEY_PAGE_DOWN = 34;
  /** {int} The browser native key code for the Page Up key.
   * @final @jsxobf-final */
  Event.KEY_PAGE_UP = 33;
  /** {int} The browser native key code for the Shift key.
   * @final @jsxobf-final */
  Event.KEY_SHIFT = 16;
  /** {int} The browser native key code for the space bar key.
   * @final @jsxobf-final */
  Event.KEY_SPACE = 32;
  /** {int} The browser native key code for the Tab key.
   * @final @jsxobf-final */
  Event.KEY_TAB = 9;
  /** {int} The browser native key code for the 0 key.
   * @final @jsxobf-final */
  Event.KEY_0 = 48;
  /** {int} The browser native key code for the 9 key.
   * @final @jsxobf-final */
  Event.KEY_9 = 57;
  /** {int} The browser native key code for the A key.
   * @final @jsxobf-final */
  Event.KEY_A = 65;
  /** {int} The browser native key code for the Z key.
   * @final @jsxobf-final */
  Event.KEY_Z = 90;
  /** {int} The browser native key code for the number pad 0 key.
   * @final @jsxobf-final */
  Event.KEY_NP0 = 96;
  /** {int} The browser native key code for the number pad 9 key.
   * @final @jsxobf-final */
  Event.KEY_NP9 = 105;
  /** {int} The browser native key code for the number pad division (/) key.
   * @final @jsxobf-final */
  Event.KEY_NPDIV = 111;
  /** {int} The browser native key code for the number pad multiply (*) key.
   * @final @jsxobf-final */
  Event.KEY_NPMUL = 106;
  /** {int} The browser native key code for the number pad subtract (-) key.
   * @final @jsxobf-final */
  Event.KEY_NPSUB = 109;
  /** {int} The browser native key code for the number pad addition (+) key.
   * @final @jsxobf-final */
  Event.KEY_NPADD = 107;
  /** {int} The browser native key code for the number pad decimal (.) key.
   * @final @jsxobf-final */
  Event.KEY_NPDEC = 110;
  /** {int} The browser native key code for the F1 key.
   * @final @jsxobf-final */
  Event.KEY_F1 = 112;
  /** {int} The browser native key code for the F15 key.
   * @final @jsxobf-final */
  Event.KEY_F15 = 126;

  /** @private @jsxobf-clobber */
  Event._WINDOWS = [];
  /** @private @jsxobf-clobber */
  Event._WINDOW_EVENTS = [];
  /** @private @jsxobf-clobber */
  Event._DISPATCHER = jsx3.util.EventDispatcher.jsxclass.newInnerClass();
  /** @private @jsxobf-clobber */
  Event._SUBSCRIBED = [];

  var Logger = null;

  /** @private @jsxobf-clobber */
  Event._getLog = function() {
    if (Event._LOG == null) {
      if (jsx3.Class.forName("jsx3.util.Logger") != null) {
        Logger = jsx3.util.Logger;
        Event._LOG = Logger.getLogger(Event.jsxclass.getName());
      }
    }
    return Event._LOG;
  };

  /** @package */
  Event._registerWindow = function(objWindow) {
    var log = Event._getLog();
    if (log != null && log.isLoggable(Logger.DEBUG))
      log.debug("registering window " + objWindow.name);

    Event._WINDOWS.push(objWindow);
    Event._WINDOW_EVENTS.push({});
    Event._SUBSCRIBED.push({});

    // TODO: need to add existing listeners to the new window
  };

  /** @package */
  Event._isWindowRegistered = function(objWindow) {
    return jsx3.util.arrIndexOf(Event._WINDOWS, objWindow) >= 0;
  };

  /** @package */
  Event._deregisterWindow = function(objWindow) {
    var index = jsx3.util.arrIndexOf(Event._WINDOWS, objWindow);
    if (index >= 0) {
      var log = Event._getLog();
      if (log != null && log.isLoggable(Logger.DEBUG))
        log.debug("deregistering window " + objWindow.name);

      Event._WINDOWS.splice(index, 1);
      Event._WINDOW_EVENTS.splice(index, 1);
      Event._SUBSCRIBED.splice(index, 1);

      // TODO: need to remove all listeners from window for GC reasons
    } else {
      throw new jsx3.Exception("Window " + objWindow + " not registered.");
    }
  };

  Event._registerWindow(window);

  /**
   * Subscribes an event handler to events of type <code>strEventId</code> that bubble all the way up to the browser window.
   * @param strEventId {String} the event type, e.g. <code>jsx3.gui.Event.CLICK</code>.
   * @param objHandler {object|String|function} if an object, the instance to notify of events (objFunction is required); if a string, the JSX id of the instance to notify of events (objFunction is required), must exist in the same Server; if a function, the function to call to notify of events (objFunction ignored)
   * @param objFunction {function|String} if objHandler is a string or object then the function to call on that instance. either a function or a string that is the name of a method of the instance
   * @see jsx3.util.EventDispatcher#subscribe()
   */
  Event.subscribe = function(strEventId, objHandler, objFunction) {
    Event._DISPATCHER.subscribe(strEventId, objHandler, objFunction);
    var handler = "on" + strEventId;
    var log = Event._getLog();

    if (log != null && log.isLoggable(Logger.DEBUG))
      log.debug("Subscribing to event " + strEventId + ": " + objHandler.toString().substring(0,50).replace(/\s+/g," "));

    //even though other application windows can subscribe to various events, unload and beforeunload are only listened for in the main application window.
    var arrTargetWindows = Event._isMainWindowEvent(strEventId) ? [window] : Event._WINDOWS;
    for (var i = 0; i < arrTargetWindows.length; i++) {
      try {
        var w = arrTargetWindows[i];
        var owner = Event._getHandlerOwner(w, strEventId);

        if (owner.attachEvent && Event._isAttachable(strEventId)) {
          // IE event subscription plays nice with other frameworks
          var wSubs = Event._SUBSCRIBED[i];
          if (! wSubs[strEventId]) {
            if (log != null && log.isLoggable(Logger.DEBUG))
              log.debug("attaching event listener " + strEventId + " to " + owner + ".");

            owner.attachEvent(handler, Event._eventHandler);
            wSubs[strEventId] = true;
          }
        } else if (owner.addEventListener && Event._isListenable(strEventId)) {
          // FX event subscription plays nice with other frameworks
          var wSubs = Event._SUBSCRIBED[i];
          if (! wSubs[strEventId]) {
            if (log != null && log.isLoggable(Logger.DEBUG))
              log.debug("adding event listener " + strEventId + " to " + owner + ".");

            owner.addEventListener(strEventId, Event._eventHandler, false);
            wSubs[strEventId] = true;
          }
        } else {
          // Backup event subscription plays nice-ish with other frameworks
          var wEvents = Event._WINDOW_EVENTS[i];
          if (owner[handler] != Event._eventHandler) {
            if (log != null && log.isLoggable(Logger.DEBUG))
              log.debug("setting event handler " + handler + " on " + owner + ".");

            if (owner[handler] != null)
              wEvents[handler] = owner[handler];
            owner[handler] = Event._eventHandler;
          }
        }
      } catch (e) {
        if (log != null && log.isLoggable(Logger.DEBUG))
          log.debug("error subscribing to event " + strEventId, jsx3.NativeError.wrap(e));
        Event._deregisterWindow(w); i--;
      }
    }
  };


  /* @jsxobf-clobber */
  Event._FOCUSREGS = [];

  /* @jsxobf-clobber */
  Event._focusHandler = function(e) {
    var objEvent = Event.wrap(e);
    var target = objEvent.srcElement();
    var reg = Event._FOCUSREGS.concat(); // defensive copy because handlers may remove themselves

    var log = Event._getLog();

    FOR: for (var i = 0; i < reg.length; i++) {
      var record = reg[i];
      var objHandler = record[0];
      var objParentGUI = record[1];
      var objFunction = record[2];
      var src = target;

      if (objParentGUI.containsHtmlElement) {
        if (objParentGUI.containsHtmlElement(target))
          continue;
      } else {
        while (src != null) {
          if (src == objParentGUI)
            continue FOR;
          src = src.parentNode;
        }
      }

      if (log != null && log.isLoggable(Logger.DEBUG))
        log.debug("_focusHandler  lost focus:" + objParentGUI + " (" + objHandler + ")");

      var edEvt = {target:Event, event:objEvent};
      if (typeof(objFunction) == "function")
        objFunction.call(objHandler, edEvt);
      else
        objHandler[objFunction](edEvt);
    }
  };

  Event.subscribeLoseFocus = function(objHandler, objParentGUI, objFunction) {
    var log = Event._getLog();
    if (log != null && log.isLoggable(Logger.DEBUG))
      log.debug("subscribeLoseFocus " + objHandler + " " + objParentGUI);

    Event._FOCUSREGS.push([objHandler, objParentGUI, objFunction]);
    if (Event._FOCUSREGS.length == 1) {
      var objDoc = objParentGUI.ownerDocument || objParentGUI.getDocument();
      if (log != null && log.isLoggable(Logger.DEBUG))
        log.debug("... adding event listener to " + objDoc);
      objDoc.addEventListener("focus", Event._focusHandler, true);
    }
  };

  Event.unsubscribeLoseFocus = function(objHandler) {
    var log = Event._getLog();
    if (log != null && log.isLoggable(Logger.DEBUG))
      log.debug("unsubscribeLoseFocus " + objHandler);

    var objDoc = null;
    for (var i = 0; i < Event._FOCUSREGS.length; i++) {
      if (Event._FOCUSREGS[i][0] == objHandler) {
        var objParentGUI = Event._FOCUSREGS[i][1];
        objDoc = objParentGUI.ownerDocument || objParentGUI.getDocument();
        Event._FOCUSREGS.splice(i--, 1);
      }
    }
    if (Event._FOCUSREGS.length == 0 && objDoc != null) {
      if (log != null && log.isLoggable(Logger.DEBUG))
        log.debug("... removing event listener from " + objDoc);
      objDoc.removeEventListener("focus", Event._focusHandler, true);
    }
  };

  Event.preventSelection = function(objDocument) {
  };


  /**
   * Unsubscribes an event handler from events of type <code>strEventId</code> that bubble all the way up to the browser window.
   * @param strEventId {String} the event type, e.g. <code>jsx3.gui.Event.CLICK</code>.
   *
   * @see jsx3.util.EventDispatcher#unsubscribe()
   */
  Event.unsubscribe = function(strEventId, objHandler) {
    var log = Event._getLog();
    if (log != null && log.isLoggable(Logger.DEBUG))
      log.debug("Unsubscribing from event " + strEventId + ": " + objHandler.toString().substring(0,50).replace(/\s+/g," "));

    Event._DISPATCHER.unsubscribe(strEventId, objHandler);

    if (Event._DISPATCHER.getSubscriberCount(strEventId) == 0)
      Event._restoreWindowEvent(strEventId);
  };

  /**
   * Unsubscribes all event handlers from a events of type <code>strEventId</code> that bubble all the way up to the browser window. 
   * @param strEventId {String} the event type, e.g. <code>jsx3.gui.Event.CLICK</code>.
   * @see jsx3.util.EventDispatcher#unsubscribeAll()
   */
  Event.unsubscribeAll = function(strEventId) {
    var log = Event._getLog();
    if (log != null && log.isLoggable(Logger.DEBUG))
      log.debug("Unsubscribing all from event " + strEventId + ".");

    Event._DISPATCHER.unsubscribeAll(strEventId);
    Event._restoreWindowEvent(strEventId);
  };

  /**
   * @see jsx3.util.EventDispatcher#publish()
   * @package
   */
  Event.publish = function(objEvent) {
    // QUESTION: should this method end up calling the default window handler (as it will through _publish()) ?
    var objEDEvent = {subject:objEvent.getType(), target:Event, event:objEvent};
    Event._publish(objEDEvent);
  };

  /** @private @jsxobf-clobber */
  Event._publish = function(objEDEvent) {
    var handler = "on" + objEDEvent.subject.toLowerCase();

    var log = Event._getLog();
    if (log != null && log.isLoggable(Logger.TRACE))
      log.trace("Publishing event: " + handler + ".");

    // just publish to the main window ... that will invoke all registered windows anyway
    var wEvents = Event._WINDOW_EVENTS[0];
    if (wEvents[handler] != null)
      wEvents[handler]();

    Event._DISPATCHER.publish(objEDEvent);
  };

  /** @private @jsxobf-clobber */
  Event._eventHandler = function(evt) {
    var e = new Event(evt != null ? evt : window.event);

    var log = Event._getLog();
    if (log != null && log.isLoggable(Logger.TRACE))
      log.trace("Handling event: " + e.getType() + ".");

    if (e.getType() == Event.RESIZE) {
      var w = document.body.offsetWidth,
          h = document.body.offsetHeight;

      if (w === Event._lastResizeW && h === Event._lastResizeH)
        return;

      /* @jsxobf-clobber */
      Event._lastResizeW = w;
      /* @jsxobf-clobber */
      Event._lastResizeH = h;
    }

    var objEDEvent = {subject:e.getType(), target:Event, event:e};
    Event._publish(objEDEvent);

    if (objEDEvent.returnValue)
      return objEDEvent.returnValue;
  };

  /** @private @jsxobf-clobber */
  Event._restoreWindowEvent = function(strEventId) {
    var handler = "on" + strEventId;
    var log = Event._getLog();

    var arrTargetWindows = Event._isMainWindowEvent(strEventId) ? [window] : Event._WINDOWS;
    for (var i = 0; i < arrTargetWindows.length; i++) {
      try {
        var w = arrTargetWindows[i];
        var owner = Event._getHandlerOwner(w, strEventId);

        if (owner.attachEvent && Event._isAttachable(strEventId)) {
          // IE event subscription plays nice with other frameworks
          var wSubs = Event._SUBSCRIBED[i];
          if (wSubs[strEventId]) {
            if (log != null && log.isLoggable(Logger.DEBUG))
              log.debug("detaching event listener " + strEventId + " from " + owner);

            owner.detachEvent(handler, Event._eventHandler);
            wSubs[strEventId] = false;
          }
        } else if (owner.removeEventListener && Event._isListenable(strEventId)) {
          // FX event subscription plays nice with other frameworks
          var wSubs = Event._SUBSCRIBED[i];
          if (wSubs[strEventId]) {
            if (log != null && log.isLoggable(Logger.DEBUG))
              log.debug("removing event listener " + strEventId + " from " + owner + ".");

            owner.removeEventListener(strEventId, Event._eventHandler, false);
            wSubs[strEventId] = false;
          }
        } else {
          var wEvents = Event._WINDOW_EVENTS[i];
          if (log != null && log.isLoggable(Logger.DEBUG))
            log.debug("unsetting event handler " + handler + " on " + owner + ".");

          if (wEvents[handler] != null) {
            owner[handler] = wEvents[handler];
            delete wEvents[handler];
          } else {
            owner[handler] = null;
          }
        }
      } catch (e) {
        if (log != null && log.isLoggable(Logger.DEBUG))
          log.debug("error subscribing to event " + strEventId, jsx3.NativeError.wrap(e));
        Event._deregisterWindow(w); i--;
      }
    }
  };

  /** @private @jsxobf-clobber */
  Event._getHandlerOwner = function(w, strEventId) {
    return (strEventId == Event.BEFOREUNLOAD || strEventId == Event.UNLOAD || strEventId == Event.RESIZE) ?
        w : w.document;
  };

  /** @private @jsxobf-clobber */
  Event._isAttachable = function(strEventId) {
    return strEventId != Event.BEFOREUNLOAD;
  };

  /** @private @jsxobf-clobber */
  Event._isListenable = function(strEventId) {
    return strEventId != Event.BEFOREUNLOAD;
  };

  /** @private @jsxobf-clobber */
  Event._isMainWindowEvent = function(strEventId) {
    //the system only listens for the unload and beforeunload events (by way of subscription via the Event class) on the main app window.
    return strEventId == Event.BEFOREUNLOAD || strEventId == Event.UNLOAD;
  };


  /**
   * Instance initializer.
   * <p/>
   * Internet Explorer: keeps a reference both to the event and a copy of the event's fields so that they can be
   * accessed after the event becomes invalid.
   *
   * @param e {Object} the native browser event object
   * @package
   */
  Event_prototype.init = function(e, bCopy) {
    /* @jsxobf-clobber */
    this._e = e;
    if (bCopy)
      this._clone = jsx3.clone(e);
  };

  Event_prototype.persistEvent = function() {
    if (this._clone == null)
      this._clone = jsx3.clone(this._e);
    this._clone._jsxclone = true;
  };

  /**
   * @package
   */
  Event.wrap = function(objEvent, bCopy) {
    return objEvent instanceof Event ? objEvent : new Event(objEvent, bCopy);
  };

  /**
   * @package
   * @deprecated  Static access to the current event is deprecated and is not guaranteed to work in platforms other
   *    than Internet Explorer.
   */
  Event.getCurrent = function(bCopy) {
    return window.event ? new Event(window.event, bCopy) : null;
  };


  /** @private @jsxobf-clobber */
  Event_prototype._event = function() {
    // FX1.5 throws error
    try {
      if (this._e == null)
        return this._clone;
      else if (this._e.currentTarget != null) // FX2 sets this to null
        return this._e;
    } catch (e) {;}

    this._e = null;
    return this._clone;
  };



  /**
   * Returns a handle to the native browser event object, or the clone of the event.
   * @return {Object} event
   * @private
   */
  Event_prototype.event = function() {
    return this._event();
  };

  /**
   * Returns the type of event, e.g. mousedown, click, etc.
   * @return {String} event type
   */
  Event_prototype.getType = function(){ return this._event().type; };

  /**
   * Returns handle to the HTML element acted upon (click, mousedown, etc).
   * @return {HTMLElement} HTML object
   */
  Event_prototype.srcElement = function(){var e = this._event(); return e.target || e.srcElement;};

  /**
   * Returns handle to the HTML element that was moused over (onmouseover).
   * @return {HTMLElement} HTML object
   */
  Event_prototype.toElement = function(){
    var e = this._event();
   return e.type == "mouseout" ? e.relatedTarget : e.target;
  };

  /**
   * Returns handle to the HTML element that was moused away from (onmouseout).
   * @return {HTMLElement} HTML object
   */
  Event_prototype.fromElement = function(){
    var e = this._event();
   return e.type == "mouseover" ? e.relatedTarget : e.target;
//   return e.relatedTarget;
  };

  Event_prototype.isMouseEvent = function() {
    var type = this.getType() || "";
    return type.indexOf("mouse") == 0 || type == Event.CLICK || type == Event.DOUBLECLICK;
  };

  Event_prototype.isKeyEvent = function() {
    return (this.getType() || "").indexOf("key") == 0;
  };

  /**
   * Sets event capture
   * @param objGUI {HTMLElement} HTML object for which to set event capture
   * @return {int} keycode
   * @package
   */
  Event_prototype.setCapture = function(objGUI){
    //to do??
  };

  /**
   * Releases event capture
   * @param objGUI {HTMLElement} HTML object for which to release event capture
   * @return {int} keycode
   * @package
   */
  Event_prototype.releaseCapture = function(objGUI){
    //to do??
  };

  /**
   * Returns integer representing the key code of the key just pressed/keyed-down.
   * @return {int} keycode
   */
  Event_prototype.keyCode = function(){var e = this._event(); return e.keyCode;};

  /**
   * Returns the clientX property for the event (where it occurred on-screen).
   * @return {int} pixel position
   */
  Event_prototype.clientX = function(){var e = this._event(); return e ? e.clientX : Number.NaN;};

  /**
   * Returns the clientY property for the event (where it occurred on-screen).
   * @return {int} pixel position
   */
  Event_prototype.clientY = function(){var e = this._event(); return e ? e.clientY : Number.NaN;};

  Event_prototype.getOffsetX = function() {
    var el = this._event().target;
    var iX = this._event().clientX;
    return iX - jsx3.html.getRelativePosition(el.ownerDocument.body,el).L;
  };

  Event_prototype.getOffsetY = function() {
    var el = this._event().target;
    var iY = this._event().clientY;
    return iY - jsx3.html.getRelativePosition(el.ownerDocument.body,el).T;
  };

  Event_prototype.getScreenX = function() {return this._event().screenX;};

  Event_prototype.getScreenY = function() {return this._event().screenY;};

  /**
   * Returns the actual position in the browser from the left edge for where the event occurred.
   * @return {int} pixel position
   */
  Event_prototype.getTrueX = function() {return this._event().clientX;};//screenX - window.screenLeft;};

  /**
   * Returns the actual position in the browser from the top edge for where the event occurred.
   * @return {int} pixel position
   */
  Event_prototype.getTrueY = function() {return this._event().clientY;};//.screenY - window.screenTop;};

  Event_prototype.getWheelDelta = function() {
    var wd = -1 * Math.ceil(this._event().detail/3);
    return wd;
  };

  /**
   * Returns <code>true</code> if the shift key was pressed.
   * @return {boolean}
   */
  Event_prototype.shiftKey = function(){var e = this._event(); return e.shiftKey;};

  /**
   * Returns <code>true</code> the ctrl key was pressed.
   * @return {boolean}
   */
  Event_prototype.ctrlKey = function(){var e = this._event(); return e.ctrlKey;};

  /**
   * Returns <code>true</code> if the alt key was pressed.
   * @return {boolean}
   */
  Event_prototype.altKey = function(){var e = this._event(); return e.altKey;};

  Event_prototype.metaKey = function(){var e = this._event(); return e.metaKey;};

  /**
   * Returns <code>true</code> if the enter key was pressed.
   * @return {boolean}
   */
  Event_prototype.enterKey = function(){return this._event().keyCode == Event.KEY_ENTER;};

  /**
   * Returns <code>true</code> if the space bar was pressed.
   * @return {boolean}
   */
  Event_prototype.spaceKey = function(){return this._event().keyCode == Event.KEY_SPACE;};

  /**
   * Returns <code>true</code> if the tab key was pressed.
   * @return {boolean}
   */
  Event_prototype.tabKey = function(){return this._event().keyCode == Event.KEY_TAB;};

  /**
   * Returns true if the right-arrow key was pressed
   * @return {boolean}
   */
  Event_prototype.rightArrow = function(){return this._event().keyCode == Event.KEY_ARROW_RIGHT;};

  /**
   * Returns <code>true</code> if the left-arrow key was pressed.
   * @return {boolean}
   */
  Event_prototype.leftArrow = function(){return this._event().keyCode == Event.KEY_ARROW_LEFT;};

  /**
   * Returns <code>true</code> if the up-arrow key was pressed.
   * @return {boolean}
   */
  Event_prototype.upArrow = function(){return this._event().keyCode == Event.KEY_ARROW_UP;};

  /**
   * Returns <code>true</code> if the down-arrow key was pressed.
   * @return {boolean}
   */
  Event_prototype.downArrow = function(){return this._event().keyCode == Event.KEY_ARROW_DOWN;};

  /**
   * Returns <code>true</code> if the delete key was pressed.
   * @return {boolean}
   */
  Event_prototype.deleteKey = function(){return this._event().keyCode == Event.KEY_DELETE;};

  /**
   * Returns <code>true</code> if the backspace key was pressed.
   * @return {boolean}
   */
  Event_prototype.backspaceKey = function(){return this._event().keyCode == Event.KEY_BACKSPACE;};

  /**
   * Returns <code>true</code> if the insert key was pressed.
   * @return {boolean}
   */
  Event_prototype.insertKey = function(){return this._event().keyCode == Event.KEY_INSERT;};

  /**
   * Returns <code>true</code> if the home key was pressed.
   * @return {boolean}
   */
  Event_prototype.homeKey = function(){return this._event().keyCode == Event.KEY_HOME;};

  /**
   * Returns <code>true</code> if the end key was pressed.
   * @return {boolean}
   */
  Event_prototype.endKey = function(){return this._event().keyCode == Event.KEY_END;};

  /**
   * Returns <code>true</code> if the page-up key was pressed.
   * @return {boolean}
   */
  Event_prototype.pageUpKey = function(){return this._event().keyCode == Event.KEY_PAGE_UP;};

  /**
   * Returns <code>true</code> if the page-down key was pressed.
   * @return {boolean}
   */
  Event_prototype.pageDownKey = function(){return this._event().keyCode == Event.KEY_PAGE_DOWN;};

  /**
   * Returns <code>true</code> if the escape key was pressed.
   * @return {boolean}
   */
  Event_prototype.escapeKey = function(){return this._event().keyCode == Event.KEY_ESCAPE;};


  /**
   * Returns <code>true</code> if the native event object is present (if an event of any type actualy occurred).
   * @return {boolean}
   * @deprecated
   */
  Event_prototype.exists = function(){ return this._event() != null;};


  /**
   * Cancels event bubbling for the event.
   */
  Event_prototype.cancelBubble = function() {
    var e = this._event();
    // HACK: needed for the onmousewheel Fx hack so that each element can cancel bubbling for this type of event
    e._jsxfxcb = true;
    if (! e._jsxclone) e.stopPropagation();
  };

  /**
   * Cancels the return value for the event.
   */
  Event_prototype.cancelReturn = function(){this._event().returnValue = false;};

  Event_prototype.preventDefault = function(){
    var e = this._event();
    if (! e._jsxclone)
      e.preventDefault();
  };

  /**
   * Cancels the key from firing by setting the keyCode to 0 (zero) for the event.
   */
  Event_prototype.cancelKey = function(){
    var e = this._event();
    if (! e._jsxclone) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  Event_prototype.cancelAll = function() {
    this.cancelBubble();
    this.cancelKey();
    this.cancelReturn();
  };

  /**
   * Returns <code>true</code> if the left-mouse-button was clicked.
   * @return {boolean}
   */
  Event_prototype.leftButton = function() {
    var e = this._event();

    // QUESTION: tricky ... leftButton() and ctrlKey() can't both be true. Is this OK?
    if (jsx3.app.Browser.macosx && e.ctrlKey) return false;

    var type = this.getType();
    if (type == Event.MOUSEDOWN || type == Event.MOUSEUP) {
      return e.button == 0;
    } else if (type == Event.CLICK || type == Event.DOUBLECLICK) {
      return e.button == 0;
    }

    return false;
  };

  /**
   * Returns <code>true</code> if the right-mouse-button was clicked.
   * @return {boolean}
   */
  Event_prototype.rightButton = function() {
    var e = this._event();
    var type = this.getType();
    if (type == Event.MOUSEDOWN || type == Event.MOUSEUP)
      return e.button == 2 || (jsx3.app.Browser.macosx && e.ctrlKey);
    else
      return false;
  };

  /**
   * Returns integer designating the mouse button clicked/moused-down/moused-up; 1 (left), 2 (right), and as supported.
   * @return {int}
   */
  Event_prototype.button = function(){var e = this._event(); return e.button;};

  /**
   * Sets the the return value for the event.
   * @param strReturn {String} string message to set on the returnValue for the event
   */
  Event_prototype.setReturn = function(strReturn){this._event().returnValue = strReturn;};

  /**
   * Sets/updates the keycode for the event.
   * @param intKeyCode {int} keycode
   * @package
   */
  Event_prototype.setKeyCode = function(intKeyCode){
    var oldEvent = this._event();

    // transmogrify a user-entered key
    if (oldEvent.charCode == Event.KEY_ENTER) {
      var newEvent = this.getDocument().createEvent("KeyEvents");
      newEvent.initKeyEvent("keypress", true, true, this.getDocument().defaultView,
                            oldEvent.ctrlKey(), oldEvent.altKey(), oldEvent.shiftKey(),
                            /*event.metaKey*/false, 0, intKeyCode);
      //cancel the old and fire the new
      oldEvent.preventDefault();
      oldEvent.target.dispatchEvent(newEvent);
    }
  };

  Event_prototype.isModifierKey = function(){
    var e = this._event();
    return e.keyCode == Event.KEY_SHIFT || e.keyCode == Event.KEY_CONTROL ||
           e.keyCode == Event.KEY_ALT   || e.keyCode == Event.KEY_META;
  };

  Event_prototype.hasModifier = function(bIgnoreShift) {
    return (!bIgnoreShift && this.shiftKey()) || this.ctrlKey() || this.altKey() || this.metaKey();
  };

  /**
   * Whether one of the four arrow keys was pressed.
   * @return {boolean}
   */
  Event_prototype.isArrowKey = function() {
    var kc = this.keyCode();
    return kc >= Event.KEY_ARROW_LEFT && kc <= Event.KEY_ARROW_DOWN;
  };

  /**
   * Whether one of the 15 function keys was pressed.
   * @return {boolean}
   */
  Event_prototype.isFunctionKey = function() {
    var kc = this.keyCode();
    return kc >= Event.KEY_F1 && kc <= Event.KEY_F15;
  };


  Event_prototype.getAttribute = function(strName) {
    return this._event()[strName];
  };

  Event_prototype.setAttribute = function(strName, strValue) {
    this._event()[strName] = strValue;
  };

  Event_prototype.removeAttribute = function(strName) {
    this._event()[strName] = null;
  };

  Event.dispatchMouseEvent = function(objTarget, strType, objParams) {
    var e = document.createEvent("MouseEvent");
    e.initMouseEvent(strType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, objTarget);
    if (objParams)
      for (var f in objParams)
        e[f] = objParams[f];
    objTarget.dispatchEvent(e);
  };

  Event.dispatchKeyEvent = function(objTarget, strType, intKey, bShift, bCtrl, bAlt, objParams) {
    var e = document.createEvent("KeyEvent");
    e.initMouseEvent(strType, true, true, window, 0, 0, 0, 0, 0, false, bCtrl, bAlt, bShift, 0, objTarget);
    e.keyCode = intKey;
    if (objParams)
      for (var f in objParams)
        e[f] = objParams[f];
    objTarget.dispatchEvent(e);
  };


  // HACK: to get onmousewheel to work with Fx
  window.addEventListener("DOMMouseScroll", function(e) {
    var src = e.target || e.srcElement;
    while (src != null && !e._jsxfxcb) {
      if (src.getAttribute) {
        var handler = src.getAttribute("onmousewheel");
        if (handler)
          jsx3.eval.call(src, handler, {event:e});
      }
      src = src.parentNode;
    }
  }, false);


  /**
   * Returns true if this event is a mouseout event and the destination of the roll out is a descendant of objRoot.
   * @param objRoot {HTMLElement}
   * @return {boolean}
   * @package
   */
  Event_prototype.isFakeOut = function(objRoot) {
    if (this.getType() == "mouseout") {
      var dest = this.toElement();
      // BUG: Fx "Permission denied to get property HTMLDivElement.parentNode"
      try {
        while (dest != null) {
          if (dest == objRoot) return true;
          dest = dest.parentNode;
        }
      } catch (e) {
        return false;
      }
    }

    return false;
  };

  /**
   * Returns true if this event is a mouseover event and the origination of the roll over is a descendant of objRoot.
   * @param objRoot {HTMLElement}
   * @return {boolean}
   * @package
   */
  Event_prototype.isFakeOver = function(objRoot) {
    if (this.getType() == "mouseover") {
      var orig = this.fromElement();
      // BUG: preemptive fix for isFakeOut bug
      try {
        while (orig != null) {
          if (orig == objRoot) return true;
          orig = orig.parentNode;
        }
      } catch (e) {
        return false;
      }
    }

    return false;
  };

  Event_prototype.toString = function() {
    var e = this._event();
    if (e == null) return "@jsx3.gui.Event <empty>";

    var fields = [];
    for (var f in e)
      if (typeof(e[f]) != "function")
        fields[fields.length] = f;
    fields.sort();

    var s = ["@jsx3.gui.Event "];
    for (var i=0; i < fields.length; i++)
      s[s.length] = fields[i] + ":" + e[fields[i]] + " ";

    return s.join("");
  };

});

jsx3.gui.Event.subscribe(jsx3.gui.Event.UNLOAD, jsx3.destroy);/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */


/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * @package
 */
jsx3.Class.defineClass('jsx3.app.Browser', null, null, function(Browser, Browser_prototype) {

  /**
   * {String}
   * @package
   * @final @jsxobf-final
   */
  Browser.WIN32 = "win32";

  /**
   * {String}
   * @package
   * @final @jsxobf-final
   */
  Browser.LINUX = "linux";

  /**
   * {String}
   * @package
   * @final @jsxobf-final
   */
  Browser.MACOSX = "macosx";

  /**
   * {String}
   * @package
   * @final @jsxobf-final
   */
  Browser.OTHER = "other";
          
  /**
   * Returns the locale string used by the browser. This string will be formatted in the Java-style <code>ll_CC</code>
   * format where <code>ll</code> is the two lowercase character language code and <code>CC</code> is the two
   * uppercase character country code.
   * @return {String}
   * @since 3.2
   */
  Browser.getLocaleString = function() {
    var nativeValue = window.navigator.language;
    var tokens = nativeValue.split(/[_-]/);
    if (tokens.length > 0) {
      tokens[0] = tokens[0].toLowerCase();
      if (tokens.length > 1) {
        tokens[1] = tokens[1].toUpperCase();
      }
    }
    return tokens.join("_");
  };

  /**
   * Returns whether moving a table will cause the browser to crash.
   * @return {boolean}
   */
  Browser.isTableMoveBroken = function(w) {
    //[3.2] firefox won't crash, but the screen repaint is too taxing and therefore would be better if not shown until a better solution is found
    return true;
  };

  /** @private @jsxobf-clobber */
  Browser._STYLE_CACHE = null;

  Browser.getStyleClass = function(strName) {

    if (Browser._STYLE_CACHE == null) {
      var bc = {};

      // GI-545: Firefox throws an exception with cross domain CSS, including when file:// accesses a URL higher up
      for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        try {
          for (var j = 0; j < sheet.cssRules.length; j++) {
            var style = sheet.cssRules[j];
            bc[style.selectorText] = style.style;
          }
        } catch (e) {}
      }

      Browser._STYLE_CACHE = bc;
    }

    return Browser._STYLE_CACHE[strName];
  };

  Browser.getLocation = function() {
    if (Browser._LOC_URI == null)
      /* @jsxobf-clobber */
      Browser._LOC_URI = new jsx3.net.URI(window.location.href);
    return Browser._LOC_URI;
  };
  
  Browser.getSystem = function() {
    if (Browser._SYSTEM == null) {
      var np = navigator.platform;
      var ua = navigator.userAgent;
      var sys = Browser.OTHER;
      
      if (np.indexOf("Win") == 0)
        sys = Browser.WIN32;
      else if (np.indexOf("Linux") == 0)
        sys = Browser.LINUX;
      else if (ua.indexOf("Mac OS X") != -1)
        sys = Browser.MACOSX;
      
      /* @jsxobf-clobber */
      Browser._SYSTEM = sys;
    }
    return Browser._SYSTEM;
  };

  Browser[Browser.getSystem()] = true;

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber  _jsxtodo

/**
 * An object oriented interface onto the XML system settings format. Note that this class has no ability to save
 * preferences to disk or other medium. However, the source XML data is returned by calling <code>getNode()</code>
 * with no parameters. 
 *
 * @since 3.0
 */
jsx3.Class.defineClass("jsx3.app.Settings", null, null, function(Settings, Settings_prototype) {
    
  /**
   * The instance initializer. Creates a view onto the settings persisted on disk. All identical instances of this
   * class are backed by the same XML source document.
   *
   * @param objXML {jsx3.xml.Document} the underlying XML datasource. 
   */
  Settings_prototype.init = function(objXML) {
    /* @jsxobf-clobber-shared */
    this._doc = objXML || jsx3.xml.CDF.newDocument();
    /* @jsxobf-clobber-shared */
    this._root = this._doc.getRootNode();
  };

  /**
   * Returns a stored setting value.
   * @param strKey {String...} the setting key.
   * @return {String|Number|boolean|Array|Object} the stored value.
   */
  Settings_prototype.get = function(strKey) {
    var value = this._getCachedValue(arguments);
    if (typeof(value) == "undefined") {
      var node = this.getNode.apply(this, arguments);
      if (node == null) return Settings.UNDEF;
      value = Settings._getRecordValue(node);
      this._cacheValue(value, arguments);
    }
    return value;
  };
  
  /**
   * Returns a stored setting value as the raw XML node.
   * @param strKey {String...} the setting key.
   * @return {jsx3.xml.Entity}
   */
  Settings_prototype.getNode = function(strKey) {
    var node = this._root;
    
    var query = "/data";
    for (var i = 0; node && i < arguments.length; i++) {
      query += "/record[@jsxid='" + arguments[i] + "']";
    }
    
    return node.selectSingleNode(query);
  };

  /**
   * Caches a value retrieved from the XML source. If this settings is read from and never written to eventually the
   * entire source will exist in memory as a nested object.
   * @param objValue {Object}
   * @param arrPath {Array<String>}
   * @private 
   * @jsxobf-clobber 
   */
  Settings_prototype._cacheValue = function(objValue, arrPath) {
    if (arrPath.length == 0) {
      /* @jsxobf-clobber */
      this._cache = objValue;
    } else {
      if (!this._cache) this._cache = {_jsxtodo:true};
      var node = this._cache;
      for (var i = 0; i < arrPath.length - 1; i++) {
        var path = arrPath[i];
        if (node[path] == null) {
          node[path] = {_jsxtodo:true};
        }
        node = node[path];
      }
      node[arrPath[arrPath.length-1]] = objValue;
    }
  };
  
  /**
   * Retrieves a cached value.
   * @param arrPath {Array<String>}
   * @return {Object|undefined}
   * @private 
   * @jsxobf-clobber 
   */
  Settings_prototype._getCachedValue = function(arrPath) {
    var node = this._cache;
    for (var i = 0; node && i < arrPath.length; i++) {
      node = node[arrPath[i]];
    }
    return (node && node._jsxtodo) ? Settings.UNDEF : node;
  };
  
  /**
   * Resets the cache. This method should be called any time this settings is written to.
   * @private
   * @jsxobf-clobber 
   */
  Settings_prototype._resetCache = function() {
    delete this._cache;
  };
  
  /** @private @jsxobf-clobber */
  Settings._VALUE_GETTERS = {
    array: function(record) {
      var i = record.selectNodeIterator("./record");
      var a = [];
      while (i.hasNext()) {
        var x = i.next();
        var getter = Settings._VALUE_GETTERS[x.getAttribute("type")];
        a[a.length] = getter ? getter(x) : x.getValue();
      }
      return a;
    },
    map: function(record) {
      var i = record.selectNodeIterator("./record");
      var o = {};
      while (i.hasNext()) {
        var x = i.next();
        var getter = Settings._VALUE_GETTERS[x.getAttribute("type")];
        o[x.getAttribute('jsxid')] = getter ? getter(x) : x.getValue();
      }
      return o;
    },
    "number": function(record) { return Number(record.getValue()); },
    "boolean": function(record) { return record.getValue() === "true"; },
    "null": function(record) { return null; },
    "string": function(record) { return record.getValue(); },
    "eval": function(record) {
      try {
        return jsx3.eval(record.getValue());
      } catch (e) {
        return null;
      } 
    }
  };

  /**
   * @private
   * @jsxobf-clobber
   */
  Settings._getRecordValue = function(record) {
    var type = record.getNodeName() == "data" ? "map" : record.getAttribute("type");
    var getter = Settings._VALUE_GETTERS[type];
    return getter ? getter(record) : record.getValue();
  };

  /**
   * Sets a stored setting value.
   * @param strKey {String...}
   * @param value {String|Number|boolean|Array|Object} the value to store, map be string, number, boolean,
   *   array, or object (map)
   * @since 3.6
   */
  Settings_prototype.set = function(strKey, value) {
    var node = this._root;
    for (var i = 0; i < arguments.length - 2; i++) {
      var child = node.selectSingleNode("./record[@jsxid='" + arguments[i] + "']");

      if (child && child.getAttribute('type') != 'map') {
        node.removeChild(child);
        child = null;
      }

      if (! child) {
        child = node.createNode(jsx3.xml.Entity.TYPEELEMENT, "record");
        child.setAttribute("jsxid", arguments[i]);
        child.setAttribute("type", 'map');
        node.appendChild(child);
      }
      node = child;
    }

    Settings._setRecord(node, arguments[arguments.length - 2], arguments[arguments.length - 1]);
    this._resetCache();
  };

  /**
   * Removes a stored setting value.
   * @param strKey {String...}
   * @since 3.6
   */
  Settings_prototype.remove = function(strKey) {
    var parent = null;
    var node = this._root;

    for (var i = 0; node && i < arguments.length; i++) {
      parent = node;
      node = node.selectSingleNode("./record[@jsxid='" + arguments[i] + "']");
    }

    if (node && parent) {
      parent.removeChild(node);
      this._resetCache();
    }
  };
  
  /**
   * @private
   * @jsxobf-clobber
   */
  Settings._setRecord = function(parent, strKey, value) {
    var record = Settings._getOrCreateRecord(strKey, parent);
    record.removeChildren();
    var type = typeof(value);

    if (value == null || type == "undefined") {
      record.setAttribute("type", "null");
      record.setValue(null);
    } else if (type == "string" || type == "number") {
      record.setAttribute("type", type);
      record.setValue(value);
    } else if (type == "boolean") {
      record.setAttribute("type", "boolean");
      record.setValue(value ? "true" : "false");
    } else if (type == "object") {
      if (jsx3.$A.is(value)) {
        record.setAttribute("type", "array");
        for (var i = 0; i < value.length; i++) {
          Settings._setRecord(record, i.toString(), value[i]);
        }
      } else {
        record.setAttribute("type", "map");
        for (var f in value) {
          Settings._setRecord(record, f, value[f]);
        }
      }
    } else if (type == "function") {
      ;
    } else {
      jsx3.ERROR.doLog("idPR02", "Cannot persist object of type " + type, 5);
    }
  };
  
  /**
   * @private
   * @jsxobf-clobber
   */
  Settings._getOrCreateRecord = function(strKey, parent) {
    var node = parent.selectSingleNode("./record[@jsxid='" + strKey + "']");
    if (!node) {
      node = parent.createNode(jsx3.xml.Entity.TYPEELEMENT, "record");
      node.setAttribute("jsxid", strKey);
      parent.appendChild(node);
    }
    return node;
  };
  
});


/**
 * @deprecated  Renamed to jsx3.app.Settings
 * @see jsx3.app.Settings
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.Settings", -, null, function(){});
 */
jsx3.Settings = jsx3.app.Settings;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _EP _PERM _jsxselectionns _jsxselectionnsobj serializeNamespacesMap

/**
 * Wrapper of the native browser XML node class. This class provides methods for querying, traversing, and creating
 * XML entities.
 * <p/>
 * This class is never instantiated by the developer, rather instances are returned from various methods in this
 * class and the <code>jsx3.xml.Document</code> class.
 * <p/>
 * Note that several methods of this class fail quietly when an error occurs with the wrapped native browser XML
 * classes. Methods that are documented as failing quietly should always be followed by a call to
 * <code>hasError()</code> to ensure that no error has occurred.
 */
jsx3.Class.defineClass("jsx3.xml.Entity", null, null, function(Entity, Entity_prototype) {

  /**
   * {int} The node type for an element node.
   * @final @jsxobf-final
   */
  Entity.TYPEELEMENT = 1;

  /**
   * {int} The node type for an attribute node. 
   * @final @jsxobf-final
   */
  Entity.TYPEATTRIBUTE = 2;

  /**
   * {int} The node type for a text node.
   * @final @jsxobf-final
   */
  Entity.TYPETEXT = 3;

  /**
   * {int} The node type for a character data node.
   * @final @jsxobf-final
   */
  Entity.TYPECDATA = 4;

  /**
   * {int} The node type for a comment node.
   * @final @jsxobf-final
   */
  Entity.TYPECOMMENT = 8;

  /* @jsxobf-clobber */
  Entity._SUPPORTED = {1:true, 2:true, 3:true, 4:true, 7:true, 8:true};

  /**
   * The instance initializer. If an error occurs while instantiating this entity, this method sets the error
   * property of this entity and returns quietly.
   *
   * @param objEntity {Object} the browser native entity instance to wrap.
   */
  Entity_prototype.init = function(objEntity) {
    //bind reference to the MSXML parser node that this classes APIs will wrap
    /* @jsxobf-clobber */
    this._entity = objEntity;

    //for now only types 1 - 4 are supported
    /* @jsxobf-clobber */
    this._nodeType = objEntity.nodeType;

    //check the type of entity - if not valid modify the error object
    if (!(Entity._SUPPORTED[this._nodeType])) {
      this.setError(300, jsx3._msg("xml.wrap_type", this._nodeType));
    } else if (this._error) {
      this.setError(0);
    }
  };

  /**
   * Creates a new node and returns as jsx3.xml.Entity instance
   * @param intType {int} Four types are supported: jsx3.xml.Entity.TYPEELEMENT, jsx3.xml.Entity.TYPEATTRIBUTE, jsx3.xml.Entity.TYPETEXT, jsx3.xml.Entity.TYPECDATA. Note: only nodes of TYPEELEMENT and TYPEATTRIBUTE will pay attention to the @strNodeName property; if not of this TYPE, pass an empty string
   * @param strNodeName {String} node name for the node to add as a child
   * @param strNS {String} namespace URI for the node being created, if it is preceded by a URI.
   *            So, for example, if 'strName' is "xsi:string", then the 'strNS'
   *            value should be the namespace associated with the xsi prefix
   * @return {jsx3.xml.Entity} reference to the new node wrapped in a jsx3.xml.Entity instance
   */
  Entity_prototype.createNode = function(intType, strNodeName, strNS) {
    //get handle to the document object (this has the ability to create nodes)
    var objDoc = this._getNativeDoc();
    var objNode = null;

    // NOTE: see http://bugs.webkit.org/show_bug.cgi?id=14835
    if (strNS == null || strNS == "") strNS = null;
    if (intType == 2) {
      objNode = objDoc.createAttributeNS(strNS, strNodeName);
    } else if (intType == 3) {
      objNode = objDoc.createTextNode(strNodeName);
    } else if (intType == 4) {
      objNode = objDoc.createCDATASection(strNodeName);
    } else if (intType == 8) {
      objNode = objDoc.createComment(strNodeName);
    } else {
      objNode = objDoc.createElementNS(strNS, strNodeName);
    }

    //return wrapped node
    return new Entity(objNode);
  };

  /**
   * Creates a new node that is an exact clone of this node. If an error occurs while
   * cloning this XML entity, this method sets the error property of this entity and returns quietly.
   *
   * @param bDeep {boolean} if true, all descendants of this object will also be cloned and returned
   * @return {jsx3.xml.Entity} newly cloned MSXML Node object wrapped in a jsx3.xml.Entity instance
   */
  Entity_prototype.cloneNode = function(bDeep) {
    //make sure our wrapped node isn't null and user is passing the correct object type
    if (this._nodeType == 1) {
      var objMSXMLNode = this._entity.cloneNode(bDeep);
      return (new Entity(objMSXMLNode));
    } else {
      this.setError(301, jsx3._msg("xml.clone_tp", this._nodeType));
    }
  };

  /**
   * Appends the <code>objEntity</code> parameter as a child of this entity. If an error occurs while
   * appending to this XML entity, this method sets the error property of this entity and returns quietly.
   *
   * @param objEntity {jsx3.xml.Entity} jsx3.xml.Entity instance that will be bound as a child to this jsx3.xml.Entity instance
   * @return {jsx3.xml.Entity} reference to self
   */
  Entity_prototype.appendChild = function(objEntity) {
    var e = objEntity._entity;
    var docChange = e.ownerDocument != this._entity.ownerDocument;
    if (docChange) e = this._entity.ownerDocument.importNode(e, true);

    //make sure our wrapped node isn't null and user is passing the correct object type
    if (this._entity != null && e != null && this._nodeType == 1) {
      this._entity.appendChild(e);

      if (docChange && objEntity._entity.parentNode)
        objEntity._entity.parentNode.removeChild(objEntity._entity);
      objEntity._entity = e;
    } else {
      this.setError(302, jsx3._msg("xml.err_append", objEntity));
    }
    return this;
  };

  /**
   * inserts the jsx3.xml.Entity instance, @objEntityNew immediately before the existing child @objEntityRef and returns a handle to @objEntityNew; requires that both parameters be of type jsx3.xml.Entity.TYPEELEMENT; requires that this object also be of TYPEELEMENT; returns null if all conditions are not met
   * @param objEntityNew {jsx3.xml.Entity} jsx3.xml.Entity object (the new one to add)
   * @param objEntityRef {jsx3.xml.Entity} jsx3.xml.Entity object (the reference node in front of which to insert the new node)
   * @return {jsx3.xml.Entity} jsx3.xml.Entity instance or null
   */
  Entity_prototype.insertBefore = function(objEntityNew, objEntityRef) {
    if (objEntityRef == null) {
      if (this._nodeType == 1) {
        this.appendChild(objEntityNew);
        return objEntityNew;
      }
    } else {
      var e = objEntityNew._entity;
      var docChange = e.ownerDocument != this._entity.ownerDocument;
      if (docChange) e = this._entity.ownerDocument.importNode(e, true);

      if (this._nodeType == 1 && objEntityRef._nodeType != 2 && objEntityNew._nodeType != 2) {
        if (objEntityRef.getParent() != null && objEntityRef.getParent().equals(this)) {
          var retVal = (new Entity(this._entity.insertBefore(e, objEntityRef._entity)));

          if (docChange && objEntityNew._entity.parentNode) {
            objEntityNew._entity.parentNode.removeChild(objEntityNew._entity);
          }
          objEntityNew._entity = e;

          return retVal;
        }
      }
      return null;
    }
  };

  /**
   * Replaces a child element of this element, <code>objEntityOld</code> with another element, <code>objEntityNew</code> 
   * and returns <code>objEntityOld</code>. Both children must be XML element nodes. <code>objEntityOld</code> must
   * be an existing child node of this node. 
   * 
   * @param objEntityNew {jsx3.xml.Entity} the element to add.
   * @param objEntityOld {jsx3.xml.Entity} the child element to replace.
   * @return {jsx3.xml.Entity} the replaced element or <code>null</code> if the replacement did not occur because one
   *    or more of the parameters was invalid. 
   */
  Entity_prototype.replaceNode = function(objEntityNew, objEntityOld) {
    var e = objEntityNew._entity;
    var docChange = e.ownerDocument != this._entity.ownerDocument;
    if (docChange) e = this._entity.ownerDocument.importNode(e, true);

    if (this._nodeType == 1 && objEntityOld._nodeType == 1 && objEntityNew._nodeType == 1 && 
          this.equals(objEntityOld.getParent())) {
      var retVal = (new Entity(this._entity.replaceChild(e, objEntityOld._entity)));

      if (docChange && objEntityNew._entity.parentNode)
        objEntityNew._entity.parentNode.removeChild(objEntityNew._entity);
      objEntityNew._entity = e;

      return retVal;
    }
    
    return null;
  };

  /**
   * Sets the @strValue of the named @strAttribute and binds as child of this
   * @param strName {String} name of the attribute
   * @param strValue {String} value of the attribute, if null then remove the attribute
   * @return {jsx3.xml.Entity} reference to this
   */
  Entity_prototype.setAttribute = function(strName, strValue) {
    //make sure our wrapped node isn't null and user is passing the correct object type
    if (strValue != null)
      // HACK: IE's XML conversion to String is incompatible with JavaScript, so explicit String conversion
      this._entity.setAttribute(strName, String(strValue));
    else
      this.removeAttribute(strName);
    return this;
  };

  /**
   * Returns the value for the named attribute <code>strName</code>.
   * @param strName {String} the name of the attribute.
   * @return {String} the attribute value or <code>null</code> if the attribute does not exist.
   */
  Entity_prototype.getAttribute = function(strName) {
    //return as simple string; no need to wrap
    return this._entity ? this._entity.getAttribute(strName) : null;
  };

  /**
   * Returns an object reference (a jsx3.xml.Entity instance) to the child attribute with the name, @strName.
   * This method should only be called on an instance of type <code>TYPEELEMENT</code>.
   *
   * @param strName {String} name of the attribute
   * @return {jsx3.xml.Entity} jsx3.xml.Entity instance referencing a single attribute node object
   */
  Entity_prototype.getAttributeNode = function(strName) {
    //make sure our wrapped node isn't null and user is passing the correct object type
    if (this._entity != null && this._nodeType == 1) {
      var objAtt = this._entity.getAttributeNode(strName);
      if (objAtt != null) return (new Entity(objAtt));
    }
  };

  /**
   * Sets the attribute object as a child of the element; if transferring an attribute from one element to another, this call must be preceded with removeAttributeNode on the previous owner
   * @param objAtt {jsx3.xml.Entity} jsx3.xml.Entity instance of type jsx3.xml.Entity.TYPEATTRIBUTE;
   * @return {jsx3.xml.Entity} reference to this
   */
  Entity_prototype.setAttributeNode = function(objAtt) {
    var e = objAtt._entity;

     var docChange = e.ownerDocument != this._entity.ownerDocument;
    if (docChange) {
      e = this._entity.ownerDocument.createAttribute(e.nodeName);
      e.nodeValue = objAtt._entity.nodeValue;
      objAtt._entity = e;
    }

    this._entity.setAttributeNodeNS(e);
    return this;
  };

  /**
   * Returns handle to a jsx3.util.List instance of all children; note that this collection will always be empty (length = 0) for all types except for jsx3.xml.Entity.TYPEELEMENT
   * @return {jsx3.util.List<jsx3.xml.Entity>}
   * @see #getAttributeNames()
   */
  Entity_prototype.getAttributes = function() {
    //make sure our wrapped node isn't null and user is passing the correct object type
    if (this._entity != null && this._nodeType == 1)
      return new Entity.List(this._entity.attributes);
    else
      return null;
  };

  /**
   * Returns the names of all the attributes of this node. Iterating over the attribute names is more performant than
   * using the <code>getAttributes()</code> method.
   * @return {Array<String>}
   * @see #getAttributes()
   * @since 3.4
   */
  Entity_prototype.getAttributeNames = function() {
    var att = this._entity.attributes;
    var names = new Array(att.length);
    for (var i = 0; i < names.length; i++)
      names[i] = att[i].nodeName;
    return names;
  };

  /**
   * Returns reference to the document element (root) wrapped in jsx3.xml.Entity instance
   * @return {jsx3.xml.Entity} jsx3.xml.Entity instance
   */
  Entity_prototype.getRootNode = function() {
    return this._entity ? (new Entity(this._getNativeDoc(1))) : null;
  };

  /**
   * Returns the parent node of the context node. If the context node is the root node of the document, null is returned.
   * @return {jsx3.xml.Entity} parent node or null
   */
  Entity_prototype.getParent = function() {
    //return the parent ref; return null if na
    return (this._entity != this._getNativeDoc(1)) ? (new Entity(this._entity.parentNode)) : null;
  };

  /**
   * Returns an iterator that iterates over the child nodes of this node. Note that the iterator grants access to
   * only one child node at a time; once <code>next()</code> is called, the value returned by the previous call to
   * <code>next()</code> is no longer valid. This method is more performant than <code>getChildNodes()</code>.
   * <p/>
   * Note also that the iterator is a pointer into the children node list so removing or adding children to this node
   * while iterating may cause unexpected behavior.
   *
   * @param bIncludeText {boolean} if <code>true</code> then the returned iterator will include the child text nodes
   *   of this node.
   * @return {jsx3.util.Iterator<jsx3.xml.Entity>}
   * @see #getChildNodes()
   * @since 3.4
   */
  Entity_prototype.getChildIterator = function(bIncludeText) {
    return new Entity.ChildIterator(this._entity ? this._entity.childNodes : [], bIncludeText);
  };

  /**
   * Returns the child nodes of this entity. By default this method only returns the child nodes that are elements.
   * Text and CDATA children will be returned if <code>bIncludeText</code> is <code>true</code>.
   *
   * @param bIncludeText {boolean} if <code>true</code>, text and cdata children are returned with element children.
   * @return {jsx3.util.List<jsx3.xml.Entity>}
   * @see #getChildIterator()
   */
  Entity_prototype.getChildNodes = function(bIncludeText) {
    if (! this._entity) return new Entity.List([]);
    var nodes = this._entity.childNodes;
    var children = [];
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType == 1 ||
          (bIncludeText && (node.nodeType == 3 || node.nodeType == 4)))
        children[children.length] = node;
    }
    return new Entity.List(children);
  };

  /**
   * Removes the specified child (@objChildEntity) from the list of children and returns it; returns null if @objChildEntity is not actually a child
   * @param objChildEntity {jsx3.xml.Entity} jsx3.xml.Entity object that is a direct child of this jsx3.xml.Entity instance
   * @return {jsx3.xml.Entity} jsx3.xml.Entity instance or null
   */
  Entity_prototype.removeChild = function(objChildEntity) {
    //make sure acutal parent according to native relationships
    var p = objChildEntity.getParent();
    return p != null && p.equals(this) ?
        new Entity(this._entity.removeChild(objChildEntity._entity)) : null;
  };

  /**
   * Removes all descendant entities of this node
   */
  Entity_prototype.removeChildren = function() {
    var children = this._entity.childNodes;
    for (var i = children.length - 1; i >= 0; i--) {
      this._entity.removeChild(children[i]);
    }
  };

  /**
   * Removes the specified attribute by the given name (can only be called for nodes of type jsx3.xml.Entity.TYPELEMENT)
   * @param strAttName {String} the name of the attribute to remove
   */
  Entity_prototype.removeAttribute = function(strAttName) {
    //make sure acutal parent according to native relationships
    if (this._nodeType == 1) this._entity.removeAttribute(strAttName);
  };

  /**
   * removes the attribute object as a child of the element;
   * @param objAtt {jsx3.xml.Entity} jsx3.xml.Entity instance of type jsx3.xml.Entity.TYPEATTRIBUTE;
   * @return {jsx3.xml.Entity} reference to this
   */
  Entity_prototype.removeAttributeNode = function(objAtt) {
    this._entity.removeAttributeNode(objAtt._entity);
    return this;
  };

  /**
   * Tests the equivalency of two jsx3.xml.Entity instances as they wrap and can therefore point to the same native entity, causing a standard "==" comparison to fail
   * @param objEntity {jsx3.xml.Entity} jsx3.xml.Entity object
   * @return {boolean} true or false
   */
  Entity_prototype.equals = function(objEntity) {
    //make sure acutal parent according to native relationships
    return objEntity != null && objEntity._entity == this._entity;
  };

  /**
   * Returns one of: jsx3.xml.Entity.TYPEELEMENT, jsx3.xml.Entity.TYPEATTRIBUTE, jsx3.xml.Entity.TYPETEXT, jsx3.xml.Entity.TYPECDATA
   * @return {int}
   */
  Entity_prototype.getNodeType = function() {
    //nodeType was set at instantiation and can be referenced as a property on this JS class directly
    return this._nodeType;
  };

  /**
   * Returns the name of the node as string (assuming this jsx3.xml.Entity instance is of type jsx3.xml.Entity.TYPEELEMENT or jsx3.xml.Entity.TYPEATTRIBUTE). The other TYPES return "#cdata-section" and "#text" respectively
   * @return {String}
   */
  Entity_prototype.getNodeName = function() {
    return this._entity.nodeName;
  };

  /**
   * Returns the value (as string) for URI (universal resource identifier) of the namespace for the given node; returns an empty string if no namespace exists
   * @return {String}
   */
  Entity_prototype.getNamespaceURI = function() {
    //return as simple string; no need to wrap
    //TO DO: there seeems to be an inconsistency with the signature in firefox (bugzilla). make sure an empty string is returned
    var sns = this._entity.namespaceURI;
    if(sns == null) sns = "";
    return sns;
  };

  /**
   * Returns a single node selected by an XPath query executed on this node, or <code>null</code> if none is selected.
   * <p/>
   * Note that the XPath query is executed in the context of this node so relative paths are relative to this node.
   * However, this node may be nested in a larger XML document, in which case absolute paths are relative to the
   * root document of this node. This behavior matches the XPath specification.
   *
   * @param strQuery {String} an XPath query such as: <code>//somenode[@id='12']/somechild</code>.
   * @param strNS {String|Object} the selection namespace to use just for this query. This parameter is an optional
   *    shortcut for calling <code>setSelectionNamespaces()</code> on the owning document. The format of this parameter
   *    as a string is <code>"xmlns:ns1='uri1' xmlns:ns2='uri2'"</code> or as an object is <code>{'uri1':'ns1',
   *    'uri2':'ns2'}</code>.
   * @return {jsx3.xml.Entity} jsx3.xml.Entity instance or null
   */
  Entity_prototype.selectSingleNode = function(strQuery, strNS) {
    if (! this._entity) return null;
    return this._selectNodeOrNodes(strQuery, strNS, 0);
  };

  /**
   * Returns a list of nodes selected by an XPath query executed on this node.
   *
   * @param strQuery {String} an XPath query such as: <code>//somenode[@id='12']/somechild</code>.
   * @param strNS {String|Object} the selection namespace to use just for this query. This parameter is an optional
   *    shortcut for calling <code>setSelectionNamespaces()</code> on the owning document. The format of this parameter
   *    as a string is <code>"xmlns:ns1='uri1' xmlns:ns2='uri2'"</code> or as an object is <code>{'uri1':'ns1',
   *    'uri2':'ns2'}</code>.
   * @return {jsx3.util.List<jsx3.xml.Entity>}
   * @see #selectNodeIterator()
   * @see #selectSingleNode()  See selectSingleNode() for more information
   */
  Entity_prototype.selectNodes = function(strQuery, strNS) {
    if (! this._entity) return new Entity.List([]);
    return this._selectNodeOrNodes(strQuery, strNS, 1);
  };

  /**
   * Returns an iterator that iterates over the the result of an XPath query. Note that the iterator grants access to
   * only one child node at a time; once <code>next()</code> is called, the value returned by the previous call to
   * <code>next()</code> is no longer valid. This method is more performant than <code>selectNodes()</code>.
   *
   * @param strQuery {String} an XPath query such as: <code>//somenode[@id='12']/somechild</code>.
   * @param strNS {String|Object} the selection namespace to use just for this query. This parameter is an optional
   *    shortcut for calling <code>setSelectionNamespaces()</code> on the owning document. The format of this parameter
   *    as a string is <code>"xmlns:ns1='uri1' xmlns:ns2='uri2'"</code> or as an object is <code>{'uri1':'ns1',
   *    'uri2':'ns2'}</code>.
   * @return {jsx3.util.Iterator<jsx3.xml.Entity>}
   * @see #selectNodes()
   * @since 3.4
   */
  Entity_prototype.selectNodeIterator = function(strQuery, strNS) {
    if (! this._entity) return new Entity.SelectIterator();
    return this._selectNodeOrNodes(strQuery, strNS, 2);
  };


  Entity_prototype.getBaseName = function() {
    //return as simple string; no need to wrap
    var strNodeName = this.getNodeName();
    var index = strNodeName.indexOf(":");
    return index >= 0 ? strNodeName.substring(index+1) : strNodeName;
  };

  Entity_prototype.getPrefix = function() {
    //return as simple string; no need to wrap
    var strNodeName = this.getNodeName();
    var index = strNodeName.indexOf(":");
    return index >= 0 ? strNodeName.substring(0, index) : "";
  };

  Entity_prototype.getXML = function() {
    return this.toString();
  };

  Entity_prototype.toString = function() {
    var typeToken = "@" + this.getClass().getName();

    if (this._entity != null && !this.hasError()) {
      if (this.getNodeType() == 2) {
        return this.getNodeName() + '="' + this.getValue() + '"';
      } else {
        return (new XMLSerializer()).serializeToString(this._entity);
      }
    } else {
      return this.hasError() ?
          jsx3._msg("xml.str_err", typeToken, this.getError()) :
          jsx3._msg("xml.str_empty", typeToken);
    }
  };

  Entity_prototype.getValue = function() {
    if (this._nodeType == 1) {
      var tokens = new Array(this._entity.childNodes.length);
      for (var i = 0; i < this._entity.childNodes.length; i++) {
        var child = this._entity.childNodes[i];
        if (child.nodeType == Entity.TYPETEXT || child.nodeType == Entity.TYPECDATA)
          tokens[i] = child.nodeValue;
        else
          tokens[i] = child.textContent;
      }
      return tokens.join("");
    } else {
      return this._entity.nodeValue;
    }
  };

  Entity_prototype.setValue = function(strValue) {
    if (strValue == null) strValue = "";
    if (this._nodeType == 1) {
      this.removeChildren();
      this.appendChild(this.createNode(3, strValue));
    } else {
      this._entity.nodeValue = strValue;
    }
    return this;
  };

  /* @jsxobf-clobber */
  Entity._XPE = new XPathEvaluator();
  /* @jsxobf-clobber */
  Entity._RESULT_TYPES = [XPathResult.FIRST_ORDERED_NODE_TYPE,
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE];

  /* @jsxobf-clobber */
  Entity_prototype._selectNodeOrNodes = function(strQuery, strNS, intMode) {
    if (typeof(strNS) == "object") strNS = jsx3.xml.Document.serializeNamespacesMap(strNS);

    var doc = this._entity.ownerDocument;
    var root = doc.documentElement;
    var nsResolver = strNS ? Entity._createNSResolver(strNS, root) :
        (Entity._getDocNSResolver(doc) || Entity._XPE.createNSResolver(root));

    var objResult = null;
    try {
      objResult = Entity._XPE.evaluate(strQuery, this._entity, nsResolver, Entity._RESULT_TYPES[intMode], null);
    } catch (e) {
      ; // QUESTION: what if this is a real error?
    }

    if (intMode == 1) {
      var itm = null;
      var objNodes = [];
      if (objResult)
        while (itm = objResult.iterateNext()) objNodes[objNodes.length] = itm;

      return new Entity.List(objNodes);
    } else if (intMode == 2) {
      return new Entity.SelectIterator(objResult);
    } else {
      return objResult && objResult.singleNodeValue ? new Entity(objResult.singleNodeValue) : null;
    }
  };

  /* @jsxobf-clobber */
  Entity._getDocNSResolver = function(doc) {
    if (! doc._jsxselectionnsobj) {
      if (doc._jsxselectionns)
        doc._jsxselectionnsobj = Entity._createNSResolver(doc._jsxselectionns);
    }
    return doc._jsxselectionnsobj;
  };

  /* @jsxobf-clobber */
  Entity._nsResCache = {}; // TODO: limit the size of this cache

  /* @jsxobf-clobber */
  Entity._createNSResolver = function(ns) {
    var resolver = Entity._nsResCache[ns];
    if (!resolver) {
      var nsDoc = (new DOMParser()).parseFromString('<foo ' + ns + '/>', "text/xml");
      resolver = Entity._nsResCache[ns] = Entity._XPE.createNSResolver(nsDoc.documentElement);
    }
    return resolver;
  };


  /** @private @jsxobf-clobber */
  Entity_prototype._getNativeDoc = function(intType) {
    if (intType == null) {
      return this._entity.ownerDocument;
    } else if (intType == 1) {
      var doc = this._entity.ownerDocument;
      return doc != null ? doc.documentElement : null;
    } else if (intType == 2) {
      return this._entity.documentElement;
    }
  };

  /**
   * Returns the native browser XML node wrapped by this entity.
   * @return {Object}
   */
  Entity_prototype.getNative = function() {
    //returns the entire MSXML instance
    return this._entity;
  };

  /**
   * Returns the first child element of type jsx3.xml.Entity.TYPEELEMENT; requires that this object also be of TYPEELEMENT; returns null if both conditions are not met
   * @return {jsx3.xml.Entity} jsx3.xml.Entity instance or null
   */
  Entity_prototype.getFirstChild = function() {
    if (this._nodeType == 1) {
      var objNode = this._entity.firstChild;

      // only return elements
      while (objNode != null && objNode.nodeType != 1)
        objNode = objNode.nextSibling;

      if (objNode != null) return (new Entity(objNode));
    }
    return null;
  };

  /**
   * Returns the last child element of type jsx3.xml.Entity.TYPEELEMENT; requires that this object also be of TYPEELEMENT; returns null if both conditions are not met
   * @return {jsx3.xml.Entity} jsx3.xml.Entity instance or null
   */
  Entity_prototype.getLastChild = function() {
    if (this._nodeType == 1) {
      var objNode = this._entity.lastChild;

      // only return elements
      while (objNode != null && objNode.nodeType != 1)
        objNode = objNode.previousSibling;

      if (objNode != null) return (new Entity(objNode));
    }
    return null;
  };

  /**
   * Returns the previous sibling if this node and the referenced sibling are of type jsx3.xml.Entity.TYPEELEMENT; returns null if condition is not met
   * @return {jsx3.xml.Entity} jsx3.xml.Entity instance or null
   */
  Entity_prototype.getPreviousSibling = function() {
    if (this._nodeType == 1) {
      var objNode = this._entity.previousSibling;

      // only return elements
      while (objNode != null && objNode.nodeType != 1)
        objNode = objNode.previousSibling;

      if (objNode != null) return (new Entity(objNode));
    }
    return null;
  };

  /**
   * Returns the next sibling if this node and the referenced sibling are of type jsx3.xml.Entity.TYPEELEMENT; returns null if condition is not met
   * @return {jsx3.xml.Entity} jsx3.xml.Entity instance or null
   */
  Entity_prototype.getNextSibling = function() {
    if (this._nodeType == 1) {
      var objNode = this._entity.nextSibling;

      // only return elements
      while (objNode != null && objNode.nodeType != 1)
        objNode = objNode.nextSibling;

      if (objNode != null) return (new Entity(objNode));
    }
    return null;
  };

  /**
   * performs an XSLT transformation, using @objEntityFilter as the XSLT filter for the transformation; returns
   *          results of the transformation as a string (of text/html/xml/etc)
   * @param objEntityFilter {jsx3.xml.Entity} jsx3.xml.Entity instance containing the XSLT document to transform 'this' jsx3.xml.Entity instance with
   * @param objParams {Object<String, String>} JavaScript object array of name/value pairs; if passed, the transformation will use a
   *          paramaterized stylesheet to perform the transformation
   * @param bObject {boolean} if <code>true</code> this method returns a document instead of a string.
   * @return {String|jsx3.xml.Document} the result of the transformation
   */
  Entity_prototype.transformNode = function(objEntityFilter, objParams, bObject) {
    jsx3.require("jsx3.xml.Template");
    var t = new jsx3.xml.Template(objEntityFilter);
    if (objParams) t.setParams(objParams);
    return t[bObject ? "transformToObject" : "transform"](this);
  };

  /** @private @jsxobf-clobber */
  Entity._Error = function() {};
  Entity._Error.prototype.toString = function() {
    return "[" + this.code + "]" + (typeof(this.description) != "undefined" ? " " + this.description : "");
  };

  /**
   * Used internally by the system to communicate errors that the developer can query for more-specific information when a given method returns null and the developer wants more specific information
   * @param strCode {String} unique id for the error
   * @param strDescription {String} description associated with @strCode
   * @private
   * @jsxobf-clobber-shared
   */
  Entity_prototype.setError = function(strCode, strDescription) {
    if (this._error == null) {
      /* @jsxobf-clobber */
      this._error = new Entity._Error();
    }
    this._error.code = strCode;
    this._error.description = strDescription;
  };

  /**
   * Returns an error object (a plain JavaScript object) with two properties that the developer can query for:
   * <ul>
   * <li>code &#8211; an integer error code, 0 for no error.</li>
   * <li>description &#8211; a text description of the error that occurred.</li>
   * </ul>
   * @return {Object}
   */
  Entity_prototype.getError = function() {
    if (!this._error) this.setError(0);
    return this._error;
  };

  /**
   * Returns <code>true</code> if the last operation on this XML entity caused an error.
   * @return {boolean}
   */
  Entity_prototype.hasError = function() {
    return this._error != null && this._error.code != 0;
  };

  /**
   * Returns the document that owns this entity.
   * @return {jsx3.xml.Document}
   */
  Entity_prototype.getOwnerDocument = function() {
    return this._entity ? new jsx3.xml.Document(this._getNativeDoc()) : null;
  };


  /**
   * Returns the release/build for the class (i.e., "2.2.00")
   * @return {String}
   * @deprecated
   */
  Entity.getVersion = function() {
    return "3.0.0";
  };


});


/**
 * @deprecated  Renamed to jsx3.xml.Entity
 * @see jsx3.xml.Entity
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.Entity", -, null, function(){});
 */
jsx3.Entity = jsx3.xml.Entity;


/**
 * @private
 */
jsx3.Class.defineClass("jsx3.xml.Entity.List", jsx3.util.List, null, function(List, List_prototype) {

  var Exception = jsx3.Exception;

  List_prototype.init = function(arrSrc) {
    this.jsxsuper(null, true);
    /* @jsxobf-clobber-shared */
    this._src = arrSrc; // some node lists are not instanceof Array
  };

  List_prototype.get = function(intIndex) {
    var o = this._src[intIndex];
    return o != null ? new jsx3.xml.Entity(o) : o;
  };

  var exMessage = "Not implemented";
  List_prototype.add = function() { throw new Exception(exMessage); };
  List_prototype.addAll = function() { throw new Exception(exMessage); };
  List_prototype.set = function() { throw new Exception(exMessage); };
  List_prototype.remove = function() { throw new Exception(exMessage); };
  List_prototype.removeAt = function() { throw new Exception(exMessage); };
  List_prototype.sort = function() { throw new Exception(exMessage); };

  List_prototype.slice = function(intStart, intEnd) {
    return new List(arguments.length > 1 ? this._src.slice(intStart, intEnd) : this._src.slice(intStart));
  };

  List_prototype.toString = function() {
    return "[" + this.toArray() + "]";
  };

  List_prototype.clone = function() {
    return new List(this._src.concat());
  };

  List_prototype.toArray = function() {
    var size = this.size();
    var a = new Array(size);
    for (var i = 0; i < size; i++)
      a[i] = this.get(i);
    return a;
  };

});

// @jsxobf-clobber  _nodes _index _text _prepNext _entity

/**
 * @private
 */
jsx3.Class.defineClass("jsx3.xml.Entity.ChildIterator", null, [jsx3.util.Iterator], function(Iterator, Iterator_prototype) {

  Iterator_prototype.init = function(arrChildren, bText) {
    this._nodes = arrChildren;
    this._index = 0;
    this._text = bText;
    this._prepNext();
    this._entity = null;
  };

  Iterator_prototype.next = function() {
    if (!this._next) return null;

    if (this._entity) {
      this._entity.init(this._next);
    } else {
      this._entity = new jsx3.xml.Entity(this._next);
    }
    this._prepNext();
    return this._entity;
  };

  Iterator_prototype.hasNext = function() {
    return this._next != null;
  };

  Iterator_prototype._prepNext = function() {
    this._next = null;
    var nodes = this._nodes;
    var max = nodes.length;
    while (this._next == null && this._index < max) {
      var node = nodes[this._index];
      if (node.nodeType == 1 || (this._text && (node.nodeType == 3 || node.nodeType == 4)))
        this._next = node;
      this._index++;
    }
  };

});

// @jsxobf-clobber  _i _n _entity

/**
 * @private
 */
jsx3.Class.defineClass("jsx3.xml.Entity.SelectIterator", null, [jsx3.util.Iterator], function(Iterator, Iterator_prototype) {

  Iterator_prototype.init = function(i) {
    this._i = i;
    this._n = 0;
    this._entity = null;
  };


  Iterator_prototype.next = function() {
    var next = this._i.snapshotItem(this._n++);
    if (!next) return null;
    
    if (this._entity) {
      this._entity.init(next);
    } else {
      this._entity = new jsx3.xml.Entity(next);
    }

    return this._entity;
  };

  Iterator_prototype.hasNext = function() {
    return this._i && this._n < this._i.snapshotLength;
  };


});


/**
 * @deprecated  Subsumed by <code>jsx3.util.List</code>.
 * @see jsx3.util.List
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.Collection", -, null, function(){});
 */
jsx3.Collection = jsx3.xml.Entity.List;

/**
 * @deprecated  Subsumed by <code>jsx3.util.List</code>.
 * @see jsx3.util.List
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.util.Collection", -, null, function(){});
 */
jsx3.util.Collection = jsx3.Collection;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _initFromReq

/**
 * A generic wrapper to hide the complexities and API-specifics of the native XMLHTTP control for a given browser.
 * Developers wishing to create/modify XML documents can use this class to access common XMLHTTP methods.
 * <p/>
 * Note that when using this interface to post xml content to a server, the called server may expect the content
 * type to be set for the posting.  For example,
 * <code>objRequest.setRequestHeader("Content-Type", "text/xml");</code>
 */
jsx3.Class.defineClass("jsx3.net.Request", null, [jsx3.util.EventDispatcher], function(Request, Request_prototype) {

  /**
   * {int}
   * @package
   * @final @jsxobf-final
   */
  Request.STATUS_OK = 200;

  /**
   * {int}
   * @package
   * @final @jsxobf-final
   */
  Request.STATUS_ERROR = 400;

  /**
   * {String} Event type published when the response has loaded.
   * @final @jsxobf-final
   */
  Request.EVENT_ON_RESPONSE = "response";

  /**
   * {String} Event type published when the server has not responded after the specified timeout period.
   * @final @jsxobf-final
   */
  Request.EVENT_ON_TIMEOUT = "timeout";

  /** @private @jsxobf-clobber */
  Request.trackArray = {};

  /**
   * The instance initializer.
   * @param id {String} <span style="text-decoration:line-through;">If the call will be asynchronous, assigns a unique identifier.</span>
   *    <b>Using this deprecated parameter will cause memory to leak. Don't use it.</b>
   */
  Request_prototype.init = function(id) {
    if (id != null)
      Request.trackArray[id] = this;

    try {
      this._request = new XMLHttpRequest();
    } catch (e) {
      throw new jsx3.Exception(jsx3._msg("req_inst"), jsx3.NativeError.wrap(e));
    }
  };

  /**
   * Aborts the request.
   * @return {jsx3.net.Request} this object.
   */
  Request_prototype.abort = function() {
    if (this._timeoutto) {
      window.clearTimeout(this._timeoutto);
      delete this._timeoutto;
    }

    this._request.onreadystatechange = new Function();

    //call the native abotr
    this._request.abort();
    return this;
  };
  
  /** @private @jsxobf-clobber */
  Request_prototype._getNativeAttr = function(attr, type, arg1) {
    try {
      return type == 1 ? this._request[attr]() :
             type == 2 ? this._request[attr](arg1) :
                         this._request[attr];
    } catch (e) {
      this._status = 13030; // From Firefox documentation
      return null;
    }
  };

  /**
   * Gets the value of all the HTTP headers.
   * @return {String}
   */
  Request_prototype.getAllResponseHeaders = function() {
    return this._getNativeAttr("getAllResponseHeaders", 1);
  };

  /**
   * Gets the value of a specific HTTP response header.
   * @param strName {String} the name for the response header to retrieve.
   * @return {String}
   */
  Request_prototype.getResponseHeader = function(strName) {
    return this._getNativeAttr("getResponseHeader", 2, strName);
  };

  /**
   * Gets the HTTP response line status (e.g. "OK").
   * @return {String}
   */
  Request_prototype.getStatusText = function() {
    return this._getNativeAttr("statusText");
  };

  /**
   * Gets the HTTP response status code (e.g. 200, 404, 500, etc). The following code checks for a request error 
   * condition.
   * <pre>
   * r.send();
   * 
   * if (r.getStatus() &gt;= 200 &amp;&amp; r.getStatus() &lt; 400) {
   *   jsx3.log("success");
   * } else {
   *   jsx3.log("failed with status " + r.getStatus());
   * }
   * </pre>
   * <p/>
   * The native object that this <code>Request</code> wraps may have a status code that is not a valid HTTP code 
   * (200-599). This is especially true if an HTTP server was not involved in the request like, for example, if
   * the resource was loaded from the <code>file:///</code> scheme or if a network error occurred while contacting the
   * HTTP server. Moreover, the various supported browsers may have different status values for the same conditions. 
   * <p/>
   * This method attempts to constrain the possible status values that it returns. So, instead of returning 0 
   * (usually a success on the <code>file:////</code> scheme), it returns 200. When running in Safari certain  
   * status values known to be error conditions are returned as 400. If the native object's status is greater than 
   * 599 then this method makes no attempt to convert it. Such values should probably be interpreted as error 
   * conditions. When in doubt consult the documentation for the host browser. 
   * 
   * @return {int}
   */
  Request_prototype.getStatus = function() {
    var s = this._status;
    if (s == null)
      s = this._getNativeAttr("status");

    
    return s == 0 ? Request.STATUS_OK : s;
  };

  /**
   * Gets the content of the response as string.
   * @return {String}
   */
  Request_prototype.getResponseText = function() {
    return this._request.responseText;
  };

  /**
   * Gets the content of the response as an XML document. If the response is not a valid XML document,
   * <code>null</code> is returned.
   * @return {jsx3.xml.Document}
   */
  Request_prototype.getResponseXML = function() {
    var objDoc = new jsx3.xml.Document();
    objDoc._initFromReq(this);

    if (!objDoc.hasError()) {
      return objDoc;
    } else {
      Request._log(2, jsx3._msg("req.bad_xml", this._url, objDoc.getError()));
      return null;
    }
  };

  /**
   * @return {XMLHttpRequest}
   * @deprecated
   */
  Request_prototype.getNative = function() {
    return this._request;
  };

  /**
   * Sets the value of a specific HTTP request header. The <code>open()</code> method should be called before calling
   * this method.
   * @param strName {String} the name for the request header to send to the server with the request content.
   * @param strValue {String} the value for the request header to send to the server with the request content.
   * @return {jsx3.net.Request} this object.
   */
  Request_prototype.setRequestHeader = function(strName, strValue) {
    this._request.setRequestHeader(strName, String(strValue));
    return this;
  };


  /**
   * Gets the ready state for the request; return values include:
   *          0) The object has been created, but not initialized (the open method has not been called).
   *          1) The object has been created, but the send method has not been called.
   *          2) The send method has been called, but the status and headers are not yet available.
   *          3) Some data has been received. Calling the responseBody and responseText properties at this state to obtain partial results will return an error, because status and response headers are not fully available.
   *          4) All the data has been received, and the complete data is available via the getResponseText()/getResponseXML() methods
   * @return {int}
   * @deprecated  This method is not consistent between browsers. Use the event publisher interface instead to track
   *    the state of the request.
   */
  Request_prototype.getReadyState = function() {
    //get handle to the XMLHTTP object associated with the SOAPSocket instance
    return this._request.readyState;
  };


  /**
   * Creates and opens a request object. This is a factory method that creates the proper subclass of
   * <code>Request</code> based on the scheme of <code>strURL</code>.
   *
   * @param strMethod
   * @param strURL
   * @param bAsync
   * @param strUser
   * @param strPass
   *
   * @since 3.7
   * @see #addSchemeHandler()
   */
  Request.open = function(strMethod, strURL, bAsync, strUser, strPass) {
    var url = jsx3.net.URI.valueOf(strURL);


    var scheme = url.getScheme();
    var handler = Request._HANDLERS[scheme] || Request.jsxclass;
    return (handler.newInstance()).open(strMethod, url, bAsync, strUser, strPass);
  };

  Request._HANDLERS = {};

  /**
   * Adds a handler that will field requests to a particular URL scheme.
   * @param scheme {String} the scheme that the handler to handle.
   * @param handler {jsx3.lang.Class} a custom subclass of Request.
   * @since 3.7
   */
  Request.addSchemeHandler = function(scheme, handler) {
    Request._HANDLERS[scheme] = handler;
  };

  /**
   * @param scheme {String}
   * @return {jsx3.lang.Class}
   * @package
   * @since 3.7
   */
  Request.getSchemeHandler = function(scheme) {
    return Request._HANDLERS[scheme];
  };

  /**
   * Initializes the request, and specifies the method, URL, and authentication information for the request.
   * @param strMethod {String} The HTTP method used to open the connection. Valid values include: GET, POST, or PUT.
   * @param strURL {String|jsx3.net.URI} The requested URL. This can be either an absolute URL, such as "http://www.TIBCO.com", or a relative URL, such as "../MyPath/MyFile".
   * @param bAsync {boolean} whether to issue the request asynchronously, if true this class will use the EventDispatcher interface to publish an event on response or timeout.
   * @param strUser {String} The name of the user for authentication. If this parameter is null ("") or missing and the site requires authentication, the native HTTP control will display a logon window.
   * @param strPass {String} The password for authentication. This parameter is ignored if the user parameter is null ("") or missing.
   * @return {jsx3.net.Request} this object.
   */
  Request_prototype.open = function(strMethod, strURL, bAsync, strUser, strPass) {
//    if (!bAsync) {
//      Request._log(3, "Synchronous request to: " + strURL);
////      if (Request._LOG)
////        Request._LOG.logStack(4, "");
//    }

    this._status = 0;

    /* @jsxobf-clobber */
    this._async = Boolean(bAsync);
    /* @jsxobf-clobber */
    this._method = strMethod;
    /* @jsxobf-clobber */
    this._url = jsx3.net.URIResolver.DEFAULT.resolveURI(strURL);

      try {
        if (window.netscape && netscape.security)
          netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
      } catch (e) {
        Request._log(5, jsx3._msg("req.netsc", jsx3.NativeError.wrap(e)));
      }

    //open the request, passing in relevant info and return object ref
    try {
      Request._log(6, jsx3._msg("req.open", this._url));
      this._request.open(strMethod, this._url.toString(), this._async, strUser, strPass);
    } catch (e) {
      this._status = Request.STATUS_ERROR; // communicate failure to client
      Request._log(2, jsx3._msg("req.err_open", strURL, jsx3.NativeError.wrap(e)));
    }

    return this;
  };


  /**
   * Cancels the named request.
   * @param strRequestId {String} named id for the request (assigned by developer when the Request was instanced);
   * @deprecated  Use <code>abort()</code> instead.
   * @see #abort()
   */
  Request.cancelRequest = function(strRequestId) {
    var r = Request.trackArray[strRequestId];
    if (r) r.abort();
  };

  /**
   * Gets the named request instance.
   * @param strRequestId {String} named id for the request (assigned by developer when the Request was instanced);
   * @return {jsx3.net.Request}
   * @deprecated  Static access to pending requests by id is deprecated.
   */
  Request.getRequest = function(strRequestId) {
    return Request.trackArray[strRequestId];
  };


  /**
   * Gets the URL passed when opening this request.
   * @return {String}
   */
  Request_prototype.getURL = function() {
    return this._url && this._url.toString();
  };


  /**
   * Specifies timeout settings for resolving the domain name, establishing the connection to the server, sending the data, and receiving the response. The timeout parameters of the setTimeouts method are specified in milliseconds, so a value of 1000 would represent 1 second. A value of zero represents an infinite timeout. There are four separate timeout parameters: resolveTimeout, connectTimeout, sendTimeout, and receiveTimeout. When calling the setTimeouts method, all four values must be specified. The timeouts are applied at the Winsock layer.
   * @param intResolveTimeout {int} The value is applied to mapping host names (such as "www.microsoft.com") to IP addresses; the default value is infinite, meaning no timeout.
   * @param intConnectTimeout {int} The value is applied to establishing a communication socket with the target server, with a default timeout value of 60 seconds.
   * @param intSendTimeout {int} The value applies to sending an individual packet of request data (if any) on the communication socket to the target server. A large request sent to a server will normally be broken up into multiple packets; the send timeout applies to sending each packet individually. The default value is 5 minutes.
   * @param intReceiveTimeout {int} The value applies to receiving a packet of response data from the target server. Large responses will be broken up into multiple packets; the receive timeout applies to fetching each packet of data off the socket. The default value is 60 minutes.
   * @return {jsx3.net.Request} this instance.
   * @deprecated  IE only.
   */
  Request_prototype.setTimeouts = function(intResolveTimeout,intConnectTimeout,intSendTimeout,intReceiveTimeout) {
    return this;
  };


  /**
   * Sends the request.
   * @param strContent {String} The content to send for a POST request.
   * @param intTimeout {int}  the number milliseconds to wait before publishing a timeout event. This only applies
   *    to asynchronous requests. If used, subscribe to the <code>jsx3.net.Request.EVENT_ON_TIMEOUT</code> event to
   *    be notified of a timeout.
   * @return {jsx3.net.Request} this object.
   */
  Request_prototype.send = function(strContent, intTimeout) {
    if (this._status == Request.STATUS_ERROR)
      throw new jsx3.Exception(jsx3._msg("req.err_state"));


    var bError = false;

    try {
// Sync XHR may cause timeouts to fire in IE6, IE7, Firefox 3.0 (fixed in 3.1)
// https://bugzilla.mozilla.org/show_bug.cgi?id=340345
      if (!this._async) Request.INSYNC = true;

      this._request.send(strContent);

      if (this._async)
        /* @jsxobf-clobber */
        this._status = 0;
      else
        delete this._status;

    } catch (e) {
      // TODO: communicate failure to client
      this._status = Request.STATUS_ERROR; // Firefox seems to still report status as 0 when error on local file access.
      Request._log(2, jsx3._msg("req.err_send", this._url, jsx3.NativeError.wrap(e)));
      bError = this;
    } finally {
      Request.INSYNC = false;
    }

    // if this async, add the request object to the array of
    if (this._async) {
      if (bError || this._request.readyState == 4) {
        // If async, events should always be published asynchronously.
        jsx3.sleep(function() {
          this.publish({subject:Request.EVENT_ON_RESPONSE});
        }, null, this);
      } else {
        var me = this;
        this._request.onreadystatechange = function() {
          if (me._request.readyState == 4) {
            
            // In Firefox (and IE?) a synchronous request causes all queued asynchronous requests to return synchronously
            // This causes all sorts of problems. So here we check and make sure that the async requests still 
            // return asynchronously even if forced to return by a sync request.
            if (Request.INSYNC) {
              jsx3.sleep(function() {
                me._onReadyStateChange();                
              });
            } else {
              me._onReadyStateChange();              
            }
          }
        };

        if (!isNaN(intTimeout) && intTimeout > 0) {
          //set timeout to fire if the response doesn't happen in time
          this._timeoutto = window.setTimeout(function() {
            me._onTimeout();
          }, intTimeout);
        }
      }
    }

    return this;
  };

  /** @private @jsxobf-clobber */
  Request_prototype._onTimeout = function() {
    delete this._timeoutto;
    this.abort();
    this._status = 408; // request timeout
    this.publish({subject:Request.EVENT_ON_TIMEOUT});
  };

  /** @private @jsxobf-clobber */
  Request_prototype._onReadyStateChange = function() {
    delete this._status;

    if (this._timeoutto) {
      window.clearTimeout(this._timeoutto);
      delete this._timeoutto;
    }

    this._request.onreadystatechange = new Function();
    this.getStatusText(); // will throw a caught exception if network error

    this.publish({subject:Request.EVENT_ON_RESPONSE});
  };

  Request_prototype.toString = function() {
    return this.jsxsuper() + " " + this._method + " " + this.getStatus() + " " + this._url;
  };

  /** @private @jsxobf-clobber */
  Request._log = function(intLevel, strMessage) {
    if (Request._LOG == null) {
      if (jsx3.util.Logger) {
        /* @jsxobf-clobber */
        Request._LOG = jsx3.util.Logger.getLogger(Request.jsxclass.getName());
        if (Request._LOG == null) return;
      } else {
        return;
      }
    }
    Request._LOG.log(intLevel, strMessage);
  };


  /**
   * gets the release/build for the class (i.e., "3.0.00")
   * @return {String}
   * @deprecated
   */
  Request.getVersion = function() {
    return "3.00.00";
  };


});



/**
 * @deprecated  Renamed to jsx3.net.Request
 * @see jsx3.net.Request
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.HttpRequest", -, null, function(){});
 */
jsx3.HttpRequest = jsx3.net.Request;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  setError _jsxselectionns _jsxselectionnsobj
// @jsxobf-clobber  _document _jsx_sn_hash

/**
 * Wrapper of the native browser XML document class. Developers wishing to create/modify XML documents should use
 * this class to access common XML parser methods (adding attributes and nodes, transformations, etc).
 * <p/>
 * When querying an instance of this class (with e.g. <code>selectSingleNode</code>, <code>selectNodes</code>,
 * <code>getChildNodes</code>, etc.), the node context will always be the root node (documentElement) and
 * <b>not</b> the parser instance (ownerDocument). Therefore, all queries are assumed to begin at the root, meaning
 * querying an instance of this class for the root node (assuming its name is "Price") would require a query such
 * as <code>"."</code> or <code>"/Price"</code>, not <code>"Price"</code>.
 * <p/>
 * Note that several methods of this class fail quietly when an error occurs with the wrapped native browser XML
 * classes. Methods that are documented as failing quietly should always be followed by a call to
 * <code>hasError()</code> to ensure that no error has occurred.
 *
 * @see #hasError()
 */
jsx3.Class.defineClass("jsx3.xml.Document", jsx3.xml.Entity, [jsx3.util.EventDispatcher], function(Document, Document_prototype) {

  var Entity = jsx3.xml.Entity;

  /**
   * {String} Event type published when an asynchronous load operation has completed successfully.
   * @final @jsxobf-final
   */
  Document.ON_RESPONSE = "response";

  /**
   * {String} Event type published when an error occurs during the asynchronous loading of a document.
   * @final @jsxobf-final
   */
  Document.ON_ERROR = "error";

  /**
   * {String} Event type published when an asynchronous load times out before loading.
   * @final @jsxobf-final
   */
  Document.ON_TIMEOUT = "timeout";

  /**
   * {String} Namespace to use when querying against the namespace axis in firefox
   * @final
   */
  Document.SEARCHABLE_NAMESPACE = "http://xsd.tns.tibco.com/gi/cxf/2006";

  /**
   * {String} Prefix to use when querying against the namespace axis in firefox
   * @final @jsxobf-final
   */
  Document.SEARCHABLE_PREFIX = "jsx_xmlns";

  /* @jsxobf-clobber */
  Document.SEARCHABLE_REGEXP = /xmlns:([^=]*)=['"]([^"^']*)['"]/g;


  /**
   * The instance initializer. If an error occurs while instantiating the native browser XML document class,
   * this method sets the error property of this document and returns quietly.
   * @param-package objDoc {Object|jsx3.xml.Entity} if an <code>Entity</code> then clone the node as a new document.
   *     Otherwise, the native browser document object (optional).
   */
  Document_prototype.init = function(objDoc) {
    var bEnt = objDoc instanceof Entity;
    if (!objDoc || bEnt) {
      try {
        //TODO: need to see if Safari has a setting or call to use here that won't create a document that defaults to the xhtml namespace (or the namespace of the browser document)
        this._document = window.document.implementation.createDocument("", "", null);
      } catch (e) {
        this.setError(101, jsx3._msg("xml.parser", jsx3.NativeError.wrap(e)));
        delete this._document;
      }

      if (objDoc) {
        this._document.appendChild(objDoc.getNative().cloneNode(true));
        this.jsxsuper(this._document.documentElement);
      }
    } else {
      this._document = objDoc;
      this.jsxsuper(objDoc.documentElement);
    }
  };

  /**
   * Loads an XML document at the URL specified by the <code>strURL</code> parameter. If an error occurs while
   * loading the XML document, this method sets the error property of this document and returns quietly. If this
   * document loads synchronously, the results of the load will be available immediately after the call to this
   * method. Otherwise, this document publishes events through the <code>EventDispatcher</code> interface to notify
   * the client that loading has completed.
   *
   * @param strURL {String|jsx3.net.URI} either a relative or absolute URL pointing to an XML document to load.
   * @param intTimeout {int} the number of milliseconds to wait before timing out. This parameter is only relevant
   *   if this document is loading XML asynchronously. A zero or <code>null</code> value will cause this operation
   *   to wait forever.
   * @return {jsx3.xml.Document} this object.
   * @see jsx3.util.EventDispatcher
   */
  Document_prototype.load = function(strURL, intTimeout) {
    var net = jsx3.net;
    var Request = net.Request;

    /* @jsxobf-clobber */
    this._url = strURL.toString();

    //reset error state (used by hasError)
    this.abort();

    //set whether or not the doc should load synchronously; if an error is thrown and mode is firefox, probably due to document.domain issue
    var bAsync = Boolean(this.getAsync());

    var req = Request.open("GET", strURL, bAsync);

    if (req.getStatus() != Request.STATUS_ERROR) {
      if (bAsync) {
        /* @jsxobf-clobber */
        this._req = req;
        req.subscribe("*", this, "_onRequestEvent");
      }

      req.send(null, intTimeout);
    } else if (bAsync) {
      jsx3.sleep(function() {
        this._initFromReq(req);
      }, null, this);
    }

    if (!bAsync)
      this._initFromReq(req);

    return this;
  };

  /**
   * If this is a document that is currently loading asynchronously, this method will abort the request. This method
   * also resets the error state of this document.
   * 
   * @since 3.9
   */
  Document_prototype.abort = function() {
    this.setError(0);
    if (this._req) {
      this._req.unsubscribe("*", this);
      this._req.abort();
      delete this._req;
    }
  };
  
  /** @private @jsxobf-clobber-shared */
  Document_prototype._initFromReq = function(objReq) {
    var url = this._url;
    this._initFromReq2(objReq);
    this._url = url;

    if (this.hasError())
      this.publish({subject:Document.ON_ERROR});
    else
      this.publish({subject:Document.ON_RESPONSE});
  };
  
  /** @private @jsxobf-clobber */
  Document_prototype._initFromReq2 = function(objReq) {
    var s = objReq.getStatus();
    var okStatus = s >= 200 && s < 400;

    //LUKE (3.6.2/3.7): the following is an attempt to determine if an XML document should even be loaded via getResponseXML
    //Since the document class now uses the request class to load content, missing documents are returned as XHTML 404 Web pages.
    //This causes a regression where an HTML document is returned instead of null. To bypass, the HTTP status and the content-type
    //can be used to better limit if an XML was actually located.  Since NOT returning a document is a restrictive
    //act, the conditional below attempts to load the document if any one of three conditions is met:
    // 1) running from the file system, 2) content-type contains the string, 'xml', or 3) the status code is 200-299

    var contentType = "";
    if (!okStatus) {
      try {
        contentType = objReq.getResponseHeader("content-type");
      } catch (e) {}
    }

    if (okStatus || jsx3.util.strEmpty(contentType) || /xml|xsl/i.test(contentType)) {
      this.loadXML(objReq.getResponseText());
    } else {
      //TODO: I want a different error message here
      this.setError(102, jsx3._msg("xml.doc_status", this._url, s));
    }
  };
  
  /** @private @jsxobf-clobber */
  Document_prototype._onRequestEvent = function(objEvent) {
    var Request = jsx3.net.Request;
    var req = objEvent.target;
    var strSubject = objEvent.subject;

    delete this._req;
    req.unsubscribe("*", this);
    
    if (strSubject == Request.EVENT_ON_RESPONSE) {
      this._initFromReq(req);
    } else if (strSubject == Request.EVENT_ON_TIMEOUT) {
      this.setError(111, jsx3._msg("xml.timeout"));
      this.publish({subject:Document.ON_TIMEOUT});      
    } else {
      Document._log();
    }
  };


  /* @jsxobf-clobber */
  Document_prototype._initEntity = function(objElm) {
    Entity.prototype.init.call(this, objElm);
  };

  Document_prototype.loadXML = function(strXML) {
    this._url = null;
    this.abort();

    try {

      this._document = (new DOMParser()).parseFromString(strXML, "text/xml");

      if (! this._setErrorFromParser(this._document))
        this._initEntity(this._document.documentElement);

    } catch (e) {
      this._setErrorFromParser(this._document, jsx3.NativeError.wrap(e));
    }

    return this;
  };


  /**
   * @return {String}
   * @since 3.2
   */
  Document_prototype.getSourceURL = function() {
    return this._url;
  };

  /** @private @jsxobf-clobber */
  Document_prototype._setErrorFromParser = function(parser, ex) {
    if (parser != null) {
      // QUESTION: I have no idea if this applies to Fx
      var parseError = parser.parseError;
      if (parseError != null && parseError.errorCode != "0") {
        var strMessage = jsx3._msg("xml.err_fmt", parseError.errorCode, parseError.line, parseError.linepos,
            jsx3.util.strTrim(String(parseError.reason)), jsx3.util.strTruncate(parseError.srcText), parseError.url);
        this.setError(parseError.errorCode, strMessage);
        return true;
      }
      var docElement = parser.documentElement;
      if (docElement == null) {
        if (ex)
          this.setError(158, jsx3._msg("xml.doc_bad_ex", ex));
        else
          this.setError(108, jsx3._msg("xml.doc_bad"));
        return true;
      } else if (docElement.tagName == "parsererror" && docElement.namespaceURI &&
          docElement.namespaceURI.match(/^http:\/\/www\.mozilla\.org\/(.+\/)?parsererror.xml/i)) {
        this.setError(109, docElement.textContent.replace(/[\n\r]/g, " "));
        return true;
      }
    }

    if (ex != null) {
      this.setError(110, jsx3._msg("xml.unknown", jsx3.NativeError.wrap(ex)));
      return true;
    }

    return false;
  };


  /**
   * Returns whether or not the parser should validate the XML content during the initial parse. The default setting is false;
   * @return {Boolean}
   * @since 3.2
   * @deprecated  IE-only.
   */
  Document_prototype.getValidateOnParse = function() {
    //TO DO: validate the analagous method for fx
    return this._document.validateOnParse;
  };

  /**
   * Sets whether or not the parser should validate the XML content during the initial parse.
   * @param bValidate {Boolean}
   * @since 3.2
   * @deprecated  IE-only.
   */
  Document_prototype.setValidateOnParse = function(bValidate) {
    this._document.validateOnParse = bValidate;
  };

  /**
   * Returns whether or not the parser should resolve externally referenced entities. The default setting is false;
   * @return {Boolean}
   * @since 3.2
   * @deprecated  IE-only.
   */
  Document_prototype.getResolveExternals = function() {
    //TO DO: validate the analagous method for fx
    return this._document.resolveExternals;
  };

  /**
   * Sets whether or not the parser should resolve externally referenced entities.
   * @param bResolve {Boolean}
   * @since 3.2
   * @deprecated  IE-only.
   */
  Document_prototype.setResolveExternals = function(bResolve) {
    this._document.resolveExternals = bResolve;
  };



  Document_prototype.cloneDocument = function() {
    try {
      netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
    } catch (e) {;}

    //I cannot track down why a synchronously loaded xsl doc with document.domain set in fx is throwing error
    try {
      var objDoc = new Document(this._document.cloneNode(true));
    } catch(e) {
      var objDoc = new Document();
      objDoc.loadXML(this.getXML());
    }
    return objDoc;
  };



  Document_prototype.toString = function() {
    if (this._document != null && !this.hasError()) {
      return (new XMLSerializer()).serializeToString(this._document);
    } else {
      return this.jsxsuper();
    }
  };

  Document_prototype.getXmlVersion = function() {
    return this._document.xmlVersion;
  };

  Document_prototype.getXmlEncoding = function() {
    return this._document.xmlEncoding;
  };

  Document_prototype.getXmlStandalone = function() {
    return this._document.xmlStandalone;
  };


  /**
   * @param strVersion {boolean|String}
   * @param strEncoding {boolean|String}
   * @param bStandalone {boolean}
   */
  Document_prototype.serialize = function(strVersion, strEncoding, bStandalone) {
    if (strVersion === true) strVersion = this.getXmlVersion() || "1.0";
    if (strEncoding === true) strEncoding = this.getXmlEncoding();

    var clobberPI = strVersion || strEncoding || bStandalone;

    if (clobberPI) {
      var pi = '<?xml';
      if (strVersion) pi += ' version="' + strVersion + '"';
      if (strEncoding) pi += ' encoding="' + strEncoding + '"';
      if (bStandalone != null) pi += ' standalone="' + (bStandalone ? "yes" : "no") + '"';
      pi += '?>\n';

      var tokens = new Array(this._document.childNodes.length + 1);
      tokens[0] = pi;

      for (var i = 0; i < this._document.childNodes.length; i++) {
        var node = this._document.childNodes[i];
        if (node.nodeType != 7 || node.nodeName != "xml") {
          var wrapped = new Entity(node);
          tokens[i+1] = wrapped.hasError() ? "<!-- " + wrapped + " -->" : wrapped.toString();
        }
      }
    } else {
      var tokens = new Array(this._document.childNodes.length);

      for (var i = 0; i < this._document.childNodes.length; i++) {
        var node = this._document.childNodes[i];
        var wrapped = new Entity(node);
        tokens[i] = wrapped.hasError() ? "<!-- " + wrapped + " -->" : wrapped.toString();
        if (node.nodeType == 7 || node.nodeName == "xml")
          tokens[i] += "\n";
      }
    }

    return tokens.join("");
  };

  /**
   * Creates a new root node on an empty document.
   * <p>Usage:</p>
   * <pre>
   * var objDoc = new jsx3.xml.Document();
   * objDoc.createDocumentElement("myRoot");
   * </pre>
   * @param strNodeName {String} node name for the root node
   * @param strNSURI {String} namespace (optional). For example, "http:/someURN.com/". Note that if this parameter is used, @strNodeName can be optionally prefixed (i.e., abc:myRoot) to create an explicit namespace prefix.
   * @return {jsx3.xml.Entity} reference to the new node wrapped in a jsx3.xml.Entity instance
   */
  Document_prototype.createDocumentElement = function(strNodeName, strNSURI) {
    // NOTE: see http://bugs.webkit.org/show_bug.cgi?id=14835
    if (strNSURI == null) strNSURI = null;
    var objRoot = this._document.createElementNS(strNSURI, strNodeName);

    if (this._document.documentElement != null)
      this._document.replaceChild(objRoot, this._document.documentElement);
    else
      this._document.appendChild(objRoot);

    //bind expected references to the root node as the jsx3.xml.Document class implements the methods of the jsx3.xml.Entity class, meaning all methods that one can expect from the jsx3.xml.Entity class should apply to this class as well
    this._initEntity(this._document.documentElement);

    //return wrapped node
    return (new jsx3.xml.Entity(objRoot));
  };

  /**
   * Creates a processing instruction node that containing the target and data information. Note that you cannot specify a namespace with this method.
   * <p>Usage:</p>
   * <pre>
   * [document].createProcessingInstruction("xml","version=\"1.0\" encoding=\"UTF-8\"");
   * [document].createDocumentElement("myRoot");
   * </pre>
   * @param strTarget {String} String that specifies the target part of the processing instruction. This supplies the nodeName property of the new object.
   * @param strData   {String} String that specifies the rest of the processing instruction preceding the closing ?> characters. This supplies the nodeValue property for the new object.
   */
  Document_prototype.createProcessingInstruction = function(strTarget, strData) {
    // TODO: Mozilla
    //create, append, and wrap
    var objRoot = this._document.createProcessingInstruction(strTarget, strData);
    this._document.appendChild(objRoot);
  };

  /**
   * Sets whether this document loads asynchronously. The default is to load synchronously. If this document loads
   * asynchronously, it publishes the events <code>ON_RESPONSE</code>, <code>ON_ERROR</code>, and
   * <code>ON_TIMEOUT</code> to notify the client that loading has finished.
   *
   * @param bAsync {boolean} if <code>true</code> the document loads asynchronously.
   * @return {jsx3.xml.Document} this object.
   * @see #ON_RESPONSE
   * @see #ON_ERROR
   * @see #ON_TIMEOUT
   */
  Document_prototype.setAsync = function(bAsync) {
    /* @jsxobf-clobber */
    this._jsxasync = bAsync;
    return this;
  };

  /**
   * Returns whether this document loads asynchronously.
   * @return {boolean}
   */
  Document_prototype.getAsync = function(strName) {
    return Boolean(this._jsxasync);
  };

  
  /**
   * Sets the selection language to use for selection queries (i.e., selectSingleNode/selectNodes); The default is XSLPattern;
   * @param strLanguage {String} one of the strings: <code>XSLPattern</code>, <code>XPath</code>
   * @return {jsx3.xml.Document} reference to this
   * @deprecated  This method is only implemented on Internet Explorer. <code>XPath</code> is the only supported value.
   */
  Document_prototype.setSelectionLanguage = function(strLanguage) {
    return this;
  };

  /**
   * Gets the selection language to use for selection queries (i.e., selectSingleNode/selectNodes); The default is XSLPattern;
   * @return {String}
   * @deprecated  This method is only implemented on Internet Explorer. <code>XPath</code> is the only supported value.
   */
  Document_prototype.getSelectionLanguage = function() {
    return "XPath";
  };

  
  /**
   * returns a string of the namespaces map appropriately formatted for input into <code>setSelectionNamespaces</code>.
   * @param map {Object} should follow the format: {some_uri:"jsx1",some_other_uri,"jsx2"}
   * @return {String} will adhere to the format: "xmlns:jsx1='some_uri' xmlns:jsx2='some_other_uri'"
   * @private
   * @jsxobf-clobber-shared
   */
  Document.serializeNamespacesMap = function(map) {
    var a = [];
    for (var p in map)
      a[a.length] = "xmlns:" + map[p] + "='" + p + "'";
    return a.join(" ");
  };

  /**
   * Sets a list of namespace prefixes and their associated URIs. This allows any code to generically prefix name-space qualified nodes and still get the correct selection result
   * @param declaration {Object | String} Relevant selection namespace(s) in Object format. For example: <code>{some_uri:"jsx1",some_other_uri,"jsx2"}</code>
   *                              or in String format. For example: <code>"xmlns:jsx1='some_uri' xmlns:jsx2='some_other_uri'"</code>
   * @return {jsx3.xml.Document} reference to this
   */
  Document_prototype.setSelectionNamespaces = function(declaration) {
    //convert object to string (per IE format constraints)
    if(typeof(declaration) == "object") declaration = Document.serializeNamespacesMap(declaration);

    this._document._jsxselectionns = declaration;
    this._document._jsxselectionnsobj = null;
    return this;
  };

  /**
   * Gets a list of namespace prefixes and their associated URIs. This allows any code to generically prefix name-space qualified nodes and still get the correct selection result
   * @return {String}
   */
  Document_prototype.getSelectionNamespaces = function(strName) {
    //3.2 fix: updated signature to return empty string in FF as would be returned in IE
    return (this._document._jsxselectionns) ? this._document._jsxselectionns : "";
  };

  /**
   * The Firefox implementation of the XSLT specification does not implement a searchable <b>namespace</b> axis. To overcome this limitation,
   * this method can be called to create a searchable equivalent that is part of the <b>attribute</b> axis. After XML content has been loaded, call this method before
   * calling any other methods on the Document instance in order to ensure proper functioning of subsequent calls. The document
   * can then be queried, using valid XPath syntax to discover the declared namespaces. However, instead of using <b>namespace::xsd</b>, the
   * relevant query would be <b>attribute::jsx_xmlns:xsd</b>, where jsx_xmlns:xsd would resolve to the
   * universal name, <b>{http://xsd.tns.tibco.com/gi/cxf/2006}:xsd</b>. Following this call with <code>getDeclaredNamespaces</code>
   * is useful to resolve the prefix actually used, providing a reverse-lookup to resolve the actual prefix being used.
   * For example, assume <b>objMap</b> is the return object when calling getDeclaredNamespaces. In such a case, the following
   * query can be used to locate the URI for a given namespace prefix, even though Firefox does not support such a construct:
   *
   * <p/>
   * <pre>
   * var objMap = someDoc.getDeclaredNamespaces();
   * var myXpathQuery = "ancestor-or-self::*[attribute::" +
   *   objMap[jsx3.xml.Document.SEARCHABLE_NAMESPACE] +  ":xsd]/attribute::" +
   *   objMap[jsx3.xml.Document.SEARCHABLE_NAMESPACE] + ":xsd";
   * var objNode = someNode.selectSingleNode(myXpathQuery,objMap);
   * </pre>
   *
   * @return {String} prefix used to represent the xmlns.  By default the return will be <b>jsx_xmlns</b>. However, if this prefix is
   * already being used by the document instance (i.e., <code>xmlns:jsx_xmlns="?"</code>), the prefix will be
   * incremented as follows: jsx_xmlns0, jsx_xmlns1, jsx_xmlns2, etc, until a unique prefix is found.
   * @see getDeclaredNamespaces
   */
  Document_prototype.createNamespaceAxis = function() {
    var objNode = this.getRootNode();
    var strXML = objNode.toString();
    var intIncr = "";
    do {
      var re = new RegExp("xmlns:" + Document.SEARCHABLE_PREFIX + intIncr + "([^=]*)=['\"]([^\"^']*)['\"]","g");
      var intPos = strXML.search(re);
      if(intPos >= 0) intIncr = (intIncr == "") ? 0 : intIncr + 1;
    } while(intPos >= 0);

    this._createNamespaceAxis(objNode,Document.SEARCHABLE_PREFIX + intIncr);

    //how to add a new namespace???? reparse to commit...
    this.loadXML(this.getXML());

    return Document.SEARCHABLE_PREFIX + intIncr;
  };

  /** @private @jsxobf-clobber */
  Document_prototype._createNamespaceAxis = function(objElement,strPre) {
    //get the entity as string without descendants
    var strXML = objElement.cloneNode(false).getXML();

    //parse out all instances of the 'namespace' (xmlns) axis, and create a searchable equivalent belonging to the 'attribute' namespace
    var myArr;
    while(myArr = Document.SEARCHABLE_REGEXP.exec(strXML)) {
      if(RegExp.$1 != strPre && RegExp.$1 != "xml") {
        var objAtt = objElement.createNode( jsx3.xml.Entity.TYPEATTRIBUTE, (strPre + ":" + RegExp.$1), Document.SEARCHABLE_NAMESPACE);
        objAtt.setValue(RegExp.$2);
        objElement.setAttributeNode(objAtt);
      } else if( RegExp.$1 == "xml") {
        jsx3.log(strXML);
      }
    }

    //recurse to locate other xmlns declarations among descendant elements
    for (var i = objElement.getChildIterator(); i.hasNext(); )
      this._createNamespaceAxis(i.next(), strPre);
  };

  /**
   * Returns a map of all implemented namespaces in the following format: {some_uri:"jsx1",some_other_uri,"jsx2",another_uri:"jsx3"}.
   * <br/>
   * The returned object map can then be used to resolve the qualified name (QName) for the nodes in a given query via a reverse lookup.
   * For example:
   * <pre>
   *
   * //open an XML Document (just use one of the sample prototypes that ships with Builder)
   * var objXML = new jsx3.xml.Document();
   * objXML.load("GI_Builder/prototypes/Block/Text.xml");
   *
   * //get an object map of all known selection namespaces
   * var objMap = objXML.getDeclaredNamespaces();
   *
   * //construct a qualified query (Note that all nodes in a GI serialization file belong to the namespace, 'urn:tibco.com/v3.0')
   * var myQualifiedQuery = "//" + objMap["urn:tibco.com/v3.0"] + ":object";
   *
   * //query the document for the given node.
   * var objNode = objXML.selectSingleNode(myQualifiedQuery,objMap);
   *
   * //alert the return
   * alert(objNode);
   *
   * </pre>
   * @param objMap {Object} Optional. should follow the format <code>{prefix1:1,prefix2:1}</code>. If passed, the returned Object will resolve to any matched prefix, while using arbitrary sequential prefixes (jsx1, jsx2, etc) for all other uris.
   * @return {Object}
   */
  Document_prototype.getDeclaredNamespaces = function(objMap) {
    //reset the hash
    this._jsx_sn_hash = {};

    //get the root (start point)
    var objNode = this.getRootNode();
    if(objNode) this._getDeclaredNamespaces(objNode,{index:0},objMap);

    //return the final map (user can use to resolve namespaces with--effectively creates a QName)
    return this._jsx_sn_hash;
  };

  /**
   * Recurses to locate all known namespaces to derive the namespace map
   * @param objNode {jsx3.xml.Entity}
   * @param oCounter {Object}
   * @private
   * @jsxobf-clobber
   */
  Document_prototype._getDeclaredNamespaces = function(objNode,oCounter,objMap) {
    //add a new namespace if unique
    var sQ = objNode.getNamespaceURI();
    if(sQ != "" && sQ != "http://www.w3.org/XML/1998/namespace") {
      var mypfx;
      if(!this._jsx_sn_hash[sQ] || (objMap && (mypfx = objNode.getPrefix()) != "" && typeof(objMap[mypfx]) != "undefined")) {
        if(mypfx) {
          this._jsx_sn_hash[sQ] = mypfx;
        } else {
          oCounter.index += 1;
          this._jsx_sn_hash[sQ] = "jsx" + oCounter.index;
        }
      }
    }

    //recurse if objNode is an element
    if (objNode.getNodeType() == jsx3.xml.Entity.TYPEELEMENT) {
      for (var i = objNode.selectNodeIterator("attribute::* | child::*"); i.hasNext(); ) {
        var objChild = i.next();
        if (objChild.getNodeType() == jsx3.xml.Entity.TYPEELEMENT ||
            objChild.getNodeType() == jsx3.xml.Entity.TYPEATTRIBUTE)
          this._getDeclaredNamespaces(objChild, oCounter, objMap);
      }
    }
  };

  /**
   * Returns the native XML parser
   * @return {Object}
   */
  Document_prototype.getNativeDocument = function() {
    //returns the xml parser instance
    return this._document;
  };

  /** @private @jsxobf-clobber */
  Document._log = function(intLevel, strMessage) {
    if (Document._LOG == null) {
      if (jsx3.util.Logger) {
        /* @jsxobf-clobber */
        Document._LOG = jsx3.util.Logger.getLogger(Document.jsxclass.getName());
        if (Document._LOG == null) return;
      } else {
        return;
      }
    }
    Document._LOG.log(intLevel, strMessage);
  };


  /**
   * gets the release/build for the class (i.e., "2.2.00")
   * @return {String}
   * @deprecated
   */
  Document.getVersion = function() {
    return "3.0.0";
  };


});


/**
 * @deprecated  Renamed to jsx3.xml.Document
 * @see jsx3.xml.Document
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.Document", -, null, function(){});
 */
jsx3.Document = jsx3.xml.Document;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  setError

/**
 * Wrapper of the native browser XSLT processor.
 *
 * @since 3.4
 */
jsx3.Class.defineClass("jsx3.xml.Template", null, null, function(Template, Template_prototype) {

  /**
   * {int}
   * @package
   * @final @jsxobf-final
   */
  Template.DISABLE_OUTPUT_ESCAPING = 1;

  /** @private @jsxobf-clobber */
  Template._SUPPORTS = {};


  /**
   * @param strKey {String}
   * @return {boolean}
   * @package
   */
  Template.supports = function(strKey) {
    return Template._SUPPORTS[strKey] || Boolean(0);
  };

  /**
   * The instance initializer.
   * @param objXSL {jsx3.xml.Document}
   * @throws {jsx3.Exception} if <code>objXSL</code> is not a valid XML document.
   */
  Template_prototype.init = function(objXSL) {
    if (objXSL.hasError())
      throw new jsx3.Exception(jsx3._msg("temp.init_err", objXSL.getError()));


    if (objXSL.getBaseName() == "stylesheet") {
      try {
        /* @jsxobf-clobber */
        this._processor = new XSLTProcessor();
        this._processor.importStylesheet(objXSL.getNativeDocument());
      } catch (e) {
        this.setError(202, jsx3._msg("temp.nat_err", jsx3.NativeError.wrap(e)));
      }
    } else {
      this.setError(201, jsx3._msg("temp.root_elm"));
    }

    this._src = objXSL.getSourceURL();
  };


  Template_prototype.setParam = function(strName, objValue) {
    if (! this._params) this._params = new jsx3.util.List();
    if (this._params.indexOf(strName) < 0) this._params.add(strName);
    this._processor.setParameter("", strName, objValue != null ? objValue.toString() : "");
  };

  /** @private @jsxobf-clobber */
  Template_prototype._transform = function(objXML, bObject) {

    var nativeNode = objXML instanceof jsx3.xml.Document ? objXML.getNativeDocument() : objXML.getNative();
    var objDoc = this._processor.transformToDocument(nativeNode);

    var retVal = null;
    if (objDoc && objDoc.documentElement) {
      retVal = bObject ? new jsx3.xml.Document(objDoc) : (new XMLSerializer()).serializeToString(objDoc);
    } else {
      this.setError(203, jsx3._msg("temp.empty"));
    }

    return retVal;
  };

  Template_prototype.reset = function() {
    if (this._params) {
      for (var i = this._params.iterator(); i.hasNext(); )
        this._processor.removeParameter("", i.next());
      this._params.clear();
    }
  };


  /**
   * @param objParams {Object<String,Object>} JavaScript object array of name/value pairs. If this parameter is
   *    not empty, the transformation will use a paramaterized stylesheet to perform the transformation.
   */
  Template_prototype.setParams = function(objParams) {
    for (var f in objParams)
      this.setParam(f, objParams[f]);
  };

  /**
   * Performs an XSLT merge. If an error occurs while performing the transform, this method sets the error
   * property of this processor and returns <code>null</code>.
   * @param objXML {jsx3.xml.Entity}
   * @param-private bObject {boolean}
   * @return {String} the result of the transformation
   */
  Template_prototype.transform = function(objXML, bObject) {
    if (this.hasError())
      throw new jsx3.Exception(jsx3._msg("temp.temp_err", this.getError()));
    if (objXML.hasError())
      throw new jsx3.Exception(jsx3._msg("temp.doc_err", objXML.getError()));

    try {
      return this._transform(objXML, bObject);
    } catch (e) {
      this.setError(204, jsx3._msg("temp.err", jsx3.NativeError.wrap(e)));
      return null;
    }
  };

  /**
   * Performs an XSLT merge. If an error occurs while performing the transform, this method sets the error
   * property of this processor and returns <code>null</code>.
   * @param objXML {jsx3.xml.Entity}
   * @return {jsx3.xml.Document} if a valid result tree is formed as a result of the transformation
   */
  Template_prototype.transformToObject = function(objXML) {
    return this.transform(objXML, true);
  };

  /**
   * Returns an error object (a plain JavaScript object) with two properties that the developer can query for:
   * <ul>
   * <li>code &#8211; an integer error code, 0 for no error.</li>
   * <li>description &#8211; a text description of the error that occurred.</li>
   * </ul>
   * @return {Object}
   * @jsxdoc-definition Template_prototype.getError = function() {}
   */

  /**
   * Returns <code>true</code> if the last operation on this XML entity caused an error.
   * @return {boolean}
   * @jsxdoc-definition Template_prototype.hasError = function() {}
   */

  Template_prototype.toString = function() {
    return this._src;
  };

});

jsx3.xml.Entity.jsxclass.mixin(jsx3.xml.Template.prototype, true, ["getError", "hasError", "setError"]);

/**
 * An extension of <code>jsx3.xml.Document</code> that encapsulates a compiled XSL template.
 */
jsx3.Class.defineClass("jsx3.xml.XslDocument", jsx3.xml.Document, null, function(XslDocument, XslDocument_prototype) {

  /**
   * @param strName {String}
   * @param objValue {Object}
   * @see jsx3.xml.Template#setParam()
   */
  XslDocument_prototype.setParam = function(strName, objValue) {
    this._getTemplate().setParam(strName, objValue);
  };

  /**
   * @param objParams {Object<String,Object>}
   * @see jsx3.xml.Template#setParams()
   */
  XslDocument_prototype.setParams = function(objParams) {
    this._getTemplate().setParams(objParams);
  };

  /**
   * @see jsx3.xml.Template#reset()
   */
  XslDocument_prototype.reset = function() {
    if (this._template) this._template.reset();
  };

  /**
   * @param objXML {jsx3.xml.Entity}
   * @see jsx3.xml.Template#transform()
   */
  XslDocument_prototype.transform = function(objXML) {
    return this._getTemplate().transform(objXML);
  };

  /**
   * @param objXML {jsx3.xml.Entity}
   * @see jsx3.xml.Template#transformToObject()
   */
  XslDocument_prototype.transformToObject = function(objXML) {
    return this._getTemplate().transformToObject(objXML);
  };

  /** @private @jsxobf-clobber */
  XslDocument_prototype._getTemplate = function() {
    if (this._template == null) {
      // will throw error if this has error
      /* @jsxobf-clobber */
      this._template = new jsx3.xml.Template(this);
      if (this._template.hasError())
        throw new jsx3.Exception(jsx3._msg("temp.parse", this.getSourceURL(), this._template.getError()));
    }
    return this._template;
  };

  XslDocument_prototype.load = function(strURL) {
    delete this._template;
    return this.jsxsuper(strURL);
  };

  XslDocument_prototype.loadXML = function(strXML) {
    delete this._template;
    return this.jsxsuper(strXML);
  };
  
  XslDocument_prototype.hasError = function() {
    return this.jsxsuper() || (this._template != null && this._template.hasError());
  };

  XslDocument_prototype.getError = function() {
    var objError = null;
    if (this._template) objError = this._template.getError();
    if (! objError) objError = this.jsxsuper();
    return objError;
  };

  /**
   * @param objXML {jsx3.xml.Document}
   * @return {jsx3.xml.XslDocument}
   */
  XslDocument.wrap = function(objXML) {
    return new XslDocument(objXML.getNativeDocument());
  };

  XslDocument_prototype.cloneDocument = function() {
    return XslDocument.wrap(this.jsxsuper());
  };

  XslDocument_prototype.isMutable = function() {
   return true;
  };

});


/**
 * Wrapper of the native browser XSLT processor.
 * @deprecated  Use <code>jsx3.xml.Template</code> instead.
 * @see jsx3.xml.Template
 */
jsx3.Class.defineClass("jsx3.xml.Processor", null, null, function(Processor, Processor_prototype) {

  var Template = jsx3.xml.Template;

  Processor.DISABLE_OUTPUT_ESCAPING = 1;

  Processor.supports = function(strKey) {
    return Template.supports(strKey);
  };

  /**
   * The instance initializer.
   * @param objXML {jsx3.xml.Entity} the source document to transform
   * @param objXSL {jsx3.xml.Document} a valid XSL Stylesheet (version 1.0 of "http://www.w3.org/1999/XSL/Transform")
   * @param objParams {Object<String,String>} JavaScript associative array of name/value pairs. If this parameter
   *    if provided the transformation will use a paramaterized stylesheet to perform the transformation.
   */
  Processor_prototype.init = function(objXML, objXSL, objParams) {
    /* @jsxobf-clobber */
    this._xml = objXML;
    /* @jsxobf-clobber */
    this._xsl = objXSL;
    /* @jsxobf-clobber */
    this._params = objParams;
  };

  /**
   * Sets the XML that should be transformed.
   * @param objXML {jsx3.xml.Entity}
   * @return {Object} this object.
   */
  Processor_prototype.setXML = function(objXML) {
    this._xml = objXML;
    return this;
  };

  /**
   * Sets reference to XSL that should be transformed.
   * @param objXSL {jsx3.xml.Document} instance containing a valid XSL Stylesheet (version 1.0 of "http://www.w3.org/1999/XSL/Transform")
   * @return {jsx3.xml.Processor} reference to self
   */
  Processor_prototype.setXSL = function(objXSL) {
    this._xsl = objXSL;
    return this;
  };

  /**
   * Sets reference to Params that should be passed to the processor.
   * @param objParams {Object<String,String>} JavaScript object array of name/value pairs. If this parameter is
   *    not empty, the transformation will use a paramaterized stylesheet to perform the transformation.
   * @return {jsx3.xml.Processor} reference to self
   */
  Processor_prototype.setParams = function(objParams) {
    this._params = objParams;
    return this;
  };

  /**
   * Performs an XSLT merge. If an error occurs while performing the transform, this method sets the error
   * property of this processor and returns <code>null</code>.
   * @return {jsx3.xml.Document} if a valid result tree is formed as a result of the transformation
   */
  Processor_prototype.transformToObject = function() {
    return this.transform(true);
  };

  /**
   * Performs an XSLT merge. If an error occurs while performing the transform, this method sets the error
   * property of this processor and returns <code>null</code>.
   * @param-private bObject {Boolean} if true, a jsx3.xml.Document instance is returned (not the string)
   * @return {String} the result of the transformation
   */
  Processor_prototype.transform = function(bObject) {
    var t = new Template(this._xsl);
    if (! t.hasError()) {
      if (this._params)
        t.setParams(this._params);

      var retVal = t.transform(this._xml, bObject);
      if (! t.hasError())
        return retVal;
    }

    var e = t.getError();
    this.setError(e.code, e.description);
    return null;
  };

  /**
   * Returns an error object (a plain JavaScript object) with two properties that the developer can query for:
   * <ul>
   * <li>code &#8211; an integer error code, 0 for no error.</li>
   * <li>description &#8211; a text description of the error that occurred.</li>
   * </ul>
   * @return {Object}
   * @jsxdoc-definition Processor_prototype.getError = function() {}
   */

  /**
   * Returns <code>true</code> if the last operation on this XML entity caused an error.
   * @return {boolean}
   * @jsxdoc-definition Processor_prototype.hasError = function() {}
   */

});

jsx3.xml.Entity.jsxclass.mixin(jsx3.xml.Processor.prototype, true, ["getError", "hasError", "setError"]);
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * A Logger is used to log messages about a particular component of an application. 
 * <p/>
 * Loggers are organized hierarchically according to name, descending from the root logger, "global." A period 
 * denotes levels in the hierarchy. For example, <code>global</code> is the parent of <code>com</code> is the parent 
 * of <code>com.tibco</code> is the parent of <code>com.tibco.gi</code>, etc. 
 * <p/>
 * A Logger has a level that determines what severity of messages will be handled. Messages with severity below the
 * level of the Logger will be ignored. If the level of a Logger is not explicitly defined, the level is inherited
 * from its parent.
 * <p/>
 * A Logger can have any number of handlers, each of which can output a log message to a different place. By default
 * a logger will also forward log messages to the handlers of its ancestors, although this can be disabled per Logger.
 * <p/>
 * A typical usage pattern is to create a Logger for each class, setting it as a private static field of that class, 
 * as in the following code example:
 * <pre>
 * jsx3.Class.defineClass('eg.Thing', null, null, function(Thing, Thing_prototype) {
 *   
 *   // import jsx3.util.Logger
 *   var Logger = jsx3.util.Logger;
 *
 *   // create Logger for this class
 *   Thing._LOG = Logger.getLogger(Thing.jsxclass.getName());
 *
 *   Thing.prototype.init = function(arg1, arg2, arg2) {
 *     Thing._LOG.debug("received args: " + arg1 + ", " + arg2 + ", " + arg3);
 *
 *     if (isNaN(arg1)) {
 *       Thing._LOG.warn("arg1 is not a number, setting to 0");
 *       this._one = 0;
 *     } else {
 *       this._one = arg1;
 *     }
 *   };
 * });
 * </pre>
 * If the creation of the log message is expensive (depending on the implementation, 
 * <code>toString()</code> can be expensive), <code>isLoggable()</code> can be used to check whether the log
 * statement will actually be handled before creating the log message:
 * <pre>
 * if (LOG.isLoggable(jsx3.util.Logger.INFO))
 *   LOG.info(anObject.toString());
 * </pre>
 *
 * @since 3.1
 */
jsx3.Class.defineClass('jsx3.util.Logger', null, null, function(Logger, Logger_prototype) {
  
  var Method = jsx3.Method;
  var Exception = jsx3.Exception;
  
  /**
   * {int} Set the level of a Logger or Handler to this value to ignore all messages.
   * @final @jsxobf-final
   */
  Logger.OFF = 0;
  
  /**
   * {int} Level indicating fatal error.
   * @final @jsxobf-final
   */
  Logger.FATAL = 1;
  
  /**
   * {int} Level indicating error.
   * @final @jsxobf-final
   */
  Logger.ERROR = 2;
  
  /**
   * {int} Level indicating warning.
   * @final @jsxobf-final
   */
  Logger.WARN = 3;
  
  /**
   * {int} Level indicating informational message.
   * @final @jsxobf-final
   */
  Logger.INFO = 4;
  
  /**
   * {int} Level indicating debug message.
   * @final @jsxobf-final
   */
  Logger.DEBUG = 5;
  
  /**
   * {int} Level indicating trace message.
   * @final @jsxobf-final
   */
  Logger.TRACE = 6;

  /** @private @jsxobf-clobber */
  Logger.MAX_LEVEL = Logger.FATAL;
  /** @private @jsxobf-clobber */
  Logger.MIN_LEVEL = Logger.TRACE;
  
  /**
   * {jsx3.util.Logger} Convenient access to <code>jsx3.util.Logger.getLogger('global')</code>.
   */
  Logger.GLOBAL = null;
  
  /**
   * Returns an Logger instance. Either creates a new logger or returns a pre-existing logger of the same name.
   * This class is a factory class so instances of Logger may not be instantiated
   * directly. Use this method to get a handle to a logger.
   *
   * @param strName {String} the name of the logger to return
   * @return {jsx3.util.Logger}
   */
  Logger.getLogger = function(strName) {
    var manager = Logger.Manager.getManager();
    if (manager == null) return null;

    var logger = manager.getLogger(strName);
    if (logger == null) {
      logger = new Logger(strName);
      manager.addLogger(logger);
    }
    return logger;
  };
  
  /** @private @jsxobf-clobber */
  Logger._LEVELS = [null, "FATAL", "ERROR", "WARN", "INFO", "DEBUG", "TRACE"];
  
  /**
   * Returns the string (English) representation of a level value.
   *
   * @param intLevel {int} a level value between FATAL and TRACE
   * @return {String} a string representation of the level value
   */
  Logger.levelAsString = function(intLevel) {
    return Logger._LEVELS[intLevel] || "";
  };
  
  /** @private @jsxobf-clobber */
  Logger_prototype._name = null;
  /** @private @jsxobf-clobber */
  Logger_prototype._handlers = null;
  /** @private @jsxobf-clobber */
  Logger_prototype._mylevel = null;
  /** @private @jsxobf-clobber */
  Logger_prototype._level = Logger.INFO;
  /** @private @jsxobf-clobber */
  Logger_prototype._parent = null;
  /** @private @jsxobf-clobber */
  Logger_prototype._useParent = true;
  /** @private @jsxobf-clobber */
  Logger_prototype._children = null;
  
  /**
   * @private
   */
  Logger_prototype.init = function(strName) {
    this._name = strName;
  };
  
  // bean methods
  
  /**
   * Returns the name of this Logger.
   * @return {String}
   */
  Logger_prototype.getName = function() {
    return this._name;
  };
  
  /**
   * Add a handler to this Logger.
   * @param objHandler {jsx3.util.Logger.Handler}
   */
  Logger_prototype.addHandler = function(objHandler) {
    if (!this._handlers)
      this._handlers = jsx3.$A();
    this._handlers.push(objHandler);
  };
  
  /**
   * Remove a handler from this Logger.
   * @param objHandler {jsx3.util.Logger.Handler}
   */
  Logger_prototype.removeHandler = function(objHandler) {
    if (this._handlers)
      this._handlers.remove(objHandler);
  };

  /**
   * Returns the level of this Logger. This method will return null unless the level of this Logger has been
   * explicitly set either in the configuration file or with a call to setLevel().
   * @return {int}
   */
  Logger_prototype.getLevel = function() {
    return this._mylevel;
  };
  
  /**
   * Returns the effective level of this Logger, which is either the explicitly set value of this Logger or the 
   * effective level of this Logger's parent Logger. 
   * @return {int}
   */
  Logger_prototype.getEffectiveLevel = function() {
    return this._level;
  };
  
  /**
   * Sets the level of this Logger.
   * @param intLevel {int}
   */
  Logger_prototype.setLevel = function(intLevel) {
    intLevel = Math.max(Logger.OFF, Math.min(Logger.MIN_LEVEL, intLevel));
    this._mylevel = intLevel;
    this._updateLevel();
  };

  /** @private @jsxobf-clobber */
  Logger_prototype._updateLevel = function() {
    var newValue = null;
    
    if (this._mylevel != null) {
      newValue = this._mylevel;
    } else if (this._parent != null) {
      newValue = this._parent._level;
    } else {
      newValue = Logger_prototype._level;
    }
    
    if (newValue != this._level) {
      this._level = newValue;
      if (this._children) {
        for (var i = 0; i < this._children.length; i++)
          this._children[i]._updateLevel();
      }
    }
  };
  
  /**
   * Returns the parent Logger of this Logger. The global logger will return null from this method.
   * @return {jsx3.util.Logger}
   */
  Logger_prototype.getParent = function() {
    return this._parent;
  };
  
  /**
   * Sets the parent Logger of this Logger.
   * @param objParent {jsx3.util.Logger}
   */
  Logger_prototype.setParent = function(objParent) {
    // remove from old parent's children
    if (this._parent != null)
      this._parent._children.remove(this);
    
    this._parent = objParent;
    // add to new parent's children
    if (this._parent != null) {
      if (!this._parent._children)
        this._parent._children = jsx3.$A();
      this._parent._children.push(this);
    }
    
    this._updateLevel();
  };
  
  /**
   * Returns whether this Logger will publish log messages to the handlers of its parent Logger.
   * @return {boolean}
   */
  Logger_prototype.getUseParentHandlers = function() {
    return this._useParent;
  };
  
  /**
   * Sets whether this Logger will publish log messages to the handlers of its parent Logger.
   * @param bUseParent {boolean}
   */
  Logger_prototype.setUseParentHandlers = function(bUseParent) {
    this._useParent = bUseParent;
  };
    
  // log methods

  /** @private @jsxobf-clobber */
  Logger_prototype._dispatch = function(objRecord) {
    var logger = this;
    var recordLevel = objRecord.getLevel();
    
    while (logger) {
      var handlers = logger._handlers;
      if (handlers) {
        for (var i = 0; i < handlers.length; i++) {
          // check handler level here instead of in Handler.handle() method
          var handler = handlers[i];
          if (handler.isLoggable(recordLevel)) {
            try {
              handler.handle(objRecord);
            } catch (e) {
              e = jsx3.NativeError.wrap(e);
              Logger.getLogger(Logger.jsxclass.getName()).error(jsx3._msg("logr.err_hand", handler.getName(), e), e);
            }
          }
        }
      }
      
      if (! logger.getUseParentHandlers())
        break;
      logger = logger.getParent();
    }
  };
  
  /**
   * Log a message.
   * @param intLevel {int} the level of the message
   * @param strMessage {String} the message to log
   * @param strArgs {Array<String> | String...} either an array of or variable argument message parameters, optional argument
   */
  Logger_prototype.log = function(intLevel, strMessage, strArgs) {
    intLevel = Math.max(intLevel, Logger.MAX_LEVEL);
    if (this._level < intLevel) return;
    
    var arrParams = jsx3.$A.is(strArgs) ? strArgs : Method.argsAsArray(arguments, 2);
    var record = new Logger.Record(strMessage, arrParams, intLevel, this.getName(), jsx3.lang.getCaller(1), null);
    this._dispatch(record);
  };
  
  /**
   * Log an exception.
   * @param intLevel {int} the level of the message
   * @param strMessage {String} the message to log with the exception, may be null
   * @param objError {jsx3.Exception} the exception to log 
   */
  Logger_prototype.logError = function(intLevel, strMessage, objError) {
    intLevel = Math.max(intLevel, Logger.MAX_LEVEL);
    if (this._level < intLevel) return;

    var record = new Logger.Record(strMessage, null, intLevel, this.getName(), jsx3.lang.getCaller(1), objError);
    this._dispatch(record);
  };
  
  /**
   * Log the current stack with a message.
   * @param intLevel {int} the level of the message
   * @param strMessage {String} the message to log, optional argument
   * @param-package intSkip {int}
   */
  Logger_prototype.logStack = function(intLevel, strMessage, intSkip) {
    intLevel = Math.max(intLevel, Logger.MAX_LEVEL);
    if (this._level < intLevel) return;
    
    var record = new Logger.Record(strMessage, null, intLevel, this.getName(), 
        jsx3.lang.getStack(intSkip != null ? intSkip : 0), null);
    this._dispatch(record);
  };
  
  /**
   * Returns true if a log message sent to this logger at level <code>intLevel</code> will be forwarded on to the
   * handlers of this logger.
   * @param intLevel {int} the level to test
   * @return {boolean}
   */
  Logger_prototype.isLoggable = function(intLevel) {
    intLevel = Math.max(intLevel, Logger.MAX_LEVEL);
    return this._level >= intLevel;
  };
  
  /**
   * Log a message at level FATAL. Polymorphic method honors the signature of either <code>log()</code> or 
   * <code>logError()</code> (without the first <code>intLevel</code> parameter).
   * @param strMessage {String} the message to log
   * @param strArgs {Array<String> | String... | jsx3.Exception} either an array of message parameters, variable 
   *   argument message parameters, or an exception; optional argument
   */
  Logger_prototype.fatal = function(strMessage, strArgs) {
    if (strArgs == null || jsx3.$A.is(strArgs))
      this.log(Logger.FATAL, strMessage, strArgs);
    else if (strArgs instanceof Exception)
      this.logError(Logger.FATAL, strMessage, strArgs);
    else if (this._level >= Logger.FATAL)
      this.log(Logger.FATAL, strMessage, Method.argsAsArray(arguments, 1));
  };
  
  /**
   * Log a message at level ERROR. Polymorphic method honors the signature of either <code>log()</code> or
   * <code>logError()</code> (without the first <code>intLevel</code> parameter).
   * @param strMessage {String} the message to log
   * @param strArgs {Array<String> | String... | jsx3.Exception} either an array of message parameters, variable
   *   argument message parameters, or an exception; optional argument
   */
  Logger_prototype.error = function(strMessage, strArgs) {
    if (strArgs == null || jsx3.$A.is(strArgs))
      this.log(Logger.ERROR, strMessage, strArgs);
    else if (strArgs instanceof Exception)
      this.logError(Logger.ERROR, strMessage, strArgs);
    else if (this._level >= Logger.ERROR)
      this.log(Logger.ERROR, strMessage, Method.argsAsArray(arguments, 1));
  };
  
  /**
   * Log a message at level WARN. Polymorphic method honors the signature of either <code>log()</code> or
   * <code>logError()</code> (without the first <code>intLevel</code> parameter).
   * @param strMessage {String} the message to log
   * @param strArgs {Array<String> | String... | jsx3.Exception} either an array of message parameters, variable
   *   argument message parameters, or an exception; optional argument
   */
  Logger_prototype.warn = function(strMessage, strArgs) {
    if (strArgs == null || jsx3.$A.is(strArgs))
      this.log(Logger.WARN, strMessage, strArgs);
    else if (strArgs instanceof Exception)
      this.logError(Logger.WARN, strMessage, strArgs);
    else if (this._level >= Logger.WARN)
      this.log(Logger.WARN, strMessage, Method.argsAsArray(arguments, 1));
  };
  
  /**
   * Log a message at level INFO. Polymorphic method honors the signature of either <code>log()</code> or
   * <code>logError()</code> (without the first <code>intLevel</code> parameter).
   * @param strMessage {String} the message to log
   * @param strArgs {Array<String> | String... | jsx3.Exception} either an array of message parameters, variable
   *   argument message parameters, or an exception; optional argument
   */
  Logger_prototype.info = function(strMessage, strArgs) {
    if (strArgs == null || jsx3.$A.is(strArgs))
      this.log(Logger.INFO, strMessage, strArgs);
    else if (strArgs instanceof Exception)
      this.logError(Logger.INFO, strMessage, strArgs);
    else if (this._level >= Logger.INFO)
      this.log(Logger.INFO, strMessage, Method.argsAsArray(arguments, 1));
  };
  
  /**
   * Log a message at level DEBUG. Polymorphic method honors the signature of either <code>log()</code> or
   * <code>logError()</code> (without the first <code>intLevel</code> parameter).
   * @param strMessage {String} the message to log
   * @param strArgs {Array<String> | String... | jsx3.Exception} either an array of message parameters, variable
   *   argument message parameters, or an exception; optional argument
   */
  Logger_prototype.debug = function(strMessage, strArgs) {
    if (strArgs == null || jsx3.$A.is(strArgs))
      this.log(Logger.DEBUG, strMessage, strArgs);
    else if (strArgs instanceof Exception)
      this.logError(Logger.DEBUG, strMessage, strArgs);
    else if (this._level >= Logger.DEBUG)
      this.log(Logger.DEBUG, strMessage, Method.argsAsArray(arguments, 1));
  };
  
  /**
   * Log a message at level TRACE. Polymorphic method honors the signature of either <code>log()</code> or
   * <code>logError()</code> (without the first <code>intLevel</code> parameter).
   * @param strMessage {String} the message to log
   * @param strArgs {Array<String> | String... | jsx3.Exception} either an array of message parameters, variable
   *   argument message parameters, or an exception; optional argument
   */
  Logger_prototype.trace = function(strMessage, strArgs) {
    if (strArgs == null || jsx3.$A.is(strArgs))
      this.log(Logger.TRACE, strMessage, strArgs);
    else if (strArgs instanceof Exception)
      this.logError(Logger.TRACE, strMessage, strArgs);
    else if (this._level >= Logger.TRACE)
      this.log(Logger.TRACE, strMessage, Method.argsAsArray(arguments, 1));
  };

  Logger_prototype.toString = function() {
    return this.jsxsuper() + " " + this.getName();
  };
 

  // DEPRECATED: remove later

  /**
   * Resets the system out; publishes event to the jsx3.util.Logger.ON_MESSAGE subject.
   * @deprecated no effect
   */
  Logger.reset = function() {
  };

  /**
   * <span style="text-decoration:line-through;">
   * Called by several foundation classes when non-critical errors occur. Basically allows the error to be saved to
   * memory and be queried by the application developer for more-specific information about why a given request may
   * have failed.</span> Sends a log message to the global Logger. Attempts to convert the <code>PRIORITY</code>
   * argument to a valid value for Logger, defaults to INFO.
   *
   * @param strErrorNumber {String} arbitrary identifier passed by the calling function to track the specific location of the error
   * @param strMessage {String} message to describe the error
   * @param PRIORITY {int} one of 1, 2 or 3, with 1 being most serious (red..orange..yellow)
   * @param bTrace {boolean} true if null; if true, the stack trace is printed, displaying the order of the call stack
   * @deprecated  use either <code>jsx3.log</code> or <code>Logger.log()</code>
   * @see jsx3#log()
   * @see #log()
   */
  Logger.doLog = function(strErrorNumber, strMessage, PRIORITY, bTrace) {
    //if no priority is set, make this a low priority
    if (PRIORITY == null) PRIORITY = Logger.INFO;
    else if (PRIORITY < Logger.INFO) PRIORITY = Logger.INFO;
    else PRIORITY = Logger.DEBUG;

    // QUESTION: should we somehow notify that the message has not gone to out?
    if (Logger.GLOBAL) {
      var message = strMessage != null ? "(" + strErrorNumber + ") " + strMessage : strErrorNumber;
      if (bTrace || bTrace == null)
        Logger.GLOBAL.logStack(PRIORITY, message, 1);
      else
        Logger.GLOBAL.log(PRIORITY, message);
    }
  };

  /**
   * Log all properties of an exception to the system log.
   * @param e {object} the exception object to log
   * @param PRIORITY {int} priority of error
   * @deprecated  use instance method <code>Logger.logError()</code>
   */
  Logger.logError = function(e, PRIORITY) {
    var message = "";
    for (var f in e) {
      if (message) message += " ";
      message += f + ":" + e[f];
    }
    Logger.doLog("ERRO01", message, PRIORITY, false);
  };

  /**
   * No errors will be published with priority level less than (integer greater than) this value.
   * @deprecated  use <code>Logger.isLoggable()</code>
   */
  Logger.getMinPriority = function() {
    return 3;
  };

  /**
   * returns the JavaScript Array containing all non-fatal app errors trapped by various foundation classes;
   *            as a developer, you can access a specific error by simply referencing its ordinal index.  This will give
   *            you a handle to the individual error object (a JavaScript object).  You can then query this object for
   *            a specific property, including:  code, description, priority, timestamp.
   *            So, for example, to get the timestamp for the oldest error in the log you would call:   jsx3.util.Logger.getLog[0]["timestamp"]
   * @return {Object} JavaScript Array
   * @deprecated  returns an empty array
   */
  Logger.getLog = function() {
    return [];
  };

  /**
   * returns a text-based version of the error log object.  This is helpful when debugging a JSX application that
   *            doesn't fully initialize. In practice, if you are viewing a web page with an embedded JSX application,
   *            you can type (ctrl + o) to show the browser's 'open' dialog.  From there, enter the following bit of Javascript
   *            to call this function:  javascript:alert(jsx3.util.Logger.toString());
   * @return {String}
   * @deprecated
   */
  Logger.errorToString = function(error) {
    var s = "";
    s+= "TIME: " + new Date(error.timestamp) + "\n";
    s+= "CODE: " + error.code + "\n";
    s+= "DESC: " + error.description + "\n";
    return s;
  };

  /**
   * returns a text-based version of the error log object.  This is helpful when debugging a JSX application that
   *            doesn't fully initialize. In practice, if you are viewing a web page with an embedded JSX application,
   *            you can type (ctrl + o) to show the browser's 'open' dialog.  From there, enter the following bit of Javascript
   *            to call this function:  javascript:alert(jsx3.util.Logger.toString());
   * @return {Object} JavaScript Array
   * @deprecated  Returns empty string.
   */
  Logger.toString = function() {
    return "";
  };

  
});

/**
 * Manager class for the logging system. The singleton instance of this class is configured with the logger 
 * configuration file specified by the system environment variable <code>jsx_logger_config</code>, 
 * or if that is not provided, by the default configuration file located at <code>$GI/logger.xml</code>. 
 * <p/>
 * The DTD of that configuration file is as follows:
 * <pre>
 * &lt;!ELEMENT configuration (handler | logger)* &gt;
 * &lt;!ELEMENT handler (property)* &gt;
 * &lt;!ATTLIST handler name CDATA #REQUIRED
 *                   class CDATA #REQUIRED
 *                   lazy (true|false) "false"
 *                   require (true|false) "false"
 *                   level (OFF|FATAL|ERROR|WARN|INFO|DEBUG|TRACE) #IMPLIED&gt;
 * &lt;!ELEMENT logger (property | handler-ref)* &gt;
 * &lt;!ATTLIST logger name CDATA #REQUIRED
 *                  useParent (true|false) "true"
 *                  level (OFF|FATAL|ERROR|WARN|INFO|DEBUG|TRACE) #IMPLIED&gt;
 * &lt;!-- Properties allow for bean-style configuration of handlers and loggers.
 *      The class should have a setter method corresponding to the name of the 
 *      property. --&gt;
 * &lt;!ELEMENT property (EMPTY)&gt;
 * &lt;!ATTLIST property name CDATA #REQUIRED
 *                    value CDATA #REQUIRED
 *                    eval (true|false) "false"&gt;
 * &lt;!ELEMENT handler-ref (EMPTY)&gt;
 * &lt;!ATTLIST handler-ref name CDATA #REQUIRED&gt;
 * </pre>
 */
jsx3.Class.defineClass('jsx3.util.Logger.Manager', null, null, function(Manager, Manager_prototype) {

  var Exception = jsx3.Exception;
  var Logger = jsx3.util.Logger;
  
  /** @private @jsxobf-clobber */
  Manager.DEFAULT_CONFIG_FILE = "jsx:/../logger.xml";
  /** @private @jsxobf-clobber */
  Manager.ROOT_KEY = "global";
  /** @private @jsxobf-clobber */
  Manager.INSTANCE = null;
  /** @private @jsxobf-clobber @jsxobf-final */
  Manager.LAZY_HANDLER = -1;
  /** @private @jsxobf-clobber */
  Manager.DEFAULT_CONFIG = '<configuration><handler name="console" class="jsx3.util.Logger.ConsoleHandler"/><logger name="global" level="INFO"><handler-ref name="console"/></logger></configuration>';

  /**
   * @param objXML {boolean|jsx3.xml.Document} the logger configuration document. If not provided, the document is loaded
   *    from the expected location. If false, then the default logger configuration is loaded without requesting
   *    the configuration file.
   * @package
   */
  Manager_prototype.initialize = function(objXML) {
    if (objXML === false) {
    } else if (!objXML) {
      var env = jsx3.getEnv("jsx_logger_config");
      if (env == null)
        env = Manager.DEFAULT_CONFIG_FILE;

      if (env)
        objXML = new jsx3.xml.Document().load(env);
    }

    // check error, causes a window.alert() but lets the program continue
    if (objXML && objXML.hasError()) {
      window.alert(jsx3._msg("logr.err_conf", objXML.getError(), jsx3.resolveURI(objXML.getSourceURL())));
      objXML = null;
    }

    if (!objXML)
      objXML = new jsx3.xml.Document().loadXML(Manager.DEFAULT_CONFIG);

    this._config = objXML;

    this._initHandlers();

    for (var f in this._loggers)
      this.addLogger(this._loggers[f]);
  };
  
  /**
   * Singleton accessor method.
   * @return {jsx3.util.Logger.Manager}
   */
  Manager.getManager = function() {
    if (Manager.INSTANCE == null) {
      Manager.INSTANCE = new Manager();
      Logger.GLOBAL = new Logger(Manager.ROOT_KEY);
      Manager.INSTANCE.addLogger(Logger.GLOBAL);
    }
    return Manager.INSTANCE;
  };
  
  /** @private @jsxobf-clobber */
  Manager_prototype._config = null;
  /** @private @jsxobf-clobber */
  Manager_prototype._loggers = null;
  /** @private @jsxobf-clobber */
  Manager_prototype._handlers = null;
  
  /**
   * @private
   */
  Manager_prototype.init = function(objXML) {
    this._loggers = {};
    this._handlers = {};
  };

  /** @private @jsxobf-clobber */
  Manager_prototype._handlerClassDidLoad = function(objClass) {
    var loaded = this._initHandlers("[@lazy='true' and @class='" + objClass.getName() + "']");
    this._wireNewHandlers(loaded);
  };

  /** @private @jsxobf-clobber */
  Manager_prototype._wireNewHandlers = function(handlerNames) {
    for (var i = 0; i < handlerNames.length; i++) {
      var handlerName = handlerNames[i];
      var handler = this.getHandler(handlerName);

      var j = this._config.selectNodeIterator("/configuration/logger[handler-ref/@name='" + handlerName + "']");
      while (j.hasNext()) {
        var node = j.next();
        var loggerName = node.getAttribute('name');
        var logger = this.getLogger(loggerName);
        if (logger != null) {
          logger.addHandler(handler);
        }
      }
    }
  };
 
  /** @private @jsxobf-clobber */
  Manager_prototype._initHandlers = function(strClause) {
    var initedNames = [];
    if (! this._config) return initedNames;

    var i = this._config.selectNodeIterator("/configuration/handler" + (strClause != null ? strClause : ""));

    var bNeedsJob = this._classesToLoad == null;

    while (i.hasNext()) {
      var node = i.next();
      var strName = node.getAttribute("name");
      if (this.getHandler(strName) != null) continue;
      
      var strClass = node.getAttribute("class");
      var bLazy = node.getAttribute("lazy") == "true";
      var bRequire = node.getAttribute("require") == "true";
      
      var objClass = jsx3.Class.forName(strClass);
      if (objClass == null && bRequire) {
        if (this._classesToLoad == null) {
          /* @jsxobf-clobber */
          this._classesToLoad = [];
        }
        this._classesToLoad.push(strClass);
        this._handlers[strName] = Manager.LAZY_HANDLER;
        continue;
      }
      
      if (objClass) {
        var handler = objClass.newInstance(strName);
        this._initBean(handler, node);
        handler.onAfterInit();
        
        var strLevel = node.getAttribute('level');
        if (strLevel && typeof(Logger[strLevel]) == "number")
          handler.setLevel(Logger[strLevel]);
        
        this.addHandler(handler);
        initedNames[initedNames.length] = strName;
      } else if (!bLazy && !bRequire) {
        window.alert(jsx3._msg("logr.no_class", strClass));
      } else {
        this._handlers[strName] = Manager.LAZY_HANDLER;
      }
    }

    if (bNeedsJob && this._classesToLoad != null) {
      var me = this;
      var job = new jsx3.util.Job("logger.require");
      job.run = function() {
        // make this asynchronous to prevent race conditions from causing double-registration of required handlers
        jsx3.sleep(function() {this._onClassLoaderRest();}, null, me);
      };
      jsx3.CLASS_LOADER.addJob(job, "jsx.js");
    }
    
    return initedNames;
  };
  
  /** @private @jsxobf-clobber */
  Manager_prototype._onClassLoaderRest = function(objEvent) {
    jsx3.requireAsync.apply(jsx3, this._classesToLoad).when(jsx3.$F(function() {
      delete this._classesToLoad;

      var loaded = this._initHandlers("[@require='true']");
      this._wireNewHandlers(loaded);
    }).bind(this));    
  };
  
  /** @private @jsxobf-clobber */
  Manager_prototype._initBean = function(obj, objNode) {
    var objClass = obj.getClass();

    for (var i = objNode.selectNodeIterator("./property"); i.hasNext(); ) {
      var child = i.next();

      var strName = child.getAttribute("name");
      var strValue = child.getAttribute("value");
      var bEval = child.getAttribute("eval") == "true";

      var objSetter = objClass.getSetter(strName);
      if (objSetter != null) {
        if (bEval) {
          try {
            strValue = isNaN(strValue) ? obj.eval(strValue) : Number(strValue);
          } catch (e) {
            throw new Exception(jsx3._msg("logr.bn_eval", strName, strValue, obj), jsx3.NativeError.wrap(e));
          }
        }
        objSetter.apply(obj, [strValue]);
      } else {
        throw new Exception(jsx3._msg("logr.bn_setr", strName, objClass));
      }
    }
  };
  
  /**
   * Add a Logger instance to the manager's registry.
   * @param objLogger {jsx3.util.Logger}
   */  
  Manager_prototype.addLogger = function(objLogger) {
    var strName = objLogger.getName();
    this._loggers[strName] = objLogger;

    if (this._config) {
      var loggerNode = this._config.selectSingleNode("/configuration/logger[@name='" + strName + "']");

      // configure new logger from its own node
      if (loggerNode != null) {
        var strLevel = loggerNode.getAttribute('level');
        if (strLevel && typeof(Logger[strLevel]) == "number")
          objLogger.setLevel(Logger[strLevel]);

        var bUseParent = loggerNode.getAttribute('useParent') != "false";
        objLogger.setUseParentHandlers(bUseParent);

        var i = loggerNode.selectNodeIterator("./handler-ref");
        while (i.hasNext()) {
          var handlerNode = i.next();
          var strId = handlerNode.getAttribute('name');
          var handler = this.getHandler(strId);
          if (handler != null) {
            objLogger.addHandler(handler);
          } else if (this._handlers[strId] != Manager.LAZY_HANDLER) {
            throw new Exception(jsx3._msg("logr.no_hand", strName, strId));
          }
        }

        this._initBean(objLogger, loggerNode);
      }
    }
    
    // find its parent
    if (strName != Manager.ROOT_KEY) {
      var index = strName.lastIndexOf(".");
      var parentName = index >= 0 ? strName.substring(0, index) : Manager.ROOT_KEY;
      // recursive call to create the parent
      objLogger.setParent(Logger.getLogger(parentName));
    }
    
    // no need to find children among existing loggers, because parents are always initialized with children
  };
  
  /**
   * Add a Handler instance to this manager's registry.
   * @param objHandler {jsx3.util.Logger.Handler}
   */
  Manager_prototype.addHandler = function(objHandler) {
    this._handlers[objHandler.getName()] = objHandler;
  };

  /**
   * Returns a Logger from this manager's registry by name, or null if no such Logger is registered.
   * @return {jsx3.util.Logger}
   */
  Manager_prototype.getLogger = function(strName) {
    return this._loggers[strName];
  };
  
  /**
   * Returns a Handler from the manager's registry by name, or null if no such Handler is registered.
   * @return {jsx3.util.Logger.Handler}
   */
  Manager_prototype.getHandler = function(strName) {
    var handler = this._handlers[strName];
    return handler == Manager.LAZY_HANDLER ? null : handler;
  };
  
  /**
   * Returns a list containing the names of all the handlers registered with this manager.
   * @return {Array<String>}
   */
  Manager_prototype.getHandlerNames = function() {
    var keys = [];
    for (var f in this._handlers)
      keys[keys.length] = f;
    return keys;
  };
  
});

/**
 * Record bean that stores information about a logging message.
 */
jsx3.Class.defineClass('jsx3.util.Logger.Record', null, null, function(Record, Record_prototype) {

  /** @private @jsxobf-clobber */
  Record.SERIAL = 1;
  
  /** @private @jsxobf-clobber */
  Record_prototype._serial = null;
  /** @private @jsxobf-clobber */
  Record_prototype._date = null;
  /** @private @jsxobf-clobber */
  Record_prototype._message = null;
  /** @private @jsxobf-clobber */
  Record_prototype._params = null;
  /** @private @jsxobf-clobber */
  Record_prototype._level = null;
  /** @private @jsxobf-clobber */
  Record_prototype._logger = null;
  /** @private @jsxobf-clobber */
  Record_prototype._stack = null;
  /** @private @jsxobf-clobber */
  Record_prototype._error = null;

  /**
   * Instance initializer.
   * @param strMessage {String}
   * @param arrParams {Array<Object>}
   * @param intLevel {int}
   * @param strLogger {String}
   * @param arrStack {Function | Array<Function>}
   * @param objError {jsx3.Exception}
   */
  Record_prototype.init = function(strMessage, arrParams, intLevel, strLogger, arrStack, objError) {
    this._serial = Record.SERIAL++;
    this._date = new Date();
    this._message = strMessage;
    this._params = arrParams;
    this._level = intLevel;
    this._logger = strLogger;
    this._stack = arrStack;
    this._error = objError;
  };
  
  /**
   * Returns this record's serial number. Every record that is created is assigned a serial number, beginning with 1.
   * @return {int}
   */
  Record_prototype.getSerial = function() {
    return this._serial;
  };
  
  /**
   * Returns the current date when this record was created.
   * @return {Date}
   */
  Record_prototype.getDate = function() {
    return this._date;
  };
  
  /**
   * Returns the raw message of this record.
   * @return {String}
   */
  Record_prototype.getMessage = function() {
    return this._message;
  };
  
  /**
   * Returns the message parameters of this record.
   * @return {Array<Object>}
   */
  Record_prototype.getParameters = function() {
    return this._params;
  };
  
  /**
   * Returns the logging level that this record was created with.
   * @return {int}
   */
  Record_prototype.getLevel = function() {
    return this._level;
  };
  
  /**
   * Returns the name of the logger that created this record.
   * @return {String}
   */
  Record_prototype.getLoggerName = function() {
    return this._logger;
  };
  
  /**
   * Returns the JavaScript function that called the Logger message that created this record.
   * @return {Function}
   */
  Record_prototype.getFunction = function() {
    return typeof(this._stack) == "function" ? this._stack : null;
  };
  
  /**
   * Returns the complete JavaScript stack from when this record was created. May be null or empty if the record
   * was not specified to store the stack.
   * @return {Array<Function>}
   */
  Record_prototype.getStack = function() {
    return jsx3.$A.is(this._stack) ? this._stack : null;
  };
  
  /**
   * Returns the exception that this record was created with. Will only be defined if this record was created through
   * a call to <code>Logger.logError()</code> or similar.
   * @return {jsx3.Exception}
   */
  Record_prototype.getError = function() {
    return this._error;
  };
  
});

/**
 * The base logging handler class. Handlers receive log records from loggers and output (or ignore) them in some way.
 * <p/>
 * Concrete subclasses of this class must implement the <code>handle()</code> method. This method defines what
 * to do to "handle" the logging record. This method does not need to check the handler's level against the level
 * of the record. The the logger does this before calling <code>handle()</code> and will not call 
 * <code>handle()</code> if the record's level is not severe enough.
 */
jsx3.Class.defineClass('jsx3.util.Logger.Handler', null, null, function(Handler, Handler_prototype) {

  var Logger = jsx3.util.Logger;
  var Manager = jsx3.util.Logger.Manager;
  
  /**
   * Call this method to let the logging system know that a new subclass of Handler has been defined. Handlers may
   * be defined in the configuration file to be lazy. The class of a lazy handler is not required to exist when the 
   * logging system initializes. However, for the lazy handler to be instantiated, this method must be called to let
   * the logging system know that the necessary class has loaded.
   * 
   * @param objClass {jsx3.Class} the subclass of Handler that was defined
   */
  Handler.registerHandlerClass = function(objClass) {
    Manager.getManager()._handlerClassDidLoad(objClass);
  };
  
  /** @private @jsxobf-clobber */
  Handler_prototype._name = "";
  /** @private @jsxobf-clobber */
  Handler_prototype._level = null;
  
  /**
   * @param strName {String} the name to assign this handler
   */
  Handler_prototype.init = function(strName) {
    this._name = strName;
  };

  Handler_prototype.onAfterInit = function() {};
  
  /**
   * Returns the name of this Handler.
   * @return {String}
   */
  Handler_prototype.getName = function() {
    return this._name;
  };
  
  /**
   * Returns the level of this handler. May be <code>null</code> if no level has been specified.
   * @return {int}
   */
  Handler_prototype.getLevel = function() {
    return this._level;
  };
  
  /**
   * Sets the level of this handler. 
   * @return {int} one of FATAL to TRACE, OFF, or null
   */
  Handler_prototype.setLevel = function(intLevel) {
    intLevel = Math.max(Logger.OFF, Math.min(Logger.MIN_LEVEL, intLevel));
    this._level = intLevel;
  };
    
  /**
   * Returns true if a log message sent to this handler at level <code>intLevel</code> will be processed rather than
   * ignored.
   * @param intLevel {int} the level to test
   * @return {boolean}
   */
  Handler_prototype.isLoggable = function(intLevel) {
    return this._level == null || this._level >= intLevel;
  };
  
  /**
   * Concrete subclasses of this class must implement this method, which defines how a log record is handled.
   * @param objRecord {jsx3.util.Logger.Record}
   */
  Handler_prototype.handle = jsx3.Method.newAbstract('objRecord');
  
});

/**
 * A simple Handler class that stores a rotating cache of log records in memory.
 * <p/>
 * May be configured with the <code>bufferSize</code> property (default 100).
 */
jsx3.Class.defineClass('jsx3.util.Logger.MemoryHandler', jsx3.util.Logger.Handler, null, function(MemoryHandler, MemoryHandler_prototype) {

  /** @private @jsxobf-clobber */
  MemoryHandler_prototype._buffer = null;
  /** @private @jsxobf-clobber */
  MemoryHandler_prototype._bufferSize = 100;

  /**
   * Instance initializer.
   */
  MemoryHandler_prototype.init = function(strName) {
    this.jsxsuper(strName);
    this._buffer = [];
  };
  
  /**
   * Stores the log record in memory. Removes the oldest record if the buffer is full.
   * @param objRecord {jsx3.util.Logger.Record}
   */
  MemoryHandler_prototype.handle = function(objRecord) {
    // TODO: make more efficient, is Array implementation a linked list? probably not
    this._buffer[this._buffer.length] = objRecord;
    
    if (this._buffer.length > this._bufferSize)
      this._buffer.shift();
  };
  
  /**
   * Clears the contents of the buffer.
   */
  MemoryHandler_prototype.clearBuffer = function() {
    this._buffer = [];
  };
  
  /**
   * Returns the size of the buffer. This handler will store at most this many log records before discarding old ones.
   * @return {int}
   */
  MemoryHandler_prototype.getBufferSize = function() {
    return this._bufferSize;
  };
  
  /**
   * Sets the size of the buffer. If this operation decreases the size of the buffer, log records may be discarded.
   * @param intBufferSize {int}
   */
  MemoryHandler_prototype.setBufferSize = function(intBufferSize) {
    this._bufferSize = Math.max(1, intBufferSize);
    
    if (this._buffer.length > this._bufferSize)
      this._buffer.splice(0, this._buffer.length - this._bufferSize);
  };
  
  /**
   * Returns the contents of the record buffer.
   * @param intCount {int} the number of records to return, the most recently added records will be returned. Pass <code>null</code> to get all records.
   * @return {Array<jsx3.util.Logger.Record>}
   */
  MemoryHandler_prototype.getRecords = function(intCount) {
    if (intCount == null) intCount = this._buffer.length;
    return this._buffer.slice(this._buffer.length - intCount);
  };
  
});

/**
 * A subclass of <code>Handler</code> that includes functionality for formatting logging records as human-readable
 * strings.
 * <p/>
 * The following tokens are supported in the format:
 * <ul>
 * <li>%s or {0} &#8211; record serial number</li>
 * <li>%n or {1}  &#8211; logger name</li>
 * <li>%l or {2}  &#8211; record level as string</li>
 * <li>%M or {3}  &#8211; record message</li>
 * <li>%f or {4}  &#8211; record calling function</li>
 * <li>%d or {5,date}  &#8211; record date as yyyy-MM-dd</li>
 * <li>%t or {5,time} &#8211; record time as HH:mm:ss.mmm</li>
 * </ul>
 */
jsx3.Class.defineClass('jsx3.util.Logger.FormatHandler', jsx3.util.Logger.Handler, null, function(FormatHandler, FormatHandler_prototype) {

  /** @private @jsxobf-clobber */
  FormatHandler_prototype._format = "%d %t %n (%l) - %M";
  /** @private @jsxobf-clobber */
  FormatHandler_prototype._dynaPropUrls = "";

  FormatHandler_prototype.init = function(strName) {
    this.jsxsuper(strName);
  };
  
  FormatHandler_prototype.format = function(objRecord) {
    var date = objRecord.getDate();
    var funct = objRecord.getFunction();
    var message = objRecord.getMessage() || ""; // TODO: need to do message format

    var mf = this._getMessageFormat();
    var levelString = jsx3.util.Logger.levelAsString(objRecord.getLevel());
    // mf may be null if the MessageFormat class is not available
    var output = mf ? mf.format(
        objRecord.getSerial(),
        objRecord.getLoggerName(),
        levelString,
        message,
        funct != null ? (funct.jsxmethod != null ? funct.jsxmethod.toString() : funct.toString()) : "",
        date
      ) : date + " " + objRecord.getLoggerName() + " (" + levelString + ") " + message;
    var error = objRecord.getError();
    var stack = objRecord.getStack();
    
    if (error != null) {
      output += "\n" + error.printStackTrace();
    } else if (stack != null) {
      output += "\n" + jsx3.Exception.formatStack(stack);
    }
    
    return output;
  };
  
  /**
   * Returns the format to use for formatting logging records.
   * @return {String}
   */
  FormatHandler_prototype.getFormat = function() {
    return this._format;
  };
  
  /**
   * Sets the format to use for formatting logging records.
   * @param strFormat {String}
   */
  FormatHandler_prototype.setFormat = function(strFormat) {
    this._format = strFormat;
    this._messageformat = null;
  };
  
  /** @private @jsxobf-clobber */
  FormatHandler_prototype._getMessageFormat = function() {
    // jsx3.util.MessageFormat class is optional, should work without it
    if (this._messageformat == null && jsx3.util.MessageFormat) {
      var f = this._format || "";
      f = f.replace(/\%s/g, "{0}");
      f = f.replace(/\%n/g, "{1}");
      f = f.replace(/\%l/g, "{2}");
      f = f.replace(/\%M/g, "{3}");
      f = f.replace(/\%f/g, "{4}");
      f = f.replace(/\%d/g, "{5,date,yyyy-MM-dd}");
      f = f.replace(/\%t/g, "{5,date,HH:mm:ss.SSS}");
      /* @jsxobf-clobber */
      this._messageformat = new jsx3.util.MessageFormat(f);
    }
    return this._messageformat;
  };

  FormatHandler_prototype.getResourceUrls = function() {
    return this._dynaPropUrls;
  };
  
  /**
   * Sets the URLs where dynamic properties files reside. These files specify the message resources to use
   * for this handler. If a log record is passed to this handler whose message matches a key in one of the jss files,
   * the value of that resource is formatted in place of the message key.
   *
   * @param strURLs {String} space-delimited list of URLs
   * @private  not yet implemented
   */
  FormatHandler_prototype.setResourceUrls = function(strURLs) {
    this._dynaPropUrls = strURLs;
  };
  
});

/**
 * Handles a logging record by sending it to the Firebug console.
 */
jsx3.Class.defineClass('jsx3.util.Logger.ConsoleHandler', jsx3.util.Logger.FormatHandler, null,
    function(ConsoleHandler, ConsoleHandler_prototype) {

  // maps logger levels to console method names
  var methods = [null, "error", "error", "warn", "info", "debug", "debug"];

  ConsoleHandler_prototype.handle = function(objRecord) {
    if (window.console) {
      var method = methods[objRecord.getLevel()];
      if (method) {
        try {
          // GI-808: IE8 doesn't define the console.debug() method, so default to console.log()
          (console[method] || console.log)(this.format(objRecord));
        } catch (e) {}
      }
    }
  };

});

/**
 * Handles a logging record by sending it to a JavaScript alert.
 */
jsx3.Class.defineClass('jsx3.util.Logger.AlertHandler', jsx3.util.Logger.FormatHandler, null,
    function(AlertHandler, AlertHandler_prototype) {

  /** @private @jsxobf-clobber */
  AlertHandler_prototype._interval = 5;
  /** @private @jsxobf-clobber */
  AlertHandler_prototype._counter = 0;
  /** @private @jsxobf-clobber */
  AlertHandler_prototype._disabled = false;

  AlertHandler_prototype.handle = function(objRecord) {
    if (this._disabled) return;
    this._counter++;

    try {
      if (this._interval > 0 && (this._counter % this._interval) == 0) {
        if (! window.confirm(jsx3._msg("logr.alrt_ctd", this.getName()))) {
          this._disabled = true;
          return;
        }
      }

      window.alert(this.format(objRecord));
    } catch (e) {
      window.alert(jsx3._msg("logr.alrt_err", jsx3.NativeError.wrap(e)));
    }
  };

  /**
   * Returns the message interval at which the user has the opportunity to disable this handler.
   * @return {int}
   */
  AlertHandler_prototype.getConfirmInterval = function() {
    return this._interval;
  };

  /**
   * Sets the message interval at which the user has the opportunity to disable this handler.
   * @param intInterval {int}
   */
  AlertHandler_prototype.setConfirmInterval = function(intInterval) {
    this._interval = intInterval;
  };

});


/**
 * @deprecated  Renamed to jsx3.util.Logger
 * @see jsx3.util.Logger
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.ERROR", -, null, function(){});
 */
jsx3.ERROR = jsx3.util.Logger;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Represents a region of the world. Other classes may be localized, meaning that their behavior depends on
 * their assigned locale.
 *
 * @since 3.2
 */
jsx3.Class.defineClass('jsx3.util.Locale', null, null, function(Locale, Locale_prototype) {
      
  /**
   * The instance initializer.
   * @param strLanguage {String} the lowercase two letter ISO-639 language code.
   * @param strCountry {String} the uppercase two letter ISO-3166 country code.
   */
  Locale_prototype.init = function(strLanguage, strCountry) {
    /* @jsxobf-clobber */
    this._lang = strLanguage ? strLanguage.toLowerCase() : "";
    /* @jsxobf-clobber */
    this._country = strCountry ? strCountry.toUpperCase() : "";
  };
  
  /** {jsx3.util.Locale} The root locale. */
  Locale.ROOT = new Locale("");
  /** {jsx3.util.Locale} Locale for English (country unspecified). */
  Locale.ENGLISH = new Locale("en");
  /** {jsx3.util.Locale} Locale for United States of America. */
  Locale.US = new Locale("en", "US");
  /** {jsx3.util.Locale} Locale for United Kingdom. */
  Locale.UK = new Locale("en", "GB");
    
  /**
   * Returns the lowercase two letter ISO-639 language code.
   * @return {String}
   */
  Locale_prototype.getLanguage = function() {
    return this._lang;
  };
  
  /**
   * Returns the uppercase two letter ISO-3166 country code.
   * @return {String}
   */
  Locale_prototype.getCountry = function() {
    return this._country;
  };
  
  /**
   * Returns the language of this locale, localized for <code>objLocale</code>.
   * @param objLocale {jsx3.util.Locale} the locale in which to format the language. If this parameter is not 
   *   provided, the system locale is used.
   * @return {String}
   */
  Locale_prototype.getDisplayLanguage = function(objLocale) {
    return jsx3.System.getLocaleProperties(objLocale).get("string.lang." + this._lang) || "";
  };
  
  /**
   * Returns the country of this locale, localized for <code>objLocale</code>.
   * @param objLocale {jsx3.util.Locale} the locale in which to format the country. If this parameter is not 
   *   provided, the system locale is used.
   * @return {String}
   */
  Locale_prototype.getDisplayCountry = function(objLocale) {
    return jsx3.System.getLocaleProperties(objLocale).get("string.terr." + this._country) || "";
  };
  
  /**
   * Returns the language and country of this locale, localized for <code>objLocale</code>.
   * @param objLocale {jsx3.util.Locale} the locale in which to format the language and country. If this parameter is not 
   *   provided, the system locale is used.
   * @return {String}
   */
  Locale_prototype.getDisplayName = function(objLocale) {
    var language = this.getDisplayLanguage(objLocale);
    var country = this.getDisplayCountry(objLocale);
    if (! language) return country;
    if (! country) return language;
    
    var format = jsx3.System.getLocaleProperties(objLocale).get("format.locale.displayname");
    return (new jsx3.util.MessageFormat(format)).format(language, country);
  };

  /**
   * @package
   */
  Locale_prototype.getSearchPath = function() {
    var path = [this];
    if (this._country != "" || this._lang != "") {
      if (this._country != "" && this._lang != "")
        path.push(new Locale(this._lang));
      path.push(new Locale(""));
    }
    return path;
  };
  
  /**
   * Returns true if <code>obj</code> is equal to this locale.
   * @param obj {Object}
   * @return {boolean}
   */
  Locale_prototype.equals = function(obj) {
    return this === obj || (obj instanceof Locale && obj._lang == this._lang && obj._country == this._country);
  };
  
  /**
   * @return {String}
   */
  Locale_prototype.toString = function() {
    if (this._country)
      return this._lang + "_" + this._country;
    else
      return this._lang;
  };
  
  /**
   * Returns a locale instance represented by <code>strKey</code>.
   * @param strKey {String} the locale key, <code>ll_CC</code>, where <code>ll</code> is the two letter language 
   *   code and <code>CC</code> is the two letter country code.
   * @return {jsx3.util.Locale}
   */
  Locale.valueOf = function(strKey) {
    var tokens = strKey.split(/[\-_]/);
    return new Locale(tokens[0], tokens[1]);
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
 * Formats numbers. This class in localized, meaning that numbers are formatted in a locale-sensitive way.
 * <p/>
 * The format takes the form: <code>Prefix Format Suffix</code>. A single number format can specify a format for
 * a positive value and one for a negative value. In this case the form is: <code>PosPrefix PosFormat
 * PosSuffix;NegPrefix NegFormat NegSuffix</code>. (The spaces between prefix, format, and suffix should not be
 * included in the actual format.)
 * <p/>
 * The format can include the following characters. Each character is replaced with the locale-specific text when
 * a number is formatted.
 * <ul>
 * <li><code>0</code> - Digit</li>
 * <li><code>#</code> - Digit, zero shows as absent</li>
 * <li><code>.</code> - Decimal separator or monetary decimal separator</li>
 * <li><code>-</code> - Minus sign</li>
 * <li><code>,</code> - Grouping separator</li>
 * <li><code>;</code> - Separates positive and negative subpatterns</li>
 * <li><code>%</code> - Multiply by 100 and show as percentage</li>
 * <li><code>&#x2030;</code> - Multiply by 1000 and show as per-mille</li>
 * <li><code>&#x00A4;</code> - Currency sign, replaced by currency symbol</li>
 * <li><code>'</code> - Used to quote special characters in a prefix or suffix. To create a single quote
 *     itself, use two in a row</li>
 * </ul>
 *
 * @since 3.2
 */
jsx3.Class.defineClass('jsx3.util.NumberFormat', null, null, function(NumberFormat, NumberFormat_prototype) {

  /**
   * {int} Type for a decimal number format.
   * @final @jsxobf-final
   * @since 3.7
   */
  NumberFormat.NUMBER = 1;

  /**
   * {int} Type for an integer number format.
   * @final @jsxobf-final
   * @since 3.7
   */
  NumberFormat.INTEGER = 2;

  /**
   * {int} Type for a currency number format.
   * @final @jsxobf-final
   * @since 3.7
   */
  NumberFormat.CURRENCY = 3;

  /**
   * Returns a number format appropriate for <code>objLocale</code>.
   * @param intType {int} <code>NUMBER</code>, <code>INTEGER</code>, or <code>CURRENCY</code>.
   * @param objLocale {jsx3.util.Locale} the locale for which to return a format. If this parameter is not provided,
   *   the default system locale is used.
   * @return {jsx3.util.NumberFormat}
   * @since 3.7
   */
  NumberFormat.getInstance = function(intType, objLocale) {
    switch (intType) {
      case NumberFormat.INTEGER: return NumberFormat.getIntegerInstance(objLocale);
      case NumberFormat.CURRENCY: return NumberFormat.getCurrencyInstance(objLocale);
      default: return NumberFormat.getNumberInstance(objLocale);
    }
  };

  /**
   * Returns an integer number format appropriate for <code>objLocale</code>.
   * @param objLocale {jsx3.util.Locale} the locale for which to return a format. If this parameter is not provided,
   *   the default system locale is used.
   * @return {jsx3.util.NumberFormat}
   */
  NumberFormat.getIntegerInstance = function(objLocale) {
    return NumberFormat._getInstance(objLocale, ".integer");
  };
  
  /**
   * Returns a general number format appropriate for <code>objLocale</code>.
   * @param objLocale {jsx3.util.Locale} the locale for which to return a format. If this parameter is not provided,
   *   the default system locale is used.
   * @return {jsx3.util.NumberFormat}
   */
  NumberFormat.getNumberInstance = function(objLocale) {
    return NumberFormat._getInstance(objLocale, "");
  };
  
  /**
   * Returns a currency number format appropriate for <code>objLocale</code>.
   * @param objLocale {jsx3.util.Locale} the locale for which to return a format. If this parameter is not provided,
   *   the default system locale is used.
   * @return {jsx3.util.NumberFormat}
   */
  NumberFormat.getCurrencyInstance = function(objLocale) {
    return NumberFormat._getInstance(objLocale, ".currency");
  };
  
  /**
   * Returns a percent number format appropriate for <code>objLocale</code>.
   * @param objLocale {jsx3.util.Locale} the locale for which to return a format. If this parameter is not provided,
   *   the default system locale is used.
   * @return {jsx3.util.NumberFormat}
   */
  NumberFormat.getPercentInstance = function(objLocale) {
    return NumberFormat._getInstance(objLocale, ".percent");
  };

  /** @private @jsxobf-clobber */
  NumberFormat._getInstance = function(objLocale, type) {
    var props = NumberFormat._getProps(objLocale);
    var cacheKey = "format.number" + type + "._instance";
    
    var instance = props.get(cacheKey);
    if (!props.containsKey(cacheKey) || instance == null) {
      var format = props.get("format.number" + type);
      instance = new NumberFormat(format, objLocale);
      props.set(cacheKey, instance);
    }
    return instance;
  };
  
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.grouping = 0;
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.posprefix = "";
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.possuffix = "";
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.negprefix = null;
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.negsuffix = null;
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.showdec = false;
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.maxintdigit = Number.MAX_VALUE;
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.minintdigit = 0;  
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.maxdecdigit = 0;  
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.mindecdigit = 0;
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.multiplier = 1;  
  /** @private @jsxobf-clobber */
  NumberFormat_prototype.currency = false;  
  
  /**
   * Creates a new number format instance.
   * @param strFormat {String} the number format.
   * @param objLocale {jsx3.util.Locale} the locale for the format. By default the system locale is used.
   * @throws {jsx3.Exception} if <code>strFormat</code> cannot be parsed.
   */
  NumberFormat_prototype.init = function(strFormat, objLocale) {
    /* @jsxobf-clobber */
    this._format = strFormat;
    /* @jsxobf-clobber */
    this._locale = objLocale || jsx3.System.getLocale();
    this._initFormat();
  };
  
  /**
   * @return {jsx3.util.Locale}
   */
  NumberFormat_prototype.getLocale = function() {
    return this._locale;
  };
  
  /**
   * @param objLocale {jsx3.util.Locale}
   */
  NumberFormat_prototype.setLocale = function(objLocale) {
    this._locale = objLocale;
    this._initFormat();
  };
  
  /**
   * @param number {String|Object|Number}
   * @return {String}
   */
  NumberFormat_prototype.format = function(number) {
    var props = this._getProps();
    
    if (isNaN(number)) {
      return props.get('number.NaN');
    } else {
      if (typeof(number) != "number")
        number = Number(number);

      var pos = number >= 0;
      var prefix = pos ? this.posprefix : 
          (this.negprefix != null ? this.negprefix : props.get('number.minus') + this.posprefix);
      var suffix = pos ? this.possuffix :
          (this.negsuffix != null ? this.negsuffix : this.possuffix);
      
      var numberPart = null;
      if (! isFinite(number)) {
        numberPart = props.get('number.infinity');
      } else {
        number = this.multiplier * Math.abs(number);
        
        var digitsDecimal = NumberFormat._numToDigitArray(number);
        var digits = digitsDecimal[0];
        var decimalIndex = digitsDecimal[1];
        
        // handle rounding
        if (this.maxdecdigit < digits.length - decimalIndex) {
          var remainder = digits.splice(decimalIndex + this.maxdecdigit, digits.length - decimalIndex - this.maxdecdigit);
          if (NumberFormat._roundDigits(digits, remainder))
            decimalIndex++;
        }
        
        var intDigits = decimalIndex >= 0 ? digits.slice(0, decimalIndex) : digits;
        var decDigits = decimalIndex >= 0 ? digits.slice(decimalIndex) : [];
        
        // trim digits
        NumberFormat._constrainDigitArray(intDigits, this.maxintdigit, this.minintdigit, true);
        NumberFormat._constrainDigitArray(decDigits, this.maxdecdigit, this.mindecdigit, false);
        
        var zero = props.get("number.zero");
        NumberFormat._localizeDigits(intDigits, zero);
        NumberFormat._localizeDigits(decDigits, zero);
        
        if (this.grouping > 0) {
          var groupingSymbol = this._getGrouping(this.currency);

          for (var i = intDigits.length - this.grouping; i >= 1; i-=this.grouping)
            intDigits.splice(i, 0, groupingSymbol);
        }
        
        numberPart = intDigits.join("");
        if (this.showdec || decDigits.length > 0)
          numberPart += this._getDecimal(this.currency) + decDigits.join("");
      }
      
      return prefix + numberPart + suffix;
    }
  };

  /** @private @jsxobf-clobber */
  NumberFormat._FMT = /\-?(\d+(\.\d*)?|\d*\.\d+)([eE]\-?\d+)?/;

  /**
   * Parses a string according to this number format and returns the resulting value.
   * <b/>
   * <b>Note:</b> this method ignores any non-significant characters. This method does not handle
   * localized digit characters other than ASCII 0-9.
   *
   * @param s {String}
   * @return {Number}
   * @since 3.7
   */
  NumberFormat_prototype.parse = function(s) {
    var props = this._getProps();

    if (s == props.get('number.NaN'))
      return NaN;

    var neg = false;
    var multi = 1;
    var currency = false;

    var negSign = props.get("number.minus");

    // check for negative prefix and suffix
    var negPre = this.negprefix, negSuf = this.negsuffix;
    if (negPre || negSuf) {
      negPre = this._preSufStr(negPre, props);
      negSuf = this._preSufStr(negSuf, props);
      if (s.indexOf(negPre) == 0 &&
          s.lastIndexOf(negSuf) == s.length - negSuf.length) {
        neg = true;

        // remove any negative signs that were part of the negative prefix/suffix
        s = negPre.replace(negSign, "") +
            s.substring(negPre.length, s.length - negSuf.length) +
            negSuf.replace(negSign, "");
      }
    }

    // check for negative sign
    var negIndex = s.indexOf(negSign);
    if (negIndex == 0) {
      neg = true;
      s = s.substring(0, negIndex) + s.substring(negIndex + negSign.length);
    }

    // check for percent and permille signs
    var pctSign = props.get("number.percent");
    var pctIndex = s.indexOf(pctSign);
    if (pctIndex >= 0) {
      multi = 100;
      s = s.substring(0, pctIndex) + s.substring(pctIndex + pctSign.length);
    } else {
      var milleSign = props.get("number.permille");
      pctIndex = s.indexOf(milleSign);
      if (pctIndex >= 0) {
        multi = 1000;
        s = s.substring(0, pctIndex) + s.substring(pctIndex + milleSign.length);
      }
    }

    // remove currency sign
    var curSign = props.get("number.currency");
    var curIndex = s.indexOf(curSign);
    if (curIndex >= 0) {
      currency = true;
      s = s.substring(0, curIndex) + s.substring(curIndex + curSign.length);
    }

    // check for infinity
    if (s == props.get('number.infinity'))
      return neg ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;

    var regex = /[\s\u00a0]/g; // Safari 3 incorrectly fails to match nbsp to \s
    s = s.replace(regex, " ");
    // remove grouping separators
    var groupingSymbol = this._getGrouping(currency).replace(regex, " ");
    if (groupingSymbol) {
      var groupIndex = -1;
      while ((groupIndex = s.indexOf(groupingSymbol)) >= 0) {
        s = s.substring(0, groupIndex) + s.substring(groupIndex + groupingSymbol.length);
      }
    }

/*
    // replace digits
    var zero = props.get("number.zero");
    if (zero != "0") {
      // TODO: not implemented
    }
*/

    // replace decimal
    var decimalSymbol = this._getDecimal(currency).replace(regex, " ");
    if (decimalSymbol != ".") {
      var decIndex = s.indexOf(decimalSymbol);
      if (decIndex >= 0) {
        s = s = s.substring(0, decIndex) + "." + s.substring(decIndex + groupingSymbol.length);
      }
    }

    if (!NumberFormat._FMT.exec(s))
      return NaN;

    return (neg ? -1 : 1) * Number(RegExp.lastMatch) / multi;
  };

  /** @private @jsxobf-clobber */
  NumberFormat_prototype._getGrouping = function(bCur) {
    var props = this._getProps();
    return (bCur && props.get('number.currency.grouping')) || props.get('number.grouping') || "";
  };

  /** @private @jsxobf-clobber */
  NumberFormat_prototype._getDecimal = function(bCur) {
    var props = this._getProps();
    return bCur ?
       (props.get('number.currency.decimal') || props.get('number.decimal')) :
        props.get('number.decimal');
  };

  /** @private @jsxobf-clobber */
  NumberFormat._zeroCode = "0".charCodeAt(0);
  /** @private @jsxobf-clobber */
  NumberFormat._digitCode = ".".charCodeAt(0);

  /** @private @jsxobf-clobber */
  NumberFormat._numToDigitArray = function(number) {
    if (number < 0) throw new jsx3.Exception();
    var log = Math.log(number) * jsx3.LOG10E;
    
    if (! isFinite(log)) {
      if (number == 0) return [[0], 1];
      throw new jsx3.Exception();
    }

    var asString = number.toString();
    var digits = [];
    var decimal = null;
    
    for (var i = 0; i < asString.length; i++) {
      var code = asString.charCodeAt(i);
      var dec = code - NumberFormat._zeroCode;
      if (dec >= 0 && dec <= 9) {
        digits[digits.length] = dec;
      } else if (code == NumberFormat._digitCode) {
        ;
      } else {
        break;
      }
    }
    
    if (log >= 0) {
      var intDigits = Math.floor(log+1);
      if (digits.length > intDigits) {
        decimal = intDigits;
      } else {
        if (digits.length < intDigits) {
          for (var i = digits.length; i < intDigits; i++)
            digits[digits.length] = 0;
        }
        decimal = digits.length;
      }
    } else {
      var zerosFirst = Math.ceil(-1-log);
      var firstZero = digits.indexOf(0);
      digits.splice(0, firstZero+1);
      
      for (var i = 0; i < zerosFirst; i++)
        if (digits[i] != 0)
          digits.splice(i, 0, 0);
      
      decimal = 0;
    }
    
    return [digits, decimal];
  };
  
  /** @private @jsxobf-clobber */
  NumberFormat._constrainDigitArray = function(digits, max, min, front) {
    if (digits.length > max) {
      if (front) {
        digits.splice(0, digits.length - max);
      } else {
        digits.splice(max, digits.length - max);
      }
    } else if (digits.length < min) {
      var appender = front ? "unshift" : "push";
      for (var i = digits.length; i < min; i++)
        digits[appender]("0");
    }
  };
  
  /** @private @jsxobf-clobber */
  NumberFormat._roundDigits = function(digits, remainder) {
    if (remainder[0] >= 5) {
      for (var i = digits.length - 1; i >= 0; i--) {
        var sum = digits[i] + 1;
        if (sum >= 10) {
          digits[i] = 0;
          
          if (i == 0) {
            digits.unshift(1);
            return true;
          }
        } else {
          digits[i] = sum;
          break;
        }
      }
    }
    return false;
  };

  /** @private @jsxobf-clobber */
  NumberFormat._localizeDigits = function(digits, zero) {
    var locZeroCode = zero.charCodeAt(0);
    for (var i = 0; i < digits.length; i++)
      digits[i] = String.fromCharCode(digits[i] + locZeroCode);
  };
  
  /** @private @jsxobf-clobber */
  NumberFormat.NUMBER_PART_CHARS = "0#,.";
          
  /** @private @jsxobf-clobber */
  NumberFormat_prototype._initFormat = function() {
    var squote = "'";
    
    var props = this._getProps();
    var format = this._format;
    var index = 0;
    var formatLength = format.length;
    
    var stage = 1; // prefix stage
    var numberPartIndex1 = null, numberPartIndex2 = null;
    
    while (index < formatLength) {
      var chr = format.charAt(index);
      
      if (stage == 1) { // positive prefix
        if (chr == squote) {
          var nextSQ = format.indexOf(squote, index+1);
          if (nextSQ == index + 1) {
            this.posprefix += squote;
            index += 2;
          } else if (nextSQ >= 0) {
            this.posprefix += format.substring(index+1, nextSQ);
            index = nextSQ + 1;
          } else {
            throw new jsx3.Exception(jsx3._msg("nmfmt.sq", index, this));
          }
        } else {
          if (NumberFormat.NUMBER_PART_CHARS.indexOf(chr) >= 0) {
            numberPartIndex1 = index;
            stage++;
          } else {
            this.posprefix += this._preSufChar(chr, props);
            index++;
          }
        }
      } else if (stage == 2) { // positive number
        if (NumberFormat.NUMBER_PART_CHARS.indexOf(chr) >= 0) {
          index++;
        } else {
          numberPartIndex2 = index;
          stage++;
        }
      } else if (stage == 3) { // positive suffix
        if (chr == squote) {
          var nextSQ = format.indexOf(squote, index+1);
          if (nextSQ == index + 1) {
            this.possuffix += squote;
            index += 2;
          } else if (nextSQ >= 0) {
            this.possuffix += format.substring(index+1, nextSQ);
            index = nextSQ + 1;
          } else {
            throw new jsx3.Exception(jsx3._msg("nmfmt.sq", index, this));
          }
        } else if (chr == ";") {
          this.negprefix = "";
          this.negsuffix = "";
          stage++;
        } else {
          this.possuffix += this._preSufChar(chr, props);
        }
        index++;
      } else if (stage == 4) { // negative prefix
        if (chr == squote) {
          var nextSQ = format.indexOf(squote, index+1);
          if (nextSQ == index + 1) {
            this.negprefix += squote;
            index += 2;
          } else if (nextSQ >= 0) {
            this.negprefix += format.substring(index+1, nextSQ);
            index = nextSQ + 1;
          } else {
            throw new jsx3.Exception(jsx3._msg("nmfmt.sq", index, this));
          }
        } else {
          if (NumberFormat.NUMBER_PART_CHARS.indexOf(chr) >= 0) {
            stage++;
          } else {
            this.negprefix += this._preSufChar(chr, props);
            index++;
          }
        }
      } else if (stage == 5) { // negative number
        if (NumberFormat.NUMBER_PART_CHARS.indexOf(chr) >= 0) {
          index++;
        } else {
          stage++;
        }
      } else if (stage == 6) { // negative suffix
        if (chr == squote) {
          var nextSQ = format.indexOf(squote, index+1);
          if (nextSQ == index + 1) {
            this.negsuffix += squote;
            index += 2;
          } else if (nextSQ >= 0) {
            this.negsuffix += format.substring(index+1, nextSQ);
            index = nextSQ + 1;
          } else {
            throw new jsx3.Exception(jsx3._msg("nmfmt.sq", index, this));
          }
        } else {
          this.negsuffix += this._preSufChar(chr, props);
        }
        index++;
      }
    }
    
    if (numberPartIndex2 == null)
      numberPartIndex2 = formatLength;
    
    if (numberPartIndex1 == null)
      throw new jsx3.Exception(jsx3._msg("nmfmt.numpt", format));
    
    this._parseNumberPart(format.substring(numberPartIndex1, numberPartIndex2));
  };

  /** @private @jsxobf-clobber */
  NumberFormat_prototype._parseNumberPart = function(numberPart) {
    var decimalIndex = numberPart.indexOf(".");
    if (decimalIndex < 0) decimalIndex = numberPart.length;
    else if (decimalIndex == numberPart.length - 1) this.showdec = true;
            
    var groupingIndex = numberPart.lastIndexOf(",");
    
    if (groupingIndex >= 0) {
      var diff = decimalIndex - groupingIndex - 1;
      if (diff < 1) throw new jsx3.Exception(jsx3._msg("nmfmt.gpdec", numberPart));
      this.grouping = diff;
    }
    
    for (var i = 0; i < decimalIndex; i++) {
      if (numberPart.charAt(i) == "0")
        this.minintdigit++;
    }
    
    for (var i = decimalIndex+1; i < numberPart.length; i++) {
      if (numberPart.charAt(i) == "0") {
        this.mindecdigit++;
        this.maxdecdigit++;
      } else if (numberPart.charAt(i) == "#") {
        this.maxdecdigit++;
      }
    }
  };

  /** @private @jsxobf-clobber */
  NumberFormat._getProps = function(l) {
    return jsx3.System.getLocaleProperties(l);
  };

  NumberFormat_prototype._getProps = function() {
    return NumberFormat._getProps(this._locale);
  };

  /** @private @jsxobf-clobber */
  NumberFormat_prototype._preSufStr = function(s, props) {
    var a = s.split("");
    for (var i = 0; i < a.length; i++)
      a[i] = this._preSufChar(a[i], props);
    return a.join("");
  };
  
  /** @private @jsxobf-clobber */
  NumberFormat_prototype._preSufChar = function(chr, props) {
    if (chr == "\u00A4") {
      this.currency = true;
      return props.get("number.currency");
    } else if (chr == "%") {
      this.multiplier = 100;
      return props.get("number.percent");
    } else if (chr == "\u2030") {
      this.multiplier = 1000;
      return props.get("number.permille");
    } else if (chr == "-") {
      return props.get("number.minus");
    } else {
      return chr;
    }
  };
  
  /**
   * @return {String}
   */
  NumberFormat_prototype.toString = function() {
    return this._format;
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
 * Formats and parses dates according to a token-based string format. This class is fully localized.
 * <p/>
 * An instance of this class is defined by its format, which is a string conforming to the following syntax:
 * <ul>
 * <li>Some letters (a-z, A-Z) are tokens that represent date fields (the tokens are described below). All other
 *   letters are reserved.</li>
 * <li>Letters that are not part of tokens must lie between single quotation marks.</li>
 * <li><code>''</code> formats/parses a single quotation mark.</li>
 * <li>All other characters are allowed and have no special meaning.</li>
 * </ul>
 *
 * The following tokens are supported:
 * <ul>
 * <li><b>G</b> &#8212; the era (BC/AD) (<a href="#jsx3.util.DateFormat:intro.Text">Text</a>).</li>
 * <li><b>y</b> &#8212; the year, either as the full year or
 *   as the last two digits of the year (<a href="#jsx3.util.DateFormat:intro.Year">Year</a>).</li>
 * <li><b>M</b> &#8212; the month, either as a digit or as
 *   the name (<a href="#jsx3.util.DateFormat:intro.Month">Month</a>).</li>
 * <li><b>d</b> &#8212; the day of the month (<a href="#jsx3.util.DateFormat:intro.Number">Number</a>).</li>
 * <li><b>E</b> &#8212; the day of the week (<a href="#jsx3.util.DateFormat:intro.Text">Text</a>).</li>
 * <li><b>H</b> &#8212; the hour of the day (0-23) (<a href="#jsx3.util.DateFormat:intro.Number">Number</a>).</li>
 * <li><b>h</b> &#8212; the hour of the day (1-12) (<a href="#jsx3.util.DateFormat:intro.Number">Number</a>).</li>
 * <li><b>m</b> &#8212; the minute of the hour (<a href="#jsx3.util.DateFormat:intro.Number">Number</a>).</li>
 * <li><b>s</b> &#8212; the second of the minute (<a href="#jsx3.util.DateFormat:intro.Number">Number</a>).</li>
 * <li><b>S</b> &#8212; the milliseconds of the second (<a href="#jsx3.util.DateFormat:intro.Number">Number</a>).</li>
 * <li><b>a</b> &#8212; AM/PM marker (<a href="#jsx3.util.DateFormat:intro.Text">Text</a>).</li>
 * <li><b>z</b> &#8212; the time zone formatted as <code>GMT-08:00</code></li>
 * <li><b>Z</b> &#8212; the time zone formatted as <code>-0800</code></li>
 * </ul>
 *
 * Each token has a type, which determines how it is formatted and parsed. The token types are:
 * <ul>
 * <li><b><a name="jsx3.util.DateFormat:intro.Number">Number</a></b> &#8212;
 *   For formatting, the number of characters in the token is the minimum number of digits to display. Smaller
 *   numbers are zero-padded on the left. For parsing, if the following token is non-numeric, any number of digits
 *   is parsed. Otherwise, exactly the number of digits is parsed as characters in the token.</li>
 * <li><b><a name="jsx3.util.DateFormat:intro.Text">Text</a></b> &#8212;
 *   For formatting, if the token is four characters or longer, the entire string is printed, otherwise a substring
 *   equal in length to the length of the token is printed. For parsing, the best match at least one character long
 *   is parsed.</li>
 * <li><b><a name="jsx3.util.DateFormat:intro.Year">Year</a></b> &#8212;
 *   If the length of the token is 2, the token is formatted and parsed as the last two digits of a year between
 *   80 years prior and 20 years subsequent to the current date. Otherwise, it is formatted and parsed as a Number.</li>
 * <li><b><a name="jsx3.util.DateFormat:intro.Month">Month</a></b> &#8212;
 *   If the length of the token is 2 or shorter, the token is formatted and parsed as a Number. Otherwise, the
 *   month is formatted and parsed as Text.</li>
 * </ul>
 *
 * @since 3.2
 */
jsx3.Class.defineClass('jsx3.util.DateFormat', null, null, function(DateFormat, DateFormat_prototype) {

  /**
   * {int} Type for a short localized date or time format.
   * @final @jsxobf-final
   */
  DateFormat.SHORT = 1;

  /**
   * {int} Type for a medium-length localized date or time format.
   * @final @jsxobf-final
   */
  DateFormat.MEDIUM = 2;

  /**
   * {int} Type for a long localized date or time format.
   * @final @jsxobf-final
   */
  DateFormat.LONG = 3;

  /**
   * {int} Type for a full-length localized date or time format.
   * @final @jsxobf-final
   */
  DateFormat.FULL = 4;

  /** @private @jsxobf-clobber */
  DateFormat.DEFAULT = DateFormat.MEDIUM;

  /** @private @jsxobf-clobber */
  DateFormat._TYPE_KEYS = [null, "short", "medium", "long", "full"];

  /**
   * Returns a date format localized for a particular locale.
   * @param intType {int} <code>SHORT</code>, <code>MEDIUM</code>, <code>LONG</code>, or <code>FULL</code>
   * @param objLocale {jsx3.util.Locale} the locale for which to return a format. If this parameter is not provided,
   *   the default system locale is used.
   * @return {jsx3.util.DateFormat}
   */
  DateFormat.getDateInstance = function(intType, objLocale) {
    var format = jsx3.System.getLocaleProperties(objLocale).get("format.date." +
        DateFormat._TYPE_KEYS[intType || DateFormat.DEFAULT]);
    if (format == null) throw new jsx3.IllegalArgumentException("intType", intType);
    return new DateFormat(format, objLocale);
  };

  /**
   * Returns a time format localized for a particular locale.
   * @param intType {int} <code>SHORT</code>, <code>MEDIUM</code>, <code>LONG</code>, or <code>FULL</code>
   * @param objLocale {jsx3.util.Locale} the locale for which to return a format. If this parameter is not provided,
   *   the default system locale is used.
   * @return {jsx3.util.DateFormat}
   */
  DateFormat.getTimeInstance = function(intType, objLocale) {
    var format = jsx3.System.getLocaleProperties(objLocale).get("format.time." +
        DateFormat._TYPE_KEYS[intType || DateFormat.DEFAULT]);
    if (format == null) throw new jsx3.IllegalArgumentException("intType", intType);
    return new DateFormat(format, objLocale);
  };

  /**
   * Returns a date and time format localized for a particular locale.
   * @param intDateType {int} <code>SHORT</code>, <code>MEDIUM</code>, <code>LONG</code>, or <code>FULL</code>
   * @param intTimeType {int} <code>SHORT</code>, <code>MEDIUM</code>, <code>LONG</code>, or <code>FULL</code>
   * @param objLocale {jsx3.util.Locale} the locale for which to return a format. If this parameter is not provided,
   *   the default system locale is used.
   * @return {jsx3.util.DateFormat}
   */
  DateFormat.getDateTimeInstance = function(intDateType, intTimeType, objLocale) {
    var props = jsx3.System.getLocaleProperties(objLocale);
    var format1 = props.get("format.date." + DateFormat._TYPE_KEYS[intDateType || DateFormat.DEFAULT]);
    var format2 = props.get("format.time." + DateFormat._TYPE_KEYS[intTimeType || DateFormat.DEFAULT]);
    if (format1 == null) throw new jsx3.IllegalArgumentException("intDateType", intDateType);
    if (format2 == null) throw new jsx3.IllegalArgumentException("intTimeType", intTimeType);
    var glue = new jsx3.util.MessageFormat(props.get("format.datetime"));
    return new DateFormat(glue.format(format2, format1), objLocale);
  };

  // Formatting Data and Functions

  /** @private @jsxobf-clobber */
  DateFormat._LETTER_FORMAT = {
    G: function(d, l, f) { var bc = d.getFullYear() < 1; return DateFormat._formatText(
        f._getLProp(l < 4 ? "date.era" : "date.era.long")[bc ? 0 : 1]); },
    y: function(d, l, f) { return DateFormat._formatYear(d.getFullYear(), l); },
    M: function(d, l, f) { return DateFormat._formatMonth(f, d.getMonth(), l); },
    d: function(d, l, f) { return DateFormat._formatNumber(d.getDate(), l); },
    E: function(d, l, f) { return DateFormat._formatText(
        f._getLProp(l < 3 ? "date.day.narrow" : (l < 4 ? "date.day.abbrev" : "date.day"))[d.getDay()]); },
    H: function(d, l, f) { return DateFormat._formatNumber(d.getHours(), l); },
    h: function(d, l, f) { return DateFormat._formatNumber(d.getHours() % 12 || Number(12), l); },
    m: function(d, l, f) { return DateFormat._formatNumber(d.getMinutes(), l); },
    s: function(d, l, f) { return DateFormat._formatNumber(d.getSeconds(), l); },
    S: function(d, l, f) { return DateFormat._formatNumber(d.getMilliseconds(), l); },
    a: function(d, l, f) { return DateFormat._formatText(f._getLProp("time.ampm")[Math.floor(d.getHours()/12)]); }, // AM/PM is never abbreviated in CLDR
    z: function(d, l, f) { var hrMn = DateFormat._getTimeZoneBits(d, f); return "GMT" + hrMn[0] + ":" + hrMn[1]; },
    Z: function(d, l, f) { var hrMn = DateFormat._getTimeZoneBits(d, f); return hrMn[0] + hrMn[1]; }
  };

  /** @private @jsxobf-clobber */
  DateFormat._formatYear = function(value, length) {
    if (length == 2) {
      var asString = "" + value;
      return asString.substring(asString.length-2);
    } else {
      if (value < 1) value = 1 - value;
      return DateFormat._formatNumber(value, length);
    }
  };

  /** @private @jsxobf-clobber */
  DateFormat._formatNumber = function(value, length) {
    var v = value.toString();
    while (v.length < length)
      v = "0000000000".substring(0, length - v.length) + v;
    return v;
  };

  /** @private @jsxobf-clobber */
  DateFormat._formatText = function(value, length) {
    if (length == null || length >= 4 || value.length <= length)
      return value;
    else
      return value.substring(0, length);
  };

  /** @private @jsxobf-clobber */
  DateFormat._formatMonth = function(f, value, length) {
    if (length <= 2)
      return DateFormat._formatNumber(value+1, length);
    else
      return DateFormat._formatText(f._getLProp(length < 4 ? "date.month.abbrev" : "date.month")[value], length);
  };

  /** @private @jsxobf-clobber */
  DateFormat._getTimeZoneBits = function(date, format) {
    var offset = format.getTimeZoneOffset(date);
    var sign = offset < 0 ? "-" : "+";
    offset = Math.abs(offset);
    var hours = Math.floor(offset/60).toString();
    var minutes = Math.floor(offset % 60).toString();
    if (hours.length < 2) hours = "0" + hours;
    if (minutes.length < 2) minutes = "0" + minutes;
    return [sign+hours, minutes];
  };

  // Parsing Data and Functions

  /** @private @jsxobf-clobber */
  DateFormat._LETTER_PARSE = {
    G: function(f, input, pos, length, date, next, state) {
      var indexLength = DateFormat._parseTextEnums(input, pos,
          [f._getLProp("date.era"), f._getLProp("date.era.long")], length, false, next);
      var index = indexLength[0], matchedLength = indexLength[1];
      if (index >= 0) {
        state.bc = index == 0;
        return matchedLength;
      } else {
        return -1;
      }
    },
    y: function(f, input, pos, length, date, next, state) {
      // For parsing with the abbreviated year pattern ("y" or "yy"), DateFormat must interpret the abbreviated
      // year relative to some century. It does this by adjusting dates to be within 80 years before and 20 years
      // after the current time. During parsing, only strings consisting of exactly two digits, will be parsed into
      // the default century.
      if (length <= 2) {
        var yearTrunc = DateFormat._parseNumber(input, pos, length, null, next);
        var value = Number(yearTrunc);
        if (!isNaN(value)) {
          if (yearTrunc.length == 2) {
            var now = new Date();
            var y = now.getFullYear();
            var adjYear = 100 * Math.floor(y / 100) + value;

            if (adjYear >= (y + 20)) {
              adjYear -= 100;
            } else if (adjYear < (y - 80)) {
              adjYear += 100;
            }

            value = adjYear;
          }
          state.y = value;
          return yearTrunc.length;
        } else {
          return -1;
        }
      } else {
        var year = DateFormat._parseNumber(input, pos, length, null, next);
        return DateFormat._setParsedField(year, "y", state);
      }
    },
    M: function(f, input, pos, length, date, next, state) {
      if (length <= 2) {
        var month = DateFormat._parseNumber(input, pos, length, 2, next);
        var value = Number(month);
        if (!isNaN(value)) {
          state.M = value-1;
          return month.length;
        } else {
          return -1;
        }
      } else {
        var indexLength = DateFormat._parseTextEnums(input, pos,
            [f._getLProp("date.month.abbrev"), f._getLProp("date.month")], length, false, next);
        var index = indexLength[0], matchedLength = indexLength[1];
        if (index >= 0) {
          state.M = index;
          return matchedLength;
        } else {
          return -1;
        }
      }
    },
    d: function(f, input, pos, length, date, next, state) {
      var days = DateFormat._parseNumber(input, pos, length, 2, next);
      return DateFormat._setParsedField(days, "d", state);
    },
    E: function(f, input, pos, length, date, next, state) {
      var indexLength = DateFormat._parseTextEnums(input, pos,
          [f._getLProp("date.day.narrow"), f._getLProp("date.day"), f._getLProp("date.day.abbrev")], length, false, next);
      var index = indexLength[0], matchedLength = indexLength[1];
      if (index >= 0) {
        return matchedLength;
      } else {
        return 0;
      }
    },
    H: function(f, input, pos, length, date, next, state) {
      var hours = DateFormat._parseNumber(input, pos, length, 2, next);
      var value = Number(hours);
      if (!isNaN(value)) {
        state.hours24 = value;
        return hours.length;
      } else {
        return -1;
      }
    },
    h: function(f, input, pos, length, date, next, state) {
      var hours = DateFormat._parseNumber(input, pos, length, 2, next);
      var value = Number(hours);
      if (!isNaN(value)) {
        state.hours12 = value;
        return hours.length;
      } else {
        return -1;
      }
    },
    m: function(f, input, pos, length, date, next, state) {
      var minutes = DateFormat._parseNumber(input, pos, length, 2, next);
      return DateFormat._setParsedField(minutes, "m", state);
    },
    s: function(f, input, pos, length, date, next, state) {
      var seconds = DateFormat._parseNumber(input, pos, length, 2, next);
      return DateFormat._setParsedField(seconds, "s", state);
    },
    S: function(f, input, pos, length, date, next, state) {
      var mills = DateFormat._parseNumber(input, pos, length, 3, next);
      return DateFormat._setParsedField(mills, "S", state);
    },
    a: function(f, input, pos, length, date, next, state) {
      var indexLength = DateFormat._parseTextEnum(input, pos, f._getLProp("time.ampm"), length, false, next);
      var index = indexLength[0], matchedLength = indexLength[1];
      if (index >= 0) {
        state.pm = index == 1;
        return matchedLength;
      } else {
        return -1;
      }
    },
    z: function(f, input, pos, length, date, next, state) {
      var gmt = input.substring(pos, pos+3);
      var sign = input.charAt(pos+3);
      var hours = Number(input.substring(pos+4, pos+6));
      var minutes = Number(input.substring(pos+7, pos+9));

      if (gmt.toLowerCase() == "gmt" && (sign == "+" || sign == "-") && !isNaN(hours) && !isNaN(minutes)) {
        var offset = 60 * hours + minutes;
        if (sign == "-") offset *= -1;
        state.timezone = offset;
        return 9;
      } else {
        return -1;
      }
    },
    Z: function(f, input, pos, length, date, next, state) {
      var sign = input.charAt(pos);
      var hours = Number(input.substring(pos+1, pos+3));
      var minutes = Number(input.substring(pos+3, pos+5));

      if ((sign == "+" || sign == "-") && !isNaN(hours) && !isNaN(minutes)) {
        var offset = 60 * hours + minutes;
        if (sign == "-") offset *= -1;
        state.timezone = offset;
        return 5;
      } else {
        return -1;
      }
    }
  };

  /** @private @jsxobf-clobber */
  DateFormat._parseText = function(input, pos, match) {
    if (input.indexOf(match, pos) == pos)
      return match.length;
    else
      return -1;
  };

  /** @private @jsxobf-clobber */
  DateFormat._parseNumber = function(input, pos, minDigit, maxDigit, nextToken) {
    // determine whether this number is following by a non-numeric token
    // ... if there is no following token
    var textNext = nextToken == null ||
    // ... if the next token is a string that does not start with a digit
        (typeof(nextToken) == "string" && !DateFormat._charIsDigit(nextToken, 0));
    if (jsx3.$A.is(nextToken)) {
      // ... if the next token is MMM
      textNext = textNext || (nextToken[0] == "M" && nextToken[1] > 2) ||
      // ... if the next token is E
          nextToken[0] == "E" ||
      // ... if the next token is a
          nextToken[0] == "a";
    }

    if (textNext) {
      // if the next token is non-numeric, just match all digits
      var matchEnd = pos;
      while (DateFormat._charIsDigit(input, matchEnd))
        matchEnd++;
      return input.substring(pos, matchEnd);
    } else {
      // if the next token is numeric, only match the minimum number of digits
      for (var i = 0; i < minDigit; i++) {
        if (! DateFormat._charIsDigit(input, pos+i))
          return "x";
      }
      return input.substring(pos, pos+minDigit);
    }
  };

  /** @private @jsxobf-clobber */
  DateFormat._parseTextEnums = function(input, pos, arrEnums, length, caseSensitive, nextToken) {
    var a = [];
    for (var i = 0; i < arrEnums.length; i++) a.push.apply(a, arrEnums[i]);
    var ret = DateFormat._parseTextEnum(input, pos, a, length, caseSensitive, nextToken);
    ret[0] = ret[0] % arrEnums[0].length;
    return ret;
  };

  /** @private @jsxobf-clobber */
  DateFormat._parseTextEnum = function(input, pos, enums, length, caseSensitive, nextToken) {
    var bestIndex = -1;
    var bestLength = 0;

    if (! caseSensitive)
      input = input.toLowerCase();

    for (var i = 0; i < enums.length; i++) {
      var thisLength = 0;
      var item = caseSensitive ? enums[i] : enums[i].toLowerCase();
      while (input.length > thisLength && item.length > thisLength &&
          input.charAt(pos+thisLength) == item.charAt(thisLength))
        thisLength++;

      if (thisLength > bestLength) {
        bestLength = thisLength;
        bestIndex = i;
      }
    }

    return [bestIndex, bestLength];
  };

  /** @private @jsxobf-clobber */
  DateFormat._setParsedField = function(token, field, state) {
    var value = Number(token);
    if (!isNaN(value)) {
      state[field] = value;
      return token.length;
    } else {
      return -1;
    }
  };

  /** @private @jsxobf-clobber */
  DateFormat._charIsDigit = function(s, i) {
    var code = s.charCodeAt(i);
    return code >= 48 && code <= 57;
  };

  // Public Interface

  /**
   * The instance initializer. Instances of this class are immutable.
   *
   * @param strFormat {String} the date format.
   * @param objLocale {jsx3.util.Locale} the locale with which to format and parse dates. If this parameter is not
   *   provided the default system locale is used.
   * @throws {jsx3.Exception} if <code>strFormat</code> cannot be parsed.
   * @see jsx3.util.DateFormat  Date Format Syntax
   */
  DateFormat_prototype.init = function(strFormat, objLocale) {
    /* @jsxobf-clobber */
    this._format = strFormat;
    /* @jsxobf-clobber */
    this._offset = null;
    /* @jsxobf-clobber */
    this._locale = objLocale || jsx3.System.getLocale();
    this._initTokens();
  };

  /**
   * @return {jsx3.util.Locale}
   */
  DateFormat_prototype.getLocale = function() {
    return this._locale;
  };

  /**
   * @param objLocale {jsx3.util.Locale}
   */
  DateFormat_prototype.setLocale = function(objLocale) {
    this._locale = objLocale;
  };

  /**
   * Returns the timezone offset of this date format. This is the difference between GMT and the local time of this
   * date format, in minutes. For example, Pacific Standard Time is -480 (-08h * 60). If the timezone offset has been
   * set explicitly with <code>setTimeZoneOffset()</code>, that value is returned.
   * <p/>
   * Since the timezone offset may change over the year for Daylight Savings Time, this method takes a
   * <code>Date</code> argument, <code>objDate</code>. All dates are created with the timezone offset of the host
   * browser's timezone, adjusted for Daylight Savings Time. Therefore, if the timezone offset of this date format
   * has not been set explicitly, the timezone offset is determined from the <code>objDate</code> parameter, or, if
   * that is not provided, from the current time.
   *
   * @param objDate {Date} the date for which to return the timezone offset.
   * @return {int} the timezone offset in minutes.
   */
  DateFormat_prototype.getTimeZoneOffset = function(objDate) {
    return this._offset != null ? this._offset : -1 * (objDate || new Date()).getTimezoneOffset();
  };

  /**
   * Sets the timezone offset of this date format. The default value is the value for the local time.
   * @param intMinutes {int} the timezone offset in minutes.
   * @see #getTimeZoneOffset()
   */
  DateFormat_prototype.setTimeZoneOffset = function(intMinutes) {
    this._offset = intMinutes;
  };

  /** @private @jsxobf-clobber */
  DateFormat_prototype._getLProp = function(strProp) {
    return jsx3.System.getLocaleProperties(this._locale).get(strProp);
  };

  /** @private @jsxobf-clobber */
  DateFormat_prototype._initTokens = function() {
    var squote = "'";

    var tokens = [];
    /* @jsxobf-clobber */
    this._tokens = tokens;

    var format = this._format;
    var formatLength = format.length;
    var index = 0;
    var tokenBits = [];
    var res = /[a-zA-Z']/g;

    while (index < formatLength) {
      var firstChar = format.charAt(index);
      // escape any sequences surrounded by single quotes
      if (firstChar == squote) {
        var nextSQ = format.indexOf(squote, index+1);
        if (nextSQ == index + 1) {
          tokenBits[tokenBits.length] = squote;
          index += 2;
        } else if (nextSQ >= 0) {
          tokenBits[tokenBits.length] = format.substring(index+1, nextSQ);
          index = nextSQ + 1;
        } else {
          throw new jsx3.Exception(jsx3._msg("dtfmt.sq", index, this));
        }
      } else if (DateFormat._LETTER_FORMAT[firstChar]) {
        var length = 1;
        while (format.charAt(index+length) == firstChar)
          length++;

        var strToken = tokenBits.join("");
        if (strToken.length > 0) {
          tokens[tokens.length] = strToken;
          tokenBits.splice(0, tokenBits.length);
        }

        tokens[tokens.length] = [firstChar, length];
        index += length;
      } else if (firstChar.match(res)) {
        throw new jsx3.Exception(jsx3._msg("dtfmt.token", index, format));
      } else {
        res.lastIndex = index + 1;
        if (res.exec(format)) {
          tokenBits[tokenBits.length] = format.substring(index, res.lastIndex - 1);
          index = res.lastIndex - 1;
        } else {
          tokenBits[tokenBits.length] = format.substring(index);
          break;
        }
      }
    }

    var strToken = tokenBits.join("");
    if (strToken.length > 0) {
      tokens[tokens.length] = strToken;
      tokenBits.splice(0, tokenBits.length);
    }
  };

  /**
   * Formats a date according to this date format.
   *
   * @param objDate {Number|Object|Date} the date to format.
   * @return {String} the formatted date.
   */
  DateFormat_prototype.format = function(objDate) {
    if (!(objDate instanceof Date)) {
      if (!isNaN(objDate)) {
        objDate = new Date(Number(objDate));
      } else {
        objDate = new Date(objDate);
      }

      if (isNaN(objDate)) throw new jsx3.IllegalArgumentException("objDate", objDate);
    }

    var formatted = new Array(this._tokens.length);
    var adjustedDate = new Date();
    adjustedDate.setTime(objDate.getTime() + (this.getTimeZoneOffset(objDate)+objDate.getTimezoneOffset()) * 1000 * 60);

    for (var i = 0; i < this._tokens.length; i++) {
      var token = this._tokens[i];
      if (jsx3.$A.is(token)) {
        var letter = token[0];
        var length = token[1];
        formatted[i] = DateFormat._LETTER_FORMAT[letter](adjustedDate, length, this);
      } else {
        formatted[i] = token;
      }
    }

    return formatted.join("");
  };

  /**
   * Parses a string according to this date format and returns the resulting date. If <code>strDate</code> does
   * not conform to this date format, an exception is thrown.
   * <p/>
   * The default date for the purposes of this method is 1-Jan-1970 12:00AM, local time. If any date fields
   * are omitted from this format, the date returned by this method will inherit those fields from the default date.
   *
   * @param strDate {String} the string to parse.
   * @return {Date} the parsed date.
   * @throws {jsx3.Exception} if <code>strDate</code> cannot be parsed according to this format.
   */
  DateFormat_prototype.parse = function(strDate) {
    var date = new Date();
    date.setTime(0);
    var position = 0;

    var parseState = {};
    for (var i = 0; i < this._tokens.length; i++) {
      var token = this._tokens[i];
      var incr = -1;
      if (jsx3.$A.is(token)) {
        incr = DateFormat._LETTER_PARSE[token[0]](this, strDate, position, token[1], date, this._tokens[i+1], parseState);
      } else {
        incr = DateFormat._parseText(strDate, position, token);
      }

      if (incr < 0)
        throw new jsx3.Exception(jsx3._msg("dtfmt.parse", strDate, this));

      position += incr;
    }

    if (parseState.y != null)
      date.setUTCFullYear(parseState.y);

    if (parseState.bc)
      date.setUTCFullYear(1 - date.getUTCFullYear());

    if (parseState.M != null)
      date.setUTCMonth(parseState.M);

    if (parseState.d != null)
      date.setUTCDate(parseState.d);

    if (parseState.hours24) {
      date.setUTCHours(parseState.hours24);
    } else if (parseState.hours12) {
      var hours = parseState.hours12;
      if (parseState.pm) hours += 12;
      date.setUTCHours(hours);
    }

    if (parseState.m != null)
      date.setUTCMinutes(parseState.m);

    if (parseState.s != null)
      date.setUTCSeconds(parseState.s);

    if (parseState.S != null)
      date.setUTCMilliseconds(parseState.S);

    if (parseState.timezone != null) {
      date.setTime(date.getTime() - parseState.timezone * 1000 * 60);
    } else {
      date.setTime(date.getTime() - this.getTimeZoneOffset(date) * 1000 * 60);
    }

    if (isNaN(date.getTime()))
      throw new jsx3.Exception(jsx3._msg("dtfmt.inv", strDate, this));      

    return date;
  };

  /**
   * Returns the format passed to the constructor.
   * @return {String}
   */
  DateFormat_prototype.getFormat = function() {
    return this._format;
  };

  /**
   * Returns a string representation of this date format.
   * @return {String}
   */
  DateFormat_prototype.toString = function() {
    return this._format;
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
 * Constructs messages from a pattern and parameters. A message format takes a list of arguments, formats
 * them, and inserts them into the pattern at specific places. 
 * <p/>
 * Replacement tokens are delimited with curly braces. Tokens begin with an integer, which determines the format
 * parameter that is inserted in place of the token. The following tokens are supported where <code>n</code> is the
 * zero-based parameter index:
 * <ul>
 *   <li><b>{n}</b> &#8212; Replaced with the nth parameter. The formatting of the nth parameter, <code>param</code>,
 *                   depends on its data type:
 *     <ul>
 *       <li><code>null</code> &#8212; "null"</li>
 *       <li><code>string</code> &#8212; param</li>
 *       <li><code>number</code> &#8212; {n,number}</li>
 *       <li><code>Object</code> &#8212; param.toString()</li>
 *       <li><code>Date</code> &#8212; {n,datetime,short}</li>
 *       <li>Not provided &#8212; "{n}"</li>
 *     </ul>
 *   </li>
 *   <li><b>{n,date}</b> &#8212; Formats the nth parameter as a date with the default format length (medium).</li>
 *   <li><b>{n,date,[short|medium|long|full|<i>format</i>]}</b> &#8212; Formats the nth parameter as a date according to the
 *       specified format length or an arbitrary date format. </li>
 *   <li><b>{n,time}</b> &#8212; Formats the nth parameter as a time with the default format length (medium).</li>
 *   <li><b>{n,time,[short|medium|long|full|<i>format</i>]}</b> &#8212; Formats the nth parameter as a time according to the
 *       specified format length or an arbitrary date format. </li>
 *   <li><b>{n,datetime}</b> &#8212; Formats the nth parameter as a date/time with the default format length (medium).</li>
 *   <li><b>{n,datetime,[short|medium|long|full|<i>format</i>]}</b> &#8212; Formats the nth parameter as a date/time according to the
 *       specified format length or an arbitrary date format. </li>
 *   <li><b>{n,number}</b> &#8212; Formats the nth parameter as a number with the default number format.</li>
 *   <li><b>{n,number,[integer|percent|currency|<i>format</i>]}</b> &#8212; Formats the nth parameter as a number according
 *       to the specified number format type or an arbitrary number format. </li>
 * </ul>
 * The formatting of date, time, datetime, and number tokens depends on the locale of the message format. The formats
 * used to format such tokens inherit their locale from the message format. If no locale is passed to the message
 * format constructor, the default system locale is used.
 * <p/>
 * Within a format, single quotes (') delimit quoted sequences that are not parsed for tokens. Therefore, in order
 * to insert a curly bracket in a message format, it should be surrounded by single quotes:
 * <code>new MessageFormat("A curly bracket: '{'")</code>. To insert a single quote character, use two single
 * quotes in succession: <code>new MessageFormat("A single quote: ''")</code>.
 *
 * @since 3.2
 * @see jsx3.util.NumberFormat
 * @see jsx3.util.DateFormat
 */
jsx3.Class.defineClass('jsx3.util.MessageFormat', null, null, function(MessageFormat, MessageFormat_prototype) {
  
  var NumberFormat = jsx3.util.NumberFormat;
  var DateFormat = jsx3.util.DateFormat;
  
  /**
   * The instance initializer.
   * @param strFormat {String} the format pattern.
   * @param objLocale {jsx3.util.Locale} the locale of the format. The locale affects how numbers and dates are
   *   formatted. If this parameter is omitted, the system locale is used.
   * @throws {jsx3.Exception} if <code>strFormat</code> cannot be parsed.
   */
  MessageFormat_prototype.init = function(strFormat, objLocale) {
    /* @jsxobf-clobber */
    this._format = strFormat;
    /* @jsxobf-clobber */
    this._locale = objLocale || jsx3.System.getLocale();
    this._initFormat();
  };
  
  /**
   * Returns the locale of this message format.
   * @return {jsx3.util.Locale}
   */
  MessageFormat_prototype.getLocale = function() {
    return this._locale;
  };
  
  /**
   * Sets the locale of this message format.
   * @param objLocale {jsx3.util.Locale}
   */
  MessageFormat_prototype.setLocale = function(objLocale) {
    this._locale = objLocale;
    this._initFormat();
  };
  
  /**
   * Formats a collection of objects according to this message format.
   * @param args {Object...|Array<Object>} the argument objects. Replacement tokens of the pattern of this format
   *   will be replaced by these arguments.
   * @return {String} the string resulting from the pattern and arguments.
   */
  MessageFormat_prototype.format = function(args) {
    var tokens = new Array(this._tokens.length);
    var arrArgs = arguments[0] instanceof Array ? arguments[0] : arguments;
    
    for (var i = 0; i < tokens.length; i++) {
      var token = this._tokens[i];
      if (jsx3.$A.is(token)) {
        var index = token[0];
        var format = token[1];
        
        var arg = arrArgs[index];
        if (index >= arrArgs.length) {
          tokens[i] = "{" + index + "}";
        } else if (format != null) {
          tokens[i] = format.format(arg);
        } else if (typeof(arg) == "string") {
          tokens[i] = arg;
        } else if (typeof(arg) == "number" && NumberFormat) {
          if (! this._nmbft)
            /* @jsxobf-clobber */
            this._nmbft = NumberFormat.getNumberInstance(this._locale);

          tokens[i] = this._nmbft.format(arg);
        } else if (arg == null) {
          tokens[i] = "null";
        } else if (arg instanceof Date && DateFormat) {
          tokens[i] = DateFormat.getDateTimeInstance(DateFormat.SHORT, DateFormat.SHORT, this._locale).format(arg);
        } else {
          tokens[i] = arg.toString();
        }
      } else {
        tokens[i] = this._tokens[i];
      }
    }
    
    return tokens.join("");
  };

  /** @private @jsxobf-clobber */
  MessageFormat_prototype._initFormat = function() {
    var squote = "'";

    var tokens = [];
    /* @jsxobf-clobber */
    this._tokens = tokens;

    var format = this._format;
    var formatLength = format.length;
    var index = 0;
    var inQuote = false;
    var tokenBits = [];

    while (index < formatLength) {
      var firstSQ = format.indexOf(squote, index);
      var firstCB = format.indexOf("{", index);

      if (firstSQ >= 0 && (firstSQ < firstCB || firstCB < 0)) {
        if (firstSQ > index)
          tokenBits[tokenBits.length] = format.substring(index, firstSQ);

        var nextSQ = format.indexOf(squote, firstSQ + 1);
        if (nextSQ == firstSQ + 1) {
          tokenBits[tokenBits.length] = squote;
          index = nextSQ + 1;
        } else if (nextSQ >= 0) {
          tokenBits[tokenBits.length] = format.substring(firstSQ + 1, nextSQ);
          index = nextSQ + 1;
        } else {
          throw new jsx3.Exception(jsx3._msg("msfmt.sq", firstSQ, this));
        }
      } else if (firstCB >= 0) {
        if (firstCB > index)
          tokenBits[tokenBits.length] = format.substring(index, firstCB);
        tokens[tokens.length] = tokenBits.join("");
        tokenBits.splice(0, tokenBits.length);

        index = firstCB + 1;
        var strFormat = [];
        
        while (true) {
          var firstChar = format.charAt(index);
          if (firstChar == "")
            throw new jsx3.Exception(jsx3._msg("msfmt.bracket", formatLength - strFormat.length - 1, this));

          if (firstChar == squote) {
            if (format.charAt(index+1) == squote) {
              strFormat[strFormat.length] = firstChar;
              index += 2;
            } else {
              inQuote = !inQuote;
              index += 1;
            }
          } else if (inQuote) {
            strFormat[strFormat.length] = firstChar;
            index++;
          } else if (firstChar == "}") {
            index++;
            break;
          } else {
            strFormat[strFormat.length] = firstChar;
            index++;
          }
        }

        tokens[tokens.length] = this._parseFormat(strFormat.join(""));
      } else {
        tokenBits[tokenBits.length] = format.substring(index);
        break;
      }
    }

    var lastToken = tokenBits.join("");
    if (lastToken.length > 0)
      tokens[tokens.length] = lastToken;
  };

  /** @private @jsxobf-clobber */
  MessageFormat._DTMAP = {date: "getDateInstance", time: "getTimeInstance", datetime: "getDateTimeInstance"};

  /** @private @jsxobf-clobber */
  MessageFormat_prototype._parseFormat = function(strFormat) {
    var bits = strFormat.split(",");
    
    var index = Number(bits[0]);
    if (isNaN(index))
      throw new jsx3.Exception(jsx3._msg("msfmt.bad_ind", strFormat, this));
    
    if (bits.length > 1) {
      var type = bits[1];
      var style = bits.slice(2).join(",");
      
      if (MessageFormat._DTMAP[type]) {
        if (! DateFormat) return [index, null];

        var funct = MessageFormat._DTMAP[type];

        var intLength = null;
        if (style == "short") intLength = DateFormat.SHORT;
        else if (style == "medium") intLength = DateFormat.MEDIUM;
        else if (style == "long") intLength = DateFormat.LONG;
        else if (style == "full") intLength = DateFormat.FULL;

        if (intLength != null || jsx3.util.strEmpty(style))
          return [index, type == "datetime" ? DateFormat[funct](intLength, intLength, this._locale) : 
                         DateFormat[funct](intLength, this._locale)];

        return [index, new DateFormat(style, this._locale)];
      } else if (type == "number") {
        if (! NumberFormat) return [index, null];
        
        if (jsx3.util.strEmpty(style))
          return [index, NumberFormat.getNumberInstance(this._locale)];
        else if (style == "integer")
          return [index, NumberFormat.getIntegerInstance(this._locale)];
        else if (style == "percent")
          return [index, NumberFormat.getPercentInstance(this._locale)];
        else if (style == "currency")
          return [index, NumberFormat.getCurrencyInstance(this._locale)];
        else 
          return [index, new NumberFormat(style, this._locale)];
      } else {
        throw new jsx3.Exception(jsx3._msg("msfmt.bad_type", strFormat, this));
      }
    } else {
      return [index, null];
    }
  };
  
  /**
   * @return {String}
   */
  MessageFormat_prototype.toString = function() {
    return this._format;
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
 * Utility methods related to rendering HTML.
 */
jsx3.Package.definePackage('jsx3.html', function(html) {

  var Event = jsx3.gui.Event;

  /**
   * {int}
   * @package
   * @final @jsxobf-final
   */
  html.MODE_IE_QUIRKS = 0;

  /**
   * {int}
   * @package
   * @final @jsxobf-final
   */
  html.MODE_FF_QUIRKS = 1;

  /**
   * {int}
   * @package
   * @final @jsxobf-final
   */
  html.MODE_IE_STRICT = 2;

  /**
   * {int}
   * @package
   * @final @jsxobf-final
   */
  html.MODE_FF_STRICT = 3;

  html._UNSEL = '';
  html._CLPSE = 'overflow:hidden;';

  /**
   * Returns one of four values representing an intersection of the browser type (ff or ie) and the doctype (strict or quirks).
   * @param objGUI {Object} HTML element that will contain a given GI server instance
   * @return {int} one of: Box.MODE_IE_QUIRKS (0), Box.MODE_FF_Quirks (1), Box.MODE_IE_STRICT (2), Box.MODE_FF_STRICT (3)
   * @package
   */
  html.getMode = function(objGUI) {
    if (html._MODE == null) {
      var doc = objGUI != null ? objGUI.ownerDocument : document;
      //use the server container to paint the mode-test objects
      var objBody = objGUI || document.getElementsByTagName("body")[0];

      /* @jsxobf-clobber */
      html._MODE = html.MODE_IE_QUIRKS;
      //check the boxmodel using a textbox (if the textbox grew, mode is mozilla-strict or ie-strict)
      var test1 = '<input type="text" id="_jsx3_html_b1" style="position:absolute;top:0px;left:-120px;width:100px;height:30px;padding:8px;margin:0px;"/>';
      jsx3.html.insertAdjacentHTML(objBody, "beforeEnd", test1);

      var box1 = doc.getElementById("_jsx3_html_b1");
      if (box1.offsetHeight != 30) {
        html._MODE = jsx3.CLASS_LOADER.IE ? html.MODE_IE_STRICT : html.MODE_FF_STRICT;
      } else {
        //check the box model using a div (if the div grew, mode is mozilla quirks)
        var test2 = '<div id="_jsx3_html_b2" style="position:absolute;top:0px;left:-116px;width:100px;height:24px;padding:8px;"></div>';
        jsx3.html.insertAdjacentHTML(objBody, "beforeEnd", test2);
        var box2 = doc.getElementById("_jsx3_html_b2");

        if (parseInt(box2.offsetWidth) > 100)
          html._MODE = html.MODE_FF_QUIRKS;

        objBody.removeChild(box2);
      }

      objBody.removeChild(box1);
    }

    return html._MODE;
  };

  /**
   * Converts an empty X/HTML tag to a closed one. Non-recursive; assumes only a single empty tag (e.g, <br/>) and returns the expanded form (e.g., <br></br>)
   * If strHTML is not a string, strHTML will simply be returned  in its orignal form
   * @param strHTML {String} empty HTML element
   * @return {String}
   * @package
   */
  html.emptyToClosed = function(strHTML) {
    return (typeof(strHTML) == "string") ? strHTML.replace(/^<([^\s]*)([\s\S]*)\/>$/i,'<$1$2></$1>') : strHTML;
  };


  /** @package */
  html.restoreScrollPosition = function(objGUI) {
    //firefox has a bug where it does not remember scroll position when an html element has its display property toggled
    jsx3.sleep(function() {
      if (objGUI) {
        jsx3.html.findElements(objGUI, function(n) {
          if (n && n.nodeType == 1) {
            if(n._scrollTop) {
              n.scrollTop = n._scrollTop;
              delete n._scrollTop;
            }
            if(n._scrollLeft) {
              n.scrollLeft = n._scrollLeft;
              delete n._scrollLeft;
            }
          }
        }, true, true, false, true);
      }
    });
  };

  /** @package */
  html.persistScrollPosition = function(objGUI) {
    //firefox has a bug where it does not remember scroll position when an html element has its display property toggled
    if (objGUI) {
      jsx3.html.findElements(objGUI, function(n) {
        if (n && n.nodeType == 1) {
          if(n.scrollTop)
            n._scrollTop = n.scrollTop;
          if(n.scrollLeft)
            n._scrollLeft = n.scrollLeft;
        }
      }, true, true, false, true);
    }
  };

  html._tn = function(elm) {
    return (elm.nodeName || elm.tagName || "").toLowerCase();
  };

  /**
   * Reveals a DOM element by scrolling the necessary parent DIVs and SPANs.
   * @param objGUI {HTMLElement} the DOM element to reveal.
   * @param objRoot {HTMLElement} optionally, the last parent to reveal <code>objGUI</code> relative to.
   * @param intPaddingX {int} the desired horizontal pixel padding after revealing, if null then no horizontal
   *     repositioning if at least part of the DOM element is showing.
   * @param intPaddingY {int} the desired vertical pixel padding after revealing, if null then no vertical
   *     repositioning if at least part of the DOM element is showing.
   */
  html.scrollIntoView = function(objGUI, objRoot, intPaddingX, intPaddingY) {
    var objNode = objGUI.parentNode;

    if (intPaddingX == null) intPaddingX = 0;
    if (intPaddingY == null) intPaddingY = 0;

    while (objNode != null) {
      var tagName = html._tn(objNode);
      if (tagName == "span" || tagName == "div") {
        var relPos = html.getRelativePosition(objNode, objGUI);
        var oldLeft = objNode.scrollLeft, oldTop = objNode.scrollTop;
        var newLeft = oldLeft, newTop = oldTop;
          relPos.L += oldLeft;
          relPos.T += oldTop;

        // make horizontal dimension visible
        // left edge of child off view to the right
        if (objNode.clientWidth + newLeft <= relPos.L) {
          newLeft = (relPos.L + objGUI.offsetWidth) - objNode.clientWidth + intPaddingX;
        }
        // right edge of child off view to the right
        else if (intPaddingX && objNode.clientWidth + newLeft < relPos.L + objGUI.offsetWidth) {
          newLeft = (relPos.L + objGUI.offsetWidth) - objNode.clientWidth + intPaddingX;
        }
        // right edge of child off view to the left
        if (newLeft >= relPos.L + objGUI.offsetWidth) {
          newLeft = relPos.L - intPaddingX;
        }
        // left edge of child off view to the left
        else if (intPaddingX && newLeft > relPos.L) {
          newLeft = relPos.L - intPaddingX;
        }

        // make vertical dimension visible
        // top edge of child off view to the bottom
        if (objNode.clientHeight + newTop <= relPos.T) {
          newTop = (relPos.T + objGUI.offsetHeight) - objNode.clientHeight + intPaddingY;
        }
        // bottom edge of child off view to the bottom
        else if (intPaddingY && objNode.clientHeight + newTop < relPos.T + objGUI.offsetHeight) {
          newTop = (relPos.T + objGUI.offsetHeight) - objNode.clientHeight + intPaddingY;
        }
        // bottom edge of child off view to the top
        if (newTop >= relPos.T + objGUI.offsetHeight) {
          newTop = relPos.T - intPaddingY;
        }
        // top edge of child off view to the top
        else if (intPaddingY && newTop > relPos.T) {
          newTop = relPos.T - intPaddingY;
        }
        
        if (newLeft != oldLeft) objNode.scrollLeft = newLeft;
        if (newTop != oldTop) objNode.scrollTop = newTop;
      }

      if (objNode == objRoot) break;

      objNode = objNode.parentNode;
    }
  };


  html.getScrollSizeOffset = function(intSize,strCSS) {
    //firefox never offsets the scroll handles
    return 0;
  };

  html.addEventListener = function(objDOM, strName, objFn) {
    strName = strName.replace(/^on/,"");
    objDOM.addEventListener(strName, typeof(objFn) == "function" ? objFn : new Function("event", objFn), false);
  };

  html.removeEventListener = function(objDOM,strName,objFn) {
    strName = strName.replace(/^on/,"");
    objDOM.removeEventListener(strName, objFn, false);
  };

  html.removeStyle = function(objDOM, strName) {
    objDOM.style.removeProperty(strName);
  };

  html._FOCUSABLE = {input:true, textarea:true, select:true, body:true, a:true, img:true, button:true, frame:true,
      iframe:true, object:true};

  html.isFocusable = function(objGUI) {
    return objGUI.focus != null &&
        (parseInt(objGUI.tabIndex) >= 0 || html._FOCUSABLE[html._tn(objGUI)]);
  };

  html.createRule = function(selector,declaration,objDocument) {
    if(!objDocument) objDocument = document;
    var head = objDocument.getElementsByTagName("head")[0];
    var objStyle = (typeof objDocument.createElementNS != "undefined") ?
      objDocument.createElementNS("http://www.w3.org/1999/xhtml", "style") :
      objDocument.createElement("style");
    var styleRule = objDocument.createTextNode(selector + " {" + declaration + "}");
    objStyle.appendChild(styleRule);
    objStyle.setAttribute("type", "text/css");
    objStyle.setAttribute("media", "screen");
    head.appendChild(objStyle);
  };

  html.getRuleByName = function(strRuleName) {
    var mysheets = document.styleSheets;
    for(var j=0;j<mysheets.length;j++) {
      var mysheet = mysheets[j];
      for (var i=0; i<mysheet.cssRules.length; i++){
        if(mysheet.cssRules[i].selectorText == strRuleName)
          return mysheet.cssRules[i];
      }
    }
    return null;
  };

  html.getOuterHTML = function(objElement) {
    if (window.SVGElement && objElement instanceof SVGElement) {
      return (new XMLSerializer()).serializeToString(objElement);
    } else {
      var str = [];

      switch (objElement.nodeType) {
        case 1: // ELEMENT_NODE
          str[str.length] = "<" + html._tn(objElement);

          if (objElement.namespaceURI)
            str[str.length] = ' xmlns="' + objElement.namespaceURI + '"';

          for (var i=0; i<objElement.attributes.length; i++) {
            var item = objElement.attributes.item(i);
            if (item.nodeValue != null)
              str[str.length] = " " + item.nodeName + "=\"" + item.nodeValue + "\"";
          }

          if (objElement.childNodes.length == 0)// && leafElems[node.nodeName])
            str[str.length] = "/>";
          else {
            str[str.length] = ">" + objElement.innerHTML + "</" + html._tn(objElement) + ">";
          }
          break;

        case 3:  //TEXT_NODE
          str[str.length] = objElement.nodeValue;
          break;

        case 4: // CDATA_SECTION_NODE
          str[str.length] = "<![CDATA[" + objElement.nodeValue + "]]>";
          break;

        case 5: // ENTITY_REFERENCE_NODE
          str[str.length] = "&" + objElement.nodeName + ";";
          break;

        case 8: // COMMENT_NODE
          str[str.length] = "<!--" + objElement.nodeValue + "-->";
          break;

        default:
          if (objElement.childNodes) {
            for (var j = 0; j < objElement.childNodes.length; j++)
              str.push(html.getOuterHTML(objElement.childNodes[j]));
          }
          break;
      }

      return str.join("");
    }
  };

  html.setOuterHTML = function(objElement, strHTML) {
    if (window.SVGElement && objElement instanceof SVGElement) {
      if (! strHTML) {
        objElement.parentNode.removeChild(objElement);
      } else {
        var r = objElement.ownerDocument.createRange();
        r.setStartBefore(objElement);
        var df = r.createContextualFragment(strHTML);
        objElement.parentNode.replaceChild(df, objElement);
      }
    } else {
      try {
        var r = objElement.ownerDocument.createRange();
        r.setStartBefore(objElement);
        var df = r.createContextualFragment(strHTML);
        objElement.parentNode.replaceChild(df, objElement);
      } catch (e) {
        var trunc = typeof(strHTML) == "string" ? strHTML.substring(0, 50) : strHTML;
        throw new jsx3.Exception(jsx3._msg("html.set_outer", objElement, trunc), jsx3.NativeError.wrap(e));
      }
    }
  };

  html.removeNode = function(objElement) {
    objElement.parentNode.removeChild(objElement);
  };

  html.setInnerText = function(objElement, strText) {
    for (var i = objElement.childNodes.length - 1; i >= 0; i--)
      objElement.removeChild(objElement.childNodes[i]);

    objElement.appendChild(objElement.ownerDocument.createTextNode(strText));
  };

  html.insertAdjacentHTML = function(objElement, strWhere, strHTML) {
    if (strWhere.toLowerCase() == "beforeend") {
      var r = objElement.ownerDocument.createRange();
      r.setStartAfter(objElement);
      var df = r.createContextualFragment(strHTML);
      objElement.appendChild(df);
      return strHTML;
    } else if (strWhere.toLowerCase() == "beforebegin") {
      var r = objElement.ownerDocument.createRange();
      r.setStartBefore(objElement);
      var df = r.createContextualFragment(strHTML);
      objElement.parentNode.insertBefore(df,objElement);
      return strHTML;
    } else {
      throw new jsx3.Exception(jsx3._msg("html.adj", strWhere));
    }
  };



  html.updateCSSOpacity = function(objGUI, fltOpacity) {
    objGUI.style.opacity = fltOpacity.toString();
  };

  html.getCSSOpacity = function(dblPct) {
    return "opacity:" + dblPct + ";";
  };

  html.getRelativePosition = function(objRoot, objGUI) {
    objRoot = objRoot || objGUI.ownerDocument.getElementsByTagName("body")[0];
    var doc = objGUI.ownerDocument;
    var box, vpBox, myLeft, myTop;

    if (!objGUI.getBoundingClientRect) {
      box = doc.getBoxObjectFor(objGUI);
      vpBox = doc.getBoxObjectFor(objRoot);
      myLeft = box.screenX-vpBox.screenX + objRoot.scrollLeft;
      myTop = box.screenY-vpBox.screenY + objRoot.scrollTop;
    } else {
      box = objGUI.getBoundingClientRect();
      vpBox = objRoot.getBoundingClientRect();
      myLeft = box.left - vpBox.left + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft) - window.scrollX + objRoot.scrollLeft;
      myTop = box.top - vpBox.top + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop) - window.scrollY + objRoot.scrollTop;
    }
    return {L:myLeft,T:myTop,W:objGUI.offsetWidth,H:objGUI.offsetHeight};
  };



  html.copy = function(strText) {
    //get an instance of the clipboard
    netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
    var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
    if(clip) {
      //make sure clipboard is accessible
      var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
      if(trans) {
        //specify Unicode as the string format
        trans.addDataFlavor('text/unicode');

        //instance a native String
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        str.data = strText;

        //(is this due to unicode double-byte?)
        trans.setTransferData("text/unicode",str,strText.length*2);

        var clipid = Components.interfaces.nsIClipboard;
        clip.setData(trans,null,clipid.kGlobalClipboard);
      }
    }
  };

  html.paste = function() {
    netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
    var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard);
    if(clip) {
      var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
      if(trans) {
        trans.addDataFlavor("text/unicode");
        clip.getData(trans,clip.kGlobalClipboard);
        var str = {};
        var strLength = {};
        trans.getTransferData("text/unicode",str,strLength);

        if(str) str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
        return ((str) ? str.data.substring(0,strLength.value / 2) : null);
      }
    }
    return null;
  };


  /** @private @jsxobf-clobber */
  html._FADEH = jsx3.resolveURI("jsx:///images/icons/h.png");
  /** @private @jsxobf-clobber */
  html._FADEV = jsx3.resolveURI("jsx:///images/icons/v.png");

  /**
   * gets the CSS string appropriate to generate a top-down or left-to-right fade, appropriate for a windowbar
   * @param bLeftRight {Boolean} if true, returns the CSS property required to show a left-to-right fade within a narrow column (otherwise a top-down fade in a short row)
   * @return {object} CSS string
   * @package
   */
  html.getCSSFade = function(bLeftRight) {
    return html.getCSSPNG(bLeftRight ? html._FADEH : html._FADEV);
  };



  html.getCSSPNG = function(strResolvedURL) {
    return "background-image:url(" + strResolvedURL + ");";
  };


  /**
   * Traverses the browser DOM up from <code>objGUI</code> and returns the first GI DOM node that contains
   * <code>objGUI</code>.
   * @param objGUI {HTMLElement}
   * @param objServer {jsx3.app.Server} if provided, only return a DOM node from this server.
   * @return {jsx3.app.Model}
   */
  html.getJSXParent = function(objGUI, objServer) {
    while (objGUI != null) {
      if (objGUI.id && objGUI.id.indexOf("_jsx_") == 0) {
        var myJSX = objServer ? objServer.getJSXById(objGUI.id) : jsx3.GO(objGUI.id);
        if (myJSX != null)
          return myJSX;
      }

      // Traverse IFrames correctly
      if (!objGUI.parentNode) {
        var objWindow = objGUI.parentWindow || objGUI.defaultView;
        objGUI = objWindow ? objWindow.frameElement : null;       
      } else {
        objGUI = objGUI.parentNode;
      }
    }
    return null;
  };

  /**
   * @package
   */
  html.removeOutputEscaping = function(objGUI) {
    var queue = objGUI ? [objGUI] : [];
    while (queue.length > 0) {
      var node = queue.shift();
      if (node.nodeName && html._tn(node) == "span" && node.className == "disable-output-escp") {
        node.innerHTML = node.innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">").
            replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&([a-zA-Z_]+);/g, html._entNameToCode);
        node.removeAttribute("class");
      } else if (node.childNodes) {
        queue.push.apply(queue, this.nodesToArray(node.childNodes));
      }
    }
  };

  /**
   * @package
   */
  html.removeOutputEscapingSpan = function(strHTML) {
    return strHTML.replace(/<span class="disable-output-escp">([\s\S]*?)<\/span>/g,
        function(strMatch, text) {
          return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').
              replace(/&amp;/g, "&").replace(/&([a-zA-Z_]+);/g, html._entNameToCode);
        });
  };

  /** @private @jsxobf-clobber */
  html._ENT_MAP = {
    nbsp:160, copy:169, reg:174, deg:176, middot:183, le:8804, ge:8805, lt:60, gt:62, euro:8364, ndash:8211,
    mdash:8212, lsquo:8216, rsquo:8217, ldquo:8220, rdquo:8221, permil:8240
/* this would be the entire map:
    nbsp:160, iexcl:161, cent:162, pound:163, curren:164, yen:165, brvbar:166, sect:167, uml:168, copy:169, ordf:170,
    laquo:171, not:172, shy:173, reg:174, macr:175, deg:176, plusmn:177, sup2:178, sup3:179, acute:180, micro:181,
    para:182, middot:183, cedil:184, sup1:185, ordm:186, raquo:187, frac14:188, frac12:189, frac34:190, iquest:191,
    Agrave:192, Aacute:193, Acirc:194, Atilde:195, Auml:196, Aring:197, AElig:198, Ccedil:199, Egrave:200, Eacute:201,
    Ecirc:202, Euml:203, Igrave:204, Iacute:205, Icirc:206, Iuml:207, ETH:208, Ntilde:209, Ograve:210, Oacute:211,
    Ocirc:212, Otilde:213, Ouml:214, times:215, Oslash:216, Ugrave:217, Uacute:218, Ucirc:219, Uuml:220, Yacute:221,
    THORN:222, szlig:223, agrave:224, aacute:225, acirc:226, atilde:227, auml:228, aring:229, aelig:230, ccedil:231,
    egrave:232, eacute:233, ecirc:234, euml:235, igrave:236, iacute:237, icirc:238, iuml:239, eth:240, ntilde:241,
    ograve:242, oacute:243, ocirc:244, otilde:245, ouml:246, divide:247, oslash:248, ugrave:249, uacute:250, ucirc:251,
    uuml:252, yacute:253, thorn:254, yuml:255, fnof:402, Alpha:913, Beta:914, Gamma:915, Delta:916, Epsilon:917,
    Zeta:918, Eta:919, Theta:920, Iota:921, Kappa:922, Lambda:923, Mu:924, Nu:925, Xi:926, Omicron:927, Pi:928,
    Rho:929, Sigma:931, Tau:932, Upsilon:933, Phi:934, Chi:935, Psi:936, Omega:937, beta:946, gamma:947, delta:948,
    epsilon:949, zeta:950, eta:951, theta:952, iota:953, kappa:954, lambda:955, mu:956, nu:957, xi:958, omicron:959,
    pi:960, rho:961, sigmaf:962, sigma:963, tau:964, upsilon:965, phi:966, chi:967, psi:968, omega:969, thetasym:977,
    upsih:978, piv:982, bull:8226, hellip:8230, prime:8242, Prime:8243, oline:8254, frasl:8260, weierp:8472, image:8465,
    real:8476, trade:8482, alefsym:8501, larr:8592, uarr:8593, rarr:8594, darr:8595, harr:8596, crarr:8629, lArr:8656,
    uArr:8657, rArr:8658, dArr:8659, hArr:8660, forall:8704, part:8706, exist:8707, empty:8709, nabla:8711, isin:8712,
    notin:8713, ni:8715, prod:8719, sum:8721, minus:8722, lowast:8727, radic:8730, prop:8733, infin:8734, ang:8736,
    and:8743, or:8744, cap:8745, cup:8746, int:8747, there4:8756, sim:8764, cong:8773, asymp:8776, ne:8800, equiv:8801,
    le:8804, ge:8805, sub:8834, sup:8835, nsub:8836, sube:8838, supe:8839, oplus:8853, otimes:8855, perp:8869,
    sdot:8901, lceil:8968, rceil:8969, lfloor:8970, rfloor:8971, lang:9001, rang:9002, loz:9674, spades:9824,
    clubs:9827, hearts:9829, diams:9830, amp:38, lt:60, gt:62, OElig:338, oelig:339, Scaron:352, scaron:353, Yuml:376,
    circ:710, tilde:732, ensp:8194, emsp:8195, thinsp:8201, zwnj:8204, zwj:8205, lrm:8206, rlm:8207, ndash:8211,
    mdash:8212, lsquo:8216, rsquo:8217, sbquo:8218, ldquo:8220, rdquo:8221, bdquo:8222, dagger:8224, Dagger:8225,
    permil:8240, lsaquo:8249, rsaquo:8250, euro:8364
*/
  };

  /** @private @jsxobf-clobber */
  html._entNameToCode = function(strMatch, strName) {
    var code = html._ENT_MAP[strName];
    return code ? ("&#" + code + ";") : strMatch;
  };

  /** @private @jsxobf-clobber */
  html._IMAGE_LOADER_ID = "jsx_image_loader";

  /**
   * Pre-loads images into the HTML page so that they are available immediately when a control paints them.
   * @param varImages {String...|jsx3.net.URI...|Array<String|jsx3.net.URI>} one or more relative URIs to image files. Each URI will be resolved against the
   *    default resolver.
   */
  html.loadImages = function(varImages) {
    var imageDiv = document.getElementById(html._IMAGE_LOADER_ID);
    if (imageDiv == null) {
      var body = document.getElementsByTagName("body")[0];
      if (body) {
        imageDiv = document.createElement("div");
        imageDiv.id = html._IMAGE_LOADER_ID;
        imageDiv.style.display = "none";
        // NOTE: needs to be inserted as the first child of BODY so as not to mess up IE DOM parsing
        body.insertBefore(imageDiv, body.firstChild);
      } else {
        return;
      }
    }

    var a = jsx3.$A.is(varImages) ? varImages : arguments;
    for (var i = 0; i < a.length; i++) {
      if (!a[i]) continue;
      var src = jsx3.resolveURI(a[i]);
      var id = html._IMAGE_LOADER_ID + "_" + src;
      if (document.getElementById(id) == null) {
        var image = document.createElement("img");
        image.setAttribute("alt", "");
        image.setAttribute("id", id);
        image.setAttribute("src", "" + src);
        imageDiv.appendChild(image);
      }
    }
  };

  /**
   * Updates a given style on a named CSS rule
   * @param strRuleName {String} rule name. For example: <code>img.big</code> or <code>.big</code> or <code>#myid</code>
   * @param strStyleName {String} name of style.  For example: <code>backgroundColor</code>
   * @param strValue {String} For example: <code>orange</code>
   * @package
   */
  html.updateRule = function(strRuleName, strStyleName, strValue) {
    var objRule = jsx3.html.getRuleByName(strRuleName);
    if(objRule) objRule.style[strStyleName] = strValue;
  };

  /** @package */
  html.getElementById = function(objRoot, strId, bDepthFirst) {
    return this.findElements(objRoot, function(x) { return x.id == strId; }, bDepthFirst, false, false, true);
  };

  /** @package */
  html.getElementByTagName = function(objRoot, strTagName, bDepthFirst) {
    strTagName = strTagName.toLowerCase();
    return this.findElements(objRoot, function(x) { return html._tn(x) == strTagName; },
        bDepthFirst, false, false, true);
  };

  /** @package */
  html.getElementsByTagName = function(objRoot, strTagName, bDepthFirst) {
    strTagName = strTagName.toLowerCase();
    return this.findElements(objRoot, function(x) { return html._tn(x) == strTagName; },
        bDepthFirst, true, false, true);
  };

  /** @package */
  html.findElements = function(objRoot, fctTest, bDepthFirst, bMultiple, bShallow, bIncludeSelf) {
    var fctPush = bDepthFirst ? 'unshift' : 'push';
    var matches = bMultiple ? [] : null;
    var list = bIncludeSelf ? [objRoot] : this.nodesToArray(objRoot.childNodes);

    while (list.length > 0) {
      var node = list.shift();

      if (fctTest.call(null, node)) {
        if (bMultiple)
          matches[matches.length] = node;
        else
          return node;
      }

      if (! bShallow)
        list[fctPush].apply(list, this.nodesToArray(node.childNodes));
    }

    return matches;
  };

  /** @package */
  html.getElmUpByTagName = function(objStart, strTagName, bIncludeSelf) {
    return html.findElementUp(objStart, function(x) { return html._tn(x) == strTagName; }, bIncludeSelf);
  };

  /** @package */
  html.findElementUp = function(objStart, fctTest, bIncludeSelf) {
    var objRoot = objStart.ownerDocument.documentElement;
    var node = bIncludeSelf ? objStart : objStart.parentNode;
    while (node != null) {
      if (fctTest.call(null, node))
        return node;
      if (node == objRoot) break;
      node = node.parentNode;
    }
    return null;
  };

  /** @package */
  html.selectSingleElm = function(objRoot, args) {
    var index = 1, arrArgs = arguments;
    if (arguments.length == 2) {
      if (typeof(args) == "string") {
        index = 0;
        arrArgs = args.split(/\//g);
      } else if (jsx3.$A.is(args)) {
        index = 0;
        arrArgs = args;
      }
    }

    var node = objRoot;
    for (var i = index; node != null && i < arrArgs.length; i++) {
      var token = arrArgs[i];
      if (!(isNaN(token))) {
        var n = Number(token);
        var ct = node.childNodes.length;
        var realIndex = 0, elmFound = 0;
        for (; realIndex < ct && elmFound < n; realIndex++) {
          if (node.childNodes[realIndex].nodeType == 1)
            elmFound++;
        }
        node = node.childNodes[realIndex];
      } else {
        throw new jsx3.Exception();
      }
    }

    return node;
  };

  /** @package */
  html.nodesToArray = function(nodes) {
    var a = new Array(nodes.length);
    for (var i = 0; i < nodes.length; i++)
      a[i] = nodes[i];
    return a;
  };

  /**
   * @package
   */
  html.getSelection = function(objTextElm) {
    return new html.Selection(objTextElm);
  };

  /**
   * Focuses the next HTML element that should receive focus. The objEvent should be a native browser
   * key down event with a key of TAB.
   * @package
   */
  html.focusNext = function(objGUI, objEvent) {
    var last = objGUI;
    while (last.lastChild) last = last.lastChild;
    while (!html.isFocusable(last) && last != objGUI)
      last = last.previousSibling || last.parentNode;

    if (last != objGUI || html.isFocusable(last)) {
//      jsx3.log("focusing next of: " + html.getOuterHTML(last));
      if (last.onfocus != null) {
        var temp = last.onfocus;
        last.onfocus = null;
        last.focus();
        jsx3.sleep(function(){last.onfocus = temp;});
      } else {
        last.focus();
      }
    }
  };

  /**
   * Focuses the previous HTML element that should receive focus. The objEvent should be a native browser
   * key down event with a key of shift+TAB.
   * @package
   */
  html.focusPrevious = function(objGUI, objEvent) {
    var first = this.findElements(objGUI, function(x) { return html.isFocusable(x); }, true, false, false, true);
    if (first != null) {
//      jsx3.log("focusing previous of: " + html.getOuterHTML(first));
      if (first.onfocus != null) {
        var temp = first.onfocus;
        first.onfocus = null;
        first.focus();
        jsx3.sleep(function(){first.onfocus = temp;});
      } else {
        first.focus();
      }
    }
  };


  html.focus = function(elm) {
    try {
      if (elm.focus)
        elm.focus();
    } catch (e) {}
  };


  html.addClass = function(elm, c) {
    var val = elm.className;
    if (val) {
      if (!jsx3.$A(val.split(/\s+/g)).contains(c))
        elm.className = val + " " + c;
    } else {
      elm.className = c;
    }
  };

  html.removeClass = function(elm, c) {
    var val = elm.className;
    if (val && val.indexOf(c) >= 0) {
      var a = jsx3.$A(val.split(/\s+/g));
      if (a.remove(c))
        elm.className = a.join(" ");
    }
  };

});

/**
 * @package
 */
jsx3.Class.defineClass('jsx3.html.Selection', null, null, function(Selection, Selection_prototype) {

  var html = jsx3.html;
  

  Selection_prototype.init = function(objTextElm) {
    /* @jsxobf-clobber */
    this._selection = {elm:objTextElm, start:objTextElm.selectionStart, end:objTextElm.selectionEnd,
        scrollt:objTextElm.scrollTop, scrolll:objTextElm.scrollLeft};
  };

  Selection_prototype.getStartIndex = function() {
    return this._selection.start;
  };

  Selection_prototype.getEndIndex = function() {
    return this._selection.end;
  };

  Selection_prototype.setRange = function(intStart, intEnd) {
    this._selection.start = intStart;
    this._selection.end = intEnd;
    this._selection.elm.setSelectionRange(intStart, intEnd);
  };

  Selection_prototype.getOffsetLeft = function() {
    if (this._selection.pos == null)
      this._selection.pos = jsx3.html.getRelativePosition(null, this._selection.elm);
    return this._selection.pos.L;
  };

  Selection_prototype.getOffsetTop = function() {
    if (this._selection.pos == null)
      this._selection.pos = jsx3.html.getRelativePosition(null, this._selection.elm);
    return this._selection.pos.T;
  };

  Selection_prototype.getText = function() {
    return this._selection.elm.value.substring(this._selection.start, this._selection.end);
  };

  Selection_prototype.setText = function(strText) {
    this._selection.elm.value = this._selection.elm.value.substring(0, this._selection.start) +
        strText + this._selection.elm.value.substring(this._selection.end);
    this._selection.elm.setSelectionRange(this._selection.start, this._selection.start + strText.length);
    this._selection.elm.end = this._selection.elm.selectionEnd;
  };

  Selection_prototype.insertCaret = function(strWhere) {
    this._selection.elm.focus();

    if (strWhere == "end") {
      this._selection.elm.setSelectionRange(this._selection.elm.end, this._selection.elm.end);
    } else {
      throw new jsx3.Exception();
    }

    this._selection.elm.scrollTop = this._selection.scrollt;
    this._selection.elm.scrollLeft = this._selection.scrolll;
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
 * Provides cached access to XML and XSL data.
 *
 * <h4>Events</h4>
 * Cache instances publish two types of events for every operation that modifies the contents of the cache. The
 * schemas of the two event types are
 * <ul>
 *   <li><code>subject</code> - <code>Cache.CHANGE</code></li>
 *   <li><code>id</code> or <code>ids</code> - the ID or array of IDs of the modified documents</li>
 *   <li><code>action</code> - <code>Cache.ADD</code>, <code>Cache.CHANGE</code> or <code>Cache.REMOVE</code></li>
 * </ul>
 * and
 * <ul>
 *   <li><code>subject</code> - the cache ID of the modified document</li>
 *   <li><code>action</code> - <code>Cache.ADD</code>, <code>Cache.CHANGE</code> or <code>Cache.REMOVE</code></li>
 * </ul>
 *
 * <h4>Asynchronous Loading</h4>
 * Cache documents can be loaded asychronously with the <code>getOrOpenAsync()</code> method. This method returns
 * the corresponding document synchronously if it already exists in the cache. If the document does not exist in the
 * cache, then it is loaded asynchronously and the method returns a placeholder document. The namespace URI of this
 * placeholder document is <code>Cache.XSDNS</code> and its root node name is <code>"loading"</code>.
 * <p/>
 * Since the cache stores this placeholder document until the document finishes loading, subsequent calls to
 * synchronous APIs (<code>getDocument()</code>, <code>getOrOpenDocument()</code>, etc) may also return the
 * placeholder document. It is therefore important to check the namespace of the returned document when any code
 * uses the asynchronous APIs.
 * <p/>
 * Once a document finishes loading asynchronously the placeholder document is replaced with the loaded document.
 * This change in value causes the cache to publish a pair of events of action <code>Cache.CHANGE</code>. If
 * loading the document fails or times out the placeholder document is instead replaced with another placeholder
 * document. This document also has a URI namespace of <code>Cache.XSDNS</code>. Its root node name may be either
 * <code>"error"</code> or <code>"timeout"</code>. If the root node name is <code>"error"</code> then the root node
 * has an attribute, also named <code>"error"</code>, which contains the XML error message.
 */
jsx3.Class.defineClass("jsx3.app.Cache", null, [jsx3.util.EventDispatcher], function(Cache, Cache_prototype) {

  var Document = jsx3.xml.Document;

  /**
   * {String} Event action.
   * @since 3.5
   * @final @jsxobf-final
   */
  Cache.REMOVE = "remove";

  /**
   * {String} Event action.
   * @since 3.5
   * @final @jsxobf-final
   */
  Cache.ADD = "add";

  /**
   * {String} Event subject and action.
   * @since 3.5
   * @final @jsxobf-final
   */
  Cache.CHANGE = "change";

  /**
   * {int} The number of milliseconds before asynchronous document loads time out.
   * @since 3.5
   */
  Cache.ASYNC_TIMEOUT = 60000;

  /**
   * {String}
   * @since 3.5
   */
  Cache.XSDNS = "http://xsd.tns.tibco.com/gi/cache";

  /** @private @jsxobf-clobber */
  Cache._LOADING_DOC = new Document().loadXML('<loading xmlns="' + Cache.XSDNS + '"/>');
  /** @private @jsxobf-clobber */
  Cache._TIMEOUT_DOC = new Document().loadXML('<timeout xmlns="' + Cache.XSDNS + '"/>');
  /** @private @jsxobf-clobber */
  Cache._ERROR_DOC = new Document().loadXML('<error xmlns="' + Cache.XSDNS + '"/>');

  /**
   * Creates a new instance of this class.
   */
  Cache_prototype.init = function() {
    // declare an object array to hold all cache documents
    /* @jsxobf-clobber */
    this._index = {};
    /* @jsxobf-clobber */
    this._parents = [];
  };
  
  Cache_prototype.addParent = function(objParent) {
    this._parents.push(objParent);
  };

  /**
   * Removes the document stored in this cache under id <code>strId</code>.
   * @param strId {String}
   * @return {jsx3.xml.Document} the remove document, if any.
   */
  Cache_prototype.clearById = function(strId) {
    var objRecord = this._index[strId];
    if (objRecord) {
      delete this._index[strId];
      this._cleanUpRecord(objRecord);
      this.publish({subject:strId, action:Cache.REMOVE});
      this.publish({subject:Cache.CHANGE, id:strId, action:Cache.REMOVE});
      return objRecord.jsxdocument;
    }
  };


  /**
   * returns whether or not the given document in the cache is owned by the system. If no document by the given ID exists, false is returned.
   * @param strId {String} unique identifier for the jsx3.xml.DocumentInstance instance when it was placed in the cache
   * @return {boolean} <code>false</code>.
   * @deprecated
   */
  Cache_prototype.isSystem = function(strId) {
    return false;
//    return this._index[strId] != null && this._index[strId].jsxsystem;
  };


  /**
   * Removes all documents placed in this cache before <code>intTimestamp</code>.
   * @param intTimestamp {int|Date} epoch seconds or a date object.
   * @return {Array<String>} the ids of the removed documents.
   */
  Cache_prototype.clearByTimestamp = function(intTimestamp) {
    if (intTimestamp instanceof Date) intTimestamp = intTimestamp.getTime();

    var ids = [];

    for (var p in this._index) {
      var record = this._index[p];
      if (record.jsxtimestamp < intTimestamp) {
        delete this._index[p];
        this._cleanUpRecord(record);
        this.publish({subject:p, action:Cache.REMOVE});
        ids.push(p);
      }
    }

    if (ids.length > 0)
      this.publish({subject:Cache.CHANGE, ids:ids, action:Cache.REMOVE});

    return ids;
  };

  /**
   * Returns the document stored in this cache under id <code>strId</code>.
   * @param strId {String}
   * @return {jsx3.xml.Document} the stored document or <code>null</code> if none exists.
   */
  Cache_prototype.getDocument = function(strId) {
    if (this._index[strId] != null)
      return this._index[strId].jsxdocument;
    
    for (var i = 0; i < this._parents.length; i++) {
      var doc = this._parents[i].getDocument(strId);
      if (doc != null) return doc;
    }

    return null;
  };
  
  /**
   * Retrieves a document from this cache or, if this cache contains no such document, loads the document
   * synchronously and returns it.
   * @param strURL {String|jsx3.net.URI} the URI of the document.
   * @param strId {String} the id under which the document is/will be stored. If this parameter is not provided, the
   *    <code>strURL</code> parameter is used as the id.
   * @param objClass {jsx3.lang.Class} <code>jsx3.xml.Document</code> (default value) or one of its subclasses. The
   *    class with which to instantiate the new document instance if a new document is opened.
   * @return {jsx3.xml.Document} the document retrieved from the cache or loaded.
   */
  Cache_prototype.getOrOpenDocument = function(strURL, strId, objClass) {
    if (strId == null) strId = strURL.toString();
    return this.getDocument(strId) || this._openDocument(strURL, strId, objClass, false);
  };

  /**
   * Synchronously loads an xml document, stores it in this cache, and returns the loaded document.
   * @param strURL {String|jsx3.net.URI} url (relative or absolute) the URI of the document to open.
   * @param strId {String} the id under which to store the document. If this parameter is not provided, the
   *    <code>strURL</code> parameter is used as the id.
   * @param objClass {jsx3.lang.Class} <code>jsx3.xml.Document</code> (default value) or one of its subclasses. The
   *    class with which to instantiate the new document instance.
   * @return {jsx3.xml.Document} the loaded document object.
   */
  Cache_prototype.openDocument = function(strURL, strId, objClass) {
    return this._openDocument(strURL, strId, objClass, false);
  };

  /**
   * Asynchronously loads an xml document and stores it in this cache.
   *
   * @param strURL {String|jsx3.net.URI} url (relative or absolute) the URI of the document to open.
   * @param strId {String} the id under which to store the document. If this parameter is not provided, the
   *    <code>strURL</code> parameter is used as the id.
   * @param objClass {jsx3.lang.Class} <code>jsx3.xml.Document</code> (default value) or one of its subclasses. The
   *    class with which to instantiate the new document instance.
   * @return {jsx3.xml.Document} the document retrieved from the cache or a placeholder document if the document
   *    is in the process of loading asynchronously.
   * @since 3.5
   */
  Cache_prototype.getOrOpenAsync = function(strURL, strId, objClass) {
    if (strId == null) strId = strURL.toString();
    return this.getDocument(strId) || this._openDocument(strURL, strId, objClass, true);
  };

  /** @private @jsxobf-clobber */
  Cache_prototype._openDocument = function(strURL, strId, objClass, bAsync) {
    if (objClass == null) objClass = Document.jsxclass;
    if (strId == null) strId = strURL.toString();

    var objXML = objClass.newInstance();
    objXML.setAsync(bAsync);

    if (bAsync) {
      var loadingDoc = objXML;
      loadingDoc.subscribe("*", this, "_onAsyncDone");
      /* @jsxobf-clobber */
      loadingDoc._jsxcacheid = strId;
      loadingDoc.load(strURL, Cache.ASYNC_TIMEOUT);
      
      objXML = Cache._LOADING_DOC.cloneDocument();
      /* @jsxobf-clobber */
      objXML._loadingDoc = loadingDoc; // Store a reference to the original loading document
    } else {
      objXML.load(strURL);
    }

    this.setDocument(strId, objXML);
    return objXML;
  };

  /** @package @jsxobf-clobber-shared */
  Cache_prototype._replaceDocument = function(strId, objDoc) {
    if (this._index[strId])
      this._index[strId].jsxdocument = objDoc;
    else
      this._index[strId] = {jsxdocument:objDoc, jsxtimestamp:(new Date()).getTime()};
  };

  /** @private @jsxobf-clobber */
  Cache_prototype._cleanUpRecord = function(r) {
    // unsubscribe to asynchronous loading
    var doc = r.jsxdocument._loadingDoc;
    if (doc) {
      doc.unsubscribe("*", this);
      doc.abort();
    }
  };

  /** @private @jsxobf-clobber */
  Cache_prototype._onAsyncDone = function(objEvent) {
    var objXML = objEvent.target;
    var strEvtType = objEvent.subject;
    var strId = objXML._jsxcacheid;

    delete objXML._jsxcacheid;
    objXML.unsubscribe("*", this);

    if (this._index) {
      var d;

      if (strEvtType == Document.ON_RESPONSE) {
        d = objXML;
      } else if (strEvtType == Document.ON_TIMEOUT) {
        d = Cache._TIMEOUT_DOC.cloneDocument();
      } else if (strEvtType == Document.ON_ERROR) {
        d = Cache._ERROR_DOC.cloneDocument();
        d.setAttribute("error", objXML.getError().toString());
      } else {
        return;
      }

      this.setDocument(strId, d);
      // lets Cacheable determine whether change event is due to load or setDocument
      this.publish({subject:"load." + strId, action:"load", response:strEvtType, id:strId});
    }
  };

  /**
   * Stores the document <code>objDocument</code> in this cache under id <code>strId</code>. If a document already
   * exists in this cache under <code>strId</code> then that document is removed from the cache.
   *
   * @param strId {String} the id under which to store <code>objDocument</code>.
   * @param objDocument {jsx3.xml.Document} 
   */
  Cache_prototype.setDocument = function(strId, objDocument) {
    if (strId == null) throw new jsx3.IllegalArgumentException("strId", strId);
    if (objDocument == null) throw new jsx3.IllegalArgumentException("objDocument", objDocument);
    
    //create a new cache object
    var record = {};
    /* @jsxobf-clobber */
    record.jsxtimestamp = (new Date()).getTime();
    /* @jsxobf-clobber */
    record.jsxdocument = objDocument;

    var evtAction = Cache.ADD;

    // check whether a document already exists in the cache
    var oldRecord = this._index[strId];
    if (oldRecord) {
      evtAction = Cache.CHANGE;
      this._cleanUpRecord(oldRecord);
    }

    //persist to cache
    this._index[strId] = record;

    this.publish({subject:strId, action:evtAction, id:strId});
    this.publish({subject:Cache.CHANGE, action:evtAction, id:strId});
  };

  /**
   * Returns the timestamp from when the document stored under id <code>strId</code> was stored in this cache.
   * @param strId {String} the id under which the document is stored.
   * @return {int} the timestamp as an integer (epoch seconds) or <code>null</code> if no such document exists
   *    in this cache.
   */
  Cache_prototype.getTimestamp = function(strId) {
    var record = this._index[strId];
    return record != null ? record.jsxtimestamp : null;
  };

  /**
   * Returns a list of all the keys in this cache instance.
   * @return {Array<String>}
   */
  Cache_prototype.keys = function() {
    var keys = [];
    for (var f in this._index)
      keys[keys.length] = f;
    return keys;
  };
  
  /**
   * Removes all references to documents contained in this cache. This cache is no longer usable after calling this
   * method.
   */
  Cache_prototype.destroy = function() {
    delete this._index;
    delete this._parents;
  };
  
});


/**
 * @deprecated  Renamed to jsx3.app.Cache
 * @see jsx3.app.Cache
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.Cache", -, null, function(){});
 */
jsx3.Cache = jsx3.app.Cache;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Represents a repository of dynamic properties. Dynamic properties are simply name-value pairs. Dynamic properties
 * can be loaded from an XML file in the CDF dynamic property format.
 *
 * @since 3.2
 */
jsx3.Class.defineClass("jsx3.app.Properties", null, null, function(Properties, Properties_prototype) {

  var LOG = jsx3.util.Logger.getLogger(Properties.jsxclass.getName());

  /** @private @jsxobf-clobber */
  Properties.GLOBAL_KEY = "_global";

  /**
   * The instance initializer.
   */
  Properties_prototype.init = function() {
    /* @jsxobf-clobber */
    this._parents = [];
    /* @jsxobf-clobber */
    this._children = [];
    /* @jsxobf-clobber */
    this._order = [Properties.GLOBAL_KEY];
    /* @jsxobf-clobber */
    this._docs = {};
    this._docs[Properties.GLOBAL_KEY] = {};
    /* @jsxobf-clobber */
    this._master = {};
    /* @jsxobf-clobber */
    this._masterDirty = false;
    /* @jsxobf-clobber */
    this._parentsMaster = {};
    /* @jsxobf-clobber */
    this._parentsDirty = false;
  };

  /**
   * Loads a set of dynamic properties from an XML document into this repository. The document should be a shallow
   * CDF document with any number of <code>record</code> elements defined under the root <code>data</code> element.
   * <p/>
   * The following CDF attributes are supported:
   * <ul>
   * <li><code>jsxid</code> &#8211; the property key, required.</li>
   * <li><code>jsxtext</code> &#8211; the property value, required.</li>
   * <li><code>eval</code> &#8211; if <code>"1"</code> or <code>"true"</code> the <code>jsxtext</code> attribute
   *    is evaluated with JavaScript, optional.</li>
   * </ul>
   *
   * @param objXML {jsx3.xml.Entity}
   * @param strId {String} specifies the id to store the document under. If none is provided, the default space is
   *    used.
   */
  Properties_prototype.loadXML = function(objXML, strId) {

    if (strId == null) {
      strId = Properties.GLOBAL_KEY;
    } else if (jsx3.util.arrIndexOf(this._order, strId) < 0) {
      this._order.splice(1, 0, strId);
    }

    var doc = this._docs[strId];
    if (doc == null)
      doc = this._docs[strId] = {};

    for (var i = objXML.selectNodeIterator("./record"); i.hasNext(); ) {
      var next = i.next();

      var id = next.getAttribute("jsxid");
      var eval = next.getAttribute("eval");
      var text = next.getAttribute("jsxtext");

      if (eval == "1" || eval == "true") {
        try {
          text = isNaN(text) ? jsx3.eval(text) : Number(text);
        } catch (e) {
          LOG.warn(jsx3._msg("props.eval", id, text), jsx3.NativeError.wrap(e));
        }
      }
      doc[id] = text;
    }

    // The cache and the parent cache of each child are dirty
    this._masterDirty = true;

  };

  /**
   * Adds a parent property repository to this repository. <code>get()</code> consults all parents before returning
   * <code>undefined</code>.
   * @param objParent {jsx3.app.Properties}
   * @see #get()
   */
  Properties_prototype.addParent = function(objParent) {
    this._parents.splice(0, 0, objParent);
    objParent._children.push(this);

    // Parent cache is dirty
    this._setChildrenDirty(true);
  };

  /**
   * Removes a property repository from the set of parent repositories.
   * @param objParent {jsx3.app.Properties} the parent repository to remove.
   */
  Properties_prototype.removeParent = function(objParent) {
    var index = jsx3.util.arrIndexOf(this._parents, objParent);
    if (index >= 0) {
      this._parents.splice(index, 1);
      objParent._removeChild(this);

      // Parent cache is dirty
      this._setChildrenDirty(true);
    }
  };

  /** @private @jsxobf-clobber */
  Properties_prototype._removeChild = function(objChild) {
    var index = jsx3.util.arrIndexOf(this._children, objChild);
    if (index >= 0)
      this._children.splice(index, 1);
  };

  /**
   * Removes all parent property repositories.
   */
  Properties_prototype.removeAllParents = function() {
    if (this._parents.length > 0) {
      for (var i = 0; i < this._parents.length; i++)
        this._parents[i]._removeChild(this);
      this._parents = [];

      this._parentsDirty = false;
      this._parentsMaster = {};
    }
  };

  /**
   * Returns the list of parent repositories of this repository.
   * @return {Array<jsx3.app.Properties>}
   */
  Properties_prototype.getParents = function() {
    return this._parents.concat();
  };

  /**
   * Returns whether this property repository contains a particular property. Parent repositories are not consulted.
   * @param strKey {String} the property key to query for.
   * @return {boolean} <code>true</code> if this repository contains a property with the given key.
   */
  Properties_prototype.containsKey = function(strKey) {
    if (this._masterDirty)
      this._reconstructMaster();

    return typeof(this._master[strKey]) != "undefined";
  };

  /**
   * Returns a list of all the property keys contained in this repository. Parent repositories are not consulted.
   * @return {Array<String>}
   */
  Properties_prototype.getKeys = function() {
    if (this._masterDirty)
      this._reconstructMaster();

    var keys = [];
    for (var f in this._master) keys[keys.length] = f;
    return keys;
  };

  /**
   * Returns the value of a property for a particular key. This method consults the parent repositories as necessary
   * until a property is found. If no property is found, <code>undefined</code> is returned.
   * @param strKey {String} the property key to query for.
   * @return {Object|undefined}
   */
  Properties_prototype.get = function(strKey) {
    if (this._masterDirty)
      this._reconstructMaster();

    if (typeof(this._master[strKey]) != "undefined")
      return this._master[strKey];

    if (this._parentsDirty)
      this._reconstructParentsMaster();

    return this._parentsMaster[strKey];
  };

  /**
   * Sets a property in this repository in the global space.
   * @param strKey {String} the key of the property to set.
   * @param strValue {Object} the value of the property. This value may be <code>null</code>, in which case
   *   <code>null</code> will be stored as the property value. This value may not be <code>undefined</code>; use
   *   <code>remove()</code> to remove a property value.
   * @see #remove()
   */
  Properties_prototype.set = function(strKey, strValue) {
    if (typeof(strValue) == "undefined") throw new jsx3.IllegalArgumentException("strValue", strValue);
    // 1. set the value in the memory space
    this._docs[Properties.GLOBAL_KEY][strKey] = strValue;

    // 2. update the cache
    this._master[strKey] = strValue;

    // 3. tell children that a parent cache is dirty
    this._setChildrenDirty();
  };

  /**
   * Removes a property from this repository. The property is removed from all spaces.
   * @param strKey {String} the key of the property to remove.
   */
  Properties_prototype.remove = function(strKey) {
    // 1. remove the value from all memory spaces
    for (var key in this._docs)
      delete this._docs[key][strKey];

    // 2. update the cache
    delete this._master[strKey];

    // 3. tell children that a parent cache is dirty
    this._setChildrenDirty();
  };

  /** @private @jsxobf-clobber */
  Properties_prototype._reconstructMaster = function() {
    this._masterDirty = false;
    var master = this._master = {};

    for (var i = this._order.length - 1; i >= 0; i--) {
      var doc = this._docs[this._order[i]];
      for (var f in doc)
        master[f] = doc[f];
    }
  };

  /** @private @jsxobf-clobber */
  Properties_prototype._reconstructParentsMaster = function() {
    this._parentsDirty = false;
    var master = this._parentsMaster = {};

    for (var i = this._parents.length - 1; i >= 0; i--) {
      var p = this._parents[i];
      if (p._masterDirty)
        p._reconstructMaster();
      if (p._parentsDirty)
        p._reconstructParentsMaster();

      var m1 = p._master;
      var m2 = p._parentsMaster;

      for (var f in m2)
        master[f] = m2[f];
      for (var f in m1)
        master[f] = m1[f];
    }
  };

  /** @private @jsxobf-clobber */
  Properties_prototype._setChildrenDirty = function(bMe) {
    var stack = bMe ? [this] : this._children.concat();

    while (stack.length > 0) {
      var p = stack.shift();
      if (!p._parentsDirty) {
        p._parentsDirty = true;
        stack.push.apply(stack, p._children);
      }
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

// @jsxobf-clobber  _locale _path

/**
 * A subclass of <code>jsx3.app.Properties</code> that supports localized properties. Using this class, an application
 * can define properties for a number of locales but only load the properties necessary to display a particular
 * locale. Additionally, this class supports fall-through so that if a property is not defined for a particular locale
 * that locale inherits the value from the next most specific locale.
 * <p/>
 * A properties bundle can consist of one or more XML files. The main file, <i>fileName.ext</i>, contains the
 * properties for the default locale, as well as the properties for any number of other locales, and metadata
 * indicating what locales are available external to the main file. The format of this file is:
 *
 * <pre>
 * &lt;data jsxnamespace="propsbundle" locales="<b>externalLocales</b>"&gt;
 *   &lt;!-- the default locale --&gt;
 *   &lt;locale&gt;
 *     &lt;record jsxid="<b>propId</b>" jsxtext="<b>propValue</b>"/&gt;
 *     ...
 *   &lt;/locale&gt;
 *
 *   &lt;!-- additional locales --&gt;
 *   &lt;locale key="en_US"&gt;
 *     &lt;record jsxid="<b>propId</b>" jsxtext="<b>propValueEnUs</b>"/&gt;
 *     ...
 *   &lt;/locale&gt;
 *
 *   ...
 * &lt;/data&gt;
 * </pre>
 *
 * <i>externalLocales</i> is a comma-separated list of locales that are available for this properties bundle that
 * are defined in separate files. By spreading a properties bundle over many files, loading a bundle for a single
 * locale is optimized. For each locale, <i>locKey</i>, listed in <i>externalLocales</i>, there must be a file
 * <i>fileName.locKey.ext</i> in the same directory as the main bundle file.
 * <p/>
 * Each external file has the same format as the main file except that the <code>locales</code> attribute of
 * the <code>data</code> tag should not be specified. Any number of locales can be defined. The first locale defined
 * should be the locale explicit in the name of the file. Only more specific locales should follow this locale.
 * For example, file <code>props.es.xml</code>, should start by defining locale <code>es</code> and could continue
 * with locales <code>es_ES</code> and <code>es_MX</code> but should not define locales <code>fr</code> or
 * <code>de</code>.
 *
 * @since 3.4
 */
jsx3.Class.defineClass("jsx3.app.PropsBundle", jsx3.app.Properties, null, function(PropsBundle, PropsBundle_prototype) {

  var LOG = jsx3.util.Logger.getLogger(PropsBundle.jsxclass.getName());
  var Job = jsx3.util.Job;

  /** @private @jsxobf-clobber @jsxobf-final */
  PropsBundle.PATH_SEP = ".";

  /** @private @jsxobf-clobber @jsxobf-final */
  PropsBundle.ERROR = -1;
  
  /** 
   * {Object<String, Object<String, boolean>>} Stores all the locales available in external files for a particular
   *   bundle path.
   * @private @jsxobf-clobber 
   */
  PropsBundle._PATH_TO_LOCALES = {};

  /** 
   * {Object<String, jsx3.app.PropsBundle>} Stores the props bundle that should be returned when a props key is
   *   requested. The key is equal to "path::locale". 
   * @private @jsxobf-clobber 
   */
  PropsBundle._KEY_TO_PROPS = {};

  /** @private @jsxobf-clobber */
  PropsBundle._GRAPH = new jsx3.util.JobGraph();

  /** @private @jsxobf-clobber */
  PropsBundle._EMPTY = new PropsBundle();
  
  /**
   * Returns a properties object representing a localized view onto a properties bundle.
   *
   * @param strBasePath {String|jsx3.net.URI} the relative URI to the main properties file.
   * @param objLocale {jsx3.util.Locale} the locale for which to load the localized properties. If this is not
   *    provided, the system locale is used.
   * @param objCache {jsx3.app.Cache} if provided, any loaded XML documents will be placed in this cache.
   * @return {jsx3.app.PropsBundle}
   * @throws {jsx3.Exception} if there is an error loading loading the main bundle file or a subordinate file
   *    promised by the main file.
   */
  PropsBundle.getProps = function(strBasePath, objLocale, objCache) {
    if (!objLocale) objLocale = jsx3.System.getLocale();
    var key = strBasePath + "::" + objLocale;
    
    if (!PropsBundle._KEY_TO_PROPS[key]) {
      var graph = PropsBundle._GRAPH;
      
      if (graph.node(strBasePath))
        return PropsBundle._EMPTY;
      
      var job = new Job(strBasePath);
      PropsBundle._getProps(strBasePath, objLocale, objCache, false, job);
    }
    
    var p = PropsBundle._KEY_TO_PROPS[key];
    if (p == PropsBundle.ERROR)
      throw new jsx3.Exception(jsx3._msg("propbn.err_key", strBasePath, objLocale));
      
    return p;
  };

  /**
   * The same as <code>getProps()</code> but if there is an error loading the bundle for <code>objLocale</code> then
   * try to load the bundle for the root locale and if there is an error doing that, just return an empty properties
   * object.
   *
   * @return {jsx3.app.PropsBundle}
   * @see #getProps()
   */
  PropsBundle.getPropsFT = function(strBasePath, objLocale, objCache) {
    try {
      return PropsBundle.getProps(strBasePath, objLocale, objCache);
    } catch (e) {}

    var root = jsx3.util.Locale.ROOT;

    if (!objLocale || !objLocale.equals(root))
      try {
        return PropsBundle.getProps(strBasePath, root, objCache);
      } catch (e) {}

    return new PropsBundle();
  };
  
  /**
   * Returns a properties object representing a localized view onto a properties bundle.
   *
   * @param strBasePath {String|jsx3.net.URI} the relative URI to the main properties file.
   * @param objLocale {jsx3.util.Locale} the locale for which to load the localized properties. If this is not
   *    provided, the system locale is used.
   * @param fctCallback {Function} a callback function to call when the properties bundle has loaded.
   * @param objCache {jsx3.app.Cache} if provided, any loaded XML documents will be placed in this cache.
   * @return {jsx3.app.PropsBundle}
   * @since 3.6
   */
  PropsBundle.getPropsAsync = function(strBasePath, objLocale, fctCallback, objCache) {
    if (!objLocale) objLocale = jsx3.System.getLocale();
    var key = strBasePath + "::" + objLocale;
    var job = new Job(null, function() {
      var p = PropsBundle._KEY_TO_PROPS[key];
      fctCallback(p != PropsBundle.ERROR ? p : null);
    });
    PropsBundle._getProps(strBasePath, objLocale, objCache, true, job);
  };

  /** @private @jsxobf-clobber */
  PropsBundle._getProps = function(strBasePath, objLocale, objCache, bAsync, objDoneJob) {
    var graph = PropsBundle._GRAPH;
    strBasePath = strBasePath.toString();

    graph.pause();
    
    graph.add(objDoneJob); // NOTE: graph must be paused
    
    var nextJob = objDoneJob;
    var searchPath = objLocale.getSearchPath();
    
    // For each locale to load, en_US, en, root...
    for (var i = 0; i < searchPath.length; i++) {
      var thisLocale = searchPath[i];
      var thisKey = strBasePath + "::" + thisLocale;
      
      // Check if the locale is already loaded, if so, we're done
      if (PropsBundle._KEY_TO_PROPS[thisKey]) 
        break;

      // Check if the locale is already queued
      var thisJob = graph.node(thisKey);
      
      if (! thisJob) {
        // If not, queue loading the locale
        thisJob = PropsBundle._makeJob(thisKey, strBasePath, thisLocale, objCache, bAsync);
        graph.add(thisJob);
        thisJob.add(nextJob);
      } else {
        // Otherwise, just create the dependency, and we're done
        thisJob.add(nextJob);
        break;
      }      

      nextJob = thisJob;
    }
    
    graph.start();
  };
  
  /** @private @jsxobf-clobber */
  PropsBundle._makeJob = function(thisKey, strBasePath, thisLocale, objCache, bAsync) {
    return new Job(thisKey, function() {
      var me = this;
      PropsBundle._loadBundle(thisKey, strBasePath, thisLocale, objCache, bAsync, function() {
        me.finish();
      });
      return Job.WAIT; // Ok for sync too since finish() is called before this returns WAIT.
    });    
  };
  
  /** @private @jsxobf-clobber */
  PropsBundle._loadBundle = function(strKey, strBasePath, objLocale, objCache, bAsync, fctCallback) {
    var propsCache = PropsBundle._KEY_TO_PROPS, localeCache = PropsBundle._PATH_TO_LOCALES;
    var bRoot = false, bDone = false;
    
    if (propsCache[strKey]) {
      bDone = true;
    } else {
      if (objLocale.toString() == "") {
        bRoot = true;
      } else {
        if (! localeCache[strBasePath][objLocale]) {
          var searchPath = objLocale.getSearchPath();
          for (var i = 1; !propsCache[strKey] && i < searchPath.length; i++) {
            var ancestorLocale = searchPath[i];
            var ancestorKey = strBasePath + "::" + ancestorLocale;
            propsCache[strKey] = propsCache[ancestorKey];
          }
          bDone = true;
        }
      }
    }
    
    if (bDone) {
      // QUESTION: timeout for async?
      fctCallback();
      return;
    }
    
    var strUrl;
    if (bRoot) {
      localeCache[strBasePath] = {};
      strUrl = strBasePath;
    } else {
      var index = strBasePath.lastIndexOf(".");
      strUrl = strBasePath.substring(0, index) + PropsBundle.PATH_SEP + objLocale + strBasePath.substring(index);
    }

    var doc = null, bAlreadyLoaded = false;
    
    if (objCache)
      doc = objCache.getDocument(strUrl);

    if (doc) {
      bAlreadyLoaded = true;
      objCache = null; // Don't add to cache since it came out of cache
    } else {
      doc = new jsx3.xml.Document();
      
      if (bAsync) {
        doc.setAsync(true);
        doc.subscribe("*", PropsBundle, function(objEvent) {
          PropsBundle._loadBundle2(strKey, strBasePath, objLocale, objCache, objEvent.target, fctCallback);
        });
      } else {
        bAlreadyLoaded = true;
      }

      doc.load(strUrl);
    }
    
    if (bAlreadyLoaded)
      PropsBundle._loadBundle2(strKey, strBasePath, objLocale, objCache, doc, fctCallback);
  };
  
  /** @private @jsxobf-clobber */
  PropsBundle._loadBundle2 = function(strKey, strBasePath, objLocale, objCache, objDoc, fctCallback) {
    var strUrl = objDoc.getSourceURL();
    if (! objDoc.hasError()) {
      if (objCache && strUrl)
        objCache.setDocument(strUrl, objDoc);
      PropsBundle._addLocaleRefs(strBasePath, objDoc);
      PropsBundle._loadInlineLocales(strBasePath, objLocale, objDoc);
    } else {
      LOG.error(jsx3._msg("propbn.err_file", strUrl, objDoc.getError()));
      PropsBundle._KEY_TO_PROPS[strKey] = PropsBundle.ERROR;
    }
    
    fctCallback();
  };

  /**
   * Loads any properties within a &lt;locale&gt; tag as though it was contained in its own properties file.
   * @private
   * @jsxobf-clobber
   */
  PropsBundle._loadInlineLocales = function(strBasePath, objLocale, objXML) {
    for (var i = objXML.selectNodeIterator("/data/locale"); i.hasNext(); ) {
      var lNode = i.next();
      var localeKey = lNode.getAttribute("key") || "";

      PropsBundle._setLocaleDoc(strBasePath, localeKey, lNode);
      PropsBundle._PATH_TO_LOCALES[strBasePath][localeKey] = true;
    }

    // Default to loading the entire external file for the requested locale.
    if (! PropsBundle._KEY_TO_PROPS[strBasePath + "::" + objLocale]) {
      PropsBundle._setLocaleDoc(strBasePath, objLocale.toString(), objXML);
    }
  };

  /** @private @jsxobf-clobber */
  PropsBundle._setLocaleDoc = function(strBasePath, strLocale, objXML) {
    var propsCache = PropsBundle._KEY_TO_PROPS;
    
    var props = new PropsBundle();
    props.loadXML(objXML);
    props._path = strBasePath;
    props._locale = jsx3.util.Locale.valueOf(strLocale);

    propsCache[strBasePath + "::" + strLocale] = props;
    
    // If not the root locale, then add a reference to the parent locale, according to the locale search path.
    // This requires the the parent locale always be loaded before the descendant locale.
    if (strLocale) {
      var path = props._locale.getSearchPath();
      for (var i = 1; i < path.length; i++) {
        var parent = propsCache[strBasePath + "::" + path[i]];
        if (parent) {
          props.addParent(parent);
          return;
        }
      }
      
      LOG.error("Parent of bundle " + strBasePath + " (" + strLocale + ") is null.");
    }
  };

  /**
   * Looks for and caches metadata in <code>objXML</code> that indicates that there are other files in this
   * properties bundle for other locales.
   * @private
   * @jsxobf-clobber
   */
  PropsBundle._addLocaleRefs = function(strBasePath, objXML) {
    var localeString = objXML.getAttribute("locales");

    if (PropsBundle._PATH_TO_LOCALES[strBasePath] == null)
      PropsBundle._PATH_TO_LOCALES[strBasePath] = {};

    if (localeString != null) {
      var localeKeys = localeString.split(/\s*,\s*/);
      for (var i = 0; i < localeKeys.length; i++)
        if (localeKeys[i])
          PropsBundle._PATH_TO_LOCALES[strBasePath][localeKeys[i]] = true;
    }
  };

  /**
   * Returns the locale for which this properties object was created. The value returned by this method is the
   * value sent to the <code>getProps()</code> method and not necessarily the most specific locale for which the
   * properties in this view are defined.
   *
   * @return {jsx3.app.Locale}
   * @see #getProps()
   */
  PropsBundle_prototype.getLocale = function() {
    return this._locale;
  };

  /**
   * Returns the base path of this properties bundle.
   * @return {String}
   */
  PropsBundle_prototype.getPath = function() {
    return this._path;
  };

  /**
   * Clears all the data stored in the caches internal to this class. Repeated calls to <code>getProps()</code>
   * consult only these caches. If files have changed on disk this method must be called for the return value of
   * <code>getProps()</code> to reflect these changes.
   * @param strPath {String} if provided, only clear out the documents stored for the resource at path <code>strPath</code>.
   * @param objCache {jsx3.app.Cache} if provided in addition to <code>strPath</code>, clear out any documents
   *    stored in <code>objCache</code> associated with the resource at path <code>strPath</code>.
   */
  PropsBundle.clearCache = function(strPath, objCache) {
    if (strPath) {
      delete PropsBundle._PATH_TO_LOCALES[strPath];

      var prefix = strPath + "::";
      for (var f in PropsBundle._KEY_TO_PROPS) {
        if (f.indexOf(prefix) == 0)
          delete PropsBundle._KEY_TO_PROPS[f];
      }

      if (objCache) {
        var cacheKeys = objCache.keys();
        for (var i = 0; i < cacheKeys.length; i++) {
          if (cacheKeys[i].indexOf(strPath) == 0)
            objCache.clearById(cacheKeys[i]);
        }
      }
    } else {
      PropsBundle._PATH_TO_LOCALES = {};
      PropsBundle._KEY_TO_PROPS = {};
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
 * A collection of GI system related functions.
 */
jsx3.Class.defineClass("jsx3.lang.System", null, null, function(System, System_prototype) {

  var PropsBundle = jsx3.app.PropsBundle;

  System.LJSS = new jsx3.app.Properties();
  
  /**
   * {jsx3.app.Properties}
   * @package
   */
  System.JSS = new jsx3.app.Properties();
  System.JSS.addParent(System.LJSS);
  
  /**
   * {Object<String, jsx3.app.Server>} an object array that indexes all loaded GI applications by their namespace.
   * @private
   * @jsxobf-clobber
   */
  System.APPS = {};
  
  /**
   * Returns a system property as specified by a JSS file loaded by the JSX runtime or an addin.
   * @param strKey {String}
   * @return {String}
   * @since 3.2
   */
  System.getProperty = function(strKey) {
    return System.JSS.get(strKey);
  };

  /**
   * If the locale has been explicitly set with <code>setLocale()</code>, that locale is returned. Otherwise the
   * locale is determined by introspecting the browser. If all else fails the default locale, en_US, is returned.
   * 
   * @since 3.2
   */
  System.getLocale = function() {
    // Locale is optional
    if (System._locale == null && jsx3.util.Locale) {
      var localeString = jsx3.app.Browser.getLocaleString();
      if (localeString) {
        var tokens = localeString.split("_");
        System._locale = new jsx3.util.Locale(tokens[0], tokens[1]);
      } else {
        System._locale = jsx3.util.Locale.US;
      }
    }
    return System._locale;
  };

  /**
   * Sets the system-wide locale. This in turn affects all applications running under the JSX system.
   * @since 3.2
   */
  System.setLocale = function(objLocale) {
    if (objLocale != System._locale) {
      System.JSS.removeParent(System.getLocaleProperties());
      /* @jsxobf-clobber */
      System._locale = objLocale;
      System.JSS.addParent(System.getLocaleProperties());
    }
  };
  
  /**
   * @since 3.2
   */
  System.reloadLocalizedResources = function() {
    if (PropsBundle) {
      var p = System.LJSS.getParents();
      System.LJSS.removeAllParents();
    
      for (var i = 0; i < p.length; i++)
        System.LJSS.addParent(PropsBundle.getPropsFT(p[i].getPath(), System.getLocale(), jsx3.getSystemCache()));
    }
  };

  /* @jsxobf-clobber */
  System._locdocurl = jsx3.resolveURI("jsx:///locale/locale.xml");

  /**
   * @return {jsx3.app.Properties}
   * @since 3.2
   * @package
   */
  System.getLocaleProperties = function(objLocale) {
    return PropsBundle.getPropsFT(System._locdocurl, objLocale, jsx3.getSystemCache());
  };

  /**
   * @param strKey {String}
   * @param strTokens {Object...}
   * @return {String}
   * @since 3.2
   */
  System.getMessage = function(strKey, strTokens) {
    var value = System.LJSS.get(strKey);
    var suffix = "";

    // jsx3.util.MessageFormat class is optional, should work without it
    if (arguments.length > 1) {
      var args = jsx3.Method.argsAsArray(arguments, 1);
      if (value != null && jsx3.util.MessageFormat) {
        try {
          var format = new jsx3.util.MessageFormat(value);
          return format.format(args);
        } catch (e) {;}
      } else {
        suffix = " " + args.join(" ");
      }
    }

    if (value == null) value = strKey;
    return value + suffix;
  };

  /**
   * global call to get a handle to a specific JSX GUI Object; NOTE: This is a significant modification used to support
   *            multi-instance servers. It is equivalently the same as calling 'getJO' in all builds prior to 3.0; returns null
   *            if object cannot be found. The specific app (a jsx3.app.Server instance) can also be queried for objects using its own
   *            DOM APIs.
   * @param strIdName {String} JSX 'id' or 'name' property for the object to get a handle to
   * @param strNS {String/jsx3.app.Server} namespace for the server to get the object from; when a 'name' is passed as @strNameId
   *            (as opposed to the object's 'id'), this allows the global JSX controller to more-quickly find the
   *            server that owns the given object. As this parameter is optional, the JSX controller will try to locate
   *            the named object by iterating through all server instances running in the browser in load order if no
   *            namespace is passed. When an 'id' is passed, the namespaces is not required as it explicitly contains
   *            this namespace.
   * @return {jsx3.app.Model} handle to given JSX GUI object or null if none found
   * @package
   */
  System.GO = function(strIdName, strNS) {
    var objJSX = null;
    if (strIdName != null) {
      // check for argument like jsxid, only check by id
      if (strIdName.indexOf("_jsx_") == 0) {
        var appKey = jsx3.app.DOM.getNamespaceForId(strIdName);
        
        // namespace argument does not match the namespace encoded in the id
        if (strNS && strNS != appKey) return null;
        
        if (System.APPS[appKey])
          objJSX = System.APPS[appKey].getJSXById(strIdName);
      } 
      // it must be a name, we'll check APPS, then all servers
      else {
        // namespace specified
        if (strNS) {
          if (System.APPS[strNS])
            objJSX = System.APPS[strNS].getJSXByName(strIdName);
        } else {
          for (var i in System.APPS) 
            if ((objJSX = System.APPS[i].getJSXByName(strIdName)) != null) return objJSX;
        }
      }
    }
    return objJSX;
  };

  /**
   * Lookup an application (<code>jsx3.app.Server</code>) by its namespace. If more than one application 
   * share the same namespace, this returns the instance most recently sent as an argument to <code>registerApp()</code> or <code>activateApp()</code>. This is generally equivalent to <code>window[strAppKey]</code>.
   * @param strAppKey {String} the namespace of the application to get
   * @package
   */
  System.getApp = function(strAppKey) {
    return System.APPS[strAppKey];
  };
  
  /**
   * @return {Array<jsx3.app.Server>}
   * @package
   */
  System.getAllApps = function() {
    var apps = [];
    for (var f in System.APPS)
      apps.push(System.APPS[f]);
    return apps;
  };

  /**
   * Register an application (<code>jsx3.app.Server</code>) in the framework. 
   * @param objServer {jsx3.app.Server} 
   * @package
   */
  System.registerApp = function(objServer) {
    var ns = objServer.getEnv('namespace');

    jsx3.lang.setVar(ns, objServer);
  
    // add this server instance to the collection indexed and managed by the JSX controller
    System.APPS[ns] = objServer;  
  };

  /**
   * De-register an application (<code>jsx3.app.Server</code>) in the framework. 
   * @param objServer {jsx3.app.Server} 
   * @package
   */
  System.deregisterApp = function(objServer) {
    var ns = objServer.getEnv('namespace');

    var s = jsx3.lang.getVar(ns);
    if (objServer == s)
      jsx3.lang.setVar(objServer.getEnv('namespace'), null);
    
    if (System.APPS[ns] == objServer) 
      delete System.APPS[ns];
  };

  /**
   * Activate an application (<code>jsx3.app.Server</code>) in the framework. Call this method on an application that has already been registered and has become the "topmost" or "most active" application of all the applications sharing its namespace.
   * @param objServer {jsx3.app.Server} 
   * @package
   */
  System.activateApp = function(objServer) {
    jsx3.registerApp(objServer);
  };

  /**
   * @package
   */
  System.getAppByPath = function(strPath) {
    for (var ns in System.APPS) {
      var app = System.APPS[ns];
      if (app.getEnv("apppathrel") == strPath || app.getEnv("apppath") == strPath)
        return app;
    }
    return null;
  };

  /** @private @jsxobf-clobber */
  System._ADDINS = [];
  
  /** @private @jsxobf-clobber */
  System._ADDIN_MAP = {};
  
  /**
   * @package
   */
  System.registerAddin = function(strVar, objAddin) {
    jsx3.lang.setVar(strVar, objAddin);
    System._ADDINS.push(objAddin);
    System._ADDIN_MAP[objAddin.getKey()] = objAddin;
  };
  
  /**
   * @return {Array<jsx3.app.AddIn>}
   * @package
   */
  System.getAddins = function() {
    return System._ADDINS.concat();
  };

  /**
   * @param strKey {String}
   * @return {jsx3.app.AddIn}
   * @package
   */
  System.getAddin = function(strKey) {
    return System._ADDIN_MAP[strKey];
  };

  /**
   * Returns the version number of General Interface. 
   * @return {String} <code>"3.1.0"</code>, etc.
   */
  System.getVersion = function() {
    var v = "3.9.1_SRC";
    return v.match(/\d/) ? v : "3.9.1"; // fallback for uncompiled version
  };

});

// jsx3.lang.System
jsx3.GO =            jsx3.lang.System.GO;
jsx3.getApp =        jsx3.lang.System.getApp;
jsx3.registerApp =   jsx3.lang.System.registerApp;
jsx3.activateApp =   jsx3.lang.System.activateApp;
jsx3.deregisterApp = jsx3.lang.System.deregisterApp;
jsx3.getVersion =    jsx3.lang.System.getVersion;/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Registers all DOM nodes in an instance of <code>jsx3.app.Server</code> and publishes related events.
 * This class keeps all contained JSX objects indexed on id and name.
 */
jsx3.Class.defineClass("jsx3.app.DOM", null, [jsx3.util.EventDispatcher], function(DOM, DOM_prototype) {

  /**
   * {Object<String,int>} ID incrementers that ensures all system-assigned IDs are unique.
   * @private @jsxobf-clobber
   */
  DOM._INC = {};

  /**
   * {Object<String,String>} Maps long namespace string to short id strings.
   * @private @jsxobf-clobber
   */
  DOM._LOOKUP = {};

  /**
   * {Object<String,String>} Maps the short id strings to the long namespace string.
   * @private @jsxobf-clobber
   */
  DOM._LOOKUP_REVERSE = {};

  /**
   * {int} The number of keys in DOM._LOOKUP.
   * @private @jsxobf-clobber
   */
  DOM._LOOKUP_COUNT = 0;

  /**
   * {int} 0
   * @final @jsxobf-final
   */
  DOM.TYPEADD = 0;

  /**
   * {int} 1
   * @final @jsxobf-final
   */
  DOM.TYPEREMOVE = 1;

  /**
   * {int} 2
   * @final @jsxobf-final
   */
  DOM.TYPEREARRANGE = 2;

  /**
   * @package
   * @final @jsxobf-final
   */
  DOM.EVENT_CHANGE = "change";

  /**
   * Creates a new unique system id.
   * @param strNameSpace {String} the application namespace for which to generate the id.
   * @return {String}
   */
  DOM.newId = function(strNameSpace) {
    var nsKey = DOM._getNamespaceKey(strNameSpace);
    return "_jsx_" + nsKey + "_" + DOM._getNamespaceSerial(nsKey).toString(36);
  };

  /** @private @jsxobf-clobber */
  DOM._getNamespaceKey = function(strNS) {
    if (DOM._LOOKUP[strNS] == null) {
      var key = (DOM._LOOKUP_COUNT++).toString(36);
      DOM._LOOKUP[strNS] = key;
      DOM._LOOKUP_REVERSE[key] = strNS;
    }

    return DOM._LOOKUP[strNS];
  };

  /** @private @jsxobf-clobber */
  DOM._getNamespaceSerial = function(strNSKey) {
    if (DOM._INC[strNSKey] == null)
      DOM._INC[strNSKey] = 0;

    return ++DOM._INC[strNSKey];
  };

  /**
   * @package
   */
  DOM.getNamespaceForId = function(strId) {
    var key = strId.substring(5, strId.indexOf("_", 5));
    return DOM._LOOKUP_REVERSE[key];
  };

  /**
   * The instance initializer.
   */
  DOM_prototype.init = function() {
    // holds index of of all GUI objects for this server instance, indexed via their system-assigned ID
    /* @jsxobf-clobber */
    this.SYSTEMHASH = {};

    // holds index of all GUI objects for this server instance, indexed via the developer-assigned NAME
    /* @jsxobf-clobber */
    this.USERHASH = {};
  };

  /**
   * The instance finalizer.
   */
  DOM_prototype.destroy = function() {
    delete this.SYSTEMHASH;
    delete this.USERHASH;
  };

  /**
   * Looks up a DOM object contained in this DOM by id or name.
   * @param strId {String} either the id of the object to return or its name.
   * @return {jsx3.app.Model} the matching DOM object or <code>null</code> if none found.
   */
  DOM_prototype.get = function(strId) {
    return this.SYSTEMHASH[strId] || this.getByName(strId);
  };

  /**
   * Looks up a DOM object contained in this DOM by name. It is left to the developer to specify unique names for
   * all DOM nodes that must be accessed in this manner. If more than one DOM nodes exist with a name of
   * <code>strName</code> the behavior of this method is undefined.
   *
   * @param strName {String} the name of the object to return.
   * @return {jsx3.app.Model} the matching DOM object or <code>null</code> if none found.
   * @see #getAllByName()
   */
  DOM_prototype.getByName = function(strName) {
    var nameBucket = this.USERHASH[strName];
    return nameBucket != null ? nameBucket.get(0) : null;
  };

  /** @private @jsxobf-clobber */
  DOM.EMPTY_LIST = [];

  /**
   * Returns all the DOM nodes in this DOM with a name of <code>strName</code>. The name index keeps a bucket of
   * DOM nodes for each unique name. Therefore, this method performs efficiently.
   *
   * @param strName {String} the name of the objects to return.
   * @return {Array<jsx3.app.Model>} an array of the matching DOM nodes. This return value should not be mutated as
   *   that will effect the internal functioning of this DOM.
   * @see #getByName()
   * @since 3.2
   */
  DOM_prototype.getAllByName = function(strName) {
    var nameBucket = this.USERHASH[strName];
    return nameBucket != null ? nameBucket.toArray() : DOM.EMPTY_LIST;
  };

  /**
   * Looks up a DOM object contained in this DOM by id.
   * @param strId {String} the id of the object to return.
   * @return {jsx3.app.Model} the matching DOM object or <code>null</code> if none found.
   */
  DOM_prototype.getById = function(strId) {
    return this.SYSTEMHASH[strId];
  };

  /**
   * Adds a JSX object to this DOM and indexes it by its id and name.
   * @param objJSX {jsx3.app.Model}
   */
  DOM_prototype.add = function(objJSX) {
    this.SYSTEMHASH[objJSX.getId()] = objJSX;
    var name = objJSX.getName();
    if (name != null && name !== "") {
      if (this.USERHASH[name] == null)
        this.USERHASH[name] = jsx3.util.List.wrap([objJSX]);
      else
        this.USERHASH[name].add(objJSX, 0);
    }
  };

  /**
   * Removes a JSX object from this DOM and removes it from the indices.
   * @param objJSX {jsx3.app.Model}
   */
  DOM_prototype.remove = function(objJSX) {
    delete this.SYSTEMHASH[objJSX.getId()];

    var nameBucket = this.USERHASH[objJSX.getName()];
    if (nameBucket != null)
      nameBucket.remove(objJSX);
  };

  /**
   * A method that must be called after changing the name of a contained DOM node. This method updates the name
   * index appropriately.
   * @param objJSX {jsx3.app.Model}
   * @param oldName {String} the name before it was changed
   */
  DOM_prototype.onNameChange = function(objJSX, oldName) {
    var oldBucket = this.USERHASH[oldName];
    if (oldBucket != null)
      oldBucket.remove(objJSX);

    var name = objJSX.getName();
    if (name != null && name !== "") {
      if (this.USERHASH[name] == null)
        this.USERHASH[name] = jsx3.util.List.wrap([objJSX]);
      else
        this.USERHASH[name].add(objJSX, 0);
    }
  };

  /**
   * called when a change to the JSX DOM occurs for this server instance (adopt, load, delete, etc); publishes an event object (javascript object) with the following named properties: subject (jsx3.app.DOM.EVENT_CHANGE); type (jsx3.app.DOM.TYPEADD | jsx3.app.DOM.TYPEREMOVE); parentId (id of JSX parent); jsxId (id of element added or removed)
   * @param TYPE {int} one of: jsx3.app.DOM.TYPEADD, jsx3.app.DOM.TYPEREMOVE
   * @param JSXPARENTID {String} id of dom parent
   * @param JSXID {String} id of dom element either added or removed
   */
  DOM_prototype.onChange = function(TYPE, JSXPARENTID, JSXID) {
    this.publish({subject:DOM.EVENT_CHANGE, type:TYPE, parentId:JSXPARENTID, jsxId:JSXID});
  };

});


/**
 * @deprecated  Renamed to jsx3.app.DOM
 * @see jsx3.app.DOM
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.DOM", -, null, function(){});
 */
jsx3.DOM = jsx3.app.DOM;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _jsxns _jsxroots

/**
 * The controller of the JSX architecture.
 */
jsx3.Class.defineClass("jsx3.app.Server", null, [jsx3.util.EventDispatcher, jsx3.net.URIResolver/*, jsx3.gui.Alerts*/],
    function(Server, Server_prototype) {

  jsx3.util.EventDispatcher.jsxclass.mixin(Server);

  var Event = jsx3.gui.Event;
  var URIResolver = jsx3.net.URIResolver;
  var Browser = jsx3.app.Browser;
  var Block = null;

  var LOG = jsx3.util.Logger.getLogger(Server.jsxclass.getName());

  /** @package */
  Server.Z_DIALOG = 2;
  /** @package */
  Server.Z_DRAG = 3;
  /** @package */
  Server.Z_MENU = 4;

  /**
   * {String} The subject of an event that <code>jsx3.app.Server</code> publishes when an instance of this class
   *    is created. The target of the event object is the initialized server.
   */
  Server.INITED = "inited";

  /**
   * {String} The subject of an event that instances of this class publish when a context help hot key is pressed
   *    in the context of a DOM node that has a help ID. The event has the following fields:
   *    <ul>
   *      <li><code>target</code> - the server publishing the event.</li>
   *      <li><code>model</code> - the DOM node that received the key event.</li>
   *      <li><code>helpid</code> - the help ID of the nearest ancestor of <code>model</code> that defines a help ID.</li>
   *    </ul>
   *
   * @see jsx3.app.Model#getHelpId()
   * @since 3.5
   */
  Server.HELP = "help";

  /** @private @jsxobf-clobber @jsxobf-final */
  Server._DIVID = "JSX";

  /**
   * {jsx3.util.List<jsx3.app.Server>} a list of all instances of this class
   * @private
   * @jsxobf-clobber
   */
  Server._INSTANCES = new jsx3.util.List();

  /**
   * {jsx3.gui.Block}
   * @deprecated  Use <code>Server.getRootBlock()</code>
   * @see #getRootBlock()
   */
  Server_prototype.JSXROOT = null;

  /**
   * {jsx3.gui.Block}
   * @deprecated  Use <code>Server.getBodyBlock()</code>
   * @see #getBodyBlock()
   */
  Server_prototype.JSXBODY = null;

  /**
   * {jsx3.app.Cache}
   * @deprecated  Use <code>Server.getCache()</code>
   * @see #getCache()
   */
  Server_prototype.Cache = null;

  /**
   * {Object<String, String>}
   * @deprecated  Use <code>Server.getEnv()</code>
   * @see #getEnv()
   */
  Server_prototype.ENVIRONMENT = null;

  /**
   * {jsx3.app.DOM}
   * @deprecated  Use <code>Server.getDOM()</code>
   * @see #getDOM()
   */
  Server_prototype.DOM = null;

  /**
   * {jsx3.app.Properties}
   * @private
   */
  Server_prototype.JSS = null;

  /**
   * Sets environment variables used by this class (the controller for the JSX architecture)
   * @param strAppPath {String} URL (either relative or absolute) for the application to load
   * @param objGUI {HTMLElement} the browser element (body, div, span, td, etc) into which the GI application should load
   * @param bPaint {boolean} false if null; if true, the application VIEW will immediately be generated.
   * @param-package objEnv {Object}
   */
  Server_prototype.init = function(strAppPath, objGUI, bPaint, objEnv) {
    //instance a new DOM controller for this server instance that will track and manage JSX GUI and Data objects
    this.DOM = new jsx3.app.DOM();

    //instance the cache controller -- although this object is little-changed, its recommended use is much more limited and can merely be thought of as a simplified way to cache an XML document or system XSLT
    this.Cache = new jsx3.app.Cache();
    this.Cache.addParent(jsx3.getSharedCache());

    if (objEnv) {
      if (objEnv.jsxsettings) {
        this._jsxsettings = objEnv.jsxsettings;
        delete objEnv.jsxsettings;
      }

      var temp = {};
      for (var f in objEnv)
        temp[f.toLowerCase()] = objEnv[f];
      objEnv = temp;
    } else {
      objEnv = {};
    }

    this.ENVIRONMENT = objEnv;
    objEnv.apppath = strAppPath.replace(/\/*$/, "");

    //load the application config file, so we know which resource files (JS, CSS, XML, etc) to load
    var objSettings = this.getSettings();

    var settingsTree = objSettings.get();

    for (var f in settingsTree) {
      var key = f.toLowerCase();
      if (typeof(objEnv[key]) == "undefined" && typeof(settingsTree[f]) != "object") {
        objEnv[key] = settingsTree[f];
      }
    }

    // figure out path to resources, support for environment variable jsxappbase which is a relative (or absolute)
    // path from the config.xml file to the content root of the application
    objEnv.apppathuri = new jsx3.net.URI(objEnv.apppath + "/");
    if (objEnv.jsxappbase)
      objEnv.apppathuri = objEnv.apppathuri.resolve(objEnv.jsxappbase);

    var i = objEnv.apppath.indexOf(jsx3.APP_DIR_NAME);
    if (i >= 0)
      objEnv.apppathrel = objEnv.apppath.substring(i + jsx3.APP_DIR_NAME.length + 1);
    objEnv.apppathabs = Browser.getLocation().resolve(objEnv.apppathuri);

    if (objEnv['liquid'] == null) objEnv['liquid'] = true;
    if (objEnv['eventsvers'] == null) objEnv['eventsvers'] = 3.0;
    if (objEnv['jsxversion'] == null) objEnv['jsxversion'] = "3.1";

    objEnv.abspath = jsx3.getEnv("jsxabspath");
    objEnv.guiref = objGUI;            //object ref to on-screen containing object (div, td, span, etc)
    objEnv.namespace = objEnv.jsxappns || objEnv.namespace;

    if (objEnv.namespace == null)
      throw new jsx3.Exception(jsx3._msg("serv.no_ns", strAppPath));
    
    if (objGUI && this.getEnv("caption"))
      objGUI.ownerDocument.title = this.getEnv("caption");

    // implicitly cancel (trap) all right-click events unless explictly told not to
    if (objGUI && this.getEnv("cancelrightclick"))
      objGUI.ownerDocument.oncontextmenu = new Function("return false;");

    // implicitly cancel (trap) all browser-native errors unless explictly told not to
    if (this.getEnv("cancelerror"))
      jsx3.NativeError.initErrorCapture();

    // add this to the list of all instances
    Server._INSTANCES.add(this);

    //bind a reference to this jsxserver instance to the top-level window, using the declared namespace for this server; this provides a global handle to the server by name and is critical to backwards compatibility
    jsx3.registerApp(this);

    //create JSS MODEL CONTAINER (the dynamic properties object array)
    this.JSS = new jsx3.app.Properties();
    this.LJSS = new jsx3.app.Properties();
    this.JSS.addParent(this.LJSS); // add localized properties to the tree
    this.JSS.addParent(jsx3.System.JSS); // copy system JSS properties into this server

    Server.publish({subject: Server.INITED, target:this});

    //7) if specified, immediately render the view (typically only happens if the user chooses to initialize a new server AFTER the document BODY has fully loaded
    if (bPaint) this.paint();
  };

  /** @private @jsxobf-clobber */
  Server_prototype._createRootAndBody = function() {
    jsx3.require("jsx3.gui.Block");
    Block = jsx3.gui.Block;

    if (this.JSXROOT) return;

    // always create root and body; even though the app might not have a VIEW, it still may want access to the MODEL --
    // even for GUI objects
    var root = this.JSXROOT = this._createRoot("JSXROOT");
    root.setDynamicProperty("jsxbgcolor","@Solid DarkShadow");
    root.setRelativePosition(Block.ABSOLUTE);
    root.setOverflow(Block.OVERFLOWEXPAND);
    root.setAlwaysCheckHotKeys(true);
    root.setIndex(1);

    var body = this.JSXBODY = new Block("JSXBODY",0,0,"100%","100%","");
    body.setDynamicProperty("jsxbgcolor","@Solid Light");
    body.setRelativePosition(Block.ABSOLUTE);
    body.setZIndex(1);
    body.setOverflow(Block.OVERFLOWEXPAND).setIndex(0);
    root.setChild(body);
  };

  /**
   * Subscribed function that is notified whenever a window resize event fires.
   * @private
   */
  Server_prototype.onResize = function() {
/* @JSC */ if (jsx3.CLASS_LOADER.IE) {
    //use delay in IE to stop CPU thrashing
    window.clearTimeout(this.resize_timeout_id);
    var my = this;
    this.resize_timeout_id = window.setTimeout(function() { my._onResizeDelay(); }, 250);
/* @JSC */ } else {
    this._onResizeDelay();
/* @JSC */ }
  };

  /**
   * Called by onResize; begins the actual propogation of the resize adjustment
   * @private
   * @jsxobf-clobber
   */
  Server_prototype._onResizeDelay = function() {
    //jsx3.util.Logger.getLogger("jsx3.boxmodel").trace("RESIZE " + this.getClass() + ": [" + this.getEnv("NAMESPACE") + "]");

    //get the HTML element that contains this server instance
    var objGUI = this.getEnv("GUIREF");

    //tell the root block to update its profile
    if(objGUI) {
      this.getRootBlock().syncBoxProfile({left:0,top:0,parentwidth:objGUI.clientWidth,parentheight:objGUI.clientHeight}, true);
    }
  };

  /** @package */
  Server_prototype.getNextZIndex = function(intType) {
    if (this.ZRANGE == null) {
      /* @jsxobf-clobber */
      this.ZRANGE = [];
      this.ZRANGE[0] = 0;
      this.ZRANGE[1] = 1000;
      this.ZRANGE[Server.Z_DIALOG] = 5000;
      this.ZRANGE[Server.Z_DRAG] = 7500;
      this.ZRANGE[Server.Z_MENU] = 10000;
      this.ZRANGE[5] = 25000;
    }

    return this.ZRANGE[intType]++;
  };

  /**
   * @package
   */
  Server.allServers = function() {
    return Server._INSTANCES.toArray();
  };

  /**
   * create a root block that does not need to be bound to a parent
   * @param strName {String} name of the server (jsxname property for the block)
   * @return {jsx3.gui.Block} jsx3.gui.Block instance
   * @private
   * @jsxobf-clobber
   */
  Server_prototype._createRoot = function(strName) {
    if (this._jsxroots == null) this._jsxroots = [];

    var root = new Block(strName, 0, 0, "100%", "100%", "");
    root._jsxns = this.getEnv("NAMESPACE");
    root._jsxid = jsx3.app.DOM.newId(this.getEnv("NAMESPACE"));
    root._jsxserver = this;
    this.DOM.add(root);

    this._jsxroots.push(root);
    return root;
  };

  /**
   * @package
   */
  Server_prototype.getInvisibleRoot = function() {
    if (this.INVISIBLE == null)
      this.INVISIBLE = this._createRoot("JSXINVISIBLE");
    return this.INVISIBLE;
  };

  /**
   * Returns the value of an environment variable of this server. Valid keys correspond to deployment options and
   * include:
   * <ul>
   * <li>VERSION</li>
   * <li>APPPATH</li>
   * <li>ABSPATH</li>
   * <li>CAPTION</li>
   * <li>MODE</li>
   * <li>SYSTEM</li>
   * <li>NAMESPACE</li>
   * <li>CANCELERROR</li>
   * <li>CANCELRIGHTCLICK</li>
   * <li>BODYHOTKEYS</li>
   * <li>WIDTH</li>
   * <li>HEIGHT</li>
   * <li>LEFT</li>
   * <li>TOP</li>
   * <li>POSITION</li>
   * <li>OVERFLOW</li>
   * <li>UNICODE</li>
   * <li>EVENTSVERS</li>
   * </ul>
   * Other environment variables may be set either by query parameters in the launch page URL, by attributes
   * on the GI <b>script</b> tag, or by entries in the server's <code>config.xml</code> file. Server environment
   * variable keys must either begin with <code>"jsxapp"</code> or must not begin with <code>"jsx"</code>.
   *
   * @param strEnvKey {String} the case-insensitive key of the environment variable to return.
   * @return {String}
   * @see jsx3#getEnv()
   */
  Server_prototype.getEnv = function(strEnvKey) {
    var e = this.ENVIRONMENT;
    return e[strEnvKey] || e[strEnvKey.toLowerCase()];
  };

  /**
   * Displays a spyglass showing the environment profile for the given app
   * @private
   * @jsxobf-clobber
   */
  Server._showEnv = function(objEvent) {
    //get the relevant variables to profile
    var s = ['<div class="jsx30block jsx30env">'];
    s.push('<b>Version:</b> ', '3.9.1; build SRC', '<br/>');
    s.push('<b>XML Version:</b> ', jsx3.getXmlVersion(), '<br/>');
    s.push('<b>System Locale:</b> ', jsx3.System.getLocale().getDisplayName(), '<br/>');
    s.push('<b>Browser:</b> ', jsx3.CLASS_LOADER + '<br/>');
    s.push('<b>Operating System:</b> ', jsx3.app.Browser.getSystem() + " (" + navigator.userAgent + ")");
    s.push('<hr/>');

    var root = null;

    var servers = Server.allServers();
    for (var i = 0; i < servers.length; i++) {
      var server = servers[i];
      s.push("<b>", server.getEnv("namespace"), "</b>", "<div>");
      s.push('<b>Path:</b> ', server.getAppPath(), '<br/>');
      s.push('<b>Version:</b> ', server.getEnv("version"), '<br/>');
      s.push("</div>");

      if (root == null) {
        root = server.getRootBlock();
        if (root.getRendered() == null) root = null;
      }
    }

    s.push('</div>');
    s = s.join("");

    if (root)
      root.showSpy(s, Math.round(root.getRendered().clientWidth/2), Math.round(root.getRendered().clientHeight/2-100));
    else window.alert(s);
  };

  /**
   * Returns the settings of this server/project per config.xml
   * @return {jsx3.app.Settings}
   */
  Server_prototype.getSettings = function() {
    if (this._jsxsettings == null) {
      var objXML = this.getCache().getOrOpenDocument(jsx3.resolveURI(this.getAppPath() + "/" + jsx3.CONFIG_FILE), "JSX_SETTINGS");
      if (objXML.hasError()) {
        LOG.error(jsx3._msg("serv.err_set", this, objXML.getError()));
        objXML = null;
      }
      /* @jsxobf-clobber */
      this._jsxsettings = new jsx3.app.Settings(objXML);
    }
    return this._jsxsettings;
  };

  Server_prototype.getAppPath = function() {
    return this.getEnv("apppath");
  };

  /** @private @jsxobf-clobber */
  Server._taskBarFinder = function(obj) {
    return (obj instanceof jsx3.gui.WindowBar) && obj.getType() == jsx3.gui.WindowBar.TYPETASK;
  };

  /**
   * Returns handle to a descendant taskbar belonging to this server instance (this is where JSXDialog instances will try to minimize to if it exists); returns null if none found;
   *            if no taskbar is found, dialogs are not minimized, but are 'window shaded'&#8212;like a Mac used to do
   * @param objJSX {jsx3.app.Model} if null, this.JSXROOT is assumed; otherwise the object in the DOM from which to start looking for a descendant taskbar (a jsx3.gui.WindowBar instance)
   * @return {jsx3.gui.WindowBar}
   */
  Server_prototype.getTaskBar = function(objJSX) {
    if (! jsx3.gui.WindowBar) return null;
    if (objJSX == null) objJSX = this.JSXROOT;
    return objJSX.findDescendants(Server._taskBarFinder, false, false, false, true);
  };

  /**
   * call to shut down a server instance and free up resources used by the server (cache,dom,etc)
   */
  Server_prototype.destroy = function() {
    var unloadScript = this.getEnv("onunload");
    if (unloadScript) {
      try {
        this.eval(unloadScript);
      } catch (e) {
        LOG.error(jsx3._msg("serv.err_onun", this), jsx3.NativeError.wrap(e));
      }
    }

    //unsubscribe self from the box profiler
    if (jsx3.Class.forName("jsx3.gui.Painted"))
      jsx3.gui.Painted.Box.unregisterServer(this,this.getEnv("LIQUID"));

    //destroy root view (JSXROOT)
    if (this.JSXROOT) {
      var objGUI = this.JSXROOT.getRendered();
      if (objGUI) {
        //depending upon the server mode (ide or runtime), the outer container may or may not be present
        if (objGUI.parentNode.id == Server._DIVID)
          objGUI = objGUI.parentNode;
        jsx3.html.removeNode(objGUI);
      }
    }

    //free-up GUI objects belonging to the various roots
    if (this._jsxroots) {
      for (var i = 0; i < this._jsxroots.length; i++) {
        var root = this._jsxroots[i];
        root.removeChildren();
      }
    }
    delete this._jsxroots;

    //shut down subscriptions to dom and cache
    this.DOM.unsubscribeAllFromAll();
    this.DOM.destroy();

    //free-up xml resources
    this.Cache.unsubscribeAll(jsx3.app.Cache.CHANGE);
    this.Cache.destroy();

    //remove ref to this server
    jsx3.deregisterApp(this);

    // remove instance from list of all Server instances
    Server._INSTANCES.remove(this);

    // uncapture BODY keydown
    Event.unsubscribe(Event.KEYDOWN, this, "checkHotKeys");

    this.ENVIRONMENT = {};
  };

  /**
  * Used for pre-loading classes mentioned in the XML document
  * @param {jsx3.xml.Document} objXML
  * @param {Function} cb
  */
  Server_prototype.preLoadClassesAsync = function(objXML, cb){
  //the root block element in necessary to parse the XML doc, 
  //hence it is created here itself
    this._createRootAndBody();
    this.JSXBODY.preLoadClassesAsync(objXML, cb);
  }

  /**
   * Paints this application and its default component into the application view port on the host HTML page. The
   * system class loader calls this method once all the required resources of the application have loaded. The
   * order of actions taken by this method is:
   * <ol>
   *   <li>Load the default component file</li>
   *   <li>Execute the onload script for the application</li>
   *   <li>Paint the default component in the view port</li>
   * </ol>
   *
   * @param-package objXML {jsx3.xml.Document} the pre-loaded default component document.
   */
  Server_prototype.paint = function(objXML) {
    jsx3.require("jsx3.gui.Alerts", "jsx3.gui.Block");
    Block = jsx3.gui.Block;

    // make sure that Server implements jsx3.gui.Alerts before painting
    if (! jsx3.gui.Alerts.jsxclass.isAssignableFrom(Server.jsxclass))
      Server.jsxclass.addInterface(jsx3.gui.Alerts.jsxclass);

    //3) register the browser mode
    jsx3.html.getMode(this.getEnv("GUIREF"));

    //4) generate the initial DOM structure (JSXROOT AND JSXBODY)
    this._createRootAndBody();

    //5) register the server with the box manager; pass the liquid mode (true or false)
    jsx3.gui.Painted.Box.registerServer(this, this.getEnv("LIQUID"));

    if (this.getEnv("BODYHOTKEYS"))
      Event.subscribe(Event.KEYDOWN, this, "checkHotKeys");

    // Register ctrl+alt+shift+j to show the server environment
    var showEnv = "_showEnv";
    this.registerHotKey(new Function("jsx3.app.Server." + showEnv + "();"), 74, true, true, true);
    // Register the esc key to abort DnD
    this.registerHotKey(new Function("if (jsx3.EventHelp.isDragging()) jsx3.EventHelp.reset();"), Event.KEY_ESCAPE, false, false, false);
    // Register context-sensitive help system
    this._regHelpKey();

    //validate that the GUI container to place our app inside is not a null reference
    var objGUI = this.getEnv("GUIREF");

    if (objGUI) {
      //derive overflow settings for the outermost app container
      var strOverflow = "";
      var of = this.getEnv("OVERFLOW");
      if (of == Block.OVERFLOWSCROLL) {
        strOverflow = "overflow:auto;";
      } else if (of == Block.OVERFLOWHIDDEN) {
        strOverflow = "overflow:hidden;";
      }

      //derive position settings
      var strPosition, strLeft = "", strTop = "";
      if (this.getEnv("POSITION") == 0) {
        strPosition = "relative";
      } else {
        strPosition = "absolute";
        strLeft = "left:" + this.getEnv("LEFT") + ";";
        strTop = "top:" + this.getEnv("TOP") + ";";
      }
      var strWidth = "width:" + this.getEnv("WIDTH") + ";";
      var strHeight = "height:" + this.getEnv("HEIGHT") + ";";

      //generate initial application container
      objGUI.innerHTML = '<div id="' + Server._DIVID + '" style="position:' + strPosition + ';' + strOverflow +
          strLeft + strTop + strWidth + strHeight + '"></div>';
      objGUI = objGUI.lastChild;

      objGUI.className = jsx3.CLASS_LOADER.getCssClass();

      //initialize the box profile for root (this is how the box profiling is first initiated); basically pass the drawspace that root should live within
      this.JSXROOT.syncBoxProfileSync({left:0,top:0,parentwidth:objGUI.clientWidth,parentheight:objGUI.clientHeight});

      if (objGUI)
        objGUI.innerHTML = this.JSXROOT.paint();
    }

    try {
      //call _doLoad (regardless of whether or not there is a view component for this server instance, still try to initialize the environment
      this._doLoad(objXML);
    } catch (e) {
      LOG.fatal(jsx3._msg("serv.err_paint", this), jsx3.NativeError.wrap(e));
    }

    try {
      //initialize the on load script now that all files, includes, and object sets have been loaded
      this.eval(this.getEnv("onload"));
    } catch (e) {
      LOG.fatal(jsx3._msg("serv.err_onload", this), jsx3.NativeError.wrap(e));
    }
  };

  /** @package */
  Server_prototype._regHelpKey = function() {
    var helpKey = this.getDynamicProperty("jsx3.app.Server.help." + jsx3.app.Browser.getSystem()) ||
                  this.getDynamicProperty("jsx3.app.Server.help");
    if (helpKey)
      this.registerHotKey(jsx3.gui.HotKey.valueOf(helpKey, jsx3.makeCallback("_onHelpKey", this)));
  };

  /**
   * called by [this].paint().  Deserializes any designated component and fires the onLoad script for the application
   *            At runtime, the body's onload event calls [this].paint() which then calls [this]._doLoad() which then fires the
   *            the onLoad script for the application.
   * @private
   * @jsxobf-clobber-shared
   */
  Server_prototype._doLoad = function(objXML) {
    var child = null;

    if (objXML) {
      child = this.JSXBODY.loadXML(objXML, true);
    } else {
      var strComponentURL = this.getEnv("objectseturl");

      if (strComponentURL)
        child = this.JSXBODY.load(strComponentURL, true);
    }

    if (child)
      child.setPersistence(jsx3.app.Model.PERSISTEMBED);
  };

  /**
   * set all four dimensions for a jsx3.Server instance, allowing the developer to adjust the width/height/left/width for the server. Must be called during/after the onload event for the server instance as it affects the VIEW for the server.  Updates the absolutely positioned element that contains JSXROOT.
   * @param left {int/Array} the new left value or a JavaScript array containing all four new values (in pixels)
   * @param top {int} the new top value (in pixels)
   * @param width {int} the new width value (in pixels)
   * @param height {int} the new height value (in pixels)
   */
  Server_prototype.setDimensions = function(left, top, width, height) {
    //convert array to ints
    if (jsx3.$A.is(left)) {
      top = left[1];
      width = left[2];
      height = left[3];
      left = left[0];
    }

    var objGUI = this.JSXROOT.getRendered();
    if (objGUI) {
      if (left) objGUI.parentNode.style.left = left + "px";
      if (top) objGUI.parentNode.style.top = top + "px";
      if (width) objGUI.parentNode.style.width = width + "px";
      if (height) objGUI.parentNode.style.height = height + "px";
    }
  };

  /**
   * Loads an external resource into this server instance. What this method does depends on the <code>strType</code>
   * parameter.
   * <ul>
   *   <li><code>script</code> - Loads a JavaScript file asynchronously into the memory space of the page hosting this
   *       application; returns <code>null</code>.</li>
   *   <li><code>css</code> - Loads a CSS file asynchronously into the memory space of the page hosting this
   *       application; returns <code>null</code>.</li>
   *   <li><code>xml</code> or <code>xsl</code> - Loads an XML file synchronously into the XML cache of this
   *       application; returns the loaded <code>jsx3.xml.Document</code> instance.</li>
   *   <li><code>jss</code> or <code>ljss</code> - Loads a dynamic properties file or localized properties bundle
   *       synchronously into this application; returns <code>null</code>.</li>
   *   <li><code>services</code> - Loads and parses a mapping rules file synchronously; returns a new instance of
   *       <code>jsx3.net.Service</code>.</li>
   * </ul>
   *
   * @param strSrc {String|jsx3.net.URI} the path to the resource.
   * @param strId {String} the unique identifier of the resource. A resource loaded by this method may clobber
   *    a previously loaded resource of the same type and id.
   * @param strType {String} the type of include, one of: <code>css</code>, <code>jss</code>, <code>xml</code>,
   *    <code>xsl</code>, <code>script</code> (for JavaScript), <code>services</code> (for mapping rules),
   *    or <code>ljss</code>.
   * @param bReload {String} if <code>true</code>, a JavaScript or CSS file is reloaded from the remote server
   *    without checking the local browser cache. Other types of resources are not affected by this parameter.
   * @return {jsx3.xml.Document | jsx3.net.Service | null} the return type depends on the <code>strType</code>
   *    parameter. See the method description.
   * @throws {jsx3.IllegalArgumentException}  if <code>strType</code> in not a valid type.
   */
  Server_prototype.loadInclude = function(strSrc, strId, strType, bReload) {
    //resolve id to an empty string if not passed
    if (strId == null) strId = "";

    //create query string to force the browser to reload this resource from the remote server unless set to never reload
    var strAppend = (bReload) ? ((((strSrc+"").indexOf("?") == -1)?"?":"&") + (new Date()).valueOf()) : "";

    //branch based on file type
    if (strType == "css") {
      jsx3.CLASS_LOADER.loadResource(strSrc + strAppend, strId, strType);
    } else if (strType == "jss" || (strType == "ljss" && !jsx3.app.PropsBundle)) {
      var jssDoc = this.Cache.openDocument(strSrc, strId);

      if (jssDoc.hasError()) {
        jsx3.util.Logger.GLOBAL.error(jsx3._msg("serv.err_jss", + strSrc, jssDoc.getError()));
      } else {
        this.getProperties().loadXML(jssDoc, strId);
      }
    } else if (strType == "ljss") {
      var objCache = this.getCache();
      if (bReload) {
        var p = this.LJSS.getParents();
        for (var i = 0; i < p.length; i++) {
          if (p[i].getPath() == strSrc)
            this.LJSS.removeParent(p[i]);
        }
        
        jsx3.app.PropsBundle.clearCache(strSrc, objCache);
      }

      this.LJSS.addParent(jsx3.app.PropsBundle.getPropsFT(strSrc, this.getLocale(), objCache));
    } else if (strType == "xml" || strType == "xsl") {
      return this.Cache.openDocument(strSrc, strId);
    } else if (strType == "script") {
      //try to remove existing script
      this.unloadInclude(strId);
      jsx3.CLASS_LOADER.loadResource(strSrc + strAppend, strId, strType);
    } else if (strType == "services") {
      jsx3.require("jsx3.net.Service");
      return (new jsx3.net.Service(strSrc)).setNamespace(this);
    } else {
      throw new jsx3.IllegalArgumentException('strType', strType);
    }
  };

  /**
   * Removes a loaded JavaScript or CSS resource from the browser DOM.
   * @param strId {String} the id used when loading the resource.
   * @see #loadInclude()
   */
  Server_prototype.unloadInclude = function(strId) {
    var objInclude = this.getRootDocument().getElementById(strId);
    try {
      if (objInclude) objInclude.parentNode.removeChild(objInclude);
    } catch (e) {
      LOG.warn(jsx3._msg("serv.err_unload", strId, this), jsx3.NativeError.wrap(e));
    }
  };

  /**
   * Loads an application resource. This method looks up a resource registered with this application by its id.
   * The resource must be registered in the <code>config.xml</code> file of this application.
   *
   * @param strId {String} unique identifier for the resource (its unique id as an application resource file).
   * @return {jsx3.xml.Document | jsx3.net.Service | null} the return type depends on the type of resource.
   *    See the documentation for <code>loadInclude()</code> for more information.
   * @see #loadInclude()
   */
  Server_prototype.loadResource = function(strId) {
    var objSettings = this.getSettings();
    var includes = jsx3.util.List.wrap(objSettings.get('includes')).filter(function(x) { return x.id == strId; }).toArray(true);

    var lastInclude;
    for (var i = 0; i < includes.length; i++) {
      var include = includes[i];
      lastInclude = this.loadInclude(this.resolveURI(include.src), include.id, include.type);
    }

    if (includes.length == 0)
      LOG.warn(jsx3._msg("serv.err_badid", strId));

    return lastInclude;
  };

  /**
   * updates a single dynamic style property; dynamic properties are used by jsx3.gui.Block objects that extend the astract class, jsx3.gui.Block;
   * @param strPropName {String} id for this dynamic property among all properties
   * @param vntValue {String} value of the property; if null, the property with the name, @strPropName will be removed
   */
  Server_prototype.setDynamicProperty = function(strPropName, vntValue) {
    var jss = this.getProperties();
    jss.set(strPropName, vntValue);
  };

  /**
   * Returns the value of the dynamic property @strPropName
   * @param strPropName {String} id for this dynamic property among all properties
   * @param strToken {String...} if present tokens such as {0}, {1}, {n} will be replaced with the nth element of this vararg array
   * @return {String} value of the property
   */
  Server_prototype.getDynamicProperty = function(strPropName, strToken) {
    var value = this.getProperties().get(strPropName);

    // jsx3.util.MessageFormat class is optional, should work without it
    if (arguments.length > 1 && jsx3.util.MessageFormat) {
      try {
        var format = new jsx3.util.MessageFormat(value);
        var args = new Array(arguments.length - 1);
        for (var i = 1; i < arguments.length; i++)
          args[i-1] = arguments[i];
        return format.format(args);
      } catch (e) {;}
    }

    return value;
  };

  /**
   * Sets a Cookie with the given name and value
   * @param name {String} name of the cookie
   * @param value {String} value of the cookie
   * @param expires {Date} valid jscript date object. for example: new Date("11:59:59 12-31-2004")
   * @param path {String} path where the cookie is valid (default: path of calling document)
   * @param domain {String} domain where the cookie is valid (default: domain of calling document)
   * @param secure {boolean} valid jscript date object. for example: new Date("11:59:59 12-31-2004")
   */
  Server_prototype.setCookie = function(name, value, expires, path, domain, secure, bRaw) {
    this.getRootDocument().cookie = name + "=" + (bRaw ? value : escape(value)) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
  };

  /**
   * Returns the value for the Cookie with the given @name
   * @param name {String} name of the cookie
   * @return {String}
   */
  Server_prototype.getCookie = function(name, bRaw) {
    var doc = this.getRootDocument();

    var dc = doc.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
    }

    var end = doc.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }

  var raw = dc.substring(begin + prefix.length, end);
    return bRaw ? raw : unescape(raw);
  };

  /**
   * delete a cookie
   * @param name {String} name of the cookie
   * @param path {String} path where the cookie is valid (default: path of calling document)
   * @param domain {String} domain where the cookie is valid (default: domain of calling document)
   */
  Server_prototype.deleteCookie = function(name, path, domain) {
    this.setCookie(name, "", new Date(1970,0,1), path, domain);
  };

  /**
   * Returns the root block for this server (JSXROOT)
   * @return {jsx3.gui.Block}
   */
  Server_prototype.getRootBlock = function() {
    if (this.JSXROOT == null) this._createRootAndBody();
    return this.JSXROOT;
  };

  /**
   * To implement jsx3.gui.Alerts interface.
   * @return {jsx3.app.Model} the root block.
   */
  Server_prototype.getAlertsParent = function() {
    return this.getRootBlock();
  };

  /**
   * Returns the body block for this server (JSXBODY)
   * @return {jsx3.gui.Block}
   */
  Server_prototype.getBodyBlock = function() {
    if (this.JSXROOT == null) this._createRootAndBody();
    return this.JSXBODY;
  };

  /**
   * Returns the list of objects that are children of the body object. These are the root objects
   *     in a serialization file and the root nodes in the Component Hierarchy palette.
   * @return {Array<jsx3.app.Model>}
   */
  Server_prototype.getRootObjects = function() {
    return this.JSXBODY.getChildren().concat();
  };

  /**
   * Returns the XML/XSL cache for this server
   * @return {jsx3.app.Cache}
   */
  Server_prototype.getCache = function() {
    return this.Cache;
  };

  /**
   * Returns the dynamic properties registry for this server. The returned object contains the properties contained
   * in all loaded resources of type 'jss' and 'ljss.' It also contains any properties loaded by the system or
   * active add-ins. 
   *
   * @return {jsx3.app.Properties}
   */
  Server_prototype.getProperties = function() {
    return this.JSS;
  };

  /**
   * Returns the DOM for this server
   * @return {jsx3.app.DOM}
   */
  Server_prototype.getDOM = function() {
    return this.DOM;
  };

  /**
   * Looks up a DOM node owned by this server by id or by name.
   * @param strId {String} either the id (_jsxid) of the object or its name (jsxname)
   * @return {jsx3.app.Model} the JSX object or null if none found
   * @see jsx3.app.DOM#get()
   */
  Server_prototype.getJSX = function(strId) {
    return this.DOM.get(strId);
  };

  /**
   * Looks up a DOM node owned by this server by name. If more than one such objects exist, only one is returned.
   * @param strId {String} the name (jsxname) of the object
   * @return {jsx3.app.Model} the JSX object or null if none found
   * @see jsx3.app.DOM#getByName()
   */
  Server_prototype.getJSXByName = function(strId) {
    return this.DOM.getByName(strId);
  };

  /**
   * Looks up a DOM node owned by this server by id.
   * @param strId {String} the id (_jsxid) of the object
   * @return {jsx3.app.Model} the JSX object or null if none found
   * @see jsx3.app.DOM#getById()
   */
  Server_prototype.getJSXById = function(strId) {
    return this.DOM.getById(strId);
  };

  Server_prototype.beep = function() {
    if (! jsx3.gui.WindowBar) return;

    var windowBar = this.JSXROOT.findDescendants(
      function(x) {return (x instanceof jsx3.gui.WindowBar)
          && x.getType() == jsx3.gui.WindowBar.TYPEMENU;}, false, false);
    if (windowBar != null)
      windowBar.beep();
  };

  /**
   * Creates a new jsx3.gui.Window instance for this server. A branch of the DOM of this application can be placed
   * in this window in order to distribute the application across multiple browser windows.
   * @param strName {String} the unique name of the window to create
   * @return {jsx3.gui.Window}
   * @throws {jsx3.IllegalArgumentException} if there already exists a window in this server by that name
   * @since 3.2
   */
  Server_prototype.createAppWindow = function(strName) {
    jsx3.require("jsx3.gui.Window");

    if (this.WINDOWS == null)
      this.WINDOWS = this._createRoot("JSXWINDOWS");

    if (this.WINDOWS.getChild(strName) != null)
      throw new jsx3.IllegalArgumentException("strName", strName);

    var w = new jsx3.gui.Window(strName);
    this.WINDOWS.setChild(w);
    return w;
  };

  /**
   * Loads a new jsx3.gui.Window instance from a component file.
   * @param strSource {jsx3.xml.Entity|String} either an XML document containing the window to load or the URL of the
   *    component to load.
   * @param objResolver {jsx3.net.URIResolver} If this parameter is provided, <code>strSource</code> is resolved
   *    relative to it. Additionally, this resolver is stored as the URI resolver for this DOM node and its descendants.
   * @return {jsx3.gui.Window}
   * @throws {jsx3.Exception} if the loaded entity is not an instance of jsx3.gui.Window or if the name of window is
   *    not unique with respect to the already loaded windows
   * @since 3.2
   */
  Server_prototype.loadAppWindow = function(strSource, objResolver) {
    jsx3.require("jsx3.gui.Window");

    if (this.WINDOWS == null)
      this.WINDOWS = this._createRoot("JSXWINDOWS");

    var component = null;
    if (strSource instanceof jsx3.xml.Entity)
      component = this.WINDOWS.loadXML(strSource, false, objResolver);
    else
      component = this.WINDOWS.load(strSource, false, objResolver);

    if (component == null)
      throw new jsx3.Exception(jsx3._msg("serv.win_err", strSource));
    if (!(component instanceof jsx3.gui.Window)) {
      component.getParent().removeChild(component);
      throw new jsx3.Exception(jsx3._msg("serv.win_notwin", strSource, component.getClass()));
    }

    if (this.WINDOWS.getChild(component.getName()) != component) {
      component.getParent().removeChild(component);
      throw new jsx3.Exception(jsx3._msg("serv.win_name", strSource, component.getName()));
    }

    return component;
  };

  /**
   * Retrieves a previously created <code>jsx3.gui.Window</code> instance.
   * @param strName {String} the unique name of the window to retrieve
   * @return {jsx3.gui.Window} the window instance or <code>null</code> if no such window exists.
   * @since 3.2
   */
  Server_prototype.getAppWindow = function(strName) {
    if (this.WINDOWS != null)
      return this.WINDOWS.getChild(strName);
    return null;
  };

  /**
   * Returns the browser document object containing a particular JSX object. This method inspects whether the
   * JSX object is a descendent of the root block of this server or one of its <code>jsx3.gui.Window</code> roots.
   * @param objJSX {jsx3.app.Model}
   * @return {HTMLDocument} document object
   */
  Server_prototype.getDocumentOf = function(objJSX) {
    var parent = objJSX;
    while (parent != null) {
      if (jsx3.gui.Window && parent instanceof jsx3.gui.Window)
        return parent.getDocument();
      if (parent._jsxserver != null)
        return this.getRootDocument();

      parent = parent.getParent();
    }
    return this.getRootDocument();
  };

  Server_prototype.getRootDocument = function() {
    var rootGUI = this.getEnv('GUIREF');
    return rootGUI != null ? rootGUI.ownerDocument : null;
  };

  /**
   * Returns the browser DOM object where a particulat JSX object renders. This method inspects the main root of
   * this server as well as all of its <code>jsx3.gui.Window</code> roots.
   * @param objJSX {jsx3.app.Model}
   * @return {HTMLElement} DOM object
   */
  Server_prototype.getRenderedOf = function(objJSX) {
    var id = objJSX.getId();
    var rootDoc = this.getRootDocument();
    if (rootDoc == null) return null;

    var objGUI = rootDoc.getElementById(id);

    if (objGUI == null && this.WINDOWS != null) {
      var windows = this.WINDOWS.getChildren();
      for (var i = 0; objGUI == null && i < windows.length; i++) {
        var doc = windows[i].getDocument();
        if (doc)
          objGUI = doc.getElementById(id);
      }
    }

    return objGUI;
  };

  /**
   * calls the same method on the JSXROOT of this server; the hotkey is then captured for any event that originates in the server
   * @private
   */
  Server_prototype.registerHotKey = function(vntCallback, vntKey, bShift, bControl, bAlt) {
    return this.getRootBlock().registerHotKey(vntCallback, vntKey, bShift, bControl, bAlt);
  };

  /**
   * delegate to JSXROOT
   * @private
   */
  Server_prototype.checkHotKeys = function(objEvent) {
    return this.getRootBlock().checkHotKeys(objEvent.event);
  };


  /**
   * Conforms to the EventDispatcher contract.
   * @return {jsx3.app.Server} this object.
   * @deprecated
   */
  Server_prototype.getServer = function() {
    return this;
  };


  /**
   * Returns <code>true</code> if the configuration file of this application specifies a version number equal to
   * or greater than the <code>strVersion</code> parameter.
   * @param strVersion {String} period-delimited version number.
   * @return {boolean}
   * @package
   */
  Server_prototype.isAtLeastVersion = function(strVersion) {
    return jsx3.util.compareVersions(this.getEnv('jsxversion'), strVersion) >= 0;
  };

  /**
   * Resolves a URI that is referenced from a file in this server. This method takes into account the changes in
   * resource addressing between 3.1 and 3.2. For version 3.1, the URI is resolved as any URI in the system, using
   * <code>jsx3.resolveURI()</code>. In version 3.2, the URI is taken as relative to the application folder. In
   * particular, a relative URI will be resolved to a base of the application folder, an absolute URI will be
   * unaffected.
   * @param strURI {String|jsx3.net.URI} the URI to resolve.
   * @return {jsx3.net.URI} the resolved URI.
   * @since 3.2
   * @see jsx3.net.URIResolver
   * @see jsx3#resolveURI()
   */
  Server_prototype.resolveURI = function(strURI) {
    var uri = jsx3.net.URI.valueOf(strURI);

    if (this.isAtLeastVersion("3.2") && !URIResolver.isAbsoluteURI(uri)) {
      var appPathUri = this.getEnv("apppathuri");
      uri = appPathUri.resolve(uri);
    }
    
    return URIResolver.DEFAULT.resolveURI(uri);
  };

  /**
   * @return {String}
   * @since 3.2
   */
  Server_prototype.getUriPrefix = function() {
    return this.getEnv("apppathuri").toString();
  };

  /**
   * @param strURI {String|jsx3.net.URI} the URI to relativize.
   * @return {jsx3.net.URI} the relativized URI.
   * @since 3.2
   */
  Server_prototype.relativizeURI = function(strURI, bRel) {
    var loc = Browser.getLocation();
    var appPathUri = this.getEnv("apppathabs");
    var relative = appPathUri.relativize(loc.resolve(strURI));

    if (relative.isAbsolute() || bRel) {
      return relative;
    } else {
      var relPath = this.getEnv("apppathrel");
      if (relPath) {
        return jsx3.net.URI.fromParts("jsxapp", null, relPath.replace(/\//g, "!"), null,
            "/" + relative.getPath(), relative.getQuery(), relative.getFragment());
      } else {
        // special handling for GI_Builder/
        return jsx3.net.URI.fromParts(null, null, null, null,
            this.getEnv("apppath") + "/" + relative.getPath(), relative.getQuery(), relative.getFragment());
      }
    }
  };
      
  URIResolver.register("jsxapp", function(uri) {
    var host = uri.getHost();
    if (host) {
      var appPath = host.replace(/!/g, "/");
      var loadedApp = jsx3.System.getAppByPath(appPath);
      return loadedApp || new Server.Resolver(appPath);
    }
    return URIResolver.DEFAULT;
  });

  /**
   * Returns the current locale of this server. If the locale has been set explicitly with <code>setLocale()</code>,
   * that locale is returned. Otherwise, <code>getDefaultLocale()</code> is consulted, and finally the system-wide
   * locale.
   *
   * @return {jsx3.util.Locale}
   * @since 3.2
   */
  Server_prototype.getLocale = function() {
    if (this._locale == null)
      this._locale = this.getDefaultLocale();

    return this._locale != null ? this._locale : jsx3.System.getLocale();
  };

  /**
   * Sets the locale of this server.
   * @param objLocale {jsx3.util.Locale}
   * @since 3.2
   */
  Server_prototype.setLocale = function(objLocale) {
    /* @jsxobf-clobber */
    this._locale = objLocale;
  };

  /**
   * Returns the default locale of this server. This is configured with the <code>default_locale</code> configuration
   * setting.
   * @return {jsx3.util.Locale}
   * @since 3.2
   */
  Server_prototype.getDefaultLocale = function() {
    var localeKey = this.getSettings().get("default_locale");
    if (localeKey == null) return null;
    localeKey = jsx3.util.strTrim(localeKey.toString());
    // Locale is optional
    return localeKey.length > 0 && jsx3.util.Locale ? jsx3.util.Locale.valueOf(localeKey) : null;
  };

  /**
   * Reloads all resource files that are localized. This method should be called after calling
   * <code>setLocale()</code> for the server to render properly in the new locale.
   *
   * @since 3.2
   */
  Server_prototype.reloadLocalizedResources = function() {
    var p = this.LJSS.getParents();
    this.LJSS.removeAllParents();
    
    for (var i = 0; i < p.length; i++) {
      var props = jsx3.app.PropsBundle.getPropsFT(p[i].getPath(), this.getLocale(), this.getCache());
      this.LJSS.addParent(props);
    }
  };

  /** @private @jsxobf-clobber */
  Server_prototype._onHelpKey = function(objEvent) {
    var objJSX = jsx3.html.getJSXParent(objEvent.srcElement(), this);
    if (!objJSX) objJSX = this.JSXROOT;
    return objJSX ? this.invokeHelp(objJSX) : false;
  };

  /**
   * Invokes context-sensitive help as though the user had pressed the help hot key in the context of the DOM node
   * <code>objJSX</code>.
   * @param objJSX {jsx3.app.Model}
   * @since 3.5
   * @see #HELP
   */
  Server_prototype.invokeHelp = function(objJSX) {
    var strId = null;
    while (objJSX && !strId) {
      strId = objJSX.getHelpId();
      objJSX = objJSX.getParent();
    }

    if (strId)
      this.publish({subject:Server.HELP, helpid:strId, model:objJSX});

    return Boolean(strId);
  };
      
  /**
   * @return {Array<jsx3.app.AddIn>}
   * @package
   */
  Server_prototype.getAddins = function() {
    var a = [];
    var names = this.getSettings().get("addins");
    if (names) {
      for (var i = 0; i < names.length; i++) {
        var addin = jsx3.System.getAddin(names[i]);
        if (addin) a.push(addin);
      }
    }
    return a;
  };

  /**
   * @return {String}
   */
  Server_prototype.toString = function() {
    return this.jsxsuper() + " " + this.getAppPath() + ":" + this.getEnv("namespace");
  };


  /**
   * Returns version of the JSX runtime; separate versions are also available for GUI and Operational classes
   *
   * @return {String} app version number (major (MM), minor (mm), and dot release (dd)) MM.mm.dd
   * @deprecated
   */
  Server.getVersion = function() {
    return "3.00.00";
  };


});

// if Alerts is already loaded (shouldn't be), then go ahead and implement it here
if (jsx3.gui.Alerts)
  jsx3.app.Server.jsxclass.addInterface(jsx3.gui.Alerts.jsxclass);


/**
 * @deprecated  Renamed to jsx3.app.Server
 * @see jsx3.app.Server
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.Server", -, null, function(){});
 */
jsx3.Server = jsx3.app.Server;


/**
 * @private
 */
jsx3.Class.defineClass("jsx3.app.Server.Resolver", null, [jsx3.net.URIResolver], 
    function(ServerURIResolver, ServerURIResolver_prototype) {

  var URIResolver = jsx3.net.URIResolver;
      
  ServerURIResolver_prototype.init = function(strHost) {
    this._host = strHost;
    this._uri = new jsx3.net.URI(jsx3.getEnv("jsxhomepath") + jsx3.APP_DIR_NAME + "/" + strHost.replace(/!/g, "/") + "/");
  };
      
  ServerURIResolver_prototype.resolveURI = function(strURI) {
    var uri = jsx3.net.URI.valueOf(strURI);
    
    if (! URIResolver.isAbsoluteURI(uri))
      uri = URIResolver.DEFAULT.resolveURI(this._uri.resolve(uri));

    return URIResolver.DEFAULT.resolveURI(uri);
  };

  ServerURIResolver_prototype.getUriPrefix = function() {
    return this._uri.toString();
  };

  ServerURIResolver_prototype.relativizeURI = function(strURI, bRel) {
    var relative = this._uri.relativize(strURI);
    
    if (relative.isAbsolute() || bRel)
      return relative;
    else
      return jsx3.net.URI.fromParts("jsxapp", null, this._host, null, 
          "/" + relative.getPath(), relative.getQuery(), relative.getFragment());    
  };
  
  ServerURIResolver_prototype.toString = function() {
    return this._uri.toString();
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

// @jsxobf-clobber-shared  _jsxevents _jsxtempdynamic _jsxdynamic _jsxloading _applyId _varNameIndex
/**
 * The abstract base class that defines the JSX DOM. Instances of this class exist as nodes in a tree, each with
 * a single parent and multiple children. This class includes all the methods for querying and manipulating the DOM's
 * tree structure, such as <code>getChild()</code>, <code>adoptChild()</code>, <code>getParent()</code>, etc.
 *
 * @abstract
 */
jsx3.Class.defineClass("jsx3.app.Model", null, [jsx3.util.EventDispatcher], function(Model, Model_prototype) {

  var Entity = jsx3.xml.Entity;
  var Document = jsx3.xml.Document;
  var IllegalArgumentException = jsx3.IllegalArgumentException;

   /**
   * {int} Persistance value fora child that is temporarily part of the DOM tree and will not be persisted.
   * @final @jsxobf-final
   */
  Model.PERSISTNONE = 0;

  /**
   * {int} Normal persistance value for a child that will be persisted.
   * @final @jsxobf-final
   */
  Model.PERSISTEMBED = 1;

  /**
   * {int} Persistance value for a child that exists in an external serialization file and is referenced by URI.
   * @final @jsxobf-final
   */
  Model.PERSISTREF = 2;

  /**
   * {int} Persistance value for a child that exists in an external serialization file and is referenced by URI. The
   *   loading of a child with this persistence value will happen asynchronously after the file that references it is
   *   loaded.
   * @final @jsxobf-final
   */
  Model.PERSISTREFASYNC = 3;

  /**
   * {int} The normal load type for a DOM branch. The DOM branch deserializes and paints with its parent.
   * @final @jsxobf-final
   */
  Model.LT_NORMAL = 0;

  /**
   * {int} Load type indicating that the DOM branch will paint after its parent paints and the call stack resets.
   * @final @jsxobf-final
   * @since 3.5
   */
  Model.LT_SLEEP_PAINT = 1;

  /**
   * {int} Load type indicating that the DOM branch will deserialize and paint after its parent deserializes and the
   *    call stack resets.
   * @final @jsxobf-final
   * @since 3.5
   */
  Model.LT_SLEEP_DESER = 2;

  /**
   * {int} Load type indicating that the DOM branch will deserialize after its parent deserializes and the call stack
   *    resets and will paint after its parent paints and the call stack resets.
   * @final @jsxobf-final
   * @since 3.5
   */
  Model.LT_SLEEP_PD = 3;

  /**
   * {int} Load type indicating that the DOM branch will paint as needed when it becomes visible. It is left to
   *    subclasses of Model to implement this functionality.
   * @final @jsxobf-final
   * @since 3.5
   */
  Model.LT_SHOW_PAINT = 4;

  /**
   * {int} Load type indicating that the DOM branch will deserialize and paint as needed when it becomes visible.
   *    It is left to subclasses of Model to implement this functionality.
   * @final @jsxobf-final
   * @since 3.5
   */
  Model.LT_SHOW_DESER = 5;

  /**
   * {String} Minimum supported version for serialization files
   */
  Model.CURRENT_VERSION = "urn:tibco.com/v3.0";
  /**
   * {String} Minimum supported version CIF formatted serialization files
   * @since 3.2
   */
  Model.CIF_VERSION =  "http://xsd.tns.tibco.com/gi/cif/2006";

  /**
   * @package
   * @final @jsxobf-final
   */
  Model.FRAGMENTNS = "JSXFRAG";

  /**
   * {int} The number of milliseconds before asynchronous component loads time out.
   * @since 3.4
   */
  Model.ASYNC_LOAD_TIMEOUT = 60000;

  /** {String} @private @jsxobf-clobber */
  Model._CIFPROCESSORURL = jsx3.resolveURI("jsx:///xsl/cif_resolver.xsl");

  // TODO: eventually it would be nice to be able to clobber all of the following
  /** {String} @private */
  Model_prototype._jsxid = null;
  /** {jsx3.app.Model} @private @jsxobf-clobber */
  Model_prototype._jsxparent = null;
  /** {Array<jsx3.app.Model>} @private @jsxobf-clobber */
  Model_prototype._jsxchildren = null;
  /** {String} @private @jsxobf-clobber-shared */
  Model_prototype._jsxns = null;
  /** {jsx3.app.Server} @private */
  Model_prototype._jsxserver = null;
  /** {boolean} @private @jsxobf-clobber */
  Model_prototype._jsxfragment = null;
  /** {int} @private @jsxobf-clobber */
  Model_prototype._jsxpersistence = null;
  /** {Object<String,String>} @private @jsxobf-clobber */
  Model_prototype._jsxmeta = null;
  /** {boolean} @private @jsxobf-clobber */
  Model_prototype._jsxshowstate = true;

  /**
   * The instance initializer.
   * @param strName {String} a unique name distinguishing this object from all other JSX GUI objects in the JSX application
   * @param-private strInstanceOf
   */
  Model_prototype.init = function(strName, strInstanceOf) {
    //call constructor for super class just in case a global mod needs to be communicated on down from the top-most jsx class, inheritance
    this.jsxsuper();

    //initialize and define common properties shared by all subclasses of jsx3.app.Model
    // DEPRECATED: remove strInstanceOf parameter and references
    this._jsxinstanceof = (strInstanceOf == null) ? "jsx3.app.Model" : strInstanceOf;
    this.jsxname = strName;
  };

  /**
   * Returns the child DOM node of this node at the given index or with the given name. If a name is supplied, the
   * children are searched in order and the first matching child is returned.
   *
   * @param vntIndexOrName {int|String} either the integer index or the string name of the child.
   * @return {jsx3.app.Model} the child at the given index or with the given name, or <code>null</code> if no such
   *     child exists.
   */
  Model_prototype.getChild = function(vntIndexOrName) {
    var intIndex = null;

    if (this._jsxchildren != null) {
      if (typeof(vntIndexOrName) == "string" || isNaN(vntIndexOrName)) {
        var index = -1;
        var childArray = this.getChildren();
        var maxLen = childArray.length;
        for (var i = 0; i < maxLen; i++) {
          if (vntIndexOrName == childArray[i].getName()) {
            intIndex = i;
            break;
          }
        }
      } else {
        //calling function passed an index (integer), so just set to local variable
        intIndex = vntIndexOrName;
      }

      if (intIndex >= 0 && intIndex < this._jsxchildren.length)
        return this._jsxchildren[intIndex];
    }

    return null;
  };

  /**
   * Returns the first child.
   * @return {jsx3.app.Model}
   */
  Model_prototype.getFirstChild = function() {
    return this.getChild(0);
  };

  /**
   * Returns the last child.
   * @return {jsx3.app.Model}
   */
  Model_prototype.getLastChild = function() {
    return this.getChild(this.getChildren().length-1);
  };

  /**
   * Returns the next sibling.
   * @return {jsx3.app.Model}
   */
  Model_prototype.getNextSibling = function() {
    if (! this._jsxparent) return null;
    return this._jsxparent.getChild(this.getChildIndex() + 1);
  };

  /**
   * Returns the previous sibling.
   * @return {jsx3.app.Model}
   */
  Model_prototype.getPreviousSibling = function() {
    if (! this._jsxparent) return null;
    return this._jsxparent.getChild(this.getChildIndex() - 1);
  };

  /**
   * Returns an array containing all the child DOM nodes of this object. The return value is the original array rather
   * than a copy and should not be modified.
   * @return {Array<jsx3.app.Model>}
   */
  Model_prototype.getChildren = function() {
    if (this._jsxchildren == null) this._jsxchildren = [];
    return this._jsxchildren;
  };

  /**
   * Returns the persistence bit for this model object.
   * @return {int} one of <code>PERSISTNONE</code>, <code>PERSISTEMBED</code>, <code>PERSISTREF</code>,
   *    <code>PERSISTREFASYNC</code>.
   * @see #PERSISTNONE
   * @see #PERSISTEMBED
   * @see #PERSISTREF
   * @see #PERSISTREFASYNC
   */
  Model_prototype.getPersistence = function() {
    return this._jsxpersistence;
  };

  /** @package */
  Model_prototype.getPersistenceUrl = function() {
    return this.getMetaValue("url");
  };

  /**
   * Sets the persistence bit for this model object.
   * @param intPersist {int} one of <code>PERSISTNONE</code>, <code>PERSISTEMBED</code>, <code>PERSISTREF</code>,
   *    <code>PERSISTREFASYNC</code>.
   * @return {jsx3.app.Model} this object
   * @see #PERSISTNONE
   * @see #PERSISTEMBED
   * @see #PERSISTREF
   * @see #PERSISTREFASYNC
   */
  Model_prototype.setPersistence = function(intPersist) {
    this._jsxpersistence = intPersist;
    return this;
  };

  /**
   * Appends a child DOM node to this parent DOM node. If the child already has a parent, <code>adoptChild()</code>
   * should be used instead to ensure that the child is removed from its current parent.
   *
   * @param objChild {jsx3.app.Model} the root node of a DOM fragment.
   * @param intPersist {int} defines how the child will be persisted/serialized. The valid values are the four
   *    persistence values defined as static fields in this class.
   * @param strSourceURL {String|jsx3.net.URI} the path to the serialization file where the child exists. This parameter is only
   *    relevant if the given <code>intPersist</code> is <code>PERSISTREF</code> or <code>PERSISTREFASYNC</code>.
   * @param strNS {String} the namespace of the child to append. This parameter is normally not required but is useful
   *    when sharing DOM nodes between servers with different namespaces.
   * @return {jsx3.app.Model|boolean} this object or <code>false</code> if the set was vetoed
   * @throws {jsx3.Exception} if this object is part of a DOM fragment (the namespace is null) and the
   *    <code>strNS</code> parameter is not specified.
   *
   * @see #adoptChild()
   * @see #PERSISTNONE
   * @see #PERSISTEMBED
   * @see #PERSISTREF
   * @see #PERSISTREFASYNC
   */
  Model_prototype.setChild = function(objChild, intPersist, strSourceURL, strNS) {
    if (!this.onSetChild(objChild) || !objChild.onSetParent(this)) return false;

    //find out the server that will own this object instance
    var bFragment = false;
    if (strNS == null && this._jsxns == null) {
      strNS = Model.FRAGMENTNS;
    } else if (strNS != null) {
      bFragment = true;
    } else {
      strNS = this._jsxns;
    }

    var objServer = this.getServer();

    //only add this item to a server instance if not part of the 'fragment' ns
    if (strNS != Model.FRAGMENTNS && objServer && this._jsxns == strNS) {
      //all items are fragments until added to a valid DOM.  Some fragments already have nested descendants that also need to be bound and registered
      this._bindFragment(objChild, strNS, objChild._jsxfragment != null, objServer);
    } else {
      //the parent ('this') does not yet belong to a DOM (its a fragment); set a flag that lets us know, so when it is finally added to a DOM, its descendant _jsxns props are updated and name/id are applied
      this._jsxfragment = 1;
    }

    //create an array to hold child if not yet created
    var children = this._jsxchildren;
    if (!children) children = this._jsxchildren = [];

    //increment the array and reference the new object
    children[children.length] = objChild;
    objChild._jsxparent = this;

    //set persistent type and urls if applicable
    if (intPersist == null) intPersist = Model.PERSISTNONE;
    objChild._jsxpersistence = intPersist;
    if (strSourceURL && (intPersist == Model.PERSISTREF || intPersist == Model.PERSISTREFASYNC))
      objChild.setMetaValue("url", strSourceURL.toString());

    this.onChildAdded(objChild);

    //issue a DOM onChange call to reflect the update; pass the id of this object as well as the newly-added child;
    if (!bFragment && strNS != Model.FRAGMENTNS)
      objServer.getDOM().onChange(jsx3.app.DOM.TYPEADD, this.getId(), objChild.getId());

    return this;
  };

  /**
   * Hook that allows for a prospective parent DOM node to veto the adoption of a child.
   * @return {boolean} true to allow the set, false to veto
   * @protected
   */
  Model_prototype.onSetChild = function(objChild) {
    return true;
  };

  /**
   * Hook that allows for a prospective child DOM node to veto its adoption by a parent. This method is only called if
   * the prospective parent has not already vetoed the adoption in the <code>onSetChild()</code> method.
   * @return {boolean} true to allow the set, false to veto
   * @protected
   */
  Model_prototype.onSetParent = function(objParent) {
    return true;
  };

  /**
   * Hook that notifies this model object that one of its children has been removed. This hook exists simply to allow
   * this object to perform cleanup/re-render, and does not provide a veto mechanism. This method is called after
   * the child has been removed from the model (<code>this.getChildren()</code> does not contain <code>objChild</code>)
   * and after the child has been removed from the view (<code>objChild.getRendered()</code> is also null).
   * <p/>
   * This method is only called if the child is being removed from the DOM but this object (the parent) is not
   * being removed. Therefore, this hook cannot be relied upon for garbage collection.
   * <p/>
   * If <code>removeChildren()</code> is called on this object, this hook is called exactly once after all children
   * have been removed. In that case, the first parameter to this method will be the array of children and the
   * second parameter will be <code>null</code>.
   * <p/>
   * In general a method overriding this method should begin by calling <code>jsxsuper</code>.
   *
   * @param objChild {jsx3.app.Model|Array<jsx3.app.Model>} the child that was removed
   * @param intIndex {int} the index of the removed child
   * @protected
   */
  Model_prototype.onRemoveChild = function(objChild, intIndex) {
  };

  /**
   * Hook that notifies the model object that a child has been added to it.
   * @param objChild {jsx3.gui.Model} the added child.
   * @since 3.7
   */
  Model_prototype.onChildAdded = function(objChild) {
  };

  /**
   * called by setChild; recurses through the descenants and ensures that they share the common namespace and
   *             are assigned system IDs; if @objChild has descendants (if @bDeep == true), they are also added
   * @param objChild {jsx3.app.Model} the namespace to assign
   * @param strNS {String} the namespace to assign
   * @param bDeep {boolean} if true, the child being added has descendants that need to also be added
   * @private
   * @jsxobf-clobber
   */
  Model_prototype._bindFragment = function(objChild, strNS, bDeep, objServer) {
    //update the namespace property for the child to match that of the parent objChild._jsxns = strNS;
    objChild._jsxns = strNS;
    objChild._applyId(strNS);

    //assign the system Id to @objChild and add a pointer to @objChild to the systemhash
    objServer.getDOM().add(objChild);

    //recurse through descendant of @objChild if @objChild is a 'deep' fragment -- one with descendants
    if (bDeep) {
      //remove the fragment flag, since now a valid DOM object
      delete objChild._jsxfragment;
      //iterate through descendants
      var objKids = objChild.getChildren();
      var maxLen = objKids.length;
      for (var i = 0; i < maxLen; i++)
        objChild._bindFragment(objKids[i], strNS, true, objServer);
    }
  };

  /** @private @jsxobf-clobber-shared */
  Model_prototype._applyId = function(strNS) {
    this._jsxid = jsx3.app.DOM.newId(strNS);
  };

  /**
   * Removes a DOM child from this object. This method removes the on-screen DHTML of the removed object. The removed
   * child will be completely derefenced from the DOM and will be prepped for garbage collection. If a DOM child must
   * continue to exist after removing it from this parent, <code>adoptChild()</code> should be used instead of this
   * method.
   *
   * @param vntItem {int|jsx3.app.Model} either the index of the child to remove or the child itself.
   * @return {jsx3.app.Model} this object
   *
   * @see #adoptChild()
   */
  Model_prototype.removeChild = function(vntItem) {
    //this function can accept an object or integer, convert to integer if an object
    var intIndex = -1;

    if (!(isNaN(vntItem))) {
      // calling function passed an index (integer), so just set to local variable
      intIndex = Number(vntItem);
    } else if (vntItem instanceof jsx3.app.Model) {
      intIndex = vntItem._jsxparent == this ? vntItem.getChildIndex() : -1;
    } else {
      throw new IllegalArgumentException("vntItem", vntItem);
    }

    var objChild = this.getChild(intIndex);
    if (objChild != null) {
      var objServer = this.getServer();
      this._removeChildRecurse(intIndex, objServer);
      this.onRemoveChild(objChild, intIndex);

      // 6) trigger the DOM change event now that the item has been removed
      if (objServer)
        objServer.getDOM().onChange(jsx3.app.DOM.TYPEREMOVE, this.getId(), objChild.getId());
    }
  };

  /** @private @jsxobf-clobber */
  Model_prototype._removeChildRecurse = function(intIndex, objServer, bAll) {
    //if a valid index was found, proceed
    if (intIndex >= 0 && intIndex < this.getChildren().length) {
      // get handle to the child
      var objChild = this.getChild(intIndex);

      if (! bAll)
        objChild.destroyView(this);

      // 0) recursively remove any children/descendants belonging to the child (this allows for more inclusive dereferencing and resource cleanup)
      var maxLen = objChild.getChildren().length;
      //loop through the collection of children, calling 'removeChild()' to remove each, one-by-one
      for (var i = (maxLen-1); i >= 0; i--)
        objChild._removeChildRecurse(i, objServer, true);

      // 1) dereference the object by removing it from the global arrays that point to the object
      if (objServer)
        objServer.getDOM().remove(objChild);

      // 2) remove circular reference from child (objChild) back to the parent (this)
      delete objChild._jsxparent;

      // 3) restack the child array to remove a reference to the now-obsolete item
      if (! bAll)
        this._jsxchildren.splice(intIndex, 1);
      else if (intIndex == 0)
        this._jsxchildren.splice(0, this._jsxchildren.length);

      // 5) pass ref to parent, since the binding is broken, but the child may still need to have ref to parent
      objChild.onDestroy(this);
    } else {
      throw new IllegalArgumentException("intIndex", intIndex);
    }
  };

  /**
   * Removes some or all children of this object.
   * @param arrChildren {Array<int|jsx3.app.Model>} the children to remove. If this parameter is not provided then all
   *   children are removed.
   * @return {jsx3.app.Model} this object.
   *
   * @see #removeChild()
   */
  Model_prototype.removeChildren = function(arrChildren) {
    var objServer = this.getServer();

    if (arrChildren == null) {
      arrChildren = this.getChildren().concat();
      for (var i = arrChildren.length - 1; i >= 0; i--) {
        arrChildren[i].destroyView(this);
        this._removeChildRecurse(i, objServer, true);
      }
    } else {
      var index = null;
      arrChildren = arrChildren.concat();

      for (var i = arrChildren.length - 1; i >= 0; i--) {
        var c = arrChildren[i];
        if (typeof(c) == "number") {
          index = c;
          arrChildren[i] = this.getChild(index);
        } else {
          index = c.getChildIndex();
        }

        this._removeChildRecurse(index, objServer, false);
      }
    }

    if (arrChildren.length > 0)
      this.onRemoveChild(arrChildren, null);

    return this;
  };

  /**
   * Returns an object reference to the server that owns this object. This method returns <code>null</code> if this
   * object is part of a DOM fragment. Until an object is added to a DOM tree by passing it as the parameter to
   * <code>setChild()</code>, the object will be a DOM fragment.
   * @return {jsx3.app.Server}
   */
  Model_prototype.getServer = function() {
    var node = this;
    while (node) {
      if (node._jsxserver) return node._jsxserver;
      node = node._jsxparent;
    }
    return null;
  };

  /** @package */
  Model_prototype._getLocale = function() {
    var objServer = this.getServer();
    return objServer != null ? objServer.getLocale() : jsx3.System.getLocale();
  };

  /** @package */
  Model_prototype._getLocaleProp = function(strProp, fctClass) {
    if (fctClass) strProp = fctClass.jsxclass.getName() + "." + strProp;
    return jsx3.System.getLocaleProperties(this._getLocale()).get(strProp);
  };

  /**
   * Appends a DOM node to this object after removing the node from its former parent reference. If the node to append
   * does not already have a DOM parent, <code>setChild()</code> should be used instead of this method.
   * @param objChild {jsx3.app.Model} the child to adopt
   * @param bRepaint {boolean} if <code>true</code> or <code>null</code>, the object being adopted will be added to
   *    the parent's view via the parent's <code>paintChild()</code> method.
   *    This parameter is made available for those situations where a loop is executing and multiple
   *    objects are being adopted.  As view operations are the most CPU intensive, passing <code>false</code>
   *    while looping through a collection of child objects to adopt will improve performance. After the
   *    last child is adopted, simply call <code>repaint()</code> on the parent to immediately synchronize the view.
   * @param-private bForce {boolean} if true, the adoption is forced, even if the parent/child don't accept such adoptions (<code>onSetChild()</code> and <code>onSetParent()</code> will still be called)
   *
   * @see #setChild()
   */
  Model_prototype.adoptChild = function(objChild, bRepaint, bForce) {
    this._adoptChild(objChild.getChildIndex(), objChild, bRepaint, bForce, false);
  };

  /**
   * @package
   */
  Model_prototype.adoptChildrenFrom = function(objParent, arrChildren, bRepaint, bForce) {
    if (!arrChildren) arrChildren = objParent.getChildren().concat();
    if (arrChildren.length > 0) {
      for (var i = 0; i < arrChildren.length; i++)
        this._adoptChild(arrChildren[i].getChildIndex(), arrChildren[i], bRepaint, bForce, true);
      objParent.onRemoveChild(arrChildren, null);
      for (var i = 0; i < arrChildren.length; i++)
        this.onChildAdded(arrChildren[i]);
    }
  };

  /**
   * Rearranges two siblings, placing the sibling at intMoveIndex before the sibling at intPrecedeIndex
   * @private
   * @jsxobf-clobber
   */
  Model_prototype._insertBefore = function(intMoveIndex,intPrecedeIndex) {
    //exit early if the move wouldn't occur
    if(intMoveIndex == intPrecedeIndex || intMoveIndex == intPrecedeIndex-1) return false;

    //reassemble the child array
    var objChildren = this.getChildren();
    var intAdjustedP = (intMoveIndex < intPrecedeIndex) ? intPrecedeIndex - 1 : intPrecedeIndex;
    var objMove = objChildren.splice(intMoveIndex, 1);
    var objStart = objChildren.splice(0, intAdjustedP);
    this._jsxchildren = objStart.concat(objMove,objChildren);

    this.onChildAdded(objMove[0]);
    //fire the DOM onchange event since we affected the MODEL directly
    var s = this.getServer();
    if (s)
      s.getDOM().onChange(jsx3.app.DOM.TYPEREARRANGE,this.getId(),intPrecedeIndex);

    return true;
  };

  /**
   * Assigns objMoveChild as the previousSibling of objPrecedeChild
   * @param objMoveChild {jsx3.app.Model} the one being moved. Can belong to this object, another object, or can be a GUI fragment
   * @param objPrecedeChild {jsx3.app.Model} the one to insert before
   * @param bRepaint {boolean} if <code>false</code> the repaint will be suppressed (useful for multiple obejct updates
   *    that would lead to unnecessary updates to the VIEW)
   * @return {Boolean} true if successful
   */
  Model_prototype.insertBefore = function(objMoveChild,objPrecedeChild,bRepaint) {
    //adopt first if not common parent
    var bSuccess = true;
    if (!objMoveChild._jsxparent || !objPrecedeChild) {
      //user is inserting a fragment
      bSuccess = this.setChild(objMoveChild);
    } else if(objMoveChild._jsxparent != this) {
      //user is adopting
      bSuccess = this._adoptChild(objMoveChild.getChildIndex(),objMoveChild,false,true,true);
    }

    if (bSuccess) {
      //now do the reorder
      if (objPrecedeChild)
        bSuccess = this._insertBefore(objMoveChild.getChildIndex(), objPrecedeChild.getChildIndex());

      //check for suppress and return
      if (bRepaint !== false)
        this.repaint();
    }

    return bSuccess;
  };

  /** @private @jsxobf-clobber */
  Model_prototype._adoptChild = function(intIndex, objChild, bRepaint, bForce, bMulti) {
    //make sure the adoption is allowed
    if (bForce) {
      this.onSetChild(objChild);
      objChild.onSetParent(this);
    } else {
      if (!this.onSetChild(objChild) || !objChild.onSetParent(this))
        return false;
    }

    //1) get handle to parent, since we're about to lose the ref
    var objParent = objChild._jsxparent;

// JCG: I don't think that this is necessary ... was causing box model reconstruction before the adoption
//    //destroy the box profile. the new parent will determine it (this is a MODEL method for the Box profile)
//    objChild.recalc();

    //2) remove circular reference from child (objChild) to the former parent(this)
    delete objChild._jsxparent;

    //2b) remove box profile (allow it to be reconstructed in context of the new parent)
    // HACK: superclass referencing subclass
    if (objChild.clearBoxProfile)
      objChild.clearBoxProfile(true);

    //3) restack the former parent's child array to remove a reference to the now-obsolete item
    if (objParent._jsxchildren != null) objParent._jsxchildren.splice(intIndex, 1);

    //4) destroy the existing view for the child (the user has no choice in this; they can choose to not paint the new, but the old has to be removed)
    objChild.destroyView(objParent);

    // send old parent onRemove message
    if (! bMulti)
      objParent.onRemoveChild(objChild, intIndex);

    //persist ref to servers involved
    var curServer = objParent.getServer();
    var newServer = this.getServer();
    var bServerChange = curServer != newServer;

    //5) call recursive fn for child if the new parent belongs to a different server (they can't access the cache where they once stored their data, etc, and other server-specific resources that may no longer be accessible)

    if (bServerChange)
      this._adoptChildRecurse(objChild, objParent, curServer, newServer);

    //fire the onChange for the old server (we just removed a child)
    if (curServer)
      curServer.getDOM().onChange(jsx3.app.DOM.TYPEREMOVE, objParent.getId(), objChild.getId());

    //INSERT OBJCHILD INTO THE CHILD ARRAY FOR THE NEW PARENT
    var children = this._jsxchildren;
    if (!children) children = this._jsxchildren = [];
    children[children.length] = objChild;
    objChild._jsxparent = this;

    if (! bMulti)
      this.onChildAdded(objChild);

    //update the VIEW immediately to match the model unless explicitly told to wait
    if (bRepaint !== false) this.viewUpdateHook(objChild, bMulti && objParent._jsxchildren.length > 0);

    //fire the onChange for the new server (we just added a child)
    if (newServer)
      newServer.getDOM().onChange(jsx3.app.DOM.TYPEADD, this.getId(), objChild.getId());

    //return a handle to this
    return this;
  };

  /** @package @jsxobf-clobber-shared */
  Model_prototype.viewUpdateHook = function(objChild, bGroup) {
  };

  /**
   * destroys VIEW for the object; typically called by adoptChild and onDestroy events; subclass to handle more-complex cleanup (such as a TD/TR)
   * @package
   */
  Model_prototype.destroyView = function(objParent) {
  };

  /**
   * called when an adoption occurs that span servers; when this occurs, the item is further cleaned up to ensure proper behaviors
   * @param objChild {jsx3.app.Model} JSX object being moved between servers
   * @private
   * @jsxobf-clobber
   */
  Model_prototype._adoptChildRecurse = function(objChild, objFormerParent, curServer, newServer) {
    //dereference the object by removing it from the global arrays that point to the object
    curServer.getDOM().remove(objChild);
    // reset the child's server namespace
    objChild._jsxns = this._jsxns;
    // insert pointers into the new server's hash to ref the child
    newServer.getDOM().add(objChild);

    objChild.onChangeServer(newServer, curServer);

    var children = objChild.getChildren();
    for (var i = 0; i < children.length; i++)
      objChild._adoptChildRecurse(children[i], null, curServer, newServer);
  };

  /**
   * Called when the server owning this DOM node changes.
   * @param objNewServer {jsx3.app.Server}
   * @param objOldServer {jsx3.app.Server}
   * @protected
   * @since 3.5
   */
  Model_prototype.onChangeServer = function(objNewServer, objOldServer) {
  };

  /**
   * Creates and returns an exact replica of the object. The clone will be appended as a new child node of this
   * object's parent node.
   * @param intPersist {int} the persistance value of the clone.
   * @param intMode {int} <code>0</code> for insert as the last child of the parent of this object and paint,
   *     <code>1</code> for insert as the last child of this parent of this object and do not paint, or <code>2</code>
   *     for load as a fragment.
   * @return {jsx3.app.Model} the clone.
   * @throws {jsx3.Exception} if this object has no parent DOM node.
   */
  Model_prototype.doClone = function(intPersist, intMode) {
    var objLoadInto = intMode == 2 ? this.getServer().getRootBlock() : this._jsxparent;

    if (objLoadInto) {
      // Clone by serializing to XML and then deserializing, which ensures only valid structures get cloned
      var objJSXClone = objLoadInto._loadObject(
          this.toXMLDoc(), intMode < 1, intPersist, null, null, intMode == 2 ? Model.FRAGMENTNS : null);
      return objJSXClone ? objJSXClone[0] : null;
    } else {
      throw new jsx3.Exception(jsx3._msg("model.clone_frag", this));
    }
  };

  /**
   * Finds the first descendant of this DOM node with a the given name.
   * @param strName {String} the name to query on.
   * @param bDepthFirst {boolean} specifies whether to do a depth first or breadth first search.
   * @param bChildOnly {boolean} if <code>true</code>, only search the children of this DOM node.
   * @return {jsx3.app.Model} the descendant with the given name or <code>null</code> if none found.
   */
  Model_prototype.getDescendantOfName = function(strName, bDepthFirst, bChildOnly) {
    return this.findDescendants(function(x){ return x.getName() == strName; },
        bDepthFirst, false, bChildOnly, false);
  };

  /**
   * Finds the first child of the given type.
   * @param strType {String|Function|jsx3.Class} the fully-qualified class name, class constructor function,
   *    or <code>jsx3.Class</code> instance.
   * @param bExact {boolean} if <code>true</code> then only return objects whose class is exactly <code>strType</code>
   *    (rather than returning subclasses too).
   * @return {jsx3.app.Model} the child of the given type or <code>null</code> if none found.
   */
  Model_prototype.getFirstChildOfType = function(strType, bExact) {
    if (bExact) {
      var objClass = null;
      if (typeof(strType) == "string") objClass = jsx3.Class.forName(strType);
      else if (typeof(strType) == "function" && strType.jsxclass instanceof jsx3.Class) objClass = strType.jsxclass;
      else if (strType instanceof jsx3.Class) objClass = strType;

      return this.findDescendants(function(x){ return x.getClass().equals(objClass); },
          false, false, true, false);
    } else {
      return this.findDescendants(function(x){ return x.instanceOf(strType); },
          false, false, true, false);
    }
  };

  /**
   * Finds all descendants of the given type.
   * @param strType {String|Function|jsx3.Class} the fully-qualified class name, class constructor function,
   *    or <code>jsx3.Class</code> instance.
   * @param bShallow {boolean} if <code>true</code>, only search direct children, not all descendants.
   * @return {Array<jsx3.app.Model>} an array of matching descendants
   */
  Model_prototype.getDescendantsOfType = function(strType, bShallow) {
    return this.findDescendants(function(x){ return x.instanceOf(strType); },
        false, true, bShallow, false);
  };

  /**
    * Newly added method based on getDescendantsOfType()
    * Makes use of jsx3.lang.Object's isType() method istead of the instanceOf() method.
    * This method eliminates the need to load the class used in getDescendantsOfType() method  
    * @param {String} strType
    */
  Model_prototype.getDescendantsOfTypeNew = function(strType, bShallow){
    return this.findDescendants(function(x){ return x.isType(strType); },
        false, true, bShallow, false);
  };
  /**
   * Finds all DOM nodes descending from this DOM node that pass the given test function. Results are guaranteed to be
   * returned in order according to the search order used.
   *
   * @param fctTest {Function} test function, takes a single <code>jsx3.app.Model</code> parameter and returns
   *    <code>true</code> if the node matches.
   * @param bDepthFirst {boolean} specifies whether to do a depth first or breadth first search.
   * @param bMultiple {boolean} if <code>true</code>, return an array of matches, otherwise just the first match.
   * @param bShallow {boolean} if <code>true</code>, only search direct children.
   * @param bIncludeSelf {boolean} if <code>true</code>, include this node in the search.
   * @return {jsx3.app.Model|Array<jsx3.app.Model>} the match (bMultiple = false) or matches (bMultiple = true).
   */
  Model_prototype.findDescendants = function(fctTest, bDepthFirst, bMultiple, bShallow, bIncludeSelf) {
    var fctPush = bDepthFirst ? 'unshift' : 'push';
    var matches = bMultiple ? [] : null;
    var list = bIncludeSelf ? [this] : this.getChildren().concat();

    while (list.length > 0) {
      var node = list.shift();

      if (fctTest.call(null, node)) {
        if (bMultiple)
          matches[matches.length] = node;
        else
          return node;
      }

      if (! bShallow)
        list[fctPush].apply(list, node.getChildren());
    }

    return matches;
  };

  /**
   * Select objects from the DOM using a CSS3-like selection syntax. This method considers the DOM tree whose
   * root is this object. The following constructs are supported:
   * <ul>
   *   <li><code>jsx3_gui_ClassName</code> - matches objects by their exact class. Replace "." with "_" in the selector.</li>
   *   <li><code>*</code> - matches any object</li>
   *   <li><code>#id</code> - matches objects whose name equals <code>id</code></li>
   *   <li><code>.class-name</code> - matches objects for which <code>getClassName()</code> is defined and returns a
   *      string that contains the token <code>class-name</code></li>
   *   <li><code>:first</code> and <code>:last</code> - matches objects that are their parents' first and last children</li>
   *   <li><code>:nth(n)</code> and <code>nth-child(n)</code> - matches objects whose child index is equal to <code>n</code></li>
   *   <li><code>:instanceof(ClassName)</code> - matches objects that are instances of the class or interface <code>ClassName</code></li>
   *   <li><code>[prop="value"]</code> and <code>[prop*="value"]</code> - matches objects whose value for field
   *      <code>prop</code> equals <code>value</code></li> or, with "*", contains <code>value</code>. The quotes around <code>value</code> are optional.
   *   <li><code>[getter()="value"]</code> and <code>[getter()*="value"]</code> - matches objects whose return value for
   *      method <code>getter</code> equals <code>value</code></li> or, with "*", contains <code>value</code>. The quotes around <code>value</code> are optional.
   *   <li><code>AB</code> - matches objects that match both A and B</li>
   *   <li><code>A B</code> - matches descendants of objects matching A that match B</li>
   *   <li><code>A &gt; B</code> - matches immediate children of objects matching A that match B</li>
   * </ul>
   * 
   * @param strExpr {String} the selection query
   * @param bSingle {Boolean} if <code>true</code>, return only the first match.
   * @return {Array<jsx3.app.Model> | jsx3.app.Model}
   * @throws {jsx3.lang.IllegalArgumentException} if <code>strExpr</code> is an invalid selection query.
   * @since 3.8
   */
  Model_prototype.selectDescendants = function(strExpr, bSingle) {
    // #id
    // .jsx3_gui_Block
    // :nth(0)
    // A B
    // a > B
    var rx = /(\b\w+\b)|(\#[a-zA-Z_]\w*)|(\.[\w\-]+)|(\:[\w\-]+(?:\([^\)]*\))?)|(\[\w+(?:\(\))?\*?=[^\]]*\])|(\*)|( *> *)|( +)/g;

    var parents = jsx3.$A([this]);
    var considering = null;
    var deep = true;
    var considerSelf = true;
    var isRoot = this.getServer().getRootBlock() == this;
    var bEscape = false;

    rx.lastIndex = 0;

    var lastEnding = 0, a = null;
    while ((a = rx.exec(strExpr)) && !bEscape) {
      if (lastEnding != a.index)
        throw new IllegalArgumentException("strExpr", strExpr);

      var fct = null;

      if (a[1]) {
        // entity type must be first token in generation
        if (considering)
          throw new IllegalArgumentException("strExpr", strExpr);

        var className = a[1].replace(/_/g, ".");
        fct = function(x) { return x.getClass().getName() == className; };
      } else if (a[2]) {
        var id = a[2].substring(1);
        if (isRoot) {
          // a small optimization when starting with "#id" from the root node
          considering = jsx3.$A(this.getServer().getDOM().getAllByName(id));
        } else {
          fct = function(x) { return x.getName() == id; };
        }
      } else if (a[3]) {
        var className = a[3].substring(1);
        fct = function(x) { return typeof(x.getClassName) == "function" &&
            jsx3.$A((x.getClassName() || "").split(/\s+/)).contains(className); };
      } else if (a[4]) {
        if (a[4] == ":first") {
          fct = function(x) { return x.getChildIndex() == 0; };
        } else if (a[4] == ":last") {
          fct = function(x) { var c = x.getParent().getChildren(); return x === c[c.length - 1]; };
        } else if (/:nth(?:\-child)?\( *(\d+) *\)/.test(a[4])) {
          var index = parseInt(RegExp.$1);
          fct = function(x) { return x.getChildIndex() == index; };
        } else if (/:instanceof\( *(\S+?) *\)/.test(a[4])) {
          var c = jsx3.Class.forName(RegExp.$1);
          fct = function(x) { return c && x.instanceOf(c); };
        } else {
          throw new IllegalArgumentException("strExpr", strExpr);
        }
      } else if (a[5]) {
        /^\[(\w+)(\(\))?(\*)?="?(.*?)"?\]$/.test(a[5]);
        var prop = RegExp.$1, useGetter = RegExp.$2, useSearch = RegExp.$3, value = RegExp.$4;

        fct = function(x) {
          var s = useGetter ? x[prop]() : x[prop];
          s = s == null ? "" : String(s);
          return useSearch ? value.length > 0 && s.indexOf(value) >= 0 : s === value;
        };
      } else if (a[6]) {
        fct = function(x) { return true; };
      } else {
        if (!considering)
          throw new IllegalArgumentException("strExpr", strExpr); // should never happen
        else if (considering.length == 0)
          bEscape = true; // escape the loop when a subselection has yielded no objects
        else {
          parents = considering;
          considering = null;
          deep = Boolean(a[8]);
          considerSelf = isRoot = false;
        }
      }

      if (fct) {
        if (considering)
          considering = considering.filter(fct);
        else {
          considering = jsx3.$A();
          parents.each(function(p) {
            considering.addAll(p.findDescendants(fct, false, true, !deep, considerSelf));
          });

          considering = considering.unique();
        }
      }

      lastEnding = rx.lastIndex;
    }

    if (!bEscape && lastEnding != strExpr.length)
      throw new IllegalArgumentException("strExpr", strExpr);

    return bSingle ? considering[0] : considering;
  };

  /**
   * The finalizer method. This method provides a hook for subclasses of this class to perform custom logic
   * when an instance of this class is removed from the DOM. Methods that override this method should begin with
   * a call to <code>jsxsuper()</code>.
   * <p/>
   * Note that this method is called after this object has been removed from the DOM tree. Therefore
   * <code>this.getParent()</code> and <code>this.getServer()</code> will return <code>null</code>. Use the
   * <code>objParent</code> parameter for access to the DOM tree.
   *
   * @param objParent {jsx3.app.Model} reference to the former parent
   * @protected
   */
  Model_prototype.onDestroy = function(objParent) {
    // This method should be overridden by classes with an on-screen view represented by a TD object.
    //always remove the on-screen instance for this object (assuming it's been painted already)
    this._removeFromLoadContext();
  };
  
  /** @private @jsxobf-clobber */
  Model_prototype._removeFromLoadContext = function() {
    var name = this.getName();
    var loadContext = this._jsxloadcontext;
    if (loadContext && loadContext._varNameIndex[name] == this)
      delete loadContext._varNameIndex[name];
  };

  /**
   * Returns the custom JSX-generated id for the object (i.e., _jsx2384098324509823049).
   * @return {String} JSX id
   */
  Model_prototype.getId = function() {
    return this._jsxid;
  };

  /**
   * Returns the zero-based index for this DOM node in relation to its siblings.
   * @return {int} the index or <code>-1</code> if this object does not have a parent.
   */
  Model_prototype.getChildIndex = function() {
    var objParent = this._jsxparent;
    if (objParent != null)
      return jsx3.util.arrIndexOf(objParent.getChildren(), this);
    return -1;
  };

  /**
   * Returns the custom developer-defined name of this object.
   * @return {String}
   */
  Model_prototype.getName = function() {
    return this.jsxname;
  };

  /**
   * Sets the custom developer-defined name of this object.
   * @param strName {String} a name unique among all DOM nodes currently loaded in the application.
   */
  Model_prototype.setName = function(strName) {
    if (strName != null) {
      // update name and add object reference via new name
      var oldName = this.jsxname;
      this.jsxname = strName;

      var objServer = this.getServer();
      if (objServer) objServer.getDOM().onNameChange(this, oldName);
    }
    return this;
  };

  /**
   * Returns the help ID of this object.
   * @return {String}
   * @since 3.5
   * @see jsx3.app.Server#HELP
   */
  Model_prototype.getHelpId = function() {
    return this.jsxhelpid;
  };

  /**
   * Sets the help ID of this object.
   * @param strId {String}
   * @since 3.5
   * @see jsx3.app.Server#HELP
   */
  Model_prototype.setHelpId = function(strId) {
    this.jsxhelpid = strId;
  };

  /**
   * Returns the load type of this DOM node and the descending branch. The load type determines how this DOM branch
   * deserializes and paints in relation to its parent DOM node.
   *
   * @return {int} <code>LT_NORMAL</code>, <code>LT_SLEEP_PAINT</code>, <code>LT_SLEEP_DESER</code>,
   *    <code>LT_SLEEP_PD</code>, <code>LT_SHOW_PAINT</code>, or <code>LT_SHOW_DESER</code>.
   * @see #LT_NORMAL
   * @see #LT_SLEEP_PAINT
   * @see #LT_SLEEP_DESER
   * @see #LT_SLEEP_PD
   * @see #LT_SHOW_PAINT
   * @see #LT_SHOW_DESER
   * @since 3.5
   */
  Model_prototype.getLoadType = function() {
    return this.jsxloadtype || Model.LT_NORMAL;
  };

  /**
   * Sets the load type of this DOM node and the descending branch.
   *
   * @param intLoadType {int} <code>LT_NORMAL</code>, <code>LT_SLEEP_PAINT</code>, <code>LT_SLEEP_DESER</code>,
   *    <code>LT_SLEEP_PD</code>, <code>LT_SHOW_PAINT</code>, or <code>LT_SHOW_DESER</code>.
   * @see #getLoadType()
   * @since 3.5
   */
  Model_prototype.setLoadType = function(intLoadType) {
    this.jsxloadtype = intLoadType;
  };

  /**
   * Returns the parent DOM node of this object.
   * @return {jsx3.app.Model}
   * @final
   */
  Model_prototype.getParent = function() {
    return this._jsxparent;
  };

  /**
   * Returns the first ancestor of the given type.
   * @param strType {String|Function|jsx3.Class} the fully-qualified class name, class constructor function,
   *    or <code>jsx3.Class</code> instance.
   * @return {jsx3.app.Model} the first ancestor of the given type or <code>null</code> if none found.
   */
   Model_prototype.getAncestorOfType = function(strType) {
     return this.findAncestor(function(x){ return x.instanceOf(strType); }, false);
   };

   /**
    * Newly added method based on getAncestorOfType()
    * Makes use of jsx3.lang.Object's isType() method istead of the instanceOf() method.
    * This method eliminates the need to load the class used in getAncestorOfType() method  
    * @param {String} strType
    */
   Model_prototype.getAncestorOfTypeNew = function(strType){
     return this.findAncestor(function(x){ return x.isType(strType); }, false);
   };

  /**
   * Returns the first ancestor with the given name.
   * @param strName {String} the name to query on.
   * @return {jsx3.app.Model} the first ancestor with the given name or <code>null</code> if none found.
   */
   Model_prototype.getAncestorOfName = function(strName) {
     return this.findAncestor(function(x){ return x.getName() == strName; }, false);
   };

  /**
   * Returns the first ancestor passing the given test function.
   * @param fctTest {Function} test function, takes a single <code>jsx3.app.Model</code> parameter and returns
   *    <code>true</code> if the node matches.
   * @param bIncludeSelf {boolean} if <code>true</code>, include this object in the search
   * @return {jsx3.app.Model}
   */
  Model_prototype.findAncestor = function(fctTest, bIncludeSelf) {
    var parent = bIncludeSelf ? this : this._jsxparent;
    while (parent != null) {
      if (fctTest.call(null, parent))
        return parent;
      parent = parent._jsxparent;
    }
    return null;
  };

  /**
   * Returns this object serialized as XML by calling <code>toString()</code> on the result of <code>toXMLDoc()</code>
   * called on this object.
   * @param objProperties {Object<String, String>} name-value pairs that affect the serialization. See
   *   <code>toXMLDoc()</code> for a description.
   * @return {String} this object serialized as an XML string.
   * @see #toXMLDoc()
   */
  Model_prototype.toXML = function(objProperties) {
    return this.toXMLDoc(objProperties).serialize(true, objProperties != null ? objProperties.charset : null);
  };

  /**
   * Serializes this object as an XML document.
   * <p/>
   * The <code>objProperties</code> parameter may include the following keys:
   * <ul>
   *   <li>onafter {String} - the value of the <code>onAfterDeserialize</code> element</li>
   *   <li>onbefore {String} - the value of the <code>onBeforeDeserialize</code> element</li>
   *   <li>name {String} - the value of the <code>name</code> element</li>
   *   <li>icon {String} - the value of the <code>icon</code> element</li>
   *   <li>description {String} - the value of the <code>description</code> element</li>
   *   <li>children {boolean} - if <code>true</code> the children of this object, rather than this object, are
   *          serialized</li>
   *   <li>persistall {boolean} - if <code>true</code> all descendants with persistence PERSISTNONE are included in the
   *          serialization</li>
   * </ul>
   *
   * @param objProperties {Object<String, String>} name-value pairs that affect the serialization. See above for
   *   valid names and how they affect serialization.
   * @return {jsx3.xml.Document} this object serialized as an XML document.
   */
  Model_prototype.toXMLDoc = function(objProperties) {
    if (objProperties == null) {
      objProperties = this._jsxmeta;
      if (objProperties == null) objProperties = {};
    } else {
      if (this._jsxmeta != null) {
        objProperties = jsx3.clone(objProperties);
        for (var f in this._jsxmeta) {
          if (typeof(objProperties[f]) == "undefined")
            objProperties[f] = this._jsxmeta[f];
        }
      }
    }

    var ns = Model.CURRENT_VERSION;
    var objXML = new jsx3.xml.Document();
    var objRoot = objXML.createDocumentElement("serialization", ns);
    objRoot.setAttribute("jsxversion", Model._getComponentAuthorVersion());

    for (var f in Model._META_MAP) {
      if (typeof(objProperties[f]) != "undefined") {
        var nodeName = Model._META_MAP[f];
        var elem = objXML.createNode(Entity.TYPEELEMENT, nodeName, ns);
        elem.appendChild(objXML.createNode(Entity.TYPECDATA, objProperties[f], ns));
        objRoot.appendChild(elem);
      }
    }

    if (objProperties.children) {
      var maxLen = this.getChildren().length;
      for (var i = 0; i < maxLen; i++) {
        objRoot.appendChild(this.getChild(i).toXMLElm(objXML, objProperties));
      }
    } else {
      objRoot.appendChild(this.toXMLElm(objXML, objProperties));
    }

    return objXML;
  };

  /** @private @jsxobf-clobber */
  Model._getComponentAuthorVersion = function() {
    var tokens = jsx3.System.getVersion().split(".");
    return tokens[0] + "." + tokens[1];
  };

  /** @private @jsxobf-clobber */
  Model._OBJ_ARRAYS =
      {_jsxdynamic:"dynamics", jsxcustom:"properties", _jsxevents:"events", jsxxslparams:"xslparameters"};
  /** @private @jsxobf-clobber */
  Model._boolnumber = {"boolean":1, "number":1};

  /**
   * Serializes this object as an XML node in the XML document <code>objXML</code>. This method can be
   * overridden by subclasses of <code>Model</code> that want to provide their own serialized form. However,
   * this method should at least return the node &lt;object type="pkg.Class"/&gt; in order to be compatible with
   * deserialization. 
   *
   * @param objXML {jsx3.xml.Document}
   * @param objProperties {Object} the same object passed to <code>toXMLDoc()</code>.
   * @return {jsx3.xml.Entity}
   * @see #toXMLDoc()
   * @since 3.9
   */
  Model_prototype.toXMLElm = function(objXML, objProperties) {
    // create <object>
    var ns = objXML.getNamespaceURI();
    var objNode = objXML.createNode(Entity.TYPEELEMENT, "object", ns);

    // set the object type
    var objClass = this.getClass();
    var strType = objClass != null ? objClass.getName() : null;
    // DEPRECATED: should eventually only consult getClass()
    if (strType == null)
      strType = this._jsxinstanceof;
    objNode.setAttribute("type", strType);

    // declare variable to persist string and number/booleam properties
    var objVars = objXML.createNode(Entity.TYPEELEMENT, "variants", ns);
    var objStrings = objXML.createNode(Entity.TYPEELEMENT, "strings", ns);
    objNode.appendChild(objVars);
    objNode.appendChild(objStrings);

    // serialize events, dynamic properties, and attributes
    for (var f in Model._OBJ_ARRAYS) {
      var a = this[f];
      if (a != null && typeof(a) == "object") {
        var objDynNode = Model._serializeObjectArray(objXML, Model._OBJ_ARRAYS[f], a);
        if (objDynNode != null) {
          objNode.appendChild(objDynNode);
          //3.7: added the following to remove any temporary dynamic properties
          if(Model._OBJ_ARRAYS[f] == "dynamics" && this._jsxtempdynamic)
            for(var p in this._jsxtempdynamic)
              objDynNode.removeAttribute(p);
        }
      }
    }

    // serialize the children
    var children = this._jsxchildren;
    if (children) {
      if (jsx3.$A.is(children)) {
        var numChildren = children.length;
        if (numChildren > 0) {
          for (var i = 0; i < numChildren; i++) {
            //recurse through descendants
            var child = children[i];
            var intPersist = child._jsxpersistence;

            if (intPersist == Model.PERSISTREF || intPersist == Model.PERSISTREFASYNC) {
              if (intPersist == Model.PERSISTREFASYNC && (i != numChildren-1)) {
                jsx3.util.Logger.GLOBAL.warn(jsx3._msg("model.async_convt", this));
                intPersist = child._jsxpersistence = Model.PERSISTREF;
              }

              var objInclude = objXML.createNode(Entity.TYPEELEMENT, "include", ns);
              objInclude.setAttribute("src", child.getPersistenceUrl());
              objInclude.setAttribute("async", intPersist == Model.PERSISTREFASYNC ? "true" : "false");
              objNode.appendChild(objInclude);
            } else if (intPersist == Model.PERSISTEMBED || objProperties.persistall) {
              objNode.appendChild(child.toXMLElm(objXML, objProperties));
            }
          }
        }
      } else {
        jsx3.util.Logger.GLOBAL.error(jsx3._msg("model.child_notarr", this, this[p]));
      }
    }

    // NOTE: this is pretty slow in IE6, since jsx3.gui.Block has >250 fields to iterate over
    // serialize all arrays, string, boolean, and number properties
    for (var p in this) {
      var val = this[p];
      var type = typeof(val);

      // only act upon properties/attributes of the object, not its functions
      if (type == "function" || p.indexOf("_jsx") == 0 || val == null) {
        ;
      } else if (jsx3.$A.is(val)) {
        var asString = new Array(val.length);
        for (var i = 0; i < val.length; i++) {
          var aval = val[i];
          asString[i] = Model._boolnumber[typeof(aval)] ? aval : "'" + aval + "'";
        }
        objVars.setAttribute(p, "[" + asString.join(",") + "]");
      } else if (type == "object") {
        if (val instanceof Date) {
          objVars.setAttribute(p, "new Date(" + val.getTime() + ")");
        }
      } else {
        if (this._jsxdynamic == null || this._jsxdynamic[p] == null) {
          //ensure that this property gets evaluated during deserialization if it is a number or boolean
          if (Model._boolnumber[type]) {
            objVars.setAttribute(p, String(val));
          } else {
            objStrings.setAttribute(p, val);
          }
        }
      }
    }

    return objNode;
  };

  /** @private @jsxobf-clobber */
  Model._serializeObjectArray = function(objXML, strTagName, objArray) {
    var objNode = null;
    for (var f in objArray) {
      if (objNode == null)
        objNode = objXML.createNode(Entity.TYPEELEMENT, strTagName, Model.CURRENT_VERSION);
      objNode.setAttribute(f, String(objArray[f]));
    }
    return objNode;
  };

  /**
   * Returns the namespace that distinguishes this object's server (owner) from other server instances. The namespace
   * is set when this object is bound to a DOM tree.
   * @return {String} the namespace of the server that owns this object instance.
   */
  Model_prototype.getNS = function() {
    return this._jsxns;
  };

  /**
   * Returns the URI resolver for this DOM node. This method returns the server of this object unless this node
   * or its ancestor was loaded into the DOM with an explicit URI resolver.
   *
   * @return {jsx3.net.URIResolver}
   */
  Model_prototype.getUriResolver = function() {
    var node = this;
    while (node != null) {
      if (node._jsxloadcontext && node._jsxloadcontext.resolver) return node._jsxloadcontext.resolver;
      if (node._jsxserver != null) return node._jsxserver;
      node = node._jsxparent;
    }
    return null;
  };

  /**
   * Deserializes a JSX serialization file and appends the deserialized objects as children of this DOM node.
   * @param strURL {String|jsx3.net.URI} URL (either relative or absolute) of the serialization file to deserialize.
   *    This URL is resolved relative to <code>objResolver</code>, if provided, or the URI resolver of this DOM node.
   * @param bRepaint {boolean} if <code>true</code> or <code>null</code> the deserialized objects will be
   *    added to the parent's view via the parent object's <code>paintChild()</code> method.
   * @param objResolver {jsx3.net.URIResolver} If this parameter is provided, <code>strURL</code> is resolved
   *    relative to it. Additionally, this resolver is stored as the URI resolver for this DOM node and its descendants.
   * @return {jsx3.app.Model} the deserialized object. A serialization file may specify more than one root
   *    object, in which case this method returns the first deserialized object.
   * @throws {jsx3.Exception} if <code>strURL</code> is not the URL of a valid XML document.
   * @see #getUriResolver()
   */
  Model_prototype.load = function(strURL, bRepaint, objResolver) {
    //parse xml and pass to common handler
    var rsURL = (objResolver || this.getUriResolver()).resolveURI(strURL);
    var objXML = (new Document()).load(rsURL);

    if (objXML.hasError())
      throw new jsx3.Exception(jsx3._msg("model.bad_comp", rsURL, objXML.getError()));

    return this._loadObject(objXML, bRepaint, null, rsURL, strURL, null, null, objResolver, null)[0];
  };

  /**
   * Deserializes a JSX serialization file and appends the deserialized objects as children of this DOM node.
   * @param strXML {String|jsx3.xml.Document} the XML content of a JSX serialization file.
   * @param bRepaint {boolean} if <code>true</code> or <code>null</code> the deserialized objects will be
   *    added to the parent's view via the parent object's <code>paintChild()</code> method.
   * @param objResolver {jsx3.net.URIResolver}
   * @return {jsx3.app.Model} the deserialized object. A serialization file may specify more than one root
   *    object, in which case this method returns the first deserialized object.
   * @throws {jsx3.Exception} if <code>strXML</code> is not a valid XML document.
   */
  Model_prototype.loadXML = function(strXML, bRepaint, objResolver) {
    //parse xml and pass to common handler
    var objXML = strXML instanceof Document ? strXML : (new Document()).loadXML(strXML);

    if (objXML.hasError()) {
      var strSourceURL = objXML.getSourceURL();
      var msgId = strSourceURL ? "model.bad_comp" : "model.bad_compobj";
      throw new jsx3.Exception(jsx3._msg(msgId, strSourceURL, objXML.getError()));
    }

    return this._loadObject(objXML, bRepaint, null, objXML.getSourceURL(), objXML.getSourceURL(), null, null, objResolver, null)[0];
  };

  /**
   * Loads a component file and caches the document in an XML cache. If the component file already exists in the cache
   * then it is loaded from the cache. All component files loaded as a result of this call (referenced files) are also
   * cached. This method is a useful replacement for <code>load()</code> when the same URL will be loaded multiple
   * times in one application.
   *
   * @param strURL {String|jsx3.net.URI} URL (either relative or absolute) of the serialization file to deserialize.
   *    This URL is resolved relative to <code>objResolver</code>, if provided, or the URI resolver of this DOM node.
   * @param bRepaint {boolean} if <code>true</code> or <code>null</code> the deserialized objects will be
   *    added to the parent's view via the parent object's <code>paintChild()</code> method.
   * @param objCache {jsx3.app.Cache} the cache to store the component XML documents in. If not provided, the cache
   *    of the server of this model object is used.
   * @param objResolver {jsx3.net.URIResolver} If this parameter is provided, <code>strURL</code> is resolved
   *    relative to it. Additionally, this resolver is stored as the URI resolver for this DOM node and its descendants.
   * @return {jsx3.app.Model} the deserialized object. A serialization file may specify more than one root
   *    object, in which case this method returns the first deserialized object.
   * @see #load()
   * @see #getUriResolver()
   * @throws {jsx3.Exception} if <code>strURL</code> is not the URL of a valid XML document.
   */
  Model_prototype.loadAndCache = function(strURL, bRepaint, objCache, objResolver) {
    if (objCache == null) objCache = this.getServer().getCache();
    var rsURL = (objResolver || this.getUriResolver()).resolveURI(strURL);
    var objXML = objCache.getOrOpenDocument(rsURL);

    if (objXML.hasError())
      throw new jsx3.Exception(jsx3._msg("model.bad_comp", rsURL, objXML.getError()));

    return this._loadObject(objXML, bRepaint, null, rsURL, strURL, null, objCache, objResolver, null)[0];
  };

  /**
   * Converts a serialization document formatted according to the CIF document format to the standard format
   * @param objXML {jsx3.xml.Document} serialization document adhering to the format, Model.CIF_VERSION
   * @return {jsx3.xml.Document} serialization document adhering to the format, Model.CURRENT_VERSION
   * @private
   * @jsxobf-clobber
   */
  Model._formatCIF = function(objXML) {
    jsx3.require("jsx3.xml.Template");
    var doc = jsx3.getSystemCache().getOrOpenDocument(Model._CIFPROCESSORURL, null, jsx3.xml.XslDocument.jsxclass);
    return doc.transformToObject(objXML);
  };

  /** @private @jsxobf-clobber */
  Model._META_MAP = {name:"name", icon:"icon", description:"description", onbefore:"onBeforeDeserialize",
    onafter:"onAfterDeserialize"};

  /**
   * Deserializes a valid JSX serialization file (stored as XML) into live JSX objects.
   * @param objXML {jsx3.xml.Document} the serialized component file.
   * @param bRepaint {boolean} if true or null the component will be painted to screen immediately.
   * @param intPersist {int} the persistence type.
   * @param strSourceURL {String|jsx3.net.URI} the system relative URI to the component file.
   * @param strRawURL {String|jsx3.net.URI} the original URI sent to the load() function, may be null.
   * @param strNS {String} the explicit namespace, may be null.
   * @param objCache {jsx3.app.Cache} if provided, all included documents will be fetched from/stored in the cache.
   * @param objResolver {jsx3.net.URIResolver} the URI resolver passed to the load function.
   * @return {Array<jsx3.app.Model>|boolean} false if the load was vetoed
   * @private
   * @jsxobf-clobber
   */
  Model_prototype._loadObject = function(objXML, bRepaint, intPersist, strSourceURL, strRawURL, strNS,
                                        objCache, objResolver, objServer) {

    if (objXML == null)
      throw new IllegalArgumentException("objXML", objXML);

    // determine which deserialization routine to use based upon the xmlns attribute for the serialization file
    if (objXML.getRootNode().getNamespaceURI().indexOf(Model.CIF_VERSION) == 0) {

      //convert the CIF document format (Model.CIF_VERSION) to the standard serializer (Model.CURRENT_VERSION)
      objXML = Model._formatCIF(objXML);

      //throw error if xml is now invalid
      if (objXML == null)
        throw new IllegalArgumentException("objXML", objXML);
    }

    // determine which deserialization routine to use based upon the xmlns attribute for the serialization file
    if (objXML.getRootNode().getNamespaceURI().indexOf(Model.CURRENT_VERSION) != 0) {
      throw new jsx3.Exception(jsx3._msg("model.bad_vers", strSourceURL, objXML.getRootNode().getAttribute("xmlns")));
    } else {
      var v = objXML.getRootNode().getAttribute("jsxversion");
      if (v && jsx3.util.compareVersions(v, jsx3.System.getVersion()) > 0)
        throw new jsx3.Exception(jsx3._msg("model.future_vers", strSourceURL, v));
    }

    var bFragment = strNS == Model.FRAGMENTNS;
    var serPath = "/jsx1:serialization/";

    objXML.setSelectionNamespaces("xmlns:jsx1='" + Model.CURRENT_VERSION + "'");
    var strOnBeforeDeserializeNode = objXML.selectSingleNode(serPath + "jsx1:onBeforeDeserialize");
    if (strOnBeforeDeserializeNode != null) {
      var strOnBeforeDeserialize = strOnBeforeDeserializeNode.getValue();
      if (strOnBeforeDeserialize && !objXML._jsxdidbeforedsrlz) {
        try {
          jsx3.eval(strOnBeforeDeserialize, {objPARENT:this, objXML:objXML});
          /* @jsxobf-clobber-shared */
          objXML._jsxdidbeforedsrlz = true;
        } catch (e) {
          jsx3.util.Logger.GLOBAL.error(jsx3._msg("model.onbefore", strSourceURL), jsx3.NativeError.wrap(e));
        }
      }
    }

    //derive the namespace that should be used (infer if not explicitly passed)
    if (strNS == null) strNS = this._jsxns;

    var previousResolver = this.getUriResolver() || objServer;

    if (objResolver == null) {
      // if the resolver is not explicitly provided and the raw URI implies a resolver, we need to store that
      // resolver at this point in the DOM
      objResolver = jsx3.net.URIResolver.getResolver(strRawURL);
    } else if (strRawURL) {
      if (objResolver.getUriPrefix() != previousResolver.getUriPrefix()) {
        // if the resolver is provided and the raw URI is relative to that resolver, we need to store the absolute
        // URI relative to that resolver.
        strRawURL = jsx3.net.URI.valueOf(strRawURL);
        if (! jsx3.net.URIResolver.isAbsoluteURI(strRawURL))
          strRawURL = objResolver.relativizeURI(strRawURL);
      }
    }

    var attachedServer = this.getServer();

    // this resolver will be used for any includes found from this point down
    if (objServer == null)
      objServer = attachedServer;
    var branchResolver = objResolver || previousResolver;

    //deserialize and bind new component as a child this instance
    var i = objXML.selectNodeIterator(serPath + "jsx1:object | " + serPath + "jsx1:objects/jsx1:object | /jsx1:object");
    var objToInsert = [];

    var loadContext = {uri:strSourceURL, resolver:objResolver, _varNameIndex:{}};

    while (i.hasNext()) {
      //get node descriptor in the XML serializatoin file and deserialize the node as a child of 'this' object
      var objNode = i.next();
      var objJSX = this._doLoad(objNode, strSourceURL, strNS, objServer, objCache, branchResolver, loadContext);

      //if a valid child resulted (was the serialzation file valid and the referenced GUI object type a valid class?
      if (objJSX != null) {
        //this item is a valid JSX GUI object will be added as a child to the MODEL; track it so it can auto-inserted (as DHTML) into the VIEW
        objToInsert[objToInsert.length] = objJSX;

        //set the current child
        if (!bFragment)
          var success = this.setChild(objJSX, intPersist, strSourceURL, strNS);
        if (success === false) return false;

        //profile the current child with information about where it came from
        if (objToInsert.length == 1) {
          if (strRawURL)
            objJSX.setMetaValue("url", strRawURL.toString());
          for (var f in Model._META_MAP) {
            var node = objXML.selectSingleNode(serPath + "jsx1:" + Model._META_MAP[f]);
            if (node != null)
              objJSX.setMetaValue(f, node.getValue());
          }
        }

        if (attachedServer != null)
          objJSX.onAfterAttach();

        // customize properties for an object
        if (jsx3.IDE) {
          if (jsx3.ide.customProperties) {
            jsx3.ide.customProperties(objJSX);
          }
        } 

      }
    }

    //fire the onChange event for the dom controller managing this server (setChild would have fired this, but due to fragment ns this is the safer method)
    if (!bFragment && objToInsert.length > 0 && attachedServer)
      attachedServer.getDOM().onChange(jsx3.app.DOM.TYPEADD, this.getId(), objToInsert[0].getId());


    //update the view by iterating through all GUI objects that were just added to the model by adding their DHTML directly into the view
    if (bRepaint !== false) {
      for (var j = 0; j < objToInsert.length; j++)
        this.viewUpdateHook(objToInsert[j], j < objToInsert.length - 1);
    }

    //return handle to last item deserialized
    return objToInsert;
  };

  /**
   * {Object<String,boolean>} The allowed meta data fields. See getMetaValue() and setMetaValue().
   */
  Model.META_FIELDS = {url: 1, name: 1, icon: 1, description: 1, onafter: 1, onattach: 1, onbefore: 1, unicode: 1};

  /**
   * Returns one of the meta data values stored at the top of the serialization file that this object was loaded from.
   * @param strKey {String} the name of the meta data field, one of the keys in <code>META_FIELDS</code>.
   * @return {String} the meta data value or empty string.
   * @see #META_FIELDS
   */
  Model_prototype.getMetaValue = function(strKey) {
    if (Model.META_FIELDS[strKey])
      return this._jsxmeta ? this._jsxmeta[strKey] : "";
    else
      throw new IllegalArgumentException("strKey", strKey);
  };

  /**
   * setS one of the meta data values stored at the top of a component's serialization file.
   * @param strKey {String} the name of the meta data field, one of the keys in <code>META_FIELDS</code>
   * @param strValue {String} the new value of the meta data field.
   * @see #META_FIELDS
   */
  Model_prototype.setMetaValue = function(strKey, strValue) {
    if (Model.META_FIELDS[strKey]) {
      if (this._jsxmeta == null) this._jsxmeta = {};
      this._jsxmeta[strKey] = strValue;
    } else {
      throw new IllegalArgumentException("strKey", strKey);
    }
  };

  /**
   * Used for pre-loading classes mentioned in the XML document
   * @param {jsx3.xml.Document} objXML
   * @param {Function} cb
   */
  Model_prototype.preLoadClassesAsync = function(objXML, cb){
    var serPath = "/jsx1:serialization/";
    objXML.setSelectionNamespaces("xmlns:jsx1='" + Model.CURRENT_VERSION + "'");
    var i = objXML.selectNodeIterator(serPath + "jsx1:object | " + serPath + "jsx1:objects/jsx1:object | /jsx1:object");
    var objClassTypes = {};	
    while (i.hasNext()) {
      var objNode = i.next();
      this._getUndefinedTypes(objNode,objClassTypes);
    }
    jsx3.requireAsyncNew.call(jsx3,objClassTypes,cb);
  };
  
  /**
   * Used to get the list of classes that are still not loaded amd are required as per the XML
   * Populates required data in the second parameter which is an object(objects are passed by reference)
   */
  Model_prototype._getUndefinedTypes = function(objXML,objClassTypes){
  //get the JSX foundation class that the object will be an instance of
    var strType = objXML.getAttribute("type");
    var objClass = jsx3.Class.isDefined(strType);
    if (!objClass) {
      objClassTypes[strType] = null; 
    }
    var i = objXML.selectNodeIterator("jsx1:object | jsx1:children/jsx1:object");
    while (i.hasNext()) {
      var objItem = i.next();
      this._getUndefinedTypes(objItem,objClassTypes);
    }
  };

  /**
   * @param objXML {jsx3.xml.Entity} the XML &lt;object/&gt; entity.
   * @param strSourceURL {String} the URI from which the component is being loaded, for communicating with the user only.
   * @param strNS {String} the namespace of the objects to load.
   * @param objServer {jsx3.app.Server} the server into which the objects will load.
   * @param objCache {jsx3.app.Cache} if provided, all referenced components are loaded from and stored in this cache.
   * @param objResolver {jsx3.net.URIResolver} the URI resolver to resolve any referenced components against.
   * @return {jsx3.app.Model} the loaded object with any descendant objects also loaded and attached.
   * @private
   * @jsxobf-clobber-shared
   */
  Model_prototype._doLoad = function(objXML, strSourceURL, strNS, objServer, objCache, objResolver, loadContext) {
    if (objXML == null) return null;

    // Check the load type
    if (! objXML._jsxloading) {
      var loadType = objXML.selectSingleNode("jsx1:variants/@jsxloadtype");
      loadType = loadType ? parseInt(loadType.getValue()) : Model.LT_NORMAL;
      if (loadType == Model.LT_SLEEP_DESER || loadType == Model.LT_SLEEP_PD || loadType == Model.LT_SHOW_DESER) {
        jsx3.require("jsx3.gui.Painted"); // this class defines jsx3.app.Model.Loading
        var objInstance = new Model.Loading(objXML, loadType, [strSourceURL, strNS, objServer, objCache, objResolver, loadContext]);
        objInstance._jsxns = strNS;
        return objInstance;
      }
    }

    //get the JSX foundation class that the object will be an instance of
    var strType = objXML.getAttribute("type");
    var objClass = jsx3.Class.forName(strType);
    // DEPRECATED: check for un-registered class
    if (objClass == null)
      objClass = jsx3.getClass(strType);

    // support for loading classes as needed
    if (objClass == null) {
      try {
        objClass = jsx3.CLASS_LOADER.loadClass(strType);
      } catch (e) {
        jsx3.util.Logger.GLOBAL.error(jsx3._msg("model.load_cls", strType), jsx3.NativeError.wrap(e));
      }
    }

    //log error if the class isn't supported
    if (objClass == null) {
      //errors occur if class definition file doesn't exist for the object
      jsx3.util.Logger.GLOBAL.error(jsx3._msg("model.bad_type", strSourceURL, strType));
      return null;
    }

    //create the object instance of the given class and set its 'jsxtype' property
    var objInstance = null;
    if (objClass instanceof jsx3.Class) {
      objInstance = objClass.bless();
    } else {
      // DEPRECATED: old style instantiation
      objInstance = new objClass(jsx3.DESERIALIZE);
      objInstance._jsxinstanceof = strType;
    }

    // attach the URI resolver to this DOM node
    /* @jsxobf-clobber-shared */
    objInstance._jsxloadcontext = loadContext;

    objInstance._jsxns = strNS;
    objInstance.onBeforeAssemble(this, objServer);

    var bDoChildren = objInstance.assembleFromXML(objXML);

    var strName = objInstance.getName();
    if (strName) {
      if (jsx3.util.isName(strName)) // only put names that are valid variable names into this index
        loadContext._varNameIndex[strName] = objInstance;
    }

    //recurse to bind children
    if (bDoChildren) {
      var i = objXML.selectNodeIterator("jsx1:object | jsx1:include | jsx1:children/jsx1:object | jsx1:children/jsx1:include");

      while (i.hasNext()) {
        var objItem = i.next();

        if (objItem.getBaseName() == "object") {
          //during recursion all descendants are embedded, since this is how they exist in the serialization file
          var objNewChild = objInstance._doLoad(objItem, strSourceURL, strNS, objServer, objCache, objResolver, loadContext);
          if (objNewChild) objInstance.setChild(objNewChild, Model.PERSISTEMBED, null, strNS);
        } else if (objItem.getBaseName() == "include") {
          // resolver the referenced component file relative to this DOM node
          var rawURL = objItem.getAttribute("src");
          var strMyURL = objResolver.resolveURI(rawURL);
          var refSync = true;

          //branch based on async or not
          if (objItem.getAttribute("async") == "true") {
            refSync = false;

            if (i.hasNext()) {
              jsx3.util.Logger.GLOBAL.warn(jsx3._msg("model.async_convt", objInstance));
              refSync = true;
            }
          }

          if (refSync) {
            //this is a synchronouns load; just request the resource
            var objRefXML = objCache != null ? objCache.getOrOpenDocument(strMyURL) : (new Document()).load(strMyURL);

            if (objRefXML.hasError())
              throw new jsx3.Exception(jsx3._msg("model.bad_comp", strMyURL, objXML.getError()));

            objInstance._loadObject(objRefXML, false, Model.PERSISTREF, strMyURL, rawURL, strNS, objCache, null, objServer);
          } else {
            objInstance._doLoadAsync(strMyURL, rawURL, strNS, objCache, objServer);
          }
        } else {
          throw new jsx3.Exception();
        }
      }
    }

    objInstance.onAfterAssemble(this, objServer);
    //return the object instance
    return objInstance;
  };

  /**
   * Builds this object from its serialized XML representation. Subclasses of Model may override this method
   * along with <code>toXMLElm()</code> to control their own serialized form.
   * <p/>
   * When this method is called this object has already been instantiated but none of its properties have been set.
   * This method sets all of its properties. Any children of this object are automatically deserialized after this
   * method returns. 
   *
   * @param objElm {jsx3.xml.Entity} the serialized representation of this object.
   * @return {boolean} <code>true</code> to deserialize any child objects or <code>false</code> to ignore them
   *    (for example if this method performs a custom child deserialization).
   *
   * @since 3.9
   * @see #toXMLElm()
   */
  Model_prototype.assembleFromXML = function(objElm) {
    var names = objElm.getAttributeNames();
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (name != "type") {
        var val = objElm.getAttribute(name);
        if (val.indexOf("@{") == 0 && val.lastIndexOf("}") == val.length - 1)
          this.setDynamicProperty(name, val.substring(2, val.length - 1));
        else
          this[name] = isNaN(val) ? val : Number(val);
      }
    }

    //call functions that will extract variant, dynamic, and string data types and apply to the object instance
    for (var i = objElm.selectNodeIterator("jsx1:strings | jsx1:variants | jsx1:dynamics | jsx1:properties | jsx1:events | jsx1:xslparameters"); i.hasNext(); ) {
      var n = i.next();
      var name = n.getBaseName();
      if (name == "strings")
        Model._applyStringAttributes(this, n);
      else if (name == "variants")
        Model._applyVariantAttributes(this, n);
      else if (name == "dynamics")
        Model._bindObjectProperty(this, n, "_jsxdynamic");
      else if (name == "properties")
        Model._bindObjectProperty(this, n, "jsxcustom");
      else if (name == "events")
        Model._bindObjectProperty(this, n, "_jsxevents");
      else if (name == "xslparameters")
        Model._bindObjectProperty(this, n, "jsxxslparams");
    }

    return true;
  };

  /**
   * Called during deserialization of this object. This method provides a hook for initializing
   * an object during deserialization since init() is not called. Called after this object has been instantiated but
   * before its fields and children have been assembled. This method is called before this object is attached to the
   * DOM, therefore <code>getParent()</code>, <code>getServer()</code>, <code>getXML()</code>, etc. return <code>null</code>.
   * @param objParent {jsx3.app.Model} the parent of this object once it is attached to the DOM.
   * @param objServer {jsx3.app.Server} the server that this DOM object will attach to.
   * @protected
   */
  Model_prototype.onBeforeAssemble = function(objParent, objServer) {
  };

  /**
   * Called during deserialization of this object. This method provides a hook for initializing
   * an object during deserialization since init() is not called. Called after this object has been instantiated and
   * after its fields and children have been assembled.This method is called before this object is attached to the
   * DOM, therefore <code>getParent()</code>, <code>getServer()</code>, <code>getXML()</code>, etc. return <code>null</code>.
   * @param objParent {jsx3.app.Model} the parent of this object once it is attached to the DOM.
   * @param objServer {jsx3.app.Server} the server that this DOM object will attach to.
   * @protected
   */
  Model_prototype.onAfterAssemble = function(objParent, objServer) {
  };

  /**
   * Called during deserialization of this object. This method provides a hook for initializing
   * an object during deserialization since <code>init()</code> is not called. Called after this object has been
   * instantiated and after it has been attached to the DOM. Methods overriding this method should usually begin
   * with a call to <code>jsxsuper()</code>.
   * <p/>
   * When a new branch is attached to the DOM, this method is executed on each node in the branch. The order is
   * reverse-breadth-first meaning that child nodes are notified from oldest to youngest and before the parent node.
   * <p/>
   * This implementation of this method executes the on-after-deserialize script of this object.
   *
   * @protected
   */
  Model_prototype.onAfterAttach = function() {
    // NOTE: DOM nodes are notified of attachment from the deepest to the root
    // defensive backup prevents double execution of this method per node if the DOM is modified by the onafter script
    var children = this.getChildren().concat();
    for (var i = children.length - 1; i >= 0; i--) {
      if (children[i]._jsxparent == this)
        children[i].onAfterAttach();
    }

    this.applyDynamicProperties();

    var onAfter = this.getMetaValue("onafter");
    if (onAfter) {
      try {
        var loadContext = this._jsxloadcontext;
        var objContext = loadContext ? jsx3.$O(loadContext._varNameIndex).clone() : {};
        objContext.objJSX = this;
        this.eval(onAfter, objContext);
      } catch (e) {
        var strSourceUrl = this.getMetaValue("url");
        jsx3.util.Logger.GLOBAL.error(jsx3._msg("model.onafter", strSourceUrl), jsx3.NativeError.wrap(e));
      }
    }
  };

  /**
   * Assigns a dynamic property to one of this object's instance properties.
   * @param strName {String} property on this GUI object that will now use a dynamic property (e.g., 'jsxleft','jsxtop','jsxheight',etc.);
   * @param strValue {String} name of a dynamic style, whose value will be used
   * @param bNoSave {Boolean} When <code>true</code>, this dynamic property will not be serialized with the object.
   * @return {jsx3.gui.Painted} this object
   */
  Model_prototype.setDynamicProperty = function(strName, strValue, bNoSave) {
    //declare object if it doesn't exists
    if (this._jsxdynamic == null) this._jsxdynamic = {};
    if (this._jsxtempdynamic == null) this._jsxtempdynamic = {};

    //set the property  -- assume delete request if null value passed for existing item
    if (strValue == null) {
      delete this._jsxdynamic[strName];
      delete this._jsxtempdynamic[strName];
    } else {
      this._jsxdynamic[strName] = strValue;
      if(bNoSave)
        this._jsxtempdynamic[strName] = strValue;
      else
        delete this._jsxtempdynamic[strName];
    }

    return this;
  };

  /**
   * Returns the value of the dynamic property @strPropName; if not found, returns null
   * @param strName {String} property on this GUI object that will now use a dynamic property (e.g., 'jsxleft','jsxtop','jsxheight',etc.);
   * @return {String} value of the property
   */
  Model_prototype.getDynamicProperty = function(strName) {
    if (this._jsxdynamic) return this._jsxdynamic[strName];
  };

  /**
   * system call typically made by the paint routine for the object; updates all properties for the object with any dynamic properties it may reference
   * @private
   */
  Model_prototype.applyDynamicProperties = function() {
    //declare object if it doesn't exists
    if (this._jsxdynamic != null) {
      //get handle to the server that owns this object
      var objMyServer = this.getServer();
      if (objMyServer == null) return;

      //loop to update the values in this object with their corresponding value managed by the given server instance
      var jss = objMyServer.getProperties();
      for (var p in this._jsxdynamic)
        this[p] = jss.get(this._jsxdynamic[p]);
    }
  };

  /** @private @jsxobf-clobber */
  Model_prototype._doLoadAsync = function(strURL, rawURL, strNS, objCache, objServer) {
    var me = this;

    if (objCache != null && objCache.getDocument(strURL.toString()) != null) {
      var objXML = objCache.getDocument(strURL.toString());
      jsx3.sleep(function() {
        this._loadObject(objXML, true, Model.PERSISTREFASYNC, strURL, rawURL, strNS, objCache, null, objServer);
      }, null, this);
    } else {
      var objXML = new Document();
      objXML.setAsync(true);

      objXML.subscribe(Document.ON_RESPONSE, function(objEvent) {
        if (objCache != null)
          objCache.setDocument(strURL, objEvent.target);

        me._loadObject(objEvent.target, true, Model.PERSISTREFASYNC, strURL, rawURL, strNS, objCache, null, objServer);
      });
      objXML.subscribe([Document.ON_ERROR, Document.ON_TIMEOUT], function(objEvent) {
        throw new jsx3.Exception(jsx3._msg("model.bad_comp", strURL, objEvent.target.getError()));
      });

      objXML.load(strURL, Model.ASYNC_LOAD_TIMEOUT);
    }
  };

  /** @private @jsxobf-clobber */
  Model._applyStringAttributes = function(objInstance, objXML) {
    var names = objXML.getAttributeNames();
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      objInstance[name] = objXML.getAttribute(name);
    }
  };

  /** @private @jsxobf-clobber */
  Model._applyVariantAttributes = function(objInstance, objXML) {
    var names = objXML.getAttributeNames();
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      var strValue = objXML.getAttribute(name);
      // Checking isNaN is a 100x speedup on Fx and a 25x speedup on IE6 for all numbers
      objInstance[name] = isNaN(strValue) ? objInstance.eval(strValue) : Number(strValue);
    }
  };

  /** @private @jsxobf-clobber */
  Model._bindObjectProperty = function(objInstance,objXML,strObjName) {
    //able to convert a given node in a serializattion file to a javascript object with name/value pairs
    var objTemp = objInstance[strObjName] = {};

    var names = objXML.getAttributeNames();
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      objTemp[name] = objXML.getAttribute(name);
    }
  };

  /** @package */
  Model_prototype._getNodeRefField = function(strAddress) {
    try {
      var s = this.getServer();
      return s.getJSX(strAddress) || s.getRootBlock().selectDescendants(strAddress, true);
    } catch (e) { return null; }
  };

  /**
   * Returns a string representation of this object.
   * @return {String}
   */
  Model_prototype.toString = function() {
    return "@" + this.getClass().getName() + " " + this.getId() + "/" + this.getName();
  };


  /**
   * Returns the release/build for the class (i.e., "3.0.00")
   * @return {String}
   * @deprecated
   */
  Model.getVersion = function() {
    return "3.00.00";
  };


});


/**
 * @deprecated  Renamed to jsx3.app.Model
 * @see jsx3.app.Model
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.Model", -, null, function(){});
 */
jsx3.Model = jsx3.app.Model;
/**
 * The CDF data schema. This class instructs CDF controls how to extract data from their CDF data sources.
 * <p/>
 * CDF is a flexible nested XML data structure. The default CDF schema looks like:
 * <pre>
 * &lt;data jsxid="jsxroot"&gt;
 *   &lt;record jsxid="id1" jsxtext="label1" .../&gt;
 *   ...
 * &lt;/data&gt;
 * </pre>
 *
 * The required aspects of CDF are:
 * <ul>
 *   <li>A simple XML structure with one XML element per item</li>
 *   <li>Child items are direct descendants of their parent item</li>
 *   <li>A unique ID per-item</li>
 *   <li>(In some cases) id="jsxroot" on the root element</li>
 * </ul>
 *
 * Other aspects of the schema are flexible so that you could have CDF that looks like:
 * <pre>
 * &lt;items id="jsxroot"&gt;
 *   &lt;item id="id1" label="label1" .../&gt;
 *   ...
 * &lt;/items&gt;
 * </pre>
 *
 * This schema is achieved by an instance of this class with the following properties:
 * <code>children</code> = "item", <code>id</code> = "id" and <code>text</code> = "label".
 *
 * @see jsx3.xml.CDF#setSchema()
 * @since 3.9
 */
jsx3.Class.defineClass("jsx3.xml.CDFSchema", jsx3.app.Model, null, function(Schema, Schema_prototype) {

  Schema_prototype.init = function(o) {
    if (o)
      for (var f in o)
        this.setProp(f, o[f]);
  };

  Schema_prototype.assembleFromXML = function(objElm) {
    var names = objElm.getAttributeNames();
    var props = this.getProps();

    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (name == "type")
        continue;
      else if (name == "jsxname")
        this.jsxname = objElm.getAttribute(name);
      else
        props[name.substring(1)] = objElm.getAttribute(name);
    }
  };

  Schema_prototype.toXMLElm = function(objXML, objProperties) {
    var objNode = objXML.createNode(Entity.TYPEELEMENT, "object", objXML.getNamespaceURI());
    var props = this.getProps();

    objNode.setAttribute("type", this.getClass().getName());
    if (this.getName())
      objNode.setAttribute("jsxname", this.getName());

    for (var f in props)
      if (props[f])
        objNode.setAttribute("a" + f, props[f]);

    return objNode;
  };

  /**
   * Returns all the set properties of this schema.
   * @return {Object<String, String>}
   */
  Schema_prototype.getProps = function() {
    if (!this._jsxp)
      this._jsxp = {};
    return this._jsxp;
  };

  /**
   * Returns a property of this schema or the default property value.
   * @param name {String} the property key.
   * @return {String} the set property value or the default value.
   */
  Schema_prototype.getProp = function(name) {
    return this.getProps()[name] || (name == "children" ? "record" : "jsx" + name);
  };

  /**
   * Sets or clears a property of this schema. The relevant values for <code>name</code> depend on the subclass of
   * <code>jsx3.xml.CDF</code> that this schema will apply to. The following properties apply in most cases:
   * <ul>
   *   <li><code>children</code></li>
   *   <li><code>id</code></li>
   *   <li><code>text</code></li>
   *   <li><code>tip</code></li>
   *   <li><code>style</code></li>
   *   <li><code>class</code></li>
   *   <li><code>img</code></li>
   *   <li><code>imgalt</code></li>
   * </ul>
   * Others include <code>selected</code>, <code>unselectable</code>, <code>divider</code>, <code>disabled</code>,
   * <code>keycode</code> and <code>open</code>.
   *
   * @param name {String}
   * @param value {String}
   */
  Schema_prototype.setProp = function(name, value) {
    this.getProps()[name] = value;
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
 * Mixin interface that provides methods for accessing and manipulating an XML document in CDF schema.
 * <p/>
 * Classes that implement this interface must also define a <code>getXML()</code> method. This interface uses
 * that method to access the XML document for which it provides a CDF interface.
 */
jsx3.Class.defineInterface("jsx3.xml.CDF", null, function(CDF, CDF_prototype) {

  /** @private @jsxobf-clobber */
  CDF._LOG = jsx3.util.Logger.getLogger(CDF.jsxclass.getName());

  /**
   * {int}
   * @final @jsxobf-final
   */
  CDF.DELETE = 0;

  /**
   * {int}
   * @final @jsxobf-final
   */
  CDF.INSERT = 1;

  /**
   * {int}
   * @final @jsxobf-final
   */
  CDF.UPDATE = 2;

  /**
   * {int}
   * @final @jsxobf-final
   */
  CDF.INSERTBEFORE = 3;


  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ELEM_ROOT = "data";

  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ELEM_RECORD = "record";

  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ATTR_ID = "jsxid";

  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ATTR_TEXT = "jsxtext";

  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ATTR_EXECUTE = "jsxexecute";

  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ATTR_DISABLED = "jsxdisabled";

  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ATTR_SELECTED = "jsxselected";

  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ATTR_UNSELECTABLE = "jsxunselectable";

  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ATTR_IMG = "jsximg";

  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ATTR_TIP = "jsxtip";

  /**
   * {String}
   * @final @jsxobf-final
   * @deprecated
   */
  CDF.ATTR_KEYCODE = "jsxkeycode";


  /** @private @jsxobf-clobber */
  CDF.PROPERTY_ATTR = ["jsxtext", "jsxtip", "jsximg", "jsxkeycode", "jsxstyle", "jsxclass"];

  /** @private @jsxobf-clobber */
  CDF._SERIAL = 1;

  CDF.DEFAULT_SCHEMA = new jsx3.xml.CDFSchema();

  /**
   * Sets the schema for this CDF control.
   * @param objSchema {jsx3.xml.CDFSchema}
   * @since 3.9
   */
  CDF_prototype.setSchema = function(objSchema) {
    /* @jsxobf-clobber */
    this.jsxschema = objSchema;
  };

  /**
   * Returns the schema for this CDF control as set by <code>setSchema()</code>, the first child of this object
   * of type <code>CDFSchema</code>, or the default CDF schema.
   * @return {jsx3.xml.CDFSchema}
   * @since 3.9
   */
  CDF_prototype.getSchema = function() {
    return this.jsxschema || this._jsxschema || CDF.DEFAULT_SCHEMA;
  };

  // CDF attribute name
  CDF_prototype._cdfan = function(name) {
    return this.getSchema().getProp(name);
  };

  // CDF attribute value
  CDF_prototype._cdfav = function(rec, name, val) {
    var attr = this._cdfan(name);
    if (arguments.length >= 3) {
      if (rec.setAttribute)
        rec.setAttribute(attr, val);
      else
        rec[attr] = val;
    } else if (rec)
      return rec.getAttribute ? rec.getAttribute(attr) : rec[attr];
  };

  CDF_prototype._onAfterAttach = function() {
    // cache the first child to speed the query up
    /* @jsxobf-clobber */
    this._jsxschema = this.getDescendantsOfType(jsx3.xml.CDFSchema, true)[0];
  };

  jsx3.app.Model.jsxclass.addMethodMixin("onAfterAttach", CDF.jsxclass, "_onAfterAttach");
  jsx3.app.Model.jsxclass.addMethodMixin("onChildAdded", CDF.jsxclass, "_onAfterAttach");
  jsx3.app.Model.jsxclass.addMethodMixin("onRemoveChild", CDF.jsxclass, "_onAfterAttach");

  /**
   * Inserts a new record into the XML data source of this object. If no XML data source exists
   * yet for this object, an empty one is created before adding the new record.
   * If a record already exists with an id equal to the <code>jsxid</code> property of <code>objRecord</code>,
   * the operation is treated as an update, meaning the existing record is completely removed and a new record with
   * the given jsxid is inserted.
   *
   * @param objRecord {Object<String, String>} a JavaScript object containing property/value pairs that define the
   *    attributes of the XML entity to create. Note that most classes that implement this interface require that all
   *    records have an attribute named <code>jsxid</code> that is unique across all records in the XML document.
   *    All property values will be treated as strings. Additionally, the following 3 characters are escaped:
   *    <code>" &gt; &lt;</code>.
   * @param strParentRecordId {String} the unique <code>jsxid</code> of an existing record. If this optional parameter
   *    is provided and a record exists with a matching <code>jsxid</code> attribute, the new record will be added as a child of
   *    this record. Otherwise, the new record will be added to the root <code>data</code> element. However, if a
   *    record already exists with a <code>jsxid</code> attribute equal to the <code>jsxid</code> property of
   *    <code>objRecord</code>, this parameter will be ignored. In this case <code>adoptRecord()</code> must be called
   *    to change the parent of the record.
   * @param bRedraw {boolean} if <code>true</code> or <code>null</code>, the on-screen view of this object is
   *    immediately updated to reflect the additional record.
   * @return {jsx3.xml.Entity} the newly created or updated entity.
   * @see #adoptRecord()
   */
  CDF_prototype.insertRecord = function(objRecord, strParentRecordId, bRedraw) {
    //exit early if no value hash supplied
    if (objRecord instanceof Object) {

      //get xml document that holds the data records
      var objXML = this.getXML();
      var action = CDF.INSERT;

      //check if a record with the same ID already exists
      var objRecordNode = objXML.selectSingleNode(this._getSelectionQuery(this._cdfav(objRecord, "id")));
      if (objRecordNode != null) {
        //update action
        action = CDF.UPDATE;
      } else {
        //create a new record object
        var elmName = this._cdfan("children");
        objRecordNode = objXML.createNode(jsx3.xml.Entity.TYPEELEMENT, elmName == "*" ? "record" : elmName);

        //find out who should own the new record and append new record as a child
        var objParent = (strParentRecordId != null) ?
            objXML.selectSingleNode(this._getSelectionQuery(strParentRecordId)) : null;
        if (objParent == null) objParent = objXML.getRootNode();
        objParent.appendChild(objRecordNode);
      }

      //iterate through the named properties on the hash; assume values for each property are scalar (further assume string)
      for (var p in objRecord)
        if (objRecord[p] != null)
          objRecordNode.setAttribute(p, objRecord[p].toString());

      //if user chose to redraw, do so here (user must explicitly send false to stop a redraw)
      if (bRedraw !== false)
        this.redrawRecord(this._cdfav(objRecord, "id"), action);

      //return a handle to the new node
      return objRecordNode;
    } else {
      throw new jsx3.IllegalArgumentException("objRecord", objRecord);
    }
  };

  /**
   * Inserts a new record into the XML data source of this object. This method is the same as
   * <code>insertRecord()</code> except that its first parameter is of type <code>jsx3.xml.Entity</code> rather than
   * <code>Object</code>.
   *
   * @param objRecordNode {jsx3.xml.Entity} an XML element of name <code>record</code>. Note that most classes that
   *    implement this interface require that all records have an attribute named <code>jsxid</code> that is unique
   *    across all records in the XML document.
   * @param strParentRecordId {String} the unique <code>jsxid</code> of an existing record. If this optional parameter
   *    is provided and a record exists with a matching <code>jsxid</code> attribute, the new record will be added as a child of
   *    this record. Otherwise, the new record will be added to the root <code>data</code> element.
   * @param bRedraw {boolean} if <code>true</code> or <code>null</code>, the on-screen view of this object is
   *    immediately updated to reflect the additional record.
   * @see #insertRecord()
   */
  CDF_prototype.insertRecordNode = function(objRecordNode, strParentRecordId, bRedraw) {
    //exit early if no value hash supplied
    if (objRecordNode instanceof jsx3.xml.Entity) {

      //get xml document that holds the data records
      var objXML = this.getXML();

      // find out who should own the new record and append new record as a child
      var action = CDF.INSERT;

      //check if a record with the same ID already exists
      var objExistRecordNode = objXML.selectSingleNode(this._getSelectionQuery(this._cdfav(objRecordNode, "id")));
      if (objExistRecordNode != null) {
        //update action
        action = CDF.UPDATE;
        objExistRecordNode.getParent().replaceNode(objRecordNode,objExistRecordNode);
      } else {
        var objParent = (strParentRecordId != null) ?
            objXML.selectSingleNode(this._getSelectionQuery(strParentRecordId)) : null;
        if (objParent == null) objParent = objXML.getRootNode();
        objParent.appendChild(objRecordNode);
      }

      // if user chose to redraw, do so here (user must explicitly send false to stop a redraw)
      if (bRedraw !== false)
        this.redrawRecord(this._cdfav(objRecordNode, "id"), action);
    } else {
      throw new jsx3.IllegalArgumentException("objRecordNode", objRecordNode);
    }
  };

  /**
   * Inserts a new property into an existing record with <code>jsxid</code> equal to <code>strRecordId</code>.
   * If the property already exists, the existing property value will be updated. If no such record exists
   * in the XML document, this method fails quietly.
   *
   * @param strRecordId {String} the <code>jsxid</code> attribute of the data record to modify.
   * @param strPropName {String} the name of the property to insert into the record.
   * @param strPropValue {String} the value of the property to insert.
   * @param bRedraw {boolean} if <code>true</code> or <code>null</code>, the on-screen view of this object is
   *    immediately updated to reflect the inserted property.
   * @return {jsx3.xml.CDF} this object.
   */
  CDF_prototype.insertRecordProperty = function(strRecordId,strPropName,strPropValue,bRedraw) {
    //check if a record with the same ID already exists
    var objRecordNode = this.getRecordNode(strRecordId);
    if (objRecordNode != null) {
      //add an attribute to the XML-formatted record to persist
      objRecordNode.setAttribute(strPropName,strPropValue);

      //if user chose to redraw, do so here (user must explicitly send false to stop a redraw)
      if (bRedraw !== false)
        this.redrawRecord(strRecordId, CDF.UPDATE);
    } else {
      CDF._LOG.debug(jsx3._msg("cdf.prop_ins", strRecordId));
    }
    //return handle to self
    return this;
  };

  /**
   * Removes a specific property from a record. If no such record exists in the XML document, this method fails quietly.
   *
   * @param strRecordId {String} the <code>jsxid</code> attribute of the data record to modify.
   * @param strPropName {String} the name of the property to remove from the record.
   * @param bRedraw {boolean} if <code>true</code> or <code>null</code>, the on-screen view of this object is
   *    immediately updated to reflect the deleted property.
   */
  CDF_prototype.deleteRecordProperty = function(strRecordId,strPropName,bRedraw) {
    //get xml document that holds the data records
    var objXML = this.getXML();

    //check if a record with the same ID already exists
    var objRecordNode = objXML.selectSingleNode(this._getSelectionQuery(strRecordId));
    if (objRecordNode != null) {
      //add an attribute to the XML-formatted record to persist
      objRecordNode.removeAttribute(strPropName);

      //if user chose to redraw, do so here (user must explicitly send false to stop a redraw)
      if (bRedraw !== false)
        this.redrawRecord(strRecordId, CDF.UPDATE);
    } else {
      CDF._LOG.debug(jsx3._msg("cdf.prop_del", strRecordId));
    }
  };

  /**
   * An abstract method that must be implemented by any class that implements this interface. Implementations of this
   * method should redraw the specified record in the on-screen view.
   *
   * @param strRecordId {String} the <code>jsxid</code> attribute of the data record to redraw.
   * @param intAction {int} <code>INSERT</code>, <code>UPDATE</code>, or <code>DELETE</code>.
   * @see #INSERT
   * @see #UPDATE
   * @see #DELETE
   */
  CDF_prototype.redrawRecord = jsx3.Method.newAbstract("strRecordId", "intAction");

  /**
   * Transfers a CDF record from another object to this object. If no XML data source exists
   * yet for this object, an empty one is created before adding the new record. This method always updates the
   * on-screen view of both the source and destination objects.
   * <p/>
   * This method fails quietly if any of the following conditions apply:
   * <ul>
   * <li>there is no object with id equal to <code>strSourceId</code></li>
   * <li>there is no record in the source object with jsxid equal to <code>strRecordId</code></li>
   * <li><code>strParentRecordId</code> is specified and there is no record in this object with
   *    jsxid equal to <code>strParentRecordId</code></li>
   * <li>the this object already has a record with jsxid equal to the record to adopt</li>
   * </ul>
   *
   * @param strSourceId {String|jsx3.xml.CDF} <span style="text-decoration: line-through;">either the id of the source object or the</span> source object itself.
   * @param strRecordId {String} the <code>jsxid</code> attribute of the data record in the source object to transfer.
   * @param strParentRecordId {String} the unique <code>jsxid</code> of an existing record. If this optional parameter
   *    is provided, the adopted record will be added as a child of this record. Otherwise, the adopted record will
   *    be added to the root <code>data</code> element.
   * @param-private bRedraw {Boolean} forces suppression of the insert event
   * @return {jsx3.xml.Entity} the adopted record.
   */
  CDF_prototype.adoptRecord = function(strSourceId, strRecordId, strParentRecordId, bRedraw) {
    //get handle to existing parent
    var objJSX = strSourceId;
    if (typeof(strSourceId) == "string") objJSX = jsx3.GO(strSourceId);

    if (objJSX != null) {
      //make sure the record we're adopting isn't a direct ancestor (or self); that would cause infinite recursion
      var objRecord = objJSX.getRecordNode(strRecordId);
      if (objRecord != null) {
        //get handle to the node that will become the new parent for the adoptee; if no id passed for the parent, assume that the parent should simply be the root node
        var objParent = (strParentRecordId == null) ? this.getXML().getRootNode() : this.getRecordNode(strParentRecordId);

        //check for null
        if (objParent != null) {
          //loop up the dom for the XML source document to make sure a child isn't adopting a parent
          var objTemp = objParent;
          while (objTemp != null && !objTemp.equals(objRecord)) objTemp = objTemp.getParent();
          //check for null (a good thing, in this case)
          if (objTemp == null) {

            // check for a duplicate jsxid in adoption between JSX objects
            if (objJSX != this) {
              var dupCheck = this.getRecordNode(strRecordId);
              if (dupCheck != null) {
                CDF._LOG.debug(jsx3._msg("cdf.adopt_col", this, strRecordId));
                return;
              }
            }

            //no match found; allow the adoption (a combination of a delete + insert)
            var objRecordNode = objJSX.deleteRecord(strRecordId);
            this.insertRecordNode(objRecordNode,strParentRecordId,bRedraw);
            return this.getRecordNode(strRecordId);
          } else {
            //no need to send error as this is a common occurrence
            //jsx3.util.Logger.doLog("CDF9","Invalid adoption: the CDF record (" + strParentRecordId +") cannot be adopted by a direct descendant. The JSX Object, '" + this.getId() + "', was unable to adopt the record.");
          }
        } else {
          CDF._LOG.debug(jsx3._msg("cdf.adopt_dest", this, strRecordId, strParentRecordId));
        }
      } else {
        CDF._LOG.debug(jsx3._msg("cdf.adopt_src", this, strRecordId, objJSX));
      }
    } else {
      CDF._LOG.debug("adoptRecord() no object with id: " + strSourceId);
    }
  };

  /**
   * Creates a new CDF record and inserts it into the CDF data source of this object, <i>before</i> the record identified by <b>strSiblingRecordId</b>.
   * <p/>
   * This method fails quietly if any of the following conditions apply:
   * <ul>
   * <li>there is no existing record with a jsxid equal to <code>strSiblingRecordId</code></li>
   * <li>there is an existing record with jsxid equal to <code>objRecord.jsxid</code></li>
   * </ul>
   *
   * @param objRecord {Object<String, String>} a JavaScript object containing property/value pairs that define the
   *    attributes of the XML entity to create. Note that most classes that implement this interface require that all
   *    records have an attribute named <code>jsxid</code> that is unique across all records in the XML document.
   *    All property values will be treated as strings. Additionally, the following 3 characters are escaped:
   *    <code>" &gt; &lt;</code>.
   * @param strSiblingRecordId {String} the unique <code>jsxid</code> of an existing record before which the new record will be inserted.
   * @param bRedraw {boolean} if <code>true</code> or <code>null</code>, the on-screen view of this object is
   *    immediately updated to reflect the additional record.
   * @return {jsx3.xml.Entity} the newly created entity.
   * @see #adoptRecordBefore()
   */
  CDF_prototype.insertRecordBefore = function(objRecord, strSiblingRecordId, bRedraw) {
    //exit early if no value hash supplied
    var objXML = this.getXML();
    var objExistingNode = objXML.selectSingleNode(this._getSelectionQuery(this._cdfav(objRecord, "id")));
    if (objExistingNode) {
      CDF._LOG.debug(jsx3._msg("cdf.before_col", this._cdfav(objRecord, "id"), this));
    } else {
      var objSiblingNode = objXML.selectSingleNode(this._getSelectionQuery(strSiblingRecordId));
      if(objSiblingNode != null && objSiblingNode.getParent() != null) {
        var objNewNode = this.insertRecord(objRecord,this._cdfav(objSiblingNode.getParent(), "id"),false);
        if(objNewNode) {
          this.adoptRecordBefore(this,this._cdfav(objRecord, "id"),strSiblingRecordId,bRedraw);
          return objNewNode;
        }
      } else {
        CDF._LOG.debug(jsx3._msg("cdf.before_rec", strSiblingRecordId, this));
      }
    }
  };

  /**
   * Equivalent to adoptRecord, except that the to-be relationship is as a previousSibling to the CDF record identified by the parameter, <b>strSiblingRecordId</b>
   * <p/>
   * This method fails quietly if any of the following conditions apply:
   * <ul>
   * <li>there is no record with a jsxid equal to <code>strSourceId</code></li>
   * <li>there is no record in the source object with a jsxid equal to <code>strRecordId</code></li>
   * <li><code>strSiblingRecordId</code> is specified and there is no record in this object with a
   *    jsxid equal to <code>strParentRecordId</code></li>
   * <li>this object already has a record with jsxid equal to the record to adopt</li>
   * </ul>
   *
   * @param strSourceId {String|jsx3.xml.CDF} <span style="text-decoration: line-through;">either the id of the source object or the</span> source object itself.
   * @param strRecordId {String} the <code>jsxid</code> attribute of the data record in the source object to transfer.
   * @param strSiblingRecordId {String} the unique <code>jsxid</code> of an existing record in front of
   * which the record identified by strSourceId will be placed
   * @param bRedraw {boolean} if <code>true</code> or <code>null</code>, the on-screen view of this object is
   *    immediately updated to reflect the deleted record.
   * @return {jsx3.xml.Entity} the adopted record.
   */
  CDF_prototype.adoptRecordBefore = function(strSourceId, strRecordId, strSiblingRecordId, bRedraw) {
    //get handle to existing parent
    var objJSX = strSourceId;
    if (typeof(strSourceId) == "string") objJSX = jsx3.GO(strSourceId);

    if (objJSX == this && strRecordId == strSiblingRecordId) {
      ; // a record is already inserted before itself
    } else {
      //first resolve the parent id (who should actually adopt)
      var objParent = this.getRecordNode(strSiblingRecordId).getParent();
      var strTrueParentRecordId = this._cdfav(objParent, "jsx");

      //insert as child of actual parent and then do an insertBefore
      var objRecordNode = this.adoptRecord(strSourceId, strRecordId, strTrueParentRecordId,false);
      if (objRecordNode) {
        var objRef = this.getRecordNode(strSiblingRecordId);
        objParent.insertBefore(objRecordNode,objRef);

        //call redraw, passing insertbefore
        if (bRedraw !== false) {
          this.redrawRecord(this._cdfav(objRecordNode, "id"), CDF.INSERTBEFORE);
//          for (var i = objRecordNode.getChildIterator(); i.hasNext(); )
//            this.redrawRecord(this._cdfav(i.next(), "id"), CDF.INSERT);
        }

        return objRecordNode;
      }
    }
  };

  /**
   * Removes a record from the XML data source of this object.
   *
   * @param strRecordId {String} the <code>jsxid</code> attribute of the data record to remove.
   * @param bRedraw {boolean} if <code>true</code> or <code>null</code>, the on-screen view of this object is
   *    immediately updated to reflect the deleted record.
   * @return {jsx3.xml.Entity} the record removed from the data source or <code>null</code> if no such record found.
   */
  CDF_prototype.deleteRecord = function(strRecordId,bRedraw) {
    //get handle to xml document in cache
    var objXML = this.getXML();

    //get node to remove
    var objNode = objXML.selectSingleNode(this._getSelectionQuery(strRecordId));
    if (objNode != null) {
      //remove the node
      objNode = objNode.getParent().removeChild(objNode);

      //remove item from on-screen VIEW if relevant
      if (bRedraw !== false) {
        this.redrawRecord(strRecordId, CDF.DELETE);
//        for (var i = objNode.getChildIterator(); i.hasNext(); )
//          this.redrawRecord(this._cdfav(i.next(), "id"), CDF.DELETE);
      }

      //return the removed node
      return objNode;
    }

    return null;
  };

  /**
   * Returns an object containing the attributes of a particular CDF record as property/value pairs. The object returned by this
   * method is a copy of the underlying data. Therefore, updates to this object will not affect the underlying data.
   * <p/>
   * The following two lines of code evaluate to the same value:
   * <pre>
   * objCDF.getRecord(strId).propName;
   * objCDF.getRecordNode(strId).getAttribute("propName");</pre>
   *
   * @param strRecordId {String} the <code>jsxid</code> attribute of the data record to return.
   * @return {Object<String, String>} the object representation of a CDF node or <code>null</code> if no such record found.
   * @see #getRecordNode()
   */
  CDF_prototype.getRecord = function(strRecordId) {
    //get a handle to the record node object
    var objNode = this.getRecordNode(strRecordId);

    //if this object exists, create a JavaScript object clone and return
    if (objNode != null) {
      var o = {};
      var names = objNode.getAttributeNames();
      for (var i = 0; i < names.length; i++)
        o[names[i]] = objNode.getAttribute(names[i]);
      return o;
    }

    return null;
  };

 /**
   * Returns an array containing all CDF IDs (<code>jsxid</code>) of this CDF.
   *
   * @return  {Array<String>} the array of jsxid.
   */
   CDF_prototype.getRecordIds = function() {
    var arrayIds = [];
    var objXML = this.getXML();
    var itrNodes = objXML.selectNodeIterator("//" + this._cdfan("children"));
    while (itrNodes.hasNext()) {
      var node = itrNodes.next();
      arrayIds.push(this._cdfav(node, "id"));
    }
    return arrayIds;
  };

  /**
   * Returns a record from the XML data source of this object. This returned value is a handle to the record and
   * not a clone. Therefore, any updates made to the returned value with update the XML document of this object.
   * To reflect such changes in the on-screen view of this object, call
   * <code>redrawRecord(strRecordId, jsx3.xml.CDF.UPDATE);</code> on this object.
   *
   * @param strRecordId {String} the <code>jsxid</code> attribute of the data record to return.
   * @return {jsx3.xml.Entity} the record node or <code>null</code> if none exists with a <code>jsxid</code>
   *    attribute equal to <code>strRecordId</code>.
   * @see #redrawRecord()
   * @see #getRecord()
   */
  CDF_prototype.getRecordNode = function(strRecordId) {
    //get handle to xml document in cache
    var objXML = this.getXML();
    return objXML.selectSingleNode(this._getSelectionQuery(strRecordId));
  };

  /** @private @jsxobf-clobber-shared */
  CDF_prototype._getSelectionQuery = function(strRecordId) {
    //there appears to be a bug in how the W3C spec is implemented. Apostrophes cannot be escaped. TO DO: this has to be resolved...
    //see: http://www.w3.org/TR/2003/WD-xquery-20031112/#id-primary-expressions
    return ((strRecordId+"").indexOf("'") == -1) ?
      "//*[@" + this._cdfan("id") + "='" + strRecordId + "']" :
      '//*[@' + this._cdfan("id") + '="' + strRecordId + '"]';
  };


  /**
   * Resets the XML of this control to the value returned by <code>CDF.newDocument()</code> and places the document
   * in the server cache.
   *
   * @param bRepaint {boolean} if <code>true</code> or <code>null</code>, the on-screen view of this object is
   *    immediately updated to reflect the inserted property.
   * @deprecated  Use <code>jsx3.xml.Cacheable.clearXmlData()</code> instead.
   * @see #newDocument()
   * @see jsx3.xml.Cacheable#clearXmlData()
   */
  CDF_prototype.resetData = function(bRepaint) {
    if (jsx3.xml.Cacheable && this.instanceOf(jsx3.xml.Cacheable)) {
      this.clearXmlData();
      if (bRepaint)
        this.repaint();
    }
  };

  /**
   * Removes this object's existing document from the cache and reloads the document from its original source.
   * This method is different from the method <code>resetData()</code> in that this method does not reset the XML
   * document of this object to an empty CDF document.
   *
   * @param-private bSystem {boolean} if true, the document will be removed even if this is a system-owned document
   * @return {jsx3.xml.Document} jsx3.xml.Document instance
   * @deprecated  use <code>jsx3.xml.Cacheable.resetXmlCacheData()</code> instead
   * @see #resetData()
   * @see jsx3.xml.Cacheable#resetXmlCacheData()
   */
  CDF_prototype.reloadFromSource = function(bSystem) {
    if (jsx3.xml.Cacheable && this.instanceOf(jsx3.xml.Cacheable))
      this.resetXmlCacheData();
  };


  /**
   * @package
   */
  CDF_prototype.assignIds = function() {
    var xml = this.getXML();
    for (var i = xml.selectNodeIterator("//" + this._cdfan("children") + "[not(@"+this._cdfan("id")+")]"); i.hasNext(); ) {
      var node = i.next();
      node.setAttribute(this._cdfan("id"), CDF.getKey());
    }
  };

  /** @private @jsxobf-clobber */
  CDF._INDEXEDPROP_REGEX = /\[(\w+)\]$/;

  /**
   * Converts all attributes in this CDF document that are property keys of the form <code>{key}</code> to
   * the value of the property.
   * @param objProps {jsx3.app.Properties} the properties repository to query.
   * @param arrProps {Array<String>} if provided, these attributes are converted rather than the default set of
   *    attributes.
   * @param bUnion {boolean} if <code>true</code>, <code>arrProps</code> is combined with the default set of
   *    attributes and those attributes are converted.
   */
  CDF_prototype.convertProperties = function(objProps, arrProps, bUnion) {
    if (arrProps == null)
      arrProps = CDF.PROPERTY_ATTR;
    else if (bUnion)
      arrProps.push.apply(arrProps, CDF.PROPERTY_ATTR);

    // the fast way requires MSXML 4, Safari does not seem to be supported
    if (jsx3.getXmlVersion() > 3 && !jsx3.CLASS_LOADER.SAF) {
      var nameTokens = new Array(arrProps.length);
      for (var i = 0; i < arrProps.length; i++)
        nameTokens[i] = "name()='" + arrProps[i] + "'";

      var nameQuery = nameTokens.join(" or ");
      var valueQuery = "substring(.,1,1)='{' and substring(.,string-length(.),1)='}'";
      var strQuery = "//@*[("+nameQuery+") and ("+valueQuery+")]";

      for (var i = this.getXML().selectNodeIterator(strQuery); i.hasNext(); ) {
        var node = i.next();
        var value = node.getValue();
        var key = value.substring(1, value.length-1);
        var indexKey = null;
        if (key.match(CDF._INDEXEDPROP_REGEX)) {
          key = RegExp.leftContext;
          indexKey = RegExp.$1;
        }

        var propValue = objProps.get(key);
        if (typeof(propValue) != "undefined") {
          if (indexKey != null && propValue instanceof Object)
            node.setValue(propValue[indexKey]);
          else
            node.setValue(propValue);
        }
      }
    }
    // the slow way
    else {
      var strQuery = "//@" + arrProps.join(" | //@");
      for (var j = this.getXML().selectNodeIterator(strQuery); j.hasNext(); ) {
        var node = j.next();
        var value = node.getValue();
        if (value.indexOf("{") == 0 && jsx3.util.strEndsWith(value, "}")) {
          var key = value.substring(1, value.length-1);
          var indexKey = null;
          if (key.match(CDF._INDEXEDPROP_REGEX)) {
            key = RegExp.leftContext;
            indexKey = RegExp.$1;
          }

          var propValue = objProps.get(key);
          if (typeof(propValue) != "undefined") {
            if (indexKey != null && propValue instanceof Object)
              node.setValue(propValue[indexKey]);
            else
              node.setValue(propValue);
          }
        }
      }
    }
  };

  /**
   * Creates a new XML document that represents an empty CDF document. The XML source of the new document
   * is <code>&lt;data jsxid="jsxroot"/&gt;</code>.
   *
   * @return {jsx3.xml.Document} the newly created document.
   */
  CDF.newDocument = function() {
    var objXML = new jsx3.xml.Document();
    objXML.loadXML('<data jsxid="jsxroot"/>');
    return objXML;
  };

  /**
   * Generates a unique <code>jsxid</code> attribute for a CDF record. This method can be used for new CDF records
   * when there is no natural unique key to assign to them.
   * @return {String}
   */
  CDF.getKey = function() {
    return "jsx_" + (CDF._SERIAL++).toString(36);
  };


  /**
   * Returns the release/build for the class (i.e., "2.2.00").
   * @return {String}
   * @deprecated
   */
  CDF.getVersion = function() {
    return "3.00.00";
  };


});

/**
 * A subclass of <code>jsx3.xml.Document</code> that implements the CDF interface. This class simply exposes the CDF
 * convenience methods on an XML document.
 */
jsx3.Class.defineClass("jsx3.xml.CDF.Document", jsx3.xml.Document, [jsx3.xml.CDF], function(Document, Document_prototype) {

  /**
   * Returns this document to conform to the contract of the <code>jsx3.xml.CDF</code> interface.
   * @return {jsx3.xml.Document} this object.
   */
  Document_prototype.getXML = function() {
    return this;
  };

  /**
   * No-op.
   * @param strRecordId {String} the <code>jsxid</code> attribute of the data record to redraw.
   * @param intAction {int} <code>INSERT</code>, <code>UPDATE</code>, or <code>DELETE</code>.
   */
  Document_prototype.redrawRecord = function(strRecordId, intAction) {
  };

  Document_prototype.cloneDocument = function() {
    return Document.wrap(this.jsxsuper());
  };

  /**
   * Creates a new XML document that represents an empty CDF document. The XML source of the new document
   * is <code>&lt;data jsxid="jsxroot"/&gt;</code>.
   *
   * @return {jsx3.xml.CDF.Document} the newly created document.
   */
  Document.newDocument = function() {
    var objXML = new Document();
    objXML.loadXML('<data jsxid="jsxroot"/>');
    return objXML;
  };

  /**
   * @param objXML {jsx3.xml.Document}
   * @return {jsx3.xml.CDF.Document}
   */
  Document.wrap = function(objXML) {
    return new Document(objXML.getNativeDocument());
  };

});


/**
 * @deprecated  Renamed to jsx3.xml.CDF
 * @see jsx3.xml.CDF
 * @jsxdoc-definition  jsx3.Class.defineInterface("jsx3.CDF", -, function(){});
 */
jsx3.CDF = jsx3.xml.CDF;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

/**
 * Encapsulates a keydown event listener that is invoked by a certain combination of keys pressed simultaneously.
 *
 * @see jsx3.gui.Interactive#registerHotKey()
 * @see jsx3.gui.Form#doKeyBinding()
 *
 * @since 3.2
 */
jsx3.Class.defineClass("jsx3.gui.HotKey", null, [jsx3.util.EventDispatcher], function(HotKey, HotKey_prototype) {
  
  var Event = jsx3.gui.Event;
  
  /**
   * {String} Event type published just after a hot key is invoked.
   * @final @jsxobf-final
   */
  HotKey.WAS_INVOKED = "invoked";
  
  /** @private @jsxobf-clobber */
  HotKey_prototype._callback = null;
  /** @private @jsxobf-clobber */
  HotKey_prototype._keycode = null;
  /** @private @jsxobf-clobber */
  HotKey_prototype._shift = false;
  /** @private @jsxobf-clobber */
  HotKey_prototype._ctrl = false;
  /** @private @jsxobf-clobber */
  HotKey_prototype._meta = false;
  /** @private @jsxobf-clobber */
  HotKey_prototype._alt = false;
  /** @private @jsxobf-clobber */
  HotKey_prototype._enabled = true;
  /** @private @jsxobf-clobber */
  HotKey_prototype._destroyed = false;

  /**
   * @param strKey {String}
   * @param fctCallback {Function}
   * @return {jsx3.gui.HotKey}
   */
  HotKey.valueOf = function(strKey, fctCallback) {
    var objKeys = strKey.toLowerCase().split("+");
    var vntCharacter = objKeys.pop();

    //determine the control-key accelerators
    var bCtrl = objKeys.indexOf("ctrl") >= 0;
    var bShift = objKeys.indexOf("shift") >= 0;
    var bAlt = objKeys.indexOf("alt") >= 0;
    var bMeta = objKeys.indexOf("meta") >= 0;

    //convert characters to their unicode equivalent
    if (typeof(vntCharacter) == "string" && vntCharacter.match(/^\[(\d+)\]$/))
      vntCharacter = parseInt(RegExp.$1);

    return new HotKey(fctCallback || new Function(""), vntCharacter, bShift, bCtrl, bAlt, bMeta);
  };

  /**
   * @param callback {Function} a function to be called when this hot key is invoked. The return value of this function
   *   will be returned from the invoke() method.
   * @param key {String|int}
   * @param shift {boolean}
   * @param control {boolean}
   * @param alt {boolean}
   * @param meta {boolean}
   * @package
   */
  HotKey_prototype.init = function(callback, key, shift, control, alt, meta) {
    if (!(typeof(callback) == "function"))
      throw new jsx3.IllegalArgumentException("callback", callback);
    
    this._callback = callback;
    this._shift = shift == null ? null : Boolean(shift);
    this._ctrl = control == null ? null : Boolean(control);
    this._alt = alt == null ? null : Boolean(alt);
    this._meta = meta == null ? null : Boolean(meta);
    this._keycode = typeof(key) == 'number' ? key : HotKey.keyDownCharToCode(key);
    
    if (this._keycode == null)
      throw new jsx3.IllegalArgumentException("key", key);
  };
  
  /**
   * @package
   */
  HotKey_prototype.getKey = function() {
    var s = "";
    if (this._meta) s += "meta+";
    if (this._alt) s += "alt+";
    if (this._ctrl) s += "ctrl+";
    if (this._shift) s += "shift+";
    var c = HotKey.keyDownCodeToChar(this._keycode);
    s += c != null ? c : "[" + this._keycode + "]";
    return s;
  };
  
  /**
   * Returns the keycode that this hot key responds to.
   * @return {int}
   */
  HotKey_prototype.getKeyCode = function() {
    return this._keycode;
  };

  /**
   * Returns whether this hot key should be invoked for the keydown event <code>objEvent</code>.
   * @param objEvent {jsx3.gui.Event}
   * @return {boolean}
   */
  HotKey_prototype.isMatch = function(objEvent) {
    var match =  
        (                         objEvent.keyCode()  == this._keycode) && 
        (this._shift   == null || objEvent.shiftKey() == this._shift) && 
        (this._ctrl    == null || objEvent.ctrlKey()  == this._ctrl) &&
        (this._meta    == null || objEvent.metaKey()  == this._meta) &&
        (this._alt     == null || objEvent.altKey()   == this._alt);
    return match;
  };

  /**
   * Invokes this hot key by executing its callback function. This hot key also publishes a <code>WAS_INVOKED</code>
   * event through the event dispatcher interface.
   * @param objThis {Object}
   * @param arrArgs {Array<Object>}
   * @return {Object} this method returns whatever value was returned by the hot key callback function.
   */
  HotKey_prototype.invoke = function(objThis, arrArgs) {
    if (this._destroyed || !this._enabled)
      throw new jsx3.Exception(jsx3._msg("gui.hk.dest", this));
    var retVal = this._callback.apply(objThis, arrArgs);
    this.publish({subject:HotKey.WAS_INVOKED});
    return retVal;
  };

  /**
   * Returns whether this hot key is enabled.
   * @return {boolean}
   */
  HotKey_prototype.isEnabled = function() {
    return this._enabled;
  };

  /**
   * Sets whether this hot key is enabled. Hot keys may be turned off temporarily by sending <code>false</code> to 
   * this method.
   * @param bEnabled {boolean}
   */
  HotKey_prototype.setEnabled = function(bEnabled) {
    this._enabled = bEnabled;
  };
  
  /**
   * Returns whether this hot key had been destoyed.
   * @return {boolean}
   */
  HotKey_prototype.isDestroyed = function() {
    return this._destroyed;
  };

  /**
   * Destroys this hot key. Once a hot key is destroyed it cannot be invoked again. 
   */
  HotKey_prototype.destroy = function() {
    this._destroyed = true;
    delete this._callback;
  };

  /**
   * @package
   */
  HotKey_prototype.getFormatted = function() {
    var glue = null, keys = null;
    if (jsx3.app.Browser.macosx) {
//      if (HotKey.KEY_NAMES_MACOS.shift == null) {
//        // HACK: 21E7 is supposed to be shift but doesn't work in Fx ... beware if they fix this bug
//        //   also, \u0005 is not a valid XML character
//        var bStrict = jsx3.html.getMode() == jsx3.html.MODE_FF_STRICT;
//        HotKey.KEY_NAMES_MACOS.shift = "\u21EA";//[bStrict ? "\u21EA" : "\u0005", Event.KEY_SHIFT];
//      }
      glue = ""; keys = HotKey.KEY_NAMES_MACOS;
    } else {
      glue = "+"; keys = HotKey.KEY_NAMES;
    }

    var s = "";
    if (this._ctrl) s += keys.ctrl[0] + glue;
    if (this._alt) s += keys.alt[0] + glue;
    if (this._shift) s += keys.shift[0] + glue;
    if (this._meta) s += keys.meta[0] + glue;
    var c = HotKey.keyDownCodeToChar(this._keycode, true);
    s += c != null ? (c.length == 1 ? c.toUpperCase() : c) : "[" + this._keycode + "]";
    return s;
  };

  /**
   * @private
   * @jsxobf-clobber
   */
  HotKey.KEY_NAMES_MACOS = {
    meta: ["\u2318", Event.KEY_META],
    alt: ["\u2325", Event.KEY_ALT],
    ctrl: ["\u2303", Event.KEY_CONTROL],
    shift: [jsx3.CLASS_LOADER.FX && jsx3.CLASS_LOADER.getVersion() < 3 ? "\u21EA" : "\u21E7", Event.KEY_SHIFT], // NOTE: supposed to be 21E7 but Fx doesn't work
    enter: ["\u21A9", Event.KEY_ENTER], // NOTE: this is return, 2305 is enter
    esc: ["\u238B", Event.KEY_ESCAPE],
    tab: ["\u21E5", Event.KEY_TAB],
    del: ["\u2326", Event.KEY_DELETE],
    space: ["\u2423", Event.KEY_SPACE],
    backspace: ["\u232B", Event.KEY_BACKSPACE],
    up: ["\u2191", Event.KEY_ARROW_UP],
    down: ["\u2193", Event.KEY_ARROW_DOWN],
    left: ["\u2190", Event.KEY_ARROW_LEFT],
    right: ["\u2192", Event.KEY_ARROW_RIGHT],
    insert: ["Insert", Event.KEY_INSERT],
    home: ["\u2196", Event.KEY_HOME],
    end: ["\u2198", Event.KEY_END],
    pgup: ["\u21DE", Event.KEY_PAGE_UP],
    pgdn: ["\u21DF", Event.KEY_PAGE_DOWN]
  };

  /**
   * @private
   * @jsxobf-clobber
   */
  HotKey.KEY_NAMES = {
    meta: ["Meta", Event.KEY_META],
    alt: ["Alt", Event.KEY_ALT],
    ctrl: ["Ctrl", Event.KEY_CONTROL],
    shift: ["Shift", Event.KEY_SHIFT],
    enter: ["Enter", Event.KEY_ENTER],
    esc: ["Esc", Event.KEY_ESCAPE],
    tab: ["Tab", Event.KEY_TAB],
    del: ["Del", Event.KEY_DELETE],
    space: ["Space", Event.KEY_SPACE],
    backspace: ["Backspace", Event.KEY_BACKSPACE],
    up: ["Up", Event.KEY_ARROW_UP],
    down: ["Down", Event.KEY_ARROW_DOWN],
    left: ["Left", Event.KEY_ARROW_LEFT],
    right: ["Right", Event.KEY_ARROW_RIGHT],
    insert: ["Insert", Event.KEY_INSERT],
    home: ["Home", Event.KEY_HOME],
    end: ["End", Event.KEY_END],
    pgup: ["PgUp", Event.KEY_PAGE_UP],
    pgdn: ["PgDn", Event.KEY_PAGE_DOWN]
  };

  /**
   * @return {String}
   */
  HotKey_prototype.toString = function() {
    return "@HotKey key:" + this._keycode + " shift:" + this._shift + " ctrl:" + this._ctrl + " alt:" + this._alt
         + " meta:" + this._meta;
  };
  
  /**
   * {Object<int, int>} JavaScript hash of key codes for common characters
   * @private
   * @jsxobf-clobber
   */
  HotKey.MISC_KEY_CODES = {
    39: 222, // '
    44: 188, // ,
    45: 189, // -
    46: 190, // .
    47: 191, // /
    59: 186, // ;
    61: 187, // =
    91: 219, // [
    92: 220, // \
    93: 221, // ]
    96: 192  // `
  };

  /**
   * Converts the string representation of a keyboard key to an integer keycode. This keycode will match the keycode
   * value of a <code>jsx3.gui.Event</code> of type <code>keydown</code>. 
   * <p/>
   * The following string representations are supported:
   * <ul>
   *   <li>alpha numeric characters: <code>A-Z</code>, <code>a-z</code>, <code>0-9</code></li>
   *   <li>the punctuation keys in the string: <code>";,./'[]\-=`"</code></li>
   *   <li>functions keys: <code>F1-F15</code></li>
   *   <li>special keys: <code>enter</code>, <code>esc</code>, <code>tab</code>, <code>del</code>, <code>space</code>, 
   *     <code>backspace</code>, <code>up</code>, <code>down</code>, <code>left</code>, <code>right</code>, 
   *     <code>insert</code>, <code>home</code>, <code>end</code>, <code>pgup</code>, <code>pgdn</code>.</li>
   * </ul>
   *
   * @param strChar {String} the string representation of a key.
   * @return {int} the keycode.
   */
  HotKey.keyDownCharToCode = function(strChar) {
    var code = null;
    
    if (strChar.length == 1) {
      var unicode = strChar.charCodeAt(0);
  
      // A-Z
      if (unicode >= 65 && unicode <= 90)
        code = unicode;
      // a-z
      else if (unicode >= 97 && unicode <= 122)
        code = unicode - (97 - 65);
      // 0-9
      else if (unicode >= 48 && unicode <= 57)
        code = unicode;
      // ; , . / ' [ ] \ - = `
      else
        code = HotKey.MISC_KEY_CODES[unicode];
    } else if (HotKey.KEY_NAMES[strChar.toLowerCase()]) {
      code = HotKey.KEY_NAMES[strChar.toLowerCase()][1];
    } else if (strChar.match(/^[fF](\d\d?)$/)) {
      code = parseInt(RegExp.$1) + Event.KEY_F1 - 1;
    }
    
    return code;
  };
  
  /**
   * Converts an integer keycode into the string representation of the corresponding keyboard key. This method
   * is the inverse of <code>HotKey.keyDownCharToCode</code>.
   *
   * @param intCode {int} the keycode.
   * @return {String} the string representation of a key.
   *
   * @see #keyDownCharToCode()
   * @package
   */
  HotKey.keyDownCodeToChar = function(intCode, bSystem) {
    var strChar = null;
    
    // A-Z
    if (intCode >= 65 && intCode <= 90)
      strChar = String.fromCharCode(intCode + 97 - 65);
    // 0-9
    else if (intCode >= 48 && intCode <= 57)
      strChar = String.fromCharCode(intCode);
    // F1-F15
    else if (intCode >= Event.KEY_F1 && intCode <= Event.KEY_F15)
      strChar = "F" + (intCode - Event.KEY_F1 + 1);
    else {
      // ; , . / ' [ ] \ - = `
      for (var f in HotKey.MISC_KEY_CODES) {
        if (HotKey.MISC_KEY_CODES[f] == intCode) {
          strChar = String.fromCharCode(f);
          break;
        }
      }
      
      if (strChar == null) {
        // enter, esc, etc
        var keys = bSystem && jsx3.app.Browser.macosx ? HotKey.KEY_NAMES_MACOS : HotKey.KEY_NAMES;
        for (var f in keys) {
          if (keys[f][1] == intCode) {
            strChar = keys[f][0];
            break;
          }
        }
      }
    }

    return strChar;
  };
  
});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _jsxdynamic _jsxtempdynamic _doLoad
// @jsxobf-clobber  _expl _children

/**
 * Abstract superclass of model objects that are painted to screen.
 *
 * @since 3.1
 */
jsx3.Class.defineClass("jsx3.gui.Painted", jsx3.app.Model, null, function(Painted, Painted_prototype) {

  var html = jsx3.html;

  /**
   * {Object<String, boolean>} {NN: false, EE: false, SS: false, WW: false, MM: false}
   * @private
   */
  Painted.MASK_NO_EDIT = {NN: false, EE: false, SS: false, WW: false, MM: false};

  /**
   * {Object<String, boolean>} {NN: true, EE: true, SS: true, WW: true, MM: true}
   * @private
   */
  Painted.MASK_ALL_EDIT = {NN: true, EE: true, SS: true, WW: true, MM: true};

  /**
   * instance initializer
   * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
   */
  Painted_prototype.init = function(strName) {
    //call constructor for super class (the super expects the name of the object and the function that it is an instance of)
    this.jsxsuper(strName);
  };

  /**
   * Returns the absolute positioning of the object's on-screen view in relation to JSXROOT (whose left/top is 0/0).
   *            Returns information as a JavaScript object with properties, L, T, W, H
   *            of @objRoot is null, the on-screen view for JSXROOT is used as the object reference
   * @param objRoot {HTMLElement} object reference to IE DOM object (i.e., div, span, etc); if null is passed, the first div child of JSXROOT's on-screen representation will be used
   * @param objGUI {HTMLElement} object reference to item to get absolute position for&#8212;as opposed to this instance (useful for determining placement of html objects contained by JSX objects, but not part of the actual JSX DOM)
   * @return {Object<String, int>} JScript object with properties: L, T, W, H (corresponding to left, top width, height)
   */
  Painted_prototype.getAbsolutePosition = function(objRoot, objGUI) {
    //make sure object has an on-screen view
    if (objGUI == null) objGUI = this.getRendered(objRoot);
    if (objGUI == null) return {L:0, T:0, W:0, H:0};
    if (objRoot == null) objRoot = this.getAncestorRootBlock().getRendered(objGUI);

    return html.getRelativePosition(objRoot, objGUI);
  };

  /**
   * Sets a property on the object that when the object is rendered on-screen, the HTML tag will be assigned the given name/value pair as a tag attribute
   * @param strName {String} the name of the property/attribute
   * @param strValue {String} the value for the property; may not contain double-quotes; escape via jsx3.util.strEscapeHTML if necessary or use combinations of single-quotes and escaped single-quotes
   * @return {jsx3.gui.Painted} this object (this)
   */
  Painted_prototype.setAttribute = function(strName, strValue) {
    //add the new event object to the events array for the object
    this.getAttributes()[strName] = strValue;

    //return reference to self to facilitate chaining
    return this;
  };

  /**
   * Returns the value for the custom attribute with the given name.
   * @param strName {String} the name of the attribute.
   * @return {String} the value of the attribute or <code>undefined</code> if no such attribute exists.
   */
  Painted_prototype.getAttribute = function(strName) {
    //return the entire array of events bound to this object instance
    return this.getAttributes()[strName];
  };

  /**
   * Returns handle to the JavaScript Object Array containing all events for the JSX GUI object;
   *            NOTE: This object will contain zero or more JavaScript Objects with the following Properties: script, type, system
   * @return {Object<String, String>}
   */
  Painted_prototype.getAttributes = function() {
    //return the entire array of events bound to this object instance
    if (this.jsxcustom == null) this.jsxcustom = {};
    return this.jsxcustom;
  };

  /**
   * Renders a concatenated string of all custom attribute names and values. Useful during paint(). The string starts
   * with a space.
   * @param objExclude {Array<String>|Object} array or map of all attributes (i.e., id, class, etc)
   *    that should not be rendered
   * @param bSkipEvents {boolean} if true will not render any attributes that are native event handlers. These
   *    attributes should be printed with Interactive.renderHandlers.
   * @return {String} e.g., <code>' class="fred" owner="jimbo"'</code>
   * @private
   */
  Painted_prototype.renderAttributes = function(objExclude, bSkipEvents) {
    //declare object if it doesn't exists
    var str = [];
    if (this.jsxcustom != null) {
      var Interactive = jsx3.gui.Interactive;
      var bInter = Interactive && this.instanceOf(Interactive);
      // loop to string together the properties
      for (var p in this.jsxcustom) {
        var bSkip =
            (objExclude != null &&
              ((jsx3.$A.is(objExclude) && jsx3.util.arrIndexOf(objExclude, p) >= 0) || (objExclude[p]))) ||
            (bSkipEvents && bInter && Interactive.isBridgeEventHandler(p));

        var attrValue = this.jsxcustom[p];
        if (!bSkip && attrValue != null)
          str[str.length] = ' ' + p + '="' + attrValue.replace(/"/g, "&quot;") + '"';
      }
    }
    return str.join("");
  };

  /**
   * removes the specific custom property bound to this object; returns a reference to self (this) to facilitate method chaining
   * @param strName {String} the name of the custom property to remove
   * @return {jsx3.gui.Painted} this object
   */
  Painted_prototype.removeAttribute = function(strName) {
    delete this.getAttributes()[strName];
    return this;
  };

  /**
   * removes all events bound to this object; NOTE: The object must still be painted/repainted for its corresponding on-screen view to be likewise updated; returns a reference to self (this) to facilitate method chaining
   * @return {jsx3.gui.Painted} this object
   */
  Painted_prototype.removeAttributes = function() {
    //reset the events array, so this object doesn't have any
    delete this.jsxcustom;

    //return reference to self
    return this;
  };

  /**
   * gives focus to the on-screen VIEW for the element; returns a handle to the html/dhtml element as exposed by the native browser
   * @return {HTMLElement}
   */
  Painted_prototype.focus = function() {
    //give focus to persistent on-screen anchor
    var objGUI = this.getRendered();
    // Mozilla (not Fx) seems to define focus() only on elements with a tabindex?
    if (objGUI) html.focus(objGUI);
    return objGUI;
  };

  /**
   * Returns resizeMask property as an object array, defining what actions are available
   *            to the resizeMask for the given control (resize horizontally/vertically; is moveable, etc.)
   * @return {Object<String, int>} object array with boolean values for the following properties: NN,SS,EE,WW,MM
   * @package
   */
  Painted_prototype.getMaskProperties = function() {
    return Painted.MASK_NO_EDIT;
  };

  /**
   * Returns handle/reference to the JSX GUI Object's on-screen counterpart&#8212;basically a handle to a DHTML object such as a DIV, SPAN, etc
   * @param objGUI {Object|jsx3.gui.Event} either the HTML document containing the rendered object or an HTML element in that document.
   *   This argument is optional but improves the efficiency of this method if provided.
   * @return {HTMLElement} IE DHTML object
   */
  Painted_prototype.getRendered = function(objGUI) {
    var doc = null;
    if (objGUI && objGUI instanceof jsx3.gui.Event) {
        if (objGUI.srcElement())
          doc = objGUI.srcElement().ownerDocument;
    } else if (objGUI && typeof(objGUI) == "object") {
      // NOTE: try ownerDocument first because SVGElement implements getElementById but throws an error
      doc = objGUI.ownerDocument || (objGUI.getElementById ? objGUI : null);
    }
    if (doc == null) doc = this.getDocument();
    return doc != null ? doc.getElementById(this.getId()) : null;
  };

  /**
   * @package
   */
  Painted_prototype.containsHtmlElement = function(objElement) {
    var r = this.getRendered(objElement);
    if (r) {
      while (objElement != null) {
        if (r == objElement)
          return true;
        objElement = objElement.parentNode;
      }
    }
    return false;
  };

  /**
   * @package
   */
  Painted_prototype.getDocument = function() {
    // most efficient way of getting document
    var parent = this;
    while (parent != null) {
      if (jsx3.gui.Window && parent instanceof jsx3.gui.Window)
        return parent.getDocument();
      else if (parent._jsxserver != null)
        return parent._jsxserver.getRootDocument();

      parent = parent.getParent();
    }
    return null;
  };

  /** @private @jsxobf-clobber */
  Painted_prototype.getAncestorRootBlock = function() {
    var parent = this;
    while (parent != null) {
      if (jsx3.gui.Window && parent instanceof jsx3.gui.Window)
        return parent.getRootBlock();
      else if (parent._jsxserver != null)
        return parent._jsxserver.getRootBlock();

      parent = parent.getParent();
    }
    return null;
  };

  /** @private @jsxobf-clobber */
  Painted.RECALC_TOID = null;


  /**
   * Updates the view of this object by calling <code>paint()</code> and replacing the current view with the
   * returned HTML. This method has no effect if this object is not currently displayed.
   * @return {String} the result of calling <code>paint()</code> or <code>null</code> if this object is not displayed.
   * @see #paint()
   */
  Painted_prototype.repaint = function() {

    var objGUI = this.getRendered();

    if (this.isDomPaint()) {
      if (objGUI != null) {
        var prevSib = objGUI.previousSibling;
        var newGUI = this.paintDom();
        // paintDom may return a new DOM element, in which case replace the old one
        if (newGUI != objGUI)
          objGUI.parentNode.replaceChild(newGUI, objGUI);
        // paintDom may return the same DOM element but have removed it from the DOM, insert it again
        else if (newGUI.parentNode == null)
          prevSib.parentNode.insertBefore(newGUI, prevSib);
        // paintDom may return the same DOM element still attached to the DOM
      }

      return null;
    } else {
      var strHTML = null;

      if (objGUI != null) {

        strHTML = this.paint();
        // replace its outer HTML
        html.setOuterHTML(objGUI, strHTML);
        Painted._onAfterPaintCascade(this, objGUI);

      }

      //return the string to the calling function just in case it needs it
      return strHTML;
    }
  };

  /**
   * Returns the DHTML, used for this object's on-screen VIEW
   * @return {String} DHTML
   */
  Painted_prototype.paint = jsx3.Method.newAbstract();

  /**
   * A hook that subclasses of Painted may override in order to perform additional manipulation of the HTML DOM
   * created by the paint method. The order of steps follows. All steps occur in a single browser thread so that
   * the screen does not update between steps 2 and 3.
   * <ol>
   *   <li>The paint() method of this object is called.</li>
   *   <li>The result of the paint() method is inserted into the HTML DOM.</li>
   *   <li>The onAfterPaint() method of this object is called, passing in the newly inserted root HTML element.</li>
   * </ol>
   * <p/>
   *
   * @param objGUI {HTMLElement} the rendered HTML element representing this object.
   * @since 3.4
   * @protected
   */
  Painted_prototype.onAfterPaint = function(objGUI) {
  };

  /** @private @jsxobf-clobber-shared */
  Painted._onAfterPaintCascade = function(objRoot, objGUI) {
    var queue = [objRoot];
    while (queue.length > 0) {
      var node = queue.shift();
      if (node.onAfterPaint != Painted_prototype.onAfterPaint) {
        var objElm = node.getRendered(objGUI);
        if (objElm) node.onAfterPaint(objElm);
      }
      var arrChildren = node.getDescendantsOfType(Painted, true);
      if (arrChildren.length > 0)
        queue.unshift.apply(queue, arrChildren);
    }
  };

  /**
   * Subclass if restoring of the CSS display of the object necessitates any cleanup of the view. For example, restoring a Matrix
   * that was painted while it (or an ancestor) had a CSS display setting of 'none' results in the content height
   * being mistaken as 0 (null).
   *
   * @param objGUI {HTMLElement} the rendered HTML element representing this object.
   * @since 3.5
   * @protected
   */
  Painted_prototype.onAfterRestoreView = function(objGUI) {
  };

  /** @package */
  Painted._onAfterRestoreViewCascade = function(objRoot, objGUI) {
    var queue = [objRoot];
    while (queue.length > 0) {
      var node = queue.shift();
      if (node.onAfterRestoreView != Painted_prototype.onAfterRestoreView) {
        var objElm = node.getRendered(objGUI);
        if (objElm) node.onAfterRestoreView(objElm);
      }
      var arrChildren = node.getDescendantsOfType(Painted, true);
      if (arrChildren.length > 0)
        queue.unshift.apply(queue, arrChildren);
    }
  };

  /**
   * Subclasses of this class may return <code>true</code> from this method if the paint via DOM access.
   * If this method returns <code>true</code>, <code>paint()</code> will never be called; instead,
   * <code>paintDom()</code> will be called and must be implemented.
   * @return {boolean} <code>false</code>.
   * @see #paintDom()
   * @see #paint()
   * @package
   */
  Painted_prototype.isDomPaint = function() {
    return false;
  };

  /**
   * If <code>isDomPaint()</code> returns <code>true</code> for this instance, this method is called instead
   * of <code>paint()</code>. This method should construct an return a native browser DOM node.
   * @return {Object|HTMLElement}
   * @see #isDomPaint()
   * @see #paint()
   * @throws {jsx3.Exception} always. DOM-painted subclasses must implement this method.
   * @package
   */
  Painted_prototype.paintDom = function() {
    throw new jsx3.Exception();
  };

  /** @private @jsxobf-clobber */
  Painted_prototype.paintDomHolder = function() {
    return '<span id="' + this.getId() + '" style="display:none;" jsxdomholder="1"></span>';
  };

  /** @private @jsxobf-clobber */
  Painted.DOM_PAINT_QUEUE = [];

  /**
   * Adds <code>objJSX</code> to a queue of DOM-painted objects that are waiting to be painted. When an object
   * paints via serialization, it may include a DOM-painted child by including the HTML returned by calling
   * <code>paintDomHolder()</code> on the child and then adding the child to the paint queue.
   * @param objJSX {jsx3.gui.Painted}
   * @private
   * @jsxobf-clobber
   */
  Painted.addToDomPaintQueue = function(objJSX) {
    Painted.DOM_PAINT_QUEUE.push(objJSX);
    jsx3.sleep(Painted.onAfterPaintTimeout, "jsx3.gui.Painted.domPaint");
  };

  /** @private @jsxobf-clobber */
  Painted.onAfterPaintTimeout = function() {
    for (var i = 0; i < Painted.DOM_PAINT_QUEUE.length; i++) {
      var objJSX = Painted.DOM_PAINT_QUEUE[i];
      var container = objJSX.getRendered();
      if (container != null) {
        var dom = objJSX.paintDom();
        container.parentNode.replaceChild(dom, container);
      }
    }
    Painted.DOM_PAINT_QUEUE.splice(0, Painted.DOM_PAINT_QUEUE.length);
  };

  /**
   * Paints a child of this object without repainting this entire object. The child is inserted into the view of
   * this object as the last child object, regardless of its actual position relative to other children. This method
   * has no effect if this object is not currently painted.
   *
   * @param objChild {jsx3.gui.Painted} the child object to paint.
   * @param bGroup {boolean} <code>true</code> if this method is being called iteratively over a collection of
   *   children. This parameter will only be <code>false</code> on the final call in the iteration.
   * @param-package objGUI {HTMLElement}
   * @param-package bCascadeOnly {boolean}
   */
  Painted_prototype.paintChild = function(objChild, bGroup, objGUI, bCascadeOnly) {
    //allows runtime insert of html without requiring all other child objects to be repainted
    if (objGUI == null) objGUI = this.getRendered();
    if (objGUI != null && objChild instanceof Painted) {
      if (!bCascadeOnly) {
        if (objChild.isDomPaint()) {
          objGUI.appendChild(objChild.paintDom());
        } else {

          html.insertAdjacentHTML(objGUI, "beforeEnd", objChild.paint());

        }
      }

      Painted._onAfterPaintCascade(objChild, objGUI);
    }
  };

  /** @package @jsxobf-clobber-shared */
  Painted_prototype.viewUpdateHook = function(objChild, bGroup) {
    this.paintChild(objChild, bGroup);
  };


  /**
   * Paints a child of this object without repainting this entire object. The child is inserted into the view of
   * this object as the last child object, regardless of its actual position relative to other children. This method
   * has no effect if this object is not currently painted.
   *
   * @param objChild {jsx3.gui.Painted} the child object to paint.
   * @return {jsx3.gui.Painted} this object.
   * @deprecated  Replaced with <code>paintChild()</code>.
   * @see #paintChild()
   */
  Painted_prototype.insertHTML = function(objChild) {
    this.paintChild(objChild);
    return this;
  };


  //BOX MODEL SUPPORT FOR FIREFOX PORT **************************************************

  /**
   * Iterates through children and returns concatenation of paint() method for all children.
   * @param c {Array<jsx3.gui.Painted>} the children to paint. If not provided <code>this.getChildren()</code> is used.
   * @return {String} DHTML
   */
  Painted_prototype.paintChildren = function(c) {
    if (c == null) c = this.getChildren();
    var a = new Array(c.length);
    for (var i = 0; i < c.length; i++) {
      var child = c[i];
      if (!(child instanceof Painted)) continue;

      if (child.isDomPaint()) {
        a[i] = child.paintDomHolder();
        Painted.addToDomPaintQueue(child);
      } else {
        var intLoadType = child.getLoadType();
        if (intLoadType == jsx3.app.Model.LT_SLEEP_PAINT ||
            intLoadType == jsx3.app.Model.LT_SLEEP_DESER ||
            intLoadType == jsx3.app.Model.LT_SLEEP_PD) {
          a[i] = child.paintDomHolder();
          jsx3.sleep(jsx3.makeCallback("repaint", child), "jsx3.gui.Painted.repaint" + child.getId());
        } else if ((intLoadType == jsx3.app.Model.LT_SHOW_DESER ||
                    intLoadType == jsx3.app.Model.LT_SHOW_PAINT) && !child._getShowState()) {
          a[i] = child.paintDomHolder();
        } else {
          a[i] = child.paint();
        }
      }
    }
    return a.join("");
  };

  /**
   * Similar to <code>paintChildren</code>, but the target is the object, itself, NOT the children of the object
   * @return {String} HTML
   * @package
   */
  Painted_prototype._conditionalPaint = function() {
    var a;
    if (this.isDomPaint()) {
      a = this.paintDomHolder();
      Painted.addToDomPaintQueue(this);
    } else {
      var intLoadType = this.getLoadType();
      if (intLoadType == jsx3.app.Model.LT_SLEEP_PAINT ||
          intLoadType == jsx3.app.Model.LT_SLEEP_DESER ||
          intLoadType == jsx3.app.Model.LT_SLEEP_PD) {
        a = this.paintDomHolder();
        jsx3.sleep(jsx3.makeCallback("repaint", this), "jsx3.gui.Painted.repaint" + this.getId());
      } else if ((intLoadType == jsx3.app.Model.LT_SHOW_DESER ||
                  intLoadType == jsx3.app.Model.LT_SHOW_PAINT) && !this._getShowState()) {
        a = this.paintDomHolder();
      } else {
        a = this.paint();
      }
    }
    return a;
  };

  /**
   * Gets the box model/profile for the object;
   * @param bCreate {boolean} false if null. if true, a profile is created if none exists yet
   * @return {jsx3.gui.Painted.Box}
   * @package
   */
  Painted_prototype.getBoxProfile = function(bCreate, objDimension) {
    if (this._jsxboxprofiledirty) this.clearBoxProfile();

    if (this._jsxboxprofile == null && bCreate)
      /* @jsxobf-clobber */
      this._jsxboxprofile = this.createBoxProfile(objDimension);
    return this._jsxboxprofile;
  };

  /**
   * Sets the box model/profile for the object;
   * @param boxProfile {jsx3.gui.Painted.Box}
   * @package
   */
  Painted_prototype.setBoxProfile = function(boxProfile) {
    this._jsxboxprofile = boxProfile;
  };

  /**
   * @package
   */
  Painted_prototype.setBoxDirty = function() {
    /* @jsxobf-clobber */
    this._jsxboxprofiledirty = true;
  };

  /**
   * Deletes the existing boxprofile for the object; typically called by recalc.
   * @param bRecurse {Boolean} if true, the profile for all descendants is also deleted. Typically, a left/top adjustment would pass false for this param, while all other adjustments that affect descendant structures would pass true.
   * @package
   */
  Painted_prototype.clearBoxProfile = function(bRecurse) {
    var q = [this];
    while (q.length > 0) {
      var n = q.shift();
      
      delete n._jsxboxprofiledirty;
      delete n._jsxcachedclientdims;

      if (n._jsxboxprofile) {
        delete n._jsxboxprofile;
        if (bRecurse) {
          var c = n.getChildren();
          if (c.length > 0) q.push.apply(q, c);
        }
      }
    }
  };

  /**
   * applies a string of CSS style properties to a DOM element
   * @param objDOM {HTMLElement} native browser DOM element (a TR/TD)
   * @param strValue {String} string of CSS. For example,  left:10px;height:20px;width:100px;
   * @param csstype {String} one of: padding, margin, border. If strValue is empty, this value is used to resolve the css property to reset to null
   * @private
   */
  Painted.convertStyleToStyles = function(objDOM,strValue,csstype) {
    if (strValue) {
      //apply the style(s)
      var objStyles = jsx3.util.strTrim(strValue).split(/\s*;\s*/g);
      for (var i = 0; i < objStyles.length; i++) {
        var curStyle = objStyles[i];
        if (curStyle == "") continue;
        var objStyle = curStyle.split(/\s*:\s*/);
        if (objStyle && objStyle.length == 2) {
          var strStyleName = objStyle[0].replace(/(-\S)/gi,function($0,$1){ return $1.substring(1).toUpperCase(); });
          objDOM.style[strStyleName] = objStyle[1];
        }
      }
    } else if (csstype) {
      //remove the styles
      var a = ["Top","Right","Bottom","Left"];
      for (var i=0;i<4;i++) {
        var strStyleName = csstype + a[i];
        objDOM.style[strStyleName] = "";
      }
    }
  };

  /**
   * Removes the box model abstraction for a given object and its descendants. This effectively resets the box profiler, so dimensions can be recalculated as if the object was just broought into the visual DOM.
   * @param properties {Array} Will designate by name, those properties that should be updated on the object's VIEW (without requiring the MODEL to repaint), including one or more of the following: padding, margin, border
   */
  Painted_prototype.recalcBox = function(properties) {
    //remove the profiles
    this.findDescendants(function(objJSX) {
      objJSX.clearBoxProfile(false);
    },true,true,false,true);

    // call update box profile
    this.syncBoxProfileSync((this.getParent())?this.getParent().getClientDimensions(this):null, this.getRendered());

    //if any properties were passed
    if (properties) {
      var objGUI = this.getRendered();
      if (objGUI != null) {
        var objP = this.getBoxProfile(true);
        for (var i = 0; i < properties.length; i++) {
          if (properties[i] == "padding") {
            Painted.convertStyleToStyles(objGUI, objP.paintPadding(), "padding");
          } else if (properties[i] == "margin") {
            Painted.convertStyleToStyles(objGUI, objP.paintMargin(), "margin");
          } else if (properties[i] == "border") {
            Painted.convertStyleToStyles(objGUI, objP.paintBorder(), "border");
          }
        }
      }
    }
  };

  /**
   * gets the size of the canvas for a given child (the true drawspace)
   * @return {object} implicit map with named properties: parentwidth, parentheight
   * @package
   */
  Painted_prototype.getClientDimensions = function() {
    var contentProfile = this._jsxboxprofile;
    return contentProfile != null ?
            {parentwidth:contentProfile.getClientWidth(),parentheight:contentProfile.getClientHeight()} :
            {};
  };

  /** @package */
  Painted_prototype.getCachedClientDimensions = function(intIndex) {
    var dims = this._jsxcachedclientdims ? this._jsxcachedclientdims[intIndex] : null;
//    if (dims) jsx3.log("Cache hit! " + this.getClass());
    return dims;
  };

  /** @package */
  Painted_prototype.setCachedClientDimensions = function(intIndex, objDim) {
    if (! this._jsxcachedclientdims)
      /* @jsxobf-clobber */
      this._jsxcachedclientdims = [];
    this._jsxcachedclientdims[intIndex] = objDim;
    return objDim;
  };

  /** @package */
  Painted_prototype.flushCachedClientDimensions = function(strId) {
    //no-op -- used by new template engine;
  };

  /**
   * Creates the box model/profile for the object. Expects two parameters: the parentwidth and the parentheight
   * @param objDimension {object} Map containing named properties: L, T, W, H.  If not passed, the object will query its parent (can happen if paint is called on an object whose parent hasn't painted yet)
   * @return {jsx3.gui.Painted.Box} If provided, the profile instance that will contain this profile instance. By providing the parent profile, the true height/width can be ascertained when the child is a percent/factor-of the parent
   * @package
   */
  Painted_prototype.createBoxProfile = function(objDimension) {
    return new Painted.Box({});
  };

  /**
   * Updates the box model for the object.
   * @param objImplicit {object} implicit map comprised of one or more of the following: left, top, width, height, boxtype, tagname, parentheight, parentwidth
   * @param objGUI {object} native browser element representing the VIEW for the dialog instance
   * @package
   */
  Painted_prototype.updateBoxProfile = function(objImplicit, objGUI, objQueue) {
    this.updateBoxProfileImpl(objImplicit, objGUI, objQueue, 1);
  };

  /**
   * @package
   */
  Painted_prototype.updateBoxProfileImpl = function(objImplicit, objGUI, objQueue, intType) {
    if (intType == 1) {
      this.setBoxDirty();
      if (objGUI != null) objQueue.addRepaint(this);
    } else if (intType == 2 || intType == 4) {
      var b1 = this.getBoxProfile(true, objImplicit);
      var recalcRst = b1.recalculate(objImplicit, objGUI, objQueue);
      if (recalcRst.w || recalcRst.h) {
        if (!Painted._RESIZE_EVENT && jsx3.gui.Interactive)
          Painted._RESIZE_EVENT = {subject:jsx3.gui.Interactive.AFTER_RESIZE_VIEW};
        if (Painted._RESIZE_EVENT) this.publish(Painted._RESIZE_EVENT);

        var c = this.getChildren();
        // Block puts arbitrary HTML before the children so we need to count backwards from the last childNode
        var nodeOffset = intType == 4 && objGUI ? Math.max(0, objGUI.childNodes.length - c.length) : 0;

        for (var i = c.length - 1; i >= 0; i--) {
          var child = c[i];
          //3.6 DM update: need to call the getter, not the property
          var box = child.getBoxProfile(false);//_jsxboxprofile;
          if (box && box._isParentIndependent()) continue;

          var index = i + nodeOffset;
          var gui = objGUI ? (objGUI.childNodes[index] ? objGUI.childNodes[index] : true) : null;
          objQueue.add(child, {parentwidth:b1.getClientWidth(), parentheight:b1.getClientHeight()}, gui, true);
        }
      } else {
//        jsx3.log("Escaped updating children: " + this.getChildren());
      }
    } else if (intType == 3) {
      var b1 = this.getBoxProfile(true, objImplicit);

      if (objGUI)
        b1.recalculate(objImplicit, objGUI, objQueue);
    }
  };

  /**
   * @package
   */
  Painted_prototype.syncBoxProfile = function(objImplicit, objGUI) {

    var queue = new Painted.Queue();
    queue.add(this, objImplicit, objGUI);


    queue.start();
  };

  /** @private @jsxobf-clobber */
  Painted._SYNCQ = {};
  Painted._SYNCQ.add = function(a, b, c) {

    a._updateBoxFromQueue(this, b, c);

  };
  Painted._SYNCQ.addRepaint = function(a) {
    a.repaint();
  };

  /**
   * @package
   */
  Painted_prototype.syncBoxProfileSync = function(objImplicit, objGUI) {
    Painted._SYNCQ.add(this, objImplicit, objGUI);
  };


  /** @private @jsxobf-clobber */
  Painted_prototype._updateBoxFromQueue = function(objQueue, objImplicit, objGUI) {

    // TODO: only update relevant properties, like width, height, etc.
    this.applyDynamicProperties();

    delete this._jsxcachedclientdims;
    this.updateBoxProfile(objImplicit, objGUI, objQueue);
  };

  /** @package */
  Painted_prototype._getShowState = function() {
    return this._jsxshowstate;
  };

  /** @package */
  Painted_prototype._setShowState = function(bShow) {
    if (this._jsxshowstate != bShow) {
      this._jsxshowstate = bShow;
      if (bShow) {
        var objGUI = this.getRendered();
        //3.6: added the following to repaint the domholder object if it is in fact the domholder (don't just check content existence)
        if (objGUI && (!objGUI.firstChild || objGUI.getAttribute("jsxdomholder") == "1"))
          this.repaint();
      }
    }
  };

  Painted_prototype.destroyView = function(objParent) {
    var s = objParent.getServer();
    if (s) {
      var objGUI = objParent.getServer().getRenderedOf(this);
      if (objGUI)
        jsx3.html.removeNode(objGUI);
    }
  };

});

/** @package */
jsx3.Class.defineClass("jsx3.gui.Painted.Queue", jsx3.lang.Object, [jsx3.util.EventDispatcher], function(Queue, Queue_prototype) {

  /** @private @jsxobf-clobber */
  Queue.CHUNK_MAX = 250;

  /** @private @jsxobf-clobber */
  Queue._SERIAL = 0;
  /** @private @jsxobf-clobber */
  Queue._ACTIVE = new jsx3.util.List();
  /** @private @jsxobf-clobber */
  Queue._CHUNK = true;
  /** @private @jsxobf-clobber */
  Queue._LOCK = false;

  /**
   * @package
   */
  Queue.enableChunking = function(bEnable) {
    Queue._CHUNK = bEnable;
  };

  /** @private @jsxobf-clobber */
  Queue._start = function() {
    Queue.doChunk();
  };

  Queue.doChunk = function() {
    if (Queue._CHUNK) {
      if (Queue._LOCK) return;
      Queue._LOCK = true;

//      if (Queue._TS == null) Queue._TS = new Date().getTime();

      var tdone = new Date().getTime() + Queue.CHUNK_MAX;
      var t2 = new Date().getTime();

      var q = Queue._ACTIVE.removeAt(0);

      while (q != null && t2 < tdone) {
        if (q._queue.length > 0) {
          var entry = q._queue.shift();
          if (jsx3.$A.is(entry))
            entry[0]._updateBoxFromQueue(q, entry[1], entry[2]);
          else
            entry.repaint();
          t2 = new Date().getTime();
        } else {
          q.destroy();
          q = Queue._ACTIVE.removeAt(0);
        }
      }

      if (q != null) {
        Queue._ACTIVE.add(q, 0);
        jsx3.sleep(Queue.doChunk, "jsx3.gui.Painted.queue");
      }

      Queue._LOCK = false;
    } else {
      while (Queue._ACTIVE.size() > 0) {
        var q = Queue._ACTIVE.removeAt(0);
        while (q._queue.length > 0) {
          var entry = q._queue.shift();
          if (jsx3.$A.is(entry))
            entry[0]._updateBoxFromQueue(q, entry[1], entry[2]);
          else
            entry.repaint();
        }
      }
    }
  };

  Queue_prototype.init = function() {
    /* @jsxobf-clobber */
    this._serial = ++Queue._SERIAL;
    /* @jsxobf-clobber */
    this._queue = [];
    Queue._ACTIVE.add(this);
  };

  Queue_prototype.add = function(objJSX, objImplicit, objGUI, bStack) {
    // TODO: benchmark push/unshift
    if (objGUI === true) objGUI = objJSX.getRendered();
    this._queue[bStack ? "unshift" : "push"]([objJSX, objImplicit, objGUI]);
  };

  Queue_prototype.addRepaint = function(objJSX, bStack) {
    this._queue[bStack ? "unshift" : "push"](objJSX);
  };

  Queue_prototype.start = function() {
    Queue._start();
  };

  Queue_prototype.destroy = function() {
    this.publish({subject:"done"});
    delete this._queue;
    Queue._ACTIVE.remove(this);
  };

  Queue_prototype.toString = function() {
    return "{Painted.Queue " + this._serial + " " + (this._queue != null ? this._queue.length : "-") + "}";
  };

});

/**
 * Provides an abstraction layer for the native browser Box model. Instances of this class represent an abstract view of the boxes used by a GUI object to render the native VIEW.
 *
 * @since 3.2
 * @package
 */
jsx3.Class.defineClass("jsx3.gui.Painted.Box", jsx3.lang.Object, null, function(Box, Box_prototype) {

  var html = jsx3.html;
  
  //used to convert/parse a CSS string defining border, padding, and margin to a four-element array
  /** @private @jsxobf-clobber */
  Box.REGEX =  /[^\d-]*([-]*[\d]*)[^\d-]*([-]*[\d]*)[^\d-]*([-]*[\d]*)[^\d-]*([-]*[\d]*)/;
  /** @private @jsxobf-clobber */
  Box.BREGEX = /\b(\d*)px/g;
  //list of all properties on the implicit object that will be converted to an explicit equivalent
  /** @private @jsxobf-clobber */
  Box._PROPERTIES = ['boxtype','tagname','margin','padding','border','left','top','width','height','empty','container'];
  /** @private @jsxobf-clobber */
  Box._RECALC_FIELDS = ['boxtype','left','top','width','height'];
  /** @private @jsxobf-clobber */
  Box._PROPS_SETTER = {width: "_addPropWidth", height: "_addPropHeight", top: "_addPropTop", left: "_addPropLeft",
      padding: "_addPropPadding", border: "_addPropBorder", margin: "_addPropMargin", tagname: "_addPropTagname"};

  //order (clockwise) of css position (border-left, padding-left, margin-left, *-left, etc)
  /** @private @jsxobf-clobber */
  Box.COMPASS = ["top","right","bottom","left"];
  /** @private @jsxobf-clobber */
  Box.SCROLL_SIZE = null;

  //standards-compliant browsers do not like to give structure (l,t,w,h) to relative boxes (spans, etc); this fixes to allow for GIs layout system

/* @JSC */ if (jsx3.CLASS_LOADER.SAF) {
  /** @private @jsxobf-clobber */
  Box._CSS_FIXES = ["", "display:inline-block;", "", "display:inline-block;"];
/* @JSC */ } else if (jsx3.CLASS_LOADER.IE) {
    if (html.getMode() == html.MODE_FF_QUIRKS) // IE10 quirks (not IE10 in IE5 quirks) simulates Firefox quirks
    /** @private @jsxobf-clobber */
      Box._CSS_FIXES = ["", "display:inline-block;", "display:inline-block;", ""];
    else
    /** @private @jsxobf-clobber */
      Box._CSS_FIXES = ["", "", "display:inline-block;", ""];
/* @JSC */ } else {
  if (jsx3.CLASS_LOADER.FX && jsx3.CLASS_LOADER.getVersion() >= 3)
    /** @private @jsxobf-clobber */
    Box._CSS_FIXES = ["", "display:inline-block;", "", "display:inline-block;"];
  else
    Box._CSS_FIXES = ["", "display:-moz-inline-box;", "", "display:-moz-inline-box;"];
/* @JSC */ }

  // These static strings improve performance on IE6. The obfuscator currently would make these string literals static
  // anyway. However, leaving them here improves painting performance in the uncompiled build.
  /** @private @jsxobf-clobber */
  Box._str = {pad:"padding", mar:"margin", e:"", box:"box", zpx:"0px", str:"string", num:"number", obj:"object",
      pct:"%", semi:";", px:"px", pxs:"px;", pxc:"px ", c:":", rbox:"relativebox", bor:"border"};
  /** @private @jsxobf-clobber */
  Box._stm = {hph:{height:1, parentheight:1}, wpw:{width:1, parentwidth:1}};
  /** @private @jsxobf-clobber */
  Box._pa = ['<', ' ', 'width:', 'height:', '"/>', '">', 'left:0px', 'left:', 'top:0px', 'top:', 'position:absolute;',
      ' style="', 'position:relative;', '</', '>', ''];

  /** @package */
  Box.getCssFix = function() {
    return Box._CSS_FIXES[html.getMode()];
  };

  /* @jsxobf-clobber */
  Box_prototype._lastbordervalue = "";
  /* @jsxobf-clobber */
  Box_prototype._lastmarginvalue = "";
  /* @jsxobf-clobber */
  Box_prototype._lastpaddingvalue = "";
  /* @jsxobf-clobber */
  Box_prototype._new = true;

  Box_prototype.styles = "";
  Box_prototype.attributes = "";

  /**
   * instance initializer
   * @param profile {Object} Implicit map that will be used to create the true profile object. Relevant properties include:
   * <ul>
   * <li><b>boxtype</b>: box, relativebox, or inline (native)</li>
   * <li><b>tagname</b>: div, span, input[text], input[password], textarea, etc</li>
   * <li><b>parentwidth</b>: true drawspace that this object must live within.</li>
   * <li><b>parentheight</b>: true drawspace that this object must live within.</li>
   * <li><b>left</b>: Pixel or percentage</li>
   * <li><b>top</b>: Pixel or percentage</li>
   * <li><b>width</b>: pixel or percentage</li>
   * <li><b>height</b>: pixel or percentage</li>
   * <li><b>border</b>: To use, this value must provide four compass positions in clockwise order (top, right, bottom, left)</li>
   * <li><b>padding</b>: To use, this value must provide four compass positions in clockwise order (top, right, bottom, left)</li>
   * <li><b>margin</b>: To use, this value applies to inline, rightfloatbox and leftfloatbox. must provide four compass positions in clockwise order (top, right, bottom, left)</li>
   * <li><b>empty</b>: Boolean, if true, the generated tag will be empty. For example, &lt;br/&gt; instead of &lt;br&gt;&lt;/br&gt;</li>
   * <li><b>container</b>: Boolean, if true, the object is a 100%x100% HTML element (preferably a div), used to contain other objects, but not used for textual display.</li>
   * </ul>
   */
  Box_prototype.init = function(profile) {
    this.implicit = profile || {};
    this.calculate();
  };

  Box_prototype.reset = function() {
    this._new = true;
  };
  
  /**
   * Renders the box as an HTML box appropriate to the native browser environment and returns the DHTML
   * @return {Array} 2-item array with the beginning/ending tags, representing the literal HTML element to send to the Browser for rendering
   */
  Box_prototype.paint = function() {
    this._new = false;
    //declare array to hold return structure (a start tag and an end tag)
    var a = new Array(2);

    //create the common prefix
    var commonPrefix = Box._pa[0] + this._expl.tagname + Box._pa[1] + this.attributes;

    //only output width/height if explicitly set; don't allow for negative values as they imply a null dimension, causing liquid constraints to break
    var myWidth = this.getPaintedWidth();
    myWidth = myWidth != null ? Box._pa[2] + Math.max(0, myWidth) + Box._str.pxs : Box._str.e;
    var myHeight = this.getPaintedHeight();
    myHeight = myHeight != null ? Box._pa[3] + Math.max(0, myHeight) + Box._str.pxs : Box._str.e;

    var endTag = (this._expl.empty) ? Box._pa[4] : Box._pa[5];

    if (this._expl.boxtype == Box._str.box) {
      var myLeft = this._expl.left;
      myLeft = myLeft == null ? Box._pa[6] : Box._pa[7] + myLeft + Box._str.pxs;
      var myTop = this._expl.top;
      myTop = myTop == null ? Box._pa[8] : Box._pa[9] + myTop + Box._str.pxs;
      var position = this.implicit.omitpos ? Box._str.e : Box._pa[10];

      a[0] = commonPrefix + Box._pa[11] + position + myWidth + myHeight + myLeft + myTop + this.paintPadding() +
          this.paintMargin() + this.paintBorder() + this.styles + endTag;
    } else if (this._expl.boxtype == Box._str.rbox) {
      var position = this.implicit.omitpos ? Box._str.e : Box._pa[12];
      a[0] = commonPrefix + Box._pa[11] + position + this._getCSSFix() + myWidth + myHeight + this.paintPadding() +
          this.paintMargin() + this.paintBorder() + this.styles + endTag;
    } else {
      //resolve nulls
      var myLeft = this._expl.left;
      myLeft = myLeft == null ? Box._str.e : Box._pa[7] + myLeft + Box._str.pxs;
      var myTop = this._expl.top;
      myTop = myTop == null ? Box._str.e : Box._pa[9] + myTop + Box._str.pxs;
      var position = this.implicit.omitpos ? Box._str.e : Box._pa[12];

      a[0] = commonPrefix + Box._pa[11] + position + myWidth + myHeight + myLeft + myTop + this.paintPadding() +
          this.paintMargin() + this.paintBorder() + this.styles + endTag;
    }

    a[1] = (this._expl.empty) ? Box._pa[15] : Box._pa[13] + this._expl.tagname + Box._pa[14];
    return a;
  };

  /**
   * Sets ths CSS style declaration on an element. The following properties are not supported and MAY NOT be included in the declaration: position, left, top, width, height, padding, margin, border, float, clear
   * @param styles {String} valid style declaration containing one or more name/value pairs. For example, <code>color:red;background-color:yellow;font-size:12px;</code>
   * @return {jsx3.gui.Painted.Box} this object
   */
  Box_prototype.setStyles = function(styles) {
    this.styles = styles;
    return this;
  };

  /**
   * Sets the named attribute (attributes appear on the native HTML tag as a name/value pair)
   * @param atts {String} a string of attributes to place on the native HTML tag.  For example: <code>id="25" type="RADIO" class="abc def ghi"</code>
   * @return {jsx3.gui.Painted.Box} this object
   */
  Box_prototype.setAttributes = function(atts) {
    this.attributes = atts;
    return this;
  };

  /**
   * Returns the declaration for the css <b>display</b> property appropriate to the given browser mode.  For example: <code>display:-moz-inline-box;</code>
   * @return {String}
   * @private
   * @jsxobf-clobber
   */
  Box_prototype._getCSSFix = function() {
    //when a 100%x100% html element is relatively positioned in firefox, it corrupts the -moz-inline display setting. In such cases, remove it, since it is really only needed to give structure to a span and/or relatively positioned object
    return (this._expl.container &&
        (html.getMode() == html.MODE_FF_STRICT || html.getMode() == html.MODE_FF_QUIRKS)) ?
           Box._str.e : Box.getCssFix();
  };

  /** @private @jsxobf-clobber */
  Box_prototype._isParentIndependent = function() {
    var i = this.implicit;
    return (typeof(i.width) != Box._str.str || i.width.indexOf(Box._str.pct) < 0) &&
           (typeof(i.height) != Box._str.str || i.height.indexOf(Box._str.pct) < 0) &&
           (typeof(i.left) != Box._str.str || i.left.indexOf(Box._str.pct) < 0) &&
           (typeof(i.top) != Box._str.str || i.top.indexOf(Box._str.pct) < 0);
  };

  Box._RECALC_VALS = [[[[{n:1},{h:1}],[{w:1},{w:1,h:1}]],[[{t:1},{t:1,h:1}],[{t:1,w:1},{t:1,w:1,h:1}]]],
      [[[{l:1},{l:1,h:1}],[{l:1,w:1},{l:1,w:1,h:1}]],[[{l:1,t:1},{l:1,t:1,h:1}],[{l:1,t:1,w:1},{l:1,t:1,w:1,h:1,a:1}]]]];

  /**
   * Recalculates the explicit object based upon the implicit profile. Persists both on the object
   * @param profile {Object} Implicit map that will be used to create the explicit profile object. Since this is an update to an existing profile, only those properties that have changed need to be passed:
   * <ul>
   * <li><b>boxtype</b>: box, relativebox, or inline</li>
   * <li><b>tagname</b>: div, span, input[text], input[password], textarea, etc</li>
   * <li><b>parentwidth</b>: clientWidth of box within which this profile will render its box.</li>
   * <li><b>parentheight</b>: clientHeight of box within which this profile will render its box.</li>
   * <li><b>left</b>: Pixel or percentage</li>
   * <li><b>top</b>: Pixel or percentage</li>
   * <li><b>width</b>: pixel or percentage</li>
   * <li><b>height</b>: pixel or percentage</li>
   * <li><b>border</b>: To use, this value must provide four compass positions in clockwise order (top, right, bottom, left)</li>
   * <li><b>padding</b>: To use, this value must provide four compass positions in clockwise order (top, right, bottom, left)</li>
   * <li><b>margin</b>: To use, this value applies to inline, rightfloatbox and leftfloatbox. must provide four compass positions in clockwise order (top, right, bottom, left)</li>
   * <li><b>empty</b>: Boolean, if true, the generated tag will be empty. For example, &lt;br/&gt; instead of &lt;br&gt;&lt;/br&gt;</li>
   * <li><b>container</b>: Boolean, if true, the object is a 100%x100% HTML element (preferably a div), used to contain other objects, but not used for textual display.</li>
   * </ul>
   * @return {Boolean} true if a delta to the calculated box's dimensions
   * @param objGUI {HTMLElement} on-screen element
   * @package
   */
  Box_prototype.recalculate = function(profile, objGUI) {
    var bUpdate = this._new;
    var l = 0, t = 0, w = 0, h = 0;

    // apply deltas to the implicit object
    for (var p in profile) {
      if (this.implicit[p] != profile[p]) {
        this.implicit[p] = profile[p];
        bUpdate = true;

        if (!w && Box._stm.wpw[p]) w = 1;
        if (!h && Box._stm.hph[p]) h = 1;
      }
    }

    if (bUpdate) {
      // recalculate (convert implicit to explicit)
      this.calculate(Box._RECALC_FIELDS);

      if (objGUI && objGUI.style) {
        var objStyle = objGUI.style;

        // left and top can be negative, but not null
        if (this._expl.boxtype == Box._str.box && this._expl.left != null && this._expl.top != null) {
          if (parseInt(objStyle.left) != this._expl.left) {
            objStyle.left = this._expl.left + Box._str.px; // NOTE: Fx XHTML mode requires "px"
            l = 1;
          }
          if (parseInt(objStyle.top) != this._expl.top) {
            objStyle.top = this._expl.top + Box._str.px;
            t = 1;
          }
        }

        // if the token says this is a positional move, then only left/top is affected. skip width/height
        if (profile.parentheight != null || profile.parentwidth != null ||
            profile.width != null || profile.height != null) {
          var myWidth = this.getPaintedWidth();
          var myHeight = this.getPaintedHeight();

          if (myWidth != null && parseInt(objStyle.width) != myWidth) {
            objStyle.width = Math.max(0, myWidth) + Box._str.px;
            w = 1;
          } else {
            w = 0;
          }

          if (myHeight != null && parseInt(objStyle.height) != myHeight) {
            objStyle.height = Math.max(0, myHeight) + Box._str.px;
            h = 1;
          } else {
            h = 0;
          }
        }
      }
    }

//    jsx3.log("recalculate " + bUpdate + " " + (objGUI ? (objGUI.id + " " + jsx3.GO(objGUI.id)) : "-") + " " + [l,t,w,h].join(","));
    this._new = false;

    // return information on what was changed
    return Box._RECALC_VALS[l][t][w][h];
  };

  /* @jsxobf-clobber */
  Box._LT_PROPS = {left:1, top:1};

  /* @jsxobf-clobber */
  Box._Expl = function() {};
  Box._Expl.prototype = {padding:"", margin:"", border:"", bwidth:0, bheight:0, btop:0, bleft:0,
      pwidth:0, pheight:0, ptop:0, pleft:0};

  /**
   * Loops through the properties in the implicit object to convert to explicit values
   * @private
   */
  Box_prototype.calculate = function(arrFields) {
    if (!arrFields) arrFields = Box._PROPERTIES;

    //recreate the explicit value object (the true dimensions--not the abstraction(implied) provided by the developer)
    if (! this._expl) this._expl = new Box._Expl();
    var newBox = this._expl;

    //convert user-implied vlaues to explicit values used by the painter/resizer
    for (var i = 0; i < arrFields.length; i++) {
      var pname = arrFields[i];
      var pvalue = this.implicit[pname];

      if (Box._LT_PROPS[pname] && (pvalue == null || pvalue == Box._str.e) && this.implicit.boxtype == Box._str.box) {
        newBox[pname] = 0;
      } else {
        var setter = Box._PROPS_SETTER[pname];
        if (setter) {
          if (pvalue === Box._str.e) pvalue = null;
          this[setter](pvalue);
        } else {
          this._expl[pname] = pvalue;
        }
      }
    }
  };

  /**
   * Registers a server instance with the box profiler, allowing sizing information and, if applicable, resize subscriptions
   * @param server {jsx3.app.Server} server instance to register
   * @param bLiquid {Boolean} if true, the server will be subscribed to the window resize event
   * @package
   */
  Box.registerServer = function(server,bLiquid) {
    if (bLiquid)
      jsx3.gui.Event.subscribe(jsx3.gui.Event.RESIZE, server, "onResize");
  };

  /**
   * Unsubscribes the server from the window.onresize event (if applicable)
   * @param server {jsx3.app.Server} server instance to register
   * @param bLiquid {Boolean} if true, the server will be unsubscribed to the window resize event
   * @package
   */
  Box.unregisterServer = function(server, bLiquid) {
    if (bLiquid)
      jsx3.gui.Event.unsubscribe(jsx3.gui.Event.RESIZE, server, "onResize");
  };

  /** @private @jsxobf-clobber */
  Box_prototype._addPropWidth = function(value) {
    if (value == null) {
      this._expl.width = this._expl.clientwidth = null;
    } else {
      if (typeof(value) == Box._str.str && value.indexOf(Box._str.pct) >= 0)
        value = Math.round(this.implicit.parentwidth * parseInt(value) / 100);
      else
        value = Number(value);
      this._expl.width = value;
      this._expl.clientwidth = Math.max(0, value - this._expl.pwidth - this._expl.bwidth);
    }
  };

  /** @private @jsxobf-clobber */
  Box_prototype._addPropHeight = function(value) {
    if (value == null) {
      this._expl.height = this._expl.clientheight = null;
    } else {
      if (typeof(value) == Box._str.str && value.indexOf(Box._str.pct) >= 0)
        value = Math.round(this.implicit.parentheight * parseInt(value) / 100);
      else
        value = Number(value);
      this._expl.height = value;
      this._expl.clientheight = Math.max(0, value - this._expl.pheight - this._expl.bheight);
    }
  };

  /** @private @jsxobf-clobber */
  Box_prototype._addPropLeft = function(value) {
    this._expl.left = typeof(value) == Box._str.str && value.indexOf(Box._str.pct) >= 0 ?
        Math.round(this.implicit.parentwidth * parseInt(value) / 100) : (value == null ? value : Number(value));
  };

  /** @private @jsxobf-clobber */
  Box_prototype._addPropTop = function(value) {
    this._expl.top = typeof(value) == Box._str.str && value.indexOf(Box._str.pct) >= 0 ?
        Math.round(this.implicit.parentheight * parseInt(value) / 100) : (value == null ? value : Number(value));
  };

  /** @private @jsxobf-clobber */
  Box_prototype._addPropTagname = function(value) {
    if (value == null) {
      this._expl.tagname = value;
      this._expl.type = value;
    } else if (value.search(/input\[(\S*)\]/i) > -1) {
      //derive password and textbox types
      this._expl.tagname = "input";
      this._expl.type = RegExp.$1.toLowerCase();
    } else {
      this._expl.tagname = value;
    }
  };

  /** @private @jsxobf-clobber */
  Box_prototype._addPropBorder = function(value) {
    if (value == null) value = Box._str.e;

    // this is expensive, so cache the value
    if (this._lastbordervalue === value)
      return;
    this._lastbordervalue = value;

    var arrBorder = null, arrWidth = null;

    if (typeof(value) == Box._str.str && value.indexOf(":") >= 0) {
      var cssFix = Box.cssBorderToJsx(value);
      if (typeof(cssFix) != Box._str.obj) // error condition
        arrBorder = cssFix.split(Box._str.semi);
    } else {
      value = value.replace(/(^[;\s]*)|([;\s]*$)/g, Box._str.e);
      if (value !== Box._str.e)
        arrBorder = value.split(Box._str.semi);
    }

    if (arrBorder && arrBorder.length > 1) {
      var bSame = true;
      for (var i = 0; bSame && i < arrBorder.length - 1 && i < 3; i++) {
        if (arrBorder[i] != arrBorder[i+1])
          bSame = false;
      }
      if (bSame) arrBorder.splice(1, arrBorder.length);
    }

    if (!arrBorder) {
      arrWidth = [0, 0, 0, 0];
    } else if (arrBorder.length == 1) {
      var match = arrBorder[0].match(Box.BREGEX);
      var width = match ? parseInt(match[0]) : 0;
      if (isNaN(width)) width = 0;
      arrWidth = [width, width, width, width];
    } else {
      arrWidth = [];
      for (var i = 0; i < 4; i++) {
        var match = arrBorder[i].match(Box.BREGEX);
        var width = match ? parseInt(match[0]) : 0;
        if (isNaN(width)) width = 0;
        arrWidth[i] = width;
      }
    }

    this._expl.bwidth = arrWidth[1] + arrWidth[3];
    this._expl.bheight = arrWidth[0] + arrWidth[2];
    this._expl.bleft = arrWidth[3];
    this._expl.btop = arrWidth[0];

    if (arrBorder) {
      for (var i = 0; i < arrBorder.length; i++) {
        if (arrBorder[i].indexOf("pseudo") >= 0)
          arrBorder[i] = Box._str.e;
      }
    }

    if (arrBorder == null) {
      this._expl.border = Box._str.e;
    } else if (arrBorder.length == 1) {
      this._expl.border = arrBorder[0] ? Box._str.bor + Box._str.c + (arrWidth[0] > 0 ? arrBorder[0] : Box._str.zpx) + Box._str.semi : Box._str.e;
    } else if (arrBorder.length == 4) {
      this._expl.border =
          (arrBorder[0] ? "border-top:" + (arrWidth[0] > 0 ? arrBorder[0] : Box._str.zpx) + Box._str.semi : Box._str.e) +
          (arrBorder[1] ? "border-right:" + (arrWidth[1] > 0 ? arrBorder[1] : Box._str.zpx) + Box._str.semi : Box._str.e) +
          (arrBorder[2] ? "border-bottom:" + (arrWidth[2] > 0 ? arrBorder[2] : Box._str.zpx) + Box._str.semi : Box._str.e) +
          (arrBorder[3] ? "border-left:" + (arrWidth[3] > 0 ? arrBorder[3] : Box._str.zpx) + Box._str.semi : Box._str.e);
    }

//    jsx3.log("_addPropBorder  " + value + " -> " + this._expl.border);
  };

  /** @private @jsxobf-clobber */
  Box_prototype._addPropMargin = function(value) {
    if (value == null) value = Box._str.e;

    // this is expensive, so cache the value
    if (this._lastmarginvalue === value)
      return;
    this._lastmarginvalue = value;

    var arrWidth = null;

    if (typeof(value) == Box._str.str && value.indexOf(":") > -1) {
      //old css syntax is probably being used; convert
      var cssFix = Box.cssToJsx(value, Box._str.mar);
      if (typeof(cssFix) != Box._str.obj) // error condition
        //convert the implied string to a parsed equivalent (creates a 5 element array)
        arrWidth = cssFix.match(Box.REGEX);
    } else {
      if (typeof(value) == Box._str.num) {
        arrWidth = [value];
      } else {
        value = jsx3.util.strTrim(String(value));

        if (value !== Box._str.e) {
          if (isNaN(value))
            arrWidth = value.match(Box.REGEX);
          else
            arrWidth = [Number(value)];
        }
      }
    }

    if (arrWidth == null)
      this._expl.margin = Box._str.e;
    else if (arrWidth.length == 1)
      this._expl.margin = Box._str.mar + Box._str.c + arrWidth[0] + Box._str.pxs;
    else
      this._expl.margin = Box._str.mar + Box._str.c + arrWidth[1] + Box._str.pxc + arrWidth[2] + Box._str.pxc +
                                                      arrWidth[3] + Box._str.pxc + arrWidth[4] + Box._str.pxs;

//    jsx3.log("_addPropMargin  " + value + " -> " + arrWidth + " -> " + this._expl.margin);
  };

  /** @private @jsxobf-clobber */
  Box_prototype._addPropPadding = function(value) {
    if (value == null) value = Box._str.e;

    // this is expensive, so cache the value
    if (this._lastpaddingvalue === value)
      return;
    this._lastpaddingvalue = value;

    var arrWidth = null;

    if (typeof(value) == Box._str.str && value.indexOf(":") > -1) {
      //old css syntax is probably being used; convert
      var cssFix = Box.cssToJsx(value, Box._str.pad);
      if (typeof(cssFix) != Box._str.obj) // error condition
        //convert the implied string to a parsed equivalent (creates a 5 element array)
        arrWidth = cssFix.match(Box.REGEX);
    } else {
      if (typeof(value) == Box._str.num) {
        arrWidth = [value];
      } else {
        value = jsx3.util.strTrim(String(value));

        if (value !== Box._str.e) {
          if (isNaN(value))
            arrWidth = value.match(Box.REGEX);
          else
            arrWidth = [Number(value)];
        }
      }
    }

    var arrInt = null;

    if (arrWidth == null) {
      arrInt = [0, 0, 0, 0];
      this._expl.padding = Box._str.e;
    } else if (arrWidth.length == 1) {
      var w = arrWidth[0];
      arrInt = [w, w, w, w];
      this._expl.padding = Box._str.pad + Box._str.c + w + Box._str.pxs;
    } else {
      arrInt = [];
      for (var i = 1; i < 5; i++) {
        var w = parseInt(arrWidth[i]);
        if (isNaN(w)) w = 0;
        arrInt[i - 1] = w;
      }
      this._expl.padding = Box._str.pad + Box._str.c + arrInt[0] + Box._str.pxc + arrInt[1] + Box._str.pxc +
                                                       arrInt[2] + Box._str.pxc + arrInt[3] + Box._str.pxs;
    }

    this._expl.pwidth = arrInt[1] + arrInt[3];
    this._expl.pheight = arrInt[0] + arrInt[2];
    this._expl.ptop = arrInt[0];
    this._expl.pleft = arrInt[3];
  };

  /**
   * Returns an inline box that floats inline with existing content. This box can specify a width and height.
   * @param objProfile {Object} JavaScript object representing a class in a pseudo-compiled state that can be used by the box painter
   * @return {String} DHTML
   */
  Box_prototype.addChildProfile = function(objProfile) {
    var c = this._children;
    if (!c) c = this._children = [];
    c[c.length] = objProfile;
  };

  /**
   * Returns the child profile instance
   * @param intIndex {Number} index of child profile to return (zero-based array)
   * @return {String} DHTML
   */
  Box_prototype.getChildProfile = function(intIndex) {
    return this._children ? this._children[intIndex] : null;
  };

  /**
   * Returns the pixel offset between the inner edge of the parent and the outer edge of the client. (Accounts for border and padding)
   * @return {int}
   */
  Box_prototype.getClientLeft = function() {
    return this._expl.bleft + this._expl.pleft;
  };

  /**
   * Returns the pixel offset between the inner edge of the parent and the outer edge of the client. (Accounts for border and padding)
   * @return {int}
   */
  Box_prototype.getClientTop = function() {
    return this._expl.btop + this._expl.ptop;
  };

  /**
   * Returns the true client width (where content will reside) for the control. When creating a child profile, call this method to get the value for the 'parentwidth' property for the new child
   * @return {int}
   */
  Box_prototype.getClientWidth = function() {
    return this._expl.clientwidth;
  };

  /**
   * Returns the true client height (where content will reside) for the control. When creating a child profile, call this method to get the value for the 'parentheight' property for the new child
   * @return {int}
   */
  Box_prototype.getClientHeight = function() {
    return this._expl.clientheight;
  };

  /**
   * Returns the offset width for the profile.
   * @return {int}
   */
  Box_prototype.getOffsetWidth = function() {
    return this._expl.width;
  };

  /**
   * Returns the offset height for the profile.
   * @return {int}
   */
  Box_prototype.getOffsetHeight = function() {
    return this._expl.height;
  };

  Box_prototype.getBorderWidth = function() {
    return this._expl.bwidth;
  };

  Box_prototype.getBorderHeight = function() {
    return this._expl.bheight;
  };

  /**
   * Returns the width required by the boxpainter specific to the browser (IE/FFX) and mode (quirks/strict)
   * NOTE:  getPaintedWidth and getPaintedHeight have extra logic to factor out various form-field inputs. However, getClientHeight/getClientWidth are the
   *        recommended methods for getting the true drawspace (the box less padding, margin, border) per a given environment
   * @return {int}
   * @private
   */
  Box_prototype.getPaintedWidth = function() {
    var type = this._expl.type;
    var mode = html.getMode();
/* @JSC */ if (jsx3.CLASS_LOADER.SAF) {
    var val = ((type == "text" || type == "password" || this._expl.tagname == "textarea" ) && mode == html.MODE_FF_QUIRKS) ?
        this._expl.width : this._expl.clientwidth;
/* @JSC */ } else {
    var val = mode == html.MODE_IE_QUIRKS ||
        ((type == "text" || type == "password" || this._expl.tagname == "textarea") && mode == html.MODE_FF_QUIRKS) ?
        this._expl.width : this._expl.clientwidth;
/* @JSC */ }
    return val === Box._str.e || isNaN(val) ? null : val;
  };

  /**
   * Returns the height required by the boxpainter specific to the browser (IE/FFX) and mode (quirks/strict)
   * @return {int}
   * @private
   */
  Box_prototype.getPaintedHeight = function() {
    var type = this._expl.type;
    var mode = html.getMode();
    var val = mode == html.MODE_IE_QUIRKS ||
        ((type == "text" || type == "password" || this._expl.tagname == "textarea") && mode == html.MODE_FF_QUIRKS) ?
        this._expl.height : this._expl.clientheight;
    return val === Box._str.e || isNaN(val) ? null : val;
  };

  /**
   * Returns the left required by the boxpainter specific to the browser (IE/FFX) and mode (quirks/strict)
   * @return {int}
   * @private
   */
  Box_prototype.getPaintedLeft = function() {
    return this._expl.left;
  };

  /**
   * Returns the top required by the boxpainter specific to the browser (IE/FFX) and mode (quirks/strict)
   * @return {int}
   * @private
   */
  Box_prototype.getPaintedTop = function() {
    return this._expl.top;
  };

  /**
   * Returns the boxtype.
   * @return {String} One of: box, relativebox, inline
   * @private
   */
  Box_prototype.getBoxType = function() {
    return this._expl.boxtype;
  };

  /**
   * Returns the CSS string for the margin
   * @return {int}
   * @private
   */
  Box_prototype.paintMargin = function() {
    return this._expl.margin || Box._str.e;
  };

  /**
   * Returns the top required by the boxpainter specific to the browser (IE/FFX) and mode (quirks/strict)
   * @return {int}
   * @private
   */
  Box_prototype.paintPadding = function() {
    return this._expl.padding || Box._str.e;
  };

  /**
   * Returns the top required by the boxpainter specific to the browser (IE/FFX) and mode (quirks/strict)
   * @return {int}
   * @private
   */
  Box_prototype.paintBorder = function() {
    return this._expl.border || Box._str.e;
  };

  /**
   * Returns the first document body in the document
   * @return {HTMLElement} first document body in the document
   * @private
   */
  Box.getBody = function() {
    return document.getElementsByTagName("body")[0];
  };

  /**
   * Returns the size of a standard scrollbar
   * @param objServerContainer {HTMLElement} HTML element that will contain a given GI server instance
   * @return {int}
   * @private
   */
  Box.getScrollSize = function(objServerContainer) {
    if (Box.SCROLL_SIZE == null) {
      //use the server container to paint the mode-test objects
      var objBody = objServerContainer || Box.getBody();

      //create div in order to determine scrollsize
      var test0 = '<div id="_jsx3_html_scr" class="jsx30block" style="padding:0px;margin:0px;border-width:0px;position:absolute;width:100px;height:100px;left:-100px;top:-100px;overflow:scroll;">&#160;</div>';
      html.insertAdjacentHTML(objBody, "beforeEnd", test0);
      var box0 = document.getElementById("_jsx3_html_scr");
      Box.SCROLL_SIZE = 100 - parseInt(box0.clientWidth);
      objBody.removeChild(box0);
    }
    return Box.SCROLL_SIZE;
  };

  /**
   * When overflow is set to 'scroll' or 'auto', accounts for the scrollbar structure itself,
   * @param strCSS {String} one of: scroll, auto
   * @return {int}
   * @private
   */
  Box.getScrollSizeOffset = function(strCSS) {
    var intSize = Box.getScrollSize();
    return html.getScrollSizeOffset(intSize,strCSS);
  };


  /** @private @jsxobf-clobber */
  Box.cssToJsx = function(strInput,cssEl) {
    var output = "not matched";
    var top = "0";
    var right = "0";
    var bottom = "0";
    var left = "0";
    var rePadding = /(\s*(padding|padding-top|padding-right|padding-bottom|padding-left)\s*:\s*(\d+)(px)?\s*((\d+)(px)?)?\s*((\d+)(px)?)?\s*((\d+)(px)?)?\s*;)+/ig;
    var  reMargin = /(\s*(margin|margin-top|margin-right|margin-bottom|margin-left)\s*:\s*(-*\d+)(px)?\s*((-*\d+)(px)?)?\s*((-*\d+)(px)?)?\s*((-*\d+)(px)?)?\s*;)+/ig;
    var re = (cssEl==Box._str.pad)? rePadding : reMargin;
    var splited = strInput.split(Box._str.semi);

    if (splited) {
      for (var i = 0  ; i < splited.length ; i++) {
        // By spliting the rule semicolon is removed, also add it again
        var singlematched = splited[i]+Box._str.semi;
        // the index of matching should begin at index 0
        var searched = singlematched.search(re);
        if (searched > 0) {
          return {desc: "Missing Semicolon", cause: splited[i]};
        } else if (searched==-1){
          // String dose not matche the regular expression
          if (splited[i].search(/[^\s*]/i)>=0){
            return {desc: "Mismatch Rule", cause: splited[i]};
          }
        } else {
          output =  singlematched.replace(re,
          function($1 , $2 , $3 , $4 , $5 , $6 , $7, $8, $9 , $10 , $11 , $12 ,$13){
            if ($3.match(/-top/)){
              top = ($4==null)?"0":$4;
            }
            else if ($3.match(/-right/)){
              right = ($4==null)?"0":$4;
            }
            else if ($3.match(/-bottom/)){
              bottom = ($4==null)?"0":$4;
            }
            else if ($3.match(/-left/)){
              left = ($4==null)?"0":$4;
            }
            else {
              top = jsx3.util.strEmpty($4) ? "0" : $4;
              right = jsx3.util.strEmpty($7) ? top : $7;
              bottom = jsx3.util.strEmpty($10) ? top : $10;
              left = jsx3.util.strEmpty($13) ? right : $13;
            }
            return top+" "+right+" "+bottom+" "+left;
          });
          output = top+" "+right+" "+bottom+" "+left;
        }
      }
    }//if
    return output;
  };

  //regexp used to convert a css border definition to the format used by GI. This allows GI to calculate the border width
  var myRegBTW = /border(?:(?:-top(?:-width)?)|(?:-width))?:[^0-9]*([0-9]*)px/gi;
  var myRegBTC = /border(?:(?:-top(?:-color)?)|(?:-color))?:[^;]*((?:#[a-zA-Z0-9]{6})|(?:rgb\s*\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\))|(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gray|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCora|LightCyan|LightGoldenrodYellow|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlu|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen))/gi;
  var myRegBTS = /border(?:(?:-top(?:-style)?)|(?:-style))?:[^;]*(dashed|dotted|double|groove|hidden|inset|none|outset|ridge|solid)/gi;
  var myRegBRW = /border(?:(?:-right(?:-width)?)|(?:-width))?:[^0-9]*([0-9]*)px/gi;
  var myRegBRC = /border(?:(?:-right(?:-color)?)|(?:-color))?:[^;]*((?:#[a-zA-Z0-9]{6})|(?:rgb\s*\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\))|(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gray|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCora|LightCyan|LightGoldenrodYellow|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlu|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen))/gi;
  var myRegBRS = /border(?:(?:-right(?:-style)?)|(?:-style))?:[^;]*(dashed|dotted|double|groove|hidden|inset|none|outset|ridge|solid)/gi;
  var myRegBBW = /border(?:(?:-bottom(?:-width)?)|(?:-width))?:[^0-9]*([0-9]*)px/gi;
  var myRegBBC = /border(?:(?:-bottom(?:-color)?)|(?:-color))?:[^;]*((?:#[a-zA-Z0-9]{6})|(?:rgb\s*\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\))|(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gray|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCora|LightCyan|LightGoldenrodYellow|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlu|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen))/gi;
  var myRegBBS = /border(?:(?:-bottom(?:-style)?)|(?:-style))?:[^;]*(dashed|dotted|double|groove|hidden|inset|none|outset|ridge|solid)/gi;
  var myRegBLW = /border(?:(?:-left(?:-width)?)|(?:-width))?:[^0-9]*([0-9]*)px/gi;
  var myRegBLC = /border(?:(?:-left(?:-color)?)|(?:-color))?:[^;]*((?:#[a-zA-Z0-9]{6})|(?:rgb\s*\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\))|(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gray|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCora|LightCyan|LightGoldenrodYellow|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlu|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen))/gi;
  var myRegBLS = /border(?:(?:-left(?:-style)?)|(?:-style))?:[^;]*(dashed|dotted|double|groove|hidden|inset|none|outset|ridge|solid)/gi;

  /** @private @jsxobf-clobber */
  Box.cssBorderToJsx = function(myCSS) {
    var objBorder = {top:{width:0,color:"",style:""},right:{width:0,color:"",style:""},bottom:{width:0,color:"",style:""},left:{width:0,color:"",style:""}};

    //top
    while(myRegBTW.exec(myCSS))
      objBorder.top.width = RegExp.$1;
    while(myRegBTC.exec(myCSS))
      objBorder.top.color = RegExp.$1;
    while(myRegBTS.exec(myCSS))
      objBorder.top.style = RegExp.$1;

    //right
    while(myRegBRW.exec(myCSS))
      objBorder.right.width = RegExp.$1;
    while(myRegBRC.exec(myCSS))
      objBorder.right.color = RegExp.$1;
    while(myRegBRS.exec(myCSS))
      objBorder.right.style = RegExp.$1;

    //bottom
    while(myRegBBW.exec(myCSS))
      objBorder.bottom.width = RegExp.$1;
    while(myRegBBC.exec(myCSS))
      objBorder.bottom.color = RegExp.$1;
    while(myRegBBS.exec(myCSS))
      objBorder.bottom.style = RegExp.$1;

    //left
    while(myRegBLW.exec(myCSS))
      objBorder.left.width = RegExp.$1;
    while(myRegBLC.exec(myCSS))
      objBorder.left.color = RegExp.$1;
    while(myRegBLS.exec(myCSS))
      objBorder.left.style = RegExp.$1;


    return objBorder.top.width + Box._str.pxc + objBorder.top.style + " " + objBorder.top.color + Box._str.semi +
           objBorder.right.width + Box._str.pxc + objBorder.right.style + " " + objBorder.right.color + Box._str.semi +
           objBorder.bottom.width + Box._str.pxc + objBorder.bottom.style + " " + objBorder.bottom.color + Box._str.semi +
           objBorder.left.width + Box._str.pxc + objBorder.left.style + " " + objBorder.left.color;
  };


  /**
   * toString
   * @return {int}
   */
  Box_prototype.toString = function() {
    var s = "IMPLICIT:\n";
    for (var p in this.implicit) s+= p + ": " + this.implicit[p] + "\n";
    s+= "\nEXPLICIT:\n";
    for (var p in this._expl) s+= p + ": " + this._expl[p] + "\n";
    return s;
  };

});

/**
 * @package
 */
jsx3.Class.defineClass("jsx3.app.Model.Loading", jsx3.gui.Painted, null, function(Loading, Loading_prototype) {

  Loading_prototype.init = function(objXML, intLoadType, arrParams) {
    /* @jsxobf-clobber */
    this._jsxxml = objXML;
    /* @jsxobf-clobber-shared */
    objXML._jsxloading = true;
    /* @jsxobf-clobber */
    this._jsxloadtype = intLoadType;
    /* @jsxobf-clobber */
    this._jsxparams = arrParams;

    if (intLoadType == jsx3.app.Model.LT_SLEEP_DESER || intLoadType == jsx3.app.Model.LT_SLEEP_PD) {
      jsx3.sleep(function() {
        var obj = this._deserialize();
        if (intLoadType == jsx3.app.Model.LT_SLEEP_DESER)
          this._repaint();
        else
          jsx3.sleep(function() {this._repaint();}, null, this);
      }, null, this);
    }
  };

  /** @private @jsxobf-clobber */
  Loading_prototype._deserialize = function() {
    var objParent = this.getParent();
    var newObj = objParent._doLoad.apply(this, [this._jsxxml].concat(this._jsxparams));
    objParent.setChild(newObj, jsx3.app.Model.PERSISTEMBED, null, this._jsxparams[1]);
    objParent.insertBefore(newObj, this, false);

    var objDoc = objParent.getDocument();
    if (objDoc) {
      var elm = objDoc.getElementById(this._jsxid);
      if (elm) {
        elm.id = newObj._jsxid;
      }
    }

    objParent.removeChild(this);

    /* @jsxobf-clobber */
    this._jsxdelegate = newObj;

    if (this._jsxloadtype == jsx3.app.Model.LT_SHOW_DESER)
      this._repaint();

    return newObj;
  };
  
  Loading_prototype.getName = function() {
    if (typeof(this._jsxname) == "undefined") {
      var node = this._jsxxml.selectSingleNode("jsx1:strings/@jsxname");
      /* @jsxobf-clobber */
      this._jsxname = node ? node.getValue() : null;
    }
    return this._jsxname;
  };
  
  Loading_prototype.getType = function() {
    return this._jsxloadtype;
  };
  
  /** @private @jsxobf-clobber-shared */
  Loading_prototype.toXMLElm = function(objXML, objProperties) {
    return this._jsxxml.cloneNode(true);
  };

  /** @private @jsxobf-clobber */
  Loading_prototype._repaint = function() {
    this._jsxdelegate.repaint();
  };

  Loading_prototype.paint = function() {
    return this.paintDomHolder();
  };

  Loading_prototype.getRendered = function() {
    return null;
  };

  Loading_prototype._setShowState = function(bShow) {
    if (bShow && this._jsxloadtype == jsx3.app.Model.LT_SHOW_DESER)
      this._deserialize();
    this.jsxsuper(bShow);
    return this._jsxdelegate;
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber-shared  _jsxloadcontext _varNameIndex

jsx3.require("jsx3.gui.HotKey");



/**
 * Mixin interface. Provides functionality to subclasses of jsx3.gui.Painted that allows them to publish model
 * events.
 * <p/>
 * Note that this class requires that implementors of this class extends  the <code>jsx3.gui.Painted</code> class and
 * implement the jsx3.util.EventDispatcher interface
 */
jsx3.Class.defineInterface("jsx3.gui.Interactive", null, function(Interactive, Interactive_prototype) {

  var Event = jsx3.gui.Event;

  /*
    This class contains the following sections:

    1. event type constants for primitive event wrappers
    2. event type constants for model events
    3. default HTML->JSX bridge event handlers _ebClick(), _ebFocus(), etc.
    4. getters and setters for instance fields that this mixin injects, including the event map
    5. utility methods that provide some common event-related functionality: spy, drag, etc. These methods will
       eventually be moved to another class
    6. hot key-related functions and methods
  */

  // the following are JSX model events that wrap primitive JavaScript events
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXBLUR = "jsxblur";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXCHANGE = "jsxchange";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXCLICK = "jsxclick";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXDOUBLECLICK = "jsxdblclick";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXFOCUS = "jsxfocus";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXKEYDOWN = "jsxkeydown";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXKEYPRESS = "jsxkeypress";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXKEYUP = "jsxkeyup";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXLOAD = "jsxload";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXMOUSEDOWN = "jsxmousedown";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXMOUSEOUT = "jsxmouseout";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXMOUSEOVER = "jsxmouseover";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXMOUSEUP = "jsxmouseup";
  /** {String}
   * @final @jsxobf-final */
  Interactive.JSXMOUSEWHEEL = "jsxmousewheel";
  /** {String}
   * @final @jsxobf-final */
  Interactive.FOCUS_STYLE = "text-decoration:underline";

  // the following are JSX model events
  /** {String}
   * @final @jsxobf-final */
  Interactive.ADOPT = "jsxadopt";     // when a record is adopted from this CDF object
  /** {String}
   * @final @jsxobf-final */
  Interactive.AFTER_APPEND = "jsxafterappend";     //after a new CDF record and corresponding on-screen TR are added to a jsx3.gui.List instance or relevant subclass
  /** {String}
   * @final @jsxobf-final */
  Interactive.AFTER_COMMIT = "jsxaftercommit";
  /** {String}
   * @final @jsxobf-final */
  Interactive.AFTER_EDIT = "jsxafteredit";         //called after showing an edit mask
  /** {String}
   * @final @jsxobf-final */
  Interactive.AFTER_MOVE = "jsxaftermove";  //after a move event
  /** {String}
   * @final @jsxobf-final */
  Interactive.AFTER_REORDER = "jsxafterreorder";    //after children have been reordered
  /** {String}
   * @final @jsxobf-final */
  Interactive.AFTER_RESIZE = "jsxafterresize";  //after resize; typically a dialog or alert
  /** {String}
   * @final @jsxobf-final */
  Interactive.AFTER_RESIZE_VIEW = "jsxafterresizeview";  //after the on-screen VIEW for the jsx3.gui.Block instance has been updated by box model controller, an event will be published with the following named properties: <code>native</code>: the native browser HTML element that was just resized--this can be queried for all relevant information such as clientWidth/clientHeight, etc and <code>target</code>: the jsx3.gui.Block instance that was just resized by by box model controller
  /** {String}
   * @final @jsxobf-final */
  Interactive.AFTER_SORT = "jsxaftersort";  //after a sort event
  /** {String}
   * @final @jsxobf-final */
  Interactive.BEFORE_APPEND = "jsxbeforeappend";   //before a new CDF record and corresponding on-screen TR are added to a jsx3.gui.List instance or relevant subclass
  /** {String}
   * @final @jsxobf-final */
  Interactive.BEFORE_DROP = "jsxbeforedrop";  //before a drop event (a mouseover)
  /** {String}
   * @final @jsxobf-final */
  Interactive.BEFORE_EDIT = "jsxbeforeedit";       //called before showing an edit mask
  /** {String}
   * @final @jsxobf-final */
  Interactive.BEFORE_MOVE = "jsxbeforemove";  //before a move event (fired by mouse down for any object that has been made "moveable")
  /** {String}
   * @final @jsxobf-final */
  Interactive.BEFORE_RESIZE = "jsxbeforeresize";  //before a resize; typically a dialog or alert
  /** {String}
   * @final @jsxobf-final */
  Interactive.BEFORE_SELECT = "jsxbeforeselect"; // vetoable select before a non-vetoable select
  /** {String}
   * @final @jsxobf-final */
  Interactive.BEFORE_SORT = "jsxbeforesort";  //before a sort event
  /** {String}
   * @final @jsxobf-final */
  Interactive.CANCEL_DROP = "jsxcanceldrop";  //canceling a drop event (a mouseout)
  /** {String}
   * @final @jsxobf-final */
  Interactive.CHANGE = "jsxchange";               //form value changed, tab changed
  /** {String}
   * @final @jsxobf-final */
  Interactive.CTRL_DROP = "jsxctrldrop";    //after a ctrl drop event
  /** {String}
   * @final @jsxobf-final */
  Interactive.DESTROY = "jsxdestroy";    //when an object is removed from the JSX DOM
  /** {String}
   * @final @jsxobf-final */
  Interactive.DATA = "jsxdata";
  /** {String}
   * @final @jsxobf-final */
  Interactive.DRAG = "jsxdrag";      //before a drag
  /** {String}
   * @final @jsxobf-final */
  Interactive.DROP = "jsxdrop";      //after a drop event (one of: ondrop, canceldrop, beforedrop)
  /** {String}
   * @final @jsxobf-final */
  Interactive.EXECUTE = "jsxexecute";    //execute event as in a menu click or tree node click, or listview dbl-click; enter key; spacebar for button
  /** {String}
   * @final @jsxobf-final */
  Interactive.HIDE = "jsxhide";      //opposite of show
  /** {String}
   * @final @jsxobf-final */
  Interactive.INCR_CHANGE = "jsxincchange";               //incremental change in text area, slider, etc
  /** {String}
   * @final @jsxobf-final */
  Interactive.INPUT = "jsxinput";
  /** {String}
   * @final @jsxobf-final */
  Interactive.MENU = "jsxmenu";      //before a bound menu is shown
  /** {String}
   * @final @jsxobf-final */
  Interactive.SCROLL = "jsxscroll";    //fires during a scroll event
  /** {String}
   * @final @jsxobf-final */
  Interactive.SELECT = "jsxselect";    //select, menu, tree, listview
  /** {String}
   * @final @jsxobf-final */
  Interactive.SHOW = "jsxshow";      //when a menu or select or some other ephemeral VIEW element is about to be displayed
  /** {String}
   * @final @jsxobf-final */
  Interactive.SPYGLASS = "jsxspy";    //when the spyglass is about to show
  /** {String}
   * @final @jsxobf-final */
  Interactive.TOGGLE = "jsxtoggle";    //treeview node open/close

  // default HTML->JSX bridge event handlers

  Interactive_prototype._ebBlur = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXBLUR, {objEVENT:objEvent});
  };

  Interactive_prototype._ebChange = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXCHANGE, {objEVENT:objEvent});
  };

  Interactive_prototype._ebClick = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXCLICK, {objEVENT:objEvent});
  };

  Interactive_prototype._ebDoubleClick = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXDOUBLECLICK, {objEVENT:objEvent});
  };

  Interactive_prototype._ebFocus = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXFOCUS, {objEVENT:objEvent});
  };

  /**
   * @return {boolean} true if the event was handled by a hot key and should not be considered further
   * @package
   */
  Interactive_prototype._ebKeyDown = function(objEvent, objGUI) {
    var caught = false;
    if (this.hasHotKey())
      caught = this.checkHotKeys(objEvent);

    if (! caught)
      this.doEvent(Interactive.JSXKEYDOWN, {objEVENT:objEvent});

    return caught;
  };

  Interactive_prototype._ebKeyPress = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXKEYPRESS, {objEVENT:objEvent});
  };

  Interactive_prototype._ebKeyUp = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXKEYUP, {objEVENT:objEvent});
  };

  Interactive_prototype._ebMouseDown = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXMOUSEDOWN, {objEVENT:objEvent});
  };

  Interactive_prototype._ebMouseOut = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXMOUSEOUT, {objEVENT:objEvent});
  };

  Interactive_prototype._ebMouseOver = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXMOUSEOVER, {objEVENT:objEvent});
  };

  Interactive_prototype._ebMouseUp = function(objEvent, objGUI) {
    var strMenu = null;
    this.doEvent(Interactive.JSXMOUSEUP, {objEVENT:objEvent});

    if (objEvent.rightButton() && (strMenu = this.getMenu()) != null) {
      var objMenu = this._getNodeRefField(strMenu);
      if (objMenu != null) {
        var vntResult = this.doEvent(Interactive.MENU, {objEVENT:objEvent, objMENU:objMenu, _gipp:1});
        if (vntResult !== false) {
          if (vntResult instanceof Object && vntResult.objMENU instanceof jsx3.gui.Menu)
            objMenu = vntResult.objMENU;
          objMenu.showContextMenu(objEvent, this);
        }
      }
    }
  };

  Interactive_prototype._ebMouseWheel = function(objEvent, objGUI) {
    this.doEvent(Interactive.JSXMOUSEWHEEL, {objEVENT:objEvent});
  };

  // getters and setters

  /**
   * Programmatically sets an event of this instance. Sets the script that will execute when this object publishes
   * a model event. The script value will be saved in the serialization file of a component. Not all classes that
   * implement this interface will publish events of every type. Consult the documentation of a class for a
   * description of the events it publishes.
   * <p/>
   * For programmatic registering of event handlers when persistence in a serialization file is not required,
   * consider using <code>jsx3.util.EventDispatcher.subscribe()</code> instead of this method. Whenever a model
   * event is published, it is published using the <code>EventDispatcher</code> interface as well as by executing
   * any registered event script.
   *
   * @param strScript {String} the actual JavaScript code that will execute when the given event is published.
   *    For example: <code>obj.setEvent("alert('hello.');", jsx3.gui.Interactive.EXECUTE);</code>
   * @param strType {String} the event type. Must be one of the model event types defined as static fields in this class
   * @return {jsx3.gui.Interactive} reference to this
   *
   * @see jsx3.util.EventDispatcher#subscribe()
   */
  Interactive_prototype.setEvent = function(strScript, strType) {
    this.getEvents()[strType] = strScript;
    return this;
  };

  /**
   * Returns the associative array containing all the registered event script of this object. This method returns
   * the instance field itself and not a copy.
   * @return {Object<String, String>} an associative array mapping event type to event script
   */
  Interactive_prototype.getEvents = function() {
    if (this._jsxevents == null)
      /* @jsxobf-clobber-shared */
      this._jsxevents = {};
    return this._jsxevents;
  };

  /**
   * Returns the event script registered for the given event type. This script could have been set by the
   * <code>setEvent()</code> method or during component deserialization.
   * @param strType {String} the event type, one of the model event types defined as static fields in this class
   * @return {String} the JavaScript event script
   *
   * @see #setEvent()
   */
  Interactive_prototype.getEvent = function(strType) {
    if (this._jsxevents) return this._jsxevents[strType];
  };

  /**
   * Returns true if there is a event script registered for the given event type.
   * @param strType {String} the event type, one of the model event types defined as static fields in this class
   * @return {String} the JavaScript event script
   */
  Interactive_prototype.hasEvent = function(strType) {
    return this._jsxevents != null && this._jsxevents[strType] != null && this._jsxevents[strType].match(/\S/);
  };

  /**
   * Publishes a model event. This method both evaluates any registered event script for the given event type
   * <b>and</b> publishes the event through the <code>EventDispatcher</code> interface. This method ensures that any
   * registered event script is executed in isolation to prevent most side effects.
   *
   * @param strType {String} the event type, one of the model event types defined as static fields in this class
   * @param objContext {Object<String, Object>} JavaScript object array with name/value pairs that provide a local
   *    variable stack for the execution of the event script. This argument is also passed as the <code>context</code>
   *    property of the event object that is published through the <code>EventDispatcher</code> interface.
   * @return {Object} the result of evaluating the event script or <code>null</code> if not event script is registered
   */
  Interactive_prototype.doEvent = function(strType, objContext) {
    var script = this.getEvent(strType);
    if (typeof(this.publish) == "function")
      this.publish({subject:strType, context:objContext});

    return this.eval(script, this._getEvtContext(objContext));
//    return this.eval("(function " + strType + "(){return " + script + "})();", objContext);
  };

  Interactive_prototype._getEvtContext = function(objContext) {
    var loadContext = this._jsxloadcontext;
    if (loadContext)
      objContext = jsx3.$O(loadContext._varNameIndex).clone().extend(objContext);
    return objContext;
  };

  /**
   * Removes an event script registered for the given model event type.
   * @param strType {String} the event type, one of the model event types defined as static fields in this class
   * @return {jsx3.gui.Interactive} this object
   */
  Interactive_prototype.removeEvent = function(strType) {
    if (this._jsxevents != null)
      delete this._jsxevents[strType];
    return this;
  };

  /**
   * Removes all events scripts registered with this object.
   * @return {jsx3.gui.Interactive} this object
   */
  Interactive_prototype.removeEvents = function() {
    this._jsxevents = {};
    return this;
  };

  /**
   * Sets whether is object can be moved around the screen (this is not the same as drag/drop). Implementing classes
   * can decide whether to consult this value or ignore it.
   * @param bMovable {int} <code>jsx3.Boolean.TRUE</code> or <code>jsx3.Boolean.FALSE</code>
   * @return {jsx3.gui.Interactive} this object
   */
  Interactive_prototype.setCanMove = function(bMovable) {
    this.jsxmove = bMovable;
    return this;
  };

  /**
   * Returns whether is object can be moved around the screen (this is not the same as drag/drop).
   * @return {int} <code>jsx3.Boolean.TRUE</code> or <code>jsx3.Boolean.FALSE</code>
   */
  Interactive_prototype.getCanMove = function() {
    return this.jsxmove || jsx3.Boolean.FALSE;
  };

  /**
   * Sets whether is object supports programmatic drag, meanining it will allow any contained item to be dragged/dropped.
   * Implementing classes can decide whether to consult this value or ignore it.
   * @param bDrag {int} <code>jsx3.Boolean.TRUE</code> or <code>jsx3.Boolean.FALSE</code>
   * @return {jsx3.gui.Interactive} this object
   */
  Interactive_prototype.setCanDrag = function(bDrag) {
    this.jsxdrag = bDrag;
    return this;
  };

  /**
   * Returns whether is object supports programmatic drag, meanining it will allow any contained item to be
   * dragged and dropped on another container supporting drop.
   * @return {int} <code>jsx3.Boolean.TRUE</code> or <code>jsx3.Boolean.FALSE</code>
   */
  Interactive_prototype.getCanDrag = function() {
    return this.jsxdrag || jsx3.Boolean.FALSE;
  };

  /**
   * Sets whether this object can be the target of a drop event. Implementing classes can decide whether to consult
   * this value or ignore it.
   * @param bDrop {int} <code>jsx3.Boolean.TRUE</code> or <code>jsx3.Boolean.FALSE</code>
   * @return {jsx3.gui.Interactive} this object
   */
  Interactive_prototype.setCanDrop = function(bDrop) {
    this.jsxdrop = bDrop;
    return this;
  };

  /**
   * Returns whether this object can be the target of a drop event.
   * @return {int} <code>jsx3.Boolean.TRUE</code> or <code>jsx3.Boolean.FALSE</code>
   */
  Interactive_prototype.getCanDrop = function() {
    return this.jsxdrop || jsx3.Boolean.FALSE;
  };

  /**
   * Sets whether is object can be spyglassed. Implementing classes can decide whether to consult
   * this value or ignore it.
   * @param bSpy {int} <code>jsx3.Boolean.TRUE</code> or <code>jsx3.Boolean.FALSE</code>
   * @return {jsx3.gui.Interactive} this object
   */
  Interactive_prototype.setCanSpy = function(bSpy) {
    this.jsxspy = bSpy;
    return this;
  };

  /**
   * Returns whether is object can be spyglassed.
   * @return {int} <code>jsx3.Boolean.TRUE</code> or <code>jsx3.Boolean.FALSE</code>
   */
  Interactive_prototype.getCanSpy = function() {
    return this.jsxspy || jsx3.Boolean.FALSE;
  };

  /**
   * Returns the name of the <code>jsx3.gui.Menu</code> instance to display (as a context menu) when a user
   * clicks on this object with the right button.
   * @return {String}
   */
  Interactive_prototype.getMenu = function() {
    return this.jsxmenu;
  };

  /**
   * Sets the name of the <code>jsx3.gui.Menu</code> instance to display when a user
   * clicks on this object with the right button. The name is a pointer by-name to a JSX object in the same server.
   * @param strMenu {String} name or id (jsxname or jsxid) of the context menu
   * @return {jsx3.gui.Interactive} this object
   */
  Interactive_prototype.setMenu = function(strMenu) {
    this.jsxmenu = strMenu;
    return this;
  };

  // fields and methods related to the HTML->JSX event bridge

  /** @package */
  Interactive.BRIDGE_EVENTS = [Event.BLUR, Event.CHANGE, Event.CLICK, Event.DOUBLECLICK,
      Event.FOCUS, Event.KEYDOWN, Event.KEYPRESS, Event.KEYUP, Event.MOUSEDOWN, Event.MOUSEMOVE,
      Event.MOUSEOUT, Event.MOUSEOVER, Event.MOUSEUP, Event.MOUSEWHEEL];

  /** @package */
  Interactive.BRIDGE_EVENTS_MAP = {};
  Interactive.BRIDGE_EVENTS_MAP[Event.BLUR] = "_ebBlur";
  Interactive.BRIDGE_EVENTS_MAP[Event.CHANGE] = "_ebChange";
  Interactive.BRIDGE_EVENTS_MAP[Event.CLICK] = "_ebClick";
  Interactive.BRIDGE_EVENTS_MAP[Event.DOUBLECLICK] = "_ebDoubleClick";
  Interactive.BRIDGE_EVENTS_MAP[Event.FOCUS] = "_ebFocus";
  Interactive.BRIDGE_EVENTS_MAP[Event.KEYDOWN] = "_ebKeyDown";
  Interactive.BRIDGE_EVENTS_MAP[Event.KEYPRESS] = "_ebKeyPress";
  Interactive.BRIDGE_EVENTS_MAP[Event.KEYUP] = "_ebKeyUp";
  Interactive.BRIDGE_EVENTS_MAP[Event.MOUSEDOWN] = "_ebMouseDown";
  Interactive.BRIDGE_EVENTS_MAP[Event.MOUSEMOVE] = "_ebMouseMove";
  Interactive.BRIDGE_EVENTS_MAP[Event.MOUSEOUT] = "_ebMouseOut";
  Interactive.BRIDGE_EVENTS_MAP[Event.MOUSEOVER] = "_ebMouseOver";
  Interactive.BRIDGE_EVENTS_MAP[Event.MOUSEUP] = "_ebMouseUp";
  Interactive.BRIDGE_EVENTS_MAP[Event.MOUSEWHEEL] = "_ebMouseWheel";

  /**
   * Used by jsx3.gui.Painted to render only the attributes that aren't rendered by renderHandlers().
   * @private
   */
  Interactive.isBridgeEventHandler = function(strHandler) {
    if (Interactive.BRIDGE_EVENT_HANDLER_MAP == null) {
      /* @jsxobf-clobber */
      Interactive.BRIDGE_EVENT_HANDLER_MAP = {};
      for (var i = 0; i < Interactive.BRIDGE_EVENTS.length; i++) {
        Interactive.BRIDGE_EVENT_HANDLER_MAP["on" + Interactive.BRIDGE_EVENTS[i]] = true;
      }
    }
    return Interactive.BRIDGE_EVENT_HANDLER_MAP[strHandler];
  };

  /** @package */
  Interactive._BRIDGE = "_bridge";
  /** @package */
  Interactive._EB = "_eb";

  /**
   * Renders all event bridge handlers. If the value of a property of <code>objMap</code> is true, the default name
   * for the bridge is used. However, this name is obfuscated so the class better be obfuscated with this class.
   * @package
   */
  Interactive_prototype.renderHandlers = function(objMap, useId) {
    // check for inherited behaviors:
    var inheritedMap = {};
    if ((objMap == null || ! objMap[Event.KEYDOWN]) && (this.hasHotKey() || this.getAlwaysCheckHotKeys()))
      inheritedMap[Event.KEYDOWN] = true;
    if ((objMap == null || ! objMap[Event.MOUSEUP]) && this.getMenu())
      inheritedMap[Event.MOUSEUP] = true;

    var strEvents = [];
    var bHasAttr = this.instanceOf(jsx3.gui.Painted);
    var strId = this.getId();

    for (var i = 0; i < Interactive.BRIDGE_EVENTS.length; i++) {
      var eventType = Interactive.BRIDGE_EVENTS[i];
      var eventHandler = "on" + eventType;
      var strEvent = [];

      var attrEvent = bHasAttr ? this.getAttribute(eventHandler) : null;
      if (attrEvent)
        strEvent[strEvent.length] = attrEvent.replace(/"/g, "&quot;") + ";";

      var bridgeMethod = (objMap && objMap[eventType]) || inheritedMap[eventType]/* || this.hasEvent("jsx" + eventType)*/;
      if (bridgeMethod) {
        if (typeof(bridgeMethod) != "string")
          bridgeMethod = Interactive.BRIDGE_EVENTS_MAP[eventType];

        if (useId != null)
          strEvent[strEvent.length] = "jsx3." + Interactive._EB + "(event,this,'" + bridgeMethod + "'," + useId + ");";
        else
          strEvent[strEvent.length] = "jsx3.GO('" + strId + "')." + Interactive._BRIDGE + "(event,this,'" + bridgeMethod + "');";
      }

      if (strEvent.length > 0)
        strEvents[strEvents.length] = ' ' + eventHandler + '="' + strEvent.join("") + '"';
    }

    return strEvents.join("");
  };

  /**
   * @package
   */
  Interactive_prototype.renderHandler = function(eventType, strMethod, useId) {
    var eventHandler = "on" + eventType;
    var strEvent = "";
    var bScript = false;

    if (bScript) {
      var attrEvent = this.getAttribute(eventHandler);
      if (attrEvent) {
        strEvent += attrEvent;
        if (! attrEvent.match(/;\s*$/))
          strEvent += ";";
      }
    }

    var bridgeEvent = useId != null ?
        "jsx3." + Interactive._EB + "(event,this,'" + strMethod + "'," + useId + ");" :
        "jsx3.GO('" + this.getId() + "')." + Interactive._BRIDGE + "(event,this,'" + strMethod + "');";

    return " " + eventHandler + '="' + strEvent + bridgeEvent + '"';
  };

  /**
   * @package
   * @jsxobf-clobber-shared
   */
  Interactive_prototype._bridge = function(objEvent, objElement, strMethod) {
    var win;
    // Refs GI-720: For some reason Matrix focus and blur events may not come through in IE.
    // It must be because of Matrix's HTML to DOM conversion. This is the workaround. 
    if (!objEvent && objElement && (win = objElement.ownerDocument.parentWindow))
      objEvent = win.event;

    if (objEvent) {
      var method = this[strMethod];
      var e = jsx3.gui.Event.wrap(objEvent);
      if (method) {
        method.call(this, e, objElement);
      } else {
        throw new jsx3.Exception(jsx3._msg("gui.int.br", strMethod, e.getType(), this));
      }
    }
  };

  /* @jsxobf-clobber-shared */
  jsx3._eb = function(objEvent, objGUI, strMethod, intUp) {
    var jsxGUI = objGUI;
    intUp = intUp || Number(0);
    for (var i = 0; i < intUp; i++)
      jsxGUI = jsxGUI.parentNode;

    var strId = jsxGUI.getAttribute("id");
    var objJSX = jsx3.GO(strId);
    if (objJSX != null)
      objJSX._bridge(objEvent, objGUI, strMethod);
    else if (jsx3.html.getElmUpByTagName(objGUI, "body") != null) // ignore only if objGUI has been detached from the HTML DOM
      throw new jsx3.Exception(jsx3._msg("gui.int.eb", strId, intUp, objGUI));
  };

// only used by List

  /**
   * @package
   */
  Interactive._beginMove = function(objEvent, objGUI, bCX, bCY) {
    var doc = objGUI.ownerDocument;

    //class method used for simple move operation; simply pass in the basics
    jsx3.gui.Event.preventSelection(doc);
    var absX = objEvent.getTrueX();
    var objX = objGUI.offsetLeft;
    jsx3.EventHelp.constrainY = bCY;
    jsx3.EventHelp.xOff = objX - absX;
    var absY = objEvent.getTrueY();
    var objY = objGUI.offsetTop;
    jsx3.EventHelp.constrainX = bCX;
    jsx3.EventHelp.yOff = objY - absY;
    jsx3.EventHelp.curDragObject = objGUI;
    jsx3.EventHelp.FLAG = 1;
    jsx3.EventHelp.beginTrackMouse(objEvent);
    objEvent.setCapture(objGUI);
    objEvent.cancelReturn();
    objEvent.cancelBubble();
  };


  /**
   * @package
   */
  Interactive._beginMoveConstrained = function(objEvent, objGUI, functRounder) {
    var doc = objGUI.ownerDocument;
    jsx3.gui.Event.preventSelection(doc);

    jsx3.EventHelp.startX = objEvent.getTrueX();
    jsx3.EventHelp.startY = objEvent.getTrueY();
    jsx3.EventHelp.xOff = objGUI.offsetLeft;
    jsx3.EventHelp.yOff = objGUI.offsetTop;
    jsx3.EventHelp.dragRounder = functRounder;

    jsx3.EventHelp.curDragObject = objGUI;

    jsx3.EventHelp.FLAG = 3;
    jsx3.EventHelp._dragging = false; // used for internal moving of parts like dialog resize and column reorder
    jsx3.EventHelp.beginTrackMouse(objEvent);
    objEvent.setCapture(objGUI);
    objEvent.cancelReturn();
    objEvent.cancelBubble();
  };


  Interactive_prototype.doBeginMove = function(objEvent, objGUI) {
    if (! objEvent.leftButton()) {
//      jsx3.log("cancelling move because button=" + objEvent.event().button);
      return;
    }

    //
    //? doBeginMove()    --any JSX Object that implements jsx3.gui.Interactive has access to this method. Binding this method to the mousedown event for the object allows the object to be dragged around the screen; mouseup must also reference the doEndMove function
    //! returns {null}
    //
    //initialize variables
    if (objGUI == null)
      objGUI = this.getRendered();
    var doc = objGUI.ownerDocument;

    var eventRet = this.doEvent(Interactive.BEFORE_MOVE, {objEVENT:objEvent});
    var bCancel = eventRet === false;

    //is the object painted and beforemove script didn't cancel?
    if (objGUI != null && !bCancel) {
      //update view for object--set its zindex higher in stack than all but system menus
      objGUI.style.zIndex = this.getServer().getNextZIndex(jsx3.app.Server.Z_DRAG);
      jsx3.gui.Event.preventSelection(doc);

      //set globals used to register the object's VIEW with the drag controller (with the following set, the drag controller will listen for mousemove)
      var absX = objEvent.getTrueX();
      var objX = objGUI.style.position == "absolute" ? (parseInt(objGUI.style.left) || 0) : objGUI.scrollLeft;

      if (eventRet && eventRet.bCONSTRAINY)
        jsx3.EventHelp.constrainY = true;

      jsx3.EventHelp.xOff = objX - absX;
      var absY = objEvent.getTrueY();
      var objY = objGUI.style.position == "absolute" ? (parseInt(objGUI.style.top) || 0) : objGUI.scrollTop;

      if (eventRet && eventRet.bCONSTRAINX)
        jsx3.EventHelp.constrainX = true;

      jsx3.EventHelp.yOff = objY - absY;
      jsx3.EventHelp.curDragObject = objGUI;
      jsx3.EventHelp.FLAG = 1;
      jsx3.EventHelp._dragging = false; // used for splitter move, dialog move
      jsx3.EventHelp.beginTrackMouse(objEvent);
      objEvent.setCapture(objGUI);
    }
  };

  Interactive_prototype.doEndMove = function(objEvent, objGUI) {
    //
    //? doEndMove()    --any JSX Object that implements jsx3.gui.Interactive has access to this method. Binding this method to the mouseup event for an object (e.g., "[object].doEndMove()") completes the drag and updates the object's model to reflect new positioning due to drag
    //! returns {null}
    //
    if (objGUI == null) objGUI = this.getRendered();

    if (objGUI != null) {
      objGUI.style.zIndex = this.getZIndex();
      objEvent.releaseCapture(objGUI);

      var newLeft = parseInt(objGUI.style.left);
      var newTop = parseInt(objGUI.style.top);
      //update MODEL to reflect where the object's on-screen VIEW has been positioned
      this.setLeft(newLeft);
      this.setTop(newTop);

      //execute the onaftermove code
      this.doEvent(Interactive.AFTER_MOVE, {objEVENT:objEvent, intL:newLeft, intT:newTop, _gipp:1});
    }
  };

  Interactive_prototype.doDrag = function(objEvent, objGUI, fctRenderer, objContext) {
    //
    //? doDrag()      --called when user mouses down on a draggable on-screen element
    //@ strCALLBACK {String} name of callback function that will return the HTML string that will represent the draggable icon that will move on-screen
    //@ objGUI {Object} on-screen, HTML object that was just 'moused down' on (what will be dragged); if null, it is assumed
    //            that this object can be derived by querying the system EVENT object for the 'srcElement' (objEvent.srcElement())
    //! returns {null}
    //
    //stop event bubbling in case parent object has mousedown event
    objEvent.cancelAll();

    //validate that objGUI (the item that was just moused down upon) is draggable
    if (objGUI == null) {
      objGUI = objEvent.srcElement();
      //loop up browser dom to find ancestor (or self) element that has a JSXDragId property, so we know what should be dragged
      while (objGUI != null && objGUI.getAttribute("JSXDragId") == null) {
        objGUI = objGUI.parentNode;
        if (objGUI = objGUI.ownerDocument.getElementsByTagName("body")[0])
          objGUI = null;
      }
      if (objGUI == null) return;
    }

    //declare contextual variables
    var strDRAGID = objGUI.getAttribute("JSXDragId");
    var strDRAGTYPE = objGUI.getAttribute("JSXDragType");

    if (objContext == null) objContext = {};
    objContext.strDRAGID = objGUI.getAttribute("JSXDragId");
    objContext.strDRAGTYPE = objGUI.getAttribute("JSXDragType");
    objContext.objGUI = objGUI;
    objContext.objEVENT = objEvent;

    //fire any bound drag handler code; this will allow the user to read/write necessary values as well as cancel the drag if they return explicit 'false'
    if (this.doEvent(Interactive.DRAG, objContext) === false) return;

    //extract the id from the element about to be dragged and persist (for use by drop zone objects); persist the name/id of the source object
    jsx3.EventHelp.DRAGTYPE = objContext.strDRAGTYPE;
    jsx3.EventHelp.DRAGID = objContext.strDRAGID;
    if(jsx3.$A.is(objContext.strDRAGIDS)) jsx3.EventHelp.DRAGIDS = objContext.strDRAGIDS;
    jsx3.EventHelp.JSXID = this;

    //use system default if no drag icon function supplied
    if (fctRenderer == null) fctRenderer = jsx3.EventHelp.drag;
    var strIcon = fctRenderer(objGUI, this, jsx3.EventHelp.DRAGTYPE, jsx3.EventHelp.DRAGID);

    //validate that the drag should still occur
    if (strIcon == null) {
      //if strIcon is null, it means that the user-specified callback cancelled the drag event by returning null
      return false;
    } else {
      //save html for drag icon
      jsx3.EventHelp.dragItemHTML = strIcon;

      //set flag used by mousemove listener; it will know to begin a drag if the user moves their mouse
      jsx3.EventHelp.FLAG = 2;
      jsx3.EventHelp._dragging = true; // used for CDF DnD
      jsx3.EventHelp.beginTrackMouse(objEvent);
    }

    //reset drag constraints (during drag/drop there is no constraint, but the same controller is used for 'move' as well as 'drag', so must reset just in case
    jsx3.EventHelp.constrainX = false;
    jsx3.EventHelp.constrainY = false;
  };

  Interactive_prototype.doDrop = function(objEvent, objGUI, DROPTYPE) {
    //
    //? doDrop()      --called when user is in the middle of a drag/drop operation and drags over/drags out/drops the given 'drag' object over a specified drop zone
    //@ DROPTYPE {String} value representing what is happening--mouseover, moueup, or mouseout
    //! returns {null}
    //
    if (jsx3.EventHelp.DRAGID != null) {
      //constants that can be referenced by any bound jsxondrop/jsxonctrldrop event handler code
      var objSOURCE = jsx3.EventHelp.JSXID;        //source jsx gui object; (i.e., another JSX object)
      var strDRAGID = jsx3.EventHelp.DRAGID;      //drag id for the element being dragged
      var strDRAGTYPE = jsx3.EventHelp.DRAGTYPE;      //drag type (equivalent to MIME) for the element being dragged
      var context = {objEVENT:objEvent, objSOURCE:objSOURCE, strDRAGID:strDRAGID, strDRAGTYPE:strDRAGTYPE};

      if (DROPTYPE == jsx3.EventHelp.ONDROP && jsx3.gui.isMouseEventModKey(objEvent)) {
        context.objGUI = objEvent.srcElement();
        this.doEvent(Interactive.CTRL_DROP, context);
        jsx3.EventHelp.reset();
      } else if (DROPTYPE == jsx3.EventHelp.ONDROP) {
        context.objGUI = objEvent.srcElement();
        this.doEvent(Interactive.DROP, context);
        jsx3.EventHelp.reset();
      } else if (DROPTYPE == jsx3.EventHelp.ONBEFOREDROP) {
        context.objGUI = objEvent.toElement();
        this.doEvent(Interactive.BEFORE_DROP, context);
      } else if (DROPTYPE == jsx3.EventHelp.ONCANCELDROP) {
        context.objGUI = objEvent.fromElement();
        this.doEvent(Interactive.CANCEL_DROP, context);
      }
    }
  };

  Interactive_prototype.doSpyOver = function(objEvent, objGUI, objContext) {
    //get the return of the jsxspy (a model event)
    var intX = objEvent.getTrueX();
    var intY = objEvent.getTrueY();

    if (this._jsxspytimeout) return;

    if (objContext == null) objContext = {};
    objEvent.persistEvent(); // so that event is still available after timeout
    objContext.objEVENT = objEvent;

    var me = this;
    this._jsxspytimeout = window.setTimeout(function() {
      if (me.getParent() == null) return;

      me._jsxspytimeout = null;
      var strSPYHTML = me.doEvent(Interactive.SPYGLASS, objContext);
      // if not empty...
      if (strSPYHTML)
        me.showSpy(strSPYHTML, objEvent);
    }, jsx3.EventHelp.SPYDELAY);
  };

  Interactive_prototype.doSpyOut = function(objEvent, objGUI) {
    // exit early if it's not really a mouse out event
    if (objEvent.isFakeOut(objGUI))
      return;

    if (!jsx3.gui.Heavyweight)
      return;
    
    // exit early if it was the spyglass itself that caused the mouseout event
    var hw = jsx3.gui.Heavyweight.GO("_jsxspy");
    if (hw) {
      var hwGUI = hw.getRendered();
      if (hwGUI && objEvent.isFakeOut(hwGUI))
        return;
    }
    
    //called when item implementing a spyglass is moused off
    window.clearTimeout(this._jsxspytimeout);
    this._jsxspytimeout = null;
    Interactive.hideSpy();
  };

  /**
   * called by 'window.setTimeout()' to display the spyglass hover for a given object;
   * @param strHTML {String} HTML/text to display in the spyglass; as the spyglass does not define a height/width, this content will
   *          have improved layout if it specifies a preferred width in its in-line-style or referenced-css rule.
   * @param intLeft {int | jsx3.gui.Event} use an integer to specify an on-screen location; otherwise, use a <code>jsx3.gui.Event</code> instance to have the system automatically calculate the x/y position.
   * @param intTop {int} use an integer if <code>intLeft</code> also uses an integer. Otherwise, use null.
   */
  Interactive_prototype.showSpy = function(strHTML,intLeft,intTop) {
    if (strHTML != null) {
      jsx3.require("jsx3.gui.Heavyweight");

      //make sure only one active spyglass at a time
      Interactive.hideSpy();

      //wrap the HTML that the user wants to display in the spy container (this provides the padding, bground (yellow), and mousemove logic to destroy the spyglass)
      strHTML = '<span class="jsx30spyglassbuffer"><div class="jsx30spyglass">' + strHTML + '</div></span>';

      //create the HW instance to hold the spy content
      var objHW = new jsx3.gui.Heavyweight("_jsxspy", this);
      objHW.setHTML(strHTML);
      objHW.setRatio(1.4);
      
      if(intLeft instanceof Event) {
        objHW.addXRule(intLeft,"W","W",12);
        objHW.addXRule(intLeft,"E","E",-12);
        objHW.addYRule(intLeft,"S","N",6);
        objHW.addYRule(intLeft,"N","S",-6);
      } else {
        objHW.addRule(intLeft,"W",-2,"X");
        objHW.addRule(intLeft,"E",12,"X");
        objHW.addRule(null,"W",-24,"X");
        objHW.addRule(intTop,"N",-2,"Y");
        objHW.addRule(intTop,"S",-6,"Y");
        objHW.setOverflow(jsx3.gui.Block.OVERFLOWEXPAND);
      }
      objHW.show();

      //ensures the spyglass content has the appropriate ratio, so that when painted, the heavyweight is in a readable dimension
      var objGUI = objHW.getRendered(); // may be null of somehow the hw anchor disappeared
      if (objGUI) {
        var body = objGUI.ownerDocument.getElementsByTagName("body")[0];
        //var myHeight = body.offsetHeight - (objGUI.childNodes[0].offsetHeight + parseInt(objGUI.style.top));
        //if (myHeight < 0)
        //  objGUI.style.top = parseInt(objGUI.style.top) + myHeight + "px";
        if (parseInt(objGUI.style.width) + parseInt(objGUI.style.left) > body.offsetWidth)
          objHW.applyRules("X");
      }


      // subscribe/unsubscribe as needed
      Event.subscribe(jsx3.gui.Event.MOUSEDOWN, jsx3.gui.Interactive.hideSpy);
    }
  };

  Interactive.hideSpy = function() {
    if (jsx3.gui.Heavyweight) {
      var objGUI = jsx3.gui.Heavyweight.GO("_jsxspy");
      if (objGUI) {
        objGUI.destroy();
        // subscribe/unsubscribe as needed
        Event.unsubscribe(jsx3.gui.Event.MOUSEDOWN, jsx3.gui.Interactive.hideSpy);
      }
    }
  };

  /**
   * Returns the CSS definition to apply to an HTML element when a spyglass is shown for that element.
   * @return {String}
   * @private
   */
  Interactive_prototype.getSpyStyles = function(strDefault) {
    return (this.jsxspystyle) ? this.jsxspystyle : ((strDefault) ? strDefault : null);
  };


  /**
   * Sets the CSS definition to apply to an HTML element when a spyglass is shown for that element
   * @param strCSS {String} valid CSS. For example, text-decoration:underline;color:red;
   */
  Interactive_prototype.setSpyStyles = function(strCSS) {
    //remove cached transient values used for the live session
    delete this._jsxcachedspystyles;
    delete this._jsxunspystyles;

    //remove values set using old syntax
    delete this.jsxspystylekeys;
    delete this.jsxspystylevalues;

    //set value using the new syntax
    this.jsxspystyle = strCSS;
  };


  /** @private @jsxobf-clobber */
  Interactive_prototype._resolveSpyStyle = function() {
    var map = {};
    if(jsx3.util.strEmpty(this.getSpyStyles()) && this.jsxspystylekeys != null) {
      //old serialization syntax is used get structure from the named properties: jsxspystylekeys and jsxspystylevalues
      var keys = (this.jsxspystylekeys || "").split(/ *; */);
      var values = (this.jsxspystylevalues || "").split(/ *; */);
      for (var i = 0; i < keys.length; i++)
        map[keys[i]] = values[i];
    } else {
      //new serialization syntax is used; get structure from the named property, jsxspystyle
      var strStyles = this.getSpyStyles(Interactive.FOCUS_STYLE);
      var re = /(-\S)/gi;
      var map = {};
      var objStyles = strStyles.split(";");
      for(var i=0;i<objStyles.length;i++) {
        var curStyle = objStyles[i] + "";
        var objStyle = curStyle.split(":");
        if(objStyle && objStyle.length == 2) {
          var strStyleName = objStyle[0].replace(re,function($0,$1) {
                                                      return $1.substring(1).toUpperCase();
                                                    });
          map[strStyleName] = objStyle[1];
        }
      }
    }
    return map;
  };


  /**
   * applies the style
   * @private
   */
  Interactive_prototype.applySpyStyle = function(objGUI) {
    if (this._jsxcachedspystyles == null)
      /* @jsxobf-clobber */
      this._jsxcachedspystyles = this._resolveSpyStyle();

    if (this._jsxunspystyles == null) {
      /* @jsxobf-clobber */
      this._jsxunspystyles = {};
      for (var f in this._jsxcachedspystyles)
        this._jsxunspystyles[f] = objGUI.style[f];
    }

    try {
      for (var f in this._jsxcachedspystyles)
        objGUI.style[f] = this._jsxcachedspystyles[f];
    } catch (e) {}
  };


  /**
   * removes the style
   * @private
   */
  Interactive_prototype.removeSpyStyle = function(objGUI) {
    try {
      for (var f in this._jsxunspystyles)
        objGUI.style[f] = this._jsxunspystyles[f];
    } catch (e) {}
  };


///////////////////////////// Methods for convenient handling of hot-key capturing /////////////////////////////////

  /**
   * check all registered hotkeys against the current event and capture the event if there is a match
   * @private
   */
  Interactive_prototype.checkHotKeys = function(objEvent) {
    if (this._jsxhotkeys == null) return false;
    if (objEvent.isModifierKey()) return false;

    var oneOrMore = false;
    var inModal = objEvent.getAttribute("jsxmodal");

    for (var f in this._jsxhotkeys) {
      var objKey = this._jsxhotkeys[f];
      if (objKey instanceof jsx3.gui.HotKey) {
        if (objKey.isDestroyed()) {
          delete this._jsxhotkeys[f];
          continue;
        } else if (! objKey.isEnabled()) {
          continue;
        }

        if (objKey.isMatch(objEvent)) {
          var capture = true;
          if (! inModal)
            capture = objKey.invoke(this, [objEvent]);
          if (capture !== false)
            oneOrMore = true;
        }
      }
    }

    if (oneOrMore)
      objEvent.cancelAll();

    return oneOrMore;
  };

  /**
   * Registers a hot key with this JSX model node. All <code>keydown</code> events that bubble up to this object
   * will be checked against the hot key. If an event matches, the callback function will execute and the event
   * bubble will be canceled.
   * <p/>
   * If the four parameters <code>vntKey</code>, <code>bShift</code>, <code>bControl</code>, and <code>bAlt</code>
   * match a previously registered hot key, the previous hot key is clobbered by the new one. Only one hot key callback
   * function (the most recently registered) will be executed by a single keydown event.
   *
   * @param vntCallback {String|Function|jsx3.gui.HotKey} either a function, or the name of a method bound to this object.
   *    When a keydown event bubbles up to this object that matches the hot key created by this method, this function
   *    is called on this object. If this function returns <code>false</code> then this hot key will not cancel the
   *    key event. This parameter can also be an instance of <code>HotKey</code>, in which case all
   *    other parameters are ignored.
   * @param vntKey {int|String} if this parameter is a String, the hot key matches that key (the keycode to match is
   *    determined by <code>HotKey.keyDownCharToCode()</code>). If it is an integer, the hot key will match that
   *    keycode value.
   * @param bShift {boolean} if not <code>null</code> the shift key state of the keydown event must match this value
   *    to invoke the hot key.
   * @param bControl {boolean} if not <code>null</code> the control key state of the keydown event must match this value
   *    to invoke the hot key.
   * @param bAlt {boolean} if not <code>null</code> the alt key state of the keydown event must match this value
   *    to invoke the hot key.
   * @return {jsx3.gui.HotKey} the registered hot key.
   *
   * @see jsx3.gui.HotKey#keyDownCharToCode()
   */
  Interactive_prototype.registerHotKey = function(vntCallback, vntKey, bShift, bControl, bAlt) {
    var objKey;
    if (vntCallback instanceof jsx3.gui.HotKey) {
      objKey = vntCallback;
    } else {
      var fntCallback = typeof(vntCallback) == 'function' ? vntCallback : this[vntCallback];

      if (!(typeof(fntCallback) == "function"))
        throw new jsx3.IllegalArgumentException("vntCallback", vntCallback);

      // will throw exception if vntKey is invalid
      objKey = new jsx3.gui.HotKey(fntCallback, vntKey, bShift, bControl, bAlt);
    }

    if (this._jsxhotkeys == null)
      this._jsxhotkeys = {length:0};

    var keyKey = objKey.getKey();
    // only increment length of hash if we aren't clobbering existing key
    this._jsxhotkeys.length += this._jsxhotkeys[keyKey] ? 0 : 1;

    // clobber existing key
    // QUESTION: should this print a warning?
    this._jsxhotkeys[keyKey] = objKey;

    return objKey;
  };

  /**
   * whether this object has at least one hot key bound to it
   * @private
   */
  Interactive_prototype.hasHotKey = function() {
    return this._jsxhotkeys != null && this._jsxhotkeys.length > 0;
  };

  /**
   * controls whether to paint the necessary event handlers to check for hotkeys whether or not hotkeys are registered at the time of paint; use for objects like JSXROOT that are painted only once or infrequently
   * @package
   */
  Interactive_prototype.setAlwaysCheckHotKeys = function(bCheck) {
    this.jsxalwayscheckhk = bCheck;
    return this;
  };

  /**
   * @package
   */
  Interactive_prototype.getAlwaysCheckHotKeys = function() {
    return this.jsxalwayscheckhk;
  };

  /**
   * remove all hotkeys bound to this object
   * @private
   */
  Interactive_prototype.clearHotKeys = function() {
    /* @jsxobf-clobber */
    this._jsxhotkeys = null;
  };


  /**
   * Returns the release/build for the class (i.e., "2.2.00")
   * @return {String}
   * @deprecated
   */
  Interactive.getVersion = function() {
    return "3.00.00";
  };


  /** @package */
  Interactive_prototype.isOldEventProtocol = function() {
    var server = this.getServer();
    return server && server.getEnv("EVENTSVERS") < 3.1;
  };

  /** @private @jsxobf-clobber */
  Interactive_prototype._onInterDestroy = function(objParent) {
    this.doEvent(Interactive.DESTROY, {objPARENT:objParent});
  };

  jsx3.app.Model.jsxclass.addMethodMixin("onDestroy", Interactive.jsxclass, "_onInterDestroy");

});


/**
 * @deprecated  Renamed to jsx3.gui.Interactive
 * @see jsx3.gui.Interactive
 * @jsxdoc-definition  jsx3.Class.defineInterface("jsx3.Event", -, function(){});
 */
jsx3.Event = jsx3.gui.Interactive;


/**
 * @package
 */
jsx3.Class.defineClass("jsx3.EventHelp", null, null, function(EventHelp, EventHelp_prototype) {

  EventHelp.ONBEFOREDROP = 0;
  EventHelp.ONDROP = 1;
  EventHelp.ONCANCELDROP = 2;

  EventHelp.DRAGICONINDEX = 32000;
  EventHelp.DEFAULTSPYLEFTOFFSET = 5;
  EventHelp.DEFAULTSPYTOPOFFSET = 5;
  EventHelp.SPYDELAY = 300;
  EventHelp.FLAG = 0;
  /* @jsxobf-clobber */
  EventHelp._dragging = false;

  EventHelp.yOff = 0;
  EventHelp.xOff = 0;

  /* @jsxobf-clobber */
  EventHelp.curDragObject = null;

  EventHelp.beginTrackMouse = function(objEvent) {
    jsx3.gui.Event.subscribe(jsx3.gui.Event.MOUSEMOVE, EventHelp.mouseTracker);
    jsx3.gui.Event.subscribe(jsx3.gui.Event.MOUSEUP, EventHelp.mouseUpTracker);
    //LUKE: removed following to avoid drag icon appearing on a mouse down.  corrupts drag/drop
    //    EventHelp.doMouseMove(objEvent);
  };

  EventHelp.endTrackMouse = function() {
    jsx3.gui.Event.unsubscribe(jsx3.gui.Event.MOUSEMOVE, EventHelp.mouseTracker);
    jsx3.gui.Event.unsubscribe(jsx3.gui.Event.MOUSEUP, EventHelp.mouseUpTracker);
  };

  EventHelp.mouseTracker = function(objEvent) {
    EventHelp.doMouseMove(objEvent.event);
  };

  EventHelp.mouseUpTracker = function(objEvent) {
    EventHelp.reset();
  };

  /**
   * Returns a generic drag icon when a drag is about to occur on a JSX GUI object that does not implement a custom drag icon function of its own
   * @param objGUI {HTMLElement} HTML element that received the mousedown event that initiated the drag
   * @param objJSXTarget {jsx3.gui.Painted} JSX object that received the event
   * @param strDragType {String} JSX_GENERIC
   * @param strDragItemId {String} jsxid for <code>objJSXTarget</code>
   * @return {String} HTML content to follow the mouse pointer during the drag
   */
  EventHelp.drag = function(objGUI, objJSXTarget, strDragType, strDragItemId) {
    var strText = (objGUI && objGUI.innerHTML) ? jsx3.util.strTruncate((objGUI.innerHTML+"").replace(/<[^>]*>/gi," "),25,"...",.5) : "... ... ...";
    return "<span class='jsx30block_drag'>" + strText + "</span>";
  };

  /**
   * called when the user's mouse moves across the screen, but only executes its code if 'jsx3.EVENT.curDragObject' (an object pointer to some on-screen HTML object) != null
   * @param objEvent {jsx3.gui.Event}
   * @private
   */
  EventHelp.doMouseMove = function(objEvent) {
    //only move if drag flag is on (the  || is for legacy development)
    if (EventHelp.FLAG == 1 || EventHelp.FLAG == 3) {
      var doc = EventHelp.curDragObject.ownerDocument;

      if (EventHelp.FLAG == 1) {
        if (! EventHelp.constrainX)
          EventHelp.curDragObject.style.left = objEvent.getTrueX() + EventHelp.xOff + "px";
        if (! EventHelp.constrainY)
          EventHelp.curDragObject.style.top = objEvent.getTrueY() + EventHelp.yOff + "px";
      } else {
        var dX = objEvent.getTrueX() - EventHelp.startX;
        var dY = objEvent.getTrueY() - EventHelp.startY;
        var leftTop = EventHelp["dragRounder"](EventHelp.xOff + dX, EventHelp.yOff + dY, objEvent);

        if (leftTop[0] != EventHelp.offsetLeft || leftTop[1] != EventHelp.offsetTop) {
          if(!isNaN(leftTop[0])) EventHelp.curDragObject.style.left = leftTop[0] + "px";
          if(!isNaN(leftTop[1])) EventHelp.curDragObject.style.top = leftTop[1] + "px";
        }
      }

/*
      //When users drag DIV objects, stop cursor from 'highlighting' on-screen text by giving focus to a hidden image
      if (EventHelp.objMyRange != null && typeof(EventHelp.objMyRange.text) != 'undefined') {
        try {
          EventHelp.objMyRange.moveToElementText(doc.all.body);
          EventHelp.objMyRange.select();
          EventHelp.objMyRange.collapse();
        } catch(e) {
          //if user had cursor in a text box or textarea, this will stop range object selection errors
          try {
            if(jsx3.CLASS_LOADER.IE) doc.selection.empty();
          } catch (e){}
        } finally {
          EventHelp.objMyRange = null;
        }
      }
*/
    } else if (EventHelp.FLAG == 2) {
      var doc = EventHelp.JSXID.getDocument();

      // remove existing drag icon
      var drag = doc.getElementById("_jsxdrag");
      if (drag) jsx3.html.removeNode(drag);

      //get handle to the document body (we will need to reference this multiple times)
      var objBody = doc.getElementsByTagName("body")[0];

      //LUKE: increased due to lost mouse
      EventHelp.xOff = 10;
      EventHelp.yOff = 10;

      //set a selection range (NOTE: this is used by 'doMouseMove()' to stop drag operations from highlighting screen text)
      jsx3.gui.Event.preventSelection(doc);

      //insert this DIV into the document, so the user can see the item they're trying to drag
      var strHTML =  '<div id="_jsxdrag"' + jsx3.html._UNSEL + ' style="position:absolute;left:' +
          ((EventHelp.constrainX) ? parseInt(EventHelp.curDragObject.style.left) : objEvent.getTrueX() + EventHelp.xOff) + 'px;top:' +
          ((EventHelp.constrainY) ? parseInt(EventHelp.curDragObject.style.top) : objEvent.getTrueY() + EventHelp.yOff) +
          'px;min-width:10px;z-index:' + EventHelp.DRAGICONINDEX + ';">' + EventHelp.dragItemHTML + '</div>';
      jsx3.html.insertAdjacentHTML(objBody, 'beforeEnd', strHTML);

      //set 'curDragObject' equal to the drag icon that follows the mouse, then show to user
      EventHelp.curDragObject = doc.getElementById("_jsxdrag");

      //set flag to '1'; this tells the controller to mirror the position of curdragobject to match the deltas in the mouse position
      EventHelp.FLAG = 1;
    } else {
      EventHelp.endTrackMouse();
    }
  };

  /**
   * after a drag, drop, or move operation is complete, this function is called to reset the properties
   *      in this class to NO LONGER point to/reference the item that was just dragged and dropped
   */
  EventHelp.reset = function() {
    //reset values that point to the item being dragged
    EventHelp.DRAGTYPE = null;
    EventHelp.DRAGID = null;
    EventHelp.DRAGIDS = null;
    EventHelp.FLAG = 0;
    EventHelp.endTrackMouse();

    //reset the on-screen item being dragged--if it was a drag drop, destroy the on-screen item.  If a simple move (like dragging a window, just dereference pointer, but don't destroy)
    if (EventHelp.curDragObject) {
      //erase the object that was just dropped if it was a draggable div that should only persist for the life of the drag
      if (EventHelp.curDragObject.id == "_jsxdrag")
        jsx3.html.removeNode(EventHelp.curDragObject);

      //release mouse capture if it's been set and release the object reference
      if (jsx3.CLASS_LOADER.IE) EventHelp.curDragObject.releaseCapture();
      EventHelp.curDragObject = null;

      //remove x/y constraints if any in place
      EventHelp.constrainX = false;
      EventHelp.constrainY = false;
    }
  };

  /**
   * Returns true if a drag/drop operation is underway
   * @return {boolean}
   * @private
   */
  EventHelp.isDragging = function() {
    return EventHelp.curDragObject != null && EventHelp._dragging;
  };

  /**
   * Returns handle to the drag icon (native HTML element)
   * @return {Object}
   * @private
   */
  EventHelp.getDragIcon = function() {
    return EventHelp.curDragObject;
  };

  /**
   * Returns JSX object instance which initiated the drag
   * @return {jsx3.gui.Painted}
   * @private
   */
  EventHelp.getDragSource = function() {
    return EventHelp.JSXID;
  };

  /**
   * Returns the 'type' for the drag. Currently the system identifies any CDF-type drag as being, 'JSX_GENERIC'
   * @return {String}
   * @private
   */
  EventHelp.getDragType = function() {
    return EventHelp.DRAGTYPE;
  };

  /**
   * Returns jsxid for CDF record being dragged
   * @return {String}
   * @private
   */
  EventHelp.getDragId = function() {
    return EventHelp.DRAGID;
  };

  /**
   * Returns array of jsxid(s) for CDF record(s) being dragged.
   * @return {Array<String>}
   * @private
   */
  EventHelp.getDragIds = function() {
    return (jsx3.$A.is(EventHelp.DRAGIDS)) ? EventHelp.DRAGIDS : [EventHelp.DRAGID];
  };

});/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

// @jsxobf-clobber  _onExecute

/**
 * Mixin interface allows implementors to show alerts, confirms, and prompts.
 *
 * @since 3.0
 */
jsx3.Class.defineInterface("jsx3.gui.Alerts", null, function(Alerts, Alerts_prototype) {

  var EXECUTE = "jsxexecute";

  /**
   * implementors of this mixin interface must implement this method
   * @return {jsx3.app.Model} the parent of the alert dialogs
   * @protected
   */
  Alerts_prototype.getAlertsParent = jsx3.Method.newAbstract();

  /**
   * Shows an alert dialog.
   * @param strTitle {String} the title of the dialog
   * @param strMessage {String} the message to display
   * @param fctOnOk {Function} callback function on pressing ok button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
   * @param strOk {String} the text of the ok button, can be false to remove button from display
   * @param objParams {Object} argument to configureAlert()
   * @return {jsx3.gui.Dialog}
   * @see #configureAlert()
   */
  Alerts_prototype.alert = function(strTitle, strMessage, fctOnOk, strOk, objParams) {
    var resolver = jsx3.net.URIResolver.JSX;
    var dialog = this.getAlertsParent().loadAndCache('xml/components/dialog_alert.xml', false, jsx3.getSharedCache(), resolver);
    var ok = dialog.getDescendantOfName('ok');

    if (strTitle != null)
      dialog.getDescendantOfName('title').setText(strTitle);
    if (strMessage != null)
      dialog.getDescendantOfName('message').setText(strMessage);

    if (strOk === false)
      dialog.hideButton();
    else if (strOk != null)
      ok.setText(strOk);

    if (fctOnOk != null) {
      var onExecute = "_onExecute";
      ok._onExecute = fctOnOk;
      ok.setEvent("this." + onExecute + "(this.getAncestorOfType(jsx3.gui.Dialog));", EXECUTE);
    }

    this.configureAlert(dialog, objParams);
    this.getAlertsParent().paintChild(dialog);
    dialog.focus();
    return dialog;
  };

  /**
   * Shows an input prompt alert.
   * @param strTitle {String} the title of the dialog
   * @param strMessage {String} the message to display
   * @param fctOnOk {Function} callback function on pressing ok button, receives the dialog as an argument, and the value of the text input as a second argument; if null the dialog will close itself; if defined must explicitly close the dialog
   * @param fctOnCancel {Function} callback function on pressing cancel button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
   * @param strOk {String} the text of the ok button
   * @param strCancel {String} the text of the cancel button
   * @param objParams {Object} argument to configureAlert()
   * @return {jsx3.gui.Dialog}
   * @see #configureAlert()
   */
  Alerts_prototype.prompt = function(strTitle, strMessage, fctOnOk, fctOnCancel, strOk, strCancel, objParams) {
    var resolver = jsx3.net.URIResolver.JSX;
    var dialog = this.getAlertsParent().loadAndCache('xml/components/dialog_prompt.xml', false, jsx3.getSharedCache(), resolver);
    var ok = dialog.getDescendantOfName('ok');
    var cancel = dialog.getDescendantOfName('cancel');

    if (strTitle != null)
      dialog.getDescendantOfName('title').setText(strTitle);
    if (strMessage != null)
      dialog.getDescendantOfName('message').setText(strMessage);
    if (strOk != null)
      ok.setText(strOk);
    if (strCancel != null)
      cancel.setText(strCancel);
    if (fctOnOk != null) {
      var onExecute = "_onExecute";
      ok._onExecute = fctOnOk;
      ok.setEvent("var d = this.getAncestorOfType(jsx3.gui.Dialog); this." + onExecute + "(d, d.getDescendantOfName('value').getValue());", EXECUTE);
    }
    if (fctOnCancel != null) {
      var onExecute = "_onExecute";
      cancel._onExecute = fctOnCancel;
      cancel.setEvent("this." + onExecute + "(this.getAncestorOfType(jsx3.gui.Dialog));", EXECUTE);
    }

    this.configureAlert(dialog, objParams);
    this.getAlertsParent().paintChild(dialog);
    jsx3.sleep(function(){dialog.getDescendantOfName('value').focus();});
    return dialog;
  };

  /**
   * Shows a confirm alert.
   * @param strTitle {String} the title of the dialog
   * @param strMessage {String} the message to display
   * @param fctOnOk {Function} callback function on pressing ok button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
   * @param fctOnCancel {Function} callback function on pressing cancel button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
   * @param strOk {String} the text of the ok button
   * @param strCancel {String} the text of the cancel button
   * @param intBtnDefault {int} the bold button that receives return key, 1:ok, 2:cancel, 3:no
   * @param fctOnNo {Function} callback function on pressing no button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
   * @param strNo {String} the text of the no button
   * @param objParams {Object} argument to configureAlert()
   * @return {jsx3.gui.Dialog}
   * @see #configureAlert()
   */
  Alerts_prototype.confirm = function(strTitle, strMessage, fctOnOk, fctOnCancel, strOk, strCancel, intBtnDefault,
      fctOnNo, strNo, objParams) {
    var resolver = jsx3.net.URIResolver.JSX;
    var dialog = this.getAlertsParent().loadAndCache('xml/components/dialog_confirm.xml', false, jsx3.getSharedCache(), resolver);
    var ok = dialog.getDescendantOfName('ok');
    var cancel = dialog.getDescendantOfName('cancel');
    var no = dialog.getDescendantOfName('no');
    var buttons = [ok, cancel, no];
    intBtnDefault = intBtnDefault != null ? intBtnDefault - 1 : 0;

    if (strTitle != null)
      dialog.getDescendantOfName('title').setText(strTitle);
    if (strMessage != null)
      dialog.getDescendantOfName('message').setText(strMessage);
    if (strOk != null)
      ok.setText(strOk);
    if (strCancel != null)
      cancel.setText(strCancel);
    if (fctOnCancel != null) {
      var onExecute = "_onExecute";
      cancel._onExecute = fctOnCancel;
      cancel.setEvent("this." + onExecute + "(this.getAncestorOfType(jsx3.gui.Dialog));", EXECUTE);
    }
    if (fctOnOk != null) {
      var onExecute = "_onExecute";
      ok._onExecute = fctOnOk;
      ok.setEvent("this." + onExecute + "(this.getAncestorOfType(jsx3.gui.Dialog));", EXECUTE);
    }
    if (fctOnNo != null || strNo != null || intBtnDefault == 3) {
      if (strNo)
        no.setText(strNo);
      if (fctOnNo) {
        var onExecute = "_onExecute";
        no._onExecute = fctOnNo;
        no.setEvent("this." + onExecute + "(this.getAncestorOfType(jsx3.gui.Dialog));", EXECUTE);
      }
      no.setDisplay(jsx3.gui.Block.DISPLAYBLOCK);
    }

    var defaultBtn = buttons[intBtnDefault];
    if (defaultBtn) {
      defaultBtn.setFontWeight('bold');

      dialog.registerHotKey(function(objEvent) {
        if (objEvent.enterKey()) {
          this.getDescendantOfName(defaultBtn.getName()).doExecute(objEvent);
          objEvent.cancelBubble();
        }
      }, jsx3.gui.Event.KEY_ENTER, false, false, false);
    }

    this.configureAlert(dialog, objParams);
    this.getAlertsParent().paintChild(dialog);
    dialog.focus();
    return dialog;
  };

  /**
   * Configures the alert dialog.
   * @param objDialog {jsx3.gui.Dialog} the dialog
   * @param objParams {Object} may include fields 'width' {int}, 'height' {int},
   *     'noTitle' {boolean}, and 'nonModal' {boolean}.
   * @protected
   */
  Alerts_prototype.configureAlert = function(objDialog, objParams) {
    if (objParams == null) return;

    if (objParams.width)
      objDialog.setWidth(objParams.width, false);
    if (objParams.height)
      objDialog.setHeight(objParams.height, false);

    if (objParams.noTitle)
      objDialog.removeChild(objDialog.getChild('title'));

    if (objParams.nonModal)
      objDialog.setModal(jsx3.gui.Dialog.NONMODAL);
  };

});


/**
 * @deprecated  Renamed to jsx3.gui.Alerts.
 * @see jsx3.gui.Alerts
 * @jsxdoc-definition  jsx3.Class.defineInterface("jsx3.Alerts", -, function(){});
 */
jsx3.Alerts = jsx3.gui.Alerts;
/*
 * Copyright (c) 2001-2011, TIBCO Software Inc.
 * 
 * The program(s) herein may be used and/or copied only with the 
 * written permission of Intalio Inc. or in accordance with the terms 
 * and conditions stipulated in the agreement/contract under which the 
 * program(s) have been supplied.
 */

jsx3.require("jsx3.gui.Painted", "jsx3.gui.Interactive");

/**
 * This class provides a container-based, object-oriented approach to creating static html objects (basically this class creates "DIV" objects).  This class is useful for creating objects as simple as 'labels' that can be placed anywhere on the screen.  The advantage to using this class instead of trying to insert static html in the html window is that it allows the given HTML string to be managed by the 'container-management' strategy employed by the JSX Architecture
 */
jsx3.Class.defineClass("jsx3.gui.Block", jsx3.gui.Painted, [jsx3.gui.Interactive], function(Block, Block_prototype) {

  var Event = jsx3.gui.Event;
  var Interactive = jsx3.gui.Interactive;


  /**
   * {int} 16
   * @deprecated
   */
  Block.SCROLLSIZE = 16;


  /**
   * {int} 1
   * @final @jsxobf-final
   */
  Block.OVERFLOWSCROLL = 1;

  /**
   * {int} 2
   * @final @jsxobf-final
   */
  Block.OVERFLOWHIDDEN = 2;

  /**
   * {int} 3 (default)
   * @final @jsxobf-final
   */
  Block.OVERFLOWEXPAND = 3;

  /**
   * {String} Verdana
   */
 Block.DEFAULTFONTNAME = "Verdana";

  /**
   * {int} 10
   */
  Block.DEFAULTFONTSIZE = 10;

  /**
   * {String} #000000
   */
  Block.DEFAULTCOLOR = "#000000";

  /**
   * {String} &amp;#160;
   */
  Block.DEFAULTTEXT = "&#160;";

  /**
   * {String} jsx30block
   */
  Block.DEFAULTCLASSNAME = "jsx30block";

  /**
   * {String} span
   */
  Block.DEFAULTTAGNAME = "span";

  /**
   * {String} bold
   * @final @jsxobf-final
   */
  Block.FONTBOLD = "bold";

  /**
   * {String} normal (default)
   * @final @jsxobf-final
   */
  Block.FONTNORMAL = "normal";

  /**
   * {String} [empty string] (default)
   * @final @jsxobf-final
   */
  Block.DISPLAYBLOCK = "";

  /**
   * {String} none
   * @final @jsxobf-final
   */
  Block.DISPLAYNONE = "none";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Block.VISIBILITYVISIBLE = "visible";

  /**
   * {String}
   * @final @jsxobf-final
   */
  Block.VISIBILITYHIDDEN = "hidden";

  /**
   * {int} -1
   * @deprecated
   */
  Block.NULLSTYLE = -1;

  /**
   * {String} left (default)
   * @final @jsxobf-final
   */
  Block.ALIGNLEFT = "left";

  /**
   * {String} center
   * @final @jsxobf-final
   */
  Block.ALIGNCENTER = "center";

  /**
   * {String} right
   * @final @jsxobf-final
   */
  Block.ALIGNRIGHT = "right";

  /**
   * {int} 0
   * @final @jsxobf-final
   */
  Block.ABSOLUTE = 0;

  /**
   * {int} 1 (default)
   * @final @jsxobf-final
   */
  Block.RELATIVE = 1;

  /**
   * {Object<String, boolean>} {NN: false, EE: false, SS: false, WW: false, MM: false}
   * @private
   */
  Block.MASK_NO_EDIT = jsx3.gui.Painted.MASK_NO_EDIT;

  /**
   * {Object<String, boolean>} {NN: true, EE: true, SS: true, WW: true, MM: true}
   * @private
   */
  Block.MASK_ALL_EDIT = jsx3.gui.Painted.MASK_ALL_EDIT;

  /**
   * {Object<String, boolean>} {MM: true}
   * @private
   */
  Block.MASK_MOVE_ONLY = {MM: true};

  /**
   * {Object<String, boolean>} edit mask for only East edit
   * @private
   */
  Block.MASK_EAST_ONLY = {NN: false, EE: true, SS: false, WW: false, MM: false};

  /**
   * {String} JSX/images/spc.gif
   */
  Block.SPACE = jsx3.resolveURI("jsx:///images/spc.gif");

  /* @JSC */ if (jsx3.CLASS_LOADER.IE6) {
    jsx3.html.loadImages(Block.SPACE);
  /* @JSC */ }
  /**
   * instance initializer
   * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
   * @param vntLeft {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
   * @param vntTop {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
   * @param vntWidth {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
   * @param vntHeight {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
   * @param strHTML {String} Text/HTML markup to place in the jsx3.gui.Block instance
   */
   Block_prototype.init = function(strName,vntLeft,vntTop,vntWidth,vntHeight,strHTML) {
    //call constructor for super class (the super expects the name of the object and the function that it is an instance of)
    this.jsxsuper(strName);

    //set position,dimension, and text values
    if (vntLeft != null) this.setLeft(vntLeft);
    if (vntTop != null) this.setTop(vntTop);
    if (vntWidth != null) this.setWidth(vntWidth);
    if (vntHeight != null) this.setHeight(vntHeight);
    if (strHTML != null) this.setText(strHTML);
  };

  /**
   * Returns valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0))
   * @return {String} valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0))
   */
  Block_prototype.getBackgroundColor = function() {
    return this.jsxbgcolor;
  };

  /**
   * Sets valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0));
   *            returns reference to self to facilitate method chaining;
   * @param strColor {String} valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0))
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setBackgroundColor = function(strColor,bUpdateView) {
    this.jsxbgcolor = strColor;

    //immediately upate view if user passed true for repaint
    if (bUpdateView) this.updateGUI("backgroundColor",(strColor==Block.NULLSTYLE) ? "" : strColor);
    return this;
  };

  /**
   * Returns valid CSS property value for the background such as:  background-image:url(x.gif);  or background-image:url(x.gif);background-repeat:no-repeat;
   * @return {String} valid CSS property for the background such as:  background-image:url(x.gif);  or background-image:url(x.gif);background-repeat:no-repeat;
   */
  Block_prototype.getBackground = function() {
    return this.jsxbg;
  };

  /**
   * Sets valid CSS property value for the background such as:  background-image:url(x.gif);  or background-image:url(x.gif);background-repeat:no-repeat;
   *            returns reference to self to facilitate method chaining;
   * @param strBG {String} valid CSS property value for the background such as:  background-image:url(x.gif);  or background-image:url(x.gif);background-repeat:no-repeat;
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setBackground = function(strBG) {
    this.jsxbg = strBG;
    return this;
  };

  /**
   * Returns CSS property value(s) for a border (border: solid 1px #000000)
   * @return {String}
   */
  Block_prototype.getBorder = function() {
    return this.jsxborder;
  };

  /**
   * Sets CSS property value(s) for a border (<code>border: solid 1px #000000</code>). Properties can be strung
   * together as in: <code>border:solid 1px #989885;border-left-width:0px;</code>
   * @param strCSS {String} valid CSS property value for a border (border: solid 1px #000000)
   * @param bUpdateView {Boolean} if true, the view will be updated with requiring a repaint
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setBorder = function(strCSS,bUpdateView) {
    this.jsxborder = strCSS;
    if (bUpdateView)
      this.recalcBox(["border"]);
    else
      this.setBoxDirty();

    return this;
  };

  /**
   * Returns valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0))
   * @return {String} valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0))
   */
  Block_prototype.getColor = function() {
    return this.jsxcolor;
  };

  /**
   * Sets valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0));
   *            returns reference to self to facilitate method chaining;
   * @param strColor {String} valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0))
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setColor = function(strColor,bUpdateView) {
    this.jsxcolor = strColor;

    //immediately upate view if user passed true for repaint
    if (bUpdateView) this.updateGUI("color",(strColor==Block.NULLSTYLE) ? "" : strColor);
    return this;
  };

  /**
   * Returns valid CSS property value, (e.g., default,wait,col-resize); if no value or an empty string, null is returned
   * @return {String} valid CSS property value, (e.g., default,wait,col-resize)
   */
  Block_prototype.getCursor = function() {
    return this.jsxcursor;
  };

  /**
   * Sets valid CSS property value, (e.g., default,wait,col-resize)
   * @param strCursor {String} valid CSS property value, (e.g., default,wait,col-resize)
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   */
  Block_prototype.setCursor = function(strCursor,bUpdateView) {
    this.jsxcursor = strCursor;

    //immediately upate view if user passed true for repaint
    if (bUpdateView) this.updateGUI("cursor",strCursor);
    return this;
  };

  /**
   * Returns CSS text to override the standard instance properties on the painted object.
   * @return {String} CSS text
   */
  Block_prototype.getCSSOverride = function() {
    return this.jsxstyleoverride;
  };

  /**
   * Sets CSS text to override the standard instance properties on the painted object. Convenience method for extending this object. CSS properties affecting layout, including <code>border-width, padding, margin, width, and height</code>
   * are strongly discouraged, as they may interfere with the framework's internal box models.
   * Since some controls are composited from multiple HTML elements, some styles may not cascade to nested elements.
   * <b>Instance Properties</b> are the preferred method for applying styles.
   * @param strCSS {String} CSS text.  For example, <code>color:red;background-color:orange;</code>
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setCSSOverride = function(strCSS) {
    this.jsxstyleoverride = strCSS;
    return this;
  };

  /**
   * Returns the named CSS rule(s) to apply to the painted object.
   * @return {String}
   */
  Block_prototype.getClassName = function() {
    return this.jsxclassname;
  };

  /**
   * Sets the named CSS rule(s) to apply to the painted object. Rules that specify <code>border-width, padding, margin, width, and height</code> are strongly discouraged.
   * Multiple rules may be specified, delimited with a space.  For example, <code>label emphasis</code>.
   * Since some controls are composited from multiple HTML elements, some rule styles may not cascade to nested elements.
   * <b>Dynamic Properties</b> are the preferred method for applying global styles.
   * @param strClassName {String} CSS property name without the leading "."
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setClassName = function(strClassName) {
    this.jsxclassname = strClassName;
    return this;
  };

  /**
   * Returns the CSS display for the object; one of jsx3.gui.Block.DISPLAYNONE (display:none;) and jsx3.gui.Block.DISPLAYBLOCK (display:;)
   * @return {String}
   */
  Block_prototype.getDisplay = function() {
    return this.jsxdisplay;
  };

  /**
   * Sets the display for the object. Note that although the framework uses CSS to apply this setting, the actual values that get set are determined by the system.
   * Only those parameters listed for @DISPLAY are supported as inputs to this function.
   * @param DISPLAY {String} one of <code>jsx3.gui.Block.DISPLAYNONE</code> or <code>jsx3.gui.Block.DISPLAYBLOCK</code>
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setDisplay = function(DISPLAY, bUpdateView) {
    if (this.jsxdisplay != DISPLAY) {
      //update the model
      this.jsxdisplay = DISPLAY;

      //immediately update the view if user passed true for bUpdateView
      if (bUpdateView) {
        //unfortunately the 'display' property is NOT ONLY used as a way to show/hide content.
        //it also serves as a way to make spans behave consistently across the various browser modes (strict, quirks, xhtml, etc)
        if (DISPLAY != Block.DISPLAYNONE) {
          var b1 = this.getBoxProfile();
          if(!(this.getRelativePosition() == Block.ABSOLUTE || (b1 && b1.getBoxType() != "relativebox"))) {
            //3.6: fixed bug in fx 3 exposed by a trailing semicolon in the property value -- it's always been a bug, but FX3 chokes on it
            var oX = jsx3.gui.Painted.Box.getCssFix().replace(/display:([^;]*);?/i,"$1");
            if(!jsx3.util.strEmpty(oX)) DISPLAY = oX;
          }
        }
        if(DISPLAY == Block.DISPLAYNONE)
          jsx3.html.persistScrollPosition(this.getRendered());
        this.updateGUI("display",DISPLAY);
        if(DISPLAY != Block.DISPLAYNONE) {
          // call method to tell any descendants that the view was restored
          jsx3.gui.Painted._onAfterRestoreViewCascade(this,this.getRendered());
          jsx3.html.restoreScrollPosition(this.getRendered());
        }
      }
    }
    return this;
  };


  /**
   * Returns the CSS font-family for the object
   * @return {String} valid CSS font-family property value
   */
  Block_prototype.getFontName = function() {
    return this.jsxfontname;
  };

  /**
   * Sets the CSS font-family for the object;
   *            returns reference to self to facilitate method chaining;
   * @param strFontName {String} valid CSS font-family property value
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setFontName = function(strFontName) {
    this.jsxfontname = strFontName;
    return this;
  };

  /**
   * Returns the CSS font-size for the object
   * @return {int} font-size (in pixels)
   */
  Block_prototype.getFontSize = function() {
    return this.jsxfontsize;
  };

  /**
   * Sets the CSS font-size for the object;
   *            returns reference to self to facilitate method chaining;
   * @param intPixelSize {int} font-size (in pixels)
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setFontSize = function(intPixelSize) {
    this.jsxfontsize = intPixelSize;
    return this;
  };

  /**
   * Returns the CSS font-weight for the object ("bold" or "normal")
   * @return {String} [jsx3.gui.Block.FONTBOLD. jsx3.gui.Block.FONTNORMAL]
   */
  Block_prototype.getFontWeight = function() {
    return this.jsxfontweight;
  };

  /**
   * Sets the CSS font-weight for the object ("bold" or "normal");
   *            returns reference to self to facilitate method chaining;
   * @param FONTWEIGHT {String} [jsx3.gui.Block.FONTBOLD. jsx3.gui.Block.FONTNORMAL]
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setFontWeight = function(FONTWEIGHT) {
    this.jsxfontweight = FONTWEIGHT;
    return this;
  };

  /**
   * Returns the height property of this object.
   * @return {int | String} height.
   */
  Block_prototype.getHeight = function() {
    return this.jsxheight;
  };

  /**
   * Sets the height property of this object.
   * @param vntHeight {int | String} the height as a non-negative integer or non-negative percentage. For example: 45%, 12.
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   * @return {jsx3.gui.Block} this object.
   */
  Block_prototype.setHeight = function(vntHeight,bUpdateView) {
    //update the model
    this.jsxheight = vntHeight;

    //update the boxprofile
    if (bUpdateView) {
      this.syncBoxProfile({height:vntHeight}, true);
    } else {
      this.setBoxDirty();
    }

    return this;
  };

  /**
   * Returns IE tab index for setting the tabIndex property for the on-screen DHTML for the object
   * @return {int}
   */
  Block_prototype.getIndex = function() {
    return this.jsxindex;
  };

  /**
   * Sets IE tab index for setting the tabIndex property for the on-screen DHTML for the object;
   *            returns reference to self to facilitate method chaining;
   * @param intIndex {int} any value in the valid range of -32767 to 32767
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setIndex = function(intIndex,bUpdateView) {
    this.jsxindex = intIndex;
    if (bUpdateView) {
      var objGUI = this.getRendered();
      if (objGUI != null) objGUI.tabIndex = intIndex;
    }
    return this;
  };


  /**
   * Returns the first JSX parent (as a JSX instance in the model) of @objGUI (an HTML element in the view); returns null if no jsx parent could be found
   * @param objGUI {HTMLElement} HTML element in the view from which to begin looking for the first containing JSX parent in the model
   * @return {jsx3.gui.Block} JSX object
   * @deprecated  Use <code>jsx3.html.getJSXParent()</code> instead.
   */
  Block.getJSXParent = function(objGUI) {
    return jsx3.html.getJSXParent(objGUI);
  };


  /**
   * Returns the left property of this object.
   * @return {int|String} left.
   */
  Block_prototype.getLeft = function() {
    return this.jsxleft;
  };

  /**
   * Sets the left property of this object. The left property specifies the horizontal offset of this object
   * from its parent and only applies if this object is absolutely positioned.
   * @param vntLeft {int|String} the left value. Only numeric values and percentages are supported. For example: 25, -10, 20%.
   * @param bUpdateView {boolean} if @vntLeft is in integer (a number with no modifier) and @bUpdateView is true, the object's on-screen view is immediately updated to match its model, obviating the need to call '[object].repaint()'
   * @return {jsx3.gui.Block} this object.
   */
  Block_prototype.setLeft = function(vntLeft,bUpdateView) {
    //update the model
    this.jsxleft = vntLeft;

    if (bUpdateView) {
      if (isNaN(vntLeft)) vntLeft = 0;
      this.syncBoxProfile({left:vntLeft}, true);
    } else {
      this.clearBoxProfile(false);
    }

    return this;
  };

  /**
   * Set one to four dimensions at once. This operation is more efficient than calling more than one of
   * <code>setLeft</code>, <code>setTop</code>, etc. Any argument can be <code>null</code> to indicate not to update it.
   *
   * @param left {int|String|Array<int|String>} the new left value or an array containing all four new values
   * @param top {int|String} the new top value
   * @param width {int|String} the new width value
   * @param height {int|String} the new height value
   * @param bUpdateView {boolean} whether to update the display of this object immediately. If <code>left</code> is
   *    an <code>Array</code> then this parameter is the second parameter passed to this method.
   */
  Block_prototype.setDimensions = function(left, top, width, height, bUpdateView) {
    if (jsx3.$A.is(left)) {
      bUpdateView = top;
      height = left[3];
      width = left[2];
      top = left[1];
      left = left[0];
    }

    if (left   != null) this.jsxleft   = left;
    if (top    != null) this.jsxtop    = top;
    if (width  != null) this.jsxwidth  = width;
    if (height != null) this.jsxheight = height;

    if (bUpdateView) {
      this.syncBoxProfile({left:this.jsxleft, top:this.jsxtop, width:this.jsxwidth, height:this.jsxheight}, true);
    } else {
      this.setBoxDirty();
    }
  };

  /**
   * Returns the dimensions in an array of four int values
   * @return {Array<int>} [left,top,width,height]
   */
  Block_prototype.getDimensions = function() {
    return [this.getLeft(), this.getTop(), this.getWidth(), this.getHeight()];
  };

  /**
   * Returns CSS property value(s) for a margin (margin:4px;)
   * @return {String}
   */
  Block_prototype.getMargin = function() {
    return this.jsxmargin;
  };

  /**
   * Sets CSS property value for margin.
   * @param strCSS {String} The preferred method to set margin is by moving clockwise, beginning with the <b>north</b>
   * compass position, <b>without</b> the pixel designation.  For example, to specify a top margin of 8 pixels, use <code>8 0 0 0</code>. CSS syntax is
   * supported, but requires that pixels be designated.  For example, using <code>margin:5px;margin-left:10px;</code>, is equivalent to
   * <code>5 5 5 10</code>.
   * @param bUpdateView {Boolean} if true, the view will be updated with requiring a repaint
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setMargin = function(strCSS,bUpdateView) {
    this.jsxmargin = strCSS;
    if (bUpdateView)
      this.recalcBox(["margin"]);
    else
      this.setBoxDirty();

    return this;
  };

  /**
   * Returns resizeMask property as an object array, defining what actions are available
   *            to the resizeMask for the given control (resize horizontally/vertically; is moveable, etc.)
   * @return {Object<String, int>} object array with boolean values for the following properties: NN,SS,EE,WW,MM
   * @private
   */
  Block_prototype.getMaskProperties = function() {
    var objProps = {};
    objProps.NN = true;
    objProps.SS = true;
    objProps.EE = true;
    objProps.WW = true;
    objProps.MM = this.getRelativePosition() == Block.ABSOLUTE;
    return objProps;
  };

  Block_prototype.doBeginMove = function(objEvent, objGUI) {
    if (objEvent.leftButton()) {
      this.jsxsupermix(objEvent, objGUI);
      Event.subscribe(Event.MOUSEUP,this,"doEndMove");
      objEvent.cancelAll(); // could by mouse down on image element
    }
  };

  Block_prototype.doEndMove = function(objEvent) {
    objEvent = objEvent.event;
    var objGUI = this.getRendered(objEvent);
    if (objEvent.leftButton()) {
      Event.unsubscribe(Event.MOUSEUP,this,"doEndMove");
      this.jsxsupermix(objEvent, objGUI);
    } else {
      this._ebMouseUp(objEvent, objGUI);
    }
  };

  /**
   * Returns the drag icon when a drag is about to occur. Override this method and replace with one adhering to the same signature to customize
   * the drag icon that will follow the cursor during a drag/drop operation.
   * @param objGUI {HTMLElement} HTML element that received the mousedown event that initiated the drag
   * @param objJSXTarget {jsx3.gui.Block} JSX object that received the event
   * @param strDragType {String} JSX_GENERIC
   * @param strDragItemId {String} jsxid for <code>objJSXTarget</code>
   * @return {String} HTML content to follow the mouse pointer during the drag
   * @package
   */
  Block_prototype.getDragIcon = function(objGUI, objJSXTarget, strDragType, strDragItemId) {
    var strText = (objGUI && objGUI.innerHTML) ? jsx3.util.strTruncate((objGUI.innerHTML+"").replace(/<[^>]*>/gi," "),25,"...",.5) : "... ... ...";
    return "<span class='jsx30block_drag'>" + strText + "</span>";
  };

  Block_prototype.doBeginDrag = function(objEvent, objGUI) {
    // no drag with right button
    if (objEvent.leftButton())
      this.doDrag(objEvent, objGUI, this.getDragIcon);
  };

  /**
   * Returns the overflow property for the object, that defines how its on-screen view will behave when its contents are larger than its specified width and/or height
   * @return {int} [jsx3.gui.Block.OVERFLOWSCROLL, jsx3.gui.Block.OVERFLOWHIDDEN, jsx3.gui.Block.OVERFLOWEXPAND]
   */
  Block_prototype.getOverflow = function() {
    return this.jsxoverflow;
  };

  /**
   * Sets the overflow property for the object, that defines how its on-screen view will behave when its contents are larger than its specified width and/or height;
   *            returns reference to self to facilitate method chaining;
   * @param OVERFLOW {int} [jsx3.gui.Block.OVERFLOWSCROLL, jsx3.gui.Block.OVERFLOWHIDDEN, jsx3.gui.Block.OVERFLOWEXPAND]
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setOverflow = function(OVERFLOW) {
    this.jsxoverflow = OVERFLOW;
    return this;
  };

  /**
   * Returns CSS property value(s) for a padding (padding:4px;)
   * @return {String}
   */
  Block_prototype.getPadding = function() {
    return this.jsxpadding;
  };

  /**
   * Sets the CSS property value for padding an object.
   * @param strCSS {String} The preferred method to set padding is by moving clockwise, beginning with the <b>north</b>
   * compass position, <b>without</b> the pixel designation.  For example, to specify a top padding of 8 pixels, use <code>8 0 0 0</code>. CSS syntax is
   * supported, but requires that pixels be designated.  For example, using <code>padding:5px;padding-left:10px;</code>, is equivalent to
   * <code>5 5 5 10</code>.
   * @param bUpdateView {Boolean} if <code>true</code>, the view will be updated without requiring a repaint.
   * @return {jsx3.gui.Block} this object.
   */
  Block_prototype.setPadding = function(strCSS,bUpdateView) {
    this.jsxpadding = strCSS;
    if (bUpdateView)
      this.recalcBox(["padding"]);
    else
      this.setBoxDirty();

    return this;
  };


  /**
   * Returns URL pointing to XML file used for GI BUILDER, defining what properties are available for edit for this object and what their possible values can be
   * @return {String} relative URL
   * @private
   * @deprecated
   */
  Block_prototype.getPropertiesPath = function() {
    return null;
  };

  /**
   * Returns URL pointing to XML file used for GI BUILDER, defining what model events are available for edit for this object and what their possible values can be
   * @return {String} relative URL
   * @private
   * @deprecated
   */
  Block_prototype.getModelEventsPath = function() {
    return null;
  };


  /**
   * Returns if the instance is relatively positioned on-screen; returns one of: jsx3.gui.Block.ABSOLUTE jsx3.gui.Block.RELATIVE
   * @return {int}
   */
  Block_prototype.getRelativePosition = function() {
    return this.jsxrelativeposition;
  };

  /**
   * Sets if the jsx3.gui.Block instance is relatively positioned on-screen;
   *            returns reference to self to facilitate method chaining;
   * @param intRelative {int} jsx3.gui.Block.RELATIVE will be applied to the view if null. One of: jsx3.gui.Block.RELATIVE jsx3.gui.Block.ABSOLUTE
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setRelativePosition = function(intRelative, bUpdateView) {
    if (this.jsxrelativeposition != intRelative) {
      this.setBoxDirty();
      this.jsxrelativeposition = intRelative;

      if (bUpdateView) {
        // SPEC: left/top only honored if absolute, margin only honored if relative
        if (intRelative == Block.ABSOLUTE) {
          this.setDimensions(this.getLeft() || Number(0), this.getTop() || Number(0), null, null, true);
          this.updateGUI("margin", "0px");
        } else {
          this.updateGUI("left", "0px");
          this.updateGUI("top", "0px");
          if (this.getMargin()) this.setMargin(this.getMargin(), true);
        }

        this.updateGUI("position", (intRelative == Block.RELATIVE) ? "relative" : "absolute");

        //relatively positioned blocks need to be styled as an 'inline box' for appropriate x-browser consistency. apply this property (a display property) here.
        if (this.getDisplay() != Block.DISPLAYNONE)
          this.setDisplay(Block.DISPLAYBLOCK, true);
      }
    }

    return this;
  };

  /**
   * Returns HTML tag name to use when rendering the object on-screen (span is the default); if the property is null,
   *          jsx3.gui.Block.DEFAULTTAGNAME is used;
   * @return {String} valid HTML tag name
   */
  Block_prototype.getTagName = function() {
    return this.jsxtagname;
  };

  /**
   * Sets HTML tag name to use when rendering the object on-screen (jsx3.gui.Block.DEFAULTTAGNAME is the default);
   *            returns reference to self to facilitate method chaining;
   * @param strTagName {String} valid HTML tag name (span, div, form, ol, ul, li, etc); if null is passed, the getter will use jsx3.gui.Block.DEFAULTTAGNAME
   * @return {jsx3.gui.Block} this object
   */
  Block_prototype.setTagName = function(strTagName) {
    this.jsxtagname = strTagName;
    this.setBoxDirty();
    return this;
  };

  /**
   * Returns the text/HTML for the control to be displayed on-screen; returns an empty string if null; since the text
   * is rendered on-screen as browser-native HTML, the equivalent of an empty tag (e.g., &lt;span\&gt;) would be an
   * enclosing tag with an empty string (no content): &lt;span&gt;&lt;/span&gt;.  To return null would be equivalent to
   * &lt;span&gt;null&lt;/span&gt;, which is not the same as &lt;span/&gt;
   * @return {String}
   */
  Block_prototype.getText = function() {
    return this.jsxtext;
  };

  /**
   * Sets the text/HTML for the control to be displayed on-screen;
   *            returns reference to self to facilitate method chaining;
   * @param strText {String} text/HTML
   * @param bRepaint {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   * @return {jsx3.gui.Block}
   */
  Block_prototype.setText = function(strText, bRepaint) {
    this.jsxtext = strText;
    if (bRepaint) {
      if (this.getChild(0) != null || this.getBoxProfile(true).getChildProfile(0) != null) {
        this.repaint();
      } else {
        var objGUI = this.getRendered();
        if (objGUI != null) objGUI.innerHTML = strText;
      }
    }
    return this;
  };

  /**
   * Returns the CSS text-align property for the object; if no property value exists, jsx3.gui.Block.ALIGNLEFT is returned by default
   * @return {String} one of: jsx3.gui.Block.ALIGNLEFT, jsx3.gui.Block.ALIGNRIGHT, jsx3.gui.Block.ALIGNCENTER
   */
  Block_prototype.getTextAlign = function() {
    return this.jsxtextalign;
  };

  /**
   * Sets the CSS text-align property for the object;
   *            returns reference to self to facilitate method chaining;
   * @param ALIGN {String} one of: jsx3.gui.Block.ALIGNLEFT, jsx3.gui.Block.ALIGNRIGHT, jsx3.gui.Block.ALIGNCENTER
   * @return {jsx3.gui.Block}
   */
  Block_prototype.setTextAlign = function(ALIGN) {
    this.jsxtextalign = ALIGN;
    return this;
  };

  /**
   * Returns the tooltip text to display when the object is hovered over.
   * @return {String}
   */
  Block_prototype.getTip = function() {
    return this.jsxtip;
  };

  /**
   * Sets the tooltip text to display when the object is hovered over; updates the model and the view
   * immediately. Note that the tip text is rendered natively by the browser and that the behavior may vary
   * between browsers. Some browsers may honor line breaks in the text and some may have a maximum length that
   * then show before truncating the tip. For more consistent rendering across browsers use the <code>SPYGLASS</code>
   * event instead.
   *
   * @param strTip {String} the tip text.
   * @return {jsx3.gui.Block} this object.
   */
  Block_prototype.setTip = function(strTip) {
    this.jsxtip = strTip;
    var objGUI;
    if(objGUI = this.getRendered()) objGUI.title = strTip;
    return this;
  };

  /**
   * Returns the top property of this object.
   * @return {int | String} top.
   */
  Block_prototype.getTop = function() {
    return this.jsxtop;
  };

  /**
   * Sets the top property of this object. The top property specifies the vertical offset of this object
   * from its parent and only applies if this object is absolutely positioned.
   * @param vntTop {int|String} the top value. Only numeric values and percentages are supported. For example: 25, -10, 20%.
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   * @return {jsx3.gui.Block} this object.
   */
  Block_prototype.setTop = function(vntTop,bUpdateView) {
    //update the model
    this.jsxtop = vntTop;

    if (bUpdateView) {
      if (isNaN(vntTop)) vntTop = 0;
      this.syncBoxProfile({top:vntTop}, true);
    } else {
      this.clearBoxProfile(false);
    }

    return this;
  };

  /**
   * tries to find an on-screen reference for the given object, appropriate to the css property being applied
   * Subclasses of Block should return the appropriate object where necessary
   * @param strCSSName {String} CSS property name
   * @private
   */
  Block_prototype._findGUI = function(strCSSName) {
    return this.getRendered();
  };

  /**
   * tries to find an on-screen reference for the given object and update its CSS without forcing a repaint
   * @param strCSSName {String} CSS property name
   * @param strCSSValue {String} CSS property value
   * @private
   */
  Block_prototype.updateGUI = function(strCSSName,strCSSValue) {
    var objGUI = this._findGUI(strCSSName);
    if (objGUI != null) {
      try {
        objGUI.style[strCSSName] = strCSSValue;
      } catch(e) {;}
    }
  };

  /**
   * Returns the visibility property for the object
   * @return {String} [jsx3.gui.Block.VISIBILITYVISIBLE, jsx3.gui.Block.VISIBILITYHIDDEN]
   */
  Block_prototype.getVisibility = function() {
    return this.jsxvisibility;
  };

  /**
   * Sets the CSS visibility property the object
   * @param VISIBILITY {String} [jsx3.gui.Block.VISIBILITYVISIBLE, jsx3.gui.Block.VISIBILITYHIDDEN]
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   */
  Block_prototype.setVisibility = function(VISIBILITY,bUpdateView) {
    if (VISIBILITY != Block.VISIBILITYHIDDEN)
      VISIBILITY = Block.VISIBILITYVISIBLE;
      
    //update the model
    this.jsxvisibility = VISIBILITY;

    //immediately upate view if user passed true for repaint
    if (bUpdateView) this.updateGUI("visibility",VISIBILITY);
    return this;
  };

  /**
   * Returns the width property of this object.
   * @return {int|String} width.
   */
  Block_prototype.getWidth = function() {
    return this.jsxwidth;
  };

  /**
   * Sets the width property of this object.
   * @param vntWidth {int | String} the width as non-negative integer or non-negative percentage. For example: 45%, 12.
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   * @return {jsx3.gui.Block} this object.
   */
  Block_prototype.setWidth = function(vntWidth, bUpdateView) {
    //update the model
    this.jsxwidth = vntWidth;

    //update the boxprofile
    if (bUpdateView) {
      this.syncBoxProfile({width:vntWidth}, true);
    } else {
      this.setBoxDirty();
    }

    return this;
  };

  /**
   * Returns the CSS z-index property
   * @return {int}
   */
  Block_prototype.getZIndex = function() {
    return this.jsxzindex;
  };

  /**
   * Sets the CSS z-index for the object
   * @param intZIndex {int} z-index value
   * @param bUpdateView {boolean} if <code>true</code>, the view of this object is immediately updated, obviating the need to call <code>repaint()</code>.
   */
  Block_prototype.setZIndex = function(intZIndex, bUpdateView) {
    //update the model
    this.jsxzindex = intZIndex;

    //immediately upate view if user passed true for repaint
    if(bUpdateView) this.updateGUI("zIndex",intZIndex);
    return this;
  };

  /**
   * Updates the box model for the object.
   * @param objImplicit {object} implicit map comprised of one or more of the following: left, top, width, height, boxtype, tagname, parentheight, parentwidth
   * @param objGUI {object} native browser element representing the view for the dialog instance
   * @private
   */
  Block_prototype.updateBoxProfile = function(objImplicit, objGUI, objQueue) {
//    this.updateBoxProfileImpl(objImplicit, objGUI, objQueue, 2);
    this.updateBoxProfileImpl(objImplicit, objGUI, objQueue, 4);
  };

  /**
   * Creates the box model/profile for the object.
   * @param objImplicit {object} implicit map comprised of one or more of the following: left, top, width, height, boxtype, tagname, parentheight, parentwidth
   * @return {jsx3.gui.Painted.Box} If provided, the profile instance that will contain this profile instance. By providing the parent profile, the true height/width can be ascertained when the child is a percent/factor-of the parent
   * @private
   */
  Block_prototype.createBoxProfile = function(objImplicit) {
    //apply any dynamic properties that this instance has registered
    this.applyDynamicProperties();

    //the implicit object must either provide a canvas dimension to live within (parentwidth/parentheight) or must explicitly define the size (width/height)
    if (this.getParent() && (objImplicit == null || ((isNaN(objImplicit.parentwidth) || isNaN(objImplicit.parentheight))))) {
      objImplicit = this.getParent().getClientDimensions(this);
    } else if(objImplicit == null) {
      //this should never happen--maybe a fragment could cause???
      objImplicit = {};
    }

    //determine properties that affect position (relative/abs)
    var bRelative = ((objImplicit.boxtype && objImplicit.boxtype != "box") || this.getRelativePosition() != 0);
    var myLeft = (bRelative) ? null : ((objImplicit.left) ? objImplicit.left : this.getLeft());
    var myTop = (bRelative) ? null : ((objImplicit.top) ? objImplicit.top : this.getTop());
    if(!bRelative && !myLeft) myLeft = 0;
    if(!bRelative && !myTop) myTop = 0;
    var tag, pad, mar, bor;

    //update/set layout properties
    if(!objImplicit.boxtype) objImplicit.boxtype = (bRelative) ? "relativebox" : "box";
    if(objImplicit.tagname == null) objImplicit.tagname = ((tag = this.getTagName())) ? tag.toLowerCase() : jsx3.gui.Block.DEFAULTTAGNAME;
    if(objImplicit.left == null && objImplicit.boxtype == "box") objImplicit.left = myLeft;
    if(objImplicit.top == null && objImplicit.boxtype == "box") objImplicit.top = myTop;
    if(objImplicit.width == null) objImplicit.width = (objImplicit.width) ? objImplicit.width : this.getWidth();
    if(objImplicit.height == null) objImplicit.height = (objImplicit.height) ? objImplicit.height : this.getHeight();

    //set this block as a container if it is 100% wide
    if(objImplicit.width == "100%" || (objImplicit.tagname == "div" && this.paintText() == "")) {
      if (objImplicit.tagname == "span")
        objImplicit.tagname = "div";
      objImplicit.container = true;
    }

    //add margin,border, and padding properties to the implicit object (parents do not pass these, so don't check for null)
    if((pad = this.getPadding()) != null && pad != "") objImplicit.padding = pad;
    if(bRelative && (mar = this.getMargin()) != null && mar != "") objImplicit.margin = mar;
    if((bor = this.getBorder()) != null && bor != "") objImplicit.border = bor;

    //return the explicit object (e.g., the box profile)
    return new jsx3.gui.Painted.Box(objImplicit);
  };

  /**
   * Sets the CDF ID of the record to map to. Updates to show the new mapped value
   * @param strCDFId {String} If not set, the CDF Id used by the nearest ancestor of type <code>jsx3.gui.CDF</code> will be used.
   */
  Block_prototype.setCDFId = function(strCDFId) {
    this.jsxcdfid = strCDFId;
    var objCDF = this.getAncestorOfType("jsx3.gui.CDF");
    if(objCDF)
      objCDF.read();
  };


  /**
   * Returns the CDF ID of the record to map to.
   * @returns {String}
   */
  Block_prototype.getCDFId = function() {
    return this.jsxcdfid;
  };


  /**
   * Sets the named attribute on the CDF record to which this object is mapped. Updates to show the new mapped value
   * @param strAttName {String}
   */
  Block_prototype.setCDFAttribute = function(strAttName) {
    this.jsxcdfattribute = strAttName;
    var objCDF = this.getAncestorOfType("jsx3.gui.CDF");
    if(objCDF)
      objCDF.read();
  };


  /**
   * Returns the named attribute on the CDF record to which this object is mapped.
   * @returns {String}
   */
  Block_prototype.getCDFAttribute = function() {
    return this.jsxcdfattribute;
  };


  /**
   * Returns the DHTML, used for this object's on-screen view
   * @param strData {String} Text/HTML markup that will replace value of getText() during paint&#8212;typically passed by subclass, JSXBlockX after it performs an XML/XSL merge to acquire its data; for memory management purposes, the data is not set via setText() and, instead, is passed as a temporary input parameter, as the object's model would contain the text for no reason
   * @return {String} DHTML
   */
  Block_prototype.paint = function(strData) {
    //apply any dynamic properties that this instance has registered
//apply twice?  what to do with dp types that affect layout that should be applied during box profiling and those that apply to the "skinning/surfacing" of an object
    this.applyDynamicProperties();

    //if paint method called by subclass instance--an instance of JSXBlockX, use strData, not this.getText();
    strData = (strData == null) ? this.paintText() : strData;

    //determine CSS style attributes unique to this JSXBlock instance
    var strId = this.getId();

    //bind programmatic listeners for drag, drop, spy, key, and move operations; either or; not both due to incompatibilities (some of these share the mousedown and therefore can collide--hence the if statement)
    //rules:  (Spyglass && (Move || Menu || Drag/Drop) && keydown)
    var eventMap = {};
    if (this.hasEvent(Interactive.JSXDOUBLECLICK))
      eventMap[Event.DOUBLECLICK] = true;
    if (this.hasEvent(Interactive.JSXCLICK))
      eventMap[Event.CLICK] = true;
    if (this.hasEvent(Interactive.JSXKEYDOWN))
      eventMap[Event.KEYDOWN] = true;

    var strSuppl = "";

    if (this.getCanSpy() == 1) {
      eventMap[Event.MOUSEOVER] = true;
      eventMap[Event.MOUSEOUT] = true;
    }

    if (this.getCanMove() == 1) {
      if (this.getCanMove() == 1) {
        eventMap[Event.MOUSEDOWN] = "doBeginMove";
      }
    } else if (this.getMenu() != null) {
      eventMap[Event.MOUSEUP] = true;
    } else if (this.getCanDrop() == 1) {
      eventMap[Event.MOUSEUP] = true;
    }

    if (eventMap[Event.MOUSEDOWN] == null && this.getCanDrag() == 1) {
      eventMap[Event.MOUSEDOWN] = "doBeginDrag";
      strSuppl += ' JSXDragId="' + strId + '" JSXDragType="JSX_GENERIC"';
    }

    //get custom 'view' properties(custom props to add to the rended HTML tag)
    var strEvents = this.renderHandlers(eventMap, 0) + strSuppl;
    var strAttributes = this.renderAttributes(null, true);

    //render the outer-most box
    var b1 = this.getBoxProfile(true);
    b1.setAttributes(this.paintIndex() + this.paintTip() + strEvents + ' id="' + strId + '"' + this.paintLabel() + ' class="' + this.paintClassName() + '" ' + strAttributes);
    b1.setStyles(this.paintFontSize() + this.paintBackgroundColor() + this.paintBackground() + this.paintColor() + this.paintOverflow() + this.paintFontName() + this.paintZIndex() + this.paintFontWeight() + this.paintTextAlign() + this.paintCursor() + this.paintVisibility() + this.paintBlockDisplay() + this.paintCSSOverride());

    return b1.paint().join(strData + this.paintChildren());
  };

  Block_prototype._ebMouseOver = function(objEvent, objGUI) {
    if (this.getCanSpy() == 1)
      this.doSpyOver(objEvent, objGUI);
    if (this.getCanDrop() == 1)
      this.doDrop(objEvent, objGUI, jsx3.EventHelp.ONBEFOREDROP);
  };

  Block_prototype._ebMouseOut = function(objEvent, objGUI) {
    if (this.getCanSpy() == 1)
      this.doSpyOut(objEvent, objGUI);
    if (this.getCanDrop() == 1)
      this.doDrop(objEvent, objGUI, jsx3.EventHelp.ONCANCELDROP);
  };

  Block_prototype._ebMouseUp = function(objEvent, objGUI) {
    if (this.getCanDrop() == 1)
      this.doDrop(objEvent, objGUI, jsx3.EventHelp.ONDROP);
    else
      this.jsxsupermix(objEvent, objGUI);
  };

  Block_prototype.paintLabel = function() {
    var name = this.getName();
    return name != null ? ' label="' + name + '"' : "";
  };

  /**
   * renders valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0))
   * @return {String} valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0))
   * @private
   */
  Block_prototype.paintBackgroundColor = function() {
    var bgc = this.getBackgroundColor();
    return bgc ? "background-color:" + bgc + ";" : "";
  };

  /**
   * renders valid CSS property value for the background such as:  background-image:url(x.gif);  or background-image:url(x.gif);background-repeat:no-repeat;
   * @return {String} valid CSS property for the background such as:  background-image:url(x.gif);  or background-image:url(x.gif);background-repeat:no-repeat;
   * @private
   */
  Block_prototype.paintBackground = function() {
    return (this.getBackground()) ? this.getBackground() + ";" : "";
  };

  /**
   * renders valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0))
   * @return {String} valid CSS property value, (e.g., red, #ffffff, rgb(255,0,0))
   * @private
   */
  Block_prototype.paintColor = function() {
//    return "color:" + ((this.getColor()) ? this.getColor() : Block.DEFAULTCOLOR)  + ";";
    var c = this.getColor();
    return c ? "color:" + c + ";" : "";
  };

  /**
   * renders valid CSS property value, (e.g., default,wait,col-resize); if no value or an empty string, null is returned
   * @return {String} valid CSS property value, (e.g., default,wait,col-resize)
   * @private
   */
  Block_prototype.paintCursor = function() {
    var c = this.getCursor();
    return c ? "cursor:" + c + ";" : "";
  };

  /**
   * renders CSS name/value properties specific to this object to override standard library of properties provided via the standard JSX getters/setters
   * @return {String} CSS property(s) (e.g., border:solid 1px;)
   * @private
   */
  Block_prototype.paintCSSOverride = function() {
    return (this.getCSSOverride()) ? this.getCSSOverride() : "";
  };

  /**
   * Returns the css class name (CSS property name without the leading ".")
   * @return {String}
   * @private
   */
  Block_prototype.paintClassName = function() {
    var cn = this.getClassName();
    return Block.DEFAULTCLASSNAME + (cn ? " " + cn : "");
  };

  /**
   * called by the paint method for a given class; determines how to generate the given CSS property
   * @return {String} combined CSS property (i.e., display:none;)
   * @private
   */
  Block_prototype.paintBlockDisplay = function() {
    //treat blocks more like containers and other controls as inline elements. if a width is defined, treat as a true block not, inline block
    if (jsx3.util.strEmpty(this.getDisplay()) || this.getDisplay() == "block") {
      if(this.getWidth() == "100%") {
        return "display:block;";
      } else {
        return "";
      }
    } else if(this.getDisplay() == "none") {
      return "display:none;";
    }
    return "";
  };

  /**
   * called by the paint method for a given class; determines how to generate the given CSS property
   * @return {String} combined CSS property (i.e., display:none;)
   * @private
   */
  Block_prototype.paintDisplay = function() {
    //TO DO: the following logic is wrong...change force explicit none???
    var d = this.getDisplay();
    return (jsx3.util.strEmpty(d) || d == Block.DISPLAYBLOCK) ? "" : "display:none;";
  };

  /**
   * renders the CSS font-family for the object
   * @return {String} valid CSS font-family property value
   * @private
   */
  Block_prototype.paintFontName = function() {
    var fn = this.getFontName();
    return fn ? "font-family:" + fn + ";" : "";
  };

  /**
   * renders the CSS font-size for the object
   * @private
   */
  Block_prototype.paintFontSize = function() {
    var fs = parseInt(this.getFontSize());
    return isNaN(fs) ? "" : "font-size:" + fs + "px;";
  };

  /**
   * renders the CSS font-weight for the object ("bold" or "normal")
   * @return {String}
   * @private
   */
  Block_prototype.paintFontWeight = function() {
    var fw = this.getFontWeight();
    return fw ? "font-weight:" + fw + ";" : "";
  };

  /**
   * generates DHTML property value for tabIndex&#8212;called programmatically by paint methods for various GUI classes
   * @return {String} DHTML in form of tabIndex='n'
   * @private
   */
  Block_prototype.paintIndex = function(intIndex) {
    if (intIndex == null) intIndex = this.getIndex();
    // HACK: see IE's jsx3.html.isFocusable()
    return (intIndex != null && this.jsxenabled != 0) ? ' tabindex="' + intIndex + '" jsxtabindex="' + intIndex + '"' : '';
  };

  /**
   * renders overflow css
   * @return {String} combined CSS property (i.e., overflow:auto;)
   * @private
   */
  Block_prototype.paintOverflow = function() {
    if (this.getOverflow() == Block.OVERFLOWSCROLL) {
      return "overflow:auto;";
    } else if (this.getOverflow() == Block.OVERFLOWHIDDEN) {
      return "overflow:hidden;";
    } else {
      return "";
    }
  };

  /**
   * renders the text/HTML for the control to be displayed on-screen; returns an empty string if null; since the text is rendered on-screen as browser-native HTML, the equivalent of an empty tag (e.g., <span\>) would be an enclosing tag with an empty string (no content): <span></span>.  To return null would be equivalent to <span>null</span>, which is not the same as <span\>
   * @return {String}
   * @private
   */
  Block_prototype.paintText = function() {
    return (this.getText()) ? this.getText() : ""; //jsx3.gui.Block.DEFAULTTEXT;
  };

  /**
   * renders the CSS text-align property for the object; if no property value exists, jsx3.gui.Block.ALIGNLEFT is returned by default
   * @return {String}
   * @private
   */
  Block_prototype.paintTextAlign = function() {
    var ta = this.getTextAlign();
    return ta ? "text-align:" + ta + ";" : "";
  };

  /**
   * generates DHTML property value for a 'title', including the keycode accelerator if applicable
   * @return {String} DHTML in form of tabTip='n'
   * @private
   */
  Block_prototype.paintTip = function() {
    var myTip = this.getTip();
    if (myTip != null) {
      //escape any apostrophes and return if not null; typically, it would be strings that aren't allowed, but I like the rsquo symbol for cosmetic reasons
      myTip = myTip.replace(/"/g, "&quot;");
      return myTip ? ' title="' + myTip + '" ' : "";
    } else if (jsx3.gui.Form && this.instanceOf(jsx3.gui.Form)) { // TODO: remove dependency on subclass
      var myBinding = this.getKeyBinding();
      return myBinding ? ' title="' + myBinding.replace(/"/g, "&quot;") + '" ' : ""; // TODO: format key binding
    } else {
      return "";
    }
  };

  /**
   * called by the paint method for a given class; determines how to generate the given CSS property
   * @return {String} combined CSS property (i.e., visibility:hidden;)
   * @private
   */
  Block_prototype.paintVisibility = function() {
    return this.getVisibility() == Block.VISIBILITYHIDDEN ? "visibility:hidden;" : "";
  };

  /**
   * renders the CSS z-index property. Default: 1
   * @private
   */
  Block_prototype.paintZIndex = function() {
    var z = this.getZIndex();
    return isNaN(z) ? "" : "z-index:" + z + ";";
  };


  /**
   * Displays a "blocking mask" inside the block to stop user interactions with content within the block. Applies only to Blocks. Use only on blocks with no padding and with overflow set to hidden.
   * @param strMessage {String} text/message to display in the blocking mask to tell the user it is disabled
   */
  Block_prototype.showMask = function(strMessage) {
    //delete any existing mask
    if (this._jsxmaskid) this.hideMask();

    //is there an onscreen instance
    var objGUI;
    if(objGUI = this.getRendered()) {
      //get the true height of the block to mask
      var intHeight = this.getAbsolutePosition().H;

      //add/replace "onfocus" method for view (this way there is no problem when serializing the model)
      if (objGUI.onfocus)
      /* @jsxobf-clobber */
        objGUI._jsxonfocus = objGUI.onfocus;

      jsx3.html.addEventListener(objGUI,"onfocus",Block._focusMask);

      //add/replace "tabIndex" setting (also for view)
      if (objGUI.tabIndex) objGUI._jsxtabindex = objGUI.tabIndex;
      objGUI.tabIndex = 0;

      //create the mask child (a jsx3.gui.Block instance) and insert directly into the view
      /* @jsxobf-clobber */
      this._jsxmaskid  = this.getId() + "_mask";
      var objMask = (new Block(this._jsxmaskid,0,0,"100%","100%",strMessage)).setOverflow(Block.OVERFLOWHIDDEN).setFontWeight(Block.FONTBOLD).setTextAlign(Block.ALIGNCENTER).setIndex(0).setRelativePosition(0).setZIndex(32000).setDynamicProperty("jsxbgcolor","@Solid Shadow").setDynamicProperty("jsxbg","@Mask 70%").setDynamicProperty("jsxcursor","@Wait");
      objMask.setWidth("100%");
      objMask.setHeight("100%");
      objMask.setPadding(parseInt(intHeight / 2));
      objMask.setEvent("if (objEVENT.tabKey() && objEVENT.shiftKey()) { this.getParent().focus(); }",Interactive.JSXKEYDOWN);
      objMask.setAttribute("onfocus", "var objEVENT = jsx3.gui.Event.wrap(event); if (objEVENT.shiftKey()) { jsx3.GO(this.id).getParent().focus(); }");
      this.setChild(objMask);
      this.paintChild(objMask);
      objMask.focus(); // In case focus is still on one of the masked form control.
    }
  };

  /**
   * handles the focus event for a masked block. Routes focus to the last child (a temporary child in the JSX DOM)
   * @private
   * @jsxobf-clobber
   */
  Block._focusMask = function(evt) {
    var me = jsx3.GO(this.id);
    if (me) {
      var objEvent = Event.wrap(evt || window.event); // evt for Fx, window.event for IE
      if (! objEvent.shiftKey()) {
        if (me.getChildren().length)
          me.getLastChild().focus();
      }
    }
  };

  /**
   * Removes the "blocking" mask inside the block to stop user interactions with existing content
   */
  Block_prototype.hideMask = function() {
    var objMask;
    if(objMask = this.getChild(this._jsxmaskid)) {
      //update model
      this.removeChild(objMask);
      delete this._jsxmaskid;

      //update view
      var objGUI;
      if(objGUI = this.getRendered()) {
        //remove/replace tabIndex setting used to support masking
        if (objGUI._jsxtabindex) {
          objGUI.tabIndex = objGUI._jsxtabindex;
        } else {
          objGUI.removeAttribute("tabIndex");
        }

        //remove/replace onfocus method used to support masking
        jsx3.html.removeEventListener(objGUI,"onfocus",Block._focusMask);
        if(objGUI._jsxonfocus) {
          objGUI.onfocus = objGUI._jsxonfocus;
          delete objGUI._jsxonfocus;
        } else {
          //objGUI.onfocus = null;
        }
      }
    }
  };


  /**
   * Returns the release/build for the class (i.e., "2.2.00")
   * @return {String}
   * @deprecated
   */
  Block.getVersion = function() {
    return "3.00.00";
  };


});


/**
 * @deprecated  Renamed to jsx3.gui.Block
 * @see jsx3.gui.Block
 * @jsxdoc-definition  jsx3.Class.defineClass("jsx3.Block", -, null, function(){});
 */
jsx3.Block = jsx3.gui.Block;
