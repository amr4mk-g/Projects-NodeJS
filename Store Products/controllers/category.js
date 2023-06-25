const model = require('../models/category')
const modelP = require('../models/product')

module.exports = {
  getAllCategories: (req, res) => { 
    let categories = model.getAll(req.userId)
    res.status(200).json(categories)
  },

  getCategory: (req, res) => {
    let category = model.getById(req.params.id, req.userId)
    if (!category) return res.status(404).json({error: 'No category for this id'})
    let products = modelP.getByCat(category.id)
    res.status(200).json({...category, products})
  },
  
  createCategory: (req, res) => {
    let data = req.body
    let category = model.Category(data.name, req.userId)
    model.create(category)
    res.status(201).json(category)
  }, 
  
  updateCategory: (req, res) => {
    let data = req.body
    let index = model.getIndex(req.params.id)
    if (index == -1) return res.status(404).json({error: 'No category for this id'})
    let category = model.Category(data.name, req.userId)
    category.id = Number(req.params.id)
    model.update(index, category)
    res.status(201).json(category)
  },
  
  deleteCategory: (req, res) => {
    let index = model.getIndex(req.params.id)
    if (index == -1) return res.status(404).json({error: 'No category for this id'})
    model.delete(index)
    res.status(200).json({message: 'Category has been deleted'})
  }
}