const roomInfoView = require('./RoomInfoView')
const { toHourAndMinStringFormat } = require('../../utils/date')

describe('MyBookingsView', () => {
  const roomName = 'room'
  const floor = '1 floor'
  const isAvailable = true
  const time = new Date().getTime()
  const timeFormatted = toHourAndMinStringFormat(time)
  const result = available => ({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `${
        available ? ':white_check_mark:' : ':x:'
      } ${`*${roomName}* (${floor}) ${time ? `until ${timeFormatted}` : ''}`}`,
    },
  })
  it('should create Room Info view', () => {
    expect(roomInfoView({ roomName, floor, isAvailable, time })).toEqual(
      result(true)
    )

    expect(roomInfoView({ roomName, floor, isAvailable: false, time })).toEqual(
      result(false)
    )
  })
})
