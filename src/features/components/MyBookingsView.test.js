const myBookingsView = require('./MyBookingsView')
const { toHourAndMinStringFormat } = require('../../utils/date')

describe('MyBookingsView', () => {
  const roomName = 'room'
  const floor = '1 floor'
  const eventName = 'event 1'
  const startTime = new Date().getTime() - 360000
  const endTime = new Date().getTime()
  const startTimeFormatted = toHourAndMinStringFormat(startTime)
  const endTimeFormatted = toHourAndMinStringFormat(endTime)
  const result = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*${startTimeFormatted} - ${endTimeFormatted}* | ${roomName} (${floor}) - ${eventName}`,
    },
  }
  it('should create My Bookings view', () => {
    expect(
      myBookingsView({ roomName, floor, eventName, startTime, endTime })
    ).toEqual(result)
  })
})
