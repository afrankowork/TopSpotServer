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
    Comment.create({
        
    })
})

module.exports = router;