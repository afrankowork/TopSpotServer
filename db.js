const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to database')
    },
    function(err) {
        console.log(err);
    }
);

const User = sequelize.import('./models/user');
const Lists = sequelize.import('./models/totry');


Lists.belongsTo(User);
User.hasMany(Lists);






module.exports = sequelize