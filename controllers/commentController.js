let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Comment = sequelize.import('../models/comments')

router.get('/', function(req, res ) {
    
    Comment.findAll({}).then(function grabComments(comments){
    res.json({
        comments : comments

    })
    }, function(err) {
        res.send(500, err.message)
    }
    );
})

router.post('/', function(req, res) {
    
    let userID = req.user.id;
    let username = req.user.username;
    let comment = req.body.comment;
    let restID = req.body.restaurantID;
    let starRating = req.body.starRating;
    
    Comment.create({
        userID: userID,
        comment: comment,
        restaurantID: restID,
        username: username,
        starRating: starRating
    }).then(
        function createSuccess(commentData) {
            res.json({data: commentData});
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});
    

  

module.exports = router;