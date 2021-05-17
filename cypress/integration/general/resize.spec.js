/// <reference types="cypress" />

const resizeToWait = 300;

function isResizedToValidRootPage() {
  cy.get(
      '#mainViewContentId > .header-md > .toolbar-title-default > .title-default'
  ).should('be.visible');
}

function isMenuPaneVisible(target) {
  cy.get('ion-menu').should(target ? 'be.visible' : 'not.be.visible');
}

function isMenuButtonVisible(target) {
  cy.get('ion-menu-button').should(target ? 'be.visible' : 'not.be.visible');
}

context('Resize root page', () => {
  beforeEach(() => {
    cy.visitRootPage();
    cy.get('ion-card > ion-button').first().contains('Start Benchmark').click();
  });

  it('handles fullHD screens', () => {
    cy.viewport(1920, 1080);
    cy.wait(resizeToWait);
    isResizedToValidRootPage();
    isMenuPaneVisible(true);
    isMenuButtonVisible(false);
  })

  it('handles HDready screens', () => {
    cy.viewport(1080, 720);
    cy.wait(resizeToWait);
    isResizedToValidRootPage();
    isMenuPaneVisible(true);
    isMenuButtonVisible(false);
  })

  it('handles medium screens', () => {
    cy.viewport(1000, 700);
    cy.wait(resizeToWait);
    isResizedToValidRootPage();
    isMenuPaneVisible(true);
    isMenuButtonVisible(false);
  })

  it('handles small screens', () => {
    cy.viewport(900, 700);
    cy.wait(resizeToWait);
    isResizedToValidRootPage();
    isMenuPaneVisible(false);
    isMenuButtonVisible(true);
  })

  it('handles very small screens', () => {
    cy.viewport(600, 700);
    cy.wait(resizeToWait);
    isResizedToValidRootPage();
    isMenuPaneVisible(false);
    isMenuButtonVisible(true);
  })

  it('handles tiny screens', () => {
    cy.viewport(400, 700);
    cy.wait(resizeToWait);
    isResizedToValidRootPage();
    isMenuPaneVisible(false);
    isMenuButtonVisible(true);
  })

  it('opens side menu by click', () => {
    cy.viewport(400, 700);
    cy.wait(resizeToWait);
    isMenuPaneVisible(false);
    cy.get('ion-menu-button').click();
    cy.wait(100);
    isMenuPaneVisible(true);
  })
});