const BookingRoomAxios = require('../services/BookingRoomAxios')
const MockAdapter = require('axios-mock-adapter')
const { getRoomsAvailability, getRooms } = require('./BookingRoomBusiness')
const { ROOMS } = require('../utils/config')

const axiosMock = new MockAdapter(BookingRoomAxios)

describe('BookingRoomBusiness', () => {
  beforeEach(() => {
    axiosMock.reset()
  })

  it('should get rooms', () => {
    expect(getRooms()).toEqual(ROOMS)
  })

  it('should get rooms availability', async () => {
    const backendResponse = {
      Data1: [
        {
          BookingID: 58840588,
          UTCReservedStartDateTime: '2020-01-14T13:10:00',
          UTCReservedEndDateTime: '2020-01-14T15:43:00',
          UTCEventStartDateTime: '2020-01-14T13:10:00',
          UTCEventEndDateTime: '2020-01-14T15:43:00',
          EventName: 'Meeting',
          GroupName: 'Blanco Blanco, Adrián ',
          ContactName: '(none)',
          EventType: 'Internal',
          SetupType: 'Standard Enclosed',
          GroupID: 3226440,
          ContactID: -1,
          CheckedIn: true,
          Editable: true,
          NewProfileID: 0,
          VideoConference: false,
          PAMID: null,
          CalendarUID: null,
          AllowEndNow: true,
        },
      ],
      Data: [
        {
          MessageCode: 0,
          Message: 'Success',
        },
      ],
    }

    axiosMock.onPost('/Display/GetBookings').reply(200, backendResponse)
    const availability = await getRoomsAvailability({ hours: 12, minutes: 0 })
    expect(availability.length).toBeGreaterThan(0)
    expect(availability[0].isAvailable).toBeTruthy()
    expect(availability[0].roomName).toBeDefined()
  })
})
