module.exports = (sequelize, DataType) =>{
    return sequelize.define('user',{
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        username: {
            type: DataType.STRING,
            validate: {notEmpty: {msg:"name cannot be empty"}}
        },
        isAdmin: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: 'false'
        }
    });
};