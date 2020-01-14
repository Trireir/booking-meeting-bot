module.exports = function(trigger_id, elements, messageStr) {
  return {
    trigger_id: trigger_id,
    view: {
      type: 'modal',
      callback_id: 'book-modal',
      private_metadata: `${messageStr}`,
      title: {
        type: 'plain_text',
        text: 'Book a room',
        emoji: true,
      },
      submit: {
        type: 'plain_text',
        text: 'Book',
        emoji: true,
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true,
      },
      blocks: elements,
    },
  }
}
