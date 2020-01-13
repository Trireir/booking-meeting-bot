const { RoomField, HourField, DateField } = require('./fields/index')

module.exports = async function(bot, message) {
  const trigger_id = message.trigger_id
  const response = await bot.api.views.open({
    trigger_id: trigger_id,
    view: {
      type: 'modal',
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
          element: {
            type: 'plain_text_input',
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
        RoomField([
          { name: 'Tetris', id: '1' },
          { name: 'Space Invaders', id: '2' },
          { name: 'Mario Bros', id: '3' },
        ]),
        DateField(),
        HourField('start'),
        HourField('end'),
      ],
    },
  })

  await bot.replyPrivate(message, 'It seems you want to book a meeting room...')
  await bot.replyPrivate(message, response)
}
