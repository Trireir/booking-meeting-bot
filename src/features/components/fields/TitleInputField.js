const {
  FIELD_TITLE_SELECT_TITLE,
  FIELD_TITLE_TITLE,
} = require('../../../utils/texts')

module.exports = function() {
  return {
    type: 'input',
    block_id: 'title',
    element: {
      type: 'plain_text_input',
      action_id: 'titleValue',
      placeholder: {
        type: 'plain_text',
        text: FIELD_TITLE_TITLE,
        emoji: true,
      },
    },
    label: {
      type: 'plain_text',
      text: FIELD_TITLE_SELECT_TITLE,
      emoji: true,
    },
  }
}
