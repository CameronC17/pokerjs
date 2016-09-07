class RoomHolder {
  constructor() {
    this.rooms = [];
    this.roomID = 1;
  }

  createRoom() {
    this.rooms.push(null);
  }

  removeRoom(id) {
    this.clients.splice(this.findClientByID(this.id), 1);
  }

  getConnected() {
    return this.clients.length;
  }
}

exports.RoomHolder = RoomHolder;
