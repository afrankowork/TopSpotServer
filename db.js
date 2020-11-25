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
const Comments = sequelize.import('./models/totry');


// Comments.belongsTo(User);
// User.hasMany(Comments);






module.exports = sequelize