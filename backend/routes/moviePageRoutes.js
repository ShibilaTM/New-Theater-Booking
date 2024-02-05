const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const movieModel= require('../model/moviePage')
const latestMovie = require('../model/LatestmovieSchema')
router.use(cors())
const mongoose = require('mongoose')
const emailService = require('../utilities/emailService')

//Posting the details of movie page
// router.post('/createmovie', async (req, res) => {
//     try {
//         const {title,description,potraitImgUrl,landScapeImgUrl,rating,genre,languages,type,duration,releasedate} = req.body
      
//         const newMovie = new movieModel({title,description,potraitImgUrl,landScapeImgUrl,rating,genre,languages,type,duration,releasedate})
//         const savedData= await newMovie.save()
//         return res.status(200).json({savedData,message:'Successfully Added' });
    
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// });

router.post('/createmovie', async (req, res) => {
    try {
      const { title, description, potraitImgUrl, landScapeImgUrl, rating, genre, languages, type, duration, releasedate } = req.body;
  
      const newMovie = new movieModel({
        title,
        description,
        potraitImgUrl,
        landScapeImgUrl,
        rating,
        genre,
        languages,
        type,
        duration,
        releasedate,
      });
  
      const savedData = await newMovie.save();
  
      // Include the movie id in the response
      return res.status(201).json({ id: savedData._id, message: 'Successfully Added' });
    } catch (error) {
      console.error('Error creating movie:', error);
      return res.status(500).json({ error });
    }
  });

//To get movie with title,potraitImgUrl,genre,rating
router.get('/getmovies', async (req, res) => {
    try {
      const movies = await movieModel.find({}, 'title potraitImgUrl genre rating');
      res.status(200).json({ movies });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  

// Get a specific movie by ID with specific fields
router.get('/getmovie/:id', async (req, res) => {
    try {
        const movie = await movieModel.findById(req.params.id, 'title potraitImgUrl genre rating');
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ movie });
    } catch (error) {
        res.status(500).json({ error });
    }
});



// To add cast
// router.post('/addcelebtomovie', async (req, res) => {
//     try {
//         const { movieId, cast } = req.body;

//         if (!movieId) {
//             return res.status(400).json({ message: "Missing movieId in request body" });
//         }

//         const movie = await movieModel.findById(movieId);

//         if (!movie) {
//             return res.status(404).json({ message: "Movie not found" });
//         }

//         if (!cast || !Array.isArray(cast)) {
//             return res.status(400).json({ message: "Invalid or missing cast array in request body" });
//         }

//         // Assuming all celebrities are of type "cast"
//         const newCelebs = cast.map(({ celebName, celebRole, celebImage }) => ({
//             celebType: "cast",
//             celebName,
//             celebRole,
//             celebImage
//         }));

//         movie.cast.push(...newCelebs);
//         await movie.save();

//         return res.status(200).json({ message: "Celebs added successfully" });
//     } catch (error) {
//         console.error("Error adding celebs to movie:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// To add cast
router.post('/addcelebtomovie/:id', async (req, res) => {
  try {
      const id = req.params.id
      const cast  = req.body;

      if (!id) {
          return res.status(400).json({ message: "Missing movieId in request body" });
      }

      const movie = await movieModel.findById(id);

      if (!movie) {
          return res.status(404).json({ message: "Movie not found" });
      }

      if (!cast || !Array.isArray(cast)) {
          return res.status(400).json({ message: "Invalid or missing cast array in request body" });
      }

      // Assuming all celebrities are of type "cast"
      const newCelebs = cast.map(({ celebName, celebRole, celebImage }) => ({
          
          celebName,
          celebRole,
          celebImage
      }));

      movie.cast.push(...newCelebs);
      await movie.save();

      return res.status(200).json({ message: "Celebs added successfully" });
  } catch (error) {
      console.error("Error adding celebs to movie:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/booktickets', async (req, res) => {
    try {
      const { movieId, showDate, showTime, available, bookedSeats, seatToBook, price, userEmail } = req.body;
  
      const movie = await movieModel.findById(movieId);
  
      if (!movie) {
        console.error('Movie not found');
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      // Book the seats
      const booking = {
        showDate,
        showTime,
        available,
        bookedSeats,
        seatToBook,
        price,
        userEmail,
        movieTitle: movie.title, // Assuming you have a title property in your movie object
      };
  
      movie.bookings.push(booking);
      await movie.save();
  
      // Send email confirmation
      await emailService.sendConfirmationEmail(userEmail, booking);
  
      res.json({ message: 'Booking successful', booking });
    } catch (error) {
      console.error('Error booking ticket:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //Update Movie
  router.put('/update/:id',async(req,res)=>{
    try {
      const id = req.params.id
      const movieExist = await movieModel.findById(id)
      if(!movieExist){
         return res.status(404).json({message:'user data not found'})
      }
      const data = req.body
      const updateData = await movieModel.findByIdAndUpdate(id,data,{new:true})
      res.status(200).json({message:'updated successfully'})
  } catch (error) {
      res.status(500).json({error:error})
  }
  })
  
  //Delete movie 
  router.delete('/remove/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const movieExist = await movieModel.findById(id)
        if(!movieExist){
            return res.status(404).json({message:"Movie not found"})
        }
        await movieModel.findByIdAndDelete(id)
        res.status(200).json({message:'movie deleted successfully'})
    } catch (error) {
        res.status(500).json({error:error})
    }
  })
  

//To get the details of movie 

router.get('/movies',async(req,res)=>{
    try {
        const moviedata = await movieModel.find()
        res.status(200).json(moviedata)
    } catch (error) {
        res.status(400).json({ error });
    }
})

//To get one movie
router.get('/movie/:id', async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).json({ message: "Invalid movie ID format" });
        }

        const movie = await movieModel.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});




module.exports = router
