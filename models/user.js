module.exports = (sequelize, DataType) =>{
    return sequelize.define('user',{
        name: {
            type: DataType.STRING,
            validate: {notEmpty: {msg:"name cannot be empty"}}
        }
    });
};