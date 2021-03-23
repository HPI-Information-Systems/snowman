/// <reference types="cypress" />

context('Browse datasets', () => {
  beforeEach(() => {
    cy.visitDatasetsPage();
  });

  it('includes page toolbar', () => {
    cy.isDatasetsPage();
  });

  it('contains default dataset', () => {
    cy.get('#mainViewContentId ion-row').children().should('have.length.at.least', 1);
  });

  it('has add fab', () => {
    cy.getAddFab().should('exist');
  })

  it('has next fab', () => {
    cy.getNextFab().should('exist');
  })

  it('has default disabled next fab', () => {
    cy.getNextFab().should('have.attr', 'aria-disabled');
  })
});
