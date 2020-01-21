const { BotMock, SlackApiMock } = require('botkit-mock')
const slackFeatures = require('./slack_features')

const {
  SlackAdapter,
  SlackMessageTypeMiddleware,
  SlackEventMiddleware,
} = require('botbuilder-adapter-slack')

describe('slack_features', () => {
  let controller = undefined

  beforeEach(async () => {
    const adapter = new SlackAdapter({
      clientSigningSecret: 'secret',
      botToken: 'token',
      debug: true,
    })

    adapter.use(new SlackEventMiddleware())
    adapter.use(new SlackMessageTypeMiddleware())

    controller = new BotMock({
      adapter: adapter,
    })

    SlackApiMock.bindMockApi(controller)

    slackFeatures(controller)
  })

  it('should check slash command', async () => {
    let userInfo = {
      slackId: 'slackId',
      channel: 'channel',
    }
    const reply = await controller.usersInput([
      {
        type: 'slash_command',
        user: userInfo.slackId,
        channel: userInfo.channel,
        messages: [
          {
            text: '/list',
            isAssertion: true,
          },
        ],
      },
    ])
    expect(reply).toEqual({})
  })
})
