/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('get the page title', () => {
    cy.title().should('include', 'Snowman');
  });

  it('open datasets by menu', () => {
    cy.get('.list-md').contains('Datasets').click();
    cy.get(
      '#mainViewContentId > .header-md > .toolbar-title-default > .title-default'
    ).should('include.text', 'Dataset Selector');
  });
});
