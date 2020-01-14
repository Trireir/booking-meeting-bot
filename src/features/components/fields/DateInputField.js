//rooms = [{id, name}, ...]
module.exports = function() {
  return {
    type: 'input',
    block_id: 'date',
    element: {
      type: 'datepicker',
      action_id: 'dateValue',
      placeholder: {
        type: 'plain_text',
        text: 'Select a date',
        emoji: true,
      },
    },
    label: {
      type: 'plain_text',
      text: 'Label',
      emoji: true,
    },
  }
}
