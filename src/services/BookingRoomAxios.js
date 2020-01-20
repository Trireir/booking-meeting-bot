const axios = require('axios')
const { SERVER_URL } = require('../../env')

const BookingRoomAxios = axios.create({
  baseURL: SERVER_URL,
})

BookingRoomAxios.interceptors.response.use(
  async response => response.data,
  async error => {
    throw {
      key: 'API Error',
      error,
      message:
        'Sorry, a problem occurred when requesting data, please try it again.	',
    }
  }
)

module.exports = BookingRoomAxios
