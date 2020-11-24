module.exports = function (sequelize, DataTypes) {
    return sequelize.define('restaurant', {
        userID: DataTypes.INTEGER,
        restName: DataTypes.STRING,
        address: DataTypes.STRING,
        visited: DataTypes.BOOLEAN,
        notes: DataTypes.STRING
     
    })
}