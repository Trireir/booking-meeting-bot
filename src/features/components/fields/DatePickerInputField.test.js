const datePickerInputField = require('./DatePickerInputField')

describe('DatePickerInputField', () => {
  const block_id = 'blockID'
  const action_id = 'actionID'
  const label = 'label'
  const placeholder = 'placeholder'
  const result = {
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
  it('should create a DatePicker field', () => {
    expect(
      datePickerInputField(block_id, action_id, label, placeholder)
    ).toEqual(result)
  })
})
