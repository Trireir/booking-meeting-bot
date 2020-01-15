const {
  RoomField,
  HourField,
  DateField,
  TitleField,
} = require('../../components/fields/index')
const Modal = require('../../components/Modal')

const { ROOMS } = require('../../../utils/config')
const { FIELD_START_TIME, FIELD_END_TIME } = require('../../../utils/texts')

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
        TitleField(),
        RoomField(ROOMS),
        DateField(),
        HourField('start', FIELD_START_TIME),
        HourField('end', FIELD_END_TIME),
      ],
      messageStr
    )
  )

  await bot.replyPrivate(message, response)
}
