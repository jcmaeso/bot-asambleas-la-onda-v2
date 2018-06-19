
const Telegraf = require('telegraf');
const controller = require('./controller');
require('dotenv').config();
console.log(process.env.BOT_TOKEN);

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('/start', controller.start);

bot.startPolling();