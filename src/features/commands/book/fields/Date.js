//rooms = [{id, name}, ...]
module.exports = function() {
  return {
    type: 'input',
    element: {
      type: 'datepicker',
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
