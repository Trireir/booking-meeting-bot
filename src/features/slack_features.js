const book = require('./commands/book/book-business')
const submission = require('./commands/book/book-submission')
const listRooms = require('./commands/list-rooms/listRoomsBusiness')
const listMyBookings = require('./commands/list-my-bookings/listMyBookingsBusiness')

module.exports = function(controller) {
  //Slash Command (Have to be declared in Slack)
  controller.on('slash_command', async (bot, message) => {

    try {
    switch (message.command) {
      case '/book':
        await book(bot, message)
        break
        case '/listrooms':
          await listRooms(bot, message)
          break
        case '/list':
          await listMyBookings(bot, message)
          break
      default:
        break
      }
      } catch (err) {
        bot.replyPrivate(message, err.message)
      }
  })
  //Get response from modal
  controller.on('view_submission', async (bot, message) => {
    await submission(bot, message)
  })
}
