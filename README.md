# Dennis Digital: Common Step Definitions for CucumberJS

A collections of common and reusable step defintions for Dennis Digital BDD testing stack. Run using CucumberJS and PhantomJS via NodeJS.


## Installation

`npm install dennisdigital-cucumberjs`


## Usgae

Your features folder should be in the same directory as you `package.json` run tests with the command:

`./node_modules/.bin/cucumber-js --require node_modules/dennisdigital-cucumberjs --require features`

Alternatively you can add this as an NPM script:

```
  "scripts": {
    "tests": "npm i && node_modules/.bin/cucumber-js --tags @node --require node_modules/dennisdigital-cucumberjs --require features"
  }
```

`npm run tests`


The base url can also be set in your `package.json`:

```
  "options": {
    "baseUrl": "localhost:3000"
  }
```


Example feature:

```
Feature: Post page

  Background:
    Given I browse "http://my-app:3000/"

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