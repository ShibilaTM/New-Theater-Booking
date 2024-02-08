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
        celebName:String,
        celebRole:String,
        celebImage:String
    }],
    tickets:[{
        showDate:Date,
        showTime:String,
        numberOfSeats:Number,
        bookedSeats:Number,
        // seatsAvailabe:Number,
        ticketRates:Number
    }],
    bookings: [
        {
          showDate:String,
          showTime: String,
          selectedSeats:[String],
          price:Number,
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userdata', 
            required: true,
          },
        }
      ],
    review:[{
        star:Number,
        comments:String
    }]

});

const moviePage = mongoose.model('moviepage', moviePageSchema);
module.exports = moviePage;
