const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const cors = require('cors')
router.use(cors())

//Admin login
router.post('/adminlogin',(req,res)=>{
    try {
        const {email, password}=req.body;
        if(email==='admin@gmail.com' && password==='Admin1234'){
            const adminPayload = {email: email, password: password}
            const adminToken = jwt.sign(adminPayload,'adminMovieApp')
            res.status(200).send({ message: 'success', token: adminToken });
        } else {
            console.log('Unauthorized'); // Log unauthorized attempts
            res.status(401).send({ message: 'email or password is incorrect' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'server error' });
    }
})



module.exports = router