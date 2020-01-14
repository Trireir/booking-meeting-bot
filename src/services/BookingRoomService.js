const BookingRoomAxios = require('./BookingRoomAxios')
const { isRoomAvailable } = require('../utils/utils')
const { SERVER_PROFILE_ID, ROOMS } = require('../utils/config')

const buildGetBookingRequests = rooms => {
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)

  const params = {
    utcStart: startDate.toISOString(),
    profileId: SERVER_PROFILE_ID,
    pollingInterval: 122000,
  }
  return rooms.map(el =>
    BookingRoomAxios.post('/Display/GetBookings', { ...params, roomId: el.id })
  )
}

const BookingRoomService = {
  getRooms() {
    return ROOMS
  },

  async getRoomsAvailability() {
    const rooms = this.getRooms()
    const data = await Promise.all(buildGetBookingRequests(this.getRooms()))

    return data.map((el, index) => ({
      roomName: rooms[index].name,
      floor: rooms[index].floor,
      ...isRoomAvailable(el),
    }))
  },
}

module.exports = BookingRoomService
