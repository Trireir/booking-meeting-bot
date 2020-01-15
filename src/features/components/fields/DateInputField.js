const {
  FIELD_DATE_DATE,
  FIELD_DATE_SELECT_DATE,
} = require('../../../utils/texts')

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
        text: FIELD_DATE_SELECT_DATE,
        emoji: true,
      },
    },
    label: {
      type: 'plain_text',
      text: FIELD_DATE_DATE,
      emoji: true,
    },
  }
}
