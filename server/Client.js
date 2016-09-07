class Client {
  constructor(id) {
    this.clientID = id;
    this.player = null;
  }

  getID() {
    return this.clientID;
  }

  attachPlayer(playerID) {

  }

}

exports.Client = Client;
