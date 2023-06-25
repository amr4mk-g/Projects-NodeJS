const modelU = require('../models/user')

module.exports = {
    product: (req, res, next) => { 
        let {name, price, categoryId} = req.body
        if (!name || typeof name !== 'string' || name.length < 3) 
            return res.status(400).json({error: 'Invalid name'})
        if (!price || typeof price !== 'number' || price < 1) 
            return res.status(400).json({error: 'Invalid price'})
        if (!categoryId || typeof categoryId !== 'number')
            return res.status(400).json({error: 'Invalid category-id'})
        next()
    },

    category: (req, res, next) => { 
        let {name} = req.body
        if (!name || typeof name !== 'string' || name.length < 3) 
            return res.status(400).json({error: 'Invalid name'})
        next()
    },  

    login: (req, res, next) => {
        let {email, password} = req.body
        if (!email || typeof email !== 'string') 
            return res.status(400).json({error: 'Invalid email'})
        if (!password || typeof password !== 'string') 
            return res.status(400).json({error: 'Invalid password'})
        next()
    },

    signup: (req, res, next) => {
        let {email, password, passwordRepeat} = req.body
        if (!email || modelU.getByEmail(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
            return res.status(400).json({error: 'Invalid email'})
        if (!password || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || 
            !/[!@#$%^&*()]/.test(password) || password.length < 8) 
            return res.status(400).json({error: 'Invalid password'})
        if (!passwordRepeat || passwordRepeat != password) 
            return res.status(400).json({error: 'Invalid password repeat'})
        next()
    }
}
