const express = require('express');
const { registerUser, loginUser, logoutUser, authMiddleware } = require('../../controllers/authController');
const router = express.Router();


//register user
router.post('/register',registerUser);
//login user
router.post('/login',loginUser);
//logout user
router.post('/logout',logoutUser);
//middleware
router.get('/check-auth',authMiddleware,(req,res)=>{
   const user = req.user;
   res.status(200).json({
    success:true,
    message:"Authenticate User",
    user
   })

})

module.exports = router;
