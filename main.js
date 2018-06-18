const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('/hello', (ctx) => {
    ctx.reply();
});

bot.startPolling();