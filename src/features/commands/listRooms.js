const {
  getRoomsAvailability,
  getRooms,
} = require('../../business/BookingRoomBusiness')
const RoomInfoView = require('../components/RoomInfoView')

const listRooms = async (bot, message) => {
  // await getRoomsAvailability()
  const blocks = []

  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Hello! These are the meeting rooms in your workspace',
    },
  })
  getRooms().forEach(el => {
    blocks.push(RoomInfoView({ roomName: el.name, floor: el.floor }))
  })

  const content = {
    blocks,
  }
  await bot.reply(message, content)
}

module.exports = listRooms
