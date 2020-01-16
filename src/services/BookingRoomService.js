const BookingRoomAxios = require('./BookingRoomAxios')
const { isRoomAvailable, getMyBookings } = require('../utils/utils')
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

  async getRoomsAvailability({ when }) {
    const rooms = this.getRooms()
    const data = await Promise.all(buildGetBookingRequests(rooms))

    return data.map((el, index) => ({
      roomName: rooms[index].name,
      floor: rooms[index].floor,
      ...isRoomAvailable(el, when),
    }))
  },

  async getAuthGroup({ authId }) {
    const data = await BookingRoomAxios.post('/Display/AuthenticateGroup', {
      roomId: this.getRooms()[0].id,
      profileId: SERVER_PROFILE_ID,
      authId,
      isSecondaryAuth: false,
    })

    return data.Data1[0].GroupID
  },

  async getMyBookings({ authId, time }) {
    const groupId = await this.getAuthGroup({ authId })
    const rooms = this.getRooms()
    const data = await Promise.all(buildGetBookingRequests(rooms))

    return getMyBookings(data, groupId, rooms, time)
  },
}

module.exports = BookingRoomService
