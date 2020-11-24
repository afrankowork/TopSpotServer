let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Restaurant = sequelize.import('../models/totry.js')

router.post('/', function(req, res) {
    
    let userID = req.user.id;
    let restName = req.body.restName;
    let address = req.body.address;
    let visited = req.body.visited;
    let notes = req.body.notes;
    
    Restaurant.create({
        userID: userID,
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
})

router.get('/', function(req, res) {
    let userID = req.user.id;

    Restaurant.findAll({
        where: {
            userID : userID
        }
    }).then(function grabList(data) {
        res.json({
            list : data
        })
    }, function(err) {
        res.send(500, err.message)
    });

})

router.put('/', function(req,res) {
    let notes = req.body.notes;
    let userid = req.user.id;
    let id = req.body.id;
    
    Restaurant.update({
        notes: notes
    }, {where: {id: id, userID: userid}}).then(
        function updateSuccess(updateData){
            res.json({
                data: updateData
            })
        },
        function updateError(err){
            res.send(500, err.message)
        }
    )

})

router.delete('/:id', function(req,res){
    let num = req.params.id;
    let userid = req.user.id;

    Restaurant.destroy({
        where: {id: num, userID: userid}
    }).then(function deleteLog(){
        res.send('bye bye successful')
    },
    function deleteError(err) {
        res.send(500, err.message)
    })
})

module.exports = router;