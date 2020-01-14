const axios = require('axios')
const { SERVER_URL } = require('../../env')

const BookingRoomAxios = axios.create({
  baseURL: SERVER_URL,
})

BookingRoomAxios.interceptors.response.use(async response => response.data)

module.exports = BookingRoomAxios
