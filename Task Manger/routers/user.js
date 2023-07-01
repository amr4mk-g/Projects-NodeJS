const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users/signup', async (req, res) => {
    let user = new User(req.body)
    try { await user.save()
        let token = await user.generateToken()
        res.status(201).send({user, token})
    } catch (e) { res.status(400).send(e) }
})

router.post('/users/login', async (req, res) => {
    let {email, password} = req.body
    try { let user = await User.findByCredentials(email, password)
        let token = await user.generateToken()
        res.status(200).send({user, token})
    } catch (e) { res.status(400).send(e) }
})

router.post('/users/logout', auth, async (req, res) => {
    try { req.user.tokens = req.user.tokens.filter(it=> it.token!=req.token)
        await req.user.save()
        res.status(200).send('Logout')
    } catch (e) { res.status(500).send(e) }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try { req.user.tokens = []
        await req.user.save()
        res.status(200).send('Logout')
    } catch (e) { res.status(500).send(e) }
})

router.get('/users/me', auth, (req, res) => {
    res.status(200).send(req.user)
})

const upload = multer({limits:{fileSize:2000000}, fileFilter(trq,file,cb){
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return cb(new Error('not supported'))
    cb(undefined, true)
}})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res)=>{
     let buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
     req.user.avatar = buffer
     await req.user.save()
     res.status(200).send("Done") 
}, (err,req,res,next)=>{ res.status(400).send({error:err.message}) })

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send("Done")
})

router.get('/users/:id/avatar', auth, async (req, res) => {
    try { let user = await User.findById(req.params.id)
        if (!user || !user.avatar) throw new Error()
        res.set('Content-Type', 'image/png')
        res.status(200).send(user.avatar)
    } catch (e) { res.status(404).send() }
    res.status(200).send(req.user)
})

//to get all users
// router.get('/users', auth, async (req, res) => {
//     try { let users = await User.find({})
//         res.status(200).send(users)
//     } catch (e) { res.status(500).send(e) }
// })

//to get user by id
// router.get('/users/:id', auth, async (req, res) => {
//     let _id = req.params.id
//     try { let user = await User.findById(_id)
//         if (!user) return res.status(404).send()
//         res.status(200).send(user)
//     } catch (e) { res.status(500).send(e) }
// })

router.patch('/users/me', auth, async (req, res) => {
    let updates = Object.keys(req.body)
    let allowed = ['name', 'email', 'password', 'age']
    let isValid = updates.every(it => allowed.includes(it))
    if (!isValid) return res.status(400).send({error: 'Invalid updates!'})
    try { updates.forEach(it => req.user[it] = req.body[it])
        await req.user.save()
        res.status(200).send(req.user)
    } catch (e) { res.status(400).send(e) }
})

router.delete('/users/me', auth, async (req, res) => {
    try { // await req.user.remove()
        await User.findByIdAndDelete(req.user._id) 
        res.status(200).send(req.user)
    } catch (e) { res.status(500).send(e) }
})

module.exports = router