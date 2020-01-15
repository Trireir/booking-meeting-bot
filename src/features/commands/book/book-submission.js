const {
  ERRORS_DATE_PAST,
  ERRORS_HOUR_END_BEFORE_START,
} = require('../../../utils/texts')

function validate(values) {
  const errors = {}
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  if (new Date(values.date.dateValue.selected_date).getTime() < now.getTime()) {
    errors.date = ERRORS_DATE_PAST
  }

  if (
    parseInt(values.startTime.startTimeValue.selected_option.value) >
    parseInt(values.endTime.endTimeValue.selected_option.value)
  ) {
    errors.endTime = ERRORS_HOUR_END_BEFORE_START
  }

  return errors
}

module.exports = async function(bot, message) {
  const { view, incoming_message } = message
  const { channelData } = incoming_message
  const { user } = channelData
  let messageReply = JSON.parse(view.private_metadata)

  const errors = validate(view.state.values)
  if (Object.keys(errors).length > 0) {
    bot.httpBody({
      response_action: 'errors',
      errors: errors,
    })
  } else {
    await bot.replyPrivate(
      messageReply,
      `Reserved Room ${view.state.values.room.roomValue.selected_option.text.text} in date ${view.state.values.date.dateValue.selected_date} between hours ${view.state.values.startTime.startTimeValue.selected_option.value} to ${view.state.values.endTime.endTimeValue.selected_option.value} with title ${view.state.values.title.titleValue.value} and user ${user.name}`
    )
  }
}
