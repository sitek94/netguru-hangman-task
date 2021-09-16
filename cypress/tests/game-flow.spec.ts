import range from 'lodash.range';

// Cypress docs:
// https://on.cypress.io/writing-first-test

it(`User starts the game, types all the correct letters, wins, and resets the game.`, () => {
  const nthChild = (n: number) => `.letters > :nth-child(${n})`;

  cy.visit('/');

  cy.contains(/netguru hangman/i);
  cy.contains('This is a simple Hangman game, have fun and good luck!');

  cy.intercept('GET', '/words/?random=true', { word: 'macarena' }).as(
    'getRandomWord',
  );

  // Start the game
  cy.contains(/start game/i).click();

  cy.contains(/you missed:/i);

  // Stub word: "macarena"
  cy.wait('@getRandomWord');

  // "M"
  cy.get('body').type('m');
  cy.get(nthChild(4)).contains('M');

  // "A"
  cy.get('body').type('a');
  cy.get(nthChild(5)).contains('A');
  cy.get(nthChild(7)).contains('A');
  cy.get(nthChild(11)).contains('A');

  // "C"
  cy.get('body').type('c');
  cy.get(nthChild(6)).contains('C');

  // "R"
  cy.get('body').type('r');
  cy.get(nthChild(8)).contains('R');

  // "E"
  cy.get('body').type('e');
  cy.get(nthChild(9)).contains('E');

  // "N"
  cy.get('body').type('n');
  cy.get(nthChild(10)).contains('N');

  // Game won, with no errors
  cy.contains(/you won!/i);
  cy.contains('Congratulations, you missed 0 letters.');

  // Reset the game
  cy.contains(/again/i).click();

  // After the reset, all the fields should be empty
  for (const n of range(11)) {
    cy.get(nthChild(n + 1)).should('have.text', '');
  }
  // Also, since the stub word is still "macarena" first three fields should have 'disabled' class.
  for (const n of range(3)) {
    cy.get(nthChild(n + 1)).should('have.class', 'disabled');
  }
});
