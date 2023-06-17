# DeathStarCalculator(Testing)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5. It has utilized a comprehensive testing strategy involving three types of tests: unit tests, API tests, and integration/UI tests.

## API Tests

API tests utilize Jasmine. These tests are designed to assert the interaction of the application with the external world (typically a backend server).

## Unit Tests

The unit tests are also performed using Jasmine. In these tests, the individual units of code (functions, methods, classes, etc.) are tested in isolation. While writing unit tests for the **SearchComponent**, a private method, **getVolume()**, was accessed. Typically, private methods should not be accessed in tests as they are considered implementation details. However, in this case, testing the **getVolume()** method directly was essential to ensure the correct behavior of the component. To circumvent the restriction due to the method's private scope, the method was accessed by casting the component to any:

  `const spyGetVolume = spyOn(component as any, 'getVolume').and.returnValue(Promise.resolve(600091307465.65));`
  
## Integration/UI Tests (End-to-End)

Integration tests (or UI tests) are performed using [Cypress](https://www.cypress.io/). This tool was chosen due to its efficiency and straightforward approach for end-to-end testing. These tests ensure that the integrated components of the application function as expected when they interact with each other, and that the UI behaves as expected in response to user actions.

## Run Tests

### Unit and API tests

To run the unit and API tests, use the following command in the project directory:

  `ng test`

### Integration/UI tests

To run the Integration/UI tests, use the following command in the **root/e2e_test** directory:

  `npx cypress open`


