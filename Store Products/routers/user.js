const express = require('express')
const control = require('../controllers/user')
const validate = require('../middleware/validation')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/login', validate.login, control.login)
router.post('/registration', validate.signup, control.signup) 
router.get('/logout', auth, control.logout) 
router.get('/profile', auth, control.profile) 

module.exports = router