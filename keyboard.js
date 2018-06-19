const Markup = require('telegraf/markup');

exports.inlineMessageRatingKeyboard = Markup.inlineKeyboard([
    Markup.callbackButton('👍', 'like'),
    Markup.callbackButton('👎', 'dislike')
]).extra();

exports.getCalendar = (month,year) =>{
    if (month === "0"){
        d = new Date(`${Number(year)-1}/${12}/1`);
    }else if(month === "13"){
        d = new Date(`${Number(year)+1}/${1}/1`);
    }else if(month && year){
        d  = new Date(`${year}/${month}/1`);
    }else{
        d = new Date();
    }
    console.log(d);
    let keyboard = get_header(d.getMonth(),d.getFullYear());
    keyboard = keyboard.concat(get_days(d));
    return Markup.inlineKeyboard(keyboard).extra();
}

let get_header = (header,year) => {
    return [[set_btn("<",`CALENDAR prev ${header} ${year}`),set_btn(`${get_month_name(header)} ${year}`,null),set_btn(">",`CALENDAR post ${Number(header)+2} ${year}`)],
    [set_btn("L",null),set_btn("M",null),set_btn("X",null),set_btn("J",null),set_btn("V",null),set_btn("S",null),set_btn("D",null)]];
}
let set_btn = (btntext,data) => {
    if(data === null){
        data = "NULL";
    }
    return Markup.callbackButton(btntext, data);
};

let set_space_btn = () => {
    return set_btn("FA",null);
}

let get_days = (date) =>{
    let weeks = [];
    let week = padding_week_in(new Date(`${date.getFullYear()}/${date.getMonth()+1}/1`));
    let c_date;
    for(let i = 1; i <= get_end_of_month(date.getMonth()+1,date.getFullYear()); i++){
        c_date = new Date(`${date.getFullYear()}/${date.getMonth()+1}/${i}`);
        week.push(set_btn(i,`CALENDAR ${i} ${date.getMonth()} ${date.getFullYear()}`));
        if(c_date.getDay() === 0){
            weeks.push(week);
            week = [];
        }
    }
    week = week.concat(padding_week_out(c_date));
    weeks.push(week);
    return weeks;
};

let padding_week_in = date =>{
    numOfdays = date.getDay() === 0 ? 6 : date.getDay()-1;
    let padding = new Array(numOfdays);
    padding.fill(set_space_btn());
    return padding;
};

let padding_week_out = date =>{
    numOfdays = date.getDay() === 0 ? 0 : 7-date.getDay();
    let padding = new Array(numOfdays);
    padding.fill(set_space_btn());
    return padding;
};

let get_end_of_month = (month,year) =>{
    return new Date(year, month, 0).getDate();
}

let get_month_name = month => {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[month];

}

let get_month_number = mon => {
    return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1;
 }

exports.getHourKeyboard = (min,max) => {
    let keyboard = [];
    for(let i = min; i <= max; i++){
        keyboard.push([`HORA: ${i}:00`]);
    }
    keyboard.push([process.env.END_HOUR_MESSAGE]);
    return Markup.keyboard(keyboard).resize().extra();
};
