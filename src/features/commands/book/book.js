const { SlackDialog } = require('botbuilder-adapter-slack')

const room = require('./fields/Room')
const hour = require('./fields/Hour')

module.exports = async function(bot, message) {
  let dialog = new SlackDialog('Book a room', 'callback_123', 'Save', [
    {
      label: 'Title',
      name: 'title',
      placeholder: 'Title',
      type: 'text',
      min_length: 1,
      max_length: 30,
    },
    room([
      { name: '1', id: '1' },
      { name: '2', id: '2' },
      { name: '3', id: '3' },
    ]),
    {
      label: 'Date',
      name: 'date',
      placeholder: 'dd/mm/yyyy',
      min_length: 10,
      max_length: 10,
      type: 'text',
    },
    hour('start'),
    hour('end'),
  ])

  await bot.replyPrivate(message, 'It seems you want to book a meeting room...')
  await bot.replyWithDialog(message, dialog.asObject())
}
