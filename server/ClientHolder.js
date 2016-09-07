class ClientHolder {
  constructor() {
    this.clients = [];
  }

  addClient(client) {
    this.clients.push(client);
  }

  removeClient(id) {
    this.clients.splice(this.findClientByID(this.id), 1);
  }

  findClientByID(id) {
    for (var i = 0; i < this.clients.length; i++) {
      if (this.clients[i].getID() == id) {
        return id;
      }
    }
  }

  getConnected() {
    return this.clients.length;
  }
}
