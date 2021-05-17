/// <reference types="cypress" />

context('Browse experiments', () => {
  beforeEach(() => {
    cy.visitExperimentsPage();
  });

  it('includes page toolbar', () => {
    cy.isExperimentsPage();
  });

  it('contains default experiment', () => {
    cy.get('#mainViewContentId ion-row').children().should('have.length.at.least', 1);
  });

  it('has add fab', () => {
    cy.getAddFab().should('exist');
  })
});
