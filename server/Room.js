class Room {
  constructor(chatRoomID, deck, sb, bb, wallet) {
    this.players = [];
    this.gameState = 0;
    this.chatRoomID = chatRoomID;
    this.sb = sb;
    this.bb = bb;
    this.wallet = wallet;
  }

}

exports.Room = Room;
