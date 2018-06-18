module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('vote',
    {
        userid:{
            type: DataTypes.INTEGER,
            validate: {notEmpty: {msg: "userId cannot be empty"}}
        },
        date:{
            type: DataTypes.DATE,
            validate: {notEmpty: {msg: "Date cannot be empty"}}
        }
    });
};