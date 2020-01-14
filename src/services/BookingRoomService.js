const BookingRoomAxios = require('./BookingRoomAxios')
const { SERVER_PROFILE_ID, ROOMS } = require('../utils/config')

const buildGetBookingRequests = () => {
  const params = {
    utcStart: new Date().toISOString(),
    profileId: SERVER_PROFILE_ID,
    pollingInterval: 122000,
  }
  return ROOMS.slice(0, 4).map(el =>
    BookingRoomAxios.post('/Display/GetBookings', { ...params, roomId: el.id })
  )
}

const BookingRoomService = {
  getRooms() {
    return ROOMS
  },

  async getBookings() {
    const data = await Promise.all(buildGetBookingRequests())

    return data.map((el, index) => {
      return {
        bookingId: el.Data1.BookingId,
        roomName: ROOMS[index].name,
        eventName: el.Data1.EventName,
        user: el.Data1.GroupName,
        type: el.Data1.EventType,
        checkedIn: el.Data1.CheckedIn,
      }
    })
  },
}

module.exports = BookingRoomService
