const model = require('../models/productModel');

module.exports = {
  getAllProducts: (req, res) => {
    let products = model.getAll();
    res.status(200).json(products);
  },

  getProduct: (req, res) => {
    let product = model.getOne(req.index);
    res.status(200).json(product);
  },
  
  createProduct: (req, res) => {
    let {title, price, description} = req.body;
    let product = {id: Date.now(), title, price, description};
    model.createOne(product);
    res.status(201).json(product);
  }, 
  
  updateProduct: (req, res) => {
    let {title, price, description} = req.body;
    let product = {id: Number(req.params.id), title, price, description};
    model.updateOne(req.index, product);
    res.status(201).json(product);
  },
  
  deleteProduct: (req, res) => {
    model.deleteOne(req.index);
    res.status(200).json({message: 'Product has been deleted'});
  },
  
  notFound: (req, res, next) => {
    return res.status(404).json({error: 'Route not found'})
  },
  
  validateID: (req, res, next) => {
    let {id} = req.params;
    let index = model.getIndex(Number(id));
    if (index == -1) return res.status(404).json({error: 'No product for this id'});
    req.index = index;
    next();
  },
  
  validateData: (req, res, next) => {
    let {title, price, description} = req.body;
    if (!title || typeof title !== 'string') return res.status(400).json({error: 'Invalid title'});
    if (!price || typeof price !== 'number') return res.status(400).json({error: 'Invalid price'});
    if (!description || typeof title !== 'string') return res.status(400).json({error: 'Invalid description'});
    next();
  }
}