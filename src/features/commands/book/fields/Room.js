function parseRooms(rooms) {
  return rooms.map(room => ({
    text: {
      type: 'plain_text',
      text: room.name,
      emoji: true,
    },
    value: room.id,
  }))
}

//rooms = [{id, name}, ...]
module.exports = function(rooms) {
  return {
    type: 'input',
    element: {
      type: 'static_select',
      placeholder: {
        type: 'plain_text',
        text: 'Select room',
        emoji: true,
      },
      options: parseRooms(rooms),
    },
    label: {
      type: 'plain_text',
      text: 'Room',
      emoji: true,
    },
  }
}
