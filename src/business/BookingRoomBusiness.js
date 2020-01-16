const BookingRoomService = require('../services/BookingRoomService')
const { parseHoursAndMinString } = require('../utils/date')

const getRooms = () => {
  return BookingRoomService.getRooms()
}

const getRoomsAvailability = async ({ timeString }) => {
  const time = parseHoursAndMinString(timeString)
  return await BookingRoomService.getRoomsAvailability({ when: time })
}

const getMyBookings = async ({ userId }) => {
  return await BookingRoomService.getMyBookings({ authId: userId })
}

module.exports = { getRoomsAvailability, getRooms, getMyBookings }
