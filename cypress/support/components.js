Cypress.Commands.add('getActiveModal', () =>
  cy.get('div.modal-wrapper > div.ion-page > div')
)

Cypress.Commands.add('getAddFab', () =>
  cy.get('ion-fab[horizontal=start] > ion-fab-button')
);

Cypress.Commands.add('getNextFab', () =>
  cy.get('ion-fab[horizontal=end] > ion-fab-button')
);

Cypress.Commands.add('getCardHeaderIcon', () =>
  cy.get('ion-card ion-card-header ion-icon')
)
