module.exports = function({
  block_id,
  action_id,
  label,
  placeholder,
  options,
  defaultValue,
}) {
  return {
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
      initial_option: defaultValue,
    },
    label: {
      type: 'plain_text',
      text: label,
      emoji: true,
    },
  }
}
