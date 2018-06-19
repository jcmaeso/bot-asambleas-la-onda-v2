const {models} = require('./models');
const Sequelize = require("sequelize");
const keyboard = require('./keyboard');

//Creates a new user in db if it doesnt exists
exports.start = (ctx) =>{
    const userId = ctx.update.message.chat.id;
    const username = ctx.update.message.chat.username;
    console.log("UserID: "+userId);
    console.log("username: "+username);
    if(ctx.update.message.chat.type !== 'private'){
        ctx.reply("De momento no funciono en grupos");
        return;
    }
    const user = models.user.build({
        id: userId,
        username: username
    });
    user.save({fields: ["id","username"]}).then(user =>{
        ctx.reply("Se ha registrado correctamente en el bot");
    })
    .catch(Sequelize.ValidationError,error => {
        ctx.reply("Usted ya está registrado probablemente");
        ctx.reply("Si no tiene arroba y es la primera vez que interactua con este bot, por favor introduzca una arroba para facilitar el uso");
        console.log(error);
    })
    .catch(error => {
        ctx.reply("Error desconocido, pongase en contacto con el administrador");
        console.log(error);
    });
};

exports.vote = (ctx) =>{
    ctx.telegram.sendMessage(
        ctx.from.id,
        'Elija la fecha del calendario que desea',
        keyboard.getCalendar());
}

exports.test = (ctx) =>{
    ctx.telegram.sendMessage(
        ctx.from.id,
        'Like?',
        keyboard.inlineMessageRatingKeyboard);
};



exports.changeMonth = (ctx,month,year) => {
    ctx.editMessageText(
        'Elija la fecha del calendario que desea',
        keyboard.getCalendar(month,year));
};

