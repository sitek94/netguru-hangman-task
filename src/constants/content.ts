export const screens = {
  start: {
    title: 'Netguru Hangman',
    description: 'This is a simple Hangman game, have fun and good luck!',
    button: 'Start game',
    word: 'HANGMAN',
    missedLetters: ['B', 'D', 'E', 'Z', 'P', 'U', 'K', 'L', 'Q', 'W'],
    guessedLetters: ['H', 'A'],
  },
  gameWon: {
    title: 'You won!',
    description: (n: number) => `Congratulations, you missed ${n} letters.`,
    button: 'Play again',
  },
  gameLost: {
    title: 'Game over',
    description: '',
    button: 'Try again',
  },
  loading: {
    title: 'Loading...',
  },
  error: {
    title: 'Oops',
    description: 'Something went wrong, try refreshing the page.',
  },
};
