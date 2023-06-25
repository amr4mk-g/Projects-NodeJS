const express = require('express')
const control = require('../controllers/category')
const validate = require('../middleware/validation')
const auth = require('../middleware/auth')
const router = new express.Router()
let path = '/categories'

router.get(path, auth, control.getAllCategories)
router.post(path, [auth, validate.category], control.createCategory)
router.get(path+'/:id', auth, control.getCategory) 
router.put(path+'/:id', [auth, validate.category], control.updateCategory)  
router.delete(path+'/:id', auth, control.deleteCategory)

module.exports = router