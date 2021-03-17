Cypress.Commands.add('visitRootPage', () => {
  cy.visit('/');
})

Cypress.Commands.add('visitAlgorithmsPage', () => {
  cy.visitRootPage();
  cy.get('.list-md').contains('Matching Solutions').click();
})
Cypress.Commands.add('isAlgorithmsPage', () => {
  cy.get(
    '#mainViewContentId > .header-md > .toolbar-title-default > .title-default'
  ).should('include.text', 'Matching Solutions');
})

Cypress.Commands.add('visitDatasetsPage', () => {
  cy.visitRootPage();
  cy.get('.list-md').contains('Datasets').click();
})
Cypress.Commands.add('isDatasetsPage', () => {
  cy.get(
    '#mainViewContentId > .header-md > .toolbar-title-default > .title-default'
  ).should('include.text', 'Dataset Selector');
})
