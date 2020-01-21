const modal = require('./Modal')
const { MODAL_SUBMIT, MODAL_CANCEL, MODAL_TITLE } = require('../../utils/texts')

describe('Modal', () => {
  const trigger_id = 'triggerId'
  const elements = [{ text: 'element1' }, { text: 'element2' }]
  const messageStr = 'private metadata'
  const result = {
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
  it('should create a Modal', () => {
    expect(modal(trigger_id, elements, messageStr)).toEqual(result)
  })
})
