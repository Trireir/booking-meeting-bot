const book = require('./commands/book/book')

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
    const { view, incoming_message } = message
    const { channelData } = incoming_message
    const { user } = channelData
    let messageReply = JSON.parse(view.private_metadata)
    await bot.replyPrivate(
      messageReply,
      `Reserving Room ${view.state.values.room.roomValue.selected_option.text.text} in date ${view.state.values.date.dateValue.selected_date} between hours ${view.state.values.startTime.startTimeValue.selected_option.value} to ${view.state.values.endTime.endTimeValue.selected_option.value} with title ${view.state.values.title.titleValue.value} and user ${user.name}`
    )
  })
}
