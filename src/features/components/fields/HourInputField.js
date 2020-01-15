function generateHours() {
  const options = []
  let date = new Date()
  for (let i = 8; i <= 19; i++) {
    for (let j = 0; j <= 45; j += 15) {
      date.setHours(i, j, 0)
      options.push({
        text: {
          type: 'plain_text',
          text: `${i}:${j < 10 ? '0' : ''}${j}`,
          emoji: true,
        },
        value: `${date.getTime()}`,
      })
    }
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
        text: `${label}`,
        emoji: true,
      },
      options: generateHours(),
    },
    label: {
      type: 'plain_text',
      text: `${label}`,
      emoji: true,
    },
  }
}
