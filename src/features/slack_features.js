const listRooms = require('./commands/list-rooms/listRoomsBusiness')
const listMyBookings = require('./commands/list-my-bookings/listMyBookingsBusiness')

module.exports = function(controller) {
  controller.on('slash_command', async (bot, message) => {
    switch (message.command) {
      case '/listrooms':
        await listRooms(bot, message)
        break
      case '/list':
        await listMyBookings(bot, message)
        break
      default:
        break
    }
  })
}
