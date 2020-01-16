const getTimeFromUTCStringFormatDate = UTCStringDate => {
  const date = new Date(UTCStringDate)

  // Time difference between UTC and local time
  const timeZoneOffset = date.getTimezoneOffset() * 60 * 1000
  return date.getTime() - timeZoneOffset
}

const toHourAndMinStringFormat = time => {
  return new Date(time).toLocaleString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  })
}

const parseHoursAndMinString = timeString => {
  const date = new Date()
  if (timeString) {
    const [hours, minutes] = timeString.split(':')
    date.setHours(parseInt(hours))
    date.setMinutes(parseInt(minutes))
  }
  return date.getTime()
}

module.exports = {
  getTimeFromUTCStringFormatDate,
  toHourAndMinStringFormat,
  parseHoursAndMinString,
}
