function generateHours() {
  const options = []
  let date = new Date()
  for (let i = 8; i <= 19; i++) {
    date.setHours(i, 0, 0)
    options.push({
      text: {
        type: 'plain_text',
        text: `${i}:00`,
        emoji: true,
      },
      value: `${date.getTime()}`,
    })
    date.setHours(i, 15, 0)
    options.push({
      text: {
        type: 'plain_text',
        text: `${i}:15`,
        emoji: true,
      },
      value: `${date.getTime()}`,
    })
    date.setHours(i, 30, 0)
    options.push({
      text: {
        type: 'plain_text',
        text: `${i}:30`,
        emoji: true,
      },
      value: `${date.getTime()}`,
    })
    date.setHours(i, 45, 0)
    options.push({
      text: {
        type: 'plain_text',
        text: `${i}:45`,
        emoji: true,
      },
      value: `${date.getTime()}`,
    })
  }
  return options
}

//type = start / end / other
module.exports = function(type, label) {
  return {
    type: 'input',
    block_id: `${type}Time`,
    element: {
      type: 'static_select',
      action_id: `${type}TimeValue`,
      placeholder: {
        type: 'plain_text',
        text: `${label} Time`,
        emoji: true,
      },
      options: generateHours(),
    },
    label: {
      type: 'plain_text',
      text: `${label} Time`,
      emoji: true,
    },
  }
}
