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

  async getAuthGroup({ authId, roomId }) {
    const data = await BookingRoomAxios.post('/Display/AuthenticateGroup', {
      roomId: roomId,
      profileId: SERVER_PROFILE_ID,
      authId,
      isSecondaryAuth: false,
    })

    return data.Data1[0].GroupID
  },

  async getMyBookings({ authId, time }) {
    const groupId = await this.getAuthGroup({
      authId,
      roomId: this.getRooms()[0].id,
    })
    const rooms = this.getRooms()
    const data = await Promise.all(buildGetBookingRequests(rooms))

    return getMyBookings(data, groupId, rooms, time)
  },

  async bookRoom({ authId, startHour, endHour, roomId, authName, eventName }) {
    const groupId = await this.getAuthGroup({ authId, roomId })

    const response = await BookingRoomAxios.post('/Display/AddBooking', {
      roomId: roomId,
      profileId: SERVER_PROFILE_ID,
      isSecondaryAuth: false,
      utcStart: startHour,
      utcEnd: endHour,
      groupId: groupId,
      contactId: 0,
      groupName: authName,
      eventName: eventName,
      attendance: 1,
      connectionName: '',
    })

    return response.Data[0]
  },

  async updateBooking({ utcStart, utcEnd, roomId, bookingId }) {
    const response = await BookingRoomAxios.post('/Display/UpdateBooking', {
      roomId: roomId,
      profileId: SERVER_PROFILE_ID,
      utcStart: utcStart,
      utcEnd: utcEnd,
      bookingId: bookingId,
      connectionName: '',
    })
    return response
  },
}

module.exports = BookingRoomService
