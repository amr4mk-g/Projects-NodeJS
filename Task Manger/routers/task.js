const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    let task = new Task({...req.body, user: req.user._id})
    try { await task.save()
        res.status(201).send(task)
    } catch (e) { res.status(400).send(e) }
})

// ?matched=true&limit=10&skip=0&sortBy=x_asc   (desc -1)
router.get('/tasks', auth, async (req, res) => {
    try { 
      let match = {}
      if (req.query.completed) match.completed = (req.query.completed == 'true') 
      let sort = {}
      if (req.query.sortBy) {
        let parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1]=='asc'?1:-1
      }
      let tasks = await req.user.populate({path:'tasks', match, 
        options:{limit: parseInt(req.query.limit), skip: parseInt(req.query.skip), sort}}).execPopulate()
      res.status(200).send(tasks)
    } catch (e) { res.status(500).send(e) }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try { let task = await Task.findOne({_id: req.params.id, user: req.user._id})
        if (!task) return res.status(404).send()
        res.status(200).send(task)
    } catch (e) { res.status(500).send(e) }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    let updates = Object.keys(req.body)
    let allowed = ['description', 'completed']
    let isValid = updates.every(it => allowed.includes(it))
    if (!isValid) return res.status(400).send({error: 'Invalid updates!'})
    try { let task = await Task.findOne({_id: req.params.id, user: req.user._id})
        if (!task) return res.status(404).send()
        updates.forEach(it => task[it] = req.body[it])
        await task.save()
        res.status(200).send(task)
    } catch (e) { res.status(400).send(e) }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try { let task = await Task.findOneAndDelete({_id: req.params.id, user: req.user._id})
        if (!task) res.status(404).send()
        res.status(200).send(task)
    } catch (e) { res.status(500).send() }
})

module.exports = router