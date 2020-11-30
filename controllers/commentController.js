let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Comment = sequelize.import('../models/comments')

router.get('/getComm/:id', function(req, res ) {
    
    let restId = req.params.id;
    Comment.findAll({where: { restaurantID: restId}}).then(function grabComments(comments){
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

router.put('/', function(req,res) {
    let userID = req.user.id;
    let comment = req.body.comment;
    let id = req.body.id;

    Comment.update({
        comment: comment
    }, {where: {id: id, userID: userID}}).then(
        function success(data){
            res.json({
                data: data
            })
        },
        function error(err){
            res.send(500, err.message)
        }
    )

})

router.delete('/', function(req,res) {
    let userId = req.user.id;
    let id = req.body.id;
    
    Comment.destroy({
    where:{id: id, userID: userId}
}).then( function success(data){
    res.send('delete successful')
}), function error(err){
    res.send('Invalid User', err)
}
})
    

  

module.exports = router;