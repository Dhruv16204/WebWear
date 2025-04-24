const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const registerUser = async(req,res)=>{
    try {
        const {username,email,password} = req.body;

        if(!username || !email || !password){
            return res.json({
                success:false,
                message:"Please Fill all the Details First!"
            })
        }
        //check if registerting with same email
        const checkUser = await User.findOne({email});
      
        if(checkUser) {
            return res.json({
                success:false,
                message:"User already exists with same email! Try to register with other email"
            })
        }

        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName:username,email,password:hashPassword
        })
        await newUser.save();
        res.status(200).json({
            success:true,
            message:'registration successfull'
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error occured while trying to register"
        })
    }

}


//login
const loginUser = async(req,res)=>{
    try {
        const{email,password} = req.body;

        if(!email || !password){
            return res.json({
                success:false,
                message:"Please Fill all the Details First!"
            })
        }

        //check if user has already registered if not first register
        const  checkUser = await User.findOne({email});

        //register nahi kiya -> first register
        if(!checkUser) {
            return res.json({
                success:false,
                message:"Please Register First!"
            })
        }

        //register kiya -> check password
        const checkPassword = await bcrypt.compare(password,checkUser.password);
        
        //password incorrect
        if(!checkPassword){
            return res.json({
                success:false,
                message:"Incorrect Password!"
            })
        }

        const token = jwt.sign({
            id:checkUser._id,
            role:checkUser.role,
            email:checkUser.email,
            userName:checkUser.userName
            }, 
            process.env.SECRET_KEY,
            {expiresIn: "120m"}
        );

        // res.cookie('token',token,{
        //     httpOnly:true,
        //     secure:true
        // }).json({
        //     success:true,
        //     message:"Logged In Successfully",
        //     user:{
        //         id: checkUser._id,
        //         email : checkUser.email,
        //         role : checkUser.role,
        //         userName:checkUser.userName
        //     }
        // })

        res.status(200).json({
            success:true,
            message:"Logged In Successfully",
            token,
            user:{
                    id: checkUser._id,
                    email : checkUser.email,
                    role : checkUser.role,
                    userName:checkUser.userName
                }
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error occured while trying to Login"
        })
    }

}

//logout
const logoutUser = (req,res)=>{
    res.clearCookie('token'); // Clear the cookie first
    res.json({                // Then send a response
        success: true,
        message: "Logged Out Successfully!"
    });
}

//middleware -> refresh, etc
// const authMiddleware = async(req,res,next)=>{
//     //agar token present nahi hai to
//     const token = req.cookies?.token;
//     console.log("🔹 Received Token:", token); 
//     if(!token) {
//         return res.status(401).json({
//             success:false,
//             message:"Unauthorized User! no token found."
//         })
//     }

//     try {
//         const decoded = jwt.verify(token,process.env.SECRET_KEY);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log("JWT Verification Error:", error.message);
//         return res.status(401).json({
//             success:false,
//             message:"Unauthorized User! invalid or expired token."
//         })
//     }

// }

const authMiddleware = async(req,res,next)=>{
    //agar token present nahi hai to
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("🔹 Received Token:", token); 
    if(!token) {
        return res.status(401).json({
            success:false,
            message:"Unauthorized User! no token found."
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        return res.status(401).json({
            success:false,
            message:"Unauthorized User! invalid or expired token."
        })
    }

}


module.exports = {registerUser, loginUser ,logoutUser, authMiddleware}