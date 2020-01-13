const book = require('./commands/book/book')

module.exports = function(controller) {
  controller.on('slash_command', async (bot, message) => {
    switch (message.command) {
      case '/book':
        await book(bot, message)
        break
      default:
        break
    }
  })
}
