Cypress.Commands.add('visitRootPage', () => {
  cy.visit('/');
})

Cypress.Commands.add('visitAlgorithmsPage', () => {
  cy.visitRootPage();
  cy.get('ion-buttons > ion-button').contains('Matching Solutions').click();
})
Cypress.Commands.add('isAlgorithmsPage', () => {
  cy.get(
    '#mainViewContentId > .header-md > .toolbar-title-default > .title-default'
  ).should('include.text', 'Matching Solutions');
})

Cypress.Commands.add('visitDatasetsPage', () => {
  cy.visitRootPage();
  cy.get('ion-buttons > ion-button').contains('Datasets').click();
})
Cypress.Commands.add('isDatasetsPage', () => {
  cy.get(
    '#mainViewContentId > .header-md > .toolbar-title-default > .title-default'
  ).should('include.text', 'Datasets');
})

Cypress.Commands.add('visitExperimentsPage', () => {
  cy.visitRootPage();
  cy.get('ion-buttons > ion-button').contains('Experiments').click();
})
Cypress.Commands.add('isExperimentsPage', () => {
  cy.get(
      '#mainViewContentId > .header-md > .toolbar-title-default > .title-default'
  ).should('include.text', 'Experiments');
})
