let express = require('express');
let app = express();
const port = 3000;



app.listen(port, function(){
    console.log(`App is listening on ${port}`)
})