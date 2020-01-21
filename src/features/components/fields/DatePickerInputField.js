module.exports = function(block_id, action_id, label, placeholder) {
  return {
    type: 'input',
    block_id: block_id,
    element: {
      type: 'datepicker',
      action_id: action_id,
      placeholder: {
        type: 'plain_text',
        text: placeholder,
        emoji: true,
      },
    },
    label: {
      type: 'plain_text',
      text: label,
      emoji: true,
    },
  }
}
