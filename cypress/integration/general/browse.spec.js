/// <reference types="cypress" />

context('Browse root page', () => {
  beforeEach(() => {
    cy.visitRootPage();
  });

  it('has window title', () => {
    cy.title().should('include', 'Snowman');
  });

  it('includes page toolbar', () => {
    cy.get(
      '#mainViewContentId > .header-md > .toolbar-title-default > .title-default'
    ).should('include.text', 'Home Page');
    cy.get('#mainViewContentId h1').should('include.text', 'Snowman Benchmark');
  });

  it('contains correct page content', () => {
    cy.get('#mainViewContentId h1').should('include.text', 'Snowman Benchmark');
  });

  it('has next fab', () => {
    cy.getNextFab().should('exist').should('not.have.attr', 'disabled');
  })

  it('has working next fab', () => {
    cy.getNextFab().click();
    cy.isDatasetsPage();
  })

  it('has no add fab', () => {
    cy.getAddFab().should('not.exist');
  })
});
