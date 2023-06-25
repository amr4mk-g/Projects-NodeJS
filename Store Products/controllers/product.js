const model = require('../models/product')
const modelC = require('../models/category')

module.exports = {
  getAllProducts: (req, res) => { 
    let products = model.getAll(req.userId)
    res.status(200).json(products)
  },

  getProduct: (req, res) => {
    let product = model.getById(req.params.id, req.userId); 
    if (!product) return res.status(404).json({error: 'No product for this id'})
    res.status(200).json(product)
  },
  
  createProduct: (req, res) => {
    let data = req.body
    let category = modelC.getById(data.categoryId, req.userId)
    if (!category) return res.status(404).json({error: 'No category for this id'})
    let product = model.Product(data.name, data.price, data.categoryId, req.userId)
    model.create(product)
    res.status(201).json(product)
  }, 
  
  updateProduct: (req, res) => {
    let data = req.body
    let index = model.getIndex(req.params.id)
    if (index == -1) return res.status(404).json({error: 'No product for this id'})
    let product = model.Product(data.name, data.price, data.categoryId, req.userId)
    product.id = Number(req.params.id)
    model.update(index, product)
    res.status(201).json(product)
  },
  
  deleteProduct: (req, res) => {
    let index = model.getIndex(req.params.id)
    if (index == -1) return res.status(404).json({error: 'No product for this id'})
    model.delete(index)
    res.status(200).json({message: 'Product has been deleted'})
  },
  
  notFound: (req, res, next) => res.status(404).json({error: 'Route not found'}),

  error: (err, req, res, next) => res.status(500).json({error: 'Internal Server Error'})
}