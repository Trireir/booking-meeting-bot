const {
  getRoomsAvailability,
} = require('../../../business/BookingRoomBusiness')
const RoomInfoView = require('../../components/RoomInfoView')
const { validateHours } = require('../../../utils/validations')

const listRooms = async (bot, message) => {
  const [hours, minutes] = validateHours(message.incoming_message.text)
  const rooms = await getRoomsAvailability({ hours, minutes })
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
