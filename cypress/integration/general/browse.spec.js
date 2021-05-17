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
    ).should('include.text', 'Benchmark Dashboard');
  });

  it('has no add fab', () => {
    cy.getAddFab().should('not.exist');
  })
});
