module.exports = function() {
  return {
    type: 'input',
    block_id: 'title',
    element: {
      type: 'plain_text_input',
      action_id: 'titleValue',
      placeholder: {
        type: 'plain_text',
        text: 'Title',
        emoji: true,
      },
    },
    label: {
      type: 'plain_text',
      text: 'Metting name',
      emoji: true,
    },
  }
}
