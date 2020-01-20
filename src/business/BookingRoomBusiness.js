const BookingRoomService = require('../services/BookingRoomService')
const { getDateFromValues } = require('../utils/date')

const getRooms = () => {
  return BookingRoomService.getRooms()
}

const getRoomsAvailability = async ({ hours, minutes }) => {
  const time = getDateFromValues({ hours, minutes }).getTime()
  return await BookingRoomService.getRoomsAvailability({ when: time })
}

const getMyBookings = async ({ userId }) => {
  return await BookingRoomService.getMyBookings({ authId: userId })
}

module.exports = { getRoomsAvailability, getRooms, getMyBookings }
