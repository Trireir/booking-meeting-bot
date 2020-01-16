const { getMyBookings } = require('../../../business/BookingRoomBusiness')
const BookingView = require('../../components/BookingView')
const MessageView = require('../../components/MessageView')

const listMyBookings = async (bot, message) => {
  const userId = message.incoming_message.channelData.user_name
  const blocks = []

  const bookings = await getMyBookings({ userId })

  bookings.map(booking => {
    blocks.push(BookingView({ ...booking }))
  })

  const content = {
    blocks: blocks.length
      ? blocks
      : [MessageView({ text: 'You dont have any meeting for today' })],
  }

  await bot.replyPrivate(message, content)
}

module.exports = listMyBookings
