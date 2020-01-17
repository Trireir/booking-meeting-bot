const {
  ERRORS_DATE_PAST,
  ERRORS_HOUR_END_BEFORE_START,
  BOOK_NEAR_END_TEXT,
  ERRORS_HOUR_END_BEFORE_NOW,
  ERRORS_SOMETHING_WRONG,
} = require('../../../utils/texts')

const { SLACK_BOT_USER_OAUTH } = require('../../../../env')
const { bookRoom } = require('../../../business/BookingRoomBusiness')

function isToday(date, now) {
  return new Date(date).getTime() <= now.getTime() + 86400000
}
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
  } else {
    if (
      isToday(values.date.dateValue.selected_date, now) &&
      parseInt(values.endTime.endTimeValue.selected_option.value) <
        new Date().getTime()
    ) {
      errors.endTime = ERRORS_HOUR_END_BEFORE_NOW
    }
  }

  return errors
}

function getHourString(dateString) {
  const date = new Date(parseInt(dateString))
  return `${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}`
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
    const timeStart = new Date(view.state.values.date.dateValue.selected_date)

    const startHour = new Date(
      parseInt(view.state.values.startTime.startTimeValue.selected_option.value)
    )

    timeStart.setHours(startHour.getHours())
    timeStart.setMinutes(startHour.getMinutes())
    timeStart.setSeconds(startHour.getSeconds())

    const timeEnd = new Date(view.state.values.date.dateValue.selected_date)

    const endHour = new Date(
      parseInt(view.state.values.endTime.endTimeValue.selected_option.value)
    )
    timeEnd.setHours(endHour.getHours())
    timeEnd.setMinutes(endHour.getMinutes())
    timeEnd.setSeconds(endHour.getSeconds())

    const values = {
      startHour: timeStart,
      endHour: timeEnd,
      roomId: view.state.values.room.roomValue.selected_option.value,
      eventName: view.state.values.title.titleValue.value,
    }

    const response = await bookRoom(values, user)

    if (response.MessageCode === 0) {
      await bot.replyPrivate(
        messageReply,
        `Reserved Room ${
          view.state.values.room.roomValue.selected_option.text.text
        } in date ${
          view.state.values.date.dateValue.selected_date
        } between hours ${getHourString(
          view.state.values.startTime.startTimeValue.selected_option.value
        )} to ${getHourString(
          view.state.values.endTime.endTimeValue.selected_option.value
        )} with title ${view.state.values.title.titleValue.value} and user ${
          user.name
        }`
      )

      const scheduleReminderDate = Math.round(timeEnd.getTime() / 1000) - 3 * 60

      if (scheduleReminderDate * 1000 > new Date().getTime()) {
        await bot.api.chat.scheduleMessage({
          token: SLACK_BOT_USER_OAUTH,
          channel: messageReply.incoming_message.channelData.user_id,
          post_at: scheduleReminderDate,
          text: BOOK_NEAR_END_TEXT,
        })
      }
    } else {
      bot.httpBody({
        response_action: 'errors',
        errors: {
          title: `${ERRORS_SOMETHING_WRONG} - code {${response.Message}}`,
        },
      })
    }
  }
}
