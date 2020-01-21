const {
  TextInputField,
  SelectInputField,
  DatePickerInputField,
} = require('../../components/fields/index')
const Modal = require('../../components/Modal')
const { ROOMS } = require('../../../utils/config')
const {
  FIELD_START_TIME,
  FIELD_END_TIME,
  FIELD_TITLE_PLACEHOLDER,
  FIELD_TITLE_LABEL,
  FIELD_ROOM_PLACEHOLDER,
  FIELD_ROOM_LABEL,
  FIELD_DATE_LABEL,
  FIELD_DATE_PLACEHOLDER,
} = require('../../../utils/texts')

function parseRooms(rooms) {
  return rooms.map(room => ({
    text: {
      type: 'plain_text',
      text: `${room.name} (${room.floor})`,
      emoji: true,
    },
    value: room.id.toString(),
  }))
}

function generateHours() {
  const options = []
  let date = new Date()
  for (let i = 8; i <= 19; i++) {
    for (let j = 0; j <= 45; j += 15) {
      date.setHours(i, j, 0)
      options.push({
        text: {
          type: 'plain_text',
          text: `${i}:${j < 10 ? '0' : ''}${j}`,
          emoji: true,
        },
        value: `${date.getTime()}`,
      })
    }
  }
  return options
}

module.exports = async function(bot, message) {
  const trigger_id = message.trigger_id
  const messageStr = JSON.stringify({
    channel_id: message.channel_id,
    response_url: message.response_url,
    incoming_message: message.incoming_message,
  })
  const response = await bot.api.views.open(
    Modal(
      trigger_id,
      [
        TextInputField(
          'title',
          'titleValue',
          FIELD_TITLE_PLACEHOLDER,
          FIELD_TITLE_LABEL
        ),
        SelectInputField(
          'room',
          'roomValue',
          FIELD_ROOM_PLACEHOLDER,
          FIELD_ROOM_LABEL,
          parseRooms(ROOMS)
        ),
        DatePickerInputField(
          'date',
          'dateValue',
          FIELD_DATE_PLACEHOLDER,
          FIELD_DATE_LABEL,
          parseRooms(ROOMS)
        ),
        SelectInputField(
          'startTime',
          'startTimeValue',
          FIELD_START_TIME,
          FIELD_START_TIME,
          generateHours()
        ),
        SelectInputField(
          'endTime',
          'endTimeValue',
          FIELD_END_TIME,
          FIELD_END_TIME,
          generateHours(ROOMS)
        ),
      ],
      messageStr
    )
  )

  await bot.replyPrivate(message, response)
}
