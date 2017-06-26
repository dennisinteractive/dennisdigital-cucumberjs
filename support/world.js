// features/support/world.js
var pjson = require('../package.json');
require('chromedriver')
var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

function CustomWorld() {
	this.driver = new seleniumWebdriver.Builder()
		.forBrowser('phantomjs')
		.build();
	this.driver.baseUrl = process.env.npm_package_options_baseUrl;
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
})