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

const getDateFromValues = ({ hours, minutes }) => {
  const date = new Date()
  if (hours !== undefined) date.setHours(hours)
  if (minutes !== undefined) date.setMinutes(minutes)
  return date
}

const isToday = date => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const inputDate = new Date(date).getTime()
  return inputDate <= now.getTime() + 86400000 && inputDate > now.getTime()
}

module.exports = {
  getTimeFromUTCStringFormatDate,
  toHourAndMinStringFormat,
  getDateFromValues,
  isToday,
}
