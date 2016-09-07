class Room {
  constructor(deck, sb, bb, tableWallet) {
    this.players = [];
    this.gameState = 0;
    this.deck = deck;
    this.sb = sb;
    this.bb = bb;
    this.tWallet = tableWallet;
  }

}

exports.Room = Room;
