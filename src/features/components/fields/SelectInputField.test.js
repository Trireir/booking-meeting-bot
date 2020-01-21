const selectInputField = require('./SelectInputField')

describe('SelectInputField', () => {
  const block_id = 'blockID'
  const action_id = 'actionID'
  const label = 'label'
  const placeholder = 'placeholder'
  const options = [
    {
      text: {
        type: 'plain_text',
        text: `one`,
        emoji: true,
      },
      value: 1,
    },
    {
      text: {
        type: 'plain_text',
        text: `two`,
        emoji: true,
      },
      value: 2,
    },
  ]
  const result = {
    type: 'input',
    block_id: block_id,
    element: {
      type: 'static_select',
      action_id: action_id,
      placeholder: {
        type: 'plain_text',
        text: placeholder,
        emoji: true,
      },
      options: options,
    },
    label: {
      type: 'plain_text',
      text: label,
      emoji: true,
    },
  }
  it('should create a Select field', () => {
    expect(
      selectInputField(block_id, action_id, label, placeholder, options)
    ).toEqual(result)
  })
})
