const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const model = require('../models/user')

module.exports = {
    login: async (req, res) => {
       let {email, password} = req.body;
       let user = model.getByEmail(email)
       let match = await bcrypt.compare(password, user.password)
       if (user && match) {
          let token = jwt.sign({_id: user.id}, 'secret-key')
          model.setToken(user.id, token)
          res.status(200).send({email:user.email, password:user.password, token})
       } else res.status(401).send({error: 'Invalid credentials'})
    },
  
    signup: async (req, res) => {
       let {email, password} = req.body;
       password = await bcrypt.hash(password, 10)
       let user = model.User(email, password)
       model.create(user)
       let token = jwt.sign({_id: user.id}, 'secret-key')
       model.setToken(user.id, token)
       res.status(201).send({"success": true})
    },

    logout: (req, res) => {
      model.setToken(req.userId, '')
      res.status(200).send({"success": true})
    },

    profile: (req, res) => {
      let user = model.getById(req.userId)
      res.status(200).send(user)
    }
}