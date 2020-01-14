const {
  getRoomsAvailability,
} = require('../../../business/BookingRoomBusiness')
const RoomInfoView = require('../../components/RoomInfoView')

const listRooms = async (bot, message) => {
  const rooms = await getRoomsAvailability()
  const blocks = []

  rooms.forEach(el => {
    blocks.push(
      RoomInfoView({
        roomName: el.roomName,
        floor: el.floor,
        isAvailable: el.isAvailable,
        time: el.time,
      })
    )
  })

  const content = {
    blocks,
  }
  await bot.reply(message, content)
}

module.exports = listRooms
