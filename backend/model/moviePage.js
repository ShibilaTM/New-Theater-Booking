const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviePageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    potraitImgUrl: {
        type: String,
        required: true
    },
    landScapeImgUrl: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    languages: {
        type: [String], // Define languages as an array of strings
        required: true
    },
    type:{
        type: String,
        required: true 
    },
    duration: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releasedate: {
        type: String,
        required: true
    },
    cast: [{
        celebType:String,
        celebName:String,
        celebRole:String,
        celebImage:String
    }],
    bookings: [
        {
          showDate:String,
          showTime: String,
          available:[String],
          bookedSeats:[String],
          seatToBook:[String],
          price:Number,
          userEmail: String,
        },
      ]

});

const moviePage = mongoose.model('moviepage', moviePageSchema);
module.exports = moviePage;
