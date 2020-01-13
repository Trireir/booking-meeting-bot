function generateHours() {
  const options = []
  for (let i = 8; i <= 19; i++) {
    options.push({
      label: `${i}:00`,
      value: `${i}:00`,
    })
    options.push({
      label: `${i}:15`,
      value: `${i}:15`,
    })
    options.push({
      label: `${i}:30`,
      value: `${i}:30`,
    })
    options.push({
      label: `${i}:45`,
      value: `${i}:45`,
    })
  }
  return options
}

//type = start / end / hour
module.exports = function(type) {
  if (type === 'start') {
    return {
      label: 'Start time',
      name: 'startTime',
      type: 'select',
      options: generateHours(),
    }
  }

  if (type === 'end') {
    return {
      label: 'End time',
      name: 'endTime',
      type: 'select',
      options: generateHours(),
    }
  }

  return {
    label: 'time',
    name: 'time',
    type: 'select',
    options: generateHours(),
  }
}
