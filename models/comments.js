module.exports = function (sequelize, DataTypes) {
    return sequelize.define('comment', {
        userID: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        restaurantID: DataTypes.INTEGER,
        username: DataTypes.STRING,
        starRating: DataTypes.INTEGER
    })
}