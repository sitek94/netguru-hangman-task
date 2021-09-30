// Cypress docs:
// https://on.cypress.io/writing-first-test

const apiUrl = 'https://wordsapiv1.p.rapidapi.com/words/*';

describe('cypress', () => {
  it(`User starts the game, types all the correct letters, wins, and resets the game.`, () => {
    cy.intercept(apiUrl, { body: { word: 'intercept' } }).as('getRandomWord');
    cy.visit('/');
    cy.contains(/netguru hangman/i);
    cy.contains('This is a simple Hangman game, have fun and good luck!');

    // First game - win
    cy.findByRole('button', { name: /start game/i }).click();
    cy.contains(/you missed:/i);
    cy.wait(100);
    cy.get('body').type('intercept');
    cy.contains(/you won/i);
    cy.contains('Congratulations, you missed 0 letters.');

    // Second game - win
    cy.intercept(apiUrl, { body: { word: 'cypressrun' } });
    cy.findByRole('button', { name: /play again/i }).click();
    cy.get('body').type('cypressrun');
    cy.contains(/you won/i);
    cy.contains('Congratulations, you missed 0 letters.');

    // Third game - win
    cy.intercept(apiUrl, { body: { word: 'xyz' } });
    cy.findByRole('button', { name: /play again/i }).click();
    cy.get('body').type('abcefghijk xyz');
    cy.contains(/you won/i);
    cy.contains('Congratulations, you missed 10 letters.');

    // Fourth game - lost
    cy.intercept(apiUrl, { body: { word: 'abc' } });
    cy.findByRole('button', { name: /play again/i }).click();
    cy.get('body').type('defghijklmnopq');
    cy.contains(/game over/i);

    // Fifth game - win
    cy.intercept(apiUrl, { body: { word: 'kukuczka' } });
    cy.contains(/try again/i).click();
    cy.get('body').type('yxo kukuczka');
    cy.contains(/you won/i);
    cy.contains('Congratulations, you missed 3 letters.');
  });
});
