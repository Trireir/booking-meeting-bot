const { getMyBookings } = require('../../../business/BookingRoomBusiness')
const MyBookingsView = require('../../components/MyBookingsView')
const MessageView = require('../../components/MessageView')

const listMyBookings = async (bot, message) => {
  const userId = message.incoming_message.channelData.user_name
  const blocks = []

  const bookings = await getMyBookings({ userId })

  bookings.map(booking => {
    blocks.push(MyBookingsView({ ...booking }))
  })

  const content = {
    blocks: blocks.length
      ? blocks
      : [MessageView({ text: 'You dont have any meeting for today' })],
  }

  await bot.replyPrivate(message, content)
}

module.exports = listMyBookings
