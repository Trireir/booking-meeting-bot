const book = require('./commands/book/book-business')
const submission = require('./commands/book/book-submission')

module.exports = function(controller) {
  //Slash Command (Have to be declared in Slack)
  controller.on('slash_command', async (bot, message) => {
    switch (message.command) {
      case '/book':
        await book(bot, message)
        break
      default:
        break
    }
  })
  //Get response from modal
  controller.on('view_submission', async (bot, message) => {
    await submission(bot, message)
  })
}
