// features/support/transforms.js
var Transforms = (function(){ 

        var toInt = function(obj, prop){
                obj[prop] = parseInt(obj[prop]);
                return obj;
        };

        var toBoolean = function(obj, prop){
                switch(obj[prop].toLowerCase().trim()){
                        case "true": case "yes": case "1": obj[prop] = true;
                        case "false": case "no": case "0": case null: obj[prop] = false;
                        default: obj[prop] = Boolean(obj[prop]);
                }
                return obj;
        };

        var removeQuotesObj = function(obj){
                if (obj instanceof Object !== true) { throw new customError('"removeQuotesObj" requires an Object'); }

                for(prop in obj){
          obj[prop] = removeQuoteString(obj[prop]);
        };
        return obj;
        };

        var removeQuoteString = function(string) {
                if (typeof string !== 'string') { throw new customError('"removeQuoteString" requires a String'); }

                if (string.charAt(0) === '"' && string.charAt(string.length-1) === '"') {
                        string = string.slice(1, -1);
                }
                return string;
        };

        function customError(message) {
          this.name = 'CustomError';
          this.message = message || 'Custom Error Message';
          this.stack = (new Error()).stack;
        }
        customError.prototype = Object.create(Error.prototype);
        customError.prototype.constructor = customError;

        return {
                toInt: toInt,
                toBoolean: toBoolean,
                removeQuotesObj: removeQuotesObj,
                removeQuoteString: removeQuoteString
        };

})();

module.exports = Transforms;