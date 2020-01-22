const {
  getMyBookings,
  updateBooking,
} = require('../../../business/BookingRoomBusiness')

const {
  EXTEND_SUCCESS,
  EXTEND_ERROR_NO_BOOKING,
  EXTEND_ERROR_UNEXPECTED,
} = require('../../../utils/texts')

const extendDuration = async (bot, message) => {
  const userId = message.incoming_message.channelData.user_name
  const minutes =
    message.incoming_message.text && parseInt(message.incoming_message.text)
  const bookings = await getMyBookings({ userId })

  if (bookings.length > 0) {
    let room = bookings.reduce((room, booking) => {
      if (room) {
        if (room.endTime > booking.endTime) {
          room = booking
        }
      } else {
        room = booking
      }
    })

    const extendMinutes = minutes || 15

    const response = await updateBooking({
      utcStart: new Date(room.startTime),
      utcEnd: new Date(room.endTime + extendMinutes * 60 * 1000),
      roomId: room.roomId,
      bookingId: room.bookingId,
    })

    if (
      response.Data &&
      response.Data[0] &&
      response.Data[0].MessageCode === 0
    ) {
      await bot.replyPrivate(message, EXTEND_SUCCESS(extendMinutes))
    } else {
      await bot.replyPrivate(message, EXTEND_ERROR_UNEXPECTED)
    }
  } else {
    await bot.replyPrivate(message, EXTEND_ERROR_NO_BOOKING)
  }
}

module.exports = extendDuration
