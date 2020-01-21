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

const bookRoom = async ({ startHour, endHour, roomId, eventName }, user) => {
  return await BookingRoomService.bookRoom({
    authId: user.name,
    startHour: startHour,
    endHour: endHour,
    roomId: roomId,
    authName: user.name,
    eventName: eventName,
  })
}

module.exports = { getRoomsAvailability, getRooms, getMyBookings, bookRoom }
