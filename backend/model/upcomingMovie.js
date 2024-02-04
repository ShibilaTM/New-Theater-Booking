const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    imageUrl:String
})

const movie = mongoose.model('upcomingmovie',movieSchema)
module.exports=movie