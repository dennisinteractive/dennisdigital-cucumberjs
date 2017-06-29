
var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

var helpers = require('../support/helpers');
var transforms = require('../support/transforms');

defineSupportCode(function({Given, When, Then}) {

  /**
   * Page Navigation
   */
  Given('I am on {stringInDoubleQuotes}', function (stringInDoubleQuotes) {
    this.driver.manage().timeouts().pageLoadTimeout(180 * 1000);

    var path  = transforms.removeQuoteString(stringInDoubleQuotes);
    var url   = this.driver.baseUrl + path;

    if (this.driver.baseUrl[this.driver.baseUrl.length - 1] !== '/' && path[0] !== '/') {
      url = this.driver.baseUrl + '/' + transforms.removeQuoteString(stringInDoubleQuotes);
    }

    this.driver.get(url)
      .then(function() {
        return this.driver.wait(function() {
          return this.driver.executeScript('return (document.readyState === "complete" && typeof jQuery === "function")');
        }.bind(this), 5 * 60 * 1000);
      }.bind(this));

  });




  Then('I should be on {stringInDoubleQuotes}', function (stringInDoubleQuotes) {
    return this.driver.getCurrentUrl().then(function(url) {
      assert.equal(url, this.driver.baseUrl + stringInDoubleQuotes);
    });
  });




  Then('I wait for the site to load', function() {
    this.driver.wait(function() {
      return this.driver.executeScript('return (document.readyState === "complete" && typeof jQuery === "function")');
    }.bind(this));
  });



  /**
   * Waits
   */
  Then('I wait for {stringInDoubleQuotes} milliseconds', function(stringInDoubleQuotes) {
    return this.driver.sleep(parseInt(transforms.removeQuoteString(stringInDoubleQuotes)));
  });




  Then('I wait for {stringInDoubleQuotes} seconds', function(stringInDoubleQuotes) {
    return this.driver.sleep(parseInt(transforms.removeQuoteString(stringInDoubleQuotes)) * 1000);
  });



  /**
   * Screen Size
   * IMPORTANT - Due to the similarity between these definitions, specificity is key, more specific, higher up it goes
   */
  Given('I am in breakpoint {stringInDoubleQuotes} with height {stringInDoubleQuotes2}', function (stringInDoubleQuotes, stringInDoubleQuotes2) {
    // Currently a bug in Chrome Headless (v.59) where you can't resize on the fly
    // https://stackoverflow.com/questions/37030486/headless-protractor-not-sharding-tests/43542416#43542416
    return this.driver.wait(this.driver.getBreakpoints(stringInDoubleQuotes).then(function(breakpoint){
      var width = breakpoint[stringInDoubleQuotes]['max-width'] || breakpoint[stringInDoubleQuotes]['min-width'];
      return this.driver.manage().window().setSize(parseInt(width), parseInt(transforms.removeQuoteString(stringInDoubleQuotes2)));
    }.bind(this)), 20000);
  });




  Given('I am in breakpoint {stringInDoubleQuotes}', function (stringInDoubleQuotes) {
    // Currently a bug in Chrome Headless (v.59) where you can't resize on the fly
    // https://stackoverflow.com/questions/37030486/headless-protractor-not-sharding-tests/43542416#43542416
    return this.driver.wait(this.driver.getBreakpoints(stringInDoubleQuotes).then(function(breakpoint){
      var width = breakpoint[stringInDoubleQuotes]['max-width'] || breakpoint[stringInDoubleQuotes]['min-width'];
      return this.driver.manage().window().setSize(parseInt(width), 1000);
    }.bind(this)), 20000);
  });



  /**
   * Text lookup
   */
  Then('I should see text {stringInDoubleQuotes}', function (text) {
    var xpath = "//*[contains(text(),'" + text + "')]";
    return this.driver.wait(seleniumWebdriver.until.elementLocated({xpath: xpath}), 5000);
  });



  /**
   * CSS elements lookup
   */
  Then('I should see a {stringInDoubleQuotes} element', function (stringInDoubleQuotes) {
    return this.driver.wait(seleniumWebdriver.until.elementLocated({css: stringInDoubleQuotes}), 5000);
  });




  Then('I should not see a {stringInDoubleQuotes} element', function (stringInDoubleQuotes, callback) {
    this.driver.findElement({css: stringInDoubleQuotes})
    .then(function(return_value) {
      callback('A "' + stringInDoubleQuotes + '" element has been found, it should not exist.' , null);
    })
    .catch(function(return_value) {
      callback(null, true);
    });
  });




  /**
   * HTML Tag lookup
   */
  Then('I should see a {stringInDoubleQuotes} tag', function (stringInDoubleQuotes) {
    return this.driver.wait(seleniumWebdriver.until.elementLocated({tagName: stringInDoubleQuotes}), 5000);
  });




  Then('I should not see a {stringInDoubleQuotes} tag', function (stringInDoubleQuotes, callback) {
    this.driver.findElement({tagName: stringInDoubleQuotes})
    .then(function(return_value) {
      callback('A "' + stringInDoubleQuotes + '" tag has been found, it should not exist.' , null);
    })
    .catch(function(return_value) {
      callback(null, true);
    });
  });




  /**
  * Element ordering
  */
  Then('the {element1} element should be before the {element2} element', function (element1, element2) {
    return this.driver.findElement({css: transforms.removeQuoteString(element1) + ' + ' + transforms.removeQuoteString(element2)})
  });




  /**
   * User Action
   */
  When('I click on {stringInDoubleQuotes}', function (text) {
    return this.driver.findElement({linkText: text}).then(function(element) {
      return element.click();
    });
  });




  Given('I follow {stringInDoubleQuotes}', function (stringInDoubleQuotes) {
    this.driver.findElement({linkText: stringInDoubleQuotes}).then(function(element) {
      return element.click();
    });
  });



  /**
   * JavaScript
   */
  Then('the {script} javascript expression should be true', function (script, callback) {
    this.driver.executeScript('return ' + transforms.removeQuoteString(script)).then(function(return_value) {
      if (return_value === true) {
        callback(null, true);
      } else {
        callback('Script returned "' + return_value + '"', null);
      }
    });
   });




  Then('the javascript expression should be true:', function (script, callback) {
    this.driver.executeScript('return ' + transforms.removeQuoteString(script)).then(function(return_value) {
      if (return_value === true) {
        callback(null, true);
      } else {
        callback('Script returned "' + return_value + '"', null);
      }
    });
  });




  Then('I wait for {milliseconds} milliseconds for {script}', function (milliseconds, script, callback) {
    /**
     * TODO
     * 2 seconds is hard coded in as too many tests have a 10 second wait which is too long.
     * In the long run, this wait should be removed
     */
    this.driver.wait(function() {
      this.driver.executeScript('return ' + script, function(return_value) {
        if (return_value === true) {
          callback(null, true)
        }
      });
    }.bind(this), 2000);
  });




  Then('I scroll to {stringInDoubleQuotes} pixels', function(stringInDoubleQuotes) {
    return this.driver.executeScript('return (function() { document.body.scrollTop = ' + transforms.removeQuoteString(stringInDoubleQuotes) + '; return document.body.scrollTop; })()');
  });




  /**
   * Screenshot
   */
  Then('I take a screenshot', function() {
    this.driver.takeScreenshot().then(function(return_value) {
      require('fs').writeFile('screens/screen-' + Date.now() + '.png', return_value, 'base64', function(err) {
        console.log(err);
      });
    }.bind(this));
  });




  /**
   * GA
   */
  Then('I should see the following GA event tracking:', function (table) {
    var tableHashes = table.hashes();
    tableHashes.forEach(function(tableHash){
      tableHashes = transforms.removeQuotesObj(tableHash); // Remove quotes if they exist
      if(tableHash['value']) tableHashes = transforms.toInt(tableHash, 'value'); // Convert values to Int
      if(tableHash['noninteraction']) tableHashes = transforms.toBoolean(tableHash, 'noninteraction'); // Convert noninteraction to Boolean
    });

    this.driver.executeScript('return Drupal.settings.googleAnalyticsETSettings.selectors').then(function(gaEvents) {
        gaEvents.should.containSubset([tableHashes]);
    });
  });

  Then('a json value {stringInDoubleQuotes} should match {stringInDoubleQuotes}', function (stringInDoubleQuotes, stringInDoubleQuotes2) {
    this.driver.findElement({xpath: "//script[@type='application/json']"}).getAttribute("innerHTML").then(function(html){
      var json = JSON.parse(html);
      expect(json).to.have.deep.property(stringInDoubleQuotes).to.contain(stringInDoubleQuotes2);
    });
  });

});