# Dennis Digital: Common step definitions for CucumberJS

A collections of common and reusable step defintions for Dennis Digital BDD testing stack. Run using CucumberJS and PhantomJS via NodeJS.


## Installation

`npm install dennisdigital-cucumberjs`


## Usgae

Your features folder should be in the same directory as you `package.json` run tests with the command:

`./node_modules/.bin/cucumber-js --require node_modules/dennisdigital-cucumberjs --require features`


Alternatively you can add this as an NPM script:

```
  "scripts": {
    "tests": "node_modules/.bin/cucumber-js --require node_modules/dennisdigital-cucumberjs --require features"
  }
```

`npm run tests`


And then options can be passed like so:

`npm run tests -- --tags @mytesttag`


The base url can and should be set in your `package.json`:

```
  "options": {
    "baseUrl": "localhost:3000"
  }
```


Example feature:

```
Feature: Post page
  In order browse posts,
  as a User,
  I want see the post element and read the title.

  @posts @mytesttag
  Scenario: Go on post 1
    Given I am on "/a-site-url"
    Then I should a ".css-selector" element
    And I should see "Post-1"
```

### Dependencies:
- chai-as-promised
- chromedriver
- cucumber
- selenium-webdriver


### Notes

Still very much a work in progress!
