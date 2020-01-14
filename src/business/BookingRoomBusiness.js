const BookingRoomService = require('../services/BookingRoomService')

const getRooms = () => {
  return BookingRoomService.getRooms()
}

const getRoomsAvailability = async () => {
  const data = await BookingRoomService.getBookings()
  console.log(data)
}

module.exports = { getRoomsAvailability, getRooms }
