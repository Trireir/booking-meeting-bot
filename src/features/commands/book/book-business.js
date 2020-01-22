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

const minStartTime = 8
const maxEndTime = 19
const stepMinutes = 15

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

function getOptionByHour(hours, mins) {
  let date = new Date()
  date.setHours(hours, mins, 0)
  return {
    text: {
      type: 'plain_text',
      text: `${hours}:${mins < 10 ? '0' : ''}${mins}`,
      emoji: true,
    },
    value: `${date.getTime()}`,
  }
}

function getDefaultDay() {
  const now = new Date()
  const year = now.getFullYear()
  const month =
    now.getMonth() < 9 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
  return `${year}-${month}-${day}`
}

function getDefaultHour(type) {
  const now = new Date()
  let hour = now.getHours()
  //Get a discrete minutes between steps selected
  let minutes = Math.floor(now.getMinutes() / stepMinutes) * stepMinutes

  switch (type) {
    case 'start':
      if (hour > maxEndTime - 1) {
        hour = maxEndTime - 1
      } else {
        if (hour < minStartTime) {
          hour = minStartTime
        }
      }
      return getOptionByHour(hour, minutes)
    case 'end':
      if (hour > maxEndTime) {
        hour = maxEndTime
      } else {
        if (hour < minStartTime + 1) {
          hour = minStartTime + 1
        }
      }
      if (minutes === 60 - stepMinutes) {
        if (hour < maxEndTime) {
          hour = hour + 1
        }
        minutes = 0
      } else {
        minutes += stepMinutes
      }
      return getOptionByHour(hour, minutes)
    default:
      if (hour > maxEndTime) {
        hour = maxEndTime
      } else {
        if (hour < minStartTime) {
          hour = minStartTime
        }
      }
      return getOptionByHour(hour, minutes)
  }
}

function generateHours() {
  const options = []
  let date = new Date()
  for (let i = minStartTime; i <= maxEndTime; i++) {
    for (let j = 0; j <= 45; j += stepMinutes) {
      date.setHours(i, j, 0)
      options.push(getOptionByHour(i, j))
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
        TextInputField({
          block_id: 'title',
          action_id: 'titleValue',
          label: FIELD_TITLE_LABEL,
          placeholder: FIELD_TITLE_PLACEHOLDER,
          defaultValue: 'Meeting',
        }),
        SelectInputField({
          block_id: 'room',
          action_id: 'roomValue',
          label: FIELD_ROOM_LABEL,
          placeholder: FIELD_ROOM_PLACEHOLDER,
          options: parseRooms(ROOMS),
          defaultValue: undefined,
        }),
        DatePickerInputField({
          block_id: 'date',
          action_id: 'dateValue',
          label: FIELD_DATE_LABEL,
          placeholder: FIELD_DATE_PLACEHOLDER,
          defaultValue: getDefaultDay(),
        }),
        SelectInputField({
          block_id: 'startTime',
          action_id: 'startTimeValue',
          label: FIELD_START_TIME,
          placeholder: FIELD_START_TIME,
          options: generateHours(),
          defaultValue: getDefaultHour('start'),
        }),
        SelectInputField({
          block_id: 'endTime',
          action_id: 'endTimeValue',
          label: FIELD_END_TIME,
          placeholder: FIELD_END_TIME,
          options: generateHours(),
          defaultValue: getDefaultHour('end'),
        }),
      ],
      messageStr
    )
  )

  await bot.replyPrivate(message, response)
}
