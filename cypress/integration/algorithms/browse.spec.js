/// <reference types="cypress" />

context('Browse algorithms', () => {
  beforeEach(() => {
    cy.visitAlgorithmsPage();
  });

  it('includes page toolbar', () => {
    cy.isAlgorithmsPage();
  });

  it('contains default matching solution', () => {
    cy.get('#mainViewContentId ion-row').children().should('have.length.at.least', 1);
  });

  it('has no next fab', () => {
    cy.getNextFab().should('not.exist');
  })

  it('has add fab', () => {
    cy.getAddFab().should('exist');
  })
});
