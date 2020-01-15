const { MODAL_SUBMIT, MODAL_CANCEL, MODAL_TITLE } = require('../../utils/texts')

module.exports = function(trigger_id, elements, messageStr) {
  return {
    trigger_id: trigger_id,
    view: {
      type: 'modal',
      callback_id: 'book-modal',
      private_metadata: `${messageStr}`,
      title: {
        type: 'plain_text',
        text: MODAL_TITLE,
        emoji: true,
      },
      submit: {
        type: 'plain_text',
        text: MODAL_SUBMIT,
        emoji: true,
      },
      close: {
        type: 'plain_text',
        text: MODAL_CANCEL,
        emoji: true,
      },
      blocks: elements,
    },
  }
}
