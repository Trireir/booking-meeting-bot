const BookingRoomService = require('../services/BookingRoomService')

const getRooms = () => {
  return BookingRoomService.getRooms()
}

const getRoomsAvailability = async () => {
  return await BookingRoomService.getRoomsAvailability()
}

const getMyBookings = async ({ userId }) => {
  return await BookingRoomService.getMyBookings({ authId: userId })
}

module.exports = { getRoomsAvailability, getRooms, getMyBookings }
