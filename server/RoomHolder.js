class RoomHolder {
  constructor() {
    this.rooms = [];
    this.roomID = 1;
  }

  addRoom(room) {
    this.rooms.push(room);
  }

  removeRoom() {

  }

  getRoom(id) {
    return this.rooms[id];
  }

  //runs through each room and continues the game if necessary
  engineRooms() {

  }

}

exports.RoomHolder = RoomHolder;
