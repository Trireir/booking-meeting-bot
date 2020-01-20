const isValidHour = hour => typeof hour === 'number' && hour >= 0 && hour < 24

const isValidMinute = min => typeof min === 'number' && min >= 0 && min < 60

const validateHours = timeString => {
  if (timeString) {
    const [hour, minutes] = timeString.split(':')
    const hourInt = parseInt(hour)
    const minuteInt = minutes ? parseInt(minutes) : 0
    if (isValidHour(hourInt) && isValidMinute(minuteInt)) {
      return [hourInt, minuteInt]
    } else {
      throw {
        error: 'Validation error',
        message: 'Invalid format (HH:mm)',
      }
    }
  }
  return []
}

module.exports = {
  validateHours,
}
