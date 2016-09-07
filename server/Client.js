class Client {
  constructor(id) {
    this.clientID = id;
  }

  getID() {
    return this.clientID;
  }

}

exports.Client = Client;
