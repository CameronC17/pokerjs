class Deck {
  constructor() {
    this.deck = ["h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "h11", "h12", "h13", "h14",
                "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "d11", "d12", "d13", "d14",
                "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13", "s14",
                "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13", "c14",
              ];

    this.shuffle();
  }

  shuffle() {
    var tempDeck = [];
    for (var i = this.deck.length; i > 0; i--) {
      var randNum = Math.floor(Math.random() * ((i - 1) - 0)) + 0;
      tempDeck.push(this.deck[randNum]);
      this.deck.splice(randNum, 1);
    }
    this.deck = tempDeck;
  }

}

exports.Deck = Deck;

//var deck = new Deck();
//console.log(deck.deck);
