/**
 * Finds a nested object from it's parent using a dot notation string
 *
 * @params {Object} obj The object to look through
 * @params {string} str The dot notation string to find
 * @returns Object
 */
module.exports.objRef = function(obj, str) {
  str = str.split(".");
  for (var i = 0; i < str.length; i++)
  obj = obj[str[i]];
  return obj;
}
