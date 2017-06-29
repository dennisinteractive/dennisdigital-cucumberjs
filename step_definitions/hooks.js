var {defineSupportCode} = require('cucumber');

defineSupportCode(function({After}) {
  After(function() {
  	this.driver.close();
    return this.driver.quit();
  });
});