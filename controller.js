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

exports.pickDate = (ctx,day,month,year) =>{
    console.log(`La fecha elegida es ${day}/${month}/${year}`);
    ctx.session.date = new Date(`${year}/${Number(month)+1}/${day}`);
    console.log("La fecha es: "+ctx.session.date);
    ctx.reply('Elige hora', keyboard.getHourKeyboard(Number(process.env.MIN_HOUR),Number(process.env.MAX_HOUR)));
};

exports.pickHour = async (ctx) => {
    if(!ctx.session.date){
        ctx.reply("No ha seleccionado ningun dia");
        return;
    }
    if(ctx.message.text === process.env.END_HOUR_MESSAGE){
        delete ctx.session.date;
        return;
    }
    const hour = Number(ctx.message.text.split(":")[1]);
    console.log("En recepcion la fecha es: "+ctx.session.date);
    const pushDate = new Date(ctx.session.date.getTime());
    console.log("La ")
    pushDate.setHours(hour);
    const userId = ctx.update.message.chat.id;
    console.log("En recepcion2 la fecha es: "+pushDate);
    let count = await models.vote.count({where: {userid: userId, date: pushDate}});
    console.log("count "+count);
    if(count !== 0){
        console.log("Voto no valido");
        ctx.reply("Esa hora ya ha sido introducida");
        return;
    }
    const vote = models.vote.build({
        userid: userId,
        date: pushDate
    });

    vote.save({fields: ["userid", "date"]}).then(vote =>{
        console.log("Voto guardado correctamente");
    }).catch(Sequelize.ValidationError,error => {
        console.log(error);
    }).catch(error => console.log(error));
};

exports.masVotado = async (ctx) =>{
    let votes = await models.vote.findAll({
        include: [{model: models.user}]
    });
    let masVotado = votes[0];
    let fechas = [];
    let msg = "";
    for(vote in votes){
        let tmpVotes = [JSON.parse(JSON.stringify(votes[vote]))]
        for(count in votes){
            if(JSON.stringify(votes[vote].date) === JSON.stringify(votes[count].date) && votes[vote].userid !== votes[count].userid){
                tmpVotes.push(JSON.parse(JSON.stringify(votes[count])))
                votes.splice(count,1);
            }
        
        }
        fechas.push(tmpVotes);
    }

    ctx.reply(generateMasVotadoMessage(fechas));
}

let generateMasVotadoMessage = fechas =>{
    msg = ""
    fechas.sort((a,b) => {return b.length - a.length});
    for(fecha in fechas){
        let users = [];
        for(user in fechas[fecha]){
            users.push(fechas[fecha][user].user.username);
        }
        console.log(`Los usuarios que han votado son ${users.toString()} \n`);
        console.log(`La fecha ${fechas[fecha][0].date} tiene ${fechas[fecha].length} votos`);
        msg += `${Number(fecha)+1}->  La fecha ${fechas[fecha][0].date} tiene ${fechas[fecha].length} votos \n`;
        msg += `Los usuarios que han votado son ${users.toString()} \n`;
    }
    return msg;
}