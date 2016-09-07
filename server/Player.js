class Player {
  constructor(name, wallet) {
    this.name = name;
    this.wallet = wallet;
  }

  modifyWallet(change) {
    this.wallet += change;
  }

}

exports.Player = Player;
