module.exports = function (sequelize, DataTypes) {
    return sequelize.define('list', {
        userID: DataTypes.INTEGER,
        restName: DataTypes.STRING,
        address: DataTypes.STRING,
        notes: DataTypes.STRING,
        phone: DataTypes.STRING,
        hours: DataTypes.STRING
     
    })
}