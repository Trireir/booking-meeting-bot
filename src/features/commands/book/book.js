const {
  RoomField,
  HourField,
  DateField,
} = require('../../components/fields/index')
const { ROOMS } = require('../../../utils/config')
module.exports = async function(bot, message) {
  const trigger_id = message.trigger_id
  const messageStr = JSON.stringify({
    channel_id: message.channel_id,
    response_url: message.response_url,
    incoming_message: message.incoming_message,
  })
  const response = await bot.api.views.open({
    trigger_id: trigger_id,
    view: {
      type: 'modal',
      callback_id: 'book-modal',
      private_metadata: `${messageStr}`,
      title: {
        type: 'plain_text',
        text: 'Book a room',
        emoji: true,
      },
      submit: {
        type: 'plain_text',
        text: 'Book',
        emoji: true,
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true,
      },
      blocks: [
        {
          type: 'input',
          block_id: 'title',
          element: {
            type: 'plain_text_input',
            action_id: 'titleValue',
            placeholder: {
              type: 'plain_text',
              text: 'Title',
              emoji: true,
            },
          },
          label: {
            type: 'plain_text',
            text: 'Title',
            emoji: true,
          },
        },
        RoomField(ROOMS),
        DateField(),
        HourField('start'),
        HourField('end'),
      ],
    },
  })

  await bot.replyPrivate(message, 'It seems you want to book a meeting room...')
  await bot.replyPrivate(message, response)
}
