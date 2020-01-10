require('dotenv').config()

const SLACK_APP_SIGNIN_SECRET = process.env.SLACK_APP_SIGNIN_SECRET
const SLACK_BOT_USER_OAUTH = process.env.SLACK_BOT_USER_OAUTH
const SLACK_URI = process.env.SLACK_URI

module.exports = {
  SLACK_APP_SIGNIN_SECRET,
  SLACK_BOT_USER_OAUTH,
  SLACK_URI,
}
