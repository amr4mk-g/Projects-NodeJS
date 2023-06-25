const express = require('express')
const control = require('../controllers/product')
const validate = require('../middleware/validation')
const auth = require('../middleware/auth')
const router = new express.Router()
let path = '/products'

router.get(path, auth, control.getAllProducts)
router.post(path, [auth, validate.product], control.createProduct) 
router.get(path+'/:id', auth, control.getProduct) 
router.put(path+'/:id', [auth, validate.product], control.updateProduct)  
router.delete(path+'/:id', auth, control.deleteProduct)
router.use(control.notFound)
router.use(control.error)

module.exports = router