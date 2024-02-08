const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const movieModel= require('../model/moviePage')
router.use(cors())
const mongoose = require('mongoose')
const emailService = require('../utilities/emailService')

//.............Movie Routes ............//

//Posting the details of movie page

router.post('/createmovie', async (req, res) => {
    try {
      const { title, description, potraitImgUrl, landScapeImgUrl, rating, genre, languages, type, duration, releasedate } = req.body;
     // Validate if any trimmed field is empty
     if (
      !title.trim() ||
      !description.trim() ||
      !potraitImgUrl.trim() ||
      !landScapeImgUrl.trim() ||
      !rating.trim() ||
      !genre.trim() ||
      !languages.trim() ||
      !type.trim() ||
      !duration.trim() ||
      !releasedate.trim()
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
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

//Get the portrait image for home page
router.get('/poster', async (req, res) => {
  try {
    const movies = await movieModel.find({}, ' potraitImgUrl');
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//To add cast
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



//................ Book the Ticket Routes ......................//

// POST route for creating tickets for a specific movie

router.post('/tickets/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { tickets } = req.body; // Extract tickets array from req.body

    if (!id) {
      return res.status(400).json({ message: "Missing movieId in request body" });
    }

    const movie = await movieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (!tickets || !Array.isArray(tickets)) {
      return res.status(400).json({ message: "Invalid or missing tickets array in request body" });
    }

    const releaseDate = new Date(movie.releasedate);

    // Loop through each ticket and validate the showDate
    for (const ticket of tickets) {
      const selectedDate = new Date(ticket.showDate);

      if (selectedDate < releaseDate) {
        return res.status(400).json({ error: 'Show date must be after release date' });
      }
    }

    // Assuming all celebrities are of type "cast"
    const newTickets = tickets.map(({ showDate, showTime, numberOfSeats,bookedSeats, ticketRates }) => ({
      showDate,
      showTime,
      numberOfSeats,
      bookedSeats,
      ticketRates
    }));

    movie.tickets.push(...newTickets);
    await movie.save();

    return res.status(200).json({ message: 'Tickets created successfully' });
  } catch (error) {
    console.error("Error adding Tickets to movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




//To book tickets
router.post('/booktickets/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { showDate, showTime, selectedSeats, pricePerSeat, userId } = req.body;

    const movie = await movieModel.findById(id);
    if (!movie) {
      console.error('Movie not found');
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Find the user using the provided userId
    const user = await userModel.findById(userId);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate the total price based on the number of seats
    const totalPrice = numberOfSeats * pricePerSeat;

    // Book the seats
    const booking = {
      showDate,
      showTime,
      selectedSeats,
      totalPrice,
      userEmail: user.email, // Retrieve user email from the user object
      movieTitle: movie.title, // Assuming you have a title property in your movie object
    };

    movie.bookings.push(booking);
    await movie.save();

    // Send email confirmation
    await emailService.sendConfirmationEmail(user.email, booking);

    res.json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//................ Review Routes .......................//

//To add review

router.post('/review/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const decodedTitle = decodeURIComponent(title);

// Now use decodedTitle in your database query to find the movie

    const review = req.body;

    if (!decodedTitle) {
      return res.status(400).json({ message: "Missing movie title in request parameters" });
    }

    const movie = await movieModel.findOne({ title: title });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Validate review object format
    if (!review || !review.star || !review.comments) {
      return res.status(400).json({ message: "Invalid or missing review data in request body" });
    }

    // Add review to movie's review array
    movie.review.push(review);

    await movie.save();

    return res.status(200).json({ message: "Review added successfully" });

  } catch (error) {
    console.error("Error adding review to movie:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


//To delete review

router.delete('/review/:title/:reviewId', async (req, res) => {
  try {
    const { title, reviewId } = req.params;
    const decodedTitle = decodeURIComponent(title);

    if (!decodedTitle || !reviewId) {
      return res.status(400).json({ message: "Missing movie title or review ID in request params" });
    }

    const movie = await movieModel.findOne({ title: decodedTitle });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviewIndex = movie.review.findIndex(review => review._id.toString() === reviewId);

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Remove the review from the movie's review array
    movie.review.splice(reviewIndex, 1);

    await movie.save();

    return res.status(200).json({ message: "Review deleted successfully" });

  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//To get the review 
router.get('/reviews/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const decodedTitle = decodeURIComponent(title);

    if (!decodedTitle) {
      return res.status(400).json({ message: "Missing movie title in request params" });
    }

    const movie = await movieModel.findOne({ title: decodedTitle });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviews = movie.review;

    return res.status(200).json({ reviews });

  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});






module.exports = router
