// Import Botkit's core features
const { Botkit } = require('botkit')

// Import a platform-specific adapter for slack.
const {
  SlackAdapter,
  SlackMessageTypeMiddleware,
  SlackEventMiddleware,
} = require('botbuilder-adapter-slack')

const {
  SLACK_URI,
  SLACK_APP_SIGNIN_SECRET,
  SLACK_BOT_USER_OAUTH,
} = require('../env')

const adapter = new SlackAdapter({
  // REMOVE THIS OPTION AFTER YOU HAVE CONFIGURED YOUR APP!
  enable_incomplete: true,

  clientSigningSecret: SLACK_APP_SIGNIN_SECRET,
  // auth token for a single-team app
  botToken: SLACK_BOT_USER_OAUTH,
  scopes: ['bot'],
})

// Use SlackEventMiddleware to emit events that match their original Slack event types.
adapter.use(new SlackEventMiddleware())

// Use SlackMessageType middleware to further classify messages as direct_message, direct_mention, or mention
adapter.use(new SlackMessageTypeMiddleware())

const controller = new Botkit({
  webhook_uri: SLACK_URI,

  adapter: adapter,
})

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(__dirname + '/../features')
})

controller.webserver.get('/', (req, res) => {
  res.send(
    `(Slack Controller) This app is running Botkit ${controller.version}.`
  )
})
