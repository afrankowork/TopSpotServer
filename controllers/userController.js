let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs')



/* Create User Endpoint  */
router.post('/register', function(req, res) {
    let username = req.body.user.username;
    let email = req.body.user.email;
    let password = req.body.user.password;
    console.log('made it this far')
    User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 10)
    }).then(
        function success(user){
            console.log('success')
            let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

            res.json({
                sessionToken: token
            })
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
})

/* Login User Endpoint */
router.post('/login', function(req, res) {
    User.findOne( {where: { email: req.body.user.email}}).then(
        function(user) {
            if(user) {
                bcrypt.compare(req.body.user.password, user.password, function(err, matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                    if(matches) {
                        res.json({
                            sessionToken: token
                        })
                    }
                })
                
                } else {
                res.status(500).send({error: "You are a bum"})
            }
        },
        function (err) {
            res.status(501).send({error: 'you are out luck bud'})
        }
    )
})


router.get('/getusers', function(req, res ) {
    
    User.findAll().then(function grabComments(users){
    res.json({
        users : users

    })
    }, function(err) {
        res.send(500, err.message)
    }
    );
})


router.delete('/deluser', function(req, res) {
    let id = req.body.id
    User.destroy({where:{id: id}}).then(
        function onSuccess(data){
            res.send('User Deleted.')
        }
    ), function(err){
        res.send('Deletion Unsuccessful', err)
    }
})


module.exports = router;