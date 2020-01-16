const { toHourAndMinStringFormat } = require('../../utils/date')

module.exports = function({ roomName, floor, isAvailable, time }) {
  const timeFormatted = toHourAndMinStringFormat(time)

  const textToDisplay = `*${roomName}* (${floor}) ${
    time ? `until ${timeFormatted}` : ''
  }`

  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `${isAvailable ? ':white_check_mark:' : ':x:'} ${textToDisplay}`,
    },
  }
}
