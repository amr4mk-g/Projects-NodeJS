const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = (req, res, next) => {
  try { let token = req.header('Authorization').replace('Bearer ','')
      let decoded = jwt.verify(token, 'secret-key')
      let user = User.getById(decoded._id)
      if (!user || user.token != token) throw new Error()
      req.userId = user.id
      next()
  } catch (err) { res.status(401).send({error:'Please authenticate'}) }
}

module.exports = auth