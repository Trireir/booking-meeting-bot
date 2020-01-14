const listRooms = require('./commands/list-rooms/listRoomsBusiness')

module.exports = function(controller) {
  controller.on('slash_command', async (bot, message) => {
    switch (message.command) {
      case '/listrooms':
        await listRooms(bot, message)
        break
      default:
        break
    }
  })
}
