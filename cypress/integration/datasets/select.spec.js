/// <reference types="cypress" />

context('Select datasets', () => {
  beforeEach(() => {
    cy.visitDatasetsPage();
  });

  it('enables next fab', () => {
    cy.getCardHeaderIcon().first().click();
    cy.getNextFab().should('not.have.attr', 'aria-disabled');
  })

  it('displays selection correctly', () => {
    cy.getCardHeaderIcon().first().click();
    cy.getCardHeaderIcon().filter('.ion-color-primary').should('exist');
  })

  it('displays no selection correctly', () => {
    cy.getCardHeaderIcon().filter('.ion-color-primary').should('not.exist');
  })

  it('allows maximum one selection', () => {
    cy.getCardHeaderIcon().first().click();
    cy.getCardHeaderIcon().last().click();
    cy.getCardHeaderIcon().filter('.ion-color-primary').should('have.length', 1);
  })
});
