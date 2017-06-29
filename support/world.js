// features/support/world.js
require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');



function CustomWorld() {
	var capabilities;
	var browser = process.env.npm_package_options_browser || 'chrome';

	if (browser === 'chrome') {
		var chromeCapabilities = seleniumWebdriver.Capabilities.chrome();

		// Currently a bug in Chrome Headless (v.59) where you can't resize on the fly
		// Can set screen size here as an argument `window-size=1920x1080`
		// https://stackoverflow.com/questions/37030486/headless-protractor-not-sharding-tests/43542416#43542416

		// CLI flags
		// http://peter.sh/experiments/chromium-command-line-switches/#load-extension
		var chromeOptions = {
		    'args': ['--headless', '--disable-gpu', '--disable-plugins', '--disable-plugins-discovery', '--disable-translate', '--no-experiments', '--disable-images']
		};

		chromeCapabilities.set('chromeOptions', chromeOptions);

		capabilities = chromeCapabilities;

	} else if (browser === 'phantomjs') {
		var phantomCapabilities = seleniumWebdriver.Capabilities.phantomjs();
		phantomCapabilities.set('phantomjs.cli.args', ['--load-images=false']);

		capabilities = phantomCapabilities;
	} else {
		throw new Error('Browser "' + browser + '" is not configured.');
	}

	this.driver = new seleniumWebdriver.Builder()
		.withCapabilities(capabilities)
		.forBrowser(browser)
		.build();

	this.driver.baseUrl = process.env.npm_package_options_baseUrl;
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
})