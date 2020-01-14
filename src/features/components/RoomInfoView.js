module.exports = function({ roomName, floor, isAvailable, time }) {
  const timeFormatted = new Date(time).toLocaleString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  })

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
