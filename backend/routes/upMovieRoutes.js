const express = require('express')
const router = express.Router()
const upcomingMovie = require('../model/upcomingMovie')
const cors = require('cors')
router.use(cors())

router.post('/upMovie',async(req,res)=>{
    try {
        const data = req.body
        const upMovie = await upcomingMovie(data).save()
        res.status(200).json({upMovie})

    } catch (error) {
        res.status(500).json('error in adding movie'+error)
    } 
})

router.get('/getall',async(req,res)=>{
    try {
        const data = await upcomingMovie.find()
        res.status(200).json(data) 
    } catch (error) {
        res.status(500).json('no movies',+error)
    }
       
})


module.exports =router