const mongoose =require('mongoose')
const Schema = mongoose.Schema

const latestMovieSchema = new Schema({
    imageUrl:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true  
    },
    genre:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }

})

const latestMovie = mongoose.model('latestMovie',latestMovieSchema)
module.exports = latestMovie