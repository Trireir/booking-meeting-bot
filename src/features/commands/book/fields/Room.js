//rooms = [{id, name}, ...]
module.exports = function(rooms) {
  return {
    label: 'Room',
    type: 'select',
    name: 'room',
    options: rooms.map(({ id, name }) => ({ label: name, value: id })),
  }
}
