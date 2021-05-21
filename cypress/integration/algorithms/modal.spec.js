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
    cy.getActiveModal().find('.toolbar-title-default > .title-default').should('include.text', 'Add');
  });
});
