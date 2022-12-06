/// <reference types="cypress" />

it('shows warnings', () => {
  cy.visit('index.html')
})

it.only('delays', () => {
  cy.intercept('GET', 'src/jquery.warning.js', Cypress.Promise.delay(1000))
  cy.visit('index.html')
})
