/// <reference types="cypress" />

context('Add new algorithm', () => {
  beforeEach(() => {
    cy.visitAlgorithmsPage();
    cy.getAddFab().click();
  });

  it('shows the modal', () => {
    cy.getActiveModal().should('be.visible');
  });

  it('contains correct heading', () => {
    cy.getActiveModal().find('h1.center').should('include.text', 'Add');
  });
});
