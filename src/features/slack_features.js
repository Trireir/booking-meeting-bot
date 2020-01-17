const listRooms = require('./commands/list-rooms/listRoomsBusiness')
const listMyBookings = require('./commands/list-my-bookings/listMyBookingsBusiness')

module.exports = function(controller) {
  controller.on('slash_command', async (bot, message) => {
    try {
      switch (message.command) {
        case '/listrooms':
          return await listRooms(bot, message)
        case '/list':
          return await listMyBookings(bot, message)
        default:
          break
      }
    } catch (err) {
      bot.replyPrivate(message, err.message)
    }
  })
}
