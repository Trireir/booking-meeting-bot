module.exports = function({ roomName, floor, isAvailable }) {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `${
        isAvailable ? ':white_check_mark:' : ':x:'
      }  *${roomName}* (${floor}) until 6:00pm`,
    },
  }
}
