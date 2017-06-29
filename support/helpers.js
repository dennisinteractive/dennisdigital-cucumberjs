var webdriver = require('selenium-webdriver');
var store = {};
    store.breakpoints = {};

// extension method grab breakpoints from the homepage
webdriver.WebDriver.prototype.getBreakpoints = function(name){
  var driver = this;

  return new Promise(function (resolve, reject){
    if (store.breakpoints[name]) {
      resolve(store.breakpoints);
    } else {
      driver.manage().timeouts().pageLoadTimeout(180 * 1000);
      driver.get(driver.baseUrl);

      driver.executeScript('return Drupal.settings.dennisJs.breakpoints').then(function(breakpoints){
        var breakpoint = breakpoints[name];
        store.breakpoints[name] = {};

        if(breakpoint.match('max-width: (.*?)px')) {
          store.breakpoints[name]['max-width'] = parseInt(breakpoint.match('max-width: (.*?)px')[1]);
        }
        if(breakpoint.match('min-width: (.*?)px')) {
          store.breakpoints[name]['min-width'] = parseInt(breakpoint.match('min-width: (.*?)px')[1]);
        }

        resolve(store.breakpoints);
      }, function(err) {
        reject(err);
      });
    }
  });
};

// extension method to set the inner size
webdriver.WebDriver.prototype.setViewportSize = function(width, height){
  return this.executeScript(JS_GET_PADDING).then(function(pad){
    this.manage().window().setSize(parseInt(width), parseInt(height));
  }.bind(this));
};


module.exports.store = store;