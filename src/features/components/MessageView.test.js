const messageView = require('./MessageView')

describe('MessageView', () => {
  const text = 'text example'
  const result = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: text,
    },
  }
  it('should create a MessageView', () => {
    expect(messageView({ text })).toEqual(result)
  })
})
