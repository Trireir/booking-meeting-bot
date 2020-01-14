const { BOOKING_STATES } = require('./config')

const isRoomAvailable = (bookings = []) => {
  const roomStates = bookings.map(booking => {
    return getRoomState(booking)
  })

  const currentState = roomStates.find(
    el => el.state === BOOKING_STATES.NOW || el.state === BOOKING_STATES.FUTURE
  )

  return {
    isAvailable:
      currentState && currentState.state === BOOKING_STATES.NOW ? false : true,
    time: currentState && currentState.time,
  }
}

const getRoomState = booking => {
  // Time difference between UTC and local time
  const timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000
  const msReservedStart =
    new Date(booking.UTCReservedStartDateTime).getTime() - timeZoneOffset
  const msEventStart =
    new Date(booking.UTCEventStartDateTime).getTime() - timeZoneOffset
  const msEventEnd =
    new Date(booking.UTCEventEndDateTime).getTime() - timeZoneOffset

  const now = new Date().getTime()

  if (msEventStart < now && now < msEventEnd) {
    return { state: BOOKING_STATES.NOW, time: msEventEnd }
  }

  // Past meetings
  if (now > msEventEnd) {
    return { state: BOOKING_STATES.PAST }
  }

  // Future meetings
  if (now < msReservedStart) {
    return { state: BOOKING_STATES.FUTURE, time: msReservedStart }
  }
}

module.exports = {
  isRoomAvailable,
}
