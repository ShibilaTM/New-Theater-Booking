const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const movieModel= require('../model/moviePage')
router.use(cors())
const mongoose = require('mongoose')
const emailService = require('../utilities/emailService')
const userData = require('../model/userData')


// Admin token verification middleware
function adminVerifyToken(req, res, next) {
  try {
      const token = req.headers.Authorization;
      if (!token) throw 'Token not provided';

      const payload = jwt.verify(token, 'adminMovieApp');
      if (!payload) throw 'Invalid token';
      req.authAdmin = payload; // Set authUser property
      next();
  } catch (error) {
      console.error(error);
      res.status(401).send('Unauthorized: ' + error);
  }
}

// User token verification middleware
function userVerifyToken(req, res, next) {
  try {
      const token = req.headers.authorization;
      if (!token) throw 'Token not provided';

      const tokenParts = token.split(' ');
      if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') throw 'Invalid token';

      const decodedToken = jwt.verify(tokenParts[1], 'TheaterBookingKey');
      req.authUser = decodedToken; // Set authUser property
      next();
  } catch (error) {
      console.error(error);
      res.status(401).send('Unauthorized: ' + error);
  }
}

//.............Movie Routes ............//

//Posting the details of movie page

router.post('/createmovie',adminVerifyToken, async (req, res) => {
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
router.post('/addcelebtomovie/:id',adminVerifyToken, async (req, res) => {
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
  router.put('/update/:id',adminVerifyToken,async(req,res)=>{
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
  router.delete('/remove/:id',adminVerifyToken,async(req,res)=>{
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

router.post('/tickets/:id',adminVerifyToken, async (req, res) => {
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
// router.post('/booktickets/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { showDate, selectedSeats, pricePerSeat, userEmail } = req.body;

//     const movie = await movieModel.findById(id);
//     if (!movie) {
//       console.error('Movie not found');
//       return res.status(404).json({ error: 'Movie not found' });
//     }

//      // Check if any selected seats are already booked
//      const alreadyBookedSeats = selectedSeats.filter(seat => movie.tickets[0].bookedSeats.includes(seat));
//      if (alreadyBookedSeats.length > 0) {
//        return res.status(400).json({ error: 'One or more selected seats are already booked' });
//      }

//     // Calculate the total price based on the number of seats
//     const totalPrice = selectedSeats.length * pricePerSeat;

//     // Book the seats
//     const booking = {
//       showDate,
//       showTime:movie.tickets[0].showTime,
//       selectedSeats,
//       totalPrice,
//       userEmail, // Retrieve user email from the user object
//       movieTitle: movie.title, // Assuming you have a title property in your movie object
//     };

//     movie.bookings.push(booking);
//     movie.tickets[0].bookedSeats = [...movie.tickets[0].bookedSeats, ...selectedSeats];
//     await movie.save();

//     // Send email confirmation
//     await emailService.sendConfirmationEmail(userEmail, booking);

//     res.json({ message: 'Booking successful', booking });
//   } catch (error) {
//     console.error('Error booking ticket:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



router.post('/booktickets/:id',userVerifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const { showDate, selectedSeats, pricePerSeat } = req.body;

    const movie = await movieModel.findById(id);
    if (!movie) {
      console.error('Movie not found');
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Check if any selected seats are already booked
    const alreadyBookedSeats = selectedSeats.filter(seat => movie.tickets[0].bookedSeats.includes(seat));
    if (alreadyBookedSeats.length > 0) {
      return res.status(400).json({ error: 'One or more selected seats are already booked' });
    }

    // Calculate the total price based on the number of seats
    const totalPrice = selectedSeats.length * pricePerSeat;

    // Decode the JWT token to retrieve user's email
    const authorizationHeader = req.headers.Authorization || req.headers.authorization;
if (!authorizationHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
}
const token = authorizationHeader.split(' ')[1];
 // Assuming the token is sent in the Authorization header
    const decodedToken = jwt.verify(token, 'TheaterBookingKey');
    const userEmail = decodedToken.email;

    // Find the user by email
    const user = await userData.findOne({ email: userEmail });
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Book the seats
    const booking = {
      showDate,
      showTime: movie.tickets[0].showTime,
      selectedSeats,
      totalPrice,
      movieTitle: movie.title,
    };

    // Add the booking to the user's bookings array
   // Assuming user is properly initialized
if (!user.bookings) {
  user.bookings = []; // Initialize bookings array if it doesn't exist
}

// Now you can safely push a value to the bookings array
user.bookings.push(booking);

    await user.save();

    // Update movie's booked seats
    movie.tickets[0].bookedSeats = [...movie.tickets[0].bookedSeats, ...selectedSeats];
    await movie.save();

    // Send email confirmation
    await emailService.sendConfirmationEmail(userEmail, booking);

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
