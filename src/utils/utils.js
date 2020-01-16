const { BOOKING_STATES } = require('./config')
const { getTimeFromUTCStringFormatDate } = require('./date')

const isRoomAvailable = (room, when = new Date().getTime()) => {
  const roomBookingsStates = room.Data1.map(booking => {
    return getBookingState(booking, when)
  })

  const currentState = roomBookingsStates.find(
    el => el.state === BOOKING_STATES.NOW || el.state === BOOKING_STATES.FUTURE
  )

  return {
    isAvailable:
      currentState && currentState.state === BOOKING_STATES.NOW ? false : true,
    time: currentState && currentState.time,
  }
}

const getMyBookings = (roomList, groupId, rooms) => {
  const myBookings = []

  const room_bookings = roomList.map(room => {
    return room.Data1.filter(booking => booking.GroupID === groupId)
  })

  room_bookings.forEach((bookings, index) => {
    if (bookings.length) {
      bookings.forEach(booking => {
        myBookings.push({
          roomName: rooms[index].name,
          floor: rooms[index].floor,
          startTime: getTimeFromUTCStringFormatDate(
            booking.UTCReservedStartDateTime
          ),
          endTime: getTimeFromUTCStringFormatDate(
            booking.UTCReservedEndDateTime
          ),
        })
      })
    }
  })
  return myBookings
}

/**
 * Gets the booking state
 * Returns the state of the booking
 * @param booking
 * @param when Time in millisecond when you want to check the state. Default is now.
 * @returns {Object}
 */
const getBookingState = (booking, when = new Date().getTime()) => {
  // Time difference between UTC and local time
  const msReservedStart = getTimeFromUTCStringFormatDate(
    booking.UTCReservedStartDateTime
  )
  const msEventStart = getTimeFromUTCStringFormatDate(
    booking.UTCEventStartDateTime
  )
  const msEventEnd = getTimeFromUTCStringFormatDate(booking.UTCEventEndDateTime)

  if (msEventStart < when && when < msEventEnd) {
    return { state: BOOKING_STATES.NOW, time: msEventEnd }
  }

  // Past meetings
  if (when > msEventEnd) {
    return { state: BOOKING_STATES.PAST }
  }

  // Future meetings
  if (when < msReservedStart) {
    return { state: BOOKING_STATES.FUTURE, time: msReservedStart }
  }
}

module.exports = {
  isRoomAvailable,
  getMyBookings,
}
