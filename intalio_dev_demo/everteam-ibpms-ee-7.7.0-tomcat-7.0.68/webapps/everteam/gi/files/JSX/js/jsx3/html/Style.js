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
 * Handles Provides methods to manipulate browser DOM nodes.
 * @since 3.6
 */
jsx3.Class.defineClass("jsx3.html.Style", null, null, function(Style, Style_prototype) {

  //alias frequently-used classes
  //var LOG = jsx3.util.Logger.getLogger(DOM.jsxclass.getName());

  /**
   * instance initializer
   */
  Style_prototype.init = function() {
    this.jsxsuper();
  };

  /* @JSC */ if (jsx3.CLASS_LOADER.IE) {

  /**
   * Returns the CSS string appropriate to generate an opacity filter (without the selector)
   * @param dblPct {Number} inclusively between 0 and 1. For example: 0, .5, .95, 1
   * @return {object} CSS string
   * @package
   */
  Style.getCSSOpacity = function(dblPct) {
    return "alpha(opacity=" + ((isNaN(dblPct)) ? dblPct:dblPct*100)+ ")";
  };

  /**
   * Returns the CSS string appropriate to render a PNG via CSS (without the selector)
   * @param strResolvedURL {String} fully resolved url for the PNG
   * @return {object} CSS string
   * @package
   */
  Style.getCSSPNG = function(strResolvedURL) {
    return "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + strResolvedURL + "', sizingMethod='scale')";
  };

  /* @JSC */ } else {

  Style.getCSSOpacity = function(dblPct) {
    return dblPct;
  };

  Style.getCSSPNG = function(strResolvedURL) {
    return "url(" + strResolvedURL + ")";
  };

  /* @JSC */ }

});
