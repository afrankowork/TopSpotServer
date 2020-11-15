let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Restaurant = sequelize.import('../models/restaurants')

router.post('/', function(req, res) {
    
    let userID = req.user.id;
    let image = req.body.image;
    let restName = req.body.restName;
    let address = req.body.addres;
    let visited = req.body.visited;
    let notes = req.body.notes;
    
    Restaurant.create({
        userID: userID,
        Image: image,
        restName: restName,
        address: address,
        visited: visited,
        notes: notes
    }).then(
        function createSuccess(restData) {
            res.json({data: restData});
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.get('/', function(req, res) {
    let userID = req.user.id;

    Restaurant.findAll({
        where: {
            userID = userID
        }
    }).then(function grabList(data) {
        res.json({
            list : data
        })
    }, function(err) {
        res.send(500, err.message)
    });

})

module.exports = router;