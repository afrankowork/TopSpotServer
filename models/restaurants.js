module.exports = function (sequelize, DataTypes) {
    return sequelize.define('restaurant', {
        userID: DataTypes.INTEGER,
        Image: DataTypes.STRING,
        restName: DataTypes.STRING,
        addres: DataTypes.STRING,
        visited: DataTypes.BOOLEAN,
        notes: DataTypes.STRING
     
    })
}