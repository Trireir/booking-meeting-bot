const { toHourAndMinStringFormat } = require('../../utils/date')

module.exports = function({ roomName, floor, startTime, endTime }) {
  const startTimeFormatted = toHourAndMinStringFormat(startTime)

  const endTimeFormatted = toHourAndMinStringFormat(endTime)

  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*${startTimeFormatted} - ${endTimeFormatted}* | ${roomName} (${floor})`,
    },
  }
}
