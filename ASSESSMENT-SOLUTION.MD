# QA Engineer Assessment Solution

## Introduction
1. ***Data attributes*** were added to the src code to make resilient css selectors.
2. ***Page objects*** model used to expose custom css selectors.
3. Tests are created covering all the scenarios available in the specification.
4. ***Fixtures*** are used for test data.
5. ***Custom commands*** created to encapsulate common functions in the entire context of cypress.
6. ***Mocha awesome reports*** (html as well as json) and ***cypress dashbord*** reporting support is added for reporting purposes. Reports are overwritten with every run. ***Screenshot captured*** are linked in the mocha awesome reports.
7. ***Videos*** being captured for the every test run. Videos are overwritten with every run. 
8. Solution is available in a public Github repository https://github.com/linktorahulgupta/fedex-assignment

## How to execute the tests
- Start the serve using `ng serve`
- Start the test run using `npm run cyTest`
    - To use headed mode (to see the text execution in a browser) hit `npm run headTest`
    - To use headed mode with chrome broswer hit `npm run chromeTest`
- After tests execution are finished, report will be created under `mochawesome-report` in the root directory.
- Test execution reports are also captured on cypress dashbord https://dashboard.cypress.io/projects/u5cn3p/runs. You will have to login to cypress dashboard using your own cypress dashboard login credential or create a new one with the available sign in options.
- Videos are available under `cypress/videos`
- Screenshots are available under `cypress/screenshots`

# Notice:
If you are executing the tests on a windows machine you will have to adjust the slashes in the script block of package.json file!


## Test execution summary

## Bugs
1. [Severity-medium] [workaround-available] Previous search results are not cleared on hitting the search button with empty query string.
2. [Severity-low] [workaround-available] Extra spaces available around the characteristics values in the search result. 

## Backlog
- [] Add support for cypress schematic package to run tests using `ng e2e`


Solution repository will be made private after the interview process is completed to maintain the confidentiality clause of Fedex Digital International.