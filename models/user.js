module.exports = function (sequelize, DataTypes) {
    return sequelize.define('people', {
        username: {type: DataTypes.STRING,
                    allowNull: false,
                    unique: true},
        email: {type: DataTypes.STRING,
                    allowNull: false,
                    unique: true},
        password: {type: DataTypes.STRING,
                    allowNull: false}
        
    })
}