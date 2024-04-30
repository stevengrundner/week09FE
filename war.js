// Create the following classes and methods
// -Card
// -Deck
//    -create deck
//    -shuffle deck
//    -deal deck
// -Player
// -Game
//    -play

//  In the card class below i'm creating the card with the several constructors. Suit, name, and value.
class Card {
  constructor(suit, name, value) {
    this.name = name;
    this.suit = suit;
    this.value = value;
  }
}

//  In the deck class below i'm describing the names of the cards in array's
class Deck {
  constructor() {
    this.cards = [];
    this.suits = [`Hearts`, `Diamonds`, `Clubs`, `Spades`];
    this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    this.names = [
      `2`,
      `3`,
      `4`,
      `5`,
      `6`,
      `7`,
      `8`,
      `9`,
      `10`,
      `Jack`,
      `Queen`,
      `King`,
      `Ace`,
    ];
  }

  // The for loop is looping through all of the array's and actually creating the deck below
  createDeck() {
    for (let i = 0; i < this.suits.length; i++) {
      for (let n = 0; n < this.names.length; n++) {
        this.cards.push(new Card(this.suits[i], this.names[n], this.values[n]));
      }
    }
  }
  //  I borrorwed this code from https://stackoverflow.com in order to shuffle the deck
  shuffleDeck() {
    let shuffleDeck = [];
    for (let i = 0; i < 52; i++) {
      let random = Math.floor((this.cards.length - i) * Math.random());
      let shuffle = this.cards.splice(random, 1);
      shuffleDeck.push(...shuffle);
    }
    return shuffleDeck;
  }

  // the method to deal the deck is below in which each player gets 26 cards
  dealDeck(players, shuffledCards) {
    let dealingCards1 = shuffledCards.splice(0, 26);
    players[0].hands.push(...dealingCards1);
    let dealingCards2 = shuffledCards.splice(0, 26);
    players[1].hands.push(...dealingCards2);
  }
}

// The class below is the players of the game
class Players {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.hands = [];
  }
}

// Now that i've made the deck of cards, shuffled them and created the players, the game is going to begin
class Game {
  constructor() {
    this.players = [];
  }
  // Below the game is begining and the carads are being distributed to the players
  begin() {
    this.players.push(new Players(`player1`));
    this.players.push(new Players(`player2`));

    let myDeck = new Deck();
    myDeck.createDeck();
    let shuffledDeck = myDeck.shuffleDeck();

    myDeck.dealDeck(this.players, shuffledDeck);

    this.play();
  }

  // Below i'm showing the hands go to each player and if player 1 is greater than player 2, player 1 wins. if player 1 is less than player 2, player 2 wins, and if they have the same value it results in a tie.

  play() {
    let player1 = this.players[0];
    let player2 = this.players[1];

    let winner = ``;
    let turn = 0;

    while (player1.hands.length !== 0) {
      let player1Card = player1.hands.pop();
      let player2Card = player2.hands.pop();

      if (player1Card.value > player2Card.value) {
        winner = player1.name;
        player1.points += 1;
        console.log(`Hand #`, (turn += 1), `Player 1 Wins`);
      } else if (player1Card.value < player2Card.value) {
        winner = player2.name;
        player2.points += 1;
        console.log(`Hand #`, (turn += 1), `Player 2 Wins`);
      } else {
        console.log(`Hand #`, (turn += 1), `Tie`);
      }
    }

    // Below i'm logging the array and when you click on it, the values of each player is shown. Who ever is higher is the winner of the game.

    console.log(this.players);
  }
}

const game = new Game();
game.begin();
