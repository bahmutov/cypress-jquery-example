/// <reference types="cypress" />

it('checks out the jQuery plugin', () => {
  cy.visit('index.html', {
    onBeforeLoad(win) {
      cy.stub(win, 'alert').as('alert')
    },
  })
  cy.contains('button', 'Warn').click()
  cy.get('@alert').should('have.been.calledTwice')
})

// will fail
it.skip('delays the jQuery plugin load', () => {
  cy.intercept(
    {
      method: 'GET',
      pathname: '/src/jquery.warning.js',
    },
    () => Cypress.Promise.delay(100),
  ).as('plugin')
  cy.visit('index.html')
  cy.contains('button', 'Warn').click()
})

it('waits for the delayed plugin load', () => {
  cy.intercept(
    {
      method: 'GET',
      pathname: '/src/jquery.warning.js',
    },
    () => Cypress.Promise.delay(1000),
  ).as('plugin')
  cy.visit('index.html')
  cy.wait('@plugin')
  cy.contains('button', 'Warn').click()
})

it('does not wait for the delayed plugin load and fails', () => {
  cy.intercept(
    {
      method: 'GET',
      pathname: '/src/jquery.warning.js',
    },
    () => Cypress.Promise.delay(1000),
  ).as('plugin')
  cy.visit('index.html')
  cy.contains('button', 'Warn').click()
})

it('waits for the jQuery plugin to register itself', () => {
  cy.intercept(
    {
      method: 'GET',
      pathname: '/src/jquery.warning.js',
    },
    () => Cypress.Promise.delay(1000),
  ).as('plugin')
  cy.visit('index.html').its('jQuery.fn.warning')
  cy.contains('button', 'Warn').click()
})
