const {
  getRoomsAvailability,
} = require('../../../business/BookingRoomBusiness')
const RoomInfoView = require('../../components/RoomInfoView')

const listRooms = async (bot, message) => {
  const rooms = await getRoomsAvailability()
  const blocks = []

  rooms.forEach(room => {
    blocks.push(RoomInfoView({ ...room }))
  })

  const content = {
    blocks,
  }
  await bot.replyPrivate(message, content)
}

module.exports = listRooms
