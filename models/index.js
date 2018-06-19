const path = require('path');
const Sequelize = require('sequelize');

const url = process.env.DATABASE_URL || "sqlite:db.sqlite";

const sequelize = new Sequelize(url);

sequelize.import(path.join(__dirname,'asamblea'));
sequelize.import(path.join(__dirname,"user"));
sequelize.import(path.join(__dirname,"vote"));

const {asamblea,user,vote} = sequelize.models;

//Relacciones base de datos
user.hasMany(vote);
vote.belongsTo(user, {foreignKey: 'userid'});

module.exports = sequelize;
