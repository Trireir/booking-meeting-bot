const {
  FIELD_ROOM_SELECT_ROOM,
  FIELD_ROOM_ROOM,
} = require('../../../utils/texts')

function parseRooms(rooms) {
  return rooms.map(room => ({
    text: {
      type: 'plain_text',
      text: `${room.name} (${room.floor})`,
      emoji: true,
    },
    value: room.id.toString(),
  }))
}

//rooms = [{id, name}, ...]
module.exports = function(rooms) {
  return {
    type: 'input',
    block_id: 'room',
    element: {
      type: 'static_select',
      action_id: 'roomValue',
      placeholder: {
        type: 'plain_text',
        text: FIELD_ROOM_SELECT_ROOM,
        emoji: true,
      },
      options: parseRooms(rooms),
    },
    label: {
      type: 'plain_text',
      text: FIELD_ROOM_ROOM,
      emoji: true,
    },
  }
}
