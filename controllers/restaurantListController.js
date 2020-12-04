let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Restaurant = sequelize.import('../models/totry.js')
let User = sequelize.import('../models/user.js')

router.post('/', function(req, res) {
    
    let userID = req.user.id;
    let restName = req.body.restName;
    let address = req.body.address;
    let notes = req.body.notes;
    let phone = req.body.phone;
    let hours = req.body.hours;
    
    Restaurant.findOrCreate({
        where: {userID: userID, restName: restName},
            defaults: {
            userID: userID, restName: restName, address: address,
            notes: notes,
            phone: phone,
            hours: hours
            }
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

//Get One user is placed here as it needs to have access to user id from token and it needed to be placed
//behind a protected route
router.get('/getone', function(req, res) {
    let userID = req.user.id;
    User.findAll({where: {id: userID}}).then(function grabInfo(info) {
        res.json({
            info: info
        })
    }, function(err) {
        res.send(500, err.message)
    });
})

module.exports = router;