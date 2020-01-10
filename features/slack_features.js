module.exports = function(controller) {
  controller.on('slash_command', async (bot, message) => {
    if (message.command === '/book') {
      await bot.replyPrivate(
        message,
        'It seems you want to book a meeting room...'
      )
    }
  })
}
