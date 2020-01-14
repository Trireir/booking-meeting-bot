const BookingRoomService = require('../services/BookingRoomService')

const getRooms = () => {
  return BookingRoomService.getRooms()
}

const getRoomsAvailability = async () => {
  return await BookingRoomService.getRoomsAvailability()
}

module.exports = { getRoomsAvailability, getRooms }
