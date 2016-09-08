/**
 * @author martin.czuchra
 */

var ERDF = {
  __stripHashes: function(s) {
    return (s && s.substring(0, 1)=='#') ? s.substring(1, s.length) : s;
  }
};