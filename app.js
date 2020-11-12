require('dotenv').config();
let express = require('express');
let app = express();
const port = 3000;
let sequelize = require('./db');
let user = require('./controllers/userController')


sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'))


/*  Exposed Routes */
app.use('/user', user);


/* Protected Routes */
app.use(require('./middleware/validate-session'))



app.listen(port, function(){
    console.log(`App is listening on ${port}`)
})