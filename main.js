
const Telegraf = require('telegraf');
const session = require('telegraf/session');
const controller = require('./controller');
require('dotenv').config();
console.log(process.env.BOT_TOKEN);

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

bot.command('/start', controller.start);
bot.command('/test', controller.test);
bot.command('/vote',controller.vote);
bot.command('/masvotado',controller.masVotado);

bot.on('callback_query', (ctx) => {
    const args = ctx.callbackQuery.data.split(" ");
    const command = args[0];
    args.splice(0,1); 
    switch(command){
        case 'CALENDAR':
            console.log(args);
            switch(args[0]){
                case 'prev':
                case 'post':
                    controller.changeMonth(ctx,args[1],args[2]);
                    break;
                default:
                    controller.pickDate(ctx,args[0],args[1],args[2]);
                    break;
            }
            break;
        case 'NULL':
            ctx.reply("Campo nulo");
        default:
            ctx.reply("Opcion no valida, vuleva a pulsar");
            break;
    }
    console.log(ctx.callbackQuery.data);
});

bot.hears(new RegExp("HORA: [0-9]+:00"),ctx => controller.pickHour(ctx));

bot.startPolling();