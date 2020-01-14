function generateHours() {
  const options = []
  for (let i = 8; i <= 19; i++) {
    options.push({
      text: {
        type: 'plain_text',
        text: `${i}:00`,
        emoji: true,
      },
      value: `${i}:00`,
    })
    options.push({
      text: {
        type: 'plain_text',
        text: `${i}:15`,
        emoji: true,
      },
      value: `${i}:15`,
    })
    options.push({
      text: {
        type: 'plain_text',
        text: `${i}:30`,
        emoji: true,
      },
      value: `${i}:30`,
    })
    options.push({
      text: {
        type: 'plain_text',
        text: `${i}:45`,
        emoji: true,
      },
      value: `${i}:45`,
    })
  }
  return options
}

//type = start / end / hour
module.exports = function(type) {
  if (type === 'start') {
    return {
      type: 'input',
      block_id: 'startTime',
      element: {
        type: 'static_select',
        action_id: 'startTimeValue',
        placeholder: {
          type: 'plain_text',
          text: 'Start Time',
          emoji: true,
        },
        options: generateHours(),
      },
      label: {
        type: 'plain_text',
        text: 'Start Time',
        emoji: true,
      },
    }
  }

  if (type === 'end') {
    return {
      type: 'input',
      block_id: 'endTime',
      element: {
        type: 'static_select',
        action_id: 'endTimeValue',
        placeholder: {
          type: 'plain_text',
          text: 'End Time',
          emoji: true,
        },
        options: generateHours(),
      },
      label: {
        type: 'plain_text',
        text: 'End Time',
        emoji: true,
      },
    }
  }

  return {
    type: 'input',
    block_id: 'time',
    element: {
      type: 'static_select',
      action_id: 'timeValue',
      placeholder: {
        type: 'plain_text',
        text: 'Time',
        emoji: true,
      },
      options: generateHours(),
    },
    label: {
      type: 'plain_text',
      text: 'Time',
      emoji: true,
    },
  }
}
