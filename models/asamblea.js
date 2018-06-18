module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('asamblea',
    {
        date:{
            type: DataTypes.DATE,
            validate: {notEmpty: {msg: "Date cannot be empty"}}
        }
    });
};