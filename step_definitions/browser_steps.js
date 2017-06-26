// features/step_definitions/browser_steps.js
var seleniumWebdriver = require('selenium-webdriver');
var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var {defineSupportCode} = require('cucumber');
var helpers4 = require('../support/helpers');
chai.should();
chai.use(require('chai-subset'));

defineSupportCode(function({Given, When, Then}) {

  When('I click on {stringInDoubleQuotes}', function (text) {
    return this.driver.findElement({linkText: text}).then(function(element) {
      return element.click();
    });
  });

  Then('I should see {stringInDoubleQuotes}', function (text) {
    var xpath = "//*[contains(text(),'" + text + "')]";
    var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
    return this.driver.wait(condition, 5000);
  });

  Then('I should see {stringInDoubleQuotes}', function (stringInDoubleQuotes) {
    this.driver.findElement({tagName: 'body'}).getText().then(function(allText) {
      assert.include(allText, stringInDoubleQuotes, 'Page containing visible text "' + stringInDoubleQuotes + '"');
    });
  });

  Given('I am on the homepage', function () {
    // Write code here that turns the phrase above into concrete actions
    return this.driver.get(this.driver.baseUrl);
  });

  Given('I browse to {stringInDoubleQuotes}', function (arg1) {
    return this.driver.get(this.driver.baseUrl + "/" + arg1);
  });

  Given('I am on {stringInDoubleQuotes}', function (arg1) {
    console.log("GOING");
    return this.driver.get(this.driver.baseUrl + "/" + arg1);
  });

  Then('the {stringInDoubleQuotes} object should contain the key {stringInDoubleQuotes}', function (object, match) {
    this.driver.executeScript('return window[arguments[0]];', object).then(function(result) {
      expect(result).to.have.nested.property(match);
    });
  });

  Then('the {stringInDoubleQuotes} object should contain the keys', function (object, table) {
    this.driver.executeScript('return window[arguments[0]];', object).then(function(result) {
      for(var i=0; i < table.raw().length; i++) {
        expect(result).to.have.nested.property(table.raw()[i][0], table.raw()[i][1]);
      }
    });
  });

});